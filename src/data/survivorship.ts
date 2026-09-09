/**
 * Survivorship and late-effects registry: for each treatment class, the late effects worth watching for,
 * the screening test, how often, and the guideline that says so. Side data keyed by treatment class;
 * `matchDrugIds` and `matchTechnologyIds` are entity ids in this corpus (validated at build by /survivorship/),
 * `matchModalityRe` is a regex source tested against `drug.modality` so new products match by class.
 *
 * Intervals are stated only where the cited guideline gives one; otherwise "per guideline". No invented numbers.
 * Sources: Children's Oncology Group Long-Term Follow-Up Guidelines v6 (2023), ASCO survivorship and
 * cardio-oncology guidelines, ESC 2022 cardio-oncology guideline, ESMO immunotherapy toxicity guideline,
 * ASTCT/EBMT post-transplant screening recommendations, NCI PDQ, NCCN Survivorship, FDA class labelling.
 */
export type OrganSystem =
  | "Heart and blood vessels" | "Lungs" | "Hormones and metabolism" | "Bones" | "Fertility and sexual health"
  | "Kidneys and bladder" | "Hearing, eyes and nerves" | "Blood and immune system" | "Second cancers"
  | "Brain and thinking" | "Mouth, teeth and gut" | "Wellbeing";

export type Source = { label: string; url: string };

export type LateEffect = {
  effect: string;
  system: OrganSystem;
  /** What test or check. */
  screening: string;
  /** How often, as the guideline states it, or "per guideline". */
  interval: string;
  source: Source;
  note?: string;
};

export type SurvivorshipEntry = {
  id: string;
  label: string;
  /** One plain sentence on why this class has late effects. */
  plain: string;
  matchDrugIds: string[];
  /** Regex source (case-insensitive) against drug.modality. */
  matchModalityRe?: string;
  matchTechnologyIds: string[];
  /** Radiotherapy fields cannot be inferred from a technology id; the reader picks the area treated. */
  manualPick?: boolean;
  lateEffects: LateEffect[];
};

