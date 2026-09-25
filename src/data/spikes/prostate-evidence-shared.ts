/**
 * Shared constants for the prostate cancer evidence files (prostate-evidence*.ts).
 * PROSTATE is the id of the cancer record every paper, idea and roadmap here links to: the existing `prostate` record
 * in ../cancers.ts. The risk-group and disease-state records that predate the taxonomy rule (`prostate-low-risk`,
 * `prostate-intermediate-risk`, `prostate-high-risk`, `prostate-bcr`, `prostate-mhspc`, `prostate-nmcrpc`,
 * `prostate-mcrpc`, `prostate-nepc`, all in ../prostate-subtypes.ts) are linked from individual papers where a result
 * belongs to one of them and not to the others. No new cancer record is created here; agent A owns taxonomy.
 */
export const asOf = "2026-09-25";
export const PROSTATE = "prostate";
export const LOW_RISK = "prostate-low-risk";
export const INTERMEDIATE_RISK = "prostate-intermediate-risk";
export const HIGH_RISK = "prostate-high-risk";
export const BCR = "prostate-bcr";
export const MHSPC = "prostate-mhspc";
export const NMCRPC = "prostate-nmcrpc";
export const MCRPC = "prostate-mcrpc";
export const NEPC = "prostate-nepc";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

/**
 * Trial ids named in this layer's prose that still have no record. The list was longer when the file was written;
 * the treatment layer has since written most of them, and the review pass added ERSPC and PLCO, the two the
 * screening section rests on. What remains is named in text only and linked to its paper record, so nothing
 * dangles.
 * They are named in text and linked to their paper record, not placed in `trials` arrays, so the build does not
 * dangle; the merge wires them once the trial records land. Trial records that already exist and are used by id are
 * not listed here: alsympca, aramis, arasens, capitello-281, chaarted, embark, enzamet, goteborg-2, latitude,
 * magnitude, peace-1, profound, propel, prosper, protect, psmaddition, rtog-9601, stampede, talapro-2, vision, and
 * the registry-numbered records nct03767244 (PROTEUS), nct04821622 (TALAPRO-3) and nct05939414 (PSMA-DC).
 */
export const PENDING_TRIALS = [
  "stopcap", "toparp-a", "triton2", "transformer", "restore", "keynote-199", "spartan", "probio", "stampede2",
] as const;

/**
 * Glossary terms the terms file of the deep dive owns and that did not exist when this file was written. They are
 * written out in text; existing terms (psa, gleason-grade-group, biochemical-recurrence, castration-resistance,
 * overdiagnosis, adt, hrd, msi, tmb, ctdna, ngs, ihc, screening, synthetic-lethality, oligometastatic,
 * bone-metastases, performance-status, quality-of-life, hazard-ratio, prostatectomy, radiotherapy) are linked by id.
 */
export const PENDING_TERMS = [
  "lead-time-bias", "overtreatment", "metastasis-free-survival", "radiographic-progression-free-survival",
  "psa-doubling-time", "psa50-response", "number-needed-to-screen", "lineage-plasticity",
  "neuroendocrine-differentiation", "androgen-receptor-splice-variant", "chromoplexy", "whole-mount-pathology",
  "bipolar-androgen-therapy", "intermittent-androgen-deprivation", "polygenic-risk-score", "other-cause-mortality",
  "homologous-recombination-repair", "genome-wide-loss-of-heterozygosity", "pi-rads", "template-mapping-biopsy",
] as const;
