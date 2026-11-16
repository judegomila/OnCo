import MiniSearch from "minisearch";
import type { SearchDoc } from "../src/lib/search-index";
import { searchRanked, type RankedHit } from "../src/lib/search-client";
import { NAME_BOOST, normaliseName, rankHits, SEARCH_INDEX_OPTIONS, TYPED_SEARCH_OPTIONS } from "../src/lib/search-rank";

/**
 * The offline half of the search health check, shared by the daily script (scripts/search-health.ts, which runs it
 * against the live index) and the gate (scripts/search-health.test.ts, which runs it against the checked-out tree).
 *
 * The question it asks of every record is the one the owner asked on 4 November 2026 after searching for "Jaime
 * Leandro Foundation": if a reader types this record's exact name into the search box, is it among the first three
 * results? The answer is the site's own ranking (searchRanked: MiniSearch with the browser's options, then rankHits),
 * computed by a faster route that gives the same positions; see `positionOf`.
 */

/** The first three results, which is what the header dropdown shows above the fold on a phone. */
export const TOP = 3;
/** A name another record also answers to (as its name or one of its aliases) may sit this far down, or as far as there are records sharing it. */
export const TOP_SHARED = 5;

/**
 * Names longer than this many words are not what a reader types: they are registry trial titles and paper titles
 * ("A Phase 3, Randomized, Open-label Study of ..."), found by their acronym, NCT number or DOI. They are also costly
 * to audit, since a twenty-word title matches nearly every record in the index (21,000 hits a query, measured
 * 4 November 2026), so the gate checks every record up to this length and the daily script samples the longer ones.
 */
export const TYPED_NAME_WORDS = 6;

export const wordCount = (name: string): number => name.trim().split(/\s+/).filter(Boolean).length;

type RawHit = { score: number; terms: string[]; match: Record<string, string[]> };
type QuerySpec = { term: string; prefix: boolean; fuzzy: unknown; termBoost: number };
type Fn = (term: string, i: number, all: string[]) => unknown;
type Internals = {
  executeQuerySpec(spec: QuerySpec, options: unknown): Map<number, RawHit>;
  _options: { tokenize: (text: string) => string[]; processTerm: (term: string) => string | string[] | null | undefined | false; searchOptions: Record<string, unknown> };
  _documentIds: Map<number, string>;
  _storedFields: Map<number, Record<string, unknown>>;
};
/** One query word's matches, never modified: the hits, each hit's place in MiniSearch's own order, and the hits best first. */
type WordHits = { hits: Map<number, RawHit>; pos: Map<number, number>; best: Array<[number, number]> };

/**
 * An index prepared for auditing: the MiniSearch instance as the browser builds it, a cache of what each query word
 * matched (least recently used first, holding `cachedHits` hits in all), and the way from a record id to MiniSearch's
 * short id.
 */
export type AuditIndex = { ms: MiniSearch<SearchDoc>; words: Map<string, WordHits>; cachedHits: number; shortId: Map<string, number> };

/**
 * How many word hits the cache may hold before it forgets the least recently used word. The cache is memoisation
 * only: a forgotten word is computed again, identically, when a later name uses it, so the bound changes how long the
 * audit takes and never what it finds.
 *
 * Unbounded, it kept every word of every name: 4.4 million hits, each an object with its own term list and match map,
 * about 2.5 GB of heap on the 23,728-document corpus of 12 November 2026, enough for the gate to die of memory at
 * Node's default heap once the corpus grew by 600 records. The words names share most ("cancer", "of", "foundation")
 * are used again and again and so stay; the long tail of words used once is what this lets go.
 */
export const WORD_CACHE_HITS = 400_000;

/** Builds the index exactly as the browser does (SEARCH_INDEX_OPTIONS), with an empty word cache beside it. */
export function buildAuditIndex(docs: readonly SearchDoc[]): AuditIndex {
  const ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
  ms.addAll(docs as SearchDoc[]);
  const inner = ms as unknown as Internals;
  return { ms, words: new Map(), cachedHits: 0, shortId: new Map([...inner._documentIds].map(([short, id]) => [id, short])) };
}

/** The most rankHits can multiply a text score by: the best name boost, the kind tier set aside (tier weights are at most 1). */
const MAX_MULTIPLIER = Math.max(...Object.values(NAME_BOOST));

/** The query's words as MiniSearch.executeQuery makes them (v7: tokenise, processTerm, then termToQuerySpec with the audit's options). */
function querySpecs(inner: Internals, query: string): QuerySpec[] {
  const options = { ...inner._options.searchOptions, ...TYPED_SEARCH_OPTIONS } as Record<string, unknown>;
  const terms = inner._options.tokenize(query).flatMap((t) => inner._options.processTerm(t) || []).filter((t): t is string => !!t);
  return terms.map((term, i) => ({
    term,
    fuzzy: typeof options.fuzzy === "function" ? (options.fuzzy as Fn)(term, i, terms) : options.fuzzy || false,
    prefix: typeof options.prefix === "function" ? Boolean((options.prefix as Fn)(term, i, terms)) : options.prefix === true,
    termBoost: typeof options.boostTerm === "function" ? Number((options.boostTerm as Fn)(term, i, terms)) : 1,
  }));
}

