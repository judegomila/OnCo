/**
 * Shared helpers for the intelligence-feed scripts (fetch-fda, fetch-ema, fetch-abstracts, fetch-hta,
 * fetch-pulse, fetch-citations, fetch-survival, propose-updates).
 *
 * Every feed is static-export safe: a script fetches from a public source, writes a JSON snapshot under
 * public/, and the pages read that snapshot at build time. No secrets, no keys; polite rate limits.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const UA = "Mozilla/5.0 (compatible; OnCo/1.0; +https://github.com/judegomila/OnCo)";
export const REPO = "https://github.com/judegomila/OnCo";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const today = () => new Date().toISOString().slice(0, 10);
export function isoDaysAgo(d: number): string { const x = new Date(); x.setUTCDate(x.getUTCDate() - d); return x.toISOString().slice(0, 10); }

/** GET a URL as text with retries and backoff. Returns null on a non-retryable failure (404, 403 after retries). */
export async function getText(url: string, opts: { tries?: number; accept?: string; timeoutMs?: number } = {}): Promise<string | null> {
  const tries = opts.tries ?? 4;
  for (let i = 0; i < tries; i++) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), opts.timeoutMs ?? 60_000);
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: opts.accept ?? "*/*" }, redirect: "follow", signal: ctl.signal });
      clearTimeout(t);
      if (r.status === 429 || r.status >= 500) { await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) return null;
      return await r.text();
    } catch (e) {
      if (i === tries - 1) { console.warn(`  giving up ${url}: ${(e as Error).message}`); return null; }
      await sleep(1000 * (i + 1));
    }
  }
  return null;
}

export async function getJson<T>(url: string, opts: { tries?: number } = {}): Promise<T | null> {
  const text = await getText(url, { ...opts, accept: "application/json" });
  if (text === null) return null;
  try { return JSON.parse(text) as T; } catch { return null; }
}

export async function getBuffer(url: string, tries = 3): Promise<Buffer | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (r.status === 429 || r.status >= 500) { await sleep(2000 * (i + 1)); continue; }
      if (!r.ok) return null;
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      if (i === tries - 1) { console.warn(`  giving up ${url}: ${(e as Error).message}`); return null; }
      await sleep(1500 * (i + 1));
    }
  }
  return null;
}

export const publicPath = (...parts: string[]) => join(process.cwd(), "public", ...parts);

export function readJson<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, "utf8")) as T; } catch { return null; }
}

export function writeJson(path: string, data: unknown, pretty = false): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, pretty ? JSON.stringify(data, null, 1) : JSON.stringify(data));
}

// ---------------------------------------------------------------------------------------------------
// HTML and XML helpers (regex-level; the sources are simple, and we add no dependencies).
// ---------------------------------------------------------------------------------------------------

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", trade: "™", reg: "®", copy: "©", deg: "°", plusmn: "±", times: "×", micro: "µ", middot: "·", eacute: "é", auml: "ä", ouml: "ö", uuml: "ü", szlig: "ß" };

export function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n: string) => NAMED[n.toLowerCase()] ?? m);
}