const COG: Source = { label: "COG Long-Term Follow-Up Guidelines v6 (2023)", url: "https://www.survivorshipguidelines.org/" };
const ASCO_CARDIO: Source = { label: "ASCO: Prevention and monitoring of cardiac dysfunction in survivors of adult cancers (2017)", url: "https://doi.org/10.1200/JCO.2016.70.5400" };
const ESC_CO: Source = { label: "ESC 2022 cardio-oncology guideline (with EHA, ESTRO, IC-OS)", url: "https://doi.org/10.1093/eurheartj/ehac244" };
const ESMO_IRAE: Source = { label: "ESMO clinical practice guideline: management of toxicities from immunotherapy (2022)", url: "https://doi.org/10.1016/j.annonc.2022.10.001" };
const ASCO_IRAE: Source = { label: "ASCO guideline: management of immune-related adverse events (2021 update)", url: "https://doi.org/10.1200/JCO.21.01440" };
const ASCO_FERTILITY: Source = { label: "ASCO: fertility preservation in patients with cancer (2018 update)", url: "https://doi.org/10.1200/JCO.2018.78.1914" };
const ASCO_BONE: Source = { label: "ASCO: management of osteoporosis in survivors of adult cancers (2019)", url: "https://doi.org/10.1200/JCO.19.01696" };
const ASCO_ACS_BREAST: Source = { label: "ACS/ASCO breast cancer survivorship care guideline (2016)", url: "https://doi.org/10.1200/JCO.2015.64.3809" };
const ACS_ASCO_HN: Source = { label: "ACS head and neck cancer survivorship care guideline (endorsed by ASCO, 2016)", url: "https://doi.org/10.3322/caac.21343" };
const ASCO_CIPN: Source = { label: "ASCO: prevention and management of chemotherapy-induced peripheral neuropathy (2020 update)", url: "https://doi.org/10.1200/JCO.20.01399" };
const HCT_LTFU: Source = { label: "Recommended screening and preventive practices for long-term survivors after HCT (CIBMTR/ASBMT/EBMT and partners, 2012)", url: "https://doi.org/10.1016/j.bbmt.2011.12.519" };
const FDA_CART: Source = { label: "FDA: boxed warning for T-cell malignancies after BCMA- or CD19-directed CAR-T (2024)", url: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/fda-requires-boxed-warning-t-cell-malignancies-following-treatment-bcma-directed-or-cd19-directed-autologous" };
const NCI_PDQ: Source = { label: "NCI PDQ: late effects of treatment for childhood cancer", url: "https://www.cancer.gov/types/childhood-cancers/late-effects-hp-pdq" };
const NCCN_SURV: Source = { label: "NCCN Guidelines: Survivorship (free registration)", url: "https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1466" };
const PLUVICTO_LABEL: Source = { label: "Pluvicto prescribing information (DailyMed)", url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=pluvicto" };

export const SURVIVORSHIP: SurvivorshipEntry[] = [
  {
    id: "anthracyclines", label: "Anthracyclines (doxorubicin, epirubicin, daunorubicin)",
    plain: "Anthracyclines can weaken the heart muscle years later; the risk rises with the total dose and with chest radiotherapy.",
    matchDrugIds: ["doxorubicin", "pegylated-liposomal-doxorubicin", "cpx-351", "cytarabine-7-3"], matchModalityRe: "anthracycl", matchTechnologyIds: ["cardio-oncology"],
    lateEffects: [
      { effect: "Cardiomyopathy and heart failure", system: "Heart and blood vessels", screening: "Echocardiogram (or cardiac MRI); blood pressure, lipids and glucose at each review", interval: "Echocardiogram 6 to 12 months after treatment ends for higher-risk survivors (ASCO); repeat interval set by cumulative dose and chest radiotherapy (COG)", source: ASCO_CARDIO, note: "Tell any new doctor you had an anthracycline; symptoms of breathlessness, swollen ankles or reduced exercise tolerance need an early echo." },
      { effect: "Higher cardiac risk in pregnancy", system: "Heart and blood vessels", screening: "Echocardiogram before or early in pregnancy", interval: "Per guideline", source: COG },
      { effect: "Second cancers of the blood (rare)", system: "Second cancers", screening: "Awareness of unexplained bruising, infections or tiredness; full blood count if symptomatic", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "trastuzumab", label: "HER2 antibodies (trastuzumab, pertuzumab, T-DM1)",
    plain: "HER2 antibodies can lower the heart's pumping strength; it is usually reversible but needs checking, especially after an anthracycline.",
    matchDrugIds: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine"], matchModalityRe: "anti-HER2", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Reduced left-ventricular function", system: "Heart and blood vessels", screening: "Echocardiogram; cardiovascular risk factors reviewed", interval: "During treatment as the label directs; after treatment, per guideline based on baseline risk", source: ESC_CO },
    ],
  },
  {
    id: "chest-radiotherapy", label: "Radiotherapy to the chest (breast, mediastinum, lung)", manualPick: true,
    plain: "Radiation to the chest raises the long-term risk of heart disease and, in women treated young, of breast cancer.",
    matchDrugIds: [], matchTechnologyIds: [],
    lateEffects: [
      { effect: "Coronary artery disease, valve disease, heart failure", system: "Heart and blood vessels", screening: "Blood pressure, lipids and glucose; echocardiogram; assessment for coronary disease", interval: "Cardiovascular risk review every year; echocardiogram every 5 years from 5 years after radiotherapy in the ESC guideline", source: ESC_CO },
      { effect: "Breast cancer after chest radiotherapy at a young age", system: "Second cancers", screening: "Annual mammogram plus breast MRI", interval: "From age 25 or 8 years after radiotherapy, whichever is later (COG)", source: COG },
      { effect: "Lung fibrosis and reduced lung function", system: "Lungs", screening: "Lung function tests if symptoms; stop smoking support", interval: "Per guideline", source: COG },
      { effect: "Underactive thyroid (if the neck or upper mediastinum was in the field)", system: "Hormones and metabolism", screening: "Thyroid function blood test (TSH, free T4)", interval: "Every year (COG)", source: COG },
      { effect: "Oesophageal stricture and second cancers in the field", system: "Mouth, teeth and gut", screening: "Report swallowing difficulty; targeted investigation", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "neck-radiotherapy", label: "Radiotherapy to the neck", manualPick: true,
    plain: "Radiation to the neck commonly slows the thyroid and, over decades, narrows the carotid arteries.",
    matchDrugIds: [], matchTechnologyIds: [],
    lateEffects: [
      { effect: "Underactive thyroid", system: "Hormones and metabolism", screening: "Thyroid function blood test (TSH, free T4)", interval: "Every year (COG); ACS/ASCO advise TSH every 6 to 12 months", source: ACS_ASCO_HN },
      { effect: "Carotid artery narrowing and stroke risk", system: "Heart and blood vessels", screening: "Blood pressure and lipids; carotid ultrasound is considered in some centres", interval: "Per guideline", source: ACS_ASCO_HN },
      { effect: "Dry mouth, tooth decay, jaw bone damage (osteoradionecrosis)", system: "Mouth, teeth and gut", screening: "Dental review with fluoride prevention; tell the dentist before any extraction", interval: "Dental review at least every 6 months (COG)", source: COG },
      { effect: "Swallowing and speech problems, lymphoedema of the neck", system: "Mouth, teeth and gut", screening: "Speech and language therapy assessment", interval: "Per guideline", source: ACS_ASCO_HN },
      { effect: "Second cancers in the treated area", system: "Second cancers", screening: "Head and neck examination", interval: "Per guideline", source: ACS_ASCO_HN },
    ],
  },
  {
    id: "cranial-radiotherapy", label: "Radiotherapy to the brain (including prophylactic cranial irradiation)", manualPick: true,
    plain: "Radiation to the brain can affect memory and concentration, the pituitary gland's hormones, and blood vessels in the brain.",
    matchDrugIds: [], matchTechnologyIds: ["prophylactic-cranial-irradiation"],
    lateEffects: [
      { effect: "Memory, processing speed and attention difficulties", system: "Brain and thinking", screening: "Neuropsychological assessment; educational or occupational support", interval: "Baseline then as clinically indicated (COG)", source: COG },
      { effect: "Pituitary hormone deficiencies (growth hormone, thyroid, cortisol, sex hormones)", system: "Hormones and metabolism", screening: "Endocrine review with blood tests", interval: "Every year (COG)", source: COG },
      { effect: "Stroke and cerebrovascular disease", system: "Heart and blood vessels", screening: "Blood pressure, lipids and glucose; report sudden neurological symptoms", interval: "Every year (COG)", source: COG },
      { effect: "Cataracts", system: "Hearing, eyes and nerves", screening: "Eye examination", interval: "Every year (COG)", source: COG },
      { effect: "Second tumours in the brain (meningioma, glioma)", system: "Second cancers", screening: "Awareness of new headaches or seizures; MRI if symptomatic", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "pelvic-radiotherapy", label: "Radiotherapy to the pelvis (prostate, rectum, cervix, bladder)", manualPick: true,
    plain: "Pelvic radiation can leave bowel, bladder and sexual function changed, and weakens the hip bones.",
    matchDrugIds: [], matchTechnologyIds: ["brachytherapy"],
    lateEffects: [
      { effect: "Bowel changes and bleeding (radiation proctitis)", system: "Mouth, teeth and gut", screening: "Report bleeding or change in bowel habit; colonoscopy if indicated", interval: "Per guideline", source: COG },
      { effect: "Bladder scarring, frequency, bleeding", system: "Kidneys and bladder", screening: "Urinalysis; report visible blood in urine", interval: "Every year (COG)", source: COG },
      { effect: "Infertility, early menopause, erectile dysfunction, vaginal stenosis", system: "Fertility and sexual health", screening: "Hormone blood tests; sexual health and fertility referral", interval: "Per guideline", source: COG },
      { effect: "Hip fracture and osteoporosis", system: "Bones", screening: "Bone density scan (DXA)", interval: "Per guideline", source: ASCO_BONE },
      { effect: "Second cancers in the field (bladder, rectum, bone)", system: "Second cancers", screening: "Report new symptoms; routine bowel screening", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "checkpoint-inhibitors", label: "Immune checkpoint inhibitors (PD-1, PD-L1, CTLA-4, LAG-3)",
    plain: "Immunotherapy can switch off a hormone gland for good; thyroid, adrenal and pituitary problems may appear months after the last dose and usually need lifelong replacement.",
    matchDrugIds: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "relatlimab-nivolumab"], matchModalityRe: "anti-PD-1|anti-PD-L1|anti-CTLA-4|LAG-3|PD-1", matchTechnologyIds: ["checkpoint-inhibitor"],
    lateEffects: [
      { effect: "Underactive or overactive thyroid", system: "Hormones and metabolism", screening: "Thyroid function blood test (TSH, free T4)", interval: "Every 4 to 6 weeks during treatment (ESMO); after treatment, per guideline and whenever symptomatic", source: ESMO_IRAE },
      { effect: "Adrenal insufficiency and hypophysitis (pituitary inflammation)", system: "Hormones and metabolism", screening: "Morning cortisol, ACTH and pituitary hormones if tired, dizzy, nauseated or with headache", interval: "Per guideline; replacement, once needed, is usually lifelong", source: ASCO_IRAE, note: "Carry a steroid alert card if you take hydrocortisone. Sudden illness needs a higher dose." },
      { effect: "Immune-mediated diabetes", system: "Hormones and metabolism", screening: "Blood glucose; HbA1c", interval: "Per guideline", source: ESMO_IRAE },
      { effect: "Persistent joint pain, dry eyes and mouth, skin changes", system: "Wellbeing", screening: "Rheumatology or dermatology review if symptoms persist", interval: "Per guideline", source: ASCO_IRAE },
      { effect: "Late pneumonitis, colitis, hepatitis, myocarditis (uncommon after stopping)", system: "Lungs", screening: "Report new cough, breathlessness, diarrhoea or chest pain promptly", interval: "As needed", source: ESMO_IRAE },
    ],
  },
  {
    id: "alkylators", label: "Alkylating agents (cyclophosphamide, ifosfamide, melphalan, bendamustine, temozolomide, nitrosoureas)",
    plain: "Alkylating chemotherapy can damage eggs and sperm and, rarely, cause a second blood cancer years later.",
    matchDrugIds: ["cyclophosphamide", "ifosfamide", "melphalan", "bendamustine", "temozolomide", "lomustine", "treosulfan"], matchModalityRe: "alkylat|nitrosourea|nitrogen mustard|conditioning", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Reduced fertility, early menopause, low testosterone", system: "Fertility and sexual health", screening: "Menstrual history; FSH, LH, oestradiol or testosterone; semen analysis on request", interval: "Every year (COG); fertility referral before treatment where possible", source: ASCO_FERTILITY },
      { effect: "Treatment-related myelodysplasia or acute myeloid leukaemia", system: "Second cancers", screening: "Full blood count if unexplained bruising, infections or fatigue", interval: "Per guideline; risk is highest in the first 10 years (COG)", source: COG },
      { effect: "Bladder scarring and bladder cancer (cyclophosphamide, ifosfamide)", system: "Kidneys and bladder", screening: "Urinalysis; report visible blood in urine", interval: "Every year (COG)", source: COG },
      { effect: "Kidney tubular damage (ifosfamide)", system: "Kidneys and bladder", screening: "Blood pressure, creatinine, electrolytes, urinalysis", interval: "Every year (COG)", source: COG },
      { effect: "Lung fibrosis (nitrosoureas, busulfan)", system: "Lungs", screening: "Lung function tests at baseline and if symptomatic", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "platinum", label: "Platinum chemotherapy (cisplatin, carboplatin, oxaliplatin)",
    plain: "Cisplatin can permanently affect hearing, kidneys and nerve endings in the hands and feet; carboplatin and oxaliplatin are gentler on hearing but oxaliplatin causes lasting neuropathy.",
    matchDrugIds: ["cisplatin", "carboplatin", "oxaliplatin", "gemcitabine-cisplatin", "platinum-etoposide"], matchModalityRe: "platin", matchTechnologyIds: ["platinum"],
    lateEffects: [
      { effect: "Hearing loss and tinnitus (cisplatin)", system: "Hearing, eyes and nerves", screening: "Audiogram", interval: "Baseline after treatment; then per guideline, and whenever hearing changes (COG)", source: COG },
      { effect: "Kidney damage and low magnesium (cisplatin)", system: "Kidneys and bladder", screening: "Blood pressure, creatinine, electrolytes including magnesium", interval: "Every year (COG)", source: COG },
      { effect: "Peripheral neuropathy: numbness, tingling, balance", system: "Hearing, eyes and nerves", screening: "Symptom review and examination; falls prevention; duloxetine is the evidence-based option for painful neuropathy", interval: "Every visit while symptomatic", source: ASCO_CIPN },
      { effect: "Cardiovascular disease and metabolic syndrome (after testicular cancer treatment)", system: "Heart and blood vessels", screening: "Blood pressure, lipids, glucose, weight", interval: "Every year", source: NCCN_SURV },
    ],
  },
  {
    id: "taxanes-vinca", label: "Taxanes and vinca alkaloids (paclitaxel, docetaxel, vincristine)",
    plain: "These drugs act on the scaffolding inside nerves as well as cancer cells, so numbness and tingling in the hands and feet can persist.",
    matchDrugIds: ["paclitaxel", "docetaxel", "vincristine", "gemcitabine-nab-paclitaxel"], matchModalityRe: "taxane|vinca", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Persistent peripheral neuropathy", system: "Hearing, eyes and nerves", screening: "Symptom review and examination; balance and falls assessment", interval: "Every visit while symptomatic", source: ASCO_CIPN },
      { effect: "Nail and skin changes, persistent hair thinning (docetaxel)", system: "Wellbeing", screening: "Report and refer as needed", interval: "As needed", source: NCCN_SURV },
    ],
  },
  {
    id: "bleomycin", label: "Bleomycin",
    plain: "Bleomycin can scar the lungs; the risk rises with dose, kidney problems and high-flow oxygen.",
    matchDrugIds: ["bleomycin"], matchTechnologyIds: [],
    lateEffects: [
      { effect: "Lung fibrosis", system: "Lungs", screening: "Lung function tests including diffusing capacity; tell anaesthetists and divers' medical examiners you had bleomycin", interval: "Baseline at the end of treatment, then if symptomatic (COG)", source: COG },
      { effect: "Raynaud's phenomenon", system: "Heart and blood vessels", screening: "Symptom review", interval: "As needed", source: COG },
    ],
  },
  {
    id: "topo-ii-etoposide", label: "Topoisomerase II inhibitors (etoposide)",
    plain: "Etoposide carries a small risk of a second leukaemia, usually within the first few years.",
    matchDrugIds: ["etoposide"], matchModalityRe: "topoisomerase II", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Treatment-related acute myeloid leukaemia", system: "Second cancers", screening: "Full blood count if unexplained bruising, infections or fatigue", interval: "Per guideline", source: COG },
    ],
  },
  {
    id: "methotrexate", label: "High-dose or intrathecal methotrexate",
    plain: "Methotrexate given at high dose or into the spinal fluid can affect thinking, bones and the liver.",
    matchDrugIds: ["methotrexate"], matchTechnologyIds: [],
    lateEffects: [
      { effect: "Memory and processing difficulties (with intrathecal or high-dose use)", system: "Brain and thinking", screening: "Neuropsychological assessment", interval: "Baseline then as clinically indicated (COG)", source: COG },
      { effect: "Low bone density", system: "Bones", screening: "Bone density scan (DXA)", interval: "Baseline at entry to long-term follow-up (COG)", source: COG },
      { effect: "Liver fibrosis", system: "Mouth, teeth and gut", screening: "Liver blood tests", interval: "Baseline at entry to long-term follow-up (COG)", source: COG },
    ],
  },
  {
    id: "car-t", label: "CAR-T cell therapy (CD19, BCMA)",
    plain: "CAR-T cells can suppress normal antibody-making B cells for a long time, leave blood counts low for months, and carry a labelled risk of a second T-cell cancer.",
    matchDrugIds: ["tisagenlecleucel", "axicabtagene-ciloleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "ciltacabtagene-autoleucel", "idecabtagene-vicleucel"], matchModalityRe: "CAR-T", matchTechnologyIds: ["car-t"],
    lateEffects: [
      { effect: "Low antibodies (hypogammaglobulinaemia) and infections", system: "Blood and immune system", screening: "Immunoglobulin (IgG) level; immunoglobulin replacement if low with infections; revaccination programme", interval: "Per guideline while B cells remain depleted", source: NCCN_SURV },
      { effect: "Prolonged low blood counts", system: "Blood and immune system", screening: "Full blood count", interval: "Per guideline until counts recover", source: NCCN_SURV },
      { effect: "Second cancers, including T-cell malignancies", system: "Second cancers", screening: "Lifelong monitoring for secondary malignancies; report new lumps, night sweats, unexplained fever or weight loss", interval: "Lifelong (FDA class labelling)", source: FDA_CART },
      { effect: "Late neurological or movement symptoms (BCMA products)", system: "Brain and thinking", screening: "Report tremor, slowness or personality change", interval: "As needed", source: NCCN_SURV },
    ],
  },
  {
    id: "bispecifics", label: "Bispecific T-cell engagers (BCMA, GPRC5D, CD20, CD3)",
    plain: "Continuous T-cell engagers keep the immune system busy, so infections and low antibodies are the main long-term issues.",
    matchDrugIds: ["teclistamab", "talquetamab", "epcoritamab", "glofitamab", "blinatumomab", "tarlatamab"], matchModalityRe: "T-cell engager", matchTechnologyIds: ["bispecific-antibody"],
    lateEffects: [
      { effect: "Low antibodies and recurrent infections", system: "Blood and immune system", screening: "Immunoglobulin (IgG) level; immunoglobulin replacement if indicated; vaccinations", interval: "Per guideline while on and after treatment", source: NCCN_SURV },
      { effect: "Taste, nail and skin changes (GPRC5D agents)", system: "Wellbeing", screening: "Report and refer as needed", interval: "As needed", source: NCCN_SURV },
    ],
  },
  {
    id: "hsct", label: "Stem-cell transplant (autologous or allogeneic)",
    plain: "Transplant conditioning and graft-versus-host disease touch almost every organ, so follow-up is organ by organ for life.",
    matchDrugIds: [], matchTechnologyIds: ["autologous-stem-cell-transplant", "allogeneic-hsct", "tandem-transplant"],
    lateEffects: [
      { effect: "Infections and loss of vaccine immunity", system: "Blood and immune system", screening: "Revaccination schedule; immunoglobulin level", interval: "Revaccination from 6 to 12 months post-transplant per the schedule; then as advised", source: HCT_LTFU },
      { effect: "Chronic graft-versus-host disease (allogeneic)", system: "Wellbeing", screening: "Skin, mouth, eyes, liver, lungs and joints reviewed", interval: "Every visit", source: HCT_LTFU },
      { effect: "Heart and blood vessel disease", system: "Heart and blood vessels", screening: "Blood pressure, lipids, glucose; cardiac assessment", interval: "Every year (screening); cardiac assessment per risk", source: HCT_LTFU },
      { effect: "Underactive thyroid", system: "Hormones and metabolism", screening: "Thyroid function blood test", interval: "Every year", source: HCT_LTFU },
      { effect: "Low bone density and avascular necrosis", system: "Bones", screening: "Bone density scan (DXA)", interval: "At 1 year post-transplant, then per result", source: HCT_LTFU },
      { effect: "Infertility and gonadal failure", system: "Fertility and sexual health", screening: "Hormone blood tests; fertility and sexual health referral", interval: "At 1 year, then per guideline", source: HCT_LTFU },
      { effect: "Cataracts and dry eyes", system: "Hearing, eyes and nerves", screening: "Eye examination", interval: "Every year (at 1 year and then annually)", source: HCT_LTFU },
      { effect: "Lung fibrosis or bronchiolitis obliterans", system: "Lungs", screening: "Lung function tests", interval: "At 1 year, then as indicated", source: HCT_LTFU },
      { effect: "Second cancers (skin, mouth, thyroid, blood)", system: "Second cancers", screening: "Skin and mouth examination; standard age-appropriate cancer screening; sun protection", interval: "Every year", source: HCT_LTFU },
      { effect: "Dental and mouth problems", system: "Mouth, teeth and gut", screening: "Dental review", interval: "Every 6 to 12 months", source: HCT_LTFU },
    ],
  },
  {
    id: "aromatase-inhibitors", label: "Aromatase inhibitors (letrozole, anastrozole, exemestane)",
    plain: "Removing oestrogen thins bones and stiffens joints; a bone density scan at the start and during treatment guards against fractures.",
    matchDrugIds: ["letrozole", "exemestane"], matchModalityRe: "aromatase", matchTechnologyIds: ["endocrine-therapy"],
    lateEffects: [
      { effect: "Osteoporosis and fractures", system: "Bones", screening: "Bone density scan (DXA); calcium, vitamin D, weight-bearing exercise; bone-protecting drugs when indicated", interval: "DXA at baseline and periodically while on treatment (ASCO); every 2 years in the ACS/ASCO breast guideline", source: ASCO_BONE },
      { effect: "Joint and muscle pain", system: "Wellbeing", screening: "Symptom review; exercise programme", interval: "Every visit", source: ASCO_ACS_BREAST },
      { effect: "Raised cholesterol and cardiovascular risk", system: "Heart and blood vessels", screening: "Lipids, blood pressure", interval: "Per guideline", source: ASCO_ACS_BREAST },
      { effect: "Vaginal dryness and sexual difficulties", system: "Fertility and sexual health", screening: "Ask; non-hormonal moisturisers first", interval: "Every visit", source: ASCO_ACS_BREAST },
    ],
  },
  {
    id: "tamoxifen", label: "Tamoxifen",
    plain: "Tamoxifen slightly raises the risk of cancer of the womb lining and of blood clots; any bleeding after the menopause must be checked.",
    matchDrugIds: ["tamoxifen"], matchModalityRe: "SERM", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Endometrial cancer and uterine sarcoma", system: "Second cancers", screening: "Report any vaginal bleeding promptly; annual gynaecological assessment. Routine ultrasound or biopsy is not recommended in the absence of symptoms", interval: "Every year (ACS/ASCO)", source: ASCO_ACS_BREAST },
      { effect: "Blood clots (deep vein thrombosis, pulmonary embolism)", system: "Heart and blood vessels", screening: "Awareness of leg swelling or breathlessness; consider stopping before surgery or long flights per the team's advice", interval: "As needed", source: ASCO_ACS_BREAST },
      { effect: "Cataracts", system: "Hearing, eyes and nerves", screening: "Eye examination if vision changes", interval: "As needed", source: ASCO_ACS_BREAST },
    ],
  },
  {
    id: "androgen-deprivation", label: "Androgen deprivation and AR-pathway drugs (GnRH agonists and antagonists, abiraterone, enzalutamide)",
    plain: "Switching off testosterone thins bones, changes body composition and raises cardiovascular and metabolic risk.",
    matchDrugIds: ["leuprolide", "goserelin", "degarelix", "relugolix", "abiraterone", "enzalutamide", "apalutamide", "darolutamide", "bicalutamide"], matchModalityRe: "GnRH|AR antagonist|antiandrogen|CYP17A1", matchTechnologyIds: [],
    lateEffects: [
      { effect: "Osteoporosis and fractures", system: "Bones", screening: "Bone density scan (DXA); calcium, vitamin D, exercise; bone-protecting drugs when indicated", interval: "DXA at baseline and periodically (ASCO)", source: ASCO_BONE },
      { effect: "Diabetes, weight gain, cardiovascular disease", system: "Heart and blood vessels", screening: "Blood pressure, lipids, HbA1c, weight", interval: "Every year", source: NCCN_SURV },
      { effect: "Hot flushes, fatigue, low mood, sexual dysfunction", system: "Wellbeing", screening: "Ask; exercise programme; sexual health referral", interval: "Every visit", source: NCCN_SURV },
    ],
  },
  {
    id: "radioligand", label: "Radioligand and alpha therapies (Lu-177, Ra-223, Ac-225 agents)",
    plain: "Radioactive drugs deliver dose to the bone marrow and kidneys as well as the tumour, so blood counts and kidney function are followed.",
    matchDrugIds: ["pluvicto", "lutathera", "radium-223", "radioactive-iodine"], matchModalityRe: "radioligand|alpha therapy|radiopharmaceutical", matchTechnologyIds: ["radioligand-therapy"],
    lateEffects: [
      { effect: "Low blood counts and, rarely, myelodysplasia or leukaemia", system: "Blood and immune system", screening: "Full blood count", interval: "Per the product label during and after treatment", source: PLUVICTO_LABEL },
      { effect: "Kidney damage (Lu-177 PSMA and DOTATATE agents)", system: "Kidneys and bladder", screening: "Creatinine and eGFR", interval: "Per the product label", source: PLUVICTO_LABEL },
      { effect: "Dry mouth (PSMA agents)", system: "Mouth, teeth and gut", screening: "Dental review; saliva substitutes", interval: "As needed", source: PLUVICTO_LABEL },
    ],
  },
  {
    id: "any-systemic", label: "Any cancer treatment: general survivorship checks",
    plain: "Whatever the treatment, a written survivorship care plan, a return to activity and attention to mood and finances have evidence behind them.",
    matchDrugIds: [], matchTechnologyIds: ["survivorship-care-plan", "structured-exercise-survivorship", "exercise-oncology", "psycho-oncology", "fertility-preservation"],
    lateEffects: [
      { effect: "Fatigue, low mood, anxiety, fear of recurrence", system: "Wellbeing", screening: "Distress screening; referral to psycho-oncology; structured exercise", interval: "Every visit", source: NCCN_SURV },
      { effect: "Deconditioning and weight change", system: "Wellbeing", screening: "Exercise prescription; nutrition review", interval: "Every visit", source: NCCN_SURV },
      { effect: "Second primary cancers", system: "Second cancers", screening: "Age-appropriate population screening (bowel, breast, cervical, lung where eligible) plus any treatment-specific screening above", interval: "Per national programme", source: NCI_PDQ },
    ],
  },
];

export const SYSTEM_ORDER: OrganSystem[] = [
  "Heart and blood vessels", "Hormones and metabolism", "Second cancers", "Bones", "Fertility and sexual health",
  "Kidneys and bladder", "Hearing, eyes and nerves", "Lungs", "Blood and immune system", "Brain and thinking", "Mouth, teeth and gut", "Wellbeing",
];

/** Which entries a treatment (by id and, for drugs, modality) falls under. Pure; safe in the browser. */
export function entriesForTreatment(id: string, modality: string | undefined, entries: SurvivorshipEntry[] = SURVIVORSHIP): SurvivorshipEntry[] {
  return entries.filter((e) => e.matchDrugIds.includes(id) || e.matchTechnologyIds.includes(id) || (!!modality && !!e.matchModalityRe && new RegExp(e.matchModalityRe, "i").test(modality)));
}
