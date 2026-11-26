import type MiniSearch from "minisearch";
import type { SearchResult } from "minisearch";
import type { SearchDoc } from "@/lib/search-index";
import { NAME_BOOST, nameBoost, rankHits, recordWeight, SEARCH_INDEX_OPTIONS, TYPED_SEARCH_OPTIONS } from "@/lib/search-rank";
import { contentWords } from "@/lib/semantic";
import { fromNameDoc, type SearchNameDoc } from "@/lib/search-names";

/**
 * The browser-side search index: the exported /api/v1/search.json (every entity and page, one document each) inside a
 * MiniSearch instance, built once per page load and shared by the header palette, the search box, the search page,
 * Ask OnCo, the 404 helper and the WebMCP tools.
 *
 * It arrives in two stages. search.json is 9.5 MB (2.1 MB over the wire), and until it had loaded every list was empty,
 * which a reader cannot tell from "not found": the owner searched for a record that exists on 4 November 2026 and
 * thought it was missing. So the lists that answer as someone types (palette, search box, search page, 404 helper)
 * call `loadQuickSearch`, which builds a first index from /api/v1/search-names.json (names, aliases and the fields the
 * ranking reads, src/lib/search-names.ts) and then fetches search.json behind it; `onFullSearch` tells them when to
 * re-run the query on the full index. What needs the summaries (Ask OnCo, the WebMCP tool) calls `loadSearch`, which
 * is the full index only. A list says "Loading search…" until an index is ready, and never "no matches" from the
 * first stage, since a word in a summary can still match.
 *
 * MiniSearch itself is loaded with the first search rather than imported statically: the palette is in the root
 * layout, so anything it imports statically ships with every page, and the library is only needed once a reader types.
 */
export type SearchIndex = { ms: MiniSearch<SearchDoc>; docs: SearchDoc[]; byId: Map<string, SearchDoc>; /** False for the names-only first stage. */ full: boolean };

let cache: Promise<SearchIndex> | null = null;
let quick: Promise<SearchIndex> | null = null;
let fullIndex: SearchIndex | null = null;
let library: Promise<typeof import("minisearch")> | null = null;
type Listener = { loaded: (index: SearchIndex) => void; failed?: () => void };
const listeners = new Set<Listener>();

/** Fetches a file of documents and the MiniSearch library side by side, then indexes them. */
function fetchIndex<T>(url: string, toDocs: (raw: T) => SearchDoc[], full: boolean): Promise<SearchIndex> {
  // The library request starts with the first file and is shared by both stages.
  library ??= import("minisearch").catch((error) => { library = null; throw error; });
  return Promise.all([getJson<T>(url), library]).then(([raw, { default: MiniSearch }]) => {
    const docs = toDocs(raw);
    const ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
    ms.addAll(docs);
    return { ms, docs, byId: new Map(docs.map((d) => [d.id, d])), full };
  });
}

function getJson<T>(url: string): Promise<T> {
  // Through a resolved promise, so a fetch that throws rather than rejecting still lands in the caller's catch.
  return Promise.resolve().then(() => fetch(url)).then((r) => { if (!r.ok) throw new Error("Search index unavailable"); return r.json() as Promise<T>; });
}

/** The full index (search.json). Everything that reads summaries or tags waits for this. */
export function loadSearch(): Promise<SearchIndex> {
  if (!cache) {
    cache = fetchIndex<SearchDoc[]>("/api/v1/search.json", (docs) => docs, true)
      .then((index) => { fullIndex = index; quick = null; for (const l of listeners) l.loaded(index); return index; })
      .catch((error) => { cache = null; for (const l of listeners) l.failed?.(); throw error; });
  }
  return cache;
}

/**
 * The first index that can answer: the full one when it is already here, otherwise the names-only first stage, with
 * the full index fetched behind it unless the caller opts out (the palette often only needs names). If the names file
 * fails, this waits for the full index instead; it rejects only when neither can be had.
 */
