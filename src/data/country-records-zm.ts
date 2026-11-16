import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Zambia: the public bodies and papers behind /countries/zm/ (wave 10) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministry of Health's National Cancer Control
 * Strategic Plan 2022 to 2026 (PDF text, ICCP portal), the African Cancer Registry Network's member page for the
 * Zambia National Cancer Registry, the Zambia Medicines Regulatory Authority's own pages, its 2026 guideline for the
 * abridged registration of human medicines (a scanned PDF, read by optical character recognition) and its press
 * statements, and the National Health Insurance Management Authority's About, Benefit Package and FAQ pages. DOIs were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the regulator and the insurer, and the Cancer Diseases Hospital and
 * the Zambian Cancer Society, which already exist (centres-wave3.ts, uicc-societies.ts) and are reused, not duplicated;
 * the registry, the regulator and the insurer link back to the Ministry, and the papers link the registry, the
 * hospital and the regulator. Coordinates are approximate Lusaka city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCSP = "https://www.iccp-portal.org/system/files/plans/NATIONAL-CANCER-CONTROL-STRATEGIC-PLAN-2022-to-2026.pdf";
const AFCRN_ZNCR = "https://afcrn.org/index.php/membership/membership-list/135-zambiacancerreigstry";
const ZAMRA_WHO = "https://www.zamra.co.zm/who-we-are/";
const ZAMRA_CT = "https://www.zamra.co.zm/clinical-trials-regulation/";
const ZAMRA_GUIDES = "https://www.zamra.co.zm/guidelines/";
const ZAMRA_MA_GUD_016 = "https://www.zamra.co.zm/wp-content/uploads/2026/10/MA_GUD_016_Guidelines-for-MA-of-Medcines-for-Human-Use-1.pdf";
const ZAMRA_AMA = "https://www.zamra.co.zm/wp-content/uploads/2026/10/ZAMRA-AMA-APOINTMENTS-edited.pdf";
const NHIMA_ABOUT = "https://www.nhima.co.zm/about-us/";
const NHIMA_BENEFITS = "https://www.nhima.co.zm/benefit-package/";
const NHIMA_FAQ = "https://www.nhima.co.zm/elementor-1783/";

