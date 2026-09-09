"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { placeNear } from "./Tip";

export type TermRef = { id: string; name: string; tldr: string; route: string; kind?: string };

/** A glossary term inside running text: dotted underline, popover with the TL;DR and a link. The popover follows the pointer. */
export function TermHover({ term, children }: { term: TermRef; children: React.ReactNode }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);

  const clear = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = null; };
  const showAt = (x: number, y: number) => { clear(); timer.current = window.setTimeout(() => setPos(placeNear(x, y)), 120); };
  const move = (e: React.MouseEvent) => { if (pos) setPos(placeNear(e.clientX, e.clientY)); else showAt(e.clientX, e.clientY); };
  const focus = () => { const r = ref.current?.getBoundingClientRect(); if (r) showAt(r.left, r.bottom); };
  const hide = () => { clear(); timer.current = window.setTimeout(() => setPos(null), 110); };
  useEffect(() => () => clear(), []);

  return (
    <span ref={ref} className="inline" onMouseEnter={move} onMouseMove={move} onMouseLeave={hide} onFocus={focus} onBlur={hide}>
      <span tabIndex={0} role="button" aria-describedby={pos ? `term-${term.id}` : undefined} className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground">{children}</span>
      {pos && (
        <span id={`term-${term.id}`} role="tooltip" style={{ left: pos.left, top: pos.top, width: 288 }} className="fixed z-[80] max-w-[85vw] card shadow-xl p-3 text-sm not-italic font-normal normal-case tracking-normal pointer-events-none">
          <span className="block font-semibold mb-0.5">{term.name}</span>
          <span className="block text-muted leading-snug">{term.tldr}</span>
          <Link href={term.route} className="mt-1.5 inline-block text-xs underline pointer-events-auto">{term.kind && term.kind !== "term" ? "Open page →" : "Glossary page →"}</Link>
        </span>
      )}
    </span>
  );
}
