/**
 * Gap audit: a read-only worklist of what the site leaves out, found mechanically.
 *
 *   npx tsx scripts/gap-audit.ts            writes docs/proposals/gap-audit.md and docs/proposals/gap-audit.json
 *   npx tsx scripts/gap-audit.ts --stdout   prints the markdown instead of writing files
 *   npx tsx scripts/gap-audit.ts --sample 20 --seed 7   prints a random sample of findings to check by hand
 *
 * Started 3 Nov 2026 after the owner found that /biomarkers/ctdna-mrd-positive/ listed no Personalis NeXT Personal
 * and no Foundation Medicine MRD test: NeXT Personal existed only as a row of the side table in
 * src/data/tumour-tests.ts, with no `drugId` and no record of its own, so every page fed by records missed it.
 *
 * Each detector mirrors what a page actually renders, read from the components:
 *  - a biomarker page's "Tests that measure it" box lists `assays` rows and `tests` rows of TUMOUR_TESTS only
 *    (src/components/BiomarkerDetail.tsx); test records in the biomarker's `drugs` appear only under "Connected";
 *  - a drug page shows "Biomarker readouts" from `readoutsForDrug`, which reads a biomarker's `drugs`, thresholds
 *    and companion diagnostics, never its `tests` rows (src/lib/biomarkers.ts);
 *  - a company page's Products tab is the company's `drugs` plus every drug record naming the company
 *    (src/components/EntityDetail.tsx); TUMOUR_TESTS rows, assay vendors and companion-diagnostic makers do not reach it;
 *  - a technology page's Products tab is every drug record listing the technology; TUMOUR_TESTS `technologies` do not reach it.
 *
 * The six classes:
 *  1 side-table row with no record, or with an empty id field although a record exists, or with an id that points
 *    at a different product;
 *  2 a product named in prose that has no record;
 *  3 a hub page that omits a member it should list;
 *  4 a one-way link the page on the other end does not render;
 *  5 a diagnostics or biotech company whose page shows no products although its text or the side tables name some;
 *  6 one product rendered twice in one section.
 *
 * Nothing here edits data. Findings are ranked by how many reader-facing pages each gap touches.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export type GapClass = "side-table" | "prose" | "hub" | "one-way" | "company-no-products" | "duplicate";
export const CLASS_LABEL: Record<GapClass, string> = {
  "side-table": "1. Side-table row with no record or no link",
  prose: "2. Named in prose, missing as a record",
  hub: "3. Hub page omits a member",
  "one-way": "4. One-way link the other page does not render",
  "company-no-products": "5. Company page shows no products",
  duplicate: "6. One product rendered twice in a section",
};
export type Confidence = "high" | "medium" | "low";
export type Finding = {
  cls: GapClass;
  /** Short machine label of the rule that fired. */
  rule: string;
  /** The page a reader would see the gap on. */
  page: string;
  /** Every reader-facing page the gap touches; the ranking key. */
  pages: string[];
  /** file:line of the row or record to edit. */
  where: string;
  /** The missing or mislinked thing, by name. */
  subject: string;
  /** An existing record id that should be linked, when one exists. */
  suggestedId?: string;
  confidence: Confidence;
  detail: string;
};

/** Record-like entry for the name index: anything with an id, a kind and the names a reader might use. */
export type IndexEntry = { id: string; kind: string; names: string[] };
/** Names of single facilities (proton centres, biobanks, donor registries) that a university row must not resolve to by first word. */
const FACILITY_NAME = /\b(proton|hadron|ion-beam|biobank|cord blood|donor registry)\b/;
export type Hit = { id: string; kind: string; key: string; exact: boolean };

// ---------------------------------------------------------------------------------------------------------------------
// Names
// ---------------------------------------------------------------------------------------------------------------------
/** Lower case, accents folded, punctuation to spaces, UK spelling of tumour; tokens are whole words. */
export function norm(s: string): string {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/\btumor/g, "tumour")
    .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
/** Name without trailing or embedded parentheticals. */
export const bare = (s: string) => s.replace(/\s*\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
/** Alphanumerics only, for drug codes: "RMC-6236" and "RMC 6236" meet as "rmc6236". */
export const compact = (s: string) => norm(s).replace(/ /g, "");

/**
 * Single words that name a kind of product rather than a product. A one-word key from this list, or any one-word key
 * shorter than five letters, is matched only when it is the whole phrase, never inside a longer one; "Shield" alone
 * must not claim "Guardant Shield" for a record that happens to be called Shield unless the phrase is exactly that.
 */
export const GENERIC_WORDS = new Set([
  "test", "tests", "assay", "assays", "panel", "kit", "cancer", "cancers", "therapy", "screening", "detect", "detection", "reveal", "shield", "guard",
  "seek", "liquid", "heme", "personal", "insight", "profile", "portrait", "tracker", "mrd", "cdx", "dx", "blood", "tissue", "tumour", "genomic",
  "genomics", "health", "medical", "medicine", "diagnostics", "diagnostic", "bio", "biotech", "therapeutics", "pharma", "oncology", "sciences",
  "labs", "laboratories", "precision", "focus", "select", "one", "next", "plus", "pro", "dna", "rna", "ctdna", "cfdna", "ngs", "pcr", "ihc", "fish",
  "lung", "breast", "colon", "prostate", "signal", "monitor", "monitoring", "check", "guide", "map", "score", "index", "dual", "duo", "trio",
  "first", "core", "clear", "early", "life", "care", "vision", "insights", "track", "trace", "sure", "smart", "reference", "standard",
]);

/** The names an index entry is reachable by, normalised, with parentheticals stripped and kept apart. */
export function keysOf(names: string[]): string[] {
  const out = new Set<string>();
  for (const n of names) {
    if (!n) continue;
    const a = norm(n), b = norm(bare(n));
    if (a) out.add(a);
    if (b) out.add(b);
  }
  return [...out];
}

export class NameIndex {
  private exactMap = new Map<string, IndexEntry[]>();
  private gramMap = new Map<string, IndexEntry[]>();
  private compactMap = new Map<string, IndexEntry[]>();
  private primary = new Map<string, Set<string>>();
  private tokenSets: Array<{ e: IndexEntry; key: string; toks: Set<string> }> = [];
  readonly entries: IndexEntry[];
  constructor(entries: IndexEntry[]) {
    this.entries = entries;
    for (const e of entries) {
      // The record's own name, and its halves when it is "Roche / Genentech", count as its name rather than an alias.
      this.primary.set(e.id, new Set(keysOf([e.names[0] ?? "", ...(e.names[0] ?? "").split(" / ")])));
      for (const k of keysOf(e.names)) this.tokenSets.push({ e, key: k, toks: new Set(k.split(" ")) });
      for (const k of keysOf(e.names)) {
        push(this.exactMap, k, e);
        const toks = k.split(" ");
        // Containment keys: multi-word names, or a single distinctive word (five letters or more, or with a digit).
        if (toks.length > 1 || ((k.length >= 5 || /\d/.test(k)) && !GENERIC_WORDS.has(k))) push(this.gramMap, k, e);
        const c = compact(k);
        if (c.length >= 5 && /\d/.test(c) && /[a-z]/.test(c)) push(this.compactMap, c, e);
      }
    }
  }
  /** Exact match on a normalised name (or the name without its parenthetical). */
  exact(phrase: string, kinds?: string[]): Hit[] {
    const out: Hit[] = [];
    for (const k of keysOf([phrase])) for (const e of this.exactMap.get(k) ?? []) if (!kinds || kinds.includes(e.kind)) out.push({ id: e.id, kind: e.kind, key: k, exact: true });
    // A record's own name outranks another record's alias ("Merck KGaA" is merck-kgaa before it is SpringWorks' parent).
    return uniqHits(out).sort((a, b) => Number(this.isPrimary(b.id, b.key)) - Number(this.isPrimary(a.id, a.key)));
  }
  /** Records whose name occurs inside the phrase as a run of whole words; the longest key wins. */
  within(phrase: string, kinds?: string[]): Hit[] {
    const toks = norm(phrase).split(" ").filter(Boolean);
    const out: Hit[] = [];
    for (let n = Math.min(8, toks.length); n >= 1; n--) {
      for (let i = 0; i + n <= toks.length; i++) {
        const k = toks.slice(i, i + n).join(" ");
        for (const e of this.gramMap.get(k) ?? []) if (!kinds || kinds.includes(e.kind)) out.push({ id: e.id, kind: e.kind, key: k, exact: false });
      }
      if (out.length) break;
    }
    return uniqHits(out);
  }
  /** Drug codes: "RMC-6236" against code, aka and name with punctuation removed. */
  code(code: string, kinds?: string[]): Hit[] {
    return uniqHits((this.compactMap.get(compact(code)) ?? []).filter((e) => !kinds || kinds.includes(e.kind)).map((e) => ({ id: e.id, kind: e.kind, key: compact(code), exact: true })));
  }
  /** Exact first, then whole-word containment. */
  find(phrase: string, kinds?: string[]): Hit[] {
    const ex = this.exact(phrase, kinds);
    return ex.length ? ex : this.within(phrase, kinds);
  }
  /** Was the key the record's own name (not an aka, a brand or a former company name)? */
  isPrimary(id: string, key: string): boolean { return this.primary.get(id)?.has(key) ?? false; }
  /**
   * Records whose name holds every word of the phrase, in any order: "FoundationOne CDx" is inside a record called
   * "FoundationOne CDx / Liquid CDx". The phrase must have two words or one distinctive word.
   */
  holding(phrase: string, kinds?: string[]): Hit[] {
    const toks = norm(phrase).split(" ").filter(Boolean);
    if (!toks.length || (toks.length === 1 && (toks[0].length < 5 || GENERIC_WORDS.has(toks[0])))) return [];
    const out: Hit[] = [];
    for (const t of this.tokenSets) if ((!kinds || kinds.includes(t.e.kind)) && t.key !== toks.join(" ") && toks.every((x) => t.toks.has(x))) out.push({ id: t.e.id, kind: t.e.kind, key: t.key, exact: false });
    return uniqHits(out);
  }
  /** Records whose own name starts with this word. */
  byFirstWord(word: string, kinds?: string[]): Hit[] {
    const out: Hit[] = [];
    for (const e of this.entries) if ((!kinds || kinds.includes(e.kind)) && norm(e.names[0] ?? "").split(" ")[0] === word) out.push({ id: e.id, kind: e.kind, key: norm(e.names[0]), exact: false });
    return out;
  }
  namesOf(id: string): string[] {
    return keysOf(this.entries.find((e) => e.id === id)?.names ?? []);
  }
}
function push<K, V>(m: Map<K, V[]>, k: K, v: V) { const l = m.get(k); if (l) { if (!l.includes(v)) l.push(v); } else m.set(k, [v]); }
function uniqHits(h: Hit[]): Hit[] { const seen = new Set<string>(); return h.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true))); }

