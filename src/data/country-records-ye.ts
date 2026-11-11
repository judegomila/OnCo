import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Yemen: the public bodies, cancer centres, registries and papers behind /countries/ye/ (wave 7) that the corpus did
 * not hold. Each was written from its own primary source, read raw on 11 November 2026: WHO's cancer country profile
 * for Yemen (2020, PDF text), WHO's Health Resources and Services Availability Monitoring System report for 2020 (PDF
 * text) and WHO's November 2016 release on the first HeRAMS survey, WHO news pages on cancer care in Yemen dated
 * February 2018, November 2018, February 2019 and September 2020, the IAEA's technical cooperation country page for
 * Yemen (PDF text), UICC's member pages and its June 2021 article on the National Cancer Control Foundation, Saba news
 * agency items of January 2024 and October 2025, Yemen Monitor items of December 2024 and July 2026, and Cairo 24's
 * report of January 2023 on the memorandum between Egypt's Drug Authority and Yemen's medicines board. DOIs were
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts or, for the two
 * registry papers, from the open full text.
 *
 * Inbound links: the Ministry links the two cancer centres, the Aden registry, the medicines board and the foundation;
 * each registry and centre links its papers through keyPapers. Coordinates are approximate city points, not building
 * positions. Where a source names a different authority in Aden and in Sana'a, the record says only what the source
 * says and where it was said.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/yem-2020.pdf";
const HERAMS_2020 = "https://applications.emro.who.int/docs/WHOEMYEM031E-eng.pdf";
const WHO_2018_FEB = "https://reliefweb.int/report/yemen/cancer-patients-yemen-face-slow-death-treatment-options-diminish";
const WHO_2019 = "https://www.emro.who.int/yemen/news/cancer-patients-face-death-sentence-in-yemen.html";
const WHO_2020 = "https://www.emro.who.int/yemen/news/cancer-patients-in-yemen-face-the-compounded-pain-of-disease-and-conflict.html";
const IAEA_TC = "https://iaea.org/sites/default/files/20/10/tc-yemen.pdf";
const UICC_2021 = "https://www.uicc.org/news/conflict-yemen-reverses-years-progress-and-gains-cancer-care";
const UICC_NCCF = "https://www.uicc.org/membership/national-cancer-control-foundation";
const SABA_2025 = "https://sabanew.net/story/en/136949";
const YM_STRATEGY = "https://www.yemenmonitor.com/?p=130102";
const YM_SMUGGLED = "https://www.yemenmonitor.com/?p=175570";
const CAIRO24_MOU = "https://www.cairo24.com/1734033";
const ACR_2018 = "10.1186/s12885-018-4411-9";
const HCR_2016 = "10.15537/smj.2016.5.14954";

