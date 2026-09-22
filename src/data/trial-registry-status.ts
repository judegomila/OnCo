import type { RegistryStatusChange } from "@/lib/registry-status";

/**
 * Trial status changes read from the ClinicalTrials.gov registry by scripts/fetch-registry-status.ts. Each entry
 * records the corpus status the script saw (`from`), the status the registry's overallStatus maps to (`to`), the
 * registry token and its dates, and the trial's own asOf at the time (`sourceAsOf`). src/data/index.ts applies an
 * entry through applyRegistryStatus() only while the trial still carries `from`, so a hand edit of the data file
 * always wins. Do not edit by hand; re-run the script (cached records under /tmp/ctgov-cache make a re-run free).
 *
 * Generated 2026-09-22: 13 changes from 3542 registry records
 * (active -> completed 4; active -> recruiting (hand-written) 2; completed -> withdrawn (hand-written) 2; recruiting -> active 2; active -> completed (hand-written) 1; active -> withdrawn 1; active -> recruiting 1).
 */
export const TRIAL_REGISTRY_STATUS: Record<string, RegistryStatusChange> = {
  "ascent-05": {"from":"active","to":"recruiting","registry":"RECRUITING","updated":"2026-09-09","primaryCompletion":"2027-06","primaryCompletionType":"ESTIMATED","sourceAsOf":"2026-09-06","checked":"2026-09-22"},
  "fight-302": {"from":"completed","to":"withdrawn","registry":"TERMINATED","updated":"2026-08-11","primaryCompletion":"2025-07-07","primaryCompletionType":"ACTUAL","whyStopped":"The study was terminated due to lack of enrollment resulting from a change in the standard of care for the first-line treatment of patients with cholangiocarcinoma. There were no safety concerns that contributed to this decision.","sourceAsOf":"2026-09-17","checked":"2026-09-22"},
  "lung-map": {"from":"active","to":"completed","registry":"COMPLETED","updated":"2023-06-01","primaryCompletion":"2022-04-01","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-17","checked":"2026-09-22"},
  "nct03182244": {"from":"active","to":"completed","registry":"COMPLETED","updated":"2026-09-22","primaryCompletion":"2023-12-25","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-22","checked":"2026-09-22"},
  "nct04665856": {"from":"active","to":"completed","registry":"COMPLETED","updated":"2026-09-18","primaryCompletion":"2023-08-31","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-22","checked":"2026-09-22"},
  "nct04724369": {"from":"active","to":"completed","registry":"COMPLETED","updated":"2026-09-17","primaryCompletion":"2026-07-30","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-16","checked":"2026-09-22"},
  "nct05117242": {"from":"active","to":"withdrawn","registry":"TERMINATED","updated":"2026-09-21","primaryCompletion":"2024-12-02","primaryCompletionType":"ACTUAL","whyStopped":"Genmab has decided to discontinue further clinical development of acasunlimab following strategic portfolio prioritization. The decision was not related to safety concerns.","sourceAsOf":"2026-09-16","checked":"2026-09-22"},
  "nct05208047": {"from":"active","to":"recruiting","registry":"RECRUITING","updated":"2026-06-16","primaryCompletion":"2025-09-30","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-11","checked":"2026-09-22"},
  "nct06050122": {"from":"active","to":"completed","registry":"COMPLETED","updated":"2026-09-18","primaryCompletion":"2026-08-20","primaryCompletionType":"ACTUAL","sourceAsOf":"2026-09-16","checked":"2026-09-22"},
  "nct06077760": {"from":"recruiting","to":"active","registry":"ACTIVE_NOT_RECRUITING","updated":"2026-09-18","primaryCompletion":"2030-06-25","primaryCompletionType":"ESTIMATED","sourceAsOf":"2026-09-16","checked":"2026-09-22"},
  "nct06109272": {"from":"recruiting","to":"active","registry":"ACTIVE_NOT_RECRUITING","updated":"2026-09-22","primaryCompletion":"2027-01","primaryCompletionType":"ESTIMATED","sourceAsOf":"2026-09-11","checked":"2026-09-22"},
  "tazemetostat-doxorubicin-es": {"from":"completed","to":"withdrawn","registry":"TERMINATED","updated":"2026-01-07","primaryCompletion":"2024-06-14","primaryCompletionType":"ACTUAL","whyStopped":"FDA and Ipsen alignelment: Due to unfeasibility and the resulting inability to meet the required enrolment targets. No safety concerns","sourceAsOf":"2026-09-16","checked":"2026-09-22"},
  "wisdom-trial": {"from":"active","to":"recruiting","registry":"RECRUITING","updated":"2026-09-21","primaryCompletion":"2029-09-30","primaryCompletionType":"ESTIMATED","sourceAsOf":"2026-09-17","checked":"2026-09-22"},
};
