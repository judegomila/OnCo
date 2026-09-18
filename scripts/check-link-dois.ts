/**
 * DOI sanity check for the corpus. Network (Europe PMC only). A doi.org link that resolves is not proof that it points
 * at the paper the label claims: two links in the rare-subtype pages were found pointing at unrelated papers. This
 * script collects every doi.org URL in the corpus (`links[].url`, guideline and source fields, `person.papers[].url`)
 * plus the bare `doi` fields on papers and people, asks Europe PMC what each DOI actually is (title, journal, year,
 * authors), and compares that with the link label and the owning record's name, tldr and summary using a lenient
 * token overlap: a trial acronym, drug name, disease word or distinctive title word shared between the two counts.
 *
 *   confirmed    the indexed title shares at least one meaningful token with the label or record
 *   not indexed  Europe PMC has no record for the DOI (older papers, books, guidelines, data DOIs); left alone
 *   suspect      indexed, but the title shares nothing with the label or record: probably the wrong paper
 *   label drift  confirmed, but the label's journal or year disagrees with the indexed record (informational)
 *
 * For each suspect it searches Europe PMC for the intended paper using the label's words (or the record's name when
 * the label is only a journal and year), and with --fix rewrites the URL in the data file when exactly one candidate
 * fits and its DOI resolves at doi.org. Anything less certain is printed for the owner to decide.
 *
 * Europe PMC is queried 10 DOIs at a time (OR'd), 300 ms apart, at most 500 requests a run; results are cached in
 * /tmp/link-dois.json so re-runs are free. Nothing is written to the repo without --fix.
 *
 * Run: npx tsx scripts/check-link-dois.ts [--fix] [--only <substring>] [--no-cache] [--verbose]
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { EPMC_REST } from "../src/lib/europepmc";
import { collectUrls, type LinkRef } from "./check-links";

const CACHE = "/tmp/link-dois.json";
const BATCH = 10;
const DELAY_MS = 300;
const MAX_REQUESTS = 500;
const UA = "OnCo DOI checker (+https://github.com/judegomila/OnCo)";

type Epmc = { title: string; journal?: string; year?: number; authors?: string; pmid?: string; doi: string };
type Cache = Record<string, Epmc | null>;
type Ref = LinkRef & { url?: string };

const args = process.argv.slice(2);
const FIX = args.includes("--fix");
const VERBOSE = args.includes("--verbose");
const NO_CACHE = args.includes("--no-cache");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1]?.toLowerCase() : undefined;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** "https://doi.org/10.1056/NEJMoa2201048" -> "10.1056/nejmoa2201048"; undefined for non-DOI URLs. */
export function doiOf(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const m = /^(?:https?:\/\/)?(?:dx\.)?doi\.org\/(10\.\d{4,9}\/\S+)$/i.exec(url.trim());
  const raw = m ? m[1] : /^10\.\d{4,9}\/\S+$/.test(url.trim()) ? url.trim() : undefined;
  if (!raw) return undefined;
  let d = raw;
  try { d = decodeURIComponent(raw); } catch { /* keep as is */ }
  return d.replace(/[.,;)\]]+$/, "").toLowerCase();
}

// ---------------------------------------------------------------------------------------------------------------------
// Token overlap
// ---------------------------------------------------------------------------------------------------------------------

/** Words that appear in almost every oncology title and so prove nothing when shared. */
const STOP = new Set(("a an and or of the in for with without to on at by from as is are was were be been vs versus than " +
  "cancer cancers tumor tumors tumour tumours oncology oncologic neoplasm neoplasms malignant malignancy malignancies " +
  "patient patients people study studies trial trials phase randomised randomized randomly controlled double blind placebo " +
  "open label multicentre multicenter international national european american society college association group " +
  "treatment treatments therapy therapies treated treating clinical practice results result outcome outcomes analysis " +
  "survival efficacy safety response responses rate rates risk risks long term follow up followup year years month months " +
  "guideline guidelines recommendation recommendations consensus statement classification report reports review update " +
  "updated management diagnosis diagnostic staging prognosis prognostic first second line disease diseases advanced " +
  "metastatic recurrent relapsed refractory newly diagnosed early stage localised localized adult adults children childhood " +
  "paediatric pediatric who world health organization organisation 5th edition journal med engl new england lancet jama " +
  "annals ann oncol clin blood nature science cell nat sci proc natl acad plos one bmj jco jnci eur euro j n one two three " +
  "over under after before between among during against using use used based data cohort series case cases single arm " +
  "primary secondary overall free progression event events death deaths dose doses high low standard care versus " +
  "combination combined alone plus previously untreated pretreated resected unresectable resectable adjuvant neoadjuvant " +
  "perioperative maintenance consolidation induction definitive curative palliative systemic local locally regionally " +
  "regional global national population incidence mortality burden estimates estimate statistics trends worldwide " +
  "comparison compared comparing effect effects impact role evidence experience how what when why we our their its this " +
  "that these those i ii iii iv v part chapter section table figure supplementary appendix abstract summary introduction " +
  "not no yes also more most less least very much many some any all each every either both other another same different " +
  "elderly older younger women men female male sex age aged years").split(/\s+/));

