import { describe, expect, it } from "vitest";
import { approvalPeriod, approvedThen, namedLookup, retrieveIds } from "./ask";
import { approvalDates, decodeAskIndex, encodeAskIndex, type AskIndex } from "./ask-index";
import { extrasFor } from "./ask-index-build";
import { graph } from "./graph";

/**
 * Ask's retrieval for "what was approved, where, when": the products among the hits whose typed records carry an
 * approval in the period and region asked about come ahead of records that only share the question's words
 * (ask.ts approvalPeriod, approvedThen; ask-index.ts approvalDates).
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
    const index: AskIndex = { version: 1, entries: [{ id: "selpercatinib", kind: "drug", name: "Selpercatinib", aliases: ["Retevmo"], route: "/drugs/selpercatinib/", approved: ["2026-07-14 US"] }], pairs: [] };
    expect(decodeAskIndex(JSON.parse(JSON.stringify(encodeAskIndex(index)))).entries[0].approved).toEqual(["2026-07-14 US"]);
  });
});
