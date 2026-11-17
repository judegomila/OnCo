/**
 * Canada deep dive: the hand-written cards and the one hand-built table for /countries/ca/. Plain English first,
 * detail second, every card with its sources. Entity lists are pulled from the graph on the page by id so they stay
 * in step with the corpus.
 *
 * Written from Canadian primary sources rather than from the corpus: the Canadian Cancer Statistics publications of
 * the Canadian Cancer Society, Statistics Canada and the Public Health Agency of Canada (the 2025 full report and the
 * 2026 projections published in CMAJ), Statistics Canada's own description of the Canadian Cancer Registry, Health
 * Canada's guidance on priority review, Notice of Compliance with conditions and Project Orbis, the Council of the
 * Federation's page on the pan-Canadian Pharmaceutical Alliance, INESSS's own pages (in French), the Canadian Cancer
 * Trials Group's 2025 annual report, the Marathon of Hope Cancer Centres Network and the Canadian Partnership Against
 * Cancer. Canada's Drug Agency (CDA-AMC) answered every scripted request with a browser challenge, so its process is
 * described through peer-reviewed analyses of its decisions, each named; that is listed as a gap at the end.
 *
 * Counting conventions worth holding in mind:
 *  - Canadian Cancer Statistics standardise rates to the 2021 Canadian population from the 2025 edition onward; they
 *    are not comparable with earlier editions or with GLOBOCAN's world-standard rates.
 *  - National incidence leaves out Quebec from 2018 and Nova Scotia from 2020 or 2021 in different products, because
 *    those provinces' cases had not reached the Canadian Cancer Registry; the cards say which product excludes what.
 *  - "All cancers" in the Canadian figures excludes non-melanoma skin cancer and includes in situ bladder cancer.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const CA_ASOF = "2026-11-03";

/** Sources cited from several cards. */
const CMAJ_2026 = { label: "Brenner DR et al. Projected estimates of cancer in Canada in 2026. CMAJ 2026;198:E526-34", url: "https://doi.org/10.1503/cmaj.252152" };
const CCS_2025 = { label: "Canadian Cancer Statistics 2025 (Canadian Cancer Society, Statistics Canada, Public Health Agency of Canada), full report PDF", url: "https://cdn.cancer.ca/-/media/files/research/cancer-statistics/2025-statistics/2025_pdf_final_en.pdf" };
const CCS_2026_SPECIFIC = { label: "Cancer-specific stats 2026 (Canadian Cancer Society, PDF)", url: "https://cdn.cancer.ca/-/media/files/research/cancer-statistics/2026-cmaj/2026_cancer-specific_en.pdf" };
const CCS_2026_RELEASE = { label: "Cancer trends in Canada 2026: news release, 13 April 2026 (PDF)", url: "https://cdn.cancer.ca/-/media/files/research/cancer-statistics/2026-cmaj/2026_news_release_en.pdf" };
const CCS_HOME = { label: "Canadian Cancer Statistics (Canadian Cancer Society)", url: "https://cancer.ca/en/research/cancer-statistics/canadian-cancer-statistics" };
const CCR = { label: "Statistics Canada: Canadian Cancer Registry, survey description (record 3207)", url: "https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3207" };
const GOTFRIT = { label: "Gotfrit J et al. The pathway for new cancer drug access in Canada. Curr Oncol 2022", url: "https://doi.org/10.3390/curroncol29020041" };
const HC_PRIORITY = { label: "Health Canada: Guidance for industry, priority review of drug submissions", url: "https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/applications-submissions/guidance-documents/priority-review/drug-submissions.html" };
const HC_NOCC = { label: "Health Canada: Guidance document, Notice of Compliance with conditions (NOC/c)", url: "https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/applications-submissions/guidance-documents/notice-compliance-conditions.html" };
const HC_ORBIS = { label: "Health Canada: Project Orbis, faster access to promising cancer treatments", url: "https://www.canada.ca/en/health-canada/services/drugs-health-products/international-activities/project-orbis.html" };
const PCPA_COF = { label: "Council of the Federation: the pan-Canadian Pharmaceutical Alliance (2010 to present)", url: "https://canadaspremiers.ca/pan-canadian-pharmaceutical-alliance-archives/" };
const CCTG_AR = { label: "Canadian Cancer Trials Group: 2025 annual report (PDF)", url: "https://www.ctg.queensu.ca/images/1-public-pages/annual_report/CCTG-2025-AnnualReport.pdf" };

