/**
 * Fill `wikipedia` for institution records that lack it, from the Wikidata API, so that scripts/fetch-wikidata.ts can
 * then resolve their QIDs into src/data/wikidata-ids.ts (the Wikidata id is never stored on the record itself; the
 * generated map is what JSON-LD and the RDF exports read).
 *
 * Per institution: one wbsearchentities request for the record name (a second for its first alias when the name
 * finds nothing), 300 ms apart, at most BUDGET requests in total. Candidates are fetched in batches of 50 with
 * wbgetentities (claims, sitelinks, labels, aliases, descriptions); the classes behind their P31 values and the
 * countries behind their P17 values are fetched once each and cached.
 *
 * A candidate is accepted only when all of these hold:
 *   - its P31 chain (following P279 up to four steps) reaches hospital, university hospital, cancer centre, research
 *     institute, university or medical school;
 *   - the ISO 3166-1 alpha-2 code (P297) of its country (P17) equals the record's `country` (Hong Kong records also
 *     accept China);
 *   - either the host of its official website (P856) equals the host of the record's `website`, or one of its
 *     labels equals the record's name or one of its `aka` (case, punctuation and diacritics ignored).
 * When several candidates pass and they do not agree, the institution is left alone as ambiguous. Only candidates
 * with an English Wikipedia sitelink are written, since that is what the record stores.
 *
 * The value is inserted into the source file right after the record's `id` field. Decisions are written to --out
 * (default /tmp/enrich-institution-ids.json); institutions already decided in the --skip logs (default the same file,
 * when present) are not tried again, so a later run continues where the budget ran out. Afterwards add the accepted
 * QIDs to src/data/wikidata-ids.ts (or run scripts/fetch-wikidata.ts, which resolves the same ids from the new links).
 * Usage:
 *   npx tsx scripts/enrich-institution-ids.ts [--dry-run] [--budget=600] [--skip=a.json,b.json] [--out=/tmp/enrich-institution-ids.json]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Institution } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const BUDGET = num("budget", 600);
const OUT = str("out", "/tmp/enrich-institution-ids.json");
/** Earlier decision logs; institutions already decided there (other than for lack of budget) are not tried again. */
const SKIP_LOGS = str("skip", OUT).split(",").filter((f) => f && existsSync(f));
const PACE_MS = 300;
const UA = "OnCo corpus enrichment (https://onco.world; contact via site)";
const API = "https://www.wikidata.org/w/api.php";

/** Source files that hold institution records; a record's `id` line must be unique across them to be edited. */
const FILES = [
  "src/data/institutions.ts",
  "src/data/institutions/us.ts",
  "src/data/institutions/europe.ts",
  "src/data/institutions/world.ts",
  "src/data/institutions/india.ts",
  "src/data/institutions/centres-wave3.ts",
  "src/data/institutions/bodies.ts",
  "src/data/institutions/donor-foundations.ts",
  "src/data/institutions-wave-investigators.ts",
  "src/data/institution-networks-wave.ts",
  "src/data/china.ts",
  "src/data/groups.ts",
  "src/data/paediatric-fronts.ts",
  "src/data/foundation-models.ts",
];

/** Root classes an accepted candidate's P31 chain must reach. Labels are checked at start-up so a wrong id aborts the run. */
const ROOTS: Record<string, RegExp> = {
  Q16917: /hospital/i,
  Q1059324: /university hospital/i,
  Q3918: /university/i,
  Q31855: /research institute/i,
  Q494230: /medical school/i,
};
/** Classes whose own English label makes them acceptable even when the chain is incomplete (cancer centres are modelled several ways). */
const CLASS_LABEL_OK = /\b(cancer|oncolog\w*)\b.*\b(cent(er|re)|hospital|institute)\b|\b(cent(er|re)|hospital|institute)\b.*\b(cancer|oncolog\w*)\b/i;
const MAX_DEPTH = 4;

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

/** Does this class reach an accepted root (or is itself an acceptable cancer-centre class)? Fetches P279 chains on demand. */
const classOk = new Map<string, boolean>();
async function acceptedClass(q: string, depth = 0): Promise<boolean> {
  if (q in ROOTS) return true;
  const known = classOk.get(q);
  if (known !== undefined) return known;
  await getEntities([q], "claims|labels");
  const e = entities.get(q);
  const label = e?.labels?.en?.value ?? "";
  let ok = CLASS_LABEL_OK.test(label);
  if (!ok && depth < MAX_DEPTH) {
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

const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const host = (u: string | undefined): string | null => { if (!u) return null; try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ""); } catch { return null; } };
const wikiUrl = (title: string) => `https://en.wikipedia.org/wiki/${encodeURI(title.replace(/ /g, "_")).replace(/[?#&]/g, (c) => encodeURIComponent(c))}`;

