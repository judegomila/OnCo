/**
 * Staging systems and prognostic risk scores per cancer, sourced. Side data; cancer and term ids are validated by
 * /staging/ at build time. Stage groupings are summarised to the level a clinician quotes at a tumour board (the
 * full TNM tables belong to the AJCC and UICC manuals, which are cited). Risk scores carry their inputs, points and
 * the published outcome ranges for each group; outcomes are quoted from the derivation or validation paper named.
 *
 * `settingMatch` lists lower-case fragments that identify the matching standard-of-care setting on the cancer page,
 * so each stage can link to what is done about it.
 */
export type StageGroup = { stage: string; definition: string; settingMatch?: string[]; note?: string };
export type StagingSystem = {
  id: string;
  cancerIds: string[];
  name: string;
  /** Glossary term ids to hover-link. */
  terms?: string[];
  groups: StageGroup[];
  source: { label: string; url: string };
  note?: string;
};

export type ScoreInput = { id: string; label: string; hint?: string; /** Points when ticked (checkbox input). */ points?: number; /** Multi-level input: pick one option. */ options?: Array<{ label: string; points: number }> };
export type RiskGroup = { label: string; min: number; max: number; outcome: string; settingMatch?: string[] };
export type RiskScoreDef = {
  id: string;
  cancerIds: string[];
  name: string;
  aka?: string[];
  terms?: string[];
  inputs: ScoreInput[];
  groups: RiskGroup[];
  /** What the outcome column reports, e.g. "5-year overall survival (derivation cohort)". */
  outcomeLabel: string;
  source: { label: string; url: string };
  note?: string;
};

