/**
 * Oncology research output per institution from OpenAlex (CC0), five publication years.
 *
 * For every institution record: resolve an OpenAlex institution id (the id already recorded in
 * public/openalex/institutions.json first, then ROR when the record carries one, then
 * /institutions?search= restricted to the record's country, keeping only confident matches), then
 * pull works whose primary topic subfield is Oncology (2730) with authorships.institutions.lineage
 * so that a university's hospitals count: works and citations per year, open-access, clinical-trial
 * and review counts, the 15 most-cited works, and the 10 authors with the most works.
 *
 * Writes public/openalex/research/<institutionId>.json (about 10 KB each) and the counts-only
 * public/openalex/research-index.json. Every number comes from the API response.
 *
 *   npm run fetch:research                 refresh (per-URL cache in /tmp keeps re-runs cheap)
 *   npm run fetch:research -- --force      ignore the /tmp cache
 *   npm run fetch:research -- --only=id    one institution
 *   npm run fetch:research -- --people     also add resolvable DOIs to matched people with fewer than 3 papers
 *
 * Polite pool: mailto on every request, about 5 requests per second.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Institution, Person } from "../src/lib/schema";
import { publicPath, sleep, today, writeJson } from "./feed-utils";
import { bareDoi, CLINICAL_TRIAL_CONCEPT, matchAuthorToPerson, nameSimilarity, ONCOLOGY_SUBFIELD, researchWindow, type InstitutionResearch, type MatchConfidence, type ResearchAuthor, type ResearchIndex, type ResearchIndexRow, type ResearchWork } from "../src/lib/research";

const MAILTO = "onco@judegomila.com";
const API = "https://api.openalex.org";
const CACHE_DIR = "/tmp/onco-openalex-research";
const MIN_INTERVAL_MS = 200; // about 5 requests per second
const TOP_WORKS = 15;
const TOP_AUTHORS = 10;
const MAX_PAPERS_PER_PERSON = 3;

/** Societies, funders and regulators that publish little themselves; skipped, as in fetch-openalex.ts. */
const SKIP = new Set(["asco", "esmo", "aacr", "iarc", "cruk", "curie-nki-eortc"]);
const ALLOWED_TYPES = new Set(["education", "healthcare", "facility", "government", "nonprofit", "other"]);

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7);
const PEOPLE = args.includes("--people");

type Json = Record<string, unknown>;

let lastRequest = 0;
async function get(url: string): Promise<Json | null> {
  const full = `${url}${url.includes("?") ? "&" : "?"}mailto=${MAILTO}`;
  const key = join(CACHE_DIR, `${createHash("sha1").update(full).digest("hex")}.json`);
  if (!FORCE && existsSync(key)) return JSON.parse(readFileSync(key, "utf8")) as Json;
  for (let attempt = 0; attempt < 6; attempt++) {
    const wait = lastRequest + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    let r: Response;
    try { r = await fetch(full, { headers: { "User-Agent": `OnCo/1.0 (mailto:${MAILTO})`, Accept: "application/json" } }); }
    catch { await sleep(1500 * 2 ** attempt); continue; }
    if (r.ok) {
      const j = (await r.json()) as Json;
      mkdirSync(CACHE_DIR, { recursive: true });
      writeFileSync(key, JSON.stringify(j));
      return j;
    }
    if (r.status === 429 || r.status >= 500) { await sleep(1500 * 2 ** attempt); continue; }
    return null;
  }
  return null;
}

