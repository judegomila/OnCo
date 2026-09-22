/**
 * Shared layer for the wave 6 fetchers of docs/CONTENT-ROADMAP.md (scripts/fetch-people-papers.ts,
 * scripts/fetch-idea-evidence.ts, scripts/fetch-company-drugs.ts). Two hosts only: Europe PMC and ClinicalTrials.gov API v2.
 * Requests go out one at a time, at least 250 ms apart, with a User-Agent naming OnCo; 429 and 5xx responses back off and
 * retry; every raw response is cached under /tmp/europepmc-cache or /tmp/ctgov-cache so re-runs cost nothing. The text
 * helpers mirror scripts/fetch-trial-papers.ts (wave 1): markup and entities are removed, house-style dashes applied to
 * abstracts, and nothing else is changed in what a record says.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Journal, PaperInput } from "../src/lib/schema";
import { decodeEntities, sleep } from "./feed-utils";

export const EPMC_SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
export const CTGOV_STUDIES = "https://clinicaltrials.gov/api/v2/studies";
const EPMC_CACHE = "/tmp/europepmc-cache";
const CTGOV_CACHE = "/tmp/ctgov-cache";
const MIN_INTERVAL_MS = 250;
const UA = "OnCo/1.0 (https://onco.cc; content wave 6; onco@judegomila.com)";

// ---------------------------------------------------------------------------------------------------------------------
// Politeness and cache
// ---------------------------------------------------------------------------------------------------------------------
let lastRequest = 0;
let requestsMade = 0;
export const requestCount = () => requestsMade;
const sha1 = (s: string) => createHash("sha1").update(s).digest("hex");

async function getCached<T>(url: string, cacheFile: string, ok: (j: unknown) => boolean, force: boolean): Promise<T | null> {
  if (!force && existsSync(cacheFile)) return JSON.parse(readFileSync(cacheFile, "utf8")) as T | null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const wait = lastRequest + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    requestsMade++;
    let r: Response;
    try { r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30_000) }); }
    catch { await sleep(1500 * 2 ** attempt); continue; }
    if (r.status === 429 || r.status >= 500) { await sleep(Math.max(1500 * 2 ** attempt, Number(r.headers.get("retry-after") ?? 0) * 1000)); continue; }
    if (r.status === 404) { mkdirSync(dirname(cacheFile), { recursive: true }); writeFileSync(cacheFile, "null"); return null; }
    if (!r.ok) return null;
    const j = (await r.json()) as unknown;
    if (!ok(j)) { await sleep(1500 * 2 ** attempt); continue; } // a bare {"version":...} body means the query was not run
    mkdirSync(dirname(cacheFile), { recursive: true });
    writeFileSync(cacheFile, JSON.stringify(j));
    return j as T;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Europe PMC
// ---------------------------------------------------------------------------------------------------------------------
export type EpmcAuthor = { fullName?: string; lastName?: string; firstName?: string; initials?: string; authorAffiliationDetailsList?: { authorAffiliation?: Array<{ affiliation?: string }> } };
export type EpmcResult = {
  id: string; source: string; pmid?: string; doi?: string; title?: string; authorString?: string; abstractText?: string; affiliation?: string;
  pubYear?: string; citedByCount?: number; pubTypeList?: { pubType?: string[] }; authorList?: { author?: EpmcAuthor[] };
  journalInfo?: { journal?: { title?: string; medlineAbbreviation?: string; isoabbreviation?: string } };
};
export type EpmcResponse = { hitCount?: number; resultList?: { result?: EpmcResult[] } };

export async function epmcSearch(query: string, opts: { pageSize?: number; force?: boolean } = {}): Promise<EpmcResponse | null> {
  const p = new URLSearchParams({ query, format: "json", resultType: "core", pageSize: String(opts.pageSize ?? 25), sort: "CITED desc" });
  const url = `${EPMC_SEARCH}?${p.toString()}`;
  return getCached<EpmcResponse>(url, join(EPMC_CACHE, `${sha1(url)}.json`), (j) => typeof (j as EpmcResponse)?.hitCount === "number", !!opts.force);
}

// ---------------------------------------------------------------------------------------------------------------------
// ClinicalTrials.gov API v2
// ---------------------------------------------------------------------------------------------------------------------
export type CtgovIntervention = { type?: string; name?: string; description?: string; otherNames?: string[] };
export type CtgovStudy = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string; officialTitle?: string; acronym?: string };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string }; primaryCompletionDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string; class?: string }; collaborators?: Array<{ name?: string; class?: string }> };
    designModule?: { studyType?: string; phases?: string[]; enrollmentInfo?: { count?: number; type?: string } };
    armsInterventionsModule?: { interventions?: CtgovIntervention[] };
    conditionsModule?: { conditions?: string[]; keywords?: string[] };
  };
  hasResults?: boolean;
};
export type CtgovSearch = { totalCount?: number; studies?: CtgovStudy[]; nextPageToken?: string };
export const CTGOV_FIELDS = ["NCTId", "BriefTitle", "OfficialTitle", "Acronym", "OverallStatus", "StartDate", "PrimaryCompletionDate", "LeadSponsorName", "LeadSponsorClass", "CollaboratorName",
  "StudyType", "Phase", "EnrollmentCount", "EnrollmentType", "InterventionType", "InterventionName", "InterventionDescription", "InterventionOtherName", "Condition", "Keyword", "HasResults"].join(",");

/** Interventional phase 2 or 3 studies matching the registry's own intervention and condition search; callers must still verify the match against the record. */
export async function ctgovSearch(params: Record<string, string>, opts: { pageSize?: number; force?: boolean } = {}): Promise<CtgovSearch | null> {
  const p = new URLSearchParams({ ...params, fields: CTGOV_FIELDS, pageSize: String(opts.pageSize ?? 50), countTotal: "true" });
  const url = `${CTGOV_STUDIES}?${p.toString()}`;
  return getCached<CtgovSearch>(url, join(CTGOV_CACHE, `w6-search-${sha1(url)}.json`), (j) => Array.isArray((j as CtgovSearch)?.studies), !!opts.force);
}

