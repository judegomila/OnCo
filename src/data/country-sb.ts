import type { CountryDive } from "@/data/country-dive";

/**
 * Solomon Islands deep dive: the hand-written cards for /countries/sb/ (wave 16). Every figure was read from the raw
 * text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Solomon
 * Islands (PDF text); WHO's cancer country profile 2020 and cervical cancer country profile 2021 (PDF text); WHO's
 * media release of 18 August 2026 on the medicines regulatory system (HTML text); WHO's vaccine introduction, HPV
 * coverage and Global Health Expenditure Database rows from its public data APIs; IAEA DIRAC's public equipment data;
 * IARC's page for its Pacific Islands hub for cancer registration; the open-access full text of Yip et al. 2023
 * through Europe PMC and of Sarfati et al. 2019 through PubMed Central; and the other papers' abstracts through
 * Europe PMC. The government site solomons.gov.sb answers scripts with a JavaScript check and the Pacific Islands
 * Legal Information Institute with a 403, so no Ministry page and no Act was read; both are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/90-solomon-islands-fact-sheet.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/slb-2020.pdf";
const WHO_CERVICAL_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-slb-2021-country-profile-en.pdf";
const WHO_REGULATORY_2026 = "https://www.who.int/solomonislands/news/detail/18-08-2026-solomon-islands-strengthens-regulatory-system-to-ensure-safer--quality-health-products";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SLB'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SLB'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SLB'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'SLB'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'SLB'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'SLB'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const GICR_PACIFIC = "https://gicr.iarc.who.int/hub/pacific-islands/";
const MHMS = "https://solomons.gov.sb/";
const NZMTS = "https://pmagroup.org.nz/medical-treatment-scheme";
const CTGOV = "https://clinicaltrials.gov/search?country=Solomon%20Islands&cond=cancer";
const YIP_2023 = "https://doi.org/10.1200/GO.22.00325";
const MARTINIUK_2017 = "https://doi.org/10.1016/j.canep.2017.04.016";
const WARD_2021 = "https://doi.org/10.1111/1754-9485.13160";
const SARFATI_2019 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746436/";

export const SB_DIVE: CountryDive = {
  iso2: "SB",
  iso3: "SLB",
  name: "Solomon Islands",
  flag: "🇸🇧",
  asOf: "2026-11-16",
  title: "Cancer in Solomon Islands",
  description:
    "Cancer in Solomon Islands from WHO, IARC and published sources: IARC's estimate of 871 new cancers and 421 deaths in 2024, based on neighbouring countries' data; a hospital-based cancer registry re-established in 2008; an oncology unit at the National Referral Hospital in Honiara giving chemotherapy since 2018; no radiotherapy in the country; and HPV vaccination since 2019, reaching 79% of the girls targeted in 2025.",
  lede:
    "Cancer treatment in Solomon Islands is concentrated at the National Referral Hospital in Honiara, where a medical oncology unit commissioned in September 2018 gives chemotherapy; there is no radiotherapy in the country. IARC estimates 871 new cancers and 421 deaths in 2024, with breast, cervical and prostate cancer the commonest, but that estimate is built from neighbouring countries' data, and the country's own registry is hospital-based and incomplete.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Solomon Islands is 871 new cancers and 421 deaths, an age-standardised incidence of 153.7 per 100,000 (141.7 in men, 167.8 in women) and mortality of 80.3. The fact sheet names no country-specific incidence source and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\": the incidence is not built from diagnoses made in Solomon Islands. For mortality the data source is given as \"Survcan\" and the method as \"National incidence estimates applied to model-based M:I ratios (registry survival data)\", so the deaths are derived from that incidence estimate and from survival measured in registries elsewhere. A 2019 review explained that for an earlier edition the mean incidence of Vanuatu and Fiji was used for Solomon Islands. The fact sheet's totals with and without non-melanoma skin cancer are the same.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Solomon Islands",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Solomon Islands (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 870 new cancers a year in IARC's estimate, with breast and cervical cancer the commonest",
          plain:
            "IARC estimates 871 new cancers in Solomon Islands in 2024, 374 in men and 497 in women, and 421 cancer deaths. Breast cancer is the commonest overall, cervical cancer second and prostate cancer third. The estimate is built from neighbouring countries' data, not from diagnoses made in Solomon Islands.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 128 breast cancers (47 deaths), 98 cervical cancers (51 deaths), 96 prostate cancers (26 deaths), 85 colorectal cancers (44 deaths), 65 thyroid cancers (6 deaths) and 60 liver cancers (57 deaths). In men the leading cancers are prostate (96, 25.7%), liver (49) and colorectum (48); in women, breast (128, 25.8%), cervix (98, 19.7%) and thyroid (63). By deaths the order is liver, cervix, then breast. The risk of developing cancer before 75 is 16.3%, and of dying of it 8.7%.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Solomon Islands (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "hospital-registry",
          title: "A hospital-based cancer registry, re-established in 2008 and known to be incomplete",
          plain:
            "The Solomon Islands Cancer Registry was re-established in 2008 with support from IARC. It is based at the National Referral Hospital and records the cancers seen there, so it does not count everyone in the country. The cancers seen most often in 2014 and 2015 were cervical, breast, thyroid, lymphoma and oral.",
          detail:
            "Yip and colleagues describe the registry in 2023 as hospital-based, using IARC's CanReg 5 software, collecting incident inpatient and outpatient cases and staffed by two registered nurses and a medical registrar. Because most pathology specimens had to be sent to Brisbane for reporting, not every case was confirmed under the microscope. A 2017 review found the registry passive and short of resources for data entry, with data rarely used for decisions, and breast and cervical cancer the two most commonly identified cancers. WHO's 2021 cervical cancer profile answers \"No\" to whether a population-based registry exists. Solomon Islands is among the countries covered by IARC's Pacific Islands hub for cancer registration.",
          links: [
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
            { label: "Martiniuk et al., cancer in the Solomon Islands (Cancer Epidemiol 2017)", url: MARTINIUK_2017 },
            { label: "WHO: cervical cancer country profile 2021, Solomon Islands (PDF)", url: WHO_CERVICAL_2021 },
            { label: "IARC Global Initiative for Cancer Registry Development: Pacific Islands hub", url: GICR_PACIFIC },
          ],
        },
      ],
      tables: [
        {
          id: "sb-top",
          title: "IARC's leading cancers for Solomon Islands, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 128, deaths: 47 },
            { site: "Cervix uteri", cases: 98, deaths: 51 },
            { site: "Prostate", cases: 96, deaths: 26 },
            { site: "Colorectum", cases: 85, deaths: 44 },
            { site: "Thyroid", cases: 65, deaths: 6 },
            { site: "Liver", cases: 60, deaths: 57 },
            { site: "Leukaemia", cases: 45, deaths: 15 },
            { site: "Lung", cases: 42, deaths: 35 },
            { site: "All cancers", cases: 871, deaths: 421 },
          ],
          note: "IARC bases the incidence on estimates or registry data from neighbouring countries and derives deaths from it, so this is the table a national registry would replace. It gives 14 lip and mouth cancers, while the hospital's own 2014 to 2015 list put oral cancer among its five most frequent.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Solomon Islands (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "WHO Global Health Expenditure Database: out-of-pocket share, Solomon Islands (API)", url: WHO_OOP_API },
      cards: [
        {
          id: "health-spending",
          title: "Government and donors pay for almost all health care; patients about 3%",
          plain:
            "WHO's figures for 2023 put health spending in Solomon Islands at about US$111 a person. The government paid 62.9% of it and external donors 33.9%. People paid 3.2% out of their own pockets.",
          detail:
            "The figures are from WHO's Global Health Expenditure Database: current health expenditure per person of US$111.36 in 2023, a domestic government share of 62.9% (down from 74.0% in 2020), an external share of 33.9% (up from 22.5%) and an out-of-pocket share of 3.2%. A low out-of-pocket share does not mean care is within reach: a 2017 review found an overall lack of access to any health care because of geography and the country's economic fragility, and the oncology unit's own account says that at the 2016 visit patients came for treatment to find chemotherapy drugs unavailable and their bookings rescheduled. The unit's staff set up an NRH Cancer Trust Fund to accept donations.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Solomon Islands (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Martiniuk et al., cancer in the Solomon Islands (Cancer Epidemiol 2017)", url: MARTINIUK_2017 },
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "WHO: Solomon Islands strengthens regulatory system (18 August 2026)", url: WHO_REGULATORY_2026 },
      cards: [
        {
          id: "mhms-regulation",
          title: "Medicines are regulated inside the health ministry, which is reviewing its system and its law",
          plain:
            "Solomon Islands has no separate medicines agency. WHO says the regulatory system operates within the Ministry of Health and Medical Services with a small number of staff. In August 2026 the Ministry assessed that system with WHO, as the country looks to update its legislation on medicines and health products.",
          detail:
            "WHO's release of 18 August 2026 describes a three-day national self-assessment workshop in Honiara using WHO's Global Benchmarking Tool to find the strengths and gaps of the regulatory system for medicines, vaccines and medical devices, and notes that Solomon Islands relies heavily on imported medicines. The oncology unit's published account shows how the national Essential Medicines List shapes cancer care: in 2016 metoclopramide was the one anti-sickness medicine on the hospital formulary, and the stronger 5HT3 antagonists were not on the list; by the 2018 mission ondansetron had been added, and more cancer medicines were added in 2019. OnCo could not read the Pharmacy and Poisons Act or any Ministry page, so the present law and how a medicine is registered are not described here.",
          links: [
            { label: "WHO: Solomon Islands strengthens regulatory system to ensure safer, quality health products (18 August 2026)", url: WHO_REGULATORY_2026 },
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile 2021, Solomon Islands (PDF)", url: WHO_CERVICAL_2021 },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2019, recovering to 79% of the girls targeted in 2025",
          plain:
            "Solomon Islands added the HPV vaccine to its national immunisation programme in 2019. Coverage fell to 6% for a first dose in 2021 and has recovered since: WHO's rows for 2025 give 79%, with 24,462 doses for a target of 30,826 girls.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2019, and its 2021 cervical cancer profile gives the primary target as girls aged 9. The coverage rows give a first dose for 53% of 48,911 girls in 2019, 6% in 2021, 36% in 2022, 65% in 2023, 78% in 2024 and 79% in 2025; the target population reported changes several-fold between years, so the percentages are not all measured against the same group. From 2023 the first-dose and last-dose figures are the same.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Solomon Islands (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Solomon Islands (API)", url: WHO_INTRO_API },
            { label: "WHO: cervical cancer country profile 2021, Solomon Islands (PDF)", url: WHO_CERVICAL_2021 },
          ],
        },
        {
          id: "no-programme",
          title: "No national screening programme: cervical checks are opportunistic",
          plain:
            "WHO's 2021 profile records no national cervical screening programme in Solomon Islands. Screening was described in 2019 as opportunistic, by visual inspection of the cervix. WHO estimates that 12% of women aged 30 to 49 had been screened in the previous five years.",
          detail:
            "WHO's 2020 cancer profile lists cervical screening as available in 2019 on an opportunistic basis by visual inspection, and no breast screening programme. Its 2021 cervical cancer profile says no national screening programme existed, estimates that 16% of women aged 30 to 49 had ever been screened, and records no national guidelines on managing cervical cancer and no clearly defined referral system from primary care. The 2023 account of the oncology unit says its staff used public events and radio to raise awareness of cervical and breast cancer. OnCo found no later official statement of a screening programme.",
          links: [
            { label: "WHO: cancer country profile 2020, Solomon Islands (PDF)", url: WHO_PROFILE_2020 },
            { label: "WHO: cervical cancer country profile 2021, Solomon Islands (PDF)", url: WHO_CERVICAL_2021 },
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer treatment",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "No radiotherapy in Solomon Islands; chemotherapy is given at one hospital in Honiara",
          plain:
            "IAEA's radiotherapy directory lists no centre in Solomon Islands, and the 2023 account of the country's oncology unit says there are no radiotherapy facilities. Chemotherapy is given at the oncology unit of the National Referral Hospital in Honiara, on the island of Guadalcanal.",
          detail:
            "Yip and colleagues describe specialist services as concentrated at the National Referral Hospital, in buildings dating from the Second World War, with ultrasound, plain X-ray and mammography, no CT scanner until 2022, no MRI or nuclear medicine, no intensive care unit and limited pathology. Three quarters of the population live in rural areas and villages across some 350 islands. A 2019 review of the Pacific recorded for mid-2018 one pathologist, one radiologist, no medical oncologist and a few chemotherapy medicines. No DIRAC entry is not proof of no radiotherapy, but here the hospital's own account agrees with it.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Solomon Islands does differently",
      cards: [
        {
          id: "oncology-unit",
          title: "An oncology unit built step by step with Australian partners, and its own treatment guidelines",
          plain:
            "Before 2018, chemotherapy at the National Referral Hospital was mixed and given by ward doctors in dressing rooms. The hospital asked for help, and a medical oncology unit was commissioned in September 2018. Its staff wrote Solomon Islands Oncology Guidelines suited to the medicines the country has.",
          detail:
            "The 2023 account sets out the steps: a scoping visit in 2016 at the Medical Superintendent's request; a doctor's observership in Canberra in 2017; a multidisciplinary mission in 2018, arranged by Australia's Department of Foreign Affairs and Trade through the Royal Australasian Colleges' Pacific Islands Program at the Ministry's request; a second mission in 2019; and two oncology nurses visiting Canberra. Training covered protective equipment, safe handling of cytotoxic medicines, spills and waste. A chemotherapy isolator for preparing treatments has been fully working since July 2022, and the unit kept running through the COVID-19 pandemic despite shortages of medicines and supplies. The authors report a sustainable unit; a 2024 letter in the same journal discusses its sustainability in terms of outcomes.",
          links: [
            { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
            { label: "Ward et al., a collaborative approach to oncology in Asia-Pacific island communities (J Med Imaging Radiat Oncol 2021)", url: WARD_2021 },
            { label: "Bush et al., Solomon Islands Oncology Unit: sustainability in terms of outcomes (JCO Glob Oncol 2024)", url: "https://doi.org/10.1200/GO.23.00325" },
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
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Solomon Islands",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Solomon Islands. OnCo holds a selection of trials, not the whole registry, so search the registry itself. The published papers OnCo found describe cancer services and the hospital registry.",
          detail:
            "The papers behind this page are the 2023 account of how the oncology unit was set up and the 2017 review of cancer in Solomon Islands, which combined a literature review, National Referral Hospital cancer data, interviews and an audit of health services using a WHO tool. That review's stakeholders recommended a cancer unit, better registry processes and closer work between the one tertiary hospital and other health services; the first of these has since happened. A 2021 paper on oncology in Asia-Pacific island communities, with an author from the unit, describes shared protocols, training and telehealth.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Solomon Islands", url: CTGOV },
            { label: "Martiniuk et al., cancer in the Solomon Islands (Cancer Epidemiol 2017)", url: MARTINIUK_2017 },
            { label: "Ward et al., a collaborative approach to oncology in Asia-Pacific island communities (J Med Imaging Radiat Oncol 2021)", url: WARD_2021 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "overseas-referral",
      title: "How overseas referral works for Solomon Islanders was not readable",
      plain:
        "People who need radiotherapy cannot have it in Solomon Islands. OnCo could not read any Ministry of Health and Medical Services page on overseas referral, so who qualifies, where patients are sent and what is paid for are not on this page.",
      detail:
        "The government site solomons.gov.sb answered automated requests with a JavaScript check on 16 November 2026, and OnCo does not work around such checks. A 2019 review of the Pacific says most island countries have state-funded international referral processes, that decisions can take weeks or months, and that patients are often expected to pay their own travel and accommodation; it gives no figures for Solomon Islands alone. New Zealand's Medical Treatment Scheme lists six partner countries, and Solomon Islands is not among them. The oncology unit at the National Referral Hospital is the place to ask about referral.",
      links: [
        { label: "Solomon Islands Government site (not readable by script)", url: MHMS },
        { label: "Pasifika Medical Association Group: New Zealand Medical Treatment Scheme", url: NZMTS },
        { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
      ],
    },
    {
      id: "law-and-plan",
      title: "The medicines law, the essential medicines list and any cancer plan were not read",
      plain:
        "OnCo did not read the Pharmacy and Poisons Act, the National Medicines Policy or the Essential Medicines List, and found no national cancer control plan. WHO's 2020 profile records a plan for non-communicable diseases in general and no cancer plan.",
      detail:
        "The Pacific Islands Legal Information Institute, which publishes the country's Acts, refused an automated request (403) on 16 November 2026. WHO's 2020 cancer profile lists an operational integrated plan for non-communicable diseases in 2019, no entry for a national cancer control plan, and no cancer management guidelines, although the published account of the oncology unit dates the first version of the hospital's Solomon Islands Oncology Guidelines to the 2018 mission and a second to 2019. A 2019 review also listed no national cancer plan, with a note that this answer takes in cancer plans written into other policy documents. The International Cancer Control Partnership portal was not read. The Ministry's pharmacy division can say which cancer medicines are on the current list.",
      links: [
        { label: "WHO: cancer country profile 2020, Solomon Islands (PDF)", url: WHO_PROFILE_2020 },
        { label: "WHO: Solomon Islands strengthens regulatory system (18 August 2026)", url: WHO_REGULATORY_2026 },
      ],
    },
    {
      id: "counts-and-survival",
      title: "No national count of cancers, no survival figures and no current caseload",
      plain:
        "The registry records what one hospital sees, and IARC's estimate comes from neighbouring countries, so the number of cancers in Solomon Islands is not known. OnCo found no survival figure for any cancer, and did not find the registry's own published counts.",
      detail:
        "The 2023 account of the oncology unit includes a table of its caseload, which OnCo did not extract and so does not quote. WHO's 2020 profile gives the availability of a population-based registry as \"No information\" and rates mortality registration as having no coverage. Number of oncologists, pathologists and oncology nurses working now were not found in a primary source; the 2019 review's figures describe mid-2018. The oncology unit and the hospital's cancer registry hold the current numbers.",
      links: [
        { label: "Yip et al., establishment of an oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
        { label: "WHO: cancer country profile 2020, Solomon Islands (PDF)", url: WHO_PROFILE_2020 },
      ],
    },
  ],
  institutions: ["solomon-islands-ministry-of-health", "national-referral-hospital-honiara", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-yip-oncology-unit-solomon-islands-jcogo-2023", "paper-martiniuk-cancer-solomon-islands-cancerepidemiol-2017"],
  people: [],
  how:
    "Every card was written from international agencies' documents and from published papers, read in full rather than through a summary, because the government's own site could not be read by script: WHO's 2020 cancer profile, its 2021 cervical cancer profile, its release of 18 August 2026 on the regulatory system, and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet and its Pacific Islands hub page; the open-access account of the National Referral Hospital's oncology unit; and the other papers through Europe PMC and PubMed Central. Trials were counted from OnCo's ClinicalTrials.gov participation data. The two paper records added for this page carry their own sources.",
  verify:
    "National incidence figures for Solomon Islands are modelled from neighbouring countries, not counted. Which chemotherapy medicines are in stock, whether a referral overseas is possible and who pays for it change faster than any paper, and OnCo could not read the Ministry's own pages; ask the oncology unit at the National Referral Hospital in Honiara what applies to you.",
  verifyLinks: [
    { label: "Solomon Islands Government site", url: MHMS },
    { label: "WHO: cancer country profile 2020, Solomon Islands (PDF)", url: WHO_PROFILE_2020 },
    { label: "Yip et al., oncology unit in the Solomon Islands (JCO Glob Oncol 2023)", url: YIP_2023 },
    { label: "WHO Solomon Islands: regulatory system release", url: WHO_REGULATORY_2026 },
  ],
};
