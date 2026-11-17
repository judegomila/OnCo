import type { CountryDive } from "@/data/country-dive";

/**
 * Central African Republic deep dive: the hand-written cards for /countries/cf/ (wave 14). The country is a fragile,
 * conflict-affected state with very little published cancer data, so this page keeps to what the IAEA, WHO, IARC, the
 * World Bank, the health ministry's own plan and peer-reviewed papers state. Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country
 * Profile 2020 (the ICCP portal's copy) and cervical cancer profile 2021, the summary of the IAEA, WHO and IARC imPACT
 * review of September 2020 to March 2021, the ministry's strategic plan against non-communicable diseases (ICCP portal,
 * PDF text), the World Bank's health expenditure series from its API, WHO's immunisation data API, IAEA DIRAC's public
 * equipment data, WHO's August 2026 list of regulators at maturity level 3 and 4, and the abstract of one paper resolved
 * through Europe PMC. The newest description of services here dates from 2021; what has changed since is under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/140-central-african-republic-fact-sheet.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/CAF_2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-caf-2021-country-profile-en.pdf";
const IMPACT = "https://www.iaea.org/sites/default/files/documents/review-missions/impact-mission-to-central-african-rep-march-2021.pdf";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/CAF%202018%20Plan%20strat%20MNT%202018%202022%20RCA.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/CAF/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/CAF/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/CAF/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/CAF/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'CAF'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const MOH = "https://www.sante.gouv.cf/";
const BC_PAPER = "https://doi.org/10.1186/s12885-018-4256-2";
const CTGOV = "https://clinicaltrials.gov/search?country=Central%20African%20Republic&cond=cancer";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Central African Republic (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Central African Republic (PDF, ICCP portal)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Central African Republic (PDF)", url: WHO_CX };
const L_IMPACT = { label: "IAEA, WHO and IARC: imPACT review summary, Central African Republic (mission September 2020 to March 2021, PDF)", url: IMPACT };
const L_PLAN = { label: "Ministère de la Santé: strategic plan against chronic non-communicable diseases (PDF, ICCP portal)", url: NCD_PLAN };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_BC = { label: "Balekouzou et al., breast cancers among women in the Central African Republic, 174 cases (BMC Cancer 2018)", url: BC_PAPER };

export const CF_DIVE: CountryDive = {
  iso2: "CF",
  iso3: "CAF",
  name: "the Central African Republic",
  flag: "🇨🇫",
  asOf: "2026-11-16",
  title: "Cancer in the Central African Republic",
  description:
    "Cancer in the Central African Republic from international sources: IARC's estimate of 2,635 new cancers and 1,698 deaths in 2024, modelled from neighbouring countries' rates, breast and cervical cancer leading; a 2021 review by the IAEA, WHO and IARC that found two medical and two paediatric oncologists, chemotherapy paid for by families, no radiotherapy, no morphine, no population-based cancer registry and no national cancer programme; 45% of health spending paid out of pocket; no HPV vaccination; and no trial in OnCo's records with a site in the country.",
  lede:
    "A review by the IAEA, WHO and IARC in 2021 found cancer surgery done by general surgeons and chemotherapy given in a paediatric department in the Central African Republic, with two medical oncologists, two paediatric oncologists and no radiotherapy. The review found no population-based cancer registry, and IARC's figures for the Central African Republic are modelled from neighbouring countries. Its priority recommendations include a national cancer plan, a registry starting in Bangui, and a medical oncology department.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Central African Republic is 2,635 new cancers and 1,698 deaths, an age-standardised incidence of 113.1 per 100,000 (112.5 in men, 113.7 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. The 2021 imPACT review confirmed that the country has no population-based cancer registry and that the available data come from its pathology laboratory and the oncology departments of Bangui's hospitals.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Central African Republic",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 2,600 new cancers a year in IARC's estimate, built from neighbouring countries' rates",
          plain:
            "IARC estimates 2,635 new cancers in the Central African Republic in 2024, 1,590 of them in women, and 1,698 cancer deaths. Breast cancer is the commonest, then cervical, prostate and liver cancer. The figures are modelled from neighbouring countries, not counted in the country.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 610 breast cancers (284 deaths), 257 cervical cancers (167 deaths), 231 prostate cancers (148 deaths), 175 liver cancers (158 deaths) and 141 leukaemias (104 deaths), in a population of 5.33 million. Breast cancer causes the most cancer deaths, followed by cervical and liver cancer. The risk of developing a cancer before age 75 is 12.6%, and an estimated 3,770 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 261 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "No population-based registry: the data come from a pathology laboratory and hospital departments in Bangui",
          plain:
            "The Central African Republic has no population-based cancer registry, according to the 2021 imPACT review and WHO's 2021 profile. What is known comes from the national pathology laboratory in Bangui and from hospital departments, and the review recommended starting a registry in Bangui.",
          detail:
            "The imPACT review summary says the sources of cancer data are the country's Anatomy and Cytology Pathology Laboratory and the medical, surgical and paediatric oncology departments of Bangui hospitals, and recommends the gradual establishment of a population-based registry, starting in Bangui, which it says covers almost half of the country's population. The health ministry's strategic plan against non-communicable diseases says the same of an earlier date: no cancer programme, no registry, and data only from the pathology registers of the Laboratoire National de Biologie Clinique et de Santé Publique; it planned registries at three sites, Bangui, Bangassou and Berbérati. A study of the records of the pathology unit of the National Laboratory in Bangui and of the general surgery and gynaecology service found 174 breast cancers from 2003 to 2015, about 13 a year.",
          links: [L_IMPACT, L_CX, L_PLAN, L_BC],
        },
      ],
      tables: [
        {
          id: "cf-pathology-2012",
          title: "Cancer cases by type in the ministry's plan, from a 2012 survey",
          caption: "Cases by type in the table the non-communicable disease plan labels as a 2012 country survey: 245 cases, 107 in men and 138 in women.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases", numeric: true },
            { key: "share", label: "Share of the 245 (%)", numeric: true },
          ],
          rows: [
            { site: "Liver", cases: 64, share: 26.1 },
            { site: "Cervix", cases: 34, share: 13.9 },
            { site: "Non-Hodgkin lymphoma", cases: 28, share: 11.4 },
            { site: "Breast", cases: 26, share: 10.6 },
            { site: "Prostate", cases: 14, share: 5.7 },
            { site: "Colorectum", cases: 10, share: 4.1 },
            { site: "Other cancers", cases: 66, share: 26.9 },
          ],
          note: "These are counted cases, not incidence. The plan describes the survey as covering hospital statistics for 2008 to 2010 from health facilities in Bangui and eight prefectures, and does not give the year or years the cancer table covers; it says elsewhere that the only cancer data available come from the national laboratory's pathology registers. Oesophagus (2) and lung (1) complete the 245. The mix differs from IARC's modelled estimate, in which breast cancer leads and liver cancer is fourth.",
          sources: [L_PLAN],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "oop",
          title: "About USD 54 a person on health in 2023; families pay for chemotherapy and surgery",
          plain:
            "The Central African Republic spent about 54 US dollars a person on health in 2023. Households paid 45% of it out of pocket and external funders 40%, according to the World Bank's series from WHO's health expenditure database. The 2021 imPACT review found that families paid for chemotherapy and for cancer surgery.",
          detail:
            "The World Bank's series gives current health spending of USD 46 per person in 2021, 48 in 2022 and 54 in 2023, and out-of-pocket spending of 49.6%, 47.6% and 45.0% of current health spending in those years. In 2023 government spending from domestic sources was 14.4% of current health spending and external health expenditure 39.9%. The imPACT review summary says chemotherapy was given with limited access to drugs and families paying out of pocket, and that the costs of cancer surgery were covered by patients or their families. The ministry's earlier plan put the average monthly cost of surgical or drug treatment for cervical and breast cancer at up to 100,000 CFA francs (154 euros) and said cancer medicines were not stocked but ordered through a single wholesaler.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Central African Republic (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Central African Republic (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, Central African Republic (API)", url: WB_EXT },
            { label: "World Bank: domestic general government health expenditure, Central African Republic (API)", url: WB_GOV },
            L_IMPACT,
            L_PLAN,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not read the rules of the Central African Republic's medicines regulator",
          plain:
            "OnCo did not find a page from a medicines regulator in the Central African Republic, so it states nothing about how cancer medicines are approved or how trials are authorised. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include the country.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. The Ministry of Health and Population's site answered on 16 November 2026, and its front page carried nothing on medicines regulation or on cancer. The African Union's list of 19 September 2023 records no signature of the African Medicines Agency treaty by the Central African Republic. The 2021 imPACT review looked at a different regulator, the one for radiation safety, and found that the National Radiation Protection Authority did not yet have a comprehensive legal framework. A future pass should read the ministry's directorates and the pharmacy law in French.",
          links: [
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
            { label: "Ministère de la Santé et de la Population, République centrafricaine", url: MOH },
            L_IMPACT,
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: L_CX,
      cards: [
        {
          id: "who-screening",
          title: "No national screening programme and no HPV vaccination; occasional cervical campaigns in Bangui",
          plain:
            "The 2021 imPACT review found occasional early diagnosis campaigns for cervical cancer in Bangui and no national programme for early diagnosis of the commonest cancers. HPV vaccination is not in the national schedule, according to WHO's 2021 profile and WHO's immunisation data to 2025.",
          detail:
            "WHO's 2021 cervical cancer profile records no national screening programme, 6% of women aged 30 to 49 screened in the previous five years and 8% ever (2019), and no programme or guideline for early detection in primary care. The imPACT review summary describes ad hoc early diagnosis campaigns for cervical cancer in Bangui and exceptionally in the provinces, one working mammography unit in the country, in the private sector, and recommends training in visual inspection with acetic acid and starting HPV vaccination. WHO's immunisation data API, queried on 16 November 2026, lists the HPV vaccine as not introduced for each year from 2006 to 2025 and holds 44 coverage rows for the country, none with a figure in it. The review put hepatitis B vaccine coverage at 47% for the third dose.",
          links: [L_CX, L_IMPACT, { label: "WHO immunisation data: HPV vaccine introduction, Central African Republic (API)", url: WHO_HPV_INTRO }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in the Central African Republic",
      cards: [
        {
          id: "services",
          title: "The 2021 review: four oncologists, chemotherapy in a paediatric department, no radiotherapy",
          plain:
            "The imPACT review of 2021 found two medical oncologists and two paediatric oncologists, working inside general departments. Chemotherapy was given in the paediatric department, cancer surgery was done by general surgeons, and there was no radiotherapy, no CT or MRI scanner and no nuclear medicine.",
          detail:
            "The review summary says there were no radiotherapy services and no radiotherapists, radiation oncologists or medical physicists trained or in training; that the radiology departments of the five teaching hospitals had outdated equipment; and that a new national imaging centre at the national teaching hospital, set up at the end of 2020, was waiting for its equipment, including CT and mammography. IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for the country. The review recommended a medical oncology department at the Hôpital Communautaire or the national teaching hospital, a children's cancer unit at the paediatric teaching hospital, a list of essential cancer medicines, and referral arrangements with radiotherapy centres in the region until the country has its own. The ministry's earlier plan says some families bore the cost of evacuation to other African or Western countries. OnCo found no source later than 2021 on which of these steps have been taken.",
          links: [L_IMPACT, L_DIRAC, L_PLAN],
        },
        {
          id: "palliative",
          title: "No morphine and no palliative care service in the 2021 review",
          plain:
            "The 2021 imPACT review found that palliative care was not part of cancer care in the Central African Republic, that morphine was not available in any form, and that there were no hospital, private or home palliative care services. It recommended adding morphine to the essential medicines list.",
          detail:
            "The review summary says essential drugs for pain or symptom management were not available, nor other opioids, and that there was no national policy or dedicated funding for palliative care. WHO's 2021 cervical cancer profile likewise records palliative care as not generally available in primary care or at home and reported opioid consumption for 2017 as 0 mg of oral morphine equivalent per person. The review's recommendations were to put morphine, preferably as a syrup, on the essential medicines list, to train doctors and nurses in pain management, and to start with one doctor and nurse team in internal medicine, where people with cancer are cared for, supported by home visits.",
          links: [L_IMPACT, L_CX],
        },
        {
          id: "plan",
          title: "A plan for non-communicable diseases, but no national cancer programme in 2021",
          plain:
            "The 2021 imPACT review found a plan for non-communicable diseases for 2015 to 2021 and no national cancer control programme, and recommended writing one with a steering committee, named partners and funding. OnCo found no cancer plan published since.",
          detail:
            "WHO's 2020 profile recorded an operational integrated plan for non-communicable diseases and no cancer management guidelines for 2019. The ICCP portal, searched on 16 November 2026, returned a non-communicable disease policy and a strategic plan for the country and no cancer plan; the portal's listing dates the plan 2015 to 2021, its file is labelled 2018 to 2022 and its activity tables run from 2018 to 2022, while its introduction speaks of a strategic plan for 2014 to 2020, so OnCo gives no period for it. That plan says the cancer programme had not yet been created and that a cancer service was being organised at the Hôpital Communautaire around the country's one cancer specialist, supported by a single pathologist. Whether a cancer plan has been adopted since the review is not something OnCo could establish.",
          links: [L_IMPACT, L_WHO, L_PLAN, { label: "ICCP portal: search for the Central African Republic", url: "https://www.iccp-portal.org/resources?search_api_fulltext=central%20african%20republic" }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in the Central African Republic", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in the Central African Republic",
          plain:
            "None of the trials in OnCo's records lists the Central African Republic among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists the Central African Republic. A query of the registry's own API that day for cancer studies with a location in the country also returned none. The published research from Bangui that OnCo listed is observational. A BMC Cancer paper of 2018 reviewed 174 breast cancers recorded from 2003 to 2015: the median age at diagnosis was 45.5 years, ultrasound was the only imaging and was done for 30.4% of women, 95.4% had surgery and 91.4% had chemotherapy as well.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in the Central African Republic", url: CTGOV }, L_BC],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-since-2021",
      title: "What has changed since the 2021 review is not known to OnCo",
      plain:
        "The fullest account of cancer care in the Central African Republic is the imPACT review of 2021, and OnCo read only its public summary. It found no later source on whether a cancer plan, a registry, a medical oncology department or the imaging centre's scanner now exist.",
      detail:
        "The Ministry of Health and Population's front page, read on 16 November 2026, carried nothing on cancer. A future pass should look for a national cancer control plan, news of the imaging centre at the national teaching hospital, and WHO's country office reports. Until then the treating hospital in Bangui and the ministry are the places to ask what is available now.",
      links: [L_IMPACT, { label: "Ministère de la Santé et de la Population, République centrafricaine", url: MOH }],
    },
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find the medicines regulator's rules, an essential medicines list naming cancer drugs, any insurance or free-care scheme that covers cancer, or the countries patients are referred to for radiotherapy.",
      detail:
        "The ministry's plan against non-communicable diseases was read as PDF text; its period is unclear, and its cancer table comes from a 2012 survey of hospital statistics without the year the cases were counted. WHO's 2020 profile was read from the ICCP portal's copy, because WHO's own address for it returned an error. OnCo listed the published papers from Bangui by title through Europe PMC and read one abstract, on breast cancer; papers on liver cancer, head and neck cancers and HPV types are listed there and were not read. A future pass should read them and the national essential medicines list.",
      links: [L_PLAN, L_WHO, { label: "Europe PMC: papers on cancer with Bangui or the Central African Republic in the title", url: "https://europepmc.org/search?query=(TITLE%3A%22Central%20African%20Republic%22%20OR%20TITLE%3ABangui)%20AND%20(cancer%20OR%20oncology%20OR%20lymphoma%20OR%20carcinoma)" }],
    },
  ],
  institutions: ["car-ministry-of-health", "cnhu-bangui", "chu-pediatrique-bangui", "iaea", "who", "iarc"],
  companies: [],
  drugs: ["morphine"],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the summary of the 2021 imPACT review by the IAEA, WHO and IARC, the health ministry's plan against non-communicable diseases, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, and the abstract of one paper resolved through Europe PMC.",
  verify:
    "The newest description of cancer services here is from 2021, in a country where conditions change. Check with the Ministry of Health and Population or the treating hospital in Bangui before relying on it.",
  verifyLinks: [L_IMPACT, L_IARC],
};
