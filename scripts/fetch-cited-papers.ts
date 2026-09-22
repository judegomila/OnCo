/**
 * Wave 7 of docs/CONTENT-ROADMAP.md: paper pages for the DOIs that records cite without a paper record behind them.
 *
 * Records of every kind cite papers as external links to doi.org. Where no paper record in the corpus carries that DOI,
 * the citation is a dead end inside OnCo: nothing to hover, nothing to search, no page. This script asks Europe PMC for
 * the record behind each such DOI (query DOI:"..."), writes one paper record per DOI to src/data/papers-cited-wave7.ts
 * with title, journal, year, DOI, PMID and authors read verbatim from the Europe PMC record and the abstract reproduced
 * as the summary, and turns the citing record's bare DOI reference into a `keyPapers` link through the side map
 * src/data/cited-paper-links-wave7.ts (merged by src/data/index.ts). Where the corpus already holds a paper with the
 * same DOI or PMID that record is linked instead.
 *
 *   npx tsx scripts/fetch-cited-papers.ts                    dry run: report what would be written
 *   npx tsx scripts/fetch-cited-papers.ts --max=200 --apply  write the next 200 papers
 *   npx tsx scripts/fetch-cited-papers.ts --only=10.1056/nejmoa1234567 --debug
 *
 * Order: DOIs cited by the most records first, then by the GLOBOCAN 2022 burden of the citing records' cancer family
 * (the roadmap's ordering), then by DOI.
 *
 * Rules (no invented facts):
 *   - the Europe PMC record must carry the cited DOI itself (normalised: lower case, no doi.org prefix); a query that
 *     returns nothing, or only records with another DOI, puts the DOI in CITED_PAPER_SKIP with the citing records;
 *   - PubMed (MED) records are preferred, then PMC-only records, then preprints (PPR); other Europe PMC sources (patents,
 *     theses, agricultural and bookshelf entries) are skipped as not being journal articles;
 *   - a preprint that Europe PMC links to a journal version ("Preprint of" a MED record) is written as the journal
 *     version, with the preprint DOI kept in the record's links so the citation still resolves;
 *   - the new record links only the citing records (trials through `trials`, everything else through `related`) and the
 *     journal; it never copies the citing record's drugs, cancers or targets (Ask OnCo benchmark lesson from wave 1);
 *   - findings stay empty and every piece of written copy says how the record was matched.
 *
 * Requests go to Europe PMC only, one at a time, at least 250 ms apart, with a User-Agent naming OnCo; raw responses are
 * cached under /tmp/europepmc-cache (scripts/wave6-shared.ts). Each new MED record's citation count is written to
 * public/citations/index.json from the same response.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META } from "../src/lib/kinds";
import type { Cancer, Entity, Journal, Paper, PaperInput } from "../src/lib/schema";
import { GLOBOCAN_MAP } from "../src/data/globocan-map";
import { papersCitedWave7 } from "../src/data/papers-cited-wave7";
import { citedPaperLinksWave7, CITED_PAPER_SKIP } from "../src/data/cited-paper-links-wave7";
import { today } from "./feed-utils";
import {
  abstractParagraphs, authorsOf, clean, epmcSearch, houseDashes, journalIndex, journalName, normDoi, paperTypeOf, recordCitations,
  recordLines, requestCount, slug, writePapersFile, type EpmcResult,
} from "./wave6-shared";

const PAPERS_FILE = join(process.cwd(), "src", "data", "papers-cited-wave7.ts");
const LINKS_FILE = join(process.cwd(), "src", "data", "cited-paper-links-wave7.ts");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const FORCE = args.includes("--force");
const DEBUG = args.includes("--debug");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").map((d) => normDoi(d)!).filter(Boolean);

/** The core result with the fields a DOI lookup needs beyond the shared type: PMC id, preprint publisher and version links. */
type CitedResult = EpmcResult & {
  pmcid?: string; firstPublicationDate?: string;
  bookOrReportDetails?: { publisher?: string; yearOfPublication?: number };
  commentCorrectionList?: { commentCorrection?: Array<{ id?: string; source?: string; type?: string; reference?: string }> };
};

