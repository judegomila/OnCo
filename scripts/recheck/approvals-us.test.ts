import { describe, expect, it } from "vitest";
import type { AcceleratedRow } from "../../src/lib/accelerated";
import type { OceApproval } from "../fetch-universe-regulatory";
import { type DrugView, acceleratedDrift, decisionDateInNote, drugIndex, holdsNotice, nameKey, newestUsApproval, noticesNewerThanRecord, overdueDecisions, readAcceleratedTables, readNotices, writtenDates } from "./approvals-us";
import { fakeNet } from "./test-helpers";

const drug = (over: Partial<DrugView> & { id: string }): DrugView => ({ name: over.id, aka: [], asOf: "2026-09-10", approvals: [], events: [], haystack: "", ...over });
const notice = (over: Partial<OceApproval> = {}): OceApproval => ({ date: "2026-11-05", title: "FDA approves examplinib for a lung cancer", url: "https://www.fda.gov/drugs/cancer-approvals/fda-approves-examplinib-lung-cancer", drugs: [{ generic: "examplinib", brand: "Exampla" }], accelerated: false, text: "", via: "live", ...over });
const TODAY = "2026-11-18";

describe("matching a notice to a record", () => {
  it("keys a name without its biologic prefix, suffix or dose form", () => {
    expect(nameKey("fam-trastuzumab deruxtecan-nxki")).toBe("trastuzumab deruxtecan");
    expect(nameKey("Azacitidine tablets")).toBe("azacitidine");
    expect(nameKey("Pembrolizumab")).toBe("pembrolizumab");
  });
  it("lets a record's own name win over another record's alias or brand", () => {
    const index = drugIndex([drug({ id: "combo", name: "Examplinib plus otherib", aka: ["examplinib"] }), drug({ id: "examplinib", name: "Examplinib", brand: "Exampla; Exampla Qlex" })]);
    expect(index.get("examplinib")).toEqual(["examplinib"]);
    expect(index.get("exampla qlex")).toEqual(["examplinib"]);
  });
  it("takes a notice as held by its address, by a US event on its day, or by its date written out", () => {
    const n = notice();
    expect(holdsNotice(drug({ id: "a", haystack: "… https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-examplinib-lung-cancer …" }), n)).toBe(true);
    expect(holdsNotice(drug({ id: "a", events: [{ date: "2026-11-05", type: "approval", region: "US", note: "" }] }), n)).toBe(true);
    expect(holdsNotice(drug({ id: "a", events: [{ date: "2026-11-05", type: "approval", region: "EU", note: "" }] }), n)).toBe(false);
    expect(holdsNotice(drug({ id: "a", haystack: "Approved for lung cancer (FDA, 5 November 2026)" }), n)).toBe(true);
    expect(holdsNotice(drug({ id: "a", haystack: "Approved in 2025" }), n)).toBe(false);
    expect(writtenDates("2026-11-05")).toEqual(["2026-11-05", "5 November 2026", "November 5, 2026"]);
  });
  it("reads the newest US approval from dated events and from the approvals rows", () => {
    expect(newestUsApproval(drug({ id: "a", approvals: [{ region: "US", year: 2024 }, { region: "EU", year: 2026 }], events: [{ date: "2023-05-01", type: "approval", region: "US", note: "" }, { date: "2026-01-01", type: "designation", region: "US", note: "" }] }))).toEqual({ dated: "2023-05-01", year: 2024 });
  });
});

describe("noticesNewerThanRecord", () => {
  it("reports a notice newer than the newest approval the record holds", () => {
    const d = drug({ id: "examplinib", name: "Examplinib", approvals: [{ region: "US", year: 2024 }], events: [{ date: "2024-03-01", type: "approval", region: "US", note: "" }] });
    const [f] = noticesNewerThanRecord([notice()], [d], TODAY);
    expect(f).toMatchObject({ kind: "us-approvals", type: "notice-newer-than-record", severity: "high", recordId: "examplinib", date: "2026-11-05", url: notice().url, source: notice().title });
    expect(f.onco).toBe("newest US approval event 2024-03-01; last checked 2026-09-10");
  });
  it("says nothing for a notice the record holds, or one older than its newest approval", () => {
    const held = drug({ id: "examplinib", name: "Examplinib", events: [{ date: "2026-11-05", type: "approval", region: "US", note: "" }] });
    const newer = drug({ id: "examplinib", name: "Examplinib", events: [{ date: "2026-11-10", type: "approval", region: "US", note: "" }] });
    expect(noticesNewerThanRecord([notice()], [held], TODAY)).toEqual([]);
    expect(noticesNewerThanRecord([notice()], [newer], TODAY)).toEqual([]);
  });
  it("does not assert a gap where a year row with no date may be this approval", () => {
    const d = drug({ id: "examplinib", name: "Examplinib", approvals: [{ region: "US", year: 2026 }] });
    const [f] = noticesNewerThanRecord([notice()], [d], TODAY);
    expect(f.severity).toBe("medium");
    expect(f.note).toContain("check whether it is this one");
  });
  it("marks a drug named second in a notice as a possible combination partner", () => {
    const partner = drug({ id: "otherib", name: "Otherib", events: [{ date: "2020-01-01", type: "approval", region: "US", note: "" }] });
    const lead = drug({ id: "examplinib", name: "Examplinib", events: [{ date: "2026-11-05", type: "approval", region: "US", note: "" }] });
    const out = noticesNewerThanRecord([notice({ drugs: [{ generic: "examplinib" }, { generic: "otherib" }] })], [lead, partner], TODAY);
    expect(out).toMatchObject([{ recordId: "otherib", severity: "low" }]);
  });
  it("names a recent notice whose drug no record answers to, and lets an old one go", () => {
    const [f] = noticesNewerThanRecord([notice()], [], TODAY);
    expect(f.type).toBe("notice-drug-not-held");
    expect(f.recordId).toBeUndefined();
    expect(f.onco).toBe("no record answers to examplinib");
    expect(noticesNewerThanRecord([notice({ date: "2025-01-05" })], [], TODAY)).toEqual([]);
  });
});

