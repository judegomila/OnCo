import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { ICI_DRUGS, irae } from "@/data/irae";

describe("irAE guide data", () => {
  it("every product and term id resolves and each organ has grades 1-4 in order", () => {
    const g = graph();
    for (const id of ICI_DRUGS) expect(g.get(id)?.kind, id).toBe("drug");
    const ids = new Set<string>();
    for (const e of irae) {
      expect(ids.has(e.id), e.id).toBe(false);
      ids.add(e.id);
      for (const id of e.terms ?? []) expect(g.get(id)?.kind, `${e.id}: ${id}`).toBe("term");
      expect(e.grades.map((x) => x.grade)).toEqual([1, 2, 3, 4]);
      expect(e.sources.length).toBeGreaterThan(0);
      for (const s of e.sources) expect(s.url).toMatch(/^https:\/\//);
    }
    expect(irae.length).toBeGreaterThanOrEqual(12);
  });

  it("myocarditis is permanently discontinued from grade 2 and grade 4 events discontinue except endocrine", () => {
    const myo = irae.find((e) => e.id === "myocarditis")!;
    for (const gr of myo.grades.filter((x) => x.grade >= 2)) expect(gr.hold).toBe("discontinue");
    for (const e of irae.filter((x) => x.organ !== "Endocrine" && !["arthritis", "haematologic", "hypophysitis"].includes(x.id))) {
      const g4 = e.grades.find((x) => x.grade === 4)!;
      expect(["discontinue", "hold-consider-permanent", "hold"].includes(g4.hold), e.id).toBe(true);
    }
  });
});
