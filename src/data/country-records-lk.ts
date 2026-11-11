import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Sri Lanka: the public bodies and papers behind /countries/lk/ (wave 6) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the National Cancer Control Programme's pages (history,
 * treatment centres, cancer incidence data) and PDFs (Cancer Incidence and Mortality Data Sri Lanka 2022, published
 * November 2025; the Annual Report 2024, published November 2025; the National Strategic Plan on Prevention and
 * Control of Cancer 2020 to 2024), the National Medicines Regulatory Authority's About Us and Clinical Trials pages and
 * its clinical trial guideline (GL-019, version 5) and pricing guideline (GL-033, version 1.1), and the National Cancer
 * Institute Maharagama's own pages. DOIs were resolved through Europe PMC and the figures in `findings` are taken from
 * the indexed abstracts.
 *
 * Inbound links: the Ministry links the programme, the regulator and the National Cancer Institute; the programme links
 * the registry and the Ministry; the registry links its papers through keyPapers; the National Cancer Institute links
 * its two hospital-based registry papers. The corpus held no Sri Lankan institution before this file. Coordinates are
 * approximate district points in Colombo and Maharagama, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCCP = "https://www.nccp.health.gov.lk/en";
const NCCP_HISTORY = "https://www.nccp.health.gov.lk/en/history";
const NCCP_DATA = "https://www.nccp.health.gov.lk/en/incedenceData";
const NCCP_CENTRES = "https://www.nccp.health.gov.lk/en/treatmentCenter";
const CID_2022 = "https://www.nccp.health.gov.lk/storage/post/pdfs/cancer_incidence_and_mortality_data_sri_lanka_2022.pdf";
const AR_2024 = "https://www.nccp.health.gov.lk/storage/post/pdfs/Final%20Annual%20Report%202024.pdf";
const NSP_2020 = "https://www.nccp.health.gov.lk/storage/post/pdfs/National%20Strategic%20Plan%20on%20Prevention%20and%20Control%20of%20Cancer%20in%20Sri%20Lanka%20(2020-2024).pdf";
const PBCR_COLOMBO = "https://www.nccp.health.gov.lk/storage/post/pdfs/PCBR%20Books.pdf";
const NMRA_ABOUT = "https://www.nmra.gov.lk/about-us";
const NMRA_CT = "https://www.nmra.gov.lk/pages/clinical-trials";
const NMRA_CT_GL = "https://cdn.prod.website-files.com/666d0695ca3ba7fa496a5068/66b49ba870914dff8621a8cb_Clinical_trial_guideline_version_5-_final.pdf";
const NMRA_PRICING_GL = "https://cdn.prod.website-files.com/666d0695ca3ba7fa496a5068/6881d57a674db1c8250c7cf7_Version%201_Guideline%20on%20Pricing%20Mechanism%20for%20Medicines%20in%20SL%20%20Final_V1.1%202025%2007%2024.pdf";
const NCI_ABOUT = "https://www.ncisl.health.gov.lk/?page_id=469";
const NCI_HOME = "https://www.ncisl.health.gov.lk/";
const NCI_STATS = "https://www.ncisl.health.gov.lk/?page_id=109";

