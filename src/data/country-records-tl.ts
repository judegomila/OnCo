import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Timor-Leste: the public body and the paper behind /countries/tl/ (wave 15) that the corpus did not hold. Written
 * from sources read raw on 16 November 2026: the Ministry of Health's non-communicable disease plans for 2014 to
 * 2018 and 2018 to 2021 (PDF text, ICCP portal), WHO Timor-Leste's news pages of 2022 to 2024, Tatoli's reports of
 * 14 February and 30 May 2023, the Timor-Leste Electronic Single Window's page on the Ministry, and WHO's list of
 * authorities in its collaborative registration procedure (23 August 2023). The Ministry's own site answered 502 and
 * was not read. The paper's DOI was resolved through Europe PMC and its figures are from the indexed abstract.
 *
 * Hospital Nacional Guido Valadares and the Alola Foundation already have records in
 * src/data/institutions/countries-2026-11-asia-pacific.ts and are linked, not repeated. Inbound links: the Ministry
 * lists the paper in keyPapers and the paper links the Ministry; the Ministry itself is linked from the paper. The
 * coordinates are an approximate Dili city point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCD_PLAN_2018 = "https://www.iccp-portal.org/sites/default/files/plans/TLS_B3_Multisectorial%20action%20plan%20for%20NCD%20prevention%20and%20Control%28complete%29.pdf";
const TATOLI_ONCOLOGY = "https://en.tatoli.tl/2023/05/30/moh-launches-medical-oncology-unit-at-national-hospital/15/";
const TATOLI_REGULATORY = "https://en.tatoli.tl/2023/02/14/who-and-tga-australia-will-offer-training-to-200-professionals-on-the-drug-control-system/13/";
const TILESW = "https://tilesw.asycuda.org/en/node/193";
const WHO_CRP = "https://extranet.who.int/prequal/sites/default/files/document_files/Country_List-23August2023.pdf";
const WHO_HPV_DRIVE = "https://www.who.int/timorleste/news/detail/16-10-2024-timor-leste-s-rapid-hpv-vaccine-drive--over-90--girls-immunized-in-just-3-weeks";
const WHO_2024 = "https://www.who.int/timorleste/news/detail/24-12-2024-timor-leste-s-all-out-effort-towards-cervical-cancer-elimination-in-2024";

