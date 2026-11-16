import { graph } from "./graph";
import type { Trial } from "./schema";
import { TRIAL_SITES } from "@/data/trial-sites";

/**
 * "Trials recruiting here", derived from the site lists of the ClinicalTrials.gov capture the trial records cite
 * (src/data/trial-sites.ts, written by scripts/build-trial-sites.ts). A trial is recruiting in a country, a city or
 * an institution when one of its sites there has the status RECRUITING in that capture; the study's overall status
 * is never used for it. A site list is read only when its hash matches the reading the trial record carries.
 */

export type Here = {
  trial: Trial;
  /** Registry ids whose capture has a recruiting site here. */
  ncts: string[];
  /** Recruiting sites here, summed over the trial's registry ids. */
  sites: number;
  /** Cities with a recruiting site, most sites first (country view). */
  cities: string[];
  /** The site names the registry gives an institution (institution view). */
  listedAs: string[];
};

type Reading = { nct: string; sites: (typeof TRIAL_SITES)[string] };

/** The site lists of a trial whose hash matches the participation reading the record carries. */
export function sitesOf(t: Trial): Reading[] {
  return (t.participation ?? []).flatMap((p) => {
    const s = TRIAL_SITES[p.nct];
    return s && p.studySha256.startsWith(s.sha) ? [{ nct: p.nct, sites: s }] : [];
  });
}

let byCountry: Map<string, Here[]> | null = null;
let byInstitution: Map<string, Here[]> | null = null;

function build() {
  byCountry = new Map();
  byInstitution = new Map();
  for (const t of graph().kind("trial")) {
    const countries = new Map<string, { ncts: Set<string>; sites: number; cities: Map<string, number> }>();
    const insts = new Map<string, { ncts: Set<string>; names: Set<string> }>();
    for (const { nct, sites } of sitesOf(t)) {
      for (const [iso2, cities] of Object.entries(sites.countries)) {
        const c = countries.get(iso2) ?? { ncts: new Set(), sites: 0, cities: new Map() };
        c.ncts.add(nct);
        for (const [city, n] of cities) { c.sites += n; if (city) c.cities.set(city, (c.cities.get(city) ?? 0) + n); }
        countries.set(iso2, c);
      }
      for (const [id, names] of Object.entries(sites.institutions ?? {})) {
        const i = insts.get(id) ?? { ncts: new Set(), names: new Set() };
        i.ncts.add(nct);
        for (const n of names) i.names.add(n);
        insts.set(id, i);
      }
    }
    for (const [iso2, c] of countries) {
      const list = byCountry.get(iso2) ?? [];
      list.push({ trial: t, ncts: [...c.ncts], sites: c.sites, cities: [...c.cities].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "en")).map(([city]) => city), listedAs: [] });
      byCountry.set(iso2, list);
    }
    for (const [id, i] of insts) {
      const list = byInstitution.get(id) ?? [];
      list.push({ trial: t, ncts: [...i.ncts], sites: i.names.size, cities: [], listedAs: [...i.names].sort() });
      byInstitution.set(id, list);
    }
  }
  const order = (a: Here, b: Here) => b.sites - a.sites || a.trial.name.localeCompare(b.trial.name, "en");
  for (const l of byCountry.values()) l.sort(order);
  const byName = (a: Here, b: Here) => a.trial.name.localeCompare(b.trial.name, "en");
  for (const l of byInstitution.values()) l.sort(byName);
}

/** Trial records with a recruiting site in the country (alpha-2), most recruiting sites there first. */
export function recruitingIn(iso2: string): Here[] {
  if (!byCountry) build();
  return byCountry!.get(iso2.toUpperCase()) ?? [];
}

/** Trial records with a recruiting site at the institution, by name. */
export function recruitingAt(institutionId: string): Here[] {
  if (!byInstitution) build();
  return byInstitution!.get(institutionId) ?? [];
}

/** Country codes with at least one trial recruiting there. */
export function countriesRecruiting(): string[] {
  if (!byCountry) build();
  return [...byCountry!.keys()].sort();
}

/** Institution ids with at least one trial recruiting there. */
export function institutionsRecruiting(): string[] {
  if (!byInstitution) build();
  return [...byInstitution!.keys()].sort();
}

/** The date range of the captures behind a list, for the note under the table. */
export function capturedRange(list: Here[]): [string, string] | null {
  const dates = list.flatMap((h) => (h.trial.participation ?? []).filter((p) => h.ncts.includes(p.nct)).map((p) => p.fetchedAt.slice(0, 10))).sort();
  return dates.length ? [dates[0], dates.at(-1)!] : null;
}
