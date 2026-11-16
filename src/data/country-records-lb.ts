import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Lebanon: the public bodies and papers behind /countries/lb/ (wave 10) that the corpus did not hold. Each was written
 * from its own primary source, read raw on 11 November 2026: the Ministry of Public Health's National Cancer Registry
 * page and its 2005 to 2024 tables (HTML), its Health System Assessment and Reform Priorities (PDF text, October 2026),
 * its news pages on the 2026 breast and prostate screening campaigns, the childhood cancer initiative and the medicines
 * reforms (Arabic text, translated by OnCo), its list of medicines in the Catastrophic Disease Management Program (the
 * spreadsheet itself), the National Social Security Fund's home page, and the Children's Cancer Center of Lebanon's own
 * pages. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the social security fund, the children's centre, AUBMC and the papers;
 * the registry, the fund and the children's centre link the Ministry back. AUBMC already exists (centres-wave3.ts) and is
 * reused. Coordinates are approximate Beirut district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MOPH = "https://www.moph.gov.lb";
const NCR = "https://www.moph.gov.lb/en/Pages/8/19526/national-cancer-registry";
const NCR_2024 = "https://www.moph.gov.lb/userfiles/files/Esu_data/Esu_ncr/BA2024.HTM";
const HSA_2026 = "https://www.moph.gov.lb/userfiles/files/About%20MOPH/StrategicPlans/National-Health-Strategy%E2%80%93Vision2030/Reforms%20Health%20system%20final_%2027-10-2026.pdf";
const BREAST_2026 = "https://www.moph.gov.lb/en/Pages/0/87269/nassereddine-launches-national-breast-cancer-awareness-and-early-detection-campaign";
const PROSTATE_2026 = "https://www.moph.gov.lb/en/Pages/0/87718/nassereddine-announces-the-launch-of-the-national-campaign-for-prostate-cancer-screening";
const CDMP_LIST = "https://www.moph.gov.lb/en/Pages/4/77215/list-of-medications-provided-by-moph-in-the-catastrophic-disease-management-program";
const CCCL_MOU = "https://www.moph.gov.lb/en/Pages/0/87050/moph-and-the-children-s-cancer-center-launche-the-national-initiative-to-raise-awareness-about-child";
const NSSF = "https://www.cnss.gov.lb/";
const CCCL = "https://www.cccl.org.lb/";
const CCCL_ABOUT = "https://www.cccl.org.lb/about-us";
const CCCL_HISTORY = "https://www.cccl.org.lb/history";
const CCCL_FAQ = "https://www.cccl.org.lb/faq";

