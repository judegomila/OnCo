/**
 * South Korea deep dive: the hand-written cards and tables for /countries/kr/. Plain English first, detail second,
 * every card with its sources. Entity lists are pulled from the graph on the page by id so they stay in step with
 * the corpus. Figures are quoted only where the linked source states them.
 *
 * This page was written from Korean primary sources rather than from the corpus: the National Cancer Center's
 * national cancer information site (국가암정보센터, cancer.go.kr), which publishes the Korea Central Cancer Registry's
 * statistics and the screening programme's rules; the registry's own annual paper in Cancer Research and Treatment;
 * the National Health Insurance Service's page on the special co-payment scheme (산정특례); HIRA's own description of
 * the drug route; and the Ministry of Food and Drug Safety's press releases and their attached PDFs, read with
 * pdftotext. Where a figure comes only from the Korean trade press it is labelled as such.
 *
 * Counting conventions worth holding in mind while reading the numbers below:
 *  - incidence   Korea Central Cancer Registry, diagnoses in 2023, published on cancer.go.kr and in Cancer Res Treat
 *                2026. The headline rate cancer.go.kr leads with (522.9 per 100,000) is standardised to Korea's own
 *                2020 mid-year population; the registry's paper and the international comparison use the world
 *                (Segi) standard (288.6). The two are not interchangeable.
 *  - deaths      Ministry of Data and Statistics (국가데이터처, formerly Statistics Korea) cause-of-death statistics, as
 *                compiled on cancer.go.kr: deaths in 2025. The registry paper gives 85,271 deaths for 2023.
 *  - survival    five-year relative survival for cases diagnosed 2019 to 2023, followed to 31 December 2024.
 *  - thyroid     Korea counts and ranks thyroid cancer, which is the commonest cancer in the country; the registry
 *                publishes "all cancers excluding thyroid" alongside every total for that reason.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const KR_ASOF = "2026-11-03";

/** Shorthand for the sources used more than once. */
const INCIDENCE = { label: "국가암정보센터: 암 발생률 (national cancer incidence, 2023)", url: "https://www.cancer.go.kr/lay1/S1T639C640/contents.do" };
const BY_SITE = { label: "국가암정보센터: 암종별 발생 현황 (incidence by site, 2023)", url: "https://www.cancer.go.kr/lay1/S1T639C641/contents.do" };
const INTL = { label: "국가암정보센터: 암발생 국제비교 (international comparison)", url: "https://www.cancer.go.kr/lay1/S1T639C644/contents.do" };
const SURVIVAL = { label: "국가암정보센터: 5년 상대생존율 (five-year relative survival)", url: "https://www.cancer.go.kr/lay1/S1T648C650/contents.do" };
const STAGE = { label: "국가암정보센터: 요약병기별 생존율 (survival by summary stage)", url: "https://www.cancer.go.kr/lay1/S1T648C652/contents.do" };
const DEATHS = { label: "국가암정보센터: 주요암 사망분율 (cancer deaths, 2025)", url: "https://www.cancer.go.kr/lay1/S1T645C646/contents.do" };
const PREVALENCE = { label: "국가암정보센터: 암 유병률 (prevalence, 2023)", url: "https://www.cancer.go.kr/lay1/S1T654C655/contents.do" };
const IN_SITU = { label: "국가암정보센터: 상피내암 발생률 (carcinoma in situ, 2023)", url: "https://www.cancer.go.kr/lay1/S1T639C808/contents.do" };
const SCREENING = { label: "국가암정보센터: 국가 암 검진사업 (National Cancer Screening Program rules)", url: "https://www.cancer.go.kr/lay1/S1T261C262/contents.do" };
const KCCR_2023 = { label: "Park et al. Cancer statistics in Korea in 2023 (Cancer Res Treat 2026)", url: "/papers/paper-kccr-cancer-statistics-korea-2023-crt-2026/" };
const KCCR_FULL = { label: "Full text of the registry's 2023 report (e-crt.org)", url: "https://www.e-crt.org/journal/view.php?doi=10.4143/crt.2026.298" };
const SANJEONG = { label: "NHIS: 본인일부부담금 산정특례 제도 (special co-payment scheme)", url: "https://www.nhis.or.kr/nhis/minwon/wbhapa01000m01.do?mode=view&articleNo=10946880" };
const NHIS_EN = { label: "NHIS: national health insurance (English)", url: "https://www.nhis.or.kr/english/wbheaa02300m01.do" };
const HIRA_ROLE = { label: "HIRA: role and function (English)", url: "https://www.hira.or.kr/dummy.do?pgmid=HIRAJ010000009001" };
const ICER_2024 = { label: "Daily Pharm, 31 December 2024: HIRA's published ICER ranges, 2019 to 2023 (Korean)", url: "https://www.dailypharm.com/user/news/9684" };
const ICER_2026 = { label: "Daily Pharm, 8 January 2026: the ranges for 2020 to 2024 (Korean)", url: "https://m.dailypharm.com/user/news/334595" };
const TRIALS_2025 = { label: "MFDS press release, 6 March 2026: 2025 clinical trial approvals (Korean, PDF attached)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=49738" };
const TRIALS_2024 = { label: "MFDS press release, 28 March 2025: 2024 clinical trial approvals (Korean, PDF attached)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=48944" };
const LECLAZA = { label: "MFDS press note, 30 June 2023: lazertinib (Leclaza) first-line approval (Korean)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=47414" };

