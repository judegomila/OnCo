/**
 * Oncology research output by country, from OpenAlex, plus registered trial counts by location
 * country from ClinicalTrials.gov. Writes public/openalex/countries.json (committed; rebuild with
 * `npm run fetch:countries`).
 *
 * Counting rule: OpenAlex `group_by=authorships.countries` counts a work once for every country
 * that appears among its authors' affiliations (whole counting), so international collaborations are
 * credited to each participating country and column totals exceed the number of works.
 *
 * Fields per ISO-2 country code:
 *   works[year]   oncology works (primary_topic.subfield 2730 = Oncology) for 2021..2025
 *   total         works 2021..2025 (whole counting)
 *   citedHigh     works 2021..2025 with > 50 citations
 *   oa            open-access works 2021..2025
 *   trials        ClinicalTrials.gov studies with at least one site in the country (all statuses)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAILTO = "onco@judegomila.com";
const UA = "OnCo/1.0 (https://github.com/judegomila/OnCo; mailto:onco@judegomila.com)";
const YEARS = [2021, 2022, 2023, 2024, 2025];
const BASE = "https://api.openalex.org/works";
const out = join(process.cwd(), "public", "openalex");
mkdirSync(out, { recursive: true });

type Group = { key: string; key_display_name: string; count: number };
type Country = { name: string; works: Record<string, number>; total: number; citedHigh: number; oa: number; trials?: number };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getJson<T>(url: string, tries = 5): Promise<T> {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (r.ok) return (await r.json()) as T;
    if (r.status === 429 || r.status >= 500) { await sleep(1500 * 2 ** i); continue; }
    throw new Error(`${r.status} ${url}`);
  }
  throw new Error(`gave up: ${url}`);
}

async function groupByCountry(filter: string): Promise<Group[]> {
  const url = `${BASE}?filter=${encodeURIComponent(filter)}&group_by=authorships.countries&per_page=200&mailto=${MAILTO}`;
  const j = await getJson<{ group_by: Group[] }>(url);
  await sleep(400);
  return j.group_by;
}

const iso = (key: string) => key.replace("https://openalex.org/countries/", "").toUpperCase();

// ClinicalTrials.gov uses full country names in query.locn; OpenAlex display names mostly match.
// `query.locn` is free text; the forms below were checked against the API on 2026-09-08
// ("Korea, Republic of" returns 191 studies, "South Korea" 17,673; "Czech Republic" 66, "Czechia" 7,039).
const CT_NAME: Record<string, string> = {
  US: "United States", GB: "United Kingdom", KR: "South Korea", RU: "Russia", IR: "Iran", TW: "Taiwan", CZ: "Czechia", VN: "Vietnam", TR: "Turkey", HK: "Hong Kong", EG: "Egypt", NL: "Netherlands", CH: "Switzerland",
};

async function trialsIn(country: string): Promise<number | undefined> {
  const url = `https://clinicaltrials.gov/api/v2/studies?query.locn=${encodeURIComponent(country)}&countTotal=true&pageSize=1&fields=NCTId`;
  try {
    const j = await getJson<{ totalCount?: number }>(url, 3);
    await sleep(350);
    return j.totalCount;
  } catch { return undefined; }
}

async function main() {
  const countries = new Map<string, Country>();
  const ensure = (g: Group) => {
    const code = iso(g.key);
    if (!countries.has(code)) countries.set(code, { name: g.key_display_name, works: {}, total: 0, citedHigh: 0, oa: 0 });
    return countries.get(code)!;
  };
  for (const y of YEARS) {
    const groups = await groupByCountry(`primary_topic.subfield.id:2730,publication_year:${y}`);
    for (const g of groups) { const c = ensure(g); c.works[String(y)] = g.count; c.total += g.count; }
    console.log(`year ${y}: ${groups.length} countries`);
  }
  const range = `publication_year:${YEARS[0]}-${YEARS[YEARS.length - 1]}`;
  for (const g of await groupByCountry(`primary_topic.subfield.id:2730,${range},cited_by_count:>50`)) ensure(g).citedHigh = g.count;
  for (const g of await groupByCountry(`primary_topic.subfield.id:2730,${range},is_oa:true`)) ensure(g).oa = g.count;

  // Trials for the 60 most productive countries.
  const top = [...countries.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 60);
  for (const [code, c] of top) {
    c.trials = await trialsIn(CT_NAME[code] ?? c.name);
    console.log(`trials ${code}: ${c.trials ?? "n/a"}`);
  }

  const data = { built: new Date().toISOString().slice(0, 10), years: YEARS, source: "OpenAlex works, primary_topic.subfield 2730 (Oncology), group_by authorships.countries (whole counting); ClinicalTrials.gov v2 query.locn counts", countries: Object.fromEntries([...countries.entries()].sort((a, b) => b[1].total - a[1].total)) };
  writeFileSync(join(out, "countries.json"), JSON.stringify(data, null, 0));
  console.log(`countries: ${countries.size} written`);
}

main().catch((e) => { console.error(e); process.exit(1); });
