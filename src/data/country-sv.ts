import type { CountryDive } from "@/data/country-dive";

/**
 * El Salvador deep dive: the hand-written cards for /countries/sv/ (wave 12). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for El Salvador, WHO's
 * immunisation data API and the World Bank's health expenditure series. This page is the thinnest in the wave: OnCo's web
 * searches ran out, WHO's 2020 cancer profile for El Salvador was not at the address its other profiles use, and the
 * home pages of the Ministry of Health and the social security institute carried nothing on cancer. Each missing source
 * is named under `gaps` rather than filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/222-el-salvador-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SLV'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=SV";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=SV";
const MINSAL = "https://www.salud.gob.sv/";
const ISSS = "https://www.isss.gob.sv/";
const CTGOV = "https://clinicaltrials.gov/search?country=El%20Salvador&cond=cancer";

export const SV_DIVE: CountryDive = {
  iso2: "SV",
  iso3: "SLV",
  name: "El Salvador",
  flag: "🇸🇻",
  asOf: "2026-11-11",
  title: "Cancer in El Salvador",
  description:
    "Cancer in El Salvador: IARC's estimate of 9,539 new cancers and 5,461 deaths in 2024, made without national incidence data, prostate and breast cancer the commonest and stomach cancer the deadliest, more cancer deaths among women than men, HPV vaccination of girls in WHO's data since 2020 and of boys from 2023, out-of-pocket spending at 32.5% of health spending, and one trial in OnCo's records with a site in El Salvador.",
  lede:
    "IARC estimates about 9,500 new cancers and 5,500 cancer deaths a year in El Salvador, with prostate and breast cancer the commonest and stomach cancer the commonest cause of cancer death. It made those estimates without national incidence data. OnCo has not yet read El Salvador's own cancer sources, and this page says so where it matters.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for El Salvador is 9,539 new cancers and 5,461 deaths, an age-standardised incidence of 129.6 per 100,000 (134.4 in men, 130.3 in women) and mortality of 74.8 (74.1 in men, 76.1 in women). IARC's fact sheet gives the country-specific source for incidence as \"no data\", with national mortality estimates applied to modelled mortality-to-incidence ratios, and mortality from WHO's national data projected to 2024. So IARC worked backwards from recorded deaths. OnCo did not find or read a Salvadoran cancer registry report; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in El Salvador",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 9,500 new cancers a year; stomach cancer causes the most deaths",
          plain:
            "IARC estimates 9,539 new cancers in El Salvador in 2024, 5,476 of them in women, and 5,461 cancer deaths. Prostate cancer is the commonest, then breast, stomach, cervical and colorectal cancer. Stomach cancer causes the most deaths, followed by cervical cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,506 prostate cancers (347 deaths), 1,061 breast cancers (290 deaths), 826 stomach cancers (670 deaths), 779 cervical cancers (462 deaths) and 545 colorectal cancers (316 deaths). The risk of developing a cancer before age 75 is 11.2%, and an estimated 19,995 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "sv-globocan-sites",
          title: "The five commonest cancers in El Salvador, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Prostate", cases: 1506, deaths: 347 },
            { site: "Breast", cases: 1061, deaths: 290 },
            { site: "Stomach", cases: 826, deaths: 670 },
            { site: "Cervix uteri", cases: 779, deaths: 462 },
            { site: "Colorectum", cases: 545, deaths: 316 },
          ],
          note: "Estimates, not registry counts: IARC records no national incidence data behind them. El Salvador's own registered counts are a gap on this page.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET }],
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
          title: "About a third of health spending is paid out of pocket",
          plain:
            "El Salvador spent about 501 US dollars a person on health in 2023, and households paid 32.5% of it out of their own pockets, according to WHO's health expenditure figures. OnCo did not read what the Ministry of Health or the Instituto Salvadoreño del Seguro Social covers for cancer.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives out-of-pocket spending of 30.5% of current health spending in 2021, 31.1% in 2022 and 32.5% in 2023, and current health spending per person of USD 470, 500 and 501. These figures cover all health care. The home pages of the Ministry of Health and the social security institute, read on 11 November 2026, carried nothing on cancer services.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, El Salvador", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, El Salvador", url: WB_CHE },
            { label: "Instituto Salvadoreño del Seguro Social", url: ISSS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not yet read El Salvador's medicines regulator",
          plain:
            "OnCo did not read the rules of El Salvador's medicines regulator for this page, so it states nothing about how cancer medicines are approved or how trials are authorised. One trial in OnCo's records lists a site in El Salvador.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. A future pass should read the regulator's registration and clinical trial rules in Spanish, and whether it relies on decisions by other regulators. Until then, a reader should ask the treating hospital whether a given cancer medicine is registered and available in El Salvador.",
          links: [{ label: "Ministerio de Salud de El Salvador", url: MINSAL }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for El Salvador (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination for girls and boys: 77% of girls in 2025",
          plain:
            "WHO's data have HPV vaccination coverage for El Salvador from 2020. In 2025, 77% of girls had a first and a last dose, and 61% of boys a first dose. OnCo did not read a source on El Salvador's cancer screening programmes.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females of 76% (first dose) and 36% (last dose) in 2023, 81% and 81% in 2024, and 77% and 77% in 2025, and first-dose coverage among males of 33% in 2023, 60% in 2024 and 61% in 2025. Cervical cancer is the fourth commonest cancer and the second commonest cause of cancer death in IARC's 2024 estimate, with 779 cases and 462 deaths.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for El Salvador (data API)", url: WHO_HPV_API },
            { label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in El Salvador",
      cards: [
        {
          id: "women",
          title: "More cancer deaths among women than men",
          plain:
            "In IARC's 2024 estimate, 3,291 women and 2,170 men died of cancer in El Salvador, and women's age-standardised cancer death rate, 76.1 per 100,000, was slightly higher than men's, 74.1.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,063 new cancers in men and 5,476 in women, and 2,170 deaths in men and 3,291 in women. OnCo has not read an analysis explaining the pattern in El Salvador and does not offer one.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in El Salvador", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "One trial in OnCo's records lists a site in El Salvador",
          plain:
            "One trial in OnCo's records includes El Salvador among its countries: APHINITY, a completed phase 3 trial in HER2-positive early breast cancer led by Hoffmann-La Roche.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: one trial lists El Salvador, APHINITY (NCT01358877), phase 3, completed, lead sponsor Hoffmann-La Roche. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in El Salvador", url: CTGOV },
            { label: "APHINITY (NCT01358877)", url: "https://clinicaltrials.gov/study/NCT01358877" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not read El Salvador's cancer law, its national cancer registry or plan, the Ministry of Health's or social security institute's cancer services, the medicines regulator's rules, or WHO's 2020 cancer profile for El Salvador. It describes none of these from memory.",
      detail:
        "OnCo's web searches ran out during this wave. WHO's 2020 profile was not at cdn.who.int/media/docs/default-source/country-profiles/cancer/slv-2020.pdf, the address that served the other countries' profiles. The home pages of salud.gob.sv and isss.gob.sv were read and carried nothing on cancer. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries.",
      links: [
        { label: "Ministerio de Salud de El Salvador", url: MINSAL },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["who", "iarc"],
  companies: [],
  drugs: [],
  trials: ["aphinity"],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's immunisation data and the World Bank's health expenditure series. No Salvadoran cancer source was read for this page yet.",
  verify:
    "This page has no Salvadoran national cancer sources yet. Check with the Ministry of Health for current services and coverage.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, El Salvador (PDF)", url: IARC_FACTSHEET },
    { label: "Ministerio de Salud de El Salvador", url: MINSAL },
  ],
};