// ---------------------------------------------------------------------------------------------------------------------
// Corpus: the cited DOIs without a paper record, who cites them, and the burden of the family they sit in
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const cancers = g.kind("cancer") as Cancer[];
const rootOf = (c: Cancer): Cancer => { let cur = c; const seen = new Set<string>(); while (cur.parent && !seen.has(cur.id)) { seen.add(cur.id); const p = g.get(cur.parent) as Cancer | undefined; if (!p) break; cur = p; } return cur; };
const globocan = JSON.parse(readFileSync(join(process.cwd(), "public", "globocan", "countries.json"), "utf8")) as { countries: Record<string, { data: Record<string, number[]> }> };
const worldCases = new Map<number, number>();
for (const [code, cell] of Object.entries(globocan.countries.WORLD.data)) worldCases.set(Number(code), cell[0] ?? 0);
/** New cases worldwide for a root cancer's family: the root's own GLOBOCAN mapping, or the union of its subtypes' site codes (as scripts/content-gaps.ts counts). */
const familyCases = new Map<string, number>();
const casesForRoot = (root: Cancer): number => {
  const hit = familyCases.get(root.id);
  if (hit !== undefined) return hit;
  const family = [root.id, ...cancers.filter((x) => x.id !== root.id && rootOf(x).id === root.id).map((x) => x.id)];
  const own = GLOBOCAN_MAP[root.id];
  const maps = own?.codes.length ? [own] : family.map((id) => GLOBOCAN_MAP[id]).filter((m) => m?.codes.length);
  const cases = maps.length ? [...new Set(maps.flatMap((m) => m.codes))].reduce((s, code) => s + (worldCases.get(code) ?? 0), 0) : 0;
  familyCases.set(root.id, cases);
  return cases;
};
const burdenOf = (e: Entity): number => {
  const ids = e.kind === "cancer" ? [e.id, ...e.cancers] : e.cancers;
  return Math.max(0, ...ids.map((id) => g.get(id) as Cancer | undefined).filter((c): c is Cancer => !!c && c.kind === "cancer").map((c) => casesForRoot(rootOf(c))));
};

