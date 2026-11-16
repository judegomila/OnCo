import type { CountryDive } from "@/data/country-dive";

/**
 * Zimbabwe deep dive: the hand-written cards for /countries/zw/ (wave 8). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Zimbabwe; the African
 * Cancer Registry Network's page for the Zimbabwe National Cancer Registry; the Medicines Control Authority of
 * Zimbabwe's home and "Who we are" pages; papers found and resolved through Europe PMC with their abstracts read; and
 * WHO's HPV coverage and health expenditure rows from its public data APIs. The Ministry of Health and Child Care's
 * own pages were not read. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/716-zimbabwe-fact-sheet.pdf";
const AFCRN_ZNCR = "https://afcrn.org/index.php/membership/membership-list/83-zimbabwe-harare";
const MCAZ = "https://www.mcaz.co.zw/";
const MCAZ_WHO = "https://www.mcaz.co.zw/who-we-are/";
const HIV_LINKAGE = "https://doi.org/10.1002/cnr2.1597";
const CHILD_TRENDS = "https://doi.org/10.1002/ijc.33619";
const PHIA_SCREEN = "https://doi.org/10.1097/QAI.0000000000003880";
const TIME_TO_DX = "https://doi.org/10.1136/bmjgh-2025-021889";
const LANCET_UNAUTH = "https://doi.org/10.1016/S1470-2045(26)00057-4";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ZWE'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'ZWE'";
const CTGOV = "https://clinicaltrials.gov/search?country=Zimbabwe&cond=cancer";

export const ZW_DIVE: CountryDive = {
  iso2: "ZW",
  iso3: "ZWE",
  name: "Zimbabwe",
  flag: "🇿🇼",
  asOf: "2026-11-11",
  title: "Cancer in Zimbabwe",
  description:
    "Cancer in Zimbabwe: IARC's estimate of 25,125 new cancers and 16,378 deaths in 2024, built on a subnational registry; cervical cancer as the commonest cancer and cause of cancer death; a registry running since 1985 that counts HIV status; cancers among people living with HIV; HPV vaccination at 90% of girls in 2025; a medicines regulator at WHO maturity level 3; and the gaps in what OnCo could read.",
  lede:
    "IARC estimates 25,125 new cancers and 16,378 cancer deaths in Zimbabwe in 2024, about two deaths for every three new cases. Cervical cancer is the commonest cancer and the leading cause of cancer death, and research from the Harare registry links several cancers, including Kaposi sarcoma and lymphoma, to HIV. The national registry in Harare has counted cancer since 1985.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Zimbabwe is 25,125 new cancers and 16,378 deaths, an age-standardised incidence of 266.3 per 100,000 (276.7 in men, 265.9 in women) and mortality of 181.6. IARC's incidence method is subnational registry rates applied to the 2024 population; the fact sheet does not name the registry, but the Zimbabwe National Cancer Registry, which has covered Harare completely since 1990 according to the African Cancer Registry Network, is the country's population-based registry. Mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. Deaths divided by new cases give 0.65. Whether rural Zimbabwe has Harare's rates is not known from these sources.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Zimbabwe",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Zimbabwe (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 25,000 new cancers a year, a fifth of them cervical",
          plain:
            "IARC estimates 25,125 new cancers in Zimbabwe in 2024, 15,132 in women and 9,993 in men. Cervical cancer is the commonest, a fifth of all cancers, and causes the most deaths. Prostate, breast and oesophageal cancer follow, and Kaposi sarcoma, a cancer closely linked to HIV, is in the top ten.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,194 cervical cancers (3,118 deaths), 3,635 prostate cancers (2,298 deaths), 2,483 breast cancers (1,224 deaths), 1,412 oesophageal cancers (1,283 deaths) and 1,375 colorectal cancers. Non-Hodgkin lymphoma has 890 cases and Kaposi sarcoma 551. IARC's age-standardised incidence for cervical cancer is 89.5 per 100,000 women and for prostate cancer 113.5 per 100,000 men. An estimated 48,918 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Zimbabwe (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 estimate",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024 (built on subnational registry rates)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 25125, deaths: 16378 },
            { site: "Cervix uteri", cases: 5194, deaths: 3118 },
            { site: "Prostate", cases: 3635, deaths: 2298 },
            { site: "Breast", cases: 2483, deaths: 1224 },
            { site: "Oesophagus", cases: 1412, deaths: 1283 },
            { site: "Colorectum", cases: 1375, deaths: 797 },
            { site: "Non-Hodgkin lymphoma", cases: 890, deaths: 453 },
            { site: "Kaposi sarcoma", cases: 551, deaths: 221 },
          ],
          note: "IARC's estimates, built on subnational registry rates. The registry's own recent counts were not read; see the gaps.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Zimbabwe (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A registry in Harare since 1985",
      cards: [
        {
          id: "zncr",
          title: "The Zimbabwe National Cancer Registry, at Parirenyatwa",
          plain:
            "The Zimbabwe National Cancer Registry was set up in 1985 by the Ministry of Health and Child Care with IARC. It has covered Harare completely since 1990 and revived a branch in Bulawayo in 2011, and its staff record HIV status where it is known.",
          detail:
            "The registry's page on the African Cancer Registry Network says it is based in the Parirenyatwa Group of Hospitals complex, finds cases by visiting the three government referral hospitals, oncology clinics, the radiotherapy department, municipal and private hospitals, pathology laboratories and the Harare death registry, and contributed to volumes 7 to 10 of IARC's Cancer Incidence in Five Continents. It quotes Harare's population at the 2012 census as 1,468,767, about a ninth of the national 12,973,808. The page is undated and its newest entries are from 2013 and 2014. Linking its records with an HIV clinic's found that a third of cancers among the clinic's patients were known only to the registry, and a 25-year study found childhood cancer registrations in Harare dropped when the economy contracted.",
          links: [
            { label: "African Cancer Registry Network: Zimbabwe National Cancer Registry", url: AFCRN_ZNCR },
            { label: "Shamu et al., cancer incidence among people living with HIV in Zimbabwe (Cancer Rep 2022)", url: HIV_LINKAGE },
            { label: "Stoeter et al., childhood cancer trends in Harare and Kyadondo (Int J Cancer 2021)", url: CHILD_TRENDS },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "spending",
          title: "What WHO's health spending figures show, and what they do not",
          plain:
            "WHO's estimate of out-of-pocket spending in Zimbabwe is 10.6% of current health expenditure in 2023, down from 34% to 37% in 2010 to 2012. OnCo did not read a Zimbabwean source on what patients pay for cancer care, so this page does not describe it.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 34.4% of current health expenditure in 2010, 37.2% in 2011, 24.6% in 2016, 10.5% in 2017 and between 8.7% and 10.6% from 2018 to 2023. The database does not say why the share fell so sharply in 2017, and a national share does not show what a cancer patient pays for diagnosis, radiotherapy or medicines. A 2026 study of 396 recently diagnosed patients in Zimbabwe found that more barriers to seeking care lengthened the time before a first visit for breast cancer, and that diagnosis took longer in less-resourced regions.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Zimbabwe (API)", url: WHO_GHED_API },
            { label: "Time to diagnosis for breast, cervical and colorectal cancer in Zimbabwe and South Africa (BMJ Glob Health 2026)", url: TIME_TO_DX },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "mcaz",
          title: "The Medicines Control Authority of Zimbabwe, at WHO maturity level 3",
          plain:
            "Medicines in Zimbabwe are registered by the Medicines Control Authority of Zimbabwe (MCAZ), a statutory body. MCAZ announces that Zimbabwe's regulatory system has reached maturity level 3 in WHO's benchmarking of medicines regulation.",
          detail:
            "MCAZ describes itself as established by the Medicines and Allied Substances Control Act [Chapter 15.03], succeeding the Drugs Control Council (from 1969) and the Zimbabwe Regional Drug Control Laboratory (from 1989), with a mandate to ensure medicines and medical devices on the market are safe, effective and of good quality. Its home page announces maturity level 3 for medicines and vaccines (non-producing) in WHO's Global Benchmarking Tool and says it has published the assessment report; the linked media release returned a not-found error, so the date is not given here. Its registration pages list alternative submission pathways. In 2026 The Lancet Oncology reported on an unauthorised cancer medicine in Zimbabwe raising patient safety concerns; OnCo read only the article's title, as it has no abstract.",
          links: [
            { label: "MCAZ: home page", url: MCAZ },
            { label: "MCAZ: who we are", url: MCAZ_WHO },
            { label: "Adepoju, unauthorised cancer drug in Zimbabwe raises patient safety concerns (Lancet Oncol 2026)", url: LANCET_UNAUTH },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination for girls since 2018, at 90% in 2025",
          plain:
            "WHO and UNICEF's figures show Zimbabwe vaccinating girls against HPV from 2018. Coverage fell to 6% in 2022 and recovered to 90% for both first and last dose in 2025.",
          detail:
            "WHO's immunisation data give first-dose programme coverage in girls of 79% in 2018, 87% in 2019, 63% in 2021, 6% in 2022, 53% in 2023, 80% in 2024 and 90% in 2025; last-dose coverage was 64% in 2019, 39% in 2021, 6% in 2022, 24% in 2023, 51% in 2024 and 90% in 2025. There is no figure for 2020 and none for boys. The data do not give the reason for the fall in 2022.",
          links: [{ label: "WHO immunisation data: HPV programme coverage, Zimbabwe (API)", url: WHO_HPV_API }],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening reached about one woman in five in the first survey",
          plain:
            "Household surveys of HIV run in 2015 to 2017 found 19.8% of women aged 30 to 49 in Zimbabwe had been screened for cervical cancer. Coverage rose in the next round, in 2020 to 2023, in all four countries surveyed, but none came near WHO's 70% target.",
          detail:
            "A 2026 analysis of the Population-based HIV Impact Assessment surveys in Malawi, Tanzania, Zambia and Zimbabwe found that self-reported screening coverage among women aged 30 to 49 rose by more than 50% in every country between rounds, from 8.3% (Tanzania) to 19.8% (Zimbabwe) in the first round to between 12.6% (Tanzania) and 37.3% (Zambia) in the second. Coverage was higher among women with HIV. The abstract does not give Zimbabwe's second-round figure. A 2022 study found cervical cancer the commonest cancer among people starting HIV treatment at a Harare clinic.",
          links: [
            { label: "McCormick et al., cervical cancer screening coverage in four countries from PHIA surveys (J Acquir Immune Defic Syndr 2026)", url: PHIA_SCREEN },
            { label: "Shamu et al., cancer among people living with HIV in Zimbabwe (Cancer Rep 2022)", url: HIV_LINKAGE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Zimbabwe",
      cards: [
        {
          id: "hiv-cancer",
          title: "A registry that records HIV status, and cancers that follow the HIV epidemic",
          plain:
            "Zimbabwe's registry records HIV status where it is known, and research built on it shows cancer tracking the HIV epidemic: childhood Kaposi sarcoma and lymphoma rose with HIV and fell with treatment, and among adults on HIV treatment cervical cancer, Kaposi sarcoma and lymphoma are the commonest cancers.",
          detail:
            "The 2021 study of 25 years of registration in Harare and Kyadondo found childhood cancer peaks in Harare in 1996 to 2001, mostly Kaposi sarcoma and non-Hodgkin lymphoma, tracking HIV prevalence and the arrival of antiretroviral therapy. The 2022 linkage study followed 3,442 people starting HIV treatment in Harare between 2004 and 2017 and found 66 cancers, an incidence of 341 per 100,000 person-years, with incidence lower in people who started treatment with higher CD4 counts. Its authors name early HIV treatment, HPV vaccination and cervical screening as the levers for prevention.",
          links: [
            { label: "Stoeter et al. (Int J Cancer 2021)", url: CHILD_TRENDS },
            { label: "Shamu et al. (Cancer Rep 2022)", url: HIV_LINKAGE },
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
          id: "trial-count",
          title: "One trial in OnCo's records has a site in Zimbabwe",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, one of the cancer trials in our records lists a site in Zimbabwe: an AIDS Clinical Trials Group trial for Kaposi sarcoma. OpenAlex counts 34 oncology papers with a Zimbabwe-based author in 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and one lists Zimbabwe; that reflects the trials OnCo holds, not every study in Zimbabwe. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Zimbabwe 27 works in 2021, 16 in 2022, 17 in 2023, 21 in 2024 and 34 in 2025, 115 in total, of which 96 are open access and 6 highly cited. Two of the registry papers on this page were written with partners at the Universities of Bern and Halle-Wittenberg; the screening analysis is by the US Centers for Disease Control and Prevention.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Zimbabwe (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "ministry-and-costs",
      title: "The Ministry's cancer strategy, radiotherapy and what patients pay",
      plain:
        "OnCo did not read the Ministry of Health and Child Care's cancer strategy, its essential medicines list, or a Zimbabwean source on what cancer patients pay, and did not read a primary source on radiotherapy capacity. None of these is described on this page.",
      detail:
        "The registry's page refers to a Zimbabwe Cancer Prevention and Control Strategy for 2014 to 2018 unveiled in February 2014; a later strategy was not found. The IAEA's DIRAC radiotherapy database and any imPACT review of Zimbabwe were not read. Which cancer medicines are registered and available, and their cost, were not read.",
      links: [{ label: "African Cancer Registry Network: Zimbabwe National Cancer Registry", url: AFCRN_ZNCR }],
    },
    {
      id: "unread-sources",
      title: "The registry's recent counts",
      plain:
        "The Zimbabwe National Cancer Registry's recent annual reports were not found on a page that answered a plain request, so this page uses IARC's estimate rather than the registry's own counts.",
      detail:
        "The newest publications on the registry's page date from 2013, among them a triennial report on cancer incidence in Harare for 2010 to 2012; later reports were not found. The MCAZ media release on maturity level 3 returned a not-found error. Only the title of The Lancet Oncology's 2026 news article on an unauthorised cancer medicine was read, as it has no abstract.",
      links: [{ label: "MCAZ: home page", url: MCAZ }],
    },
  ],
  institutions: ["zimbabwe-national-cancer-registry", "zimbabwe-ministry-of-health-and-child-care", "parirenyatwa-hospital", "mcaz-zimbabwe", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["actg-a5263"],
  papers: ["paper-shamu-cancer-incidence-hiv-zimbabwe-cancer-reports-2022", "paper-stoeter-childhood-cancer-trends-harare-kyadondo-ijc-2021"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the African Cancer Registry Network's page for the Zimbabwe National Cancer Registry; MCAZ's own pages; the abstracts of papers found through Europe PMC; and WHO's HPV coverage and health expenditure rows from its public data APIs. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the registry, the Ministry, Parirenyatwa, MCAZ and two papers) carry their own sources.",
  verify:
    "This page has no Zimbabwean government source on what cancer care costs or which medicines are available. Ask the treating hospital's oncology department, and check MCAZ's register for whether a medicine is registered in Zimbabwe.",
  verifyLinks: [
    { label: "MCAZ: registered medicines", url: MCAZ },
    { label: "African Cancer Registry Network: Zimbabwe National Cancer Registry", url: AFCRN_ZNCR },
  ],
};
