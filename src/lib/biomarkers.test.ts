import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { GENOME_WIDE_MEASUREMENTS, MEASUREMENTS } from "./schema";
import { MEASUREMENT_META, readoutsForDrug, readoutsForTarget, siblingReadouts, trialsNaming } from "./biomarkers";
import { TUMOUR_TESTS } from "@/data/tumour-tests";
import { assays } from "@/data/assays";
import { BIOMARKER_SKIPS } from "@/data/biomarker-readouts-4";
import { CDX_DEVICE_IDS } from "@/data/biomarker-readouts";

const g = graph();
const readouts = g.kind("biomarker");

describe("biomarker readouts", () => {
  it("exist and every one has a parent target that exists, unless it is a genome-wide measurement", () => {
    expect(readouts.length).toBeGreaterThan(50);
    for (const bm of readouts) {
      if (bm.target) {
        const t = g.get(bm.target);
        expect(t?.kind, `${bm.id} parent ${bm.target}`).toBe("target");
      } else if (!bm.noParentReason) {
        expect(GENOME_WIDE_MEASUREMENTS, `${bm.id} has no parent and is not genome-wide`).toContain(bm.measurement);
      }
    }
  });

  it("every threshold has a source URL, a regulator, and drug and cancer ids that exist", () => {
    for (const bm of readouts) for (const t of bm.thresholds) {
      expect(t.source, `${bm.id} threshold ${t.value}`).toMatch(/^https:\/\//);
      expect(t.regulator.length).toBeGreaterThan(0);
      expect(g.get(t.drugId)?.kind, `${bm.id} threshold drug ${t.drugId}`).toBe("drug");
      expect(g.get(t.cancerId)?.kind, `${bm.id} threshold cancer ${t.cancerId}`).toBe("cancer");
    }
  });

  it("a readout with no current threshold cites the guideline or trial that defines it", () => {
    for (const bm of readouts) {
      if (!bm.thresholds.some((t) => t.status === "current")) expect(bm.definedBy?.url ?? bm.scoringRule.source, `${bm.id} needs definedBy or a scoring source`).toMatch(/^https:\/\//);
    }
  });

  it("scoring rules quote a defining source and approval sources stay on the label and regulator allowlist", () => {
    const ok = /^https:\/\/(dailymed\.nlm\.nih\.gov|www\.fda\.gov|doi\.org|clinicaltrials\.gov|tumourclassification\.iarc\.who\.int)\//;
    // CAP's breast reporting template defines scoring directly. A scoring guideline is not an approval
    // source: thresholds and companion diagnostics keep the narrower existing label/regulator check.
    const scoringSource = /^https:\/\/www\.cap\.org\/wp-content\/uploads\//;
    for (const bm of readouts) {
      expect(bm.scoringRule.quote.length, bm.id).toBeGreaterThan(10);
      expect(ok.test(bm.scoringRule.source) || scoringSource.test(bm.scoringRule.source), `${bm.id} scoring source`).toBe(true);
      for (const t of bm.thresholds) expect(t.source, `${bm.id} threshold source`).toMatch(ok);
      for (const c of bm.companionDiagnostics) expect(c.source, `${bm.id} cdx source`).toMatch(ok);
    }
  });

  it("no biomarker id duplicates a glossary term id, and the terms it aliases exist", () => {
    const termIds = new Set(g.kind("term").map((t) => t.id));
    for (const bm of readouts) {
      expect(termIds.has(bm.id), `${bm.id} collides with a term`).toBe(false);
      for (const id of bm.terms) expect(termIds.has(id), `${bm.id} -> term ${id}`).toBe(true);
    }
  });

  it("tests, assays and companion diagnostic companies resolve", () => {
    const testIds = new Set(TUMOUR_TESTS.map((t) => t.id));
    const assayIds = new Set(assays.map((a) => a.id));
    for (const bm of readouts) {
      for (const id of bm.tests) expect(testIds.has(id), `${bm.id} -> tumour test ${id}`).toBe(true);
      for (const id of bm.assays) expect(assayIds.has(id), `${bm.id} -> assay ${id}`).toBe(true);
      for (const c of bm.companionDiagnostics) {
        if (c.companyId) expect(g.get(c.companyId)?.kind, `${bm.id} cdx company ${c.companyId}`).toBe("company");
        if (c.deviceId) expect(g.get(c.deviceId)?.kind, `${bm.id} cdx device ${c.deviceId}`).toBe("drug");
        for (const d of c.drugs) expect(g.get(d)?.kind, `${bm.id} cdx drug ${d}`).toBe("drug");
      }
    }
  });

  it("every companion diagnostic device map entry names a test record and a row that uses it", () => {
    const used = new Set(readouts.flatMap((bm) => bm.companionDiagnostics.map((c) => c.device)));
    for (const [device, id] of Object.entries(CDX_DEVICE_IDS)) {
      expect(g.get(id)?.kind, `${device} -> ${id}`).toBe("drug");
      expect(used.has(device), `${device} is not printed by any companion diagnostic row`).toBe(true);
    }
    // The FDA list names the tissue and plasma FoundationOne tests separately; one record covers both.
    const f1 = readouts.flatMap((bm) => bm.companionDiagnostics).filter((c) => /^FoundationOne (Liquid )?CDx$/.test(c.device));
    expect(f1.length).toBeGreaterThan(10);
    for (const c of f1) expect(c.deviceId).toBe("foundationone-cdx");
  });

  it("the PD-L1 scores all sit under CD274 and are each other's siblings", () => {
    const pd = readoutsForTarget("pdl1").map((b) => b.id).sort();
    expect(pd).toEqual(["pd-l1-cps", "pd-l1-ic-score", "pd-l1-tc-score", "pd-l1-tps"]);
    const cps = g.get("pd-l1-cps");
    expect(cps?.kind).toBe("biomarker");
    if (cps?.kind === "biomarker") expect(siblingReadouts(cps).map((b) => b.id).sort()).toEqual(["pd-l1-ic-score", "pd-l1-tc-score", "pd-l1-tps"]);
  });

  it("HER2 readouts sit under ERBB2 and the search aliases carry the plain forms", () => {
    expect(readoutsForTarget("her2").length).toBeGreaterThanOrEqual(8);
    const cps = g.get("pd-l1-cps");
    expect(cps?.aka).toContain("PD-L1 CPS");
    expect(cps?.aka).toContain("combined positive score");
  });

  it("the parent backlink reaches the target page and drug pages see their required readouts", () => {
    expect((g.incoming("pdl1").get("biomarker") ?? []).length).toBe(4);
    const pembro = readoutsForDrug("pembrolizumab");
    expect(pembro.filter((r) => r.required).map((r) => r.biomarker.id)).toContain("pd-l1-cps");
    expect(pembro.filter((r) => r.required).map((r) => r.biomarker.id)).toContain("tmb-high");
  });

  it("trial matching finds trials by alias without matching short ambiguous tokens", () => {
    const g12c = g.get("kras-g12c");
    if (g12c?.kind === "biomarker") expect(trialsNaming(g12c).length).toBeGreaterThan(0);
    const cps = g.get("pd-l1-cps");
    if (cps?.kind === "biomarker") for (const t of trialsNaming(cps)) expect(/PD-L1|CPS|combined positive/i.test(`${t.name} ${t.setting} ${t.tldr} ${t.summary}`)).toBe(true);
  });

  it("does not reduce a HER2 mutation readout to the generic HER2 gene name", () => {
    const bm = g.must("her2-mutation");
    expect(bm.kind).toBe("biomarker");
    if (bm.kind !== "biomarker") return;
    const matches = trialsNaming(bm, Infinity).map((t) => t.id);
    // BWEL names HER2-negative breast cancer, not a HER2 activating mutation.
    expect(matches).not.toContain("bwel");
    expect(matches).toEqual(expect.arrayContaining(["destiny-lung01", "destiny-lung02", "beamion-lung-1", "soho-01"]));
  });

  it("does not reduce a tumour BRCA readout to the word tumour", () => {
    const bm = g.must("brca-somatic");
    expect(bm.kind).toBe("biomarker");
    if (bm.kind !== "biomarker") return;
    const matches = trialsNaming(bm, Infinity).map((t) => t.id);
    // STAR-TREC discusses shrinking a rectal tumour without naming a BRCA or HRR readout.
    expect(matches).not.toContain("star-trec");
    expect(matches).not.toContain("add-aspirin");
    expect(matches).toEqual(expect.arrayContaining(["polo", "olympia", "solo-1"]));
  });

  it.each([
    { id: "folr1-expression", trialIds: ["mirasol", "soraya"] },
    { id: "her2-low-ihc", trialIds: ["destiny-breast04"] },
  ])("keeps the short name before a terminal annotation for $id", ({ id, trialIds }) => {
    const bm = g.must(id);
    expect(bm.kind).toBe("biomarker");
    if (bm.kind !== "biomarker") return;
    expect(trialsNaming(bm, Infinity).map((t) => t.id)).toEqual(expect.arrayContaining(trialIds));
  });

  it("every measurement has pill metadata and the skip list explains itself", () => {
    for (const m of MEASUREMENTS) { expect(MEASUREMENT_META[m].glyph.length).toBeGreaterThan(0); expect(MEASUREMENT_META[m].tip.length).toBeGreaterThan(20); }
    for (const s of BIOMARKER_SKIPS) expect(s.reason.length).toBeGreaterThan(30);
  });

  it("house style: no em-dashes and UK spelling in prose fields (quotes may keep US spelling)", () => {
    for (const bm of readouts) {
      for (const s of [bm.tldr, bm.summary, bm.forPatient, bm.scoringRule.text]) expect(s, bm.id).not.toMatch(/[—–]/);
      for (const s of [bm.tldr, bm.forPatient]) expect(s, bm.id).not.toMatch(/\btumor\b|\bcolor\b|\bcenter\b/);
    }
  });
});
