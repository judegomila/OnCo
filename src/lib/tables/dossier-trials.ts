import { graph } from "@/lib/graph";
import type { Target, Trial } from "@/lib/schema";
import { routeFor } from "@/lib/kinds";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";

/**
 * The trials table of a target dossier (/dossiers/<id>/). PD-1 gathers 648 trials and its page weighed 2.1 MB with
 * every row shipped twice; dossiers with more than one page of trials carry the first page and fetch the rest.
 */
export const dossierTrialsTableId = (targetId: string) => `dossier-trials-${targetId}`;

export const DOSSIER_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "status", label: "Status", filterable: true },
  { key: "setting", label: "Setting", hide: "hidden md:table-cell", className: "text-muted max-w-xs" },
  { key: "result", label: "Result", hide: "hidden lg:table-cell", className: "text-muted max-w-sm text-xs" },
  { key: "products", label: "Products", hide: "hidden sm:table-cell", className: "min-w-[160px]" },
];

/** Rows in the dossier's order (phase, then newest, then name), as `dossierData` sorts them. */
export function dossierTrialRows(trials: Trial[]): StaticRow[] {
  const g = graph();
  return trials.map((x): StaticRow => ({
    id: x.id,
    trial: { text: x.name, href: routeFor(x), strong: true, sub: x.nct },
    phase: x.phase,
    status: x.status ? { text: STATUS_LABEL[x.status] ?? x.status, chip: statusClass(x.status) } : undefined,
    setting: x.setting,
    result: x.result,
    products: x.drugs.slice(0, 4).map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e).map((e) => ({ text: e.name, href: routeFor(e), chip: "border border-border bg-card text-xs" })),
  }));
}

/** Every target's trial rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function dossierTrialTables(dossier: (t: Target) => { trials: Trial[] }): Array<{ id: string; rows: StaticRow[] }> {
  return graph().kind("target").map((t) => ({ id: dossierTrialsTableId(t.id), rows: dossierTrialRows(dossier(t as Target).trials) }));
}
