import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Kyrgyzstan: the two institutions and four papers behind /countries/kg/ (wave 15) that the corpus did not hold. The
 * national centre, the insurance fund, the regulator and the two patient groups already have records in
 * src/data/institutions/countries-2026-11-asia-pacific.ts and are linked, not repeated.
 *
 * Sources, read raw on 16 November 2026: the Ministry of Health's order No. 1019 of 28 July 2021 approving the cancer
 * strategy for 2021 to 2025 (scanned PDF on the ICCP portal, read in Russian), the IAEA's summary of the March 2015
 * imPACT review, and the European Observatory's 2022 health system review (PDF text). DOIs were resolved through
 * Europe PMC and every figure in `findings` is taken from the indexed abstract.
 *
 * Inbound links: the Ministry lists the Osh centre and all four papers; the Osh centre lists the Ministry and the two
 * papers that draw on its region or its records. The existing record kg-national-center-of-oncology-and-hematology
 * lists both.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const STRATEGY_PDF =
  "https://www.iccp-portal.org/sites/default/files/plans/KGZ_B5_s21_%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%E2%84%961019%20%D0%BE%D1%82%2028.07.2021%20%D0%9E%D0%B1%20%D1%83%D1%82%D0%B2%D0%B5%D1%80%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%A1%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8E%20%D0%B8%20%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B5%20%D0%BE%D0%BD%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85%20%D0%B7%D0%B0%D0%B1%D0%BE%D0%BB%D0%B5%D0%B2%D0%B0%D0%BD%D0%B8%D0%B9%20%D0%B2%20%D0%9A%D0%A0%20%D0%BD%D0%B0%202021-2025%20%D0%B3%D0%BE%D0%B4%D1%8B.pdf";
const IMPACT_2015 = "https://www.iaea.org/sites/default/files/documents/review-missions/kyrgyzstan-2015-impact-review.pdf";
const HIT_2022_PDF = "https://iris.who.int/server/api/core/bitstreams/af52fbb1-a9de-4843-8f44-79a04b1f18c1/content";

const FOMS = "https://foms.kg";
const DLS = "https://www.dlsmi.kg";
const WHO_HPV_STORY =
  "https://www.who.int/about/accountability/results/who-results-report-2020-mtr/country-story/2023/kyrgyzstan-s-successful-drive-to-introduce-hpv-vaccine-cuts-cervical-cancer-risk";

