/**
 * Scores Ask OnCo against the open benchmark (src/data/benchmark.ts, 100 questions) and the natural-question
 * set (src/data/ask-eval.ts, 60 questions), before and after:
 *
 *   before  the extractive path alone: MiniSearch plus the concept index, fused, top 6 records, best sentences
 *   after   the intent-and-entity pipeline (src/lib/ask-pipeline.ts): named records resolved, templated cited
 *           answer, extractive fallback; the same thing the browser runs on /ask/
 *
 * The answer text (sentences with citations plus the source list) is scored for rubric coverage, so this
 * measures what a reader of /ask/ actually sees. Recall is the share of each question's expected records
 * among those the answer read.
 *
 * Writes public/eval/ask-<date>.json (benchmark, "after", shared leaderboard format), refreshes
 * public/eval/index.json, and writes public/eval/ask-natural/<date>.json for the natural set.
 *
 *   npx tsx scripts/benchmark-ask.ts            summary tables
 *   npx tsx scripts/benchmark-ask.ts --show     also print every "after" answer
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { benchmark, scoreAnswer, type Scored } from "../src/data/benchmark";
import { askEval, scoreAskEval, type AskEvalScored } from "../src/data/ask-eval";
import { answerText, composeAnswer, recordFromEntity, retrieveIds } from "../src/lib/ask";
import { askHarness } from "../src/lib/ask-harness";

const show = process.argv.includes("--show");
const h = askHarness();
const TOP = 6;

/** The previous system: retrieval plus extractive sentences, unchanged. */
function before(question: string): { text: string; ids: string[] } {
  const ids = retrieveIds(h.lexical(question, 12).map((id) => ({ id })), h.concept(question, 12).map((id) => ({ id })), TOP);
  const records = ids.map((id) => { const r = h.load(id)!; return recordFromEntity(r.entity, r.route); });
  return { text: answerText(composeAnswer(question, records)), ids };
}