const short = (id: string) => id.replace(/^https:\/\/openalex\.org\//, "");

type Candidate = { id: string; display_name: string; country_code?: string; type: string; works_count: number; ror?: string | null };
type Resolved = { oid: string; oname: string; ror: string | null; confidence: MatchConfidence };

/** Names to try in order: the main name before any " / ", then each alias. */
function searchNames(inst: Institution): string[] {
  const main = inst.name.split(" / ")[0].replace(/\(.*?\)/g, "").trim();
  const rest = inst.name.split(" / ").slice(1).map((s) => s.replace(/\(.*?\)/g, "").trim());
  return [...new Set([main, ...(inst.aka ?? []), ...rest].filter((s) => s && /[a-z]/i.test(s)))];
}

async function resolve(inst: Institution, previous: Record<string, { openalexId: string; openalexName: string }>): Promise<Resolved | { reason: string }> {
  const prev = previous[inst.id];
  if (prev) {
    const j = await get(`${API}/institutions/${prev.openalexId}?select=id,display_name,ror`);
    if (j && typeof j.display_name === "string") return { oid: prev.openalexId, oname: j.display_name, ror: (j.ror as string | null) ?? null, confidence: "override" };
  }
  const ror = (inst as unknown as { ror?: string }).ror;
  if (ror) {
    const j = await get(`${API}/institutions?filter=ror:${encodeURIComponent(ror)}&select=id,display_name,ror&per_page=1`);
    const hit = ((j?.results as Candidate[] | undefined) ?? [])[0];
    if (hit) return { oid: short(hit.id), oname: hit.display_name, ror: hit.ror ?? null, confidence: "ror" };
  }
  let bestReason = "no search result";
  for (const q of searchNames(inst)) {
    const j = await get(`${API}/institutions?search=${encodeURIComponent(q)}&filter=country_code:${inst.country}&per_page=5&select=id,display_name,country_code,type,works_count,ror`);
    const results = ((j?.results as Candidate[] | undefined) ?? []).filter((r) => ALLOWED_TYPES.has(r.type) && r.works_count >= 200);
    if (!results.length) continue;
    const scored = results.map((r) => ({ r, sim: nameSimilarity(q, r.display_name) })).sort((a, b) => b.sim - a.sim || b.r.works_count - a.r.works_count);
    const top = scored[0], second = scored[1];
    if (top.sim >= 0.6) return { oid: short(top.r.id), oname: top.r.display_name, ror: top.r.ror ?? null, confidence: "high" };
    if (top.sim >= 0.34 && (!second || top.r.works_count >= 3 * second.r.works_count || top.sim >= second.sim + 0.25)) return { oid: short(top.r.id), oname: top.r.display_name, ror: top.r.ror ?? null, confidence: "medium" };
    bestReason = `ambiguous: "${q}" best "${top.r.display_name}" (${top.sim.toFixed(2)})${second ? ` vs "${second.r.display_name}" (${second.sim.toFixed(2)})` : ""}`;
  }
  return { reason: bestReason };
}

type Group = { key: string; key_display_name: string; count: number };
const groups = (j: Json | null) => ((j?.group_by as Group[] | undefined) ?? []);
const metaCount = (j: Json | null) => ((j?.meta as { count?: number } | undefined)?.count ?? 0);

type RawWork = {
  id: string; doi: string | null; title: string | null; publication_year: number; cited_by_count: number; type: string;
  open_access?: { is_oa?: boolean; oa_url?: string | null };
  primary_location?: { source?: { display_name?: string } | null } | null;
};

async function pull(inst: Institution, r: Resolved, years: [number, number]): Promise<InstitutionResearch | null> {
  const base = `authorships.institutions.lineage:${r.oid},primary_topic.subfield.id:${ONCOLOGY_SUBFIELD},publication_year:${years[0]}-${years[1]}`;
  const works = `${API}/works?filter=${base}`;
  // Sequential on purpose: the rate limiter in get() spaces requests about 200 ms apart.
  const byYearJ = await get(`${works}&group_by=publication_year`);
  const byTypeJ = await get(`${works}&group_by=type`);
  const oaJ = await get(`${works}&group_by=open_access.is_oa`);
  const authorsJ = await get(`${works}&group_by=authorships.author.id`);
  const trialsJ = await get(`${works},concepts.id:${CLINICAL_TRIAL_CONCEPT}&per_page=1&select=id`);
  const topJ = await get(`${works}&sort=cited_by_count:desc&per_page=${TOP_WORKS}&cited_by_count_sum=true&select=id,doi,title,publication_year,cited_by_count,type,open_access,primary_location`);
  if (!byYearJ || !topJ) return null;
  const byYear: Record<string, number> = {};
  for (let y = years[0]; y <= years[1]; y++) byYear[String(y)] = 0;
  for (const g of groups(byYearJ)) if (g.key in byYear) byYear[g.key] = g.count;
  const meta = (topJ.meta as { count?: number; cited_by_count_sum?: number } | undefined) ?? {};
  const total = meta.count ?? Object.values(byYear).reduce((a, b) => a + b, 0);
  const reviews = groups(byTypeJ).find((g) => g.key_display_name === "review")?.count ?? 0;
  const openAccess = groups(oaJ).find((g) => g.key_display_name === "true")?.count ?? 0;
  const topWorks: ResearchWork[] = ((topJ.results as RawWork[] | undefined) ?? []).filter((w) => w.title).map((w) => ({
    id: short(w.id),
    title: w.title!.replace(/\s+/g, " ").trim(),
    doi: w.doi ? `https://doi.org/${bareDoi(w.doi)}` : null,
    year: w.publication_year,
    journal: w.primary_location?.source?.display_name ?? null,
    cited: w.cited_by_count,
    type: w.type,
    oaUrl: w.open_access?.is_oa && w.open_access.oa_url ? w.open_access.oa_url : null,
  }));
  const topAuthors: ResearchAuthor[] = groups(authorsJ).slice(0, TOP_AUTHORS).map((g) => ({ id: short(g.key), name: g.key_display_name, works: g.count }));
  return {
    institutionId: inst.id, openalexId: r.oid, openalexName: r.oname, ror: r.ror, confidence: r.confidence, fetched: today(), years,
    works: total, cited: meta.cited_by_count_sum ?? 0, byYear, openAccess, clinicalTrials: trialsJ ? metaCount(trialsJ) : 0, reviews, topWorks, topAuthors,
  };
}

/** HEAD against doi.org; a DOI "resolves" when the registry answers with a redirect or a page. */
async function doiResolves(doi: string): Promise<boolean> {
  try {
    const r = await fetch(`https://doi.org/${bareDoi(doi)}`, { method: "HEAD", redirect: "manual", headers: { "User-Agent": `OnCo/1.0 (mailto:${MAILTO})` } });
    return r.status >= 200 && r.status < 400;
  } catch { return false; }
}

type Addition = { personId: string; file: string; paper: { title: string; journal?: string; year: number; doi: string; url: string } };

/** For matched top authors with fewer than 3 papers, fetch their most-cited oncology works at this institution. */
async function peopleAdditions(res: InstitutionResearch, people: Person[], fileOf: Map<string, string>, planned: Map<string, number>): Promise<Addition[]> {
  const out: Addition[] = [];
  for (const a of res.topAuthors) {
    const person = matchAuthorToPerson({ name: a.name }, res.institutionId, people);
    if (!person) continue;
    const have = person.papers.length + (planned.get(person.id) ?? 0);
    if (have >= MAX_PAPERS_PER_PERSON) continue;
    const file = fileOf.get(person.id);
    if (!file) continue;
    const j = await get(`${API}/works?filter=authorships.author.id:${a.id},authorships.institutions.lineage:${res.openalexId},primary_topic.subfield.id:${ONCOLOGY_SUBFIELD},publication_year:${res.years[0]}-${res.years[1]},type:article&sort=cited_by_count:desc&per_page=6&select=id,doi,title,publication_year,cited_by_count,type,primary_location`);
    const known = new Set(person.papers.map((p) => (p.doi ? bareDoi(p.doi).toLowerCase() : p.title.toLowerCase())));
    let room = MAX_PAPERS_PER_PERSON - have;
    for (const w of (j?.results as RawWork[] | undefined) ?? []) {
      if (room <= 0) break;
      if (!w.doi || !w.title) continue;
      const doi = bareDoi(w.doi);
      if (known.has(doi.toLowerCase()) || known.has(w.title.toLowerCase())) continue;
      // House style forbids em and en dashes in rendered text; keep titles that need none.
      const title = w.title.replace(/\s+/g, " ").trim();
      if (/[–—]/.test(title) || title.length > 220) continue;
      if (!(await doiResolves(doi))) continue;
      out.push({ personId: person.id, file, paper: { title, journal: w.primary_location?.source?.display_name ?? undefined, year: w.publication_year, doi, url: `https://doi.org/${doi}` } });
      known.add(doi.toLowerCase());
      room--;
      planned.set(person.id, (planned.get(person.id) ?? 0) + 1);
    }
  }
  return out;
}

/** Where each person id is declared, so paper additions land in the right source file. */
function personFiles(): Map<string, string> {
  const dir = join(process.cwd(), "src", "data", "people");
  const map = new Map<string, string>();
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))) {
    const src = readFileSync(join(dir, f), "utf8");
    for (const m of src.matchAll(/\bid: "([a-z0-9-]+)"/g)) map.set(m[1], join(dir, f));
  }
  return map;
}