/** Remove a leading owner name ("Natera Signatera" -> "Signatera"); the owner may be "Foundation Medicine (Roche)". */
export function stripOwner(name: string, owners: string[]): string {
  let n = name.trim();
  for (const o of owners) {
    for (const cand of [o, bare(o)]) {
      if (!cand) continue;
      const re = new RegExp(`^${cand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i");
      if (re.test(n)) { n = n.replace(re, ""); break; }
    }
  }
  return n;
}

/** Does the row name and the record share a name, in either direction, as whole words? */
export function namesAgree(rowName: string, recordKeys: string[], owners: string[] = []): boolean {
  const r = new Set([norm(rowName), norm(bare(rowName)), norm(stripOwner(rowName, owners)), norm(bare(stripOwner(rowName, owners)))].filter(Boolean));
  const has = (hay: string, needle: string) => needle.length >= 3 && ` ${hay} `.includes(` ${needle} `);
  for (const a of r) for (const k of recordKeys) {
    if (a === k) return true;
    const at = a.split(" "), kt = new Set(k.split(" "));
    if (at.length >= 2 && at.every((x) => kt.has(x))) return true;
    if (k.split(" ").length > 1 || (k.length >= 5 && !GENERIC_WORDS.has(k))) { if (has(a, k)) return true; }
    if (a.split(" ").length > 1 || (a.length >= 5 && !GENERIC_WORDS.has(a))) { if (has(k, a)) return true; }
  }
  return false;
}

/**
 * Two labels for one product, as a reader would judge them: equal without parentheticals, or one inside the other as
 * whole words ("Signatera" in "Natera Signatera"). Word sets are not enough: "FoundationOne CDx" and "FoundationOne
 * Liquid CDx" are two products. So are two names that differ only inside their brackets: "VENTANA PD-L1 (SP142) Assay"
 * and "VENTANA PD-L1 (SP263) Assay" are different antibody clones with different FDA claims, which class 6
 * (detectDuplicateItems) already kept apart. This function did not, and on 17 November 2026 it reported the two as one
 * product twice on /biomarkers/pd-l1-tc-score/ once both assays were listed there.
 */
export function sameProduct(a: string, b: string): boolean {
  const A = norm(bare(a)), B = norm(bare(b));
  if (!A || !B) return false;
  const brackets = (s: string) => [...s.matchAll(/\(([^)]*)\)/g)].map((m) => norm(m[1])).join("|");
  if (brackets(a) && brackets(b) && brackets(a) !== brackets(b)) return false;
  if (A === B) return true;
  const [short, long] = A.length <= B.length ? [A, B] : [B, A];
  const distinctive = short.split(" ").length >= 2 || (short.length >= 5 && !GENERIC_WORDS.has(short));
  return distinctive && ` ${long} `.includes(` ${short} `);
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 1: side-table rows
// ---------------------------------------------------------------------------------------------------------------------
export type SideRow = {
  table: string;
  /** file:line of the row. */
  where: string;
  name: string;
  /** Record kinds the row's id field may point at. */
  want: string[];
  /** Field that holds the id; empty string when the table has no such field and the row can never link. */
  idField: string;
  id?: string;
  /** Owner or vendor names to strip from the front of the row name before matching. */
  owners?: string[];
  /** Pages that render the row. */
  pages: string[];
  /** Pages the record would add if it existed (the owner's page, technology pages...). */
  wouldAdd?: string[];
  /** The row is certainly a named product or organisation, not a class or a generic description. */
  named: boolean;
  /** Check that a set id names the same product (product tables only). */
  checkAgreement?: boolean;
  /** The caller already looked and found nothing: report the row as having no record. */
  noMatch?: boolean;
  /** Table name to report and merge on when `table` carries a per-record prefix. */
  family?: string;
};

const how = (h: Hit, mode: MatchMode) => mode === "exact" ? "by name" : mode === "holding" ? `inside its name "${h.key}"` : mode === "parent" ? `on the parent named in brackets ("${h.key}")` : mode === "first-word" ? `on the first word ("${h.key}"), so it is probably a division or subsidiary` : `on "${h.key}"`;
type MatchMode = "exact" | "within" | "holding" | "parent" | "first-word";
const ORG_KINDS = ["company", "institution", "collection"];

/** Find the record a side-table row names, in decreasing order of certainty. */
export function matchRow(r: Pick<SideRow, "name" | "want" | "owners">, idx: NameIndex): { hits: Hit[]; mode: MatchMode } {
  const stripped = stripOwner(r.name, r.owners ?? []);
  let hits = idx.exact(r.name, r.want);
  if (!hits.length && stripped !== r.name) hits = idx.exact(stripped, r.want);
  // Only aliases matched ("Abbott" is an alias on Exact Sciences): a company whose own name starts with the word wins.
  if (hits.length && !hits.some((h) => idx.isPrimary(h.id, h.key)) && r.want.some((k) => ORG_KINDS.includes(k)) && !norm(r.name).includes(" ")) {
    const p = idx.byFirstWord(norm(r.name), r.want);
    if (p.length === 1) return { hits: p, mode: "first-word" };
  }
  if (hits.length) return { hits, mode: "exact" };
  // Organisations match inside a longer string only on a multi-word key or their own name: the one-word alias
  // "Alliance" must not claim the "Global Alliance for Genomics and Health".
  hits = idx.within(stripped, r.want).filter((h) => h.kind === "drug" || h.key.includes(" ") || idx.isPrimary(h.id, h.key));
  // A within-match on the maker's own name inside a product row only says who makes it, not that the product exists.
  const own = (r.owners ?? []).map((o) => norm(bare(o)));
  hits = hits.filter((h) => !own.includes(h.key) && !own.some((o) => o.startsWith(h.key + " ") || (h.key.startsWith(o + " ") && h.key.split(" ").length <= 2)));
  if (hits.length) return { hits, mode: "within" };
  if (r.want.includes("drug")) {
    hits = idx.holding(stripped, ["drug"]);
    if (hits.length) return { hits, mode: "holding" };
  }
  if (r.want.some((k) => ORG_KINDS.includes(k))) {
    // "Ventana Medical Systems (Roche)": the bracket names the parent.
    for (const m of r.name.matchAll(/\(([^)]+)\)/g)) {
      hits = idx.exact(m[1], r.want);
      // "(Roche Tissue Diagnostics)": the bracket's first word is the parent's name.
      if (!hits.length) hits = idx.exact(norm(m[1]).split(" ")[0], r.want).filter((h) => idx.isPrimary(h.id, h.key));
      if (hits.length) return { hits, mode: "parent" };
    }
    // "Roche Molecular Systems", "Agilent": the first word is a company's whole name, or the first word of exactly one
    // company's own name ("Agilent Technologies").
    const words = norm(bare(r.name)).split(" ");
    const first = words[0];
    if (first && first.length >= 5 && !GENERIC_WORDS.has(first)) {
      hits = words.length > 1 ? idx.exact(first, r.want).filter((h) => idx.isPrimary(h.id, h.key)) : [];
      // "Emory University" is not a division of the Emory Proton Therapy Center: a single treatment facility, biobank
      // or donor registry that happens to be the only record starting with a university's place name is not its parent.
      if (!hits.length) { const p = idx.byFirstWord(first, r.want).filter((h) => !(words[1] === "university" && FACILITY_NAME.test(h.key))); if (p.length === 1) hits = p; }
      if (hits.length) return { hits, mode: "first-word" };
    }
  }
  return { hits: [], mode: "exact" };
}

export function detectSideTableGaps(rows: SideRow[], idx: NameIndex, has: (id: string) => boolean): Finding[] {
  const out: Finding[] = [];
  for (const r of rows) {
    const page = r.pages[0] ?? "";
    const table = r.family ?? r.table;
    if (r.id) {
      if (!has(r.id)) {
        out.push({ cls: "side-table", rule: "dangling-id", page, pages: r.pages, where: r.where, subject: r.name, confidence: "high", detail: `${table}: ${r.idField} "${r.id}" names no record.` });
        continue;
      }
      if (r.checkAgreement && !namesAgree(r.name, idx.namesOf(r.id), r.owners ?? [])) {
        out.push({ cls: "side-table", rule: "id-names-other-product", page, pages: r.pages, where: r.where, subject: r.name, suggestedId: undefined, confidence: "medium",
          detail: `${table}: ${r.idField} "${r.id}" points at a record whose names (${idx.namesOf(r.id).slice(0, 3).join(" / ")}) do not include this product, so the row links to a sibling product's page.` });
      }
      continue;
    }
    const { hits, mode } = r.noMatch ? { hits: [] as Hit[], mode: "exact" as MatchMode } : matchRow(r, idx);
    if (hits.length) {
      const h = hits[0];
      const viaAka = !idx.isPrimary(h.id, h.key) && (mode === "exact" || mode === "within");
      out.push({
        cls: "side-table", rule: r.idField ? "id-empty-record-exists" : "no-id-field-record-exists", page, pages: r.pages, where: r.where, subject: r.name, suggestedId: h.id,
        confidence: mode === "exact" && hits.length === 1 && !viaAka ? "high" : "medium",
        detail: (r.idField
          ? `${table}: ${r.idField} is empty although record "${h.id}" (${h.kind}) matches ${how(h, mode)}${hits.length > 1 ? `; also ${hits.slice(1, 4).map((x) => x.id).join(", ")}` : ""}.`
          : `${table}: the row matches record "${h.id}" (${h.kind}) ${how(h, mode)} but the table has no id field, so the row cannot link to it.`)
          + (viaAka ? ` The match is on an alias of the record ("${h.key}"), e.g. an acquired company's name or a family record; check it is the same thing.` : ""),
      });
    } else {
      out.push({
        cls: "side-table", rule: "no-record", page, pages: [...r.pages, ...(r.wouldAdd ?? [])], where: r.where, subject: r.name, confidence: r.named ? "high" : "medium",
        detail: `${table}: no ${r.want.join(" or ")} record carries this name${r.idField ? ` and ${r.idField} is empty` : ""}; pages fed by records miss it.`,
      });
    }
  }
  return mergeSame(out);
}

