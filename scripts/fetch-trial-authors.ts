/**
 * Pair 5 of docs/proposals/cross-links-census-2026-11.md: a person and the trials they wrote up.
 *
 * For every paper record that REPORTS a trial record (the two are linked, and the trial's id, name or an alias
 * appears as whole tokens in the paper's id or name: `trialReports` in src/data/person-trial-authorship.ts), fetch
 * the paper's author list from Europe PMC and keep, per author, the name, the ORCID where Europe PMC holds one, and
 * the affiliation strings. Then run the pure matcher over the corpus and the author lists and write its result.
 *
 *   npx tsx scripts/fetch-trial-authors.ts                 fetch what is not cached yet, then derive the links
 *   npx tsx scripts/fetch-trial-authors.ts --max=50        fetch at most 50 papers this run
 *   npx tsx scripts/fetch-trial-authors.ts --only=paper-a,paper-b
 *   npx tsx scripts/fetch-trial-authors.ts --force         fetch again what is cached (and retry what was missing)
 *   npx tsx scripts/fetch-trial-authors.ts --retry-missing fetch again only what was recorded as missing
 *   npx tsx scripts/fetch-trial-authors.ts --derive-only   no network: recompute the links from the cache
 *
 * Files written:
 *   src/data/trial-paper-authors.json             the cache, keyed by paper record id, one paper a line:
 *       { doi?, pmid?, fetchedAt, source, authors: [{ lastName, firstName, initials, orcid?, affiliations }] }
 *       A group author is kept as { collectiveName }. A paper Europe PMC did not return is kept as
 *       { doi?, pmid?, fetchedAt, source, missing: true }, never dropped, so a re-run does not ask again and the
 *       gap can be counted. No abstracts, titles or citation counts are stored: nothing the matcher does not read.
 *   src/data/person-trial-links.generated.json    { generatedAt, links, ambiguousCount, ambiguous }, the output of
 *       `personTrialAuthorship`. src/data/person-trial-authorship.test.ts recomputes it and fails if it differs.
 *
 * Rules (no invented facts):
 *   - a paper is asked for by the identifier its own record holds: the PubMed id (EXT_ID:<pmid> AND SRC:MED) when it
 *     has one, otherwise the DOI (DOI:"<doi>"). When a PubMed id returns nothing the DOI is tried;
 *   - a returned record is used only when its PubMed id or DOI EQUALS the one asked for. Where the paper record holds
 *     both and Europe PMC's record carries a different DOI, the record is not used and the paper is written as
 *     missing with `conflict` naming the DOI Europe PMC holds: one of the two identifiers on our record is wrong,
 *     and an author list must not be attached to a paper we cannot identify;
 *   - a paper record with neither identifier is recorded as missing without a request;
 *   - nothing is linked here. The matcher links a person only on a name AND an ORCID or an affiliation.
 *
 * Europe PMC is budget-free. Requests go out one at a time, at least 300 ms apart, with a generic User-Agent; 429
 * and 5xx responses back off and retry up to five times. The cache file is rewritten every 25 papers, so a run that
 * is interrupted resumes where it stopped. Raw responses are also kept outside the repository, under
 * $EPMC_RAW_DIR (default /tmp/europepmc-cache/trial-authors), for reading a link's evidence by eye.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Entity } from "../src/lib/schema";
import { personTrialAuthorship, trialReports, type CachedAuthor, type CachedPaperAuthors, type TrialPaperAuthorCache } from "../src/data/person-trial-authorship";

const CACHE_FILE = join(process.cwd(), "src", "data", "trial-paper-authors.json");
const LINKS_FILE = join(process.cwd(), "src", "data", "person-trial-links.generated.json");
const RAW_DIR = process.env.EPMC_RAW_DIR ?? "/tmp/europepmc-cache/trial-authors";
const EPMC_SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const UA = "trial-author-lists/1.0 (static site build; one request at a time)";
const MIN_INTERVAL_MS = 300;

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const RETRY_MISSING = args.includes("--retry-missing");
const DERIVE_ONLY = args.includes("--derive-only");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);
const normDoi = (d: string | undefined) => d?.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase();

// ---------------------------------------------------------------------------------------------------------------------
// Europe PMC
// ---------------------------------------------------------------------------------------------------------------------
type EpmcAuthor = {
  fullName?: string; firstName?: string; lastName?: string; initials?: string; collectiveName?: string;
  authorId?: { type?: string; value?: string };
  affiliation?: string;
  authorAffiliationDetailsList?: { authorAffiliation?: Array<{ affiliation?: string }> };
};
type EpmcResult = { id?: string; source?: string; pmid?: string; doi?: string; authorList?: { author?: EpmcAuthor[] } };
type EpmcResponse = { hitCount?: number; resultList?: { result?: EpmcResult[] } };

let lastRequest = 0;
let requests = 0;
async function epmc(query: string): Promise<{ url: string; body: EpmcResponse | null }> {
  const url = `${EPMC_SEARCH}?${new URLSearchParams({ query, resultType: "core", format: "json", pageSize: "5" }).toString()}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    const wait = lastRequest + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    requests++;
    let r: Response;
    try { r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30_000) }); }
    catch { await sleep(1500 * 2 ** attempt); continue; }
    if (r.status === 429 || r.status >= 500) { await sleep(Math.max(1500 * 2 ** attempt, Number(r.headers.get("retry-after") ?? 0) * 1000)); continue; }
    if (!r.ok) return { url, body: null };
    let j: EpmcResponse;
    try { j = (await r.json()) as EpmcResponse; } catch { await sleep(1500 * 2 ** attempt); continue; }
    if (typeof j?.hitCount !== "number") { await sleep(1500 * 2 ** attempt); continue; } // a bare {"version":...} body means the query was not run
    mkdirSync(RAW_DIR, { recursive: true });
    writeFileSync(join(RAW_DIR, `${createHash("sha1").update(url).digest("hex")}.json`), JSON.stringify(j));
    return { url, body: j };
  }
  return { url, body: null };
}

const clean = (s: string | undefined) => s?.replace(/\s+/g, " ").trim() || undefined;

function authorsOf(r: EpmcResult): CachedAuthor[] {
  const out: CachedAuthor[] = [];
  for (const a of r.authorList?.author ?? []) {
    if (a.collectiveName && !a.lastName) { out.push({ collectiveName: clean(a.collectiveName) }); continue; }
    if (!a.lastName) continue;
    const affs = [...(a.authorAffiliationDetailsList?.authorAffiliation ?? []).map((x) => clean(x.affiliation)), clean(a.affiliation)].filter((x): x is string => !!x);
    const orcid = a.authorId?.type?.toUpperCase() === "ORCID" ? clean(a.authorId.value) : undefined;
    out.push({
      lastName: clean(a.lastName),
      ...(clean(a.firstName) ? { firstName: clean(a.firstName) } : {}),
      ...(clean(a.initials) ? { initials: clean(a.initials) } : {}),
      ...(orcid ? { orcid } : {}),
      affiliations: [...new Set(affs)],
    });
  }
  return out;
}

/** Whether a fetch failed outright (no answer after the retries), as opposed to Europe PMC answering with no such record. */
class NoAnswer extends Error {}

