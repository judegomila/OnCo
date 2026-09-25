/**
 * The extractive retrieval recall and rubric score that src/lib/ask.test.ts holds to a floor, printed on their own so
 * a corpus change can be measured before and after without running the whole suite. Same path as the test: the
 * browser's index build, Ask's word search fused with the concept search, top six.
 */
import MiniSearch from "minisearch";
import { answerText, composeAnswer, recordFromEntity, retrieveIds } from "@/lib/ask";
import { benchmark, scoreAnswer } from "@/data/benchmark";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { searchDocs, type SearchDoc } from "@/lib/search-index";
import { SEARCH_INDEX_OPTIONS } from "@/lib/search-rank";
import { askLexical } from "@/lib/search-client";
import { buildSemanticIndex, semanticSearch } from "@/lib/semantic";
import { semanticDocs } from "@/lib/semantic-docs";

const g = graph();
const ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
ms.addAll(searchDocs());
const sem = buildSemanticIndex(semanticDocs());
let score = 0, recall = 0;
for (const q of benchmark) {
  const ids = retrieveIds(askLexical(ms, q.question, 12).map((id) => ({ id })), semanticSearch(sem, q.question, 12), 6);
  const records = ids.map((id) => { const e = g.must(id); return recordFromEntity(e, routeFor(e)); });
  score += scoreAnswer(q, answerText(composeAnswer(q.question, records))).score;
  recall += q.entities.length ? q.entities.filter((id) => ids.includes(id)).length / q.entities.length : 1;
}
console.log(`extractive recall ${(recall / benchmark.length).toFixed(4)}, rubric ${(score / benchmark.length).toFixed(4)}, over ${benchmark.length} questions`);
