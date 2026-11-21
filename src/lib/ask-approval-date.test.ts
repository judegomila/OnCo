import { describe, expect, it } from "vitest";
import { approvalPeriod, approvedFirst, approvedThen, namedLookup, retrieveIds } from "./ask";
import { approvalDates, decodeAskIndex, encodeAskIndex, type AskIndex } from "./ask-index";
import { extrasFor } from "./ask-index-build";
import { graph } from "./graph";

/**
 * Ask's retrieval for questions about something approved, checked against typed approval data rather than words.
 * "What was approved, where, when": the products among the hits whose records carry an approval in the period and
 * region asked about come ahead of records that only share the question's words (ask.ts approvalPeriod, approvedThen;
 * ask-index.ts approvalDates). "The first approved X": approved medicines take the medicines' places ahead of
 * medicines approved nowhere (ask.ts approvedFirst).
 */
describe("approvalPeriod: the period and place a question asks approvals for", () => {
  it("reads a month and year, a year alone, and the region", () => {
    expect(approvalPeriod("Which oncology drugs were approved in the US in July 2026?")).toEqual({ period: "2026-07", region: "US" });
    expect(approvalPeriod("What did the FDA approve in Sept. 2025?")).toEqual({ period: "2025-09", region: "US" });
    expect(approvalPeriod("Which medicines were authorised in the EU during 2024?")).toEqual({ period: "2024", region: "EU" });
    expect(approvalPeriod("Which breast cancer drugs were approved in 2026?")).toEqual({ period: "2026", region: undefined });
  });

  it("matches whole words only", () => {
    // "dec" inside "decision" is not December, and the modal verb is not the month of May.
    expect(approvalPeriod("Which drugs won approval after a decision in 2026?")?.period).toBe("2026");
    expect(approvalPeriod("Which drugs may be approved in 2026?")?.period).toBe("2026");
    // "approval" inside "preapproval" and "approv" inside "approvable" are not a question about approvals.
    expect(approvalPeriod("Which preapproval studies were run in July 2026?")).toBeUndefined();
    expect(approvalPeriod("Which applications were found approvable in July 2026?")).toBeUndefined();
    // A year inside a longer number or an identifier is not a period.
    expect(approvalPeriod("Was the drug in NCT04202026 approved?")).toBeUndefined();
  });

  it("leaves a question that names a month with no approval sense alone", () => {
    expect(approvalPeriod("Which trials reported in July 2026?")).toBeUndefined();
    expect(approvalPeriod("What happened to tazemetostat in March 2026?")).toBeUndefined();
  });

  it("leaves another regulatory outcome, a span, and a year that is part of a name alone", () => {
    expect(approvalPeriod("Which approvals were withdrawn in the US in 2026?")).toBeUndefined();
    expect(approvalPeriod("Which drugs were not approved in the US in July 2026?")).toBeUndefined();
    expect(approvalPeriod("Which drugs weren't approved in 2026?")).toBeUndefined();
    expect(approvalPeriod("Which accelerated approvals has the FDA granted since 2020?")).toBeUndefined();
    expect(approvalPeriod("Which drugs were approved between 2020 and 2024?")).toBeUndefined();
    expect(approvalPeriod("What does FDORA 2022 say about accelerated approval?")).toBeUndefined();
  });
});

