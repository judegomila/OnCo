import type { CountryDive } from "@/data/country-dive";

/**
 * Georgia deep dive: the hand-written cards for /countries/ge/ (wave 10). This is Georgia the country in the
 * Caucasus; ClinicalTrials.gov lists it as "Georgia", and sites in the US state of Georgia sit under "United States".
 * Every figure was read from the raw text of its source on 11 November 2026, not from a summary of it: the National
 * Center for Disease Control and Public Health's report "Cancer in Georgia 2015-2021" (PDF text from the Center's file
 * service) and its March 2022 news item, IANPHI's article on the registry, WHO Europe's "Health Systems in Action:
 * Georgia" 2024 edition, its 2021 financial protection review and its 2017 health system review (PDF text from WHO
 * IRIS), WHO's Cancer Country Profile 2020 for Georgia (PDF text), WHO's HPV coverage, introduction and schedule rows
 * from its public immunisation data API, the World Bank's out-of-pocket series, City Cancer Challenge's Tbilisi pages,
 * the regulator's home page as the Internet Archive kept it in 2021, IARC's GLOBOCAN 2024 fact sheet for Georgia, and
 * the papers' abstracts through Europe PMC. The Ministry of Health's site answered with a Cloudflare challenge, the
 * regulator's current site did not resolve and the legislative herald refused a search, so none of these was read;
 * they are named under `gaps`.
 */
const NCDC_REPORT = "https://ncdc.ge/Api/api/File/GetFile/a2a861e7-d810-41d3-8948-7316b80aff4f";
const IANPHI = "https://ianphi.org/news/2022/georgia-cancer-registry.html";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/268-georgia-fact-sheet.pdf";
const HSIA_2024 = "https://iris.who.int/handle/10665/380264";
const FINPROT_2021 = "https://iris.who.int/handle/10665/342815";
const HIT_2017 = "https://iris.who.int/handle/10665/330206";
const WHO_CCP_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/geo-2020.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/GEO/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GEO'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_SCHEDULE = "https://xmart-api-public.who.int/WIISE/AD_SCHEDULES?$filter=COUNTRY%20eq%20'GEO'%20and%20startswith(VACCINECODE,'HPV')";
const RAMA_2021 = "https://web.archive.org/web/20210817174118/http://rama.moh.gov.ge/";
const CCAN = "https://citycancerchallenge.org/city/tbilisi/";
const CCAN_2025 = "https://citycancerchallenge.org/tbilisi-is-leading-the-way-in-cancer-care-reform/";
const CCAN_GBCI = "https://citycancerchallenge.org/from-global-framework-to-local-action-transforming-breast-cancer-care-from-the-ground-up-in-tbilisi/";
const CTGOV = "https://clinicaltrials.gov/search?country=Georgia&cond=cancer";

