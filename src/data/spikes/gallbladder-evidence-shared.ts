/**
 * Shared constants for the gallbladder cancer evidence files (gallbladder-evidence*.ts).
 * GB is the id of the cancer record every paper, idea and roadmap here links to: the existing `gallbladder` record
 * in ./nci-rare-other.ts, which the September 2026 deep dive extends in place.
 */
export const asOf = "2026-09-24";
export const GB = "gallbladder";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
