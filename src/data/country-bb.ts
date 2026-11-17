import type { CountryDive } from "@/data/country-dive";

/**
 * Barbados deep dive: the hand-written cards for /countries/bb/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Barbados (PDF text),
 * the Barbados National Registry's report "Cancer in Barbados (2013-2022)" (November 2025, PDF text) and its policy
 * brief of 19 December 2025 (PDF text), both on the Ministry of Health and Wellness's site, the Ministry's pages on
 * cancer and on pharmaceutical services, the Queen Elizabeth Hospital's pages on radiotherapy and on the cost of
 * medication and its notices of 26 and 28 October 2026 on the oncology centre, the Healthy Caribbean Coalition's 2022 rapid assessment of access to essential NCD medicines (PDF text),
 * the International Cancer Control Partnership's listings of Barbados's plans, CARPHA's pages on the Caribbean
 * Regulatory System and the Caribbean Cancer Registry Hub, WHO's 2020 cancer profile and 2021 cervical cancer profile
 * (PDF text), WHO's HPV coverage, vaccine introduction and health expenditure rows from its public data APIs, IAEA
 * DIRAC's public equipment data, the ClinicalTrials.gov record of NCT07528768, and the papers' abstracts through
 * Europe PMC.
 *
 * Second check, 16 November 2026: the two plans were read as PDF text from the International Cancer Control
 * Partnership's portal (the National Cancer Control Plan for Barbados, 2021 to 2025, and the National Strategic Plan
 * for the Prevention and Control of NCDs 2020 to 2025), with the Ministry's legislation page and the hospital's notice
 * of 28 October 2026.
 *
 * Not read: the registry's own site (bnr.org.bb returned HTTP 500), the Barbados Drug Service's site (its https address
 * gave no answer and its http address a server error page), the Barbados National Drug Formulary, and the texts of the
 * Drug Service Act and the Health Services Act. These are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/52-barbados-fact-sheet.pdf";
const BNR_REPORT = "https://health.gov.bb/attachments/BNR%20Cancer%20Annual%20Report%202025_Years%202021-2022.pdf";
const BNR_BRIEF = "https://health.gov.bb/attachments/Cancer%20in%20Barbados%20Policy%20Brief.pdf";
const MOH_CANCER = "https://health.gov.bb/For-Public/Non-Communicable-Diseases/Cancer";
const MOH_PHARM = "https://health.gov.bb/For-Public/Pharmaceutical-Services";
const QEH_RT = "https://www.qehconnect.com/services/radiotherapy/";
const QEH_COST = "https://www.qehconnect.com/faq/is-there-a-cost-for-the-medication/";
const HCC_2022 = "https://www.healthycaribbean.org/wp-content/uploads/2023/04/Equitable-Access-to-Essential-Medicines-for-Non-Communicable-Diseases-in-the-Caribbean-Rapid-Assessment-Report-HCC-May-22.pdf";
const ICCP_CANCER_PLAN = "https://www.iccp-portal.org/resources/national-cancer-control-plan-barbados";
const ICCP_NCD_PLAN = "https://www.iccp-portal.org/resources/national-strategic-plan-prevention-and-control-non-communicable-diseases-2020-2025";
const CRS_ABOUT = "https://carpha.org/What-We-Do/CRS/About-Us";
const CRS_FAQ = "https://carpha.org/What-We-Do/CRS/FAQ";
const GICR_HUB = "https://gicr.iarc.who.int/hub/caribbean/";
const WHO_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/brb_2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-brb-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BRB'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BRB'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BRB'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BRB'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'BRB'";
const QEH_NOTICE = "https://www.qehconnect.com/cbcon-temp-location-102626/";
const QEH_NOTICE_2 = "https://www.qehconnect.com/qeh-notice-surgical-capacity/";
const ICCP_CANCER_PLAN_PDF = "https://www.iccp-portal.org/sites/default/files/plans/brb_B5_s21_National%20Cancer%20Control%20Plan%20for%20Barbados%202020.pdf";
const ICCP_NCD_PLAN_PDF = "https://www.iccp-portal.org/sites/default/files/plans/brb_B3_s21_NCD%20Strategic%20Plan%202020-2025.pdf";
const MOH_LEGISLATION = "https://health.gov.bb/Legislation";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const HEADWATERS = "https://clinicaltrials.gov/study/NCT07528768";
const CTGOV = "https://clinicaltrials.gov/search?country=Barbados&cond=cancer";
const HENNIS_2011 = "https://doi.org/10.1155/2011/565230";
const MARTELLY_2016 = "https://doi.org/10.1016/j.canep.2016.10.020";
const FORDE_2023 = "https://europepmc.org/article/MED/37577281";

export const BB_DIVE: CountryDive = {
  iso2: "BB",
  iso3: "BRB",
  name: "Barbados",
  flag: "🇧🇧",
  asOf: "2026-11-16",
  title: "Cancer in Barbados",
  description:
    "Cancer in Barbados from its own and international sources: the Barbados National Registry's count of 983 new cancers in 2022 and its published survival figures, IARC's estimate of 1,053 new cancers and 614 deaths in 2024, formulary medicines free of cost to people diagnosed with cancer, one radiotherapy centre at the Queen Elizabeth Hospital, HPV vaccination reaching 58% of girls in 2025, and a National Cancer Action Plan for 2021 to 2025.",
  lede:
    "Barbados counts its cancers: the Barbados National Registry recorded 941 new cases in 2021 and 983 in 2022, and publishes survival, about 66% at one year. IARC's 2024 estimate, built on the registry's rates, is 1,053 new cancers and 614 deaths, with prostate cancer the commonest. Radiotherapy is given at the Queen Elizabeth Hospital, and medicines on the national formulary are free of cost to people diagnosed with cancer.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Barbados is 1,053 new cancers and 614 deaths, an age-standardised incidence of 200.1 per 100,000 (225.1 in men, 182.4 in women) and mortality of 104.0. The fact sheet gives the country-specific incidence data source as \"Registry (national)\" and the method as \"National rates applied to 2024 population\"; for mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". So this is an estimate carried forward from counted cases, not a model from neighbours. The Barbados National Registry's own latest counts are 983 tumours in 2022, an age-standardised rate of 213.7 per 100,000 (223 in men, 210 in women). The two differ by site: the registry counted 209 female breast cancers in 2022, where IARC's 2024 estimate is 153. IARC's total of new cases is the same with and without non-melanoma skin cancer.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Barbados",
      aside: { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
      cards: [
        {
          id: "shape",
          title: "About 1,000 new cancers a year, with prostate cancer the commonest",
          plain:
            "IARC estimates 1,053 new cancers in Barbados in 2024, 547 in men and 506 in women, and 614 cancer deaths. Prostate cancer is the commonest, then colorectal and breast cancer. Nearly half of all cancers in men are prostate cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 258 prostate cancers (119 deaths), 162 colorectal cancers (84 deaths), 153 breast cancers (74 deaths), 63 cancers of the corpus uteri (15 deaths) and 48 lung cancers (45 deaths). In men the leading cancers are prostate (258, 47.2%), colorectum (82) and lung (28); in women, breast (153, 30.2%), colorectum (80) and corpus uteri (63). The risk of developing cancer before 75 is 21.1% and of dying of it 10.2%. The national registry's own table of deaths for 2022 has prostate cancer first (163), then colorectal (116) and female breast cancer (75); the registry counts every death with cancer listed on the death certificate, not only those where cancer was the underlying cause, so its figures can run higher than counts by underlying cause. The registry notes that lung cancer is uncommon in Barbados, 19 cases in 2022, yet remains among the leading causes of cancer death.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Barbados (PDF)", url: IARC_FACTSHEET },
            { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
          ],
        },
        {
          id: "registry",
          title: "A national registry that publishes counts, rates and survival",
          plain:
            "The Barbados National Registry is a Ministry of Health and Wellness project led by the George Alleyne Chronic Disease Research Centre at the University of the West Indies. Its 2025 report covers ten years of cancer incidence, 2013 to 2022, and twelve years of deaths.",
          detail:
            "Trained abstractors find cases from pathology and laboratory data and from departments of the Queen Elizabeth Hospital, then follow up with private physicians and clinics. The registry recorded 941 new cases in 2021 and 983 in 2022; cases known only from a death certificate were under 5% for the third year running. The report's summary gives one-year survival as about 66% and five-year survival as 48.5%, without naming the years those two figures cover; the table below has survival year by year. In 2022 more cases were first identified from tissue of a cancer that had spread than in any of the nine earlier years, which the registry reads as a sign of late presentation. It says registries need two to five years to report complete data, and that paper records and limited physician cooperation slow collection in Barbados. A 2023 paper by registry staff reports a 38% reduction in the collection of new cases in the period after the COVID-19 pandemic compared with earlier periods.",
          links: [
            { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
            { label: "Forde et al., paper-based disease registries in Barbados during the pandemic (J Registry Manag 2023)", url: FORDE_2023 },
          ],
        },
      ],
      tables: [
        {
          id: "bb-registry-years",
          title: "The Barbados National Registry's counts and survival, 2018 to 2022",
          caption: "Tumours registered, age-standardised incidence per 100,000, share registered from a death certificate only, and survival by year of diagnosis, from Table 1 of the registry's 2025 report.",
          columns: [
            { key: "year", label: "Year" },
            { key: "tumours", label: "Tumours", numeric: true },
            { key: "asir", label: "Incidence rate", numeric: true },
            { key: "dco", label: "Death certificate only (%)", numeric: true },
            { key: "s1", label: "1-year survival (%)", numeric: true },
            { key: "s5", label: "5-year survival (%)", numeric: true },
          ],
          rows: [
            { year: "2018", tumours: 1019, asir: 221.0, dco: 5.8, s1: 68.7, s5: 56.4 },
            { year: "2019", tumours: 924, asir: 191.9, dco: 5.2, s1: 69.6, s5: 56.4 },
            { year: "2020", tumours: 981, asir: 207.0, dco: 3.0, s1: 66.6, s5: 52.6 },
            { year: "2021", tumours: 941, asir: 202.6, dco: 1.4, s1: 66.8, s5: null },
            { year: "2022", tumours: 983, asir: 213.7, dco: 2.5, s1: 63.8, s5: null },
          ],
          note: "Counted cases. Five-year survival is missing for 2021 and 2022 because not enough time has passed. The report gives 885 tumours and five-year survival of 42.9% for 2013; it does not state how survival was calculated. It says its summary tables count malignant tumours and cervical carcinoma in situ, while the rates use malignant tumours only.",
          sources: [{ label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025, Table 1 (PDF)", url: BNR_REPORT }],
        },
        {
          id: "bb-top",
          title: "IARC's leading cancers for Barbados, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates built on the national registry's rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 258, deaths: 119 },
            { site: "Colorectum", cases: 162, deaths: 84 },
            { site: "Breast", cases: 153, deaths: 74 },
            { site: "Corpus uteri", cases: 63, deaths: 15 },
            { site: "Lung", cases: 48, deaths: 45 },
            { site: "Cervix uteri", cases: 34, deaths: 20 },
            { site: "Pancreas", cases: 33, deaths: 30 },
            { site: "Multiple myeloma", cases: 30, deaths: 22 },
            { site: "All cancers", cases: 1053, deaths: 614 },
          ],
          note: "IARC applies national registry rates to the 2024 population. The registry's own 2022 counts are higher for breast cancer (209 in women) and lower for lung cancer (19).",
          sources: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Barbados (PDF)", url: IARC_FACTSHEET },
            { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Queen Elizabeth Hospital: is there a cost for the medication?", url: QEH_COST },
      cards: [
        {
          id: "formulary-free",
          title: "Formulary medicines are free of cost to people diagnosed with cancer",
          plain:
            "The Queen Elizabeth Hospital says medicines listed in the Barbados National Drug Formulary are provided free of cost to people aged 16 or under, people aged 65 or over, and people diagnosed with asthma, cancer, diabetes, epilepsy, glaucoma or hypertension.",
          detail:
            "The Ministry of Health and Wellness says pharmaceutical services are provided by the Barbados Drug Service, which produces the National Drug Formulary each year and procures and distributes the drugs listed in it. A 2022 regional assessment says a National Drug Formulary Committee develops the list, that it names medicines for the public and private sectors, and that medicines in the public sector are financed from public funds. The same assessment describes three formulary categories: one supplied to beneficiaries in public and private pharmacies, one supplied in the public sector on special authorisation, and one of branded medicines sold privately free of tax; it adds that participating private pharmacies supply free medicines for a dispensing fee. The free supply applies to what is on the formulary: OnCo did not read the formulary, so which cancer medicines it holds is not on this page. The hospital's radiotherapy department says it treats public and private patients, local and from overseas.",
          links: [
            { label: "Queen Elizabeth Hospital: is there a cost for the medication?", url: QEH_COST },
            { label: "Ministry of Health and Wellness: pharmaceutical services", url: MOH_PHARM },
            { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.3 (2022, PDF)", url: HCC_2022 },
          ],
        },
        {
          id: "spending",
          title: "About half of health spending is paid out of pocket",
          plain:
            "WHO puts out-of-pocket payment at 49.5% of Barbados's health spending in 2023, more than the government's 41.6%. Health spending was about US$1,286 a person. These are shares of all health spending, private care included, and are not specific to cancer.",
          detail:
            "WHO's Global Health Expenditure Database gives the out-of-pocket share as 42.9% in 2020, 38.8% in 2021, 46.7% in 2022 and 49.5% in 2023, and the domestic government share as 49.4%, 54.3%, 45.0% and 41.6% in the same years; external sources were under 1%. The Ministry's cancer page says families funding treatment regularly find it a financial burden. The registry's policy brief says its data cannot yet show survival differences by socioeconomic status, geography or insurance coverage. A hospital social worker or the treating team can say what a given test or treatment will cost.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Barbados (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Ministry of Health and Wellness: cancer", url: MOH_CANCER },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Ministry of Health and Wellness: pharmaceutical services", url: MOH_PHARM },
      cards: [
        {
          id: "drug-service",
          title: "The Barbados Drug Service runs the formulary, and a drug inspectorate licenses pharmacies",
          plain:
            "The Ministry of Health and Wellness names two functions on its pharmaceutical page. The Barbados Drug Service produces the national formulary and buys and distributes the medicines on it. A drug inspectorate inspects and licenses pharmacies and drug manufacturing plants under the Health Services Act.",
          detail:
            "Being on the Barbados National Drug Formulary decides what the public system supplies, and the inspectorate's licensing covers public and private pharmacies. The Ministry's page does not describe a step in which each medicine is assessed and registered before sale, and OnCo did not find one described in the other sources read; the Drug Service Act and the Health Services Act were not read. The Ministry's legislation page says the Drug Service is governed by the Drug Service Act, and that regulations under the Health Services Act of 1969 relate, among other things, to the safety and effectiveness of drugs and to the operation of pharmacies and pharmaceutical manufacturing plants; it does not set out the steps. The Barbados Drug Service's own site did not load on 16 November 2026: one address gave no answer and the other a server error. The Drug Service or the Ministry is the body to ask whether a particular medicine may be supplied in Barbados.",
          links: [
            { label: "Ministry of Health and Wellness: pharmaceutical services", url: MOH_PHARM },
            { label: "Ministry of Health and Wellness: legislation", url: MOH_LEGISLATION },
            { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.3 (2022, PDF)", url: HCC_2022 },
          ],
        },
        {
          id: "caribbean-regulatory-system",
          title: "A regional review at CARPHA can recommend a medicine to CARICOM states",
          plain:
            "The Caribbean Regulatory System is a unit of the Caribbean Public Health Agency (CARPHA) that reviews medicines already approved by a reference regulator and recommends them to CARICOM member states. Each country still decides for itself. OnCo did not find how Barbados uses these recommendations.",
          detail:
            "CARPHA says CARICOM health ministers agreed in 2016 to create the system to support member states with marketing authorisation and pharmacovigilance. It accepts products authorised by a regulator on its list of reference authorities, which for medicines names among others the United States, Canada, the European Medicines Agency and the United Kingdom, or prequalified by WHO, and generally those on WHO's essential medicines list or the PAHO Strategic Fund list. Its page says only a sovereign country can authorise products for sale in its market, and that the goal is to turn a recommendation into a national authorisation within 60 calendar days; elsewhere the same page gives a target of 120 calendar days from recommendation to authorisation in a country.",
          links: [
            { label: "CARPHA: about the Caribbean Regulatory System", url: CRS_ABOUT },
            { label: "CARPHA: Caribbean Regulatory System, frequently asked questions", url: CRS_FAQ },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile, Barbados (2021, PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "No national cervical screening programme in WHO's record, though most women have been screened",
          plain:
            "WHO's 2021 profile records no national cervical screening programme in Barbados. It still estimates that 8 in 10 women aged 30 to 49 had been screened in the previous five years. The registry counted 21 cervical cancers in 2022.",
          detail:
            "The WHO cervical cancer profile gives 89% of women aged 30 to 49 screened in the last five years and 96% ever screened, as 2019 estimates, and 28 cervical cancer deaths in 2019. WHO's 2020 profile also answers \"no\" for a breast cancer screening programme, in an entry dated 2019. The Ministry's National Strategic Plan for NCDs 2020 to 2025 says, in its Annex 7, that guidelines were developed for cervical screening by cytology and HPV testing at the first and second levels of care, and that mammography is available in the public and private sectors and from the Barbados Cancer Society, \"but there are no national guidelines, database, or call and recall system\". The registry's report says people reach a diagnosis by several routes, among them breast or prostate screening programmes run by non-governmental organisations, and its policy brief puts stronger early detection and screening for breast, prostate and colorectal cancer first among its recommendations. A polyclinic or family doctor can say which tests are offered and where.",
          links: [
            { label: "WHO: cervical cancer country profile, Barbados (2021, PDF)", url: WHO_CX_2021 },
            { label: "WHO: cancer country profile, Barbados (2020, PDF)", url: WHO_2020 },
            { label: "Ministry of Health and Wellness: National Strategic Plan for the Prevention and Control of NCDs 2020 to 2025, Annex 7 (PDF)", url: ICCP_NCD_PLAN_PDF },
            { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccination for girls and boys, reaching 58% of girls in 2025",
          plain:
            "WHO records the HPV vaccine as introduced nationwide in Barbados in 2014. In 2025, 58% of girls and 57% of boys in the target group had a first dose. Coverage has moved a good deal from year to year.",
          detail:
            "WHO's vaccine introduction rows give 2014, as does the Ministry's NCD plan for 2020 to 2025; WHO's 2021 cervical cancer profile and the national cancer plan give 2013. The profile gives a primary target cohort of 10 to 11 years, and the cancer plan sets the aim that at least 70% of 11-year-olds, boys and girls, are vaccinated before the age of 12. First-dose programme coverage in girls was 76% in 2015, 86% in 2016, 37% in 2017, 64% in 2018, 62% in 2019, 59% in 2020, 37% in 2021, 43% in 2022, 48% in 2023, 43% in 2024 and 58% in 2025 (931 doses against a target of 1,610). Boys appear in the rows from 2018. WHO's vaccine introduction rows record a one-dose schedule from 2022, and from 2023 the last-dose figure in the coverage rows equals the first-dose figure. WHO's elimination target is 90% of girls fully vaccinated by the age of 15.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Barbados (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Barbados (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile, Barbados (2021, PDF)", url: WHO_CX_2021 },
            { label: "Ministry of Health and Wellness: National Cancer Control Plan for Barbados, 2021 to 2025 (PDF)", url: ICCP_CANCER_PLAN_PDF },
            { label: "Ministry of Health and Wellness: National Strategic Plan for the Prevention and Control of NCDs 2020 to 2025 (PDF)", url: ICCP_NCD_PLAN_PDF },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "Queen Elizabeth Hospital: radiotherapy", url: QEH_RT },
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, at the Queen Elizabeth Hospital",
          plain:
            "IAEA's radiotherapy directory lists one centre in Barbados, the Queen Elizabeth Hospital, with two linear accelerators, one cobalt-60 machine and a brachytherapy unit. The hospital's Clara Brathwaite Centre for Oncology and Nuclear Medicine gives radiotherapy, chemotherapy and nuclear medicine, and cares for children with cancer up to the age of 16.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, lists the Queen Elizabeth Hospital on Martindales Road, St. Michael, with two linear accelerators, one cobalt-60 teletherapy unit, one high-dose-rate cobalt-60 brachytherapy unit and two CT scanners, in an entry last updated in 2025. The hospital says its Department of Radiotherapy serves its own patients and others, private or public, local or from overseas. A hospital notice dated 26 October 2026 says maintenance work at the Clara Brathwaite Centre is continuing and that oncology services will operate from a temporary location until further notice, with the hospital chapel as the waiting area for routine clinics, radiation oncology and chemotherapy; a notice two days later says the linear accelerator treatment area is unaffected. The hospital says its oncology team will contact patients about changes to appointments. The directory records equipment, not whether a machine is in service on a given day, and the registry's policy brief says waiting times and treatment pathways are not captured in its data.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Queen Elizabeth Hospital: radiotherapy", url: QEH_RT },
            { label: "Queen Elizabeth Hospital: oncology services to remain at temporary location (notice, 26 October 2026)", url: QEH_NOTICE },
            { label: "Queen Elizabeth Hospital: working to restore surgical capacity while maintaining oncology care (notice, 28 October 2026)", url: QEH_NOTICE_2 },
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Barbados does differently",
      cards: [
        {
          id: "survival-published",
          title: "A small island that publishes cancer survival, and says what its data cannot show",
          plain:
            "The Barbados National Registry publishes one-, three- and five-year survival by year of diagnosis. Five-year survival was 40.8% for people diagnosed in 2014 and 52.6% for those diagnosed in 2020. Its policy brief also lists what the data cannot yet tell: stage at diagnosis, waiting times and quality of care.",
          detail:
            "The registry combines cancer registration with registers of cardiovascular disease; a costing study for April 2014 to March 2015 found the Ministry of Health provided 56% of the registries' resources, that labour was over 70% of the budgets, and that the cancer registry cost US$382 to US$573 a case depending on the years of retrospective collection assumed. The IARC Caribbean Cancer Registry Hub lists Barbados among the countries it covers. The brief of December 2025 recommends examining treatment pathways and waiting times, planning oncology and palliative care for an ageing population, and sustaining the registry to inform the National Cancer Action Plan.",
          links: [
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
            { label: "Martelly et al., economic assessment of integrated cancer and cardiovascular registries in Barbados (Cancer Epidemiol 2016)", url: MARTELLY_2016 },
            { label: "IARC Global Initiative for Cancer Registry Development: Caribbean hub", url: GICR_HUB },
          ],
        },
        {
          id: "cancer-action-plan",
          title: "A National Cancer Action Plan for 2021 to 2025",
          plain:
            "The registry's 2025 report says the Ministry of Health and Wellness created a National Cancer Action Plan for 2021 to 2025 and a National Strategic Plan for the Prevention and Control of NCDs for 2020 to 2025, which include cutting deaths from non-communicable diseases by 25%. The cancer plan's own cover calls it the National Cancer Control Plan for Barbados, 2021 to 2025. Its goals include screening protocols for colon, breast, prostate and cervical cancer, and care pathways for treatment.",
          detail:
            "The International Cancer Control Partnership lists both plans on its portal, each with its document. The cancer plan's foreword, signed by the Minister of Health and Wellness, is dated April 2021. It has five priority areas: prevention, early detection, diagnosis and treatment, palliative care and supportive care. Its objectives include that at least 70% of 11-year-olds, boys and girls, are vaccinated against HPV before the age of 12, that screening guidelines for the leading cancers are developed by March 2022, and that essential palliative care medicines are in the national formulary by March 2023. Among the weaknesses it lists are limited national guidelines for cancer screening and treatment, outdated nuclear medicine infrastructure and a limited formulary of chemotherapy medicines. OnCo read the plan, not a report on what was carried out. WHO's 2020 profile, in entries dated 2019, recorded an integrated NCD plan as operational and a national cancer plan as not in effect, which is before the date of the plan's foreword. The plan period ends in 2025; the registry's policy brief of December 2025 refers to future planning cycles, and OnCo found no successor plan. The Ministry of Health and Wellness is the body to ask what follows.",
          links: [
            { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
            { label: "Ministry of Health and Wellness: National Cancer Control Plan for Barbados, 2021 to 2025 (PDF)", url: ICCP_CANCER_PLAN_PDF },
            { label: "ICCP Portal: National Cancer Control Plan for Barbados", url: ICCP_CANCER_PLAN },
            { label: "ICCP Portal: National Strategic Plan for the Prevention and Control of NCDs 2020 to 2025", url: ICCP_NCD_PLAN },
            { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
            { label: "WHO: cancer country profile, Barbados (2020, PDF)", url: WHO_2020 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Barbados", url: CTGOV },
      cards: [
        {
          id: "trials-and-papers",
          title: "One trial in OnCo's records has a site in Barbados, and it has not started",
          plain:
            "HEADWATERS is a planned phase 2 trial comparing gemcitabine with paclitaxel in women of African ancestry with metastatic triple-negative breast cancer. The University of the West Indies sponsors it, with the Queen Elizabeth Hospital in Bridgetown as a site alongside Jamaica and Ghana. It is not yet recruiting.",
          detail:
            "The ClinicalTrials.gov record for NCT07528768, last updated in September 2026, gives an estimated enrolment of 750, an estimated start in June 2027 and primary completion in June 2034. OnCo holds a selection of trials, not the whole registry, so the search link beside this section is the place to look for others. Earlier research counted every histologically confirmed prostate cancer in Barbados from July 2002 to December 2008: 1,101 cases, an incidence of 160.4 per 100,000 standardised to the United States population, lower than in African-American men (248.2), with death rates that appeared higher.",
          links: [
            { label: "ClinicalTrials.gov: NCT07528768 (HEADWATERS)", url: HEADWATERS },
            { label: "ClinicalTrials.gov: cancer studies with a site in Barbados", url: CTGOV },
            { label: "Hennis et al., prostate cancer incidence and mortality in Barbados (Prostate Cancer 2011)", url: HENNIS_2011 },
            { label: "OnCo: triple-negative breast cancer", url: "/cancers/tnbc/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "stage-and-waits",
      title: "No stage at diagnosis, no waiting times, and counts that stop at 2022",
      plain:
        "The registry says cancer stage at diagnosis is not yet consistently available and that waiting times, treatment pathways and quality of care are not in its data. Its incidence counts stop at 2022. Survival is published for all cancers together in the pages OnCo read, not by cancer.",
      detail:
        "The policy brief of December 2025 lists these limits itself, and adds that recent mortality trends may reflect registration delays. The registry's own website returned an error on 16 November 2026, so its other publications were not read; the two documents used are those on the Ministry's site. Numbers of oncologists and radiotherapy staff were not found in a current primary source. The registry's report gives its telephone numbers and email address, which is the route to ask what else it holds.",
      links: [
        { label: "Barbados National Registry: Cancer in Barbados, key trends and policy implications (19 December 2025, PDF)", url: BNR_BRIEF },
        { label: "Barbados National Registry: Cancer in Barbados (2013-2022), report 2025 (PDF)", url: BNR_REPORT },
      ],
    },
    {
      id: "medicine-authorisation",
      title: "How a medicine is authorised, and which cancer medicines are on the formulary",
      plain:
        "OnCo did not find a source describing how a medicine is assessed and authorised for sale in Barbados, and did not read the Barbados National Drug Formulary. So this page cannot say which cancer medicines the public system supplies.",
      detail:
        "The Barbados Drug Service's website did not load on 16 November 2026, the government portal's page for the Service gave little beyond its mission, and the Drug Service Act was not read. The Ministry's pharmaceutical page describes the formulary and the licensing of pharmacies and manufacturers, not the registration of products. Two sources bear on the range of cancer medicines without listing them: a 2022 regional assessment compared a price guide of medicines procured in Barbados for 2018 to 2020 with a list of essential medicines for non-communicable diseases and found 19% of the cancer medicines on it, and the national cancer plan for 2021 to 2025 names a limited formulary of chemotherapy medicines among its weaknesses. Whether a newer cancer medicine is on the formulary, can be requested specially or must be bought privately is a question for the pharmacy at the Queen Elizabeth Hospital or the Barbados Drug Service.",
      links: [
        { label: "Ministry of Health and Wellness: pharmaceutical services", url: MOH_PHARM },
        { label: "Queen Elizabeth Hospital: is there a cost for the medication?", url: QEH_COST },
        { label: "Healthy Caribbean Coalition: Equitable Access to Essential Medicines for NCDs in the Caribbean, section 7.3.3 (2022, PDF)", url: HCC_2022 },
        { label: "Ministry of Health and Wellness: National Cancer Control Plan for Barbados, 2021 to 2025 (PDF)", url: ICCP_CANCER_PLAN_PDF },
      ],
    },
    {
      id: "plans-unread",
      title: "What the cancer plan achieved, and how screening is organised now",
      plain:
        "OnCo read the cancer plan for 2021 to 2025 but not a report on which of its objectives were met. The Ministry's NCD plan for 2020 to 2025 describes screening that is available without a national system of invitation, and OnCo did not find a later official description.",
      detail:
        "Annex 7 of the Ministry's National Strategic Plan for NCDs 2020 to 2025 rates mammography screening as partly in place: services are available in the public and private sectors and from the Barbados Cancer Society, \"but there are no national guidelines, database, or call and recall system\". For cervical screening it says guidelines were developed for the first and second levels of care and that the Barbados Cancer Society offers screening. For bowel cancer it says \"There is no population-based screening programme\", with early detection through screening of high-risk and symptomatic people. The annex has no row for prostate screening. This is the position when that plan was written. WHO's profiles record no national breast screening programme in 2019 and no national cervical programme in 2021, and WHO's estimates of how many women have been screened are from 2019; the registry's 2025 documents call for stronger screening without describing a programme. The Ministry of Health and Wellness's cancer page gives its telephone number and is the place to ask what is offered now.",
      links: [
        { label: "Ministry of Health and Wellness: National Strategic Plan for the Prevention and Control of NCDs 2020 to 2025, Annex 7 (PDF)", url: ICCP_NCD_PLAN_PDF },
        { label: "Ministry of Health and Wellness: National Cancer Control Plan for Barbados, 2021 to 2025 (PDF)", url: ICCP_CANCER_PLAN_PDF },
        { label: "WHO: cancer country profile, Barbados (2020, PDF)", url: WHO_2020 },
        { label: "WHO: cervical cancer country profile, Barbados (2021, PDF)", url: WHO_CX_2021 },
        { label: "ICCP Portal: National Cancer Control Plan for Barbados", url: ICCP_CANCER_PLAN },
        { label: "Ministry of Health and Wellness: cancer", url: MOH_CANCER },
      ],
    },
  ],
  institutions: ["moh-barbados", "barbados-national-registry", "qeh-barbados", "iarc", "who", "iaea"],
  companies: [],
  drugs: ["gemcitabine", "paclitaxel"],
  trials: ["nct07528768"],
  papers: ["paper-hennis-prostate-cancer-barbados-prostatecancer-2011", "paper-martelly-registry-cost-barbados-canep-2016"],
  people: [],
  how:
    "Every card was written from Barbados's own sources and from international agencies, read in full as raw text, not through a summary: the Barbados National Registry's 2025 report and policy brief; the Ministry of Health and Wellness's pages on cancer and pharmaceutical services; the Queen Elizabeth Hospital's pages and two of its notices; the Healthy Caribbean Coalition's 2022 assessment of access to medicines; the national cancer plan for 2021 to 2025 and the NCD plan for 2020 to 2025; CARPHA's pages; WHO's 2020 and 2021 profiles and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; the ClinicalTrials.gov record; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the registry and two papers) carry their own sources.",
  verify:
    "The registry's counts stop at 2022 and IARC's 2024 figures are estimates built on them. Which medicines are on the formulary, what a test costs and how long the wait for radiotherapy is change faster than any report; ask the Queen Elizabeth Hospital, the Barbados Drug Service or the Ministry of Health and Wellness what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health and Wellness: cancer", url: MOH_CANCER },
    { label: "Barbados National Registry: report 2025 (PDF)", url: BNR_REPORT },
    { label: "Queen Elizabeth Hospital: radiotherapy", url: QEH_RT },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Barbados (PDF)", url: IARC_FACTSHEET },
  ],
};
