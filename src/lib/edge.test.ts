import { describe, expect, it } from "vitest";
import { EDGE_KINDS, EDGE_PAGE_CAP, dedupeEdge, edgeAll, edgeFeed, edgeGroupKey, edgeScore, edgeWeekCounts, groupEdge, isTopJournal, normaliseEdgeDate, rankEdge, venueFromUrl, type EdgeItem } from "./edge";

const TODAY = "2026-09-22";
const item = (over: Partial<EdgeItem> & { date: string }): EdgeItem => {
  const d = normaliseEdgeDate(over.date, TODAY)!;
  return { id: over.url ?? "https://x.test/a", url: "https://x.test/a", kind: "paper", title: "T", sentence: "S.", refs: [], weight: 0, ...over, date: d.date, precision: d.precision, sortDate: d.sortDate };
};

describe("edge dates", () => {
  it("accepts the corpus date forms at their own precision and rejects the rest", () => {
    expect(normaliseEdgeDate("2026-09-13", TODAY)).toEqual({ date: "2026-09-13", precision: "day", sortDate: "2026-09-13" });
    expect(normaliseEdgeDate("2026-03", TODAY)).toEqual({ date: "2026-03", precision: "month", sortDate: "2026-03-01" });
    expect(normaliseEdgeDate("2026-Q3", TODAY)).toEqual({ date: "2026-Q3", precision: "quarter", sortDate: "2026-07-01" });
    expect(normaliseEdgeDate(2025, TODAY)).toEqual({ date: "2025", precision: "year", sortDate: "2025-01-01" });
    expect(normaliseEdgeDate("2026-09-23", TODAY)).toBeNull();
    expect(normaliseEdgeDate("soon", TODAY)).toBeNull();
    expect(normaliseEdgeDate("2026-13-01", TODAY)).toBeNull();
    expect(normaliseEdgeDate(undefined, TODAY)).toBeNull();
  });
  it("groups days by day and coarser dates under the year", () => {
    expect(edgeGroupKey({ date: "2026-09-13", precision: "day" })).toBe("2026-09-13");
    expect(edgeGroupKey({ date: "2026-03", precision: "month" })).toBe("2026-03");
    expect(edgeGroupKey({ date: "2026-Q3", precision: "quarter" })).toBe("2026");
    expect(edgeGroupKey({ date: "2025", precision: "year" })).toBe("2025");
  });
  it("names venues from hosts and knows the leading journals", () => {
    expect(venueFromUrl("https://www.fda.gov/drugs/x")).toBe("FDA");
    expect(venueFromUrl("https://clinicaltrials.gov/study/NCT1")).toBe("ClinicalTrials.gov");
    expect(venueFromUrl("https://example.org/a")).toBe("example.org");
    expect(isTopJournal("N Engl J Med")).toBe(true);
    expect(isTopJournal("Lancet Oncol")).toBe(true);
    expect(isTopJournal("Int J Mol Sci")).toBe(false);
  });
});

describe("dedupeEdge", () => {
  it("keeps one item per DOI whatever the case or prefix, merging record chips and keeping the weightier kind", () => {
    const a = item({ date: "2026-09-10", url: "https://doi.org/10.1000/ABC", doi: "10.1000/ABC", refs: [{ id: "x", kind: "drug", name: "X", route: "/drugs/x/" }], weight: 0 });
    const b = item({ date: "2026-09-10", url: "https://europepmc.org/article/MED/1", doi: "https://doi.org/10.1000/abc", refs: [{ id: "y", kind: "cancer", name: "Y", route: "/cancers/y/" }, { id: "x", kind: "drug", name: "X", route: "/drugs/x/" }], weight: 7, venue: "Lancet Oncol" });
    const out = dedupeEdge([a, b]);
    expect(out).toHaveLength(1);
    expect(out[0].weight).toBe(7);
    expect(out[0].refs.map((r) => r.id).sort()).toEqual(["x", "y"]);
    expect(out[0].venue).toBe("Lancet Oncol");
  });
  it("merges the same URL within a kind, taking the day-precise date, and keeps different kinds apart", () => {
    const fda = item({ date: "2026-09-09", kind: "approval", url: "https://www.fda.gov/n/1", weight: 14 });
    const rec = item({ date: "2026-Q3", kind: "approval", url: "https://www.fda.gov/n/1/", weight: 14 });
    const prop = item({ date: "2026-09-17", kind: "proposal", url: "https://www.fda.gov/n/1", weight: 0 });
    const out = dedupeEdge([rec, fda, prop]);
    expect(out).toHaveLength(2);
    expect(out[0].kind).toBe("approval");
    expect(out[0].date).toBe("2026-09-09");
    expect(out[1].kind).toBe("proposal");
  });
});

