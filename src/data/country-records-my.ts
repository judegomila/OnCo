import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Malaysia: the institutions and papers behind /countries/my/ (wave 4) that the corpus did not hold. Every summary was
 * written from the raw text of the body's own page or PDF (pdftotext, or the HTML itself), most of them in Malay where
 * that is the language of the source: Institut Kanser Negara's Malaysia National Cancer Registry Report 2017-2021
 * (December 2025) and its e-Summary (July 2024), its corporate page, the Ministry of Health's National Strategic Plan
 * for Cancer Control Programme 2021-2025, the Medicines Formulary guidelines (fourth edition, 2025, in Malay) and the
 * dossier guidelines (first edition, 2015), NPRA's Drug Registration Guidance Document Appendix 3 (July 2026), its
 * directive on the Facilitated Registration Pathway (November 2023, in Malay) and its pilot notice of May 2026,
 * MaHTAS's corporate page, ProtectHealth's PeKa Sihat page and its tender deck for a cancer drug list, and Clinical
 * Research Malaysia's home page. The www.moh.gov.my pages answered 403, so ministry facts come from its own PDFs.
 * DOIs were resolved through Europe PMC and the abstracts read.
 *
 * Inbound links: the six institutions link to each other through `institutions`, and the three papers are linked from
 * the institution records' `keyPapers`, so none depends on the country page for a link.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MNCR = "https://nci.moh.gov.my/images/pdf_folder/Malaysia-National-Cancer-Registry-Report-2017-2021-laterst-2026.pdf";
const MNCR_SUMMARY = "https://nci.moh.gov.my/images/pdf/SUMMARY-OF-MALAYSIA-NATIONAL-CANCER-REGISTRY-REPORT-2017-2021.pdf";
const IKN_ABOUT = "https://nci.moh.gov.my/index.php/info-korporat/pengenalan";
const IKN_REPORTS = "https://nci.moh.gov.my/index.php/penerbitan/laporan";
const NSPCCP = "https://www.iccp-portal.org/system/files/plans/National_Strategic_Plan_for_Cancer_Control_Programme_2021-2025.pdf";
const FUKKM_GUIDE = "https://pharmacy.moh.gov.my/sites/default/files/document-upload/buku-panduan-formulari-ubat-kementerian-kesihatan-malaysia-v3.pdf";
const FUKKM_DOSSIER = "https://pharmacy.moh.gov.my/sites/default/files/document-upload/guidelines-submission-dossier-listing-ministry-health-medicines-formulary-finalised.pdf";
const FEES = "https://hq.moh.gov.my/ohp/images/pdf/charge/takrif_dan_jadual1982.pdf";
const NPRA_APP3 = "https://npra.gov.my/~npraweb/easyarticles/images/users/1153/drgd_appendices/APPENDIX-3-Guidelines-on-Registration-of-New-Drug-Products.pdf";
const NPRA_FRP = "https://npra.gov.my/easyarticles/images/users/1051/Direktif--Guideline-FRP-Nov-2023.pdf";
const NPRA_PILOT = "https://npra.gov.my/index.php/en/component/content/article/225-english/1527850-new-route-under-the-facilitated-registration-pathway-frp-a-one-year-pilot-study-commencing-2-may-2026.html";
const MAHTAS = "https://mymahtas.moh.gov.my/index.php/about-us/info-korporat";
const PEKA = "https://protecthealth.com.my/peka-sihat/";
const MHIT_CDL = "https://protecthealth.com.my/wp-content/uploads/2026/04/Open-Day-MHIT.pdf";
const CRM = "https://clinicalresearch.my/";

