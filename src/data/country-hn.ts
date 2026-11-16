import type { CountryDive } from "@/data/country-dive";

/**
 * Honduras deep dive: the hand-written cards for /countries/hn/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it, in Spanish where the source is Spanish: IARC's GLOBOCAN 2024
 * fact sheet for Honduras, WHO's Cancer Country Profile 2020 for Honduras (PDF text), the Agencia de Regulación
 * Sanitaria's home page, WHO's immunisation data API and the World Bank's health expenditure series. This page is thin:
 * OnCo's web searches ran out during the wave and the social security institute's site refused a script. Each missing
 * source is named under `gaps` rather than filled from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/340-honduras-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/hnd-2020.pdf";
const ARSA = "https://arsa.gob.hn/";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'HND'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=HN";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=HN";
const CTGOV = "https://clinicaltrials.gov/search?country=Honduras&cond=cancer";

export const HN_DIVE: CountryDive = {
  iso2: "HN",
  iso3: "HND",
  name: "Honduras",
  flag: "🇭🇳",
  asOf: "2026-11-11",
  title: "Cancer in Honduras",
  description:
    "Cancer in Honduras: IARC's estimate of 10,722 new cancers and 6,509 deaths in 2024, built on a subnational registry, breast, prostate, leukaemia and cervical cancer leading, no national screening programme for breast or cervical cancer in WHO's 2020 profile, HPV vaccination of girls at 73% in 2025, more than half of health spending paid out of pocket, and no trial in OnCo's records with a site in Honduras.",
  lede:
    "IARC estimates about 10,700 new cancers a year in Honduras, with breast, prostate and cervical cancer and leukaemia among the commonest. WHO's 2020 profile recorded no breast or cervical screening programme and no answer on a national cancer plan, and households pay more than half of all health spending themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Honduras is 10,722 new cancers and 6,509 deaths, an age-standardised incidence of 128.5 per 100,000 (132.8 in men, 128.6 in women). IARC's fact sheet gives its incidence source as a subnational registry, with subnational rates applied to the 2024 population, and mortality as national incidence applied to modelled mortality-to-incidence ratios. WHO's 2020 profile recorded a population-based registry and rated the quality of Honduras's mortality registration as very low, with a footnote that the mortality estimates are highly uncertain. OnCo did not identify or read the subnational registry's own reports; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Honduras",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Honduras (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 10,700 new cancers a year; breast cancer first, then prostate and leukaemia",
          plain:
            "IARC estimates 10,722 new cancers in Honduras in 2024, 5,825 of them in women, and 6,509 cancer deaths. Breast cancer is the commonest, followed by prostate cancer, leukaemia, cervical cancer and thyroid cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,214 breast cancers (560 deaths), 852 prostate cancers (521 deaths), 848 leukaemias (542 deaths), 826 cervical cancers (495 deaths) and 773 thyroid cancers (121 deaths). The risk of developing a cancer before age 75 is 13.5%, and an estimated 23,613 people are living within five years of a diagnosis. WHO's 2020 profile estimated 443 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Honduras (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Honduras (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
      tables: [
        {
          id: "hn-globocan-sites",
          title: "The five commonest cancers in Honduras, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1214, deaths: 560 },
            { site: "Prostate", cases: 852, deaths: 521 },
            { site: "Leukaemia", cases: 848, deaths: 542 },
            { site: "Cervix uteri", cases: 826, deaths: 495 },
            { site: "Thyroid", cases: 773, deaths: 121 },
          ],
          note: "Estimates built on a subnational registry's rates, not national counts. The registry's own figures are a gap on this page.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Honduras (PDF)", url: IARC_FACTSHEET }],
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
          title: "More than half of health spending is paid out of pocket",
          plain:
            "Honduras spent about 249 US dollars a person on health in 2023, and households paid 53.1% of it out of their own pockets, according to WHO's health expenditure figures. OnCo did not read what the Ministry of Health or the social security institute covers for cancer.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives out-of-pocket spending of 51.7% of current health spending in 2021, 52.3% in 2022 and 53.1% in 2023, and current health spending per person of USD 254, 245 and 249. These figures cover all health care. WHO's 2020 profile recorded the availability of opioids for pain relief, in defined daily doses per million people per day for 2015 to 2017, as 51. The Instituto Hondureño de Seguridad Social's website refused a script on 11 November 2026; see the gaps.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Honduras", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Honduras", url: WB_CHE },
            { label: "WHO: Cancer Country Profile 2020, Honduras (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Agencia de Regulación Sanitaria",
      aside: { label: "Agencia de Regulación Sanitaria (ARSA)", url: ARSA },
      cards: [
        {
          id: "arsa",
          title: "ARSA regulates medicines and has a clinical trials section",
          plain:
            "Medicines in Honduras are regulated by the Agencia de Regulación Sanitaria (ARSA), whose website has sections on pharmaceutical products, clinical trials and a national pharmacovigilance centre. In July 2026 it reported work with experts from SE-COMISCA to strengthen pharmacovigilance in the region.",
          detail:
            "ARSA's home page, read in Spanish on 11 November 2026, lists services for pharmaceutical products, clinical trials, surveillance and inspection, donations and special authorisations, and a Centro Nacional de Farmacovigilancia, and carries news of 28 and 29 July 2026 on work with SE-COMISCA experts on pharmacovigilance and with UNAH on the pharmaceutical sector, naming Dr Leonardo A. Sánchez as its Comisionado Presidente. OnCo did not read ARSA's registration or trial authorisation rules, so this page says nothing about approval routes or times.",
          links: [{ label: "Agencia de Regulación Sanitaria (ARSA): home page", url: ARSA }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Honduras (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv-screening",
          title: "HPV vaccination at 73% of girls; no national screening programme in 2019",
          plain:
            "WHO's data give 73% of girls in Honduras a first and a last dose of HPV vaccine in 2025, and its series has coverage from 2016. WHO's 2020 profile recorded no cervical screening programme and no breast screening programme in 2019, and no early detection guidelines or defined referral system for childhood cancer.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females of 74% (first dose) and 59% (last dose) in 2023, 72% and 72% in 2024, and 73% and 73% in 2025; WHO's 2020 profile gave 60.6% for 2018. The profile lists, for 2019: cervical screening programme, no; breast screening programme, no; early detection guidelines for one of four cancers; an integrated NCD plan under development; and for childhood cancer, no early detection guidelines and no defined referral system. These are answers for 2019 and may have changed.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Honduras (data API)", url: WHO_HPV_API },
            { label: "WHO: Cancer Country Profile 2020, Honduras (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Honduras",
      cards: [
        {
          id: "leukaemia",
          title: "Leukaemia is the third commonest cancer in IARC's estimate",
          plain:
            "In IARC's 2024 estimate, leukaemia is the third commonest cancer in Honduras, with 848 new cases and 542 deaths, and thyroid cancer is fifth. IARC built these figures from a subnational registry's rates.",
          detail:
            "The GLOBOCAN 2024 fact sheet puts leukaemia at 7.9% of new cancers and 8.3% of cancer deaths in Honduras, and thyroid cancer at 7.2% of new cancers but 1.9% of deaths. OnCo has not read an explanation of the leukaemia figure from a Honduran or international source, and does not offer one; it notes only that the estimate rests on one registry's rates applied to the whole population.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Honduras (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Honduras", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Honduras",
          plain:
            "None of the trials in OnCo's records lists Honduras among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search. ARSA's website has a section on clinical trials.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: no trial record lists Honduras. That is a statement about OnCo's selection, not a finding that no cancer trial has run in Honduras. ARSA's site has a clinical trials section that OnCo has not yet read.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Honduras", url: CTGOV },
            { label: "Agencia de Regulación Sanitaria (ARSA): home page", url: ARSA },
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
        "OnCo did not identify which subnational registry IARC used, or read its reports; did not read the Ministry of Health's cancer programmes, the social security institute's cancer coverage, or a count of radiotherapy machines; and did not read the cancer centres in Tegucigalpa and San Pedro Sula from their own sources.",
      detail:
        "OnCo's web searches ran out during this wave. The Instituto Hondureño de Seguridad Social's site (ihss.hn) answered 403 on 11 November 2026. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries. None of these is described here from memory.",
      links: [
        { label: "Instituto Hondureño de Seguridad Social", url: "https://www.ihss.hn/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["arsa-honduras"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: ["leonardo-a-sanchez"],
  how:
    "Every card was written from public sources read as raw text on 11 November 2026, in Spanish where the source is Spanish: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 country profile and immunisation data, ARSA's home page and the World Bank's health expenditure series.",
  verify:
    "WHO's profile describes 2019; check with the Secretaría de Salud for current screening and cancer services.",
  verifyLinks: [
    { label: "WHO: Cancer Country Profile 2020, Honduras (PDF)", url: WHO_PROFILE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Honduras (PDF)", url: IARC_FACTSHEET },
  ],
};
