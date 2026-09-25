/**
 * Shared constants for the colorectal cancer evidence files (colorectal-evidence*.ts).
 * CRC is the id of the cancer record every paper, idea and roadmap here links to: the existing `colorectal` record in
 * ../cancers.ts, which the September 2026 deep dive extends in place.
 */
export const asOf = "2026-09-24";
export const CRC = "colorectal";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

/**
 * Trial ids the trials file of the deep dive owns and that did not exist in the corpus when this file was written.
 * They are named in text and linked to their paper or registry record, not placed in `trials` arrays, so the build
 * does not dangle; the merge wires them once the trial records land. CRYSTAL and FIRE-3 exist today as the single
 * record `crystal-fire3`, which is referenced by that id until the two are split; GALAXY is inside `circulate-japan`.
 * `prime` is currently only a diagram node id in ../pd1-map-style files, so the trial record can take it.
 */
export const PENDING_TRIALS = [
  "mosaic", "quasar", "idea-collaboration", "foxtrot", "cr07", "crystal", "fire-3", "calgb-80405", "prime", "tribe",
  "correct", "recourse", "destiny-crc01", "heracles", "galaxy-circulate", "prodige-7", "swedish-rectal-cancer-trial",
  "dutch-tme-trial", "ukfsst", "nottingham-fob", "funen-fob", "minnesota-fob", "national-polyp-study", "capp2",
  "challenge-colon", "netherlands-hipec",
] as const;

/**
 * Glossary terms the terms file of the deep dive owns and that did not exist when this file was written. They are
 * written out in text; existing terms (msi, sidedness, cms-subtypes, lynch-syndrome, fit-test, mrd, ctdna,
 * clinical-complete-response, neoadjuvant-adjuvant, total-neoadjuvant-therapy, total-mesorectal-excision,
 * organ-preservation, chemoradiation, complete-response, tumour-agnostic, cold-vs-hot, pcr) are linked by id.
 */
export const PENDING_TERMS = [
  "adenoma-carcinoma-sequence", "adenoma-detection-rate", "circumferential-resection-margin", "watch-and-wait",
  "early-onset-colorectal-cancer", "faecal-occult-blood-test", "interval-cancer", "screening-uptake",
  "peritoneal-carcinomatosis-index", "cytoreductive-surgery", "colibactin", "disease-free-survival", "anti-egfr-rechallenge",
] as const;
