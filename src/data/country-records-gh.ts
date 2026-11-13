import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Ghana: the public bodies and papers behind /countries/gh/ (wave 7) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministry of Health's National Strategy for Cancer
 * Control in Ghana 2012 to 2016 (PDF text, ICCP portal) and its April 2025 news page on the Ghana Medical Trust Fund,
 * the National Health Insurance Scheme's benefits page and its news pages of November 2021 and November 2025, the Food
 * and Drugs Authority's history and clinical trials authorisation pages, WHO's May 2020 feature on the Authority's
 * maturity level 3, the African Cancer Registry Network's 2017 page for the Kumasi Cancer Registry (read through the
 * Internet Archive, as the live page returns "not found"), and Graphic Online's reports of December 2025 and May 2026
 * on the Trust Fund. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed
 * abstracts.
 *
 * Inbound links: the Ministry links the insurer, the regulator, the Trust Fund, the registry and the two teaching
 * hospitals; the registry links its two incidence papers through keyPapers. Korle Bu and Komfo Anokye Teaching
 * Hospitals already exist (world.ts, centres-wave3.ts) and are reused, not duplicated. Coordinates for the Accra bodies
 * are approximate city or district points, not building positions; the registry's are those of the Komfo Anokye campus.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NSCC_2011 = "https://www.iccp-portal.org/system/files/plans/Cancer%20Plan%20Ghana%20Ministry%20of%20Health.pdf";
const MOH_GMTF = "https://moh.gov.gh/president-mahama-launches-ghana-medical-trust-fund-to-support-chronic-disease-care/";
const NHIS_BENEFITS = "https://www.nhis.gov.gh/benefits";
const NHIS_CHILD = "https://www.nhis.gov.gh/News/childhood-cancers-included-in-nhis-benefit-package-5365";
const NHIS_18M = "https://nhis.gov.gh/News/nhis-registers-over-18-million-active-members--5982";
const GNA_CHILD = "https://gna.org.gh/2023/09/nhis-saving-lives-of-children-with-childhood-cancers/";
const FDA_HISTORY = "https://fdaghana.gov.gh/history/";
const FDA_CT = "https://fdaghana.gov.gh/services-2/clinical-trials-authorization-service/";
const WHO_FDA_ML3 = "https://www.who.int/news-room/feature-stories/detail/ghana-bolsters-medicines-regulatory-system-guarantees-product-quality";
const AFCRN_KUMASI_WB = "https://web.archive.org/web/2026/https://afcrn.org/membership/members/99-kath";
const GRAPHIC_GMTF_PAYOUT = "https://www.graphic.com.gh/news/general-news/mahamacares-begins-payouts-as-government-sets-14-day-response-time-for-applications.html";
const GRAPHIC_GMTF_CANCER = "https://www.graphic.com.gh/news/general-news/ghana-news-mahamacares-begins-next-month-focuses-on-cancer-treatment-administrator";
const IAEA_IMPACT_WB = "https://web.archive.org/web/2026/https://www.iaea.org/newscenter/news/impact-review-identifies-opportunities-to-strengthen-cancer-control-planning-in-ghana";

