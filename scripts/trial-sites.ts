/**
 * Pure helpers for scripts/build-trial-sites.ts: which sites of a captured ClinicalTrials.gov study are recruiting,
 * in which country and city, and which of them is an institution OnCo holds a record for.
 *
 * Only a site whose own status is RECRUITING counts. The study's overall status says nothing about a given site,
 * and the fetcher's rule holds here too: site status is never inferred from overall status.
 */
import { CTGOV_COUNTRY } from "../src/data/country-codes";

/** Lower case, accents and punctuation gone, "&" read as "and", a leading or inner "the" dropped. */
export function normaliseSiteName(s: string): string {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").replace(/\bthe\b/g, " ").replace(/\s+/g, " ").trim();
}

export type InstitutionNames = { id: string; country: string; cities: string[]; names: string[] };

/**
 * The cities an institution's record names, normalised. Records write "Calgary, AB", "Rozzano (Milan)" or
 * "Suita, Osaka", so the part before a comma, the part outside brackets and the part inside them all count.
 */
export function institutionCities(city: string): string[] {
  const parts = [city, city.split(",")[0], city.replace(/\(.*?\)/g, ""), ...[...city.matchAll(/\(([^)]*)\)/g)].map((m) => m[1])];
  return [...new Set(parts.map(normaliseSiteName).filter(Boolean))];
}

/** The names an institution answers to, normalised: its name and every recorded alias of four characters or more. */
export function institutionNames(i: { id: string; country: string; city: string; name: string; aka?: string[] }): InstitutionNames {
  return { id: i.id, country: i.country, cities: institutionCities(i.city), names: [...new Set([i.name, ...(i.aka ?? [])].map(normaliseSiteName).filter((n) => n.length >= 4))] };
}

/**
 * The institution a site is, or undefined. Both rules need the site to be in the institution's own country and
 * city, because health systems and networks share names across cities ("Texas Oncology" is a practice in dozens):
 *
 * - the site's name, normalised, is the institution's name or one of its recorded aliases; or
 * - the site's name contains one of those names as whole words, the name being at least two words long
 *   ("Royal Marsden Hospital ( Site 0405)", "Beijing Cancer Hospital - Oncology Department").
 *
 * A site that two institutions would both claim is left unmatched rather than guessed.
 */
export function matchInstitution(site: { facility?: string; city?: string; iso2: string }, byCountry: Map<string, InstitutionNames[]>): string | undefined {
  const fac = normaliseSiteName(site.facility ?? "");
  const city = normaliseSiteName(site.city ?? "");
  if (!fac || !city) return undefined;
  const here = (byCountry.get(site.iso2) ?? []).filter((i) => i.cities.includes(city));
  const exact = here.filter((i) => i.names.includes(fac));
  if (exact.length) return exact.length === 1 ? exact[0].id : undefined;
  const within = here.filter((i) => i.names.some((n) => n.includes(" ") && !UMBRELLA.test(n) && ` ${fac} `.includes(` ${n} `)));
  return within.length === 1 ? within[0].id : undefined;
}

/**
 * Names of an organisation that runs several hospitals: a trust, a health board, a network. A site written as
 * "Singleton Hospital - Swansea Bay University Health Board" contains the board's name and is still not the
 * board's other hospital, so these names only match a site that is named exactly that.
 */
const UMBRELLA = /\b(nhs|trust|health board|health services|health system|hospitals|network|group|health care group|healthcare)\b/;

type Location = { facility?: string; city?: string; country?: string; status?: string };

/** What the generated file keeps for one study: recruiting sites per country and city, and the institutions among them. */
export type StudySites = {
  /** Alpha-2 country, then [city as the registry writes it, recruiting sites in that city], most sites first. */
  countries: Record<string, Array<[string, number]>>;
  /** Institution id, then the site names the registry gives it, as written. */
  institutions: Record<string, string[]>;
  /** Recruiting sites whose country is not in CTGOV_COUNTRY, so they could not be placed. */
  unplaced: number;
};

export function recruitingSites(locations: Location[], byCountry: Map<string, InstitutionNames[]>): StudySites {
  const countries: Record<string, Map<string, number>> = {};
  const institutions: Record<string, Set<string>> = {};
  let unplaced = 0;
  for (const l of locations) {
    if (l.status !== "RECRUITING") continue;
    const iso2 = l.country ? CTGOV_COUNTRY[l.country] : undefined;
    if (!iso2) { unplaced++; continue; }
    const city = (l.city ?? "").trim();
    const m = (countries[iso2] ??= new Map());
    m.set(city, (m.get(city) ?? 0) + 1);
    const inst = matchInstitution({ facility: l.facility, city: l.city, iso2 }, byCountry);
    if (inst) (institutions[inst] ??= new Set()).add((l.facility ?? "").trim());
  }
  const order = (a: [string, number], b: [string, number]) => b[1] - a[1] || a[0].localeCompare(b[0], "en");
  return {
    countries: Object.fromEntries(Object.entries(countries).sort(([a], [b]) => a.localeCompare(b)).map(([c, m]) => [c, [...m].sort(order)])),
    institutions: Object.fromEntries(Object.entries(institutions).sort(([a], [b]) => a.localeCompare(b)).map(([id, s]) => [id, [...s].sort()])),
    unplaced,
  };
}
