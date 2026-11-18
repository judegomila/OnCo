import type { ReactNode } from "react";
import { graph } from "./graph";
import { routeFor } from "./kinds";
import { buildMatcher, findMatches, type Matcher } from "./entity-matcher";
import { TermHover, type TermRef } from "@/components/TermHover";

let cached: Matcher<TermRef> | null = null;

/** Kinds whose names are linked in prose. Glossary terms first so they win ties with equal-length names. */
const KINDS_LINKED = ["term", "drug", "target", "technology", "cancer", "pathway", "trial", "company", "institution", "bottleneck", "journal", "person"] as const;
/** Ordinary words that are also record names or aliases; never auto-linked. */
const STOP = new Set(["cancer", "cell", "cells", "blood", "brain", "skin", "bone", "liver", "lung", "breast", "colon", "the", "and", "for", "with", "science", "nature", "cell press", "target", "trial", "study", "group", "center", "centre", "institute", "hospital", "university", "foundation", "society", "china", "japan", "europe", "united states", "other", "vision", "destiny", "ascent", "monarch", "paradigm", "checkmate", "keynote", "impassion", "javelin", "pacific", "aurora", "orbit", "spotlight", "minimal", "response", "correct", "prime", "opus", "coin", "crystal", "challenge", "focus", "niche", "impact", "card", "transform", "precision", "same", "reflect",
  // Taken from the brackets of record names, where they qualify rather than abbreviate: "Depth of invasion (DOI)" linked
  // the DOI of every paper, which is what DOI means everywhere else in the corpus; "Balkan Regional Centre (oncology)",
  // "Neuroblastoma (paediatric)", "... lesions (precursor)" and "Primary mediastinal (thymic) ..." linked those words.
  // The journal named "Oncology" is the same case as "science" and "nature" above.
  "doi", "oncology", "paediatric", "precursor", "thymic"]);

/** Two-letter glossary aliases worth linking despite the length floor: overall survival and lines of therapy. */
const SHORT_OK = new Set(["os", "1l", "2l", "3l"]);

/**
 * A name written entirely in capitals links only where the text writes it with its capitals. The matcher is otherwise
 * case-insensitive, and many such names are also ordinary words: "HAS" (France's Haute Autorité de Santé) linked every
 * "has" on the site, MUST, FIT and LET did the same for "must", "fit" and "let", and the trial names PLATINUM, SELECT,
 * RADICAL, CONFIRM and DIRECT linked "platinum chemotherapy", "select patients" and the rest. At least two capitals;
 * hyphens are allowed. A name with a digit ("TROP2", "CD79A", "KEYNOTE-522") cannot be an ordinary word, so it keeps
 * matching in any case, and "Trop2", "CD79a" and "Smad4" still link. See `exact` in entity-matcher for what the text
 * has to show.
 */
const CAPITALS = /^(?=(?:[^A-Z]*[A-Z]){2})[A-Z-]+$/;
/**
 * A single word of letters with a capital after a lower-case letter ("ReSPECT", "ctDNA", "BrECADD") is a coined name
 * whose capitals are part of it, and it follows the same rule: "ReSPECT" otherwise matches every "respect". One with a
 * digit ("anti-PD-1", "eIF4A") cannot be an ordinary word, so it keeps matching in any case.
 */
const COINED = /^[A-Za-z-]*[a-z][A-Za-z-]*[A-Z][A-Za-z-]*$/;
const exactCase = (s: string) => CAPITALS.test(s) || COINED.test(s);

/**
 * Bracketed abbreviation in a record name: "Progression-free survival (PFS)" gives "PFS". A single capitalised word in
 * brackets is a qualifier, not an abbreviation: "(England)", "(Scotland)", "(Australia)", "(Alcohol)" and "(Oral)" took
 * those ordinary words with them, so every "England" on the site linked to the Cancer Drugs Fund.
 */
const abbrOf = (name: string) => {
  const a = name.match(/\(([A-Za-z0-9\-/ ]{2,12})\)/)?.[1];
  return a && !/^[A-Z][a-z]+$/.test(a) ? a : undefined;
};

