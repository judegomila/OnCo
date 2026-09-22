/**
 * Roadmap watch: the comparison logic and report shape shared by scripts/roadmap-watch.ts (which talks to
 * ClinicalTrials.gov and Europe PMC) and the "Registry check" line on roadmap pages (which reads the committed
 * public/roadmap-watch.json). Pure functions only: no network, no node:fs, safe in any bundle.
 */
import type { Roadmap, Trial } from "./schema";

/** What ClinicalTrials.gov v2 says about one study, trimmed to the fields the corpus can contradict. */
export type RegistryRecord = {
  nct: string;
  status?: string;
  /** DesignModule.phases, e.g. ["PHASE2", "PHASE3"]; absent or ["NA"] for observational studies. */
  phases?: string[];
  studyType?: string;
  enrolment?: number;
  enrolmentType?: string;
  primaryCompletion?: string;
  completion?: string;
  lastUpdate?: string;
};

export type WatchPaper = { pmid?: string; doi?: string; title: string; journal?: string; date?: string };

export type TrialCheck = {
  id: string;
  name: string;
  nct?: string;
  corpus: { status?: string; phase: string; enrolled?: number; yearReported?: number };
  /** Null when the registry was not asked (offline) or returned nothing for this id. */
  registry: RegistryRecord | null;
  contradictions: string[];
  papers: WatchPaper[];
};

export type WatchItemCheck = {
  item: string;
  expected?: string;
  source?: string;
  refs: string[];
  passed: boolean;
  contradictions: string[];
};

export type RoadmapWatchEntry = {
  id: string;
  name: string;
  asOf: string;
  /** Publications searched from this date (the roadmap's asOf unless --since overrode it). */
  since: string;
  counts: { trials: number; checked: number; contradictions: number; papers: number; watch: number; watchPassed: number };
  trials: TrialCheck[];
  watch: WatchItemCheck[];
  /** Every contradiction on the roadmap, flattened for rendering: which record, in plain words. */
  contradictions: Array<{ ref: string; name: string; text: string }>;
};

export type RoadmapWatchReport = {
  /** Date of the run (YYYY-MM-DD). */
  generatedAt: string;
  offline: boolean;
  requests: number;
  roadmaps: RoadmapWatchEntry[];
};

/** Registry statuses that mean the study is no longer running. */
const CLOSED = new Set(["COMPLETED", "TERMINATED", "WITHDRAWN", "SUSPENDED"]);
const OPEN = new Set(["RECRUITING", "NOT_YET_RECRUITING", "ENROLLING_BY_INVITATION"]);
const RESULT_STATUSES = new Set(["positive", "negative", "mixed"]);

function plain(reg: string): string {
  return reg.toLowerCase().replace(/_/g, " ");
}

/**
 * The corpus's status vocabulary against the registry's; only clear contradictions are flagged, and UNKNOWN on the
 * registry side never is (it means the sponsor stopped updating, which is not a fact about the trial).
 */
export function statusContradiction(corpus: string | undefined, reg: string | undefined): string | null {
  if (!corpus || !reg || reg === "UNKNOWN") return null;
  const r = plain(reg);
  switch (corpus) {
    case "recruiting":
      return OPEN.has(reg) ? null : `corpus says recruiting, registry says ${r}`;
    case "active":
      return CLOSED.has(reg) ? `corpus says active, registry says ${r}` : null;
    case "completed":
      return CLOSED.has(reg) ? null : `corpus says completed, registry says ${r}`;
    case "planned":
      return reg === "NOT_YET_RECRUITING" ? null : `corpus says planned, registry says ${r}`;
    case "withdrawn":
      return reg === "WITHDRAWN" || reg === "TERMINATED" ? null : `corpus says withdrawn, registry says ${r}`;
    default:
      if (RESULT_STATUSES.has(corpus) && (reg === "WITHDRAWN" || reg === "NOT_YET_RECRUITING")) return `corpus records a ${corpus} result, registry says ${r}`;
      return null;
  }
}

/** Enrolment differs by more than `tolerance` (default 5 percent) of the registry figure; the registry's ESTIMATED or ACTUAL label is quoted when known. */
export function enrolmentContradiction(corpus: number | undefined, reg: number | undefined, tolerance = 0.05, regType?: string): string | null {
  if (!corpus || !reg) return null;
  const diff = Math.abs(corpus - reg);
  if (diff <= reg * tolerance) return null;
  const pct = Math.round((diff / reg) * 100);
  const label = regType ? `${regType.toLowerCase()}; ` : "";
  return `enrolment ${corpus} in the corpus, ${reg} on the registry (${label}${pct} percent apart)`;
}