const stem = (w: string) => w.length > 4 ? w.replace(/(ies|es|s)$/, (m) => (m === "ies" ? "y" : "")) : w;

/** Lower-case alphanumeric tokens of three or more characters, stemmed, without stop words; digits (years, NCT ids, HD10) kept. */
export function tokens(s: string | undefined): Set<string> {
  const out = new Set<string>();
  if (!s) return out;
  for (const raw of s.toLowerCase().replace(/<[^>]+>/g, " ").split(/[^a-z0-9]+/)) {
    if (!raw) continue;
    const w = stem(raw);
    if (w.length < 3 && !/\d/.test(w)) continue;
    if (STOP.has(raw) || STOP.has(w)) continue;
    out.add(w);
  }
  return out;
}

/** Shared tokens; long words also match on their first eight letters so "misidentified" meets "misidentification". */
const PREFIX = 8;
const overlap = (a: Set<string>, b: Set<string>) => {
  const bp = new Set([...b].filter((t) => t.length >= PREFIX).map((t) => t.slice(0, PREFIX)));
  return [...a].filter((t) => b.has(t) || (t.length >= PREFIX && bp.has(t.slice(0, PREFIX))));
};

/** The label a reference carries: the link label, or the metric label inside a field name such as "metrics (TP53 ...)". */
const labelOf = (ref: Ref) => ref.label ?? /^\w[\w.]*\s\((.+)\)$/.exec(ref.field)?.[1];

/**
 * Journal and year a citation-shaped label such as "Lancet Oncol 2013", "N Engl J Med 2022" or "Jain 2005, Science" is
 * claiming. A label that is a paper title ("Galectin-1: a link between tumor hypoxia...") claims neither, and a label
 * with a title and a bracketed citation ("Induction chemotherapy in SNUC (JCO 2019)") claims only what is in brackets.
 */
function labelClaims(label: string | undefined): { journal?: string; year?: number } {
  if (!label) return {};
  const yearRe = /\b(19[5-9]\d|20[0-4]\d)\b/;
  const bracket = /\(([^()]*)\)\s*$/.exec(label.trim())?.[1];
  const cite = bracket && yearRe.test(bracket) ? bracket : label;
  const year = yearRe.exec(cite)?.[1];
  const rest = cite.replace(new RegExp(yearRe.source, "g"), "").replace(/[():;,]/g, " ").replace(/\s+/g, " ").trim();
  const words = rest.split(" ").filter(Boolean);
  const singleYear = (cite.match(new RegExp(yearRe.source, "g")) ?? []).length === 1;
  const citationShaped = !!year && singleYear && words.length > 0 && words.length <= 6;
  return { journal: citationShaped ? rest : undefined, year: year && singleYear ? Number(year) : undefined };
}

