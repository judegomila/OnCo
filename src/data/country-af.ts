import type { CountryDive } from "@/data/country-dive";

/**
 * Afghanistan deep dive: the hand-written cards for /countries/af/ (wave 8). Afghanistan is a fragile, conflict-affected
 * state, and this page keeps to dated facts from IARC, WHO and peer-reviewed papers. Every figure was read from the raw
 * text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Afghanistan;
 * two papers found and resolved through Europe PMC with their abstracts read (the Kabul Cancer Registry's first report,
 * and a cancer control capacity assessment); and WHO's immunisation and health expenditure data from its public APIs.
 * OnCo read no primary source from an Afghan authority and says nothing about the country's politics or governance.
 * Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/4-afghanistan-fact-sheet.pdf";
const KCR = "https://doi.org/10.1002/cam4.70844";
const CAPACITY = "https://doi.org/10.1002/ijc.70431";
const LANCET_WOMEN = "https://doi.org/10.1016/S1470-2045(26)00343-8";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'AFG'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'AFG'";
const CTGOV = "https://clinicaltrials.gov/search?country=Afghanistan&cond=cancer";

export const AF_DIVE: CountryDive = {
  iso2: "AF",
  iso3: "AFG",
  name: "Afghanistan",
  flag: "🇦🇫",
  asOf: "2026-11-11",
  title: "Cancer in Afghanistan",
  description:
    "Cancer in Afghanistan from IARC, WHO and peer-reviewed sources: IARC's modelled estimate of 26,268 new cancers and 15,848 deaths in 2024; the Kabul Cancer Registry, the country's first population registry, founded in 2018; an assessment finding no national cancer plan, no screening programme and no radiotherapy; out-of-pocket payments at 77% of health spending; no HPV vaccination in WHO's data; and what could not be verified.",
  lede:
    "IARC estimates 26,268 new cancers and 15,848 cancer deaths in Afghanistan in 2024, modelled from neighbouring countries. The first population-based figures come from the Kabul Cancer Registry, set up in 2018. A capacity assessment published in 2026, with site visits in 2021, found no national cancer control plan, no screening programmes and no radiotherapy facilities, and WHO estimates that households pay about three quarters of health spending themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Afghanistan is 26,268 new cancers and 15,848 deaths, an age-standardised incidence of 119.0 per 100,000 (127.4 in men, 115.4 in women) and mortality of 78.4. IARC's fact sheet gives no country-specific data source for incidence and describes the method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence applied to modelled mortality-to-incidence ratios. The Kabul Cancer Registry's own rates for 2018 to 2020 are much lower, 44.3 per 100,000 men and 60.9 per 100,000 women on the same world standard, and its authors call for the registry's data quality to be strengthened. Neither figure can show how many cancers in Afghanistan go undiagnosed.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Afghanistan",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Afghanistan (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 26,000 new cancers a year in IARC's model, with breast and stomach cancer leading",
          plain:
            "IARC estimates 26,268 new cancers in Afghanistan in 2024, 14,217 in women and 12,051 in men. Breast cancer is the commonest cancer, then stomach and colorectal cancer; breast, stomach and lung cancer cause the most deaths. These figures are modelled, not counted.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,342 breast cancers (1,868 deaths), 1,913 stomach cancers (1,583 deaths), 1,882 colorectal cancers, 1,333 leukaemias, 1,302 brain and nervous system cancers and 1,241 lung cancers (1,082 deaths). In men the commonest are stomach, colorectal and prostate cancer; in women breast, colorectal and cervical cancer. An estimated 43,539 people are living within five years of a diagnosis. Deaths divided by new cases give 0.60. Because IARC's rates for Afghanistan come from neighbouring countries, they show what cancer would look like if Afghanistan resembled its neighbours, not what has been measured there.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Afghanistan (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "kcr-2018-2020",
          title: "What the Kabul Cancer Registry counted, 2018 to 2020",
          caption: "Age-standardised incidence per 100,000 (world standard), Kabul residents, 2018 to 2020, five commonest sites by sex",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "rate", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Men", site: "All cancers", rate: 44.3 },
            { sex: "Men", site: "Stomach", rate: 9.1 },
            { sex: "Men", site: "Oesophagus", rate: 5.5 },
            { sex: "Men", site: "Colorectum", rate: 3.7 },
            { sex: "Men", site: "Lymphoma", rate: 2.4 },
            { sex: "Women", site: "All cancers", rate: 60.9 },
            { sex: "Women", site: "Breast", rate: 14.9 },
            { sex: "Women", site: "Oesophagus", rate: 6.7 },
            { sex: "Women", site: "Stomach", rate: 4.2 },
            { sex: "Women", site: "Colorectum", rate: 3.8 },
          ],
          note: "4,498 new cancers among Kabul residents over three years. Kabul only; the registry's first years.",
          sources: [{ label: "Abdullah et al., cancer incidence in Kabul: first report of the population-based registry (Cancer Med 2025)", url: KCR }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A first population registry, in Kabul",
      cards: [
        {
          id: "kabul-registry",
          title: "The Kabul Cancer Registry, from 2018",
          plain:
            "Afghanistan's first population-based cancer registry was set up in Kabul in 2018. In its first three years it recorded 4,498 new cancers among Kabul residents, with breast cancer the commonest in women and stomach cancer in men, and oesophageal cancer second in both.",
          detail:
            "The registry's first report, published in 2025 by authors including staff of the Ministry of Public Health in Kabul and of Harvard's School of Public Health, says it follows IARC standards, actively collects new cases from health facilities in Kabul and uses IARC's CanReg5 software. The male-to-female ratio of cases was 0.82 to 1. Children aged 0 to 14 had 6.8% of the cancers, and leukaemia was 43.5% of childhood cancers. The authors conclude that the high incidence of breast, stomach and oesophageal cancer calls for cancer control focused on prevention, early detection and quality diagnosis and treatment, and that the registry needs strengthening to improve data quality. A further paper from the registry describes gastric cancer in 2018 to 2020; only its title was used here.",
          links: [
            { label: "Abdullah et al. (Cancer Med 2025)", url: KCR },
            { label: "The descriptive epidemiology of gastric cancer in Afghanistan, population-based registry 2018 to 2020 (2026)", url: "https://doi.org/10.1007/s10120-026-01734-x" },
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
          title: "Households pay about three quarters of health spending",
          plain:
            "WHO estimates that out-of-pocket payments were 77.1% of Afghanistan's current health expenditure in 2023, the highest of the nine countries in this wave of OnCo's country pages that have a WHO figure. A 2026 assessment found limited access to essential cancer medicines.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 77.2% of current health expenditure in 2021, 77.9% in 2022 and 77.1% in 2023. The cancer control capacity assessment, using the WHO and IAEA self-assessment tool with site visits to 12 public and 5 private facilities in June and July 2021 and review continuing to January 2025, found diagnostic and treatment services concentrated in cities, with limited access to essential medicines, radiology, pathology and systemic therapies. OnCo read no primary source on what an Afghan patient pays for cancer care or which cancer medicines are provided free.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Afghanistan (API)", url: WHO_GHED_API },
            { label: "Abdullah et al., cancer care in Afghanistan: opportunities and challenges (Int J Cancer 2026)", url: CAPACITY },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Medicines",
      title: "Medicines and their regulation",
      cards: [
        {
          id: "medicines-gap",
          title: "No primary source read on how medicines are approved",
          plain:
            "OnCo did not read a primary source from Afghanistan's medicines authority, so this page does not describe how a cancer medicine is approved there. The 2026 assessment found access to essential medicines and systemic therapies limited.",
          detail:
            "The capacity assessment reports limited access to essential medicines and systemic therapies, and names expanding treatment infrastructure among its priorities. No trial in OnCo's records lists a site in Afghanistan. A reader should ask the treating hospital which medicines are available.",
          links: [{ label: "Abdullah et al. (Int J Cancer 2026)", url: CAPACITY }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "no-programmes",
          title: "No screening programmes and no HPV vaccination in WHO's data",
          plain:
            "The 2026 capacity assessment found no established programmes for cancer screening and early detection in Afghanistan. WHO's immunisation data hold no HPV vaccination coverage for Afghanistan in any year.",
          detail:
            "The assessment found no screening or early detection programmes. WHO's public immunisation data, queried for HPV programme coverage for Afghanistan on 11 November 2026, returned no rows, while they return rows for every other country in this wave except North Korea. IARC estimates 790 cervical cancers and 456 cervical cancer deaths in Afghanistan in 2024. In 2026 The Lancet Oncology published a piece titled \"Afghan women's cancer crisis deserves its own response\"; only its title and authors were read, as it has no abstract.",
          links: [
            { label: "Abdullah et al. (Int J Cancer 2026)", url: CAPACITY },
            { label: "WHO immunisation data: HPV programme coverage, Afghanistan (API; returns no rows)", url: WHO_HPV_API },
            { label: "Nasari et al., Afghan women's cancer crisis deserves its own response (Lancet Oncol 2026)", url: LANCET_WOMEN },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Capacity",
      title: "What the capacity assessment found",
      cards: [
        {
          id: "capacity",
          title: "No national plan, no radiotherapy, almost no palliative care",
          plain:
            "A 2026 assessment of Afghanistan's cancer control capacity found no national cancer control plan, no radiotherapy facilities and palliative care services that were nearly non-existent. Its authors name a national plan, wider diagnosis and treatment, palliative care and workforce as the priorities.",
          detail:
            "The assessment used the WHO and IAEA National Cancer Control Programmes Core Capacity Self-Assessment Tool. A team of nine experts visited 12 public and 5 private facilities in June and July 2021, followed by a questionnaire survey and desk and literature review to January 2025. It found services concentrated in cities, limited radiology, pathology and systemic therapy, no radiotherapy and almost no palliative care. Its immediate priorities are finalising and implementing a national cancer control plan, expanding diagnostic and treatment infrastructure, integrating palliative care and strengthening the workforce, and it calls for international investment and technical assistance.",
          links: [{ label: "Abdullah et al. (Int J Cancer 2026)", url: CAPACITY }],
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
          title: "No trial in OnCo's records has a site in Afghanistan",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Afghanistan. OpenAlex counts 27 oncology papers with an Afghanistan-based author in 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and none lists Afghanistan; that reflects the trials OnCo holds, not every study. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Afghanistan 10 works in 2021, 9 in 2022, 18 in 2023, 8 in 2024 and 27 in 2025, 72 in total, of which 64 are open access. Recent published work from Afghanistan includes the Kabul registry's reports, studies of oesophageal and gastric cancer at a Kabul referral centre, and quality of life among cancer patients at Herat Regional Hospital (titles only read).",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Afghanistan (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "official-sources",
      title: "No official Afghan source read",
      plain:
        "OnCo read no primary source from an Afghan authority on cancer services, medicines, payment or screening. This page relies on IARC, WHO's data and peer-reviewed papers, and does not describe government policy.",
      detail:
        "WHO's Afghanistan country pages were reached but were not read for cancer services. The capacity assessment's site visits took place in mid-2021, so services may have changed; its review ran to January 2025. The number of oncologists and other cancer staff in Afghanistan was not found in a primary source.",
      links: [{ label: "Abdullah et al. (Int J Cancer 2026)", url: CAPACITY }],
    },
    {
      id: "unread-sources",
      title: "Counts outside Kabul and survival",
      plain:
        "The registry's first report counts Kabul residents only, and there is no survival figure on this page. A 2026 registry paper reports gastric cancer rates for eight regions of Afghanistan; OnCo has read only its abstract. IARC's national numbers are modelled from neighbouring countries.",
      detail:
        "Only the abstracts of the registry and capacity papers were read, and only titles for the other papers named. The IAEA's DIRAC radiotherapy database was not read; the statement that radiotherapy is absent comes from the 2026 assessment.",
      links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Afghanistan (PDF)", url: IARC_FACTSHEET }],
    },
  ],
  institutions: ["kabul-cancer-registry", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-abdullah-kabul-cancer-registry-first-report-cam4-2025"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the abstracts of two papers found through Europe PMC (and titles only where marked); and WHO's HPV coverage and health expenditure data from its public APIs. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Kabul Cancer Registry and its first report) carry their own sources.",
  verify:
    "Services, medicines and costs in Afghanistan may have changed since the assessment's site visits in 2021. Ask the treating hospital what is available, and ask humanitarian health organisations working locally where cancer care can be reached.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Afghanistan (PDF)", url: IARC_FACTSHEET },
    { label: "WHO: Afghanistan", url: "https://www.who.int/countries/afg" },
  ],
};