export const KR_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "About 289,000 new cancers a year, thyroid cancer the commonest, and an ageing population behind the rise",
    plain: "Korea's registry counted 288,613 new cancers in 2023, 2.5 per cent more than the year before. The commonest were thyroid, lung, bowel, breast and stomach cancer. Half of new cases were in people aged 65 or over, and in 2023 prostate cancer became the commonest cancer in men for the first time.",
    detail: "The Korea Central Cancer Registry counted 288,613 new malignant cancers in 2023 (151,126 in men, 137,487 in women), up 7,296 or 2.5 per cent on 2022, at a crude rate of 564.3 per 100,000. Standardised to Korea's own 2020 population the rate was 522.9 (587.0 in men and 488.9 in women; one table on the same page prints the men's figure as 587.9), which the National Cancer Center describes as recently flat and links to population ageing. Excluding thyroid cancer the count was 253,173. The leading sites were thyroid 35,440 (12.3 per cent), lung 32,953 (11.4), colon and rectum 32,610 (11.3), breast 29,871 (10.3), stomach 28,943 (10.0), prostate 22,640 (7.8) and liver 14,707 (5.1). In men the order was prostate, lung, stomach, colorectal, liver and thyroid; in women breast, thyroid, colorectal, lung, stomach and pancreas. 145,452 cases (50.4 per cent) were in people aged 65 or over. The registry estimates that a Korean who lives to average life expectancy (80.8 years for men and 86.6 for women, 2024) has a 44.6 per cent chance of cancer if male and 38.2 per cent if female. A further 38,204 carcinomas in situ were registered, led by the cervix (11,202), colon and rectum (8,540) and breast (7,032).",
    links: [INCIDENCE, BY_SITE, IN_SITU, KCCR_2023],
  },
  {
    id: "thyroid",
    title: "Thyroid cancer: a screening surge, a reversal, and a slower rise again",
    plain: "From 1999 to 2011 Korean thyroid cancer diagnoses rose by more than a fifth every year, a rise studies tie to screening, while deaths from it did not rise. After 2011 to 2012 the rate fell steeply as doctors and the public questioned the screening. It has crept up again since 2016, and thyroid cancer is still the commonest cancer in Korea.",
    detail: "On the world standard, thyroid cancer incidence went from 6.5 per 100,000 in 1999 to 50.7 in 2023. The registry's joinpoint analysis finds three phases: a rise of 22.4 per cent a year from 1999 to 2011, a fall of 12.1 per cent a year from 2011 to 2016, and a rise of 5.3 per cent a year from 2016 to 2023, while thyroid cancer mortality fell by 4.2 per cent a year from 2003. A national study using health-insurance and cause-of-death data found incidence of 46.6 per 100,000 in 2006, 115.0 in 2012 and 63.5 in 2015 with mortality unchanged, and found screening, diagnosis and post-operative complications all highest among the best-off, which its authors read as evidence of overdiagnosis. Thyroid cancer is not part of the national screening programme. It remains the commonest cancer in people aged 15 to 34, 54.1 per cent of all their cancers, and the largest group among the 2.73 million Koreans living after a cancer diagnosis (587,292 of them), and its five-year relative survival is 100.2 per cent, which is to say no different from people of the same age without it.",
    links: [KCCR_FULL, { label: "Kang et al. Income differences in thyroid cancer screening, incidence and mortality (BMC Cancer 2020)", url: "/papers/paper-kang-thyroid-cancer-overdiagnosis-income-korea-bmc-cancer-2020/" }, { label: "Ahn, Kim and Welch. Korea's thyroid-cancer epidemic: screening and overdiagnosis (NEJM 2014)", url: "/papers/paper-ahn-n-engl-j-med/" }, SURVIVAL],
  },
  {
    id: "stomach-liver",
    title: "Stomach and liver cancer: once the defining Korean cancers, now falling fastest",
    plain: "Stomach cancer is still among the five commonest cancers in Korean men, which it is not in the United States or Britain, but its death rate has fallen more than fourfold since 1999. Liver cancer's incidence rate has more than halved. Five-year survival from stomach cancer is now 78.6 per cent and from liver cancer 40.4 per cent, up from 58.0 and 20.6 per cent in 2001 to 2005.",
    detail: "On the world standard, stomach cancer incidence fell from 43.6 per 100,000 in 1999 to 25.5 in 2023 (falling 4.3 per cent a year since 2011) and stomach cancer mortality from 23.9 to 5.4 (falling 6.9 per cent a year since 2003). Liver cancer incidence fell from 27.9 to 12.8 and mortality from 20.6 to 7.9 (falling 5.7 per cent a year since 2014). Among men stomach cancer remains the fourth commonest world-standard rate in Korea at 35.8 per 100,000 in 2023, against 40.9 estimated for Japan in cancer.go.kr's international comparison, which uses IARC's 2022 estimates for other countries; those estimates do not place it in the top five for men in the United States or the United Kingdom. Two thirds of stomach cancers (65.3 per cent) are now found while still localised, when five-year survival is 97.6 per cent; found after it has spread, survival is 7.5 per cent. The registry reports the lowest mortality-to-incidence ratio among major high-income countries for stomach cancer (0.21), and for colorectal (0.22) and breast cancer (0.08).",
    links: [KCCR_FULL, STAGE, INTL],
  },
  {
    id: "survival",
    title: "Five-year survival of 73.7 per cent, and what sits behind the headline",
    plain: "Of people diagnosed with cancer in Korea between 2019 and 2023, 73.7 per cent were alive five years later relative to people of the same age, up from 42.9 per cent in the early 1990s. Thyroid cancer, which almost never kills, lifts the figure a little: without it survival is 69.6 per cent. Lung cancer survival has more than doubled in twenty years, to 42.5 per cent. Pancreatic cancer survival is 17.0 per cent.",
    detail: "Five-year relative survival for all cancers was 42.9 per cent for cases diagnosed in 1993 to 1995, 54.2 per cent in 2001 to 2005 and 73.7 per cent in 2019 to 2023 (68.2 in men, 79.4 in women); excluding thyroid cancer it rose from 41.2 to 69.6 per cent over the same span. The largest gains since 2001 to 2005 were lung (16.6 to 42.5 per cent), stomach (58.0 to 78.6) and liver (20.6 to 40.4). Survival was highest for thyroid (100.2), prostate (96.9) and breast (94.7) and lowest for lung (42.5), liver (40.4), gallbladder and biliary tract (29.0) and pancreas (17.0). Women with lung cancer now have 56.7 per cent five-year survival against 35.4 per cent for men. By summary stage, 46.1 per cent of cancers diagnosed in 2019 to 2023 were localised, with 92.7 per cent survival; 17.8 per cent had distant spread, with 27.8 per cent survival. 43.3 per cent of pancreatic and 40.7 per cent of lung cancers were found with distant spread. The registry's paper notes that its international comparison sets Korea's observed figures against modelled estimates for other countries, and that lead time from earlier detection may contribute to the gains and should be considered.",
    links: [SURVIVAL, STAGE, KCCR_FULL],
  },
  {
    id: "deaths",
    title: "Cancer is a quarter of all deaths; lung and liver cancer cause a third of them",
    plain: "Cancer caused 90,203 deaths in Korea in 2025, a quarter of all deaths. Lung cancer caused the most, 19,805, followed by liver, bowel, pancreas and stomach cancer. Korea's age-standardised cancer death rate is lower than Japan's or the United States'.",
    detail: "Compiled from the national cause-of-death statistics, cancer (C00 to C97) caused 90,203 of 362,968 deaths in 2025, 24.9 per cent. The leading causes were lung 19,805 (22.0 per cent of cancer deaths), liver 10,383 (11.5), colon and rectum 9,752 (10.8), pancreas 8,677 (9.6), stomach 6,995 (7.8), gallbladder and biliary tract 5,723 (6.3), breast 3,031 (3.4), prostate 2,884 (3.2), non-Hodgkin lymphoma 2,391 (2.7) and leukaemia 2,153 (2.4). Cancer has been the leading cause of death in Korea since 1983. The registry's 2023 report gives 85,271 cancer deaths that year at a world-standard rate of 64.3 per 100,000, down from 115.1 in 1999, and cancer.go.kr sets that 64.3 against 78.6 for Japan and 82.3 for the United States. The same cancer.go.kr deaths page also carries a footnote under its 2025 heading giving 79,153 deaths and a crude rate of 154.3, which does not match its own table; the 2025 figures above are the ones in the table and in the page's opening sentence.",
    links: [DEATHS, INTL, KCCR_FULL],
  },
  {
    id: "survivors",
    title: "2.73 million people living after a cancer diagnosis, one in seven of those aged 65 or over",
    plain: "At the start of 2024, 2,732,906 people in Korea had been diagnosed with cancer since 1999 and were alive: one person in nineteen. Six in ten had lived more than five years since diagnosis.",
    detail: "The registry counts as prevalent anyone diagnosed between 1 January 1999 and 31 December 2023 and alive on 1 January 2024: 2,732,906 people (1,193,944 men and 1,538,962 women), 144,827 more than a year earlier and 5.3 per cent of the population. 1,408,234 of them (51.5 per cent) were 65 or over, 14.9 per cent of everyone in that age group. 1,697,799 (62.1 per cent) were more than five years from diagnosis, 552,373 (20.2 per cent) two to five years and 482,734 (17.7 per cent) two years or less. Excluding thyroid cancer the figure was 2,145,614. Cancer survivorship support centres (암생존자통합지지센터) run at the National Cancer Center and at regional university hospitals, with separate services for adult survivors and for children and adolescents.",
    links: [PREVALENCE, KCCR_FULL, { label: "국가암정보센터: 암생존자 통합지지 (survivorship support centres)", url: "https://www.cancer.go.kr/lay1/S1T786C784/contents.do" }],
  },
];

