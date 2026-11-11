import type { CountryDive } from "@/data/country-dive";

/**
 * Guatemala deep dive: the hand-written cards for /countries/gt/ (wave 9). Every figure was read from the raw text of its
 * source on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Guatemala (PDF text), UNOP's home page (Spanish), the
 * abstracts of three papers through Europe PMC, WHO's Global Health Observatory API (HPV coverage and the 2019 and 2021
 * country capacity surveys), the World Bank's health expenditure API and OnCo's ClinicalTrials.gov participation data.
 * The Ministry of Public Health refused a plain request; that gap is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/320-guatemala-fact-sheet.pdf";
const UNOP = "https://www.unop.org.gt/";
const ALL_2017 = "https://doi.org/10.1002/cncr.30257";
const ABANDON_2017 = "https://doi.org/10.1002/pbc.26560";
const AFLATOXIN_2017 = "https://doi.org/10.1371/journal.pone.0189255";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'GTM'";
const WHO_PBCR = "https://ghoapi.azureedge.net/api/NCD_CCS_PBCR?$filter=SpatialDim%20eq%20'GTM'";
const WHO_CHEMO = "https://ghoapi.azureedge.net/api/NCD_CCS_chemo?$filter=SpatialDim%20eq%20'GTM'";
const WB_OOP = "https://api.worldbank.org/v2/country/GTM/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Guatemala&cond=cancer";

export const GT_DIVE: CountryDive = {
  iso2: "GT",
  iso3: "GTM",
  name: "Guatemala",
  flag: "🇬🇹",
  asOf: "2026-11-11",
  title: "Cancer in Guatemala",
  description:
    "Cancer in Guatemala from Guatemalan and published sources: IARC's estimate of 20,882 new cancers and 11,782 deaths in 2024 with no population-based registry behind it, liver cancer as the leading cause of cancer death and aflatoxin exposure in every adult tested, households paying 57% of health spending out of pocket, free care for children with cancer at UNOP, cervical screening by cytology, and 36 trials in our records with a site in Guatemala.",
  lede:
    "IARC estimates 20,882 new cancers and 11,782 cancer deaths in Guatemala in 2024, but Guatemala has no population-based cancer registry, so the figures are modelled from death records. Liver cancer causes more cancer deaths than any other, and households pay more than half of all health spending out of their own pockets.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Guatemala is 20,882 new cancers and 11,782 deaths, an age-standardised incidence of 149.3 per 100,000 and mortality of 87.6. IARC's fact sheet says it had no incidence data for Guatemala and estimated incidence from national mortality and modelled mortality-to-incidence ratios based on registry survival data; mortality comes from WHO national data, projected to 2024. Guatemala reported to WHO in 2019 and 2021 that it has no population-based cancer registry. So the incidence figures depend on how completely deaths from cancer are certified.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Guatemala",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Guatemala (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 21,000 new cancers a year; liver and stomach cancer lead the deaths",
          plain:
            "IARC estimates 20,882 new cancers in Guatemala in 2024, 11,283 in women and 9,599 in men. Prostate cancer is the commonest by cases, then liver, breast, cervical and stomach cancer. Liver cancer causes the most cancer deaths (2,289), then stomach cancer (1,441) and cervical cancer (1,108).",
          detail:
            "GLOBOCAN 2024 gives prostate cancer 3,400 cases, liver cancer 2,400, breast 2,075, cervix 1,894 and stomach 1,739; leukaemia causes 746 deaths. A 2017 study of 461 healthy adults aged 40 and over in five departments found aflatoxin B1, a toxin produced by moulds, in the blood of all of them, with higher exposure in men and in rural, low-income and less-educated people, while hepatitis B and C were rare (0.9% and 0.5%). The authors write that Guatemala has the highest liver cancer rates in the Western hemisphere, equal in men and women, and that reducing aflatoxin exposure may reduce liver cancer.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Guatemala (PDF)", url: IARC_FACTSHEET },
            { label: "Smith et al., aflatoxin and viral hepatitis in Guatemala (PLoS One 2017)", url: AFLATOXIN_2017 },
          ],
        },
      ],
      tables: [
        {
          id: "gt-capacity",
          title: "What Guatemala reported to WHO about cancer services",
          caption: "Guatemala's answers to WHO's NCD country capacity survey, 2021, from WHO's Global Health Observatory. The registry answer was also No in 2019.",
          columns: [
            { key: "item", label: "Question" },
            { key: "answer", label: "Answer" },
          ],
          rows: [
            { item: "Population-based cancer registry exists", answer: "No" },
            { item: "Operational cancer plan or strategy", answer: "Yes" },
            { item: "Radiotherapy generally available in the public sector", answer: "Yes" },
            { item: "Chemotherapy generally available in the public health system", answer: "No" },
            { item: "Oral morphine generally available in the public health sector", answer: "Yes" },
            { item: "National cervical screening programme (main method)", answer: "Yes (cytology)" },
            { item: "National breast screening programme", answer: "Yes" },
          ],
          note: "These are the country's own answers to WHO. There is no registry count to set beside IARC's estimate, which is why this table is here instead.",
          sources: [
            { label: "WHO Global Health Observatory: population-based cancer registry, Guatemala (API)", url: WHO_PBCR },
            { label: "WHO Global Health Observatory: chemotherapy availability, Guatemala (API)", url: WHO_CHEMO },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: no population-based registry",
      aside: { label: "WHO Global Health Observatory: population-based cancer registry (API)", url: WHO_PBCR },
      cards: [
        {
          id: "no-registry",
          title: "Cancer is counted through deaths, not diagnoses",
          plain:
            "Guatemala has no population-based cancer registry, according to its answers to WHO in 2019 and 2021, so there is no national count of how many people are diagnosed with cancer each year. IARC's incidence estimate is worked back from death certificates.",
          detail:
            "IARC's method for Guatemala applies modelled ratios of deaths to new cases, based on survival seen in other registries, to the national number of cancer deaths. Where deaths are not certified as cancer, the estimate falls short. The only Guatemalan cancer counts in the sources read for this page come from single centres, such as UNOP's records of children treated for cancer.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Guatemala (PDF)", url: IARC_FACTSHEET },
            { label: "WHO Global Health Observatory: population-based cancer registry, Guatemala (API)", url: WHO_PBCR },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: households pay most",
      aside: { label: "World Bank: out-of-pocket expenditure, Guatemala (API)", url: WB_OOP },
      cards: [
        {
          id: "financing",
          title: "Households pay 57% of health spending themselves",
          plain:
            "According to the World Bank, out-of-pocket payments were 57.2% of Guatemala's current health spending in 2023, against 35.8% from the government and 3.0% from external sources. Health spending was 6.8% of the value of the economy (GDP), about 392 US dollars a person.",
          detail:
            "These are the World Bank's indicators drawn from WHO's Global Health Expenditure Database. In WHO's 2021 survey Guatemala reported chemotherapy as not generally available in the public health system, while radiotherapy was. OnCo could not read the Ministry of Public Health's own rules on what public cancer care covers, because its website refused a plain request; see the gaps.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, Guatemala (API)", url: WB_OOP },
            { label: "WHO Global Health Observatory: chemotherapy availability, Guatemala (API)", url: WHO_CHEMO },
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
          id: "regulator-unread",
          title: "The regulator's rules could not be read",
          plain:
            "The Ministry of Public Health and Social Assistance's website, where Guatemala's medicines rules would be published, refused a plain request on 11 November 2026, so OnCo cannot describe who approves cancer medicines, by what routes, whether they rely on other regulators, or how long it takes.",
          detail:
            "OnCo's web search budget was spent during this round, so other copies of the Ministry's regulations could not be looked for. This card will be filled when a primary source can be read without bypassing the site's protection.",
          links: [{ label: "Ministry of Public Health and Social Assistance, Guatemala", url: "https://www.mspas.gob.gt/" }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Global Health Observatory: HPV coverage, Guatemala (API)", url: WHO_HPV },
      cards: [
        {
          id: "hpv",
          title: "Cytology screening, and HPV vaccine coverage rising to 63%",
          plain:
            "Guatemala reported to WHO in 2021 that it has national cervical and breast screening programmes, with cytology as the main cervical method. WHO estimates that 63% of girls in the target age group were vaccinated against HPV in 2025, up from 23% in 2020.",
          detail:
            "WHO's HPV coverage estimates for Guatemala's primary target cohort were 56% in 2018, 31% in 2019, 23% in 2020, 35% in 2021, 26% in 2022, 48% in 2023, 57% in 2024 and 63% in 2025. OnCo did not read a Ministry description of the screening programmes, their ages or their reach.",
          links: [{ label: "WHO Global Health Observatory: HPV coverage, Guatemala (API)", url: WHO_HPV }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Guatemala does",
      title: "What Guatemala does differently",
      cards: [
        {
          id: "unop",
          title: "Free care for children with cancer, and a team to stop families dropping out",
          plain:
            "UNOP, Guatemala's national paediatric oncology unit, says it treats children with cancer free of charge. When many families were abandoning treatment, it built a psychosocial team, medicina integral, and abandonment fell from 27% in 2001 to 7% in 2008.",
          detail:
            "A 2017 study of 1,789 children treated at UNOP in 2001 to 2008 found distance from the centre, age, year of diagnosis and indigenous ethnicity linked to abandonment. A second 2017 paper, calling UNOP the only paediatric haemato-oncology centre in Guatemala, reports 787 children with acute lymphoblastic leukaemia treated from July 2007 to June 2014, with 92.9% remission and five-year overall survival of 64.1%; its authors name late diagnosis, early deaths and relapse as the remaining problems.",
          links: [
            { label: "UNOP (Spanish)", url: UNOP },
            { label: "Alvarez et al., treatment abandonment in Guatemala (Pediatr Blood Cancer 2017)", url: ABANDON_2017 },
            { label: "Antillón et al., childhood ALL in Guatemala (Cancer 2017)", url: ALL_2017 },
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
          title: "36 trials in OnCo's records have a site in Guatemala",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, 36 cancer trials in our records list a site in Guatemala and 7 were recruiting, all 7 sponsored by Merck Sharp & Dohme. None runs only in Guatemala.",
          detail:
            "The 36 include large international trials in breast, gastric, lung and cervical cancer. OnCo's participation data cover 5,899 trials, mostly large trials of new medicines, so this is not a count of all cancer research in Guatemala; UNOP's paediatric research is published in journals but is not in this count.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Guatemala (search)", url: CTGOV },
            { label: "Open trials on OnCo", url: "/trials/open/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "national-sources",
      title: "Government sources could not be read",
      plain:
        "The Ministry of Public Health and Social Assistance (mspas.gob.gt) refused a plain request with HTTP 403 on 11 November 2026. This page therefore has no national cancer plan, no list of treatment centres, and no description of what public care or social security covers.",
      detail:
        "OnCo does not bypass a site's protection. The IAEA's directory of radiotherapy centres works only in a browser, so the number of radiotherapy machines is not given, though Guatemala told WHO in 2021 that radiotherapy is generally available in the public sector. OnCo's web search budget was spent during this round.",
      links: [
        { label: "Ministry of Public Health and Social Assistance, Guatemala", url: "https://www.mspas.gob.gt/" },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["unop-guatemala", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["nct07190248", "nct06925737", "nct06966700", "nct06717347", "waveline-003", "keynote-a18", "keynote-811"],
  papers: ["paper-antillon-guatemala-childhood-all-cancer-2017", "paper-alvarez-guatemala-paediatric-abandonment-pbc-2017"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Guatemala; UNOP's own page in Spanish; three papers' abstracts through Europe PMC; WHO's Global Health Observatory; and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records (UNOP and two papers) carry their own sources.",
  verify:
    "National figures are IARC estimates without a Guatemalan registry behind them. What treatment costs and where it is available depends on whether you are covered by social security, and changes faster than published sources; ask the treating hospital.",
  verifyLinks: [
    { label: "UNOP", url: UNOP },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Guatemala (PDF)", url: IARC_FACTSHEET },
  ],
};
