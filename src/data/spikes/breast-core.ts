import type { TermInput } from "@/lib/schema";
import type { Spike, SpikeSupplement } from "./index";

/**
 * BREAST CANCER: the family core layer (25 September 2026), written to the standard of the prostate, lung,
 * colorectal, pancreatic, gallbladder and triple-negative files. Breast cancer is the commonest cancer in the world
 * and in the UK: 2,434,087 new cases and 693,660 deaths a year (GLOBOCAN 2024), 59,413 UK cases and 11,200 UK deaths
 * a year (Cancer Research UK). Its 37 child pages were already deep. The family page was not, and a reader who has
 * just been telephoned lands on the family page first.
 *
 * This file owns three things and nothing else:
 *   1. the ROUTING, the "which page is mine" answer, written the way the prostate core layer wrote it;
 *   2. the SHARED story: what breast cancer is, how it is graded, how it is staged, and what the receptor tests
 *      actually measure, written once for everyone;
 *   3. the GLOSSARY the other three layers of this round will draw on.
 * It does not touch the surgery and radiotherapy spine (./breast-treatment.ts and its three trial files), the NHS
 * pathway and the screening programme (./breast-uk.ts), or the shared decisions and living with it
 * (./breast-living.ts and ../decision-tools/breast-surgery-choice.ts).
 *
 * ===================================================================================================================
 * THE TAXONOMY CALLS MADE IN THIS ROUND
 * ===================================================================================================================
 * The rule (docs/CANCER-PAGES.md): a cancer record is a WHO or PDQ tumour entity and carries a `parent`; a treatment
 * setting is never a record; a molecular subgroup is an entity only when a classification names it. Breast is the
 * family where the corpus's own history cuts across that rule, because the pages were built by receptor status years
 * before the rule existed. Five calls, in order.
 *
 *   1. NO NEW CANCER RECORD IS CREATED, AND NOTHING IS RE-PARENTED. The 37 descendants of `breast-cancer` already
 *      cover the WHO histological types, the three receptor subtypes, the in-situ precursors, the clinical entities
 *      (inflammatory, Paget), the one fibroepithelial tumour (phyllodes) and the states under each receptor page.
 *      The gap was signposting, not records. Receptor status is not a tumour type, but `breast-hr-positive`,
 *      `breast-her2-positive` and `tnbc` have long-standing pages and URLs, so they stay and are instead mapped:
 *      each gains, in this file, the words a reader is actually told on the telephone as aliases, and a note saying
 *      what the page is called on a pathology report.
 *
 *   2. THE MEDULLARY DUPLICATE IS FOLDED. The corpus held two full pages for one concept: `medullary-pattern-breast-
 *      carcinoma` (written by ./tnbc-core.ts, parent `tnbc`) and `breast-carcinoma-medullary-pattern` (written by
 *      ../cancers-wave4-breast.ts, parent `breast-cancer`). Both describe what the WHO fifth edition calls invasive
 *      breast carcinoma of no special type with a medullary pattern; both were written on 24 September 2026 by
 *      different layers; each validated on its own branch. The wave 4 record is removed and its two figures that the
 *      other did not carry (the Shiraz series and the Modern Pathology 2010 medullary-like definition) are moved onto
 *      the surviving record as a supplement from here, with the wave 4 aliases. The survivor is the TNBC one because
 *      its cohort is much larger (12,409 patients in 13 IBCSG trials, Huober 2012) and because the corpus's inbound
 *      links, including the TNBC history entry for the 2019 classification, already point at it.
 *
 *   3. GRADE, STAGE AND RECEPTOR STATUS GENERATE NO RECORDS, AND THE UK DATASET SAYS WHY THEY CANNOT SUBSTITUTE FOR
 *      EACH OTHER. "Grade 3 breast cancer" and "stage 2 breast cancer" are not diseases and get no page. The reason
 *      they are so routinely confused is that each answers a different question, and the Royal College of
 *      Pathologists dataset in force says so in its own words: the UICC TNM system "does not incorporate histological
 *      grade or receptor status", which is precisely why the Nottingham Prognostic Index and PREDICT exist (RCPath
 *      G148, version 3, November 2024). That sentence is the spine of the new `grade-stage-receptor-breast` term.
 *
 *   4. THE CLASSIFICATION IN FORCE CHANGED THIS YEAR, AND THE CORPUS HAD NOT NOTICED. Every breast page in the corpus
 *      cites the fifth edition of the WHO Classification of Tumours of the Breast (2019, read through Tan 2020).
 *      The sixth edition was published in April 2026 (Quinn et al., Histopathology 89(2):199 to 218). It is not a
 *      cosmetic change: it discourages the word "variant" for anything but a molecular alteration, separates
 *      "subtype" from "pattern", updates the HER2 reporting categories after DESTINY-Breast04 and 06 so that no
 *      membrane staining at all is distinguished from any membrane staining, abandons the unified neuroendocrine
 *      model the fifth edition imposed on the breast, and lowers malignant phyllodes tumour to four of the five
 *      adverse criteria. The UK reporting dataset in force is written against the fifth edition and is due for full
 *      review in November 2026, so a British report in 2026 is still a fifth-edition report. Both editions are
 *      recorded in the new `who-breast-classification` term and in the family history, and no page is rewritten to
 *      the sixth edition here, because the dataset the pathologist follows has not moved yet.
 *
 *   5. THE STAGING EDITION QUESTION HAS A PRECISE ANSWER, AND IT IS NOT THE AMERICAN ONE. UK breast reports stage
 *      against UICC TNM 8, which the RCPath dataset names and reprints as its appendix D, and that appendix warns
 *      in terms: "it is recommended to use UICC TNM 8 (not AJCC TNM 8) as there are significant differences between
 *      the two staging systems". The ninth edition was published on 3 July 2025 and UICC recommends it from
 *      1 January 2026; for breast "the classification remains unchanged", and the single change is a clarification of
 *      the post-treatment yp classification, which now asks that ypT be based on the largest continuous focus of
 *      residual invasive cancer and recommends reporting the residual cancer burden beside it (Brierley 2026).
 *      NICE NG101 names no TNM edition and no AJCC prognostic stage anywhere in its recommendations. The corpus's
 *      `breast-tnm8` staging table in ../staging.ts is therefore extended to the family page and its note corrected.
 *
 * ===================================================================================================================
 * WHAT WAS FOLDED OUT OF THE FAMILY RECORD (../cancer-parents-wave2.ts)
 * ===================================================================================================================
 * The record carried three one-line standard-of-care settings, seven history entries and four one-line open problems.
 * Following the lung review, the ones the child pages already say properly and at length are removed there rather
 * than left in both places, and every record they referenced is still reachable from what replaced them:
 *   - burden: "about 2.3 million new cases and 670,000 deaths a year" carried no source and contradicted the sourced
 *     GLOBOCAN 2024 figures already in ./tnbc-core.ts (2,434,087 and 693,660). The sourced figures win, here and in
 *     ./breast-hr-positive.ts, which repeated the unsourced pair.
 *   - burden: "in high-income countries about nine in ten women diagnosed are alive five years later" is true of the
 *     United States (91.9 percent, SEER 21, 2016 to 2022) and not of the UK, where the corpus's own figures are
 *     76.6 percent at ten years and 83.2 percent at five in Northern Ireland. Replaced by a sourced `prognosis`.
 *   - tldr: "70 percent / 15 percent / 15 percent" was presented as a partition of three, and the three overlap:
 *     hormone receptor-positive HER2-positive disease is in two of the boxes at once. Replaced by the four boxes one
 *     report actually produces (SEER 21, 2019 to 2023).
 *   - history: the 1977 tamoxifen, 1998 trastuzumab, 2015 CDK4/6 and 2022 DESTINY-Breast04 entries are written on
 *     ./breast-hr-positive.ts (1977, 2015, 2022), ./breast-her2-positive.ts (1998) and ../breast-subtypes.ts
 *     (1998, 2022) with their trials and their refs. Removed from the family record; the classification timeline that
 *     belongs to the family page is added here instead.
 *   - standardOfCare: the "Screening" one-liner ("every one to three years from around age 40 to 50 depending on
 *     country; MRI for high-risk women") is a strictly weaker duplicate of the screening rows in ./tnbc-core.ts and
 *     ./tnbc-uk.ts and of the NHS screening programme layer in ./breast-uk.ts. Removed. The surgery row and the
 *     DCIS row are left untouched for ./breast-treatment.ts and the DCIS page, and two rows this layer owns are
 *     added.
 *   - openProblems: all four ("metastatic disease remains incurable", "triple-negative and inflammatory have the
 *     worst outlook", "overdiagnosis from screening", "survival gaps") are said with their figures on the child pages
 *     and in the `health-disparities` term. Replaced by four problems that are the family's own and are sourced.
 *
 * ===================================================================================================================
 * WHAT ALREADY EXISTS AND IS LINKED RATHER THAN REWRITTEN
 * ===================================================================================================================
 * ./tnbc-core.ts owns the TNM 8 T and N categories in prose, the `ajcc-prognostic-stage-breast` term, the
 * `er-pr-negative-threshold` term (the 1 percent rule and ER-low), `her2-low-and-trop2-adc-eligibility-tnbc`,
 * `basal-like`, `ki-67-in-tnbc`, `interval-breast-cancer` and `health-disparities`. ../breast-subtypes.ts owns
 * HER2-low and ultralow. The glossary already holds `hormone-receptor-status`, `her2-positive`, `her2-low`,
 * `tumour-grade`, `grade-vs-stage`, `cancer-stage`, `tnm-staging`, `carcinoma-in-situ`, `dcis`,
 * `lymphovascular-invasion`, `core-needle-biopsy`, `sentinel-lymph-node-biopsy`, `ihc`, `fish`, `pcr` and `rcb`.
 * Those are supplemented, not duplicated: the ten terms written here are the ten things none of them says.
 *
 *   records patched      breast-cancer (routing, what it is, basics, staging, outlook, prognosis, FAQ),
 *                        breast-hr-positive / breast-her2-positive / tnbc (report vocabulary and routing aliases),
 *                        ductal-carcinoma-in-situ, lobular-carcinoma-in-situ,
 *                        invasive-breast-carcinoma-no-special-type (routing aliases and one note each)
 *   records created      none
 *   records removed      breast-carcinoma-medullary-pattern (duplicate of medullary-pattern-breast-carcinoma)
 *   terms                terminal-duct-lobular-unit, who-breast-classification, nottingham-grade,
 *                        nottingham-prognostic-index, tnm-breast-cancer-editions, grade-stage-receptor-breast,
 *                        er-pr-scoring-breast, her2-testing-uk-breast, receptor-conversion-breast,
 *                        breast-tumour-size-on-the-report
 *   supplements          medullary-pattern-breast-carcinoma, hormone-receptor-status, her2-positive, her2-low,
 *                        tumour-grade, grade-vs-stage, er-pr-negative-threshold, ajcc-prognostic-stage-breast,
 *                        carcinoma-in-situ, rcb
 *   side data edited     ../staging.ts (breast-tnm8 reaches the family page; the UICC-not-AJCC warning and the
 *                        ninth edition's yp clarification added to its note)
 *
 * Every figure is quoted from the page or document named beside it: the RCPath dataset read from the published PDF,
 * NICE NG101 and CG81 read from their recommendation pages with the numbers checked, the TNM ninth edition read
 * through the UICC committee's own paper, the WHO sixth edition read through its own editorial board's paper,
 * SEER Cancer Stat Facts, Cancer Research UK, GLOBOCAN 2024, and the Nottingham papers read through Europe PMC.
 * Nothing is inferred and nothing is recalled.
 */
const asOf = "2026-09-25";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

