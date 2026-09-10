/**
 * Corpus-side builder for the Ask OnCo name index (see ask-index.ts). Imports the graph, so it is used only
 * by scripts, tests and server code, never by client components. scripts/build-ask.ts writes the result to
 * public/api/v1/ask-index.json.
 */
import { graph } from "./graph";
import { routeFor, type Entity } from "./schema";
import { benchmark } from "@/data/benchmark";
import { questions as patientQuestions } from "@/data/questions";
import { buildMatcher, findMatches } from "./entity-matcher";
import { deriveAliases, shortTldr, type AskIndex, type AskIndexEntry, type AskPair } from "./ask-index";
import { ASK_ALIASES } from "./ask-lexicon";

export function entryFor(e: Entity): AskIndexEntry {
  const aliases = deriveAliases({
    id: e.id, kind: e.kind, name: e.name, aka: e.aka,
    brand: e.kind === "drug" ? e.brand : undefined, code: e.kind === "drug" ? e.code : undefined,
    symbol: e.kind === "target" ? e.symbol : undefined, nct: e.kind === "trial" ? e.nct : undefined,
  });
  return { id: e.id, kind: e.kind, name: e.name, aliases, route: routeFor(e), tldr: shortTldr(e.tldr), ...(e.status ? { status: e.status } : {}) };
}

/** Lexicon ids that do not name a record: the vitest fails on any. */
export function unknownLexiconIds(): string[] {
  const g = graph();
  return Object.keys(ASK_ALIASES).filter((id) => !g.get(id));
}

export function buildAskIndex(): AskIndex {
  const g = graph();
  const entries = g.entities.map(entryFor);
  const pairs: AskPair[] = benchmark.map((q) => ({ q: q.question, ids: q.entities, source: "benchmark" as const }));
  // Patient questions: the cancer itself plus every record named in the question or its rationale.
  const m = buildMatcher(entries.flatMap((en, i) => en.aliases.map((pattern) => ({ pattern, ref: i }))));
  for (const [cancerId, list] of Object.entries(patientQuestions)) {
    if (!g.get(cancerId)) continue;
    for (const pq of list) {
      const ids = new Set<string>([cancerId]);
      for (const h of findMatches(m, `${pq.question} ${pq.why}`, { key: (i) => entries[i].id, max: 6 })) {
        const en = entries[h.ref];
        if (["drug", "trial", "term", "target", "technology", "cancer"].includes(en.kind)) ids.add(en.id);
      }
      pairs.push({ q: pq.question, ids: [...ids].slice(0, 5), source: "questions" });
    }
  }
  return { version: 1, entries, pairs };
}
