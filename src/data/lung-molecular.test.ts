import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import spike, { LUNG_CANCER_ID, lungAdenocarcinomaLandscape, lungLiquidBiopsy, lungMolecularLandscape, lungNeverSmoker, lungPathways, lungPdl1Assays, lungResistance, lungSclcSubtypes, lungSmallCellLandscape, lungSquamousLandscape, lungTmb } from "./spikes/lung-molecular";

const g = graph();
const SOURCE_HOST = /^https:\/\/(doi\.org|pubmed\.ncbi\.nlm\.nih\.gov|www\.cbioportal\.org)\//;
/** A cohort size or a cBioPortal count appears in every frequency string. */
const COHORT = /\b\d[\d,]* of \d[\d,]*\b|\b\d[\d,]* (patients|samples|exomes|tumours|genomes|cases|specimens)\b/;

describe("lung cancer molecular landscape", () => {
  it("keeps the three histologies apart and names a cohort, a size and a source behind every frequency", () => {
    expect(lungAdenocarcinomaLandscape.length).toBeGreaterThan(20);
    expect(lungSquamousLandscape.length).toBeGreaterThan(5);
    expect(lungSmallCellLandscape.length).toBeGreaterThanOrEqual(4);
    expect(lungMolecularLandscape.length).toBe(lungAdenocarcinomaLandscape.length + lungSquamousLandscape.length + lungSmallCellLandscape.length);
    for (const table of [lungAdenocarcinomaLandscape, lungSquamousLandscape, lungSmallCellLandscape]) {
      const seen = new Set<string>();
      for (const row of table) {
        expect(seen.has(row.gene), `duplicate row ${row.gene}`).toBe(false);
        seen.add(row.gene);
        expect(row.sources.length, row.gene).toBeGreaterThan(0);
        for (const s of row.sources) expect(s.url, `${row.gene} source`).toMatch(SOURCE_HOST);
        expect(row.frequency, `${row.gene} frequency`).toMatch(COHORT);
        if (row.targetId) expect(g.get(row.targetId)?.kind, `${row.gene} -> ${row.targetId}`).toBe("target");
        if (typeof row.pct === "number") { expect(row.pct).toBeGreaterThan(0); expect(row.pct).toBeLessThanOrEqual(100); }
        else expect(row.pct).toMatch(/^\d+(\.\d+)?(-\d+(\.\d+)?)?$/);
      }
    }
  });

  it("every measurement table cites its sources", () => {
    for (const a of lungPdl1Assays) { expect(a.sources.length, a.assay).toBeGreaterThan(0); for (const s of a.sources) expect(s.url, a.assay).toMatch(SOURCE_HOST); }
    for (const t of lungTmb) { expect(t.sources.length, t.question).toBeGreaterThan(0); for (const s of t.sources) expect(s.url, t.question).toMatch(SOURCE_HOST); }
    for (const n of lungNeverSmoker) expect(n.sources.length, n.feature).toBeGreaterThan(0);
    for (const r of lungResistance) { expect(r.sources.length, r.setting).toBeGreaterThan(0); expect(r.nextTreatment.length, `${r.setting} needs a next step`).toBeGreaterThan(40); }
    for (const l of lungLiquidBiopsy) { expect(l.sources.length, l.question).toBeGreaterThan(0); expect(l.limit.length, `${l.question} needs a limit`).toBeGreaterThan(30); }
    for (const s of lungSclcSubtypes) expect(s.sources.length, s.subtype).toBeGreaterThan(0);
  });

  it("is applied to the lung records and to the targets, readouts and pathways it names", () => {
    const cancer = g.get(LUNG_CANCER_ID);
    expect(cancer?.kind).toBe("cancer");
    if (cancer?.kind !== "cancer") return;
    for (const row of [...lungAdenocarcinomaLandscape, ...lungSquamousLandscape]) if (row.targetId) expect(cancer.targets, row.targetId).toContain(row.targetId);
    const sclc = g.get("sclc");
    expect(sclc?.kind).toBe("cancer");
    if (sclc?.kind === "cancer") for (const row of lungSmallCellLandscape) if (row.targetId) expect(sclc.targets, `sclc -> ${row.targetId}`).toContain(row.targetId);
    for (const x of lungPathways) expect(g.get(x.pathwayId)?.kind, x.pathwayId).toBe("pathway");
    for (const id of spike.patch.keyPapers ?? []) expect(g.get(id)?.kind, id).toBe("paper");
    for (const id of spike.patch.related ?? []) {
      const bm = g.get(id);
      expect(bm?.kind, id).toBe("biomarker");
      if (bm?.kind === "biomarker") expect([...bm.notes, bm.summary, bm.tldr].some((n) => /lung/i.test(n)), `${id} says something about lung cancer`).toBe(true);
    }
  });

  it("the targets that decide lung treatment carry a prevalence row for the right cancer", () => {
    for (const id of ["egfr", "kras", "alk", "ros1", "ret", "met", "her2", "braf", "stk11", "keap1", "pdl1"]) {
      const t = g.get(id);
      expect(t?.kind, id).toBe("target");
      if (t?.kind !== "target") continue;
      if (id !== "pdl1") expect(t.prevalence.filter((p) => p.cancerId === LUNG_CANCER_ID).length, `${id} prevalence`).toBeGreaterThanOrEqual(1);
      expect(t.cancers, `${id} linked to lung`).toContain(LUNG_CANCER_ID);
    }
    const rb1 = g.get("rb1");
    if (rb1?.kind === "target") expect(rb1.prevalence.filter((p) => p.cancerId === "sclc").length).toBeGreaterThanOrEqual(1);
  });

  // nrg1-fusion is not in this list: the core layer wrote that readout into biomarker-readouts-2.ts, where its
  // scoring rule is quoted from the zenocutuzumab label rather than a paper, and this layer supplements it. The
  // rule below still holds for every readout, so the quote and the patient sentence are checked on all four.
  it("the new readouts have a parent, a quoted scoring rule and something that defines them", () => {
    for (const id of ["egfr-c797s", "alk-resistance-mutation", "nrg1-fusion", "stk11-keap1-loss"]) {
      const bm = g.get(id);
      expect(bm?.kind, id).toBe("biomarker");
      if (bm?.kind !== "biomarker") continue;
      expect(g.get(bm.target ?? "")?.kind, `${id} parent`).toBe("target");
      expect(bm.scoringRule.quote.length, id).toBeGreaterThan(10);
      expect(bm.scoringRule.source, id).toMatch(/^https:\/\//);
      expect(bm.forPatient.length, `${id} forPatient`).toBeGreaterThan(40);
      if (id === "nrg1-fusion") continue;
      expect(bm.scoringRule.source, id).toMatch(/^https:\/\/doi\.org\//);
      expect(bm.definedBy?.url, `${id} definedBy`).toMatch(/^https:\/\/doi\.org\//);
    }
  });

  it("house style: no em-dashes or 'as of' in the layer's prose", () => {
    const strings: string[] = [];
    const walk = (v: unknown) => { if (typeof v === "string") strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
    walk(spike.patch); walk(spike.entities); walk(spike.supplements);
    walk(lungMolecularLandscape); walk(lungPdl1Assays); walk(lungTmb); walk(lungNeverSmoker); walk(lungResistance); walk(lungLiquidBiopsy); walk(lungSclcSubtypes); walk(lungPathways);
    for (const s of strings) { expect(s).not.toMatch(/[—–]/); expect(s).not.toMatch(/\bas of\b/i); }
  });
});
