# Wiring for batch I: AI, search and graph power

Everything in this batch ships standalone and is testable now. The lines below connect it to the shared files that batch I may not edit. Apply after merge, in the main session.

## 1. `package.json`

Add the build-time index scripts to `build:api` so every deployment ships the concept index, similar pages, triples and context files (all write under the gitignored `public/api/v1/`; `build-context.ts` also refreshes the committed `public/llms.txt`):

```json
"build:api": "tsx scripts/build-api.ts && tsx scripts/embed.ts && tsx scripts/build-similar.ts && tsx scripts/build-triples.ts && tsx scripts/build-context.ts",
```

New standalone scripts:

```json
"bench:ask": "tsx scripts/benchmark-ask.ts",
"fetch:wikidata": "tsx scripts/fetch-wikidata.ts",
```

No new dependencies. Item 81 in the plan suggested transformers.js; the batch instructions ruled out new dependencies and external models, so the concept index is a deterministic TF-IDF index (see `src/lib/semantic.ts`). `mcp/package.json` is metadata for a future `onco-mcp` publish and is not a workspace; nothing to add.

## 2. `src/lib/nav.ts`

In the `find` group, after Explore:

```ts
{ href: "/search/", label: "Search", blurb: "Word and concept search side by side, each result explaining why it matched." },
{ href: "/ask/", label: "Ask OnCo", blurb: "A question in plain words, answered only with cited sentences from OnCo records." },
{ href: "/path/", label: "Path finder", blurb: "How any two objects are related: shortest routes with every relationship named." },
```

## 3. `src/components/EntityDetail.tsx` (item 85, Pages like this)

```ts
import { similarLinks } from "@/lib/similar";
```

Line 112 (the Connected tab):

```tsx
{ id: "connected", label: "Connected", count: nCon, content: <Neighbours groups={neighbours} similar={similarLinks(e.id)} /> },
```

`similarLinks` is memoised across the build (one all-pairs pass, about three seconds), so per-page cost is a map lookup. The cancer "Everything relevant" tab at line 553 can take the same prop if wanted.

## 4. `src/components/CompareView.tsx` (item 86, link from Compare)

Where the chosen items are rendered (after the FacetSelect row), when exactly two are chosen:

```tsx
{chosen.length === 2 && <Link href={`/path/?from=${chosen[0].id}&to=${chosen[1].id}`} className="text-sm underline">How are these two related?</Link>}
```

## 5. `src/components/CommandPalette.tsx`

Add to `PAGES`:

```ts
{ id: "p-search", name: "Search: words and concepts", tldr: "Full results with the reason each matched", route: "/search/", action: true },
{ id: "p-ask", name: "Ask OnCo", tldr: "A cited answer assembled from record sentences", route: "/ask/", action: true },
{ id: "p-path", name: "Path finder", tldr: "Shortest routes between any two objects", route: "/path/", action: true },
```

## 6. `src/app/api/page.tsx` (batch F owns this page; rows to add)

```tsx
<tr><td><a className="underline font-mono text-sm" href="/api/v1/embeddings.json">/api/v1/embeddings.json</a> + <span className="font-mono text-sm">embeddings.bin</span></td><td>Concept-search index: TF-IDF sparse unit vectors per record (ids, vocabulary and idf in the JSON; vectors in the binary). Built by <code>scripts/embed.ts</code>.</td></tr>
<tr><td><a className="underline font-mono text-sm" href="/api/v1/similar.json">/api/v1/similar.json</a></td><td>Up to eight similar records per id (weighted Jaccard of neighbour sets plus tag overlap) with the shared links that explain each match.</td></tr>
<tr><td><a className="underline font-mono text-sm" href="/api/v1/onco.nt">/api/v1/onco.nt</a></td><td>The graph as RDF N-Triples: schema.org types and properties, an OnCo namespace for typed relationships, <code>owl:sameAs</code> to Wikidata for {Object.keys(wikidataIds).length} records.</td></tr>
<tr><td><a className="underline font-mono text-sm" href="/api/v1/context/index.md">/api/v1/context/&lt;id&gt;.md</a></td><td>One clean Markdown file per record for RAG and AI crawlers: TL;DR, summary, fields, sources, connected records. Index at <code>index.md</code>; site-level <a className="underline" href="/llms.txt">/llms.txt</a>.</td></tr>
```

with `import { wikidataIds } from "@/data/wikidata-ids";`.

## 7. `src/app/robots.ts`

`/api/v1/` is disallowed, which also hides the context files from crawlers that honour robots. If the intent of item 90 is to be crawled, add an allow rule ahead of the disallow:

```ts
rules: [{ userAgent: "*", allow: ["/", "/api/v1/context/"], disallow: ["/api/v1/"] }],
```

`/llms.txt` sits at the root and is already allowed.

## 8. `src/app/eval/page.tsx`

`scripts/benchmark-ask.ts` writes `public/eval/ask-<date>.json` (prefix `ask-` so the page's `onco-*` selection of the canonical OnCo run is untouched). The run appears in `index.json` and the leaderboard automatically. If a dedicated row is wanted, filter `files` for `ask-` the same way `oncoFile` is chosen.

## 9. `src/data/index.ts`

No new entity arrays in this batch. `src/data/wikidata-ids.ts` is a keyed side file (record id to QID), validated implicitly by `scripts/build-triples.ts` which throws on unknown ids via `graph().must`.

## 10. Data refresh

`npm run fetch:wikidata` re-resolves QIDs from Wikipedia titles (837 of 934 linked records resolved on 2026-09-09; the rest are redirects or articles Wikidata does not map). Commit the regenerated `src/data/wikidata-ids.ts`.
