import type { CountryDive } from "@/data/country-dive";

/**
 * Moldova deep dive: the hand-written cards for /countries/md/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it, in Romanian where the source is Romanian: the Ministry of
 * Health's explanatory note to the draft National Cancer Control Programme 2026 to 2030 and its 2024 draft action plan
 * for 2024 and 2025 (both PDF text, from the government's consultation portal), WHO's Cancer Country Profile 2020 for
 * Moldova (PDF text), WHO's HPV coverage rows from its public immunisation data API, the World Bank's out-of-pocket
 * series, the medicines agency's home page and IARC's GLOBOCAN 2024 fact sheet. Where a figure could not be read it is
 * named under `gaps`.
 */
const NOTE_2026 = "https://particip.gov.md/ro/download_attachment/42373";
const PLAN_2024 = "https://particip.gov.md/ro/download_attachment/22387";
const CONSULT_2026 = "https://particip.gov.md/ro/document/stages/anunt-privind-consultarea-publica-a-proiectului-elaborarii-programului-national-de-control-al-cancerului-pentru-anii-20262030/15643";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mda-2020.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/498-republic-of-moldova-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MDA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=MD";
const AMDM = "https://amdm.gov.md/";
const CTGOV = "https://clinicaltrials.gov/search?country=Moldova&cond=cancer";

