import { resistance, type Mechanism, type ResistanceClass } from "@/data/resistance";
import { graph } from "./graph";
import type { Entity } from "./schema";

/**
 * Unaddressed resistance routes: mechanisms in the atlas with no countermeasure, or whose countermeasures rest only
 * on preclinical or conceptual evidence. These are the drug-design opportunities.
 *
 * A countermeasure counts as clinical when any product it cites is approved, standard of care or in phase 2 or 3,
 * or when it cites a trial. It counts as preclinical when it cites only preclinical or phase 1 products, ideas,
 * technologies or terms, or when its text says so ("preclinical", "in trials" without a named product).
 */
export type GapTier = "none" | "preclinical" | "clinical";

export type ResistanceGap = {
  classId: string;
  drugClass: string;
  mechanism: Mechanism;
  tier: GapTier;
  /** Approved or late-phase products among the countermeasures, when any. */
  clinicalProducts: Entity[];
  /** Ideas in the corpus that attack the mechanism: cited directly or linked to the targets the mechanism names. */
  ideas: Entity[];
};

const CLINICAL_STATUS = new Set(["approved", "standard-of-care", "phase-3", "phase-2", "positive", "established"]);

function tierOf(m: Mechanism): { tier: GapTier; clinicalProducts: Entity[] } {
  const g = graph();
  if (!m.countermeasures.length) return { tier: "none", clinicalProducts: [] };
  const clinicalProducts: Entity[] = [];
  let anyTrial = false;
  for (const c of m.countermeasures) {
    for (const id of c.refs) {
      const e = g.get(id);
      if (!e) continue;
      if (e.kind === "drug" && CLINICAL_STATUS.has(e.status ?? "")) clinicalProducts.push(e);
      if (e.kind === "trial") anyTrial = true;
    }
  }
  if (clinicalProducts.length || anyTrial) return { tier: "clinical", clinicalProducts };
  return { tier: "preclinical", clinicalProducts };
}

function ideasFor(m: Mechanism): Entity[] {
  const g = graph();
  const out = new Map<string, Entity>();
  const targets = new Set(m.refs.filter((id) => g.get(id)?.kind === "target"));
  for (const c of m.countermeasures) for (const id of c.refs) { const e = g.get(id); if (e?.kind === "idea") out.set(e.id, e); }
  for (const id of m.refs) { const e = g.get(id); if (e?.kind === "idea") out.set(e.id, e); }
  for (const t of targets) for (const e of g.incoming(t).get("idea") ?? []) out.set(e.id, e);
  return [...out.values()].sort((a, b) => a.name.localeCompare(b.name));
}

let cached: ResistanceGap[] | undefined;

/** Every mechanism in the atlas, classified; filter by `tier` for the gaps. */
export function resistanceGaps(): ResistanceGap[] {
  if (cached) return cached;
  cached = resistance.flatMap((r: ResistanceClass) => r.mechanisms.map((m) => {
    const { tier, clinicalProducts } = tierOf(m);
    return { classId: r.id, drugClass: r.drugClass, mechanism: m, tier, clinicalProducts, ideas: ideasFor(m) };
  }));
  return cached;
}

/** Number of unaddressed (no clinical countermeasure) routes per class, for the class cards on the atlas. */
export function gapCountByClass(): Record<string, { none: number; preclinical: number; total: number }> {
  const out: Record<string, { none: number; preclinical: number; total: number }> = {};
  for (const gap of resistanceGaps()) {
    const c = (out[gap.classId] ??= { none: 0, preclinical: 0, total: 0 });
    c.total++;
    if (gap.tier === "none") c.none++;
    if (gap.tier === "preclinical") c.preclinical++;
  }
  return out;
}