/** Strip tags, decode entities, collapse whitespace. */
export function stripTags(html: string): string {
  return decodeEntities(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** Content of the first matching element (non-nested), or undefined. */
export function tagText(xml: string, tag: string): string | undefined {
  const m = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return undefined;
  return stripTags(m[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1"));
}

export type FeedItem = { title: string; link: string; date?: string; summary?: string };

/** Parse RSS 2.0, RSS 1.0 (RDF) and Atom into a flat item list. Dates are normalised to YYYY-MM-DD when parseable. */
export function parseFeed(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const blocks = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>|<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    const title = tagText(b, "title") ?? "";
    let link = tagText(b, "link") ?? "";
    if (!link) {
      const href = b.match(/<link[^>]*?href="([^"]+)"/i)?.[1] ?? b.match(/<item[^>]*rdf:about="([^"]+)"/i)?.[1];
      if (href) link = decodeEntities(href);
    }
    if (!link) { const guid = tagText(b, "guid"); if (guid && /^https?:/.test(guid)) link = guid; }
    const rawDate = tagText(b, "pubDate") ?? tagText(b, "dc:date") ?? tagText(b, "published") ?? tagText(b, "updated") ?? tagText(b, "prism:publicationDate") ?? tagText(b, "prism:coverDate");
    const summary = tagText(b, "description") ?? tagText(b, "summary") ?? tagText(b, "content");
    if (!title || !link) continue;
    items.push({ title, link: link.replace(/\?(rss|af)=[^&]*$/, ""), date: normaliseDate(rawDate), summary: summary?.slice(0, 600) });
  }
  return items;
}

export function normaliseDate(s?: string): string | undefined {
  if (!s) return undefined;
  const iso = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];
  const t = Date.parse(s);
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().slice(0, 10);
}

/** "September 9, 2026" -> "2026-09-09". */
export function parseLongDate(s: string): string | undefined {
  const m = s.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (!m) return undefined;
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  return `${m[3]}-${String(months.indexOf(m[1].toLowerCase()) + 1).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------------------------------
// FDA Oncology Center of Excellence approval notifications (shared by fetch-fda and fetch-pulse).
// ---------------------------------------------------------------------------------------------------

export const FDA_OCE_URL = "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancer-hematologic-malignancies-approval-notifications";
export type OceItem = { date: string; title: string; url: string; summary: string };

/** The OCE page is a three-column table: Webpage (link), Description ("On <date>, the Food and Drug Administration ..."), Date. */
export function parseOcePage(html: string): OceItem[] {
  const out: OceItem[] = [];
  for (const row of html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? []) {
    const cells: string[] = Array.from(row.match(/<td[^>]*>[\s\S]*?<\/td>/gi) ?? []);
    if (cells.length < 2) continue;
    const href = cells[0].match(/href="([^"]+)"/i)?.[1];
    if (!href) continue;
    const title = stripTags(cells[0]);
    const summary = stripTags(cells[1]);
    const date = parseLongDate(summary) ?? normaliseDate(cells[2] ? stripTags(cells[2]) : undefined);
    if (!date || !title) continue;
    out.push({ date, title, url: href.startsWith("http") ? href : `https://www.fda.gov${href}`, summary });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------
// Entity name matching: map free text (titles, abstracts, INN strings) to OnCo entity ids.
// ---------------------------------------------------------------------------------------------------

export type MatchableEntity = { id: string; kind: string; name: string; aka?: string[]; brand?: string; code?: string };
type Term = { term: string; id: string; kind: string; cs: boolean };

/** Words that are entity names or aliases but far too generic to match on their own. */
const STOP = new Set(["cancer", "tumour", "tumor", "therapy", "cells", "test", "device", "oral", "blood", "lung", "liver", "brain", "skin", "bone", "head", "neck", "assay", "panel", "score", "index", "shield", "signal", "guardian", "ascent", "destiny", "pathfinder", "monarch", "impact", "insight", "harmony", "keynote", "checkmate", "javelin", "tropion", "select", "prime", "phoenix", "summit", "atlas", "voyager", "horizon", "compass", "eagle", "unity", "alliance"]);

export function normaliseTerm(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[\u2010-\u2015]/g, "-").replace(/\s+/g, " ").trim();
}

function escapeRe(s: string): string { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function splitName(name: string): string[] {
  const base = name.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const parts = base.split(/\s*(?:\/|\s\+\s|\s&\s|;)\s*/).map((p) => p.trim()).filter(Boolean);
  return parts.length ? parts : [base];
}

export class NameMatcher {
  private terms: Term[] = [];
  private byFirstChar = new Map<string, Term[]>();

  constructor(entities: MatchableEntity[], kinds?: string[]) {
    const seen = new Set<string>();
    for (const e of entities) {
      if (kinds && !kinds.includes(e.kind)) continue;
      const raw: string[] = [...splitName(e.name), ...(e.aka ?? []).flatMap(splitName)];
      if (e.brand) raw.push(...e.brand.split(/\s*\/\s*/));
      if (e.code) raw.push(...e.code.split(/\s*[,;]\s*/).map((c) => c.replace(/\s*\(.*?\)\s*/g, "").trim()));
      for (const r of raw) {
        const t = normaliseTerm(r);
        if (t.length < 4 || STOP.has(t) || /^[0-9. %-]+$/.test(t)) continue;
        // All-caps short names (trial acronyms, codes like "MK-2870") match case-sensitively to avoid common words.
        const cs = e.kind === "trial" && /^[A-Z0-9-]+$/.test(r.trim()) && /[A-Z]{3}/.test(r);
        const key = `${e.id}|${t}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const term: Term = { term: cs ? r.trim() : t, id: e.id, kind: e.kind, cs };
        this.terms.push(term);
        const fc = term.term[0].toLowerCase();
        this.byFirstChar.set(fc, [...(this.byFirstChar.get(fc) ?? []), term]);
      }
    }
    this.terms.sort((a, b) => b.term.length - a.term.length);
  }

  /** All entity ids whose name, alias, brand or code appears as a whole word or phrase in the text. */
  match(text: string, kinds?: string[]): string[] {
    const low = normaliseTerm(text);
    const found = new Map<string, number>();
    for (const t of this.terms) {
      if (kinds && !kinds.includes(t.kind)) continue;
      const hay = t.cs ? text : low;
      if (!hay.includes(t.term)) continue;
      const re = new RegExp(`(^|[^a-z0-9])${escapeRe(t.term)}(?![a-z0-9])`, t.cs ? "" : "i");
      if (re.test(hay)) found.set(t.id, Math.max(found.get(t.id) ?? 0, t.term.length));
    }
    return [...found.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  }

  /** Best single match for a short string such as an INN: the entity with the longest matching term; exact equality wins. */
  best(text: string, kinds?: string[]): string | undefined {
    const low = normaliseTerm(text);
    for (const t of this.terms) if ((!kinds || kinds.includes(t.kind)) && !t.cs && t.term === low) return t.id;
    return this.match(text, kinds)[0];
  }
}

/** Build a matcher from the graph without importing it here (keeps this module test-friendly). */
export function matchableFromGraph(entities: Array<{ id: string; kind: string; name: string; aka: string[] } & Record<string, unknown>>): MatchableEntity[] {
  return entities.map((e) => ({ id: e.id, kind: e.kind, name: e.name, aka: e.aka, brand: typeof e.brand === "string" ? e.brand : undefined, code: typeof e.code === "string" ? e.code : undefined }));
}

/** Oncology keyword filter for general-news feeds. */
export const ONCO_WORDS = /\b(cancer|oncolog|tumou?r|carcinoma|leuka?emia|lymphoma|myeloma|melanoma|sarcoma|glioma|glioblastoma|metasta|chemotherap|immunotherap|antibody-drug|ADC|CAR-T|radioligand|biomarker|neoplasm|mesothelioma|myelodysplastic)/i;

/** Prefilled GitHub issue URL. */
export function issueUrl(title: string, body: string, labels: string[] = []): string {
  const p = new URLSearchParams({ title, body });
  if (labels.length) p.set("labels", labels.join(","));
  return `${REPO}/issues/new?${p.toString()}`;
}
