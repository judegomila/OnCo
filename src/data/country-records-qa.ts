import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Qatar: the public bodies behind /countries/qa/ (wave 13) that the corpus did not hold. Each was written from its own
 * primary source, read raw on 16 November 2026: the Ministry of Public Health's National Cancer Framework 2017-2022
 * pages, its service pages for medicine registration and the Qatar National Formulary, and its Qatar Cancer Plan
 * 2023-2026 (PDF text, from the International Cancer Control Partnership's copy); the Qatar National Cancer Registry's
 * Annual Cancer Report 2020 (an Internet Archive copy of a scanned PDF, read by optical character recognition); a Qatar
 * News Agency notice of 27 April 2021; IARC's "Impact in practice" note on Qatar (2026); and the Primary Health Care
 * Corporation's breast, bowel and cervical screening pages. Hamad Medical Corporation, Sidra Medicine and the Qatar
 * Cancer Society are already in the corpus and are linked, not rewritten. Coordinates are an approximate city point
 * for Doha, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const QCP = "https://www.iccp-portal.org/sites/default/files/plans/QATAR-CANCER-PLAN-2023-2026-EN-compressed.pdf";
const QNCR_2020 = "https://web.archive.org/web/20250402173855/https://qcic.moph.gov.qa/nas/documents/annual-report/QNCR-2020-English.pdf";
const NCF_PAGE = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/default.aspx";
const MOPH_MAH = "https://www.moph.gov.qa/english/OurServices/advancedsearch/Pages/servicesdetails.aspx?serviceId=200";
const MOPH_QNF = "https://www.moph.gov.qa/english/OurServices/advancedsearch/Pages/servicesdetails.aspx?serviceId=234";
const QNA_REGISTRY_2021 = "https://www.qna.org.qa/en/News-Area/News/2021-04/27/0053-qatar-national-cancer-registry-releases-cancer-incidence-rates-in-qatar";
const IARC_IMPACT = "https://www.iarc.who.int/wp-content/uploads/2026/04/IARC_impact_in_practice_Qatar.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/634-qatar-fact-sheet.pdf";
const HMC_GUIDE = "https://www.hamad.qa/EN/Hospitals-and-services/NCCCR/Cancer-Awareness/Documents/Guide-to-Cancer-Services-EN.pdf";
const PHCC_BREAST = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/breast-cancer-screening";
const PHCC_BOWEL = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/bowel-cancer-screening";
const PHCC_CERVICAL = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/cervical-cancer-screening";

const institutions: InstitutionInput[] = [
  i({ id: "moph-qatar", name: "Ministry of Public Health, Qatar", aka: ["MoPH", "MOPH Qatar", "Qatar Ministry of Public Health", "Pharmacy and Drug Control Department"],
    city: "Doha", country: "QA", lat: 25.29, lng: 51.53, institutionType: "government", website: "https://www.moph.gov.qa/english/Pages/default.aspx",
    tldr: "Qatar's health ministry. It writes the national cancer plan, houses the national cancer registry, and registers and prices medicines through its Pharmacy and Drug Control Department.",
    summary: "The Ministry of Public Health published Qatar's National Cancer Strategy in 2011, the National Cancer Framework 2017-2022 in May 2017 and the Qatar Cancer Plan 2023-2026, which sets 87 deliverables under 23 strategic objectives in seven chapters and names a lead organisation for each. Its National Cancer Program includes the Qatar National Cancer Registry. Its Pharmacy and Drug Control Department has a Drug Registration and Pricing Section, which the Ministry's service page says approves the registration of marketing authorisation holders for pharmaceutical products on application by a registered agent through the department's online system, and the Ministry describes its Qatar National Formulary as a nationwide resource on a medicine's availability and on prescribing and dispensing rules. The department pages themselves returned no text to a plain request when this record was written.",
    programs: ["Qatar Cancer Plan 2023-2026", "National Cancer Framework 2017-2022", "National Cancer Program", "Pharmacy and Drug Control Department (medicine registration and pricing)", "Qatar National Formulary"],
    institutions: ["qatar-national-cancer-registry", "hamad-medical-corporation", "phcc-qatar", "sidra-medicine", "qatar-cancer-society"],
    links: [
      { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
      { label: "Ministry of Public Health: National Cancer Framework 2017-2022", url: NCF_PAGE },
      { label: "Ministry of Public Health: registration of marketing authorisation holder (service page)", url: MOPH_MAH },
      { label: "Ministry of Public Health: Qatar National Formulary (service page)", url: MOPH_QNF },
    ] }),

  i({ id: "qatar-national-cancer-registry", name: "Qatar National Cancer Registry", aka: ["QNCR"],
    city: "Doha", country: "QA", lat: 25.29, lng: 51.53, institutionType: "government", website: "https://qcic.moph.gov.qa/",
    tldr: "Qatar's national cancer registry, part of the National Cancer Program at the Ministry of Public Health. Its report for 2020 recorded 2,042 new cancers, 81% of them in people who are not Qatari nationals.",
    summary: "The Qatar National Cancer Registry, at the Ministry of Public Health, records cancers diagnosed in the State of Qatar. Its Annual Cancer Report 2020, whose imprint page says printed in 2023, records 2,042 new cases in a population of 2,833,679 (1,648 in non-Qataris and 394 in Qataris), a crude rate of 72.06 and an age-standardised rate of 152.28 per 100,000, with 94.17% of cases confirmed microscopically, and says the count fell by 19% from the previous year because of the pandemic. For 2018 it announced 1,960 new cases. The Qatar Cancer Plan 2023-2026 says the Qatar Cancer Information Center, set up under the National Cancer Framework, houses three registries: the cancer registry, a cancer screening registry and a cancer waiting times registry. IARC's GLOBOCAN 2024 fact sheet names a national registry as its source for incidence in Qatar, and IARC's 2026 note on Qatar says an IARC country visit reviewed the registry's operations and that Qatar submitted national data to SurvCan 4. The registry's own site did not answer when this record was written; the 2020 report was read from an Internet Archive copy.",
    programs: ["Annual cancer incidence reports", "Cancer Screening Registry", "Cancer Waiting Times Registry"],
    institutions: ["moph-qatar", "hamad-medical-corporation", "iarc"],
    links: [
      { label: "Qatar National Cancer Registry: Annual Cancer Report 2020 (PDF, Internet Archive copy)", url: QNCR_2020 },
      { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
      { label: "Qatar News Agency: registry releases 2018 figures (27 April 2021)", url: QNA_REGISTRY_2021 },
      { label: "IARC: Impact in practice, the Qatar experience (PDF, 2026)", url: IARC_IMPACT },
      { label: "IARC: GLOBOCAN 2024 fact sheet, Qatar (PDF)", url: IARC_FACTSHEET },
    ] }),

  i({ id: "phcc-qatar", name: "Primary Health Care Corporation, Qatar", aka: ["PHCC", "PHCC Qatar"],
    city: "Doha", country: "QA", lat: 25.29, lng: 51.53, institutionType: "government", website: "https://www.phcc.gov.qa",
    tldr: "The corporation that runs Qatar's primary health centres. It runs the national breast and bowel cancer screening programmes and offers cervical screening in its Well Woman Clinics.",
    summary: "A Hamad Medical Corporation guide dated August 2020 says the Primary Health Care Corporation operates 27 health centres across Qatar. The corporation's own pages say it screens women aged 45 to 69 for breast cancer by mammogram, with screening recommended every three years, and registered men and women aged 50 to 74 for bowel cancer with a faecal immunochemical test kit, recommended every two years; people are invited by its screening call centre on 8001112, referred by a physician or refer themselves, and abnormal results go to Hamad Medical Corporation. It offers cervical screening by Pap smear, followed by HPV testing based on the result, to women aged 21 to 69 through its Well Woman Clinics, every three years to age 49 and every five years from 50 to 69, by physician referral or self-referral. The Qatar Cancer Plan 2023-2026 names it as lead for deliverables that include postal delivery of bowel screening tests and tele-radiology reading for breast screening.",
    programs: ["National Breast Cancer Screening Program", "National Bowel Cancer Screening Program", "Cervical cancer screening (Well Woman Clinics)"],
    institutions: ["moph-qatar", "hamad-medical-corporation"],
    cancers: ["colorectal", "cervical"],
    links: [
      { label: "Primary Health Care Corporation: breast cancer screening", url: PHCC_BREAST },
      { label: "Primary Health Care Corporation: bowel cancer screening", url: PHCC_BOWEL },
      { label: "Primary Health Care Corporation: cervical cancer screening", url: PHCC_CERVICAL },
      { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
      { label: "Hamad Medical Corporation: Guide to Cancer Services in Qatar (PDF, August 2020)", url: HMC_GUIDE },
    ] }),
];

/** Records behind /countries/qa/ (wave 13). */
export const recordsQA: EntityInput[] = [...institutions];
