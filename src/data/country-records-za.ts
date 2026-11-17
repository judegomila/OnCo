import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * South Africa: the institutions and papers behind /countries/za/ (wave 4) that the corpus did not hold. Every figure
 * was read on 4 November 2026 from the raw text of its source: the National Cancer Registry's pathology tables for
 * 2024, its Ekurhuleni and KwaZulu-Natal population-based reports for 2024 and childhood cancer report for 2022 to
 * 2023 (pdftotext), the gazetted cancer registration regulations (R. 380 of 26 April 2011), SAHPRA's reliance
 * guideline SAHPGL-BAU-01 v4 and its 2024/25 Annual Performance Plan, the Council for Medical Schemes' annual report
 * for 2025/26, the National Health Insurance Act 20 of 2023 and the Presidency's statement of 24 February 2026, and
 * the NEMLC's tertiary and quaternary essential medicines recommendations of July 2026. DOIs were resolved through
 * Europe PMC and the abstracts read.
 *
 * Inbound links: the five institutions link to each other through `institutions`, and each paper is named in at least
 * one institution's `keyPapers`, so none depends on the country page for a link. Where a record gives coordinates
 * for a city centroid rather than a street address, its summary says so.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCR_PAGE = "https://www.nicd.ac.za/centres/national-cancer-registry/";