/** One finding per table, rule, subject and suggestion: the same device on twenty readouts is one gap on twenty pages. */
export function mergeSame(fs: Finding[]): Finding[] {
  const by = new Map<string, Finding & { wheres: string[] }>();
  for (const f of fs) {
    const k = [f.rule, f.detail.split(":")[0], norm(f.subject), f.suggestedId ?? ""].join("|");
    const cur = by.get(k);
    if (!cur) { by.set(k, { ...f, pages: [...f.pages], wheres: [f.where] }); continue; }
    for (const p of f.pages) if (!cur.pages.includes(p)) cur.pages.push(p);
    if (!cur.wheres.includes(f.where)) cur.wheres.push(f.where);
  }
  return [...by.values()].map(({ wheres, ...f }) => ({ ...f, where: wheres.length > 1 ? `${wheres[0]} (+${wheres.length - 1} more)` : wheres[0] }));
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 2: products named in prose
// ---------------------------------------------------------------------------------------------------------------------
/** Words that end a product name often enough to be worth a look. Kept short: precision first. */
export const PRODUCT_SUFFIXES = ["CDx", "Dx", "DX", "MRD", "Detect", "Tracker", "Liquid", "Seek", "Guard", "Reveal", "Shield", "Heme", "Personal", "INSIGHT", "Portrait"];
const SUF = PRODUCT_SUFFIXES.join("|");
/** A brand token: capitalised, camel-case (myChoice, xT) or with digits (Guardant360). */
const TOK = "(?:[A-Z][A-Za-z0-9+]*|[a-z]{1,8}[A-Z][A-Za-z0-9+]*|[A-Za-z]+[0-9]+[A-Za-z0-9]*)";
const PRODUCT_RE = new RegExp(`(?<![A-Za-z0-9-])((?:${TOK}[ -]){0,2}${TOK}[ -](?:${SUF})|${TOK}(?:CDx|Dx))(?![A-Za-z0-9])`, "g");

/**
 * Tokens that are never a brand: acronyms of tests and analytes, and words that start sentences. A phrase whose
 * every token before the suffix is in this set ("ctDNA MRD", "PCR MRD") is a description, not a product.
 */
export const NOT_BRAND = new Set(["ctdna", "cfdna", "dna", "rna", "ngs", "pcr", "mrd", "ihc", "fish", "ish", "cdx", "dx", "the", "a", "an", "its", "their",
  "fda", "ema", "nhs", "us", "uk", "eu", "ce", "ivd", "ldt", "clia", "pma", "tumour", "tumor", "blood", "plasma", "tissue", "liquid", "residual", "molecular",
  "minimal", "measurable", "disease", "positive", "negative", "informed", "naive", "bespoke", "personalised", "personalized", "assay", "test", "tests",
  "and", "or", "with", "for", "by", "of", "in", "on", "after", "before", "early", "late", "high", "low", "any", "each", "this", "that", "these", "those",
  "lung", "breast", "colorectal", "bladder", "prostate", "cancer", "cancers", "both", "when", "where", "while", "if", "is", "was", "are", "be", "no", "not",
  "her2", "egfr", "kras", "brca", "brca1", "brca2", "alk", "ros1", "braf", "pd", "l1", "pdl1", "msi", "tmb", "hrd", "flt3", "idh1", "idh2", "pik3ca", "esr1", "ret", "met", "ntrk",
  "undetectable", "detectable", "detected", "undetected", "sustained", "deep", "peripheral", "bone", "marrow", "serial", "baseline",
  "oral", "european", "china", "like", "whether", "patients", "patient", "with", "first", "line", "sensitive", "therapy", "response", "through", "free", "companion",
  "nccn", "esmo", "asco", "aacr", "who", "nice", "ii", "iii", "iv", "i", "plus", "ultra", "next", "new", "one", "two", "single", "multi", "pan", "personal"]);

/**
 * Suffixes that are also ordinary English ("positive MRD", "free liquid", "results reveal"): a phrase ending in one is
 * kept only when a word before it is brand-shaped (an inner capital or a digit: FoundationOne, Guardant360, NeXT) or
 * is the distinctive first word of a company in the corpus (Haystack, Ibex, Guardant).
 */
export const WEAK_SUFFIXES = new Set(["MRD", "Liquid", "Reveal", "Shield", "Personal", "Detect"]);
const brandShaped = (t: string) => /[a-z][A-Z]/.test(t) || /[A-Za-z]\d|\d[A-Za-z]/.test(t) || /^[A-Z][a-zA-Z]*[A-Z][a-z]/.test(t);

export function extractProductPhrases(text: string, companyWords: Set<string> = new Set()): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(PRODUCT_RE)) {
    let p = m[1].trim();
    // Drop leading sentence words ("The Signatera MRD" -> "Signatera MRD") and leading generic tokens.
    const toks = p.split(/[ -]/);
    while (toks.length > 1 && NOT_BRAND.has(toks[0].toLowerCase())) toks.shift();
    p = toks.join(" ");
    const last = toks[toks.length - 1];
    const suffixOnly = PRODUCT_SUFFIXES.includes(last);
    const brandToks = suffixOnly ? toks.slice(0, -1) : [last.replace(/(CDx|Dx)$/, "")];
    // "RxDx" is half of "VENTANA MMR RxDx Panel", not a brand: a one-word name needs three letters before the suffix.
    if (!suffixOnly && toks.length === 1 && brandToks[0].length < 3) continue;
    if (!brandToks.length || brandToks.every((t) => !t || NOT_BRAND.has(t.toLowerCase()) || /^[A-Z0-9]{1,5}$/.test(t) && !/[a-z]/.test(t) && !/\d/.test(t))) continue;
    if (suffixOnly && WEAK_SUFFIXES.has(last) && !brandToks.some((t) => brandShaped(t) || companyWords.has(t.toLowerCase()))) continue;
    // "Burning Rock Dx Co., Ltd.", "CareDx agreed to acquire": a company named like a product.
    if (/^\s*,?\s*(Co\b|Inc\b|Ltd\b|LLC\b|GmbH\b|Corp|S\.A\.|agreed|acquired|acquires|complete|announc|8-K|Holdings)/.test(text.slice(m.index! + m[0].length, m.index! + m[0].length + 20))) continue;
    out.add(p);
  }
  return [...out];
}

/** Asset names in a deal description: drug codes with or without a hyphen ("BNT327", "HRS-1167") and generic names. */
export function assetNames(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(/(?<![A-Za-z0-9-])([A-Z]{2,6}-?\d{2,6}[A-Za-z]?)(?![A-Za-z0-9])/g)) if (!CODE_PREFIX_SKIP.has(m[1].replace(/[-\d].*$/, ""))) out.add(m[1]);
  for (const m of text.matchAll(/\b([A-Za-z][a-z]{3,}(?:mab|tinib|rafenib|ciclib|parib|lisib|degib|sertib|zomib|resib|tecan|vedotin|platin|taxel|rubicin|leucel|cel|stat|tide|imod|lutamide|ib))\b/g)) {
    const w = m[1];
    if (w.length >= 7 && !/^(describ|inhibit|prescrib|exhib|ascrib|subscrib)/i.test(w)) out.add(w);
  }
  return [...out];
}

/** Investigational drug codes: two to five capitals, a hyphen, three to six digits ("RMC-6236", "DS-8201a"). */
const CODE_RE = /(?<![A-Za-z0-9-])([A-Z]{2,5})-(\d{3,6}[a-z]?)(?![A-Za-z0-9-])/g;
/** Prefixes that look like codes but are registries, scales, filings, cohorts or tumour markers. */
export const CODE_PREFIX_SKIP = new Set(["NCT", "ISRCTN", "JCOG", "EORTC", "CALGB", "ECOG", "RTOG", "NSABP", "GOG", "SWOG", "ACOSOG", "NCIC", "ICD", "ISO", "CA", "FY", "UICC", "AJCC",
  "WHO", "EU", "CTCAE", "HLA", "PMA", "BLA", "NDA", "IND", "ANDA", "EUA", "DEN", "SB", "HR", "OR", "CI", "UK", "US", "CTRI", "JRCT", "CTR", "KCT", "ACTRN", "DRKS", "IRCT",
  "TCGA", "GDC", "PRJNA", "SRR", "GSE", "HGNC", "OMIM", "CVE", "PDB", "EC", "TROG", "AGITG", "ANZGOG", "UNICANCER", "GBG", "IBCSG", "BIG", "NRG", "AIO", "GEICAM",
  "HOVON", "GIMEMA", "GHSG", "LYSA", "AALL", "AAML", "ANBL", "ACNS", "AHOD", "AREN", "ARST", "AEWS", "AOST", "APEC", "COG", "IFCT", "PRODIGE", "FFCD", "GERCOR",
  "ATC", "CPT", "SNOMED", "LOINC", "NIH", "NCI", "SPORE", "MRC", "ACT", "COVID", "SARS", "H", "CD"]);

export function extractCodes(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(CODE_RE)) {
    if (CODE_PREFIX_SKIP.has(m[1])) continue;
    // "the KOMET-017 trial", "study ITCC-059": a study name, not a product.
    const around = text.slice(Math.max(0, m.index! - 40), m.index! + m[0].length + 40);
    // "with the adjuvant OBI-821", "PNU-159682-packaged": a component of a product, not a product.
    if (/\b(adjuvant|payload|toxin|linker|warhead|tracer|isotope)\s+(\w+\s+)?$/i.test(text.slice(Math.max(0, m.index! - 30), m.index!)) || /^-?(packaged|loaded|conjugated|based)/.test(text.slice(m.index! + m[0].length))) continue;
    if (new RegExp(`(trial|study|studies|cohort|registry|protocol)\\W+(\\w+\\W+){0,2}${m[0]}|${m[0]}\\W+(\\w+\\W+){0,2}(trial|study|cohort|registry|protocol)`, "i").test(around)) continue;
    out.add(`${m[1]}-${m[2]}`);
  }
  return [...out];
}

export type ProseSource = { page: string; where: string; text: string; /** Pages of this kind (trial registry text) give low confidence on their own. */ weak?: boolean; /** Record ids the text belongs to or links, to skip self-matches. */ self?: string[]; /** Owner names to strip. */ owners?: string[] };

