import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { GENERAL_RED_FLAGS, redFlagSets, redFlagsFor } from "@/data/red-flags";

describe("red flags", () => {
  it("every set has a match rule, every flag has a source URL, and copy has no em-dashes", () => {
    for (const s of redFlagSets) {
      expect(!!(s.drugIds?.length || s.modalityRe), s.id).toBe(true);
      expect(s.flags.length, s.id).toBeGreaterThan(0);
      if (s.modalityRe) expect(() => new RegExp(s.modalityRe as string, "i")).not.toThrow();
      for (const f of [...s.flags, ...GENERAL_RED_FLAGS.flags]) {
        expect(f.source.url, `${s.id}: ${f.symptom}`).toMatch(/^https:\/\//);
        expect(`${f.symptom} ${f.threshold}`).not.toMatch(/—/);
      }
    }
    expect(GENERAL_RED_FLAGS.flags.length).toBeGreaterThan(3);
  });

  it("every drugId is a product in the corpus", () => {
    const g = graph();
    for (const s of redFlagSets) for (const id of s.drugIds ?? []) {
      const e = g.get(id);
      expect(e?.kind, `${s.id}: ${id}`).toBe("drug");
    }
  });

  it("matches the main classes by id or modality", () => {
    const g = graph();
    const pick = (id: string) => { const d = g.must(id); return d.kind === "drug" ? redFlagsFor(d.id, d.modality).map((s) => s.id) : []; };
    expect(pick("pembrolizumab")).toContain("checkpoint-inhibitors");
    expect(pick("trastuzumab-deruxtecan")).toContain("deruxtecan-adcs");
    expect(pick("enfortumab-vedotin")).toContain("adcs");
    expect(pick("axicabtagene-ciloleucel")).toContain("car-t");
    expect(pick("teclistamab")).toContain("t-cell-engagers");
    expect(pick("doxorubicin")).toContain("cytotoxic");
    expect(pick("bevacizumab")).toContain("vegf-inhibitors");
    expect(pick("osimertinib")).toContain("kinase-inhibitors");
    expect(pick("ibrutinib")).toContain("btk-inhibitors");
    expect(pick("olaparib")).toContain("parp-inhibitors");
    expect(pick("radium-223")).toContain("radioligands");
    expect(pick("venetoclax")).toContain("venetoclax");
    // A PET tracer is not a therapy and should get no class card.
    expect(pick("ga68-dotatate")).toEqual([]);
  });

  it("covers most products that carry structured toxicity data", () => {
    const g = graph();
    const withTox = g.kind("drug").filter((d) => d.toxicity.length);
    const covered = withTox.filter((d) => redFlagsFor(d.id, d.modality).length > 0);
    expect(covered.length / withTox.length).toBeGreaterThan(0.6);
  });
});
