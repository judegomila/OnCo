import type { CountryDive } from "@/data/country-dive";

/**
 * Madagascar deep dive: the hand-written cards for /countries/mg/ (wave 9). Every figure was read from the raw text of its
 * source on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Madagascar (PDF text), the abstracts of three papers
 * through Europe PMC, WHO's Global Health Observatory API (HPV coverage and the 2021 country capacity survey), the World
 * Bank's health expenditure API and OnCo's ClinicalTrials.gov participation data. The Ministry of Public Health's and the
 * medicines agency's websites did not answer, so this page rests on international and published sources; that is
 * named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/450-madagascar-fact-sheet.pdf";
const HPV_2019 = "https://doi.org/10.1371/journal.pone.0220632";
const VIA_2017 = "https://doi.org/10.1016/j.jogoh.2017.03.003";
const FGS_2023 = "https://doi.org/10.1186/s40249-023-01139-3";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'MDG'";
const WHO_RADIO = "https://ghoapi.azureedge.net/api/NCD_CCS_radio?$filter=SpatialDim%20eq%20'MDG'";
const WHO_CHEMO = "https://ghoapi.azureedge.net/api/NCD_CCS_chemo?$filter=SpatialDim%20eq%20'MDG'";
const WHO_PBCR = "https://ghoapi.azureedge.net/api/NCD_CCS_PBCR?$filter=SpatialDim%20eq%20'MDG'";
const WB_EXT = "https://api.worldbank.org/v2/country/MDG/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_PC = "https://api.worldbank.org/v2/country/MDG/indicator/SH.XPD.CHEX.PC.CD?format=json";
const CTGOV = "https://clinicaltrials.gov/search?country=Madagascar&cond=cancer";

export const MG_DIVE: CountryDive = {
  iso2: "MG",
  iso3: "MDG",
  name: "Madagascar",
  flag: "🇲🇬",
  asOf: "2026-11-11",
  title: "Cancer in Madagascar",
  description:
    "Cancer in Madagascar from published and international sources: IARC's estimate of 21,354 new cancers and 13,019 deaths in 2024, made without any Malagasy registry, cervical cancer as the commonest, health spending of about 17 US dollars a person, WHO's record that radiotherapy and chemotherapy were not generally available in the public sector in 2021, WHO's first HPV vaccination coverage figure in 2025, cervical screening studies, and no trial in our records with a site in Madagascar.",
  lede:
    "IARC estimates 21,354 new cancers and 13,019 cancer deaths in Madagascar in 2024, but Madagascar has no cancer registry, so the estimate is built from neighbouring countries' data. Cervical cancer is the commonest cancer and the commonest cause of cancer death. In WHO's 2021 survey the country reported that radiotherapy, chemotherapy and pathology were not generally available in the public sector.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Madagascar is 21,354 new cancers and 13,019 deaths, an age-standardised incidence of 99.5 per 100,000 (93.7 in men, 106.4 in women) and mortality of 64.4. IARC's fact sheet gives no country-specific incidence source and names its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is estimated from that incidence and modelled mortality-to-incidence ratios based on registry survival data (Survcan). In WHO's 2019 and 2021 country capacity surveys Madagascar reported no population-based cancer registry. So none of these figures is a Malagasy count, and the real burden is not known.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Madagascar",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Madagascar (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 21,000 new cancers a year, estimated from neighbours' data",
          plain:
            "IARC estimates 21,354 new cancers in Madagascar in 2024, 12,006 in women and 9,348 in men. Cervical cancer is the commonest (4,071 cases, 2,338 deaths), followed by Kaposi sarcoma, oesophageal, prostate and breast cancer. Because there is no Malagasy registry, these are modelled figures, not counts.",
          detail:
            "GLOBOCAN 2024 gives Kaposi sarcoma 2,504 cases and 989 deaths, oesophageal cancer 1,832 cases and 1,632 deaths, prostate cancer 1,675 cases and 1,008 deaths, breast cancer 1,666 cases, and liver cancer 1,064 deaths. The age-standardised incidence of cervical cancer is 35.9 per 100,000 women. A 2023 study of 302 women in the rural district of Marovoay found 42.7% positive for HPV and 62.6% with female genital schistosomiasis, a parasitic infection, and its authors call for integrated women's health services at primary care level.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Madagascar (PDF)", url: IARC_FACTSHEET },
            { label: "Kutz et al., schistosomiasis, HPV and cervical cancer in rural Madagascar (Infect Dis Poverty 2023)", url: FGS_2023 },
          ],
        },
      ],
      tables: [
        {
          id: "mg-capacity",
          title: "What Madagascar reported to WHO about cancer services in 2021",
          caption: "Madagascar's answers to WHO's NCD country capacity survey, 2021, from WHO's Global Health Observatory. The registry answer was also No in 2019.",
          columns: [
            { key: "item", label: "Question" },
            { key: "answer", label: "Answer" },
          ],
          rows: [
            { item: "Population-based cancer registry exists", answer: "No" },
            { item: "Operational cancer plan or strategy", answer: "Yes" },
            { item: "Radiotherapy generally available in the public sector", answer: "No" },
            { item: "Chemotherapy generally available in the public health system", answer: "No" },
            { item: "Pathology laboratories generally available in the public sector", answer: "No" },
            { item: "Oral morphine generally available in the public health sector", answer: "No" },
            { item: "National cervical screening programme (main method)", answer: "Yes (VIA)" },
            { item: "National breast screening programme", answer: "No" },
          ],
          note: "These are the country's own answers to WHO, not inspections. 'Not generally available' means not available to most people in the public sector, not that the service does not exist anywhere in Madagascar.",
          sources: [
            { label: "WHO Global Health Observatory: radiotherapy availability, Madagascar (API)", url: WHO_RADIO },
            { label: "WHO Global Health Observatory: chemotherapy availability, Madagascar (API)", url: WHO_CHEMO },
            { label: "WHO Global Health Observatory: population-based cancer registry, Madagascar (API)", url: WHO_PBCR },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: no registry",
      aside: { label: "WHO Global Health Observatory: population-based cancer registry (API)", url: WHO_PBCR },
      cards: [
        {
          id: "no-registry",
          title: "No population-based registry, so the burden is not measured",
          plain:
            "Madagascar reported to WHO in 2019 and 2021 that it has no population-based cancer registry, and it is not among the African Cancer Registry Network's member registries. IARC therefore estimates Madagascar's cancers from neighbouring countries' data.",
          detail:
            "The most recent counts of cancer in Madagascar that OnCo found are laboratory series from the Institut Pasteur de Madagascar published in 1981 and 1998, which describe diagnoses made in one pathology laboratory and are not population rates; they are not used for figures here. Without a registry, there is no Malagasy measure of how many people develop or die of cancer, by region or over time.",
          links: [
            { label: "WHO Global Health Observatory: population-based cancer registry, Madagascar (API)", url: WHO_PBCR },
            { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care",
      aside: { label: "World Bank: current health expenditure per person, Madagascar (API)", url: WB_PC },
      cards: [
        {
          id: "financing",
          title: "About 17 US dollars a person a year for all health care",
          plain:
            "According to the World Bank, Madagascar spent 17.44 US dollars a person on health in 2023, 3.4% of the value of its economy (GDP). External sources paid 38.1% of it, the government 28.8% and households 27.4% out of pocket.",
          detail:
            "These are the World Bank's indicators drawn from WHO's Global Health Expenditure Database. With so little spent on health overall, and with chemotherapy and radiotherapy reported to WHO in 2021 as not generally available in the public sector, what a person with cancer pays, and for what, is a question OnCo found no Malagasy source to answer; see the gaps.",
          links: [
            { label: "World Bank: current health expenditure per person, Madagascar (API)", url: WB_PC },
            { label: "World Bank: external health expenditure, Madagascar (API)", url: WB_EXT },
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
          id: "agmed",
          title: "The medicines agency's website could not be reached",
          plain:
            "Madagascar's medicines are regulated by a national agency, but its website (agmed.mg) did not answer on 11 November 2026, so OnCo cannot describe its approval routes, timelines or which cancer medicines are registered.",
          detail:
            "The Ministry of Public Health's website (sante.gov.mg) also did not answer. OnCo's web search budget was spent during this round, so other copies of their documents could not be looked for. This card will be filled when a primary source can be read.",
          links: [{ label: "WHO Global Health Observatory: chemotherapy availability, Madagascar (API)", url: WHO_CHEMO }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO Global Health Observatory: HPV coverage, Madagascar (API)", url: WHO_HPV },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination figures from 2025, and screening studies with VIA and self-testing",
          plain:
            "WHO estimates that 77% of girls in the target age group in Madagascar were vaccinated against HPV in 2025, the first year it reports a figure; that is not necessarily the year vaccination began. Madagascar told WHO in 2021 that it has a national cervical screening programme using visual inspection with acetic acid (VIA).",
          detail:
            "Two published projects show what screening has looked like on the ground. A mobile unit in Atsinanana in 2013 to 2015 screened 1,569 of 8,959 eligible women (18%) with VIA and treated eligible lesions the same day, but 16 of 35 women referred to hospital were lost to follow-up. A 2015 campaign using HPV self-tests found 28.0% of 1,232 women positive, and 95.0% attended triage when it was offered immediately against 77.8% when it came months later.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage, Madagascar (API)", url: WHO_HPV },
            { label: "Dumont et al., cervical screening in rural Madagascar (J Gynecol Obstet Hum Reprod 2017)", url: VIA_2017 },
            { label: "Benski et al., HPV self-testing in Madagascar (PLoS One 2019)", url: HPV_2019 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Madagascar does",
      title: "What Madagascar does differently",
      cards: [
        {
          id: "same-day",
          title: "Testing and treating on the same day, because women may not come back",
          plain:
            "The two screening projects read for this page share one lesson: the best results came when women were tested and treated, or triaged, in a single visit. The 2019 study's authors recommend a single-day strategy for low-resource settings.",
          detail:
            "In the 2015 HPV self-testing campaign, women who were triaged immediately attended 95.0% of the time, and non-attendance was highest among rural women and women without education. In the Atsinanana mobile unit, 322 of 357 VIA-positive women could be treated on the spot; of those who had to be referred to hospital, nearly half were lost. These are research projects, not proof of a national programme's reach.",
          links: [
            { label: "Benski et al., HPV self-testing in Madagascar (PLoS One 2019)", url: HPV_2019 },
            { label: "Dumont et al., cervical screening in rural Madagascar (J Gynecol Obstet Hum Reprod 2017)", url: VIA_2017 },
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
          title: "No trial in OnCo's records has a site in Madagascar",
          plain:
            "Counted from OnCo's ClinicalTrials.gov participation data, fetched on 7 October 2026, none of the cancer trials in our records lists a site in Madagascar. The Malagasy research on this page is screening and prevalence studies. That reflects the trials OnCo holds, mostly large trials of new medicines.",
          detail:
            "OnCo's participation data cover 5,899 trials. The ClinicalTrials.gov search linked here shows any cancer studies registered with a site in Madagascar. The published Malagasy work read for this page was led with partners abroad, including Geneva University Hospitals for the HPV self-testing campaign.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with a site in Madagascar (search)", url: CTGOV }],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "national-sources",
      title: "No Malagasy government source could be read",
      plain:
        "The Ministry of Public Health (sante.gov.mg) and the medicines agency (agmed.mg) did not answer on 11 November 2026. This page therefore has no national cancer plan, no list of treatment centres, no rules on costs and no description of the regulator from Madagascar's own sources.",
      detail:
        "Madagascar told WHO in 2021 that it has an operational cancer plan, but OnCo could not read it. The IAEA's directory of radiotherapy centres works only in a browser, so whether any radiotherapy machine is working in the country is not stated here. OnCo's web search budget was spent during this round.",
      links: [
        { label: "Ministry of Public Health, Madagascar", url: "https://www.sante.gov.mg/" },
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["iarc", "who", "hug-geneva"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-benski-madagascar-hpv-self-test-triage-plosone-2019", "paper-dumont-madagascar-rural-via-screening-jogoh-2017"],
  people: [],
  how:
    "Every card was written from sources read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Madagascar; three papers' abstracts through Europe PMC; WHO's Global Health Observatory (HPV coverage and the 2019 and 2021 country capacity surveys); and the World Bank's health expenditure series. Trials were counted from OnCo's ClinicalTrials.gov participation data. The two new paper records carry their own sources.",
  verify:
    "None of the national figures here is a Malagasy count. Whether treatment is available, and at what cost, needs to be asked of the hospital that receives the referral.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Madagascar (PDF)", url: IARC_FACTSHEET },
    { label: "WHO Global Health Observatory", url: "https://www.who.int/data/gho" },
  ],
};
