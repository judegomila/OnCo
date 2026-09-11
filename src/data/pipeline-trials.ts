import type { EntityInput } from "@/lib/schema";
import { TRIAL_OUTCOMES } from "./trial-outcomes";

/**
 * Trials referenced by the readout calendar that were not yet in the corpus.
 * Integrated via src/data/index.ts (spread `pipelineTrials` into ALL_INPUTS).
 */
const asOf = "2026-09-06";

const raw: EntityInput[] = [
  {
    id: "ascent-05", kind: "trial", name: "ASCENT-05 / OptimICE-RD (AFT-65, GBG 119, NSABP B-63)", nct: "NCT05633654", phase: "3", status: "active", asOf, sponsor: "Gilead / Alliance Foundation Trials",
    setting: "Stage II to III TNBC with residual invasive disease after neoadjuvant therapy and surgery: adjuvant sacituzumab govitecan + pembrolizumab vs pembrolizumab ± capecitabine",
    tldr: "Tests whether giving a TROP2 ADC after surgery can cure more of the triple-negative patients whose cancer survived pre-surgery chemo-immunotherapy.",
    summary: "International randomised phase 3 in the highest-risk curable TNBC population: residual disease (non-pCR) after KEYNOTE-522-type neoadjuvant therapy. Primary endpoint invasive disease-free survival. If positive, it would be the first ADC in the curative TNBC setting and the KATHERINE moment for TNBC. Readout is event-driven; our estimate is 2027.",
    drugs: ["sacituzumab-govitecan", "pembrolizumab"], cancers: ["tnbc"], terms: ["rcb", "pcr", "efs"], trials: ["keynote-522"], related: ["idea-post-neoadjuvant-adc", "tropion-breast03"],
    links: [{ label: "ClinicalTrials.gov NCT05633654", url: "https://clinicaltrials.gov/study/NCT05633654" }, { label: "OptimICE-RD design (Future Oncology 2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11520537/" }],
  },
  {
    id: "tropion-breast03", kind: "trial", name: "TROPION-Breast03", nct: "NCT05629585", phase: "3", status: "active", asOf, sponsor: "AstraZeneca / Daiichi Sankyo",
    setting: "Stage I to III TNBC with residual invasive disease after neoadjuvant therapy: adjuvant Dato-DXd ± durvalumab vs investigator's choice (capecitabine, pembrolizumab, or both)",
    tldr: "TROPION-Breast03 is the Dato-DXd counterpart to ASCENT-05: an ADC, with or without immunotherapy, for triple-negative patients with leftover cancer at surgery.",
    summary: "TROPION-Breast03, trial NCT05629585 sponsored by AstraZeneca and Daiichi Sankyo, is the datopotamab deruxtecan counterpart to ASCENT-05: an antibody-drug conjugate, with or without immunotherapy, for patients with stage I to III triple-negative breast cancer left with residual invasive disease after neoadjuvant therapy. It is a three-arm phase 3 of 1,075 patients randomised two to one to two to datopotamab deruxtecan for eight cycles plus durvalumab for nine, datopotamab deruxtecan alone, or investigator's choice of capecitabine, pembrolizumab or both, with invasive disease-free survival as the primary endpoint and estimated primary completion on 20 September 2027. It is ongoing with no results, and whether an ADC after residual disease improves on the KATHERINE-style switch strategy in TNBC is the question it will answer.",
    drugs: ["datopotamab-deruxtecan", "durvalumab", "pembrolizumab"], cancers: ["tnbc"], terms: ["rcb", "efs"], trials: ["keynote-522"], related: ["idea-post-neoadjuvant-adc", "ascent-05"],
    links: [{ label: "ClinicalTrials.gov NCT05629585", url: "https://clinicaltrials.gov/study/NCT05629585" }, { label: "TROPION-Breast03 design (Ther Adv Med Oncol 2024)", url: "https://journals.sagepub.com/doi/10.1177/17588359241248336" }],
  },
];

export const pipelineTrials: EntityInput[] = raw.map((t) => (t.kind === "trial" ? { ...t, ...TRIAL_OUTCOMES[t.id] } : t));
