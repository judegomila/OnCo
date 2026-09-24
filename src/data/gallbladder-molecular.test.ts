import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import type { DrugInput } from "@/lib/schema";
import spike, { GALLBLADDER_CANCER_ID, gallbladderMolecularLandscape, gallbladderPathways } from "./spikes/gallbladder-molecular";
import { applySpikeSupplements } from "./spikes";

const g = graph();

describe("gallbladder molecular landscape", () => {
  it("names a cohort, a size and a paper behind every frequency, and every target exists", () => {
    for (const row of gallbladderMolecularLandscape) {
      expect(row.sources.length, row.gene).toBeGreaterThan(0);
      for (const s of row.sources) expect(s.url, `${row.gene} source`).toMatch(/^https:\/\/(doi\.org|pubmed\.ncbi\.nlm\.nih\.gov|www\.cbioportal\.org)\//);
      // A cohort size or a cBioPortal count appears in every frequency string.
      expect(row.frequency, `${row.gene} frequency`).toMatch(/\b\d+ of \d+\b|\bn = \d+|\bamong \d+\b|\bof \d+\b|\b\d+ (patients|samples|exomes|tumours|cases|resected|gallbladder)/);
      if (row.targetId !== "tmb-genome-wide") expect(g.get(row.targetId)?.kind, `${row.gene} -> ${row.targetId}`).toBe("target");
      if (typeof row.pct === "number") { expect(row.pct).toBeGreaterThan(0); expect(row.pct).toBeLessThanOrEqual(100); }
    }
  });

  it("is applied to the cancer record and to the targets it names", () => {
    const cancer = g.get(GALLBLADDER_CANCER_ID);
    expect(cancer?.kind).toBe("cancer");
    if (cancer?.kind !== "cancer") return;
    for (const row of gallbladderMolecularLandscape) if (row.targetId !== "tmb-genome-wide") expect(cancer.targets, row.targetId).toContain(row.targetId);
    for (const x of gallbladderPathways) expect(g.get(x.pathwayId)?.kind, x.pathwayId).toBe("pathway");
    const her2 = g.get("her2");
    expect(her2?.kind).toBe("target");
    if (her2?.kind === "target") {
      const rows = her2.prevalence.filter((p) => p.cancerId === GALLBLADDER_CANCER_ID);
      expect(rows.length).toBeGreaterThanOrEqual(3);
      expect(her2.cancers).toContain(GALLBLADDER_CANCER_ID);
    }
    for (const id of spike.patch.keyPapers ?? []) expect(g.get(id)?.kind, id).toBe("paper");
    for (const id of spike.patch.related ?? []) expect(g.get(id)?.kind, id).toBe("biomarker");
  });

  it("supplements append arrays and never override a scalar the owner set", () => {
    const base: DrugInput = { id: "zanidatamab-zovodotin", kind: "drug", name: "Owner name", tldr: "t.", summary: "s", asOf: "2026-01-01", modality: "ADC", mechanism: "m", cancers: ["breast-her2-positive"], payload: "owner payload" };
    const out = applySpikeSupplements({ ...base }) as DrugInput;
    expect(out.name).toBe("Owner name");
    expect(out.payload).toBe("owner payload");
    expect(out.linker).toMatch(/valine-citrulline/);
    expect(out.cancers).toEqual(expect.arrayContaining(["breast-her2-positive", GALLBLADDER_CANCER_ID]));
  });
});
