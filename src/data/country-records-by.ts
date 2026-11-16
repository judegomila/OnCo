import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Belarus: the public bodies, centres and papers behind /countries/by/ (wave 7) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026. Belarusian government and hospital sites
 * (minzdrav.gov.by, omr.by, rceth.by) did not answer plain requests from where OnCo fetched, so their pages were read
 * through the Internet Archive's copies: the N.N. Alexandrov National Cancer Centre's history page (capture of
 * 8 September 2025) and its February 2020 notice of the registry's book, and the Center for Examinations and Tests in
 * Health Service's home, activity, parent-body and clinical trial document pages (captures of October 2026). Also read:
 * the WHO and IARC expert mission report on breast and cervical screening in Belarus (IARC Working Group Report 6,
 * 2012, PDF text), the European Observatory's 2013 health system review of Belarus (PDF text) and WHO Europe's
 * February 2018 news item on screening training. DOIs and PubMed ids were resolved through Europe PMC and the figures
 * in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the cancer centre, the registry, the regulator and the paediatric centre; the
 * registry links the papers built on its data through keyPapers. Coordinates are approximate city or district points,
 * not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const IARC_MISSION = "https://www.iarc.who.int/wp-content/uploads/2018/07/Belarus_Report.pdf";
const HIT_2013 = "https://eurohealthobservatory.who.int/publications/i/belarus-health-system-review-2013";
const OMR_HISTORY_WB = "https://web.archive.org/web/20250908231747/https://omr.by/o-nas/istoriya";
const OMR_BOOK_WB = "https://web.archive.org/web/20230322225236/https://omr.by/news/news-main/rak-v-belarusi-tsifry-i-fakty-analiz-dannykh-belorusskogo-kantser-registra-za-2009-2018-gg";
const RCETH_ACTIVITY_WB = "https://web.archive.org/web/2026/http://www.rceth.by/ru/About/Activity";
const RCETH_ORGAN_WB = "https://web.archive.org/web/2026/http://www.rceth.by/ru/About/Organ";
const RCETH_CT_WB = "https://web.archive.org/web/2026/http://www.rceth.by/ru/Departments/Rcpl/Documents/2";
const WHO_2018 = "https://www.who.int/europe/news/item/26-02-2018-capacity-building-for-cancer-screening-in-belarus";

