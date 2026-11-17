import type { CountryDive } from "@/data/country-dive";

/**
 * Mongolia deep dive: the hand-written cards for /countries/mn/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Mongolia (PDF text);
 * the National Cancer Center's registry report "Улсын хэмжээний хорт хавдрын үзүүлэлт 2024" (national cancer
 * indicators 2024, 90 pages, PDF text in Mongolian, downloaded from the centre's own site) and its return of breast
 * and cervical early detection for the first quarter of 2025 (PDF text, Internet Archive copy); the centre's English
 * "about" page and its list of registry reports (Internet Archive copies of July and August 2026); the English text of
 * the Cancer Prevention and Control Program 2025-2028 on the ICCP Portal (PDF text); the Health Insurance General
 * Office's mission page and its tariff for cancer day treatment (emd.gov.mn, in Mongolian); the medicines regulator's
 * home, activity and registration pages (mmra.gov.mn, in Mongolian); WHO Mongolia's releases of 22 April 2025 and
 * 18 August 2026 on cervical cancer and its feature of 13 July 2026 on HPV vaccination; WHO Western Pacific's case
 * study of the Healthy Liver Programme and WHO's feature of 17 May 2018; the IAEA's country sheet for Mongolia (PDF
 * text) and its news item of 12 September 2024 (Internet Archive copy, the live page answered 403); the IAEA DIRAC
 * country row (JSON endpoint); WHO's immunisation data API; the World Bank's health expenditure series; WHO's Cancer
 * Country Profile 2020 (PDF text); the ClinicalTrials.gov API; and the papers' abstracts through Europe PMC.
 *
 * The National Cancer Center's site reset most plain requests on the day: one report was downloaded, and the newest
 * one (incidence and mortality, 2025) was not. What could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/496-mongolia-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mng-2020.pdf";
const NCC_ABOUT_IA = "https://web.archive.org/web/20260715164241/http://www.cancer-center.gov.mn/about-us/english/";
const NCC_REGISTRY_LIST = "https://www.cancer-center.gov.mn/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/st/";
const NCC_REGISTRY_LIST_IA = "https://web.archive.org/web/20260811015208/http://www.cancer-center.gov.mn/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/%d0%b8%d0%bb-%d1%82%d0%be%d0%b4-%d0%b1%d0%b0%d0%b9%d0%b4%d0%b0%d0%bb/st/";
const NCC_REPORT_2024 = "https://www.cancer-center.gov.mn/download/st-2/";
const NCC_REPORT_2025 = "https://www.cancer-center.gov.mn/download/cancer2025/";
const NCC_EARLY_Q1_2025_IA = "https://web.archive.org/web/20260131064947/https://www.cancer-center.gov.mn/download/st-3/?wpdmdl=15953";
const NCCP = "https://www.iccp-portal.org/sites/default/files/2026-01/NCCP%20Mongolia%202025-2028.pdf";
const EMD = "https://emd.gov.mn/";
const EMD_ABOUT = "https://emd.gov.mn/about";
const EMD_CANCER_DAY = "https://emd.gov.mn/service/115";
const EMD_DISCOUNT = "https://emd.gov.mn/pages/13";
const MMRA = "https://mmra.gov.mn/";
const MMRA_REGISTRATION = "https://mmra.gov.mn/?id=226";
const MMRA_ACTIVITY = "https://mmra.gov.mn/?id=200005";
const MOH = "https://moh.gov.mn/";
const HDC = "https://hdc.gov.mn/";
const WHO_CERVICAL_2026 = "https://www.who.int/mongolia/news/detail/18-08-2026-ministry-of-health-government-of-japan-and-who-join-hands-to-advance-cervical-cancer-elimination-in-mongolia";
const WHO_CERVICAL_2025 = "https://www.who.int/mongolia/news/detail/22-04-2025-mongolia-launches-national-programme-to-eliminate-cervical-cancer";
const WHO_HPV_PIE = "https://www.who.int/mongolia/news/feature-stories/detail-wpro/mongolia-conducts-evaluation-for-hpv-vaccines-roll-out";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27MNG%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29";
const WHO_HEP_CASES = "https://www.who.int/westernpacific/health-topics/hepatitis/implementation-progress-of-the-regional-action-plan-for-viral-hepatitis-in-the-western-pacific-2016-2020/case-studies-progress-and-innovations";
const WHO_HEP_2018 = "https://www.who.int/australia/news/feature-stories/detail/action-on-hepatitis-in-mongolia";
const IAEA_SHEET = "https://www.iaea.org/sites/default/files/20/10/tc-mongolia.pdf";
const IAEA_IMPACT_IA = "https://web.archive.org/web/20240929183619/https://www.iaea.org/newscenter/news/mongolia-takes-steps-to-enhance-cancer-detection-and-treatment-capacities";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=MN";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=MN";
const WB_GDP = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=MN";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=MN";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&country=Mongolia";
const P_REGISTRY_2017 = "https://doi.org/10.1002/ijc.30463";
const P_CERVIX_2026 = "https://doi.org/10.3389/fonc.2026.1853617";
const P_CRC_2024 = "https://doi.org/10.31557/apjcp.2024.25.7.2305";
const P_HEP_2022 = "https://doi.org/10.3390/vaccines10111928";
const P_LINAC_2021 = "https://doi.org/10.1111/1754-9485.13254";
const P_BREAST_DELAY_2026 = "https://doi.org/10.3390/healthcare14193270";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Mongolia (PDF)", url: IARC_FACTSHEET };
const L_REPORT_2024 = { label: "National Cancer Center: Улсын хэмжээний хорт хавдрын үзүүлэлт 2024 (national cancer indicators 2024, download page, in Mongolian)", url: NCC_REPORT_2024 };
const L_NCCP = { label: "ICCP Portal: Cancer Prevention and Control Program 2025-2028, Mongolia (English text, PDF)", url: NCCP };
const L_WHO_PROFILE = { label: "WHO: Cancer Country Profile 2020, Mongolia (PDF)", url: WHO_PROFILE };

export const MN_DIVE: CountryDive = {
  iso2: "MN",
  iso3: "MNG",
  name: "Mongolia",
  flag: "🇲🇳",
  asOf: "2026-11-16",
  title: "Cancer in Mongolia",
  description:
    "Cancer in Mongolia: a national registry that counted 8,169 new cancers and 4,755 cancer deaths in 2024, liver cancer first in both men and women, IARC's 2024 estimate and how it is built, a health insurance fund whose tariff shows no patient charge for chemotherapy and radiotherapy day treatment, the medicines regulator, the Cancer Prevention and Control Program 2025 to 2028, HPV vaccination since 2024, the one radiotherapy centre in the IAEA's directory, and the sources OnCo could not read.",
  lede:
    "Liver cancer is the commonest cancer in Mongolia in both men and women, and stomach cancer is second when men and women are counted together. The National Cancer Center in Ulaanbaatar keeps a registry of the whole country, and the national cancer programme says that weak capacity in local hospitals sends patients to it. A health insurance fund pays hospitals for cancer treatment.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Mongolia is 7,240 new cancers and 5,015 deaths, an age-standardised incidence of 239.8 per 100,000 (304.0 in men, 193.1 in women) and mortality of 170.7. IARC's fact sheet lists its country-specific source for incidence as \"No data\": it estimates new cases from national mortality, using modelled ratios of deaths to cases built from registry survival data. For deaths it uses national figures reported to WHO, with trends projected to 2024. So IARC's incidence is a model built on deaths, not a count. Mongolia's own registry counted 8,169 new cancers and 4,755 cancer deaths in 2024, more cases and fewer deaths than IARC's estimate, and put the age-standardised incidence at 264.0 per 100,000.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Mongolia",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "IARC's estimate: 7,240 new cancers in 2024, three in ten of them liver cancer",
          plain:
            "IARC estimates 7,240 new cancers and 5,015 cancer deaths in Mongolia in 2024, among about 3.5 million people. Liver cancer is the commonest in both men and women, and stomach and lung cancer come next when men and women are counted together. IARC builds its figure for new cases from deaths, not from a count of diagnoses.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,230 liver cancers (30.8% of all new cancers; 1,867 deaths), 1,004 stomach cancers (811 deaths), 710 lung cancers (578 deaths), 391 breast cancers (100 deaths), 353 oesophageal cancers (312 deaths), 349 colorectal cancers and 234 cervical cancers. IARC's age-standardised rates per 100,000 are 75.3 for liver cancer incidence and 63.9 for liver cancer mortality, and 33.1 and 27.6 for stomach cancer. The risk of developing a cancer before age 75 is 23.5% (29.9% in men, 18.4% in women), and an estimated 13,692 people are living within five years of a diagnosis. Method, in IARC's words: incidence from \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", with the country-specific data source given as \"No data\"; mortality from \"Trends in national rates projected to 2024\", source \"WHO (national)\".",
          links: [L_IARC],
        },
        {
          id: "registry",
          title: "A national registry at the National Cancer Center: 8,169 new cancers counted in 2024",
          plain:
            "Mongolia has a cancer registry for the whole country, kept by a unit of the National Cancer Center in Ulaanbaatar. Its report for 2024 counted 8,169 new cancers and 4,755 cancer deaths. Hospitals in every province and district report each new cancer on a standard form.",
          detail:
            "The report \"Улсын хэмжээний хорт хавдрын үзүүлэлт 2024\" says new cases are reported on form AM-5 (site, morphology, TNM stage, treatment) and deaths taken from death certificates (form AM-7), mainly by the regional diagnostic and treatment centres, the 21 provincial general hospitals, the nine district health centres of Ulaanbaatar, some specialised hospitals and the Songdo, Intermed and Seoul hospitals, under orders of the Minister of Health of 2013, 2014 and 2019. It counted 6,702 new cancers in 2020, 5,981 in 2021, 6,885 in 2022, 7,244 in 2023 and 8,169 in 2024. The crude rate for 2024 was 238.9 per 100,000 (242.3 in men, 235.7 in women) and the age-standardised rate 264.0. Quality measures the report gives for 2024: 58.1% of cases confirmed by morphology (40.8% for liver cancer, 96.5% for breast cancer), 5% known from a death certificate only, 0.2% with an unknown primary site. Deaths rose by 199 on the year before; the crude death rate was 139.1 per 100,000 (163.3 in men, 115.5 in women). A newer report, on incidence and mortality in 2025, is listed on the centre's site but OnCo could not download it.",
          links: [
            L_REPORT_2024,
            { label: "National Cancer Center: list of national cancer registry reports (in Mongolian)", url: NCC_REGISTRY_LIST },
            { label: "The same list, Internet Archive copy of August 2026", url: NCC_REGISTRY_LIST_IA },
            { label: "Chimed and colleagues: results from the National Cancer Registry 2008 to 2012 (Int J Cancer 2017)", url: P_REGISTRY_2017 },
          ],
        },
        {
          id: "liver",
          title: "Liver cancer: 2,364 registered cases in 2024, and widespread hepatitis B and C infection",
          plain:
            "The registry counted 2,364 new liver cancers in 2024, 28.9% of all cancers, and liver cancer caused 35.9% of cancer deaths. A national survey found about 8% of people aged 10 to 64 infected with hepatitis B and about 9% with hepatitis C. WHO calls chronic hepatitis a key risk factor for liver cancer.",
          detail:
            "The registry's 2024 report gives a crude liver cancer rate of 77.4 per 100,000 men and 61.1 per 100,000 women, and an age-standardised rate of 79.0 for both sexes (100.7 in men, 62.1 in women); IARC's estimate for 2024 is 75.3. Stomach cancer follows at 53.6 per 100,000 men and 24.3 per 100,000 women (crude). The report, citing IARC's figures for 2022, states that Mongolia ranks first in the world for the incidence and mortality rates of liver and stomach cancer and third for oesophageal cancer; that is the registry's statement, and OnCo has not checked the ranking itself. WHO's wording is from its feature of 17 May 2018 on Mongolia. The hepatitis figures are from the baseline survey of a nationwide cancer cohort study (Vaccines, 2022): among 10,040 participants aged 10 to 64, 8.1% had hepatitis B infection, 9.4% hepatitis C and 0.4% both, and many, especially younger adults and men, did not know they were infected. The registry paper for 2008 to 2012 reported age-standardised liver cancer rates of 114.7 per 100,000 men and 74.6 per 100,000 women.",
          links: [
            L_REPORT_2024,
            L_IARC,
            { label: "Dambadarjaa and colleagues: hepatitis B, C and D infection among people aged 10 to 64 in Mongolia (Vaccines 2022)", url: P_HEP_2022 },
            { label: "WHO: Action on hepatitis in Mongolia, 17 May 2018", url: WHO_HEP_2018 },
            { label: "Chimed and colleagues: results from the National Cancer Registry 2008 to 2012 (Int J Cancer 2017)", url: P_REGISTRY_2017 },
          ],
        },
        {
          id: "stage",
          title: "Stage at diagnosis, children, and people living after cancer in the registry's 2024 report",
          plain:
            "Of the ten commonest cancers registered in 2024, 36.3% were found at an early stage and 63.7% at a late stage. The registry recorded 148 new cancers in children and young people aged 0 to 19. At the end of 2024, 32,096 people with a cancer diagnosis were under follow-up by cancer doctors across the country.",
          detail:
            "The stage figures are the registry's, for the ten leading sites, using TNM stage as reported on the notification form. Among people aged 0 to 19 the report gives 148 new cancers and 66 cancer deaths in 2024; leukaemia made up 38% of the new cases and brain and nervous system tumours 18%. Of the 32,096 people under follow-up, 20,097 were women and 610 were aged 0 to 19, and 42.7% (13,705 people) had lived five years or more since diagnosis; cervical cancer accounted for 24% of that group, liver cancer 17%, stomach cancer 11% and breast cancer 9%. That 42.7% is a share of the people currently under follow-up, not a five-year survival rate, and the report should not be read as giving one. By province, the 2024 crude incidence ran from 120.1 per 100,000 in Umnugovi to 346.7 in Bulgan. A 2026 study of women with symptoms who were newly diagnosed with breast cancer at the National Cancer Center between 2022 and 2024 found that 169 of them (69.3%) had waited a month or more before first seeing a doctor.",
          links: [
            L_REPORT_2024,
            { label: "Dalkhjav and colleagues: presentation delay among breast cancer patients in Mongolia (Healthcare 2026)", url: P_BREAST_DELAY_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "mn-registry",
          title: "What the national registry counted, 2020 to 2024",
          caption: "New cancers registered in Mongolia by site, in 2020, 2022 and 2024, with the share of 2024 cases confirmed by morphology. Counts of cases.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "y2020", label: "2020", numeric: true },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2024", label: "2024", numeric: true },
            { key: "mv", label: "Confirmed by morphology, 2024 (%)", numeric: true },
          ],
          rows: [
            { site: "Liver (C22)", y2020: 2183, y2022: 2286, y2024: 2364, mv: 40.8 },
            { site: "Stomach (C16)", y2020: 1118, y2022: 1181, y2024: 1326, mv: 67.3 },
            { site: "Lung (C34)", y2020: 507, y2022: 521, y2024: 549, mv: 37.5 },
            { site: "Cervix (C53)", y2020: 480, y2022: 318, y2024: 521, mv: 85.4 },
            { site: "Colon and rectum", y2020: 262, y2022: 306, y2024: 413, mv: 66.1 },
            { site: "Breast (C50)", y2020: 244, y2022: 283, y2024: 401, mv: 96.5 },
            { site: "Oesophagus (C15)", y2020: 312, y2022: 342, y2024: 364, mv: 56.3 },
            { site: "Other sites", y2020: 1596, y2022: 1648, y2024: 2231, mv: 61.4 },
            { site: "All cancers", y2020: 6702, y2022: 6885, y2024: 8169, mv: 58.1 },
          ],
          note: "From table 1 of the National Cancer Center's report for 2024. These are registered new cases, not deaths. A low share confirmed by morphology, as for liver and lung cancer, means many diagnoses rest on imaging or blood tests without a tissue sample. The registry counted 4,755 cancer deaths in 2024.",
          sources: [L_REPORT_2024],
        },
        {
          id: "mn-hpv",
          title: "HPV vaccination coverage reported to WHO",
          caption: "Programme coverage in the yearly target group, by sex, as held in WHO's immunisation database. Per cent, with doses given and children targeted.",
          columns: [
            { key: "year", label: "Year" },
            { key: "girls", label: "Girls (%)", numeric: true },
            { key: "girlsDoses", label: "Girls: doses of target" },
            { key: "boys", label: "Boys (%)", numeric: true },
            { key: "boysDoses", label: "Boys: doses of target" },
          ],
          rows: [
            { year: "2021 to 2023", girls: null, girlsDoses: "no figure", boys: null, boysDoses: "no figure" },
            { year: "2024", girls: 25, girlsDoses: "9,651 of 38,526", boys: 25, boysDoses: "10,314 of 41,168" },
            { year: "2025", girls: 53, girlsDoses: "21,198 of 40,353", boys: 53, boysDoses: "22,547 of 42,922" },
          ],
          note: "WHO's first-dose and last-dose rows carry the same figures, which fits the one-dose schedule WHO describes for Mongolia. These are administrative figures reported by the country.",
          sources: [{ label: "WHO immunisation data API: HPV programme coverage rows for Mongolia", url: WHO_HPV_API }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 360 a person on health in 2023, and nearly half of it paid out of pocket",
          plain:
            "Mongolia spent about 360 US dollars a person on health in 2023. Households paid 48.8% of that directly, according to the World Bank's series from WHO's health expenditure database, and government sources paid 45.0%. The out-of-pocket share has moved a lot from year to year.",
          detail:
            "The World Bank's figures for out-of-pocket spending as a share of current health spending are 43.1% in 2019, 43.7% in 2020, 30.9% in 2021, 38.9% in 2022 and 48.8% in 2023. Current health spending per person was USD 198 in 2019, 330 in 2021, 448 in 2022 and 360 in 2023, which was 6.1% of GDP in 2023 (8.9% in 2022). Domestic general government spending was 58.4% of current health spending in 2021, 35.2% in 2022 and 45.0% in 2023. The series does not explain the swings, which span the pandemic years; OnCo reports the figures without an explanation. These are national averages for all health care and say nothing about what a person with cancer pays.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Mongolia", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Mongolia", url: WB_CHE },
            { label: "World Bank: current health expenditure, % of GDP, Mongolia", url: WB_GDP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Mongolia", url: WB_GOV },
          ],
        },
        {
          id: "insurance",
          title: "The health insurance fund's tariff shows no patient charge for chemotherapy and radiotherapy day treatment",
          plain:
            "A government agency, the Health Insurance General Office, runs the health insurance fund and pays hospitals under contract. Its published tariff for cancer day treatment lists chemotherapy, targeted therapy and radiotherapy with the whole listed price paid by the insurance and nothing by the patient.",
          detail:
            "The office (Эрүүл мэндийн даатгалын ерөнхий газар) states its mission as enrolling every Mongolian in health insurance and buying good-quality care for insured people. Its page for \"Хорт хавдрын хими, туяаны өдрийн эмчилгээ\" (cancer chemotherapy and radiotherapy day treatment) has four rows, each showing what the insurance pays, what the citizen pays and the total: chemotherapy day treatment 450,000; targeted therapy day treatment (\"бай эмчилгээ\") 4,000,000; simple radiotherapy 66,000; radiotherapy on a linear accelerator 350,000. The citizen's column is 0 in each row. The page prints no currency and does not say whether an amount is for a day, a cycle or a course, so OnCo gives the numbers as printed. It lists 17 contracted providers, among them the National Cancer Center, the three state central hospitals, the National Center for Maternal and Child Health and district health centres in Ulaanbaatar. The tariff covers day treatment only. OnCo did not read the rules for inpatient cancer surgery, diagnostic tests or medicines taken at home, or what people without insurance pay.",
          links: [
            { label: "Health Insurance General Office: cancer chemotherapy and radiotherapy day treatment, tariff and providers (in Mongolian)", url: EMD_CANCER_DAY },
            { label: "Health Insurance General Office: mission (in Mongolian)", url: EMD_ABOUT },
            { label: "Health Insurance General Office (in Mongolian)", url: EMD },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator, and how medicines are paid for",
      cards: [
        {
          id: "regulator-agency",
          title: "A government agency registers medicines, and a public register shows which are approved",
          plain:
            "Mongolia's medicines regulator is the Medicines and Medical Devices Control and Regulatory Agency, a government agency in Ulaanbaatar. It registers the medicines used in the country, and its site says anyone can look a medicine up in an online register called Licemed.",
          detail:
            "The agency's own name is Эм, эмнэлгийн хэрэгслийн хяналт, зохицуулалтын газар (ЭЭХХЗГ), and its site calls it a government implementing agency. Its registration page says medicines, diagnostics and biologically active products for treatment and diagnosis in Mongolia are registered, renewed and varied on the basis of evidence-based quality and safety documents and test results. Decisions are taken at meetings of the Эмийн зөвлөл (medicines council), and the agency posts the list of medicines decided at each meeting; the latest lists posted were for the meetings of January, March and May 2026. The site's question-and-answer page says a medicine's official registration can be checked in the Licemed electronic register by international or trade name, and the site has a page for reporting side effects. OnCo did not read the medicines law itself or any rule on how clinical trials are authorised, and could not open the Licemed register (its address failed a certificate check).",
          links: [
            { label: "ЭЭХХЗГ: registration activity and medicines council decisions (in Mongolian)", url: MMRA_REGISTRATION },
            { label: "ЭЭХХЗГ: activities and frequently asked questions (in Mongolian)", url: MMRA_ACTIVITY },
            { label: "ЭЭХХЗГ: home page (in Mongolian)", url: MMRA },
          ],
        },
        {
          id: "reimbursement",
          title: "Paying for cancer medicines: an insurance tariff for day treatment, and free medicines for children through a WHO platform",
          plain:
            "Registration and payment are separate steps. The health insurance fund's tariff lists a set amount for chemotherapy day treatment and for targeted therapy day treatment. The national cancer programme says Mongolia receives 35 essential childhood cancer medicines free of charge for five years through a WHO, UNICEF and St. Jude programme. OnCo did not find a list of which cancer medicines the fund pays for.",
          detail:
            "The Health Insurance General Office's tariff has one row for chemotherapy day treatment and a separate, higher row for targeted therapy day treatment, both with no patient share; it does not name medicines. The Cancer Prevention and Control Program 2025-2028 says that in 2007 chemotherapy and targeted therapy were given at the National Cancer Center alone, and that in 2023 26 health care organisations gave chemotherapy and 17 gave targeted therapy. It also says WHO, UNICEF and St. Jude Children's Research Hospital are providing 35 types of essential medicines for childhood cancer free of charge for 2025 to 2029 through the Global Platform for Access to Childhood Cancer Medicines, and the programme's actions include expanding mutation testing to direct targeted therapy. The insurer's page on discounted medicine prices returned an empty page to a plain request, so OnCo cannot say which cancer medicines are on a reimbursement list, how a newly registered medicine gets onto it, or what patients pay for medicines outside the tariff.",
          links: [
            { label: "Health Insurance General Office: cancer chemotherapy and radiotherapy day treatment tariff (in Mongolian)", url: EMD_CANCER_DAY },
            { label: "Health Insurance General Office: discounted medicine prices (page returned no list)", url: EMD_DISCOUNT },
            L_NCCP,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Mongolia: cervical cancer elimination, 18 August 2026", url: WHO_CERVICAL_2026 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening by smear test since 2012, now moving to HPV testing at ages 30 and 40",
          plain:
            "Mongolia has screened for cervical cancer with smear tests since 2012. In April 2025 it launched a programme to eliminate cervical cancer, and it is moving to HPV DNA testing for women aged 30 and 40. A 2025 pilot in one district of Ulaanbaatar tested 5,382 women.",
          detail:
            "The National Cancer Center's return for the first three months of 2025 counts 24,988 women of target age screened by smear test, 10.4% of the target group, with 3.7% of smears positive and no new cancer registered from them. A 2026 paper puts screening coverage at around 38%, and the 2025 to 2028 programme gives 38.6% as its baseline for cervical cancer and sets targets of at least 50% in 2026 and 70% in 2028. WHO's release of 18 August 2026 reports that the pilot of HPV DNA testing in Khan-Uul district found 371 HPV-positive women, 9 precancerous lesions and 7 stage 0 cancers among 5,382 screened; that more than 740 health workers from all 21 provinces and the 9 districts of Ulaanbaatar were trained between March and July 2026; and that Japan funded 20,000 HPV DNA test kits and 75 pieces of equipment, with a portable colposcope, a LEEP generator and a thermal ablation device for each province. The same release quotes the Minister of Health: 521 women were newly diagnosed and 167 died of cervical cancer in 2024. The paper, using the national health information system, shows recorded cases falling from 479 in 2016 to 145 in 2022 and rising to 541 in 2024, which its authors attribute to interrupted screening and diagnosis during the pandemic.",
          links: [
            { label: "WHO Mongolia: Ministry of Health, Japan and WHO advance cervical cancer elimination, 18 August 2026", url: WHO_CERVICAL_2026 },
            { label: "WHO Mongolia: launch of the Cervical Cancer Elimination Programme, 22 April 2025", url: WHO_CERVICAL_2025 },
            { label: "National Cancer Center: breast and cervical early detection, first quarter of 2025 (PDF, Internet Archive copy, in Mongolian)", url: NCC_EARLY_Q1_2025_IA },
            { label: "Tsogtgerel and colleagues: cervical cancer trends in Mongolia, 2014 to 2024 (Front Oncol 2026)", url: P_CERVIX_2026 },
            L_NCCP,
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2024, one dose for girls and boys; 53% coverage reported for 2025",
          plain:
            "Mongolia added the HPV vaccine to its national immunisation programme in 2024, as a single dose for both girls and boys. WHO's database shows 25% coverage of the target group in 2024 and 53% in 2025. The national aim is 90%.",
          detail:
            "WHO's immunisation data API holds no coverage figure for Mongolia for 2021 to 2023. For 2024 it gives 25% for girls (9,651 doses for a target of 38,526) and 25% for boys (10,314 of 41,168); for 2025, 53% for girls (21,198 of 40,353) and 53% for boys (22,547 of 42,922). WHO's feature of 13 July 2026 says more than 177,000 children aged 11 to 14 had been vaccinated by the first quarter of 2026, and describes a post-introduction evaluation that found misinformation spreading on social media early in the roll-out, weak engagement of some schools, particularly private ones, and gains from catch-up vaccination. It also refers to lessons from an earlier HPV introduction in 2012. WHO's August 2026 release gives coverage by May 2026 as 48.6% of children born in 2013, 61.0% of those born in 2014 and 58.4% of those born in 2015. The 2025 to 2028 programme sets 90% of target groups immunised against HPV as an expected result.",
          links: [
            { label: "WHO immunisation data API: HPV programme coverage rows for Mongolia", url: WHO_HPV_API },
            { label: "WHO Mongolia: evaluation of the HPV vaccine roll-out, 13 July 2026", url: WHO_HPV_PIE },
            { label: "WHO Mongolia: cervical cancer elimination, 18 August 2026", url: WHO_CERVICAL_2026 },
          ],
        },
        {
          id: "early-detection",
          title: "Breast checks by clinical examination, and a plan to add liver, stomach, bowel and lung",
          plain:
            "Breast cancer early detection in Mongolia has relied on a clinical breast examination: 154,045 women were examined in the first three months of 2025. The national programme for 2025 to 2028 sets out early detection routes for seven cancers and has the objective of enrolling at least 50% of target groups, with a lower target for lung cancer.",
          detail:
            "The National Cancer Center's return for the first quarter of 2025 counts 154,045 women examined, 329 of them (0.2%) with a positive clinical examination, and no new cancer registered from them. The programme's early detection charts name these target groups: for liver cancer, people over 18, starting with those never tested for viral hepatitis, using hepatitis B and C tests, the blood marker AFP and ultrasound; for stomach and oesophageal cancer, people over 40, by endoscopy; for colorectal cancer, people over 45, by a stool blood test every two years; for lung cancer, people over 50 who have smoked for more than 15 years, by low-dose CT; for breast cancer, women aged 40 to 70, by ultrasound and mammography every two years. Its targets for the share of each group enrolled are at least 30% in 2026 and 50% in 2028 for liver, stomach, oesophageal and colorectal cancer, 20% and 40% for lung cancer, and 50% and 70% for breast and cervical cancer. These are plans in a programme document; OnCo found no figures yet on how far the newer routes are running. WHO's 2020 profile recorded, for 2019, an organised cervical screening programme by smear test with participation between 10% and 50%.",
          links: [
            { label: "National Cancer Center: breast and cervical early detection, first quarter of 2025 (PDF, Internet Archive copy, in Mongolian)", url: NCC_EARLY_Q1_2025_IA },
            L_NCCP,
            L_WHO_PROFILE,
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Mongolia",
      cards: [
        {
          id: "plan",
          title: "The Cancer Prevention and Control Program 2025 to 2028: six objectives and seven priority cancers",
          plain:
            "Mongolia's cancer programme for 2025 to 2028 is published in English on the ICCP Portal; OnCo did not read the order that approved it. It aims to prevent more cancers, find them earlier, treat more people outside the capital, improve palliative care and the registry, and train more staff. It has separate chapters for liver, stomach, oesophageal, colorectal, lung, breast and cervical cancer.",
          detail:
            "The English text on the ICCP Portal is headed as an attachment to an order of the Minister of Health of 2025, with the order number and date left blank, so OnCo cannot give the order that approved it. Its six objectives are primary prevention; early detection for at least 50% of target groups; decentralised diagnosis and treatment; rehabilitation and palliative care; registration and research; and human resources. Expected results include 90% of target groups immunised against HPV and more than 80% against hepatitis B, more provincial and district general hospitals able to do cancer surgery, and the registry software (CanReg-Mon) upgraded. Financing is to come from the state and local budgets, the Health Insurance Fund, the Health Promotion Fund and international partners. The National Cancer Center reports yearly to a steering committee, and the Ministry of Health is to evaluate the programme in 2026 and in the first quarter of 2029. The text lists the plans that came before it, from a Cancer Control Program of 1997 to 2005 onwards. An IAEA, WHO and IARC review mission visited in May 2024 and its findings were expected to inform the new plan; the IAEA lists an earlier review in 2009.",
          links: [
            L_NCCP,
            { label: "IAEA: Mongolia takes steps to enhance cancer detection and treatment capacities, 12 September 2024 (Internet Archive copy)", url: IAEA_IMPACT_IA },
            { label: "IAEA: technical cooperation country sheet, Mongolia (PDF)", url: IAEA_SHEET },
          ],
        },
        {
          id: "hepatitis",
          title: "A national hepatitis programme that tested and treated through health insurance",
          plain:
            "WHO describes chronic hepatitis as a key risk factor for liver cancer. The government launched the Healthy Liver Programme in 2017 to test the population for hepatitis B and C and treat those infected. WHO reported that in its first year 47% of people aged 40 to 65 were screened, and that health insurance covered testing and treatment.",
          detail:
            "WHO Western Pacific's case study says the Healthy Liver Programme 2017 to 2020 began with nationwide hepatitis B and C screening of people aged 40 to 65 and extended to everyone aged 15 and over in its second year, with targets for hepatitis C of 80% diagnosed, 80% treated and 90% cured by 2020. From May 2017 to May 2018, 47% of people aged 40 to 65 were screened for each virus, 75% of those found to carry hepatitis B were receiving treatment and 73% of those diagnosed with hepatitis C received treatment. WHO's feature of 17 May 2018 quotes the director of the WHO Collaborating Centre for Viral Hepatitis saying Mongolians \"are leading the world in implementing viral hepatitis screening of the entire population\". The National Cancer Center's English page lists a subprogramme on screening and early detection of liver cancer for 2013 to 2016 and \"Healthy liver for Mongolians\" since 2016. These WHO figures are from 2018. OnCo found no later official figures on how many people have been tested, treated or cured, and the 2025 to 2028 cancer programme adds hepatitis B vaccination of at-risk groups and an early detection route for liver cancer that starts from hepatitis testing.",
          links: [
            { label: "WHO Western Pacific: viral hepatitis case studies, Mongolia", url: WHO_HEP_CASES },
            { label: "WHO: Action on hepatitis in Mongolia, 17 May 2018", url: WHO_HEP_2018 },
            { label: "National Cancer Center of Mongolia: English page (Internet Archive copy of 15 July 2026)", url: NCC_ABOUT_IA },
            L_NCCP,
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: one centre in the IAEA's directory, with six high-energy treatment units",
          plain:
            "The IAEA's directory of radiotherapy centres counts one centre in Mongolia, with six high-energy photon and electron beam units. Its country row does not name the centre or its city. A 2021 paper reports that a linear accelerator was commissioned at the National Cancer Center in Ulaanbaatar in 2019.",
          detail:
            "The IAEA DIRAC country row for Mongolia, last updated 2025, gives one radiotherapy centre (field RTCenters), 6 in the field for high-energy photon and electron beam units, 1 X-ray generator and 0 for proton or ion therapy. Its separate fields for linear accelerators and cobalt-60 units read 0, and its two brachytherapy fields disagree: one reads \"No\" and the other reads 1. The row does not name the centre or say where it is, and OnCo did not read the centre-level entry, so the directory row cannot show whether any radiotherapy is given outside Ulaanbaatar. A 2021 paper by Australian and Mongolian radiation oncology teams reports that a linear accelerator was commissioned at the National Cancer Center in 2019 and three-dimensional conformal planning introduced. The 2025 to 2028 programme says an Austrian government project that began in 2020 supported linear accelerators, intensity-modulated and volumetric arc radiotherapy and stereotactic body radiotherapy. The IAEA's country sheet records a brachytherapy unit costing 400,000 euros bought for the centre and a PET-CT scanner installed there in March 2023 with IAEA support. The IAEA's news item of 12 September 2024 reports that in September 2023 Mongolia signed an agreement with the Korea Institute of Radiological and Medical Sciences and the IAEA to strengthen its nuclear medicine and radiation oncology. The programme's actions include preparing a project for a second National Cancer Center. WHO's 2020 profile recorded 8.9 external beam units per 10,000 cancer patients in 2019. OnCo found no source describing how patients from the provinces reach radiotherapy or whether travel and lodging are supported.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Koh and colleagues: 3D conformal radiotherapy at the National Cancer Centre Mongolia (J Med Imaging Radiat Oncol 2021)", url: P_LINAC_2021 },
            { label: "IAEA: technical cooperation country sheet, Mongolia (PDF)", url: IAEA_SHEET },
            { label: "IAEA: news item of 12 September 2024 (Internet Archive copy)", url: IAEA_IMPACT_IA },
            L_NCCP,
            L_WHO_PROFILE,
          ],
        },
        {
          id: "decentralising",
          title: "Patients flow to one national centre, and the plan is to spread care to the provinces",
          plain:
            "The National Cancer Center in Ulaanbaatar was established in 1961. The national programme says that weak capacity in local hospitals sends patients to it, which leads to long waits, and sets out to build up cancer care in provincial and district hospitals.",
          detail:
            "The centre's English page says it was established in 1961 as a radiation therapy hospital with 45 beds, moved into a new building in 1982, and has 12 units and 18 clinical departments with about 116 oncology doctors and 242 nurses; the page is undated and those staff numbers may be old. The 2025 to 2028 programme says that in 2023 chemotherapy was available at 26 organisations (the centre, 2 specialised hospitals, 5 district and 13 provincial general hospitals and 5 private hospitals), that palliative care departments exist in all provincial and district general hospitals with 199 beds in total, and that 39 public and 6 private organisations had palliative care contracts with the health insurer in 2022. It counts 0.3 cancer doctors per 10,000 people in 2023. It states that weak capacity in local hospitals sends patients to the centre and produces long waiting lists, and plans regional teams of cancer specialists and more hospitals able to do cancer surgery. The registry's 2024 report shows the range between provinces: crude incidence from 120.1 to 346.7 per 100,000 and crude mortality from 93.3 to 209.",
          links: [
            { label: "National Cancer Center of Mongolia: English page (Internet Archive copy of 15 July 2026)", url: NCC_ABOUT_IA },
            L_NCCP,
            L_REPORT_2024,
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Mongolia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Mongolia; the registry itself lists 15 cancer studies, none recruiting",
          plain:
            "None of the trials in OnCo's records lists a site in Mongolia. OnCo holds a selection of trials, not the whole registry. A search of ClinicalTrials.gov for cancer studies with a location in the country of Mongolia returned 15, all finished or of unknown status.",
          detail:
            "The corpus count is from the ClinicalTrials.gov site lists held in OnCo's graph. The registry search was made through the ClinicalTrials.gov API with the condition \"cancer\" and the location country field set to Mongolia: 15 studies, each with a status of completed or unknown and none recruiting. Nine are sponsored by Immunitor LLC, which OnCo's records place in Ulaanbaatar, and the others by the US National Cancer Institute (two studies of hormone levels in Mongolian women), Singapore General Hospital, the Mongolian National University of Medical Sciences, Seoul Hospital and Nakhia Impex LLC. A looser search on the word Mongolia returns 102 studies because it also matches Inner Mongolia, a region of China, so the larger number should not be used. ClinicalTrials.gov's glossary says an unknown status marks a study whose last known status was recruiting, not yet recruiting, or active and not recruiting, that has passed its completion date and whose status has not been verified within the past two years; the registry counts such studies as closed (the glossary page returned no text to a plain request on 16 November 2026, so this definition was not re-verified). The 2025 to 2028 programme lists expanding clinical trials among its research actions.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Mongolia", url: CTGOV },
            { label: "ClinicalTrials.gov: glossary, which defines the unknown status", url: "https://clinicaltrials.gov/study-basics/glossary" },
            L_NCCP,
          ],
        },
        {
          id: "published-research",
          title: "Published research: the registry with IARC, and studies of cervical, colorectal and liver cancer",
          plain:
            "Most published research on cancer in Mongolia describes how common each cancer is. The national registry published its 2008 to 2012 results with IARC, and more recent papers cover cervical cancer from 2014 to 2024, colorectal cancer from 2018 to 2022 and hepatitis infection in the population.",
          detail:
            "The registry paper (International Journal of Cancer, 2017) reported 21,564 new cancers in 2008 to 2012 in a population of 2.87 million, 52% in men, with liver cancer almost two-fifths of all diagnoses. The cervical cancer paper (Frontiers in Oncology, 2026) used the national health information system, counting 3,990 cases and 1,370 deaths over eleven years; a correction of October 2026 changed the handling editor's name and nothing else. The colorectal paper (Asian Pacific Journal of Cancer Prevention, 2024) counted 1,316 new cases and 782 deaths in 2018 to 2022 from provincial and district hospitals and the National Cancer Center. The hepatitis survey of 10,040 people is the baseline of a nationwide cancer cohort study. OnCo read the abstracts through Europe PMC and, for the cervical paper, the open full text. The programme for 2025 to 2028 plans a tissue bank, molecular and genetic research and a single national research database.",
          links: [
            { label: "Chimed and colleagues: results from the National Cancer Registry 2008 to 2012 (Int J Cancer 2017)", url: P_REGISTRY_2017 },
            { label: "Tsogtgerel and colleagues: cervical cancer trends in Mongolia, 2014 to 2024 (Front Oncol 2026)", url: P_CERVIX_2026 },
            { label: "Tsedendorj and colleagues: colorectal cancer in Mongolia, 2018 to 2022 (Asian Pac J Cancer Prev 2024)", url: P_CRC_2024 },
            { label: "Dambadarjaa and colleagues: hepatitis B, C and D infection in Mongolia (Vaccines 2022)", url: P_HEP_2022 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-2025",
      title: "The registry's report for 2025 is listed but could not be downloaded",
      plain:
        "The National Cancer Center lists a report on cancer incidence and mortality for 2025, posted on 12 March 2026, and reports on single cancers for 2024. OnCo could not download them, so the registry figures on this page stop at 2024.",
      detail:
        "The centre's site reset most plain requests on 16 November 2026: the report for 2024 downloaded once, and three later attempts to open the page for the 2025 report (\"ХОРТ ХАВДРЫН ӨВЧЛӨЛ, НАС БАРАЛТЫН ӨНӨӨГИЙН БАЙДАЛ 2025 ОН\") were reset. The Internet Archive holds the download page but not the file, which answered 404. The same applies to the 2024 reports on liver, stomach, lung, oesophageal and colorectal cancer, the document titled \"Cancer report 2024\", and the early detection returns for 2025 as a whole and for the first quarter of 2026. The centre's \"Статистик үзүүлэлт 2025 он\" page showed a title and no figures. OnCo did not try to get round the resets.",
      links: [
        { label: "National Cancer Center: incidence and mortality 2025, download page (in Mongolian)", url: NCC_REPORT_2025 },
        { label: "National Cancer Center: list of registry reports, Internet Archive copy of August 2026", url: NCC_REGISTRY_LIST_IA },
      ],
    },
    {
      id: "gap-plan-and-law",
      title: "The order approving the cancer programme, and the laws behind insurance and medicines, were not read",
      plain:
        "OnCo read an English text of the 2025 to 2028 cancer programme with its order number left blank, and did not read the Mongolian original, the health insurance law or the medicines law. The page therefore cannot give the date the programme was approved or what the law entitles a patient to.",
      detail:
        "The Ministry of Health's home page returned a menu and almost no text to a plain request, and OnCo did not find the order on it. UICC's news item of October 2025 on cancer care in Mongolia answered 406 and was not read. The IAEA's own news pages answered 403; its September 2024 item was read from an Internet Archive copy, and OnCo did not find the report of the May 2024 review mission itself. The Health Insurance General Office's legal pages and its benefit rules were not read, so the statement that patients pay nothing for day treatment rests on the tariff table alone, with no currency printed on it. The Center for Health Development's yearly health indicators report, which carries the Ministry's own cancer tables, was not found on its home page.",
      links: [
        { label: "Ministry of Health of Mongolia (in Mongolian)", url: MOH },
        { label: "Center for Health Development (in Mongolian)", url: HDC },
        L_NCCP,
      ],
    },
    {
      id: "gap-medicines",
      title: "Which cancer medicines are registered and paid for is not known to OnCo",
      plain:
        "OnCo could not open the public medicines register and found no list of the cancer medicines the insurance fund pays for. It cannot say whether a given cancer medicine is available in Mongolia, how long approval takes, or how clinical trials are authorised.",
      detail:
        "The regulator's site points to the Licemed register at licemed.mohs.mn; a plain request to it failed on a certificate error after a redirect and OnCo did not override the check. The regulator's lists of medicines council decisions were seen as titles and not opened one by one. The insurer's page on discounted medicine prices returned an empty body. No Mongolian source on the essential medicines list, on prices of targeted therapies or immunotherapies, or on an ethics or regulatory route for trials was read. The WHO 2020 profile's entries on opioid availability and bone marrow transplantation are from 2015 to 2019 and are not repeated here as current.",
      links: [
        { label: "ЭЭХХЗГ: activities and frequently asked questions, which point to the Licemed register (in Mongolian)", url: MMRA_ACTIVITY },
        { label: "Health Insurance General Office: discounted medicine prices (page returned no list)", url: EMD_DISCOUNT },
        L_WHO_PROFILE,
      ],
    },
    {
      id: "gap-outcomes",
      title: "No survival figures, no current hepatitis programme results, and no detail on radiotherapy machines",
      plain:
        "This page gives no cancer survival rates for Mongolia because OnCo did not read a source that measures them properly. It also lacks current results from the hepatitis programme and a machine-by-machine account of radiotherapy.",
      detail:
        "The registry's report gives the share of people under follow-up who have lived five years or more (42.7% at the end of 2024), which is not a survival rate. The national programme prints figures it labels five-year survival (43% of cancer patients in 2023, and baselines for four cancers) without saying how they were calculated, so OnCo does not repeat them as survival rates; it found no population-based survival analysis. The hepatitis figures are WHO's for 2017 to 2018, and no later count of people tested, treated or cured was read. The IAEA DIRAC figures come from its country row, whose field names are reported as they are; the centre-level entry and the National Cancer Center's own radiotherapy pages were not read, so the split between linear accelerators and cobalt units, waiting times for radiotherapy and the state of the planned second centre are not given. WHO's 2020 profile figures on scanners and staff date from 2014 to 2020. A 2018 article in The Lancet Gastroenterology and Hepatology on liver cancer in Mongolia has no abstract in Europe PMC and was not read.",
      links: [
        L_REPORT_2024,
        { label: "WHO Western Pacific: viral hepatitis case studies, Mongolia", url: WHO_HEP_CASES },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
      ],
    },
  ],
  institutions: [
    "national-cancer-center-mongolia",
    "national-cancer-registry-mongolia",
    "health-insurance-general-office-mongolia",
    "mmra-mongolia",
    "center-for-health-development-mongolia",
  ],
  companies: ["immunitor"],
  drugs: [],
  trials: [],
  papers: [
    "paper-chimed-mongolia-national-cancer-registry-2008-12-ijc-2017",
    "paper-tsogtgerel-mongolia-cervical-cancer-trends-2014-2024-front-oncol-2026",
    "paper-tsedendorj-mongolia-colorectal-cancer-2018-2022-apjcp-2024",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: the National Cancer Center's registry report for 2024 and its early detection return for early 2025, in Mongolian; the English text of the Cancer Prevention and Control Program 2025-2028; the pages of the Health Insurance General Office and the medicines regulator, in Mongolian; WHO Mongolia's releases; IAEA documents and its DIRAC directory; IARC's GLOBOCAN 2024 fact sheet; WHO's immunisation data; the World Bank's health expenditure series; ClinicalTrials.gov; and paper abstracts through Europe PMC. Internet Archive copies are labelled as such.",
  verify:
    "Insurance tariffs, screening ages and vaccination coverage change, and several figures here come from a programme document or from 2018. Check with the National Cancer Center, the Health Insurance General Office or the treating hospital before relying on them.",
  verifyLinks: [
    L_REPORT_2024,
    { label: "Health Insurance General Office (in Mongolian)", url: EMD },
    { label: "ЭЭХХЗГ, the medicines regulator (in Mongolian)", url: MMRA },
    L_IARC,
  ],
};