const papersByDoi = new Map<string, Paper>();
const papersByPmid = new Map<string, Paper>();
for (const p of g.kind("paper") as Paper[]) {
  const d = normDoi(p.doi); if (d) papersByDoi.set(d, p);
  if (p.pmid) papersByPmid.set(p.pmid, p);
  for (const l of p.links) { const m = l.url.match(/doi\.org\/(10\.[^\s?#]+)/i); if (m) papersByDoi.set(m[1].toLowerCase().replace(/\/$/, ""), p); }
}
const journalByName = journalIndex(g.kind("journal") as Journal[]);
const usedIds = new Set<string>(g.entities.map((e) => e.id));

/** Citing records in the order the prose should name them: the page kinds a reader recognises first, ideas last. */
const CITING_ORDER = ["cancer", "trial", "drug", "technology", "target", "pathway", "term", "bottleneck", "institution", "company", "person", "roadmap", "collection", "pairing", "idea"];
const citingRank = (e: Entity) => { const i = CITING_ORDER.indexOf(e.kind); return i < 0 ? CITING_ORDER.length : i; };
type Cited = { doi: string; citing: Entity[]; burden: number };
const citedMap = new Map<string, Entity[]>();
for (const e of g.entities) {
  if (e.kind === "paper") continue;
  for (const l of e.links) {
    const m = l.url.match(/doi\.org\/(10\.[^\s?#]+)/i);
    if (!m) continue;
    const doi = m[1].toLowerCase().replace(/\/$/, "");
    if (papersByDoi.has(doi) || doi in CITED_PAPER_SKIP) continue;
    const list = citedMap.get(doi) ?? [];
    if (!list.some((x) => x.id === e.id)) list.push(e);
    citedMap.set(doi, list);
  }
}
let queue: Cited[] = [...citedMap.entries()].map(([doi, citing]) => ({ doi, citing: [...citing].sort((a, b) => citingRank(a) - citingRank(b) || a.name.localeCompare(b.name)), burden: Math.max(0, ...citing.map(burdenOf)) }));
if (ONLY) queue = queue.filter((c) => ONLY.includes(c.doi));
queue.sort((a, b) => b.citing.length - a.citing.length || b.burden - a.burden || a.doi.localeCompare(b.doi));
queue = queue.slice(0, MAX);
console.log(`${citedMap.size} cited DOIs without a paper record; ${queue.length} to look up now; ${papersCitedWave7.length} papers already written by this wave, ${Object.keys(CITED_PAPER_SKIP).length} DOIs skipped`);

// ---------------------------------------------------------------------------------------------------------------------
// Europe PMC by DOI
// ---------------------------------------------------------------------------------------------------------------------
const SOURCE_RANK: Record<string, number> = { MED: 0, PMC: 1, PPR: 2 };
const sameDoi = (r: CitedResult, doi: string) => normDoi(r.doi)?.replace(/\/$/, "") === doi;

/** The record carrying the DOI: PubMed first, then PMC, then a preprint; other sources are reported so the DOI can be skipped with a reason. */
async function lookup(doi: string): Promise<{ r?: CitedResult; hits: number; otherSources: string[]; failed?: boolean }> {
  const res = await epmcSearch(`DOI:"${doi}"`, { pageSize: 10, force: FORCE });
  if (!res) return { hits: 0, otherSources: [], failed: true };
  const all = ((res.resultList?.result ?? []) as CitedResult[]).filter((r) => sameDoi(r, doi) && r.title);
  if (DEBUG) console.log(`  ${doi}: ${res.hitCount} hits; ${all.map((r) => `${r.source}:${r.pmid ?? r.id}${r.doi === doi ? "" : ` (${r.doi})`}`).join(", ") || "none with this DOI"}`);
  const usable = all.filter((r) => r.source in SOURCE_RANK).sort((a, b) => SOURCE_RANK[a.source] - SOURCE_RANK[b.source] || (b.citedByCount ?? 0) - (a.citedByCount ?? 0));
  return { r: usable[0], hits: res.hitCount ?? 0, otherSources: [...new Set(all.filter((r) => !(r.source in SOURCE_RANK)).map((r) => r.source))] };
}

/** The journal version Europe PMC links from a preprint, when it has one. */
async function journalVersionOf(ppr: CitedResult): Promise<CitedResult | undefined> {
  const link = (ppr.commentCorrectionList?.commentCorrection ?? []).find((c) => c.source === "MED" && c.id && /preprint/i.test(c.type ?? ""));
  if (!link) return undefined;
  const res = await epmcSearch(`EXT_ID:${link.id} AND SRC:MED`, { pageSize: 3, force: FORCE });
  const r = ((res?.resultList?.result ?? []) as CitedResult[]).find((x) => x.source === "MED" && x.pmid === link.id && x.title);
  if (DEBUG) console.log(`  preprint ${ppr.id} -> journal version ${link.id}: ${r ? "found" : "not returned"}`);
  return r;
}

// ---------------------------------------------------------------------------------------------------------------------
// Record writer: copy that claims nothing the Europe PMC record does not say
// ---------------------------------------------------------------------------------------------------------------------
const asOf = today();
const uniqueId = (base: string) => { let id = base; let n = 2; while (usedIds.has(id)) id = `${base}-${n++}`; usedIds.add(id); return id; };
const firstSurname = (s?: string) => slug((s ?? "").split(/,\s*/)[0]?.replace(/\s+[A-Z][A-Za-z-]*\.?$/, "") ?? "") || "authors";
const kindLabel = (e: Entity) => KIND_META[e.kind]?.label.toLowerCase() ?? e.kind;
const COUNT_WORDS = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const countWord = (n: number) => COUNT_WORDS[n] ?? String(n);
/** The citing pages by kind and count only ("two idea pages and one bottleneck page"); names stay out of fetched papers' prose. */
const citingKinds = (es: Entity[]) => {
  const counts = new Map<string, number>();
  for (const e of es) counts.set(kindLabel(e), (counts.get(kindLabel(e)) ?? 0) + 1);
  const parts = [...counts.entries()].map(([label, n]) => `${countWord(n)} ${label} page${n > 1 ? "s" : ""}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
};
const recordName = (r: CitedResult) => (r.source === "PPR" ? `Europe PMC preprint record ${r.id}` : r.pmid ? `PubMed record ${r.pmid}` : `Europe PMC record ${r.pmcid ?? r.id}`);

function buildPaper(c: Cited, r: CitedResult, viaPreprint?: CitedResult): PaperInput {
  const preprint = r.source === "PPR";
  const publisher = r.bookOrReportDetails?.publisher;
  const named = journalName(r, journalByName);
  const journal = preprint ? `${publisher ?? "Preprint server"} (preprint)` : named.journal;
  const abbrev = preprint ? (publisher ?? "preprint") : named.abbrev;
  const journalId = preprint ? undefined : named.id;
  const year = Number(r.pubYear ?? r.bookOrReportDetails?.yearOfPublication ?? r.firstPublicationDate?.slice(0, 4) ?? 0);
  const title = clean(r.title!).replace(/\.$/, "");
  const abstract = r.abstractText ? abstractParagraphs(r.abstractText) : "";
  const doi = r.doi!;
  // The prose names the citing pages by kind and count only, never by name: echoing a drug's or cancer's name in a fetched
  // paper's TL;DR and summary pulls the paper into that page's search results and pushed the Ask OnCo benchmark below its
  // floor (tazemetostat, first batch). The citing pages themselves are linked below and listed on the page as Related.
  const citingPhrase = citingKinds(c.citing);
  const plural = c.citing.length > 1;
  // No year in the TL;DR or the id: the page shows `year`, and a bare year token fuzzy-matches neighbouring years in the
  // site search ("2026" finds "2020"), which is what pulled a 2020 paper into a "what happened in 2026" answer.
  const tldr = houseDashes(`${preprint ? "Preprint" : "Paper"} cited by ${citingPhrase}, indexed on Europe PMC as ${recordName(r)} and published in ${journal}; the citing page${plural ? "s link" : " links"} this DOI, which is how the record was matched.`);
  const provenance = `Indexed on Europe PMC as ${recordName(r)} (DOI ${doi})${viaPreprint ? `, the journal version Europe PMC links from the preprint ${viaPreprint.doi ? `DOI ${viaPreprint.doi}` : viaPreprint.id} that the citing record links` : ""}. Matched by DOI alone: ${citingPhrase} cite${plural ? "" : "s"} this DOI among ${plural ? "their" : "its"} external links (the pages are listed under Related), and this page was written so that the citation resolves inside OnCo. No figure has been checked by an editor.`;
  const summary = houseDashes((abstract ? `${abstract}\n\n` : `Europe PMC indexes no abstract for this record; the title is the only text available.\n\n`) + provenance);
  const whatItMeans = houseDashes(`${citingPhrase[0].toUpperCase()}${citingPhrase.slice(1)} on OnCo cite${plural ? "" : "s"} this ${preprint ? "preprint" : "paper"} by its DOI; this record gives the citation a page of its own so a reader can follow it without leaving OnCo. Read the abstract above alongside the citing page${plural ? "s" : ""} listed under Related; the record was created automatically from the Europe PMC entry and its figures have not been checked by hand.`);
  const pubTypes = r.pubTypeList?.pubType ?? [];
  const caveats = [
    "Matched to the citing OnCo records by DOI alone; the summary reproduces the Europe PMC abstract and no figure has been verified against the full paper.",
    ...(preprint ? ["This is a preprint: it has not been peer reviewed, and Europe PMC links no journal version of it at the time of writing."] : []),
    ...(viaPreprint ? [`The citing record links the preprint (${viaPreprint.doi ?? viaPreprint.id}); this record is the journal version Europe PMC links from it, so figures may differ from the preprint.`] : []),
    ...(pubTypes.includes("Retracted Publication") ? ["PubMed marks this record as a retracted publication."] : []),
    ...(pubTypes.includes("Published Erratum") ? ["PubMed types this record as an erratum, not an article."] : []),
  ];
  const epmcUrl = r.source === "PPR" ? `https://europepmc.org/article/PPR/${r.id}` : r.pmid ? `https://europepmc.org/article/MED/${r.pmid}` : `https://europepmc.org/article/PMC/${r.pmcid ?? r.id}`;
  const links = [
    { label: houseDashes(`${abbrev} ${year}`), url: `https://doi.org/${doi}` },
    ...(r.pmid ? [{ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` }] : []),
    { label: "Europe PMC", url: epmcUrl },
    ...(viaPreprint?.doi ? [{ label: `Preprint (${viaPreprint.bookOrReportDetails?.publisher ?? "preprint server"})`, url: `https://doi.org/${viaPreprint.doi}` }] : []),
  ];
  const base = `paper-${firstSurname(r.authorString)}-${slug(abbrev).slice(0, 40) || "journal"}`;
  const id = usedIds.has(base) ? uniqueId(`${base}-${year}`) : uniqueId(base);
  const trials = c.citing.filter((e) => e.kind === "trial").map((e) => e.id);
  const related = c.citing.filter((e) => e.kind !== "trial").map((e) => e.id);
  return {
    kind: "paper", asOf, id, name: title, tldr, summary, journal, year, doi, ...(r.pmid ? { pmid: r.pmid } : {}), authors: authorsOf(r.authorString),
    paperType: paperTypeOf(pubTypes, title, abstract), findings: [], whatItMeans, caveats, links, tags: ["europepmc-ingest", ...(preprint ? ["preprint"] : [])],
    // Only the citing records and the journal (Ask OnCo benchmark lesson, wave 1): the citing pages already carry the
    // drugs, cancers and targets, and copying them onto fetched records dilutes those pages' search vectors.
    ...(trials.length ? { trials } : {}), ...(related.length ? { related } : {}), ...(journalId ? { journals: [journalId] } : {}),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------------------------------------------------
async function main(): Promise<void> {
  const newPapers: PaperInput[] = [];
  const newLinks: Record<string, Set<string>> = {};
  const newSkips: Record<string, string> = {};
  const citationRows: Array<{ paperId: string; r: EpmcResult }> = [];
  const tally = { written: 0, existing: 0, references: 0, unknown: 0, otherSource: 0, preprints: 0, viaPreprint: 0, failed: 0 };
  const addLinks = (c: Cited, paperId: string) => { for (const e of c.citing) { (newLinks[e.id] ??= new Set(citedPaperLinksWave7[e.id] ?? [])).add(paperId); tally.references++; } };
  const citers = (c: Cited) => c.citing.map((e) => e.id).join(", ");

  for (const c of queue) {
    const { r, hits, otherSources, failed } = await lookup(c.doi);
    if (failed) { tally.failed++; console.log(`${c.doi.padEnd(45)} request failed`); continue; }
    if (!r) {
      if (otherSources.length) { tally.otherSource++; newSkips[c.doi] = `Europe PMC holds this DOI only as ${otherSources.join(", ")} (not a journal article or preprint); cited by ${citers(c)}`; console.log(`${c.doi.padEnd(45)} skipped: source ${otherSources.join(", ")}`); }
      else { tally.unknown++; newSkips[c.doi] = `Europe PMC returns no record for this DOI (${hits} hits, none carrying it); cited by ${citers(c)}`; console.log(`${c.doi.padEnd(45)} unknown to Europe PMC  [${citers(c)}]`); }
      continue;
    }
    let record: CitedResult = r;
    let viaPreprint: CitedResult | undefined;
    if (r.source === "PPR") {
      const jv = await journalVersionOf(r);
      if (jv) { viaPreprint = r; record = jv; tally.viaPreprint++; } else tally.preprints++;
    }
    // The corpus may already hold the paper under another form of the DOI or by PMID (or the preprint's journal version).
    const existing = (normDoi(record.doi) && papersByDoi.get(normDoi(record.doi)!)) || (record.pmid && papersByPmid.get(record.pmid));
    if (existing) { tally.existing++; addLinks(c, existing.id); console.log(`${c.doi.padEnd(45)} existing ${existing.id}  [${citers(c)}]`); continue; }
    const paper = buildPaper(c, record, viaPreprint);
    newPapers.push(paper);
    papersByDoi.set(normDoi(paper.doi)!, paper as unknown as Paper);
    if (viaPreprint?.doi) papersByDoi.set(normDoi(viaPreprint.doi)!, paper as unknown as Paper);
    if (paper.pmid) papersByPmid.set(paper.pmid, paper as unknown as Paper);
    citationRows.push({ paperId: paper.id, r: record });
    addLinks(c, paper.id);
    tally.written++;
    console.log(`${c.doi.padEnd(45)} ${record.source} ${record.pmid ?? record.id} ${paper.year} cited ${record.citedByCount ?? "?"}  ${paper.id}  [${citers(c)}]${viaPreprint ? "  (journal version of the cited preprint)" : ""}`);
  }

  console.log(`\n${queue.length} DOIs looked up, ${requestCount()} requests made (the rest from cache).`);
  console.log(`written ${tally.written} (${tally.preprints} preprints without a journal version, ${tally.viaPreprint} journal versions of cited preprints); existing records linked ${tally.existing}; references linked ${tally.references}; unknown to Europe PMC ${tally.unknown}; other sources ${tally.otherSource}; failed ${tally.failed}`);
  if (!APPLY) { console.log("\nDry run: pass --apply to write src/data/papers-cited-wave7.ts and src/data/cited-paper-links-wave7.ts"); return; }

  const allPapers = [...papersCitedWave7, ...newPapers];
  writePapersFile(PAPERS_FILE, "papersCitedWave7", asOf, `/**
 * Wave 7 of docs/CONTENT-ROADMAP.md: paper pages for the DOIs that records cite in their external links without a
 * paper record behind them. Written by scripts/fetch-cited-papers.ts, which asks Europe PMC for the record carrying
 * each cited DOI (query DOI:"...") and writes one paper per DOI. Title, journal, year, DOI, PMID and authors are read
 * from the Europe PMC record; the summary reproduces the record's abstract with markup removed and house-style
 * dashes; the TL;DR, "what it means" and caveats say only how the record was matched (by the DOI the citing record
 * links). Nothing here has been read by an editor: findings are left empty on purpose. Each record links the citing
 * records (trials through \`trials\`, everything else through \`related\`) and the journal, never the citing record's
 * drugs or cancers. Citing records gain these papers in \`keyPapers\` through src/data/cited-paper-links-wave7.ts.
 * Do not edit by hand; re-run the script.
 */`, allPapers);
  const allLinks: Record<string, string[]> = { ...citedPaperLinksWave7 };
  for (const [id, set] of Object.entries(newLinks)) allLinks[id] = [...set];
  const allSkips = { ...CITED_PAPER_SKIP, ...newSkips };
  writeFileSync(LINKS_FILE, `/**
 * Citing record to paper links written by scripts/fetch-cited-papers.ts (wave 7 of docs/CONTENT-ROADMAP.md). Each
 * entry names the paper records, in src/data/papers-cited-wave7.ts or elsewhere in the corpus, that a record cites by
 * DOI in its external links; src/data/index.ts merges them into the record's \`keyPapers\`, so the bare DOI reference
 * also resolves to a page inside OnCo. CITED_PAPER_SKIP lists the cited DOIs the script will not retry, keyed by DOI,
 * with the reason and the citing records: Europe PMC has no record for the DOI (book chapters, publisher pages,
 * DOIs that resolve elsewhere), or the record is not a journal article or preprint. Clear an entry to try again.
 * Do not edit by hand; re-run the script.
 */
export const citedPaperLinksWave7: Record<string, string[]> = {
${recordLines(allLinks)}
};

export const CITED_PAPER_SKIP: Record<string, string> = {
${recordLines(allSkips)}
};
`);
  const counted = recordCitations(citationRows, asOf);
  console.log(`\nWrote ${allPapers.length} paper records, ${Object.keys(allLinks).length} citing records linked (${Object.keys(allSkips).length} DOIs skipped); ${counted} citation counts added to public/citations/index.json.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