export const CA_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "About 254,000 new cancers and 88,000 deaths a year, with lung cancer first on both counts",
    plain: "Canada's cancer statisticians project 254,100 new cancers and 87,900 cancer deaths in 2026. Lung cancer is both the most diagnosed cancer and the leading cause of cancer death. Lung, breast, prostate and bowel cancer together make up 47 per cent of new diagnoses, and 42 per cent of people in Canada are expected to be diagnosed with cancer at some point in their lives.",
    detail: "The 2026 projections, published in CMAJ on 13 April 2026 by the Canadian Cancer Statistics Advisory Committee with the Canadian Cancer Society, Statistics Canada and the Public Health Agency of Canada, put lung cancer at 32,900 new cases and 19,300 deaths (the news release says 19,200), causing one cancer death in five. Breast follows at 32,700 cases, prostate at 29,300 and colorectal at 25,300; pancreatic cancer, eleventh by cases at 7,500, is projected to be the third leading cause of cancer death at 6,500, behind lung and colorectal. The age-standardised incidence rate for all cancers is 591.4 per 100,000 and the mortality rate 200.0, both on the 2021 Canadian standard population and both projected to fall; the incidence rate is 16 per cent higher in males (642.2 against 553.9) and the mortality rate 36 per cent higher (235.8 against 172.8). The release adds that cancer caused about one in four deaths in Canada in 2023 and remains the leading cause of death. In the 2025 report, 93 per cent of new cases in males and 87 per cent in females were expected in people aged 50 and over.",
    links: [CMAJ_2026, CCS_2026_RELEASE, CCS_2026_SPECIFIC],
  },
  {
    id: "lung-in-women",
    title: "More women than men projected to be diagnosed with lung cancer, and not all of it explained by smoking",
    plain: "More females than males are projected to be diagnosed with lung cancer in Canada in 2026. The authors say a higher share of lung cancers in women is not explained by tobacco, and point to radon, air pollution and other exposures.",
    detail: "The news release accompanying the 2026 CMAJ article lists among its key findings that \"more females than males are projected to be diagnosed with lung cancer in 2026\". The authors write that \"a higher proportion of lung cancers among females are not explained by tobacco consumption\", and suggest that other exposures, among them lifestyle factors, radon and air pollution, may need to be addressed to reduce incidence further. Lung cancer remains the leading cause of cancer death in both sexes. The same release notes that many provinces have now started lung cancer screening programmes at various stages of implementation. Colorectal cancer runs the other way: it is projected to be 32 per cent lower in males and 29 per cent lower in females than in the early 2000s, and the 2025 report attributes part of the decline since 2011 to organised colorectal screening, which Yukon and every province except Quebec introduced between 2007 and 2016.",
    links: [CCS_2026_RELEASE, CMAJ_2026, CCS_2025],
  },
  {
    id: "survival",
    title: "Five-year survival of 64 per cent, up from 55 per cent in the early 1990s",
    plain: "Predicted five-year net survival, which sets aside deaths from other causes, is 64 per cent for people diagnosed with cancer in Canada in 2015 to 2017, against 55 per cent in the early 1990s. For children, 84 per cent survive at least five years. Survival is highest for thyroid and testicular cancer (97 per cent) and lowest for cancers of the bile ducts inside the liver (6 per cent), pancreas (10 per cent) and oesophagus (16 per cent).",
    detail: "The 2025 report gives predicted five-year net survival for all cancers combined of 64 per cent for diagnoses in 2015 to 2017, ages 15 to 99, Canada excluding Quebec; ten-year net survival is 58 per cent. It was 66 per cent in females and 62 per cent in males. Survival has improved since the early 1990s for every cancer reported except those of the central nervous system, intrahepatic bile duct, uterus and soft tissues, with some of the largest gains in blood cancers; acute myeloid leukaemia remains at 23 per cent against 86 per cent for chronic lymphocytic leukaemia. Among the provinces studied, five-year survival for all cancers is highest in Ontario (64 per cent) and lowest in Nova Scotia (61 per cent). Mortality rates for all cancers combined peaked in 1988 and have fallen since, with lung, colorectal and bladder cancer death rates falling by more than 3 per cent a year in recent years, while the number of deaths keeps rising with a growing and ageing population. These survival figures are now about a decade old: the 2026 cancer-specific table still quotes survival for cases diagnosed in 2015 to 2017.",
    links: [CCS_2025, CCS_2026_SPECIFIC],
  },
  {
    id: "east-west",
    title: "Rates lowest in the west and highest in the east, with Quebec highest of all",
    plain: "Cancer rates in Canada rise from west to east. British Columbia is projected to have the lowest incidence rate of the provinces and Quebec the highest, followed by Newfoundland and Labrador. The report warns that Quebec's figures are projected from data that stop in 2017.",
    detail: "The 2025 report projects the highest age-standardised incidence rates in Quebec, 727.4 per 100,000 in males and 618.4 in females, reflecting the highest projected rates for lung, breast and prostate cancer; prostate ranges from 137.0 per 100,000 in New Brunswick to 169.7 in Quebec, and female breast from 125.5 in New Brunswick to 166.1 in Quebec. Colorectal cancer is projected to be highest in Newfoundland and Labrador (116.8 per 100,000 in males and 71.4 in females) and lowest in Alberta for males (64.0) and Saskatchewan for females (42.6). Mortality follows the same gradient: lower in the western provinces and Ontario, higher in Quebec and the eastern provinces. The report attributes the differences to risk factors such as smoking and obesity and also to diagnostic practice, data collection and data availability, noting that \"projections for Quebec are based on data up to 2017, while data up to 2019 were available for other provinces and territories, which could have influenced Quebec's ranking.\" Melanoma rates are highest in Nova Scotia and Prince Edward Island.",
    links: [CCS_2025, CCS_2026_RELEASE],
  },
];

/** One row of the 2026 cancer-specific snapshot, read from the Canadian Cancer Society's PDF. */
export type SnapshotRow = { id: string; site: string; cases: number; deaths: number; survival: number | null; cancerIds: string[] };

/**
 * Cancer-specific stats 2026, "Snapshot of incidence, mortality and survival estimates by cancer type", both sexes.
 * Cases and deaths are the CMAJ 2026 projections; survival is predicted five-year net survival for 2015 to 2017 from
 * Canadian Cancer Statistics 2025 Table 3.1. "All other cancers" has no survival figure in the source.
 */