const SRC = {
  g148: { label: "Royal College of Pathologists G148: dataset for histopathological reporting of breast disease in surgical excision specimens of breast cancer, version 3, November 2024 (full review due November 2026)", url: "https://www.rcpath.org/resourceLibrary/g148-dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.html" },
  ng101: { label: "NICE NG101: early and locally advanced breast cancer, diagnosis and management (published 18 July 2018, last updated 14 April 2025)", url: "https://www.nice.org.uk/guidance/ng101/chapter/recommendations" },
  cg81: { label: "NICE CG81: advanced breast cancer, diagnosis and treatment, diagnosis and assessment section (published 23 February 2009, last updated 30 June 2026)", url: "https://www.nice.org.uk/guidance/cg81/chapter/Diagnosis-and-assessment" },
  tnm9: doi("Brierley et al., International Journal of Cancer 2026: the 9th edition of the UICC TNM classification of malignant tumours, updates and rationale for change (breast: the classification remains unchanged, the yp classification is clarified)", "10.1002/ijc.70561"),
  uicc: { label: "UICC: TNM Classification of Malignant Tumours, 9th edition, recommended to take effect from 1 January 2026", url: "https://www.uicc.org/what-we-do/sharing-knowledge/tnm" },
  who6: doi("Quinn et al., Histopathology 2026;89(2):199 to 218: World Health Organization classification of tumours of the breast, 6th edition 2026", "10.1111/his.70149"),
  who5: doi("Tan et al., Histopathology 2020: the 2019 WHO classification of tumours of the breast (5th edition)", "10.1111/his.14091"),
  elston1991: doi("Elston and Ellis, Histopathology 1991;19:403 to 410: pathological prognostic factors in breast cancer, the value of histological grade, with long-term follow-up of 1,831 graded patients", "10.1111/j.1365-2559.1991.tb00229.x"),
  galea1992: doi("Galea, Blamey, Elston and Ellis, Breast Cancer Research and Treatment 1992;22:207 to 219: the Nottingham Prognostic Index in primary breast cancer", "10.1007/bf01840834"),
  allison2020: doi("Allison et al., Journal of Clinical Oncology 2020;38:1346 to 1366: oestrogen and progesterone receptor testing in breast cancer, ASCO/CAP guideline update", "10.1200/jco.19.02309"),
  rakha2023: doi("Rakha et al., Journal of Clinical Pathology 2023;76:217 to 227: UK recommendations for HER2 assessment in breast cancer, an update", "10.1136/jcp-2022-208632"),
  schrijver2018: doi("Schrijver et al., Journal of the National Cancer Institute 2018: receptor conversion in distant breast cancer metastases, a systematic review and meta-analysis of 39 studies", "10.1093/jnci/djx273"),
  seerSubtypes: { label: "SEER Cancer Stat Facts: female breast cancer subtypes (share of cases and five-year relative survival by receptor subtype and stage, SEER 21)", url: "https://seer.cancer.gov/statfacts/html/breast-subtypes.html" },
  seerBreast: { label: "SEER Cancer Stat Facts: female breast cancer (incidence, stage distribution and survival)", url: "https://seer.cancer.gov/statfacts/html/breast.html" },
  globocan: { label: "GLOBOCAN breast fact sheet (IARC Global Cancer Observatory, 2024 estimates)", url: "https://gco.iarc.who.int/media/globocan/factsheets/cancers/20-breast-fact-sheet.pdf" },
  cruk: { label: "Cancer Research UK: breast cancer statistics (UK incidence, mortality, survival, stage at diagnosis and routes to diagnosis)", url: "https://www.cancerresearchuk.org/health-professional/cancer-statistics/statistics-by-cancer-type/breast-cancer" },
  crukTypes: { label: "Cancer Research UK: types of breast cancer", url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/types" },
  nhsSymptoms: { label: "NHS: breast cancer in women, symptoms", url: "https://www.nhs.uk/conditions/breast-cancer/symptoms/" },
};

// ======================= TERMS =======================
/** The ten things the breast glossary did not say, written once for the whole family. */
export const breastCoreTerms: TermInput[] = [
  { id: "terminal-duct-lobular-unit", kind: "term", asOf: "2026-11-10", name: "Ducts, lobules and the terminal duct lobular unit", category: "Anatomy", wikipedia: W("Terminal_duct_lobular_unit"),
    aka: ["terminal duct lobular unit", "TDLU", "ducts and lobules", "milk ducts", "lobule", "breast lobule", "breast duct", "ductal", "lobular", "breast anatomy", "mammary gland"],
    tldr: "Breast ducts connect to milk-producing acini, with supporting tissues around them. This anatomy helps interpret a sample but does not by itself establish cancer.",
    summary: "The breast contains an interconnected duct-lobular epithelial system within connective and fatty tissue. A terminal duct with its associated acini forms a terminal duct lobular unit. Tissue compartments and their proportions matter when interpreting imaging, microscopy or bulk molecular measurements. Histological diagnosis, grade, receptor status and disease extent require their own evidence.\n\nNCI DCEG describes the TDLU as the origin of most breast cancer precursors and cancers. The names ductal and lobular are diagnostic morphology, not proof of an exact ancestral cell. Characteristic loss of E-cadherin in invasive lobular carcinoma reduces cell adhesion; diffuse growth in unconnected lines can make a lesion harder to feel or detect on imaging. The SEER description concerns this growth pattern rather than a universal test result for every lobular tumour.\n\nMale breasts have ducts and may have lobules, but far fewer than female breasts; NCI describes lobular cancer as rare in men. Breast tissue and mammographic density change over life. Greater density is associated with higher breast-cancer risk and can obscure cancers on a mammogram; increasing age and childbearing are associated with lower density, alongside other influences. Mammographic density, TDLU involution and histological diagnosis are different observations.",
    cancers: ["breast-cancer", "invasive-breast-carcinoma-no-special-type", "invasive-lobular-carcinoma", "male-breast-cancer"],
    terms: ["who-breast-classification", "carcinoma-in-situ", "lymph-node-status"],
    related: [
  "carcinoma-in-situ",
  "lymph-node-status",
  "mammography",
  "sentinel-lymph-node-biopsy",
  "myoepithelial-cells-and-basement-membrane",
  "lymphatic-drainage-and-axilla"
],
    sections: ["diagnostics"],
    links: [
  {
    "label": "Tan et al., Histopathology 2020: the 2019 WHO classification of tumours of the breast (5th edition)",
    "url": "https://doi.org/10.1111/his.14091"
  },
  {
    "label": "Cancer Research UK: types of breast cancer",
    "url": "https://www.cancerresearchuk.org/about-cancer/breast-cancer/types"
  },
  {
    "label": "Royal College of Pathologists G148: dataset for histopathological reporting of breast disease in surgical excision specimens of breast cancer, version 3, November 2024 (full review due November 2026)",
    "url": "https://www.rcpath.org/resourceLibrary/g148-dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.html"
  },
  {
    "label": "UBC pathology: Cytodiagnosis of Breast Lesions, normal breast histology, page 22",
    "url": "https://file.pathology.ubc.ca/BreastCytoBook.pdf"
  },
  {
    "label": "NCI DCEG: terminal duct lobular unit involution",
    "url": "https://dceg.cancer.gov/research/cancer-types/breast-cancer/tdlu-involution-with-komen"
  },
  {
    "label": "NCI SEER mammary gland anatomy",
    "url": "https://training.seer.cancer.gov/anatomy/reproductive/female/glands.html"
  },
  {
    "label": "A spatially resolved single-cell genomic atlas of the adult human breast.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/37380767/"
  },
  {
    "label": "Normal and tumor-derived myoepithelial cells differ in their ability to interact with luminal breast epithelial cells for polarity and basement membrane deposition.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11801722/"
  },
  {
    "label": "NCI DCIS: ductal boundary and invasion",
    "url": "https://www.cancer.gov/types/breast/breast-cancer-types/dcis"
  },
  {
    "label": "NCI male breast cancer anatomy",
    "url": "https://www.cancer.gov/types/breast/male-breast-cancer"
  },
  {
    "label": "NCI dense breasts",
    "url": "https://www.cancer.gov/types/breast/screening/dense-breasts"
  },
  {
    "label": "SEER invasive lobular carcinoma",
    "url": "https://seer.cancer.gov/statfacts/html/ilc.html"
  }
],

"notes": [
  "The terminal duct lobular unit contains a terminal duct and its associated acini. Acini make milk during lactation; ducts carry it towards the nipple. Lobules and larger lobes are different levels of organisation. Their size and abundance vary with physiology and life stage; an illustrative branch count is not a fixed anatomical count. A schematic grouping bracket is an annotation, not a tissue capsule or basement membrane. NCI DCEG describes TDLU involution with physiological ageing and completion of childbearing as reductions in acini per unit and total unit counts. This is an observational normal-tissue description, not a diagnostic rule for an individual.",
  "From a typical normal acinus lumen outward, distinguish luminal epithelial cells, living myoepithelial cells, extracellular basement membrane and surrounding stroma. Stroma includes connective tissue, fat, vessels and immune cells. A basement membrane is neither a cell layer nor the plasma membrane around one cell.",
  "An epithelial marker or abundant epithelial RNA can come from normal epithelium. A sample richer in glands and poorer in stroma can change a bulk measurement without a change within either cell type. Imaging, tissue morphology and protein staining observe different scales; a normal-breast atlas is a reference, not a stand-alone cancer diagnosis.",
  "A quadrant or clock position locates a lesion. It does not identify its ancestral cell, receptor class or invasiveness. Likewise, ductal and lobular diagnostic names do not prove the precise ancestral location, and anatomical luminal position does not assign a molecular luminal subtype. A milk-flow diagram is not a cancer-progression sequence.",
  "Ducts are epithelium-lined channels connected to milk-producing acini in lobules. The TDLU is a tissue unit, not one cell or a molecular subtype. Epithelial tissue can be normal, in situ or invasive: DCIS remains within the ductal boundary, whereas invasion enters surrounding tissue. In a fictional bulk assay, abundant epithelial RNA cannot establish invasion; that distinction needs tissue organisation, not simply epithelial abundance.",
  "Milk ducts and lymphatic drainage are different networks. A quadrant or clock address supplies neither a drainage map nor lineage. Normal-anatomy drawings simplify scale, cell counts and branching; selected source text and captions support the arrangement illustrated, not a diagnosis or a universal number of cells."
]
},

  { id: "who-breast-classification", kind: "term", asOf, name: "The WHO classification of breast tumours, and what the 6th edition changed", category: "Pathology", wikipedia: W("WHO_Blue_Books"),
    aka: ["WHO classification of tumours of the breast", "WHO breast classification", "WHO 5th edition breast", "WHO 6th edition breast", "blue book", "WHO blue book breast", "breast tumour classification", "special type", "no special type", "NST"],
    tldr: "The book that decides what a breast tumour is called. Its fifth edition (2019) is the one UK reports are written against in 2026; its sixth edition was set out in April 2026, in the editorial board's own summary of it, and changed the vocabulary, the HER2 reporting categories and the rules for several rare types.",
    summary: "The WHO Classification of Tumours of the Breast is the reference every pathology report, guideline and trial protocol implicitly cites when it names a tumour. The fifth edition (2019, summarised for pathologists by Tan 2020) is the edition the UK reporting dataset in force is written against: it keeps invasive breast carcinoma of no special type as the large default group, into which it folded the former medullary, oncocytic, lipid-rich, glycogen-rich, sebaceous and pleomorphic carcinomas as patterns rather than types, and it keeps the special types, lobular, tubular, mucinous, cribriform, papillary, secretory, adenoid cystic, apocrine, micropapillary, metaplastic and neuroendocrine, as separate entities. Nearly every breast page here is written to that edition.\n\nThe sixth edition was published in April 2026 (Quinn 2026). Five of its changes matter to a reader holding a report. It fixes the vocabulary: a subtype differs clinically, histologically or genetically in a way that changes treatment or outcome, a pattern differs only in appearance, and the word variant is discouraged for anything but a molecular or genetic alteration, so a report or a website using variant to mean an unusual appearance is using the older, looser sense. It updates the HER2 reporting categories after the DESTINY-Breast04 and DESTINY-Breast06 trials, so that cases with no membrane staining at all are distinguished from cases with any membrane staining, because that boundary now decides who is offered trastuzumab deruxtecan. It recognises invasive lobular carcinoma with extracellular mucin as an emerging subtype that behaves more aggressively than classical lobular cancer. It moves mucinous carcinomas that are high grade, oestrogen receptor negative or HER2 positive out of mucinous carcinoma and into carcinoma of no special type with mucin production. It abandons the unified neuroendocrine neoplasm model the fifth edition applied across organs, on the ground that it is difficult to apply to the breast, and stops recommending routine neuroendocrine staining of ordinary carcinoma. And it lowers the bar for malignant phyllodes tumour from all five adverse histological features to four of the five.\n\nNone of that has reached a British report yet. The Royal College of Pathologists dataset in force (G148, version 3, November 2024) states that its histological subtypes were updated in line with the fifth edition, and it is due for full review in November 2026. So in 2026 a UK report is a fifth-edition report, and the sixth edition is what the next one will be written against.",
    cancers: ["breast-cancer", "invasive-breast-carcinoma-no-special-type", "invasive-lobular-carcinoma", "mucinous-carcinoma-breast", "phyllodes-tumour", "neuroendocrine-neoplasms-breast", "medullary-pattern-breast-carcinoma"],
    terms: ["terminal-duct-lobular-unit", "nottingham-grade", "her2-testing-uk-breast", "her2-low"],
    related: ["histology", "tumour-differentiation", "her2-low", "basal-like"],
    sections: ["diagnostics"],
    links: [SRC.who6, SRC.who5, SRC.g148],
    notes: ["Why the corpus still cites the fifth edition. The pages in this family were written against the edition the pathologist follows, not the newest one published. Where the sixth edition changes a name or a rule, this term records the change and the page it affects keeps the fifth-edition wording until the UK dataset moves, so that the page and the report in the reader's hand agree."],
  },

  { id: "nottingham-grade", kind: "term", asOf: "2026-11-10", name: "Nottingham grade (breast cancer grade 1, 2 and 3)", category: "Pathology", wikipedia: W("Breast_cancer_classification"),
    aka: ["Nottingham grade", "Nottingham grading system", "Nottingham histological grade", "Elston-Ellis grade", "Elston and Ellis", "Bloom-Richardson", "Bloom and Richardson", "Scarff-Bloom-Richardson", "SBR grade", "breast cancer grade", "grade 1 breast cancer", "grade 2 breast cancer", "grade 3 breast cancer", "tubule formation", "nuclear pleomorphism", "mitotic count", "histological grade breast"],
    tldr: "Nottingham grade combines three microscopic feature scores into grade 1, 2 or 3. It describes invasive breast tissue and does not by itself establish disease extent.",
    summary: "Nottingham histological grade combines tubule formation, nuclear pleomorphism and mitotic activity, each scored from 1 to 3. Totals 3 to 5 are grade 1, 6 to 7 grade 2 and 8 to 9 grade 3. CAP records component scores and the overall grade when grading is applicable; its template excludes microinvasion-only cases from grading. Mitotic assessment depends on a defined observation area and microscope calibration. In Elston and Ellis' 1991 Nottingham/Tenovus study, 1,831 of more than 2,200 patients with primary operable breast cancer were graded; grade 1 had better survival than grades 2 and 3 (P less than 0.0001). This observational prognostic evidence does not turn grade into stage or a treatment-benefit estimate.",
    cancers: ["breast-cancer", "invasive-breast-carcinoma-no-special-type", "invasive-lobular-carcinoma", "tnbc", "breast-hr-positive"],
    terms: ["nottingham-prognostic-index", "grade-stage-receptor-breast", "tumour-grade", "breast-tumour-size-on-the-report", "who-breast-classification"],
    related: ["tumour-grade", "grade-vs-stage", "tumour-differentiation", "digital-pathology-ai"],
    sections: ["diagnostics"],
    links: [
  {
    "label": "Royal College of Pathologists G148: dataset for histopathological reporting of breast disease in surgical excision specimens of breast cancer, version 3, November 2024 (full review due November 2026)",
    "url": "https://www.rcpath.org/resourceLibrary/g148-dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.html"
  },
  {
    "label": "Elston and Ellis, Histopathology 1991;19:403 to 410: pathological prognostic factors in breast cancer, the value of histological grade, with long-term follow-up of 1,831 graded patients",
    "url": "https://doi.org/10.1111/j.1365-2559.1991.tb00229.x"
  },
  {
    "label": "Tan et al., Histopathology 2020: the 2019 WHO classification of tumours of the breast (5th edition)",
    "url": "https://doi.org/10.1111/his.14091"
  },
  {
    "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
    "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
  },
  {
    "label": "NCI tumour grade",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-grade"
  },
  {
    "label": "NCI professional PDQ: AJCC eighth-edition breast staging tables",
    "url": "https://www.cancer.gov/types/breast/hp/breast-treatment-pdq"
  }
],
    notes: [
  "Grade is not the grade of a side effect. A treatment side effect is also given a grade, from 1 to 5, on a completely separate scale (see `toxicity-grade`). A grade 3 cancer and a grade 3 side effect have nothing to do with each other.",
  "Nottingham grading of invasive breast carcinoma combines tubule formation, nuclear pleomorphism and recognisable mitotic figures. Each receives 1 to 3 points: totals 3 to 5 give grade 1, 6 to 7 grade 2, and 8 to 9 grade 3. Thus assigned components 2, 3 and 3 sum to 8, grade 3; the sum is not a percentage.",
  "Mitotic scoring uses ten consecutive high-power fields in the most mitotically active region, with field size calibrated for the microscope. Count recognisable division, excluding dark, fragmented or apoptotic nuclei. Equal raw counts over different observation areas need not receive the same score. Ki-67 staining does not replace the mitotic component.",
  "Histological type describes morphology, grade scores microscopic features, and anatomical stage describes extent. Grade 3 does not mean stage III, low grade does not mean benign, and invasive Nottingham grading differs from DCIS nuclear grading. Grade can contribute to prognostic staging without becoming another measure of spread.",
  "Retain the biopsy or resection, tissue region and treatment time point when comparing grades. Heterogeneity, limited tissue and treatment effects can restrict comparison. One section does not represent every tumour region, and grade alone supplies neither nodal/distant status nor a personal treatment-benefit estimate.",
  "A nucleus contains a cell's genetic material. Nuclear pleomorphism means variation in nuclear size and appearance; a mitotic figure is a cell visibly dividing. These microscopic observations differ from Ki-67 protein staining, and a dark or dying nucleus should not simply be counted as division.",
  "In CAP 4.11, tubule-formation scores 1, 2 and 3 correspond to greater than 75%, 10 to 75%, and less than 10% of tumour area forming glandular or tubular structures. Its nuclear descriptors compare with benign epithelial nuclei, alongside chromatin, nucleoli and variation in size and shape; a red-blood-cell diameter is not the comparator in that template. The reporting template marks microinvasion-only cases as not graded.",
  "RCPath's November 2024 G148 dataset specifies the Nottingham method and recording its individual components for audit. It describes approximate grade 1:2:3 distributions of 2:3:5 in symptomatic and 3:5:2 in screen-detected cancers, as audit context rather than diagnostic quotas. It reports about 70% agreement between core-biopsy and corresponding surgical grades. Tubule assessment covers the tumour overall, while pleomorphism and mitoses use the worst area, often the periphery. If a higher-grade or morphologically different component in the resection was absent from the preoperative sample, the dataset recommends repeat receptor assays. These are source-specific reporting instructions, not an individual prognosis."
],
  },

  { id: "nottingham-prognostic-index", kind: "term", asOf, name: "Nottingham Prognostic Index (NPI), and PREDICT", category: "Clinical", wikipedia: W("Nottingham_Prognostic_Index"),
    aka: ["NPI", "Nottingham Prognostic Index", "Nottingham index", "prognostic index breast", "PREDICT", "PREDICT tool", "NHS Predict", "Predict breast", "Adjuvant! Online"],
    tldr: "One number that puts a breast cancer's size, its node status and its grade together, because the stage on its own leaves grade out. Score under 2.4 is the excellent group; 5.4 or above is the poor group. PREDICT is the modern web tool that does the same job and adds the receptors, age and the benefit of each treatment.",
    summary: "The index is deliberately simple: NPI = grade (1 to 3) + node stage (1 to 3) + 0.2 times the invasive tumour size in centimetres. Node stage is 1 for negative nodes, 2 for one to three positive axillary nodes or an internal mammary node alone, including micrometastatic disease, and 3 for more than three positive nodes, or the apical node, or a low axillary node and an internal mammary node together. Size is the largest invasive tumour; in multifocal disease the largest mass is used, unless the grades of the separate lesions differ, when the one giving the highest score is reported. Scores run from 2.01 to above 7, and the dataset in force bands them as excellent below 2.4, good from 2.4 to below 3.4, moderate 1 from 3.4 to below 4.4, moderate 2 from 4.4 to below 5.4, and poor at 5.4 and above, with poor subdividing at 6.4 into poor and very poor.\n\nIt was built by looking for what actually predicted outcome. Nine factors were tested in 387 patients in 1982 and only three survived multivariate analysis, size, node stage and grade; the index was then validated prospectively in 320 patients and applied to the first 1,629 patients of the Nottingham series aged up to 70. In that cohort the good prognosis group was 29 percent of patients with 80 percent fifteen-year survival, the moderate group 54 percent with 42 percent, and the poor group 17 percent with 13 percent, against 83 percent fifteen-year survival in an age-matched female population (Galea 1992). The good group's outcome sitting within a few points of the general population's is the whole point of the index: it identifies the people for whom the cancer is not what will shorten their life.\n\nThe index is not applicable after neoadjuvant chemotherapy, in locally advanced disease, in metastatic disease or in recurrence, because it was derived in patients who had surgery first. For everyone else it has largely been replaced in the clinic by PREDICT, a model built on UK cohorts that adds age, oestrogen receptor and HER2 status, Ki-67 and the mode of detection, and that estimates not only survival but the extra benefit of endocrine therapy, chemotherapy and HER2-directed treatment. NICE NG101 recommendation 1.6.4 asks clinicians to use PREDICT to estimate prognosis and the absolute benefits of adjuvant therapy for women with invasive breast cancer, and 1.6.5 lists where it is less accurate: women under 30 with oestrogen receptor-positive disease, women aged 70 and over, tumours larger than 50 mm, men, in whom it has not been validated at all, and ethnic groups that may have been under-represented in the validation.",
    cancers: ["breast-cancer", "invasive-breast-carcinoma-no-special-type", "breast-hr-positive", "invasive-lobular-carcinoma", "male-breast-cancer"],
    terms: ["nottingham-grade", "grade-stage-receptor-breast", "breast-tumour-size-on-the-report", "lymph-node-status", "tnm-breast-cancer-editions"],
    related: ["lymph-node-status", "tumour-grade", "cancer-stage", "prognosis"],
    sections: ["diagnostics"],
    links: [SRC.g148, SRC.galea1992, SRC.ng101],
    notes: ["Why two tools for one question. The index was designed to be worked out on paper from three numbers a pathologist already reports, and it still is: the RCPath dataset lists grade partly because it feeds the index. PREDICT needs a computer and more inputs, and in exchange it answers the question a patient is actually asking, which is not how likely am I to survive but how much difference does each treatment make. Neither is a personal certainty; both are averages over people who looked similar on paper."],
  },

  { id: "tnm-breast-cancer-editions", kind: "term", asOf, name: "Which staging edition a breast report uses: UICC TNM 8, TNM 9 and the AJCC prognostic stage", category: "Pathology", wikipedia: W("Breast_cancer_classification"),
    aka: ["TNM 8 breast", "TNM 9 breast", "UICC TNM breast", "AJCC TNM breast", "AJCC 8th edition breast", "breast cancer staging edition", "ypT", "ypN", "yp classification", "TNM edition", "Tis (DCIS)", "Tis (LCIS)", "T4d"],
    tldr: "UK breast reports stage against the UICC's 8th edition, and the dataset warns against using the American AJCC 8th instead, because the two differ. The 9th edition, in force from January 2026, leaves breast staging alone; the one thing it changes is how a tumour is staged after chemotherapy given before surgery.",
    summary: "Three staging systems get quoted at a breast cancer patient and they are not interchangeable. The UICC TNM classification is the one UK reports use: the Royal College of Pathologists dataset in force names the eighth edition, reprints it as its appendix D, says it should be used for all tumours diagnosed after 1 January 2018, and warns in terms that 'it is recommended to use UICC TNM 8 (not AJCC TNM 8) as there are significant differences between the two staging systems'. The American Joint Committee on Cancer's eighth edition keeps the same anatomical categories but adds a prognostic stage that folds grade, oestrogen and progesterone receptor status, HER2 status and, for some hormone receptor-positive tumours, a genomic assay score into the stage group, which moves a large minority of patients up or down a stage; that system has its own page here (`ajcc-prognostic-stage-breast`) and UK clinicians do not usually quote it. NICE NG101 names no TNM edition and no AJCC prognostic stage anywhere in its recommendations, so a British treatment decision is not stranded by the difference.\n\nThe ninth edition of UICC TNM was published on 3 July 2025 and UICC recommends it take effect from 1 January 2026. For breast, in the committee's own words, 'the classification remains unchanged': the T, N and M categories and the stage groupings are the same as the eighth edition's. One thing was clarified, and it is the thing that matters most to anyone who has chemotherapy before surgery. The post-treatment y-pathological classification is now spelled out: ypT and ypN correspond to pT and pN, the ypT category 'must be based on the largest continuous focus of residual invasive cancer', not including treatment-related fibrosis, multiple residual foci are classified with the m suffix, and the report is recommended to add an estimate of the extent of residual disease by the residual cancer burden method (Brierley 2026). In other words, a 30 mm area of scar tissue with three 4 mm nests of cancer in it is ypT1a, not ypT2, and the residual cancer burden is what carries the rest of the information.\n\nTwo details of the eighth edition catch readers out and survive unchanged into the ninth. In situ disease is staged Tis with the type in brackets, Tis (DCIS), Tis (LCIS) or Tis (Paget's) for Paget disease of the nipple with no underlying carcinoma, so stage 0 on a letter means in situ disease. And T4d is not a size at all: it is inflammatory carcinoma, a clinical diagnosis, which is why an inflammatory breast cancer is stage III or IV from the day it is named however small the tumour turns out to be.",
    cancers: ["breast-cancer", "ductal-carcinoma-in-situ", "lobular-carcinoma-in-situ", "inflammatory-breast-cancer", "paget-disease-of-the-nipple", "tnbc"],
    terms: ["grade-stage-receptor-breast", "ajcc-prognostic-stage-breast", "nottingham-prognostic-index", "breast-tumour-size-on-the-report", "rcb", "pcr", "carcinoma-in-situ"],
    related: ["tnm-staging", "cancer-stage", "ajcc-stage", "stage-shift", "rcb"],
    sections: ["diagnostics"],
    links: [SRC.g148, SRC.tnm9, SRC.uicc, SRC.ng101],
  },

  {
    notes:["Consider a fictional pretreatment core with invasive carcinoma of no special type, Nottingham components 3 + 3 + 3 = 9, ER 0%, PR 0%, HER2 IHC 2+ with a completed integrated ISH-negative interpretation, Ki-67 about 80%, stromal TILs 50%, and no DCIS seen. The assigned grade is 3. The specified final receptor results fit the ordinary triple-negative and HER2-low categories; IHC 2+ alone would still need workup. This is an invented interpretation exercise, not a real specimen or evidence of eligibility for a medicine.","In that example, Ki-67 about 80% refers to eligible stained tumour-cell nuclei, while sTILs 50% estimates the defined infiltrate within eligible stromal area. Neither is an absolute immune-cell count, a daily growth rate or a forecast. No DCIS seen concerns the sampled core. The findings do not complete stage or show absence elsewhere. In a second fictional adequately controlled report, ER 5%, PR 0% and HER2 IHC 0 mean ER-low-positive disease, not TNBC. ASCO/CAP acknowledges limited endocrine-benefit evidence in the 1% to 10% group; that uncertainty does not make the ER result negative."],
    id: "grade-stage-receptor-breast", kind: "term", asOf: "2026-11-11", name: "Grade, stage and receptor status: three different things on one breast report", category: "Pathology",
    aka: ["grade stage receptor", "grade and stage and receptors", "what my breast pathology report means", "breast pathology report", "grade versus stage breast", "receptor status versus stage", "three numbers on my report"],
    tldr: "Grade describes microscopic features, stage describes extent under a defined system, and receptor tests describe measured markers. Together with other evidence, these findings inform treatment without guaranteeing a drug response.",
    summary: "Histological type, grade, receptor results and anatomical stage answer different questions. Nottingham grade combines tubule formation, nuclear pleomorphism and mitotic activity, each scored from 1 to 3. Totals 3 to 5 give grade 1, 6 to 7 grade 2, and 8 to 9 grade 3. Grade 3 is not stage III, and a Ki-67 index is a stained-nucleus fraction rather than an exact growth rate.\n\nClinical breast staging can use history, examination, imaging and biopsy evidence before surgery. Surgery-first pathological prognostic staging adds findings from removed breast tissue and nodes; it is not the same framework as post-neoadjuvant ypTNM. Some prognostic systems include grade and receptors alongside anatomical extent. Retain the system, edition and treatment setting rather than deriving a missing stage from grade alone or requiring surgery in every clinical setting.\n\nER, PR and HER2 results help define treatment questions within their tested disease setting. A positive receptor does not promise response, and neither grade nor stage alone determines treatment intensity or benefit. Retain the individual assays, controls and final integrated interpretation. A stromal TIL percentage and a Ki-67 percentage use different denominators and cannot stand in for receptor status, stage or a personal outcome probability.",
    cancers: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-breast-carcinoma-no-special-type"],
    terms: ["nottingham-grade", "tnm-breast-cancer-editions", "er-pr-scoring-breast", "her2-testing-uk-breast", "nottingham-prognostic-index", "ajcc-prognostic-stage-breast", "ki-67-in-tnbc"],
    related: ["grade-vs-stage", "tumour-grade", "cancer-stage", "hormone-receptor-status", "her2-positive"],
    sections: ["diagnostics"],
    links: [SRC.g148, SRC.ng101, SRC.allison2020,{"label":"NCI: pathology report sections, final diagnosis and pending tests","url":"https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"},{"label":"NCI: clinical and surgery-first pathological breast staging","url":"https://www.cancer.gov/types/breast/stages"},{"label":"CAP: breast biomarker template, September 2026","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"Elston and Ellis: Nottingham grading study (1991)","url":"https://pubmed.ncbi.nlm.nih.gov/1757079/"},{"label":"Wolff et al.: combined HER2 IHC and ISH interpretation (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/29846122/"},{"label":"Salgado et al.: stromal TIL area denominator (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25214542/"},{"label":"Nielsen et al.: Ki67 assessment recommendations (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33369635/"}],
  },

  { id: "er-pr-scoring-breast", kind: "term", asOf, name: "How ER and PR are scored on a breast report (Allred score, H score, and why PR is not a UK core item)", category: "Biomarkers",
    aka: ["Allred score", "Allred", "quick score", "H score", "histochemical score", "ER score", "ER percentage", "ER 90 percent", "PR score", "PgR score", "hormone receptor score", "ER intensity", "nuclear staining"],
    tldr: "The oestrogen receptor test counts stained nuclei under a microscope and reports a percentage with an intensity, sometimes summarised as an Allred score out of 8 or an H score out of 300. There is no single agreed scoring method, the result is close to all-or-nothing in practice, and progesterone receptor is not actually a mandatory item on a UK report.",
    summary: "Both receptors are measured by immunohistochemistry on the biopsy, and only nuclear staining in the invasive part of the tumour counts. The whole invasive component is assessed. The threshold for positive is 1 percent of tumour nuclei and oestrogen receptor staining of 1 to 10 percent is reported separately as ER low positive, which is a different question with its own page here (`er-pr-negative-threshold`). What this term is about is the number beside the word positive.\n\nThe UK dataset requires the report to give the percentage of positive invasive nuclei, either as an absolute figure or in bands of about 10 percent, together with the average intensity as weak, moderate or strong, or a score. It notes that there are several scoring systems and no internationally accepted one. The two in common use are the Allred or quick score, which adds a proportion score (0 for none, 1 for under 1 percent, 2 for 1 to 10, 3 for 11 to 33, 4 for 34 to 66, 5 for 67 to 100 percent) to an intensity score (0 to 3) for a maximum of 8, with 3 or more counting as positive; and the H score, which multiplies the percentage of weakly, moderately and strongly stained nuclei by 1, 2 and 3 and sums them for a figure from 0 to 300. Where the Allred score and the 1 percent rule disagree, the dataset is explicit that the 1 percent rule wins in both directions. If the tumour is negative or only weakly positive, the report should also say whether the internal control tissue stained, because a failed stain and a true negative look the same.\n\nTwo things about the numbers are worth knowing. The distribution is bimodal: with modern methods most carcinomas are either completely negative or convincingly positive with more than 70 percent of nuclei stained, and only a few percent fall between, which is why a result of 90 percent and a result of 100 percent mean the same thing in practice while a result of 5 percent is a genuinely different animal. And progesterone receptor occupies a contested place. ASCO and CAP note that randomised adjuvant trials found no difference in the degree of benefit from endocrine treatment by PR status and that 'only ER should be used as a predictor of benefit from adjuvant endocrine therapy'; the RCPath writing group debated whether to include PR at all and, finding no consensus, did not make it a mandatory item of the UK dataset, while recommending it as good practice. NICE NG101 recommendation 1.3.3 does ask for it on every invasive cancer. PR earns its place as prognostic information within oestrogen receptor-positive disease, and as a quality control signal: an oestrogen receptor-negative, progesterone receptor-positive result is at best very rare and should prompt a review of the oestrogen receptor stain rather than a change of treatment. Finally, the dataset warns that the ER, PR and HER2 scores some multigene assays report are not to be used for clinical decisions; a disagreement with the immunohistochemistry is a reason to investigate the laboratory, not to re-route the patient.",
    cancers: ["breast-cancer", "breast-hr-positive", "tnbc", "ductal-carcinoma-in-situ", "male-breast-cancer"],
    terms: ["er-pr-negative-threshold", "hormone-receptor-status", "grade-stage-receptor-breast", "her2-testing-uk-breast", "receptor-conversion-breast", "ihc"],
    related: ["hormone-receptor-status", "ihc", "endocrine-therapy", "er-pr-negative-threshold"],
    sections: ["diagnostics", "hormonal"],
    links: [SRC.g148, SRC.allison2020, SRC.ng101],
    notes: ["Ductal carcinoma in situ is scored differently, or not at all. Assessing oestrogen receptor status in DCIS without an invasive component is not a mandatory item of the UK dataset, there is no consensus on a cut-off, and the recommendation is to use the same method and threshold as for invasive cancer if it is measured at all, which it is when endocrine treatment is being considered. There are no data supporting progesterone receptor in DCIS."],
  },

  { id: "her2-testing-uk-breast", kind: "term", asOf:"2026-11-09", name: "HER2 testing in the UK: reflex ISH, the ratio against the copy number, and where the UK differs from ASCO/CAP", category: "Biomarkers",
    aka: ["HER2 testing", "HER2 test", "HER2 IHC 2+", "reflex ISH", "dual-probe ISH", "HER2 CEP17 ratio", "HER2 copy number", "FISH group 2", "HER2 equivocal", "HER2 borderline", "HER2 heterogeneity", "UK HER2 recommendations", "chicken wire"],
    tldr: "Breast HER2 interpretation depends on the assay, scoring system and guideline. UK and U.S. guidance differ in some uncommon ISH cases; the concurrent protein-staining result matters.",
    summary: "RCPath G148 version 3, dated November 2024, describes UK breast HER2 testing with immunohistochemistry followed by ISH for equivocal cases, or an ISH approach in specified circumstances. It calls for the HER2/chromosome-17 ratio, HER2 copy number and chromosome-17 copy number to be reported, with specimen quality, heterogeneity and final interpretation. An uninterpretable test must not be guessed to be negative.\n\nG148 retains UK ratio/copy-number conventions, including a positive classification for the uncommon IHC 2+ cases with HER2/CEP17 ratio at least 2.0 and average HER2 copy number below 4.0 discussed in that guidance. The September 2026 CAP breast template instead uses concurrent IHC and the specified recounting algorithm for uncommon groups 2 to 4. In U.S. group 2, IHC 0 to 2+ leads to a negative interpretation after the required workup, while IHC 3+ is positive. Thus, saying every U.S. group 2 case is negative loses an important condition.\n\nKeep the jurisdiction and guideline version with an interpretation. The September 2026 CAP template also records no detected membrane staining separately from faint membrane staining within the historical IHC 0 band. A reporting convention is different from a product-specific clinical indication, and neither a raw count nor a staining score alone establishes an individual treatment decision.",
    cancers: ["breast-cancer", "breast-her2-positive", "her2-low-metastatic-breast-cancer", "tnbc", "breast-hr-positive"],
    terms: ["her2-positive", "her2-low", "her2-low-and-trop2-adc-eligibility-tnbc", "er-pr-scoring-breast", "receptor-conversion-breast", "grade-stage-receptor-breast", "fish", "ihc"],
    related: ["her2-positive", "her2-low", "fish", "ihc", "co-amplification"],
    sections: ["diagnostics", "targeted-therapy"],
    links: [{"label":"Royal College of Pathologists G148: dataset for histopathological reporting of breast disease in surgical excision specimens of breast cancer, version 3, November 2024 (full review due November 2026)","url":"https://www.rcpath.org/resourceLibrary/g148-dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.html"},{"label":"Rakha et al., Journal of Clinical Pathology 2023;76:217 to 227: UK recommendations for HER2 assessment in breast cancer, an update","url":"https://doi.org/10.1136/jcp-2022-208632"},{"label":"Quinn et al., Histopathology 2026;89(2):199 to 218: World Health Organization classification of tumours of the breast, 6th edition 2026","url":"https://doi.org/10.1111/his.70149"},{"label":"CAP breast biomarker template, September 2026: uncommon ISH groups and concurrent IHC","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"}],
  },

  { id: "receptor-conversion-breast", kind: "term", asOf, name: "Receptor conversion: when the receptors change between the primary and a recurrence", category: "Biomarkers",
    aka: ["receptor conversion", "receptor discordance", "receptor status change", "ER conversion", "HER2 conversion", "retesting at recurrence", "rebiopsy at relapse", "biopsy of metastasis", "discordance primary metastasis"],
    tldr: "The receptors measured on the original tumour are not always the receptors of a cancer that comes back years later. On meta-analysis about a fifth of oestrogen receptor-positive primaries had become negative in their metastases, and about half had lost the progesterone receptor. It is why a returning cancer is biopsied again rather than treated from the old report.",
    summary: "A meta-analysis of 39 studies of paired primary tumours and distant metastases found conversion in both directions. From positive to negative the pooled rates were 22.5 percent for oestrogen receptor, 49.4 percent for progesterone receptor and 21.3 percent for HER2; from negative to positive they were 21.5 percent, 15.9 percent and 9.5 percent. The site mattered: oestrogen receptor discordance was significantly higher in central nervous system and bone metastases than in liver metastases, while progesterone receptor discordance was higher in bone and liver than in the brain. The authors' conclusion was that conversion happens often enough in the course of progression that reassessing receptor status in metastases is strongly encouraged, and that nobody has yet run the prospective study showing what treating on the new result rather than the old one does to survival (Schrijver 2018).\n\nBritish practice follows that logic cautiously. NICE CG81 recommendation 1.4.1 says that for people whose breast cancer has recurred, consider reassessing hormone receptor and HER2 status if a change in receptor status will lead to a change in management. The condition in that sentence is doing real work: a biopsy of a bone or liver deposit is not a trivial procedure, and it is worth it when the answer could open or close a treatment route, which in 2026 it increasingly can, because HER2-low and ultralow scoring decides eligibility for trastuzumab deruxtecan and because expression varies between blocks of the same tumour as well as between the primary and its metastases.\n\nSome of the apparent conversion is not the cancer changing. Immunohistochemistry has real limits at the bottom of its range, decalcified bone specimens stain badly, the cut-off for positivity moved from 10 percent to 1 percent internationally in 2010 and some countries moved later, and tumours are heterogeneous, so a single block may not represent the whole deposit. The safe reading is that the receptors are a property of the tissue tested on the day it was tested, not a permanent label on the patient.",
    cancers: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "her2-low-metastatic-breast-cancer", "hr-positive-metastatic-post-cdk46"],
    terms: ["er-pr-scoring-breast", "her2-testing-uk-breast", "er-pr-negative-threshold", "her2-low", "endocrine-resistance", "esr1-mutation"],
    related: ["her2-low", "endocrine-resistance", "core-needle-biopsy", "esr1-mutation"],
    sections: ["diagnostics"],
    links: [SRC.schrijver2018, SRC.cg81, SRC.g148],
  },

  { id: "breast-tumour-size-on-the-report", kind: "term", asOf, name: "Tumour size on a breast report, and why it differs from the scan", category: "Pathology",
    aka: ["tumour size breast", "invasive tumour size", "whole tumour size", "maximum dimension", "size on the report", "satellite focus", "multifocal breast cancer", "multicentric breast cancer", "size discrepancy"],
    tldr: "The size on the pathology report is the largest continuous lump of invasive cancer measured under the microscope, which is not the same as the size on the mammogram or the MRI. Separate deposits five millimetres or more apart are not added together, and the in-situ disease around the tumour is measured separately.",
    summary: "Size matters because it is a prognostic factor in its own right, a component of the Nottingham Prognostic Index and of PREDICT, and the T of the TNM category. The dataset asks for the maximum dimension of the invasive tumour in millimetres, measured macroscopically in the fresh or fixed specimen and microscopically where the borders are diffuse, with the microscopic measurement treated as the gold standard. The report gives the invasive size and, separately, the whole tumour size including any in-situ disease extending beyond it, because those two numbers answer different questions: the first feeds the stage and the prognosis, the second tells the surgeon how much has to come out.\n\nThree rules explain most discrepancies a patient notices. Satellite deposits are not included in the maximum invasive dimension, and neither are foci of lymphovascular invasion or cells displaced along a needle track; the dataset says no distance can be defined that settles whether two nearby foci are one tumour cut in two planes or two tumours, but that if they are 5 mm or more apart they are unlikely to be one. Where the cancer was removed entirely by the needle or vacuum biopsy, the pathologist goes back to that specimen and estimates, and says that the estimate is likely to be inaccurate although the cancer was certainly small. And where size cannot be measured at all, the fallback order is the imaging size, MRI first, then ultrasound, then mammography, and last and least accurate the clinical size.\n\nIt is worth knowing how imprecise this number is. The dataset reports that the national breast screening programme's external quality assurance scheme finds poor concordance between pathologists on tumour size even on ready-prepared slides, which cannot be explained by slide-to-slide variation, and observes that the scope for error must be greater still once the difficulty of dissecting the specimen is added. A tumour reported as 21 mm rather than 19 mm crosses the boundary from T1 to T2, and the measurement is not precise to 2 mm. This is one reason the index and the tools that use size band it rather than treating it as exact.",
    cancers: ["breast-cancer", "invasive-breast-carcinoma-no-special-type", "invasive-lobular-carcinoma", "ductal-carcinoma-in-situ"],
    terms: ["nottingham-prognostic-index", "tnm-breast-cancer-editions", "nottingham-grade", "lymphovascular-invasion", "grade-stage-receptor-breast"],
    related: ["lymphovascular-invasion", "resection-margins", "cancer-stage", "mammography"],
    sections: ["diagnostics"],
    links: [SRC.g148, SRC.tnm9],
  },
];

// ======================= SUPPLEMENTS ONTO RECORDS OTHER FILES OWN =======================
const supplements: SpikeSupplement[] = [
  /**
   * The folded medullary duplicate. ../cancers-wave4-breast.ts held a second full page for this concept as
   * `breast-carcinoma-medullary-pattern`; it is removed there and the two figures and the aliases it carried that
   * this record did not are moved here. See taxonomy call 2 in the header.
   */
  { id: "medullary-pattern-breast-carcinoma",
    aka: ["Invasive breast carcinoma with medullary pattern", "Medullary carcinoma", "Carcinoma with medullary features", "Medullary-like carcinoma", "Atypical medullary carcinoma of the breast"],
    related: ["breast-cancer", "invasive-breast-carcinoma-no-special-type"],
    terms: ["who-breast-classification", "nottingham-grade"],
    links: [SRC.who5, SRC.who6],
    notes: [
      "Two more series, smaller than the trial cohorts above and quoted with their own denominators. In a Shiraz breast centre's 22-year experience, 179 medullary carcinomas among 3,246 patients (5.5 percent of that centre's series) were of higher grade than the 3,067 ductal carcinomas beside them and yet had a more favourable clinical outcome (Iranian Journal of Medical Sciences 2018). In 165 triple-negative basal-like carcinomas, prominent inflammation and anastomosing sheets in at least 30 percent of the tumour were each associated with better prognosis; their combination, a simplified medullary-like definition, was present in 17 percent of tumours, was an independent prognostic factor and showed good agreement between observers (Modern Pathology 2010). Both are quoted from the series named, and neither is a population figure: with the 2019 definition the pattern is no longer counted separately, so any percentage for how common medullary carcinoma is describes how often it was recognised.",
    ] },

  { id: "hormone-receptor-status", terms: ["er-pr-scoring-breast", "receptor-conversion-breast", "grade-stage-receptor-breast"], related: ["er-pr-scoring-breast"],
    links: [SRC.g148], notes: [
      "The RCPath dataset asks for the percentage of positive invasive tumour-cell nuclei and staining intensity, with an optional Allred score out of 8 or H score out of 300. These are different scales, not interchangeable percentages. Its description of a mostly bimodal ER distribution does not establish that every difference between 90% and 100% is noise or that those values measure equal signalling or treatment benefit. Controls and the low-positive range require their own interpretation.",
      "The RCPath breast dataset describes PR testing as good practice but does not make it a mandatory dataset item. It notes its prognostic value in ER-positive invasive disease and the quality-control question raised by the rare ER-negative/PR-positive combination. The dataset also describes recommendations from ASCO/CAP and NICE; reporting requirements and prediction of endocrine benefit are distinct issues.",
    ] },

  { id: "her2-positive", terms: ["her2-testing-uk-breast", "receptor-conversion-breast"], related: ["her2-testing-uk-breast"],
    links: [SRC.g148, SRC.rakha2023], notes: [
      "The RCPath UK breast dataset retains a different classification from ASCO/CAP for some dual-probe ISH group 2 cases: HER2/CEP17 ratio at least 2.0 with mean HER2 below 4 signals per cell. The UK dataset classifies these as positive. Under ASCO/CAP, concurrent IHC matters: IHC 3+ is positive, while IHC 2+ requires the specified recount and is negative if the same group persists; IHC 0 or 1+ is negative. Thus the US result is not uniformly negative from the ratio and copy number alone. The UK dataset asks for ratio and mean HER2 and CEP17 signals, with the guideline and specimen context retained.",
    ] },

  { id: "her2-low", terms: ["her2-testing-uk-breast", "who-breast-classification"], links: [SRC.who6], notes: [
      "The 2026 WHO review describes changes in HER2 reporting after DESTINY-Breast04 and DESTINY-Breast06. The September 2026 CAP template distinguishes score 0 with no detected membrane staining from score 0+ with faint incomplete membrane staining in 10 percent or fewer tumour cells. The template itself is not required for accreditation. The reporting category, the drug label and an individual’s clinical eligibility are separate; not every trace-staining result in every breast-cancer setting has the same treatment implication.",
    ] },

  { id: "tumour-grade", terms: ["nottingham-grade", "grade-stage-receptor-breast"], related: ["nottingham-grade"],
    links: [SRC.elston1991, SRC.g148], notes: [
      "The breast scheme in full. The Nottingham grade, the Elston and Ellis revision of Bloom and Richardson, adds three scores of 1 to 3, for tubule formation, nuclear pleomorphism and mitotic count, into a total of 3 to 9: grade 1 is 3 to 5, grade 2 is 6 or 7, grade 3 is 8 or 9. UK practice permits no alternative scheme and requires the three component scores to be recorded. The grades are not expected in equal thirds: the dataset gives the ratio of grades 1, 2 and 3 as about 2:3:5 in symptomatic and 3:5:2 in screen-detected breast cancer (see `nottingham-grade`).",
    ] },

  { id: "grade-vs-stage", terms: ["grade-stage-receptor-breast", "nottingham-grade"], related: ["grade-stage-receptor-breast"] },

  { id: "er-pr-negative-threshold", terms: ["er-pr-scoring-breast", "receptor-conversion-breast"], related: ["er-pr-scoring-breast"] },

  { id: "ajcc-prognostic-stage-breast", terms: ["tnm-breast-cancer-editions", "grade-stage-receptor-breast"], related: ["tnm-breast-cancer-editions"],
    links: [SRC.g148, SRC.tnm9], notes: [
  "RCPath's November 2024 G148 dataset, Appendix D, recommends UICC TNM 8 rather than AJCC TNM 8 because the systems differ. This is the named dataset's reporting instruction, not evidence that every UK report omits prognostic staging. An anatomical UICC category alone does not establish an AJCC prognostic group; the latter also requires its specified grade, receptor and assessment inputs."
] },

  { id: "carcinoma-in-situ", terms: ["tnm-breast-cancer-editions", "terminal-duct-lobular-unit"], cancers: ["lobular-carcinoma-in-situ"],
    notes: ["How in-situ disease is written in a breast stage. Tis carries the type in brackets: Tis (DCIS), Tis (LCIS), or Tis (Paget's) for Paget disease of the nipple with no underlying carcinoma. A carcinoma in the breast that happens to have Paget disease over the nipple is staged on the carcinoma, with the Paget disease noted."] },

  { id: "rcb", terms: ["tnm-breast-cancer-editions"], links: [SRC.tnm9],
    notes: ["The staging manual now asks for it. The ninth edition of UICC TNM, recommended from 1 January 2026, clarifies that the ypT category must be based on the largest continuous focus of residual invasive cancer, excluding treatment-related fibrosis, with multiple foci carrying the m suffix, and recommends that the pathology report add an estimate of the extent of residual disease by the residual cancer burden method (Brierley 2026). Residual cancer burden is therefore no longer only a trial endpoint; it is what the stage cannot express."] },
];

// ======================= PATCHES =======================
/** The family page: the routing, what breast cancer is, the basics, the outlook and the shared classification timeline. */
const breastPatch: Spike["patch"] = {
  asOf,
  burden: "The commonest cancer in the world and in the UK. Worldwide there are 2,434,087 new breast cancers and 693,660 deaths a year, second for cases among all cancers and fourth for deaths (GLOBOCAN 2024). In the UK there are 59,413 new cases a year, about 59,000 in females and 420 in males, 15 percent of all cancers, and 11,200 deaths a year (Cancer Research UK). In England in 2022, 85 percent of cases with a known stage were stage I or II.",
  subtypes: [
    "By receptor result, which is what chooses a treatment page: hormone receptor-positive and HER2-negative (70.1 percent of American cases, 5.5 percent having no known subtype), HER2-positive whatever the hormone receptors say (13.3 percent, of which 9.3 points are also hormone receptor-positive), and triple-negative (10.8 percent) (SEER 21, 2019 to 2023)",
    "By histological type, which the WHO classification decides: invasive carcinoma of no special type (the commonest by far), invasive lobular carcinoma (about 15 percent), and the special types, each with its own page",
    "By whether the cancer has broken out of the duct or lobule: ductal carcinoma in situ and lobular carcinoma in situ are staged Tis and are not invasive cancer",
    "Clinical entities that are defined by how they present rather than by histology: inflammatory breast cancer (staged T4d) and Paget disease of the nipple",
    "Phyllodes tumour, which is not a carcinoma at all but a fibroepithelial tumour of the breast stroma",
  ],
  biomarkers: [
    "Oestrogen receptor, reported as a percentage of stained invasive nuclei with an intensity, positive at 1 percent or more, with 1 to 10 percent reported separately as ER low positive (RCPath G148; ASCO/CAP 2020)",
    "Progesterone receptor, asked for by NICE NG101 1.3.3 on every invasive cancer but not a mandatory item of the UK pathology dataset, and used for prognosis and quality control rather than to predict endocrine benefit",
    "HER2 by immunohistochemistry 0 to 3+, with reflex dual-probe in situ hybridisation for 2+ reporting the HER2 to chromosome 17 ratio, the HER2 copy number and the chromosome 17 copy number; 13 to 20 percent of early breast cancer is positive (RCPath G148)",
    "Nottingham grade, and the three component scores that make it, which are mandatory to record separately",
    "Invasive tumour size and whole tumour size in millimetres, reported as two different numbers",
    "Lymph node status, and whether it came from a sentinel node biopsy, which is written pN0(SN)",
    "Nottingham Prognostic Index from grade, node stage and size, and PREDICT, which NICE NG101 1.6.4 asks clinicians to use",
  ],
  basics: {
    symptoms: [
      "A new lump or thickening in the breast or armpit, a change in the size, shape or feel of a breast, skin puckering or dimpling, a rash, redness or crusting on the nipple or the skin, fluid leaking from a nipple you are not breastfeeding from, or a nipple that has turned inwards (NHS)",
      "Most breast changes are not cancer, and most lumps turn out to be benign; the reason to have a change checked is not that it is probably serious but that it cannot be told apart from something serious without looking",
      "Redness and inflammation may look darker or brownish rather than red on brown or black skin, which is one reason inflammatory breast cancer is missed more often in some patients (Cancer Research UK)",
      "Men have breast tissue and get breast cancer too, about 420 UK cases a year against about 59,000 in women; there is a page for it, and there is no screening programme for men, so a lump behind a man's nipple needs the same appointment (Cancer Research UK)",
      "Pain is not a typical symptom. Breast pain without a lump or a skin change is common, is usually hormonal, and is rarely how breast cancer presents (NHS)",
      "The referral rules the GP is working to, and what the appointment involves, are on the NHS pathway page; this page is about what the results mean when they come back",
    ],
    diagnosis: [
      "Every invasive breast cancer has its oestrogen receptor, progesterone receptor and HER2 status assessed at the same time, at the initial histopathological diagnosis, by standardised and quality-assured techniques reported quantitatively, and recorded at both the preoperative and the postoperative multidisciplinary meeting (NICE NG101 1.3.1 to 1.3.5)",
      "MRI is not used routinely before surgery. It is offered when the extent of disease is unclear from examination, mammography and ultrasound, when breast density defeats mammography, or to size an invasive lobular cancer before breast-conserving surgery (NG101 1.2.2, 1.2.3)",
      "The axilla is scanned before treatment and any abnormal node is sampled with a needle (NG101 1.2.1)",
      "The pathology report carries the histological type, the Nottingham grade with its three component scores, the invasive and whole tumour size in millimetres, the node stage, the excision margins, the receptor results and the assessment of treatment effect where chemotherapy came first (RCPath G148, version 3, November 2024)",
      "In advanced disease the choice for staging the rest of the body is contrast-enhanced CT of the chest, abdomen and pelvis or FDG PET-CT, with the caution that some lobular and some low-grade cancers take up the tracer poorly (NICE CG81 1.3.1, 1.3.2)",
      "If the cancer comes back, reassessing the hormone receptor and HER2 status is considered where a change would change management, because the receptors of a metastasis are often not those of the primary (NICE CG81 1.4.1)",
    ],
    staging: [
      "Three things are measured and they answer three different questions: the grade is how abnormal the cells look, the stage is how far the cancer has gone, and the receptor status is what it will respond to. None can be worked out from the others",
      "Grade: three features, tubule formation, nuclear pleomorphism and mitotic count, each scored 1 to 3 and added. Total 3 to 5 is grade 1, 6 or 7 is grade 2, 8 or 9 is grade 3 (Elston and Ellis; RCPath G148)",
      "Grades are not expected in equal thirds: the expected ratio of grades 1, 2 and 3 is about 2:3:5 in symptomatic breast cancer and about 3:5:2 in screen-detected breast cancer, so a grade 3 is commoner in a cancer found as a lump than in one found by screening (RCPath G148)",
      "Stage: UK reports stage against UICC TNM 8, which the RCPath dataset names and reprints, warning that AJCC TNM 8 should not be used in its place because the two differ significantly. NICE NG101 names no edition at all",
      "TNM 9 was published on 3 July 2025 and UICC recommends it from 1 January 2026. For breast the classification is unchanged; the one change clarifies the post-treatment yp classification, basing ypT on the largest continuous focus of residual invasive cancer and recommending that residual cancer burden be reported beside it (Brierley 2026)",
      "In situ disease is staged Tis with the type in brackets, Tis (DCIS) or Tis (LCIS), and inflammatory carcinoma is T4d, a clinical diagnosis rather than a size",
      "Because stage does not include grade or the receptors, the UK adds the Nottingham Prognostic Index, grade plus node stage plus 0.2 times the size in centimetres, banded from excellent below 2.4 to poor at 5.4 and above (RCPath G148; Galea 1992)",
      "PREDICT is the tool used in the clinic to put stage, grade, receptors, age and detection method together and estimate the benefit of each treatment; NICE NG101 1.6.4 recommends it and 1.6.5 lists where it is less accurate, including that it has not been validated in men",
      "Tumour size is less precise than it looks: the national screening programme's quality assurance scheme finds poor agreement between pathologists on size even on prepared slides, and separate deposits 5 mm or more apart are not added together (RCPath G148)",
    ],
    sources: [SRC.ng101, SRC.g148, SRC.cg81, SRC.tnm9, SRC.elston1991, SRC.galea1992, SRC.nhsSymptoms, SRC.cruk],
  },
  prognosis: {
    text: "These are population figures, quoted with the group they were measured in. They describe what happened to large numbers of people who were diagnosed years ago and treated with what was available then, and they are not a prediction about any one person.\n\nBy receptor subtype, in American women diagnosed between 2016 and 2022, five-year relative survival was 95.8 percent for hormone receptor-positive HER2-negative disease, 92.2 percent for hormone receptor-positive HER2-positive, 87.0 percent for hormone receptor-negative HER2-positive and 78.7 percent for triple-negative disease, against 91.9 percent for all breast cancer (SEER 21). By stage the same source gives, for hormone receptor-positive HER2-negative disease, 100.0 percent localised, 91.1 percent regional and 38.1 percent distant; for triple-negative disease 92.8, 68.3 and 14.9 percent. The pattern is the point: the subtype matters much less when the cancer is found early than when it is found late.\n\nIn the UK, 76.6 percent of women survive breast cancer for ten years or more (2018 prediction, Cancer Research UK), and mortality rates have fallen 46 percent since the early 1970s. Survival is not evenly distributed: five-year survival in England is 82.6 percent in the most deprived group against 89.6 percent in the least (2018 to 2022).\n\nThe single largest lever on all of these numbers is the stage at which the cancer is found, which is why 85 percent of English cases being diagnosed at stage I or II matters more than any of the treatment comparisons on the pages below.",
    sources: [SRC.seerSubtypes, SRC.cruk, SRC.seerBreast],
  },
  standardOfCare: [
    { setting: "Every invasive breast cancer, at diagnosis", approach: "Oestrogen receptor, progesterone receptor and HER2 assessed simultaneously on the diagnostic biopsy by quality-assured immunohistochemistry, reported quantitatively, with reflex in situ hybridisation for a HER2 score of 2+, and the results available at both the preoperative and the postoperative multidisciplinary meeting. The pathology report also carries the histological type, the Nottingham grade with its three component scores, the invasive and whole tumour size, the node stage and the margins.", refs: ["histopathology-ihc", "core-needle-biopsy", "fish", "er-pr-scoring-breast", "her2-testing-uk-breast", "nottingham-grade"], guideline: { version: "NICE NG101 recommendations 1.3.1 to 1.3.5; RCPath G148 version 3 (November 2024)", url: "https://www.nice.org.uk/guidance/ng101/chapter/recommendations" } },
    { setting: "Staging and prognostic assessment", approach: "Ultrasound of the axilla with needle sampling of any abnormal node before treatment; MRI only where the extent is unclear, the breast is too dense to assess or a lobular cancer is being sized for breast-conserving surgery. Stage against UICC TNM 8, and put grade, node stage and size together in the Nottingham Prognostic Index and in PREDICT, which estimates the benefit of each adjuvant treatment. In advanced disease, contrast-enhanced CT of chest, abdomen and pelvis or FDG PET-CT.", refs: ["ultrasound", "mri", "ct", "pet-ct", "tnm-breast-cancer-editions", "nottingham-prognostic-index", "grade-stage-receptor-breast"], guideline: { version: "NICE NG101 1.2.1 to 1.2.3 and 1.6.4 to 1.6.5; NICE CG81 1.3.1 to 1.3.3", url: "https://www.nice.org.uk/guidance/ng101/chapter/recommendations" } },
    { setting: "At recurrence", approach: "Consider reassessing hormone receptor and HER2 status on a biopsy of the recurrence where a change in receptor status would change management, because conversion between the primary and a metastasis is common in both directions.", refs: ["receptor-conversion-breast", "core-needle-biopsy", "her2-low"], guideline: { version: "NICE CG81 recommendation 1.4.1", url: "https://www.nice.org.uk/guidance/cg81/chapter/Diagnosis-and-assessment" } },
  ],
  history: [
    { year: 1991, title: "Elston and Ellis make breast grading reproducible", note: "The Nottingham revision of Bloom and Richardson's grade scores tubule formation, nuclear pleomorphism and mitotic count separately and adds them. Grade was assessed in 1,831 patients of the Nottingham series and separated survival with p less than 0.0001. It is still the only grading system UK practice permits.", refs: ["nottingham-grade"] },
    { year: 1992, title: "The Nottingham Prognostic Index is published", note: "Nine candidate factors were tested in 387 patients and three survived: size, node stage and grade. In the first 1,629 patients the good prognosis group, 29 percent of the series, had 80 percent fifteen-year survival against 83 percent in an age-matched female population (Galea 1992).", refs: ["nottingham-prognostic-index"] },
    { year: 2018, title: "UICC TNM 8 becomes the UK staging standard for breast cancer", note: "Used for all breast tumours diagnosed after 1 January 2018. The Royal College of Pathologists reprints it and advises against substituting the American AJCC 8th edition, whose prognostic stage folds grade and receptors into the stage number.", refs: ["tnm-breast-cancer-editions", "ajcc-prognostic-stage-breast"] },
    { year: 2019, title: "WHO classification of breast tumours, 5th edition", note: "Keeps invasive carcinoma of no special type as the default group and folds the former medullary, oncocytic, lipid-rich, glycogen-rich, sebaceous and pleomorphic carcinomas into it as patterns. This is the edition UK reports are written against in 2026.", refs: ["who-breast-classification"] },
    { year: 2024, title: "The UK breast reporting dataset is rewritten", note: "RCPath G148 version 3 (November 2024) adds the ER low positive category, a separate section on male breast disease, updated handling of specimens after neoadjuvant treatment, and an appendix on assessing tumour cellularity for molecular testing. Full review is due November 2026.", refs: ["er-pr-scoring-breast", "er-pr-negative-threshold"] },
    { year: 2026, title: "TNM 9 takes effect, and leaves breast staging alone", note: "Published 3 July 2025 and recommended from 1 January 2026. For breast the classification is unchanged; the yp classification is clarified, basing ypT on the largest continuous focus of residual invasive cancer and recommending that the residual cancer burden be reported beside it.", refs: ["tnm-breast-cancer-editions", "rcb"] },
    { year: 2026, title: "WHO classification of breast tumours, 6th edition", note: "Published April 2026. Reserves 'variant' for molecular alterations and separates subtype from pattern, updates the HER2 reporting categories so that no membrane staining is distinguished from any, recognises lobular carcinoma with extracellular mucin, moves high-grade and receptor-negative mucinous carcinomas into no special type, drops the unified neuroendocrine model for the breast, and lowers malignant phyllodes tumour to four of five adverse criteria.", refs: ["who-breast-classification"] },
  ],
  openProblems: [
    "The receptor result produces four boxes and the world is organised around three. One report gives a hormone receptor answer and a HER2 answer, and the four combinations are unequal: 70.1 percent hormone receptor-positive HER2-negative, 9.3 percent positive for both, 4.0 percent HER2-positive alone and 10.8 percent triple-negative (SEER 21, 2019 to 2023). Guidelines, trials and patient information are written for three subtypes, so the largest HER2-positive group, the people who are hormone receptor-positive as well, have to read two sets of advice and work out where they overlap.",
    "The classification a report is written against is two years behind the classification in print. The sixth edition of the WHO classification of breast tumours appeared in April 2026 and changed the vocabulary of subtype, pattern and variant, the HER2 reporting categories and the criteria for several types; the UK reporting dataset in force was written against the fifth edition and is due for review in November 2026. Every page in this family, and every report a patient is holding, is currently a fifth-edition document, and there is no mechanism that tells a patient which edition her report was written to.",
    "Stage does not contain grade or the receptors, and the tools that patch the gap disagree with each other. The UK dataset says so in its own words, which is why the Nottingham Prognostic Index and PREDICT exist; America solved the same problem inside the stage number with the AJCC prognostic stage, which the UK dataset advises against using. A British and an American clinician can therefore give the same tumour a different stage, and PREDICT is explicitly less accurate in women under 30 with oestrogen receptor-positive disease, women aged 70 and over, tumours over 50 mm, and has never been validated in men.",
    "Receptor conversion is measured but not acted on by evidence. On meta-analysis of 39 paired studies, 22.5 percent of oestrogen receptor-positive primaries had become negative in their metastases and 21.3 percent of HER2-positive ones had, with conversion in the other direction too; NICE asks only that reassessment be considered where it would change management. No prospective study has shown what treating on the metastasis rather than the primary does to survival, so the commonest decision in relapsed breast cancer rests on a biological argument rather than a trial (Schrijver 2018).",
    "The measurements underneath every one of these systems are less precise than the decisions they drive. Grade agrees between core biopsy and surgical specimen about 70 percent of the time; the national screening programme's quality assurance scheme finds poor agreement between pathologists on tumour size even on prepared slides; there is no internationally agreed method for scoring oestrogen receptor; and pathologists disagree at the HER2 0 to 1+ boundary that now decides eligibility for an antibody-drug conjugate.",
  ],
  terms: ["terminal-duct-lobular-unit", "who-breast-classification", "nottingham-grade", "nottingham-prognostic-index", "tnm-breast-cancer-editions", "grade-stage-receptor-breast", "er-pr-scoring-breast", "her2-testing-uk-breast", "receptor-conversion-breast", "breast-tumour-size-on-the-report", "hormone-receptor-status", "her2-positive", "her2-low", "er-pr-negative-threshold", "ajcc-prognostic-stage-breast", "tumour-grade", "grade-vs-stage", "cancer-stage", "tnm-staging", "carcinoma-in-situ", "dcis", "lymphovascular-invasion", "lymph-node-status", "sentinel-lymph-node-biopsy", "core-needle-biopsy", "ihc", "fish", "pcr", "rcb", "basal-like", "pam50", "interval-breast-cancer", "ki-67-in-tnbc"],
  technologies: ["mammography", "ultrasound", "mri", "ct", "pet-ct", "histopathology-ihc", "digital-pathology-ai"],
  related: ["breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-breast-carcinoma-no-special-type", "invasive-lobular-carcinoma", "ductal-carcinoma-in-situ", "lobular-carcinoma-in-situ", "male-breast-cancer", "inflammatory-breast-cancer", "paget-disease-of-the-nipple", "phyllodes-tumour", "her2-low-metastatic-breast-cancer", "medullary-pattern-breast-carcinoma"],
  links: [SRC.ng101, SRC.g148, SRC.cg81, SRC.tnm9, SRC.uicc, SRC.who6, SRC.who5, SRC.elston1991, SRC.galea1992, SRC.allison2020, SRC.rakha2023, SRC.schrijver2018, SRC.seerSubtypes, SRC.seerBreast, SRC.globocan, SRC.cruk, SRC.crukTypes, SRC.nhsSymptoms],
  notes: [
    "Which page is mine? Start with the receptor result, because that is the only one of the three things on your report that chooses a page. If you were told the cancer is oestrogen receptor positive (or progesterone receptor positive) and HER2 negative, your page is HR-positive / HER2-negative breast cancer, and you are in the largest group, 70.1 percent of American cases (SEER 21, 2019 to 2023). If you were told HER2 positive, your page is HER2-positive breast cancer whatever the oestrogen receptor says, because HER2 chooses the treatment backbone; and if you were told you are hormone receptor positive as well, which is true of about seven in ten HER2-positive cancers (9.3 percent of all cases against 4.0 percent hormone receptor negative), you will also have endocrine treatment, and the HR-positive page is where that is explained. If you were told all three are negative, your page is triple-negative breast cancer, 10.8 percent of American cases and around 15 percent on Cancer Research UK's page. If you were told an oestrogen receptor figure between 1 and 10 percent, or the phrase ER low positive, read both the HR-positive and the triple-negative pages and the term on the threshold, because that band behaves more like triple-negative disease and the endocrine benefit is uncertain.",
    "Which page is mine, continued: the answers that are not a receptor result. If you have been told a type rather than a receptor status, the type has a page: invasive carcinoma of no special type, which is the ordinary kind and is what most of this family is written about; invasive lobular carcinoma, about 15 percent of cases; or one of the special types, tubular, mucinous, cribriform, papillary, micropapillary, metaplastic, apocrine, secretory, adenoid cystic, neuroendocrine, or carcinoma with a medullary pattern. If you were told in situ, non-invasive or stage 0, you have ductal carcinoma in situ or lobular carcinoma in situ, which are staged Tis and are not invasive cancer; lobular carcinoma in situ is closer to a risk marker than a cancer. If the breast became red, swollen and hot over weeks, that is inflammatory breast cancer, staged T4d and diagnosed clinically. If the change is an eczema-like nipple, that is Paget disease of the nipple. If the lump turned out to be a fibroepithelial tumour, that is a phyllodes tumour, not a carcinoma, and it is not treated with any of the drugs on the receptor pages. If you are a man, there is a page for male breast cancer. And if you are here because of a screening recall rather than a diagnosis, a recall is not a diagnosis: most people recalled after a mammogram do not have cancer, and the NHS pathway page explains what happens next.",
    "Which page is mine, continued: grade, stage and the words that are not pages. A grade is not a page. Someone told 'grade 3, triple negative' should go to the triple-negative page: grade 3 is the commonest grade in triple-negative disease and it changes the prognosis, not the route. A stage is not a page either, although each receptor page splits into early and advanced disease at the second click, and there are pages for high-risk early hormone receptor-positive disease, for hormone receptor-positive disease after CDK4/6 inhibitors, for early HER2-positive disease, for HER2-positive brain metastases and for early and metastatic triple-negative disease. Luminal A and luminal B, basal-like and claudin-low are names from gene expression profiling rather than from a report, and they live in the glossary. HER2-low and HER2-ultralow are not a fourth receptor status: they describe a HER2-negative cancer with a little HER2 on it, and they change what is available only once the disease is advanced.",
    "What breast cancer is. The breast is a branching tree of fifteen to twenty duct systems, each ending in lobules, the clusters of sacs that make milk. Almost all breast cancer begins where the smallest duct meets its lobule, the terminal duct lobular unit, and the names of the two commonest kinds are therefore misleading in a useful way: neither invasive carcinoma of no special type, still widely called invasive ductal carcinoma, nor invasive lobular carcinoma starts where its name suggests. What really separates them is E-cadherin, the protein that glues cells to their neighbours: lobular cancers have lost it, so they spread in single files instead of forming a lump, which makes them harder to feel, harder to see on a mammogram and harder to measure. While the cancer is still inside the duct or lobule it cannot spread and is called carcinoma in situ; once it has crossed the basement membrane it is invasive, and can reach the lymph nodes in the armpit and, from there or through the blood, the bones, liver, lungs and brain.",
    "Why the receptors decide everything. Breast cancer was the first cancer shown to be driven by a hormone that could be taken away: Beatson removed the ovaries of women with advanced breast cancer in 1896, and it worked in some of them. Most breast cancers are fed by oestrogen through the oestrogen receptor in the nucleus, and blocking that receptor or removing the hormone works; a minority instead make far too much of a growth-signal protein called HER2 on their surface, and antibodies and antibody-drug conjugates aimed at HER2 work; and a minority have neither, so neither treatment applies and chemotherapy, immunotherapy and, for people with an inherited BRCA fault, PARP inhibitors are used. That is why the first question after diagnosis is not how big or how far, but which of these the cancer is, and why NICE asks for all three receptor results to be requested at once on the first biopsy rather than one after another (NG101 1.3.1).",
    "Is grade the same as stage? No, and confusing them is the commonest misunderstanding on a breast report. Grade is how abnormal the cells look under the microscope, from 1 to 3, and it is a property of the cancer's behaviour. Stage is how much cancer there is and how far it has gone, from 0 to IV, and it is a property of the situation. A small grade 3 cancer and a large grade 1 cancer are different problems, and the report gives you both because neither can be worked out from the other. The UK dataset makes the same point about its own staging system: the UICC classification, it says, does not incorporate histological grade or receptor status, which is why the Nottingham Prognostic Index and PREDICT exist to put them back together.",
    "Why the numbers on my report are given to the nearest whole grade and my friend's cancer had an Oncotype score. Grade, size and node status are measured in the hospital laboratory and are on every report. A genomic recurrence score, such as Oncotype DX, MammaPrint, Prosigna or EndoPredict, is an extra test sent away in some hormone receptor-positive, HER2-negative, node-negative cancers to decide whether chemotherapy is worth adding, and it is not done in all cases and not in other subtypes. It is not a better version of the grade; it answers a narrower question, and NICE has separate diagnostics guidance on which of these tests may be used.",
    "How the outlook is described, and how it is not. Population figures for breast cancer are averages over everyone diagnosed in a period, and for this cancer they are unusually favourable: 76.6 percent of UK women survive ten years or more, and five-year relative survival in the United States is 91.9 percent across all breast cancer. They are also unusually stratified: 95.8 percent five-year survival in hormone receptor-positive HER2-negative disease against 78.7 percent in triple-negative disease, and within triple-negative disease 92.8 percent when it is localised against 14.9 percent when it is distant (SEER 21, 2016 to 2022). No one of those numbers is a prediction about a person, and the number that moves them most is not the subtype but the stage at which the cancer was found.",
  ],
};

/** The three receptor pages: the words a reader is actually told, mapped onto the page. Vocabulary and routing only. */
const hrPositivePatch: Spike["patch"] = {
  asOf,
  aka: ["ER positive HER2 negative breast cancer", "ER-positive, HER2-negative", "oestrogen receptor positive breast cancer", "hormone-positive breast cancer", "ER+ PR+ HER2-", "ER positive PR positive HER2 negative", "hormone sensitive breast cancer"],
  terms: ["er-pr-scoring-breast", "grade-stage-receptor-breast", "nottingham-grade", "nottingham-prognostic-index", "receptor-conversion-breast", "tnm-breast-cancer-editions", "who-breast-classification"],
  links: [SRC.seerSubtypes, SRC.g148, SRC.ng101, SRC.globocan],
  notes: [
    "What this page is called on a report. Anything that says the oestrogen receptor or the progesterone receptor is positive, at 1 percent of nuclei or more, and that HER2 is 0, 1+, or 2+ without amplification, lands here. The report may give a percentage and an intensity, an Allred score out of 8 or an H score out of 300; with modern methods the result is close to all-or-nothing, so 80 percent and 100 percent mean the same thing in practice. Two results send you elsewhere as well: an oestrogen receptor figure of 1 to 10 percent, reported as ER low positive, behaves more like triple-negative disease, and a HER2 result of positive puts the HER2 page in charge of the treatment backbone while this page still explains the endocrine half.",
  ],
};

const her2PositivePatch: Spike["patch"] = {
  asOf,
  aka: ["HER2 positive ER positive breast cancer", "triple positive breast cancer", "ER positive HER2 positive", "HER2+ HR+", "HER2-positive hormone receptor-positive", "HER2 3+ breast cancer", "HER2 amplified breast cancer"],
  terms: ["her2-testing-uk-breast", "grade-stage-receptor-breast", "receptor-conversion-breast", "nottingham-grade", "tnm-breast-cancer-editions", "who-breast-classification"],
  links: [SRC.seerSubtypes, SRC.g148, SRC.rakha2023],
  notes: [
    "What this page is called on a report, and why it is your page even if you are also hormone receptor positive. HER2 positive means immunohistochemistry 3+, or 2+ with amplification on in situ hybridisation; the UK asks for the HER2 to chromosome 17 ratio, the HER2 copy number and the chromosome 17 copy number to be reported, and it counts one borderline group as positive that the American guideline counts as negative (ratio 2.0 or more with a copy number below 4). HER2 positivity runs at 13 to 20 percent of early breast cancer (RCPath G148), and most of it is hormone receptor positive too: of American cases, 9.3 percent are hormone receptor-positive and HER2-positive against 4.0 percent HER2-positive alone (SEER 21, 2019 to 2023). If that is you, this page carries the HER2 treatment that decides the backbone and the HR-positive page carries the endocrine treatment that is added to it; five-year relative survival in the two groups was 92.2 and 87.0 percent (SEER 21, 2016 to 2022).",
  ],
};

const tnbcPatch: Spike["patch"] = {
  asOf: "2026-11-11",
  aka: ["ER negative PR negative HER2 negative", "all three receptors negative", "receptor negative breast cancer", "grade 3 triple negative breast cancer", "ER- PR- HER2- breast cancer"],
  terms: ["grade-stage-receptor-breast", "nottingham-grade", "er-pr-scoring-breast", "her2-testing-uk-breast", "receptor-conversion-breast", "tnm-breast-cancer-editions", "who-breast-classification", "nottingham-prognostic-index"],
  // SRC.seerSubtypes is not repeated here: src/data/spikes/tnbc-core.ts already carries the same SEER
  // breast-subtypes URL on this record under its own label, and two labels on one URL is a duplicate React key.
  links: [SRC.g148, { label: "NCI: tumor grade and its relation to other clinical features", url: "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-grade" }],
  notes: [
    "Receptor classification, grade and stage describe different features. Triple-negative refers to the ER, PR and HER2 test results; grade describes microscopic features, and stage describes extent together with the factors in the applicable staging system. A grade does not replace receptor testing or establish an individual prognosis. ER 1 to 10 percent is ER Low Positive under ASCO/CAP criteria, with limited endocrine-benefit evidence; it should not be relabelled ER-negative from an average cohort comparison. Trial entry rules require the actual protocol.",
  ],
};

/** The in-situ and default-histology pages: routing aliases and the one sentence a reader arrives needing. */
const dcisPatch: Spike["patch"] = {
  asOf,
  aka: ["stage 0 breast cancer", "Tis (DCIS)", "non-invasive breast cancer", "in situ breast cancer", "pre-invasive breast cancer", "intraductal carcinoma of the breast"],
  terms: ["tnm-breast-cancer-editions", "carcinoma-in-situ", "terminal-duct-lobular-unit", "er-pr-scoring-breast", "nottingham-grade"],
  links: [SRC.g148, SRC.tnm9],
  notes: [
    "Why this page and not one of the receptor pages. Ductal carcinoma in situ is staged Tis (DCIS), which is stage 0, and it has not crossed the basement membrane, so it cannot have spread. That is why the receptor subtype pages, which are about systemic treatment of invasive cancer, are not where a reader with in-situ disease should start. DCIS is graded by nuclear grade and necrosis rather than by the Nottingham system used for invasive cancer, and assessing its oestrogen receptor status is not a mandatory item of the UK dataset; it is measured when endocrine treatment is being considered, using the same cut-off as for invasive cancer for want of a separate consensus.",
  ],
};

const lcisPatch: Spike["patch"] = {
  asOf,
  aka: ["Tis (LCIS)", "stage 0 lobular", "lobular neoplasia", "in situ lobular carcinoma"],
  terms: ["tnm-breast-cancer-editions", "carcinoma-in-situ", "terminal-duct-lobular-unit", "who-breast-classification"],
  // SRC.who5 is not repeated here: src/data/cancers-wave4-breast.ts already carries the Tan 2020 DOI on this
  // record under its own label.
  links: [SRC.g148],
  notes: [
    "Why lobular carcinoma in situ is on its own page rather than under a receptor subtype. It is staged Tis (LCIS) and, unlike ductal carcinoma in situ, classical lobular carcinoma in situ behaves more as a marker of risk in both breasts than as a lesion that will become an invasive cancer where it sits. The 2024 UK dataset expanded its description to cover the florid and pleomorphic forms, which are treated more like ductal carcinoma in situ.",
  ],
};

const nstPatch: Spike["patch"] = {
  asOf: "2026-11-10",
  aka: ["ordinary breast cancer", "usual type breast cancer", "no special type", "NST breast cancer", "IDC NST"],
  terms: ["who-breast-classification", "nottingham-grade", "grade-stage-receptor-breast", "terminal-duct-lobular-unit", "breast-tumour-size-on-the-report"],
  // SRC.who5 is not repeated here: src/data/cancers-wave4-breast.ts already carries the Tan 2020 DOI on this
  // record under its own label. The sixth edition (who6) is new and is what this note is about.
  links: [SRC.who6, SRC.g148],
  notes: [
    "This is the default, and the default is where the receptor result takes over. Invasive carcinoma of no special type is defined by not having a special pattern, so once a report says no special type, or invasive ductal carcinoma, everything that follows is decided by the grade, the stage and the receptors rather than by the type. The sixth edition of the WHO classification (April 2026) moves two groups into this category that used not to be here: mucinous carcinomas that are high grade, oestrogen receptor negative or HER2 positive become carcinoma of no special type with mucin production, and the unified neuroendocrine model the fifth edition applied to the breast is abandoned, with routine neuroendocrine staining of ordinary carcinoma no longer recommended.",
  ],
};

const entities = [...breastCoreTerms];

const breastCoreSpike: Spike = { cancerId: "breast-cancer", entities, patch: breastPatch, supplements };
export const breastCoreHrPositiveSpike: Spike = { cancerId: "breast-hr-positive", entities: [], patch: hrPositivePatch };
export const breastCoreHer2PositiveSpike: Spike = { cancerId: "breast-her2-positive", entities: [], patch: her2PositivePatch };
export const breastCoreTnbcSpike: Spike = { cancerId: "tnbc", entities: [], patch: tnbcPatch };
export const breastCoreDcisSpike: Spike = { cancerId: "ductal-carcinoma-in-situ", entities: [], patch: dcisPatch };
export const breastCoreLcisSpike: Spike = { cancerId: "lobular-carcinoma-in-situ", entities: [], patch: lcisPatch };
export const breastCoreNstSpike: Spike = { cancerId: "invasive-breast-carcinoma-no-special-type", entities: [], patch: nstPatch };

export default breastCoreSpike;
