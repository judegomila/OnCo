import type MiniSearch from "minisearch";
import type { SearchDoc } from "@/lib/search-index";

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
        const ms = new MiniSearch<SearchDoc>({
          fields: ["name", "aka", "tldr", "tags", "id"],
          storeFields: ["id", "kind", "name", "tldr", "route", "status", "cancers"],
          searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2, boostDocument: (_id, _term, fields) => (fields?.kind === "page" ? 1.6 : 1) },
        });
        ms.addAll(docs);
        return { ms, docs, byId: new Map(docs.map((d) => [d.id, d])) };
      })
      .catch((error) => { cache = null; throw error; });
  }
  return cache;
}