const institutions: InstitutionInput[] = [
  i({ id: "zambia-ministry-of-health", name: "Ministry of Health, Zambia", aka: ["MoH Zambia", "Zambian Ministry of Health"],
    city: "Lusaka", country: "ZM", lat: -15.416, lng: 28.283, institutionType: "government", website: "https://www.moh.gov.zm",
    tldr: "Zambia's health ministry. Its Oncology Services Unit, set up in 2016, coordinates cancer control, and its National Cancer Control Strategic Plan 2022 to 2026 sets the goal of cutting premature cancer deaths by a third by 2030.",
    summary: "The Ministry of Health runs cancer control through an Oncology (Cancer Control) Services Unit established in 2016, with one section for prevention, screening and early detection and one for diagnosis, treatment and palliative care, coordinated through a National Cancer Control Technical Working Group. Its National Cancer Control Strategic Plan 2022 to 2026, themed on decentralising cancer services, follows a plan for 2016 to 2021 and prioritises cervical, breast, prostate, colorectal and childhood cancers. The plan's goal is to reduce premature cancer mortality by one third by 2030 and to improve childhood cancer survival to over 60%; it was costed at ZMW 2,399,590,585 over five years. The coordinates on this record are an approximate Lusaka city point.\n\nThe plan records that cancer control had no legal framework, and proposes a Cancer Control Act creating a Zambia National Cancer Institute to coordinate it. It reports that nearly 1% of the health budget went to cancer control, against a target of 5%, that the national health insurance scheme covered breast, cervical, colorectal and prostate cancers but no childhood cancers, and that the Cancer Diseases Hospital in Lusaka was the only facility offering radiotherapy and comprehensive cancer treatment. Cervical screening had reached 278 clinics in 111 of 116 districts.\n\nAccording to a Lusaka Times report of March 2024, the Health Minister signed a contract with Siemens Healthineers to re-equip the Cancer Diseases Hospital's radiotherapy and imaging, at an overall project cost of about 30.8 million US dollars, and the government planned cancer hospitals in Ndola and Livingstone. The President commissioned the refurbished radiotherapy and imaging section on 1 August 2026, according to press reports.",
    programs: ["National Cancer Control Strategic Plan 2022 to 2026", "National Cancer Control Strategic Plan 2016 to 2021", "Oncology Services Unit (from 2016)", "Cervical Cancer Prevention Program in Zambia (screen and treat)", "HPV vaccination through the Expanded Programme on Immunisation", "Cancer treatment centres planned in Ndola and Livingstone"],
    institutions: ["cancer-diseases-hospital-lusaka", "zambia-national-cancer-registry", "zamra-zambia", "nhima-zambia", "zambian-cancer-society", "iaea", "who", "iarc"],
    companies: ["siemens-healthineers"],
    cancers: ["cervical", "breast-cancer", "prostate", "colorectal", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-parham-ccppz-scale-up-zambia-plosone-2015", "paper-pry-cervical-screening-zambia-lgh-2021", "paper-lubeya-zamphia-cervical-screening-cancercontrol-2024", "paper-wu-cervical-stage-zambia-ccc-2026", "paper-fuady-thermal-ablation-cea-zambia-bwho-2025", "paper-lombe-zambia-cervical-resource-mapping-jcpo-2021", "paper-msadabwe-zambia-cancer-research-landscape-ecancer-2025"],
    links: [
      { label: "National Cancer Control Strategic Plan 2022 to 2026 (Ministry of Health, PDF, ICCP portal)", url: NCCSP },
      { label: "Lusaka Times: Ministry of Health secures funding for Cancer Diseases Hospital rehabilitation and re-equipping (23 March 2024)", url: "https://www.lusakatimes.com/2024/03/23/ministry-of-health-secures-funding-for-cancer-diseases-hospital-rehabilitation-and-re-equipping" },
      { label: "Zambia Monitor: Hichilema commissions US$31 million facility at Cancer Diseases Hospital (2 August 2026)", url: "https://www.zambiamonitor.com/president-hichilema-commissions-us31-million-facility-at-cancer-diseases-hospital/" },
    ] }),

  i({ id: "zambia-national-cancer-registry", name: "Zambia National Cancer Registry", aka: ["ZNCR", "Zambia National Cancer Registry (Lusaka)"],
    city: "Lusaka", country: "ZM", lat: -15.43, lng: 28.31, institutionType: "government", website: AFCRN_ZNCR,
    tldr: "Zambia's cancer registry, based at the University Teaching Hospital in Lusaka and run by the Ministry of Health. It counts every cancer diagnosed or treated in Lusaka district; IARC's national estimate applies the rates of a subnational registry, which its fact sheet does not name.",
    summary: "The Zambia National Cancer Registry's page on the African Cancer Registry Network says it was established by the Medical Research Council in November 1977 under the Ministry of Health and transferred to the University Teaching Hospital (UTH) in early 1982; the Ministry's 2022 to 2026 cancer plan dates its establishment to 1982. It is housed in the Paediatric Centre of Excellence at UTH, and its staff are Ministry of Health employees. Until 2015 it received notification forms from hospitals across Zambia; data entry has since been devolved to provincial medical offices, and the Lusaka staff concentrate on complete population-based registration in Lusaka district (1,747,152 people at the 2010 census), visiting the Cancer Diseases Hospital, UTH, pathology laboratories and other facilities. It uses IARC's CanReg5 software, and its staff completed a first report on incidence for 2008 to 2012. The coordinates are those of the UTH campus, approximately.\n\nThe Ministry's plan describes the registry's move from a hospital-based registry with passive surveillance to population-based registration, with one population-based registry for Lusaka district and two more being developed in Ndola and Livingstone; elsewhere it counts three, while noting that those for Ndola and Livingstone were not up to standard. It records that the registry is not linked to the national health information systems. A 2023 study found that only 51 of 222 confirmed oesophageal cancers seen at UTH in 2015 to 2017 appeared in the registry.",
    programs: ["Population-based cancer registration for Lusaka district", "Population-based registries in development for Ndola and Livingstone", "African Cancer Registry Network member registry"],
    institutions: ["zambia-ministry-of-health", "cancer-diseases-hospital-lusaka", "iarc"], cancers: ["cervical", "prostate", "breast-cancer", "kaposi-sarcoma", "esophageal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-kalubula-zambia-cancer-epidemiology-mmj-2021", "paper-shumba-oesophageal-cancer-zncr-pamj-2023"],
    links: [
      { label: "African Cancer Registry Network: Zambia National Cancer Registry", url: AFCRN_ZNCR },
      { label: "National Cancer Control Strategic Plan 2022 to 2026, situation analysis and institutional framework (PDF)", url: NCCSP },
      doi("10.4314/mmj.v33i3.6", "Kalubula et al., epidemiology of cancers in Zambia (Malawi Med J 2021)"),
      doi("10.11604/pamj.2023.44.128.32907", "Shumba et al., oesophageal cancer cases in the Zambia National Cancer Registry (Pan Afr Med J 2023)"),
    ] }),

  i({ id: "zamra-zambia", name: "Zambia Medicines Regulatory Authority (ZAMRA)", aka: ["ZAMRA", "Pharmaceutical Regulatory Authority", "PRA Zambia"],
    city: "Lusaka", country: "ZM", lat: -15.37, lng: 28.39, institutionType: "government", website: "https://www.zamra.co.zm",
    tldr: "Zambia's medicines regulator, set up under the Medicines and Allied Substances Act No. 3 of 2013. It registers medicines, authorises clinical trials and can register a medicine already approved by WHO or a stringent regulator through shorter, reliance-based routes.",
    summary: "The Zambia Medicines Regulatory Authority, formerly the Pharmaceutical Regulatory Authority, is the statutory medicines regulator established under the Medicines and Allied Substances Act No. 3 of 2013 to regulate the manufacture, importation, storage, distribution, supply, sale and use of medicines and allied substances. Its own history of medicines regulation in Zambia starts with the Pharmacy and Poisons Act of 1941. Its head office is off Kenneth Kaunda International Airport Road in Lusaka, with offices in Chipata and Ndola; the coordinates are approximate.\n\nIts Guidelines for Marketing Authorisation of a Medicine for Human Use (MA/GUD/016, version 1, 2026) set out abridged routes for medicines already approved elsewhere: the WHO collaborative registration procedure for prequalified products and the WHO procedure for products approved by a stringent regulatory authority, each to be evaluated within 90 days of regulatory time, and a verification route for products approved by a recognised regulatory authority within the previous two years, which requires the unredacted assessment report. Its guideline page publishes documents for the ZAZIBONA collaborative assessment process of southern African regulators. Its clinical trials section reviews and authorises clinical research on regulated products and monitors approved trials.\n\nA 2025 study of the Authority's review practices found that target timelines were not well followed and described ZAMRA as working towards WHO maturity level 3. In October 2026 ZAMRA announced that two of its staff had been appointed to technical committees of the African Medicines Agency.",
    programs: ["Marketing authorisation of medicines", "Abridged registration through WHO and stringent-regulator procedures", "ZAZIBONA collaborative assessment", "Clinical trial authorisation", "Pharmacovigilance and medical product alerts"],
    institutions: ["zambia-ministry-of-health", "who"],
    people: ["makomani-siyanga"],
    keyPapers: ["paper-chisha-zamra-good-review-practices-fmed-2025"],
    links: [
      { label: "ZAMRA: who we are", url: ZAMRA_WHO },
      { label: "ZAMRA: guidelines for marketing authorisation of a medicine for human use, MA/GUD/016 (scanned PDF)", url: ZAMRA_MA_GUD_016 },
      { label: "ZAMRA: guidelines", url: ZAMRA_GUIDES },
      { label: "ZAMRA: clinical trials", url: ZAMRA_CT },
      { label: "ZAMRA: statement on appointments to African Medicines Agency technical committees (29 October 2026, PDF)", url: ZAMRA_AMA },
    ] }),

  i({ id: "nhima-zambia", name: "National Health Insurance Management Authority (NHIMA)", aka: ["NHIMA", "National Health Insurance Scheme Zambia", "NHIS Zambia"],
    city: "Lusaka", country: "ZM", lat: -15.41, lng: 28.30, institutionType: "government", website: "https://www.nhima.co.zm",
    tldr: "Zambia's national health insurer, created under the National Health Insurance Act No. 2 of 2018. Membership is compulsory, formal-sector workers and employers each pay 1% of salary, and its benefit package lists cancer and oncology services.",
    summary: "The National Health Insurance Management Authority runs the compulsory National Health Insurance Scheme established by the National Health Insurance Act No. 2 of 2018; its board was inaugurated on 15 March 2019. Its functions are to operate the scheme, manage the National Health Insurance Fund, accredit healthcare providers, develop the benefit package and register members. Its head office is at the Public Service Pension Fund Building, Longacres, Lusaka; the coordinates are approximate.\n\nIts FAQ gives the formal-sector premium as 1% of declared income from the employee and 1% from the employer, with informal-sector premiums set by an income assessment tool; a member can register a spouse and five dependants under 18. Its benefit package covers medicines prescribed by generic name from the National Essential Medicines List, investigations including CT, MRI, ultrasound and mammography, and surgery, and lists cancer and oncology services among further services, but the package page does not say which cancer treatments are paid for.\n\nThe Ministry of Health's 2022 to 2026 cancer plan records that the scheme covered breast, cervical, colorectal and prostate cancers and none of the childhood cancers, and aims to have all priority cancers included in its packages.",
    programs: ["National Health Insurance Scheme (compulsory)", "Benefit package including cancer and oncology services", "Accreditation of healthcare providers"],
    institutions: ["zambia-ministry-of-health"],
    links: [
      { label: "NHIMA: about us", url: NHIMA_ABOUT },
      { label: "NHIMA: benefit package", url: NHIMA_BENEFITS },
      { label: "NHIMA: frequently asked questions", url: NHIMA_FAQ },
      { label: "National Health Insurance Management Authority (NHIMA)", url: "https://www.nhima.co.zm/" },
      { label: "National Cancer Control Strategic Plan 2022 to 2026, gap analysis (PDF)", url: NCCSP },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-kalubula-zambia-cancer-epidemiology-mmj-2021", name: "Epidemiology of cancers in Zambia from the national cancer registry, 2007 to 2014",
    journal: "Malawi Medical Journal", year: 2021, doi: "10.4314/mmj.v33i3.6", pmid: "35233276", authors: "Kalubula M, Shen H, Makasa M, Liu L.", paperType: "observational",
    tldr: "Using Zambia National Cancer Registry data for 2007 to 2014, the authors found cervical, prostate and breast cancer and Kaposi sarcoma to be the four commonest cancers and major causes of cancer death, with large differences between districts.",
    summary: "Published as \"Epidemiology of Cancers in Zambia: A significant variation in Cancer incidence and prevalence across the nation\". A retrospective observational study of Zambia National Cancer Registry data from 2007 to 2014, using Central Statistics Office population data as catchment denominators to calculate age-adjusted incidence, prevalence and case fatality.",
    findings: [
      "Cervical cancer, prostate cancer, breast cancer and Kaposi sarcoma were the four most prevalent cancers and major causes of cancer-related deaths.",
      "Age-adjusted rates were reported as cervix uteri 186.3 (95% CI 181.77 to 190.83), prostate 60.03, breast 38.08 and Kaposi sarcoma 26.18.",
      "The seven districts with the most cancers were Luangwa, Kabwe, Lusaka, Monze, Mongu, Katete and Chipata; the authors report an association between cancer and HIV.",
    ],
    whatItMeans: "One of the few published analyses of the national registry's data, showing the same leading cancers that IARC estimates, though at different rates.",
    caveats: ["The abstract does not say what population the rates are per or how the catchment denominators were built; the cervical rate is more than twice IARC's estimate.", "Before 2015 the registry relied on notification forms from hospitals, and a later study found many cases missing."],
    institutions: ["zambia-national-cancer-registry"], cancers: ["cervical", "prostate", "breast-cancer", "kaposi-sarcoma"],
    links: [doi("10.4314/mmj.v33i3.6", "Malawi Med J 2021"), pubmed("35233276")] }),

  p({ id: "paper-shumba-oesophageal-cancer-zncr-pamj-2023", name: "How many oesophageal cancers reach the Zambia National Cancer Registry",
    journal: "Pan African Medical Journal", year: 2023, doi: "10.11604/pamj.2023.44.128.32907", pmid: "37275285", authors: "Shumba S, Musonda P, Lombe D, Chongwe G, Kayamba V.", paperType: "observational", participants: 222,
    tldr: "Of 222 patients with confirmed oesophageal cancer at the University Teaching Hospital in Lusaka in 2015 to 2017, only 51 appeared in the national cancer registry, so official figures for the disease are likely to be underestimates.",
    summary: "Published as \"Oesophageal cancer cases recorded in the Zambia National Cancer Registry: a cross-sectional study\". The authors reviewed oesophageal cancer records at the University Teaching Hospital (UTH) and in the Zambia National Cancer Registry between 2015 and 2017.",
    findings: [
      "51 of 222 patients with confirmed oesophageal cancer were recorded in the registry.",
      "Median time from endoscopic diagnosis to histological confirmation was 12.5 days, and to arrival at the Cancer Diseases Hospital for treatment 20 days.",
      "Median survival was 259 days; only 2 of the 222 patients were confirmed alive at the time of analysis.",
    ],
    whatItMeans: "A direct measure of how incomplete registration was for one cancer at Zambia's largest hospital, which matters because IARC's national estimates rest on the registry's rates.",
    caveats: ["One cancer and one hospital.", "The abstract gives 51 of 222 as 41%; 51 of 222 is 23%."],
    institutions: ["zambia-national-cancer-registry", "cancer-diseases-hospital-lusaka"], cancers: ["esophageal"],
    links: [doi("10.11604/pamj.2023.44.128.32907", "Pan Afr Med J 2023"), pubmed("37275285")] }),

  p({ id: "paper-parham-ccppz-scale-up-zambia-plosone-2015", name: "Scaling up cervical cancer prevention in Zambia's public clinics, 2006 to 2013",
    journal: "PLoS One", year: 2015, doi: "10.1371/journal.pone.0122169", pmid: "25885821", authors: "Parham GP, Mwanahamuntu MH, Kapambwe S, et al.", paperType: "observational", participants: 102942,
    tldr: "Zambia's Cervical Cancer Prevention Program, run by nurses in clinics shared with HIV services, grew from 2 to 12 Lusaka clinics between 2006 and 2013 and screened 102,942 women, most of whom had their result and any treatment on the same day.",
    summary: "Published as \"Population-level scale-up of cervical cancer prevention services in a low-resource setting: development, implementation, and evaluation of the cervical cancer prevention program in Zambia\". Nurses provided visual inspection with acetic acid and cryotherapy in public clinics co-housed with HIV/AIDS programmes, referred complex lesions for histopathology, and used low-cost technology to improve detection, obtain expert opinion and assure quality; the authors analysed the programme's electronic medical records.",
    findings: [
      "Between 2006 and 2013 screening expanded from 2 to 12 clinics in Lusaka and 102,942 women were screened; 28% were HIV-positive.",
      "Of 101,867 with evaluable data, 20% were VIA positive: 56.4% of these were treated with cryotherapy and 43.6% referred for histopathology.",
      "87% received same-day services; detection rates for CIN2 or worse and invasive cancer were 17 and 7 per 1,000 women screened.",
    ],
    whatItMeans: "The founding description of the screen-and-treat model Zambia later extended to most districts, built on HIV programme investment.",
    caveats: ["Written by the programme's own team.", "Lusaka only in this period."],
    institutions: ["zambia-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1371/journal.pone.0122169", "PLoS One 2015"), pubmed("25885821")] }),

  p({ id: "paper-pry-cervical-screening-zambia-lgh-2021", name: "Cervical screening outcomes in Zambia's public programme, 2010 to 2019",
    journal: "The Lancet Global Health", year: 2021, doi: "10.1016/S2214-109X(21)00062-0", pmid: "34019837", authors: "Pry JM, Manasyan A, Kapambwe S, et al.", paperType: "observational", participants: 183165,
    tldr: "Across 11 Lusaka clinics of Zambia's Cervical Cancer Prevention Program, 183,165 women had 204,225 screens between 2010 and 2019; about one in ten was positive and three quarters of those were treated.",
    summary: "A cohort study of routine programme data from 11 government health facilities in Lusaka running the Cervical Cancer Prevention Program in Zambia (CCPPZ), which screens by visual inspection with acetic acid and digital cervicography (VIAC), with mixed-effects regression of screening results. Funded by the US President's Emergency Plan for AIDS Relief.",
    findings: [
      "Between 1 January 2010 and 31 July 2019, 183,165 women had 204,225 VIAC results; 21,326 (10.4%) were positive, of whom 16,244 (76.2%) were treated.",
      "37.5% of screenings were in women with HIV, who were more likely to screen positive (adjusted odds ratio 3.60).",
      "Screening frequency rose 65.7% between 2010 and 2019, and 77.8% of appointments were first-time screenings.",
    ],
    whatItMeans: "Shows the scale the programme reached in Lusaka and that most women attend only once, which matters for the WHO elimination targets.",
    caveats: ["Routine programme data from 11 Lusaka facilities, not the whole country.", "The authors could not tell whether high positivity in young women with HIV reflects earlier disease or misclassification."],
    institutions: ["zambia-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1016/S2214-109X(21)00062-0", "Lancet Glob Health 2021"), pubmed("34019837")] }),

  p({ id: "paper-wu-cervical-stage-zambia-ccc-2026", name: "Stage at diagnosis of cervical cancer at Zambia's Cancer Diseases Hospital over 15 years",
    journal: "Cancer Causes & Control", year: 2026, doi: "10.1007/s10552-025-02111-2", pmid: "41872566", authors: "Wu R, Kalima M, Msadabwe S, et al.", paperType: "observational", participants: 5775,
    tldr: "Among 5,775 women treated for cervical cancer at the Cancer Diseases Hospital in Lusaka between 2008 and 2022, late-stage diagnosis became less common in 2013 to 2017 and then more common again in 2018 to 2022.",
    summary: "The study compared stage at diagnosis across 2008 to 2012, 2013 to 2017 and 2018 to 2022 at the Cancer Diseases Hospital, testing whether the national screening programme begun in 2006 and the first national cancer control plan of 2016 had reduced late-stage presentation.",
    findings: [
      "Late-stage (stage III and IV) diagnosis fell in 2013 to 2017 compared with 2008 to 2012 (odds ratio 0.60, 95% CI 0.49 to 0.73).",
      "It rose again in 2018 to 2022 compared with 2013 to 2017 (odds ratio 1.25, 95% CI 1.04 to 1.49).",
      "Women who were divorced or widowed, unemployed, or living in provinces far from Lusaka were more likely to present late in every period.",
    ],
    whatItMeans: "Screening has not yet moved stage at diagnosis steadily earlier; the authors point to low screening uptake and the poor sensitivity of screening.",
    caveats: ["One hospital, which treats patients referred from across the country.", "Explanations for the reversal are the authors' interpretation."],
    institutions: ["cancer-diseases-hospital-lusaka"], cancers: ["cervical"],
    links: [doi("10.1007/s10552-025-02111-2", "Cancer Causes Control 2026"), pubmed("41872566")] }),

  p({ id: "paper-lubeya-zamphia-cervical-screening-cancercontrol-2024", name: "Cervical screening uptake in Zambia in the 2021 ZAMPHIA survey",
    journal: "Cancer Control", year: 2024, doi: "10.1177/10732748241307361", pmid: "39710618", authors: "Lubeya MK, Sinyani A, Mukosha M, et al.", paperType: "observational", participants: 8801,
    tldr: "In Zambia's 2021 population-based HIV impact survey, 22.2% of 8,801 women aged 15 to 49 said they had ever been screened for cervical cancer, far below the WHO target of 70%.",
    summary: "Published as \"Self-Reported Cervical Cancer Screening Uptake Among Women of Reproductive Age in Zambia: Evidence from the 2021 Zambia Population-Based HIV Impact Assessment (ZAMPHIA) Survey\". A two-stage cluster sample across all ten provinces; women aged 15 to 49 were asked whether they had been screened, and HIV status was tested from biological samples.",
    findings: [
      "22.2% of 8,801 surveyed women reported cervical cancer screening.",
      "Screening was more likely among women living with HIV than HIV-negative women (adjusted odds ratio 3.92) and among women aged 35 to 49 (2.65) than younger women.",
      "Marital status, education and number of live births were also associated with screening.",
    ],
    whatItMeans: "A national, survey-based measure of screening coverage, close to the 16.4% the Ministry quotes from its 2017 STEPS survey and far from the 70% target.",
    caveats: ["Self-reported; the age range 15 to 49 includes young women not yet eligible for screening."],
    institutions: ["zambia-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1177/10732748241307361", "Cancer Control 2024"), pubmed("39710618")] }),

  p({ id: "paper-fuady-thermal-ablation-cea-zambia-bwho-2025", name: "Cost-effectiveness of thermal ablation for cervical precancer in Zambia",
    journal: "Bulletin of the World Health Organization", year: 2025, doi: "10.2471/BLT.24.292792", pmid: "40900929", authors: "Fuady A, Kasempa C, Lucas E, et al.", paperType: "methods", participants: 3124,
    tldr: "Within a randomised trial in Zambia, treating cervical precancer by thermal ablation cost less than cryotherapy or loop excision and was cost-effective, mainly because it needs less staff time.",
    summary: "Published as \"Economic evaluation of thermal ablation compared to cryotherapy and loop diathermy in a screen-and-treat approach to cervical cancer, Zambia\". Costs were measured by microcosting within a randomised controlled trial that assigned women eligible for ablative treatment after screening to thermal ablation, cryotherapy or loop diathermy, and cost-effectiveness was modelled with a decision tree.",
    findings: [
      "Of 3,124 women screened and treated, 2,386 (76.4%) completed follow-up.",
      "In the trial, cost per woman screened and treated was 39.6 US dollars for thermal ablation, 42.3 for cryotherapy and 50.6 for loop diathermy.",
      "Projected for routine services the costs were 12.7, 15.6 and 34.9 US dollars, and thermal ablation was cost-effective against both alternatives.",
    ],
    whatItMeans: "Evidence behind Zambia's move from cryotherapy towards thermal ablation in its screen-and-treat clinics.",
    caveats: ["Routine-service costs are projections from trial data."],
    institutions: ["iarc", "zambia-ministry-of-health"], cancers: ["cervical"], technologies: ["thermal-ablation"],
    links: [doi("10.2471/BLT.24.292792", "Bull World Health Organ 2025"), pubmed("40900929")] }),

  p({ id: "paper-lombe-zambia-cervical-resource-mapping-jcpo-2021", name: "Mapping the money for Zambia's cervical cancer control programme",
    journal: "Journal of Cancer Policy", year: 2021, doi: "10.1016/j.jcpo.2021.100281", pmid: "35559910", authors: "Lombe D, Msadabwe S, Maka M, et al.", paperType: "observational",
    tldr: "A resource mapping by Zambia's national cervical cancer sub-committee found 59% of projected spending going to prevention, 14% to diagnosis, treatment and palliation, and 0.7% to research.",
    summary: "Published as \"Zambia cervical cancer control program resource mapping: Leveraging support to achieve the 90-70-90 elimination target\". The sub-committee had stakeholders fill in an adapted tool on projected spending over four years and compared the result with the cervical cancer control costing report for 2019 to 2023.",
    findings: [
      "59% of resources were allocated to prevention and 14% to diagnosis, treatment and palliation; research received 0.7%.",
      "By level, 45% went to the central level, 40% to secondary and 12% to primary.",
      "The secondary prevention to tertiary treatment ratio was 4:1 in projections against about 2:1 in budgeted costs.",
    ],
    whatItMeans: "Shows where cervical cancer money was planned to go, and that treatment received far less than prevention.",
    caveats: ["Projected allocations reported by stakeholders, not audited spending."],
    institutions: ["zambia-ministry-of-health", "cancer-diseases-hospital-lusaka"], cancers: ["cervical"],
    links: [doi("10.1016/j.jcpo.2021.100281", "J Cancer Policy 2021"), pubmed("35559910")] }),

  p({ id: "paper-msadabwe-zambia-cancer-research-landscape-ecancer-2025", name: "Mapping cancer research in Zambia, 2012 to 2022",
    journal: "ecancermedicalscience", year: 2025, doi: "10.3332/ecancer.2025.1942", pmid: "40949475", authors: "Msadabwe S, Ng PY, Sullivan R, et al.", paperType: "review",
    tldr: "A review of 76 Zambian cancer studies published from 2012 to 2022 found most were retrospective, only one was a randomised trial, over 90% of the main funders were international, and Zambian researchers led fewer than half.",
    summary: "Published as \"Mapping the cancer research landscape across Zambia: evidence to support national cancer control planning\". A systematic review following PRISMA, followed by a consensus meeting in Ndola with 31 domestic and international stakeholders to set research priorities and strategies under the National Cancer Control Strategic Plan 2022 to 2026.",
    findings: [
      "76 studies were included; 47 (61.8%) were retrospective and one randomised controlled trial was identified.",
      "10 of the 11 most prolific funders (90.9%) were international, mainly from the United States and the United Kingdom.",
      "Zambian researchers were first authors on 43% and last authors on 45% of studies; prevention, palliative care and health economics were little studied.",
    ],
    whatItMeans: "The evidence base for cancer care in Zambia is thin and mostly funded and led from abroad, which the authors propose to change through national research priorities.",
    caveats: ["Covers published studies to 2022 only."],
    institutions: ["cancer-diseases-hospital-lusaka", "zambia-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.3332/ecancer.2025.1942", "ecancermedicalscience 2025"), pubmed("40949475")] }),

  p({ id: "paper-chisha-zamra-good-review-practices-fmed-2025", name: "How Zambia's medicines regulator reviews applications: good review practices at ZAMRA",
    journal: "Frontiers in Medicine", year: 2025, doi: "10.3389/fmed.2025.1706139", pmid: "41306499", authors: "Chisha CS, Leigh S, Siyanga M, McAuslane N, Walker S.", paperType: "observational", participants: 12,
    tldr: "Twelve of the Zambia Medicines Regulatory Authority's 16 medicine assessors answered a structured questionnaire; good review practices were in place, but target timelines were not well followed.",
    summary: "Published as \"Assessment of compliance with good review practices by medicine assessors within the Zambia medicines regulatory authority\". The Centre for Innovation in Regulatory Science's good review practices questionnaire was completed by ZAMRA's scientific reviewers.",
    findings: [
      "12 of 16 assessors took part; 5 (42%) said good review practices had been implemented and fully adopted across the agency.",
      "All reported a consistent method for documenting practices needing improvement, but most thought the framework could be improved.",
      "Target timelines were not well followed at department or agency level.",
    ],
    whatItMeans: "An inside view of the regulator's review process, written as ZAMRA works towards WHO maturity level 3.",
    caveats: ["Self-reported by the Authority's own assessors; two of the five authors give ZAMRA as an affiliation."],
    institutions: ["zamra-zambia"],
    links: [doi("10.3389/fmed.2025.1706139", "Front Med 2025"), pubmed("41306499")] }),
];

/** Records behind /countries/zm/ (wave 10). */
export const recordsZM: EntityInput[] = [...institutions, ...papers];