/** Name and alias patterns for every linkable record, deduplicated (glossary terms win on ties). */
export function entityPatterns(): Array<{ pattern: string; ref: TermRef; exact?: boolean }> {
  const g = graph();
  const entries: Array<{ pattern: string; ref: TermRef; exact?: boolean }> = [];
  // Names, aliases and abbreviations owned by non-glossary records. A glossary term's bracketed qualifier
  // must not claim them: "Ulceration (melanoma)" is not the place "melanoma" should link.
  const owned = new Set<string>();
  for (const k of KINDS_LINKED) if (k !== "term") for (const t of g.kind(k)) for (const s of [t.name, abbrOf(t.name), ...t.aka]) if (s) owned.add(s.toLowerCase());
  for (const k of KINDS_LINKED) for (const t of g.kind(k)) {
    const ref: TermRef = { id: t.id, name: t.name, tldr: t.tldr, route: routeFor(t), kind: t.kind };
    // A trailing bracket is dropped only where a space sets it apart: "del(5q)" is the name, and dropping its bracket
    // left "del", which linked the Spanish and Italian word ("Control del Cáncer") and DEL, DNA-encoded libraries.
    const base = t.name.replace(/\s+\(.*?\)\s*$/, "").trim();
    let abbr = abbrOf(t.name);
    // A lower-case parenthetical is a qualifier, not an abbreviation ("(melanoma)", "(myeloma)", "(disulfide)").
    if (k === "term" && abbr && (/^[a-z ]+$/.test(abbr) || owned.has(abbr.toLowerCase()))) abbr = undefined;
    const min = k === "term" ? 3 : 4;
    // Glossary entries that name two things ("HER2-low and HER2-ultralow", "TILs / tumour-infiltrating lymphocytes") link from each.
    // Only a name that is a pair splits. A title with a colon or a comma ("British and American lymphoma practice:
    // where they differ, and why") gave "why", and "Biliary stent problems: blockage and infection" gave
    // "infection", so every "Why" and every "infection" on the site linked to the wrong page. A one-word half has
    // to look like a term of art (a digit, an inner capital or a hyphen: "BrECADD", "EQD2", "Child-Pugh"); a plain
    // word such as "management" or "observation" is not one, and the record still links from its full name.
    const pairOnly = !/[:,]/.test(base);
    const technical = (h: string) => /\s/.test(h) || /\d|-|.[A-Z]/.test(h);
    const halves = k === "term" && pairOnly ? base.split(/\s+(?:and|or|\/|&)\s+/).filter((h) => h.length >= min && h !== base && technical(h)) : [];
    for (const s of [base, abbr, ...halves, ...t.aka]) {
      if (!s || (s.length < min && !(k === "term" && SHORT_OK.has(s.toLowerCase()))) || /^\d+$/.test(s) || STOP.has(s.toLowerCase())) continue;
      // Short all-lower-case words from non-glossary kinds are usually ordinary words; skip them.
      if (k !== "term" && /^[a-z]+$/.test(s) && s.length < 6) continue;
      entries.push(exactCase(s) ? { pattern: s, ref, exact: true } : { pattern: s, ref });
    }
  }
  // A case-insensitive pattern covers every spelling, so it shadows any later one with the same letters. One that needs
  // its capitals shadows only the same spelling, or it would silently take the ordinary word's link away too.
  const loose = new Set<string>(), strict = new Set<string>();
  return entries.filter(({ pattern, exact }) => {
    const low = pattern.toLowerCase();
    if (loose.has(low) || (exact && strict.has(pattern))) return false;
    if (exact) strict.add(pattern); else loose.add(low);
    return true;
  });
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
 * The most hovers one paragraph carries unless the caller says otherwise. It was 12 until November 2026, and the
 * cross-links census found that the cap, not the matcher, was why a fifth of the glossary terms mentioned in prose
 * had no hover: a long paragraph on a cancer page names thirty records, and the terms after the twelfth were plain
 * text. At 12 the cap cut 21,507 (record, term) mentions in the hovered fields; at 24 it cuts 1,186, and the 465
 * paragraphs still over it are the ones where a hover on everything would be a wall of dotted underlines.
 * scripts/measure-term-hovers.ts prints the figures for any cap.
 */
export const HOVER_CAP = 24;

/**
 * The matches `withTermHovers` wraps: first occurrence of each record in the text, leftmost-longest, at most `max`
 * (0 for no limit). Exported so scripts/measure-term-hovers.ts counts with the function the pages call.
 */
export function hoverHits(text: string, opts: { skipId?: string; max?: number } = {}) {
  return findMatches(matcher(), text, { key: (r) => r.id, skip: (r) => r.id === opts.skipId, max: opts.max ?? HOVER_CAP });
}

/**
 * Wrap the first occurrence of every record name or alias in a paragraph with a hover popover linking to
 * its page. Leftmost-longest matching, so "HER2-low" is linked as the glossary term rather than "HER2"
 * the target. Pure text in, React nodes out; call once per paragraph. Skips the page's own subject.
 */
export function withTermHovers(text: string, opts: { skipId?: string; max?: number } = {}): ReactNode[] {
  const hits = hoverHits(text, opts);
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