const doi = (d: string) => `https://doi.org/${d}`;
const AJCC = { label: "AJCC Cancer Staging Manual, 8th edition (2017)", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/cancer-staging-systems/" };

export const stagingSystems: StagingSystem[] = [
  { id: "nsclc-tnm8", cancerIds: ["nsclc"], name: "Lung cancer TNM, 8th edition: stage groups", terms: ["tnm-staging"], source: { label: "Detterbeck et al., Chest 2017 (IASLC 8th edition)", url: doi("10.1016/j.chest.2016.10.010") },
    groups: [
      { stage: "IA1-IA3", definition: "T1a-c (3 cm or smaller) N0 M0; IA1 up to 1 cm, IA2 1-2 cm, IA3 2-3 cm.", settingMatch: ["stage i", "early", "resectable"] },
      { stage: "IB", definition: "T2a (3-4 cm, or main bronchus or visceral pleura) N0.", settingMatch: ["stage i", "early", "resectable"] },
      { stage: "IIA", definition: "T2b (4-5 cm) N0.", settingMatch: ["stage ii", "resectable", "adjuvant"] },
      { stage: "IIB", definition: "T1-2 N1, or T3 (5-7 cm, chest wall, separate nodule same lobe) N0.", settingMatch: ["stage ii", "resectable", "adjuvant", "neoadjuvant"] },
      { stage: "IIIA", definition: "T1-2 N2, T3 N1, or T4 (over 7 cm, mediastinal invasion, nodule in another ipsilateral lobe) N0-1.", settingMatch: ["stage iii", "locally advanced", "neoadjuvant", "perioperative"] },
      { stage: "IIIB", definition: "T1-2 N3, or T3-4 N2.", settingMatch: ["stage iii", "locally advanced", "unresectable"] },
      { stage: "IIIC", definition: "T3-4 N3.", settingMatch: ["stage iii", "unresectable"] },
      { stage: "IVA", definition: "M1a (pleural or pericardial spread, contralateral lung nodule) or M1b (single extrathoracic metastasis).", settingMatch: ["metastatic", "stage iv", "advanced"] },
      { stage: "IVB", definition: "M1c: multiple extrathoracic metastases.", settingMatch: ["metastatic", "stage iv", "advanced"] },
    ] },
  { id: "sclc-valg", cancerIds: ["sclc"], name: "Small-cell lung cancer: limited versus extensive stage", terms: ["limited-extensive-stage"], source: { label: "Kalemkerian et al., NCCN Small Cell Lung Cancer; VALG two-stage system", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1462" },
    groups: [
      { stage: "Limited stage", definition: "Confined to one hemithorax and regional nodes, encompassable in a tolerable radiotherapy field (roughly TNM I-III without malignant effusion); about a third of patients.", settingMatch: ["limited"] },
      { stage: "Extensive stage", definition: "Beyond one hemithorax, malignant pleural or pericardial effusion, or distant metastases (TNM IV); about two-thirds.", settingMatch: ["extensive", "metastatic"] },
    ] },
  { id: "colorectal-tnm8", cancerIds: ["colorectal"], name: "Colorectal cancer TNM, 8th edition: stage groups", terms: ["tnm-staging"], source: AJCC,
    groups: [
      { stage: "0", definition: "Tis: carcinoma in situ or intramucosal.", settingMatch: ["screening", "polyp"] },
      { stage: "I", definition: "T1-2 (submucosa or muscularis propria) N0.", settingMatch: ["stage i", "localised", "early", "resectable"] },
      { stage: "IIA / IIB / IIC", definition: "T3 N0 (through muscularis) / T4a N0 (visceral peritoneum) / T4b N0 (adjacent organs).", settingMatch: ["stage ii", "localised", "adjuvant"] },
      { stage: "IIIA / IIIB / IIIC", definition: "Any node-positive disease without metastasis: IIIA T1-2 N1 or T1 N2a; IIIB T3-4a N1, T2-3 N2a, T1-2 N2b; IIIC T4a N2a, T3-4a N2b, T4b N1-2.", settingMatch: ["stage iii", "adjuvant", "node"] },
      { stage: "IVA / IVB / IVC", definition: "M1a one organ or site / M1b more than one / M1c peritoneal metastasis with or without organ involvement.", settingMatch: ["metastatic", "stage iv"] },
    ] },
  { id: "breast-tnm8", cancerIds: ["breast-hr-positive", "breast-her2-positive", "tnbc"], name: "Breast cancer TNM, 8th edition: anatomic stage groups", terms: ["tnm-staging"], source: AJCC, note: "The 8th edition also defines prognostic stage groups that move tumours up or down by grade, ER, PR and HER2 status and, for T1-2 N0 HR-positive HER2-negative disease, a low-risk genomic assay result. Anatomic stage is shown here.",
    groups: [
      { stage: "0", definition: "Tis (DCIS).", settingMatch: ["dcis", "in situ", "prevention"] },
      { stage: "IA / IB", definition: "T1 (2 cm or smaller) N0 / T0-1 N1mi (micrometastases 0.2-2 mm).", settingMatch: ["stage i", "early", "node-negative"] },
      { stage: "IIA / IIB", definition: "T0-1 N1 or T2 (2-5 cm) N0 / T2 N1 or T3 (over 5 cm) N0.", settingMatch: ["stage ii", "early", "neoadjuvant", "adjuvant"] },
      { stage: "IIIA / IIIB / IIIC", definition: "T0-2 N2 or T3 N1-2 / T4 (chest wall, skin, inflammatory) N0-2 / any T N3 (10 or more axillary nodes, infraclavicular, internal mammary plus axillary, supraclavicular).", settingMatch: ["stage iii", "locally advanced", "neoadjuvant"] },
      { stage: "IV", definition: "M1: distant metastases.", settingMatch: ["metastatic"] },
    ] },
  { id: "melanoma-ajcc8", cancerIds: ["melanoma"], name: "Melanoma AJCC 8th edition", terms: ["breslow-thickness", "ulceration-melanoma"], source: { label: "Gershenwald et al., CA Cancer J Clin 2017", url: doi("10.3322/caac.21409") },
    groups: [
      { stage: "IA", definition: "T1a (under 0.8 mm, no ulceration) or T1b (under 0.8 mm ulcerated, or 0.8-1.0 mm) N0.", settingMatch: ["stage i", "localised", "early", "primary"] },
      { stage: "IB", definition: "T2a (1.0-2.0 mm, no ulceration) N0.", settingMatch: ["stage i", "localised", "sentinel"] },
      { stage: "IIA", definition: "T2b (1.0-2.0 mm ulcerated) or T3a (2.0-4.0 mm) N0.", settingMatch: ["stage ii", "sentinel"] },
      { stage: "IIB", definition: "T3b (2.0-4.0 mm ulcerated) or T4a (over 4 mm) N0.", settingMatch: ["stage ii", "adjuvant"] },
      { stage: "IIC", definition: "T4b (over 4 mm, ulcerated) N0.", settingMatch: ["stage ii", "adjuvant"] },
      { stage: "IIIA-IIID", definition: "Regional node or in-transit, satellite or microsatellite disease; substage by primary thickness and ulceration and by number and type (clinically occult versus detected) of nodes.", settingMatch: ["stage iii", "adjuvant", "neoadjuvant", "resectable"] },
      { stage: "IV", definition: "M1a skin, soft tissue, distant nodes; M1b lung; M1c other visceral (not CNS); M1d CNS. Each with (0) normal or (1) raised LDH.", settingMatch: ["metastatic", "unresectable", "brain"] },
    ] },
  { id: "prostate-nccn-risk", cancerIds: ["prostate"], name: "Localised prostate cancer: NCCN risk groups", terms: ["gleason-grade-group", "psa"], source: { label: "NCCN Prostate Cancer", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1459" },
    groups: [
      { stage: "Very low", definition: "cT1c, Grade Group 1, PSA under 10 ng/mL, fewer than 3 positive cores with 50% or less cancer in each, PSA density under 0.15.", settingMatch: ["very low", "low risk", "active surveillance"] },
      { stage: "Low", definition: "cT1-T2a, Grade Group 1, PSA under 10.", settingMatch: ["low risk", "active surveillance", "localised"] },
      { stage: "Favourable intermediate", definition: "One intermediate factor (cT2b-c, Grade Group 2-3, or PSA 10-20), Grade Group 1-2, under 50% of cores positive.", settingMatch: ["intermediate", "localised"] },
      { stage: "Unfavourable intermediate", definition: "Two or more intermediate factors, or Grade Group 3, or 50% or more cores positive.", settingMatch: ["intermediate", "localised"] },
      { stage: "High", definition: "cT3a, or Grade Group 4-5, or PSA over 20.", settingMatch: ["high risk", "high-risk", "locally advanced"] },
      { stage: "Very high", definition: "cT3b-T4, or primary Gleason pattern 5, or 2-3 high-risk features, or more than 4 cores Grade Group 4-5.", settingMatch: ["very high", "high risk", "high-risk", "locally advanced"] },
    ] },
  { id: "gleason-grade-groups", cancerIds: ["prostate"], name: "Gleason score and ISUP Grade Groups", terms: ["gleason-grade-group"], source: { label: "Epstein et al., Am J Surg Pathol 2016 (ISUP 2014 consensus)", url: doi("10.1097/PAS.0000000000000530") },
    groups: [
      { stage: "Grade Group 1", definition: "Gleason 3+3 = 6. Only individual, well-formed glands." },
      { stage: "Grade Group 2", definition: "Gleason 3+4 = 7. Predominantly well-formed glands with a lesser component of poorly formed, fused or cribriform glands." },
      { stage: "Grade Group 3", definition: "Gleason 4+3 = 7. Predominantly poorly formed, fused or cribriform glands." },
      { stage: "Grade Group 4", definition: "Gleason 8 (4+4, 3+5, 5+3)." },
      { stage: "Grade Group 5", definition: "Gleason 9-10. Lack of gland formation, necrosis, or both." },
    ] },
  { id: "lugano", cancerIds: ["dlbcl", "hodgkin-lymphoma", "follicular-lymphoma", "mantle-cell-lymphoma", "peripheral-t-cell-lymphoma"], name: "Lugano classification (modified Ann Arbor) for lymphoma", terms: ["lugano-classification", "deauville-score"], source: { label: "Cheson et al., JCO 2014", url: doi("10.1200/JCO.2013.54.8800") }, note: "Limited stage is I-II; advanced stage is III-IV. B symptoms (fever, night sweats, weight loss over 10% in 6 months) are recorded for Hodgkin lymphoma only. Bulk is a single mass of 10 cm or over a third of the transthoracic diameter (Hodgkin) or per histology for NHL.",
    groups: [
      { stage: "I", definition: "One node or group of adjacent nodes; or a single extranodal lesion without nodal involvement (IE).", settingMatch: ["limited stage", "early stage", "stage i", "localised"] },
      { stage: "II", definition: "Two or more nodal groups on the same side of the diaphragm; or stage I-II by nodal extent with limited contiguous extranodal involvement (IIE).", settingMatch: ["limited stage", "early stage", "stage ii"] },
      { stage: "II bulky", definition: "Stage II with bulky disease; treated as limited or advanced by histology and prognostic factors.", settingMatch: ["bulky", "advanced"] },
      { stage: "III", definition: "Nodes on both sides of the diaphragm, or nodes above the diaphragm with spleen involvement.", settingMatch: ["advanced", "stage iii"] },
      { stage: "IV", definition: "Additional non-contiguous extralymphatic involvement (marrow, liver, lung, CNS).", settingMatch: ["advanced", "stage iv"] },
    ] },
  { id: "iss-riss", cancerIds: ["multiple-myeloma"], name: "Myeloma ISS and R-ISS staging", terms: ["r-iss", "high-risk-myeloma"], source: { label: "Palumbo et al., JCO 2015 (R-ISS)", url: doi("10.1200/JCO.2015.61.2267") }, note: "ISS uses β2-microglobulin and albumin only. R-ISS adds interphase FISH (del(17p), t(4;14), t(14;16)) and LDH. R2-ISS (2022) further weights 1q gain. Use the interactive R-ISS scorer below.",
    groups: [
      { stage: "ISS I", definition: "β2-microglobulin under 3.5 mg/L and albumin 35 g/L or above." },
      { stage: "ISS II", definition: "Neither I nor III." },
      { stage: "ISS III", definition: "β2-microglobulin 5.5 mg/L or above." },
      { stage: "R-ISS I", definition: "ISS I, standard-risk cytogenetics and normal LDH.", settingMatch: ["standard risk", "newly diagnosed"] },
      { stage: "R-ISS II", definition: "Not R-ISS I or III.", settingMatch: ["newly diagnosed"] },
      { stage: "R-ISS III", definition: "ISS III with either high-risk cytogenetics or raised LDH.", settingMatch: ["high risk", "high-risk", "newly diagnosed"] },
    ] },
  { id: "bclc-2022", cancerIds: ["hcc"], name: "BCLC staging for hepatocellular carcinoma (2022 update)", terms: ["bclc-staging", "child-pugh-albi"], source: { label: "Reig et al., J Hepatol 2022", url: doi("10.1016/j.jhep.2021.11.018") },
    groups: [
      { stage: "0 (very early)", definition: "Single tumour 2 cm or smaller, preserved liver function, ECOG 0.", settingMatch: ["very early", "bclc 0", "early"] },
      { stage: "A (early)", definition: "Single tumour, or up to 3 nodules each 3 cm or smaller, preserved liver function, ECOG 0.", settingMatch: ["early", "bclc a", "resectable", "transplant"] },
      { stage: "B (intermediate)", definition: "Multinodular, preserved liver function, ECOG 0; subclassified by transplant candidacy and tumour burden.", settingMatch: ["intermediate", "bclc b", "tace"] },
      { stage: "C (advanced)", definition: "Portal invasion or extrahepatic spread, preserved liver function, ECOG 1-2.", settingMatch: ["advanced", "bclc c", "systemic", "unresectable", "first line"] },
      { stage: "D (terminal)", definition: "End-stage liver function or ECOG 3-4: best supportive care.", settingMatch: ["terminal", "supportive"] },
    ] },
  { id: "figo-ovarian-2014", cancerIds: ["ovarian"], name: "FIGO 2014 staging of ovarian, fallopian tube and peritoneal cancer", source: { label: "Prat et al., Int J Gynaecol Obstet 2014", url: doi("10.1016/j.ijgo.2013.10.001") },
    groups: [
      { stage: "I (IA-IC)", definition: "Confined to ovaries or tubes; IC for surgical spill, capsule rupture or positive washings.", settingMatch: ["early", "stage i"] },
      { stage: "II", definition: "Pelvic extension or primary peritoneal cancer confined to the pelvis.", settingMatch: ["early", "stage ii"] },
      { stage: "III (IIIA1-IIIC)", definition: "Spread to the peritoneum outside the pelvis or retroperitoneal nodes: IIIA1 nodes only, IIIA2 microscopic, IIIB 2 cm or smaller, IIIC over 2 cm.", settingMatch: ["advanced", "stage iii", "newly diagnosed", "first line", "maintenance"] },
      { stage: "IV (IVA-IVB)", definition: "Distant metastasis: IVA pleural effusion with positive cytology; IVB parenchymal or extra-abdominal metastases.", settingMatch: ["advanced", "stage iv", "newly diagnosed", "first line", "maintenance"] },
    ] },
  { id: "figo-cervical-2018", cancerIds: ["cervical"], name: "FIGO 2018 staging of cervical cancer", source: { label: "Bhatla et al., Int J Gynaecol Obstet 2019", url: doi("10.1002/ijgo.12749") }, note: "The 2018 revision allows imaging and pathology to assign stage and adds IIIC for nodal disease (IIIC1 pelvic, IIIC2 para-aortic).",
    groups: [
      { stage: "IA1 / IA2", definition: "Microscopic invasion under 3 mm / 3-5 mm.", settingMatch: ["early", "microinvasive", "fertility"] },
      { stage: "IB1 / IB2 / IB3", definition: "Invasion 5 mm or more and largest dimension under 2 cm / 2-4 cm / 4 cm or more.", settingMatch: ["early", "radical hysterectomy", "stage i"] },
      { stage: "IIA1 / IIA2 / IIB", definition: "Upper two-thirds of vagina under 4 cm / 4 cm or more / parametrial involvement.", settingMatch: ["locally advanced", "chemoradiation"] },
      { stage: "IIIA / IIIB / IIIC1 / IIIC2", definition: "Lower third of vagina / pelvic wall or hydronephrosis / pelvic nodes / para-aortic nodes.", settingMatch: ["locally advanced", "chemoradiation", "node"] },
      { stage: "IVA / IVB", definition: "Bladder or rectum invasion / distant metastasis.", settingMatch: ["metastatic", "recurrent", "stage iv"] },
    ] },
  { id: "binet", cancerIds: ["cll"], name: "Binet and Rai staging of CLL", source: { label: "Binet et al., Cancer 1981; Rai et al., Blood 1975", url: doi("10.1002/1097-0142(19810701)48:1<198::AID-CNCR2820480131>3.0.CO;2-V") }, note: "Staging decides when to treat (iwCLL active-disease criteria), not what to treat with; CLL-IPI (below) and TP53/IGHV status guide therapy choice.",
    groups: [
      { stage: "Binet A", definition: "Fewer than 3 involved lymphoid areas, haemoglobin 100 g/L or above, platelets 100 × 10⁹/L or above (Rai 0-II).", settingMatch: ["early", "watch", "asymptomatic", "observation"] },
      { stage: "Binet B", definition: "3 or more involved areas, counts preserved (Rai I-II).", settingMatch: ["active", "symptomatic", "untreated", "first line"] },
      { stage: "Binet C", definition: "Haemoglobin under 100 g/L or platelets under 100 × 10⁹/L (Rai III-IV).", settingMatch: ["active", "symptomatic", "untreated", "first line"] },
    ] },
  { id: "nmibc-risk", cancerIds: ["urothelial"], name: "Non-muscle-invasive bladder cancer risk groups", terms: ["nmibc-vs-mibc", "bcg-unresponsive"], source: { label: "EAU guidelines on non-muscle-invasive bladder cancer", url: "https://uroweb.org/guidelines/non-muscle-invasive-bladder-cancer" },
    groups: [
      { stage: "Low risk", definition: "Primary, solitary, Ta, low grade, under 3 cm, no CIS.", settingMatch: ["low risk", "low-risk", "nmibc", "non-muscle"] },
      { stage: "Intermediate risk", definition: "Ta low-grade tumours that are recurrent, multiple or 3 cm or larger, without high-risk features.", settingMatch: ["intermediate", "nmibc", "non-muscle"] },
      { stage: "High risk", definition: "T1, high grade, or CIS.", settingMatch: ["high risk", "high-risk", "nmibc", "bcg"] },
      { stage: "Very high risk", definition: "Combinations such as T1 high grade with CIS, multiple large recurrent T1 high grade, variant histology or lymphovascular invasion; early cystectomy is discussed.", settingMatch: ["very high", "high risk", "bcg-unresponsive", "cystectomy"] },
    ] },
  { id: "who-cns5-glioma", cancerIds: ["glioblastoma"], name: "WHO CNS5 (2021) classification of adult diffuse gliomas", terms: ["mgmt", "tumour-grade"], source: { label: "Louis et al., Neuro-Oncology 2021", url: doi("10.1093/neuonc/noab106") }, note: "Diagnosis is molecular first: IDH and 1p/19q status define the tumour type; grade is then assigned within the type. IDH-wild-type diffuse astrocytoma with TERT promoter mutation, EGFR amplification or +7/−10 is glioblastoma regardless of histology.",
    groups: [
      { stage: "Astrocytoma, IDH-mutant, grade 2", definition: "IDH1/2-mutant, 1p/19q intact, ATRX loss; low mitotic activity.", settingMatch: ["low-grade", "grade 2", "idh"] },
      { stage: "Astrocytoma, IDH-mutant, grade 3", definition: "As above with anaplasia and mitotic activity.", settingMatch: ["grade 3", "idh"] },
      { stage: "Astrocytoma, IDH-mutant, grade 4", definition: "As above with necrosis, microvascular proliferation or CDKN2A/B homozygous deletion.", settingMatch: ["grade 4", "idh"] },
      { stage: "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted, grade 2-3", definition: "Codeletion defines the type; grade 3 with anaplasia.", settingMatch: ["oligodendroglioma", "1p/19q", "low-grade"] },
      { stage: "Glioblastoma, IDH-wild-type, grade 4", definition: "IDH-wild-type with necrosis or microvascular proliferation, or TERT promoter mutation, EGFR amplification or +7/−10.", settingMatch: ["newly diagnosed", "glioblastoma", "chemoradiation"] },
    ] },
];

export const riskScores: RiskScoreDef[] = [
  { id: "r-ipi", cancerIds: ["dlbcl"], name: "International Prognostic Index (IPI) with R-IPI groups", aka: ["IPI", "R-IPI"], terms: ["ipi-score"], outcomeLabel: "4-year overall survival, rituximab era (R-IPI, Sehn 2007)", source: { label: "Sehn et al., Blood 2007 (R-IPI); Shipp et al., NEJM 1993 (IPI)", url: doi("10.1182/blood-2006-08-038257") },
    inputs: [
      { id: "age", label: "Age over 60", points: 1 }, { id: "ldh", label: "LDH above normal", points: 1 }, { id: "ecog", label: "ECOG performance status 2 or worse", points: 1 }, { id: "stage", label: "Ann Arbor stage III or IV", points: 1 }, { id: "extranodal", label: "More than one extranodal site", points: 1 },
    ],
    groups: [
      { label: "Very good (R-IPI)", min: 0, max: 0, outcome: "94% (4-year PFS 94%)" },
      { label: "Good (R-IPI)", min: 1, max: 2, outcome: "79% (4-year PFS 80%)" },
      { label: "Poor (R-IPI)", min: 3, max: 5, outcome: "55% (4-year PFS 53%)", settingMatch: ["high-risk", "ipi 3", "untreated"] },
    ], note: "Original IPI groups: low 0-1, low-intermediate 2, high-intermediate 3, high 4-5 with 5-year OS 73%, 51%, 43% and 26% before rituximab (Shipp 1993). NCCN-IPI (Zhou 2014) refines age and LDH bands." },
  { id: "flipi", cancerIds: ["follicular-lymphoma"], name: "FLIPI", aka: ["Follicular Lymphoma International Prognostic Index"], outcomeLabel: "10-year overall survival (derivation cohort, pre-rituximab)", source: { label: "Solal-Céligny et al., Blood 2004", url: doi("10.1182/blood-2003-12-4434") },
    inputs: [
      { id: "age", label: "Age over 60", points: 1 }, { id: "stage", label: "Ann Arbor stage III or IV", points: 1 }, { id: "hb", label: "Haemoglobin under 120 g/L", points: 1 }, { id: "nodal", label: "More than 4 nodal areas involved", points: 1 }, { id: "ldh", label: "LDH above normal", points: 1 },
    ],
    groups: [
      { label: "Low", min: 0, max: 1, outcome: "71%", settingMatch: ["low tumour burden", "watch", "observation"] },
      { label: "Intermediate", min: 2, max: 2, outcome: "51%" },
      { label: "High", min: 3, max: 5, outcome: "36%", settingMatch: ["high tumour burden", "first line"] },
    ], note: "FLIPI2 (Federico 2009) uses β2-microglobulin, node over 6 cm, marrow involvement, haemoglobin and age; PRIMA-PI uses β2-microglobulin and marrow alone." },
  { id: "imdc", cancerIds: ["rcc"], name: "IMDC (Heng) risk model for metastatic RCC", aka: ["Heng criteria"], terms: ["imdc-risk"], outcomeLabel: "Median overall survival on VEGF-targeted therapy (external validation, Heng 2013)", source: { label: "Heng et al., Lancet Oncology 2013 (validation); JCO 2009 (derivation)", url: doi("10.1016/S1470-2045(12)70559-4") },
    inputs: [
      { id: "kps", label: "Karnofsky performance status under 80%", points: 1 }, { id: "time", label: "Under 1 year from diagnosis to systemic treatment", points: 1 }, { id: "hb", label: "Haemoglobin below the lower limit of normal", points: 1 }, { id: "ca", label: "Corrected calcium above the upper limit of normal", points: 1 }, { id: "neut", label: "Neutrophils above the upper limit of normal", points: 1 }, { id: "plt", label: "Platelets above the upper limit of normal", points: 1 },
    ],
    groups: [
      { label: "Favourable", min: 0, max: 0, outcome: "43.2 months", settingMatch: ["favourable"] },
      { label: "Intermediate", min: 1, max: 2, outcome: "22.5 months", settingMatch: ["intermediate", "poor"] },
      { label: "Poor", min: 3, max: 6, outcome: "7.8 months", settingMatch: ["poor", "intermediate"] },
    ], note: "Derived in the VEGF-TKI era; survival on immunotherapy combinations is longer in every group, but the groups still select first-line regimens (nivolumab-ipilimumab is approved for intermediate and poor risk)." },
  { id: "r-iss", cancerIds: ["multiple-myeloma"], name: "R-ISS (Revised International Staging System)", terms: ["r-iss", "high-risk-myeloma"], outcomeLabel: "5-year overall survival (Palumbo 2015 pooled trials)", source: { label: "Palumbo et al., JCO 2015", url: doi("10.1200/JCO.2015.61.2267") },
    inputs: [
      { id: "iss", label: "ISS stage", options: [{ label: "ISS I (β2M under 3.5 mg/L and albumin 35 g/L or above)", points: 0 }, { label: "ISS II (neither I nor III)", points: 1 }, { label: "ISS III (β2M 5.5 mg/L or above)", points: 3 }] },
      { id: "fish", label: "High-risk FISH: del(17p), t(4;14) or t(14;16)", points: 1 }, { id: "ldh", label: "LDH above normal", points: 1 },
    ],
    groups: [
      { label: "R-ISS I", min: 0, max: 0, outcome: "82%" },
      { label: "R-ISS II", min: 1, max: 3, outcome: "62%" },
      { label: "R-ISS III", min: 4, max: 5, outcome: "40%", settingMatch: ["high risk", "high-risk"] },
    ], note: "Points here are a device to reproduce the R-ISS rules: stage III needs ISS III plus at least one of high-risk FISH or raised LDH; stage I needs ISS I with neither. Median OS was not reached, 83 months and 43 months." },
  { id: "cll-ipi", cancerIds: ["cll"], name: "CLL-IPI", terms: ["del17p-tp53", "ighv-status"], outcomeLabel: "5-year overall survival (derivation, chemoimmunotherapy era)", source: { label: "International CLL-IPI working group, Lancet Oncology 2016", url: doi("10.1016/S1470-2045(16)30029-8") },
    inputs: [
      { id: "tp53", label: "TP53 deleted or mutated", points: 4 }, { id: "ighv", label: "IGHV unmutated", points: 2 }, { id: "b2m", label: "β2-microglobulin over 3.5 mg/L", points: 2 }, { id: "stage", label: "Binet B-C or Rai I-IV", points: 1 }, { id: "age", label: "Age over 65", points: 1 },
    ],
    groups: [
      { label: "Low", min: 0, max: 1, outcome: "93.2%", settingMatch: ["watch", "early", "asymptomatic"] },
      { label: "Intermediate", min: 2, max: 3, outcome: "79.3%" },
      { label: "High", min: 4, max: 6, outcome: "63.3%", settingMatch: ["untreated", "first line"] },
      { label: "Very high", min: 7, max: 10, outcome: "23.3%", settingMatch: ["del(17p)", "tp53", "untreated"] },
    ], note: "Outcomes predate BTK and BCL-2 inhibitors; with targeted therapy the survival gap between groups narrows but TP53 status still changes the regimen." },
  { id: "mipi-s", cancerIds: ["mantle-cell-lymphoma"], name: "Simplified MIPI", aka: ["MIPI", "Mantle Cell Lymphoma International Prognostic Index"], outcomeLabel: "Median overall survival (derivation, Hoster 2008)", source: { label: "Hoster et al., Blood 2008", url: doi("10.1182/blood-2007-06-095331") },
    inputs: [
      { id: "age", label: "Age", options: [{ label: "Under 50", points: 0 }, { label: "50-59", points: 1 }, { label: "60-69", points: 2 }, { label: "70 or over", points: 3 }] },
      { id: "ecog", label: "ECOG performance status 2-4", points: 2 },
      { id: "ldh", label: "LDH / upper limit of normal", options: [{ label: "Under 0.67", points: 0 }, { label: "0.67-0.99", points: 1 }, { label: "1.00-1.49", points: 2 }, { label: "1.50 or over", points: 3 }] },
      { id: "wbc", label: "White cell count (× 10⁹/L)", options: [{ label: "Under 6.7", points: 0 }, { label: "6.7-9.9", points: 1 }, { label: "10.0-14.9", points: 2 }, { label: "15.0 or over", points: 3 }] },
    ],
    groups: [
      { label: "Low", min: 0, max: 3, outcome: "Not reached (5-year OS 60%)" },
      { label: "Intermediate", min: 4, max: 5, outcome: "51 months" },
      { label: "High", min: 6, max: 11, outcome: "29 months", settingMatch: ["high risk", "high-risk"] },
    ], note: "Ki-67 of 30% or more adds independent risk (MIPI-c). Outcomes predate BTK inhibitors and cytarabine-based induction." },
  { id: "child-pugh", cancerIds: ["hcc"], name: "Child-Pugh score", terms: ["child-pugh-albi", "bclc-staging"], outcomeLabel: "Class and what it means for treatment", source: { label: "Pugh et al., Br J Surg 1973", url: doi("10.1002/bjs.1800600817") },
    inputs: [
      { id: "bili", label: "Bilirubin", options: [{ label: "Under 34 µmol/L (2 mg/dL)", points: 1 }, { label: "34-50 µmol/L (2-3 mg/dL)", points: 2 }, { label: "Over 50 µmol/L (3 mg/dL)", points: 3 }] },
      { id: "alb", label: "Albumin", options: [{ label: "Over 35 g/L", points: 1 }, { label: "28-35 g/L", points: 2 }, { label: "Under 28 g/L", points: 3 }] },
      { id: "inr", label: "INR", options: [{ label: "Under 1.7", points: 1 }, { label: "1.7-2.3", points: 2 }, { label: "Over 2.3", points: 3 }] },
      { id: "ascites", label: "Ascites", options: [{ label: "None", points: 1 }, { label: "Mild or diuretic-controlled", points: 2 }, { label: "Moderate to severe", points: 3 }] },
      { id: "enceph", label: "Encephalopathy", options: [{ label: "None", points: 1 }, { label: "Grade 1-2", points: 2 }, { label: "Grade 3-4", points: 3 }] },
    ],
    groups: [
      { label: "Class A (5-6)", min: 5, max: 6, outcome: "Preserved function: eligible for resection, ablation, TACE and the systemic trials (IMbrave150, HIMALAYA enrolled Child-Pugh A only).", settingMatch: ["child-pugh a", "advanced", "first line", "resectable"] },
      { label: "Class B (7-9)", min: 7, max: 9, outcome: "Decompensating: systemic therapy on a case-by-case basis; sorafenib and lenvatinib have B7 data; transplant if within criteria.", settingMatch: ["child-pugh b", "transplant"] },
      { label: "Class C (10-15)", min: 10, max: 15, outcome: "Decompensated: transplant assessment or best supportive care; anticancer therapy is usually harmful.", settingMatch: ["terminal", "supportive", "transplant"] },
    ], note: "ALBI grade (albumin and bilirubin only) is a more objective alternative used in trials." },
  { id: "khorana", cancerIds: ["pancreatic", "gastric", "nsclc", "dlbcl", "ovarian", "urothelial", "testicular", "endometrial", "cervical"], name: "Khorana score for chemotherapy-associated venous thromboembolism", outcomeLabel: "Symptomatic VTE over a median 2.5 months of chemotherapy (derivation cohort)", source: { label: "Khorana et al., Blood 2008", url: doi("10.1182/blood-2007-10-116327") },
    inputs: [
      { id: "site", label: "Cancer site", options: [{ label: "Other", points: 0 }, { label: "High risk: lung, lymphoma, gynaecological, bladder, testicular", points: 1 }, { label: "Very high risk: stomach, pancreas", points: 2 }] },
      { id: "plt", label: "Pre-chemotherapy platelets 350 × 10⁹/L or above", points: 1 }, { id: "hb", label: "Haemoglobin under 100 g/L or on an erythropoiesis-stimulating agent", points: 1 }, { id: "wbc", label: "White cell count over 11 × 10⁹/L", points: 1 }, { id: "bmi", label: "BMI 35 kg/m² or above", points: 1 },
    ],
    groups: [
      { label: "Low", min: 0, max: 0, outcome: "0.3%" },
      { label: "Intermediate", min: 1, max: 2, outcome: "2.0%" },
      { label: "High", min: 3, max: 6, outcome: "6.7%" },
    ], note: "ASCO and NCCN suggest offering apixaban or rivaroxaban thromboprophylaxis to ambulatory patients scoring 2 or more (AVERT, CASSINI), after weighing bleeding risk." },
];
