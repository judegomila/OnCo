/**
 * Fill `wikipedia` and the Wikidata QID for company records that lack them, from the Wikidata API. Adapted from
 * scripts/enrich-institution-ids.ts; the QID goes into src/data/wikidata-ids.ts (the map that JSON-LD and the RDF
 * exports read), the English Wikipedia sitelink onto the record.
 *
 * Per company: one wbsearchentities request for the record name (a second for its first alias, then for the name
 * without a trailing ", ..." or " (...)" part, when the name finds nothing), 300 ms apart, at most BUDGET requests in
 * total. Candidates are fetched in batches of 50 with wbgetentities (claims, sitelinks, labels, aliases,
 * descriptions); the classes behind their P31 values and the countries behind their P17 values are fetched once each.
 *
 * A candidate is accepted only when all of these hold:
 *   - its P31 chain (following P279 up to four steps) reaches business, pharmaceutical company, biotechnology
 *     company, medical device company, enterprise or public company;
 *   - either the host of its official website (P856) equals the host of the record's `website`, or one of its labels
 *     or aliases equals the record's name or one of its `aka` (case, punctuation, diacritics and a trailing legal
 *     suffix such as Inc., Ltd. or GmbH ignored);
 *   - when the match is by name alone, the ISO 3166-1 alpha-2 code (P297) of its country (P17), if Wikidata knows one,
 *     equals the record's `country` (Hong Kong and Taiwan records also accept China);
 *   - when the match is by an `aka` alone (records often list acquired subsidiaries there), the candidate's own
 *     website must not contradict the record's, and its parent organisation (P749) or owner (P127) must not carry the
 *     record's name, so a subsidiary is never written in place of its parent.
 * Records with `acquiredBy` are matched on their own name and website like any other, never on the acquirer.
 * When several distinct candidates pass, or one candidate passes for two records, the companies are left alone as
 * ambiguous. Only candidates with an English Wikipedia sitelink are written, since that is what the record stores.
 *
 * Companies that already carry `wikipedia` but no QID get the QID of the item owning that exact article (one
 * wbgetentities request with sites=enwiki for all of them), the same rule scripts/fetch-wikidata.ts applies.
 *
 * The link is inserted into the source file right after the record's `id` field; QIDs are merged into the sorted map
 * in src/data/wikidata-ids.ts. Decisions are written to --out (default /tmp/enrich-company-ids.json); companies
 * already decided in the --skip logs (default the same file, when present) are not tried again, so a later run
 * continues where the budget ran out. Usage:
 *   npx tsx scripts/enrich-company-ids.ts [--dry-run] [--budget=700] [--skip=a.json,b.json] [--out=/tmp/enrich-company-ids.json]
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { graph } from "../src/lib/graph";
import type { Company } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const BUDGET = num("budget", 700);
const OUT = str("out", "/tmp/enrich-company-ids.json");
/** Earlier decision logs; companies already decided there (other than for lack of budget) are not tried again. */
const SKIP_LOGS = str("skip", OUT).split(",").filter((f) => f && existsSync(f));
const PACE_MS = 300;
const UA = "OnCo corpus enrichment (https://onco.world; contact via site)";
const API = "https://www.wikidata.org/w/api.php";
const IDS_FILE = "src/data/wikidata-ids.ts";

/** Every corpus source file; a record's `id: "...",` text must be unique across them to be edited. */
function sourceFiles(dir = join(ROOT, "src/data")): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== "i18n") out.push(...sourceFiles(p)); continue; }
    // sponsor-aliases.ts is a lookup table whose entries repeat company ids; it holds no records.
    if (name.endsWith(".ts") && !name.endsWith(".test.ts") && relative(ROOT, p) !== IDS_FILE && name !== "sponsor-aliases.ts") out.push(relative(ROOT, p));
  }
  return out;
}
const FILES = sourceFiles();

