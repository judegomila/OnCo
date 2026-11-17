import type { CompanyInput, EntityInput, InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

/**
 * Australia: the institutions, companies, trials and papers behind /countries/au/ that the corpus did not hold.
 * People are in src/data/people/country-au.ts. Every record carries its sources; DOIs were resolved through
 * Crossref or Europe PMC before use.
 *
 * Read on 2026-11-03. Several Australian Government sites (aihw.gov.au, health.gov.au, tga.gov.au,
 * canceraustralia.gov.au) refused automated requests that day, so their pages were read from the Internet Archive's
 * dated copies of the same URL; the capture date is given where a figure depends on it. Abstracts were read through
 * PubMed (E-utilities) or Europe PMC.
 */
const asOf = "2026-11-03";
const inst = (x: Omit<InstitutionInput, "kind" | "asOf">): InstitutionInput => ({ kind: "institution", asOf, ...x });
const grp = ({ tags = [], ...x }: Omit<CompanyInput, "kind" | "asOf" | "companyType">): CompanyInput => ({ kind: "company", asOf, companyType: "cooperative-group", tags: ["cooperative-group", ...tags], ...x });
const trial = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
const paper = (x: Omit<PaperInput, "kind" | "asOf">): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const institutions: InstitutionInput[] = [
  inst({
    id: "aihw", name: "Australian Institute of Health and Welfare", aka: ["AIHW", "Australian Cancer Database", "ACD", "Cancer data in Australia", "CdiA"],
    city: "Canberra", country: "AU", lat: -35.239, lng: 149.069, institutionType: "government", website: "https://www.aihw.gov.au",
    tldr: "The national statistics agency that holds the Australian Cancer Database, built each year from the eight state and territory cancer registries, and publishes Australia's headline cancer numbers in a report called Cancer data in Australia.",
    summary: "Every cancer except basal and squamous cell carcinoma of the skin is a notifiable disease in each Australian state and territory: legislation in each jurisdiction requires hospitals, pathology laboratories and other institutions to report every case to that jurisdiction's central cancer registry. An agreed subset of those registries' data is sent to the AIHW once a year and compiled into the Australian Cancer Database, which runs from 1982. Deaths come separately, from the state and territory Registries of Births, Deaths and Marriages through the Australian Bureau of Statistics into the AIHW's National Mortality Database.\n\nThe AIHW's annual web report, Cancer data in Australia, is where the national figures are published. Because complete registry data take time to assemble, the report projects incidence and mortality forward from the latest actual year: the 2024 edition, released on 15 August 2024, was built on actual diagnoses to 2020 and projected 2021 to 2024, and estimated around 169,500 new cancers and around 52,700 cancer deaths for 2024, with five-year relative survival of 71 percent for 2016-2020. Its age-standardised rates are standardised to the Australian population of the report year, not to the World standard IARC uses, so they cannot be set beside GLOBOCAN rates. The 2025 edition, reported in October 2025, moved survival to 72 percent for 2017-2021 and estimated around 170,000 diagnoses for 2025.",
    programs: ["Australian Cancer Database (compiled from state and territory cancer registries)", "Cancer data in Australia (annual web report)", "National Mortality Database", "Australian Mesothelioma Registry"],
    cancers: ["prostate", "melanoma", "colorectal", "nsclc", "cervical"], sections: ["prevention"],
    institutions: ["cancer-australia", "cancer-council-australia"],
    links: [
      { label: "AIHW: Cancer data in Australia", url: "https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia" },
      { label: "Cancer data in Australia 2024: overview (Internet Archive copy, 26 October 2024)", url: "https://web.archive.org/web/20241026023444/https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia/contents/overview" },
      { label: "Cancer data in Australia: technical notes, methods (Internet Archive copy, 25 June 2024)", url: "https://web.archive.org/web/20240625161112/https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia/contents/technical-notes/methods" },
    ],
  }),
  inst({
    id: "cancer-australia", name: "Cancer Australia", aka: ["Australian Cancer Plan", "Optimal Care Pathways"],
    city: "Sydney", country: "AU", lat: -33.884, lng: 151.207, institutionType: "government", website: "https://www.canceraustralia.gov.au",
    tldr: "The Australian Government's national cancer control agency, set up in 2006, which wrote the ten-year Australian Cancer Plan and gives guidance on developing the national Optimal Care Pathways.",
    summary: "Cancer Australia was established by the Australian Government in 2006 and describes itself as the national cancer control agency, leading and coordinating evidence-based action and making recommendations to government on cancer policy and priorities; it marks its twentieth anniversary in 2026. It developed the ten-year Australian Cancer Plan, a national strategy written after consultation with people affected by cancer, Aboriginal and Torres Strait Islander people, clinicians, researchers and policy makers, with a stated focus on the groups whose outcomes are poorer. Its chief executive is Professor Dorothy Keefe.\n\nTwo pieces of national machinery run through it. The Optimal Care Pathways, hosted by Cancer Council Australia, which directs questions about developing a pathway to Cancer Australia, set out what good care looks like at each step from prevention and early detection to survivorship or end-of-life care, for each cancer type, so that the standard does not depend on where a person lives. It also did the enquiry and feasibility work behind the National Lung Cancer Screening Program, which the health department cites as the evidence base for the program's screening pathway.",
    programs: ["Australian Cancer Plan (ten years)", "Optimal Care Pathways, with Cancer Council Australia", "Lung cancer screening enquiry and feasibility study", "Advice to government on cancer policy"],
    cancers: ["nsclc"], sections: ["prevention", "supportive-care"],
    institutions: ["aihw", "cancer-council-australia", "acpcc"], companies: ["anzgog", "allg", "agitg", "anzup", "breast-cancer-trials", "trog"],
    people: ["dorothy-keefe"],
    links: [
      { label: "Cancer Australia: about us (Internet Archive copy, 13 July 2026)", url: "https://web.archive.org/web/20260713220314/https://www.canceraustralia.gov.au/about-us" },
      { label: "Cancer Australia: Australian Cancer Plan (Internet Archive copy, 12 October 2026)", url: "https://web.archive.org/web/20261012222028/https://www.canceraustralia.gov.au/australian-cancer-plan" },
      { label: "Australian Cancer Plan", url: "https://www.australiancancerplan.gov.au/" },
      { label: "Cancer Council Australia: Optimal Care Pathways", url: "https://www.cancer.org.au/health-professionals/optimal-cancer-care-pathways" },
    ],
  }),
  inst({
    id: "acpcc", name: "Australian Centre for the Prevention of Cervical Cancer", aka: ["ACPCC", "VCS Foundation", "Victorian Cytology Service"],
    city: "Melbourne", country: "AU", lat: -37.800, lng: 144.960, institutionType: "research-institute", website: "https://acpcc.org.au",
    tldr: "A Melbourne organisation founded in 1964 as the Victorian Cytology Service that ran Compass, the trial behind Australia's switch to HPV-based cervical screening, and partnered the government on the national strategy to eliminate cervical cancer by 2035.",
    summary: "The ACPCC was founded in December 1964 as the Victorian Cytology Service and has changed its name as its work widened; as the VCS Foundation it sponsors Compass, the randomised trial of five-yearly primary HPV screening against two-and-a-half-yearly liquid-based cytology registered as NCT02328872, which enrolled 76,181 women. The Compass pilot showed, in a population where the youngest women had been offered HPV vaccination, that primary HPV screening found more high-grade precancer than cytology; it was published in 2017, the year the national programme moved to HPV testing every five years, in December.\n\nThe Department of Health's National Strategy for the Elimination of Cervical Cancer in Australia was developed in partnership with the ACPCC. It extends the World Health Organization's targets to Australia: 90 percent HPV vaccination for boys as well as girls, 70 percent five-yearly screening participation from 25 to 74, 95 percent treatment, and fewer than 4 cases of cervical cancer per 100,000 women, with elimination by 2035. The ACPCC states on its own site that Australia is anticipated to be the first country to reach that threshold.",
    programs: ["Compass trial of primary HPV screening", "Partner on the National Strategy for the Elimination of Cervical Cancer", "Support for HPV vaccination and screening programmes"],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], sections: ["prevention"],
    trials: ["compass-cervical-hpv-screening"], keyPapers: ["paper-canfell-compass-pilot-plos-med-2017", "paper-hall-cervical-elimination-australia-lancet-public-health-2019"],
    institutions: ["cancer-australia"], people: ["karen-canfell"],
    links: [
      { label: "ACPCC: about", url: "https://acpcc.org.au/about-acpcc/" },
      { label: "National Strategy for the Elimination of Cervical Cancer in Australia (Internet Archive copy, 18 May 2026)", url: "https://web.archive.org/web/20260518025524/https://www.health.gov.au/resources/publications/national-strategy-for-the-elimination-of-cervical-cancer-in-australia" },
      { label: "ClinicalTrials.gov NCT02328872: Compass", url: "https://clinicaltrials.gov/study/NCT02328872" },
    ],
  }),
];

