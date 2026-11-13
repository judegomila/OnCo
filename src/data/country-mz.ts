import type { CountryDive } from "@/data/country-dive";

/**
 * Mozambique deep dive: the hand-written cards for /countries/mz/ (wave 9). Every figure was read from the raw text of
 * its source on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Mozambique (PDF text), the African Cancer Registry
 * Network's member pages for the Maputo and Beira registries, the abstracts of three registry papers through Europe PMC,
 * the medicines regulator ANARME's home page and its news item of 10 September 2026 (Portuguese), WHO's Global Health
 * Observatory API (HPV coverage and the 2021 country capacity survey), the World Bank's health expenditure API and
 * OnCo's ClinicalTrials.gov participation data. The Ministry of Health's website did not answer; that and other gaps
 * are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/508-mozambique-fact-sheet.pdf";
const AFCRN_MAPUTO = "https://afcrn.org/index.php/membership/membership-list/143-maputo";
const AFCRN_BEIRA = "https://afcrn.org/index.php/membership/membership-list/105-beira";
const MAPUTO_2015 = "https://doi.org/10.1371/journal.pone.0130469";
const MAPUTO_2019 = "https://doi.org/10.1097/cej.0000000000000457";
const CRC_2024 = "https://doi.org/10.3332/ecancer.2024.1693";
const ANARME = "https://www.anarme.gov.mz/";
const ANARME_ML3 = "https://anarme.gov.mz/conselho-coordenador-de-saude-destaca-nivel-de-maturidade-3-alcancado-pela-anarme/";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'MOZ'";
const WHO_CCS = "https://ghoapi.azureedge.net/api/NCD_CCS_cervicalcancermethod?$filter=SpatialDim%20eq%20'MOZ'";
const WB_EXT = "https://api.worldbank.org/v2/country/MOZ/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Mozambique&cond=cancer";

export const MZ_DIVE: CountryDive = {
  iso2: "MZ",
  iso3: "MOZ",
  name: "Mozambique",
  flag: "🇲🇿",
  asOf: "2026-11-11",
  title: "Cancer in Mozambique",
  description:
    "Cancer in Mozambique from Mozambican sources: IARC's estimate of 25,058 new cancers and 14,645 deaths in 2024, cervical cancer and Kaposi sarcoma as the commonest, the Maputo and Beira registries behind the estimates, a regulator rated at WHO maturity level 3, health spending more than half paid by donors, high HPV vaccine coverage, and no trial in our records with a site in Mozambique.",
  lede:
    "IARC estimates 25,058 new cancers and 14,645 cancer deaths in Mozambique in 2024, six in ten of the cancers in women. Cervical cancer is the commonest cancer and the commonest cause of cancer death, and Kaposi sarcoma comes second. Two city registries, in Maputo and Beira, are the country's direct counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Mozambique is 25,058 new cancers and 14,645 deaths, an age-standardised incidence of 119.1 per 100,000 (108.6 in men, 129.8 in women) and mortality of 75.2. IARC's fact sheet names a sub-national registry as its incidence source and its method as sub-national rates applied to the 2024 population; mortality comes from national incidence and modelled mortality-to-incidence ratios based on registry survival data (Survcan). The fact sheet does not name the registry; Mozambique's members of the African Cancer Registry Network are the Maputo City and Beira registries, so the national figure applies city rates to the whole country. The Maputo registry measured cervical cancer at 32.4 per 100,000 women in 2015 to 2016; IARC's national estimate is 45.7.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Mozambique",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Mozambique (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 25,000 new cancers a year; cervical cancer and Kaposi sarcoma lead",
          plain:
            "IARC estimates 25,058 new cancers in Mozambique in 2024, 15,512 in women and 9,546 in men. Cervical cancer is the commonest (5,381 cases, 3,090 deaths), followed by Kaposi sarcoma (4,308 cases, 1,713 deaths), oesophageal, breast and liver cancer. There are about six cancer deaths for every ten new cancers.",
          detail:
            "GLOBOCAN 2024 gives oesophageal cancer 1,781 cases and 1,531 deaths, breast cancer 1,744 cases and 823 deaths, and liver cancer 1,616 cases and 1,363 deaths. The age-standardised incidence of cervical cancer is 45.7 per 100,000 women. Registry papers show cancers linked to changing lifestyles rising: in Maputo prostate cancer rose 11.3% a year and breast cancer 6.5% a year between 1991 and 2008, and colorectal cancer rose in Beira between 2009 and 2020.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Mozambique (PDF)", url: IARC_FACTSHEET },
            { label: "Lorenzoni et al., trends in cancer incidence in Maputo 1991 to 2008 (PLoS One 2015)", url: MAPUTO_2015 },
            { label: "Selemane et al., colorectal cancer in Mozambique (ecancer 2024)", url: CRC_2024 },
          ],
        },
      ],
      tables: [
        {
          id: "mz-registry",
          title: "What the Maputo registry has published",
          caption: "Cancers registered in Maputo City and age-standardised incidence per 100,000 (world standard), as reported in each paper's abstract.",
          columns: [
            { key: "period", label: "Years" },
            { key: "cases", label: "Cancers registered", numeric: true },
            { key: "cervix", label: "Cervix (women)", numeric: true },
            { key: "prostate", label: "Prostate (men)", numeric: true },
            { key: "breast", label: "Breast (women)", numeric: true },
          ],
          rows: [
            { period: "1991 to 2008", cases: 12674, cervix: null, prostate: null, breast: null },
            { period: "2003 to 2008", cases: null, cervix: 62.0, prostate: 61.7, breast: null },
            { period: "2015 to 2016", cases: 1707, cervix: 32.4, prostate: 24.5, breast: 11.8 },
          ],
          note: "The 2015 to 2016 rates come from the Maputo Central Hospital registry, on the assumption that most city residents with cancer were identified at the hospital. The two papers count cases in different ways, so they may not be strictly comparable, and the lower rates in the later series should not be read as a real fall in cancer.",
          sources: [
            { label: "Lorenzoni et al., trends in cancer incidence in Maputo 1991 to 2008 (PLoS One 2015)", url: MAPUTO_2015 },
            { label: "Carrilho et al., cancer incidence in Maputo 2015 to 2016 (Eur J Cancer Prev 2019)", url: MAPUTO_2019 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: two city registries",
      aside: { label: "African Cancer Registry Network: Maputo", url: AFCRN_MAPUTO },
      cards: [
        {
          id: "registries",
          title: "Maputo, about 1.2 million people, and Beira, about 458,000",
          plain:
            "Mozambique has no national cancer registry in the sources read. The Maputo registry covers the capital, about 1.2 million people in 2014, and since 2015 has merged Maputo Central Hospital's registry with the city's population registry. The Beira registry, founded in 2005 at Beira Central Hospital, covers about 458,000 people.",
          detail:
            "The African Cancer Registry Network's page for Maputo describes passive and active registration, coding checked by pathologists, CanReg 5, death certificates mentioning cancer from the mortuary, and plans to add deaths from the civil registry. Its page for Beira says the registry was founded after its director trained in Lyon and Goiânia, that staff posts once paid by the hospital lapsed, and that an IARC grant from 2008 supported salaries, equipment and running costs, with some government help for indirect costs. Beira had 443,369 people at the 2007 census and an estimated 457,799 in 2013.",
          links: [
            { label: "African Cancer Registry Network: Maputo", url: AFCRN_MAPUTO },
            { label: "African Cancer Registry Network: Beira", url: AFCRN_BEIRA },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: a health system funded mostly from abroad",
      aside: { label: "World Bank: external health expenditure, Mozambique (API)", url: WB_EXT },
      cards: [
        {
          id: "financing",
          title: "Donors pay more than half of health spending",
          plain:
            "In 2023, according to the World Bank, external sources paid 57.7% of Mozambique's current health spending, the government 26.5% and households 10.4% out of pocket. Health spending was 8.5% of GDP, about 53 US dollars a person.",
          detail:
            "These are the World Bank's indicators drawn from WHO's Global Health Expenditure Database: external health expenditure, domestic general government health expenditure and out-of-pocket expenditure as shares of current health expenditure, and current health expenditure per person of 52.96 US dollars. A low out-of-pocket share does not mean cancer care is free or available. OnCo could not read the Ministry of Health's own pages on what public hospitals charge for cancer care or which cancer medicines are on the national list, because its website did not answer; see the gaps.",
          links: [
            { label: "World Bank: external health expenditure, Mozambique (API)", url: WB_EXT },
            { label: "World Bank: out-of-pocket expenditure, Mozambique (API)", url: "https://api.worldbank.org/v2/country/MOZ/indicator/SH.XPD.OOPC.CH.ZS?format=json" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines",
      aside: { label: "ANARME", url: ANARME },
      cards: [
        {
          id: "anarme",
          title: "ANARME, rated at WHO maturity level 3",
          plain:
            "Medicines in Mozambique are authorised by the Autoridade Nacional Reguladora de Medicamento (ANARME). Its marketing authorisation can come by registration, notification, or special and emergency import. In September 2026 the Minister of Health named its attainment of WHO maturity level 3 as one of the sector's main achievements.",
          detail:
            "ANARME's news item of 10 September 2026 reports the Minister, Ussene Isse, highlighting maturity level 3 at the 51st Health Coordinating Council in Beira, and says the level shows consolidated structures, processes and skills for regulating medicines. Its website lists services covering licensing of manufacturers, importers and pharmacies, pharmacovigilance and clinical trials, and quality testing. OnCo did not read its registration guidelines, so this page does not say whether it relies on other regulators' approvals for cancer medicines or how long registration takes.",
          links: [
            { label: "ANARME: home page (Portuguese)", url: ANARME },
            { label: "ANARME: maturity level 3 highlighted at the Health Coordinating Council (Portuguese)", url: ANARME_ML3 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Global Health Observatory: HPV coverage, Mozambique (API)", url: WHO_HPV },
      cards: [
        {
          id: "hpv-via",
          title: "VIA screening and HPV vaccine coverage of 55% to 94% since 2021",
          plain:
            "WHO's 2021 country capacity survey records a national cervical screening programme in Mozambique using visual inspection with acetic acid (VIA), and a national breast screening programme. WHO estimates that 74% of girls in the target age group were vaccinated against HPV in 2025.",
          detail:
            "WHO's HPV coverage estimates for Mozambique's primary target cohort were 55% in 2021, 94% in 2022, 68% in 2023, 89% in 2024 and 74% in 2025. The survey answers are the country's own reports to WHO; OnCo did not read a Ministry of Health description of either screening programme, its ages or its reach.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Mozambique (API)", url: WHO_HPV },
            { label: "WHO Global Health Observatory: cervical screening method, Mozambique (API)", url: WHO_CCS },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Mozambique does",
      title: "What Mozambique does differently",
      cards: [
        {
          id: "registry-merge",
          title: "Registries based in central hospitals, one kept going by an IARC grant",
          plain:
            "Mozambique's cancer counts depend on two registries based in its central hospitals. In Maputo the hospital and city registries were merged in 2015 to share staff time, and Maputo Central Hospital pays the registrars; in Beira, where hospital-funded posts lapsed, an IARC grant from 2008 has paid for salaries, equipment and running costs.",
          detail:
            "The registries' papers compare Maputo's rates for 2015 to 2016 with 1956 to 1961: prostate cancer rose 172.2% and breast cancer 237.1%, while bladder and liver cancer fell. The 2024 colorectal paper used both registries, plus pathology and hospital registries, and calls for early diagnosis and investment in health infrastructure.",
          links: [
            { label: "Carrilho et al., cancer incidence in Maputo 2015 to 2016 (Eur J Cancer Prev 2019)", url: MAPUTO_2019 },
            { label: "African Cancer Registry Network: Beira", url: AFCRN_BEIRA },
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
          title: "No trial in OnCo's records has a site in Mozambique",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, none of the cancer trials in our records lists a site in Mozambique. The Mozambican research on this page is registry work. That reflects the trials OnCo holds, mostly large trials of new medicines, not every study in Mozambique.",
          detail:
            "OnCo's participation data cover 5,899 trials. The ClinicalTrials.gov search linked here shows any cancer studies registered with a site in Mozambique; ANARME's website lists clinical trial oversight among its services.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Mozambique (search)", url: CTGOV },
            { label: "ANARME: home page (Portuguese)", url: ANARME },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "ministry",
      title: "The Ministry of Health's website did not answer",
      plain:
        "OnCo could not reach the Ministry of Health (misau.gov.mz) on 11 November 2026, so this page has no national cancer plan, no rules on what public hospitals charge, no essential medicines list and no official description of the screening programmes.",
      detail:
        "Without the Ministry's own documents, the health system cards rely on World Bank and WHO data. OnCo's web search budget was spent during this round, so other copies of Ministry documents could not be looked for.",
      links: [{ label: "Ministry of Health, Mozambique", url: "https://www.misau.gov.mz/" }],
    },
    {
      id: "radiotherapy",
      title: "Radiotherapy and the cancer workforce are not counted here",
      plain:
        "WHO's 2021 country capacity survey records radiotherapy and chemotherapy as generally available in Mozambique's public sector, but OnCo found no source it could read giving the number of radiotherapy machines or oncologists, or where they are.",
      detail:
        "The IAEA's directory of radiotherapy centres works only in a browser. A 2014 paper comparing cancer incidence and radiotherapy in Mozambique and Sweden has no abstract in Europe PMC and was not used. WHO's survey also reports oral morphine as not generally available in the public health sector.",
      links: [
        { label: "WHO Global Health Observatory: radiotherapy availability, Mozambique (API)", url: "https://ghoapi.azureedge.net/api/NCD_CCS_radio?$filter=SpatialDim%20eq%20'MOZ'" },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["maputo-cancer-registry", "beira-cancer-registry", "anarme-mozambique", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-lorenzoni-maputo-incidence-trends-1991-2008-plosone-2015", "paper-carrilho-maputo-incidence-2015-2016-ejcp-2019"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Mozambique; the African Cancer Registry Network's pages for Maputo and Beira; the registry papers' abstracts through Europe PMC; ANARME's own pages in Portuguese; WHO's Global Health Observatory; and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records (the two registries, ANARME and two papers) carry their own sources.",
  verify:
    "National figures are IARC estimates built on city registries. Where treatment is available and what it costs change faster than published papers; ask the provincial or central hospital that receives the referral.",
  verifyLinks: [
    { label: "ANARME", url: ANARME },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Mozambique (PDF)", url: IARC_FACTSHEET },
    { label: "African Cancer Registry Network: Maputo", url: AFCRN_MAPUTO },
  ],
};