const normJournal = (s: string | undefined) => (s ?? "").toLowerCase().replace(/^the /, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
const JOURNAL_ALIASES: Record<string, string[]> = {
  "n engl j med": ["nejm", "new england journal of medicine"], "j clin oncol": ["jco", "journal of clinical oncology"],
  "lancet oncol": ["lancet oncology"], "ann oncol": ["annals of oncology"], "jama oncol": ["jama oncology"], "eur urol": ["european urology"],
  "nat med": ["nature medicine"], "nat genet": ["nature genetics"], "nat commun": ["nature communications"], "mod pathol": ["modern pathology"],
  "clin cancer res": ["clinical cancer research"], "cancer discov": ["cancer discovery"], "lancet haematol": ["lancet haematology"],
  "int j cancer": ["international journal of cancer"], "br j cancer": ["british journal of cancer"], "eur j cancer": ["european journal of cancer"],
  "j natl cancer inst": ["jnci"], "blood adv": ["blood advances"], "proc natl acad sci u s a": ["pnas", "proceedings of the national academy of sciences"], "br med j": ["bmj", "british medical journal"], "ca cancer j clin": ["ca a cancer journal for clinicians"], "j natl cancer cent": ["journal of the national cancer center"], "gastric cancer": ["gastric cancer"], "j thorac oncol": ["journal of thoracic oncology"], "gynecol oncol": ["gynecologic oncology"],
};
/** Is this label fragment a journal we can name, rather than a title fragment with a year on the end? */
function knownJournal(s: string): boolean {
  const n = normJournal(s);
  if (!n) return false;
  const known = new Set<string>([...Object.keys(JOURNAL_ALIASES), ...Object.values(JOURNAL_ALIASES).flat(), "nature", "science", "cell", "blood", "lancet", "jama", "bmj", "leukemia", "cancer cell", "cancer discovery", "nature medicine", "plos one", "pnas", "haematologica", "radiology", "european urology", "jnci", "esmo open"]);
  return known.has(n) || [...known].some((k) => k.length >= 4 && new RegExp(`\\b${k}\\b`).test(n));
}

/** Does the label's journal agree with Europe PMC's abbreviated journal title? Lenient: either contains the other, or a known alias. */
function journalAgrees(claimed: string | undefined, indexed: string | undefined): boolean | undefined {
  if (!claimed || !indexed) return undefined;
  const c = normJournal(claimed), i = normJournal(indexed);
  if (!c || !i) return undefined;
  if (c.includes(i) || i.includes(c)) return true;
  const aliases = JOURNAL_ALIASES[i] ?? [];
  if (aliases.some((a) => c.includes(a) || a.includes(c))) return true;
  // The label may be a title fragment rather than a journal ("Induction chemotherapy in SNUC (JCO 2019)"): look for any alias inside it.
  for (const [abbr, names] of Object.entries(JOURNAL_ALIASES)) if (i === abbr && names.some((a) => c.includes(a))) return true;
  const cw = c.split(" ").filter((w) => w.length > 3), iw = i.split(" ").filter((w) => w.length > 3);
  return cw.length > 0 && iw.length > 0 && cw.some((w) => iw.some((x) => x.startsWith(w.slice(0, 5)) || w.startsWith(x.slice(0, 5))));
}

// ---------------------------------------------------------------------------------------------------------------------
// Europe PMC
// ---------------------------------------------------------------------------------------------------------------------

let requests = 0;
async function epmc(query: string, pageSize = 25): Promise<Epmc[]> {
  if (requests >= MAX_REQUESTS) throw new Error(`request budget of ${MAX_REQUESTS} exhausted`);
  requests++;
  const url = `${EPMC_REST}?query=${encodeURIComponent(query)}&format=json&resultType=lite&pageSize=${pageSize}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (res.status === 429 || res.status >= 500) { await sleep(2000 * (attempt + 1)); continue; }
      if (!res.ok) throw new Error(`Europe PMC ${res.status}`);
      const json = (await res.json()) as { resultList?: { result?: Array<Record<string, unknown>> } };
      return (json.resultList?.result ?? []).filter((r) => typeof r.doi === "string").map((r) => ({
        doi: String(r.doi).toLowerCase(), title: String(r.title ?? "").replace(/\.$/, ""), journal: r.journalTitle ? String(r.journalTitle) : undefined,
        year: r.pubYear ? Number(r.pubYear) : undefined, authors: r.authorString ? String(r.authorString) : undefined, pmid: r.pmid ? String(r.pmid) : undefined,
      }));
    } catch (e) {
      if (attempt === 2) throw e;
      await sleep(2000 * (attempt + 1));
    }
  }
  return [];
}

async function lookupDois(dois: string[], cache: Cache): Promise<void> {
  const todo = dois.filter((d) => !(d in cache));
  console.log(`europe pmc: ${dois.length} DOIs, ${dois.length - todo.length} cached, ${todo.length} to fetch in batches of ${BATCH}`);
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const query = batch.map((d) => `DOI:"${d}"`).join(" OR ");
    let hits: Epmc[] = [];
    try { hits = await epmc(query, BATCH * 3); } catch (e) { console.warn(`  batch ${i / BATCH + 1} failed: ${(e as Error).message}`); if (requests >= MAX_REQUESTS) break; }
    for (const d of batch) {
      // Prefer the peer-reviewed record over a preprint with the same DOI prefix, and an exact DOI match over anything else.
      const exact = hits.filter((h) => h.doi === d);
      cache[d] = exact.find((h) => h.pmid) ?? exact[0] ?? null;
    }
    writeFileSync(CACHE, JSON.stringify(cache, null, 0));
    if ((i / BATCH) % 20 === 19) console.log(`  ${Math.min(i + BATCH, todo.length)}/${todo.length}`);
    await sleep(DELAY_MS);
  }
}

/** doi.org answers 302 for a registered DOI; 404 means it is not one. Publisher blocks (403) downstream do not matter here. */
async function doiResolves(doi: string): Promise<boolean> {
  try {
    const res = await fetch(`https://doi.org/${doi}`, { method: "HEAD", redirect: "manual", headers: { "User-Agent": UA } });
    return res.status >= 300 && res.status < 400;
  } catch { return false; }
}