const NCR_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/NCR_Pathology_2024_Report.pdf";
const EPBCR_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/EPBCR_2024_Report.pdf";
const KZN_2024 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/KZNPBCR-Annual-Report-2024.pdf";
const CHILD_2223 = "https://www.nicd.ac.za/wp-content/uploads/2026/04/CHILDHOOD-CANCER-REGISTRY-2022-2023-ANNUAL-REPORT.pdf";
const REG_380 = "https://www.nicd.ac.za/wp-content/uploads/2020/02/Cancer-Registration-Regulation-380-of-National-Health-Act-no-61-of-2003.pdf";
const SAHPRA_RELIANCE = "https://sahpra.org.za/wp-content/uploads/2022/01/SAHPGL-BAU-01_v4-Reliance-Guideline.pdf";
const SAHPRA_APP = "https://pmg.org.za/files/SAHPRA_APP_-_2024-25.pdf";
const CMS_AR = "https://static.pmg.org.za/CMS_2025-26_AR.pdf";
const PMB_GUIDE = "https://www.medicalschemes.com/files/Consumer%20Education%20Material/PMB_ConsumerGuideBookLet.pdf";
const NHI_ACT = "https://www.gov.za/sites/default/files/gcis_document/202405/50664nathealthinsuranceact202023.pdf";
const NHI_PRESIDENCY = "https://presidency.gov.za/node/9772";
const TQ_EML = "https://www.health.gov.za/wp-content/uploads/2026/08/Tertiary-and-Quaternary-EM-Recommendations-July-2026.pdf";
const TRASTUZUMAB_2026 = "https://www.health.gov.za/wp-content/uploads/2026/06/Trastuzumab-Neoadjuvant-Therapy-for-Early-Breast-Cancer-NEMLC-Limited-Review-N-June-2026.pdf";
const CX_POLICY = "https://knowledgehub.health.gov.za/system/files/elibdownloads/2023-04/Cervical%2520Cancer%2520Prevention%2520Policy.pdf";
const BREAST_POLICY = "https://knowledgehub.health.gov.za/system/files/elibdownloads/2023-04/Breast-Cancer-Policy-2017.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "national-cancer-registry-south-africa", name: "National Cancer Registry, South Africa", aka: ["NCR", "South African National Cancer Registry", "NCR South Africa"],
    city: "Johannesburg", country: "ZA", lat: -26.146, lng: 28.116, institutionType: "government", website: NCR_PAGE,
    tldr: "South Africa's national cancer registry, part of the National Health Laboratory Service. Since 1986 it has counted every cancer confirmed by a laboratory, and since 2017 it has also run registries that count every cancer, however diagnosed, in Ekurhuleni and, since 2023, in KwaZulu-Natal.",
    summary: "The National Cancer Registry is a division of the National Health Laboratory Service, run from 1 Modderfontein Road, Sandringham, Johannesburg, and published through the National Institute for Communicable Diseases. Since 1986 it has run pathology-based registration: public and private laboratories send it every cancer diagnosed by histology, cytology or bone marrow, and it publishes counts and rates by sex, age and population group each year. Its tables for cancers diagnosed in 2024, posted in April 2026, count 48,865 cancers in women and 42,770 in men, including basal and squamous cell skin cancers; the rates for all cancers exclude those skin cancers and are 110 per 100,000 for women and 115 for men, age-standardised to the world population.\n\nRegulation R. 380 under the National Health Act, gazetted on 26 April 2011, established the registry in law under the control of the chief executive of the National Health Laboratory Service and made cancer reportable: a health establishment that confirms a diagnosis must submit a notification within three months, and laboratories must report quarterly. The regulation allows population-based registration to be introduced incrementally. The Ekurhuleni Population-Based Cancer Registry began collecting in January 2017 and counted 4,914 new cancers in 2024; the KwaZulu-Natal registry, run with the University of KwaZulu-Natal's Cancer and Infectious Diseases Epidemiology Research Unit since 2023, counted 3,923 in eThekwini. A separate childhood cancer registry counted 3,032 cancers in children and adolescents aged 0 to 19 in 2022 and 2023.\n\nThe registry also runs the South African HIV Cancer Match Study, which links its records to the laboratory service's HIV test results. Its Ekurhuleni report for 2024 records that a cyberattack on the National Health Laboratory Service and a new patient identification system delayed case confirmation, so the 2024 total likely modestly underestimates true incidence, while its discussion adds that part of the 2024 rise reflects back-capture of records missed in 2023 rather than a true increase. The coordinates are approximate for Sandringham, not the street address.",
    programs: ["National pathology-based cancer registry (since 1986)", "Ekurhuleni Population-Based Cancer Registry (since 2017)", "KwaZulu-Natal Population-Based Cancer Registry (since 2023)", "National childhood cancer registry", "South African HIV Cancer Match Study"],
    cancers: ["cervical", "breast-cancer", "prostate", "kaposi-sarcoma", "non-hodgkin-lymphoma", "childhood-cancers"],
    institutions: ["nhls-south-africa", "south-africa-national-department-of-health", "inkosi-albert-luthuli-hospital", "iarc"],
    people: ["mazvita-muchengeti"],
    keyPapers: ["paper-shing-hpv-related-cancers-south-africa-lancet-glob-health-2025", "paper-ruffieux-age-cancer-hiv-south-africa-cid-2023", "paper-metekoua-hiv-status-cancer-registry-south-africa-cancer-med-2026"],
    links: [
      { label: "National Cancer Registry (NICD)", url: NCR_PAGE },
      { label: "National Cancer Registry: summary statistics of cancer diagnosed histologically in 2024 (PDF)", url: NCR_2024 },
      { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report (March 2026, PDF)", url: EPBCR_2024 },
      { label: "KwaZulu-Natal Population-Based Cancer Registry Annual Report 2024 (PDF)", url: KZN_2024 },
      { label: "Childhood Cancer Registry 2022 to 2023 Annual Report (PDF)", url: CHILD_2223 },
      { label: "Regulations relating to cancer registration, R. 380, Government Gazette 34248, 26 April 2011 (PDF)", url: REG_380 },
    ] }),

  i({ id: "nhls-south-africa", name: "National Health Laboratory Service, South Africa", aka: ["NHLS", "National Health Laboratory Service"],
    city: "Johannesburg", country: "ZA", lat: -26.146, lng: 28.116, institutionType: "government", website: "https://www.nhls.ac.za",
    tldr: "The public laboratory service that does the diagnostic tests for South Africa's public hospitals and clinics, about 80 per cent of the population. It runs the National Cancer Registry, and its HIV test records have been linked to cancer records to measure cancer in people living with HIV.",
    summary: "The National Health Laboratory Service was established under the National Health Laboratory Service Act, 2000 (Act No. 37 of 2000). The National Cancer Registry's Ekurhuleni report for 2024 states that the service covers an estimated 80 per cent of South Africa's population through more than 200 laboratories in the nine provinces, with private laboratories such as Ampath, Pathcare and Lancet covering the rest; both send electronic reports of cancer diagnoses to the registry.\n\nRegulation R. 380 of 2011 places the National Cancer Registry under the control of the service's chief executive, who must ensure it meets the norms of the International Agency for Research on Cancer and submit an annual report to the Director-General of Health. Because one laboratory service holds most public HIV tests, the registry and its partners linked those records to cancer diagnoses in the South African HIV Cancer Match Study: 5,222,827 people living with HIV with 29,580 cancers diagnosed in 2004 to 2014. A cyberattack on the service disrupted laboratory data for 2023 and 2024, which the registry says required manual retrospective capture and slowed case confirmation.\n\nThe coordinates are approximate for Sandringham, Johannesburg, where the registry is based, not the service's head office address.",
    programs: ["Public-sector diagnostic pathology", "National Cancer Registry", "Laboratory HIV testing records linked to cancer records"],
    cancers: ["cervical", "kaposi-sarcoma"],
    institutions: ["national-cancer-registry-south-africa", "south-africa-national-department-of-health"],
    keyPapers: ["paper-ruffieux-age-cancer-hiv-south-africa-cid-2023", "paper-metekoua-hiv-status-cancer-registry-south-africa-cancer-med-2026"],
    links: [
      { label: "Regulations relating to cancer registration, R. 380 of 2011 (PDF)", url: REG_380 },
      { label: "Ekurhuleni Population-Based Cancer Registry 2024 Report, methods (PDF)", url: EPBCR_2024 },
      { label: "National Health Laboratory Service", url: "https://www.nhls.ac.za" },
    ] }),

  i({ id: "sahpra", name: "South African Health Products Regulatory Authority (SAHPRA)", aka: ["SAHPRA", "South African Health Products Regulatory Authority"],
    city: "Pretoria", country: "ZA", lat: -25.746, lng: 28.188, institutionType: "government", website: "https://www.sahpra.org.za",
    tldr: "South Africa's medicines regulator, set up in 2018 to replace the Medicines Control Council. It registers new medicines either by its own full review or by relying on the assessments of regulators it recognises, such as those of the United States, the European Union and the United Kingdom.",
    summary: "The South African Health Products Regulatory Authority was established in 2018 as a Schedule 3A public entity and took over from the Medicines Control Council, inheriting a backlog of registration applications; its 2024/25 Annual Performance Plan states that the backlogs have been cleared. A study of approvals in 2020 found that approval timelines in its backlog stream, reviewed through facilitated pathways such as abridged and verification review, were 68 per cent quicker for new chemical entities and generics alike; business-as-usual applications all had a full review.\n\nIts reliance guideline, SAHPGL-BAU-01 version 4 of May 2024, sets out three routes: an abridged review based mainly on full assessment reports from a recognised regulatory authority, a verified review that checks a product against one already approved, and recognition of another authority's decision under a recognition agreement, which the guideline says SAHPRA was still negotiating. To qualify, a medicine must have been approved by one of the authorities SAHPRA recognises: the European Union's centralised and decentralised procedures, Health Canada, the UK's MHRA, Japan's PMDA, Swissmedic, Australia's TGA, the US FDA, or a WHO-listed authority. SAHPRA remains responsible for its decisions.\n\nThe 2024/25 plan sets targets of 80 per cent of new chemical entity applications finalised within 360 working days in 2024/25, 320 in 2025/26 and 300 in 2026/27, and 75 per cent of generic applications within 250 working days. It records that SAHPRA obtained the World Health Organization's maturity level 3 in 2022/23, describing a stable, well-functioning regulatory system for vaccines, aims for level 4, was designated a Regional Centre of Regulatory Excellence for vaccines in August 2023, and has run a priority review policy since 2021/22 for medicines that meet an unmet need or treat life-threatening conditions. The plan also covers authorisation of clinical trials and of Section 21 applications for access to unregistered medicines. OnCo could not open SAHPRA's 2024/25 annual report, so the results against these targets are not given here. The coordinates are a Pretoria centroid, not the street address.",
    programs: ["Medicine registration: full, abridged and verified review", "Priority review policy (since 2021/22)", "Clinical trial authorisation", "Section 21 access to unregistered medicines"],
    institutions: ["south-africa-national-department-of-health", "council-for-medical-schemes"],
    keyPapers: ["paper-keyter-sahpra-reliance-review-frontiers-pharmacol-2021"],
    links: [
      { label: "SAHPRA: Reliance Guideline SAHPGL-BAU-01 v4, May 2024 (PDF)", url: SAHPRA_RELIANCE },
      { label: "SAHPRA: Annual Performance Plan 2024/25 (PDF, via Parliamentary Monitoring Group)", url: SAHPRA_APP },
      { label: "SAHPRA: Annual Report 2024/25 (page; the report file did not open for OnCo)", url: "https://www.sahpra.org.za/document/annual-report-2024-2025/" },
      doi("10.3389/fphar.2021.699063", "Keyter et al., the impact of reliance on SAHPRA's review process (Front Pharmacol 2021)"),
    ] }),

  i({ id: "council-for-medical-schemes", name: "Council for Medical Schemes, South Africa", aka: ["CMS", "Council for Medical Schemes"],
    city: "Centurion", country: "ZA", lat: -25.86, lng: 28.19, institutionType: "government", website: "https://www.medicalschemes.co.za",
    tldr: "The regulator of South Africa's private medical schemes, which covered about 9.17 million people in 2024. It enforces the Prescribed Minimum Benefits, the conditions every scheme must pay for in full, which include the treatment of most cancers that can be treated.",
    summary: "The Council for Medical Schemes regulates medical schemes under the Medical Schemes Act, 1998 (Act No. 131 of 1998), from Eco Glades 2 Office Park, Centurion. Its annual report for 2025/26 records 70 registered schemes (16 open and 54 restricted), 36 administrators and about 9.17 million beneficiaries in 2024, up from about 9.13 million in 2023, against a statutory solvency minimum of 25 per cent that the industry exceeded at 40.87 per cent. Benefits paid rose 8.52 per cent to R259.3 billion in 2024, and out-of-pocket spending by members reached R46.3 billion.\n\nEvery scheme option must cover the Prescribed Minimum Benefits: emergency care, a list of diagnosis and treatment pairs (271 conditions in the 2025/26 report) and 26 chronic conditions. The council's consumer guide says schemes must pay for these in full, without a co-payment or deductible, provided the member uses the scheme's designated provider, formulary and protocols. The list pairs cancers by site with medical and surgical management including chemotherapy and radiotherapy, each qualified as treatable, and adds cervical and breast cancer screening. Spending on these benefits rose 9.09 per cent to R135.66 billion in 2024, 52.31 per cent of all benefits paid; the council is reviewing the package.\n\nThe National Health Insurance Act 20 of 2023 provides that, once national health insurance is fully implemented, schemes may offer only complementary cover for services the fund does not reimburse. The coordinates are a Centurion centroid, not the street address.",
    programs: ["Regulation of medical schemes under the Medical Schemes Act 131 of 1998", "Prescribed Minimum Benefits", "Complaints adjudication", "Review of the Prescribed Minimum Benefits"],
    cancers: ["cervical", "breast-cancer", "prostate"],
    institutions: ["south-africa-national-department-of-health", "sahpra"],
    links: [
      { label: "Council for Medical Schemes: Annual Report 2025/26 (PDF, via Parliamentary Monitoring Group)", url: CMS_AR },
      { label: "Council for Medical Schemes: Prescribed Minimum Benefits and chronic medication, consumer guide (PDF)", url: PMB_GUIDE },
      { label: "National Health Insurance Act 20 of 2023, section 33 (PDF)", url: NHI_ACT },
    ] }),

  i({ id: "south-africa-national-department-of-health", name: "National Department of Health, South Africa", aka: ["NDoH", "Department of Health (South Africa)", "National Essential Medicines List Committee", "NEMLC"],
    city: "Pretoria", country: "ZA", lat: -25.746, lng: 28.188, institutionType: "government", website: "https://www.health.gov.za",
    tldr: "South Africa's national health ministry. Through its National Essential Medicines List Committee it decides which cancer medicines public hospitals should use, it sets the national cervical and breast cancer policies, and it is responsible for the National Health Insurance Act, which has not yet taken effect.",
    summary: "The National Department of Health sets national health policy. Its National Essential Medicines List Committee reviews medicines for the standard treatment guidelines and essential medicines lists. At tertiary and quaternary level, the July 2026 list of reviewed items includes, among cancer medicines, imatinib for chronic myeloid leukaemia and gastrointestinal stromal tumours, dasatinib and nilotinib after imatinib, rituximab for first-line diffuse large B-cell lymphoma, lenalidomide for newly diagnosed myeloma (December 2022), bortezomib on special access for transplant-eligible myeloma, and fulvestrant for hormone receptor-positive advanced breast cancer, approved on 30 July 2026 once a reference price was met. It records as not approved, for example, pemetrexed for lung cancer and mesothelioma, temozolomide for glioblastoma, and rituximab for indolent lymphoma, which it deemed unaffordable at its current price. Trastuzumab for HER2-positive early breast cancer has been on the list since 2017, cut to six months in December 2019, and on 4 June 2026 the committee approved giving it before surgery and for locally advanced disease. New items are to be sourced on a national quotation, where possible, until a national tender is in place. Its 2026 trastuzumab review estimates that about 85 per cent of South Africans rely on the public sector.\n\nThe department's Cervical Cancer Prevention and Control Policy of June 2017 offers three free screening tests at ten-year intervals from age 30 to women without HIV, and screening every three years or annually for women living with HIV; HPV vaccination of girls in school began in 2014. Its Breast Cancer Prevention and Control Policy of 2017 sets clinical breast examination twice a year for women over 40 attending primary care and reserves mammography for symptomatic and high-risk women, stating that screening mammography should not be introduced unless at least 70 per cent of women aged 50 and older could be reliably screened.\n\nThe National Health Insurance Act 20 of 2023, assented to on 15 May 2024, creates a National Health Insurance Fund to purchase care for users. On 24 February 2026 the Presidency said the President had agreed to delay proclaiming any section of the Act until the Constitutional Court rules on challenges to its public participation process, heard in May 2026; the court reserved judgment. The coordinates are a Pretoria centroid, not the street address.",
    programs: ["National Essential Medicines List Committee (standard treatment guidelines and essential medicines lists)", "Cervical Cancer Prevention and Control Policy (2017)", "Breast Cancer Prevention and Control Policy (2017)", "HPV vaccination through the Integrated School Health Programme (since 2014)", "National Health Insurance (Act 20 of 2023, not yet in force)"],
    cancers: ["cervical", "breast-cancer", "cml", "multiple-myeloma"], drugs: ["trastuzumab", "fulvestrant", "lenalidomide", "imatinib"], technologies: ["hpv-vaccine"],
    institutions: ["national-cancer-registry-south-africa", "nhls-south-africa", "sahpra", "council-for-medical-schemes", "wits-charlotte-maxeke", "steve-biko-academic-hospital"],
    keyPapers: ["paper-machalek-hpv-vaccine-impact-south-africa-lancet-glob-health-2026"],
    links: [
      { label: "NEMLC: Tertiary and Quaternary Level Essential Medicines List, reviewed items, July 2026 (PDF)", url: TQ_EML },
      { label: "NEMLC: trastuzumab, neoadjuvant therapy for early breast cancer, limited review, June 2026 (PDF)", url: TRASTUZUMAB_2026 },
      { label: "Cervical Cancer Prevention and Control Policy, June 2017 (PDF)", url: CX_POLICY },
      { label: "Breast Cancer Prevention and Control Policy, 2017 (PDF)", url: BREAST_POLICY },
      { label: "National Health Insurance Act 20 of 2023 (PDF)", url: NHI_ACT },
      { label: "The Presidency: statement on National Health Insurance Act litigation (24 February 2026)", url: NHI_PRESIDENCY },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-machalek-hpv-vaccine-impact-south-africa-lancet-glob-health-2026", name: "Population impact of South Africa's human papillomavirus (HPV) vaccination programme on HPV prevalence in adolescent girls with and without HIV: a repeat cross-sectional study",
    journal: "Lancet Global Health", year: 2026, doi: "10.1016/S2214-109X(25)00525-X", pmid: "41856140", authors: "Machalek DA, Nyemba DC, Travill D, Petoumenos K, Mbulawa ZZA, Naidoo I, Motshwane FMM, Bamford L, Rees H, Kaldor JM, Delany-Moretlwe S, HOPE study group", paperType: "observational", participants: 2357,
    tldr: "Infection with the two virus types that cause most cervical cancer fell by 83 per cent among 17 and 18 year old South African girls after the school vaccination programme, and by a similar proportion among girls living with HIV.",
    summary: "South Africa began vaccinating Grade 4 girls aged 9 and over at school against HPV types 16 and 18 in 2014, reaching 87 per cent of learners with at least one of two doses. The authors invited girls aged 17 to 18 from 15 primary care clinics in Free State, Gauteng, Mpumalanga and North West to give a self-collected vaginal sample: 819 in 2019, before the vaccinated cohorts reached that age, and 1,538 in 2023, from cohorts eligible for the programme.",
    findings: [
      "HPV 16 or 18 prevalence fell from 21.6% (177 of 819) before to 3.2% (49 of 1,538) after, an adjusted prevalence ratio of 0.17 (95% CI 0.12 to 0.24).",
      "Among girls living with HIV it fell from 29.4% (73 of 248) to 4.4% (13 of 295), adjusted prevalence ratio 0.18 (0.10 to 0.32).",
      "Other HPV types did not fall significantly, except types 31 and 45, consistent with cross-protection.",
    ],
    whatItMeans: "A two-dose school programme in a country with high HIV prevalence produced reductions in infection similar to three-dose programmes in high-income countries, including in girls living with HIV, who are at higher risk of cervical cancer.",
    caveats: ["It measures infection, not cancer; the effect on cervical cancer will take years to appear.", "Two cross-sectional surveys in four provinces; vaccination status came from registers and self-report."],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], institutions: ["south-africa-national-department-of-health"],
    links: [doi("10.1016/S2214-109X(25)00525-X", "Lancet Glob Health 2026"), pubmed("41856140")] }),

  p({ id: "paper-shing-hpv-related-cancers-south-africa-lancet-glob-health-2025", name: "Changes in incidence of HPV-related cancers in South Africa (2011-21): a cross-sectional analysis of the South African National Cancer Registry",
    journal: "Lancet Global Health", year: 2025, doi: "10.1016/S2214-109X(25)00065-8", pmid: "40412399", authors: "Shing JZ, Mashele S, Tsegaye AT, Da Costa Dias B, Engels EA, Chikandiwa A, Shiels MS, Mwansa-Kambafwile J, Stephens ES, Metekoua C, Liu D, Carvajal LJ, Kreimer AR, Muchengeti M", paperType: "observational",
    tldr: "From 2011 to 2021, cervical cancer in South Africa's national registry ran at about 30 cases per 100,000 women a year and began to fall from 2016, while cancers of the vulva, vagina, penis and anus caused by the same virus rose.",
    summary: "The authors used National Cancer Registry data and Statistics South Africa population estimates to calculate age-standardised incidence of cervical carcinoma and of vulvar, vaginal, penile, oropharyngeal and anal squamous cell carcinoma in people aged 15 and older, by sex, year, age and population group, with trends estimated by joinpoint regression.",
    findings: [
      "Cervical carcinoma incidence was 30.4 per 100,000 person-years over 2011 to 2021, highest at ages 55 to 64 (58.5), stable to 2016 and then declining (average annual change -2.7%).",
      "Vulvar squamous cell carcinoma rose 8.0% a year, vaginal 3.2%, female anal 8.5%, penile 6.9% and male anal 9.3%; oropharyngeal cancer was stable.",
      "Cervical, vulvar and vaginal cancer incidence was highest among Black women and penile cancer among Black men.",
    ],
    whatItMeans: "Cancers driven by HPV other than cervical cancer are rising quickly in South Africa, most among Black South Africans, which the authors link to high HPV and HIV co-infection; HIV prevention and HPV vaccination are the levers.",
    caveats: ["The registry counts cancers confirmed by a laboratory, so cancers diagnosed only clinically are missed.", "Changes in diagnosis and reporting can affect trends."],
    cancers: ["cervical", "vulvar", "penile", "anal"], institutions: ["national-cancer-registry-south-africa"],
    links: [doi("10.1016/S2214-109X(25)00065-8", "Lancet Glob Health 2025"), pubmed("40412399")] }),

  p({ id: "paper-ruffieux-age-cancer-hiv-south-africa-cid-2023", name: "Age and Cancer Incidence in 5.2 Million People With Human Immunodeficiency Virus (HIV): The South African HIV Cancer Match Study",
    journal: "Clinical Infectious Diseases", year: 2023, doi: "10.1093/cid/ciac925", pmid: "36461916", authors: "Ruffieux Y, Muchengeti M, Olago V, Dhokotera T, Bohlius J, Egger M, Rohner E", paperType: "observational", participants: 5222827,
    tldr: "Linking national laboratory HIV records to the cancer registry for 5.2 million people with HIV showed that cervical cancer and Kaposi sarcoma dominate in younger people, while cancers not caused by infections take over after about age 54.",
    summary: "The South African HIV Cancer Match study links HIV-related laboratory records from the National Health Laboratory Service with cancer diagnoses from the National Cancer Registry for 2004 to 2014. The authors included people with HIV-related tests on separate days and modelled cancer incidence as a function of age with natural splines.",
    findings: [
      "5,222,827 people living with HIV had 29,580 incident cancers, most often cervical cancer (7,418), Kaposi sarcoma (6,380) and breast cancer (2,748).",
      "At age 40 the commonest cancer was cervical cancer in women and Kaposi sarcoma in men; Kaposi sarcoma rates in men peaked at age 34 (101 per 100,000 person-years).",
      "Infection-unrelated cancers overtook infection-related ones after age 54; in older men prostate cancer became the commonest.",
    ],
    whatItMeans: "As people with HIV in South Africa live longer on treatment, screening and early detection for cancers not caused by infection matter more, while cervical cancer control stays essential.",
    caveats: ["Only cancers confirmed by a laboratory are in the registry.", "Data end in 2014."],
    cancers: ["cervical", "kaposi-sarcoma", "breast-cancer", "prostate"], institutions: ["national-cancer-registry-south-africa", "nhls-south-africa"], people: ["mazvita-muchengeti"],
    links: [doi("10.1093/cid/ciac925", "Clin Infect Dis 2023"), pubmed("36461916")] }),

  p({ id: "paper-metekoua-hiv-status-cancer-registry-south-africa-cancer-med-2026", name: "Integration of HIV Status in Cancer Surveillance in South Africa: A Call for Action",
    journal: "Cancer Medicine", year: 2026, doi: "10.1002/cam4.71661", pmid: "41749063", authors: "Metekoua C, Wiggill T, Tombe-Nyahuma T, Ruffieux Y, Mwansa-Kambafwile J, Kwenda S, Dhokotera TG, Bohlius J, Rohner E, Muchengeti M", paperType: "observational", participants: 496517,
    tldr: "Of nearly half a million cancers recorded by South Africa's national registry from 2004 to 2021, only 41 per cent had a documented HIV status; among those that did, three in four people with infection-related cancers were living with HIV.",
    summary: "The authors used natural language processing on free-text pathology reports and probabilistic record linkage to match cancers diagnosed in public laboratories between 2004 and 2021, recorded in the National Cancer Registry, to HIV-related tests in the National Health Laboratory Service's data warehouse, and assigned HIV status from the tests and their timing relative to diagnosis.",
    findings: [
      "Of 496,517 cancers, 203,937 (41%) had a documented HIV status, rising from 29% in 2004 to 2009 to 52% in 2016 to 2021.",
      "Among cancers with a documented status, HIV prevalence was 75% for infection-related and 32% for infection-unrelated cancers.",
      "Documentation was more likely for women and for infection-related cancers, and less likely in population groups other than Black Africans.",
    ],
    whatItMeans: "Many people diagnosed with cancer in South Africa are living with HIV, which affects their treatment, but registry records often do not say so; the authors call on clinicians and pathologists to record HIV status at diagnosis.",
    caveats: ["Public-laboratory cancers only.", "HIV status is inferred from laboratory tests and their timing, not from a clinical record."],
    cancers: ["kaposi-sarcoma", "cervical"], institutions: ["national-cancer-registry-south-africa", "nhls-south-africa"], people: ["mazvita-muchengeti"],
    links: [doi("10.1002/cam4.71661", "Cancer Med 2026"), pubmed("41749063")] }),

  p({ id: "paper-keyter-sahpra-reliance-review-frontiers-pharmacol-2021", name: "South African Regulatory Authority: The Impact of Reliance on the Review Process Leading to Improved Patient Access",
    journal: "Frontiers in Pharmacology", year: 2021, doi: "10.3389/fphar.2021.699063", pmid: "34366850", authors: "Keyter A, Salek S, Danks L, Nkambule P, Semete-Makokotlela B, Walker S", paperType: "observational",
    tldr: "After South Africa's medicines regulator replaced the Medicines Control Council in 2018, approval timelines for its backlog applications, reviewed by relying on other regulators' work, were 68 per cent quicker.",
    summary: "The study compared the approval timelines achieved by the South African Health Products Regulatory Authority in 2020 with those of the former Medicines Control Council, using a questionnaire completed and verified by the regulator and data on new chemical entities and generics registered in 2020 in its business-as-usual and backlog streams.",
    findings: [
      "All business-as-usual applications for new chemical entities and generics received a full, independent scientific review.",
      "Approval timelines for backlog applications, reviewed through facilitated pathways such as abridged and verification review, were 68% quicker for new chemical entities and generics alike.",
    ],
    whatItMeans: "Relying on the assessments of trusted regulators shortened South African approval times, and the authors argue for extending it to routine reviews.",
    caveats: ["One year of data, 2020.", "Co-authors include staff of the regulator."],
    institutions: ["sahpra"],
    links: [doi("10.3389/fphar.2021.699063", "Front Pharmacol 2021"), pubmed("34366850")] }),
];

/** Records behind /countries/za/ (wave 4). */
export const recordsZA: EntityInput[] = [...institutions, ...papers];
