/** Public primary-source TROP2 dual-payload programs, checked 6 October 2026. */
import type { EntityInput } from "@/lib/schema";

const asOf = "2026-10-06";

export const trop2DualPayload: EntityInput[] = [
  {
    id: "asp2998", kind: "drug", name: "ASP2998", code: "ASP2998", asOf,
    modality: "ADC", status: "phase-1", tags: ["pipeline", "dual-payload", "immunostimulatory"],
    payload: "Topoisomerase I inhibitor and STING agonist",
    mechanism: "TROP2-directed antibody carrying a cytotoxic topoisomerase I inhibitor and a STING immune agonist. This is an immunostimulatory dual-payload ADC, rather than two cytotoxic payloads.",
    tldr: "An experimental drug that uses an antibody to deliver a cancer-killing drug and an immune activator to cells carrying TROP2. An early human study is recruiting; benefit and safety are still being tested.",
    summary: "ASP2998 is Astellas's TROP2-targeted immunostimulatory dual-payload ADC, discovered through collaborative research with Sutro Biopharma. The phase 1b/2 first-in-human study NCT07287995 evaluates monotherapy and tumor-specific combinations. The registry, last updated 2 September 2026 and checked 6 October, lists recruiting status, an actual start on 5 February 2026 and estimated enrollment of 428. The earlier ASCO 2026 trial-in-progress abstract planned 196 participants; it is not an efficacy readout. No results are posted in the registry. Astellas lists the program in phase 1; the registered phase 1/2 design does not establish completion of phase 1 or demonstrated efficacy.",
    targets: ["trop2"], technologies: ["adc", "dual-payload-adc"], companies: ["astellas"], trials: ["nct07287995"],
    links: [
      { label: "Astellas pipeline: ASP2998 and Sutro collaboration", url: "https://www.astellas.com/en/science/research-and-development/pipeline" },
      { label: "Astellas FY2025 pipeline: phase 1 ASP2998", url: "https://www.astellas.com/content/dam/astellas-com/global/en/confidential-documents/financial-results/4q2025_sup_en.pdf" },
      { label: "Astellas FY2025 results: TOP1 inhibitor and STING agonist", url: "https://www.astellas.com/content/dam/astellas-com/global/en/confidential-documents/financial-results/4q2025_pre_en.pdf" },
      { label: "ASCO 2026 trial-in-progress abstract TPS2665", url: "https://doi.org/10.1200/jco.2026.44.16_suppl.tps2665" },
      { label: "ClinicalTrials.gov NCT07287995", url: "https://clinicaltrials.gov/study/NCT07287995" },
    ],
  },
  {
    id: "kh815", kind: "drug", name: "KH815", code: "KH815", asOf: "2026-11-18",
    modality: "ADC", status: "phase-1", tags: ["pipeline", "dual-payload"],
    payload: "Topoisomerase I inhibitor and RNA polymerase II inhibitor",
    mechanism: "A humanized TROP2-directed hRS7 antibody delivers a topoisomerase I inhibitor and an RNA polymerase II inhibitor. The two payload classes act on DNA damage and RNA synthesis, respectively.",
    tldr: "An experimental antibody drug that carries two cancer-killing payloads to cells carrying TROP2. A first human study is registered but is still listed as not yet recruiting in an older record.",
    summary: "KH815 is a TROP2-directed dual-payload ADC from Chengdu Kanghong Biotech. AACR 2025 abstract 1586 describes TOP1 and RNA polymerase II inhibitor payloads and preclinical tumor-model and non-GLP primate findings; those findings do not establish human safety or comparative benefit. Its registered phase 1 study NCT06885645 plans 30 participants with advanced solid tumors. The record last posted 3 April 2025 still says NOT_YET_RECRUITING when checked again on 18 November 2026, with an estimated start of 30 April 2025 and no posted results. Registration and a past estimated start do not establish that dosing has begun; current recruitment requires sponsor confirmation.",
    targets: ["trop2"], technologies: ["adc", "dual-payload-adc"], trials: ["nct06885645"],
    links: [
      { label: "AACR 2025 abstract 1586: KH815 payloads and preclinical evidence", url: "https://doi.org/10.1158/1538-7445.am2025-1586" },
      { label: "ClinicalTrials.gov NCT06885645", url: "https://clinicaltrials.gov/study/NCT06885645" },
    ],
  },
  {
    id: "nct06885645", kind: "trial", name: "KH815 first-in-human study", nct: "NCT06885645", asOf,
    phase: "1", status: "planned", sponsor: "Chengdu Kanghong Biotech Co., Ltd.",
    started: "2025-04-30", startedType: "estimated",
    // The renderer labels `enrolled` as actual enrollment; keep this estimated count in the summary.
    setting: "Advanced or unresectable solid tumors after failure of, difficulty with, or unsuitability for standard therapies; measurable disease and ECOG performance status 0 or 1 required.",
    tldr: "A planned early study of KH815 in people with advanced solid tumors. The registry still lists it as not yet recruiting, with no results posted.",
    summary: "NCT06885645 is a first-in-human dose-escalation study of the dual-payload TROP2 ADC KH815. The ClinicalTrials.gov record last posted 3 April 2025 lists NOT_YET_RECRUITING, estimated enrollment of 30, an estimated start on 30 April 2025 and estimated primary completion on 30 June 2027. These dates remain estimates when checked 6 October 2026; no results or study locations are posted. The protocol excludes a history of interstitial lung disease/pneumonia or screening imaging on which it cannot be ruled out. Registered status does not confirm current availability or individual eligibility.",
    drugs: ["kh815"], targets: ["trop2"], technologies: ["adc", "dual-payload-adc"],
    links: [{ label: "ClinicalTrials.gov NCT06885645", url: "https://clinicaltrials.gov/study/NCT06885645" }],
  },
];
