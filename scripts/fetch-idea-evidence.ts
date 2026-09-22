/**
 * Wave 6 of docs/CONTENT-ROADMAP.md, step 2: trials and key papers for ideas that have none.
 *
 * Extends the corpus-only joins of wave 2 (scripts/link-joins.ts, rules 2 and 3) with two registries. For an idea whose
 * own text names a drug or a target and which names at least one cancer:
 *
 *   trials   ClinicalTrials.gov API v2 is searched by the drug (query.intr) or the target (query.term) plus the cancer
 *            (query.cond), restricted to interventional phase 2 or 3 studies. A study is kept only when the registry's own
 *            intervention list names a corpus drug (the idea's drug, or a drug whose `targets` carries the idea's target and,
 *            when the idea names technologies, shares one) and its condition list names the idea's cancer, both matched on
 *            the whole normalised name or alias, never a substring. Withdrawn studies and studies that also list phase 1 are
 *            not evidence. A study the corpus already holds (same NCT id) is linked, not rewritten; otherwise a registry
 *            record is written to src/data/trials-ideas-wave6.ts with drugs, cancers and companies set to the corpus records
 *            the registry fields matched. Cap five an idea (phase 3 first, then studies with results, then the largest).
 *   papers   Europe PMC is searched for PubMed records whose title names the drug or target and whose title or abstract
 *            names the cancer. Kept: reviews, meta-analyses and phase 2 or 3 results papers (typed as such by PubMed or
 *            saying "phase 2" or "phase 3" with past-tense results), never protocols, letters, comments or errata; the drug
 *            or target must be in the title. Cap three an idea, most cited first. Existing records are linked by DOI or PMID;
 *            new ones go to src/data/papers-ideas-wave6.ts, linking the journal and, when the abstract cites exactly one
 *            registry id the corpus holds, that trial; never drugs or cancers (wave 1, Ask OnCo benchmark).
 *
 * Wave 2's eligibility rules hold: the idea's actor must be one that trials test (research, clinic, industry, engineering
 * or unstated); for trials its maturity must claim clinical evidence (early-clinical or being-tested-at-scale); a drug or
 * target counts only when the idea's name, TL;DR, summary, hypothesis, rationale or test names it. Links are written to
 * src/data/idea-links-wave6.ts, which src/data/index.ts merges into the idea's `trials` and `keyPapers`.
 *
 *   npx tsx scripts/fetch-idea-evidence.ts                          dry run
 *   npx tsx scripts/fetch-idea-evidence.ts --apply --max=80          write the data files
 *   npx tsx scripts/fetch-idea-evidence.ts --only=idea-cd30-car-t-hodgkin --debug
 *
 * Requests go through scripts/wave6-shared.ts: one at a time, 250 ms apart, cached under /tmp/ctgov-cache and
 * /tmp/europepmc-cache. Each new paper record's Europe PMC citation count is written to public/citations/index.json.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys, drugKeys, norm } from "../src/lib/completeness";
import { resolveSponsor } from "../src/data/sponsor-aliases";
import type { Cancer, Company, Drug, Idea, Paper, PaperInput, Target, Trial, TrialInput } from "../src/lib/schema";
import { trialsIdeasWave6 } from "../src/data/trials-ideas-wave6";
import { papersIdeasWave6 } from "../src/data/papers-ideas-wave6";
import { ideaLinksWave6, IDEA_EVIDENCE_SKIP, type IdeaLinks } from "../src/data/idea-links-wave6";
import { today } from "./feed-utils";
import { abstractParagraphs, authorsOf, cancerParts, clean, ctgovSearch, DESIGN_ABSTRACT, epmcSearch, esc, houseDashes, journalIndex, journalName, mentions, NOT_A_PAPER_TYPES, normDoi, paperLinks, paperTypeOf, recordCitations, recordLines, requestCount, RESULTS_ABSTRACT, REVIEW_TYPES, slug, writePapersFile, type CtgovStudy, type EpmcResult } from "./wave6-shared";

const TRIALS_FILE = join(process.cwd(), "src", "data", "trials-ideas-wave6.ts");
const PAPERS_FILE = join(process.cwd(), "src", "data", "papers-ideas-wave6.ts");
const LINKS_FILE = join(process.cwd(), "src", "data", "idea-links-wave6.ts");
const TRIAL_CAP = 5;
const PAPER_CAP = 3;
const MAX_DRUGS = 3, MAX_TARGETS = 2, MAX_CANCERS = 3;

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const DEBUG = args.includes("--debug");
const FORCE = args.includes("--force");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);

/** Idea actors whose proposals a drug trial can test (wave 2). */
const TRIAL_ACTORS = new Set(["research", "clinic", "industry", "engineering"]);
const CLINICAL_MATURITY = new Set(["early-clinical", "being-tested-at-scale"]);
/** An aka that names a drug class is not a name of the drug (wave 2). */
const CLASS_WORD = /\b(agonists?|antagonists?|inhibitors?|blockers?|antibod(y|ies)|analog(ue)?s?|vaccines?|therap(y|ies)|agents?|regimens?|chemotherapy|conjugates?|modulators?|placebo|standard of care)\b/i;
/** Families first, by GLOBOCAN burden (docs/CONTENT-ROADMAP.md wave 6). */
const FAMILY_ORDER = ["breast-cancer", "lung-cancer", "colorectal", "pancreatic", "prostate", "skin-cancer", "gastric", "liver", "ovarian", "bladder"];

