import type { CountryDive } from "@/data/country-dive";

/**
 * Guinea deep dive: the hand-written cards for /countries/gn/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the African Cancer Registry Network's page for the Registre des
 * cancers de Guinée, IARC's GLOBOCAN 2024 fact sheet for Guinea, WHO's Cancer Country Profile 2020 for Guinea (PDF text),
 * WHO's immunisation data API and the World Bank's health expenditure series. This page is thin: OnCo's web searches ran
 * out during the wave, the Ministry of Health's site carried nothing on cancer, and each missing source is named under
 * `gaps` rather than filled from memory.
 */
const AFCRN_GN = "https://afcrn.org/index.php/membership/membership-list/91-guineecr";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/324-guinea-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/gin-2020.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GIN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=GN";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=GN";
const MOH = "https://sante.gov.gn/";
const CTGOV = "https://clinicaltrials.gov/search?country=Guinea&cond=cancer";

export const GN_DIVE: CountryDive = {
  iso2: "GN",
  iso3: "GIN",
  name: "Guinea",
  flag: "🇬🇳",
  asOf: "2026-11-11",
  title: "Cancer in Guinea",
  description:
    "Cancer in Guinea: IARC's estimate of 11,592 new cancers and 7,746 deaths in 2024, built on the Conakry cancer registry set up in 1990 at Donka hospital, breast and cervical cancer leading, health spending of about USD 59 a person with more than half paid out of pocket, opportunistic cervical screening by visual inspection, no HPV vaccination figures at WHO, and no trial in OnCo's records with a site in Guinea.",
  lede:
    "Breast and cervical cancer are the commonest cancers in Guinea, and IARC estimates about two cancer deaths for every three new cancers. The country's cancer figures rest on one city registry in Conakry, and the registry's own description says patients needing radiotherapy have been sent abroad.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guinea is 11,592 new cancers and 7,746 deaths, an age-standardised incidence of 127.4 per 100,000 (110.7 in men, 143.3 in women). IARC's fact sheet gives its incidence source as a subnational registry, with subnational rates applied to the 2024 population, and mortality as national incidence applied to modelled mortality-to-incidence ratios. The subnational registry is the Registre des cancers de Guinée in Conakry, which aims to cover the city's residents only. Whether the rest of the country, most of it rural, has the same pattern is not known.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Guinea",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 11,600 new cancers a year, six in ten in women",
          plain:
            "IARC estimates 11,592 new cancers in Guinea in 2024, 7,153 of them in women, and 7,746 cancer deaths. Breast cancer is the commonest, then cervical, prostate and liver cancer. Breast cancer also causes the most deaths, followed by liver cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,282 breast cancers (1,074 deaths), 1,323 cervical cancers (809 deaths), 1,104 prostate cancers (706 deaths), 1,085 liver cancers (959 deaths) and 517 leukaemias (343 deaths). Deaths divided by new cases give 0.67 for 2024. The risk of developing a cancer before age 75 is 13.4%, and an estimated 19,129 people are living within five years of a diagnosis. WHO's 2020 profile estimated 746 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "One registry, in Conakry since 1990, run from the pathology department at Donka",
          plain:
            "The Registre des cancers de Guinée was set up in 1990 in the pathology department of the Hôpital National de Donka in Conakry and aims to count cancers among the city's residents. From 2006 to 2010 it registered 3,146 cancers, 1,949 of them in Conakry residents.",
          detail:
            "The registry's page on the African Cancer Registry Network describes a six-month residence rule to separate residents from people who come to the city for care; case-finding done actively by medical students as part of their coursework; sources at the Donka and Ignace Deen national hospitals, the Sino-Guinean Friendship Hospital at Kipé, four community hospitals and private clinics; and, in its description of the setting, no civil registration of deaths with certified causes. Its first results, for 1992 to 1995, were published in 1997. For 2006 to 2010 it registered 3,146 cases, 1,949 among residents, 71% confirmed by histology or cytology. The page's description of the registry dates from its early years (it cites the 1996 census, when Conakry had 1.09 million people) and has not been updated with recent counts; OnCo did not find a more recent report.",
          links: [{ label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN }],
        },
      ],
      tables: [
        {
          id: "gn-registry",
          title: "What the Conakry registry has reported",
          caption: "Cases registered in the latest period on the registry's African Cancer Registry Network page, 2006 to 2010.",
          columns: [
            { key: "period", label: "Period" },
            { key: "all", label: "Cases registered", numeric: true },
            { key: "residents", label: "Among Conakry residents", numeric: true },
            { key: "verified", label: "Confirmed by histology or cytology (%)", numeric: true },
          ],
          rows: [{ period: "2006 to 2010", all: 3146, residents: 1949, verified: 71 }],
          note: "The latest figures OnCo found from the registry; it found no more recent report. A registry counts new cases, not deaths, and this one covers one city.",
          sources: [{ label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN }],
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
          title: "About USD 59 a person on health, more than half of it out of pocket",
          plain:
            "Guinea spent about 59 US dollars a person on health in 2023, and households paid 54% of it out of their own pockets, according to WHO's health expenditure figures. OnCo did not find a source on what public schemes cover for cancer.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 44 per person in 2021, 53 in 2022 and 59 in 2023, and out-of-pocket spending of 53.5%, 54.1% and 54.4% of current health spending in those years. WHO's 2020 profile recorded the availability of opioids for pain relief, in defined daily doses per million people per day for 2015 to 2017, as 0. The Ministry of Health's home page, read on 11 November 2026, carried no information on cancer services or their cost.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Guinea", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Guinea", url: WB_CHE },
            { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
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
          title: "OnCo has not yet read Guinea's medicines regulator",
          plain:
            "OnCo did not find or read the rules of Guinea's medicines regulator for this page, so it states nothing about how cancer medicines are approved or how trials are authorised. No trial in OnCo's records lists a site in Guinea.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. The Ministry of Health and Public Hygiene's site was read and carried nothing on medicines regulation for cancer. A future pass should read the regulator's own texts in French.",
          links: [{ label: "Ministère de la Santé et de l'Hygiène publique", url: MOH }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
      cards: [
        {
          id: "screening-2020",
          title: "Cervical screening by visual inspection, offered opportunistically; no HPV vaccination figures at WHO",
          plain:
            "WHO's 2020 profile recorded cervical cancer screening in Guinea by visual inspection, offered to women who come forward rather than by invitation, with a defined referral system. WHO's immunisation database holds no HPV vaccination coverage figures for Guinea.",
          detail:
            "The profile lists, for 2019, cervical screening present, of the opportunistic type, by visual inspection; a breast cancer screening programme recorded as present; early detection guidelines for two of the four cancers it asks about; and no early detection guidelines or defined referral system for childhood cancer. HPV vaccination coverage is marked not available for 2018, and a query of WHO's immunisation data API for Guinea's HPV programme coverage on 11 November 2026 returned no rows.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
            { label: "WHO: HPV vaccination coverage query for Guinea (data API, no rows)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in Guinea",
      cards: [
        {
          id: "radiotherapy",
          title: "The registry's account: no radiotherapy in the country, patients sent to Dakar",
          plain:
            "The Conakry registry's description of its setting says there is no radiotherapy service in Guinea and that patients are sent to Dakar, in Senegal, for treatment, and that specialised oncology is limited to a department of oncological and gynaecological surgery at Donka.",
          detail:
            "This comes from the registry's page on the African Cancer Registry Network, which describes the registry's early years and is not dated; OnCo did not find a more recent source on whether radiotherapy has since opened in Guinea, and the page should not be read as current. WHO's 2020 profile does not give a usable figure for radiotherapy machines in Guinea. IAEA's DIRAC database, which would say, needs an account for most queries. See the gaps.",
          links: [
            { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Guinea", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Guinea",
          plain:
            "None of the trials in OnCo's records lists Guinea among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: no trial record lists Guinea. Research from the country that OnCo knows of is the registry's own work, including its 1997 paper on incidence in Conakry from 1992 to 1995, cited on its network page.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Guinea", url: CTGOV },
            { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
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
        "OnCo did not find a recent report from the Conakry registry, a national cancer plan, the rules of the medicines regulator, or any source on what public schemes pay for cancer care, and could not confirm whether radiotherapy is now available in Guinea.",
      detail:
        "OnCo's web searches ran out during this wave, and the Ministry of Health's home page carried nothing on cancer. A future pass should look for the national cancer control plan, the regulator's texts, the state of radiotherapy (IAEA), recent registry results (GICR, IARC), and the HPV vaccine's introduction. None of these is described here from memory.",
      links: [
        { label: "Ministère de la Santé et de l'Hygiène publique", url: MOH },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["registre-cancers-guinee", "hopital-national-donka"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026: the African Cancer Registry Network's page for the Conakry registry, IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, and the World Bank's health expenditure series.",
  verify:
    "Much of what is known about cancer services in Guinea here comes from old or undated sources. Check with the Ministry of Health or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea (PDF)", url: IARC_FACTSHEET },
  ],
};
