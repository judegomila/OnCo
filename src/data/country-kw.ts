import type { CountryDive } from "@/data/country-dive";

/**
 * Kuwait deep dive: the hand-written cards for /countries/kw/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Kuwait (PDF text);
 * WHO's cancer country profile (2020) and cervical cancer profile (2021) for Kuwait (PDF text); the World Bank
 * indicator API; WHO's immunisation data API (vaccine introduction and HPV coverage rows); the IAEA DIRAC country row;
 * WHO's August 2026 list of regulators at maturity level 3 and 4 (PDF text); the Gulf Health Council's central
 * registration page; the Kuwait Cancer Control Center's Strategic Plan 2019 to 2023 (PDF text, from the ICCP portal);
 * the Swedish Institute for Health Economics' 2021 summary sheet on cancer care in Kuwait (PDF text); the US
 * International Trade Administration's country guide page on Kuwaiti healthcare; Ministry of Health statements as
 * carried by the Kuwait Times (mostly KUNA) and the Arab Times (2021 to November 2026) and by EpiNews; the registry papers
 * and screening papers through Europe PMC (abstracts, and open full text where it is cited); and the
 * ClinicalTrials.gov API for the count of studies listing Kuwait.
 *
 * The Ministry of Health's own website did not answer on the day (see `gaps`), so every ministry statement here is
 * taken from a news report of it and is dated in the card.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/414-kuwait-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/kwt-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-kwt-2021-country-profile-en.pdf";
const WB = (code: string) => `https://data.worldbank.org/indicator/${code}?locations=KW`;
const WIISE_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'KWT'";
const WIISE_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27KWT%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const GHC_CENTRAL = "https://www.ghc.sa/en/central-registration/";
const KCCC_PLAN = "https://www.iccp-portal.org/system/files/plans/KWT_B5_s21_STRATEGICPLAN19editdfrdrkhld%202019_210816_132549.pdf";
const IHE_2021 = "https://ihe.se/wp-content/uploads/2021/11/Summary-sheet-Kuwait_.pdf";
const TRADE_GOV = "https://www.trade.gov/country-commercial-guides/kuwait-healthcare";
const KT_REGISTRY = "https://kuwaittimes.com/article/48953/kuwait/kuwait-health-min-establishes-epidemiology-cancer-registry-department-at-kccc/";
const KT_PRICES = "https://kuwaittimes.com/article/48806/kuwait/moh-cuts-prices-of-517-medicines-and-pharmaceutical-products/";
const KT_BREAST_2026 = "https://kuwaittimes.com/article/52814/kuwait/one-third-of-cancer-cases-could-be-prevented-through-lifestyle-changes/";
const KT_HPV_2026 = "https://kuwaittimes.com/article/39014/kuwait/other-news/kuwait-reports-year-without-active-measles-and-rubella-transmission/";
const AT_SALE_2021 = "https://www.arabtimesonline.com/news/moh-defines-new-controls-on-medicines-sale";
const AT_INSURANCE_2025 = "https://www.arabtimesonline.com/news/kd-100-fee-set-for-expat-families-health-insurance";
const AT_KCCC_2024 = "https://www.arabtimesonline.com/news/kuwait-unveils-plans-for-state-of-the-art-new-cancer-control-center/";
const AT_RELOCATION = "https://www.arabtimesonline.com/news/kuwait-eyes-smooth-relocation-of-cancer-center-to-new-facility/";
const AT_GYNAE = "https://www.arabtimesonline.com/news/kuwait-launches-new-gynecological-oncology-unit-to-enhance-womens-health-services/";
const AT_BIOLOGICAL = "https://www.arabtimesonline.com/news/kuwait-updates-cancer-treatment-system-with-new-biological-therapies";
const AT_ABROAD = "https://www.arabtimesonline.com/news/kuwaits-medical-progress-cuts-need-for-overseas-treatment-minister";
const AT_MAMMO_2024 = "https://arabtimesonline.com/news/40000-mammograms-performed-by-kuwaits-breast-cancer-program-since-2014";
const AT_HPV_2023 = "https://www.arabtimesonline.com/news/vaccination-against-hpv-free-for-kuwaitis-kd-56-for-expats";
const AT_HPV_2025 = "https://www.arabtimesonline.com/news/kuwaits-health-ministry-clarifies-hpv-vaccine-guidelines-amid-online-debate";
const AT_GCDC = "https://www.arabtimesonline.com/news/kuwait-hosts-gcdc-iarc-teams-to-enhance-early-cancer-detection-programs";
const AT_CHILD_2024 = "https://www.arabtimesonline.com/news/kuwait-sees-160-new-childhood-cancer-cases-annually-can/";
const EPINEWS_26600 = "https://epinews.emphnet.net/en/news/kuwait-reports-26000-cancer-cases-in-just-9-years";
const APJCP_2012 = "https://koreascience.or.kr/article/JAKO201205061572208.pdf";
const GJO_2023 = "https://pubmed.ncbi.nlm.nih.gov/36804156/";
const GJO_2019_SURVIVAL = "https://pubmed.ncbi.nlm.nih.gov/30956195/";
const GJO_2019_FOLLOWUP = "https://pubmed.ncbi.nlm.nih.gov/30956194/";
const JONC_2019 = "https://doi.org/10.1155/2019/8463195";
const SCIREP_2025 = "https://doi.org/10.1038/s41598-025-91119-4";
const SJG_2021 = "https://doi.org/10.4103/sjg.sjg_463_20";
const APJCP_2025 = "https://doi.org/10.31557/apjcp.2025.26.3.861";
const BMC_OESOPHAGUS = "https://doi.org/10.1186/s12885-023-10770-0";
const EMHJ_2023 = "https://www.emro.who.int/emhj-volume-29-2023/volume-29-issue-1/ecological-study-of-breast-cancer-incidence-among-nationals-and-non-nationals-in-the-gulf-cooperation.html";
const CUREUS_2021 = "https://doi.org/10.7759/cureus.13333";
const BMC_PALLIATIVE = "https://doi.org/10.1186/s12904-021-00717-2";
const CDI_2026 = "https://doi.org/10.1007/s40261-026-01577-5";
const CTGOV = "https://clinicaltrials.gov/search?country=Kuwait&cond=cancer";

export const KW_DIVE: CountryDive = {
  iso2: "KW",
  iso3: "KWT",
  name: "Kuwait",
  flag: "🇰🇼",
  asOf: "2026-11-16",
  title: "Cancer in Kuwait",
  description:
    "Cancer in Kuwait from IARC, WHO, the World Bank, the Kuwait Cancer Registry's published studies and Ministry of Health statements: 4,275 new cancers and 1,898 deaths in IARC's 2024 estimate, built from the national registry; a registry running since 1971; government paying 88.5% of health spending; one public cancer centre for adults; a breast screening programme since 2014; HPV vaccine introduced in 2023 with no coverage figure in WHO's data; and no trial in our records with a site in Kuwait.",
  lede:
    "IARC estimates 4,275 new cancers and 1,898 cancer deaths in Kuwait in 2024, using rates from the national cancer registry, which has run since 1971. Breast cancer is four in ten cancers in women. Care is paid for mostly by the government and is concentrated in one public centre, the Kuwait Cancer Control Center, with a separate children's hospital. Kuwaiti citizens and foreign residents are treated under different rules, and many of the published figures cover citizens alone.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Kuwait is 4,275 new cancers and 1,898 deaths, an age-standardised incidence of 110.1 per 100,000 (92.0 in men, 143.9 in women) and mortality of 53.9, including non-melanoma skin cancer (4,251 new cancers without it). The fact sheet names the country-specific source for incidence as the national registry, with national rates applied to the 2024 population. Deaths are not counted from death certificates: IARC applies modelled mortality-to-incidence ratios (from registry survival data, source SURVCAN) to the incidence estimate. The fact sheet does not say which registry years were used, and OnCo did not find the registry's own annual counts online, so the two cannot be compared year for year here.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Kuwait",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Kuwait (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 4,300 new cancers a year, and breast cancer is four in ten cancers in women",
          plain:
            "IARC estimates 4,275 new cancers in Kuwait in 2024: 2,443 in women and 1,832 in men. Breast cancer is the commonest by a wide margin, with 982 cases. In men the commonest are cancers of the bowel, prostate and lung. IARC estimates 1,898 cancer deaths in the same year, which by OnCo's own division is about 44 for every 100 new cancers.",
          detail:
            "From IARC's fact sheet: breast 982 (40.2% of cancers in women), colorectum 476, thyroid 295, lung 231, leukaemia 218, prostate 206, non-Hodgkin lymphoma 197. In men the leading sites are colorectum (248), prostate (206), lung (176), leukaemia (135) and bladder (121); in women breast, colorectum (228), thyroid (223), corpus uteri (169) and cervix (89). The leading causes of cancer death are breast (278), colorectum (212), lung (194), leukaemia (133) and pancreas (113). The risk of developing cancer before 75 is 11.9% (10.0% in men, 15.0% in women), and 13,131 people were living within five years of a diagnosis. IARC's population for Kuwait is 4,934,510, of whom 3,015,632 are male and 1,918,882 female. The Kuwait Cancer Control Center's own plan gives a mid-2018 population of 4,563,969, of whom 1,386,363 were Kuwaiti, so by OnCo's own division citizens were about 30% of the people living in the country that year.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kuwait (PDF)", url: GCO_FACT },
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
          ],
        },
        {
          id: "iarc-method",
          title: "IARC's figures rest on the national registry; the deaths are modelled",
          plain:
            "IARC's fact sheet names Kuwait's own national cancer registry as the source of its new-case figures: the registry's national rates, applied to the 2024 population. The death figures are different. They are calculated from the new cases using survival data, not counted from death certificates.",
          detail:
            "The fact sheet's data source box reads: incidence, country-specific data source registry (national), method national rates applied to 2024 population; mortality, country-specific data source Survcan, method national incidence estimates applied to model-based mortality-to-incidence ratios (registry survival data). WHO's 2020 cancer profile for Kuwait rated the population-based cancer registry as high quality (2019) and the quality of mortality registration as low (2007 to 2016), with a footnote that mortality estimates for the country carry a high degree of uncertainty because they are not based on national mortality data for non-communicable diseases. A registry paper from 2019 found that the older method of following patients, restricted to deaths certified as due to cancer, had captured 62% of all patients' deaths; linking civil identity numbers to the civil information authority and the Ministry's death records resolved vital status for 98.3% of those previously unknown.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Kuwait (PDF)", url: GCO_FACT },
            { label: "WHO: cancer country profile, Kuwait (2020, PDF)", url: WHO_PROFILE },
            { label: "Alawadhi et al., follow-up of vital status, the Kuwait Cancer Registry experience (Gulf J Oncolog 2019, PubMed)", url: GJO_2019_FOLLOWUP },
          ],
        },
        {
          id: "registry",
          title: "A national cancer registry since 1971, and a registry department set up in 2026",
          plain:
            "Kuwait has counted its cancers for more than fifty years. The Kuwait Cancer Registry sits inside the Kuwait Cancer Control Center, and doctors and hospitals are required to report cancers to it. In August 2026 the Minister of Health established an Epidemiology and Cancer Registry Department at the centre. OnCo did not find its yearly reports online, so the recent totals on this page come from studies and press reports.",
          detail:
            "A 2012 paper by registry staff describes the Kuwait Cancer Registry as a population-based register covering about three million Kuwaiti and non-Kuwaiti residents, established and in operation since 1971, a full member of the International Association of Cancer Registries, with notification of cancer compulsory by ministerial regulations and results published in Cancer Incidence in Five Continents since its fifth edition in 1990. That paper counted 889 cancers among Kuwaiti citizens in 2009. The latest overall total OnCo could read is a press figure: more than 26,600 new cancers diagnosed between 2010 and 2019 (health specialists quoted by Al-Qabas, in an Arab Times item relayed by EpiNews in June 2023); the item describes the period both as nine years and as 2010 to 2019, and does not say whether it counts all residents. A 2025 paper with a registry co-author gives 2,710 colorectal cancers from January 2010 to December 2019, about 10.2% of all cancer cases in the country; by OnCo's own division that implies a total near 26,600, in line with the press figure. On 31 August 2026 KUNA reported a ministerial decision establishing an Epidemiology and Cancer Registry Department at the centre, to build a national database on incidence, mortality and survival. The Swedish Institute for Health Economics wrote in 2021 that the centre's annual cancer reports should be made publicly available.",
          links: [
            { label: "El-Basmy et al., national cancer registry data 2000 to 2009 (Asian Pac J Cancer Prev 2012, PDF)", url: APJCP_2012 },
            { label: "Kuwait Times (KUNA): registry department established at the cancer centre (31 August 2026)", url: KT_REGISTRY },
            { label: "EpiNews, relaying the Arab Times: more than 26,600 cancers diagnosed between 2010 and 2019 (15 June 2023)", url: EPINEWS_26600 },
            { label: "Nur et al., colorectal cancer screening in Kuwait (Sci Rep 2025)", url: SCIREP_2025 },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "stage-survival",
          title: "Stage at diagnosis, and survival that rose for breast cancer",
          plain:
            "Registry studies of Kuwaiti patients diagnosed from 2000 to 2013 found that about one in seven cancers was caught while still confined to where it started. Survival at each stage was similar to the United States; the difference lay in how many were found late. Five-year survival for breast cancer rose from 68.3% to 75.2% over those years.",
          detail:
            "In the stage study (12 cancers, Kuwaiti patients diagnosed 2000 to 2013, followed to the end of 2015), 14.2% of patients were diagnosed at a localised stage and 38.9% at a regional stage, and the share with a known stage fell from 88.9% in 2000 to 2004 to 59.4% in 2010 to 2013. For patients diagnosed at a localised stage in 2005 to 2009, one-year and five-year net survival was about 90% or higher for colon, rectal, breast, cervical and prostate cancer. The authors concluded that later stage at diagnosis is likely to be a major reason overall survival was lower than in the United States, and asked for investment in the registry's staff. A companion study reported that survival improved for most Kuwaiti adults and children over the 14 years, with five-year survival above 80% for prostate cancer in adults and for acute lymphoblastic leukaemia and lymphoma in children. These are group estimates for citizens diagnosed more than a decade ago; they do not predict one person's course, and treatment has changed since.",
          links: [
            { label: "Alawadhi et al., cancer survival by stage at diagnosis in Kuwait (J Oncol 2019)", url: JONC_2019 },
            { label: "Alawadhi et al., cancer survival trends in Kuwait 2000 to 2013 (Gulf J Oncolog 2019, PubMed)", url: GJO_2019_SURVIVAL },
            { label: "Alawadhi et al., progress against cancer in Kuwait (Gulf J Oncolog 2023, PubMed)", url: GJO_2023 },
          ],
        },
        {
          id: "citizens-and-residents",
          title: "Most published figures are for citizens, who are under a third of residents",
          plain:
            "People who are not Kuwaiti citizens make up most of the population; the Gulf states have large populations of expatriate workers. The registry records both groups, but most of its published studies analyse Kuwaiti citizens alone. A reader who is a foreign resident should know that those survival and incidence figures were not measured in people like them.",
          detail:
            "The survival, stage and trend studies cited on this page all restrict their analysis to Kuwaiti patients. Where both groups are compared the rates differ. A study of oesophageal cancer from 1980 to 2019 (registry data to 2016, projected after) found citizens more likely to develop it than non-Kuwaiti residents, with an adjusted incidence rate ratio of 1.83 (95% confidence interval 1.49 to 2.24), and a steady fall in rates over the period. A WHO regional journal study of breast cancer in the Gulf states reported an age-standardised rate of 52.66 per 100,000 among Kuwaiti national women for 1998 to 2012, and that 10.8% of breast cancers in Kuwaiti nationals in 2008 to 2012 were in women under 40. IARC's national estimate covers the whole population, and its fact sheet does not split it by nationality.",
          links: [
            { label: "Disparities in oesophageal cancer risk by age, sex and nativity in Kuwait, 1980 to 2019 (BMC Cancer 2023)", url: BMC_OESOPHAGUS },
            { label: "Breast cancer incidence among nationals and non-nationals in the Gulf states (East Mediterr Health J 2023)", url: EMHJ_2023 },
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
          ],
        },
        {
          id: "children",
          title: "Children with cancer are treated at one hospital, which keeps its own registry",
          plain:
            "Children with cancer in Kuwait are referred to the National Bank of Kuwait Specialized Hospital for Children. Its childhood cancer registry held 1,387 patients for 2004 to 2017. Leukaemia was the commonest diagnosis, and the hospital reported overall survival of around 80%.",
          detail:
            "The hospital's 2021 paper describes it as the only hospital that manages paediatric cancer patients in Kuwait and its registry as the first national childhood cancer registry; data collection began in May 2016 and reached back to 2004. Of 1,387 patients, 1,009 files met the study's criteria: leukaemia 457, lymphoma 141, brain tumours 92; 88.3% received chemotherapy and 78.3% reached complete remission. Recent yearly counts differ by source: the Minister of Health cited approximately 120 childhood cancers recorded annually (April 2025, from the hospital's department), while the Cancer Aware Nation campaign, citing the Kuwait Cancer Control Center, gave about 160 new cases a year (August 2024). At the same 2025 conference the department head described 64 beds, a 12-bed day ward and 1,154 admissions a year. IARC's fact sheet gives no separate figure for children.",
          links: [
            { label: "Bourusly et al., trends in childhood cancer in Kuwait, 2004 to 2017 registry (Cureus 2021)", url: CUREUS_2021 },
            { label: "Arab Times: Minister of Health at the paediatric haematology and oncology conference (7 April 2025)", url: AT_ABROAD },
            { label: "Arab Times: Cancer Aware Nation on childhood cancer (28 August 2024)", url: AT_CHILD_2024 },
          ],
        },
      ],
      tables: [
        {
          id: "kw-registry-trends",
          title: "What the Kuwait Cancer Registry measured in Kuwaiti citizens, 2000 to 2013",
          caption: "World-standardised yearly rates per 100,000 and five-year net survival (%), first period (2000 to 2004) against last (2010 to 2013), as the paper's abstract reports them.",
          columns: [
            { key: "cancer", label: "Cancer" },
            { key: "inc1", label: "Incidence, 2000 to 2004", numeric: true },
            { key: "inc2", label: "Incidence, 2010 to 2013", numeric: true },
            { key: "mort1", label: "Mortality, 2000 to 2004", numeric: true },
            { key: "mort2", label: "Mortality, 2010 to 2013", numeric: true },
            { key: "surv1", label: "Five-year survival, 2000 to 2004 (%)", numeric: true },
            { key: "surv2", label: "Five-year survival, 2010 to 2013 (%)", numeric: true },
          ],
          rows: [
            { cancer: "Breast (women)", inc1: 45.6, inc2: 58.7, mort1: 5.8, mort2: 12.8, surv1: 68.3, surv2: 75.2 },
            { cancer: "Colon", inc1: 11.4, inc2: 12.6, mort1: 2.3, mort2: 5.4, surv1: 64.8, surv2: 58.5 },
            { cancer: "Lung", inc1: 10.2, inc2: 7.4, mort1: null, mort2: null, surv1: null, surv2: null },
            { cancer: "Liver", inc1: 5.5, inc2: 3.6, mort1: 3.9, mort2: 3.0, surv1: 11.4, surv2: 13.4 },
            { cancer: "Ovary", inc1: 5.8, inc2: 4.3, mort1: null, mort2: null, surv1: null, surv2: null },
            { cancer: "Cervix", inc1: 4.9, inc2: 2.4, mort1: null, mort2: null, surv1: null, surv2: null },
          ],
          note: "Kuwaiti citizens only, diagnosed 2000 to 2013 and followed to 31 December 2015; foreign residents are not in these figures. Blank cells are values the abstract does not give: for lung, cervix and ovary it says survival and mortality remained stable. Colon survival fell to 50.2% for 2005 to 2009 before rising to 58.5%. Net survival is an estimate for a group, corrected for other causes of death, and these patients were diagnosed more than a decade ago. OnCo found no registry series published for years after 2019.",
          sources: [
            { label: "Alawadhi et al., progress against cancer in Kuwait: trends in incidence, survival and mortality (Gulf J Oncolog 2023, PubMed)", url: GJO_2023 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      aside: { label: "World Bank: out-of-pocket share of health spending, Kuwait", url: WB("SH.XPD.OOPC.CH.ZS") },
      cards: [
        {
          id: "who-pays",
          title: "The government pays for most care; households paid about a tenth in 2023",
          plain:
            "In Kuwait the Ministry of Health owns and runs most hospitals and pays for most care. Government spending was 88.5% of all health spending in 2023, and people paid 10.0% from their own pockets. The government offers healthcare free in the public system, and all citizens are covered.",
          detail:
            "World Bank series for 2023: out-of-pocket spending 10.0% of current health expenditure (10.7% in 2019), domestic general government health expenditure 88.5%, current health expenditure US$1,679 per person and 4.96% of GDP. The US International Trade Administration's country guide (last published 5 May 2026) describes the Ministry of Health as the owner, operator, regulator and financer of the vast majority of healthcare services, pharmaceuticals and medical equipment, running 28 general and specialised hospitals, and says the government offers free healthcare services while some patients pay for private treatment to shorten waits. The Swedish Institute for Health Economics summarised in 2021 that all local citizens are covered, and estimated direct health-system spending on cancer at US$48 per person in 2018, about 2.8% of total health expenditure.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure", url: WB("SH.XPD.OOPC.CH.ZS") },
            { label: "World Bank: government health expenditure, % of current health expenditure", url: WB("SH.XPD.GHED.CH.ZS") },
            { label: "World Bank: current health expenditure per person, US$", url: WB("SH.XPD.CHEX.PC.CD") },
            { label: "US International Trade Administration: Kuwait country guide, healthcare", url: TRADE_GOV },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "foreign-residents",
          title: "Foreign residents need health insurance, and pay fees citizens do not",
          plain:
            "Residents who are not citizens must hold health insurance to get or renew a residence permit. New rules issued in December 2025 set this out, with effect from 23 December 2025. Some services that are free for citizens carry a charge for foreign residents, and the national breast screening programme is aimed at Kuwaiti women.",
          detail:
            "The Arab Times reported on 21 December 2025 that the Minister of Health had issued executive regulations for Law No. 1/1999 on health insurance for foreigners, making insurance mandatory for residency permits and for entry and visit visas from 23 December 2025, with an annual fee of KD 100 for listed family-visa categories, a fee of KD 10 for listed categories of private sector work permit (agricultural workers, fishermen, herders, dairy company employees and domestic workers) and a fee of KD 5 for some visas (the report calls only the KD 100 fee annual), and nine exempt categories including foreign women married to Kuwaiti citizens and children of Kuwaiti women. An official quoted there said the previous fee structure had stood for nearly 25 years. The same report describes the Health Insurance Hospitals Company (Dhaman), a public-private partnership building hospitals and primary care centres for insured non-Kuwaiti patients. Elsewhere: the HPV vaccine was reported, from unnamed health sources, as free for citizens and about KD 56 a dose for expatriates (October 2023); the cancer centre's 2019 plan lists the Ministry's newly implemented payment system for expatriates among its threats; and the 2021 Swedish review suggested raising the minimum package for expatriates towards the one citizens receive. OnCo found no official schedule of what a foreign resident pays for cancer treatment at the public centre.",
          links: [
            { label: "Arab Times: executive regulations for the foreigners' health insurance law (21 December 2025)", url: AT_INSURANCE_2025 },
            { label: "Arab Times: HPV vaccination free for citizens, KD 56 for expatriates (30 October 2023)", url: AT_HPV_2023 },
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "treatment-abroad",
          title: "The state has long sent patients abroad, and says it now sends fewer",
          plain:
            "Kuwait pays for some patients to be treated in other countries. In April 2025 the Minister of Health said the number of cases sent abroad had fallen notably as new treatments arrived at home. A registry study asked for better collection of the medical notes of people treated abroad, so that the national data stay complete.",
          detail:
            "The US International Trade Administration's guide says Kuwait sends thousands of patients with their families abroad for treatment each year at high cost and that the government aims to reduce this by expanding and building hospitals. The Minister's remarks of 7 April 2025, at a paediatric haematology and oncology conference, attributed the reduction to modern treatments and the training of local staff, and mentioned antibody-based immunotherapy and CAR T-cell therapy among recent advances. The 2019 stage study recommends more systematic retrieval of medical notes from different hospitals, particularly for patients receiving treatment abroad. OnCo did not find the current rules for who qualifies for treatment abroad, or a count of cancer patients sent.",
          links: [
            { label: "Arab Times: Minister of Health on fewer cases sent abroad (7 April 2025)", url: AT_ABROAD },
            { label: "US International Trade Administration: Kuwait country guide, healthcare", url: TRADE_GOV },
            { label: "Alawadhi et al., cancer survival by stage at diagnosis in Kuwait (J Oncol 2019)", url: JONC_2019 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "How a cancer medicine is approved and paid for",
      aside: { label: "Gulf Health Council: central registration", url: GHC_CENTRAL },
      cards: [
        {
          id: "medicines-regulator",
          title: "The Ministry of Health registers and prices every medicine",
          plain:
            "Medicines in Kuwait are regulated by the Ministry of Health itself; in 2021 the post responsible was its assistant undersecretary for drug and food control affairs. It registers medicines and sets their prices, and a 2021 decision bars pharmacies, private clinics and private hospitals from handling a medicine the Ministry has not registered and priced. The Gulf Cooperation Council states, of which Kuwait is one, also have a shared central registration system.",
          detail:
            "On 14 February 2021 the Assistant Undersecretary for Drug and Food Control Affairs announced a ministerial decision that medicines must be registered and priced by the Ministry, with the price printed in Kuwaiti dinars, and that the Ministry would publish prices on its website alongside the Official Gazette (Arab Times). The Gulf Health Council describes its central registration as a unified system for registering human medicines, medical devices and veterinary medicines for the Gulf Cooperation Council countries. Medicines go through a Central Gulf Committee for Drug Registration, whose tasks include inspecting manufacturers; medical devices and the pricing of pharmaceuticals each have a Gulf committee of their own. The page read does not name the member states. Kuwait does not appear on WHO's list of national regulators operating at maturity level 3 or 4 (August 2026 edition); the list covers regulators WHO has formally benchmarked, and absence from it is not a finding against a regulator. The Swedish review of 2021 said the approval process for new drugs can be lengthy and bureaucratic. OnCo could not read the Ministry's registration rules or its list of registered cancer medicines: its website did not answer.",
          links: [
            { label: "Arab Times: Ministry defines new controls on the sale of medicines (14 February 2021)", url: AT_SALE_2021 },
            { label: "Gulf Health Council: central registration", url: GHC_CENTRAL },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "prices-and-supply",
          title: "Paying for cancer medicines: public purchase, and price cuts by decree",
          plain:
            "The Ministry of Health is the main buyer of medicines in Kuwait as well as their regulator, so approval and public funding sit with the same body. The Ministry also sets the prices at which medicines are sold: in August 2026 it priced or cut the prices of 517 medicines, cancer medicines among them.",
          detail:
            "The US International Trade Administration's guide describes the Ministry as regulator and financer of the vast majority of pharmaceuticals purchased in the country. KUNA reported on 27 August 2026 a ministerial decision approving and reducing the prices of 517 medicines and pharmaceutical products across categories including oncology medicines, bringing the total covered by pricing and price-reduction decisions over three years to 2,760; the Ministry said prices were set against reference markets and Gulf and international standards. The Swedish review of 2021 judged the availability of targeted therapies and immunotherapies good, similar to Saudi Arabia and lower than the United Arab Emirates; said drug assessments focused on price more than on value to patients, with a move towards health technology assessment under way; and noted some difficulty in the steady supply of already reimbursed drugs. In January 2026 the Minister said new biological therapies given under the skin had been added for cancer patients in certain specialties, and in April 2025 that the government spares no effort to make medicines available, regardless of cost. A 2026 modelling paper with a co-author at the cancer centre estimated the budget effect of anti-PD-1 and anti-PD-L1 immunotherapy in the United Arab Emirates, Oman and Kuwait from the payer's side; the study was funded by MSD, a drug company, and five of its authors are MSD employees. OnCo found no public list showing which cancer medicines the Ministry funds.",
          links: [
            { label: "Kuwait Times (KUNA): prices of 517 medicines approved and reduced (27 August 2026)", url: KT_PRICES },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
            { label: "Arab Times: new biological therapies added for cancer patients (17 January 2026)", url: AT_BIOLOGICAL },
            { label: "Arab Times: Minister of Health on the availability of medicines (7 April 2025)", url: AT_ABROAD },
            { label: "US International Trade Administration: Kuwait country guide, healthcare", url: TRADE_GOV },
            { label: "Al-Shamsi et al., anti-PD-1 and anti-PD-L1 immunotherapy in the Gulf, a projection model (Clin Drug Investig 2026)", url: CDI_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Kuwait is doing",
      aside: { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
      cards: [
        {
          id: "cancer-plan",
          title: "The last national cancer plan ran to 2018; a 2025 visit was to shape an early detection action plan",
          plain:
            "A 2021 review gives Kuwait's latest national cancer plan as the one for 2013 to 2018. OnCo found no national plan published since. The public cancer centre had its own five-year plan for 2019 to 2023, and in November 2025 the Ministry hosted international teams whose recommendations were to form the basis of a national action plan for early detection.",
          detail:
            "The Swedish Institute for Health Economics reported in 2021 that the latest cancer plan, for 2013 to 2018, was developed by the Ministry of Health with the Kuwait Cancer Control Center, had no dedicated funding plan, and that no evaluation had been published; it said a new plan needed to be a priority. WHO's 2020 profile recorded a national cancer control plan as operational in 2019. The centre's Strategic Plan 2019 to 2023, held on the International Cancer Control Partnership portal, is an institutional plan with three goals: a new centre building by 2023, national and international standing (including an agreement with well-known oncology centres), and service quality, including electronic records and a shared cancer database. On 18 November 2025 the Arab Times reported a three-day visit by teams from the Gulf Center for Disease Prevention and Control and IARC to assess early detection programmes, with recommendations to form the basis of a national action plan to improve their quality.",
          links: [
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
            { label: "WHO: cancer country profile, Kuwait (2020, PDF)", url: WHO_PROFILE },
            { label: "Arab Times: Gulf and IARC teams assess early detection programmes (18 November 2025)", url: AT_GCDC },
          ],
        },
        {
          id: "cancer-centre",
          title: "One public centre treats adults with cancer, and it is moving to a new building",
          plain:
            "The Kuwait Cancer Control Center in Shuwaikh treats adults with cancer from across the country: surgery, medicines, radiotherapy, blood cancers and stem cell transplants. A new building is being prepared for it, and in late 2025 the Ministry was planning the move so that treatment would not be interrupted.",
          detail:
            "The centre's 2019 plan says its radiation oncology building started in 1968 and the centre was established in 1982 as a tertiary centre, and describes it as the only oncology hospital covering all adult cancer patients in Kuwait: five centres with 218 inpatient beds, and in 2018 3,164 admissions, 1,336 operations and 62,473 outpatient visits. Its own assessment listed strengths such as a stem cell transplant centre and an integrated palliative care team, and weaknesses including missing in-house specialties and incomplete information systems. The Arab Times reported on 1 October 2025 that the Ministry had inaugurated a gynaecological oncology unit at the centre, on 30 December 2025 that the Minister had recently met the centre's board on relocating to the new building and on a memorandum of understanding with Gustave Roussy in France for training and research, and on 17 January 2026 the Minister referring to the opening of the new centre. OnCo could not confirm from a primary source whether the move is complete.",
          links: [
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
            { label: "Arab Times: relocation to the new building and the Gustave Roussy agreement (30 December 2025)", url: AT_RELOCATION },
            { label: "Arab Times: gynaecological oncology unit opens (1 October 2025)", url: AT_GYNAE },
            { label: "Arab Times: Minister of Health at the gynaecological and urological oncology conference (17 January 2026)", url: AT_BIOLOGICAL },
            { label: "Arab Times: plans for the new cancer centre (27 April 2024)", url: AT_KCCC_2024 },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: two centres and five megavoltage machines in the IAEA directory",
          plain:
            "The IAEA's directory of radiotherapy centres lists two centres in Kuwait with five machines that give external beam radiotherapy. That entry was last updated in 2021, before the new cancer centre building, so the present number may differ.",
          detail:
            "The DIRAC country row for Kuwait, read on 16 November 2026, gives RTCenters 2, HePhotonAndElectronBeamRt 5 (high-energy photon and electron beam units, that is megavoltage machines), BrachyTherapyIncEl 1 and LastUpdate 2021. The row's separate BrachyTherapy field reads No while BrachyTherapyIncEl reads 1; OnCo reports both as the fields are named and does not interpret the difference. WHO's 2021 cervical cancer profile gives 13 radiotherapy units and 3 brachytherapy units per 10,000 cancer patients. The centre's 2019 plan names two radiotherapy buildings on its site, the old building for radiation oncology and the Faisal Sultan bin Essa centre for diagnostics and radiation therapy. The Swedish review of 2021 said the number of machines was close to recommended standards and that rising patient numbers called for planning more.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
            { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "palliative-care",
          title: "Palliative care has a dedicated centre; care at home was not generally available",
          plain:
            "Kuwait has a Palliative Care Center in the Al-Sabah Medical Area in Shuwaikh that treats pain and other symptoms of cancer. A study there found pain scores fell after patients were referred. WHO's profiles recorded that palliative care in primary care clinics and at home was not generally available.",
          detail:
            "A 2021 paper from the Palliative Care Center, in the Al-Sabah Medical Area, describes it as a specialised tertiary centre and as the only standalone building offering palliative care services in Kuwait. Reviewing cancer patients referred in 2016 and 2017, it found that the share with inadequately managed pain on its index fell from 25.4% before referral to 1.7% by day six. WHO's 2021 cervical cancer profile answers No for palliative care being generally available in primary health care facilities and in community or home-based care, and its 2020 profile gives the same answer for community and home-based care in 2019, while recording that palliative care was included in the national non-communicable disease plan. OnCo found no more recent national source on home palliative care.",
          links: [
            { label: "Opioid and adjuvant prescriptions before and after referral to the Palliative Care Center in Kuwait (BMC Palliat Care 2021)", url: BMC_PALLIATIVE },
            { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
            { label: "WHO: cancer country profile, Kuwait (2020, PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening since 2014: 46,225 examinations and 418 cancers found",
          plain:
            "Kuwait's National Program for Early Detection of Breast Diseases has offered mammograms since 2014. It is for Kuwaiti women aged 40 to 69 who have no symptoms and have not been screened in the past 12 months. By November 2026 it had carried out 46,225 screening examinations and found 418 cancers, all in women with no symptoms.",
          detail:
            "The figures were presented by the head of diagnostic radiology at Adan Hospital at a workshop reported by the Kuwait Times on 1 November 2026: examinations rose from 2,952 in 2014 to 2015 to 6,091 in the latest year. Pregnant and breastfeeding women and women with cancer in the previous five years are excluded. A KUNA report in the Arab Times (19 October 2024) named screening centres at Al-Zahra, Al-Naeem, Khaitan South, Surra and Al-Aqila, with booking through the Sahel and Kuwait Health applications and images read at a main centre. At the 2026 workshop the chairman of the Cancer Aware Nation campaign said Kuwait recommends screening every two years. For scale, IARC estimates 982 breast cancers in Kuwait in 2024 among all residents, against 39 found by the programme in its latest reported year; the comparison is OnCo's own, and the programme is for Kuwaiti women only. The Swedish review of 2021 called participation low and asked for ways to raise it. Women who are not citizens are outside the programme's stated target group.",
          links: [
            { label: "Kuwait Times: breast screening programme figures presented at the Cancer Aware Nation workshop (1 November 2026)", url: KT_BREAST_2026 },
            { label: "Arab Times (KUNA): Minister of Health on the national breast programme (19 October 2024)", url: AT_MAMMO_2024 },
            { label: "WHO: cancer country profile, Kuwait (2020, PDF)", url: WHO_PROFILE },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "bowel-screening",
          title: "Bowel cancer: a 2015 early diagnosis programme, with no published reach",
          plain:
            "The Ministry of Health launched a National Program for Early Diagnosis of Colorectal Cancer in 2015. Researchers writing in 2025 said they had no information on how many people it reaches, and described Kuwait as lacking an established nationwide screening programme. Bowel cancer is the second commonest cancer in the country.",
          detail:
            "The 2025 cost-effectiveness study, with a registry co-author, cites a survey in which 19% of Kuwaiti nationals eligible for colorectal screening had had any check, and concludes that a stool blood test followed by colonoscopy or sigmoidoscopy would cost less and give more quality-adjusted life years than no screening in its model. A study of 1,005 Kuwaiti adults over 40 without symptoms who had a first screening colonoscopy from 2015 to 2018 found adenomas in 27.7% and cancer in 1.2%. The Swedish review of 2021 described colorectal screening as opportunistic and suggested an organised programme. In November 2026 a study registered on ClinicalTrials.gov was recruiting to test the feasibility and uptake of low-dose CT screening for lung cancer in Kuwait.",
          links: [
            { label: "Nur et al., cost effectiveness of three colorectal cancer screening modalities in Kuwait (Sci Rep 2025)", url: SCIREP_2025 },
            { label: "Abdelnaby et al., colonoscopy screening findings in Kuwait (Saudi J Gastroenterol 2021)", url: SJG_2021 },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
            { label: "ClinicalTrials.gov: NCT07766538, low-dose CT lung cancer screening in Kuwait", url: "https://clinicaltrials.gov/study/NCT07766538" },
          ],
        },
        {
          id: "cervical-screening",
          title: "No national cervical screening programme; about 15% of Kuwaiti women had been screened in a 2014 survey",
          plain:
            "WHO recorded in 2021 that Kuwait has no national cervical screening programme. Smear tests are done when a gynaecologist recommends one or a woman asks. In a national survey carried out in 2014 and analysed in 2025, 15.2% of Kuwaiti women aged 18 to 69 had ever been screened.",
          detail:
            "The survey analysis (2,292 women from WHO's STEPS survey of Kuwaiti citizens, with data collected during 2014) found screening more common in older, married and more educated women and 60% lower odds outside the Capital governorate; the authors say testing normally begins after marriage and is offered at check-ups every five years on a gynaecologist's recommendation. WHO's 2021 profile charts 16% of women aged 30 to 49 screened in the last five years and 17% ever screened (2019), and records national guidelines on cervical cancer management and a defined referral system. The Swedish review of 2021 said an organised programme was planned, subject to a cost-effectiveness assessment. In January 2026 the Minister of Health said the Ministry had broadened early screening services for breast cancer, cervical cancer and other diseases; OnCo found no description of a cervical programme's target ages or test. IARC estimates 89 cervical cancers and 30 deaths a year.",
          links: [
            { label: "Alawadhi et al., uptake of cervical cancer screening in Kuwait, WHO STEPS survey (Asian Pac J Cancer Prev 2025)", url: APJCP_2025 },
            { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
            { label: "Kuwait Times: Minister of Health on vaccination and screening (26 January 2026)", url: KT_HPV_2026 },
            { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF)", url: IHE_2021 },
          ],
        },
        {
          id: "hpv-vaccination",
          title: "HPV vaccine introduced in 2023; WHO's data hold no coverage figure",
          plain:
            "The HPV vaccine protects against the virus that causes most cervical cancers. A newspaper reported in October 2023 that Kuwait had begun offering it through preventive health centres, free for citizens, for people aged 9 to 45. WHO's records show the vaccine as introduced nationwide from 2023, but hold no coverage figure for any year, so they do not show how many children have had it.",
          detail:
            "WHO's vaccine introduction dataset records HPV vaccine as not introduced in Kuwait for each year to 2022 and as introduced nationwide for 2023, 2024 and 2025; its 2021 cervical profile still described the vaccine as outside the national schedule. WHO's coverage rows for HPV programme coverage, first and last dose, girls and boys, are empty for every year from 2021 to 2025. The Arab Times reported the campaign's launch on 30 October 2023, citing unnamed health sources and not a ministry statement: 900 doses to each preventive health centre in a first batch, two doses for ages 9 to 14 and three for ages 15 to 45 and for people with immune deficiency, free for citizens and about KD 56 a dose for expatriates. In January 2026 the Minister of Health said vaccination had been expanded to include people aged 9 to 45 (Kuwait Times). In a statement of 28 September 2025 reported by the Arab Times, the Ministry said that the vaccine is safe and effective for girls and boys, is typically given at 11 to 12 and can start at 9, and that there is no recommendation to give it for prevention after 45. OnCo found no statement that the vaccine is given through schools.",
          links: [
            { label: "WHO immunisation data: vaccine introduction, Kuwait (API)", url: WIISE_INTRO },
            { label: "WHO immunisation data: HPV programme coverage, Kuwait (API)", url: WIISE_HPV },
            { label: "Arab Times: national HPV vaccination campaign launched (30 October 2023)", url: AT_HPV_2023 },
            { label: "Arab Times: Ministry clarifies HPV vaccine guidance (29 September 2025)", url: AT_HPV_2025 },
            { label: "Kuwait Times: Minister of Health on vaccination and screening (26 January 2026)", url: KT_HPV_2026 },
            { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
          ],
        },
      ],
      tables: [
        {
          id: "kw-breast-programme",
          title: "The national breast screening programme's own counts",
          caption: "Screening examinations and cancers detected, as presented at a workshop by a hospital radiology head and reported on 1 November 2026.",
          columns: [
            { key: "period", label: "Period" },
            { key: "exams", label: "Screening examinations", numeric: true },
            { key: "cancers", label: "Cancers detected", numeric: true },
          ],
          rows: [
            { period: "2014 to 2015", exams: 2952, cancers: 26 },
            { period: "The following year", exams: 3945, cancers: 57 },
            { period: "Latest year reported", exams: 6091, cancers: 39 },
            { period: "Since 2014, total", exams: 46225, cancers: 418 },
          ],
          note: "Figures as reported by the Kuwait Times on 1 November 2026 from a workshop; the report calls the third row last year without naming it. The programme targets Kuwaiti women aged 40 to 69 without symptoms. The report gives no participation rate, and these are the programme's counts only.",
          sources: [{ label: "Kuwait Times: breast screening programme figures (1 November 2026)", url: KT_BREAST_2026 }],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Trials and research",
      aside: { label: "ClinicalTrials.gov: cancer studies listing Kuwait", url: CTGOV },
      cards: [
        {
          id: "trials-in-corpus",
          title: "No trial in OnCo's records lists a site in Kuwait",
          plain:
            "OnCo holds a selection of cancer trials, not the whole registry, and none of them lists a hospital in Kuwait. The registry itself shows a small number: a search of ClinicalTrials.gov for cancer studies with a location in Kuwait returned 22 studies, three of them recruiting.",
          detail:
            "The count of zero comes from OnCo's capture of ClinicalTrials.gov site lists for the trials it holds. The registry search (condition cancer, location Kuwait) was run through the ClinicalTrials.gov API on 16 November 2026 and matches loosely: its first results include a fertility study and a study of weight-loss surgery. The three recruiting studies it returned were a feasibility study of low-dose CT lung cancer screening in Kuwait (NCT07766538), an international registry for blastic plasmacytoid dendritic cell neoplasm (NCT05430971) and a study titled CHARM Hepatocellular Carcinoma MEA Study (NCT07650773); completed entries include observational studies in multiple myeloma and ovarian cancer. A patient in Kuwait looking for a trial should ask the treating team at the cancer centre, and can search the registry by country.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies listing Kuwait", url: CTGOV },
            { label: "OnCo: trials", url: "/trials/" },
          ],
        },
        {
          id: "registry-research",
          title: "Research from Kuwait is mostly registry and survey work",
          plain:
            "The published cancer research OnCo read from Kuwait measures how common cancers are, how long patients live and who takes up screening. Several of the studies were done by registry staff with the London School of Hygiene and Tropical Medicine, and two of them acknowledge funding from the Kuwait Foundation for the Advancement of Sciences.",
          detail:
            "The survival studies of 2019 and 2023 used Kuwait Cancer Registry data for citizens diagnosed from 2000 to 2013 and, in the stage study, quality-control procedures from the CONCORD programme and its United States results for comparison. The stage study says it was partially funded by the Kuwait Foundation for the Advancement of Sciences, and the colorectal screening study acknowledges the foundation's financial support. Registry data are not open: the stage paper says requests go to the Ministry of Health, and the Ministry said in August 2026 that research use of registry data stays subject to ethical approval and review. The cancer centre's 2019 plan set a target that every service publish at least one research paper a year by 2023, and the agreement with Gustave Roussy covers research as well as training. The Ministry's statement on the new registry department names cooperation with WHO and international registry bodies as an aim.",
          links: [
            { label: "Alawadhi et al., cancer survival by stage at diagnosis in Kuwait (J Oncol 2019)", url: JONC_2019 },
            { label: "Alawadhi et al., progress against cancer in Kuwait (Gulf J Oncolog 2023, PubMed)", url: GJO_2023 },
            { label: "Nur et al., colorectal cancer screening in Kuwait (Sci Rep 2025)", url: SCIREP_2025 },
            { label: "Kuwait Times (KUNA): registry department established at the cancer centre (31 August 2026)", url: KT_REGISTRY },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-ministry-site",
      title: "The Ministry of Health's website could not be read",
      plain:
        "The Ministry's website, moh.gov.kw, did not answer on 16 November 2026, so nothing on this page comes from a ministry page read directly. Ministry statements are taken from news reports and dated.",
      detail:
        "Requests to https://www.moh.gov.kw/ and to its English home page over http both timed out after 60 seconds. An Internet Archive copy of the English home page from 18 February 2026 loaded but lists services and old awareness-day items, with nothing on cancer programmes. As a result OnCo did not read: the Ministry's drug registration rules or its list of registered and priced medicines; its pages for the breast and colorectal early detection programmes; its immunisation schedule; or its rules for treatment abroad. The ministerial decisions cited here (the 2021 medicines decision, the 2025 insurance regulations, the 2026 registry department and price decisions) are known to OnCo through news reports, KUNA's in the Kuwait Times for the two 2026 decisions and the Arab Times' own for the 2021 and 2025 ones, not from the decisions' own text.",
      links: [
        { label: "Ministry of Health, Kuwait (did not answer when this page was checked)", url: "https://www.moh.gov.kw/" },
        { label: "Internet Archive: Ministry of Health English home page (copy of 18 February 2026)", url: "https://web.archive.org/web/2026/https://www.moh.gov.kw/en/Pages/default.aspx" },
      ],
    },
    {
      id: "gap-registry-reports",
      title: "No registry annual report found, and no registry count after 2019",
      plain:
        "The Kuwait Cancer Registry's annual reports were not found online. The latest overall count OnCo could read is a press figure for 2010 to 2019, and the detailed survival figures end with patients diagnosed in 2013.",
      detail:
        "Not found or not readable: any Kuwait Cancer Registry annual report; a registry count by year, sex or nationality after 2019; survival figures for patients diagnosed after 2013 or for non-Kuwaiti residents. IARC's page of detailed data sources, which would say which registry years lie behind the 2024 estimate, is built by JavaScript and returned no content to a plain request. The Gulf Centre for Cancer Control and Prevention's site (gccancercontrol.org, a guessed address) did not resolve, and its reports on the Gulf states were not read; a Gulf-wide figure appears here only through the 2023 WHO regional journal paper. The Springer chapter on oncology care in Kuwait in Cancer in the Arab World returned a browser check and was not read. The Lancet Oncology's 2025 piece Cancer control in the Middle East: Kuwait perspective has no abstract and was not read.",
      links: [
        { label: "IHE: summary sheet, cancer care in Kuwait (2021, PDF), which asks that annual reports be made public", url: IHE_2021 },
        { label: "IARC: Global Cancer Observatory, data sources and methods", url: "https://gco.iarc.who.int/today/en/data-sources-methods" },
      ],
    },
    {
      id: "gap-plan-and-coverage",
      title: "No current national cancer plan found, and no screening or vaccination coverage figures",
      plain:
        "OnCo did not find the text of the 2013 to 2018 national cancer plan or any national plan after it. OnCo found no published participation rate for breast or bowel screening, and WHO holds no HPV vaccination coverage figure for Kuwait.",
      detail:
        "The International Cancer Control Partnership portal's file named for Kuwait's 2020 plan is WHO's 2020 country profile, not a national plan; the portal's other Kuwait document is the cancer centre's institutional plan for 2019 to 2023. The early detection action plan that the November 2025 visit was to inform was not found. For screening, the figures reported for the programme give examinations and cancers found but not the number of women invited or eligible; the authors of the 2025 paper write that they have no information on the reach of the 2015 colorectal programme; and the full text of the 2019 paper on starting the mammography programme returned an error from Europe PMC. For HPV, every WHO coverage row from 2021 to 2025 is empty, and no source read says how many doses have been given.",
      links: [
        { label: "WHO immunisation data: HPV programme coverage, Kuwait (API)", url: WIISE_HPV },
        { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
      ],
    },
    {
      id: "gap-access-and-capacity",
      title: "What foreign residents pay, which medicines are funded, and today's machines",
      plain:
        "Three practical questions could not be answered from a source: what a foreign resident pays for cancer treatment at the public centre, which cancer medicines the Ministry funds, and how many radiotherapy machines are working now.",
      detail:
        "No fee schedule for non-Kuwaiti cancer patients was found, nor a statement of what insurance through the Dhaman hospitals covers for cancer. No public formulary or reimbursement list for cancer medicines was found, and the 2021 review's account of approval times and supply is five years old. The IAEA directory entry for Kuwait was last updated in 2021 and predates the new centre building; no source read gives the equipment installed there, and whether the centre has completed its move could not be confirmed. Current rules and numbers for treatment abroad were not found. WHO's 2020 profile figures for scanners and staff per 10,000 cancer patients were not used where the PDF's layout left a number's row unclear. No person record was added, because no institution page naming a current post-holder could be read directly.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
        { label: "Arab Times: executive regulations for the foreigners' health insurance law (21 December 2025)", url: AT_INSURANCE_2025 },
      ],
    },
  ],
  institutions: [
    "kuwait-cancer-control-center",
    "kuwait-ministry-of-health",
    "kuwait-cancer-registry",
    "nbk-specialized-hospital-for-children-kuwait",
    "palliative-care-center-kuwait",
    "fadia-survive-and-thrive",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-alawadhi-kuwait-survival-by-stage-j-oncol-2019",
    "paper-alawadhi-kuwait-progress-against-cancer-gjo-2023",
    "paper-nur-kuwait-colorectal-screening-cost-sci-rep-2025",
    "paper-alawadhi-kuwait-cervical-screening-steps-apjcp-2025",
  ],
  people: [],
  how:
    "Every card was written from sources read in full as raw text on 16 November 2026, not through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer profile and 2021 cervical cancer profile for Kuwait; the World Bank indicator API; WHO's immunisation data API; the IAEA DIRAC country row; WHO's August 2026 list of regulators at maturity level 3 and 4; the Gulf Health Council's central registration page; the Kuwait Cancer Control Center's Strategic Plan 2019 to 2023; the Swedish Institute for Health Economics' 2021 summary sheet; the US International Trade Administration's country guide; Ministry of Health statements as reported by the Kuwait Times (mostly from KUNA) and the Arab Times, and by EpiNews; and registry and screening papers through Europe PMC, with every DOI resolved there before use. Trials were counted from OnCo's ClinicalTrials.gov participation data and from the ClinicalTrials.gov API. The Ministry of Health's own website did not answer, so its statements are second-hand and dated. The records added for this page are the Kuwait Cancer Registry, the National Bank of Kuwait Specialized Hospital for Children, the Palliative Care Center and four papers.",
  verify:
    "IARC's figures are estimates built from the national registry, and the deaths are modelled. Most survival and stage figures here are for Kuwaiti citizens diagnosed from 2000 to 2013 and do not describe foreign residents or today's treatment. Insurance fees and medicine prices changed in 2025 and 2026 and may change again, and the cancer centre is moving to a new building: confirm what applies to you with the Kuwait Cancer Control Center or the Ministry of Health, and ask your own team about screening, vaccination and trials.",
  verifyLinks: [
    { label: "IARC: GLOBOCAN 2024 fact sheet, Kuwait (PDF)", url: GCO_FACT },
    { label: "WHO: cancer country profile, Kuwait (2020, PDF)", url: WHO_PROFILE },
    { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
    { label: "World Bank: out-of-pocket share of health spending, Kuwait", url: WB("SH.XPD.OOPC.CH.ZS") },
    { label: "Ministry of Health, Kuwait", url: "https://www.moh.gov.kw/" },
  ],
};
