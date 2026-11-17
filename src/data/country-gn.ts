import type { CountryDive } from "@/data/country-dive";

/**
 * Guinea deep dive: the hand-written cards for /countries/gn/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the African Cancer Registry Network's page for the Registre des
 * cancers de Guinée, IARC's GLOBOCAN 2024 fact sheet for Guinea, WHO's Cancer Country Profile 2020 for Guinea (PDF text),
 * WHO's immunisation data API and the World Bank's health expenditure series. This page is thin: OnCo's web searches ran
 * out during the wave, the Ministry of Health's site carried nothing on cancer, and each missing source is named under
 * `gaps` rather than filled from memory.
 *
 * Second accuracy pass, 16 November 2026: every claim re-read against its source. IARC's fact sheet does not name the
 * registry behind its estimate, so the page no longer says it is the Conakry one. The HPV query used an antigen prefix
 * that matches nothing; the broader query returns rows for 2018 to 2025 with no values. IAEA's public DIRAC data answer
 * without an account and list no centre in Guinea. The regulator card is filled from NIH ClinRegs, and the ministry's
 * World Cancer Day 2025 item is cited for what it says. The World Bank API timed out; the same series was re-read from
 * WHO's Global Health Observatory API.
 */
const AFCRN_GN = "https://afcrn.org/index.php/membership/membership-list/91-guineecr";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/324-guinea-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/gin-2020.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GIN'%20and%20contains(ANTIGEN,'HPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=GN";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=GN";
const MOH = "https://sante.gov.gn/";
const CTGOV = "https://clinicaltrials.gov/search?country=Guinea&cond=cancer";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/guinea";
const MOH_WCD_2025 = "https://sante.gov.gn/celebration-de-la-journee-mondiale-contre-le-cancer/";
const DIRAC_DATA = "https://dirac.iaea.org/Data/CountriesLight";