export const CA_SNAPSHOT: SnapshotRow[] = [
  { id: "all", site: "All cancers", cases: 254100, deaths: 87900, survival: 64, cancerIds: [] },
  { id: "lung", site: "Lung and bronchus", cases: 32900, deaths: 19300, survival: 22, cancerIds: ["nsclc"] },
  { id: "breast", site: "Breast", cases: 32700, deaths: 5400, survival: 89, cancerIds: ["breast-hr-positive"] },
  { id: "prostate", site: "Prostate", cases: 29300, deaths: 5300, survival: 91, cancerIds: ["prostate"] },
  { id: "colorectal", site: "Colorectal", cases: 25300, deaths: 9200, survival: 67, cancerIds: ["colorectal"] },
  { id: "bladder", site: "Bladder", cases: 13200, deaths: 2500, survival: 77, cancerIds: ["bladder"] },
  { id: "nhl", site: "Non-Hodgkin lymphoma", cases: 12100, deaths: 3200, survival: 69, cancerIds: ["dlbcl"] },
  { id: "melanoma", site: "Melanoma", cases: 11300, deaths: 1250, survival: 89, cancerIds: ["melanoma"] },
  { id: "uterus", site: "Uterus (body, not otherwise specified)", cases: 8800, deaths: 1750, survival: 82, cancerIds: ["endometrial"] },
  { id: "kidney", site: "Kidney and renal pelvis", cases: 8600, deaths: 1950, survival: 73, cancerIds: ["rcc"] },
  { id: "head-neck", site: "Head and neck", cases: 8200, deaths: 2300, survival: 64, cancerIds: ["head-and-neck"] },
  { id: "pancreas", site: "Pancreas", cases: 7500, deaths: 6500, survival: 10, cancerIds: ["pancreatic"] },
  { id: "leukemia", site: "Leukaemia", cases: 6500, deaths: 3200, survival: 61, cancerIds: ["aml", "cll"] },
  { id: "thyroid", site: "Thyroid", cases: 6100, deaths: 310, survival: 97, cancerIds: ["thyroid"] },
  { id: "liver", site: "Liver and intrahepatic bile duct", cases: 4700, deaths: 3600, survival: 18, cancerIds: ["hcc"] },
  { id: "myeloma", site: "Myeloma", cases: 4400, deaths: 1800, survival: 50, cancerIds: ["multiple-myeloma"] },
  { id: "stomach", site: "Stomach", cases: 4200, deaths: 2000, survival: 29, cancerIds: ["gastric"] },
  { id: "brain", site: "Brain and other nervous system", cases: 3300, deaths: 2700, survival: 22, cancerIds: ["glioblastoma"] },
  { id: "ovary", site: "Ovary", cases: 3000, deaths: 1950, survival: 44, cancerIds: ["ovarian"] },
  { id: "esophagus", site: "Oesophagus", cases: 2800, deaths: 2500, survival: 16, cancerIds: ["esophageal"] },
  { id: "cervix", site: "Cervix", cases: 1700, deaths: 450, survival: 74, cancerIds: ["cervical"] },
  { id: "soft-tissue", site: "Soft tissue (including heart)", cases: 1650, deaths: 700, survival: 61, cancerIds: [] },
  { id: "testis", site: "Testis", cases: 1300, deaths: 40, survival: 97, cancerIds: ["testicular"] },
  { id: "hodgkin", site: "Hodgkin lymphoma", cases: 1250, deaths: 120, survival: 85, cancerIds: ["hodgkin-lymphoma"] },
  { id: "other", site: "All other cancers", cases: 23000, deaths: 10000, survival: null, cancerIds: [] },
];

export const CA_REGISTRY: CountryCard[] = [
  {
    id: "what-it-is",
    title: "Thirteen provincial and territorial registries, pooled by Statistics Canada since 1992",
    plain: "Canada has no single national cancer registry in the sense of one office recording every case. Each province and territory runs its own registry by law, and sends its records each year to Statistics Canada, which keeps them as the Canadian Cancer Registry. The provinces remain responsible for how complete and accurate the data are.",
    detail: "Statistics Canada's survey description (record 3207, data release 27 February 2026, detailed information for reference year 2023) describes the Canadian Cancer Registry as a person-based, population-based registry holding every new primary cancer diagnosed among Canadian residents since 1992, governed by the Canadian Council of Cancer Registries, a collaboration between the 13 provincial and territorial cancer registries and Statistics Canada's Centre for Population Health Data. \"Ultimate authority and responsibility for the completeness and the quality of the data resides with the provinces and territories while StatCan is the custodian of the CCR.\" Each registry finds cases from cancer clinic files, radiotherapy and haematology reports, hospital and outpatient records, pathology and laboratory reports, imaging, and death registrations. The national statistics are then produced from this registry and from the Canadian Vital Statistics Death Database by the Canadian Cancer Statistics Advisory Committee, which publishes a full report every second year and, in between, projections and a special report.",
    links: [CCR, CCS_HOME],
  },
  {
    id: "how-late",
    title: "How old the numbers are, and which provinces are missing from them",
    plain: "Canada's headline cancer numbers are projections, not counts. The 2026 projections rest on incidence data several years old, national survival figures are for people diagnosed in 2015 to 2017, and Quebec, home to about a fifth of Canadians, has been missing from national incidence counts from 2018 onward in the 2025 report.",
    detail: "The 2025 report explains that its incidence data run to 2021 but that 2020 was excluded from projections because the pandemic disrupted screening and diagnosis, so incidence projections rest on data to 2019; Quebec's cases diagnosed from 2018 onward had not been submitted to the Canadian Cancer Registry at the time of analysis, so Quebec was projected from 2017, and Nova Scotia's data were available only to 2019. Lifetime-probability tables therefore cover Canada excluding Quebec and Nova Scotia, and survival covers Canada excluding Quebec. The 2026 cancer-specific table labels its case projections \"based on data to 2019\" and its death projections \"based on data to 2022\", while the CMAJ abstract says registry data were used \"until 2022\". The article's methods explain the difference: incidence data from 1997 to 2022, with 2020 left out, were used for every jurisdiction except Quebec and Nova Scotia, whose cases diagnosed after 2017 and after 2019 respectively had not reached the registry, so the table's label appears to describe only part of the data. Statistics Canada's own description adds that cancer incidence data are currently not available for Nova Scotia for diagnosis years 2020 onward, and that cross-provincial de-duplication of records was last completed to the end of 2022 for all provinces and territories except Quebec, where it \"has not yet been completed and is ongoing\", and Nova Scotia, where it stops at 2019.",
    links: [CCS_2025, CCS_2026_SPECIFIC, CMAJ_2026, CCR],
  },
  {
    id: "how-to-compare",
    title: "Why Canadian rates should not be set beside older editions or other countries' rates",
    plain: "From the 2025 edition Canadian rates are age-standardised to Canada's 2021 population, which is older than the 2011 population used before, so the rates look higher without any real rise. They should not be compared with earlier editions, or with rates standardised to another population, such as GLOBOCAN's world standard in the table below.",
    detail: "The 2025 report states that incidence and mortality rates \"are now standardized to the 2021 Canadian standard population, whereas they were standardized to the 2011 Canadian standard population in previous editions (2016 to 2024)\", that the age-standardised rates \"will generally appear higher than those reported in previous editions\", and that they \"should not be compared to previous editions, nor should they be compared to rates standardized to different populations (e.g., between countries that use different standard populations).\" Its \"all cancers\" includes in situ bladder cancer and excludes non-melanoma skin cancer; bladder trends are modelled with a jump at 2010 because Ontario began registering in situ bladder carcinoma that year. Statistics Canada adds that Quebec's registry changed its sources in 2011 to 2013, adding pathology reports and then local hospital cancer registries to the hospital-discharge data it had relied on, so Quebec counts before 2011 are underestimates, most for prostate cancer and melanoma.",
    links: [CCS_2025, CCR],
  },
];