const institutions: InstitutionInput[] = [
  i({ id: "ghana-ministry-of-health", name: "Ministry of Health, Ghana", aka: ["MOH Ghana", "Ghana Ministry of Health"],
    city: "Accra", country: "GH", lat: 5.567, lng: -0.196, institutionType: "government", website: "https://moh.gov.gh",
    tldr: "Ghana's health ministry. It wrote the National Strategy for Cancer Control 2012 to 2016, launched the Ghana Medical Trust Fund in April 2025, and worked with the IAEA, WHO and IARC on the review of cancer services held in April 2026.",
    summary: "The Ministry of Health's National Strategy for Cancer Control in Ghana 2012 to 2016, dated July 2011, aimed to document 50% of all cancer cases and establish a cancer registry, to reduce cancer incidence and mortality by 30% through prevention, screening and early detection, and to improve diagnosis and treatment; it was costed at 46,564,000 US dollars over five years. The coordinates on this record are an approximate point for the Ministry's offices in North Ridge, Accra.\n\nIn April 2025 the Ministry launched the Ghana Medical Trust Fund, known as MahamaCares, to pay for care and medicines for non-communicable diseases that the National Health Insurance Scheme does not cover. In November 2025 it held a first National Cancer Forum to develop a national cancer control framework and a revised five-year strategy, at which the Minister said the Trust Fund would cover cancer treatment from 2026. From 19 to 24 April 2026 an imPACT Review team of 11 experts nominated by the IAEA, WHO and IARC visited Accra, Kumasi and Tamale and recommended an updated, costed National Cancer Control Plan and more early detection, diagnosis and radiotherapy; it counted four radiotherapy machines in operation nationwide.",
    programs: ["National Strategy for Cancer Control in Ghana 2012 to 2016", "Ghana Medical Trust Fund (MahamaCares, launched April 2025)", "National Cancer Forum (November 2025)", "imPACT Review (April 2026)"],
    institutions: ["nhia-ghana", "fda-ghana", "ghana-medical-trust-fund", "kumasi-cancer-registry", "korle-bu-teaching-hospital", "komfo-anokye-teaching-hospital", "iaea", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "prostate", "hcc", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-scott-radiotherapy-access-ghana-jamanetworkopen-2022", "paper-appiah-cervical-screening-ghana-dhs-bmcwh-2025", "paper-yarney-accra-cancer-registry-jgo-2020"],
    links: [
      { label: "National Strategy for Cancer Control in Ghana 2012 to 2016 (Ministry of Health, July 2011, PDF, ICCP portal)", url: NSCC_2011 },
      { label: "Ministry of Health: President Mahama launches Ghana Medical Trust Fund (29 April 2025)", url: MOH_GMTF },
      { label: "IAEA: imPACT Review identifies opportunities to strengthen cancer control planning in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
      { label: "Ghanaian Times: Ghana Medical Trust Fund to cover all cancer treatment next year (19 November 2025)", url: "https://ghanaiantimes.com.gh/ghana-medical-trust-fund-to-cover-all-cancer-treatment-next-year-health-minister/" },
    ] }),

  i({ id: "nhia-ghana", name: "National Health Insurance Authority, Ghana (NHIA)", aka: ["NHIA Ghana", "National Health Insurance Scheme", "NHIS Ghana"],
    city: "Accra", country: "GH", lat: 5.566, lng: -0.191, institutionType: "government", website: "https://www.nhis.gov.gh",
    tldr: "Ghana's national health insurer, which runs the National Health Insurance Scheme. Its benefit package pays for breast and cervical cancer treatment and, since June 2022, for four childhood cancers, but excludes treatment of other cancers.",
    summary: "The National Health Insurance Authority runs Ghana's National Health Insurance Scheme from its head office at 36 6th Avenue, Ridge Residential Area, Accra; the coordinates are an approximate district point. Its benefits page lists cervical and breast cancer treatment among in-patient services, with diagnosis and complications of other cancers, and lists cancer treatment other than cervical and breast cancer, and medicines not on the NHIS Medicines List, among the exclusions.\n\nIn November 2021 the Scheme announced that diagnosis and treatment of four childhood cancers (acute lymphoblastic leukaemia, Burkitt lymphoma, retinoblastoma and Wilms tumour), which it said make up about 60% of childhood cancers, would join the benefit package; a September 2023 statement reported by the Ghana News Agency dates implementation to June 2022 and names seven treating facilities: Korle Bu, Cape Coast, Komfo Anokye, Ho and Tamale Teaching Hospitals, Greater Accra Regional Hospital and Holy Family Hospital, Techiman.\n\nIn November 2025 its research unit reported 18.47 million members enrolled in 2024 and said 56.3% of Ghanaians were active members, with a target of 20 million active members by the end of 2025. WHO's Global Health Observatory puts out-of-pocket spending at 26.7% of current health expenditure in Ghana in 2023.",
    programs: ["National Health Insurance Scheme", "Breast and cervical cancer treatment benefit", "Childhood cancer benefit (four cancers, from June 2022)", "NHIS Medicines List"],
    institutions: ["ghana-ministry-of-health", "ghana-medical-trust-fund", "korle-bu-teaching-hospital", "komfo-anokye-teaching-hospital"],
    cancers: ["breast-cancer", "cervical", "childhood-cancers", "burkitt-lymphoma", "retinoblastoma", "wilms-tumor"],
    keyPapers: ["paper-adanu-breast-cancer-household-cost-ghana-pgph-2022"],
    links: [
      { label: "NHIS: benefits and exclusions", url: NHIS_BENEFITS },
      { label: "NHIS: childhood cancers included in NHIS benefit package (16 November 2021)", url: NHIS_CHILD },
      { label: "Ghana News Agency: NHIS, saving lives of children with childhood cancers (12 September 2023)", url: GNA_CHILD },
      { label: "NHIS: NHIS registers over 18 million active members (6 November 2025)", url: NHIS_18M },
    ] }),

  i({ id: "fda-ghana", name: "Food and Drugs Authority, Ghana (FDA Ghana)", aka: ["FDA Ghana", "Ghana FDA", "Food and Drugs Board, Ghana"],
    city: "Accra", country: "GH", lat: 5.6, lng: -0.17, institutionType: "government", website: "https://fdaghana.gov.gh",
    tldr: "Ghana's medicines regulator. WHO rated it at maturity level 3 for medicines in 2020, the second in the WHO African Region, and its clinical trials function reached maturity level 4 in July 2024.",
    summary: "The Food and Drugs Board was established by the Food and Drugs Law 1992 (PNDCL 305B); its first board was inaugurated on 26 August 1997, and it became the Food and Drugs Authority under the Public Health Act 2012 (Act 851). It registers medicines, licenses facilities and authorises clinical trials. The coordinates are an approximate Accra city point.\n\nWHO's feature of 13 May 2020 says Ghana became the second country in the WHO African Region, after Tanzania in November 2018, to reach maturity level 3, the second-highest of WHO's four levels, after Global Benchmarking Tool evaluations in 2014, 2015 and 2019. The Authority's clinical trials page states that its Clinical Trials Function attained maturity level 4 in clinical trials oversight in July 2024, which it describes as a first for a regulator in Africa.\n\nUnder Part 8 of Act 851 no clinical trial of a drug, herbal medicinal product, cosmetic, medical device or procedure may run without the Authority's certificate, issued after ethics committee approval. An application must include proof of registration with the Pan African Clinical Trials Registry, and for a trial already approved by a well-resourced regulator the Authority can use a reliance pathway based on that regulator's full assessment reports. Summaries of its reviews are published as public assessment reports.",
    programs: ["Marketing authorisation of medicines", "Clinical trial authorisation (Public Health Act 2012, Part 8)", "Reliance pathway for clinical trials", "Public assessment reports", "Pharmacovigilance (Safety Watch)"],
    institutions: ["ghana-ministry-of-health", "who"],
    links: [
      { label: "FDA Ghana: history", url: FDA_HISTORY },
      { label: "FDA Ghana: clinical trials authorization", url: FDA_CT },
      { label: "WHO: Ghana bolsters medicines regulatory system, guarantees product quality (13 May 2020)", url: WHO_FDA_ML3 },
    ] }),

  i({ id: "kumasi-cancer-registry", name: "Kumasi Cancer Registry", aka: ["KsCR", "KCR", "Kumasi Population-Based Cancer Registry"],
    city: "Kumasi", country: "GH", lat: 6.694, lng: -1.627, institutionType: "research-institute", website: AFCRN_KUMASI_WB,
    tldr: "Ghana's population-based cancer registry for the city of Kumasi, run from Komfo Anokye Teaching Hospital. It began as a hospital registry in 2004 and has counted cancers among Kumasi residents since 2012.",
    summary: "The Kumasi Cancer Registry was set up in 2004 as a hospital-based registry at Komfo Anokye Teaching Hospital, first drawing on the hospital's radiotherapy and oncology directorate. Its African Cancer Registry Network page, dated March 2017, says a network visit in 2012 recommended conversion to population-based registration, its manager was trained in Malawi in July 2012, and its reference population is the city of Kumasi as defined by the 2010 census, about 2,035,064 people. It was run from the hospital's Public Health Unit with one full-time and five part-time registrars, drawing on all clinical departments of the hospital, private pathology laboratories, private clinics and Ghana Health Service facilities. The coordinates on this record are those of the hospital campus, approximately.\n\nIts first paper, for 2012, reported age-standardised incidence of 10.9 per 100,000 men and 22.4 per 100,000 women, with liver and prostate cancer leading in men and breast and cervical cancer in women. Its 2015 data counted 736 cancers among Kumasi residents, an incidence of 46.1 per 100,000. At its official launch in April 2015 the registry's manager said 1,070 cancers had been recorded in 2012 to 2014, that it had been funded from the hospital's own budget, and that it could not yet reach private hospitals, private laboratories, herbal centres or prayer camps. A 2025 review calls it Ghana's only population-based registry. It was not on the African Cancer Registry Network's current membership list when that list was read on 11 November 2026.",
    programs: ["Population-based cancer registration for Kumasi (from 2012)", "Hospital-based cancer registration at Komfo Anokye Teaching Hospital (from 2004)"],
    institutions: ["komfo-anokye-teaching-hospital", "ghana-ministry-of-health", "iarc"], cancers: ["breast-cancer", "cervical", "prostate", "hcc"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-laryea-kumasi-cancer-incidence-2012-bmccancer-2014", "paper-amoako-kumasi-malignant-tumours-2015-bmccancer-2019"],
    links: [
      { label: "African Cancer Registry Network: Ghana, Kumasi Cancer Registry (March 2017; read through the Internet Archive)", url: AFCRN_KUMASI_WB },
      doi("10.1186/1471-2407-14-362", "Laryea et al., cancer incidence in Ghana, 2012 (BMC Cancer 2014)"),
      doi("10.1186/s12885-019-5480-0", "Amoako et al., malignant tumours in urban Ghana: Kumasi (BMC Cancer 2019)"),
      { label: "MyJoyOnline: Kumasi Cancer Registry appeals for government, public support (24 April 2015)", url: "https://www.myjoyonline.com/kumasi-cancer-registry-appeals-for-government-public-support/" },
    ] }),

  i({ id: "ghana-medical-trust-fund", name: "Ghana Medical Trust Fund (MahamaCares)", aka: ["MahamaCares", "GMTF", "Mahama Cares"],
    city: "Accra", country: "GH", lat: 5.6, lng: -0.19, institutionType: "government",
    tldr: "A government fund launched in April 2025 to pay for treatment of chronic non-communicable diseases that national health insurance does not cover. The Health Minister said in December 2025 that it had begun paying out, and it chose cancer as the first disease group.",
    summary: "The Ghana Medical Trust Fund, also called MahamaCares, was launched by President John Dramani Mahama in April 2025. The Ministry of Health describes it as covering the cost of care and medication for non-communicable diseases not included in the National Health Insurance Scheme, including cancers, cardiovascular disease, chronic kidney failure and stroke, and investing in infrastructure, equipment, specialist training and research. The coordinates are an approximate Accra city point.\n\nGraphic Online reported that Parliament approved its governing law in July 2025 and that on 1 December 2025 the Health Minister said its board and secretariat were operating, disbursements had begun, about 2.3 billion cedis had been allocated, and an application made by a specialist doctor on a patient's behalf would be answered within 14 days. In May 2026 its Administrator said the Fund would roll out in phases, starting with cancers including four major childhood cancers, through 21 facilities joined by six private and quasi-government hospitals, which she put at 30 facilities in all; that a pilot in February supported 50 patients at a cost of nearly 4.8 million cedis; and that its readiness tour found only two functional radiotherapy machines in the country, both in Accra, with waits of up to four months, and about five mammography machines.",
    programs: ["MahamaCares cancer treatment support (from 2026)", "Specialist-doctor applications with a 14-day response"],
    institutions: ["ghana-ministry-of-health", "nhia-ghana", "korle-bu-teaching-hospital", "komfo-anokye-teaching-hospital"],
    cancers: ["breast-cancer", "cervical", "prostate", "childhood-cancers"],
    links: [
      { label: "Ministry of Health: President Mahama launches Ghana Medical Trust Fund (29 April 2025)", url: MOH_GMTF },
      { label: "Graphic Online: MahamaCares begins payouts as government sets 14-day response time (1 December 2025)", url: GRAPHIC_GMTF_PAYOUT },
      { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-laryea-kumasi-cancer-incidence-2012-bmccancer-2014", name: "Cancer incidence in Kumasi, Ghana, in 2012, from the country's first population-based registry",
    journal: "BMC Cancer", year: 2014, doi: "10.1186/1471-2407-14-362", pmid: "24884730", authors: "Laryea DO, Awuah B, Amoako YA, et al.", paperType: "observational",
    tldr: "In its first year as a population-based registry, the Kumasi Cancer Registry found most recorded cancers in women; liver and prostate cancer led in men, and breast and cervical cancer in women.",
    summary: "Published as \"Cancer incidence in Ghana, 2012: evidence from a population-based cancer registry\". The authors reviewed 2012 data from the Kumasi Cancer Registry, whose reference area is the city of Kumasi as designated by the 2010 census, drawing on all clinical departments of Komfo Anokye Teaching Hospital, pathology results, death certificates and the Kumasi South Regional Hospital.",
    findings: [
      "Women accounted for 69.6% of recorded cancers; mean age at diagnosis was 51.6 years (48.4 in men, 53.0 in women).",
      "In men the commonest cancers were liver (21.1%), prostate (13.2%), lung (5.3%) and stomach (5.3%); in women breast (33.9%), cervix (29.4%), ovary (11.3%) and endometrium (4.5%).",
      "Histology was the basis of diagnosis in 74% of cases; estimated age-standardised incidence was 10.9 per 100,000 men and 22.4 per 100,000 women.",
    ],
    whatItMeans: "The first population-based cancer figures for any part of Ghana. The very low rates against IARC's estimates point to cancers the registry could not yet capture rather than a low burden.",
    caveats: ["One city and the registry's first year; sources outside the main hospital were few.", "The abstract does not give the number of cases."],
    institutions: ["kumasi-cancer-registry", "komfo-anokye-teaching-hospital"], cancers: ["breast-cancer", "cervical", "prostate", "hcc"],
    links: [doi("10.1186/1471-2407-14-362", "BMC Cancer 2014"), pubmed("24884730")] }),

  p({ id: "paper-amoako-kumasi-malignant-tumours-2015-bmccancer-2019", name: "Malignant tumours in Kumasi, Ghana, in 2015, from the Kumasi Cancer Registry",
    journal: "BMC Cancer", year: 2019, doi: "10.1186/s12885-019-5480-0", pmid: "30909876", authors: "Amoako YA, Awuah B, Larsen-Reindorf R, et al.", paperType: "observational", participants: 736,
    tldr: "The Kumasi Cancer Registry recorded 736 cancers among the city's residents in 2015, an incidence of 46.1 per 100,000; breast, cervical and liver cancer were the commonest.",
    summary: "Published as \"Malignant tumours in urban Ghana: evidence from the city of Kumasi\". The authors reviewed 2015 data from the Kumasi Cancer Registry, entered in CanReg5, and compared aggregated data for 2013 and 2014.",
    findings: [
      "736 cancers were recorded among Kumasi residents in 2015; 62.4% were in women and the mean age was 51.3 years.",
      "Overall incidence was 46.1 per 100,000: 54.1 in women and 37.1 in men.",
      "Breast (16.1 per 100,000) and cervical cancer (13.7) led in women and prostate cancer (10.5) in men; breast, cervical and liver cancer were 19.7%, 14.7% and 11.4% of all cases.",
    ],
    whatItMeans: "Coverage and data quality improved after the registry's first years, but its rates remain well below IARC's national estimates, so they are best read as a floor.",
    caveats: ["One city; the abstract does not say whether the sex-specific rates are age-standardised.", "The registry's managers said in 2015 that private facilities, herbalists and prayer camps were not yet covered."],
    institutions: ["kumasi-cancer-registry", "komfo-anokye-teaching-hospital"], cancers: ["breast-cancer", "cervical", "prostate", "hcc"],
    links: [doi("10.1186/s12885-019-5480-0", "BMC Cancer 2019"), pubmed("30909876")] }),

  p({ id: "paper-yarney-accra-cancer-registry-jgo-2020", name: "How the Accra Cancer Registry was set up in Ghana",
    journal: "JCO Global Oncology", year: 2020, doi: "10.1200/JGO.19.00387", pmid: "32302237", authors: "Yarney J, Ohene Oti NO, Calys-Tagoe BNL, et al.", paperType: "methods",
    tldr: "Because IARC graded Ghana's cancer data at its lowest level for GLOBOCAN 2012, the Accra Cancer Registry was set up with Stanford University, the African Cancer Registry Network and the University of Ghana, covering nine municipal districts.",
    summary: "Published as \"Establishing a Cancer Registry in a Resource-Constrained Region: Process Experience From Ghana\". The authors describe the policy basis, data sources, administration, external support and geographic coverage of the Accra Cancer Registry.",
    findings: [
      "In GLOBOCAN 2012 Ghana's data sources were classified as Frequencies, the lowest classification for inclusion.",
      "The registry was set up under the national cancer control strategy, with trained registrars actively abstracting cases from hospital departments and pathology services, using CanReg5.",
      "Support came mainly from Stanford University and the African Cancer Registry Network with the University of Ghana; the registry's population is nine municipal districts, and it has an advisory board and technical committee.",
    ],
    whatItMeans: "The Accra registry was meant to become the focal point for national cancer data; the abstract reports no incidence figures, and OnCo found none published.",
    caveats: ["A process description by the registry's founders, not an evaluation."],
    institutions: ["korle-bu-teaching-hospital"], cancers: ["breast-cancer", "cervical", "prostate"],
    links: [doi("10.1200/JGO.19.00387", "JCO Glob Oncol 2020"), pubmed("32302237")] }),

  p({ id: "paper-scott-radiotherapy-access-ghana-jamanetworkopen-2022", name: "How far Ghanaians live from radiotherapy and how many receive it",
    journal: "JAMA Network Open", year: 2022, doi: "10.1001/jamanetworkopen.2022.26319", pmid: "35951324", authors: "Scott AA, Polo A, Zubizarreta E, et al.", paperType: "observational", participants: 2883,
    tldr: "In 2020, 2,883 patients had external beam radiotherapy in Ghana, about 23% of those who needed it; meeting demand would take 23 more machines, and a centre in the north would bring many more people within reach.",
    summary: "A cross-sectional, population-based study of radiotherapy delivery in Ghana in 2020, with model-based estimates of demand using the Global Task Force on Radiotherapy for Cancer Control investment framework, and geocoded distances from district centres to the nearest radiotherapy centre.",
    findings: [
      "2,883 patients had external beam radiotherapy in 2020, a utilisation rate of 11% against an optimal 48%; 11,524 patients had an indication, so only 23% were treated.",
      "23 additional external beam machines would be needed to meet demand.",
      "Median distance to the nearest radiotherapy centre was 110.6 km; 47% of people lived within 100 km. A new centre in the northern regional capital would raise that to 53% and the share within 200 km from 70% to 84%.",
    ],
    whatItMeans: "Radiotherapy in Ghana is too scarce and too far from the north; the authors' modelling supports a centre in Tamale, which the Ministry of Health and the IAEA have since discussed.",
    caveats: ["Straight-line distances, not travel times.", "Demand is modelled from estimated incidence."],
    institutions: ["korle-bu-teaching-hospital", "komfo-anokye-teaching-hospital", "iaea"], cancers: ["cervical", "breast-cancer", "prostate"],
    links: [doi("10.1001/jamanetworkopen.2022.26319", "JAMA Netw Open 2022"), pubmed("35951324")] }),

  p({ id: "paper-appiah-cervical-screening-ghana-dhs-bmcwh-2025", name: "Cervical screening uptake among women in Ghana from the 2022 Demographic and Health Survey",
    journal: "BMC Women's Health", year: 2025, doi: "10.1186/s12905-025-03802-3", pmid: "40420073", authors: "Appiah RS, Boakye K, Appiah G, et al.", paperType: "observational", participants: 14973,
    tldr: "In Ghana's 2022 national household survey, 4.6% of women had ever been screened for cervical cancer: 6.3% in towns and 3.0% in rural areas.",
    summary: "Published as \"Rural-urban variations in cervical cancer screening uptake among women in Ghana: Evidence from the 2022 Ghana Demographic and Health Survey\". A cross-sectional analysis of 14,973 women in the survey's women's file, with logistic regression for factors associated with screening.",
    findings: [
      "4.6% of the 14,973 women had been screened for cervical cancer: 6.3% of urban and 3.0% of rural women.",
      "In both settings, age 40 to 49, tertiary education, the richest wealth quintile, access to mass media and enrolment in health insurance were associated with higher odds of screening.",
    ],
    whatItMeans: "Without a national programme, very few Ghanaian women have ever been screened, and rural women least of all.",
    caveats: ["Self-reported screening; the survey covers women of reproductive age, not older women."],
    institutions: ["ghana-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1186/s12905-025-03802-3", "BMC Womens Health 2025"), pubmed("40420073")] }),

  p({ id: "paper-adanu-breast-cancer-household-cost-ghana-pgph-2022", name: "What breast cancer treatment costs households at Korle Bu Teaching Hospital",
    journal: "PLOS Global Public Health", year: 2022, doi: "10.1371/journal.pgph.0000268", pmid: "36962351", authors: "Adanu KK, Bansah EC, Adedia D, Aikins M", paperType: "observational", participants: 74,
    tldr: "Among 74 breast cancer patients at Korle Bu, average household spending on treatment was about 990 US dollars, most of it medical, while nearly 57% of patients earned 370 US dollars a month or less.",
    summary: "A cost-of-illness study at a surgical unit of Korle Bu Teaching Hospital, with 74 randomly selected patients and their caregivers, collecting direct, indirect and intangible costs and coping strategies by structured questionnaire.",
    findings: [
      "Average household expenditure was 990.40 US dollars: 789.78 medical, 150.73 non-medical and 50 indirect.",
      "Nearly 57% of patients earned 370 US dollars or less a month.",
      "Publicly provided mechanisms were the most used coping strategy, and poorer families were more likely to rely on them.",
    ],
    whatItMeans: "Even with breast cancer treatment in the insurance benefit package, families in Ghana carry large costs.",
    caveats: ["One unit of one hospital; 74 patients."],
    institutions: ["korle-bu-teaching-hospital", "nhia-ghana"], cancers: ["breast-cancer"],
    links: [doi("10.1371/journal.pgph.0000268", "PLOS Glob Public Health 2022"), pubmed("36962351")] }),
];

/** Records behind /countries/gh/ (wave 7). */
export const recordsGH: EntityInput[] = [...institutions, ...papers];
