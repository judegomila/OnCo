import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * The Philippines: the institutions and papers behind /countries/ph/ (wave 4) that the corpus did not hold. Every
 * record was written from the raw text of its source: the two 2019 laws (Republic Acts 11215 and 11223, from the
 * Lawphil copies), PhilHealth's benefits page and circulars 2024-0007, 2025-0014, 2025-0025 and 2025-0027
 * (pdftotext), the Department of Health and Department of Budget and Management Joint Memorandum Circular 2023-0001
 * on the Cancer Assistance Fund (a scanned PDF read by OCR), FDA Circular 2022-004-A (scanned, read by OCR), the
 * Department of Health's 2024 terminal report on population-based cancer registries (published by the Philippine
 * Cancer Society) and the Philippine Statistics Authority's 2023 causes-of-death release (an Internet Archive copy,
 * because psa.gov.ph refused our requests). The Department of Health's own site answered 403 and the Health
 * Technology Assessment Council's did not answer, so neither was read directly. DOIs were resolved through Europe
 * PMC and the abstracts read.
 *
 * Inbound links: the six institutions link to each other through `institutions`, and each paper is named in at least
 * one institution's `keyPapers`, so none depends on the country page for a link.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const RA_11215 = "https://lawphil.net/statutes/repacts/ra2019/ra_11215_2019.html";
const RA_11223 = "https://lawphil.net/statutes/repacts/ra2019/ra_11223_2019.html";
const PH_BENEFITS = "https://www.philhealth.gov.ph/benefits/";
const PC_2024_0007 = "https://www.philhealth.gov.ph/circulars/2024/PC2024-0007.pdf";
const PH_BREAST_NEWS = "https://www.philhealth.gov.ph/news/up/article/2024/news_662705cc8e1ef.php";
const PC_2025_0014 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0014.pdf";
const PC_2025_0025 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0025.pdf";
const PC_2025_0027 = "https://www.philhealth.gov.ph/circulars/2025/PC2025-0027.pdf";
const JMC_CAF = "https://www.dbm.gov.ph/wp-content/uploads/Issuances/2023/Joint-Memorandum-Circular/JOINT-MEMORANDUM-CIRCULAR-NO.-2023-001-DATED-SEPTEMBER-18-2023.pdf";
const FC_2022_004_A = "https://www.fda.gov.ph/wp-content/uploads/2024/02/FDA-Circular-No.2022-004-A.pdf";
const TRADE_GOV = "https://www.trade.gov/market-intelligence/philippines-pharmaceuticals";
const PBCR_2024 = "https://www.philcancer.org.ph/images/pdf/as%20of%20Sept%202025/FINAL%20Expansion%20of%20the%20Population-Based%20Cancer%20Registries%20in%20the%20Philippines%202024%20Terminal%20Report.pdf";
const PCFE_2010 = "https://www.philcancer.org.ph/images/pdf/data/2010-Philippine-Cancer-Facts-Estimates.pdf";
const CIDS_CET = "https://cids.up.edu.ph/wp-content/uploads/2026/05/Estimating-the-Cost-Effectiveness-Threshold-for-the-Philippines_A-Supply-Side-Approach.pdf";
const GMA_PCC = "https://www.gmanetwork.com/news/topstories/metro/899926/philippine-cancer-center-breaks-ground-in-quezon-city/story";

