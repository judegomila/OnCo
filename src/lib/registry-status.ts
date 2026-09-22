/**
 * Trial status from the ClinicalTrials.gov registry: the mapping from the registry's `overallStatus` vocabulary to
 * the corpus status enum, and the merge that applies one recorded change to a trial input. The changes themselves
 * live in src/data/trial-registry-status.ts, written by scripts/fetch-registry-status.ts; src/data/index.ts calls
 * `applyRegistryStatus` for each trial the side file names, but only while the trial still carries the status the
 * script saw (`from`), so a later hand edit of the data file wins over a stale registry read.
 */
import type { Status } from "./kinds";
import type { TrialInput } from "./schema";

/** One recorded status change: what the corpus said, what the registry says, and the registry dates behind it. */
export type RegistryStatusChange = {
  /** Corpus status before the change; the merge applies only while the trial still has it. */
  from: Status;
  to: Status;
  /** The registry's own `overallStatus` token, e.g. ACTIVE_NOT_RECRUITING. */
  registry: string;
  /** `lastUpdatePostDate` on the registry (YYYY-MM-DD). */
  updated?: string;
  /** `primaryCompletionDate` (YYYY-MM-DD or YYYY-MM) and whether the registry marks it ACTUAL or ESTIMATED. */
  primaryCompletion?: string;
  primaryCompletionType?: "ACTUAL" | "ESTIMATED";
  /** The registry's `whyStopped` text for terminated, withdrawn and suspended studies. */
  whyStopped?: string;
  /** `asOf` of the trial record before the change, kept so a re-run can still compare the hand-written source date with the registry. */
  sourceAsOf: string;
  /** The date the registry was read (YYYY-MM-DD). */
  checked: string;
};

/**
 * Registry `overallStatus` to corpus status. Statuses with no entry are left alone: UNKNOWN means the sponsor stopped
 * updating the record (not a fact about the trial), SUSPENDED is a pause the enum has no word for, and the
 * expanded-access statuses (AVAILABLE, NO_LONGER_AVAILABLE, TEMPORARILY_NOT_AVAILABLE, APPROVED_FOR_MARKETING) and
 * WITHHELD describe records that are not interventional trials.
 */
export const REGISTRY_TO_CORPUS: Readonly<Record<string, Status>> = {
  RECRUITING: "recruiting",
  ENROLLING_BY_INVITATION: "recruiting",
  NOT_YET_RECRUITING: "planned",
  ACTIVE_NOT_RECRUITING: "active",
  COMPLETED: "completed",
  TERMINATED: "withdrawn",
  WITHDRAWN: "withdrawn",
};

/** Plain words for a registry status token: ACTIVE_NOT_RECRUITING becomes "Active, not recruiting". */
export function registryStatusLabel(registry: string): string {
  const words: Record<string, string> = {
    RECRUITING: "Recruiting",
    ENROLLING_BY_INVITATION: "Enrolling by invitation",
    NOT_YET_RECRUITING: "Not yet recruiting",
    ACTIVE_NOT_RECRUITING: "Active, not recruiting",
    COMPLETED: "Completed",
    TERMINATED: "Terminated",
    WITHDRAWN: "Withdrawn",
    SUSPENDED: "Suspended",
    UNKNOWN: "Unknown",
  };
  return words[registry] ?? registry.toLowerCase().replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-09-22" as "22 September 2026"; "2016-06" as "June 2016"; anything else unchanged. */
export function longDate(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const m = iso.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!m) return iso;
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return iso;
  return m[3] ? `${Number(m[3])} ${month} ${m[1]}` : `${month} ${m[1]}`;
}

/** The editorial note the merge appends: the registry status, the registry's own dates, and why a stopped study stopped. */
export function registryStatusNote(c: RegistryStatusChange): string {
  const details: string[] = [];
  if (c.updated) details.push(`registry record last updated ${longDate(c.updated)}`);
  if (c.primaryCompletion) details.push(`primary completion ${c.primaryCompletionType === "ACTUAL" ? "reached" : "expected"} ${longDate(c.primaryCompletion)}`);
  let note = `Registry status on ${longDate(c.checked)}: ${registryStatusLabel(c.registry)}${details.length ? ` (${details.join("; ")})` : ""}.`;
  if (c.whyStopped) note += ` Why stopped, in the sponsor's words: ${c.whyStopped.trim().replace(/\.?$/, ".")}`;
  return note;
}

/** The status phrase the ingest scripts wrote at the end of a registry-ingested trial's TL;DR, per corpus status. */
const TLDR_PHRASE: Partial<Record<Status, string>> = {
  recruiting: "now recruiting",
  planned: "not yet recruiting",
  active: "active and no longer recruiting",
  completed: "now completed",
  withdrawn: "stopped early",
};
const TLDR_RE = /, (now recruiting|not yet recruiting|active and no longer recruiting|now completed|stopped early|withdrawn before enrolling anyone)\.$/;

/** The same for the ", and <status> on the registry." clause of the ingested summary. */
const SUMMARY_PHRASE: Partial<Record<Status, string>> = {
  recruiting: "recruiting",
  planned: "not yet recruiting",
  active: "active but no longer recruiting",
  completed: "completed",
  withdrawn: "terminated",
};
const SUMMARY_RE = /, and (recruiting|not yet recruiting|active but no longer recruiting|completed|terminated|withdrawn) on the registry\./;

/**
 * Apply one change to a trial input: the status, a dated note, `asOf` moved to the check date, and, on
 * registry-ingested trials only (tag `ctgov-ingest`), the status phrases the ingest wrote into the TL;DR and summary
 * so the text does not contradict the chip. Returns the input unchanged when it no longer carries `from`.
 */
export function applyRegistryStatus<T extends TrialInput>(t: T, c: RegistryStatusChange): T {
  if (t.status !== c.from) return t;
  const note = registryStatusNote(c);
  const notes = [...(t.notes ?? []).filter((n) => !n.startsWith("Registry status on ")), note];
  let out: T = { ...t, status: c.to, notes, asOf: t.asOf > c.checked ? t.asOf : c.checked };
  if (t.tags?.includes("ctgov-ingest")) {
    const tldrPhrase = c.registry === "WITHDRAWN" ? "withdrawn before enrolling anyone" : TLDR_PHRASE[c.to];
    const summaryPhrase = c.registry === "WITHDRAWN" ? "withdrawn" : SUMMARY_PHRASE[c.to];
    let tldr = t.tldr;
    let summary = t.summary;
    if (tldrPhrase) tldr = tldr.replace(TLDR_RE, `, ${tldrPhrase}.`);
    if (summaryPhrase) summary = summary.replace(SUMMARY_RE, `, and ${summaryPhrase} on the registry.`);
    if (c.primaryCompletionType === "ACTUAL" && c.primaryCompletion) {
      summary = summary
        .replace(/ and due to reach its primary completion in \d{4}(?:-\d{2}){0,2}\./, ` and reached its primary completion in ${c.primaryCompletion}.`)
        .replace(/ and primary completion is expected in \d{4}(?:-\d{2}){0,2}\./, ` and primary completion was reached in ${c.primaryCompletion}.`);
    }
    out = { ...out, tldr, summary };
  }
  return out;
}
