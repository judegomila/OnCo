import { describe, expect, it } from "vitest";
import { lineOf, sequencingFor, sequencingIndex, subgroupOf, LINE_ORDER } from "./sequencing";

describe("sequencing: setting parser", () => {
  it("classifies lines of therapy from setting text", () => {
    expect(lineOf("Metastatic, first line")).toBe("line-1");
    expect(lineOf("Metastatic first line")).toBe("line-1");
    expect(lineOf("Advanced, first line")).toBe("line-1");
    expect(lineOf("Metastatic, second line")).toBe("line-2");
    expect(lineOf("Relapsed/refractory")).toBe("line-3-plus");
    expect(lineOf("Relapsed")).toBe("line-2");
    expect(lineOf("Third line and beyond")).toBe("line-3-plus");
    expect(lineOf("Metastatic, later lines")).toBe("line-3-plus");
    expect(lineOf("Stage II-III, neoadjuvant")).toBe("early");
    expect(lineOf("Localised, resectable")).toBe("early");
    expect(lineOf("Stage III unresectable")).toBe("locally-advanced");
    expect(lineOf("Locally advanced unresectable")).toBe("locally-advanced");
    expect(lineOf("Screening")).toBe("screening");
    expect(lineOf("Diagnosis and staging")).toBe("screening");
    expect(lineOf("Maintenance")).toBe("maintenance");
    expect(lineOf("Brain metastases")).toBe("special");
    expect(lineOf("Survivorship")).toBe("special");
    expect(lineOf("Newly diagnosed")).toBe("line-1");
    expect(lineOf("Unfit for intensive chemotherapy (most patients over 75)")).toBe("special");
  });

  it("extracts the biomarker subgroup, longest pattern first", () => {
    expect(subgroupOf("Metastatic, HER2-low")).toBe("HER2-low");
    expect(subgroupOf("Metastatic, HER2-positive")).toBe("HER2");
    expect(subgroupOf("Metastatic, KRAS G12C")).toBe("KRAS G12C");
    expect(subgroupOf("Metastatic, BRAF V600E")).toBe("BRAF");
    expect(subgroupOf("MSI-high / dMMR, first line")).toBe("MSI-H / dMMR");
    expect(subgroupOf("Ph-positive ALL, newly diagnosed")).toBe("Ph-positive");
    expect(subgroupOf("Metastatic, first line")).toBe("All comers");
    expect(subgroupOf("Children, standard risk B-ALL")).toBe("Age group");
  });
});

describe("sequencing: tables from the graph", () => {
  it("builds a table for every cancer with standard-of-care rows", () => {
    const idx = sequencingIndex();
    expect(idx.length).toBeGreaterThan(30);
    for (const c of idx) expect(c.rows, c.id).toBeGreaterThan(0);
  });

  it("HER2-positive breast cancer has first, second and later lines and its sequence pairings", () => {
    const t = sequencingFor("breast-her2-positive")!;
    expect(t).not.toBeNull();
    const lines = t.lines.map((l) => l.line);
    expect(lines).toContain("line-1");
    expect(lines).toContain("line-2");
    expect(lines).toContain("line-3-plus");
    expect(t.subgroups).toContain("HER2");
    for (const l of t.lines) expect(LINE_ORDER).toContain(l.line);
    const first = t.lines.find((l) => l.line === "line-1")!.rows[0];
    expect(first.refs.length).toBeGreaterThan(0);
    expect(first.evidence).not.toBeNull();
  });

  it("melanoma picks up the immunotherapy-first sequence pairing", () => {
    const t = sequencingFor("melanoma")!;
    expect(t.pairings.map((p) => p.id)).toContain("io-first-then-braf-mek");
  });

  it("returns null for a non-cancer id", () => {
    expect(sequencingFor("pembrolizumab")).toBeNull();
  });
});
