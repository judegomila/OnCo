/**
 * OnCo self-evaluation against the open benchmark (src/data/benchmark.ts).
 *
 * Deterministic proxy for "can a reader find the answer on OnCo": for each question, retrieve the
 * top entities with MiniSearch over the same index the site uses, concatenate their tldr + summary,
 * and score rubric coverage (each rubric point is a list of accepted phrases; a point is met if
 * any phrase appears). Also reports whether the expected entity ids were retrieved.
 *
 * Writes public/eval/onco-<date>.json in the shared answers/scores format so other systems can be
 * scored identically with scripts/benchmark-score.ts.
 *
 * Run: npm run bench
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import MiniSearch from "minisearch";
import { benchmark, scoreAnswer, type Scored } from "../src/data/benchmark";
import { graph } from "../src/lib/graph";
import { searchDocs, type SearchDoc } from "../src/lib/search-index";

const g = graph();
const docs = searchDocs();
const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
ms.addAll(docs);

const TOP = 8;
const results: Scored[] = benchmark.map((q) => {
  const hits = ms.search(q.question).slice(0, TOP).map((h) => String(h.id));
  const text = hits.map((id) => { const e = g.get(id); return e ? `${e.name}. ${e.tldr} ${e.summary}` : ""; }).join("\n");
  const s = scoreAnswer(q, text);
  const retrieved = q.entities.filter((id) => hits.includes(id));
  return { ...s, retrievedEntities: retrieved, retrievalRecall: q.entities.length ? retrieved.length / q.entities.length : 1, answer: hits.join(", ") };
});

const date = new Date().toISOString().slice(0, 10);
const byCategory: Record<string, { n: number; score: number }> = {};
for (const r of results) { const c = byCategory[r.category] ?? { n: 0, score: 0 }; c.n++; c.score += r.score; byCategory[r.category] = c; }
const summary = {
  system: "OnCo (search-retrieval proxy, top 8 entities)", date, questions: results.length,
  meanScore: Math.round((results.reduce((a, r) => a + r.score, 0) / results.length) * 1000) / 1000,
  meanRetrievalRecall: Math.round((results.reduce((a, r) => a + (r.retrievalRecall ?? 0), 0) / results.length) * 1000) / 1000,
  byCategory: Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, Math.round((v.score / v.n) * 1000) / 1000])),
  method: "For each question: MiniSearch retrieval over the site index; rubric coverage of tldr+summary of the top entities. 1 point per rubric item met, normalised to 0-1.",
};
const out = join(process.cwd(), "public", "eval");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, `onco-${date}.json`), JSON.stringify({ summary, results }, null, 1));
writeFileSync(join(out, "index.json"), JSON.stringify(listRuns(out), null, 1));
console.log(`eval: ${results.length} questions, mean score ${summary.meanScore}, retrieval recall ${summary.meanRetrievalRecall}`);
console.log(summary.byCategory);

function listRuns(dir: string) {
  return readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort().map((f) => {
    const j = JSON.parse(readFileSync(join(dir, f), "utf8"));
    return { file: f, ...j.summary };
  });
}
