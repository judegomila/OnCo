"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type TermRef = { id: string; name: string; tldr: string; route: string };

/** A glossary term inside running text: dotted underline, popover with the TL;DR and a link on hover or focus. */
export function TermHover({ term, children }: { term: TermRef; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);

  const show = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = window.setTimeout(() => { const r = ref.current?.getBoundingClientRect(); setAbove(!!r && r.bottom + 160 > window.innerHeight); setOpen(true); }, 120); };
  const hide = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 100); };
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <span ref={ref} className="relative inline" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <span tabIndex={0} role="button" aria-describedby={open ? `term-${term.id}` : undefined} className="cursor-help underline decoration-dotted decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground">{children}</span>
      {open && (
        <span id={`term-${term.id}`} role="tooltip" className={`absolute left-0 z-50 w-72 max-w-[85vw] card shadow-xl p-3 text-sm not-italic font-normal normal-case tracking-normal ${above ? "bottom-full mb-1" : "top-full mt-1"}`}>
          <span className="block font-semibold mb-0.5">{term.name}</span>
          <span className="block text-muted leading-snug">{term.tldr}</span>
          <Link href={term.route} className="mt-1.5 inline-block text-xs underline">Glossary page →</Link>
        </span>
      )}
    </span>
  );
}
