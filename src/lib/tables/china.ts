import { graph } from "@/lib/graph";
import type { Company, Trial } from "@/lib/schema";
import { phaseLabel, routeFor } from "@/lib/kinds";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";

/** The /countries/cn/ key-trials table (851 rows when written): the page carries the first page, the file the rest. */
export const CHINA_TRIALS_TABLE = "china-trials";

/** Chinese-origin companies headquartered elsewhere (BeOne in Basel, Legend in Somerset NJ) belong on the China page too. */
export const CHINESE_ORIGIN_COMPANIES = new Set(["beone", "legend-biotech", "systimmune"]);
/** Sponsor names that identify a Chinese registration trial when the record is not tagged. */
export const CHINESE_SPONSOR = /akeso|beigene|beone|hengrui|innovent|junshi|henlius|legend|carsgen|kelun|remegen|hutchmed|hansoh|cstone|allist|sino biopharm|chia tai|zelgen|iaso|jw therapeutics|sun yat-sen|fudan|chinese academy/i;

export const CHINA_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial", className: "whitespace-nowrap" },
  { key: "phase", label: "Phase", filterable: true, className: "text-muted whitespace-nowrap" },
  { key: "status", label: "Status", filterable: true },
  { key: "setting", label: "Setting", hide: "hidden md:table-cell", className: "text-muted max-w-md" },
  { key: "result", label: "Result", className: "max-w-lg" },
  { key: "year", label: "Year", filterable: true, sortable: true, numeric: true, className: "text-muted" },
];

export function chinaCompanies(): Company[] {
  return graph().kind("company").filter((e) => e.country === "CN" || CHINESE_ORIGIN_COMPANIES.has(e.id));
}

/** Registration trials of Chinese drugs, newest first (the table's default order). */
export function chinaTrials(companyIds = new Set(chinaCompanies().map((e) => e.id))): Trial[] {
  return graph().kind("trial").filter((e) => e.tags.includes("china") || (e.sponsor && CHINESE_SPONSOR.test(e.sponsor)) || e.companies.some((c) => companyIds.has(c)))
    .sort((a, b) => (b.yearReported ?? 0) - (a.yearReported ?? 0));
}

export function chinaTrialRows(trials = chinaTrials()): StaticRow[] {
  return trials.map((t) => ({
    id: t.id,
    trial: { text: t.name, href: routeFor(t), strong: true },
    phase: phaseLabel(t.phase),
    status: t.status ? { text: STATUS_LABEL[t.status] ?? t.status, chip: statusClass(t.status) } : undefined,
    setting: t.setting,
    result: t.result ?? t.tldr,
    year: t.yearReported ? String(t.yearReported) : undefined,
  }));
}