type Verdict = { q: string; label: string; description?: string; enwiki?: string; typeOk: boolean; countryOk: boolean; site: boolean; name: boolean };

async function judge(inst: Institution, q: string): Promise<Verdict> {
  const e = entities.get(q);
  const label = e?.labels?.en?.value ?? q;
  const description = e?.descriptions?.en?.value;
  const enwiki = e?.sitelinks?.enwiki?.title;
  let typeOk = false;
  for (const c of itemIds(e, "P31")) if (await acceptedClass(c)) { typeOk = true; break; }
  let countryOk = false;
  if (typeOk) {
    const wanted = new Set(inst.country === "HK" ? ["HK", "CN"] : [inst.country]);
    for (const c of itemIds(e, "P17")) { const code = await isoOf(c); if (code && wanted.has(code)) { countryOk = true; break; } }
  }
  const h = host(inst.website);
  const site = !!h && strings(e, "P856").some((u) => host(u) === h);
  const names = new Set([inst.name, ...inst.aka].map(norm));
  const labels = [...Object.values(e?.labels ?? {}).map((l) => l.value)];
  const name = labels.some((l) => names.has(norm(l)));
  return { q, label, description, enwiki, typeOk, countryOk, site, name };
}

type Decision = { id: string; name: string; country: string; status: "added" | "ambiguous" | "no-match" | "no-enwiki" | "budget" | "file"; wikipedia?: string; wikidata?: string; candidates: Verdict[]; note?: string };

async function search(text: string): Promise<string[]> {
  const j = await call<{ search?: { id: string }[] }>({ action: "wbsearchentities", search: text.slice(0, 250), language: "en", type: "item", limit: "7" });
  return (j.search ?? []).map((s) => s.id);
}

function insertField(id: string, field: string, value: string): boolean {
  const re = new RegExp(`(^[ \\t]*(?:\\w+\\(\\{ |\\{ )?id: "${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",)`, "gm");
  const hits: { file: string; n: number }[] = [];
  for (const f of FILES) { const n = (readFileSync(join(ROOT, f), "utf8").match(re) ?? []).length; if (n) hits.push({ file: f, n }); }
  if (hits.length !== 1 || hits[0].n !== 1) { console.warn(`  ! ${id}: id line not unique (${hits.map((h) => `${h.file}:${h.n}`).join(", ") || "none"})`); return false; }
  const path = join(ROOT, hits[0].file);
  if (!DRY) writeFileSync(path, readFileSync(path, "utf8").replace(re, `$1 ${field}: "${value}",`));
  return true;
}

