import type { ReactNode } from "react";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { TermHover, type TermRef } from "@/components/TermHover";

type Pattern = { re: RegExp; term: TermRef };

let cached: Pattern[] | null = null;

/** Glossary names and aliases → term refs, longest first so "HER2-low" wins over "HER2". */
function patterns(): Pattern[] {
  if (cached) return cached;
  const g = graph();
  const entries: Array<[string, TermRef]> = [];
  for (const t of g.kind("term")) {
    const ref: TermRef = { id: t.id, name: t.name, tldr: t.tldr, route: routeFor(t) };
    // Strip parenthetical qualifiers from names: "Payload (ADC)" → "Payload"; also match the abbreviation inside brackets.
    const base = t.name.replace(/\s*\(.*?\)\s*$/, "").trim();
    const abbr = t.name.match(/\(([A-Za-z0-9\-/ ]{2,12})\)/)?.[1];
    for (const s of [base, abbr, ...t.aka]) if (s && s.length >= 3 && !/^\d+$/.test(s)) entries.push([s, ref]);
  }
  entries.sort((a, b) => b[0].length - a[0].length);
  const seen = new Set<string>();
  cached = entries.filter(([s]) => { const k = s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .map(([s, term]) => ({ re: new RegExp(`(?<![\\w-])${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`, "i"), term }));
  return cached;
}

/**
 * Wrap the first occurrence of each glossary term in a paragraph with a hover popover.
 * Pure text in, React nodes out; call once per paragraph. Skips a term when it is the page's own subject.
 */
export function withTermHovers(text: string, opts: { skipId?: string; max?: number } = {}): ReactNode[] {
  const max = opts.max ?? 8;
  const hits: Array<{ start: number; end: number; term: TermRef }> = [];
  for (const { re, term } of patterns()) {
    if (term.id === opts.skipId) continue;
    const m = re.exec(text);
    if (!m) continue;
    const start = m.index, end = start + m[0].length;
    if (hits.some((h) => start < h.end && end > h.start)) continue;
    hits.push({ start, end, term });
    if (hits.length >= max) break;
  }
  if (!hits.length) return [text];
  hits.sort((a, b) => a.start - b.start);
  const out: ReactNode[] = [];
  let pos = 0;
  hits.forEach((h, i) => {
    if (h.start > pos) out.push(text.slice(pos, h.start));
    out.push(<TermHover key={`${h.term.id}-${i}`} term={h.term}>{text.slice(h.start, h.end)}</TermHover>);
    pos = h.end;
  });
  if (pos < text.length) out.push(text.slice(pos));
  return out;
}
