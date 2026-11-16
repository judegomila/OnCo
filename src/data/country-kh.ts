import type { CountryDive } from "@/data/country-dive";

/**
 * Cambodia deep dive: the hand-written cards for /countries/kh/ (wave 8). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Cambodia; papers from
 * Cambodia found and resolved through Europe PMC with their abstracts read; and WHO's HPV coverage and health
 * expenditure rows from its public data APIs. Cambodian government sources (the Ministry of Health, the Department of
 * Drugs and Food, the health equity and social security funds) were not read, and the page names them as gaps.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/116-cambodia-fact-sheet.pdf";
const KSFH_CERVIX = "https://doi.org/10.35772/ghmo.2023.01002";
const CDHS_SCREEN = "https://doi.org/10.1371/journal.pone.0295881";
const LIVER_KSFH = "https://doi.org/10.7314/APJCP.2015.16.1.35";
const LIVER_GBD = "https://doi.org/10.1186/s12876-025-04077-6";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'KHM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'KHM'";
const CTGOV = "https://clinicaltrials.gov/search?country=Cambodia&cond=cancer";

export const KH_DIVE: CountryDive = {
  iso2: "KH",
  iso3: "KHM",
  name: "Cambodia",
  flag: "🇰🇭",
  asOf: "2026-11-11",
  title: "Cancer in Cambodia",
  description:
    "Cancer in Cambodia: IARC's estimate of 22,111 new cancers and 14,945 deaths in 2024, made without a Cambodian registry; liver cancer as the commonest cancer and cause of cancer death; out-of-pocket payments at about 61% of health spending; cervical cancer found late at a national cancer centre; screening reaching about one woman in seven; HPV vaccination at 85% to 87% of girls since 2023; and the government sources OnCo did not read.",
  lede:
    "Cambodia has no population-based cancer registry in IARC's sources, so IARC's estimate of 22,111 new cancers and 14,945 deaths in 2024 is built from neighbouring countries' rates. Liver cancer is the commonest cancer and the leading cause of cancer death. Households pay about 61% of health spending themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Cambodia is 22,111 new cancers and 14,945 deaths, an age-standardised incidence of 135.5 per 100,000 (148.3 in men, 129.3 in women) and mortality of 93.1. IARC's fact sheet gives no country-specific data source for incidence and describes the method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. These are therefore modelled figures, not counts. Deaths divided by new cases give 0.68.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Cambodia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 22,000 new cancers a year, with liver cancer first",
          plain:
            "IARC estimates 22,111 new cancers in Cambodia in 2024. Liver cancer is the commonest, then lung, colorectal and breast cancer, and liver cancer causes about a fifth of cancer deaths. These figures are modelled from neighbouring countries, not counted in Cambodia.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 3,032 liver cancers (2,909 deaths, 19.5% of cancer deaths), 2,669 lung cancers (2,478 deaths), 2,657 colorectal cancers, 2,519 breast cancers, 1,375 thyroid cancers and 1,252 cervical cancers (763 deaths). In men liver cancer's age-standardised incidence is 30.7 per 100,000 against 10.1 in women. An estimated 43,489 people are living within five years of a diagnosis. A 2025 analysis of Global Burden of Disease data describes the burden of primary liver cancer in Cambodia from 1990 to 2021; only its title was used here.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET },
            { label: "Primary liver cancer burden in Cambodia, 1990 to 2021 (2025)", url: LIVER_GBD },
          ],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 estimate",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024 (modelled from neighbouring countries)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 22111, deaths: 14945 },
            { site: "Liver", cases: 3032, deaths: 2909 },
            { site: "Lung", cases: 2669, deaths: 2478 },
            { site: "Colorectum", cases: 2657, deaths: 1488 },
            { site: "Breast", cases: 2519, deaths: 1164 },
            { site: "Thyroid", cases: 1375, deaths: 215 },
            { site: "Cervix uteri", cases: 1252, deaths: 763 },
          ],
          note: "No Cambodian registry is named as a source; IARC bases the rates on neighbouring countries.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "No population registry, so hospital records matter",
      cards: [
        {
          id: "hospital-records",
          title: "One national cancer centre's records: most cervical cancers found late",
          plain:
            "Without a population registry, hospital records give the clearest picture. At the Khmer-Soviet Friendship Hospital in Phnom Penh, one of Cambodia's two national cancer centres, 351 women were diagnosed with cervical cancer in 2019, and 57.6% of those with a recorded stage had advanced disease.",
          detail:
            "The 2023 study, from the hospital's gynaecology department and Japan's National Center for Global Health and Medicine, used the department's gynaecologic test registry for 2019. The authors estimate the 351 cases were about a third of Cambodia's cervical cancers that year. Mean age was 54.7; 83.8% were squamous cell carcinomas; stage was recorded for 309 women. They call for awareness of early symptoms, wider access to diagnosis and better recording of clinical information. An earlier study described liver cancer at the same hospital.",
          links: [
            { label: "Tanaka et al., cervical cancer at a national cancer center in Phnom Penh (GHM Open 2023)", url: KSFH_CERVIX },
            { label: "Characteristics of liver cancer at Khmer-Soviet Friendship Hospital (Asian Pac J Cancer Prev 2015)", url: LIVER_KSFH },
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
          title: "Households pay about 61% of health spending",
          plain:
            "WHO estimates that out-of-pocket payments were 60.6% of Cambodia's current health expenditure in 2023. OnCo did not read Cambodian government sources on what public schemes pay for cancer care, so this page does not describe them.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 41.7% of current health expenditure in 2021, 61.0% in 2022 and 60.6% in 2023. The database does not explain the rise between 2021 and 2022. In the 2022 Demographic and Health Survey, cancer screening was commoner among wealthier and better-educated women; the analysis does not report cost. What Cambodia's public health financing schemes pay for cancer care was not read from a primary source; see the gaps.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Cambodia (API)", url: WHO_GHED_API },
            { label: "Um and Sopheab, breast and cervical cancer screening in Cambodia (PLoS One 2025)", url: CDHS_SCREEN },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "regulator-gap",
          title: "The medicines regulator's rules were not read",
          plain:
            "OnCo did not read a primary source on how a cancer medicine is registered in Cambodia or which cancer medicines are on the national essential medicines list, and does not describe them from memory.",
          detail:
            "The Ministry of Health's medicines regulation pages were not read for this page, nor was the national essential medicines list. No trial in OnCo's records lists a site in Cambodia, so no trial approval can be traced through OnCo's data either. A reader should ask the treating hospital whether a medicine is registered and available in Cambodia.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Cambodia (search)", url: CTGOV }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination at 85% to 87% of girls since its first year in WHO's data",
          plain:
            "WHO and UNICEF's figures show Cambodia vaccinating girls against HPV from 2023, with coverage of 87% that year and 85% in 2024 and 2025, the same for first and last dose. There is no figure for boys.",
          detail:
            "WHO's immunisation data for Cambodia have no HPV coverage figure before 2023. For girls they give 87% in 2023 and 85% in 2024 and 2025, for both the first and the last dose. A 2019 paper in Vaccine reported on an earlier HPV vaccine demonstration programme in Cambodia; only its title was used here.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Cambodia (API)", url: WHO_HPV_API },
            { label: "HPV vaccine demonstration program, Cambodia: household assessment (Vaccine 2019)", url: "https://doi.org/10.1016/j.vaccine.2018.12.052" },
          ],
        },
        {
          id: "screening-uptake",
          title: "About one woman in seven screened for cervical cancer",
          plain:
            "In Cambodia's 2022 Demographic and Health Survey, 15.3% of women aged 15 to 49 said they had been screened for cervical cancer and 10.6% for breast cancer. Screening was commoner among older, better-educated and wealthier women.",
          detail:
            "The analysis, by researchers at Cambodia's National Institute of Public Health, covered 19,496 women. For cervical screening the adjusted odds were 7.61 times higher for women aged 40 to 49 than for the youngest group, and higher with more education, media exposure and wealth. The authors call for health education through the media, aimed at women of low socio-economic status. Recent studies have tested HPV self-sampling in rural Cambodia and screening for garment workers; only their titles were used here.",
          links: [
            { label: "Um and Sopheab (PLoS One 2025)", url: CDHS_SCREEN },
            { label: "Micro-costing of community HPV self-sampling in rural Cambodia (2026)", url: "https://doi.org/10.1007/s41669-026-00659-6" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Cambodia",
      cards: [
        {
          id: "vaccine-ahead",
          title: "High HPV vaccine coverage, low screening",
          plain:
            "Cambodia reached 85% HPV vaccination coverage of girls within its first years, higher than Finland's or Ireland's in the same WHO data, while few adult women have been screened. Vaccination protects girls; for women already past vaccination age, screening is what finds cervical cancer earlier.",
          detail:
            "WHO's data put Cambodia's first-dose coverage in girls at 85% in 2025, against 91% in Norway, 90% in Zimbabwe, 80% in Finland, 76% in Ireland and 14% in Bulgaria in the same data. The 2022 survey found 15.3% of women aged 15 to 49 had ever been screened for cervical cancer, and at the national cancer centre most cervical cancers with a recorded stage were advanced.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Cambodia (API)", url: WHO_HPV_API },
            { label: "Um and Sopheab (PLoS One 2025)", url: CDHS_SCREEN },
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
          id: "trial-count",
          title: "No trial in OnCo's records has a site in Cambodia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Cambodia. OpenAlex counts 114 oncology papers with a Cambodia-based author in 2025, up from 80 in 2021.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and none lists Cambodia; that reflects the trials OnCo holds, not every study in Cambodia. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Cambodia 80 works in 2021, 73 in 2022, 74 in 2023, 96 in 2024 and 114 in 2025, 437 in total, of which 348 are open access and 3 highly cited.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Cambodia (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "government-sources",
      title: "Government sources not read",
      plain:
        "OnCo did not read Cambodian government sources on the cancer plan, Cambodia's health financing schemes, the medicines regulator or the essential medicines list. Radiotherapy capacity and the second national cancer centre are not described.",
      detail:
        "The 2023 study names the Khmer-Soviet Friendship Hospital as one of two national cancer centres but does not name the other in its abstract, and OnCo has not named it from memory. The IAEA's DIRAC radiotherapy database and WHO's cancer country profile for Cambodia were not read.",
      links: [{ label: "Tanaka et al. (GHM Open 2023)", url: KSFH_CERVIX }],
    },
    {
      id: "unread-sources",
      title: "No counted incidence or survival",
      plain:
        "Because Cambodia has no population-based registry in IARC's sources, there is no counted national incidence or survival figure for Cambodia on this page; IARC's numbers are modelled.",
      detail:
        "Only abstracts were read for the papers cited, and for some only titles, as marked on each card. A 2017 record in Europe PMC on setting up a paediatric oncology programme in Cambodia was not read. WHO's cancer country profile for Cambodia was not read either.",
      links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET }],
    },
  ],
  institutions: ["khmer-soviet-friendship-hospital", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-tanaka-cervical-cancer-ksfh-cambodia-ghmo-2023"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the abstracts of Cambodian papers found through Europe PMC (and, where marked, titles only); and WHO's HPV coverage and health expenditure rows from its public data APIs. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Khmer-Soviet Friendship Hospital and one paper) carry their own sources.",
  verify:
    "This page has no Cambodian government source on the cost of care, medicines or screening. Ask the treating hospital what is available and what it costs, and whether a public scheme covers you.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET },
    { label: "WHO immunisation data: Cambodia (API)", url: WHO_HPV_API },
  ],
};