const institutions: InstitutionInput[] = [
  i({ id: "timor-leste-ministry-of-health", name: "Ministry of Health, Timor-Leste", aka: ["Ministério da Saúde de Timor-Leste", "National Directorate of Pharmacy and Medicines, Timor-Leste", "DNFM"],
    city: "Dili", country: "TL", lat: -8.556, lng: 125.574, institutionType: "government",
    tldr: "Timor-Leste's health ministry. The national news agency reported in May 2023 that it launched a medical oncology unit at the national hospital in Dili, and WHO reports that it introduced HPV vaccination for girls in 2024. Its National Directorate of Pharmacy and Medicines is described by the country's trade portal as registering medicines and authorising their import.",
    summary: "The Ministry's multisectoral action plan for non-communicable diseases 2018 to 2021 (read as PDF text from the ICCP portal) recorded the absence of any disease registry, including for cancer, and set out to establish cancer care including palliative therapy and a hospital-based cancer registry at the national hospital; it said the country should develop its own oncology services to reduce its dependence on other countries. OnCo found no separate national cancer control plan. Tatoli, the national news agency, reported that the Ministry launched a medical oncology unit at Hospital Nacional Guido Valadares on 30 May 2023, with staff trained at Siloam Hospitals in Indonesia. WHO's country office reports that the Ministry introduced the HPV vaccine in July 2024 and vaccinated 56,350 girls aged 11 to 14 in three weeks from 23 September 2024, and that three colposcopy centres screened over 900 women in 2024.\n\nOn medicines, the Timor-Leste Electronic Single Window's page, which is undated and carries figures to June 2023, says registration and import authorisation fall under the National Directorate of Pharmacy and Medicines (DNFM), and that SAMES, a separate public body, manages and clears medicines and medical equipment. WHO lists the directorate as taking part in its collaborative registration procedure from 7 April 2022. Tatoli, in a report published on 14 February 2023, described a WHO overview that regulatory functions were spread across four bodies. Timor-Leste is not on WHO's list of regulators operating at maturity level 3 or 4, dated August 2026 and read on 16 November 2026; that is a statement about the list, not a judgement of the directorate's work. The Ministry's own site answered with a gateway error on 16 November 2026 and was not read. The coordinates on this record are an approximate Dili city point.",
    programs: ["Multisectoral action plan for non-communicable diseases 2018 to 2021", "Medical oncology unit at Hospital Nacional Guido Valadares (launch reported by Tatoli, 30 May 2023)", "HPV vaccination for girls (from July 2024)", "Cervical screening and precancer treatment centres in Dili and Baucau", "National Directorate of Pharmacy and Medicines: registration and import authorisation of medicines"],
    institutions: ["hospital-nacional-guido-valadares", "alola-foundation", "who"],
    cancers: ["cervical", "breast-cancer"], related: ["global-oncology-access"],
    keyPapers: ["paper-fordyce-breast-disease-timor-leste-anzjs-2020"],
    links: [
      { label: "Multisectoral action plan for non-communicable diseases 2018 to 2021 (PDF, ICCP portal)", url: NCD_PLAN_2018 },
      { label: "Tatoli: Ministry of Health launches medical oncology unit at the national hospital (30 May 2023)", url: TATOLI_ONCOLOGY },
      { label: "WHO Timor-Leste: over 90% of girls immunised in three weeks (16 October 2024)", url: WHO_HPV_DRIVE },
      { label: "WHO Timor-Leste: cervical cancer elimination efforts in 2024 (24 December 2024)", url: WHO_2024 },
      { label: "Timor-Leste Electronic Single Window: Ministry of Health", url: TILESW },
      { label: "WHO: authorities participating in the collaborative procedure, 23 August 2023 (PDF)", url: WHO_CRP },
      { label: "Tatoli: WHO and Australia's regulator to train staff on the drug control system (14 February 2023)", url: TATOLI_REGULATORY },
      { label: "WHO: regulators operating at maturity level 3 and 4 (PDF)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-fordyce-breast-disease-timor-leste-anzjs-2020", name: "Breast disease at the national hospital of Timor-Leste, 2016 to 2017",
    journal: "ANZ Journal of Surgery", year: 2020, doi: "10.1111/ans.15720", pmid: "32062871", authors: "Fordyce A, Vorias B, Taranto L, et al.", paperType: "observational", participants: 444,
    tldr: "A review of one year of breast clinic and pathology records at the national hospital in Dili found 444 women with breast disease. Of the women whose biopsy showed cancer, 86% already had locally advanced disease.",
    summary: "Published as \"Breast disease in Timor-Leste\". A retrospective study at Guido Valadares National Hospital in Dili of patients who attended surgical outpatients or had a pathology specimen recorded between 1 September 2016 and 1 September 2017. The authors set out to determine the burden of breast disease and to inform early detection, diagnosis and management.",
    findings: [
      "444 women had a clinical diagnosis of breast disease in the twelve months; the average age was 33.7 years.",
      "188 (42.3%) had fibroadenoma and 122 (27.4%) had diagnoses consistent with non-specific lumps.",
      "Of the 116 women who had a biopsy, 62.6% were malignant or hyperplastic, and 86% of those with a malignant biopsy had clinically locally advanced disease.",
    ],
    whatItMeans: "Breast cancer reaches the national hospital late. The authors call for a national cancer registry and for funding directed at earlier presentation and good clinical care.",
    caveats: ["One hospital and one year of records, read retrospectively.", "The abstract does not report treatment given or survival."],
    institutions: ["hospital-nacional-guido-valadares", "timor-leste-ministry-of-health"], cancers: ["breast-cancer"],
    links: [doi("10.1111/ans.15720", "ANZ J Surg 2020"), pubmed("32062871")] }),
];

export const recordsTL: EntityInput[] = [...institutions, ...papers];