const institutions: InstitutionInput[] = [
  i({ id: "kg-ministry-of-health", name: "Ministry of Health of the Kyrgyz Republic", aka: ["Министерство здравоохранения Кыргызской Республики", "Министерство здравоохранения и социального развития Кыргызской Республики", "Минздрав КР", "МЗ КР"],
    city: "Bishkek", country: "KG", lat: 42.876, lng: 74.604, institutionType: "government",
    tldr: "Kyrgyzstan's health ministry. It approved the country's cancer strategy for 2021 to 2025, and the public health insurer and the medicines regulator both sit under it.",
    summary: "By order No. 1019 of 28 July 2021, issued when it was the Ministry of Health and Social Development, the Ministry approved the Strategy for the control and prevention of oncological diseases in the Kyrgyz Republic for 2021 to 2025 and its action plan; the scanned order is posted on the ICCP portal. The strategy covers prevention, the introduction of HPV vaccination, pilot screening centres for cervical and breast cancer, radiotherapy, palliative care and a population-based cancer registry beginning in Chuy region. The order told the director of the National Center of Oncology and Hematology to draft the rules for a coordination council. The Mandatory Health Insurance Fund and the Department of Medicines and Medical Devices each describe themselves on their own sites as bodies under the Ministry. WHO's account of the HPV vaccine's introduction in 2022 describes a government programme that WHO supported, with awareness work done in collaboration with the Ministry. OnCo could not connect to the Ministry's own site on 16 November 2026 and found no strategy for the years after 2025. The coordinates are an approximate Bishkek city point, not the building.",
    programs: ["Strategy for the control and prevention of oncological diseases, 2021 to 2025 (order No. 1019 of 28 July 2021)", "HPV vaccination in the national immunisation schedule (from 2022)", "Clinical protocols, including early assessment of suspected breast cancer in primary care"],
    institutions: ["kg-national-center-of-oncology-and-hematology", "kg-osh-interregional-oncology-centre", "kg-mandatory-health-insurance-fund", "kg-department-of-medicines", "who"],
    keyPapers: [
      "paper-ur-rehman-cancer-trends-kyrgyzstan-jcogo-2026",
      "paper-chokoev-breast-cancer-registry-kyrgyzstan-apjcp-2022",
      "paper-kozukeev-hpv-chuy-kyrgyzstan-iac-2026",
      "paper-brandl-hepatitis-liver-cancer-kyrgyzstan-lanepe-2026",
    ],
    links: [
      { label: "Ministry of Health: order No. 1019 of 28 July 2021, cancer strategy 2021 to 2025 (PDF, Russian and Kyrgyz, ICCP portal)", url: STRATEGY_PDF },
      { label: "Mandatory Health Insurance Fund under the Ministry of Health (Russian)", url: FOMS },
      { label: "Department of Medicines and Medical Devices under the Ministry of Health (Russian)", url: DLS },
      { label: "WHO: Kyrgyzstan's drive to introduce HPV vaccine", url: WHO_HPV_STORY },
    ] }),

  i({ id: "kg-osh-interregional-oncology-centre", name: "Osh Interregional Oncology Centre", aka: ["Ошский межобластной центр онкологии", "ОМОЦО", "Osh Interregional Cancer Centre", "Osh Cancer Center"],
    city: "Osh", country: "KG", lat: 40.53, lng: 72.8, institutionType: "cancer-center",
    tldr: "The public cancer centre for southern Kyrgyzstan, in the city of Osh. It has a palliative care department, and the Ministry of Health's strategy for 2021 to 2025 planned to develop radiotherapy there.",
    summary: "The Ministry of Health's cancer strategy for 2021 to 2025 (order No. 1019 of 28 July 2021, posted on the ICCP portal) lists the Osh Interregional Oncology Centre, with 100 beds, second among the public cancer services, after the National Center of Oncology and Hematology in Bishkek. The strategy says radiotherapy should be developed at the Osh centre and that, until then, travel and lodging should be funded for patients who must go to Bishkek; it also plans a hospital cancer registry at the centre. OnCo did not find a source saying whether radiotherapy has since opened in Osh. The European Observatory's 2022 health system review describes a palliative care department of five beds at the centre, funded by the Mandatory Health Insurance Fund, and a 2018 paper dates the start of palliative care in Kyrgyzstan to a home care pilot at the Osh cancer centre in 2005. The IAEA's 2015 imPACT review team met the centre's director. OnCo read no website of the centre. The coordinates are an approximate Osh city point, not the building.",
    programs: ["Cancer care for southern Kyrgyzstan", "Palliative care department (five beds in the European Observatory's 2022 review)", "Hospital cancer registry (planned in the 2021 to 2025 strategy)"],
    institutions: ["kg-ministry-of-health", "kg-national-center-of-oncology-and-hematology", "kg-mandatory-health-insurance-fund", "iaea"],
    keyPapers: ["paper-chokoev-breast-cancer-registry-kyrgyzstan-apjcp-2022", "paper-brandl-hepatitis-liver-cancer-kyrgyzstan-lanepe-2026"],
    links: [
      { label: "Ministry of Health: order No. 1019 of 28 July 2021, cancer strategy 2021 to 2025 (PDF, Russian and Kyrgyz, ICCP portal)", url: STRATEGY_PDF },
      { label: "European Observatory: Kyrgyzstan, health system review 2022 (PDF)", url: HIT_2022_PDF },
      { label: "IAEA: imPACT review summary, Kyrgyzstan, March 2015 (PDF)", url: IMPACT_2015 },
      doi("10.1016/j.jpainsymman.2017.05.010", "Palliative care development in Kyrgyzstan (J Pain Symptom Manage 2018)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ur-rehman-cancer-trends-kyrgyzstan-jcogo-2026", name: "Cancer incidence and prevalence trends in Kyrgyzstan, 2020 to 2026",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-26-00137", pmid: "42214045", authors: "Ur Rehman S, Ali W.", paperType: "observational",
    tldr: "An analysis of national oncology registry reports and Ministry of Health statistics found newly diagnosed cancers in Kyrgyzstan rising from about 5,471 in 2020 to 6,651 in 2024. Stomach, breast, lung, cervical and colorectal cancers made up the largest share.",
    summary: "Published as \"Cancer Prevalence Trends in Kyrgyzstan (2020-2026): A Population-Based Epidemiologic Analysis\", from Ala-Too International University in Bishkek. The authors describe a descriptive analysis of publicly available national oncology registry reports, Ministry of Health statistical publications and international cancer databases, with crude rates calculated from national population estimates and trends tested by joinpoint regression. It is the most recent published count of the country's own cancer figures that OnCo found, and it sits well below IARC's modelled estimate of 8,902 new cancers for 2024.",
    findings: [
      "Annual newly diagnosed cancer cases rose from approximately 5,471 in 2020 to 6,651 in 2024.",
      "The crude incidence rate rose from 83 per 100,000 population in 2020 to more than 92 per 100,000 in 2024.",
      "National registry estimates indicated more than 35,000 people living with a cancer diagnosis by 2025; incidence was stable between 2022 and 2023 and rose again in 2024.",
    ],
    whatItMeans: "This paper, which draws on the country's own reports, puts new cancers at about 6,650 a year. IARC's modelled estimate is higher, which is consistent with some cancers never being registered, though neither figure is exact.",
    caveats: ["Built from published national reports and international databases, not from individual records, so it inherits their completeness; the abstract does not say which source each figure came from.", "Rates are crude, not age-standardised, and the abstract gives the 2020 and 2024 counts as approximate."],
    institutions: ["kg-ministry-of-health"],
    links: [doi("10.1200/go-26-00137", "JCO Glob Oncol 2026"), pubmed("42214045")] }),

  p({ id: "paper-chokoev-breast-cancer-registry-kyrgyzstan-apjcp-2022", name: "Breast cancer incidence in Kyrgyzstan from 15 years of cancer registry data",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2022, doi: "10.31557/apjcp.2022.23.5.1603", pmid: "35633544", authors: "Chokoev A, Akhunbaev S, Kudaibergenova I, et al.", paperType: "observational", participants: 7850,
    tldr: "Kyrgyzstan's cancer registration recorded 7,850 new breast cancers from 2003 to 2017. The age-standardised rate averaged 24.0 per 100,000 women and was highest in Bishkek and Chuy region.",
    summary: "Published as \"Breast Cancer Incidence in Kyrgyzstan: Report of 15 Years of Cancer Registry\". A retrospective study of registered breast cancers from 2003 to 2017, with crude, age-specific and age-standardised rates, trends, and a map of rates by region. The first author's affiliations are the International Higher School of Medicine and the Eurasian Institute for Cancer Research in Bishkek.",
    findings: [
      "7,850 new cases of breast cancer were registered during 2003 to 2017.",
      "The average annual crude rate was 18.8 and the age-standardised rate 24.0 per 100,000 women; age-specific incidence peaked at 60 to 64 years (85.9 per 100,000).",
      "Age-standardised rates were highest in Bishkek city (39.2), Chuy (31.3) and Osh city (27.1), and trends rose fastest in Osh and Jalal-Abad regions.",
    ],
    whatItMeans: "Registered breast cancer is commonest around the capital, where diagnosis is most available, and rising in the south. A registry counts what is diagnosed and reported, so lower regional rates may partly reflect cancers that were not found.",
    caveats: ["The IAEA's 2015 review described the registry as manual and paper-based and questioned its completeness.", "Ends in 2017."],
    institutions: ["kg-ministry-of-health", "kg-osh-interregional-oncology-centre"], cancers: ["breast-cancer"],
    links: [doi("10.31557/apjcp.2022.23.5.1603", "Asian Pac J Cancer Prev 2022"), pubmed("35633544")] }),

  p({ id: "paper-kozukeev-hpv-chuy-kyrgyzstan-iac-2026", name: "High-risk HPV types among women aged 30 to 49 in Chuy region, Kyrgyzstan",
    journal: "Infectious Agents and Cancer", year: 2026, doi: "10.1186/s13027-025-00727-2", pmid: "41484904", authors: "Kozukeev T, Em O, Ciglenecki I, et al.", paperType: "observational", participants: 1213,
    tldr: "A 2024 survey by Médecins Sans Frontières tested 1,213 women aged 30 to 49 in rural Sokuluk district and Bishkek and found a high-risk type of human papillomavirus, the virus that causes cervical cancer, in 9.0%. HPV16 was the commonest type.",
    summary: "Published as \"Prevalence of high-risk human papillomavirus types among women aged 30-49 years in the Chuy region, Kyrgyzstan\". A cross-sectional study between January and May 2024 in two facilities in Sokuluk district and one in Bishkek, using the Xpert HPV test on cervical samples, with visual inspection with acetic acid and a questionnaire. The authors set out to establish a baseline before the national HPV vaccination programme, begun in 2022, takes full effect, and describe it as the first comprehensive data on high-risk HPV in the country.",
    findings: [
      "Overall high-risk HPV prevalence was 9.0% (109 of 1,213; 95% CI 7.5 to 10.7%).",
      "Prevalence was 9.8% in Sokuluk (56 of 570) and 7.8% in Bishkek (33 of 424); HPV16 was the commonest genotype at 2.5%.",
      "Among women with HPV detected, 13.6% had a positive visual inspection result.",
    ],
    whatItMeans: "The authors argue for scaling up cervical screening based on HPV testing alongside vaccination. WHO's 2021 profile recorded no national cervical screening programme in Kyrgyzstan.",
    caveats: ["One region and the capital, in three facilities; not a national sample.", "A single cross-sectional test cannot show which infections persist."],
    institutions: ["kg-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1186/s13027-025-00727-2", "Infect Agent Cancer 2026"), pubmed("41484904")] }),

  p({ id: "paper-brandl-hepatitis-liver-cancer-kyrgyzstan-lanepe-2026", name: "Liver cirrhosis and liver cancer attributable to hepatitis B and C in Kyrgyzstan, 2019 to 2024",
    journal: "The Lancet Regional Health - Europe", year: 2026, doi: "10.1016/j.lanepe.2026.101665", pmid: "41971035", authors: "Brandl M, Nurmatov Z, Sattarova G, et al.", paperType: "observational",
    tldr: "Among 572 people with liver cancer in hospitals and oncology centres in Bishkek, Osh and Jalal-Abad, hepatitis B accounted for 32% and hepatitis C for 32%. Half of the liver cancer patients tested for hepatitis D antibodies were positive.",
    summary: "Published as \"Liver cirrhosis and hepatocellular carcinoma attributable to hepatitis B and C in Kyrgyzstan, 2019-2024: a prospective and retrospective study\", led by the Robert Koch Institute in Berlin with Kyrgyz co-authors and funded by Germany's Global Health Protection Programme. The authors collected information on patients with cirrhosis or hepatocellular carcinoma from medical records in clinical hospitals and oncology centres in Bishkek, Osh and Jalal-Abad, prospectively from August 2023 to April 2024 and retrospectively from January 2019 to July 2023.",
    findings: [
      "Among 914 participants with cirrhosis, 46% of cases were attributable to hepatitis B (95% CI 42 to 49%) and 25% to hepatitis C (95% CI 22 to 28%).",
      "Among 572 participants with hepatocellular carcinoma, the fractions attributable to hepatitis B (182) and hepatitis C (183) were both 32% (95% CI 28 to 36%).",
      "Of those tested for hepatitis D antibodies, 78% of cirrhosis patients (306 of 390) and 50% of liver cancer patients (44 of 88) were positive.",
    ],
    whatItMeans: "About six in ten of the liver cancers studied (348 of 572, counting the 17 people with both infections once) were attributed to hepatitis B or C, infections that can be prevented by vaccination or treated. The authors call for earlier testing and treatment. Liver cancer is the third commonest cause of cancer death in IARC's 2024 estimate for Kyrgyzstan.",
    caveats: ["Hospital and oncology centre records in three cities, not a population sample.", "Not every patient was tested for every virus; the hepatitis D figures cover a subset."],
    institutions: ["kg-ministry-of-health", "kg-national-center-of-oncology-and-hematology", "kg-osh-interregional-oncology-centre"], cancers: ["hcc"],
    links: [doi("10.1016/j.lanepe.2026.101665", "Lancet Reg Health Eur 2026"), pubmed("41971035")] }),
];

export const recordsKG: EntityInput[] = [...institutions, ...papers];