const institutions: InstitutionInput[] = [
  i({ id: "yemen-ministry-of-public-health", name: "Ministry of Public Health and Population, Yemen", aka: ["MoPHP Yemen", "Yemen Ministry of Health", "Ministry of Public Health and Population (Yemen)"],
    city: "Aden", country: "YE", lat: 12.8, lng: 45.03, institutionType: "government",
    tldr: "Yemen's health ministry. Its minister announced a National Cancer Control Strategy for 2025 to 2030 in Aden in December 2024, saying about 30,000 new cancers are recorded each year; it ran WHO's 2020 survey of health facilities with WHO's country office.",
    summary: "The Ministry of Public Health and Population is Yemen's health ministry. The coordinates on this record are an approximate Aden city point, because the ministerial statements read for this record were made there; WHO's 2020 HeRAMS report describes the Ministry and the WHO country office jointly surveying health facilities in all 22 governorates, and OnCo has not established from a primary source how health administration is divided across the country during the conflict.\n\nWHO's 2020 cancer country profile records, for 2019, no information on a national cancer control plan, no cancer management guidelines, no breast or cervical screening programme, no early detection guidelines for any cancer and no defined referral system for childhood cancer, and no information on a population-based cancer registry. On 31 December 2024 Yemen Monitor reported, quoting his statement to Al Jazeera Net, that the Minister, Dr Qasem Buhaibah, had launched a National Cancer Control Strategy for 2025 to 2030 in Aden and had said that about 30,000 new cancer cases are recorded each year. In January 2024 a meeting chaired by a deputy minister discussed equipping the oncology centre in Aden for radiation and nuclear therapy, and in October 2025 the Minister inspected the construction of the Hope Cancer Hospital in Aden, which Saba reported would have 200 beds with radiation and nuclear medicine units. In July 2026 he ordered tighter inspection of pharmacies and warehouses against smuggled, unregistered or expired medicines, in coordination with the Supreme Board of Drugs and Medical Appliances, whose board he chairs.\n\nWHO's HeRAMS report for 2020 found 49% of health facilities non-functioning or partially functioning, no functioning hospital in 117 of 333 districts, and 12 health workers per 10,000 people.",
    programs: ["National Cancer Control Strategy 2025 to 2030 (announced December 2024)", "Health Resources and Services Availability Monitoring System (with WHO, since 2016)", "Hepatitis B vaccination in the routine schedule (nationwide since 1999)"],
    institutions: ["national-oncology-centre-sanaa", "hadhramout-national-cancer-centre", "aden-cancer-registry", "yemen-sbdma", "national-cancer-control-foundation-yemen", "who", "iaea"],
    cancers: ["breast-cancer", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-al-jamei-yemen-cancer-screening-kap-confl-health-2025"],
    links: [
      { label: "Yemen Monitor: Yemen records 30,000 new cancer cases annually; national strategy launched (31 December 2024)", url: YM_STRATEGY },
      { label: "WHO: cancer country profile, Yemen (2020, PDF)", url: WHO_PROFILE },
      { label: "WHO: HeRAMS report 2020, Yemen (published 2022, PDF)", url: HERAMS_2020 },
      { label: "Saba: Health Minister inspects Hope Cancer Hospital project in Aden (28 October 2025; refused a request on 11 November 2026, no archived copy)", url: SABA_2025 },
      { label: "Yemen Monitor: Health Minister orders tighter controls on smuggled medicines (6 July 2026)", url: YM_SMUGGLED },
    ] }),

  i({ id: "national-oncology-centre-sanaa", name: "National Oncology Centre, Sana'a", aka: ["National Oncology Center Sanaa", "National Oncology Referral Center, Sana'a", "NOC Sana'a"],
    city: "Sana'a", country: "YE", lat: 15.35, lng: 44.21, institutionType: "cancer-center",
    tldr: "The cancer centre in Sana'a where WHO says most Yemeni cancer patients are treated. WHO reported in 2018 that it had treated more than 60,000 patients since 2005 and had lost its government budget of about 12 million US dollars a year; WHO's reports to 2020 describe it depending on donated medicines.",
    summary: "WHO wrote in February 2018 that more than 60,000 cancer patients, 12% of them children, had been treated at the National Oncology Centre in Sana'a since 2005, that it receives patients from across the country, and that before the crisis the government gave it about 12 million US dollars a year but it had received no funding for around two years, leaving it dependent on limited external support. Its director, Dr Ali Al-Ashwal, described shortages of medicines and the departure of senior oncologists. WHO's representative said that of more than 10,000 cancer patients registered in 2017, around 40% received complete treatment. With funding from the World Bank and Germany, WHO procured about 2.5 million US dollars of anti-cancer medicines for almost 30,000 patients. The coordinates are an approximate Sana'a city point.\n\nIn February 2019 WHO reported that the centre received more than 600 patients a month and at least 25 new cases a day, and in September 2020 that WHO had supplied it with anti-cancer medicines and with morphine and fentanyl for patients with advanced disease. The IAEA's country page records fellowships and training for its staff in nuclear medicine, breast imaging, radiotherapy and radiopharmacy, and support for moving from two-dimensional to three-dimensional radiotherapy planning.\n\nStudies at the centre include a 2022 survey of 296 inpatients that found 49% had lost at least 5% of their body weight, and a 2024 study of 75 patients with newly diagnosed acute leukaemia comparing microscope diagnosis with flow cytometry.",
    programs: ["Chemotherapy and radiotherapy for patients referred from across Yemen", "WHO-supplied anti-cancer medicines and pain relief", "IAEA technical cooperation in radiotherapy and nuclear medicine"],
    institutions: ["yemen-ministry-of-public-health", "who", "iaea"],
    cancers: ["breast-cancer", "aml", "all-leukemia", "childhood-cancers"],
    keyPapers: ["paper-al-shahethi-malnutrition-noc-sanaa-cureus-2023", "paper-al-aghbri-acute-leukaemia-noc-sanaa-ljm-2026"],
    links: [
      { label: "WHO (via ReliefWeb): cancer patients in Yemen face slow death as treatment options diminish (4 February 2018)", url: WHO_2018_FEB },
      { label: "WHO EMRO: cancer patients face 'death sentence' in Yemen (4 February 2019)", url: WHO_2019 },
      { label: "WHO EMRO: cancer patients in Yemen face the compounded pain of disease and conflict (20 September 2020)", url: WHO_2020 },
      { label: "IAEA: technical cooperation with Yemen (PDF)", url: IAEA_TC },
    ] }),

  i({ id: "aden-cancer-registry", name: "Aden Cancer Registry", aka: ["ACR Yemen", "Aden Population-Based Cancer Registry"],
    city: "Aden", country: "YE", lat: 12.82, lng: 44.99, institutionType: "research-institute",
    tldr: "Yemen's first population-based cancer registry, set up in 1997 under the Aden Cancer Centre at Aden University. It counted 6,974 cancers over 1997 to 2011 in four southern governorates, about 2.6 million people.",
    summary: "The Aden Cancer Registry was established in 1997 and is supervised by the Aden Cancer Centre at the Faculty of Medicine and Health Sciences, Aden University; its 2018 report describes it as the first population-based registry in Yemen, with staff trained by IARC in Lyon, and says it was included in the International Association of Cancer Registries in 1998. It covers four governorates, Aden, Lahej, Abyan and Al Dhale, with a population of about 2,644,383, and drew cases from seven main hospitals, laboratories, imaging, local cancer societies and the Ministry of Public Health's committee for treatment abroad. The coordinates are an approximate Aden city point.\n\nIts second report, for 2002 to 2006, gave age-standardised rates of 30.2 and 31.1 per 100,000 for men and women, with breast cancer, leukaemia and non-Hodgkin lymphoma the commonest. Its 15-year report counted 6,974 cancers between 1997 and 2011, age-standardised incidence of 38.2 per 100,000 in men and 36.1 in women; breast cancer was 30.0% of cancers in women, and leukaemia and non-Hodgkin lymphoma led in men. The author notes that the registry does not record stage or deaths and that counts depend on the diagnostic facilities available, and asked the government to support Yemen's registries. OnCo found no published data from the registry after 2011.",
    programs: ["Population-based cancer registration for Aden, Lahej, Abyan and Al Dhale (from 1997)"],
    institutions: ["yemen-ministry-of-public-health", "iarc"], cancers: ["breast-cancer", "non-hodgkin-lymphoma", "childhood-cancers"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-bawazir-aden-cancer-registry-1997-2011-bmc-cancer-2018"],
    links: [
      doi(ACR_2018, "Bawazir, cancer incidence in Yemen from 1997 to 2011: a report from the Aden cancer registry (BMC Cancer 2018)"),
      { label: "Ba Saleem et al., five years cancer incidence in Aden Cancer Registry 2002 to 2006 (Asian Pac J Cancer Prev 2010, PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/20843142/" },
    ] }),

  i({ id: "hadhramout-national-cancer-centre", name: "Hadhramout National Cancer Centre, Mukalla", aka: ["Hadhramout Cancer Center", "Hadramout National Oncology Center", "HNCC", "Hadhramout Cancer Registry"],
    city: "Al Mukalla", country: "YE", lat: 14.54, lng: 49.12, institutionType: "cancer-center",
    tldr: "The cancer centre in Mukalla that the Ministry of Health set up in 2002 for the governorates of Hadhramout, Shabwa and Al Mahra, about 1.8 million people. Its hospital registry recorded 4,796 cancers from 2002 to 2014.",
    summary: "Hadhramout Cancer Center was established by the Ministry of Health in 2002 to serve the Hadhramout sector, the governorates of Hadhramout, Shabwa and Al Mahra, with a population of about 1,820,163, according to a 2016 paper by paediatricians at Hadhramout University. Its Hadhramout Cancer Registry, into which earlier paper charts were entered retrospectively, recorded 4,796 malignancies between January 2002 and December 2014, of which 406 (8.5%) were in children under 15; lymphoma and leukaemia were the commonest childhood cancers. The coordinates are an approximate Mukalla city point.\n\nA 2019 paper from the centre, there called Hadhramout National Cancer Centre, described 109 patients with nasopharyngeal carcinoma treated without surgery, 62 of them with concurrent chemoradiotherapy, followed for 72 months. OnCo did not find an official page for the centre or a statement of its current services.",
    programs: ["Cancer treatment for Hadhramout, Shabwa and Al Mahra (from 2002)", "Hadhramout Cancer Registry (hospital-based)"],
    institutions: ["yemen-ministry-of-public-health"], cancers: ["childhood-cancers", "nasopharyngeal", "non-hodgkin-lymphoma"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-jawass-hadhramout-childhood-cancer-smj-2016"],
    links: [
      doi(HCR_2016, "Jawass et al., pattern of malignancies in children reported in Hadhramout Cancer Registry 2002 to 2014 (Saudi Med J 2016)"),
      { label: "Bahannan et al., nasopharyngeal carcinoma at Hadhramout National Cancer Centre (Gulf J Oncolog 2019, PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/31242984/" },
    ] }),

  i({ id: "yemen-sbdma", name: "Supreme Board of Drugs and Medical Appliances (Yemen)", aka: ["SBDMA", "Supreme Board of Drugs", "High Authority for Medicines and Medical Supplies, Yemen"],
    city: "Aden", country: "YE", lat: 12.79, lng: 45.02, institutionType: "government",
    tldr: "Yemen's medicines regulator, chaired by the Minister of Public Health and Population. It is not on WHO's list of regulators assessed at maturity level 3 or 4, and in 2023 it signed a capacity-building memorandum with Egypt's Drug Authority.",
    summary: "The Supreme Board of Drugs and Medical Appliances regulates medicines and medical supplies in Yemen. Cairo 24 reported on 22 January 2023 that the board's executive director, Dr Abdulqader Al-Bakri, signed a memorandum with Egypt's Drug Authority on professional development and capacity building, witnessed by the Minister of Public Health and Population, who chairs the board and led the Yemeni delegation. In July 2026 the Minister ordered provincial health offices to inspect pharmacies, drug warehouses and hospitals against smuggled, unregistered or expired medicines in coordination with the board and the security and judicial authorities. The coordinates are an approximate Aden city point; OnCo did not confirm the address of the board's head office.\n\nYemen does not appear on WHO's list of national regulatory authorities operating at maturity level 3 or 4 (August 2026). A 2014 study of pharmacy practice in Yemen found medicines expensive and hard to access and counterfeit medicines a serious problem, and the former general manager of the National Cancer Control Foundation told UICC in 2021 that some cancer medicines were available only on the black market, at high cost and often as inferior copies of unknown source. OnCo found no published registration procedure, timeline or list of registered cancer medicines from the board.",
    programs: ["Registration and import control of medicines and medical supplies"],
    institutions: ["yemen-ministry-of-public-health"],
    links: [
      { label: "Cairo 24: memorandum between Egypt's Drug Authority and Yemen's Supreme Board of Drugs and Medical Appliances (22 January 2023, Arabic)", url: CAIRO24_MOU },
      { label: "Yemen Monitor: Health Minister orders tighter controls on smuggled medicines (6 July 2026)", url: YM_SMUGGLED },
      { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026, PDF)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" },
      doi("10.4066/amj.2014.1890", "Al-Worafi, pharmacy practice and its challenges in Yemen (Australas Med J 2014)"),
    ] }),

  i({ id: "national-cancer-control-foundation-yemen", name: "National Cancer Control Foundation (Yemen)", aka: ["NCCF Yemen", "National Foundation for Cancer Control"],
    city: "Sana'a", country: "YE", lat: 15.33, lng: 44.2, institutionType: "consortium", website: "http://www.nccfyemen.org",
    tldr: "A Yemeni cancer charity and UICC member, working since 2003, with a head office in Sana'a and branches in Taiz, Aden, Ibb and Al Hodeidah. It offers free early detection, chemotherapy, food and transport, and supervises the building of a cancer hospital in Aden.",
    summary: "UICC's member page gives the National Cancer Control Foundation's head office as Sakhr Street in Sana'a and lists branches in Taiz, Aden, Ibb and Al Hodeidah; it says more than ten thousand patients use its services each year and that its breast cancer early detection centre in Sana'a receives more than 350 women a month. UICC's article of 28 June 2021 says the foundation had provided charitable services since 2003, opened the first surgical centre specifically for oncology in 2014, and saw its network disrupted from 2015; it continues to offer free screening and early detection, chemotherapy, and food and transport for patients travelling to Sana'a. Its former general manager, Dr Labeeb Alaghbari, told UICC that there was no space for radiotherapy and that medicines such as radioactive iodine were no longer available because of cross-border issues. The coordinates are an approximate Sana'a city point.\n\nSaba reported on 28 October 2025 that the foundation supervises the construction of the Hope Cancer Hospital in Aden's Al-Buriqueh district, funded by the Hayel Saeed Anam Group and planned with 200 beds and radiation and nuclear medicine units.",
    programs: ["Free breast cancer early detection (Sana'a)", "Chemotherapy, food and transport support for patients", "Hope Cancer Hospital, Aden (under construction, 2025)"],
    institutions: ["uicc", "yemen-ministry-of-public-health"], cancers: ["breast-cancer"],
    links: [
      { label: "UICC: National Cancer Control Foundation (member page)", url: UICC_NCCF },
      { label: "UICC: conflict in Yemen reverses years of progress and gains in cancer care (28 June 2021)", url: UICC_2021 },
      { label: "Saba: Health Minister inspects Hope Cancer Hospital project in Aden (28 October 2025; refused a request on 11 November 2026, no archived copy)", url: SABA_2025 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-bawazir-aden-cancer-registry-1997-2011-bmc-cancer-2018", name: "Cancer incidence in Aden and three neighbouring governorates, 1997 to 2011, from the Aden Cancer Registry",
    journal: "BMC Cancer", year: 2018, doi: ACR_2018, pmid: "29739348", authors: "Bawazir AA", paperType: "observational", participants: 6974,
    tldr: "Over 15 years Yemen's first population-based registry recorded 6,974 cancers; breast cancer was 30% of cancers in women, and leukaemia and non-Hodgkin lymphoma led in men.",
    summary: "Published as \"Cancer incidence in Yemen from 1997 to 2011: a report from the Aden cancer registry\". All cancers recorded by the Aden Cancer Registry, a population-based registry covering Aden, Lahej, Abyan and Al Dhale (about 2.6 million people), were abstracted from medical records, coded with ICD-O and analysed in CanReg4.",
    findings: [
      "6,974 cancers were recorded, 47% in men and 53% in women; the overall annual incidence was 21.6 per 100,000.",
      "Age-standardised incidence over the period was 38.2 per 100,000 in men and 36.1 in women (from the full text).",
      "In men the commonest were leukaemia (10.5%), non-Hodgkin lymphoma (10.1%), colon (7.5%), Hodgkin lymphoma (6.1%) and stomach (5.1%); in women breast cancer (30.0%), leukaemia (7.6%) and non-Hodgkin lymphoma (6.6%).",
    ],
    whatItMeans: "The longest series of registered cancer incidence in Yemen, and the main local source for the pattern in the south: a young profile led by blood cancers and, in women, breast cancer.",
    caveats: ["The author notes that counts depend on available diagnostic facilities and that stage and deaths are not recorded.", "Four governorates only; rates are much lower than IARC's national estimates, which are not based on Yemeni registry data."],
    institutions: ["aden-cancer-registry"], cancers: ["breast-cancer", "non-hodgkin-lymphoma", "hodgkin-lymphoma"],
    links: [doi(ACR_2018, "BMC Cancer 2018"), pubmed("29739348")] }),

  p({ id: "paper-jawass-hadhramout-childhood-cancer-smj-2016", name: "Childhood cancers in the Hadhramout Cancer Registry, 2002 to 2014",
    journal: "Saudi Medical Journal", year: 2016, doi: HCR_2016, pmid: "27146613", authors: "Jawass MA, Al-Ezzi JI, Bin Gouth HS, et al.", paperType: "observational", participants: 406,
    tldr: "The Hadhramout Cancer Registry recorded 406 cancers in children under 15 over 13 years, 8.5% of all its cases; lymphoma and leukaemia were the commonest.",
    summary: "Published as \"Pattern of malignancies in children <15 years of age reported in Hadhramout Cancer Registry, Yemen between 2002 and 2014\". A descriptive study of secondary registry data for children diagnosed with cancer in the Hadhramout sector (Hadhramout, Shabwa and Al Mahra), classified by the International Classification of Childhood Cancer.",
    findings: [
      "406 childhood cancers were recorded, 8.5% of all cases registered; 59.1% were in boys.",
      "The calculated incidence of cancer in children in this population was 1.9 per 100,000.",
      "Haematological malignancies were 47% of cases; lymphoma (24%), leukaemia (23%), carcinoma (13.1%) and central nervous system tumours (11.6%) were the commonest types.",
    ],
    whatItMeans: "One of the few published counts of childhood cancer in Yemen; the low incidence the authors report likely reflects what reaches the registry as much as the true rate.",
    caveats: ["A hospital registry serving three governorates, partly built from paper charts entered retrospectively."],
    institutions: ["hadhramout-national-cancer-centre"], cancers: ["childhood-cancers", "non-hodgkin-lymphoma", "all-leukemia"],
    links: [doi(HCR_2016, "Saudi Med J 2016"), pubmed("27146613")] }),

  p({ id: "paper-al-jamei-yemen-cancer-screening-kap-confl-health-2025", name: "What people in Yemen know about cancer screening, and how few have been screened",
    journal: "Conflict and Health", year: 2025, doi: "10.1186/s13031-025-00709-6", pmid: "41084062", authors: "Al-Jamei S, Al-Shargabi A, Al-Qafaf ED, et al.", paperType: "observational", participants: 996,
    tldr: "In a survey of 996 people in Yemen, about half had heard of cancer screening but only 8.5% had ever been screened; cost and lack of awareness were the main barriers.",
    summary: "Published as \"Public knowledge, attitudes, practices, and key influencing factors regarding cancer screening in Yemen\". A cross-sectional survey using a validated questionnaire distributed by convenience sampling, with logistic regression for factors associated with knowledge.",
    findings: [
      "52.1% reported awareness of cancer screening, but only 21.4% rated their knowledge as good.",
      "Breast cancer screening was the most recognised; awareness of lung, colorectal, cervical and prostate screening was minimal.",
      "8.5% of participants had undergone any form of cancer screening; financial constraints, lack of awareness and the perception that screening is unnecessary were the main barriers.",
    ],
    whatItMeans: "Where there is no organised screening programme, few people are screened, and cost is one of the reasons they give.",
    caveats: ["Convenience sample, so more educated and urban respondents may be over-represented."],
    institutions: ["yemen-ministry-of-public-health"], cancers: ["breast-cancer"],
    links: [doi("10.1186/s13031-025-00709-6", "Confl Health 2025"), pubmed("41084062")] }),

  p({ id: "paper-al-shahethi-malnutrition-noc-sanaa-cureus-2023", name: "Malnutrition among cancer inpatients at the National Oncology Centre in Sana'a",
    journal: "Cureus", year: 2023, doi: "10.7759/cureus.45411", pmid: "37859884", authors: "Al-Shahethi AH, Mahdi FA, Al-Shameri EA, Abol Gaith FM", paperType: "observational", participants: 296,
    tldr: "Among 296 cancer inpatients in Sana'a in early 2022, 16.2% were underweight by body mass index and 49% had lost at least 5% of their weight.",
    summary: "Published as \"Factors Associated With Malnutrition in Hospitalized Cancer Patients in a National Oncology Center in Conflict-Affected Settings in Sana'a, Yemen: An Institution-Based Cross-Sectional Study\". Patients admitted between 1 February and 31 March 2022 were assessed with screening tools, body mass index, weight loss and mid-upper arm circumference.",
    findings: [
      "Of 296 patients, 76.0% were women and the mean age was 45.8 years.",
      "Undernutrition by body mass index was 16.2%, and 49% had lost 5% or more of their body weight.",
      "Weight loss, stomach cancer and breast cancer, and being single or widowed, were associated with malnutrition.",
    ],
    whatItMeans: "Nutrition needs checking at the start of and during cancer treatment, especially where food insecurity is widespread.",
    caveats: ["One centre over two months."],
    institutions: ["national-oncology-centre-sanaa"], cancers: ["breast-cancer", "gastric"],
    links: [doi("10.7759/cureus.45411", "Cureus 2023"), pubmed("37859884")] }),

  p({ id: "paper-al-aghbri-acute-leukaemia-noc-sanaa-ljm-2026", name: "Diagnosing acute leukaemia in Sana'a: microscopy against flow cytometry",
    journal: "Libyan Journal of Medicine", year: 2026, doi: "10.1080/19932820.2026.2735579", pmid: "42762201", authors: "Al-Aghbri SMA, Al-Nood HA, Al-Haidary NM, Balkam FA", paperType: "observational", participants: 75,
    tldr: "In 75 newly diagnosed patients at the National Oncology Centre in Sana'a, the microscope and flow cytometry agreed on the type of acute leukaemia in 89.3% of cases; eight were reclassified.",
    summary: "Published as \"Integrating immunophenotyping and morphology in the diagnosis of acute leukemia at the National Oncology Center, Sana'a, Yemen\". An exploratory prospective cross-sectional study in July and August 2024 compared morphological diagnosis with flow cytometric immunophenotyping.",
    findings: [
      "By immunophenotyping, 42 patients (56.0%) had precursor acute lymphoblastic leukaemia, 32 (42.7%) acute myeloid leukaemia and one Burkitt lymphoma or leukaemia.",
      "Agreement between morphology and immunophenotyping was 89.3% (kappa 0.79); eight cases (10.7%) were discordant.",
      "Children were 69.8% of the lymphoblastic group, and 81.3% of the myeloid cases were adults.",
    ],
    whatItMeans: "Flow cytometry, available at the centre, corrects a minority of leukaemia diagnoses made by microscope alone; the authors call for wider access to it in Yemen.",
    caveats: ["75 patients over two months at one centre."],
    institutions: ["national-oncology-centre-sanaa"], cancers: ["aml", "all-leukemia"],
    links: [doi("10.1080/19932820.2026.2735579", "Libyan J Med 2026"), pubmed("42762201")] }),
];

/** Records behind /countries/ye/ (wave 7). */
export const recordsYE: EntityInput[] = [...institutions, ...papers];
