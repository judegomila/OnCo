import type { CountryDive } from "@/data/country-dive";

/**
 * Armenia deep dive: the hand-written cards for /countries/am/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Armenia, the National Center
 * of Oncology named after V. A. Fanarjyan's home page (in Armenian), WHO's immunisation data API and the World Bank's
 * health expenditure series. This page is thin: OnCo's web searches ran out during the wave, WHO's 2020 cancer profile
 * for Armenia was not at the address its other profiles use, and the Ministry of Health's site would not render without
 * a browser. Each missing source is named under `gaps` rather than filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/51-armenia-fact-sheet.pdf";
const NCO = "https://www.oncology.am/";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ARM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=AM";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=AM";
const CTGOV = "https://clinicaltrials.gov/search?country=Armenia&cond=cancer";

export const AM_DIVE: CountryDive = {
  iso2: "AM",
  iso3: "ARM",
  name: "Armenia",
  flag: "🇦🇲",
  asOf: "2026-11-11",
  title: "Cancer in Armenia",
  description:
    "Cancer in Armenia: IARC's estimate of 10,718 new cancers and 5,468 deaths in 2024, made without national incidence data, lung cancer the deadliest, households paying about four fifths of health spending out of pocket, HPV vaccination of girls at 47% in 2025, the National Center of Oncology in Yerevan, and two trials in OnCo's records with a site in Armenia.",
  lede:
    "Breast and lung cancer are the commonest cancers in Armenia, and lung cancer causes the most deaths, nearly a quarter of them. Households paid about 80% of the country's health spending out of their own pockets in 2023, the highest share of the ten countries OnCo added in this wave.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Armenia is 10,718 new cancers and 5,468 deaths, an age-standardised incidence of 215.8 per 100,000 (260.1 in men, 193.4 in women). IARC's fact sheet gives the country-specific source for incidence as \"no data\", with national mortality estimates applied to modelled mortality-to-incidence ratios, and mortality from WHO's national data projected to 2024. So IARC worked backwards from Armenia's recorded deaths. OnCo did not find or read Armenia's own cancer statistics for this page; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Armenia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Armenia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 10,700 new cancers a year; lung cancer causes nearly a quarter of cancer deaths",
          plain:
            "IARC estimates 10,718 new cancers in Armenia in 2024 and 5,468 cancer deaths. Breast cancer is the commonest, then lung, colorectal, prostate and liver cancer. Lung cancer causes the most deaths, 1,270 of them.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,590 breast cancers (458 deaths), 1,513 lung cancers (1,270 deaths, 23.2% of all cancer deaths), 1,079 colorectal cancers (514 deaths), 878 prostate cancers (221 deaths) and 581 liver cancers (510 deaths). Age-standardised mortality is 149.4 per 100,000 in men and 79.6 in women. The risk of developing a cancer before age 75 is 20.9%, and an estimated 26,260 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Armenia (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "am-globocan-sites",
          title: "The five commonest cancers in Armenia, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1590, deaths: 458 },
            { site: "Lung", cases: 1513, deaths: 1270 },
            { site: "Colorectum", cases: 1079, deaths: 514 },
            { site: "Prostate", cases: 878, deaths: 221 },
            { site: "Liver", cases: 581, deaths: 510 },
          ],
          note: "Estimates, not registry counts: IARC records no national incidence data behind them. Armenia's own registered counts are a gap on this page.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Armenia (PDF)", url: IARC_FACTSHEET }],
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
          title: "About 80% of health spending came from patients' own pockets in 2023",
          plain:
            "Armenia spent about 767 US dollars a person on health in 2023, and 80.5% of it was paid directly by households, according to WHO's health expenditure figures. OnCo did not read the rules of the state-funded programmes that pay for some cancer care, so it cannot say what a patient pays for a given treatment.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives out-of-pocket spending of 78.7% of current health spending in 2021, 79.1% in 2022 and 80.5% in 2023, and current health spending per person of USD 596, 675 and 767 in those years. These figures cover all health care. The National Center of Oncology's home page says its psychosocial service in palliative care is free to all patients and their families. See the gaps for the state programmes not read.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Armenia", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Armenia", url: WB_CHE },
            { label: "National Center of Oncology named after V. A. Fanarjyan (in Armenian)", url: NCO },
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
          title: "OnCo has not yet read Armenia's medicines regulator",
          plain:
            "OnCo did not read the rules of Armenia's medicines regulator for this page, so it states nothing about how cancer medicines are approved or how trials are authorised. Two trials in OnCo's records list sites in Armenia.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. A future pass should read the regulator's registration and clinical trial rules in Armenian, and whether Armenia relies on approvals within the Eurasian Economic Union.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in Armenia", url: CTGOV }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Armenia (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination: 47% of girls in 2025",
          plain:
            "WHO's data give 47% of girls in Armenia a first dose and a last dose of HPV vaccine in 2025, up from 43% and 21% in 2023. WHO's series has HPV coverage for Armenia from 2018. OnCo did not read a source on Armenia's cancer screening programmes.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females of 43% (first dose) and 21% (last dose) in 2023, 38% and 31% in 2024, and 47% and 47% in 2025. The National Center of Oncology's home page carried, in late October 2026, a patient's account of breast cancer found by screening; OnCo has not read the national screening programme's own rules. See the gaps.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Armenia (data API)", url: WHO_HPV_API },
            { label: "National Center of Oncology named after V. A. Fanarjyan (in Armenian)", url: NCO },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Armenia",
      cards: [
        {
          id: "nco",
          title: "A national oncology centre in Yerevan with its own brachytherapy department",
          plain:
            "The National Center of Oncology named after V. A. Fanarjyan, in Yerevan, has departments for surgery by organ, medical oncology, external beam radiotherapy and brachytherapy, palliative care and psychosocial support. It describes its brachytherapy department as the first and only one in Armenia.",
          detail:
            "The centre's home page, read in Armenian, lists departments of oncological urology, gynaecology, musculoskeletal oncology (named after Sergey Seinyan), abdominal and endoscopic surgery, intracavitary and interstitial radiotherapy, neuro-oncology (formed in October 1983), mammology, external beam radiotherapy, medical oncology for almost all sites except leukaemias, general and paediatric oncology and reconstructive surgery, thoracic surgery, and vascular surgery (created on 12 September 2023). It names Karen Tsarukyan as director, and says palliative care in Armenia began in 2003 with the founding of an association for pain relief and palliative care. The claims about firsts are the centre's own.",
          links: [{ label: "National Center of Oncology named after V. A. Fanarjyan (in Armenian)", url: NCO }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Armenia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "Two trials in OnCo's records list a site in Armenia",
          plain:
            "Two phase 3 trials in OnCo's records include Armenia among their countries, sponsored by mAbxience and Servier, both active but no longer recruiting when the registry was last read.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: NCT06687369, comparing MB12, a proposed pembrolizumab biosimilar, with Keytruda in non-small cell lung cancer (lead sponsor mAbxience Research), and NCT05876754, an early access study of ivosidenib in pretreated cholangiocarcinoma (lead sponsor Servier Affaires Médicales), both phase 3 and active, not recruiting. OnCo holds a selection of trials, not the whole registry.",
          links: [
            { label: "ClinicalTrials.gov: NCT06687369", url: "https://clinicaltrials.gov/study/NCT06687369" },
            { label: "ClinicalTrials.gov: NCT05876754", url: "https://clinicaltrials.gov/study/NCT05876754" },
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
        "OnCo did not read Armenia's national cancer statistics or registry, the Ministry of Health's cancer programmes or screening rules, the state programmes that pay for cancer treatment, the medicines regulator's rules, or WHO's 2020 cancer profile for Armenia. It describes none of these from memory.",
      detail:
        "OnCo's web searches ran out during this wave. WHO's 2020 profile was not at cdn.who.int/media/docs/default-source/country-profiles/cancer/arm-2020.pdf, the address that served the other countries' profiles. The Ministry of Health's site (moh.am) returned a page that needs a browser to render. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries.",
      links: [
        { label: "Ministry of Health of Armenia", url: "https://www.moh.am/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["national-center-of-oncology-armenia", "armenian-psycho-oncology-association"],
  companies: [],
  drugs: [],
  trials: ["nct06687369", "nct05876754"],
  papers: [],
  people: ["karen-tsarukyan"],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet, the National Center of Oncology's home page in Armenian, WHO's immunisation data and the World Bank's health expenditure series.",
  verify:
    "This page has no Armenian national statistics yet. Check with the Ministry of Health or the National Center of Oncology for what is covered and available.",
  verifyLinks: [
    { label: "National Center of Oncology named after V. A. Fanarjyan", url: NCO },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Armenia (PDF)", url: IARC_FACTSHEET },
  ],
};