/** Registry phases for each corpus phase; any overlap is agreement. Platform trials are not phase-checked. */
const PHASE_MAP: Record<string, string[]> = {
  "1": ["EARLY_PHASE1", "PHASE1"],
  "1/2": ["PHASE1", "PHASE2"],
  "2": ["PHASE2"],
  "2/3": ["PHASE2", "PHASE3"],
  "3": ["PHASE3"],
  "4": ["PHASE4"],
};

export function phaseContradiction(corpusPhase: string, reg: Pick<RegistryRecord, "phases" | "studyType">): string | null {
  const regPhases = (reg.phases ?? []).filter((p) => p !== "NA");
  if (corpusPhase === "platform") return null;
  if (corpusPhase === "observational") {
    if (reg.studyType && reg.studyType !== "OBSERVATIONAL") return `corpus says observational, registry lists an ${plain(reg.studyType)} study${regPhases.length ? ` in ${regPhases.map(plain).join(" and ")}` : ""}`;
    return null;
  }
  if (!regPhases.length) return null;
  const want = PHASE_MAP[corpusPhase];
  if (!want) return null;
  if (want.some((p) => regPhases.includes(p))) return null;
  return `corpus says phase ${corpusPhase}, registry says ${regPhases.map(plain).join(" and ")}`;
}

/** Pooled names ("SOFT & TEXT", "ROMANA 1 and ROMANA 2") stand for more than one study, so figures cannot be compared with a single registry record. */
export function isPooledName(name: string): boolean {
  const base = name.replace(/\s*\([^)]*\)\s*$/, "");
  return /\s&\s|\band\b|,/.test(base);
}

