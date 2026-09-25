import type MiniSearch from "minisearch";
import type { SearchResult } from "minisearch";
import type { SearchDoc } from "@/lib/search-index";
import { rankHits, SEARCH_INDEX_OPTIONS } from "@/lib/search-rank";
import { contentWords } from "@/lib/semantic";

/**
 * The browser-side search index: the exported /api/v1/search.json (every entity and page, one document each) inside a
 * MiniSearch instance, built once per page load and shared by the header palette, the search box, the search page,
 * Ask OnCo, the 404 helper and the WebMCP tools.
 *
 * MiniSearch itself is loaded with the first search rather than imported statically: the palette is in the root
 * layout, so anything it imports statically ships with every page, and the library is only needed once a reader types.
 */
export type SearchIndex = { ms: MiniSearch<SearchDoc>; docs: SearchDoc[]; byId: Map<string, SearchDoc> };

let cache: Promise<SearchIndex> | null = null;

export function loadSearch(): Promise<SearchIndex> {
  if (!cache) {
    const docs = fetch("/api/v1/search.json").then((r) => { if (!r.ok) throw new Error("Search index unavailable"); return r.json() as Promise<SearchDoc[]>; });
    cache = Promise.all([docs, import("minisearch")])
      .then(([docs, { default: MiniSearch }]) => {
        const ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
        ms.addAll(docs);
        return { ms, docs, byId: new Map(docs.map((d) => [d.id, d])) };
      })
      .catch((error) => { cache = null; throw error; });
  }
  return cache;
}

/** A hit as the UI reads it: MiniSearch's match data plus the stored document fields. */
export type RankedHit = SearchResult & SearchDoc;

/**
 * The word search as the site shows it: MiniSearch's text scores re-weighted by kind tier and name match
 * (src/lib/search-rank.ts), best first. Every dropdown and results list should go through this rather than ms.search.
 */
export function searchRanked(ms: MiniSearch<SearchDoc>, query: string, limit?: number): RankedHit[] {
  const ranked = rankHits(ms.search(query) as RankedHit[], query);
  return limit === undefined ? ranked : ranked.slice(0, limit);
}

/**
 * The word search as Ask OnCo reads it, shared by the browser (/ask/, the search page), the server harness and the
 * extractive floor test: the question's function words dropped first (src/lib/semantic.ts contentWords), the hits
 * re-weighted by kind tier and name match like every other list on the site, pages dropped since Ask reads entity
 * records, ids only.
 */
export function askLexical(ms: MiniSearch<SearchDoc>, question: string, k: number): string[] {
  const query = contentWords(question);
  if (!query) return [];
  return searchRanked(ms, query).filter((h) => h.kind !== "page").slice(0, k).map((h) => String(h.id));
}
