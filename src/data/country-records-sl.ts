import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Sierra Leone: the ministry, the children's hospital and the paper behind /countries/sl/ (wave 14) that the corpus
 * did not hold. Each was written from its own source, read raw on 16 November 2026: the Ministry of Health and
 * Sanitation's Non-Communicable Diseases Strategic Plan 2020 to 2024, dated 23 February 2020 (PDF text, posted on the
 * ICCP portal), the Ministry's home page, and the BMC Cancer paper on breast cancer at Connaught Hospital, whose DOI
 * was resolved through Europe PMC with the figures taken from the indexed abstract.
 *
 * Inbound links: the Ministry links the children's hospital and the three existing Sierra Leone records and lists the
 * paper in keyPapers; the children's hospital links the Ministry back. Coordinates are approximate Freetown points,
 * not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const NCD_PLAN = { label: "Ministry of Health and Sanitation: Non-Communicable Diseases Strategic Plan 2020 to 2024 (23 February 2020, PDF via ICCP)", url: "https://www.iccp-portal.org/sites/default/files/plans/SLE_B3_s21_NCD%20strategic%20plan%202020-2024%2023Feb2020%20FINAL%20signed%20CF%20%281%29%20%281%29.pdf" };
const MOH = "https://mohs.gov.sl/";

const institutions: InstitutionInput[] = [
  i({ id: "sierra-leone-ministry-of-health", name: "Ministry of Health, Sierra Leone", aka: ["Ministry of Health and Sanitation", "MoHS", "MOH Sierra Leone"],
    city: "Freetown", country: "SL", lat: 8.484, lng: -13.234, institutionType: "government", website: MOH,
    tldr: "Sierra Leone's health ministry, which has a directorate for non-communicable diseases and mental health. Its strategic plan for 2020 to 2024 describes the country's cancer services, and OnCo found no separate national cancer plan.",
    summary: "The Ministry's Non-Communicable Diseases Strategic Plan 2020 to 2024, dated 23 February 2020 and posted on the ICCP portal, describes cancer services as limited: no oncologist in the country in 2016, limited cancer surgery and chemotherapy, histopathology available erratically at one public hospital (Connaught) and one private hospital in Freetown, cervical cancer services at 3% of health facilities in 2017, and a radiotherapy facility then in development with the International Atomic Energy Agency. It records that the Free Health Care Initiative, launched in 2010, gives free care to children under five and to pregnant and breastfeeding women, and that the Sierra Leone Social Health Insurance scheme, enacted in 2017, had not started. The plan's actions include supporting the Freetown cancer registry and setting up cervical screening for women aged 30 to 49. The coordinates are an approximate Freetown city point.\n\nThe Ministry's home page, read on 16 November 2026, lists a directorate for non-communicable diseases and mental health and gives its head office as the Youyi Building in Freetown. WHO's 2020 cancer profile recorded \"n/a\" for a national cancer control plan in 2019, and a search of the ICCP portal on 16 November 2026 returned the non-communicable disease plans but no cancer plan.",
    programs: ["Non-Communicable Diseases Strategic Plan 2020 to 2024", "Free Health Care Initiative (from 2010)", "Directorate of non-communicable diseases and mental health"],
    institutions: ["ola-during-childrens-hospital", "connaught-hospital-freetown", "sierra-leone-national-cancer-registry", "pharmacy-board-sierra-leone", "who", "iaea"],
    cancers: ["breast-cancer", "cervical"],
    keyPapers: ["paper-cummings-john-breast-cancer-connaught-bmc-cancer-2025"],
    links: [NCD_PLAN, { label: "Ministry of Health, Sierra Leone", url: MOH }] }),

  i({ id: "ola-during-childrens-hospital", name: "Ola During Children's Hospital, Freetown", aka: ["ODCH", "Ola During Children's Hospital"],
    city: "Freetown", country: "SL", lat: 8.489, lng: -13.218, institutionType: "hospital",
    tldr: "A children's hospital in Freetown, listed among the tertiary hospitals in the Ministry of Health's 2020 plan, where a children's cancer service began in 2017. The Ministry of Health's 2020 plan describes it as giving chemotherapy for Burkitt lymphoma, Wilms tumour and retinoblastoma and palliative care for other children.",
    summary: "The Ministry of Health and Sanitation's Non-Communicable Diseases Strategic Plan 2020 to 2024, dated 23 February 2020, says a service was established in 2017 at Ola During Children's Hospital that focuses on chemotherapy for Burkitt lymphoma, Wilms tumour and retinoblastoma in children with potentially curable disease and gives palliative care to others. It was delivered with the paediatric surgical team at Connaught Hospital and an ophthalmology team in Freetown, and supported by a paediatric team from Wales. By the time of the plan more than 80 children had been managed through the unit, about 35% of whom had received chemotherapy, and the lead doctor was being supported by the charity World Child Cancer through a two-year training programme in Ghana. The plan adds that diagnostic imaging and pathology to support the service were very limited. This description is from early 2020; OnCo did not find a more recent account from the hospital. The coordinates are an approximate point in the east of Freetown.",
    programs: ["Children's cancer service (from 2017): chemotherapy and palliative care"],
    institutions: ["sierra-leone-ministry-of-health", "connaught-hospital-freetown"],
    cancers: ["childhood-cancers", "burkitt-lymphoma", "wilms-tumor", "retinoblastoma"],
    links: [NCD_PLAN] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-cummings-john-breast-cancer-connaught-bmc-cancer-2025", name: "The patterns of presentation, management and outcomes of breast cancer patients at a tertiary health facility in Sierra Leone",
    journal: "BMC Cancer", year: 2025, doi: "10.1186/s12885-025-13429-0", pmid: "39806275", authors: "Cummings-John C, Bah AJ, Smalle IO, et al.", paperType: "observational", participants: 253,
    tldr: "Of 253 people with breast cancer seen at a Freetown teaching hospital from 2018 to 2021, about 47% arrived with stage IIIB disease and 13.8% with metastases; mastectomy was the commonest treatment and about 15% did not start any.",
    summary: "A retrospective, cross-sectional study at the specialist outpatient clinic of Connaught Hospital, Freetown, of the medical records of 253 breast cancer patients from 2018 to 2021, chosen by convenience sampling for the completeness of their data.",
    findings: ["246 of the 253 patients (97.2%) were women, and the mean age was 47.", "About 119 (47%) presented with stage IIIB disease and 35 (13.8%) with metastasis.", "Treatment included 120 mastectomies (48%), neoadjuvant chemotherapy in 73 (29.2%), adjuvant chemotherapy in 84 (33.6%), hormone therapy in 98 (39.2%) and palliative care in 35 (14.0%); about 38 (15.2%) refused or did not start treatment."],
    whatItMeans: "More than half of the people with breast cancer in this study, at a Freetown teaching hospital the paper calls the largest referral health facility in the country, arrived with advanced disease; the authors ask for better histology services and access to radiotherapy.",
    caveats: ["One hospital, and records chosen for completeness, so the patients may not represent everyone seen there.", "The abstract gives yearly deaths as shares of an unstated denominator; OnCo does not restate them."],
    cancers: ["breast-cancer"], institutions: ["connaught-hospital-freetown"],
    links: [{ label: "DOI", url: "https://doi.org/10.1186/s12885-025-13429-0" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/39806275/" }] }),
];

/** Records behind /countries/sl/ (wave 14). */
export const recordsSL: EntityInput[] = [...institutions, ...papers];
