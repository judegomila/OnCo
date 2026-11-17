import type { EntityInput } from "@/lib/schema";
import { TRIAL_OUTCOMES } from "./trial-outcomes";

/**
 * Trials referenced by the readout calendar that were not yet in the corpus.
 * Integrated via src/data/index.ts (spread `pipelineTrials` into ALL_INPUTS).
 */
const asOf = "2026-09-06";

const raw: EntityInput[] = [
  {
    id: "ascent-05", technologies: ["adc", "topoisomerase-inhibitors"], kind: "trial", name: "ASCENT-05 / OptimICE-RD (AFT-65, GBG 119, NSABP B-63)", nct: "NCT05633654", phase: "3", status: "recruiting",  sponsor: "Gilead / Alliance Foundation Trials",
    setting: "Study of Sacituzumab Govitecan-hziy and Pembrolizumab Versus Treatment of Physician's Choice in Patients With Triple Negative Breast Cancer Who Have Residual Invasive Disease After Surgery and Neoadjuvant Therapy (ASCENT-05/AFT-65 OptimICE-RD/GBG 119/NSABP B-63)",
    tldr: "Tests whether adding an antibody-drug conjugate after surgery reduces recurrence in triple-negative breast cancer with residual disease.",
    summary: "ASCENT-05 / OptimICE-RD compares postoperative sacituzumab govitecan plus pembrolizumab with physician choice of pembrolizumab with or without capecitabine for TNBC with residual invasive disease after neoadjuvant treatment. The primary endpoint is invasive disease-free survival. ClinicalTrials.gov record last updated 2026-11-04: recruiting. Enrollment is planned at 1514 participants. Primary completion is estimated at 2027-06. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    drugs: ["sacituzumab-govitecan", "pembrolizumab"], cancers: ["tnbc"], terms: ["rcb", "pcr", "efs"], trials: ["keynote-522"], related: ["idea-post-neoadjuvant-adc", "tropion-breast03"],
    links: [{ label: "ClinicalTrials.gov NCT05633654", url: "https://clinicaltrials.gov/study/NCT05633654" }, { label: "OptimICE-RD design (Future Oncology 2024)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11520537/" }],

    asOf: "2026-11-12",

    started: "2022-12-12",

    startedType: "actual",

    notes: ["ClinicalTrials.gov record last updated 2026-11-04: recruiting. Enrollment is planned at 1514 participants. Primary completion is estimated at 2027-06. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."],

    targets: ["trop2"],
  },
  {
    id: "tropion-breast03", technologies: ["adc", "topoisomerase-inhibitors"], kind: "trial", name: "TROPION-Breast03", nct: "NCT05629585", phase: "3", status: "active",  sponsor: "AstraZeneca / Daiichi Sankyo",
    setting: "A Study of Dato-DXd With or Without Durvalumab Versus Investigator's Choice of Therapy in Patients With Stage I-III Triple-negative Breast Cancer Without Pathological Complete Response Following Neoadjuvant Therapy (TROPION-Breast03)",
    tldr: "Tests whether an experimental drug, with or without immunotherapy, helps prevent recurrence after residual triple-negative breast cancer is removed at surgery.",
    summary: "TROPION-Breast03 compares datopotamab deruxtecan plus durvalumab, datopotamab deruxtecan alone, and investigator choice of capecitabine, pembrolizumab or both after surgery for stage I to III TNBC with residual invasive disease following neoadjuvant treatment. The registered primary iDFS comparison is the datopotamab deruxtecan plus durvalumab arm against investigator choice. ClinicalTrials.gov record last updated 2026-10-14: active not recruiting. Enrollment is actual at 1174 participants. Primary completion is estimated at 2027-09-20. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications.",
    drugs: ["datopotamab-deruxtecan", "durvalumab", "pembrolizumab"], cancers: ["tnbc"], terms: ["rcb", "efs"], trials: ["keynote-522"], related: ["idea-post-neoadjuvant-adc", "ascent-05"],
    links: [{ label: "ClinicalTrials.gov NCT05629585", url: "https://clinicaltrials.gov/study/NCT05629585" }, { label: "TROPION-Breast03 design (Ther Adv Med Oncol 2024)", url: "https://journals.sagepub.com/doi/10.1177/17588359241248336" }],

    asOf: "2026-11-12",

    started: "2022-11-28",

    startedType: "actual",

    notes: ["ClinicalTrials.gov record last updated 2026-10-14: active not recruiting. Enrollment is actual at 1174 participants. Primary completion is estimated at 2027-09-20. No tabular results are posted on ClinicalTrials.gov; this does not exclude separate publications."],

    targets: ["trop2"],

    enrolled: 1174,
  },
];

export const pipelineTrials: EntityInput[] = raw.map((t) => (t.kind === "trial" ? { ...t, ...TRIAL_OUTCOMES[t.id] } : t));
