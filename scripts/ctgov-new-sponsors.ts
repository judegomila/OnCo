/**
 * New oncology companies, found through the trials they register: industry lead sponsors of interventional cancer
 * studies first posted on ClinicalTrials.gov since a date, that match no company record and no sponsor alias in the
 * corpus. A company that has just raised money or come out of stealth usually registers its first trial within a year
 * or two, so this is the cheapest repeatable way to see who is new. It is a pointer list, never a record: every
 * candidate still has to be confirmed against the company's own website before a record is written (CONTRIBUTING.md,
 * docs/LAUNCH.md "Keeping the company list fresh").
 *
 *   npx tsx scripts/ctgov-new-sponsors.ts                       studies first posted since 2024-01-01, print candidates
 *   npx tsx scripts/ctgov-new-sponsors.ts --since=2026-07-01    a narrower window (the monthly run)
 *   npx tsx scripts/ctgov-new-sponsors.ts --first-trial         also ask the registry for each candidate's earliest study
 *                                                               and keep only sponsors whose first study is inside the window
 *   npx tsx scripts/ctgov-new-sponsors.ts --no-fetch            reuse the cached registry pull
 *   npx tsx scripts/ctgov-new-sponsors.ts --out=<dir>           where the cache and report go (default .cache/ctgov-new-sponsors)
 *   npx tsx scripts/ctgov-new-sponsors.ts --apply               also write the report to <out>/queue.json for a research round
 *
 * Nothing under src/data is ever written, with or without --apply: --apply only writes the candidate queue file, outside
 * the corpus, because a registry sponsor string is not evidence that a company exists in the form a record claims.
 * Matching reuses what scripts/fetch-ctgov-pipeline.ts uses: companyKey/companyKeys from src/lib/completeness.ts and
 * resolveSponsor from src/data/sponsor-aliases.ts; product names are cleaned with the same helpers, and drug keys that
 * are only a radiolabel or a target name are dropped through scripts/drug-key-guard.ts so a candidate's product list
 * does not claim a corpus drug it does not have.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys, drugKeys, norm } from "../src/lib/completeness";
import { resolveSponsor } from "../src/data/sponsor-aliases";
import { isNotAProductKey } from "./drug-key-guard";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const SINCE = arg("since") ?? "2024-01-01";
const OUT = arg("out") ?? join(process.cwd(), ".cache", "ctgov-new-sponsors");
const NO_FETCH = process.argv.includes("--no-fetch");
const FIRST_TRIAL = process.argv.includes("--first-trial");
const APPLY = process.argv.includes("--apply");
if (!/^\d{4}-\d{2}-\d{2}$/.test(SINCE)) throw new Error(`--since must be YYYY-MM-DD, got ${SINCE}`);
mkdirSync(OUT, { recursive: true });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Raw = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: { studyFirstPostDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string; class?: string } };
    designModule?: { phases?: string[] };
    armsInterventionsModule?: { interventions?: Array<{ type?: string; name?: string }> };
    conditionsModule?: { conditions?: string[] };
    contactsLocationsModule?: { centralContacts?: Array<{ email?: string }>; locations?: Array<{ country?: string }> };
  };
};
type Study = { nct: string; title: string; posted: string; sponsor: string; phases: string[]; products: string[]; conditions: string[]; domains: string[]; countries: string[] };

const API = "https://clinicaltrials.gov/api/v2/studies";
const FIELDS = "NCTId,BriefTitle,StudyFirstPostDate,LeadSponsorName,LeadSponsorClass,Phase,InterventionType,InterventionName,Condition,CentralContactEMail,LocationCountry";
const FREE_MAIL = /gmail|yahoo|hotmail|outlook|163\.com|qq\.com|126\.com|foxmail|icloud|sina\.com|aliyun/;

async function getJson<T>(url: string, attempt = 1): Promise<T> {
  const r = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
  if (r.status === 429 || r.status >= 500) {
    if (attempt >= 5) throw new Error(`HTTP ${r.status} for ${url}`);
    await sleep(1500 * 2 ** attempt);
    return getJson<T>(url, attempt + 1);
  }
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return (await r.json()) as T;
}

function flatten(s: Raw): Study | null {
  const p = s.protocolSection;
  const nct = p?.identificationModule?.nctId;
  const sponsor = p?.sponsorCollaboratorsModule?.leadSponsor?.name?.trim();
  if (!nct || !sponsor) return null;
  const domains = new Set<string>();
  for (const c of p?.contactsLocationsModule?.centralContacts ?? []) {
    const d = c.email?.split("@")[1]?.toLowerCase().trim();
    if (d && !FREE_MAIL.test(d)) domains.add(d);
  }
  return {
    nct, sponsor, title: p?.identificationModule?.briefTitle ?? "", posted: p?.statusModule?.studyFirstPostDateStruct?.date ?? "",
    phases: p?.designModule?.phases ?? [],
    products: (p?.armsInterventionsModule?.interventions ?? []).filter((i) => (i.type === "DRUG" || i.type === "BIOLOGICAL") && i.name).map((i) => i.name!.trim()),
    conditions: p?.conditionsModule?.conditions ?? [], domains: [...domains],
    countries: [...new Set((p?.contactsLocationsModule?.locations ?? []).map((l) => l.country).filter((c): c is string => !!c))],
  };
}

async function fetchWindow(): Promise<Study[]> {
  const filter = encodeURIComponent(`AREA[LeadSponsorClass]INDUSTRY AND AREA[StudyType]INTERVENTIONAL AND AREA[StudyFirstPostDate]RANGE[${SINCE},MAX]`);
  const out: Study[] = [];
  let token: string | undefined;
  for (let page = 0; page < 40; page++) {
    const j = await getJson<{ studies?: Raw[]; nextPageToken?: string }>(`${API}?query.cond=cancer&filter.advanced=${filter}&pageSize=1000&fields=${FIELDS}${token ? `&pageToken=${token}` : ""}`);
    for (const s of j.studies ?? []) { const f = flatten(s); if (f) out.push(f); }
    console.error(`page ${page + 1}: ${out.length} studies`);
    token = j.nextPageToken;
    if (!token) break;
    await sleep(600);
  }
  return out;
}

/** The sponsor's earliest study of any kind on the registry, by first-posted date. */
async function firstStudy(sponsor: string): Promise<{ nct: string; posted: string } | null> {
  const j = await getJson<{ studies?: Raw[] }>(`${API}?query.lead=${encodeURIComponent(`"${sponsor}"`)}&sort=StudyFirstPostDate:asc&pageSize=1&fields=NCTId,StudyFirstPostDate,LeadSponsorName`);
  const s = j.studies?.[0]?.protocolSection;
  return s?.identificationModule?.nctId ? { nct: s.identificationModule.nctId, posted: s.statusModule?.studyFirstPostDateStruct?.date ?? "" } : null;
}

