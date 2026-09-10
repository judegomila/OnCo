import type { Drug } from "./schema";
import { graph } from "./graph";
import { modalityClass, TRIALS_FETCHED } from "./company-score";
import { worldAddressable } from "./market";
import trialsIndex from "../../public/trials/index.json";

/**
 * Pipeline funnel and crowding index.
 *
 * Funnel: products in the corpus grouped by development stage (approved, phase 3, phase 2, phase 1,
 * preclinical, stopped), for a chosen target, modality class or cancer, plus the phase 2 and phase 3 studies
 * registered on ClinicalTrials.gov for those products (public/trials/index.json, refreshed weekly).
 *
 * Crowding index, per target:
 *
 *   crowding = active assets / (world addressable patients per year / 100,000)
 *
 * where active assets are the corpus products aimed at the target that are not negative, withdrawn or
 * historic, and world addressable patients is the midpoint of the /market/ estimate summed over the cancers
 * where the target's prevalence is recorded (GLOBOCAN incidence x subtype share x prevalence x first
 * setting share). A higher number means more programmes per patient. It counts only what is in the corpus,
 * so it understates crowding for targets we cover thinly, and it says nothing about quality.
 */
import { type Stage } from "./pipeline-stages";
export * from "./pipeline-stages";

type IndexEntry = { total: number; byPhase: Record<string, number>; byStatus: Record<string, number>; recruiting: number; fetched: string };
const TRIALS = trialsIndex as Record<string, IndexEntry>;

export function stageOf(d: Drug): Stage {
  switch (d.status) {
    case "approved": case "standard-of-care": return "approved";
    case "phase-3": return "phase-3";
    case "phase-2": return "phase-2";
    case "phase-1": return "phase-1";
    case "preclinical": case "concept": return "preclinical";
    case "negative": case "withdrawn": case "historic": return "stopped";
    default: return "other";
  }
}

export type FunnelProduct = { id: string; name: string; status?: string; stage: Stage; route: string; modality: string; registry: number };
export type Funnel = {
  key: string; label: string; route?: string; group: "target" | "modality" | "cancer";
  stages: Record<Stage, number>;
  registry: { phase2: number; phase3: number; recruiting: number; total: number };
  products: FunnelProduct[];
};

function funnelFor(key: string, label: string, group: Funnel["group"], products: Drug[], route?: string): Funnel {
  const stages: Record<Stage, number> = { approved: 0, "phase-3": 0, "phase-2": 0, "phase-1": 0, preclinical: 0, stopped: 0, other: 0 };
  const registry = { phase2: 0, phase3: 0, recruiting: 0, total: 0 };
  const list: FunnelProduct[] = [];
  for (const d of products) {
    const stage = stageOf(d);
    stages[stage]++;
    const t = TRIALS[d.id];
    if (t) { registry.phase2 += t.byPhase.PHASE2 ?? 0; registry.phase3 += t.byPhase.PHASE3 ?? 0; registry.recruiting += t.recruiting; registry.total += t.total; }
    list.push({ id: d.id, name: d.name, status: d.status, stage, route: `/drugs/${d.id}/`, modality: modalityClass(d.modality), registry: t?.total ?? 0 });
  }
  const order: Record<Stage, number> = { approved: 0, "phase-3": 1, "phase-2": 2, "phase-1": 3, preclinical: 4, other: 5, stopped: 6 };
  list.sort((a, b) => order[a.stage] - order[b.stage] || b.registry - a.registry || a.name.localeCompare(b.name));
  return { key, label, route, group, stages, registry, products: list };
}

export function allFunnels(): Funnel[] {
  const g = graph();
  const drugs = g.kind("drug");
  const out: Funnel[] = [];
  for (const t of g.kind("target")) {
    const ps = drugs.filter((d) => d.targets.includes(t.id));
    if (ps.length) out.push(funnelFor(`target:${t.id}`, t.name, "target", ps, `/targets/${t.id}/`));
  }
  const byMod = new Map<string, Drug[]>();
  for (const d of drugs) { const m = modalityClass(d.modality); byMod.set(m, [...(byMod.get(m) ?? []), d]); }
  for (const [m, ps] of [...byMod.entries()].sort((a, b) => b[1].length - a[1].length)) out.push(funnelFor(`modality:${m}`, m, "modality", ps));
  for (const c of g.kind("cancer")) {
    const ps = (g.forCancer(c.id).get("drug") ?? []) as Drug[];
    if (ps.length) out.push(funnelFor(`cancer:${c.id}`, c.name, "cancer", ps, `/cancers/${c.id}/`));
  }
  return out;
}

export type CrowdingRow = {
  targetId: string; name: string; route: string;
  active: number; approved: number; phase3: number;
  registryTrials: number;
  /** `dropped` lists cancers with a prevalence figure but no GLOBOCAN estimate (sarcoma, GIST, neuroendocrine), so the population is partial. */
  addressable: { mid: number; low: number; high: number; cancers: string[]; dropped: string[] } | null;
  /** Active assets per 100,000 addressable patients per year; null when the population cannot be estimated. */
  index: number | null;
};

export function crowdingIndex(): CrowdingRow[] {
  const g = graph();
  const drugs = g.kind("drug");
  const rows: CrowdingRow[] = g.kind("target").map((t) => {
    const ps = drugs.filter((d) => d.targets.includes(t.id));
    const active = ps.filter((d) => stageOf(d) !== "stopped");
    const addressable = worldAddressable(t.id);
    const index = addressable && addressable.mid > 0 ? Math.round((active.length / (addressable.mid / 100_000)) * 100) / 100 : null;
    return {
      targetId: t.id, name: t.name, route: `/targets/${t.id}/`,
      active: active.length, approved: ps.filter((d) => stageOf(d) === "approved").length, phase3: ps.filter((d) => stageOf(d) === "phase-3").length,
      registryTrials: ps.reduce((n, d) => n + (TRIALS[d.id]?.total ?? 0), 0),
      addressable, index,
    };
  }).filter((r) => r.active > 0);
  rows.sort((a, b) => (b.index ?? -1) - (a.index ?? -1) || b.active - a.active);
  return rows;
}

export { TRIALS_FETCHED };
