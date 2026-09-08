/**
 * Fetches GLOBOCAN 2022 (IARC Global Cancer Observatory) incidence and mortality by country and
 * cancer type, both sexes, all ages, and writes a compact public/globocan/countries.json.
 *
 * Endpoint (as used by gco.iarc.who.int/today): https://gco-api.iarc.fr/api/globocan/v3/2022/
 *   meta/cancers/all/            cancer codes, labels, ICD-10 ranges
 *   meta/populations/all/        countries and aggregate populations
 *   factsheet/population/<code>/ all cancers for one population (type 0 = incidence, 1 = mortality)
 *
 * Run: npm run fetch:globocan   (idempotent; ~190 requests at ~3/s)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const API = "https://gco-api.iarc.fr/api/globocan/v3/2022";
const QS = "?group_CRC=1&include_nmsc=1&include_nmsc_other=0";
const UA = "OnCo/1.0 (github.com/judegomila/OnCo; research use)";
const out = join(process.cwd(), "public", "globocan");
mkdirSync(out, { recursive: true });

type MetaCancer = { cancer: number; label: string; ICD: string; cancer_order: number };
type MetaPop = { country: number; label: string; country_iso3: string; country_isonum: string; continent_code: string; area_label: string; hdi_label?: string; income_label?: string; who_region?: string; method_incidence?: string; method_mortality?: string };
type Row = { sex: number; type: number; cancer_code: number; total: number; total_pop: number; asr: number; crude_rate: number; cum_risk_74: number };

async function get<T>(path: string): Promise<T | null> {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(`${API}/${path}`, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(1500 * (attempt + 1)); continue; }
      if (!r.ok) return null;
      return (await r.json()) as T;
    } catch { await sleep(1500 * (attempt + 1)); }
  }
  return null;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const cancers = await get<MetaCancer[]>("meta/cancers/all/");
  const pops = await get<MetaPop[]>("meta/populations/all/");
  if (!cancers || !pops) throw new Error("GLOBOCAN meta endpoints unreachable");

  // Real countries have a numeric ISO code and an ISO3; aggregates (regions, HDI groups, world = 900) do not.
  const countries = pops.filter((p) => p.country_iso3 && /^\d+$/.test(p.country_isonum) && Number(p.country_isonum) < 900);
  const world = pops.find((p) => p.country === 900);

  const cancerMeta: Record<number, { label: string; icd: string; order: number }> = {};
  for (const c of cancers) cancerMeta[c.cancer] = { label: c.label, icd: c.ICD, order: c.cancer_order };

  type Country = { name: string; iso3: string; isonum: number; code: number; pop?: number; region: string; area: string; hdi?: string; income?: string; whoRegion?: string; methodInc?: string; methodMort?: string; data: Record<number, [number | null, number | null, number | null, number | null, number | null]> };
  const result: Record<string, Country> = {};
  let done = 0;
  const failed: string[] = [];

  const fetchOne = async (p: MetaPop, key: string) => {
    const fs = await get<{ dataset: Row[] }>(`factsheet/population/${p.country}/${QS}`);
    if (!fs) { failed.push(p.label); return; }
    const c: Country = { name: p.label, iso3: p.country_iso3, isonum: Number(p.country_isonum), code: p.country, region: p.continent_code, area: p.area_label, hdi: p.hdi_label, income: p.income_label, whoRegion: p.who_region, methodInc: p.method_incidence, methodMort: p.method_mortality, data: {} };
    for (const r of fs.dataset) {
      if (r.sex !== 0) continue; // both sexes only
      const cell = (c.data[r.cancer_code] ??= [null, null, null, null, null]);
      if (r.type === 0) { cell[0] = r.total; cell[1] = r.asr; cell[4] = r.cum_risk_74; if (r.cancer_code === 39) c.pop = r.total_pop; }
      if (r.type === 1) { cell[2] = r.total; cell[3] = r.asr; }
    }
    result[key] = c;
  };

  for (const p of countries) {
    await fetchOne(p, p.country_iso3);
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${countries.length}`);
    await sleep(350);
  }
  if (world) await fetchOne(world, "WORLD");

  const payload = {
    source: "GLOBOCAN 2022, International Agency for Research on Cancer (IARC), Global Cancer Observatory",
    sourceUrl: "https://gco.iarc.who.int/today",
    apiUrl: API,
    year: 2022,
    fetched: new Date().toISOString().slice(0, 10),
    note: "Estimates, not registry counts. ASR = age-standardised rate per 100,000 (World standard population). Both sexes, all ages. Data cell = [new cases, incidence ASR, deaths, mortality ASR, cumulative risk to age 74 (%)]. Cancer code 39 = all cancers excluding non-melanoma skin cancer.",
    citation: "Ferlay J, Ervik M, Lam F, et al. Global Cancer Observatory: Cancer Today (version 1.1). Lyon: IARC; 2024.",
    cancers: cancerMeta,
    countries: result,
    failed,
  };
  writeFileSync(join(out, "countries.json"), JSON.stringify(payload));
  console.log(`globocan: ${Object.keys(result).length} populations, ${Object.keys(cancerMeta).length} cancer codes; failed: ${failed.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
