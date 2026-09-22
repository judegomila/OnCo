/**
 * Wave 1 of docs/CONTENT-ROADMAP.md: the evidence behind every trial.
 *
 * For each trial in a cancer family that has no key paper and carries an NCT id, ask Europe PMC for PubMed records
 * whose title or abstract cites that registry id, choose at most one primary publication and one later
 * (long-term or updated) report, and link them from the trial. Where the corpus already holds a paper with the
 * same DOI or PMID the existing record is linked; otherwise a new record is written to
 * src/data/papers-trials-wave1.ts with the title, journal, year, DOI, PMID and authors read verbatim from the
 * Europe PMC record and the abstract reproduced as the summary. The link itself is written to
 * src/data/trial-key-papers-wave1.ts, which src/data/index.ts merges into the trial's `keyPapers`.
 *
 *   npx tsx scripts/fetch-trial-papers.ts --family=lung                 dry run: report what would be linked
 *   npx tsx scripts/fetch-trial-papers.ts --family=lung --max=200 --apply   write the data files
 *   npx tsx scripts/fetch-trial-papers.ts --family=lung,breast --status=results   trials with a result status only
 *
 * Rules (no invented facts):
 *   - a paper is a candidate only when the Europe PMC record's own title or abstract contains the trial's NCT id;
 *   - a paper that cites several NCT ids is never linked unless the trial's acronym is in its title;
 *   - letters, comments, editorials, errata, reviews, case reports, meta-analyses, protocols, design papers,
 *     cost-effectiveness, pharmacokinetic, quality-of-life and plain-language pieces are not primary publications;
 *   - the primary publication is the most cited eligible paper; the follow-up is a later paper whose title says
 *     it is an update (long-term, updated, final, overall survival, five-year and the like);
 *   - a trial is written to SKIP (with the reason) when the match is ambiguous, and SKIP entries are not retried.
 *
 * Europe PMC is budget-free. Requests are made one at a time, at least 200 ms apart, with a User-Agent naming
 * OnCo, and every raw response is cached under /tmp/europepmc-cache so re-runs cost nothing.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Cancer, Journal, Paper, PaperInput, Trial } from "../src/lib/schema";
import { trialAcronyms } from "../src/lib/roadmap-watch";
import { papersTrialsWave1 } from "../src/data/papers-trials-wave1";
import { trialKeyPapersWave1, TRIAL_PAPER_SKIP } from "../src/data/trial-key-papers-wave1";
import { decodeEntities, sleep, today } from "./feed-utils";

const EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const CACHE_DIR = "/tmp/europepmc-cache";
const UA = "OnCo/1.0 (https://onco.cc; trial key papers; onco@judegomila.com)";
const MIN_INTERVAL_MS = 200;
const PAGE_SIZE = 50;
const PAPERS_FILE = join(process.cwd(), "src", "data", "papers-trials-wave1.ts");
const LINKS_FILE = join(process.cwd(), "src", "data", "trial-key-papers-wave1.ts");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const FORCE = args.includes("--force");
const DEBUG = args.includes("--debug");
const FAMILIES = (args.find((a) => a.startsWith("--family="))?.slice(9) ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const STATUS_FILTER = args.find((a) => a.startsWith("--status="))?.slice(9);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);
if (!FAMILIES.length && !ONLY) { console.error("usage: --family=lung[,breast] [--max=N] [--status=results|active|recruiting] [--apply] [--force]"); process.exit(2); }

/** Root cancer ids for the family names used on the roadmap; anything else is taken as a root cancer id. */
const FAMILY_ROOTS: Record<string, string> = { lung: "lung-cancer", breast: "breast-cancer", skin: "skin-cancer", colorectal: "colorectal", prostate: "prostate" };

type EpmcResult = {
  id: string; source: string; pmid?: string; doi?: string; title?: string; authorString?: string; abstractText?: string;
  pubYear?: string; citedByCount?: number; pubTypeList?: { pubType?: string[] };
  journalInfo?: { journal?: { title?: string; medlineAbbreviation?: string; isoabbreviation?: string } };
};
type EpmcResponse = { hitCount?: number; resultList?: { result?: EpmcResult[] } };

