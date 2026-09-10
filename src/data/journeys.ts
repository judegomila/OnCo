/**
 * Treatment journeys: what the months after diagnosis typically look like for a cancer at a stage, as a
 * sequence of phases with durations taken from the trial protocol or guideline named in `source`
 * (cycle counts × cycle length, radiotherapy fraction schedules, guideline follow-up intervals). Ranges
 * are stated as [min, max] weeks; anything open-ended (endocrine therapy, maintenance, surveillance)
 * carries `ongoing: true`. Drug and technology ids are corpus entities (checked by journeys.test.ts).
 * These are typical protocols, not individual advice; the decision points are where the plan forks.
 */
export type PhaseType = "diagnosis" | "neoadjuvant" | "surgery" | "radiotherapy" | "adjuvant" | "systemic" | "cell-therapy" | "surveillance";
export type JourneyPhase = {
  id: string; label: string; type: PhaseType;
  /** Duration in weeks. */
  weeks: [number, number];
  /** Runs alongside the previous phase rather than after it. */
  parallel?: boolean;
  /** Continues beyond the chart (years). */
  ongoing?: boolean;
  detail: string; drugs?: string[]; technologies?: string[]; source?: string;
};
export type Decision = { after: string; question: string; options: string[] };
export type Journey = { id: string; cancer: string; stage: string; title: string; tldr: string; phases: JourneyPhase[]; decisions: Decision[]; sources: string[]; asOf: string };

const nejm = (id: string) => `https://www.nejm.org/doi/full/10.1056/${id}`;
const doi = (d: string) => `https://doi.org/${d}`;
const NCCN = "https://www.nccn.org/guidelines/category_1";
const asOf = "2026-09-09";

