/**
 * Weekly re-check, part 1: trial registry drift.
 *
 * For every trial record and each ClinicalTrials.gov registration that is its own (ownRegistryIds in
 * scripts/trial-participation.ts: a linked study the record only cites is not compared), the registry's status, phase,
 * enrolment, primary completion date and lead sponsor are compared with what OnCo holds.
 *
 * This file only reports. The updates themselves are made by the two generators that already own them, run by
 * scripts/weekly-recheck.ts after this check from the same registry reading:
 *   scripts/fetch-registry-status.ts         writes src/data/trial-registry-status.ts (the status a page shows)
 *   scripts/refresh-trial-participation.ts   writes src/data/trial-participation.ts (the registry fields beside it)
 * Their rules stand: a result status (positive, negative, mixed) is never replaced, and an editor's "historic" label
 * is kept; a historic record the registry still calls open is reported here for a hand check.
 *
 * What a person or an agent must read is the text. A status can be corrected by a generator; a sentence that says
 * "results are awaited" cannot. So a study that has moved to completed, terminated or withdrawn, or has posted results
 * since the record was last checked, is listed with the words in the record that may now be wrong.
 */
import { REGISTRY_TO_CORPUS, registryStatusLabel } from "../../src/lib/registry-status";
import { unexpectedSharedRegistrations } from "../trial-participation";
import type { Finding, Net } from "./lib";

export const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies";
/** The fields read. The status module is the one scripts/fetch-registry-status.ts reads from its cache. */
export const REGISTRY_FIELDS = "NCTId,OverallStatus,WhyStopped,PrimaryCompletionDate,PrimaryCompletionDateType,LastUpdatePostDate,ResultsFirstPostDate,Phase,EnrollmentCount,EnrollmentType,LeadSponsorName,HasResults";

type DateStruct = { date?: string; type?: string };
/** A study as the v2 API returns it for REGISTRY_FIELDS. */
export type RawStudy = {
  protocolSection?: {
    identificationModule?: { nctId?: string };
    statusModule?: { overallStatus?: string; whyStopped?: string; primaryCompletionDateStruct?: DateStruct; lastUpdatePostDateStruct?: DateStruct; resultsFirstPostDateStruct?: DateStruct };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    designModule?: { phases?: string[]; enrollmentInfo?: { count?: number; type?: string } };
  };
  hasResults?: boolean;
};

export type RegistryStudy = {
  nct: string; overallStatus?: string; whyStopped?: string; primaryCompletion?: string; primaryCompletionType?: string; lastUpdate?: string;
  resultsFirstPosted?: string; hasResults: boolean; phases: string[]; enrolment?: number; enrolmentType?: string; leadSponsor?: string;
};

export function parseStudy(raw: RawStudy): RegistryStudy | undefined {
  const p = raw.protocolSection ?? {};
  const nct = p.identificationModule?.nctId;
  if (!nct) return undefined;
  const sm = p.statusModule ?? {};
  return {
    nct, overallStatus: sm.overallStatus, whyStopped: sm.whyStopped?.replace(/\s+/g, " ").trim() || undefined,
    primaryCompletion: sm.primaryCompletionDateStruct?.date, primaryCompletionType: sm.primaryCompletionDateStruct?.type,
    lastUpdate: sm.lastUpdatePostDateStruct?.date, resultsFirstPosted: sm.resultsFirstPostDateStruct?.date, hasResults: raw.hasResults === true,
    phases: p.designModule?.phases ?? [], enrolment: p.designModule?.enrollmentInfo?.count, enrolmentType: p.designModule?.enrollmentInfo?.type,
    leadSponsor: p.sponsorCollaboratorsModule?.leadSponsor?.name,
  };
}

