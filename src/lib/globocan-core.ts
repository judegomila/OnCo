import { ALL_CANCERS_CODE, GLOBOCAN_MAP, type GlobocanMapping } from "@/data/globocan-map";

// Pure helpers shared by server and client code. No JSON import here, so this file stays out of the browser bundle's way.

/** [new cases, incidence ASR, deaths, mortality ASR, cumulative risk to 74] — any may be null. */
export type Cell = [number | null, number | null, number | null, number | null, number | null];
export type GlobocanCountry = { name: string; iso3: string; isonum: number; code: number; pop?: number; region: string; area: string; hdi?: string; income?: string; whoRegion?: string; methodInc?: string; methodMort?: string; data: Record<string, Cell> };
export type Globocan = { source: string; sourceUrl: string; apiUrl: string; year: number; fetched: string; note: string; citation: string; cancers: Record<string, { label: string; icd: string; order: number }>; countries: Record<string, GlobocanCountry>; failed: string[] };

/** Static copy of the dataset, served from public/. Client code fetches this instead of importing the JSON. */
export const DATA_URL = "/globocan/countries.json";

export const CONTINENT: Record<string, string> = { "1": "Africa", "2": "Latin America and the Caribbean", "3": "Northern America", "4": "Asia", "5": "Europe", "6": "Oceania" };

/** Sum cells over codes (counts and ASRs add across mutually exclusive sites; cumulative risk only for a single code). */
export function cellFor(country: GlobocanCountry, codes: number[]): Cell | null {
  if (!codes.length) return null;
  const cells = codes.map((c) => country.data[String(c)]).filter((x): x is Cell => !!x);
  if (!cells.length) return null;
  const sum = (i: 0 | 1 | 2 | 3) => cells.some((c) => c[i] !== null) ? cells.reduce((a, c) => a + (c[i] ?? 0), 0) : null;
  return [sum(0), sum(1) === null ? null : Math.round((sum(1) as number) * 10) / 10, sum(2), sum(3) === null ? null : Math.round((sum(3) as number) * 10) / 10, codes.length === 1 ? cells[0][4] : null];
}

export function mappingFor(cancerId: string | null): GlobocanMapping {
  if (!cancerId) return { codes: [ALL_CANCERS_CODE], label: "All cancers (excluding non-melanoma skin)" };
  return GLOBOCAN_MAP[cancerId] ?? { codes: [], label: "No direct estimate", note: "This cancer is not mapped to a GLOBOCAN site." };
}

export type CountryRow = { iso3: string; isonum: number; name: string; region: string; area: string; hdi?: string; pop?: number; cases: number | null; incAsr: number | null; deaths: number | null; mortAsr: number | null; cumRisk: number | null; mi: number | null };
export type CancerRows = { rows: CountryRow[]; mapping: GlobocanMapping; world: CountryRow | null };

/** Country rows for one OnCo cancer (or all cancers), excluding the WORLD aggregate. Pure; works on the client with fetched data. */
export function rowsForCancerIn(data: Globocan, cancerId: string | null): CancerRows {
  const mapping = mappingFor(cancerId);
  const rows: CountryRow[] = [];
  let world: CountryRow | null = null;
  for (const [key, c] of Object.entries(data.countries)) {
    const cell = cellFor(c, mapping.codes);
    const row: CountryRow = { iso3: c.iso3, isonum: c.isonum, name: c.name, region: CONTINENT[c.region] ?? c.region, area: c.area, hdi: c.hdi, pop: c.pop, cases: cell?.[0] ?? null, incAsr: cell?.[1] ?? null, deaths: cell?.[2] ?? null, mortAsr: cell?.[3] ?? null, cumRisk: cell?.[4] ?? null, mi: cell && cell[0] && cell[2] !== null ? Math.round((cell[2] / cell[0]) * 100) / 100 : null };
    if (key === "WORLD") world = row; else rows.push(row);
  }
  rows.sort((a, b) => (b.cases ?? -1) - (a.cases ?? -1));
  return { rows, mapping, world };
}

export type CountrySite = { code: number; label: string; oncoIds: string[]; cases: number | null; incAsr: number | null; deaths: number | null; mortAsr: number | null; cumRisk: number | null };
export type CountryProfile = { iso3: string; name: string; pop?: number; region: string; hdi?: string; sites: CountrySite[] };

/** Aggregates (37 all excl. NMSC-other, 38 all sites but skin, 39/40 all cancers) and the colon/rectum/anus parts covered by colorectum (41). */
const NON_SITE_CODES = new Set([8, 9, 10, 37, 38, 39, 40]);

/** One country's cancers ranked by new cases, with the OnCo cancers that map directly to each site. */
export function sitesForCountry(data: Globocan, iso3: string): CountryProfile | null {
  const c = data.countries[iso3];
  if (!c) return null;
  const codeToOnco = new Map<number, string[]>();
  for (const [id, m] of Object.entries(GLOBOCAN_MAP)) if (m.codes.length === 1) codeToOnco.set(m.codes[0], [...(codeToOnco.get(m.codes[0]) ?? []), id]);
  const sites: CountrySite[] = Object.keys(data.cancers).map(Number).filter((code) => !NON_SITE_CODES.has(code)).map((code) => {
    const cell = cellFor(c, [code]);
    return { code, label: data.cancers[String(code)].label.trim(), oncoIds: codeToOnco.get(code) ?? [], cases: cell?.[0] ?? null, incAsr: cell?.[1] ?? null, deaths: cell?.[2] ?? null, mortAsr: cell?.[3] ?? null, cumRisk: cell?.[4] ?? null };
  }).sort((a, b) => (b.cases ?? -1) - (a.cases ?? -1));
  return { iso3, name: c.name, pop: c.pop, region: CONTINENT[c.region] ?? c.region, hdi: c.hdi, sites };
}
