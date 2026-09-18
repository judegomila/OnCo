"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HIDE_LINKED_MS, placeNear, within } from "./Tip";

export type TermRef = { id: string; name: string; tldr: string; route: string; kind?: string };

/**
 * A glossary term inside running text: dotted underline, popover with the TL;DR and a link. The popover follows
 * the pointer while it is over the term, then stays put and clickable while the pointer or keyboard focus is on
 * the popover itself, so the link can be reached (issue 37). Escape closes it.
 */
export function TermHover({ term, children }: { term: TermRef; children: React.ReactNode }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const pop = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);

  const clear = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = null; };
  const showAt = (x: number, y: number) => { clear(); timer.current = window.setTimeout(() => setPos(placeNear(x, y)), 120); };
  const move = (e: React.MouseEvent) => {
    if (within(pop.current, e.target)) { clear(); return; }
    if (pos) setPos(placeNear(e.clientX, e.clientY)); else showAt(e.clientX, e.clientY);
  };
  const hide = () => { clear(); timer.current = window.setTimeout(() => setPos(null), HIDE_LINKED_MS); };
  const leave = (e: React.MouseEvent) => { if (within(pop.current, e.relatedTarget)) return; hide(); };
  const focus = () => { if (pos) { clear(); return; } const r = ref.current?.getBoundingClientRect(); if (r) showAt(r.left, r.bottom); };
  const blur = (e: React.FocusEvent) => { if (within(ref.current, e.relatedTarget)) return; hide(); };
  const key = (e: React.KeyboardEvent) => { if (e.key === "Escape" && pos) { clear(); setPos(null); } };
  useEffect(() => () => clear(), []);

  return (
    <span ref={ref} className="inline" onMouseEnter={move} onMouseMove={move} onMouseLeave={leave} onFocus={focus} onBlur={blur} onKeyDown={key}>
      <span tabIndex={0} role="button" aria-describedby={pos ? `term-${term.id}` : undefined} className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground">{children}</span>
      {pos && (
        <span ref={pop} id={`term-${term.id}`} role="tooltip" style={{ left: pos.left, top: pos.top, width: 288 }} className="fixed z-[80] max-w-[85vw] card shadow-xl p-3 text-sm not-italic font-normal normal-case tracking-normal pointer-events-auto">
          <span className="block font-semibold mb-0.5">{term.name}</span>
          <span className="block text-muted leading-snug">{term.tldr}</span>
          <Link href={term.route} className="mt-1.5 inline-block text-xs underline">{term.kind && term.kind !== "term" ? "Open page →" : "Glossary page →"}</Link>
        </span>
      )}
    </span>
  );
}