describe("acceleratedDrift", () => {
  const held: AcceleratedRow[] = [
    { drugId: "lurbinectedin", drugName: "Zepzelca (lurbinectedin)", indication: "Metastatic SCLC after platinum .", granted: "2020-06-15", outcome: "open", table: "ongoing" },
    { drugId: "examplinib", drugName: "Exampla (examplinib)", indication: "A lung cancer", granted: "2022-01-01", outcome: "open", table: "ongoing" },
    { drugId: "steady", drugName: "Steady (steadimab)", indication: "A lymphoma", granted: "2019-01-01", outcome: "converted", outcomeDate: "2021-01-01", table: "verified" },
    { drugId: "gone", drugName: "Gone (gonemab)", indication: "A sarcoma", granted: "2018-01-01", outcome: "open", table: "ongoing" },
  ];
  const fresh = [
    // Reworded by the agency (no stray full stop), now withdrawn.
    { drugName: "Zepzelca (lurbinectedin)", indication: "Metastatic SCLC after platinum.", granted: "2020-06-15", outcome: "withdrawn" as const, outcomeDate: "2026-09-30", table: "withdrawn" as const },
    { drugName: "Exampla (examplinib)", indication: "A lung cancer", granted: "2022-01-01", outcome: "converted" as const, outcomeDate: "2026-10-16", table: "verified" as const },
    { drugName: "Steady (steadimab)", indication: "A lymphoma", granted: "2019-01-01", outcome: "converted" as const, outcomeDate: "2021-01-01", table: "verified" as const },
    { drugName: "Nelkarmi (neladalkib)", indication: "ALK-positive NSCLC", granted: "2026-11-17", outcome: "open" as const, table: "ongoing" as const },
  ];
  const out = acceleratedDrift(fresh, held);
  it("reports an indication the file shows as open that the FDA lists as withdrawn", () => {
    const f = out.find((x) => x.recordId === "lurbinectedin")!;
    expect(f).toMatchObject({ type: "indication-withdrawn", severity: "high", date: "2026-09-30", onco: "accelerated approval still open (granted 2020-06-15)" });
    expect(f.source).toContain("withdrawn on 2026-09-30");
    expect(f.url).toContain("withdrawn-cancer-accelerated-approvals");
  });
  it("reports a conversion, a new row and a row that has gone, and nothing for a row that agrees", () => {
    expect(out.map((f) => `${f.type}:${f.recordId ?? "-"}`).sort()).toEqual(["accelerated-converted:examplinib", "accelerated-row-gone:gone", "accelerated-row-new:-", "indication-withdrawn:lurbinectedin"]);
  });
});

