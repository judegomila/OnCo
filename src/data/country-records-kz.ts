import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Kazakhstan: the public bodies and papers behind /countries/kz/ (wave 7) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Kazakh Institute of Oncology and Radiology's
 * "Indicators of the oncology service of the Republic of Kazakhstan, 2023" (PDF text, 414 pages, in Kazakh, Russian and
 * English), the institute's home and contact pages, the Comprehensive Plan to Fight Cancer 2023 to 2027 (Government
 * decree No. 874 of 5 October 2023, in the edition of decree No. 864 of 1 October 2026, read on zakon.uchet.kz), the
 * Code on public health and the health care system (articles 196 and 200), the Ministry of Health's news page of
 * 17 September 2026, WHO's announcement of 9 April 2026 on Kazakhstan's maturity level 3, and the National Center for
 * Expertise of Medicines and Medical Devices' own web application (its address and name, read from the page bundle).
 * DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the institute, the regulator and the national oncology centre; the institute links
 * its five papers through keyPapers. The Social Health Insurance Fund has no record here because its website (fms.kz)
 * could not be reached; it is described on the page from the Code and the cancer plan. Coordinates are approximate
 * city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const INDICATORS_2023 = "https://onco.kz/nauka/docs/korsetkish/pokazateli_2023.pdf";
const INDICATORS_PAGE = "https://onco.kz/oncohelp/pokazateli.html";
const PLAN_2023 = "https://zakon.uchet.kz/rus/docs/P2300000874";
const MOH_SEPT_2026 = "https://www.gov.kz/memleket/entities/dsm/press/news/details/1293737?lang=ru";
const WHO_ML3 = "https://www.who.int/news/item/09-04-2026-kazakhstan-becomes-first-country-in-central-asia-to-earn-who-recognition-for-regulation-of-medicines-and-imported-vaccines";
const HEALTH_CODE = "https://zakon.uchet.kz/rus/docs/K2000000360";

const KAZIOR_PAPERS = [
  "paper-ishkinin-covid-screening-sites-kazakhstan-fonc-2024",
  "paper-semenova-breast-screening-kazakhstan-ijerph-2026",
  "paper-akhmedullin-cancer-mortality-kazakhstan-bmc-cancer-2024",
  "paper-aimagambetova-cervical-screening-central-asia-jms-2021",
  "paper-dyussupov-semipalatinsk-cancer-mortality-ijerph-2026",
];