export const GN_DIVE: CountryDive = {
  iso2: "GN",
  iso3: "GIN",
  name: "Guinea",
  flag: "🇬🇳",
  asOf: "2026-11-11",
  title: "Cancer in Guinea",
  description:
    "Cancer in Guinea: IARC's estimate of 11,592 new cancers and 7,746 deaths in 2024, built on a subnational registry that IARC does not name, a cancer registry in Conakry set up in 1990 at Donka hospital, breast and cervical cancer leading, health spending of about USD 59 a person with more than half paid out of pocket, opportunistic cervical screening by visual inspection, no HPV vaccination figures at WHO, no radiotherapy centre listed for Guinea in IAEA's directory, and no trial in OnCo's records with a site in Guinea.",
  lede:
    "Breast and cervical cancer are the commonest cancers in Guinea, and IARC estimates about two cancer deaths for every three new cancers. IARC builds its estimate from a subnational registry it does not name on its fact sheet; the registry OnCo has read about covers the city of Conakry. That registry's own undated description says patients needing radiotherapy are sent abroad, and IAEA's directory lists no radiotherapy centre in Guinea.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guinea is 11,592 new cancers and 7,746 deaths, an age-standardised incidence of 127.4 per 100,000 (110.7 in men, 143.3 in women). IARC's fact sheet gives its incidence source as a subnational registry, with subnational rates applied to the 2024 population, and mortality as national incidence applied to modelled mortality-to-incidence ratios. The fact sheet does not name the registry. The Guinean registry OnCo has read about is the Registre des cancers de Guinée in Conakry, which aims to cover the city's residents only. Whether the rest of the country has the same pattern is not known.",
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
          title: "A registry in Conakry since 1990, in the pathology department at Donka",
          plain:
            "The Registre des cancers de Guinée was set up in 1990 in the pathology department of the Hôpital National de Donka in Conakry and aims to count cancers among the city's residents. From 2006 to 2010 it registered 3,146 cancers, 1,949 of them in Conakry residents.",
          detail:
            "The registry's page on the African Cancer Registry Network describes a six-month residence rule to separate residents from people who come to the city for care; case-finding done actively by medical students as part of their coursework; sources at the Donka and Ignace Deen national hospitals, the Sino-Guinean Friendship Hospital at Kipé, four community hospitals and private clinics; and, in its description of the setting, no civil registration of deaths with certified causes. Its first results, for 1992 to 1995, were published in 1997. For 2006 to 2010 it registered 3,146 cases, 1,949 among residents, 71% confirmed by histology or cytology. The page is not dated. Its description of the registry gives 1996 as the last census, when Conakry had 1.09 million people, and its latest counts are for 2006 to 2010; OnCo did not find a more recent published report. A health ministry news item on World Cancer Day, 4 February 2025, reported the coordinator of the national cancer programme saying that the cancer registry's data showed 840 new cases diagnosed and 595 deaths to date, without giving the period covered. The same item says cervical cancer is the commonest cancer in Guinea, with more than 2,000 cases and nearly 1,500 deaths a year, which differs from IARC's estimate above.",
          links: [
            { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
            { label: "Ministère de la Santé et de l'Hygiène publique: World Cancer Day, 4 February 2025 (in French)", url: MOH_WCD_2025 },
          ],
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
          note: "The latest figures on the registry's network page; OnCo found no more recent published report. A registry counts new cases, not deaths, and this one covers one city.",
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
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 44 per person in 2021, 53 in 2022 and 59 in 2023, and out-of-pocket spending of 53.5%, 54.1% and 54.4% of current health spending in those years. WHO's 2020 profile recorded the availability of opioids for pain relief, in defined daily doses per million people per day for 2015 to 2017, as 0. The World Bank's API did not answer on 16 November 2026; the same figures were re-read that day from WHO's Global Health Observatory API. The Ministry of Health's home page, read on 11 and 16 November 2026, carried no information on cancer services or their cost.",
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
          title: "The health ministry regulates medicines and trials; OnCo has not read its own texts",
          plain:
            "The US National Institutes of Health's ClinRegs profile of Guinea describes the Ministry of Health and Public Hygiene as the authority for marketing authorisation of medicines and for clinical trials. OnCo has not read the Guinean laws and decrees themselves, and no trial in OnCo's records lists a site in Guinea.",
          detail:
            "ClinRegs, in a section last reviewed on 8 January 2026, names two branches of the ministry in trial approval: the Comité National d'Ethique pour la Recherche en Santé (CNERS), which reviews and approves applications for studies in humans, and the Direction Nationale de la Pharmacie et du Médicament (DNPM), which is responsible for registering, authorising and importing medicines. ClinRegs notes that it has been unable to reach the DNPM's website since April 2025. This is a secondary account written for trial sponsors; it says nothing specific to cancer medicines, and a future pass should read the regulator's own texts in French.",
          links: [
            { label: "NIH ClinRegs: Guinea", url: CLINREGS },
            { label: "Ministère de la Santé et de l'Hygiène publique", url: MOH },
          ],
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
            "WHO's 2020 profile recorded cervical cancer screening in Guinea by visual inspection, offered to women who come forward rather than by invitation, with a defined referral system. WHO's immunisation database holds rows for HPV vaccination in Guinea but no coverage figures in them.",
          detail:
            "The profile lists, for 2019, cervical screening present, of the opportunistic type, by visual inspection; a breast cancer screening programme recorded as present; early detection guidelines for two of the four cancers it asks about; and no early detection guidelines or defined referral system for childhood cancer. Screening participation is given as under 10%. HPV vaccination coverage is marked not available for 2018. A query of WHO's immunisation data API for Guinea's HPV antigens on 16 November 2026 returned 44 rows for 2018 to 2025, every one with no doses and no coverage recorded. The health ministry's World Cancer Day item of 4 February 2025 thanks partners for support that includes the introduction of vaccines to prevent liver and cervical cancer; it gives no dates or coverage, and OnCo has not confirmed from another source whether HPV vaccination has started.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
            { label: "WHO: HPV vaccination coverage query for Guinea (data API, rows with no values)", url: WHO_HPV_API },
            { label: "Ministère de la Santé et de l'Hygiène publique: World Cancer Day, 4 February 2025 (in French)", url: MOH_WCD_2025 },
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
          title: "The registry's account: no radiotherapy in the country, patients sent to Dakar; none listed by IAEA",
          plain:
            "The Conakry registry's description of its setting says there is no radiotherapy service in Guinea and that patients are sent to Dakar, in Senegal, for treatment, and that there is little specialised oncology apart from a department of oncological surgery and gynaecological oncology at Donka. IAEA's directory of radiotherapy centres lists none in Guinea.",
          detail:
            "This comes from the registry's page on the African Cancer Registry Network, which is not dated and should not be read as current on its own. IAEA's DIRAC directory publishes its equipment data openly: read on 16 November 2026, its 8,627 rows covered 157 countries and none was for Guinea, while Senegal had three centres, two in Dakar and one in Touba. A directory can lag behind a newly opened centre, so this is what DIRAC lists and not proof that nothing exists. WHO's 2020 profile gives no figure for radiotherapy machines in Guinea.",
          links: [
            { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: DIRAC_DATA },
            { label: "WHO: Cancer Country Profile 2020, Guinea (PDF)", url: WHO_PROFILE },
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
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026 and again on 16 November: no trial record lists Guinea. Research from the country that OnCo knows of is the registry's own work, including its 1997 paper on incidence in Conakry from 1992 to 1995, cited on its network page, which also says results for 1996 to 1999 appeared in the book Cancer in Africa.",
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
        "OnCo did not find a recent published report from the Conakry registry, the text of a national cancer plan, the medicines regulator's own rules, or any source on what public schemes pay for cancer care, and could not confirm from a Guinean source whether radiotherapy is now available.",
      detail:
        "OnCo's web searches ran out during this wave, and the Ministry of Health's home page carried nothing on cancer. The ministry's World Cancer Day item of February 2025 shows that a national cancer programme exists, but OnCo has not read a plan document. The regulator is described here only through NIH ClinRegs. IAEA's directory lists no radiotherapy centre in Guinea, which is not the same as a statement from the country. A future pass should look for the national cancer control plan, the regulator's texts, recent registry results (GICR, IARC), and the date of the HPV vaccine's introduction. None of these is described here from memory.",
      links: [
        { label: "Ministère de la Santé et de l'Hygiène publique", url: MOH },
        { label: "Ministère de la Santé et de l'Hygiène publique: World Cancer Day, 4 February 2025 (in French)", url: MOH_WCD_2025 },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: DIRAC_DATA },
      ],
    },
  ],
  institutions: ["registre-cancers-guinee", "hopital-national-donka", "guinea-ministry-of-health", "dnpm-guinea", "pnlcc-guinea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026: the African Cancer Registry Network's page for the Conakry registry, IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, and the World Bank's health expenditure series. A second pass on 16 November 2026 re-read each claim and added NIH ClinRegs, the health ministry's World Cancer Day item of 2025 and IAEA's public radiotherapy directory.",
  verify:
    "Much of what is known about cancer services in Guinea here comes from old or undated sources. Check with the Ministry of Health or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "African Cancer Registry Network: Registre des cancers de Guinée", url: AFCRN_GN },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guinea (PDF)", url: IARC_FACTSHEET },
  ],
};