// ---------------------------------------------------------------------------------------------------------------------
// Corpus
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const drugs = g.kind("drug") as Drug[];
const trials = g.kind("trial") as Trial[];
const companies = g.kind("company") as Company[];
const journalByName = journalIndex(g.kind("journal"));
const usedIds = new Set<string>(g.entities.map((e) => e.id));
const uniqueId = (base: string) => { let id = base; let n = 2; while (usedIds.has(id)) id = `${base}-${n++}`; usedIds.add(id); return id; };
const papersByDoi = new Map<string, Paper>();
const papersByPmid = new Map<string, Paper>();
for (const p of g.kind("paper") as Paper[]) { const d = normDoi(p.doi); if (d) papersByDoi.set(d, p); if (p.pmid) papersByPmid.set(p.pmid, p); }
const trialByNct = new Map<string, Trial>();
for (const t of trials) if (t.nct) trialByNct.set(t.nct.toUpperCase(), t);
for (const t of trialsIdeasWave6) if (t.nct) trialByNct.set(t.nct.toUpperCase(), t as unknown as Trial);

const rootOf = (c: Cancer): Cancer => { let cur = c; const seen = new Set<string>(); while (cur.parent && !seen.has(cur.id)) { seen.add(cur.id); const p = g.get(cur.parent) as Cancer | undefined; if (!p) break; cur = p; } return cur; };
const familyRank = (i: Idea) => Math.min(...i.cancers.map((id) => { const c = g.get(id) as Cancer | undefined; const r = c ? FAMILY_ORDER.indexOf(rootOf(c).id) : -1; return r < 0 ? FAMILY_ORDER.length : r; }), FAMILY_ORDER.length);

/** Whole strings only, four characters or more, not a class name: the tokens by which a drug is named. */
const drugTokens = (d: Drug): string[] => [...new Set([d.name, d.brand, d.code, ...d.aka].filter((s): s is string => typeof s === "string" && s.trim().length >= 4 && !CLASS_WORD.test(s)).map((s) => s.trim()))];
const targetKeys = (t: Target) => [t.symbol ?? "", t.name, ...t.aka].filter((k) => k.length >= 3);
const ideaText = (i: Idea) => `${i.name} ${i.tldr} ${i.summary} ${i.hypothesis} ${i.rationale} ${i.test}`;
/** Gene-symbol keys of five letters or fewer are matched case-sensitively, so "met" the verb is not MET and "all" is not ALL. */
const isSymbol = (k: string) => k.length <= 5 && k === k.toUpperCase() && /[A-Z]/.test(k);
const mentionsKey = (text: string, tokens: string[]): string | undefined => tokens.find((t) => new RegExp(`(^|[^A-Za-z0-9])${esc(t)}(?=$|[^A-Za-z0-9])`, isSymbol(t) ? "" : "i").test(text));
/** Keys that also name something else in oncology text (FAP the polyposis, AR and ER the receptors' initials, HR the hazard ratio): a second key of the same target must appear. */
const AMBIGUOUS_KEYS = new Set(["FAP", "MET", "ALL", "AR", "ER", "PR", "HR", "PD", "CD", "MDS", "AML", "TIL", "MSI", "TMB", "IDH", "SET", "KIT", "RET", "MDM2", "CDK", "PARP", "TOP", "LAG", "TIM", "BET"]);
/** Which key of the target a text names, honouring case for symbols and demanding a second key when the first is ambiguous. */
function targetKeyIn(text: string, t: Target): string | undefined {
  const keys = targetKeys(t);
  const hit = mentionsKey(text, keys);
  if (!hit) return undefined;
  if (AMBIGUOUS_KEYS.has(hit.toUpperCase()) && !keys.some((k) => k !== hit && k.length >= 5 && mentionsKey(text, [k]))) return undefined;
  return hit;
}
const namesDrug = (text: string, d: Drug) => !!mentions(text, drugTokens(d));
const namesTarget = (text: string, t: Target) => !!targetKeyIn(text, t);

