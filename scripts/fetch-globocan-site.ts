/**
 * Fetches one GLOBOCAN site by sex for every country and writes public/globocan/sites/<code>-<slug>-by-sex.json.
 *
 * The site-wide fetcher (scripts/fetch-globocan.ts) keeps both sexes only. Some cancers have a geography that differs
 * by sex (gallbladder cancer is two to three times commoner in women almost everywhere except Korea and Japan), so
 * the geography layer (src/lib/cancer-geography.ts) reads a per-site file that carries both sexes, women and men.
 *
 * Same endpoint as the site-wide fetcher, one polite request per population (350 ms apart, four retries), cached in
 * /tmp/globocan-factsheets so a rerun costs nothing:
 *   https://gco-api.iarc.fr/api/globocan/v3/2022/factsheet/population/<population>/?group_CRC=1&include_nmsc=1&include_nmsc_other=0
 * Rows: sex 0 both, 1 men, 2 women; type 0 incidence, 1 mortality; cancer_code as in meta/cancers/all/.
 *
 * Run: npm run fetch:globocan:site -- 12 gallbladder
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CODE = Number(process.argv[2] ?? 12);
const SLUG = process.argv[3] ?? "gallbladder";
const YEAR = 2022;
const API = `https://gco-api.iarc.fr/api/globocan/v3/${YEAR}`;
const QS = "?group_CRC=1&include_nmsc=1&include_nmsc_other=0";
const UA = "OnCo/1.0 (research use)";
const cache = join("/tmp", "globocan-factsheets", String(YEAR));
mkdirSync(cache, { recursive: true });
const outDir = join(process.cwd(), "public", "globocan", "sites");
mkdirSync(outDir, { recursive: true });

type MetaCancer = { cancer: number; label: string; ICD: string };
type MetaPop = { country: number; label: string; country_iso3: string; country_isonum: string; continent_code: string; hdi_label?: string };
type Row = { sex: number; type: number; cancer_code: number; total: number; asr: number };
type Cell = [number | null, number | null, number | null, number | null];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get<T>(path: string, cacheName: string): Promise<T | null> {
  const file = join(cache, cacheName);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8")) as T;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(`${API}/${path}`, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(1500 * (attempt + 1)); continue; }
      if (!r.ok) return null;
      const text = await r.text();
      if (!text.trimStart().startsWith("[") && !text.trimStart().startsWith("{")) return null;
      writeFileSync(file, text);
      await sleep(350);
      return JSON.parse(text) as T;
    } catch { await sleep(1500 * (attempt + 1)); }
  }
  return null;
}

async function main() {
  const cancers = await get<MetaCancer[]>("meta/cancers/all/", "meta-cancers.json");
  const pops = await get<MetaPop[]>("meta/populations/all/", "meta-populations.json");
  if (!cancers || !pops) throw new Error(`GLOBOCAN ${YEAR}: meta endpoints unreachable`);
  const site = cancers.find((c) => c.cancer === CODE);
  if (!site) throw new Error(`GLOBOCAN ${YEAR}: no cancer code ${CODE}`);
  const countries = pops.filter((p) => p.country_iso3 && /^\d+$/.test(p.country_isonum) && Number(p.country_isonum) < 900);
  const world = pops.find((p) => p.country === 900);
  const failed: string[] = [];
  const cellsFor = (rows: Row[]) => {
    const cells: Record<"both" | "men" | "women", Cell> = { both: [null, null, null, null], men: [null, null, null, null], women: [null, null, null, null] };
    for (const r of rows) {
      if (r.cancer_code !== CODE || (r.type !== 0 && r.type !== 1)) continue;
      const key = (["both", "men", "women"] as const)[r.sex];
      if (!key) continue;
      if (r.type === 0) { cells[key][0] = r.total; cells[key][1] = r.asr; } else { cells[key][2] = r.total; cells[key][3] = r.asr; }
    }
    return cells;
  };
  const record = async (p: MetaPop) => {
    const fs = await get<{ dataset: Row[] }>(`factsheet/population/${p.country}/${QS}`, `${p.country}.json`);
    if (!fs) { failed.push(p.label); return null; }
    return { name: p.label, isonum: /^\d+$/.test(p.country_isonum) ? Number(p.country_isonum) : 900, region: p.continent_code, hdi: p.hdi_label ?? null, ...cellsFor(fs.dataset) };
  };
  const result: Record<string, unknown> = {};
  let done = 0;
  for (const p of countries) {
    const rec = await record(p);
    if (rec) result[p.country_iso3] = rec;
    if (++done % 25 === 0) console.log(`  ${done}/${countries.length}`);
  }
  const worldRec = world ? await record(world) : null;
  const fetched = new Date().toISOString().slice(0, 10);
  const out = {
    source: "GLOBOCAN 2022, International Agency for Research on Cancer (IARC), Global Cancer Observatory, Cancer Today",
    sourceUrl: "https://gco.iarc.who.int/today", apiUrl: API,
    version: `GLOBOCAN ${YEAR} (Cancer Today version 1.1, API v3), read from the per-population factsheet endpoint`,
    year: YEAR, fetched, cancerCode: CODE, icd: site.ICD, label: site.label.trim(),
    note: `Estimates, not registry counts. ASR = age-standardised rate per 100,000 (World standard population), all ages. Cell = [new cases, incidence ASR, deaths, mortality ASR] for both sexes, men and women. ${Object.keys(result).length} countries and the world aggregate; ${failed.length ? `failed: ${failed.join(", ")}` : "no population failed to fetch"}.`,
    citation: "Ferlay J, Ervik M, Lam F, et al. Global Cancer Observatory: Cancer Today (version 1.1). Lyon: IARC; 2024.",
    world: worldRec, countries: result,
  };
  const file = join(outDir, `${CODE}-${SLUG}-by-sex.json`);
  writeFileSync(file, JSON.stringify(out));
  console.log(`globocan ${YEAR} site ${CODE} (${site.label.trim()}): ${Object.keys(result).length} countries; failed: ${failed.length} → ${file}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