const lit = (s: string) => JSON.stringify(s);

/** Insert paper literals into the `papers: [...]` array of the named person in its source file. */
function applyAdditions(additions: Addition[]): number {
  const byFile = new Map<string, Addition[]>();
  for (const a of additions) byFile.set(a.file, [...(byFile.get(a.file) ?? []), a]);
  let applied = 0;
  for (const [file, list] of byFile) {
    let src = readFileSync(file, "utf8");
    for (const a of list) {
      const idAt = src.indexOf(`id: ${lit(a.personId)}`);
      if (idAt < 0) continue;
      const nextRecord = src.indexOf("\n  p({", idAt + 1);
      const end = nextRecord < 0 ? src.length : nextRecord;
      const papersAt = src.indexOf("papers: [", idAt);
      if (papersAt < 0 || papersAt > end) continue;
      const open = papersAt + "papers: [".length;
      const close = matchBracket(src, open - 1);
      if (close < 0) continue;
      const inner = src.slice(open, close);
      const item = `{ title: ${lit(a.paper.title)}${a.paper.journal ? `, journal: ${lit(a.paper.journal)}` : ""}, year: ${a.paper.year}, doi: ${lit(a.paper.doi)}, url: ${lit(a.paper.url)} }`;
      const newInner = inner.trim() ? `${inner.replace(/\s*$/, "")}, ${item}` : item;
      src = src.slice(0, open) + newInner + src.slice(close);
      applied++;
    }
    writeFileSync(file, src);
  }
  return applied;
}

