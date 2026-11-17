import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Nigeria: the public bodies and papers behind /countries/ng/ (wave 3) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 4 November 2026: NICRAT's website and its January to August 2026 activity
 * report (PDF text), the gazetted National Health Insurance Authority Act 2022 (a scanned PDF, read by OCR and checked
 * against the page images), NHIA's own news pages, NAFDAC's reliance guideline DR&R-GDL-035-00 (PDF text) and its
 * contact page, and the IAEA, WHO and IARC imPACT Review summary of September 2025 (PDF text). DOIs were resolved
 * through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: nicrat, nafdac, nhia and the national cancer registry link to each other, the registry links its
 * three papers through keyPapers, and nhia links the out-of-pocket cost study. Coordinates for the three Abuja bodies
 * are district or street points from OpenStreetMap, not building positions.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NICRAT_REPORT = "https://www.nicrat.gov.ng/wp-content/uploads/2023/08/NICRAT-FINAL-JAN-AUG-2026-EDITABLE-ACTIVITY-REPORT-FINAL-PDF.pdf";
const IMPACT_2025 = "https://www.iaea.org/sites/default/files/2025-11/nigeria-impact-241024.pdf";
const NHIA_ACT = "https://www.nhia.gov.ng/wp-content/uploads/2024/03/NHIA-Act-2022-Gazetted-Copy.pdf";
const NAFDAC_RELIANCE = "https://www.nafdac.gov.ng/wp-content/uploads/Files/Resources/Guidelines/DR&R_2025/Guidelines-For-Registration-And-Related-Activities-Of-Drugs-Vaccines-And-In-Vitro-Diagnostics-Using-The-Reliance-Procedure.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "nicrat", name: "National Institute for Cancer Research and Treatment (NICRAT)", aka: ["NICRAT"],
    city: "Abuja", country: "NG", lat: 9.069, lng: 7.444, institutionType: "government", website: "https://www.nicrat.gov.ng",
    tldr: "Nigeria's national cancer institute, set up by an Act of 2017. It leads the national cancer control plan, runs the national cancer registry and the Cancer Health Fund for patients who cannot pay, and coordinates screening and research.",
    summary: "The National Institute for Cancer Research and Treatment was established by the NICRAT Establishment Act 2017 to provide national leadership in cancer research, treatment and control. Its own overview lists among its objectives policy advice, regulating and enhancing access to cancer care, research, resource mobilisation, and establishing and maintaining a cancer registry. Its offices are at No. 9 Henry Adefope Crescent, Utako, Abuja; the coordinates on this record are the Utako district point, not the building.\n\nNICRAT wrote the National Strategic Cancer Control Plan 2023 to 2027 and runs the National Cancer Registry of Nigeria. Under the 2024 National Cancer Registry Regulations cancer became a notifiable disease, with NICRAT to enforce them. NICRAT also implements the National Cancer Health Fund, which the 2025 imPACT Review describes as supporting chemotherapy and radiotherapy for breast, cervical and prostate cancer in six public comprehensive cancer centres, and works with the Nigeria Cancer Access Partnership, a pooled-purchase programme for cancer medicines whose network NICRAT reported growing from 18 to 24 centres in June 2026.\n\nIts activity report for January to August 2026 records more than 4,000 people screened, eight preventive oncology clinics opened, more than 100 cancer registrars trained, eight registries accredited to the IARC standard, a three-year technical support agreement with the African Cancer Registry Network, a Childhood Cancer Fund live at three centres (Federal Medical Centre Abeokuta, Usmanu Danfodiyo University Teaching Hospital Sokoto and Jos University Teaching Hospital), a memorandum signed for 35 additional linear accelerators, and Nigeria's first consolidated Cancer Burden Report (2024). In August 2026 NICRAT announced that the President had approved a purpose-built NICRAT headquarters. NICRAT's website returned a bot check on 17 November 2026, so its overview page, activity report and news pages could not be re-read on that date.",
    programs: ["National Strategic Cancer Control Plan 2023 to 2027", "National Cancer Registry of Nigeria", "National Cancer Health Fund", "Childhood Cancer Fund", "Nigeria Cancer Access Partnership (with partners)", "National Cervical Cancer Screening Programme (with the national taskforce)", "Nigeria Journal of Cancer Research"],
    institutions: ["nigeria-national-cancer-registry", "nhia", "nafdac", "luth-lagos", "uch-ibadan", "iaea"],
    cancers: ["cervical", "prostate"], related: ["cancer-registries-surveillance", "global-oncology-access"],
    links: [
      { label: "NICRAT overview", url: "https://www.nicrat.gov.ng/nicrat-overview/" },
      { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
      { label: "National Strategic Cancer Control Plan 2023 to 2027 (NICRAT, PDF)", url: "https://www.nicrat.gov.ng/wp-content/uploads/2023/08/NATIONAL-STRATEGIC-CANCER-CONTROL-PLAN-2023-2027.pdf" },
      { label: "NICRAT: NCAP stakeholders meeting and chemotherapy suites (19 June 2026)", url: "https://www.nicrat.gov.ng/19/nicrat-upgrades-chemotherapy-suites-in-six-geopolitical-zones/" },
      { label: "NICRAT: Presidential approval for a new NICRAT headquarters (26 August 2026)", url: "https://www.nicrat.gov.ng/26/president-tinubus-renewed-hope-agenda-for-cancer-care-nigeria-to-build-west-africas-largest-best-equipped-cancer-institute/" },
      { label: "imPACT Review summary, Nigeria (IAEA, WHO and IARC, September 2025, PDF)", url: IMPACT_2025 },
    ] }),

  i({ id: "nigeria-national-cancer-registry", name: "National Cancer Registry of Nigeria", aka: ["Nigerian National System of Cancer Registries", "NSCR", "NCR Nigeria"],
    city: "Abuja (network of registries)", country: "NG", lat: 9.069, lng: 7.466, institutionType: "consortium", website: "https://ncr.nicrat.gov.ng",
    tldr: "Nigeria's network of population-based and hospital-based cancer registries, now run by the national cancer institute. A handful of regional registries aim to count every cancer in their area; OnCo found no single national count.",
    summary: "Nigeria's first cancer registry was set up in 1960 in the Pathology Department of University College Hospital, Ibadan, and its data appeared in the first three volumes of Cancer Incidence in Five Continents. The Nigerian National System of Cancer Registries was conceived in 2009 by the Federal Ministry of Health, the Society of Oncology and Cancer Research of Nigeria and the Institute of Human Virology Nigeria to coordinate and strengthen registries and establish new ones; its 2015 report lists population-based registries in Abuja (founded 2009), Calabar (2004) and Ibadan (1960).\n\nThe 2024 National Cancer Registry Regulations made cancer a notifiable disease and established the National Cancer Registry of Nigeria, which the 2025 imPACT Review describes as comprising 26 population-based and hospital-based registries; five population-based registries (Abuja, Calabar, Ekiti, Enugu and Ibadan) contribute data to Nigeria's GLOBOCAN estimates. The review also says none of the registries has contributed data to the Cancer Incidence in Five Continents monographs, which does not match the 2015 paper's account of Ibadan's data in the first three volumes. The review notes that most registries have no dedicated budget and that the last national census was in 2006, which limits incidence rates. NICRAT's 2023 to 2027 plan gave a different count, 34 registries with 13 population-based and 24 hospital-based. NICRAT now runs the registry from Abuja; the coordinates on this record are an approximate Wuse district point.\n\nThe latest published population-based figures found for this record are for 2009 to 2014 (Ibadan and Abuja 2009 to 2010, Calabar 2009 to 2013, Abuja and Enugu 2012 to 2014). NICRAT reports producing a first national Cancer Burden Report for 2024 and validating national registry standard operating procedures on 29 June 2026; its national cancer statistics page was under construction on 4 November 2026. NICRAT's website returned a bot check on 17 November 2026, so NICRAT's plan and pages could not be re-read on that date.",
    programs: ["Population-based registries (Abuja, Calabar, Ekiti, Enugu, Ibadan and others)", "Hospital-based registries", "Cancer notification under the 2024 regulations", "National registry standard operating procedures (validated 2026)"],
    institutions: ["nicrat", "uch-ibadan", "iarc"], cancers: ["cervical", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-jedy-agba-nigeria-registries-canep-2012", "paper-jedy-agba-nscr-front-public-health-2015", "paper-ekanem-parkin-calabar-incidence-canep-2016"],
    links: [
      { label: "National Cancer Registry, Nigeria (NICRAT)", url: "https://ncr.nicrat.gov.ng/" },
      { label: "imPACT Review summary, section 4: cancer registry (PDF)", url: IMPACT_2025 },
      { label: "NICRAT: experts approve Nigeria's first national cancer registry standards (1 July 2026)", url: "https://www.nicrat.gov.ng/01/experts-approve-nigerias-first-national-cancer-registry-standards/" },
      { label: "NICRAT: cancer declared a notifiable disease in Nigeria (28 June 2024)", url: "https://www.nicrat.gov.ng/28/breaking-news-cancer-declared-a-notifiable-disease-in-nigeria/" },
      doi("10.3389/fpubh.2015.00186", "Jedy-Agba et al., the Nigerian National System of Cancer Registries (Front Public Health 2015)"),
    ] }),

  i({ id: "nafdac", name: "National Agency for Food and Drug Administration and Control (NAFDAC)", aka: ["NAFDAC"],
    city: "Abuja", country: "NG", lat: 9.055, lng: 7.465, institutionType: "government", website: "https://www.nafdac.gov.ng",
    tldr: "Nigeria's medicines regulator. It registers medicines, including cancer medicines, can rely on an approval by a stringent foreign regulator to shorten its review, and holds the World Health Organization's maturity level 3 rating for medicines and vaccines.",
    summary: "NAFDAC was established by Decree No. 15 of 1993, now the NAFDAC Act Cap N1 Laws of the Federation of Nigeria 2004, to regulate and control the manufacture, importation, exportation, distribution, advertisement, sale and use of food, drugs, cosmetics, medical devices and other regulated products. Its corporate headquarters is at Plot 2032, Olusegun Obasanjo Way, Zone 7, Wuse, Abuja; the coordinates are a point on that street, not the building.\n\nIts reliance guideline (DR&R-GDL-035-00, effective 10 September 2024) lets it register a drug, vaccine or in vitro diagnostic already approved by a stringent regulatory authority as the World Health Organization defines it through an abridged assessment, using that authority's assessment reports and its inspection reports (no more than three years old) while keeping its own decision. The guideline states that NAFDAC will decide on registration within 60 working days (about 90 calendar days); it also allows NAFDAC to rely on analytical reports from quality control laboratories in such countries and still to test products itself.\n\nThe Presidency reported in August 2025 that NAFDAC kept the World Health Organization's maturity level 3 status for regulating medicines and vaccines (non-producing) after a re-benchmarking from 28 to 30 May 2025, a level it first reached in 2022 as the first African national regulator to do so in that category. NAFDAC's Director General sits on the National Health Technology Assessment Steering Committee, whose inauguration the NHIA reported on 22 September 2026.",
    programs: ["Product registration", "Reliance registration pathway (DR&R-GDL-035-00)", "Clinical trial and drug evaluation (Drug Evaluation and Research Directorate)", "Pharmacovigilance"],
    institutions: ["nicrat", "nhia"],
    links: [
      { label: "NAFDAC: about NAFDAC", url: "https://www.nafdac.gov.ng/about-nafdac/" },
      { label: "NAFDAC: guidelines for registration using the reliance procedure (PDF)", url: NAFDAC_RELIANCE },
      { label: "State House: NAFDAC maintains WHO maturity level 3 (11 August 2025)", url: "https://statehouse.gov.ng/president-tinubu-congratulates-nafdac-on-maintaining-who-maturity-level-3-for-regulation-of-medicines-and-vaccines/" },
    ] }),

  i({ id: "nhia", name: "National Health Insurance Authority (NHIA)", aka: ["NHIA", "National Health Insurance Scheme", "NHIS Nigeria"],
    city: "Abuja", country: "NG", lat: 9.069, lng: 7.444, institutionType: "government", website: "https://www.nhia.gov.ng",
    tldr: "Nigeria's national health insurance regulator and purchaser. The 2022 Act requires every resident to obtain health insurance, but most cancer care is still paid out of pocket and the Authority covers selected cancer services through cost sharing.",
    summary: "The National Health Insurance Authority Act 2022 (Act No. 17, dated 19 May 2022) repealed the National Health Insurance Scheme Act and established the Authority, with the duty to ensure that health insurance is mandatory for every Nigerian and legal resident. Section 14 requires every person resident in Nigeria to obtain health insurance, and section 25 establishes a Vulnerable Group Fund to subsidise insurance for vulnerable people and pay premiums for the indigent; the Act defines the vulnerable group as including children under five, pregnant women, the aged, the physically and mentally challenged and the indigent. The Act does not mention cancer. The Authority gives its office address as Plot 297, POW Mafemi Crescent, off Solomon Lar Way, Utako District, Abuja; the coordinates are the Utako district point.\n\nIn September 2026 the Authority reported more than 23 million people enrolled, and listed mammography, CT and MRI scans, cancer-related diagnostic tests and radiotherapy among the cancer services in its benefits and payment structure, with selected oncology medicines through a cost-sharing arrangement with Roche. In February 2025 its Director General was reported announcing a 50% subsidy on radiotherapy capped at 400,000 naira, and cost sharing for oncology medicines with Roche and Pfizer that had reached over 200 patients at seven tertiary centres. The 2025 imPACT Review notes that the Basic Health Care Provision Fund package included self breast examination as its only cancer component, and that out-of-pocket spending made up 76% of current health expenditure.\n\nThe Authority set up a Strategic Purchasing Department with a health technology assessment division in 2025, ran pilot assessments including colorectal cancer screening and sorafenib for advanced liver cancer, and its assessment division is the secretariat of the national steering committee whose inauguration it reported on 22 September 2026.",
    programs: ["Formal sector programme", "Group, Individual and Family Social Health Insurance Programme (GIFSHIP)", "Vulnerable Group Fund", "Basic Health Care Provision Fund (implemented by the NHIA)", "Oncology cost sharing with manufacturers", "Health technology assessment division (from 2025)"],
    institutions: ["nicrat", "nafdac"], companies: ["roche-genentech", "pfizer"], drugs: ["sorafenib"],
    keyPapers: ["paper-wuraola-breast-cancer-out-of-pocket-nigeria-jcpo-2024"],
    links: [
      { label: "National Health Insurance Authority Act 2022, gazetted copy (PDF)", url: NHIA_ACT },
      { label: "NHIA: enrolment hits 23m as cancer, HIV and TB coverage expands (25 September 2026)", url: "https://www.nhia.gov.ng/nhia-enrolment-hits-23m-as-cancer-hiv-tb-coverage-expands/" },
      { label: "NHIA: Nigeria institutionalises health technology assessment (22 September 2026)", url: "https://www.nhia.gov.ng/nigeria-institutionalises-health-technology-assessment-to-advance-uhc/" },
      { label: "Nairametrics: NHIA introduces 400,000 naira subsidy for radiotherapy (6 February 2025)", url: "https://nairametrics.com/2025/02/06/nhia-introduces-n400000-subsidy-for-cancer-patients-under-cost-sharing-initiative/" },
      { label: "NHIA: Vulnerable Group Fund", url: "https://www.nhia.gov.ng/vulnerable-group/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-jedy-agba-nigeria-registries-canep-2012", name: "Cancer incidence in Nigeria from the Ibadan and Abuja population-based cancer registries, 2009 to 2010",
    journal: "Cancer Epidemiology", year: 2012, doi: "10.1016/j.canep.2012.04.007", pmid: "22621842", authors: "Jedy-Agba E, Curado MP, Ogunbiyi O, et al.", paperType: "observational", participants: 4521,
    tldr: "Two Nigerian population-based registries, in Ibadan and Abuja, counted 4,521 cancers over 2009 and 2010: breast and cervical cancer were the commonest in women and prostate cancer in men.",
    summary: "Published as \"Cancer incidence in Nigeria: a report from population-based cancer registries\". The authors analysed two years of data (2009 to 2010) from the Ibadan Population Based Cancer Registry and the Abuja Population Based Cancer Registry, both part of the Nigerian national cancer registry programme, and reported age-specific and age-standardised incidence by registry and sex. The Ibadan registry recorded 3,393 cancers, 66% of them in women; the Abuja registry reported 1,128 invasive cancers over the same period. Mean age at diagnosis was around 50 in men and 45 to 49 in women.",
    findings: [
      "Age-standardised incidence of all invasive cancers was 66.4 per 100,000 men and 130.6 per 100,000 women in Ibadan, and 58.3 and 138.6 in Abuja.",
      "Breast cancer incidence was 52.0 per 100,000 in Ibadan and 64.6 in Abuja; cervical cancer 36.0 and 30.3.",
      "Breast and cervical cancer were the commonest cancers in women and prostate cancer the commonest in men; the differences between the two cities were not statistically significant.",
    ],
    whatItMeans: "These are among the few measured, not modelled, cancer rates for Nigeria, and they show cancer recorded about twice as often in women as in men, driven by breast and cervical cancer.",
    caveats: ["Two cities and two years; the registries cover a small fraction of Nigeria's population.", "The Abuja registry's sex breakdown in the abstract (389 men and 768 women) sums to more than its stated total of 1,128."],
    institutions: ["nigeria-national-cancer-registry", "uch-ibadan"], cancers: ["cervical", "prostate"],
    links: [doi("10.1016/j.canep.2012.04.007", "Cancer Epidemiol 2012"), pubmed("22621842")] }),

  p({ id: "paper-jedy-agba-nscr-front-public-health-2015", name: "Building national cancer registration in a developing country: the Nigerian National System of Cancer Registries",
    journal: "Frontiers in Public Health", year: 2015, doi: "10.3389/fpubh.2015.00186", pmid: "26284233", authors: "Jedy-Agba EE, Oga EA, Odutola M, et al.", paperType: "methods",
    tldr: "A case study of how Nigeria built a national network of cancer registries from 2009, the problems it met and how they were overcome, written as a guide for other low and middle income countries.",
    summary: "Published as \"Developing National Cancer Registration in Developing Countries: Case Study of the Nigerian National System of Cancer Registries\". The paper describes the Nigerian National System of Cancer Registries, conceived in 2009 by the Federal Ministry of Health, the Society of Oncology and Cancer Research of Nigeria and the Institute of Human Virology Nigeria with support from the United States National Institutes of Health. It coordinates registries, strengthens existing ones, establishes new ones, compiles and analyses data, and makes them available to researchers and policy makers. It traces registration back to the Ibadan registry founded in 1960, which contributed to the first three volumes of Cancer Incidence in Five Continents and later stopped submitting data, and records that the Ibadan, Abuja and Calabar registries contributed to GLOBOCAN 2012.",
    findings: [
      "At least three population-based registries had been established or strengthened, and several hospital-based registries were being mentored towards population-based status.",
      "A table of African registries in 2013 lists Abuja (covering 1,406,239 people, founded 2009), Calabar (647,458, founded 2004) and Ibadan (2,549,265, founded 1960).",
      "Named challenges include Nigeria's large population, limited health infrastructure, poor vital statistics and funding.",
    ],
    whatItMeans: "Explains why Nigeria's cancer figures rest on a few city registries and IARC models, and what it took to start building more.",
    caveats: ["Written by the network's own team; describes the system up to about 2015."],
    institutions: ["nigeria-national-cancer-registry", "uch-ibadan"],
    links: [doi("10.3389/fpubh.2015.00186", "Front Public Health 2015"), pubmed("26284233")] }),

  p({ id: "paper-ekanem-parkin-calabar-incidence-canep-2016", name: "Five-year cancer incidence in Calabar, Nigeria, 2009 to 2013",
    journal: "Cancer Epidemiology", year: 2016, doi: "10.1016/j.canep.2016.04.014", pmid: "27164305", authors: "Ekanem IO, Parkin DM", paperType: "observational", participants: 719,
    tldr: "The Calabar population-based cancer registry recorded 719 new cancers in two local government areas over 2009 to 2013; breast and cervical cancer made up three in five cancers in women and prostate cancer was the commonest in men.",
    summary: "The Calabar Cancer Registry covers two local government areas of Calabar, the capital of Cross River State, 375,196 inhabitants in 2006. Over 2009 to 2013 it registered 719 new cancers, 320 in men and 399 in women, and the paper presents incidence rates by site, sex and age.",
    findings: [
      "Age-standardised incidence was 78.8 per 100,000 in men and 86.9 per 100,000 in women.",
      "Breast and cervical cancers accounted for 60.4% of cancers in women; breast cancer (35 per 100,000) was almost twice as common as cervical cancer (21 per 100,000) and occurred in younger women.",
      "Prostate cancer was the commonest cancer in men (50.8 per 100,000); Hodgkin lymphoma was common in both sexes and HIV-related cancers were recorded in moderate numbers.",
    ],
    whatItMeans: "A third measured population rate for Nigeria, from Calabar in Cross River State, with prostate, breast and cervical cancer again leading.",
    caveats: ["A small population and small numbers, so site-specific rates are imprecise.", "Population denominators rest on the 2006 census."],
    institutions: ["nigeria-national-cancer-registry"], cancers: ["prostate", "cervical"],
    links: [doi("10.1016/j.canep.2016.04.014", "Cancer Epidemiol 2016"), pubmed("27164305")] }),

  p({ id: "paper-wuraola-breast-cancer-out-of-pocket-nigeria-jcpo-2024", name: "The out-of-pocket cost of breast cancer care in Nigeria: a prospective study at one teaching hospital",
    journal: "Journal of Cancer Policy", year: 2024, doi: "10.1016/j.jcpo.2024.100518", pmid: "39522636", authors: "Wuraola FO, Blackman C, Olasehinde O, et al.", paperType: "observational", participants: 71,
    tldr: "Among 71 patients treated for breast cancer with curative intent at a teaching hospital in south-west Nigeria, the mean cost of care was 5,193 US dollars and between 79% and all of them faced catastrophic health spending.",
    summary: "Consecutive patients starting curative-intent treatment for newly diagnosed breast cancer at a single tertiary hospital in south-west Nigeria between August 2019 and September 2022 reported household income, capacity to pay and all direct and indirect costs, at admission and at six-month follow-up. Catastrophic health expenditure was defined three ways: spending above 40% of capacity to pay, or above 10% or 25% of annual income.",
    findings: [
      "Mean cost of care was 5,192.77 US dollars against a mean annual capacity to pay of 2,866.93 US dollars.",
      "Between 56 (78.9%) and 71 (100%) of the 71 patients experienced catastrophic health expenditure, depending on the costs included and the threshold.",
      "66.2% presented at stage III or later, 95.8% received chemotherapy and 23.9% received adjuvant radiotherapy; 66% had no health insurance.",
    ],
    whatItMeans: "For most patients in this study, paying for breast cancer treatment cost more than their household could afford, which is why insurance cover for cancer is a central question in Nigeria.",
    caveats: ["One hospital and 71 patients; costs elsewhere in Nigeria may differ.", "Costs are self-reported by patients."],
    links: [doi("10.1016/j.jcpo.2024.100518", "J Cancer Policy 2024"), pubmed("39522636")] }),
];

/** Records behind /countries/ng/ (wave 3). */
export const recordsNG: EntityInput[] = [...institutions, ...papers];
