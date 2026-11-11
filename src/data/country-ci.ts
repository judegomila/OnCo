import type { CountryDive } from "@/data/country-dive";

/**
 * Côte d'Ivoire deep dive: the hand-written cards for /countries/ci/ (wave 9). Every figure was read from the raw text of
 * its source on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Côte d'Ivoire (PDF text), the abstract of the
 * Abidjan registry's first results through Europe PMC, the African Cancer Registry Network's membership list, WHO's
 * Global Health Observatory API (HPV coverage and the 2019 and 2021 country capacity surveys), the World Bank's health
 * expenditure API and OnCo's ClinicalTrials.gov participation data. The Ministry of Health's site showed only an entry
 * page, the regulator's site loads its content by script, and the other national sites tried did not answer or required a
 * login; the gaps are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/384-cote-divoire-fact-sheet.pdf";
const ABIDJAN_2000 = "https://doi.org/10.1002/1097-0142(20000801)89:3%3C653::aid-cncr22%3E3.0.co;2-z";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'CIV'";
const WHO_RADIO = "https://ghoapi.azureedge.net/api/NCD_CCS_radio?$filter=SpatialDim%20eq%20'CIV'";
const WHO_CHEMO = "https://ghoapi.azureedge.net/api/NCD_CCS_chemo?$filter=SpatialDim%20eq%20'CIV'";
const WHO_CX = "https://ghoapi.azureedge.net/api/NCD_CCS_cervicalcancermethod?$filter=SpatialDim%20eq%20'CIV'";
const WB_OOP = "https://api.worldbank.org/v2/country/CIV/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_PC = "https://api.worldbank.org/v2/country/CIV/indicator/SH.XPD.CHEX.PC.CD?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=C%C3%B4te%20d%27Ivoire&cond=cancer";

export const CI_DIVE: CountryDive = {
  iso2: "CI",
  iso3: "CIV",
  name: "Côte d'Ivoire",
  flag: "🇨🇮",
  asOf: "2026-11-11",
  title: "Cancer in Côte d'Ivoire",
  description:
    "Cancer in Côte d'Ivoire from published and international sources: IARC's estimate of 20,402 new cancers and 12,710 deaths in 2024, breast cancer as the commonest cancer and cause of cancer death, the Abidjan registry's first results, households paying about a third of health spending, HPV vaccine coverage of 90% in 2025, cervical screening by VIA, and one trial in our records with a site in the country.",
  lede:
    "IARC estimates 20,402 new cancers and 12,710 cancer deaths in Côte d'Ivoire in 2024. Breast cancer is the commonest cancer and causes the most cancer deaths, followed by prostate and cervical cancer. Abidjan has a cancer registry, but its latest published results that OnCo could read are from the 1990s.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Côte d'Ivoire is 20,402 new cancers and 12,710 deaths, an age-standardised incidence of 114.0 per 100,000 (102.2 in men, 128.7 in women) and mortality of 75.3. IARC's fact sheet names its incidence method as national or sub-national rates scaled to regional all-cancer rates; mortality is estimated from incidence and modelled mortality-to-incidence ratios based on registry survival data (Survcan). The Abidjan registry's first results, for 1995 to 1997, measured 83.7 per 100,000 men and 98.6 per 100,000 women, and its authors expected some cases to be missed.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Côte d'Ivoire",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Côte d'Ivoire (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 20,000 new cancers a year; breast cancer leads cases and deaths",
          plain:
            "IARC estimates 20,402 new cancers in Côte d'Ivoire in 2024, 11,903 in women and 8,499 in men. Breast cancer is the commonest (4,845 cases, 2,284 deaths), followed by prostate, cervical, liver and colorectal cancer. For every ten new cancers there are about six cancer deaths.",
          detail:
            "GLOBOCAN 2024 gives prostate cancer 2,632 cases and 1,605 deaths, cervical cancer 2,540 cases and 1,542 deaths, liver cancer 1,696 cases and 1,515 deaths, and colorectal cancer 1,132 cases and 650 deaths. The age-standardised incidence of breast cancer is 48.1 per 100,000 women and of prostate cancer 41.7 per 100,000 men.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Côte d'Ivoire (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "ci-capacity",
          title: "What Côte d'Ivoire reported to WHO about cancer services in 2021",
          caption: "Côte d'Ivoire's answers to WHO's NCD country capacity survey, 2021, from WHO's Global Health Observatory.",
          columns: [
            { key: "item", label: "Question" },
            { key: "answer", label: "Answer" },
          ],
          rows: [
            { item: "Population-based cancer registry exists", answer: "Yes" },
            { item: "Operational cancer plan or strategy", answer: "Yes" },
            { item: "Radiotherapy generally available in the public sector", answer: "No" },
            { item: "Chemotherapy generally available in the public health system", answer: "No" },
            { item: "Pathology laboratories generally available in the public sector", answer: "No" },
            { item: "Oral morphine generally available in the public health sector", answer: "No" },
            { item: "National cervical screening programme (main method)", answer: "Yes (VIA)" },
            { item: "National breast screening programme", answer: "No" },
          ],
          note: "These are the country's own answers to WHO. 'Not generally available' means not available to most people in the public sector, not that the service does not exist anywhere in the country.",
          sources: [
            { label: "WHO Global Health Observatory: radiotherapy availability, Côte d'Ivoire (API)", url: WHO_RADIO },
            { label: "WHO Global Health Observatory: chemotherapy availability, Côte d'Ivoire (API)", url: WHO_CHEMO },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: the Abidjan registry",
      aside: { label: "Echimane et al., Abidjan 1995 to 1997 (Cancer 2000)", url: ABIDJAN_2000 },
      cards: [
        {
          id: "registry-abidjan",
          title: "A city registry whose first results date from the 1990s",
          plain:
            "The Abidjan cancer registry tries to record every new cancer diagnosed in the city, including those not confirmed by a laboratory. Its first results, for 1995 to 1997, counted 2,815 new cancers. It is a member of the African Cancer Registry Network, but OnCo could not read anything more recent from it.",
          detail:
            "The first results found liver cancer (15%) and prostate cancer (15.8%) leading in men, and breast cancer (25.7%) and cervical cancer (24.0%) in women, with Kaposi sarcoma at moderate frequency (7.7% of cancers in men) and relatively high rates of Burkitt lymphoma in children. The authors read the relatively high breast and prostate cancer rates as signs of a westernising cancer pattern. The registry's page on the African Cancer Registry Network returned no text on 11 November 2026.",
          links: [
            { label: "Echimane et al., cancer incidence in Abidjan 1995 to 1997 (Cancer 2000)", url: ABIDJAN_2000 },
            { label: "African Cancer Registry Network: member registries", url: AFCRN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care",
      aside: { label: "World Bank: out-of-pocket expenditure, Côte d'Ivoire (API)", url: WB_OOP },
      cards: [
        {
          id: "financing",
          title: "About 88 US dollars a person, a third of it paid out of pocket",
          plain:
            "According to the World Bank, Côte d'Ivoire spent 87.68 US dollars a person on health in 2023, 3.4% of the value of its economy (GDP). Households paid 32.0% of it out of pocket, the government 40.8% and external sources 11.8%.",
          detail:
            "These are the World Bank's indicators drawn from WHO's Global Health Expenditure Database. In its 2021 answers to WHO, the country reported chemotherapy and radiotherapy as not generally available in the public sector. The address OnCo tried for the national health insurance fund (ipscnam.ci) redirected to a login page, so OnCo cannot say what public insurance covers for cancer; see the gaps.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, Côte d'Ivoire (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per person, Côte d'Ivoire (API)", url: WB_PC },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines",
      cards: [
        {
          id: "airp",
          title: "The pharmaceutical regulator's website could not be read",
          plain:
            "Medicines in Côte d'Ivoire are regulated by the Autorité Ivoirienne de Régulation Pharmaceutique (AIRP). Its website loads its content by script and returned only its title to a plain request, so OnCo cannot describe its approval routes or timelines here.",
          detail:
            "OnCo reads sources as raw text and does not run a site's scripts to extract its content. OnCo's web search budget was spent during this round, so other copies of AIRP's guidelines could not be looked for. This card will be filled when a primary source can be read.",
          links: [{ label: "AIRP: Autorité Ivoirienne de Régulation Pharmaceutique", url: "https://www.airp.ci/" }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Global Health Observatory: HPV coverage, Côte d'Ivoire (API)", url: WHO_HPV },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccine coverage reached 90% in 2025",
          plain:
            "WHO estimates that 90% of girls in the target age group in Côte d'Ivoire were vaccinated against HPV in 2025, up from 6% in 2019. The country reported to WHO in 2021 that its cervical screening programme uses visual inspection with acetic acid, and that it has no national breast screening programme.",
          detail:
            "WHO's estimates for the primary target cohort were 6% in 2019, 61% in 2020, 28% in 2021, 44% in 2022, 73% in 2023, 61% in 2024 and 90% in 2025. Breast cancer is the commonest cancer and cause of cancer death in women, and the country reported no national breast screening programme. OnCo did not read a Ministry description of the screening programme's ages or reach.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Côte d'Ivoire (API)", url: WHO_HPV },
            { label: "WHO Global Health Observatory: cervical screening method, Côte d'Ivoire (API)", url: WHO_CX },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Côte d'Ivoire does",
      title: "What Côte d'Ivoire does differently",
      cards: [
        {
          id: "hpv-scale",
          title: "From 6% to 90% HPV vaccine coverage in six years",
          plain:
            "Côte d'Ivoire's HPV vaccine coverage went from 6% of girls in the target age group in 2019 to 90% in 2025, by WHO's estimates. Cervical cancer is the third commonest cancer in the country, with 2,540 new cases and 1,542 deaths a year according to IARC.",
          detail:
            "WHO's estimates show the climb was not smooth (61% in 2020, then 28% in 2021, rising again to 73% in 2023). OnCo did not read the Ministry of Health's own account of how the programme was delivered, its target ages or its vaccine schedule, because the Ministry's website showed only an entry page; this card reports the outcome WHO measures, not how it was achieved.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Côte d'Ivoire (API)", url: WHO_HPV },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Côte d'Ivoire (PDF)", url: IARC_FACTSHEET },
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
          title: "One trial in OnCo's records has a site in Côte d'Ivoire",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, one cancer trial in our records lists a site in Côte d'Ivoire: SKYSCRAPER-14, Roche's phase 3 trial of atezolizumab and bevacizumab with or without tiragolumab in liver cancer, active but no longer recruiting.",
          detail:
            "ClinicalTrials.gov lists sites in 27 countries and territories for it. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all cancer research in Côte d'Ivoire; the ClinicalTrials.gov search linked here shows more.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Côte d'Ivoire (search)", url: CTGOV },
            { label: "SKYSCRAPER-14 on OnCo", url: "/trials/nct05904886/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "national-sources",
      title: "National sources could not be read",
      plain:
        "On 11 November 2026 the Ministry of Health's website showed only an entry page, the regulator AIRP's site returned only its title, and the addresses OnCo tried for the national radiotherapy centre and the national cancer programme did not answer, and the health insurance fund's site led only to a login page. This page therefore has no national cancer plan, no treatment centre list and no insurance rules.",
      detail:
        "The country told WHO in 2021 that it has an operational cancer plan, but OnCo could not read it. The IAEA's directory of radiotherapy centres works only in a browser, so no machine count is given. OnCo's web search budget was spent during this round, so other copies of national documents could not be looked for.",
      links: [
        { label: "Ministry of Health, Côte d'Ivoire", url: "https://www.sante.gouv.ci/" },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["abidjan-cancer-registry", "iarc", "who"],
  companies: ["roche-genentech"],
  drugs: [],
  trials: ["nct05904886"],
  papers: ["paper-echimane-abidjan-incidence-1995-1997-cancer-2000"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Côte d'Ivoire; the Abidjan registry paper's abstract through Europe PMC; the African Cancer Registry Network's membership list; WHO's Global Health Observatory; and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records (the Abidjan registry and its paper) carry their own sources.",
  verify:
    "National figures are IARC estimates. Which hospitals give radiotherapy and chemotherapy, and what public health insurance covers, change faster than published sources; ask the treating hospital in Abidjan or your health district.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Côte d'Ivoire (PDF)", url: IARC_FACTSHEET },
    { label: "African Cancer Registry Network: member registries", url: AFCRN },
  ],
};
