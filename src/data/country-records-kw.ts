import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Kuwait: the bodies and papers behind /countries/kw/ (wave 13) that the corpus did not hold. Written from sources
 * read raw on 16 November 2026: the registry's own 2012 paper (PDF text), KUNA's report of 31 August 2026 in the
 * Kuwait Times, the Kuwait Cancer Control Center's Strategic Plan 2019 to 2023 (PDF text), the children's hospital's
 * 2021 registry paper and the Palliative Care Center's 2021 paper (open full text through Europe PMC), an Arab Times
 * report of 7 April 2025, and the four papers' abstracts through Europe PMC and PubMed. The Kuwait Cancer Control
 * Center and the Ministry of Health already have records and are linked, not repeated. Coordinates are one
 * approximate point for the Shuwaikh medical area of Kuwait City, not building locations.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const APJCP_2012 = "https://koreascience.or.kr/article/JAKO201205061572208.pdf";
const KT_REGISTRY = "https://kuwaittimes.com/article/48953/kuwait/kuwait-health-min-establishes-epidemiology-cancer-registry-department-at-kccc/";
const KCCC_PLAN = "https://www.iccp-portal.org/system/files/plans/KWT_B5_s21_STRATEGICPLAN19editdfrdrkhld%202019_210816_132549.pdf";
const AT_PAEDIATRIC_2025 = "https://www.arabtimesonline.com/news/kuwaits-medical-progress-cuts-need-for-overseas-treatment-minister";
const CUREUS_2021 = "10.7759/cureus.13333";
const BMC_PALLIATIVE = "10.1186/s12904-021-00717-2";
const JONC_2019 = "10.1155/2019/8463195";
const SCIREP_2025 = "10.1038/s41598-025-91119-4";
const APJCP_2025 = "10.31557/apjcp.2025.26.3.861";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-kwt-2021-country-profile-en.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "kuwait-cancer-registry", name: "Kuwait Cancer Registry", aka: ["KCR", "Epidemiology and Cancer Registry Department, Kuwait Cancer Control Center", "Kuwait national cancer registry"],
    city: "Kuwait City", country: "KW", lat: 29.33, lng: 47.91, institutionType: "research-institute",
    tldr: "Kuwait's national cancer registry, in operation since 1971 and housed at the Kuwait Cancer Control Center. It records cancers in citizens and foreign residents, and IARC builds its national estimate for Kuwait from it.",
    summary: "A 2012 paper by registry staff describes the Kuwait Cancer Registry as a population-based register covering about three million Kuwaiti and non-Kuwaiti residents, established and in operation since 1971, a full member of the International Association of Cancer Registries, with notification of cancer compulsory by ministerial regulations and results published in Cancer Incidence in Five Continents since its fifth edition in 1990. Its sources are medical records and pathology reports from the Kuwait Cancer Control Center and other government and private hospitals, and mortality reports. The centre's Strategic Plan 2019 to 2023 lists the Cancer Registry among its technical departments. On 31 August 2026 KUNA reported a ministerial decision establishing an Epidemiology and Cancer Registry Department at the centre to build a national database on cancer incidence, mortality and survival. OnCo did not find the registry's annual reports online.",
    programs: ["National population-based cancer registration (since 1971)", "Epidemiology and Cancer Registry Department (from 2026)"],
    institutions: ["kuwait-cancer-control-center", "kuwait-ministry-of-health", "iarc"],
    keyPapers: ["paper-alawadhi-kuwait-survival-by-stage-j-oncol-2019", "paper-alawadhi-kuwait-progress-against-cancer-gjo-2023", "paper-nur-kuwait-colorectal-screening-cost-sci-rep-2025"],
    links: [
      { label: "El-Basmy et al., national cancer registry data 2000 to 2009 (Asian Pac J Cancer Prev 2012, PDF)", url: APJCP_2012 },
      { label: "Kuwait Times (KUNA): registry department established at the cancer centre (31 August 2026)", url: KT_REGISTRY },
      { label: "Kuwait Cancer Control Center: Strategic Plan 2019 to 2023 (PDF, ICCP portal)", url: KCCC_PLAN },
    ] }),

  i({ id: "nbk-specialized-hospital-for-children-kuwait", name: "National Bank of Kuwait Specialized Hospital for Children", aka: ["NBK Specialized Hospital for Children", "NBK Hospital", "National Bank of Kuwait Specialized Children's Hospital"],
    city: "Kuwait City", country: "KW", lat: 29.33, lng: 47.91, institutionType: "hospital",
    tldr: "The hospital in Kuwait's Sabah health area to which children with cancer are referred. It keeps a childhood cancer registry reaching back to 2004.",
    summary: "The hospital's 2021 paper describes it as the only hospital that manages paediatric cancer patients in Kuwait and says all paediatric cancer patients in the country are referred to it. Its childhood cancer registry, begun in May 2016, held 1,387 patients for 2004 to 2017; among the 1,009 files analysed, leukaemia (457), lymphoma (141) and brain tumours (92) were the commonest, and overall survival was around 80%. At a conference on 7 April 2025 reported by the Arab Times, the head of its Hematology, Pediatric Oncology and Stem Cell Transplantation Department described 64 beds, a 12-bed day ward and 1,154 admissions a year. OnCo has not read a page of the hospital's own.",
    programs: ["Paediatric haematology and oncology", "Stem cell transplantation", "Childhood cancer registry (2004 onwards)"],
    institutions: ["kuwait-ministry-of-health", "kuwait-cancer-control-center"],
    links: [
      doi(CUREUS_2021, "Bourusly et al., trends in childhood cancer in Kuwait, 2004 to 2017 registry (Cureus 2021)"),
      { label: "Arab Times: paediatric haematology and oncology conference (7 April 2025)", url: AT_PAEDIATRIC_2025 },
    ] }),

  i({ id: "palliative-care-center-kuwait", name: "Palliative Care Center, Kuwait", aka: ["PCC Kuwait", "Palliative Care Centre, Al-Sabah Medical Area"],
    city: "Kuwait City", country: "KW", lat: 29.33, lng: 47.91, institutionType: "hospital",
    tldr: "A specialised centre in the Al-Sabah Medical Area in Shuwaikh that treats pain and other symptoms in people with cancer. Its 2021 paper describes it as the only standalone palliative care building in Kuwait.",
    summary: "A 2021 paper from the centre describes it as a specialised tertiary medical centre focused on the complex symptoms and quality of life of cancer patients, and as the only available standalone building offering palliative care services in Kuwait. Reviewing cancer patients referred between January 2016 and December 2017, the paper reports that pain and other symptom scores fell after referral and that the share of patients with a negative pain management index fell from 25.4% before referral to 1.7% by day six. WHO's 2021 cervical cancer profile records that palliative care was not generally available in primary care facilities or in community and home-based care. The description is from 2021 and may not be current.",
    programs: ["Specialist palliative care for cancer", "Cancer pain management"],
    institutions: ["kuwait-cancer-control-center", "kuwait-ministry-of-health"],
    links: [
      doi(BMC_PALLIATIVE, "Opioid and adjuvant prescriptions before and after referral to the Palliative Care Center in Kuwait (BMC Palliat Care 2021)"),
      { label: "WHO: cervical cancer country profile, Kuwait (2021, PDF)", url: WHO_CERVICAL },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-alawadhi-kuwait-survival-by-stage-j-oncol-2019", name: "Cancer survival by stage at diagnosis in Kuwait, 2000 to 2013",
    journal: "Journal of Oncology", year: 2019, doi: JONC_2019, pmid: "31662756", authors: "Alawadhi E, Al-Awadi A, Elbasmi A, Coleman MP, Allemani C", paperType: "observational",
    tldr: "Among Kuwaiti citizens diagnosed from 2000 to 2013, 14.2% of cancers were found at a localised stage. Survival at each stage was similar to the United States, so later diagnosis is the likely reason overall survival was lower.",
    summary: "Published as \"Cancer Survival by Stage at Diagnosis in Kuwait: A Population-Based Study\". Kuwait Cancer Registry data for Kuwaiti patients diagnosed with one of 12 cancers during 2000 to 2013, followed to 31 December 2015, were used to describe stage at diagnosis (SEER Summary Stage) and to estimate age-standardised net survival by stage at one and five years.",
    findings: [
      "14.2% of patients were diagnosed at a localised stage and 38.9% at a regional stage.",
      "The share of patients with a known stage fell from 88.9% in 2000 to 2004 to 59.4% in 2010 to 2013.",
      "For patients diagnosed at a localised stage in 2005 to 2009, one-year and five-year net survival was about 90% or higher for colon, rectal, breast, cervical and prostate cancer.",
      "Five-year net survival for all stages combined was lower than in the United States for colon, lung and breast cancer, while stage-specific survival was similar.",
    ],
    whatItMeans: "The gap in survival between Kuwait and the United States in these years is explained more by how late cancers were found than by how they were treated once found, which is the case the authors make for early detection and public awareness.",
    caveats: ["Kuwaiti citizens only; foreign residents, who are most of the population, are not included.", "Stage was unknown for four in ten patients in the latest period, and these patients were diagnosed more than a decade ago."],
    institutions: ["kuwait-cancer-registry", "kuwait-cancer-control-center"], cancers: ["breast-cancer", "colorectal"],
    links: [doi(JONC_2019, "J Oncol 2019"), pubmed("31662756")] }),

  p({ id: "paper-alawadhi-kuwait-progress-against-cancer-gjo-2023", name: "Trends in cancer incidence, survival and mortality in Kuwaiti citizens, 2000 to 2013",
    journal: "The Gulf Journal of Oncology", year: 2023, pmid: "36804156", authors: "Alawadhi E, Al-Awadi A, Elbasmi A, Coleman MP, Allemani C", paperType: "observational",
    tldr: "Kuwait Cancer Registry data for citizens show breast cancer survival rising from 68.3% to 75.2% between 2000 to 2004 and 2010 to 2013 while its incidence also rose, and falling incidence of lung, cervical, ovarian and liver cancer.",
    summary: "Published as \"Progress Against Cancer in Kuwait: Trends in Incidence, Survival and Mortality\". World-standardised incidence and mortality rates and five-year net survival were calculated for Kuwaiti children and adults diagnosed with one of 18 common cancers during 2000 to 2013, with follow-up to 31 December 2015.",
    findings: [
      "Breast cancer: five-year net survival rose from 68.3% to 75.2%, while incidence rose from 45.6 to 58.7 and mortality from 5.8 to 12.8 per 100,000.",
      "Colon cancer: incidence rose from 11.4 to 12.6 and mortality from 2.3 to 5.4 per 100,000; five-year survival was 64.8% in 2000 to 2004, 50.2% in 2005 to 2009 and 58.5% in 2010 to 2013.",
      "Liver cancer: five-year net survival rose from 11.4% to 13.4% while incidence fell from 5.5 to 3.6 and mortality from 3.9 to 3.0 per 100,000.",
      "Incidence fell for cancers of the lung (10.2 to 7.4), cervix (4.9 to 2.4) and ovary (5.8 to 4.3 per 100,000), with survival and mortality stable.",
    ],
    whatItMeans: "Reading incidence, survival and mortality together shows where Kuwait gained ground in these years and where breast and colon cancer were becoming more common, which the authors link to rising obesity.",
    caveats: ["Kuwaiti citizens only, diagnosed up to 2013.", "Figures are from the abstract; the journal's full text was not read."],
    institutions: ["kuwait-cancer-registry", "kuwait-cancer-control-center"], cancers: ["breast-cancer", "colorectal", "hcc"],
    links: [pubmed("36804156")] }),

  p({ id: "paper-nur-kuwait-colorectal-screening-cost-sci-rep-2025", name: "Cost effectiveness of three colorectal cancer screening methods in Kuwait",
    journal: "Scientific Reports", year: 2025, doi: SCIREP_2025, pmid: "40025065", authors: "Nur AM, Aljunid SM, Tolma EL, et al.", paperType: "observational",
    tldr: "A decision model for Kuwait found that a stool blood test followed by colonoscopy or sigmoidoscopy cost less and gave more quality-adjusted life years than no screening, and more than colonoscopy or sigmoidoscopy alone.",
    summary: "Published as \"Cost effectiveness analysis of three colorectal cancer screening modalities in Kuwait\". A decision tree model from the perspective of the Kuwait Ministry of Health as payer compared a faecal occult blood test followed by colonoscopy or sigmoidoscopy, colonoscopy alone, sigmoidoscopy alone and no screening, over 10 years after diagnosis.",
    findings: [
      "Stool blood test followed by colonoscopy or sigmoidoscopy: 7.7 quality-adjusted life years at US$3,573; no screening: 7.2 at US$4,084.",
      "Sigmoidoscopy alone or colonoscopy alone: 6.8 quality-adjusted life years each, at US$4,905 and US$5,002.",
      "The paper cites Kuwait Cancer Registry data: 2,710 colorectal cancers from January 2010 to December 2019, about 10.2% of all cancers, and a rate of 13.2 per 100,000.",
    ],
    whatItMeans: "It gives Kuwait's health planners a local estimate in favour of a stool-test-first screening programme, and records that the reach of the Ministry's 2015 early diagnosis programme is not known.",
    caveats: ["A model, not a trial: it rests on several stated assumptions, such as an equal chance of each stage at diagnosis, and the cost of setting up a national programme was not included.", "Costs are from the provider's side only; costs to patients, such as travel and lost earnings, were left out."],
    institutions: ["kuwait-cancer-registry", "kuwait-ministry-of-health"], cancers: ["colorectal"],
    links: [doi(SCIREP_2025, "Sci Rep 2025"), pubmed("40025065")] }),

  p({ id: "paper-alawadhi-kuwait-cervical-screening-steps-apjcp-2025", name: "Uptake of cervical cancer screening among Kuwaiti women in the WHO STEPS survey",
    journal: "Asian Pacific Journal of Cancer Prevention", year: 2025, doi: APJCP_2025, pmid: "40156402", authors: "Alawadhi E, Albahar S, Tolma E, et al.", paperType: "observational", participants: 2292,
    tldr: "In a nationally representative survey carried out in 2014, 15.2% of Kuwaiti women aged 18 to 69 had ever been screened for cervical cancer, with lower uptake outside the Capital governorate.",
    summary: "Published as \"Disparities in the Uptake of Cervical Cancer Screening in Kuwait: A Cross-Sectional Analysis of the Nationwide WHO STEPS Survey\". Data for 2,292 women aged 18 to 69 from a representative Kuwaiti sample of 3,915 people, collected during 2014, were age-weighted and analysed with multivariable logistic regression.",
    findings: [
      "Weighted screening prevalence was 15.2% (95% confidence interval 13.7 to 16.7).",
      "Women aged 60 to 69 were four times as likely to have been screened as those aged 18 to 29; married, divorced or widowed, retired and more educated women had higher odds.",
      "Women living outside the Capital governorate had 60% lower odds of screening (odds ratio 0.4, 0.3 to 0.6).",
    ],
    whatItMeans: "Kuwait has no organised cervical screening programme, and this is the measure of what testing on request reaches. The authors call for an organised, physician-endorsed programme that fits Kuwait's cultural norms.",
    caveats: ["Kuwaiti citizens only.", "The survey data were collected in 2014, eleven years before the paper was published."],
    institutions: ["kuwait-ministry-of-health"], cancers: ["cervical"],
    links: [doi(APJCP_2025, "Asian Pac J Cancer Prev 2025"), pubmed("40156402")] }),
];

/** Records behind /countries/kw/ (wave 13). */
export const recordsKW: EntityInput[] = [...institutions, ...papers];