const institutions: InstitutionInput[] = [
  i({ id: "institut-kanser-negara", name: "Institut Kanser Negara (National Cancer Institute, Malaysia)", aka: ["IKN", "National Cancer Institute Malaysia", "NCI Malaysia", "Malaysia National Cancer Registry", "MNCR"],
    city: "Putrajaya", country: "MY", lat: 2.926, lng: 101.696, institutionType: "cancer-center", website: "https://nci.moh.gov.my",
    tldr: "Malaysia's national cancer hospital in Putrajaya, run by the Ministry of Health. It treats patients with radiotherapy, systemic treatment, surgery, nuclear medicine and palliative care, and its National Cancer Registry Department publishes the country's cancer statistics.",
    summary: "Institut Kanser Negara is a Ministry of Health cancer hospital in Presint 7, Putrajaya. Its own history says it began operating on 2 September 2013 and was handed over to the ministry on 18 September 2013; the ground-breaking was on 9 January 2007. Its main services are radiotherapy and oncology, nuclear medicine, surgical oncology and palliative care. The National Strategic Plan for Cancer Control Programme 2021-2025 lists it among the six Ministry of Health oncology centres that give both systemic treatment and radiotherapy, records PSMA-directed radioligand therapy for prostate cancer at the institute in 2020, and notes that its radiology department kept low-dose CT lung screening as a routine service after a national study was stopped.\n\nIts National Cancer Registry Department runs the Malaysia National Cancer Registry, a nationwide population-based registry since 2007 covering 13 states and 3 federal territories. The third five-year report, Malaysia National Cancer Registry Report 2017-2021 (December 2025), counts 168,823 new cancers in Malaysian citizens and residents diagnosed in 2017 to 2021, at age-standardised rates of 107.3 per 100,000 in men and 120.8 in women. Cases reach the registry through the M2b online notification module of the Malaysian Health Data Warehouse (since 2018), a Director General of Health circular of April 2020 that made notification mandatory in government facilities, pathology and discharge records, and death records. The registry also published the Malaysian Study on Cancer Survival (MySCan) in 2018, for cancers diagnosed in 2007 to 2011.\n\nThe coordinates are a Putrajaya centroid, not the street address.",
    programs: ["Malaysia National Cancer Registry (population-based, nationwide since 2007)", "Malaysia National Cancer Registry Report 2017-2021", "Malaysian Study on Cancer Survival (MySCan, 2018)", "Radiotherapy and oncology", "Nuclear medicine, including radioligand therapy", "Palliative care"],
    cancers: ["breast-cancer", "colorectal", "lung-cancer", "nasopharyngeal", "cervical", "prostate"],
    institutions: ["ministry-of-health-malaysia", "mahtas-malaysia", "clinical-research-malaysia", "ummc-kuala-lumpur"],
    links: [
      { label: "IKN: Malaysia National Cancer Registry Report 2017-2021 (December 2025, PDF)", url: MNCR },
      { label: "IKN: Summary of the Malaysia National Cancer Registry Report 2017-2021 (July 2024, PDF)", url: MNCR_SUMMARY },
      { label: "IKN: Pengenalan (history, Malay)", url: IKN_ABOUT },
      { label: "IKN: Laporan (reports, Malay)", url: IKN_REPORTS },
      { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025 (PDF, ICCP portal)", url: NSPCCP },
    ] }),

  i({ id: "ministry-of-health-malaysia", name: "Ministry of Health Malaysia", aka: ["Kementerian Kesihatan Malaysia", "KKM", "MOH Malaysia", "Pharmaceutical Services Programme", "Program Perkhidmatan Farmasi"],
    city: "Putrajaya", country: "MY", lat: 2.926, lng: 101.696, institutionType: "government", website: "https://www.moh.gov.my",
    tldr: "Malaysia's health ministry runs the public hospitals and clinics where most cancer care is given for a nominal fee, keeps the Ministry of Health Medicines Formulary that decides which medicines its facilities use, and writes the national cancer control plan.",
    summary: "The Ministry of Health runs Malaysia's public health service. Its fee schedule, the Fees (Medical) Order 1982 as amended in 2017, charges a citizen RM1 for a general outpatient visit, nothing for a first specialist clinic visit on referral from a government doctor and RM5 for each specialist follow-up; a third-class inpatient pays at most RM500 per admission. In a 2016 parliamentary answer the minister gave chemotherapy charges of RM200, RM100 and RM50 per treatment in first, second and third class, and a 50% reduction in third class with no RM5 specialist registration charge for citizens aged 60 and over.\n\nIts Pharmaceutical Services Programme keeps the Ministry of Health Medicines Formulary (Formulari Ubat KKM), which listed 1,650 preparations of 864 chemical entities in January 2025. A panel chaired by the Director General of Health decides listings, meeting three times a year; a medicine or indication outside the formulary needs special approval. The National Strategic Plan for Cancer Control Programme 2021-2025, published by the ministry's Non-Communicable Disease Section, records that gefitinib and afatinib were listed for EGFR-mutated metastatic non-small cell lung cancer after prices were negotiated under value-based medicine, and lists six ministry oncology centres giving both systemic treatment and radiotherapy.\n\nThe ministry's own website answered 403 to our requests; the facts here come from its PDFs and those of its agencies. The coordinates are a Putrajaya centroid.",
    programs: ["Public hospitals and health clinics (Fees (Medical) Order 1982)", "Ministry of Health Medicines Formulary (FUKKM)", "National Strategic Plan for Cancer Control Programme 2021-2025", "Cervical screening by HPV testing with self-sampling", "Colorectal screening by iFOBT"],
    cancers: ["breast-cancer", "colorectal", "cervical", "lung-cancer"], drugs: ["gefitinib", "afatinib"], technologies: ["hpv-testing"],
    institutions: ["institut-kanser-negara", "npra-malaysia", "mahtas-malaysia", "protecthealth-malaysia", "clinical-research-malaysia"],
    keyPapers: ["paper-kimman-action-catastrophic-expenditure-southeast-asia-bmc-med-2015"],
    links: [
      { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025 (PDF)", url: NSPCCP },
      { label: "Pharmaceutical Services Programme: Garis Panduan Formulari Ubat KKM, fourth edition 2025 (PDF, Malay)", url: FUKKM_GUIDE },
      { label: "Pharmaceutical Services Division: Guidelines for Submission of Dossier for Listing into the MOH Medicines Formulary, first edition 2015 (PDF)", url: FUKKM_DOSSIER },
      { label: "Ministry of Health: outpatient, surgical and other charges under the Fees (Medical) Order 1982 (PDF, Malay)", url: FEES },
      { label: "Dewan Rakyat: Minister of Health's reply on cancer charges, 19 May 2016 (PDF, Malay)", url: "https://pardocs.sinarproject.org/documents/2016-may-parliamentary-session/oral-questions-soalan-lisan/2016-05-19-parliamentary-replies/soalan-12.pdf" },
      { label: "Ministry of Health Malaysia", url: "https://www.moh.gov.my" },
    ] }),

  i({ id: "npra-malaysia", name: "National Pharmaceutical Regulatory Agency (NPRA), Malaysia", aka: ["NPRA", "Bahagian Regulatori Farmasi Negara", "Drug Control Authority", "Pihak Berkuasa Kawalan Dadah", "DCA Malaysia"],
    city: "Petaling Jaya", country: "MY", lat: 3.107, lng: 101.606, institutionType: "government", website: "https://www.npra.gov.my",
    tldr: "Malaysia's medicines regulator, part of the Ministry of Health. It evaluates new medicines for the Drug Control Authority in a target of 245 working days, and has shorter reliance routes for medicines already approved by named reference regulators.",
    summary: "The National Pharmaceutical Regulatory Agency, at Lot 36, Jalan Universiti, Petaling Jaya, evaluates medicines for registration by the Drug Control Authority under the Sale of Drugs Act 1952 and the Control of Drugs and Cosmetics Regulations 1984. Its Drug Registration Guidance Document (third edition, 12th revision, July 2026) gives an evaluation timeline of 245 working days for a new chemical entity, with consultation of local clinical specialists, and 210 for a hybrid product.\n\nIts Facilitated Registration Pathway, introduced by directive on 27 March 2019 with the EMA and US FDA as reference agencies, was revised from 1 January 2024: the reference agencies now also include Health Canada, Japan's PMDA, Swissmedic, Australia's TGA and the UK MHRA, the abbreviated review target fell from 120 to 90 working days, and a verification review for products assessed through the ASEAN Joint Assessment takes 30 working days. Malaysia joined the World Health Organization's collaborative registration procedures for prequalified products on 9 January 2020 and for products authorised by stringent authorities on 2 June 2022. A one-year pilot from 2 May 2026 adds a recognition route with a 60-working-day administrative timeline for products approved by the US FDA or through the EMA's centralised procedure, if submitted within three months of that approval.\n\nTwo studies by NPRA staff with the Centre for Innovation in Regulatory Science measured median approval times for new active substances of 515 calendar days in 2017 and 399 in 2019, agency and applicant time together. The coordinates are a Petaling Jaya centroid.",
    programs: ["New drug registration: 245 working days (new chemical entity), 210 (hybrid)", "Facilitated Registration Pathway: abbreviated review 90 working days, verification review 30", "Recognition route pilot for US FDA and EMA approvals (60 working days, from 2 May 2026)", "WHO collaborative registration procedures"],
    institutions: ["ministry-of-health-malaysia", "mahtas-malaysia", "clinical-research-malaysia"],
    keyPapers: ["paper-mohd-sani-npra-approval-times-opera-tirs-2025", "paper-sani-npra-new-active-substances-2017-opera-tirs-2020"],
    links: [
      { label: "NPRA: DRGD Appendix 3, Guideline on Registration of New Drug Products (July 2026, PDF)", url: NPRA_APP3 },
      { label: "NPRA: Directive No. 13 of 2023 on the Facilitated Registration Pathway, Revision 1 (PDF, Malay and English)", url: NPRA_FRP },
      { label: "NPRA: New route under the Facilitated Registration Pathway, pilot from 2 May 2026", url: NPRA_PILOT },
      doi("10.1007/s43441-025-00846-3", "Mohd Sani et al., approval times 2017 and 2019 (Ther Innov Regul Sci 2025)"),
      { label: "National Pharmaceutical Regulatory Agency", url: "https://www.npra.gov.my" },
    ] }),

  i({ id: "mahtas-malaysia", name: "Malaysian Health Technology Assessment Section (MaHTAS)", aka: ["MaHTAS", "Cawangan Penilaian Teknologi Kesihatan"],
    city: "Putrajaya", country: "MY", lat: 2.926, lng: 101.696, institutionType: "government", website: "https://mymahtas.moh.gov.my",
    tldr: "The health technology assessment unit of Malaysia's Ministry of Health. It assesses new medicines, devices and procedures, writes the national clinical practice guidelines and scans for emerging technologies.",
    summary: "MaHTAS sits in the Medical Development Division of the Ministry of Health and describes itself as the ministry's custodian of evidence- and value-based medicine. It produces health technology assessment reports on drugs, biologics, devices, equipment, procedures and programmes, assessing effectiveness, safety, cost-effectiveness and organisational, social and ethical issues; it coordinates the development of clinical practice guidelines; and it runs horizon scanning for emerging technologies.\n\nThe National Strategic Plan for Cancer Control Programme 2021-2025 reports that the ministry's HTA unit assessed low-dose CT for lung cancer screening in 2017 and, because the test had high sensitivity but low specificity in high-risk people, recommended it only in a research setting; the plan, published in 2021, says no national lung cancer screening programme had yet been established. The plan also describes value-based medicine as the ministry's route to deciding whether a new therapy is used in its hospitals.\n\nOnCo found no published cost-effectiveness threshold for Malaysia. The coordinates are a Putrajaya centroid; the section's address was not read.",
    programs: ["Health technology assessment reports", "Clinical practice guidelines", "Horizon scanning"],
    cancers: ["lung-cancer"], terms: ["hta"],
    institutions: ["ministry-of-health-malaysia", "npra-malaysia", "institut-kanser-negara"],
    links: [
      { label: "MaHTAS: Info korporat", url: MAHTAS },
      { label: "Ministry of Health: National Strategic Plan for Cancer Control Programme 2021-2025, section on screening (PDF)", url: NSPCCP },
    ] }),

  i({ id: "protecthealth-malaysia", name: "ProtectHealth Corporation", aka: ["ProtectHealth", "ProtectHealth Corporation Sdn Bhd", "ProtectHealth Malaysia", "PeKa B40", "PeKa Sihat"],
    city: "Cyberjaya", country: "MY", lat: 2.922, lng: 101.65, institutionType: "government", website: "https://protecthealth.com.my",
    tldr: "A not-for-profit company owned by Malaysia's Ministry of Health that runs health financing schemes for the government, including PeKa Sihat for lower-income Malaysians aged 40 and over, which pays an incentive of RM1,000 for completing cancer treatment.",
    summary: "ProtectHealth Corporation Sdn Bhd was incorporated on 19 December 2016 as a wholly owned, not-for-profit subsidiary of ProtectHealth Malaysia, established under the Ministry of Health, with mandates in national health financing and strategic purchasing. ProtectHealth's site refused our requests on 17 November 2026, so the details in this record could not be re-read on that date. Its own slides give its roles: administrator of the Skim Peduli Kesihatan untuk Kumpulan B40 (PeKa B40, now PeKa Sihat) from 15 April 2019, and of the Skim Perubatan MADANI pilot from 5 May 2023.\n\nPeKa Sihat is for Malaysian citizens in the B40 lower-income group: recipients of Sumbangan Tunai Rahmah and their registered spouses aged 40 and over qualify automatically. After a health screening, benefits include medical equipment worth up to RM20,000, an incentive of RM1,000 for completing cancer treatment in a Ministry of Health hospital, and a transport allowance of up to RM500 in the peninsula or RM1,000 in Sabah, Sarawak and Labuan.\n\nIn 2026 it ran the tender for a Cancer Drug List for the base Medical Health Insurance and Takaful (MHIT) product: a positive list of cancer medicines for private insurance, built on the Ministry of Health Medicines Formulary's dossier concepts, with cost-sharing categories and referral pathways to public oncology services when a policyholder reaches the cover limit. The tender was released on 3 April 2026, with a contract planned for May to November 2026. Its office is in Century Square, Cyberjaya; the coordinates are a Cyberjaya centroid.",
    programs: ["PeKa Sihat (formerly PeKa B40): screening and cancer treatment completion incentive", "Skim Perubatan MADANI", "Cancer Drug List for the base MHIT product (tender 2026)"],
    institutions: ["ministry-of-health-malaysia", "national-cancer-society-malaysia"],
    keyPapers: ["paper-kimman-action-catastrophic-expenditure-southeast-asia-bmc-med-2015"],
    links: [
      { label: "ProtectHealth: PeKa Sihat (Malay)", url: PEKA },
      { label: "ProtectHealth: Cancer Drug List for the base MHIT product, open day slides (2026, PDF)", url: MHIT_CDL },
      { label: "ProtectHealth: contact", url: "https://protecthealth.com.my/contact/" },
    ] }),

  i({ id: "clinical-research-malaysia", name: "Clinical Research Malaysia", aka: ["CRM"],
    city: "Kuala Lumpur", country: "MY", lat: 3.139, lng: 101.687, institutionType: "government", website: CRM,
    tldr: "A research management organisation set up by Malaysia's Ministry of Health in 2012 to bring industry clinical trials to Malaysian hospitals and support the investigators who run them.",
    summary: "Clinical Research Malaysia was established by the Ministry of Health in 2012 (company number 1006282-X) and describes itself as a research management organisation offering end-to-end support for clinical research, including feasibility studies and study coordinators. Its home page reports that it and AstraZeneca won the British Malaysian Chamber of Commerce's UK-Malaysia Partnership of the Year award in 2024 under a memorandum of understanding that included moving a clinical research management team to Malaysia and starting a first-in-human study, and that Roche chose Sarawak General Hospital as a site for a global first-in-human trial. It lists an office at KL Gateway, Jalan Kerinchi, Kuala Lumpur, and a new office in Penang.\n\nOf the trials in OnCo's records, 170 list a site in Malaysia (ClinicalTrials.gov participation data, counted on 17 November 2026); AstraZeneca and Merck Sharp & Dohme lead the most. The coordinates are a Kuala Lumpur centroid.",
    programs: ["Feasibility and site selection for sponsored trials", "Study coordinator services", "First-in-human trial support"],
    institutions: ["ministry-of-health-malaysia", "npra-malaysia", "institut-kanser-negara", "ummc-kuala-lumpur"],
    trials: ["nct07050043", "flaura", "keynote-966"],
    links: [
      { label: "Clinical Research Malaysia", url: CRM },
      { label: "ClinicalTrials.gov: cancer studies with sites in Malaysia", url: "https://clinicaltrials.gov/search?country=Malaysia&cond=Cancer" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-kimman-action-catastrophic-expenditure-southeast-asia-bmc-med-2015", name: "Catastrophic health expenditure and 12-month mortality associated with cancer in Southeast Asia: results from a longitudinal study in eight countries",
    aka: ["ACTION study"], journal: "BMC Medicine", year: 2015, doi: "10.1186/s12916-015-0433-1", pmid: "26282128", authors: "Kimman M, Jan S, Yip CH, et al.", paperType: "observational", participants: 9513,
    tldr: "The ACTION study followed 9,513 adults with newly diagnosed cancer in eight Southeast Asian countries for a year: across all eight, 29% had died and 48% faced costs above 30% of household income, so only 23% were alive without financial catastrophe. Malaysia's cancer plan cites it.",
    summary: "The ASEAN Costs in Oncology (ACTION) study, started in 2012, prospectively recruited 9,513 consecutive adults with a first diagnosis of cancer in the Association of Southeast Asian Nations region. Twelve months after diagnosis it recorded deaths and household financial catastrophe, defined as out-of-pocket medical costs above 30% of annual household income, and modelled their predictors.\n\nMalaysia's National Strategic Plan for Cancer Control Programme 2021-2025 cites this study for its statement that about 45% of Malaysian cancer survivors spend over a third of household income on cancer care in the first year after diagnosis; that country figure is the plan's, and is not in the paper's abstract.",
    findings: [
      "A year after diagnosis 29% had died, 48% had faced financial catastrophe and 23% were alive with no financial catastrophe.",
      "Participants in the lowest income group had higher odds of financial catastrophe (odds ratio 5.86, 95% CI 4.76 to 7.23) and of death (5.52, 4.34 to 7.02) than those with high income.",
      "People without insurance were more likely to face financial catastrophe (1.27, 1.05 to 1.52) and to die (1.51, 1.21 to 1.88).",
    ],
    whatItMeans: "Cost and survival are linked in the region: a later stage at diagnosis and a lower income each raised the chance of both outcomes, which is the case Malaysia's cancer plan makes for financial protection and earlier diagnosis.",
    caveats: ["The pooled results cover eight countries; the abstract gives no Malaysia-only figure."],
    institutions: ["ministry-of-health-malaysia", "protecthealth-malaysia"],
    links: [doi("10.1186/s12916-015-0433-1", "BMC Medicine 2015"), pubmed("26282128")] }),

  p({ id: "paper-mohd-sani-npra-approval-times-opera-tirs-2025", name: "Assessing the Malaysian Regulatory Process for Medicinal Product Approval: An OpERA Methodology and Standardized Reporting Approach",
    journal: "Therapeutic Innovation & Regulatory Science", year: 2025, doi: "10.1007/s43441-025-00846-3", pmid: "40711492", authors: "Mohd Sani N, Kasbon SH, Yap KY, et al.", paperType: "observational", participants: 24,
    tldr: "NPRA's own measurement, with the Centre for Innovation in Regulatory Science, of how long Malaysia took to approve new medicines: the median fell from 515 calendar days for those approved in 2017 to 399 for those approved in 2019.",
    summary: "NPRA has worked with the Centre for Innovation in Regulatory Science since 2018 to analyse approval of new active substances and biosimilars. NPRA representatives completed the Optimizing Efficiencies in Regulatory Agencies (OpERA) country report on the review process and registration pathways, and supplied milestone data on 24 new active substances approved in 2019, compared with the 2017 baseline.",
    findings: [
      "Median total approval time for new active substances fell from 515 calendar days in 2017 to 399 in 2019, counting agency and applicant time together.",
      "The median time between receipt of the dossier and the start of scientific assessment also fell.",
      "Most indicators of good review practice were in place, including guidelines, standard operating procedures and review templates.",
    ],
    whatItMeans: "With the 2017 baseline study, this is the only measured approval time for Malaysia that OnCo found, and it covers all new medicines, not cancer medicines alone; it predates the 2024 revision of the reliance pathway.",
    caveats: ["Data supplied by the agency itself, analysed with the Centre for Innovation in Regulatory Science.", "Covers 24 products approved in 2019; not specific to cancer."],
    institutions: ["npra-malaysia"],
    links: [doi("10.1007/s43441-025-00846-3", "Ther Innov Regul Sci 2025"), pubmed("40711492")] }),

  p({ id: "paper-sani-npra-new-active-substances-2017-opera-tirs-2020", name: "An Evaluation of Malaysian Regulatory Process for New Active Substances Approved in 2017 Using the OpERA Methodology",
    journal: "Therapeutic Innovation & Regulatory Science", year: 2020, doi: "10.1007/s43441-020-00140-4", pmid: "32865804", authors: "Sani NM, McAuslane N, Kasbon SH, et al.", paperType: "observational", participants: 26,
    tldr: "The baseline study of Malaysia's approval times: 25 new active substances and one biosimilar approved in 2017 took a median of 515 days; within the assessment itself, NPRA took a median of 166 days and applicants 131 to answer questions.",
    summary: "Using the OpERA tool, the authors collected milestone data for the 25 new active substances and 1 biosimilar approved by NPRA in 2017 to see where time was spent and to set a baseline for improvement.",
    findings: [
      "Median approval time 515 days, agency and applicant time together.",
      "Median time from dossier receipt to the start of scientific assessment 135 days, with wide variation in queuing.",
      "Median assessment time 279 days: NPRA a median of 166 days and applicants 131 days to respond to questions; up to 6 review cycles, with 65% of applications needing 4 to 5.",
      "NPRA proposed starting scientific assessment within 100 days of file acceptance, a maximum of 5 review cycles and a 6-month limit on applicant responses.",
    ],
    whatItMeans: "It explains why the 245-working-day target and the measured time differ: much of the elapsed time was queuing before review and rounds of questions to the applicant.",
    caveats: ["One year of approvals, 26 products; not specific to cancer."],
    institutions: ["npra-malaysia"],
    links: [doi("10.1007/s43441-020-00140-4", "Ther Innov Regul Sci 2020"), pubmed("32865804")] }),
];

/** Records behind /countries/my/ (wave 4). */
export const recordsMY: EntityInput[] = [...institutions, ...papers];