/** The first date-like token in a watch item's `expected`, widened to the end of its precision: "2026" -> 2026-12-31, "2026-09" -> 2026-09-30. */
export function expectedDeadline(expected: string | undefined): string | null {
  if (!expected) return null;
  const q = expected.match(/\bQ([1-4])\s*(\d{4})\b|\b(\d{4})[-\s]?Q([1-4])\b/i);
  if (q) {
    const year = q[2] ?? q[3];
    const quarter = Number(q[1] ?? q[4]);
    return `${year}-${String(quarter * 3).padStart(2, "0")}-${quarter === 1 || quarter === 4 ? "31" : "30"}`;
  }
  // Prefer the most precise token: "ASCO 2027 (2027-06)" reads as June 2027, not the whole year.
  const tokens = [...expected.matchAll(/\b(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?\b/g)].sort((a, b) => b[0].length - a[0].length);
  const m = tokens[0];
  if (!m) return null;
  const [, y, mo, d] = m;
  if (d) return `${y}-${mo}-${d}`;
  if (mo) {
    const last = new Date(Date.UTC(Number(y), Number(mo), 0)).getUTCDate();
    return `${y}-${mo}-${String(last).padStart(2, "0")}`;
  }
  return `${y}-12-31`;
}

/** True when the watch item's expected date is strictly before `today` (YYYY-MM-DD). */
export function expectedPassed(expected: string | undefined, today: string): boolean {
  const deadline = expectedDeadline(expected);
  return !!deadline && deadline < today;
}

/** Same calendar month, tolerating day and precision differences between a quoted date and a registry date. */
function sameMonth(a: string, b: string): boolean {
  return a.slice(0, 7) === b.slice(0, 7);
}

/**
 * A watch item quoting a ClinicalTrials.gov completion date is contradicted when the registry no longer lists that
 * month as either the primary or the study completion date. Items sourced elsewhere (meetings, press) are not checked.
 */
export function watchDateContradiction(w: { expected?: string; source?: string }, reg: RegistryRecord | null | undefined): string | null {
  if (!w.expected || !w.source || !reg || !/clinicaltrials\.gov/i.test(w.source)) return null;
  const m = w.expected.match(/^(\d{4}-\d{2})(?:-\d{2})?/);
  if (!m) return null;
  const dates = [reg.primaryCompletion, reg.completion].filter((d): d is string => !!d);
  if (!dates.length) return null;
  if (dates.some((d) => sameMonth(d, m[1]))) return null;
  return `watch item expects ${w.expected}; the registry now lists primary completion ${reg.primaryCompletion ?? "not stated"} and completion ${reg.completion ?? "not stated"}`;
}

/** Every trial a roadmap points at: its `trials` array, its steps' refs and its watch items' refs, in name order. */
export function roadmapTrials(rm: Roadmap, get: (id: string) => unknown): Trial[] {
  const ids = new Set<string>(rm.trials);
  for (const s of rm.steps) for (const id of s.refs) ids.add(id);
  for (const w of rm.watch) for (const id of w.refs) ids.add(id);
  return [...ids].map((id) => get(id)).filter((e): e is Trial => !!e && (e as { kind?: string }).kind === "trial").sort((a, b) => a.name.localeCompare(b.name));
}

/** Registry ids the v2 API can answer for. */
export function isNct(id: string | undefined): id is string {
  return !!id && /^NCT\d{8}$/.test(id);
}

/** KEYNOTE-671, CheckMate 9LA, OlympiA, monarchE, NRG-GI008, Krascendo 1; not "Head", "Childhood Cancer Survivor" or "first-line melanoma". */
const ACRONYM = /^[A-Za-z][A-Za-z0-9-]{2,}(\s[A-Za-z0-9-]+){0,4}$/;
const tokenLike = (w: string): boolean => /[A-Z0-9]/.test(w.slice(1));
function looksLikeAcronym(p: string, calledStudy: boolean): boolean {
  if (p.length < 4 || !ACRONYM.test(p) || /^(NCT|ISRCTN|NTR|ACTRN)\d/.test(p)) return false;
  const words = p.split(/\s+/);
  if (words.length === 1) return tokenLike(p) || calledStudy;
  return tokenLike(words[0]) || /\d/.test(words[words.length - 1]);
}
/** "ROMANA 1 and ROMANA 2" pools two studies; "JAVELIN Head and Neck 100" is one name. Split on "and" only before another acronym-like token. */
const splitPooled = (s: string): string[] => s.split(/\s*(?:\/|&|,)\s*|\s+and\s+(?=[A-Z][A-Z0-9-]+\b)/);

/**
 * Search terms for a trial: the acronyms in its name and aka fields ("KEYNOTE-671", "CheckMate 9LA", "SOFT" and
 * "TEXT" from "SOFT & TEXT"), never descriptive titles or registry ids. A trailing "trial", "study" or "platform" is
 * dropped, and is what lets a plain word such as "Vanguard Study" through.
 */
export function trialAcronyms(t: Pick<Trial, "name" | "aka">): string[] {
  const out = new Set<string>();
  const consider = (s: string) => {
    const base = s.replace(/\s*\([^)]*\)\s*$/, "").trim();
    for (const part of splitPooled(base)) {
      const trimmed = part.trim();
      const p = trimmed.replace(/\s+(trial|study|platform)$/i, "");
      if (looksLikeAcronym(p, p !== trimmed)) out.add(p);
    }
  };
  consider(t.name);
  for (const a of t.aka ?? []) consider(a);
  return [...out];
}

/** All contradictions for one trial against its registry record, in plain words. */
export function trialContradictions(t: Pick<Trial, "name" | "status" | "phase" | "enrolled">, reg: RegistryRecord | null | undefined): string[] {
  if (!reg) return [];
  const out: string[] = [];
  const s = statusContradiction(t.status, reg.status);
  if (s) out.push(s);
  if (!isPooledName(t.name)) {
    const p = phaseContradiction(t.phase, reg);
    if (p) out.push(p);
    const e = enrolmentContradiction(t.enrolled, reg.enrolment, 0.05, reg.enrolmentType);
    if (e) out.push(e);
  }
  return out;
}

/** Deduplicate papers by DOI, then PMID, then title; newest first. */
export function dedupePapers(papers: WatchPaper[]): WatchPaper[] {
  const seen = new Set<string>();
  const out: WatchPaper[] = [];
  for (const p of papers) {
    const key = p.doi ? `doi:${p.doi.toLowerCase()}` : p.pmid ? `pmid:${p.pmid}` : `title:${p.title.toLowerCase().trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** The report's entry for one roadmap, or undefined when the file does not cover it. */
export function entryFor(report: RoadmapWatchReport | undefined | null, roadmapId: string): RoadmapWatchEntry | undefined {
  return report?.roadmaps.find((r) => r.id === roadmapId);
}