export const KR_REGISTRY: CountryCard[] = [
  {
    id: "what-it-is",
    title: "The Korea Central Cancer Registry: a national database since 1999, 97.4 per cent complete",
    plain: "Korea has published nationwide cancer statistics since 1999, from a database estimated to be 97.4 per cent complete for 2023. Hospitals register patients each year; eleven regional registries find the ones hospitals missed; the National Cancer Center publishes the result about two years later, in Korean on cancer.go.kr and in English in an annual paper.",
    detail: "The Ministry of Health and Welfare designates and runs a central registry (중앙암등록본부) at the National Cancer Center and regional registries, and their data are combined into the Korea National Cancer Incidence Database. Each year the central registry collects the previous year's patients from hospitals across the country; the regional registries add patients missed by hospital registration, so a year's statistics take two years to complete. Cases are coded in ICD-O-3 and converted to ICD-10; since 2021 colorectal neuroendocrine tumours and gastric stromal tumours have been counted as malignant. Vital status is checked by linkage to mortality and resident registration data from the Ministry of the Interior and Safety. The 2023 database was estimated to be 97.4 per cent complete by the Ajiki method. Deaths come separately from the Ministry of Data and Statistics, the renamed Statistics Korea.",
    links: [INCIDENCE, KCCR_FULL, KCCR_2023],
  },
  {
    id: "reading-it",
    title: "Reading Korean figures against other countries': two standard populations and one big cancer",
    plain: "The rate Korea's cancer site leads with, 522.9 per 100,000, is adjusted to Korea's own population and cannot be compared with other countries. The comparable figure is 288.6. Thyroid cancer is so common in Korea that the registry reports every total with and without it.",
    detail: "cancer.go.kr standardises its headline rates to Korea's 2020 mid-year resident population (522.9 per 100,000 for 2023), which is older than the Segi world standard used by IARC; on the world standard the 2023 rate is 288.6, the figure the registry itself uses for international comparison. cancer.go.kr also still carries a 2018-based comparison table on the same page (Korea 270.4 against an OECD average of 301.1), so check the year of any figure taken from it. Thyroid cancer was 12.3 per cent of all 2023 cases; on the world standard it is the commonest cancer in Korean women at 76.1 per 100,000, above breast at 69.7. GLOBOCAN 2024's modelled estimate for Korea, the source of the table further down this page, is 250,247 new cancers and 101,333 deaths for 2024, the cases including 4,037 non-melanoma skin cancers, while the registry counted 288,613 new cancers in 2023, 38,366 more a year earlier; the registry's paper notes that its international comparison sets observed Korean data against modelled estimates. OnCo has not established why the two differ by that much.",
    links: [INCIDENCE, INTL, KCCR_FULL, { label: "IARC Global Cancer Observatory: Republic of Korea fact sheet (GLOBOCAN 2024)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/410-korea-republic-of-fact-sheet.pdf" }],
  },
];

