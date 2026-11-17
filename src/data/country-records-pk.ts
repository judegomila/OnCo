import type { EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Pakistan: the institutions, trials and papers behind /countries/pk/ that the corpus did not hold. People are in
 * src/data/people/country-pk.ts (none added). Read on 4 November 2026 from the raw text of each source: the Punjab
 * Cancer Registry's own reports, the PAEC cancer registry report for 2018 and 2019 (Internet Archive copy of
 * 12 November 2021) and for 2020 and 2021 (downloaded from paec.gov.pk in the 4 November audit), the Gazette of Pakistan for Act XXIX of 2025,
 * DRAP's reliance guideline and the Drug Pricing Policy 2018 as amended to 30 September 2024, and ClinicalTrials.gov
 * API v2 for the three trials. DOIs were resolved through Crossref and the abstracts read in Europe PMC.
 *
 * Inbound links: each record here is linked from another record, not only from the country page. nih-pakistan names
 * punjab-cancer-registry, paec-cancer-hospitals and drap, and they name it back; the papers are keyPapers of the
 * registry records; the three trials are listed by the institutions that run them, and those institutions are named
 * by the trials. Positions marked "city centre" in a summary are the city's centroid, not the building.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const ctgov = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

const PCR = "https://punjabcancerregistry.org.pk/";
const PAEC_MED = "https://web.archive.org/web/20261025161918/https://paec.gov.pk/Medical/";
const PAECR_1819 = "https://web.archive.org/web/20211112173232/http://www.paec.gov.pk/Documents/Medical/PAECR_report_2018-19.pdf";
const NIH_ACT = "https://na.gov.pk/uploads/documents/68ca64766a52d_543.pdf";
const DRAP_RELIANCE = "https://www.dra.gov.pk/wp-content/uploads/2023/01/2nd-edition-Relaince-Mechansim-in-Regulatory-Processess.pdf";
const DRAP_PRICING = "https://www.dra.gov.pk/wp-content/uploads/2025/04/Drug-Pricing-Policy-2018.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "punjab-cancer-registry", name: "Punjab Cancer Registry", aka: ["PCR", "Punjab Cancer Registry, Lahore"],
    city: "Lahore", country: "PK", lat: 31.47, lng: 74.271, institutionType: "consortium", website: PCR,
    tldr: "A population-based cancer registry for Punjab, set up in 2005. It counts cancers among residents of Lahore and a growing list of Punjab districts, from a central office inside the Shaukat Khanum hospital in Lahore.",
    summary: "The Punjab Cancer Registry was set up in February 2005 to measure cancer at population level in the province. Its own history says that from 1 July 2008 it collected data on cancers diagnosed and treated among residents of Lahore district, added Faisalabad, Sheikhupura, Kasur and Nankana Sahib in 2014, Gujranwala, Hafizabad, Sialkot and Narowal in 2016, Okara, Gujrat, Jhelum and Rawalpindi/Islamabad in 2018, and later more than a dozen further districts. Its central office is within Shaukat Khanum Memorial Cancer Hospital and Research Centre in Lahore and it is sponsored by the Shaukat Khanum Memorial Trust; its 2023 report lists twenty-eight collaborating centres and fifty-three members.\n\nIts preliminary report for 2023, dated 20 August 2024, counts 6,271 new cancer diagnoses among Lahore residents (55.64% in women), with breast cancer first at 1,391 (22.2%). Its incidence study of Lahore for 2010 to 2019 (BMJ Open 2021) counted 58,394 cases and age-standardised rates of 103.4 per 100,000 women and 65.6 per 100,000 men. The registry contributed to the pooled national report for 2015 to 2019 compiled at the National Institute of Health in Islamabad. The map position is the Shaukat Khanum hospital, where the office sits.",
    programs: ["Population-based registration, Lahore district (since 2008)", "Expansion to further Punjab districts (2014 onwards)", "Annual preliminary reports", "International Incidence of Childhood Cancer volume 3 contribution"],
    cancers: ["breast-cancer", "oral-cavity-cancer", "colorectal"], institutions: ["shaukat-khanum", "nih-pakistan"],
    keyPapers: ["paper-cancer-lahore-2010-2019-bmj-open-2021", "paper-national-cancer-registry-pakistan-jcpsp-2023"],
    links: [
      { label: "Punjab Cancer Registry: home and history", url: PCR },
      { label: "Punjab Cancer Registry Report 2023 (PDF)", url: "https://punjabcancerregistry.org.pk/reports/PCR_2023.pdf" },
      doi("10.1136/bmjopen-2020-047049", "Badar and Mahmood, Cancer in Lahore 2010 to 2019, BMJ Open 2021"),
    ] }),

  i({ id: "nih-pakistan", name: "National Institutes of Health, Islamabad", aka: ["NIH Pakistan", "National Institute of Health (Pakistan)", "Health Research Institute, NIH Islamabad"],
    city: "Islamabad", country: "PK", lat: 33.6844, lng: 73.0479, institutionType: "government", website: "https://www.nih.org.pk/",
    tldr: "Pakistan's federal public health institute in Islamabad. Since September 2025 the law gives it the duty to build a national register of cancer patients, and its research arm compiled the first pooled national cancer report.",
    summary: "The National Institutes of Health in Islamabad describe themselves as a public health institution, conceived as a National Health Center in the early 1960s, that started functioning in 1965. The National Institute of Health (Re-organization) (Amendment) Act, 2025 (Act XXIX of 2025), which received presidential assent on 5 September 2025 and was published in the Gazette of Pakistan on 13 September 2025, inserted sub-sections (2A) to (2C) into section 16 of the 2021 Act. They direct the centre to assure the registration of cancer patients in a central repository, including names and national identity card numbers, to call on any hospital or laboratory for cancer data, and to register confirmed cases, deaths, recoveries and demographic details, with personal particulars not to be disclosed to any unauthorised person without the patient's prior written consent.\n\nBefore the Act, its Health Research Institute pooled data from the Punjab Cancer Registry, the Karachi Cancer Registry, the PAEC cancer registry, the Armed Forces Institute of Pathology registry and two hospital registries into the first national report, for 2015 to 2019, which analysed 269,707 cancer cases (J Coll Physicians Surg Pak 2023). The map position is the city centre; the institute's address is Park Road, Chak Shahzad.",
    programs: ["National cancer registry (statutory duty under Act XXIX of 2025)", "Pooled national cancer registry report, 2015 to 2019"],
    institutions: ["punjab-cancer-registry", "paec-cancer-hospitals", "drap"],
    keyPapers: ["paper-national-cancer-registry-pakistan-jcpsp-2023", "paper-cancer-registries-pakistan-scoping-review-2025"],
    links: [
      { label: "National Institute of Health (Re-organization) (Amendment) Act, 2025, Gazette of Pakistan (PDF)", url: NIH_ACT },
      { label: "National Institutes of Health, Islamabad", url: "https://www.nih.org.pk/" },
      doi("10.29271/jcpsp.2023.06.625", "National Cancer Registry of Pakistan, 2015 to 2019, JCPSP 2023"),
    ] }),

  i({ id: "paec-cancer-hospitals", name: "Atomic Energy Cancer Hospitals (Pakistan Atomic Energy Commission)", aka: ["PAEC cancer hospitals", "AECHs", "PAEC Cancer Registry", "INMOL", "NORI", "KIRAN", "IRNUM"],
    city: "Islamabad", country: "PK", lat: 33.6844, lng: 73.0479, institutionType: "government", website: "https://paec.gov.pk/Medical/",
    tldr: "A network of about twenty cancer hospitals run by Pakistan's atomic energy agency, offering radiotherapy, nuclear medicine and chemotherapy free or at subsidised rates, and keeping its own cancer registry.",
    summary: "The Pakistan Atomic Energy Commission says it has established 19 Atomic Energy Cancer Hospitals across Pakistan, with one more under construction at Muzaffarabad, which see over 40,000 new cancer patients and 1.0 million procedures a year, free of charge or at subsidised rates; it describes this as about 80% of the country's cancer burden, a figure it does not source and which does not match IARC's estimate of 190,308 new cancers in 2024. It lists linear accelerators, cobalt-60 units, CyberKnife, brachytherapy, PET-CT, cyclotrons and radionuclide therapy, and about 2,600 staff including about 250 doctors.\n\nIts hospital-based registry, run by the Nuclear Medicine and Oncology Division, registered 38,457 new patients in 2018 and 40,797 in 2019 from 17 institutes, among them INMOL in Lahore, NORI in Islamabad, KIRAN in Karachi and IRNUM in Peshawar, the busiest. Of the 79,254 patients in those two years, 6.8% were stage I, 17.1% stage II, 31.0% stage III and 28.5% stage IV. Its third report, for 2020 and 2021, produced in 2026, counts 33,512 and 39,358 patients from 17 hospitals, gives the network as 20 hospitals, finds the largest shares again at stage III and IV, and says the PAEC registry supplied about 67% of the cases in the pooled national report for 2015 to 2019. The medical services page and the 2018 and 2019 report were read from Internet Archive copies; the 2020 and 2021 report was downloaded from paec.gov.pk on 4 November 2026. The map position is the city centre of Islamabad, where the Commission's headquarters is.",
    programs: ["19 Atomic Energy Cancer Hospitals (radiotherapy, nuclear medicine, medical oncology)", "PAEC Cancer Registry (reports 2015 to 2017, 2018 and 2019, 2020 and 2021)", "Postgraduate training in nuclear medicine, radiotherapy and medical physics"],
    terms: ["radiotherapy"], institutions: ["nih-pakistan"], keyPapers: ["paper-national-cancer-registry-pakistan-jcpsp-2023"],
    links: [
      { label: "PAEC: medical services (Internet Archive copy, 25 October 2026)", url: PAEC_MED },
      { label: "PAEC Cancer Registry Report 2018 and 2019 (Internet Archive copy, PDF)", url: PAECR_1819 },
      { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: "https://paec.gov.pk/Documents/Medical/PAECR_report_2020-21.pdf" },
    ] }),

  i({ id: "drap", name: "Drug Regulatory Authority of Pakistan (DRAP)", aka: ["DRAP", "Drug Regulatory Authority of Pakistan"],
    city: "Islamabad", country: "PK", lat: 33.6844, lng: 73.0479, institutionType: "government", website: "https://www.dra.gov.pk/",
    tldr: "Pakistan's medicines regulator. Its Registration Board licenses medicines, relying on decisions by twenty-one named foreign regulators, and it fixes the maximum retail prices of essential medicines.",
    summary: "DRAP was established under the Drug Regulatory Authority of Pakistan Act, 2012. Medicines are registered by its Registration Board under the Drugs (Licensing, Registering and Advertising) Rules, 1976. Its guideline on good reliance practice (QMSC/GL/RM/005, second edition, effective 4 January 2023) states that finished products approved by its reference regulatory authorities are considered safe, effective and of quality when considered for registration, and lists twenty-one: the FDA, Health Canada, the TGA, PMDA, the MHRA, the EMA, the WHO and fourteen European national agencies. Rule 30(10) of the 1976 rules accepts clinical information approved in the USA, EU countries, Canada, Japan or Australia unless the Board modifies it, and DRAP has an agreement with the WHO on collaborative registration of prequalified products. Unregistered medicines can be imported under a no-objection certificate.\n\nPrices are set under the Drug Pricing Policy, 2018. As amended to 30 September 2024, the policy applies only to medicines on the National Essential Medicines List, whose maximum retail prices are fixed; other medicines are exempt from price fixing. Within the policy, a new originator brand is priced at the average of its price in India and Bangladesh, or failing that a basket of Indonesia, the Philippines, Lebanon, Sri Lanka and Malaysia; in hardship cases imported anti-cancer medicines carry a 40% trade mark-up against 45% for other imports. The map position is the city centre.",
    programs: ["Registration Board (Drugs Licensing, Registering and Advertising Rules, 1976)", "Reliance on reference regulatory authorities", "Drug Pricing Policy, 2018", "No-objection certificates for import of unregistered medicines", "Pharmacovigilance Rules, 2022"],
    institutions: ["nih-pakistan"],
    links: [
      { label: "DRAP: Reliance Mechanism in Regulatory Processes, 2nd edition (PDF)", url: DRAP_RELIANCE },
      { label: "DRAP: Drug Pricing Policy, 2018, as amended to 30 September 2024 (PDF)", url: DRAP_PRICING },
      { label: "DRAP: public price search", url: "https://e.dra.gov.pk/public/price" },
      doi("10.47391/jpma.3458", "Elahi and Siddiqui, import of unregistered anticancer drugs, JPMA 2021"),
    ] }),

  i({ id: "afbmtc-rawalpindi", name: "Armed Forces Bone Marrow Transplant Centre, Rawalpindi", aka: ["AFBMTC", "National Institute of Blood and Marrow Transplant (NIBMT)", "NIBMT Pakistan"],
    city: "Rawalpindi", country: "PK", lat: 33.59733, lng: 73.0479, institutionType: "hospital",
    tldr: "The military haematology and transplant centre in Rawalpindi that runs two small trials of CAR-T cells made on site, for leukaemia and myeloma, and was reported in July 2026 to have carried out its first successful CAR-T treatment.",
    summary: "The Armed Forces Bone Marrow Transplant Centre in Rawalpindi registered two studies on ClinicalTrials.gov through the National Institute of Blood and Marrow Transplant (NIBMT), with Dr Zaineb Akram as sponsor-investigator. NCT07695012 is a pilot, single-arm feasibility study of autologous anti-CD19 CAR-T cells in patients aged 5 to 50 with relapsed or refractory B-cell acute lymphoblastic leukaemia; the cells are manufactured at the centre using a third-generation lentiviral vector supplied by BIOCCUS (China) and an automated expansion system, and the registry says the centre receives the largest national referral volume for haematological cancers and transplantation. NCT07689058 tests autologous BCMA-directed CAR-T cells in relapsed or refractory multiple myeloma. Both list 10 patients, started on 1 June 2026, and recruit at the National University of Medical Sciences clinical trial unit in Rawalpindi.\n\nArab News, reporting state broadcaster Radio Pakistan on 5 July 2026, said the centre had carried out its first successful CAR-T treatment, putting Pakistan among the countries able to offer it, and that a 21-year-old patient had made a full recovery; the report does not name the cancer or say whether the patient was in a trial, and OnCo found no peer-reviewed report yet. No website for the centre answered on 4 November 2026. The map position is the city centre.",
    programs: ["Haematopoietic stem cell transplantation", "On-site CAR-T cell manufacturing (trials from 2026)"],
    technologies: ["car-t", "point-of-care-cell-manufacturing"], cancers: ["all-leukemia", "multiple-myeloma"], trials: ["nct07695012", "nct07689058"],
    links: [
      ctgov("NCT07695012"), ctgov("NCT07689058"),
      { label: "Arab News: Pakistan marks major breakthrough in cancer treatment with first CAR T-cell therapy (5 July 2026)", url: "https://www.arabnews.pk/node/2649707" },
    ] }),

  i({ id: "kemu-lahore", name: "King Edward Medical University and Mayo Hospital, Lahore", aka: ["KEMU", "King Edward Medical University", "Mayo Hospital Lahore"],
    city: "Lahore", country: "PK", lat: 31.558, lng: 74.35071, institutionType: "university", website: "https://kemu.edu.pk/",
    tldr: "A medical university in Lahore whose teaching hospital, Mayo Hospital, has a radiotherapy and oncology department that runs academic trials such as a gentler schedule of salvage chemotherapy for lymphoma.",
    summary: "King Edward Medical University is a medical university in Lahore; its website lists a Radiotherapy and Oncology department among its clinical units. Its teaching hospital is Mayo Hospital. The university sponsors NCT07739654, a randomised phase 3 trial at Mayo Hospital, led by Abbas Khokhar, Professor of Medical Oncology and Radiotherapy, comparing a modified DHAP schedule (cisplatin 50 mg/m2 over six hours on days 1 and 2, cytarabine 2 g/m2 on days 1 and 2) with the standard schedule in 74 adults with relapsed or refractory diffuse large B-cell lymphoma, with overall response rate as the primary endpoint and the aim of reducing kidney toxicity and allowing outpatient treatment. The map position is the city centre.",
    programs: ["Radiotherapy and Oncology department, Mayo Hospital", "Undergraduate and postgraduate medical education"],
    cancers: ["dlbcl"], trials: ["nct07739654"],
    links: [{ label: "King Edward Medical University", url: "https://kemu.edu.pk/" }, ctgov("NCT07739654")] }),
];

