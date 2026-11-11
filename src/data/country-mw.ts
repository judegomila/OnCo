import type { CountryDive } from "@/data/country-dive";

/**
 * Malawi deep dive: the hand-written cards for /countries/mw/ (wave 9). Every figure was read from the raw text of its
 * source on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Malawi (PDF text), the abstracts of the Malawi Cancer
 * Registry's papers and of the national screening programme's 2016 paper through Europe PMC, the Pharmacy and Medicines
 * Regulatory Authority's home page, WHO's Global Health Observatory API (HPV coverage and the 2021 country capacity
 * survey), the World Bank's health expenditure API and OnCo's own ClinicalTrials.gov participation data. Malawi is a
 * low-income country whose health spending is mostly paid for by donors; where a figure could not be read it is named
 * under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/454-malawi-fact-sheet.pdf";
const BLANTYRE = "https://doi.org/10.1002/ijc.30777";
const NATIONAL_2012 = "https://doi.org/10.1186/1756-0500-5-149";
const HIV_LINK = "https://doi.org/10.1093/cid/ciy960";
const VIA_2016 = "https://doi.org/10.1186/s12889-016-3530-y";
const PMRA = "https://www.pmra.mw";
const MOH = "https://www.health.gov.mw";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'MWI'";
const WHO_CCS = "https://ghoapi.azureedge.net/api/NCD_CCS_radio?$filter=SpatialDim%20eq%20'MWI'";
const WB_EXT = "https://api.worldbank.org/v2/country/MWI/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_OOP = "https://api.worldbank.org/v2/country/MWI/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Malawi&cond=cancer";

export const MW_DIVE: CountryDive = {
  iso2: "MW",
  iso3: "MWI",
  name: "Malawi",
  flag: "🇲🇼",
  asOf: "2026-11-11",
  title: "Cancer in Malawi",
  description:
    "Cancer in Malawi from Malawian sources: IARC's estimate of 23,246 new cancers and 13,676 deaths in 2024, two thirds in women, cervical cancer as the commonest cancer, Kaposi sarcoma and oesophageal cancer shaped by HIV and other causes, the Blantyre registry behind the estimates, a VIA screen-and-treat programme, HPV vaccination, health spending two thirds paid by donors, and one trial in our records with a site in Malawi.",
  lede:
    "IARC estimates 23,246 new cancers and 13,676 cancer deaths in Malawi in 2024, two thirds of the cancers in women. Cervical cancer alone is more than a quarter of all cancers. The registry in Blantyre has shown for decades how HIV shapes cancer here: Kaposi sarcoma has been the commonest cancer in men.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Malawi is 23,246 new cancers and 13,676 deaths, an age-standardised incidence of 171.1 per 100,000 (127.5 in men, 210.5 in women) and mortality of 109.5. IARC's fact sheet names a sub-national registry as its incidence source and its method as sub-national rates applied to the 2024 population. The fact sheet does not name the registry; the Malawi Cancer Registry in Blantyre is the population-based registry in the sources read here. Mortality is estimated from national incidence and modelled mortality-to-incidence ratios based on registry survival data (Survcan). So the national figure applies city rates to the whole country. The registry's own last published rates in the sources read here, for 2008 to 2010, were 169.8 per 100,000 in men and 238.7 in women; OnCo found no source explaining the difference from IARC's figures.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Malawi",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Malawi (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 23,000 new cancers a year; cervical cancer leads by far",
          plain:
            "IARC estimates 23,246 new cancers in Malawi in 2024, 15,368 in women and 7,878 in men. Cervical cancer is the commonest (6,773 cases, 3,844 deaths), followed by oesophageal cancer, Kaposi sarcoma, breast cancer and non-Hodgkin lymphoma. For every ten new cancers there are about six cancer deaths in the same year.",
          detail:
            "GLOBOCAN 2024 gives oesophageal cancer 2,642 cases and 2,162 deaths, Kaposi sarcoma 2,384 cases and 984 deaths, breast cancer 1,447 cases and 666 deaths, and non-Hodgkin lymphoma 1,252 cases and 589 deaths. The age-standardised incidence of cervical cancer is 93.4 per 100,000 women. A 2019 study linking the Blantyre registry to Malawi's two largest HIV treatment cohorts found 4,346 cancers among 28,576 people starting antiretroviral therapy in 2000 to 2010, with Kaposi sarcoma at 634.7 and cervical cancer at 36.6 per 100,000 person-years.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Malawi (PDF)", url: IARC_FACTSHEET },
            { label: "Horner et al., cancer among antiretroviral therapy users in Malawi (Clin Infect Dis 2019)", url: HIV_LINK },
          ],
        },
      ],
      tables: [
        {
          id: "mw-registry",
          title: "What Malawi's registry work has published",
          caption: "Cancers registered and age-standardised incidence per 100,000, as reported in each paper's abstract.",
          columns: [
            { key: "source", label: "Source (area)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "Cancers registered", numeric: true },
            { key: "men", label: "All cancers, men (ASR)", numeric: true },
            { key: "women", label: "All cancers, women (ASR)", numeric: true },
          ],
          rows: [
            { source: "Malawi Cancer Registry (Blantyre)", period: "2008 to 2010", cases: 3711, men: 169.8, women: 238.7 },
            { source: "Nationwide search of 81 facility registers", period: "2007 to 2010", cases: 18946, men: 56, women: 69 },
          ],
          note: "The nationwide count came from facility registers in one two-month exercise in 2010; its authors note under-reporting, and only 17.9% of its cases were confirmed by histology, so its rates are much lower than the population-based Blantyre rates. The Blantyre registry confirmed 47.5% by histology.",
          sources: [
            { label: "Chasimpha et al., three-year cancer incidence in Blantyre, Malawi 2008 to 2010 (Int J Cancer 2017)", url: BLANTYRE },
            { label: "Msyamboza et al., burden of cancer in Malawi (BMC Res Notes 2012)", url: NATIONAL_2012 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: the Blantyre registry",
      aside: { label: "Chasimpha et al., Blantyre 2008 to 2010 (Int J Cancer 2017)", url: BLANTYRE },
      cards: [
        {
          id: "registry-blantyre",
          title: "A city registry that finds cases beyond the laboratory",
          plain:
            "The Malawi Cancer Registry counts cancer among residents of Blantyre by active case finding, checking each record in the registry software CanReg. In 2008 to 2010 it registered 3,711 cancers. Fewer than half were confirmed by a laboratory, which its authors read as a sign that cases are being found outside laboratories too.",
          detail:
            "The 2017 paper by Chasimpha, Parkin, Masamba and Dzamalala reports Kaposi sarcoma as 40.5% of cancers in men and cervical cancer as 33.3% in women, oesophageal cancer rates among the highest in the world (30.9 per 100,000 in men and 22.1 in women), relatively low prostate cancer (16.4 per 100,000), and among children Burkitt lymphoma (32.5% of childhood cancers), Wilms tumour and Kaposi sarcoma. Histological verification rose to 47.5% from 42.4% in the late 1990s. OnCo found no website or more recent published report from the registry; see the gaps.",
          links: [
            { label: "Chasimpha et al., three-year cancer incidence in Blantyre, Malawi 2008 to 2010 (Int J Cancer 2017)", url: BLANTYRE },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: a health system funded mostly from abroad",
      aside: { label: "World Bank: external health expenditure, Malawi (API)", url: WB_EXT },
      cards: [
        {
          id: "financing",
          title: "Donors pay about two thirds of health spending",
          plain:
            "In 2023, according to the World Bank, external sources paid 65.5% of Malawi's current health spending, the government 12.8% and households 12.0% out of pocket. Total health spending was 6.5% of GDP, about 41 US dollars a person.",
          detail:
            "These are the World Bank's indicators drawn from WHO's Global Health Expenditure Database: external health expenditure (SH.XPD.EHEX.CH.ZS), domestic general government health expenditure (SH.XPD.GHED.CH.ZS) and out-of-pocket expenditure (SH.XPD.OOPC.CH.ZS), all as a share of current health expenditure, and current health expenditure per person of 41.27 US dollars. A low out-of-pocket share here does not mean cancer care is free or available: it reflects how much of the system donors fund. OnCo did not find a Malawian source setting out what public hospitals charge for cancer treatment or which cancer medicines are on the national essential list; see the gaps.",
          links: [
            { label: "World Bank: external health expenditure, Malawi (API)", url: WB_EXT },
            { label: "World Bank: out-of-pocket expenditure, Malawi (API)", url: WB_OOP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines",
      aside: { label: "Pharmacy and Medicines Regulatory Authority", url: PMRA },
      cards: [
        {
          id: "pmra",
          title: "The Pharmacy and Medicines Regulatory Authority, under a 2019 law",
          plain:
            "Medicines in Malawi are regulated by the Pharmacy and Medicines Regulatory Authority under the PMRA Act of 2019. It keeps public registers of approved products, premises, personnel and clinical trials.",
          detail:
            "The authority's website publishes the Act, its regulations, guidelines, application forms and fee schedule, and a strategic plan. OnCo did not read its registration guidelines, so this page does not say whether it relies on approvals by other regulators or how long registration takes.",
          links: [{ label: "Pharmacy and Medicines Regulatory Authority", url: PMRA }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Msyamboza et al., cervical screening in Malawi (BMC Public Health 2016)", url: VIA_2016 },
      cards: [
        {
          id: "via",
          title: "Screen-and-treat for cervical cancer, and high HPV vaccine coverage",
          plain:
            "The Ministry of Health's cervical cancer programme uses visual inspection with acetic acid and treats precancerous changes with cryotherapy. Between 2011 and 2015 it grew from 75 to 130 sites and screened 145,015 women. WHO estimates that 82% of girls in the target age group were vaccinated against HPV in 2025.",
          detail:
            "The 2016 paper reports yearly coverage rising from 9.3% to 26.5%, 5.1% of women VIA positive and 4.3% with suspected cancer, and higher positivity in women with HIV (8.8% against 5.0%). WHO's 2021 country capacity survey lists VIA as the main screening method and records no national breast cancer screening programme. WHO's HPV coverage estimates for Malawi were 84% in 2019, 80% in 2020, 13% in 2021 and 2022, 68% in 2023, 69% in 2024 and 82% in 2025.",
          links: [
            { label: "Msyamboza et al., cervical screening in Malawi 2011 to 2015 (BMC Public Health 2016)", url: VIA_2016 },
            { label: "WHO Global Health Observatory: HPV coverage, Malawi (API)", url: WHO_HPV },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Malawi does",
      title: "What Malawi does differently",
      cards: [
        {
          id: "hiv-cancer",
          title: "Cancer care built alongside HIV care",
          plain:
            "Because so much cancer in Malawi is linked to HIV, researchers and the Ministry have tied cancer work to HIV services: the screening programme is integrated with family planning and HIV treatment, and the registry has been linked to HIV treatment records to measure cancer among people on antiretroviral therapy.",
          detail:
            "The 2016 screening paper describes integrating VIA with family planning services and the HIV antiretroviral therapy programme. The 2019 linkage study concluded that integrated cancer screening and management in HIV clinics, especially for Kaposi sarcoma and cervical cancer, remain priorities. Malawian sites took part in ACTG A5263, an international trial in people with HIV and advanced Kaposi sarcoma that found paclitaxel with antiretroviral therapy better than oral etoposide or bleomycin with vincristine.",
          links: [
            { label: "Horner et al., cancer among antiretroviral therapy users in Malawi (Clin Infect Dis 2019)", url: HIV_LINK },
            { label: "ACTG A5263 on OnCo", url: "/trials/actg-a5263/" },
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
          title: "One trial in OnCo's records has a site in Malawi",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, one cancer trial in our records lists a site in Malawi: ACTG A5263, a completed trial in AIDS-associated Kaposi sarcoma. That reflects the trials OnCo holds, mostly large trials of new medicines, not all research in Malawi.",
          detail:
            "Malawian cancer research in the sources read for this page is mostly registry, screening and HIV linkage work, published with Malawian authors and international partners. The Pharmacy and Medicines Regulatory Authority keeps its own clinical trial register, and the ClinicalTrials.gov search linked here shows cancer studies with a site in Malawi.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Malawi (search)", url: CTGOV },
            { label: "ACTG A5263 on OnCo", url: "/trials/actg-a5263/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy",
      title: "Radiotherapy and the cancer workforce are not counted here",
      plain:
        "WHO's 2021 country capacity survey records radiotherapy and chemotherapy as generally available in Malawi's public sector, but OnCo found no Malawian source it could read giving the number of radiotherapy machines, oncologists or cancer centres, or when they opened.",
      detail:
        "The IAEA's directory of radiotherapy centres works only in a browser. The Ministry of Health and Sanitation's website lists no cancer policy among its downloads that OnCo could find, and OnCo's web search budget was spent during this round, so documents could only be reached by known addresses. WHO's survey also reports oral morphine as not generally available in the public health sector.",
      links: [
        { label: "WHO Global Health Observatory: radiotherapy availability, Malawi (API)", url: WHO_CCS },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "unread-sources",
      title: "Other sources not found",
      plain:
        "OnCo did not find a national cancer control plan, the national essential medicines list, rules on what public hospitals charge for cancer care, or a registry report after 2010 that it could read. The Ministry's home page, read on 11 November 2026, links to none of them.",
      detail:
        "The registry has no website of its own; the most recent registry figures here are for 2008 to 2010. The cervical screening figures are for 2011 to 2015. Newer programme data, including any move to HPV testing or thermal ablation, were not found in the sources read.",
      links: [
        { label: "Ministry of Health and Sanitation, Malawi", url: MOH },
      ],
    },
  ],
  institutions: ["ministry-of-health-malawi", "malawi-cancer-registry", "pmra-malawi", "iarc", "who"],
  companies: [],
  drugs: ["paclitaxel"],
  trials: ["actg-a5263"],
  papers: ["paper-chasimpha-blantyre-incidence-2008-2010-ijc-2017", "paper-msyamboza-malawi-national-cancer-burden-bmcrn-2012", "paper-msyamboza-malawi-cervical-screening-2011-2015-bmcph-2016"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Malawi; the abstracts of the registry, linkage and screening papers through Europe PMC; the Pharmacy and Medicines Regulatory Authority's website; WHO's Global Health Observatory; and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records (the Ministry, the registry, the regulator and three papers) carry their own sources.",
  verify:
    "National figures are IARC estimates built on one city's registry. Which hospitals give radiotherapy and chemotherapy, and which medicines are in stock, change faster than published papers; ask the referring hospital or district health office.",
  verifyLinks: [
    { label: "Ministry of Health and Sanitation, Malawi", url: MOH },
    { label: "Pharmacy and Medicines Regulatory Authority", url: PMRA },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Malawi (PDF)", url: IARC_FACTSHEET },
  ],
};