async function fetchPaper(paper: { doi?: string; pmid?: string }): Promise<CachedPaperAuthors> {
  const doi = normDoi(paper.doi);
  const pmid = paper.pmid?.trim();
  const base = { ...(paper.doi ? { doi: paper.doi } : {}), ...(pmid ? { pmid } : {}), fetchedAt: today() };
  if (!doi && !pmid) return { ...base, source: "no DOI or PubMed id on the paper record", missing: true };

  let lastUrl = "";
  if (pmid) {
    const { url, body } = await epmc(`EXT_ID:${pmid} AND SRC:MED`);
    lastUrl = url;
    if (!body) throw new NoAnswer(url);
    const hit = (body.resultList?.result ?? []).find((r) => r.source === "MED" && r.pmid === pmid);
    if (hit) {
      const theirs = normDoi(hit.doi);
      if (doi && theirs && theirs !== doi) return { ...base, source: url, missing: true, conflict: `Europe PMC holds DOI ${hit.doi} for PubMed id ${pmid}` };
      return { ...base, source: url, authors: authorsOf(hit) };
    }
  }
  if (doi) {
    const { url, body } = await epmc(`DOI:"${doi}"`);
    lastUrl = url;
    if (!body) throw new NoAnswer(url);
    const hits = (body.resultList?.result ?? []).filter((r) => normDoi(r.doi) === doi);
    const hit = hits.find((r) => r.source === "MED") ?? hits[0];
    if (hit) {
      if (pmid && hit.pmid && hit.pmid !== pmid) return { ...base, source: url, missing: true, conflict: `Europe PMC holds PubMed id ${hit.pmid} for DOI ${hit.doi}` };
      return { ...base, source: url, authors: authorsOf(hit) };
    }
  }
  return { ...base, source: lastUrl, missing: true };
}

