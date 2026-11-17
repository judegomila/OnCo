import type { CountryDive } from "@/data/country-dive";

/**
 * Somalia deep dive: the hand-written cards for /countries/so/ (wave 12). Somalia is a fragile, conflict-affected state
 * with very little published cancer data, so this page keeps to what international agencies publish and says where
 * nothing is known. Every figure was read from the raw text of its source on 11 November 2026, not from a summary of
 * it: IARC's GLOBOCAN 2024 fact sheet for Somalia, WHO's Cancer Country Profile 2020 for Somalia (PDF text), WHO's
 * immunisation data API and the World Bank's health expenditure series. OnCo's web searches ran out during this wave,
 * and the Ministry of Health's site carried nothing on cancer; each missing source is named under `gaps`. On 16 November
 * 2026 the ministry's page on the medicines regulatory authority and the IAEA DIRAC country table were read and added.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/706-somalia-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/som-2020.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SOM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=SO";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=SO";
const MOH = "https://moh.gov.so/";
const MOH_NMRA = "https://moh.gov.so/en/nmra/";
const DIRAC = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const CTGOV = "https://clinicaltrials.gov/search?country=Somalia&cond=cancer";

export const SO_DIVE: CountryDive = {
  iso2: "SO",
  iso3: "SOM",
  name: "Somalia",
  flag: "🇸🇴",
  asOf: "2026-11-11",
  title: "Cancer in Somalia",
  description:
    "Cancer in Somalia from international sources: IARC's estimate of 9,983 new cancers and 6,155 deaths in 2024, built from neighbouring countries' rates, breast and cervical cancer leading, no radiotherapy and no cancer management guidelines in WHO's 2020 profile, health spending of about USD 22 a person, no HPV vaccination figures at WHO, and no trial in OnCo's records with a site in Somalia.",
  lede:
    "WHO's 2020 profile had no information on a population-based cancer registry in Somalia and recorded no coverage of death registration, and IARC's cancer figures for the country are estimates borrowed from its neighbours. WHO's 2020 profile recorded no radiotherapy and no cancer management guidelines. Breast and cervical cancer are estimated to be the commonest cancers.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Somalia is 9,983 new cancers and 6,155 deaths, an age-standardised incidence of 103.6 per 100,000 (84.2 in men, 122.8 in women). IARC's fact sheet gives its incidence method as rates based on incidence estimates or registry data from neighbouring countries, with mortality as national incidence applied to modelled mortality-to-incidence ratios. WHO's 2020 profile adds that the incidence estimates have a high degree of uncertainty because they are not based on a population-based registry, and the mortality estimates because they are not based on any national NCD mortality data. Read these numbers as a rough scale, not a count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Somalia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Somalia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 10,000 new cancers a year by IARC's estimate, nearly two thirds in women",
          plain:
            "IARC estimates 9,983 new cancers in Somalia in 2024, 6,325 of them in women, and 6,155 cancer deaths. Breast cancer is estimated to be the commonest and deadliest, followed by cervical, colorectal and prostate cancer and cancer of the oesophagus.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,979 breast cancers (930 deaths), 1,089 cervical cancers (665 deaths), 781 colorectal cancers (442 deaths), 734 prostate cancers (445 deaths) and 450 oesophageal cancers (416 deaths). The risk of developing a cancer before age 75 is 11.2%, and an estimated 14,392 people are living within five years of a diagnosis. WHO's 2020 profile estimated 986 cancers a year in children aged 0 to 14. All of these are modelled from other countries' rates, as the note below explains.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Somalia (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "no-data",
          title: "No registry on record and no death registration coverage",
          plain:
            "WHO's 2020 profile recorded no information on a population-based cancer registry in Somalia and no coverage of death registration.",
          detail:
            "The profile lists, for 2019, the availability of a population-based registry as \"no information\" and the quality of mortality registration for 2007 to 2016 as \"no coverage\". Its footnotes say the incidence estimates have a high degree of uncertainty because they are not based on a population-based registry, and the mortality estimates because they are not based on any national NCD mortality data. IARC's 2024 fact sheet uses neighbouring countries' rates.",
          links: [{ label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE }],
        },
      ],
      tables: [
        {
          id: "so-globocan-sites",
          title: "The five commonest cancers in Somalia, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1979, deaths: 930 },
            { site: "Cervix uteri", cases: 1089, deaths: 665 },
            { site: "Colorectum", cases: 781, deaths: 442 },
            { site: "Prostate", cases: 734, deaths: 445 },
            { site: "Oesophagus", cases: 450, deaths: 416 },
          ],
          note: "OnCo found no Somali registry figures to set beside these. They are estimates with a high degree of uncertainty.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Somalia (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "spending",
          title: "About USD 22 a person on health in 2023",
          plain:
            "Somalia spent about 22 US dollars a person on health in 2023, according to WHO's health expenditure figures, and households paid 30.8% of it out of pocket. OnCo found no source on what, if anything, public or donor-funded schemes cover for cancer.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 15 per person in 2021, 16 in 2022 and 22 in 2023, and out-of-pocket spending of 41.5%, 40.7% and 30.8% of current health spending in those years. These figures cover all health care; the source does not explain the fall in the out-of-pocket share in 2023, and OnCo does not guess at the reason. WHO's 2020 profile recorded the availability of opioids for pain relief, in defined daily doses per million people per day for 2015 to 2017, as 0.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Somalia", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Somalia", url: WB_CHE },
            { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
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
          title: "Somalia's health ministry says the country has no medicines regulator yet",
          plain:
            "The Federal Ministry of Health's own page says Somalia does not currently have a national medicines regulatory authority carrying out regulatory functions, so no national body evaluates or registers medicines, cancer medicines included. A bill to create one was endorsed by the cabinet in 2019. No trial in OnCo's records lists a site in Somalia.",
          detail:
            "The ministry's page on the National Medicine Regulatory Authority, read on 16 November 2026 (the page carries no date), says: \"Currently Somalia does not have a National Medicines Regulatory Authority (NMRA) that is responsible for performing regulatory functions. However, a bill has been developed and endorsed by the cabinet of ministries in 2019 but there are no adequate national guidelines (GLs) for pharmaceutical inspection, product evaluation and registration, import and export control, licensing and inspection of pharmaceutical establishments, post-marketing surveillance and pharmacovigilance.\" The same page says the public supply of medicines has depended on donors since 1991 and covers about 30% of the country's needs, with the remaining 70% met by private importers and pharmacies \"operating without any regulatory framework\", citing the National Medicines Policy of 2014. OnCo did not find whether the 2019 bill has since become law, and the page says nothing specific to cancer medicines or to the authorisation of clinical trials.",
          links: [
            { label: "Federal Ministry of Health, Somalia: National Medicine Regulatory Authority (NMRA)", url: MOH_NMRA },
            { label: "Federal Ministry of Health and Human Services, Somalia", url: MOH },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
      cards: [
        {
          id: "screening-2020",
          title: "What WHO recorded in 2020, and no HPV vaccination figures",
          plain:
            "WHO's 2020 profile recorded cervical screening by Pap smear and a breast screening programme as present in Somalia in 2019, with the type of cervical screening programme unknown, and no early detection guidelines for any of the four cancers WHO asks about. WHO's immunisation database holds no HPV vaccination coverage figures for Somalia.",
          detail:
            "The profile's answers for 2019 list cervical screening present, programme type \"don't know\", method Pap smear; a breast cancer screening programme present; early detection guidelines for 0 of 4 cancers; and a defined referral system for childhood cancer. They do not say how many women were screened or where, and OnCo found no source that does. HPV vaccination coverage is marked not available for 2018, and a query of WHO's immunisation data API for Somalia's HPV programme coverage on 11 November 2026 returned no rows.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
            { label: "WHO: HPV vaccination coverage query for Somalia (data API, no rows)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Somalia",
      cards: [
        {
          id: "no-radiotherapy",
          title: "No radiotherapy and no cancer management guidelines in WHO's 2020 profile",
          plain:
            "WHO's 2020 profile recorded no external beam radiotherapy in Somalia, \"n/a\" for a national cancer control plan, no cancer management guidelines, and community or home-based palliative care generally not available. Pathology services were recorded as generally available.",
          detail:
            "The profile's health system page gives external beam radiotherapy machines for 2019 as 0.0 per 10,000 cancer patients, PET scanners and nuclear medicine physicians as 0, the national cancer control plan and integrated NCD plan as \"n/a\", cancer management guidelines as absent, and no staff in the Ministry of Health dedicating a significant share of their time to cancer. These are answers for 2019 and 2020; OnCo did not find a more recent authoritative account, and does not speculate about what has changed since. The IAEA's Directory of Radiotherapy Centres (DIRAC) agrees as far as it goes: its public country table, read through its data service on 16 November 2026, has rows for 155 countries and territories and none for Somalia. That is the absence of an entry in a directory built from what countries and centres report, not proof that no machine exists.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
            { label: "IAEA DIRAC: countries and regions table (JSON)", url: DIRAC },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Somalia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Somalia",
          plain:
            "None of the trials in OnCo's records lists Somalia among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: no trial record lists Somalia. OnCo has not yet read hospital-based studies of cancer in Somalia; a future pass should look for them through Europe PMC and record them only with their identifiers resolved.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in Somalia", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find a national cancer plan, a hospital cancer registry report, any source on where cancer is treated in Somalia today, or arrangements in Somaliland and Puntland. It describes none of these from memory.",
      detail:
        "OnCo's web searches ran out during this wave, and the Federal Ministry of Health and Human Services' home page carried nothing on cancer. Two sources this page first listed as unread have since been read, on 16 November 2026: the ministry's page on medicines regulation, which says Somalia has no functioning regulator yet, and the IAEA's DIRAC country table, which has no entry for Somalia. A future pass should look for WHO Eastern Mediterranean Region reports on Somalia, hospital-based studies through Europe PMC, and WHO's updated country profile.",
      links: [
        { label: "Federal Ministry of Health and Human Services, Somalia", url: MOH },
        { label: "IAEA DIRAC: countries and regions table (JSON)", url: DIRAC },
      ],
    },
  ],
  institutions: ["who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from international public sources read as raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, and the World Bank's health expenditure series; and, on 16 November 2026, the Federal Ministry of Health's page on the medicines regulatory authority and the IAEA's DIRAC country table. No Somali national cancer source was found.",
  verify:
    "Every number on this page is a modelled estimate, a spending figure, or a survey answer from 2019 or 2020. Anyone seeking care should ask the treating hospital or WHO's country office what is available now.",
  verifyLinks: [
    { label: "WHO: Cancer Country Profile 2020, Somalia (PDF)", url: WHO_PROFILE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Somalia (PDF)", url: IARC_FACTSHEET },
  ],
};
