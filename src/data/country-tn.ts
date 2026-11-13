import type { CountryDive } from "@/data/country-dive";

/**
 * Tunisia deep dive: the hand-written cards for /countries/tn/ (wave 8). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Tunisia; two papers from
 * the Northern Tunisia Cancer Registry, found and resolved through Europe PMC with their abstracts read; WHO's HPV
 * coverage and health expenditure rows from its public data APIs. Tunisian government sites (the national health
 * insurance fund CNAM, the health assessment body INEAS and the pharmacy and medicines directorate) did not answer a
 * plain request on that date, nor did the Internet Archive's copy of CNAM's site, so this page names them as gaps
 * rather than describing what they do from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/788-tunisia-fact-sheet.pdf";
const NTCR_2023 = "https://doi.org/10.31557/APJCP.2024.25.12.4359";
const NTCR_CERVIX = "https://doi.org/10.1186/s12885-025-13626-x";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'TUN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'TUN'";
const CTGOV = "https://clinicaltrials.gov/search?country=Tunisia&cond=cancer";

export const TN_DIVE: CountryDive = {
  iso2: "TN",
  iso3: "TUN",
  name: "Tunisia",
  flag: "🇹🇳",
  asOf: "2026-11-11",
  title: "Cancer in Tunisia",
  description:
    "Cancer in Tunisia: IARC's estimate of 16,332 new cancers and 9,059 deaths in 2024, built on Tunisia's regional cancer registries; the Northern Tunisia Cancer Registry's own rates, with lung cancer leading in men and breast cancer in women; a cervical cancer rate in the north that fell from 6.6 to 4.7 per 100,000 women from 1994 to 2018; HPV vaccination first reported in 2025; out-of-pocket payments at 38% of health spending; and the government sources OnCo could not reach.",
  lede:
    "Tunisia counts cancer through regional population-based registries, and IARC applies their rates to the whole country: 16,332 new cancers and 9,059 deaths in 2024. Lung cancer is the leading cancer in men and the leading cause of cancer death; breast cancer is the commonest cancer overall. Households pay about 38% of health spending themselves.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Tunisia is 16,332 new cancers and 9,059 deaths, an age-standardised incidence of 105.7 per 100,000 (119.6 in men, 94.5 in women) and mortality of 58.0. IARC's incidence method is subnational registry rates applied to the 2024 population, and its mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. The Northern Tunisia Cancer Registry's own estimate for 2023, from an age-period-cohort model, is higher: 165.9 per 100,000 men and 141.4 per 100,000 women, but it includes non-melanoma skin cancer and covers the north only, so the two are not directly comparable.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Tunisia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Tunisia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 16,000 new cancers a year, with breast, lung, colorectal and bladder cancer leading",
          plain:
            "IARC estimates 16,332 new cancers in Tunisia in 2024, 8,761 in men and 7,571 in women. Breast cancer is the commonest, then lung, colorectal and bladder cancer. Lung cancer causes the most cancer deaths, nearly a fifth of the total.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,535 breast cancers (947 deaths), 2,049 lung cancers (1,671 deaths, 18.4% of cancer deaths), 1,813 colorectal cancers (772 deaths), 1,383 bladder cancers (782 deaths) and 777 prostate cancers. Cervical cancer is twelfth, with 334 cases and 155 deaths. In men lung cancer's incidence rate is 24.9 per 100,000 against 2.2 in women, and bladder cancer's 16.4 against 1.8. An estimated 38,700 people are living within five years of a diagnosis. Deaths divided by new cases give 0.55.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Tunisia (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "ntcr-2023",
          title: "The Northern Tunisia Cancer Registry's estimate for 2023",
          caption: "Age-standardised incidence per 100,000, estimated for 2023 from registry data, five commonest sites apart from skin",
          columns: [
            { key: "sex", label: "Sex" },
            { key: "site", label: "Cancer" },
            { key: "rate", label: "Rate per 100,000", numeric: true },
          ],
          rows: [
            { sex: "Men", site: "All sites, including non-melanoma skin", rate: 165.9 },
            { sex: "Men", site: "Lung", rate: 37.6 },
            { sex: "Men", site: "Colorectal", rate: 29.4 },
            { sex: "Men", site: "Bladder", rate: 24.1 },
            { sex: "Men", site: "Prostate", rate: 15.2 },
            { sex: "Men", site: "Stomach", rate: 6.0 },
            { sex: "Women", site: "All sites, including non-melanoma skin", rate: 141.4 },
            { sex: "Women", site: "Breast", rate: 55.4 },
            { sex: "Women", site: "Colorectal", rate: 23.0 },
            { sex: "Women", site: "Corpus uteri", rate: 9.3 },
            { sex: "Women", site: "Thyroid", rate: 9.0 },
            { sex: "Women", site: "Lung", rate: 5.8 },
          ],
          note: "Model estimates for 2023 from the registry database, published in 2024. Northern Tunisia only.",
          sources: [{ label: "Khiari et al., estimated cancer incidence in northern Tunisia in 2023 (Asian Pac J Cancer Prev 2024)", url: NTCR_2023 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Regional registries, not a national one",
      cards: [
        {
          id: "northern-registry",
          title: "The Northern Tunisia Cancer Registry, run from the Institut Salah Azaïez",
          plain:
            "Tunisia's national figures are built from regional registries. The Northern Tunisia Cancer Registry collects cases actively from public and private health services and projects that colorectal cancer rates will more than double by 2040, as will breast, thyroid and uterine cancer in women.",
          detail:
            "The registry's authors are at the Department of Epidemiology and Biostatistics of the Institut Salah Azaïez in Tunis. Their 2024 paper describes active collection from all health services, public and private, that care for cancer patients, and uses an age-period-cohort model to project incidence to 2040: lung and bladder cancer rates in men would increase, stomach cancer would be stable, and cervical cancer in women would stay stable. Their 2025 paper counts 3,092 cervical cancers in northern Tunisia in 1994 to 2018, about 129 a year, with the age-standardised rate falling from 6.6 to 4.7 per 100,000 women. A registry in Monastir has published breast cancer incidence and predictions to 2030. IARC's fact sheet names the source of its estimate as subnational registries.",
          links: [
            { label: "Khiari et al., northern Tunisia incidence 2023 (Asian Pac J Cancer Prev 2024)", url: NTCR_2023 },
            { label: "Khiari et al., cervical cancer trends in northern Tunisia 1994 to 2040 (BMC Cancer 2025)", url: NTCR_CERVIX },
            { label: "Breast cancer incidence and predictions, Monastir 2002 to 2030 (PLoS One 2022)", url: "https://doi.org/10.1371/journal.pone.0268035" },
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
          id: "oop",
          title: "Households pay about 38% of health spending",
          plain:
            "WHO estimates that out-of-pocket payments were 37.9% of Tunisia's current health expenditure in 2023. OnCo could not reach the national health insurance fund's own pages to describe what it pays for cancer care, so this page does not describe it.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 37.2% of current health expenditure in 2021, 36.3% in 2022 and 37.9% in 2023. The site of the Caisse Nationale d'Assurance Maladie (CNAM), Tunisia's national health insurance fund, did not answer a plain request on 11 November 2026, and neither did the Internet Archive's copy of it. How cancer is covered as a long-term or serious illness, which cancer medicines the fund pays for, and what a patient pays in public hospitals are therefore not on this page; see the gaps.",
          links: [{ label: "WHO Global Health Expenditure Database: out-of-pocket share, Tunisia (API)", url: WHO_GHED_API }],
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
          title: "The medicines regulator's pages could not be reached",
          plain:
            "Tunisia regulates medicines nationally, but the site of its pharmacy and medicines directorate did not answer a plain request on 11 November 2026, and neither did the health assessment body INEAS. OnCo does not describe their rules from memory.",
          detail:
            "OnCo tried the sites of the Direction de la Pharmacie et du Médicament (dpm.tn) and the Instance Nationale de l'Évaluation et de l'Accréditation en Santé (ineas.tn) on 11 November 2026: the first did not respond and the second returned errors. How a new cancer medicine is authorised, priced and assessed in Tunisia, and whether a new medicines agency has replaced the directorate, are therefore named as gaps rather than stated.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Tunisia (search)", url: CTGOV }],
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
          title: "HPV vaccination appears in WHO's data for the first time in 2025",
          plain:
            "WHO and UNICEF's figures for Tunisia show HPV vaccination coverage of 3% of girls in 2025, the first year with a figure. The registry's cervical cancer paper calls for HPV vaccination of girls.",
          detail:
            "WHO's immunisation data for Tunisia have no HPV coverage figure before 2025; for 2025 they give 3% for the first and the last dose in girls. OnCo did not find a Ministry of Health source on the programme's start date or target ages. The 2025 cervical cancer paper from the Northern Tunisia Cancer Registry recommends a cervical cancer control programme with screening, HPV vaccination for girls and timely treatment. OnCo did not read a primary source describing organised breast or cervical screening in Tunisia.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Tunisia (API)", url: WHO_HPV_API },
            { label: "Khiari et al., cervical cancer trends in northern Tunisia (BMC Cancer 2025)", url: NTCR_CERVIX },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Tunisia",
      cards: [
        {
          id: "lung-bladder-men",
          title: "Lung and bladder cancer in men, and a projected rise in colorectal cancer",
          plain:
            "In Tunisia lung and bladder cancer are far commoner in men than in women, and the northern registry projects colorectal cancer rates to more than double by 2040.",
          detail:
            "IARC's 2024 estimate puts lung cancer incidence at 24.9 per 100,000 in men against 2.2 in women, and bladder cancer at 16.4 against 1.8. The Northern Tunisia registry's 2023 estimate puts lung cancer first in men (37.6 per 100,000) and bladder third (24.1), and projects increases in both by 2040, with colorectal cancer more than doubling in both sexes. The registry's authors conclude that prevention, screening and early diagnosis should be strengthened. The abstracts read do not measure risk factors such as smoking, so this page does not attribute the pattern to a cause.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Tunisia (PDF)", url: IARC_FACTSHEET },
            { label: "Khiari et al., northern Tunisia incidence 2023 (Asian Pac J Cancer Prev 2024)", url: NTCR_2023 },
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
          title: "Four trials in OnCo's records have a site in Tunisia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, four of the cancer trials in our records list a site in Tunisia. OpenAlex counts 209 oncology papers with at least one author based in Tunisia in 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and four list Tunisia; that reflects the trials OnCo holds, not every study in Tunisia. When OnCo built its country file on 8 September 2026, ClinicalTrials.gov counted 655 studies of any condition with a site in Tunisia. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Tunisia 175 works in 2021, 170 in 2022, 164 in 2023, 185 in 2024 and 209 in 2025, 903 in total, of which 531 are open access and 5 highly cited.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Tunisia (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "government-sites",
      title: "Insurance, regulator and health assessment sites that could not be reached",
      plain:
        "The national health insurance fund (CNAM), the pharmacy and medicines directorate and the health assessment body INEAS did not answer plain requests on 11 November 2026. What Tunisia pays for cancer care, how medicines are approved and priced, and the national cancer plan are therefore not described here.",
      detail:
        "cnam.nat.tn and dpm.tn did not respond, ineas.tn returned a not-found error, and the Internet Archive's copy of the CNAM site did not load. The Ministry of Health's national cancer plan was not read. OnCo has not stated anything about these bodies from memory. A reader in Tunisia should ask the treating hospital and the CNAM regional office what applies.",
      links: [{ label: "WHO Global Health Expenditure Database: Tunisia (API)", url: WHO_GHED_API }],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Survival after a cancer diagnosis, radiotherapy capacity, screening programmes and the registries for the centre and south of the country are not on this page, because OnCo did not read them from a primary source.",
      detail:
        "Only the abstracts of the two northern registry papers were read, and only the title of the Monastir breast cancer paper. The Monastir registry's other papers, the IAEA's DIRAC radiotherapy database and IARC's detailed data sources page for Tunisia were not read.",
      links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Tunisia (PDF)", url: IARC_FACTSHEET }],
    },
  ],
  institutions: ["institut-salah-azaiez", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: ["proselica", "nct06687369", "nct04064060", "nct05894239"],
  papers: ["paper-khiari-northern-tunisia-incidence-2023-apjcp-2024", "paper-khiari-cervical-trends-northern-tunisia-bmc-cancer-2025"],
  people: ["senda-tounsi"],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the abstracts of two Northern Tunisia Cancer Registry papers through Europe PMC; and WHO's HPV coverage and health expenditure rows from its public data APIs. Tunisian government sites did not answer plain requests and are named as gaps. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The two papers added for this page carry their own sources.",
  verify:
    "This page has no Tunisian government source for insurance, medicines or screening. Ask the treating hospital, the Institut Salah Azaïez or the CNAM what is covered and available.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Tunisia (PDF)", url: IARC_FACTSHEET },
    { label: "ClinicalTrials.gov: cancer studies in Tunisia", url: CTGOV },
  ],
};