export const JOURNEYS: Journey[] = [
  { id: "tnbc-stage-2-3", cancer: "tnbc", stage: "Stage II-III (operable)", title: "Triple-negative breast cancer, stage II-III", asOf,
    tldr: "About a year of active treatment: chemotherapy with immunotherapy before surgery, surgery, then immunotherapy for nine more cycles, with radiotherapy alongside, followed by five years of check-ups.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 4], detail: "Core biopsy with receptor testing (ER, PR, HER2), breast imaging, and staging scans for stage II-III; germline BRCA testing.", technologies: ["histopathology-ihc", "mammography", "mri", "germline-testing"], source: NCCN },
      { id: "neo1", label: "Pembrolizumab + carboplatin/paclitaxel", type: "neoadjuvant", weeks: [12, 12], detail: "Four 3-week cycles of pembrolizumab with weekly paclitaxel and carboplatin (KEYNOTE-522 schedule).", drugs: ["pembrolizumab", "carboplatin", "paclitaxel"], technologies: ["checkpoint-inhibitor", "cytotoxic-chemotherapy"], source: nejm("NEJMoa1910549") },
      { id: "neo2", label: "Pembrolizumab + anthracycline/cyclophosphamide", type: "neoadjuvant", weeks: [12, 12], detail: "Four further 3-week cycles with doxorubicin or epirubicin plus cyclophosphamide.", drugs: ["pembrolizumab", "doxorubicin", "cyclophosphamide"], source: nejm("NEJMoa1910549") },
      { id: "surg", label: "Surgery", type: "surgery", weeks: [3, 6], detail: "Lumpectomy or mastectomy with sentinel node biopsy 3-6 weeks after the last chemotherapy; the pathology report shows whether all invasive cancer has gone (pCR).", technologies: ["sentinel-node"], source: nejm("NEJMoa1910549") },
      { id: "adj", label: "Adjuvant pembrolizumab", type: "adjuvant", weeks: [27, 27], detail: "Nine 3-week cycles after surgery, as in KEYNOTE-522. Whether patients with pCR need it is being tested (OptimICE-pCR).", drugs: ["pembrolizumab"], source: nejm("NEJMoa1910549") },
      { id: "rt", label: "Radiotherapy", type: "radiotherapy", weeks: [3, 6], parallel: true, detail: "After lumpectomy, or after mastectomy with node-positive disease; 15-16 fractions over 3 weeks is standard in the UK, 5-6 weeks elsewhere; given alongside adjuvant pembrolizumab.", technologies: ["imrt-igrt"], source: NCCN },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 260], ongoing: true, detail: "History and examination every 3-6 months for 3 years, every 6-12 months in years 4-5, then yearly; annual mammography. No routine scans or blood tests without symptoms.", source: doi("10.1200/JCO.2015.64.3809") },
    ],
    decisions: [
      { after: "surg", question: "Did the pathology show a complete response (pCR)?", options: ["pCR: continue adjuvant pembrolizumab; surveillance afterwards", "Residual disease: adjuvant pembrolizumab, and capecitabine (CREATE-X) or olaparib for a germline BRCA mutation (OlympiA) are added"] },
    ],
    sources: [nejm("NEJMoa1910549"), nejm("NEJMoa2105215"), doi("10.1200/JCO.2015.64.3809"), NCCN] },

  { id: "breast-hr-positive-early", cancer: "breast-hr-positive", stage: "Stage I-II (early)", title: "HR-positive, HER2-negative breast cancer, stage I-II", asOf,
    tldr: "Surgery first, a genomic test to decide whether chemotherapy adds anything, a few weeks of radiotherapy, then five to ten years of endocrine tablets, with a CDK4/6 inhibitor for two or three years if the risk is high.",
    phases: [
      { id: "dx", label: "Diagnosis", type: "diagnosis", weeks: [2, 4], detail: "Core biopsy with ER, PR, HER2 and Ki-67; mammography and ultrasound, MRI when needed.", technologies: ["histopathology-ihc", "mammography"], source: NCCN },
      { id: "surg", label: "Surgery", type: "surgery", weeks: [1, 2], detail: "Breast-conserving surgery or mastectomy with sentinel node biopsy; recovery 2-4 weeks.", technologies: ["sentinel-node"], source: NCCN },
      { id: "assay", label: "Genomic assay decision", type: "diagnosis", weeks: [2, 3], detail: "A 21-gene recurrence score (or similar) on the tumour: in TAILORx, women over 50 with node-negative disease and a score of 11-25 gained nothing from chemotherapy.", technologies: ["companion-diagnostic"], source: nejm("NEJMoa1804710") },
      { id: "chemo", label: "Chemotherapy (high genomic risk only)", type: "adjuvant", weeks: [12, 18], detail: "Four to six cycles of a taxane-based or anthracycline-taxane regimen, only when the assay or stage shows a high recurrence risk.", drugs: ["docetaxel", "cyclophosphamide"], technologies: ["cytotoxic-chemotherapy"], source: nejm("NEJMoa1804710") },
      { id: "rt", label: "Radiotherapy", type: "radiotherapy", weeks: [1, 5], detail: "After breast conservation: 26 Gy in 5 fractions over one week (FAST-Forward) or 40 Gy in 15 fractions over 3 weeks; longer courses with a boost in some settings.", technologies: ["imrt-igrt"], source: doi("10.1016/S0140-6736(20)30932-6") },
      { id: "et", label: "Endocrine therapy", type: "systemic", weeks: [260, 520], ongoing: true, detail: "Tamoxifen or an aromatase inhibitor (with ovarian suppression before menopause) for 5 years, extended to 10 in higher-risk disease.", drugs: ["tamoxifen", "letrozole"], technologies: ["endocrine-therapy"], source: NCCN },
      { id: "cdk", label: "CDK4/6 inhibitor (high-risk node-positive)", type: "adjuvant", weeks: [104, 156], parallel: true, detail: "Abemaciclib for 2 years (monarchE) or ribociclib for 3 years (NATALEE) alongside endocrine therapy in higher-risk disease.", drugs: ["abemaciclib", "ribociclib"], technologies: ["cdk46-inhibitor"], source: doi("10.1200/JCO.20.02514") },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 520], ongoing: true, detail: "Clinic visits every 3-6 months for 3 years then yearly, with annual mammography; bone density monitoring on aromatase inhibitors.", source: doi("10.1200/JCO.2015.64.3809") },
    ],
    decisions: [
      { after: "assay", question: "Does the genomic score and stage justify chemotherapy?", options: ["Low or intermediate score: skip chemotherapy, go to radiotherapy and endocrine therapy", "High score, or young with an intermediate score, or four or more nodes: chemotherapy first"] },
      { after: "et", question: "Is the recurrence risk high enough for a CDK4/6 inhibitor?", options: ["Node-negative, small tumour: endocrine therapy alone", "Node-positive or high-risk features: add abemaciclib (2 years) or ribociclib (3 years)"] },
    ],
    sources: [nejm("NEJMoa1804710"), doi("10.1016/S0140-6736(20)30932-6"), doi("10.1200/JCO.20.02514"), nejm("NEJMoa2305488"), NCCN] },

  { id: "breast-her2-positive-early", cancer: "breast-her2-positive", stage: "Stage II-III (operable)", title: "HER2-positive breast cancer, stage II-III", asOf,
    tldr: "Chemotherapy with two HER2 antibodies for about four months before surgery; what the surgeon finds decides the next year of anti-HER2 treatment (antibodies alone, or the ADC T-DM1 if cancer remained).",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 4], detail: "Core biopsy with HER2 by IHC and in-situ hybridisation; imaging; echocardiogram before anti-HER2 therapy.", technologies: ["histopathology-ihc", "mammography", "mri"], source: NCCN },
      { id: "neo", label: "Neoadjuvant chemotherapy + trastuzumab + pertuzumab", type: "neoadjuvant", weeks: [18, 18], detail: "Six 3-week cycles of docetaxel and carboplatin with trastuzumab and pertuzumab (TCHP).", drugs: ["docetaxel", "carboplatin", "trastuzumab", "pertuzumab"], technologies: ["monoclonal-antibody", "cytotoxic-chemotherapy"], source: NCCN },
      { id: "surg", label: "Surgery", type: "surgery", weeks: [3, 6], detail: "Breast surgery with sentinel node biopsy; the pathology report shows whether invasive cancer remains.", technologies: ["sentinel-node"], source: NCCN },
      { id: "adj", label: "Adjuvant anti-HER2 therapy", type: "adjuvant", weeks: [34, 42], detail: "pCR: trastuzumab and pertuzumab to complete one year of antibody therapy. Residual disease: trastuzumab emtansine (T-DM1) for 14 cycles (KATHERINE), about 42 weeks.", drugs: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine"], technologies: ["adc"], source: nejm("NEJMoa1814017") },
      { id: "rt", label: "Radiotherapy", type: "radiotherapy", weeks: [3, 6], parallel: true, detail: "Given during antibody therapy after breast conservation or node-positive mastectomy.", technologies: ["imrt-igrt"], source: NCCN },
      { id: "et", label: "Endocrine therapy (if also HR-positive)", type: "systemic", weeks: [260, 520], ongoing: true, detail: "Tamoxifen or an aromatase inhibitor for 5-10 years when the tumour is also hormone receptor positive.", drugs: ["tamoxifen", "letrozole"], technologies: ["endocrine-therapy"], source: NCCN },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 260], ongoing: true, detail: "Clinic visits every 3-6 months for 3 years then yearly; annual mammography; cardiac monitoring during antibody therapy.", source: doi("10.1200/JCO.2015.64.3809") },
    ],
    decisions: [{ after: "surg", question: "Was there a pathological complete response?", options: ["pCR: finish the year with trastuzumab and pertuzumab", "Residual invasive disease: switch to T-DM1 for 14 cycles (KATHERINE)"] }],
    sources: [nejm("NEJMoa1814017"), NCCN] },

  { id: "nsclc-resectable", cancer: "nsclc", stage: "Stage II-IIIA (resectable)", title: "Non-small-cell lung cancer, resectable stage II-IIIA", asOf,
    tldr: "Molecular testing splits the road: without a driver mutation, chemo-immunotherapy comes before surgery and immunotherapy after; with an EGFR or ALK alteration, surgery is followed by a targeted tablet for two to three years.",
    phases: [
      { id: "dx", label: "Diagnosis, staging and molecular testing", type: "diagnosis", weeks: [3, 5], detail: "CT and PET-CT, brain MRI, biopsy with PD-L1 and a molecular panel (EGFR, ALK, ROS1, KRAS and others), mediastinal staging, lung function tests.", technologies: ["pet-ct", "mri", "cgp", "histopathology-ihc"], source: NCCN },
      { id: "neo", label: "Neoadjuvant nivolumab + platinum chemotherapy (no driver)", type: "neoadjuvant", weeks: [9, 9], detail: "Three 3-week cycles before surgery (CheckMate 816); the KEYNOTE-671 alternative gives four cycles with pembrolizumab.", drugs: ["nivolumab", "cisplatin", "pembrolizumab"], technologies: ["checkpoint-inhibitor", "platinum"], source: nejm("NEJMoa2202170") },
      { id: "surg", label: "Surgery (lobectomy)", type: "surgery", weeks: [4, 6], detail: "Lobectomy with lymph node dissection 4-6 weeks after the last cycle; often minimally invasive or robotic.", technologies: ["robotic-surgery"], source: nejm("NEJMoa2202170") },
      { id: "adj", label: "Adjuvant therapy", type: "adjuvant", weeks: [12, 156], detail: "No driver: adjuvant pembrolizumab for 13 cycles (39 weeks, KEYNOTE-671). EGFR-mutant: platinum chemotherapy (12 weeks) then osimertinib for 3 years (ADAURA). ALK-positive: alectinib for 2 years (ALINA).", drugs: ["pembrolizumab", "osimertinib", "alectinib"], technologies: ["kinase-inhibitors", "checkpoint-inhibitor"], source: nejm("NEJMoa2027071") },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 260], ongoing: true, detail: "CT every 6 months for 2-3 years, then a low-dose CT yearly; smoking cessation support.", technologies: ["ct"], source: NCCN },
    ],
    decisions: [{ after: "dx", question: "Is there an EGFR mutation or ALK fusion?", options: ["No driver: neoadjuvant chemo-immunotherapy, surgery, adjuvant immunotherapy", "EGFR-mutant: surgery first, chemotherapy, then osimertinib for 3 years", "ALK-positive: surgery first, then alectinib for 2 years"] }],
    sources: [nejm("NEJMoa2202170"), nejm("NEJMoa2302983"), nejm("NEJMoa2027071"), nejm("NEJMoa2310532"), NCCN] },

  { id: "colorectal-stage-3", cancer: "colorectal", stage: "Stage III colon", title: "Colon cancer, stage III", asOf,
    tldr: "Surgery to remove the tumour and its nodes, then three or six months of chemotherapy depending on risk, and five years of follow-up with blood tests, scans and a colonoscopy.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 4], detail: "Colonoscopy with biopsy, CT of chest, abdomen and pelvis, CEA blood test; MMR/MSI testing on the tumour.", technologies: ["ct", "histopathology-ihc"], source: NCCN },
      { id: "surg", label: "Colectomy", type: "surgery", weeks: [1, 2], detail: "Removal of the affected segment with at least 12 lymph nodes, usually laparoscopic; 4-8 weeks recovery before chemotherapy.", technologies: ["robotic-surgery"], source: NCCN },
      { id: "adj", label: "Adjuvant chemotherapy", type: "adjuvant", weeks: [12, 24], detail: "CAPOX for 3 months (low-risk T1-3 N1, IDEA collaboration) or FOLFOX for 6 months (T4 or N2); oxaliplatin causes cumulative nerve damage, which is why the shorter course matters.", drugs: ["oxaliplatin", "fluorouracil"], technologies: ["cytotoxic-chemotherapy", "platinum"], source: nejm("NEJMoa1713709") },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 260], ongoing: true, detail: "CEA every 3-6 months for 5 years, CT yearly for 3-5 years, colonoscopy at 1 year then every 3-5 years; circulating tumour DNA testing (DYNAMIC) is entering practice to guide who needs chemotherapy.", technologies: ["ct", "mrd-testing"], source: NCCN },
    ],
    decisions: [{ after: "surg", question: "Low-risk (T1-3 N1) or high-risk (T4 or N2) stage III?", options: ["Low-risk: 3 months of CAPOX", "High-risk: 6 months of FOLFOX or CAPOX"] }],
    sources: [nejm("NEJMoa1713709"), nejm("NEJMoa2200075"), NCCN] },

  { id: "prostate-high-risk-localised", cancer: "prostate", stage: "High-risk localised", title: "Prostate cancer, high-risk localised", asOf,
    tldr: "Radiotherapy with two to three years of hormone therapy (sometimes with abiraterone), or surgery, after a PSMA PET scan has shown the cancer has not spread; then PSA checks for life.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [4, 8], detail: "PSA, MRI-targeted biopsy with Gleason grading, and a PSMA PET-CT, which replaced bone scan and CT for staging (proPSMA).", technologies: ["mri", "psma-pet"], source: doi("10.1016/S0140-6736(20)30314-7") },
      { id: "adt", label: "Androgen deprivation therapy", type: "systemic", weeks: [78, 156], detail: "GnRH agonist or antagonist injections for 18-36 months, starting before radiotherapy.", drugs: ["leuprolide", "degarelix"], technologies: ["androgen-deprivation"], source: NCCN },
      { id: "rt", label: "Radiotherapy", type: "radiotherapy", weeks: [1, 8], parallel: true, detail: "External beam radiotherapy to the prostate (and pelvic nodes) in 20 fractions over 4 weeks, or 5 fractions of stereotactic radiotherapy; brachytherapy boost in some centres. Radical prostatectomy is the surgical alternative.", technologies: ["imrt-igrt", "sbrt", "brachytherapy"], source: NCCN },
      { id: "abi", label: "Abiraterone (very high risk)", type: "systemic", weeks: [104, 104], parallel: true, detail: "Two years of abiraterone with prednisolone alongside ADT improved survival in STAMPEDE for node-positive or very high-risk disease.", drugs: ["abiraterone"], source: doi("10.1016/S0140-6736(21)02437-5") },
      { id: "fu", label: "PSA surveillance", type: "surveillance", weeks: [520, 520], ongoing: true, detail: "PSA every 6-12 months for at least 5 years then yearly; testosterone recovery after ADT; bone health monitoring.", source: NCCN },
    ],
    decisions: [{ after: "dx", question: "Radiotherapy with hormone therapy, or radical prostatectomy?", options: ["Radiotherapy + 18-36 months ADT (+ abiraterone if very high risk)", "Radical prostatectomy with node dissection, then radiotherapy if PSA rises or margins are involved"] }],
    sources: [doi("10.1016/S0140-6736(20)30314-7"), doi("10.1016/S0140-6736(21)02437-5"), NCCN] },

  { id: "dlbcl-advanced", cancer: "dlbcl", stage: "Advanced stage (III-IV), first line", title: "Diffuse large B-cell lymphoma, advanced stage", asOf,
    tldr: "Six cycles of immunochemotherapy over about four months, a PET scan to confirm the lymphoma has gone, then two years of close follow-up; if it comes back early, CAR-T cell therapy is the next step.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 3], detail: "Excisional or core biopsy with immunohistochemistry and FISH (MYC, BCL2, BCL6), PET-CT, bloods; cell-of-origin and double-hit status change the plan.", technologies: ["histopathology-ihc", "fdg-pet"], source: NCCN },
      { id: "rchop", label: "R-CHOP or pola-R-CHP × 6", type: "systemic", weeks: [18, 18], detail: "Six 3-week cycles of rituximab with cyclophosphamide, doxorubicin, prednisolone and either vincristine (R-CHOP) or polatuzumab vedotin (pola-R-CHP, POLARIX).", drugs: ["rituximab", "cyclophosphamide", "doxorubicin", "polatuzumab-vedotin"], technologies: ["monoclonal-antibody", "adc", "cytotoxic-chemotherapy"], source: nejm("NEJMoa2115304") },
      { id: "pet", label: "End-of-treatment PET", type: "diagnosis", weeks: [4, 8], detail: "PET-CT 6-8 weeks after the last cycle; a complete metabolic response (Deauville 1-3) ends treatment.", technologies: ["fdg-pet"], source: NCCN },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [104, 260], ongoing: true, detail: "Visits every 3 months for 2 years, then every 6 months to 5 years; no routine scans after remission is confirmed.", source: NCCN },
      { id: "cart", label: "CAR-T if relapse within 12 months", type: "cell-therapy", weeks: [8, 10], detail: "Axicabtagene ciloleucel beat salvage chemotherapy and transplant in ZUMA-7: apheresis, 3-4 weeks of manufacturing (bridging therapy if needed), 3 days of lymphodepleting chemotherapy, infusion, then about 4 weeks of monitoring for cytokine release syndrome and neurotoxicity.", drugs: ["axicabtagene-ciloleucel"], technologies: ["car-t"], source: nejm("NEJMoa2116133") },
    ],
    decisions: [
      { after: "pet", question: "Complete metabolic response on PET?", options: ["Yes: surveillance", "No, or relapse within 12 months: CAR-T (ZUMA-7); later relapse: salvage chemotherapy and transplant, or CAR-T", "Not fit for CAR-T: bispecific antibodies (glofitamab, epcoritamab)"] },
    ],
    sources: [nejm("NEJMoa2115304"), nejm("NEJMoa2116133"), NCCN] },

  { id: "glioblastoma-newly-diagnosed", cancer: "glioblastoma", stage: "Newly diagnosed", title: "Glioblastoma, newly diagnosed", asOf,
    tldr: "Surgery within days, six weeks of daily radiotherapy with temozolomide tablets, a month off, then six monthly cycles of temozolomide (with the option of a scalp device), and an MRI every two to three months.",
    phases: [
      { id: "dx", label: "MRI and surgery", type: "surgery", weeks: [1, 2], detail: "Contrast MRI then maximal safe resection (or biopsy) usually within 1-2 weeks; molecular testing for IDH, MGMT methylation and 1p/19q.", technologies: ["mri", "fluorescence-guided-surgery", "cgp"], source: nejm("NEJMoa043330") },
      { id: "rec", label: "Recovery", type: "surgery", weeks: [3, 5], detail: "Wound healing and steroids tapering before radiotherapy starts, typically 3-5 weeks after surgery.", source: nejm("NEJMoa043330") },
      { id: "crt", label: "Chemoradiotherapy", type: "radiotherapy", weeks: [6, 6], detail: "60 Gy in 30 fractions over 6 weeks with daily temozolomide (Stupp protocol); a shorter 3-week course is used in older or frailer patients.", drugs: ["temozolomide"], technologies: ["imrt-igrt"], source: nejm("NEJMoa043330") },
      { id: "gap", label: "Break", type: "systemic", weeks: [4, 4], detail: "Four weeks off treatment, then a baseline MRI.", technologies: ["mri"], source: nejm("NEJMoa043330") },
      { id: "adj", label: "Adjuvant temozolomide", type: "adjuvant", weeks: [24, 24], detail: "Six 28-day cycles, tablets on days 1-5; tumour treating fields (EF-14) can be worn alongside.", drugs: ["temozolomide"], technologies: ["ttfields"], source: doi("10.1001/jama.2017.18718") },
      { id: "fu", label: "MRI surveillance", type: "surveillance", weeks: [104, 104], ongoing: true, detail: "MRI every 2-3 months; pseudoprogression in the first months can mimic recurrence.", technologies: ["mri"], source: NCCN },
    ],
    decisions: [{ after: "dx", question: "Is MGMT methylated, and is the patient fit for the full course?", options: ["Fit: 6-week chemoradiotherapy then temozolomide", "Older or frail: short-course radiotherapy, with temozolomide if MGMT is methylated", "IDH-mutant (grade 2-3 glioma, not glioblastoma): a different, slower pathway including vorasidenib"] }],
    sources: [nejm("NEJMoa043330"), doi("10.1001/jama.2017.18718"), NCCN] },

  { id: "pancreatic-resectable", cancer: "pancreatic", stage: "Resectable", title: "Pancreatic cancer, resectable", asOf,
    tldr: "A major operation, two to three months to recover, then six months of combination chemotherapy, which roughly doubled the time patients stay cancer-free in the trial that set the standard.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 4], detail: "Pancreas-protocol CT, endoscopic ultrasound biopsy, CA19-9; germline testing for BRCA and other genes; biliary stent if jaundiced.", technologies: ["ct", "germline-testing"], source: NCCN },
      { id: "surg", label: "Pancreatic resection", type: "surgery", weeks: [1, 2], detail: "Whipple procedure (head) or distal pancreatectomy (body and tail); 1-2 weeks in hospital.", source: NCCN },
      { id: "rec", label: "Recovery", type: "surgery", weeks: [8, 12], detail: "Chemotherapy starts once eating and weight are stable, within 12 weeks of surgery (PRODIGE 24 window).", source: nejm("NEJMoa1809775") },
      { id: "adj", label: "Adjuvant mFOLFIRINOX", type: "adjuvant", weeks: [24, 24], detail: "Twelve 2-week cycles of oxaliplatin, irinotecan, fluorouracil and leucovorin; gemcitabine-based chemotherapy for those not fit for it.", drugs: ["oxaliplatin", "irinotecan", "fluorouracil", "gemcitabine"], technologies: ["cytotoxic-chemotherapy"], source: nejm("NEJMoa1809775") },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [104, 260], ongoing: true, detail: "CA19-9 and CT every 3-6 months for 2 years, then every 6-12 months.", technologies: ["ct"], source: NCCN },
    ],
    decisions: [{ after: "dx", question: "Resectable, borderline or locally advanced?", options: ["Resectable: surgery first, then adjuvant chemotherapy", "Borderline resectable: neoadjuvant FOLFIRINOX (and sometimes chemoradiotherapy) before an attempt at surgery", "Locally advanced: chemotherapy, surgery only if the tumour shrinks"] }],
    sources: [nejm("NEJMoa1809775"), NCCN] },

  { id: "melanoma-stage-3", cancer: "melanoma", stage: "Stage III (node-positive)", title: "Melanoma, stage III", asOf,
    tldr: "Surgery to remove the melanoma and the involved nodes, then a year of immunotherapy infusions every few weeks, or immunotherapy for six weeks before surgery, followed by scans for five years.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 4], detail: "Excision biopsy with Breslow depth and ulceration, sentinel node biopsy or ultrasound of a palpable node, PET-CT and brain MRI for stage III, BRAF testing.", technologies: ["sentinel-node", "pet-ct", "mri"], source: NCCN },
      { id: "neo", label: "Neoadjuvant nivolumab + ipilimumab (option)", type: "neoadjuvant", weeks: [6, 6], detail: "Two 3-week cycles before surgery (NADINA); a major pathological response allows adjuvant therapy to be skipped.", drugs: ["nivolumab", "ipilimumab"], technologies: ["checkpoint-inhibitor"], source: nejm("NEJMoa2402604") },
      { id: "surg", label: "Surgery", type: "surgery", weeks: [1, 3], detail: "Wide local excision and therapeutic lymph node dissection of the involved basin.", source: NCCN },
      { id: "adj", label: "Adjuvant immunotherapy", type: "adjuvant", weeks: [52, 52], detail: "Pembrolizumab or nivolumab for one year (KEYNOTE-054, CheckMate 238), or dabrafenib plus trametinib tablets for a year in BRAF-mutant disease (COMBI-AD). Skipped after a major response to neoadjuvant therapy.", drugs: ["pembrolizumab", "nivolumab"], technologies: ["checkpoint-inhibitor"], source: nejm("NEJMoa1802357") },
      { id: "fu", label: "Surveillance", type: "surveillance", weeks: [260, 260], ongoing: true, detail: "Skin and node examination every 3-6 months, imaging every 3-12 months for 3-5 years, then yearly skin checks for life.", source: NCCN },
    ],
    decisions: [
      { after: "dx", question: "Surgery first or immunotherapy first?", options: ["Neoadjuvant nivolumab + ipilimumab then surgery (NADINA): better event-free survival", "Surgery then a year of adjuvant anti-PD-1 (or BRAF/MEK tablets)"] },
      { after: "neo", question: "Major pathological response at surgery?", options: ["Yes: no adjuvant therapy, surveillance", "No: adjuvant anti-PD-1 (or BRAF/MEK) for a year"] },
    ],
    sources: [nejm("NEJMoa2402604"), nejm("NEJMoa1802357"), NCCN] },

  { id: "multiple-myeloma-transplant-eligible", cancer: "multiple-myeloma", stage: "Newly diagnosed, transplant-eligible", title: "Multiple myeloma, newly diagnosed and fit for transplant", asOf,
    tldr: "Four to six months of a four-drug combination, a stem cell transplant with a hospital stay of a few weeks, two more cycles, then maintenance tablets that continue for years while the disease is monitored down to a few cells in a million.",
    phases: [
      { id: "dx", label: "Diagnosis and staging", type: "diagnosis", weeks: [2, 3], detail: "Serum and urine protein studies, free light chains, bone marrow biopsy with FISH for high-risk changes, whole-body low-dose CT or PET-CT.", technologies: ["ct", "fdg-pet"], source: NCCN },
      { id: "ind", label: "Induction: daratumumab + VRd", type: "systemic", weeks: [16, 24], detail: "Four to six 28-day cycles of daratumumab, bortezomib, lenalidomide and dexamethasone (PERSEUS).", drugs: ["daratumumab", "bortezomib", "lenalidomide"], technologies: ["monoclonal-antibody"], source: nejm("NEJMoa2312054") },
      { id: "coll", label: "Stem cell collection", type: "cell-therapy", weeks: [2, 3], detail: "Growth factor (with plerixafor if needed) and apheresis of the patient's own stem cells.", source: NCCN },
      { id: "asct", label: "High-dose melphalan and autologous transplant", type: "cell-therapy", weeks: [4, 6], detail: "Melphalan 200 mg/m2 then stem cell reinfusion; 2-3 weeks in hospital and several weeks of recovery.", drugs: ["melphalan"], source: nejm("NEJMoa2312054") },
      { id: "cons", label: "Consolidation", type: "systemic", weeks: [8, 8], detail: "Two further cycles of the induction combination.", drugs: ["daratumumab", "bortezomib", "lenalidomide"], source: nejm("NEJMoa2312054") },
      { id: "maint", label: "Maintenance", type: "systemic", weeks: [104, 520], ongoing: true, detail: "Lenalidomide (with daratumumab in PERSEUS) until progression; MRD testing at about one year guides whether daratumumab can stop.", drugs: ["lenalidomide", "daratumumab"], technologies: ["mrd-testing"], source: nejm("NEJMoa2312054") },
    ],
    decisions: [{ after: "ind", question: "Transplant now or keep the cells for later?", options: ["Standard: transplant after induction (deeper responses, longer remission)", "Delayed transplant with continued therapy is an option after a deep MRD-negative response (DETERMINATION showed no survival difference)"] }],
    sources: [nejm("NEJMoa2312054"), nejm("NEJMoa2204925"), NCCN] },
];

export function journeyFor(id: string): Journey | undefined { return JOURNEYS.find((j) => j.id === id); }
export function journeysForCancer(cancerId: string): Journey[] { return JOURNEYS.filter((j) => j.cancer === cancerId); }

/** Sequential layout: start and end week of each phase (parallel phases start with the previous phase). */
export function layoutPhases(j: Journey): Array<{ phase: JourneyPhase; start: number; endMin: number; endMax: number }> {
  const out: Array<{ phase: JourneyPhase; start: number; endMin: number; endMax: number }> = [];
  let cursor = 0, prevStart = 0;
  for (const p of j.phases) {
    const start = p.parallel ? prevStart : cursor;
    const endMin = start + p.weeks[0], endMax = start + p.weeks[1];
    out.push({ phase: p, start, endMin, endMax });
    if (!p.parallel) { prevStart = start; cursor = endMin; } else cursor = Math.max(cursor, endMin);
  }
  return out;
}
