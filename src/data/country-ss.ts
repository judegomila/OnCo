import type { CountryDive } from "@/data/country-dive";

/**
 * South Sudan deep dive: the hand-written cards for /countries/ss/ (wave 14). South Sudan is a fragile,
 * conflict-affected state with very little published cancer data, so this page keeps to what IARC, WHO, the World
 * Bank, the IAEA and the Ministry of Health publish, with two news reports where no official page exists, and says
 * where nothing is known. Every figure was read from the raw text of its source on 16 November 2026, not from a summary
 * of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country Profile 2020 and cervical cancer profile 2021 (PDF
 * text), the Ministry of Health's Noncommunicable Disease Department biannual plan 2020 to 2021 (PDF text from the ICCP
 * portal), the ministry's site, The Radio Community's report of the South Sudan Cancer Network launch (5 February
 * 2026), Xinhua's report of the Juba screening centre (via China Daily, August 2020), the World Bank's health
 * expenditure series from its API, WHO's immunisation data API, IAEA DIRAC's public equipment data and
 * ClinicalTrials.gov's API. Sources not found or not read are under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/728-south-sudan-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/ssd-2020.pdf";
const WHO_CX = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-ssd-2021-country-profile-en.pdf";
const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/SSD_B3_s21_NCD%20MOH%20DEPT%20TWO%20YEAR%20PLAN_JUN%205%202020.pdf";
const MOH = "https://moh.gov.ss/";
const TRC = "https://theradiocommunity.org/south-sudan-launches-cancer-network-5366";
const XINHUA = "https://govt.chinadaily.com.cn/s/202008/26/WS5f4603c0498ed1e2f3408d41/south-sudan-inaugurates-china-aided-cancer-screening-facility.html";
const WB_OOP = "https://api.worldbank.org/v2/country/SSD/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/SSD/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/SSD/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/SSD/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'SSD'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=South%20Sudan&cond=cancer";

const L_IARC = { label: "IARC: GLOBOCAN 2024 fact sheet, South Sudan (PDF)", url: IARC_FACTSHEET };
const L_WHO = { label: "WHO: Cancer Country Profile 2020, South Sudan (PDF)", url: WHO_PROFILE };
const L_CX = { label: "WHO: cervical cancer country profile 2021, South Sudan (PDF)", url: WHO_CX };
const L_NCD = { label: "Ministry of Health, South Sudan: Noncommunicable Disease Department biannual plan 2020 to 2021 (March 2020, PDF via ICCP)", url: NCD_PLAN };
const L_TRC = { label: "The Radio Community: South Sudan launches Cancer Network (5 February 2026)", url: TRC };
const L_XINHUA = { label: "Xinhua, via China Daily: South Sudan inaugurates China-aided cancer screening facility (26 August 2020)", url: XINHUA };
const L_DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC };
const L_MOH = { label: "Ministry of Health, Republic of South Sudan", url: MOH };
const L_AFRO_REG = { label: "WHO Regional Office for Africa: South Sudan launches first-ever cancer registry (9 November 2026)", url: "https://www.afro.who.int/countries/south-sudan/news/landmark-step-public-health-south-sudan-launches-first-ever-cancer-registry" };

export const SS_DIVE: CountryDive = {
  iso2: "SS",
  iso3: "SSD",
  name: "South Sudan",
  flag: "🇸🇸",
  asOf: "2026-11-16",
  title: "Cancer in South Sudan",
  description:
    "Cancer in South Sudan from international and government sources: IARC's estimate of 8,124 new cancers and 5,218 deaths in 2024, modelled from neighbouring countries' rates, breast and cervical cancer leading; a cancer department in the health ministry and a national cancer network launched in February 2026, with an oncology unit planned at Juba Teaching Hospital; a first cancer registry at Juba Teaching Hospital reported by WHO in November 2026, where WHO's 2021 profile had recorded none; no radiotherapy centre in IAEA's directory and no HPV vaccination; health spending of about USD 73 a person in 2023, 62% of it from external funders; and no trial in OnCo's records with a site in the country.",
  lede:
    "South Sudan's Ministry of Health has set up a cancer department and written protocols to guide its work, and an oncology unit is planned at Juba Teaching Hospital, according to a report of the launch of the South Sudan Cancer Network in February 2026. A cervical cancer screening centre opened at that hospital in 2020. WHO's 2021 profile recorded no population-based cancer registry; WHO's Regional Office for Africa reported on 9 November 2026 that the country's first cancer registry had been inaugurated at Juba Teaching Hospital. IARC's figures for the country are modelled from its neighbours' rates.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for South Sudan is 8,124 new cancers and 5,218 deaths, an age-standardised incidence of 107.9 per 100,000 (99.0 in men, 117.9 in women). These are modelled figures, not counts. IARC's fact sheet names no country-specific source for incidence and gives its method as rates based on incidence estimates or registry data from neighbouring countries; mortality is national incidence estimates applied to modelled mortality-to-incidence ratios built on registry survival data. WHO's 2020 profile said of the earlier estimates it carried for South Sudan that they have a high degree of uncertainty because they are not based on a population-based cancer registry or on national mortality data.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in South Sudan",
      aside: L_IARC,
      cards: [
        {
          id: "shape",
          title: "About 8,100 new cancers a year in IARC's estimate, built from neighbouring countries' rates",
          plain:
            "IARC estimates 8,124 new cancers in South Sudan in 2024, 5,036 of them in women, and 5,218 cancer deaths. Breast cancer is the commonest, then cervical, prostate, colorectal and liver cancer. The figures are modelled from neighbouring countries, not counted in South Sudan.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,760 breast cancers (840 deaths), 890 cervical cancers (554 deaths), 629 prostate cancers (401 deaths), 564 colorectal cancers (323 deaths) and 393 liver cancers (361 deaths), in a population of 11.9 million. Breast cancer causes the most cancer deaths, followed by cervical and prostate cancer. The risk of developing a cancer before age 75 is 11.8%, and an estimated 11,645 people are living within five years of a diagnosis. The fact sheet's methods box gives the incidence method as rates based on incidence estimates or registry data from neighbouring countries. WHO's 2020 profile estimated 622 cancers a year in children aged 0 to 14.",
          links: [L_IARC, L_WHO],
        },
        {
          id: "registry",
          title: "WHO reported the country's first cancer registry in November 2026; its 2021 profile had recorded none",
          plain:
            "WHO's 2021 cervical cancer profile records that no population-based cancer registry existed in South Sudan. At the launch of the South Sudan Cancer Network in February 2026 the Governor of Central Equatoria State called for a cancer registry to be set up. On 9 November 2026 WHO's Regional Office for Africa reported that the country's first cancer registry had been inaugurated at Juba Teaching Hospital.",
          detail:
            "WHO's 2020 profile recorded no coverage for the quality of mortality registration for 2007 to 2016, and its 2021 cervical cancer profile answers no to whether a population-based cancer registry exists (2021). WHO's Regional Office for Africa reported on 9 November 2026 that the Ministry of Health, working with the South Sudan Cancer Network and supported by WHO, IARC and the African Cancer Registry Network, had established and inaugurated the Juba Population-Based Cancer Registry at Juba Teaching Hospital; the report gives no figures from it. The African Cancer Registry Network's member list, read on 16 November 2026, names 35 registries and none in South Sudan. The Radio Community's report of the network's launch quotes the governor saying a registry is needed to know the number of people with cancer, which he said may be higher than known for lack of testing and early detection. OnCo found no hospital-based count from the country.",
          links: [L_CX, L_WHO, L_TRC, L_AFRO_REG, { label: "African Cancer Registry Network: member registries", url: "https://afcrn.org/index.php/membership/membership-list" }],
        },
      ],
      tables: [
        {
          id: "ss-globocan-sites",
          title: "The five commonest cancers in South Sudan, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1760, deaths: 840 },
            { site: "Cervix uteri", cases: 890, deaths: 554 },
            { site: "Prostate", cases: 629, deaths: 401 },
            { site: "Colorectum", cases: 564, deaths: 323 },
            { site: "Liver", cases: 393, deaths: 361 },
          ],
          note: "OnCo found no South Sudanese registry figures to set beside these. They are estimates. WHO's 2020 profile said of its own estimates for the country that they have a high degree of uncertainty because they are not based on a population-based cancer registry.",
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
          title: "About USD 73 a person on health in 2023, 62% of it from external funders",
          plain:
            "South Sudan spent about 73 US dollars a person on health in 2023. External funders paid 62% of it, households 27% out of pocket and the government 4% from its own revenue, according to the World Bank's series from WHO's health expenditure database. OnCo did not find a source on who pays for cancer care.",
          detail:
            "The World Bank's series gives current health spending of USD 35 per person in 2021, 48 in 2022 and 73 in 2023, and out-of-pocket spending of 30.9%, 31.8% and 27.1% of current health spending in those years. In 2023 external health expenditure was 62.3% and government spending from domestic sources 4.3%. At the Cancer Network's launch in February 2026 the health minister was reported as saying that 85% of the health budget comes from donors. WHO's 2021 cervical cancer profile recorded palliative care for people with non-communicable diseases as not generally available in primary care or in community or home-based care, and reported opioid consumption for 2017 as 0 mg of oral morphine equivalent per person.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, South Sudan (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, South Sudan (API)", url: WB_CHE },
            { label: "World Bank: external health expenditure, South Sudan (API)", url: WB_EXT },
            { label: "World Bank: domestic general government health expenditure, South Sudan (API)", url: WB_GOV },
            L_TRC,
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
          id: "dfca",
          title: "The ministry lists a Drugs and Food Control Authority; OnCo found no rules to read",
          plain:
            "The Ministry of Health's site lists a Drugs and Food Control Authority among its commissions. Its page carried only a one-line welcome beyond the site's menu when OnCo read it, so this page states nothing about how cancer medicines are approved or how trials are authorised in South Sudan.",
          detail:
            "The ministry's site was read on 16 November 2026; the authority's page returned the site's navigation and the line \"welcome to Drugs & Food control Authority Unit\", with no description, law or register. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include South Sudan, and the African Union's list of 19 September 2023 records no signature of the African Medicines Agency treaty by South Sudan. The ministry also lists a directorate of pharmaceuticals and medical supplies and a central medical stores. A future pass should look for the Drug and Food Control Authority Act and the authority's own publications.",
          links: [
            L_MOH,
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
          id: "cervical",
          title: "A cervical screening centre in Juba since 2020; no national programme in WHO's 2021 profile",
          plain:
            "A cervical cancer screening centre opened at Juba Teaching and Referral Hospital on 25 August 2020, built with support from the Chinese government. WHO's 2021 profile recorded no national cervical screening programme, and 7% of women aged 30 to 49 screened in the previous five years.",
          detail:
            "Xinhua's report of the opening calls the centre the first of its kind in the country and quotes the hospital's director hoping it would serve treatment as well as screening. The Ministry of Health's Noncommunicable Disease Department plan for 2020 to 2021 said there was then no organised programme against cervical cancer: in the ministry's facility survey 3% of health facilities reported offering cervical screening, nearly all in towns, and 13% of those had all the equipment needed. The plan set out to offer screening by visual inspection with acetic acid in five health facilities, train 25 health workers and reach 5,000 women. WHO's 2021 profile also records 10% of women aged 30 to 49 ever screened (2019), guidelines for early detection in primary care and for cervical cancer management in place, and no breast cancer screening programme in its 2020 profile.",
          links: [L_XINHUA, L_NCD, L_CX, L_WHO],
        },
        {
          id: "hpv",
          title: "HPV vaccination has not been introduced",
          plain:
            "WHO's immunisation database shows the HPV vaccine as not introduced in South Sudan in every year to 2025. The health ministry's plan of March 2020 said the vaccine was still not routinely offered in the country.",
          detail:
            "WHO's immunisation data API, queried on 16 November 2026, lists the HPV vaccine as not introduced for each year from 2011 to 2025; its coverage table holds administrative rows for 2019 and 2022 that record zero doses. WHO's 2021 cervical cancer profile records the vaccine as not included in the national vaccination programme. The ministry's Noncommunicable Disease Department plan for 2020 to 2021 describes the vaccine as one of the most important interventions for preventing cervical cancer and as not routinely offered.",
          links: [{ label: "WHO immunisation data: HPV vaccine introduction, South Sudan (API)", url: WHO_HPV_INTRO }, L_CX, L_NCD],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What stands out in South Sudan",
      cards: [
        {
          id: "network",
          title: "A cancer department, protocols and a national network launched in February 2026",
          plain:
            "The South Sudan Cancer Network was launched in Juba on 4 February 2026, World Cancer Day. The report of the launch says the Ministry of Health has set up a cancer department and written protocols, and plans an oncology unit at Juba Teaching Hospital, with a comprehensive cancer centre as the eventual aim.",
          detail:
            "The Radio Community's report says the launch brought together government officials, health partners and civil society; that the network's vice president said it will coordinate efforts across the country to detect cancer early and improve treatment outcomes; that the Governor of Central Equatoria State pledged land in Yei County for cancer services; and that WHO's representative said cancer accounts for 7% of deaths in South Sudan. This is a news report, not a ministry document: the Ministry of Health's own site, read on 16 November 2026, carried no page on the cancer department or its protocols that OnCo could find.",
          links: [L_TRC, L_MOH],
        },
        {
          id: "services",
          title: "No radiotherapy centre in IAEA's directory; WHO's 2021 profile recorded a cancer department as not generally available",
          plain:
            "IAEA's directory of radiotherapy centres lists no centre in South Sudan. WHO's 2021 cervical cancer profile recorded a cancer centre or department, pathology, cancer surgery, chemotherapy and radiotherapy each as not generally available.",
          detail:
            "IAEA DIRAC's public equipment data, read on 16 November 2026, has no row for South Sudan. WHO's 2021 profile answers no for each of the five services, and its 2020 profile recorded no cancer management guidelines for 2019 and an integrated plan for non-communicable diseases under development. The 2026 report of an oncology unit planned at Juba Teaching Hospital suggests this is starting to change, but OnCo found no source saying the unit has opened, and none on where people with cancer are referred for treatment abroad.",
          links: [L_DIRAC, L_CX, L_WHO, L_TRC],
        },
        {
          id: "plan",
          title: "No national cancer plan found; cancer sat inside a two-year plan for non-communicable diseases",
          plain:
            "OnCo found no national cancer control plan for South Sudan. The ICCP portal holds the health ministry's Noncommunicable Disease Department plan for 2020 to 2021, whose cancer content is cervical cancer screening.",
          detail:
            "WHO's 2020 profile entered n/a against a national cancer control plan for 2019. A search of the ICCP portal for South Sudan on 16 November 2026 returned WHO's profiles and the department's biannual plan of March 2020; that is what the search returned, not proof that no cancer plan exists. The biannual plan covers cardiovascular disease, diabetes, chronic respiratory disease, cervical cancer and mental health, and its one cancer intervention is routine cervical screening by visual inspection. The protocols reported in February 2026 may amount to more, but OnCo has not read them.",
          links: [L_WHO, L_NCD, { label: "ICCP portal: search for South Sudan", url: "https://www.iccp-portal.org/resources?search_api_fulltext=south%20sudan" }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in South Sudan", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in South Sudan",
          plain:
            "None of the trials in OnCo's records lists South Sudan among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists South Sudan. A query of the registry's own API that day for cancer studies with a location in South Sudan returned one record, NCT02788214, the Helicobacter Pylori Genome Project, an observational study that the registry marks as terminated. Its listed countries include Sudan, South Africa and South Korea and not South Sudan, so the search matched on the words and the registry showed no cancer study with a site in South Sudan. A Lancet Oncology article of 2026 on cancer prevention, treatment and palliative care in South Sudan was found by title and not read.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in South Sudan", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT02788214", url: "https://clinicaltrials.gov/study/NCT02788214" },
            { label: "Adepoju, cancer prevention, treatment, and palliative care in South Sudan (Lancet Oncology 2026)", url: "https://doi.org/10.1016/S1470-2045(26)00111-7" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not read for this page",
      plain:
        "OnCo did not find the ministry's cancer protocols, any account of cancer treatment now given in the country, where patients are referred abroad, the medicines regulator's rules, or any scheme that pays for cancer care.",
      detail:
        "The Ministry of Health's site answered on 16 November 2026, but its Drugs and Food Control Authority page held only the site's menu, and OnCo found no cancer department page. The ministry's cancer department, its protocols and the planned oncology unit are known here from one news report. The first six pages of the WHO country office's news list were read on 16 November 2026: they hold the report of the cancer registry (9 November 2026) and a report of 26 February 2026 that also records the Cancer Network's launch on 4 February and says WHO is supporting the ministry in developing a national cancer control strategy. The Lancet Oncology article of 2026 has no abstract in Europe PMC and its publisher's page did not open to OnCo on 16 November 2026, so it was not read; it is the first thing a future pass should read, with any text of the ministry's protocols. Until then the Ministry of Health's cancer department, Juba Teaching Hospital and the South Sudan Cancer Network are the places to ask.",
      links: [L_MOH, L_TRC, L_AFRO_REG, { label: "WHO Regional Office for Africa: Vice President receives WHO to discuss strengthening cancer care (26 February 2026)", url: "https://www.afro.who.int/countries/south-sudan/news/he-vice-president-josephine-lagu-yanga-receives-who-courtesy-visit-discuss-strengthening-cancer-care" }, { label: "WHO Regional Office for Africa: South Sudan", url: "https://www.afro.who.int/countries/south-sudan" }],
    },
  ],
  institutions: ["south-sudan-ministry-of-health", "juba-teaching-hospital", "south-sudan-cancer-network", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the Ministry of Health's Noncommunicable Disease Department plan for 2020 to 2021 and its website, two news reports (The Radio Community, February 2026; Xinhua, August 2020), two news items from WHO's Regional Office for Africa (February and November 2026), the World Bank's health expenditure series, WHO's immunisation data, IAEA's directory of radiotherapy centres and ClinicalTrials.gov.",
  verify:
    "A news report of February 2026 describes cancer services being set up in South Sudan, and the sources here are few. Check with the Ministry of Health's cancer department or Juba Teaching Hospital before relying on this page.",
  verifyLinks: [L_IARC, L_TRC],
};
