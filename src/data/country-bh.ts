import type { CountryDive } from "@/data/country-dive";

/**
 * Bahrain deep dive: the hand-written cards for /countries/bh/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Bahrain (PDF text);
 * the Ministry of Health's report "Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014" (PDF text, from a copy
 * on a WHO server); the Ministry's Annual Health Statistics Report 2021/2022 (PDF text), its statistics index, its
 * immunisation schedule and its one-page Strategic Plan 2023 to 2026; the National Strategy for Control and Prevention
 * of Non-communicable Diseases 2014 to 2025 (PDF text); WHO's Cancer Country Profile 2020 for Bahrain (PDF text, from
 * the copy on the International Cancer Control Partnership portal, because WHO's own address returned 404); the National
 * Health Regulatory Authority's overview, pharmacy and clinical trial pages, its Medicine Licensing Guideline version 4.2
 * (January 2026), Medicine Pricing Guideline version 3.0 (January 2022) and its report of approved clinical trials for
 * 2021 to 2022 (PDF text); the Supreme Council of Health's pages on the national health insurance programme, the Shifa
 * fund, its questions and answers, the treatment abroad committee and the unified procurement committee; WHO's August
 * 2026 list of regulators at maturity level 3 and 4; the IAEA DIRAC country row (JSON); WHO's immunisation data API for
 * vaccine introductions and HPV programme coverage; the World Bank API series for health spending; a Bahrain Medical
 * Bulletin editorial of December 2018 on the oncology centre at King Hamad University Hospital; an Internet Archive
 * copy (22 May 2024) of the hospital's own page, because the live site returned an error; Jassim and colleagues'
 * 2025 paper on mammography screening, abstract and open full text through Europe PMC; RCSI Bahrain's news page of
 * 29 October 2025; five News of Bahrain reports of ministry statements to Parliament and Tender Board awards; and the
 * ClinicalTrials.gov API.
 *
 * The News of Bahrain pages carry no publication date in the text a plain request returns, so the cards give the
 * year the figures refer to and do not date the reports.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/48-bahrain-fact-sheet.pdf";
const MOH_2014 = "https://extranet.who.int/fctcapps/sites/default/files/2024-02/318_CANCER%20-%20incidence%20and%20mortality.pdf";
const MOH_STATS_2022 = "https://www.moh.gov.bh/Content/Upload/File/638728900890233427-Annual-Health-Statistic-2021-2022--Report_en.pdf";
const MOH_STATS_INDEX = "https://www.moh.gov.bh/Ministry/Statistics?lang=en";
const MOH_IMMUNISATION = "https://www.moh.gov.bh/HealthInfo/Immunizations?lang=en";
const MOH_PLAN = "https://www.moh.gov.bh/Content/Files/Health_Improvement_Strategy(2023-2026).pdf";
const NCD_STRATEGY = "https://faolex.fao.org/docs/pdf/bah208809E.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/BHR_2020.pdf";
const NOB_REGISTRY = "https://www.newsofbahrain.com/en/article/bahrain-records-over-1400-cancer-cases-and-4500-dialysis-patients-in-202-wk_post-125000";
const NOB_MINISTER = "https://www.newsofbahrain.com/en/article/cancer-death-totals-span-several-years-health-minister-tells-parliament-wk_post-125595";
const NOB_RIFFA = "https://www.newsofbahrain.com/en/article/mps-to-revisit-east-riffa-site-plan-for-cancer-centre-wk_post-124930";
const NOB_UNIT = "https://www.newsofbahrain.com/bahrain/133230.html";
const NOB_HPV = "https://newsofbahrain.com/bahrain/92903.html";
const NHRA_OVERVIEW = "https://www.nhra.bh/About/Overview/";
const NHRA_PPR = "https://www.nhra.bh/Departments/PPR/";
const NHRA_LISTS = "https://www.nhra.bh/Departments/PPR/?page=102";
const NHRA_LICENSING = "https://www.nhra.bh/Departments/PPR/MediaHandler/GenericHandler/documents/departments/PPR/Medicines/Guidelines/PPR_Guideline_Medicine%20Licensing%20Guideline_V4.2_20260128.pdf";
const NHRA_PRICING = "https://www.nhra.bh/Departments/PPR/MediaHandler/GenericHandler/documents/departments/PPR/Medicines/Guidelines/PPR_Guidelines_Pricing%20Guideline_V3.0_20220127.pdf";
const NHRA_CT = "https://www.nhra.bh/Departments/CPD/ct/";
const NHRA_CT_REPORT = "https://www.nhra.bh/Departments/CPD/ct/MediaHandler/GenericHandler/documents/departments/CT/Statistics/Approved%20CT%20Report%2021-22.pdf";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const SCH_SEHATI = "https://www.sch.org.bh/en/projects/the-national-health-insurance-program-sahti.html";
const SCH_SHIFA = "https://www.sch.org.bh/en/projects/health-insurance-fund-shifa.html";
const SCH_FAQ = "https://www.sch.org.bh/en/media-center/faq.html";
const SCH_ABROAD = "https://www.sch.org.bh/en/committees/overseas-treatment.html";
const SCH_PROCUREMENT = "https://www.sch.org.bh/en/committees/the-national-committee-for-unified-procurement-of-medicines-and-medical-supplies.html";
const SEHATI_PORTAL = "https://www.sehati.gov.bh/";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=BH";
const WB_PER_PERSON = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=BH";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=BH";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const BMB_2018 = "https://www.bahrainmedicalbulletin.com/DEC_2018/DEC2018_EDITORIAL.pdf";
const KHUH_IA = "https://web.archive.org/web/20240522213703/https://www.khuh.org.bh/en/about-the-centre";
const JASSIM_2025 = "https://doi.org/10.2147/ijwh.s535787";
const RCSI_2025 = "https://www.rcsi.com/bahrain/news/news-article/2025/10/early-detection-and-innovation-in-screening-for-breast-cancer";
const WIISE_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'BHR'";
const WIISE_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27BHR%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29";
const CTGOV = "https://clinicaltrials.gov/search?country=Bahrain&cond=cancer";
const LANCET_2025 = "https://doi.org/10.1016/s1470-2045(25)00226-8";

export const BH_DIVE: CountryDive = {
  iso2: "BH",
  iso3: "BHR",
  name: "Bahrain",
  flag: "🇧🇭",
  asOf: "2026-11-16",
  title: "Cancer in Bahrain",
  description:
    "Cancer in Bahrain from the Ministry of Health, the National Health Regulatory Authority, the Supreme Council of Health, WHO, IARC and the IAEA: IARC's estimate of 2,103 new cancers and 882 deaths in 2024, projected from the national registry; the registry count of 1,230 Bahrainis and 171 non-Bahrainis in 2024 that the Ministry of Health gave Parliament, as a newspaper reported it; the free basic package for citizens at government hospitals that the Supreme Council of Health describes; a 3 working day target on the fast track for medicines already approved by named regulators; breast screening from age 40; HPV vaccine for girls and boys since 2023; and one radiotherapy centre.",
  lede:
    "Bahrain has had a national cancer registry with compulsory reporting since the 1990s, and IARC builds its estimate for the country from it: 2,103 new cancers and 882 deaths in 2024, with breast cancer a fifth of all cases. The Supreme Council of Health describes a basic package for citizens that is free at government hospitals, and the Ministry of Health calls the oncology centre at King Hamad University Hospital a national specialist hub; about half the people living in Bahrain are not citizens, and the Council's pages set out different cover for them.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Bahrain is 2,103 new cancers and 882 deaths, an age-standardised incidence of 147.1 per 100,000 (138.6 in men, 171.5 in women) and mortality of 68.9, including 13 non-melanoma skin cancers. The fact sheet gives the incidence source as a national registry and the method as trends in national rates projected to 2024. Deaths are not counted from death certificates: IARC applies modelled mortality-to-incidence ratios, built from registry survival data, to the incidence estimate. The registry's own figures are lower and are reported by nationality. The Ministry of Health told Parliament that the National Cancer Registry counted 1,230 cancers among Bahrainis and 171 among non-Bahrainis in 2024, 1,401 together, against IARC's 2,103 for a population of 1,607,053. The Ministry's Annual Health Statistics Report records 486 deaths from neoplasms among all residents in 2022, against IARC's 882 cancer deaths for 2024, and WHO's 2020 profile rated the quality of Bahrain's mortality registration as low for 2007 to 2016. OnCo did not read IARC's detailed methods page for Bahrain, so it cannot say which registry years the projection used or how residents who are not citizens enter it.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bahrain",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 2,100 new cancers a year in IARC's estimate, a fifth of them breast cancer",
          plain:
            "IARC estimates 2,103 new cancers in Bahrain in 2024: 1,071 in men and 1,032 in women. Breast cancer is the commonest, with 433 cases, followed by bowel, bladder and lung cancer. IARC estimates 882 deaths from cancer in the same year. These are projections from the national registry's past figures, not a count for 2024.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 433 breast cancers (20.6% of all cancers and 42.0% of cancers in women), 228 colorectal, 152 bladder, 115 lung and 113 cancers of the body of the womb. In men the commonest are colorectum (143), bladder (136), lung (89), prostate (87) and non-Hodgkin lymphoma (71); in women breast, corpus uteri (113), colorectum (85), thyroid (68) and ovary (51). The cancers with the most estimated deaths are breast cancer (118), colorectal and lung cancer (101 each), liver cancer (58) and bladder cancer (56). Cervical cancer is estimated at 20 cases and 6 deaths. The risk of developing a cancer before age 75 is 14.4% for men and 17.2% for women, and an estimated 6,745 people are living within five years of a diagnosis. The fact sheet's population is 1,607,053, of whom 997,034 are male and 610,024 female, so counts for men and women are not directly comparable; the age-standardised rates are 138.6 per 100,000 in men and 171.5 in women.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
          ],
        },
        {
          id: "registry-2024",
          title: "The registry count the Ministry gave Parliament for 2024: 1,230 Bahrainis and 171 non-Bahrainis",
          plain:
            "In a written reply to Parliament, the Ministry of Health said the National Cancer Registry recorded 1,230 cancers among Bahrainis in 2024 (535 men and 695 women) and 171 among non-Bahrainis. About half of the cancers registered that year were recorded as still limited to the organ where they started.",
          detail:
            "News of Bahrain reported the Ministry's reply to MP Jalal Kadhem. Among Bahraini men the highest numbers were in the 65 to 69 and 70 to 74 age groups, and among Bahraini women in the 60 to 64 and 65 to 69 groups. Among non-Bahrainis there were 78 cases in men and 93 in women, mostly aged 40 to 64. For stage at first diagnosis, 50.68% of registered cases were recorded as localised, 12.53% as unknown and 7.42% as not applicable, such as leukaemia; the report does not give the remaining shares. The Ministry said care is delivered through primary healthcare centres, government hospitals, the Bahrain Oncology Centre and dialysis units. The reply also gave 525 deaths from cancer, 467 among Bahrainis and 58 among non-Bahrainis; in a separate report the Health Minister told Parliament that the death totals being quoted cover several years, not deaths among cases recorded in 2024 alone, and that the Ministry was reviewing its statistical measures. OnCo could not find the reply itself or a registry report for 2024, so these figures rest on the newspaper's account.",
          links: [
            { label: "News of Bahrain: Bahrain records over 1,400 cancer cases in 2024 (Ministry of Health reply to Parliament)", url: NOB_REGISTRY },
            { label: "News of Bahrain: cancer death totals span several years, health minister tells Parliament", url: NOB_MINISTER },
          ],
        },
        {
          id: "two-populations",
          title: "More than half of residents are not citizens, and the figures are kept apart",
          plain:
            "Bahrain's official cancer figures are reported separately for Bahrainis and non-Bahrainis. In 2022 the Ministry of Health counted 714,011 Bahrainis and 810,682 non-Bahrainis living in the country. The registry's detailed published tables are for Bahrainis, so a figure quoted for Bahrain may describe citizens alone or everyone.",
          detail:
            "The Ministry's Annual Health Statistics Report 2021/2022 gives a mid-year population of 1,524,693 for 2022: 714,011 Bahraini (361,587 male, 352,424 female) and 810,682 non-Bahraini (585,450 male, 225,232 female). The Ministry's 2014 cancer report describes the Bahrain Cancer Registry as a national population-based registry covering all residents, but its incidence tables, rates and trends are for Bahraini nationals. The 2024 figures given to Parliament show 1,230 cancers among Bahrainis and 171 among non-Bahrainis, and the non-Bahraini cases were mostly in people aged 40 to 64. IARC's estimate is for the whole population. The sources read do not say how many non-Bahraini residents are diagnosed or treated outside Bahrain, so the count of 171 may not describe all cancers in that group.",
          links: [
            { label: "Ministry of Health: Annual Health Statistics Report 2021/2022 (PDF)", url: MOH_STATS_2022 },
            { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
          ],
        },
      ],
      tables: [
        {
          id: "bh-registry",
          title: "What the Bahrain Cancer Registry has reported",
          caption: "New cancers registered in the year, and age-standardised incidence per 100,000 (world standard) where the source gives it.",
          columns: [
            { key: "group", label: "Year and group" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "asrMen", label: "Rate, men", numeric: true },
            { key: "asrWomen", label: "Rate, women", numeric: true },
          ],
          rows: [
            { group: "2014, Bahrainis", cases: 746, men: 309, women: 437, asrMen: 125.9, asrWomen: 166.2 },
            { group: "2024, Bahrainis", cases: 1230, men: 535, women: 695, asrMen: null, asrWomen: null },
            { group: "2024, non-Bahrainis", cases: 171, men: 78, women: 93, asrMen: null, asrWomen: null },
            { group: "2024, IARC estimate for the whole population (for comparison)", cases: 2103, men: 1071, women: 1032, asrMen: 138.6, asrWomen: 171.5 },
          ],
          note: "The 2014 row is from the Ministry of Health's registry report, which tabulates Bahraini nationals. The 2024 registry rows are from the Ministry's written reply to Parliament as reported by News of Bahrain, which gives no rates. The last row is IARC's projection, not a registry count. In 2014 the five commonest cancers among Bahrainis were breast (178), colorectum (72), lung (59), non-Hodgkin lymphoma (41) and thyroid (36).",
          sources: [
            { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: the Bahrain Cancer Registry",
      aside: { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF)", url: MOH_2014 },
      cards: [
        {
          id: "registry-how",
          title: "Reporting a cancer has been compulsory since 1994",
          plain:
            "A 1994 ministerial decree obliges every doctor in Bahrain to report each cancer to the Bahrain Cancer Registry, which the Ministry of Health's 2014 report places in the Ministry. The Ministry says reliable data meeting international standards exist from 1998. In 2014 the registry also sent staff to the main hospitals to collect cases, and checked its list against death records each year.",
          detail:
            "The Ministry's 2014 report says Ministerial Decree 5/1994 made cancer notification mandatory, with the registry at the Medical Review Office, and that comprehensive data complying with international standards became available in 1998. It describes active collection, with registrars visiting Salmaniya Medical Complex four times a week and the Bahrain Defence Force Hospital and King Hamad University Hospital once a month; passive reporting by government and private hospitals, clinics and laboratories; an electronic notification form from 2010; tracing of patients diagnosed abroad; and an annual list of cancer deaths from the Health Information Directorate that is matched against registered cases. Cases are coded with ICD-O-3 and held in CanReg4. Bahrain's data also go to the Gulf Center for Cancer Registration, set up in 1997 for the six Gulf Cooperation Council states. WHO's 2020 profile rated the registry a high quality population-based cancer registry for 2019. Between 1998 and 2014 it registered 8,013 cancers among Bahrainis, about 471 a year.",
          links: [
            { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
          ],
        },
        {
          id: "deaths-counted",
          title: "Deaths: 486 from tumours in 2022 in the Ministry's statistics",
          plain:
            "The Ministry of Health's statistics record 465 deaths from neoplasms (tumours) in 2021 and 486 in 2022 among everyone living in Bahrain. IARC's estimate of cancer deaths for 2024, which is modelled from new cases and not counted, is 882. WHO has rated the quality of Bahrain's death registration by cause as low.",
          detail:
            "The Annual Health Statistics Report 2021/2022 lists neoplasms (ICD-10 codes C00 to D49) as 465 of 4,601 deaths in 2021 (10.1%) and 486 deaths in 2022 (13.8%), of which 447 were among Bahrainis and 39 among non-Bahrainis, and gives a cancer mortality rate of 31.02 per 100,000 population for 2022. The registry's 2014 report counted 265 deaths among Bahrainis with cancer as the underlying cause, 134 in men and 131 in women, with age-standardised rates of 57.1 and 52.9 per 100,000; breast cancer (44 deaths) and colorectal cancer (32) led. WHO's 2020 profile marks the quality of mortality registration for 2007 to 2016 as low and notes that its mortality estimates for Bahrain have a high degree of uncertainty because they are not based on national mortality data for noncommunicable diseases. IARC's 882 comes from applying modelled ratios of deaths to new cases, not from these counts. OnCo found no published survival figures for Bahrain.",
          links: [
            { label: "Ministry of Health: Annual Health Statistics Report 2021/2022 (PDF)", url: MOH_STATS_2022 },
            { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: what the health insurance law sets out for citizens and for other residents",
      aside: { label: "Supreme Council of Health: questions and answers on health insurance", url: SCH_FAQ },
      cards: [
        {
          id: "public-care",
          title: "For citizens, the Council describes a free basic package at government hospitals, medicines included",
          plain:
            "The Supreme Council of Health's answers on the health insurance programme say the basic health package for citizens is free, will have no financial cap and will cover treatment at government hospitals and health centres, including medicines. Those answers describe a programme still being introduced, and OnCo read no dated official statement of what a citizen is charged today. Across the whole country, the World Bank's series puts out-of-pocket payments at about 29% of health spending in 2023, and government spending at about 59%.",
          detail:
            "The Council's questions and answers say the mandatory basic package for citizens will include all current health services, is free, and will allow citizens to be treated in all government hospitals and clinics of their choice without a financial cap, and that in the basic package medications are covered and free of charge for citizens at government hospitals and healthcare centres. The same answers speak of the continuity of health services currently provided by the government to citizens, without saying what those cost. The Ministry of Health told Parliament that cancer cases are treated within the government system under current protocols. World Bank series give out-of-pocket spending as 28.7% of current health spending in 2023 (30.0% in 2019, 25.8% in 2021), government spending as 59.3%, and health spending of about 1,176 US dollars per person, 4.0% of GDP. Those shares are for all residents and all health care, not cancer care. The sources read do not say what a non-citizen resident pays for cancer treatment at a government hospital.",
          links: [
            { label: "Supreme Council of Health: questions and answers on health insurance", url: SCH_FAQ },
            { label: "World Bank: out-of-pocket spending as % of current health spending, Bahrain", url: WB_OOP },
            { label: "World Bank: government health spending as % of current health spending, Bahrain", url: WB_GOV },
            { label: "World Bank: current health spending per person, Bahrain", url: WB_PER_PERSON },
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
          ],
        },
        {
          id: "sehati",
          title: "A national health insurance law since 2018, with a fund called Shifa",
          plain:
            "Law No. 23 of 2018 set up a national health insurance programme, known as Sehati. A public fund, Shifa, is to buy care for citizens with state money, while non-citizen residents are to be covered by a basic package bought through employers and insurance companies. The Council's pages describe much of this as still to come.",
          detail:
            "The Supreme Council of Health describes the Health Insurance Fund as responsible for registering participants, collecting subscriptions, contracting with providers and paying them, and says the Ministry of Health will move from providing services to monitoring, policy and public health. Its Shifa page sets out a mandatory package for citizens funded by the state at government facilities; cover for foreign residents under a mandatory package, either directly or through insurance companies, with registration the responsibility of the employer; and an optional package, 40% paid by the participant and 60% by the government, for treatment in private hospitals. The Council's answers say the optional package is not available at present and that the residents' basic package includes some primary care, inpatient, outpatient and emergency care and chronic diseases. Those pages are written in the future tense and carry a 2022 copyright line; the Sehati portal's front page says a new health insurance system has been launched and shows \"Last Update: 05/08/2025\". In Parliament an MP pressed for quicker activation of the programme. OnCo could not confirm how much of it is operating; see the gaps.",
          links: [
            { label: "Supreme Council of Health: the National Health Insurance Program (Sehati)", url: SCH_SEHATI },
            { label: "Supreme Council of Health: Health Insurance Fund (Shifa)", url: SCH_SHIFA },
            { label: "Supreme Council of Health: questions and answers on health insurance", url: SCH_FAQ },
            { label: "Sehati: national health insurance portal", url: SEHATI_PORTAL },
            { label: "News of Bahrain: health minister and MP in Parliament", url: NOB_MINISTER },
          ],
        },
        {
          id: "treatment-abroad",
          title: "Treatment abroad for care not available in Bahrain",
          plain:
            "Where a patient needs specialist care that Bahrain does not provide, the Ministry of Health says they can be referred abroad under medical criteria, paid for from a treatment abroad budget overseen by a committee of the Supreme Council of Health, whose own page speaks of citizens. The Ministry's reply to Parliament listed Saudi Arabia, Jordan and Turkey as the main destinations.",
          detail:
            "The Council's page describes its Supreme Committee for Treatment Abroad as responsible for the procedures for sending citizens abroad for treatment; it says nothing about residents who are not citizens. It says the committee receives cases referred from the Royal Court, the offices of the Prime Minister and the Crown Prince, the Ministry of Financial and Economic Affairs, Salmaniya Medical Complex and King Hamad University Hospital, decides whether treatment abroad, treatment in Bahrain or a visiting specialist is needed, identifies centres abroad to contract with at agreed prices, and runs a visiting specialist programme meant to reduce the need to travel. The Ministry's reply, as reported, listed 58 cases sent to Saudi Arabia, 44 to Jordan, 42 to Turkey, 10 to Germany, five to India, two to the United Kingdom and one each to Thailand and Kuwait; the report covers cancer and kidney failure together and does not say how many were cancer patients or which year the counts are for. The Ministry gave no separate budget figure for cancer care. A 2018 editorial from King Hamad University Hospital said that patients needing bone marrow transplants or stereotactic radiotherapy had until then been referred abroad.",
          links: [
            { label: "Supreme Council of Health: treatment abroad committee", url: SCH_ABROAD },
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
            { label: "Al Khalifa, Corbally and Fotina: The National Oncology Center at King Hamad University Hospital (Bahrain Med Bull 2018, PDF)", url: BMB_2018 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the National Health Regulatory Authority",
      aside: { label: "NHRA: Medicine Licensing Guideline, version 4.2 (January 2026, PDF)", url: NHRA_LICENSING },
      cards: [
        {
          id: "nhra-licensing",
          title: "A 3 working day fast track for medicines already approved elsewhere",
          plain:
            "A medicine must be licensed by the National Health Regulatory Authority (NHRA) before it can be sold in Bahrain. Its licensing guideline, in the version dated January 2026, offers a fast track for a medicine already registered by the Gulf's central procedure or by the Saudi, United States, European, Swiss or United Kingdom regulators, with an assessment target of 3 working days against 35 for the normal route.",
          detail:
            "The NHRA describes itself as an independent regulatory body established in 2010 under Law No. 38 of 2009, with the Supreme Council of Health as its supreme authority. Its Medicine Licensing Guideline, version 4.2 of January 2026, requires a dossier in the common technical document format and, for the fast track, proof of registration with one of GHC Central, SFDA, USFDA, EMA, Swissmedic or MHRA, with the batch-releasing site registered with the NHRA and approved by one of those authorities. The service level timelines, excluding stop-clock periods, are 35 working days for the normal pathway and 3 for the fast track. Other rules in the guideline: a medicine must have been licensed and marketed in its country of origin for at least one year before the application; a licensing committee decides after assessment, laboratory analysis and pricing; a licence lasts 5 years; and the product must be marketed within 2 years of registration. Bahrain is not on WHO's August 2026 list of regulators assessed at maturity level 3 or 4. The timelines are the Authority's targets; OnCo found no published figures on how long cancer medicines have actually taken.",
          links: [
            { label: "NHRA: Medicine Licensing Guideline, version 4.2 (January 2026, PDF)", url: NHRA_LICENSING },
            { label: "NHRA: overview", url: NHRA_OVERVIEW },
            { label: "NHRA: Pharmacy & Pharmaceutical Products Regulation", url: NHRA_PPR },
            { label: "WHO: list of national regulatory authorities at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
          ],
        },
        {
          id: "pricing-and-supply",
          title: "Prices are set by the regulator, and government hospitals buy together",
          plain:
            "The NHRA sets the price of every registered medicine and publishes a price list. For government hospitals, a national committee under the Supreme Council of Health approves purchases, keeps the list of essential medicines and buys with other Gulf states where it can. OnCo found no separate body that judges whether a new cancer drug is worth its cost.",
          detail:
            "The NHRA's Medicine Pricing Guideline, version 3.0 of January 2022, says pricing considers the price in the country of origin, prices in other countries, pharmacoeconomic studies if available, prices of similar medicines registered in Bahrain and the therapeutic significance of the drug. A new medicine's import price is the lowest produced by the guideline's mechanisms, and an innovator's price is reduced by 20% once its first generic or biosimilar is registered, unless the price is unified across the Gulf Cooperation Council. Unregistered medicines brought in under a temporary importation permission are also priced. The NHRA's lists page offers a Registered Medicine Price List dated 7 September 2026 and a Temporary Importation Medicines List; OnCo did not open the spreadsheets. The Council's National Committee for Unified Procurement of Medicines and Medical Supplies reviews purchase requests from government health bodies, supervises the national strategic stock, prepares and reviews each year a list of essential national medicines, considers proposals to add a new drug, and works to increase use of the Gulf unified procurement programme. Which cancer medicines are on that list is not published on the pages read; see the gaps.",
          links: [
            { label: "NHRA: Medicine Pricing Guideline, version 3.0 (January 2022, PDF)", url: NHRA_PRICING },
            { label: "NHRA: medicines lists, including the registered medicine price list", url: NHRA_LISTS },
            { label: "Supreme Council of Health: National Committee for Unified Procurement of Medicines and Medical Supplies", url: SCH_PROCUREMENT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening from age 40, every two years, offered at health centres",
          plain:
            "The Ministry of Health recommends a mammogram every two years for women aged 40 and over, free for Bahraini nationals at government health centres. Women are not sent invitations; a doctor offers the test during a visit. A study of 2,196 screening mammograms from 2020 found 12.3 cancers for every 1,000 women screened, and three in ten women called back for more tests.",
          detail:
            "Jassim and colleagues, writing in 2025 with authors from primary care and the Ministry's public health directorate, describe mammography as offered every two years to women aged 40 and above at five of the 27 primary healthcare centres, as opportunistic screening, free of charge to Bahraini nationals, with a newer Choose Your Doctor system in some centres that lets family physicians invite eligible women. Their review of 2,196 screening mammograms from 2020, checked against the Bahrain Cancer Registry for 2021 and 2022, found a cancer detection rate of 12.3 per 1,000 screens, a recall rate of 30.6%, sensitivity of 69.2%, specificity of 71.2% and an interval cancer rate of 5.4 per 1,000; the authors call this moderate utility with a relatively high recall rate and recommend double reading. RCSI Bahrain's 2025 account says films are read at a central screening office and suspicious findings go to the Breast Assessment Clinic at Salmaniya Medical Complex. The Health Minister told Parliament that mammogram devices are available in all governorates, and the Tender Board has awarded a contract of about 494,000 Bahraini dinars for a dedicated breast screening unit in public hospitals. WHO's 2020 profile records a breast screening programme starting at age 40. OnCo found no published figure for the share of eligible women screened.",
          links: [
            { label: "Jassim et al., performance metrics of mammography screening in primary health care centres in Bahrain (Int J Womens Health 2025)", url: JASSIM_2025 },
            { label: "RCSI Bahrain: early detection and innovation in screening for breast cancer (29 October 2025)", url: RCSI_2025 },
            { label: "News of Bahrain: health minister in Parliament", url: NOB_MINISTER },
            { label: "News of Bahrain: dedicated breast cancer screening unit awarded by the Tender Board", url: NOB_UNIT },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
          ],
        },
        {
          id: "other-screening",
          title: "Cervical, bowel and prostate checks in primary care",
          plain:
            "The Ministry of Health says its primary care centres screen for breast, cervical, prostate and bowel cancers and refer anyone with a suspicious result. WHO's 2020 profile described cervical screening in 2019 as opportunistic, by smear test, reaching fewer than one in ten women. OnCo found no published schedule saying who is offered which test, or how often.",
          detail:
            "In its reply to Parliament the Ministry said primary care centres run screening for breast, cervical, prostate and colorectal cancers, with suspected cases referred for further tests and treatment planning. The Health Minister said colon cancer screening had been added to primary care during the current legislative term, alongside screening for prostate and cervical cancers. WHO's 2020 profile recorded, for 2019, cervical screening of the opportunistic type using the PAP smear with participation under 10%, early detection guidelines for four cancers (breast, cervix, colon and childhood cancers) and a defined referral system. IARC estimates 20 cervical cancers and 228 colorectal cancers in Bahrain in 2024. The test used for bowel screening, the ages covered and the numbers screened are not in any source read. Ask the health centre which checks apply at your age.",
          links: [
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
            { label: "News of Bahrain: health minister in Parliament", url: NOB_MINISTER },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "HPV vaccine for girls and boys aged 12 to 13 since 2023",
          plain:
            "Bahrain added the HPV vaccine to its national schedule in 2023 for both girls and boys aged 12 to 13, in two doses. The Health Minister says it can help guard against cervical cancer and other cancers that affect women and men. WHO's figures for 2025 show 71% of girls and 67% of boys in the target group received a first dose, and about six in ten the last dose.",
          detail:
            "WHO's immunisation data record the HPV vaccine as not introduced in Bahrain up to 2022 and introduced nationwide from 2023. The Ministry of Health's recommended schedule lists HPV at 12 to 13 years, two doses at least six months apart, and the Ministry announced it as a routine vaccine for females and males. WHO's programme coverage rows give, for 2024, a first dose for 72% of girls (7,046 of 9,848) and 68% of boys (7,013 of 10,384), and for 2025 a first dose for 71% of girls and 67% of boys and a last dose for 61% of girls (12,084 doses against a target of 19,725) and 59% of boys; there are no coverage figures for 2021 to 2023. Hepatitis B vaccine, which the Ministry also cites as reducing the risk of some cancers, has been in the schedule since 1991 in WHO's records and is given at birth and in infancy. The national noncommunicable disease strategy for 2014 to 2025 lists hepatitis B coverage and the availability of HPV vaccine among its cancer prevention indicators.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Bahrain (API)", url: WIISE_HPV },
            { label: "WHO immunisation data: vaccine introductions, Bahrain (API)", url: WIISE_INTRO },
            { label: "Ministry of Health: recommended immunisation schedule", url: MOH_IMMUNISATION },
            { label: "News of Bahrain: Bahrain to introduce HPV vaccine for routine immunization", url: NOB_HPV },
            { label: "Ministry of Health: National Strategy for Control and Prevention of Non-communicable Diseases 2014 to 2025 (PDF, FAOLEX copy)", url: NCD_STRATEGY },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA: DIRAC, directory of radiotherapy centres", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, with three treatment machines in the IAEA's directory",
          plain:
            "The IAEA's directory of radiotherapy centres lists one centre in Bahrain with three megavoltage machines for external radiotherapy, and brachytherapy, which places a radioactive source close to the tumour. A 2018 article from King Hamad University Hospital described two linear accelerators there. Ask the centre how long the wait to start treatment is.",
          detail:
            "The DIRAC country row for Bahrain, read on 16 November 2026 and marked as last updated in 2026, gives RTCenters 1, HePhotonAndElectronBeamRt 3 (high-energy photon and electron beam units) and BrachyTherapyIncEl 1; its separate fields for linear accelerators, cobalt units, CT scanners and planning systems are all 0 in this row, which OnCo takes as not filled in at country level, not as a count of none. In December 2018 the hospital's chief executive, chief of staff and a senior radiation physicist wrote that radiotherapy at the new oncology centre was given on two linear accelerators with photon and electron beams under image guidance, that high-dose-rate brachytherapy had recently been introduced for gynaecological cancers, and that stereotactic radiosurgery and stereotactic body radiotherapy would become available. WHO's 2020 profile recorded 19.1 external beam radiotherapy units per 10,000 cancer patients for 2019. OnCo found no current statement from the hospital of how many machines are working; see the gaps.",
          links: [
            { label: "IAEA: DIRAC, directory of radiotherapy centres (country data)", url: DIRAC },
            { label: "Al Khalifa, Corbally and Fotina: The National Oncology Center at King Hamad University Hospital (Bahrain Med Bull 2018, PDF)", url: BMB_2018 },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
          ],
        },
        {
          id: "oncology-centre",
          title: "The oncology centre at King Hamad University Hospital, and Salmaniya",
          plain:
            "The Ministry of Health describes the oncology centre at King Hamad University Hospital, in Muharraq Governorate, as a national specialist hub for patients from across the country. Salmaniya Medical Complex also has oncology services and the breast assessment clinic.",
          detail:
            "The hospital's own page, read in an Internet Archive copy of 22 May 2024 because the live site returned an error, describes a 410-bed university hospital and the King Hamad Oncology Center with 120 rooms for adult and paediatric patients, listing chemotherapy, radiation therapy, bone marrow transplantation, intensive care, day treatment and research. The 2018 editorial said the centre would formally open early in 2019, had an interim contract with Hacettepe University Hospital in Turkey, where Bahraini doctors and nurses had trained, and had started a National Tumor Board at which physicians from all over Bahrain discuss their patients. The Ministry of Health's summary to Parliament called the King Hamad Cancer Centre a national specialist hub covering patients across the Kingdom; members proposing a cancer treatment centre in East Riffa cited pressure on oncology services at Salmaniya Medical Complex and King Hamad University Hospital. The registry's 2014 report called Salmaniya the largest tertiary centre for diagnosis and treatment of cancer at that time, before the new centre opened. The sources use several names for the centre: Bahrain Oncology Centre, King Hamad Oncology Center and National Oncology Center.",
          links: [
            { label: "King Hamad University Hospital: about the hospital and its oncology centre (Internet Archive copy of 22 May 2024)", url: KHUH_IA },
            { label: "Al Khalifa, Corbally and Fotina: The National Oncology Center at King Hamad University Hospital (Bahrain Med Bull 2018, PDF)", url: BMB_2018 },
            { label: "News of Bahrain: East Riffa cancer centre proposal and the Ministry's view", url: NOB_RIFFA },
            { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Bahrain does",
      title: "What Bahrain does differently",
      cards: [
        {
          id: "cancer-plan",
          title: "Cancer control sits inside the noncommunicable disease strategy",
          plain:
            "The Ministry of Health says it has a cancer prevention and control plan linked to its wider work on noncommunicable diseases, and WHO recorded a national cancer plan as operational in 2019. The strategy OnCo could read is the national noncommunicable disease strategy for 2014 to 2025. OnCo did not find a separate, current cancer plan document.",
          detail:
            "The National Strategy for Control and Prevention of Non-communicable Diseases in Kingdom of Bahrain 2014 to 2025 says the government endorsed a comprehensive national plan in 2012, drawn from a unified Gulf plan and overseen by a supreme national committee formed by Prime Ministerial resolution. Its long-term objective is a 25% relative reduction in the risk of premature death from cardiovascular diseases, cancer, diabetes or chronic respiratory diseases among adults aged 30 to 70. For cancer prevention it sets indicators, not targets: cancer incidence by type, coverage with the third dose of hepatitis B vaccine, and availability of HPV vaccine; it also calls for a national registry and surveillance system for noncommunicable diseases. WHO's 2020 profile marks a national cancer control plan and an integrated noncommunicable disease plan as operational in 2019, with cancer management guidelines and palliative care included. The Ministry's one-page Strategic Plan 2023 to 2026 names preventive health services among its objectives and does not mention cancer. The Health Minister told Parliament that a national taskforce counts cancer prevention and control among its core tasks and involves the Bahrain Cancer Society.",
          links: [
            { label: "Ministry of Health: National Strategy for Control and Prevention of Non-communicable Diseases 2014 to 2025 (PDF, FAOLEX copy)", url: NCD_STRATEGY },
            { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE },
            { label: "Ministry of Health: Strategic Plan 2023 to 2026 (PDF)", url: MOH_PLAN },
            { label: "News of Bahrain: Ministry of Health reply to Parliament on 2024 figures", url: NOB_REGISTRY },
            { label: "News of Bahrain: health minister in Parliament", url: NOB_MINISTER },
          ],
        },
        {
          id: "family-doctor",
          title: "A named family doctor who can invite people for screening",
          plain:
            "Bahrain has introduced, in some health centres so far, a scheme called Choose Your Doctor, in which a person registers with a family doctor of their choice. The Health Minister says prevention and early checks run through it, and researchers note it lets doctors invite eligible women for a mammogram instead of waiting for a visit.",
          detail:
            "The Supreme Council of Health's answers on the insurance programme say each citizen will be registered with a family doctor responsible for treatment, prevention and early detection of chronic diseases, with referral to specialists when needed, and that the choice of family doctor is made through the Choose Your Doctor programme. Jassim and colleagues wrote in 2025 that the system had been introduced in select health centres in the last couple of years and enables the physician to actively invite eligible women for screening, where screening had depended on a woman happening to see a doctor. The Health Minister told Parliament that prevention work runs through primary health care and the scheme, with early checks treated as a key test of progress. She also cited the National Genome Project's role in spotting inherited risk for some cancers, with counselling for people found to carry high-risk genetic markers. OnCo found no figures on how many centres use the scheme or whether screening uptake has changed.",
          links: [
            { label: "Supreme Council of Health: questions and answers on health insurance", url: SCH_FAQ },
            { label: "Jassim et al., performance metrics of mammography screening in primary health care centres in Bahrain (Int J Womens Health 2025)", url: JASSIM_2025 },
            { label: "News of Bahrain: health minister in Parliament", url: NOB_MINISTER },
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
          title: "No trial in OnCo's records has a site in Bahrain",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, none of the cancer trials in our records lists a site in Bahrain. OnCo holds a selection of trials, not the whole registry. A search of ClinicalTrials.gov itself finds four cancer-related studies with a site in Bahrain; going by their titles, none is a trial of a cancer medicine.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: 0 trials list Bahrain among their countries. The ClinicalTrials.gov API, asked the same day for studies with the condition cancer and a location in Bahrain, returned four: NCT07764341, a trial of supervised exercise during chemotherapy before surgery for breast cancer, sponsored by King Hamad University Hospital and not yet recruiting; NCT06876961, a completed exercise study after bowel surgery sponsored by Cairo University; and two completed observational studies, of HPV types in women in Bahrain (NCT01205412, GlaxoSmithKline) and of lung cancer management in the Middle East and North Africa (NCT01562665, AstraZeneca). Clinical trials need approval from the NHRA, whose Clinical Trials Committee was formed by decree No (52)/2015 of the Supreme Council of Health. Its report of approved trials for 2021 to 2022 lists studies in COVID-19, sickle cell disease, lupus nephritis, asthma and dentistry, and none in cancer; its page says the list of approved trials is under review and update. A Europe PMC search for Bahrain cancer research returned 36 records, many of them about breast cancer.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Bahrain (search)", url: CTGOV },
            { label: "NHRA: clinical trials regulation", url: NHRA_CT },
            { label: "NHRA: approved clinical trials report 2021 to 2022 (PDF)", url: NHRA_CT_REPORT },
            { label: "Europe PMC: search", url: "https://europepmc.org/search?query=%22Bahrain%20Cancer%20Registry%22%20OR%20(TITLE%3ABahrain%20AND%20TITLE%3Acancer)" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-reports",
      title: "No registry report after 2014 could be found",
      plain:
        "The latest full report of the Bahrain Cancer Registry that OnCo could read covers 2014. The 2024 figures on this page come from a newspaper's account of the Ministry of Health's reply to Parliament, which gives totals by nationality and sex but no breakdown by type of cancer, no rates and no survival.",
      detail:
        "The Ministry of Health's statistics page lists annual health statistics up to 2021/2022 and no cancer registry report; the 2014 report was read from a copy on a WHO server. The News of Bahrain pages return no publication date in their text to a plain request, so the reports are not dated here. The stage shares reported for 2024 add up to about 71%, and the rest is not given. The 525 cancer deaths in the reply are not used as a figure for 2024 because the Health Minister said the totals span several years. No survival figures for Bahrain were found. IARC's detailed data sources and methods page for Bahrain was not read; the method is taken from the fact sheet. A 2025 article in The Lancet Oncology on cancer care in Bahrain has no abstract and is not open access, so nothing is taken from it. WHO's 2020 profile was read from the copy on the International Cancer Control Partnership portal because WHO's own address returned 404 with no Internet Archive copy.",
      links: [
        { label: "Ministry of Health: statistics", url: MOH_STATS_INDEX },
        { label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 },
        { label: "Hamadeh and Jahrami, cancer care in Bahrain: progress, challenges, and strategic priorities (Lancet Oncol 2025; not read)", url: LANCET_2025 },
      ],
    },
    {
      id: "centre-now",
      title: "The oncology centre's own current information could not be read",
      plain:
        "King Hamad University Hospital's website returned an error (HTTP 525) when this page was checked, and the newest working Internet Archive copy of its oncology page is from May 2024. So the centre's current services, number of working radiotherapy machines, transplant activity and waiting times are not on this page.",
      detail:
        "The archived page gives the number of rooms and a list of services and nothing on activity. The Royal Medical Services site (rms.bh), whose name heads the hospital's archived page, returned a page that needs scripts to display. The fullest description found is the December 2018 editorial, written before the formal opening. The IAEA DIRAC row gives one centre, three megavoltage units and brachytherapy, with its other equipment fields at 0; OnCo does not know which machines the three are. WHO's 2020 profile said bone marrow transplantation was generally available in 2019, but OnCo found no count of transplants. Salmaniya Medical Complex has no page of its own describing its oncology service that OnCo could find; the Ministry's mammography page for the hospital is undated and was not used.",
      links: [
        { label: "King Hamad University Hospital (live site; returned HTTP 525 on 16 November 2026)", url: "https://www.khuh.org.bh/" },
        { label: "King Hamad University Hospital: Internet Archive copy of 22 May 2024", url: KHUH_IA },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: DIRAC },
      ],
    },
    {
      id: "insurance-status",
      title: "How far the health insurance programme is running is not confirmed",
      plain:
        "The Supreme Council of Health's pages describe the national health insurance programme mostly as a plan, and OnCo could not read a dated official statement of which parts are in force. What a resident who is not a citizen pays for cancer care, and what an employer's insurance must cover for cancer, are not on this page.",
      detail:
        "The text of Law No. 23 of 2018 could not be fetched: the government server that hosts it (mola.gov.bh) refused the connection. The Sehati portal's services (packages, policy, drug availability) need a login or scripts and were not read; its front page says a new health insurance system has been launched and shows \"Last Update: 05/08/2025\", with nothing to say whether that is 5 August or 8 May. The Council's pages carry a 2022 copyright line and say the optional package for citizens is not available at present. Law firm and insurance broker summaries of the law exist; they are not used. The out-of-pocket share from the World Bank series is for all health care and all residents, with 2023 the latest year.",
      links: [
        { label: "Supreme Council of Health: the National Health Insurance Program (Sehati)", url: SCH_SEHATI },
        { label: "Sehati: national health insurance portal", url: SEHATI_PORTAL },
      ],
    },
    {
      id: "medicines-and-plan",
      title: "Which cancer medicines are provided, and the cancer plan itself",
      plain:
        "OnCo found no published list of the cancer medicines stocked by government hospitals, no body that assesses the value of new medicines, and no text of the cancer prevention and control plan the Ministry of Health refers to.",
      detail:
        "The NHRA publishes a registered medicine price list as a spreadsheet, which shows what may be sold and at what price, not what government hospitals provide; OnCo did not open it. The essential medicines list kept by the unified procurement committee is not on the Council's page. No assessment timelines for actual cancer medicine applications were found. The Ministry's plan was described to Parliament, and WHO recorded a plan as operational in 2019, but the only strategy document read is the noncommunicable disease strategy for 2014 to 2025, whose period has ended; OnCo found no successor. For screening, no schedule of ages, tests and intervals for cervical, bowel or prostate checks was found, and no coverage figures. A TechNet-21 account of the HPV vaccine introduction refused a plain request (HTTP 403), and two Gulf Daily News reports showed only their opening lines, so neither is used. The Gulf Centre for Cancer Control and Prevention's pages were not read.",
      links: [
        { label: "NHRA: medicines lists", url: NHRA_LISTS },
        { label: "Supreme Council of Health: National Committee for Unified Procurement of Medicines and Medical Supplies", url: SCH_PROCUREMENT },
        { label: "Ministry of Health: National Strategy for Control and Prevention of Non-communicable Diseases 2014 to 2025 (PDF, FAOLEX copy)", url: NCD_STRATEGY },
      ],
    },
  ],
  institutions: [
    "bahrain-ministry-of-health", "bahrain-cancer-registry", "bahrain-oncology-centre", "salmaniya-medical-complex", "nhra-bahrain",
    "supreme-council-of-health-bahrain", "who", "iarc", "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from sources read in full as raw text on 16 November 2026, not through a summary: IARC's GLOBOCAN 2024 fact sheet; the Ministry of Health's 2014 cancer registry report, its Annual Health Statistics Report 2021/2022, immunisation schedule and strategy documents; WHO's 2020 cancer country profile; the National Health Regulatory Authority's licensing and pricing guidelines and clinical trial pages; the Supreme Council of Health's pages on health insurance, treatment abroad and procurement; WHO's immunisation data and list of assessed regulators; the IAEA's DIRAC directory; World Bank spending series; a 2018 editorial and an archived page from King Hamad University Hospital; a 2025 paper on mammography screening through Europe PMC; and News of Bahrain's reports of ministry statements to Parliament. Trials were counted from OnCo's ClinicalTrials.gov participation data and from the ClinicalTrials.gov API. The records added for this page (the Bahrain Cancer Registry and the Supreme Council of Health) carry their own sources.",
  verify:
    "IARC's national figures are projections, and the registry's 2024 counts reached this page through a newspaper's account of a reply to Parliament. Rules on who is covered and what is free differ for citizens and other residents and are changing as the insurance programme is introduced; ask the treating hospital or your insurer what applies to you. Regulator timelines are targets, and a medicine being licensed does not mean a government hospital stocks it.",
  verifyLinks: [
    { label: "Ministry of Health, Bahrain", url: "https://www.moh.gov.bh/" },
    { label: "National Health Regulatory Authority", url: "https://www.nhra.bh/" },
    { label: "Supreme Council of Health", url: "https://www.sch.org.bh/en/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Bahrain (PDF)", url: GCO_FACT },
  ],
};
