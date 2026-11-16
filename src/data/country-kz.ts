import type { CountryDive } from "@/data/country-dive";

/**
 * Kazakhstan deep dive: the hand-written cards for /countries/kz/ (wave 7). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the Kazakh Institute of Oncology and Radiology's
 * "Indicators of the oncology service of the Republic of Kazakhstan, 2023" (PDF text, 414 pages; the latest edition on
 * the institute's site), the Comprehensive Plan to Fight Cancer 2023 to 2027 (Government decree No. 874, in the edition
 * of decree No. 864 of 1 October 2026, including its analysis and financing table), the Code on public health and the
 * health care system (articles 196 and 200), the Ministry of Health's screening order ҚР ДСМ-174/2020 in its edition
 * from 1 January 2026, the Ministry's news page of 17 September 2026, Kazakhstanskaya Pravda's report of 5 January 2026
 * of the Ministry's 2025 results, WHO's announcement of 9 April 2026 on maturity level 3, Forbes Kazakhstan's June 2021
 * report on the Eurasian registration transition, WHO's out-of-pocket, health spending and UHC rows from the Global
 * Health Observatory API, WHO's HPV introduction and coverage rows from its immunisation data API, IARC's GLOBOCAN 2024
 * fact sheet for Kazakhstan, OnCo's ClinicalTrials.gov participation data, and the papers' abstracts through Europe
 * PMC. Where a figure could not be read it is named under `gaps`.
 */
const INDICATORS_2023 = "https://onco.kz/nauka/docs/korsetkish/pokazateli_2023.pdf";
const INDICATORS_PAGE = "https://onco.kz/oncohelp/pokazateli.html";
const PLAN_2023 = "https://zakon.uchet.kz/rus/docs/P2300000874";
const PLAN_ADILET = "https://adilet.zan.kz/rus/docs/P2300000874";
const SCREEN_ORDER = "https://zakon.uchet.kz/rus/docs/V2000021572";
const HEALTH_CODE = "https://zakon.uchet.kz/rus/docs/K2000000360";
const MOH_SEPT_2026 = "https://www.gov.kz/memleket/entities/dsm/press/news/details/1293737?lang=ru";
const KP_2025 = "https://kazpravda.kz/n/minzdrav-zayavil-o-rezkom-snizhenii-smertnosti-ot-raka-v-kazahstane/";
const WHO_ML3 = "https://www.who.int/news/item/09-04-2026-kazakhstan-becomes-first-country-in-central-asia-to-earn-who-recognition-for-regulation-of-medicines-and-imported-vaccines";
const FORBES_EAEU = "https://forbes.kz/news/newsid_252323";
const EEC_78_WB = "https://web.archive.org/web/2026/https://docs.eaeunion.org/docs/ru-ru/01411969/cncd_21112016_78";
const NDDA = "https://www.ndda.kz";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/398-kazakhstan-fact-sheet.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'KAZ'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'KAZ'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'KAZ'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'KAZ'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'KAZ'%20and%20startswith(ANTIGEN,'HPV')";
const CTGOV = "https://clinicaltrials.gov/search?country=Kazakhstan&cond=cancer";

const INDICATORS_LABEL = "KazIOR: Indicators of the oncology service of the Republic of Kazakhstan, 2023 (PDF, Russian and Kazakh)";
const PLAN_LABEL = "Comprehensive Plan to Fight Cancer 2023 to 2027, edition of 1 October 2026 (Russian)";