export function loadQuickSearch({ preloadFull = true } = {}): Promise<SearchIndex> {
  if (fullIndex) return Promise.resolve(fullIndex);
  if (cache && !quick) return cache;
  if (!quick) {
    const attempt: Promise<SearchIndex> = fetchIndex<SearchNameDoc[]>("/api/v1/search-names.json", (docs) => docs.map(fromNameDoc), false)
      .then((index) => fullIndex ?? index)
      .catch(() => loadSearch())
      .catch((error) => { if (quick === attempt) quick = null; throw error; });
    quick = attempt;
  }
  return preloadFull ? quick.then((index) => { if (!index.full && !cache) fetchFull(); return index; }) : quick;
}

/** The full index fetched behind the first stage; a failure leaves the first stage answering. */
function fetchFull(): void {
  void loadSearch().catch(() => { /* The next loadQuickSearch retries. */ });
}

/**
 * Calls `loaded` when the full index finishes loading, and `failed` when a load of it fails (a list holding an empty
 * first-stage answer then says search is unavailable instead of loading forever). A caller already holding the full
 * index (`index.full`) has nothing to wait for. Returns the unsubscribe.
 */
export function onFullSearch(loaded: (index: SearchIndex) => void, failed?: () => void): () => void {
  const l: Listener = { loaded, failed };
  listeners.add(l);
  return () => { listeners.delete(l); };
}

/** The full index when it has loaded, for a list deciding whether an empty result is final. */
export const fullSearchReady = (): boolean => fullIndex !== null;

/** A hit as the UI reads it: MiniSearch's match data plus the stored document fields. */
export type RankedHit = SearchResult & SearchDoc;

/**
 * The word search as the site shows it: MiniSearch's text scores re-weighted by kind tier and name match
 * (src/lib/search-rank.ts), best first. Every dropdown and results list should go through this rather than ms.search.
 */
export function searchRanked(ms: MiniSearch<SearchDoc>, query: string, limit?: number): RankedHit[] {
  const ranked = rankHits(ms.search(query, TYPED_SEARCH_OPTIONS) as RankedHit[], query);
  return limit === undefined ? ranked : ranked.slice(0, limit);
}

/**
 * The word search as Ask OnCo reads it, shared by the browser (/ask/, the search page), the server harness and the
 * extractive floor test: the question's function words dropped first (src/lib/semantic.ts contentWords), the hits
 * re-weighted by kind tier and name match like every other list on the site and by provenance as the concept index
 * is (search-rank.ts recordWeight), a subtype capped below its parent, pages dropped since Ask reads entity records,
 * ids only.
 */
export function askLexical(ms: MiniSearch<SearchDoc>, question: string, k: number): string[] {
  const query = contentWords(question);
  if (!query) return [];
  // Deliberately not searchRanked: that raises the weight on prefix matches for someone typing into a box, and
  // on a whole question it costs extractive recall (see TYPED_SEARCH_OPTIONS).
  const hits = rankHits(ms.search(query) as RankedHit[], query).filter((h) => h.kind !== "page");
  const byId = new Map(hits.map((h) => [String(h.id), h]));
  // A subtype's name carries its parent's name ("Large-cell lung carcinoma" under non-small-cell lung cancer), so on
  // the parent's tokens the subtypes crowd the parent out. When the parent is also a hit and the subtype matched no
  // query word the parent did not, the subtype sits just below its parent; a subtype the query names exactly, by name
  // or alias, or one that matched a word of its own ("early", "metastatic") keeps its score. Measured 24 Sept 2026 after
  // the 99 wave 4 subtype pages, which took extractive recall 0.416 to 0.403; a flat penalty on every record with a
  // parent measured 0.401 because the benchmark's expected records include subtypes.
  const capped = hits.map((h, i) => {
    const parent = h.parent ? byId.get(h.parent) : undefined;
    const weight = recordWeight(h.kind, h.tags ?? "");
    if (!parent || nameBoost(query, h.name, h.aka) >= NAME_BOOST.aliasExact) return { h, i, score: h.score * weight };
    const own = h.terms.some((t) => !parent.terms.includes(t));
    return { h, i, score: (own ? h.score : Math.min(h.score, parent.score * SUBTYPE_BELOW_PARENT)) * weight };
  });
  return capped.sort((a, b) => b.score - a.score || a.i - b.i).slice(0, k).map((x) => String(x.h.id));
}

/** A subtype that adds no matched word to its parent's scores at most this share of the parent's score. */
export const SUBTYPE_BELOW_PARENT = 0.9;