export async function ctgovStudy(nct: string, opts: { force?: boolean } = {}): Promise<CtgovStudy | null> {
  const url = `${CTGOV_STUDIES}/${nct}?fields=${CTGOV_FIELDS}`;
  return getCached<CtgovStudy>(url, join(CTGOV_CACHE, `w6-study-${nct}.json`), (j) => !!(j as CtgovStudy)?.protocolSection, !!opts.force);
}

// ---------------------------------------------------------------------------------------------------------------------
// Text helpers: what the record says, cleaned only of markup and house-style dashes
// ---------------------------------------------------------------------------------------------------------------------
/** Remove markup only: a real tag starts with a letter or slash and holds no other angle bracket, so "p<0.05" survives. */
const TAG_RE = /<\/?[a-zA-Z][^<>]*>/g;
export const clean = (s: string) => decodeEntities(s).replace(TAG_RE, " ").replace(/\s+/g, " ").trim().replace(/\s+([,.;:)])/g, "$1");
/** House style forbids em and en dashes in rendered text: a dash between numbers reads "to", elsewhere a comma. */
export const houseDashes = (s: string) => s.replace(/(\d)\s*[–—]\s*(\d)/g, "$1 to $2").replace(/\s*[–—]\s*/g, ", ").replace(/\bas of\b/gi, "at");
/** Structured abstracts arrive as <h4>Heading</h4>text; keep the headings as labels and the sections as paragraphs. */
export function abstractParagraphs(html: string): string {
  const parts = html.split(/<h4[^>]*>/i);
  const out: string[] = [];
  for (const part of parts) {
    const m = part.match(/^([^<]*)<\/h4>([\s\S]*)$/i);
    if (m) { const body = clean(m[2]); if (body) out.push(`${clean(m[1]).replace(/:$/, "")}: ${body}`); }
    else { const body = clean(part); if (body) out.push(body); }
  }
  return houseDashes(out.join("\n\n"));
}
export const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const normDoi = (d?: string) => d?.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase();
export const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Whole-word, case-insensitive mention of one of the tokens in a text; returns the token that matched. */
export const mentions = (text: string, tokens: string[]): string | undefined => tokens.find((t) => new RegExp(`(^|[^A-Za-z0-9])${esc(t)}(?=$|[^A-Za-z0-9])`, "i").test(text));

