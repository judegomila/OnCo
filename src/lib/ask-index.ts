/**
 * The compact entity name index Ask OnCo resolves questions against, and the curated question pairs.
 *
 * Written by scripts/build-ask.ts to public/api/v1/ask-index.json (see ask-index-build.ts for the
 * corpus-side builder). One entry per record: id, kind, name, aliases (aka, brand, code, symbol,
 * abbreviation in the name, curated aliases from ask-lexicon.ts), route, a short TL;DR for chips, status.
 * Pairs are the benchmark questions and the per-cancer patient questions with the records they point at.
 *
 * This module is pure and browser-safe.
 */
import { KINDS, routeFor, type Kind } from "./schema";
import { ASK_ALIASES, ASK_STOP } from "./ask-lexicon";

/** `tldr` is present server-side (harness, scripts); the browser index omits it to stay small and fetches records for text. */
export type AskIndexEntry = { id: string; kind: Kind; name: string; aliases: string[]; route: string; tldr?: string; status?: string };
export type AskPair = { q: string; ids: string[]; source: "benchmark" | "questions" };
export type AskIndex = { version: 1; built?: string; entries: AskIndexEntry[]; pairs: AskPair[] };

/** Compact wire format: one row per entry, kinds by index, routes derived on load. */
export type AskIndexWire = { version: 1; built?: string; kinds: readonly string[]; rows: Array<[string, number, string, string[], string?]>; pairs: AskPair[] };

export function encodeAskIndex(index: AskIndex): AskIndexWire {
  return {
    version: 1, built: index.built, kinds: KINDS,
    rows: index.entries.map((e) => { const row: [string, number, string, string[], string?] = [e.id, KINDS.indexOf(e.kind), e.name, e.aliases]; if (e.status) row.push(e.status); return row; }),
    pairs: index.pairs,
  };
}

export function decodeAskIndex(w: AskIndexWire): AskIndex {
  const entries: AskIndexEntry[] = w.rows.map(([id, k, name, aliases, status]) => {
    const kind = (w.kinds[k] ?? "term") as Kind;
    return { id, kind, name, aliases, route: routeFor({ kind, id }), ...(status ? { status } : {}) };
  });
  return { version: 1, built: w.built, entries, pairs: w.pairs };
}

/** "Triple-negative breast cancer (TNBC)" -> "Triple-negative breast cancer". */
export function baseName(name: string): string {
  return name.replace(/\s*\([^()]*\)\s*$/, "").trim();
}

/** The abbreviation in a trailing parenthetical, if it looks like one: "(TNBC)" -> "TNBC"; "(computed tomography)" -> undefined. */
export function abbreviation(name: string): string | undefined {
  const m = name.match(/\(([A-Za-z0-9\-/&.+ ]{2,14})\)\s*$/)?.[1]?.trim();
  if (!m) return undefined;
  if (/^[a-z ]+$/.test(m) && m.length > 6) return undefined; // a gloss, not an abbreviation
  if (/^(generic|and biosimilars|oral|SC|EU|US|UK|fibrosis|NSCLC, EU)$/i.test(m)) return undefined;
  return m;
}

/** What to call a record in a generated sentence or follow-up: the abbreviation for cancers when there is one, else the base name. */
export function shortName(e: { kind: Kind; name: string }): string {
  const abbr = abbreviation(e.name);
  if (abbr && (e.kind === "cancer" || e.kind === "term" || e.kind === "technology") && /^[A-Z0-9\-/]{2,8}$/.test(abbr)) return abbr;
  const base = baseName(e.name);
  // "Gastric & gastro-oesophageal junction cancer" -> keep; "Sarcomas (soft tissue, bone, GIST)" -> "Sarcomas".
  return base || e.name;
}

/** Split a brand string such as "Keytruda / Keytruda Qlex (SC)" or "Tafinlar + Mekinist" into names. */
function splitBrand(brand: string): string[] {
  return brand.split(/\s*[\/;]\s*|\s+\+\s+/).map((s) => s.replace(/\s*\([^)]*\)\s*/g, " ").trim()).filter((s) => s.length >= 3 && !/^(and|or)$/i.test(s));
}

export type AliasSource = { id: string; kind: Kind; name: string; aka?: string[]; brand?: string; code?: string; symbol?: string; nct?: string };

/** Every string that should resolve to this record, deduplicated case-insensitively, name first. */
export function deriveAliases(e: AliasSource): string[] {
  const out: string[] = [];
  const base = baseName(e.name);
  const min = e.kind === "term" ? 3 : 4;
  const push = (s?: string) => {
    if (!s) return;
    const t = s.trim();
    if (t.length < 3 || /^\d+$/.test(t) || ASK_STOP.has(t.toLowerCase())) return;
    if (t.length < min && !/[A-Z0-9]/.test(t)) return;
    out.push(t);
  };
  push(base);
  push(abbreviation(e.name));
  // Glossary entries that name two things ("HER2-low and HER2-ultralow", "Hot vs cold tumours") resolve from each half.
  if (e.kind === "term") for (const h of base.split(/\s+(?:and|or|vs\.?|versus|\/|&)\s+/)) if (h !== base && h.length >= 4) push(h);
  // Slash-separated names ("PI3K / AKT / mTOR") also resolve from the compact form.
  if (/\s\/\s/.test(base)) push(base.replace(/\s\/\s/g, "/"));
  // Glossary phrase aliases about approval itself ("approved in the UK", "EU approval") would swallow the region or
  // the verb of an approval question; the intent rules read those words instead.
  for (const a of e.aka ?? []) if (!(e.kind === "term" && /\b(?:approved|approval|authori[sz]ation)\b/i.test(a))) push(a);
  if (e.brand) for (const b of splitBrand(e.brand)) push(b);
  if (e.code) for (const c of e.code.split(/\s*[,;\/]\s*/)) push(c);
  push(e.symbol);
  push(e.nct);
  for (const a of ASK_ALIASES[e.id] ?? []) push(a);
  const seen = new Set<string>();
  return out.filter((a) => { const k = a.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
}

/** First sentence of a TL;DR, capped, for chips and "not what you meant" rows. */
export function shortTldr(tldr: string, max = 160): string {
  const first = tldr.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+(?=[A-Z0-9"(])/)[0] ?? "";
  return first.length <= max ? first : `${first.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

let cache: Promise<AskIndex | null> | null = null;

/** Browser loader; resolves to null when the index has not been built (dev server without `npm run build:api`). */
export function loadAskIndex(): Promise<AskIndex | null> {
  if (!cache) {
    cache = fetch("/api/v1/ask-index.json").then(async (r) => (r.ok ? decodeAskIndex((await r.json()) as AskIndexWire) : null)).catch(() => null);
  }
  return cache;
}
