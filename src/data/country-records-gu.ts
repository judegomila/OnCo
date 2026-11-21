import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Guam: the public body and papers behind /countries/gu/ (wave 16) that the corpus did not hold. Written from sources
 * read raw on 16 November 2026: MACPAC's fact sheet "Medicaid and CHIP in Guam" (February 2021, PDF text), the Guam
 * Cancer Registry's fiscal year 2023 annual report (PDF text), and the Guam Comprehensive Cancer Control Plan 2018-2022
 * (PDF text, June 2017). DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed
 * abstracts.
 *
 * The Department's own programme pages redirected to its home page when the record was written, so it is written
 * from what those three documents say about it. On the second check on 16 November 2026 its pages for the
 * Comprehensive Cancer Control Program and for Medicare and Medicaid answered, in general terms only, and its
 * locations page gave 155 Hesler Place, Hagatna, for most of its offices. The coordinates are an approximate point
 * for Hagåtña, Guam's capital, not a geocoded address.
 *
 * Inbound links: the Department links the registry and the hospitals; the papers link the registry. The existing
 * Gopalani 2023 screening paper (country-records-pr.ts) is reused on the page, not duplicated.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MACPAC_GU = "https://www.macpac.gov/wp-content/uploads/2019/06/Medicaid-and-CHIP-in-Guam.pdf";