export const CA_PAYING: CountryCard[] = [
  {
    id: "two-systems",
    title: "Treatment is free at the point of care; whether a cancer drug is depends on how it is taken and where you live",
    plain: "Hospital and doctor care is publicly paid in every province. Cancer drugs are not handled the same way everywhere: in British Columbia, Alberta and Saskatchewan the provincial cancer agency pays for all cancer drugs, tablets included, while in Ontario and the eastern provinces drugs given by drip in hospital are covered and drugs taken at home go through the provincial drug plan, whose rules vary from province to province.",
    detail: "The Canada Health Act defines the insured health services of a provincial plan as hospital services, physician services and surgical-dental services, counts drugs among hospital services only \"when administered in the hospital\", and makes the full federal contribution depend on a province permitting no user charges or extra-billing for insured services. A 2022 review of the pathway for new cancer drugs in Current Oncology sets out the split. British Columbia, Alberta and Saskatchewan fund and administer all cancer drugs, oral and intravenous. Manitoba and Ontario also have cancer agencies, but funding and administration vary with the type of drug. In Ontario and eastern Canada, oral therapies are dispensed by community pharmacies and paid through the provincial public drug programmes, while intravenous cancer drugs given in hospital are paid by the cancer programmes. Quebec pays for intravenous cancer drugs from individual hospital budgets, reimbursed by the provincial health ministry. Federal plans that belong to the pan-Canadian Pharmaceutical Alliance cover particular groups: Non-Insured Health Benefits, Correctional Service Canada and Veterans Affairs Canada. The same review cites the Patented Medicine Prices Review Board's finding that annual spending on cancer drugs tripled to $3.9 billion in 2019, 14.6 per cent of the drug market against 7.1 per cent in 2009. OnCo has not read each province's current take-home drug rules and lists that as a gap.",
    links: [GOTFRIT, PCPA_COF, { label: "Canada Health Act, R.S.C. 1985, c. C-6 (Justice Laws Website)", url: "https://laws-lois.justice.gc.ca/eng/acts/C-6/FullText.html" }],
  },
  {
    id: "four-steps",
    title: "Four steps between a licence and a funded drug: Health Canada, the review agency, the price alliance, the province",
    plain: "A cancer drug licensed by Health Canada is then reviewed for value by Canada's Drug Agency (or by INESSS in Quebec), which makes a non-binding recommendation. If it is positive, the provinces negotiate one confidential price together through the pan-Canadian Pharmaceutical Alliance. Each province then decides whether and when to list it. A separate federal board caps the price a patented drug can be sold at.",
    detail: "Cancer drug reviews were run from Ontario for the other provinces (the Joint Oncology Drug Review) between 2007 and 2010, then by the pan-Canadian Oncology Drug Review from July 2011, which was later absorbed into CADTH, now Canada's Drug Agency (CDA-AMC); the 2022 review describes its pCODR Expert Review Committee as making the final funding recommendation for every cancer drug reviewed through that process, for every province except Quebec. A study of 88 cancer indications approved between 2003 and 2014 in nine provinces found that after pCODR began the median time from Health Canada's Notice of Compliance to provincial funding fell from 522 to 393 days, and that agreement between provinces on what to fund rose (a Brennan-Prediger coefficient of 0.54 before and 0.78 after). The 2022 review reports that CADTH's target is about 200 days from screening to final recommendation, that the pan-Canadian Pharmaceutical Alliance \"does not publish formal review or negotiation timelines, nor the criteria used in decision-making\", and that studies found the time from a pCODR recommendation to publication of the negotiation outcome for cancer drugs took as long as 371 days in 2016. The Patented Medicine Prices Review Board, created in 1987, sets ceiling prices for patented medicines; the price a province actually pays is the confidential negotiated one.",
    links: [GOTFRIT, { label: "Srikanthan A et al. Impact of the pan-Canadian Oncology Drug Review on provincial concordance and time to funding. Curr Oncol 2017", url: "https://doi.org/10.3747/co.24.3648" }, { label: "Meyers DE et al. Clinical benefit of cancer drugs submitted for reimbursement decisions in Canada. JAMA Intern Med 2021", url: "https://doi.org/10.1001/jamainternmed.2020.8588" }],
  },
  {
    id: "what-gets-through",
    title: "What the review agency says yes to: most cancer drugs, almost always with conditions",
    plain: "Canada's review agency recommends most cancer drugs, but nearly always on condition; the study of its solid-tumour decisions says the conditions are usually about cost-effectiveness. An independent analysis of solid-tumour decisions from 2011 to 2020 found three in four were positive, and only half of those drugs had shown that they help people live longer. Canada publishes no fixed cost-per-QALY threshold of the kind England's NICE uses.",
    detail: "Between July 2011 and February 2020 pCODR issued 104 final recommendations on cancer drugs for solid tumours: 78 (75.0 per cent) were positive, of which 72 (92.3 per cent) were conditional. Positive recommendations were more likely for phase 3 randomised evidence (92.3 against 53.8 per cent) and for substantial benefit on the ESMO Magnitude of Clinical Benefit Scale (61.5 against 19.2 per cent), but only 39 of the 78 positively recommended submissions had shown an overall survival benefit, with a median gain of 3.7 months. For the Project Orbis approvals of May 2019 to November 2023, CADTH conditionally recommended 44 of the 49 it reviewed (90 per cent), and its median time from regulatory approval to decision rose from 97 days (one drug, 2020) to 202 days in 2023. A 2025 comparison of reimbursement in Australia, Canada, England and China notes that for manufacturers submitting to CADTH or Australia's PBAC \"the cost-effectiveness threshold is uncertain\", unlike NICE's explicit one. OnCo could not read CDA-AMC's own methods guidance to state the willingness-to-pay value it uses in its reanalyses; see gaps.",
    links: [
      { label: "Meyers DE et al. JAMA Intern Med 2021", url: "https://doi.org/10.1001/jamainternmed.2020.8588" },
      { label: "Jenei K et al. Project Orbis approvals in the USA, Canada, England and Scotland. Lancet Oncol 2024", url: "https://doi.org/10.1016/S1470-2045(24)00286-9" },
      { label: "Chen J et al. Clinical benefit and incremental QALYs in reimbursement decisions in Australia, Canada, England and China. BMJ Open 2025", url: "https://doi.org/10.1136/bmjopen-2025-101678" },
    ],
  },
  {
    id: "pcpa",
    title: "One price for the whole country: the pan-Canadian Pharmaceutical Alliance",
    plain: "Since 2010 the provinces and territories, joined by Quebec and the federal drug plans by 2016, have negotiated drug prices together rather than one by one, through the pan-Canadian Pharmaceutical Alliance. The negotiated prices are confidential. A drug the alliance declines to negotiate, or fails to agree a price for, is generally not publicly funded even though it is licensed.",
    detail: "The Council of the Federation records that the alliance began in August 2010 as the pan-Canadian Pricing Alliance, created by the premiers through their Health Care Innovation Working Group; it was formalised under its present name in 2015 with an office hosted and staffed by the Government of Ontario, became a standalone corporation in late 2022 and completed the transition in 2023. Its members are the public drug plans of all ten provinces and three territories, plus Non-Insured Health Benefits, Correctional Service Canada and Veterans Affairs Canada. Its stated objectives are to increase access to clinically effective and cost-effective treatment, achieve consistent and lower drug costs, reduce duplication and improve consistency of decisions between jurisdictions. The 2022 review in Current Oncology adds that drugs \"rejected by the participating plans (i.e., pCPA or individual plans decline to participate in negotiations or negotiations do not result in agreement) are generally not eligible for public funding even though they have been approved by HC.\" The alliance's own site, which did not answer when this card was first written, answered on 17 November 2026; OnCo has not yet counted the cancer files in its negotiation database (see gaps).",
    links: [PCPA_COF, GOTFRIT],
  },
  {
    id: "time-limited",
    title: "A faster lane for conditionally licensed cancer drugs, used by one drug by the end of January 2025",
    plain: "Cancer drugs licensed early on promising results could take more than 500 days to reach patients through public funding. In September 2023 the review agency created a time-limited recommendation and the price alliance a temporary access process, so that review and negotiation run side by side. The first drug through it reached its first province more than 200 days sooner than a comparable drug on the ordinary route.",
    detail: "A 2025 brief report examined the nine cancer drugs granted a Notice of Compliance with conditions between 1 January 2023 and 31 December 2024. Three of them had received provincial listings (glofitamab, niraparib with abiraterone, and epcoritamab), with a median of 509 days from licence to first provincial listing (interquartile range 306 to 544). Epcoritamab was the only one to take the new time-limited recommendation and temporary access route; compared with glofitamab, which has a similar profile and took the ordinary route, it reached its first listing more than 200 days sooner. The authors found that the gain came from the alliance processing the file in parallel with the review rather than afterwards, not from either agency reviewing faster; CDA-AMC review times for all three fell within its target of 180 days or less. When the report was written a second drug had been announced as entering the route: a new indication for trastuzumab deruxtecan, whose conditional licence and the alliance's letter of intent were both dated 17 January 2025.",
    links: [{ label: "Lau CY et al. Accelerating oncology drug reimbursement in Canada: the CDA-AMC time-limited recommendation and pCPA temporary access process. Curr Oncol 2025", url: "https://doi.org/10.3390/curroncol32040235" }],
  },
  {
    id: "quebec",
    title: "Quebec runs its own review: INESSS, and its own list of exceptional cancer drugs",
    plain: "Quebec does not use Canada's Drug Agency. Its own institute, INESSS, reviews drugs for the Quebec public plan and advises the province's health minister, and in Quebec citizens as well as patient groups and clinicians can comment on a drug under review. Cancer drugs given in Quebec hospitals are paid from hospital budgets.",
    detail: "INESSS, the Institut national d'excellence en santé et en services sociaux, was created on 19 January 2011, succeeding the Conseil du médicament and the Agence d'évaluation des technologies et des modes d'intervention en santé. Its drug evaluation page describes its mandate as evaluating listing requests for drugs and drug-delivery devices \"dans le but de faire des recommandations au ministre de la Santé\" when the lists of covered drugs are updated, and it keeps a separate category of exceptional drugs in oncology (médicaments d'exception, oncologie) and publishes cancer treatment algorithms. The 2022 review in Current Oncology says the Quebec process is modified to consider \"societal factors\", that \"in Quebec, individual citizens can also submit their feedback to INESSS\", and that the province has \"a more generous and separately adjudicated individual patient review program, which may provide access to medicines that are rejected by INESSS.\" Quebec still joins the pan-Canadian Pharmaceutical Alliance for price negotiation.",
    links: [
      { label: "INESSS: mission, vision et valeurs (French)", url: "https://www.inesss.qc.ca/a-propos/mission-vision-valeurs.html" },
      { label: "INESSS: médicaments, évaluation aux fins d'inscription (French)", url: "https://www.inesss.qc.ca/thematiques/medicaments/medicaments-evaluation-aux-fins-dinscription.html" },
      GOTFRIT,
    ],
  },
];

