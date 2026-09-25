/**
 * Shared constants for the triple-negative breast cancer evidence files (tnbc-evidence*.ts).
 * TNBC is the id of the cancer record every paper, idea and roadmap here links to: the existing `tnbc` record in
 * ../cancers.ts, which the September 2026 deep dive extends in place.
 */
export const asOf = "2026-09-24";
export const TNBC = "tnbc";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

/**
 * Trial ids another file of the deep dive owns and that did not exist in the corpus when this file was written
 * (CREATE-X, CALGB 40603, c-TRAK TN, BRE12-158, TNT). They are named in text and linked to their registry or paper,
 * not placed in `trials` arrays, so the build does not dangle; the merge wires them once the trial records land.
 * CAPItello-290 exists as the registry record `nct03997123` and is referenced by that id.
 */
export const PENDING_TRIALS = ["create-x", "calgb-40603", "c-trak-tn", "bre12-158", "tnt"] as const;