async function main() {
  await getEntities(Object.keys(ROOTS), "labels");
  for (const [q, re] of Object.entries(ROOTS)) {
    const label = entities.get(q)?.labels?.en?.value ?? "";
    if (!re.test(label)) throw new Error(`root ${q} is "${label}", expected ${re}`);
  }

  const g = graph();
  const all = g.kind("institution");
  const had = all.filter((e) => e.wikipedia).length;
  const order: Institution["institutionType"][] = ["cancer-center", "hospital", "university", "research-institute", "government", "consortium"];
  const skip = new Set<string>();
  for (const f of SKIP_LOGS) for (const d of (JSON.parse(readFileSync(f, "utf8")) as { decisions?: Decision[] }).decisions ?? []) if (d.status !== "budget") skip.add(d.id);
  const todo = all.filter((e) => !e.wikipedia && !skip.has(e.id)).sort((a, b) => order.indexOf(a.institutionType) - order.indexOf(b.institutionType) || a.id.localeCompare(b.id));
  const decisions: Decision[] = [];
  const counts = { total: all.length, had, skipped: all.length - had - todo.length, added: 0, ambiguous: 0, noMatch: 0, noEnwiki: 0, budget: 0, file: 0 };
  const seen = new Map<string, Verdict[]>();
  const passingOf = (cs: Verdict[]) => cs.filter((c) => c.typeOk && c.countryOk && (c.site || c.name));

  /** One pass over `list`, searching `text(inst)`; institutions with no passing candidate are returned for the next pass. */
  async function pass(list: Institution[], text: (i: Institution) => string | undefined): Promise<Institution[]> {
    const left: Institution[] = [];
    for (let i = 0; i < list.length; i += 7) {
      const chunk = list.slice(i, i + 7).filter((x) => text(x));
      for (const x of list.slice(i, i + 7)) if (!text(x)) left.push(x);
      if (!chunk.length) continue;
      if (requests + chunk.length + 1 > BUDGET) { left.push(...chunk); continue; }
      const ids = new Map<string, string[]>();
      for (const inst of chunk) ids.set(inst.id, await search(text(inst)!));
      try {
        const found = [...ids.values()].flat();
        await getEntities(found, "claims|sitelinks|labels|aliases|descriptions");
        // Prefetch the classes (two P279 levels) and countries behind the chunk's candidates in a few batched requests.
        const level1 = found.flatMap((q) => [...itemIds(entities.get(q), "P31"), ...itemIds(entities.get(q), "P17")]);
        await getEntities(level1.filter((q) => !(q in ROOTS) && !classOk.has(q) && !iso.has(q)), "claims|labels");
        const level2 = level1.flatMap((q) => itemIds(entities.get(q), "P279"));
        await getEntities(level2.filter((q) => !(q in ROOTS) && !classOk.has(q)), "claims|labels");
        for (const inst of chunk) {
          const prior = seen.get(inst.id) ?? [];
          const fresh = (ids.get(inst.id) ?? []).filter((q) => !prior.some((c) => c.q === q));
          const candidates = [...prior];
          for (const q of fresh) candidates.push(await judge(inst, q));
          seen.set(inst.id, candidates);
          let passing = passingOf(candidates);
          // Several passing candidates: keep the one matching the website when exactly one does (the stronger signal).
          if (passing.length > 1) { const bySite = passing.filter((c) => c.site); passing = bySite.length === 1 ? bySite : passing; }
          if (passing.length > 1 && new Set(passing.map((c) => c.q)).size === 1) passing = [passing[0]];
          const base = { id: inst.id, name: inst.name, country: inst.country };
          if (passing.length > 1) { decisions.push({ ...base, status: "ambiguous", candidates }); counts.ambiguous++; console.log(`  ? ${inst.id}: ambiguous ${passing.map((c) => `${c.q} ${c.label}`).join(" | ")}`); continue; }
          if (!passing.length) { left.push(inst); continue; }
          const [hit] = passing;
          if (!hit.enwiki) { decisions.push({ ...base, status: "no-enwiki", wikidata: hit.q, candidates }); counts.noEnwiki++; console.log(`  - ${inst.id}: ${hit.q} has no English article`); continue; }
          const url = wikiUrl(hit.enwiki);
          if (!insertField(inst.id, "wikipedia", url)) { decisions.push({ ...base, status: "file", wikipedia: url, wikidata: hit.q, candidates }); counts.file++; continue; }
          decisions.push({ ...base, status: "added", wikipedia: url, wikidata: hit.q, candidates });
          counts.added++;
          console.log(`  + ${inst.id}: ${hit.q} ${hit.enwiki}${hit.site ? " (website)" : ""}${hit.name ? " (name)" : ""}`);
        }
      } catch (e) {
        if (e instanceof Error && e.message === "budget") { left.push(...chunk); continue; }
        throw e;
      }
    }
    return left;
  }

  // Pass 1: the record name. Pass 2: its first distinct alias. Pass 3: the name without a trailing ", ..." or " (...)" part,
  // since wbsearchentities matches label prefixes and "Barts Cancer Institute, Queen Mary University of London" finds nothing.
  let left = await pass(todo, (x) => x.name);
  const tried = new Set(todo.filter((x) => seen.has(x.id)).map((x) => x.id));
  left = await pass(left.filter((x) => tried.has(x.id)), (x) => x.aka.find((a) => norm(a) !== norm(x.name)));
  const simple = (n: string) => n.replace(/\s*\(.*\)$/, "").replace(/,.*$/, "").trim();
  await pass(left.filter((x) => tried.has(x.id)), (x) => (simple(x.name) !== x.name ? simple(x.name) : undefined));
  for (const inst of todo) {
    if (decisions.some((d) => d.id === inst.id)) continue;
    const base = { id: inst.id, name: inst.name, country: inst.country };
    if (tried.has(inst.id)) { decisions.push({ ...base, status: "no-match", candidates: seen.get(inst.id) ?? [] }); counts.noMatch++; }
    else { decisions.push({ ...base, status: "budget", candidates: [] }); counts.budget++; }
  }

  writeFileSync(OUT, JSON.stringify({ counts, requests, decisions }, null, 2));
  console.log(`institutions: ${counts.total} total, ${counts.had} already had, ${counts.skipped} decided earlier, ${counts.added} added, ${counts.ambiguous} ambiguous, ${counts.noMatch} no match, ${counts.noEnwiki} matched without an English article, ${counts.budget} not tried (budget), ${counts.file} not written (file); ${requests} requests${DRY ? " (dry run)" : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
