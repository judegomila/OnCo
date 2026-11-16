import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Puerto Rico: the public bodies and papers behind /countries/pr/ (wave 10) that the corpus did not hold. Each was
 * written from its own primary source, read raw on 11 November 2026: the Puerto Rico Central Cancer Registry's site
 * and its report "Cancer in Puerto Rico, 2018-2022" (PDF text, published 2025), the Department of Health's pages for
 * its Medicaid programme and its Secretaría Auxiliar para la Regulación de la Salud Pública, two of that office's
 * notices to non-resident medicine distributors (scanned PDFs dated November 2024 and March 2025, read by OCR), the
 * Administración de Seguros de Salud's Plan Vital page, and NCI's NCORP site list. DOIs were resolved through Europe
 * PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * Country code: these records use "PR", Puerto Rico's own ISO 3166-1 code and the code the /countries/pr/ page counts.
 * The one Puerto Rico record that already existed, the University of Puerto Rico Comprehensive Cancer Center
 * (institutions/us-cancer-centres-aaci.ts), uses "US" with the city written "San Juan, PR", following the AACI list it
 * came from; it is reused here, not duplicated.
 *
 * Inbound links: the Department of Health links the registry, ASES, the NCORP and the cancer centre; the registry links
 * its papers through keyPapers and its director through people. Coordinates are approximate San Juan points, not
 * building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const RCPR = "https://rcpr.org/";
const RCPR_ABOUT = "https://rcpr.org/Sobre-Nosotros";
const RCPR_REPORT = "https://rcpr.org/Portals/0/informe%202018-2022%20-%20Ingles.pdf";
const DS_HOME = "https://www.salud.pr.gov/";
const DS_MEDICAID = "https://www.salud.pr.gov/CMS/85";
const DS_SARSP = "https://www.salud.pr.gov/CMS/187";
const DS_NOTICE_2024 = "https://www.salud.pr.gov/CMS/DOWNLOAD/9461";
const ASES_VITAL = "https://www.ases.pr.gov/plan-vital";
const NCORP_SITES = "https://ncorp.cancer.gov/findasite/";