/** Corpus drugs by every key drugKeys() gives them; a key shared by two drugs is dropped as ambiguous. */
const drugByKey = new Map<string, Drug | null>();
for (const d of drugs) for (const k of drugKeys(d)) { if (k.length < 4 || CLASS_WORD.test(k)) continue; drugByKey.set(k, drugByKey.has(k) ? null : d); }
/** Corpus drugs a registry intervention names (name or other names), by whole normalised key. */
function drugsNamedBy(intervention: { name?: string; otherNames?: string[] }): Drug[] {
  const out = new Map<string, Drug>();
  for (const k of drugKeys({ name: intervention.name ?? "", aka: intervention.otherNames ?? [] })) { const d = drugByKey.get(k); if (d) out.set(d.id, d); }
  return [...out.values()];
}
/** Companies by every key companyKeys() gives them; shared keys dropped. */
const companyByKey = new Map<string, Company | null>();
for (const c of companies) for (const k of companyKeys(c)) companyByKey.set(k, companyByKey.has(k) && companyByKey.get(k)?.id !== c.id ? null : c);
function sponsorCompany(name: string): string | undefined {
  const c = companyByKey.get(companyKey(name)) ?? companyByKey.get(norm(name));
  if (c) return c.id;
  const r = resolveSponsor(name);
  return r.matched && r.id && g.get(r.id)?.kind === "company" ? r.id : undefined;
}