/** What the check needs of a trial record. `text` is the tldr and summary as a reader sees them. */
export type TrialView = {
  id: string; status?: string; phase?: string; sponsor?: string; enrolled?: number; enrolledBasis?: string; asOf: string;
  /** Written by the registry ingest (tag `ctgov-ingest`), so its sponsor and figures are the registry's own words. */
  ingest: boolean; text: string; outcomes: number;
  /** How many registrations are the record's own. A record that stands for several studies has no single phase or enrolment to compare. */
  registrations?: number;
};
/** What OnCo last read from the registry for this registration (src/data/trial-participation.ts, or the status side file). */
export type PriorReading = { overallStatus?: string; leadSponsor?: string; enrolment?: number; enrolmentType?: string };

const CLOSED = new Set(["COMPLETED", "TERMINATED", "WITHDRAWN"]);
const OPEN = new Set(["RECRUITING", "NOT_YET_RECRUITING", "ENROLLING_BY_INVITATION", "ACTIVE_NOT_RECRUITING"]);
const RESULT_STATUSES = new Set(["positive", "negative", "mixed"]);
const RUNNING_STATUSES = new Set(["planned", "recruiting", "active"]);

/**
 * Words that say a trial is still running or has not reported. Whole words only: a fragment would match inside
 * another word, which is how a myeloma warning once reached every fluoropyrimidine page.
 */
const RUNNING_WORDS = /\b(awaited|awaiting|ongoing|not yet recruiting|(?<!\b(?:not|longer|stopped|finished|completed|closed to) )recruiting|enrolling|not yet reported|yet to report|results? (?:is|are) (?:expected|due|pending)|still running|under way|underway|due to reach its primary completion|planned to start)\b/i;
export const runningWords = (text: string): string | undefined => RUNNING_WORDS.exec(text)?.[0];

/** Registry phases to the corpus's form: ["PHASE1","PHASE2"] is "1/2". Undefined where the registry names no numbered phase. */
export function corpusPhase(phases: string[]): string | undefined {
  const n = [...new Set(phases.map((p) => (p === "EARLY_PHASE1" ? "1" : /^PHASE([1-4])$/.exec(p)?.[1])).filter((x): x is string => !!x))].sort();
  return n.length ? n.join("/") : undefined;
}

const sameName = (a: string, b: string) => a.replace(/\s+/g, " ").trim().toLowerCase() === b.replace(/\s+/g, " ").trim().toLowerCase();
const studyUrl = (nct: string) => `https://clinicaltrials.gov/study/${nct}`;