// ---------------------------------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------------------------------

type Verdict = "confirmed" | "not-indexed" | "suspect";
type Row = { doi: string; url: string; refs: Ref[]; epmc: Epmc | null; verdict: Verdict; shared: string[]; drift?: string; note?: string };

function judge(doi: string, url: string, refs: Ref[], epmc: Epmc | null): Row {
  if (!epmc) return { doi, url, refs, epmc, verdict: "not-indexed", shared: [] };
  const g = graph();
  const titleToks = tokens(epmc.title);
  let best: string[] = [];
  let drift: string | undefined;
  for (const ref of refs) {
    const e = g.byId.get(ref.id);
    // The field name carries the metric or endpoint label for bottleneck metrics and trial outcomes ("metrics (TP53 ...)").
    const fields = [ref.label, ref.field, e?.name, e?.tldr, e?.summary, ...(e?.aka ?? [])];
    if (e?.kind === "paper") fields.push(e.journal, String(e.year), e.authors);
    // Bottleneck metrics carry their own citation ("Horbach & Halffman, PLOS ONE 2017") beside the URL.
    const metric = e?.kind === "bottleneck" ? e.metrics.find((m) => m.url && doiOf(m.url) === doi) : undefined;
    if (metric) fields.push(metric.label, metric.source);
    const shared = overlap(titleToks, tokens(fields.filter(Boolean).join(" ")));
    // An author-year label ("Jain 2005, Science") or a person's own paper is confirmed by a surname in the author list.
    const byAuthor = overlap(tokens(epmc.authors), tokens([ref.label, metric?.source, e?.kind === "person" ? e.name : undefined].filter(Boolean).join(" "))).map((t) => `author:${t}`);
    const all = [...shared, ...byAuthor];
    if (all.length > best.length) best = all;
    if (ref.label) {
      const c = labelClaims(ref.label);
      // Only a recognised journal name can disagree; "AABB red cell transfusion guideline 2023" is a title, not a journal claim.
      const cites = !!c.journal && knownJournal(c.journal);
      const jOk = cites ? journalAgrees(c.journal, epmc.journal) : undefined;
      const yOk = cites && c.year && epmc.year ? Math.abs(c.year - epmc.year) <= 1 : undefined;
      if (jOk === false || yOk === false) drift = `label "${ref.label}" vs indexed ${epmc.journal ?? "?"} ${epmc.year ?? "?"}`;
    }
  }
  return { doi, url, refs, epmc, verdict: best.length ? "confirmed" : "suspect", shared: best, drift };
}

