/**
 * NCI "A to Z List of Cancer Drugs" snapshot and corpus diff.
 *
 * Fetches https://www.cancer.gov/about-cancer/treatment/drugs/cancer-drugs (server-rendered; one link per
 * drug page, brand entries carry the generic in parentheses), groups entries by NCI page slug, and matches each
 * page against corpus products by generic name, brand, alias and code after stripping salt and ester suffixes
 * and the four-letter biologic suffix (-vncg, -irfc ...).
 *
 * Writes src/data/universe-lists/nci-cancer-drugs-match.json. A test (src/lib/universe-nci.test.ts) asserts every
 * entry has a matching record or a documented exclusion. Run: npx tsx scripts/fetch-nci-drugs.ts [--offline]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { NCI_EXCLUSIONS } from "../src/data/universe-lists/nci-exclusions";

export const NCI_AZ_URL = "https://www.cancer.gov/about-cancer/treatment/drugs/cancer-drugs";
const OUT = join(process.cwd(), "src", "data", "universe-lists", "nci-cancer-drugs-match.json");
const CACHE = "/tmp/nci-az.html";

export type NciEntry = {
  slug: string;
  url: string;
  /** Display names as listed (brand entries and generic entries share a slug). */
  names: string[];
  generic: string;
  brands: string[];
  /** "regimen" when the page is a combination acronym (ABVD, FOLFOX). */
  type: "drug" | "regimen";
  matchedIds: string[];
  exclusion?: string;
};
export type NciSnapshot = { source: string; checked: string; count: number; matched: number; excluded: number; unmatched: number; entries: NciEntry[] };

const SALTS = new Set(["hydrochloride", "dihydrochloride", "acetate", "dimaleate", "maleate", "monohydrate", "tosylate", "mesylate", "dimesylate", "citrate", "sodium", "disodium", "phosphate", "sulfate", "sulphate", "tartrate", "malate", "fumarate", "succinate", "camsylate", "besylate", "hydrobromide", "pamoate", "hyclate", "trihydrate", "dihydrate", "anhydrous", "calcium", "potassium", "magnesium", "hemihydrate", "ditosylate", "sesquihydrate", "lactate", "bromide", "chloride", "iodide", "propionate", "valerate", "esylate", "hydroxide", "decanoate", "mesilate", "hemifumarate", "diphosphate", "d-glucarate", "pendetide", "hydrate", "xinafoate", "and", "with", "injection", "topical", "tablets", "oral", "recombinant", "for"]);

/** Conjugate payload words that end in a four-letter run and must not be stripped as a biologic suffix. */
const KEEP_SUFFIX = /^-(vedotin|deruxtecan|govitecan|tirumotecan|emtansine|mafodotin|ozogamicin|tesirine|pasudotox|autoleucel|ejfemy|piiq|vicleucel|maraleucel|ciloleucel|afamitresgene|lifileucel)$/;

export function normaliseGeneric(s: string): string {
  let t = s.toLowerCase().replace(/ /g, " ").replace(/[®™]/g, "").trim();
  t = t.replace(/\s*\(.*?\)\s*/g, " ");
  // Biologic four-letter suffixes: "nadofaragene firadenovec-vncg" -> "nadofaragene firadenovec"
  t = t.replace(/-[a-z]{4}\b/g, (m) => (KEEP_SUFFIX.test(m) ? m : ""));
  const words = t.split(/\s+/).filter((w) => w && !SALTS.has(w));
  return words.join(" ").trim();
}

/** "Abecma (Idecabtagene Vicleucel)" -> { brand: "Abecma", generic: "Idecabtagene Vicleucel" } */
function splitEntry(name: string): { brand?: string; generic: string } {
  const m = name.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (m && /[a-z]/.test(m[2]) && m[2].split(" ").length <= 10) return { brand: m[1].trim(), generic: m[2].trim() };
  return { generic: name.trim() };
}

const NAV_SLUGS = new Set(["cancer-drugs", "cancer-type", "childhood-cancer-fda-approved-drugs", "related-conditions", "off-label", "access-experimental"]);

export function parseAzPage(html: string): Array<{ slug: string; name: string }> {
  const out: Array<{ slug: string; name: string }> = [];
  // Entries are relative or absolute links, some wrapped in <span>. Section navigation shares the path prefix.
  const re = /href="(?:https:\/\/www\.cancer\.gov)?\/about-cancer\/treatment\/drugs\/([a-z0-9-]+)"[^>]*>(?:<span>)?([^<]+)</g;
  for (const m of html.matchAll(re)) {
    if (NAV_SLUGS.has(m[1])) continue;
    const name = m[2].replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    out.push({ slug: m[1], name });
  }
  return out;
}

