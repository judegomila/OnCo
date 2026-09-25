/**
 * Diagnoses the Ask OnCo extractive floor (src/lib/ask.test.ts "keeps the extractive path at or above its previous
 * floors"): for every benchmark question, whether each expected record is retrieved and, when not, which records
 * outrank it and why (lexical rank, concept score and matched tokens, kind, weight tags). Then the pipeline figures
 * on the benchmark and both natural sets, so a ranking change is measured everywhere at once.
 *
 *   npx tsx ask-retrieval-diag.ts            summary plus every miss (run from scripts/)
 *   npx tsx ask-retrieval-diag.ts --quiet    recall figures only
 *   npx tsx ask-retrieval-diag.ts --stats    aggregate: where the missed records rank, which kinds fill the lists, one line a question
 *   EXCLUDE=wave4 npx tsx ask-retrieval-diag.ts --stats   the same with one tagged wave left out; diff the Q lines to see what it displaced
 *
 * Uses the same word search as the browser (search-client.ts askLexical) and the same concept index build, so the
 * figures agree with the floors in src/lib/ask.test.ts.
 */
import MiniSearch from "minisearch";
import { benchmark, scoreAnswer } from "../src/data/benchmark";
import { askEval, askEvalNew, scoreAskEval } from "../src/data/ask-eval";
import { answerText, composeAnswer, recordFromEntity, retrieveIds } from "../src/lib/ask";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/kinds";
import { searchDocs, type SearchDoc } from "../src/lib/search-index";
import { normaliseName, SEARCH_INDEX_OPTIONS } from "../src/lib/search-rank";
import { askLexical } from "../src/lib/search-client";
import { buildSemanticIndex, semanticSearch } from "../src/lib/semantic";
import { semanticDocs } from "../src/lib/semantic-docs";
import { askHarness } from "../src/lib/ask-harness";

const quiet = process.argv.includes("--quiet");
const stats = process.argv.includes("--stats");
const inQuestion = (question: string, e: { name: string; aka: string[] }) => { const q = " " + normaliseName(question) + " "; return [e.name, ...e.aka].some((n) => { const x = normaliseName(n); return x.length > 2 && q.includes(" " + x + " "); }); };
const count = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);
const S = { missLex: new Map<string, number>(), missSem: new Map<string, number>(), missKind: new Map<string, number>(), missNamed: 0, missTotal: 0, hitNamed: 0, hitTotal: 0, wrongKind: new Map<string, number>(), wrongNamed: 0, wrongTotal: 0, lexTopKind: new Map<string, number>(), semTopKind: new Map<string, number>() };
const bucket = (i: number) => (i < 0 ? "absent" : i < 6 ? "1-6" : i < 12 ? "7-12" : i < 30 ? "13-30" : i < 100 ? "31-100" : ">100");
const g = graph();
const ms = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS);
const EXCLUDE = process.env.EXCLUDE; // A tag to leave out of both indexes (EXCLUDE=wave4), to attribute a recall change to one wave.
const skip = (id: string) => !!EXCLUDE && !!g.get(id)?.tags.includes(EXCLUDE);
ms.addAll(searchDocs().filter((d) => !skip(d.id)));
const docs = semanticDocs().filter((d) => !skip(d.id));
const sem = buildSemanticIndex(docs);
const weightOf = new Map(docs.map((d) => [d.id, d.weight ?? 1]));
const r3 = (x: number) => Math.round(x * 1000) / 1000;

const tagOf = (id: string) => { const e = g.get(id); if (!e) return "?"; const t = e.tags.filter((x) => /ingest|wave|generated|catalogue/.test(x)); return `${e.kind}${t.length ? "[" + t.join(",") + "]" : ""} w=${weightOf.get(id) ?? 1}`; };