export const CA_REGULATOR: CountryCard[] = [
  {
    id: "targets",
    title: "Health Canada's clocks: 300 days for a standard review, 180 for a priority one",
    plain: "Health Canada licenses medicines through a Notice of Compliance. It aims to decide a standard new drug within 300 days. A cancer drug for a serious condition with no adequate treatment can get priority review, with a 180-day review target, or a conditional licence on promising early evidence, with a 200-day target.",
    detail: "Health Canada's priority review guidance sets a performance target of 215 calendar days for screening and review of an original priority submission (10 days processing, 25 days screening, 180 days review) and 125 days for the response to a notice of non-compliance; priority status is for serious, life-threatening or severely debilitating conditions where no drug is marketed in Canada or the new drug brings a significant improvement in benefit and risk. Submissions filed for advance consideration under the Notice of Compliance with conditions policy have a review target of 200 calendar days plus 10 days processing and 25 days screening; the guidance explains that the longer target reflects the limited data on which such licences are often based. The 2022 review in Current Oncology gives Health Canada's general commitment for a standard decision as 300 days. OnCo did not measure how long Health Canada actually takes for cancer drugs against the FDA or the European Medicines Agency; see gaps. Health Canada's website did not answer OnCo's requests on 17 November 2026, so the day counts taken from its two guidance documents (215, 125 and 200 days and their parts) could not be re-read on that date; the 300-day and 180-day targets are also in the 2022 review.",
    links: [HC_PRIORITY, HC_NOCC, GOTFRIT],
  },
  {
    id: "noc-c",
    title: "Conditional licences since 1998, and none withdrawn for unmet conditions in the years studied",
    plain: "Canada has licensed promising drugs on early evidence, on condition that confirmatory trials follow, since 1998. A study of cancer drugs from 2010 to 2017 found that about a fifth of those reviewed for funding had a conditional licence, that a third of those had no updated data, and that Health Canada never revoked a conditional licence for failure to meet its conditions.",
    detail: "Health Canada issued its first Notice of Compliance with conditions policy in May 1998 and revised it in November 2002; sponsors must sign a letter of undertaking to carry out confirmatory trials, and the guidance describes enhanced post-market surveillance of conditionally authorised products. An analysis of Health Canada and pCODR records for 2010 to 2017 found that 22 of 105 unique drug and indication pairs reviewed by pCODR (21 per cent) had conditional authorisation, all on preliminary surrogate-endpoint data; 36 per cent had no updated data, 36 per cent had data meeting Health Canada's conditions and 27 per cent met some but not all. None received an unconditional positive funding recommendation; 11 (50 per cent) were conditionally recommended and 6 (27 per cent) not recommended for insufficient evidence. In the period studied Health Canada never revoked a conditional authorisation for failure to meet its conditions. Health Canada's website did not answer OnCo's requests on 17 November 2026, so the policy dates of May 1998 and November 2002 and the description of the guidance could not be re-read on that date; the study's figures were re-read.",
    links: [HC_NOCC, { label: "Andersen SK et al. Conditional approval of cancer drugs in Canada: accountability and impact on public funding. Curr Oncol 2019", url: "https://doi.org/10.3747/co.26.4397" }],
  },
  {
    id: "orbis",
    title: "Project Orbis: reviewing cancer drugs alongside the FDA since 2019",
    plain: "Health Canada has reviewed cancer drugs together with the United States FDA and other regulators under Project Orbis since it began in May 2019. Its first Orbis approval, a treatment for advanced endometrial cancer, came in September 2019. Faster licensing has not meant faster funding: the review agency's decisions on Orbis drugs slowed between 2020 and 2023.",
    detail: "Health Canada's page says it has been a partner \"since its inception in May 2019\", worked with the FDA and Australia's TGA on the first Orbis submission, and that this \"led to Health Canada's timely approval of a treatment for women with advanced endometrial cancer in September 2019\". Eligible products are new active substances or new indications in oncology that meet the FDA's priority review criteria and qualify for Health Canada's priority review or advance consideration for a conditional licence. Three collaboration types exist: Type A when the sponsor files with a partner within 30 days of the FDA, Type B when later, and Type C when the FDA has already approved and shares its completed review. Health Canada states that its service standards do not change for Orbis submissions, though it may decide faster, and that each partner decides independently. A 2024 analysis in Lancet Oncology found 81 of 244 FDA cancer approvals between May 2019 and November 2023 went through Orbis; of the 49 reviewed by CADTH, 44 were conditionally recommended, and CADTH's median time from approval to decision rose to 202 days in 2023. Health Canada's website did not answer OnCo's requests on 17 November 2026, so the quotations from its Project Orbis page, the September 2019 approval and the three collaboration types could not be re-read on that date; the May 2019 start and the Lancet Oncology figures were re-read.",
    links: [HC_ORBIS, { label: "Jenei K et al. Lancet Oncol 2024", url: "https://doi.org/10.1016/S1470-2045(24)00286-9" }],
  },
];

