import { graph } from "@/lib/graph";
import { phaseLabel, routeFor } from "@/lib/kinds";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import { peopleWithAuthoredTrials, trialsAuthoredBy, type Authored } from "@/lib/person-trials";

/**
 * A person page's "Trial reports authored" (src/components/PersonTrialReports.tsx). The longest is about twenty
 * trials, so a page carries the first PERSON_TRIAL_REPORTS_PAGE and fetches the rest from
 * /api/v1/tables/person-trial-reports-<id>.json.
 */
export const personTrialReportsTableId = (id: string) => `person-trial-reports-${id}`;
export const PERSON_TRIAL_REPORTS_PAGE = 15;

export const PERSON_TRIAL_REPORT_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "cancers", label: "Cancer", filterable: true, className: "max-w-xs" },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "reports", label: "Report", className: "max-w-sm", tip: "The paper record that reports the trial and lists this person as an author." },
  { key: "confirmedBy", label: "Confirmed by", filterable: true, hide: "hidden md:table-cell", className: "text-muted whitespace-nowrap", tip: "ORCID: the author's ORCID on the paper is this person's. Affiliation: the author's first name matches in full and their affiliation on the paper names an institution on this record." },
];

export function personTrialReportRows(list: Authored[]): StaticRow[] {
  const g = graph();
  return list.map((a): StaticRow => ({
    id: a.trial.id,
    trial: { text: a.trial.name, href: routeFor(a.trial), strong: true, sub: (a.trial.participation ?? []).map((p) => p.nct).join(", ") || undefined },
    cancers: a.trial.cancers.flatMap((id) => { const c = g.get(id); return c ? [{ text: c.name, href: routeFor(c) }] : []; }) as CellObj[],
    phase: phaseLabel(a.trial.phase),
    reports: a.reports.map((r) => ({ text: r.paper.name, href: routeFor(r.paper) })) as CellObj[],
    confirmedBy: a.reports.some((r) => r.evidence === "orcid") ? "ORCID" : "Affiliation",
  }));
}

/** Every person's rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function personTrialReportTables(): Array<{ id: string; rows: StaticRow[]; page: number }> {
  return peopleWithAuthoredTrials().map((id) => ({ id: personTrialReportsTableId(id), rows: personTrialReportRows(trialsAuthoredBy(id)), page: PERSON_TRIAL_REPORTS_PAGE }));
}