/** Root classes an accepted candidate's P31 chain must reach. Labels are checked at start-up so a wrong id aborts the run. */
const ROOTS: Record<string, RegExp> = {
  Q4830453: /^business$/i,
  Q19644607: /^pharmaceutical company$/i,
  Q90298876: /^biotechnology company$/i,
  Q63383584: /^medical device company$/i,
  Q6881511: /^enterprise$/i,
  Q891723: /^public company$/i,
};
const MAX_DEPTH = 4;
/** Hosts that are directories rather than the company's own site; such a `website` neither confirms nor contradicts a candidate. */
const DIRECTORY_HOSTS = new Set(["ycombinator.com", "biospace.com", "linkedin.com", "crunchbase.com", "pitchbook.com", "clinicaltrials.gov", "sec.gov", "bloomberg.com"]);

type Claim = { mainsnak?: { datavalue?: { value?: unknown } } };
type Entity = {
  id: string; missing?: string;
  labels?: Record<string, { value: string }>;
  aliases?: Record<string, { value: string }[]>;
  descriptions?: Record<string, { value: string }>;
  claims?: Record<string, Claim[]>;
  sitelinks?: { enwiki?: { title: string } };
};

let requests = 0;
let lastAt = 0;
async function call<T>(params: Record<string, string>): Promise<T> {
  if (requests >= BUDGET) throw new Error("budget");
  const wait = lastAt + PACE_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  requests++;
  lastAt = Date.now();
  const p = new URLSearchParams({ ...params, format: "json" });
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch(`${API}?${p}`, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) throw new Error(`HTTP ${r.status}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = (await r.json()) as T & { error?: { info?: string } };
      if (j.error) throw new Error(j.error.info ?? "Wikidata error");
      return j;
    } catch (e) {
      if (attempt >= 2) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

const entities = new Map<string, Entity>();
async function getEntities(ids: string[], props: string): Promise<void> {
  const want = [...new Set(ids)].filter((id) => !entities.has(id));
  for (let i = 0; i < want.length; i += 50) {
    const batch = want.slice(i, i + 50);
    const j = await call<{ entities?: Record<string, Entity> }>({ action: "wbgetentities", ids: batch.join("|"), props });
    for (const id of batch) entities.set(id, j.entities?.[id] ?? { id, missing: "" });
  }
}

const itemIds = (e: Entity | undefined, prop: string): string[] =>
  (e?.claims?.[prop] ?? []).map((c) => (c.mainsnak?.datavalue?.value as { id?: string } | undefined)?.id).filter((x): x is string => !!x);
const strings = (e: Entity | undefined, prop: string): string[] =>
  (e?.claims?.[prop] ?? []).map((c) => c.mainsnak?.datavalue?.value).filter((x): x is string => typeof x === "string");

/** Does this class reach an accepted root? Fetches P279 chains on demand. */
const classOk = new Map<string, boolean>();
async function acceptedClass(q: string, depth = 0): Promise<boolean> {
  if (q in ROOTS) return true;
  const known = classOk.get(q);
  if (known !== undefined) return known;
  await getEntities([q], "claims|labels");
  const e = entities.get(q);
  let ok = false;
  if (depth < MAX_DEPTH) {
    const parents = itemIds(e, "P279");
    await getEntities(parents.filter((p) => !(p in ROOTS) && !classOk.has(p)), "claims|labels");
    for (const p of parents) if (await acceptedClass(p, depth + 1)) { ok = true; break; }
  }
  classOk.set(q, ok);
  return ok;
}

/** ISO alpha-2 code of a country item, from P297. */
const iso = new Map<string, string | null>();
async function isoOf(q: string): Promise<string | null> {
  if (!iso.has(q)) { await getEntities([q], "claims|labels"); iso.set(q, strings(entities.get(q), "P297")[0] ?? null); }
  return iso.get(q) ?? null;
}

const SUFFIX = /\s+(inc|incorporated|corp|corporation|co|company|ltd|limited|llc|plc|ag|se|sa|nv|bv|gmbh|kk|kabushiki kaisha|holdings?|group|pharmaceuticals?|therapeutics|biosciences?)$/;
const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
/** Name without one trailing legal or generic suffix, when something distinctive remains. */
const stem = (s: string) => { const n = norm(s); const m = n.replace(SUFFIX, "").trim(); return m.length >= 4 ? m : n; };
const simple = (n: string) => n.replace(/\s*\(.*\)$/, "").replace(/,.*$/, "").trim();
const host = (u: string | undefined): string | null => { if (!u) return null; try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ""); } catch { return null; } };
const ownHost = (c: Company): string | null => { const h = host(c.website); return h && !DIRECTORY_HOSTS.has(h) ? h : null; };
const wikiUrl = (title: string) => `https://en.wikipedia.org/wiki/${encodeURI(title.replace(/ /g, "_")).replace(/[?#&]/g, (c) => encodeURIComponent(c))}`;

type Verdict = {
  q: string; label: string; description?: string; enwiki?: string;
  typeOk: boolean; site: boolean; siteConflict: boolean; name: boolean; aka: boolean; countryOk: boolean | null; parentIsRecord: boolean;
};

async function judge(co: Company, q: string): Promise<Verdict> {
  const e = entities.get(q);
  const label = e?.labels?.en?.value ?? q;
  const description = e?.descriptions?.en?.value;
  const enwiki = e?.sitelinks?.enwiki?.title;
  let typeOk = false;
  for (const c of itemIds(e, "P31")) if (await acceptedClass(c)) { typeOk = true; break; }
  const h = ownHost(co);
  const sites = strings(e, "P856").map(host).filter((x): x is string => !!x);
  const site = !!h && sites.includes(h);
  const siteConflict = !!h && sites.length > 0 && !site;
  const ownNames = new Set([co.name, simple(co.name)].flatMap((n) => [norm(n), stem(n)]));
  const akaNames = new Set(co.aka.flatMap((n) => [norm(n), stem(n)]));
  const theirs = [...Object.values(e?.labels ?? {}).map((l) => l.value), ...Object.values(e?.aliases ?? {}).flat().map((a) => a.value)].flatMap((n) => [norm(n), stem(n)]);
  const name = theirs.some((n) => ownNames.has(n));
  const aka = !name && theirs.some((n) => akaNames.has(n));
  let countryOk: boolean | null = null;
  if (typeOk) {
    const wanted = new Set(co.country === "HK" || co.country === "TW" ? [co.country, "CN"] : [co.country]);
    const codes: string[] = [];
    for (const c of itemIds(e, "P17")) { const code = await isoOf(c); if (code) codes.push(code); }
    if (codes.length) countryOk = codes.some((c) => wanted.has(c));
  }
  let parentIsRecord = false;
  if (typeOk && aka && !site) {
    const parents = [...itemIds(e, "P749"), ...itemIds(e, "P127")];
    await getEntities(parents, "labels|aliases");
    parentIsRecord = parents.some((p) => { const pe = entities.get(p); return [...Object.values(pe?.labels ?? {}).map((l) => l.value), ...Object.values(pe?.aliases ?? {}).flat().map((a) => a.value)].some((n) => ownNames.has(norm(n)) || ownNames.has(stem(n))); });
  }
  return { q, label, description, enwiki, typeOk, site, siteConflict, name, aka, countryOk, parentIsRecord };
}

/** The acceptance rule described at the top of the file. */
const passes = (c: Verdict): boolean => {
  if (!c.typeOk) return false;
  if (c.site) return true;
  if (c.countryOk === false) return false;
  if (c.name) return true;
  return c.aka && !c.siteConflict && !c.parentIsRecord;
};

type Status = "added" | "ambiguous" | "no-match" | "no-enwiki" | "budget" | "file";
type Decision = { id: string; name: string; country: string; status: Status; wikipedia?: string; wikidata?: string; candidates: Verdict[]; note?: string };

async function search(text: string): Promise<string[]> {
  const j = await call<{ search?: { id: string }[] }>({ action: "wbsearchentities", search: text.slice(0, 250), language: "en", type: "item", limit: "7" });
  return (j.search ?? []).map((s) => s.id);
}

const texts = new Map<string, string>();
const fileText = (f: string) => { if (!texts.has(f)) texts.set(f, readFileSync(join(ROOT, f), "utf8")); return texts.get(f)!; };
function insertField(id: string, field: string, value: string): boolean {
  const re = new RegExp(`\\bid: "${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",`, "g");
  const hits: { file: string; n: number }[] = [];
  for (const f of FILES) { const n = (fileText(f).match(re) ?? []).length; if (n) hits.push({ file: f, n }); }
  if (hits.length !== 1 || hits[0].n !== 1) { console.warn(`  ! ${id}: id text not unique (${hits.map((h) => `${h.file}:${h.n}`).join(", ") || "none"})`); return false; }
  const f = hits[0].file;
  texts.set(f, fileText(f).replace(re, `$& ${field}: "${value}",`));
  if (!DRY) writeFileSync(join(ROOT, f), texts.get(f)!);
  return true;
}

/** Merge QIDs into the sorted map in src/data/wikidata-ids.ts, keeping its header and the one-line-per-id layout. */
function writeIds(add: Record<string, string>): void {
  const path = join(ROOT, IDS_FILE);
  const src = readFileSync(path, "utf8");
  const open = src.indexOf("= {\n") + 4;
  const close = src.indexOf("\n};", open);
  const map: Record<string, string> = {};
  for (const line of src.slice(open, close).split("\n")) { const m = /^\s*"([^"]+)": "(Q\d+)",\s*$/.exec(line); if (m) map[m[1]] = m[2]; }
  for (const [id, q] of Object.entries(add)) if (!map[id]) map[id] = q;
  const body = Object.keys(map).sort().map((id) => `  "${id}": "${map[id]}",`).join("\n");
  if (!DRY) writeFileSync(path, src.slice(0, open) + body + src.slice(close));
}

/** QIDs of the items that own the given English Wikipedia articles (exact titles), as scripts/fetch-wikidata.ts resolves them. */
async function qidsOfArticles(urls: string[]): Promise<Map<string, string>> {
  const titles = [...new Set(urls.map((u) => { const m = /^https?:\/\/en\.wikipedia\.org\/wiki\/([^#?]+)/.exec(u); return m ? decodeURIComponent(m[1]).replace(/_/g, " ") : null; }).filter((t): t is string => !!t))];
  const out = new Map<string, string>();
  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50).map((t) => t[0].toUpperCase() + t.slice(1));
    const j = await call<{ entities?: Record<string, Entity & { sitelinks?: { enwiki?: { title: string } } }> }>({ action: "wbgetentities", sites: "enwiki", titles: batch.join("|"), props: "info|sitelinks" });
    for (const e of Object.values(j.entities ?? {})) { const t = e.sitelinks?.enwiki?.title; if (e.id?.startsWith("Q") && e.missing === undefined && t) out.set(t, e.id); }
  }
  return out;
}

async function main() {
  await getEntities(Object.keys(ROOTS), "labels");
  for (const [q, re] of Object.entries(ROOTS)) {
    const label = entities.get(q)?.labels?.en?.value ?? "";
    if (!re.test(label)) throw new Error(`root ${q} is "${label}", expected ${re}`);
  }

  const g = graph();
  const all = g.kind("company");
  const ids = (await import("../src/data/wikidata-ids")).wikidataIds;
  const hadLink = all.filter((e) => e.wikipedia);
  const skip = new Set<string>();
  const pending: Decision[] = [];
  for (const f of SKIP_LOGS) for (const d of (JSON.parse(readFileSync(f, "utf8")) as { decisions?: Decision[] }).decisions ?? []) {
    if (d.status === "budget") continue;
    skip.add(d.id);
    // Matches an earlier run accepted but could not write (id text not unique then) are written now, without new requests.
    if (d.status === "file" && d.wikipedia && d.wikidata) pending.push(d);
  }
  // Companies with their own website first (the stronger signal), then by type: makers before investors and the rest.
  const typeRank = (c: Company) => (c.companyType === "investor" ? 2 : c.companyType === "nonprofit" ? 1 : 0);
  const todo = all.filter((e) => !e.wikipedia && !skip.has(e.id)).sort((a, b) => Number(!ownHost(a)) - Number(!ownHost(b)) || typeRank(a) - typeRank(b) || a.id.localeCompare(b.id));
  const counts = { total: all.length, had: hadLink.length, hadQidFilled: 0, skipped: all.length - hadLink.length - todo.length, added: 0, ambiguous: 0, noMatch: 0, noEnwiki: 0, budget: 0, file: 0 };
  const newIds: Record<string, string> = {};

  // Records that already link an article but have no QID: resolve the article's item, exactly as fetch-wikidata.ts does.
  const missingQ = hadLink.filter((e) => !ids[e.id]);
  if (missingQ.length) {
    const byTitle = await qidsOfArticles(missingQ.map((e) => e.wikipedia!));
    for (const e of missingQ) {
      const m = /^https?:\/\/en\.wikipedia\.org\/wiki\/([^#?]+)/.exec(e.wikipedia!);
      const t = m ? decodeURIComponent(m[1]).replace(/_/g, " ") : "";
      const q = byTitle.get(t) ?? byTitle.get(t[0]?.toUpperCase() + t.slice(1));
      if (q) { newIds[e.id] = q; counts.hadQidFilled++; console.log(`  = ${e.id}: ${q} from existing link ${t}`); }
    }
  }

  const decisions: Decision[] = [];
  for (const d of pending) {
    const rec = all.find((e) => e.id === d.id);
    if (!rec || rec.wikipedia) continue;
    if (!insertField(d.id, "wikipedia", d.wikipedia!)) { decisions.push({ ...d, status: "file" }); counts.file++; continue; }
    newIds[d.id] = d.wikidata!;
    decisions.push({ ...d, status: "added", note: "written from an earlier run's decision" });
    counts.added++;
    console.log(`  + ${d.id}: ${d.wikidata} ${d.wikipedia} (from earlier decision)`);
  }
  const seen = new Map<string, Verdict[]>();
  const accepted = new Map<string, { co: Company; hit: Verdict; candidates: Verdict[] }>();

  /** One pass over `list`, searching `text(co)`; companies with no passing candidate are returned for the next pass. */
  async function pass(list: Company[], text: (c: Company) => string | undefined): Promise<Company[]> {
    const left: Company[] = [];
    for (let i = 0; i < list.length; i += 7) {
      const chunk = list.slice(i, i + 7).filter((x) => text(x));
      for (const x of list.slice(i, i + 7)) if (!text(x)) left.push(x);
      if (!chunk.length) continue;
      if (requests + chunk.length + 1 > BUDGET) { left.push(...chunk); continue; }
      const found = new Map<string, string[]>();
      try {
        for (const co of chunk) found.set(co.id, await search(text(co)!));
        const flat = [...found.values()].flat();
        await getEntities(flat, "claims|sitelinks|labels|aliases|descriptions");
        // Prefetch the classes (two P279 levels) and countries behind the chunk's candidates in a few batched requests.
        const level1 = flat.flatMap((q) => [...itemIds(entities.get(q), "P31"), ...itemIds(entities.get(q), "P17")]);
        await getEntities(level1.filter((q) => !(q in ROOTS) && !classOk.has(q) && !iso.has(q)), "claims|labels");
        const level2 = level1.flatMap((q) => itemIds(entities.get(q), "P279"));
        await getEntities(level2.filter((q) => !(q in ROOTS) && !classOk.has(q)), "claims|labels");
        for (const co of chunk) {
          const prior = seen.get(co.id) ?? [];
          const fresh = (found.get(co.id) ?? []).filter((q) => !prior.some((c) => c.q === q));
          const candidates = [...prior];
          for (const q of fresh) candidates.push(await judge(co, q));
          seen.set(co.id, candidates);
          let passing = candidates.filter(passes);
          // Several passing candidates: keep the one matching the website when exactly one does (the stronger signal),
          // then the one in the record's country when exactly one is (a parent and its foreign subsidiary share a website).
          if (passing.length > 1) { const bySite = passing.filter((c) => c.site); passing = bySite.length === 1 ? bySite : passing; }
          if (passing.length > 1) { const byCountry = passing.filter((c) => c.countryOk === true); passing = byCountry.length === 1 ? byCountry : passing; }
          if (passing.length > 1 && new Set(passing.map((c) => c.q)).size === 1) passing = [passing[0]];
          const base = { id: co.id, name: co.name, country: co.country };
          if (passing.length > 1) { decisions.push({ ...base, status: "ambiguous", candidates }); counts.ambiguous++; console.log(`  ? ${co.id}: ambiguous ${passing.map((c) => `${c.q} ${c.label}`).join(" | ")}`); continue; }
          if (!passing.length) { left.push(co); continue; }
          const [hit] = passing;
          if (!hit.enwiki) { decisions.push({ ...base, status: "no-enwiki", wikidata: hit.q, candidates }); counts.noEnwiki++; console.log(`  - ${co.id}: ${hit.q} ${hit.label} has no English article`); continue; }
          accepted.set(co.id, { co, hit, candidates });
        }
      } catch (e) {
        if (e instanceof Error && e.message === "budget") { left.push(...chunk.filter((c) => !seen.has(c.id) || !accepted.has(c.id))); continue; }
        throw e;
      }
    }
    return left;
  }

  // Pass 1: the record name. Pass 2: its first distinct alias. Pass 3: the name without a trailing ", ..." or " (...)" part,
  // since wbsearchentities matches label prefixes and "Merck & Co. (MSD)" finds less than "Merck & Co.".
  let left = await pass(todo, (x) => x.name);
  const tried = new Set(todo.filter((x) => seen.has(x.id)).map((x) => x.id));
  left = left.filter((x) => tried.has(x.id) && !accepted.has(x.id) && !decisions.some((d) => d.id === x.id));
  left = await pass(left, (x) => x.aka.find((a) => norm(a) !== norm(x.name)));
  left = left.filter((x) => tried.has(x.id) && !accepted.has(x.id) && !decisions.some((d) => d.id === x.id));
  await pass(left, (x) => (simple(x.name) !== x.name ? simple(x.name) : undefined));

  // One item accepted for two records cannot be right for both; leave both alone.
  const byQ = new Map<string, string[]>();
  for (const [id, a] of accepted) byQ.set(a.hit.q, [...(byQ.get(a.hit.q) ?? []), id]);
  for (const [q, owners] of byQ) {
    if (owners.length < 2) continue;
    console.log(`  ? ${q} accepted for ${owners.join(", ")}: left as ambiguous`);
    for (const id of owners) { const a = accepted.get(id)!; accepted.delete(id); decisions.push({ id, name: a.co.name, country: a.co.country, status: "ambiguous", candidates: a.candidates, note: `same item as ${owners.filter((o) => o !== id).join(", ")}` }); counts.ambiguous++; }
  }
  for (const [id, { co, hit, candidates }] of accepted) {
    const base = { id, name: co.name, country: co.country };
    const url = wikiUrl(hit.enwiki!);
    if (!insertField(id, "wikipedia", url)) { decisions.push({ ...base, status: "file", wikipedia: url, wikidata: hit.q, candidates }); counts.file++; continue; }
    newIds[id] = hit.q;
    decisions.push({ ...base, status: "added", wikipedia: url, wikidata: hit.q, candidates });
    counts.added++;
    console.log(`  + ${id}: ${hit.q} ${hit.enwiki}${hit.site ? " (website)" : ""}${hit.name ? " (name)" : ""}${hit.aka ? " (aka)" : ""}`);
  }
  for (const co of todo) {
    if (decisions.some((d) => d.id === co.id)) continue;
    const base = { id: co.id, name: co.name, country: co.country };
    if (tried.has(co.id)) { decisions.push({ ...base, status: "no-match", candidates: seen.get(co.id) ?? [] }); counts.noMatch++; }
    else { decisions.push({ ...base, status: "budget", candidates: [] }); counts.budget++; }
  }
  if (Object.keys(newIds).length) writeIds(newIds);

  writeFileSync(OUT, JSON.stringify({ counts, requests, decisions }, null, 2));
  console.log(`companies: ${counts.total} total, ${counts.had} already had (${counts.hadQidFilled} of them given a QID from the existing link), ${counts.skipped} decided earlier, ${counts.added} added, ${counts.ambiguous} ambiguous, ${counts.noMatch} no match, ${counts.noEnwiki} matched without an English article, ${counts.budget} untried (budget), ${counts.file} not written (file); ${requests} requests${DRY ? " (dry run)" : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