const GCR_ANNUAL_2023 = "https://www.uog.edu/_resources/images/orsp/gcr/GCR-FY-2023-Annual-Report.pdf";
const PLAN_2018 = "https://www.iccp-portal.org/system/files/plans/guam_ccc_plan-508.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "guam-dphss", name: "Guam Department of Public Health and Social Services", aka: ["DPHSS", "Guam DPHSS"],
    city: "Hagåtña", country: "GU", lat: 13.476, lng: 144.75, institutionType: "government", website: "https://dphss.guam.gov/",
    tldr: "Guam's health and welfare department. It runs Guam's Medicaid programme, the Comprehensive Cancer Control Program and the Breast and Cervical Cancer Early Detection Program, keeps death certificates, and is a partner in the Cancer Research Center of Guam.",
    summary: "MACPAC's February 2021 fact sheet says Guam created a Medicaid programme in 1975 and that the Department of Public Health and Social Services administers it; in June 2019 it covered 35,499 people, about one-fifth of the population, and enrollees can receive care outside the territory with prior authorisation when it is medically necessary and not provided in Guam. Federal Medicaid money for Guam is capped each year, and Congress set the federal match permanently at 83% in the Consolidated Appropriations Act, 2023.\n\nThe Department published the Guam Comprehensive Cancer Control Plan 2018-2022 with the Guam Comprehensive Cancer Control Coalition in June 2017; the plan calls itself the third for Guam and puts lung, breast, cervical and colorectal cancer first. The Guam Cancer Registry's annual report for fiscal year 2023 names the Comprehensive Cancer Control Program, non-communicable disease forums and the Guam Breast and Cervical Cancer Early Detection Program as the Department's, and says the Department's Office of Vital Statistics sends the registry death certificates each month. The Department is one of the three partners in the Cancer Research Center of Guam, with the University of Guam and the University of Hawai'i Cancer Center. The Department's own pages for the Comprehensive Cancer Control Program and for Medicare and Medicaid, read on 16 November 2026, describe the programmes in general terms and give no eligibility rules.",
    programs: ["Medicaid (since 1975)", "Guam Comprehensive Cancer Control Program", "Guam Breast and Cervical Cancer Early Detection Program", "Office of Vital Statistics"],
    institutions: ["guam-cancer-registry", "guam-memorial-hospital", "guam-regional-medical-city", "cms"],
    cancers: ["lung-cancer", "breast-cancer", "cervical", "colorectal"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-david-tobacco-tax-guam-cancer-registry-jcpo-2017", "paper-taafaki-trial-attitudes-guam-ijerph-2022"], links: [
      { label: "MACPAC: Medicaid and CHIP in Guam (February 2021, PDF)", url: MACPAC_GU },
      { label: "Guam Comprehensive Cancer Control Plan 2018-2022 (PDF, June 2017)", url: PLAN_2018 },
      { label: "Guam Cancer Registry: annual report, fiscal year 2023 (PDF)", url: GCR_ANNUAL_2023 },
      { label: "Guam Department of Public Health and Social Services", url: "https://dphss.guam.gov/" },
      { label: "Guam Department of Public Health and Social Services: Comprehensive Cancer Control Program", url: "https://dphss.guam.gov/dphss-programs/comprehensive-cancer-control-program" },
      { label: "Guam Department of Public Health and Social Services: Medicare and Medicaid", url: "https://dphss.guam.gov/services/medicaremedicaid" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-hernandez-cancer-guam-hawaii-canep-2017", name: "Cancer in Guam and Hawaii: a comparison of two US island populations",
    journal: "Cancer Epidemiology", year: 2017, doi: "10.1016/j.canep.2017.08.005", pmid: "29120826", authors: "Hernandez BY, Bordallo RA, Green MD, Haddock RL.", paperType: "observational",
    tldr: "Comparing the two islands' cancer registries for 2009 to 2013, the authors found lower overall cancer incidence in Guam than in Hawaii but higher cancer mortality among Guam's men, and several cancers diagnosed at younger ages in Guam.",
    summary: "Published as \"Cancer in Guam and Hawaii: A comparison of two U.S. Island populations\". Guam's cancer incidence and mortality were compared with Hawaii's using data from each island's population-based central cancer registry.",
    findings: [
      "In 2009 to 2013 overall cancer incidence was substantially lower in Guam than in Hawaii for both sexes, while overall cancer mortality was higher for Guam males.",
      "Cervical cancer incidence and prostate cancer mortality were higher in Guam.",
      "Incidence and mortality were higher among Guam men for cancers of the lung and bronchus, liver and intrahepatic bile duct, and nasopharynx, and Chamorro men were disproportionately affected.",
      "Guam patients were diagnosed at younger ages for cancers of the bladder, pancreas, colon and rectum, liver, lung, stomach, non-Hodgkin lymphoma and leukaemia.",
    ],
    whatItMeans: "Fewer cancers are diagnosed in Guam than in Hawaii, but men in Guam are more likely to die of cancer, and the authors point to smoking, infections and betel nut chewing as important contributors.",
    caveats: ["Diagnoses from 2009 to 2013.", "The abstract gives no rates; the figures are in the full paper."],
    institutions: ["guam-cancer-registry"], cancers: ["lung-cancer", "hcc", "cervical", "prostate", "breast-cancer"],
    links: [doi("10.1016/j.canep.2017.08.005", "Cancer Epidemiol 2017"), pubmed("29120826")] }),

  p({ id: "paper-david-tobacco-tax-guam-cancer-registry-jcpo-2017", name: "Tobacco tax revenues to fund the Guam Cancer Registry",
    journal: "Journal of Cancer Policy", year: 2017, doi: "10.1016/j.jcpo.2017.03.006", pmid: "29130031", authors: "David AM, Haddock RL, Bordallo R, Dirige JT, Mery L.", paperType: "observational",
    tldr: "Guam raised its tobacco taxes and earmarked a percentage of the revenue for its cancer registry, giving the registry a reliable funding stream while youth tobacco consumption fell.",
    summary: "Published as \"The use of tobacco tax revenues to fund the Guam Cancer Registry: A double win for cancer control\". The authors describe Guam, which they call an unincorporated Territory of the United States of America in the Western Pacific, enacting a bill that raised tobacco taxes and earmarked a percentage of the revenue for its cancer registry.",
    findings: [
      "The earmark provided a reliable funding stream for the registry, allowing continued staffing and capacity building.",
      "Youth tobacco consumption decreased following the tax increase.",
    ],
    whatItMeans: "Linking tobacco tax to registry funding lowers a cause of cancer and pays for counting cancer at the same time; the authors call it a feasible strategy with a double benefit.",
    caveats: ["A description of one territory's policy, not a controlled study.", "The abstract gives no figures for the size of the change in youth tobacco use."],
    institutions: ["guam-cancer-registry", "guam-dphss"], cancers: ["lung-cancer"], related: ["cancer-registries-surveillance"],
    links: [doi("10.1016/j.jcpo.2017.03.006", "J Cancer Policy 2017"), pubmed("29130031")] }),

  p({ id: "paper-badowski-early-onset-colorectal-guam-pmedr-2024", name: "Early-onset colorectal cancer incidence, screening and risk factors across Guam's ethnic groups",
    journal: "Preventive Medicine Reports", year: 2024, doi: "10.1016/j.pmedr.2024.102774", pmid: "38883927", authors: "Badowski G, Teria R, Nagata M, Legaspi J, Dulana LJB, Bordallo R, Hernandez BY.", paperType: "observational",
    tldr: "Using Guam Cancer Registry data for 1998 to 2020, the authors found colorectal cancer incidence roughly doubling between the 35 to 39 and 40 to 44 age groups and again by 45 to 49, with CHamorus affected at younger ages than Filipinos.",
    summary: "Published as \"Ethnic disparities in early-onset colorectal cancer incidence, screening rates and risk factors prevalence in Guam\". The study used the Guam Cancer Registry (1998 to 2020) and the Guam Behavioral Risk Factor Surveillance System (2018 to 2019), and describes colorectal cancer as one of the four most common cancers and the third leading cause of cancer death in Guam.",
    findings: [
      "The steepest increases in incidence were between ages 35 to 39 and 40 to 44 (incidence rate ratio 2.01, 95% CI 1.14 to 3.53) and between 40 to 44 and 45 to 49 (1.99, 1.34 to 2.97).",
      "CHamorus showed rate increases at younger ages than Filipinos.",
      "Screening prevalence and risk factors varied considerably among ethnic groups.",
    ],
    whatItMeans: "The authors say the findings support starting colorectal screening at 45 and efforts to raise screening in Guam.",
    caveats: ["One territory's registry; the abstract gives no case counts for the age and ethnic groups compared.", "Screening and risk factor data are self-reported survey answers."],
    institutions: ["guam-cancer-registry"], cancers: ["colorectal"],
    links: [doi("10.1016/j.pmedr.2024.102774", "Prev Med Rep 2024"), pubmed("38883927")] }),

  p({ id: "paper-taafaki-trial-attitudes-guam-ijerph-2022", name: "Guam residents' knowledge of and attitudes to cancer clinical trials",
    journal: "International Journal of Environmental Research and Public Health", year: 2022, doi: "10.3390/ijerph192315917", pmid: "36497991", authors: "Taafaki MR, Brown AC, Cassel KD, Chen JJ, Lim E, Paulino YC.", paperType: "observational",
    tldr: "In a telephone survey of 152 adults in Guam, about half had heard the term clinical trial, and 73.7% said they would take part in one if they had cancer.",
    summary: "Published as \"Knowledge and Attitudes of Guam Residents towards Cancer Clinical Trial Participation\". A telephone survey of Guam residents aged 18 and over was carried out before cancer clinical trials were implemented on the island; 47.0% of the 152 participants were CHamoru.",
    findings: [
      "53% had heard the term clinical trial; 73.7% would take part in a trial if they had cancer.",
      "59.9% believed they would receive good quality treatment from a trial offered in Guam.",
      "CHamoru respondents were more likely than White respondents to associate out-of-pocket expenses with trial participation (adjusted odds ratio 5.34, 95% CI 1.68 to 17.00).",
      "65.0% did not believe trial participants were 'guinea pigs'.",
    ],
    whatItMeans: "Knowledge of trials was limited but attitudes were mostly positive. The authors say future trials in Guam will benefit from identifying potential barriers to recruitment; in the survey, CHamoru respondents were more likely than White respondents to expect out-of-pocket costs.",
    caveats: ["152 respondents reached by telephone.", "Stated intentions, not actual enrolment."],
    institutions: ["fhp-health-center-guam", "hawaii-cancer-center"], cancers: [],
    links: [doi("10.3390/ijerph192315917", "Int J Environ Res Public Health 2022"), pubmed("36497991")] }),
];

export const recordsGU: EntityInput[] = [...institutions, ...papers];