/** Compare one record with one of its own registrations. `study` is undefined when the registry did not return the number. */
export function compareTrial(t: TrialView, nct: string, study: RegistryStudy | undefined, prior?: PriorReading): Finding[] {
  const base = { kind: "trials" as const, recordId: t.id, recordKind: "trial", url: studyUrl(nct) };
  if (!study) return [{ ...base, type: "not-returned", severity: "medium", onco: `registered as ${nct}`, source: "ClinicalTrials.gov did not return this number", note: "Check the number against the record's sources." }];
  const out: Finding[] = [];
  const now = study.overallStatus;
  const words = runningWords(t.text);
  const said = words ? `; text says "${words}"` : "";

  // Status. "Moved" is measured from OnCo's last reading of the registry where there is one, so a study is listed in
  // the week it changes and not every week after.
  if (now) {
    const mapped = REGISTRY_TO_CORPUS[now];
    const before = prior?.overallStatus;
    const moved = before ? before !== now : !!mapped && !!t.status && !RESULT_STATUSES.has(t.status) && t.status !== "historic" && t.status !== mapped;
    const was = before ? `; registry last read as ${registryStatusLabel(before)}` : "";
    const why = study.whyStopped ? `: ${study.whyStopped}` : "";
    if (t.status === "historic") {
      // The label is an editor's and is kept. Only a registry that still calls the study open disagrees with it.
      if (OPEN.has(now)) out.push({ ...base, type: "historic-but-open", severity: "medium", onco: `status "historic"${was}`, source: registryStatusLabel(now), date: study.lastUpdate, note: "The historic label is kept. Check by hand whether the registry or the label is out of date." });
    } else if (moved && CLOSED.has(now)) {
      // Most serious where the page still says the trial is running, or still shows a running status for a study that was stopped.
      const aligned = t.status === mapped;
      out.push({ ...base, type: "status-moved-to-closed", severity: words || (!aligned && now !== "COMPLETED") ? "high" : aligned ? "low" : "medium", onco: `status "${t.status ?? "unset"}"${was}${said}`, source: `${registryStatusLabel(now)}${why}`, date: study.lastUpdate,
        note: RESULT_STATUSES.has(t.status ?? "") ? "The record's result status is kept; read its text against the registry." : "The status is updated by the generator; the record's text is not." });
    } else if (moved) {
      out.push({ ...base, type: "status-moved", severity: now === "SUSPENDED" ? "medium" : "low", onco: `status "${t.status ?? "unset"}"${was}`, source: `${registryStatusLabel(now)}${why}`, date: study.lastUpdate });
    }
  }

  // Posted results the record has not been read against.
  if (study.hasResults && study.resultsFirstPosted && study.resultsFirstPosted > t.asOf) {
    const running = RUNNING_STATUSES.has(t.status ?? "");
    const hasVerdict = RESULT_STATUSES.has(t.status ?? "") && t.outcomes > 0;
    out.push({ ...base, type: "results-posted", severity: words || running ? "high" : hasVerdict ? "low" : "medium", onco: `last checked ${t.asOf}; status "${t.status ?? "unset"}"; ${t.outcomes} outcome${t.outcomes === 1 ? "" : "s"} recorded${said}`, source: `results first posted ${study.resultsFirstPosted}`, date: study.resultsFirstPosted });
  }

  // Phase, where both sides name a numbered phase.
  const single = (t.registrations ?? 1) === 1;
  const phase = corpusPhase(study.phases);
  if (single && phase && t.phase && /^[1-4](\/[1-4])?$/.test(t.phase) && phase !== t.phase) out.push({ ...base, type: "phase", severity: "medium", onco: `phase ${t.phase}`, source: `phase ${phase}`, date: study.lastUpdate });

  // Enrolment, only where the record's figure is the registry's (enrolledBasis "registry"): a number randomised or
  // analysed comes from a paper and is not expected to match.
  if (single && t.enrolledBasis === "registry" && t.enrolled !== undefined && study.enrolment !== undefined && t.enrolled !== study.enrolment) {
    const big = Math.abs(study.enrolment - t.enrolled) >= 0.25 * Math.max(t.enrolled, 1);
    const nowActual = study.enrolmentType === "ACTUAL" && prior?.enrolmentType === "ESTIMATED";
    out.push({ ...base, type: "enrolment", severity: big || nowActual ? "medium" : "low", onco: `${t.enrolled} participants (registry figure)`, source: `${study.enrolment}${study.enrolmentType ? ` (${study.enrolmentType.toLowerCase()})` : ""}`, date: study.lastUpdate });
  }

  // Primary completion: the date a registry-written summary states, or a completion reached since the record was checked.
  const stated = /primary completion (?:in|on) (\d{4}-\d{2}(?:-\d{2})?)/i.exec(t.text)?.[1];
  const pc = study.primaryCompletion;
  if (pc && stated && stated !== pc) {
    out.push({ ...base, type: "primary-completion", severity: study.primaryCompletionType === "ACTUAL" && /due to reach its primary completion/i.test(t.text) ? "medium" : "low", onco: `text gives primary completion ${stated}`, source: `${pc}${study.primaryCompletionType ? ` (${study.primaryCompletionType.toLowerCase()})` : ""}`, date: study.lastUpdate });
  } else if (pc && !stated && study.primaryCompletionType === "ACTUAL" && pc.padEnd(10, "-28") > t.asOf && RUNNING_STATUSES.has(t.status ?? "")) {
    out.push({ ...base, type: "primary-completion-reached", severity: "medium", onco: `last checked ${t.asOf}; status "${t.status}"${said}`, source: `primary completion reached ${pc}`, date: pc });
  }

  // Sponsor: against OnCo's last registry reading where there is one (a hand-written sponsor is often a shorter name
  // for the same body, and that is not drift); otherwise only for an ingested record, whose sponsor is the registry's.
  if (study.leadSponsor && !(t.sponsor && sameName(t.sponsor, study.leadSponsor))) {
    if (prior?.leadSponsor) { if (!sameName(prior.leadSponsor, study.leadSponsor)) out.push({ ...base, type: "sponsor", severity: "medium", onco: `sponsor "${t.sponsor ?? "unset"}"; registry last read as "${prior.leadSponsor}"`, source: study.leadSponsor, date: study.lastUpdate }); }
    else if (t.ingest && t.sponsor && !sameName(t.sponsor, study.leadSponsor)) out.push({ ...base, type: "sponsor", severity: "medium", onco: `sponsor "${t.sponsor}"`, source: study.leadSponsor, date: study.lastUpdate });
  }
  return out;
}