/** One finding per distinct missing product phrase, with every page that names it. */
export function detectProseGaps(sources: ProseSource[], idx: NameIndex, opts: { productKinds?: string[]; skipKeys?: Set<string>; codes?: boolean; companyWords?: Set<string>; /** Code prefixes used by trial names and never by drug codes ("PIVOT", "CORE", "KOMET"). */ trialPrefixes?: Set<string> } = {}): Finding[] {
  const kinds = opts.productKinds ?? ["drug"];
  const agg = new Map<string, { subject: string; pages: Set<string>; where: string; page: string; code: boolean; strong: boolean }>();
  for (const s of sources) {
    const phrases = (opts.codes ? [] : extractProductPhrases(s.text, opts.companyWords)).map((p) => ({ p, code: false }));
    if (opts.codes) for (const c of extractCodes(s.text)) phrases.push({ p: c, code: true });
    for (const { p, code } of phrases) {
      const k = code ? compact(p) : norm(p);
      if (opts.skipKeys?.has(k)) continue;
      // "Burning Rock Dx" is the company; a phrase that ends in a company's whole name is the maker, not a product.
      if (!code && endsWithOrgName(p, idx)) continue;
      if (code ? idx.code(p, [...kinds, "trial"]).length || idx.exact(p).length || covered(p, idx, kinds) || opts.trialPrefixes?.has(p.split("-")[0]) || namedBeside(s.text, p, idx, kinds) : covered(p, idx, kinds)) continue;
      const cur = agg.get(k) ?? { subject: p, pages: new Set<string>(), where: s.where, page: s.page, code, strong: false };
      cur.pages.add(s.page);
      if (!s.weak && !cur.strong) { cur.strong = true; cur.where = s.where; cur.page = s.page; }
      agg.set(k, cur);
    }
  }
  return [...agg.values()].map((a) => ({
    cls: "prose" as const, rule: a.code ? "code-without-record" : "product-without-record", page: a.page, pages: [...a.pages], where: a.where, subject: a.subject,
    confidence: (!a.strong ? "low" : a.code ? "medium" : a.pages.size > 1 || /(CDx|Dx)$/.test(a.subject) ? "high" : "medium") as Confidence,
    detail: `${a.code ? "Drug code" : "Product name"} "${a.subject}" appears in the text of ${a.pages.size} page${a.pages.size === 1 ? "" : "s"} and matches no ${kinds.join("/")} record by name, aka, brand or code.`,
  }));
}

/**
 * "ABT-263 (navitoclax)" or "navitoclax (ABT-263)": the code sits next to the name of a product the corpus holds,
 * so the gap is a missing alias on that record, not a missing record.
 */
