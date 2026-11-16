import type { CountryDive } from "@/data/country-dive";

/**
 * Zambia deep dive: the hand-written cards for /countries/zm/ (wave 10). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Ministry of Health's National Cancer Control Strategic Plan
 * 2022 to 2026 (PDF text, ICCP portal), the African Cancer Registry Network's page for the Zambia National Cancer
 * Registry, the Zambia Medicines Regulatory Authority's own pages, its 2026 abridged registration guideline (a scanned
 * PDF read by optical character recognition), two of its notices and statements, the National Health Insurance
 * Management Authority's About, Benefit Package and FAQ pages, two press reports of the Cancer Diseases Hospital's
 * re-equipping (March 2024) and recommissioning (August 2026), WHO's HPV rows for Zambia from its public immunisation
 * data API, the World Bank's health expenditure series, IARC's GLOBOCAN 2024 fact sheet for Zambia, a ClinicalTrials.gov
 * search, and the papers' abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const NCCSP = "https://www.iccp-portal.org/system/files/plans/NATIONAL-CANCER-CONTROL-STRATEGIC-PLAN-2022-to-2026.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/894-zambia-fact-sheet.pdf";
const AFCRN_ZNCR = "https://afcrn.org/index.php/membership/membership-list/135-zambiacancerreigstry";
const LT_2024 = "https://www.lusakatimes.com/2024/03/23/ministry-of-health-secures-funding-for-cancer-diseases-hospital-rehabilitation-and-re-equipping";
const LT_2026 = "https://www.lusakatimes.com/2026/08/02/zambias-cancer-diseases-hospital-reopens-after-upgrade/";
const ZM_MONITOR_2026 = "https://www.zambiamonitor.com/president-hichilema-commissions-us31-million-facility-at-cancer-diseases-hospital/";
const NHIMA_ABOUT = "https://www.nhima.co.zm/about-us/";
const NHIMA_BENEFITS = "https://www.nhima.co.zm/benefit-package/";
const NHIMA_FAQ = "https://www.nhima.co.zm/elementor-1783/";
const WB_OOP = "https://api.worldbank.org/v2/country/ZMB/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_EXT = "https://api.worldbank.org/v2/country/ZMB/indicator/SH.XPD.EHEX.CH.ZS?format=json";
const ZAMRA_WHO = "https://www.zamra.co.zm/who-we-are/";
const ZAMRA_GUIDES = "https://www.zamra.co.zm/guidelines/";
const ZAMRA_CT = "https://www.zamra.co.zm/clinical-trials-regulation/";
const ZAMRA_MA_GUD_016 = "https://www.zamra.co.zm/wp-content/uploads/2026/10/MA_GUD_016_Guidelines-for-MA-of-Medcines-for-Human-Use-1.pdf";
const ZAMRA_JAKAVI = "https://www.zamra.co.zm/wp-content/uploads/2026/07/PUBLIC-NOTICE-WHO-Alert-No.-2.-Falsified-JAKAVI-ruxolitinib.pdf";
const ZAMRA_AMA = "https://www.zamra.co.zm/wp-content/uploads/2026/10/ZAMRA-AMA-APOINTMENTS-edited.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ZMB'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ANTIGEN%20eq%20'HPV'%20and%20ISO_3_CODE%20eq%20'ZMB'";
const CTGOV = "https://clinicaltrials.gov/search?country=Zambia&cond=cancer";

export const ZM_DIVE: CountryDive = {
  iso2: "ZM",
  iso3: "ZMB",
  name: "Zambia",
  flag: "🇿🇲",
  asOf: "2026-11-11",
  title: "Cancer in Zambia",
  description:
    "Cancer in Zambia from Zambian sources: IARC's estimate of 16,582 new cancers and 9,792 deaths in 2024, built on a subnational registry's rates, cervical cancer as 43% of cancers in women, one comprehensive cancer hospital whose radiotherapy, press reports say, was recommissioned in August 2026, compulsory national health insurance since 2018, the Zambia Medicines Regulatory Authority and its reliance routes, nurse-led screen-and-treat cervical screening in 278 clinics, and why no trial in our records has a site in Zambia.",
  lede:
    "Zambia's national cancer figures are IARC estimates built on the rates of a subnational registry, and the population-based registry the Ministry of Health describes counts Lusaka district: 16,582 new cancers and 9,792 deaths in 2024, two thirds of the cancers in women, and cervical cancer alone 28.5% of all new cancers. Treatment has been concentrated in one hospital in Lusaka, the Cancer Diseases Hospital, whose rebuilt radiotherapy section reopened in August 2026, according to press reports; at the reopening the President said centres in Ndola and Livingstone were being built.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Zambia is 16,582 new cancers and 9,792 deaths, an age-standardised incidence of 151.8 per 100,000 (128.5 in men, 177.6 in women), including 263 non-melanoma skin cancers. IARC's fact sheet gives its incidence source as a subnational registry and its method as subnational rates applied to the 2024 population; mortality is national incidence applied to model-based mortality-to-incidence ratios from survival data (Survcan). The fact sheet does not name the registry. The population-based registry described by the Ministry's plan and the African Cancer Registry Network is the Zambia National Cancer Registry's registration of every cancer diagnosed or treated in Lusaka district, about 1.7 million people at the 2010 census, so the national figure most likely follows Lusaka's rates, and rural provinces, where diagnosis is harder to reach, may differ. Registration is known to be incomplete: a 2023 study found only 51 of 222 confirmed oesophageal cancers at the University Teaching Hospital in the registry. The Ministry of Health's 2022 to 2026 plan quotes GLOBOCAN 2020 (13,831 cases, 8,672 deaths, 153.5 per 100,000); the age-standardised rate barely moved (153.5 to 151.8), so the rise to 16,582 mostly reflects a larger population. The registry's own published analysis, for 2007 to 2014, gave rates far above IARC's for cervical cancer, with denominators the abstract does not explain.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Zambia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Zambia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 16,600 new cancers a year, and cervical cancer alone more than a quarter of them",
          plain:
            "IARC estimates 16,582 new cancers in Zambia in 2024: 10,962 in women and 5,620 in men. Cervical cancer is 43% of cancers in women and the leading cause of cancer death. In men prostate cancer and Kaposi sarcoma, a cancer linked to HIV, lead. For every ten new cancers IARC estimates about six cancer deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 4,730 cervical cancers (2,769 deaths), 1,555 breast cancers (730 deaths), 1,378 Kaposi sarcomas (562 deaths), 1,341 prostate cancers (826 deaths), 729 colorectal cancers and 564 oesophageal cancers (495 deaths). In men the leading cancers are prostate (23.9% of male cancers), Kaposi sarcoma (915, 16.3%), colorectum, oesophagus and liver; in women cervix (43.1%), breast (14.2%), Kaposi sarcoma (463), vulva (432) and colorectum. The risk of a cancer before age 75 is 13.9% for men and 18.0% for women, and 35,408 people are estimated to be living within five years of a diagnosis. Deaths divided by new cases give 0.59. The Ministry of Health's 2022 to 2026 plan links the pattern to HIV, which it puts at 11.3% prevalence with about 780,900 women living with HIV, and notes squamous cancers of the conjunctiva, head and neck, vulva and penis in which HIV positivity runs from 20% to 99%. It estimates 1,400 childhood cancers a year, of which about 200 are seen at the Cancer Diseases Hospital, with survival estimated at less than 20%; retinoblastoma and nephroblastoma were the commonest there in 2018 to 2020.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Zambia (PDF)", url: IARC_FACTSHEET },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, situation analysis and table 2 (Ministry of Health, PDF)", url: NCCSP },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: one comprehensive cancer hospital, with radiotherapy back from August 2026",
          plain:
            "The Ministry of Health's plan describes the Cancer Diseases Hospital in Lusaka as the only facility offering comprehensive cancer treatment and radiotherapy, for adults and children alike. According to press reports, its radiotherapy was suspended in 2020 for rebuilding, patients were sent to India, and the President recommissioned it on 1 August 2026, saying cancer centres in Ndola and Livingstone were being built.",
          detail:
            "The 2022 to 2026 plan counted one linear accelerator, two cobalt-60 units and two high dose rate brachytherapy units, all at the Cancer Diseases Hospital, and a shortage of about 15 linear accelerators against a standard of one per million people; it estimated that only 25 to 31% of cancer patients accessed treatment. Chemotherapy is also given at the University Teaching Hospital and some mission and private hospitals. A Lusaka Times report of March 2024 says the Health Minister signed a contract with Siemens Healthineers for four linear accelerators, two brachytherapy units, two CT simulators, an MRI and a mammography unit, an overall project of about 30.8 million US dollars; it quotes her as saying equipment failures had left many patients without radiotherapy, and reports that eligible patients were being sent to India. Press reports of the 1 August 2026 commissioning describe a 31 million US dollar government-funded project, a backlog of 1,600 patients since services were suspended in 2020, capacity of up to 60 patients a day, and the Ndola Cancer Treatment Centre as 85% complete. The plan's workforce table counted 10 clinical and radiation oncologists against a need of 50, 2 paediatric oncologists against 20, 15 oncology nurses, 24 radiation therapists, 4 clinically qualified medical physicists and no oncology pharmacists.",
          links: [
            { label: "National Cancer Control Strategic Plan 2022 to 2026, situation analysis, table 3 and gap analysis (PDF)", url: NCCSP },
            { label: "Lusaka Times: Ministry of Health secures funding for Cancer Diseases Hospital rehabilitation and re-equipping (23 March 2024)", url: LT_2024 },
            { label: "Zambia Monitor: Hichilema commissions US$31 million facility at Cancer Diseases Hospital (2 August 2026)", url: ZM_MONITOR_2026 },
            { label: "Lusaka Times: Cancer Diseases Hospital reopens with upgrades (2 August 2026)", url: LT_2026 },
          ],
        },
      ],
      tables: [
        {
          id: "zm-registry",
          title: "What the Zambia National Cancer Registry's data show, beside IARC's estimates",
          caption: "Age-adjusted incidence per 100,000 as each source reports it. Registry data: 2007 to 2014, the latest period with a published analysis.",
          columns: [
            { key: "source", label: "Source" },
            { key: "period", label: "Years" },
            { key: "cervix", label: "Cervix", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "ks", label: "Kaposi sarcoma", numeric: true },
          ],
          rows: [
            { source: "Zambia National Cancer Registry data (Kalubula et al.)", period: "2007 to 2014", cervix: 186.3, prostate: 60.03, breast: 38.08, ks: 26.18 },
            { source: "IARC GLOBOCAN 2020, as quoted in the Ministry of Health's 2022 to 2026 plan", period: "2020", cervix: 65.5, prostate: null, breast: 20, ks: null },
            { source: "IARC GLOBOCAN 2024 fact sheet", period: "2024", cervix: 74.8, prostate: 50.3, breast: 24.5, ks: 8.7 },
          ],
          note: "The registry row is from one paper's abstract, which does not explain the population behind its rates; its cervical rate is more than twice IARC's, so read it as a sign of how much cervical cancer the registry records, not as a national rate. IARC's 2024 rates are for both sexes as the fact sheet charts them. The registry has not published an incidence report for recent years that OnCo could find; see the gaps.",
          sources: [
            { label: "Kalubula et al., epidemiology of cancers in Zambia (Malawi Med J 2021)", url: "https://doi.org/10.4314/mmj.v33i3.6" },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, table 1 and situation analysis (PDF)", url: NCCSP },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Zambia (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry that now counts Lusaka district",
      aside: { label: "African Cancer Registry Network: Zambia National Cancer Registry", url: AFCRN_ZNCR },
      cards: [
        {
          id: "registry-zncr",
          title: "A registry dating from 1977 that moved from collecting forms nationally to counting one district completely",
          plain:
            "The Zambia National Cancer Registry, based at the University Teaching Hospital in Lusaka, once collected notification forms from hospitals across the country. Since 2015 it has concentrated on recording every cancer diagnosed or treated in Lusaka district, the count IARC's subnational method most likely draws on, though IARC's fact sheet does not name the registry. The Ministry of Health is developing registries for Ndola and Livingstone.",
          detail:
            "The registry's African Cancer Registry Network page says the Medical Research Council set it up in November 1977 under the Ministry of Health and that it moved to the University Teaching Hospital in early 1982; the Ministry's 2022 to 2026 plan dates it to 1982. Its staff are Ministry employees. Until 2015 it received forms from hospitals all over Zambia and entered them into CanReg-4; data entry was then devolved to provincial medical offices, leaving a backlog in Lusaka, and the staff turned to complete registration for Lusaka district (1,747,152 people at the 2010 census), finding cases at the Cancer Diseases Hospital, the University Teaching Hospital, pathology laboratories, private hospitals and a hospice. The page records that cause of death is often poorly recorded on death certificates, and that the staff completed a first report covering 2008 to 2012. The plan says the registry is not linked to the national health information systems, describes one population-based registry for Lusaka with two being developed in Ndola and Livingstone, and also lists those two as not up to standard. A 2023 study found only 51 of 222 confirmed oesophageal cancers at the University Teaching Hospital in 2015 to 2017 recorded in the registry. The plan also records that St. Jude's hospital-based childhood cancer data system, SJCARES, has been in use since August 2021.",
          links: [
            { label: "African Cancer Registry Network: Zambia National Cancer Registry", url: AFCRN_ZNCR },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, situation analysis, SWOT and institutional framework (PDF)", url: NCCSP },
            { label: "Shumba et al., oesophageal cancer cases recorded in the Zambia National Cancer Registry (Pan Afr Med J 2023)", url: "https://doi.org/10.11604/pamj.2023.44.128.32907" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: the government, donors and compulsory national health insurance",
      aside: { label: "NHIMA: benefit package", url: NHIMA_BENEFITS },
      cards: [
        {
          id: "nhima",
          title: "Compulsory national health insurance since 2018, with cancer services in its package",
          plain:
            "Zambia's National Health Insurance Act of 2018 created a compulsory scheme run by NHIMA. Workers in formal jobs and their employers each pay 1% of salary, and people outside formal work pay an assessed amount. NHIMA's benefit package lists cancer and oncology services; the Ministry of Health's plan said it covered breast, cervical, colorectal and prostate cancers but no childhood cancers.",
          detail:
            "The National Health Insurance Management Authority was created under the National Health Insurance Act No. 2 of 2018, and its board was inaugurated on 15 March 2019. Its FAQ gives the formal-sector premium as 1% of declared income from the employee plus 1% of basic salary from the employer, with informal-sector premiums set by its online income assessment tool; a member can register a spouse and five dependants under 18. Its benefit package page covers medicines prescribed by generic name from the National Essential Medicines List, investigations including CT, MRI, ultrasound and mammography, and surgery, and lists cancer and oncology services among further services without saying which cancer treatments are paid for. The Ministry of Health's 2022 to 2026 plan records that the scheme covered breast, cervical, colorectal and prostate cancers and none of the childhood cancers, which shifts costs to families and puts children at risk of treatment abandonment, and sets an objective of including all priority cancers. OnCo could not find NHIMA's current membership figures or its list of covered cancer medicines; see the gaps.",
          links: [
            { label: "NHIMA: about us", url: NHIMA_ABOUT },
            { label: "NHIMA: frequently asked questions", url: NHIMA_FAQ },
            { label: "NHIMA: benefit package", url: NHIMA_BENEFITS },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, gap analysis (PDF)", url: NCCSP },
          ],
        },
        {
          id: "spending",
          title: "Households pay about a tenth of health spending; donors pay almost half",
          plain:
            "In World Bank figures for 2023, households paid about 10% of Zambia's health spending out of pocket, external donors 48% and the government 41%. Cancer control received nearly 1% of the health budget when the plan was written, which aims for 5%. At the Cancer Diseases Hospital, 39.5% of the essential cancer medicines list was available in August 2021.",
          detail:
            "The World Bank's series, from WHO's Global Health Expenditure Database, put out-of-pocket payments at 10.3% of current health expenditure in 2023 (45.5% in 2000), external sources at 47.9%, domestic general government spending at 40.7%, and total health spending at 6.0% of GDP. The 2022 to 2026 plan says 90% of patients seek care in government facilities, that nearly 1% of the health budget was allocated to cancer control services, and that its objective is to raise cancer funding from less than 1% to 5% of the total health budget by 2026 and to draw on NHIMA. Medicines are bought by the Zambia Medicines and Medical Supplies Agency and through pooled procurement backed by partners. The plan reports availability of 39.5% of Zambia's essential cancer medicines list at the Cancer Diseases Hospital in August 2021, and says HPV tests, biopsy samples and patient referrals are often paid out of pocket. A resource mapping of the cervical cancer programme found 59% of projected resources going to prevention and 14% to diagnosis, treatment and palliation. At the August 2026 commissioning the President said the government had cleared debts owed to Indian hospitals for treating Zambian cancer patients, according to a Lusaka Times report.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, Zambia (API)", url: WB_OOP },
            { label: "World Bank: external health expenditure, Zambia (API)", url: WB_EXT },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, health care financing and medicines (PDF)", url: NCCSP },
            { label: "Lombe et al., Zambia cervical cancer control programme resource mapping (J Cancer Policy 2021)", url: "https://doi.org/10.1016/j.jcpo.2021.100281" },
            { label: "Lusaka Times: Cancer Diseases Hospital reopens with upgrades (2 August 2026)", url: LT_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Zambia Medicines Regulatory Authority",
      aside: { label: "ZAMRA: guidelines", url: ZAMRA_GUIDES },
      cards: [
        {
          id: "zamra-routes",
          title: "Registration with 90-day reliance routes for medicines already approved by WHO or a stringent regulator",
          plain:
            "ZAMRA registers medicines in Zambia. A medicine already prequalified by WHO, or approved by a stringent regulator such as the European Medicines Agency or the US Food and Drug Administration, can take a shorter route: ZAMRA's 2026 guideline promises a decision within 90 days of regulatory time. ZAMRA's guidelines page also carries the documents for ZAZIBONA, a joint assessment process of southern African regulators.",
          detail:
            "The Zambia Medicines Regulatory Authority, formerly the Pharmaceutical Regulatory Authority, was established under the Medicines and Allied Substances Act No. 3 of 2013; its own history of regulation starts with the Pharmacy and Poisons Act of 1941. Its Guidelines for Marketing Authorisation of a Medicine for Human Use (MA/GUD/016, version 1, 2026; a scanned PDF read by optical character recognition) set out three abridged routes: the WHO collaborative registration procedure for prequalified products and the WHO procedure for products approved by a stringent regulatory authority, each evaluated within 90 days of regulatory time, which stops while the applicant answers queries; and a verification route for products approved by a recognised regulatory authority within the previous two years, which requires the unredacted assessment report and declares public assessment reports unacceptable. Under the stringent-regulator route an innovator medicine needs a bridging report on data relevant to Zambia where the regulator's assessment does not cover it. Its guidelines page publishes the ZAZIBONA process documents and a reliance guideline listing the authorities whose decisions it may rely on. OnCo found no WHO maturity level announced for ZAMRA; a 2025 study described it as working towards maturity level 3 and found that target review timelines were not well followed.",
          links: [
            { label: "ZAMRA: who we are", url: ZAMRA_WHO },
            { label: "ZAMRA: guidelines for marketing authorisation of a medicine for human use, MA/GUD/016 (scanned PDF)", url: ZAMRA_MA_GUD_016 },
            { label: "ZAMRA: guidelines", url: ZAMRA_GUIDES },
            { label: "Chisha et al., good review practices at the Zambia Medicines Regulatory Authority (Front Med 2025)", url: "https://doi.org/10.3389/fmed.2025.1706139" },
          ],
        },
        {
          id: "zamra-trials-safety",
          title: "Clinical trial authorisation, and warnings about falsified cancer medicines",
          plain:
            "Before a clinical trial of a medicine can start in Zambia, ZAMRA reviews and authorises it. ZAMRA also passes on WHO's warnings about falsified medicines: in June 2026 it warned pharmacies and the public about fake batches of the blood cancer medicine Jakavi (ruxolitinib) found abroad and sold online.",
          detail:
            "ZAMRA's clinical trials section evaluates trial protocols, investigator qualifications, study documentation and safety monitoring plans before authorising a study, and monitors approved trials for compliance; its register of approved trials sits on a separate portal. Its public notice of 29 June 2026, Medical Product Alert No. 2/2026, relayed WHO's report of three falsified batches of Jakavi (ruxolitinib), whose batch numbers it lists, detected in Iran, Russia and Turkey and reported to WHO in May 2026; the genuine maker, Novartis, found no ruxolitinib in a sample of one batch. ZAMRA advised anyone holding the products not to use them and to contact it. In October 2026 ZAMRA announced that two of its staff had been appointed to technical committees of the African Medicines Agency, one as chair of the quality control laboratories committee. OnCo found no published target time for ZAMRA to authorise a clinical trial; see the gaps.",
          links: [
            { label: "ZAMRA: clinical trials", url: ZAMRA_CT },
            { label: "ZAMRA: public notice, falsified Jakavi (ruxolitinib), Medical Product Alert No. 2/2026 (29 June 2026, PDF)", url: ZAMRA_JAKAVI },
            { label: "ZAMRA: statement on appointments to African Medicines Agency technical committees (29 October 2026, PDF)", url: ZAMRA_AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "National Cancer Control Strategic Plan 2022 to 2026 (PDF)", url: NCCSP },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening in 278 clinics across 111 of 116 districts, but about one woman in five screened",
          plain:
            "Zambia's public cervical screening programme began in 2006. Nurses look at the cervix after applying vinegar and photograph it, and treat any abnormal area at the same visit. By 2022 screening had reached 278 clinics in 111 of 116 districts, 100 of them able to remove larger lesions. Surveys find about one woman in five has ever been screened.",
          detail:
            "The 2022 to 2026 plan reports 278 screening clinics in 111 of 116 districts with capacity to treat precancer immediately by ablation or LEEP, 100 of them offering LEEP; 86% of eligible women had ablation on the day of screening and 45% of those needing LEEP had it on the day of referral. It also counts 467 sites able to collect samples for HPV testing and expects self-collection to widen access. Coverage was 16.4% in the 2017 STEPS survey quoted by the plan, and 22.2% of 8,801 women aged 15 to 49 reported ever being screened in the 2021 ZAMPHIA survey. The plan's 2026 targets follow WHO's 90-70-90 elimination strategy. A study of 5,775 women treated at the Cancer Diseases Hospital found late-stage cervical cancer became less common in 2013 to 2017 and more common again in 2018 to 2022, which its authors attribute to low uptake and the poor sensitivity of screening.",
          links: [
            { label: "National Cancer Control Strategic Plan 2022 to 2026, cancer screening and early diagnosis (PDF)", url: NCCSP },
            { label: "Lubeya et al., cervical screening uptake in the 2021 ZAMPHIA survey (Cancer Control 2024)", url: "https://doi.org/10.1177/10732748241307361" },
            { label: "Wu et al., changes in cervical cancer stage at diagnosis in Zambia over 15 years (Cancer Causes Control 2026)", url: "https://doi.org/10.1007/s10552-025-02111-2" },
          ],
        },
        {
          id: "hpv-early-diagnosis",
          title: "HPV vaccine for girls nationwide since 2019, and early diagnosis for breast, prostate and colorectal cancer",
          plain:
            "WHO's data record the HPV vaccine introduced nationwide in Zambia in 2019 and given as a single dose since 2023. Between 52% and 60% of the girls targeted received it in each year from 2023 to 2025. For other cancers the plan relies on earlier diagnosis rather than screening: in 2021 there were four breast diagnostic clinics, and nine facilities offered stool tests for colorectal cancer.",
          detail:
            "In the HPV rows Zambia reported to WHO, first-dose coverage was 99% of a target of 226,033 girls in 2019, 73% in 2020, 44% in 2021, 66% in 2022, 56% of a target of 1,614,489 in 2023, 60% of 283,312 in 2024 and 52% of 840,665 in 2025; WHO's introduction data record the vaccine nationwide from 2019 and a one-dose schedule from 2023. The plan, which lists HPV vaccination for girls aged 9 to 15 and hepatitis B vaccination for children under 5, says HPV coverage is still not adequate, notes Gavi support for the vaccine, and warns that its sustainability may not be guaranteed. At the end of 2021 there were four early breast cancer diagnostic clinics, in Livingstone, Lusaka (two) and Kabwe, against a recommended one per district; colorectal early diagnosis uses guaiac faecal occult blood tests in nine facilities, with colonoscopy at four public hospitals; and prostate cancer and retinoblastoma early diagnosis was available in fewer than 10% of facilities. The plan aims for 60% of breast, childhood and colorectal cancers to be found at stage I or II.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Zambia (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: HPV vaccine introduction rows for Zambia (API)", url: WHO_HPV_INTRO },
            { label: "National Cancer Control Strategic Plan 2022 to 2026, service delivery and executive summary (PDF)", url: NCCSP },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Zambia does",
      title: "What Zambia does differently",
      cards: [
        {
          id: "screen-and-treat-hiv",
          title: "Cervical screening built on the HIV programme, run by nurses with a camera",
          plain:
            "Zambia's cervical screening started in clinics shared with HIV services, building on the HIV programme's investment. Nurses screen by eye after applying vinegar, take a digital photograph that a doctor can review, and treat at the same visit. A randomised trial in Zambia then found that a heat treatment, thermal ablation, cost less than freezing and was cost-effective.",
          detail:
            "The Cervical Cancer Prevention Program in Zambia began in 2006 with nurses providing visual inspection with acetic acid and cryotherapy in public clinics co-housed with HIV/AIDS programmes, with low-cost technology for detection, expert review and quality assurance; between 2006 and 2013 it grew from 2 to 12 Lusaka clinics and screened 102,942 women, 87% of whom received same-day services. Across 11 Lusaka clinics from 2010 to 2019, 183,165 women had 204,225 screens by visual inspection with digital cervicography: 10.4% were positive and 76.2% of those were treated; women with HIV had 3.6 times the odds of screening positive. That cohort study was funded by the US President's Emergency Plan for AIDS Relief. Within a randomised trial in Zambia, with IARC among its authors, thermal ablation cost 39.6 US dollars per woman screened and treated against 42.3 for cryotherapy and 50.6 for loop excision, and was cost-effective. The plan reports an electronic screening database, smartcerv, and the 278-clinic network it grew into.",
          links: [
            { label: "Parham et al., population-level scale-up of cervical cancer prevention in Zambia (PLoS One 2015)", url: "https://doi.org/10.1371/journal.pone.0122169" },
            { label: "Pry et al., cervical cancer screening outcomes in Zambia, 2010 to 2019 (Lancet Glob Health 2021)", url: "https://doi.org/10.1016/S2214-109X(21)00062-0" },
            { label: "Fuady et al., economic evaluation of thermal ablation in Zambia (Bull World Health Organ 2025)", url: "https://doi.org/10.2471/BLT.24.292792" },
          ],
        },
        {
          id: "decentralise",
          title: "Taking cancer care out of Lusaka: two new centres, a cancer act and a national cancer institute",
          plain:
            "Zambia's current cancer plan is titled \"Implementing Cancer Control Services Through Decentralisation\". It proposes a Cancer Control Act and a Zambia National Cancer Institute to coordinate cancer care, which had no legal framework, and comprehensive care in every province. Press reports of the August 2026 hospital reopening quote the President as saying cancer centres in Ndola and Livingstone are being built.",
          detail:
            "The 2022 to 2026 plan records that cancer control had no legal or regulatory framework and no national coordinating body, with no provincial or district cancer coordinators except for cervical cancer, and commits to drafting a Cancer Control Act creating a Zambia National Cancer Institute. It says comprehensive cancer infrastructure is needed in all 10 provinces and plans training of a cancer workforce for Lusaka, Copperbelt and Southern provinces; infrastructure is its largest cost line, about ZMW 837 million over the five years and ZMW 449,331,062 in 2026 alone. A Lusaka Times report of March 2024 said the government planned cancer hospitals in Ndola and Livingstone. At the August 2026 commissioning, according to a Lusaka Times report, the President said the Ndola Cancer Treatment Centre was 85% complete and would be commissioned before the end of the year, and directed that construction of the Livingstone Cancer Centre, for the southern and western parts of the country, be speeded up. OnCo found no official opening of either centre; see the gaps.",
          links: [
            { label: "National Cancer Control Strategic Plan 2022 to 2026, foreword, gap analysis, legal framework and cost summary (PDF)", url: NCCSP },
            { label: "Lusaka Times: Ministry of Health secures funding for Cancer Diseases Hospital rehabilitation and re-equipping (23 March 2024)", url: LT_2024 },
            { label: "Lusaka Times: Cancer Diseases Hospital reopens with upgrades (2 August 2026)", url: LT_2026 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Zambia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Zambia. Half of the Zambian cancer studies registered there are about cervical screening and HPV. A 2025 review found one randomised trial among 76 Zambian cancer studies published from 2012 to 2022.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 0 trials list Zambia among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines. A ClinicalTrials.gov search for cancer with a location in Zambia returned 12 studies the same day (357 studies of any condition), none of them in OnCo's records; they include an IARC trial of a hand-held thermo-coagulator for cervical precancer (NCT02956239, completed) and an IARC trial of a single dose of the CERVAVAC quadrivalent HPV vaccine (NCT07256912, active, not recruiting). The 2025 review of 76 Zambian cancer studies found 61.8% were retrospective, 10 of the 11 most prolific funders were international, mainly from the United States and the United Kingdom, and Zambian researchers were first authors on 43% of studies; prevention, palliative care and health economics were little studied. The Ministry of Health's plan names research among its priorities and records that cancer research is not prioritised in national research funding. ZAMRA authorises trials of medicines before they open.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Zambia (search)", url: CTGOV },
            { label: "Msadabwe et al., mapping the cancer research landscape across Zambia (ecancermedicalscience 2025)", url: "https://doi.org/10.3332/ecancer.2025.1942" },
            { label: "ZAMRA: clinical trials", url: ZAMRA_CT },
          ],
        },
        {
          id: "plan-2022",
          title: "The 2022 to 2026 plan: a third fewer premature cancer deaths by 2030, for about ZMW 2.4 billion",
          plain:
            "Zambia's National Cancer Control Strategic Plan 2022 to 2026 follows a 2016 to 2021 plan. It aims to cut premature cancer deaths by a third by 2030 and raise childhood cancer survival above 60%, and to eliminate cervical cancer. It prioritises cervical, breast, prostate, colorectal and childhood cancers, and was costed at about ZMW 2.4 billion over five years.",
          detail:
            "The plan lists achievements of its 2016 to 2021 predecessor: cervical screening decentralised to 278 facilities, HPV vaccination rolled out nationwide, new training programmes, inclusion of cancer services in the national health insurance package, and guidelines for cervical, breast and childhood cancers. Its six objectives cover leadership and a decentralised system, workforce, cancer data, infrastructure and equipment, community engagement, and raising cancer funding from less than 1% to 5% of the health budget. It was costed at ZMW 2,399,590,585 over 2022 to 2026, with infrastructure (about ZMW 837 million), medicines and drugs (about ZMW 592 million) and cervical cancer (about ZMW 533 million) the largest lines. It names awareness of cancer at under 5% of the public, and records that cancer core staff fall below WHO guidance. The plan is published on the International Cancer Control Partnership's portal.",
          links: [
            { label: "National Cancer Control Strategic Plan 2022 to 2026 (Ministry of Health, PDF)", url: NCCSP },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "radiotherapy-2020-2026",
      title: "How much radiotherapy Zambia gave between 2020 and 2026 is not confirmed",
      plain:
        "Press reports of the August 2026 commissioning say radiotherapy at the Cancer Diseases Hospital was suspended in 2020 and patients were sent abroad. The Ministry's plan of 2022 still counted a linear accelerator, two cobalt units and two brachytherapy units there. OnCo found no official count of patients treated in Zambia in those years.",
      detail:
        "The figures for the closure come from press reports of speeches: a backlog of 1,600 patients according to the Ministry's Permanent Secretary, 600 patients sent abroad (Zambia Monitor) and more than 800 waiting to go to India and other countries (Lusaka Times), according to two reports of the President's remarks, and equipment failures according to the Health Minister in March 2024. The IAEA's Directory of Radiotherapy Centres (DIRAC), which would hold Zambia's machine count, loads its data by script and could not be read as raw text. Whether the Ndola Cancer Treatment Centre has opened, and when the Livingstone centre will, was not confirmed by an official source; ask the referring hospital which centre is treating and how long the wait is.",
      links: [
        { label: "Zambia Monitor: Hichilema commissions US$31 million facility at Cancer Diseases Hospital (2 August 2026)", url: ZM_MONITOR_2026 },
        { label: "National Cancer Control Strategic Plan 2022 to 2026, infrastructure and equipment (PDF)", url: NCCSP },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "registry-reports",
      title: "The registry's own incidence reports could not be found",
      plain:
        "OnCo found no published incidence report from the Zambia National Cancer Registry for any recent period, so the table above relies on a 2021 paper using 2007 to 2014 data, whose rates differ widely from IARC's. The registry's network page is undated, and the registry and the Ministry give different founding years.",
      detail:
        "The African Cancer Registry Network page mentions a first report on incidence in 2008 to 2012, which was not found online. The Kalubula paper's abstract does not explain its denominators, and its cervical rate of 186.3 per 100,000 is more than twice IARC's 2024 estimate of 74.8. Rates for Lusaka district alone, which IARC uses, were not found in any abstract read. The network page dates the registry to November 1977; the Ministry's plan dates it to 1982, the year the network page gives for its move to the University Teaching Hospital. The plan says both one and three population-based registries exist. IARC's detailed data sources and methods page for Zambia was not read; the method is taken from the fact sheet.",
      links: [
        { label: "African Cancer Registry Network: Zambia National Cancer Registry", url: AFCRN_ZNCR },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Zambia (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "approval-times",
      title: "No published registration times or cancer medicine lists for Zambia",
      plain:
        "OnCo found no published measured time for ZAMRA to register a new medicine, no target time for authorising a clinical trial, no WHO maturity level for ZAMRA, and no list of which cancer medicines NHIMA pays for. ZAMRA's guidelines are scanned documents, and its register of approved medicines needs a script to load.",
      detail:
        "The 90-day evaluation time quoted on this page is a target in ZAMRA's 2026 abridged registration guideline, read from a scanned PDF by optical character recognition, and applies only to products already approved by WHO or a stringent regulator. ZAMRA's registers of approved medicines and trials sit on a portal that loads by script and were not read. The 2025 study of its review practices reports that targets were not well followed but the abstract gives no measured times. NHIMA's benefit package lists cancer and oncology services without naming medicines; the plan's statement that four cancers are covered dates from 2022. Zambia's essential cancer medicines list was not read.",
      links: [
        { label: "ZAMRA: guidelines", url: ZAMRA_GUIDES },
        { label: "NHIMA: benefit package", url: NHIMA_BENEFITS },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: NHIMA's membership, survival after a cancer diagnosis in Zambia, a measured cervical screening coverage figure for 2025 or 2026, and any IAEA imPACT Review or WHO country cancer profile for Zambia.",
      detail:
        "NHIMA's pages give no membership count. No population-based survival figures for Zambia were found in the sources read; the childhood survival estimate of less than 20% is the plan's. The two screening coverage figures are from surveys in 2017 and 2021. The Ministry of Health's website was reached but gave no cancer programme pages beyond a link to the Cancer Diseases Hospital. The plan's health worker counts are from 2022 and have not been checked against a newer source. The Minister named on ZAMRA's 2026 guideline could not be read reliably from the scan and is not named here.",
      links: [
        { label: "National Health Insurance Management Authority (NHIMA)", url: "https://www.nhima.co.zm/" },
        { label: "Ministry of Health, Zambia", url: "https://www.moh.gov.zm/" },
      ],
    },
  ],
  institutions: [
    "zambia-ministry-of-health", "cancer-diseases-hospital-lusaka", "zambia-national-cancer-registry", "zamra-zambia", "nhima-zambia",
    "zambian-cancer-society", "iaea", "iarc", "who", "st-jude",
  ],
  companies: ["siemens-healthineers"],
  drugs: ["ruxolitinib"],
  trials: [],
  papers: [
    "paper-kalubula-zambia-cancer-epidemiology-mmj-2021", "paper-shumba-oesophageal-cancer-zncr-pamj-2023", "paper-parham-ccppz-scale-up-zambia-plosone-2015",
    "paper-pry-cervical-screening-zambia-lgh-2021", "paper-wu-cervical-stage-zambia-ccc-2026", "paper-lubeya-zamphia-cervical-screening-cancercontrol-2024",
    "paper-fuady-thermal-ablation-cea-zambia-bwho-2025", "paper-lombe-zambia-cervical-resource-mapping-jcpo-2021", "paper-msadabwe-zambia-cancer-research-landscape-ecancer-2025",
    "paper-chisha-zamra-good-review-practices-fmed-2025",
  ],
  people: ["susan-msadabwe", "makomani-siyanga"],
  how:
    "Every card was written from Zambian official sources, international data and peer-reviewed papers, read in full rather than through a summary: the Ministry of Health's National Cancer Control Strategic Plan 2022 to 2026; the African Cancer Registry Network's page for the Zambia National Cancer Registry; ZAMRA's own pages, its 2026 abridged registration guideline (read by optical character recognition), its June 2026 falsified medicine notice and October 2026 statement; NHIMA's About, Benefit Package and FAQ pages; two press reports of the Cancer Diseases Hospital's re-equipping and recommissioning; WHO's HPV rows from its public data API; the World Bank's health expenditure series; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and a ClinicalTrials.gov search. The new records added for this page (the Ministry, the registry, ZAMRA, NHIMA, ten papers and ZAMRA's Director General) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates built on a subnational registry's rates, not a national count. Radiotherapy capacity, the opening of the Ndola and Livingstone centres, which medicines are in stock and what NHIMA pays for are changing faster than the published plan; ask the Cancer Diseases Hospital, your referring hospital or NHIMA what applies to you. Cervical screening and HPV testing differ from district to district.",
  verifyLinks: [
    { label: "Ministry of Health, Zambia", url: "https://www.moh.gov.zm/" },
    { label: "Cancer Diseases Hospital, Lusaka", url: "https://www.cdh.gov.zm/" },
    { label: "National Health Insurance Management Authority", url: "https://www.nhima.co.zm/" },
    { label: "Zambia Medicines Regulatory Authority", url: ZAMRA_WHO },
    { label: "National Cancer Control Strategic Plan 2022 to 2026 (PDF)", url: NCCSP },
  ],
};