const companies: CompanyInput[] = [
  grp({
    id: "anzgog", name: "Australia New Zealand Gynaecological Oncology Group", aka: ["ANZGOG", "WomenCan"],
    hq: "Camperdown, NSW", country: "AU", website: "https://www.anzgog.org.au",
    tldr: "The national trials group for gynaecological cancers in Australia and New Zealand, which co-led OUTBACK, the international trial that found adding chemotherapy after chemoradiation did not help women with cervical cancer.",
    summary: "ANZGOG describes itself as the peak national gynaecological cancer clinical trials organisation for Australia and New Zealand, conducting and promoting trials and multidisciplinary research into the causes, prevention and treatment of gynaecological cancers. It is based at Chris O'Brien Lifehouse in Camperdown, Sydney, and its fundraising arm is WomenCan. Its best-known result is OUTBACK (ANZGOG 0902, GOG-0274), run with NRG Oncology, which tested adjuvant carboplatin and paclitaxel after standard chemoradiation for locally advanced cervical cancer and found no survival benefit. It also runs Survivors Teaching Students, under licence from the US Ovarian Cancer Research Alliance, which brings survivors and carers into the classrooms of health professional students; ANZGOG reports that the programme has passed 20,000 students.",
    trials: ["outback"], keyPapers: ["paper-outback-lancet-oncol-2023"], cancers: ["cervical", "ovarian", "endometrial"], institutions: ["chris-obrien-lifehouse", "cancer-australia"], companies: ["nrg-oncology"], people: ["linda-mileshkin"],
    links: [{ label: "ANZGOG", url: "https://www.anzgog.org.au/" }, { label: "ANZGOG: Survivors Teaching Students", url: "https://www.anzgog.org.au/sts/" }],
  }),
  grp({
    id: "allg", name: "Australasian Leukaemia and Lymphoma Group", aka: ["ALLG"],
    hq: "Richmond, VIC", country: "AU", founded: 1973, website: "https://www.allg.org.au",
    tldr: "Since 1973 the not-for-profit group that designs and runs independent blood cancer trials across Australia and New Zealand, with more than 600 clinicians, scientists and support staff.",
    summary: "The ALLG states that it is the only not-for-profit collaborative clinical research group in Australia and New Zealand dedicated to designing and conducting independent clinical trials for blood cancers, providing the infrastructure and governance for more than 600 clinicians, scientists and support staff to run multi-site trials in leukaemia, lymphoma, myeloma and related diseases. Its purpose has been 'Better treatments... Better lives' since 1973. It is registered as an income tax exempt charity and works from Richmond, Melbourne.",
    cancers: ["aml", "cll", "multiple-myeloma"], institutions: ["peter-mac", "wehi", "cancer-australia"], people: ["andrew-wei", "john-seymour"],
    // TROG 99.03 is also ALLG NHLLOW5: ClinicalTrials.gov NCT00115700 lists the ALLG as collaborator and that id as its collaborative-group number.
    trials: ["trog-99-03"],
    links: [{ label: "ALLG: about us", url: "https://allg.org.au/about-us/" }, { label: "ClinicalTrials.gov NCT00115700 (TROG 99.03 / ALLG NHLLOW5)", url: "https://clinicaltrials.gov/study/NCT00115700" }],
  }),
];

