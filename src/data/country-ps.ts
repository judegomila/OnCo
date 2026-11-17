import type { CountryDive } from "@/data/country-dive";

/**
 * Gaza Strip and West Bank deep dive: the hand-written cards for /countries/ps/ (wave 13). "Gaza Strip and West Bank"
 * is IARC's name for this GLOBOCAN entry and is the name the page uses. Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet (PDF text); WHO's situation
 * updates for the occupied Palestinian territory, issues 66, 69, 70, 71, 72 and 73 (PDF text); WHO's medical evacuation
 * summaries of 26 January and 31 October 2026 and its West Bank health access summary for January to October 2026
 * (PDF text); WHO's monthly health access report for July 2023; WHO's reports "Right to health, 2019 to 2021" and
 * "Palestinian Voices 2022 to 2023" and its report on its response in 2025 (PDF text); WHO news pages of 15 February
 * 2022 and 10 November 2023 and a WHO Knowledge Action Portal article of 15 June 2023; OCHA's Flash Update 26 (1 November 2023) and Humanitarian Situation Update 275 (25 March
 * 2025); UNRWA's Department of Health annual report for 2022 (PDF text); the IAEA DIRAC country list and facility
 * report (JSON); WHO's immunisation data API (JSON); WHO's August 2026 list of regulators at maturity level 3 and 4;
 * the World Bank indicators API; the Palestinian Ministry of Health's cancer registry figures as relayed by WAFA on
 * 4 February 2026 and the Ministry of Health in Gaza's release dated 5 February 2023 (registry counts only, attributed
 * in the sentence and not linked: see the gaps card "ministry-sources"); and the papers' abstracts through Europe PMC.
 *
 * Every statement about a service carries the date of its source. The page says what each source states, in that
 * source's terms, and does not attribute responsibility. The Gaza Strip, the West Bank and the East Jerusalem
 * hospitals are kept apart wherever the sources keep them apart.
 */
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/275-gaza-strip-and-west-bank-fact-sheet.pdf";
const WHO_SITREPS = "https://www.emro.who.int/opt/information-resources/emergency-situation-reports.html";
const WHO_SITREP_66 = "https://www.emro.who.int/images/stories/palestine/sitrep66.pdf";
const WHO_SITREP_69 = "https://www.emro.who.int/images/stories/palestine/Sitrep_69b.pdf";
const WHO_SITREP_70 = "https://www.emro.who.int/images/stories/palestine/Sitrep_70b_latest_1.pdf";
const WHO_SITREP_71 = "https://www.emro.who.int/images/stories/palestine/Sitrep_71.pdf";
const WHO_SITREP_72 = "https://www.emro.who.int/images/stories/palestine/SItrep_72.pdf";
const WHO_SITREP_73 = "https://www.emro.who.int/images/stories/palestine/SItrep73_final.pdf";
const WHO_RESPONSE_2025 = "https://www.emro.who.int/images/stories/palestine/WHO-oPt-Response-Report-Jan-Dec-2025.pdf";
const WHO_MEDEVAC_OCT_2026 = "https://www.emro.who.int/images/stories/palestine/Medevac_31_Oct_26.pdf";
const WHO_MEDEVAC_JAN_2026 = "https://www.emro.who.int/images/stories/palestine/Medevac_26Jan26.pdf";
const WHO_WB_ACCESS_2026 = "https://www.emro.who.int/images/stories/palestine/WB_Health_access_1Jan-Oct_26.pdf";
const WHO_ACCESS_JUL_2023 = "https://www.emro.who.int/images/stories/July_2023_Monthly_2.pdf";
const WHO_ACCESS_INDEX = "https://www.emro.who.int/opt/information-resources/monthly-report-on-health-access.html";
const WHO_RTH = "https://applications.emro.who.int/docs/9789292740887-eng.pdf";
const WHO_VOICES = "https://applications.emro.who.int/docs/9789292741341-eng.pdf";
const WHO_FEB_2022 = "https://www.emro.who.int/opt/news/zaina-10-unable-to-access-cancer-treatment-since-february.html";
const WHO_NOV_2023 = "https://www.emro.who.int/opt/news/children-with-cancer-evacuated-from-gaza-for-treatment-to-egypt-and-jordan.html";
const WHO_KAP_2023 = "https://knowledge-action-portal.com/en/content/delivering-childhood-cancer-care-fragile-and-conflict-settings-best-practices-occupied";
const WHO_PNIPH = "https://www.emro.who.int/opt/priority-areas/palestinian-national-institute-of-public-health.html";
const WHO_ML = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const WHO_OPT = "https://www.emro.who.int/countries/opt/index.html";
const OCHA_FLASH_26 = "https://www.ochaopt.org/content/hostilities-gaza-strip-and-israel-flash-update-26";
const OCHA_HSU_275 = "https://www.ochaopt.org/content/humanitarian-situation-update-275-gaza-strip";
const UNRWA_2022 = "https://www.un.org/unispal/wp-content/uploads/2023/05/UNRWAHEALTHANNRPT_230523.pdf";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const DIRAC_FACILITIES = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const DIRAC_COUNTRIES = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const WIISE_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20%27PSE%27%20and%20startswith%28ANTIGEN%2C%27PRHPV%27%29";
const WIISE_HEPB3 = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PSE'%20and%20ANTIGEN%20eq%20'HEPB3'%20and%20YEAR%20ge%202019";
const WIISE_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'PSE'";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=PS";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=PS";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=PS";
const WB_GDP = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=PS";
const MINISTRY_GAP = "/countries/ps/#ministry-sources";
const BOUQUET = "https://doi.org/10.1371/journal.pone.0251058";
const ALWAHEIDI = "https://doi.org/10.1200/go.23.00170";
const MASSAD = "https://doi.org/10.1136/bmjgh-2024-015493";
const ABU_RMEILEH = "https://doi.org/10.1186/s12889-016-2715-8";
const MANSOUR = "https://doi.org/10.3389/fonc.2022.997492";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&locStr=Palestinian%20Territory";

