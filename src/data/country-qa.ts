import type { CountryDive } from "@/data/country-dive";

/**
 * Qatar deep dive: the hand-written cards for /countries/qa/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: the Ministry of Public Health's Qatar Cancer Plan 2023-2026
 * (PDF text, from the International Cancer Control Partnership's copy); the Qatar National Cancer Registry's Annual
 * Cancer Report 2020 (an Internet Archive copy of a scanned PDF, read by optical character recognition because the
 * registry's own server did not answer); the Ministry's National Cancer Framework 2017-2022 pages and PDF, its service
 * pages for medicine registration and the Qatar National Formulary; Hamad Medical Corporation's page for the National
 * Center for Cancer Care and Research and its Guide to Cancer Services in Qatar (PDF dated August 2020); the Primary
 * Health Care Corporation's breast, bowel and cervical screening pages; Qatar News Agency notices of April 2021, May
 * 2022, May 2025 and September 2026; the Government Communications Office's notice of 18 June 2023 (Internet Archive
 * copy); a Gulf Times report of 25 August 2025; IARC's "Impact in practice" note on Qatar (2026) and its GLOBOCAN 2024
 * fact sheet; the IAEA's DIRAC country row; WHO's HPV coverage rows from its public immunisation data API; and the
 * World Bank's health spending series. Where something could not be read it is named under `gaps`.
 */
const QCP = "https://www.iccp-portal.org/sites/default/files/plans/QATAR-CANCER-PLAN-2023-2026-EN-compressed.pdf";
const QNCR_2020 = "https://web.archive.org/web/20250402173855/https://qcic.moph.gov.qa/nas/documents/annual-report/QNCR-2020-English.pdf";
const NCF_PAGE = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/default.aspx";
const NCF_EARLY = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/Early-Detection.aspx";
const NCF_DATA = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/Measuring-Performance-and-Using-Data.aspx";
const NCF_TREATMENT = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/Treatment.aspx";
const NCF_RESEARCH = "https://www.moph.gov.qa/english/strategies/Supporting-Strategies-and-Frameworks/thenationalcancerFramework/Pages/Research.aspx";
const NCF_PDF = "https://www.moph.gov.qa/Style%20Library/MOPH/Files/strategies/National%20Cancer%20Framework%202017%20-%202022/National%20Cancer%20Framework%202017%20-%202022.pdf";
const MOPH_MAH = "https://www.moph.gov.qa/english/OurServices/advancedsearch/Pages/servicesdetails.aspx?serviceId=200";
const MOPH_QNF = "https://www.moph.gov.qa/english/OurServices/advancedsearch/Pages/servicesdetails.aspx?serviceId=234";
const MOPH_PDC = "https://www.moph.gov.qa/english/departments/policyaffairs/pdc/Pages/default.aspx";
const NCCCR_ABOUT = "https://www.hamad.qa/EN/Hospitals-and-services/NCCCR/About/Pages/default.aspx";
const HMC_GUIDE = "https://www.hamad.qa/EN/Hospitals-and-services/NCCCR/Cancer-Awareness/Documents/Guide-to-Cancer-Services-EN.pdf";
const PHCC_BREAST = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/breast-cancer-screening";
const PHCC_BOWEL = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/bowel-cancer-screening";
const PHCC_CERVICAL = "https://www.phcc.gov.qa/clinics-and-services/browse-by-category/screening-detection/cervical-cancer-screening";
const QNA_REGISTRY_2021 = "https://www.qna.org.qa/en/News-Area/News/2021-04/27/0053-qatar-national-cancer-registry-releases-cancer-incidence-rates-in-qatar";
const QNA_LAW_2022 = "https://www.qna.org.qa/en/News-Area/News/2022-05/18/0048-moph-law-regulating-health-services-will-improve-healthcare-in-public-and-private-sectors";
const QNA_VACCINES_2025 = "https://qna.org.qa/en/News-Area/News/2025-5/7/moph-continues-efforts-to-improve-vaccine-access-across-qatar";
const QNA_HPV_2026 = "https://qna.org.qa/en/News-Area/News/2026-9/13/moph-announces-inclusion-of-hpv-vaccine-in-national-school-vaccination-campaign";
const GCO_LAUNCH = "https://web.archive.org/web/20250914000710/https://www.gco.gov.qa/en/media-centre/top-news/his-excellency-the-prime-minister-launches-the-qatar-cancer-plan-2023-2026/";
const GULF_TIMES_PRICES = "https://www.gulf-times.com/article/709465/qatar/moph-announces-price-reductions-for-1019-pharmaceutical-products-in-local-market";
const IARC_IMPACT = "https://www.iarc.who.int/wp-content/uploads/2026/04/IARC_impact_in_practice_Qatar.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/634-qatar-fact-sheet.pdf";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'QAT'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=QA";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=QA";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=QA";
const CTGOV = "https://clinicaltrials.gov/search?country=Qatar&cond=cancer";

