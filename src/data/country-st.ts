import type { CountryDive } from "@/data/country-dive";

/**
 * São Tomé and Príncipe deep dive: the hand-written cards for /countries/st/ (wave 14). Every figure was read from the
 * raw text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer
 * Country Profile 2020 and cervical cancer profile 2021 (PDF text), the World Bank's health expenditure series from its
 * API, WHO's immunisation data API, IAEA DIRAC's public equipment data, WHO's August 2026 list of regulators at maturity
 * level 3 and 4, the African Union's list of signatures of the African Medicines Agency treaty, and one paper by authors
 * from Hospital Ayres de Menezes, resolved through Europe PMC with its abstract and affiliations read; the second pass
 * on the same day read its open-access full text too. The country has about 236,000 people and the page is short: the
 * address ms.gov.st did not resolve, and OnCo found no cancer plan, no registry and no regulator's page. Each is named
 * under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/678-sao-tome-and-principe-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/stp-2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-stp-2021-country-profile-en.pdf";
const WB_OOP = "https://api.worldbank.org/v2/country/STP/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/STP/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/STP/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/STP/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'STP'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'STP'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const EVAC_PAPER = "https://doi.org/10.3332/ecancer.2026.2093";
const CTGOV = "https://clinicaltrials.gov/search?country=Sao%20Tome%20and%20Principe&cond=cancer";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, Sao Tome and Principe (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, Sao Tome and Principe (PDF)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, Sao Tome and Principe (PDF)", url: WHO_CX };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_EVAC_FULL = { label: "Europe PMC: full text of the evacuation study (PMC13161590, XML)", url: "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13161590/fullTextXML" };
const L_EVAC = { label: "David et al., cancer among medical evacuees from São Tomé and Príncipe, 2019 to 2025 (ecancermedicalscience 2026)", url: EVAC_PAPER };

export const ST_DIVE: CountryDive = {
  iso2: "ST",
  iso3: "STP",
  name: "São Tomé and Príncipe",
  flag: "🇸🇹",
  asOf: "2026-11-16",
  title: "Cancer in São Tomé and Príncipe",
  description:
    "Cancer in São Tomé and Príncipe: IARC's estimate of 84 new cancers and 54 deaths in 2024, modelled from neighbouring countries' rates; 413 medical evacuations abroad for cancer from 2019 to 2025, more than a third of all the country's evacuations; no population-based cancer registry and no radiotherapy centre in IAEA's directory; HPV vaccination nationwide since 2021, with 86% of girls given a first dose by age 15 in 2025; about 17% of health spending paid out of pocket; and no trial in OnCo's records with a site in the country.",
  lede:
    "People with cancer in São Tomé and Príncipe who need specialised treatment are sent abroad through the Ministry of Health's Patient Evacuation Board: 413 of the 1,066 evacuations from 2019 to 2025 were for cancer. The country vaccinates girls against the virus that causes cervical cancer, and WHO's immunisation data put first-dose coverage by age 15 at 86% in 2025. It has no population-based cancer registry, and IARC's figures for it are modelled from neighbouring countries.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for São Tomé and Príncipe is 84 new cancers and 54 deaths, an age-standardised incidence of 54.6 per 100,000 (38.5 in men, 71.3 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. In a population of about 236,000 the numbers are small enough that a handful of cases moves any figure. The one counted series OnCo found, of evacuations abroad, is on this page under what stands out.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in São Tomé and Príncipe",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "84 new cancers a year in IARC's estimate, built from neighbouring countries' rates",
          plain:
            "IARC estimates 84 new cancers in São Tomé and Príncipe in 2024, 58 of them in women, and 54 cancer deaths. Breast cancer is the commonest, then cervical and prostate cancer. The figures are modelled from neighbouring countries, not counted in São Tomé and Príncipe.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 28 breast cancers (15 deaths), 14 cervical cancers (7 deaths), 14 prostate cancers (10 deaths), 8 liver cancers (8 deaths) and 5 colorectal cancers (4 deaths), in a population of 235,541. The risk of developing a cancer before age 75 is 6.5%, and an estimated 172 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 11 cancers a year in children aged 0 to 14 and noted that the estimates have a high degree of uncertainty because they are not based on a population-based cancer registry.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "No population-based cancer registry",
          plain:
            "São Tomé and Príncipe has no population-based cancer registry. WHO's 2021 cervical cancer profile says so, and authors from Hospital Ayres de Menezes said the same in 2026 and called for one to be set up.",
          detail:
            "WHO's Cancer Country Profile 2020 recorded no information on a population-based cancer registry for 2019 and no coverage for the quality of mortality registration for 2007 to 2016; its 2021 cervical cancer profile states that no population-based cancer registry exists. The African Cancer Registry Network's member list, read on 16 November 2026, names 35 registries and none in São Tomé and Príncipe. The 2026 study of medical evacuations by authors from Hospital Ayres de Menezes states that the country does not yet have a population-based cancer registry and concludes that establishing one would improve the data and inform public health strategy.",
          links: [L_CX, L_WHO, L_EVAC, { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" }],
        },
      ],
      tables: [
        {
          id: "st-globocan-sites",
          title: "The five commonest cancers in São Tomé and Príncipe, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 28, deaths: 15 },
            { site: "Cervix uteri", cases: 14, deaths: 7 },
            { site: "Prostate", cases: 14, deaths: 10 },
            { site: "Liver", cases: 8, deaths: 8 },
            { site: "Colorectum", cases: 5, deaths: 4 },
          ],
          note: "There are no registry figures from São Tomé and Príncipe to set beside these. They are estimates. WHO's 2020 profile said of its own estimates for the country that they have a high degree of uncertainty because they are not based on a population-based cancer registry.",
          sources: [L_IARC],
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
          title: "About USD 171 a person on health in 2023, 17% of it out of pocket and 44% from external funders",
          plain:
            "São Tomé and Príncipe spent about 171 US dollars a person on health in 2023. Households paid 17% of it out of their own pockets and external funders 44%, according to the World Bank's series from WHO's health expenditure database. The 2026 evacuation study says Portugal covers the medical cost of an evacuation, São Tomé and Príncipe the travel, and patients their own accommodation. OnCo did not find a source on who pays for cancer medicines.",
          detail:
            "The World Bank's series gives current health spending of USD 187 per person in 2021, 139 in 2022 and 171 in 2023, and out-of-pocket spending of 11.7%, 15.2% and 16.7% of current health spending in those years. In 2023 government spending from domestic sources was 37.0% of current health spending and external health expenditure 43.9%. The 2026 evacuation study describes its data as the records of the Ministry of Health's Patient Evacuation Board. Its full text says each evacuation has an average medical cost of approximately 3,500 euros, covered by Portugal (a figure it takes from a 2024 Portuguese newspaper report), that travel costs for patients and escorts can reach 225,000 euros a year, covered by São Tomé and Príncipe, and that accommodation is paid for by the patients themselves. WHO's 2021 cervical cancer profile recorded palliative care for people with non-communicable diseases as not generally available in primary care or in community or home-based care.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Sao Tome and Principe (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Sao Tome and Principe (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, Sao Tome and Principe (API)", url: WB_EXT },
            { label: "World Bank: domestic general government health expenditure, Sao Tome and Principe (API)", url: WB_GOV },
            L_EVAC,
            L_EVAC_FULL,
            L_CX,
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
          title: "OnCo has not read the rules of São Tomé and Príncipe's medicines regulator",
          plain:
            "OnCo did not find a page from a medicines regulator in São Tomé and Príncipe, so it states nothing about how cancer medicines are approved or how trials are authorised. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include the country.",
          detail:
            "This card stands for a source not yet read, not a description of the regulator. The Ministry of Health's address, ms.gov.st, did not resolve on 16 November 2026. The African Union's list of 19 September 2023 shows São Tomé and Príncipe signed the treaty establishing the African Medicines Agency on 16 February 2023 and records no ratification. A future pass should look for the pharmacy law and the ministry's pharmaceutical department in Portuguese.",
          links: [
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML3 },
            { label: "African Union: signatures and ratifications of the African Medicines Agency treaty (19 September 2023, PDF)", url: AMA },
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
          id: "hpv",
          title: "HPV vaccination nationwide since 2021: 86% of girls had a first dose by age 15 in 2025",
          plain:
            "São Tomé and Príncipe vaccinates girls against human papillomavirus, the virus that causes cervical cancer, across the country. WHO's immunisation data put the share of girls who had received a first dose by age 15 at 86% in 2025, up from 74% in 2022.",
          detail:
            "WHO's 2021 cervical cancer profile records the HPV vaccine as included in the national vaccination programme, at national scale, with 2021 as the year of introduction. WHO's immunisation data API, queried on 16 November 2026, marks the vaccine as introduced nationwide in each year from 2021 to 2025, with an earlier entry for 2017 and 2018 carrying a flag, (D), that OnCo has not interpreted. Its coverage rows give first-dose coverage by age 15 among girls of 74% in 2022, 80% in 2023, 86% in 2024 and 86% in 2025, and programme coverage for the first dose of 75% in 2024 and 97% in 2025. The 2026 evacuation study gives a different start: it says a national HPV vaccination programme has been in place since 2019, targeting girls aged 10. OnCo has not found a source that settles the difference.",
          links: [
            { label: "WHO immunisation data: HPV vaccination coverage, Sao Tome and Principe (API)", url: WHO_HPV_COV },
            { label: "WHO immunisation data: HPV vaccine introduction, Sao Tome and Principe (API)", url: WHO_HPV_INTRO },
            L_CX,
            L_EVAC_FULL,
          ],
        },
        {
          id: "who-screening",
          title: "No national cervical or breast screening programme in WHO's profiles",
          plain:
            "WHO's 2021 cervical cancer profile records no national cervical screening programme in São Tomé and Príncipe, and its 2020 profile recorded no breast cancer screening programme. About two in ten women aged 30 to 49 had been screened for cervical cancer in the previous five years.",
          detail:
            "The 2021 profile records that 20% of women aged 30 to 49 had been screened for cervical cancer in the previous five years and 27% ever (2019), that a clearly defined referral system from primary care existed, and that there was no programme or guideline to strengthen early detection of first symptoms in primary care and no national guideline on cervical cancer management. The 2020 profile recorded no cervical cancer screening and no breast cancer screening programme for 2019. Breast and cervical cancer were the first and third most frequent cancers among evacuations abroad from 2019 to 2025, and the study's authors see room for more prevention and early detection.",
          links: [L_CX, L_WHO, L_EVAC],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in São Tomé and Príncipe",
      cards: [
        {
          id: "evacuation",
          title: "More than a third of medical evacuations abroad are for cancer",
          plain:
            "Authors from Hospital Ayres de Menezes reviewed the records of the Ministry of Health's Patient Evacuation Board from January 2019 to May 2025. Of 1,066 evacuations for treatment abroad, 413 (38.7%) were for cancer, most often breast, prostate and cervical cancer.",
          detail:
            "The study, published in ecancermedicalscience in 2026 with co-authors at the Portuguese Institute of Oncology in Porto, describes the country as relying heavily on medical evacuation for specialised cancer care. Its full text describes medical evacuation as the transfer of patients to Portugal under bilateral health agreements, and covers records from January 2019 to May 2025. Cancer patients had a mean age of 48.3 years and 58.6% were women. Breast cancer was the most frequent at 24.7%, followed by prostate cancer at 17.9% and cervical cancer at 9.4%. Of all evacuated patients 76.9% had a single evacuation, against 72.4% of those with cancer, and 16.9% of cancer patients had three or more against 11.6% overall. The authors note that the records leave out patients too ill to travel or whose advanced disease was judged beyond treatment abroad. These are counts of evacuations, not of everyone who developed cancer: 413 in about six and a half years is about 64 a year, against IARC's modelled 84 new cancers a year.",
          links: [L_EVAC, L_EVAC_FULL],
        },
        {
          id: "services",
          title: "No radiotherapy centre in IAEA's directory; WHO's 2021 profile recorded a cancer department as not generally available",
          plain:
            "IAEA's directory of radiotherapy centres lists no centre in São Tomé and Príncipe. WHO's 2021 cervical cancer profile recorded a cancer centre or department, pathology, cancer surgery, chemotherapy and radiotherapy each as not generally available.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for São Tomé and Príncipe. WHO's 2021 profile answers no for each of the five services, and its 2020 profile recorded no cancer management guidelines, an integrated non-communicable disease plan not in effect and n/a against a national cancer control plan for 2019. A search of the ICCP portal, which collects national cancer plans, returned only WHO's own profiles of the country on 16 November 2026; that is what the search returned, not proof that no plan exists. The 2026 evacuation study says in its full text that the country currently lacks oncology specialists and facilities to provide advanced surgeries, systemic therapies or radiotherapy. OnCo found no source describing what cancer treatment is given inside the country today.",
          links: [L_DIRAC, L_CX, L_WHO, L_EVAC_FULL, { label: "ICCP portal: search for Sao Tome and Principe", url: "https://www.iccp-portal.org/resources?search_api_fulltext=sao%20tome%20and%20principe" }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in São Tomé and Príncipe", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in São Tomé and Príncipe",
          plain:
            "None of the trials in OnCo's records lists São Tomé and Príncipe among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists São Tomé and Príncipe. A query of the registry's own API that day for cancer studies with a location in the country also returned none. The cancer research from the country that OnCo found is the 2026 study of medical evacuations, written by authors from Hospital Ayres de Menezes with researchers at the Portuguese Institute of Oncology in Porto.",
          links: [{ label: "ClinicalTrials.gov: cancer studies with sites in São Tomé and Príncipe", url: CTGOV }, L_EVAC],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find a national cancer plan, a medicines regulator's page, a source on who pays for cancer medicines, or a description of the cancer care given at Hospital Ayres de Menezes itself.",
      detail:
        "The Ministry of Health's address, ms.gov.st, did not resolve on 16 November 2026. The evacuation study cites the ministry's health statistics yearbook for 2023 at another address, minsaude.st, which answered on 16 November 2026 and which OnCo has not yet read. The evacuation study itself was read in full through Europe PMC on 16 November 2026: it gives Portugal as the destination and says who pays, and both are now on this page. WHO's 2020 profile gives an HPV programme coverage figure for 2018 for which WHO's immunisation database holds no matching row, so OnCo has not used it. Until these are read, the Patient Evacuation Board and the treating doctors at Hospital Ayres de Menezes are the places to ask.",
      links: [L_EVAC, L_EVAC_FULL, L_WHO, { label: "WHO Regional Office for Africa: Sao Tome and Principe (in Portuguese)", url: "https://www.afro.who.int/pt/countries/sao-tome-and-principe" }],
    },
  ],
  institutions: ["hospital-ayres-de-menezes", "ipo-porto", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-david-cancer-medical-evacuees-sao-tome-ecancer-2026"],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres, and the 2026 study of medical evacuations, resolved through Europe PMC and read in full.",
  verify:
    "This page rests on international estimates and one hospital study. Check with the Ministry of Health's Patient Evacuation Board or the treating doctors at Hospital Ayres de Menezes before relying on it.",
  verifyLinks: [L_IARC, L_EVAC],
};