describe("approvedThen: checked against the record's dated approvals, not its words", () => {
  const lookup = namedLookup([
    { id: "new-in-july", kind: "drug", name: "New in July", approved: ["2026-07-22 US"] },
    // Approved in the US years ago; its text says the European application was withdrawn in July 2026.
    { id: "words-only", kind: "drug", name: "Words only", approved: ["2021-02-12 US"] },
    { id: "eu-in-july", kind: "drug", name: "EU in July", approved: ["2026-07-03 EU"] },
    { id: "year-only", kind: "drug", name: "Year only", approved: ["2026 US"] },
    { id: "a-distributor", kind: "company", name: "US Oncology" },
  ]);
  const found = ["a-distributor", "words-only", "year-only", "eu-in-july", "new-in-july"];

  it("keeps the products approved in that region and month, in the order given", () => {
    expect(approvedThen("Which oncology drugs were approved in the US in July 2026?", found, lookup)).toEqual(["new-in-july"]);
    expect(approvedThen("Which oncology drugs were approved in July 2026?", found, lookup)).toEqual(["eu-in-july", "new-in-july"]);
  });

  it("lets a record dated only to the year answer a year, never a month", () => {
    expect(approvedThen("Which oncology drugs were approved in the US in 2026?", found, lookup)).toEqual(["year-only", "new-in-july"]);
    expect(approvedThen("Which oncology drugs were approved in the US in June 2026?", found, lookup)).toEqual([]);
  });

  it("returns nothing for a question that is not about approvals in a period", () => {
    expect(approvedThen("Which trials reported in July 2026?", found, lookup)).toEqual([]);
    expect(approvedThen("Which approvals were withdrawn in the US in July 2026?", found, lookup)).toEqual([]);
  });
});

describe("retrieveIds: products approved in the period asked about come first", () => {
  const lookup = namedLookup([
    { id: "new-in-july", kind: "drug", name: "New in July", approved: ["2026-07-22 US"] },
    { id: "also-july", kind: "drug", name: "Also July", approved: ["2026-07-14 US"] },
    { id: "words-only", kind: "drug", name: "Words only", aka: "Wordsonly", approved: ["2021-02-12 US"] },
    { id: "a-distributor", kind: "company", name: "US Oncology" },
  ]);
  const hits = (...ids: string[]) => ids.map((id) => ({ id }));
  const lexical = hits("a-distributor", "an-act", "an-idea"), concept = hits("words-only", "new-in-july", "a-test", "also-july");

  it("puts them ahead of records that only share the question's words, and adds none the searches did not find", () => {
    const q = "Which oncology drugs were approved in the US in July 2026?";
    expect(retrieveIds(lexical, concept, 4)).toEqual(["a-distributor", "words-only", "an-act", "new-in-july"]);
    expect(retrieveIds(lexical, concept, 4, { question: q, lookup })).toEqual(["new-in-july", "also-july", "a-distributor", "words-only"]);
  });

  it("leaves a question that names a month with no approval sense in fused order", () => {
    const q = "Which trials reported in the US in July 2026?";
    expect(retrieveIds(lexical, concept, 4, { question: q, lookup })).toEqual(retrieveIds(lexical, concept, 4));
  });

  it("gives way to a medicine the question names", () => {
    const q = "Was Wordsonly approved in the US in July 2026?";
    expect(retrieveIds(hits("a-distributor", "words-only"), concept, 4, { question: q, lookup })).toEqual(["words-only", "a-distributor", "new-in-july", "a-test"]);
  });
});

