import type { CountryDive } from "@/data/country-dive";

/**
 * Liberia deep dive: the hand-written cards for /countries/lr/ (wave 14). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country
 * Profile 2020 and cervical cancer profile 2021 (PDF text), the Ministry of Health's news page of 1 October 2025, the
 * JFK Medical Center's oncology page, the NIH ClinRegs profile, the regulator's home page, the contents pages of the
 * National Cancer Policy 2018 to 2022 on the ICCP portal (the body of that PDF is scanned images and was not read),
 * the Europe PMC record of a 2022 paper on cancer care planning, WHO's list of regulators at maturity level 3 and 4,
 * the African Union's treaty list, WHO's immunisation data API, the World Bank's health expenditure series and IAEA
 * DIRAC's public data. Sources that could not be read are named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/430-liberia-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lbr-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-lbr-2021-country-profile-en.pdf";
const MOH_OCT_2025 = "https://moh.gov.lr/news/2025/moh-launches-breast-cancer-awarenesswith-new-focus-on-early-detection-and-treatment/";
const JFK_ONCOLOGY = "https://jfkmc.gov.lr/oncology/";
const CANCER_POLICY = "https://www.iccp-portal.org/sites/default/files/plans/LBR_B5_s21_Cancer%20Policy%20Report-Final%20Edition%20%281%29.pdf";
const ICCP_POLICY_PAGE = "https://www.iccp-portal.org/resources/national-cancer-policy";
const BEDDOE_PAPER = "https://doi.org/10.1200/go.21.00287";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/liberia";
const LMHRA = "https://lmhra.gov.lr/";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LBR'%20and%20contains(ANTIGEN,'HPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LBR'%20and%20contains(ANTIGEN,'HPV')";
const WB_OOP = "https://api.worldbank.org/v2/country/LBR/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_CHE = "https://api.worldbank.org/v2/country/LBR/indicator/SH.XPD.CHEX.PC.CD?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/LBR/indicator/SH.XPD.GHED.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/LBR/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Liberia&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Liberia&query.cond=cancer&pageSize=20&countTotal=true";

export const LR_DIVE: CountryDive = {
  iso2: "LR",
  iso3: "LBR",
  name: "Liberia",
  flag: "🇱🇷",
  asOf: "2026-11-16",
  title: "Cancer in Liberia",
  description:
    "Cancer in Liberia: IARC's 2024 estimate of 4,217 new cancers and 2,745 deaths, modelled from neighbouring countries' rates, breast and cervical cancer leading, an oncology unit at the JFK Medical Center in Monrovia, a radiotherapy centre pledged by the Ministry of Health in October 2025 and none in IAEA's directory, a National Cancer Policy for 2018 to 2022, health spending of about USD 104 a person in 2023 with 63% paid out of pocket, HPV vaccination since 2019, and no trial in OnCo's records with a site in Liberia.",
  lede:
    "The JFK Medical Center in Monrovia has an oncology unit whose undated page lists chemotherapy among its treatments. In October 2025 the Ministry of Health pledged to build a radiotherapy centre and to expand early detection, and WHO announced plans with it to extend breast screening and restart the national cancer registry. IARC's 2024 figure of 4,217 new cancers a year is built from neighbouring countries' rates: these are modelled figures, not counts.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Liberia is 4,217 new cancers and 2,745 deaths, an age-standardised incidence of 120.3 per 100,000 (100.5 in men, 139.4 in women) and an age-standardised mortality of 82.1. These are modelled figures, not counts. The fact sheet's \"Data source and methods\" box names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\" (IARC's method 5); mortality is \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (method 3c). OnCo found no Liberian registry figures to set beside them.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Liberia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Liberia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 4,200 new cancers a year by IARC's estimate, six in ten in women",
          plain:
            "IARC estimates 4,217 new cancers in Liberia in 2024, 2,628 of them in women, and 2,745 cancer deaths. Breast cancer is estimated to be the commonest cancer, followed by cervical, prostate and liver cancer, and it is also the commonest cause of cancer death. The estimate is modelled from neighbouring countries' rates, not counted in Liberia.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 885 breast cancers (421 deaths), 561 cervical cancers (345 deaths), 393 prostate cancers (245 deaths), 315 liver cancers (283 deaths) and 207 colorectal cancers (117 deaths). By deaths the order is breast, cervix, liver, prostate. The risk of developing a cancer before age 75 is 12.4%, and an estimated 7,311 people are living within five years of a diagnosis. The fact sheet names no Liberian data source for incidence. WHO's 2020 profile estimated 269 cancers a year in children aged 0 to 14 and said the incidence and mortality estimates both have a high degree of uncertainty, the first because they are not based on a population-based cancer registry and the second because there are no national mortality data behind them.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Liberia (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry-status",
          title: "A national cancer registry that WHO planned in 2025 to restart",
          plain:
            "OnCo found no published counts from a Liberian cancer registry. The Ministry of Health's news page of 1 October 2025 says WHO planned to reactivate the National Cancer Registry with updated software, which implies it was not then working.",
          detail:
            "WHO's 2020 profile recorded \"registration activity\" for a population-based cancer registry in 2019 and no coverage of death registration for 2007 to 2016; its 2021 cervical cancer profile recorded that no population-based cancer registry existed. The contents page of the National Cancer Policy 2018 to 2022 lists a section on a cancer registry, but the body of that document is scanned images that OnCo could not read. The African Cancer Registry Network's member list, read on 16 November 2026, does not include Liberia. OnCo found no report on whether the registry has restarted; the Ministry of Health is the place to ask.",
          links: [
            { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: MOH_OCT_2025 },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
            { label: "WHO: cervical cancer profile 2021, Liberia (PDF)", url: WHO_CERVICAL },
            { label: "African Cancer Registry Network: member list", url: AFCRN_LIST },
          ],
        },
      ],
      tables: [
        {
          id: "lr-globocan-sites",
          title: "The five commonest cancers in Liberia, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 885, deaths: 421 },
            { site: "Cervix uteri", cases: 561, deaths: 345 },
            { site: "Prostate", cases: 393, deaths: 245 },
            { site: "Liver", cases: 315, deaths: 283 },
            { site: "Colorectum", cases: 207, deaths: 117 },
          ],
          note: "OnCo found no Liberian registry figures to set beside these. They are estimates built from other countries' rates, not counts of people diagnosed in Liberia.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Liberia (PDF)", url: IARC_FACTSHEET }],
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
          title: "About USD 104 a person on health in 2023, nearly two thirds of it out of pocket",
          plain:
            "Liberia spent about 104 US dollars a person on health in 2023, and households paid 63% of it out of their own pockets, according to WHO's health expenditure figures. OnCo found no source on what public schemes cover for cancer.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, gives current health spending of USD 89 per person in 2021, 100 in 2022 and 104 in 2023, and out-of-pocket spending of 61.7%, 62.3% and 63.2% of it. In 2023 the government paid 10.0% of health spending from domestic funds and external donors 18.3%. These figures cover all health care, not cancer. WHO's 2020 profile recorded the availability of opioids for pain relief for 2015 to 2017 as 0 defined daily doses per million people per day. OnCo did not find a price list for cancer care or a statement of what is free; the JFK Medical Center is the place to ask what a course of treatment costs.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Liberia (API)", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Liberia (API)", url: WB_CHE },
            { label: "World Bank: domestic general government health expenditure, Liberia (API)", url: WB_GOV },
            { label: "World Bank: external health expenditure, Liberia (API)", url: WB_EXT },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
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
          id: "lmhra",
          title: "The medicines authority registers medicines and authorises clinical trials",
          plain:
            "The Liberia Medicines and Health Products Regulatory Authority registers medicines, licenses and inspects, tests quality and must approve a clinical trial before it starts, alongside the National Research Ethics Board of Liberia.",
          detail:
            "The NIH's ClinRegs profile, whose latest listed update is dated 13 April 2026, says that under its Act the authority is an autonomous government agency that reports to the President, responsible for clinical trial approval, oversight and inspection and for registration, import and export control, licensing, quality control and pharmacovigilance. A Clinical Trials Unit in its Pharmacovigilance and Clinical Trials Department coordinates trial applications with a Scientific Advisory Committee, and the authority issues its final approval once ethics approval is given. The authority's home page, read on 16 November 2026, says it was officially established on 29 September 2010 and displays a count of 699 medicines approved for marketing. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include Liberia. The African Union's list of 19 September 2023 shows Liberia had neither signed nor ratified the African Medicines Agency treaty. OnCo did not read the authority's register to see which cancer medicines are on it.",
          links: [
            { label: "NIH ClinRegs: Liberia", url: CLINREGS },
            { label: "Liberia Medicines and Health Products Regulatory Authority", url: LMHRA },
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
      aside: { label: "WHO: cervical cancer profile 2021, Liberia (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2019; 34% of girls had a dose by age 15 in WHO's 2025 figure",
          plain:
            "WHO's immunisation database records the HPV vaccine as introduced nationwide in Liberia in 2019. Its 2025 estimate is that 34% of girls had received a dose by the age of 15. Programme coverage, the share of that year's target group given a first dose, was 79% in 2023 and 71% in 2024.",
          detail:
            "These are WHO's rows read from its immunisation data API on 16 November 2026. Programme coverage for a first dose in girls was 13% in 2019, 40% in 2020 and 2021, 42% in 2022, 79% in 2023 (55,899 doses against a target of 71,171) and 71% in 2024. For 2025 the row gives 34%, with 167,092 doses against a target of 484,830, a target about seven times the earlier ones; the database does not say why, and OnCo does not guess. Coverage by age 15 appears for 2025 alone, at 34% for both first and last dose. The country's own administrative reports in the same database exceed 100% for 2025 and are not quoted here. WHO's 2021 profile gives the first target group as girls aged 9.",
          links: [
            { label: "WHO immunisation data API: HPV coverage rows, Liberia", url: WHO_HPV_COV },
            { label: "WHO immunisation data API: HPV vaccine introduction, Liberia", url: WHO_HPV_INTRO },
            { label: "WHO: cervical cancer profile 2021, Liberia (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "screening-2025",
          title: "No national screening programme in WHO's profiles; breast screening planned in 30 clinics",
          plain:
            "WHO's 2021 cervical cancer profile recorded no national cervical screening programme in Liberia and estimated that 9% of women aged 30 to 49 had been screened in the previous five years. In October 2025 WHO announced plans with the Ministry of Health to extend breast cancer screening to 30 primary health care facilities within six months.",
          detail:
            "The 2021 profile gives 12% of women aged 30 to 49 as ever screened (2019), no programme for early detection of first symptoms in primary care and no clearly defined referral system. WHO's 2020 profile recorded no breast or cervical screening programme in 2019 and early detection guidelines for none of the four cancers it asks about. The Ministry's news page of 1 October 2025, on the launch of its annual breast cancer awareness campaign, says the WHO plan includes training 120 health workers and community outreach and radio campaigns. OnCo found no report of how many of the 30 facilities now screen; the Ministry is the place to ask.",
          links: [
            { label: "WHO: cervical cancer profile 2021, Liberia (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
            { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: MOH_OCT_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Liberia",
      cards: [
        {
          id: "jfk",
          title: "An oncology unit at the JFK Medical Center in Monrovia",
          plain:
            "The John F. Kennedy Medical Center in Monrovia, whose site sits on the government's gov.lr domain, has an oncology unit. Its page describes diagnosis, chemotherapy, pain management, nutritional support, counselling and palliative care.",
          detail:
            "The hospital's oncology page, which is undated, also lists radiation therapy, immunotherapy and targeted treatments among what the unit administers. Other sources do not support radiotherapy being available: the Ministry of Health said on 1 October 2025 that the country's radiotherapy centre was still to be built, and IAEA's directory lists none. OnCo therefore reads the page's list as a general description of oncology, not a statement of what is given in Monrovia today. WHO's 2021 cervical cancer profile recorded a cancer centre or cancer department at tertiary level, pathology laboratories and chemotherapy as generally available, and radiotherapy as not. The acting head of the unit spoke at the Ministry's campaign launch in October 2025. Ask the unit directly which medicines it has in stock.",
          links: [
            { label: "JFK Medical Center: Oncology", url: JFK_ONCOLOGY },
            { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: MOH_OCT_2025 },
            { label: "WHO: cervical cancer profile 2021, Liberia (PDF)", url: WHO_CERVICAL },
          ],
        },
        {
          id: "radiotherapy",
          title: "A radiotherapy centre pledged in October 2025; none in IAEA's directory",
          plain:
            "On 1 October 2025 the Ministry of Health pledged to construct what it called the nation's first radiotherapy centre, backed by the President and supported by WHO. IAEA's directory of radiotherapy centres, read on 16 November 2026, lists no centre in Liberia.",
          detail:
            "The directory's public data had no row for Liberia among its countries and no centre among 8,627 equipment rows. WHO's 2020 profile recorded 0.0 external beam radiotherapy machines per 10,000 cancer patients and no radiation oncologist for 2019. The Ministry's page gives no site, cost or opening date for the centre. A 2022 paper by authors from the Ministry of Health, the University of Liberia and a New York medical school describes the planning of cancer care from 2013 to 2020, the forming of a National Cancer Committee and the part the International Atomic Energy Agency played in it. OnCo found no source on where Liberians who need radiotherapy are sent, so it names no country; ask the treating hospital.",
          links: [
            { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: MOH_OCT_2025 },
            { label: "IAEA DIRAC: directory of radiotherapy centres", url: DIRAC },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
            { label: "Beddoe et al., planning infrastructure for cancer care in Liberia (JCO Global Oncology 2022)", url: BEDDOE_PAPER },
          ],
        },
        {
          id: "policy",
          title: "A National Cancer Policy for 2018 to 2022, which OnCo could read only in outline",
          plain:
            "The ICCP portal holds a National Cancer Policy for Liberia covering 2018 to 2022, dated August 2018. The document is posted as scanned pages, so OnCo read its contents page and nothing beneath it.",
          detail:
            "The contents page lists an overview of cancer in Liberia; a national cancer control strategy with primary prevention, early detection, diagnosis and treatment, pain management and palliative care, surveillance and research; three implementation phases; a National Cancer Control Committee; priority groups, which the heading abbreviates as TWGs without the contents page spelling it out, on breast and cervical cancer, liver cancer and childhood cancers; programme goals that also name leukaemia and prostate cancer; and a section on a cancer registry. WHO's 2020 profile, describing 2019, recorded \"n/a\" for a national cancer control plan, an operational integrated non-communicable disease plan that included palliative care, and no cancer management guidelines. The policy's period has ended and OnCo found no successor. A future pass should read the scanned pages by eye.",
          links: [
            { label: "Liberia: National Cancer Policy 2018 to 2022 (August 2018, scanned PDF via ICCP)", url: CANCER_POLICY },
            { label: "ICCP portal: National cancer policy, Liberia", url: ICCP_POLICY_PAGE },
            { label: "WHO: Cancer Country Profile 2020, Liberia (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Liberia", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Liberia",
          plain:
            "None of the trials in OnCo's records lists Liberia among its countries. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search, with one caution about the name.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: no trial record lists Liberia. A query of the registry's own interface the same day for the condition \"cancer\" with the location \"Liberia\" returned seven studies, and every one of them has its site in the city of Liberia in Guanacaste Province, Costa Rica: they are HPV vaccine studies run there. The same query limited to the registry's country field returned no study. Searching by place name alone will mislead; filter by country. Published work from Liberia that OnCo read in abstract is the 2022 planning paper and a 2024 pilot of screening for anal cancer among 110 participants in Liberia.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Liberia", url: CTGOV },
            { label: "ClinicalTrials.gov API: the query OnCo ran", url: CTGOV_API },
            { label: "Beddoe et al., planning infrastructure for cancer care in Liberia (JCO Global Oncology 2022)", url: BEDDOE_PAPER },
            { label: "Reynolds et al., screen, triage and treat for anal cancer in Liberia (Annals of Global Health 2024)", url: "https://doi.org/10.5334/aogh.4576" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "What OnCo could not find or read for Liberia",
      plain:
        "OnCo could not read the body of the National Cancer Policy 2018 to 2022, and did not find registry counts, the state of the pledged radiotherapy centre, where patients are referred for radiotherapy, or what public schemes pay for cancer care.",
      detail:
        "The policy on the ICCP portal is a 15 megabyte PDF of scanned pages from which only the contents page came out as text. WHO's 2021 cervical cancer profile prints a programme coverage figure for HPV vaccination in a chart whose labels did not come through clearly, so OnCo used WHO's data API instead. The JFK Medical Center's oncology page is undated and lists treatments that other sources say are not available. A future pass should read the scanned policy by eye, ask the Ministry of Health about the registry and the radiotherapy centre, and look for a current cancer plan. Readers can ask the oncology unit at the JFK Medical Center or WHO's country office in Monrovia.",
      links: [
        { label: "Liberia: National Cancer Policy 2018 to 2022 (August 2018, scanned PDF via ICCP)", url: CANCER_POLICY },
        { label: "JFK Medical Center: Oncology", url: JFK_ONCOLOGY },
        { label: "Ministry of Health, Liberia", url: "https://moh.gov.lr/" },
      ],
    },
  ],
  institutions: ["liberia-ministry-of-health", "jfk-medical-center-monrovia", "lmhra-liberia", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer profile and 2021 cervical cancer profile, the Ministry of Health's news page of 1 October 2025, the JFK Medical Center's oncology page, the contents page of the National Cancer Policy 2018 to 2022, the NIH ClinRegs profile, the regulator's site, WHO's list of regulators, the African Union's treaty list, WHO's immunisation data, the World Bank's health expenditure series, IAEA's radiotherapy directory and two paper abstracts on Europe PMC.",
  verify:
    "The cancer numbers here are modelled estimates, and the account of services rests on a hospital page, a ministry news item and WHO survey answers from 2019 to 2021. Check with the Ministry of Health or the treating hospital before relying on it.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Liberia (PDF)", url: IARC_FACTSHEET },
    { label: "Ministry of Health, Liberia: breast cancer awareness launch (1 October 2025)", url: MOH_OCT_2025 },
    { label: "JFK Medical Center: Oncology", url: JFK_ONCOLOGY },
  ],
};