export const KR_PAYING: CountryCard[] = [
  {
    id: "single-insurer",
    title: "One public insurer for everyone, and a separate body that judges value",
    plain: "Everyone in Korea is covered by a single public health insurer, the National Health Insurance Service, except people on low incomes, who are covered by Medical Aid. A separate public body, HIRA, decides whether a new drug is good value. The insurer then negotiates its price with the company.",
    detail: "NHIS describes itself as a non-profit single insurer providing health insurance to all citizens living in Korea, under the Ministry of Health and Welfare, which sets policy. Membership is compulsory, contributions are set by household income and property, and providers may not refuse to treat insured patients. NHIS manages eligibility, collects contributions, contracts fees with providers and pays benefits; the Health Insurance Review and Assessment Service (HIRA) evaluates fees, quality and appropriateness. For a drug, the company applies for coverage once MFDS has approved it, HIRA's Pharmaceutical Benefit Assessment Committee assesses clinical efficacy and cost-effectiveness, and the price of a newly listed drug is negotiated between the company and NHIS. Cancer drugs are first considered by HIRA's cancer disease deliberation committee (암질환심의위원회), which decides the criteria under which a drug is paid for; in March 2025, for example, it voted to widen the reimbursement criteria for trastuzumab deruxtecan in gastric cancer to patients previously treated with any platinum drug rather than only cisplatin, a decision that then goes to the Pharmaceutical Benefit Assessment Committee.",
    links: [NHIS_EN, HIRA_ROLE, { label: "Daily Pharm, 20 March 2025: the cancer committee and trastuzumab deruxtecan (Korean)", url: "https://dailypharm.com/user/news/7495" }],
  },
  {
    id: "five-per-cent",
    title: "A registered cancer patient pays 5 per cent for five years",
    plain: "Once a cancer is confirmed and registered with the insurer, the patient pays 5 per cent of the cost of covered care, in hospital or out, including scans and medicines, for five years. Normally a Korean pays 30 to 60 per cent of outpatient costs and 20 per cent of a hospital stay. Care the insurance does not cover is still paid in full.",
    detail: "Under the special co-payment scheme (본인일부부담금 산정특례), set by the National Health Insurance Act article 44, its enforcement decree article 19 and schedule 2, and a Ministry of Health and Welfare notice, cancer carries a 5 per cent co-payment for five years, against 10 per cent for rare and severe intractable diseases and severe dementia and none for tuberculosis. The doctor issues a registration form after the tests the scheme requires; if it reaches NHIS within 30 days of confirmation the 5 per cent applies from the date of diagnosis, otherwise from the date of application, and tests before confirmation are excluded. The rate covers outpatient and inpatient care, CT, MRI and PET, and pharmacies, and complications with a clear medical link to the cancer. It does not cover items charged in full to the patient (100분의100), selectively covered items (선별급여), two- and three-bed rooms, meals or non-covered care (비급여). A patient with residual or metastatic disease, or a recurrence, still on anticancer treatment when the five years end can register again in the three months before they expire.",
    links: [SANJEONG],
  },
  {
    id: "threshold",
    title: "No written threshold, but a published range: about 43 million won per year of good health for cancer drugs",
    plain: "Korea does not publish a fixed price it will pay for a year of good-quality life. Instead, each year-end HIRA publishes the range of values for the drugs it assessed in the last five years, as the trade press reports. For cancer drugs assessed from 2020 to 2024 the middle value was about 42.9 million won and the highest 55.4 million won.",
    detail: "HIRA's detailed evaluation standard, as quoted by Daily Pharm, states that it does not use an explicit cost-effectiveness threshold and judges flexibly, with reference to previous decisions, in the light of disease severity, social burden of disease, effect on quality of life and innovation. An amendment in August 2024 defined innovation for this purpose by three conditions that must all be met: no substitute or equivalent treatment, a marked clinical improvement in a final outcome such as survival, and approval through MFDS expedited review under article 35-4(2) of the Pharmaceutical Affairs Act, or a drug the committee accepts as equivalent. As reported by Daily Pharm from HIRA's disclosures, the incremental cost-effectiveness ratios of the anticancer drugs assessed were: 2014 to 2021, median 45.32 million won; 2018 to 2022 (10 drugs), median 39.99 million, maximum 47.92 million; 2019 to 2023 (8 drugs), median 39.93 million, minimum 25.88 million, maximum 47.92 million; 2020 to 2024 (8 drugs), median 42.94 million, maximum 55.36 million. For general drugs in 2019 to 2023 the median was 27.66 million and the maximum 36.10 million. Trade press links the jump in the maximum to trastuzumab deruxtecan, listed in April 2024; HIRA does not name the drugs.",
    links: [ICER_2024, ICER_2026],
  },
  {
    id: "risk-sharing",
    title: "Confidential risk-sharing contracts since 2014, and a waiver of economic evaluation for some cancer drugs",
    plain: "From 2014 to 2020 most of the cancer and rare-disease drugs Korea listed came through confidential risk-sharing contracts, almost all of them financial arrangements rather than payment for results. Some cancer and rare-disease drugs of high clinical need can skip the economic evaluation altogether. Even so, a new cancer drug took on average about three years to be covered in 2017 to 2020.",
    detail: "Managed entry agreements (위험분담제) were introduced in January 2014. From then to December 2020, 48 medicines were listed under them, 73.4 per cent of the cancer and rare-disease medicines listed, and 97.9 per cent of the contracts were finance-based, with outcome-based contracts 2.1 per cent. A separate economic evaluation waiver is designed for orphan and cancer drugs of high clinical need, while a price-negotiation waiver serves mainly non-orphan, non-cancer drugs; a study of 785 new drugs introduced from 2007 to 2022 found negotiation agreement rates for orphan and cancer drugs rose after the waivers were introduced. Thirty-two anticancer drugs reviewed between January 2017 and March 2020 took on average 36.7 months to listing, at 12.6 to 90.2 per cent of the average adjusted price in seven reference countries. Of 171 new drugs approved from 2013 to 2022, 67.8 per cent were reimbursed by 1 January 2024.",
    links: [
      { label: "Kim et al. Managed entry agreements in Korea (Front Pharmacol 2023)", url: "/papers/paper-kim-managed-entry-agreements-korea-front-pharmacol-2023/" },
      { label: "Kim et al. Pricing and reimbursement of new anticancer drugs in Korea (Expert Rev Pharmacoecon Outcomes Res 2021)", url: "/papers/paper-kim-anticancer-pricing-reimbursement-korea-erpor-2021/" },
      { label: "Yu. The two-waiver system in South Korea (J Eval Clin Pract 2025)", url: "https://doi.org/10.1111/jep.70074" },
      { label: "Hwang et al. New drug accessibility and budgetary impact in South Korea (Expert Rev Pharmacoecon Outcomes Res 2025)", url: "https://doi.org/10.1080/14737167.2025.2487468" },
    ],
  },
];