const institutions: InstitutionInput[] = [
  i({ id: "sri-lanka-ministry-of-health", name: "Ministry of Health and Mass Media, Sri Lanka", aka: ["Ministry of Health Sri Lanka", "MoH Sri Lanka"],
    city: "Colombo", country: "LK", lat: 6.92, lng: 79.87, institutionType: "government", website: "https://www.health.gov.lk/",
    tldr: "Sri Lanka's health ministry. It runs the state hospitals where cancer care is free at the point of delivery, and its National Cancer Control Programme coordinates cancer control and the national cancer registry.",
    summary: "The Ministry of Health, styled the Ministry of Health and Mass Media on its website and in the 2022 national cancer registry report, runs Sri Lanka's state health system. Cancer care in that system is free at the point of delivery, as researchers who costed novel cancer drugs with Ministry procurement prices describe it, and the National Cancer Institute at Maharagama says anyone can use its services free of charge. The coordinates on this record are an approximate Colombo city point.\n\nCancer control sits under the Deputy Director General for Non-Communicable Diseases, through the National Cancer Control Programme (established in 1980) and the National Advisory Committee on Prevention and Control of Cancers. The Ministry's National Strategic Plan on Prevention and Control of Cancer 2020 to 2024 counted 49 board-certified clinical oncologists (44 in the public sector), radiotherapy in seven centres of excellence and 33 functional mammography units. Its Medical Statistics Unit reported 5,734 cancer deaths in government hospitals in 2022.\n\nFrom April 2022 Sri Lanka's economic crisis limited imports of medicines: WHO reported that 150 essential medicines, including cancer chemotherapy drugs, were out of stock in October 2022, and in January 2023 that Sri Lanka faced a funding gap of 220 million US dollars against an annual import budget of 300 million for medicines and surgical consumables.",
    programs: ["National Cancer Control Programme (from 1980)", "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024", "National Cervical Cancer Screening Programme (Family Health Bureau, from 1996)", "HPV vaccination in the national immunisation programme (coverage reported to WHO from 2017)"],
    institutions: ["nccp-sri-lanka", "nmra-sri-lanka", "apeksha-hospital-maharagama", "who", "iarc", "iaea"],
    cancers: ["breast-cancer", "oral-cavity-cancer", "cervical"], related: ["global-oncology-access"],
    keyPapers: ["paper-joseph-novel-cancer-drugs-budget-impact-sri-lanka-ecancer-2025", "paper-joseph-perioperative-nsclc-cost-effectiveness-sri-lanka-bmjonc-2026", "paper-nilaweera-economic-crisis-health-seeking-sri-lanka-bmchsr-2026"],
    links: [
      { label: "Ministry of Health and Mass Media, Sri Lanka", url: "https://www.health.gov.lk/" },
      { label: "National Strategic Plan on Prevention and Control of Cancer in Sri Lanka 2020 to 2024 (PDF)", url: NSP_2020 },
      { label: "WHO: Sri Lanka, outbreak and crisis response appeal 2023", url: "https://www.who.int/emergencies/funding/outbreak-and-crisis-response-appeal-2023/2023-appeals/appeal-sri-lanka" },
      { label: "WHO Sri Lanka: WHO delivers essential medicines and supplies (24 January 2023)", url: "https://www.who.int/srilanka/news/detail/24-01-2023-who-delivers-essential-medicines-and-supplies-to-help-sustain-vital-health-services-for-crisis-response-and-beyond" },
    ] }),

  i({ id: "nccp-sri-lanka", name: "National Cancer Control Programme, Sri Lanka (NCCP)", aka: ["NCCP Sri Lanka", "National Cancer Control Program Sri Lanka"],
    city: "Colombo", country: "LK", lat: 6.89, lng: 79.88, institutionType: "government", website: NCCP,
    tldr: "The Ministry of Health's focal point for cancer prevention and control in Sri Lanka, set up in 1980. It runs the national cancer registry, the cancer early detection centres and the national cancer plans.",
    summary: "The National Cancer Control Programme was established in 1980 on the recommendation of a World Health Organization team, and describes itself as the national focal point for prevention and control of cancers, responsible for policy, advocacy, monitoring and evaluation, cancer surveillance and research. It sits under the Non-Communicable Disease Bureau of the Ministry of Health, at the Public Health Complex, Narahenpita, Colombo 5; the coordinates are an approximate district point.\n\nIts Annual Report 2024 lists five technical units: prevention and early detection, oral cancer prevention and control, diagnosis and treatment, palliative care, and strategic information management, which runs the national cancer registry. It opened the Cancer Early Detection Centre at Narahenpita in 2004; in 2024 that centre saw 3,203 patients, 96% of them women, and did 1,009 mammograms and 583 HPV DNA tests between May and December. By 2024 there were 26 breast clinics in secondary and tertiary hospitals. The programme's roadmap records IAEA and WHO imPACT reviews in 2008 and 2019.\n\nThe 2024 report says there is an unusual waiting list and long delay in cancer services with respect to diagnosis and timely treatment all over the country, with specialised facilities concentrated in Apeksha Hospital and a few major hospitals. The National Strategic Plan 2020 to 2024 was the programme's latest plan; 2024 was its final year.",
    programs: ["National Cancer Registry", "Population-based cancer registry, Colombo district (from 2012)", "Cancer Early Detection Centre, Narahenpita (from 2004)", "Breast clinics in secondary and tertiary hospitals (26 by 2024)", "Oral cancer and oral potentially malignant disorder surveillance (from 2012)", "National Strategic Plan on Prevention and Control of Cancer 2020 to 2024", "National Strategic Plan on Childhood and Adolescent Cancer Care 2021 to 2025"],
    institutions: ["sri-lanka-national-cancer-registry", "sri-lanka-ministry-of-health", "apeksha-hospital-maharagama", "iarc", "iaea", "who"],
    cancers: ["breast-cancer", "oral-cavity-cancer", "cervical", "childhood-cancers"], related: ["oral-visual-screening", "cancer-registries-surveillance"],
    keyPapers: ["paper-perera-hpv-prevalence-kalutara-bmcmed-2025"],
    links: [
      { label: "NCCP: history of the National Cancer Control Programme", url: NCCP_HISTORY },
      { label: "NCCP: Annual Report 2024 (PDF, November 2025)", url: AR_2024 },
      { label: "National Strategic Plan on Prevention and Control of Cancer in Sri Lanka 2020 to 2024 (PDF)", url: NSP_2020 },
      { label: "NCCP: cancer treatment centres of Sri Lanka", url: NCCP_CENTRES },
    ] }),

  i({ id: "sri-lanka-national-cancer-registry", name: "National Cancer Registry, Sri Lanka", aka: ["Sri Lanka National Cancer Registry", "SLNCR", "National Cancer Registry Programme Sri Lanka"],
    city: "Colombo", country: "LK", lat: 6.891, lng: 79.879, institutionType: "research-institute", website: NCCP_DATA,
    tldr: "Sri Lanka's national cancer registry, run by the National Cancer Control Programme since the 1980s. Its 24th report counted 35,855 new cancers in 2022, gathered from 25 state cancer centres, pathology laboratories and oral surgery units.",
    summary: "The National Cancer Registry is run by the Strategic Information Management Unit of the National Cancer Control Programme, whose first national cancer incidence publication used data for 1985. It collects newly diagnosed cancers at the point of treatment (25 government cancer treatment centres in 2022, using the National Cancer Surveillance Form H 1256 and the IARC software CanReg5), at the point of diagnosis (68 histopathology, 34 haematology and 3 oral pathology laboratories reporting passively for 2022, four of them private) and from 34 oral and maxillofacial surgery units. Cause-of-death data come from the Registrar General's Department, latest published for 2020. The coordinates are the programme's approximate location.\n\nIts 24th report, Cancer Incidence and Mortality Data Sri Lanka 2022, published in November 2025, counted 35,855 new cancers (16,398 in men, 19,457 in women), an age-standardised rate of 143.7 per 100,000; 96.7% were diagnosed microscopically and 2.0% from a death certificate only. Stage was recorded for 41% of breast, 30% of cervical and 30% of lip, tongue and mouth cancers. The Deputy Director General's message notes a delay in generating the registry's publications.\n\nA population-based registry for Colombo district began with 2012 data; its second report covers 2013 to 2019. IARC and its regional hub in Mumbai give technical support, and Vital Strategies has supported population-based registries in selected districts.",
    programs: ["National cancer incidence reports (24 editions, latest for 2022)", "Population-based cancer registry, Colombo district", "Childhood Cancer Registry (first report November 2021)", "Hospital-based cancer registries (from 2022)"],
    institutions: ["nccp-sri-lanka", "iarc"], cancers: ["breast-cancer", "oral-cavity-cancer", "thyroid", "colorectal", "non-hodgkin-lymphoma"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-alvitigala-lymphoma-trends-sri-lanka-canep-2025", "paper-sawant-rupantaran-sri-lanka-registry-ecancer-2023"],
    links: [
      { label: "NCCP: Cancer Incidence and Mortality Data Sri Lanka 2022 (PDF, November 2025)", url: CID_2022 },
      { label: "NCCP: cancer incidence data, all editions", url: NCCP_DATA },
      { label: "NCCP: Cancer Incidence and Mortality Data, Colombo District 2013 to 2019 (PDF, scanned)", url: PBCR_COLOMBO },
      doi("10.3332/ecancer.2023.1553", "Sawant et al., Rupantaran software for the Sri Lankan registry (ecancermedicalscience 2023)"),
    ] }),

  i({ id: "nmra-sri-lanka", name: "National Medicines Regulatory Authority, Sri Lanka (NMRA)", aka: ["NMRA", "NMRA Sri Lanka", "National Medicine Regulatory Authority"],
    city: "Colombo", country: "LK", lat: 6.92, lng: 79.855, institutionType: "government", website: "https://www.nmra.gov.lk/",
    tldr: "Sri Lanka's medicines regulator, set up by the NMRA Act No. 5 of 2015. It registers medicines, approves clinical trials through its Clinical Trials Evaluation Committee, and sets maximum retail prices.",
    summary: "The National Medicines Regulatory Authority was established by the National Medicines Regulatory Authority Act, No. 5 of 2015, certified on 19 March 2015, which replaced the Cosmetics, Devices and Drugs Act, No. 27 of 1980. It describes itself as an independent authority in the Ministry of Health, governed by a board that has no involvement in regulatory decisions; those rest with the Chief Executive Officer, staff and expert committees. It regulates medicines, medical devices, borderline products, clinical trials, cosmetics and pharmacies, and the National Medicines Quality Assurance Laboratory works under it. Its office is in Colombo 2; the coordinates are approximate.\n\nIts Guideline for the Conduct of Clinical Trials (GL-019, version 5, effective 15 October 2022) requires approval from the Clinical Trials Evaluation Committee and a recognised ethics review committee, screening of applications within 7 working days, and sets 75 days for processing a clinical trial application, excluding stop-clock, with a route for priority review where there is unmet medical need.\n\nUnder Gazette Extraordinary No. 2446/34 of 21 July 2025 and its pricing guideline (GL-033, version 1.1), the Authority sets a maximum retail price for each newly registered or renewed medicine as cost, insurance and freight plus duties and taxes plus a supply chain markup, checked against external and internal reference prices, and publishes the prices monthly.",
    programs: ["Medicine registration", "Clinical trial approval (Clinical Trials Evaluation Committee)", "Maximum retail price setting (GL-033)", "Pharmacovigilance", "National Medicines Quality Assurance Laboratory"],
    institutions: ["sri-lanka-ministry-of-health"],
    links: [
      { label: "NMRA: about us", url: NMRA_ABOUT },
      { label: "NMRA: clinical trials", url: NMRA_CT },
      { label: "NMRA: Guideline for the Conduct of Clinical Trials in Sri Lanka, GL-019 version 5 (PDF)", url: NMRA_CT_GL },
      { label: "NMRA: Guideline on Pricing Mechanism for Medicines in Sri Lanka, GL-033 version 1.1 (PDF)", url: NMRA_PRICING_GL },
    ] }),

  i({ id: "apeksha-hospital-maharagama", name: "Apeksha Hospital Maharagama (National Cancer Institute Sri Lanka)", aka: ["Apeksha Hospital", "National Cancer Institute Sri Lanka", "NCISL", "National Cancer Institute Maharagama", "Cancer Hospital Maharagama"],
    city: "Maharagama", country: "LK", lat: 6.848, lng: 79.926, institutionType: "cancer-center", website: NCI_HOME,
    tldr: "Sri Lanka's national cancer hospital, founded in 1956 at Maharagama near Colombo. It gives surgery, chemotherapy and radiotherapy free of charge, and researchers using its registry say it sees about 40% of the country's cancer patients.",
    summary: "The National Cancer Institute of Sri Lanka, known as Apeksha Hospital, was founded in 1956 as a ten-ward radiotherapy centre and is a national hospital under the Ministry of Health. Its own pages describe it as the leading tertiary hospital for cancer treatment in Sri Lanka, offering diagnosis, surgery, chemotherapy and radiotherapy, and say anyone can use its services free of charge; it calls itself the major training centre for medical undergraduates and postgraduates of the Postgraduate Institute of Medicine. It admitted 40,500 patients in 2009, and redevelopment began in 2012 through a project sponsored by Ahmad Tea with the Ministry of Health. The coordinates are an approximate point for Maharagama.\n\nResearchers using its hospital-based registry reported that it sees approximately 40% of all cancer patients in Sri Lanka, and described over 5,100 women with breast cancer diagnosed there between 2016 and 2020 and 1,578 patients with colorectal cancer. The National Cancer Control Programme's 2024 report names it as the place where specialised cancer facilities are concentrated, forcing patients from other regions to travel long distances.",
    programs: ["Surgery, chemotherapy and radiotherapy", "Brachytherapy and radioactive iodine treatment", "Palliative care unit", "Hospital-based cancer registry", "Postgraduate oncology training"],
    institutions: ["sri-lanka-ministry-of-health", "nccp-sri-lanka"],
    cancers: ["breast-cancer", "colorectal", "thyroid"],
    keyPapers: ["paper-wijeratne-breast-cancer-hospital-registry-sri-lanka-bmccancer-2021", "paper-wijeratne-colorectal-hospital-registry-sri-lanka-jcogo-2022"],
    links: [
      { label: "National Cancer Institute Sri Lanka: about us", url: NCI_ABOUT },
      { label: "National Cancer Institute Sri Lanka: home", url: NCI_HOME },
      { label: "National Cancer Institute Sri Lanka: hospital statistics and performance reports", url: NCI_STATS },
      doi("10.1186/s12885-021-08929-8", "Wijeratne et al., breast cancer at the National Cancer Institute of Sri Lanka (BMC Cancer 2021)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-joseph-novel-cancer-drugs-budget-impact-sri-lanka-ecancer-2025", name: "Budget impact of novel cancer drugs in Sri Lanka's state health system",
    journal: "ecancermedicalscience", year: 2025, doi: "10.3332/ecancer.2025.1941", pmid: "40949479", authors: "Joseph N, Peiris V, Bamunuarachchi V, et al.", paperType: "methods",
    tldr: "Funding every eligible patient with 42 novel cancer drugs in Sri Lanka would cost almost 300 million US dollars a year; restricting them to uses that meet a cost-effectiveness threshold would cost 6 to 13.2 million.",
    summary: "Published as \"Wisely frugal: ensuring sustainable funding for novel cancer therapeutics through a budget impact analysis in resource-limited settings\". Cancer care in Sri Lanka is mostly provided by the state health system, free at the point of delivery. The authors took median survival gains for each indication of a novel cancer drug from the literature and procurement costs from the Ministry of Health, computed cost per life year gained, and applied thresholds of one and three times GDP per capita (US$3,815 and US$11,445 per life year gained).",
    findings: [
      "42 novel cancer drugs across 90 indications were analysed.",
      "Only 27 indications met the three times GDP threshold, and 18 drugs met neither threshold for any indication.",
      "Annual cost was US$6 million at the one times GDP threshold and US$13.2 million at three times; without a threshold, treating every eligible patient would cost almost US$300 million a year.",
    ],
    whatItMeans: "OnCo found no Sri Lankan national health technology assessment body for cancer drugs; this is the kind of analysis that could decide which novel drugs the free state system buys first.",
    caveats: ["Survival gains come from published trials, not Sri Lankan patients.", "Thresholds are the authors' choice; OnCo found no official Sri Lankan threshold."],
    institutions: ["sri-lanka-ministry-of-health"], cancers: ["breast-cancer", "lung-cancer"],
    links: [doi("10.3332/ecancer.2025.1941", "ecancermedicalscience 2025"), pubmed("40949479")] }),

  p({ id: "paper-joseph-perioperative-nsclc-cost-effectiveness-sri-lanka-bmjonc-2026", name: "Cost-effectiveness of perioperative novel therapies for stage II to III non-small cell lung cancer in Sri Lanka",
    journal: "BMJ Oncology", year: 2026, doi: "10.1136/bmjonc-2025-001046", pmid: "42369562", authors: "Joseph N, Kularatna S, Senanayake S.", paperType: "methods",
    tldr: "At a threshold of US$6,700 per quality-adjusted life year, adjuvant osimertinib, adjuvant alectinib and neoadjuvant nivolumab were cost-effective in Sri Lanka; at US$3,000 only the osimertinib strategies remained so.",
    summary: "A Markov cost-utility model from the Sri Lankan health system's perspective compared adjuvant, neoadjuvant, perioperative and consolidation targeted and immunotherapies for stage II to III NSCLC, with sex-specific analyses, a lifetime horizon and a 5-year budget impact for the therapies found cost-effective.",
    findings: [
      "At US$6,700 per QALY, adjuvant osimertinib after surgery and after curative chemoradiotherapy, adjuvant alectinib after surgery and neoadjuvant nivolumab were cost-effective in both men and women.",
      "At US$3,000 per QALY, only osimertinib-based strategies remained robustly cost-effective; the other therapies would need substantial price reductions.",
      "The 5-year budget impact of adopting the cost-effective therapies under full implementation was about US$11.8 million.",
    ],
    whatItMeans: "A worked example of how the free state system could rank costly lung cancer drugs and what price cuts would bring others within reach.",
    caveats: ["Model-based; conclusions were sensitive to lower, opportunity-cost-informed thresholds."],
    institutions: ["sri-lanka-ministry-of-health"], cancers: ["nsclc"],
    links: [doi("10.1136/bmjonc-2025-001046", "BMJ Oncology 2026"), pubmed("42369562")] }),

  p({ id: "paper-wijeratne-breast-cancer-hospital-registry-sri-lanka-bmccancer-2021", name: "Breast cancer patients and their treatment at Sri Lanka's National Cancer Institute, 2016 to 2020",
    journal: "BMC Cancer", year: 2021, doi: "10.1186/s12885-021-08929-8", pmid: "34732162", authors: "Wijeratne DT, Gunasekera S, Booth CM, et al.", paperType: "observational", participants: 5100,
    tldr: "Of more than 5,100 women diagnosed with breast cancer at Sri Lanka's National Cancer Institute in 2016 to 2020, two thirds had early-stage disease, and 59% of those with HER2-positive cancer received trastuzumab.",
    summary: "Published as \"Demographic, tumour, and treatment characteristics of female patients with breast cancer in Sri Lanka; results from a hospital-based cancer registry\". All women with invasive primary breast cancer diagnosed in 2016 to 2020 were identified from the breast cancer registry of the National Cancer Institute of Sri Lanka, which the authors say sees approximately 40% of all cancer patients in the country.",
    findings: [
      "Over 5,100 women were diagnosed; mean age 56; 30% had hypertension and 23% diabetes.",
      "66% of cancers were stage I or II at diagnosis; 72% were ER/PR positive and 22% HER2 positive.",
      "Chemotherapy reached 91% of women with node-positive disease, adjuvant radiotherapy 77% of eligible women, endocrine therapy 88% of eligible women, and trastuzumab 59% of women with HER2-positive cancer.",
    ],
    whatItMeans: "Most care follows guidelines, but four in ten women with HER2-positive breast cancer did not receive trastuzumab, and late diagnosis remains common.",
    caveats: ["One hospital, though a large share of the country's patients.", "Registry data; reasons for missed treatment are not given in the abstract."],
    institutions: ["apeksha-hospital-maharagama"], cancers: ["breast-cancer"],
    links: [doi("10.1186/s12885-021-08929-8", "BMC Cancer 2021"), pubmed("34732162")] }),

  p({ id: "paper-wijeratne-colorectal-hospital-registry-sri-lanka-jcogo-2022", name: "Colorectal cancer treatment and guideline concordance at Sri Lanka's National Cancer Institute",
    journal: "JCO Global Oncology", year: 2022, doi: "10.1200/GO.22.00004", pmid: "35623022", authors: "Wijeratne DT, Gunasekara S, Booth CM, et al.", paperType: "observational", participants: 1578,
    tldr: "Of 1,578 patients with colorectal cancer at Sri Lanka's National Cancer Institute in 2016 to 2020, 58% had stage III or IV disease; 82% of stage III colon cancer patients got adjuvant chemotherapy, but only 50% of stage III rectal cancer patients got neoadjuvant chemoradiotherapy.",
    summary: "Published as \"Colorectal Cancer Treatment Characteristics and Concordance With Guidelines in Sri Lanka: Results From a Hospital-Based Cancer Registry\". All adults diagnosed with colorectal cancer in 2016 to 2020 were identified from the National Cancer Institute Sri Lanka registry, staged by TNM seventh edition, and treatment was compared with guideline recommendations.",
    findings: [
      "1,578 patients: 53% colon and 47% rectal cancer; mean age 61.",
      "Stage distribution was 13% stage I, 28% stage II, 46% stage III and 12% stage IV.",
      "Adjuvant chemotherapy reached 82% of patients with stage III colon cancer; neoadjuvant chemoradiotherapy reached only 50% of patients with stage III rectal cancer for whom it was indicated.",
    ],
    whatItMeans: "Late stage at diagnosis and gaps in rectal cancer treatment are the main problems the authors identify; the National Cancer Control Programme's 2024 report calls colorectal cancer the third most prevalent cancer in Sri Lanka since 2021.",
    caveats: ["One hospital's registry.", "The abstract does not give the reasons for non-concordance."],
    institutions: ["apeksha-hospital-maharagama"], cancers: ["colorectal"],
    links: [doi("10.1200/GO.22.00004", "JCO Glob Oncol 2022"), pubmed("35623022")] }),

  p({ id: "paper-alvitigala-lymphoma-trends-sri-lanka-canep-2025", name: "Lymphoma incidence trends in Sri Lanka's national cancer registry, 2005 to 2021",
    journal: "Cancer Epidemiology", year: 2025, doi: "10.1016/j.canep.2025.102951", pmid: "41172893", authors: "Alvitigala BY, Gooneratne LV, de Silva C.", paperType: "observational", participants: 15577,
    tldr: "Sri Lanka's national cancer registry recorded 15,577 lymphomas in 2005 to 2021, 60% in men and most of them non-Hodgkin lymphoma; recorded incidence rose by an average of 4.1% a year.",
    summary: "Published as \"Epidemiological trends of lymphoma in Sri Lanka: A national cancer registry study (2005-2021)\". The authors analysed incidence and mortality data from the National Cancer Control Programme's registries and used joinpoint regression to estimate annual percent changes in age-standardised rates.",
    findings: [
      "15,577 new lymphoma cases were reported, 60% (9,346) in men.",
      "Non-Hodgkin lymphoma was the predominant subtype (79%, 9,561 cases).",
      "Overall incidence increased significantly over 16 years, an average annual percent change of 4.1%.",
    ],
    whatItMeans: "Recorded lymphoma is rising in Sri Lanka, especially in men and older people, though the authors say part of the rise may reflect better diagnosis and reporting.",
    caveats: ["Registry completeness improved over the period, and changing WHO classifications may affect trends."],
    institutions: ["sri-lanka-national-cancer-registry"], cancers: ["non-hodgkin-lymphoma"],
    links: [doi("10.1016/j.canep.2025.102951", "Cancer Epidemiol 2025"), pubmed("41172893")] }),

  p({ id: "paper-sawant-rupantaran-sri-lanka-registry-ecancer-2023", name: "Rupantaran: merging hospital registry records into Sri Lanka's national CanReg5 database",
    journal: "ecancermedicalscience", year: 2023, doi: "10.3332/ecancer.2023.1553", pmid: "37377679", authors: "Sawant P, Perera S, Jayanthi KGN, et al.", paperType: "methods", participants: 47402,
    tldr: "Sri Lanka's national cancer registry receives data from 25 centres; a tool built by the IARC regional hub in Mumbai, Rupantaran, merged 47,402 records into the central database without the manual edits that had compromised quality.",
    summary: "Published as \"Application of Rupantaran software to Sri Lankan hospitals: an innovative tool developed to merge population-based cancer registry data into CanReg5\". The Sri Lanka National Cancer Registry uses IARC's open-source CanReg5. Records from 25 centres were exported to the main centre in Colombo and imported manually, with manual edits to avoid duplicates that compromised data quality; the IARC Regional Hub at Tata Memorial Centre built Rupantaran to merge them.",
    findings: [
      "The registry receives data from 25 centres across the country.",
      "Rupantaran was tested and implemented at the national registry with 47,402 merged records.",
      "The tool avoided manual errors and enabled faster analysis and dissemination, previously a limiting factor.",
    ],
    whatItMeans: "Part of why Sri Lanka's national cancer reports have lagged several years behind is data handling; this tool is one of the fixes the 2022 report describes using.",
    caveats: ["A description of a tool by its developers and users, not an evaluation of registry completeness."],
    institutions: ["sri-lanka-national-cancer-registry", "iarc"],
    links: [doi("10.3332/ecancer.2023.1553", "ecancermedicalscience 2023"), pubmed("37377679")] }),

  p({ id: "paper-nilaweera-economic-crisis-health-seeking-sri-lanka-bmchsr-2026", name: "How Sri Lanka's 2022 economic crisis affected chronic disease care in two provinces",
    journal: "BMC Health Services Research", year: 2026, doi: "10.1186/s12913-026-14599-8", pmid: "42050623", authors: "Nilaweera AI, Fernando DR, Adikaranayake PR, et al.", paperType: "observational", participants: 2059,
    tldr: "In a 2022 survey in Western and Uva provinces, nearly a third of people with chronic disease reported fewer clinic visits, worse control and missed medicines during the economic crisis; use of private care fell and self-medication rose.",
    summary: "Published as \"Impact of the economic crisis on general health-seeking behavior and chronic disease management: a comparative study of public perceptions in the Western and Uva Provinces of Sri Lanka\". A cross-sectional telephone survey in November and December 2022 compared adults' recall of January to May 2018 with January to May 2022; 1,043 people in Western and 1,016 in Uva province took part.",
    findings: [
      "Clinic visits declined for 29.6% of Western and 36.4% of Uva participants with chronic conditions.",
      "Medication omission was reported by 32.9% in Uva and 22.0% in Western province, and deterioration of a chronic condition by 31.3% and 21.2%.",
      "Use of private healthcare fell during the crisis (odds ratio 0.23), while Ayurveda (1.32) and self-medication (1.29) rose; use of government facilities was unchanged.",
    ],
    whatItMeans: "The public system held as the main source of care, but limited access to medicines and higher travel costs hurt people with long-term illness, more so in the poorer, more rural province.",
    caveats: ["Chronic disease in general, not cancer specifically.", "Self-reported recall by telephone."],
    institutions: ["sri-lanka-ministry-of-health"],
    links: [doi("10.1186/s12913-026-14599-8", "BMC Health Serv Res 2026"), pubmed("42050623")] }),

  p({ id: "paper-perera-hpv-prevalence-kalutara-bmcmed-2025", name: "HPV infection among 35-year-old women in Kalutara district, Sri Lanka",
    journal: "BMC Medicine", year: 2025, doi: "10.1186/s12916-025-04246-0", pmid: "40598371", authors: "Perera KCM, Mapitigama N, Abeysena HTCS.", paperType: "observational", participants: 822,
    tldr: "Among ever-married 35-year-old women in Kalutara district tested in 2018, 6.2% had a cervicovaginal HPV infection and 1.94% had the high-risk types 16 or 18.",
    summary: "Published as \"Prevalence and attributes of cervicovaginal human papillomavirus infection among a 35-year- age- cohort of ever-married women in a district of Sri Lanka: a cross-sectional study\". A community-based study from July to November 2018 tested cervical specimens with the cobas 4800 HPV DNA assay in the age cohort Sri Lanka's cervical screening programme targets.",
    findings: [
      "HPV prevalence was 6.2%; types 16 and 18 together 1.94%; 12 pooled high-risk types 4.14%.",
      "Marriage at 24 or younger, any abortion, hormonal contraception for 3 months or more and more than two vaginal deliveries were associated with infection.",
      "Higher income and ever use of condoms by a spouse were protective.",
    ],
    whatItMeans: "Baseline data for the planned move of Sri Lanka's cervical screening programme from cytology to HPV DNA testing at age 35.",
    caveats: ["One district; the abstract's very narrow confidence intervals are reproduced as published."],
    institutions: ["sri-lanka-ministry-of-health"], cancers: ["cervical"],
    links: [doi("10.1186/s12916-025-04246-0", "BMC Med 2025"), pubmed("40598371")] }),
];

/** Records behind /countries/lk/ (wave 6). */
export const recordsLK: EntityInput[] = [...institutions, ...papers];