export const QA_DIVE: CountryDive = {
  iso2: "QA",
  iso3: "QAT",
  name: "Qatar",
  flag: "🇶🇦",
  asOf: "2026-11-16",
  title: "Cancer in Qatar",
  description:
    "Cancer in Qatar from Qatari sources: a national registry at the Ministry of Public Health that recorded 2,042 new cancers in 2020, four in five of them in people who are not Qatari nationals; IARC's estimate of 3,326 cases and 1,460 deaths in 2024; one public cancer hospital in Doha; screening for breast and bowel cancer since 2016; and an HPV vaccine that the Ministry announced for schools in September 2026.",
  lede:
    "Qatar has a national cancer registry, a national cancer plan for 2023 to 2026 and one public cancer hospital, the National Center for Cancer Care and Research in Doha. The registry counts residents of every nationality: 81% of the cancers it recorded in 2020 were in non-Qataris. Government pays for most health spending, and the Ministry of Public Health registers and prices medicines.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Qatar is 3,326 new cancers and 1,460 deaths, an age-standardised incidence of 157.4 per 100,000 (154.0 in men, 179.0 in women) and mortality of 79.3 (83.6 in men, 75.1 in women), with 10,438 people alive within five years of a diagnosis. IARC's fact sheet names a national registry as its source for incidence, with national rates applied to the 2024 population. For deaths it did not use death certificates: it names SurvCan and says national incidence estimates were applied to modelled mortality-to-incidence ratios built from registry survival data, so the 1,460 deaths are a model result. The registry's own count in the latest report OnCo could read is lower and older, 2,042 new cancers in 2020, a year in which it says diagnoses fell by 19% because of the pandemic. IARC's fact sheet uses a population of 3,048,428 for 2024, of whom 2,172,939 are male; the registry used 2,833,679 for 2020.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Qatar",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Qatar (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 3,300 new cancers a year by IARC's estimate; breast and bowel cancer lead",
          plain:
            "IARC estimates 3,326 new cancers and 1,460 cancer deaths in Qatar in 2024. Breast cancer is the commonest, then bowel, lung and prostate cancer. Lung cancer causes the most deaths. Men are about seven in ten of the population, so most cancers are in men, although the rate is higher in women.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 440 breast cancers (116 deaths), 415 colorectal cancers (180 deaths), 223 lung cancers (201 deaths), 204 prostate cancers (56 deaths) and 189 non-Hodgkin lymphomas (66 deaths). Among men, 2,189 cancers were estimated, led by colorectal (309), prostate (204) and lung (200); among women, 1,137, led by breast (440, or 38.7% of cancers in women), thyroid (112) and colorectal (106). The age-standardised incidence rate is 154.0 per 100,000 in men and 179.0 in women. The fact sheet's population is 2,172,939 males and 875,493 females. Brain and central nervous system tumours rank third for deaths (145) and Hodgkin lymphoma eighth for new cases (167).",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Qatar (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "registry",
          title: "A national registry at the Ministry of Public Health; the latest report OnCo could read is for 2020",
          plain:
            "The Qatar National Cancer Registry sits in the Ministry of Public Health and counts cancers in everyone resident in Qatar. Its report for 2020 recorded 2,042 new cancers: 19% in Qatari nationals and 81% in non-Qataris. It says the 2020 count was 19% lower than the year before because of the pandemic.",
          detail:
            "The registry's Annual Cancer Report 2020 (printed in 2023, with the database closed in March 2022) records 2,042 new cases in a population of 2,833,679: 1,648 in non-Qataris (679 female, 969 male) and 394 in Qataris (238 female, 156 male). The crude rate was 72.06 per 100,000 and the age-standardised rate 152.28; 94.17% of cases were confirmed under the microscope, 32.86% were localised and 29.14% had spread to distant sites at diagnosis. It counted 84 new cancers in people aged 0 to 18. On who is counted, its appendix says the count 'covers all cases diagnosed with cancer in the State of Qatar' apart from people classified as visitors, and it mentions Qatari cases diagnosed abroad in wording that can be read as either counting them or leaving them out. The report records 507 deaths among cancer patients in 2020 (350 non-Qatari, 157 Qatari) and says the reporting of causes of death is still being improved, which makes a mortality-to-incidence ratio difficult to produce. The death rate it gives is for Qataris alone: 77.55 per 100,000, age-standardised. The Qatar Cancer Plan prints slightly different 2020 totals (2,024 cases, rate 150.67); neither document explains the difference. For 2018 the registry announced 1,960 new cases. The plan says the Qatar Cancer Information Center holds three registries: the cancer registry, a screening registry and a waiting times registry.",
          links: [
            { label: "Qatar National Cancer Registry: Annual Cancer Report 2020 (PDF, Internet Archive copy)", url: QNCR_2020 },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
            { label: "Qatar News Agency: registry releases 2018 figures (27 April 2021)", url: QNA_REGISTRY_2021 },
          ],
        },
        {
          id: "iarc-link",
          title: "IARC built its estimate from Qatar's registry, and Qatar sent data to SurvCan",
          plain:
            "IARC's estimate of new cancers in Qatar rests on the national registry. Its estimate of deaths is modelled from survival data the registry supplied, not counted from death certificates. Qatar has been a Participating State of IARC since 2013.",
          detail:
            "IARC's fact sheet gives the incidence source as 'Registry (national)' with the method 'National rates applied to 2024 population', and the mortality source as 'Survcan' with the method 'National incidence estimates applied to model-based M:I ratios (registry survival data)'. IARC's 2026 note on Qatar says Qatar became a Participating State in 2013, the first in the Gulf region, that an IARC country visit reviewed the registry's case identification, notification pathways and data management, that its recommendations were taken into account in the revision of the national cancer notification policy, and that Qatar successfully submitted national data to SurvCan 4. The same note quotes GLOBOCAN 2022 figures of around 1,733 new cases and 782 deaths a year, about half of the 2024 estimate. OnCo has not compared the methods of the two editions, so the two figures should not be read as a trend.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Qatar (PDF)", url: IARC_FACTSHEET },
            { label: "IARC: Impact in practice, the Qatar experience (PDF, 2026)", url: IARC_IMPACT },
          ],
        },
      ],
      tables: [
        {
          id: "qa-registry-2020",
          title: "Most common cancers newly diagnosed in Qatar in 2020, Qatar National Cancer Registry",
          caption: "Number of new cases by primary site in 2020, all nationalities and both sexes, and the share of all cases, as printed in Table 2 of the Qatar Cancer Plan 2023-2026.",
          columns: [
            { key: "site", label: "Primary site" },
            { key: "n", label: "New cases, 2020", numeric: true },
            { key: "pct", label: "Share of all cases (%)", numeric: true },
          ],
          rows: [
            { site: "Breast", n: 326, pct: 16.1 },
            { site: "Colorectal", n: 182, pct: 9.0 },
            { site: "Thyroid gland", n: 165, pct: 8.2 },
            { site: "Leukaemia", n: 139, pct: 6.9 },
            { site: "Prostate", n: 83, pct: 4.1 },
            { site: "Trachea, bronchus and lung", n: 80, pct: 4.0 },
            { site: "Brain and central nervous system", n: 79, pct: 3.9 },
            { site: "Non-Hodgkin lymphoma", n: 79, pct: 3.9 },
            { site: "Non-melanoma skin cancer", n: 73, pct: 3.6 },
            { site: "Liver and intrahepatic bile ducts", n: 71, pct: 3.5 },
          ],
          note: "Counts of new cases, not deaths. The plan gives the 2020 total as 2,024; the registry's annual report for 2020 gives 2,042, with breast at 15.96% and colorectal at 8.91%, which match the same counts. The registry says 2020 was lowered by the pandemic, when screening was put on hold. These are counts in a population of about 2.8 million and cannot be compared directly with IARC's 2024 estimates.",
          sources: [
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, Table 2 (PDF, ICCP copy)", url: QCP },
            { label: "Qatar National Cancer Registry: Annual Cancer Report 2020 (PDF, Internet Archive copy)", url: QNCR_2020 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: a publicly funded system, with different terms for citizens and residents",
      aside: { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Qatar", url: WB_OOP },
      cards: [
        {
          id: "who-pays",
          title: "Government pays for about 83% of health spending; people pay about 7% out of pocket",
          plain:
            "Government paid for 83% of Qatar's health spending in 2023, and people paid 7.4% from their own pockets. Those are figures for all health care, not cancer alone. Health spending was about US$1,804 a person.",
          detail:
            "The World Bank's series, drawn from WHO's Global Health Expenditure Database, puts out-of-pocket spending at 6.4% of current health expenditure in 2019, 5.9% in 2020, 6.6% in 2021, 7.7% in 2022 and 7.4% in 2023. Domestic general government health expenditure was 83.0% of current health expenditure in 2023 (85.5% in 2019). Current health expenditure was US$1,804 a person in 2023 and 2.5% of gross domestic product. The series does not separate cancer care, and it does not separate citizens from other residents.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Qatar", url: WB_OOP },
            { label: "World Bank: government health expenditure, % of current health expenditure, Qatar", url: WB_GOV },
            { label: "World Bank: current health expenditure per person, US$, Qatar", url: WB_PC },
          ],
        },
        {
          id: "health-card",
          title: "A health card opens public care; without it, fees are higher",
          plain:
            "Public cancer care runs through Hamad Medical Corporation and the Primary Health Care Corporation. A guide published by Hamad Medical Corporation in 2020 says residents with a Qatar ID and a health card get heavily subsidised consultations and prescriptions, and that breast and bowel screening is free for people who hold both.",
          detail:
            "Hamad Medical Corporation's Guide to Cancer Services in Qatar, a PDF whose file date is 12 August 2020, says any citizen or resident must apply for a health card to use health care facilities, that the card cost QR 50 for a Qatari citizen and QR 100 for a resident, that Primary Health Care Corporation services are free for Qatari citizens and at 'very low and affordable cost' for residents with a valid card, that at Hamad Medical Corporation 'Without these documents, patients will be charged a higher fee for services', and that emergency medical services are free. It says Sidra Medicine makes 'minimal charges for outpatient visits and overnight stays', and that the Qatar Cancer Society, a charity, covers costs of cancer treatment for patients through an internal policy. The guide is six years old and OnCo did not find a current fee schedule for cancer treatment; see the gaps.",
          links: [{ label: "Hamad Medical Corporation: Guide to Cancer Services in Qatar (PDF, August 2020)", url: HMC_GUIDE }],
        },
        {
          id: "insurance-law",
          title: "In 2022 the Ministry said a 2021 law would make health insurance mandatory for residents and visitors, in phases",
          plain:
            "Law No. 22 of 2021 regulates health services in Qatar and came into effect in May 2022. The Ministry of Public Health said that month that it makes health insurance mandatory for all residents and visitors, and that it would be brought in by phases, starting with visitors. OnCo could not confirm whether the first phase began or how far the later phases have gone.",
          detail:
            "A Qatar News Agency notice of 18 May 2022 reports the Ministry of Public Health as saying that the law 'came into effect this month', that 'all residents and visitors must have health insurance through the insurance companies registered by the Ministry of Public Health to provide them with basic health services', and that it 'will follow a phased approach; with the first phase focusing on visitors'. The Ministry's site lists a Health Financing and Insurance Department and services for health insurance registration, insurance brokers and third-party administrators, but the department's page returned no text to a plain request. OnCo did not read the text of the law or its executive regulations, and found no primary statement of what the mandatory package covers for cancer treatment.",
          links: [
            { label: "Qatar News Agency: Ministry of Public Health on Law No. 22 of 2021 (18 May 2022)", url: QNA_LAW_2022 },
            { label: "Ministry of Public Health: business services, including health insurance registration", url: "https://www.moph.gov.qa/english/OurServices/Companies/Pages/default.aspx" },
          ],
        },
        {
          id: "treatment-abroad",
          title: "Qatar pays for some patients to be treated abroad, and its cancer plan wants fewer to need it",
          plain:
            "Qatar funds some cancer patients to seek care in other countries; its cancer plan describes this as support for citizens. The Qatar Cancer Plan says most of them could be treated as well at home, and that a small number of rare and complex cases will always need a centre abroad.",
          detail:
            "The Qatar Cancer Plan 2023-2026 says 'Qatar continues to fund cancer patients to seek care abroad', refers to 'the remarkable support the country provides to its citizens to seek healthcare abroad', and says that 'the significant majority of cancer patients could be better treated in Qatar', and that treatment abroad 'represents a significant cost to Qatar'. It also says 'There will always be a number of complex cases and rare tumors diagnosed that will require treatment abroad in high volume centers', proposes partnerships and contracts with specific centres in the USA, Europe and Asia, and names Hamad Medical Corporation's partnership with Heidelberg University Hospitals for rare cancers. The earlier National Cancer Framework says every application for treatment overseas passes through two layers of clinical decision making. Neither document gives the number of patients sent abroad or the cost.",
          links: [
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, chapter 3 (PDF, ICCP copy)", url: QCP },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022 (PDF)", url: NCF_PDF },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: a department of the Ministry registers and prices medicines",
      aside: { label: "Ministry of Public Health: Pharmacy and Drug Control Department", url: MOPH_PDC },
      cards: [
        {
          id: "approval",
          title: "The Pharmacy and Drug Control Department registers medicines and sets their prices",
          plain:
            "Medicines are regulated inside the Ministry of Public Health, by its Pharmacy and Drug Control Department. Its Registration and Drug Pricing Section registers the companies that hold marketing authorisations, and the department's director was reported in August 2025 as saying that a price is set when a medicine is registered. A company applies through an agent.",
          detail:
            "The Ministry's service page for 'Registration of Marketing Authorization Holder for pharmaceutical products' says the service is provided by the Drug Registration and Pricing Section of the Department of Pharmacy and Drug Control, that the applicant must first be registered as an agent, that the documents include a legalised contract between the company and the agent and a list of products with generic and trade names, and that requests are submitted on the department's online e-system. A Qatar News Agency report carried by the Gulf Times on 25 August 2025, on a Ministry announcement, says in its own words, not as a direct quotation, that the department's director explained that medicine prices 'are determined at the time of registration in the local market based on approved pricing regulations, taking into account the manufacturing cost in the country of origin, approved reference prices, and the prices of available alternatives in the local market'; the announcement cut the prices of 1,019 products by 15% to 75%, cancer treatments among the groups named. OnCo could not read the department's own pages on registration requirements, timelines or reliance on other regulators; see the gaps.",
          links: [
            { label: "Ministry of Public Health: registration of marketing authorisation holder (service page)", url: MOPH_MAH },
            { label: "Gulf Times: Ministry announces price reductions for 1,019 pharmaceutical products (25 August 2025)", url: GULF_TIMES_PRICES },
          ],
        },
        {
          id: "reimbursement",
          title: "No published list of covered cancer medicines was found; the national formulary records availability",
          plain:
            "OnCo found no public list of which cancer medicines Qatar's public system pays for, and no published health technology assessment process. The Ministry runs a Qatar National Formulary that records which medicines are available, and public cancer treatment is given by Hamad Medical Corporation.",
          detail:
            "The Ministry describes the Qatar National Formulary as 'a nationwide resource that provides information on a drug's availability (formulary status), patient education, as well as national prescribing and dispensing regulations and guidelines to all hospitals and physician practices in the state of Qatar'. The National Cancer Framework 2017-2022 gave Hamad Medical Corporation the task to 'Review end-to-end process for accessing new cancer drugs and develop rapid protocols as necessary', and, in its section on early detection, said the screening guidelines should be formally adopted and 'used as the basis for National Health Insurance reimbursement'. The Qatar Cancer Plan 2023-2026 says pharmacy services have been integrated with cancer services, 'ensuring ready access to a full range of advanced treatment protocols'. None of these sources says how a newly registered cancer medicine is assessed for public funding, how long that takes, or which medicines are on a hospital formulary.",
          links: [
            { label: "Ministry of Public Health: Qatar National Formulary (service page)", url: MOPH_QNF },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022, treatment", url: NCF_TREATMENT },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022, early detection", url: NCF_EARLY },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Primary Health Care Corporation: breast cancer screening", url: PHCC_BREAST },
      cards: [
        {
          id: "screening-programmes",
          title: "Breast and bowel screening by invitation since 2016; cervical screening on request",
          plain:
            "The Primary Health Care Corporation invites women aged 45 to 69 for a mammogram every three years, and men and women aged 50 to 74 for a bowel test every two years. Cervical screening is offered to women aged 21 to 69 through a doctor's referral or by calling 107, not by invitation.",
          detail:
            "The Primary Health Care Corporation's pages say breast screening is by mammogram for women aged 45 to 69 with no symptoms, and bowel screening is a faecal immunochemical test (FIT) kit for registered people aged 50 to 74; people come by invitation from the screening call centre on 8001112, by physician referral or by calling that number themselves, and abnormal results are referred to Hamad Medical Corporation. Cervical screening is a Pap smear in Well Woman Clinics, followed by HPV testing based on the smear result, every three years from 21 to 49 and every five years from 50 to 69. The Qatar Cancer Plan says the population-based programmes began in 2016. The National Cancer Framework set an aim of 70% coverage and uptake. The plan's own table of yearly coverage and uptake could not be read reliably from the PDF text, so no uptake figure is given here. The plan commits to postal delivery of bowel tests and tele-radiology reading for breast screening by the end of 2024, a feasibility study of breast screening for the high-risk group aged 40 to 44 by early 2025, and studies of population screening for cervical, prostate, lung and thyroid cancer.",
          links: [
            { label: "Primary Health Care Corporation: breast cancer screening", url: PHCC_BREAST },
            { label: "Primary Health Care Corporation: bowel cancer screening", url: PHCC_BOWEL },
            { label: "Primary Health Care Corporation: cervical cancer screening", url: PHCC_CERVICAL },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, chapter 2 (PDF, ICCP copy)", url: QCP },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022, early detection", url: NCF_EARLY },
          ],
        },
        {
          id: "hpv",
          title: "A school HPV vaccination campaign was announced in September 2026; earlier coverage was in single figures",
          plain:
            "WHO's figures show 7% of girls and 2% of boys in the target group received a first HPV dose in 2025. On 13 September 2026 the Ministry of Public Health announced that the vaccine was being added to the national school vaccination campaign, starting with Grade 9 pupils from 20 September. It is optional and needs a parent's consent. OnCo has not seen a report of how many pupils have been vaccinated.",
          detail:
            "WHO's immunisation data for Qatar have no HPV programme coverage for 2021 to 2023. For 2024 they give first-dose coverage of 4% in females (455 doses for a target of 12,759) and 1% in males (178 of 13,143), and for 2025, 7% in females (878 of 12,841) and 2% in males (350 of 14,413); last-dose coverage was 1% in females in both years. A Qatar News Agency notice of May 2025 lists the HPV vaccine for adolescents among vaccines added to the national schedule in recent years. Its notice of 13 September 2026 reports that the Ministry, with the Ministry of Education and Higher Education and the Primary Health Care Corporation, announced the inclusion of the vaccine in the National School Vaccination Campaign, which covers 301 government and private schools. The schedule it gave, written before the campaign began, was a first dose for Grade 9 pupils from 20 September to 18 November 2026, then a first dose for Grade 8 and a second dose for Grade 9 from 25 April to 16 May 2027. The notice says the campaign as a whole, which also gives a tetanus, diphtheria and pertussis booster, targets more than 75,000 male and female students in Grades 8 to 10. The Qatar Cancer Plan had set the deliverable 'Establish a National HPV vaccination program by Q4 2026'. Coverage from the school campaign is not yet in WHO's data.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Qatar (data API)", url: WHO_HPV_API },
            { label: "Qatar News Agency: HPV vaccine included in the National School Vaccination Campaign (13 September 2026)", url: QNA_HPV_2026 },
            { label: "Qatar News Agency: vaccines in the national immunisation schedule (7 May 2025)", url: QNA_VACCINES_2025 },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, deliverable 1.2.D (PDF, ICCP copy)", url: QCP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Qatar does differently",
      cards: [
        {
          id: "plan",
          title: "Three national cancer plans since 2011; the current one has 87 dated deliverables",
          plain:
            "Qatar published a National Cancer Strategy in 2011, a National Cancer Framework for 2017 to 2022, and the Qatar Cancer Plan 2023-2026, launched by the Prime Minister on 18 June 2023. The current plan lists 87 deliverables, each with a lead organisation and a quarter by which it is due.",
          detail:
            "The Ministry's framework page says the 2011 strategy made 62 recommendations, of which 36 had been fully implemented when it closed in 2016, and that the framework published in May 2017 had 9 domains, 61 guiding activities and 25 success measures. The Qatar Cancer Plan says its '87 Deliverables are organized under 23 Strategic Objectives across Seven chapters': prevention and public education, early detection and screening, quality treatment and ongoing care, holistic support, childhood cancers, surveillance and research, and strategic enablers. Its dated commitments include a national HPV vaccination programme by the fourth quarter of 2026, a hepatitis B vaccination campaign for manual and craft workers by the end of 2024, a refreshed business case for a new comprehensive cancer centre by the end of 2023, and a survivorship programme. The Government Communications Office's notice says the plan was prepared with the support of experts from the World Health Organization. The plan ends in 2026; OnCo found no published report on which deliverables were met, and no successor plan.",
          links: [
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022", url: NCF_PAGE },
            { label: "Government Communications Office: Prime Minister launches the Qatar Cancer Plan (18 June 2023, Internet Archive copy)", url: GCO_LAUNCH },
          ],
        },
        {
          id: "one-centre",
          title: "One public cancer hospital for adults, with children's cancer care at Sidra Medicine",
          plain:
            "Hamad Medical Corporation's National Center for Cancer Care and Research in Doha describes itself as the only dedicated cancer hospital in Qatar. It gives chemotherapy, radiotherapy, blood cancer care, bone marrow transplants and palliative care. Cancer surgery is done at Hamad General Hospital, and children are treated at Sidra Medicine.",
          detail:
            "The centre's own page calls it 'the premier and only dedicated cancer hospital in the State of Qatar' and says surgical oncology is delivered through its partner facility, Hamad General Hospital, that a hereditary and high-risk screening clinic has offered genetic counselling and testing since 2013, and that it has a 24-hour urgent care service for people with cancer. Under its heading on paediatric and young adult cancer services, the National Cancer Framework said that from 2018 Sidra would assume care for this group, and the Qatar Cancer Plan has a chapter on childhood cancers at Sidra Medicine. The plan says a 10-bed specialist palliative care unit opened at the centre in 2015 and a survivorship clinic in 2020, that an electronic referral system for suspected cancer went live in September 2021, and that all confirmed cancers are discussed at site-specific multidisciplinary team meetings. It also says the added bed capacity 'is already under pressure' and makes the case for a new comprehensive cancer centre.",
          links: [
            { label: "Hamad Medical Corporation: about the National Center for Cancer Care and Research", url: NCCCR_ABOUT },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, chapters 3 and 5 (PDF, ICCP copy)", url: QCP },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022 (PDF)", url: NCF_PDF },
          ],
        },
        {
          id: "waiting-standards",
          title: "National waiting time standards: seen within 48 hours, treated within 14 days of diagnosis",
          plain:
            "Qatar set national standards for how fast suspected cancer should move: seen at a specialist clinic within 48 hours of referral, a diagnosis within 14 days of being seen, and treatment within 14 days of diagnosis. A waiting times registry records performance, but OnCo found no published results.",
          detail:
            "The National Cancer Framework 2017-2022 prints the standards with their operational targets: suspected cancer referrals seen within 48 hours (80%), a definitive diagnosis within 14 days of being seen (95%), and treatment within 14 days of diagnosis (95%), citing the Ministry of Public Health in 2016. The Ministry's framework page lists among the achievements of the 2011 strategy an increase in the number of patients seen within 48 hours of referral and treated within 14 days of diagnosis, 14 specialty multidisciplinary team meetings, new roles of clinical nurse specialist and patient pathway coordinator, and 14 clinical management guidelines. The Qatar Cancer Plan says cancer waiting times are 'closely monitored' and that the Qatar Cancer Information Center holds a Cancer Waiting Times Registry. Neither document states what share of patients met each standard in any year.",
          links: [
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022 (PDF)", url: NCF_PDF },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022", url: NCF_PAGE },
            { label: "Ministry of Public Health: National Cancer Framework, measuring performance and using data", url: NCF_DATA },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy in one centre: the IAEA lists 6 megavoltage units",
          plain:
            "All radiotherapy in Qatar listed by the International Atomic Energy Agency is in one centre. Its directory row for Qatar shows 1 radiotherapy centre with 6 megavoltage treatment units and brachytherapy. A proton therapy unit is planned as part of a new cancer centre and is not yet open, as far as OnCo could read.",
          detail:
            "The IAEA's Directory of Radiotherapy Centres (DIRAC) country row for Qatar, read on 16 November 2026 with a last update of 2026, gives RTCenters 1, a field named HePhotonAndElectronBeamRt (high-energy photon and electron beam units) of 6, and BrachyTherapyIncEl of 1. Against IARC's 2024 population of about 3.05 million that is about 2 megavoltage units per million people; OnCo's arithmetic, not an IAEA figure. The National Center for Cancer Care and Research's page names its machines as an Ethos adaptive linear accelerator, which it calls the first of its kind in the Gulf Cooperation Council states, a CyberKnife, TrueBeam and Clinac iX linear accelerators, and high-dose-rate brachytherapy; it does not give a count of each. The Qatar Cancer Plan says proton therapy is 'planned for future delivery' and that the proposed comprehensive cancer centre 'will be equipped with the latest cancer treatment technologies including protonbeam therapy'.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Hamad Medical Corporation: about the National Center for Cancer Care and Research", url: NCCCR_ABOUT },
            { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026, chapter 3 (PDF, ICCP copy)", url: QCP },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Qatar", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "2 trials in OnCo's records list a site in Qatar, both phase 3",
          plain:
            "Two trials in OnCo's records include Qatar among their countries. One tests an immunotherapy combination in lung cancer and the other a targeted medicine for children with a slow-growing brain tumour. Neither was recruiting when the registry was last read. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: NEPTUNE (NCT02542293), AstraZeneca's phase 3 trial of durvalumab with tremelimumab against standard care as first treatment for metastatic non-small-cell lung cancer, and LOGGIC/FIREFLY-2 (NCT05566795), Day One Biopharmaceuticals' phase 3 trial of DAY101 against standard chemotherapy in children with low-grade glioma. ClinicalTrials.gov lists both as active and not recruiting. The Qatar Cancer Plan says people of the Arabian Peninsula 'remain underrepresented in multi-center studies, clinical trials, and international registries', says a dedicated core team is required for the clinical trials unit, and commits to a clinical trials awareness programme by early 2025. The National Cancer Framework before it called for a national clinical trials unit as 'a prerequisite to qualifying for international clinical trials'.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Qatar", url: CTGOV },
            { label: "NEPTUNE (NCT02542293)", url: "https://clinicaltrials.gov/study/NCT02542293" },
            { label: "LOGGIC/FIREFLY-2 (NCT05566795)", url: "https://clinicaltrials.gov/study/NCT05566795" },
            { label: "Ministry of Public Health: National Cancer Framework 2017-2022, research", url: NCF_RESEARCH },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry",
      title: "No registry report after 2020 could be read, and the registry's own site did not answer",
      plain:
        "The registry's website, qcic.moph.gov.qa, timed out on every request, so OnCo read an Internet Archive copy of its report for 2020. No report for 2021 or later was found in the archive. The 2020 report is a scanned document, so its text was read by character recognition and only figures that could be cross-checked are used.",
      detail:
        "Requests to qcic.moph.gov.qa for the annual reports for 2018 to 2021 and for its home page each timed out after 60 seconds on 16 November 2026. The Internet Archive index lists annual reports for 2014 to 2020 and none later. The 2020 report has no text layer; pages 1 to 41 and 83 to 86 were read by optical character recognition, and several tables did not survive it (basis of diagnosis, the age-specific rates, the ten-year trend of case counts, and the cancers causing most deaths among Qataris). The totals used on this page were checked against sums within the report and against the Qatar Cancer Plan. The pages read give a cancer death rate for Qataris alone, and the report says the reporting of causes of death is still being improved. The archive index is not proof that no later report exists: the registry may have published one that OnCo could not reach.",
      links: [
        { label: "Qatar National Cancer Registry: Annual Cancer Report 2020 (PDF, Internet Archive copy)", url: QNCR_2020 },
        { label: "Qatar Cancer Information Center", url: "https://qcic.moph.gov.qa/" },
      ],
    },
    {
      id: "gap-ministry-pages",
      title: "Ministry department pages returned no text, so the medicines and insurance rules are thin here",
      plain:
        "The Ministry of Public Health's pages for its Pharmacy and Drug Control Department, its Registration and Pricing section, its Health Financing and Insurance Department and its non-communicable disease programmes loaded with menus but no content. OnCo did not read the medicines law, the insurance law or the list of registered medicines.",
      detail:
        "On 16 November 2026 each of those department pages answered 200 with an empty content area; the text appears to be filled in by script. The Ministry's page titled National Cancer Control Framework showed placeholder table text. Not read: the text of Law No. 22 of 2021 and its executive regulations, any statement of what mandatory insurance covers for cancer, the registration requirements and timelines for a new medicine, whether Qatar relies on Gulf or other regulators' decisions, the registered medicines and price list, and the contents of the Qatar National Formulary. The pricing rule on this page comes from a news agency report of a Ministry announcement, printed by a newspaper in August 2025, not from the regulation.",
      links: [
        { label: "Ministry of Public Health: Pharmacy and Drug Control Department", url: MOPH_PDC },
        { label: "Ministry of Public Health: Health Financing and Insurance Department", url: "https://www.moph.gov.qa/english/departments/ministeroffice/hfid/Pages/default.aspx" },
      ],
    },
    {
      id: "gap-costs-uptake",
      title: "What a resident pays for cancer treatment, and how many people take up screening",
      plain:
        "OnCo found no current official statement of what a non-Qatari resident pays for chemotherapy, radiotherapy or surgery at the public cancer hospital. It also could not read screening uptake figures: the table in the Qatar Cancer Plan is garbled in the PDF text.",
      detail:
        "The latest primary source on charges is Hamad Medical Corporation's guide dated August 2020, which describes subsidised care for health card holders without giving treatment prices. OnCo found no Hamad Medical Corporation or Ministry page stating whether cancer treatment itself is free for residents. The screening programme's own site, screenforlife.phcc.gov.qa, timed out. The Qatar Cancer Plan's table of bowel and breast screening coverage and uptake by year is printed as two overlapping versions in the PDF text and could not be placed with confidence. No published results against the 48-hour and 14-day waiting standards were found, and no count of patients funded for treatment abroad.",
      links: [
        { label: "Hamad Medical Corporation: Guide to Cancer Services in Qatar (PDF, August 2020)", url: HMC_GUIDE },
        { label: "Ministry of Public Health: Qatar Cancer Plan 2023-2026 (PDF, ICCP copy)", url: QCP },
      ],
    },
    {
      id: "gap-other-sources",
      title: "Other sources that were blocked, empty or left unused",
      plain:
        "The Government Communications Office refused a plain request, so its 2023 notice was read from the Internet Archive. The Qatar Cancer Society's site returned a page with no text. WHO's 2020 cancer country profile was read but its figures are from 2018 and 2019 and are not used. The cancer plan's survival figures are left out.",
      detail:
        "gco.gov.qa answered 403; the Internet Archive copy of 14 September 2025 was read. The Ministry does not host the Qatar Cancer Plan at an address OnCo could reach, so the International Cancer Control Partnership's copy was read. qcs.qa/en/ returned only a title. A Union for International Cancer Control article on Qatar answered 406. WHO's cancer country profile for Qatar (2020) is superseded by the registry and the plan. The Qatar Cancer Plan states three-year and five-year survival rates by year of diagnosis up to 2020, and an incidence rate 'in Qataris' of 17.97 per 100,000 in 2019; the plan does not say how either was calculated, so OnCo has not repeated them as findings. The DIRAC row's detailed fields (linear accelerators, brachytherapy sources) are zero at country level, so machines are not broken down by type. No current role holder was confirmed from a primary source, so no people were added.",
      links: [
        { label: "Government Communications Office: Qatar Cancer Plan launch (Internet Archive copy)", url: GCO_LAUNCH },
        { label: "WHO: cancer country profile, Qatar (2020, PDF)", url: "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/qat.pdf" },
        { label: "Qatar Cancer Society", url: "https://www.qcs.qa/en/" },
      ],
    },
  ],
  institutions: ["moph-qatar", "qatar-national-cancer-registry", "hamad-medical-corporation", "phcc-qatar", "sidra-medicine", "qatar-cancer-society"],
  companies: [],
  drugs: [],
  trials: ["nct02542293", "nct05566795"],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the Ministry of Public Health's Qatar Cancer Plan 2023-2026 and National Cancer Framework 2017-2022, the Qatar National Cancer Registry's report for 2020 (an archived scan, read by character recognition), Hamad Medical Corporation's and the Primary Health Care Corporation's pages, Qatar News Agency notices, IARC's GLOBOCAN 2024 fact sheet and its 2026 note on Qatar, the IAEA's radiotherapy directory, WHO's immunisation data and the World Bank. All were read in English; Arabic versions were not compared.",
  verify:
    "The latest registry report OnCo could read is for 2020, and the cancer plan runs to the end of 2026, so both are due to be replaced. Charges, insurance rules and the school HPV campaign are changing; ask Hamad Medical Corporation or the Primary Health Care Corporation what applies to you.",
  verifyLinks: [
    { label: "Ministry of Public Health", url: "https://www.moph.gov.qa/english/Pages/default.aspx" },
    { label: "Hamad Medical Corporation: National Center for Cancer Care and Research", url: NCCCR_ABOUT },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Qatar (PDF)", url: IARC_FACTSHEET },
  ],
};