export const KR_REGULATOR: CountryCard[] = [
  {
    id: "mfds",
    title: "MFDS reviews quickly; drugs arrive late because companies apply late",
    plain: "Korea's medicines regulator is the Ministry of Food and Drug Safety. A study of cancer drugs approved from 2013 to 2022 found they reached Korea one to two years after the United States, Europe and Japan, but mostly because companies applied later: the regulator's own review was quicker than Europe's.",
    detail: "Comparing submission, approval and reimbursement timing for the same cancer drugs in Korea, the United States, the European Union and Japan, Lee and Lee found an average delay of one to two years in submission and approval in Korea over 2013 to 2022, an MFDS review time much shorter than those lags and better than the EMA's, and a reimbursement decision delay roughly halved over the decade. Variation in approval delay was largely explained by submission delay, which the authors read as Korea not yet being a preferred first market for new cancer drugs. A new MFDS review procedure began in January 2025, with a dedicated team of reviewers for each product, early manufacturing inspection and scheduled meetings; MFDS reported the first biological product approved under it in December 2025 with an 18-person team. Trade press reported the procedure came with a fee of 410 million won per application and a target of 295 days against an average of about 420; MFDS's own text on those two numbers was not reached for this page.",
    links: [{ label: "Lee and Lee. Anti-cancer drug lags in South Korea (Inquiry 2025)", url: "/papers/paper-lee-anticancer-drug-lag-korea-inquiry-2025/" }, { label: "MFDS press note, 18 December 2025: first biologic under the new procedure (Korean)", url: "https://www.mfds.go.kr/brd/m_99/view.do?seq=49573" }, { label: "Daily Pharm, 6 February 2025: fee and target (Korean)", url: "https://www.dailypharm.com/user/news/8680" }],
  },
  {
    id: "trials",
    title: "A trial country: Seoul is the world's second city for company-sponsored trials",
    plain: "Korea approved 783 drug trials in 2025, 304 of them for cancer medicines. An analysis for 2024 cited by the regulator ranked Seoul second only to Beijing among cities for new company-sponsored trials, and Korea sixth among countries.",
    detail: "MFDS counts 842 trial approvals in 2021, 711 in 2022, 783 in 2023, 747 in 2024 and 783 in 2025, excluding bioequivalence studies. Anticancer drugs were the largest group each year (321, 259, 294, 276 and 304), and in 2025 about 68 per cent of cancer trials (207) were of targeted agents. Multinational trials rose from 372 to 425 in 2025; trials of medicines developed by Korean companies fell from 305 to 259, and 92 per cent of those were run only in Korea. Investigator-initiated trials fell from 188 in 2020 to 83 in 2024 and recovered to 115 in 2025. MFDS's note for 2024, citing an analysis by the Korea National Enterprise for Clinical Trials of company-sponsored studies newly registered on ClinicalTrials.gov, ranked Korea sixth among countries (and eleventh for multinational trials) and Seoul second among cities after Beijing, ahead of Shanghai, Houston and Miami.",
    links: [TRIALS_2025, TRIALS_2024],
  },
];

