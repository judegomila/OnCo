/**
 * Duplicate-company finder and merger: flags company records that are probably one company under two ids, and
 * merges the pairs that a hand review confirmed.
 *   npx tsx scripts/dedupe-companies.ts                    dry run: every candidate company pair with its verdict
 *   npx tsx scripts/dedupe-companies.ts --apply            merge the pairs in MERGES and print what changed
 *   npx tsx scripts/dedupe-companies.ts --kind institution report candidate institution pairs
 *   npx tsx scripts/dedupe-companies.ts --kind drug        report candidate drug pairs (merged only when listed in MERGES as obviously identical)
 *   npx tsx scripts/dedupe-companies.ts --json             machine-readable candidates
 *
 * Two records are candidates when
 *   - their normalised names match: lower case, accents and punctuation gone, parentheticals opened, legal suffixes
 *     (Inc, Ltd, GmbH, AG, SA, Co, Corp, ...), descriptors (Pharma, Pharmaceuticals, Therapeutics, Biosciences,
 *     Biosystems, Bio, ...) and city words (Shanghai, Suzhou, Beijing, Cambridge, Boston, ...) stripped, so
 *     "Orca Biosystems, Inc." meets "Orca Bio" and "InxMed (Shanghai) Co., Ltd." meets "InxMed"; an `aka` hit counts
 *     as a weaker signal than a `name` hit;
 *   - their websites share a registrable domain (www. and paths ignored); or
 *   - they share a Wikidata QID (src/data/wikidata-ids.ts) or a Wikipedia article.
 * Institutions and drugs use the same nets with a gentler name key (only punctuation and the article stripped for
 * institutions; brand and code join the name for drugs).
 *
 * Every candidate is reviewed by hand before it enters MERGES (true duplicates: one legal entity, one pipeline) or
 * SKIPS (a subsidiary with its own pipeline, a spin-out, a shared parent domain, a namesake). Unreviewed pairs are
 * printed as such and nothing is done with them.
 *
 * `--apply` merges each MERGES pair whose two records still exist:
 *   1. the winner keeps its id and text; every field the loser has and the winner lacks moves over (aka, website,
 *      country, hq, ticker, founded, stage, wikipedia, and the id arrays drugs, trials, cancers, sections,
 *      technologies, targets, institutions, companies, related, investors, plus links by URL); the loser's name and
 *      id join the winner's aka so search still finds them;
 *   2. the loser's object literal is removed from its data file (with its `c({ ... })`-style wrapper when present);
 *   3. every `"<loser>"` string literal across src/data is rewritten to the winner: inside an id array that already
 *      names the winner the element is dropped, elsewhere it is replaced; keyed maps (simple text, translations,
 *      wikidata ids) lose the loser's line when the winner already has one, otherwise the key is renamed (quoted,
 *      because ids are hyphenated); translations of the loser's own TL;DR are dropped because the text they translate
 *      is gone;
 *   4. public/logos/index.json: the loser's logo moves to the winner when the winner has none, otherwise it is deleted;
 *   5. vercel.json gains a redirect from the loser's route to the winner's, in the form scripts/build-redirect-stubs.ts
 *      expects (run it afterwards to write the static stub under public/).
 * The editor comes from scripts/orphan-links.ts: literals are found by `id:` and checked by `name` before any edit.
 */
import { existsSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { graph } from "../src/lib/graph";
import { REL_FIELDS, routeFor, type Entity } from "../src/lib/schema";
import { isInternalTag } from "../src/lib/tags";
import { wikidataIds } from "../src/data/wikidata-ids";
import { appendToArray, dataFiles, elements, locate, scan, type Located, type Scan } from "./orphan-links";

type ReviewKind = "company" | "institution" | "drug";

// ---------------------------------------------------------------- reviewed verdicts

/** Confirmed duplicates. The winner is the older or better-linked id (the short canonical id when both are young, as
 *  the cstone and hengrui merges chose); the loser's route redirects to it. Institutions and drugs enter only when
 *  the two records are obviously one thing (same name and same brand, or same name and same website). */
export const MERGES: Array<{ winner: string; loser: string; why: string }> = [
  { winner: "orca-bio", loser: "orca-biosystems", why: "Orca Biosystems, Inc. is the legal name of Orca Bio (same Menlo Park address, same orcabio.com, same Orca-T pipeline); the sponsor-wave record duplicated the startup record" },
  { winner: "inxmed", loser: "inxmed-shanghai", why: "InxMed (Shanghai) Co., Ltd. is the legal name of InxMed (same inxmed.com, same IN10018 pipeline); the sponsor-wave record duplicated the sponsor record added two days later under the short name" },
  { winner: "cellectis", loser: "cellectis-s-a", why: "Cellectis S.A. is the legal name of Cellectis (same Paris address, same cellectis.com, same CLLS ticker, same UCART allogeneic CAR-T pipeline); the sponsor-wave record duplicated the manufacturing-wave record" },
  { winner: "valius", loser: "valius-sciences", why: "both records are named Valius Sciences and describe the same US multi-omic and functional tumour-profiling service backed by Define Ventures and Even One; the second site is kept as a link" },
  { winner: "nogapendekin-alfa", loser: "nogapendekin-alfa-inbakicept", why: "same INN and same brand (Anktiva), same maker ImmunityBio, same BCG-unresponsive bladder cancer approval; the gap-fill record duplicated the urothelial spike drug" },
  { winner: "i131-mibg", loser: "iobenguane-i-131", why: "same INN (iobenguane I-131), same Wikipedia article, same maker Lantheus and the same MIBG theranostics technology; Azedra was the high-specific-activity brand of the 131I-MIBG therapy the neuroblastoma spike already records, and the approved-wave record duplicated it three days later; the older, better-linked id keeps the page and carries Azedra's approval and 2024 discontinuation" },
];

/** Reviewed pairs that are not duplicates, with the reason, so the next run does not raise them again. */
export const SKIPS: Array<{ a: string; b: string; why: string }> = [
  // companies
  { a: "biocon", b: "biocon-biologics", why: "Biocon Biologics is Biocon's biosimilars subsidiary with its own pipeline, approvals and website; the parent record links to it" },
  { a: "jw-pharmaceutical", b: "jw-therapeutics", why: "different companies that share initials: JW Pharmaceutical is a Seoul hospital-medicines maker, JW Therapeutics a Shanghai CAR-T developer" },
  { a: "astrazeneca", b: "fusion-pharma", why: "Fusion Pharmaceuticals is an acquired subsidiary with its own radiopharmaceutical pipeline; its website now points at the acquirer's" },
  { a: "gtx", b: "oncternal-therapeutics", why: "GTx merged into Oncternal in 2019 but the record is the predecessor with its own SARM and toremifene pipeline; Oncternal already lists GTx as a former name" },
  // institutions: departments, branches and namesakes that share a parent domain
  { a: "aphp-nord-cancer-institute", b: "carpem-aphp-centre", why: "two of the AP-HP cancer institutes (Nord and Centre) on the shared aphp.fr domain" },
  { a: "aphp-nord-cancer-institute", b: "iuc-aphp-sorbonne", why: "two of the AP-HP cancer institutes (Nord and Sorbonne) on the shared aphp.fr domain" },
  { a: "carpem-aphp-centre", b: "iuc-aphp-sorbonne", why: "two of the AP-HP cancer institutes (Centre and Sorbonne) on the shared aphp.fr domain" },
  { a: "homi-bhabha-cancer-hospital-varanasi", b: "tata-memorial", why: "the Varanasi hospital is a Tata Memorial Centre unit with its own page; both use tmc.gov.in" },
  { a: "icmr", b: "icmr-nicpr", why: "ICMR is the council, ICMR-NICPR its cancer prevention institute in Noida; both use icmr.gov.in" },
  { a: "aiims-delhi", b: "aiims-network", why: "the New Delhi institute and the PMSSY network of new AIIMS institutes share the AIIMS acronym only" },
  { a: "inca", b: "inca-brazil", why: "the French Institut National du Cancer and Brazil's Instituto Nacional de Câncer share an acronym" },
  { a: "nottingham-cancer-centre", b: "nuh-ncis", why: "Nottingham University Hospitals and Singapore's National University Hospital share the NUH acronym" },
  { a: "terry-fox-foundation", b: "terry-fox-research-institute", why: "the foundation funds the research institute it founded; separate organisations with separate websites" },
  // drugs: regimens, formulations and combinations that share a component's Wikipedia article
  { a: "bevacizumab", b: "bevacizumab-glioma", why: "the glioblastoma record is a use-specific page for one drug; the corpus keeps use pages beside drug pages" },
  { a: "etoposide", b: "platinum-etoposide", why: "single agent versus the platinum plus etoposide regimen" },
  { a: "gemcitabine", b: "gemcitabine-cisplatin", why: "single agent versus the gemcitabine plus cisplatin regimen" },
  { a: "gemcitabine", b: "gemcitabine-nab-paclitaxel", why: "single agent versus the gemcitabine plus nab-paclitaxel regimen" },
  { a: "gemcitabine-cisplatin", b: "gemcitabine-nab-paclitaxel", why: "two different gemcitabine regimens" },
  { a: "aminolevulinic-acid", b: "aminolevulinic-acid-gleolan", why: "topical photodynamic-therapy product versus the oral fluorescence-guided-surgery product" },
  { a: "capmatinib", b: "capmatinib-tepotinib", why: "single agent versus the MET inhibitor class page" },
  { a: "cytarabine", b: "cytarabine-7-3", why: "single agent versus the 7+3 induction regimen" },
  { a: "dabrafenib", b: "dabrafenib-trametinib", why: "single agent versus the BRAF plus MEK combination" },
  { a: "gardasil-9", b: "hpv-quadrivalent-vaccine", why: "nonavalent and quadrivalent HPV vaccines are different products" },
  { a: "megestrol", b: "megestrol-progestins", why: "single agent versus the progestin class page" },
];

// ---------------------------------------------------------------- name keys

const LEGAL = new Set(["inc", "incorporated", "ltd", "limited", "gmbh", "ag", "sa", "se", "nv", "bv", "ab", "oy", "plc", "llc", "lp", "co", "corp", "corporation", "company", "kk", "spa", "srl", "pte", "pty", "holdings", "holding", "group"]);
const DESCRIPTORS = new Set(["pharma", "pharmaceutical", "pharmaceuticals", "therapeutics", "biosciences", "bioscience", "biosystems", "bio", "biotech", "biotechnology", "biotechnologies", "biopharma", "biopharmaceutical", "biopharmaceuticals", "biologics", "medicines", "medical", "sciences"]);
const CITIES = new Set(["shanghai", "suzhou", "beijing", "cambridge", "boston", "hangzhou", "nanjing", "guangzhou", "shenzhen", "jiangsu", "zhejiang", "china", "international"]);

/** Lower-case, accent-free, punctuation-free words of a name; parentheticals are opened, "&" becomes "and". */
function words(name: string): string[] {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[’'`.]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Company key: the name without legal suffixes, descriptors and city words; the plain words when nothing else is left. */
export function companyKey(name: string): string {
  const all = words(name);
  if (!all.length) return "";
  const kept = all.filter((w) => !LEGAL.has(w) && !DESCRIPTORS.has(w) && !CITIES.has(w));
  return (kept.length ? kept : all).join(" ");
}

/** Institution key: only punctuation and the article go, so "Cambridge" and "Boston" keep their meaning. */
export function institutionKey(name: string): string {
  return words(name).filter((w) => w !== "the").join(" ");
}

/** Drug key: letters and digits only, so "IN10018 (ifebemtinib)" meets "IN-10018" but not "ifebemtinib". */
export function drugKey(name: string): string {
  return words(name).join("");
}

/** Registrable host of a URL without the www. prefix; undefined for unparsable strings. */
export function domainOf(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Path of a URL when it is more than the root, so `domain|` keys separate portfolio pages on one host. */
function pathOf(url: string | undefined): string {
  if (!url) return "";
  try {
    const p = new URL(url).pathname.replace(/\/+$/, "").toLowerCase();
    return p && p !== "/index.html" ? `|${p}` : "";
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------- candidates

type Rec = Extract<Entity, { kind: ReviewKind }>;
export type Candidate = { a: Summary; b: Summary; signals: string[]; verdict: "MERGE" | "SKIP" | "UNREVIEWED"; why?: string };
type Summary = { id: string; name: string; kind: ReviewKind; place: string; website?: string; wikidata?: string; inbound: number; outgoing: number; asOf: string; file?: string };

function summarise(e: Rec, file: string | undefined): Summary {
  const g = graph();
  const inbound = [...g.incoming(e.id).values()].reduce((n, l) => n + l.length, 0);
  const outgoing = REL_FIELDS.reduce((n, f) => n + e[f].length, 0);
  const place = e.kind === "company" ? `${e.hq}, ${e.country}` : e.kind === "institution" ? `${e.city}, ${e.country}` : e.modality;
  const website = e.kind === "drug" ? undefined : e.website;
  return { id: e.id, name: e.name, kind: e.kind, place, website, wikidata: wikidataIds[e.id], inbound, outgoing, asOf: e.asOf, file };
}

/** Signal keys of a record: `name|`, `aka|`, `brand|`, `code|`, `domain|`, `wikidata|`, `wikipedia|`. */
function keysOf(e: Rec): string[] {
  const out: string[] = [];
  if (e.kind === "company") {
    out.push(`name|${companyKey(e.name)}`);
    for (const a of e.aka) { const k = companyKey(a); if (k) out.push(`aka|${k}`); }
  } else if (e.kind === "institution") {
    out.push(`name|${institutionKey(e.name)}`);
    for (const a of e.aka) { const k = institutionKey(a); if (k) out.push(`aka|${k}`); }
  } else {
    out.push(`name|${drugKey(e.name)}`);
    for (const a of e.aka) { const k = drugKey(a); if (k) out.push(`aka|${k}`); }
    if (e.brand) out.push(`brand|${drugKey(e.brand)}`);
    if (e.code) out.push(`code|${drugKey(e.code)}`);
  }
  // A shared domain only counts when both sites are the domain root (or the same page): acquired companies and
  // venture arms point at the parent's site, and portfolio pages on one host are not one company.
  if (e.kind !== "drug" && !(e.kind === "company" && (e.stage === "acquired" || e.companyType === "investor"))) {
    const d = domainOf(e.website);
    if (d) out.push(`domain|${d}${pathOf(e.website)}`);
  }
  const q = wikidataIds[e.id];
  if (q) out.push(`wikidata|${q}`);
  if (e.wikipedia) out.push(`wikipedia|${e.wikipedia.toLowerCase().replace(/\/$/, "")}`);
  return out.filter((k) => !k.endsWith("|"));
}

export function candidates(kind: ReviewKind): Candidate[] {
  const g = graph();
  const records = g.kind(kind) as Rec[];
  const files = dataFiles();
  const texts = new Map(files.map((f) => [f, readFileSync(f, "utf8")] as const));
  const scans = new Map(files.map((f) => [f, scan(texts.get(f)!)] as const));
  const fileOf = (e: Rec) => { const hit = locate(files, texts, scans, e.id, e.kind, e.name)[0]; return hit ? relative(process.cwd(), hit.file) : undefined; };

  const groups = new Map<string, Rec[]>();
  for (const e of records) for (const k of new Set(keysOf(e))) groups.set(k, [...(groups.get(k) ?? []), e]);
  const pairs = new Map<string, { a: Rec; b: Rec; signals: string[] }>();
  for (const [k, list] of groups) {
    if (list.length < 2) continue;
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const [a, b] = [list[i], list[j]].sort((x, y) => x.id.localeCompare(y.id));
      const pk = `${a.id}|${b.id}`;
      const p = pairs.get(pk) ?? { a, b, signals: [] };
      p.signals.push(k);
      pairs.set(pk, p);
    }
  }
  const verdictOf = (a: string, b: string): { verdict: Candidate["verdict"]; why?: string } => {
    const m = MERGES.find((x) => (x.winner === a && x.loser === b) || (x.winner === b && x.loser === a));
    if (m) return { verdict: "MERGE", why: `${m.winner} keeps the page: ${m.why}` };
    const s = SKIPS.find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));
    if (s) return { verdict: "SKIP", why: s.why };
    return { verdict: "UNREVIEWED" };
  };
  const rank = (s: string[]) => s.reduce((n, k) => n + (k.startsWith("wikidata|") || k.startsWith("wikipedia|") ? 4 : k.startsWith("name|") ? 3 : k.startsWith("domain|") ? 2 : 1), 0);
  return [...pairs.values()]
    .map(({ a, b, signals }) => ({ a: summarise(a, fileOf(a)), b: summarise(b, fileOf(b)), signals: signals.sort(), ...verdictOf(a.id, b.id) }))
    .sort((x, y) => rank(y.signals) - rank(x.signals) || x.a.id.localeCompare(y.a.id));
}

// ---------------------------------------------------------------- merging

const SCALARS = ["website", "country", "hq", "ticker", "founded", "stage", "wikipedia", "ycBatch", "acquiredBy"] as const;
const ARRAYS = [...REL_FIELDS, "investors"] as const;
const DATA_DIR = join(process.cwd(), "src", "data");
const VERCEL = join(process.cwd(), "vercel.json");
const LOGO_DIR = join(process.cwd(), "public", "logos");
const LOGO_INDEX = join(LOGO_DIR, "index.json");

/** Every .ts data file including the i18n directory, which dataFiles() leaves out. */
function allDataFiles(dir = DATA_DIR): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { out.push(...allDataFiles(p)); continue; }
    if (name.endsWith(".ts") && !name.endsWith(".test.ts") && !name.endsWith(".d.ts")) out.push(p);
  }
  return out;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const q = (s: string) => JSON.stringify(s);

/** Span of a record literal including its `c(` / `s(` wrapper, trailing `)` and `,`, from line start to line end. */
function recordSpan(src: string, s: Scan, open: number): { start: number; end: number } {
  let start = open;
  let end = s.match[open] + 1;
  let i = open - 1;
  while (i >= 0 && /\s/.test(src[i])) i--;
  if (src[i] === "(") {
    let j = i - 1;
    while (j >= 0 && /[\w$]/.test(src[j])) j--;
    if (j < i - 1) {
      start = j + 1;
      let k = end;
      while (k < src.length && /\s/.test(src[k])) k++;
      if (src[k] === ")") end = k + 1;
    }
  }
  if (src[end] === ",") end++;
  // Take the whole line when nothing else shares it.
  const lineStart = src.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = src.indexOf("\n", end);
  const stop = lineEnd < 0 ? src.length : lineEnd + 1;
  if (src.slice(lineStart, start).trim() === "" && src.slice(end, lineEnd < 0 ? src.length : lineEnd).trim() === "") return { start: lineStart, end: stop };
  return { start, end };
}

/** Index of the array literal `[` enclosing position `at`, or -1 when the nearest bracket is not an array. */
function enclosingArray(src: string, s: Scan, at: number): number {
  for (let i = at - 1; i >= 0; i--) {
    if (s.mask[i] || s.depth[i] !== s.depth[at] - 1) continue;
    if (src[i] === "[" && s.match[i] > at) return i;
    if (src[i] === "{" || src[i] === "(") return -1;
  }
  return -1;
}

type Change = { file: string; line: number; what: string };

export function applyMerges(write: boolean): { changes: Change[]; skipped: string[] } {
  const g = graph();
  const files = allDataFiles();
  const texts = new Map(files.map((f) => [f, readFileSync(f, "utf8")] as const));
  const scans = new Map<string, Scan>();
  const rescan = (f: string) => scans.set(f, scan(texts.get(f)!));
  for (const f of files) rescan(f);
  const changes: Change[] = [];
  const skipped: string[] = [];
  const touched = new Set<string>();
  const rel = (f: string) => relative(process.cwd(), f);
  const lineOf = (src: string, at: number) => src.slice(0, at).split("\n").length;
  const edit = (file: string, start: number, end: number, replacement: string, what: string) => {
    const src = texts.get(file)!;
    changes.push({ file: rel(file), line: lineOf(src, start), what });
    texts.set(file, src.slice(0, start) + replacement + src.slice(end));
    rescan(file);
    touched.add(file);
  };
  const vercel = JSON.parse(readFileSync(VERCEL, "utf8")) as { redirects?: Array<{ source: string; destination: string; permanent: boolean }> };
  const logos = existsSync(LOGO_INDEX) ? (JSON.parse(readFileSync(LOGO_INDEX, "utf8")) as Record<string, { file: string } & Record<string, unknown>>) : {};
  const logoOps: Array<() => void> = [];
  let vercelChanged = false, logosChanged = false;

  for (const m of MERGES) {
    const winner = g.get(m.winner);
    const loser = g.get(m.loser);
    if (!winner || !loser) { skipped.push(`${m.loser} -> ${m.winner}: ${!winner ? "winner" : "loser"} not in the corpus (already merged?)`); continue; }
    if (winner.kind !== loser.kind) { skipped.push(`${m.loser} -> ${m.winner}: kinds differ`); continue; }
    const find = (e: Entity): Located | undefined => {
      const hits = locate(files, texts, scans, e.id, e.kind, e.name);
      return (hits.filter((h) => h.props.some((p) => p.key === "kind")).concat(hits))[0];
    };
    if (!find(winner) || !find(loser)) { skipped.push(`${m.loser} -> ${m.winner}: ${!find(winner) ? "winner" : "loser"} literal not found`); continue; }

    // 1. Remove the loser literal first, so the reference sweep below never sees its own `id:`.
    {
      const hit = find(loser)!;
      const src = texts.get(hit.file)!;
      const span = recordSpan(src, scans.get(hit.file)!, hit.open);
      edit(hit.file, span.start, span.end, "", `remove ${loser.id} record literal`);
    }

    // 2. Rewrite every remaining "<loser>" literal.
    const lit = new RegExp(`(["'])${esc(loser.id)}\\1`, "g");
    const winnerKey = new RegExp(`^\\s*(?:"${esc(winner.id)}"|${esc(winner.id)})\\s*:`, "m");
    const winnerKeyInDir = (file: string) => files.filter((f) => join(f, "..") === join(file, "..")).some((f) => winnerKey.test(texts.get(f)!));
    for (const file of files) {
      let guard = 0;
      while (guard++ < 10_000) {
        const src = texts.get(file)!;
        const s = scans.get(file)!;
        let hit: RegExpExecArray | null = null;
        lit.lastIndex = 0;
        for (let mm = lit.exec(src); mm; mm = lit.exec(src)) {
          // Skip mentions inside comments: a string literal's closing quote is followed by code, a comment's by more comment.
          const after = mm.index + mm[0].length;
          if (after < src.length && s.mask[after] && src[after] !== "\n") continue;
          if (src.slice(src.lastIndexOf("\n", mm.index) + 1, mm.index).trim().startsWith("//")) continue;
          hit = mm;
          break;
        }
        if (!hit) break;
        const at = hit.index;
        const end = at + hit[0].length;
        const restOfLine = src.slice(end, src.indexOf("\n", end) < 0 ? src.length : src.indexOf("\n", end));
        const lineStart = src.lastIndexOf("\n", at) + 1;
        const isKey = /^\s*:/.test(restOfLine) && src.slice(lineStart, at).trim() === "";
        if (isKey) {
          // Keyed map entry (`"<loser>": ...` at line start): simple text and wikidata ids move to the winner unless it
          // already has an entry in the same directory; translations of the loser's own TL;DR go with the TL;DR.
          const lineEnd = src.indexOf("\n", end);
          const stop = lineEnd < 0 ? src.length : lineEnd + 1;
          const translation = relative(DATA_DIR, file).split("/")[0] === "i18n";
          if (translation) edit(file, lineStart, stop, "", `drop keyed entry ${q(loser.id)} (translation of the removed TL;DR)`);
          else if (winnerKeyInDir(file)) edit(file, lineStart, stop, "", `drop keyed entry ${q(loser.id)} (${winner.id} already has one)`);
          else edit(file, at, end, q(winner.id), `rename key ${q(loser.id)} -> ${q(winner.id)}`);
          continue;
        }
        const arr = enclosingArray(src, s, at);
        if (arr >= 0) {
          const inner = src.slice(arr + 1, s.match[arr]);
          const winnerLit = new RegExp(`(["'])${esc(winner.id)}\\1`);
          if (winnerLit.test(inner)) {
            // Drop this element with its separator.
            let a = at, b = end;
            while (b < s.match[arr] && /\s/.test(src[b])) b++;
            if (src[b] === ",") { b++; while (b < s.match[arr] && src[b] === " ") b++; }
            else { while (a > arr + 1 && /\s/.test(src[a - 1])) a--; if (src[a - 1] === ",") a--; }
            edit(file, a, b, "", `drop ${q(loser.id)} from an array that already names ${winner.id}`);
            continue;
          }
        }
        edit(file, at, end, q(winner.id), `${q(loser.id)} -> ${q(winner.id)}`);
      }
    }

    // 3. Move what the winner lacks onto the winner literal: id arrays, public tags, scalars, links, and the loser's
    //    name, aliases and id as aka so search still finds them.
    const wHit = find(winner)!;
    const wSrc = () => texts.get(wHit.file)!;
    const wProps = () => elements(wSrc(), scans.get(wHit.file)!, find(winner)!.open);
    const ownNames = new Set([winner.name, ...winner.aka, ...(winner.kind === "drug" ? [winner.brand, winner.code] : [])].filter(Boolean) as string[]);
    const aka = [loser.name, ...loser.aka, loser.id].filter((x, i, arr) => arr.indexOf(x) === i && !ownNames.has(x));
    const arrayAdds: Array<[string, string[]]> = [["aka", aka]];
    for (const f of ARRAYS) {
      if (!(f in loser) || !(f in winner)) continue;
      const lv = (loser as unknown as Record<string, string[]>)[f] ?? [];
      const wv = (winner as unknown as Record<string, string[]>)[f] ?? [];
      const add = lv.filter((x) => !wv.includes(x) && x !== winner.id && x !== loser.id);
      if (add.length) arrayAdds.push([f, add]);
    }
    const publicTagAdds = loser.tags.filter((t) => !isInternalTag(t) && !winner.tags.includes(t));
    if (publicTagAdds.length) arrayAdds.push(["tags", publicTagAdds]);
    for (const [field, items] of arrayAdds) {
      for (const item of items) {
        const prop = wProps().find((p) => p.key === field);
        if (prop) {
          const r = appendToArray(wSrc(), prop.vStart, prop.vEnd, item);
          if (!r) { skipped.push(`${winner.id}.${field}: not an array literal, ${q(item)} not moved`); continue; }
          edit(wHit.file, prop.vStart, prop.vEnd, r, `${winner.id}.${field} += ${q(item)} (from ${loser.id})`);
        } else if (wProps().some((p) => p.spread)) {
          skipped.push(`${winner.id}.${field}: record has no ${field} and uses a spread that may supply it, ${q(item)} not moved`);
        } else {
          const idProp = wProps().find((p) => p.key === "id")!;
          edit(wHit.file, idProp.end, idProp.end, `, ${field}: [${q(item)}]`, `${winner.id}.${field} = [${q(item)}] (from ${loser.id}) [new field]`);
        }
      }
    }
    for (const f of SCALARS) {
      const lv = (loser as unknown as Record<string, unknown>)[f];
      const wv = (winner as unknown as Record<string, unknown>)[f];
      if (lv === undefined || wv !== undefined) continue;
      if (wProps().find((p) => p.key === f)) continue;
      const idProp = wProps().find((p) => p.key === "id")!;
      edit(wHit.file, idProp.end, idProp.end, `, ${f}: ${JSON.stringify(lv)}`, `${winner.id}.${f} = ${JSON.stringify(lv)} (from ${loser.id})`);
    }
    // A loser link moves unless the winner already links to that host (its own site, the same registry search, the same label source).
    const winnerHosts = new Set([domainOf("website" in winner ? winner.website : undefined), ...winner.links.map((l) => domainOf(l.url))].filter(Boolean));
    for (const l of loser.links.filter((l) => !winnerHosts.has(domainOf(l.url)))) {
      const prop = wProps().find((p) => p.key === "links");
      // A second "Official website" beside the winner's own site names its host so readers see it is a second domain.
      const label = /^official website$/i.test(l.label) && "website" in winner && winner.website ? `Official website (${domainOf(l.url)})` : l.label;
      const literal = `{ label: ${q(label)}, url: ${q(l.url)} }`;
      if (prop && wSrc()[prop.vStart] === "[") {
        const inner = wSrc().slice(prop.vStart + 1, prop.vEnd - 1).trimEnd();
        const body = inner.trim() === "" ? literal : inner.endsWith(",") ? `${inner} ${literal}` : `${inner}, ${literal}`;
        edit(wHit.file, prop.vStart, prop.vEnd, `[${body}]`, `${winner.id}.links += ${q(l.url)} (from ${loser.id})`);
      } else if (!prop) {
        const idProp = wProps().find((p) => p.key === "id")!;
        edit(wHit.file, idProp.end, idProp.end, `, links: [${literal}]`, `${winner.id}.links = [${q(l.url)}] (from ${loser.id}) [new field]`);
      } else skipped.push(`${winner.id}.links: not an array literal, ${l.url} not moved`);
      winnerHosts.add(domainOf(l.url));
    }

    // 4. Logo.
    const lLogo = logos[loser.id];
    if (lLogo) {
      const ext = lLogo.file.split(".").pop()!;
      if (!logos[winner.id]) {
        const target = `${winner.id}.${ext}`;
        logoOps.push(() => { if (existsSync(join(LOGO_DIR, lLogo.file))) renameSync(join(LOGO_DIR, lLogo.file), join(LOGO_DIR, target)); });
        logos[winner.id] = { ...lLogo, file: target };
        changes.push({ file: "public/logos/index.json", line: 1, what: `logo ${lLogo.file} -> ${target}` });
      } else {
        logoOps.push(() => { if (existsSync(join(LOGO_DIR, lLogo.file))) unlinkSync(join(LOGO_DIR, lLogo.file)); });
        changes.push({ file: "public/logos/index.json", line: 1, what: `delete logo ${lLogo.file} (${winner.id} has its own)` });
      }
      delete logos[loser.id];
      logosChanged = true;
    }

    // 5. Redirect.
    const source = `${routeFor(loser)}:path*`;
    const destination = `${routeFor(winner)}:path*`;
    if (!(vercel.redirects ?? []).some((r) => r.source === source)) {
      vercel.redirects = [...(vercel.redirects ?? []), { source, destination, permanent: true }];
      vercelChanged = true;
      changes.push({ file: "vercel.json", line: 0, what: `redirect ${source} -> ${destination}` });
    }
  }

  if (write) {
    for (const f of touched) writeFileSync(f, texts.get(f)!);
    if (vercelChanged) writeFileSync(VERCEL, JSON.stringify(vercel, null, 2) + "\n");
    if (logosChanged) { for (const op of logoOps) op(); writeFileSync(LOGO_INDEX, JSON.stringify(logos)); }
  }
  return { changes, skipped };
}

// ---------------------------------------------------------------- CLI

if (process.argv[1]?.endsWith("dedupe-companies.ts")) {
  const kindArg = process.argv.indexOf("--kind");
  const kind = (kindArg >= 0 ? process.argv[kindArg + 1] : "company") as ReviewKind;
  if (!["company", "institution", "drug"].includes(kind)) { console.error("--kind must be company, institution or drug"); process.exit(1); }
  const apply = process.argv.includes("--apply");
  if (apply && kind !== "company") { console.error("--apply only merges companies; institutions and drugs are report-only"); process.exit(1); }
  if (apply) {
    const { changes, skipped } = applyMerges(true);
    for (const c of changes) console.log(`EDIT  ${c.file}:${c.line} ${c.what}`);
    for (const s of skipped) console.log(`SKIP  ${s}`);
    console.log(`\n${changes.length} edits applied, ${skipped.length} skipped. Now run: npx tsx scripts/build-redirect-stubs.ts && npm run validate`);
  } else {
    const list = candidates(kind);
    if (process.argv.includes("--json")) { console.log(JSON.stringify(list, null, 0)); process.exit(0); }
    for (const c of list) {
      console.log(`\n${c.verdict.padEnd(10)} ${c.a.id}  <->  ${c.b.id}   [${c.signals.join(", ")}]${c.why ? `\n           ${c.why}` : ""}`);
      for (const r of [c.a, c.b]) console.log(`  ${r.id.padEnd(34)} ${r.name} | ${r.place} | ${r.website ?? "-"} | ${r.wikidata ?? "-"} | in ${r.inbound} out ${r.outgoing} | ${r.asOf} | ${r.file ?? "?"}`);
    }
    const n = (v: Candidate["verdict"]) => list.filter((c) => c.verdict === v).length;
    console.log(`\n${list.length} candidate ${kind} pairs: ${n("MERGE")} to merge, ${n("SKIP")} reviewed as distinct, ${n("UNREVIEWED")} unreviewed`);
    if (kind === "company") {
      const { changes, skipped } = applyMerges(false);
      console.log(`\nDry run of --apply: ${changes.length} edits, ${skipped.length} skipped`);
      for (const c of changes) console.log(`PLAN  ${c.file}:${c.line} ${c.what}`);
      for (const s of skipped) console.log(`SKIP  ${s}`);
    }
  }
}