export function namedBeside(text: string, code: string, idx: NameIndex, kinds: string[]): boolean {
  for (const m of text.matchAll(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))) {
    const before = text.slice(Math.max(0, m.index! - 40), m.index!).match(/([A-Za-z][A-Za-z-]{4,})\s*\(?\s*$/);
    const after = text.slice(m.index! + code.length, m.index! + code.length + 40).match(/^\s*[,(]\s*([A-Za-z][A-Za-z-]{4,})/);
    for (const w of [before?.[1], after?.[1]]) if (w && idx.exact(w, kinds).length) return true;
  }
  return false;
}

export function endsWithOrgName(phrase: string, idx: NameIndex): boolean {
  const toks = norm(phrase).split(" ");
  for (let i = 0; i < toks.length; i++) {
    const tail = toks.slice(i).join(" ");
    if ((toks.length - i >= 2 || i === 0) && idx.exact(tail, ["company", "institution"]).length) return true;
  }
  return false;
}

/** Is a product phrase already a record? Exact, whole-word containment, or the record's name containing the phrase. */
export function covered(phrase: string, idx: NameIndex, kinds: string[]): boolean {
  if (idx.exact(phrase, kinds).length) return true;
  const w = idx.within(phrase, kinds).filter((h) => h.key.split(" ").length > 1 || !GENERIC_WORDS.has(h.key));
  if (w.length) return true;
  if (idx.holding(phrase, kinds).length) return true;
  // The phrase is the stem of a record name ("Guardant360" for "Guardant360 CDx"): treat as covered, not a gap.
  const p = norm(phrase);
  if (p.length >= 4) for (const e of idx.entries) if (kinds.includes(e.kind)) for (const k of keysOf(e.names)) if (` ${k} `.includes(` ${p} `)) return true;
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 3, 4 and 6 on biomarker pages
// ---------------------------------------------------------------------------------------------------------------------
export type TestRowLite = { id: string; name: string; drugId?: string; companyId: string; scope: string; technologies: string[]; where: string };
export type AssayLite = { id: string; name: string; vendor: string; drugId?: string; where: string };
export type BiomarkerLite = { id: string; name: string; target?: string; measurement: string; drugs: string[]; tests: string[]; assays: string[]; thresholdDrugs: string[]; where: string };
export type ProductLite = { id: string; name: string; isTest: boolean; technologies: string[]; targets: string[]; drugs: string[]; companies: string[]; where: string; /** Name, modality and mechanism, to tell an IHC kit from a sequencing panel. */ method?: string };

/** What a test reads: protein by immunohistochemistry, DNA in situ, sequence (NGS or PCR) or a PET tracer. */
export function testPlatforms(method: string): Set<string> {
  const out = new Set<string>();
  if (/immunohisto|\bIHC\b|pharmDx|antibod/i.test(method)) out.add("ihc");
  if (/\bI?SH\b|\bFISH\b|in situ/i.test(method)) out.add("ish");
  if (/\bNGS\b|sequenc|\bPCR\b|genomic profil|cfDNA|ctDNA|ctDx|liquid biopsy|exome|genome|methylation|mutation test/i.test(method)) out.add("seq");
  if (/\bPET\b|tracer|imaging agent/i.test(method)) out.add("pet");
  return out;
}
/** Platforms that can produce a readout of each measurement. */
export const MEASUREMENT_PLATFORMS: Record<string, string[]> = {
  "ihc-score": ["ihc"], "combined-positive-score": ["ihc"], "tumour-proportion-score": ["ihc"], "immune-cell-score": ["ihc"], "tumour-cell-score": ["ihc"],
  "fish-ratio": ["ish"], "sequencing-variant": ["seq"], "msi-status": ["seq", "ihc"], "tmb-threshold": ["seq"], methylation: ["seq"], "pet-tracer-expression": ["pet"],
  "copy-number": ["seq", "ish"], "hla-typing": ["seq"], "ctdna-detection": ["seq"], "genomic-instability-score": ["seq"],
};
/** A germline test cannot measure a somatic readout, and the other way round. */
export function originClash(bmName: string, method: string): boolean {
  const g = /germline/i.test(method), bmG = /germline/i.test(bmName), bmS = /somatic|tumou?r/i.test(bmName) && !bmG;
  return (g && bmS) || (bmG && !g);
}

/**
 * Biomarker "Tests that measure it". The box is fed by `assays` and `tests` (TUMOUR_TESTS rows) only, so:
 *  - a test record in the biomarker's `drugs` with no row in either table is invisible in the box (hub);
 *  - a TUMOUR_TESTS row whose record is in `drugs` but which is not in `tests` is missing from the box (hub);
 *  - a test record sharing the readout's signature technology (carried by every member, e.g. mrd-testing) or a
 *    companion diagnostic for a drug the readout's thresholds name, on the same target, is not listed at all (hub);
 *  - a row in `tests` whose record is not in `drugs` leaves that test's own page without the readout (one-way);
 *  - an assay row and a test row naming the same product show it twice (duplicate).
 */
export function detectBiomarkerGaps(bms: BiomarkerLite[], rows: TestRowLite[], assays: AssayLite[], products: ProductLite[], idx: NameIndex, route: { biomarker: (id: string) => string; product: (id: string) => string }): Finding[] {
  const out: Finding[] = [];
  const rowById = new Map(rows.map((r) => [r.id, r]));
  const rowsByDrug = new Map<string, TestRowLite[]>();
  for (const r of rows) if (r.drugId) push(rowsByDrug, r.drugId, r);
  const prod = new Map(products.map((p) => [p.id, p]));
  // The record an assay row stands for, matched the way class 1 matches rows ("therascreen KRAS RGQ PCR Kit" is part of the therascreen family record).
  const assayRecord = (a: AssayLite): string | undefined => a.drugId ?? matchRow({ name: a.name, want: ["drug"], owners: [a.vendor] }, idx).hits[0]?.id;
  const techTestCount = new Map<string, number>();
  for (const p of products) if (p.isTest) for (const t of p.technologies) techTestCount.set(t, (techTestCount.get(t) ?? 0) + 1);
  const GENERIC_TECH = new Set(["liquid-biopsy", "companion-diagnostic", "cgp", "rna-seq", "histopathology-ihc", "mced"]);

  for (const bm of bms) {
    const page = route.biomarker(bm.id);
    const boxRows = bm.tests.map((id) => rowById.get(id)).filter((r): r is TestRowLite => !!r);
    const boxAssays = assays.filter((a) => bm.assays.includes(a.id));
    const inBox = new Set<string>();
    for (const r of boxRows) if (r.drugId) inBox.add(r.drugId);
    for (const a of boxAssays) { const id = assayRecord(a); if (id) inBox.add(id); }

    // Test records linked from the readout but missing from its Tests box.
    for (const d of bm.drugs) {
      const p = prod.get(d);
      if (!p?.isTest || inBox.has(d)) continue;
      const row = (rowsByDrug.get(d) ?? [])[0];
      out.push({ cls: "hub", rule: row ? "test-row-not-in-tests" : "test-record-not-in-tests-box", page: `${page}#tests`, pages: [page], where: row ? bm.where : p.where, subject: p.name, suggestedId: row ? row.id : d, confidence: "high",
        detail: row
          ? `${bm.id}: "${d}" is in drugs and has TUMOUR_TESTS row "${row.id}", but the row is not in tests, so "Tests that measure it" leaves it out.`
          : `${bm.id}: test record "${d}" is in drugs, so it shows only under Connected; the "Tests that measure it" box reads TUMOUR_TESTS and assays, where it has no row.` });
    }

    // Members: test records in the box or in drugs. Signature technologies are carried by every member.
    const members = [...new Set([...inBox, ...bm.drugs.filter((d) => prod.get(d)?.isTest)])].map((id) => prod.get(id)).filter((p): p is ProductLite => !!p);
    if (members.length >= 2) {
      const sig = members[0].technologies.filter((t) => !GENERIC_TECH.has(t) && members.every((m) => m.technologies.includes(t)) && (techTestCount.get(t) ?? 0) <= 15);
      for (const t of sig) for (const p of products) {
        if (!p.isTest || members.some((m) => m.id === p.id) || !p.technologies.includes(t)) continue;
        out.push({ cls: "hub", rule: "signature-technology-member-missing", page: `${page}#tests`, pages: [page, route.product(p.id)], where: bm.where, subject: p.name, suggestedId: p.id, confidence: "medium",
          detail: `${bm.id}: every test it lists carries technology "${t}", and so does "${p.id}", which the readout does not list.` });
      }
    }
    // Companion diagnostics for a threshold drug on the readout's own target.
    if (bm.target) for (const p of products) {
      if (!p.isTest || members.some((m) => m.id === p.id) || !p.targets.includes(bm.target) || !p.drugs.some((d) => bm.thresholdDrugs.includes(d))) continue;
      // An IHC kit does not read a mutation, a sequencing panel does not give an IHC score, a germline test does not read the tumour.
      const plat = testPlatforms(p.method ?? p.name);
      // A genomic instability score needs a test that reports one, not any sequencing test.
      if (bm.measurement === "genomic-instability-score" && !/instability|\bHRD\b|homologous recombination deficiency|loss of heterozygosity|\bLOH\b|genomic scar/i.test(p.method ?? "")) continue;
      if (!(MEASUREMENT_PLATFORMS[bm.measurement] ?? []).some((x) => plat.has(x)) || originClash(`${bm.id} ${bm.name}`, p.method ?? p.name)) continue;
      out.push({ cls: "hub", rule: "cdx-for-threshold-drug-missing", page: `${page}#tests`, pages: [page, route.product(p.id)], where: bm.where, subject: p.name, suggestedId: p.id, confidence: "high",
        detail: `${bm.id}: "${p.id}" is a test on target "${bm.target}" for ${p.drugs.filter((d) => bm.thresholdDrugs.includes(d)).join(", ")}, a drug this readout's thresholds name, but the readout does not list it.` });
    }

    // One-way: a row in tests whose record is not in drugs.
    for (const r of boxRows) if (r.drugId && !bm.drugs.includes(r.drugId)) {
      out.push({ cls: "one-way", rule: "tests-row-record-not-in-drugs", page: route.product(r.drugId), pages: [route.product(r.drugId)], where: bm.where, subject: `${r.name} -> ${bm.name}`, suggestedId: r.drugId, confidence: "high",
        detail: `${bm.id} lists TUMOUR_TESTS row "${r.id}" in tests, but its record "${r.drugId}" is not in drugs, so the test's own page has no "Biomarker readouts" link back (readoutsForDrug reads drugs, thresholds and companion diagnostics only).` });
    }

    // Duplicates in the Tests box: two pills for one product.
    const pills = [...boxAssays.map((a) => ({ label: a.name, key: assayRecord(a) ?? `assay:${norm(bare(a.name))}`, names: [norm(bare(a.name))] })),
      ...boxRows.map((r) => ({ label: r.name, key: r.drugId ?? `row:${norm(r.name)}`, names: [norm(r.name)] }))];
    const seen: Array<{ label: string; key: string; names: string[] }> = [];
    for (const p of pills) {
      // Two pills that resolve to one record but name different products (FoundationOne CDx and FoundationOne Liquid
      // CDx both point at foundationone-cdx) are a link question, not a duplicate: only the reader's view counts here.
      const dup = seen.find((s) => sameProduct(p.label, s.label));
      if (dup) {
        out.push({ cls: "duplicate", rule: "tests-box-duplicate", page: `${page}#tests`, pages: [page], where: bm.where, subject: `${dup.label} / ${p.label}`, confidence: "high",
          detail: `${bm.id}: "Tests that measure it" shows "${dup.label}" and "${p.label}", one product, from the assays and tests lists.` });
      } else seen.push(p);
    }
  }
  return out;
}

/** One one-way finding per test page, naming every readout it fails to show. */
/** One duplicate finding per pair of labels, with every readout page that shows both. */
export function groupDuplicatePills(fs: Finding[]): Finding[] {
  const keep = fs.filter((f) => f.rule !== "tests-box-duplicate");
  const by = new Map<string, Finding[]>();
  for (const f of fs) if (f.rule === "tests-box-duplicate") push(by, norm(f.subject), f);
  for (const list of by.values()) {
    const pages = list.map((f) => f.pages[0]);
    keep.push({ ...list[0], page: list[0].page, pages, where: list.length > 1 ? `${list[0].where} (+${list.length - 1} more)` : list[0].where,
      detail: `"Tests that measure it" shows "${list[0].subject.split(" / ")[0]}" (an assays row) and "${list[0].subject.split(" / ")[1]}" (a TUMOUR_TESTS row), one product, on ${list.length} readout page${list.length === 1 ? "" : "s"}: ${list.map((f) => f.page.replace(/^\/biomarkers\/|\/#tests$/g, "")).join(", ")}.` });
  }
  return keep;
}

export function groupOneWay(fs: Finding[]): Finding[] {
  const keep = fs.filter((f) => f.rule !== "tests-row-record-not-in-drugs");
  const by = new Map<string, Finding[]>();
  for (const f of fs) if (f.rule === "tests-row-record-not-in-drugs") push(by, f.page, f);
  for (const [page, list] of by) {
    const names = list.map((f) => f.subject.split(" -> ")[1]);
    keep.push({ ...list[0], subject: `${list[0].subject.split(" -> ")[0]}: ${list.length} readout${list.length === 1 ? "" : "s"} not shown`, pages: [page],
      where: list.length > 1 ? `${list[0].where} (+${list.length - 1} more)` : list[0].where,
      detail: `${list.length} readout${list.length === 1 ? "" : "s"} list this test's TUMOUR_TESTS row in tests but not its record "${list[0].suggestedId}" in drugs, so ${page} shows none of them under "Biomarker readouts" (readoutsForDrug reads drugs, thresholds and companion diagnostics only): ${names.join("; ")}.` });
  }
  return keep;
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 3 and 4 for side-table rows against record fields
// ---------------------------------------------------------------------------------------------------------------------
/** A TUMOUR_TESTS row that names a record which lacks the row's company or technologies: those pages omit the test. */
export function detectRowRecordMismatch(rows: TestRowLite[], products: Map<string, ProductLite>, route: { product: (id: string) => string; company: (id: string) => string; technology: (id: string) => string }, has: (id: string) => boolean): Finding[] {
  const out: Finding[] = [];
  for (const r of rows) {
    if (!r.drugId) continue;
    const p = products.get(r.drugId);
    if (!p) continue;
    if (has(r.companyId) && !p.companies.includes(r.companyId)) out.push({ cls: "one-way", rule: "row-company-not-on-record", page: route.company(r.companyId), pages: [route.company(r.companyId)], where: p.where, subject: `${p.name} -> ${r.companyId}`, suggestedId: r.companyId, confidence: "high",
      detail: `TUMOUR_TESTS row "${r.id}" says ${r.companyId} makes "${p.id}", but the record's companies do not include it, so the company's Products tab omits the test.` });
    for (const t of r.technologies) if (has(t) && !p.technologies.includes(t)) out.push({ cls: "hub", rule: "row-technology-not-on-record", page: route.technology(t), pages: [route.technology(t)], where: p.where, subject: p.name, suggestedId: p.id, confidence: "medium",
      detail: `TUMOUR_TESTS row "${r.id}" files "${p.id}" under technology "${t}", but the record does not list it, so the technology page's Products tab omits the test.` });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 5: companies whose page shows no products
// ---------------------------------------------------------------------------------------------------------------------
export type CompanyLite = { id: string; name: string; companyType: string; text: string; productCount: number; where: string; acquiredBy?: string; /** Product ids the Products tab shows. */ productIds?: string[] };

/**
 * A company's own text names a product the corpus holds by its code ("XL092") or a product-shaped name, but the
 * product does not name the company and the company does not list it, so the Products tab leaves it out.
 * Codes and suffixed names only: a company's text often mentions a partner's medicine by its generic name.
 */
export function detectCompanyUnlinkedProducts(cos: CompanyLite[], idx: NameIndex, productCompanies: Map<string, string[]>, route: { company: (id: string) => string; product: (id: string) => string }, companyWords: Set<string> = new Set()): Finding[] {
  const out: Finding[] = [];
  for (const c of cos) {
    // Trial groups, contract research organisations, investors and charities name products they run or fund, not make.
    if (["cooperative-group", "cro-services", "investor", "nonprofit"].includes(c.companyType)) continue;
    const shown = new Set(c.productIds ?? []);
    const found = new Map<string, string>();
    for (const code of extractCodes(c.text)) for (const h of idx.code(code, ["drug"])) found.set(h.id, code);
    for (const p of extractProductPhrases(c.text, companyWords)) for (const h of idx.exact(p, ["drug"])) found.set(h.id, p);
    for (const [id, named] of found) {
      if (shown.has(id)) continue;
      const makers = productCompanies.get(id) ?? [];
      out.push({ cls: "one-way", rule: "company-text-names-unlinked-product", page: route.company(c.id), pages: [route.company(c.id), route.product(id)], where: c.where, subject: `${c.name} -> ${named}`, suggestedId: id,
        confidence: makers.length ? "medium" : "high",
        detail: `${c.id}'s own text names "${named}", which is record "${id}", but the record's companies (${makers.join(", ") || "none"}) do not include ${c.id} and the company does not list it, so neither page links to the other.${makers.length ? " The record names another company: it may be a partner's product; check before linking." : ""}` });
    }
  }
  return out;
}
export function detectCompaniesWithoutProducts(cos: CompanyLite[], namedInTables: Map<string, string[]>, idx: NameIndex, route: (id: string) => string, companyWords: Set<string> = new Set(), kinds = ["diagnostics", "biotech", "devices", "radiopharma", "cell-therapy", "ai-software", "imaging"]): Finding[] {
  const out: Finding[] = [];
  for (const c of cos) {
    if (!kinds.includes(c.companyType) || c.productCount > 0) continue;
    const prose = extractProductPhrases(c.text, companyWords).filter((p) => !covered(p, idx, ["drug"]) && norm(p) !== norm(c.name));
    const codes = extractCodes(c.text).filter((x) => !idx.code(x, ["drug", "trial"]).length);
    const tables = namedInTables.get(c.id) ?? [];
    const named = [...new Set([...tables, ...prose, ...codes])];
    if (!named.length) continue;
    out.push({ cls: "company-no-products", rule: tables.length ? "side-table-products-no-record" : "named-products-no-record", page: route(c.id), pages: [route(c.id)], where: c.where, subject: c.name,
      confidence: tables.length || prose.length ? "high" : "medium",
      detail: `${c.companyType} company with no product records; ${tables.length ? `side tables name ${tables.join(", ")}` : ""}${tables.length && (prose.length || codes.length) ? "; " : ""}${prose.length || codes.length ? `its own text names ${[...prose, ...codes].join(", ")}` : ""}.` });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Class 6: two records for one product in the same list
// ---------------------------------------------------------------------------------------------------------------------
export type ListSection = { page: string; section: string; items: Array<{ id: string; name: string; brand?: string }> };
/** Distinct records whose names (without parentheticals) or brands are the same, shown together in one list. */
export function detectDuplicateItems(sections: ListSection[]): Array<Finding & { pair: [string, string] }> {
  const out: Array<Finding & { pair: [string, string] }> = [];
  for (const s of sections) {
    // Full names and brands collide with each other; a name without its parenthetical collides only with another
    // record's full name ("Bevacizumab (glioblastoma use)" meets "Bevacizumab"), so "VENTANA PD-L1 (SP142) Assay" and
    // "VENTANA PD-L1 (SP263) Assay" stay apart.
    const byKey = new Map<string, Array<{ id: string; name: string }>>();
    for (const it of s.items) for (const k of new Set([norm(it.name), it.brand ? norm(it.brand) : ""].filter((k) => k.length >= 4))) push(byKey, k, { id: it.id, name: it.name });
    for (const it of s.items) {
      const b = norm(bare(it.name));
      if (b !== norm(it.name) && byKey.has(b) && !byKey.get(b)!.some((x) => x.id === it.id)) push(byKey, b, { id: it.id, name: it.name });
    }
    const done = new Set<string>();
    for (const [k, list] of byKey) {
      const ids = [...new Set(list.map((x) => x.id))];
      if (ids.length < 2) continue;
      const pair = [ids[0], ids[1]].sort() as [string, string];
      const pk = pair.join("|");
      if (done.has(pk)) continue;
      done.add(pk);
      out.push({ cls: "duplicate", rule: "two-records-one-name", page: s.page, pages: [s.page], where: "", subject: `${list[0].name} / ${list.find((x) => x.id !== list[0].id)!.name}`, confidence: "medium", pair,
        detail: `${s.section}: records ${pair.join(" and ")} share the name "${k}" and both render in this list.` });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Ranking and report
// ---------------------------------------------------------------------------------------------------------------------
const CONF_ORDER: Record<Confidence, number> = { high: 0, medium: 1, low: 2 };
export function rank(findings: Finding[]): Finding[] {
  for (const f of findings) f.pages = [...new Set(f.pages.filter(Boolean))];
  return [...findings].sort((a, b) => b.pages.length - a.pages.length || CONF_ORDER[a.confidence] - CONF_ORDER[b.confidence] || a.cls.localeCompare(b.cls) || a.subject.localeCompare(b.subject));
}

const SITE = "https://onco.cc";
export function renderMarkdown(findings: Finding[], meta: { generated: string; precision: Partial<Record<GapClass, string>>; sampleNote: string }): string {
  const byClass = new Map<GapClass, Finding[]>();
  for (const f of findings) push(byClass, f.cls, f);
  const pageCount = new Map<string, number>();
  for (const f of findings) for (const p of new Set(f.pages.map((x) => x.replace(/#.*$/, "")))) pageCount.set(p, (pageCount.get(p) ?? 0) + 1);
  const worst = [...pageCount].sort((a, b) => b[1] - a[1]).slice(0, 25);
  const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
  const row = (f: Finding, i: number) => `| ${i + 1} | ${CLASS_LABEL[f.cls].split(".")[0]} | ${f.confidence} | ${f.pages.length} | [${esc(f.page)}](${SITE}${f.page}) | ${esc(f.subject)} | ${f.suggestedId ? `\`${f.suggestedId}\`` : ""} | \`${f.where}\` | ${esc(f.detail)} |`;
  const head = "| # | Class | Confidence | Pages | Page | Missing or mislinked | Suggested id | Where | Detail |\n|---|---|---|---|---|---|---|---|---|";
  const lines: string[] = [];
  lines.push(`# Gap audit ${meta.generated}`, "");
  lines.push("Generated by `npx tsx scripts/gap-audit.ts`. Read-only: nothing here has been applied. Each row is a place where a reader's page leaves out something the corpus or its side tables already know about, ranked by how many pages the gap touches and then by confidence. The method and the six classes are described at the top of `scripts/gap-audit.ts`.", "");
  lines.push("## Counts", "", "| Class | Findings | High | Medium | Low | Measured precision |", "|---|---|---|---|---|---|");
  for (const c of Object.keys(CLASS_LABEL) as GapClass[]) {
    const l = byClass.get(c) ?? [];
    lines.push(`| ${CLASS_LABEL[c]} | ${l.length} | ${l.filter((f) => f.confidence === "high").length} | ${l.filter((f) => f.confidence === "medium").length} | ${l.filter((f) => f.confidence === "low").length} | ${meta.precision[c] ?? "not sampled"} |`);
  }
  lines.push("", meta.sampleNote, "");
  lines.push("## Pages with the most gaps", "", "| Page | Findings |", "|---|---|");
  for (const [p, n] of worst) lines.push(`| [${p}](${SITE}${p}) | ${n} |`);
  lines.push("", "## Top 40", "", head);
  findings.slice(0, 40).forEach((f, i) => lines.push(row(f, i)));
  for (const c of Object.keys(CLASS_LABEL) as GapClass[]) {
    const l = byClass.get(c) ?? [];
    lines.push("", `## ${CLASS_LABEL[c]} (${l.length})`, "", head);
    l.forEach((f, i) => lines.push(row(f, i)));
  }
  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------------------------------------------------
// Corpus wiring
// ---------------------------------------------------------------------------------------------------------------------
const ROOT = join(__dirname, "..");
const fileCache = new Map<string, string[]>();
/** file:line of the first line containing `needle` (after `after`, when given), or file:1. */
export function lineOf(file: string, needle: string, after?: string): string {
  let lines = fileCache.get(file);
  if (!lines) { lines = readFileSync(join(ROOT, file), "utf8").split("\n"); fileCache.set(file, lines); }
  let start = 0;
  if (after) { const a = lines.findIndex((l) => l.includes(after)); if (a >= 0) start = a; }
  for (let i = start; i < lines.length; i++) if (lines[i].includes(needle)) return `${file}:${i + 1}`;
  return `${file}:1`;
}

export async function collect(): Promise<Finding[]> {
  const { graph } = await import("../src/lib/graph");
  const { routeFor } = await import("../src/lib/kinds");
  const { productClass } = await import("../src/lib/product-class");
  const { sourceLocation } = await import("../src/lib/source-location");
  const { TUMOUR_TESTS } = await import("../src/data/tumour-tests");
  const { assays } = await import("../src/data/assays");
  const { deals } = await import("../src/data/deals");
  const { regimens } = await import("../src/data/regimens");
  const { manufacturingSites } = await import("../src/data/manufacturing");
  const { isotopes } = await import("../src/data/isotopes");
  const { companyFinancials } = await import("../src/data/company-financials");
  const { softwareProducts } = await import("../src/data/software");
  const { openSourceProjects } = await import("../src/data/open-source");
  const { SPONSOR_PATTERNS } = await import("../src/data/sponsor-aliases");
  const { catalysts } = await import("../src/data/catalysts");
  const { regionalApprovals } = await import("../src/data/regional-approvals");
  const g = graph();
  const has = (id: string) => !!g.get(id);
  const r = (id: string) => { const e = g.get(id); return e ? routeFor(e) : ""; };
  const loc = (id: string) => { const e = g.get(id); if (!e) return "?"; const l = sourceLocation(id, e.kind); return `${l.file}:${l.line}`; };

  const entries: IndexEntry[] = g.entities.filter((e) => ["drug", "company", "institution", "person", "trial", "technology", "collection"].includes(e.kind)).map((e) => {
    const names = [e.name, ...e.aka];
    // "Roche / Genentech" is reachable as Roche and as Genentech; "Agilent Technologies (Dako)" also as Dako.
    if (e.kind === "company" || e.kind === "institution") { if (e.name.includes(" / ")) names.push(...e.name.split(" / ")); for (const m of e.name.matchAll(/\(([^)]+)\)/g)) if (!/[,;]/.test(m[1])) names.push(m[1]); }
    if (e.kind === "drug") { if (e.brand) names.push(...e.brand.split(/\s*[/;]\s*/)); if (e.code) names.push(...e.code.split(/\s*[,/;]\s*/)); }
    // A product called "Natera Signatera" is also reachable as "Signatera".
    if (e.kind === "drug") for (const cid of e.companies) { const c = g.get(cid); if (c) { const s = stripOwner(e.name, [c.name, ...c.aka]); if (s !== e.name) names.push(s); } }
    return { id: e.id, kind: e.kind, names };
  });
  const idx = new NameIndex(entries);
  const companyNames = (id?: string) => { const c = id ? g.get(id) : undefined; return c ? [c.name, ...c.aka] : []; };

  const rows: SideRow[] = [];
  const T = "src/data/tumour-tests.ts";
  const readoutsWithRow = (rowId: string) => g.kind("biomarker").filter((b) => b.tests.includes(rowId)).map((b) => routeFor(b));
  for (const t of TUMOUR_TESTS) {
    const w = lineOf(T, `id: "${t.id}"`);
    rows.push({ table: "TUMOUR_TESTS", where: w, name: t.name, want: ["drug"], idField: "drugId", id: t.drugId, owners: companyNames(t.companyId), pages: ["/tumour-testing/", ...readoutsWithRow(t.id)],
      wouldAdd: [r(t.companyId), ...t.technologies.map(r)], named: true, checkAgreement: true });
    rows.push({ table: "TUMOUR_TESTS", where: w, name: companyNames(t.companyId)[0] ?? t.companyId, want: ["company"], idField: "companyId", id: t.companyId, pages: ["/tumour-testing/"], named: true });
  }
  const A = "src/data/assays.ts";
  const readoutsWithAssay = (id: string) => g.kind("biomarker").filter((b) => b.assays.includes(id)).map((b) => routeFor(b));
  for (const a of assays) {
    const w = lineOf(A, `id: "${a.id}"`);
    // Class names ("MSI by PCR ... and equivalents", "Ki-67 IHC") are methods, not products.
    const isClass = /\band equivalents\b|\bothers\b|^Multiple\b|^Tumour mutational burden|^MSI by|^Ki-67|^PSMA PET|^HER2 IQFISH/i.test(`${a.name} ${a.vendor}`);
    // `drugId` (the test record) and `vendorIds` (company ids, in the order `vendor` names them) were added on 3 Nov 2026.
    if (!isClass) rows.push({ table: "assays", where: w, name: a.name, want: ["drug"], idField: "drugId", id: a.drugId, owners: a.vendor.split(/[;,]\s*|\s+\(/).map((s) => s.replace(/\)$/, "")), pages: ["/assays/", ...readoutsWithAssay(a.id)], named: true });
    if (!isClass) for (const [i, v] of a.vendor.split(/;\s*|,\s*| and /).map((s) => s.trim()).map((s) => (s.includes("(") ? s : s.replace(/\)$/, ""))).filter((s) => s && !/^(others|Multiple)/i.test(s)).entries()) {
      const vendor = bare(v);
      rows.push({ table: "assays.vendor", where: w, name: vendor, want: ["company"], idField: "vendorIds", id: a.vendorIds?.[i], pages: ["/assays/"], named: true });
    }
  }
  for (const b of g.kind("biomarker")) {
    const bl = loc(b.id);
    for (const c of b.companionDiagnostics) {
      rows.push({ table: `${b.id}.companionDiagnostics.device`, family: "biomarker companionDiagnostics.device", where: bl, name: c.device, want: ["drug"], idField: "deviceId", id: c.deviceId, owners: [c.maker], pages: [routeFor(b)], named: true });
      rows.push({ table: `${b.id}.companionDiagnostics.maker`, family: "biomarker companionDiagnostics.maker", where: bl, name: c.maker, want: ["company"], idField: "companyId", id: c.companyId, pages: [routeFor(b)], named: true });
    }
  }
  const D = "src/data/deals.ts";
  for (const d of deals) {
    const w = lineOf(D, `id: "${d.id}"`);
    for (const party of [d.from, d.to]) {
      // The company bought in an acquisition is often folded into the buyer's record as an alias (Celgene in bms,
      // Seagen in pfizer). Linking the seller to that record would turn the deal into the buyer buying itself, so the
      // seller keeps its own name unlinked and is not a gap. Only skipped when the alias belongs to the buyer named on
      // this deal; an alias on any other record is still reported.
      const foldedIntoBuyer = d.type === "acquisition" && party === d.from && !party.id && !!d.to.id
        && companyNames(d.to.id).some((n) => norm(bare(n)) === norm(bare(party.name)));
      if (foldedIntoBuyer) continue;
      rows.push({ table: "deals.party", where: w, name: party.name, want: ["company", "institution"], idField: "id", id: party.id, pages: ["/deals/", ...d.assets.map(r)], named: true });
    }
    if (!d.assets.length) {
      // Read the asset names out of the description (codes and international non-proprietary names), not the whole sentence.
      const cands = assetNames(d.assetText);
      const pages = ["/deals/", ...(d.from.id ? [r(d.from.id)] : []), ...(d.to.id ? [r(d.to.id)] : [])];
      const resolved = cands.filter((c) => idx.code(c, ["drug"]).length || idx.exact(c, ["drug"]).length);
      if (resolved.length) for (const c of resolved) rows.push({ table: "deals.assets", where: w, name: c, want: ["drug"], idField: "assets", pages, named: true });
      else rows.push({ table: "deals.assets", where: w, name: cands.length ? cands.join(", ") : d.assetText, want: ["drug"], idField: "assets", pages, named: cands.length > 0, noMatch: true });
    }
  }
  const R = "src/data/regimens.ts";
  for (const reg of regimens) for (const c of reg.components) {
    if (c.route === "RT") continue; // radiotherapy is a technology, not a product
    rows.push({ table: "regimens.components", where: lineOf(R, `id: "${reg.id}"`), name: c.name, want: ["drug"], idField: "drugId", id: c.drugId, pages: [`/regimens/${reg.id}/`], named: true });
  }
  const M = "src/data/manufacturing.ts";
  for (const s of manufacturingSites) {
    rows.push({ table: "manufacturingSites.operator", where: lineOf(M, `id: "${s.id}"`), name: s.operator, want: ["company", "institution"], idField: "operatorId", id: s.operatorId, pages: ["/manufacturing/"], named: true });
    for (const c of s.customers) if (!has(c)) rows.push({ table: "manufacturingSites.customers", where: lineOf(M, `id: "${s.id}"`), name: c, want: ["company"], idField: "customers", id: c, pages: ["/manufacturing/"], named: true });
  }
  const I = "src/data/isotopes.ts";
  for (const iso of isotopes) {
    const linked = new Set(iso.supplierIds);
    for (const part of iso.supplierText.split(/[;,]\s*|\s+and\s+|\s*\/\s*/)) {
      const name = bare(part).replace(/^(and|via|plus)\s+/i, "").trim();
      if (name.length < 3 || /\d/.test(name) && !/[A-Z]{2}/.test(name)) continue;
      const hit = idx.find(name, ["company", "institution"]);
      if (hit.length && !linked.has(hit[0].id)) rows.push({ table: "isotopes.supplierText", where: lineOf(I, `id: "${iso.id}"`), name, want: ["company", "institution"], idField: "supplierIds", pages: ["/isotopes/"], named: true });
    }
  }
  const F = "src/data/company-financials.ts";
  for (const cf of companyFinancials) for (const p of cf.topProducts) rows.push({ table: "companyFinancials.topProducts", where: lineOf(F, `"${p.name}"`, `companyId: "${cf.companyId}"`), name: p.name, want: ["drug"], idField: "drugId", id: p.drugId, pages: [r(cf.companyId), "/market/"], named: true });
  const S = "src/data/software.ts";
  for (const sp of softwareProducts) rows.push({ table: "softwareProducts.vendor", where: lineOf(S, `"id": "${sp.id}"`), name: bare(sp.vendor), want: ["company", "institution"], idField: "vendorId", id: sp.vendorId, pages: ["/software/"], named: true });
  const O = "src/data/open-source.ts";
  for (const op of openSourceProjects) if (op.maintainer) rows.push({ table: "openSourceProjects.maintainer", where: lineOf(O, `"id": "${op.id}"`), name: bare(op.maintainer), want: ["company", "institution", "collection"], idField: "maintainerId", id: op.maintainerId, pages: ["/open-source/"], named: false });
  const SA = "src/data/sponsor-aliases.ts";
  for (const [, tgt] of SPONSOR_PATTERNS) if (tgt.kind === "company" || tgt.kind === "institution" || tgt.kind === "cooperative-group") rows.push({ table: "SPONSOR_PATTERNS", where: lineOf(SA, `label: "${tgt.label}"`), name: tgt.label, want: ["company", "institution"], idField: "id", id: tgt.id, pages: ["/sponsors/"], named: true, owners: [] });
  const RA = "src/data/regional-approvals.ts";
  for (const id of Object.keys(regionalApprovals)) if (!has(id)) rows.push({ table: "regionalApprovals", where: lineOf(RA, `"${id}"`), name: id, want: ["drug"], idField: "key", id, pages: ["/regulatory/"], named: true });

  // Side-table rows whose id is set are checked only for dangling ids (and, on product tables, for agreement).
  let findings = detectSideTableGaps(rows, idx, has);
  // Open-source maintainers and software vendors are often people, labs or consortia: keep only record-exists hits there.
  findings = findings.filter((f) => !(f.rule === "no-record" && /^(openSourceProjects|softwareProducts|SPONSOR_PATTERNS)/.test(f.detail)));

  // Class 2: prose.
  const prodSources: ProseSource[] = [];
  for (const e of g.entities) {
    if (e.kind === "year") continue;
    // Trial and paper titles are in title case, where every capitalised word looks like a brand: read their prose only.
    const titled = e.kind === "trial" || e.kind === "paper";
    prodSources.push({ page: routeFor(e), where: loc(e.id), text: `${titled ? "" : `${e.name}. `}${e.tldr} ${e.summary}`, self: [e.id], weak: e.kind === "trial" });
  }
  for (const d of deals) prodSources.push({ page: "/deals/", where: lineOf(D, `id: "${d.id}"`), text: d.assetText });
  for (const c of catalysts) prodSources.push({ page: "/catalysts/", where: lineOf("src/data/catalysts.ts", `id: "${c.id}"`), text: `${c.title}. ${c.note}` });
  for (const code of ["gb", "us", "de", "il", "in", "jp", "ru"]) {
    const mod = (await import(`../src/data/country-${code}.ts`)) as Record<string, unknown>;
    for (const v of Object.values(mod)) if (Array.isArray(v)) for (const card of v) if (card && typeof card === "object" && "plain" in card && "detail" in card) {
      const cc = card as { id: string; title: string; plain: string; detail: string };
      prodSources.push({ page: `/countries/${code}/`, where: lineOf(`src/data/country-${code}.ts`, `id: "${cc.id}"`), text: `${cc.title}. ${cc.plain} ${cc.detail}` });
    }
  }
  // Side-table names already reported under class 1 are not reported again as prose.
  const sideNames = new Set(findings.filter((f) => f.rule === "no-record").map((f) => norm(f.subject)));
  for (const t of TUMOUR_TESTS) sideNames.add(norm(stripOwner(t.name, companyNames(t.companyId))));
  const companyWords = new Set<string>();
  for (const c of g.kind("company")) { const w = c.name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, ""); if (w.length >= 4 && !GENERIC_WORDS.has(w) && !NOT_BRAND.has(w)) companyWords.add(w); }
  const prose = detectProseGaps(prodSources, idx, { productKinds: ["drug"], skipKeys: sideNames, companyWords });
  // Codes only on company pages, where a code in the text is the company's own pipeline; on product pages most codes are
  // trial names (MM-003, CORE-008) or a component (the adjuvant OBI-821).
  const codeSources = prodSources.filter((s) => /^\/companies\//.test(s.page));
  const prefixesOf = (names: string[]) => new Set(names.flatMap((n) => [...n.matchAll(/(?<![A-Za-z0-9-])([A-Z]{2,8})-?\d{2,6}/g)].map((m) => m[1])));
  const drugPrefixes = prefixesOf(g.kind("drug").flatMap((d) => [d.name, ...d.aka, d.code ?? ""]));
  const trialPrefixes = new Set([...prefixesOf(g.kind("trial").flatMap((t) => [t.name, ...t.aka]))].filter((p) => !drugPrefixes.has(p)));
  const codes = detectProseGaps(codeSources, idx, { productKinds: ["drug"], codes: true, trialPrefixes }).filter((f) => f.rule === "code-without-record");
  findings.push(...prose, ...codes);

  // Classes 3, 4, 6 on biomarker pages.
  const products: ProductLite[] = g.kind("drug").map((d) => ({ id: d.id, name: d.name, isTest: productClass(d) === "test", technologies: d.technologies, targets: d.targets, drugs: d.drugs, companies: d.companies, where: loc(d.id), method: `${d.name} ${d.modality} ${d.mechanism}` }));
  const prodMap = new Map(products.map((p) => [p.id, p]));
  const rowsLite: TestRowLite[] = TUMOUR_TESTS.map((t) => ({ id: t.id, name: t.name, drugId: t.drugId, companyId: t.companyId, scope: t.scope, technologies: t.technologies, where: lineOf(T, `id: "${t.id}"`) }));
  const assaysLite: AssayLite[] = assays.map((a) => ({ id: a.id, name: a.name, vendor: a.vendor, drugId: a.drugId, where: lineOf(A, `id: "${a.id}"`) }));
  // A readout's tests are the products it lists and the test and device records that name it themselves
  // (src/data/readout-test-records.ts): since 3 November 2026 a test names the readout it measures in its own `related`
  // rather than sitting in the readout's `drugs` beside the medicines a result selects, and the readout page reaches it
  // through that link (Connected now, the gathered Tests section in src/lib/members.ts once approved).
  const namingTests = (id: string) => (g.incoming(id).get("drug") ?? []).filter((d) => d.kind === "drug" && productClass(d) !== "medicine").map((d) => d.id);
  const bms: BiomarkerLite[] = g.kind("biomarker").map((b) => ({ id: b.id, name: b.name, target: b.target, measurement: b.measurement, drugs: [...new Set([...b.drugs, ...namingTests(b.id)])], tests: b.tests, assays: b.assays, thresholdDrugs: b.thresholds.filter((t) => t.status === "current").map((t) => t.drugId), where: loc(b.id) }));
  findings.push(...groupDuplicatePills(groupOneWay(detectBiomarkerGaps(bms, rowsLite, assaysLite, products, idx, { biomarker: (id) => `/biomarkers/${id}/`, product: (id) => `/drugs/${id}/` }))));
  findings.push(...detectRowRecordMismatch(rowsLite, prodMap, { product: (id) => `/drugs/${id}/`, company: r, technology: r }, has));

  // Class 5: companies.
  const namedInTables = new Map<string, string[]>();
  for (const t of TUMOUR_TESTS) if (!t.drugId) push(namedInTables, t.companyId, t.name);
  for (const b of g.kind("biomarker")) for (const c of b.companionDiagnostics) if (c.companyId && !c.deviceId && !idx.exact(c.device, ["drug"]).length) push(namedInTables, c.companyId, c.device);
  for (const d of deals) if (!d.assets.length && d.from.id) push(namedInTables, d.from.id, d.assetText);
  const cos: CompanyLite[] = g.kind("company").map((c) => {
    const productCount = new Set([...c.drugs, ...(g.incoming(c.id).get("drug") ?? []).map((d) => d.id)]).size;
    const productIds = [...new Set([...c.drugs, ...(g.incoming(c.id).get("drug") ?? []).map((d) => d.id)])];
    return { id: c.id, name: c.name, companyType: c.companyType, text: `${c.tldr} ${c.summary}`, productCount, where: loc(c.id), acquiredBy: c.acquiredBy, productIds };
  });
  const noProducts = detectCompaniesWithoutProducts(cos, namedInTables, idx, (id) => `/companies/${id}/`, companyWords);
  findings.push(...noProducts);
  const productCompanies = new Map(g.kind("drug").map((d) => [d.id, d.companies]));
  // Acquired companies' text often names the acquirer's products and the reverse; skip pairs where either owns the other.
  const family = (cid: string) => { const c = g.get(cid); return new Set([cid, ...(c && c.kind === "company" && c.acquiredBy ? [c.acquiredBy] : []), ...g.kind("company").filter((x) => x.acquiredBy === cid).map((x) => x.id)]); };
  findings.push(...detectCompanyUnlinkedProducts(cos, idx, productCompanies, { company: r, product: (id) => `/drugs/${id}/` }, companyWords)
    .filter((f) => !(productCompanies.get(f.suggestedId!) ?? []).some((m) => family(f.page.split("/")[2]).has(m))));
  // A product named only on the page of a company with no products is already that company's class 5 finding.
  const c5 = new Set(noProducts.map((f) => f.page));
  findings = findings.filter((f) => !(f.cls === "prose" && f.pages.every((p) => c5.has(p))));

  // Class 6: two records for one product in one list (company Products tab, technology Products tab, biomarker drugs).
  const sections: ListSection[] = [];
  const item = (id: string) => { const d = g.get(id); return d && d.kind === "drug" ? { id: d.id, name: d.name, brand: d.brand } : undefined; };
  for (const c of g.kind("company")) {
    const ids = [...new Set([...c.drugs, ...(g.incoming(c.id).get("drug") ?? []).map((d) => d.id)])];
    sections.push({ page: routeFor(c), section: `${c.id} Products tab`, items: ids.map(item).filter((x): x is NonNullable<typeof x> => !!x) });
  }
  for (const t of g.kind("technology")) sections.push({ page: routeFor(t), section: `${t.id} Products tab`, items: (g.incoming(t.id).get("drug") ?? []).map((d) => item(d.id)!).filter(Boolean) });
  for (const b of g.kind("biomarker")) sections.push({ page: routeFor(b), section: `${b.id} drugs (Connected)`, items: b.drugs.map(item).filter((x): x is NonNullable<typeof x> => !!x) });
  const dups = detectDuplicateItems(sections);
  // One finding per record pair, with every page that shows both.
  const byPair = new Map<string, Finding>();
  for (const d of dups) {
    const k = d.pair.join("|");
    const cur = byPair.get(k);
    if (cur) cur.pages.push(d.page);
    else byPair.set(k, { ...d, where: `${loc(d.pair[0])} and ${loc(d.pair[1])}`, pages: [d.page], pair: undefined } as Finding);
  }
  for (const f of byPair.values()) { delete (f as { pair?: unknown }).pair; f.detail = `${f.detail.replace(/^[^:]+: /, "")} Shown together on ${f.pages.length} page${f.pages.length === 1 ? "" : "s"}.`; findings.push(f); }

  return rank(findings);
}

// ---------------------------------------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------------------------------------
/** Precision measured by hand on a sample of 20 per class (see the report's note); update when the heuristics change. */
export const MEASURED_PRECISION: Partial<Record<GapClass, string>> = {
  "side-table": "39/40 (98%), two samples of 20",
  prose: "39/40 (98%) after tightening, two samples of 20; 14/20 (70%) before",
  hub: "10/10, every finding read",
  "one-way": "17/19 (89%), every finding read",
  "company-no-products": "39/40 (98%), two samples of 20",
  duplicate: "6/6, every finding read",
};
export const SAMPLE_NOTE = [
  "Precision was measured by hand on 3 November 2026 with `--sample 20 --seed N --class C` (seeds 101, 202 and 303), counting a finding as right when the gap it describes is real on the page named. It says nothing about recall.",
  "Misses seen in the samples: a trial name read as a drug code (CORE-008); a deal whose asset is a platform rather than a product (AraLinQ); a partner company's name read as a product (Sirona Dx on Nucleai's page); a company that only manufactures or licenses a product it names (Evergreen and FAP-2286, MDxHealth and Oncotype DX).",
  "Before tightening, product phrases ending in ordinary words (\"positive MRD\", \"Oral Liquid\") and drug codes on product pages (mostly trial names such as MM-003) brought class 2 to 14/20, and the companion-diagnostic rule in class 3 matched IHC kits to mutation readouts; the rules now require a brand-shaped word or a company's name before a weak suffix, read codes on company pages only, and match the test's platform to the readout's measurement.",
].join(" ");

function mulberry(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

async function main() {
  const args = process.argv.slice(2);
  const findings = await collect();
  const sampleAt = args.indexOf("--sample");
  if (sampleAt >= 0) {
    const n = Number(args[sampleAt + 1] ?? 20);
    const seed = Number(args[args.indexOf("--seed") + 1] ?? 1);
    const cls = args.includes("--class") ? args[args.indexOf("--class") + 1] : undefined;
    const pool = findings.filter((f) => !cls || f.cls === cls);
    const rnd = mulberry(seed);
    const picked = [...pool].sort(() => rnd() - 0.5).slice(0, n);
    for (const f of picked) console.log(JSON.stringify(f));
    return;
  }
  const md = renderMarkdown(findings, { generated: new Date().toISOString().slice(0, 10), precision: MEASURED_PRECISION, sampleNote: SAMPLE_NOTE });
  if (args.includes("--stdout")) { process.stdout.write(md); return; }
  const dir = join(ROOT, "docs", "proposals");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "gap-audit.md"), md);
  writeFileSync(join(dir, "gap-audit.json"), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), counts: Object.fromEntries((Object.keys(CLASS_LABEL) as GapClass[]).map((c) => [c, findings.filter((f) => f.cls === c).length])), precision: MEASURED_PRECISION, findings }, null, 1) + "\n");
  const counts = (Object.keys(CLASS_LABEL) as GapClass[]).map((c) => `${c} ${findings.filter((f) => f.cls === c).length}`).join(", ");
  console.log(`gap-audit: ${findings.length} findings (${counts}); wrote docs/proposals/gap-audit.md and .json`);
}

if (process.argv[1]?.endsWith("gap-audit.ts")) main().catch((e) => { console.error(e); process.exit(1); });
