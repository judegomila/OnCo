import type { Trial } from "@/lib/schema";
import { phaseLabel, routeFor } from "@/lib/kinds";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import { countryIndex, trialsIn } from "@/lib/country-pages";
import { recruitingIn, type Here } from "@/lib/trials-here";

/**
 * The trials table of every country page (/countries/<iso2>/, automatic and deep dive): every trial record whose
 * ClinicalTrials.gov capture lists a site in the country, those with a site there that is recruiting first
 * (src/lib/trials-here.ts reads each site's own status). Belgium has more than 900 rows and the United States
 * thousands, so a page carries the first COUNTRY_TRIALS_PAGE and fetches the rest from
 * /api/v1/tables/country-trials-<iso2>.json.
 */
export const countryTrialsTableId = (iso2: string) => `country-trials-${iso2.toLowerCase()}`;

/**
 * Rows a country page carries before fetching the file. Fifteen, not the usual thirty: the deep dives already
 * weigh close to their ceiling in src/data/page-weight.json, and fifteen rows fill the screen the section opens on.
 */
export const COUNTRY_TRIALS_PAGE = 15;

/** How many cities a row names; the rest are counted. */
const CITY_CAP = 3;

export const HERE_RECRUITING = "Recruiting here";
export const HERE_NOT = "No site here recruiting";

export const COUNTRY_TRIAL_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "here", label: "Here", filterable: true, className: "whitespace-nowrap", order: [HERE_RECRUITING, HERE_NOT], tip: "Whether a site in this country had the status Recruiting in the captured registry entry, and how many such sites." },
  { key: "cities", label: "Cities recruiting", filterable: true, hide: "hidden sm:table-cell", className: "text-muted max-w-xs", tip: "The cities with a recruiting site, most sites first; a row names three and counts the rest." },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "registry", label: "Registry status", filterable: true, hide: "hidden lg:table-cell", tip: "The study's overall status on ClinicalTrials.gov when it was captured; the Here column is what its sites in this country say." },
  { key: "sponsor", label: "Lead sponsor", hide: "hidden md:table-cell", className: "text-muted max-w-xs" },
];

const humanStatus = (s?: string) => (s ? s.charAt(0) + s.slice(1).toLowerCase().replace(/_/g, " ") : undefined);
const updatedOf = (t: Trial) => (t.participation ?? []).map((p) => p.lastUpdatePosted ?? "").sort().at(-1) ?? "";

/** The page's order: recruiting here (most recruiting sites first), then the rest, most recently updated first. */
export function countryTrials(iso2: string): Array<{ trial: Trial; here?: Here }> {
  const here = recruitingIn(iso2);
  const seen = new Set(here.map((h) => h.trial.id));
  const rest = trialsIn(iso2.toUpperCase()).filter((t) => !seen.has(t.id))
    .sort((a, b) => updatedOf(b).localeCompare(updatedOf(a)) || a.name.localeCompare(b.name, "en"));
  return [...here.map((h) => ({ trial: h.trial, here: h })), ...rest.map((trial) => ({ trial }))];
}

export function countryTrialRows(list: Array<{ trial: Trial; here?: Here }>): StaticRow[] {
  return list.map(({ trial: t, here }): StaticRow => {
    const p = t.participation ?? [];
    const cities: CellObj[] = (here?.cities ?? []).slice(0, CITY_CAP).map((text) => ({ text }));
    const nCities = here?.cities.length ?? 0;
    const sites = here ? `${here.sites.toLocaleString("en-GB")} ${here.sites === 1 ? "site" : "sites"}` : "";
    return {
      id: t.id,
      trial: { text: t.name, href: routeFor(t), strong: true, sub: p.map((x) => x.nct).join(", ") || t.nct },
      here: here
        ? { text: nCities > CITY_CAP ? `${sites}, ${nCities} cities` : sites, v: HERE_RECRUITING, chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200", title: `${HERE_RECRUITING}: ${sites} in ${nCities} ${nCities === 1 ? "city" : "cities"}` }
        : { text: "None", v: HERE_NOT, muted: true },
      cities,
      phase: phaseLabel(t.phase),
      registry: humanStatus(p.find((x) => x.overallStatus === "RECRUITING")?.overallStatus ?? p[0]?.overallStatus),
      sponsor: p[0]?.leadSponsor ?? t.sponsor,
    };
  });
}

/** Every country page's trial rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function countryTrialTables(): Array<{ id: string; rows: StaticRow[]; page: number }> {
  return countryIndex().map((c) => ({ id: countryTrialsTableId(c.iso2), rows: countryTrialRows(countryTrials(c.iso2)), page: COUNTRY_TRIALS_PAGE }));
}
