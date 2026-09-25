/**
 * Shared constants for the lung cancer evidence files (lung-evidence*.ts).
 * LUNG is the id of the cancer record every paper, idea and roadmap here links to: the existing `lung-cancer` record
 * in ../cancer-parents-wave2.ts, the parent page that covers both histologies. The two subtype records (`nsclc` and
 * `sclc`) are linked from individual papers where a result belongs to one of them and not to the other.
 */
export const asOf = "2026-09-25";
export const LUNG = "lung-cancer";
export const NSCLC = "nsclc";
export const SCLC = "sclc";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

/**
 * Trial ids the trials file of the deep dive owns and that did not exist in the corpus when this file was written.
 * They are named in text and linked to their paper record, not placed in `trials` arrays, so the build does not
 * dangle; the merge wires them once the trial records land. NLST and NELSON exist today as the single record
 * `nlst-nelson`, which is referenced by that id until the two are split, and KEYNOTE-024 and KEYNOTE-189 as the
 * single record `keynote-024-189`. Trial records that already exist and are used by id are not listed here:
 * adaura, adriatic, alex, alina, caspian, checkmate-227, checkmate-816, codebreak-100, codebreak-200, crown,
 * dellphi-304, destiny-lung01, destiny-lung02, flaura, flaura2, geometry-mono-1, keynote-042, keynote-189,
 * keynote-407, keynote-671, laura, libretto-431, lung-map, mariposa, nlst-nelson, pacific.
 */
export const PENDING_TRIALS = [
  "ipass", "eurtac", "profile-1014", "profile-1001", "impower010", "impower110", "aegean", "checkmate-77t",
  "checkmate-017", "checkmate-057", "keynote-001", "keynote-010", "keynote-024", "dellphi-301", "tracerx",
  "ecog-1594", "ecog-4599", "lace-pooled-analysis", "plco-lung", "intergroup-0096", "pci-overview", "caret",
  "british-doctors-study", "nlst", "nelson", "nadim-ii",
] as const;

/**
 * Glossary terms the terms file of the deep dive owns and that did not exist when this file was written. They are
 * written out in text; existing terms (brain-metastases, chemoradiation, clonal-evolution, ctdna, driver-mutation,
 * histology, mrd, neoadjuvant-adjuvant, oligometastatic, oncogene-addiction, overdiagnosis, pdl1, performance-status,
 * prophylactic-cranial-irradiation, resistance, tmb, tps) are linked by id.
 */
export const PENDING_TERMS = [
  "pack-year", "low-dose-ct-screening", "never-smoker", "screening-eligibility", "lead-time-bias",
  "t790m", "acquired-resistance", "histological-transformation", "exon-19-deletion", "l858r",
  "met-exon-14-skipping", "alk-fusion", "event-free-survival", "pathological-complete-response",
  "disease-free-survival", "intratumour-heterogeneity", "chromosomal-instability", "limited-stage",
  "extensive-stage", "consolidation-therapy", "smoking-cessation", "tobacco-control", "deprivation-gradient",
  "sclc-transcription-factor-subtypes",
] as const;