// ---------------------------------------------------------------------------------------------------------------------
// Europe PMC, politely and through the cache
// ---------------------------------------------------------------------------------------------------------------------
let lastRequest = 0;
let requestsMade = 0;
async function search(query: string): Promise<EpmcResponse | null> {
  const p = new URLSearchParams({ query, format: "json", resultType: "core", pageSize: String(PAGE_SIZE), sort: "CITED desc" });
  const url = `${EPMC}?${p.toString()}`;
  const key = join(CACHE_DIR, `${createHash("sha1").update(url).digest("hex")}.json`);
  if (!FORCE && existsSync(key)) return JSON.parse(readFileSync(key, "utf8")) as EpmcResponse;
  for (let attempt = 0; attempt < 5; attempt++) {
    const wait = lastRequest + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    requestsMade++;
    let r: Response;
    try { r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30_000) }); }
    catch { await sleep(1500 * 2 ** attempt); continue; }
    if (r.status === 429 || r.status >= 500) { await sleep(Math.max(1500 * 2 ** attempt, Number(r.headers.get("retry-after") ?? 0) * 1000)); continue; }
    if (!r.ok) return null;
    const j = (await r.json()) as EpmcResponse;
    if (typeof j.hitCount !== "number") { await sleep(1500 * 2 ** attempt); continue; } // a bare {"version":...} body means the query was not run
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(key, JSON.stringify(j));
    return j;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Text helpers: what the record says, cleaned only of markup and house-style dashes
