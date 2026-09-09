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
  // Glossary terms first (they win ties), then every other object with a page: drugs, targets, technologies,
  // cancers, pathways, trials, companies, institutions, people, bottlenecks, journals. Names shorter than four
  // characters are skipped for non-terms to avoid false matches on ordinary words.
  const KINDS_LINKED = ["term", "drug", "target", "technology", "cancer", "pathway", "trial", "company", "institution", "bottleneck", "journal", "person"] as const;
  const STOP = new Set(["cancer", "cell", "cells", "blood", "brain", "skin", "bone", "liver", "lung", "breast", "colon", "the", "and", "for", "with", "science", "nature", "cell press", "target", "trial", "study", "group", "center", "centre", "institute", "hospital", "university", "foundation", "society", "china", "japan", "europe", "united states", "other"]);
  for (const k of KINDS_LINKED) for (const t of g.kind(k)) {
    const ref: TermRef = { id: t.id, name: t.name, tldr: t.tldr, route: routeFor(t), kind: t.kind };
    const base = t.name.replace(/\s*\(.*?\)\s*$/, "").trim();
    const abbr = t.name.match(/\(([A-Za-z0-9\-/ ]{2,12})\)/)?.[1];
    const min = k === "term" ? 3 : 4;
    for (const s of [base, abbr, ...t.aka]) if (s && s.length >= min && !/^\d+$/.test(s) && !STOP.has(s.toLowerCase()) && !(k !== "term" && /^[a-z]+$/.test(s) && s.length < 6)) entries.push([s, ref]);
  }
  entries.sort((a, b) => b[0].length - a[0].length || (a[1].kind === "term" ? -1 : 0) - (b[1].kind === "term" ? -1 : 0));
  const seen = new Set<string>();
  cached = entries.filter(([s]) => { const k = s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .map(([s, term]) => ({ re: new RegExp(`(?<![\\w-])${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`, "i"), term }));
  return cached;
}

/**
 * Wrap the first occurrence of each glossary term in a paragraph with a hover popover.
 * Pure text in, React nodes out; call once per paragraph. Skips a term when it is the page's own subject.
 */
/** Serialisable glossary marks for a plain string (used by client tables): first occurrence of each term, non-overlapping. */
export type TermMark = { s: number; e: number; label: string; tip: string; href: string };
export function termMarks(text: string, max = 4): TermMark[] {
  const hits: TermMark[] = [];
  for (const { re, term } of patterns()) {
    const m = re.exec(text);
    if (!m) continue;
    const s = m.index, e = s + m[0].length;
    if (hits.some((h) => s < h.e && e > h.s)) continue;
    hits.push({ s, e, label: term.name, tip: term.tldr, href: term.route });
    if (hits.length >= max) break;
  }
  return hits.sort((a, b) => a.s - b.s);
}

export function withTermHovers(text: string, opts: { skipId?: string; max?: number } = {}): ReactNode[] {
  const max = opts.max ?? 12;
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
