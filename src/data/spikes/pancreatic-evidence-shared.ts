/**
 * Shared constants for the pancreatic cancer evidence files (pancreatic-evidence*.ts).
 * PANC is the id of the cancer record every paper, idea and roadmap here links to: the existing `pancreatic` record in
 * ../cancers.ts, which the September 2026 deep dive extends in place.
 */
export const asOf = "2026-09-24";
export const PANC = "pancreatic";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
export const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

/**
 * Trial ids the treatment file of the deep dive owns and that did not exist in the corpus when this file was written.
 * They are named in text and linked to their registry or paper, not placed in `trials` arrays, so the build does not
 * dangle; the merge wires them once the trial records land. PREOPANC-1 and PREOPANC-2 exist today as the single
 * record `preopanc`, which is referenced by that id until the two are split.
 */
export const PENDING_TRIALS = ["prodige-4-accord-11", "mpact", "napoli-1", "preopanc-1", "preopanc-2", "preopanc-3", "alliance-a021806", "conko-007", "espac-1", "halo-301", "codebreak-100", "imcode003", "dawn-303"] as const;

/**
 * Glossary terms the terms file of the deep dive owns and that did not exist when this file was written: pancreatic
 * enzyme replacement therapy (pert), pancreatic exocrine insufficiency, new-onset diabetes, Lewis-negative, cachexia,
 * classical versus basal-like subtype, high-risk individual, clinical benefit response and disease-free survival. They
 * are written out in text; existing terms (ca19-9, desmoplasia, whipple, resectability, resection-margins,
 * neoadjuvant-adjuvant, gbrca-mutation, kras-mutation-subtypes, neoantigen, ppv) are linked by id.
 */
export const PENDING_TERMS = ["pert", "pancreatic-exocrine-insufficiency", "new-onset-diabetes", "lewis-negative", "cachexia", "classical-vs-basal-like", "high-risk-individual", "clinical-benefit-response", "dfs"] as const;
