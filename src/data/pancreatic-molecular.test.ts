import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import spike, {
  PANCREATIC_CANCER_ID,
  pancreaticMolecularLandscape,
  pancreaticPathways,
  pancreaticSubtypes,
  pancreaticPrecursors,
  pancreaticMicroenvironment,
  pancreaticMonitoringMarkers,
  pancreaticEarlyDetection,
} from "./spikes/pancreatic-molecular";

const g = graph();
const SOURCE_HOST = /^https:\/\/(doi\.org|pubmed\.ncbi\.nlm\.nih\.gov|www\.cbioportal\.org)\//;
/** A cohort size or a cBioPortal count appears in every frequency string. */
const COHORT = /\b\d+ of \d[\d,]*\b|\bamong \d[\d,]*\b|\bof \d[\d,]*\b|\b\d[\d,]* (patients|samples|exomes|tumours|genomes|cases|whole genomes|studies|IPMNs|cancers)/;

describe("pancreatic cancer molecular landscape", () => {
  it("names a cohort, a size and a paper behind every frequency, and every target exists", () => {
    for (const row of pancreaticMolecularLandscape) {
      expect(row.sources.length, row.gene).toBeGreaterThan(0);
      for (const s of row.sources) expect(s.url, `${row.gene} source`).toMatch(SOURCE_HOST);
      expect(row.frequency, `${row.gene} frequency`).toMatch(COHORT);
      if (row.targetId) expect(g.get(row.targetId)?.kind, `${row.gene} -> ${row.targetId}`).toBe("target");
      if (typeof row.pct === "number") { expect(row.pct).toBeGreaterThan(0); expect(row.pct).toBeLessThanOrEqual(100); }
      else expect(row.pct).toMatch(/^\d+(\.\d+)?(-\d+(\.\d+)?)?$/);
    }
    for (const s of pancreaticSubtypes) for (const src of s.sources) expect(src.url, s.subtype).toMatch(SOURCE_HOST);
    for (const x of pancreaticPrecursors) expect(x.sources.length, x.lesion).toBeGreaterThan(0);
    for (const x of pancreaticMicroenvironment) expect(x.sources.length, x.feature).toBeGreaterThan(0);
    for (const x of pancreaticMonitoringMarkers) expect(x.sources.length, x.marker).toBeGreaterThan(0);
    for (const x of pancreaticEarlyDetection) expect(x.sources.length, x.programme).toBeGreaterThan(0);
  });

  it("the KRAS allele rows cover the shares the brief names and stay inside the KRAS total", () => {
    const alleles = ["G12D", "G12V", "G12R", "Q61", "G12C"];
    for (const a of alleles) {
      const row = pancreaticMolecularLandscape.find((r) => r.gene === `KRAS ${a}`);
      expect(row, `KRAS ${a} row`).toBeTruthy();
      expect(row?.targetId).toBe("kras");
    }
    const anyKras = pancreaticMolecularLandscape.find((r) => r.gene === "KRAS");
    expect(String(anyKras?.pct)).toMatch(/^8[0-9]-9[0-9]$/);
  });

  it("is applied to the cancer record and to the targets, readouts and pathways it names", () => {
    const cancer = g.get(PANCREATIC_CANCER_ID);
    expect(cancer?.kind).toBe("cancer");
    if (cancer?.kind !== "cancer") return;
    for (const row of pancreaticMolecularLandscape) if (row.targetId) expect(cancer.targets, row.targetId).toContain(row.targetId);
    for (const x of pancreaticPathways) expect(g.get(x.pathwayId)?.kind, x.pathwayId).toBe("pathway");
    for (const id of spike.patch.keyPapers ?? []) expect(g.get(id)?.kind, id).toBe("paper");
    for (const id of spike.patch.related ?? []) {
      const bm = g.get(id);
      expect(bm?.kind, id).toBe("biomarker");
      if (bm?.kind === "biomarker") expect(bm.notes.some((n) => /pancreatic/i.test(n)), `${id} carries a pancreatic note`).toBe(true);
    }
    const kras = g.get("kras");
    if (kras?.kind === "target") {
      const rows = kras.prevalence.filter((x) => x.cancerId === PANCREATIC_CANCER_ID);
      expect(rows.length, "KRAS prevalence rows for pancreatic cancer").toBeGreaterThanOrEqual(6);
      expect(rows.some((x) => /G12D/.test(x.measure ?? "")), "a G12D prevalence row").toBe(true);
    }
    const smad4 = g.get("smad4");
    if (smad4?.kind === "target") expect(smad4.notes.some((n) => /metastatic pattern|widespread metastasis/i.test(n)), "SMAD4 carries the metastatic-pattern note").toBe(true);
  });

  it("the RAS inhibitors carry the mechanism and target fields the engine decomposer reads", () => {
    for (const id of ["sotorasib", "adagrasib", "daraxonrasib", "zoldonrasib", "mrtx1133"]) {
      const d = g.get(id);
      expect(d?.kind, id).toBe("drug");
      if (d?.kind !== "drug") continue;
      expect(d.targets, `${id} target`).toContain("kras");
      expect(`${d.modality} ${d.mechanism}`, `${id} mechanism class`).toMatch(/KRAS|\bRAS\b/);
      expect(`${d.modality} ${d.mechanism}`, `${id} binding mode`).toMatch(/covalent|non-covalent|allosteric|selective|tri-complex|switch-II/i);
      expect(d.modality, `${id} modality resolves to small molecule`).toMatch(/small[- ]molecule/i);
    }
    const dara = g.get("daraxonrasib");
    if (dara?.kind === "drug") expect(dara.cancers).toContain(PANCREATIC_CANCER_ID);
  });

  it("house style: no em-dashes or 'as of' in the layer's prose", () => {
    const strings: string[] = [];
    const walk = (v: unknown) => { if (typeof v === "string") strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
    walk(spike.patch); walk(spike.entities); walk(spike.supplements);
    walk(pancreaticSubtypes); walk(pancreaticPrecursors); walk(pancreaticMicroenvironment); walk(pancreaticMonitoringMarkers); walk(pancreaticEarlyDetection);
    for (const s of strings) { expect(s).not.toMatch(/[—–]/); expect(s).not.toMatch(/\bas of\b/i); }
  });
});
