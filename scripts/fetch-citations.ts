/**
 * Citation counts for key papers (improvement #97), from the Europe PMC index looked up by DOI (or PMID).
 * Europe PMC is budget-free, so this runs beside fetch:research without touching the OpenAlex daily allowance.
 *
 *   public/citations/index.json  { fetched, papers: { <paperId>: { citedBy, source, id, pmid, fetched } } }
 *
 * Rules: up to 10 identifiers per query joined with OR, 300 ms between requests, DOIs quoted so that
 * parentheses in Lancet-style DOIs are not tokenised. Idempotent: papers fetched in the last 7 days are
 * skipped unless --force; an entry is only written when Europe PMC returned a numeric citedByCount for a
 * record whose DOI (or PMID) matches the paper, so a count is never invented or carried across papers.
 *
 * Run: npm run fetch:citations [-- --force]   Weekly via .github/workflows/refresh-pulse.yml.
 * Read at build time through src/lib/citations.ts (paper page chip, key-paper cards, health gauge).
 */
import { graph } from "../src/lib/graph";
import { EPMC_REST } from "../src/lib/europepmc";
import { getJson, publicPath, readJson, sleep, today, writeJson } from "./feed-utils";

const OUT = publicPath("citations", "index.json");
const BATCH = 10;
const PAUSE_MS = 300;
const FRESH_DAYS = 7;
const FORCE = process.argv.includes("--force");

export type CitationEntry = { citedBy: number; source: string; id?: string; pmid?: string; fetched: string };
export type CitationsIndex = { fetched: string; papers: Record<string, CitationEntry> };

type Result = { id?: string; source?: string; pmid?: string; doi?: string; citedByCount?: unknown };
type Target = { id: string; doi?: string; pmid?: string };

export const normDoi = (d: string) => d.trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "").replace(/^doi:\s*/, "");

/** One Europe PMC query term per paper: quoted DOI and/or PMID restricted to MEDLINE (both when the record has both, so a DOI typo still resolves). */
export function termFor(t: Target): string {
  const parts = [t.doi && `DOI:"${normDoi(t.doi).replace(/"/g, "")}"`, t.pmid && `(EXT_ID:${t.pmid.trim()} AND SRC:MED)`].filter(Boolean) as string[];
  return parts.length > 1 ? `(${parts.join(" OR ")})` : parts[0];
}

const doiMatches = (t: Target, r: Result) => !!(t.doi && r.doi && normDoi(r.doi) === normDoi(t.doi));
const pmidMatches = (t: Target, r: Result) => !!(t.pmid && r.pmid && r.pmid === t.pmid.trim());

const daysBetween = (a: string, b: string) => Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000;

/** Prefer the MEDLINE record, then PMC, then the most cited: preprint versions share neither DOI nor count. */
const RANK: Record<string, number> = { MED: 3, PMC: 2 };
export function pickResult(results: Result[]): Result | undefined {
  return [...results].sort((a, b) => (RANK[b.source ?? ""] ?? 0) - (RANK[a.source ?? ""] ?? 0) || (Number(b.citedByCount) || 0) - (Number(a.citedByCount) || 0))[0];
}

/** Match returned records back to the papers asked for (DOI first, then PMID); only a numeric citedByCount counts. */
export function matchResults(batch: Target[], results: Result[], fetched: string): Record<string, CitationEntry> {
  const out: Record<string, CitationEntry> = {};
  for (const t of batch) {
    const counted = results.filter((r) => typeof r.citedByCount === "number");
    const byDoi = counted.filter((r) => doiMatches(t, r));
    const hits = byDoi.length ? byDoi : counted.filter((r) => pmidMatches(t, r));
    const r = pickResult(hits);
    if (!r || typeof r.citedByCount !== "number") continue;
    out[t.id] = { citedBy: r.citedByCount, source: r.source ?? "MED", id: r.id, pmid: r.pmid, fetched };
  }
  return out;
}

async function main() {
  const g = graph();
  const now = today();
  const prev = readJson<CitationsIndex>(OUT) ?? { fetched: now, papers: {} };
  const papers = g.kind("paper");
  const targets: Target[] = papers.filter((p) => p.doi || p.pmid).map((p) => ({ id: p.id, doi: p.doi, pmid: p.pmid }));
  const noId = papers.length - targets.length;
  const todo = FORCE ? targets : targets.filter((t) => { const e = prev.papers[t.id]; return !e || daysBetween(e.fetched, now) >= FRESH_DAYS; });
  console.log(`citations: ${papers.length} key papers, ${targets.length} with a DOI or PMID, ${noId} without, ${targets.length - todo.length} fresh (skipped)${FORCE ? ", --force" : ""}`);

  const snap: CitationsIndex = { fetched: now, papers: { ...prev.papers } };
  let got = 0, failed = 0;
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const query = batch.map(termFor).join(" OR ");
    const url = `${EPMC_REST}?query=${encodeURIComponent(query)}&resultType=lite&format=json&pageSize=50`;
    const json = await getJson<{ resultList?: { result?: Result[] } }>(url);
    if (!json) { failed += 1; console.warn(`  batch ${i / BATCH + 1} failed`); }
    else {
      const matched = matchResults(batch, json.resultList?.result ?? [], now);
      got += Object.keys(matched).length;
      Object.assign(snap.papers, matched);
    }
    if (i + BATCH < todo.length) await sleep(PAUSE_MS);
  }
  // Drop entries for papers that no longer exist in the corpus.
  for (const id of Object.keys(snap.papers)) if (!g.get(id)) delete snap.papers[id];

  writeJson(OUT, snap);
  const unmatched = todo.filter((t) => !snap.papers[t.id]).map((t) => t.id);
  console.log(`citations: ${got} counts received, ${unmatched.length} not found in Europe PMC, ${failed} batches failed -> ${OUT}`);
  console.log(`citations: ${Object.keys(snap.papers).length} of ${papers.length} papers now have a count`);
  if (unmatched.length) console.log(`  not found: ${unmatched.join(", ")}`);
}

if (process.argv[1]?.endsWith("fetch-citations.ts")) main().catch((e) => { console.error(e); process.exit(1); });