export const CA_DOING: CountryCard[] = [
  {
    id: "cctg",
    title: "One national academic trials group, running trials since 1980 from Queen's University",
    plain: "The Canadian Cancer Trials Group, at Queen's University in Kingston, runs academic cancer trials across the country and with partners abroad. Since 1980 it has enrolled more than 113,000 patients. In 2025 it had 166 trials in its portfolio, 56 open to patients, and 86 Canadian centres in its network. Its CHALLENGE trial showed that a structured exercise programme after treatment for stage III colon cancer improves survival.",
    detail: "The group's 2025 annual report records 113,290 patients accrued since 1980, of whom 82,627 were in Canada, 20,260 in the United States and 10,403 elsewhere; an accrual panel giving 3,304 patients accrued globally in 2025, 3,053 of them in Canada, while the report's highlights text says \"in total, 1,359 patients were accrued\" (the report does not reconcile the two); 166 trials in the portfolio (72 led by CCTG, 60 led by the United States National Clinical Trials Network, 11 network trials led by CCTG and 22 led by other international groups), 56 open to accrual and seven newly activated; 78 abstracts and 50 publications; and a network of 86 Canadian centres working with 680 international centres in 20 countries. The report calls CO.21 CHALLENGE a world-first trial that \"showed that a structured exercise program significantly improves survival for patients with stage III colon cancer by reducing recurrence and new primary cancers\", over 17 years, and describes ME.17 as \"one of the largest randomized trials investigating fecal microbiota transplantation with immune checkpoint blockade for advanced melanoma\". Earlier trials of the group under its former name, the NCIC Clinical Trials Group, including JBR.10, CO.17 and MA.20, are in the trial list below.",
    links: [CCTG_AR, { label: "Canadian Cancer Trials Group", url: "https://www.ctg.queensu.ca/" }, { label: "OnCo: Canadian Cancer Trials Group", url: "/companies/cctg/" }],
  },
  {
    id: "terry-fox",
    title: "Terry Fox's run, and the precision medicine network it now pays for",
    plain: "In 1980 Terry Fox, who had lost a leg to bone cancer, ran 5,373 kilometres across Canada in 143 days to raise money for cancer research, until cancer in his lungs stopped him near Thunder Bay. He died in 1981. The foundation and research institute named after him now lead a national precision oncology network that the federal government agreed to fund with up to $150 million, matched dollar for dollar.",
    detail: "The Marathon of Hope Cancer Centres Network's own history says Terry Fox was diagnosed with osteogenic sarcoma at 18 and had his right leg amputated 15 centimetres above the knee in 1977; he started his run in St. John's, Newfoundland, on 12 April 1980, ran close to 42 kilometres a day, and stopped on 1 September after 143 days and 5,373 kilometres; he died on 28 June 1981 at 22. The federal budget tabled on 18 March 2019 committed up to $150 million to the Terry Fox Research Institute to establish the network; the contribution agreement with Health Canada requires member institutes, cancer centres and philanthropic partners to match it dollar for dollar, for $300 million in new funds. Its central project is the MOHCCN Gold Cohort, paired clinical and genomic data from 15,000 Canadian cancer patients, generated through five regional consortia and more than 30 partner institutions under standards set by eleven working groups.",
    links: [
      { label: "Marathon of Hope Cancer Centres Network: mission and vision", url: "https://www.marathonofhopecancercentres.ca/about-us/who-we-are" },
      { label: "Marathon of Hope Cancer Centres Network: funding model", url: "https://www.marathonofhopecancercentres.ca/about-us/funding-model" },
      { label: "MOHCCN Gold Cohort", url: "https://www.marathonofhopecancercentres.ca/our-research/mohccn-gold-cohort" },
    ],
  },
  {
    id: "strategy",
    title: "A national cancer strategy run by a federally funded partnership, not by a national health service",
    plain: "Health care in Canada is run by the provinces, so the national cancer strategy is coordinated by an organisation funded by the federal government, the Canadian Partnership Against Cancer, working since 2007. Its current priorities include organised lung cancer screening and eliminating cervical cancer through HPV vaccination and HPV testing.",
    detail: "The Partnership describes itself as \"funded by the federal government\" to accelerate pan-Canadian action under the Canadian Strategy for Cancer Control, which its strategy page calls \"an ambitious 10-year action plan\", and as having served as a catalyst for cancer care since 2007. Its lung screening page states that Ontario has a lung screening programme at four sites, British Columbia a province-wide programme at 36 sites, and Quebec a pilot project, with other provinces working to set programmes up; the page is undated and OnCo has not checked each province's current status. It also states that First Nations adults are 35 per cent less likely than non-Indigenous adults to survive lung cancer five years after diagnosis. Its cervical cancer page gives about 1,300 diagnoses and over 400 deaths a year and describes moves to raise HPV vaccination, switch screening from the Pap test to HPV primary testing with self-sampling, and improve follow-up of positive tests.",
    links: [
      { label: "Canadian Partnership Against Cancer: what we do", url: "https://www.partnershipagainstcancer.ca/about-us/what-we-do/" },
      { label: "Canadian Partnership Against Cancer: cancer strategy", url: "https://www.partnershipagainstcancer.ca/cancer-strategy/" },
      { label: "Canadian Partnership Against Cancer: implementing lung cancer screening", url: "https://www.partnershipagainstcancer.ca/cancer-strategy/implementing-lung-cancer-screening/" },
      { label: "Canadian Partnership Against Cancer: eliminating cervical cancer", url: "https://www.partnershipagainstcancer.ca/cancer-strategy/eliminate-cervical-cancer/" },
    ],
  },
  {
    id: "agencies",
    title: "Provincial cancer agencies as the unit of care",
    plain: "Several provinces run cancer care through a single provincial cancer agency; in British Columbia, Saskatchewan and Manitoba the agency's own website lists screening programmes and the provincial cancer registry among its services, and in the three westernmost provinces it also pays for every cancer drug. Ontario and Manitoba also have provincial cancer agencies, with a narrower role in paying for drugs.",
    detail: "The websites of BC Cancer, the Saskatchewan Cancer Agency and CancerCare Manitoba each list provincial screening programmes and a provincial cancer registry, and CancerCare Manitoba calls itself \"the provincial cancer authority responsible for setting strategic priorities and long-term planning for cancer and blood disorders for the province\"; OnCo did not check the same for Cancer Care Alberta. The 2022 review in Current Oncology records that the three westernmost fund and administer all cancer drugs, oral and intravenous, while Manitoba and Ontario have agencies whose funding role varies with the type of drug. Each provincial and territorial registry is the source of record for the national figures, which is why a delay in one province's submission, as with Quebec and Nova Scotia, removes it from the national incidence tables. The agencies are in OnCo's institution list below.",
    links: [GOTFRIT, CCR, { label: "BC Cancer", url: "https://www.bccancer.bc.ca/about" }, { label: "Saskatchewan Cancer Agency", url: "https://www.saskcancer.ca/" }, { label: "CancerCare Manitoba: who we are", url: "https://www.cancercare.mb.ca/About-Us/" }, { label: "OnCo: BC Cancer", url: "/institutions/bc-cancer/" }, { label: "OnCo: Ontario Health (Cancer Care Ontario)", url: "/institutions/ontario-health-cancer-care-ontario/" }],
  },
];

