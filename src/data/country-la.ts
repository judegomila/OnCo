import type { CountryDive } from "@/data/country-dive";

/**
 * Laos deep dive: the hand-written cards for /countries/la/ (wave 15). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for the Lao People's
 * Democratic Republic; the summary report of the July 2022 imPACT review by the IAEA, WHO and IARC; WHO's 2020 cancer
 * country profile and 2021 cervical cancer profile; WHO's Lao office page on National Health Insurance; WHO's
 * immunisation and health expenditure rows from its public data APIs; the IAEA DIRAC public country table; and the
 * abstracts of papers from Laos resolved through Europe PMC. IARC builds its incidence estimate for Laos from
 * neighbouring countries' rates, so the GLOBOCAN figures are modelled, not counted. The Food and Drug Department's
 * rules, the insurance benefit list and the plan that replaced the 2014 to 2020 one were not read and are named as gaps.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/418-lao-peoples-democratic-republic-fact-sheet.pdf";
const IMPACT_2022 = "https://www.iaea.org/sites/default/files/documents/review-missions/lao-impact-review-0722.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/lao-2020.pdf";
const WHO_CX_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-lao-2021-country-profile-en.pdf";
const WHO_NHI_2022 = "https://www.who.int/laos/news/detail/06-10-2022-updated-national-health-insurance-strategy-aims-to-better-protect-people--ensure-financial-sustainability";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'LAO'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'LAO'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'LAO'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'LAO'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'LAO'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'LAO'";
const WHO_ML_LIST = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_FEED = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const FDD = "https://www.fdd.gov.la";
const UICC_MEMBER = "https://www.uicc.org/membership/national-cancer-center-laos";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Lao";
const ICCP_NCD_PLAN = "https://www.iccp-portal.org/resources/national-multisectoral-action-plan-prevention-and-control-noncommunicable-diseases-2014";
const REGISTRY_PAPER = "https://doi.org/10.1186/s12889-026-27554-3";
const THAILAND_PAPER = "https://doi.org/10.7314/apjcp.2013.14.9.5435";
const CHILDREN_PAPER = "https://doi.org/10.1080/08880018.2018.1477888";
const SCREENING_PAPER = "https://doi.org/10.1371/journal.pone.0266592";
const BREAST_PAPER = "https://doi.org/10.31557/apjcp.2019.20.2.589";
const CTGOV = "https://clinicaltrials.gov/search?country=Laos&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=AREA%5BLocationCountry%5DLao%20People%27s%20Democratic%20Republic&query.cond=cancer&pageSize=20&countTotal=true&fields=NCTId,BriefTitle,OverallStatus,LocationCountry";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Lao People's Democratic Republic (PDF)", url: IARC_FACTSHEET },
  impact: { label: "imPACT review of Lao PDR, summary report (IAEA, WHO and IARC, July 2022, PDF)", url: IMPACT_2022 },
  who2020: { label: "WHO: Cancer Country Profile 2020, Lao PDR (PDF)", url: WHO_PROFILE_2020 },
  whoCx: { label: "WHO: Cervical Cancer Country Profile 2021, Lao PDR (PDF)", url: WHO_CX_2021 },
  nhi: { label: "WHO Lao PDR: updated National Health Insurance Strategy (6 October 2022)", url: WHO_NHI_2022 },
  hpv: { label: "WHO immunisation data: HPV programme coverage, Lao PDR (API)", url: WHO_HPV_API },
  intro: { label: "WHO immunisation data: vaccine introduction, Lao PDR (API)", url: WHO_INTRO_API },
  oop: { label: "WHO Global Health Expenditure Database: out-of-pocket share, Lao PDR (API)", url: WHO_OOP_API },
  che: { label: "WHO Global Health Expenditure Database: health spending per person, Lao PDR (API)", url: WHO_CHE_API },
  dirac: { label: "IAEA DIRAC: public country table of radiotherapy centres", url: DIRAC },
  registry: { label: "Vongdala et al., cancer cases in the hospital-based registry of Lao PDR, 2010 to 2024 (BMC Public Health 2026)", url: REGISTRY_PAPER },
  ctgov: { label: "ClinicalTrials.gov: cancer studies with a site in Laos (search)", url: CTGOV },
};

export const LA_DIVE: CountryDive = {
  iso2: "LA",
  iso3: "LAO",
  name: "Laos",
  flag: "🇱🇦",
  asOf: "2026-11-16",
  title: "Cancer in Laos",
  description:
    "Cancer in Laos: IARC's estimate of 8,400 new cancers and 5,721 deaths in 2024, modelled from neighbouring countries' rates, not counted, in a country with no national population-based registry; liver cancer as the commonest cancer and cause of cancer death; one radiotherapy centre with one machine at Mittaphab Hospital in Vientiane in sources from 2022; a hospital registry of 1,738 cases from 2010 to 2024; tax-funded National Health Insurance that did not cover radiotherapy when reviewed in 2022; out-of-pocket payments at 44.8% of health spending in 2023; HPV vaccination since 2020, reaching 96% of targeted girls in 2025; and the government sources OnCo did not read.",
  lede:
    "In the sources OnCo read, the latest of them from 2022, Laos has one radiotherapy centre, at Mittaphab Hospital in Vientiane. It also has a National Cancer Center that keeps a hospital registry, tax-funded National Health Insurance, and an HPV vaccination programme that reached 96% of targeted girls in 2025. It has no national population-based cancer registry, and IARC's estimate of 8,400 new cancers and 5,721 deaths in 2024 is modelled from neighbouring countries' rates, not counted in Laos.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Laos (which IARC lists as the Lao People's Democratic Republic) is 8,400 new cancers and 5,721 deaths, an age-standardised incidence of 131.8 per 100,000 (139.3 in men, 126.8 in women) and mortality of 93.4 (109.2 in men, 79.7 in women). The fact sheet leaves the country-specific data source for incidence blank and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\"; for mortality the source is Survcan and the method \"National incidence estimates applied to model-based M:I ratios (registry survival data)\". These are therefore modelled figures, not counts: no registry in Laos counts new cancers across a defined population, and WHO's 2020 profile records no coverage of death registration for 2007 to 2016, the years it rated. The hospital registry at the National Cancer Center recorded 1,738 cases over fifteen years, which is the people who reached one hospital, not the country's total.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Laos",
      aside: L.iarc,
      cards: [
        {
          id: "shape",
          title: "About 8,400 new cancers a year in IARC's model, with liver cancer first",
          plain:
            "IARC estimates 8,400 new cancers and 5,721 cancer deaths in Laos in 2024. Liver cancer is the commonest cancer and the commonest cause of cancer death. By new cases it is followed by breast, lung, colorectal and cervical cancer; by deaths, by lung, colorectal, breast and cervical cancer. These figures are modelled from neighbouring countries' rates, not counted in Laos.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,861 liver cancers (22.2% of all new cancers) and 1,711 liver cancer deaths (29.9% of cancer deaths), then 908 breast cancers, 734 lung cancers (652 deaths), 726 colorectal cancers (424 deaths) and 437 cervical cancers (243 deaths). In men liver cancer is 1,297 of 4,105 new cancers (31.6%); in women breast cancer is first with 908 of 4,295 (21.1%), then liver (564) and cervix (437). The estimated risk of developing cancer before age 75 is 13.9%, and 16,509 people are estimated to be living within five years of a diagnosis. IARC's method for incidence is \"Rates based on incidence estimates or registry data from neighbouring countries\".",
          links: [L.iarc],
        },
        {
          id: "hospital-registry",
          title: "The National Cancer Center's registry: 1,738 cases from 2010 to 2024",
          plain:
            "Laos has no population-based cancer registry. The National Cancer Center in Vientiane keeps a hospital registry, and a 2026 study of it counted 1,738 cancers recorded from 2010 to 2024. Cervical cancer was 41.1% of cases in women, and liver and bile duct cancer 15.1% of cases in men.",
          detail:
            "The study, by staff of the National Cancer Center with colleagues in Thailand, found 1,108 cases in women and 630 in men. Cases came mostly from Vientiane province and the central provinces around it, which the authors read as under-reporting elsewhere; detection in northern and southern provinces improved in 2020 to 2024. They call for a national population-based registry. WHO's 2021 cervical cancer profile answers \"No\" for 2021 to whether a population-based cancer registry exists, and WHO's 2020 profile recorded \"registration activity\" for 2019 and no coverage of death registration for 2007 to 2016. The 2022 imPACT review recommended officially designating the cancer centre unit at Mittaphab Hospital as responsible for national registry work, with a continuous budget from the Ministry of Health.",
          links: [L.registry, L.whoCx, L.who2020, L.impact],
        },
        {
          id: "treated-in-thailand",
          title: "An older record from across the border: 847 Lao patients treated in Khon Kaen",
          plain:
            "A 2013 study counted 847 Lao cancer patients treated at Srinagarind Hospital in Khon Kaen, Thailand, between 1988 and 2010. It is a record of people who could travel, not of cancer in Laos.",
          detail:
            "The study, whose listed author address is the Faculty of Public Health at Khon Kaen University, reviewed patients treated with surgery, radiation and chemotherapy. Stage could not be determined for 70.2% of them; among those with a known stage, 54.0% were at stage IV. In men the commonest sites were liver (16.1%), blood (12.3%) and nasopharynx (10.6%); in women cervix (22.2%), breast (14.6%) and blood (8.1%). The authors wrote in 2013 that Laos had one hospital-based registry and that patients who could do so travelled to neighbouring countries for treatment. OnCo found no recent source on how many Lao patients are treated abroad today.",
          links: [{ label: "Chaleunvong et al., cancer patients from Vientiane seeking treatment in Thailand (Asian Pac J Cancer Prev 2013)", url: THAILAND_PAPER }],
        },
      ],
      tables: [
        {
          id: "globocan-top",
          title: "The commonest cancers in IARC's 2024 estimate",
          caption: "Estimated new cases and deaths in 2024, both sexes, IARC GLOBOCAN 2024 (modelled from neighbouring countries' rates, not counted)",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 8400, deaths: 5721 },
            { site: "Liver", cases: 1861, deaths: 1711 },
            { site: "Breast", cases: 908, deaths: 395 },
            { site: "Lung", cases: 734, deaths: 652 },
            { site: "Colorectum", cases: 726, deaths: 424 },
            { site: "Cervix uteri", cases: 437, deaths: 243 },
          ],
          note: "Laos has no population-based cancer registry, so there are no national counts to show here. IARC names no Lao data source for incidence and bases the rates on neighbouring countries; deaths are modelled from those incidence estimates.",
          sources: [L.iarc],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays for cancer care",
      cards: [
        {
          id: "insurance",
          title: "National Health Insurance covers most people, but not all of cancer care",
          plain:
            "Laos has had tax-funded National Health Insurance since 2016, and WHO's Lao office reported in October 2022 that it protected 94% of the population in 2021. A 2022 international review found that radiotherapy was not in the essential benefit package and that cancer medicines were reimbursed only after a large advance payment.",
          detail:
            "WHO's Lao office wrote in October 2022 that people pay a small co-payment of 5,000 to 20,000 kip for outpatient care and 5,000 to 30,000 kip for inpatient care, depending on the level of facility, with no charge for pregnant women, children and the poor, and that some people are asked to pay additional or excessive fees. The July 2022 imPACT review by the IAEA, WHO and IARC found, for cancer: radiotherapy not included in the essential benefit package; palliative care included with very limited coverage; systemic treatment reimbursed only after a significant advance payment; and high out-of-pocket payments for imaging and surgery. It said an estimated 30% of patients refuse cancer surgery because of high out-of-pocket payments. OnCo did not read the insurance bureau's own benefit list, so ask the hospital what the scheme pays for today.",
          links: [L.nhi, L.impact],
        },
        {
          id: "spending",
          title: "Households paid 44.8% of health spending in 2023",
          plain:
            "WHO estimates that out-of-pocket payments were 44.8% of Laos's current health expenditure in 2023, and that total health spending was US$27 per person that year. Both figures moved sharply between 2021 and 2023.",
          detail:
            "WHO's Global Health Expenditure Database gives an out-of-pocket share of 30.7% in 2021, 28.7% in 2022 and 44.8% in 2023, and current health expenditure per person of US$68.62 in 2021, US$41.35 in 2022 and US$27.42 in 2023. In 2023 domestic government spending was 39.8% of the total and external funding 15.4%, down from 36.3% in 2022. The database does not explain the changes, and OnCo has not looked for the reason. The 2022 imPACT review said that up to 50% of current health expenditure was financed out of pocket.",
          links: [
            L.oop,
            L.che,
            { label: "WHO Global Health Expenditure Database: government share, Lao PDR (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share, Lao PDR (API)", url: WHO_EXT_API },
            L.impact,
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Who approves cancer medicines",
      cards: [
        {
          id: "food-and-drug-department",
          title: "The Food and Drug Department registers medicines; how cancer drugs reach hospitals is less formal",
          plain:
            "The Food and Drug Department of the Ministry of Health is the body whose website carries medicine registration and import rules for Laos. A 2022 international review found that anti-cancer medicines were bought directly by practitioners and sourced from Thailand, with no standard procurement.",
          detail:
            "The department's website is in Lao, with sections for laws, registration, guidance, import and product information; OnCo did not read its registration rules or a list of registered cancer medicines. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include a Lao authority. The July 2022 imPACT review reported supplier delays, poor quality shipments and higher prices from buying medicines this way, no task force assessing which drugs are needed, and concern about how hazardous anti-cancer drugs are handled, with a lack of personal protective equipment. It recommended that the government organise procurement and quality assurance of anti-cancer medicines and review the national list of essential anti-cancer medicines. Whether that has happened since 2022 is not known to OnCo; the treating hospital can say which medicines it stocks.",
          links: [
            { label: "Food and Drug Department, Ministry of Health, Lao PDR (in Lao)", url: FDD },
            L.impact,
            { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML_LIST },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2020, at 96% of targeted girls in 2025",
          plain:
            "Laos added HPV vaccination to its national programme in 2020. WHO's programme coverage figures for girls fell after the first year and then rose to 95% in 2024 and 96% in 2025, for both the first and the last dose.",
          detail:
            "WHO's immunisation data mark the HPV vaccine as introduced from 2020, and WHO's 2021 cervical cancer profile describes a national programme with a primary target cohort of girls aged 10 to 14. The programme coverage rows for girls give a first dose of 77% in 2020, 29% in 2021, 54% in 2022 and 59% in 2023, and a last dose of 54% in 2021, 22% in 2022 and 34% in 2023; in 2024 both were 95% and in 2025 both were 96%. There is no figure for boys. The 2022 imPACT review quoted different WHO and UNICEF estimates for 2021 (87% first dose and 42% second dose), so the early years should be read with care.",
          links: [L.hpv, L.intro, L.whoCx, L.impact],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening is offered case by case, mainly in central hospitals",
          plain:
            "Laos has no organised national cervical screening programme in WHO's 2021 profile, which estimated that 4% of women aged 30 to 49 had ever been screened. A national strategy set a target of screening 40% of eligible women by 2025.",
          detail:
            "WHO's 2021 cervical cancer profile gives 3% of women aged 30 to 49 screened in the last five years and 4% ever screened (2019). The 2022 imPACT review found cervical and breast cancer early detection done opportunistically, mainly at central hospitals, by inspecting the cervix with acetic acid and by clinical breast examination, and said more than 60% to 70% of cervical cancers were diagnosed at advanced stages. It reported that the National Strategy for Reproductive, Maternal, Newborn, Child and Adolescent Health (2021 to 2025) aims for 40% coverage by 2025; OnCo found no report of whether that was reached. In a case-control study of 360 women in Vientiane Capital and Luang Prabang province, carried out in 2018 and published in 2022, the commonest reason given for not being screened was having no signs or symptoms (45.28%). A woman who wants screening can ask at a central or provincial hospital.",
          links: [L.whoCx, L.impact, { label: "Phaiphichit et al., factors associated with cervical cancer screening in Lao PDR (PLoS One 2022)", url: SCREENING_PAPER }],
        },
        {
          id: "liver-prevention",
          title: "Preventing liver cancer: hepatitis B vaccination and the liver fluke",
          plain:
            "Liver cancer is the commonest cancer in IARC's estimate for Laos. WHO's data mark hepatitis B vaccination as partly introduced from 2001 and fully from 2004, with a dose at birth since 2004, and a 2022 international review asked for a programme against liver fluke infection.",
          detail:
            "WHO's immunisation data mark hepatitis B vaccine as introduced in part of the country, not nationwide, for 2001 to 2003, and nationwide from 2004; the birth dose is marked from 2004. The 2022 imPACT review quoted WHO and UNICEF estimates for 2021 of 64% coverage for the birth dose and 75% for the third dose, which it called suboptimal, and recommended analysing what holds coverage back. Citing the high prevalence of liver cancer, it also recommended establishing a programme to prevent cancer caused by the carcinogenic human liver fluke. OnCo did not find a later report on either recommendation.",
          links: [L.intro, L.impact, L.iarc],
        },
      ],
    },
    {
      id: "doing",
      nav: "Treatment",
      title: "What treatment exists, and what is planned",
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre with one machine, at Mittaphab Hospital",
          plain:
            "The sources OnCo read, the latest from 2022, show one radiotherapy centre in Laos, at Mittaphab Hospital in Vientiane. The IAEA's directory lists that one centre with one treatment machine and no internal radiotherapy (brachytherapy) unit, in an entry last updated in 2022.",
          detail:
            "The July 2022 imPACT review described the centre as a modern facility that opened in 2016, with one linear accelerator, one CT simulator, no further bunkers and no room to install brachytherapy; it treats cervical cancer and bone metastases most often. The review counted two radiation oncologists and two medical physicists, all trained in Thailand, and recommended planning for a brachytherapy unit and a second machine. The IAEA's Directory of Radiotherapy Centres lists one centre for Laos, under the name Mittaphab Central Cancer Hospital in Vientiane Capital, in an entry last updated in 2022: one linear accelerator and no brachytherapy unit. The two sources give different years for the start of radiotherapy: the review says the centre opened in 2016, and UICC's member page for the National Cancer Center, in the centre's own words, says \"just in recent years 2017 we have radiotherapy\". An existing OnCo record uses 2017. OnCo has not found a source that settles which year the first patient was treated.",
          links: [L.impact, L.dirac, { label: "IAEA DIRAC: equipment by centre (public data feed, JSON)", url: DIRAC_FEED }, { label: "UICC: member page for the National Cancer Center Laos", url: UICC_MEMBER }],
        },
        {
          id: "cancer-services",
          title: "Cancer medicine at three Vientiane hospitals, and a national cancer centre in planning",
          plain:
            "In 2022 medical oncology was given at three sites, all in the Vientiane region: the cancer centre unit at Mittaphab Hospital, Setthathirath Hospital and the Children's Hospital. The review says a national cancer centre in Vientiane is a Ministry of Health priority, formally recognised in 2017.",
          detail:
            "The July 2022 imPACT review by the IAEA, WHO and IARC says there are \"a total of eight oncologists at the three sites\" and then lists five for adults and two for children, which adds up to seven; the report does not explain the difference. None is board-certified, because Laos has no residency programme, and the review counts about 266 surgeons in the country, with no surgical oncology specialty. Doctors follow the ESMO and NCCN guidelines, which have not been adapted to Laos, and decisions are made without biomarker tests because immunohistochemistry staining is lacking. Two central pathology laboratories have significant capacity to process samples, at what the review calls the University Health Services Hospital and at Mittaphab Hospital. The review found one palliative care team, at Mittaphab Hospital, and asked for a national policy on palliative care and a national regulation on access to oral morphine. It advised building the national cancer centre as the hub of a network of central and provincial hospitals. WHO's 2020 profile recorded that cancer management guidelines existed in 2019; WHO's 2021 cervical profile records none for cervical cancer.",
          links: [L.impact, L.who2020, L.whoCx],
        },
        {
          id: "plan",
          title: "No separate cancer plan: cancer sits inside the plan for noncommunicable diseases",
          plain:
            "Laos has had no stand-alone national cancer control plan in the sources OnCo read. Cancer was covered by the National Multisectoral Action Plan for the Prevention and Control of Noncommunicable Diseases for 2014 to 2020, and a successor was being written in 2022.",
          detail:
            "The 2022 imPACT review says the 2014 to 2020 plan had three cancer objectives: more cervical screening, more access to palliative care and opioids, and training an oncology workforce. It said a new plan for 2023 to 2030 was expected to be endorsed in 2023 and recommended that it carry the cancer objectives, a steering committee on cancer control and a cancer registry. WHO's 2020 profile recorded an operational integrated plan for these diseases in 2019 and no entry for a national cancer control plan. A search of the International Cancer Control Partnership portal on 16 November 2026 returned the 2014 to 2020 plan and WHO's profiles for Laos, and no cancer plan or later plan. The Ministry of Health is the place to ask whether the new plan was adopted.",
          links: [L.impact, L.who2020, { label: "ICCP portal: National Multisectoral Action Plan 2014 to 2020, Lao PDR", url: ICCP_NCD_PLAN }, { label: "ICCP portal: search for Lao (results on 16 November 2026)", url: ICCP_SEARCH }],
        },
        {
          id: "children",
          title: "Children's cancer treatment began in 2012 at the Lao-Korea National Children's Hospital",
          plain:
            "A children's cancer treatment programme started at the Lao-Korea National Children's Hospital in September 2012, with training through the Lee Jong-Wook project and infrastructure from the Korea International Cooperation Agency. A 2018 report covered 78 children diagnosed up to December 2016, most with leukaemia.",
          detail:
            "The 2018 report counted 44 children with acute lymphoblastic leukaemia, 12 with acute myeloid leukaemia, 7 with chronic myeloid leukaemia, 6 with lymphoma, 5 with retinoblastoma, 3 with Wilms tumour and 1 with a germ cell tumour. Of the 44 with acute lymphoblastic leukaemia, 40 started chemotherapy and 29 reached complete remission; 9 died during chemotherapy. Treatment was unsuccessful for all 12 children with acute myeloid leukaemia. The authors wrote that the programme faced high mortality because of insufficient resources. They wrote that they should continue their efforts \"to find more abandoned patients, detect cancer earlier, and reduce the overall associated mortality\". WHO's 2020 profile estimated 250 cancers a year in children under 15 in Laos. OnCo found no later outcome report from the programme; the 2022 imPACT review names the Children's Hospital as one of the three sites giving cancer medicine.",
          links: [{ label: "Park et al., foundation of paediatric cancer treatment in Lao PDR (Pediatr Hematol Oncol 2018)", url: CHILDREN_PAPER }, L.who2020, L.impact],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records has a site in Laos",
          plain:
            "None of the cancer trials in OnCo's records lists a site in Laos. ClinicalTrials.gov itself returned four studies with a site in Laos for the search term cancer on 16 November 2026, and none of them tests a cancer treatment.",
          detail:
            "The count from OnCo's graph reflects the trials OnCo holds, not every study in Laos. The four studies the registry's API returned were a mobile-phone programme to help cancer survivors stop using tobacco (completed), a smoking cessation programme for people with HIV (not yet recruiting), a study joining adolescent health visits with HPV vaccination (recruiting) and a community study of Helicobacter pylori infection and stomach disease (completed). The 2022 imPACT review noted that research on quality of care in Laos is limited, which leaves treatment outcomes unmeasured.",
          links: [L.ctgov, { label: "ClinicalTrials.gov API: the query read on 16 November 2026", url: CTGOV_API }, L.impact],
        },
        {
          id: "local-studies",
          title: "What Lao studies add: breast cancer subtypes in 76 women",
          plain:
            "A 2019 pathology study of 76 women with invasive breast cancer in Vientiane found that 38.2% of tumours were triple-negative, a type the authors describe as less susceptible to hormonal treatment, and concluded that basic pathology testing should come first.",
          detail:
            "The study used tissue from the University of Health Sciences in Vientiane, collected from 2013 to 2016. Hormone receptor-positive, HER2-negative tumours were 44.7%, and oestrogen receptor was positive in 40.8%; the women's mean age was 49. The authors argued that giving tamoxifen without testing should be reconsidered. It is a small series from one laboratory, not a national figure. Three years later the imPACT review still listed immunohistochemistry, the staining that tells these subtypes apart, as a service Laos needed, so it is worth asking the hospital whether receptor testing was done on a breast tumour.",
          links: [{ label: "Luangxay et al., subtypes of breast cancer in Lao PDR (Asian Pac J Cancer Prev 2019)", url: BREAST_PAPER }, L.impact],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "government-sources",
      title: "Lao government sources not read",
      plain:
        "OnCo did not read the Food and Drug Department's registration rules, the national essential medicines list, the National Health Insurance benefit list, or the noncommunicable disease plan that was due to replace the 2014 to 2020 plan. Most of what this page says about services comes from one review made in July 2022.",
      detail:
        "The Food and Drug Department's site answered, but it is in Lao and OnCo read only its section headings. The imPACT review is a summary report of a visit in July 2022; anything it describes may have changed, including the number of machines, staff and what insurance pays. Two IAEA news pages about the review returned a challenge page to the script (HTTP 403) and were not read. UICC's member page for the National Cancer Center refused a first request (HTTP 406) and answered a second on the same day; it gives 2017 for the start of radiotherapy where the review gives 2016, and both are shown on this page. A future pass should read the Ministry of Health's current plan and the insurance bureau's benefit list in Lao. Until then, the National Cancer Center at Mittaphab Hospital and the treating doctor are the places to ask what is available.",
      links: [{ label: "Food and Drug Department, Ministry of Health, Lao PDR (in Lao)", url: FDD }, L.impact],
    },
    {
      id: "no-counted-figures",
      title: "No counted incidence, deaths or survival for Laos",
      plain:
        "Because Laos has no population-based cancer registry and WHO's 2020 profile recorded no coverage of death registration, this page has no counted national incidence, no counted cancer deaths and no survival figure for Laos. IARC's numbers are modelled from neighbouring countries.",
      detail:
        "For the papers cited, only the abstracts indexed by Europe PMC were read. Two further records had no abstract there when this page was written. One, a 2022 survey of knowledge about liver cancer screening among people with hepatitis B or C in Vientiane, still has none and was used for nothing but its title. The other, a 2026 study of quality of life among people with cancer in Laos, had an abstract when the page was checked again: among 193 patients with various cancers, 82% reported pain and 87% reported financial difficulties. Its abstract does not say where or when the patients were recruited. In WHO's 2020 profile the row of population attributable fractions could not be paired with its labels in the extracted text and was not used. The IAEA's directory was first read only as its public country table; its public data feed, read on the second check, names the one centre and is cited on the radiotherapy card. A future pass should look for the hospital registry's own annual reports and for any survival study from the National Cancer Center.",
      links: [L.iarc, L.who2020, L.registry, { label: "Xatakoune et al., health-related quality of life among individuals with cancer in Laos (Front Public Health 2026)", url: "https://doi.org/10.3389/fpubh.2026.1941268" }],
    },
  ],
  institutions: ["national-cancer-center-laos", "lao-ministry-of-health", "lao-national-health-insurance-bureau", "lao-food-and-drug-department", "who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-vongdala-hospital-cancer-registry-lao-bmcph-2026"],
  people: [],
  how:
    "Every card was written from sources read as raw text on 16 November 2026, not through a summary: IARC's GLOBOCAN 2024 fact sheet; the summary report of the July 2022 imPACT review of Lao PDR by the IAEA, WHO and IARC; WHO's 2020 cancer country profile and 2021 cervical cancer profile; WHO's Lao office page on National Health Insurance; WHO's HPV, vaccine introduction and health expenditure rows from its public data APIs; the public country table and the public data feed of the IAEA's Directory of Radiotherapy Centres; UICC's member page for the National Cancer Center; WHO's August 2026 list of regulators at maturity level 3 and 4; the International Cancer Control Partnership portal; the ClinicalTrials.gov API; and the abstracts of Lao papers resolved through Europe PMC. Trials were counted from OnCo's own ClinicalTrials.gov participation data. The new records added for this page (the Ministry of Health, the National Health Insurance Bureau and one paper) carry their own sources. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "Much of this page rests on a review made in July 2022 and on modelled estimates. Check with the National Cancer Center at Mittaphab Hospital, the treating hospital or the Ministry of Health what treatment is available now, what National Health Insurance pays for, and what you would have to pay in advance.",
  verifyLinks: [L.iarc, L.impact, L.hpv, L.nhi],
};
