"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = {
  id: string;
  kicker?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
  timeline?: Array<{ year: string; title: string }>;
  quiz?: Array<{ q: string; a: string }>;
  /** Speaker notes: what to say, with the sources to cite. */
  notes?: string[];
  sources?: Array<{ label: string; url: string }>;
};

/**
 * An HTML slide deck. On screen each slide is a 16:9 card; arrow keys move between them and the
 * toolbar toggles speaker notes and quiz answers. In print every slide is one page (browser
 * "Save as PDF" makes the handout), with notes under each slide if they were switched on.
 * All content arrives as plain data so the deck can be generated from any record.
 */
export function SlideDeck({ title, slides, hero }: { title: string; slides: Slide[]; hero?: ReactNode }) {
  const [notes, setNotes] = useState(false);
  const [answers, setAnswers] = useState(false);
  const [current, setCurrent] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);
  const n = slides.length;

  useEffect(() => {
    const go = (i: number) => { const j = Math.max(0, Math.min(n - 1, i)); setCurrent(j); refs.current[j]?.scrollIntoView({ behavior: "smooth", block: "start" }); };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(current + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current - 1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(n - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, n]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((x) => x.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit) { const i = refs.current.indexOf(hit.target as HTMLLIElement); if (i >= 0) setCurrent(i); }
    }, { threshold: [0.5, 0.75] });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [n]);

  return (
    <div>
      <div className="sticky top-[var(--header-h)] z-10 -mx-4 sm:mx-0 px-4 sm:px-0 py-2 bg-background/90 backdrop-blur border-b border-border flex flex-wrap items-center gap-x-4 gap-y-2 text-sm print:hidden">
        <span className="tabular-nums text-muted">Slide {current + 1} of {n}</span>
        <span className="text-xs text-muted hidden sm:inline">Arrow keys move between slides</span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button type="button" className="btn text-xs" aria-pressed={notes} onClick={() => setNotes((v) => !v)}>{notes ? "Hide" : "Show"} speaker notes</button>
          <button type="button" className="btn text-xs" aria-pressed={answers} onClick={() => setAnswers((v) => !v)}>{answers ? "Hide" : "Reveal"} quiz answers</button>
          <button type="button" className="btn btn-primary text-xs" onClick={() => window.print()} aria-label="Print or save this deck as PDF">Print / save PDF</button>
        </div>
      </div>

      <ol className="mt-6 space-y-8 list-none p-0">
        {slides.map((s, i) => (
          <li key={s.id} id={`slide-${i + 1}`} ref={(el) => { refs.current[i] = el; }} className="scroll-mt-32 print:break-after-page print:break-inside-avoid">
            <section aria-label={`Slide ${i + 1}: ${s.title}`} className={`card relative overflow-hidden p-6 sm:p-10 flex flex-col min-h-[22rem] sm:aspect-[16/9] print:aspect-auto print:min-h-0 print:shadow-none ${i === current ? "ring-1 ring-foreground/20 print:ring-0" : ""}`}>
              {s.kicker && <div className="kicker mb-1">{s.kicker}</div>}
              <div className="flex items-start justify-between gap-6">
                <h2 className={`font-semibold tracking-tight leading-tight ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{s.title}</h2>
                {i === 0 && hero ? <div className="shrink-0 max-w-[40%]">{hero}</div> : null}
              </div>
              <div className="mt-4 sm:mt-6 flex-1 min-h-0 text-[15px] sm:text-lg leading-relaxed space-y-3">
                {s.paragraphs?.map((p, k) => <p key={k} className={i === 0 ? "text-lg sm:text-2xl text-foreground/85 max-w-3xl" : "max-w-4xl"}>{p}</p>)}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1.5 max-w-4xl">{s.bullets.map((b, k) => <li key={k}>{b}</li>)}</ul>
                )}
                {s.table && (
                  <div className="overflow-x-auto"><table className="w-full text-sm sm:text-base">
                    <thead className="text-left text-xs text-muted"><tr>{s.table.head.map((h) => <th key={h} className="py-1.5 pr-4 font-medium">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-border">{s.table.rows.map((r, k) => <tr key={k} className="align-top">{r.map((c, j) => <td key={j} className={`py-1.5 pr-4 ${j === 0 ? "font-medium whitespace-nowrap" : ""}`}>{c}</td>)}</tr>)}</tbody>
                  </table></div>
                )}
                {s.timeline && s.timeline.length > 0 && (
                  <ol className="relative border-l border-border ml-2 pl-5 space-y-2">{s.timeline.map((t, k) => <li key={k} className="relative"><span className="absolute -left-[1.6rem] top-2 h-2.5 w-2.5 rounded-full bg-foreground" /><span className="tabular-nums font-medium mr-2">{t.year}</span>{t.title}</li>)}</ol>
                )}
                {s.quiz && s.quiz.length > 0 && (
                  <ol className="list-decimal pl-6 space-y-3">{s.quiz.map((q, k) => (
                    <li key={k}>
                      <div>{q.q}</div>
                      <details open={answers} className="mt-1 text-sm sm:text-base text-muted"><summary className="cursor-pointer select-none print:hidden">Answer</summary><div className="mt-1 text-foreground/85">{q.a}</div></details>
                    </li>
                  ))}</ol>
                )}
              </div>
              <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted">
                <span className="truncate">{title} · OnCo, CC BY-NC 4.0 · not medical advice</span>
                <span className="tabular-nums">{i + 1} / {n}</span>
              </div>
            </section>
            {notes && ((s.notes && s.notes.length > 0) || (s.sources && s.sources.length > 0)) && (
              <aside className="mt-2 card p-4 text-sm bg-foreground/[0.03] print:break-inside-avoid">
                <div className="kicker mb-1">Speaker notes</div>
                {s.notes && s.notes.length > 0 && <ul className="list-disc pl-5 space-y-1">{s.notes.map((x, k) => <li key={k}>{x}</li>)}</ul>}
                {s.sources && s.sources.length > 0 && (
                  <div className="mt-2 text-xs text-muted"><span className="font-medium">Cite:</span> {s.sources.map((src, k) => <span key={k}>{k > 0 ? " · " : ""}<a className="underline break-all" href={src.url} rel="noopener">{src.label}</a></span>)}</div>
                )}
              </aside>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