async function main() {
  const cache = join(OUT, `studies-since-${SINCE}.json`);
  const studies: Study[] = NO_FETCH && existsSync(cache) ? JSON.parse(readFileSync(cache, "utf8")) : await fetchWindow();
  if (!NO_FETCH) writeFileSync(cache, JSON.stringify(studies));
  console.error(`${studies.length} industry interventional cancer studies first posted since ${SINCE}`);

  const g = graph();
  const keys = new Set<string>();
  const hosts = new Set<string>();
  for (const c of g.kind("company")) {
    for (const k of companyKeys(c)) keys.add(k);
    try { if (c.website) hosts.add(new URL(c.website).hostname.replace(/^www\./, "")); } catch { /* a malformed URL fails validation elsewhere */ }
  }
  const known = (sponsor: string, domains: string[]) => {
    const k = companyKey(sponsor);
    if (keys.has(k) || keys.has(norm(sponsor))) return true;
    for (const c of keys) if (c.length >= 5 && (k.startsWith(c + " ") || k.endsWith(" " + c) || k.includes(" " + c + " "))) return true;
    if (resolveSponsor(sponsor).matched) return true;
    return domains.some((d) => hosts.has(d.replace(/^www\./, "")) || [...hosts].some((h) => d.endsWith("." + h)));
  };
  const drugKeySet = new Set<string>();
  for (const d of g.kind("drug")) for (const k of drugKeys(d)) if (!isNotAProductKey(k)) drugKeySet.add(k);

  type Candidate = { sponsor: string; studies: number; firstPostedInWindow: string; phases: string[]; products: string[]; productsInCorpus: string[]; conditions: string[]; domains: string[]; countries: string[]; ncts: string[]; firstEver?: { nct: string; posted: string } };
  const by = new Map<string, Study[]>();
  for (const s of studies) by.set(s.sponsor, [...(by.get(s.sponsor) ?? []), s]);
  const top = (xs: string[], n: number) => Object.entries(xs.reduce<Record<string, number>>((a, x) => ((a[x] = (a[x] ?? 0) + 1), a), {})).sort((a, b) => b[1] - a[1]).slice(0, n).map(([x]) => x);
  const candidates: Candidate[] = [];
  for (const [sponsor, list] of by) {
    const domains = top(list.flatMap((s) => s.domains), 3);
    if (known(sponsor, domains)) continue;
    const products = top(list.flatMap((s) => s.products), 8);
    candidates.push({
      sponsor, studies: list.length, firstPostedInWindow: list.map((s) => s.posted).sort()[0] ?? "",
      phases: top(list.flatMap((s) => s.phases), 4), products, productsInCorpus: products.filter((p) => drugKeySet.has(norm(p))),
      conditions: top(list.flatMap((s) => s.conditions), 5), domains, countries: top(list.flatMap((s) => s.countries), 4), ncts: list.map((s) => s.nct).slice(0, 10),
    });
  }
  candidates.sort((a, b) => b.studies - a.studies || a.sponsor.localeCompare(b.sponsor));

  let kept = candidates;
  if (FIRST_TRIAL) {
    kept = [];
    for (const c of candidates) {
      c.firstEver = (await firstStudy(c.sponsor)) ?? undefined;
      if (!c.firstEver || c.firstEver.posted >= SINCE) kept.push(c);
      await sleep(400);
    }
  }

  for (const c of kept) console.log([c.studies, c.sponsor, c.firstEver?.posted ?? c.firstPostedInWindow, c.countries.join("/"), c.domains.join(" "), c.products.slice(0, 3).join("; ")].join("\t"));
  console.error(`${by.size} sponsors in the window; ${candidates.length} match no company record or sponsor alias${FIRST_TRIAL ? `; ${kept.length} registered their first study since ${SINCE}` : ""}`);
  if (APPLY) {
    writeFileSync(join(OUT, "queue.json"), JSON.stringify({ since: SINCE, generated: new Date().toISOString().slice(0, 10), candidates: kept }, null, 1));
    console.error(`queue written to ${join(OUT, "queue.json")}; confirm each candidate on its own website before writing a record`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
