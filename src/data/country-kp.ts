import type { CountryDive } from "@/data/country-dive";

/**
 * North Korea (the Democratic People's Republic of Korea) deep dive: the hand-written cards for /countries/kp/ (wave 8).
 * This page is short on purpose. IARC publishes an estimate for the country, but almost nothing else about cancer there
 * could be verified from a primary source. Read raw on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet; WHO's public
 * immunisation and health expenditure data (which hold no HPV or out-of-pocket rows for the country); Europe PMC
 * (which returned no paper with cancer in North Korea as its subject); OnCo's ClinicalTrials.gov participation data and
 * OpenAlex counts. Nothing on this page comes from news reports, testimony or memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/408-korea-democratic-peoples-republic-of-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PRK'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'PRK'";
const WHO_COUNTRY = "https://www.who.int/countries/prk";
const CTGOV = "https://clinicaltrials.gov/search?country=Korea,%20Democratic%20People%27s%20Republic%20of";

export const KP_DIVE: CountryDive = {
  iso2: "KP",
  iso3: "PRK",
  name: "North Korea",
  flag: "🇰🇵",
  asOf: "2026-11-11",
  title: "Cancer in North Korea",
  description:
    "Cancer in North Korea: IARC's modelled estimate of 70,520 new cancers and 51,108 deaths in 2024, with lung, liver and stomach cancer leading, and an account of how little else can be verified: no North Korean data source named on IARC's fact sheet, no HPV vaccination or out-of-pocket figures in WHO's data, no trial site in OnCo's records, and three oncology papers in five years in OpenAlex.",
  lede:
    "IARC estimates 70,520 new cancers and 51,108 cancer deaths in North Korea in 2024, about seven deaths for every ten new cases, but builds the estimate from neighbouring countries' data; its fact sheet names no North Korean data source for incidence. Almost nothing else about cancer in North Korea could be checked against a primary source, and this page says so rather than fill the gap.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for North Korea is 70,520 new cancers and 51,108 deaths, an age-standardised incidence of 171.5 per 100,000 (186.0 in men, 162.7 in women) and mortality of 120.2 (150.0 in men, 95.7 in women). IARC's fact sheet gives no country-specific data source for incidence and describes the method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. Every figure for North Korea on this page is therefore a model, not a count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What IARC's model shows",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "A modelled 70,000 new cancers a year, a quarter of them lung cancer",
          plain:
            "IARC estimates 70,520 new cancers in North Korea in 2024. Lung cancer is the commonest in both men and women and causes 29% of cancer deaths; liver and stomach cancer follow. These numbers are modelled from neighbouring countries, not counted in North Korea.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 16,904 lung cancers (14,650 deaths), 8,912 liver cancers (8,432 deaths), 7,061 stomach cancers (6,176 deaths), 6,947 colorectal cancers, 5,123 breast cancers and 4,114 thyroid cancers. In women the commonest are lung, breast and thyroid cancer. IARC's population figure for 2024 is 26,498,826. Deaths divided by new cases give 0.72, the highest ratio of the ten countries in this wave of OnCo's country pages.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 model",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024 (modelled from neighbouring countries)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 70520, deaths: 51108 },
            { site: "Lung", cases: 16904, deaths: 14650 },
            { site: "Liver", cases: 8912, deaths: 8432 },
            { site: "Stomach", cases: 7061, deaths: 6176 },
            { site: "Colorectum", cases: 6947, deaths: 3806 },
            { site: "Breast", cases: 5123, deaths: 2388 },
            { site: "Thyroid", cases: 4114, deaths: 678 },
          ],
          note: "A model, not a count: IARC's fact sheet names no North Korean data source for incidence.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "no-data",
          title: "No health spending figures in WHO's database",
          plain:
            "WHO's Global Health Expenditure Database, which gives out-of-pocket spending for the other nine countries in this wave, returns no rows for North Korea. OnCo found no primary source on how cancer care is paid for there, and does not describe it.",
          detail:
            "OnCo queried WHO's public health expenditure data for the out-of-pocket share of current health expenditure for North Korea on 11 November 2026 and received no rows. Europe PMC holds no study of cancer services or registry data from inside North Korea that OnCo found; multi-country Global Burden of Disease estimates and studies of North Korean defectors in South Korea exist, but OnCo did not use them. Accounts in the press or from people who have left the country were not used, because OnCo could not check them against a primary source.",
          links: [
            { label: "WHO Global Health Expenditure Database: North Korea (API; returns no rows)", url: WHO_GHED_API },
            { label: "WHO: Democratic People's Republic of Korea", url: WHO_COUNTRY },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Medicines",
      title: "Medicines, trials and research",
      cards: [
        {
          id: "medicines-research",
          title: "No regulator source, no trial sites, three papers in five years",
          plain:
            "OnCo found no primary source on how medicines are approved in North Korea. No cancer trial in OnCo's records lists a site there, and OpenAlex counts three oncology papers with a North Korea-based author in 2021 to 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and none lists North Korea. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives North Korea 1 work in 2021 and 2 in 2025, 3 in total, none open access. OnCo's country file of 8 September 2026 holds no ClinicalTrials.gov study count for North Korea.",
          links: [{ label: "ClinicalTrials.gov: studies with a site in North Korea (search)", url: CTGOV }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is known",
      title: "What can and cannot be said",
      cards: [
        {
          id: "known",
          title: "What this page can say, and what it cannot",
          plain:
            "This page can say what IARC's model estimates for North Korea. It cannot say how many people are diagnosed, how they are treated, what care costs, whether screening or HPV vaccination exists, or how many survive, because OnCo found no primary source for any of these.",
          detail:
            "WHO's public immunisation data return no HPV vaccination rows for North Korea, as they do for Afghanistan; they return rows for the other eight countries in this wave. IARC's fact sheet names no North Korean data source for incidence. OnCo's rule is that a named gap is worth more than a plausible number, so the page stops here. If an authoritative source becomes available, from WHO, IARC or a peer-reviewed paper, it will be added.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, North Korea (API; returns no rows)", url: WHO_HPV_API },
            { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea, data source and methods (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "everything-else",
      title: "Registry, services, workforce, medicines, screening and survival",
      plain:
        "OnCo found no primary source for cancer registration, cancer services, the oncology workforce, radiotherapy, medicines, screening, vaccination, payment or survival in North Korea. Each of these is a gap, not a zero.",
      detail:
        "Sources tried on 11 November 2026: IARC's fact sheet (no national data source named), WHO's immunisation and health expenditure data (no rows), Europe PMC (no study of cancer services or registry data from inside the country found), OnCo's trial participation data (no site) and OpenAlex (three oncology works in five years). WHO's country page for North Korea and the IAEA's DIRAC radiotherapy database were not read for cancer services.",
      links: [
        { label: "WHO: Democratic People's Republic of Korea", url: WHO_COUNTRY },
        { label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: ["iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "This page uses only IARC's GLOBOCAN 2024 fact sheet, WHO's public data APIs, Europe PMC, OnCo's ClinicalTrials.gov participation data and OpenAlex, each read in full. It uses no news reports, testimony or memory.",
  verify:
    "Every number on this page is IARC's model. Do not read it as a measurement of cancer in North Korea.",
  verifyLinks: [{ label: "IARC: GLOBOCAN 2024 fact sheet, North Korea (PDF)", url: IARC_FACTSHEET }],
};
