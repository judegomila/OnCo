import type { CountryDive } from "@/data/country-dive";

/**
 * Jordan deep dive: the hand-written cards for /countries/jo/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Jordan, WHO's Cancer Country
 * Profile 2020 for Jordan (PDF text), the King Hussein Cancer Center's accreditations and facilities pages, the Jordan
 * Breast Cancer Program's holding page, WHO's immunisation data API and the World Bank's out-of-pocket series. This page
 * is thinner than most: OnCo's web searches ran out during the wave and several Jordanian sources could not be found or
 * read, and each is named under `gaps` rather than filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/400-jordan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/jor-2020.pdf";
const KHCC_ACCRED = "https://www.khcc.jo/en/accreditations";
const KHCC_FEATURES = "https://www.khcc.jo/en/uniqueness";
const KHCC_BUILDINGS = "https://www.khcc.jo/en/khcc-buildings-and-capacity";
const JBCP = "https://www.jbcp.jo/";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'JOR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=JO";
const CTGOV = "https://clinicaltrials.gov/search?country=Jordan&cond=cancer";

export const JO_DIVE: CountryDive = {
  iso2: "JO",
  iso3: "JOR",
  name: "Jordan",
  flag: "🇯🇴",
  asOf: "2026-11-11",
  title: "Cancer in Jordan",
  description:
    "Cancer in Jordan: IARC's estimate of 9,975 new cancers and 4,762 deaths in 2024, a population-based registry that WHO rated high quality, the King Hussein Cancer Center with six linear accelerators, breast screening from age 40 but no cervical screening programme in WHO's 2020 profile, no HPV vaccination data at WHO, and 13 trials in OnCo's records with a site in Jordan.",
  lede:
    "Breast cancer is the commonest cancer in Jordan, and lung cancer causes the most deaths. WHO's 2020 profile recorded a high-quality population-based registry and a breast screening programme, but no cervical screening programme and no national cancer plan in effect.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Jordan is 9,975 new cancers and 4,762 deaths, an age-standardised incidence of 111.7 per 100,000 (117.3 in men, 111.3 in women). IARC's fact sheet gives the country-specific source for incidence as \"no data\", with national mortality estimates applied to modelled mortality-to-incidence ratios, and mortality from WHO's national data projected to 2024. That sits oddly beside WHO's 2020 country profile, which recorded a high-quality population-based registry for Jordan in 2019; OnCo did not read the Jordan Cancer Registry's own reports, so it cannot say how its counts compare (see the gaps).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Jordan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Jordan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 10,000 new cancers a year; breast cancer first, lung cancer the deadliest",
          plain:
            "IARC estimates 9,975 new cancers in Jordan in 2024 and 4,762 cancer deaths. Breast cancer is almost one in five new cancers, followed by colorectal, lung and prostate cancer and non-Hodgkin lymphoma. Lung cancer causes the most deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,866 breast cancers (510 deaths), 1,120 colorectal cancers (523 deaths), 939 lung cancers (793 deaths), 779 prostate cancers (197 deaths) and 550 non-Hodgkin lymphomas (199 deaths). Men had 4,859 new cancers and women 5,116. The risk of developing a cancer before age 75 is 11.0%, and an estimated 24,228 people are living within five years of a diagnosis. WHO's 2020 profile estimated 504 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Jordan (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Jordan (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "system-2020",
          title: "What WHO recorded in 2020: a high-quality registry, no national cancer plan yet",
          plain:
            "WHO's 2020 country profile, from Jordan's answers to WHO surveys, recorded a high-quality population-based cancer registry, a national cancer control plan still under development, cancer management guidelines, pathology services generally available, and palliative care generally not available in the community.",
          detail:
            "The profile's health system page lists, for 2019: a population-based registry rated high quality; the quality of mortality registration for 2007 to 2016 rated low; an integrated NCD plan not in effect; a national cancer control plan under development; cancer management guidelines in place; a defined referral system for childhood cancer; and community or home-based palliative care generally not available. A footnote on the profile says the mortality estimates for the country have a high degree of uncertainty because they are not based on any national NCD mortality data. These are 2019 and 2020 answers and may have changed since.",
          links: [{ label: "WHO: Cancer Country Profile 2020, Jordan (PDF)", url: WHO_PROFILE }],
        },
      ],
      tables: [
        {
          id: "jo-globocan-sites",
          title: "The five commonest cancers in Jordan, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1866, deaths: 510 },
            { site: "Colorectum", cases: 1120, deaths: 523 },
            { site: "Lung", cases: 939, deaths: 793 },
            { site: "Prostate", cases: 779, deaths: 197 },
            { site: "Non-Hodgkin lymphoma", cases: 550, deaths: 199 },
          ],
          note: "Estimates, not registry counts: IARC records no national incidence data behind them. The national registry's own figures are a gap on this page.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Jordan (PDF)", url: IARC_FACTSHEET }],
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
          title: "Out-of-pocket spending was 34.5% of health spending in 2023",
          plain:
            "Across all health care, Jordanians paid about a third of the cost out of their own pockets in 2023, according to WHO's health expenditure figures. OnCo has not yet read the rules of Jordan's public insurance or of the King Hussein Cancer Center's own cancer insurance, so it cannot say what a cancer patient pays.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, puts out-of-pocket spending at 35.8% of current health spending in 2021, 35.9% in 2022 and 34.5% in 2023, and current health spending at about USD 342 per person in 2023. The King Hussein Cancer Center's website lists a cancer insurance product and pages for Jordanian and international patients, but OnCo did not read their terms for this page. See the gaps.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Jordan", url: WB_OOP },
            { label: "King Hussein Cancer Center", url: "https://www.khcc.jo/en" },
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
          id: "jfda",
          title: "OnCo could not reach the Jordan Food and Drug Administration",
          plain:
            "Medicines and clinical trials in Jordan are overseen by the Jordan Food and Drug Administration. Its website did not answer when OnCo tried to read it, so this page states nothing about its approval routes or timelines.",
          detail:
            "jfda.jo returned no response on 11 November 2026. OnCo will add the regulator's registration and trial authorisation rules when it can read them from the source. Thirteen trials in OnCo's records do list sites in Jordan (see research below), so trials are authorised there.",
          links: [{ label: "Jordan Food and Drug Administration", url: "https://www.jfda.jo/" }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cancer Country Profile 2020, Jordan (PDF)", url: WHO_PROFILE },
      cards: [
        {
          id: "screening-2020",
          title: "Breast screening from 40, no cervical screening programme, no HPV vaccination data",
          plain:
            "WHO's 2020 profile recorded a breast cancer screening programme starting at age 40 and early detection guidelines for one cancer, but no cervical cancer screening programme. WHO's immunisation database holds no HPV vaccination coverage figures for Jordan.",
          detail:
            "The profile lists, for 2019, a breast cancer screening programme with a starting age of 40, early detection guidelines for one of the four cancers it asks about (breast, cervix, colon, childhood), and no cervical screening programme; HPV vaccination coverage is marked not available for 2018. A query of WHO's immunisation data API for Jordan's HPV programme coverage on 11 November 2026 returned no rows. The Jordan Breast Cancer Program, run by the King Hussein Cancer Foundation, had a holding page saying its website was under construction.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Jordan (PDF)", url: WHO_PROFILE },
            { label: "WHO: HPV vaccination coverage query for Jordan (data API, no rows)", url: WHO_HPV_API },
            { label: "Jordan Breast Cancer Program (holding page)", url: JBCP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Jordan does differently",
      cards: [
        {
          id: "khcc",
          title: "A cancer-only hospital with six linear accelerators and a transplant programme",
          plain:
            "The King Hussein Cancer Center in Amman treats adults and children with cancer and is run with a fundraising foundation. It lists six linear accelerators, a bone marrow transplant laboratory it says will be able to support up to 300 procedures a year, and a public umbilical cord stem cell bank.",
          detail:
            "KHCC's facilities page describes a radiation oncology department with six linear accelerators fitted with X-ray tracking, a bone marrow transplant laboratory that it says will be able to support up to 300 procedures a year, and what it calls the first and only public umbilical cord stem cell bank in Jordan. Its accreditations page says it was the first institution in Jordan to hold Joint Commission International accreditation (since 2006), the first centre outside the United States to obtain Joint Commission International's Clinical Care Program Certification for cancer care, and accredited by the Foundation for the Accreditation of Cellular Therapy for transplantation. Its buildings page gives 108,700 square metres in three buildings, in addition to a building in Aqaba. These are the centre's own statements.",
          links: [
            { label: "KHCC: our features (facilities)", url: KHCC_FEATURES },
            { label: "KHCC: accreditations", url: KHCC_ACCRED },
            { label: "KHCC: buildings and capacity", url: KHCC_BUILDINGS },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Jordan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "13 trials in OnCo's records list a site in Jordan, 11 of them phase 3",
          plain:
            "Thirteen trials in OnCo's records include Jordan among their countries, 11 of them phase 3. Two were recruiting when the registry was last read; most were active but no longer recruiting.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 13 trials list Jordan, 11 phase 3, 1 phase 2 and 1 phase 2/3. ClinicalTrials.gov lists 2 as recruiting, 10 as active and not recruiting and 1 as completed. Novartis and Hoffmann-La Roche each lead 3. They include EMPOWER-Lung 1 (cemiplimab in non-small cell lung cancer). OnCo holds a selection of trials, not the whole registry.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Jordan", url: CTGOV },
            { label: "EMPOWER-Lung 1 (NCT03088540)", url: "https://clinicaltrials.gov/study/NCT03088540" },
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
        "OnCo did not read the Jordan Cancer Registry's reports, the Ministry of Health's rules for covering cancer treatment, the King Hussein Cancer Center's insurance terms, the regulator's rules, or sources on cancer care for refugees in Jordan. Its web searches for this wave ran out before these were found.",
      detail:
        "The Jordan Food and Drug Administration's site did not respond on 11 November 2026, and the Jordan Breast Cancer Program's site was under construction. A future pass should read the Jordan Cancer Registry's latest annual report, the Ministry of Health's and the Royal Court's arrangements for paying for cancer care, KHCC's cancer insurance terms, UNHCR's and WHO's sources on refugees' access to cancer care, and IAEA figures for radiotherapy outside KHCC. None of these is described here from memory.",
      links: [
        { label: "Jordan Food and Drug Administration", url: "https://www.jfda.jo/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["khcc"],
  companies: [],
  drugs: [],
  trials: ["empower-lung-1", "nct03591510", "nct04557059", "nct06687369", "nct04603807", "nct06054555", "nct05296798", "nct05894239", "nct05456191", "nct05566795", "nct05491525", "nct06468033", "nct05132075"],
  papers: [],
  people: ["asem-mansour"],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, the World Bank, and the King Hussein Cancer Center's own pages. Where a Jordanian source could not be found or read, the page says so.",
  verify:
    "WHO's profile describes 2019 and 2020; check with the Ministry of Health for the current screening programmes and national plan. KHCC's statements about itself are its own.",
  verifyLinks: [
    { label: "WHO: Cancer Country Profile 2020, Jordan (PDF)", url: WHO_PROFILE },
    { label: "King Hussein Cancer Center", url: "https://www.khcc.jo/en" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Jordan (PDF)", url: IARC_FACTSHEET },
  ],
};