/** Search Europe PMC for the paper a suspect link was meant to cite, from the label's words or, failing those, the record's name. */
async function findIntended(row: Row): Promise<Epmc[]> {
  const g = graph();
  // Prefer a reference with a label; the label's words are the best description of the intended paper.
  const ref = row.refs.find((r) => labelOf(r)) ?? row.refs[0];
  const e = g.byId.get(ref.id);
  const label = labelOf(ref);
  const c = labelClaims(label);
  let words = [...tokens(label)].filter((w) => !/^\d+$/.test(w) && !normJournal(c.journal ?? "").split(" ").includes(w));
  // Journal-only labels ("Lancet Oncol 2013") carry no title words: fall back to the owning record's name.
  if (words.length < 2) words = [...tokens(e?.name)].filter((w) => !/^\d+$/.test(w)).slice(0, 5);
  if (!words.length) return [];
  const parts = [words.slice(0, 6).map((w) => `TITLE:${w}*`).join(" AND ")];
  if (c.year) parts.push(`(PUB_YEAR:${c.year - 1} OR PUB_YEAR:${c.year} OR PUB_YEAR:${c.year + 1})`);
  await sleep(DELAY_MS);
  let hits = await epmc(parts.join(" AND "), 10);
  // A journal claim narrows further when the first pass is crowded.
  if (hits.length > 1 && c.journal) {
    const narrowed = hits.filter((h) => journalAgrees(c.journal, h.journal));
    if (narrowed.length) hits = narrowed;
  }
  // A candidate must share two words with the label itself (not just the record name), so a suspect without a usable
  // label is never rewritten on the strength of a loose record-level match.
  const targetToks = tokens(label);
  if (targetToks.size < 2) return [];
  const notes = /^(corrigendum|erratum|correction|retraction|reply|comment|editorial|first person profile|response to)/i;
  return hits.filter((h) => !notes.test(h.title) && overlap(tokens(h.title), targetToks).length >= 2);
}

function dataFiles(dir: string): string[] {
  const out: string[] = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...dataFiles(p));
    else if (/\.tsx?$/.test(f) && !f.endsWith(".test.ts")) out.push(p);
  }
  return out;
}

/**
 * Rewrite one DOI in the data files: every quoted string that is the DOI, as a doi.org URL (`url: "https://doi.org/..."`)
 * or bare (`doi: "10.1038/..."`), whatever its letter case. Only whole quoted strings match, so a DOI that prefixes
 * another is safe, and each occurrence keeps its form (URL stays URL, bare stays bare).
 */
function rewriteUrl(from: string, to: string): string[] {
  const fromDoi = doiOf(from), toDoi = doiOf(to);
  if (!fromDoi || !toDoi) return [];
  const touched: string[] = [];
  for (const file of dataFiles(join(process.cwd(), "src", "data"))) {
    const src = readFileSync(file, "utf8");
    if (!src.toLowerCase().includes(fromDoi)) continue;
    const next = src.replace(/"([^"\n]*)"/g, (whole, inner: string) => {
      if (doiOf(inner) !== fromDoi) return whole;
      return /^https?:\/\//i.test(inner) ? `"https://doi.org/${toDoi}"` : `"${toDoi}"`;
    });
    if (next !== src) { writeFileSync(file, next); touched.push(file); }
  }
  return touched;
}

