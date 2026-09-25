import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import spike, { TNBC_CANCER_ID, tnbcMolecularLandscape, tnbcPathways, tnbcSubtypes, tnbcRegionalDifferences, tnbcCtdnaStudies } from "./spikes/tnbc-molecular";

const g = graph();
const SOURCE_HOST = /^https:\/\/(doi\.org|pubmed\.ncbi\.nlm\.nih\.gov|www\.cbioportal\.org)\//;
/** A cohort size or a cBioPortal count appears in every frequency string. */
const COHORT = /\b\d+ of \d+\b|\bamong \d[\d,]*\b|\bof \d[\d,]*\b|\b\d[\d,]* (patients|samples|exomes|tumours|genomes|cases|TNBCs|whole genomes|unselected)/;

describe("triple-negative breast cancer molecular landscape", () => {
  it("names a cohort, a size and a paper behind every frequency, and every target exists", () => {
    for (const row of tnbcMolecularLandscape) {
      expect(row.sources.length, row.gene).toBeGreaterThan(0);
      for (const s of row.sources) expect(s.url, `${row.gene} source`).toMatch(SOURCE_HOST);
      expect(row.frequency, `${row.gene} frequency`).toMatch(COHORT);
      if (row.targetId) expect(g.get(row.targetId)?.kind, `${row.gene} -> ${row.targetId}`).toBe("target");
      if (typeof row.pct === "number") { expect(row.pct).toBeGreaterThan(0); expect(row.pct).toBeLessThanOrEqual(100); }
      else expect(row.pct).toMatch(/^\d+(\.\d+)?(-\d+(\.\d+)?)?$/);
    }
    for (const s of tnbcSubtypes) for (const src of s.sources) expect(src.url, s.subtype).toMatch(SOURCE_HOST);
    for (const r of tnbcRegionalDifferences) expect(r.sources.length, r.region).toBeGreaterThan(0);
    for (const c of tnbcCtdnaStudies) expect(c.sources.length, c.study).toBeGreaterThan(0);
  });

  it("is applied to the cancer record and to the targets and readouts it names", () => {
    const cancer = g.get(TNBC_CANCER_ID);
    expect(cancer?.kind).toBe("cancer");
    if (cancer?.kind !== "cancer") return;
    for (const row of tnbcMolecularLandscape) if (row.targetId) expect(cancer.targets, row.targetId).toContain(row.targetId);
    for (const x of tnbcPathways) expect(g.get(x.pathwayId)?.kind, x.pathwayId).toBe("pathway");
    for (const id of spike.patch.keyPapers ?? []) expect(g.get(id)?.kind, id).toBe("paper");
    for (const id of spike.patch.related ?? []) {
      const bm = g.get(id);
      expect(bm?.kind, id).toBe("biomarker");
      if (bm?.kind === "biomarker") expect(bm.notes.some((n) => /triple-negative/i.test(n)), `${id} carries a TNBC note`).toBe(true);
    }
    const pdl1 = g.get("pdl1");
    if (pdl1?.kind === "target") expect(pdl1.prevalence.filter((p) => p.cancerId === TNBC_CANCER_ID).length).toBeGreaterThanOrEqual(2);
    const brca = g.get("brca");
    if (brca?.kind === "target") expect(brca.prevalence.filter((p) => p.cancerId === TNBC_CANCER_ID && /germline/i.test(p.measure ?? "")).length).toBeGreaterThanOrEqual(2);
  });

  it("the three antibody-drug conjugates carry the payload and linker fields the pipeline decomposer reads", () => {
    for (const id of ["sacituzumab-govitecan", "datopotamab-deruxtecan", "trastuzumab-deruxtecan"]) {
      const d = g.get(id);
      expect(d?.kind, id).toBe("drug");
      if (d?.kind !== "drug") continue;
      expect(d.payload, `${id} payload`).toMatch(/topoisomerase|TOP1/i);
      expect(d.linker, `${id} linker`).toBeTruthy();
      expect(d.targets.length, `${id} target`).toBeGreaterThan(0);
      expect(d.cancers, `${id} linked to TNBC`).toContain(TNBC_CANCER_ID);
    }
  });

  it("house style: no em-dashes or 'as of' in the layer's prose", () => {
    const strings: string[] = [];
    const walk = (v: unknown) => { if (typeof v === "string") strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
    walk(spike.patch); walk(spike.entities); walk(spike.supplements); walk(tnbcSubtypes); walk(tnbcRegionalDifferences); walk(tnbcCtdnaStudies);
    for (const s of strings) { expect(s).not.toMatch(/[—–]/); expect(s).not.toMatch(/\bas of\b/i); }
  });
});