const institutions: InstitutionInput[] = [
  i({ id: "lebanon-ministry-of-public-health", name: "Ministry of Public Health, Lebanon", aka: ["MoPH Lebanon", "MOPH Lebanon", "Lebanese Ministry of Public Health"],
    city: "Beirut", country: "LB", lat: 33.88, lng: 35.5, institutionType: "government", website: MOPH,
    tldr: "Lebanon's health ministry. It regulates medicines, runs the national cancer registry, pays for hospital care and selected high-cost medicines for uninsured Lebanese, and in 2026 made mammography free all year in government hospitals.",
    summary: "The Ministry of Public Health combines stewardship and regulation of the health sector with paying for and providing care for uninsured Lebanese: its October 2026 Health System Assessment describes it as insurer of last resort for eligible uninsured Lebanese, financing medicines, hospitalisation and, most recently, primary care. Medicines are registered by its Technical Committee for drug registration, which under Decree No. 571 treats the US FDA, the EMA and authorities aligned with WHO recommendations as reference authorities. Law No. 253/2022 created a Lebanese Drug Agency as an independent regulator; in November 2026 the Minister said the agency's appointments would be made soon with the Civil Service Council. The coordinates on this record are an approximate Beirut point.\n\nIts Catastrophic Disease Management Program supplies selected high-cost medicines under strict eligibility; in 2024 cancer patients were its largest group of beneficiaries, 5,865 people, and the list of the program's medicines the Ministry posted in October 2024 has 105 entries under antineoplastic drugs, among them pembrolizumab, nivolumab, palbociclib and trastuzumab. The Assessment records that the crisis widened the program to patients from nearly every insurance scheme, which it says puts its sustainability in question.\n\nThe Ministry runs the National Cancer Registry, whose tables for 2005 to 2024 are on its website. Its National Cancer Program, formalised at cabinet level, oversees the National Cancer Plan 2023 to 2028. In October 2026 it made digital mammography free all year for Lebanese women over 40 in every government hospital, and in November 2026 it launched a prostate screening campaign paying for a PSA test, and an MRI if needed, for men aged 50 to 70.",
    programs: ["National Cancer Registry", "National Cancer Program and National Cancer Plan 2023 to 2028", "Catastrophic Disease Management Program (high-cost medicines)", "National breast cancer awareness and early detection programme", "National prostate cancer screening campaign (2026)", "MediTrack medicine track and trace", "Technical Committee for drug registration"],
    institutions: ["lebanon-national-cancer-registry", "nssf-lebanon", "childrens-cancer-center-lebanon", "aubmc-basile-cancer-institute", "who", "iarc"],
    people: ["arafat-tfayli"],
    cancers: ["breast-cancer", "prostate", "childhood-cancers"], related: ["global-oncology-access"],
    keyPapers: ["paper-mina-lebanon-drug-registration-collapse-plosone-2025", "paper-el-assaad-ici-subsidy-sclc-lebanon-jcogo-2026", "paper-eid-drug-shortage-lebanon-wjco-2024", "paper-raad-bladder-cost-lebanon-ijeh-2023", "paper-seoud-cervical-screening-pilot-lebanon-ijgo-2023"],
    links: [
      { label: "MoPH: Health System Assessment and Reform Priorities (October 2026, PDF)", url: HSA_2026 },
      { label: "MoPH: National Cancer Registry", url: NCR },
      { label: "MoPH: list of medications in the Catastrophic Disease Management Program", url: CDMP_LIST },
      { label: "MoPH: national breast cancer awareness and early detection campaign (8 October 2026, Arabic)", url: BREAST_2026 },
      { label: "MoPH: national prostate cancer screening campaign (7 November 2026, Arabic)", url: PROSTATE_2026 },
    ] }),

  i({ id: "lebanon-national-cancer-registry", name: "National Cancer Registry, Lebanon", aka: ["Lebanese National Cancer Registry", "NCR Lebanon"],
    city: "Beirut", country: "LB", lat: 33.885, lng: 35.495, institutionType: "government", website: NCR,
    tldr: "Lebanon's national cancer registry, part of the Ministry of Public Health's epidemiological surveillance programme. It recorded 17,483 new cancers in 2024 and publishes its tables for 2005 to 2024 online.",
    summary: "The National Cancer Registry sits in the Ministry of Public Health's epidemiological surveillance programme. Its page describes two channels: physicians report cases from their clinics or through the Ministry's Drug Dispensing Center, where cancer medicines are given to eligible patients, and registry staff collect cases actively from histopathology and haematology laboratories to validate and complete them. Cancers are coded with ICD-O-3, and only malignant tumours confirmed by histopathology or haematology count. The coordinates are an approximate Beirut point.\n\nIts published tables count 17,483 new cancers in 2024 (8,159 in men, 9,297 in women), 16,226 without non-melanoma skin cancer; breast cancer (3,855), lung (1,595), prostate (1,494), colon (1,251) and bladder (1,242) were the commonest. The tables for 2016 to 2022 carry a date of 2 October 2025 and those for 2023 and 2024 dates in January 2026; a 2026 paper notes that site-specific data for 2016 to 2024 were released only retrospectively in late 2025. IARC uses the registry as a national source for its GLOBOCAN estimates for Lebanon.",
    programs: ["National cancer registration (tables 2005 to 2024)", "NCR reports 2003 to 2004 and 2005 to 2007"],
    institutions: ["lebanon-ministry-of-public-health", "iarc"], cancers: ["breast-cancer", "lung-cancer", "prostate", "colorectal", "urothelial"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-samaha-jabbour-radiotherapy-crisis-lebanon-frontonc-2026"],
    links: [
      { label: "MoPH: National Cancer Registry (method and tables)", url: NCR },
      { label: "MoPH: National Cancer Registry, 2024 counts by site, both sexes", url: NCR_2024 },
    ] }),

  i({ id: "nssf-lebanon", name: "National Social Security Fund, Lebanon (NSSF)", aka: ["NSSF", "CNSS Lebanon", "Caisse Nationale de Sécurité Sociale"],
    city: "Beirut", country: "LB", lat: 33.88, lng: 35.51, institutionType: "government", website: NSSF,
    tldr: "Lebanon's social insurance fund for private-sector employees. Its home page counts 1,273,097 people covered for health; the Ministry of Public Health reports its share of health financing fell from 48% in 2019 to 17% in 2023.",
    summary: "The National Social Security Fund insures employees and their families. Its head office is on Baghdad Street, Beirut; the coordinates are an approximate district point. Its home page, read in November 2026, counts 409,078 employees, 19,655 voluntary members and 1,273,097 health beneficiaries, and links lists of covered medicines, one dated 4 September 2026 marked at an 80% rate and lists revised to new tariffs in April 2025 marked at 95% coverage, and a lump-sum surgery tariff with the fund paying 90% and the insured 10% (7 August 2025).\n\nThe Ministry of Public Health's Health System Assessment of October 2026 records that the fund's contribution to health financing fell from 48% in 2019 to 17% in 2023, and that average drug reimbursement per beneficiary fell from 350 US dollars a year in 2013 to 2018 to 86 dollars in 2019 to 2023 and 1 dollar in 2023; the Assessment says the fall may reflect interrupted processing of claims, reimbursement of only the cheapest generics, hospitals' reluctance to admit the fund's patients, and patients unable to pay the difference between its rates and providers' charges. In the national STEPS survey of 2023 to 2024, only 37% of adults reported having health insurance, the fund being the commonest scheme among them.",
    programs: ["Sickness and maternity insurance for employees", "Reimbursement of listed medicines"],
    institutions: ["lebanon-ministry-of-public-health"],
    links: [
      { label: "NSSF: home page (Arabic)", url: NSSF },
      { label: "MoPH: Health System Assessment and Reform Priorities, section 5.3 (October 2026, PDF)", url: HSA_2026 },
    ] }),

  i({ id: "childrens-cancer-center-lebanon", name: "Children's Cancer Center of Lebanon (CCCL)", aka: ["CCCL", "Children's Cancer Center of Lebanon"],
    city: "Beirut", country: "LB", lat: 33.897, lng: 35.482, institutionType: "cancer-center", website: CCCL,
    tldr: "A charity founded in 2002 through an agreement with St. Jude Children's Research Hospital and the American University of Beirut Medical Center. It treats children with cancer free of charge and says it supports almost 60% of children with cancer in Lebanon.",
    summary: "The Children's Cancer Center of Lebanon was inaugurated in 2002 as a foundation established under Notice No. 138AD, as a result of an agreement with St. Jude Children's Research Hospital and the American University of Beirut Medical Center, where it is registered as based; it says it now works in partnership with hospitals and medical centres across the country. Its own pages say it treats children and adolescents up to 18 at no cost, including non-Lebanese children from the region and refugees, and that it supports almost 60% of children with cancer in Lebanon. Its headquarters are in Hamra, Beirut; the coordinates are approximate.\n\nIn September 2026 it signed a memorandum of understanding with the Ministry of Public Health and launched a national initiative to raise awareness of the signs of childhood cancer. The Ministry's Director General said the Ministry continues to supply its approved cancer medicines for children and gives the centre financial support under annual contribution agreements.",
    programs: ["Free treatment for children with cancer", "National childhood cancer awareness initiative (2026, with the Ministry of Public Health)"],
    institutions: ["aubmc-basile-cancer-institute", "st-jude", "lebanon-ministry-of-public-health"], cancers: ["childhood-cancers"],
    links: [
      { label: "CCCL: home page", url: CCCL },
      { label: "CCCL: who we are", url: CCCL_ABOUT },
      { label: "CCCL: history (partner hospitals across the country)", url: CCCL_HISTORY },
      { label: "CCCL: frequently asked questions (registration No. 138 AD, address at AUBMC)", url: CCCL_FAQ },
      { label: "MoPH: the Ministry and the Children's Cancer Center launch a national childhood cancer awareness initiative (22 September 2026, Arabic)", url: CCCL_MOU },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-mina-lebanon-drug-registration-collapse-plosone-2025", name: "How the registration of new medicines in Lebanon stopped after the 2019 crisis",
    journal: "PLOS ONE", year: 2025, doi: "10.1371/journal.pone.0330585", pmid: "41452850", authors: "Mina W, Nahas H, Lteif MR, et al.", paperType: "methods",
    tldr: "Before Lebanon's crisis, 43.6% of new FDA-approved medicines were registered in Lebanon; for those approved from 2020 to 2024 the figure was 0%, which interviewees linked to an informal policy to hold back costly new medicines.",
    summary: "Published as \"Extent and causes of the collapse in the registration of innovative medications in Lebanon: A mixed-methods analysis\". The authors compared innovative medicines approved by the FDA or the EMA from 2014 to 2024 with their registration in Lebanon, before (2014 to 2019) and after (2020 to 2024) the crisis, and interviewed policymakers, industry leaders and healthcare providers about why registration slowed.",
    findings: [
      "The share of FDA-approved innovative medicines registered in Lebanon fell from 43.6% to 0%, and of EMA-approved ones from 59.4% to 0%.",
      "Before the crisis average registration time was under two years; after it, delays are estimated to exceed four years.",
      "Interviewees described delayed registration as a way to contain costs and reimbursement pressure on the Ministry of Public Health, with the cost of pushing patients to parallel imports.",
    ],
    whatItMeans: "A new cancer medicine approved abroad since 2020 is unlikely to be registered in Lebanon, so patients and doctors depend on older medicines, generics, biosimilars or imports outside the registered market.",
    caveats: ["Counts registration only, not whether medicines reached patients by other routes.", "The interview findings describe stakeholders' views of an informal policy, not a written one."],
    institutions: ["lebanon-ministry-of-public-health"], related: ["global-oncology-access"],
    links: [doi("10.1371/journal.pone.0330585", "PLOS ONE 2025"), pubmed("41452850")] }),

  p({ id: "paper-el-assaad-ici-subsidy-sclc-lebanon-jcogo-2026", name: "Immunotherapy access for small cell lung cancer in Lebanon after subsidies were withdrawn",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-25-00564", pmid: "41604600", authors: "El Assaad N, Slim M, Yeretzian J, et al.", paperType: "real-world", participants: 71,
    tldr: "After Lebanon withdrew public subsidies for immunotherapy drugs in October 2022, three quarters of patients with extensive small cell lung cancer at one Beirut hospital did not receive the recommended treatment, and access depended on how they paid.",
    summary: "Published as \"Cancer Care in Crisis: How Subsidy Cuts Affected Immunotherapy Access for Patients With Small Cell Lung Cancer in Lebanon\". A mixed-methods study at Hôtel-Dieu de France University Hospital, Beirut: an interview with the hospital pharmacy and a retrospective cohort of patients diagnosed with extensive-stage small cell lung cancer from 2019 to 2024.",
    findings: [
      "Of 71 patients, 75% did not receive guideline-concordant optimal treatment.",
      "Access to immune checkpoint inhibitors was associated with method of payment (P = .037) and public insurance coverage (P = .035).",
      "Survival was higher with optimal treatment (P = .021) and among patients treated before the subsidy withdrawal (P = .037).",
    ],
    whatItMeans: "Shows in one hospital how withdrawing public subsidy for immunotherapy in October 2022 turned access into a question of who could pay.",
    caveats: ["One hospital and 71 patients.", "Retrospective; differences in survival may reflect other changes during the crisis."],
    cancers: ["extensive-stage-sclc"],
    links: [doi("10.1200/go-25-00564", "JCO Glob Oncol 2026"), pubmed("41604600")] }),

  p({ id: "paper-hodroj-nsclc-immunotherapy-shortage-lebanon-jcogo-2026", name: "Reduced immunotherapy doses during Lebanon's drug shortage and outcomes in stage IV lung cancer",
    journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-26-00203", pmid: "42485593", authors: "Hodroj MH, Numan H, El-Halabi L, et al.", paperType: "real-world", participants: 158,
    tldr: "In a study of stage IV non-small cell lung cancer treated before and during Lebanon's immunotherapy shortage, 56% of patients given immunotherapy received reduced doses; progression-free survival did not differ significantly from before the crisis, in a study not designed to prove equivalence.",
    summary: "Published as \"Impact of Lack of Access to Immunotherapy on Survival in Stage IV Non-Small Cell Lung Cancer: A Multicenter Retrospective Study From Lebanon\". The authors, at the Naef K. Basile Cancer Institute of the American University of Beirut Medical Center and other centres, compared patients treated from January 2019 to December 2020 with those treated from October 2021 to December 2022, when the economic collapse caused shortages and interruptions of immunotherapy.",
    findings: [
      "158 eligible patients were included (73 before the crisis, 85 during it).",
      "Among immunotherapy recipients 44.0% received full-dose therapy, 41.4% received 50% to 99% of the standard dose and 14.7% received less than 50%.",
      "Median progression-free survival was 6.33, 12.86 and 10.23 months in those groups; the difference was not statistically significant (P = .132).",
    ],
    whatItMeans: "Records how Lebanese oncologists stretched scarce immunotherapy during the shortage; the authors caution that the study cannot show reduced doses work as well.",
    caveats: ["Retrospective and not powered to establish equivalence.", "Short-term progression-free survival only."],
    institutions: ["aubmc-basile-cancer-institute"], cancers: ["nsclc"],
    links: [doi("10.1200/go-26-00203", "JCO Glob Oncol 2026"), pubmed("42485593")] }),

  p({ id: "paper-samaha-jabbour-radiotherapy-crisis-lebanon-frontonc-2026", name: "Radiotherapy in Lebanon through financial collapse and armed conflict, 2018 to 2025",
    journal: "Frontiers in Oncology", year: 2026, doi: "10.3389/fonc.2026.1836449", pmid: "42638967", authors: "Samaha Jabbour C, Mula-Hussain L, Anacak Y, et al.", paperType: "observational",
    tldr: "At Mount Lebanon Hospital, radiotherapy volumes held up through Lebanon's crises while short-course breast radiotherapy rose from 34% to 73% of treatments between 2023 and 2025; the country's radiotherapy staffing is below European benchmarks.",
    summary: "Published as \"Impact of compounded financial collapse and armed conflict on access to radiation therapy in Lebanon: lessons for building resilient cancer care systems in fragile settings\". A retrospective study of patient volumes and techniques at Mount Lebanon Hospital from 2018 to 2025, with national workforce and equipment data compared with ESTRO-HERO and IAEA benchmarks. The full text describes about 12 radiotherapy centres before the crisis, mostly private and in Beirut and Mount Lebanon, about four linear accelerators per million people, and two centres in South Lebanon and the Bekaa forced to suspend operations in the 2024 conflict.",
    findings: [
      "Patients treated rose from 1,186 (2018) to 1,498 (2022), fell to 1,328 (2023) and rose to 1,399 (2024) and 1,479 (2025), as patients were centralised during the war.",
      "Hypofractionated breast radiotherapy rose from 34.1% (2023) to 73.0% (2025).",
      "Lebanon had 3.9 radiation therapists per linear accelerator against an ESTRO benchmark of 5 to 7, and 0.8 medical physicists against 1.2 to 1.7.",
    ],
    whatItMeans: "Shorter radiotherapy courses meant fewer journeys during the conflict; the authors warn that one centre's stability may hide a contraction of national capacity.",
    caveats: ["One private tertiary centre.", "No waiting times, interruptions or clinical outcomes were available."],
    institutions: ["lebanon-national-cancer-registry"], cancers: ["breast-cancer"], related: ["hypofractionation"],
    links: [doi("10.3389/fonc.2026.1836449", "Front Oncol 2026"), pubmed("42638967")] }),

  p({ id: "paper-eid-drug-shortage-lebanon-wjco-2024", name: "The economic crisis and drug shortages, as reported by cancer patients in Beirut",
    journal: "World Journal of Clinical Oncology", year: 2024, doi: "10.5306/wjco.v15.i5.644", pmid: "38835845", authors: "Eid D, Jabbour J, Moujaes E, et al.", paperType: "observational", participants: 182,
    tldr: "In February 2022, about a third of outpatients receiving cancer treatment at a Beirut hospital had had their treatment interrupted, mainly by drug shortages, and most had paid for medicines themselves despite having insurance.",
    summary: "Published as \"Impact of the economic crisis and drug shortage on Lebanese cancer patients' care\". A questionnaire given in February 2022 to patients in the outpatient oncology department of Hôtel-Dieu de France University Hospital, Beirut.",
    findings: [
      "Among 182 patients, 31.87% experienced treatment interruption, mainly because of acute drug shortages.",
      "Although 87.91% had third-party coverage, 69.60% had to pay for their medications themselves.",
      "One third showed symptoms of anxiety or depression; 89.66% of those who altered their treatment cited financial difficulties.",
    ],
    whatItMeans: "Describes, from patients, what the medicine shortage of 2021 and 2022 meant: interrupted treatment and insurance that no longer paid.",
    caveats: ["One hospital, one month.", "Self-reported."],
    institutions: ["lebanon-ministry-of-public-health"],
    links: [doi("10.5306/wjco.v15.i5.644", "World J Clin Oncol 2024"), pubmed("38835845")] }),

  p({ id: "paper-raad-bladder-cost-lebanon-ijeh-2023", name: "The cost of bladder cancer in Lebanon before and after the economic collapse",
    journal: "International Journal for Equity in Health", year: 2023, doi: "10.1186/s12939-023-01885-8", pmid: "37131206", authors: "Raad E, Helou S, Hage K, et al.", paperType: "methods",
    tldr: "After Lebanon's economic collapse, out-of-pocket payments for bladder cancer care rose by 2,745% and insurers and public payers covered only 17% of the total cost, a modelling study found.",
    summary: "An incidence-based cost-of-illness study of urothelial bladder cancer in Lebanon, using costs from third-party payers and the Ministry of Public Health and modelling clinical management by stage, comparing costs before and after the 2019 collapse from the perspective of payers and households.",
    findings: [
      "Before the collapse the total annual cost was estimated at LBP 19.7 billion (13.1 million US dollars).",
      "After it, the total in Lebanese pounds rose by 768% to LBP 170.7 billion (7.4 million US dollars).",
      "Third-party payments rose by 61% while out-of-pocket payments rose by 2,745%, leaving third parties covering 17% of total costs.",
    ],
    whatItMeans: "Puts a number on how the cost of a common Lebanese cancer moved from insurers to households after 2019.",
    caveats: ["A model built on tariffs and care pathways, not patient-level spending.", "Exchange rates moved fast in the period studied."],
    institutions: ["lebanon-ministry-of-public-health"], cancers: ["urothelial"],
    links: [doi("10.1186/s12939-023-01885-8", "Int J Equity Health 2023"), pubmed("37131206")] }),

  p({ id: "paper-seoud-cervical-screening-pilot-lebanon-ijgo-2023", name: "A pilot of national cervical screening through Lebanon's primary health care centres",
    journal: "International Journal of Gynecology & Obstetrics", year: 2023, doi: "10.1002/ijgo.14489", pmid: "36183305", authors: "Seoud M, Jaafar I, Hamadeh R, et al.", paperType: "observational", participants: 12273,
    tldr: "A pilot offering cervical smear tests through Ministry of Public Health primary care centres screened 12,273 women; 1.7% had an abnormal result, and women who knew little about screening had rarely been tested.",
    summary: "Published as \"Feasibility of implementing cytology-based cervical cancer screening national program in Lebanon: A pilot study\". Sexually active Lebanese women aged 21 and over visiting Ministry primary health care centres were offered a conventional smear read in one central laboratory and answered a questionnaire on knowledge, attitudes and practices.",
    findings: [
      "Of 12,273 eligible women, 1.7% had an abnormal smear, including 11 high-grade lesions and one invasive cancer.",
      "Knowledge and attitudes significantly affected participation; women lacking awareness had rarely had a smear.",
    ],
    whatItMeans: "Shows cervical screening can be delivered through public primary care in Lebanon, where screening has been opportunistic and paid for privately.",
    caveats: ["A pilot, not a national programme.", "Cytology only; no HPV testing."],
    institutions: ["lebanon-ministry-of-public-health"], cancers: ["cervical"],
    links: [doi("10.1002/ijgo.14489", "Int J Gynaecol Obstet 2023"), pubmed("36183305")] }),
];

/** Records behind /countries/lb/ (wave 10). */
export const recordsLB: EntityInput[] = [...institutions, ...papers];