// ---------------------------------------------------------------------------------------------------------------------
/** Registry ids a paper may cite: ClinicalTrials.gov, ANZCTR, ISRCTN, UMIN, ChiCTR, jRCT, CTRI, EudraCT and EU CT numbers. */
const REGISTRY_RE = /\b(NCT\d{8}|ACTRN\d{14}|ISRCTN\d{8}|UMIN\d{9}|ChiCTR[-\w]*\d{6,}|jRCT[a-z]?\d{9,}|CTRI\/\d{4}\/\d{2}\/\d{6}|\d{4}-\d{6}-\d{2}(-\d{2})?)\b/g;
/** A clinical report speaks of patients or participants who were enrolled, randomised or treated. */
const CLINICAL_ABSTRACT = /\b(\d+ (patients|participants|women|men|adults|children|subjects|individuals)|(patients|participants) (were|received|had|underwent)|were (enrolled|randomi[sz]ed|randomly assigned|treated|recruited|screened)|median (follow-up|age|duration|overall|progression|time)|objective response|dose[- ]limiting|maximum tolerated|recommended phase)\b/i;
/** The registry a cited id belongs to, so a paper that gives the same trial's NCT and EudraCT numbers is not counted as citing two trials. */
const registryKind = (id: string) => (id.match(/^[A-Za-z]+/)?.[0] ?? "EU").toUpperCase();
const PRECLINICAL_ABSTRACT =/\b(mice|murine|xenografts?|in vitro|in vivo|cell lines?|preclinical|tumou?r-bearing|organoids?)\b/i;
/** Remove markup only: a real tag starts with a letter or slash and holds no other angle bracket, so "p<0.05" survives. */
const TAG_RE = /<\/?[a-zA-Z][^<>]*>/g;
const clean = (s: string) => decodeEntities(s).replace(TAG_RE, " ").replace(/\s+/g, " ").trim().replace(/\s+([,.;:)])/g, "$1"); // entities first: Europe PMC encodes <i> and <sup> as &lt;i&gt;
/** House style forbids em and en dashes in rendered text: a dash between numbers reads "to", elsewhere a comma. */
const houseDashes = (s: string) => s.replace(/(\d)\s*[–—]\s*(\d)/g, "$1 to $2").replace(/\s*[–—]\s*/g, ", ").replace(/\bas of\b/gi, "at");
/** Structured abstracts arrive as <h4>Heading</h4>text; keep the headings as labels and the sections as paragraphs. */
function abstractParagraphs(html: string): string {
  const parts = html.split(/<h4[^>]*>/i);
  const out: string[] = [];
  for (const part of parts) {
    const m = part.match(/^([^<]*)<\/h4>([\s\S]*)$/i);
    if (m) { const body = clean(m[2]); if (body) out.push(`${clean(m[1]).replace(/:$/, "")}: ${body}`); }
    else { const body = clean(part); if (body) out.push(body); }
  }
  return houseDashes(out.join("\n\n"));
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const normDoi = (d?: string) => d?.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase();
const acronymRe = (a: string) => new RegExp(`(^|[^A-Za-z0-9])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[-\s]+/g, "[-\\s]?")}(?![A-Za-z0-9])`, "i");

const NON_PRIMARY_TYPES = ["Clinical Trial Protocol", "methods-article", "protocol", "Letter", "Comment", "Editorial", "Published Erratum", "Review", "Systematic Review", "Meta-Analysis", "Case Reports", "case-report", "review-article", "Patient Education Handout", "Retracted Publication", "Retraction of Publication", "Expression of Concern", "News", "Historical Article", "Practice Guideline", "Guideline", "Consensus Development Conference"];
const NON_PRIMARY_TITLE = /\b(protocol|study design|trial design|rationale and design|design and rationale|trial in progress|erratum|correction|corrigendum|plain language summary|summary of research|commentary|reply|response to|letter|editorial|case report|cost[- ]effectiveness|economic evaluation|budget impact|pharmacokinetic|exposure[- ]response|quality of life|patient[- ]reported|health[- ]related quality|systematic review|meta-analysis|pooled analysis|network meta|statistical analysis plan|accrual|recruitment|barriers to|feasibility of|healthcare systems data|efficiency of clinical trials|data linkage|routinely collected|trial conduct|site selection|consent|questionnaire|survey of|methodolog\w*|statistical (methods|considerations)|lessons (learned|learnt)|biomarker analys\w*|exploratory analys\w*|post[- ]hoc|subgroup analys\w*|secondary analys\w*|translational analys\w*|correlative|preclinical|in vitro|in vivo|mouse|murine|xenograft|cell lines?|structure[- ]based|discovery of|characteri[sz]ation of|mechanisms? of (acquired )?resistance|real[- ]world|pooled|safety analys\w*|expanded access|retrospective|case series|single[- ]cent(er|re) experience|dose selection|population pharmacokinetic\w*|health economic|budget|cost|models? of|unveil\w*|landscape of|signatures?|transcriptom\w*|proteom\w*|genomic (profiling|landscape|analys\w*)|molecular (profiling|analys\w*|characteri\w*)|cardiac (outcomes|safety)|treatment discontinuation|by age|older patients|elderly|(japanese|chinese|asian|east asian|european|korean|north american|us|china|japan|korea|asia|taiwan) (subgroup|subpopulation|subset|cohort|extension)|subgroup|association of|genotype)\b/i;
/** A design or protocol paper describes the study and has no results: it names the design and none of the result words. */
const DESIGN_ABSTRACT = /\b(describes? the (design|rationale)|this (article|paper|report|manuscript) (describes|presents|outlines)|is (currently )?(ongoing|enrolling|recruiting)|enrol?lment (is ongoing|began|started|commenced)|planned (sample|enrol\w*|accrual)|estimated (enrol\w*|primary completion)|will (be )?(randomi[sz]ed?|randomly assigned|enrol\w*|recruit\w*|include|evaluate|assess|compare|receive|investigate|approximately)|primary (endpoint|end point|outcome) (is|will be)|(is|are) (designed|planned) to|trial in progress|aims? to (evaluate|assess|compare|determine|investigate|characteri[sz]e)|aiming to)/gi;
/** Past-tense results: what a report of a finished analysis says and a protocol cannot. */
const RESULTS_ABSTRACT = /\b(hazard ratio|HR\s*[=:,]?\s*[0-9]\.[0-9]|median [a-z ,()-]*?(was|were) [0-9]|(were|was) (randomi[sz]ed|randomly assigned|enrolled|treated|included|analy[sz]ed|assigned)|response rate (was|of) [0-9]|(occurred|reported|observed|seen) in [0-9]|95% CI|p\s*[=<]\s*0?\.[0-9]+|\bresults:|findings:|(months|weeks) \(95%|[0-9]+ of [0-9]+ patients)\b/i;
const FOLLOW_UP_TITLE = /\b(long[- ]term|longer[- ]term|updated|update|final (overall survival|analysis|results|report)|extended follow[- ]up|follow[- ]up|(\d+|two|three|four|five|six|seven|eight|ten)[- ]year|overall survival|survival (results|analysis|outcomes|update)|mature)\b/i;
const CLINICAL_TRIAL_TYPES = /^(Clinical Trial|Randomized Controlled Trial|Controlled Clinical Trial|Multicenter Study|Comparative Study|Pragmatic Clinical Trial|Equivalence Trial|Adaptive Clinical Trial|Observational Study|Validation Study|Evaluation Study)/;

type Candidate = { r: EpmcResult; title: string; ncts: string[]; cited: number; year: number; pubTypes: string[]; trialTyped: boolean; nonPrimary: boolean; design: boolean; followUp: boolean };

function classify(r: EpmcResult, nct: string): Candidate | null {
  if (r.source !== "MED" || !r.pmid || !r.title) return null;
  const title = clean(r.title);
  const abstract = r.abstractText ? clean(r.abstractText) : "";
  if (!title.includes(nct) && !abstract.includes(nct)) { if (DEBUG) console.log(`  ${r.pmid}: registry id not in title or abstract (abstract ${abstract.length} chars)`); return null; } // the record itself must cite the registry id
  const kind = registryKind(nct);
  const ncts = [...new Set((`${title} ${abstract}`.match(REGISTRY_RE) ?? []).filter((id) => registryKind(id) === kind))];
  const pubTypes = r.pubTypeList?.pubType ?? [];
  const trialTyped = pubTypes.some((t) => CLINICAL_TRIAL_TYPES.test(t));
  // A paper PubMed does not type as a trial report must at least read like one: patients enrolled or treated, not mice or cell lines.
  const notClinical = !trialTyped && (!CLINICAL_ABSTRACT.test(abstract) || (PRECLINICAL_ABSTRACT.test(abstract) && !/\b(patients|participants) (were|received)\b/i.test(abstract)));
  // "Final analysis results and patient-reported outcomes from X" is the trial's results paper; a bare quality-of-life paper is not.
  const resultsTitle = /^(final|primary|updated) (analysis|results)|^(efficacy|results) (and|of|from)\b/i.test(title);
  const nonPrimary = pubTypes.some((t) => NON_PRIMARY_TYPES.includes(t)) || (NON_PRIMARY_TITLE.test(title) && !resultsTitle) || notClinical;
  // A protocol or design paper speaks in the future tense and reports nothing: two future markers (or one with no past results) and no past-tense result.
  const futureMarkers = abstract.match(DESIGN_ABSTRACT)?.length ?? 0;
  const design = futureMarkers > 0 && !RESULTS_ABSTRACT.test(abstract);
  if (DEBUG && futureMarkers > 0) console.log(`  ${r.pmid}: ${futureMarkers} future markers; results marker: ${JSON.stringify(abstract.match(RESULTS_ABSTRACT)?.[0] ?? null)}`);
  const year = Number(r.pubYear ?? 0);
  return { r, title, ncts, cited: r.citedByCount ?? 0, year, pubTypes, trialTyped, nonPrimary, design, followUp: FOLLOW_UP_TITLE.test(title) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Corpus
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const cancers = g.kind("cancer") as Cancer[];
const rootOf = (c: Cancer): Cancer => { let cur = c; const seen = new Set<string>(); while (cur.parent && !seen.has(cur.id)) { seen.add(cur.id); const p = g.get(cur.parent) as Cancer | undefined; if (!p) break; cur = p; } return cur; };
const familyIds = new Set<string>();
for (const f of FAMILIES) {
  const root = FAMILY_ROOTS[f] ?? f;
  if (!g.get(root)) { console.error(`no root cancer "${root}" for family "${f}"`); process.exit(2); }
  familyIds.add(root);
  for (const c of cancers) if (rootOf(c).id === root) familyIds.add(c.id);
}

const papersByDoi = new Map<string, Paper>();
const papersByPmid = new Map<string, Paper>();
for (const p of g.kind("paper") as Paper[]) { const d = normDoi(p.doi); if (d) papersByDoi.set(d, p); if (p.pmid) papersByPmid.set(p.pmid, p); }
const journalByName = new Map<string, Journal>();
for (const j of g.kind("journal") as Journal[]) for (const n of [j.name, ...j.aka, ...j.matchNames]) journalByName.set(n.toLowerCase(), j);
const usedIds = new Set<string>(g.entities.map((e) => e.id));

const STATUS_RANK: Record<string, number> = { positive: 0, negative: 0, mixed: 0, completed: 1, terminated: 1, withdrawn: 1, active: 2, recruiting: 3 };
const statusGroup = (s?: string) => (STATUS_RANK[s ?? ""] ?? 1) <= 1 ? "results" : s === "active" ? "active" : "recruiting";
let trials = (g.kind("trial") as Trial[])
  .filter((t) => (ONLY ? ONLY.includes(t.id) : t.cancers.some((id) => familyIds.has(id))))
  .filter((t) => t.keyPapers.length === 0 && t.nct && !(t.id in TRIAL_PAPER_SKIP) && !(t.id in trialKeyPapersWave1))
  .sort((a, b) => (STATUS_RANK[a.status ?? ""] ?? 1) - (STATUS_RANK[b.status ?? ""] ?? 1) || a.id.localeCompare(b.id));
if (STATUS_FILTER) trials = trials.filter((t) => statusGroup(t.status) === STATUS_FILTER);
trials = trials.slice(0, MAX);
console.log(`${trials.length} trials to look up (${FAMILIES.join(", ") || ONLY?.join(", ")});${Object.keys(trialKeyPapersWave1).length} already linked by this wave, ${Object.keys(TRIAL_PAPER_SKIP).length} skipped`);

// ---------------------------------------------------------------------------------------------------------------------
// Record writer: mirror the hand-written paper files, with copy that claims nothing the record does not say
// ---------------------------------------------------------------------------------------------------------------------
const asOf = today();
const journalName = (r: EpmcResult): { journal: string; abbrev: string; id?: string } => {
  const raw = r.journalInfo?.journal?.title ?? "";
  const proper = raw.split(" : ")[0].trim() || raw;
  const abbrev = r.journalInfo?.journal?.medlineAbbreviation ?? r.journalInfo?.journal?.isoabbreviation ?? proper;
  const j = journalByName.get(proper.toLowerCase()) ?? journalByName.get(abbrev.toLowerCase()) ?? journalByName.get(raw.toLowerCase());
  return j ? { journal: j.name, abbrev, id: j.id } : { journal: proper, abbrev };
};
const authorsOf = (s?: string) => {
  const names = (s ?? "").replace(/\.$/, "").split(/,\s*/).map((x) => x.trim()).filter(Boolean);
  if (!names.length) return "Authors not listed";
  return names.length > 3 ? `${names.slice(0, 3).join(", ")}, et al.` : names.join(", ");
};
const uniqueId = (base: string) => { let id = base; let n = 2; while (usedIds.has(id)) id = `${base}-${n++}`; usedIds.add(id); return id; };

function buildPaper(t: Trial, c: Candidate, role: "primary" | "follow-up"): PaperInput {
  const r = c.r;
  const { journal, abbrev, id: journalId } = journalName(r);
  const acr = trialAcronyms(t)[0];
  const trialLabel = acr ? `${acr} trial` : `trial`;
  const name = c.title.replace(/\.$/, "");
  const abstract = r.abstractText ? abstractParagraphs(r.abstractText) : "";
  const provenance = `Indexed on Europe PMC as PubMed record ${r.pmid}${r.doi ? ` (DOI ${r.doi})` : ""}. Its ${c.title.includes(t.nct!) ? "title" : "abstract"} cites the registry id ${t.nct}, which is how it was matched to this trial; no figure has been checked by an editor.`;
  const summary = (abstract ? `${abstract}\n\n` : `Europe PMC indexes no abstract for this record; the title is the only text available.\n\n`) + provenance;
  const tldr = role === "primary"
    ? `Published report from the ${trialLabel} registered as ${t.nct}, in ${journal} (${c.year}), chosen as the most cited paper whose own text cites the registry id.`
    : `Later report from the ${trialLabel} registered as ${t.nct}, in ${journal} (${c.year}); its title describes an updated or longer-term analysis.`;
  const whatItMeans = role === "primary"
    ? `This is the paper Europe PMC returns for registry id ${t.nct} with the most citations, so it is the natural first reading for anyone following the ${trialLabel}. Read the abstract above alongside the trial page and the registry entry; the record was linked automatically and its figures have not been checked by hand.`
    : `A second publication from the ${trialLabel}, later than the first and described in its title as an update or longer-term analysis. Read it with the primary publication linked from the trial page; the record was linked automatically and its figures have not been checked by hand.`;
  const caveats = [
    "Matched to the trial by the registry id cited in the Europe PMC record; the summary reproduces the record's abstract and no figure has been verified against the full paper.",
    ...(role === "follow-up" ? ["Chosen as a later report by words in its title (updated, long-term, final, overall survival or a year count), not by reading the paper."] : []),
    ...(c.ncts.length > 1 ? [`The abstract cites more than one registry id (${c.ncts.join(", ")}); it was kept because the trial's acronym appears in the title.`] : []),
  ];
  const links = [
    ...(r.doi ? [{ label: `${abbrev} ${c.year}`, url: `https://doi.org/${r.doi}` }] : []),
    { label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` },
    { label: "Europe PMC", url: `https://europepmc.org/article/MED/${r.pmid}` },
    { label: `ClinicalTrials.gov ${t.nct}`, url: `https://clinicaltrials.gov/study/${t.nct}` },
  ];
  const randomised = c.pubTypes.includes("Randomized Controlled Trial") || /\brandomi[sz]ed\b/i.test(`${c.title} ${abstract}`);
  const paperType: PaperInput["paperType"] = randomised ? "rct" : "observational";
  const id = uniqueId(`paper-${slug(t.id)}-${slug(abbrev).slice(0, 40) || "journal"}-${c.year}${role === "follow-up" ? "-update" : ""}`);
  return {
    kind: "paper", asOf, id, name, tldr, summary, journal, year: c.year, ...(r.doi ? { doi: r.doi } : {}), pmid: r.pmid!, authors: authorsOf(r.authorString), paperType,
    findings: [], whatItMeans, caveats, links, tags: ["europepmc-ingest"],
    cancers: [...t.cancers], drugs: [...t.drugs], targets: [...t.targets], technologies: [...t.technologies], trials: [t.id], ...(journalId ? { journals: [journalId] } : {}),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------------------------------------------------
type Outcome = { trial: string; nct: string; status?: string; primary?: string; followUp?: string; skip?: string; note: string };
async function main(): Promise<void> {
const outcomes: Outcome[] = [];
const newPapers: PaperInput[] = [];
const newLinks: Record<string, string[]> = {};
const newSkips: Record<string, string> = {};
const tally = { linked: 0, existing: 0, created: 0, followUps: 0, noHits: 0, noEligible: 0, protocolOnly: 0, skipped: 0, failed: 0 };

for (const t of trials) {
  const nct = t.nct!;
  const acrs = trialAcronyms(t);
  const res = await search(`(TITLE:"${nct}" OR ABSTRACT:"${nct}") AND SRC:MED`);
  if (!res) { tally.failed++; outcomes.push({ trial: t.id, nct, status: t.status, note: "request failed" }); continue; }
  const all = (res.resultList?.result ?? []).map((r) => classify(r, nct)).filter((c): c is Candidate => !!c);
  if (DEBUG) console.log(`  ${res.hitCount} hits; raw results: ${(res.resultList?.result ?? []).map((r) => `${r.source}:${r.pmid ?? r.id}`).join(", ")}`);
  if (DEBUG) for (const c of all) console.log(`  ${c.r.pmid} ${c.year} cited ${c.cited} types [${c.pubTypes.join("; ")}] nonPrimary=${c.nonPrimary} design=${c.design} followUp=${c.followUp} ncts=${c.ncts.length} | ${c.title.slice(0, 110)}`);
  if (!all.length) { tally.noHits++; outcomes.push({ trial: t.id, nct, status: t.status, note: `no PubMed record cites ${nct} in its title or abstract` }); continue; }
  // A paper citing several registry ids is kept only when the trial's acronym is in its title.
  const single = all.filter((c) => c.ncts.length === 1 || acrs.some((a) => acronymRe(a).test(c.title)));
  if (!single.length) {
    const reason = `only papers citing several registry ids (${all.map((c) => c.r.pmid).join(", ")}) and the trial's acronym is not in their titles`;
    tally.skipped++; newSkips[t.id] = reason; outcomes.push({ trial: t.id, nct, status: t.status, skip: reason, note: "skipped" }); continue;
  }
  const eligible = single.filter((c) => !c.nonPrimary && !c.design);
  if (!eligible.length) {
    if (single.some((c) => c.design || /protocol|design/i.test(c.title))) { tally.protocolOnly++; outcomes.push({ trial: t.id, nct, status: t.status, note: `protocol or design paper only (${single.map((c) => c.r.pmid).join(", ")})` }); }
    else { tally.noEligible++; outcomes.push({ trial: t.id, nct, status: t.status, note: `only secondary pieces (${single.map((c) => `${c.r.pmid}: ${c.pubTypes.filter((p) => NON_PRIMARY_TYPES.includes(p)).join("/") || "title"}`).join("; ")})` }); }
    continue;
  }
  eligible.sort((a, b) => b.cited - a.cited || a.year - b.year);
  let primary = eligible[0];
  const namesTrial = (c: Candidate) => acrs.some((a) => acronymRe(a).test(`${c.title} ${clean(c.r.abstractText ?? "")}`));
  // The best candidate is not typed as a trial report, the trial has an acronym, and the paper never names it: fall back to
  // the most cited paper PubMed types as a trial report that does name it; when there is none, the match is ambiguous.
  if (!primary.trialTyped && acrs.length && !namesTrial(primary)) {
    const typed = eligible.find((c) => c.trialTyped && namesTrial(c));
    if (!typed) {
      const reason = `best candidate ${primary.r.pmid} ("${primary.title.slice(0, 80)}") is not typed as a trial report and never names ${acrs.join(" or ")}`;
      tally.skipped++; newSkips[t.id] = reason; outcomes.push({ trial: t.id, nct, status: t.status, skip: reason, note: "skipped" }); continue;
    }
    primary = typed;
  }
  // Ambiguity: two well-cited candidates from different years, neither clearly the trial's report.
  const runnerUp = eligible[1];
  if (runnerUp && runnerUp.cited >= primary.cited * 0.8 && runnerUp.cited > 20 && !primary.trialTyped && !runnerUp.trialTyped) {
    const reason = `two candidates with similar citation counts (${primary.r.pmid}: ${primary.cited}, ${runnerUp.r.pmid}: ${runnerUp.cited}) and neither is typed as a trial report`;
    tally.skipped++; newSkips[t.id] = reason; outcomes.push({ trial: t.id, nct, status: t.status, skip: reason, note: "skipped" }); continue;
  }
  const followUp = eligible.find((c) => c !== primary && c.followUp && c.year >= primary.year && c.r.pmid !== primary.r.pmid);

  const link = (c: Candidate, role: "primary" | "follow-up"): string => {
    const existing = (c.r.doi && papersByDoi.get(normDoi(c.r.doi)!)) || papersByPmid.get(c.r.pmid!);
    if (existing) { tally.existing++; return existing.id; }
    const paper = buildPaper(t, c, role);
    newPapers.push(paper);
    const d = normDoi(paper.doi); if (d) papersByDoi.set(d, paper as unknown as Paper); papersByPmid.set(paper.pmid!, paper as unknown as Paper);
    tally.created++;
    return paper.id;
  };
  const ids = [link(primary, "primary")];
  if (followUp) { ids.push(link(followUp, "follow-up")); tally.followUps++; }
  newLinks[t.id] = ids;
  tally.linked++;
  outcomes.push({ trial: t.id, nct, status: t.status, primary: `${primary.r.pmid} (${primary.cited} citations, ${primary.year})`, ...(followUp ? { followUp: `${followUp.r.pmid} (${followUp.year})` } : {}), note: "linked" });
}

// ---------------------------------------------------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------------------------------------------------
const show = (o: Outcome) => `${o.trial.padEnd(40)} ${o.nct} ${(o.status ?? "").padEnd(10)} ${o.note}${o.primary ? `  primary ${o.primary}` : ""}${o.followUp ? `  follow-up ${o.followUp}` : ""}${o.skip ? `  ${o.skip}` : ""}`;
for (const o of outcomes) console.log(show(o));
console.log(`\n${trials.length} trials looked up, ${requestsMade} requests made (the rest from cache).`);
console.log(`linked ${tally.linked} (${tally.created} new paper records, ${tally.existing} existing records reused, ${tally.followUps} follow-ups); no citing record ${tally.noHits}; protocol or design only ${tally.protocolOnly}; secondary pieces only ${tally.noEligible}; skipped as ambiguous ${tally.skipped}; failed ${tally.failed}`);

if (!APPLY) { console.log("\nDry run: pass --apply to write src/data/papers-trials-wave1.ts and src/data/trial-key-papers-wave1.ts"); process.exit(0); }

const ser = (v: unknown) => JSON.stringify(v);
const paperLine = (p: PaperInput): string => {
  const { kind: _k, asOf: _a, ...rest } = p;
  void _k; void _a;
  const fields = Object.entries(rest).map(([k, v]) => `${k}: ${ser(v)}`);
  return `  p({ ${fields.join(", ")} }),`;
};
const allPapers = [...papersTrialsWave1, ...newPapers];
writeFileSync(PAPERS_FILE, `import type { PaperInput } from "@/lib/schema";

const asOf = "${asOf}";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * Wave 1 of docs/CONTENT-ROADMAP.md: the papers behind trials that had none. Written by scripts/fetch-trial-papers.ts,
 * which asks Europe PMC for PubMed records whose title or abstract cites the trial's NCT id and keeps the most cited
 * eligible paper (plus one later report when its title says it is an update). Title, journal, year, DOI, PMID and
 * authors are read from the Europe PMC record; the summary reproduces the record's abstract with markup removed
 * and house-style dashes; the TL;DR, "what it means" and caveats say only how the record was matched. Nothing here
 * has been read by an editor: findings are left empty on purpose. Trials link to these records through
 * src/data/trial-key-papers-wave1.ts. Do not edit by hand; re-run the script.
 */
export const papersTrialsWave1: PaperInput[] = [
${allPapers.map(paperLine).join("\n")}
];
`);
const allLinks = { ...trialKeyPapersWave1, ...newLinks };
const allSkips = { ...TRIAL_PAPER_SKIP, ...newSkips };
writeFileSync(LINKS_FILE, `/**
 * Trial to key-paper links written by scripts/fetch-trial-papers.ts (wave 1 of docs/CONTENT-ROADMAP.md). Each entry
 * names the paper records, in src/data/papers-trials-wave1.ts or elsewhere in the corpus, that a trial's page should
 * list as its key papers: the primary publication first, a later report second. src/data/index.ts merges them into
 * the trial's \`keyPapers\`. TRIAL_PAPER_SKIP lists trials the script will not retry because the Europe PMC match
 * was ambiguous, with the reason; clear an entry to try again. Do not edit by hand; re-run the script.
 */
export const trialKeyPapersWave1: Record<string, string[]> = {
${Object.keys(allLinks).sort().map((k) => `  ${ser(k)}: ${ser(allLinks[k])},`).join("\n")}
};

export const TRIAL_PAPER_SKIP: Record<string, string> = {
${Object.keys(allSkips).sort().map((k) => `  ${ser(k)}: ${ser(allSkips[k])},`).join("\n")}
};
`);
console.log(`\nWrote ${allPapers.length} paper records and ${Object.keys(allLinks).length} trial links (${Object.keys(allSkips).length} skips).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
