import type { DrugInput, TermInput, TrialInput } from "@/lib/schema";

/**
 * Constants shared by the lung treatment files (./lung-treatment.ts, ./lung-treatment-trials*.ts). Not a spike.
 * Every URL here was fetched on 2026-09-25: ClinicalTrials.gov v2, Europe PMC, the FDA oncology approval
 * notifications, openFDA labels, the EMA medicine pages and the NICE guidance pages. NICE reference numbers were
 * checked one by one against nice.org.uk and the page title recorded; none is quoted from memory.
 */
export const asOf = "2026-09-25";
export const LUNG = "lung-cancer";
export const NSCLC = "nsclc";
export const SCLC = "sclc";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
export const nice = (ref: string, label: string) => ({ label, url: `https://www.nice.org.uk/guidance/${ref}` });
export const D = (id: string) => `https://doi.org/${id}`;

export const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
export const d = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, ...x });
export const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });

/** Papers quoted more than once, as DOIs read through Europe PMC on 2026-09-25. */
export const SRC = {
  // Surgery and adjuvant chemotherapy
  jcog0802: D("10.1016/S2213-2600(23)00382-X"), ialt: D("10.1056/NEJMoa031644"), jbr10: D("10.1056/NEJMoa043623"),
  anita: D("10.1016/S1470-2045(06)70804-X"), lace: D("10.1200/JCO.2007.13.9030"), lungArt: D("10.1016/S1470-2045(21)00606-9"),
  starsRosel: D("10.1016/S1470-2045(15)70168-3"),
  // Adjuvant and perioperative targeted therapy and immunotherapy
  adauraOs: D("10.1016/j.jtho.2026.104179"), impower010: D("10.1016/S0140-6736(21)02098-5"),
  keynote091: D("10.1016/S1470-2045(22)00518-6"), checkmate816: D("10.1056/NEJMoa2202170"),
  checkmate77t: D("10.1056/NEJMoa2311926"), aegean: D("10.1200/JCO-25-02659"), neotorch: D("10.1001/jama.2023.24735"),
  rationale315: D("10.1016/j.annonc.2025.11.017"),
  // Stage III
  pacificOs: D("10.1056/NEJMoa1809697"), gemstone301: D("10.1016/S1470-2045(21)00630-6"),
  // EGFR
  luxLung3: D("10.1200/JCO.2012.44.2806"), archer1050: D("10.1016/S1470-2045(17)30608-3"), aura3: D("10.1056/NEJMoa1612674"),
  // ALK and ROS1
  profile1014: D("10.1056/NEJMoa1408440"), alesia: D("10.1016/S2213-2600(19)30053-0"),
  profile1001Ros1: D("10.1056/NEJMoa1406766"), trident1: D("10.1056/NEJMoa2302299"),
  // RET, BRAF, NTRK, NRG1
  libretto001: D("10.1056/NEJMoa2005653"), arrow: D("10.1016/S1470-2045(21)00247-3"),
  brf113928: D("10.1016/S1470-2045(17)30679-4"), startrk: D("10.1016/S1470-2045(19)30691-6"),
  enrgy: D("10.1056/NEJMoa2405008"),
  // Immunotherapy
  checkmate017: D("10.1056/NEJMoa1504627"), checkmate057: D("10.1056/NEJMoa1507643"), oak: D("10.1016/S0140-6736(16)32517-X"),
  impower110: D("10.1056/NEJMoa1917346"), impower150: D("10.1056/NEJMoa1716948"), checkmate9la: D("10.1016/S1470-2045(20)30641-0"),
  poseidon: D("10.1200/JCO.22.00975"), checkmate026: D("10.1056/NEJMoa1613493"),
  // Small-cell
  adriatic: D("10.1056/NEJMoa2404873"), dellphi301: D("10.1056/NEJMoa2307980"), lurbinectedinBasket: D("10.1016/S1470-2045(20)30068-1"),
  crest: D("10.1016/S0140-6736(14)61085-0"), turrisi: D("10.1056/NEJM199901283400403"), pciOverview: D("10.1056/NEJM199908123410703"),
  // Palliation
  time2: D("10.1001/jama.2012.5535"), ample: D("10.1001/jama.2017.17426"),
  dutchBone: D("10.1016/j.ijrobp.2003.10.006"), aoyamaSrs: D("10.1001/jama.295.21.2483"),
  // Guidelines
  nccnNsclc: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1450",
  nccnSclc: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1462",
  esmo: "https://www.esmo.org/guidelines/esmo-clinical-practice-guidelines-lung-and-chest-tumours",
  // NICE (reference number and page title verified on nice.org.uk, 25 September 2026)
  ng122: "https://www.nice.org.uk/guidance/ng122",
  fdaNotices: "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancerhematologic-malignancies-approval-notifications",
};