const institutions: InstitutionInput[] = [
  i({ id: "puerto-rico-department-of-health", name: "Puerto Rico Department of Health", aka: ["Departamento de Salud de Puerto Rico", "Departamento de Salud", "PRDOH"],
    city: "San Juan, PR", country: "PR", lat: 18.39, lng: -66.07, institutionType: "government", website: DS_HOME,
    tldr: "Puerto Rico's health department. It owns the cancer registry, decides who qualifies for Medicaid, licenses health facilities and pharmacies, and keeps its own register of the medicines distributed on the island, including cancer medicines.",
    summary: "The Departamento de Salud runs Puerto Rico's Medicaid programme, which its page says began on the island on 1 January 1966 under Title XIX of the federal Social Security Act; it decides who is eligible, while the Administración de Seguros de Salud buys the coverage, called Plan Vital, from private insurers. The Puerto Rico Central Cancer Registry is a Department programme, established under Law 28 of 20 March 1951 and now governed by Law 113 of 2010, which makes reporting of cancer cases compulsory; since July 2008 the University of Puerto Rico Comprehensive Cancer Center has administered it under a memorandum of understanding.\n\nThe Department's Secretaría Auxiliar para la Regulación de la Salud Pública (SARSP) regulates, plans and oversees health facilities and health professionals, and its Section of Pharmacy Licensing, Medicines and Medicines Registration keeps a register of medicines under the Department's Regulation No. 156. In August 2024 SARSP told non-resident wholesale distributors of cancer medicines, vaccines and antibiotics that they needed a Special Authorisation, and notices in November 2024 and March 2025 extended that deadline while registration continued for prescription and non-prescription medicines and other products. The register does not replace FDA approval: the federal Food, Drug, and Cosmetic Act counts Puerto Rico as a State.",
    programs: ["Medicaid eligibility (since 1966)", "Puerto Rico Central Cancer Registry (Law 113 of 2010)", "Medicines registration under Regulation No. 156", "Licensing of pharmacies and medicine distributors", "Certificates of need for health facilities", "Immunisation, including the HPV school-entry requirement (from August 2018)"],
    institutions: ["puerto-rico-central-cancer-registry", "ases-puerto-rico", "upr-comprehensive-cancer-center", "puerto-rico-ncorp", "fda-oce", "cms"],
    cancers: ["cervical", "breast-cancer", "colorectal", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-colon-lopez-hpv-school-entry-puerto-rico-pcd-2021"],
    links: [
      { label: "Departamento de Salud: Programa Medicaid (in Spanish)", url: DS_MEDICAID },
      { label: "Departamento de Salud: Secretaría Auxiliar para la Regulación de la Salud Pública (in Spanish)", url: DS_SARSP },
      { label: "SARSP: notice to non-resident distributors on medicines registration (November 2024, scanned PDF, in Spanish)", url: DS_NOTICE_2024 },
      { label: "Puerto Rico Central Cancer Registry: about the registry (in Spanish)", url: RCPR_ABOUT },
    ] }),

  i({ id: "puerto-rico-central-cancer-registry", name: "Puerto Rico Central Cancer Registry", aka: ["Registro Central de Cáncer de Puerto Rico", "RCCPR", "PRCCR"],
    city: "San Juan, PR", country: "PR", lat: 18.40, lng: -66.06, institutionType: "government", website: RCPR,
    tldr: "Puerto Rico's population-based cancer registry, a Department of Health programme since the early 1950s, run by the University of Puerto Rico Comprehensive Cancer Center since 2008. It counts every cancer diagnosed in residents and has reported more than 95% of expected cases each year since 2010.",
    summary: "The registry's own page describes it as a Department of Health programme established under Law 28 of 20 March 1951 and one of the first registries set up in the Americas; its 2018 to 2022 report dates it to March 1950. Law 113 of 2010 replaced the 1951 law, made reporting by public and private institutions compulsory and formalised electronic reporting. Since July 2008 it has been administered by the University of Puerto Rico Comprehensive Cancer Center.\n\nIt joined the CDC's National Program of Cancer Registries in October 1997, is funded in part by CDC grant NU58DP007164, and its data appear in the CDC's US Cancer Statistics. The CDC's most recent evaluation found it complete for more than 95% of expected cases, and the registry reports completeness above 95% every year since 2010. It is not among the registries listed by NCI's SEER programme. Its report Cancer in Puerto Rico, 2018-2022, published in 2025, counts 80,473 people diagnosed with invasive cancer and 26,105 cancer deaths over those five years. It also links its cases to health insurance claims in the Puerto Rico Central Cancer Registry-Health Insurance Linkage Database, which researchers use to study treatment by type of insurance.",
    programs: ["Population-based cancer registration for all residents of Puerto Rico", "CDC National Program of Cancer Registries (since October 1997)", "Puerto Rico Central Cancer Registry-Health Insurance Linkage Database", "Annual and special reports, rates and maps"],
    institutions: ["puerto-rico-department-of-health", "upr-comprehensive-cancer-center", "naaccr"], people: ["karen-j-ortiz-ortiz"],
    cancers: ["prostate", "breast-cancer", "colorectal", "cervical", "thyroid"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-ortiz-cervical-cancer-trends-puerto-rico-bmc-med-2024", "paper-suarez-ramos-hurricanes-covid-colorectal-incidence-pr-cancer-2025", "paper-chance-radiotherapy-after-bcs-puerto-rico-jgo-2018", "paper-gierbolini-insurance-deprivation-breast-cancer-pr-healthcare-2026", "paper-munoz-torres-hurricane-treatment-disruption-pr-ijerph-2024", "paper-gopalani-screening-us-territories-canep-2023"],
    links: [
      { label: "Registro Central de Cáncer de Puerto Rico (in Spanish)", url: RCPR },
      { label: "RCCPR: about the registry (in Spanish)", url: RCPR_ABOUT },
      { label: "Cancer in Puerto Rico, 2018-2022 (Puerto Rico Central Cancer Registry, 2025, PDF)", url: RCPR_REPORT },
      { label: "NCI SEER: list of SEER registries", url: "https://seer.cancer.gov/registries/list.html" },
    ] }),

  i({ id: "ases-puerto-rico", name: "Administración de Seguros de Salud de Puerto Rico (ASES)", aka: ["ASES", "Puerto Rico Health Insurance Administration", "Plan Vital", "Government Health Plan"],
    city: "San Juan, PR", country: "PR", lat: 18.42, lng: -66.07, institutionType: "government", website: "https://www.ases.pr.gov/",
    tldr: "The Puerto Rico government agency that buys health coverage for people on Medicaid and the Children's Health Insurance Program. Its Plan Vital, run through private insurers, covers about 1.6 million people and puts cancer in a special coverage tier.",
    summary: "ASES was created by Law 72 of 1993, the Puerto Rico Health Insurance Administration Act, which moved much of the island's publicly financed care to the private sector; MACPAC's 2021 fact sheet describes the resulting Government Health Plan, now called Vital, as Puerto Rico's Medicaid programme, and the only territory programme run through managed care. ASES's Plan Vital page says the plan serves 1.6 million Puerto Ricans through networks of providers across the island, and lists beneficiary manuals for four insurers: First Medical, Menonita, MMM and Triple-S.\n\nCancer is one of the conditions in Plan Vital's special coverage (cubierta especial), set by attachment 7 of the insurer contract. People registered in it can see any provider in their plan's networks and get tests and medicines without a referral, and the listed services include chemotherapy, radiology and related services. ASES also contracts the insurers for Medicare Platino, the Medicare Advantage plans that pay Medicare costs for people eligible for both Medicare and full Medicaid.",
    programs: ["Plan Vital (Government Health Plan, Medicaid and CHIP)", "Special coverage (cubierta especial) for cancer and other conditions", "Medicare Platino for people dually eligible", "Coverage for public employees under Law 95"],
    institutions: ["puerto-rico-department-of-health", "cms"], cancers: ["breast-cancer", "colorectal", "prostate"], related: ["global-oncology-access"],
    links: [
      { label: "ASES: Plan Vital (in Spanish)", url: ASES_VITAL },
      { label: "ASES: home (in Spanish)", url: "https://www.ases.pr.gov/" },
      { label: "Triple-S Salud: Plan Vital beneficiary manual, special coverage (PDF, 2022)", url: "https://docs.pr.gov/files/ASES/Plan%20Vital/Manuales%20del%20los%20Beneficiarios/Triple-S-Beneficiary-Manual-English-Version-1.pdf" },
      { label: "MACPAC: Medicaid and CHIP in Puerto Rico (February 2021, PDF)", url: "https://www.macpac.gov/wp-content/uploads/2020/08/Medicaid-and-CHIP-in-Puerto-Rico.pdf" },
    ] }),

  i({ id: "puerto-rico-ncorp", name: "Puerto Rico NCORP", aka: ["Puerto Rico NCI Community Oncology Research Program"],
    city: "San Juan, PR", country: "PR", lat: 18.41, lng: -66.06, institutionType: "consortium", website: NCORP_SITES,
    tldr: "Puerto Rico's site in the US National Cancer Institute's community research network, which brings NCI-funded cancer trials to hospitals and oncology practices across the island.",
    summary: "The NCI Community Oncology Research Program (NCORP) funds community sites to enrol people in cancer treatment, prevention, screening and care-delivery trials run by NCI research bases. NCI's site list names Puerto Rico NCORP, based in San Juan, with Luis J. Santos Reyes as principal investigator, and lists its affiliates: Cancer Center Metro Medical Center Bayamón, the University of Puerto Rico Comprehensive Cancer Center, Doctor's Cancer Center in Arecibo, Doctors Cancer Center, HIMA San Pablo Oncologic Hospital, Hematología Oncología San Pablo, the I. González Martínez Oncologic Hospital, Instituto Oncología Moderna Ponce, PROncology, Primary Care Physician Group, Puerto Rico Hematology Oncology Group, San Juan City Hospital, San Juan Community Oncology Group, San Patricio Medflix and University Pediatric Hospital. The University of Puerto Rico Comprehensive Cancer Center's site lists the NCORP among its research programmes.",
    programs: ["NCI-funded cancer treatment, prevention, screening and care-delivery trials in community settings"],
    institutions: ["upr-comprehensive-cancer-center", "nci"], people: ["luis-j-santos-reyes"],
    links: [
      { label: "NCI NCORP: find a site (Puerto Rico NCORP)", url: NCORP_SITES },
      { label: "Centro Comprensivo de Cáncer de la Universidad de Puerto Rico (in Spanish)", url: "https://www.cccupr.org/" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ortiz-cervical-cancer-trends-puerto-rico-bmc-med-2024", name: "Cervical cancer incidence, stage and mortality trends in Puerto Rico, 2001 to 2019",
    journal: "BMC Medicine", year: 2024, doi: "10.1186/s12916-024-03535-4", pmid: "39135060", authors: "Ortiz AP, Torres-Cintrón CR, Santiago-Rodríguez EJ, et al.", paperType: "observational",
    tldr: "Using the Puerto Rico Central Cancer Registry, the authors found cervical cancer incidence going from 12.5 to 15.3 per 100,000 between 2001 and 2019, a trend not statistically significant overall, and a significant rise in cancers already spread at diagnosis among women of screening age.",
    summary: "Published as \"Recent cervical cancer incidence, stage at diagnosis, and mortality trends in Puerto Rico, 2001-2019\". The authors used registry data to estimate trends in hysterectomy-corrected cervical cancer incidence and mortality, overall and by stage at diagnosis and age, to test whether the rise in Puerto Rico was real or reflected closer diagnostic scrutiny.",
    findings: [
      "Overall incidence rose 1.6% a year (95% CI -0.5% to 3.8%), from 12.5 to 15.3 per 100,000.",
      "Distant-stage disease rose 4.5% a year (95% CI 1.6% to 8.0%), and 5.8% a year (2.1% to 10.6%) among women aged 25 to 64, the screening ages.",
      "Mortality in that age group stayed stable over the period.",
    ],
    whatItMeans: "More cervical cancers are being found late in women who should have been screened, which the authors say may be a real increase; they call improved prevention an urgent priority.",
    caveats: ["Registry data cannot show why the rise happened.", "The overall incidence trend's confidence interval includes no change."],
    institutions: ["puerto-rico-central-cancer-registry", "upr-comprehensive-cancer-center"], cancers: ["cervical"],
    links: [doi("10.1186/s12916-024-03535-4", "BMC Med 2024"), pubmed("39135060")] }),

  p({ id: "paper-suarez-ramos-hurricanes-covid-colorectal-incidence-pr-cancer-2025", name: "Hurricanes Irma and María, COVID-19 and colorectal cancer diagnoses in Puerto Rico",
    journal: "Cancer", year: 2025, doi: "10.1002/cncr.35793", pmid: "40223414", authors: "Suárez-Ramos T, Verganza S, Pagán-Santana Y, et al.", paperType: "observational",
    tldr: "Registry data for 2012 to 2021 show colorectal cancer diagnoses in Puerto Rico fell 17.5% in the month the 2017 hurricanes struck and 24.2% after the COVID-19 lockdown, with early-stage diagnoses still below expected numbers at the end of the study.",
    summary: "Published as \"Evaluating the impact of hurricanes and the COVID-19 pandemic on colorectal cancer incidence in Puerto Rico: An interrupted time-series analysis\". Colorectal cancer cases from 2012 to 2021 in the Puerto Rico Central Cancer Registry were analysed across three periods: before the hurricanes, after the hurricanes, and after the COVID-19 lockdown restrictions.",
    findings: [
      "An immediate fall of 8.3 cases a month (17.5%) in the month the hurricanes struck.",
      "A second fall of 39.4 cases (24.2%) after the COVID-19 lockdown restrictions.",
      "By the end of the study early-stage cases and cases in people aged 50 to 75 had not reached expected numbers, while late-stage cases and cases in people under 50 or over 75 exceeded them.",
    ],
    whatItMeans: "When screening services were interrupted, fewer colorectal cancers were found early; the authors expect the effect to show in later years and call for continued monitoring.",
    caveats: ["The authors infer reduced screening access; the study does not measure screening directly."],
    institutions: ["puerto-rico-central-cancer-registry", "upr-comprehensive-cancer-center"], cancers: ["colorectal"],
    links: [doi("10.1002/cncr.35793", "Cancer 2025"), pubmed("40223414")] }),

  p({ id: "paper-chance-radiotherapy-after-bcs-puerto-rico-jgo-2018", name: "Underuse of radiotherapy after breast-conserving surgery in Puerto Rico, by type of insurance",
    journal: "Journal of Global Oncology", year: 2018, doi: "10.1200/JGO.2016.008664", pmid: "30241162", authors: "Chance WW, Ortiz-Ortiz KJ, Liao KP, et al.", paperType: "observational",
    tldr: "Linking registry and insurance claims for women diagnosed in 2008 to 2012, the authors found only 64% received radiotherapy after breast-conserving surgery, and women with Medicare or both Medicare and Medicaid were more likely to receive it than women with Medicaid alone.",
    summary: "Published as \"Underuse of Radiation Therapy After Breast Conservation Surgery in Puerto Rico: A Puerto Rico Central Cancer Registry-Health Insurance Linkage Database Study\". Women with stage I or II invasive breast cancer diagnosed between 2008 and 2012 were identified in the linked database, and claims codes were used to identify surgery and radiotherapy.",
    findings: [
      "64% of women whose main treatment was breast-conserving surgery received radiotherapy afterwards.",
      "Medicare enrolment (odds ratio 2.14, 95% CI 1.46 to 3.13) and dual Medicare and Medicaid eligibility (1.61, 1.14 to 2.27) predicted receiving it, compared with Medicaid alone.",
      "Receipt varied by region, and women with tumours larger than 2 cm were less likely to receive it.",
    ],
    whatItMeans: "In Puerto Rico the kind of public insurance a woman had was linked to whether she received a standard part of breast cancer treatment.",
    caveats: ["Claims data can miss treatment paid for outside insurance.", "Diagnoses from 2008 to 2012; coverage has changed since."],
    institutions: ["puerto-rico-central-cancer-registry"], cancers: ["breast-cancer"],
    links: [doi("10.1200/JGO.2016.008664", "J Glob Oncol 2018"), pubmed("30241162")] }),

  p({ id: "paper-gierbolini-insurance-deprivation-breast-cancer-pr-healthcare-2026", name: "Health insurance, neighbourhood deprivation and breast cancer delays and survival in Puerto Rico",
    journal: "Healthcare (Basel)", year: 2026, doi: "10.3390/healthcare14050676", pmid: "41827629", authors: "Gierbolini-Bermúdez A, Castañeda-Avila MA, Vázquez-Roldán M, et al.", paperType: "observational",
    tldr: "Among women diagnosed with breast cancer in Puerto Rico in 2012 to 2016, differences in diagnostic delay and survival by type of insurance were clearest in less deprived neighbourhoods and faded or disappeared in the most deprived ones.",
    summary: "Published as \"Health Insurance and Neighborhood Deprivation as Determinants of Diagnostic Delays and Survival in Breast Cancer\". A retrospective cohort of women aged 18 or over diagnosed with breast cancer in Puerto Rico between 2012 and 2016, from the Puerto Rico Central Cancer Registry-Health Insurance Linkage Database. The outcomes were a diagnostic delay of more than 60 days and death within six years, by insurance type (private, Medicare, Medicaid, or both Medicare and Medicaid), with neighbourhood deprivation as a modifier.",
    findings: [
      "Differences by insurance type in diagnostic delay and risk of death were most evident in areas of low to average deprivation.",
      "In the most deprived neighbourhoods the differences narrowed for diagnostic delay and disappeared for risk of death.",
    ],
    whatItMeans: "Where a woman lives shapes how quickly and how well breast cancer is diagnosed and treated, alongside the kind of insurance she has.",
    caveats: ["The abstract does not give the size of the cohort or effect sizes."],
    institutions: ["puerto-rico-central-cancer-registry"], cancers: ["breast-cancer"],
    links: [doi("10.3390/healthcare14050676", "Healthcare (Basel) 2026"), pubmed("41827629")] }),

  p({ id: "paper-colon-lopez-hpv-school-entry-puerto-rico-pcd-2021", name: "Puerto Rico's HPV vaccine school-entry requirement: history, challenges and opportunities",
    journal: "Preventing Chronic Disease", year: 2021, doi: "10.5888/pcd18.210035", pmid: "34351844", authors: "Colón-López V, Vázquez-Otero C, Rivera-Figueroa V, et al.", paperType: "review",
    tldr: "An essay on how Puerto Rico came to require the HPV vaccine for school entry at ages 11 to 12 from August 2018, after laws in 2010 and 2012 widened access to the vaccine, and what happened in the first two years.",
    summary: "Published as \"HPV Vaccine School Entry Requirement in Puerto Rico: Historical Context, Challenges, and Opportunities\" by authors from the University of Puerto Rico Comprehensive Cancer Center, the University of Puerto Rico and the Puerto Rico Department of Health. It traces Law No. 25 of 1983, under which the Secretary of Health decides which vaccines are required for school, Law No. 9 of 2010, which gave girls aged 11 to 18 access to the HPV vaccine, its 2012 amendment adding boys, and the Department's announcement in May 2018 of the requirement for August 2018.",
    findings: [
      "Before the requirement, the 2016 National Immunization Survey-Teen put HPV vaccine initiation (one or more doses) at 80.8% in girls and 71.1% in boys in Puerto Rico.",
      "Preliminary Puerto Rico Immunization Registry data showed a 54.0% increase in vaccinations among children aged 11 to 12 between 2017 and 2019.",
      "The requirement started 11 months after Hurricane María, and misinformation and limited knowledge of how it would work were the main barriers reported.",
    ],
    whatItMeans: "Puerto Rico made the HPV vaccine a school requirement at ages 11 to 12, building on years of laws and campaigns; early registry data suggested more children were being vaccinated.",
    caveats: ["An essay, not a trial; the 54.0% increase is described as a preliminary analysis.", "Migration after Hurricane María complicates rates calculated from the immunisation registry."],
    institutions: ["upr-comprehensive-cancer-center", "puerto-rico-department-of-health"], cancers: ["cervical"], technologies: ["hpv-vaccine"],
    links: [doi("10.5888/pcd18.210035", "Prev Chronic Dis 2021"), pubmed("34351844"), { label: "Europe PMC full text", url: "https://europepmc.org/article/PMC/PMC8388198" }] }),

  p({ id: "paper-munoz-torres-hurricane-treatment-disruption-pr-ijerph-2024", name: "Cancer treatment disruption by region after Hurricanes Irma and María in Puerto Rico",
    journal: "International Journal of Environmental Research and Public Health", year: 2024, doi: "10.3390/ijerph21101334", pmid: "39457307", authors: "Muñoz-Torres F, Soto-Salgado M, Ortiz-Ortiz KJ, et al.", paperType: "observational", participants: 241,
    tldr: "Of 241 people being treated for breast or colorectal cancer when the 2017 hurricanes struck, 59% had their treatment interrupted, half of them for more than 30 days, and interruptions were more common outside the San Juan metropolitan area.",
    summary: "Published as \"Cancer Treatment Disruption by Residence Region in the Aftermath of Hurricanes Irma and María in Puerto Rico\". Telephone surveys were conducted with breast and colorectal cancer patients aged 40 or over who had been diagnosed within six months before the hurricanes and were in treatment when they struck. Disruption meant any pause in surgery, chemotherapy, radiotherapy or oral treatment because of the hurricanes.",
    findings: [
      "59% of respondents reported treatment disruption; half of these were disrupted for more than 30 days, and 14% of those for more than 90 days.",
      "Disruption was 48% more common outside the San Juan metropolitan area (prevalence ratio 1.48, 95% CI 1.06 to 2.07).",
      "The Arecibo, Bayamón, Caguas and Mayagüez regions had higher disruption.",
    ],
    whatItMeans: "Disaster plans for cancer care need to reach patients outside the capital, where interruptions were more common.",
    caveats: ["Survivors who could be reached by telephone; those who died or moved away are missing."],
    institutions: ["upr-comprehensive-cancer-center", "puerto-rico-central-cancer-registry"], cancers: ["breast-cancer", "colorectal"],
    links: [doi("10.3390/ijerph21101334", "Int J Environ Res Public Health 2024"), pubmed("39457307")] }),

  p({ id: "paper-gopalani-screening-us-territories-canep-2023", name: "Breast, cervical and colorectal cancer screening in Guam, Puerto Rico and the US Virgin Islands",
    journal: "Cancer Epidemiology", year: 2023, doi: "10.1016/j.canep.2023.102371", pmid: "37105018", authors: "Gopalani SV, Soman A, Shapiro JA, et al.", paperType: "observational",
    tldr: "Survey data from 2016 to 2020 show 83.4% of women aged 50 to 74 in Puerto Rico were up to date with breast screening and 83.0% of women aged 21 to 65 with cervical screening, but only 61.2% of adults aged 50 to 75 with colorectal screening, against 69.0% across the US states.",
    summary: "The authors analysed Behavioral Risk Factor Surveillance System data from 2016, 2018 and 2020 for the 50 states and DC, Guam and Puerto Rico, and from 2016 for the US Virgin Islands, estimating age-standardised proportions up to date with screening as recommended by the US Preventive Services Task Force.",
    findings: [
      "Breast cancer screening (women 50 to 74): Puerto Rico 83.4% (95% CI 81.7 to 84.9), US 78.3%.",
      "Cervical cancer screening (women 21 to 65): Puerto Rico 83.0% (81.7 to 84.3), US 84.5%.",
      "Colorectal cancer screening (adults 50 to 75): Puerto Rico 61.2% (59.5 to 62.8), US 69.0%.",
      "Adults without health coverage reported low screening for all three cancers in every jurisdiction.",
    ],
    whatItMeans: "Puerto Rico screens for breast cancer at least as well as the states, but colorectal screening lags, and people without insurance are screened least.",
    caveats: ["Self-reported survey data.", "Screening ages follow the recommendations in force for 2016 to 2020."],
    institutions: ["puerto-rico-central-cancer-registry"], cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [doi("10.1016/j.canep.2023.102371", "Cancer Epidemiol 2023"), pubmed("37105018")] }),
];

/** Records behind /countries/pr/ (wave 10). */
export const recordsPR: EntityInput[] = [...institutions, ...papers];
