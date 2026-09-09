/**
 * Scores Ask OnCo (src/lib/ask.ts) against the open benchmark (src/data/benchmark.ts) with the same
 * retrieval the browser uses: MiniSearch plus the concept index, fused, top 6 records, extractive answer.
 * The answer text (sentences with citations) is scored for rubric coverage, so this measures what a reader
 * of /ask/ actually sees, not a bag of whole records.
 *
 * Writes public/eval/ask-<date>.json in the shared format and refreshes public/eval/index.json.
 *
 *   npx tsx scripts/benchmark-ask.ts
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import MiniSearch from "minisearch";
import { benchmark, scoreAnswer, type Scored } from "../src/data/benchmark";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/schema";
import { searchDocs, type SearchDoc } from "../src/lib/search-index";
import { buildSemanticIndex, semanticSearch } from "../src/lib/semantic";
import { semanticDocs } from "../src/lib/semantic-docs";
import { answerText, composeAnswer, recordFromEntity, retrieveIds } from "../src/lib/ask";

const g = graph();
const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
ms.addAll(searchDocs());
const sem = buildSemanticIndex(semanticDocs());

const TOP = 6;
const results: Scored[] = benchmark.map((q) => {
  const lexical = ms.search(q.question).slice(0, 12).map((h) => ({ id: String(h.id) }));
  const ids = retrieveIds(lexical, semanticSearch(sem, q.question, 12), TOP);
  const records = ids.map((id) => { const e = g.must(id); return recordFromEntity(e, routeFor(e)); });
  const answer = composeAnswer(q.question, records);
  const text = answerText(answer);
  const s = scoreAnswer(q, text);
  const retrieved = q.entities.filter((id) => ids.includes(id));
  return { ...s, retrievedEntities: retrieved, retrievalRecall: q.entities.length ? retrieved.length / q.entities.length : 1, answer: text };
});

const date = new Date().toISOString().slice(0, 10);
const byCategory: Record<string, { n: number; score: number }> = {};
for (const r of results) { const c = byCategory[r.category] ?? { n: 0, score: 0 }; c.n++; c.score += r.score; byCategory[r.category] = c; }
const summary = {
  system: `OnCo Ask (extractive answer, lexical + concept retrieval, top ${TOP} records)`, date, questions: results.length,
  meanScore: Math.round((results.reduce((a, r) => a + r.score, 0) / results.length) * 1000) / 1000,
  meanRetrievalRecall: Math.round((results.reduce((a, r) => a + (r.retrievalRecall ?? 0), 0) / results.length) * 1000) / 1000,
  byCategory: Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, Math.round((v.score / v.n) * 1000) / 1000])),
  method: `For each question: MiniSearch and concept-index retrieval fused by reciprocal rank, top ${TOP} records; the extractive answer shown on /ask/ (best sentences, two per record, one citation each) is scored for rubric coverage. No language model.`,
};
const out = join(process.cwd(), "public", "eval");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, `ask-${date}.json`), JSON.stringify({ summary, results }, null, 1));
writeFileSync(join(out, "index.json"), JSON.stringify(listRuns(out), null, 1));
console.log(`eval (ask): ${results.length} questions, mean score ${summary.meanScore}, retrieval recall ${summary.meanRetrievalRecall}`);
console.log(summary.byCategory);

function listRuns(dir: string) {
  return readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort().map((f) => {
    const j = JSON.parse(readFileSync(join(dir, f), "utf8"));
    return { file: f, ...j.summary };
  });
}
