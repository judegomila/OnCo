import type { CountryDive } from "@/data/country-dive";

/**
 * Oman deep dive: the hand-written cards for /countries/om/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Oman (PDF text); the
 * Ministry of Health's "Cancer Incidence in Oman 2021" (the national registry's 26th report, PDF text, published 2025)
 * and the ministry's list of registry reports; the ministry's pages for itself, the Drug Safety Center, the
 * Directorate General of Medical Supplies and the Royal Hospital; its National Health Policy 2025 (PDF text); its
 * national guidelines on breast cancer screening (second edition, January 2025) and colorectal cancer (first edition,
 * April 2023), both PDF text; ministry news items of May 2016, December 2018 and June 2023, and its Arabic news item
 * of 25 September 2025 on the HPV vaccination programme; the Arabic press statement for a ministry media briefing, in
 * a file dated 22 February 2026 (PDF text; the date is the file's, the text layer shows none); WHO's Country Cooperation Strategy for
 * Oman 2021 to 2025 and WHO's cancer country profile 2020 (PDF text); the IAEA's note on its imPACT review of January
 * 2013 (PDF text) and its DIRAC country row; WHO's immunisation data API for HPV; the World Bank's health spending
 * series; ClinicalTrials.gov's API for the three corpus trials; and news reports from the Oman News Agency (July
 * 2025), Oman Observer (February 2018, September and December 2025) and Times of Oman (November 2025).
 *
 * The cancer centre's own site, one IAEA page and a 2022 book chapter on oncology care in Oman could not be read; the
 * Oman Cancer Association's site failed at first and its home page loaded later the same day; each is named under
 * `gaps`. One Drug Safety Center draft guideline was opened and carries a notice that it must not be cited, so the
 * page records that the drafts exist and nothing more.
 *
 * Second accuracy pass, 16 November 2026: every claim re-read against the raw text of its source. The main change is
 * the HPV card: the ministry's own Arabic news item gives 19 October 2025 as the start of vaccination, which the
 * first pass had not found.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/512-oman-fact-sheet.pdf";
const MOH_REPORTS = "https://www.moh.gov.om/en/statistics/cancer-repoerts/";
const CI_2021 = "https://www.moh.gov.om/media/veahqntc/cancer-incidence-in-oman-2021-updated-on-27-octobar2025.pdf";
const MOH_ABOUT = "https://www.moh.gov.om/en/ministry/about-moh/";
const NHP_2025 = "https://www.moh.gov.om/media/t3ykfej3/english_omans-national-health-policy.pdf";
const DSC = "https://www.moh.gov.om/en/hospitals-directorates/directorates-and-centers-at-hq/drug-safety-center/";
const DGMS = "https://www.moh.gov.om/en/hospitals-directorates/directorates-and-centers-at-hq/directorate-general-of-medical-supplies/";
const DSC_CONSULT = "https://www.moh.gov.om/en/other/guideline-on-registration-of-medicines-according-to-verification-and-abridged/";
const DSC_CIRC_17 = "https://www.moh.gov.om/en/ministry/drug-safety-center-circulars/circular-no17-implementation-of-guideline-for-importing-non-registered-medicine/";
const MOH_SEARCH_CANCER = "https://www.moh.gov.om/en/other/search/?q=cancer";
const ROYAL = "https://www.moh.gov.om/en/hospitals-directorates/hospitals/royal-hospital/";
const NOC_SERVICES = "https://www.moh.gov.om/en/media-center/news/national-oncology-center-services/";
const ABROAD_2016 = "https://www.moh.gov.om/en/media-center/news/moh-clarify-treatment-abroad-issues/";
const BREAST_GUIDE = "https://www.moh.gov.om/media/rxok1asq/early-detection-breast-cancer-screening-guidelines.pdf";
const CRC_GUIDE = "https://www.moh.gov.om/media/eeenmvjz/national-guidelines-for-colorectal-cancer-crc-screening-diagnosis-management-and-follow-up.pdf";
const CERVICAL_STUDY = "https://www.moh.gov.om/en/media-center/news/moh-calls-women-to-participate-in-national-study-for-early-detection-of-cervical-cancer/";
const HPV_SEMINAR_2025 = "https://www.moh.gov.om/ar/المركز-الإعلامي/الأخبار/الصحة-تنظم-ندوة-علمية-حول-برنامج-التطعيم-ضد-فيروس-الورم-الحليمي-البشري-في-سلطنة-ع-مان-1/";
const BRIEFING_2026 = "https://www.moh.gov.om/media/1g4pu0cp/بيان-وزارة-الصحة-للقاء-الا-علامي.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/omn-2020.pdf";
const WHO_CCS = "https://applications.emro.who.int/docs/9789290228493-eng.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'OMN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=OM";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=OM";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=OM";
const WB_GDP = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=OM";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const IMPACT_2013 = "https://www.iaea.org/sites/default/files/documents/review-missions/oman-2013-impact-review.pdf";
const OBS_HPV_1 = "https://www.omanobserver.om/article/1176272/oman/health/moh-launches-hpv-vaccination-campaign-for-school-students";
const OBS_HPV_2 = "https://www.omanobserver.om/article/1176464/oman/health/oman-to-launch-hpv-vaccine-programme-dispels-concerns";
const OBS_AUDIT = "https://www.omanobserver.om/article/1181798/oman/community/sqcccrc-achieves-international-radiotherapy-audit-milestone";
const OBS_NCD_2018 = "https://www.omanobserver.om/article/63041/Front%20Stories/breaking-national-plan-launched-as-73-of-deaths-in-oman-from-ncds";
const ONA_MASCC = "https://omannews.gov.om/topics/en/79/show/123245/ona";
const TOO_DECLARATION = "https://timesofoman.com/article/164761-oman-declaration-pledges-self-reliance-equity-in-regional-cancer-fight";
const CTGOV = "https://clinicaltrials.gov/search?country=Oman&cond=cancer";

export const OM_DIVE: CountryDive = {
  iso2: "OM",
  iso3: "OMN",
  name: "Oman",
  flag: "🇴🇲",
  asOf: "2026-11-16",
  title: "Cancer in Oman",
  description:
    "Cancer in Oman from Omani sources: a national registry with a report for every year from 1996 to 2021, which counted 2,318 cancers among Omanis in 2021, IARC's estimate of 4,076 new cases and 1,719 deaths in 2024, public care that WHO described in 2021 as nearly free at the point of delivery and available at every level for Omanis, the Drug Safety Center as regulator, a guideline offering Omani women a screening mammogram from age 40, HPV vaccination that the ministry said would begin on 19 October 2025, and two radiotherapy centres in the IAEA's directory.",
  lede:
    "Oman has a national cancer registry with mandatory reporting, a government health service that pays for most care, and two cancer centres in Muscat. In the registry's latest report, for 2021, breast cancer was the commonest cancer and the median age at diagnosis was 51. No later year is on the ministry's list, IARC's figure for deaths from cancer is modelled rather than counted, and OnCo found no stand-alone national cancer plan.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Oman is 4,076 new cancers and 1,719 deaths in a population of 5,281,544, an age-standardised incidence of 106.5 per 100,000 (108.9 in men, 114.0 in women) and mortality of 52.1 (59.1 in men, 45.5 in women). IARC's fact sheet names the national registry as the source for incidence, with national rates applied to the 2024 population. For deaths the source it names is Survcan, IARC's registry survival project, not death records: the estimate applies modelled mortality-to-incidence ratios, built from registry survival data, to the incidence estimate. The registry's own latest count is lower and older: 2,318 cancers among Omanis and 163 among non-Omanis registered for 2021, when the population was 4,527,446. The registry calculates rates for Omani nationals only (an age-standardised rate of 122.2 per 100,000 in 2021), while IARC's rate covers all residents, about 62% of whom are male by OnCo's own sum from IARC's population figures. The fact sheet does not explain the remaining difference between the two totals, and OnCo has not tried to.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Oman",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Oman (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 4,000 new cancers a year by IARC's estimate; breast cancer is the commonest",
          plain:
            "IARC estimates 4,076 new cancers and 1,719 cancer deaths in Oman in 2024, in a population of about 5.3 million. Breast cancer is the commonest, then colorectal and thyroid cancer. Colorectal cancer causes the most deaths, followed by liver cancer and breast cancer.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 589 breast cancers (148 deaths), 492 colorectal cancers (209 deaths), 434 thyroid cancers (30 deaths), 278 non-Hodgkin lymphomas (101 deaths), 210 leukaemias (121 deaths), 186 liver cancers (169 deaths) and 165 lung cancers (145 deaths). Among men it estimates 2,223 new cases, led by colorectal cancer (341), non-Hodgkin lymphoma (185) and prostate cancer (177); among women 1,853, led by breast (589), thyroid (313) and colorectal cancer (151). The risk of developing cancer before age 75 is put at 11.7%, and 11,794 people were living within five years of a diagnosis. IARC's population for Oman is 3,285,832 males and 1,995,713 females. These are estimates for 2024 built from the national registry's rates, not a count of that year's cases.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Oman (PDF)", url: GCO_FACT }],
        },
        {
          id: "registry",
          title: "A national registry since 1996, with reporting required by ministerial decision",
          plain:
            "The Ministry of Health runs the Oman National Cancer Registry. It started as a hospital registry in 1985 and has published a national report for every year from 1996 to 2021. Doctors, laboratories and hospitals, public and private, must report each cancer within 30 days of diagnosis.",
          detail:
            "The registry's 2021 report says it was established in 1985 as a hospital-based registry that recorded cases treated in tertiary hospitals, and that in 1996, when the Department of Non-Communicable Diseases Surveillance and Control was set up, it was transferred and began working under the Directorate General of Health Affairs. Notification became mandatory in 2001 under Ministerial Decision 4/2001; Decision 222/2017 replaced it, covering civil, military and private institutions and making the examining doctor, the laboratory technician and the head of the institution responsible for reporting. Two trained registrars collect, code and enter the data. They visit the Royal Hospital twice a week and Khoula and Al Nahdha hospitals monthly, receive pathology reports, chemotherapy and radiotherapy lists and hospital admission and discharge lists, and trace Omanis treated abroad through the ministry's treatment abroad committee and lists from the United Arab Emirates. The registry uses IARC's CanReg5 software. The 2021 report is the 26th edition and was published in 2025; it is the latest on the ministry's list.",
          links: [
            { label: "Ministry of Health: Cancer Incidence in Oman 2021 (PDF, published 2025)", url: CI_2021 },
            { label: "Ministry of Health: all cancer incidence reports, 1996 to 2021", url: MOH_REPORTS },
          ],
        },
        {
          id: "registry-2021",
          title: "2021: 2,318 cancers among Omanis, more in women than in men, at a median age of 51",
          plain:
            "The registry recorded 2,510 tumours for 2021. Of these, 2,318 were cancers in Omani nationals: 1,324 in women and 994 in men. Half of those diagnosed were aged 51 or younger. Breast cancer was the commonest, then thyroid and colorectal cancer.",
          detail:
            "Of the 2,510 tumours, 2,318 (92.35%) were among Omanis, 163 among non-Omanis and 29 were carcinoma in situ. The median age at diagnosis was 51: 58 in men and 47 in women. Among Omanis the crude rate was 82.7 per 100,000 (70.4 in men, 95.1 in women) and the age-standardised rate 122.2 (117.2 in men, 129.4 in women), against an Omani population of 2,804,117. The ten commonest cancers among Omanis were breast (408), thyroid (262), colorectal (214), non-Hodgkin lymphoma (145), leukaemia (124), brain and nervous system (124), liver (91), stomach (86), prostate (77) and head and neck (74). The report counts 9.9% more cases than in 2020 and says this could reflect the period after COVID-19. It reports 97.6% of cases as morphologically verified and none registered from a death certificate alone. Muscat recorded 731 cases, which the report says could be biased because most patients are referred to the National Oncology Centre there and some give a Muscat address.",
          links: [{ label: "Ministry of Health: Cancer Incidence in Oman 2021, report summary and tables 12, 13 and 18 (PDF)", url: CI_2021 }],
        },
        {
          id: "children-and-residents",
          title: "155 children with cancer in 2021, and 163 cancers among non-Omani residents",
          plain:
            "The registry counted 155 Omani children aged 14 or under with cancer in 2021, about 7 in every 100 cancers. It also registered 163 cancers among non-Omani residents, who made up more than a third of the population in the report's own figures, and does not calculate rates for them.",
          detail:
            "Among Omani children the commonest groups were non-Hodgkin lymphomas (22), lymphoid leukaemias (18), neuroblastoma and ganglioneuroblastoma (14), acute myeloid leukaemias (13) and intracranial and intraspinal embryonal tumours (12); 79 of the 155 were boys and 76 girls. Among non-Omanis, 58 of the 163 cancers were in men and 105 in women; breast cancer was the commonest (44), then leukaemia (14), thyroid (12), non-Hodgkin lymphoma (9) and colorectal cancer (8), and 91 were reported from Muscat. The report gives the 2021 population as 4,527,446, of whom 1,723,329 were non-Omanis. Frequency and incidence tables are generated for Omanis only, so the report gives no rate for the non-Omani population.",
          links: [{ label: "Ministry of Health: Cancer Incidence in Oman 2021, childhood cancers and cancer among non-Omanis (PDF)", url: CI_2021 }],
        },
      ],
      tables: [
        {
          id: "om-registry-trend",
          title: "Cancers registered among Omanis by year, Oman National Cancer Registry",
          caption: "Number of cancer cases among Omani nationals by year of diagnosis, as updated in the 2021 report (table 5).",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "Cases among Omanis", numeric: true },
          ],
          rows: [
            { year: "2009", cases: 1029 },
            { year: "2013", cases: 1445 },
            { year: "2017", cases: 1995 },
            { year: "2018", cases: 2071 },
            { year: "2019", cases: 2271 },
            { year: "2020", cases: 2109 },
            { year: "2021", cases: 2318 },
          ],
          note: "Counts of new cases among Omani nationals, not deaths and not non-Omani residents. The registry revises earlier years as late reports arrive: 2020 stood at 1,994 when first published and 2,109 in this report, so 2021 may also rise.",
          sources: [{ label: "Ministry of Health: Cancer Incidence in Oman 2021, table 5 (PDF)", url: CI_2021 }],
        },
        {
          id: "om-registry-top10",
          title: "Ten commonest cancers among Omanis, 2021",
          caption: "Number of new cases among Omani men and women together in 2021, from the registry's table 18.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases, 2021", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 408 },
            { site: "Thyroid", cases: 262 },
            { site: "Colorectal", cases: 214 },
            { site: "Non-Hodgkin lymphoma", cases: 145 },
            { site: "Leukaemia", cases: 124 },
            { site: "Brain and nervous system", cases: 124 },
            { site: "Liver", cases: 91 },
            { site: "Stomach", cases: 86 },
            { site: "Prostate", cases: 77 },
            { site: "Head and neck", cases: 74 },
          ],
          note: "Omani nationals only, both sexes together, out of 2,318 cancers. These are the registry's counts for 2021; IARC's estimates for 2024, in the GLOBOCAN table on this page, cover all residents and are higher.",
          sources: [{ label: "Ministry of Health: Cancer Incidence in Oman 2021, table 18 (PDF)", url: CI_2021 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      aside: { label: "World Bank: out-of-pocket share of health spending, Oman", url: WB_OOP },
      cards: [
        {
          id: "public-system",
          title: "A government health service that WHO described in 2021 as nearly free at the point of delivery",
          plain:
            "Most care in Oman is provided and paid for by the government. WHO's strategy document for Oman, published in 2021, said public services were nearly free when used and that Omanis could use the public network at every level. For expatriates it described compulsory health insurance as being introduced.",
          detail:
            "WHO's Country Cooperation Strategy for Oman 2021 to 2025 says the government owned and operated around 60.2% of hospitals in 2019, with roughly 73.4% of hospital beds, that public services are nearly free at the point of delivery, and that services are available at all levels for Omanis in the public service network while initiatives to introduce compulsory health insurance for expatriates were under way. The ministry's own page lists among its competencies organising and providing comprehensive healthcare services for all citizens, their families and residents, in accordance with the applicable royal decrees, laws and regulations. Its National Health Policy 2025 commits to preparing a national strategy for sustainable financing of the health sector, with private sector engagement, health investment and health endowment. The policy does not mention cancer by name.",
          links: [
            { label: "WHO: Country Cooperation Strategy for WHO and Oman 2021 to 2025 (PDF)", url: WHO_CCS },
            { label: "Ministry of Health: About the ministry", url: MOH_ABOUT },
            { label: "Ministry of Health: National Health Policy 2025 (PDF)", url: NHP_2025 },
          ],
        },
        {
          id: "spending",
          title: "People paid 6.3% of health spending from their own pockets in 2023",
          plain:
            "In the World Bank's figures, about 6 in every 100 rials spent on health in Oman in 2023 came directly from patients, and the government paid 85 in every 100. Health spending was about 732 US dollars per person, 3.5% of the economy.",
          detail:
            "The World Bank series gives out-of-pocket spending as 5.96% of current health expenditure in 2019, 5.21% in 2020, 5.47% in 2021, 6.90% in 2022 and 6.31% in 2023, the latest year. Domestic general government health expenditure was 85.34% of current health expenditure in 2023 (87.55% in 2019). Current health expenditure per person was US$732.04 in 2023 and 3.49% of GDP. WHO's cooperation strategy, published in 2021, put the out-of-pocket share at 6.4% and compared it with a regional average of 40%. These are national averages across all care and all residents; OnCo found no figure for what a person with cancer pays.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Oman", url: WB_OOP },
            { label: "World Bank: government health expenditure, % of current health expenditure, Oman", url: WB_GOV },
            { label: "World Bank: current health expenditure per person, Oman", url: WB_PC },
            { label: "World Bank: current health expenditure, % of GDP, Oman", url: WB_GDP },
          ],
        },
        {
          id: "cancer-costs",
          title: "The National Oncology Centre said in 2018 that it waives registration fees; a ministry department deals with treatment abroad",
          plain:
            "The ministry said in 2018 that its National Oncology Centre does not charge cancer patients registration or visit fees and has accommodation for adult patients. The ministry has a Department of Treatment Abroad, and the registry takes details of patients treated abroad from it.",
          detail:
            "A ministry news item of 31 December 2018 quotes the centre's head of patient services: the centre exempts all cancer patients from registration fees, whether to open a file or for visits; it provides 40 rooms of accommodation for adult patients, with three meals for the patient and a companion; and children with cancer have accommodation at Dar Al-Hanan, which the item describes as affiliated to the Oman Cancer Association and run in cooperation with the centre. That is a 2018 statement and may not be current. A ministry news item of 31 May 2016, quoting an official source at the ministry, advised citizens travelling abroad for treatment at their own expense to contact the Department of Treatment Abroad to identify specialised and accredited hospitals. It said the ministry did not recommend travel abroad for elderly people who cannot bear the journey or for people with chronic diseases that need long treatment, such as cancers, adding that in some cases the treatment abroad is the same as in Oman's health institutions. The 2021 registry report says details of patients treated abroad come from that department, and its data-flow chart also shows a list of Omani patients treated in the United Arab Emirates from that country's health ministry.",
          links: [
            { label: "Ministry of Health: National Oncology Center Services (31 December 2018)", url: NOC_SERVICES },
            { label: "Ministry of Health: MOH Clarify Treatment Abroad Issues (31 May 2016)", url: ABROAD_2016 },
            { label: "Ministry of Health: Cancer Incidence in Oman 2021, registry methods (PDF)", url: CI_2021 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How a cancer medicine is approved and supplied",
      aside: { label: "Ministry of Health: Drug Safety Center", url: DSC },
      cards: [
        {
          id: "dsc",
          title: "The Drug Safety Center, inside the health ministry, registers medicines",
          plain:
            "Oman's medicines regulator is the Drug Safety Center, part of the Ministry of Health. Its page says it oversees the registration of products. The centre also clears imports, licenses pharmacists and pharmacies and follows the safety of medicines already in use.",
          detail:
            "The centre's page describes it as the regulatory body responsible for assuring effective, safe and good quality drugs in Oman, whether manufactured locally or imported, by implementing the pharmacy practice law issued under Royal Decree 41/91 and its amendments. It says the centre oversees product registration, conducts post-marketing surveillance, licenses pharmacists and pharmaceutical institutions and supports local manufacturing. Its listed services include classifying products, clearing medical products at the border whether registered or not, and listing medical products and devices. From 5 May to 30 June 2026 the centre ran public consultations on draft guidelines, among them one on registering medicines by verification and abridged routes and one on the regulatory framework for product approval; the ministry's site also lists a draft on conditional approval and emergency use. The draft OnCo opened, on verification and abridged routes, says it is not final and must not be cited, so the content of the drafts is not described here.",
          links: [
            { label: "Ministry of Health: Drug Safety Center", url: DSC },
            { label: "Drug Safety Center: consultation on the draft guideline on registration by verification and abridged routes", url: DSC_CONSULT },
          ],
        },
        {
          id: "medicine-supply",
          title: "Public hospitals get medicines through central government procurement",
          plain:
            "The sources OnCo read describe central buying by the ministry for its hospitals, not an insurer's list of reimbursed medicines. The Drug Safety Center oversees registration; whether a public hospital stocks a registered medicine is a separate purchasing decision that OnCo could not read.",
          detail:
            "The ministry lists among its competencies ensuring the availability of pharmaceuticals in accordance with the unified procurement policy for all health institutions within the state administrative apparatus. Its Directorate General of Medical Supplies says it receives, stores and dispenses medicines and medical supplies to the ministry's health institutions under the financial law and the law of government tenders, with the objective of meeting their needs at the required quality, on time and at reasonable prices. The Drug Safety Center's circulars relay safety notices from other regulators on cancer medicines: the ministry's site lists circulars on the European Medicines Agency's notice about Yondelis, on Keytruda and Tecentriq in urothelial cancer, and on the US FDA's communication about Ibrance, Kisqali and Verzenio. The site shows them with dates in 2024, but its listing dates are not always the date a document was issued, so OnCo does not date them. Circular no. 17, shown with the date 1 January 2024, concerns a guideline for importing non-registered medicines; its file is a scanned image and was not read. OnCo did not find a published list of the cancer medicines the ministry buys.",
          links: [
            { label: "Ministry of Health: About the ministry, competencies", url: MOH_ABOUT },
            { label: "Ministry of Health: Directorate General of Medical Supplies", url: DGMS },
            { label: "Ministry of Health site search: circulars and documents on cancer", url: MOH_SEARCH_CANCER },
            { label: "Drug Safety Center: circular no. 17 on importing non-registered medicine (listed as 1 January 2024)", url: DSC_CIRC_17 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: { label: "WHO immunisation data: HPV programme coverage, Oman (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening: a mammogram from age 40 to 69, offered through primary care",
          plain:
            "Oman's national guideline, written for Omani women, tells primary care staff to offer a screening mammogram to women aged 40 to 69 with no symptoms. Women at average risk aged 40 to 55 are screened every year, and every two years after 55. A screening service began in 2009, at first by clinical examination.",
          detail:
            "The National Early Detection and Screening for Breast Cancer Guideline, second edition, was released in January 2025 by the ministry's Department of Woman and Child Health and replaces operational guidelines of 2010. It says the screening service began in 2009 in two governorates and expanded to all of them, at first with clinical breast examination and teaching of self-examination. The target it sets is all Omani women attending a breast screening clinic by self-referral or referral from antenatal, birth spacing, well-being and chronic illness clinics; women with a detected abnormality should be referred to a surgeon within two weeks. The guideline cites a 2022 study comparing 2006 to 2010 with 2015 to 2017 in which stage IV breast cancer fell from 23.01% to 13.58% of cases and stage 0 to 1 rose from 6.86% to 16.98%. It gives the median age at diagnosis among Omani women as 47. OnCo found no published figure for how many eligible women are screened.",
          links: [{ label: "Ministry of Health: National Early Detection and Screening for Breast Cancer Guideline, second edition 2025 (PDF)", url: BREAST_GUIDE }],
        },
        {
          id: "cervical-screening",
          title: "Cervical cancer: a national HPV study launched in 2023; no programme recorded by WHO in 2019",
          plain:
            "WHO's 2020 profile recorded no cervical screening programme in Oman in 2019. In June 2023 the ministry launched a national study of HPV among Omani women and invited women aged 25 to 49 to take part. OnCo could not confirm whether a national screening programme now runs.",
          detail:
            "The ministry's news item of 8 June 2023 says the study, run with the Royal Hospital and the United Nations Population Fund, measures the prevalence and genotypes of human papillomavirus among Omani women in all governorates, as part of Oman's commitment to the global strategy to eliminate cervical cancer. It says 51 physicians from 28 health institutions were trained, including in taking Pap smears, with samples examined at the Royal Hospital's histology laboratory and the Central Public Health Laboratory. It reports the ministry's director of woman and child health as pointing out that \"the number of infected cases in Oman was 35 cases with an average of four per 100000 populations\", without giving the year. The registry's 2021 report counts 41 cervical cancers among Omani women, an age-standardised rate of 4.3 per 100,000. IARC estimates 77 cases and 27 deaths in 2024 among all residents. OnCo did not find the study's results.",
          links: [
            { label: "Ministry of Health: MOH Calls Women to Participate in National Study for Early Detection of Cervical Cancer (8 June 2023)", url: CERVICAL_STUDY },
            { label: "WHO: Cancer Country Profile 2020, Oman (PDF, data for 2019)", url: WHO_PROFILE },
            { label: "Ministry of Health: Cancer Incidence in Oman 2021 (PDF)", url: CI_2021 },
          ],
        },
        {
          id: "colorectal-screening",
          title: "Colorectal cancer: a national guideline of 2023 says screening will be provided in primary care",
          plain:
            "A national guideline issued in 2023 covers screening, diagnosis, treatment and follow-up of colorectal cancer, and says the screening service will be provided at primary care level. OnCo found no statement that it is running. The steps of the screening pathway are in a diagram that OnCo could not read as text, so the starting age is not given here.",
          detail:
            "The National Guidelines for Colorectal Cancer Screening, Diagnosis, Management and Follow up, first edition, were released in April 2023 by the ministry's Directorate General of Specialized Medical Care and apply to all health institutions. They sort people into low risk (under 40 with no risk factors or family history), average risk and high risk at any age, which includes symptoms, a family or personal history, inflammatory bowel disease and previously removed polyps, and they list the tests in use, among them colonoscopy and the faecal immunochemical test. The guideline says colorectal cancer was the commonest cancer in Omani men and the third commonest in Omani women in the registry's 2019 data; that 968 cases were reported from 2015 to 2019, with age-standardised rates of 14.5 per 100,000 in men and 11.3 in women; and that in 2019 about 26% of cases were stage III and 23% stage IV.",
          links: [{ label: "Ministry of Health: National Guidelines for Colorectal Cancer Screening, Diagnosis, Management and Follow up, 2023 (PDF)", url: CRC_GUIDE }],
        },
        {
          id: "hpv",
          title: "HPV vaccination: the ministry gave 19 October 2025 as the start; WHO records 10% coverage for 2025",
          plain:
            "The ministry said on 25 September 2025 that vaccination against HPV would begin on 19 October 2025 and would be optional. Oman Observer had reported on 9 September that Grade 6 pupils aged 12 in public and private schools were already being vaccinated. WHO's data for 2025 record first-dose coverage of 10% for girls and 10% for boys. Earlier years have no figure.",
          detail:
            "The ministry's Arabic news item of 25 September 2025 reports a scientific seminar on the HPV vaccination programme held that day by its Centre for Disease Control and Prevention, and ends by saying the ministry will begin vaccinating against HPV in Oman, optionally, on 19 October 2025. It does not name the school grade. The target group comes from Oman Observer, which reported on 9 September 2025 that the ministry had begun administering the vaccine to Grade 6 students aged 12 in public and private schools after adding it to the national school immunisation programme, and on 13 September that the centre would officially launch the vaccine on 25 September for the 2025/2026 academic year. The newspaper's report of 9 September that vaccination had begun does not agree with the later start date in the ministry's own item. WHO's immunisation data API gives, for 2025, programme coverage with a first dose of 10% among girls (4,041 doses against a target of 41,345) and 10% among boys (4,214 against 43,120), and 10% for the last dose in each sex with no doses or target stated. The rows for 2021 to 2024 are empty. WHO's 2020 profile gave no figure for HPV vaccination programme coverage (marked n/a, for 2018). The ministry's press statement for a media briefing, in a file dated 22 February 2026, lists the inclusion of the HPV vaccine in the preventive health system. On the ministry's date the programme began in October, so the 2025 figure is not a measure of the programme at full pace.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Oman (API)", url: WHO_HPV_API },
            { label: "Ministry of Health: seminar on the HPV vaccination programme in Oman (25 September 2025, in Arabic)", url: HPV_SEMINAR_2025 },
            { label: "Oman Observer: MoH launches HPV vaccination campaign for school students (9 September 2025)", url: OBS_HPV_1 },
            { label: "Oman Observer: Oman to launch HPV vaccine programme (13 September 2025)", url: OBS_HPV_2 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Oman is doing",
      aside: { label: "Ministry of Health: Royal Hospital", url: ROYAL },
      cards: [
        {
          id: "noc",
          title: "The National Oncology Centre at the Royal Hospital, Muscat",
          plain:
            "The Ministry of Health's cancer centre is a block of the Royal Hospital in Muscat. The ministry's page, which is undated, lists outpatient clinics, day chemotherapy for adults and children, radiotherapy, nuclear medicine and adult and children's cancer wards. Patients are referred to it from across the country.",
          detail:
            "The ministry's page for the Royal Hospital says the hospital is owned and administered by the ministry, was commissioned in 1987 and provides facilities for 630 in-patients. It describes the National Oncology Centre as an extension block comprising an outpatient department, daycare chemotherapy areas for adults and children, a radiotherapy section, a cytotoxics preparation area, nuclear medicine, adult and paediatric oncology wards, a general purpose daycare ward and an intensive care and high dependency ward. The registry's 2021 report says the centre was established in November 2004, calls the Royal Hospital the largest tertiary centre for diagnosis and treatment of cancer, and says most cancer cases are referred to the centre in Muscat. The hospital page is undated and some of its text describes buildings as still under construction, so parts of it may be old.",
          links: [
            { label: "Ministry of Health: Royal Hospital", url: ROYAL },
            { label: "Ministry of Health: Cancer Incidence in Oman 2021, registry methods (PDF)", url: CI_2021 },
          ],
        },
        {
          id: "sqcccrc",
          title: "The Sultan Qaboos Comprehensive Cancer Care and Research Centre at the University Medical City",
          plain:
            "A second cancer centre in Muscat is the Sultan Qaboos Comprehensive Cancer Care and Research Centre, part of the University Medical City. It has a radiotherapy department and is the named Omani site for two international breast cancer trials. OnCo could not open the centre's own website.",
          detail:
            "The Oman News Agency reported on 9 July 2025 that the centre, at the University Medical City, had received recognition for excellence in supportive cancer care from the Multinational Association of Supportive Care in Cancer, which the agency described as a first in the Middle East and as placing it among 20 institutions worldwide. Oman Observer reported on 28 December 2025 that the centre's radiotherapy department had passed the IAEA's radiation dose audit, with all measurements inside the accepted range of plus or minus 5% and a maximum deviation of 2.3%. ClinicalTrials.gov lists the centre as the Muscat site for two Roche phase 3 trials in breast cancer. The centre's site at cccrc.gov.om did not complete a secure connection on 16 November 2026, so its services, bed numbers and opening date are not stated here.",
          links: [
            { label: "Oman News Agency: recognition for supportive cancer care (9 July 2025)", url: ONA_MASCC },
            { label: "Oman Observer: radiotherapy dose audit at the centre (28 December 2025)", url: OBS_AUDIT },
            { label: "ClinicalTrials.gov: NCT05894239", url: "https://clinicaltrials.gov/study/NCT05894239" },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: two centres and seven megavoltage machines in the IAEA's directory",
          plain:
            "The IAEA's directory of radiotherapy centres lists two centres in Oman with seven megavoltage treatment machines between them, in an entry last updated in 2025. Both centres OnCo knows of are in Muscat. A ministry press statement dated February 2026 says radiotherapy machines were updated in 2025.",
          detail:
            "The IAEA's DIRAC country row for Oman, read on 16 November 2026 and marked as last updated in 2025, gives RTCenters as 2, HePhotonAndElectronBeamRt (megavoltage photon and electron beam units) as 7 and BrachyTherapyIncEl as 1. Seven machines for IARC's 2024 population of 5.28 million is about 1.3 per million people by OnCo's own sum. The row does not say which machines are at which centre. The ministry's Arabic press statement for a media briefing, in a file dated 22 February 2026, lists, among changes at referral hospitals in 2025, the updating of radiotherapy machines with session time reduced by 35%; it does not name the hospital. WHO's 2020 profile recorded three services (surgery, radiotherapy and chemotherapy) as available in 2019. OnCo found no ministry page listing radiotherapy machines or waiting times for radiotherapy.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Ministry of Health: press statement for a media briefing, file dated 22 February 2026 (PDF, in Arabic)", url: BRIEFING_2026 },
            { label: "WHO: Cancer Country Profile 2020, Oman (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "services-2025",
          title: "What the ministry reported for 2025: more day care and a shorter wait for chemotherapy",
          plain:
            "The ministry said that in 2025 day care for cancer patients let 250 more patients a month be treated without a hospital stay, and that the waiting list for chemotherapy fell from 4 weeks to 10 days. These are the ministry's own figures from a press statement.",
          detail:
            "The ministry's Arabic press statement for a media briefing, in a file dated 22 February 2026, lists, under changes at referral hospitals in 2025: advanced genetic testing by next-generation sequencing; day care for oncology patients, allowing 250 additional patients a month to be treated without admission; and the updating of radiotherapy machines. Under waiting times it gives chemotherapy as falling from 4 weeks to 10 days, which it calls a 60% improvement. The statement does not say which hospitals the figures cover or how the waits were measured. The file's Arabic text layer drops some letters, so OnCo used only these lines, where the numbers and wording were clear.",
          links: [{ label: "Ministry of Health: press statement for a media briefing, file dated 22 February 2026 (PDF, in Arabic)", url: BRIEFING_2026 }],
        },
        {
          id: "plan",
          title: "Cancer sits inside a non-communicable disease policy; no stand-alone cancer plan was found",
          plain:
            "OnCo found no national cancer control plan for Oman. Oman Observer reported in February 2018 that the ministry had launched a national policy on non-communicable diseases covering four diseases, cancer among them, which aimed to cut early deaths from them by 25% by 2025. Separate national guidelines cover breast and colorectal cancer.",
          detail:
            "WHO's 2020 cancer profile, with data for 2019, records an operational integrated non-communicable disease plan, gives no entry for a national cancer control plan, and records cancer management guidelines as present. Oman Observer reported on 6 February 2018 that the ministry had launched the national policy for the prevention of chronic non-communicable diseases, aiming to reduce premature deaths by 25% by 2025 with a focus on heart disease, cancer, respiratory diseases and diabetes; OnCo did not find the policy document itself or a report on whether the target was met. The IAEA carried out an imPACT review of Oman's cancer control capacity on 26 to 30 January 2013 at the ministry's request, visiting the Royal Hospital, Sultan Qaboos University Hospital and the regional hospital in Salalah among other sites; its recommendations are not public in the note OnCo read. In November 2025 a meeting in Muscat that Times of Oman calls the World Cancer Congress, Summit, and Exhibition 2025 adopted a call to action named the Sultanate of Oman Declaration, which Times of Oman describes as urging governments to act within national cancer control strategies. The National Health Policy 2025 does not mention cancer.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Oman (PDF)", url: WHO_PROFILE },
            { label: "Oman Observer: national plan launched for non-communicable diseases (6 February 2018)", url: OBS_NCD_2018 },
            { label: "IAEA: imPACT review, Oman, January 2013 (PDF)", url: IMPACT_2013 },
            { label: "Times of Oman: the Sultanate of Oman Declaration (6 November 2025)", url: TOO_DECLARATION },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Oman (search)", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "Three trials in OnCo's records list a site in Oman, all phase 3 and company-sponsored",
          plain:
            "Three trials in OnCo's records include a hospital in Oman: two in breast cancer and one in chronic myeloid leukaemia. One was recruiting when the registry was last read. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov data in OnCo's graph and checked against the registry's API on 16 November 2026. NCT05894239, sponsored by Hoffmann-La Roche, tests inavolisib with Phesgo in PIK3CA-mutated HER2-positive advanced breast cancer and is recruiting, with the Sultan Qaboos Comprehensive Cancer Care and Research Centre in Muscat listed as a recruiting site. NCT05296798, also Roche, tests giredestrant with Phesgo and is active but no longer recruiting, with the same centre as its Omani site. NCT05456191, sponsored by Novartis, compares asciminib with nilotinib in newly diagnosed chronic myeloid leukaemia and is active but no longer recruiting; the registry names its Omani site as a Novartis investigative site in Khoudh without naming the hospital. The registry's own search will show studies OnCo does not hold.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Oman (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT05894239", url: "https://clinicaltrials.gov/study/NCT05894239" },
            { label: "ClinicalTrials.gov: NCT05296798", url: "https://clinicaltrials.gov/study/NCT05296798" },
            { label: "ClinicalTrials.gov: NCT05456191", url: "https://clinicaltrials.gov/study/NCT05456191" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources that could not be read",
      plain:
        "OnCo could not open the cancer centre's website, and one IAEA page and one book chapter refused a script. The Oman Cancer Association's website failed at first and loaded later the same day; nothing from it is used here yet. What those sources say about services, beds and patient support is missing from this page.",
      detail:
        "On 16 November 2026: cccrc.gov.om failed to complete a secure connection and gave no answer over plain HTTP; no site for the University Medical City was found. oca.om returned a 502 server error twice when the page was written, and the Internet Archive copy of 21 March 2025 held little text; on the second accuracy pass later the same day its home page loaded, but its content has not been read into this page. The IAEA's page 'Sultanate of Oman Faces the Growing Cancer Burden' returned 403 on both attempts; the IAEA's PDF note on the same mission was read instead. The open-access chapter 'General Oncology Care in Oman' (Cancer in the Arab World, 2022) answered with a browser challenge page and was not read. A 2022 paper on the launch of the Sultan Qaboos centre has no abstract and its full text could not be fetched. The Drug Safety Center's circular no. 17 of 2024 is a scanned image with no text.",
      links: [
        { label: "Sultan Qaboos Comprehensive Cancer Care and Research Centre (site did not load)", url: "https://cccrc.gov.om" },
        { label: "Oman Cancer Association (home page loaded on the second attempt; not yet used)", url: "https://oca.om" },
        { label: "General Oncology Care in Oman, Cancer in the Arab World, 2022 (not read)", url: "https://doi.org/10.1007/978-981-16-7945-2_12" },
      ],
    },
    {
      id: "gap-deaths-survival",
      title: "Deaths are modelled, the registry stops at 2021, and survival figures were not read",
      plain:
        "Oman's registry report counts new cancers. Its only figure for deaths is for Ministry of Health hospitals. IARC's death figure is a model built from incidence. The latest registry year is 2021, published in 2025. OnCo has not read survival figures by cancer for Oman.",
      detail:
        "IARC's fact sheet gives the mortality method as national incidence estimates applied to modelled mortality-to-incidence ratios, and names Survcan, IARC's registry survival project, as the source behind them; OnCo did not read Survcan's figures for Oman. The 2021 registry report closes with a chart, credited to the ministry's Annual Health Report 2021, of the commonest causes of death in Ministry of Health hospitals, in which neoplasms account for 379 deaths; that covers the ministry's hospitals only and is not a national count. WHO's 2020 profile rated the quality of mortality registration for 2007 to 2016 as very low and noted that its mortality estimates were not based on national mortality data. The 2021 report gives stage at diagnosis only in charts whose labels could not be matched to values in the text, so stage shares for 2021 are not given here. Reports for 2022 onward were not on the ministry's list.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Oman (PDF)", url: GCO_FACT },
        { label: "WHO: Cancer Country Profile 2020, Oman (PDF)", url: WHO_PROFILE },
        { label: "Ministry of Health: all cancer incidence reports", url: MOH_REPORTS },
      ],
    },
    {
      id: "gap-paying",
      title: "Not found: who is entitled to what, the insurance rules for expatriates, and the list of cancer medicines bought",
      plain:
        "OnCo did not find an official page setting out which residents get cancer care without charge, what expatriates' insurance must cover for cancer, or which cancer medicines public hospitals stock. More than a third of residents were not Omani nationals in the registry report's 2021 population figures.",
      detail:
        "WHO's strategy document describes public services as nearly free at the point of delivery and available at all levels for Omanis, and compulsory insurance for expatriates as being introduced when it was written in 2021; the law or regulation, its start date and its cancer benefits were not read. The ministry's site search for 'insurance' returned one news item from 2015. The fee exemption at the National Oncology Centre is from a 2018 news item. No formulary or procurement list for cancer medicines was found on the ministry's site, and the Drug Safety Center's register of approved products was not located.",
      links: [
        { label: "WHO: Country Cooperation Strategy for WHO and Oman 2021 to 2025 (PDF)", url: WHO_CCS },
        { label: "Ministry of Health: Drug Safety Center", url: DSC },
      ],
    },
    {
      id: "gap-screening",
      title: "Not found: how many people are screened, and whether cervical screening is now a programme",
      plain:
        "The guidelines say who should be screened, but OnCo found no published count of women who have had a mammogram, no results from the 2023 HPV study, and no statement that cervical or colorectal screening now runs as a national programme with invitations.",
      detail:
        "The breast guideline describes women attending by self-referral or referral from other clinics and gives no participation figure. The colorectal guideline's screening pathway and its appendix on when to use the faecal immunochemical test are images. WHO's record of no cervical screening programme dates from 2019. The ministry's English site search for HPV returned four circulars recalling HPV test kits and no page on the vaccine programme. Its Arabic site does carry pages on the vaccine, among them the news item of 25 September 2025 that gives the start date; that item does not name the school grade, so the target group is taken from newspaper reports. WHO's coverage rows for 2025 give no doses or target for the last dose.",
      links: [
        { label: "Ministry of Health: breast screening guideline, second edition 2025 (PDF)", url: BREAST_GUIDE },
        { label: "Ministry of Health: colorectal cancer guideline, 2023 (PDF)", url: CRC_GUIDE },
        { label: "WHO immunisation data: HPV programme coverage, Oman (API)", url: WHO_HPV_API },
        { label: "Ministry of Health: seminar on the HPV vaccination programme in Oman (25 September 2025, in Arabic)", url: HPV_SEMINAR_2025 },
      ],
    },
  ],
  institutions: ["moh-oman", "oman-national-cancer-registry", "drug-safety-center-oman", "royal-hospital-national-oncology-centre-oman", "sultan-qaboos-cccrc", "oman-cancer-association"],
  companies: [],
  drugs: [],
  trials: ["nct05894239", "nct05296798", "nct05456191"],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the Ministry of Health's registry report for 2021, its guidelines, its pages for the Drug Safety Center, the Royal Hospital and medical supplies, its National Health Policy 2025 and its news items; WHO's cooperation strategy and 2020 cancer profile; the IAEA's directory and review note; WHO's immunisation data; the World Bank; ClinicalTrials.gov; IARC's GLOBOCAN 2024 fact sheet; and dated news reports where no official page could be found. One ministry press statement and one ministry news item were read in Arabic. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "Registry counts for recent years are revised upward as late reports arrive, and the latest year is 2021. Several statements about services come from news items of 2016 and 2018 and may have changed. Rules on fees and insurance differ for nationals and expatriates; ask the hospital or the ministry before relying on this page.",
  verifyLinks: [
    { label: "Ministry of Health: cancer incidence reports", url: MOH_REPORTS },
    { label: "Ministry of Health: Drug Safety Center", url: DSC },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Oman (PDF)", url: GCO_FACT },
  ],
};