const institutions: InstitutionInput[] = [
  i({ id: "kazakhstan-ministry-of-health", name: "Ministry of Health of the Republic of Kazakhstan", aka: ["Ministry of Health Kazakhstan", "MoH Kazakhstan", "Минздрав РК", "Министерство здравоохранения Республики Казахстан"],
    city: "Astana", country: "KZ", lat: 51.13, lng: 71.43, institutionType: "government", website: "https://www.gov.kz/memleket/entities/dsm",
    tldr: "Kazakhstan's health ministry. It runs the Comprehensive Plan to Fight Cancer 2023 to 2027, sets the national screening programme, and says cancer treatment for citizens is paid by the state within the guaranteed volume of free medical care.",
    summary: "The Ministry of Health is responsible for the Comprehensive Plan to Fight Cancer in the Republic of Kazakhstan for 2023 to 2027, approved by Government decree No. 874 of 5 October 2023 and rewritten by decree No. 864 of 1 October 2026. The plan follows the Comprehensive Plan for 2018 to 2022 (decree No. 395 of 29 June 2018), during which, it says, cancer mortality fell by 15%, from 78.1 to 66.8 per 100,000. Its five directions are prevention, early diagnosis, specialised treatment, palliative care and rehabilitation, and science and workforce, and its financing table totals 460,670.4 million tenge over five years. Its targets for 2027 are 35% of cancers found at stage 0 or I, radiotherapy for 53% of patients, mortality of 64.5 per 100,000 and five-year survival of 60%. The coordinates are an approximate Astana city point.\n\nThe Ministry's order No. ҚР ДСМ-174/2020 sets the target groups for screening: mammography every two years for women aged 40 to 76, cervical cytology every four years for women aged 30 to 74 and a faecal occult blood test every two years for men and women aged 50 to 76, all within the guaranteed volume of free medical care. On 17 September 2026 the Ministry said cancer treatment for citizens is provided at the state's expense, that 150 anticancer medicines are available (102 chemotherapy, 45 targeted and 3 immuno-oncology), that more than 55,000 people a year receive anticancer drug treatment, and that outpatient consultations and tests for suspected cancer follow a \"green corridor\" with a limit of 18 working days.",
    programs: ["Comprehensive Plan to Fight Cancer 2023 to 2027", "Comprehensive Plan to Fight Cancer 2018 to 2022", "National cancer screening programme (order ҚР ДСМ-174/2020)", "Green corridor for suspected cancer (18 working days)", "Guaranteed volume of free medical care"],
    institutions: ["kazior", "kazakhstan-ncemmd", "kazakhstan-nnoc", "who", "iaea", "iarc"],
    cancers: ["breast-cancer", "lung-cancer", "gastric", "colorectal", "cervical"], related: ["global-oncology-access", "cancer-registries-surveillance"],
    links: [
      { label: "Comprehensive Plan to Fight Cancer 2023 to 2027 (Government decree No. 874, edition of 1 October 2026, Russian)", url: PLAN_2023 },
      { label: "Ministry of Health: more than 55,000 people a year receive anticancer treatment free (17 September 2026, Russian)", url: MOH_SEPT_2026 },
      { label: "Order ҚР ДСМ-174/2020 on screening target groups (Russian)", url: "https://zakon.uchet.kz/rus/docs/V2000021572" },
      { label: "Code on public health and the health care system, article 196 (Russian)", url: HEALTH_CODE },
    ] }),

  i({ id: "kazior", name: "Kazakh Institute of Oncology and Radiology (KazIOR)", aka: ["KazIOR", "KazNIIOiR", "КазНИИОиР", "Казахский научно-исследовательский институт онкологии и радиологии", "Kazakh Research Institute of Oncology and Radiology"],
    city: "Almaty", country: "KZ", lat: 43.24, lng: 76.9, institutionType: "research-institute", website: "https://onco.kz",
    tldr: "Kazakhstan's national cancer research institute in Almaty, founded in 1960. It treats patients, coordinates the country's cancer service and publishes the yearly national cancer statistics drawn from the Electronic Register of Cancer Patients.",
    summary: "The institute was founded on 5 July 1960 under the Ministry of Health of the Kazakh SSR, according to its own website, and is a joint-stock company at 91 Abay Avenue, Almaty; the coordinates are an approximate Almaty point. It gives specialised and high-technology care in oncology, radiation therapy and children's oncology within the guaranteed volume of free medical care, and trains residents.\n\nEach year it publishes \"Indicators of the oncology service of the Republic of Kazakhstan\", edited by D. R. Kaidarova, from the Electronic Register of Cancer Patients (EROB), in which every region registers people diagnosed with cancer by place of residence. The 2023 edition (published 2024, 414 pages) counts 37,038 new cancers excluding skin cancer, a crude rate of 186.1 per 100,000 and a standardised rate of 159.6; 12,958 cancer deaths in the register (13,358 in official death statistics); 218,186 people under observation at the end of 2023; and 117,616 of them observed for five years or more, 55.4% of the total, which the service reports as five-year survival. It states that the Kazakh register is the first in Central Asia recognised by IARC. The edition also reports radiotherapy reaching 36.1% of new patients in 2023 and 2,687,960 people screened.",
    programs: ["Indicators of the oncology service of the Republic of Kazakhstan (yearly, since at least 2015)", "Electronic Register of Cancer Patients (EROB) analysis", "Residency in oncology and radiation therapy", "Patient support service"],
    institutions: ["kazakhstan-ministry-of-health", "iarc"],
    cancers: ["breast-cancer", "lung-cancer", "gastric", "colorectal", "cervical", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: KAZIOR_PAPERS,
    links: [
      { label: "KazIOR: Indicators of the oncology service of the Republic of Kazakhstan, 2023 (PDF, Russian and Kazakh)", url: INDICATORS_2023 },
      { label: "KazIOR: all published editions of the indicators, 2015 to 2023", url: INDICATORS_PAGE },
      doi("10.52532/20-09-2024-1-410", "Indicators of the oncology service of the Republic of Kazakhstan, 2023 (DOI)"),
      { label: "KazIOR: home page (Kazakh)", url: "https://onco.kz/" },
    ] }),

  i({ id: "kazakhstan-ncemmd", name: "National Center for Expertise of Medicines and Medical Devices (Kazakhstan)", aka: ["NCEMMD", "NDDA", "NCELS", "НЦЭЛС", "Национальный центр экспертизы лекарственных средств и медицинских изделий"],
    city: "Astana", country: "KZ", lat: 51.16, lng: 71.43, institutionType: "government", website: "https://www.ndda.kz",
    tldr: "Kazakhstan's medicines evaluation centre. With the Ministry of Health's Committee for Medical and Pharmaceutical Control it evaluates and authorises medicines, and in April 2026 WHO rated Kazakhstan's regulatory system at maturity level 3.",
    summary: "The National Center for Expertise of Medicines and Medical Devices is a state enterprise of the Ministry of Health; its website gives its address as 13 Amangeldy Imanov Street, Astana (the coordinates are an approximate city point). WHO describes Kazakhstan's regulatory system as led by the Ministry of Health and implemented through the Committee for Medical and Pharmaceutical Control and this centre, which together oversee medicines and vaccines from evaluation and authorisation to market surveillance and safety monitoring.\n\nOn 9 April 2026 WHO announced that Kazakhstan had reached maturity level 3 under its Global Benchmarking Tool for the regulation of medicines and imported vaccines, the first country in Central Asia to do so. Kazakhstan registers medicines under the common rules of the Eurasian Economic Union; Forbes Kazakhstan reported in June 2021 that national registration would end on 1 July 2021 and that registrations issued under national law would lapse at the end of the transition on 1 January 2026. Under article 196 of the Code on public health, medicines used in free care must be registered in Kazakhstan and included in the Kazakhstan National Drug Formulary, with exceptions for a named patient's vital need.",
    programs: ["Evaluation of medicines and medical devices for registration", "Eurasian Economic Union registration procedure", "Pharmacovigilance"],
    institutions: ["kazakhstan-ministry-of-health", "who"],
    links: [
      { label: "WHO: Kazakhstan becomes first country in Central Asia to earn WHO recognition for regulation of medicines and imported vaccines (9 April 2026)", url: WHO_ML3 },
      { label: "NCEMMD: website (Russian, Kazakh, English)", url: "https://www.ndda.kz" },
      { label: "Forbes Kazakhstan: national procedure for medicines evaluation only until 1 July (19 June 2021, Russian)", url: "https://forbes.kz/news/newsid_252323" },
    ] }),

  i({ id: "kazakhstan-nnoc", name: "National Scientific Oncology Center (Astana)", aka: ["NNOC", "ННОЦ", "Национальный научный онкологический центр", "National Research Oncology Center"],
    city: "Astana", country: "KZ", lat: 51.12, lng: 71.45, institutionType: "cancer-center",
    tldr: "A national oncology centre in Astana, one of three national organisations treating children with cancer, and a lead body in the 2023 to 2027 cancer plan for radiotherapy equipment, blood cancer reference laboratories and children's PET/CT.",
    summary: "The cancer plan for 2023 to 2027 names the National Scientific Oncology Center (a limited liability partnership, ТОО \"ННОЦ\") in Astana as one of three national organisations giving cancer care to children, with the Scientific Center of Pediatrics and Pediatric Surgery in Almaty and the National Scientific Center of Maternity and Childhood. The coordinates are an approximate Astana city point.\n\nThe plan makes it a co-executor of the installation of linear accelerators, brachytherapy and planning equipment and of proton therapy, of reference laboratories for diagnosing cancers of the blood and blood-forming organs (flow cytometry, immunohistochemistry and molecular genetics), of changes to give children wider access to PET/CT at the centre, and of training in new diagnostic and treatment technologies. The plan notes that the country had no reference oncohaematology laboratory and that samples were sent to Russia to confirm diagnoses. The Ministry of Health said in September 2026 that the first proton therapy centre in Central Asia opened in Kazakhstan in 2025; OnCo did not confirm from a primary source which centre houses it.",
    programs: ["Children's cancer care (national level)", "Blood cancer reference laboratories (plan 2023 to 2027)", "Radiotherapy and proton therapy equipment (plan 2023 to 2027)"],
    institutions: ["kazakhstan-ministry-of-health"],
    cancers: ["childhood-cancers"],
    links: [
      { label: "Comprehensive Plan to Fight Cancer 2023 to 2027, analysis and actions 29 and following (Russian)", url: PLAN_2023 },
      { label: "Ministry of Health: anticancer treatment, PET/CT and proton therapy (17 September 2026, Russian)", url: MOH_SEPT_2026 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ishkinin-covid-screening-sites-kazakhstan-fonc-2024", name: "COVID-19 and the epidemiology of breast, cervical, colon and rectal cancer in Kazakhstan, 2017 to 2022",
    journal: "Frontiers in Oncology", year: 2024, doi: "10.3389/fonc.2024.1481242", pmid: "39950102", authors: "Ishkinin Y, Kaidarova D, Nazarbek S, et al.", paperType: "observational",
    tldr: "Using national oncology service data, the authors found that detection of breast, cervical and colon cancer fell during the COVID-19 restrictions, with different patterns for people diagnosed before and after age 50.",
    summary: "Published as \"COVID-19 pandemic shifted epidemiology for cancer screening sites: breast, cervix, colon, and rectum\". The study used data from the oncological service of the Republic of Kazakhstan for 2017 to 2022, comparing early-onset cancers (diagnosed at ages 20 to 49) with late-onset cancers (50 and over) for the four cancers covered by screening, and calculated annual and average annual percentage changes.",
    findings: [
      "Breast cancer detection rose by 22.8% for early-onset and 15.9% for late-onset cancer from 2017 to 2022, but fell by 6.1% and 15.6% during the COVID-19 restriction period.",
      "Cervical cancer detection rose by 2.3% (early onset) and 7.5% (late onset) over the period, and fell by 11.3% and 3.1% during the restrictions.",
      "Colon cancer detection fell during the restrictions by 14.4% (early onset) and 5.8% (late onset); rectal cancer detection rose by 18.6% for early-onset and fell by 12.0% for late-onset cancer.",
    ],
    whatItMeans: "The pandemic interrupted screening and diagnosis in Kazakhstan, and some cancers missed in 2020 and 2021 may have been found later and at a later stage.",
    caveats: ["Detection rates from routine service data, not a survival analysis; the abstract does not give stage."],
    institutions: ["kazior"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.3389/fonc.2024.1481242", "Front Oncol 2024"), pubmed("39950102")] }),

  p({ id: "paper-semenova-breast-screening-kazakhstan-ijerph-2026", name: "Evaluation of Kazakhstan's national breast cancer screening programme since 2008",
    journal: "International Journal of Environmental Research and Public Health", year: 2026, doi: "10.3390/ijerph23040532", pmid: "42074470", authors: "Semenova Y, Burkitbayev Z, Shalekenov S, et al.", paperType: "observational",
    tldr: "Kazakhstan's breast screening programme, begun in 2008 and widened to women aged 40 to 70 in 2018, screens more women each year but a falling share of those eligible, and its introduction and expansion were not followed by significant changes in national incidence or mortality.",
    summary: "Published as \"Evaluation of a National Breast Cancer Screening Program in a Middle-Income Country: The Case of Kazakhstan\". The authors analysed legislation, analytical reports on screening and cancer reporting forms to evaluate the programme's outputs, outcomes and spending from 2008, summarising trends with the average annual percent change.",
    findings: [
      "The number of women screened grew with an average annual percent change of 6.23%, but the proportion of eligible women covered declined, particularly after the target ages were widened in 2018.",
      "Stage I breast cancers found by screening were only about 50% of all stage I cases diagnosed nationally, and screening contributed under 30% of stage II cancers.",
      "Neither the introduction nor the expansion of the programme was associated with statistically significant immediate or trend changes in national breast cancer incidence or mortality.",
    ],
    whatItMeans: "Screening reaches many women in Kazakhstan, but on these data it has not yet shown a measurable effect on national breast cancer deaths, and coverage of the eligible population is falling.",
    caveats: ["Administrative data; an interrupted time series cannot separate the programme from other changes in care."],
    institutions: ["kazior", "kazakhstan-ministry-of-health"], cancers: ["breast-cancer"],
    links: [doi("10.3390/ijerph23040532", "Int J Environ Res Public Health 2026"), pubmed("42074470")] }),

  p({ id: "paper-akhmedullin-cancer-mortality-kazakhstan-bmc-cancer-2024", name: "Cancer mortality trends in Kazakhstan, 2014 to 2022, from the national electronic health system",
    journal: "BMC Cancer", year: 2024, doi: "10.1186/s12885-024-13128-2", pmid: "39482619", authors: "Akhmedullin R, Aimyshev T, Zhakhina G, et al.", paperType: "observational", participants: 123622,
    tldr: "Across 123,622 cancer deaths recorded in 2014 to 2022, lung, stomach and colorectal cancer caused over a third; mortality fell in people aged 45 to 74 but rose in adults aged 18 to 44.",
    summary: "Published as \"In-depth analysis and trends of cancer mortality in Kazakhstan: a joinpoint analysis of nationwide healthcare data 2014-2022\". The authors used Kazakhstan's Unified National Electronic Health System and joinpoint regression to estimate average annual percent changes in cancer mortality, and also examined mortality-to-incidence ratios.",
    findings: [
      "123,622 cancer death reports were analysed; trachea, bronchus and lung (16.01%), stomach (11.43%) and colon and rectum (10.05%) together caused 37.48% of cancer deaths.",
      "Mortality rose in people aged 18 to 44 (average annual change 1.36%) and fell in those aged 45 to 59 (minus 2.02%) and 60 to 74 (minus 2.10%).",
      "Oesophageal cancer mortality fell in women and men, ovarian cancer mortality rose by 0.95% a year, and the Kyzylorda region showed a pronounced increase.",
    ],
    whatItMeans: "Cancer mortality in Kazakhstan was broadly stable to falling over 2014 to 2022, but younger adults, ovarian cancer and some regions need attention.",
    caveats: ["Routine health system data; the mortality-to-incidence ratio rose during the COVID-19 years, when diagnosis was disrupted."],
    institutions: ["kazior"], cancers: ["lung-cancer", "gastric", "colorectal"],
    links: [doi("10.1186/s12885-024-13128-2", "BMC Cancer 2024"), pubmed("39482619")] }),

  p({ id: "paper-aimagambetova-cervical-screening-central-asia-jms-2021", name: "Cervical cancer screening and prevention in Kazakhstan and Central Asia",
    journal: "Journal of Medical Screening", year: 2021, doi: "10.1177/0969141320902482", pmid: "31980007", authors: "Aimagambetova G, Chan CK, Ukybassova T, et al.", paperType: "review",
    tldr: "Of the five Central Asian countries once part of the Soviet Union, the authors found only Kazakhstan running a structured cytology screening programme for cervical cancer; elsewhere screening is mainly opportunistic.",
    summary: "The review examined cervical screening and prevention in Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan and Uzbekistan, where cervical cancer incidence and mortality are far higher than in most Western and high-income countries.",
    findings: [
      "Cervical screening is available in all five countries but is mainly opportunistic.",
      "Only Kazakhstan has a structured cytological screening programme from which coverage can be analysed.",
      "The authors attribute the persisting burden to poorly organised screening and the absence of vaccination programmes.",
    ],
    whatItMeans: "Kazakhstan's organised cytology screening sets it apart in its region, but at the time of writing it had no HPV vaccination programme; WHO's data record a nationwide introduction in 2024.",
    caveats: ["A narrative review written before Kazakhstan introduced HPV vaccination nationally."],
    institutions: ["kazior"], cancers: ["cervical"],
    links: [doi("10.1177/0969141320902482", "J Med Screen 2021"), pubmed("31980007")] }),

  p({ id: "paper-dyussupov-semipalatinsk-cancer-mortality-ijerph-2026", name: "Radiation exposure and cancer mortality around the Semipalatinsk nuclear test site",
    journal: "International Journal of Environmental Research and Public Health", year: 2026, doi: "10.3390/ijerph23081037", pmid: "42652352", authors: "Dyussupov A, Kissina R, Chaizhunussova N, et al.", paperType: "observational", participants: 2192,
    tldr: "Among people living near the former Semipalatinsk nuclear test site, cancer mortality was higher in exposed districts than in a low-dose district, and the risk rose with radiation dose.",
    summary: "Published as \"Radiation Exposure and Cancer Mortality in Populations Living Around the Semipalatinsk Nuclear Test Site in Kazakhstan\". The study used the mortality sub-register of the population living near the test site, comparing residents of the Abay (1,300) and Beskaragay (414) districts with 478 residents of the Kokpekty district, where doses were minimal.",
    findings: [
      "The median effective dose was 864 mSv in the exposed group and 67 mSv in the control group.",
      "Relative risks of cancer mortality were highest in 1965 to 1969 and 1970 to 1974 (both 6.14), and age-standardised mortality was significantly higher in the exposed group.",
      "Each 10 mSv increase in dose was associated with a 0.9% higher risk of cancer death (odds ratio 1.009).",
    ],
    whatItMeans: "The legacy of nuclear testing in north-east Kazakhstan is still measurable in cancer deaths among the people who lived near the site.",
    caveats: ["A small cohort from one sub-register; the abstract does not say how other causes of cancer were accounted for."],
    institutions: ["kazior"], cancers: [],
    links: [doi("10.3390/ijerph23081037", "Int J Environ Res Public Health 2026"), pubmed("42652352")] }),
];

/** Records behind /countries/kz/ (wave 7). */
export const recordsKZ: EntityInput[] = [...institutions, ...papers];