export const KZ_DIVE: CountryDive = {
  iso2: "KZ",
  iso3: "KAZ",
  name: "Kazakhstan",
  flag: "🇰🇿",
  asOf: "2026-11-11",
  title: "Cancer in Kazakhstan",
  description:
    "Cancer in Kazakhstan from Kazakh sources: a national electronic cancer register that counted 37,038 new cancers in 2023, against IARC's estimate of 29,851 for 2024, treatment paid by the state within the guaranteed volume of free medical care, the 2023 to 2027 cancer plan, a medicines regulator rated at WHO maturity level 3 in 2026, screening for breast, cervical and bowel cancer, HPV vaccine since 2024, and the two trials in our records with a Kazakh site.",
  lede:
    "Kazakhstan registers every cancer patient in a national electronic register, and its cancer institute publishes the results each year: 37,038 new cancers in 2023, excluding skin cancer, and about 13,000 deaths. Treatment for citizens is paid by the state, and the government's 2023 to 2027 plan aims to find more cancers early and to give radiotherapy to more patients, the two places where the country says it lags.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Kazakhstan is 29,851 new cancers and 16,355 deaths, an age-standardised incidence of 125.4 per 100,000 (146.1 in men, 115.6 in women) and mortality of 68.1. It is not built from the national register. IARC's fact sheet gives Kazakhstan's incidence data source as \"no data\" and its method as national mortality estimates applied to model-based mortality-to-incidence ratios; its mortality source is WHO's national data, with trends projected to 2024. Kazakhstan's own count is higher for cases and lower for deaths: the Kazakh Institute of Oncology and Radiology's register recorded 37,038 new cancers in 2023 excluding skin cancer (GLOBOCAN's total includes non-melanoma skin cancer), and the national statistics bureau counted 13,358 cancer deaths in 2023 (12,958 in the register). The two also rank sites differently: the register, which lists colon and rectum separately, put breast (5,505), lung (3,873) and stomach (2,873) first, though colon and rectum together (3,943) would come second; GLOBOCAN puts breast (4,489), colorectum (3,598) and stomach (2,951) first. The institute reports rates as crude rates per 100,000 first, and gives a standardised incidence of 159.6 without naming the standard population, so its rates should not be set beside IARC's world-standard rates without checking.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Kazakhstan",
      aside: { label: INDICATORS_LABEL, url: INDICATORS_2023 },
      cards: [
        {
          id: "shape",
          title: "About 37,000 new cancers a year in the national register, breast cancer first",
          plain:
            "Kazakhstan's cancer register counted 37,038 new cancers in 2023, not counting skin cancer, up from 35,079 in 2022, and the Ministry of Health reported more than 42,000 in 2025. Breast cancer is the commonest; colon and rectum together come next, then lung and stomach cancer. Cancer is the second commonest cause of death after heart and circulatory disease, at about one death in ten.",
          detail:
            "The institute's 2023 report gives a crude incidence of 186.1 per 100,000 (179.9 in 2022) and a standardised rate of 159.6 (158.4). Its site table lists breast 5,505 cancers, lung 3,873, stomach 2,873, colon 2,050, cervix 2,035, rectum 1,893, prostate 1,744 and kidney 1,608; prostate (up 16.7%), larynx (15.5%), soft tissue and thyroid (13.1% each) rose fastest. The national statistics bureau counted 13,358 cancer deaths in 2023 (68.03 per 100,000), 10.2% of all deaths. In the register's own count of 12,958 deaths, the standardised mortality was 70.7 per 100,000 in men and 45.7 in women; lung (16.7) and stomach (10.8) led in men, breast (8.1) and cervix (4.2) in women. In 2023, 30.4% of new cancers were found at stage I, 30.6% at stage II, 21.4% at stage III and 11.7% at stage IV; pancreatic (36.5%) and lung cancer (26.5%) were most often found at stage IV. At the end of 2023, 218,186 people were registered with cancer. The Ministry's results for 2025, reported by Kazakhstanskaya Pravda on 5 January 2026, give more than 42,000 new cases, 246,205 people under observation and mortality of 61 per 100,000.",
          links: [
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "Kazakhstanskaya Pravda: Ministry of Health reports a sharp fall in cancer mortality (5 January 2026, Russian)", url: KP_2025 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kazakhstan (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "regions",
          title: "Cancer is commonest in the north and east, and found earliest in the cities",
          plain:
            "The burden differs across Kazakhstan's 20 regions. Recorded incidence and mortality are highest in the east and north, including East Kazakhstan and Abay regions near the former Semipalatinsk nuclear test site, and lower in the south and in Aktobe and Atyrau regions. The share found at stage I is highest in North Kazakhstan, the city of Almaty and East Kazakhstan and lowest in Turkestan, Atyrau and Aktobe.",
          detail:
            "The cancer plan's analysis for 2022 lists incidence well above the national average in East Kazakhstan (306.2 per 100,000), North Kazakhstan (293.4), Pavlodar (288.7), Kostanay (285.4) and Karaganda (270.1), and mortality highest in East Kazakhstan (116.1) and Abay (114.4). In 2023 the share of cancers found at stage I was highest in North Kazakhstan (38.6%), the city of Almaty (38.0%) and East Kazakhstan (35.8%), and lowest in Turkestan (21.1%), Atyrau (21.2%) and Aktobe (23.0%); the plan blames poor adherence to the patient route and a shortage of diagnostic equipment in those regions. A 2026 study of 2,192 people living near the Semipalatinsk test site found cancer mortality rising with radiation dose, about 0.9% for each 10 mSv. A national mortality study for 2014 to 2022 found deaths falling in people aged 45 to 74 but rising in adults aged 18 to 44, and a pronounced increase in Kyzylorda region.",
          links: [
            { label: PLAN_LABEL, url: PLAN_2023 },
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "Dyussupov et al., radiation exposure and cancer mortality around the Semipalatinsk test site (IJERPH 2026)", url: "https://doi.org/10.3390/ijerph23081037" },
            { label: "Akhmedullin et al., cancer mortality in Kazakhstan 2014 to 2022 (BMC Cancer 2024)", url: "https://doi.org/10.1186/s12885-024-13128-2" },
          ],
        },
      ],
      tables: [
        {
          id: "kz-register",
          title: "What Kazakhstan's cancer register reports",
          caption: "National headline figures by year, from the Electronic Register of Cancer Patients as published by KazIOR (2022 and 2023) and by the Ministry of Health (2025). Rates per 100,000.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers (excluding skin)" },
            { key: "crude", label: "Incidence, crude", numeric: true },
            { key: "std", label: "Incidence, standardised", numeric: true },
            { key: "deaths", label: "Deaths in the register", numeric: true },
            { key: "mort", label: "Mortality, crude", numeric: true },
            { key: "stage1", label: "Found at stage I (%)", numeric: true },
            { key: "five", label: "Observed 5 years or more (%)", numeric: true },
          ],
          rows: [
            { year: "2022", cases: "35,079", crude: 179.9, std: 158.4, deaths: 13037, mort: 66.8, stage1: 28.9, five: 55.3 },
            { year: "2023", cases: "37,038", crude: 186.1, std: 159.6, deaths: 12958, mort: 65.1, stage1: 30.4, five: 55.4 },
            { year: "2025", cases: "more than 42,000", crude: null, std: null, deaths: null, mort: 61, stage1: null, five: 63 },
          ],
          note: "The 2022 and 2023 rows are from KazIOR's 2023 report; the 2025 row is the Ministry of Health's summary as reported by Kazakhstanskaya Pravda, which gives early diagnosis as \"more than 33%\" without saying which stages it counts. The last column is the share of all registered patients who have been under observation for five years or more, which the Kazakh service calls five-year survival; it is not the five-year survival of a group of newly diagnosed patients that most registries report. The standard population for the standardised rate is not named in the report. No 2024 edition of the report was on KazIOR's site.",
          sources: [
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
          ],
        },
        {
          id: "kz-sites",
          title: "The commonest cancers: the national register against IARC's estimate",
          caption: "New cases by site: KazIOR's register for 2023 (excluding skin cancer) and IARC's GLOBOCAN estimate for 2024.",
          columns: [
            { key: "site", label: "Site" },
            { key: "national", label: "Register, 2023", numeric: true },
            { key: "globocan", label: "GLOBOCAN, 2024", numeric: true },
          ],
          rows: [
            { site: "Breast", national: 5505, globocan: 4489 },
            { site: "Lung, trachea and bronchus", national: 3873, globocan: 2798 },
            { site: "Colon and rectum", national: 3943, globocan: 3598 },
            { site: "Stomach", national: 2873, globocan: 2951 },
            { site: "Cervix", national: 2035, globocan: 1256 },
            { site: "Prostate", national: 1744, globocan: 1706 },
            { site: "Kidney", national: 1608, globocan: 968 },
            { site: "Pancreas", national: 1290, globocan: 963 },
          ],
          note: "The register's colon (2,050) and rectum (1,893) are added together here; GLOBOCAN's colorectum also includes the anus. The register counts cases diagnosed and registered in Kazakhstan; GLOBOCAN's figures are modelled from mortality, which is one reason the two differ, most of all for cervix and kidney.",
          sources: [
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kazakhstan (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: the state, through the guaranteed volume of free medical care",
      aside: { label: "Ministry of Health: anticancer treatment free for citizens (17 September 2026, Russian)", url: MOH_SEPT_2026 },
      cards: [
        {
          id: "gobmp",
          title: "Cancer care is paid from the state budget, whether or not a patient has paid insurance contributions",
          plain:
            "Kazakhstan has two layers of public cover: a guaranteed volume of free medical care paid from the budget, and compulsory social health insurance for people who pay contributions. Cancer is on the list of socially significant diseases, so its treatment and, from 2026, cancer screening fall in the free, budget-funded layer. The Ministry says 150 anticancer medicines are available.",
          detail:
            "Article 196 of the Code on public health and the health care system gives citizens, kandas, refugees and permanent residents a guaranteed volume of free medical care at the budget's expense, including outpatient and day-hospital specialised care for socially significant diseases, whose list includes malignant neoplasms, planned inpatient care for a list of diseases set by the Ministry, and outpatient screening for early detection of cancer. Medicines in free care must be registered in Kazakhstan and listed in the Kazakhstan National Drug Formulary, which decides what free care can use; unregistered medicines may be used for a named patient's vital need. The Code defines the Social Health Insurance Fund as the non-profit organisation that pools insurance deductions and contributions and buys and pays for providers' services under purchasing contracts. On 17 September 2026 the Ministry said that cancer care for citizens is free, that 150 anticancer medicines are in use (102 chemotherapy, 45 targeted and 3 immuno-oncology), and that more than 55,000 people a year receive anticancer drug treatment. The cancer plan nonetheless lists problems with access to targeted and immuno-oncology drugs, and asks for oral targeted medicines to be supplied on the outpatient drug list rather than from hospital budgets.",
          links: [
            { label: "Code on public health and the health care system, articles 196 and 200 (Russian)", url: HEALTH_CODE },
            { label: "Ministry of Health: more than 55,000 people a year receive anticancer treatment free (17 September 2026, Russian)", url: MOH_SEPT_2026 },
            { label: PLAN_LABEL, url: PLAN_2023 },
          ],
        },
        {
          id: "spending",
          title: "Households still pay more than a quarter of health spending themselves",
          plain:
            "Free cancer care does not mean nothing is paid. WHO's figures show that people in Kazakhstan paid about 28% of all health spending out of their own pockets in 2023, and the country spent about 3.8% of its economy on health. OnCo found no published figure for what cancer patients pay themselves.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket payments as 27.6% of current health expenditure in 2023 (30.8% in 2022, 25.0% in 2021 and 33.9% in 2019), and current health expenditure as 3.77% of gross domestic product in 2023. WHO's reported universal health coverage service coverage index for Kazakhstan is 83 for 2023. The cancer plan for 2023 to 2027 is financed with 460,670.4 million tenge over five years: 271,410.0 million from the national budget, 14,920.1 million from local budgets, 45,071.6 million from compulsory social health insurance and 129,228.7 million from the public foundation Qazaqstan Halqyna, which the plan names for charitable projects to install radiotherapy and chemotherapy equipment, supply innovative medicines to adults and children with cancer, and train specialists abroad. The Ministry's 2025 results, as reported by Kazakhstanskaya Pravda, put the money sent to the cancer service that year at 30.4 billion tenge and say access to targeted and immuno-oncology medicines was widened by seven products.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Kazakhstan (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: health spending as a share of GDP, Kazakhstan (API)", url: GHO_CHE },
            { label: "WHO Global Health Observatory: UHC service coverage index, Kazakhstan (API)", url: GHO_UHC },
            { label: "Comprehensive Plan to Fight Cancer 2023 to 2027, financing table (Russian)", url: PLAN_2023 },
            { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the National Center for Expertise of Medicines and Medical Devices",
      aside: { label: "WHO: Kazakhstan reaches maturity level 3 (9 April 2026)", url: WHO_ML3 },
      cards: [
        {
          id: "ml3",
          title: "Rated at WHO maturity level 3 for medicines and imported vaccines in April 2026",
          plain:
            "Medicines in Kazakhstan are evaluated by the National Center for Expertise of Medicines and Medical Devices and authorised with the Ministry of Health's Committee for Medical and Pharmaceutical Control. In April 2026 WHO rated the system at maturity level 3, stable and well functioning, the first country in Central Asia to reach it.",
          detail:
            "WHO announced on 9 April 2026 that Kazakhstan had reached maturity level 3 for the regulation of medicines and imported vaccines after benchmarking with its Global Benchmarking Tool, and described the national system as led by the Ministry of Health and implemented through the Committee for Medical and Pharmaceutical Control and the National Center for Expertise of Medicines and Medical Devices, which together oversee medicines from evaluation and authorisation to market surveillance and safety monitoring. WHO notes that authorities at levels 3 and 4 may be eligible for designation as WHO Listed Authorities after further assessment. The centre's own site gives its address as 13 Amangeldy Imanov Street, Astana. For a patient, registration matters directly: under article 196 of the Code, medicines given in free care must be registered in Kazakhstan and included in the national formulary, and a medicine that is not can be used only for a named patient's vital need, through a procedure set by the Ministry.",
          links: [
            { label: "WHO: Kazakhstan becomes first country in Central Asia to earn WHO recognition for regulation of medicines and imported vaccines (9 April 2026)", url: WHO_ML3 },
            { label: "National Center for Expertise of Medicines and Medical Devices (website)", url: NDDA },
            { label: "Code on public health and the health care system, article 196 (Russian)", url: HEALTH_CODE },
          ],
        },
        {
          id: "eaeu",
          title: "New medicines are registered under the rules of the Eurasian Economic Union",
          plain:
            "Kazakhstan shares common rules for registering medicines with the other members of the Eurasian Economic Union. Forbes Kazakhstan reported in 2021 that national registration of new medicines would end that July, and that medicines registered under the old national rules had to move to the Union's rules by the end of 2025.",
          detail:
            "Forbes Kazakhstan reported on 19 June 2021 that evaluation and registration of medicines by the national procedure would continue only until 1 July 2021, a date set by a decision of the Council of the Eurasian Economic Commission, and that medicines registered in member states had to be brought into line with Union rules by the end of 2025; at the end of the transition on 1 January 2026, registrations issued under Kazakh national law would lapse. It reported 335 medicines on the Union's common register at that time. The Union procedure rests on decision No. 78 of the Council of the Eurasian Economic Commission of 3 November 2016 on the rules for registration and evaluation of medicines. OnCo could not read the centre's own procedures or timelines, because its website is a script application that did not render to a plain request; see the gaps.",
          links: [
            { label: "Forbes Kazakhstan: national procedure for medicines evaluation only until 1 July (19 June 2021, Russian)", url: FORBES_EAEU },
            { label: "EEC Council decision No. 78 of 3 November 2016 on the rules for registration and evaluation of medicines (Russian, scanned PDF; read through the Internet Archive, as the live page did not answer)", url: EEC_78_WB },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Order ҚР ДСМ-174/2020 on screening target groups (Russian)", url: SCREEN_ORDER },
      cards: [
        {
          id: "programmes",
          title: "Breast, cervical and bowel screening by invitation, free for everyone from 2026",
          plain:
            "Kazakhstan invites women aged 40 to 76 for a mammogram every two years, women aged 30 to 74 for a cervical smear every four years, and men and women aged 50 to 76 for a stool test for hidden blood every two years. From January 2026 these screenings are paid from the state budget, so people without insurance can have them too.",
          detail:
            "The Ministry's order ҚР ДСМ-174/2020, in its edition from 1 January 2026, lists women in the calendar years they turn 40, 42 and so on to 76 for mammography (four images, read twice), with ultrasound, targeted views and biopsy at the second stage; women turning 30, 34 and so on to 74 for a Pap test on liquid-based cytology, followed by colposcopy and biopsy; and men and women turning 50, 52 and so on to 76 for a rapid faecal occult blood test, followed by colonoscopy. Every step is marked as paid from the guaranteed volume of free medical care. In 2023, when the target ages were narrower, 2,687,960 people were screened: 747,870 women by cytology (438 cervical cancers found), 918,464 women by mammography (1,875 breast cancers) and 1,021,626 people for bowel cancer (457 cancers). An evaluation of breast screening since 2008 found that the share of eligible women screened has fallen since the ages were widened in 2018, and that the programme has not yet been followed by a significant change in national breast cancer mortality. The plan adds HPV testing, quantitative stool tests and low-dose CT for lung cancer, and the Ministry said a lung screening pilot would start in 2026.",
          links: [
            { label: "Order ҚР ДСМ-174/2020 on screening target groups, edition from 1 January 2026 (Russian)", url: SCREEN_ORDER },
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "Semenova et al., evaluation of the national breast cancer screening programme (IJERPH 2026)", url: "https://doi.org/10.3390/ijerph23040532" },
            { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls nationwide since 2024, reaching under half in its first two years",
          plain:
            "Until recently Kazakhstan did not vaccinate against HPV, and its 2023 cancer plan named that as one cause of the cervical cancer burden. WHO's data record the vaccine introduced nationwide in 2024. In 2025 about 47% of the girls targeted received a first dose and 45% completed the course.",
          detail:
            "WHO's immunisation data record no HPV vaccine programme in Kazakhstan up to 2023 and a nationwide introduction in 2024. In the programme coverage rows Kazakhstan reported to WHO, 72,380 of a target of 190,228 girls (38%) received a first dose in 2024; in 2025, 90,613 of 192,936 (47%) received a first dose and 86,431 (45%) the last dose. The cancer plan's analysis lists the absence of HPV vaccination among the reasons for the cancer burden, and a 2021 review of Central Asia found that only Kazakhstan ran a structured cytology screening programme and attributed the region's cervical cancer burden partly to the absence of vaccination programmes. Cervical cancer detection in screening rose from 0.51 to 0.59 per 1,000 women between 2022 and 2023, and precancer was found in 1.28% of women screened. The register counted 2,035 new cervical cancers in 2023, and deaths from cervical cancer among registered patients fell by 17.0% that year.",
          links: [
            { label: "WHO immunisation data: HPV introduction rows for Kazakhstan (API)", url: WHO_HPV_INTRO },
            { label: "WHO immunisation data: HPV programme coverage rows for Kazakhstan (API)", url: WHO_HPV_API },
            { label: "Aimagambetova et al., cervical cancer screening and prevention in Kazakhstan and Central Asia (J Med Screen 2021)", url: "https://doi.org/10.1177/0969141320902482" },
            { label: PLAN_LABEL, url: PLAN_2023 },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy, equipment and the cancer workforce",
      cards: [
        {
          id: "rt-capacity",
          title: "Radiotherapy reached about a third of new patients in 2023; the plan aims for more than half by 2027",
          plain:
            "Kazakhstan's own analysis says it has too few radiotherapy machines. On 1 January 2023 it had 44 for external beam treatment against a need of at least 67, and radiotherapy reached 36.1% of new patients that year. The Ministry said in September 2026 that more than 40 machines, 26 of them linear accelerators, treat about 15,000 people a year.",
          detail:
            "The cancer plan applies the IAEA's guide of one external beam machine per 500 new cancers to the five-year average of 33,512 cases, reaches a need of at least 67, counts 44 on 1 January 2023 and a shortfall of about 20 linear accelerators, and contrasts radiotherapy coverage of 32.9% in 2022 with the 60 to 70% international experts recommend. It plans 16 linear accelerators, 13 CT or MRI simulators, 13 brachytherapy units and proton therapy, and sets coverage targets rising to 53% in 2027. KazIOR's 2023 report counts all radiotherapy equipment differently (78 units, including 16 X-ray therapy units), lists ten centres using or installing modern linear accelerators, reports coverage of 36.1% (18.9% in Karaganda region, 52.7% in Abay), notes that Almaty, Ulytau and Turkestan regions have no radiotherapy, and records a decision by the Qazaqstan Halqyna foundation to buy five linear accelerators by 2025. The Ministry's 2025 results add six new linear accelerators and give coverage of 61%, a figure far above the plan's own target for 2025 (44.9%) that OnCo could not reconcile. The Ministry said in September 2026 that the first proton therapy centre in Central Asia opened in Kazakhstan in 2025, and that 10 nuclear medicine centres run 19 PET/CT scanners.",
          links: [
            { label: PLAN_LABEL, url: PLAN_2023 },
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "Ministry of Health: radiotherapy, PET/CT and proton therapy (17 September 2026, Russian)", url: MOH_SEPT_2026 },
            { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
          ],
        },
        {
          id: "workforce",
          title: "496 oncologists and 97 radiation oncologists for 20 million people in 2022",
          plain:
            "In 2022 Kazakhstan had 496 oncologists and 97 radiation oncologists, about 0.25 and 0.05 for every 10,000 people, which meets its own minimum standard on average. But 12 regions fall below the average, three regions had no radiation oncologist at all, and the country counted only 25 medical physicists, dosimetrists and chemists.",
          detail:
            "The cancer plan's analysis counts 496 oncologists in 2022 (482 in 2021) and 97 radiation oncologists, called radiologists in Kazakh usage (101), with a shortage of 106 posts, or 179 without counting doctors holding more than one post. Provision of 0.25 oncologists and 0.05 radiation oncologists per 10,000 people meets the national minimum of 0.2 and 0.05, but Zhambyl and Kyzylorda regions have 0.02 radiation oncologists per 10,000, and Almaty, Turkestan and Ulytau regions none. The country had 25 medical physicists, dosimetrists and chemists, 12 physicists and 10 dosimetrists of them in the regions. The plan also records only two full rehabilitation departments in the country's cancer centres, molecular genetics laboratories in only six cities, PET/CT not covering the west and part of the south, and no reference laboratory for blood cancers, so that samples were sent to Russia. It funds at least 50 residency places a year in oncology and at least 12 in radiation therapy and diagnostics.",
          links: [
            { label: PLAN_LABEL, url: PLAN_2023 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Kazakhstan does",
      title: "What Kazakhstan does differently",
      cards: [
        {
          id: "erob",
          title: "One electronic register for every cancer patient, and a national report every year",
          plain:
            "Every region of Kazakhstan records each person diagnosed with cancer in a single Electronic Register of Cancer Patients, linked to the registers of patients attached to clinics and of hospital admissions. The national cancer institute turns it into a public report each year, with counts and rates for every region and every main cancer.",
          detail:
            "KazIOR's 2023 report describes the register (EROB) as recording people with a cancer diagnosis by place of residence, integrated with the register of the attached population, the hospitalisation bureau portal and the electronic register of inpatients, and states that the Kazakh register is the first in Central Asia recognised by IARC. The institute has published the yearly indicators for every year from 2015 to 2023; the 2023 edition is in Kazakh, Russian and English, with regional tables for incidence, stage, mortality, treatment, equipment, staffing and screening. It checks completeness with a ratio of deaths to newly registered cases, which it says has fallen each year since 2021, and reports that 90.1% of new cancers in 2023 were confirmed by histology. The register is also what researchers use: studies of mortality trends, of COVID-19's effect on diagnosis, and of breast screening on this page draw on national registry or health system data. IARC's GLOBOCAN 2024 does not use it for incidence; see the note under the table above.",
          links: [
            { label: INDICATORS_LABEL, url: INDICATORS_2023 },
            { label: "KazIOR: all published editions of the indicators, 2015 to 2023", url: INDICATORS_PAGE },
            { label: "Ishkinin et al., COVID-19 and cancer epidemiology in Kazakhstan 2017 to 2022 (Front Oncol 2024)", url: "https://doi.org/10.3389/fonc.2024.1481242" },
          ],
        },
        {
          id: "green-corridor",
          title: "A green corridor: tests for suspected cancer within 18 working days, through a three-level service",
          plain:
            "When a family doctor suspects cancer, outpatient consultations and tests follow a priority route called the green corridor, outside the general queue, within 18 working days. Care is organised on three levels: examination rooms and oncology offices in primary care, regional cancer centres, and high-technology centres and the national institute.",
          detail:
            "The Ministry of Health said on 17 September 2026 that all outpatient consultations and diagnostic tests follow the green corridor principle, giving priority outside the general queue within 18 working days, and that the oncologist then completes the diagnosis, including tissue confirmation and staging. The cancer plan describes the three levels for 2022: 2,168 examination rooms and 499 oncology offices in primary care; 15 regional cancer dispensaries or centres and 5 oncology departments of regional hospitals with 3,960 beds; and high-technology radiation oncology centres in Almaty, Astana, Aktobe, Semey, Pavlodar, Aktau, Ust-Kamenogorsk and Shymkent, with KazIOR. Children are treated at three national organisations in Almaty and Astana and in regional children's haematology departments. The plan funds rapid cancer diagnosis centres and regional situation centres to monitor the green corridor, text message reminders for screening, and 221 mobile palliative care teams were working in 2022. The Ministry's 2025 results add 19 endoscopy expert centres for early detection of digestive cancers and mobile medical units in remote areas.",
          links: [
            { label: "Ministry of Health: more than 55,000 people a year receive anticancer treatment free (17 September 2026, Russian)", url: MOH_SEPT_2026 },
            { label: PLAN_LABEL, url: PLAN_2023 },
            { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "Two trials in OnCo's records list a site in Kazakhstan",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, two of the cancer trials in our records list a site in Kazakhstan: ALINA, Roche's trial of alectinib after surgery for ALK-positive lung cancer, and OASIS-4, Bayer's trial of elinzanetant for hot flushes caused by breast cancer treatment.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 2 trials list Kazakhstan among their countries. ALINA (NCT03456076, sponsored by Hoffmann-La Roche) ran at 114 sites in countries including Kazakhstan, Russia, Belarus and China; OASIS-4 (NCT05587296, Bayer) ran at 102 sites in 16 countries, Kazakhstan the only one in Central Asia. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Kazakhstan; the search linked below lists all registered cancer studies with a Kazakh site. Kazakh cancer research on this page is mostly observational and drawn from national data: mortality trends for 2014 to 2022, COVID-19's effect on diagnosis, an evaluation of breast screening, and the Semipalatinsk cohort. The cancer plan funds research to optimise prevention, early diagnosis, treatment and rehabilitation through competitive programme funding, and names weak national research capacity in modern diagnostic and treatment technologies as one of its five problems.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Kazakhstan (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: ALINA, NCT03456076", url: "https://clinicaltrials.gov/study/NCT03456076" },
            { label: "ClinicalTrials.gov: OASIS-4, NCT05587296", url: "https://clinicaltrials.gov/study/NCT05587296" },
          ],
        },
        {
          id: "plan-2023",
          title: "The 2023 to 2027 plan: 460.7 billion tenge to find cancer earlier and treat it at home",
          plain:
            "Kazakhstan's Comprehensive Plan to Fight Cancer for 2023 to 2027 follows a 2018 to 2022 plan during which cancer mortality fell by 15%. It aims to find 35% of cancers at the earliest stages, give radiotherapy to 53% of patients, lower mortality to 64.5 per 100,000 and raise five-year survival to 60% by 2027. The government rewrote it in October 2026.",
          detail:
            "The plan was approved by Government decree No. 874 of 5 October 2023 and set out in a new edition by decree No. 864 of 1 October 2026. Its analysis credits the 2018 to 2022 plan (decree No. 395 of 29 June 2018) with a fall in cancer mortality from 78.1 to 66.8 per 100,000, and records early detection at stage 0 or I of 29.0% in 2022 against a target of 33.5%, and five-year survival of 55.3% against a target of 60.0%. It names five problems (low uptake of screening and no HPV vaccination, uneven equipment across regions, staff shortages, weak national research, and limited digital tracking of patients) and five directions to address them, with a stated aim of closing the gap with OECD countries and moving from inpatient to outpatient care. Its yearly targets for 2027 are 35% of cancers at stage 0 or I, 10% of visible cancers found at stage III or IV, radiotherapy for 53%, mortality of 64.5 per 100,000 and five-year survival of 60%. Its financing table totals 460,670.4 million tenge, of which 79,915.7 million is for radiotherapy equipment.",
          links: [
            { label: PLAN_LABEL, url: PLAN_2023 },
            { label: "Adilet: Comprehensive Plan to Fight Cancer 2023 to 2027 (official legal database, Russian)", url: PLAN_ADILET },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "indicators-2024",
      title: "No national cancer report for 2024 or 2025 could be read",
      plain:
        "KazIOR's yearly report for 2023 is the latest on its website. The 2025 figures on this page (more than 42,000 new cancers, mortality of 61 per 100,000) come from the Ministry of Health's summary as reported by a newspaper, not from a published report with tables, and OnCo found no 2024 national report.",
      detail:
        "KazIOR's page of indicators lists editions for 2015 to 2023; the Crossref record for the 2023 edition points to an address on the institute's old site that now returns an error, and the file was read from the address on the current page. The Ministry's summary of 2025 results was read in Kazakhstanskaya Pravda's article of 5 January 2026, which cites the Ministry; the Ministry's own release was not found. Press reports quote other 2024 and 2025 figures (incidence per 100,000, regional rates) attributed to the Ministry or to a statistics aggregator; they are not used. The 2025 summary's \"five-year survival\" of 63% and early diagnosis of \"more than 33%\" are given without definitions.",
      links: [
        { label: "KazIOR: all published editions of the indicators, 2015 to 2023", url: INDICATORS_PAGE },
        { label: "Kazakhstanskaya Pravda: Ministry of Health 2025 results (5 January 2026, Russian)", url: KP_2025 },
      ],
    },
    {
      id: "regulator-site",
      title: "The regulator's own procedures, timelines and register were not read",
      plain:
        "The National Center for Expertise of Medicines and Medical Devices publishes its information through a script application that shows nothing to a plain request, and it loads a bot check. OnCo did not try to get past it, so this page gives no registration times and no list of cancer medicines registered in Kazakhstan.",
      detail:
        "The centre's home page returned an empty application shell on 11 November 2026, with its address and name readable only from the page's script bundle. Its registry of medicines, its fees and its evaluation timelines under the Eurasian Economic Union rules were therefore not read. The account of the transition to Union rules comes from Forbes Kazakhstan's 2021 report, not from the centre or the Eurasian Economic Commission; whether every national registration did lapse on 1 January 2026 was not confirmed from a primary source. The Kazakhstan National Drug Formulary, which decides what free care can use, was not read either.",
      links: [
        { label: "National Center for Expertise of Medicines and Medical Devices (website)", url: NDDA },
        { label: "Forbes Kazakhstan: national procedure for medicines evaluation only until 1 July (19 June 2021, Russian)", url: FORBES_EAEU },
      ],
    },
    {
      id: "insurer-and-costs",
      title: "The Social Health Insurance Fund's website could not be reached, and cancer patients' own costs are unknown",
      plain:
        "The Social Health Insurance Fund's site (fms.kz) did not answer on 11 November 2026, so its tariffs and payment rules for cancer care were not read. OnCo also found no study or official figure for how much cancer patients in Kazakhstan pay themselves for medicines, travel or private tests.",
      detail:
        "The fund is described here from the Code on public health, which defines it as the non-profit organisation that pools insurance deductions and contributions and buys and pays for services, and from the cancer plan's financing table. The fund's rules for paying for cancer care, its contract volumes for cancer centres, and any waiting list data were not read. WHO's out-of-pocket share (27.6% of health spending in 2023) covers all care, not cancer. Press reports quoting the fund's advisers on cancer care were found but one refused a plain request and another dates from 2020; neither is used.",
      links: [
        { label: "Code on public health and the health care system (Russian)", url: HEALTH_CODE },
        { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Kazakhstan (API)", url: GHO_OOP },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here: an independent count of radiotherapy machines (the plan, KazIOR and the Ministry count differently), five-year survival of newly diagnosed patients in the usual sense, which hospital houses the proton therapy centre, and IARC's detailed data sources page for Kazakhstan.",
      detail:
        "The IAEA's Directory of Radiotherapy Centres and any imPACT Review of Kazakhstan were not read, so radiotherapy capacity rests on three national counts that do not agree: 44 external beam machines on 1 January 2023 (the plan), 78 radiotherapy units of all kinds in 2023 (KazIOR) and more than 40 machines including 26 linear accelerators in 2026 (the Ministry). The Ministry's 2025 radiotherapy coverage of 61% could not be reconciled with KazIOR's 36.1% for 2023. The Kazakh \"five-year survival\" is the share of registered patients observed for five years or more; a cohort survival figure for newly diagnosed patients was not found in the sources read. IARC's detailed data sources and methods page for Kazakhstan is a script application that did not render; the method is taken from the fact sheet. The 2018 to 2022 plan itself was not read; its results are as reported in the 2023 to 2027 plan.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Kazakhstan (PDF)", url: IARC_FACTSHEET },
        { label: PLAN_LABEL, url: PLAN_2023 },
      ],
    },
  ],
  institutions: [
    "kazakhstan-ministry-of-health", "kazior", "kazakhstan-ncemmd", "kazakhstan-nnoc", "iarc", "who", "iaea",
  ],
  companies: ["roche-genentech", "bayer"],
  drugs: ["alectinib", "elinzanetant"],
  trials: ["alina", "nct05587296"],
  papers: [
    "paper-akhmedullin-cancer-mortality-kazakhstan-bmc-cancer-2024", "paper-ishkinin-covid-screening-sites-kazakhstan-fonc-2024",
    "paper-semenova-breast-screening-kazakhstan-ijerph-2026", "paper-aimagambetova-cervical-screening-central-asia-jms-2021",
    "paper-dyussupov-semipalatinsk-cancer-mortality-ijerph-2026",
  ],
  people: [],
  how:
    "Every card was written from Kazakh official sources and international data, read in full rather than through a summary: the Kazakh Institute of Oncology and Radiology's Indicators of the oncology service for 2023; the Comprehensive Plan to Fight Cancer 2023 to 2027 in its edition of 1 October 2026; the Code on public health and the health care system; the Ministry of Health's screening order and its news page of September 2026; Kazakhstanskaya Pravda's report of the Ministry's 2025 results; WHO's maturity level announcement; Forbes Kazakhstan on the Eurasian registration transition; WHO's spending, coverage and HPV rows from its public data APIs; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Most sources are in Russian; the translations are OnCo's. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, KazIOR, the regulator, the national oncology centre and five papers) carry their own sources.",
  verify:
    "National counts come from Kazakhstan's own register and IARC's figures are modelled, so the two differ. Which medicines are on the national formulary, which regional centre gives radiotherapy, and how long the green corridor takes in practice change faster than the published plans; ask the regional oncology centre or the KazIOR patient support service what applies to you. Screening invitations go by the calendar year in which you reach a target age, through the clinic you are attached to.",
  verifyLinks: [
    { label: "Ministry of Health of the Republic of Kazakhstan", url: "https://www.gov.kz/memleket/entities/dsm" },
    { label: "Kazakh Institute of Oncology and Radiology", url: "https://onco.kz/" },
    { label: "National Center for Expertise of Medicines and Medical Devices", url: NDDA },
    { label: PLAN_LABEL, url: PLAN_2023 },
  ],
};