describe("decision dates", () => {
  it("reads a decision date out of a note, in either date style", () => {
    expect(decisionDateInNote("NDA accepted under priority review (lidERA); decision date 30 November 2026")).toBe("2026-11-30");
    expect(decisionDateInNote("Resubmission after the third CRL; PDUFA 9 April 2027")).toBe("2027-04-09");
    expect(decisionDateInNote("FDA target action date of March 5, 2027")).toBe("2027-03-05");
    expect(decisionDateInNote("Phase 3 met its endpoint on 30 November 2026; filings to follow")).toBeUndefined();
  });
  it("reports a PDUFA date that has passed with nothing after it", () => {
    const d = drug({ id: "itm-11", events: [{ date: "2026-01-10", type: "filing", region: "US", note: "NDA accepted" }, { date: "2026-08-28", type: "pdufa", region: "US", note: "PDUFA goal date for GEP-NET indication" }] });
    expect(overdueDecisions([d], TODAY)).toMatchObject([{ type: "decision-date-passed", severity: "high", recordId: "itm-11", date: "2026-08-28" }]);
  });
  it("is settled by a later approval or refusal, and waits for a date still ahead", () => {
    const approved = drug({ id: "a", events: [{ date: "2026-08-28", type: "pdufa", region: "US", note: "" }, { date: "2026-08-27", type: "designation", region: "US", note: "" }, { date: "2026-09-02", type: "approval", region: "US", note: "" }] });
    const refused = drug({ id: "b", events: [{ date: "2026-08-28", type: "pdufa", region: "US", note: "" }, { date: "2026-08-29", type: "crl", region: "US", note: "" }] });
    const ahead = drug({ id: "c", events: [{ date: "2026-11-30", type: "pdufa", region: "US", note: "" }] });
    const onlyMeeting = drug({ id: "d", events: [{ date: "2026-08-28", type: "pdufa", region: "US", note: "" }, { date: "2026-09-15", type: "advisory-committee", region: "US", note: "" }] });
    expect(overdueDecisions([approved, refused, ahead], TODAY)).toEqual([]);
    expect(overdueDecisions([onlyMeeting], TODAY)).toHaveLength(1);
  });
  it("reads a filing whose note names a decision date", () => {
    const d = drug({ id: "giredestrant", events: [{ date: "2026-06-02", type: "filing", region: "US", note: "NDA accepted under priority review; decision date 30 November 2026" }] });
    expect(overdueDecisions([d], TODAY)).toEqual([]);
    expect(overdueDecisions([d], "2026-12-01")).toMatchObject([{ recordId: "giredestrant", date: "2026-11-30" }]);
    const settled = { ...d, events: [...d.events, { date: "2026-11-28", type: "approval", region: "US", note: "" }] };
    expect(overdueDecisions([settled], "2026-12-01")).toEqual([]);
  });
});

describe("reading the FDA's pages", () => {
  const table = (rows: string) => `<html><table><tbody>${rows}</tbody></table></html>`;
  it("parses the four accelerated-approval tables with the generator's own parser", async () => {
    const { net, calls } = fakeNet((url) => new Response(url.includes("withdrawn-cancer")
      ? table("<tr><td>Zepzelca (lurbinectedin)</td><td>Metastatic SCLC</td><td>6/15/2020</td><td>9/30/2026</td></tr>")
      : url.includes("ongoing-cancer") ? table("<tr><td>Nelkarmi (neladalkib)</td><td>ALK-positive NSCLC</td><td>11/17/2026</td><td>A confirmatory trial</td></tr>")
        : url.includes("verified-clinical") ? table("<tr><td>Steady (steadimab)</td><td>A lymphoma</td><td>1/1/2019</td><td>1/1/2021</td></tr>")
          : table("<tr><td>Other (otherib)</td><td>Dosing regimen</td><td>2/2/2020</td><td>Withdrawn (12/08/2021)</td></tr>")));
    const r = await readAcceleratedTables(net);
    expect(calls).toHaveLength(4);
    expect(r.complete).toBe(true);
    expect(r.rows.map((x) => `${x.drugName}|${x.granted}|${x.outcome}|${x.outcomeDate ?? ""}`)).toEqual(["Steady (steadimab)|2019-01-01|converted|2021-01-01", "Zepzelca (lurbinectedin)|2020-06-15|withdrawn|2026-09-30", "Nelkarmi (neladalkib)|2026-11-17|open|", "Other (otherib)|2020-02-02|withdrawn|2021-12-08"]);
  });
  it("reports a table that refuses the request as blocked, and the reading as incomplete", async () => {
    const { net } = fakeNet((url) => (url.includes("withdrawn-cancer") ? new Response("<title>abuse detection</title>", { status: 403 }) : new Response(table("<tr><td>A (a)</td><td>x</td><td>1/1/2020</td><td>1/1/2021</td></tr>"))));
    const r = await readAcceleratedTables(net);
    expect(r.complete).toBe(false);
    expect(r.blocked).toMatchObject([{ reason: "refused (403)" }]);
  });
  it("reads the notices page, and says so when it is blocked or has changed shape", async () => {
    const page = "<table><tr><td><a href=\"/drugs/cancer-approvals/fda-approves-examplinib-lung-cancer\">FDA approves examplinib for a lung cancer</a></td><td>On November 5, 2026, the Food and Drug Administration approved examplinib (Exampla, Acme Inc.) for adults with a lung cancer.</td><td>11/05/2026</td></tr></table>";
    const ok = await readNotices(fakeNet(() => new Response(page)).net);
    expect(ok.notices).toMatchObject([{ date: "2026-11-05", url: "https://www.fda.gov/drugs/cancer-approvals/fda-approves-examplinib-lung-cancer", drugs: [{ generic: "examplinib", brand: "Exampla" }] }]);
    expect((await readNotices(fakeNet(() => new Response("no", { status: 403 })).net)).blocked?.reason).toBe("refused (403)");
    expect((await readNotices(fakeNet(() => new Response("<html>redesigned</html>")).net)).error).toContain("zero rows");
  });
});