describe("approvedFirst: approved medicines ahead of medicines approved nowhere", () => {
  const lookup = namedLookup([
    { id: "pipeline-til", kind: "drug", name: "Pipeline TIL", aka: "Pipelinetil", status: "phase-2" },
    { id: "approved-til", kind: "drug", name: "Approved TIL", status: "approved", approved: ["2024-02-16 US"] },
    // No status on the record, but an approval row: approved somewhere.
    { id: "row-only", kind: "drug", name: "Row only", approved: ["2023 CN"] },
    { id: "preclinical", kind: "drug", name: "Preclinical", status: "preclinical" },
    { id: "uncleared-test", kind: "drug", name: "Uncleared test", status: "emerging", cls: "test" },
    { id: "cleared-test", kind: "drug", name: "Cleared test", status: "approved", cls: "test", approved: ["2017 US"] },
    { id: "a-term", kind: "term", name: "TIL therapy" },
    { id: "a-person", kind: "person", name: "A person" },
  ]);
  const found = ["a-term", "pipeline-til", "a-person", "uncleared-test", "preclinical", "approved-til", "cleared-test", "row-only"];
  const q = "What is the first approved TIL therapy and how well does it work?";

  it("reorders only the places medicines hold; other records and tests stay where they were", () => {
    expect(approvedFirst(q, found, lookup)).toEqual(["a-term", "approved-til", "a-person", "uncleared-test", "row-only", "pipeline-til", "cleared-test", "preclinical"]);
  });

  it("matches the whole word and leaves questions about what is not approved, or not yet, alone", () => {
    for (const other of [
      "Which TIL therapies are unapproved?", "Which TIL therapy is closest to approval?", "Which TIL therapy is awaiting approval?",
      "Which TIL therapies are not approved?", "Which TIL therapies aren't approved?", "Which TIL therapy is not yet approved?",
      "Which TIL therapy is expected to be approved next year?", "Which TIL therapy could be approved first?", "Which approved TIL therapy was withdrawn?",
      "Which preapproved TIL therapies exist?", "How does TIL therapy work?",
    ]) expect(approvedFirst(other, found, lookup), other).toEqual(found);
  });

  it("moves an approved medicine into the list retrieval returns, and adds none the searches did not find", () => {
    const hits = (...ids: string[]) => ids.map((id) => ({ id }));
    const after = retrieveIds(hits("a-term", "pipeline-til", "x"), hits("a-person", "y", "z", "approved-til"), 3, { question: q, lookup });
    expect(retrieveIds(hits("a-term", "pipeline-til", "x"), hits("a-person", "y", "z", "approved-til"), 3)).toEqual(["a-person", "a-term", "pipeline-til"]);
    expect(after).toEqual(["a-person", "a-term", "approved-til"]);
  });

  it("gives way to a medicine the question names", () => {
    const hits = (...ids: string[]) => ids.map((id) => ({ id }));
    expect(retrieveIds(hits("a-term", "pipeline-til"), hits("a-person", "approved-til"), 2, { question: "Is Pipelinetil approved?", lookup })).toEqual(["pipeline-til", "a-person"]);
  });

  it("reads the corpus: lifileucel is approved and a medicine, GC101 TIL is not approved, and a test carries its class into the Ask index", () => {
    const g = graph();
    expect(g.must("lifileucel").status).toBe("approved");
    expect(g.must("gc101-til").status).not.toBe("approved");
    expect(extrasFor(g.must("gc101-til")).approved).toBeUndefined();
    expect(extrasFor(g.must("lifileucel")).cls).toBeUndefined();
    expect(extrasFor(g.must("oncomine-dx-target-test")).cls).toBe("test");
  });
});

describe("approvalDates: what the indexes carry for a product", () => {
  it("keeps approval events with their dates, and a year row only where no dated event covers it", () => {
    expect(approvalDates({
      approvals: [{ region: "US", year: 2026 }, { region: "China", year: 2025 }, { region: "England (NICE)", year: 2026 }, { region: "WHO", year: 2019 }],
      regulatoryEvents: [
        { date: "2024-05-29", type: "accelerated-approval", region: "US" }, { date: "2026-07-14", type: "conversion", region: "US" },
        { date: "2026-07", type: "withdrawal", region: "EU" }, { date: "2026-07-01", type: "label-change", region: "US" }, { date: "2026-03", type: "approval", region: "Japan" },
      ],
    })).toEqual(["2024-05-29 US", "2025 CN", "2026-03 JP", "2026-07-14 US"]);
    expect(approvalDates({})).toEqual([]);
  });

  it("reads the corpus: selpercatinib's traditional approval of 14 July 2026 is there, and trilaciclib has no approval that month", () => {
    const g = graph();
    expect(extrasFor(g.must("selpercatinib")).approved).toContain("2026-07-14 US");
    const trilaciclib = extrasFor(g.must("trilaciclib")).approved ?? [];
    expect(trilaciclib.length).toBeGreaterThan(0);
    expect(trilaciclib.some((a) => a.startsWith("2026-07"))).toBe(false);
  });

  it("survives the Ask index wire format", () => {
    const index: AskIndex = { version: 1, entries: [{ id: "selpercatinib", kind: "drug", name: "Selpercatinib", aliases: ["Retevmo"], route: "/drugs/selpercatinib/", approved: ["2026-07-14 US"], cls: "test" }], pairs: [] };
    const back = decodeAskIndex(JSON.parse(JSON.stringify(encodeAskIndex(index)))).entries[0];
    expect(back.approved).toEqual(["2026-07-14 US"]);
    expect(back.cls).toBe("test");
  });
});