async function after(question: string, usePairs = true): Promise<{ text: string; ids: string[]; intent: string; template: string; entities: string[] }> {
  const a = await h.ask(question, "US", { usePairs });
  return { text: answerText(a), ids: a.consulted.map((s) => s.id), intent: a.intent, template: a.template, entities: a.entities.map((e) => e.id) };
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const pct = (x: number) => `${Math.round(x * 100)}%`;

(async () => {
  // ---- open benchmark ----
  const bBefore: Scored[] = [], bAfter: Scored[] = [], bNoPairs: Scored[] = [];
  const intents: Record<string, number> = {}, templates: Record<string, number> = {};
  for (const q of benchmark) {
    const b = before(q.question);
    const sb = scoreAnswer(q, b.text);
    const rb = q.entities.filter((id) => b.ids.includes(id));
    bBefore.push({ ...sb, retrievedEntities: rb, retrievalRecall: q.entities.length ? rb.length / q.entities.length : 1 });
    // The benchmark questions are themselves curated pairs, so also measure the pipeline with pairs switched off.
    const np = await after(q.question, false);
    const snp = scoreAnswer(q, np.text);
    const rnp = q.entities.filter((id) => np.ids.includes(id));
    bNoPairs.push({ ...snp, retrievedEntities: rnp, retrievalRecall: q.entities.length ? rnp.length / q.entities.length : 1 });
    const a = await after(q.question);
    const sa = scoreAnswer(q, a.text);
    const ra = q.entities.filter((id) => a.ids.includes(id));
    bAfter.push({ ...sa, retrievedEntities: ra, retrievalRecall: q.entities.length ? ra.length / q.entities.length : 1, answer: a.text });
    intents[a.intent] = (intents[a.intent] ?? 0) + 1;
    templates[a.template] = (templates[a.template] ?? 0) + 1;
    if (show) console.log(`\n### ${q.id} [${a.intent}/${a.template}] ${q.question}\n${a.text}\nscore ${sa.score.toFixed(2)} (missed: ${sa.missed.join(" | ") || "none"}), recall ${(ra.length / Math.max(1, q.entities.length)).toFixed(2)}`);
  }
  const byCat = (rs: Scored[]) => { const m: Record<string, number[]> = {}; for (const r of rs) (m[r.category] ??= []).push(r.score); return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, r3(mean(v))])); };

  // ---- natural questions ----
  const nBefore: AskEvalScored[] = [], nAfter: AskEvalScored[] = [];
  for (const q of askEval) {
    const b = before(q.question);
    nBefore.push(scoreAskEval(q, b.text, b.ids));
    const a = await after(q.question);
    const s = scoreAskEval(q, a.text, a.ids);
    nAfter.push(s);
    if (show) console.log(`\n### ${q.id} [${a.intent}/${a.template}] ${q.question}\n${a.text}\nscore ${s.score.toFixed(2)} (missed: ${s.missed.join(" | ") || "none"}), recall ${s.retrievalRecall.toFixed(2)}`);
  }
  const byAud = (rs: AskEvalScored[]) => { const m: Record<string, number[]> = {}; for (const r of rs) (m[r.audience] ??= []).push(r.score); return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, r3(mean(v))])); };

  const date = new Date().toISOString().slice(0, 10);
  const summary = {
    system: "OnCo Ask (intents, entity resolution, templated cited answers; extractive fallback)", date, questions: bAfter.length,
    meanScore: r3(mean(bAfter.map((r) => r.score))), meanRetrievalRecall: r3(mean(bAfter.map((r) => r.retrievalRecall ?? 0))),
    byCategory: byCat(bAfter),
    method: "For each question: intent from wording rules; records named in the question resolved by longest match over names and aliases; a template per intent fills sentences from those records' structured fields (TL;DR first), each sentence cited; curated benchmark and patient-question pairs supply records when the question matches closely; sentence retrieval (MiniSearch plus concept index, fused) is the fallback and adds detail. The answer text shown on /ask/ is scored for rubric coverage. No language model.",
    before: { system: `OnCo Ask (extractive answer, lexical + concept retrieval, top ${TOP} records)`, meanScore: r3(mean(bBefore.map((r) => r.score))), meanRetrievalRecall: r3(mean(bBefore.map((r) => r.retrievalRecall ?? 0))), byCategory: byCat(bBefore) },
    withoutCuratedPairs: { meanScore: r3(mean(bNoPairs.map((r) => r.score))), meanRetrievalRecall: r3(mean(bNoPairs.map((r) => r.retrievalRecall ?? 0))), byCategory: byCat(bNoPairs) },
    intents, templates,
  };
  const out = join(process.cwd(), "public", "eval");
  mkdirSync(join(out, "ask-natural"), { recursive: true });
  writeFileSync(join(out, `ask-${date}.json`), JSON.stringify({ summary, results: bAfter }, null, 1));
  writeFileSync(join(out, "index.json"), JSON.stringify(listRuns(out), null, 1));
  const natural = {
    summary: {
      system: summary.system, date, questions: nAfter.length, set: "src/data/ask-eval.ts (60 natural questions: patient, clinician, investor)",
      meanScore: r3(mean(nAfter.map((r) => r.score))), meanRetrievalRecall: r3(mean(nAfter.map((r) => r.retrievalRecall))), byAudience: byAud(nAfter),
      before: { system: summary.before.system, meanScore: r3(mean(nBefore.map((r) => r.score))), meanRetrievalRecall: r3(mean(nBefore.map((r) => r.retrievalRecall))), byAudience: byAud(nBefore) },
    },
    results: nAfter,
  };
  writeFileSync(join(out, "ask-natural", `${date}.json`), JSON.stringify(natural, null, 1));

  console.log(`\nAsk OnCo evaluation, ${date}`);
  console.log(`open benchmark (${benchmark.length})   before: rubric ${pct(summary.before.meanScore)}, recall ${pct(summary.before.meanRetrievalRecall)}   after: rubric ${pct(summary.meanScore)}, recall ${pct(summary.meanRetrievalRecall)}`);
  console.log(`  by category before ${JSON.stringify(summary.before.byCategory)} after ${JSON.stringify(summary.byCategory)}`);
  console.log(`  after, curated pairs switched off: rubric ${pct(summary.withoutCuratedPairs.meanScore)}, recall ${pct(summary.withoutCuratedPairs.meanRetrievalRecall)} ${JSON.stringify(summary.withoutCuratedPairs.byCategory)}`);
  console.log(`natural set (${askEval.length})       before: rubric ${pct(natural.summary.before.meanScore)}, recall ${pct(natural.summary.before.meanRetrievalRecall)}   after: rubric ${pct(natural.summary.meanScore)}, recall ${pct(natural.summary.meanRetrievalRecall)}`);
  console.log(`  by audience before ${JSON.stringify(natural.summary.before.byAudience)} after ${JSON.stringify(natural.summary.byAudience)}`);
  console.log(`intents ${JSON.stringify(intents)}\ntemplates ${JSON.stringify(templates)}`);
  const worse = bAfter.filter((r, i) => r.score < bBefore[i].score).map((r) => r.id);
  if (worse.length) console.log(`benchmark questions scoring lower than before: ${worse.join(", ")}`);
  const missedN = nAfter.filter((r) => r.score < 1).map((r) => `${r.id}(${r.missed.join("|")})`);
  if (missedN.length) console.log(`natural questions with missed rubric points: ${missedN.join(", ")}`);
})();

function listRuns(dir: string) {
  return readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort().map((f) => {
    const j = JSON.parse(readFileSync(join(dir, f), "utf8"));
    return { file: f, ...j.summary };
  });
}
