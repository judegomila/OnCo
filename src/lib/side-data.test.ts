import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { hotspots } from "@/data/hotspots";
import { openQuestions } from "@/data/open-questions";
import { models, datasets } from "@/data/model-registry";
import { preclinicalModels, allCellLineNames } from "@/data/preclinical-models";
import { CELL_LINE_IDS } from "@/data/cell-line-ids";
import { assays } from "@/data/assays";
import { targetXrefs } from "@/data/target-xrefs";
import { biomarkers } from "@/data/biomarkers";
import { resistanceGaps } from "./resistance-gaps";

/**
 * Scientist-tools side data (batch C) is keyed by entity ids and must stay joined to the graph:
 * every id it names must resolve, every subject must be of the kind the file claims, and every URL must parse.
 */
describe("scientist-tools side data", () => {
  const g = graph();
  const must = (id: string, where: string) => expect(g.get(id), `${where}: unknown id "${id}"`).toBeDefined();
  const mustKind = (id: string, kinds: string[], where: string) => { must(id, where); expect(kinds, `${where}: "${id}" is a ${g.get(id)?.kind}`).toContain(g.get(id)!.kind); };
  const url = (u: string, where: string) => expect(() => new URL(u), `${where}: bad url ${u}`).not.toThrow();

  it("hotspots reference real targets, drugs and refs, and positions fit the protein", () => {
    const seen = new Set<string>();
    for (const h of hotspots) {
      mustKind(h.targetId, ["target"], `hotspots ${h.targetId}`);
      expect(seen.has(h.targetId), `duplicate hotspot map ${h.targetId}`).toBe(false); seen.add(h.targetId);
      expect(h.length).toBeGreaterThan(50);
      for (const d of h.domains) { expect(d.start).toBeGreaterThanOrEqual(1); expect(d.end).toBeLessThanOrEqual(h.length); expect(d.end).toBeGreaterThan(d.start); }
      expect(h.hotspots.length).toBeGreaterThan(0);
      for (const s of h.hotspots) {
        expect(s.position, `${h.targetId} ${s.label}`).toBeGreaterThanOrEqual(1);
        expect(s.position, `${h.targetId} ${s.label}`).toBeLessThanOrEqual(h.length);
        if (s.end) expect(s.end).toBeLessThanOrEqual(h.length);
        for (const d of s.drugs) mustKind(d, ["drug"], `hotspots ${h.targetId} ${s.label} drugs`);
        for (const d of s.defeats ?? []) mustKind(d, ["drug"], `hotspots ${h.targetId} ${s.label} defeats`);
        for (const r of s.refs ?? []) must(r, `hotspots ${h.targetId} ${s.label} refs`);
        if (s.source) url(s.source.url, `hotspots ${h.targetId} ${s.label}`);
      }
      for (const s of h.sources) url(s.url, `hotspots ${h.targetId}`);
    }
  });

  it("open questions have unique ids, valid subjects and resolvable refs", () => {
    const ids = new Set<string>();
    for (const q of openQuestions) {
      expect(ids.has(q.id), `duplicate question id ${q.id}`).toBe(false); ids.add(q.id);
      mustKind(q.subject, ["target", "technology"], `open-questions ${q.id}`);
      for (const r of q.refs) must(r, `open-questions ${q.id} refs`);
      url(q.source.url, `open-questions ${q.id}`);
      expect(q.question.length).toBeGreaterThan(20);
      expect(q.why.length).toBeGreaterThan(40);
      expect(q.wouldAnswer.length).toBeGreaterThan(20);
    }
    expect(openQuestions.length).toBeGreaterThanOrEqual(40);
  });

  it("model registry keys are foundation-model technologies and dataset collections", () => {
    for (const m of models) {
      mustKind(m.id, ["technology"], `model-registry ${m.id}`);
      for (const d of m.datasets ?? []) mustKind(d, ["collection"], `model-registry ${m.id} datasets`);
      if (m.weightsUrl) url(m.weightsUrl, `model-registry ${m.id}`);
      expect(m.trainingData.length).toBeGreaterThan(10);
    }
    for (const d of datasets) {
      mustKind(d.id, ["collection"], `model-registry dataset ${d.id}`);
      for (const m of d.usedBy ?? []) expect(models.some((x) => x.id === m), `dataset ${d.id} usedBy unknown model ${m}`).toBe(true);
    }
    // Every foundation-model technology in the corpus has a registry row.
    const fm = g.kind("technology").filter((t) => t.tags.includes("foundation-model") || t.tags.includes("risk-model"));
    for (const t of fm) expect(models.some((m) => m.id === t.id), `no registry row for ${t.id}`).toBe(true);
  });

  it("preclinical models name real cancers and targets, and resolved cell-line ids are well formed", () => {
    const seen = new Set<string>();
    for (const m of preclinicalModels) {
      mustKind(m.subject, ["cancer", "target"], `preclinical-models ${m.subject}`);
      expect(seen.has(m.subject), `duplicate model entry ${m.subject}`).toBe(false); seen.add(m.subject);
      for (const c of m.cellLines) for (const t of c.targets ?? []) mustKind(t, ["target"], `preclinical-models ${m.subject} ${c.name}`);
      for (const r of [...m.pdx, ...m.organoids]) url(r.url, `preclinical-models ${m.subject}`);
      for (const gm of m.gemms) url(gm.source.url, `preclinical-models ${m.subject} ${gm.name}`);
    }
    const names = allCellLineNames();
    const resolved = names.filter((n) => CELL_LINE_IDS[n]);
    expect(resolved.length / names.length, "most cell lines should resolve to Cellosaurus").toBeGreaterThan(0.85);
    for (const [name, ids] of Object.entries(CELL_LINE_IDS)) {
      expect(ids.cellosaurus, name).toMatch(/^CVCL_[A-Z0-9]{4}$/);
      if (ids.depmap) expect(ids.depmap, name).toMatch(/^ACH-\d{6}$/);
    }
  });

  it("assays link real targets, drugs, cancers and biomarkers", () => {
    const bm = new Set(biomarkers.map((b) => b.id));
    const ids = new Set<string>();
    for (const a of assays) {
      expect(ids.has(a.id), `duplicate assay ${a.id}`).toBe(false); ids.add(a.id);
      for (const t of a.targets) mustKind(t, ["target"], `assays ${a.id} targets`);
      for (const d of a.drugs) mustKind(d, ["drug"], `assays ${a.id} drugs`);
      for (const c of a.cancers) mustKind(c, ["cancer"], `assays ${a.id} cancers`);
      for (const b of a.biomarkers) expect(bm.has(b), `assays ${a.id}: unknown biomarker ${b}`).toBe(true);
      url(a.source.url, `assays ${a.id}`);
      expect(a.cutoff.length).toBeGreaterThan(10);
    }
    expect(assays.length).toBeGreaterThanOrEqual(30);
  });

  it("every target has cross-references with an HGNC id", () => {
    for (const t of g.kind("target")) {
      const x = targetXrefs[t.id];
      expect(x, `no xrefs for ${t.id}`).toBeDefined();
      expect(x!.genes.length).toBeGreaterThan(0);
      for (const gene of x!.genes) expect(gene.hgnc).toMatch(/^HGNC:\d+$/);
    }
  });

  it("resistance gaps classify every mechanism", () => {
    const gaps = resistanceGaps();
    expect(gaps.length).toBeGreaterThan(30);
    expect(gaps.some((x) => x.tier !== "clinical")).toBe(true);
    for (const x of gaps) expect(["none", "preclinical", "clinical"]).toContain(x.tier);
  });
});
