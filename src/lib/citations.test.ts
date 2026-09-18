import { describe, expect, it } from "vitest";
import { CITATIONS, citationFor, citationSourceUrl, citationTooltip } from "./citations";
import { matchResults, normDoi, pickResult, termFor } from "../../scripts/fetch-citations";
import { graph } from "./graph";

describe("citations snapshot", () => {
  it("has a fetched date and only counts for papers in the corpus", () => {
    expect(CITATIONS.fetched).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const g = graph();
    for (const [id, c] of Object.entries(CITATIONS.papers)) {
      expect(g.get(id)?.kind, id).toBe("paper");
      expect(Number.isInteger(c.citedBy) && c.citedBy >= 0, id).toBe(true);
      expect(c.fetched, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.source.length, id).toBeGreaterThan(0);
    }
  });

  it("covers most key papers that carry a DOI or PMID", () => {
    const withId = graph().kind("paper").filter((p) => p.doi || p.pmid);
    const covered = withId.filter((p) => citationFor(p.id)).length;
    expect(covered / withId.length).toBeGreaterThan(0.9);
  });

  it("builds the tooltip and source link from an entry", () => {
    const c = { citedBy: 12, source: "MED", id: "123", fetched: "2026-09-18" };
    expect(citationTooltip(c)).toBe("Times cited in the Europe PMC index, updated 2026-09-18");
    expect(citationSourceUrl(c)).toBe("https://europepmc.org/abstract/MED/123");
    expect(citationSourceUrl({ ...c, id: undefined })).toBeUndefined();
  });
});

describe("fetch-citations matching", () => {
  it("quotes DOIs and normalises prefixes and case", () => {
    expect(normDoi("https://doi.org/10.1016/S0140-6736(19)32591-7")).toBe("10.1016/s0140-6736(19)32591-7");
    expect(termFor({ id: "a", doi: "10.1016/S0140-6736(19)32591-7" })).toBe('DOI:"10.1016/s0140-6736(19)32591-7"');
    expect(termFor({ id: "b", pmid: "123" })).toBe("(EXT_ID:123 AND SRC:MED)");
    expect(termFor({ id: "c", doi: "10.1/x", pmid: "123" })).toBe('(DOI:"10.1/x" OR (EXT_ID:123 AND SRC:MED))');
  });

  it("prefers the MEDLINE record over preprints and never stores a count it did not receive", () => {
    const batch = [{ id: "p1", doi: "10.1/a" }, { id: "p2", doi: "10.1/b" }, { id: "p3", pmid: "999" }, { id: "p4", doi: "10.1/d" }, { id: "p5", doi: "10.1/typo", pmid: "555" }];
    const results = [
      { id: "1", source: "PPR", doi: "10.1/A", citedByCount: 4 },
      { id: "2", source: "MED", pmid: "11", doi: "10.1/a", citedByCount: 40 },
      { id: "3", source: "MED", doi: "10.1/b" }, // no citedByCount: skipped
      { id: "4", source: "MED", pmid: "999", citedByCount: 7 },
      { id: "5", source: "MED", doi: "10.1/zzz", citedByCount: 1000 }, // not asked for: ignored
      { id: "6", source: "MED", pmid: "555", doi: "10.1/real", citedByCount: 3 }, // DOI typo in the record: matched by PMID
    ];
    const out = matchResults(batch, results, "2026-09-18");
    expect(out.p1).toEqual({ citedBy: 40, source: "MED", id: "2", pmid: "11", fetched: "2026-09-18" });
    expect(out.p2).toBeUndefined();
    expect(out.p3?.citedBy).toBe(7);
    expect(out.p4).toBeUndefined();
    expect(out.p5?.citedBy).toBe(3);
    expect(pickResult([{ source: "PMC", citedByCount: 9 }, { source: "MED", citedByCount: 1 }])?.source).toBe("MED");
  });
});
