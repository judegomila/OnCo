import { describe, expect, it } from "vitest";
import { formatEntity, formatSearch, formatTable, formatValue, keyFields, wrap } from "./format";
import type { Entity, EntityRecord } from "./client";

const rec: EntityRecord = {
  entity: { id: "sg", kind: "drug", name: "Sacituzumab govitecan", tldr: "A TROP2 ADC.", summary: "Approved for TNBC.", status: "approved", asOf: "2026-08-01", aka: ["Trodelvy"], tags: ["adc"], links: [{ label: "Label", url: "https://example.org" }], modality: "ADC", approvals: [{ region: "US", year: 2020, indication: "mTNBC" }], targets: ["trop2"], toxicity: [] } as Entity,
  route: "/drugs/sg/",
  neighbours: { cancer: [{ id: "tnbc", kind: "cancer", name: "TNBC", route: "/cancers/tnbc/" }], target: [] },
};

describe("formatValue and keyFields", () => {
  it("renders scalars, string lists and object lists compactly and skips empties", () => {
    expect(formatValue("ADC")).toBe("ADC");
    expect(formatValue(["a", "b"])).toBe("a; b");
    expect(formatValue([])).toBeUndefined();
    expect(formatValue([{ region: "US", year: 2020 }])).toBe("\n    - region US, year 2020");
    expect(formatValue(Array.from({ length: 9 }, (_, i) => `t${i}`), 6)).toMatch(/\(\+3 more\)$/);
  });
  it("keeps kind-specific fields and drops base and relationship fields", () => {
    const keys = keyFields(rec.entity).map(([k]) => k);
    expect(keys).toContain("Modality");
    expect(keys).toContain("Approvals");
    expect(keys).not.toContain("Targets");
    expect(keys).not.toContain("Tldr");
    expect(keys).not.toContain("Toxicity");
  });
});

describe("formatEntity", () => {
  it("prints name, TL;DR, summary, fields, connected records and sources", () => {
    const out = formatEntity(rec);
    expect(out).toContain("Sacituzumab govitecan  [approved]");
    expect(out).toContain("https://onco.cc/drugs/sg/");
    expect(out).toContain("TL;DR\n  A TROP2 ADC.");
    expect(out).toContain("Summary\n  Approved for TNBC.");
    expect(out).toContain("Modality: ADC");
    expect(out).toContain("Cancers: TNBC (tnbc)");
    expect(out).toContain("Label: https://example.org");
    expect(out).toContain("/api/v1/context/sg.md");
  });
});

describe("formatTable and formatSearch", () => {
  it("aligns columns and caps long cells", () => {
    const t = formatTable([{ id: "a", name: "Alpha" }, { id: "bb", name: "x".repeat(50) }], ["id", "name"], { name: 10 });
    const lines = t.split("\n");
    expect(lines[0]).toBe("id  name");
    expect(lines[1]).toBe("--  ----------");
    expect(lines[3]).toBe("bb  xxxxxxxxx…");
    expect(formatTable([], ["id"])).toBe("(no rows)");
  });
  it("says why each hit matched", () => {
    const out = formatSearch([{ id: "sg", kind: "drug", name: "SG", tldr: "t", route: "/drugs/sg/", url: "https://onco.cc/drugs/sg/", matched: { words: true, concepts: ["trop2"] } }]);
    expect(out).toContain("matched: words + concepts (trop2)");
    expect(formatSearch([])).toBe("No matches.");
  });
  it("wraps text at word boundaries", () => {
    expect(wrap("one two three four", 9)).toEqual(["one two", "three", "four"]);
  });
});