let score = 0, recall = 0, questions = 0, misses = 0;
for (const q of benchmark) {
  const lexAll = askLexical(ms, q.question, 500).map((id) => ({ id, score: 0 }));
  const lex = lexAll.slice(0, 12);
  const semAll = semanticSearch(sem, q.question, 60);
  const semTop = semAll.slice(0, 12);
  const ids = retrieveIds(lex, semTop, 6);
  const records = ids.map((id) => { const e = g.must(id); return recordFromEntity(e, routeFor(e)); });
  const s = scoreAnswer(q, answerText(composeAnswer(q.question, records))).score;
  const hit = q.entities.filter((id) => ids.includes(id));
  const r = q.entities.length ? hit.length / q.entities.length : 1;
  score += s; recall += r; questions++;
  if (stats) {
    console.log(`Q ${q.id} ${hit.length}/${q.entities.length} ${ids.join(",")} MISS ${q.entities.filter((id) => !ids.includes(id)).join(",")}`);
    for (const h of lexAll.slice(0, 12)) count(S.lexTopKind, tagOf(String(h.id)).split(" ")[0]);
    for (const h of semTop) count(S.semTopKind, tagOf(h.id).split(" ")[0]);
    for (const id of ids) if (!q.entities.includes(id)) { S.wrongTotal++; count(S.wrongKind, tagOf(id).split(" ")[0]); if (inQuestion(q.question, g.must(id))) S.wrongNamed++; }
    for (const id of q.entities) {
      const e = g.get(id); if (!e) continue;
      if (ids.includes(id)) { S.hitTotal++; if (inQuestion(q.question, e)) S.hitNamed++; continue; }
      S.missTotal++; count(S.missKind, tagOf(id).split(" ")[0]); if (inQuestion(q.question, e)) S.missNamed++;
      count(S.missLex, bucket(lexAll.findIndex((h) => String(h.id) === id)));
      count(S.missSem, bucket(semAll.findIndex((h) => h.id === id)));
    }
    continue;
  }
  if (quiet || r === 1) continue;
  console.log(`\n## ${q.id}  recall ${hit.length}/${q.entities.length}  rubric ${r3(s)}  "${q.question}"`);
  console.log(`   retrieved: ${ids.map((id, i) => `${i + 1}.${id}(${tagOf(id)})`).join("  ")}`);
  for (const id of q.entities) {
    if (ids.includes(id)) continue;
    misses++;
    const li = lexAll.findIndex((h) => String(h.id) === id);
    const si = semAll.findIndex((h) => h.id === id);
    const sh = si >= 0 ? semAll[si] : undefined;
    console.log(`   MISS ${id} (${tagOf(id)}): lexical rank ${li >= 0 ? li + 1 : "-"}${li >= 0 ? ` score ${r3(lexAll[li].score)}` : ""}; concept rank ${si >= 0 ? si + 1 : "-"}${sh ? ` score ${sh.score} [${sh.matched.slice(0, 5).join(" ")}]` : ""}`);
    if (li !== 0) console.log(`      lexical above: ${lexAll.slice(0, Math.min(li < 0 ? 12 : li, 12)).map((h) => `${h.id}(${tagOf(String(h.id))} ${r3(h.score)})`).join(", ")}`);
    if (si !== 0) console.log(`      concept above: ${semAll.slice(0, Math.min(si < 0 ? 12 : si, 12)).map((h) => `${h.id}(${tagOf(h.id)} ${h.score} [${h.matched.slice(0, 3).join(" ")}])`).join(", ")}`);
  }
}
if (stats) { const show = (m: Map<string, number>) => [...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(" "); console.log(`misses ${S.missTotal} (named in question ${S.missNamed}); hits ${S.hitTotal} (named ${S.hitNamed}); wrong retrieved ${S.wrongTotal} (named ${S.wrongNamed})\n miss lexical rank: ${show(S.missLex)}\n miss concept rank: ${show(S.missSem)}\n miss kinds: ${show(S.missKind)}\n wrong kinds: ${show(S.wrongKind)}\n lexical top12 kinds: ${show(S.lexTopKind)}\n concept top12 kinds: ${show(S.semTopKind)}`); }
console.log(`\nExtractive benchmark: recall ${r3(recall / questions)} rubric ${r3(score / questions)} (${misses} expected records missed)`);

(async () => {
  const h = askHarness();
  let bScore = 0, bRecall = 0;
  for (const q of benchmark) {
    const a = await h.ask(q.question, "US");
    bScore += scoreAnswer(q, answerText(a)).score;
    const ids = a.consulted.map((s) => s.id);
    bRecall += q.entities.length ? q.entities.filter((id) => ids.includes(id)).length / q.entities.length : 1;
  }
  console.log(`Pipeline benchmark: recall ${r3(bRecall / benchmark.length)} rubric ${r3(bScore / benchmark.length)}`);
  for (const [name, set] of [["natural", askEval], ["natural-2", askEvalNew]] as const) {
    let s = 0, r = 0;
    for (const q of set) {
      const a = await h.ask(q.question, "US");
      const sc = scoreAskEval(q, answerText(a), a.consulted.map((x) => x.id));
      s += sc.score; r += sc.retrievalRecall;
      if (!quiet && sc.retrievalRecall < 1) console.log(`   ${name} ${q.id}: recall ${r3(sc.retrievalRecall)} rubric ${r3(sc.score)} consulted ${a.consulted.map((x) => x.id).join(",")}`);
    }
    console.log(`Pipeline ${name}: recall ${r3(r / set.length)} rubric ${r3(s / set.length)}`);
  }
})();
