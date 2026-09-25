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
 * Trial ids named in the evidence text that still have no record of their own, after the review of 25 September 2026
 * re-checked the list against the corpus. They are named in text and linked to their paper record, not placed in
 * `trials` arrays, so the build does not dangle. NLST and NELSON exist as the single record `nlst-nelson` and
 * KEYNOTE-024 and KEYNOTE-189 as the single record `keynote-024-189`; both are referenced by those ids until the
 * pairs are split, which is why `nlst`, `nelson` and `keynote-024` appear here rather than as missing records.
 *
 * Written since this list was first drafted, and now referenced by id: profile-1014, impower110, checkmate-017,
 * checkmate-057 and keynote-010 (lung-treatment-trials-advanced.ts), lace-pooled-analysis (lung-treatment.ts) and
 * tracerx (lung-uk.ts). Trial records that already existed and are used by id: adaura, adriatic, alex, alina,
 * caspian, checkmate-227, checkmate-816, codebreak-100, codebreak-200, crown, dellphi-304, destiny-lung01,
 * destiny-lung02, flaura, flaura2, geometry-mono-1, keynote-042, keynote-189, keynote-407, keynote-671, laura,
 * libretto-431, lung-map, mariposa, nlst-nelson, pacific.
 */
export const PENDING_TRIALS = [
  "ipass", "eurtac", "profile-1001", "impower010", "aegean", "checkmate-77t", "keynote-001", "keynote-024",
  "dellphi-301", "ecog-1594", "ecog-4599", "plco-lung", "intergroup-0096", "pci-overview", "caret",
  "british-doctors-study", "nlst", "nelson", "nadim-ii",
] as const;

/**
 * Glossary terms named in the evidence text that still have no record of their own, re-checked on 25 September 2026.
 * Written since this list was first drafted, and now linked by id: pack-year, low-dose-ct-screening,
 * met-exon-14-skipping, alk-fusion, chromosomal-instability, consolidation-therapy and smoking-cessation. Terms that
 * already existed and are linked by id: brain-metastases, chemoradiation, clonal-evolution, ctdna, driver-mutation,
 * histology, mrd, neoadjuvant-adjuvant, oligometastatic, oncogene-addiction, overdiagnosis, pdl1, performance-status,
 * prophylactic-cranial-irradiation, resistance, tmb, tps.
 */
export const PENDING_TERMS = [
  "never-smoker", "screening-eligibility", "lead-time-bias", "t790m", "acquired-resistance",
  "histological-transformation", "exon-19-deletion", "l858r", "event-free-survival",
  "pathological-complete-response", "disease-free-survival", "intratumour-heterogeneity", "limited-stage",
  "extensive-stage", "tobacco-control", "deprivation-gradient", "sclc-transcription-factor-subtypes",
] as const;