export const CA_GAPS: CountryCard[] = [
  {
    id: "cda-unreadable",
    title: "Canada's Drug Agency could not be read directly",
    plain: "Every request OnCo's scripts made to Canada's Drug Agency (cda-amc.ca) was answered with a browser challenge, and the copies of its reports on the United States National Library of Medicine's bookshelf answered the same way. Its processes are therefore described here through peer-reviewed studies of its decisions, not through its own documents.",
    detail: "Missing as a result: the agency's own statement of the cost-effectiveness threshold or willingness-to-pay value it uses when it reanalyses a manufacturer's model, the price reductions it has asked for on recent cancer drugs, its current review timelines and the date and terms of its change of name from CADTH. The Internet Archive was offline when OnCo tried it. Each figure in the payment cards is attributed to the published study it came from; none is the agency's own.",
    links: [{ label: "Canada's Drug Agency (CDA-AMC)", url: "https://www.cda-amc.ca/" }],
  },
  {
    id: "pcpa-unreadable",
    title: "The pan-Canadian Pharmaceutical Alliance's negotiation database has not been counted",
    plain: "When this page was first written the alliance's website did not open. It answered on 17 November 2026 and describes a searchable database of every current and concluded negotiation, with downloads. OnCo has not yet counted from it how many cancer drugs the alliance has negotiated, declined or closed without agreement, or how long that takes.",
    detail: "The Council of the Federation's archive page, which points readers to the alliance's own site, was used for its history and membership. Read on 17 November 2026, the alliance's site says its negotiations database is \"a searchable repository of all current and concluded files\", gives each file one of six statuses, among them negotiations that ended with a letter of intent, negotiations that \"ended without a pricing agreement\" and files where it was decided \"not to engage in a negotiation\", and offers exports in CSV or JSON. It also has a page on its temporary access process and a performance dashboard with negotiation timelines. None of these has been tallied for cancer drugs here, so the figures on this page about the alliance still come from the published studies named in the cards.",
    links: [PCPA_COF, { label: "pan-Canadian Pharmaceutical Alliance: browse negotiations", url: "https://www.pcpacanada.ca/browse-negotiations" }],
  },
  {
    id: "quebec-data",
    title: "Quebec's own cancer registry figures were not read",
    plain: "Quebec, about a fifth of Canada's population, is projected from 2017 data in the national incidence figures and left out of national survival. Its own registry may hold later counts. OnCo did not find or read them, so this page has no Quebec incidence figure newer than the national projection.",
    detail: "The Registre québécois du cancer is run by the province; the national reports say Quebec's cases from 2018 onward had not reached the Canadian Cancer Registry at the time of analysis, and Statistics Canada says cross-provincial de-duplication for Quebec is ongoing. Nova Scotia has a similar gap from 2020. These are the two places to look first for a fuller national picture.",
    links: [CCR, CCS_2025],
  },
  {
    id: "unmeasured",
    title: "What this page does not yet measure",
    plain: "Several things a reader would want are not on this page: how long Health Canada actually takes for cancer drugs compared with the FDA and Europe, each province's current rules for paying for cancer tablets taken at home, stage at diagnosis nationally, cancer statistics for First Nations, Inuit and Métis people, and a count of cancer trials open in Canada by year.",
    detail: "Sources exist for most of these and were not read in this pass: Health Canada's annual drug submission performance reports; provincial formularies and the Canadian Cancer Society's advocacy material on take-home cancer drugs (the address OnCo tried returned not found); Statistics Canada's Health Reports on five-year survival by stage (Ellison and Saint-Jacques, 2023, cited in the 2025 report but not read); and the Canadian Partnership Against Cancer's First Nations, Inuit and Métis indicators. A ClinicalTrials.gov count of interventional cancer studies with a Canadian site, of the kind on the Russia page, was not run.",
    links: [CCS_2025, { label: "Canadian Partnership Against Cancer", url: "https://www.partnershipagainstcancer.ca/" }],
  },
];