export const PS_DIVE: CountryDive = {
  iso2: "PS",
  iso3: "PSE",
  name: "the Gaza Strip and West Bank",
  flag: "",
  asOf: "2026-11-16",
  title: "Cancer in the Gaza Strip and West Bank",
  description:
    "Cancer in the Gaza Strip and West Bank from WHO, OCHA, UNRWA, IAEA and IARC sources, each statement dated: IARC's estimate of 7,437 new cancers in 2024, built from neighbouring countries' data; 3,926 new cancers registered in the West Bank in 2024, as the Palestinian Ministry of Health reported in a statement relayed on 4 February 2026; what WHO reported about oncology services in Gaza up to September 2026; 13,973 patients medically evacuated from Gaza by 31 October 2026; the radiotherapy centres the IAEA's directory listed in 2026 in Nablus, Ramallah and Jerusalem; and out-of-pocket payments at 42% of health spending in 2023.",
  lede:
    "IARC estimates 7,437 new cancers and 3,569 cancer deaths in the Gaza Strip and West Bank in 2024, an estimate built from neighbouring countries' data. The sources report the two areas separately, so this page keeps them apart. For the West Bank, the Palestinian Ministry of Health reported 3,926 new cancers registered in 2024, in a statement relayed by the WAFA news agency on 4 February 2026, and the IAEA's directory, in entries updated in 2026, lists radiotherapy machines installed at centres in Nablus and Ramallah and at Augusta Victoria Hospital in Jerusalem; a directory entry does not say a machine is treating patients. For the Gaza Strip, WHO's update for June 2026 described oncology services at Al-Shifa Medical Complex as partially resumed and short of medicines, its update for September 2026 said limited specialised services continued to restrict access to cancer diagnosis and treatment, and WHO counted 13,973 patients medically evacuated by 31 October 2026. Every statement about a service below carries the date of its source, because the reports change from month to month.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the entry it calls Gaza Strip and West Bank is 7,437 new cancers and 3,569 deaths in a population of 5,495,447: an age-standardised incidence of 207.7 per 100,000 (221.0 in men, 199.0 in women) and mortality of 105.2 (130.5 in men, 84.2 in women), including 23 non-melanoma skin cancers. The fact sheet names no country-specific data source for incidence: IARC's method is rates based on incidence estimates or registry data from neighbouring countries (its method code 5). Mortality is those incidence estimates applied to modelled mortality-to-incidence ratios from registry survival data (code 3c), and five-year prevalence is computed from Nordic countries' ratios scaled by the Human Development Index. So the table below is a model, not a count from this territory, and it is a single figure for two areas whose registries report separately. The counts that exist are lower: the Palestinian Ministry of Health, in a statement relayed by the WAFA news agency on 4 February 2026, reported 3,926 new cancers registered in the West Bank in 2024, a rate of 130 per 100,000, and said there was no available data on new cancers in Gaza; the Ministry of Health in Gaza, in a release dated 5 February 2023, reported a rate of 91.3 per 100,000 for 2021. Those are rates as the ministries state them, and the releases do not say whether they are age-standardised, so they cannot be set directly beside IARC's. The World Bank's population figure for 2024 is 5,289,152, a little below the one IARC uses.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in the Gaza Strip and West Bank",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Gaza Strip and West Bank (PDF)", url: GCO_FACT },
      cards: [
        {
          id: "shape",
          title: "About 7,400 new cancers a year in IARC's estimate, nearly a fifth of them breast cancer",
          plain:
            "IARC estimates 7,437 new cancers in 2024: 3,889 in women and 3,548 in men. Breast cancer is the commonest, then cancers of the bowel and lung. Lung cancer causes the most cancer deaths. These figures are modelled from neighbouring countries' data and are one number for two areas, so they describe neither the Gaza Strip nor the West Bank on its own.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,372 breast cancers (384 deaths), 18.4% of all cancers and 35.3% of cancers in women; 878 colorectal cancers (398 deaths); 809 lung cancers (698 deaths); 412 bladder cancers; 396 non-Hodgkin lymphomas; 390 thyroid cancers; 360 prostate cancers; and 297 leukaemias. In men the leading cancers by cases are lung (675), colorectum (450), prostate (360), bladder (358) and non-Hodgkin lymphoma (213); in women breast, colorectum (428), thyroid (297), corpus uteri (245) and non-Hodgkin lymphoma (183). IARC estimates 2,004 cancer deaths in men and 1,565 in women, a risk of developing a cancer before age 75 of 23.6% for men and 20.2% for women, and 17,939 people living within five years of a diagnosis. IARC's method for this entry is its code 5 for incidence, rates based on incidence estimates or registry data from neighbouring countries, and 3c for mortality.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Gaza Strip and West Bank (PDF)", url: GCO_FACT },
            { label: "IARC Global Cancer Observatory: data sources and methods", url: "https://gco.iarc.who.int/today/en/data-sources-methods" },
          ],
        },
        {
          id: "registry-west-bank",
          title: "The West Bank: the Ministry of Health reported 3,926 new cancers registered in 2024",
          plain:
            "In a statement for World Cancer Day, relayed by the WAFA news agency on 4 February 2026, the Palestinian Ministry of Health reported 3,926 new cancers registered in the West Bank in 2024, up from 3,590 in 2023, and 1,639 cancer deaths. Breast cancer was the commonest, with 584 cases, then bowel cancer with 554.",
          detail:
            "The figures below are the Ministry's, as relayed by the WAFA news agency on 4 February 2026 in an article titled 'Palestinian Health Ministry reports rise in new cancer cases in the West Bank'; OnCo could not reach the Ministry's own website to read its annual health report, takes only the registry counts from the relay, and does not link it (see the gaps). The Ministry gave an incidence of 130 per 100,000 people for 2024; 1,969 new cancers in males (50.2%) and 1,957 in females (49.8%); 1,296 in people aged over 64 (33% of all cases, in an age group it put at 4% of the population); and 149 in children under 15 (3.8%). Five cancers made up 49% of new cases: breast, colorectal, lung and bronchus, thyroid and leukaemia. It reported breast cancer at 584 cases (19.5 per 100,000), colorectal cancer at 554 (18.5) and lung and bronchial cancer at 316 (10.5). Cancer was the second cause of death in the West Bank in 2024 after ischaemic heart disease: 1,639 of 9,007 recorded deaths (18.2%), 936 in males and 703 in females. An earlier study of West Bank death certificates for 1999 to 2009 found lung cancer to be 22.8% of cancer deaths in men and breast cancer 21.5% in women. A WHO page, undated and read on 16 November 2026, says the Palestinian National Institute of Public Health, a WHO project, has worked on electronic registries for cancer, causes of death and mammography screening.",
          links: [
            { label: "Abu-Rmeileh et al., cancer mortality in the West Bank (BMC Public Health 2016)", url: ABU_RMEILEH },
            { label: "WHO EMRO: Palestinian National Institute of Public Health (undated page)", url: WHO_PNIPH },
          ],
        },
        {
          id: "registry-gaza",
          title: "The Gaza Strip: the last registry figures read are for 2021 and 2022",
          plain:
            "The Ministry of Health in Gaza reported, in a release dated 5 February 2023, a cancer incidence of 91.3 per 100,000 people in 2021 and expected about 2,000 new cases in 2023. In its statement relayed by the WAFA news agency on 4 February 2026 the Palestinian Ministry of Health said there was no available data on new cancers in Gaza.",
          detail:
            "The release, in English on the website of the Ministry of Health in Gaza, is titled 'Press release issued by the Ministry of Health on World Cancer Day' and dated 5 February 2023. It is cited here for its registry figures only and is not linked (see the gaps). It gave an incidence of 91.3 per 100,000 in 2021, up from 89 six years earlier; cancer as 12.5% of all deaths in 2021; breast cancer as 18.6% of all cancers and 34.3% of cancers in females; colon cancer as the commonest in males at 14.5%; 72% of cases in people over 45 and 6.4% in children under 18; and leukaemia as nearly half of childhood tumours. WHO wrote on 10 November 2023 that 122 children in the Gaza Strip were diagnosed with cancer in 2022, mainly leukaemia. WHO's situation updates for August and September 2026 still carried, in a summary panel that names the Ministry as a source, the line '>2000 People diagnosed with cancer each year, including 122 children'; the 122 matches WHO's figure for 2022, so OnCo reads the line as a figure from before October 2023, not a count of recent diagnoses. A review of clinical records found 524 women diagnosed with breast cancer in Gaza in 2017 and 2018: 6% at stage I, 35% at stage II, 33% at stage III and 19% at stage IV, with 86.6% alive two years after diagnosis. WHO's report on its work in 2025 says of the Gaza Strip that 'The health information system was severely compromised, undermining routine data collection'; OnCo found no registry count for Gaza for any year after 2022.",
          links: [
            { label: "WHO: children with cancer evacuated from Gaza for treatment to Egypt and Jordan (10 November 2023)", url: WHO_NOV_2023 },
            { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
            { label: "AlWaheidi et al., breast cancer in women in Gaza (JCO Global Oncology 2024)", url: ALWAHEIDI },
          ],
        },
      ],
      tables: [
        {
          id: "ps-west-bank-registry-2024",
          title: "What the West Bank cancer registry reported for 2024",
          caption: "New cancers and deaths in the West Bank in 2024, and the rate per 100,000 people where the Ministry of Health stated one. West Bank only.",
          columns: [
            { key: "measure", label: "Measure" },
            { key: "count", label: "Number", numeric: true },
            { key: "rate", label: "Per 100,000 people", numeric: true },
          ],
          rows: [
            { measure: "New cancers, all types", count: 3926, rate: 130 },
            { measure: "New cancers in males", count: 1969, rate: null },
            { measure: "New cancers in females", count: 1957, rate: null },
            { measure: "Breast cancer", count: 584, rate: 19.5 },
            { measure: "Colorectal cancer", count: 554, rate: 18.5 },
            { measure: "Lung and bronchial cancer", count: 316, rate: 10.5 },
            { measure: "New cancers in children under 15", count: 149, rate: null },
            { measure: "Deaths from cancer", count: 1639, rate: null },
            { measure: "New cancers, all types, in 2023 (for comparison)", count: 3590, rate: null },
          ],
          note: "These are the Palestinian Ministry of Health's figures for the West Bank, from its World Cancer Day statement as relayed by WAFA on 4 February 2026. The statement does not say whether the rates are age-standardised, and it gives no figures for the Gaza Strip, for which the Ministry said no data on new cancers was available. A blank cell means the statement gave no rate. OnCo could not read the Ministry's annual health report directly.",
          sources: [{ label: "Palestinian Ministry of Health, World Cancer Day statement as relayed by the WAFA news agency on 4 February 2026 (registry counts only; why the relay is not linked)", url: MINISTRY_GAP }],
        },
      ],
    },
    {
      id: "gaza-strip",
      nav: "Gaza Strip",
      title: "Cancer care in the Gaza Strip: what WHO and OCHA reported, and when",
      aside: { label: "WHO EMRO: emergency situation reports, occupied Palestinian territory", url: WHO_SITREPS },
      cards: [
        {
          id: "gaza-cancer-hospital",
          title: "OCHA, 25 March 2025: the specialised cancer hospital, non-operational since November 2023, was destroyed on 21 March 2025",
          plain:
            "OCHA wrote on 1 November 2023 that the Turkish-Palestinian Friendship Hospital in Gaza city had reportedly run out of fuel and stopped most of its activities, and on 25 March 2025 that the hospital, which it called the only specialised cancer hospital in Gaza, was destroyed on 21 March 2025. OnCo has read no later UN or WHO report of services there. WHO's 2026 updates report cancer treatment at another hospital; see the next card.",
          detail:
            "OCHA's Flash Update 26 reported that on 1 November 2023 the Turkish-Palestinian Friendship hospital in Gaza city 'reportedly ran out of fuel and was forced to stop most of its activities, rendering 70 cancer patients at serious life risk'. WHO wrote on 10 November 2023 that the two specialised hospitals offering care to cancer patients in the Gaza Strip, including children, had been overwhelmed and undersupplied, that one had been forced to close and that the second remained partially operational. OCHA's Humanitarian Situation Update 275, dated 25 March 2025, reported that the hospital was destroyed on 21 March 2025 and that it had become non-operational in November 2023 after running out of fuel and sustaining significant damage. OCHA's update says who carried out the destruction; this page gives the event and its date as OCHA reported them and does not attribute responsibility for any act to any party. OnCo has read no dated UN or WHO statement on where children's cancer care in the Gaza Strip has been given since November 2023. For the referral steps WHO sets out in its summary to 31 October 2026, see the card on treatment outside Gaza.",
          links: [
            { label: "OCHA: Hostilities in the Gaza Strip and Israel, Flash Update 26 (1 November 2023)", url: OCHA_FLASH_26 },
            { label: "OCHA: Humanitarian Situation Update 275, Gaza Strip (25 March 2025)", url: OCHA_HSU_275 },
            { label: "WHO: children with cancer evacuated from Gaza for treatment to Egypt and Jordan (10 November 2023)", url: WHO_NOV_2023 },
          ],
        },
        {
          id: "gaza-oncology-2026",
          title: "WHO: chemotherapy resumed at Al-Shifa in April 2026; cancer services described as constrained in its updates for June, August and September 2026",
          plain:
            "WHO reported that the Ministry of Health resumed cancer services, including chemotherapy, at Al-Shifa Medical Complex in Gaza City in April 2026. In June 2026 WHO called those services partial and short of cancer medicines, supplies and diagnostic tests, and its update for September 2026 said limited specialised services and referral pathways continued to restrict access to advanced diagnosis and treatment for cancer in Gaza.",
          detail:
            "The sequence in WHO's situation updates: for October 2025, Al-Ahli Arab Hospital was expected to return gradually to its earlier role, focusing on oncology and other specialised care. For April 2026, the Ministry of Health had resumed oncology services, including chemotherapy, at the WHO-supported Al-Shifa Medical Complex. For May 2026, those services included day-care chemotherapy and inpatient care. For June 2026, oncology services there had partially resumed and remained constrained by shortages of oncology medicines, consumables and diagnostic capacity. For August 2026, specialised cardiology, oncology and histopathology services across Gaza remained constrained by shortages of specialised supplies and staff, and WHO had supplied anticancer medicines. For September 2026, limited specialised services and referral pathways continued to restrict access to advanced diagnosis and treatment for cancer; all 36 hospitals had sustained damage and half remained partially functional; and WHO again supplied anticancer medicines. Nothing newer than 30 September 2026 was read, and none of this says what a given hospital offers today. For the referral steps WHO sets out in its summary to 31 October 2026, see the card on treatment outside Gaza.",
          links: [
            { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
            { label: "WHO: oPt emergency situation update, issue 72 (to 31 August 2026, PDF)", url: WHO_SITREP_72 },
            { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
            { label: "WHO: oPt emergency situation update, issue 70 (to 31 May 2026, PDF)", url: WHO_SITREP_70 },
            { label: "WHO: oPt emergency situation update, issue 69 (to 30 April 2026, PDF)", url: WHO_SITREP_69 },
            { label: "WHO: oPt emergency situation update, issue 66 (to 31 October 2025, PDF)", url: WHO_SITREP_66 },
          ],
        },
        {
          id: "gaza-cancer-medicines",
          title: "Cancer medicines: the Ministry's stock reports, as WHO relayed them from October 2025 to September 2026",
          plain:
            "WHO's updates relay the Ministry of Health's monthly stock reports for Gaza. In April 2026 the Ministry reported 47% of essential medicines out of stock, with chemotherapy and blood disease treatment among the services affected. WHO reported supplying anticancer medicines in its updates for August and September 2026. The reported figures change from month to month, and none of them says what a given hospital holds today.",
          detail:
            "For October 2025 WHO relayed the Ministry's report that 55% of essential medicines and 66% of consumables were at zero stock, and that of 622 essential medicines 343 had less than a month's supply, affecting chemotherapy and blood diseases (74%) among other services. WHO's report on 2025 says that by December 2025, according to the Ministry, 51% of essential medicines were out of stock, disrupting chemotherapy and treatment for blood diseases (66%) among others. For April 2026 the Ministry reported 47% of essential medicines out of stock, including for chemotherapy and blood disease treatment (52%). The 47% figure is repeated in WHO's updates for August and September 2026 without a breakdown by service. WHO reported supplying anticancer medicines in its updates for August and September 2026, and reported in its update for September 2026 that of 72 requests submitted through the UN mechanism for humanitarian shipments into Gaza, 37 were approved, 17 were pending and 18 were rejected. The bracketed percentages are WHO's; the text does not define them further, so they are quoted as given.",
          links: [
            { label: "WHO: oPt emergency situation update, issue 66 (to 31 October 2025, PDF)", url: WHO_SITREP_66 },
            { label: "WHO: WHO's response in the occupied Palestinian territory, January to December 2025 (PDF)", url: WHO_RESPONSE_2025 },
            { label: "WHO: oPt emergency situation update, issue 69 (to 30 April 2026, PDF)", url: WHO_SITREP_69 },
            { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
          ],
        },
        {
          id: "gaza-radiotherapy",
          title: "Radiotherapy: WHO wrote in February 2022 that it was not available in the Gaza Strip",
          plain:
            "WHO wrote on 15 February 2022 that neither radiotherapy nor PET scanning was available in the Gaza Strip, and described a child referred for them to Augusta Victoria Hospital in East Jerusalem. The IAEA's directory of radiotherapy centres, read on 16 November 2026, lists no centre in the Gaza Strip. WHO's summary to 31 October 2026 counts oncology as the second commonest medical need among patients evacuated from Gaza since 7 May 2024; see the card on treatment outside Gaza.",
          detail:
            "The WHO page of 15 February 2022 describes a child referred to Augusta Victoria Hospital for a PET scan and possible radiotherapy because neither was available in the Gaza Strip. WHO's monthly report for July 2023 shows the route then in use: there were 1,851 permit applications that month for patients from the Gaza Strip to cross to hospitals outside, 36% of them for oncology and 25% for appointments at Augusta Victoria Hospital. A review of 524 women diagnosed with breast cancer in Gaza in 2017 and 2018 found that 39% received radiotherapy. The IAEA DIRAC facility report, read on 16 November 2026, lists two radiotherapy centres under the code PSE, in Nablus and Ramallah in the West Bank, and none in the Gaza Strip; the IAEA's country list of 155 entries has no entry for the territory at all. WHO's report on 2019 to 2021 says restrictions on the entry of medical supplies to Gaza had affected nuclear medicine technology among other items. OnCo found no UN or WHO statement dated after October 2023 that says radiotherapy has become available in the Gaza Strip. For the referral steps WHO sets out in its summary to 31 October 2026, see the card on treatment outside Gaza.",
          links: [
            { label: "WHO EMRO: Zaina, 10, unable to access cancer treatment since February (15 February 2022)", url: WHO_FEB_2022 },
            { label: "WHO: monthly report on health access, July 2023 (published 23 August 2023, PDF)", url: WHO_ACCESS_JUL_2023 },
            { label: "IAEA DIRAC: facility report (JSON, read 16 November 2026)", url: DIRAC_FACILITIES },
            { label: "IAEA DIRAC: countries", url: DIRAC },
            { label: "AlWaheidi et al., breast cancer in women in Gaza (JCO Global Oncology 2024)", url: ALWAHEIDI },
            { label: "WHO: Right to health, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
          ],
        },
        {
          id: "gaza-evacuation",
          title: "Treatment outside Gaza: 13,973 patients medically evacuated by 31 October 2026, cancer the second commonest reason",
          plain:
            "WHO counted 13,973 patients medically evacuated from Gaza between October 2023 and 31 October 2026, 6,463 of them children. Among patients evacuated since 7 May 2024, cancer was the second commonest medical need, after injuries. WHO's summary says the selection and priority of patients rests with the Ministry of Health and that WHO's role is the transfer. Most patients went to Egypt.",
          detail:
            "WHO's summary to 31 October 2026 counts 13,973 patients and 17,264 companions evacuated since October 2023: 10,382 patients up to 12 October 2025 and 3,591 between 13 October 2025 and 31 October 2026. Of patients evacuated since 7 May 2024, the leading needs were trauma (1,739), oncology (1,583), cardiovascular disease (805), ophthalmology (512) and congenital anomalies (435). Destinations since October 2023 were Egypt (9,119), the United Arab Emirates (1,518), Qatar (970), Jordan (812), European Union countries (641) and Turkey (459), among others. The summary sets out the steps: a doctor in Gaza issues a referral form, the patient submits it at the treating public hospital, the Referral Committee decides priority, and WHO says it is not involved in selecting patients, which rests with the Ministry of Health. WHO's summary to 26 January 2026 said over 18,500 patients needed treatment not available in Gaza and that one patient, the first since October 2023, had travelled to the West Bank. WHO's update for September 2026 said the Rafah Crossing operated three times a week and movements through Kerem Shalom were one to three a month. WHO wrote that before October 2023 between 50 and 100 patients left Gaza daily for treatment, and the requests WHO lists in its summary to 31 October 2026 include reopening patient referral to health facilities in the West Bank, including East Jerusalem.",
          links: [
            { label: "WHO: medical evacuation of patients from Gaza, October 2023 to 31 October 2026 (PDF)", url: WHO_MEDEVAC_OCT_2026 },
            { label: "WHO: medical evacuation of patients from Gaza, October 2023 to 26 January 2026 (PDF)", url: WHO_MEDEVAC_JAN_2026 },
            { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
          ],
        },
      ],
    },
    {
      id: "west-bank",
      nav: "West Bank",
      title: "Cancer care in the West Bank and the East Jerusalem hospitals",
      aside: { label: "WHO: West Bank health access, January to October 2026 (PDF)", url: WHO_WB_ACCESS_2026 },
      cards: [
        {
          id: "wb-radiotherapy",
          title: "Radiotherapy: centres in Nablus and Ramallah in the IAEA's 2026 listing, and Augusta Victoria Hospital in East Jerusalem",
          plain:
            "The IAEA's directory, read on 16 November 2026 with entries updated in 2026, lists two radiotherapy centres in the West Bank: the An-Najah Cancer Center in Nablus with two linear accelerators, and the Istishari Cancer Center in Ramallah with one. It lists Augusta Victoria Hospital in Jerusalem with three. A directory entry says what is installed, not what is running this week.",
          detail:
            "The IAEA DIRAC facility report lists, under the code PSE, An-Najah National University Hospital's An-Najah Cancer Center in Nablus with two linear accelerators and one brachytherapy unit, and the Istishari Cancer Center in Ramallah with one linear accelerator; both entries carry a last update of 2026. It lists Augusta Victoria Hospital, Jerusalem, among the centres it files under Israel, with three linear accelerators and one CT scanner, also updated in 2026. The IAEA's separate country list, which gives totals for 155 entries, has no entry for this territory, so there is no IAEA total for the whole entry to quote. WHO's Palestinian Voices report (2023) calls Augusta Victoria Hospital the major Palestinian cancer centre and describes a patient who in 2022 was referred to An-Najah University Hospital in Nablus for chemotherapy because that did not require a permit. In WHO's figures for January to October 2026, Augusta Victoria Hospital received 22% of West Bank patients' permit applications. OnCo found no WHO or IAEA text giving the dates the two West Bank centres began treating patients. WHO's summary for January to October 2026 says patients from the West Bank need permits to reach the hospitals in East Jerusalem; see the next card.",
          links: [
            { label: "IAEA DIRAC: facility report (JSON, read 16 November 2026)", url: DIRAC_FACILITIES },
            { label: "IAEA DIRAC: country list (JSON, read 16 November 2026)", url: DIRAC_COUNTRIES },
            { label: "WHO: Palestinian Voices 2022 to 2023 (published 2023, PDF)", url: WHO_VOICES },
            { label: "WHO: West Bank health access, January to October 2026 (PDF)", url: WHO_WB_ACCESS_2026 },
          ],
        },
        {
          id: "wb-permits",
          title: "Reaching East Jerusalem: 93,051 patient permit applications in January to October 2026, 24% pending or denied",
          plain:
            "WHO's summary for January to October 2026 says patients and companions from the West Bank need permits to reach the main hospitals in East Jerusalem and referral care in Israeli hospitals. Over that period it counted 93,051 patient applications, of which 24% were pending or denied, and 90,514 companion applications, of which 28% were.",
          detail:
            "WHO's summary for 1 January to 31 October 2026, using data reported by the Palestinian General Authority of Civil Affairs, counts 93,051 patient permit applications (14% for people over 60, 9% for children) and 90,514 for companions. The leading receiving hospitals were Makassed Hospital (42%), Augusta Victoria Hospital (22%) and St John eye hospital (15%), all in East Jerusalem, then Tel Hashomer (4%) and Hadassah Ein Karem (3%). WHO states that the 2026 approval rate for patients was slightly lower than in 2025 and remained significantly lower than before October 2023, and notes that some East Jerusalem hospitals now submit applications directly, which its data do not capture. For comparison, WHO's monthly report for July 2023 gave an approval rate of 75% for West Bank patient applications. The summary does not break applications down by specialty, so it gives no figure for cancer patients alone. WHO's report on 2019 to 2021 found that 95% of Ministry referrals for West Bank patients were to facilities within the West Bank including East Jerusalem, 40% to East Jerusalem specifically.",
          links: [
            { label: "WHO: West Bank health access, January to October 2026 (PDF)", url: WHO_WB_ACCESS_2026 },
            { label: "WHO: monthly report on health access, July 2023 (published 23 August 2023, PDF)", url: WHO_ACCESS_JUL_2023 },
            { label: "WHO: Right to health, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
            { label: "WHO EMRO: monthly reports on health access (index; the last monthly report listed is July 2023)", url: WHO_ACCESS_INDEX },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays for cancer care",
      aside: { label: "World Bank: out-of-pocket expenditure, West Bank and Gaza", url: WB_OOP },
      cards: [
        {
          id: "out-of-pocket",
          title: "Households paid 42% of health spending out of pocket in 2023",
          plain:
            "The World Bank's series puts out-of-pocket payments at 42.1% of health spending in 2023, up from 33.6% in 2022. Government paid 41.4%. Health spending was about 346 US dollars a person. These are single figures for the West Bank and Gaza together and stop at 2023.",
          detail:
            "The World Bank's indicators for the entry it calls West Bank and Gaza give out-of-pocket spending as 38.7% of current health expenditure in 2019, 38.4% in 2020, 33.4% in 2021, 33.6% in 2022 and 42.1% in 2023, the latest year. Domestic general government health expenditure was 41.4% of the total in 2023 (40.3% in 2022). Current health expenditure was 346 US dollars per person in 2023 (351 in 2022, 317 in 2019), or 10.7% of gross domestic product. The series gives no separate figures for the Gaza Strip and the West Bank, and nothing for 2024 or later. WHO's report on 2019 to 2021 gives domestic general government health expenditure of 158 US dollars per person for 2021 and describes four main providers of health services: the Ministry of Health, UNRWA, non-governmental organisations and for-profit providers, with the Ministry providing most services.",
          links: [
            { label: "World Bank: out-of-pocket expenditure (% of current health expenditure)", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure (% of current health expenditure)", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita (current US$)", url: WB_CHE },
            { label: "World Bank: current health expenditure (% of GDP)", url: WB_GDP },
            { label: "WHO: Right to health, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
          ],
        },
        {
          id: "referral-system",
          title: "WHO's report on 2019 to 2021: the Ministry of Health paid for care it could not give, and cancer was the commonest reason",
          plain:
            "WHO's report on 2019 to 2021 describes how the Ministry of Health refers patients to other hospitals when it cannot provide a service, and pays an agreed share of the cost under the public health insurance rules. Cancer care was the commonest reason, at 26% of referrals. In 2021 referrals took 37.5% of the Ministry's spending.",
          detail:
            "According to WHO's report, a patient must first be seen in a Ministry of Health facility and can then be referred to the medical and financial committees of the Services Purchasing Unit if the service is not available in Ministry hospitals for lack of staff, medicines, equipment or beds, or if a non-emergency waiting list exceeds six months. The rules are those of Cabinet Decision 11 of 2006 on health insurance and outside medical referral; once approved, the report says, there is a commitment to pay an established percentage of the total treatment cost. In 2021 referrals were 37.5% of Ministry spending, salaries 37.2% and medicines and supplies 19.4%. Oncology was 26% of all referrals in 2019 to 2021, ahead of cardiac catheterisation (9%) and urology and nephrology (7%). In July 2023, the last month for which WHO published a monthly report, the Ministry issued 9,698 referrals (7,191 from the West Bank and 2,402 from the Gaza Strip): 48% to hospitals in the West Bank outside East Jerusalem, 37% to East Jerusalem hospitals, 7% within the Gaza Strip, 7% to Israeli hospitals and 2% to Egypt, with oncology again the leading specialty at 26%. OnCo has not read the insurance rules themselves, or what share a patient pays. The first step WHO's report names is being seen by a medical professional in a Ministry of Health facility.",
          links: [
            { label: "WHO: Right to health, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
            { label: "WHO: monthly report on health access, July 2023 (published 23 August 2023, PDF)", url: WHO_ACCESS_JUL_2023 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Medicines: who regulates and who supplies them",
      aside: { label: "WHO: regulators at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
      cards: [
        {
          id: "medicines-regulation",
          title: "How cancer medicines are approved: not established from a source OnCo could read",
          plain:
            "OnCo could not read a primary source on how medicines are registered for the West Bank or the Gaza Strip: the Ministry of Health's pharmacy website did not respond on 16 November 2026. WHO's August 2026 list of regulators assessed at its two higher maturity levels has no entry for the territory. What follows is what WHO's reports say about supply.",
          detail:
            "WHO's list of national regulatory authorities operating at maturity level 3 and 4, dated August 2026, contains no authority for this territory; that says the regulator has not been listed at those levels, not that medicines are unregulated. WHO's report on 2019 to 2021 describes the Ministry of Health's Central Drugs Stores, one for the West Bank and one for the Gaza Strip, each working from a list of essential medicines (530 items in the West Bank and 516 in Gaza in the report's chart). Over those three years the West Bank store had on average 90% of essential medicines available and the Gaza store 55%, where available means more than a month's supply. For how the Ministry referred patients to other hospitals in those years, see the card on referrals. OnCo found no source it could read on which cancer medicines are on the essential list, on how a new medicine is registered, or on how the two areas' procedures differ.",
          links: [
            { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML },
            { label: "WHO: Right to health, 2019 to 2021 (published 2023, PDF)", url: WHO_RTH },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Finding cancer early, and vaccines",
      aside: { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening: WHO reported a diagnostic centre handed over in Hebron governorate in June 2026; UNRWA mammography referrals in Gaza to 2022",
          plain:
            "OnCo found no source describing an organised screening programme with invitations and coverage figures. What the sources report: WHO's update for June 2026 said the Dura Hospital Early Diagnostic Centre in Hebron governorate in the West Bank was handed over on 15 June 2026, adding mammography and clinical breast examination. For Gaza, UNRWA reported that it sent 79,678 refugee women for mammography between 2016 and 2022 and that 544 breast cancers were confirmed.",
          detail:
            "WHO's situation update for June 2026 reports, for the West Bank, the handover of the Dura Hospital Early Diagnostic Centre on 15 June 2026, which it says expands access to mammography and clinical breast examination in Hebron governorate; that one radiologist and one oncology nurse completed training at the King Hussein Cancer Center in Jordan with WHO support; and an agreement to train 16 radiology technicians and 20 radiologists or general physicians in mammography and breast image interpretation. UNRWA's Department of Health report for 2022 says, of Gaza, that the absence of a national screening programme for breast cancer and the cost of mammograms led its Gaza health programme to start mammography referrals in 2016, and that by the end of 2022 a total of 79,678 women had been sent for screening and 544 breast cancers confirmed; those are figures to 2022. In a review of women diagnosed in Gaza in 2017 and 2018, 52% were at stage III or IV at diagnosis. OnCo found no source on cervical or bowel cancer screening in either area.",
          links: [
            { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
            { label: "UNRWA: Department of Health annual report 2022 (published May 2023, PDF, through the UN's UNISPAL)", url: UNRWA_2022 },
            { label: "AlWaheidi et al., breast cancer in women in Gaza (JCO Global Oncology 2024)", url: ALWAHEIDI },
          ],
        },
        {
          id: "vaccines",
          title: "Vaccines: no HPV programme figures in WHO's data; hepatitis B coverage estimated at 99% in 2025",
          plain:
            "WHO's immunisation database holds no HPV vaccination coverage rows for this territory, and no rows in its table of vaccine introductions, so OnCo cannot say whether an HPV programme exists. For hepatitis B vaccine, which protects against a cause of liver cancer, WHO and UNICEF estimate that 99% of infants received the third dose in 2025.",
          detail:
            "WHO's immunisation data API, read on 16 November 2026, files this territory under the code PSE with WHO's label 'occupied Palestinian territory, including east Jerusalem'. It returned no rows for HPV programme coverage and no rows at all for the territory in the vaccine introduction table, so the absence of HPV figures may reflect what is reported to WHO, not what is given. For the third dose of hepatitis B vaccine, the WHO and UNICEF estimate is 99% in 2019, 98% in 2020, 95% in 2021, 99% in 2022, 91% in 2023, 99% in 2024 and 99% in 2025. These are single estimates for the whole territory; the API gives no separate figure for the Gaza Strip, and the administrative figure reported for 2024 is above 100% (105.84%), which can happen when the population denominator is uncertain. IARC estimates 71 cervical cancers and 93 liver cancers in 2024.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for PSE (JSON)", url: WIISE_HPV },
            { label: "WHO immunisation data: vaccine introduction rows for PSE (JSON)", url: WIISE_INTRO },
            { label: "WHO immunisation data: hepatitis B third dose coverage for PSE, 2019 onward (JSON)", url: WIISE_HEPB3 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Gaza Strip and West Bank (PDF)", url: GCO_FACT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What is being done",
      title: "What is being done: supplies, training and children's cancer care",
      cards: [
        {
          id: "who-support",
          title: "WHO's work on cancer care in 2026: medicines for Gaza, training and diagnosis in the West Bank",
          plain:
            "In its 2026 updates WHO reports supplying anticancer medicines to Gaza, supporting the hospital where chemotherapy resumed, and, in the West Bank, the handover of a breast diagnostic centre and support for cancer staff to train in Jordan. OnCo could not find a cancer plan to read; what follows is what WHO's updates report.",
          detail:
            "WHO's situation updates report: oncology commodities among the supplies it mobilised for Gaza in June 2026; anticancer medicines supplied in the periods covered by the August and September 2026 updates; and support to Al-Shifa Medical Complex, where the Ministry of Health resumed chemotherapy in April 2026. For the West Bank, the June 2026 update reports the Dura Hospital Early Diagnostic Centre, training at the King Hussein Cancer Center, a mammography training agreement, and work with the Ministry on unified national guidelines for noncommunicable diseases. WHO appealed for 333.2 million US dollars for its 2026 work in the territory and reported a funding gap of 63% in September 2026. On a cancer plan: OnCo found no plan document from the Ministry of Health or WHO that it could read, and the Ministry's website did not respond; this is a gap in what could be read, not evidence that no plan exists.",
          links: [
            { label: "WHO: oPt emergency situation update, issue 73 (to 30 September 2026, PDF)", url: WHO_SITREP_73 },
            { label: "WHO: oPt emergency situation update, issue 72 (to 31 August 2026, PDF)", url: WHO_SITREP_72 },
            { label: "WHO: oPt emergency situation update, issue 71 (to 30 June 2026, PDF)", url: WHO_SITREP_71 },
            { label: "WHO: oPt emergency situation update, issue 69 (to 30 April 2026, PDF)", url: WHO_SITREP_69 },
          ],
        },
        {
          id: "children",
          title: "Children with cancer: evacuations coordinated by WHO and St. Jude from November 2023",
          plain:
            "WHO reported on 10 November 2023 that 12 children with cancer or blood disorders had been evacuated from the Gaza Strip to Egypt and Jordan with their companions, in an effort coordinated with St. Jude Children's Research Hospital. WHO said 122 children in Gaza were diagnosed with cancer in 2022, mainly leukaemia, and that they had received part of their care outside Gaza even before then.",
          detail:
            "WHO's release of 10 November 2023 says the children received only a portion of their cancer care within Gaza for lack of some services, and were referred to hospitals in the West Bank including East Jerusalem, Egypt, Israel and Jordan. It adds that before October 2023 about 100 patients a day were referred for treatment outside Gaza, about one in four of them children and one in three needing cancer care. A WHO article of 15 June 2023 describes an assessment in 2021 and 2022, by the Palestinian National Institute of Public Health with the Ministry of Health and WHO, of barriers to children's cancer services in Gaza, including shortages of cancer and palliative medicines. The published study reports that in 2021 referral data 25% of children with cancer waited more than a month for a permit and 8% died while waiting. WHO's evacuation summary to 31 October 2026 counts 6,463 children among all patients evacuated but does not say how many of them had cancer. For the West Bank, the Palestinian Ministry of Health's statement relayed by the WAFA news agency on 4 February 2026 gave 149 new cancers in children under 15 in 2024.",
          links: [
            { label: "WHO: children with cancer evacuated from Gaza for treatment to Egypt and Jordan (10 November 2023)", url: WHO_NOV_2023 },
            { label: "WHO Knowledge Action Portal: delivering childhood cancer care in fragile and conflict settings (15 June 2023)", url: WHO_KAP_2023 },
            { label: "Massad et al., access to care for children with cancer in the Gaza Strip (BMJ Global Health 2026)", url: MASSAD },
            { label: "WHO: medical evacuation of patients from Gaza, October 2023 to 31 October 2026 (PDF)", url: WHO_MEDEVAC_OCT_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Trials and research",
      cards: [
        {
          id: "trials-research",
          title: "Trials: the count is not available from OnCo's records",
          plain:
            "OnCo's records cannot say how many cancer trials have a site in the Gaza Strip or the West Bank: the way OnCo matches trial sites to countries has no entry for this territory, so its count of zero is an artefact, not a finding. Search ClinicalTrials.gov directly. The published research OnCo read is mostly about access to care.",
          detail:
            "OnCo holds a selection of trials, not the whole registry, and maps each trial's listed sites to a country; that mapping has no entry for this territory, so no trial can be matched to it and the zero in the summary line of this page should not be read as no trials. Research read for this page: a cohort study, which WHO's 2023 report cites as WHO research, matching 17,072 permit applications for 3,816 cancer patients from Gaza referred for chemotherapy or radiotherapy between 2008 and 2017, which found higher mortality among those whose first application in 2015 to 2017 was not approved (hazard ratio 1.45, 95% CI 1.19 to 1.78) and no significant difference for first applications in 2008 to 2014; the review of breast cancer in Gaza in 2017 and 2018; the 2021 to 2022 study of children's access; a death-certificate study of the West Bank for 1999 to 2009; and a review of 480 Palestinian patients treated at the King Hussein Cancer Center in Jordan in 2018 and 2019, about 36% of whom had metastatic disease when first seen there.",
          links: [
            { label: "ClinicalTrials.gov: search cancer trials by location", url: CTGOV },
            { label: "Bouquet et al., survival of cancer patients requiring permits to exit the Gaza Strip, 2008 to 2017 (PLoS One 2021)", url: BOUQUET },
            { label: "Mansour et al., Palestinian patients with cancer at King Hussein Cancer Center (Frontiers in Oncology 2022)", url: MANSOUR },
            { label: "Abu-Rmeileh et al., cancer mortality in the West Bank (BMC Public Health 2016)", url: ABU_RMEILEH },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "ministry-sources",
      title: "The Ministry of Health's own publications could not be read",
      plain:
        "OnCo could not reach the Palestinian Ministry of Health's websites on 16 November 2026, so its annual health report, its cancer registry tables and its pharmacy pages were not read. The West Bank registry figures on this page come from the Ministry's statement as relayed by the WAFA news agency on 4 February 2026, and the Gaza figures for 2021 from a release of the Ministry of Health in Gaza dated 5 February 2023. Neither is linked from this page.",
      detail:
        "Requests to site.moh.ps and pharmacy.moh.ps timed out without a response on 16 November 2026; no archived copy was sought for a specific report because OnCo did not have its address. The West Bank figures for 2024 are therefore taken from the WAFA news agency's relay of the Ministry's World Cancer Day statement (4 February 2026), and the Gaza figures for 2021 from the English release on the website of the Ministry of Health in Gaza dated 5 February 2023. Both are used for registry counts only. OnCo found none of these counts in a UN or WHO document or a peer-reviewed paper it read, so the two relays are kept, named and dated in each sentence that uses them. Neither page is linked: each carries other content, including statements about responsibility, that this page does not use and does not repeat. The WAFA article is titled 'Palestinian Health Ministry reports rise in new cancer cases in the West Bank'; the release is titled 'Press release issued by the Ministry of Health on World Cancer Day'. Not found: cancer counts by governorate, stage at diagnosis, survival, or any Gaza registry figure after 2022.",
      links: [
        { label: "WHO EMRO: Palestinian National Institute of Public Health (undated page; describes the registries WHO supports)", url: WHO_PNIPH },
      ],
    },
    {
      id: "services-now",
      title: "What is open today is not on this page",
      plain:
        "The newest WHO situation update read covers the period to 30 September 2026 and the newest evacuation and access summaries cover the period to 31 October 2026. Nothing here says which hospital, machine or medicine is available on the day you read it. WHO's summary to 31 October 2026 says a request for treatment outside Gaza starts with a doctor in Gaza issuing a referral form, which the patient submits through the patient services desk at the treating public hospital.",
      detail:
        "Not found in any UN or WHO source read: a current list of hospitals giving chemotherapy in the Gaza Strip; where children's cancer care is given there; whether Al-Ahli Arab Hospital returned to oncology as WHO's October 2025 update expected; any statement after October 2023 on radiotherapy in Gaza; the dates the radiotherapy centres in Nablus and Ramallah began treating patients, and whether they are working at full capacity; which cancer medicines are in stock in the West Bank; and how many of the patients waiting for evacuation have cancer. ReliefWeb's page of health reports for the territory returned an empty response to a script on 16 November 2026, so documents hosted only there, including any Health Cluster bulletin, were not read. The UICC member directory refused a script on the same day, so the directory entries cited by the linked records for the hospitals in Ramallah and Jerusalem were not re-read.",
      links: [
        { label: "WHO EMRO: emergency situation reports, occupied Palestinian territory", url: WHO_SITREPS },
        { label: "WHO EMRO: occupied Palestinian territory", url: WHO_OPT },
      ],
    },
    {
      id: "plan-regulator-screening",
      title: "No readable source on a cancer plan, medicine registration, or organised screening",
      plain:
        "OnCo found no cancer plan it could read, no primary source on how cancer medicines are registered or which are on the essential list, and no source describing organised screening for breast, cervical or bowel cancer. WHO's 2020 cancer country profile does not exist for this territory at the address used for other countries.",
      detail:
        "WHO's 2020 cancer country profile returned not found at the address pattern used for other countries (pse-2020.pdf), and the Internet Archive holds no copy at that address. WHO's vaccine introduction table has no rows for the territory, so HPV vaccination status is not established. WHO's page on noncommunicable diseases for the territory, which is undated, mentions an early detection and screening programme in the West Bank without saying that it covers cancer, so it is not used here. Two WHO infographics on health access in 2022 and on Gaza are image-only PDFs with no text layer and were not read. The annual approval rates in the chart of WHO's West Bank access summary could not be matched to years unambiguously from the text layer, so only the rate for January to October 2026 is quoted.",
      links: [
        { label: "WHO immunisation data: vaccine introduction rows for PSE (JSON)", url: WIISE_INTRO },
        { label: "WHO EMRO: noncommunicable diseases, occupied Palestinian territory (undated page)", url: "https://www.emro.who.int/opt/priority-areas/noncommunicable-diseases.html" },
        { label: "WHO: West Bank health access, January to October 2026 (PDF)", url: WHO_WB_ACCESS_2026 },
      ],
    },
    {
      id: "one-figure-two-areas",
      title: "Most international figures are one number for two areas",
      plain:
        "IARC, the World Bank and WHO's immunisation estimates each give one figure for the Gaza Strip and West Bank together. None separates the two, and IARC's fact sheet names no data from this territory, so its modelled figures cannot show change in Gaza since October 2023. The IAEA's country list has no entry for the territory, and OnCo's trial records cannot be matched to it.",
      detail:
        "IARC's 2024 estimate is modelled from neighbouring countries' data and from survival ratios, with no input from this territory's registries named on the fact sheet. The World Bank's health spending series ends in 2023. The IAEA DIRAC country list of 155 entries has no entry for the territory, although its facility report lists two West Bank centres under the code PSE and Augusta Victoria Hospital among the centres filed under Israel. OnCo's mapping of trial sites to countries has no entry for the territory. UNRWA's most recent Department of Health annual report was not located at an address OnCo could fetch, so the 2022 edition is used and its figures are dated as such.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Gaza Strip and West Bank (PDF)", url: GCO_FACT },
        { label: "IAEA DIRAC: countries", url: DIRAC },
        { label: "World Bank: out-of-pocket expenditure (% of current health expenditure)", url: WB_OOP },
      ],
    },
  ],
  institutions: [
    "palestinian-ministry-of-health", "al-shifa-medical-complex", "turkish-palestinian-friendship-hospital", "augusta-victoria-hospital",
    "an-najah-national-university-hospital", "istishari-arab-hospital", "who", "iaea", "iarc", "khcc", "st-jude",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-bouquet-gaza-cancer-permits-survival-plos-one-2021", "paper-alwaheidi-breast-cancer-gaza-jco-go-2024",
    "paper-massad-children-cancer-gaza-access-bmjgh-2026", "paper-abu-rmeileh-cancer-mortality-west-bank-bmc-public-health-2016",
  ],
  people: [],
  how:
    "Every card was written from sources read in full as raw text on 16 November 2026, not through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's emergency situation updates, a series WHO titles for the 'occupied Palestinian territory', covering periods to dates from 31 October 2025 to 30 September 2026; WHO's medical evacuation and West Bank health access summaries to 31 October 2026; WHO's monthly health access report for July 2023, its reports on 2019 to 2021 and on its response in 2025, and its news pages; OCHA's updates of 1 November 2023 and 25 March 2025; UNRWA's health report for 2022; the IAEA's DIRAC data; WHO's immunisation data and its August 2026 list of regulators; the World Bank's indicators; and the papers' abstracts through Europe PMC. Statements about services come from UN and WHO sources and each carries its date. The two health ministries are cited for registry counts only, each named with its relay and date, and their pages are not linked. The page uses each source's own terms, attributes them, and does not attribute responsibility for any act to any party, including where a source does. The Gaza Strip and the West Bank are described separately wherever the sources allow. Trial counts are not available from OnCo's records for this territory. The records added for this page (the Ministry of Health, two Gaza hospitals and four papers) carry their own sources.",
  verify:
    "Services here have changed within months, and the newest reports read are weeks old. Nothing on this page says what is available on the day you read it. WHO's summary to 31 October 2026 says a request for treatment outside Gaza starts with a doctor in Gaza issuing a referral form, which the patient submits through the patient services desk at the treating public hospital. The incidence and death figures for the whole entry are IARC's model, not a count; the registry figures are the two ministries', for the West Bank in 2024 and for Gaza in 2021.",
  verifyLinks: [
    { label: "WHO EMRO: emergency situation reports, occupied Palestinian territory", url: WHO_SITREPS },
    { label: "WHO: medical evacuation of patients from Gaza, October 2023 to 31 October 2026 (PDF)", url: WHO_MEDEVAC_OCT_2026 },
    { label: "WHO: West Bank health access, January to October 2026 (PDF)", url: WHO_WB_ACCESS_2026 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Gaza Strip and West Bank (PDF)", url: GCO_FACT },
  ],
};