export const MD_DIVE: CountryDive = {
  iso2: "MD",
  iso3: "MDA",
  name: "Moldova",
  flag: "🇲🇩",
  asOf: "2026-11-11",
  title: "Cancer in Moldova",
  description:
    "Cancer in Moldova from Moldovan sources: 11,238 new cancers registered in 2024 and more than 5,900 deaths a year, a draft National Cancer Control Programme for 2026 to 2030 costed at about 2.6 billion lei and tied to EU accession, IARC's 2024 estimate built without national incidence data, HPV vaccination of girls at 43% against a 60% target, and 22 trials in OnCo's records with a site in Moldova.",
  lede:
    "Cancer is the second commonest cause of death in Moldova, with more than 5,900 deaths a year in 2023 and 2024. The Ministry of Health says about half of cancers are found late and specialised treatment is concentrated in Chișinău, and it has drafted a new cancer programme for 2026 to 2030 with WHO, IARC and IAEA advice.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Moldova is 11,349 new cancers and 6,141 deaths, an age-standardised incidence of 225.4 per 100,000 (282.9 in men, 192.8 in women). IARC's fact sheet gives the country-specific source for incidence as \"no data\", with national mortality estimates applied to modelled mortality-to-incidence ratios, and mortality from WHO's national data projected to 2024. Moldova does register cancers: the Ministry of Health's 2026 note gives 11,238 new cases registered in 2024, very close to IARC's estimate, but IARC did not use them as an incidence source, and the Ministry's own programme aims to bring the National Cancer Registry up to IARC and European Network of Cancer Registries standards. Neither source says whether the counts include the Transnistrian region, which OnCo could not establish.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Moldova",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Moldova (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 11,000 new cancers a year; colorectal cancer first, lung cancer the deadliest",
          plain:
            "IARC estimates 11,349 new cancers in Moldova in 2024 and 6,141 deaths. Colorectal cancer is the commonest, then breast, lung, prostate and stomach cancer. Lung cancer causes the most deaths, and men die of cancer at more than twice the rate of women once age is taken into account.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,785 colorectal cancers (935 deaths), 1,459 breast cancers (516 deaths), 1,025 lung cancers (959 deaths), 909 prostate cancers (298 deaths) and 499 stomach cancers (422 deaths), with age-standardised mortality of 167.6 per 100,000 in men and 74.8 in women. The risk of developing a cancer before age 75 is 23.3%, and an estimated 28,151 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Moldova (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "registered",
          title: "11,238 new cancers registered in 2024, up from 9,480 in 2015",
          plain:
            "The Ministry of Health counts 11,238 new cancers registered in 2024 and 10,552 in 2023, against 9,480 in 2015, and 71,789 people living with cancer in 2024. It says cancers are found late in about half of cases, and expects the burden to grow as the population shrinks and ages.",
          detail:
            "The explanatory note to the draft National Cancer Control Programme 2026 to 2030 gives more than 5,900 cancer deaths a year in 2023 and 2024, prevalence of 68,732 cases in 2023 and 71,789 in 2024, and new cases of 10,552 in 2023 and 11,238 in 2024, up from 9,480 primarily registered in 2015. It names as causes high prevalence of smoking, alcohol and low fruit and vegetable consumption, environmental factors, falling HPV and hepatitis B vaccination, late detection in about half of cases, the concentration of specialised treatment in Chișinău, and limited capacity for prevention, diagnosis, treatment, rehabilitation and palliative care. It notes there is no database for childhood cancer.",
          links: [{ label: "Ministry of Health: explanatory note to the draft National Cancer Control Programme 2026 to 2030, section 2.2 (PDF, in Romanian)", url: NOTE_2026 }],
        },
      ],
      tables: [
        {
          id: "md-registered",
          title: "Cancer registered in Moldova, as the Ministry of Health reports it",
          caption: "New cases and prevalent cases by year, from the explanatory note to the draft programme for 2026 to 2030.",
          columns: [
            { key: "year", label: "Year" },
            { key: "newCases", label: "New cases registered", numeric: true },
            { key: "prevalence", label: "People living with cancer", numeric: true },
          ],
          rows: [
            { year: "2015", newCases: 9480, prevalence: null },
            { year: "2023", newCases: 10552, prevalence: 68732 },
            { year: "2024", newCases: 11238, prevalence: 71789 },
          ],
          note: "Counts of registered cases, not age-standardised rates. The note gives deaths only as more than 5,900 a year in 2023 and 2024. It does not say whether the Transnistrian region is included.",
          sources: [{ label: "Ministry of Health: explanatory note to the draft programme 2026 to 2030 (PDF, in Romanian)", url: NOTE_2026 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: compulsory health insurance and the state budget",
      cards: [
        {
          id: "funding",
          title: "The new cancer programme is costed at about 2.6 billion lei, 40% from development partners",
          plain:
            "The draft cancer programme for 2026 to 2030 is costed at 2.6 billion Moldovan lei. About a quarter is to come from the state budget, about a third from the compulsory health insurance funds, and about 40% from external sources such as EU funds. Across all health care, households paid 27.5% of spending out of pocket in 2023.",
          detail:
            "The explanatory note costs the programme at 2,595,058.6 thousand lei: 651,993.3 thousand from the state budget, 892,943.3 thousand from the compulsory health insurance funds (FAOAM) and 1,050,122.0 thousand from external sources and development partners, including EU programmes such as EU4Health and Horizon Europe. It says actions planned from external sources will be carried out only as far as money is actually raised, and that a missing external source does not automatically shift the cost to the state budget. Most of the money, 2,469,882.0 thousand lei, goes to the objective covering capital and technology investment in diagnosis and treatment. The note says a national list of essential cancer medicines, following WHO recommendations, has been approved, but that patients have limited access to innovative therapies such as targeted therapy and immunotherapy. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket spending at 27.5% of current health spending in 2023.",
          links: [
            { label: "Ministry of Health: explanatory note to the draft programme 2026 to 2030, sections 2.2 and 4.2 (PDF, in Romanian)", url: NOTE_2026 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Moldova", url: WB_OOP },
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
          id: "amdm",
          title: "The Medicines and Medical Devices Agency",
          plain:
            "Medicines in Moldova are regulated by the Agenția Medicamentului și Dispozitivelor Medicale (AMDM), the Medicines and Medical Devices Agency, in Chișinău. OnCo read only its home page for this page, so it states nothing about approval routes or timelines.",
          detail:
            "AMDM's home page (read 11 November 2026) carries notices on its meeting schedule, pharmaceutical market statistics and the 2026 #MedSafetyWeek campaign on reporting side effects. Its rules for registering medicines and authorising clinical trials were not read for this page. Twenty-two trials in OnCo's records list a site in Moldova (see research below), so cancer trials are authorised there.",
          links: [{ label: "Agenția Medicamentului și Dispozitivelor Medicale (AMDM)", url: AMDM }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Moldova (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination at 43% of girls, short of a 60% target",
          plain:
            "WHO's data give 43% of girls a first dose of HPV vaccine in 2025, down from 52% in 2023 and 2024. The Ministry of Health's 2024 action plan had set a target of more than 60% for 2025, from 39.9% in 2021, and its 2026 note lists falling HPV vaccination among the causes of Moldova's cancer burden.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females of 52% (first dose) and 42% (last dose) in 2023, 52% and 42% in 2024, and 43% and 43% in 2025; the series has non-zero coverage for Moldova from 2018. The draft action plan for 2024 and 2025 sets the share of children vaccinated with HPV vaccine at 39.9% in 2021 and a target above 60% in 2025, citing the National Immunisation Programme 2023 to 2027 approved by Government Decision 211/2023. WHO's Cancer Country Profile 2020 recorded cervical screening by Pap smear on an opportunistic basis, not by invitation, and a breast screening programme. The 2024 action plan includes a new standard for the early detection of breast cancer, updated standards for cervical and colorectal screening, a cervical screening register used by all providers, and a feasibility study on moving to HPV testing.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Moldova (data API)", url: WHO_HPV_API },
            { label: "Ministry of Health: draft action plan 2024 to 2025 for the National Cancer Control Programme (PDF, in Romanian)", url: PLAN_2024 },
            { label: "WHO: Cancer Country Profile 2020, Moldova (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Moldova does differently",
      cards: [
        {
          id: "eu-programme",
          title: "A cancer programme written to EU standards as part of accession",
          plain:
            "Moldova's next cancer programme, for 2026 to 2030, is a task in its national programme for joining the European Union and is aligned with Europe's Beating Cancer Plan. It was drafted by the Ministry of Health and the Oncological Institute after review missions by WHO, IARC, the IAEA and St. Jude Children's Research Hospital.",
          detail:
            "The explanatory note says the draft rests on action 64 of annex A, cluster 2, chapter 28 of the National Programme for Moldova's Accession to the European Union for 2025 to 2029, approved by Government Decision 306/2025, and follows the programme for 2016 to 2025 approved by Government Decision 1291/2016. It drew on imPACT missions held from 10 to 14 November 2025 and 23 to 27 January 2026 with experts from WHO, IARC, the IAEA and St. Jude. New in this programme are an objective on governance, a sub-objective on childhood cancer, and a National Cancer Registry run to IARC and European Network of Cancer Registries standards. The draft was validated by the Council for the Coordination of Sustainable Development on 14 May 2026. OnCo has not confirmed whether the government has adopted it.",
          links: [
            { label: "Ministry of Health: explanatory note to the draft programme 2026 to 2030 (PDF, in Romanian)", url: NOTE_2026 },
            { label: "Public consultation on the draft programme 2026 to 2030 (particip.gov.md)", url: CONSULT_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Moldova", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "22 trials in OnCo's records list a site in Moldova, most of them early phase",
          plain:
            "Twenty-two trials in OnCo's records include Moldova among their countries. Most are early-phase: 12 are phase 1/2 and 2 phase 1. Half were recruiting when the registry was last read, and AstraZeneca sponsors the most.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 22 trials list Moldova, 12 phase 1/2, 4 phase 2, 4 phase 3 and 2 phase 1. ClinicalTrials.gov lists 11 as recruiting, 10 as active and not recruiting and 1 as completed. AstraZeneca leads 6, BioNTech 2 and Janssen 2. OnCo holds a selection of trials, not the whole registry.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in Moldova", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not read for this page",
      plain:
        "OnCo could not reach the Oncological Institute's or the National Health Insurance Company's websites, did not read a National Cancer Registry report, and found no source saying whether Moldova's cancer counts include the Transnistrian region. It did not read radiotherapy figures.",
      detail:
        "oncology.md and cnam.gov.md did not respond on 11 November 2026. The registry figures here are those the Ministry of Health quotes in its 2026 explanatory note. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries. OnCo did not confirm whether the government adopted the 2026 to 2030 programme after its consultation.",
      links: [
        { label: "Compania Națională de Asigurări în Medicină", url: "https://cnam.gov.md/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["oncological-institute-moldova", "moldova-ministry-of-health", "amdm-moldova"],
  companies: [],
  drugs: [],
  trials: ["nct06827236", "nct07111520", "nct05006716", "nct06265727", "nct05910827", "nct06996782", "nct02960022", "nct04995523", "nct05635708", "nct04931654", "nct06687369", "nct06054555"],
  papers: [],
  people: ["ruslan-baltaga"],
  how:
    "Every card was written from Moldovan and international public sources read as raw text on 11 November 2026, in Romanian where the source is Romanian: the Ministry of Health's 2026 explanatory note and 2024 action plan, WHO's 2020 country profile and immunisation data, the World Bank, the medicines agency's home page and IARC's GLOBOCAN 2024 fact sheet.",
  verify:
    "The 2026 to 2030 programme was a draft when read; check whether the government has adopted it. Registered counts can be revised.",
  verifyLinks: [
    { label: "Ministry of Health: explanatory note to the draft programme 2026 to 2030 (PDF)", url: NOTE_2026 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Moldova (PDF)", url: IARC_FACTSHEET },
  ],
};
