"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { loadSearch } from "./SearchBox";
import { loadSemantic } from "@/lib/semantic-client";
import { semanticSearch } from "@/lib/semantic";
import { answerText, composeAnswer, recordFromEntity, retrieveIds, type Answer, type AskRecord, type EntityLike } from "@/lib/ask";
import { KIND_META } from "@/lib/schema";
import { KIND_COLOR } from "@/lib/text";

export type AskExample = { question: string; audience: string };

type State = { status: "idle" } | { status: "working"; step: string } | { status: "done"; answer: Answer; consulted: AskRecord[] } | { status: "error"; message: string };

const RETRIEVE = 6;

/**
 * Ask OnCo. Retrieval in the browser (word search plus concept search over the static indexes), then an
 * extractive answer: the best sentences from the retrieved records, copied verbatim, one citation each.
 * There is no language model and nothing leaves the browser.
 */
export function AskOnco({ examples }: { examples: AskExample[] }) {
  const [q, setQ] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const latest = useRef("");

  const ask = useCallback(async (question: string) => {
    const value = question.trim();
    latest.current = value;
    if (!value) { setState({ status: "idle" }); return; }
    setState({ status: "working", step: "Loading indexes" });
    try {
      const [{ ms }, index] = await Promise.all([loadSearch(), loadSemantic()]);
      if (latest.current !== value) return;
      setState({ status: "working", step: "Finding records" });
      const lexical = ms.search(value).slice(0, 12).map((h) => ({ id: String(h.id) }));
      const concept = index ? semanticSearch(index, value, 12) : [];
      const ids = retrieveIds(lexical, concept, RETRIEVE);
      setState({ status: "working", step: `Reading ${ids.length} records` });
      const records = (await Promise.all(ids.map(async (id) => {
        const r = await fetch(`/api/v1/entities/${id}.json`);
        if (!r.ok) return null;
        const j = (await r.json()) as { entity: EntityLike; route: string };
        return recordFromEntity(j.entity, j.route);
      }))).filter((r): r is AskRecord => !!r);
      if (latest.current !== value) return;
      setState({ status: "done", answer: composeAnswer(value, records), consulted: records });
    } catch (e) {
      setState({ status: "error", message: e instanceof Error ? e.message : "Something went wrong" });
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const initial = new URLSearchParams(window.location.search).get("q") ?? "";
      if (initial) { setQ(initial); ask(initial); }
    });
    return () => cancelAnimationFrame(id);
  }, [ask]);

  const submit = (value: string) => {
    setQ(value);
    const p = new URLSearchParams();
    if (value.trim()) p.set("q", value.trim());
    window.history.replaceState(null, "", p.toString() ? `?${p}` : window.location.pathname);
    ask(value);
  };

  const copy = async (a: Answer) => {
    try { await navigator.clipboard.writeText(answerText(a)); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] [&>*]:min-w-0">
      <div>
        <form onSubmit={(e) => { e.preventDefault(); submit(q); }} className="flex flex-wrap gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="What is the survival benefit of sacituzumab govitecan in TNBC?" aria-label="Your question" className="flex-1 min-w-[16rem] rounded-lg border border-border bg-card px-3 py-3 text-base outline-none focus:ring-2 focus:ring-accent/40" />
          <button type="submit" className="rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium">Ask</button>
        </form>
        <p className="mt-2 text-xs text-muted">Answers are assembled from OnCo records, not generated. Each sentence is copied from a record page and numbered so you can check it. Not medical advice.</p>

        {state.status === "working" && <p className="mt-6 text-sm text-muted">{state.step}…</p>}
        {state.status === "error" && <p className="mt-6 text-sm text-rose-700">{state.message}</p>}
        {state.status === "done" && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="kicker">Answer from OnCo records</span>
              <span className={`chip ${state.answer.confidence === "high" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : state.answer.confidence === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`} title="How well the retrieved sentences cover the words of your question">match: {state.answer.confidence}</span>
              <button type="button" onClick={() => copy(state.answer)} className="ml-auto text-xs underline text-muted">{copied ? "Copied" : "Copy with citations"}</button>
            </div>
            {state.answer.note && <p className="text-sm text-muted mb-3">{state.answer.note}</p>}
            {state.answer.sentences.length > 0 ? (
              <div className="card p-4 text-[15px] leading-relaxed">
                {state.answer.sentences.map((s, i) => (
                  <span key={i}>
                    {s.text}{" "}
                    <Link href={state.answer.sources[s.cite - 1].route} className="inline-block align-baseline text-[11px] font-medium rounded border border-border bg-foreground/5 px-1 leading-5 hover:bg-foreground/10" title={`${state.answer.sources[s.cite - 1].name} (${s.field})`}>{s.cite}</Link>{" "}
                  </span>
                ))}
              </div>
            ) : <p className="text-sm text-muted">Nothing in OnCo matches that question. Try naming a cancer, product, target or trial.</p>}
            {state.answer.sources.length > 0 && (
              <ol className="mt-4 space-y-1.5 text-sm">
                {state.answer.sources.map((s, i) => (
                  <li key={s.id} className="flex items-start gap-2">
                    <span className="text-[11px] font-medium rounded border border-border bg-foreground/5 px-1 leading-5 mt-0.5">{i + 1}</span>
                    <span className={`chip border ${KIND_COLOR[s.kind]}`}>{KIND_META[s.kind].label}</span>
                    <Link href={s.route} className="hover:underline">{s.name}</Link>
                  </li>
                ))}
              </ol>
            )}
            <p className="mt-4 text-xs text-muted">Records consulted: {state.consulted.map((r, i) => <span key={r.id}>{i > 0 && ", "}<Link href={r.route} className="underline">{r.name}</Link></span>)}. <Link href={`/search/?q=${encodeURIComponent(q.trim())}`} className="underline">See why they matched</Link>.</p>
          </div>
        )}
      </div>
      <aside className="space-y-4">
        <div className="card p-3">
          <div className="kicker mb-2">Try a question</div>
          <ul className="space-y-1.5 text-sm">
            {examples.map((e) => <li key={e.question}><button type="button" onClick={() => submit(e.question)} className="text-left hover:underline">{e.question}</button> <span className="text-xs text-muted">({e.audience})</span></li>)}
          </ul>
        </div>
        <div className="card p-3 text-xs text-muted space-y-2">
          <p><strong className="text-foreground/80">How it works.</strong> Your question runs through the same two searches as the search page. The top {RETRIEVE} records are fetched, split into sentences, and the sentences that share the most informative words with your question are shown, at most two per record, each with a citation.</p>
          <p><strong className="text-foreground/80">What it cannot do.</strong> It does not reason, combine facts, or fill gaps. If OnCo has no sentence on the point, it says so. The <Link href="/eval/" className="underline">open benchmark</Link> scores this method alongside other systems.</p>
        </div>
      </aside>
    </div>
  );
}
