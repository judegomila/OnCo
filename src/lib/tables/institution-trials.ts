import { graph } from "@/lib/graph";
import { phaseLabel, routeFor } from "@/lib/kinds";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import { institutionsRecruiting, recruitingAt, type Here } from "@/lib/trials-here";

/**
 * An institution page's "Trials recruiting here" (src/components/TrialsHere.tsx). Fudan's cancer centre has close
 * to two hundred, so a page carries the first INSTITUTION_TRIALS_PAGE and fetches the rest from
 * /api/v1/tables/institution-trials-<id>.json.
 */
export const institutionTrialsTableId = (id: string) => `institution-trials-${id}`;
export const INSTITUTION_TRIALS_PAGE = 15;

export const INSTITUTION_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "cancers", label: "Cancer", filterable: true, className: "max-w-xs" },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "listedAs", label: "Listed as", hide: "hidden md:table-cell", className: "text-muted max-w-xs", tip: "The site's name as ClinicalTrials.gov gives it." },
];

export function institutionTrialRows(list: Here[]): StaticRow[] {
  const g = graph();
  return list.map((h): StaticRow => ({
    id: h.trial.id,
    trial: { text: h.trial.name, href: routeFor(h.trial), strong: true, sub: h.ncts.join(", ") },
    cancers: h.trial.cancers.flatMap((id) => { const c = g.get(id); return c ? [{ text: c.name, href: routeFor(c) }] : []; }) as CellObj[],
    phase: phaseLabel(h.trial.phase),
    listedAs: h.listedAs.join("; "),
  }));
}

/** Every institution's rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function institutionTrialTables(): Array<{ id: string; rows: StaticRow[]; page: number }> {
  return institutionsRecruiting().map((id) => ({ id: institutionTrialsTableId(id), rows: institutionTrialRows(recruitingAt(id)), page: INSTITUTION_TRIALS_PAGE }));
}