const institutions: InstitutionInput[] = [
  i({ id: "philhealth", name: "Philippine Health Insurance Corporation (PhilHealth)", aka: ["PhilHealth", "PHIC", "National Health Insurance Program"],
    city: "Pasig", country: "PH", lat: 14.576, lng: 121.085, institutionType: "government", website: "https://www.philhealth.gov.ph",
    tldr: "The state health insurer of the Philippines, which every Filipino has been enrolled in automatically since the Universal Health Care Act of 2019. It pays for cancer care through case rates, a set of catastrophic packages for named cancers called the Z Benefits, and since August 2025 a package of outpatient cancer screening tests.",
    summary: "PhilHealth, at Citystate Centre, 709 Shaw Boulevard, Pasig City, runs the National Health Insurance Program. The Universal Health Care Act (Republic Act 11223, approved 20 February 2019) states that every Filipino citizen shall be automatically included in the programme, splits members into direct contributors, who pay premiums, and indirect contributors, whose premiums the national government subsidises, and requires that PhilHealth's benefit packages be based on positive recommendations of health technology assessment. The National Integrated Cancer Control Act (Republic Act 11215) directs it to expand its packages to cover screening, diagnosis, treatment, supportive care, survivorship, rehabilitation and end-of-life care for all types and stages of cancer.\n\nIts Z Benefits pay a fixed package for named cancers at contracted hospitals. PhilHealth's benefits page, read on 4 November 2026, lists standard-risk acute lymphoblastic leukaemia in children aged 1 to under 10 (P500,000), breast cancer stage 0 to IV (P1.4 million), low to intermediate risk prostate cancer (P100,000), cervical cancer (P120,000 or P175,000 depending on the radiotherapy) and colon and rectal cancer (P150,000 to P400,000 by stage). The breast package was raised from P100,000 by PhilHealth Circular 2024-0007, effective 30 March 2024, which allots 1,000,008 pesos of it to trastuzumab in three tranches of six cycles; PhilHealth said no co-payment applies in ward accommodation and 21 health facilities were contracted for the package in April 2024. Radiotherapy is paid at P3,900 a session with cobalt and P5,850 with a linear accelerator.\n\nPhilHealth Circular 2025-0014 added outpatient screening tests from 14 August 2025, requested by the member's registered primary care provider and paid at fixed rates with no co-payment: mammogram P2,610, breast ultrasound P1,350, low-dose chest CT P7,220, alpha-fetoprotein P1,230, liver ultrasound P960 and screening colonoscopy P23,640. Circulars 2025-0025 and 2025-0027 set the eligibility for bowel screening (adults aged 45 to 75, or with risk factors) and lung screening (adults aged 50 to 80 with at least 30 pack-years who smoke or quit within 15 years, or with a family history and a smoking history).\n\nThe coordinates are a Pasig City centroid, not the street address.",
    programs: ["National Health Insurance Program", "Z Benefits for breast, cervical, colorectal and prostate cancer and childhood acute lymphoblastic leukaemia", "Outpatient cancer screening packages (PhilHealth Circular 2025-0014)", "Radiotherapy case rates", "YAKAP primary care"],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate", "all-leukemia", "lung-cancer"], drugs: ["trastuzumab"],
    institutions: ["doh-philippines", "philippine-hta-council", "fda-philippines", "philippine-general-hospital"],
    keyPapers: ["paper-ting-colorectal-z-package-pgh-jgo-2020", "paper-chye-act-now-breast-cea-bmjgh-2025"],
    links: [
      { label: "PhilHealth: benefits, including Z Benefits and radiotherapy case rates", url: PH_BENEFITS },
      { label: "PhilHealth Circular 2024-0007: Z Benefits Package for Breast Cancer (PDF)", url: PC_2024_0007 },
      { label: "PhilHealth: breast cancer benefit now up to P1.4 million, 6 April 2024", url: PH_BREAST_NEWS },
      { label: "PhilHealth Circular 2025-0014: outpatient cancer screening tests (PDF)", url: PC_2025_0014 },
      { label: "PhilHealth Circular 2025-0025: quality standards for colorectal cancer screening (PDF)", url: PC_2025_0025 },
      { label: "PhilHealth Circular 2025-0027: quality standards for lung cancer screening (PDF)", url: PC_2025_0027 },
      { label: "Republic Act 11223, Universal Health Care Act (Lawphil)", url: RA_11223 },
    ] }),

  i({ id: "fda-philippines", name: "Food and Drug Administration, Philippines", aka: ["FDA Philippines", "Philippine FDA"],
    city: "Muntinlupa", country: "PH", lat: 14.418, lng: 121.041, institutionType: "government", website: "https://www.fda.gov.ph",
    tldr: "The medicines regulator of the Philippines, part of the Department of Health. It registers new medicines on a full review or on shorter reliance routes that use an approval by a reference regulator, and the 2019 cancer law requires it to license cancer medicines through a dedicated process taking no more than a year.",
    summary: "The Food and Drug Administration of the Philippines, at Civic Drive, Filinvest Corporate City, Alabang, Muntinlupa, regulates medicines under Republic Act 3720 as amended by the FDA Act of 2009 (Republic Act 9711). Section 23 of the National Integrated Cancer Control Act of 2019 requires it to create a dedicated and streamlined process, not exceeding one year, for licensing innovator and generic cancer medicines, subject to quality checks and minimum standards such as approval and use for cancer treatment in other countries. Its Director General sits on the National Integrated Cancer Control Council.\n\nDepartment of Health Administrative Order 2020-0045 established facilitated registration pathways, implemented for new drugs by FDA Circular 2022-004. FDA Circular 2022-004-A, dated 15 February 2024, extended them to generic drugs: an abridged review is available when a product has been approved by one reference drug regulatory agency, and a verification review when it has been approved by at least two. Reference agencies must operate at World Health Organization maturity level 4, and the amendment added Korea's Ministry of Food and Drug Safety and the Saudi Food and Drug Authority as the fifteenth and sixteenth on the list. Each application needs a sworn assurance that the product is the same in all respects as the one the reference agency approved. The US Commercial Service summarised the target times in April 2023 as no more than 45 working days for an abridged review and 30 for a verification review, counted from proof of payment with a complete dossier; the FDA's own page for Circular 2022-004, read on 17 November 2026, gives the same times.\n\nThe coordinates are approximate for Alabang, not the street address.",
    programs: ["Drug registration", "Abridged review (one reference regulator) and verification review (two)", "Facilitated registration pathways for new and generic drugs (FDA Circulars 2022-004 and 2022-004-A)"],
    institutions: ["doh-philippines", "philippine-hta-council", "philhealth"],
    links: [
      { label: "FDA Circular 2022-004-A, 15 February 2024 (PDF, scanned)", url: FC_2022_004_A },
      { label: "FDA Circular 2022-004: abridged and verification review pathways for new drugs", url: "https://www.fda.gov.ph/fda-circular-no-2022-004-implementing-guidelines-on-the-abridged-and-verification-review-pathways-for-new-drug-registration-applications-in-accordance-with-administrative-order-no-2020-0045/" },
      { label: "US Commercial Service: Philippines pharmaceuticals, 26 April 2023", url: TRADE_GOV },
      { label: "Republic Act 11215, Section 23 (Lawphil)", url: RA_11215 },
      { label: "Food and Drug Administration, Philippines", url: "https://www.fda.gov.ph" },
    ] }),

  i({ id: "doh-philippines", name: "Department of Health, Philippines", aka: ["DOH", "Kagawaran ng Kalusugan", "DOH Philippines"],
    city: "Manila", country: "PH", lat: 14.599, lng: 120.984, institutionType: "government", website: "https://doh.gov.ph",
    tldr: "The health ministry of the Philippines. Under the 2019 cancer law it chairs the national cancer control council, manages a Cancer Assistance Fund that pays for treatment at listed government hospitals, and runs a programme that gives free cancer medicines not yet covered by the national insurer.",
    summary: "The Department of Health carries out the National Integrated Cancer Control Act (Republic Act 11215, approved 14 February 2019). The Secretary of Health chairs the National Integrated Cancer Control Council, which is attached to the department and served by its Disease Prevention and Control Bureau; the council's members include the heads of PhilHealth and the Food and Drug Administration, two oncologists and three representatives of patient organisations. The law also created the Cancer Assistance Fund, managed by the department, made cancer a notifiable disease, required every hospital to keep a cancer registry and to submit its data as a condition of renewing its licence, and placed a Philippine Cancer Center under the department's control.\n\nA Joint Memorandum Circular of the Department of Health and the Department of Budget and Management, signed in September 2023, sets out how the Cancer Assistance Fund is used from fiscal year 2023: it pays for prevention, screening, diagnosis and treatment of eight priority cancer types (breast cancer, childhood cancers, gynaecological cancers, liver, colorectal and other digestive cancers, adult blood cancers, head and neck cancers including thyroid, lung cancer, and prostate, kidney and bladder cancers) at access sites, complementing PhilHealth and the Malasakit programme. Access sites are hospitals meeting the requirements of Administrative Order 2022-0013 on the Cancer and Supportive-Palliative Medicines Access Program, the department's mechanism for giving free medicines not yet covered by PhilHealth. The circular cites a study in which many patients had spent at least P181,000 on cancer care after 12 months.\n\nThe department's Cancer Control Division leads a project with the Philippine Cancer Society and the Rizal Cancer Registry to expand population-based registries, described in its 2024 terminal report. The department's website refused our requests, so its own pages were not read; the coordinates are a Manila centroid, not the address.",
    programs: ["National Integrated Cancer Control Program and Council", "Cancer Assistance Fund", "Cancer and Supportive-Palliative Medicines Access Program", "Population-based cancer registry expansion", "School-based HPV vaccination"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer", "prostate", "hcc"], technologies: ["hpv-vaccine"],
    institutions: ["philhealth", "fda-philippines", "philippine-hta-council", "philippine-cancer-center", "doh-rizal-cancer-registry", "philippine-cancer-society", "philippine-general-hospital"],
    keyPapers: ["paper-eala-oncologist-distribution-philippines-jgo-2022", "paper-myint-cervical-screening-ndhs-philippines-2024"],
    links: [
      { label: "Republic Act 11215, National Integrated Cancer Control Act (Lawphil)", url: RA_11215 },
      { label: "DOH and DBM Joint Memorandum Circular 2023-0001 on the Cancer Assistance Fund (PDF, scanned)", url: JMC_CAF },
      { label: "DOH: The Expansion of Population-Based Cancer Registries in the Philippines, 2024 terminal report (PDF)", url: PBCR_2024 },
      { label: "Department of Health", url: "https://doh.gov.ph" },
    ] }),

  i({ id: "philippine-hta-council", name: "Health Technology Assessment Council, Philippines", aka: ["HTAC", "Philippine HTA Council"],
    city: "Manila", country: "PH", lat: 14.599, lng: 120.984, institutionType: "government",
    tldr: "The expert committee that recommends which medicines, tests and services the Department of Health and PhilHealth should pay for in the Philippines. By law their investments and new benefit packages must rest on its positive recommendation, and no explicit cost-effectiveness threshold has been published.",
    summary: "The Universal Health Care Act (Republic Act 11223, Section 34) created the Health Technology Assessment Council within the Department of Health to recommend what the department and PhilHealth finance, oversee health technology assessment in both, and review their existing benefit packages, and provided for it to become an independent body attached to the Department of Science and Technology within five years of operating. The Act states that investments in any health technology and the development of any benefit package by the department and PhilHealth shall be based on positive recommendations of the assessment, and lists the criteria: magnitude, severity and equity; safety and effectiveness, including that each intervention must have undergone a phase IV trial with a systematic review and meta-analysis available; household financial impact; cost-effectiveness; and affordability and viability. Results are to be made public.\n\nA 2026 University of the Philippines discussion paper, with an author from the Health Technology Assessment Division of the Department of Science and Technology, states that the Philippines has no explicit cost-effectiveness threshold, estimates one at P84,317 to P209,410 per quality-adjusted life year (36 to 89 per cent of 2024 GDP per head), and lists the faecal immunochemical test for colorectal screening in adults aged 45 and over among technologies the council positively recommended.\n\nThe council's own website did not answer from OnCo's network, so its recommendations were not read directly; the coordinates are a Manila centroid.",
    programs: ["Coverage recommendations to the Department of Health and PhilHealth", "Review of existing benefit packages"],
    terms: ["hta"], institutions: ["doh-philippines", "philhealth", "fda-philippines"],
    keyPapers: ["paper-chye-act-now-breast-cea-bmjgh-2025"],
    links: [
      { label: "Republic Act 11223, Section 34 (Lawphil)", url: RA_11223 },
      { label: "Gloria et al., Estimating the cost-effectiveness threshold for the Philippines, UP CIDS 2026 (PDF)", url: CIDS_CET },
    ] }),

  i({ id: "philippine-cancer-center", name: "Philippine Cancer Center", aka: ["PCC"],
    city: "Quezon City", country: "PH", lat: 14.676, lng: 121.044, institutionType: "cancer-center",
    tldr: "A national cancer centre created by the 2019 cancer law, under the Department of Health and headed by an executive director. Ground was broken for a 20-storey building in Quezon City in March 2024.",
    summary: "Section 10 of the National Integrated Cancer Control Act (Republic Act 11215) established a Philippine Cancer Center under the control and supervision of the Department of Health, headed by an executive director, to treat patients with cancer, carry out and fund research, train health workers and support universities and hospitals in their study of rare cancers; it also provides for other comprehensive specialty cancer centres to be designated outside Metro Manila.\n\nGMA News reported that ground was broken for a 20-storey building on 8 March 2024, on a 5,000 square metre lot inside the Blood Bank Complex in Quezon City, with Speaker Martin Romualdez saying each floor would house a sub-specialty centre and that the House of Representatives had allocated funds for equipment including linear accelerators, PET scanners and proton therapy. Whether the building is complete or the centre is treating patients was not confirmed from a source OnCo could read.\n\nThe coordinates are a Quezon City centroid, not the site.",
    programs: ["National cancer centre (Republic Act 11215, Section 10)"],
    institutions: ["doh-philippines", "philippine-general-hospital"],
    links: [
      { label: "Republic Act 11215, Section 10 (Lawphil)", url: RA_11215 },
      { label: "GMA News: Philippine Cancer Center breaks ground in Quezon City, 8 March 2024", url: GMA_PCC },
    ] }),

  i({ id: "doh-rizal-cancer-registry", name: "Department of Health Rizal Cancer Registry", aka: ["DOH-RCR", "Rizal Cancer Registry"],
    city: "Pasig", country: "PH", lat: 14.576, lng: 121.085, institutionType: "research-institute",
    tldr: "One of the two population-based cancer registries that the Department of Health describes as high quality, counting cancers in Rizal province and part of Metro Manila since 1974. Its records are the basis of recent studies of how long Filipino patients wait for treatment.",
    summary: "The Rizal Cancer Registry, based at Rizal Medical Center in Pasig City, was launched in 1974 under the Community Cancer Control Program of Rizal and covers the original province of Rizal, 1,343 square kilometres. A 2025 study using its data describes it as the country's first population-based cancer registry, spanning 26 cities and municipalities in Rizal province and the National Capital Region, about 7 million people or 8.0 per cent of the population by 2012, and collecting data actively since 1980 from 131 hospitals and 26 civil registrars. The Philippine Cancer Society dates its own tumour registry to 1968, which it redirected into a population-based registry in 1984.\n\nThe Department of Health's 2024 terminal report names it and the Philippine Cancer Society's Manila Cancer Registry as the two high-quality population-based registries that collect and share data nationally and internationally, both covering Metro Manila; registries once run in Cebu and Davao were discontinued. During the project the Rizal and Manila registries continued collecting cases diagnosed in 2018 to 2022, the Cebu and Davao registries started collecting for 2023 to 2027, and a method was proposed for linking registry cases to the Philippine Statistics Authority's death records. The registry's authors co-wrote the 2010 Philippine Cancer Facts and Estimates with the Manila registry.\n\nIn studies of its records, 35.1 per cent of 20,654 treated patients diagnosed from 1990 to 2012 waited more than 30 days from diagnosis to first treatment and 20.0 per cent more than 90 days, and among 21,740 patients diagnosed from 2000 to 2017 a wait of more than 90 days was linked to a 9 per cent higher five-year mortality risk. The coordinates are a Pasig City centroid.",
    programs: ["Population-based cancer registration for Rizal province and part of Metro Manila", "Death record linkage with the Philippine Statistics Authority"],
    cancers: ["breast-cancer", "cervical", "lung-cancer", "colorectal"],
    institutions: ["doh-philippines", "philippine-cancer-society"],
    keyPapers: ["paper-cambia-treatment-delay-mortality-rizal-jjco-2025", "paper-cambia-prolonged-treatment-delay-rizal-ccc-2025"],
    links: [
      { label: "DOH: The Expansion of Population-Based Cancer Registries in the Philippines, 2024 terminal report (PDF)", url: PBCR_2024 },
      doi("10.1007/s10552-025-01969-6", "Cambia et al., Burden of prolonged treatment delay (Cancer Causes Control 2025)"),
      { label: "2010 Philippine Cancer Facts and Estimates (PDF)", url: PCFE_2010 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-cambia-treatment-delay-mortality-rizal-jjco-2025", name: "Cancer treatment delay and 5-year mortality among patients diagnosed with common cancers from 2000 to 2017 in the Philippines",
    journal: "Japanese Journal of Clinical Oncology", year: 2025, doi: "10.1093/jjco/hyaf139", pmid: "40928462", authors: "Cambia JM, Orlina ECA, Calvez GAC, Liu JJ", paperType: "observational",
    tldr: "In 21,740 patients from the Department of Health's Rizal Cancer Registry, waiting more than 90 days from diagnosis to treatment was linked to a higher risk of death within five years, most clearly in breast and cervical cancer and in cancer that had not spread.",
    summary: "A retrospective cohort of 21,740 patients diagnosed with common cancers between 2000 and 2017 in the Department of Health Rizal Cancer Registry, followed for deaths to 2022. Treatment delay was grouped as under 30, 30 to 90 or over 90 days, and Poisson regression with robust variance estimated the risk of death from any cause within five years, by cancer type and stage.",
    findings: [
      "After adjustment, a delay of more than 90 days carried a five-year mortality risk ratio of 1.09 (95% CI 1.04 to 1.14) against a delay under 30 days.",
      "The association was significant for breast and cervical cancer but not the other cancer types.",
      "It was significant in cancer that had not spread at diagnosis, not in metastatic cancer.",
    ],
    whatItMeans: "Shortening the time from diagnosis to first treatment matters most for cancers that can still be cured, which is the case the Philippines' 2019 cancer law makes for patient navigation and referral pathways.",
    caveats: ["One registry covering Rizal province and part of Metro Manila, not the whole country.", "All-cause mortality, and only patients who received treatment."],
    cancers: ["breast-cancer", "cervical"], institutions: ["doh-rizal-cancer-registry"],
    links: [doi("10.1093/jjco/hyaf139", "Jpn J Clin Oncol 2025"), pubmed("40928462")] }),

  p({ id: "paper-cambia-prolonged-treatment-delay-rizal-ccc-2025", name: "Burden of prolonged treatment delay among patients with common cancers in the Philippines",
    journal: "Cancer Causes & Control", year: 2025, doi: "10.1007/s10552-025-01969-6", pmid: "39992497", authors: "Cambia JM, Wannasri A, Orlina ECA, Calvez GAC, Grafilo WM, Liu JJ", paperType: "observational",
    tldr: "Among 20,654 treated patients in the Department of Health's Rizal Cancer Registry, about a third waited more than 30 days for their first cancer treatment and one in five more than 90 days, with longer waits for children and young people, men, patients at non-private hospitals and those with more advanced cancer.",
    summary: "A population-based retrospective cohort of 20,654 patients diagnosed from 1990 to 2012 with ten common cancers who received treatment, from the Department of Health Rizal Cancer Registry, which the authors describe as the country's first population-based registry (established 1974, covering about 7 million people by 2012). Poisson regression with robust variance identified predictors of delays beyond 30, 60 and 90 days, overall and by first treatment.",
    findings: [
      "35.1% waited more than 30 days from diagnosis to first treatment, 25.2% more than 60 days and 20.0% more than 90 days.",
      "Delays over 90 days were more likely for patients aged 0 to 19, men, those treated at non-private hospitals, those diagnosed in the 1990s, more advanced stage and non-surgical first treatment.",
    ],
    whatItMeans: "It names the groups a national navigation programme would reach first if the aim is to shorten waits for treatment.",
    caveats: ["Data end in 2012, the latest year available in the registry for analysis.", "Only patients who were treated; those never treated are not counted."],
    institutions: ["doh-rizal-cancer-registry"],
    links: [doi("10.1007/s10552-025-01969-6", "Cancer Causes Control 2025"), pubmed("39992497")] }),

  p({ id: "paper-ting-colorectal-z-package-pgh-jgo-2020", name: "Treatment Outcomes of Patients With Colorectal Cancer Enrolled in a Comprehensive Benefits Program of the National Insurance System in the Philippines: Data From the Pilot Site",
    journal: "JCO Global Oncology", year: 2020, doi: "10.1200/jgo.19.00332", pmid: "32031435", authors: "Ting FIL, Sacdalan DBL, Tampo MMT, Apellido RT, Monroy HJ 3rd, Sacdalan MDP, Sacdalan DL", paperType: "real-world",
    tldr: "At the Philippine General Hospital, 251 patients treated for colorectal cancer under PhilHealth's Z package from 2016 to 2018 mostly kept to their treatment plans, and the three-year survival probability was 70 per cent.",
    summary: "The University of the Philippines, Philippine General Hospital Colorectal Polyp and Cancer Study Group reviewed three years of data on patients enrolled in the Z package colorectal cancer benefit, a national insurance package for early to locally advanced colorectal cancer, at the pilot site.",
    findings: [
      "251 patients were enrolled from 2016 to 2018; mean age 57, 66% men, 78% rectal cancer and 82% stage III.",
      "75% were compliant with treatment and follow-up: 90% with surgery, 77% with chemotherapy and 96% with radiotherapy.",
      "Recurrence 17%, morbidity 22% and mortality 19%; two-year survival probability 74% and three-year 70%.",
    ],
    whatItMeans: "A package that pays for the whole course of treatment, delivered by a multidisciplinary team, kept most patients on treatment; the authors judge the survival comparable with data from more developed countries.",
    caveats: ["One hospital and no comparison group.", "Short follow-up of up to three years."],
    cancers: ["colorectal"], institutions: ["philhealth", "philippine-general-hospital"],
    links: [doi("10.1200/jgo.19.00332", "JCO Glob Oncol 2020"), pubmed("32031435")] }),

  p({ id: "paper-eala-oncologist-distribution-philippines-jgo-2022", name: "Geographic Distribution of Cancer Care Providers in the Philippines",
    journal: "JCO Global Oncology", year: 2022, doi: "10.1200/go.22.00138", pmid: "36332171", authors: "Eala MAB, Maslog EAS, Dee EC, Ting FIL, Toral JAB, Dofitas RB, Co HCS, Cañal JPA", paperType: "observational",
    tldr: "A count of board-certified cancer specialists in each of the Philippines' 17 regions from the national societies' membership lists: 348 medical oncologists and 99 radiation oncologists for almost 110 million people, concentrated in Metro Manila.",
    summary: "The authors took the regional area of practice of members of the national societies of medical, radiation, surgical and gynaecological oncology and of hospice and palliative medicine from their official websites and compared it with the regional census.",
    findings: [
      "348 medical oncologists, 164 surgical oncologists, 99 radiation oncologists, 142 gynaecological oncologists and 35 hospice and palliative medicine specialists for a population of almost 110 million.",
      "That is 0.32 medical oncologists and 0.09 radiation oncologists per 100,000 people.",
      "Every region has at least one medical and one gynaecological oncologist; two regions have no surgical oncologist, five no radiation oncologist and eight no palliative medicine specialist.",
    ],
    whatItMeans: "Where a patient lives decides how far they travel for radiotherapy or palliative care, which is part of why treatment waits and abandonment are concerns in Philippine cancer care.",
    caveats: ["Society membership lists may be incomplete or out of date."],
    institutions: ["doh-philippines"],
    links: [doi("10.1200/go.22.00138", "JCO Glob Oncol 2022"), pubmed("36332171")] }),

  p({ id: "paper-chye-act-now-breast-cea-bmjgh-2025", name: "Modelling the health, financial protection and equity impacts of upscaling the ACT NOW early intervention breast cancer pilot program in the Philippines: an extended cost-effectiveness analysis",
    journal: "BMJ Global Health", year: 2025, doi: "10.1136/bmjgh-2024-016402", pmid: "39900428", authors: "Chye A, Jan S, Pathy NB, Luna HGC, Lim SB, Kimman M, Woodward M, Peters S, Monaghan H, Ngelangel CA, Angell B", paperType: "methods",
    tldr: "A model of scaling up ACT NOW, a Philippine pilot that guides women from free breast examination to treatment, found it cost-effective at about 60,700 pesos per disability-adjusted life year saved, preventing 57 breast cancer deaths per 100,000 women over five years.",
    summary: "A microsimulation decision-tree model of ACT NOW, with annual clinical breast examination and breast ultrasound for women at high risk (which the paper calls biannual), over five years for healthy women aged 40 to 69. The authors note that the Philippines has reformed financial protection for breast cancer but has no national early detection and treatment programme.",
    findings: [
      "Incremental cost-effectiveness ratio of PHP60,711 (USD1,098) per DALY saved, below the 2022 GDP per head of PHP178,751.",
      "Per 100,000 women, 57 deaths and eight financial catastrophes were averted over five years.",
      "Results were sensitive to the share of late-stage cancers after the intervention, treatment adherence, intervention costs and how well it downstaged disease.",
    ],
    whatItMeans: "Early detection with navigation to treatment is likely to be good value in the Philippines, and the authors call for research on the best model for full implementation.",
    caveats: ["A model, not a trial; its inputs come partly from the pilot.", "Five-year horizon."],
    cancers: ["breast-cancer"], institutions: ["philhealth", "philippine-hta-council", "philippine-cancer-society"],
    links: [doi("10.1136/bmjgh-2024-016402", "BMJ Glob Health 2025"), pubmed("39900428")] }),

  p({ id: "paper-myint-cervical-screening-ndhs-philippines-2024", name: "Factors Influencing Cervical Cancer Screening Uptake among Reproductive-Aged Filipino Women: Findings from the 2022 Philippines National Demographic and Health Survey",
    journal: "Women's Health Reports", year: 2024, doi: "10.1089/whr.2024.0011", pmid: "39035148", authors: "Myint WW, Aggad R, Fan Q, Mendez SE", paperType: "observational",
    tldr: "In the 2022 national household health survey, about one in ten Filipino women of reproductive age had been screened for cervical cancer, with screening far more common among women with more education and higher incomes.",
    summary: "An analysis of the 2022 Philippines National Demographic and Health Survey, using multivariable logistic regression to examine what predicted cervical cancer screening among women of reproductive age, including experience of intimate partner violence.",
    findings: [
      "About 10% (n = 1,648) of the women surveyed had been screened for cervical cancer.",
      "Screening was more likely at ages 45 to 49 (adjusted odds ratio 6.42), with higher education (14.26) and in wealthier households (3.46).",
    ],
    whatItMeans: "Cervical screening in the Philippines reached a small minority of women in 2022 and mostly the better off, which is the gap the authors say screening programmes should target.",
    caveats: ["Self-reported screening.", "Women of reproductive age only, so older women are not counted."],
    cancers: ["cervical"], institutions: ["doh-philippines"],
    links: [doi("10.1089/whr.2024.0011", "Womens Health Rep 2024"), pubmed("39035148")] }),
];

/** Records behind /countries/ph/ (wave 4). */
export const recordsPH: EntityInput[] = [...institutions, ...papers];