const trials: TrialInput[] = [
  trial({
    id: "compass-cervical-hpv-screening", name: "Compass (primary HPV cervical screening trial)", aka: ["Compass", "ACTRN12613001207707"], nct: "NCT02328872",
    phase: "not-applicable", status: "active", setting: "Women aged 25 to 69 attending routine cervical screening in Victoria, Australia (25 to 64 in the pilot)",
    sponsor: "VCS Foundation (Australian Centre for the Prevention of Cervical Cancer), with the University of Sydney", enrolled: 76181, started: "2015-01", startedType: "actual",
    tldr: "An Australian randomised trial of five-yearly HPV testing against two-and-a-half-yearly cytology for cervical screening, in a country where many younger women had already been vaccinated. Its pilot found more precancer with HPV testing.",
    summary: "Compass randomises women attending routine cervical screening to five-yearly primary HPV testing or two-and-a-half-yearly liquid-based cytology, and is the first trial of HPV-based screening in a population already offered HPV vaccination. The registry lists 76,181 participants, a start in January 2015 and follow-up planned to 2037; it is active and no longer recruiting. The pilot phase, 4,995 women analysed from 47 Victorian practices, found high-grade precancer (CIN2+) in 1.0 to 1.2 percent of HPV-screened women against 0.1 percent with cytology, without a statistically significant rise in colposcopy referral, and its authors wrote that the findings gave initial support for HPV screening in vaccinated populations. Australia's National Cervical Screening Program moved to HPV testing every five years from December 2017.",
    result: "Pilot (PLoS Medicine 2017): CIN2+ detected in 20/1,992 (1.0%) and 24/2,008 (1.2%) of the two HPV-screened arms against 1/995 (0.1%) with cytology; referral 3.8% and 3.9% against 2.7%, not significantly different. The main trial is still in follow-up.",
    cancers: ["cervical"], technologies: ["hpv-vaccine"], institutions: ["acpcc"], people: ["karen-canfell"], keyPapers: ["paper-canfell-compass-pilot-plos-med-2017"], sections: ["prevention"],
    links: [{ label: "ClinicalTrials.gov NCT02328872", url: "https://clinicaltrials.gov/study/NCT02328872" }, doi("10.1371/journal.pmed.1002388", "Compass pilot results (PLoS Medicine 2017)")],
  }),
];

