import type { TrialInput } from "@/lib/schema";

/**
 * Structured outcomes for registry-ingested trials, copied from the ClinicalTrials.gov results section by
 * scripts/fetch-registry-outcomes.ts (wave 7 of docs/CONTENT-ROADMAP.md). Endpoint titles, arm titles, units, values,
 * dispersion, hazard ratios and p-values are the registry's own; enrolment is the registry's ACTUAL count;
 * `yearReported` is the year the results were first posted; `asOf` is the fetch date. Every outcome's first arm says
 * the figures come from the registry rather than a publication. Merged into the trial records by src/data/index.ts
 * for trials that carry no outcomes of their own. Do not edit by hand; re-run the script (the cache under
 * /tmp/ctgov-cache/results makes a re-run free).
 *
 * Generated 2026-09-22: 0 trials, 0 outcome rows, from 0 registry records checked
 * (0 with posted results).
 */
export type RegistryOutcomeData = Pick<TrialInput, "enrolled" | "enrolledBasis" | "outcomes" | "yearReported" | "asOf">;

export const TRIAL_REGISTRY_OUTCOMES: Record<string, RegistryOutcomeData> = {
};