export const GE_DIVE: CountryDive = {
  iso2: "GE",
  iso3: "GEO",
  name: "Georgia",
  flag: "🇬🇪",
  asOf: "2026-11-11",
  title: "Cancer in Georgia",
  description:
    "Cancer in Georgia, the country in the Caucasus, from Georgian and WHO sources: a national cancer registry since 2015 counting about 10,400 new cancers in 2021, IARC's estimate of 16,063 for 2024, the Universal Health Care Programme and its cancer package opened to every resident in November 2023, out-of-pocket spending that is still high, a medicines regulator that recognises approvals by the European Medicines Agency and others, screening that reaches about one in eight people eligible, HPV vaccine for girls and boys, and 77 trials in our records with a site in Georgia.",
  lede:
    "Georgia has counted every new cancer in the country through a national registry since 1 January 2015: about 10,400 a year, with breast and thyroid cancer leading in women and lung and prostate cancer in men. Treatment is paid for through a universal programme that in November 2023 opened its cancer package to everyone, but families still pay much of the cost themselves, and researchers find that early detection is underused.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Georgia is 16,063 new cancers and 7,780 deaths, an age-standardised incidence of 234.4 per 100,000 (289.9 in men, 205.9 in women), including 802 non-melanoma skin cancers. IARC's fact sheet lists no country-specific source for incidence: it estimates new cases by applying model-based mortality-to-incidence ratios to national mortality, which it takes from WHO's national data projected to 2024. So Georgia's own registry, running since 2015, is not the basis of the incidence figure, and the two disagree. The registry counted 9,555 invasive cancers other than non-melanoma skin cancer in 2021 (10,432 including in situ tumours), against IARC's 15,261 for 2024 on the same definition, and the national analysis for 2015 to 2019 gives age-standardised rates of 175.5 per 100,000 men and 192.8 per 100,000 women without non-melanoma skin cancer, against IARC's 289.9 and 205.9 for 2024 with it: far lower for men, a little lower for women, and the years and definitions differ. The pattern differs too: IARC puts thyroid cancer at 628 cases for both sexes, while the registry measured a thyroid rate in women of 34.3 per 100,000 and counted 888 thyroid cancers in 2021. Deaths agree more closely: national statistics recorded 7,388 cancer deaths in 2021. The registry's authors say incidence may be lower than in the EU because of differences in health care, screening uptake or reporting accuracy; OnCo cannot say which estimate is closer to the truth.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Georgia",
      aside: { label: "NCDC: Cancer in Georgia 2015-2021 (PDF)", url: NCDC_REPORT },
      cards: [
        {
          id: "shape",
          title: "About 10,400 new cancers a year in the registry, breast and thyroid leading in women",
          plain:
            "Georgia's national registry recorded 10,432 new cancers in 2021, 53% of them in women, and national statistics recorded 7,388 cancer deaths. Breast cancer is the commonest cancer in women and thyroid cancer the second; in men lung and prostate cancer lead. Smoking is very common among Georgian men, and lung cancer is the leading cause of cancer death.",
          detail:
            "The National Center for Disease Control and Public Health (NCDC) report \"Cancer in Georgia 2015-2021\" gives between 10,073 and 11,380 new cancers a year including in situ tumours, 10,432 in 2021 (281.3 per 100,000), and 7,388 deaths from cancer in 2021, led by lung cancer (14%) and breast cancer (10%). About 67% of new cancers were in people aged 30 to 70. Its 2021 treatment table counts 1,651 breast, 888 thyroid, 787 colorectal, 726 lung, 716 prostate and 548 bladder cancers. The national registry analysis for 2015 to 2019 found breast cancer to be 34% of cancers in women (64.5 per 100,000) and thyroid cancer 14% (34.3), and in men lung cancer 16% (28.0), prostate 14% (22.0), bladder 10% and larynx 6%. IARC's 2024 estimate ranks breast, lung, prostate and colorectal cancer first by cases, and lung, colorectal and breast cancer by deaths. WHO Europe's 2024 profile estimates male smoking at 54.6% of those aged 15 and over in 2023, the highest in Europe, and female smoking at 7.0%.",
          links: [
            { label: "NCDC: Cancer in Georgia 2015-2021, summary and tables 1 and 36 (PDF)", url: NCDC_REPORT },
            { label: "Beraia et al., incidence of common cancers in Georgia 2015 to 2019 (Cancer Treat Res Commun 2026)", url: "https://doi.org/10.1016/j.ctarc.2026.101267" },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Georgia (PDF)", url: IARC_FACTSHEET },
            { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition (WHO IRIS)", url: HSIA_2024 },
          ],
        },
        {
          id: "stage-survival",
          title: "Early detection is underused, and five-year survival is about 55%",
          plain:
            "In 2021 just over a third of new cancers in Georgia were found at stage I or II, and a similar share at stage III or IV. Five years after diagnosis, about 55% of people diagnosed in 2017 were alive, and about three quarters of women with breast cancer. Many early thyroid cancers are very small tumours, which researchers think may be overdiagnosis.",
          detail:
            "The NCDC report gives 38.2% of new cancers in 2021 at stages I and II and 38.6% at stages III and IV, with stage unknown for the rest. Its five-year survival, calculated by the direct method (the share of patients alive after five years), was 55.0% for all sites diagnosed in 2017 in its survival table (its summary gives 56.3% for the same year, without explaining the difference), 75.3% for breast cancer, 97.6% for thyroid cancer and 77.9% for people under 20. IANPHI reports NCDC's plan to move to methods used by the CONCORD programme, because the direct method does not use all available data. In a registry analysis for 2018 and 2019, about 57% of cancers in men and 56% in women were of types amenable to early detection, but at least 35.7% and 44.2% of these were found early. At least 83.8% of thyroid cancers in women were stage I, half of all stage I cancers in women, and at least 42.4% of those were papillary microcarcinomas; the authors say thyroid overdiagnosis needs investigation. Earlier, the 2016 data quoted in WHO's 2017 review had 31.6% of cervical and 38% of breast cancers found at stage III or IV.",
          links: [
            { label: "NCDC: Cancer in Georgia 2015-2021, summary and table 5 (PDF)", url: NCDC_REPORT },
            { label: "Batavani et al., early and late detection of cancer in Georgia 2018 to 2019 (Cancer Epidemiol 2022)", url: "https://doi.org/10.1016/j.canep.2022.102216" },
            { label: "IANPHI: Georgia's cancer registry improves access to high quality data (15 March 2022)", url: IANPHI },
          ],
        },
      ],
      tables: [
        {
          id: "ge-registry",
          title: "What Georgia's national cancer registry has counted",
          caption: "New cancers and cancer deaths a year, with crude rates per 100,000 population, from NCDC's report. Latest year published in English: 2021.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers, all sites", numeric: true },
            { key: "rate", label: "Per 100,000", numeric: true },
            { key: "invasive", label: "Excluding in situ and skin", numeric: true },
            { key: "deaths", label: "Cancer deaths", numeric: true },
            { key: "mrate", label: "Deaths per 100,000", numeric: true },
          ],
          rows: [
            { year: "2015", cases: 11140, rate: 299.0, invasive: 10251, deaths: 6268, mrate: 168.3 },
            { year: "2016", cases: 10724, rate: 287.7, invasive: 9922, deaths: 6829, mrate: 183.2 },
            { year: "2017", cases: 10282, rate: 275.8, invasive: 9633, deaths: 7095, mrate: 190.3 },
            { year: "2018", cases: 10699, rate: 287.1, invasive: 9934, deaths: 7329, mrate: 196.7 },
            { year: "2019", cases: 11380, rate: 305.9, invasive: 10469, deaths: 7873, mrate: 211.6 },
            { year: "2020", cases: 10073, rate: 270.6, invasive: 9253, deaths: 8024, mrate: 215.5 },
            { year: "2021", cases: 10432, rate: 281.3, invasive: 9555, deaths: 7388, mrate: 199.2 },
          ],
          note: "All-sites counts include in situ (pre-invasive) tumours; the third column excludes them and non-melanoma skin cancers. Rates are crude, not age-standardised, so they cannot be compared directly with IARC's. Deaths come from the national statistics office (Geostat), as the report notes. The fall in 2020 coincides with the COVID-19 pandemic; the report does not explain it.",
          sources: [
            { label: "NCDC: Cancer in Georgia 2015-2021, table 1 (PDF)", url: NCDC_REPORT },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry since 2015",
      aside: { label: "IANPHI: Georgia's cancer registry improves access to high quality data", url: IANPHI },
      cards: [
        {
          id: "registry-national",
          title: "From 4,200 cancers registered in 2014 to more than 10,000 a year in a national registry",
          plain:
            "Before 2015, Georgia's cancer counts came from routine reports and missed many cases. On 1 January 2015 the National Center for Disease Control and Public Health started a population-based registry covering the whole country, and since 2019 doctors report to it electronically. Facilities that treat cancer must share their data with it.",
          detail:
            "IANPHI's March 2022 article explains that NCDC set up the registry with IARC's open-source CanReg5 software. Before it, routine surveillance gathered data from about 200 facilities, but family doctors were not required to take part, and only 4,200 new cancers were registered in 2014; since 2015 more than 10,000 have been recorded each year. Notification was at first on paper, with incomplete forms; in 2019 NCDC launched a unified electronic system for cancer data that combines screening, diagnosis and treatment, and links to the birth and death module so each patient's vital status updates and survival can be calculated. In 2020 the registry produced Georgia's first five-year survival figures, which IANPHI's General Assembly recognised as a success. NCDC's 2015 to 2021 report describes the registry as constantly evolving, with data quality and coverage improving but challenges remaining. IARC's fact sheet does not use the registry for Georgia's incidence estimate; OnCo found no explanation of why.",
          links: [
            { label: "IANPHI: Georgia's cancer registry improves access to high quality data (15 March 2022)", url: IANPHI },
            { label: "NCDC: Cancer in Georgia 2015-2021, foreword (PDF)", url: NCDC_REPORT },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Georgia, data source and methods (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a universal programme, with families still paying much of the cost",
      aside: { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition", url: HSIA_2024 },
      cards: [
        {
          id: "uhcp",
          title: "The Universal Health Care Programme has covered cancer treatment since 2013, and everyone since November 2023",
          plain:
            "Since 2013 Georgia's Universal Health Care Programme has paid for chemotherapy, hormone therapy and radiotherapy for residents without other insurance. From November 2023 its cancer package is open to every resident whatever their income or insurance, and from 2024 there is no annual limit on reimbursing cancer medicines. Patients still pay co-payments that vary by group.",
          detail:
            "WHO Europe's 2024 profile records that the programme started in February 2013 with a minimum package and expanded in July 2013 to a basic package including elective surgery, chemotherapy, hormone therapy, radiotherapy and childbirth. In 2023 it gave 93.7% of residents some degree of coverage; about 16% had private insurance and about 5% were registered for neither. In 2017 benefits were withdrawn from the richest households except for infectious disease care and childbirth, but since November 2023 the cancer care benefits package has been available to everyone regardless of income or insurance status. Also in November 2023 a managed entry agreement mechanism was introduced to give access to innovative cancer medicines, and from 2024 the government removed the GEL 25,000 annual limit on reimbursing cancer medicines. WHO's 2021 review had recorded a ceiling of GEL 12,000 a year for cancer treatment, with providers allowed to bill patients above the tariff; since 2023 that balance billing is no longer allowed and inpatient co-payments are capped. The National Health Agency buys services from mostly private providers, paying hospitals by diagnosis-related groups since November 2022.",
          links: [
            { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, sections 1 and 2 (WHO IRIS)", url: HSIA_2024 },
            { label: "WHO Europe: Can people afford to pay for health care? New evidence on financial protection in Georgia (2021, WHO IRIS)", url: FINPROT_2021 },
          ],
        },
        {
          id: "oop",
          title: "Out-of-pocket payments remain high, and diagnosis is where many families borrow",
          plain:
            "Even with universal coverage, Georgian households pay a large share of health spending themselves, mostly for medicines. In 2018 more than one household in six faced catastrophic health spending. In a survey of cancer patients published in 2025, 71% had paid out of pocket and 44% had borrowed money, most often to pay for diagnostic tests.",
          detail:
            "The World Bank's series, taken from WHO's Global Health Expenditure Database, puts out-of-pocket payments at 58.8% of current health spending in 2023, after a low of 51.9% in 2021 and from 72.5% in 2012. WHO Europe's 2024 profile gives a different figure, 31.2% for 2021, alongside public spending of 53%; the two cannot both be right and OnCo has named the difference under gaps. WHO says just over 17% of households had catastrophic spending on health in 2018 and 6.8% were impoverished or further impoverished, driven mainly by outpatient medicines, and that prices of medicines for non-communicable diseases rose 26% between 2019 and 2021, by 86% for cancer medicines. Reference pricing now caps prices for more than 7,000 medicines. WHO's 2021 review noted that the programme paid for diagnostic procedures to confirm cancer only if surgery or treatment followed, and that health technology assessment played no part in coverage decisions. In a survey of 181 patients at seven hospitals, 74.5% reported a moderate or heavy economic burden, 71.3% had out-of-pocket costs and 44.2% took loans, most often for diagnosis.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Georgia (API)", url: WB_OOP },
            { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, section 2 (WHO IRIS)", url: HSIA_2024 },
            { label: "WHO Europe: financial protection in Georgia (2021, WHO IRIS)", url: FINPROT_2021 },
            { label: "Kakhniashvili et al., the cancer burden on patients and their families in Georgia (Cancer Control 2025)", url: "https://doi.org/10.1177/10732748251359407" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Regulation Agency for Medical and Pharmaceutical Activities",
      aside: { label: "WHO Europe: Georgia, health system review 2017", url: HIT_2017 },
      cards: [
        {
          id: "recognition",
          title: "Medicines approved by trusted foreign regulators can be registered automatically",
          plain:
            "Georgia's medicines regulator is an agency of the health ministry. Under a 2009 law, a medicine already accepted by an approved regulator, such as the European Medicines Agency or the regulators of the United States, Japan or most European countries, can be registered in Georgia through a simplified route, without extra quality certificates.",
          detail:
            "WHO's 2017 health system review describes the agency, then called the State Regulation Agency for Medical Activities, as part of the health ministry and responsible for licensing medical activities, permitting facilities and pharmacies, and regulating professionals, medicines and devices, while noting that its work was hampered by an unclear legal framework and limited resources. It explains that the Law on Drugs and Pharmaceutical Regulation of 2009, as WHO names it, introduced a recognition policy: brand and generic medicines accepted by an approved regulator (the European Medicines Agency, most European national regulators, and those of the United States, Japan, Australia and New Zealand) can be registered automatically. The review reports concerns about traceability and quality checks after the market was opened, and up to 300 adverse drug reaction notifications in 2016. The agency's home page, as archived in August 2021, lists divisions for medicine registration and permits and for medicine inspection, and a public register of pharmaceutical products. WHO's 2024 profile says a new Law on Medicinal Products, drafted from 2021 and updated in 2023 to follow EU directives, had not yet been debated in parliament.",
          links: [
            { label: "WHO Europe: Georgia, health system review 2017, sections 2 and 5 (WHO IRIS)", url: HIT_2017 },
            { label: "Regulation Agency for Medical and Pharmaceutical Activities: home page (Georgian; Internet Archive copy, 17 August 2021)", url: RAMA_2021 },
            { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, section 3 (WHO IRIS)", url: HSIA_2024 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "NCDC: Cancer in Georgia 2015-2021, screening (PDF)", url: NCDC_REPORT },
      cards: [
        {
          id: "screening-programme",
          title: "State screening for four cancers since 2011, reaching about one in eight of those eligible",
          plain:
            "Georgia's state programme offers breast screening to women aged 40 to 70, cervical screening to women aged 25 to 60, colorectal screening to everyone aged 50 to 70, and prostate cancer risk checks to men aged 50 to 70. Uptake is low: researchers led from the disease control centre put it at 13%, and the number of women having cervical screening has halved since 2016.",
          detail:
            "NCDC's report lists the four programmes as running since 2011, and IANPHI describes the electronic system that, since 2019, invites people back for regular screening after a first test and records results. Researchers led from NCDC's health promotion division give overall cancer screening uptake as 13%; in their November 2023 survey of 2,958 primary care doctors and nurses, 98% said they referred patients for screening but 64.7% referred only one to five a week. Cervical screening fell from 26,348 women in 2016 (4.4% of those eligible) to 13,890 in 2022 (2.3%). WHO's 2020 cancer profile recorded an organised cervical programme using the Pap smear; a Tbilisi study of 1,000 women found HPV testing with genotyping more accurate and recommended moving to it. A model adapted to Georgia found the current breast screening, mammography every two years from 40 to 70 with clinical examination, cost €16,218 per quality-adjusted life year, above the €12,720 threshold used, and suggested mammography every three years from 45 to 66. Lung cancer specialists wrote in 2021 that Georgia lacks a lung cancer screening programme for smokers.",
          links: [
            { label: "NCDC: Cancer in Georgia 2015-2021, screening of cancer (PDF)", url: NCDC_REPORT },
            { label: "Topuridze et al., primary care providers and cancer screening referral in Georgia (Eur J Gen Pract 2025)", url: "https://doi.org/10.1080/13814788.2025.2582292" },
            { label: "Khuntsaria et al., HPV vaccination and cervical cancer control in Georgia (BMC Public Health 2025)", url: "https://doi.org/10.1186/s12889-025-25958-1" },
            { label: "Irzaldy et al., breast cancer screening in Georgia (Value Health Reg Issues 2024)", url: "https://doi.org/10.1016/j.vhri.2023.09.002" },
            { label: "Kiguradze et al., Pap and HPV tests in Tbilisi (Cent Eur J Public Health 2024)", url: "https://doi.org/10.21101/cejph.a8014" },
            { label: "Kiladze et al., real-world treatment patterns of lung cancer in Georgia (Health Serv Insights 2021)", url: "https://doi.org/10.1177/11786329211055296" },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine for girls since 2019 and for boys since 2023",
          plain:
            "Georgia began vaccinating girls against HPV nationally in August 2019 and added boys in July 2023. Children aged 10 to 12 get two doses, and people up to 45 can catch up. In 2025 just over half of girls in the target group had a first dose and 43% had completed the course; coverage among boys is still under one in ten.",
          detail:
            "WHO's immunisation schedule rows for Georgia record national introduction for girls from August 2019 and boys from July 2023, a two-dose schedule at ages 10 to 12 with the second dose six months later, and catch-up vaccination for people aged 13 to 45; the vaccine reported for 2025 is the nine-valent HPV vaccine. In the programme coverage rows Georgia reported to WHO, first-dose coverage among girls was 38% in 2019, 12% in 2020, 48% in 2022, 58% in 2024 and 55% in 2025 (14,568 of 26,552 girls), and last-dose coverage 43% in 2025. Among boys, first-dose coverage was 6% in 2023, 7% in 2024 and 8% in 2025. A national analysis for 2022 found 38% of eligible adolescents with a first dose and 26% with a second, from 83% in Adjara to 14% in Shida Kartli, using a different age group from WHO's rows; its authors estimated that 90% coverage could prevent up to 276 cervical cancers over a decade.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Georgia (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine schedule rows for Georgia (API)", url: WHO_HPV_SCHEDULE },
            { label: "Khuntsaria et al., HPV vaccination and cervical cancer control in Georgia (BMC Public Health 2025)", url: "https://doi.org/10.1186/s12889-025-25958-1" },
          ],
        },
      ],
    },
    {
      id: "treatment",
      nav: "Treatment",
      title: "Treatment and radiotherapy",
      aside: { label: "WHO: Cancer Country Profile 2020, Georgia (PDF)", url: WHO_CCP_2020 },
      cards: [
        {
          id: "treatment-mix",
          title: "About one in five new cancers had radiotherapy in 2021, against an estimated need above half",
          plain:
            "By matching registry cases with the national purchaser's records, the disease control centre found that in 2021 about 44% of people with a new cancer had surgery, 28% chemotherapy and 18% radiotherapy. The report sets this beside a US National Cancer Institute estimate that 57% of new cancers in Georgia need radiotherapy.",
          detail:
            "NCDC's 2021 treatment table, built by linking the cancer registry with the Social Service Agency's database, counts surgery for 4,624 patients (44.3%), chemotherapy 2,892 (27.7%), radiotherapy 1,910 (18.3%), hormone therapy 354 and immunotherapy 80, of 10,432 new cases; the report's summary gives radiotherapy as 19.5%. It cites the National Cancer Institute's estimate that 51% of new cancers in Georgia need surgery, 72% chemotherapy and 57% radiotherapy. Among men with lung cancer, 11.1% had surgery and 30.6% radiotherapy; 65.6% of men with laryngeal cancer had radiotherapy. WHO's Cancer Country Profile 2020 recorded 17.1 external beam radiotherapy machines per 10,000 cancer patients in 2019, 19.2 medical physicists per 10,000 patients, bone marrow transplantation generally not available and community palliative care generally not available. WHO Europe's 2024 profile says Georgia has one of the highest numbers of doctors per person in Europe, three times as many in Tbilisi as elsewhere, and an acute shortage of nurses.",
          links: [
            { label: "NCDC: Cancer in Georgia 2015-2021, summary and treatment tables 35, 49 and 55 (PDF)", url: NCDC_REPORT },
            { label: "WHO: Cancer Country Profile 2020, Georgia (PDF)", url: WHO_CCP_2020 },
            { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, section 3 (WHO IRIS)", url: HSIA_2024 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Georgia does",
      title: "What Georgia does differently",
      cards: [
        {
          id: "hcv-liver",
          title: "Linking the cancer registry to a national hepatitis C cure programme",
          plain:
            "Georgia started a national programme to eliminate hepatitis C in 2015, the same year as its cancer registry. Researchers have joined the two, with death records, to follow liver cancer. They found that most people with liver cancer and active hepatitis C had already been treated, often more than a year earlier, so cured patients with liver scarring still need regular checks.",
          detail:
            "A 2026 analysis led from NCDC linked the Georgian Cancer Registry, the vital registration system and the Hepatitis C Elimination Program databases for adult primary liver cancers diagnosed from 2015 to 2022. Of 1,734 cases, 72.0% were men, two thirds were stage 3 or 4 and 80.2% had died by the end of 2022. Hepatitis C testing among liver cancer patients rose from 14.0% in 2015 to 92.8% in 2022; of 654 with active infection, 75.7% had started treatment, 71.7% of them more than a year before the cancer was found, and 72.2% had advanced fibrosis or cirrhosis. The authors call for routine follow-up of treated cirrhotic patients. An earlier case-control study of 2015 to 2019 registry and programme data found 20.1 times the odds of liver cancer in people with hepatitis C (95% CI 15.97 to 25.37), and concluded that hepatitis C alone does not explain the national burden. IARC estimates 588 liver cancers and 512 liver cancer deaths in Georgia in 2024.",
          links: [
            { label: "Khoperia et al., primary liver cancer in Georgia after the launch of the Hepatitis C Elimination Program (PLOS ONE 2026)", url: "https://doi.org/10.1371/journal.pone.0347697" },
            { label: "Surguladze et al., hepatitis C attributable liver cancer in Georgia (BMC Infect Dis 2024)", url: "https://doi.org/10.1186/s12879-024-09916-7" },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Georgia (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "one-system",
          title: "One electronic system for screening, diagnosis, treatment and survival",
          plain:
            "Since 2019 Georgia has used a single electronic system to record cancer screening, diagnosis and treatment, and to update whether each patient is alive. It sends screening invitations and lets doctors, with consent, see a patient's cancer record. Linking it to payment data shows which treatments people actually received.",
          detail:
            "IANPHI's account of NCDC's work describes the Unified Electronic System for Cancer Data Collection, launched in 2019: it is used for the national cervical, breast and colorectal screening programme, invites target groups back to regular screening after a first test, stores screening procedures and results and calculates performance and participation indicators, gives physicians access to patients' electronic data after consent, and is connected to a birth and death module so vital status updates in real time. That linkage let NCDC calculate five-year survival for 2015 to 2019 in 2020, five years after the registry began. NCDC's 2015 to 2021 report uses registry cases matched with the Social Service Agency's database to describe treatment by stage, and the hepatitis C studies on this page link the registry with programme data. IANPHI reports NCDC's next aims as promoting early detection and standard approaches to treatment, the two factors its team linked to low survival.",
          links: [
            { label: "IANPHI: Georgia's cancer registry improves access to high quality data (15 March 2022)", url: IANPHI },
            { label: "NCDC: Cancer in Georgia 2015-2021, treatment section (PDF)", url: NCDC_REPORT },
          ],
        },
        {
          id: "ccan-gbci",
          title: "Tbilisi works with City Cancer Challenge and is one of four cities piloting WHO's breast cancer framework",
          plain:
            "Tbilisi joined City Cancer Challenge in 2019, and in February 2025 the government signed a further four-year agreement with it. City Cancer Challenge names Tbilisi as one of four cities chosen to pilot WHO's Global Breast Cancer Initiative framework, with Kumasi, Cali and Phnom Penh, and the city wrote a breast cancer action plan with WHO.",
          detail:
            "City Cancer Challenge's page for Tbilisi reports, since 2019, 174 health professionals engaged, 25 specialists trained and 12 projects, including guidelines for multidisciplinary cancer management and better use of registry data. Its February 2025 article records a four-year collaboration agreement signed with the government on 13 February 2025, quoting the Minister, after nine projects in the first cycle; the new programme's priorities were presented to the Georgian National Cancer Board, led by the Minister of Health, which endorsed them. It also describes a Global Breast Cancer Initiative workshop that produced a Breast Cancer Action Plan for Tbilisi with WHO, and a consultation on gender barriers in cancer care. In an October 2025 article on C/Can's site, Dr Marina Maglakelidze, an oncologist involved, writes that Tbilisi was selected as one of the first C/Can cities to implement the framework, one of four pilot cities with Kumasi, Cali and Phnom Penh, and that her main role was supporting education and adapting breast cancer clinical guidelines; she reports that in-hospital pharmacies in Tbilisi now secure essential oncology medicines. That claim of being one of the first is her account, not an independent ranking.",
          links: [
            { label: "City Cancer Challenge: Tbilisi, Georgia", url: CCAN },
            { label: "City Cancer Challenge: Tbilisi is leading the way in cancer care reform (21 February 2025)", url: CCAN_2025 },
            { label: "City Cancer Challenge: transforming breast cancer care from the ground up in Tbilisi (2 October 2025)", url: CCAN_GBCI },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-research",
          title: "77 trials in OnCo's records have a site in Georgia, most of them industry trials in lung cancer",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 77 of 5,899 cancer trials list a site in Georgia, 28 of them recruiting. Almost all are run by drug companies, and about two in five involve lung cancer. Seven compare a proposed copy of a cancer antibody with the original medicine.",
          detail:
            "Of the 5,899 trials with participation data in OnCo's graph, 77 list Georgia among their countries: 41 active but not recruiting, 28 recruiting, 5 completed and 3 terminated; 41 are phase 3. AstraZeneca leads 11 and Regeneron 7. About 33 involve lung cancer, including EMPOWER-Lung 1, LUME-Lung 1 and ASTRUM-005, and others cover breast cancer (CAMBRIA, lidERA, INAVO120), stomach and oesophageal cancer (HERIZON-GEA-01), liver cancer, endometrial cancer and head and neck cancer. Seven compare a proposed biosimilar with an originator, such as Keytruda, Opdivo or Avastin. These are the trials OnCo holds, not every study in Georgia; the ClinicalTrials.gov search linked below lists all cancer studies with a site in the country (Georgia the country, not the US state). Georgian researchers at NCDC, Ivane Javakhishvili Tbilisi State University and Petre Shotadze Tbilisi Medical Academy wrote most of the registry, screening and vaccination studies cited on this page. OnCo could not read the regulator's rules for authorising clinical trials; see the gaps.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Georgia (search)", url: CTGOV },
            { label: "Beraia et al., incidence of common cancers in Georgia 2015 to 2019 (Cancer Treat Res Commun 2026)", url: "https://doi.org/10.1016/j.ctarc.2026.101267" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "official-sites",
      title: "The Ministry of Health, the purchaser, the regulator and the legal herald could not be read",
      plain:
        "The health ministry's website and the National Health Agency's returned a bot challenge, the regulator's current website did not resolve, and the national legal database refused a search. So the decrees that set what the cancer package pays for, the list of cancer medicines covered and the managed entry agreements were not read; this page relies on WHO's descriptions of them.",
      detail:
        "On 11 November 2026 moh.gov.ge and the National Health Agency's site answered with a Cloudflare challenge, which OnCo does not bypass; the Internet Archive held only a September 2023 copy of the Ministry's English news list, before the November 2023 cancer changes. The regulator's domains did not resolve, and its home page was read from an August 2021 archived copy in Georgian. Matsne, the legislative herald, returned an access denied page to a search. The November 2023 opening of the cancer package to all residents, the managed entry agreement mechanism and the removal of the GEL 25,000 limit are therefore stated as WHO Europe's 2024 profile records them, not from the Government's own resolutions. A 2021 Lancet Oncology piece on Georgia's expansion of cancer medicines has no abstract and was not used.",
      links: [
        { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition (WHO IRIS)", url: HSIA_2024 },
        { label: "Regulation Agency for Medical and Pharmaceutical Activities: home page (Internet Archive copy, 17 August 2021)", url: RAMA_2021 },
      ],
    },
    {
      id: "oop-conflict",
      title: "Two WHO sources disagree on how much Georgians pay out of pocket",
      plain:
        "WHO's global health spending database, as republished by the World Bank, puts out-of-pocket payments at 51.9% of health spending in 2021, while WHO Europe's 2024 profile of Georgia gives 31.2% for the same year. OnCo could not reconcile them, so both are shown.",
      detail:
        "The World Bank indicator SH.XPD.OOPC.CH.ZS, which reproduces WHO's Global Health Expenditure Database and matched it when checked on 11 November 2026, gives 51.9% for 2021, 57.2% for 2022 and 58.8% for 2023, with domestic government spending at 42.1% of current health spending in 2021. WHO Europe's Health Systems in Action profile, citing WHO's own 2024 data, gives out-of-pocket spending of 31% and public spending of 53% in 2021. Neither source explains the difference. WHO Europe's profile says outpatient medicines are the main driver of out-of-pocket spending and of catastrophic costs for poorer households.",
      links: [
        { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Georgia (API)", url: WB_OOP },
        { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition, section 2 (WHO IRIS)", url: HSIA_2024 },
      ],
    },
    {
      id: "registry-recent",
      title: "No registry figures after 2021, and no reason given for IARC not using the registry",
      plain:
        "The latest English report from Georgia's registry that OnCo found covers 2015 to 2021. OnCo found no later national counts, and no statement from IARC or NCDC on why GLOBOCAN 2024 lists no Georgian data source for incidence.",
      detail:
        "NCDC's file service search returned statistical yearbooks to 2021 and the \"Cancer in Georgia 2015-2021\" report, published in November 2022; no later cancer report was found. IARC's detailed data sources and methods page for Georgia was not read; the method is taken from the fact sheet. The registry's five-year survival uses the direct method, which IANPHI and NCDC themselves describe as a limitation, so its survival figures are not directly comparable with CONCORD or EUROCARE figures, and NCDC's comparison tables draw on a secondary website. Survival for 2018 or later diagnoses was not found.",
      links: [
        { label: "NCDC: Cancer in Georgia 2015-2021 (PDF)", url: NCDC_REPORT },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Georgia (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "OnCo could not find a current count of radiotherapy machines and centres, a published national cancer control plan, the regulator's rules and timelines for registering medicines and authorising trials, or a list of the hospitals that treat cancer under the universal programme.",
      detail:
        "The IAEA's Directory of Radiotherapy Centres loads its country data in an interactive viewer that a plain request does not return, so the only radiotherapy capacity figure here is WHO's 2020 profile (17.1 machines per 10,000 cancer patients in 2019). WHO's 2020 profile recorded a national cancer control plan as under development in 2019; OnCo found no published plan, only City Cancer Challenge's mention of a National Cancer Board. OnCo found no WHO benchmarking result for the regulator and no published registration or trial approval times. Georgia's cancer care is delivered mostly by private hospitals; without an official list, no treatment centres have been added to OnCo's records for this page. NCDC's 2026 screening campaign calendar is a scanned image and was not read.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Georgia (PDF)", url: WHO_CCP_2020 },
        { label: "City Cancer Challenge: Tbilisi is leading the way in cancer care reform (21 February 2025)", url: CCAN_2025 },
      ],
    },
  ],
  institutions: [
    "georgia-ministry-of-health", "ncdc-georgia", "georgia-population-cancer-registry", "georgia-regulation-agency", "georgia-national-health-agency",
    "iarc", "who", "uicc",
  ],
  companies: [],
  drugs: [],
  trials: [
    "empower-lung-1", "lume-lung-1", "astrum-005", "cambria", "lidera", "inavo120", "herizon-gea-01", "nct03755791",
    "nct04892173", "xport-ec-042", "nct06868277", "nct06348199",
  ],
  papers: [
    "paper-beraia-georgia-cancer-incidence-2015-2019-ctarc-2026", "paper-batavani-georgia-early-late-detection-canep-2022",
    "paper-khuntsaria-hpv-vaccination-cervical-georgia-bmcph-2025", "paper-khoperia-liver-cancer-hcv-elimination-georgia-plosone-2026",
    "paper-surguladze-hcv-attributable-liver-cancer-georgia-bmcid-2024", "paper-kakhniashvili-cancer-financial-burden-georgia-cancer-control-2025",
    "paper-irzaldy-breast-screening-georgia-vhri-2024", "paper-topuridze-phc-cancer-screening-georgia-ejgp-2025", "paper-kiguradze-hpv-test-vs-pap-tbilisi-cejph-2024",
  ],
  people: [],
  how:
    "Every card was written from Georgian official sources and WHO reviews, read in full rather than through a summary: the National Center for Disease Control and Public Health's report \"Cancer in Georgia 2015-2021\" and its news item on the registry; IANPHI's article on the registry; WHO Europe's 2024 Health Systems in Action profile, its 2021 financial protection review and its 2017 health system review; WHO's Cancer Country Profile 2020; WHO's HPV coverage, introduction and schedule rows from its public data API; the World Bank's out-of-pocket series; City Cancer Challenge's Tbilisi pages; the regulator's 2021 home page through the Internet Archive; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, NCDC, the registry, the regulator, the purchaser and nine papers) carry their own sources.",
  verify:
    "National incidence differs between Georgia's registry and IARC's estimate, which does not use the registry. What the Universal Health Care Programme pays for, the co-payment for your group and which cancer medicines are reimbursed change by government resolution; ask the treating hospital or the National Health Agency what applies to you. WHO's 2021 review says Georgia's state disease programmes are usually free at the point of use; ask a primary care provider in the state screening programme what applies to you.",
  verifyLinks: [
    { label: "National Center for Disease Control and Public Health", url: "https://www.ncdc.ge/" },
    { label: "Ministry of Health of Georgia", url: "https://www.moh.gov.ge/" },
    { label: "WHO Europe: Health Systems in Action, Georgia, 2024 edition", url: HSIA_2024 },
    { label: "NCDC: Cancer in Georgia 2015-2021 (PDF)", url: NCDC_REPORT },
  ],
};
