import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Jamaica: the public bodies and papers behind /countries/jm/ (wave 16) that the corpus did not hold. Each was written
 * from a primary source read raw on 16 November 2026: the Ministry of Health's Strategic Plan and Action Plan for the
 * Prevention and Control of Cancer in Jamaica 2013 to 2018 (the copy in WHO's NCD document repository, PDF text), the
 * Food and Drugs Regulations, 1975 (PDF text), a Loop News report of May 2023 republished on the Ministry of Industry, Investment and Commerce's site, the Jamaica Information
 * Service report of October 2023, the University of the West Indies' Department of Pathology page, IAEA DIRAC's public
 * equipment data and a Gleaner report of 10 April 2023. The Ministry of Health and Wellness's own site refused
 * automated requests (HTTP 403) and was not read. DOIs and PubMed ids were resolved through Europe PMC and the figures
 * in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the registry, the National Health Fund and the public radiotherapy hospitals, and
 * each new record links back to an existing Jamaican record; the papers are linked through keyPapers.
 * Coordinates are approximate city points, or IAEA DIRAC's where it lists the centre, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const CANCER_PLAN = "https://extranet.who.int/ncdccs/Data/JAM_B5_NATIONAL%20CANCER%20STRATEGIC%20AND%20ACTION%20PLAN%20JAMAICA%20%20(2).pdf";
const FD_REGS = "https://globalfoodlaws.georgetown.edu/wp-content/uploads/2022/08/Jamaica_1975.08.04_Food-and-Drugs-Act-Regulations_EN.pdf";
const MIIC_SRD = "https://www.miic.gov.jm/health-ministrys-standards-regulation-division-now-iso-certified/";
const JIS_REGISTRY = "https://jis.gov.jm/cancer-registration-data-systems-being-strengthened/";
const UWI_PATHOLOGY = "https://www.mona.uwi.edu/pathology/jamaica-cancer-registry";
const DIRAC = { label: "IAEA DIRAC: radiotherapy equipment by centre", url: "https://dirac.iaea.org/Data/CountriesLight" };
const GLEANER_LINAC = "https://past.jamaica-gleaner.com/article/news/20230410/faulty-linear-accelerator-hampers-cancer-treatment-cornwall-regional-hospital";

const institutions: InstitutionInput[] = [
  i({ id: "mohw-jamaica", name: "Ministry of Health and Wellness, Jamaica", aka: ["MOHW", "Ministry of Health Jamaica", "Standards and Regulation Division"],
    city: "Kingston", country: "JM", lat: 18.0, lng: -76.79, institutionType: "government", website: "https://www.moh.gov.jm",
    tldr: "Jamaica's health ministry. It wrote the cancer plan for 2013 to 2018, registers medicines under the Food and Drugs Regulations, and in 2023 began moving cancer registration onto a national digital system.",
    summary: "The Ministry of Health wrote the Strategic Plan and Action Plan for the Prevention and Control of Cancer in Jamaica 2013 to 2018, which said that no national data on cancer incidence or outcome were available, that the Kingston and St Andrew registry covered 24% of the population, and that cobalt-60 radiotherapy was outdated; it proposed a national cancer registry, linear accelerators at Kingston Public Hospital and Cornwall Regional Hospital, mammography in the four regional hospitals and access to oral morphine. The Food and Drugs Regulations, 1975, require a drug to be registered with the Ministry before it is sold, made, imported or distributed, and a new drug to be licensed by the Minister. A Loop News report of May 2023, republished on the Ministry of Industry, Investment and Commerce's site, says the Ministry's Standards and Regulation Division had earned ISO 9001 certification for its product registration, import permit and health facilities registration processes, and quotes the Minister of State naming the Pharmaceutical and Regulatory Affairs Branch as where the public applies for them. In October 2023 the Ministry, with CARPHA and Vital Strategies, launched a project to register cancers across the Regional Health Authorities with an oncology module of the DHIS2 system. The Ministry's own website refused automated requests on 16 November 2026, so this record rests on those other documents. The coordinates are an approximate Kingston city point.",
    programs: ["Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018", "Standards and Regulation Division (product registration, import permits and health facilities registration)", "Cancer registration through the DHIS2 oncology module (project launched October 2023)", "HPV vaccination (introduced 2017)"],
    institutions: ["nhf-jamaica", "jamaica-cancer-registry", "kingston-public-hospital", "cornwall-regional-hospital", "st-josephs-hospital-jamaica", "who"],
    cancers: ["breast-cancer", "prostate", "cervical", "colorectal"],
    keyPapers: ["paper-reid-breast-cancer-mortality-jamaica-jcogo-2020", "paper-morrison-prostate-screening-jamaica-jce-2016"],
    links: [
      { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF, WHO repository copy)", url: CANCER_PLAN },
      { label: "The Food and Drugs Regulations, 1975 (consolidated copy, PDF)", url: FD_REGS },
      { label: "Loop News report on the Ministry of Industry, Investment and Commerce's site: Standards and Regulation Division now ISO certified (May 2023)", url: MIIC_SRD },
      { label: "Jamaica Information Service: cancer registration data systems being strengthened (October 2023)", url: JIS_REGISTRY },
      { label: "WHO: cervical cancer country profile, Jamaica (2021, PDF), for the year HPV vaccination began", url: "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-jam-2021-country-profile-en.pdf" },
    ] }),

  i({ id: "jamaica-cancer-registry", name: "Jamaica Cancer Registry", aka: ["JCR", "Kingston and St Andrew Cancer Registry", "UWI Cancer Registry"],
    city: "Kingston", country: "JM", lat: 18.005, lng: -76.745, institutionType: "research-institute", website: UWI_PATHOLOGY,
    tldr: "The cancer registry in the Department of Pathology at the University of the West Indies, Mona. It publishes cancer incidence for Kingston and St Andrew, which hold about a quarter of Jamaica's population, in five-year reports.",
    summary: "The University of the West Indies, Mona, lists the Jamaica Cancer Registry within the anatomical pathology section of its Department of Pathology. Its five-year reports of age-specific cancer incidence in Kingston and St Andrew are published in the West Indian Medical Journal; Europe PMC indexes reports for 1978 to 1982 through 2003 to 2007. The 2003 to 2007 report recorded 4,981 cancers, with age-standardised rates of 188.8 per 100,000 in males and 144.2 in females, and prostate and breast as the leading sites. The Ministry of Health's 2013 cancer plan said the registry's area held 24% of the population and that no national incidence data existed. The registry covers two parishes: IARC's GLOBOCAN 2024 fact sheet lists no national incidence data for Jamaica. The coordinates are an approximate point for the Mona campus.",
    programs: ["Five-year reports of cancer incidence in Kingston and St Andrew", "Site-specific incidence studies"],
    institutions: ["uwi-mona", "mohw-jamaica", "iarc"],
    cancers: ["prostate", "breast-cancer", "cervical", "colorectal"],
    keyPapers: ["paper-gibson-cancer-incidence-kingston-wimj-2010"],
    links: [
      { label: "UWI Mona: Department of Pathology, including the Jamaica Cancer Registry", url: UWI_PATHOLOGY },
      { label: "Gibson et al., cancer incidence in Kingston and St Andrew 2003 to 2007 (Europe PMC)", url: "https://europepmc.org/article/MED/21473389" },
      { label: "Ministry of Health: Strategic Plan and Action Plan for the Prevention and Control of Cancer 2013 to 2018 (PDF)", url: CANCER_PLAN },
    ] }),

  i({ id: "st-josephs-hospital-jamaica", name: "St. Joseph's Hospital (Kingston)", aka: ["St Joseph's Hospital Jamaica", "St. Joseph's Hospital, Deanery Road"],
    city: "Kingston", country: "JM", lat: 17.987, lng: -76.771, institutionType: "hospital",
    tldr: "A hospital on Deanery Road, Kingston, with one of the two linear accelerators that a 2023 newspaper report described as the public sector's machines for cancer treatment.",
    summary: "IAEA DIRAC lists St. Joseph's Hospital at 22 Deanery Road, Kingston, with one linear accelerator and a CT scanner (entry last updated 2025). On 10 April 2023 The Gleaner reported that Cornwall Regional Hospital and the Kingston-based St Joseph's Hospital housed the two linear accelerators available for cancer treatment in the public health sector, that staff said the machines had been out of service, and that the Minister of Health and Wellness said both had needed maintenance but were treating patients. OnCo found no later statement of whether the machine is in service. Coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC)"],
    institutions: ["kingston-public-hospital", "cornwall-regional-hospital", "mohw-jamaica", "iaea"],
    links: [DIRAC, { label: "The Gleaner: faulty linear accelerator hampers cancer treatment at Cornwall Regional Hospital (10 April 2023)", url: GLEANER_LINAC }] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-gibson-cancer-incidence-kingston-wimj-2010", name: "Age-specific incidence of cancer in Kingston and St. Andrew, Jamaica, 2003-2007",
    journal: "The West Indian Medical Journal", year: 2010, pmid: "21473389", authors: "Gibson TN, Hanchard B, Waugh N, et al.", paperType: "observational", participants: 4981,
    tldr: "The Jamaica Cancer Registry recorded 4,981 cancers in Kingston and St Andrew from 2003 to 2007, with overall rates almost unchanged from the previous five years and prostate and breast the leading sites.",
    summary: "The five-year report of the Jamaica Cancer Registry for Kingston and St Andrew, 2003 to 2007, published in the West Indian Medical Journal (volume 59, issue 5, pages 456 to 464). It gives age-standardised incidence by site and sex and compares each with the 1998 to 2002 report. The authors say the data support formal programmes for the prevention and control of breast and large bowel cancers, and that malignancies of unknown primary site were common in both sexes.",
    findings: ["4,981 cancers were recorded: 2,536 in males and 2,445 in females.", "Age-standardised rates were 188.8 per 100,000 a year in males and 144.2 in females, against 188.6 and 144.2 in 1998 to 2002.", "In males prostate cancer rose from 65.5 to 78.1 per 100,000 and colorectal cancer from 13.7 to 17.2, while cancer of the bronchus fell from 22.8 to 18.6.", "In females cervical cancer fell from 19 to 17.4 per 100,000, breast cancer was 40.1 then 43, and colorectal cancer 13 then 12.8."],
    whatItMeans: "These are counted cases, not estimates, but for Kingston and St Andrew only, and for years now two decades past.",
    caveats: ["Two parishes, about a quarter of Jamaica's population by the Ministry's 2013 figure; not a national rate.", "The abstract does not say how many cases were registered from a death certificate alone."],
    cancers: ["prostate", "breast-cancer", "cervical", "colorectal"], institutions: ["jamaica-cancer-registry"], links: [pubmed("21473389"), { label: "Europe PMC", url: "https://europepmc.org/article/MED/21473389" }] }),

  p({ id: "paper-reid-breast-cancer-mortality-jamaica-jcogo-2020", name: "Breast Cancer in Jamaica: Trends From 2010 to 2014-Is Mortality Increasing?",
    journal: "JCO Global Oncology", year: 2020, doi: "10.1200/GO.20.00022", pmid: "32552111", authors: "Reid S, Donaldson-Davis K, Willie-Tyndale D, et al.", paperType: "observational", participants: 1634,
    tldr: "Deaths registered across Jamaica from 2010 to 2014 included 1,634 from breast cancer in women, and the age-standardised death rate rose from 21.8 to 28 per 100,000 over the five years.",
    summary: "A cross-sectional analysis of breast cancer deaths in the records of the Registrar General's Department, the statutory body that registers all deaths in Jamaica, for 2010 to 2014. The difference between the 2010 and 2014 rates was not statistically significant on its own (P = .114), but the year-by-year annual percentage change showed a significant rising trend (P = .028). The authors call for a national organised breast screening programme and for research on the biology of breast cancer in young Jamaican women.",
    findings: ["1,634 breast cancer deaths in women, 24% of all female cancer deaths.", "Age-standardised mortality 21.8 per 100,000 in 2010 and 28 per 100,000 in 2014.", "Significant annual increases in the 35 to 44, 65 to 74 and 75 and over age groups (P = .04, .03 and .01)."],
    whatItMeans: "Breast cancer deaths in Jamaica were rising in the early 2010s, measured from death registration and not from a model.",
    caveats: ["Five years of data, ending in 2014.", "Death registration only: no stage, treatment or incidence data."],
    cancers: ["breast-cancer"], links: [doi("10.1200/GO.20.00022", "DOI"), pubmed("32552111")] }),

  p({ id: "paper-morrison-prostate-screening-jamaica-jce-2016", name: "Prostate Cancer Screening in Jamaica: Results of the Largest National Screening Clinic",
    journal: "Journal of Cancer Epidemiology", year: 2016, doi: "10.1155/2016/2606805", pmid: "27034668", authors: "Morrison BF, Aiken W, Mayhew R, et al.", paperType: "observational", participants: 1117,
    tldr: "Among 1,117 men screened for prostate cancer at the Jamaica Cancer Society from 1995 to 2005, most came once, fewer than two thirds of the biopsies requested were done, and 5.6% were found to have cancer.",
    summary: "A retrospective analysis of all men who presented for screening at the Jamaica Cancer Society, which the authors describe as the largest organised screening clinic in Jamaica, from 1995 to 2005. All had a digital rectal examination and a prostate specific antigen (PSA) test. The authors conclude that older men tend to screen, and that attendance for repeat visits and completion of confirmatory biopsies were low.",
    findings: ["1,117 men, mean age 59.9 years; median PSA 1.6 ng/mL.", "Most men presented for one screen only.", "Biopsies were requested at 11% of screening visits and 59% of those were done.", "5.6% of all men screened were found to have cancer; among the cancers, Gleason 6 was the commonest grade and the median PSA was 8.9 ng/mL."],
    whatItMeans: "A screening test helps only if the follow-up biopsy and repeat visits happen, and at this clinic many did not.",
    caveats: ["One clinic, 1995 to 2005; men who chose to attend, not a population sample.", "No information on treatment or survival."],
    cancers: ["prostate"], links: [doi("10.1155/2016/2606805", "DOI"), pubmed("27034668")] }),
];

/** Records behind /countries/jm/ (wave 16). */
export const recordsJM: EntityInput[] = [...institutions, ...papers];
