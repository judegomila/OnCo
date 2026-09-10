/**
 * Server-side harness for Ask OnCo: the same pipeline the browser runs, fed from the graph instead of
 * fetched JSON. Used by the vitest floors and scripts/benchmark-ask.ts. Imports the corpus, so never
 * import it from a client component.
 */
import MiniSearch from "minisearch";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { searchDocs, type SearchDoc } from "./search-index";
import { buildSemanticIndex, semanticSearch } from "./semantic";
import { semanticDocs } from "./semantic-docs";
import { buildAskIndex } from "./ask-index-build";
import { answerQuestion, type AskDeps, type AskResult } from "./ask-pipeline";
import type { AskEntity, AskEntityRecord, Neighbour } from "./ask-compose";
import type { AskIndex } from "./ask-index";
import type { Region } from "@/data/regional-approvals";

export type AskHarness = {
  index: AskIndex;
  deps: AskDeps;
  /** The record loader, also handy for tests. */
  load: (id: string) => AskEntityRecord | null;
  ask: (question: string, region?: Region, opts?: { usePairs?: boolean }) => Promise<AskResult>;
  /** Plain retrieval (word plus concept, fused) as the old extractive path used it. */
  lexical: (q: string, k: number) => string[];
  concept: (q: string, k: number) => string[];
};

let cached: AskHarness | null = null;

export function askHarness(): AskHarness {
  if (cached) return cached;
  const g = graph();
  const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
  ms.addAll(searchDocs());
  const sem = buildSemanticIndex(semanticDocs());
  const index = buildAskIndex();
  const load = (id: string): AskEntityRecord | null => {
    const e = g.get(id);
    if (!e) return null;
    const neighbours: Record<string, Neighbour[]> = {};
    for (const [k, list] of g.neighbours(id)) neighbours[k] = list.map((x) => ({ id: x.id, kind: x.kind, name: x.name, route: routeFor(x) }));
    return { entity: e as unknown as AskEntity, route: routeFor(e), neighbours };
  };
  const lexical = (q: string, k: number) => ms.search(q).slice(0, k).map((h) => String(h.id));
  const concept = (q: string, k: number) => semanticSearch(sem, q, k).map((h) => h.id);
  const deps: AskDeps = { index, lexical, concept, load: async (id) => load(id) };
  cached = { index, deps, load, lexical, concept, ask: (question, region, opts) => answerQuestion(question, { ...deps, region, ...opts }) };
  return cached;
}