async function main() {
  const g = graph();
  const refsByDoi = new Map<string, { url: string; refs: Ref[] }>();
  const add = (url: string | undefined, refs: Ref[]) => {
    const d = doiOf(url);
    if (!d || !url) return;
    const cur = refsByDoi.get(d) ?? { url, refs: [] };
    cur.refs.push(...refs);
    refsByDoi.set(d, cur);
  };
  for (const [url, refs] of collectUrls(g.entities)) add(url, refs);
  for (const e of g.entities) {
    const base = { id: e.id, kind: e.kind, name: e.name, route: "" };
    if (e.kind === "paper" && e.doi) add(`https://doi.org/${e.doi}`, [{ ...base, field: "doi", label: `${e.journal} ${e.year}` }]);
    if (e.kind === "person") for (const p of e.papers) if (p.doi) add(`https://doi.org/${p.doi}`, [{ ...base, field: "papers.doi", label: p.title }]);
  }
  let dois = [...refsByDoi.keys()].sort();
  if (ONLY) dois = dois.filter((d) => d.includes(ONLY) || refsByDoi.get(d)!.refs.some((r) => r.id.includes(ONLY) || r.name.toLowerCase().includes(ONLY)));
  console.log(`collected ${dois.length} distinct DOIs from ${[...refsByDoi.values()].reduce((n, v) => n + v.refs.length, 0)} references`);

  const cache: Cache = !NO_CACHE && existsSync(CACHE) ? (JSON.parse(readFileSync(CACHE, "utf8")) as Cache) : {};
  await lookupDois(dois, cache);

  const rows = dois.map((d) => { const { url, refs } = refsByDoi.get(d)!; return judge(d, url, refs, cache[d] ?? null); });
  const confirmed = rows.filter((r) => r.verdict === "confirmed");
  const notIndexed = rows.filter((r) => r.verdict === "not-indexed");
  const suspects = rows.filter((r) => r.verdict === "suspect");
  const drifted = confirmed.filter((r) => r.drift);

  const show = (r: Row) => `${r.doi}  <- ${r.refs.map((x) => `${x.id}${labelOf(x) ? ` ["${labelOf(x)}"]` : ""}`).slice(0, 3).join(", ")}${r.refs.length > 3 ? ` +${r.refs.length - 3}` : ""}`;

  console.log(`\n== confirmed (${confirmed.length}) ==`);
  if (VERBOSE) for (const r of confirmed) console.log(`  ${show(r)}\n      ${r.epmc!.title} (${r.epmc!.journal} ${r.epmc!.year}) shared: ${r.shared.slice(0, 5).join(", ")}`);
  else console.log(`  (run with --verbose to list them)`);

  console.log(`\n== not indexed in Europe PMC (${notIndexed.length}; older, book, guideline or data DOIs; left alone) ==`);
  for (const r of notIndexed) console.log(`  ${show(r)}`);

  console.log(`\n== label drift (${drifted.length}; confirmed paper, but the label's journal or year disagrees) ==`);
  for (const r of drifted) console.log(`  ${show(r)}\n      ${r.drift}\n      indexed: ${r.epmc!.title} (${r.epmc!.journal} ${r.epmc!.year})`);

  console.log(`\n== suspect (${suspects.length}; indexed title shares nothing with label or record) ==`);
  const fixed: string[] = [];
  const forOwner: string[] = [];
  for (const r of suspects) {
    console.log(`  ${show(r)}\n      indexed: ${r.epmc!.title} (${r.epmc!.journal} ${r.epmc!.year}; ${r.epmc!.authors?.split(",")[0] ?? ""})`);
    let candidates: Epmc[] = [];
    try { candidates = await findIntended(r); } catch (e) { console.log(`      search failed: ${(e as Error).message}`); }
    const fresh = candidates.filter((c) => c.doi !== r.doi);
    if (fresh.length === 1) {
      const c = fresh[0];
      const resolves = await doiResolves(c.doi);
      const to = `https://doi.org/${c.doi}`;
      console.log(`      candidate: ${c.title} (${c.journal} ${c.year}) ${to}${resolves ? "" : " [does not resolve]"}`);
      if (resolves && FIX) {
        const touched = rewriteUrl(r.url, to);
        if (touched.length) { fixed.push(`${r.url} -> ${to} (${r.refs.map((x) => x.id).join(", ")}) in ${touched.map((t) => t.replace(process.cwd() + "/", "")).join(", ")}`); console.log(`      fixed in ${touched.length} file(s)`); }
        else forOwner.push(`${show(r)}: candidate ${to} but the URL was not found verbatim in src/data (built from a helper?)`);
      } else if (resolves) forOwner.push(`${show(r)}: would change to ${to} (${c.title}); rerun with --fix`);
      else forOwner.push(`${show(r)}: only candidate ${to} does not resolve at doi.org`);
    } else {
      if (fresh.length) for (const c of fresh.slice(0, 5)) console.log(`      candidate: ${c.title} (${c.journal} ${c.year}) https://doi.org/${c.doi}`);
      else console.log(`      no candidate found by label or record words`);
      forOwner.push(`${show(r)}: ${fresh.length ? `${fresh.length} candidates, none chosen` : "no candidate found"}`);
    }
  }

  console.log(`\n== summary ==\n  DOIs checked: ${rows.length}\n  confirmed: ${confirmed.length} (${drifted.length} with label drift)\n  not indexed: ${notIndexed.length}\n  suspect: ${suspects.length}\n  corrected: ${fixed.length}\n  Europe PMC requests: ${requests}`);
  if (fixed.length) { console.log(`\n== corrected ==`); for (const f of fixed) console.log(`  ${f}`); }
  if (forOwner.length) { console.log(`\n== for the owner ==`); for (const f of forOwner) console.log(`  ${f}`); }
}

if (process.argv[1]?.endsWith("check-link-dois.ts")) main().catch((e) => { console.error(e); process.exit(1); });
