import type { CountryDive } from "@/data/country-dive";

/**
 * Angola deep dive: the hand-written cards for /countries/ao/ (wave 8). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Angola; the African Cancer
 * Registry Network's page for the Lubango Cancer Registry; papers from Angola found and resolved through Europe PMC
 * with their abstracts read; and WHO's HPV coverage and health expenditure rows from its public data APIs. The
 * Ministry of Health's site answered but its pages read held no cancer material, and the medicines regulator's site
 * shows content only with JavaScript; both are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/24-angola-fact-sheet.pdf";
const AFCRN_LUBANGO = "https://afcrn.org/index.php/membership/membership-list/179-angola-lubango";
const IACC_REGISTRY = "https://doi.org/10.1186/s13027-019-0249-2";
const BREAST_SURVIVAL = "https://doi.org/10.3934/mbe.2026068";
const GONCO = "https://doi.org/10.3332/ecancer.2050";
const EDUCATION = "https://doi.org/10.1007/s13187-024-02444-7";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'AGO'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_GHED_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'AGO'";
const CTGOV = "https://clinicaltrials.gov/search?country=Angola&cond=cancer";

export const AO_DIVE: CountryDive = {
  iso2: "AO",
  iso3: "AGO",
  name: "Angola",
  flag: "🇦🇴",
  asOf: "2026-11-11",
  title: "Cancer in Angola",
  description:
    "Cancer in Angola: IARC's estimate of 27,511 new cancers and 16,190 deaths in 2024, built on a subnational registry; breast and cervical cancer as the commonest cancers and causes of cancer death; the national cancer institute's hospital registry in Luanda and the Lubango population registry founded in 2022; a median breast cancer survival of 560 days at the national institute; HPV vaccination first reported in 2025 at 61% of girls; and what OnCo could not find.",
  lede:
    "IARC estimates 27,511 new cancers and 16,190 cancer deaths in Angola in 2024. Breast and cervical cancer are the commonest cancers and the leading causes of cancer death, and together are about three in ten of all cancers. Angola's cancer data come from a hospital registry in Luanda and a population registry in Lubango founded in 2022.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Angola is 27,511 new cancers and 16,190 deaths, an age-standardised incidence of 120.8 per 100,000 (125.6 in men, 119.5 in women) and mortality of 76.3. IARC's incidence method is subnational registry rates applied to the 2024 population, and its mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. The fact sheet does not name the registry; the population-based registry for Angola listed by the African Cancer Registry Network is Lubango's, founded in 2022 for a city of about one million. The authors of the Luanda hospital registry warned in 2019 that GLOBOCAN's estimates for Angola may deviate from reality.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Angola",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Angola (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 27,500 new cancers a year, led by breast and cervical cancer",
          plain:
            "IARC estimates 27,511 new cancers in Angola in 2024, 14,965 in women and 12,546 in men. Breast cancer is the commonest, then cervical and prostate cancer, and the same three cause the most deaths. Kaposi sarcoma, a cancer linked to HIV, is seventh.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,614 breast cancers (2,139 deaths), 3,361 cervical cancers (2,058 deaths), 2,217 prostate cancers (1,355 deaths), 1,172 colorectal cancers, 1,159 leukaemias, 981 non-Hodgkin lymphomas and 850 Kaposi sarcomas. IARC's age-standardised incidence is 37.1 per 100,000 women for breast cancer, 30.5 for cervical cancer and 32.4 per 100,000 men for prostate cancer. An estimated 59,105 people are living within five years of a diagnosis. Deaths divided by new cases give 0.59.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Angola (PDF)", url: IARC_FACTSHEET }],
        },
      ],
      tables: [
        {
          id: "iacc-registry",
          title: "What the national cancer institute's hospital registry recorded, 2012 to 2016",
          caption: "Share of 5,609 valid new cancers recorded by the Instituto Angolano de Controlo do Cancro's hospital-based registry, Luanda, 2012 to 2016",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "share", label: "Share of all cases, %", numeric: true },
          ],
          rows: [
            { site: "Breast", share: 21.4 },
            { site: "Cervix", share: 16.8 },
            { site: "Prostate", share: 7.1 },
            { site: "Non-Hodgkin lymphoma", share: 4.5 },
            { site: "Kaposi sarcoma", share: 4.3 },
          ],
          note: "Hospital-based: patients who reached the institute and its partner facilities in Luanda, not the whole population. Non-melanoma skin cancers excluded. 9.7% of cases were in children under 15.",
          sources: [{ label: "Miguel et al., the IACC hospital-based cancer registry (Infect Agent Cancer 2019)", url: IACC_REGISTRY }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "A hospital registry in Luanda and a new population registry in Lubango",
      cards: [
        {
          id: "registries",
          title: "The national institute's records, and Lubango's registry from 2022",
          plain:
            "Angola's longest-running cancer records are the hospital-based registry of the Instituto Angolano de Controlo do Cancro in Luanda, which counted 5,609 cancers in 2012 to 2016. A population-based registry for the city of Lubango was founded on 4 February 2022.",
          detail:
            "The 2019 paper from the Luanda registry describes it as the oldest and most organised hospital-based registry in Angola, covering cancers treated in several Luanda hospital facilities, and calls for a population-based registry in Luanda with stronger quality control. The Lubango Cancer Registry's page on the African Cancer Registry Network says it was established at a ceremony with the Governor of Huíla, is directed by Dr Maria Lina Antunes with five staff, codes cases in ICD-O-3 into CanReg5 from clinical records, pathology and radiology reports and death certificates, and covers a projected population of 1,020,558. It reports difficulties with data quality from limited knowledge of oncology and of pathology.",
          links: [
            { label: "Miguel et al. (Infect Agent Cancer 2019)", url: IACC_REGISTRY },
            { label: "African Cancer Registry Network: Lubango Cancer Registry", url: AFCRN_LUBANGO },
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
          title: "Out-of-pocket spending at about a third of health spending",
          plain:
            "WHO estimates that out-of-pocket payments were 32.5% of Angola's current health expenditure in 2023, up from 26.1% in 2021. OnCo did not find an Angolan government source on what cancer patients pay or which cancer medicines are provided free, so this page does not describe it.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending of 26.1% of current health expenditure in 2021, 30.0% in 2022 and 32.5% in 2023. A national share does not show what a cancer patient pays for diagnosis, surgery, radiotherapy or medicines. The Ministry of Health's site answered a plain request on 11 November 2026, but requests to its search for cancer and HPV returned the unchanged home page, so its cancer content could not be searched. A 2026 analysis of women with breast cancer at the national institute found a median survival of 560 days after diagnosis, with stage of disease among the factors that mattered.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Angola (API)", url: WHO_GHED_API },
            { label: "Jerónimo et al., survival of women with breast cancer in Angola (Math Biosci Eng 2026)", url: BREAST_SURVIVAL },
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
          title: "The medicines regulator's site needs JavaScript to show anything",
          plain:
            "Angola's medicines are regulated by a national agency, but its website shows content only with JavaScript, which OnCo's plain request on 11 November 2026, so OnCo cannot describe from a primary source how a cancer medicine is approved or which are registered in Angola.",
          detail:
            "OnCo requested armed.gov.ao, the site of the Agência Reguladora de Medicamentos e Tecnologias de Saúde, on 11 November 2026 and received only a JavaScript application shell with the agency's name. No other primary source on the approval of cancer medicines in Angola was read. Whether a medicine is registered and available should be checked with the treating hospital. No trial in OnCo's records lists a site in Angola.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Angola (search)", url: CTGOV }],
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
          title: "HPV vaccination appears in WHO's data in 2025, at 61% of girls",
          plain:
            "WHO and UNICEF's figures for Angola show HPV vaccination coverage of 61% of girls in 2025, the first year with a figure, for both the first and the last dose. Cervical cancer is Angola's second commonest cancer.",
          detail:
            "WHO's immunisation data for Angola have no HPV coverage figure before 2025; for 2025 they give 61% for the first and the last dose in girls. IARC estimates 3,361 cervical cancers and 2,058 cervical cancer deaths in Angola in 2024. OnCo did not find a primary source on cervical or breast screening in Angola.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage, Angola (API)", url: WHO_HPV_API },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Angola (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Angola",
      cards: [
        {
          id: "building-oncology",
          title: "Building oncology outside Luanda, and teaching it",
          plain:
            "A 2025 paper describes cancer care in Portuguese-speaking African countries as fragile and highly centralised. Published work describes a new oncology unit and research group in Lubango, launched with support from a Portuguese programme, and a proposal to make oncology a compulsory subject in Angolan medical schools, which have none.",
          detail:
            "A 2025 paper on the GONCO programme, from Portugal, describes pilot projects in Lubango and in Mindelo, Cape Verde, built with local teams around multidisciplinary tumour boards, coordination and training; in Lubango it helped launch the oncology unit and research group. It names hierarchical barriers, unreliable digital infrastructure and unsustainable funding as challenges. A 2024 paper by the Angolan Oncology Research Group says Angola's medical schools have no compulsory oncology discipline and proposes an undergraduate oncology programme. Together with the Lubango registry founded in 2022, these describe cancer services being built outside the capital.",
          links: [
            { label: "GONCO programme in Angola and Cape Verde (ecancermedicalscience 2025)", url: GONCO },
            { label: "Oncology education in Angola (J Cancer Educ 2024)", url: EDUCATION },
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
          title: "No trial in OnCo's records has a site in Angola",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Angola. OpenAlex counts 7 oncology papers with an Angola-based author in 2025.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and none lists Angola; that reflects the trials OnCo holds, not every study in Angola. OpenAlex, counting works whose primary topic is oncology and a paper for every country among its authors' affiliations, gives Angola 9 works in 2021, 2 in 2022, 6 in 2023, 6 in 2024 and 7 in 2025, 30 in total, of which 24 are open access. Most of the Angolan research on this page was written with partners in Portugal.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Angola (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "government-sources",
      title: "Ministry, regulator and cancer plan",
      plain:
        "OnCo did not find on primary sources that answered a plain request: Angola's national cancer plan, what the public health system pays for cancer care, which cancer medicines are on the essential medicines list, how medicines are approved, or radiotherapy capacity.",
      detail:
        "The Ministry of Health's search returned only its home page; the medicines regulator's site shows content only with JavaScript. The national cancer institute has no website that OnCo found. The IAEA's DIRAC radiotherapy database and any IAEA imPACT review of Angola were not read.",
      links: [{ label: "WHO Global Health Expenditure Database: Angola (API)", url: WHO_GHED_API }],
    },
    {
      id: "unread-sources",
      title: "Recent registry counts and survival",
      plain:
        "No population-based counts for Angola newer than IARC's estimate, and no population survival figures, were found. The Luanda registry's figures end in 2016 and Lubango's registry has published no counts that OnCo found.",
      detail:
        "Only the abstracts of the papers on this page were read. The breast cancer survival analysis does not give the number of women in its abstract. The 2015 paper on cancer epidemiology from Luanda's national oncology centre was listed in Europe PMC but not read.",
      links: [{ label: "African Cancer Registry Network: Lubango Cancer Registry", url: AFCRN_LUBANGO }],
    },
  ],
  institutions: ["iacc-angola", "lubango-cancer-registry", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-miguel-iacc-hospital-registry-luanda-iac-2019", "paper-jeronimo-breast-cancer-survival-angola-mbe-2026"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; the African Cancer Registry Network's page for the Lubango registry; the abstracts of Angolan papers found through Europe PMC; and WHO's HPV coverage and health expenditure rows from its public data APIs. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the national cancer institute, the Lubango registry and two papers) carry their own sources.",
  verify:
    "This page has no Angolan government source for the cost of care, medicines or screening. Ask the treating hospital what is available and what it costs.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Angola (PDF)", url: IARC_FACTSHEET },
    { label: "African Cancer Registry Network: Lubango Cancer Registry", url: AFCRN_LUBANGO },
  ],
};
