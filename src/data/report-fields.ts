/**
 * Pathology report reader: the fields that appear on a pathology or staging report for six common cancer
 * groups, each mapped to a glossary term, an input shape, and plain-language readings.
 *
 * Rules:
 *  - Numeric cut-offs appear only where the cited source states them (ASCO/CAP, ISUP, IKWG, Lugano, IMWG,
 *    AJCC via CAP protocols, drug labels). Otherwise the reading is qualitative.
 *  - `termId` must be an existing glossary term; `cancers` must be existing cancer ids. Both are validated at
 *    build by src/app/report-reader/page.tsx and by src/lib/report-fields.test.ts.
 *  - Readings are evaluated in order; the first matching rule wins. A rule of `{ any: true }` is the fallback.
 */
export type ReportForm = "breast" | "prostate" | "colorectal" | "lung" | "lymphoma" | "myeloma";

export type FieldInput =
  | { kind: "number"; unit?: string; min?: number; max?: number; step?: number }
  | { kind: "select"; options: Array<{ value: string; label: string }> }
  | { kind: "text"; placeholder?: string };

export type Rule = { lt?: number; lte?: number; gt?: number; gte?: number; eq?: string | number; in?: string[]; any?: true };

export type Reading = {
  when: Rule;
  /** What the value means, in plain language. */
  means: string;
  /** What it changes about treatment or follow-up. */
  changes?: string;
};

export type ReportField = {
  id: string;
  form: ReportForm;
  /** As printed on reports. */
  label: string;
  /** Where on the report it appears or what it is short for. */
  hint?: string;
  /** Glossary term id (validated). */
  termId: string;
  input: FieldInput;
  readings: Reading[];
  source: { label: string; url: string };
};

