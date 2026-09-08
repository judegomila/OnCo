/**
 * Score another system's answers against the OnCo benchmark with the same rubric.
 *
 *   npm run bench:score -- answers.json "System name"
 *
 * answers.json: { "<question id>": "free-text answer", ... }  (missing ids score 0)
 * Writes public/eval/<slug>-<date>.json and refreshes public/eval/index.json.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { benchmark, scoreAnswer, type Scored } from "../src/data/benchmark";

const [file, systemName = "external"] = process.argv.slice(2);
if (!file) { console.error("usage: tsx scripts/benchmark-score.ts answers.json \"System name\""); process.exit(1); }
const answers = JSON.parse(readFileSync(file, "utf8")) as Record<string, string>;

const results: Scored[] = benchmark.map((q) => ({ ...scoreAnswer(q, answers[q.id] ?? ""), answer: answers[q.id] ?? "" }));
const date = new Date().toISOString().slice(0, 10);
const byCategory: Record<string, { n: number; score: number }> = {};
for (const r of results) { const c = byCategory[r.category] ?? { n: 0, score: 0 }; c.n++; c.score += r.score; byCategory[r.category] = c; }
const summary = {
  system: systemName, date, questions: results.length,
  meanScore: Math.round((results.reduce((a, r) => a + r.score, 0) / results.length) * 1000) / 1000,
  byCategory: Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, Math.round((v.score / v.n) * 1000) / 1000])),
  method: "Rubric coverage of the supplied free-text answer. 1 point per rubric item met, normalised to 0-1.",
};
const out = join(process.cwd(), "public", "eval");
mkdirSync(out, { recursive: true });
const slug = systemName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
writeFileSync(join(out, `${slug}-${date}.json`), JSON.stringify({ summary, results }, null, 1));
const runs = readdirSync(out).filter((f) => f.endsWith(".json") && f !== "index.json").sort().map((f) => ({ file: f, ...JSON.parse(readFileSync(join(out, f), "utf8")).summary }));
writeFileSync(join(out, "index.json"), JSON.stringify(runs, null, 1));
console.log(`${systemName}: mean ${summary.meanScore}`, summary.byCategory);
