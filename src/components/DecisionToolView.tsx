"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isComplete, TONE_CLASS, TONE_ICON, TONE_LABEL, toolById, toolCard, type Answers, type ToolCard, type ToolQuote } from "@/lib/decision-tools";
import { ToolGlyph } from "./ToolGlyph";

/**
 * The interactive half of a decision aid: one row of pills per question, and on the right (above, on a phone) the
 * cards the tool's `decide` returns for the answers so far. Answers live in the URL (`?size=6to9&age=gt60`) so a
 * result can be shared; nothing is stored. The tool is looked up by id inside this file, so the server page passes
 * only a string and no function crosses the boundary.
 *
 * Small screens follow the sticky-preview pattern (docs/MOBILE.md): the result sticks under the header at no more
 * than 40 percent of the viewport and scrolls inside itself, so a tap on any pill shows its effect.
 */
export function DecisionToolView({ toolId }: { toolId: string }) {
  const tool = toolById(toolId);
  const [answers, setAnswers] = useState<Answers>({});
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!tool) return;
    const raf = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const next: Answers = {};
      for (const i of tool.inputs) { const v = p.get(i.id); if (v && i.options.some((o) => o.value === v)) next[i.id] = v; }
      if (Object.keys(next).length) setAnswers(next);
      setSynced(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [tool]);

  useEffect(() => {
    if (!synced || !tool) return;
    const url = new URL(window.location.href);
    for (const i of tool.inputs) { if (answers[i.id]) url.searchParams.set(i.id, answers[i.id]); else url.searchParams.delete(i.id); }
    const next = url.pathname + url.search + url.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, "", next);
  }, [answers, synced, tool]);

  const complete = tool ? isComplete(tool, answers) : false;
  const cards = useMemo(() => (tool && complete ? tool.decide(answers).map((id) => toolCard(tool, id)).filter((c): c is ToolCard => !!c) : []), [tool, answers, complete]);
  if (!tool) return null;
  const answered = tool.inputs.filter((i) => answers[i.id]).length;
  const questions = [...new Set([...cards.flatMap((c) => c.questions ?? []), ...tool.questions])];
  const resultId = "tool-result";

  return (
    <div data-mobile-view="decision-tool" data-mobile-pattern="sticky-preview" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span><span className="font-semibold text-foreground tabular-nums">{answered}</span> of {tool.inputs.length} answered</span>
          {answered > 0 && <button type="button" onClick={() => setAnswers({})} className="underline">Clear</button>}
        </div>
        {tool.inputs.map((input) => (
          <fieldset key={input.id} className="card p-4">
            <legend className="sr-only">{input.label}</legend>
            <div className="flex items-start gap-2">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><ToolGlyph name={input.icon} className="h-4 w-4" /></span>
              <div className="min-w-0">
                <div className="font-medium leading-tight">{input.label}</div>
                {input.hint && <div className="text-xs text-muted mt-0.5">{input.hint}</div>}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label={input.label}>
              {input.options.map((o) => {
                const on = answers[input.id] === o.value;
                return (
                  <button key={o.value} type="button" role="radio" aria-checked={on} aria-controls={resultId} data-mobile-control title={o.hint}
                    onClick={() => setAnswers((a) => (a[input.id] === o.value ? Object.fromEntries(Object.entries(a).filter(([k]) => k !== input.id)) : { ...a, [input.id]: o.value }))}
                    className={`chip border text-sm inline-flex items-center gap-1.5 cursor-pointer ${on ? "bg-accent text-white border-accent" : "bg-card border-border hover:border-accent hover:bg-accent-soft"}`}>
                    <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${on ? "bg-white" : "bg-foreground/20"}`} />{o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div id={resultId} data-mobile-driven aria-live="polite" className="min-w-0 max-lg:order-first max-lg:sticky max-lg:top-14 max-lg:z-20 max-lg:max-h-[40vh] max-lg:overflow-y-auto max-lg:rounded-xl max-lg:border max-lg:border-border max-lg:bg-background/95 max-lg:backdrop-blur lg:self-start">
        {!complete ? (
          <div className="card p-6 text-sm text-muted">
            <div className="kicker mb-2 inline-flex items-center gap-1.5"><ToolGlyph name="compass" className="h-3.5 w-3.5" />What applies to you</div>
            <p>Answer the {tool.inputs.length} questions and the statement that applies to that combination appears here, quoted word for word from <a href={tool.guideline.url} className="underline" rel="noopener noreferrer">{tool.guideline.label}</a>{tool.sources.length > 1 ? " and the sources listed below" : ""}, with a plain line on what it means and the questions to take to your surgeon.</p>
            <p className="mt-2">Without JavaScript, every statement the aid can show is listed further down the page. This is an educational aid, not advice.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-muted">Your answers:</span>
              {tool.inputs.map((i) => { const o = i.options.find((x) => x.value === answers[i.id]); return o ? <span key={i.id} className="chip bg-foreground/5 inline-flex items-center gap-1"><ToolGlyph name={i.icon} className="h-3 w-3" />{o.label}</span> : null; })}
            </div>
            {cards.map((c, i) => <ResultCard key={c.id} card={c} headline={i === 0} />)}
            {questions.length > 0 && (
              <div className="card p-4">
                <div className="kicker mb-2 inline-flex items-center gap-1.5"><ToolGlyph name="question" className="h-3.5 w-3.5" />Questions for your surgeon</div>
                <ol className="list-decimal ps-5 space-y-1.5 text-[15px] leading-relaxed">{questions.map((q, i) => <li key={i}>{q}</li>)}</ol>
                <p className="text-xs text-muted mt-2">Take them in the <Link href={`/prep/${tool.cancerId}/`} className="underline">appointment sheet</Link>; or print this page.</p>
              </div>
            )}
            <ul className="text-xs text-muted space-y-1 px-1">{tool.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Quote({ q }: { q: ToolQuote }) {
  return (
    <blockquote className="border-s-2 border-accent/50 ps-3 text-[15px] leading-relaxed">
      <p>&ldquo;{q.text}&rdquo;</p>
      <footer className="text-xs text-muted mt-1">{q.grade && <span className="chip bg-foreground/5 me-1.5">{q.grade}</span>}<a href={q.source.url} className="underline" rel="noopener noreferrer">{q.source.label}</a></footer>
    </blockquote>
  );
}

/** One card of a result: the tone pill with its glyph, the verbatim quotes, the plain line, the links. */
export function ResultCard({ card, headline = false }: { card: ToolCard; headline?: boolean }) {
  const tone = TONE_CLASS[card.tone];
  return (
    <section className={`card p-4 border ${tone.card} ${headline ? "ring-1 ring-accent/30" : ""}`} aria-label={card.title}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`chip border inline-flex items-center gap-1 ${tone.pill}`}><ToolGlyph name={TONE_ICON[card.tone]} className="h-3 w-3" />{TONE_LABEL[card.tone]}</span>
        {headline && <span className="chip bg-foreground/5 text-[10px]">Headline</span>}
      </div>
      <h3 className="font-semibold mt-2 leading-snug">{card.title}</h3>
      <div className="mt-3 space-y-3">{card.quotes.map((q, i) => <Quote key={i} q={q} />)}</div>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/90"><span className="font-medium">What this means: </span>{card.meaning}</p>
      {card.links && card.links.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{card.links.map((l) => <Link key={l.href} href={l.href} className="chip border bg-card border-border hover:bg-foreground/5 text-xs">{l.label}</Link>)}</div>}
    </section>
  );
}