function wordHits(index: AuditIndex, inner: Internals, spec: QuerySpec): WordHits {
  const key = `${spec.term}|${spec.prefix}|${String(spec.fuzzy)}|${spec.termBoost}`;
  let w = index.words.get(key);
  if (w) {
    // Move it to the most recently used end (a Map iterates in insertion order).
    index.words.delete(key);
    index.words.set(key, w);
  } else {
    const hits = inner.executeQuerySpec(spec, TYPED_SEARCH_OPTIONS);
    const pos = new Map<number, number>();
    const best: Array<[number, number]> = [];
    for (const [s, r] of hits) { pos.set(s, pos.size); best.push([s, r.score]); }
    best.sort((a, b) => b[1] - a[1]);
    w = { hits, pos, best };
    index.words.set(key, w);
    index.cachedHits += hits.size;
    // Forget the least recently used words until the cache is within budget, never the word just computed.
    for (const [k, old] of index.words) {
      if (index.cachedHits <= WORD_CACHE_HITS || k === key) break;
      index.words.delete(k);
      index.cachedHits -= old.hits.size;
    }
  }
  return w;
}

/**
 * Where `id` comes in searchRanked(ms, query), 1-based (0 when the query does not find it), and the first three
 * results. `first` is complete whenever the record is not among them, which is the only time the audit reads it.
 *
 * Why not call searchRanked: it costs too much at this scale. A three-word name has about 8,000 hits and a
 * twenty-word title about 21,000, each built into a result object and given a name boost, and every query word is
 * expanded fuzzily through the term tree. Searching each of the 11,500 typed names took 6.5 minutes on 4 November 2026.
 *
 * What this does instead gives the same positions. MiniSearch (v7) scores a query one word at a time
 * (executeQuerySpec) and adds the words up (combineResults: a sum over words, then times the number of distinct query
 * words matched), so each word's matches are computed once and kept; twenty thousand names share most of their words.
 * rankHits multiplies a text score by at most MAX_MULTIPLIER, so a hit can outrank the record only if its text score
 * is at least the record's final score divided by that; with Q query words, a hit whose every word scores below
 * that bound over Q squared cannot reach it. Only hits above that line in some word are assembled, scored exactly as
 * MiniSearch scores them, put in MiniSearch's own order (score, then the order its maps were filled in) and ranked by
 * rankHits itself, so ties fall as they do on the site.
 *
 * This reads MiniSearch internals. scripts/search-health.test.ts compares it with searchRanked on a sample of names,
 * so an upgrade that changes them fails the gate rather than skewing the audit.
 */
export function positionOf(index: AuditIndex, query: string, id: string): { rank: number; first: RankedHit[] } {
  const inner = index.ms as unknown as Internals;
  const specs = querySpecs(inner, query);
  const words = specs.map((s) => wordHits(index, inner, s));
  /** One document as search() would hand it back, with its place in search()'s order before the sort. */
  const assemble = (s: number): { hit: RankedHit; order: [number, number] } | undefined => {
    let score = 0;
    const terms: string[] = [];
    const match: Record<string, string[]> = {};
    let order: [number, number] | undefined;
    words.forEach((w, i) => {
      const r = w.hits.get(s);
      if (!r) return;
      order ??= [i, w.pos.get(s) ?? 0];
      score += r.score;
      for (const t of r.terms) if (!terms.includes(t)) terms.push(t);
      Object.assign(match, r.match);
    });
    if (!order) return undefined;
    const hit = { id: inner._documentIds.get(s), score: score * (terms.length || 1), terms: Object.keys(match), queryTerms: terms, match, ...inner._storedFields.get(s) } as unknown as RankedHit;
    return { hit, order };
  };
  const short = index.shortId.get(id);
  const own = short === undefined ? undefined : assemble(short);
  // When the query does not find the record, nothing is pruned and `first` is the true top of the list.
  const target = own ? rankHits([own.hit], query)[0].score : 0;
  const perWord = (target / (MAX_MULTIPLIER * Math.max(1, specs.length) ** 2)) * (1 - 1e-9);
  const chosen = new Set<number>();
  for (const w of words) for (const [s, score] of w.best) { if (score < perWord) break; chosen.add(s); }
  const candidates = [...chosen].map(assemble).filter((c): c is NonNullable<typeof c> => !!c)
    .sort((a, b) => a.order[0] - b.order[0] || a.order[1] - b.order[1])
    .map((c) => c.hit)
    .sort((a, b) => b.score - a.score);
  const ranked = rankHits(candidates, query);
  const at = ranked.findIndex((h) => h.id === id);
  return { rank: at + 1, first: ranked.slice(0, TOP) };
}