export const KR_DOING: CountryCard[] = [
  {
    id: "screening",
    title: "National screening for six cancers, free or at a tenth of the cost, including an endoscopy every two years from 40",
    plain: "Korea invites every adult from 40 for a stomach endoscopy every two years, and people with hepatitis B or C or cirrhosis for a liver ultrasound and blood test every six months. It also screens for bowel, breast and cervical cancer and lung cancer in heavy smokers aged 54 to 74. Screening is free for people on Medical Aid and the lower-income half of the insured; the rest pay 10 per cent for stomach, breast, liver and lung screening, and nothing for bowel and cervical screening. Thyroid cancer is not on the list.",
    detail: "The National Cancer Screening Program began in 1999 with stomach, breast and cervical screening for Medical Aid beneficiaries and by 2019 offered six cancers to Medical Aid recipients and everyone insured; lung screening was introduced in 2019. The programme's 2025 review says screening is free for Medical Aid recipients and National Health Insurance members in the lower 50 per cent income bracket, that for members in the upper 50 per cent the insurer pays 90 per cent of stomach, breast, liver and lung screening and the person the remaining 10 per cent, and that cervical and colorectal screening are fully covered. Under the current rules: stomach, men and women 40 and over, every two years, by upper endoscopy, with a biopsy where needed (sedation and Helicobacter tests are paid by the patient); liver, people 40 and over with cirrhosis, hepatitis B surface antigen, hepatitis C antibody or chronic viral liver disease, every six months, by ultrasound with alpha-fetoprotein; lung, 54 to 74 with a smoking history of at least 30 pack-years who still smoke, and others the health minister designates, every two years, by low-dose CT with results counselling and smoking-cessation advice; colorectal, 50 and over, every year, by faecal occult blood test with colonoscopy if positive; breast, women 40 and over, every two years, by mammography; cervix, women 20 and over, every two years, by Pap smear. A nested case-control study of 16.6 million people in the programme found that people screened by endoscopy had about half the odds of dying of stomach cancer (odds ratio 0.53), while barium X-ray screening showed no association (0.98). The current rules on cancer.go.kr name endoscopy as the stomach test; the 2025 review still lists an X-ray series as a selective alternative.",
    links: [SCREENING, { label: "Lee, Suh and Choi. The National Cancer Screening Program in Korea (J Prev Med Public Health 2025)", url: "/papers/paper-lee-national-cancer-screening-program-korea-jpmph-2025/" }, { label: "Jun et al. Effectiveness of the Korean National Cancer Screening Program in reducing gastric cancer mortality (Gastroenterology 2017)", url: "/papers/paper-jun-gastroenterology/" }],
  },
  {
    id: "first-approvals",
    title: "Medicines approved in Korea first: lazertinib",
    plain: "Lazertinib, a lung cancer pill developed by the Korean company Yuhan, was approved in Korea in January 2021, more than three years before the United States approved it with amivantamab. It is the 31st new drug developed in Korea.",
    detail: "MFDS approved Leclaza (lazertinib) on 18 January 2021 for EGFR T790M-positive locally advanced or metastatic non-small-cell lung cancer after a previous EGFR inhibitor, describing it as the 31st new drug developed in Korea, and extended it on 30 June 2023 to first-line treatment of EGFR exon 19 deletion or L858R disease on the strength of Yuhan's phase 3 trial. With Janssen as the company named by both regulators, it was approved in the United States in August 2024 and in the EU in January 2025, only in combination with amivantamab, on the basis of MARIPOSA. Before this page OnCo's lazertinib record named only Johnson & Johnson as its company and carried no Korean approval; both are now corrected. Korean companies also supply subcutaneous delivery technology to global cancer drugs: when this page was written, Alteogen's own news described MSD's subcutaneous pembrolizumab, Keytruda Qlex, as built on its ALT-B4 hyaluronidase platform; Alteogen's site could not be re-read on 17 November 2026.",
    links: [LECLAZA, { label: "FDA, 19 August 2024: lazertinib with amivantamab", url: "https://www.fda.gov/drugs/cancer-approvals/fda-approves-lazertinib-amivantamab-vmjw-non-small-lung-cancer" }, { label: "EMA: Lazcluze, authorised 20 January 2025", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/lazcluze" }, { label: "MARIPOSA (NEJM 2024)", url: "/papers/paper-mariposa-nejm-2024/" }, { label: "Alteogen (Korean)", url: "https://www.alteogen.com/" }],
  },
  {
    id: "surgery",
    title: "Gastric cancer trials led from Korea: keyhole surgery and chemotherapy after surgery",
    plain: "Korean surgeons ran the trial that showed keyhole surgery gives long-term survival no worse than open surgery for early stomach cancer, and Korean centres, with centres in China and Taiwan, ran a trial showing that chemotherapy after surgery keeps more people free of the disease.",
    detail: "KLASS-01, run by the Korean Laparoendoscopic Gastrointestinal Surgery Study (KLASS) group of 15 surgeons at 13 institutions, randomised 1,416 patients with clinical stage I gastric cancer to laparoscopic or open distal gastrectomy and found laparoscopy non-inferior for five-year overall survival (94.2 against 93.3 per cent). CLASSIC, run in South Korea, China and Taiwan, randomised 1,035 patients after D2 gastrectomy for stage II to IIIB gastric cancer to capecitabine and oxaliplatin or surgery alone and found better disease-free survival with chemotherapy. Both are in the corpus with their papers.",
    links: [{ label: "KLASS-01 (JAMA Oncol 2019)", url: "/papers/paper-klass-01-kim-jama-oncol-2019/" }, { label: "CLASSIC (Lancet 2012)", url: "/papers/paper-classic-adjuvant-capox-gastric-bang-lancet-2012/" }],
  },
];

export const KR_GAPS: CountryCard[] = [
  {
    id: "unread",
    title: "What could not be sourced",
    plain: "Several things this page should say it does not, because the primary source could not be read or found. They are listed so that no one mistakes a gap for an answer.",
    detail: "MFDS's own text on the 2025 review fee (410 million won) and the 295-day target, which appear here only from trade press. HIRA's annual ICER disclosures themselves, which are cited here through Daily Pharm's reporting of them. The full text of the Ministry of Health and Welfare's notice on the special co-payment scheme, which NHIS links to and summarises. The annual cap on out-of-pocket costs (본인부담상한제), which applies to cancer patients but whose current amounts were not checked. The month national lung screening began: the programme's own review gives only the year, 2019. Regional differences in incidence and survival, which the registry publishes but this page does not cover. Korean-language attachments in HWP format were not read; the PDF versions were.",
    links: [KCCR_FULL],
  },
  {
    id: "corpus",
    title: "Records that should be in this corpus and are not",
    plain: "OnCo holds many Korean companies and the big Seoul hospitals, but not the national trial support body or trial registry, the patient organisations or the national precision medicine programme, and it has few of the Korean-led papers behind its cancer pages.",
    detail: "Not yet held: the Korea National Enterprise for Clinical Trials (KoNECT), which publishes the trial-site rankings above; Korean registries of trials (CRIS, the Clinical Research Information Service); Korean patient organisations; the K-MASTER precision oncology programme named in OnCo's own country table, which this page could not verify; ABL Bio and Alteogen as company records; HLB and rivoceranib's Korean development; and the Korean Society of Medical Oncology as an institution. GLOBOCAN's modelled figures for Korea differ substantially from the registry's counts, and OnCo has not established why.",
    links: [{ label: "KoNECT", url: "https://www.konect.or.kr" }, { label: "CRIS: Clinical Research Information Service", url: "https://cris.nih.go.kr" }],
  },
];

/** Leading sites, 2023, both sexes. Rate is age-standardised to Korea's 2020 population (not comparable abroad). */
export const KR_INCIDENCE: Array<{ id: string; site: string; cases: number; share: number; asrKorea: number; cancerIds: string[] }> = [
  { id: "thyroid", site: "Thyroid", cases: 35440, share: 12.3, asrKorea: 68.9, cancerIds: ["thyroid"] },
  { id: "lung", site: "Lung", cases: 32953, share: 11.4, asrKorea: 57.5, cancerIds: ["nsclc"] },
  { id: "colorectal", site: "Colon and rectum", cases: 32610, share: 11.3, asrKorea: 58.7, cancerIds: ["colorectal"] },
  { id: "breast", site: "Breast", cases: 29871, share: 10.3, asrKorea: 56.8, cancerIds: ["breast-hr-positive"] },
  { id: "stomach", site: "Stomach", cases: 28943, share: 10.0, asrKorea: 51.4, cancerIds: ["gastric"] },
  { id: "prostate", site: "Prostate", cases: 22640, share: 7.8, asrKorea: 39.2, cancerIds: ["prostate"] },
  { id: "liver", site: "Liver", cases: 14707, share: 5.1, asrKorea: 26.1, cancerIds: ["hcc"] },
  { id: "pancreas", site: "Pancreas", cases: 9748, share: 3.4, asrKorea: 17.1, cancerIds: ["pancreatic"] },
  { id: "biliary", site: "Gallbladder and other biliary", cases: 7997, share: 2.8, asrKorea: 13.8, cancerIds: ["gallbladder", "cholangiocarcinoma"] },
  { id: "kidney", site: "Kidney", cases: 7367, share: 2.6, asrKorea: 13.5, cancerIds: ["rcc"] },
];

/** Five-year relative survival (%) by diagnosis period, and by summary stage for 2019 to 2023 (share of cases %, survival %). */
export const KR_SURVIVAL: Array<{ id: string; site: string; s9395: number; s0105: number; s1923: number; locShare: number; locSurv: number; distShare: number; distSurv: number }> = [
  { id: "all", site: "All cancers", s9395: 42.9, s0105: 54.2, s1923: 73.7, locShare: 46.1, locSurv: 92.7, distShare: 17.8, distSurv: 27.8 },
  { id: "thyroid", site: "Thyroid", s9395: 94.5, s0105: 98.4, s1923: 100.2, locShare: 46.0, locSurv: 100.7, distShare: 0.8, distSurv: 63.7 },
  { id: "lung", site: "Lung", s9395: 12.5, s0105: 16.6, s1923: 42.5, locShare: 26.9, locSurv: 81.5, distShare: 40.7, distSurv: 13.9 },
  { id: "colorectal", site: "Colon and rectum", s9395: 56.2, s0105: 67.0, s1923: 75.6, locShare: 39.0, locSurv: 94.9, distShare: 16.0, distSurv: 20.4 },
  { id: "breast", site: "Breast", s9395: 79.3, s0105: 88.7, s1923: 94.7, locShare: 61.0, locSurv: 99.2, distShare: 4.6, distSurv: 50.4 },
  { id: "stomach", site: "Stomach", s9395: 43.9, s0105: 58.0, s1923: 78.6, locShare: 65.3, locSurv: 97.6, distShare: 10.7, distSurv: 7.5 },
  { id: "prostate", site: "Prostate", s9395: 59.2, s0105: 81.1, s1923: 96.9, locShare: 52.0, locSurv: 103.6, distShare: 9.6, distSurv: 51.2 },
  { id: "liver", site: "Liver", s9395: 11.8, s0105: 20.6, s1923: 40.4, locShare: 45.9, locSurv: 63.5, distShare: 16.0, distSurv: 3.5 },
  { id: "pancreas", site: "Pancreas", s9395: 10.7, s0105: 8.4, s1923: 17.0, locShare: 14.3, locSurv: 47.8, distShare: 43.3, distSurv: 2.4 },
  { id: "biliary", site: "Gallbladder and other biliary", s9395: 18.7, s0105: 23.1, s1923: 29.0, locShare: 24.6, locSurv: 48.7, distShare: 21.8, distSurv: 4.1 },
  { id: "kidney", site: "Kidney", s9395: 64.3, s0105: 73.7, s1923: 87.9, locShare: 73.7, locSurv: 98.5, distShare: 9.8, distSurv: 22.0 },
];

/** National Cancer Screening Program rules as published on cancer.go.kr (last updated 3 August 2026). */
export const KR_SCREENING: Array<{ id: string; cancer: string; who: string; interval: string; test: string }> = [
  { id: "stomach", cancer: "Stomach", who: "Men and women 40 and over", interval: "Every 2 years", test: "Upper endoscopy, with biopsy if needed" },
  { id: "liver", cancer: "Liver", who: "40 and over at high risk: cirrhosis, hepatitis B or C, chronic viral liver disease", interval: "Every 6 months", test: "Liver ultrasound with alpha-fetoprotein" },
  { id: "lung", cancer: "Lung", who: "54 to 74, current smokers with 30 or more pack-years, and others the health minister designates", interval: "Every 2 years", test: "Low-dose chest CT, with results and stop-smoking counselling" },
  { id: "colorectal", cancer: "Colon and rectum", who: "Men and women 50 and over", interval: "Every year", test: "Faecal occult blood test; colonoscopy if positive" },
  { id: "breast", cancer: "Breast", who: "Women 40 and over", interval: "Every 2 years", test: "Mammography" },
  { id: "cervix", cancer: "Cervix", who: "Women 20 and over", interval: "Every 2 years", test: "Pap smear" },
];

/** MFDS clinical trial approvals by year, bioequivalence excluded (press releases of 28 March 2025 and 6 March 2026). */
export const KR_TRIAL_APPROVALS: Array<{ year: number; total: number; oncology: number; company: number; investigator: number; multinational: number }> = [
  { year: 2021, total: 842, oncology: 321, company: 679, investigator: 163, multinational: 412 },
  { year: 2022, total: 711, oncology: 259, company: 595, investigator: 116, multinational: 348 },
  { year: 2023, total: 783, oncology: 294, company: 660, investigator: 123, multinational: 402 },
  { year: 2024, total: 747, oncology: 276, company: 664, investigator: 83, multinational: 372 },
  { year: 2025, total: 783, oncology: 304, company: 668, investigator: 115, multinational: 425 },
];

export const KR_INSTITUTIONS = ["ncc-korea", "snuh", "samsung-medical-center", "asan-medical-center", "severance", "seoul-st-marys-hospital", "snu-bundang-hospital", "mfds", "hira", "nhis-korea"];
export const KR_COMPANIES = ["yuhan", "celltrion", "samsung-bioepis", "samsung-biologics", "hanmi-pharmaceutical", "ligachem-biosciences", "lunit", "gc-cell", "dong-a-st", "orum-therapeutics", "medpacto", "canariabio", "il-yang-pharmaceutical", "kcsg", "kgog"];
export const KR_DRUGS = ["lazertinib", "olmutinib", "radotinib", "lunit-insight-mmg"];
export const KR_TRIALS = ["klass-01", "classic", "mariposa", "debate", "nifty", "nct02213991", "yonsei-mced-wgs"];
export const KR_PAPERS = ["paper-kccr-cancer-statistics-korea-2023-crt-2026", "paper-lee-national-cancer-screening-program-korea-jpmph-2025", "paper-jun-gastroenterology", "paper-kang-thyroid-cancer-overdiagnosis-income-korea-bmc-cancer-2020", "paper-ahn-n-engl-j-med", "paper-klass-01-kim-jama-oncol-2019", "paper-classic-adjuvant-capox-gastric-bang-lancet-2012", "paper-mariposa-nejm-2024", "paper-lee-anticancer-drug-lag-korea-inquiry-2025", "paper-kim-managed-entry-agreements-korea-front-pharmacol-2023", "paper-kim-anticancer-pricing-reimbursement-korea-erpor-2021"];
export const KR_PEOPLE = ["bang-yung-jue", "kim-tae-you", "oh-do-youn", "im-seock-ah", "kim-dong-wan", "cho-byoung-chul", "rha-sun-young", "lee-jeeyun", "keunchil-park", "ahn-myung-ju", "kang-yoon-koo", "ryu-min-hee", "lee-sung-gyu", "han-kwang-yang", "hyung-ho-kim", "yoon-seung-kew", "park-yeon-hee", "lee-dae-ho"];
