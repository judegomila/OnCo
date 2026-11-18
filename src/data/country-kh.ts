import type { CountryDive } from "@/data/country-dive";

/**
 * Cambodia deep dive: the hand-written cards for /countries/kh/ (wave 8). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Cambodia; papers from
 * Cambodia found and resolved through Europe PMC with their abstracts read; and WHO's HPV coverage and health
 * expenditure rows from its public data APIs. Cambodian government sources (the Ministry of Health, the Department of
 * Drugs and Food, the health equity and social security funds) were not read, and the page names them as gaps.
 *
 * Second accuracy pass, 17 November 2026: every source was read again as raw text. The registry wording now gives
 * WHO's dated row and IARC's stated method as two separate facts; WHO's administrative HPV rows (antigen family HPV,
 * which the first query's PRHPV filter left out) are reported beside the programme estimates; and the IAEA DIRAC
 * radiotherapy feed, which the first pass called unread, is read and described.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/116-cambodia-fact-sheet.pdf";
const KSFH_CERVIX = "https://doi.org/10.35772/ghmo.2023.01002";
const CDHS_SCREEN = "https://doi.org/10.1371/journal.pone.0295881";
const LIVER_KSFH = "https://doi.org/10.7314/APJCP.2015.16.1.35";
const LIVER_GBD = "https://doi.org/10.1186/s12876-025-04077-6";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'KHM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_ALL_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'KHM'%20and%20contains(ANTIGEN,'HPV')";
const WHO_PBCR_API = "https://ghoapi.azureedge.net/api/NCD_CCS_PBCR?$filter=SpatialDim%20eq%20'KHM'";
const DIRAC = "https://dirac.iaea.org/";
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
    "Cancer in Cambodia: IARC's estimate of 22,111 new cancers and 14,945 deaths in 2024, for which IARC's fact sheet names no Cambodian data source; liver cancer as the commonest cancer and cause of cancer death; out-of-pocket payments at about 61% of health spending; cervical cancer found late at a national cancer centre; screening reaching about one woman in seven; HPV vaccination at 85% to 87% of girls in WHO's estimates since 2023; and the government sources OnCo did not read.",
  lede:
    "IARC estimates 22,111 new cancers and 14,945 deaths in Cambodia in 2024. Its fact sheet names no Cambodian data source for incidence and bases the rates on estimates or registry data from neighbouring countries. WHO's Global Health Observatory records no population-based cancer registry in Cambodia in its row for 2021. Liver cancer is the commonest cancer and the leading cause of cancer death. Households pay about 61% of health spending themselves.",
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
      title: "No population registry in WHO's 2021 row, and one hospital's records",
      cards: [
        {
          id: "hospital-records",
          title: "One national cancer centre's records: most cervical cancers found late",
          plain:
            "WHO's Global Health Observatory answers no for a population-based cancer registry in Cambodia in its row for 2021, the only year it gives. One hospital's records show part of the picture. At the Khmer-Soviet Friendship Hospital in Phnom Penh, which a 2023 study calls one of Cambodia's two national cancer centres, 351 women were diagnosed with cervical cancer in 2019, and 57.6% of those with a recorded stage had advanced disease.",
          detail:
            "The 2023 study, by authors from the hospital's obstetrics and gynaecology department, Japan's National Center for Global Health and Medicine and three other bodies, used the gynaecology department's gynaecologic test registry for 2019. The authors estimate the 351 cases were about a third of Cambodia's cervical cancers that year. Mean age was 54.7; 83.8% were squamous cell carcinomas; stage was recorded for 309 women. They call for awareness of early symptoms, wider access to diagnosis and better recording of clinical information. An earlier study described liver cancer at the same hospital.",
          links: [
            { label: "Tanaka et al., cervical cancer at a national cancer center in Phnom Penh (GHM Open 2023)", url: KSFH_CERVIX },
            { label: "Characteristics of liver cancer at Khmer-Soviet Friendship Hospital (Asian Pac J Cancer Prev 2015)", url: LIVER_KSFH },
            { label: "WHO Global Health Observatory: existence of a population-based cancer registry, Cambodia (API)", url: WHO_PBCR_API },
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
          title: "HPV vaccination at 85% to 87% of girls in WHO's estimates since 2023",
          plain:
            "WHO's HPV estimates for Cambodia begin in 2023, with coverage of girls at 87% that year and 85% in 2024 and 2025, the same for first and last dose. The estimates give no figure for boys. The administrative figures in the same data are higher than the estimates, and include rows for 2018.",
          detail:
            "WHO's immunisation data, read again on 17 November 2026, hold two kinds of HPV row for Cambodia. The programme estimates have no figure before 2023; for girls they give 87% in 2023 and 85% in 2024 and 2025, for both the first and the last dose, and the rows for boys are blank. The administrative rows, which are the reported doses divided by the reported target, give a first dose in girls of 99.3% in 2023, 93.0% in 2024 and 104.35% in 2025 (177,789 doses against a target of 170,372). They also hold a 2018 final-dose figure of 96.18% for girls (11,067 of 11,507) and 94.74% for boys (10,902 of 11,507); the data do not explain the row for boys. A 2019 paper in Vaccine describes, in its abstract, a 2017 demonstration programme for 9-year-old girls in six districts of two provinces, where a household survey of 315 girls found documented two-dose coverage of 84%.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Cambodia (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: every HPV row for Cambodia, including administrative coverage (API)", url: WHO_HPV_ALL_API },
            { label: "HPV vaccine demonstration program, Cambodia: household assessment (Vaccine 2019)", url: "https://doi.org/10.1016/j.vaccine.2018.12.052" },
          ],
        },
        {
          id: "screening-uptake",
          title: "About one woman in seven screened for cervical cancer",
          plain:
            "In Cambodia's 2022 Demographic and Health Survey, 15.3% of women aged 15 to 49 said they had been screened for cervical cancer and 10.6% for breast cancer. Screening was commoner among older, better-educated and wealthier women.",
          detail:
            "The analysis, by researchers at Cambodia's National Institute of Public Health, covered 19,496 women. For cervical screening the adjusted odds were 7.61 times higher for women aged 40 to 49 than for the youngest group, and higher with more education, media exposure and wealth. The authors call for health education through the media, aimed at women of low socio-economic status. A 2026 study costed a community HPV self-sampling programme in Siem Reap Province, in which 7,524 women were screened in 2022 and 2023 (abstract read). Another 2026 paper describes a screening model for garment workers; only its title was used here.",
          links: [
            { label: "Um and Sopheab (PLoS One 2025)", url: CDHS_SCREEN },
            { label: "Micro-costing of community HPV self-sampling in rural Cambodia (2026)", url: "https://doi.org/10.1007/s41669-026-00659-6" },
            { label: "A new model for cervical cancer screening in Cambodian garment workers (BMJ Glob Health 2026)", url: "https://doi.org/10.1136/bmjgh-2025-019100" },
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
            "WHO's estimates put Cambodia's HPV vaccination coverage of girls at 85% in 2025, the third year they cover, higher than Finland's or Ireland's in the same estimates, while few adult women have been screened. Vaccination protects girls; for women already past vaccination age, screening is what finds cervical cancer earlier.",
          detail:
            "WHO's HPV estimates put Cambodia's first-dose coverage in girls at 85% in 2025, against 91% in Norway, 90% in Zimbabwe, 80% in Finland, 76% in Ireland and 14% in Bulgaria in the same estimates. The 2022 survey found 15.3% of women aged 15 to 49 had ever been screened for cervical cancer, and at the national cancer centre most cervical cancers with a recorded stage were advanced.",
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
        "OnCo did not read Cambodian government sources on the cancer plan, Cambodia's health financing schemes, the medicines regulator or the essential medicines list. The second national cancer centre is not named. For radiotherapy, the IAEA's DIRAC directory, read on 17 November 2026, lists three centres, all in Phnom Penh, with three linear accelerators between them.",
      detail:
        "The 2023 study names the Khmer-Soviet Friendship Hospital as one of two national cancer centres but does not name the other, in its abstract or its full text, and OnCo has not named it from memory. An earlier version of this page said the IAEA's DIRAC radiotherapy directory was not read. Its public data feed, read on 17 November 2026, lists three radiotherapy centres in Cambodia, all in Phnom Penh: Calmette Hospital (one linear accelerator and one high-dose-rate iridium-192 brachytherapy unit, entry dated 2020), the Khmer-Soviet Friendship Hospital (one linear accelerator, entry dated 2024) and the Orange Cancer Clinic (one linear accelerator, entry dated 2024). It lists no cobalt-60 unit. Entries are reported by the centres themselves and may be out of date. WHO's cancer country profile for Cambodia was not read.",
      links: [
        { label: "Tanaka et al. (GHM Open 2023)", url: KSFH_CERVIX },
        { label: "IAEA: DIRAC, Directory of Radiotherapy Centres", url: DIRAC },
      ],
    },
    {
      id: "unread-sources",
      title: "No counted incidence or survival",
      plain:
        "There is no counted national incidence or survival figure for Cambodia on this page. IARC's numbers are modelled: its fact sheet names no Cambodian data source for incidence. Separately, WHO's Global Health Observatory records no population-based cancer registry in Cambodia in its row for 2021.",
      detail:
        "Only abstracts were read for most of the papers cited, and for some only titles, as marked on each card; on 17 November 2026 the full text of the 2023 cervical cancer study and of the 2025 screening analysis was also read. A 2017 record in Europe PMC on setting up a paediatric oncology programme in Cambodia was not read. WHO's cancer country profile for Cambodia was not read either.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET },
        { label: "WHO Global Health Observatory: existence of a population-based cancer registry, Cambodia (API)", url: WHO_PBCR_API },
      ],
    },
  ],
  institutions: ["khmer-soviet-friendship-hospital", "calmette-hospital", "orange-cancer-clinic-phnom-penh", "iarc", "who", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-tanaka-cervical-cancer-ksfh-cambodia-ghmo-2023"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the abstracts of Cambodian papers found through Europe PMC (and, where marked, titles only); and WHO's HPV coverage, health expenditure and cancer registry rows from its public data APIs. The radiotherapy centres are from the IAEA's DIRAC data feed, read on 17 November 2026. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Khmer-Soviet Friendship Hospital and one paper) carry their own sources.",
  verify:
    "This page has no Cambodian government source on the cost of care, medicines or screening. Ask the treating hospital what is available and what it costs, and whether a public scheme covers you.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cambodia (PDF)", url: IARC_FACTSHEET },
    { label: "WHO immunisation data: Cambodia (API)", url: WHO_HPV_API },
  ],
};