export const REPORT_FORMS: Array<{ id: ReportForm; label: string; cancers: string[]; intro: string }> = [
  { id: "breast", label: "Breast", cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"], intro: "A breast pathology report answers three questions: how big and how far (size, nodes, grade), what drives it (ER, PR, HER2, Ki-67), and whether it was all removed (margins)." },
  { id: "prostate", label: "Prostate", cancers: ["prostate"], intro: "Prostate reports revolve around the Gleason grade group, how many biopsy cores are involved, PSA, and after surgery whether the cancer reached the edge or beyond the gland." },
  { id: "colorectal", label: "Bowel (colorectal)", cancers: ["colorectal"], intro: "Colorectal reports give depth of invasion (pT), nodes (pN), grade, and the molecular tests (MMR/MSI, RAS, BRAF) that decide whether immunotherapy or targeted drugs are options." },
  { id: "lung", label: "Lung", cancers: ["nsclc", "sclc"], intro: "Lung reports name the cell type, the stage, and, for non-small-cell cancer, the driver mutations and PD-L1 score that choose between targeted therapy, immunotherapy and chemotherapy." },
  { id: "lymphoma", label: "Lymphoma", cancers: ["dlbcl", "follicular-lymphoma", "hodgkin-lymphoma"], intro: "Lymphoma reports classify the type and its cell of origin, count high-risk features (double hit, IPI), and read the PET scan on the Deauville scale." },
  { id: "myeloma", label: "Myeloma", cancers: ["multiple-myeloma"], intro: "Myeloma reports combine blood and urine protein measurements, the bone marrow plasma cell percentage, cytogenetic risk and the R-ISS stage." },
];

// Sources reused across fields.
const CAP = { label: "CAP cancer protocol templates", url: "https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates" };
const ASCO_CAP_HER2_2023 = { label: "ASCO/CAP HER2 testing in breast cancer, 2023 update (Wolff et al.)", url: "https://ascopubs.org/doi/10.1200/JCO.22.02864" };
const ASCO_CAP_ER_2020 = { label: "ASCO/CAP ER and PgR testing in breast cancer, 2020 update (Allison et al.)", url: "https://ascopubs.org/doi/10.1200/JCO.19.02309" };
const IKWG = { label: "International Ki67 in Breast Cancer Working Group assessment (Nielsen et al., JNCI 2021)", url: "https://doi.org/10.1093/jnci/djaa201" };
const ISUP_2014 = { label: "ISUP 2014 Gleason grading consensus, grade groups (Epstein et al.)", url: "https://doi.org/10.1097/PAS.0000000000000530" };
const TAILORX = { label: "TAILORx: adjuvant chemotherapy guided by a 21-gene expression assay (Sparano et al., NEJM 2018)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1804710" };
const RCB = { label: "Residual cancer burden after neoadjuvant chemotherapy (Symmans et al., JCO 2007)", url: "https://ascopubs.org/doi/10.1200/JCO.2007.10.6823" };
const SSO_ASTRO_MARGINS = { label: "SSO/ASTRO margins consensus for invasive breast cancer (Moran et al., 2014)", url: "https://doi.org/10.1245/s10434-014-3481-4" };
const SSO_ASTRO_DCIS = { label: "SSO/ASTRO/ASCO margins consensus for DCIS (Morrow et al., 2016)", url: "https://doi.org/10.1245/s10434-016-5449-z" };
const AUA_BCR = { label: "EAU guidelines on prostate cancer: biochemical recurrence definitions", url: "https://uroweb.org/guidelines/prostate-cancer" };
const PSA_PDQ = { label: "NCI: Prostate-Specific Antigen (PSA) test fact sheet", url: "https://www.cancer.gov/types/prostate/psa-fact-sheet" };
const ITBCC = { label: "ITBCC 2016 tumour budding consensus (Lugli et al., Modern Pathology 2017)", url: "https://doi.org/10.1038/modpathol.2017.46" };
const CAP_MMR = { label: "CAP guideline: mismatch repair and microsatellite instability testing (Bartley et al., 2022)", url: "https://doi.org/10.5858/arpa.2021-0632-CP" };
const CAP_IASLC_AMP = { label: "CAP/IASLC/AMP molecular testing guideline for lung cancer (Lindeman et al., 2018)", url: "https://doi.org/10.5858/arpa.2017-0388-CP" };
const KEYTRUDA_LABEL = { label: "Pembrolizumab (Keytruda) US prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/125514s150lbl.pdf" };
const LUGANO = { label: "Lugano classification for lymphoma staging and response (Cheson et al., JCO 2014)", url: "https://ascopubs.org/doi/10.1200/JCO.2013.54.8800" };
const HANS = { label: "Hans algorithm: cell of origin by immunohistochemistry (Hans et al., Blood 2004)", url: "https://doi.org/10.1182/blood-2003-05-1545" };
const IPI = { label: "International Prognostic Index for aggressive non-Hodgkin lymphoma (NEJM 1993)", url: "https://www.nejm.org/doi/full/10.1056/NEJM199309303291402" };
const WHO_HAEM = { label: "WHO Classification of Haematolymphoid Tumours, 5th edition (WHO Blue Books)", url: "https://tumourclassification.iarc.who.int/" };
const IMWG_2014 = { label: "IMWG updated criteria for the diagnosis of multiple myeloma (Rajkumar et al., Lancet Oncology 2014)", url: "https://doi.org/10.1016/S1470-2045(14)70442-5" };
const R_ISS = { label: "Revised International Staging System for multiple myeloma (Palumbo et al., JCO 2015)", url: "https://ascopubs.org/doi/10.1200/JCO.2015.61.2267" };
const IMWG_CYTO = { label: "IMWG consensus on risk stratification in multiple myeloma (Sonneveld et al., Blood 2016)", url: "https://doi.org/10.1182/blood-2016-01-631200" };
const AJCC = { label: "AJCC Cancer Staging System, 8th edition (via CAP protocols)", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/" };

const yesNo = (yes = "Present", no = "Absent") => ({ kind: "select" as const, options: [{ value: "no", label: no }, { value: "yes", label: yes }] });

export const REPORT_FIELDS: ReportField[] = [
  // ---------------- Breast ----------------
  { id: "breast-histology", form: "breast", label: "Histological type", termId: "histology", input: { kind: "select", options: [{ value: "nst", label: "Invasive carcinoma of no special type (ductal)" }, { value: "lobular", label: "Invasive lobular carcinoma" }, { value: "dcis", label: "Ductal carcinoma in situ (DCIS) only" }, { value: "other", label: "Other special type" }] },
    readings: [
      { when: { eq: "nst" }, means: "The most common type, about 8 in 10 breast cancers. 'No special type' is not a comment on severity; grade and receptors carry that information." },
      { when: { eq: "lobular" }, means: "Cells grow in single files rather than a lump, so lobular cancers are often larger than imaging suggested and are usually ER positive.", changes: "MRI is often used to size it; lobular cancers respond less to chemotherapy and more to endocrine therapy." },
      { when: { eq: "dcis" }, means: "Cancer cells confined to the ducts with no invasion. DCIS cannot spread while it stays in situ.", changes: "Treated with surgery, often radiotherapy, and endocrine therapy if ER positive; no chemotherapy and usually no node surgery." },
      { when: { any: true }, means: "Special types (tubular, mucinous, papillary, metaplastic and others) each have their own behaviour; the report and your team will say which." },
    ], source: CAP },
  { id: "breast-size", form: "breast", label: "Invasive tumour size", hint: "largest dimension of the invasive component", termId: "primary-tumour", input: { kind: "number", unit: "mm", min: 0, max: 300 },
    readings: [
      { when: { lte: 20 }, means: "20 mm or smaller is stage T1 (T1a up to 5 mm, T1b over 5 to 10 mm, T1c over 10 to 20 mm).", changes: "Small tumours with negative nodes are usually treated with breast-conserving surgery; the receptor results decide the drugs." },
      { when: { lte: 50 }, means: "Over 20 mm up to 50 mm is stage T2.", changes: "Chemotherapy before surgery is often discussed at this size, particularly for HER2-positive or triple-negative cancers." },
      { when: { gt: 50 }, means: "Over 50 mm is stage T3 (T4 is defined by skin or chest wall involvement, not size).", changes: "Systemic therapy before surgery is usual; the extent of surgery depends on response." },
      { when: { any: true }, means: "Size is the T of TNM; the report measures the invasive part only." },
    ], source: AJCC },
  { id: "breast-grade", form: "breast", label: "Histological grade (Nottingham)", hint: "score 3 to 9, grade 1 to 3", termId: "tumour-grade", input: { kind: "select", options: [{ value: "1", label: "Grade 1 (score 3 to 5)" }, { value: "2", label: "Grade 2 (score 6 to 7)" }, { value: "3", label: "Grade 3 (score 8 to 9)" }] },
    readings: [
      { when: { eq: "1" }, means: "Cells look close to normal, form tubules and divide slowly. Grade 1 cancers grow slowly and rarely recur early." },
      { when: { eq: "2" }, means: "Intermediate. Grade alone does not decide chemotherapy here; receptor status, Ki-67 and often a genomic test add the missing information." },
      { when: { eq: "3" }, means: "Cells look abnormal and divide quickly. Grade 3 cancers respond better to chemotherapy but carry a higher recurrence risk.", changes: "Grade 3 counts towards chemotherapy in most decision tools." },
    ], source: CAP },
  { id: "breast-er", form: "breast", label: "Oestrogen receptor (ER)", hint: "percentage of cells staining", termId: "receptor", input: { kind: "number", unit: "% of cells", min: 0, max: 100 },
    readings: [
      { when: { lt: 1 }, means: "Under 1% is ER negative (ASCO/CAP 2020).", changes: "Endocrine therapy (tamoxifen, aromatase inhibitors) is not expected to help." },
      { when: { lte: 10 }, means: "1% to 10% is 'ER low positive' (ASCO/CAP 2020): these cancers behave more like ER-negative disease.", changes: "Endocrine therapy may be offered but its benefit is uncertain; the team may treat as triple-negative for chemotherapy decisions." },
      { when: { gt: 10 }, means: "Over 10% is ER positive. The cancer is fed by oestrogen.", changes: "Endocrine therapy for 5 to 10 years is a cornerstone; CDK4/6 inhibitors are added in higher-risk or metastatic disease." },
    ], source: ASCO_CAP_ER_2020 },
  { id: "breast-pr", form: "breast", label: "Progesterone receptor (PR)", termId: "receptor", input: { kind: "number", unit: "% of cells", min: 0, max: 100 },
    readings: [
      { when: { lt: 1 }, means: "Under 1% is PR negative. ER-positive, PR-negative cancers tend to be slightly less endocrine-sensitive." },
      { when: { gte: 1 }, means: "1% or more is PR positive (ASCO/CAP 2020), a sign that the oestrogen pathway is intact and endocrine therapy is likely to work." },
    ], source: ASCO_CAP_ER_2020 },
  { id: "breast-her2-ihc", form: "breast", label: "HER2 immunohistochemistry (IHC)", termId: "ihc", input: { kind: "select", options: [{ value: "0", label: "0" }, { value: "1", label: "1+" }, { value: "2", label: "2+" }, { value: "3", label: "3+" }] },
    readings: [
      { when: { eq: "0" }, means: "HER2 negative. IHC 0 with faint, incomplete staining in 10% or fewer cells is sometimes called 'HER2 ultralow' (ASCO/CAP 2023 comment).", changes: "HER2-targeted antibodies are not used; trastuzumab deruxtecan was studied in HER2-ultralow ER-positive disease (DESTINY-Breast06)." },
      { when: { eq: "1" }, means: "HER2 negative by the classical definition, but 'HER2-low'.", changes: "After chemotherapy or endocrine therapy for metastatic disease, trastuzumab deruxtecan is an option for HER2-low cancers (DESTINY-Breast04)." },
      { when: { eq: "2" }, means: "Equivocal: the ISH test decides. 2+ with a negative ISH is HER2-low; 2+ with a positive ISH is HER2 positive.", changes: "Look at the HER2 ISH line of the report." },
      { when: { eq: "3" }, means: "HER2 positive. The cancer overexpresses the HER2 protein.", changes: "Trastuzumab-based therapy (often with pertuzumab, and T-DXd or T-DM1 later) is standard and has transformed outcomes." },
    ], source: ASCO_CAP_HER2_2023 },
  { id: "breast-her2-ish", form: "breast", label: "HER2 in situ hybridisation (ISH/FISH)", hint: "reported as ratio and copy number, or as a group", termId: "amplification", input: { kind: "select", options: [{ value: "neg", label: "Not amplified (negative)" }, { value: "pos", label: "Amplified (positive)" }, { value: "eq", label: "Equivocal / groups 2 to 4" }] },
    readings: [
      { when: { eq: "neg" }, means: "The HER2 gene is not amplified. With IHC 1+ or 2+, the cancer is HER2-low; with IHC 0, HER2 negative." },
      { when: { eq: "pos" }, means: "The HER2 gene is amplified: HER2 positive (ASCO/CAP 2018 group 1 is a ratio of 2.0 or more with 4 or more copies per cell).", changes: "HER2-targeted therapy is indicated." },
      { when: { eq: "eq" }, means: "An intermediate result that ASCO/CAP resolves by combining the ISH numbers with the IHC score; the final call is on the report." },
    ], source: ASCO_CAP_HER2_2023 },
  { id: "breast-ki67", form: "breast", label: "Ki-67", hint: "percentage of cells in the cell cycle", termId: "proliferation", input: { kind: "number", unit: "%", min: 0, max: 100 },
    readings: [
      { when: { lte: 5 }, means: "5% or lower is 'low' by the International Ki67 Working Group: the cells are dividing slowly.", changes: "In ER-positive, HER2-negative, node-negative cancer a low Ki-67 supports omitting chemotherapy." },
      { when: { lt: 30 }, means: "Between 5% and 30% the Working Group says Ki-67 alone is not reliable enough to decide treatment.", changes: "A genomic assay (Oncotype DX, Prosigna, EndoPredict) or other features fill the gap." },
      { when: { gte: 30 }, means: "30% or higher is 'high': fast-dividing cells.", changes: "Supports chemotherapy in ER-positive disease; in the monarchE trial Ki-67 of 20% or more was one route into adjuvant abemaciclib." },
    ], source: IKWG },
  { id: "breast-lvi", form: "breast", label: "Lymphovascular invasion (LVI)", termId: "metastasis", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No cancer cells were seen inside lymph or blood vessels around the tumour." },
      { when: { eq: "yes" }, means: "Cancer cells were seen inside small vessels, a route by which cells can reach the nodes. LVI is an adverse feature but not a stage in itself.", changes: "Feeds into radiotherapy and chemotherapy decisions, especially when nodes are negative." },
    ], source: CAP },
  { id: "breast-margins", form: "breast", label: "Margins", termId: "invasive-cancer", input: { kind: "select", options: [{ value: "neg", label: "Negative (no ink on tumour)" }, { value: "close", label: "Close (under 2 mm), DCIS" }, { value: "pos", label: "Positive (tumour at the inked edge)" }] },
    readings: [
      { when: { eq: "neg" }, means: "For invasive cancer, 'no ink on tumour' is an adequate margin (SSO/ASTRO 2014); wider margins do not lower recurrence further." },
      { when: { eq: "close" }, means: "For DCIS the recommended margin is 2 mm (SSO/ASTRO/ASCO 2016); closer margins raise local recurrence risk.", changes: "Re-excision is often discussed for DCIS under 2 mm; for invasive cancer with no ink on tumour it usually is not." },
      { when: { eq: "pos" }, means: "Cancer reaches the cut edge, so some may remain in the breast.", changes: "Re-excision or mastectomy is usually recommended before radiotherapy." },
    ], source: SSO_ASTRO_MARGINS },
  { id: "breast-dcis-margin-source", form: "breast", label: "DCIS margin width", hint: "when the report gives a distance for in situ disease", termId: "in-situ", input: { kind: "number", unit: "mm", min: 0, max: 50 },
    readings: [
      { when: { lt: 2 }, means: "Under 2 mm. The 2016 SSO/ASTRO/ASCO consensus adopted 2 mm as the standard margin for DCIS treated with breast conservation and radiotherapy.", changes: "Re-excision is considered, weighing the amount of DCIS near the edge and the planned radiotherapy." },
      { when: { gte: 2 }, means: "2 mm or more meets the consensus margin for DCIS; wider margins add no benefit." },
    ], source: SSO_ASTRO_DCIS },
  { id: "breast-pn", form: "breast", label: "Lymph nodes (pN)", hint: "number of nodes with cancer", termId: "lymph-node", input: { kind: "number", unit: "positive nodes", min: 0, max: 60 },
    readings: [
      { when: { eq: 0 }, means: "Node negative (pN0): no spread to the axillary nodes was found.", changes: "Lower stage; in ER-positive disease a genomic test often decides whether chemotherapy adds anything." },
      { when: { lte: 3 }, means: "1 to 3 positive nodes is pN1 (AJCC 8th edition).", changes: "Radiotherapy to the nodes and systemic therapy are usually recommended; in ER-positive disease genomic tests (RxPONDER) still guide chemotherapy for post-menopausal women." },
      { when: { lte: 9 }, means: "4 to 9 positive nodes is pN2.", changes: "Chemotherapy, nodal radiotherapy and, in ER-positive disease, adjuvant CDK4/6 inhibition are standard considerations." },
      { when: { gte: 10 }, means: "10 or more positive nodes is pN3, stage IIIC when combined with any T.", changes: "Full systemic and radiotherapy treatment; close surveillance." },
    ], source: AJCC },
  { id: "breast-m", form: "breast", label: "Distant metastasis (M)", termId: "metastasis", input: { kind: "select", options: [{ value: "m0", label: "M0 (none found)" }, { value: "m1", label: "M1 (present)" }] },
    readings: [
      { when: { eq: "m0" }, means: "No spread beyond the breast and regional nodes was found on staging.", changes: "Treatment aims at cure." },
      { when: { eq: "m1" }, means: "The cancer has spread to distant organs (stage IV).", changes: "Treatment aims to control the disease for as long as possible with the best quality of life; many people live for years, especially with ER-positive or HER2-positive disease." },
    ], source: AJCC },
  { id: "breast-oncotype", form: "breast", label: "Oncotype DX Recurrence Score", hint: "0 to 100, ER-positive HER2-negative cancer", termId: "gene-expression", input: { kind: "number", min: 0, max: 100 },
    readings: [
      { when: { lte: 10 }, means: "0 to 10: very low risk. In TAILORx, endocrine therapy alone gave excellent outcomes." },
      { when: { lte: 25 }, means: "11 to 25: TAILORx found no benefit from adding chemotherapy in women over 50; in women 50 or younger with scores 16 to 25 there was a small benefit.", changes: "For most post-menopausal women, chemotherapy can be omitted; younger women discuss the trade-off." },
      { when: { gt: 25 }, means: "26 to 100: higher risk of distant recurrence.", changes: "Chemotherapy followed by endocrine therapy is generally recommended." },
    ], source: TAILORX },
  { id: "breast-rcb", form: "breast", label: "Residual cancer burden (RCB) after neoadjuvant therapy", termId: "rcb", input: { kind: "select", options: [{ value: "0", label: "RCB 0 (pathological complete response)" }, { value: "1", label: "RCB I" }, { value: "2", label: "RCB II" }, { value: "3", label: "RCB III" }] },
    readings: [
      { when: { eq: "0" }, means: "No invasive cancer left in the breast or nodes: a pathological complete response, the best possible response.", changes: "Excellent prognosis, particularly in triple-negative and HER2-positive disease; adjuvant treatment is often de-escalated." },
      { when: { eq: "1" }, means: "Minimal residual disease, with outcomes close to a complete response." },
      { when: { eq: "2" }, means: "Moderate residual disease.", changes: "Post-surgery treatment is often escalated (for example capecitabine in TNBC, T-DM1 in HER2-positive disease)." },
      { when: { eq: "3" }, means: "Extensive residual disease: the cancer responded little to the pre-surgery treatment.", changes: "Different adjuvant drugs and trials are discussed." },
    ], source: RCB },
  { id: "breast-pcr", form: "breast", label: "Pathological complete response (pCR)", hint: "ypT0/is ypN0", termId: "pcr", input: yesNo("Achieved", "Not achieved"),
    readings: [
      { when: { eq: "yes" }, means: "No invasive cancer remained in breast or nodes after pre-surgery treatment (in situ disease may remain).", changes: "Strongly favourable; in HER2-positive and triple-negative cancer it predicts long-term cure rates." },
      { when: { eq: "no" }, means: "Some invasive cancer remained. How much (see RCB) matters more than the yes/no.", changes: "Opens options such as T-DM1 (KATHERINE) or capecitabine (CREATE-X) depending on subtype." },
    ], source: RCB },

  // ---------------- Prostate ----------------
  { id: "prostate-psa", form: "prostate", label: "PSA", hint: "prostate-specific antigen in blood", termId: "psa", input: { kind: "number", unit: "ng/mL", min: 0, max: 10000, step: 0.1 },
    readings: [
      { when: { any: true }, means: "PSA is a protein made by normal and cancerous prostate tissue. There is no single normal value: it rises with age, prostate size, infection and recent ejaculation. The NCI notes that no level rules cancer in or out, and UK referral thresholds are age-specific.", changes: "A raised PSA leads to MRI and, if needed, biopsy; after treatment, PSA is the main way recurrence is detected." },
    ], source: PSA_PDQ },
  { id: "prostate-grade-group", form: "prostate", label: "Gleason grade group", hint: "grade group 1 to 5, or Gleason score such as 3+4", termId: "gleason-grade-group", input: { kind: "select", options: [{ value: "1", label: "Grade group 1 (Gleason 3+3=6)" }, { value: "2", label: "Grade group 2 (3+4=7)" }, { value: "3", label: "Grade group 3 (4+3=7)" }, { value: "4", label: "Grade group 4 (Gleason 8)" }, { value: "5", label: "Grade group 5 (Gleason 9 to 10)" }] },
    readings: [
      { when: { eq: "1" }, means: "The lowest grade of prostate cancer. Grade group 1 rarely spreads.", changes: "Active surveillance is the usual recommendation." },
      { when: { eq: "2" }, means: "Mostly pattern 3 with some pattern 4: favourable intermediate risk when PSA and stage are low.", changes: "Surveillance for some, treatment for others, depending on how much pattern 4 there is." },
      { when: { eq: "3" }, means: "Mostly pattern 4: unfavourable intermediate risk.", changes: "Treatment (surgery or radiotherapy, often with short hormone therapy) is usually advised." },
      { when: { eq: "4" }, means: "High grade (Gleason 8).", changes: "High-risk disease: radiotherapy with longer hormone therapy, or surgery, with staging scans first." },
      { when: { eq: "5" }, means: "The highest grade (Gleason 9 or 10).", changes: "High-risk disease; PSMA PET staging and combined treatment are usual." },
    ], source: ISUP_2014 },
  { id: "prostate-pattern4", form: "prostate", label: "Percentage pattern 4", hint: "in grade group 2 or 3", termId: "gleason-grade-group", input: { kind: "number", unit: "%", min: 0, max: 100 },
    readings: [
      { when: { any: true }, means: "The share of the cancer that is the more aggressive Gleason pattern 4. ISUP recommends reporting it because a small amount of pattern 4 behaves closer to grade group 1 and a large amount closer to grade group 3.", changes: "Helps decide between surveillance and treatment in grade group 2." },
    ], source: ISUP_2014 },
  { id: "prostate-cores", form: "prostate", label: "Positive biopsy cores", hint: "for example 3 of 12", termId: "biopsy", input: { kind: "text", placeholder: "e.g. 3 of 12" },
    readings: [
      { when: { any: true }, means: "How many of the needle samples contained cancer, and how much of each. More cores, and more of each core, mean a larger tumour.", changes: "Feeds risk grouping and surveillance eligibility together with grade and PSA." },
    ], source: CAP },
  { id: "prostate-epe", form: "prostate", label: "Extraprostatic extension (pT3a)", termId: "tnm-staging", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "The cancer was confined within the prostate capsule (pT2)." },
      { when: { eq: "yes" }, means: "Cancer has grown through the capsule into the surrounding fat: stage pT3a.", changes: "Higher recurrence risk after surgery; PSA is watched closely and radiotherapy may be offered if it rises." },
    ], source: AJCC },
  { id: "prostate-svi", form: "prostate", label: "Seminal vesicle invasion (pT3b)", termId: "tnm-staging", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "The seminal vesicles were free of cancer." },
      { when: { eq: "yes" }, means: "Cancer has reached the seminal vesicles: stage pT3b, an adverse feature.", changes: "Adjuvant or early salvage radiotherapy and hormone therapy are discussed." },
    ], source: AJCC },
  { id: "prostate-margins", form: "prostate", label: "Surgical margins", termId: "invasive-cancer", input: yesNo("Positive", "Negative"),
    readings: [
      { when: { eq: "no" }, means: "No cancer at the cut edge of the removed prostate." },
      { when: { eq: "yes" }, means: "Cancer touches the inked edge; some cells may remain.", changes: "Raises recurrence risk; radiotherapy is considered if PSA rises." },
    ], source: CAP },
  { id: "prostate-pn", form: "prostate", label: "Lymph nodes (pN)", termId: "lymph-node", input: { kind: "select", options: [{ value: "n0", label: "pN0 (no node involvement)" }, { value: "n1", label: "pN1 (regional nodes involved)" }, { value: "nx", label: "pNX (nodes not removed)" }] },
    readings: [
      { when: { eq: "n0" }, means: "The pelvic nodes removed contained no cancer." },
      { when: { eq: "n1" }, means: "Cancer in pelvic lymph nodes: stage IV by TNM but often still treatable with curative intent when limited.", changes: "Hormone therapy, often with radiotherapy, is standard." },
      { when: { eq: "nx" }, means: "Nodes were not sampled, so their status is unknown; imaging stands in." },
    ], source: AJCC },
  { id: "prostate-pni", form: "prostate", label: "Perineural invasion", termId: "invasive-cancer", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No cancer seen along nerves." },
      { when: { eq: "yes" }, means: "Cancer cells tracking along nerves, a common route out of the prostate. Its independent weight is debated; it is a minor adverse feature." },
    ], source: CAP },
  { id: "prostate-cribriform", form: "prostate", label: "Cribriform or intraductal pattern", termId: "histology", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No cribriform or intraductal growth was seen." },
      { when: { eq: "yes" }, means: "Sieve-like (cribriform) growth or cancer spreading inside ducts are adverse patterns ISUP recommends reporting because they predict worse outcomes within the same grade group.", changes: "Weighs against active surveillance." },
    ], source: ISUP_2014 },
  { id: "prostate-psa-post-op", form: "prostate", label: "PSA after prostatectomy", hint: "biochemical recurrence", termId: "biochemical-recurrence", input: { kind: "number", unit: "ng/mL", min: 0, max: 1000, step: 0.01 },
    readings: [
      { when: { lt: 0.2 }, means: "Below 0.2 ng/mL. After the prostate is removed, PSA should fall to undetectable; values under 0.2 do not meet the usual definition of recurrence." },
      { when: { gte: 0.2 }, means: "0.2 ng/mL or higher, confirmed on a repeat test, is the standard definition of biochemical recurrence after radical prostatectomy (EAU/AUA).", changes: "PSMA PET is used to find where the cancer is; salvage radiotherapy, with or without hormone therapy, is the usual next step." },
    ], source: AUA_BCR },

  // ---------------- Colorectal ----------------
  { id: "crc-site", form: "colorectal", label: "Tumour site (sidedness)", termId: "sidedness", input: { kind: "select", options: [{ value: "right", label: "Right colon (caecum to transverse)" }, { value: "left", label: "Left colon (splenic flexure to sigmoid)" }, { value: "rectum", label: "Rectum" }] },
    readings: [
      { when: { eq: "right" }, means: "Right-sided cancers are more often MSI-high and BRAF-mutant, and in metastatic disease respond less to EGFR antibodies." },
      { when: { eq: "left" }, means: "Left-sided cancers are more often RAS wild-type and respond better to EGFR antibodies (cetuximab, panitumumab) when RAS is not mutated." },
      { when: { eq: "rectum" }, means: "Rectal cancers are staged with MRI and often treated with radiotherapy or chemoradiotherapy before surgery; the circumferential margin matters." },
    ], source: CAP },
  { id: "crc-pt", form: "colorectal", label: "Depth of invasion (pT)", termId: "tnm-staging", input: { kind: "select", options: [{ value: "t1", label: "pT1 (into submucosa)" }, { value: "t2", label: "pT2 (into muscularis propria)" }, { value: "t3", label: "pT3 (through the muscle into surrounding tissue)" }, { value: "t4a", label: "pT4a (through the outer surface, peritoneum)" }, { value: "t4b", label: "pT4b (into adjacent organs)" }] },
    readings: [
      { when: { eq: "t1" }, means: "Confined to the inner layers. Many pT1 cancers in polyps are cured by removal alone when margins and other features are favourable." },
      { when: { eq: "t2" }, means: "Into but not through the muscle wall. Surgery alone cures most node-negative pT2 cancers." },
      { when: { eq: "t3" }, means: "Through the muscle wall into the fat around the bowel. The most common depth at diagnosis.", changes: "With negative nodes (stage II), chemotherapy is considered only if other high-risk features are present." },
      { when: { eq: "t4a" }, means: "Reached the outer lining of the bowel: a high-risk feature even when nodes are negative.", changes: "Chemotherapy is usually recommended for stage II pT4 disease." },
      { when: { eq: "t4b" }, means: "Grown into a neighbouring organ.", changes: "Surgery removes the involved organ en bloc; chemotherapy is recommended." },
    ], source: AJCC },
  { id: "crc-pn", form: "colorectal", label: "Lymph nodes with cancer (pN)", termId: "lymph-node", input: { kind: "number", unit: "positive nodes", min: 0, max: 80 },
    readings: [
      { when: { eq: 0 }, means: "Node negative (pN0). Stage I or II depending on depth." },
      { when: { lte: 3 }, means: "1 to 3 positive nodes is pN1: stage III.", changes: "Adjuvant chemotherapy is standard; 3 months of CAPOX is an option for lower-risk stage III (IDEA)." },
      { when: { gte: 4 }, means: "4 or more positive nodes is pN2 (4 to 6 is N2a, 7 or more N2b): higher-risk stage III.", changes: "6 months of adjuvant chemotherapy is usually recommended." },
    ], source: AJCC },
  { id: "crc-nodes-examined", form: "colorectal", label: "Number of nodes examined", termId: "lymph-node", input: { kind: "number", min: 0, max: 150 },
    readings: [
      { when: { lt: 12 }, means: "Fewer than 12 nodes examined. CAP and NCCN regard 12 as the minimum for reliable staging; with fewer, a 'node negative' result is less certain.", changes: "Some stage II patients with under 12 nodes are offered chemotherapy on that basis." },
      { when: { gte: 12 }, means: "12 or more nodes examined meets the quality standard, so a negative node result is reliable." },
    ], source: CAP },
  { id: "crc-grade", form: "colorectal", label: "Differentiation (grade)", termId: "differentiation", input: { kind: "select", options: [{ value: "low", label: "Low grade (well or moderately differentiated)" }, { value: "high", label: "High grade (poorly differentiated or undifferentiated)" }] },
    readings: [
      { when: { eq: "low" }, means: "Cells still form recognisable glands. The majority of colorectal cancers." },
      { when: { eq: "high" }, means: "Cells have lost gland structure. A high-risk feature in stage II, unless the cancer is MSI-high, where high grade is common and less meaningful." },
    ], source: CAP },
  { id: "crc-lvi", form: "colorectal", label: "Lymphovascular invasion", termId: "metastasis", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No cancer inside small vessels." },
      { when: { eq: "yes" }, means: "Cancer cells inside lymph or blood vessels: a high-risk feature in stage II.", changes: "Counts towards offering chemotherapy in node-negative disease." },
    ], source: CAP },
  { id: "crc-pni", form: "colorectal", label: "Perineural invasion", termId: "invasive-cancer", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No cancer along nerves." },
      { when: { eq: "yes" }, means: "Cancer spreading along nerves, a recognised high-risk feature in stage II colorectal cancer." },
    ], source: CAP },
  { id: "crc-budding", form: "colorectal", label: "Tumour budding", hint: "Bd1 to Bd3, or buds per 0.785 mm² hotspot", termId: "activating-invasion-metastasis", input: { kind: "select", options: [{ value: "bd1", label: "Bd1 (low, 0 to 4 buds)" }, { value: "bd2", label: "Bd2 (intermediate, 5 to 9 buds)" }, { value: "bd3", label: "Bd3 (high, 10 or more buds)" }] },
    readings: [
      { when: { eq: "bd1" }, means: "Few single cells or small clusters at the invasive edge (0 to 4 per 0.785 mm² field, ITBCC 2016)." },
      { when: { eq: "bd2" }, means: "Intermediate budding (5 to 9 buds)." },
      { when: { eq: "bd3" }, means: "High budding (10 or more buds): an independent predictor of node metastasis in pT1 cancers and of recurrence in stage II.", changes: "Weighs towards surgery after polypectomy of a pT1 cancer, and towards chemotherapy in stage II." },
    ], source: ITBCC },
  { id: "crc-crm", form: "colorectal", label: "Circumferential resection margin (rectal)", termId: "invasive-cancer", input: { kind: "number", unit: "mm", min: 0, max: 50, step: 0.5 },
    readings: [
      { when: { lte: 1 }, means: "1 mm or less is an involved circumferential margin by the usual definition, associated with local recurrence.", changes: "Post-operative treatment and closer surveillance are discussed." },
      { when: { gt: 1 }, means: "More than 1 mm: the margin is clear." },
    ], source: CAP },
  { id: "crc-mmr", form: "colorectal", label: "MMR / MSI status", hint: "immunohistochemistry for MLH1, MSH2, MSH6, PMS2, or a PCR/NGS MSI test", termId: "msi", input: { kind: "select", options: [{ value: "pmmr", label: "pMMR / MSS (proficient, stable)" }, { value: "dmmr", label: "dMMR / MSI-H (deficient, unstable)" }] },
    readings: [
      { when: { eq: "pmmr" }, means: "Mismatch repair is intact. The great majority of colorectal cancers.", changes: "Immunotherapy alone is not effective; chemotherapy and targeted drugs are the tools." },
      { when: { eq: "dmmr" }, means: "The cell's DNA spell-checker is missing, so the tumour carries many mutations and is highly visible to the immune system. Can be inherited (Lynch syndrome) or acquired (MLH1 methylation, often with BRAF V600E).", changes: "Checkpoint immunotherapy is first-line for metastatic dMMR disease and is being used before surgery; germline testing for Lynch syndrome is recommended; in stage II, fluoropyrimidine alone adds little." },
    ], source: CAP_MMR },
  { id: "crc-ras", form: "colorectal", label: "KRAS / NRAS", termId: "driver-mutation", input: { kind: "select", options: [{ value: "wt", label: "Wild-type (no mutation)" }, { value: "g12c", label: "KRAS G12C" }, { value: "other", label: "Other KRAS or NRAS mutation" }] },
    readings: [
      { when: { eq: "wt" }, means: "No mutation in KRAS or NRAS: the RAS pathway is not switched on by mutation.", changes: "EGFR antibodies (cetuximab, panitumumab) can work, best in left-sided tumours." },
      { when: { eq: "g12c" }, means: "A specific KRAS mutation with its own inhibitors.", changes: "Sotorasib or adagrasib combined with an EGFR antibody is approved after chemotherapy; EGFR antibody alone does not work." },
      { when: { eq: "other" }, means: "A RAS mutation (about half of colorectal cancers).", changes: "EGFR antibodies are not used; chemotherapy with bevacizumab is the usual backbone; pan-RAS inhibitors are in trials." },
    ], source: CAP },
  { id: "crc-braf", form: "colorectal", label: "BRAF V600E", termId: "driver-mutation", input: yesNo("Mutated", "Not mutated"),
    readings: [
      { when: { eq: "no" }, means: "No BRAF V600E mutation." },
      { when: { eq: "yes" }, means: "BRAF V600E is present (about 1 in 10 colorectal cancers), a poor-prognosis marker in metastatic disease. In dMMR tumours it points to a sporadic rather than inherited cause.", changes: "Encorafenib plus cetuximab is approved after first-line therapy (BEACON) and is now used first-line with chemotherapy (BREAKWATER)." },
    ], source: CAP },
  { id: "crc-her2", form: "colorectal", label: "HER2", termId: "amplification", input: yesNo("Amplified / overexpressed", "Not amplified"),
    readings: [
      { when: { eq: "no" }, means: "HER2 is not amplified, which is the case in almost all colorectal cancers." },
      { when: { eq: "yes" }, means: "HER2 amplified (a few percent of colorectal cancers, mostly RAS wild-type).", changes: "Tucatinib plus trastuzumab (MOUNTAINEER) and trastuzumab deruxtecan are options in metastatic disease." },
    ], source: CAP },
  { id: "crc-deposits", form: "colorectal", label: "Tumour deposits", termId: "metastasis", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No separate nodules of cancer in the fat away from the main tumour." },
      { when: { eq: "yes" }, means: "Nodules of cancer in the surrounding fat that are not lymph nodes. With no positive nodes this is staged pN1c, stage III.", changes: "Adjuvant chemotherapy is recommended as for node-positive disease." },
    ], source: AJCC },
  { id: "crc-cea", form: "colorectal", label: "CEA", hint: "carcinoembryonic antigen in blood", termId: "tumour-marker", input: { kind: "number", unit: "ng/mL", min: 0, max: 100000, step: 0.1 },
    readings: [
      { when: { any: true }, means: "A blood marker raised in many, but not all, colorectal cancers; smoking and benign conditions raise it too. The laboratory's reference range decides 'raised'. It is most useful for tracking response and recurrence after treatment, not for diagnosis." },
    ], source: CAP },

  // ---------------- Lung ----------------
  { id: "lung-histology", form: "lung", label: "Histological type", termId: "histology", input: { kind: "select", options: [{ value: "adeno", label: "Adenocarcinoma" }, { value: "squamous", label: "Squamous cell carcinoma" }, { value: "sclc", label: "Small-cell lung cancer" }, { value: "other", label: "Large cell / other non-small-cell" }] },
    readings: [
      { when: { eq: "adeno" }, means: "The most common type, often in never-smokers, and the type most likely to carry a targetable driver mutation.", changes: "Molecular testing (EGFR, ALK, ROS1, BRAF, KRAS, MET, RET, NTRK, HER2) and PD-L1 are essential before choosing treatment." },
      { when: { eq: "squamous" }, means: "Arises from the airway lining, strongly linked to smoking. Driver mutations are uncommon.", changes: "PD-L1 guides immunotherapy; molecular testing is still considered in never-smokers." },
      { when: { eq: "sclc" }, means: "A fast-growing neuroendocrine cancer, staged as limited or extensive.", changes: "Chemotherapy with immunotherapy (and radiotherapy in limited stage) starts quickly; tarlatamab is an option after progression." },
      { when: { eq: "other" }, means: "Less common non-small-cell types; treated along non-small-cell lines with molecular and PD-L1 testing." },
    ], source: CAP },
  { id: "lung-size", form: "lung", label: "Tumour size (pT)", termId: "tnm-staging", input: { kind: "number", unit: "cm", min: 0, max: 30, step: 0.1 },
    readings: [
      { when: { lte: 1 }, means: "1 cm or smaller is T1a (AJCC 8th edition)." },
      { when: { lte: 2 }, means: "Over 1 to 2 cm is T1b." },
      { when: { lte: 3 }, means: "Over 2 to 3 cm is T1c." },
      { when: { lte: 5 }, means: "Over 3 to 5 cm is T2 (T2a to 4 cm, T2b over 4 to 5 cm).", changes: "From 4 cm, adjuvant chemotherapy is considered after resection even with negative nodes." },
      { when: { lte: 7 }, means: "Over 5 to 7 cm is T3." },
      { when: { gt: 7 }, means: "Over 7 cm is T4 by size alone (T4 is also assigned for invasion of the mediastinum, heart, great vessels, spine or carina)." },
    ], source: AJCC },
  { id: "lung-pn", form: "lung", label: "Lymph nodes (pN)", termId: "lymph-node", input: { kind: "select", options: [{ value: "n0", label: "N0 (none)" }, { value: "n1", label: "N1 (hilar or intrapulmonary, same side)" }, { value: "n2", label: "N2 (mediastinal or subcarinal, same side)" }, { value: "n3", label: "N3 (opposite side or supraclavicular)" }] },
    readings: [
      { when: { eq: "n0" }, means: "No node involvement (N0): the cancer has not reached the lymph nodes examined." },
      { when: { eq: "n1" }, means: "Nodes within the lung or at its root on the same side: stage II when resectable.", changes: "Adjuvant chemotherapy (plus osimertinib for EGFR-mutant, or immunotherapy for PD-L1-positive cancers) is standard after surgery." },
      { when: { eq: "n2" }, means: "Nodes in the mediastinum on the same side: stage III.", changes: "Treatment is multimodal: chemoradiotherapy with durvalumab, or chemo-immunotherapy before surgery, depending on extent." },
      { when: { eq: "n3" }, means: "Nodes on the opposite side or above the collarbone: stage IIIB or IIIC, treated without surgery." },
    ], source: AJCC },
  { id: "lung-vpi", form: "lung", label: "Visceral pleural invasion", termId: "tnm-staging", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "The cancer has not breached the lung's lining." },
      { when: { eq: "yes" }, means: "The cancer has grown into the lung's outer lining, which upstages a tumour of 3 cm or less to T2a." },
    ], source: AJCC },
  { id: "lung-stas", form: "lung", label: "Spread through air spaces (STAS)", termId: "activating-invasion-metastasis", input: yesNo(),
    readings: [
      { when: { eq: "no" }, means: "No tumour cells floating in the air spaces beyond the tumour edge." },
      { when: { eq: "yes" }, means: "Clusters of tumour cells in the air spaces beyond the edge, associated with higher recurrence after limited (sub-lobar) resection." },
    ], source: CAP },
  { id: "lung-margins", form: "lung", label: "Margins", termId: "invasive-cancer", input: yesNo("Positive (R1)", "Negative (R0)"),
    readings: [
      { when: { eq: "no" }, means: "A complete resection (R0): no cancer at the cut edges." },
      { when: { eq: "yes" }, means: "Cancer at the bronchial or parenchymal margin (R1).", changes: "Further surgery or radiotherapy is discussed." },
    ], source: CAP },
  { id: "lung-pdl1", form: "lung", label: "PD-L1 tumour proportion score (TPS)", termId: "tps", input: { kind: "number", unit: "%", min: 0, max: 100 },
    readings: [
      { when: { lt: 1 }, means: "Under 1%: PD-L1 negative.", changes: "Immunotherapy still helps when combined with chemotherapy (KEYNOTE-189, -407), but not alone." },
      { when: { lt: 50 }, means: "1% to 49%: PD-L1 positive, low expression. Pembrolizumab alone is licensed from 1% (KEYNOTE-042), but chemo-immunotherapy is usually preferred in this range." },
      { when: { gte: 50 }, means: "50% or higher: high PD-L1 expression.", changes: "Pembrolizumab (or cemiplimab, atezolizumab) alone is a standard first-line option in the absence of a driver mutation (KEYNOTE-024)." },
    ], source: KEYTRUDA_LABEL },
  { id: "lung-egfr", form: "lung", label: "EGFR", termId: "egfr-exon19-l858r", input: { kind: "select", options: [{ value: "none", label: "No EGFR mutation" }, { value: "common", label: "Exon 19 deletion or L858R" }, { value: "ex20", label: "Exon 20 insertion" }, { value: "other", label: "Other or uncommon mutation" }] },
    readings: [
      { when: { eq: "none" }, means: "No EGFR mutation; other drivers and PD-L1 decide treatment." },
      { when: { eq: "common" }, means: "One of the two 'classical' EGFR mutations, found in about 1 in 7 adenocarcinomas in Western populations and more in East Asian never-smokers.", changes: "Osimertinib (alone or with chemotherapy) or amivantamab plus lazertinib first-line; adjuvant osimertinib after resection (ADAURA). Immunotherapy alone works poorly." },
      { when: { eq: "ex20" }, means: "A less common EGFR alteration that classical EGFR inhibitors do not block well.", changes: "Amivantamab with chemotherapy is the approved first-line option (PAPILLON)." },
      { when: { eq: "other" }, means: "Uncommon EGFR variants (G719X, L861Q, S768I and others) respond variably to EGFR inhibitors; afatinib and osimertinib have data." },
    ], source: CAP_IASLC_AMP },
  { id: "lung-alk", form: "lung", label: "ALK rearrangement", termId: "gene-fusion", input: yesNo("Positive", "Negative"),
    readings: [
      { when: { eq: "no" }, means: "No ALK fusion was found; other drivers and PD-L1 decide treatment." },
      { when: { eq: "yes" }, means: "The ALK gene is fused to a partner and drives the cancer (about 1 in 20 adenocarcinomas, often younger never-smokers).", changes: "Alectinib, lorlatinib or brigatinib first-line; adjuvant alectinib after resection (ALINA). Immunotherapy alone is ineffective." },
    ], source: CAP_IASLC_AMP },
  { id: "lung-kras", form: "lung", label: "KRAS", termId: "driver-mutation", input: { kind: "select", options: [{ value: "none", label: "No KRAS mutation" }, { value: "g12c", label: "KRAS G12C" }, { value: "other", label: "Other KRAS mutation" }] },
    readings: [
      { when: { eq: "none" }, means: "No KRAS mutation was found; look at the other driver results and PD-L1." },
      { when: { eq: "g12c" }, means: "The most common single driver in Western lung adenocarcinoma, mostly in smokers.", changes: "Chemo-immunotherapy first-line; sotorasib or adagrasib after progression." },
      { when: { eq: "other" }, means: "KRAS G12D, G12V and others have no approved inhibitor yet; treatment follows PD-L1 and chemo-immunotherapy, with pan-RAS inhibitors in trials." },
    ], source: CAP_IASLC_AMP },
  { id: "lung-other-drivers", form: "lung", label: "Other drivers (ROS1, RET, MET, BRAF, NTRK, HER2)", termId: "driver-mutation", input: { kind: "text", placeholder: "e.g. ROS1 fusion, MET exon 14, BRAF V600E" },
    readings: [
      { when: { any: true }, means: "Each of these rarer drivers has an approved targeted drug: ROS1 (crizotinib, entrectinib, repotrectinib), RET (selpercatinib), MET exon 14 (capmatinib, tepotinib), BRAF V600E (dabrafenib plus trametinib), NTRK (larotrectinib, entrectinib), HER2 mutation (trastuzumab deruxtecan). Guidelines recommend testing all of them, ideally by next-generation sequencing, before starting treatment for advanced non-squamous cancer." },
    ], source: CAP_IASLC_AMP },
  { id: "lung-grade", form: "lung", label: "Adenocarcinoma grade (IASLC)", hint: "predominant and high-grade patterns", termId: "tumour-grade", input: { kind: "select", options: [{ value: "1", label: "Grade 1 (lepidic predominant)" }, { value: "2", label: "Grade 2 (acinar or papillary predominant)" }, { value: "3", label: "Grade 3 (solid, micropapillary or complex glandular 20% or more)" }] },
    readings: [
      { when: { eq: "1" }, means: "Cancer growing along intact alveolar walls: the least aggressive pattern." },
      { when: { eq: "2" }, means: "Intermediate patterns forming glands or fronds." },
      { when: { eq: "3" }, means: "20% or more of solid, micropapillary or complex glandular growth: the highest grade in the 2020 IASLC system, with more recurrence after surgery." },
    ], source: CAP },

  // ---------------- Lymphoma ----------------
  { id: "lym-type", form: "lymphoma", label: "Lymphoma type", termId: "lymphoma-type", input: { kind: "select", options: [{ value: "dlbcl", label: "Diffuse large B-cell lymphoma" }, { value: "fl", label: "Follicular lymphoma" }, { value: "chl", label: "Classical Hodgkin lymphoma" }, { value: "other", label: "Other" }] },
    readings: [
      { when: { eq: "dlbcl" }, means: "An aggressive but curable B-cell lymphoma, the most common type.", changes: "R-CHOP or pola-R-CHP chemo-immunotherapy aims for cure; CAR-T and bispecific antibodies are options if it returns." },
      { when: { eq: "fl" }, means: "A slow-growing (indolent) B-cell lymphoma, usually incurable but very treatable, often living decades.", changes: "Watch and wait if no symptoms; rituximab-based therapy when needed; bispecifics and CAR-T later." },
      { when: { eq: "chl" }, means: "Hodgkin lymphoma, recognised by Reed-Sternberg cells; highly curable at every stage.", changes: "ABVD-type chemotherapy with brentuximab or nivolumab; PET guides how much treatment." },
      { when: { eq: "other" }, means: "Over 80 lymphoma types exist in the WHO classification; the report will name yours and your team will explain it." },
    ], source: WHO_HAEM },
  { id: "lym-coo", form: "lymphoma", label: "Cell of origin (DLBCL)", hint: "Hans algorithm: CD10, BCL6, MUM1", termId: "cell-of-origin", input: { kind: "select", options: [{ value: "gcb", label: "Germinal centre B-cell (GCB)" }, { value: "nongcb", label: "Non-GCB / activated B-cell (ABC)" }] },
    readings: [
      { when: { eq: "gcb" }, means: "Arises from germinal-centre B cells (CD10 positive, or CD10 negative with BCL6 positive and MUM1 negative on the Hans algorithm). Somewhat better outcomes with R-CHOP." },
      { when: { eq: "nongcb" }, means: "Arises from activated B cells. Slightly poorer outcomes with R-CHOP in older studies; treatment is the same at present.", changes: "Some trials add drugs such as lenalidomide or ibrutinib specifically for this subtype." },
    ], source: HANS },
  { id: "lym-ki67", form: "lymphoma", label: "Ki-67 (lymphoma)", termId: "proliferation", input: { kind: "number", unit: "%", min: 0, max: 100 },
    readings: [
      { when: { any: true }, means: "The fraction of lymphoma cells dividing. Indolent lymphomas have low Ki-67 and aggressive ones high; a very high value in a large B-cell lymphoma prompts a check for MYC rearrangement. No single cut-off changes treatment on its own." },
    ], source: WHO_HAEM },
  { id: "lym-double-hit", form: "lymphoma", label: "MYC, BCL2 and BCL6 rearrangements (double or triple hit)", termId: "double-hit-lymphoma", input: { kind: "select", options: [{ value: "none", label: "No MYC rearrangement" }, { value: "myc", label: "MYC rearranged only" }, { value: "dh", label: "MYC and BCL2 (and/or BCL6): double or triple hit" }] },
    readings: [
      { when: { eq: "none" }, means: "No MYC rearrangement: not a double-hit lymphoma." },
      { when: { eq: "myc" }, means: "MYC alone is rearranged. Prognostic significance is debated; treatment is usually standard." },
      { when: { eq: "dh" }, means: "MYC together with BCL2 (and/or BCL6) is rearranged: 'high-grade B-cell lymphoma with MYC and BCL2 rearrangements' in the WHO classification, a more aggressive disease.", changes: "Many centres use intensified regimens such as DA-EPOCH-R rather than R-CHOP, and consider CNS prophylaxis." },
    ], source: WHO_HAEM },
  { id: "lym-stage", form: "lymphoma", label: "Stage (Ann Arbor / Lugano)", termId: "lugano-classification", input: { kind: "select", options: [{ value: "1", label: "Stage I (one node region or one organ)" }, { value: "2", label: "Stage II (two or more regions, same side of the diaphragm)" }, { value: "3", label: "Stage III (both sides of the diaphragm)" }, { value: "4", label: "Stage IV (spread to organs such as bone marrow, liver or lung)" }] },
    readings: [
      { when: { eq: "1" }, means: "Limited-stage disease.", changes: "Shorter chemotherapy, sometimes with radiotherapy; cure rates are highest." },
      { when: { eq: "2" }, means: "Limited stage (unless bulky).", changes: "Treated like stage I in most protocols; PET after two cycles guides intensity." },
      { when: { eq: "3" }, means: "Advanced stage: lymphoma on both sides of the diaphragm.", changes: "Full-course systemic therapy; still curable in DLBCL and Hodgkin lymphoma." },
      { when: { eq: "4" }, means: "Advanced stage with organ involvement. In lymphoma, stage IV does not carry the meaning it has in solid tumours: DLBCL and Hodgkin lymphoma are often cured at stage IV.", changes: "Full-course systemic therapy." },
    ], source: LUGANO },
  { id: "lym-b-symptoms", form: "lymphoma", label: "B symptoms", hint: "fever, night sweats, weight loss over 10% in 6 months", termId: "cancer-stage", input: yesNo("Present (B)", "Absent (A)"),
    readings: [
      { when: { eq: "no" }, means: "No systemic symptoms (suffix A)." },
      { when: { eq: "yes" }, means: "Unexplained fever, drenching night sweats or loss of more than 10% of body weight in six months (suffix B). Retained in Hodgkin lymphoma staging; Lugano dropped it for non-Hodgkin lymphoma because it did not change treatment." },
    ], source: LUGANO },
  { id: "lym-deauville", form: "lymphoma", label: "Deauville score (PET)", hint: "1 to 5", termId: "deauville-score", input: { kind: "number", min: 1, max: 5, step: 1 },
    readings: [
      { when: { lte: 3 }, means: "Scores 1 to 3 (uptake no higher than the liver) are a complete metabolic response under the Lugano criteria.", changes: "In Hodgkin lymphoma, a negative interim PET allows treatment to be de-escalated (for example dropping bleomycin)." },
      { when: { lt: 5 }, means: "Score 4: uptake moderately above the liver. A positive scan at interim, or residual disease at the end of treatment.", changes: "Treatment may be escalated or a biopsy taken to confirm." },
      { when: { gte: 5 }, means: "Score 5: uptake markedly above the liver, or new lesions. Treatment failure or progression if at the end of treatment.", changes: "Biopsy confirmation, then second-line therapy." },
    ], source: LUGANO },
  { id: "lym-ipi", form: "lymphoma", label: "International Prognostic Index (IPI)", hint: "0 to 5: age over 60, stage III/IV, raised LDH, performance status 2 or more, more than one extranodal site", termId: "ipi-score", input: { kind: "number", min: 0, max: 5, step: 1 },
    readings: [
      { when: { lte: 1 }, means: "0 to 1 risk factors: low risk in the original IPI." },
      { when: { lt: 3 }, means: "2 risk factors: low-intermediate risk." },
      { when: { lt: 4 }, means: "3 risk factors: high-intermediate risk.", changes: "Pola-R-CHP was studied in IPI 2 to 5 (POLARIX)." },
      { when: { gte: 4 }, means: "4 to 5 risk factors: high risk.", changes: "Standard treatment still cures many; trials and CNS prophylaxis are more often considered." },
    ], source: IPI },
  { id: "lym-ldh", form: "lymphoma", label: "LDH", hint: "lactate dehydrogenase", termId: "tumour-marker", input: yesNo("Raised", "Normal"),
    readings: [
      { when: { eq: "no" }, means: "Normal LDH: one fewer IPI risk factor." },
      { when: { eq: "yes" }, means: "Raised LDH reflects a larger or faster-growing lymphoma and counts as one IPI risk factor." },
    ], source: IPI },
  { id: "lym-fl-grade", form: "lymphoma", label: "Follicular lymphoma grade", termId: "tumour-grade", input: { kind: "select", options: [{ value: "1-2", label: "Grade 1 to 2" }, { value: "3a", label: "Grade 3A" }, { value: "3b", label: "Grade 3B" }] },
    readings: [
      { when: { eq: "1-2" }, means: "Classic low-grade follicular lymphoma, managed as an indolent disease." },
      { when: { eq: "3a" }, means: "More large cells but still follicular; managed like grade 1 to 2 in most centres (the WHO 5th edition groups grades 1 to 3A as 'classic follicular lymphoma')." },
      { when: { eq: "3b" }, means: "Sheets of large cells: behaves and is treated like diffuse large B-cell lymphoma (curative-intent R-CHOP)." },
    ], source: WHO_HAEM },
  { id: "lym-ene", form: "lymphoma", label: "Extranodal involvement", termId: "metastasis", input: { kind: "text", placeholder: "e.g. bone marrow, stomach, testis, CNS" },
    readings: [
      { when: { any: true }, means: "Lymphoma in an organ outside the lymph nodes. Bone marrow, gut, bone and skin are common; testis, kidney, adrenal and breast involvement raise the risk of spread to the brain and prompt CNS prophylaxis; more than one extranodal site is an IPI risk factor." },
    ], source: IPI },

  // ---------------- Myeloma ----------------
  { id: "mm-mprotein", form: "myeloma", label: "Serum M-protein (paraprotein)", termId: "tumour-marker", input: { kind: "number", unit: "g/L", min: 0, max: 200, step: 0.1 },
    readings: [
      { when: { lt: 30 }, means: "Under 30 g/L. With under 10% marrow plasma cells and no organ damage, this is MGUS (a pre-malignant state) by IMWG criteria; with 10% or more it may be smouldering myeloma.", changes: "The other criteria decide whether treatment is needed." },
      { when: { gte: 30 }, means: "30 g/L or more meets the IMWG protein threshold for smouldering or active myeloma, depending on whether there is organ damage or a myeloma-defining event." },
    ], source: IMWG_2014 },
  { id: "mm-flc-ratio", form: "myeloma", label: "Serum free light chain ratio", hint: "involved to uninvolved", termId: "tumour-marker", input: { kind: "number", min: 0, max: 100000, step: 0.1 },
    readings: [
      { when: { gte: 100 }, means: "An involved-to-uninvolved ratio of 100 or more (with the involved chain at 100 mg/L or more) is a myeloma-defining event in the IMWG 2014 criteria, because progression within two years is very likely.", changes: "Treatment is started even without organ damage." },
      { when: { any: true }, means: "The balance between the abnormal light chain and the normal one. An abnormal ratio supports the diagnosis and is tracked during treatment; under 100 it is not a myeloma-defining event on its own." },
    ], source: IMWG_2014 },
  { id: "mm-bmpc", form: "myeloma", label: "Bone marrow plasma cells", termId: "bone-marrow", input: { kind: "number", unit: "%", min: 0, max: 100 },
    readings: [
      { when: { lt: 10 }, means: "Under 10%: below the IMWG threshold for myeloma; with a small M-protein and no organ damage this is MGUS." },
      { when: { lt: 60 }, means: "10% to 59% clonal plasma cells: meets the IMWG marrow criterion for myeloma. Whether it is smouldering or active depends on organ damage (CRAB) or a myeloma-defining event." },
      { when: { gte: 60 }, means: "60% or more clonal plasma cells is itself a myeloma-defining event (IMWG 2014).", changes: "Treatment is started even without organ damage." },
    ], source: IMWG_2014 },
  { id: "mm-crab", form: "myeloma", label: "CRAB features", hint: "calcium, renal, anaemia, bone", termId: "high-risk-myeloma", input: { kind: "text", placeholder: "e.g. anaemia, lytic lesions" },
    readings: [
      { when: { any: true }, means: "The IMWG organ-damage criteria: calcium above 2.75 mmol/L (11 mg/dL); creatinine above 177 micromol/L (2 mg/dL) or creatinine clearance under 40 mL/min; haemoglobin under 100 g/L or more than 20 g/L below normal; one or more lytic bone lesions on X-ray, CT or PET-CT. Any one, attributable to the plasma cells, means active myeloma that needs treatment." },
    ], source: IMWG_2014 },
  { id: "mm-iss", form: "myeloma", label: "ISS stage", hint: "beta-2 microglobulin and albumin", termId: "r-iss", input: { kind: "select", options: [{ value: "1", label: "ISS I (beta-2 microglobulin under 3.5 mg/L and albumin 35 g/L or more)" }, { value: "2", label: "ISS II (neither I nor III)" }, { value: "3", label: "ISS III (beta-2 microglobulin 5.5 mg/L or more)" }] },
    readings: [
      { when: { eq: "1" }, means: "Lowest tumour burden by the International Staging System." },
      { when: { eq: "2" }, means: "Intermediate tumour burden: neither the low-burden nor the high-burden criteria are met." },
      { when: { eq: "3" }, means: "Highest tumour burden or kidney impairment (beta-2 microglobulin also rises when kidneys are affected)." },
    ], source: R_ISS },
  { id: "mm-riss", form: "myeloma", label: "R-ISS stage", termId: "r-iss", input: { kind: "select", options: [{ value: "1", label: "R-ISS I" }, { value: "2", label: "R-ISS II" }, { value: "3", label: "R-ISS III" }] },
    readings: [
      { when: { eq: "1" }, means: "ISS I with standard-risk cytogenetics and normal LDH. In the 2015 derivation cohort, 5-year survival was 82%." },
      { when: { eq: "2" }, means: "Neither R-ISS I nor III. 5-year survival 62% in the derivation cohort." },
      { when: { eq: "3" }, means: "ISS III together with high-risk cytogenetics or raised LDH. 5-year survival 40% in the derivation cohort; outcomes have improved since with quadruplet therapy and CAR-T.", changes: "Intensive induction, transplant where fit, and trials are prioritised." },
    ], source: R_ISS },
  { id: "mm-cyto", form: "myeloma", label: "Cytogenetic risk (FISH)", hint: "del(17p), t(4;14), t(14;16), gain 1q", termId: "del17p-tp53", input: { kind: "select", options: [{ value: "std", label: "Standard risk" }, { value: "high", label: "High risk: del(17p), t(4;14) or t(14;16)" }] },
    readings: [
      { when: { eq: "std" }, means: "None of the IMWG high-risk abnormalities were found." },
      { when: { eq: "high" }, means: "The IMWG defines del(17p), t(4;14) and t(14;16) as high-risk cytogenetics; two or more, or with gain(1q), is sometimes called 'double hit' myeloma.", changes: "Proteasome-inhibitor-based combinations, CD38 antibodies, tandem transplant in some centres, and early access to CAR-T or bispecifics." },
    ], source: IMWG_CYTO },
  { id: "mm-ldh", form: "myeloma", label: "LDH", termId: "tumour-marker", input: yesNo("Raised", "Normal"),
    readings: [
      { when: { eq: "no" }, means: "Normal LDH, which counts towards a lower R-ISS stage." },
      { when: { eq: "yes" }, means: "Raised LDH is one of the components that moves a myeloma to R-ISS III." },
    ], source: R_ISS },
  { id: "mm-mrd", form: "myeloma", label: "Minimal residual disease (MRD)", hint: "next-generation flow or sequencing, sensitivity 10⁻⁵", termId: "mrd-negativity-myeloma", input: yesNo("Negative (undetectable)", "Positive (detectable)"),
    readings: [
      { when: { eq: "yes" }, means: "No myeloma cells detected at a sensitivity of 1 in 100,000 marrow cells: the deepest response measurable.", changes: "Associated with longer remission; some trials use sustained MRD negativity to stop maintenance." },
      { when: { eq: "no" }, means: "Residual myeloma cells detectable. Common even after a good response; maintenance therapy continues." },
    ], source: IMWG_2014 },
];

