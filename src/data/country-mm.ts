import type { CountryDive } from "@/data/country-dive";

/**
 * Myanmar deep dive: the hand-written cards for /countries/mm/ (wave 5). Every figure was read on 11 November 2026 from
 * the raw text of its source, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Myanmar (PDF text) and
 * OnCo's copy of the GLOBOCAN data, WHO's Cancer Country Profile 2020 for Myanmar (PDF text), the World Bank's API for
 * the WHO Global Health Expenditure Database indicators, the WHO/UNICEF estimates of HPV vaccination coverage (WHO's
 * Global Health Observatory and immunization data APIs), the IAEA's DIRAC country table (its public JSON), OCHA's
 * Myanmar page, ClinicalTrials.gov's API, the Department of Food and Drug Administration's own pages, and six
 * papers resolved through Europe PMC, read in full text where open access. Where a figure could not be read it is named
 * under `gaps`.
 *
 * Myanmar since February 2021: the military took power on 1 February 2021 and conflict has spread since. The cards say
 * what WHO, UN agencies, the IAEA and peer-reviewed papers say, attribute each statement, and use the words their
 * sources use ("military take-over" for OCHA, "coup" for the papers). They do not speculate beyond them.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/104-myanmar-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mmr-2020.pdf";
const NPT_PBCR = "https://doi.org/10.31557/apjcp.2022.23.1.311";
const NPT_PBCR_FULL = "https://europepmc.org/article/PMC/PMC9258644";
const HPV_REVIEW = "https://doi.org/10.1007/s44197-025-00436-4";
const HPV_REVIEW_FULL = "https://europepmc.org/article/PMC/PMC12198088";
const THINN = "https://doi.org/10.1055/s-0043-1764212";
const THINN_FULL = "https://europepmc.org/article/PMC/PMC9966159";
const BMJGH = "https://doi.org/10.1136/bmjgh-2026-024615";
const USMANY = "https://doi.org/10.1186/s12963-025-00442-5";
const USMANY_FULL = "https://europepmc.org/article/PMC/PMC12822187";
const THAN = "https://doi.org/10.1186/s12939-024-02292-3";
const UHC = "https://doi.org/10.1371/journal.pmed.1003811";
const CHEN = "https://doi.org/10.7189/jogh.13.03002";
const OCHA = "https://www.unocha.org/myanmar";
const WB_OOP = "https://api.worldbank.org/v2/country/MMR/indicator/SH.XPD.OOPC.CH.ZS?format=json&date=2015:2025";
const WB_GOV = "https://api.worldbank.org/v2/country/MMR/indicator/SH.XPD.GHED.CH.ZS?format=json&date=2015:2025";
const WB_CHE = "https://api.worldbank.org/v2/country/MMR/indicator/SH.XPD.CHEX.PC.CD?format=json&date=2015:2025";
const GHED = "https://apps.who.int/nha/database/ViewData/Indicators/en";
const WHO_HPV = "https://ghoapi.azureedge.net/api/SDGHPVRECEIVED?$filter=SpatialDim%20eq%20'MMR'";
const WHO_HPV_SCHEDULE = "https://xmart-api-public.who.int/WIISE/MT_HPV?$filter=ISO_3_CODE%20eq%20'MMR'";
const WHO_IMM = "https://immunizationdata.who.int/dashboard/regions/south-east-asia-region/MMR";
const CANSCREEN = "https://canscreen5.iarc.fr/factsheets/MMR/cervix";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const DIRAC_JSON = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const RT_REVIEW = "https://doi.org/10.1111/1754-9485.13188";
const FDA_ABOUT = "https://www.fda.gov.mm/?p=214";
const CTGOV_MM = "https://clinicaltrials.gov/search?country=Burma";
const SIRVENIB = "https://clinicaltrials.gov/study/NCT01135056";
const MEGESTROL = "https://clinicaltrials.gov/study/NCT00041275";
const HPGP = "https://clinicaltrials.gov/study/NCT02788214";
const FDA_MEDSAFETY = "https://www.fda.gov.mm/?p=14298";

export const MM_DIVE: CountryDive = {
  iso2: "MM",
  iso3: "MMR",
  name: "Myanmar",
  flag: "🇲🇲",
  asOf: "2026-11-11",
  title: "Cancer in Myanmar",
  description:
    "Cancer in Myanmar from WHO, IARC, IAEA, UN and peer-reviewed sources: IARC's estimate of 74,903 new cancers in 2024 and the two regional registries it rests on, a health system in which households paid 71% of health spending out of pocket in 2023, the regulator, single-dose HPV vaccination of 9-year-old girls since 2020, nine radiotherapy centres, and what the conflict since the February 2021 military takeover has done to reaching care.",
  lede:
    "Myanmar has no national cancer registry: what is measured comes from two regional registries, in Nay Pyi Taw and Yangon, and IARC estimates 74,903 new cancers and 53,412 cancer deaths for 2024, with lung, liver and breast cancer the commonest. Since the military takeover of February 2021 the country has been in armed conflict, and OCHA reports 3.6 million people displaced by conflict and the March 2025 earthquake. The corpus holds no Myanmar cancer centre, and OnCo's trial records list no trial site in Myanmar.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Myanmar is 74,903 new cancers and 53,412 deaths, an age-standardised incidence of 137.7 per 100,000 in men and 118.4 in women, and 143,494 people living within five years of a diagnosis. Its fact sheet gives the incidence source as a subnational registry, with subnational rates applied to the 2024 population, and builds mortality from those incidence estimates and modelled mortality to incidence ratios; WHO's 2020 profile records no coverage of mortality registration in Myanmar for 2007 to 2016. Myanmar has no national registry to compare. The Nay Pyi Taw registry, covering about 1.16 million people, measured an age-standardised incidence of 125.9 per 100,000 men and 107.3 per 100,000 women for 2013 to 2017, excluding non-melanoma skin cancer, a little below IARC's national rates, which include it. For individual cancers the pictures are close: IARC's lung cancer rate in men is 28.3 against Nay Pyi Taw's 26.2, and its cervical cancer rate 15.2 against Nay Pyi Taw's 14.1 and Yangon's 19.3 for 2018. Breast cancer differs by place: IARC's 24.5 sits between Nay Pyi Taw's 22.4 and Yangon's 32.7. The Nay Pyi Taw team noted that IARC's earlier 2018 estimates for Myanmar had no country data and were extrapolated mainly from Indian and Thai registries.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Myanmar",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Myanmar (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "Lung, liver and breast cancer lead, and liver cancer causes many deaths",
          plain:
            "IARC estimates that about 74,900 people in Myanmar were diagnosed with cancer in 2024 and about 53,400 died of it. Lung cancer is the commonest overall, then liver and breast cancer. In men lung, liver and stomach cancer lead; in women breast, cervical and lung cancer. Lung and liver cancer cause the most cancer deaths.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet counts 37,165 new cancers in men and 37,738 in women. In men lung cancer is 19.9% of new cases (7,393), liver 16.4% (6,090), stomach 9.9%, lip and oral cavity 7.5% and colorectum 7.3%; in women breast cancer is 20.9% (7,885), cervical 13.0% (4,905), lung 11.4%, stomach 7.6% and liver 7.4%. Lung cancer causes 20.4% of cancer deaths (10,899) and liver cancer 15.3% (8,156). Penile cancer has 683 estimated cases, 19th in IARC's ranking, and the Nay Pyi Taw registry also found it among the ten commonest cancers in men. The registry's authors found a significant proportion of tobacco-related and infection-related cancers: lung, mouth and pharynx, larynx and oesophagus on one side, and liver (hepatitis B and C) and cervix (human papillomavirus) on the other.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Myanmar (PDF)", url: IARC_FACTSHEET },
            { label: "Shwe KM et al., Nay Pyi Taw population-based cancer registry (APJCP 2022)", url: NPT_PBCR },
          ],
        },
        {
          id: "registries",
          title: "Two regional registries and no national count",
          plain:
            "Myanmar does not have a national cancer registry. A population-based registry has counted cancers around the capital, Nay Pyi Taw, since 2013, and another counted them in the Yangon region from 2018. The Nay Pyi Taw registry began on the advice of an international review and with IARC funding; Yangon's 2018 report was prepared with an international partner. The published figures say how far the data are from complete.",
          detail:
            "The Nay Pyi Taw registry, based at Nay Pyi Taw General Hospital (1000 bedded) under the Ministry of Health's Department of Medical Services, covers about 1.16 million people and published its 2013 to 2017 results in 2022. Its team writes that an IAEA review with WHO and IARC found cancer registration to be Myanmar's top priority and recommended starting with Nay Pyi Taw, and that the registry's initial funding came from IARC under a collaborative research agreement. A 2025 review describes the Yangon population-based registry as covering about 7.3 million people from 2018 to 2020, and quotes its 2018 executive report, prepared with Vital Strategies, which was not found online. Quality is uneven: in Nay Pyi Taw 61% of men's and 71% of women's cancers were confirmed under the microscope and about 15 to 16% were known only from a death certificate; in Yangon in 2018, 24% of cervical cancers were known only from a death certificate.",
          links: [
            { label: "Shwe KM et al., APJCP 2022 (full text, Europe PMC)", url: NPT_PBCR_FULL },
            { label: "Win TZK et al., review of HPV and cervical cancer in Myanmar (2025, full text)", url: HPV_REVIEW_FULL },
          ],
        },
        {
          id: "counting-deaths",
          title: "Deaths are the weakest part of the count",
          plain:
            "Many deaths in Myanmar are not registered with a cause, so cancer deaths cannot be counted directly. IARC's death figures for Myanmar are modelled from its case estimates, and WHO said in 2020 that its own mortality estimates for Myanmar carry a high degree of uncertainty.",
          detail:
            "WHO's Cancer Country Profile 2020 for Myanmar records \"no coverage\" for the quality of mortality registration over 2007 to 2016 and notes that its mortality estimates \"have a high degree of uncertainty because they are not based on any national NCD mortality data\". The Nay Pyi Taw registry's authors put the completeness of death registration below 60%, while noting that verbal autopsy for deaths in the community had begun in some regions in 2016. IARC's GLOBOCAN 2024 fact sheet builds Myanmar's deaths from national incidence estimates and model-based mortality to incidence ratios drawn from registry survival data. No figure for cancer survival in Myanmar was found.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Myanmar (PDF)", url: WHO_PROFILE },
            { label: "IARC: GLOBOCAN 2024 fact sheet, data sources and methods (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "npt-registry-2013-2017",
          title: "Commonest cancers registered in Nay Pyi Taw, 2013 to 2017",
          caption: "Registered new cases over five years, share of each sex's cancers and age-standardised incidence per 100,000 (world standard), Nay Pyi Taw Union Territory, population about 1.16 million.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "cases", label: "Cases, 2013 to 2017", numeric: true },
            { key: "share", label: "Share of that sex's cancers (%)", numeric: true },
            { key: "asr", label: "Age-standardised rate", numeric: true },
          ],
          rows: [
            { site: "All sites (rate excludes non-melanoma skin cancer)", sex: "Men", cases: 2835, share: 100, asr: 125.9 },
            { site: "All sites (rate excludes non-melanoma skin cancer)", sex: "Women", cases: 3117, share: 100, asr: 107.3 },
            { site: "Lung", sex: "Men", cases: 512, share: 18.1, asr: 26.2 },
            { site: "Liver", sex: "Men", cases: 419, share: 14.8, asr: 17.9 },
            { site: "Mouth and pharynx", sex: "Men", cases: 369, share: 13.0, asr: 15.8 },
            { site: "Stomach", sex: "Men", cases: 251, share: 8.9, asr: 12.0 },
            { site: "Colon, rectum and anus", sex: "Men", cases: 209, share: 7.4, asr: 9.5 },
            { site: "Larynx", sex: "Men", cases: 182, share: 6.4, asr: 8.5 },
            { site: "Penis", sex: "Men", cases: 57, share: 2.0, asr: 2.4 },
            { site: "Breast", sex: "Women", cases: 661, share: 21.2, asr: 22.4 },
            { site: "Cervix", sex: "Women", cases: 406, share: 13.0, asr: 14.1 },
            { site: "Lung", sex: "Women", cases: 321, share: 10.3, asr: 12.1 },
            { site: "Stomach", sex: "Women", cases: 216, share: 6.9, asr: 7.8 },
            { site: "Colon, rectum and anus", sex: "Women", cases: 195, share: 6.3, asr: 6.7 },
            { site: "Liver", sex: "Women", cases: 190, share: 6.1, asr: 6.9 },
          ],
          note: "One union territory around the capital, not Myanmar as a whole, and five years before the 2021 military takeover. The registry recorded 1,874 cancer deaths in the same years, led by liver cancer (20.8%) and lung cancer (15.7%), but death registration is incomplete. Myanmar publishes no national registry count to set beside this.",
          sources: [
            { label: "Shwe KM et al., APJCP 2022, tables 1 and 2 (full text, Europe PMC)", url: NPT_PBCR_FULL },
            { label: "DOI 10.31557/apjcp.2022.23.1.311", url: NPT_PBCR },
          ],
        },
      ],
    },
    {
      id: "since-2021",
      nav: "Since 2021",
      title: "Health care since the February 2021 military takeover",
      aside: { label: "OCHA: Myanmar", url: OCHA },
      cards: [
        {
          id: "humanitarian-picture",
          title: "Conflict, displacement and an earthquake",
          plain:
            "The UN's humanitarian office says the situation in Myanmar has worsened every year since the military takeover of 2021, through conflict, disasters and economic collapse. It estimates 16.2 million people in need of help in 2026 and 3.6 million people displaced. An earthquake in March 2025 damaged or destroyed nearly 70 health facilities.",
          detail:
            "OCHA's Myanmar page states: \"Since the military take-over of 2021, the humanitarian situation in Myanmar has continued to worsen with each passing year marked by intensifying conflict, recurrent disasters, and steady economic collapse.\" It reports that Myanmar ranked second in the world for conflict intensity in the first half of 2025, with more than half the population exposed to conflict, and that the March 2025 earthquake in central Myanmar damaged or destroyed nearly 70 health facilities. For 2026 it gives 16.2 million people in need out of a population of 54.9 million, and an appeal of US$889.6 million to reach 4.9 million of them, down from 6.7 million in 2025, which OCHA attributes to \"hard decisions and revised analyses, rather than an improvement on the ground\". The 2025 appeal received 26% of what it asked for. The WHO-led health cluster's page gives 9.2 million people in need, on June 2026 data.",
          links: [
            { label: "OCHA: Myanmar, overview and 2026 response plan figures", url: OCHA },
            { label: "WHO Health Cluster: Myanmar", url: "https://healthcluster.who.int/countries-and-regions/myanmar" },
          ],
        },
        {
          id: "attacks-on-health-care",
          title: "Attacks on health workers and facilities",
          plain:
            "Two databases that track attacks on health care, one run by WHO, recorded hundreds of attacks in Myanmar between the February 2021 coup and the end of 2024, including the arrest of health workers. The most were recorded in the first three months after the coup.",
          detail:
            "A 2025 study in Population Health Metrics compared the WHO Surveillance System for Attacks on Health Care with the Safeguarding Health in Conflict Coalition's database from 1 February 2021 to 31 December 2024. WHO's system recorded 443 attacks in Myanmar, in which 108 people were killed and 289 injured, with 127 health workers abducted, 379 arrested and 12 detained; the Coalition recorded 1,492 attacks. The peak in both was the first three months after the coup (183 and 212 attacks). The authors report that the two databases differ significantly for Myanmar, so the counts are best read as a range. A Lancet news report in 2022 described escalating threats to health workers, and a qualitative study reports that most health service provision first stopped after the coup before non-state providers adapted.",
          links: [
            { label: "Usmany J et al., attacks on healthcare in five conflicts (Popul Health Metr 2025, full text)", url: USMANY_FULL },
            { label: "Than K et al., non-state actors in Myanmar's health system (Int J Equity Health 2024)", url: THAN },
            { label: "Tatum M, Escalating threats to health workers in Myanmar (Lancet 2022)", url: "https://doi.org/10.1016/s0140-6736(22)00270-7" },
          ],
        },
        {
          id: "hospital-access",
          title: "Conflict has fallen hardest where hospitals were already far away",
          plain:
            "Cancer treatment means repeated trips to hospital. A 2026 study found that before the coup 5.8 million people in Myanmar lived more than two hours from a general hospital, and that by early 2024 3.1 million people lived both far from a hospital and amid intense conflict.",
          detail:
            "Thu, Tin and Htoo, in BMJ Global Health in 2026, estimated travel time across Myanmar's 330 townships to the nearest of 68 general hospitals and set it against conflict events from 2021 to 2024. People with poor access who also lived with high or extreme conflict rose from 0.4 million in early 2021 to 3.1 million in early 2024, and conflict was significantly concentrated among people with worse access. Because travel times were held at their pre-coup values, the authors call these optimistic bounds. A 2023 viewpoint in the Journal of Global Health on chronic disease after the coup reported that private hospitals were charging for chemotherapy and operations in foreign currency. No study of cancer treatment itself in conflict-affected areas was found.",
          links: [
            { label: "Thu H et al., hospital access amid armed conflict (BMJ Glob Health 2026)", url: BMJGH },
            { label: "Chen WT et al., chronic disease care after the infrastructure collapse (J Glob Health 2023)", url: CHEN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Paying for cancer care: mostly from households",
      aside: { label: "WHO: Global Health Expenditure Database", url: GHED },
      cards: [
        {
          id: "out-of-pocket",
          title: "Households paid 71% of health spending in 2023",
          plain:
            "Most health care in Myanmar is paid for by patients and their families at the point of use. In 2023 out-of-pocket payments were 71% of all health spending, government spending 11% and donors 6%. Total health spending was about 56 US dollars a person.",
          detail:
            "WHO's Global Health Expenditure Database, as published by the World Bank, gives out-of-pocket spending in Myanmar as 76.6% of current health expenditure in 2019, 54.1% in 2021 and 71.1% in 2023, and the government's own domestic spending as 16.0% in 2019 and 11.1% in 2023. External funding was highest, among the years 2015 to 2023, at 13.1% in 2022. Current health spending was 4.5% of GDP and US$56 per person in 2023. A 2021 PLOS Medicine analysis of Myanmar's progress towards universal health coverage, using the 2015 Demographic and Health Survey and the 2017 Myanmar Living Conditions Survey, found pro-rich inequity in access to every essential service and that poorer people, when they used care, were at greater risk of financial catastrophe. No national scheme that pays for cancer treatment was found in any source read for this page.",
          links: [
            { label: "World Bank API: out-of-pocket expenditure, % of current health expenditure, Myanmar", url: WB_OOP },
            { label: "World Bank API: domestic government health expenditure share, Myanmar", url: WB_GOV },
            { label: "Nikoloski Z et al., universal health coverage in Myanmar (PLOS Med 2021)", url: UHC },
          ],
        },
        {
          id: "services-capacity-paying",
          title: "What WHO recorded about cancer services in 2019",
          plain:
            "WHO's 2020 profile of Myanmar records that cancer management guidelines and pathology services existed in 2019, but that bone marrow transplantation and community palliative care were generally not available, and that very little opioid medicine for pain was used.",
          detail:
            "The profile, built from WHO's 2019 country capacity survey, records cancer management guidelines (yes), pathology services generally available, bone marrow transplantation and community or home-based palliative care generally not available, and opioid use for pain of 11 defined daily doses per million people per day in 2015 to 2017. It records an operational integrated plan for non-communicable diseases that includes palliative care, and a national cancer control plan still under development in 2019. It counts 0.7 public cancer centres per 10,000 cancer patients. Whether cancer medicines on Myanmar's essential medicines list are in stock, and what they cost patients, could not be found in a published source.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Myanmar (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
      tables: [
        {
          id: "health-spending-2019-2023",
          title: "Who paid for health care in Myanmar, 2019 to 2023",
          caption: "Shares of current health expenditure (%) and spending per person in current US dollars, WHO Global Health Expenditure Database via the World Bank.",
          columns: [
            { key: "year", label: "Year" },
            { key: "oop", label: "Out of pocket (%)", numeric: true },
            { key: "gov", label: "Government, domestic (%)", numeric: true },
            { key: "ext", label: "External donors (%)", numeric: true },
            { key: "pc", label: "Spending per person (US$)", numeric: true },
          ],
          rows: [
            { year: "2019", oop: 76.6, gov: 16.0, ext: 7.4, pc: 53.7 },
            { year: "2020", oop: 72.6, gov: 16.7, ext: 6.2, pc: 66.0 },
            { year: "2021", oop: 54.1, gov: 16.6, ext: 10.1, pc: 96.9 },
            { year: "2022", oop: 65.1, gov: 11.1, ext: 13.1, pc: 58.0 },
            { year: "2023", oop: 71.1, gov: 11.1, ext: 6.1, pc: 56.2 },
          ],
          note: "Shares do not add to 100 because voluntary prepaid schemes and other private spending are not shown. The years cover the COVID-19 pandemic and the 2021 military takeover, and the database does not explain the 2021 fall in the out-of-pocket share, so no reason is given here.",
          sources: [
            { label: "World Bank API: out-of-pocket share", url: WB_OOP },
            { label: "World Bank API: government share", url: WB_GOV },
            { label: "World Bank API: spending per person", url: WB_CHE },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves medicines: the Department of Food and Drug Administration",
      aside: { label: "FDA Myanmar: About FDA", url: FDA_ABOUT },
      cards: [
        {
          id: "fda-myanmar",
          title: "A department of the Ministry of Health in Nay Pyi Taw since 2013",
          plain:
            "Medicines, food, medical devices and cosmetics in Myanmar are regulated by the Department of Food and Drug Administration, part of the Ministry of Health. It authorises new medicines for sale, checks their quality and watches for side effects.",
          detail:
            "The department's own page says the Food and Drug Administration began in 1995 as a division of the Department of Health and became a separate department in April 2013, with headquarters in Nay Pyi Taw, major branches in Yangon and Mandalay, and branches at border trade posts including Muse, Myawaddy and Tamu. Its drug control work covers marketing authorisation for new products and variations, quality control testing, adverse drug reaction monitoring, Good Manufacturing Practice inspection, licensing of manufacturers and wholesalers, enforcement, and control of drug promotion. The department's site names its parent as the Ministry of Health. It runs an electronic submission system for medicines, and in November 2026 it reported holding a campaign for the international medicines safety week, MedSafetyWeek.",
          links: [
            { label: "Department of Food and Drug Administration: About FDA", url: FDA_ABOUT },
            { label: "Department of Food and Drug Administration: MedSafetyWeek 2026 notice (in Burmese)", url: FDA_MEDSAFETY },
          ],
        },
        {
          id: "approval-routes",
          title: "Registration routes and approval times are not published in English",
          plain:
            "How a new cancer medicine gets registered in Myanmar, whether the regulator relies on approvals from other countries, and how long it takes could not be found in English. The regulator publishes its rules and notices mainly in Burmese.",
          detail:
            "The department's lists of regulations and guidelines for medicines are posted in Burmese, and the English pages read for this page describe its functions but not its registration pathways, any abridged or reliance route, fees or timelines. No peer-reviewed paper or WHO document read for this page gave approval times for cancer medicines in Myanmar. Until a source is found, ask the treating hospital whether a medicine is registered and supplied in Myanmar.",
          links: [
            { label: "Department of Food and Drug Administration: drug notices (in Burmese)", url: "https://www.fda.gov.mm/?cat=6" },
            { label: "Department of Food and Drug Administration: About FDA", url: FDA_ABOUT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening and vaccination",
      title: "Cervical cancer: one vaccine dose at age 9, and screening for the virus",
      aside: { label: "WHO: immunization data, Myanmar", url: WHO_IMM },
      cards: [
        {
          id: "hpv-vaccine-mm",
          title: "HPV vaccination of 9-year-old girls since 2020, with coverage falling to 8% in 2022 and recovering",
          plain:
            "Myanmar began vaccinating 9-year-old girls against human papillomavirus, the cause of most cervical cancers, in 2020, with one dose. WHO and UNICEF estimate that 89% of girls in the target group were vaccinated in 2020, 8% in 2022 and 94% in 2025.",
          detail:
            "WHO's immunization data record HPV vaccine introduction in 2020, delivered mainly through schools, to girls aged 9, on a one-dose schedule. The WHO/UNICEF estimates of coverage in the primary target cohort are 89% for 2020, none published for 2021, 8% for 2022, 76% for 2023, 83% for 2024 and 94% for 2025, with first-dose and complete coverage both 94% in the latest year. Clinicians writing in 2023 describe the vaccine as the 13th new vaccine in the national immunization programme and say that, because schools were closed during the COVID-19 pandemic, the first round in 2020 was given in the community and reached more than 90% of 9-year-old girls. The estimates do not say why coverage fell in 2022; no source read for this page explains it.",
          links: [
            { label: "WHO Global Health Observatory: HPV coverage estimates, Myanmar (data API)", url: WHO_HPV },
            { label: "WHO immunization data: HPV schedule and introduction, Myanmar (data API)", url: WHO_HPV_SCHEDULE },
            { label: "Thinn MM et al., cervical cancer prevention in Myanmar (South Asian J Cancer 2023)", url: THINN_FULL },
          ],
        },
        {
          id: "cervical-screening",
          title: "Screening by testing for the virus, begun as a pilot",
          plain:
            "Few women in Myanmar have been screened for cervical cancer: WHO put it at 4% of eligible women in 2019. A national programme offering a test for the virus to women aged 30 to 49 began in 2021, and in late 2021 and early 2022 pilot screening ran in 9 of 17 states and regions.",
          detail:
            "Guidelines published in 2018 adopt a hybrid approach: visual inspection with acetic acid where trained staff are available, testing for human papillomavirus, including samples women take themselves, in rural areas where 70% of eligible women live, and ablative treatment of women who test positive. Screening planned for 16 townships in 2020 was halted by the pandemic; in late 2021 and early 2022 the careHPV test was piloted in 9 of 17 states and regions. IARC's CanScreen5 survey records a national programme started in 2021 offering the test every five years to women aged 30 to 49, free of charge for screening, diagnosis and treatment, with no participation figures published. WHO's 2020 profile recorded opportunistic screening by visual inspection with under 10% participation in 2019, and a breast cancer screening programme starting at 45, for which no programme document or uptake figure was found.",
          links: [
            { label: "IARC CanScreen5: Myanmar, cervix", url: CANSCREEN },
            { label: "Thinn MM et al., South Asian J Cancer 2023 (full text)", url: THINN },
            { label: "Win TZK et al., J Epidemiol Glob Health 2025", url: HPV_REVIEW },
          ],
        },
      ],
      tables: [
        {
          id: "hpv-coverage-mm",
          title: "HPV vaccination coverage, girls in the primary target cohort, 2020 to 2025",
          caption: "WHO/UNICEF estimates of the share of girls in the target cohort (age 9 in Myanmar) vaccinated, per cent.",
          columns: [
            { key: "year", label: "Year" },
            { key: "coverage", label: "Coverage (%)", numeric: true },
          ],
          rows: [
            { year: "2020", coverage: 89 },
            { year: "2021", coverage: null },
            { year: "2022", coverage: 8 },
            { year: "2023", coverage: 76 },
            { year: "2024", coverage: 83 },
            { year: "2025", coverage: 94 },
          ],
          note: "No estimate is published for 2021. These are estimates, not counts of doses given, and WHO and UNICEF revise them as new data arrive.",
          sources: [
            { label: "WHO Global Health Observatory, indicator SDGHPVRECEIVED, Myanmar (data API)", url: WHO_HPV },
            { label: "WHO immunization data: Myanmar", url: WHO_IMM },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Radiotherapy and staff",
      title: "Radiotherapy and the cancer workforce",
      aside: { label: "IAEA: DIRAC, radiotherapy centres by country", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Nine radiotherapy centres with 23 treatment machines",
          plain:
            "The IAEA's directory of radiotherapy centres lists nine centres in Myanmar, with 23 high-energy external beam machines between them and seven brachytherapy units. That is about one machine for every 2.4 million people.",
          detail:
            "The public country table of the IAEA's Directory of Radiotherapy Centres (DIRAC), last updated for Myanmar in 2025, gives 9 radiotherapy centres, 23 high-energy photon and electron beam units and 7 brachytherapy units; the ratio of one machine per 2.4 million people is OnCo's division of IARC's 2024 population of 54.5 million by 23. DIRAC's list of individual centres requires a sign-in, so the centres are not named here. A 2021 review by Opie and Shwe describes significant improvement in radiotherapy services in government and private hospitals from 2012 to 2020, including new equipment, planning software and more staff, and names continuing training gaps; its tables were not read because the paper is not open access.",
          links: [
            { label: "IAEA DIRAC: countries (public data table)", url: DIRAC_JSON },
            { label: "Opie C, Shwe KM, radiation therapy services in Myanmar 2012 to 2020 (J Med Imaging Radiat Oncol 2021)", url: RT_REVIEW },
          ],
        },
        {
          id: "workforce",
          title: "Specialists counted per 10,000 cancer patients in 2019",
          plain:
            "WHO counted 3.6 radiation oncologists and 4.3 medical physicists for every 10,000 cancer patients in Myanmar in 2019. How many have left posts since 2021 has not been published in any source found.",
          detail:
            "WHO's Cancer Country Profile 2020 gives, per 10,000 cancer patients: 2.7 external beam radiotherapy units (2019), 3.6 radiation oncologists and 4.3 medical physicists (2019), 48.9 radiologists and 0.9 nuclear medicine physicians (2019), 68.7 surgeons (2013), 6.5 CT scanners, 0.6 MRI scanners, 0.4 mammography units and 0.1 PET scanners (2020). It records that no Ministry of Health staff spent a significant proportion of their time on cancer in 2019. These figures predate the 2021 military takeover; the attacks on and arrests of health workers recorded since then are described above, but no updated count of oncology staff was found.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Myanmar (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Myanmar does",
      title: "What Myanmar does differently",
      cards: [
        {
          id: "single-dose-community",
          title: "A one-dose HPV vaccine schedule, delivered in the community when schools closed",
          plain:
            "Myanmar gives the HPV vaccine to 9-year-old girls as a single dose. When schools closed in 2020, the first round was taken into communities instead and reached most girls. Coverage then fell sharply in 2022 and has since climbed back.",
          detail:
            "WHO's immunization data record Myanmar's schedule as one dose at age 9, introduced in 2020. Clinicians involved in the programme write that it was planned as school-based but given in the community in 2020 because of COVID-19 closures, reaching more than 90% of 9-year-old girls with a first dose. WHO/UNICEF estimates show 8% coverage in 2022, the year after the military takeover, and 94% in 2025. With one dose, WHO's figures for first-dose and complete coverage are the same, 94% in 2025.",
          links: [
            { label: "WHO immunization data: HPV schedule, Myanmar (data API)", url: WHO_HPV_SCHEDULE },
            { label: "Thinn MM et al., South Asian J Cancer 2023 (full text)", url: THINN_FULL },
          ],
        },
        {
          id: "non-state-providers",
          title: "Care given outside the state system",
          plain:
            "In Myanmar non-governmental organisations, ethnic health organisations in border areas and private providers have long played an important role in health care. Since 2021, researchers report, these providers have run in parallel to the state system rather than with it.",
          detail:
            "Than and colleagues, in a 2024 study, describe non-state actors as historically important where the public system reached little, especially in border areas, and a growing convergence with ethnic health systems from 2015 to 2020. They write that the military coup of February 2021 halted this, that collaboration with the government was interrupted and parallel systems returned, and that providers coped by focusing on basic services, keeping buffer stocks and changing supply routes. For cancer screening, clinicians write that many non-governmental organisations offer cervical screening in hard-to-reach areas, mostly by visual inspection and same-visit treatment. Neither source measures cancer treatment by these providers.",
          links: [
            { label: "Than K et al., Int J Equity Health 2024", url: THAN },
            { label: "Thinn MM et al., South Asian J Cancer 2023 (full text)", url: THINN_FULL },
          ],
        },
        {
          id: "registry-from-capital",
          title: "A registry started in the capital, on international advice",
          plain:
            "Rather than try to count cancer across the whole country at once, Myanmar started with one population-based registry around its capital, as an IAEA, WHO and IARC review recommended, and later added Yangon.",
          detail:
            "The Nay Pyi Taw registry's team writes that the review under the IAEA's Programme of Action for Cancer Therapy recommended starting a population-based registry in the Nay Pyi Taw Union Territory first and then expanding to other states and regions, and that Myanmar is a partner of IARC's Global Initiative for Cancer Registry Development. The Nay Pyi Taw registry collected cases actively from hospitals and laboratories and from death certificates, and also from Yangon General Hospital and Mandalay General Hospital. IARC's 2024 fact sheet gives a subnational registry as its incidence source for Myanmar, without naming which.",
          links: [
            { label: "Shwe KM et al., APJCP 2022 (full text, Europe PMC)", url: NPT_PBCR_FULL },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Myanmar (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: studies with a site in Myanmar", url: CTGOV_MM },
      cards: [
        {
          id: "trials-in-myanmar",
          title: "Four cancer studies in ClinicalTrials.gov have listed a site in Myanmar, all in Yangon",
          plain:
            "ClinicalTrials.gov lists 50 studies with a site in Myanmar, which it calls Burma, and four of them are about cancer: three in liver cancer, led from Singapore, and a genome study of Helicobacter pylori, the stomach bacterium linked to stomach cancer. None is listed as recruiting. OnCo's own trial records list no site in Myanmar.",
          detail:
            "A search of ClinicalTrials.gov on 11 November 2026 for studies with a location in Burma returned 50 records, most on malaria, hepatitis and other infections. The four cancer studies are SIRveNIB (NCT01135056), a phase 3 trial of radioembolisation against sorafenib in 360 patients with liver cancer, led by Singapore General Hospital, with a site at the Yangon GI and Liver Centre; a phase 1/2 study of radioembolisation followed by sorafenib (NCT00712790) at the same centre; a phase 3 trial of megestrol acetate in liver cancer (NCT00041275), led by Singapore's National Medical Research Council, with Yangon General Hospital as a site; and the US National Cancer Institute's Helicobacter pylori Genome Project (NCT02788214), with a site at the Defence Services General Hospital in Yangon. OnCo holds SIRveNIB in its SARAH and SIRveNIB record, but that record's registry snapshot is of the French SARAH trial, so OnCo's site data show no Myanmar site.",
          links: [
            { label: "ClinicalTrials.gov: studies with a site in Burma (Myanmar)", url: CTGOV_MM },
            { label: "ClinicalTrials.gov: SIRveNIB, NCT01135056", url: SIRVENIB },
            { label: "ClinicalTrials.gov: megestrol acetate in liver cancer, NCT00041275", url: MEGESTROL },
            { label: "ClinicalTrials.gov: Helicobacter pylori Genome Project, NCT02788214", url: HPGP },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-reports-unread",
      title: "The registries' own reports and any national count",
      plain:
        "Myanmar has no national cancer registry, and neither regional registry's own report could be read: the Nay Pyi Taw figures come from its team's journal paper and the Yangon figures from a review quoting its 2018 executive report. No survival figures for Myanmar were found.",
      detail:
        "The Nay Pyi Taw registry's 2022 report on 2013 to 2017 and the Yangon population-based registry's executive report for 2018, prepared with Vital Strategies, were not found online. The Yangon figures on this page (coverage of about 7.3 million people, cervical cancer at 19.3 per 100,000, breast at 32.7) are quoted from a 2025 review; a 2023 commentary gives Yangon's cervical rate as 19.5, and the review's own abstract pairs the two registries' rates the other way round from its full text. No registry data after 2018, no national cancer mortality count and no survival figure were found. The source IARC used for its 2024 survival-based mortality model (Survcan) was not read.",
      links: [
        { label: "Win TZK et al., J Epidemiol Glob Health 2025 (full text)", url: HPV_REVIEW_FULL },
        { label: "Shwe KM et al., APJCP 2022", url: NPT_PBCR },
      ],
    },
    {
      id: "ministry-and-plans",
      title: "The Ministry of Health's own site, the national cancer plan and the essential medicines list",
      plain:
        "The Ministry of Health's website did not answer on 11 November 2026, so no national cancer control plan, essential medicines list or cancer drug availability figure was read from it. WHO recorded a national cancer plan as still under development in 2019.",
      detail:
        "mohs.gov.mm returned a Cloudflare 522 error and its bare domain timed out on 11 November 2026, and no Internet Archive copy of a cancer plan was looked for beyond that. No national cancer control plan document, current national essential medicines list, survey of cancer medicine availability or prices, or national cancer treatment scheme was found in any source read. WHO's 2020 profile records the plan as under development in 2019; whether one has since been adopted is not known. Who sets health policy in areas outside the control of the authorities in Nay Pyi Taw was not looked into, because no WHO, UN or peer-reviewed source read for this page describes cancer services there.",
      links: [
        { label: "WHO: Cancer Country Profile 2020, Myanmar (PDF)", url: WHO_PROFILE },
        { label: "OCHA: Myanmar", url: OCHA },
      ],
    },
    {
      id: "sources-refused",
      title: "Sources that refused a script or render only in a browser",
      plain:
        "Several sources could not be read directly: the IAEA's list of named radiotherapy centres needs a sign-in, IARC's CanScreen5 pages render only in a browser, the UN's ReliefWeb interface needs an approved key, and the cancer charities' international directory refused a scripted request.",
      detail:
        "DIRAC's centre-level table requires an IAEA sign-in, so only its public country totals are used. CanScreen5's Myanmar fact sheet is built in the browser; its contents are taken from OnCo's existing screening record for Myanmar. ReliefWeb's API refused an unapproved application name, so OCHA's figures come from its own Myanmar page. uicc.org returned HTTP 406 to a scripted request, so the two patient groups' entries were read through Internet Archive copies. The regulator's English pages describe its functions but its regulations are in Burmese and were not translated for this page. The Opie and Shwe radiotherapy review and the Lancet news reports are not open access and were read only as abstracts or titles.",
      links: [
        { label: "IAEA DIRAC", url: DIRAC },
        { label: "IARC CanScreen5: Myanmar, cervix", url: CANSCREEN },
      ],
    },
    {
      id: "since-2021-unmeasured",
      title: "What the conflict has done to cancer care itself",
      plain:
        "No published source was found that measures how many cancer patients have lost treatment since 2021, how many oncology staff have left their posts, or how radiotherapy centres have operated during the conflict.",
      detail:
        "The sources on this page measure attacks on health care, displacement, distance to general hospitals and humanitarian need, but none measures cancer care. The WHO workforce and equipment figures are from 2019 and 2020, and DIRAC's 2025 update does not say whether each machine is working. The fall in HPV vaccination coverage to 8% in 2022 is recorded but not explained by WHO or UNICEF. Screening uptake after the 2021 to 2022 pilots and the outcome of the breast screening programme WHO recorded in 2019 were not found. The March 2025 earthquake's damage to cancer services specifically was not found.",
      links: [
        { label: "Thu H et al., BMJ Glob Health 2026", url: BMJGH },
        { label: "Usmany J et al., Popul Health Metr 2025", url: USMANY },
      ],
    },
  ],
  institutions: ["nay-pyi-taw-cancer-registry", "myanmar-fda", "pink-rose-breast-cancer-support-group-myanmar", "shwe-yaung-hnin-si-cancer-foundation", "iarc", "who", "iaea", "uicc"],
  companies: [],
  drugs: [],
  trials: ["sarah-sirvenib"],
  papers: [
    "paper-shwe-nay-pyi-taw-cancer-registry-2022", "paper-win-hpv-cervical-cancer-myanmar-review-2025", "paper-thinn-cervical-screening-myanmar-2023",
    "paper-thu-hospital-access-conflict-myanmar-2026", "paper-usmany-attacks-on-healthcare-five-conflicts-2025", "paper-than-non-state-actors-myanmar-2024",
  ],
  people: [],
  how:
    "Every card was written from sources read in their raw text on 11 November 2026: IARC's GLOBOCAN 2024 fact sheet for Myanmar, WHO's Cancer Country Profile 2020, WHO's health expenditure figures as published by the World Bank, the WHO/UNICEF HPV vaccination estimates, the IAEA's DIRAC country table, OCHA's Myanmar page, the Department of Food and Drug Administration's own pages, ClinicalTrials.gov, and papers resolved through Europe PMC and read in full where open access. Statements about the period since February 2021 are attributed to the UN agency or paper that makes them. The corpus held no Myanmar institution before this page; the new records are the Nay Pyi Taw registry, the regulator, two patient groups and six papers.",
  verify:
    "Myanmar's cancer figures are estimates resting on two regional registries and modelled deaths, and the most recent registry data are from 2018. The situation since 2021 changes quickly; check OCHA's and WHO's current figures. Before relying on whether a medicine or a treatment is available, ask the treating hospital, because no published source lists what is registered and in stock.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Myanmar (PDF)", url: IARC_FACTSHEET },
    { label: "WHO: Cancer Country Profile 2020, Myanmar (PDF)", url: WHO_PROFILE },
    { label: "OCHA: Myanmar", url: OCHA },
    { label: "Department of Food and Drug Administration: About FDA", url: FDA_ABOUT },
  ],
};
