import type { CountryDive } from "@/data/country-dive";

/**
 * Dominican Republic deep dive: the hand-written cards for /countries/do/ (wave 9). Every figure was read from the raw
 * text of its source, in Spanish where the source is Spanish, on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet (PDF
 * text), INCART's report Indicadores Estadísticos y Epidemiológicos 2017-2021 (PDF text) and home page, SISALRIL's home
 * page and EVTESA page, WHO's Global Health Observatory API (HPV coverage and the 2019 and 2021 country capacity
 * surveys), the World Bank's health expenditure API and OnCo's ClinicalTrials.gov participation data. SENASA's and the
 * Ministry of Public Health's websites could not be read; the gaps are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/214-dominican-republic-fact-sheet.pdf";
const INCART = "https://www.incart.gob.do/";
const INCART_REPORT = "https://incart.gob.do/descargas/2294/publicaciones/35163/indicadores-estadisticos-y-epidemiologicos-incart-2017-2021.pdf";
const SISALRIL = "https://www.sisalril.gob.do/";
const EVTESA = "https://www.sisalril.gob.do/evtesa/";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'DOM'";
const WHO_PBCR = "https://ghoapi.azureedge.net/api/NCD_CCS_PBCR?$filter=SpatialDim%20eq%20'DOM'";
const WHO_MORPH = "https://ghoapi.azureedge.net/api/NCD_CCS_OralMorph?$filter=SpatialDim%20eq%20'DOM'";
const WB_OOP = "https://api.worldbank.org/v2/country/DOM/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/DOM/indicator/SH.XPD.GHED.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Dominican%20Republic&cond=cancer";

export const DO_DIVE: CountryDive = {
  iso2: "DO",
  iso3: "DOM",
  name: "the Dominican Republic",
  flag: "🇩🇴",
  asOf: "2026-11-11",
  title: "Cancer in the Dominican Republic",
  description:
    "Cancer in the Dominican Republic from Dominican sources: IARC's estimate of 21,060 new cancers and 11,533 deaths in 2024 made without national incidence data, prostate cancer as the commonest cancer and cause of cancer death, hospital registries at two reference centres and INCART's figures for 2017 to 2021, the family health insurance and its technology assessment unit, cervical screening by cytology, and no trial in our records with a site in the country.",
  lede:
    "IARC estimates 21,060 new cancers and 11,533 cancer deaths in the Dominican Republic in 2024, with prostate cancer the commonest cancer and the commonest cause of cancer death. There is no national count of new cancers: the hospital registries of the reference cancer centres are the closest thing.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Dominican Republic is 21,060 new cancers and 11,533 deaths, an age-standardised incidence of 165.4 per 100,000 (200.6 in men, 142.4 in women) and mortality of 90.8. IARC's fact sheet says it had no incidence data for the country and estimated incidence from national mortality and modelled mortality-to-incidence ratios based on registry survival data; mortality comes from WHO national data, with national or sub-national rates scaled to regional all-cancer rates. The country reported a population-based cancer registry to WHO in 2019 and 2021, but IARC used no incidence data from it, and OnCo found no published population-based figures. The hospital registries count only patients who reach particular hospitals.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Dominican Republic",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Dominican Republic (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 21,000 new cancers a year; prostate cancer leads cases and deaths",
          plain:
            "IARC estimates 21,060 new cancers in the Dominican Republic in 2024, 11,276 in men and 9,784 in women. Prostate cancer is the commonest (4,934 cases, 1,860 deaths), then breast, colorectal, lung and cervical cancer. Lung cancer causes 1,418 deaths and breast cancer 1,287.",
          detail:
            "GLOBOCAN 2024 gives breast cancer 2,609 cases, colorectal cancer 1,855 cases and 960 deaths, lung cancer 1,680 cases, cervical cancer 1,121 cases and liver cancer 819 deaths. The age-standardised incidence of prostate cancer is 88.9 per 100,000 men and of breast cancer 39.0 per 100,000 women.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Dominican Republic (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "do-hospital-registries",
          title: "New cancers in the hospital registries of two reference centres",
          caption: "New cancer cases diagnosed and treated at two reference oncology centres, 2015 to 2017, as reprinted in INCART's 2023 report from the Ministry of Public Health's Basic Health Indicators 2021.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "breast", label: "Breast (women)", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { year: "2015", cases: 4397, women: 2651, breast: 1003, prostate: 579, cervix: 356 },
            { year: "2016", cases: 4895, women: 2759, breast: 1035, prostate: 737, cervix: 498 },
            { year: "2017", cases: 3135, women: 1908, breast: 1081, prostate: 570, cervix: 351 },
          ],
          note: "Hospital registries count patients who reach these two centres, not everyone in the country, so they are far below IARC's national estimate and cannot be read as incidence. The report does not name the two centres in this table.",
          sources: [{ label: "INCART: Indicadores Estadísticos y Epidemiológicos 2017-2021, cuadro 1 (PDF, Spanish)", url: INCART_REPORT }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: hospital registries",
      aside: { label: "INCART: Indicadores Estadísticos y Epidemiológicos 2017-2021 (PDF)", url: INCART_REPORT },
      cards: [
        {
          id: "incart-registry",
          title: "INCART's registry: about 850 to 1,500 cases a year, most without a recorded stage",
          plain:
            "INCART, the national cancer institute in Santo Domingo, keeps a hospital cancer registry from patients' clinical records. Its 2023 report, the first to publish five years together, counts 1,115 cases in 2017, 1,411 in 2018, 1,481 in 2019, 1,023 in 2020 and 854 in 2021.",
          detail:
            "The report's table of 2019 cases by province shows clinical stage recorded as unknown for 1,332 of 1,481 cases, so stage at diagnosis cannot be described from it. A survival analysis of 738 records from 2019 to 2021 is included. The report says that the institute's output has risen considerably since 2020, including at its paediatric oncology centre and its radio-oncology centre, and it covers its pharmacovigilance programme. Santo Domingo province accounted for 249 of the 2019 cases (16.8%).",
          links: [
            { label: "INCART: Indicadores Estadísticos y Epidemiológicos 2017-2021 (PDF, Spanish)", url: INCART_REPORT },
            { label: "WHO Global Health Observatory: population-based cancer registry, Dominican Republic (API)", url: WHO_PBCR },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: family health insurance",
      aside: { label: "SISALRIL (Spanish)", url: SISALRIL },
      cards: [
        {
          id: "sfs",
          title: "The Family Health Insurance, regulated by SISALRIL, and a quarter paid out of pocket",
          plain:
            "Dominican social security includes a Family Health Insurance (Seguro Familiar de Salud) with a basic health plan, supervised by SISALRIL. According to the World Bank, government spending was 64.1% of current health spending in 2023 and out-of-pocket payments 25.1%.",
          detail:
            "SISALRIL's website lets people look up what the basic health plan (Plan Básico de Salud) covers. Health spending was 4.6% of the value of the economy (GDP) in 2023, about 489 US dollars a person, according to the World Bank's series from WHO's Global Health Expenditure Database. OnCo could not read SENASA, the public insurer, or the rules for high-cost cancer treatment under the plan; see the gaps.",
          links: [
            { label: "SISALRIL (Spanish)", url: SISALRIL },
            { label: "World Bank: out-of-pocket expenditure, Dominican Republic (API)", url: WB_OOP },
            { label: "World Bank: government health expenditure, Dominican Republic (API)", url: WB_GOV },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How a medicine is approved and paid for",
      aside: { label: "SISALRIL: EVTESA (Spanish)", url: EVTESA },
      cards: [
        {
          id: "evtesa",
          title: "Health technology assessment before a medicine joins the insurance plan",
          plain:
            "SISALRIL runs a health technology assessment process, EVTESA, that weighs the benefits, risks and costs of medicines, procedures and supplies before they are included in the Family Health Insurance. Anyone can request an assessment through SISALRIL's online office.",
          detail:
            "SISALRIL's page describes health technology assessment as a tool that studies efficacy and safety against costs, along with social and ethical aspects, and says EVTESA supports decisions on including medicines, procedures and supplies so the insurance's resources are used efficiently; it publishes its manuals, legal basis and evaluation reports. Marketing authorisation of medicines is a separate step by the Ministry of Public Health's regulator, whose website OnCo could not read; see the gaps.",
          links: [{ label: "SISALRIL: EVTESA (Spanish)", url: EVTESA }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Global Health Observatory: HPV coverage, Dominican Republic (API)", url: WHO_HPV },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccine coverage fell to 8% in 2020 and has recovered to 56%",
          plain:
            "WHO estimates that 56% of girls in the target age group in the Dominican Republic were vaccinated against HPV in 2025. Coverage was 59% in 2017, then fell to 10% in 2019 and 8% in 2020 before climbing again. The country reported cytology as its main cervical screening method in 2021.",
          detail:
            "WHO's estimates for the primary target cohort were 59% in 2017, 56% in 2018, 10% in 2019, 8% in 2020, 19% in 2021, 21% in 2022, 42% in 2023, 45% in 2024 and 56% in 2025. The country told WHO in 2021 that it has national cervical and breast screening programmes. INCART's website advertises a breast cancer early detection programme. OnCo did not read a Ministry description of the programmes' ages or reach.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Dominican Republic (API)", url: WHO_HPV },
            { label: "INCART (Spanish)", url: INCART },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What the Dominican Republic does",
      title: "What the Dominican Republic does differently",
      cards: [
        {
          id: "publish-hospital-data",
          title: "A national cancer institute that publishes its own registry",
          plain:
            "Without a published national count, the most detailed public cancer figures OnCo found for the Dominican Republic come from INCART, which publishes its hospital registry, by cancer, sex, age, province and stage, together with its activity, paediatric and radiotherapy figures and pharmacovigilance.",
          detail:
            "The 2023 report says it is the first time the institute has published five years of consolidated data, gathered from the clinical records of each patient diagnosed or treated there, and that it is meant for prevention, research and cancer control. Earlier reports cover 2015 to 2016, 2017 to 2018 and 2018 to 2019. Its large share of cases with unknown stage shows how much the registry depends on what is written in the records.",
          links: [
            { label: "INCART: Indicadores Estadísticos y Epidemiológicos 2017-2021 (PDF, Spanish)", url: INCART_REPORT },
            { label: "INCART: publications of cancer statistics (Spanish)", url: "https://incart.gob.do/investigacion-y-gestion-del-conocimiento/publicaciones-de-estadisticas-del-cancer/" },
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
          title: "No trial in OnCo's records has a site in the Dominican Republic",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, none of the cancer trials in our records lists a site in the Dominican Republic. That reflects the trials OnCo holds, mostly large trials of new medicines, not every study in the country.",
          detail:
            "OnCo's participation data cover 5,899 trials. INCART has a research directorate and a bioethics committee for research, according to its website, and the ClinicalTrials.gov search linked here shows any cancer studies registered with a site in the Dominican Republic.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in the Dominican Republic (search)", url: CTGOV },
            { label: "INCART (Spanish)", url: INCART },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "national-sources",
      title: "Sources that could not be read",
      plain:
        "SENASA, the public health insurer, did not answer, the Ministry of Public Health's site returned an almost empty page, and the address OnCo tried for the medicines regulator (digemaps.msp.gob.do) returned not found on 11 November 2026. This page therefore has no national cancer plan, no rules for high-cost cancer treatment and no description of the medicines approval route.",
      detail:
        "The country told WHO in 2021 that radiotherapy and chemotherapy are generally available in the public sector but oral morphine is not generally available in the public health sector. The IAEA's directory of radiotherapy centres works only in a browser, so no machine count is given. OnCo's web search budget was spent during this round, so other copies could not be looked for.",
      links: [
        { label: "WHO Global Health Observatory: oral morphine availability, Dominican Republic (API)", url: WHO_MORPH },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["incart-dominican-republic", "sisalril-dominican-republic", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; INCART's 2017 to 2021 report and website, in Spanish; SISALRIL's pages, in Spanish; WHO's Global Health Observatory; and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The two new records (INCART and SISALRIL) carry their own sources.",
  verify:
    "National figures are IARC estimates without national incidence data. What the Family Health Insurance covers depends on your scheme and plan; check with your insurer and the treating centre before treatment starts.",
  verifyLinks: [
    { label: "INCART", url: INCART },
    { label: "SISALRIL", url: SISALRIL },
  ],
};