const papers: PaperInput[] = [
  paper({
    id: "paper-canfell-compass-pilot-plos-med-2017",
    name: "Cervical screening with primary HPV testing or cytology in a population of women in which those aged 33 years or younger had previously been offered HPV vaccination: results of the Compass pilot randomised trial",
    journal: "PLoS Medicine", year: 2017, doi: "10.1371/journal.pmed.1002388", pmid: "28926579",
    authors: "Canfell K, Caruana M, Gebski V, Darlington-Brown J, Heley S, Brotherton J, Gertig D, Jennett CJ, Farnsworth A, Tan J, Wrede CD, Castle PE, Saville M",
    paperType: "rct", participants: 4995,
    tldr: "The first randomised test of HPV-based cervical screening in a country that had already vaccinated its young women. HPV testing found more precancer than the smear test did.",
    summary: "Compass is an open-label randomised trial of five-yearly HPV screening against two-and-a-half-yearly liquid-based cytology. In its pilot, women aged 25 to 64 attending 47 primary care practices in Victoria between October 2013 and November 2014 were randomised 1:2:2 to cytology with HPV triage of low-grade results, HPV screening with cytology triage, or HPV screening with dual-stained cytology triage; in both HPV arms women positive for HPV16 or 18 went straight to colposcopy. By 2014 resident women aged 33 or younger had been age-eligible for HPV vaccination, with three-dose uptake of about 50 to 77 percent across cohorts.\n\nOf 4,995 women analysed, detected CIN2+ was 1/995 (0.1 percent) with cytology, 20/1,992 (1.0 percent) with HPV and cytology triage and 24/2,008 (1.2 percent) with HPV and dual-stain triage (p = 0.003 for cytology against HPV screening). Colposcopy referral was 2.7, 3.8 and 3.9 percent, a difference that was not statistically significant (p = 0.09).",
    findings: [
      "4,995 women analysed after 11 withdrawals, from 5,006 recruited at 47 practices in Victoria between 29 October 2013 and 7 November 2014.",
      "Detected CIN2+: 0.1% (1/995) with cytology, 1.0% (20/1,992) with HPV and cytology triage, 1.2% (24/2,008) with HPV and dual-stain triage; p = 0.003 for cytology against HPV screening.",
      "Colposcopy referral: 2.7%, 3.8% and 3.9%; p = 0.09.",
      "No serious trial-related adverse events.",
    ],
    whatItMeans: "It was early randomised evidence that HPV testing still finds more precancer than cytology once a population is partly vaccinated, the question Australia had to answer before changing its national programme to HPV testing every five years.",
    caveats: [
      "The authors note a relatively low-risk, previously well-screened population, unknown individual vaccination status, and no long-term follow-up yet of screen-negative women.",
      "This is the pilot; the main Compass trial of 76,181 women is still in follow-up.",
    ],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], trials: ["compass-cervical-hpv-screening"], institutions: ["acpcc"], people: ["karen-canfell"], sections: ["prevention"],
    links: [doi("10.1371/journal.pmed.1002388", "PLoS Medicine 2017"), pubmed("28926579")],
  }),
  paper({
    id: "paper-hall-cervical-elimination-australia-lancet-public-health-2019",
    name: "The projected timeframe until cervical cancer elimination in Australia: a modelling study",
    journal: "The Lancet Public Health", year: 2019, doi: "10.1016/S2468-2667(18)30183-X", pmid: "30291040",
    authors: "Hall MT, Simms KT, Lew JB, Smith MA, Brotherton JM, Saville M, Frazer IH, Canfell K",
    paperType: "methods",
    tldr: "A model of Australia's vaccination and screening programmes that projected cervical cancer falling below 4 cases per 100,000 women by about 2028, the threshold the national elimination strategy later adopted.",
    summary: "Australia introduced a national HPV vaccination programme in 2007, extended it to boys from 2013 and changed from the quadrivalent to the nonavalent vaccine from 2018; in December 2017 organised screening moved from two-yearly cytology to primary HPV testing every five years from 25 to 69, with exit testing at 70 to 74. The authors used Policy1-Cervix, a validated dynamic model of HPV vaccination, natural history and screening, to project age-standardised cervical cancer incidence, then about seven cases per 100,000 women, from 2015 to 2100.\n\nThey estimated incidence falling below six per 100,000 by 2020 (range 2018-22) and below four per 100,000 by 2028 (2021-35), and mortality below one death per 100,000 by 2034 (2025-47). Incidence would stay below one per 100,000 from 2066 if five-yearly screening continues in vaccinated cohorts, or below three if it does not. The exact year depends on the standard population, screening behaviour, test characteristics, herd effects from vaccinating boys and assumptions about hysterectomy.",
    findings: [
      "Projected incidence below 6 per 100,000 women by 2020 (2018-22) and below 4 per 100,000 by 2028 (2021-35).",
      "Projected mortality below 1 per 100,000 by 2034 (2025-47).",
      "From 2066 (2054-77) incidence below 1 per 100,000 if HPV screening continues in nonavalent-vaccinated cohorts, below 3 if those cohorts are not screened.",
    ],
    whatItMeans: "It put a projected date on elimination in Australia, which its authors called likely to be one of the first countries to reach these benchmarks, and the lower threshold it used, four cases per 100,000 women, is the one in the national strategy that aims for elimination by 2035.",
    caveats: [
      "A model, not an observation: the year depends on the population used for age-standardisation, screening behaviour, test performance, herd immunity from vaccinating men and the future frequency of benign hysterectomy.",
      "The authors stress that vaccination and screening must be maintained after the threshold is reached.",
    ],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], institutions: ["acpcc"], people: ["karen-canfell", "ian-frazer"], sections: ["prevention"],
    links: [doi("10.1016/S2468-2667(18)30183-X", "The Lancet Public Health 2019"), pubmed("30291040")],
  }),
  paper({
    id: "paper-zhou-hpv16-virus-like-particles-virology-1991",
    name: "Expression of vaccinia recombinant HPV 16 L1 and L2 ORF proteins in epithelial cells is sufficient for assembly of HPV virion-like particles",
    journal: "Virology", year: 1991, doi: "10.1016/0042-6822(91)90772-4", pmid: "1656586",
    authors: "Zhou J, Sun XY, Stenzel DJ, Frazer IH",
    paperType: "basic",
    tldr: "The Brisbane experiment in which Jian Zhou and Ian Frazer made empty shells of the HPV16 virus in cells. Virus-like particles of this kind are what HPV vaccines are made of.",
    summary: "Working at the Lions Human Immunology Laboratory at the Princess Alexandra Hospital in Brisbane, Jian Zhou, Ian Frazer and colleagues designed a recombinant vaccinia virus, pLC201VV, to express the two late (capsid) genes of HPV type 16, L1 and L2, together in epithelial cells. Cells making both proteins produced 40-nanometre virus-like particles with a density of 1.31 g/ml in their nuclei, while cells making either protein alone did not. Partly purified particles were made of capsomeres resembling those of HPV and contained glycosylated L1 capsid protein. The authors noted that particles made this way could be a safe source of material for developing a vaccine.",
    findings: [
      "Co-expression of HPV16 L1 and L2 in epithelial cells produced 40 nm virus-like particles in the nucleus; neither protein alone did.",
      "The particles had a density of 1.31 g/ml, consisted of HPV-like capsomeres and contained glycosylated L1.",
    ],
    whatItMeans: "Virus-like particles carry the shape of the virus without its DNA, so they can train the immune system without any risk of infection. That principle, worked on in parallel in the United States, is the basis of the HPV vaccines now given to adolescents in Australia's school programme.",
    caveats: [
      "This paper made particles from L1 and L2 together in a vaccinia system; the licensed vaccines use particles made from L1 alone, and several laboratories contributed to that step.",
    ],
    cancers: ["cervical"], technologies: ["hpv-vaccine"], drugs: ["gardasil-9"], institutions: ["uq-frazer-institute"], people: ["jian-zhou", "ian-frazer"], sections: ["prevention"],
    links: [doi("10.1016/0042-6822(91)90772-4", "Virology 1991"), pubmed("1656586")],
  }),
  paper({
    id: "paper-roberts-venetoclax-relapsed-cll-nejm-2016",
    name: "Targeting BCL2 with venetoclax in relapsed chronic lymphocytic leukemia",
    journal: "New England Journal of Medicine", year: 2016, doi: "10.1056/NEJMoa1513257", pmid: "26639348",
    authors: "Roberts AW, Davids MS, Pagel JM, Kahl BS, Puvvada SD, Gerecitano JF, Kipps TJ, Anderson MA, Brown JR, Gressick L, Wong S, Dunbar M, Zhu M, Desai MB, Cerri E, Heitner Enschede S, Humerickhouse RA, Wierda WG, Seymour JF",
    paperType: "translational", participants: 116,
    tldr: "The first-in-human study of venetoclax, the BCL-2 blocker that grew from a discovery at the Walter and Eliza Hall Institute in Melbourne. Four in five people with relapsed CLL responded.",
    summary: "A phase 1 dose-escalation study (NCT01328626) of daily oral venetoclax in relapsed or refractory chronic lymphocytic leukaemia or small lymphocytic lymphoma, led from the Royal Melbourne Hospital, the Walter and Eliza Hall Institute and Peter MacCallum Cancer Centre with AbbVie and Genentech. 56 patients received one of eight doses from 150 to 1,200 mg a day; 60 more were treated in an expansion cohort with a weekly stepwise ramp-up to 400 mg. Most had several previous treatments and 89 percent had poor prognostic clinical or genetic features.\n\nClinical tumour lysis syndrome occurred in 3 of 56 patients in dose escalation, with one death; after the ramp-up schedule was introduced it occurred in none of the 60 in the expansion cohort. 92 of 116 patients (79 percent) responded, including 71 to 79 percent in subgroups with fludarabine resistance, 17p deletion or unmutated IGHV; 20 percent had complete remission, 5 percent without minimal residual disease by flow cytometry. Estimated 15-month progression-free survival at 400 mg was 69 percent.",
    findings: [
      "Response in 92 of 116 patients (79%); 71% to 79% in fludarabine-resistant, 17p-deleted and IGHV-unmutated subgroups.",
      "Complete remission in 20%, including 5% with no minimal residual disease by flow cytometry.",
      "Clinical tumour lysis syndrome in 3 of 56 in dose escalation (one death), none of 60 after the weekly ramp-up.",
      "No maximum tolerated dose identified; 15-month progression-free survival estimate 69% at 400 mg.",
    ],
    whatItMeans: "It showed that blocking BCL-2 could clear chronic lymphocytic leukaemia that other drugs had not, and the ramp-up dosing it introduced to prevent tumour lysis is still how venetoclax is started.",
    caveats: [
      "Phase 1 and single-arm; the randomised evidence came later, in MURANO and CLL14.",
      "Funded by AbbVie and Genentech, with company employees among the authors.",
    ],
    cancers: ["cll"], drugs: ["venetoclax"], institutions: ["wehi", "peter-mac"], people: ["andrew-roberts", "john-seymour"], trials: ["murano"], sections: ["targeted-therapy"],
    links: [doi("10.1056/NEJMoa1513257", "NEJM 2016"), pubmed("26639348")],
  }),
];

export const recordsAU: EntityInput[] = [...institutions, ...companies, ...trials, ...papers];
