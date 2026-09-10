import { graph } from "./graph";
import { routeFor } from "./schema";
import { regimens, type Emetogenicity, type Gcsf, type Regimen, type RegimenComponent } from "@/data/regimens";

/**
 * Regimen helpers shared by /regimens/ and /regimens/<id>/.
 * Pure functions over the side data plus the graph; nothing here touches the schema.
 */

export const EMETOGENICITY_LABEL: Record<Emetogenicity, string> = { minimal: "Minimal (<10%)", low: "Low (10-30%)", moderate: "Moderate (30-90%)", high: "High (>90%)" };
export const EMETOGENICITY_TIP = "Risk of vomiting without prophylaxis, by the most emetogenic component (NCCN Antiemesis / MASCC-ESMO classes). It sets the antiemetic regimen: high risk needs an NK1 antagonist, a 5-HT3 antagonist and dexamethasone, often with olanzapine.";
export const GCSF_LABEL: Record<Gcsf, string> = { recommended: "Recommended", consider: "Consider (10-20% FN risk)", "not routine": "Not routine", "built in": "Built into the protocol" };
export const GCSF_TIP = "Whether granulocyte colony-stimulating factor is given from cycle 1. ASCO/NCCN: recommended when febrile-neutropenia risk exceeds 20% or the protocol mandates it; consider at 10-20% with age over 65, prior chemotherapy or poor performance status.";

export function regimenById(id: string): Regimen | undefined {
  return regimens.find((r) => r.id === id);
}

/** The intent shown as a facet label. */
export const intentLabel = (r: Regimen) => r.intent[0].toUpperCase() + r.intent.slice(1);

/** "q14d × 12" style summary of the cycle. */
export function cycleSummary(r: Regimen): string {
  const n = numericCycles(r.cycles);
  const q = r.cycleDays === 1 ? "single day" : r.cycleDays === 7 ? "weekly" : `every ${r.cycleDays} days`;
  return n ? `${q} × ${n}` : q;
}

/** Leading integer in the cycles string ("12 (6 months)" → 12), or null when open-ended. */
export function numericCycles(cycles: string): number | null {
  const m = cycles.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** Total planned duration in weeks when the cycle count is numeric. */
export function totalWeeks(r: Regimen): number | null {
  const n = numericCycles(r.cycles);
  return n ? Math.round((n * r.cycleDays) / 7) : null;
}

/** One-line description of the components: "oxaliplatin 85 mg/m² D1; fluorouracil 2,400 mg/m² D1-2 (46 h)". */
export function componentsLine(r: Regimen): string {
  return r.components.map((k) => `${k.name} ${k.dose} ${dayLabel(k)}`).join("; ");
}

/** "D1", "D1, 8, 15", "D1-14" or "D1-2 (46 h)". */
export function dayLabel(k: RegimenComponent): string {
  const d = k.days;
  if (!d.length) return "";
  const contiguous = d.every((x, i) => i === 0 || x === d[i - 1] + 1);
  const core = contiguous && d.length > 2 ? `D${d[0]}-${d[d.length - 1]}` : `D${d.join(", ")}`;
  return k.infusionHours ? `${core} (${k.infusionHours} h infusion)` : core;
}

/** Every id a regimen references, with the field it came from, so a dangling id gives a useful message. */
function referencedIds(r: Regimen): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const id of r.cancers) out.push([id, "cancers"]);
  for (const id of r.trials ?? []) out.push([id, "trials"]);
  for (const id of r.drugs ?? []) out.push([id, "drugs"]);
  for (const k of r.components) if (k.drugId) out.push([k.drugId, `components.${k.name}`]);
  return out;
}

/**
 * Build-time validation: unique ids, every referenced id resolves to an entity of the right kind, days fall inside
 * the cycle, and every regimen has a source URL. Throws with a full list so authors fix everything at once.
 */
export function validateRegimens(list: Regimen[] = regimens): void {
  const g = graph();
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const r of list) {
    if (seen.has(r.id)) errors.push(`${r.id}: duplicate id`);
    seen.add(r.id);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id)) errors.push(`${r.id}: id is not kebab-case`);
    if (!/^https?:\/\//.test(r.source.url)) errors.push(`${r.id}: source url is not absolute`);
    for (const [id, field] of referencedIds(r)) {
      const e = g.get(id);
      if (!e) { errors.push(`${r.id}: unknown id "${id}" in ${field}`); continue; }
      const want = field === "cancers" ? "cancer" : field === "trials" ? "trial" : "drug";
      if (e.kind !== want) errors.push(`${r.id}: "${id}" in ${field} is a ${e.kind}, expected ${want}`);
    }
    for (const k of r.components) {
      if (!k.days.length) errors.push(`${r.id}: component "${k.name}" has no days`);
      for (const d of k.days) if (d < 1 || d > r.cycleDays) errors.push(`${r.id}: component "${k.name}" day ${d} is outside a ${r.cycleDays}-day cycle`);
    }
  }
  if (errors.length) throw new Error(`Invalid regimens:\n${errors.join("\n")}`);
}

/** A regimen with its linked entities resolved, for the detail page. */
export function resolveRegimen(r: Regimen) {
  const g = graph();
  return {
    cancers: r.cancers.map((id) => g.must(id)),
    trials: (r.trials ?? []).map((id) => g.must(id)),
    drugs: [...new Set([...(r.drugs ?? []), ...r.components.map((k) => k.drugId).filter((x): x is string => !!x)])].map((id) => g.must(id)),
    componentDrugs: r.components.map((k) => { const d = k.drugId ? g.must(k.drugId) : undefined; return d && d.kind === "drug" ? d : undefined; }),
  };
}

/** Regimens that include a product or treat a cancer, for cross-linking from other pages. */
export function regimensFor(id: string): Regimen[] {
  return regimens.filter((r) => r.cancers.includes(id) || (r.drugs ?? []).includes(id) || r.components.some((k) => k.drugId === id));
}

export function regimenRoute(r: Regimen): string {
  return `/regimens/${r.id}/`;
}

export { routeFor };
