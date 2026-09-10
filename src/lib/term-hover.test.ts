import { describe, expect, it } from "vitest";
import { buildMatcher, findMatches, scan } from "./entity-matcher";
import { entityPatterns, termMarks } from "./term-hover";

type Ref = { id: string };
const m = buildMatcher<Ref>([
  { pattern: "HER2", ref: { id: "her2" } },
  { pattern: "HER2-low", ref: { id: "her2-low" } },
  { pattern: "PD-1", ref: { id: "pd1" } },
  { pattern: "PD-L1", ref: { id: "pdl1" } },
  { pattern: "TROP2", ref: { id: "trop2" } },
  { pattern: "trastuzumab deruxtecan", ref: { id: "tdxd" } },
  { pattern: "trastuzumab", ref: { id: "trastuzumab" } },
]);
const ids = (text: string) => findMatches(m, text, { key: (r) => r.id }).map((h) => [h.ref.id, text.slice(h.start, h.end)]);

describe("entity matcher", () => {
  it("prefers the longest match at a position: HER2-low beats HER2", () => {
    expect(ids("Results in HER2-low disease were positive.")).toEqual([["her2-low", "HER2-low"]]);
  });

  it("respects word boundaries and hyphens", () => {
    expect(ids("PD-L1 expression")).toEqual([["pdl1", "PD-L1"]]);
    expect(ids("anti-PD-1 antibody")).toEqual([]); // PD-1 sits inside a hyphenated compound
    expect(ids("HER2+ tumours and her2 status")).toEqual([["her2", "HER2"]]);
  });

  it("is case-insensitive and links each record once, first occurrence", () => {
    expect(ids("Trastuzumab deruxtecan, then trastuzumab alone, then TROP2 and trop2.")).toEqual([["tdxd", "Trastuzumab deruxtecan"], ["trastuzumab", "trastuzumab"], ["trop2", "TROP2"]]);
  });

  it("skips and caps", () => {
    const hits = findMatches(m, "HER2 and TROP2 and PD-L1", { key: (r) => r.id, skip: (r) => r.id === "her2", max: 1 });
    expect(hits.map((h) => h.ref.id)).toEqual(["trop2"]);
  });

  it("scan reports every boundary-valid occurrence including overlaps", () => {
    expect(scan(m, "HER2-low").map((h) => h.ref.id).sort()).toEqual(["her2-low"]);
    expect(scan(m, "HER2 low").map((h) => h.ref.id)).toEqual(["her2"]);
  });
});

describe("corpus auto-linking", () => {
  it("builds patterns for thousands of names and links HER2-low as a term, not a target", () => {
    const patterns = entityPatterns();
    expect(patterns.length).toBeGreaterThan(3000);
    const text = "Trastuzumab deruxtecan is approved for HER2-low breast cancer after DESTINY-Breast04.";
    const marks = termMarks(text, 6);
    const hrefs = marks.map((mk) => mk.href);
    expect(hrefs).toContain("/drugs/trastuzumab-deruxtecan/");
    expect(hrefs).toContain("/trials/destiny-breast04/");
    // "HER2-low" is the glossary term (its entry is named "HER2-low and HER2-ultralow"; each half is a pattern) ...
    expect(hrefs).toContain("/terms/her2-low/");
    expect(marks.find((mk) => mk.href === "/terms/her2-low/") && text.slice(marks.find((mk) => mk.href === "/terms/her2-low/")!.s, marks.find((mk) => mk.href === "/terms/her2-low/")!.e)).toBe("HER2-low");
    // ... and the HER2 target is not linked from inside the hyphenated compound.
    expect(hrefs).not.toContain("/targets/her2/");
  });

  it("a glossary term's bracketed qualifier does not shadow the record that owns the name", () => {
    const byPattern = new Map(entityPatterns().map((p) => [p.pattern.toLowerCase(), p.ref]));
    expect(byPattern.get("melanoma")?.route).toBe("/cancers/melanoma/");
    expect(byPattern.get("myeloma")?.kind).not.toBe("term");
    expect(byPattern.has("minimal")).toBe(false);
  });

  it("links the two-letter aliases OS and 1L, and hyphenated variants such as first-line and ctDNA-positive", () => {
    const hrefs = termMarks("OS improved in 1L; first-line ctDNA-positive patients did worse.", 8).map((mk) => mk.href);
    expect(hrefs).toContain("/terms/os/");
    expect(hrefs).toContain("/terms/first-line/");
    expect(hrefs).toContain("/terms/ctdna/");
  });
});