type Matchable = { id: string; keys: Set<string> };

export function corpusIndex(): Matchable[] {
  const g = graph();
  return g.kind("drug").map((d) => {
    const keys = new Set<string>();
    const add = (s?: string) => {
      if (!s) return;
      for (const part of s.split(/\s*\/\s*|\s*,\s*|\s*;\s*/)) { const n = normaliseGeneric(part); if (n.length >= 4) keys.add(n); }
    };
    add(d.name); add(d.brand); for (const a of d.aka) add(a); add(d.code);
    return { id: d.id, keys };
  });
}

export function matchEntry(generic: string, brands: string[], names: string[], index: Matchable[]): string[] {
  const cands = new Set<string>([normaliseGeneric(generic), ...brands.map(normaliseGeneric), ...names.map(normaliseGeneric)].filter((s) => s.length >= 4));
  const ids: string[] = [];
  for (const m of index) for (const c of cands) if (m.keys.has(c)) { ids.push(m.id); break; }
  return [...new Set(ids)];
}

/** Combination acronyms: all-caps tokens (ABVD, R-CHOP, FOLFOX, AC-T, CAF) with no brand and no generic words. */
const isRegimen = (generic: string, brands: string[]) => !brands.length && /^[A-Z0-9][A-Z0-9-]*$/.test(generic);

async function main() {
  const offline = process.argv.includes("--offline");
  let html: string;
  if (offline && existsSync(CACHE)) html = readFileSync(CACHE, "utf8");
  else {
    const r = await fetch(NCI_AZ_URL, { headers: { accept: "text/html", "user-agent": "OnCo corpus check (https://github.com/judegomila/OnCo)" } });
    if (!r.ok) throw new Error(`NCI ${r.status}`);
    html = await r.text();
    writeFileSync(CACHE, html);
  }
  const raw = parseAzPage(html);
  const bySlug = new Map<string, { names: string[]; brands: string[]; generic: string }>();
  for (const { slug, name } of raw) {
    const { brand, generic } = splitEntry(name);
    const e = bySlug.get(slug) ?? { names: [], brands: [], generic: "" };
    if (!e.names.includes(name)) e.names.push(name);
    if (brand && !e.brands.includes(brand)) e.brands.push(brand);
    // Prefer the bare generic entry; else the parenthetical generic.
    if (!brand) e.generic = generic; else if (!e.generic) e.generic = generic;
    bySlug.set(slug, e);
  }
  const index = corpusIndex();
  const entries: NciEntry[] = [...bySlug.entries()].map(([slug, e]) => {
    const matchedIds = matchEntry(e.generic, e.brands, e.names, index);
    const type: NciEntry["type"] = isRegimen(e.generic, e.brands) ? "regimen" : "drug";
    const entry: NciEntry = { slug, url: `https://www.cancer.gov/about-cancer/treatment/drugs/${slug}`, names: e.names, generic: e.generic, brands: e.brands, type, matchedIds };
    const excl = NCI_EXCLUSIONS[slug] ?? (type === "regimen" ? "regimen: combination acronym of individually listed generics; see the component drug records" : undefined);
    if (excl && !matchedIds.length) entry.exclusion = excl;
    return entry;
  }).sort((a, b) => a.slug.localeCompare(b.slug));
  const snap: NciSnapshot = {
    source: NCI_AZ_URL, checked: new Date().toISOString().slice(0, 10), count: entries.length,
    matched: entries.filter((e) => e.matchedIds.length).length,
    excluded: entries.filter((e) => !e.matchedIds.length && e.exclusion).length,
    unmatched: entries.filter((e) => !e.matchedIds.length && !e.exclusion).length,
    entries,
  };
  writeFileSync(OUT, JSON.stringify(snap, null, 1) + "\n");
  console.log(`NCI A to Z: ${snap.count} pages; matched ${snap.matched}; excluded ${snap.excluded}; unmatched ${snap.unmatched}`);
  for (const e of entries) if (!e.matchedIds.length && !e.exclusion) console.log(`  - ${e.slug}: ${e.generic}${e.brands.length ? ` (${e.brands.join(", ")})` : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
