import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { benchmark, type Category } from "@/data/benchmark";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = pageMeta({ title: "Open evaluation", description: "A public benchmark of 100 questions a patient or clinician might ask, scored against OnCo and any other system with the same rubric.", path: "/eval/" });

type RunSummary = { file: string; system: string; date: string; questions: number; meanScore: number; meanRetrievalRecall?: number; byCategory: Record<string, number>; method: string };
type RunResult = { id: string; score: number; met: number; total: number; missed: string[]; retrievalRecall?: number };

function loadRuns(): { runs: RunSummary[]; latestOnco?: { summary: RunSummary; results: RunResult[] } } {
  const dir = join(process.cwd(), "public", "eval");
  if (!existsSync(dir)) return { runs: [] };
  const files = readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort();
  const runs: RunSummary[] = files.map((f) => ({ file: f, ...JSON.parse(readFileSync(join(dir, f), "utf8")).summary }));
  const oncoFile = files.filter((f) => f.startsWith("onco-")).pop();
  const latestOnco = oncoFile ? (JSON.parse(readFileSync(join(dir, oncoFile), "utf8")) as { summary: RunSummary; results: RunResult[] }) : undefined;
  if (latestOnco) latestOnco.summary.file = oncoFile!;
  return { runs, latestOnco };
}

const CAT_LABEL: Record<Category, string> = { factual: "Factual", procedural: "Procedural", reasoning: "Reasoning" };
const pct = (x: number) => `${Math.round(x * 100)}%`;
const tone = (x: number) => statusClass(x >= 0.75 ? "approved" : x >= 0.5 ? "phase-2" : "negative");

export default function EvalPage() {
  const g = graph();
  const { runs, latestOnco } = loadRuns();
  const byId = new Map((latestOnco?.results ?? []).map((r) => [r.id, r]));
  const cats: Category[] = ["factual", "procedural", "reasoning"];
  const counts = Object.fromEntries(cats.map((c) => [c, benchmark.filter((q) => q.category === c).length]));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Open evaluation"
        lede="One hundred questions a patient, carer, clinician, or analyst might ask, each with a grounded expected answer and a rubric of must-mention points. The same rubric scores OnCo, a search engine, or an AI assistant. Scores are published here in public, every run." />
      <Container className="pb-16">
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="card p-4"><div className="kicker mb-1">Questions</div><div className="text-2xl font-semibold tabular-nums">{benchmark.length}</div><div className="text-xs text-muted">{cats.map((c) => `${counts[c]} ${CAT_LABEL[c].toLowerCase()}`).join(" · ")}</div></div>
          <div className="card p-4"><div className="kicker mb-1">OnCo latest score</div><div className="text-2xl font-semibold tabular-nums">{latestOnco ? pct(latestOnco.summary.meanScore) : "-"}</div><div className="text-xs text-muted">{latestOnco ? `${latestOnco.summary.date} · retrieval recall ${pct(latestOnco.summary.meanRetrievalRecall ?? 0)}` : "run npm run bench"}</div></div>
          <div className="card p-4"><div className="kicker mb-1">Systems scored</div><div className="text-2xl font-semibold tabular-nums">{new Set(runs.map((r) => r.system)).size}</div><div className="text-xs text-muted">{runs.length} run{runs.length === 1 ? "" : "s"} on file</div></div>
        </section>

        <h2 className="text-xl font-semibold mt-10 mb-3">Leaderboard</h2>
        <div className="card overflow-x-auto">
          <table className="onco">
            <thead><tr><th>System</th><th>Date</th><th>Mean</th>{cats.map((c) => <th key={c}>{CAT_LABEL[c]}</th>)}<th>Method</th></tr></thead>
            <tbody>
              {runs.length === 0 && <tr><td colSpan={7} className="text-muted">No runs yet.</td></tr>}
              {[...runs].sort((a, b) => b.meanScore - a.meanScore).map((r) => (
                <tr key={r.file}>
                  <td className="font-medium">{r.system}</td>
                  <td className="tabular-nums text-muted">{r.date}</td>
                  <td><span className={`chip ${tone(r.meanScore)}`}>{pct(r.meanScore)}</span></td>
                  {cats.map((c) => <td key={c} className="tabular-nums">{r.byCategory[c] !== undefined ? pct(r.byCategory[c]) : "-"}</td>)}
                  <td className="text-xs text-muted max-w-md">{r.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-2 max-w-3xl">OnCo&apos;s own run is a deliberately hard retrieval proxy: it scores only the TL;DR and summary text of the top eight search hits, with no reasoning layer. A human reading the linked pages would score higher; that gap is part of what the benchmark measures.</p>

        <h2 className="text-xl font-semibold mt-10 mb-3">Score another system</h2>
        <div className="card p-4 text-sm space-y-2">
          <p>1. Download the questions: <a className="underline" href="/api/v1/benchmark.json">benchmark.json</a> (also in the repo at <code>src/data/benchmark.ts</code>).</p>
          <p>2. Ask each question to the system under test, verbatim, and save the answers as <code>{`{ "<question id>": "answer text", … }`}</code>.</p>
          <p>3. Run <code>npm run bench:score -- answers.json &quot;System name&quot;</code> and open a pull request with the generated file in <code>public/eval/</code>. The rubric is public; the only judgement is substring matching, so scores are reproducible and disputable.</p>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-3">The questions</h2>
        <div className="card overflow-x-auto">
          <table className="onco">
            <thead><tr><th>#</th><th>Question</th><th>Category</th><th>Level</th><th>Grounded in</th><th>OnCo</th></tr></thead>
            <tbody>
              {benchmark.map((q) => {
                const r = byId.get(q.id);
                return (
                  <tr key={q.id}>
                    <td className="text-muted text-xs">{q.id}</td>
                    <td className="min-w-[280px]"><div className="font-medium">{q.question}</div><details className="text-xs text-muted mt-1"><summary className="cursor-pointer">Expected answer and rubric</summary><p className="mt-1">{q.expected}</p><ul className="list-disc pl-4 mt-1">{q.rubric.map((r, i) => <li key={i}>{r.join(" / ")}</li>)}</ul></details></td>
                    <td className="text-muted">{CAT_LABEL[q.category]}</td>
                    <td className="tabular-nums text-muted">{q.difficulty}</td>
                    <td className="text-xs">{q.entities.map((id) => { const e = g.get(id); return e ? <Link key={id} href={routeFor(e)} className="underline mr-1.5">{e.name}</Link> : null; })}</td>
                    <td>{r ? <span className={`chip ${tone(r.score)}`} title={r.missed.length ? `Missed: ${r.missed.join("; ")}` : "All rubric points met"}>{r.met}/{r.total}</span> : <span className="text-muted">-</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