function matchBracket(src: string, openAt: number): number {
  let depth = 0, inStr: string | null = null;
  for (let i = openAt; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (c === "\\") i++; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) return i; }
  }
  return -1;
}

async function main() {
  const g = graph();
  const years = researchWindow();
  const dir = publicPath("openalex", "research");
  mkdirSync(dir, { recursive: true });
  const prevFile = publicPath("openalex", "institutions.json");
  const previous: Record<string, { openalexId: string; openalexName: string }> = existsSync(prevFile) ? JSON.parse(readFileSync(prevFile, "utf8")).institutions : {};
  const people = g.kind("person") as Person[];
  const fileOf = PEOPLE ? personFiles() : new Map<string, string>();
  const planned = new Map<string, number>();
  const additions: Addition[] = [];
  const index: ResearchIndex = { fetched: today(), source: "https://openalex.org", license: "CC0", subfield: ONCOLOGY_SUBFIELD, years, institutions: {}, unresolved: {} };
  const seenOpenalex = new Map<string, string>();
  let written = 0;
  const list = (g.kind("institution") as Institution[]).filter((i) => !SKIP.has(i.id) && (!ONLY || i.id === ONLY));
  for (const inst of list) {
    const r = await resolve(inst, previous);
    if ("reason" in r) { index.unresolved[inst.id] = r.reason; console.log(`${inst.id.padEnd(30)} unresolved: ${r.reason}`); continue; }
    const res = await pull(inst, r, years);
    if (!res) { index.unresolved[inst.id] = "works query failed"; console.log(`${inst.id.padEnd(30)} works query failed`); continue; }
    writeJson(join(dir, `${inst.id}.json`), res);
    written++;
    const row: ResearchIndexRow = { openalexId: res.openalexId, openalexName: res.openalexName, confidence: res.confidence, works: res.works, cited: res.cited, byYear: res.byYear, openAccess: res.openAccess, clinicalTrials: res.clinicalTrials, reviews: res.reviews };
    index.institutions[inst.id] = row;
    const dupe = seenOpenalex.get(res.openalexId);
    if (dupe) console.log(`  note: ${inst.id} shares OpenAlex id ${res.openalexId} with ${dupe}`);
    seenOpenalex.set(res.openalexId, inst.id);
    console.log(`${inst.id.padEnd(30)} ${res.openalexId.padEnd(12)} ${res.openalexName.slice(0, 38).padEnd(38)} works=${String(res.works).padStart(6)} cited=${String(res.cited).padStart(8)} [${res.confidence}]`);
    if (PEOPLE && res.works > 0) additions.push(...(await peopleAdditions(res, people, fileOf, planned)));
  }
  // Drop files for institutions no longer in the corpus or no longer resolved (keeps the folder honest).
  if (!ONLY) for (const f of readdirSync(dir)) { const id = f.replace(/\.json$/, ""); if (!index.institutions[id]) unlinkSync(join(dir, f)); }
  writeJson(publicPath("openalex", "research-index.json"), index);
  const sizes = readdirSync(dir).map((f) => readFileSync(join(dir, f)).length);
  const avg = sizes.length ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024) : 0;
  console.log(`research: ${Object.keys(index.institutions).length} institutions resolved, ${written} files written (about ${avg} KB each), ${Object.keys(index.unresolved).length} unresolved`);
  if (PEOPLE) {
    const applied = applyAdditions(additions);
    const peopleGaining = new Set(additions.map((a) => a.personId)).size;
    writeJson(join(CACHE_DIR, "people-additions.json"), additions);
    console.log(`people: ${applied} papers added to ${peopleGaining} people (list in ${CACHE_DIR}/people-additions.json)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