/**
 * One registration carried by two records that SHARED_REGISTRATIONS does not name as a pair: usually a registry ingest
 * beside a curated record of the same study. scripts/refresh-trial-participation.ts stops on it by design, since
 * that is how one trial came to show another's sites, so it is reported here where a person will see it.
 */
export function sharedRegistrationFindings(rows: Array<{ id: string; ncts: string[] }>): Finding[] {
  return unexpectedSharedRegistrations(rows).map(({ nct, records }) => ({
    kind: "trials" as const, type: "shared-registration", severity: "high" as const, recordId: records[0], recordKind: "trial", url: studyUrl(nct),
    onco: `${records.length} records carry ${nct}: ${records.join(", ")}`, source: "one registration, one study",
    note: "The participation refresh stops until this is settled: merge the records (docs/DUPLICATE-RECORDS.md), or name the pair in SHARED_REGISTRATIONS with the reason.",
  }));
}

/**
 * Read the registry for these numbers, 100 a request. A batch that fails is named in `failed` and its numbers are
 * absent from `studies`; a number the registry answered for and did not return is in `notReturned`.
 */
export async function readRegistry(ncts: string[], net: Net, log: (s: string) => void = () => undefined): Promise<{ studies: Map<string, RawStudy>; notReturned: string[]; failed: string[] }> {
  const studies = new Map<string, RawStudy>();
  const notReturned: string[] = [], failed: string[] = [];
  for (let i = 0; i < ncts.length; i += 100) {
    const batch = ncts.slice(i, i + 100);
    const got = new Map<string, RawStudy>();
    let token: string | undefined, ok = true;
    do {
      const params = new URLSearchParams({ "filter.ids": batch.join(","), fields: REGISTRY_FIELDS, format: "json", pageSize: "1000", ...(token ? { pageToken: token } : {}) });
      const r = await net.get(`${CTGOV_API}?${params}`, { accept: "application/json" });
      if (!r.ok || !r.text) { ok = false; break; }
      let body: { studies?: RawStudy[]; nextPageToken?: string };
      try { body = JSON.parse(r.text); } catch { ok = false; break; }
      for (const s of body.studies ?? []) { const id = s.protocolSection?.identificationModule?.nctId; if (id) got.set(id, s); }
      token = body.nextPageToken;
    } while (token);
    if (!ok) { failed.push(...batch); continue; }
    for (const nct of batch) { const s = got.get(nct); if (s) studies.set(nct, s); else notReturned.push(nct); }
    if ((i / 100) % 10 === 9) log(`  registry: ${Math.min(i + 100, ncts.length)}/${ncts.length}`);
  }
  return { studies, notReturned, failed };
}
