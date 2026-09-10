/**
 * Guideline concordance map: for a set of clinically important settings, what each body says.
 * Keyed `cancerId#setting`. Bodies: NCCN (US), ESMO (Europe, with ESMO-MCBS grade where published), NICE (England,
 * technology appraisals which decide NHS funding), ASCO (US society guidelines). CSCO/JSMO slots exist for later.
 *
 * Side data pending promotion into `standardOfCare.guideline` (GAPS notes the schema has no slot for NICE/ASCO).
 * Every `refs` id is validated against the graph by /guidelines/. Stances:
 *   preferred          the body names it the preferred option
 *   recommended        recommended or funded without restriction beyond the licence
 *   restricted         recommended only for a narrower population, or only via a managed fund (e.g. CDF)
 *   not-recommended    appraised and rejected, or recommended against
 *   not-appraised      the body has not published on it (recorded so the gap is visible)
 * NICE entries link to the technology appraisal where the number is verified, otherwise to a NICE search.
 */
export type GuidelineBodyId = "NCCN" | "ESMO" | "NICE" | "ASCO" | "CSCO" | "JSMO";
export type Stance = "preferred" | "recommended" | "restricted" | "not-recommended" | "not-appraised";
export type BodyEntry = {
  body: GuidelineBodyId;
  stance: Stance;
  /** What the body says, one sentence. */
  recommendation: string;
  /** NCCN category, ESMO-MCBS grade, ESMO level/grade, NICE TA number. */
  grade?: string;
  /** YYYY or YYYY-MM. */
  date: string;
  url: string;
  note?: string;
};
export type GuidelineMapEntry = {
  key: string;
  cancerId: string;
  setting: string;
  /** The intervention the bodies are being compared on. */
  intervention: string;
  refs: string[];
  bodies: BodyEntry[];
};

export const BODY_META: Record<GuidelineBodyId, { label: string; region: string; url: string; what: string }> = {
  NCCN: { label: "NCCN", region: "United States", url: "https://www.nccn.org/guidelines/category_1", what: "National Comprehensive Cancer Network. Category 1 = high-level evidence with uniform consensus; 2A = lower evidence, uniform consensus; 2B = lower evidence, consensus; 3 = major disagreement. 'Preferred' marks the panel's first choice." },
  ESMO: { label: "ESMO", region: "Europe", url: "https://www.esmo.org/guidelines", what: "European Society for Medical Oncology Clinical Practice Guidelines. Level I-V evidence and grade A-E recommendation; ESMO-MCBS scores clinical benefit A-C (curative) or 5-1 (non-curative), with 4-5 or A-B counting as substantial." },
  NICE: { label: "NICE", region: "England and Wales", url: "https://www.nice.org.uk/guidance/conditions-and-diseases/cancer", what: "National Institute for Health and Care Excellence technology appraisals decide whether the NHS in England must fund a treatment, on cost-effectiveness as well as efficacy. 'Cancer Drugs Fund' means interim funding while evidence matures." },
  ASCO: { label: "ASCO", region: "United States", url: "https://society.asco.org/practice-patients/guidelines", what: "American Society of Clinical Oncology guidelines and rapid recommendation updates, evidence-based with strength of recommendation stated." },
  CSCO: { label: "CSCO", region: "China", url: "https://www.csco.org.cn/", what: "Chinese Society of Clinical Oncology guidelines, which grade by evidence and by access in China." },
  JSMO: { label: "JSMO", region: "Japan", url: "https://www.jsmo.or.jp/en/", what: "Japanese Society of Medical Oncology." },
};

const nccn = (id: number) => `https://www.nccn.org/guidelines/guidelines-detail?category=1&id=${id}`;
const esmo = (path: string) => `https://www.esmo.org/guidelines/guidelines-by-topic/${path}`;
const ta = (n: number) => `https://www.nice.org.uk/guidance/ta${n}`;
const niceSearch = (q: string) => `https://www.nice.org.uk/search?q=${encodeURIComponent(q)}`;
const asco = (topic: string) => `https://society.asco.org/practice-patients/guidelines/${topic}`;
const ESMO_BREAST = esmo("esmo-clinical-practice-guidelines-breast-cancer/metastatic-breast-cancer");
const ESMO_EARLY_BREAST = esmo("esmo-clinical-practice-guidelines-breast-cancer/early-breast-cancer");
const ESMO_NSCLC = esmo("esmo-clinical-practice-guidelines-lung-and-chest-tumours/metastatic-non-small-cell-lung-cancer");
const ESMO_NSCLC_EARLY = esmo("esmo-clinical-practice-guidelines-lung-and-chest-tumours/early-stage-and-locally-advanced-non-metastatic-non-small-cell-lung-cancer");