/** Normalised phrases by which a cancer is named: name, aliases, their parts, in both spellings. */
/** norm() with possessives dropped, so "Hodgkin's Lymphoma" and "Hodgkin lymphoma" are one phrase. */
const normP = (s: string) => norm(s.replace(/['’]s\b/g, ""));
function cancerPhrases(c: Cancer): string[] {
  const raw = [c.name, ...c.aka, ...cancerParts(c.name), ...c.aka.flatMap(cancerParts)];
  return [...new Set(raw.map((s) => normP(s.replace(/\s*\(.*$/, ""))).filter((s) => s.length >= 3))];
}
/** Does a registry condition or a paper's text name the cancer? Whole phrase, whole words; three-letter aliases must be the whole condition. */
function namesCancer(text: string, phrases: string[]): string | undefined {
  const t = normP(text);
  return phrases.find((p) => (p.length <= 4 ? t === p || new RegExp(`(^|\\s)${esc(p)}(\\s|$)`).test(t) && p.length === 4 : new RegExp(`(^|\\s)${esc(p)}(\\s|$)`).test(t)));
}

// ---------------------------------------------------------------------------------------------------------------------
// Ideas to work on
// ---------------------------------------------------------------------------------------------------------------------
type Central = { drugs: Drug[]; targets: Target[]; cancers: Cancer[] };
/** The key by which the idea's text names the target (CD30 rather than the HGNC symbol TNFRSF8): the word to search by. */
const targetTerm = (i: Idea, t: Target): string => targetKeyIn(ideaText(i), t) ?? t.symbol ?? t.name;
function central(i: Idea): Central {
  const text = ideaText(i);
  return {
    drugs: i.drugs.map((id) => g.get(id) as Drug).filter((d) => d && namesDrug(text, d)).slice(0, MAX_DRUGS),
    targets: i.targets.map((id) => g.get(id) as Target).filter((t) => t && namesTarget(text, t)).slice(0, MAX_TARGETS),
    cancers: i.cancers.map((id) => g.get(id) as Cancer).filter(Boolean).slice(0, MAX_CANCERS),
  };
}
const eligibleActor = (i: Idea) => !i.actor || TRIAL_ACTORS.has(i.actor);
let ideas = (g.kind("idea") as Idea[])
  .filter((i) => (ONLY ? ONLY.includes(i.id) : i.trials.length === 0 || i.keyPapers.length === 0))
  .filter((i) => !(i.id in IDEA_EVIDENCE_SKIP) && !(i.id in ideaLinksWave6))
  .filter((i) => eligibleActor(i) && i.cancers.length > 0 && (i.drugs.length || i.targets.length));
const held = { actor: 0, noCancer: 0, notCentral: 0 };
ideas = ideas.filter((i) => { const c = central(i); if (!c.drugs.length && !c.targets.length) { held.notCentral++; return false; } return true; });
ideas.sort((a, b) => familyRank(a) - familyRank(b) || a.id.localeCompare(b.id));
ideas = ideas.slice(0, MAX);
console.log(`${ideas.length} ideas to look up (drug or target named in the idea's text, a cancer, actor one that trials test); ${held.notCentral} held back because the text names none of their drugs or targets; ${Object.keys(ideaLinksWave6).length} already linked by this wave, ${Object.keys(IDEA_EVIDENCE_SKIP).length} skipped`);

// ---------------------------------------------------------------------------------------------------------------------
// Trials
// ---------------------------------------------------------------------------------------------------------------------
type StudyMatch = { s: CtgovStudy; nct: string; drugs: Drug[]; cancers: Cancer[]; why: string; phase: TrialInput["phase"]; results: boolean; enrolled: number };
const PHASE_MAP: Record<string, TrialInput["phase"]> = { "PHASE2": "2", "PHASE3": "3", "PHASE2|PHASE3": "2/3" };
const STATUS_MAP: Record<string, Trial["status"] | undefined> = { RECRUITING: "recruiting", ACTIVE_NOT_RECRUITING: "active", ENROLLING_BY_INVITATION: "active", NOT_YET_RECRUITING: "planned", COMPLETED: "completed", WITHDRAWN: "withdrawn" };
const statusPhrase: Record<string, string> = { RECRUITING: "now recruiting", ACTIVE_NOT_RECRUITING: "active and no longer recruiting", ENROLLING_BY_INVITATION: "enrolling by invitation", NOT_YET_RECRUITING: "not yet recruiting", COMPLETED: "completed", TERMINATED: "recorded as terminated on the registry", SUSPENDED: "recorded as suspended on the registry", UNKNOWN: "with a status the registry has not verified recently" };

const rejected = new Map<string, number>();
const reject = (why: string) => { rejected.set(why, (rejected.get(why) ?? 0) + 1); return null; };
function verifyStudy(s: CtgovStudy, wanted: { drug?: Drug; target?: Target; technologies: string[] }, cancer: Cancer, phrases: string[]): StudyMatch | null {
  const p = s.protocolSection;
  const nct = p?.identificationModule?.nctId;
  if (!nct || p?.designModule?.studyType !== "INTERVENTIONAL") return reject("not interventional");
  const phases = [...(p.designModule?.phases ?? [])].sort();
  const phase = PHASE_MAP[phases.join("|")];
  if (!phase) return reject(`phase ${phases.join("/") || "not given"}`); // phase 1/2, early phase 1, phase 4 or not applicable
  const status = p.statusModule?.overallStatus ?? "";
  if (status === "WITHDRAWN") return reject("withdrawn");
  const conditions = p.conditionsModule?.conditions ?? [];
  if (!conditions.some((c) => namesCancer(c, phrases))) return reject(`conditions do not name ${cancer.id}`);
  const named = new Map<string, Drug>();
  for (const iv of p.armsInterventionsModule?.interventions ?? []) for (const d of drugsNamedBy(iv)) named.set(d.id, d);
  let why: string;
  if (wanted.drug) {
    if (!named.has(wanted.drug.id)) return reject(`interventions do not name ${wanted.drug.id}`);
    why = `drug ${wanted.drug.id}`;
  } else {
    const carriers = [...named.values()].filter((d) => d.targets.includes(wanted.target!.id) && (!wanted.technologies.length || d.technologies.some((x) => wanted.technologies.includes(x))));
    if (!carriers.length) return reject(`no intervention is a corpus drug carrying ${wanted.target!.id}${wanted.technologies.length ? ` with technology ${wanted.technologies.join("/")}` : ""}${named.size ? ` (corpus drugs named: ${[...named.keys()].join(", ")})` : ""}`);
    why = `target ${wanted.target!.id} via ${carriers.map((d) => d.id).join(", ")}`;
  }
  return { s, nct, drugs: [...named.values()], cancers: [cancer], why: `${why}; ${cancer.id}`, phase, results: !!s.hasResults, enrolled: p.designModule?.enrollmentInfo?.count ?? 0 };
}

const asOf = today();
function buildTrial(idea: Idea, m: StudyMatch): TrialInput {
  const p = m.s.protocolSection!;
  const brief = clean(p.identificationModule?.briefTitle ?? m.nct).replace(/\.$/, "");
  const official = clean(p.identificationModule?.officialTitle ?? brief);
  const sponsor = clean(p.sponsorCollaboratorsModule?.leadSponsor?.name ?? "").trim();
  const status = p.statusModule?.overallStatus ?? "";
  const interventions = (p.armsInterventionsModule?.interventions ?? []).map((iv) => clean(iv.name ?? "")).filter(Boolean);
  const conditions = (p.conditionsModule?.conditions ?? []).map(clean);
  const drugNames = m.drugs.map((d) => d.name);
  const cancerNames = m.cancers.map((c) => c.name.replace(/\s*\(.*$/, ""));
  const enrolled = p.designModule?.enrollmentInfo?.count;
  const start = p.statusModule?.startDateStruct?.date;
  const done = p.statusModule?.primaryCompletionDateStruct?.date;
  const tldr = houseDashes(`A phase ${m.phase} trial of ${drugNames.join(" and ")} in ${cancerNames.join(" and ")}, run by ${sponsor || "the sponsor named on the registry"}, ${statusPhrase[status] ?? "listed on the registry"}.`);
  const summary = houseDashes(`${brief} is a phase ${m.phase} interventional study registered as ${m.nct}${sponsor ? ` by ${sponsor}` : ""}${enrolled ? `, with ${enrolled} participants ${status === "COMPLETED" || status === "TERMINATED" ? "recorded" : "planned"}` : ""}${start ? `, started ${start}` : ""}${done ? ` and ${status === "COMPLETED" ? "reaching" : "due to reach"} its primary completion in ${done}` : ""}. Interventions recorded: ${interventions.join(", ") || "none listed"}. Conditions recorded: ${conditions.join(", ") || "none listed"}.\n\nLinked to the idea "${idea.name}" because the registry names ${drugNames.join(" and ")} among its interventions and ${cancerNames.join(" and ")} among its conditions. Registry record only: no result has been read by an editor.`);
  const mapped = STATUS_MAP[status];
  const companyId = sponsor ? sponsorCompany(sponsor) : undefined;
  return {
    kind: "trial", asOf, id: uniqueId(m.nct.toLowerCase()), name: brief, nct: m.nct, phase: m.phase, ...(mapped ? { status: mapped } : {}), ...(sponsor ? { sponsor } : {}), ...(enrolled ? { enrolled } : {}),
    setting: houseDashes(official), tldr, summary, tags: ["pipeline", "ctgov-ingest"],
    drugs: m.drugs.map((d) => d.id), cancers: m.cancers.map((c) => c.id), ...(companyId ? { companies: [companyId] } : {}),
    links: [{ label: `ClinicalTrials.gov ${m.nct}`, url: `https://clinicaltrials.gov/study/${m.nct}` }],
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Papers
// ---------------------------------------------------------------------------------------------------------------------
type PaperMatch = { r: EpmcResult; title: string; abstract: string; kind: "review" | "phase 2 or 3 results"; about: string; cancer: Cancer; cited: number; year: number; pubTypes: string[] };
const PHASE_TYPE = /^Clinical Trial, Phase (II|III)\b/;
const PHASE_TEXT = /\bphase\s*(2|3|ii|iii)\b/i;
const NOT_RESULTS_TITLE = /\b(protocol|study design|trial design|rationale and design|design and rationale|trial in progress|statistical analysis plan|erratum|correction|corrigendum|plain language summary|commentary|reply|response to|editorial|case report|cost[- ]effectiveness|economic|pharmacokinetic|quality of life|patient[- ]reported)\b/i;

/** A phase 1, first-in-human or dose-finding report is not phase 2 or 3 evidence, whatever its abstract says about the phase 2 dose. */
const EARLY_PHASE_TITLE = /\b(phase\s*(1a|1b|1|Ia|Ib|I|0)(\/|\b)|first[- ]in[- ]human|dose[- ](escalation|finding)|maximum tolerated|pilot study)/i;
function classifyPaper(r: EpmcResult, inTitle: (title: string, abstract: string) => boolean, phrases: string[], cancer: Cancer, about: string): PaperMatch | null {
  if (r.source !== "MED" || !r.pmid || !r.title) return null;
  const pubTypes = r.pubTypeList?.pubType ?? [];
  if (pubTypes.some((t) => NOT_A_PAPER_TYPES.includes(t))) return null;
  const title = clean(r.title);
  const abstract = r.abstractText ? clean(r.abstractText) : "";
  if (!inTitle(title, abstract)) return null; // the drug or target must be in the title
  if (!namesCancer(`${title} ${abstract}`, phrases)) return null;
  if (NOT_RESULTS_TITLE.test(title)) return null;
  const review = pubTypes.some((t) => REVIEW_TYPES.includes(t) || t === "Meta-Analysis");
  let kind: PaperMatch["kind"] | undefined;
  if (review) kind = "review";
  else {
    if (EARLY_PHASE_TITLE.test(title)) return null;
    // Typed by PubMed as a phase 2 or 3 trial or a randomised trial, or the title itself says phase 2 or 3; the abstract alone is not enough.
    const phaseTyped = pubTypes.some((t) => PHASE_TYPE.test(t) || t === "Randomized Controlled Trial") || PHASE_TEXT.test(title);
    const results = RESULTS_ABSTRACT.test(abstract);
    const design = (abstract.match(DESIGN_ABSTRACT)?.length ?? 0) > 0 && !results;
    if (phaseTyped && results && !design) kind = "phase 2 or 3 results";
  }
  if (!kind) return null;
  return { r, title, abstract, kind, about, cancer, cited: r.citedByCount ?? 0, year: Number(r.pubYear ?? 0), pubTypes };
}

const REGISTRY_RE = /\bNCT\d{8}\b/g;
function buildPaper(idea: Idea, m: PaperMatch): PaperInput {
  const r = m.r;
  const { journal, abbrev, id: journalId } = journalName(r, journalByName);
  const abstract = r.abstractText ? abstractParagraphs(r.abstractText) : "";
  const cancerName = m.cancer.name.replace(/\s*\(.*$/, "");
  const cited = [...new Set(`${m.title} ${m.abstract}`.match(REGISTRY_RE) ?? [])];
  const trialId = cited.length === 1 ? trialByNct.get(cited[0].toUpperCase())?.id : undefined;
  const provenance = houseDashes(`Indexed on Europe PMC as PubMed record ${r.pmid}${r.doi ? ` (DOI ${r.doi})` : ""}. Its title names ${m.about} and its text names ${cancerName}; PubMed types it as ${m.kind === "review" ? "a review" : "a clinical trial report"} (${m.pubTypes.filter((t) => t !== "Journal Article").join(", ") || "Journal Article"}). It was matched automatically to the idea "${idea.name}" and no figure has been checked by an editor.`);
  const summary = (abstract ? `${abstract}\n\n` : `Europe PMC indexes no abstract for this record; the title is the only text available.\n\n`) + provenance;
  const tldr = houseDashes(`${m.kind === "review" ? "Review" : "Phase 2 or 3 results paper"} on ${m.about} in ${cancerName}, in ${journal} (${m.year}), one of the most cited Europe PMC records with ${m.about} in its title.`);
  const whatItMeans = houseDashes(`One of the most cited ${m.kind === "review" ? "reviews" : "trial reports"} Europe PMC returns for ${m.about} in ${cancerName}, so it is a natural first reading for anyone weighing the idea it is linked from. The record was linked automatically by title and abstract; read the abstract above and the paper itself before relying on any figure.`);
  const caveats = [
    `Matched by ${m.about} in the title and ${cancerName} in the title or abstract of the Europe PMC record; the summary reproduces the record's abstract and no figure has been verified against the full paper.`,
    ...(m.kind === "review" ? ["A review summarises other studies; the primary reports it cites are the evidence."] : ["Chosen as a phase 2 or 3 report by the record's publication type or its own wording, not by reading the paper."]),
  ];
  const id = uniqueId(`paper-${slug(m.about).slice(0, 30)}-${slug(m.cancer.id).slice(0, 30)}-${slug(abbrev).slice(0, 30) || "journal"}-${m.year}`);
  return {
    kind: "paper", asOf, id, name: m.title.replace(/\.$/, ""), tldr, summary, journal, year: m.year, ...(r.doi ? { doi: r.doi } : {}), pmid: r.pmid!, authors: authorsOf(r.authorString),
    paperType: paperTypeOf(m.pubTypes, m.title, m.abstract), findings: [], whatItMeans, caveats,
    links: [...paperLinks(r, m.year, abbrev), ...(trialId ? [{ label: `ClinicalTrials.gov ${cited[0]}`, url: `https://clinicaltrials.gov/study/${cited[0]}` }] : [])], tags: ["europepmc-ingest"],
    // Only the journal and (when the abstract cites one registry id the corpus holds) the trial; never drugs or cancers.
    ...(journalId ? { journals: [journalId] } : {}), ...(trialId ? { trials: [trialId] } : {}),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------------------------------------------------
const CT_FILTER = "AREA[Phase](PHASE2 OR PHASE3) AND AREA[StudyType]INTERVENTIONAL";
type Outcome = { idea: string; trials: string[]; papers: string[]; note: string };
async function main(): Promise<void> {
  const outcomes: Outcome[] = [];
  const newTrials: TrialInput[] = [];
  const newPapers: PaperInput[] = [];
  const citationRows: Array<{ paperId: string; r: EpmcResult }> = [];
  const newLinks: Record<string, IdeaLinks> = {};
  const newSkips: Record<string, string> = {};
  const tally = { ideasTrials: 0, ideasPapers: 0, trialsNew: 0, trialsExisting: 0, papersNew: 0, papersExisting: 0, studiesSeen: 0, studiesRejected: 0, recordsSeen: 0, recordsRejected: 0, skipped: 0 };

  for (const idea of ideas) {
    const c = central(idea);
    const wantTrials = idea.trials.length === 0 && CLINICAL_MATURITY.has(idea.maturity);
    const wantPapers = idea.keyPapers.length === 0;
    if (!wantTrials && !wantPapers) continue;
    // A drug named only by a token shared with another drug cannot be matched exactly.
    const ambiguous = c.drugs.find((d) => !drugTokens(d).length || [...drugKeys(d)].every((k) => drugByKey.get(k) === null || drugByKey.get(k) === undefined));
    if (ambiguous && !c.targets.length && c.drugs.length === 1) {
      const reason = `drug ${ambiguous.id} has no key of its own (every name it carries is shared with another drug or is a class word)`;
      tally.skipped++; newSkips[idea.id] = reason; outcomes.push({ idea: idea.id, trials: [], papers: [], note: `skipped: ${reason}` }); continue;
    }
    const why: string[] = [];
    const trialIds: string[] = [];
    const paperIds: string[] = [];
    if (DEBUG) console.log(`\n${idea.id} (${idea.maturity}, ${idea.actor ?? "no actor"}): drugs ${c.drugs.map((d) => d.id).join(", ") || "-"}; targets ${c.targets.map((t) => t.id).join(", ") || "-"}; cancers ${c.cancers.map((x) => x.id).join(", ")}`);

    if (wantTrials) {
      const matches = new Map<string, StudyMatch>();
      for (const cancer of c.cancers) {
        const phrases = cancerPhrases(cancer);
        const cond = cancerParts(cancer.name)[0] ?? cancer.name;
        const searches: Array<{ params: Record<string, string>; wanted: { drug?: Drug; target?: Target; technologies: string[] } }> = [
          ...c.drugs.map((d) => ({ params: { "query.intr": d.name, "query.cond": cond, "filter.advanced": CT_FILTER }, wanted: { drug: d, technologies: idea.technologies } })),
          ...c.targets.map((t) => ({ params: { "query.term": targetTerm(idea, t), "query.cond": cond, "filter.advanced": CT_FILTER }, wanted: { target: t, technologies: idea.technologies } })),
        ];
        for (const { params, wanted } of searches) {
          const res = await ctgovSearch(params, { pageSize: 50, force: FORCE });
          if (!res) continue;
          for (const s of res.studies ?? []) {
            tally.studiesSeen++;
            const m = verifyStudy(s, wanted, cancer, phrases);
            if (!m) { tally.studiesRejected++; continue; }
            if (!matches.has(m.nct)) matches.set(m.nct, m);
          }
          if (DEBUG) { console.log(`  CT.gov ${JSON.stringify(params)}: ${res.totalCount ?? 0} hits, ${matches.size} verified so far`); for (const [w, n] of [...rejected.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)) console.log(`    rejected ${n}: ${w}`); rejected.clear(); }
        }
      }
      const ranked = [...matches.values()].sort((a, b) => (a.phase === "3" ? 0 : a.phase === "2/3" ? 1 : 2) - (b.phase === "3" ? 0 : b.phase === "2/3" ? 1 : 2) || Number(b.results) - Number(a.results) || b.enrolled - a.enrolled || a.nct.localeCompare(b.nct));
      for (const m of ranked.slice(0, TRIAL_CAP)) {
        const existing = trialByNct.get(m.nct);
        if (existing) { tally.trialsExisting++; trialIds.push(existing.id); why.push(`trial ${existing.id}: ${m.why} (corpus record)`); continue; }
        const t = buildTrial(idea, m);
        newTrials.push(t); trialByNct.set(m.nct, t as unknown as Trial); tally.trialsNew++;
        trialIds.push(t.id); why.push(`trial ${t.id}: ${m.why} (registry record written)`);
      }
      if (trialIds.length) tally.ideasTrials++;
    }

    if (wantPapers) {
      const found = new Map<string, PaperMatch>();
      for (const cancer of c.cancers) {
        const phrases = cancerPhrases(cancer);
        const parts = cancerParts(cancer.name).slice(0, 3);
        const cancerQuery = parts.map((p) => `TITLE:"${p}" OR ABSTRACT:"${p}"`).join(" OR ");
        const subjects: Array<{ inTitle: (title: string, abstract: string) => boolean; about: string; term: string }> = [
          ...c.drugs.filter((d) => drugTokens(d).length).map((d) => ({ inTitle: (title: string) => !!mentions(title, drugTokens(d)), about: d.name, term: d.name })),
          // The key must be in the title; when it is ambiguous (FAP, MET) a second key of the target may sit in the abstract.
          ...c.targets.map((t) => ({ inTitle: (title: string, abstract: string) => !!mentionsKey(title, targetKeys(t)) && !!targetKeyIn(`${title} ${abstract}`, t), about: targetTerm(idea, t), term: targetTerm(idea, t) })),
        ];
        for (const sub of subjects) {
          const res = await epmcSearch(`TITLE:"${sub.term}" AND (${cancerQuery}) AND SRC:MED`, { pageSize: 25, force: FORCE });
          if (!res) continue;
          for (const r of res.resultList?.result ?? []) {
            tally.recordsSeen++;
            const m = classifyPaper(r, sub.inTitle, phrases, cancer, sub.about);
            if (!m) { tally.recordsRejected++; continue; }
            if (!found.has(r.pmid!)) found.set(r.pmid!, m);
          }
          if (DEBUG) console.log(`  Europe PMC ${sub.term} + ${parts.join("/")}: ${res.hitCount ?? 0} hits, ${found.size} kept so far`);
        }
      }
      const ranked = [...found.values()].sort((a, b) => b.cited - a.cited || b.year - a.year);
      for (const m of ranked.slice(0, PAPER_CAP)) {
        const existing = (m.r.doi && papersByDoi.get(normDoi(m.r.doi)!)) || papersByPmid.get(m.r.pmid!);
        if (existing) { tally.papersExisting++; paperIds.push(existing.id); why.push(`paper ${existing.id}: ${m.kind}, ${m.about} in ${m.cancer.id} (corpus record)`); continue; }
        const paper = buildPaper(idea, m);
        newPapers.push(paper); citationRows.push({ paperId: paper.id, r: m.r }); tally.papersNew++;
        const d = normDoi(paper.doi); if (d) papersByDoi.set(d, paper as unknown as Paper); papersByPmid.set(paper.pmid!, paper as unknown as Paper);
        paperIds.push(paper.id); why.push(`paper ${paper.id}: ${m.kind}, ${m.about} in ${m.cancer.id}, ${m.cited} citations`);
        if (DEBUG) console.log(`  paper ${m.r.pmid} ${m.year} cited ${m.cited} ${m.kind} | ${m.title.slice(0, 120)}`);
      }
      if (paperIds.length) tally.ideasPapers++;
    }

    if (trialIds.length || paperIds.length) newLinks[idea.id] = { trials: trialIds, keyPapers: paperIds, why };
    outcomes.push({ idea: idea.id, trials: trialIds, papers: paperIds, note: `${wantTrials ? `trials ${trialIds.length}` : "trials not wanted"}; ${wantPapers ? `papers ${paperIds.length}` : "papers not wanted"}` });
  }

  for (const o of outcomes) console.log(`${o.idea.padEnd(52)} ${o.note}${o.trials.length ? `  [${o.trials.join(", ")}]` : ""}${o.papers.length ? `  [${o.papers.join(", ")}]` : ""}`);
  console.log(`\n${ideas.length} ideas looked up, ${requestCount()} requests made (the rest from cache).`);
  console.log(`ideas gaining trials ${tally.ideasTrials} (${tally.trialsNew} registry records written, ${tally.trialsExisting} corpus trials linked; ${tally.studiesSeen} studies seen, ${tally.studiesRejected} rejected on drug, cancer, phase or status); ideas gaining papers ${tally.ideasPapers} (${tally.papersNew} new paper records, ${tally.papersExisting} existing reused; ${tally.recordsSeen} records seen, ${tally.recordsRejected} rejected); skipped ${tally.skipped}`);

  if (!APPLY) { console.log("\nDry run: pass --apply to write src/data/trials-ideas-wave6.ts, src/data/papers-ideas-wave6.ts and src/data/idea-links-wave6.ts"); return; }

  const trialLine = (t: TrialInput): string => { const { kind: _k, asOf: _a, ...rest } = t; void _k; void _a; return `  t({ ${Object.entries(rest).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")} }),`; };
  const allTrials = [...trialsIdeasWave6, ...newTrials];
  writeFileSync(TRIALS_FILE, `import type { TrialInput } from "@/lib/schema";

const asOf = "${asOf}";
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });

/**
 * Wave 6 of docs/CONTENT-ROADMAP.md: registry trials behind ideas that had none. Written by scripts/fetch-idea-evidence.ts,
 * which searches ClinicalTrials.gov API v2 by the drug or target an idea's own text names plus one of the idea's cancers
 * and keeps an interventional phase 2 or 3 study only when the registry's intervention list names a corpus drug (the
 * idea's drug, or a drug carrying the idea's target) and its condition list names the idea's cancer. Title, phase,
 * status, sponsor, enrolment, dates, interventions and conditions come from the registry; drugs, cancers and companies
 * are the corpus records those fields matched. No outcomes: nothing here has been read by an editor. Ideas link to
 * these records through src/data/idea-links-wave6.ts. Do not edit by hand; re-run the script.
 */
export const trialsIdeasWave6: TrialInput[] = [
${allTrials.map(trialLine).join("\n")}
];
`);
  const allPapers = [...papersIdeasWave6, ...newPapers];
  writePapersFile(PAPERS_FILE, "papersIdeasWave6", asOf, `/**
 * Wave 6 of docs/CONTENT-ROADMAP.md: key papers for ideas that had none. Written by scripts/fetch-idea-evidence.ts,
 * which asks Europe PMC for PubMed records whose title names the drug or target an idea's own text names and whose
 * text names one of the idea's cancers, keeping only reviews and phase 2 or 3 results papers, most cited first. Title,
 * journal, year, DOI, PMID and authors are read from the Europe PMC record; the summary reproduces the record's
 * abstract with markup removed and house-style dashes; the TL;DR, "what it means" and caveats say only how the record
 * was matched. Records link the journal (and a trial when the abstract cites exactly one registry id the corpus holds),
 * never drugs or cancers. Nothing here has been read by an editor: findings are left empty on purpose. Ideas link to
 * these records through src/data/idea-links-wave6.ts. Do not edit by hand; re-run the script.
 */`, allPapers);
  const allLinks = { ...ideaLinksWave6, ...newLinks };
  const allSkips = { ...IDEA_EVIDENCE_SKIP, ...newSkips };
  writeFileSync(LINKS_FILE, `/**
 * Idea to trial and idea to key-paper links written by scripts/fetch-idea-evidence.ts (wave 6 of docs/CONTENT-ROADMAP.md).
 * Each entry names the trial records (in src/data/trials-ideas-wave6.ts or elsewhere in the corpus) and the paper records
 * (in src/data/papers-ideas-wave6.ts or elsewhere) an idea's page should list, with the reason each was matched.
 * src/data/index.ts merges them into the idea's \`trials\` and \`keyPapers\`. IDEA_EVIDENCE_SKIP lists ideas the script will
 * not retry because the match was ambiguous, with the reason; clear an entry to try again. Do not edit by hand; re-run
 * the script.
 */
export type IdeaLinks = { trials: string[]; keyPapers: string[]; why: string[] };

export const ideaLinksWave6: Record<string, IdeaLinks> = {
${recordLines(allLinks)}
};

export const IDEA_EVIDENCE_SKIP: Record<string, string> = {
${recordLines(allSkips)}
};
`);
  const counts = recordCitations(citationRows, asOf);
  console.log(`\nWrote ${allTrials.length} trial records, ${allPapers.length} paper records and ${Object.keys(allLinks).length} idea links (${Object.keys(allSkips).length} skips); ${counts} citation counts added.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