export const CA_INSTITUTIONS = [
  "princess-margaret", "oicr", "bc-cancer", "ontario-health-cancer-care-ontario", "sunnybrook-odette", "sickkids", "mcgill-goodman", "muhc-cedars-cancer-centre", "chum",
  "ciusss-emtl-maisonneuve-rosemont", "chu-de-quebec", "juravinski", "ottawa-hospital", "lhsc-verspeeten", "cancer-care-alberta", "university-of-alberta",
  "saskatchewan-cancer-agency", "cancercare-manitoba", "nova-scotia-cancer-care", "queens-university-kingston", "terry-fox-research-institute", "terry-fox-foundation",
  "canadian-cancer-society", "canadian-partnership-against-cancer", "health-canada", "cda-amc", "inesss", "canadian-cancer-registry",
];
export const CA_COMPANIES = [
  "cctg", "ocog", "zymeworks", "repare-therapeutics", "essa-pharma", "fusion-pharma", "alethia-biotherapeutics", "zenith-epigenetics", "immunovaccine", "virogin-biotech",
  "verity-pharma", "bausch-health", "nordion", "profound-medical", "perimeter-medical-imaging-ai", "adela", "limbus-ai", "excellthera", "abdera-therapeutics", "alpha-9-oncology",
];
export const CA_TRIALS = [
  "challenge", "jbr-10", "co-17", "ma-20", "cctg-ce6", "keynote-483", "shape", "sabr-comet", "profit-trial", "rapid", "lumina", "tax-327", "mimic-01", "herizon-btc-01",
  "nct06205485", "radar-hodgkin",
];
export const CA_PAPERS = [
  "paper-brenner-projected-cancer-canada-2026-cmaj", "paper-meyers-pcodr-clinical-benefit-jama-intern-med-2021", "paper-srikanthan-pcodr-time-to-funding-curr-oncol-2017",
  "paper-andersen-conditional-approval-cancer-drugs-canada-curr-oncol-2019", "paper-gotfrit-cancer-drug-access-pathway-canada-curr-oncol-2022",
  "paper-lau-time-limited-recommendation-ptap-curr-oncol-2025", "paper-jenei-project-orbis-access-lancet-oncol-2024",
  "paper-challenge-exercise-nejm-2025", "paper-ma-20-n-engl-j-med-2015", "paper-perry-n-engl-j-med", "paper-sabr-comet-lancet-2019", "paper-keynote-483-lancet-2023",
  "paper-lumina-n-engl-j-med-2023", "paper-tannock-tax-327-docetaxel-prednisone-nejm-2004", "paper-singh-brain-tumour-initiating-cells-nature-2004",
  "paper-notta-punctuated-evolution-pancreatic-nature-2016", "paper-harding-lancet-oncol",
];
export const CA_PEOPLE = [
  "terry-fox", "tak-mak", "john-dick", "pamela-ohashi", "lillian-siu", "ian-tannock", "dancey-janet", "parulekar-wendy", "timothy-whelan", "david-palma",
  "christopher-booth", "kerry-courneya", "natasha-leighl", "laurie-sehn", "joseph-connors", "kim-chi", "fred-saad", "amit-oza", "trevor-pugh", "stephen-scherer", "jim-woodgett",
  "john-bell", "aaron-schimmer", "keith-stewart", "marie-plante", "jonathan-spicer", "sumit-gupta",
];