export const NOT_A_PAPER_TYPES = ["Letter", "Comment", "Editorial", "Published Erratum", "Retracted Publication", "Retraction of Publication", "Expression of Concern", "News", "Patient Education Handout", "Biography", "Autobiography", "Interview", "Portrait", "Congress", "Address", "Lecture", "Newspaper Article"];
export const REVIEW_TYPES = ["Review", "Systematic Review", "review-article"];
export const PRECLINICAL_ABSTRACT = /\b(mice|murine|xenografts?|in vitro|in vivo|cell lines?|preclinical|tumou?r-bearing|organoids?)\b/i;
export const CLINICAL_ABSTRACT = /\b(\d+ (patients|participants|women|men|adults|children|subjects|individuals)|(patients|participants) (were|received|had|underwent)|were (enrolled|randomi[sz]ed|randomly assigned|treated|recruited|screened)|median (follow-up|age|duration|overall|progression|time)|objective response|dose[- ]limiting|maximum tolerated|recommended phase)\b/i;
/** Past-tense results: what a report of a finished analysis says and a protocol cannot. */
export const RESULTS_ABSTRACT = /\b(hazard ratio|HR\s*[=:,]?\s*[0-9]\.[0-9]|median [a-z ,()-]*?(was|were) [0-9]|(were|was) (randomi[sz]ed|randomly assigned|enrolled|treated|included|analy[sz]ed|assigned)|response rate (was|of) [0-9]|(occurred|reported|observed|seen) in [0-9]|95% CI|p\s*[=<]\s*0?\.[0-9]+|\bresults:|findings:|(months|weeks) \(95%|[0-9]+ of [0-9]+ patients)\b/i;
/** A design or protocol paper speaks in the future tense and reports nothing. */
export const DESIGN_ABSTRACT = /\b(describes? the (design|rationale)|this (article|paper|report|manuscript) (describes|presents|outlines)|is (currently )?(ongoing|enrolling|recruiting)|enrol?lment (is ongoing|began|started|commenced)|planned (sample|enrol\w*|accrual)|estimated (enrol\w*|primary completion)|will (be )?(randomi[sz]ed?|randomly assigned|enrol\w*|recruit\w*|include|evaluate|assess|compare|receive|investigate|approximately)|primary (endpoint|end point|outcome) (is|will be)|(is|are) (designed|planned) to|trial in progress|aims? to (evaluate|assess|compare|determine|investigate|characteri[sz]e)|aiming to)/gi;

/** Paper type from the PubMed publication types and the abstract, mirroring the schema enum. */
export function paperTypeOf(pubTypes: string[], title: string, abstract: string): PaperInput["paperType"] {
  if (pubTypes.some((t) => t === "Meta-Analysis")) return "meta-analysis";
  if (pubTypes.some((t) => REVIEW_TYPES.includes(t))) return "review";
  if (pubTypes.some((t) => /^(Practice Guideline|Guideline|Consensus Development Conference)/.test(t))) return "guideline";
  if (pubTypes.includes("Randomized Controlled Trial") || /\brandomi[sz]ed\b/i.test(`${title} ${abstract}`)) return "rct";
  if (PRECLINICAL_ABSTRACT.test(abstract) && !/\b(patients|participants) (were|received)\b/i.test(abstract)) return "basic";
  return "observational";
}

// ---------------------------------------------------------------------------------------------------------------------
// Record helpers shared by the writers
// ---------------------------------------------------------------------------------------------------------------------
export function journalIndex(journals: Journal[]): Map<string, Journal> {
  const m = new Map<string, Journal>();
  for (const j of journals) for (const n of [j.name, ...j.aka, ...j.matchNames]) m.set(n.toLowerCase(), j);
  return m;
}
export function journalName(r: EpmcResult, byName: Map<string, Journal>): { journal: string; abbrev: string; id?: string } {
  const raw = r.journalInfo?.journal?.title ?? "";
  const proper = raw.split(" : ")[0].trim() || raw;
  const abbrev = r.journalInfo?.journal?.medlineAbbreviation ?? r.journalInfo?.journal?.isoabbreviation ?? proper;
  const j = byName.get(proper.toLowerCase()) ?? byName.get(abbrev.toLowerCase()) ?? byName.get(raw.toLowerCase());
  return j ? { journal: j.name, abbrev, id: j.id } : { journal: proper || "Journal not given", abbrev: abbrev || "journal" };
}
export const authorsOf = (s?: string) => {
  const names = (s ?? "").replace(/\.$/, "").split(/,\s*/).map((x) => x.trim()).filter(Boolean);
  if (!names.length) return "Authors not listed";
  return names.length > 3 ? `${names.slice(0, 3).join(", ")}, et al.` : names.join(", ");
};
export const paperLinks = (r: EpmcResult, year: number, abbrev: string) => [
  ...(r.doi ? [{ label: houseDashes(`${abbrev} ${year}`), url: `https://doi.org/${r.doi}` }] : []),
  { label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` },
  { label: "Europe PMC", url: `https://europepmc.org/article/MED/${r.pmid}` },
];

/** One paper record per line, mirroring src/data/papers-trials-wave1.ts. */
export function paperLine(p: PaperInput): string {
  const { kind: _k, asOf: _a, ...rest } = p;
  void _k; void _a;
  return `  p({ ${Object.entries(rest).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")} }),`;
}
export function writePapersFile(path: string, exportName: string, asOf: string, header: string, papers: PaperInput[]): void {
  writeFileSync(path, `import type { PaperInput } from "@/lib/schema";

const asOf = "${asOf}";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

${header}
export const ${exportName}: PaperInput[] = [
${papers.map(paperLine).join("\n")}
];
`);
}
/** Both spellings of the words Europe PMC and ClinicalTrials.gov index in US English. */
const US_SPELLINGS: Array<[RegExp, string]> = [[/tumour/g, "tumor"], [/leukaemia/g, "leukemia"], [/haemat/g, "hemat"], [/oesophag/g, "esophag"], [/paediatric/g, "pediatric"], [/gynaecolog/g, "gynecolog"], [/anaemia/g, "anemia"]];
export const withUsSpelling = (s: string): string[] => { const us = US_SPELLINGS.reduce((acc, [re, to]) => acc.replace(re, to), s); return us === s ? [s] : [s, us]; };
/**
 * A cancer name, then the diseases it lists ("Glioma & glioblastoma", "Brain and spinal cord tumours"), each with both
 * spellings. The full name always comes first (it is the registry query); fragments under five characters are dropped so
 * "Head and neck cancer" never yields "Head".
 */
export const cancerParts = (name: string): string[] => {
  const full = name.replace(/\s*\(.*$/, "").trim();
  const parts = full.split(/\s*(?:&|\/|,|\band\b|\bor\b)\s*/).map((s) => s.trim()).filter((s) => s.length >= 5 && s !== full && !/^(other|cancers?|tumou?rs?)$/i.test(s));
  return [...new Set([full, ...parts].flatMap(withUsSpelling))].filter((s) => s.length >= 4);
};

/**
 * Citation counts for new paper records, written into public/citations/index.json in the shape scripts/fetch-citations.ts
 * uses ({ citedBy, source, id, pmid, fetched }). The count comes from the same Europe PMC record the paper was built from,
 * so it is the figure the weekly fetcher would write; an entry is added only when the record's PMID matches the paper's.
 */
export function recordCitations(rows: Array<{ paperId: string; r: EpmcResult }>, fetched: string): number {
  const path = join(process.cwd(), "public", "citations", "index.json");
  const index = JSON.parse(readFileSync(path, "utf8")) as { fetched: string; papers: Record<string, { citedBy: number; source: string; id?: string; pmid?: string; fetched: string }> };
  let added = 0;
  for (const { paperId, r } of rows) {
    if (index.papers[paperId] || typeof r.citedByCount !== "number" || r.source !== "MED" || !r.pmid) continue;
    index.papers[paperId] = { citedBy: r.citedByCount, source: r.source, id: r.id ?? r.pmid, pmid: r.pmid, fetched };
    added++;
  }
  if (added) writeFileSync(path, JSON.stringify(index));
  return added;
}

export const recordLines = (o: Record<string, unknown>) => Object.keys(o).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(o[k])},`).join("\n");