const trials: TrialInput[] = [
  t({ id: "nct07695012", name: "Home-made anti-CD19 CAR-T cells for relapsed or refractory B-cell acute lymphoblastic leukaemia (Rawalpindi pilot)", nct: "NCT07695012", phase: "1", status: "recruiting",
    setting: "A Pilot, Single-Arm, Open-Label Feasibility Study of Autologous Anti-CD19 Chimeric Antigen Receptor T-Cell (CAR-T) Therapy in Pediatric and Young Adult Patients With Relapsed or Refractory B-Cell Acute Lymphoblastic Leukemia (r/r B-ALL)",
    sponsor: "National Institute of Blood and Marrow Transplant (NIBMT), Pakistan (sponsor-investigator Dr Zaineb Akram)", enrolled: 10, started: "2026-06-01", startedType: "actual",
    tldr: "A small trial of CAR-T cells made in Pakistan: ten patients aged 5 to 50 with leukaemia that has come back or not responded, treated in Rawalpindi.",
    summary: "Registered as early phase 1 on ClinicalTrials.gov (first posted 10 July 2026). Autologous T cells collected by leukapheresis at the Armed Forces Bone Marrow Transplant Centre are transduced with a self-inactivating third-generation lentiviral vector supplied by BIOCCUS (China), encoding an anti-CD19 single-chain variable fragment with a CD8-alpha hinge, a 4-1BB costimulatory domain and CD3-zeta, and expanded on an automated system. Eligible patients are aged 5 to 50 with relapsed or refractory B-cell acute lymphoblastic leukaemia. The primary outcome is the safety and feasibility of manufacturing and giving the product. Estimated enrolment is 10, with primary completion estimated for 31 December 2027, at the National University of Medical Sciences clinical trial unit in Rawalpindi. No results are posted.",
    cancers: ["all-leukemia"], targets: ["cd19"], technologies: ["car-t", "point-of-care-cell-manufacturing"], terms: ["crs"], institutions: ["afbmtc-rawalpindi"],
    links: [ctgov("NCT07695012")] }),

  t({ id: "nct07689058", name: "Home-made BCMA CAR-T cells for relapsed or refractory multiple myeloma (Rawalpindi pilot)", nct: "NCT07689058", phase: "2", status: "recruiting",
    setting: "Pilot, Open-Label, Single-Arm Study of Autologous BCMA-Directed CAR-T Cells in Patients With Relapsed/Refractory Multiple Myeloma in Pakistan",
    sponsor: "National Institute of Blood and Marrow Transplant (NIBMT), Pakistan (sponsor-investigator Dr Zaineb Akram)", enrolled: 10, started: "2026-06-01", startedType: "actual",
    tldr: "A small Rawalpindi study of CAR-T cells made in Pakistan and aimed at a protein on myeloma cells, for adults whose myeloma has come back after other treatment.",
    summary: "Registered as phase 2 on ClinicalTrials.gov (first posted 8 July 2026), a pilot, open-label, single-arm study of autologous BCMA-directed CAR-T cells in adults with relapsed or refractory multiple myeloma. The primary outcome is safety, tolerability and the feasibility of manufacturing and delivering the product. Estimated enrolment is 10, with primary completion estimated for 31 December 2027; the principal investigator listed is Tariq Ghafoor, at the National University of Medical Sciences clinical trial unit in Rawalpindi. No results are posted.",
    cancers: ["multiple-myeloma"], targets: ["bcma"], technologies: ["car-t", "point-of-care-cell-manufacturing"], terms: ["crs"], institutions: ["afbmtc-rawalpindi"],
    links: [ctgov("NCT07689058")] }),

  t({ id: "nct07739654", name: "Modified against standard DHAP salvage chemotherapy for relapsed or refractory diffuse large B-cell lymphoma (Lahore)", nct: "NCT07739654", phase: "3", status: "recruiting",
    setting: "Comparison of Effectiveness and Toxicities of Modified DHAP Protocol With Standard DHAP Protocol in Patients With Relapsed/Refractory Diffused Large B-cell Lymphoma",
    sponsor: "King Edward Medical University", enrolled: 74, started: "2026-03-18", startedType: "actual",
    tldr: "A Lahore trial testing whether splitting two chemotherapy drugs into smaller doses over two days works as well for lymphoma that has come back, with less harm to the kidneys and without a hospital stay.",
    summary: "Randomised phase 3 trial at Mayo Hospital, Lahore, sponsored by King Edward Medical University (principal investigator Abbas Khokhar). 74 adults with relapsed or refractory diffuse large B-cell lymphoma are randomised 1:1 to modified DHAP (dexamethasone 40 mg days 1 to 4, cisplatin 50 mg/m2 over 6 hours days 1 and 2, cytarabine 2 g/m2 over 3 hours days 1 and 2) or standard DHAP (dexamethasone 40 mg days 1 to 4, cisplatin 100 mg/m2 by 24-hour infusion day 1, cytarabine 2 x 2 g/m2 day 2). The primary endpoint is overall response rate by RECIL 2017; secondary endpoints are progression-free survival, toxicity by CTCAE and quality of life by EORTC QLQ-C30. Primary completion is estimated for 20 May 2027. No results are posted.",
    cancers: ["dlbcl"], drugs: ["cytarabine", "dexamethasone", "cisplatin"], institutions: ["kemu-lahore"],
    links: [ctgov("NCT07739654")] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-national-cancer-registry-pakistan-jcpsp-2023", name: "National Cancer Registry of Pakistan: First Comprehensive Report of Cancer Statistics 2015-2019",
    journal: "Journal of the College of Physicians and Surgeons Pakistan", year: 2023, doi: "10.29271/jcpsp.2023.06.625", pmid: "37300256", authors: "Ikram A, Pervez S, Khadim MT, et al.", paperType: "observational", participants: 269707,
    tldr: "The first attempt to pool Pakistan's separate cancer registries into one national picture: 269,707 cancers from 2015 to 2019, with breast cancer the commonest overall and oral cancer the commonest in men.",
    summary: "Data from six registries, the Punjab Cancer Registry, the Karachi Cancer Registry, the Pakistan Atomic Energy Commission cancer registry, the Armed Forces Institute of Pathology registry, Nishtar Medical University Hospital Multan and Shifa International Hospital Islamabad, were pooled, cleaned and analysed at the Health Research Institute of the National Institutes of Health, Islamabad, for 2015 to 2019. 269,707 cancer cases were analysed: 45.13% from Punjab, 26.83% from Sindh, 16.46% from Khyber Pakhtunkhwa and 3.52% from Balochistan.",
    findings: [
      "Breast cancer was the commonest cancer in both sexes combined: 57,633 cases (21.4%).",
      "In men the five commonest were oral (14,477; 11.6%), liver (8,398; 6.73%), colorectal (8,024; 6.43%), lung (7,547; 6.05%) and prostate (7,322; 5.87%).",
      "In women the five commonest were breast (56,250; 38.8%), ovary (8,823; 6.09%), oral (7,195; 4.97%), cervix (6,043; 4.17%) and colorectal (4,860; 3.36%).",
      "Leukaemia was the commonest cancer in children (1,626; 14.50%) and bone cancer in adolescents (880; 14%).",
    ],
    whatItMeans: "It is the nearest thing Pakistan has to a national cancer count, and its authors point out that most of the commonest cancers are largely preventable: oral cancer correlates with chewing habits, and liver, lung and cervical cancer with hepatitis B and C, smoking and high-risk human papillomavirus. It counts registered cases, not population incidence.",
    caveats: ["Pooled counts from registries of different kinds; PAEC says its own hospital-based registry supplied about 67% of the cases, so the shares describe who reached a registering centre rather than rates in the population.", "The abstract reports no population denominator or age-standardised rate for the country as a whole."],
    cancers: ["breast-cancer", "oral-cavity-cancer", "hcc", "colorectal", "cervical"], institutions: ["nih-pakistan", "punjab-cancer-registry", "paec-cancer-hospitals", "aku-karachi"],
    links: [doi("10.29271/jcpsp.2023.06.625", "J Coll Physicians Surg Pak 2023"), pubmed("37300256")] }),

  p({ id: "paper-cancer-lahore-2010-2019-bmj-open-2021", name: "Cancer in Lahore, Pakistan, 2010-2019: an incidence study",
    journal: "BMJ Open", year: 2021, doi: "10.1136/bmjopen-2020-047049", pmid: "34413099", authors: "Badar F, Mahmood S", paperType: "observational", participants: 58394,
    tldr: "Ten years of cancer counts from the Punjab Cancer Registry for Lahore, a city of about 11 million: more cancers were recorded in women than men, led by breast cancer.",
    summary: "The population-based Punjab Cancer Registry, coordinated from Shaukat Khanum Memorial Cancer Hospital and Research Centre and using active and passive data collection, reported cancer counts and incidence rates per 100,000 by age group, sex and site for residents of Lahore district (average annual population estimated at 11.1 million) from 2010 to 2019. The authors describe it as the first report of cancer statistics over a ten-year period for any region of Pakistan.",
    findings: [
      "58,394 incident cases were reported, 57.1% in women; adults accounted for 92.2%, adolescents 2.2% and children 5.6%.",
      "The age-standardised incidence rate per 100,000 was 103.4 in women and 65.6 in men.",
      "The highest rates were breast cancer in adult women (76.7), prostate cancer in adult men (10.7), bone tumours in adolescents and lymphoid leukaemia in children.",
      "Age-specific rates peaked at 60 to 70 years, at 420 per 100,000 women and 330 per 100,000 men.",
    ],
    whatItMeans: "Its authors describe it as the first report of cancer statistics over ten years for any region of Pakistan; it gives a baseline against which screening or prevention in Punjab could be measured.",
    caveats: ["One district; the authors say it is debatable whether the results can be extrapolated to the province or the country.", "The authors say completeness is difficult to evaluate at this stage and the extent of under-reporting cannot be gauged, and that patient follow-up and the collection of mortality data have been problematic."],
    cancers: ["breast-cancer", "prostate"], institutions: ["punjab-cancer-registry", "shaukat-khanum"],
    links: [doi("10.1136/bmjopen-2020-047049", "BMJ Open 2021"), pubmed("34413099")] }),

  p({ id: "paper-cancer-registries-pakistan-scoping-review-2025", name: "Cancer registries in Pakistan: a scoping review",
    journal: "The Lancet Regional Health - Southeast Asia", year: 2025, doi: "10.1016/j.lansea.2025.100615", pmid: "40584692", authors: "Virani SS, Ahmed KS, Springer M, et al.", paperType: "review",
    tldr: "A review of every cancer registry it could find in Pakistan: seventeen, covering only 19 of the country's 129 cities, with no unified national registry.",
    summary: "Following Joanna Briggs Institute and PRISMA-ScR guidance, the authors searched databases and grey literature, screened 3,714 abstracts and included 102 studies, 92 reporting registry data and 10 describing registry characteristics.",
    findings: [
      "Seventeen cancer registries were identified, with varying scope and geographical coverage.",
      "Only 19 of Pakistan's 129 cities contribute data to at least one registry.",
      "Data collection ranged from paper forms to advanced software; the Karachi Cancer Registry was noted for its high research output.",
      "Funding sources were limited and several registries faced operational challenges.",
    ],
    whatItMeans: "Helps explain why national cancer figures for Pakistan are estimates: the review found registry data from only 19 of 129 cities, collected by methods that vary. The authors call for a national cancer registry system; the 2025 amendment to the National Institute of Health law now requires a central register of cancer patients.",
    caveats: ["The review found registries through published studies and grey literature, so a registry that appears in neither may be missed."],
    institutions: ["aku-karachi", "nih-pakistan"],
    links: [doi("10.1016/j.lansea.2025.100615", "Lancet Reg Health Southeast Asia 2025"), pubmed("40584692")] }),
];

/** Records behind /countries/pk/ (wave 3). */
export const recordsPK: EntityInput[] = [...institutions, ...trials, ...papers];
