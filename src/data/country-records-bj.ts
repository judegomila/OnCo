import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Benin: the hospital and papers behind /countries/bj/ (wave 14) that the corpus did not hold. The hospital record was
 * written from the Government of Benin's own pages of 2 November 2025 and 25 April 2026, read raw on 16 November 2026;
 * the papers' DOIs were resolved through Europe PMC that day and their figures are taken from the indexed abstracts.
 * The ministry, the regulator, the two registries and the two teaching hospitals already exist in
 * src/data/institutions/countries-2026-11-west-central-africa.ts and are linked, not rewritten.
 *
 * Inbound links: the Schantz paper names chic-abomey-calavi, which links the ministry; the papers list each other
 * under `related`. Coordinates for the hospital are an approximate Abomey-Calavi point, not the building.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const CHIC_APR_2026 = "https://www.gouv.bj/article/3490/renforcement-offre-soins-chic-radiotherapie-chirurgie-coelioscopique-hospitalisations-conventionnelles-desormais-effectives-benin/";
const CHIC_NOV_2025 = "https://www.gouv.bj/article/3330/centre-hospitalier-international-calavi-joyau-medical-redefinit-soins-benin/";
const BJ_PLAN = "https://www.iccp-portal.org/sites/default/files/2025-11/B%C3%A9nin_PNLC_2024_2028.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "chic-abomey-calavi", name: "Centre Hospitalier International de Calavi (CHIC)", aka: ["CHIC", "Calavi International Hospital Centre", "Centre Hospitalier International de Calavi"],
    city: "Abomey-Calavi", country: "BJ", lat: 6.45, lng: 2.35, institutionType: "hospital",
    tldr: "A public hospital at Abomey-Calavi, inaugurated in June 2025 with 434 beds. The Government of Benin reports that its radiotherapy service opened on 1 April 2026, where the national cancer plan of 2024 had recorded no radiotherapy in the country.",
    summary: "The Government of Benin's page of 2 November 2025 describes the Centre Hospitalier International de Calavi as a public hospital inaugurated in June 2025 with 434 beds, already offering medical oncology with chemotherapy, dialysis, a laboratory, imaging by X-ray, ultrasound, CT and MRI, and digestive surgery, with radiotherapy and endoscopy units to open next. Its page of 25 April 2026 reports that the radiotherapy service has been open since 1 April 2026 and that the first patient was treated on 15 April 2026, and says the service reduces medical evacuations abroad. Neither page gives the number or type of machines or what treatment costs a patient.\n\nThe national cancer plan for 2024 to 2028 had recorded a cancer centre with nuclear medicine, radiotherapy, surgery and oncology under construction at Abomey-Calavi. IAEA's DIRAC directory, read on 16 November 2026, listed no radiotherapy centre in Benin. Both government pages are the state describing its own hospital, and OnCo found no independent report of the service's activity. The coordinates are an approximate Abomey-Calavi point, not the building.",
    programs: ["Radiotherapy (reported open since 1 April 2026)", "Medical oncology with chemotherapy", "Imaging: CT and MRI", "Digestive surgery"],
    institutions: ["benin-ministry-of-health", "iaea"],
    keyPapers: ["paper-schantz-oncology-access-benin-bmc-cancer-2025"],
    links: [
      { label: "Gouvernement du Bénin: radiotherapy now effective at CHIC (25 April 2026)", url: CHIC_APR_2026 },
      { label: "Gouvernement du Bénin: Centre Hospitalier International de Calavi (2 November 2025)", url: CHIC_NOV_2025 },
      { label: "Plan national de lutte contre les cancers au Bénin 2024 to 2028 (PDF via ICCP)", url: BJ_PLAN },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-egue-cotonou-cancer-incidence-canep-2019", name: "Cancer incidence in Cotonou, Benin, 2014 to 2016: first results from the Cotonou cancer registry",
    journal: "Cancer Epidemiology", year: 2019, doi: "10.1016/j.canep.2019.01.006", pmid: "30685574", authors: "Egue M, Gnangnon FHR, Akele-Akpo MT, Parkin DM.", paperType: "observational", participants: 1086,
    tldr: "The Cotonou population registry recorded 1,086 cancers in its first three years, with age-standardised incidence of 78.4 per 100,000 in women and 91.8 in men. Breast and cervical cancer were half of women's cancers and prostate cancer a quarter of men's.",
    summary: "Incidence data from the population-based cancer registry of Cotonou for the three years 2014 to 2016, which the authors present as the first data on cancer incidence in Benin.",
    findings: ["1,086 cancers were recorded: 608 (56.0%) in women, an age-standardised rate of 78.4 per 100,000, and 478 (44.0%) in men, a rate of 91.8.", "Breast and cervical cancer together were 49.2% of cancers in women; breast cancer (22.6 per 100,000) was more common than cervical cancer (14.9).", "Prostate cancer was one quarter of cancers in men, with an incidence of 30.5 per 100,000, similar to other West African registries.", "Cancers of the liver and digestive tract were relatively common in both sexes."],
    whatItMeans: "Benin has had measured cancer rates for its largest city since 2014, which the authors expected to serve the national cancer control plan; the plan for 2024 to 2028 does cite them.",
    caveats: ["One city and three years; the national cancer plan describes the registry's data as not exhaustive.", "The registry's network page notes that there is no death registry in Benin, so deaths cannot be matched."],
    cancers: ["breast-cancer", "cervical", "prostate", "hcc"], institutions: ["cotonou-cancer-registry"], related: ["paper-gnangnon-breast-cancer-cotonou-registry-aso-2026", "cancer-registries-surveillance"],
    links: [doi("10.1016/j.canep.2019.01.006", "DOI"), pubmed("30685574")] }),

  p({ id: "paper-gnangnon-breast-cancer-cotonou-registry-aso-2026", name: "Epidemiology and clinical features of breast cancer in Cotonou, 2014 to 2019: a population-based registry study",
    journal: "Annals of Surgical Oncology", year: 2026, doi: "10.1245/s10434-025-18976-1", pmid: "41521374", authors: "Gnangnon FHR, Parenté A, Allayambaye TE, et al.", paperType: "observational", participants: 277,
    tldr: "Among 277 women with breast cancer in the Cotonou registry, the mean age at diagnosis was 49.6 years and most were diagnosed at stage III or IV. Overall survival was 57% at one year and 37% at five years.",
    summary: "A retrospective cohort of women living in Cotonou with breast cancer registered in the population-based registry between 1 January 2014 and 31 December 2019, with overall survival estimated by the Kaplan-Meier method.",
    findings: ["Crude incidence rose from 16.8 per 100,000 in 2014 to 24.7 in 2019, with a peak of 38.9 in 2018.", "The mean age at diagnosis was 49.6 years (standard deviation 11.9).", "Most patients were diagnosed at stage III or IV, with T4 tumours the most frequent presentation; triple-negative breast cancer was the most prevalent subtype.", "Overall survival was 57% at 1 year and 37% at 5 years."],
    whatItMeans: "Breast cancer in Cotonou affects relatively young women and is usually found late; the authors call for earlier detection as a public health priority.",
    caveats: ["The abstract gives no percentages for stage or subtype.", "One city, and diagnoses from 2014 to 2019, before the government reported radiotherapy opening in Benin."],
    cancers: ["breast-cancer", "tnbc"], institutions: ["cotonou-cancer-registry"], related: ["paper-egue-cotonou-cancer-incidence-canep-2019", "paper-schantz-oncology-access-benin-bmc-cancer-2025"],
    links: [doi("10.1245/s10434-025-18976-1", "DOI"), pubmed("41521374")] }),

  p({ id: "paper-schantz-oncology-access-benin-bmc-cancer-2025", name: "Barriers and opportunities in access to oncology care in Benin: a qualitative study on breast cancer",
    journal: "BMC Cancer", year: 2025, doi: "10.1186/s12885-025-14325-3", pmid: "40426065", authors: "Schantz C, Gnangnon FHR, Aboubakar M, et al.", paperType: "observational", participants: 56,
    tldr: "Interviews with women with breast cancer, the people treating them and associations in Benin found late diagnosis, services centralised in Cotonou and costs that lead to abandoned care. With no radiotherapy in the country at the time, patients who needed it travelled abroad.",
    summary: "A qualitative study of 56 semi-structured interviews with caregivers treating cancer, women with breast cancer and representatives of associations, with 18 days of participant observation in a chemotherapy department and a palliative care department in Cotonou, analysed with Levesque's framework on access to care.",
    findings: ["Women met delayed diagnosis, unequal access to information, and beliefs that favour traditional medicine and discourage mastectomy.", "Care was centralised in Cotonou, with too few specialised staff, so patients travelled long distances.", "The lack of radiotherapy at the time meant patients who needed it had to travel abroad.", "High costs of tests and treatment often led to care being abandoned.", "Positive changes included a diploma in gynaecological and breast oncology since 2013, expanding palliative care, and the planned opening of the Calavi International Hospital Centre."],
    whatItMeans: "Reaching breast cancer care in Benin has depended on where a woman lives and what she can pay; the authors see growing commitment to improve it.",
    caveats: ["Qualitative: it describes barriers, not how common each one is.", "The abstract gives 56 interviews in total and lists groups of 26, 23 and 2, which sum to 51.", "Written before the government reported radiotherapy opening at Calavi in April 2026."],
    cancers: ["breast-cancer"], institutions: ["chic-abomey-calavi"], related: ["paper-gnangnon-breast-cancer-cotonou-registry-aso-2026"],
    links: [doi("10.1186/s12885-025-14325-3", "DOI"), pubmed("40426065")] }),
];

/** Records behind /countries/bj/ (wave 14). */
export const recordsBJ: EntityInput[] = [...institutions, ...papers];