export const guidelineMap: GuidelineMapEntry[] = [
  { key: "tnbc#Stage II-III, neoadjuvant", cancerId: "tnbc", setting: "Stage II-III, neoadjuvant", intervention: "Pembrolizumab with chemotherapy before surgery, continued after (KEYNOTE-522)", refs: ["pembrolizumab", "keynote-522"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred regimen for stage II-III TNBC.", grade: "Category 1, preferred", date: "2021-07", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended for stage II-III TNBC.", grade: "I, A; ESMO-MCBS A", date: "2024-02", url: ESMO_EARLY_BREAST },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for neoadjuvant and adjuvant treatment of high-risk early TNBC.", grade: "TA851", date: "2022-12", url: ta(851) },
  ] },
  { key: "breast-hr-positive#Metastatic, HER2-low, after chemotherapy", cancerId: "breast-hr-positive", setting: "Metastatic, HER2-low, after chemotherapy", intervention: "Trastuzumab deruxtecan for HER2-low metastatic breast cancer after one chemotherapy (DESTINY-Breast04)", refs: ["trastuzumab-deruxtecan", "destiny-breast04"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred after one line of chemotherapy for HER2-low disease.", grade: "Category 1, preferred", date: "2022-08", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended in the living guideline for HER2-low disease after endocrine therapy and one chemotherapy.", grade: "I, A; ESMO-MCBS 4", date: "2023", url: ESMO_BREAST },
    { body: "NICE", stance: "not-recommended", recommendation: "Not recommended for HER2-low metastatic breast cancer after chemotherapy: final guidance found it not cost-effective at the offered price, after a public campaign and a failed price negotiation.", date: "2024", url: niceSearch("trastuzumab deruxtecan HER2-low"), note: "Scotland (SMC) accepted it in 2023, so access differs within the UK." },
    { body: "ASCO", stance: "recommended", recommendation: "Rapid recommendation update: trastuzumab deruxtecan should be offered to patients with HER2-low disease after at least one chemotherapy.", date: "2023", url: asco("breast-cancer") },
  ] },
  { key: "breast-her2-positive#Metastatic, second line", cancerId: "breast-her2-positive", setting: "Metastatic, second line", intervention: "Trastuzumab deruxtecan after trastuzumab and a taxane (DESTINY-Breast03)", refs: ["trastuzumab-deruxtecan", "destiny-breast03"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred second-line regimen.", grade: "Category 1, preferred", date: "2022-05", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended second line after trastuzumab-pertuzumab-taxane.", grade: "I, A; ESMO-MCBS 4", date: "2023", url: ESMO_BREAST },
    { body: "NICE", stance: "recommended", recommendation: "Recommended after one or more anti-HER2 treatments for unresectable or metastatic disease.", grade: "TA862", date: "2023-02", url: ta(862) },
    { body: "ASCO", stance: "recommended", recommendation: "Rapid update: trastuzumab deruxtecan recommended as second-line therapy.", date: "2022", url: asco("breast-cancer") },
  ] },
  { key: "breast-her2-positive#Metastatic, later lines and brain metastases", cancerId: "breast-her2-positive", setting: "Metastatic, later lines and brain metastases", intervention: "Tucatinib with trastuzumab and capecitabine (HER2CLIMB)", refs: ["tucatinib", "her2climb"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended after one or more HER2 regimens, including patients with brain metastases.", grade: "Category 1 (third line)", date: "2020-04", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended after trastuzumab deruxtecan, particularly with active brain metastases.", grade: "I, A; ESMO-MCBS 4", date: "2023", url: ESMO_BREAST },
    { body: "NICE", stance: "restricted", recommendation: "Recommended only after two or more anti-HER2 treatment regimens, narrower than the licence and NCCN.", grade: "TA786", date: "2022-04", url: ta(786) },
  ] },
  { key: "breast-hr-positive#Adjuvant, high risk", cancerId: "breast-hr-positive", setting: "Adjuvant, high risk", intervention: "Abemaciclib for 2 years with endocrine therapy (monarchE)", refs: ["abemaciclib", "monarche"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended for node-positive high-risk disease (4 or more nodes, or 1-3 nodes with grade 3 or tumour 5 cm or larger).", grade: "Category 1", date: "2021-10", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended for high-risk node-positive disease.", grade: "I, A; ESMO-MCBS A", date: "2024-02", url: ESMO_EARLY_BREAST },
    { body: "NICE", stance: "recommended", recommendation: "Recommended with endocrine therapy for node-positive high-risk early breast cancer.", grade: "TA810", date: "2022-07", url: ta(810) },
    { body: "ASCO", stance: "recommended", recommendation: "Rapid update: abemaciclib for 2 years may be offered to patients meeting monarchE high-risk criteria.", date: "2022", url: asco("breast-cancer") },
  ] },
  { key: "tnbc#Adjuvant, germline BRCA, high risk", cancerId: "tnbc", setting: "Adjuvant, germline BRCA, high risk", intervention: "Olaparib for one year after chemotherapy (OlympiA)", refs: ["olaparib", "olympia"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended for germline BRCA-mutated high-risk HER2-negative early breast cancer.", grade: "Category 1", date: "2022-03", url: nccn(1419) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended for germline BRCA carriers with high-risk disease after chemotherapy.", grade: "I, A; ESMO-MCBS A", date: "2024-02", url: ESMO_EARLY_BREAST },
    { body: "NICE", stance: "recommended", recommendation: "Recommended as adjuvant treatment of BRCA-mutated HER2-negative high-risk early breast cancer after chemotherapy.", grade: "TA886", date: "2023-06", url: ta(886) },
  ] },
  { key: "nsclc#Metastatic, EGFR-mutant, first line", cancerId: "nsclc", setting: "Metastatic, EGFR-mutant, first line", intervention: "Osimertinib first line (FLAURA)", refs: ["osimertinib", "flaura2"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line therapy for EGFR ex19del or L858R.", grade: "Category 1, preferred", date: "2018-04", url: nccn(1450) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first-line EGFR TKI.", grade: "I, A; ESMO-MCBS 4", date: "2023", url: ESMO_NSCLC },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated locally advanced or metastatic EGFR mutation-positive NSCLC.", grade: "TA654", date: "2020-10", url: ta(654) },
    { body: "ASCO", stance: "recommended", recommendation: "Living guideline: osimertinib recommended first line for sensitising EGFR mutations.", date: "2022", url: asco("thoracic-cancer") },
  ] },
  { key: "nsclc#Adjuvant, EGFR-mutant, stage IB-IIIA", cancerId: "nsclc", setting: "Adjuvant, EGFR-mutant, stage IB-IIIA", intervention: "Osimertinib for 3 years after resection (ADAURA)", refs: ["osimertinib", "adaura"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended after resection and adjuvant chemotherapy for stage IB-IIIA EGFR-mutant disease.", grade: "Category 1", date: "2020-12", url: nccn(1450) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended for resected stage IB-IIIA EGFR-mutant NSCLC.", grade: "I, A; ESMO-MCBS A", date: "2023", url: ESMO_NSCLC_EARLY },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for adjuvant treatment after complete resection of EGFR mutation-positive stage IB-IIIA NSCLC.", grade: "TA761", date: "2022-01", url: ta(761) },
    { body: "ASCO", stance: "recommended", recommendation: "Rapid recommendation update: adjuvant osimertinib recommended for resected stage IB-IIIA EGFR-mutant NSCLC.", date: "2022", url: asco("thoracic-cancer") },
  ] },
  { key: "nsclc#Stage III unresectable, after chemoradiation", cancerId: "nsclc", setting: "Stage III unresectable, after chemoradiation", intervention: "Durvalumab consolidation for 12 months (PACIFIC)", refs: ["durvalumab", "pacific"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended for all patients without progression after platinum chemoradiation, regardless of PD-L1.", grade: "Category 1", date: "2018", url: nccn(1450) },
    { body: "ESMO", stance: "restricted", recommendation: "Recommended for PD-L1 1% or above, following the EMA licence; the PD-L1-negative subgroup showed no overall-survival benefit in an unplanned analysis.", grade: "I, A (PD-L1 1% or above); ESMO-MCBS A", date: "2023", url: ESMO_NSCLC_EARLY },
    { body: "NICE", stance: "restricted", recommendation: "Recommended for PD-L1 1% or above only, in line with the marketing authorisation.", grade: "TA798 (after CDF entry as TA578, 2019)", date: "2022-05", url: ta(798) },
    { body: "ASCO", stance: "recommended", recommendation: "Stage III NSCLC guideline: consolidation durvalumab recommended after concurrent chemoradiation.", date: "2022", url: asco("thoracic-cancer") },
  ] },
  { key: "rcc#Untreated advanced clear-cell, intermediate or poor risk", cancerId: "rcc", setting: "Untreated advanced clear-cell, intermediate or poor risk", intervention: "Nivolumab plus ipilimumab (CheckMate 214)", refs: ["nivolumab", "ipilimumab", "checkmate-214"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line regimen for intermediate and poor risk.", grade: "Category 1, preferred", date: "2018-04", url: nccn(1440) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first line for intermediate and poor risk.", grade: "I, A; ESMO-MCBS 4", date: "2021", url: esmo("esmo-clinical-practice-guidelines-genitourinary-cancers/renal-cell-carcinoma") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated intermediate or poor-risk advanced RCC.", grade: "TA780", date: "2022-04", url: ta(780) },
    { body: "ASCO", stance: "recommended", recommendation: "Metastatic clear-cell RCC guideline: nivolumab-ipilimumab or a PD-1 inhibitor with a VEGFR TKI recommended for intermediate and poor risk.", date: "2022", url: asco("genitourinary-cancer") },
  ] },
  { key: "rcc#Untreated advanced clear-cell, any risk", cancerId: "rcc", setting: "Untreated advanced clear-cell, any risk", intervention: "Pembrolizumab plus axitinib (KEYNOTE-426)", refs: ["pembrolizumab", "axitinib", "keynote-426"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line regimen across risk groups.", grade: "Category 1, preferred", date: "2019-04", url: nccn(1440) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first line across IMDC risk groups.", grade: "I, A; ESMO-MCBS 4", date: "2021", url: esmo("esmo-clinical-practice-guidelines-genitourinary-cancers/renal-cell-carcinoma") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated advanced RCC.", grade: "TA650", date: "2020-09", url: ta(650) },
    { body: "ASCO", stance: "recommended", recommendation: "Recommended first-line option across risk groups.", date: "2022", url: asco("genitourinary-cancer") },
  ] },
  { key: "colorectal#Metastatic, MSI-high / dMMR, first line", cancerId: "colorectal", setting: "Metastatic, MSI-high / dMMR, first line", intervention: "Pembrolizumab monotherapy (KEYNOTE-177)", refs: ["pembrolizumab", "keynote-177"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line therapy for MSI-high or dMMR disease; nivolumab-ipilimumab added in 2025.", grade: "Category 1, preferred", date: "2020-06", url: nccn(1428) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first line for MSI-high disease.", grade: "I, A; ESMO-MCBS 4", date: "2023-01", url: esmo("esmo-clinical-practice-guidelines-gastrointestinal-cancers/metastatic-colorectal-cancer") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated metastatic MSI-high or dMMR colorectal cancer.", grade: "TA709", date: "2021-07", url: ta(709) },
  ] },
  { key: "urothelial#Metastatic, first line", cancerId: "urothelial", setting: "Metastatic, first line", intervention: "Enfortumab vedotin plus pembrolizumab (EV-302)", refs: ["enfortumab-vedotin", "pembrolizumab", "ev-302"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line regimen regardless of cisplatin eligibility.", grade: "Category 1, preferred", date: "2024-03", url: nccn(1417) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first line in the living guideline.", grade: "I, A; ESMO-MCBS 4", date: "2024", url: esmo("esmo-clinical-practice-guidelines-genitourinary-cancers/bladder-cancer") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated unresectable or metastatic urothelial cancer.", date: "2024", url: niceSearch("enfortumab vedotin with pembrolizumab untreated urothelial") },
  ] },
  { key: "esophageal#Adjuvant after chemoradiation, residual disease", cancerId: "esophageal", setting: "Adjuvant after chemoradiation, residual disease", intervention: "Nivolumab for one year after neoadjuvant chemoradiation and surgery with residual disease (CheckMate 577)", refs: ["nivolumab", "checkmate-577"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended for residual pathological disease after trimodality therapy.", grade: "Category 1", date: "2021-05", url: nccn(1433) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended in the oesophageal cancer guideline for residual disease after neoadjuvant chemoradiation.", grade: "I, A", date: "2022", url: esmo("esmo-clinical-practice-guidelines-gastrointestinal-cancers/oesophageal-cancer") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for adjuvant treatment of oesophageal or gastro-oesophageal junction cancer after neoadjuvant chemoradiation with residual disease.", grade: "TA746", date: "2021-11", url: ta(746) },
  ] },
  { key: "ovarian#Newly diagnosed, BRCA-mutated, maintenance", cancerId: "ovarian", setting: "Newly diagnosed, BRCA-mutated, maintenance", intervention: "Olaparib maintenance for 2 years after platinum response (SOLO-1)", refs: ["olaparib", "solo-1"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended maintenance for BRCA-mutated disease after complete or partial response to platinum.", grade: "Category 1", date: "2018-12", url: nccn(1453) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended maintenance for BRCA-mutated disease.", grade: "I, A", date: "2023-10", url: esmo("esmo-clinical-practice-guidelines-gynaecological-cancers/newly-diagnosed-and-relapsed-epithelial-ovarian-carcinoma") },
    { body: "NICE", stance: "restricted", recommendation: "Recommended within the Cancer Drugs Fund for BRCA-mutated advanced ovarian cancer after first-line platinum response; routine commissioning followed later.", grade: "TA598", date: "2019-07", url: ta(598) },
    { body: "ASCO", stance: "recommended", recommendation: "PARP inhibitors in ovarian cancer guideline: olaparib maintenance recommended for BRCA-mutated newly diagnosed disease.", date: "2020", url: asco("gynecologic-cancer") },
  ] },
  { key: "melanoma#Unresectable or metastatic, BRAF V600-mutant, first line", cancerId: "melanoma", setting: "Unresectable or metastatic, BRAF V600-mutant, first line", intervention: "Immunotherapy before BRAF/MEK inhibition (DREAMseq)", refs: ["nivolumab", "ipilimumab", "dabrafenib-trametinib", "dreamseq"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Checkpoint inhibitor therapy preferred first line for BRAF-mutant disease; BRAF/MEK on progression.", grade: "Category 1, preferred", date: "2023", url: nccn(1492) },
    { body: "ESMO", stance: "recommended", recommendation: "Immunotherapy recommended first line for BRAF-mutant disease unless rapid response is needed.", grade: "I, A", date: "2024", url: esmo("esmo-clinical-practice-guidelines-melanoma/cutaneous-melanoma") },
    { body: "ASCO", stance: "recommended", recommendation: "Systemic therapy for melanoma guideline update: immunotherapy first for BRAF-mutant disease; targeted therapy reserved for symptomatic bulky disease.", date: "2023", url: asco("melanoma") },
  ] },
  { key: "cll#Untreated, del(17p) or TP53-mutated", cancerId: "cll", setting: "Untreated, del(17p) or TP53-mutated", intervention: "Targeted therapy (BTK inhibitor or venetoclax-obinutuzumab) instead of chemoimmunotherapy", refs: ["acalabrutinib", "venetoclax", "obinutuzumab", "cll14", "elevate-tn"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Second-generation BTK inhibitor or venetoclax-obinutuzumab preferred; chemoimmunotherapy not recommended.", grade: "Category 1, preferred", date: "2023", url: nccn(1478) },
    { body: "ESMO", stance: "recommended", recommendation: "Targeted therapy only; no chemoimmunotherapy for TP53 aberration.", grade: "I, A", date: "2021-01", url: esmo("esmo-clinical-practice-guidelines-haematological-malignancies/chronic-lymphocytic-leukaemia") },
    { body: "NICE", stance: "recommended", recommendation: "Acalabrutinib recommended for untreated CLL with del(17p) or TP53 mutation (TA689); venetoclax with obinutuzumab recommended for untreated CLL (TA663).", grade: "TA689; TA663", date: "2021-05", url: ta(689) },
  ] },
  { key: "hcc#Unresectable, first line", cancerId: "hcc", setting: "Unresectable, first line", intervention: "Atezolizumab plus bevacizumab (IMbrave150)", refs: ["atezolizumab", "bevacizumab", "imbrave150"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line regimen for Child-Pugh A disease.", grade: "Category 1, preferred", date: "2020-06", url: nccn(1514) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended first line.", grade: "I, A; ESMO-MCBS 4", date: "2021", url: esmo("esmo-clinical-practice-guidelines-gastrointestinal-cancers/hepatocellular-carcinoma") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended for untreated advanced or unresectable HCC in Child-Pugh A with ECOG 0-1.", grade: "TA666", date: "2020-12", url: ta(666) },
  ] },
  { key: "gastric#Metastatic, HER2-negative, first line", cancerId: "gastric", setting: "Metastatic, HER2-negative, first line", intervention: "Nivolumab with fluoropyrimidine-platinum chemotherapy (CheckMate 649)", refs: ["nivolumab", "checkmate-649"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended for PD-L1 CPS 1 or above, preferred for CPS 5 or above (FDA label narrowed to CPS 1 or above in 2024).", grade: "Category 1 (CPS 5 or above); 2B (CPS 1-4)", date: "2021-04", url: nccn(1434) },
    { body: "ESMO", stance: "restricted", recommendation: "Recommended for CPS 5 or above only; benefit not shown below that threshold.", grade: "I, A; ESMO-MCBS 4 (CPS 5 or above)", date: "2022-10", url: esmo("esmo-clinical-practice-guidelines-gastrointestinal-cancers/gastric-cancer") },
    { body: "NICE", stance: "restricted", recommendation: "Recommended only for PD-L1 CPS 5 or above.", grade: "TA857", date: "2023-02", url: ta(857) },
  ] },
  { key: "endometrial#Advanced or recurrent, dMMR, first line", cancerId: "endometrial", setting: "Advanced or recurrent, dMMR, first line", intervention: "Dostarlimab with carboplatin-paclitaxel (RUBY)", refs: ["dostarlimab", "ruby"], bodies: [
    { body: "NCCN", stance: "preferred", recommendation: "Preferred first-line regimen for advanced or recurrent disease, with the largest benefit in dMMR tumours.", grade: "Category 1, preferred", date: "2023-07", url: nccn(1473) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended for dMMR advanced or recurrent disease in the living guideline.", grade: "I, A", date: "2024", url: esmo("esmo-clinical-practice-guidelines-gynaecological-cancers/endometrial-cancer") },
    { body: "NICE", stance: "recommended", recommendation: "Recommended with platinum-based chemotherapy for primary advanced or recurrent dMMR endometrial cancer.", date: "2024", url: niceSearch("dostarlimab carboplatin paclitaxel endometrial") },
  ] },
  { key: "prostate#Metastatic castration-resistant, PSMA PET-positive", cancerId: "prostate", setting: "Metastatic castration-resistant, PSMA PET-positive", intervention: "177Lu-PSMA-617 (VISION, PSMAfore)", refs: ["pluvicto", "vision", "psmafore"], bodies: [
    { body: "NCCN", stance: "recommended", recommendation: "Recommended after an AR pathway inhibitor, with or without prior taxane.", grade: "Category 1", date: "2022-03", url: nccn(1459) },
    { body: "ESMO", stance: "recommended", recommendation: "Recommended after AR pathway inhibitor and taxane in the living guideline.", grade: "I, A; ESMO-MCBS 4", date: "2024", url: esmo("esmo-clinical-practice-guidelines-genitourinary-cancers/prostate-cancer") },
    { body: "NICE", stance: "not-appraised", recommendation: "No positive final technology appraisal recorded in our data; the 2023 draft did not recommend it on cost-effectiveness. Verify current status at NICE.", date: "2023", url: niceSearch("lutetium-177 vipivotide tetraxetan") },
  ] },
];