describe("rankEdge", () => {
  it("sorts by date with the weight in days, newest first", () => {
    const paper = item({ date: "2026-09-20", url: "https://x.test/p", kind: "paper", weight: 0 });
    const approval = item({ date: "2026-09-10", url: "https://x.test/a", kind: "approval", weight: 14 });
    const preprint = item({ date: "2026-09-21", url: "https://x.test/pp", kind: "preprint", weight: -7 });
    const out = rankEdge([paper, approval, preprint], { today: TODAY, floor: 0 });
    expect(out.map((x) => x.kind)).toEqual(["approval", "paper", "preprint"]);
    expect(edgeScore(approval)).toBeGreaterThan(edgeScore(paper));
  });
  it("caps the list, keeps a floor per kind and respects ceilings", () => {
    const papers = Array.from({ length: 30 }, (_, i) => item({ date: `2026-09-${String(1 + (i % 20)).padStart(2, "0")}`, url: `https://x.test/p${i}`, kind: "paper" }));
    const laws = [item({ date: "2025", url: "https://x.test/l1", kind: "law", weight: 7 }), item({ date: "2026", url: "https://x.test/l2", kind: "law", weight: 7 })];
    const proposals = Array.from({ length: 10 }, (_, i) => item({ date: "2026-09-21", url: `https://x.test/pr${i}`, kind: "proposal" }));
    const out = rankEdge([...papers, ...laws, ...proposals], { cap: 12, floor: 2, ceilings: { proposal: 3 }, today: TODAY });
    expect(out).toHaveLength(12);
    expect(out.filter((x) => x.kind === "law")).toHaveLength(2);
    expect(out.filter((x) => x.kind === "proposal")).toHaveLength(3);
    for (let i = 1; i < out.length; i++) expect(edgeScore(out[i - 1])).toBeGreaterThanOrEqual(edgeScore(out[i]));
  });
  it("drops items dated after today", () => {
    expect(rankEdge([item({ date: "2026-09-01", url: "https://x.test/1" })], { today: "2026-08-01" })).toEqual([]);
  });
  it("counts only day-dated items in the last seven days", () => {
    const xs = [item({ date: "2026-09-22", url: "https://x.test/1" }), item({ date: "2026-09-16", url: "https://x.test/2" }), item({ date: "2026-09-15", url: "https://x.test/3" }), item({ date: "2026", url: "https://x.test/4", kind: "law" })];
    expect(edgeWeekCounts(xs, TODAY)).toEqual({ paper: 2 });
  });
});

describe("edge on the real snapshots", () => {
  const all = edgeAll();
  it("never emits an item without a date, a source URL, a title, a sentence and a known kind", () => {
    expect(all.length).toBeGreaterThan(0);
    for (const it of all) {
      expect(it.date, it.title).toMatch(/^\d{4}(-\d{2}(-\d{2})?|-Q[1-4])?$/);
      expect(it.sortDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(it.url).toMatch(/^https?:\/\//);
      expect(it.title.trim().length).toBeGreaterThan(0);
      expect(it.sentence.trim().length).toBeGreaterThan(0);
      expect(EDGE_KINDS).toContain(it.kind);
      for (const r of it.refs) expect(r.route).toMatch(/^\//);
    }
  });
  it("has one item per DOI", () => {
    const dois = all.map((x) => x.doi?.toLowerCase()).filter((x): x is string => !!x);
    expect(new Set(dois).size).toBe(dois.length);
  });
  it("ranks the page within the cap, newest group first, with no empty group", () => {
    const page = edgeFeed(EDGE_PAGE_CAP);
    expect(page.length).toBeLessThanOrEqual(EDGE_PAGE_CAP);
    const groups = groupEdge(page);
    for (let i = 1; i < groups.length; i++) expect(groups[i - 1].key > groups[i].key).toBe(true);
    for (const g of groups) expect(g.items.length).toBeGreaterThan(0);
    expect(groups.reduce((n, g) => n + g.items.length, 0)).toBe(page.length);
  });
  it("follows house style: no em-dashes and no 'as of' in titles or sentences we compose", () => {
    for (const it of all) if (it.kind !== "paper" && it.kind !== "preprint") expect(`${it.title} ${it.sentence}`).not.toMatch(/—|\bas of\b/i);
  });
});
