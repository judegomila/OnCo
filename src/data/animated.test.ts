import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { ALL_ANIMATED } from "./schematics";
import { ANIMATED, MODALITY_SCHEMATICS, schematicForModality } from "./animated";

describe("animated process schematics", () => {
  it("every modality string in the corpus maps to a schematic that exists", () => {
    const missing: string[] = [];
    const unknownKey: string[] = [];
    for (const d of graph().kind("drug")) {
      const key = schematicForModality(d.modality, d.technologies);
      if (!key) { missing.push(`${d.id}: "${d.modality}"`); continue; }
      if (!(key in ALL_ANIMATED)) unknownKey.push(`${d.id}: ${key}`);
    }
    expect(missing, `modalities without a schematic:\n${missing.join("\n")}`).toEqual([]);
    expect(unknownKey, `keys not registered in ALL_ANIMATED:\n${unknownKey.join("\n")}`).toEqual([]);
  });

  it("every rule points at a registered schematic", () => {
    for (const [, key] of MODALITY_SCHEMATICS) expect(key in ALL_ANIMATED, key).toBe(true);
  });

  it("the six added modalities have dedicated animations", () => {
    for (const k of ["bispecific-antibody", "protac-degrader", "oncolytic-virus", "til-therapy", "tcr-t", "neoantigen-mrna-vaccine"]) expect(k in ANIMATED, k).toBe(true);
  });

  it("every animation stays under 500 points and produces a caption for each phase", () => {
    for (const [key, build] of Object.entries(ANIMATED)) {
      const m = build();
      expect(m.points.length, `${key} points`).toBeLessThan(500);
      expect(m.animate, `${key} has animate`).toBeTruthy();
      const n = m.points.length;
      for (const t of [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.99]) {
        const f = m.animate!.frame(t);
        expect(f.caption, `${key} caption at t=${t}`).toBeTruthy();
        expect(f.points?.length ?? n, `${key} points at t=${t}`).toBe(n);
        expect(f.alpha?.length ?? m.segments.length, `${key} alpha at t=${t}`).toBe(m.segments.length);
        for (const p of f.points ?? []) for (const c of p) expect(Number.isFinite(c), `${key} finite coords at t=${t}`).toBe(true);
      }
    }
  });

  it("classifies representative modality strings", () => {
    expect(schematicForModality("Bispecific antibody (PD-1×VEGF)")).toBe("bispecific-antibody");
    expect(schematicForModality("Fixed-dose bispecific combination (anti-LAG-3 + anti-PD-1)")).toBe("checkpoint-inhibitor");
    expect(schematicForModality("ImmTAC (TCR×CD3 bispecific)")).toBe("t-cell-engager");
    expect(schematicForModality("PROTAC oestrogen receptor degrader")).toBe("protac-degrader");
    expect(schematicForModality("Oncolytic virus (HSV-1)")).toBe("oncolytic-virus");
    expect(schematicForModality("Non-replicating adenoviral gene therapy (intravesical)")).toBe("viral-gene-therapy");
    expect(schematicForModality("TIL cell therapy")).toBe("til-therapy");
    expect(schematicForModality("TCR-T (MAGE-A4)")).toBe("tcr-t");
    expect(schematicForModality("Personalised mRNA neoantigen vaccine")).toBe("neoantigen-mrna-vaccine");
    expect(schematicForModality("Cytotoxic chemotherapy (taxane)")).toBe("front:chemotherapy");
    expect(schematicForModality("Oral SERD")).toBe("front:hormonal");
    expect(schematicForModality("Small-molecule kinase inhibitor (ALK)")).toBe("front:targeted-therapy");
    expect(schematicForModality("ADC", ["adc"])).toBe("adc");
  });
});
