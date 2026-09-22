import type { TrialInput } from "@/lib/schema";

const asOf = "2026-09-22";
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });

/**
 * Wave 5 of docs/CONTENT-ROADMAP.md, second half: registry trials for drugs and technologies that had none. Written by
 * scripts/fetch-entity-trials.ts, which searches ClinicalTrials.gov API v2 by the record's name and aliases and keeps an
 * interventional phase 2 or 3 study (phase 1 or 1/2 only when nothing later exists and the drug carries a target) only
 * when the registry's own intervention list names the drug, or names the technology in an intervention or the official
 * title, and its condition list names a corpus cancer. Title, phase, status, sponsor, enrolment, dates, interventions and
 * conditions come from the registry; drugs, technologies, cancers and companies are the corpus records those fields
 * matched, the sponsor only on an exact company name or alias. No outcomes: nothing here has been read by an editor.
 * Corpus trials that already carried the registry id are linked through entityTrialLinksWave5 instead. Do not edit by
 * hand; re-run the script.
 */
export const trialsEntitiesWave5: TrialInput[] = [
];

/** Each drug or technology looked up, with the trial ids it gained (records above or corpus trials); merged into its `trials` by src/data/index.ts. */
export const entityTrialsWave5: Record<string, string[]> = {
};

/** Existing corpus trials (by id) that gain a drug or technology because the registry record names it; merged by src/data/index.ts. */
export const entityTrialLinksWave5: Record<string, { drugs?: string[]; technologies?: string[] }> = {
};

/** Drugs and technologies the script looked up and will not retry, with the reason; clear an entry to try again. */
export const ENTITY_TRIAL_SKIP: Record<string, string> = {
};