const institutions: InstitutionInput[] = [
  i({ id: "belarus-ministry-of-health", keyPapers: ["paper-znaor-screening-practices-eastern-europe-central-asia-jcpo-2023", "paper-mandrik-breast-screening-preferences-belarus-plos-one-2019"], name: "Ministry of Health of the Republic of Belarus", aka: ["Ministry of Health Belarus", "Minzdrav Belarus", "Министерство здравоохранения Республики Беларусь"],
    city: "Minsk", country: "BY", lat: 53.893, lng: 27.548, institutionType: "government", website: "https://minzdrav.gov.by",
    tldr: "Belarus's health ministry. It runs a tax-funded state health service that is free at the point of use, buys cancer medicines centrally, registers medicines after technical review by its expert centre, and in 2011 asked WHO and IARC to review breast and cervical cancer screening.",
    summary: "The Ministry of Health of the Republic of Belarus, at 39 Myasnikova Street in Minsk, is the parent body of the Center for Examinations and Tests in Health Service, which carries out the technical work before the state registration of medicines. The coordinates on this record are an approximate Minsk city point.\n\nThe European Observatory's 2013 review describes a system funded through general taxation with no compulsory social health insurance, universal entitlement guaranteed by Article 45 of the Constitution, and care free at the point of use in predominantly state-owned facilities. Medicines prescribed to inpatients are free; outpatients generally pay for prescriptions, but certain essential medicines, including some for cancer, are free of charge and are imported and bought centrally through the Ministry. The review gives out-of-pocket payments as 26.7% of total health expenditure, mostly co-payments for outpatient medicines, and notes that innovative cancer treatments unavailable in Belarus could be funded abroad only from limited funds with a long waiting list.\n\nAt the Ministry's request WHO and IARC sent an expert mission to Minsk on 15 to 18 February 2011 to assess breast and cervical cancer prevention and early detection, and recommended moving from annual prophylactic examinations to quality-assured, population-based screening, piloted first. WHO Europe reported in February 2018 that the Ministry had appointed Polyclinic No. 34 in Minsk and the N.N. Alexandrov National Cancer Centre as pilot sites for a government breast screening project, within the EU-funded BELMED project.",
    programs: ["State-funded health care free at the point of use (Constitution, Article 45)", "Central purchase of essential and cancer medicines", "State registration of medicines", "Annual prophylactic examinations", "Breast cancer screening pilot (Minsk)"],
    institutions: ["alexandrov-national-cancer-centre-belarus", "belarusian-cancer-registry", "rceth-belarus", "belarus-paediatric-oncology-centre", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "thyroid"],
    links: [
      { label: "European Observatory: Belarus health system review 2013 (Health Systems in Transition, vol. 15 no. 5)", url: HIT_2013 },
      { label: "IARC Working Group Report 6: breast and cervical cancer prevention and early detection in Belarus, expert mission of February 2011 (PDF)", url: IARC_MISSION },
      { label: "WHO Europe: capacity-building for cancer screening in Belarus (26 February 2018)", url: WHO_2018 },
      { label: "Center for Examinations and Tests in Health Service: parent body (read through the Internet Archive)", url: RCETH_ORGAN_WB },
    ] }),

  i({ id: "alexandrov-national-cancer-centre-belarus", name: "N.N. Alexandrov National Cancer Centre of Belarus", aka: ["Republican Scientific and Practical Centre of Oncology and Medical Radiology named after N.N. Alexandrov", "RSPC OMR", "РНПЦ ОМР им. Н.Н. Александрова", "Alexandrov Research Centre and Clinic for Oncology and Medical Radiology", "Belarusian Research Institute of Oncology and Medical Radiology"],
    city: "Lesnoy, Minsk District", country: "BY", lat: 53.97, lng: 27.67, institutionType: "cancer-center", website: "https://omr.by",
    tldr: "Belarus's national cancer centre, founded in 1960 outside Minsk. It treats patients, trains specialists, houses the national cancer registry and treats lymphoma with an academic, non-commercial CAR T-cell product.",
    summary: "The centre's own history page describes it as the successor of the Belarusian Research Institute of Oncology and Medical Radiology, created by a Council of Ministers resolution of 25 May 1959; its first order was signed on 3 September 1960 by its founder and first director, the surgeon Nikolai Nikolaevich Alexandrov, who led it for 21 years. A clinic of 450 beds opened in 1965 and grew to 900 beds with a new building in 1983. It took its founder's name in 1997 and its present name, Republican Scientific and Practical Centre of Oncology and Medical Radiology, in December 2007; in English it publishes as the N.N. Alexandrov National Cancer Centre of Belarus. It is at Lesnoy in the Minsk District; the coordinates are an approximate point for the settlement. Sergei Polyakov has been director since February 2020.\n\nThe history records that in the 1970s the institute developed an automated system for processing cancer information that the USSR Ministry of Health recommended to all republics in 1976, that in 1986 it took part in the response to the Chernobyl accident, and that in 2011 a separate cancer registry unit was created, together with pilot screening projects for prostate, breast, colorectal and cervical cancer. WHO and IARC experts visited in February 2011, when the Ministry of Health designated it as the national reference and training centre for the planned breast and cervical screening programmes.\n\nIts Cancer Control Organization Department supplies registry data for national studies, and its doctors have published a prospective study of 76 patients with relapsed or refractory B-cell lymphoma treated there from June 2021 to December 2025 with an academic (non-commercial) anti-CD19 CAR T-cell product.",
    programs: ["Belarusian Cancer Registry (separate unit since 2011)", "National reference and training centre for breast and cervical screening", "Academic anti-CD19 CAR T-cell therapy", "Radiotherapy and brachytherapy", "Postgraduate training in oncology"],
    institutions: ["belarusian-cancer-registry", "belarus-ministry-of-health", "belarus-paediatric-oncology-centre", "iarc", "who"],
    cancers: ["breast-cancer", "cervical", "endometrial", "prostate", "colorectal"], technologies: ["car-t"],
    keyPapers: ["paper-konoplya-academic-cd19-car-t-lymphoma-belarus-front-oncol-2026", "paper-matylevich-uterine-corpus-belarus-1993-2022-ijgo-2026"],
    links: [
      { label: "N.N. Alexandrov National Cancer Centre: history (Russian, read through the Internet Archive)", url: OMR_HISTORY_WB },
      { label: "IARC Working Group Report 6: expert mission to Minsk, February 2011, section 4.2.1 (PDF)", url: IARC_MISSION },
      doi("10.3389/fonc.2026.1862517", "Konoplya et al., academic anti-CD19 CAR T-cell therapy for B-cell lymphomas (Front Oncol 2026)"),
    ] }),

  i({ id: "belarusian-cancer-registry", name: "Belarusian Cancer Registry", aka: ["Belarusian national cancer registry", "Белорусский канцер-регистр", "БКР"],
    city: "Lesnoy, Minsk District", country: "BY", lat: 53.97, lng: 27.67, institutionType: "research-institute",
    tldr: "Belarus's national population-based cancer registry, kept at the N.N. Alexandrov National Cancer Centre. It records every cancer diagnosed in the country and is the source of the national cancer figures and of most studies of cancer after Chernobyl.",
    summary: "The Ministry of Health's account to the WHO and IARC mission of 2011 says that cancer registration on paper was introduced in Belarus in 1953, a computerised system was created in 1978, and the current automated information system on oncology was introduced in 1997; diagnoses are coded in ICD-10, and in situ cancers (D00 to D09) have been coded since 2004. The N.N. Alexandrov National Cancer Centre's history says the registry's foundations were laid in 1972 to 1973 and that it became a separate unit of the centre in 2011, describing it as the most complete information resource on all patients with malignant tumours registered in the country, built on the automated system for following up cancer patients. It shares the centre's coordinates, an approximate point.\n\nThe registry publishes a book, Cancer in Belarus: figures and facts. The centre announced on 28 February 2020 the edition analysing 2009 to 2018 (authors Okeanov, Moiseev, Levin, Evmenenko and Ipatiy), covering incidence, mortality, diagnosis, long-term results and the number of patients under follow-up; the notice offered printed copies, and OnCo found no online copy. Studies built on its data include 30-year trends in uterine cancer (928 cases in 1993, 2,539 in 2022), thyroid cancer trends after Chernobyl from 1980 to 2019, second cancers among 30,568 people with papillary thyroid cancer, and blood cancers in the two most contaminated regions from 1978 to 2018, the last two with IARC and other international partners.",
    programs: ["National population-based cancer registration (on paper from 1953, computerised from 1978)", "Annual analysis: Cancer in Belarus, figures and facts", "Data for studies of cancer after the Chernobyl accident"],
    institutions: ["alexandrov-national-cancer-centre-belarus", "belarus-ministry-of-health", "iarc"],
    cancers: ["thyroid", "endometrial", "breast-cancer", "cervical"],
    keyPapers: ["paper-matylevich-uterine-corpus-belarus-1993-2022-ijgo-2026", "paper-fridman-papillary-thyroid-trends-belarus-canep-2025", "paper-taha-second-cancers-after-chernobyl-thyroid-jama-netw-open-2023", "paper-zupunski-haematological-cancers-chernobyl-belarus-ijc-2026", "paper-ryzhov-breast-cervical-stage-former-soviet-lancet-oncol-2021", "paper-zablotska-thyroid-cancer-chornobyl-belarus-bjc-2011", "paper-fridman-post-chernobyl-thyroid-children-belarus-jcem-2014"],
    links: [
      { label: "N.N. Alexandrov National Cancer Centre: Cancer in Belarus, figures and facts, 2009 to 2018 (28 February 2020, Russian, read through the Internet Archive)", url: OMR_BOOK_WB },
      { label: "N.N. Alexandrov National Cancer Centre: history, 2011 (Russian, read through the Internet Archive)", url: OMR_HISTORY_WB },
      { label: "IARC Working Group Report 6, annex A6: national oncology register (PDF)", url: IARC_MISSION },
    ] }),

  i({ id: "rceth-belarus", name: "Center for Examinations and Tests in Health Service (Belarus)", aka: ["Center for Examinations and Tests in Health Service", "UP CEIZ", "УП «Центр экспертиз и испытаний в здравоохранении»", "ЦЭИЗ", "rceth"],
    city: "Minsk", country: "BY", lat: 53.89, lng: 27.6, institutionType: "government", website: "https://www.rceth.by",
    tldr: "The Belarusian Ministry of Health's expert centre for medicines and medical devices. It examines the files behind every medicine registered in Belarus, prepares clinical trial approvals, tests medicine quality and keeps the register of maximum manufacturer prices.",
    summary: "The Center for Examinations and Tests in Health Service is a republican unitary enterprise whose parent body is the Ministry of Health; it is at 2a Tovarishchesky Lane, Minsk, and the coordinates are an approximate Minsk city point. Its activity page lists the technical work that precedes state registration of medicines and medical devices in Belarus, including document review, specialised review of clinical study and bioequivalence reports and testing of quality control methods, and the examination of medicines for registration under the rules of the Eurasian Economic Union. It also prepares the opinion for permission to run clinical trials of medicines, reviews substantial protocol amendments, registers manufacturers' maximum selling prices and keeps the state register of those prices, and tests the quality of medicines on the market.\n\nIts page of clinical trial documents lists the law on the circulation of medicines (No. 161-Z of 20 July 2006), the Ministry's resolution No. 94 of 6 November 2020 on clinical trials of medicines, and decision No. 79 of the Council of the Eurasian Economic Commission of 3 November 2016 approving the Union's good clinical practice rules. The same page lists review of dossiers for state registration, conditional state registration, registration by a simplified procedure and registration within the Eurasian Economic Union.",
    programs: ["Technical review before state registration of medicines", "Review for registration under Eurasian Economic Union rules", "Clinical trial review", "Register of manufacturers' maximum selling prices", "Quality control of medicines on the market", "Pharmacovigilance and GVP inspection"],
    institutions: ["belarus-ministry-of-health"],
    links: [
      { label: "Center for Examinations and Tests in Health Service: activity (Russian, read through the Internet Archive)", url: RCETH_ACTIVITY_WB },
      { label: "Center for Examinations and Tests in Health Service: parent body (Russian, read through the Internet Archive)", url: RCETH_ORGAN_WB },
      { label: "Center for Examinations and Tests in Health Service: clinical trial documents (Russian, read through the Internet Archive)", url: RCETH_CT_WB },
    ] }),

  i({ id: "belarus-paediatric-oncology-centre", name: "Belarusian Research Center for Pediatric Oncology, Hematology and Immunology", aka: ["Republican Scientific Practical Centre for Paediatric Oncology, Haematology and Immunology", "РНПЦ детской онкологии, гематологии и иммунологии"],
    city: "Minsk", country: "BY", lat: 53.95, lng: 27.62, institutionType: "cancer-center",
    tldr: "Belarus's republican centre for children with cancer and blood disorders, in Minsk. It hosts the national resource centre for children's palliative care, and its genetic biotechnology laboratory took part in the trial of a CAR T-cell product made in Belarus.",
    summary: "The European Observatory's 2013 review names the Republican Scientific Practical Centre for Paediatric Oncology, Haematology and Immunology as home to the Republican Resource Centre for the Palliative Care of Children. The phase 1 trial of the CD19 CAR T-cell product BY19, published in 2025, lists the centre's Laboratory of Genetic Biotechnologies, Minsk (postal code 223053), among its authors; the trial was run at two Belarusian centres and treated 23 children and adults with relapsed or refractory B-cell cancers, 17 of them with B-cell acute lymphoblastic leukaemia. The coordinates are an approximate Minsk point, not the building.",
    programs: ["Treatment of childhood cancers and blood disorders", "Republican Resource Centre for the Palliative Care of Children", "Participation in the BY19 CD19 CAR T-cell trial"],
    institutions: ["belarus-ministry-of-health", "alexandrov-national-cancer-centre-belarus"],
    cancers: ["childhood-cancers", "all-leukemia"], technologies: ["car-t"],
    keyPapers: ["paper-katsin-by19-cd19-car-t-belarus-mol-ther-oncol-2025"],
    links: [
      { label: "European Observatory: Belarus health system review 2013, section 5.10 (palliative care)", url: HIT_2013 },
      doi("10.1016/j.omton.2025.201081", "Katsin et al., CD19 CAR T cell therapy BY19 in Belarus: phase 1 trial (Mol Ther Oncol 2025)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-zablotska-thyroid-cancer-chornobyl-belarus-bjc-2011", name: "Thyroid cancer risk in Belarus among people exposed to radioactive iodine as children after Chornobyl",
    journal: "British Journal of Cancer", year: 2011, doi: "10.1038/sj.bjc.6605967", pmid: "21102590", authors: "Zablotska LB, Ron E, Rozhko AV, et al.", paperType: "observational", participants: 11970,
    tldr: "Screening 11,970 people in Belarus who were 18 or younger at the time of the Chornobyl accident, the Belarus-American cohort found that thyroid cancer risk rose with the dose of radioactive iodine to the thyroid; the rise looked steeper in those exposed before age 5, though not significantly.",
    summary: "Published as \"Thyroid cancer risk in Belarus among children and adolescents exposed to radioiodine after the Chornobyl accident\". The authors screened 11,970 people in Belarus aged 18 or younger at the time of the accident whose iodine-131 thyroid doses were estimated from individual thyroid activity measurements and questionnaires, and modelled the excess odds ratio per gray.",
    findings: [
      "For thyroid doses below 5 Gy the dose-response was linear (85 cases; excess odds ratio 2.15 per Gy, 95% CI 0.81 to 5.47); at higher doses the excess risk fell.",
      "The excess risk per gray was higher in men than women and in those exposed before age 5 than at 5 to 18, though these differences were not statistically significant.",
      "Ten to fifteen years after the accident, risk was significantly increased among those exposed as children or adolescents, but appeared lower than in other Chornobyl studies.",
    ],
    whatItMeans: "Confirms, with doses estimated from individual thyroid measurements, that radioactive iodine from Chornobyl raised thyroid cancer risk in Belarusians exposed as children or adolescents.",
    caveats: ["Screening finds small cancers that would otherwise surface later, which affects the dose-response.", "Dose estimates carry uncertainty."],
    cancers: ["thyroid"], institutions: ["belarusian-cancer-registry"],
    links: [doi("10.1038/sj.bjc.6605967", "Br J Cancer 2011"), pubmed("21102590")] }),

  p({ id: "paper-fridman-post-chernobyl-thyroid-children-belarus-jcem-2014", name: "Treatment results for 1,078 Belarusian children and adolescents with thyroid cancer after Chernobyl",
    journal: "Journal of Clinical Endocrinology and Metabolism", year: 2014, doi: "10.1210/jc.2013-3131", pmid: "24823453", authors: "Fridman M, Savva N, Krasko O, et al.", paperType: "observational", participants: 1078,
    tldr: "Of 1,078 Belarusian children and adolescents operated on for papillary thyroid cancer between 1990 and 2005, after the Chernobyl fallout, 96.9% were alive after a median of 16 years, although three quarters had cancer in the lymph nodes at diagnosis.",
    summary: "Published as \"Initial presentation and late results of treatment of post-Chernobyl papillary thyroid carcinoma in children and adolescents of Belarus\". A population-based study of all 1,078 patients under 19 years old with papillary thyroid carcinoma surgically treated in Belarus from 1990 to 2005.",
    findings: [
      "At presentation 73.8% had lymph node involvement and 11.1% distant spread.",
      "Overall survival was 96.9% with a median follow-up of 16.21 years; 20-year event-free survival was 87.8% and relapse-free survival 92.3%.",
      "Total thyroidectomy followed by radioactive iodine gave a significantly lower chance of local and distant relapse.",
    ],
    whatItMeans: "Most children who developed thyroid cancer after Chernobyl survived long term despite advanced disease at diagnosis; the authors recommend total thyroidectomy with radioactive iodine to reduce relapse.",
    caveats: ["Observational; treatment was not randomised.", "Follow-up of a single national cohort."],
    cancers: ["thyroid", "childhood-cancers"], institutions: ["belarusian-cancer-registry"],
    links: [doi("10.1210/jc.2013-3131", "J Clin Endocrinol Metab 2014"), pubmed("24823453")] }),

  p({ id: "paper-fridman-papillary-thyroid-trends-belarus-canep-2025", name: "Papillary thyroid cancer incidence in Belarus after Chernobyl, 1980 to 2019",
    journal: "Cancer Epidemiology", year: 2025, doi: "10.1016/j.canep.2025.102745", pmid: "39799926", authors: "Fridman M, Krasko O, Veyalkin I", paperType: "observational",
    tldr: "Forty years of Belarusian Cancer Registry data show waves of papillary thyroid cancer that move with the age of the children exposed to radioactive iodine in 1986; the rate is now still rising only in people aged 20 to 44.",
    summary: "Published as \"The incidence trends of papillary thyroid carcinoma in Belarus during the post-Chernobyl epoch\". The authors used the Belarusian Cancer Registry to identify papillary thyroid cancers diagnosed in 1980 to 2019 and analysed trends by age, period and birth cohort with joinpoint regression. The abstract notes that the rise in children exposed to iodine-131 was reported only four years after the accident, first in Belarus, where the heaviest fallout happened.",
    findings: [
      "The highest peak of age-specific incidence was in 15 to 19 year olds in 1980 to 2001, linked to short-latency post-Chernobyl cancers.",
      "The same age group rose significantly again in 2006 to 2019, largely through cancers in people not exposed to the fallout.",
      "The effect of exposure is still seen in young adults, and incidence now continues to increase only in patients aged 20 to 44.",
    ],
    whatItMeans: "The thyroid cancer wave in Belarus follows the exposed generation as it ages, while a separate rise in unexposed young people is also under way.",
    caveats: ["Registry trend analysis; it cannot attribute individual cancers to radiation.", "More thyroid imaging over time can raise recorded incidence."],
    cancers: ["thyroid"], institutions: ["belarusian-cancer-registry"],
    links: [doi("10.1016/j.canep.2025.102745", "Cancer Epidemiol 2025"), pubmed("39799926")] }),

  p({ id: "paper-taha-second-cancers-after-chernobyl-thyroid-jama-netw-open-2023", name: "Second cancers among 30,568 Belarusians with papillary thyroid cancer after Chernobyl",
    journal: "JAMA Network Open", year: 2023, doi: "10.1001/jamanetworkopen.2023.29559", pmid: "37589974", authors: "Taha A, Taha-Mehlitz S, Nadyrov EA, et al.", paperType: "observational", participants: 30568,
    tldr: "Among 30,568 people in the Belarusian Cancer Registry with papillary thyroid cancer, followed from 1990 to 2021, 9.2% developed a second cancer, about a quarter more than expected in the general population.",
    summary: "Published as \"Second Primary Cancer Among Patients With Papillary Thyroid Carcinoma Following the Chernobyl Disaster\". A retrospective cohort using personal data from the Belarusian Cancer Registry, following patients with papillary thyroid carcinoma from 1 January 1990 to 31 December 2021 and comparing second primary cancers with the general population using standardised incidence ratios.",
    findings: [
      "2,820 of 30,568 patients (9.2%) developed a second malignant tumour, 2,204 women and 616 men.",
      "The standardised incidence ratio for all cancers was 1.25 (95% CI 1.21 to 1.30), and 1.20 for solid tumours.",
      "Breast cancers (603) were the most common second tumours in women; gastrointestinal and genitourinary cancers in men.",
    ],
    whatItMeans: "People treated for thyroid cancer in Belarus have a raised risk of a second cancer and may benefit from follow-up that looks for it.",
    caveats: ["Closer medical surveillance after a first cancer can increase detection of a second.", "The study cannot separate the effects of radiation, treatment and shared risk factors."],
    cancers: ["thyroid", "breast-cancer"], institutions: ["belarusian-cancer-registry"],
    links: [doi("10.1001/jamanetworkopen.2023.29559", "JAMA Netw Open 2023"), pubmed("37589974")] }),

  p({ id: "paper-zupunski-haematological-cancers-chernobyl-belarus-ijc-2026", name: "Lymphoma, myeloma and leukaemia over 40 years in the Belarusian regions most contaminated by Chernobyl",
    journal: "International Journal of Cancer", year: 2026, doi: "10.1002/ijc.70346", pmid: "41575069", authors: "Zupunski L, Yaumenenka A, Veyalkin I, et al.", paperType: "observational",
    tldr: "In the Gomel and Mogilev regions of Belarus, followed from 1978 to 2018, an IARC-led study found no evidence that the radiation dose to bone marrow from Chernobyl raised the risk of lymphoma, myeloma or leukaemia overall.",
    summary: "Published as \"Lymphoma, multiple myeloma and leukaemia incidence in regions of Belarus most heavily contaminated by the Chernobyl accident\". An ecological study using cases from the Belarusian national cancer registry and population data from the state statistics department, relating incidence to district-average cumulative absorbed red bone marrow dose among people born before the accident.",
    findings: [
      "The study included 7,328 lymphomas, 9,476 leukaemias and 2,003 multiple myelomas over 90.8 million person-years.",
      "Mean cumulative red bone marrow dose by the end of 2018 was 14.2 mGy (median 6.4).",
      "There was no evidence of increased risk of Hodgkin or non-Hodgkin lymphoma, myeloma or total leukaemia with dose; there was a suggestion of raised myeloid leukaemia risk after excluding the cities of Gomel and Mogilev.",
    ],
    whatItMeans: "Outside the thyroid, the low protracted doses in the most contaminated parts of Belarus have not shown a clear effect on blood cancers in population data.",
    caveats: ["Ecological design with district-average doses, not individual ones.", "The authors call for studies with individually reconstructed doses."],
    cancers: ["all-leukemia", "aml", "hodgkin-lymphoma"], institutions: ["belarusian-cancer-registry", "alexandrov-national-cancer-centre-belarus", "iarc"],
    links: [doi("10.1002/ijc.70346", "Int J Cancer 2026"), pubmed("41575069")] }),

  p({ id: "paper-matylevich-uterine-corpus-belarus-1993-2022-ijgo-2026", name: "Uterine cancer in Belarus over 30 years, 1993 to 2022",
    journal: "International Journal of Gynaecology and Obstetrics", year: 2026, doi: "10.1002/ijgo.70743", pmid: "41368983", authors: "Matylevich OP, Shelkovich SY, Balshakova AG, Yaumenenka AA, Pakiz M", paperType: "observational",
    tldr: "Belarusian Cancer Registry data show cancers of the body of the womb rising from 928 a year in 1993 to 2,539 in 2022, with more found early and five-year relative survival in women under 50 reaching 90.8%.",
    summary: "Published as \"Epidemiological trends in uterine corpus malignancies in Belarus: A 30-year analysis (1993-2022)\". Population-based data from the Belarusian Cancer Registry on all cancers of the uterine corpus (ICD-10 C54 to C55), with 97.9% morphological verification, analysed for age-standardised incidence and mortality, five-year relative survival and annual percentage change.",
    findings: [
      "Cases rose 2.7-fold, from 928 in 1993 to 2,539 in 2022, and the age-standardised incidence from 12.2 to 27.1 per 100,000.",
      "In women aged 15 to 49 incidence rose from 5.9 to 13.5 per 100,000, driven by women aged 35 to 49.",
      "Stage I or II at diagnosis rose from 78.5% to 86.2%; five-year relative survival in women aged 15 to 49 rose from 82.5% (1993 to 1997) to 90.8% (2018 to 2022).",
    ],
    whatItMeans: "Womb cancer has become much more common in Belarus, including in younger women, while earlier diagnosis and treatment have improved survival.",
    caveats: ["The authors' attribution to obesity and environmental exposures is a hypothesis, not tested here.", "Registry study; treatment detail is limited."],
    cancers: ["endometrial", "uterine-sarcoma"], institutions: ["belarusian-cancer-registry", "alexandrov-national-cancer-centre-belarus"],
    links: [doi("10.1002/ijgo.70743", "Int J Gynaecol Obstet 2026"), pubmed("41368983")] }),

  p({ id: "paper-ryzhov-breast-cervical-stage-former-soviet-lancet-oncol-2021", name: "Breast and cervical cancer stage at diagnosis in ten former Soviet countries, 2008 to 2017",
    journal: "The Lancet Oncology", year: 2021, doi: "10.1016/s1470-2045(20)30674-4", pmid: "33556324", authors: "Ryzhov A, Corbex M, Piñeros M, et al.", paperType: "observational",
    tldr: "Across ten former Soviet countries, more than three quarters of breast cancers in Belarus in 2013 to 2017 were found at stage I or II, without a mammography screening programme, which the authors call a benchmark for rapid diagnosis.",
    summary: "Published as \"Comparison of breast cancer and cervical cancer stage distributions in ten newly independent states of the former Soviet Union: a population-based study\". Incidence data by TNM stage for 2008 to 2017 were collected from official statistics in Armenia, Azerbaijan, Belarus, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Russia, Ukraine and Uzbekistan, with funding from UICC, WHO Europe and the Ukrainian Ministry of Health.",
    findings: [
      "In 2013 to 2017 more than 50% of breast cancers across the countries, and more than 75% in Belarus, Kazakhstan and Ukraine, were registered at stages I to II.",
      "Late-stage cervical cancer (stages III and IV) was common, above 50% in Moldova and Armenia, and stage-specific cervical cancer rates generally increased.",
      "The authors call for a shift from opportunistic screening to organised, quality-assured HPV vaccination and screening.",
    ],
    whatItMeans: "Belarus finds most breast cancers early through rapid diagnosis rather than mammography screening, while cervical cancer control across the region needs organised programmes.",
    caveats: ["Official statistics differ in completeness between countries.", "Stage distribution is not survival."],
    cancers: ["breast-cancer", "cervical"], institutions: ["belarusian-cancer-registry", "iarc", "who"],
    links: [doi("10.1016/s1470-2045(20)30674-4", "Lancet Oncol 2021"), pubmed("33556324")] }),

  p({ id: "paper-znaor-screening-practices-eastern-europe-central-asia-jcpo-2023", name: "Breast and cervical screening practices in nine countries of Eastern Europe and Central Asia",
    journal: "Journal of Cancer Policy", year: 2023, doi: "10.1016/j.jcpo.2023.100436", pmid: "37544479", authors: "Znaor A, Ryzhov A, Losada ML, et al.", paperType: "observational",
    tldr: "A survey of nine countries found routine check-up examinations running beside new screening programmes; in Belarus mammography screening is organised at the national oncology centre and cervical smears are stained by a method other than the Papanicolaou test.",
    summary: "Published as \"Breast and cervical cancer screening practices in nine countries of Eastern Europe and Central Asia: A population-based survey\". A questionnaire on early detection, including the dispensarization system of routine check-ups, was answered by collaborators in Armenia, Belarus, Georgia, Kazakhstan, Kyrgyzstan, Russia (three regions), Tajikistan, Ukraine and Uzbekistan.",
    findings: [
      "Mammography screening, commonly from age 40, was introduced or piloted in eight of nine countries, organised at national oncology or screening centres in Armenia, Belarus and Georgia.",
      "Six countries had dispensarization for cervical cancer, mostly from age 18, with smears stained by Romanowsky-Giemsa alone in Belarus, Tajikistan and Ukraine.",
      "Parallel screening systems and departures from evidence-based practice were widespread.",
    ],
    whatItMeans: "Belarus, like its neighbours, runs old-style check-ups alongside new screening programmes, and the authors recommend replacing opportunistic screening with organised, quality-assured programmes.",
    caveats: ["Survey answers from collaborators, not audited programme data."],
    cancers: ["breast-cancer", "cervical"], institutions: ["belarusian-cancer-registry", "iarc"],
    links: [doi("10.1016/j.jcpo.2023.100436", "J Cancer Policy 2023"), pubmed("37544479")] }),

  p({ id: "paper-mandrik-breast-screening-preferences-belarus-plos-one-2019", name: "What Belarusian women want from breast cancer screening: a discrete choice experiment",
    journal: "PLoS One", year: 2019, doi: "10.1371/journal.pone.0224667", pmid: "31675357", authors: "Mandrik O, Yaumenenka A, Herrero R, Jonker MF", paperType: "observational", participants: 428,
    tldr: "In a survey of 428 Belarusian women designed to support the government's plans for mammography screening, 90% preferred mammography to the existing breast examination by a clinician, falling to 55% if a national programme had limited capacity.",
    summary: "Published as \"Population preferences for breast cancer screening policies: Discrete choice experiment in Belarus\". With the objective of supporting the Belarusian government to implement mammography screening, the authors built a discrete choice experiment from a literature review, 23 key-informant interviews and pilots, and measured stated preferences in a representative sample of 428 women (89% response rate) from all six regions.",
    findings: [
      "Preferences were driven mainly by the perceived reliability of the test and by cost; travel and waiting time mattered to 34% of women.",
      "90% preferred mammography screening to the existing clinical breast examination, falling to 55% if the programme were restricted in capacity.",
      "Women preferred combined mammography and clinical examination to mammography alone.",
    ],
    whatItMeans: "Women in Belarus favour mammography screening; the authors advise telling them that adding a clinical examination to mammography brings no benefit.",
    caveats: ["Stated preferences, not observed attendance.", "The sample was mainly urban (81%)."],
    cancers: ["breast-cancer"], institutions: ["belarusian-cancer-registry"],
    links: [doi("10.1371/journal.pone.0224667", "PLoS One 2019"), pubmed("31675357")] }),

  p({ id: "paper-katsin-by19-cd19-car-t-belarus-mol-ther-oncol-2025", name: "BY19: a CD19 CAR T-cell therapy made in Belarus, phase 1 trial",
    journal: "Molecular Therapy Oncology", year: 2025, doi: "10.1016/j.omton.2025.201081", pmid: "41322200", authors: "Katsin M, Dormeshkin D, Migas A, et al.", paperType: "translational", participants: 23,
    tldr: "In a single-arm early trial at two Belarusian centres, a CD19 CAR T-cell product made in Belarus treated 23 children and adults with relapsed B-cell cancers; 16 of 20 who could be assessed responded.",
    summary: "Published as \"CD19 CAR T cell therapy BY19 for pediatric and adult patients with relapsed or refractory B cell neoplasms in Belarus: Phase 1 trial\". A single-arm, open-label phase 1 trial (NCT05333302) of an in-house manufactured CD19 CAR T-cell product, BY19, after lymphodepletion with fludarabine and cyclophosphamide, with or without decitabine. Authors are from the Vitebsk Regional Clinical Cancer Centre, the Institute of Bioorganic Chemistry of the National Academy of Sciences and the Belarusian Research Center for Pediatric Oncology, Hematology and Immunology.",
    findings: [
      "23 patients were treated: 17 with B-cell acute lymphoblastic leukaemia, 1 with chronic lymphocytic leukaemia and 5 with non-Hodgkin lymphoma.",
      "Overall response was 80% (16 of 20 evaluable) and complete remission at day 28 was 75%; median progression-free survival was 23 months.",
      "Cytokine release syndrome occurred in 67% of infusions (severe in 19%) and neurotoxicity in 44% (severe in 18.5%).",
    ],
    whatItMeans: "Making CAR T cells locally can bring this treatment to patients in middle-income countries where commercial products are out of reach, with safety and efficacy the authors judge comparable to approved products.",
    caveats: ["Phase 1, single arm, small numbers.", "Not compared directly with commercial products."],
    cancers: ["all-leukemia", "cll"], technologies: ["car-t"], institutions: ["belarus-paediatric-oncology-centre"],
    links: [doi("10.1016/j.omton.2025.201081", "Mol Ther Oncol 2025"), pubmed("41322200"), { label: "ClinicalTrials.gov: NCT05333302", url: "https://clinicaltrials.gov/study/NCT05333302" }] }),

  p({ id: "paper-konoplya-academic-cd19-car-t-lymphoma-belarus-front-oncol-2026", name: "Academic CD19 CAR T-cell therapy for relapsed B-cell lymphoma at Belarus's national cancer centre",
    journal: "Frontiers in Oncology", year: 2026, doi: "10.3389/fonc.2026.1862517", pmid: "42539439", authors: "Konoplya NE, Doroshenko TM, Zharkova KY, et al.", paperType: "real-world", participants: 76,
    tldr: "Seventy-six people with relapsed or refractory B-cell lymphoma treated at the N.N. Alexandrov National Cancer Centre with an academic, non-commercial CAR T-cell product had a 57.5% complete response rate, and 67% were alive at four years.",
    summary: "Published as \"Academic anti CD19 CAR-T cell therapy for relapsed/refractory B-cell lymphomas in real-world clinical practice: a prospective cohort study\". From June 2021 to December 2025 the trial (NCT07524816) enrolled 76 patients aged 23 to 68 at the N.N. Alexandrov National Cancer Centre of Belarus, treated with an anti-CD19 CAR T-cell product made with a lentiviral vector. The authors' rationale is that commercial products cost too much for routine use.",
    findings: [
      "Complete response was achieved in 57.5% of patients, and in 83.3% of those with follicular lymphoma.",
      "Four-year event-free survival was 46.2% and four-year overall survival 67%.",
      "Cytokine release syndrome occurred in 43.4% (grade 3 or higher in 2.6%) and neurotoxicity in 26.3% (grade 3 or higher in 5.3%).",
    ],
    whatItMeans: "Belarus offers CAR T-cell therapy through an academic product rather than a commercial one; the authors describe it as the only option where commercial products are not accessible.",
    caveats: ["Single-centre cohort without a comparison group.", "Median follow-up for the whole cohort was 7.85 months."],
    cancers: ["non-hodgkin-lymphoma", "follicular-lymphoma"], technologies: ["car-t"], institutions: ["alexandrov-national-cancer-centre-belarus"],
    links: [doi("10.3389/fonc.2026.1862517", "Front Oncol 2026"), pubmed("42539439"), { label: "ClinicalTrials.gov: NCT07524816", url: "https://clinicaltrials.gov/study/NCT07524816" }] }),
];

/** Records behind /countries/by/ (wave 7). */
export const recordsBY: EntityInput[] = [...institutions, ...papers];