// ---------------------------------------------------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------------------------------------------------
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** One paper a line, sorted by paper id: a refresh of one paper is a one-line diff. */
function writeCache(cache: TrialPaperAuthorCache): void {
  const ids = Object.keys(cache).sort(cmp);
  writeFileSync(CACHE_FILE, `{\n${ids.map((id) => `${JSON.stringify(id)}: ${JSON.stringify(cache[id])}`).join(",\n")}\n}\n`);
}

function writeLinks(cache: TrialPaperAuthorCache, all: Entity[]): void {
  const of = <K extends Entity["kind"]>(k: K) => all.filter((e): e is Extract<Entity, { kind: K }> => e.kind === k);
  const people = of("person");
  // A person's `institutionId` can name a cooperative group, which is a company record: any record they name counts.
  const named = new Set(people.flatMap((p) => [p.institutionId, ...p.institutions].filter((x): x is string => !!x)));
  const result = personTrialAuthorship({ people, trials: of("trial"), papers: of("paper"), institutions: all.filter((e) => named.has(e.id)), cache });
  const personIds = Object.keys(result.links);
  const lines = [
    `"generatedAt": ${JSON.stringify(today())}`,
    `"links": {\n${personIds.map((id) => `${JSON.stringify(id)}: ${JSON.stringify(result.links[id])}`).join(",\n")}\n}`,
    `"ambiguousCount": ${result.ambiguousCount}`,
    `"ambiguous": [\n${result.ambiguous.map((a) => JSON.stringify(a)).join(",\n")}\n]`,
  ];
  writeFileSync(LINKS_FILE, `{\n${lines.join(",\n")}\n}\n`);
  const pairs = new Set(personIds.flatMap((id) => result.links[id].map((l) => `${id}|${l.trialId}`)));
  console.log(`links: ${pairs.size} person-trial pairs for ${personIds.length} people; ambiguous rows left unlinked: ${result.ambiguousCount}`);
}

// ---------------------------------------------------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------------------------------------------------
async function main(): Promise<void> {
  const all = graph().entities as Entity[];
  const trials = all.filter((e) => e.kind === "trial");
  const papers = all.filter((e) => e.kind === "paper");
  const paperById = new Map(papers.map((p) => [p.id, p]));
  const cache: TrialPaperAuthorCache = existsSync(CACHE_FILE) ? (JSON.parse(readFileSync(CACHE_FILE, "utf8")) as TrialPaperAuthorCache) : {};

  const wanted = [...new Set(trialReports(trials, papers).map((r) => r.paperId))].sort(cmp);
  console.log(`${wanted.length} papers report a trial; ${wanted.filter((id) => cache[id]).length} already cached`);

  if (!DERIVE_ONLY) {
    const todo = wanted
      .filter((id) => !ONLY || ONLY.includes(id))
      .filter((id) => FORCE || !cache[id] || (RETRY_MISSING && cache[id].missing))
      .slice(0, MAX);
    let done = 0, failed = 0;
    for (const id of todo) {
      const p = paperById.get(id)!;
      try {
        cache[id] = await fetchPaper(p);
      } catch (e) {
        if (!(e instanceof NoAnswer)) throw e;
        failed++; // no answer after five tries: not cached, so the next run asks again
        console.warn(`no answer: ${id}`);
      }
      if (++done % 25 === 0) { writeCache(cache); console.log(`${done}/${todo.length} (${requests} requests)`); }
    }
    writeCache(cache);
    const kept = wanted.filter((id) => cache[id]);
    console.log(`fetched ${todo.length - failed} this run in ${requests} requests, ${failed} without an answer; cache holds ${kept.length} of ${wanted.length}: ${kept.filter((id) => !cache[id].missing).length} with authors, ${kept.filter((id) => cache[id].missing).length} missing`);
  }
  writeLinks(cache, all);
}

main().catch((e) => { console.error(e); process.exit(1); });
