import type { CountryDive } from "@/data/country-dive";

/**
 * Libya deep dive: the hand-written cards for /countries/ly/ (wave 13). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Libya (PDF text); WHO's
 * cancer country profile for Libya (2020, PDF text); the National Cancer Control Program's site (nccp.gov.ly) through
 * its Internet Archive copies of 17 June 2022 and 16 March 2025, because the live site's certificate has expired; the
 * National Cancer Control Authority's site (ncca.gov.ly, English and Arabic); the Arabic texts of Cabinet Decisions 963
 * of 2022 and 321 of 2023 as published by the Law Society of Libya; the Ministry of Health's site in Tripoli
 * (moh.gov.ly); the Food and Drug Control Centre's site (fdcc.ly); WHO EMRO's 2024 report "Understanding the private
 * health sector in Libya" (PDF text) and five WHO EMRO news pages (2018 to 2025); the IAEA's technical cooperation
 * sheet for Libya (PDF text) and the DIRAC equipment report (JSON); the World Bank and WHO Global Health Observatory
 * APIs; WHO's immunisation data API; WHO's August 2026 list of regulators at maturity level 3 and 4 (PDF text); an
 * IARC news page and an archived UICC interview on breast early detection in Misrata; a Libya Observer report of
 * 10 January 2024; ClinicalTrials.gov's API; and seven papers through Europe PMC (abstracts, and open full text for two).
 *
 * Authority in Libya is divided. Each statement about a public body says which body the source belongs to: the two
 * Cabinet decisions are decisions of the Government of National Unity in Tripoli, and the ministry site read is the
 * Ministry of Health in Tripoli. No health source from the government based in the east was read; that is a named gap.
 * Statements about services carry the date of their source.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/434-libya-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lby-2020.pdf";
const NCCP_ARCHIVE = "https://web.archive.org/web/20250316105837/https://www.nccp.gov.ly/";
const NCCP_REGISTRY_ARCHIVE = "https://web.archive.org/web/20220617015654/https://www.nccp.gov.ly/cancer-registry.html";
const NCCA = "https://ncca.gov.ly";
const D963 =
  "https://lawsociety.ly/legislation/%d9%82%d8%b1%d8%a7%d8%b1-%d8%b1%d9%82%d9%85-963-%d9%84%d8%b3%d9%86%d8%a9-2022-%d9%85-%d8%a8%d8%a5%d9%86%d8%b4%d8%a7%d8%a1-%d8%a7%d9%84%d9%87%d9%8a%d8%a6%d8%a9-%d8%a7%d9%84%d9%88%d8%b7%d9%86%d9%8a/";
const D321 =
  "https://lawsociety.ly/legislation/%d9%82%d8%b1%d8%a7%d8%b1-%d8%b1%d9%82%d9%85-321-%d9%84%d8%b3%d9%86%d8%a9-2023-%d9%85-%d8%a8%d8%a7%d8%b9%d8%aa%d9%85%d8%a7%d8%af-%d8%a7%d9%84%d9%87%d9%8a%d9%83%d9%84-%d8%a7%d9%84%d8%aa%d9%86%d8%b8/";
const LO_2024 = "https://libyaobserver.ly/health/libyan-pm-urges-handling-file-tumors-patients-professionally-and-seriously";
const WHO_PRIVATE = "https://applications.emro.who.int/docs/9789292742447-eng.pdf";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=LY";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=LY";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=LY";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'LBY'";
const MOH_INSURANCE = "https://moh.gov.ly/pages/centers-offices/medical-insurance";
const MOH_POLICY = "https://moh.gov.ly/pages/about-ministry/health-policy";
const MOH_PLAN = "https://moh.gov.ly/pages/about-ministry/health-plan";
const EMRO_SIAMED = "https://www.emro.who.int/lby/libya-events/siamed-workshop.html";
const EMRO_SUPPLY = "https://www.emro.who.int/lby/libya-news/seminar-on-developing-libyan-supply-chain-technical-guidelines.html";
const FDCC = "https://fdcc.ly";
const LJM_2010 = "https://doi.org/10.3402/ljm.v5i0.5440";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const EMRO_NOC_2022 =
  "https://www.emro.who.int/lby/libya-news/the-national-oil-corporation-in-libya-donates-usd-5-million-to-who-to-relieve-the-suffering-of-children-with-cancer.html";
const EMRO_BENGHAZI_2023 = "https://www.emro.who.int/lby/libya-news/who-supports-benghazi-childrens-hospital-with-cancer-medicines.html";
const EMRO_EPI_2025 =
  "https://www.emro.who.int/lby/libya-news/with-who-support-libya-launches-a-comprehensive-review-of-its-national-immunization-programme.html";
const IAEA_TC = "https://www.iaea.org/sites/default/files/25/02/tc-libya.pdf";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WIISE_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27LBY%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29";
const WIISE_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LBY'";
const IARC_CBE = "https://www.iarc.who.int/news-events/breast-cancer-early-detection-training-of-master-trainers-in-libya";
const UICC_MISRATA =
  "https://web.archive.org/web/20250719202546/https://www.uicc.org/news-and-updates/news/25-6-laying-groundwork-change-enhancing-early-detection-breast-cancer-libya";
const BCR_2015 = "https://doi.org/10.1016/j.annepidem.2015.03.012";
const BCR_2007 = "https://doi.org/10.1002/ijc.22273";
const MISURATA_2022 = "https://doi.org/10.1002/cnr2.1448";
const KHCC_2023 = "https://doi.org/10.3389/fonc.2022.1025757";
const CTGOV = "https://clinicaltrials.gov/search?country=Libya&cond=cancer";

export const LY_DIVE: CountryDive = {
  iso2: "LY",
  iso3: "LBY",
  name: "Libya",
  flag: "🇱🇾",
  asOf: "2026-11-16",
  title: "Cancer in Libya",
  description:
    "Cancer in Libya from IARC, WHO, the IAEA and Libyan public bodies: IARC's estimate of 8,070 new cancers and 4,717 deaths in 2024, built from a regional registry; the national registry's 3,784 cases for 2020; the National Cancer Control Authority that the Government of National Unity created in Tripoli in 2022; free public care in law, in WHO's 2024 report, and out-of-pocket payments at 19% of health spending in 2023; five radiotherapy centres in the IAEA's directory, in entries last updated in 2022 and 2023; HPV vaccine in the national schedule since 2013 in WHO's records; and no trial in our records with a site in Libya.",
  lede:
    "IARC estimates 8,070 new cancers and 4,717 deaths in Libya in 2024, calculated from the rates of a regional registry, not from a national count. The Government of National Unity created a National Cancer Control Authority in Tripoli in 2022 and charged it with supplying cancer medicines, overseeing the cancer centres that the same decision transfers to it and keeping a database of patients. Authority in Libya is divided, and most of what this page could read comes from bodies in Tripoli and from WHO, IARC and the IAEA, so each statement carries its source and its date.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Libya is 8,070 new cancers and 4,717 deaths, an age-standardised incidence of 118.9 per 100,000 (135.9 in men, 106.2 in women) and mortality of 71.3; without non-melanoma skin cancer the totals are 8,000 and 4,702. IARC's fact sheet gives the country-specific source for incidence as a subnational registry and the method as subnational rates applied to the 2024 population. It does not name the registry on the sheet. OnCo notes that the Benghazi Cancer Registry, whose two published reports cover eastern Libya in 2003 to 2005, gave age-standardised rates of 135.4 in men and 107.1 in women for those years, close to IARC's 2024 rates; that is OnCo's comparison, not IARC's statement. Mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data (the source is given as Survcan), and prevalence is scaled from Nordic ratios. The national registry, which the site of the National Cancer Control Program in Tripoli described in June 2022 as under its supervision, published 3,784 cases for 2020 after removing duplicates, in statistics dated 15 June 2022; that is less than half of IARC's estimate for 2024, and the sources it lists name no cancer centre in eastern Libya. WHO's 2020 profile said that incidence estimates for Libya carried a high degree of uncertainty because they were not based on a population-based registry, and that there was no coverage of deaths by cause for 2007 to 2016.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Libya",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Libya (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 8,000 new cancers a year in IARC's estimate, led by lung, breast and bowel",
          plain:
            "IARC estimates 8,070 new cancers in Libya in 2024: 4,214 in men and 3,856 in women. Lung, breast and bowel cancer are each a little over a tenth of the total. For every ten new cancers IARC estimates about six deaths in the same year. These figures are calculated from a regional registry's rates, not counted across the country.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 952 lung cancers (796 deaths), 913 breast cancers (331 deaths), 910 colorectal cancers (402 deaths), 509 bladder cancers (285 deaths) and 390 prostate cancers (146 deaths), then cervix (360), non-Hodgkin lymphoma (337), leukaemia (328), brain and nervous system (290) and liver (282). In men the leading cancers are lung (846, 20.1% of cancers in men), colorectum (445), bladder (436), prostate (390) and brain (190); in women breast (913, 23.7%), colorectum (465), cervix (360), ovary (173) and leukaemia (170). The risk of developing a cancer before age 75 is 14.3% for men and 11.0% for women, and an estimated 19,366 people are living within five years of a diagnosis. IARC's population for Libya is 7,381,027. WHO's 2020 profile estimated 374 cancers a year in children aged 0 to 14, and put cancer at 24.6% of premature deaths from noncommunicable diseases in 2016.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Libya (PDF)", url: GCO_FACT },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "stage-at-diagnosis",
          title: "IARC wrote in 2024 that breast cancer in Libya is often found late; OnCo found no national stage data",
          plain:
            "IARC wrote in 2024 that breast cancer in Libya is often diagnosed at an advanced stage, and a doctor at the cancer institute in Misrata said in 2025 that most patients there still arrive at a late stage. Among 3,170 Libyan patients seen at Jordan's King Hussein Cancer Center from 2006 to 2019, 37.8% had cancer that had already spread when they first arrived.",
          detail:
            "IARC's news page of 25 April 2024 on its breast examination project in Misrata says that breast cancer is the most common cancer type in Libya, is often diagnosed at an advanced stage, and that there is limited activity in early detection in the country. In a UICC interview dated 17 June 2025, Dr Muna Abusanuga of the National Cancer Institute of Misrata said that most patients there still present at a late stage, especially for breast cancer. The Jordanian study is a chart review of every Libyan patient at the King Hussein Cancer Center between 2006 and 2019: 37.8% presented with distant metastasis at their first visit, and a quarter of the breast cancer patients did. Those are patients referred abroad to one centre; the study does not describe everyone with cancer in Libya. The national registry's page, in its archived copy of 17 June 2022, lists knowing the stage at diagnosis among its aims; OnCo found no published Libyan stage figures.",
          links: [
            { label: "IARC: breast cancer early detection, training of master trainers in Libya (25 April 2024)", url: IARC_CBE },
            { label: "UICC: enhancing early detection of breast cancer in Libya (17 June 2025; Internet Archive copy, the live page refuses a plain request)", url: UICC_MISRATA },
            { label: "Erashdi et al., Libyan cancer patients at King Hussein Cancer Center (Front Oncol 2022)", url: KHCC_2023 },
          ],
        },
      ],
      tables: [
        {
          id: "ly-registry-2020",
          title: "The national registry's ten commonest cancers, 2020",
          caption: "Cases with a diagnosis date in 2020 held in the national registry's database on 15 June 2022, and each cancer's share of the 3,784 cases left after duplicates were removed.",
          columns: [
            { key: "cancer", label: "Cancer (as the registry names it)" },
            { key: "cases", label: "Cases registered", numeric: true },
            { key: "share", label: "% of 3,784", numeric: true },
          ],
          rows: [
            { cancer: "Breast", cases: 976, share: 25.8 },
            { cancer: "Colon", cases: 715, share: 18.9 },
            { cancer: "Lung", cases: 193, share: 5.1 },
            { cancer: "Prostate", cases: 182, share: 4.8 },
            { cancer: "Lymphoma", cases: 163, share: 4.3 },
            { cancer: "Leukaemia", cases: 152, share: 4.0 },
            { cancer: "Uterus", cases: 144, share: 3.8 },
            { cancer: "Stomach", cases: 118, share: 3.1 },
            { cancer: "Bladder", cases: 110, share: 2.9 },
            { cancer: "Brain", cases: 91, share: 2.4 },
          ],
          note: "Read from the Internet Archive's copy (16 March 2025) of the National Cancer Control Program's site, in Arabic; the live site's security certificate had expired when OnCo tried it on 16 November 2026. The ten add up to 2,844. The sources the page lists are cancer centres and departments in Sabha, Sirte, Misrata, Sabratha and Tripoli, public and private laboratories, private clinics and a Ministry of Health department; no cancer centre in eastern Libya is named among them. The registry gives counts, not rates, and no deaths. Its lung cancer count is about a fifth of IARC's estimate for 2024; the two differ in year and method, and OnCo found no registry figures for any later year.",
          sources: [
            { label: "National Cancer Control Program, Libya: registry statistics for 2020 (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE },
          ],
        },
        {
          id: "ly-registry-sources",
          title: "Where the registry's 2020 records came from",
          caption: "Records for 2020 by type of source, before duplicates were removed, as listed in the statistics dated 15 June 2022 on the National Cancer Control Program's home page.",
          columns: [
            { key: "source", label: "Source" },
            { key: "records", label: "Records", numeric: true },
          ],
          rows: [
            { source: "Cancer centres and departments (Sabha, Sirte, Misrata, Sabratha, and three in Tripoli)", records: 2887 },
            { source: "Public histopathology departments (Tripoli University Hospital, Tripoli Central Hospital)", records: 602 },
            { source: "Private histopathology laboratories (eight named)", records: 1735 },
            { source: "Private clinics (seven named)", records: 211 },
            { source: "Treatment affairs department, Ministry of Health", records: 1093 },
            { source: "Total with duplicate registrations", records: 6528 },
            { source: "Total without duplicate registrations", records: 3784 },
          ],
          note: "The programme's page gives 6,528 as the total with duplicate registrations and 3,784 as the total without them. It does not say how the duplicates arose or how complete the coverage of each region was.",
          sources: [
            { label: "National Cancer Control Program, Libya: registry statistics for 2020 (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry described in 2022, with cases counted from 2020, and older regional reports",
      aside: { label: "National Cancer Registry page (Arabic; Internet Archive copy of 17 June 2022)", url: NCCP_REGISTRY_ARCHIVE },
      cards: [
        {
          id: "registry-national",
          title: "A national registry, described on its programme's site in June 2022, with 1 January 2020 as its starting date",
          plain:
            "The site of the National Cancer Control Program, a Ministry of Health programme in Tripoli, described in June 2022 a National Cancer Registry collecting records from sources across Libya, with cases counted from 1 January 2020. The site published 3,784 cases for 2020, in statistics dated 15 June 2022. WHO's profile for 2019 put \"registration activity\" against the availability of a population-based registry.",
          detail:
            "The registry's page, read in its Internet Archive copy of 17 June 2022, calls the National Cancer Registry a population-based registry that gathers data on cancer patients from different sources in all parts of Libya, supervised and followed up by the National Cancer Control Program, with 1 January 2020 adopted as its reference date and a single data collection form holding the minimum information for cases and deaths. Its stated aims include annual incidence, the geographic spread of cases, stage at diagnosis, death rates and monitoring of prevention and early screening. The 2020 statistics on the programme's home page are dated 15 June 2022. Cabinet Decision 321 of 2023, a decision of the Government of National Unity, gives oversight of the national cancer registry to the monitoring and research department of the National Cancer Control Authority; OnCo read no source on whether the registry has passed from the programme to the Authority. WHO's 2020 profile, for 2019, lists the availability of a population-based registry as registration activity.",
          links: [
            { label: "National Cancer Registry page (Arabic; Internet Archive copy of 17 June 2022)", url: NCCP_REGISTRY_ARCHIVE },
            { label: "National Cancer Control Program, Libya: home page with 2020 statistics (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE },
            { label: "Cabinet Decision 321 of 2023, structure of the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D321 },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry-regional",
          title: "The Benghazi registry's reports for eastern Libya, 2003 to 2005, and a one-year count in Misrata",
          plain:
            "The Benghazi Cancer Registry published what its authors described in 2007 as the first population-based figures for Libya: 997 cancers in 2003 among about 1.6 million people in the east. Its second report counted 3,307 over 2003 to 2005. A separate study counted 430 cancers in Misrata in the twelve months to June 2020. OnCo found no Benghazi registry report for any year after 2005.",
          detail:
            "The registry's first report describes staff visiting all hospitals and pathology laboratories in eastern Libya and collecting from all death registration offices. Its updated report for 2003 to 2005 gives age-standardised incidence of 135.4 per 100,000 in men and 107.1 in women; lung (18.9%), colorectal (10.4%), bladder (10.1%) and prostate (9.4%) cancers led in men and breast (23.2%) and colorectal (11.2%) in women; 1,367 cancer deaths were recorded. For people diagnosed in those years it calculated five-year relative survival of 22.3% for all cancers combined, 19.8% in men and 28.2% in women. Those survival figures are two decades old and OnCo found no later ones for Libya. The Misrata study examined imaging and pathology reports across public and private hospitals and found an incidence of 71.7 per 100,000; its authors say cases were missed because of poor documentation. Hospital-based series have also been published from Benghazi Medical Center (2012) and Tobruk (2013 to 2020).",
          links: [
            { label: "El Mistiri et al., updated report from the Benghazi Cancer Registry, 2003 to 2005 (Ann Epidemiol 2015)", url: BCR_2015 },
            { label: "El Mistiri et al., first report from the Benghazi Cancer Registry, 2003 (Int J Cancer 2007)", url: BCR_2007 },
            { label: "Zarmouh et al., cancer incidence in the middle region of Libya (Cancer Rep 2022)", url: MISURATA_2022 },
          ],
        },
        {
          id: "patient-register",
          title: "The Authority's patient register: 35,908 people on its site's counter dated September 2026",
          plain:
            "The National Cancer Control Authority's site, read on 16 November 2026, describes in undated text a register of people with cancer that it calls the Muhareb (fighter) platform. It says a patient registers online, at the Authority or at a cancer centre, and receives a card used to collect medicines. Its counter, dated 23 September 2026, showed 35,908 people; the English page gave 17 health centres and the Arabic page 22.",
          detail:
            "The Libya Observer reported on 10 January 2024 that the Authority's director, Haider Al-Sayeh, told the Prime Minister of the Government of National Unity that 22,059 cases had been registered and that registration was continuing, and asked that every patient register through a centre so that the Authority could supply the right medicine or treatment. The Authority's site, in undated text read on 16 November 2026, describes the platform as a system for cancer centres and institutes in which a patient records personal data, health status and medicines, and says it is working to unify patient statistics across all of Libya through it. The site's counter, dated 23 September 2026, shows 35,908 of what it calls fighters; the number of centres beside it is 17 on the English page and 22 on the Arabic page, and OnCo cannot say which is right. The site presents the platform as a register of patients collecting medicines, which is a different thing from a count of new cancers each year, and it does not break the number down by cancer, region or year.",
          links: [
            { label: "National Cancer Control Authority, Libya (English and Arabic)", url: NCCA },
            { label: "Libya Observer: meeting on the Authority's plan for 2024 (10 January 2024)", url: LO_2024 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      aside: { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
      cards: [
        {
          id: "free-public-care",
          title: "Public care is free in law in WHO's 2024 report, and the Authority's site said in November 2026 that cancer medicines are free with its card",
          plain:
            "WHO's 2024 report on Libya says that care in public health facilities has been free for the whole population under the health law of 1973. The National Cancer Control Authority's site, in an undated answer to a frequent question read on 16 November 2026, says a registered patient receives cancer medicines completely free of charge. What is in stock on a given day is a separate question; ask the treating centre.",
          detail:
            "WHO's Regional Office wrote in 2024 that the public sector remains the main provider and that preventive, curative and rehabilitation services are provided to all citizens free of charge, under Law No. 106 of 1973 and its by-laws. The same report says that provision has deteriorated considerably since 2011, with severe constraints in technical capacity and financing, and that governance has been fragmented since 2014; it describes a Government of National Unity based in Tripoli and a rival government in Benghazi. The Authority's site, in that undated answer read on 16 November 2026, tells patients that medication is completely free of charge and is collected with the Muhareb card at a named location; it is the Authority's own statement and OnCo read no independent account of how it works in practice. WHO said in January 2022 that outcomes for children with cancer in Libya had been jeopardised by acute shortages of paediatric cancer medicines, essential equipment and trained staff, and the policy page of the Ministry of Health in Tripoli, which carries no date and was read on 16 November 2026, says shortages of equipment and medicines followed years of neglect of infrastructure.",
          links: [
            { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
            { label: "National Cancer Control Authority, Libya: frequently asked questions", url: NCCA },
            { label: "WHO EMRO: National Oil Corporation donates US$ 5.7 million for children with cancer (27 January 2022)", url: EMRO_NOC_2022 },
            { label: "Ministry of Health, Tripoli: health policy in Libya (Arabic)", url: MOH_POLICY },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Households paid 19% of health spending in 2023, and the share moves a lot from year to year",
          plain:
            "In the World Bank's series, taken from WHO's health accounts, out-of-pocket payments were 19.2% of Libya's health spending in 2023, after 31.8% in 2022 and 24.4% in 2021. Government paid 80.1% in 2023. Health spending was about 470 US dollars a person in 2023.",
          detail:
            "The out-of-pocket share was 28.0% in 2019, 21.1% in 2020, 24.4% in 2021, 31.8% in 2022 and 19.2% in 2023; domestic government spending was 71.3%, 78.6%, 73.9%, 66.4% and 80.1% of current health expenditure in the same years. Current health expenditure per person was 553 US dollars in 2019, 473 in 2020, 299 in 2021, 284 in 2022 and 470 in 2023, and 7.8% of GDP in 2023. Swings of this size from one year to the next suggest, in OnCo's reading, that the series should be treated as an estimate. WHO's 2024 report quotes a different national table for 2016 from the Ministry of Health's Health Information Centre: 960 US dollars a person, 93% of spending by the state and 7.0% out of pocket, where the international series gives 32.5% for 2016. The report puts private consultations at 20 to 65 Libyan dinars and says the poor can only use the public sector. WHO's universal health coverage service index for Libya was 71 in 2023.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Libya", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Libya", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita, Libya", url: WB_PC },
            { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
            { label: "WHO Global Health Observatory API: UHC service coverage index, Libya", url: GHO_UHC },
          ],
        },
        {
          id: "health-insurance",
          title: "Health insurance: mandatory under a 2010 law, and small in practice in WHO's 2024 report",
          plain:
            "WHO wrote in 2024 that a 2010 law makes health insurance mandatory for citizens and residents, that a Health Insurance Fund was created by decree in 2017 and had not yet started any actual insurance activity, and that private insurance covered about 4% of the population. An undated page on the site of the Ministry of Health in Tripoli, read on 16 November 2026, says the insurance system faces major challenges in application and funding.",
          detail:
            "WHO's 2024 report cites Insurance Law No. 20 of 28 January 2010 and Decree No. 854 of 2017 creating the Health Insurance Fund, and says it was reported in 2019 that insurance had been launched for state employees in education as a first step. It counts about 250,000 people with private health insurance, through oil companies, banks, the Social Security Fund, civil aviation and telecommunications, and notes that claims are settled after long discussion of tariffs. An undated page on the Ministry of Health's site in Tripoli, read on 16 November 2026, describes a Medical Insurance Authority (هيئة التأمين الطبي) whose role is to set and run insurance schemes, contract with providers and limit the direct financial burden on individuals; the page gives no membership numbers, does not say what cancer care it covers, and does not show whether the schemes are operating. OnCo could not establish how that Authority relates to the fund created in 2017.",
          links: [
            { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
            { label: "Ministry of Health, Tripoli: Medical Insurance Authority (Arabic)", url: MOH_INSURANCE },
            { label: "Ministry of Health, Tripoli: health policy in Libya (Arabic)", url: MOH_POLICY },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Medicines",
      title: "How cancer medicines are registered, bought and supplied",
      aside: { label: "WHO EMRO: workshop on computer-assisted drug registration (12 April 2018)", url: EMRO_SIAMED },
      cards: [
        {
          id: "medicines-regulator",
          title: "WHO in 2018 named the Ministry of Health's Pharmacy Administration as the medicines regulator",
          plain:
            "WHO described the Pharmacy Administration, based in the Ministry of Health, as Libya's drug regulatory authority in 2018, when it ran a workshop to set up a computer system for registering medicines. A separate Food and Drug Control Centre says on its site, read on 16 November 2026, that it is responsible for the safety of food and medicines in circulation; the statement is undated, the latest dated items on the front page are from February 2022, and the site does not say which government it answers to. OnCo found no public list of registered cancer medicines, and nothing newer than 2018 on who registers medicines.",
          detail:
            "WHO's April 2018 note says seven staff of the Registration Department of the Pharmacy Administration were trained in Tripoli on SIAMED, WHO's model system for computer-assisted drug registration, as part of a European Union funded project. A 2010 review in the Libyan Journal of Medicine explains that the Health Law, Act 106 of 1973, requires a medicine to be registered with the Ministry of Health before it is available on the Libyan market, and reports WHO's view at the time that registration lacked a defined independent body and had limited technical capacity. The Food and Drug Control Centre's site, read on 16 November 2026, carries its director's undated statement that it is an independent centre with legal personality charged with ensuring that food and medicines for people and animals are safe; the news on its front page concerns food shipments, its footer is dated 2021 and the latest dated items on the page are from 13 February 2022. The Ministry's site links a pharmacy system for registering companies, which did not resolve on 16 November 2026. Libya is not among the regulators on WHO's August 2026 list of authorities at maturity level 3 or 4. No source read describes a body that assesses whether a new cancer medicine is worth its price.",
          links: [
            { label: "WHO EMRO: workshop to install the WHO model system for computer-assisted drugs registration (12 April 2018)", url: EMRO_SIAMED },
            { label: "Mustafa and Kowalski, a need for the standardization of the pharmaceutical sector in Libya (Libyan J Med 2010)", url: LJM_2010 },
            { label: "Food and Drug Control Centre, Libya (Arabic)", url: FDCC },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
          ],
        },
        {
          id: "medicines-supply",
          title: "A 2022 decision charges the Authority with supplying cancer medicines, and its site said in November 2026 that it distributes them to patients and centres",
          plain:
            "There is no reimbursement list in the sources OnCo read. A 2022 decision of the Government of National Unity charges the National Cancer Control Authority with supplying cancer medicines and equipment to the centres that treat cancer, and the Authority's site, in undated text read on 16 November 2026, says patients collect medicines free with its card. WHO's 2024 report lists a Medical Supply Organization among the bodies the Ministry of Health supervises; no source read says how the two divide the buying of cancer medicines.",
          detail:
            "Cabinet Decision 963 of 2022, a decision of the Government of National Unity, lists among the Authority's tasks setting medicine policies and plans for cancer control, building a database of patients and cancer types to determine needs for medicines and equipment, and supplying and importing medicines, supplies and equipment for all bodies, centres and departments that treat cancer so that they are continuously available. Decision 321 of 2023 gives its pharmacy, equipment and medical supply department the jobs of determining the centres' needs, drawing up the list of medicines, keeping a register of supplier companies and inspecting deliveries. The Authority's site, in undated text read on 16 November 2026, says it imports the necessary medicines and distributes them fairly, and that its pharmacy department distributes them directly to patients and specialised centres. WHO's 2024 report lists the Medical Supply Organization among the central institutions the Ministry of Health supervises, and a WHO note of December 2018 records agreed guidelines for selecting, procuring, storing and distributing medicines being sent for ministerial approval; OnCo could not read whether they were adopted. Which cancer medicines are on the Authority's list is not published on its site.",
          links: [
            { label: "Cabinet Decision 963 of 2022, creating the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D963 },
            { label: "Cabinet Decision 321 of 2023, structure of the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D321 },
            { label: "National Cancer Control Authority, Libya", url: NCCA },
            { label: "WHO EMRO: seminar on Libyan supply chain technical guidelines (30 December 2018)", url: EMRO_SUPPLY },
            { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Plan and care",
      title: "What is being done: the Authority, radiotherapy and children's cancer care",
      aside: { label: "National Cancer Control Authority, Libya", url: NCCA },
      cards: [
        {
          id: "cancer-authority",
          title: "The Government of National Unity created a National Cancer Control Authority in 2022; OnCo found no published national cancer plan",
          plain:
            "The Government of National Unity created the National Cancer Control Authority by a Cabinet decision of 2022, with its seat in Tripoli; the decision transfers the cancer programmes, centres and institutes to it, and OnCo read no account of how far that transfer was carried out. OnCo found no published national cancer control plan. WHO's profile for 2019 gave no information on one, and what is known of the Authority's plan for 2024 comes from a news report.",
          detail:
            "Decision 963 of 2022 of the Government of National Unity creates a public authority with legal personality, attached to the Cabinet office, whose aims include policies and programmes for cancer control, treating patients inside the country, early detection, a patient database, medicines and equipment supply, training, and palliative and psychological support; its Article 11 transfers the programmes, centres and institutes concerned with cancer prevention and treatment to it. The text published by the Law Society of Libya is dated 14 October 2022 although it cites letters dated November 2022, and OnCo could not check it against the official gazette. Decision 321 of 24 May 2023 sets out departments for prevention and early detection; diagnosis, treatment and palliative care; monitoring and research; pharmacy and supply; and centres and institutes, and charges a planning office with preparing a strategic plan. The Libya Observer reported on 10 January 2024 that the Authority's director, Haider Al-Sayeh, presented to the Prime Minister of the Government of National Unity a plan for that year focused on the registration system, medicine supply, radiotherapy and chemotherapy services, and awareness and early diagnosis; OnCo did not read the plan itself. WHO's 2020 profile, for 2019, gives \"n/a\" against the national cancer control plan, and records no cancer management guidelines and an integrated noncommunicable disease plan not in effect. The Health Strategic Plan 2023 to 2030 of the Ministry of Health in Tripoli, as summarised on an undated page of its site read on 16 November 2026, centres on human resources and administration, and the summary does not mention cancer.",
          links: [
            { label: "Cabinet Decision 963 of 2022, creating the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D963 },
            { label: "Cabinet Decision 321 of 2023, structure of the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D321 },
            { label: "Libya Observer: meeting on the Authority's plan for 2024 (10 January 2024)", url: LO_2024 },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health, Tripoli: Health Strategic Plan 2023 to 2030 (Arabic)", url: MOH_PLAN },
          ],
        },
        {
          id: "radiotherapy",
          title: "Five radiotherapy centres and eleven treatment machines in the IAEA's directory, in entries updated in 2022 and 2023",
          plain:
            "The IAEA's directory, in entries last updated in 2022 and 2023, lists five radiotherapy centres in Libya: two in Tripoli and one each in Sabratha, Misrata and Benghazi, with eleven megavoltage machines between them and no brachytherapy. A directory entry says what was listed at its last update, not what is running, and the directory has no entry under the name of the Tripoli Radiotherapy Center, whose recent opening the Prime Minister of the Government of National Unity welcomed in remarks reported on 10 January 2024.",
          detail:
            "DIRAC, read on 16 November 2026, lists Tripoli Central Hospital with three linear accelerators and a cobalt unit (entry updated 2022), and Tripoli University Hospital with one linear accelerator, the National Cancer Institute in Sabratha with two, the National Cancer Institute in Misurata with two and the National Cancer Center in Benghazi with two (entries updated 2023). Brachytherapy is recorded as none at all five. Eleven machines for IARC's 2024 population of 7.38 million is about one for every 670,000 people, by OnCo's arithmetic. The IAEA's country sheet says a linear accelerator was installed at Tripoli University Hospital in October 2023 and that by the end of 2023 its support had strengthened three-dimensional conformal radiotherapy at centres in Benghazi, Misrata, Sabratha and Tripoli, some of which were working towards intensity-modulated techniques; the sheet lists Libya among the participants in the IAEA's Rays of Hope initiative. The Libya Observer reported on 10 January 2024 that Prime Minister Abdul Hamid Dbeibah welcomed the recent opening of the Tripoli Radiotherapy Center, which, the report said, was to begin receiving cases on 20 January at a rate of 180 a day; OnCo read no later source on whether it did. WHO's 2020 profile gave 9.5 external beam units per 10,000 cancer patients for 2019.",
          links: [
            { label: "IAEA: DIRAC, radiotherapy centres by country", url: DIRAC },
            { label: "IAEA: technical cooperation with Libya (PDF)", url: IAEA_TC },
            { label: "Libya Observer: meeting on the Authority's plan for 2024 (10 January 2024)", url: LO_2024 },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "childhood-cancer",
          title: "Children's cancer medicines: a WHO project funded by the National Oil Corporation, agreed in January 2022 and still delivering in November 2023",
          plain:
            "WHO said on 27 January 2022 that Libya's National Oil Corporation and its partners had signed an agreement giving it 5.7 million US dollars to buy medicines, supplies and equipment for hospitals treating children with cancer. In November 2023 WHO delivered a fifth batch of medicines to Benghazi Children's Hospital and said more than 700 children in four hospitals would benefit.",
          detail:
            "WHO's release of 27 January 2022 says the agreement, signed with the National Oil Corporation and its partners ENI, Repsol and TotalEnergies, would give 722 children enrolled for treatment in the main paediatric hospitals in Tripoli and Benghazi specialised care for 18 months, with medicines, supplies and equipment for seven hospitals, and training of Libyan teams in treatment and palliative care with the Bambino Gesù children's hospital in Rome. On 27 November 2023 WHO reported that the fifth batch, delivered to Benghazi on 23 November under what the release calls a joint WHO and Ministry of Health project, without saying which government's ministry, included medicines for leukaemia, lymphomas and melanoma; the hospital's head of pharmacy said the delivery covered the next two to three months and that more children were reaching complete remission. WHO's 2020 profile, for 2019, recorded no early detection programme and no defined referral system for childhood cancer. OnCo found no WHO report on this project after November 2023.",
          links: [
            { label: "WHO EMRO: National Oil Corporation donates US$ 5.7 million for children with cancer (27 January 2022)", url: EMRO_NOC_2022 },
            { label: "WHO EMRO: WHO supports Benghazi Children's Hospital with cancer medicines (27 November 2023)", url: EMRO_BENGHAZI_2023 },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "treatment-abroad",
          title: "Treatment abroad, and the aim of treating patients at home",
          plain:
            "A paper from Jordan's King Hussein Cancer Center says a rising number of Libyans with cancer sought care in Tunisia, Egypt and Jordan after 2011. The centre treated 3,170 Libyan patients between 2006 and 2019, about two thirds of them after an agreement with the Libyan Ministry of Health in June 2017; the paper says that agreement fell short in 2021 because of unpaid debts. The Government of National Unity's 2022 decision creating the Authority makes treating patients inside Libya one of its aims.",
          detail:
            "The King Hussein Cancer Center's review found that 2,888 of the 3,170 patients (91%) came between 2012 and 2019, and that about 2,100 (66%) were treated after the June 2017 agreement, under which, the paper says, the Libyan government aimed to cover the costs; its authors write that the agreement fell short in 2021 because of increasing and unpaid debts on the Ministry's behalf. The paper does not say which government's ministry signed in 2017. Breast cancer was 21% of the cancers referred, blood and lymph cancers 17% and gastrointestinal cancers 16.2%; 355 of the patients (11%) were in the paediatric age group. Decision 963 of 2022 of the Government of National Unity lists taking the measures needed to localise the treatment of cancer patients inside the country among the Authority's aims, and Decision 321 of 2023 gives its treatment department the task of serving patients whose cases require treatment abroad, in coordination with the competent bodies. The Authority's site, in undated text read on 16 November 2026, says its diagnosis and treatment department assists patients who need treatment abroad. OnCo found no published criteria for who is sent abroad, to which countries, or who pays.",
          links: [
            { label: "Erashdi et al., Libyan cancer patients at King Hussein Cancer Center (Front Oncol 2022)", url: KHCC_2023 },
            { label: "Cabinet Decision 963 of 2022, creating the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D963 },
            { label: "Cabinet Decision 321 of 2023, structure of the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D321 },
            { label: "National Cancer Control Authority, Libya", url: NCCA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening, early detection and HPV vaccination",
      aside: { label: "WHO immunisation data API: HPV programme coverage, Libya", url: WIISE_HPV },
      cards: [
        {
          id: "early-detection",
          title: "No screening programme in WHO's 2019 record; an early detection project in Misrata to 2024, and an Authority programme announced on its site",
          plain:
            "WHO's profile recorded no breast or cervical screening programme in Libya in 2019. IARC reported in April 2024 that the cancer institute in Misrata had trained about 50 nurses and midwives to examine breasts, and in June 2025 the institute said it was preparing a pilot of breast clinics in primary care. The National Cancer Control Authority's site, in undated text read on 16 November 2026, says in one place that it has launched an early detection programme and in another that it is working on one, and links a registration platform that OnCo could not open as text; it publishes no numbers.",
          detail:
            "WHO's 2020 profile, for 2019, records no breast cancer screening programme, no cervical cancer screening, and no early detection programme or guidelines for breast, cervical, bowel or childhood cancer. IARC's news page of 25 April 2024 says its CBE-Libya project with the National Cancer Institute of Misrata, funded by UICC and closed that month, trained about 50 nurses and midwives from Misrata's polyclinics as master trainers in clinical breast examination. In UICC's interview of 17 June 2025 the institute's Dr Muna Abusanuga said 46 people were trained, 98 women were reached across four clinic locations, and the team chose early diagnosis and not screening because Libya does not have the resources to run a screening programme; a pilot to reach 5,000 women through six polyclinics over 18 months was being prepared and had approvals from the Ministry of Health and the National Cancer Control Authority. OnCo read nothing later on whether it began. The Authority's site, in undated text read on 16 November 2026, says it has launched a programme for early detection of cancer throughout Libya and links a registration platform (res.ncca.gov.ly), which returned only a script shell to a plain request; its list of services on the same page says it is working on a programme for early detection. It names mammography and ultrasound for breast cancer and an immunological stool test for bowel cancer. It gives no eligible ages, intervals, sites or uptake, so OnCo cannot say that the programme is running.",
          links: [
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
            { label: "IARC: breast cancer early detection, training of master trainers in Libya (25 April 2024)", url: IARC_CBE },
            { label: "UICC: enhancing early detection of breast cancer in Libya (17 June 2025; Internet Archive copy, the live page refuses a plain request)", url: UICC_MISRATA },
            { label: "National Cancer Control Authority, Libya", url: NCCA },
          ],
        },
        {
          id: "hpv-vaccination",
          title: "WHO records the HPV vaccine in the national schedule since 2013; reported last-dose coverage in girls was 28% in 2024",
          plain:
            "WHO's records show the HPV vaccine in Libya's national schedule, nationwide, from 2013. Reported programme coverage in girls for 2024 was 51% for the first dose and 28% for the last dose. WHO holds no coverage figure for boys, and none for girls for any year from 2010 to 2022.",
          detail:
            "WHO's immunisation data give HPV programme coverage in females of 39% for the first dose and 30% for the last dose in 2023 (47,953 and 36,933 doses against a target of 123,811 girls), and 51% and 28% in 2024 (62,815 and 34,498 doses against the same target). The 2025 rows repeat 51% and 28% with no dose counts or target, so they may be carried forward. Rows for males are empty in every year, and rows for females are empty from 2010 to 2022. These are administrative figures reported by the country. WHO said in May 2025, when the National Centre for Disease Control began a review of the immunisation programme with WHO and UNICEF, that surveys of measles vaccination pointed to a possible gap between administrative reporting and population-level coverage, and that the review would inform a National Immunization Strategy. WHO's 2020 profile showed HPV programme coverage of 0 for 2018. Decision 321 of 2023 of the Government of National Unity lists raising awareness of hepatitis B and HPV vaccination among the tasks of the Authority's prevention department; OnCo read nothing on whether that work has begun.",
          links: [
            { label: "WHO immunisation data API: HPV programme coverage, Libya", url: WIISE_HPV },
            { label: "WHO immunisation data API: vaccine introductions (rows for Libya)", url: WIISE_INTRO },
            { label: "WHO EMRO: Libya launches a review of its National Immunization Programme (7 May 2025)", url: EMRO_EPI_2025 },
            { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
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
          title: "No trial in OnCo's records has a site in Libya",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, none of the cancer trials in our records lists a site in Libya. OnCo holds a selection of trials, not the whole registry. The published research read for this page is registry reports, one city-wide count and series from single hospitals.",
          detail:
            "OnCo's graph holds 0 trials that list Libya among their countries. A query of ClinicalTrials.gov's public API on 16 November 2026 for cancer studies with a location in Libya returned one record: NCT00812175, a completed study titled Global Investigation of Therapeutic Decisions in Hepatocellular Carcinoma and of Its Treatment With Sorafenib, which lists Libya among more than thirty countries. The published record read for this page is observational: the Benghazi Cancer Registry's reports for 2003 and for 2003 to 2005, the one-year Misrata incidence study, hospital series from Benghazi and Tobruk, and the King Hussein Cancer Center's review of Libyan patients treated in Jordan. Decision 321 of 2023 of the Government of National Unity asks the Authority's monitoring and research department to collect research on cancer and keep a register of cancer researchers; OnCo read nothing on whether either has been done. OnCo found no Libyan rules for authorising a clinical trial.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Libya (search)", url: CTGOV },
            { label: "El Mistiri et al., updated report from the Benghazi Cancer Registry (Ann Epidemiol 2015)", url: BCR_2015 },
            { label: "Zarmouh et al., cancer incidence in the middle region of Libya (Cancer Rep 2022)", url: MISURATA_2022 },
            { label: "Cabinet Decision 321 of 2023, structure of the National Cancer Control Authority (Arabic, Law Society of Libya)", url: D321 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "divided-authority",
      title: "This page could not describe cancer services under the government based in the east",
      plain:
        "The decisions, ministry pages and Authority site read for this page belong to the Government of National Unity in Tripoli. OnCo read no health ministry or cancer authority source from the government based in eastern Libya, so it cannot say how cancer medicines, registration or referral are organised there, or whether the Authority's card is used in every region.",
      detail:
        "WHO's 2024 report describes a Government of National Unity in Tripoli and a rival government in Benghazi, and fragmented health governance since 2014. The Authority's site, read on 16 November 2026, says it is working to unify patient statistics across all of Libya, and its counter dated 23 September 2026 gives 17 health centres on its English page and 22 on its Arabic page, but shows them as images and does not list them in text, so OnCo could not record which centres or regions they are. The national registry's 2020 sources name no cancer centre in eastern Libya. The IAEA's directory, in an entry updated in 2023, lists radiotherapy at the National Cancer Center in Benghazi, and WHO's release of November 2023 describes Benghazi Children's Hospital treating children with cancer; who funds and supplies them was not established from a primary source.",
      links: [
        { label: "WHO EMRO: Understanding the private health sector in Libya (2024, PDF)", url: WHO_PRIVATE },
        { label: "National Cancer Control Authority, Libya", url: NCCA },
      ],
    },
    {
      id: "plan-text",
      title: "No national cancer control plan or strategy document was found",
      plain:
        "OnCo found no published national cancer plan for Libya: not on the Authority's site, the Ministry of Health's site, or the International Cancer Control Partnership's portal, where the two Libyan files OnCo found are WHO's country profiles. The Authority's 2024 plan is known here only from one news report, and no later plan was read.",
      detail:
        "The International Cancer Control Partnership portal's map is drawn by script and returned no country content to a plain request; the two Libyan files found on it by search are WHO's cancer country profiles of 2014 and 2020. The IAEA's project page for strengthening cancer treatment and control programmes in Libya returned HTTP 403, and OnCo found no report of an IAEA imPACT review of Libya. The official gazette was not read: both Cabinet decisions were read as published by the Law Society of Libya, a legal archive, and its short document address for Decision 321 returned HTTP 403 while the full page was readable. The live site of the National Cancer Control Program had an expired certificate on 16 November 2026 and was read only in archived copies of 2022 and 2025; whether the programme still operates separately from the Authority was not established.",
      links: [
        { label: "International Cancer Control Partnership portal", url: "https://www.iccp-portal.org/map" },
        { label: "Cabinet Decision 963 of 2022 (Arabic, Law Society of Libya)", url: D963 },
      ],
    },
    {
      id: "registry-after-2020",
      title: "No registry figures after 2020, no rates, and no recent survival",
      plain:
        "The national registry's published figures are counts for one year, 2020. OnCo found no annual report, no age-standardised rates, no deaths and no figures for 2021 onward. The most recent survival figures OnCo found are the Benghazi registry's, for people diagnosed in eastern Libya in 2003 to 2005; it found none for the country as a whole.",
      detail:
        "IARC's fact sheet says its estimate uses a subnational registry but does not name it, and the detailed sources page of the Global Cancer Observatory is drawn by script; OnCo's guess at its data address returned a web page, not data. The African Cancer Registry Network's member list, as returned to a plain request, names no Libyan registry. The UICC member pages for the National Cancer Institute of Misurata and the National Cancer Control Program returned HTTP 406 on 16 November 2026, so the statements that OnCo's record for the institute attributes to its UICC entry, about a first national registry report in 2020 and a registry for the central region from 2021, could not be read for this page and are not used on it. The full text of the two Benghazi registry reports is behind publishers' paywalls; their figures here come from the abstracts indexed by Europe PMC.",
      links: [
        { label: "National Cancer Control Program, Libya: registry statistics for 2020 (Arabic; Internet Archive copy of 16 March 2025)", url: NCCP_ARCHIVE },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Libya (PDF)", url: GCO_FACT },
        { label: "African Cancer Registry Network: members", url: "https://afcrn.org/index.php/membership/membership-list" },
      ],
    },
    {
      id: "medicines-rules",
      title: "No published list of registered or funded cancer medicines, and no registration rules",
      plain:
        "OnCo found no public register of medicines approved in Libya, no national essential medicines list that could be read, no list of the cancer medicines the Authority buys, and no published rules or timelines for registering a medicine or approving a clinical trial. Whether a given medicine is available has to be asked at the treating centre.",
      detail:
        "The Ministry of Health's pharmacy system (pharmacy.moh.gov.ly) did not resolve on 16 November 2026. The Food and Drug Control Centre's site carries no medicines register. WHO's descriptions of the Pharmacy Administration date from 2018 and the critical review of registration from 2010; OnCo found nothing newer from a primary source on how registration works today, or how the Pharmacy Administration, the Food and Drug Control Centre, the Medical Supply Organization and the Authority divide the work. News digests of December 2023 and February 2024 about urgent supply of cancer medicines by local companies and about their availability were read and not used, because they are one-paragraph summaries and OnCo could not read a primary account. The Authority's patient platform (cpr.ncca.gov.ly) timed out and its early detection platform returned a script shell.",
      links: [
        { label: "Ministry of Health, Tripoli (Arabic)", url: "https://moh.gov.ly" },
        { label: "Food and Drug Control Centre, Libya (Arabic)", url: FDCC },
        { label: "WHO EMRO: workshop on computer-assisted drug registration (12 April 2018)", url: EMRO_SIAMED },
      ],
    },
    {
      id: "services-now",
      title: "Which machines and services work now is not confirmed",
      plain:
        "The IAEA's directory entries for Libya were last updated in 2022 and 2023, and the count of working radiotherapy machines today could not be confirmed. OnCo found no current figures for waiting times, for staff, or for palliative care and opioid availability, and none for the cancer centres in Sabha and Sirte that the registry's 2020 statistics name.",
      detail:
        "WHO's 2020 profile, for 2019, recorded palliative care in the community as generally not available, bone marrow transplantation as generally not available and pathology services as generally available, and gave opioid consumption of 31 defined daily doses per million people a day for 2015 to 2017; nothing newer was read. The Tripoli Radiotherapy Center, whose recent opening the Prime Minister of the Government of National Unity welcomed in remarks reported by the Libya Observer on 10 January 2024, has no entry under that name in the IAEA's directory, and DIRAC, read on 16 November 2026, records no brachytherapy in Libya. The National Cancer Institute of Misurata's site, read on 16 November 2026, lists its departments, including radiotherapy with linear accelerators and PET-CT, on an undated page; three of the four items on its news page carry the same date, 20 May 2026, and none was used. No named person's current role was confirmed from an institution's own page, so this page links no people.",
      links: [
        { label: "IAEA: DIRAC, radiotherapy centres by country", url: DIRAC },
        { label: "WHO: cancer country profile, Libya (2020, PDF)", url: WHO_PROFILE },
        { label: "National Cancer Institute, Misurata (Arabic)", url: "https://nci.edu.ly" },
      ],
    },
  ],
  institutions: [
    "ncca-libya", "nccp-libya", "libya-national-cancer-registry", "benghazi-cancer-registry", "libya-ministry-of-health",
    "libya-pharmacy-administration", "libya-food-and-drug-control-centre", "nci-misurata", "nci-sabratha",
    "tripoli-university-hospital", "tripoli-central-hospital", "benghazi-national-cancer-center", "khcc", "who", "iaea", "iarc", "uicc",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-el-mistiri-benghazi-cancer-registry-2003-2005-ann-epidemiol-2015",
    "paper-el-mistiri-benghazi-cancer-registry-2003-int-j-cancer-2007",
    "paper-zarmouh-misurata-cancer-incidence-cancer-rep-2022",
    "paper-erashdi-libyan-patients-khcc-front-oncol-2022",
  ],
  people: [],
  how:
    "Every card was written from sources read in full as raw text on 16 November 2026 rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer country profile; the National Cancer Control Program's site in its Internet Archive copies; the National Cancer Control Authority's site; the Arabic texts of Cabinet Decisions 963 of 2022 and 321 of 2023 as published by the Law Society of Libya; the Ministry of Health's and the Food and Drug Control Centre's sites; WHO EMRO's 2024 report on Libya's private health sector and its news pages from 2018 to 2025; the IAEA's country sheet and DIRAC equipment report; World Bank, WHO Global Health Observatory and WHO immunisation APIs; WHO's August 2026 list of regulators; an IARC news page and an archived UICC interview; one Libya Observer report; and papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. Authority in Libya is divided: the page says which body each source belongs to, dates every statement about services, and does not describe a national arrangement that a source does not state. No health source from the government based in the east was read. The records added for this page (the Authority, the national registry, the Benghazi registry, the Ministry, the Pharmacy Administration, the Food and Drug Control Centre, Tripoli Central Hospital and four papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates calculated from a regional registry's rates, and the national registry's own count is for 2020. Which centres are treating, which medicines are in stock and how referral abroad works could not be confirmed for today, or for every region, from the sources read; ask the treating centre or the National Cancer Control Authority what applies to you, and check where any medicine bought outside a centre came from.",
  verifyLinks: [
    { label: "National Cancer Control Authority, Libya", url: NCCA },
    { label: "WHO EMRO: Libya", url: "https://www.emro.who.int/countries/lby/index.html" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Libya (PDF)", url: GCO_FACT },
    { label: "IAEA: DIRAC, radiotherapy centres by country", url: DIRAC },
  ],
};
