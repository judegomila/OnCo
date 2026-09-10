import type { ReactNode } from "react";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { buildMatcher, findMatches, type Matcher } from "./entity-matcher";
import { TermHover, type TermRef } from "@/components/TermHover";

let cached: Matcher<TermRef> | null = null;

/** Kinds whose names are linked in prose. Glossary terms first so they win ties with equal-length names. */
const KINDS_LINKED = ["term", "drug", "target", "technology", "cancer", "pathway", "trial", "company", "institution", "bottleneck", "journal", "person"] as const;
/** Ordinary words that are also record names or aliases; never auto-linked. */
const STOP = new Set(["cancer", "cell", "cells", "blood", "brain", "skin", "bone", "liver", "lung", "breast", "colon", "the", "and", "for", "with", "science", "nature", "cell press", "target", "trial", "study", "group", "center", "centre", "institute", "hospital", "university", "foundation", "society", "china", "japan", "europe", "united states", "other", "vision", "destiny", "ascent", "monarch", "paradigm", "checkmate", "keynote", "impassion", "javelin", "pacific", "aurora", "orbit", "spotlight", "minimal"]);

/** Two-letter glossary aliases worth linking despite the length floor: overall survival and lines of therapy. */
const SHORT_OK = new Set(["os", "1l", "2l", "3l"]);

/** Bracketed abbreviation in a record name: "Progression-free survival (PFS)" gives "PFS". */
const abbrOf = (name: string) => name.match(/\(([A-Za-z0-9\-/ ]{2,12})\)/)?.[1];

/** Name and alias patterns for every linkable record, deduplicated (glossary terms win on ties). */
export function entityPatterns(): Array<{ pattern: string; ref: TermRef }> {
  const g = graph();
  const entries: Array<{ pattern: string; ref: TermRef }> = [];
  // Names, aliases and abbreviations owned by non-glossary records. A glossary term's bracketed qualifier
  // must not claim them: "Ulceration (melanoma)" is not the place "melanoma" should link.
  const owned = new Set<string>();
  for (const k of KINDS_LINKED) if (k !== "term") for (const t of g.kind(k)) for (const s of [t.name, abbrOf(t.name), ...t.aka]) if (s) owned.add(s.toLowerCase());
  for (const k of KINDS_LINKED) for (const t of g.kind(k)) {
    const ref: TermRef = { id: t.id, name: t.name, tldr: t.tldr, route: routeFor(t), kind: t.kind };
    const base = t.name.replace(/\s*\(.*?\)\s*$/, "").trim();
    let abbr = abbrOf(t.name);
    // A lower-case parenthetical is a qualifier, not an abbreviation ("(melanoma)", "(myeloma)", "(disulfide)").
    if (k === "term" && abbr && (/^[a-z ]+$/.test(abbr) || owned.has(abbr.toLowerCase()))) abbr = undefined;
    const min = k === "term" ? 3 : 4;
    // Glossary entries that name two things ("HER2-low and HER2-ultralow", "TILs / tumour-infiltrating lymphocytes") link from each.
    const halves = k === "term" ? base.split(/\s+(?:and|or|\/|&)\s+/).filter((h) => h.length >= min && h !== base) : [];
    for (const s of [base, abbr, ...halves, ...t.aka]) {
      if (!s || (s.length < min && !(k === "term" && SHORT_OK.has(s.toLowerCase()))) || /^\d+$/.test(s) || STOP.has(s.toLowerCase())) continue;
      // Short all-lower-case words from non-glossary kinds are usually ordinary words; skip them.
      if (k !== "term" && /^[a-z]+$/.test(s) && s.length < 6) continue;
      entries.push({ pattern: s, ref });
    }
  }
  const seen = new Set<string>();
  return entries.filter(({ pattern }) => { const key = pattern.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; });
}

function matcher(): Matcher<TermRef> {
  if (!cached) cached = buildMatcher(entityPatterns());
  return cached;
}

/** Serialisable marks for a plain string (used by client tables): first occurrence of each record, non-overlapping. */
export type TermMark = { s: number; e: number; label: string; tip: string; href: string };
export function termMarks(text: string, max = 4): TermMark[] {
  return findMatches(matcher(), text, { key: (r) => r.id, max }).map((h) => ({ s: h.start, e: h.end, label: h.ref.name, tip: h.ref.tldr, href: h.ref.route }));
}

/**
 * Wrap the first occurrence of every record name or alias in a paragraph with a hover popover linking to
 * its page. Leftmost-longest matching, so "HER2-low" is linked as the glossary term rather than "HER2"
 * the target. Pure text in, React nodes out; call once per paragraph. Skips the page's own subject.
 */
export function withTermHovers(text: string, opts: { skipId?: string; max?: number } = {}): ReactNode[] {
  const hits = findMatches(matcher(), text, { key: (r) => r.id, skip: (r) => r.id === opts.skipId, max: opts.max ?? 12 });
  if (!hits.length) return [text];
  const out: ReactNode[] = [];
  let pos = 0;
  hits.forEach((h, i) => {
    if (h.start > pos) out.push(text.slice(pos, h.start));
    out.push(<TermHover key={`${h.ref.id}-${i}`} term={h.ref}>{text.slice(h.start, h.end)}</TermHover>);
    pos = h.end;
  });
  if (pos < text.length) out.push(text.slice(pos));
  return out;
}