/** The slow, literal form of positionOf, for checking it: the site's searchRanked over the whole hit list. */
export function positionBySearchRanked(ms: MiniSearch<SearchDoc>, query: string, id: string): { rank: number; first: RankedHit[] } {
  const ranked = searchRanked(ms, query);
  return { rank: ranked.findIndex((h) => h.id === id) + 1, first: ranked.slice(0, TOP) };
}

/** How many records answer to each normalised name, counting names and aliases (one count per record). */
export function nameOwners(docs: readonly SearchDoc[]): Map<string, number> {
  const owners = new Map<string, number>();
  for (const d of docs) {
    const forms = new Set([d.name, ...(d.aka ?? "").split("\n")].map(normaliseName).filter(Boolean));
    for (const f of forms) owners.set(f, (owners.get(f) ?? 0) + 1);
  }
  return owners;
}

/** How far down a record may sit for its exact name: 3, or 5 when another record answers to the same name, or more when more than five do. */
export function allowedRank(name: string, owners: ReadonlyMap<string, number>): number {
  const n = owners.get(normaliseName(name)) ?? 1;
  return n > 1 ? Math.max(TOP_SHARED, n) : TOP;
}

export type RankFailure = { id: string; kind: string; name: string; /** 1-based position, or 0 when the name does not find it at all. */ rank: number; allowed: number; /** What came first instead, as "kind:id". */ above: string[] };
export type RankReport = { checked: number; byKind: Record<string, { checked: number; failed: number }>; failures: RankFailure[] };

/** Searches each record's exact name and reports those that are not where a reader would look for them. */
export function auditNames(index: AuditIndex, owners: ReadonlyMap<string, number>, records: readonly SearchDoc[]): RankReport {
  const byKind: RankReport["byKind"] = {};
  const failures: RankFailure[] = [];
  for (const d of records) {
    const k = (byKind[d.kind] ??= { checked: 0, failed: 0 });
    k.checked++;
    const allowed = allowedRank(d.name, owners);
    const { rank, first } = positionOf(index, d.name, d.id);
    if (rank >= 1 && rank <= allowed) continue;
    k.failed++;
    failures.push({ id: d.id, kind: d.kind, name: d.name, rank, allowed, above: first.map((h) => `${h.kind}:${h.id}`) });
  }
  return { checked: records.length, byKind, failures };
}

/** A small deterministic hash, so a sample is the same on every run for the same corpus and changes only as the corpus does. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * A sample stratified by kind: every record of a kind with no more than `perKind` records, otherwise `perKind` chosen
 * by a hash of the id, so each kind is represented however large the trial and paper kinds grow. Plus every id in
 * `always` (the records added recently).
 */
export function stratifiedSample(docs: readonly SearchDoc[], perKind: number, always: ReadonlySet<string> = new Set()): SearchDoc[] {
  const byKind = new Map<string, SearchDoc[]>();
  for (const d of docs) { const list = byKind.get(d.kind) ?? []; list.push(d); byKind.set(d.kind, list); }
  const chosen = new Set<string>();
  for (const list of byKind.values()) for (const d of [...list].sort((a, b) => hash(a.id) - hash(b.id)).slice(0, perKind)) chosen.add(d.id);
  return docs.filter((d) => chosen.has(d.id) || always.has(d.id));
}

/** One line per failure, for a log or an issue. */
export function describeFailure(f: RankFailure): string {
  const where = f.rank === 0 ? "not found by its name" : `at ${f.rank}`;
  return `${f.kind} \`${f.id}\` "${f.name}" is ${where} (allowed ${f.allowed}); first: ${f.above.join(", ")}`;
}

/**
 * Names that are genuinely ambiguous, with the reason. This list can only shrink: an entry that now ranks where it
 * should fails scripts/search-health.test.ts until it is removed, and the list may not grow past MAX_ALLOWED_AMBIGUOUS. Fix the record or the
 * ranking instead of adding to it.
 */
export const ALLOWED_AMBIGUOUS: Readonly<Record<string, string>> = {
  // Review papers whose whole title is the name of a cancer (Nature Reviews Disease Primers). A reader typing
  // "Small-cell lung cancer" wants the cancer and its subtypes, which is what comes first: rankHits lifts an exact name
  // above every inexact one except a cancer (src/lib/search-rank.ts), so these sit just under the cancer's subtypes.
  // When that rule arrived on 4 November 2026 six entries left this list: the journal Cancer and the primers or
  // seminars titled "Breast cancer", "Colorectal cancer", "Endometrial cancer", "Gastric cancer" and "Thyroid cancer".
  "paper-rudin-nat-rev-dis-primers": "title is just \"Small-cell lung cancer\"",
  "paper-hsieh-nat-rev-dis-primers": "title is just \"Renal cell carcinoma\"",
};
export const MAX_ALLOWED_AMBIGUOUS = 2;
