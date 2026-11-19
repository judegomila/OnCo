import { describe, expect, it } from "vitest";
import { type LabelState, changedSections, compareLabel, dailymedState, labelState, readLabels, setIdsIn } from "./labels";
import { fakeNet } from "./test-helpers";

const A = "9333c79b-d487-4538-a9f0-71b91a02b287", B = "43a4d7f8-48ae-4a63-9108-2fa8e3ea9d9c";
const state = (over: Partial<LabelState> = {}): LabelState => ({ version: 228, effective: "2026-07-24", via: "openfda", sections: { indications: "aaaa", dosage: "bbbb" }, ...over });
const drug = { id: "pembrolizumab", asOf: "2026-09-10" };

describe("reading a label", () => {
  it("finds the set ids a record cites, once each, whatever the case", () => {
    const record = JSON.stringify({ links: [{ url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${A.toUpperCase()}` }, { url: `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${A}#section-2` }, { url: `https://api.fda.gov/drug/label.json?search=set_id:"${B}"` }, { url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Abemaciclib" }] });
    expect(setIdsIn(record)).toEqual([A, B]);
  });
  it("keeps the version, the date and a hash of three sections, never the text", () => {
    const s = labelState({ set_id: A, version: "229", effective_time: "20261016", indications_and_usage: ["1 INDICATIONS  AND USAGE Melanoma"], dosage_and_administration: ["2 DOSAGE 200 mg every 3 weeks"], adverse_reactions: ["6 …"] });
    expect(s).toMatchObject({ version: 229, effective: "2026-10-16", via: "openfda" });
    expect(Object.keys(s.sections!)).toEqual(["indications", "dosage"]);
    expect(JSON.stringify(s)).not.toContain("Melanoma");
    // Whitespace alone is not a change.
    expect(labelState({ indications_and_usage: ["1 INDICATIONS AND USAGE\nMelanoma"] }).sections!.indications).toBe(s.sections!.indications);
  });
  it("reads DailyMed's history for the newest version", () => {
    expect(dailymedState({ data: { history: [{ spl_version: 228, published_date: "Jul 24, 2026" }, { spl_version: 229, published_date: "Nov 02, 2026" }] } })).toEqual({ version: 229, effective: "2026-11-02", via: "dailymed" });
    expect(dailymedState({ data: { history: [] } })).toBeUndefined();
  });
});

describe("compareLabel", () => {
  it("says nothing when the version is the one last read", () => {
    expect(compareLabel(A, drug, state(), state())).toEqual([]);
  });
  it("names the sections that changed, and is most serious for a boxed warning or the indications", () => {
    const now = state({ version: 229, effective: "2026-10-16", sections: { indications: "cccc", dosage: "bbbb", boxedWarning: "dddd" } });
    const [f] = compareLabel(A, drug, state(), now);
    expect(f).toMatchObject({ kind: "labels", type: "label-changed", severity: "high", recordId: "pembrolizumab", date: "2026-10-16", url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${A}` });
    expect(f.onco).toBe("last read at version 228, effective 2026-07-24; record last checked 2026-09-10");
    expect(f.source).toBe("label version 229, effective 2026-10-16; changed: boxed warning, indications and usage");
    expect(changedSections(state(), now)).toEqual(["boxedWarning", "indications"]);
  });
  it("grades a dosage change below that, and a change outside the three sections lowest", () => {
    expect(compareLabel(A, drug, state(), state({ version: 229, sections: { indications: "aaaa", dosage: "zzzz" } }))).toMatchObject([{ severity: "medium" }]);
    const [f] = compareLabel(A, drug, state(), state({ version: 229 }));
    expect(f.severity).toBe("low");
    expect(f.source).toContain("boxed warning, indications and dosage unchanged");
  });
  it("compares versions across the two sources, and does not invent a section change it cannot see", () => {
    const viaDailymed: LabelState = { version: 229, effective: "2026-11-02", via: "dailymed" };
    const [f] = compareLabel(A, drug, state(), viaDailymed);
    expect(f.severity).toBe("medium");
    expect(f.source).toContain("sections could not be compared");
    expect(compareLabel(A, drug, state(), { version: 228, effective: "2026-07-30", via: "dailymed" })).toEqual([]);
  });
  it("on a first reading lists only a label newer than the record", () => {
    expect(compareLabel(A, drug, undefined, state({ effective: "2026-10-16" }))).toMatchObject([{ type: "label-newer-than-record", severity: "medium", onco: "last checked 2026-09-10" }]);
    expect(compareLabel(A, drug, undefined, state({ effective: "2026-07-24" }))).toEqual([]);
  });
  it("names a cited label neither source returns", () => {
    expect(compareLabel(A, drug, state(), undefined)).toMatchObject([{ type: "label-not-found", severity: "low" }]);
  });
});

describe("readLabels", () => {
  const ids = Array.from({ length: 25 }, (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`);
  it("asks openFDA in batches of 20, then DailyMed for what openFDA does not carry", async () => {
    const { net, calls } = fakeNet((url) => {
      if (url.startsWith("https://api.fda.gov/")) {
        const batch = [...decodeURIComponent(url).matchAll(/"([0-9a-f-]{36})"/g)].map((m) => m[1]);
        if (batch.length === 5) return new Response(JSON.stringify({ error: { code: "NOT_FOUND" } }), { status: 404 });
        return new Response(JSON.stringify({ results: batch.slice(0, 19).map((set_id) => ({ set_id, version: "3", effective_time: "20260101" })) }));
      }
      if (url.includes(ids[24])) return new Response("{}", { status: 404 });
      return new Response(JSON.stringify({ data: { history: [{ spl_version: 7, published_date: "Mar 05, 2026" }] } }));
    });
    const r = await readLabels(ids, net);
    expect(calls.filter((c) => c.url.startsWith("https://api.fda.gov/"))).toHaveLength(2);
    expect(calls.filter((c) => c.url.includes("dailymed"))).toHaveLength(6);
    expect(r.labels.size).toBe(24);
    expect(r.labels.get(ids[19])).toEqual({ version: 7, effective: "2026-03-05", via: "dailymed" });
    expect(r.labels.has(ids[24])).toBe(false);
    expect(r.failed).toEqual([]);
  });
  it("marks a batch that failed as not read, so a label is never reported missing because a request failed", async () => {
    const { net } = fakeNet(() => new Response("slow down", { status: 429 }));
    const r = await readLabels(ids.slice(0, 3), net);
    expect(r.failed).toHaveLength(3);
    expect(r.labels.size).toBe(0);
    expect(r.errors[0]).toContain("rate limited");
  });
});
