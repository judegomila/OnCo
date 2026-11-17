import { GLOBOCAN } from "./globocan";
import type { Cell, GlobocanCountry } from "./globocan-core";
import type { InstitutionInput } from "./schema";
import { CTGOV_COUNTRY, ISO3_TO_ISO2 } from "@/data/country-codes";
import { institutions } from "@/data/institutions";
import { TRIAL_PARTICIPATION } from "@/data/trial-participation";
import { TRIAL_SITES } from "@/data/trial-sites";

/**
 * Fixture territories for the automatic country page. TEST ONLY: importing this file outside Vitest throws.
 *
 * Since 16 November 2026 every country in GLOBOCAN has a deep dive, so no real country has an automatic page, and a
 * test that names one ("Samoa is automatic") breaks the day its deep dive is written, which happened in five waves
 * running. The route is still there for the next territory IARC reports, so its tests run on three territories that
 * do not exist. They are added to the same data the page reads (GLOBOCAN's country table, the alpha-3 to alpha-2 map,
 * the registry country names, the trial captures, the recruiting-site lists and the institution list), so the whole
 * path runs as it would for a real newcomer: countryIndex(), autoCountryCodes(), generateStaticParams(), the page,
 * the trials table and its paged file, the search index.
 *
 * Import this file FIRST in a test file, before anything that reads the data: src/lib/country-pages.ts builds its
 * code map when it loads, and src/data/index.ts joins trial captures to trial records when it loads. Vitest gives each
 * test file its own modules, so nothing leaks into another file.
 *
 * The codes are from the ranges ISO 3166 leaves for private use (alpha-2 XA to XZ, alpha-3 XAA to XZZ, numeric 900 to
 * 999), so they can never meet a real country, and no folder under src/app/countries can carry one by accident.
 * Every figure below is made up and is only ever compared with what the page prints.
 *
 * - XA, Fixture Atoll: incidence built from neighbouring countries (IARC method 5), no trial, no record. The page must
 *   say so and name the trial gap.
 * - XB, Fixture Bay: a few trials (fewer than one page of the table), one of them with a recruiting site, and one
 *   institution. The page must list every trial and the institution.
 * - XC, Fixture Coast: more trials than one page of the table, so the page carries the first rows and points at a file.
 */
if (!process.env.VITEST) throw new Error("src/lib/country-fixture.ts is a test fixture and must never be part of a build");

export const FIXTURE_ATOLL = "XA";
export const FIXTURE_BAY = "XB";
export const FIXTURE_COAST = "XC";
export const FIXTURE_CODES = [FIXTURE_ATOLL, FIXTURE_BAY, FIXTURE_COAST];
export const FIXTURE_INSTITUTION = "fixture-bay-general-hospital";

/** Trials given a site in Fixture Bay: under a page of the country trials table (15 rows). */
export const BAY_TRIALS = 4;
/** Trials given a site in Fixture Coast: more than a page of it. */
export const COAST_TRIALS = 40;

// All cancers is code 39; the site codes are the first five GLOBOCAN lists, whatever they are in this edition.
const siteCodes = Object.keys(GLOBOCAN.cancers).filter((c) => !["8", "9", "10", "37", "38", "39", "40"].includes(c)).slice(0, 5);
const cells = (all: Cell, scale: number): Record<string, Cell> => ({
  "39": all,
  ...Object.fromEntries(siteCodes.map((code, i): [string, Cell] => [code, [(5 - i) * scale + 3, 10.1 + i, (5 - i) * Math.round(scale / 2) + 1, 5.2 + i, 1.1]])),
});
const territory = (iso3: string, isonum: number, name: string, methodInc: string, methodMort: string, pop: number, all: Cell): GlobocanCountry => ({
  name, iso3, isonum, code: isonum, pop, region: "6", area: "Micronesia", hdi: "Medium HDI", income: "Lower middle income", whoRegion: "WPRO", methodInc, methodMort, data: cells(all, Math.round((all[0] ?? 0) / 20)),
});

const TERRITORIES: Array<[string, GlobocanCountry]> = [
  [FIXTURE_ATOLL, territory("XAA", 901, "Fixture Atoll", "5", "3b", 61234, [1234, 151.7, 678, 83.4, 15.9])],
  [FIXTURE_BAY, territory("XBB", 902, "Fixture Bay", "1", "1", 482345, [8765, 201.3, 4321, 97.6, 20.4])],
  [FIXTURE_COAST, territory("XCC", 903, "Fixture Coast", "2b", "3c", 1934567, [23456, 187.9, 12987, 101.2, 19.3])],
];
for (const [iso2, c] of TERRITORIES) {
  if (GLOBOCAN.countries[c.iso3] || Object.values(ISO3_TO_ISO2).includes(iso2)) throw new Error(`fixture code ${iso2} is in use`);
  GLOBOCAN.countries[c.iso3] = c;
  ISO3_TO_ISO2[c.iso3] = iso2;
  CTGOV_COUNTRY[c.name] = iso2;
}

// Trials: the first captures in the file whose recruiting-site list is held are given a site in a fixture territory.
// Which trials they are does not matter; the tests compare the page with what the same data functions return.
const captured = Object.entries(TRIAL_PARTICIPATION).filter(([, readings]) => readings.length > 0 && readings.every((r) => TRIAL_SITES[r.nct]));
if (captured.length < BAY_TRIALS + COAST_TRIALS) throw new Error("too few trial captures for the fixture territories");
const place = (from: number, count: number, name: string) => {
  for (const [, readings] of captured.slice(from, from + count)) readings[0].countries = [...(readings[0].countries ?? []), name];
};
place(0, BAY_TRIALS, "Fixture Bay");
place(BAY_TRIALS, COAST_TRIALS, "Fixture Coast");
// One of Fixture Bay's trials has two recruiting sites in its one town, so the "recruiting here" count is not zero.
TRIAL_SITES[captured[0][1][0].nct].countries[FIXTURE_BAY] = [["Fixture Harbour", 2]];

const hospital: InstitutionInput = {
  kind: "institution", asOf: "2026-11-16", id: FIXTURE_INSTITUTION, name: "Fixture Bay General Hospital", city: "Fixture Harbour", country: FIXTURE_BAY, lat: 0, lng: 0, institutionType: "hospital",
  tldr: "A hospital that does not exist, in a territory that does not exist: a test fixture for the automatic country page.",
  summary: "Fixture Bay General Hospital is a test fixture. It exists only while the tests of the automatic country page run, so that the page has an institution to list for a territory with no deep dive.",
};
institutions.push(hospital);