/** Evaluate one rule against a value. Numbers use the numeric bounds; strings use `eq`/`in`. */
export function ruleMatches(rule: Rule, value: string | number): boolean {
  if (rule.any) return true;
  if (typeof value === "number") {
    if (Number.isNaN(value)) return false;
    if (rule.lt !== undefined && !(value < rule.lt)) return false;
    if (rule.lte !== undefined && !(value <= rule.lte)) return false;
    if (rule.gt !== undefined && !(value > rule.gt)) return false;
    if (rule.gte !== undefined && !(value >= rule.gte)) return false;
    if (rule.eq !== undefined && value !== Number(rule.eq)) return false;
    if (rule.in !== undefined && !rule.in.includes(String(value))) return false;
    return rule.lt !== undefined || rule.lte !== undefined || rule.gt !== undefined || rule.gte !== undefined || rule.eq !== undefined || rule.in !== undefined;
  }
  if (rule.eq !== undefined) return String(rule.eq) === value;
  if (rule.in !== undefined) return rule.in.includes(value);
  return false;
}

/** The first reading whose rule matches; readings are ordered from lowest to highest. */
export function readField(field: ReportField, raw: string): Reading | undefined {
  if (raw === "" || raw === undefined) return undefined;
  const value: string | number = field.input.kind === "number" ? Number(raw) : raw;
  if (field.input.kind === "number" && Number.isNaN(value as number)) return undefined;
  return field.readings.find((r) => ruleMatches(r.when, value));
}
