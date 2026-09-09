/**
 * Red-flag "when to call" cards, keyed by drug id and/or by a regular expression over `drug.modality`.
 *
 * Each flag names the symptom, the threshold as the source phrases it, the action tier and the source.
 * Sources are boxed warnings and Warnings and Precautions in the US prescribing information (DailyMed
 * or accessdata.fda.gov), the ASCO immune-related adverse events guideline, the ASTCT consensus grading
 * for CRS and ICANS, and NICE CG151 for the fever rule. Nothing here is a number without a source.
 *
 * `general` applies to everyone on systemic anticancer treatment and is always shown first.
 */
export type RedFlagAction = "call-today" | "call-now" | "emergency";

export type RedFlag = {
  symptom: string;
  threshold: string;
  action: RedFlagAction;
  source: { label: string; url: string };
};

export type RedFlagSet = {
  id: string;
  /** Class name shown on the card, e.g. "Immune checkpoint inhibitors". */
  label: string;
  /** Exact product ids this set applies to. */
  drugIds?: string[];
  /** Regular expression source tested (case-insensitive) against `drug.modality`. */
  modalityRe?: string;
  /** When the risk is highest, if the label states a window. */
  window?: string;
  flags: RedFlag[];
};

export const ACTION_LABEL: Record<RedFlagAction, string> = {
  "call-today": "Call the team today",
  "call-now": "Call the 24-hour line now",
  emergency: "Emergency services now",
};

const label = (query: string) => ({ label: `US prescribing information (DailyMed: ${query})`, url: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?labeltype=all&query=${encodeURIComponent(query)}` });
const NICE_CG151 = { label: "NICE CG151: neutropenic sepsis", url: "https://www.nice.org.uk/guidance/cg151" };
const UKONS = { label: "UKONS 24-hour triage tool", url: "https://www.ukons.org/site/assets/files/1134/oncology_haematology_24_hour_triage.pdf" };
const ASCO_IRAE = { label: "ASCO guideline on immune-related adverse events (2021)", url: "https://ascopubs.org/doi/10.1200/JCO.21.01440" };
const ASTCT = { label: "ASTCT consensus grading for CRS and ICANS (2019)", url: "https://doi.org/10.1016/j.bbmt.2018.12.758" };
const AVASTIN = { label: "Avastin (bevacizumab) US prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125085s340lbl.pdf" };

export const GENERAL_RED_FLAGS: RedFlagSet = {
  id: "general",
  label: "Anyone on cancer treatment",
  flags: [
    { symptom: "Fever or feeling unwell", threshold: "Temperature of 38 C or higher, or shivering, or feeling unwell with signs of infection, at any time during treatment that can lower white cells.", action: "call-now", source: NICE_CG151 },
    { symptom: "Signs of sepsis", threshold: "Fever with fast breathing, confusion, cold or mottled skin, very low urine output, or a rash that does not fade under pressure.", action: "emergency", source: UKONS },
    { symptom: "Breathlessness", threshold: "New breathlessness at rest, blue lips, or chest pain.", action: "emergency", source: UKONS },
    { symptom: "Uncontrolled vomiting or diarrhoea", threshold: "Unable to keep fluids down for 24 hours, or seven or more stools a day above your usual.", action: "call-now", source: UKONS },
    { symptom: "Bleeding", threshold: "Bleeding that will not stop after 15 minutes of pressure, blood in vomit, urine or stool, or a sudden severe headache.", action: "emergency", source: UKONS },
    { symptom: "Confusion or drowsiness", threshold: "New confusion, difficulty speaking, a seizure, or unusual drowsiness.", action: "emergency", source: UKONS },
    { symptom: "Rash that blisters", threshold: "Blisters, peeling skin, or sores in the mouth, eyes or genitals, especially with fever.", action: "emergency", source: UKONS },
  ],
};

export const redFlagSets: RedFlagSet[] = [
  {
    id: "checkpoint-inhibitors",
    label: "Immune checkpoint inhibitors",
    modalityRe: "anti-pd-1|anti-pd-l1|anti-ctla-4|anti-lag-3|pd-1×|pd-1 antibody",
    drugIds: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "relatlimab-nivolumab", "tislelizumab", "toripalimab", "avelumab", "retifanlimab"],
    window: "Immune-related reactions can start at any time during treatment and for months after the last dose; carry the alert card.",
    flags: [
      { symptom: "Diarrhoea or colitis", threshold: "Four or more stools a day above your usual, or abdominal pain, or mucus or blood in the stool (grade 2). Seven or more stools a day or severe abdominal pain is grade 3.", action: "call-now", source: ASCO_IRAE },
      { symptom: "Pneumonitis", threshold: "Any new or worsening cough, breathlessness or chest pain. Breathless at rest or needing oxygen is grade 3 to 4.", action: "call-now", source: ASCO_IRAE },
      { symptom: "Hepatitis", threshold: "Yellow skin or eyes, dark urine, pain under the right ribs, or nausea with tiredness; blood tests showing ALT or AST above 3 times normal.", action: "call-today", source: ASCO_IRAE },
      { symptom: "Hypophysitis or adrenal crisis", threshold: "Persistent headache with extreme tiredness, nausea, dizziness on standing or low blood pressure. Vomiting, severe weakness or collapse is adrenal crisis.", action: "emergency", source: ASCO_IRAE },
      { symptom: "Myocarditis", threshold: "Chest pain, palpitations, breathlessness or leg swelling, especially in the first weeks; ASCO treats any suspected myocarditis as an emergency and holds treatment permanently after a confirmed case of grade 2 or higher.", action: "emergency", source: ASCO_IRAE },
      { symptom: "New diabetes", threshold: "Excessive thirst, passing lots of urine, or blurred vision; vomiting, abdominal pain or fast deep breathing suggests ketoacidosis.", action: "emergency", source: ASCO_IRAE },
      { symptom: "Neurological symptoms", threshold: "Weakness, numbness, drooping eyelids, double vision, difficulty swallowing or severe headache (possible myasthenia, Guillain-Barre or encephalitis).", action: "emergency", source: ASCO_IRAE },
      { symptom: "Skin reaction", threshold: "Rash covering more than 30 percent of the body, blisters, or sores in the mouth or eyes.", action: "call-now", source: ASCO_IRAE },
    ],
  },
  {
    id: "deruxtecan-adcs",
    label: "Deruxtecan (DXd) antibody-drug conjugates",
    drugIds: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "patritumab-deruxtecan", "ifinatamab-deruxtecan", "raludotatug-deruxtecan"],
    window: "Interstitial lung disease can occur at any time; the Enhertu label carries a boxed warning and says to advise patients to report symptoms immediately.",
    flags: [
      { symptom: "Interstitial lung disease or pneumonitis", threshold: "Any new or worsening cough, breathlessness or fever. The label says to interrupt treatment for any suspected ILD and to permanently discontinue for grade 2 or higher.", action: "call-now", source: label("Enhertu") },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher (the label: severe neutropenia including febrile neutropenia can occur; monitor counts).", action: "call-now", source: label("Enhertu") },
      { symptom: "Heart failure", threshold: "New breathlessness on exertion, swollen ankles, or waking breathless (left ventricular dysfunction is a labelled warning).", action: "call-today", source: label("Enhertu") },
      { symptom: "Eye symptoms (datopotamab)", threshold: "Dry eye, blurred vision, eye pain or light sensitivity; the Datroway label lists ocular adverse reactions including keratitis and requires eye examinations.", action: "call-today", source: label("Datroway") },
    ],
  },
  {
    id: "adcs",
    label: "Other antibody-drug conjugates",
    modalityRe: "^adc|bispecific adc",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher. Sacituzumab govitecan carries a boxed warning for severe or life-threatening neutropenia.", action: "call-now", source: label("Trodelvy") },
      { symptom: "Severe diarrhoea", threshold: "Diarrhoea not controlled by loperamide, or with fever or dehydration. Sacituzumab govitecan carries a boxed warning for severe diarrhoea.", action: "call-now", source: label("Trodelvy") },
      { symptom: "Skin reaction", threshold: "Blisters, peeling, or sores in the mouth or eyes with a rash. Enfortumab vedotin carries a boxed warning for Stevens-Johnson syndrome and toxic epidermal necrolysis, mostly in the first cycle.", action: "emergency", source: label("Padcev") },
      { symptom: "High blood sugar (enfortumab)", threshold: "Excessive thirst, frequent urination, or home readings above the level the team set; ketoacidosis has occurred in patients with and without diabetes.", action: "call-today", source: label("Padcev") },
      { symptom: "Eye symptoms (belantamab, tisotumab, mirvetuximab)", threshold: "Blurred vision, dry or gritty eyes, eye pain or light sensitivity; these products carry boxed warnings or requirements for eye examinations before each dose.", action: "call-today", source: label("Tivdak") },
      { symptom: "Lung symptoms", threshold: "New cough or breathlessness; pneumonitis is a labelled warning for several ADCs including enfortumab vedotin and mirvetuximab soravtansine.", action: "call-now", source: label("Padcev") },
      { symptom: "Numbness or weakness", threshold: "Tingling, numbness or weakness that affects walking or using the hands; peripheral neuropathy is common with MMAE-containing ADCs and doses are reduced or stopped at grade 2 to 3.", action: "call-today", source: label("Padcev") },
    ],
  },
  {
    id: "car-t",
    label: "CAR-T cell therapy",
    modalityRe: "car-t",
    window: "The labels require patients to remain within proximity of the treating centre for at least four weeks after infusion and not to drive or operate heavy machinery for at least eight weeks. Most CRS and neurotoxicity starts in the first two weeks.",
    flags: [
      { symptom: "Cytokine release syndrome", threshold: "Fever of 38 C or higher is grade 1 CRS; fever with low blood pressure, fast heartbeat, breathlessness or low oxygen is grade 2 or higher. The labels carry a boxed warning and say to report fever immediately.", action: "emergency", source: ASTCT },
      { symptom: "Neurotoxicity (ICANS)", threshold: "Difficulty finding words, confusion, drowsiness, change in handwriting, tremor or a seizure. The labels carry a boxed warning for neurologic toxicities.", action: "emergency", source: label("Yescarta") },
      { symptom: "Infection", threshold: "Fever, cough, burning on passing urine, or any infection sign, for months after infusion while blood counts and antibodies stay low.", action: "call-now", source: label("Yescarta") },
      { symptom: "Prolonged low blood counts", threshold: "Bleeding, bruising, breathlessness or recurrent infections; cytopenias can persist for weeks after infusion.", action: "call-today", source: label("Yescarta") },
      { symptom: "Movement or personality changes (BCMA CAR-T)", threshold: "Slowness, stiffness, tremor, or changes in personality or handwriting weeks to months after infusion; the Carvykti label warns of parkinsonism and Guillain-Barre syndrome.", action: "call-now", source: label("Carvykti") },
      { symptom: "Haemophagocytic lymphohistiocytosis", threshold: "Persistent fever with enlarged liver or spleen, very low counts and bleeding after CRS; a labelled warning for BCMA CAR-T products.", action: "emergency", source: label("Carvykti") },
    ],
  },
  {
    id: "t-cell-engagers",
    label: "Bispecific T-cell engagers",
    modalityRe: "t-cell engager|immtac|bispecific t-cell",
    window: "The step-up doses are given in hospital because CRS and neurotoxicity are most likely in the first cycle; several labels require 48 hours of monitoring after each step-up dose.",
    flags: [
      { symptom: "Cytokine release syndrome", threshold: "Fever of 38 C or higher, chills, low blood pressure, fast heartbeat or breathlessness, especially after a step-up dose. Boxed warning on teclistamab, epcoritamab, glofitamab, tarlatamab and blinatumomab.", action: "emergency", source: label("Tecvayli") },
      { symptom: "Neurotoxicity (ICANS)", threshold: "Confusion, word-finding difficulty, drowsiness, tremor, seizures or weakness. Boxed warning on teclistamab, talquetamab, elranatamab, tarlatamab and blinatumomab.", action: "emergency", source: label("Tecvayli") },
      { symptom: "Infection", threshold: "Fever or any infection sign; serious and fatal infections including opportunistic infections are labelled warnings because antibody levels fall.", action: "call-now", source: label("Tecvayli") },
      { symptom: "Low blood counts", threshold: "Bleeding, bruising or breathlessness; neutropenia and thrombocytopenia are labelled warnings.", action: "call-today", source: label("Tecvayli") },
      { symptom: "Weight loss, taste or skin changes (talquetamab)", threshold: "Marked weight loss, inability to eat because of taste changes or mouth soreness, or severe skin peeling and nail loss; the Talvey label lists oral, skin and nail toxicity and weight loss.", action: "call-today", source: label("Talvey") },
    ],
  },
  {
    id: "cytotoxic",
    label: "Cytotoxic chemotherapy",
    modalityRe: "cytotoxic|alkylating|platinum|taxane|anthracycline|antifolate|nucleoside|topoisomerase|vinca|fluoropyrimidine|hypomethylating|nitrosourea|glycopeptide antibiotic|actinomycin|halichondrin|purine nucleoside|liposomal|antibiotic \\(bioreductive\\)",
    window: "White cells are usually lowest 7 to 14 days after each dose.",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher, or other signs consistent with sepsis, while on chemotherapy: NICE says to refer immediately for assessment as suspected neutropenic sepsis.", action: "call-now", source: NICE_CG151 },
      { symptom: "Uncontrolled vomiting", threshold: "Vomiting despite anti-sickness medicines, or unable to keep fluids down for 24 hours.", action: "call-now", source: UKONS },
      { symptom: "Severe diarrhoea", threshold: "Seven or more stools a day above your usual, or diarrhoea with fever or dizziness. With fluorouracil or capecitabine, severe early diarrhoea and mouth ulcers in the first cycle can indicate DPD deficiency.", action: "call-now", source: label("fluorouracil injection") },
      { symptom: "Mouth ulcers", threshold: "Ulcers or pain that stop you eating or drinking.", action: "call-today", source: UKONS },
      { symptom: "Bleeding or bruising", threshold: "Bleeding that will not stop, black or bloody stools, or unexplained bruising when platelets are expected to be low.", action: "emergency", source: UKONS },
      { symptom: "Chest pain (fluoropyrimidines)", threshold: "Chest pain or tightness during or after fluorouracil or capecitabine; the label warns of cardiotoxicity including angina and myocardial infarction.", action: "emergency", source: label("fluorouracil injection") },
      { symptom: "Heart failure (anthracyclines)", threshold: "New breathlessness, swollen ankles or a racing heart during or years after doxorubicin; the boxed warning covers cardiomyopathy, including late onset.", action: "call-today", source: label("doxorubicin") },
      { symptom: "Blood in urine (cyclophosphamide, ifosfamide)", threshold: "Visible blood in the urine or pain on passing urine; haemorrhagic cystitis is a labelled warning and mesna and hydration are used to prevent it.", action: "call-now", source: label("cyclophosphamide") },
      { symptom: "Hearing or kidney changes (cisplatin)", threshold: "New ringing in the ears or hearing loss, or passing much less urine; boxed warnings cover nephrotoxicity and ototoxicity.", action: "call-today", source: label("cisplatin") },
      { symptom: "Breathlessness (bleomycin)", threshold: "New cough or breathlessness at any time during or after bleomycin; pulmonary fibrosis is a boxed warning.", action: "call-now", source: label("bleomycin") },
      { symptom: "Constipation or abdominal swelling (vincristine)", threshold: "No bowel movement for three days, or abdominal swelling with vomiting (possible ileus).", action: "call-today", source: label("vincristine") },
      { symptom: "Throat tightness in the cold (oxaliplatin)", threshold: "A feeling of difficulty breathing or swallowing on exposure to cold in the days after a dose; the label describes laryngopharyngeal dysaesthesia and advises avoiding cold.", action: "call-today", source: label("oxaliplatin") },
    ],
  },
  {
    id: "vegf-inhibitors",
    label: "VEGF-pathway inhibitors",
    modalityRe: "anti-vegf|vegfr|vegf",
    drugIds: ["bevacizumab", "ramucirumab", "lenvatinib", "cabozantinib", "sunitinib", "regorafenib", "sorafenib", "axitinib", "pazopanib", "tivozanib"],
    flags: [
      { symptom: "Bowel perforation", threshold: "Sudden severe abdominal pain, a hard or very tender abdomen, or abdominal pain with vomiting and fever. Boxed warning for gastrointestinal perforation on bevacizumab.", action: "emergency", source: AVASTIN },
      { symptom: "Serious bleeding", threshold: "Coughing blood (more than a teaspoon), vomiting blood, black stools, or a nosebleed that will not stop. Boxed warning for haemorrhage on bevacizumab.", action: "emergency", source: AVASTIN },
      { symptom: "Hypertensive crisis or brain swelling", threshold: "Severe headache, confusion, visual disturbance, seizure, or a blood pressure reading of 160 or more over 100 or more; the labels warn of hypertensive crisis and posterior reversible encephalopathy syndrome.", action: "emergency", source: AVASTIN },
      { symptom: "Wound that will not heal", threshold: "A surgical wound that opens, leaks or is not healing; the label says to withhold treatment for at least 28 days around surgery. Boxed warning for wound healing complications on bevacizumab.", action: "call-today", source: AVASTIN },
      { symptom: "Stroke or heart attack signs", threshold: "Sudden weakness on one side, slurred speech, facial droop, or chest pain; arterial thromboembolic events are a labelled warning.", action: "emergency", source: AVASTIN },
      { symptom: "Protein in urine or swelling", threshold: "Foamy urine, swollen ankles or rapid weight gain; nephrotic syndrome is a labelled warning and urine protein is monitored.", action: "call-today", source: AVASTIN },
    ],
  },
  {
    id: "kinase-inhibitors",
    label: "Kinase inhibitors (oral targeted drugs)",
    modalityRe: "kinase inhibitor|\\btki\\b|pan-erbb|pan-her|raf/mek|mek1/2|abl1|inhibitor \\(kras|ras\\(on\\)",
    flags: [
      { symptom: "Fainting or palpitations", threshold: "Fainting, near-fainting, or an irregular or racing heartbeat; several kinase inhibitors prolong the QT interval and the labels require ECG and electrolyte monitoring.", action: "emergency", source: label("ribociclib") },
      { symptom: "Liver injury", threshold: "Yellow skin or eyes, dark urine, pain under the right ribs, or unusual tiredness with nausea; hepatotoxicity is a labelled warning for many kinase inhibitors and blood tests are checked before each cycle.", action: "call-today", source: label("lapatinib") },
      { symptom: "Lung inflammation (EGFR inhibitors)", threshold: "New or worsening cough, breathlessness or fever; the osimertinib label says to withhold for suspected ILD and permanently discontinue if confirmed.", action: "call-now", source: label("osimertinib") },
      { symptom: "Severe diarrhoea", threshold: "Diarrhoea not controlled by loperamide within 24 hours, or with dehydration; a labelled warning for HER2 and pan-HER inhibitors such as neratinib and afatinib.", action: "call-now", source: label("neratinib") },
      { symptom: "Rash that blisters or infects", threshold: "Blistering or peeling skin, or an acne-like rash with pus and fever.", action: "call-now", source: label("osimertinib") },
      { symptom: "Vision changes (MEK and FGFR inhibitors)", threshold: "Blurred vision, floaters, or a dark area in vision; serous retinopathy and retinal vein occlusion are labelled warnings.", action: "call-today", source: label("trametinib") },
    ],
  },
  {
    id: "btk-inhibitors",
    label: "BTK inhibitors",
    modalityRe: "btk",
    flags: [
      { symptom: "Major bleeding", threshold: "Blood in stool or urine, vomiting blood, a bleed that will not stop, or a severe headache; fatal bleeding events have occurred and the labels advise considering the risk around surgery and with blood thinners.", action: "emergency", source: label("Imbruvica") },
      { symptom: "Atrial fibrillation or ventricular arrhythmia", threshold: "Palpitations, an irregular heartbeat, dizziness, breathlessness or fainting; the ibrutinib label warns of atrial fibrillation, ventricular arrhythmias and sudden death.", action: "call-now", source: label("Imbruvica") },
      { symptom: "Infection", threshold: "Fever or any infection sign; serious infections including opportunistic fungal infections are labelled warnings.", action: "call-now", source: label("Imbruvica") },
      { symptom: "High blood pressure", threshold: "Readings of 160 or more over 100 or more, or severe headache; hypertension is a labelled warning and may need new or adjusted treatment.", action: "call-today", source: label("Imbruvica") },
      { symptom: "Unusual bruising with tiredness", threshold: "Persistent bruising, tiredness and infections between visits; second primary malignancies and cytopenias are labelled warnings.", action: "call-today", source: label("Imbruvica") },
    ],
  },
  {
    id: "parp-inhibitors",
    label: "PARP inhibitors",
    modalityRe: "parp",
    flags: [
      { symptom: "Signs of MDS or AML", threshold: "Unusual tiredness, breathlessness, easy bruising or bleeding, or frequent infections, especially if blood counts have not recovered within four weeks of stopping; the labels warn of myelodysplastic syndrome and acute myeloid leukaemia.", action: "call-today", source: label("Lynparza") },
      { symptom: "Pneumonitis", threshold: "New or worsening cough, breathlessness or fever; the label says to interrupt treatment and investigate.", action: "call-now", source: label("Lynparza") },
      { symptom: "Severe anaemia", threshold: "Breathlessness on mild exertion, dizziness or palpitations; anaemia is common and transfusion is sometimes needed.", action: "call-today", source: label("Lynparza") },
      { symptom: "Blood clot", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; venous thromboembolism including pulmonary embolism is a labelled warning.", action: "emergency", source: label("Lynparza") },
      { symptom: "High blood pressure or palpitations (niraparib)", threshold: "Severe headache, or a racing or irregular heartbeat; hypertension and hypertensive crisis are labelled warnings for niraparib.", action: "call-today", source: label("Zejula") },
    ],
  },
  {
    id: "radioligands",
    label: "Radioligand and radiopharmaceutical therapy",
    modalityRe: "radioligand|alpha therapy|radiopharmaceutical|theranostic|radioactive",
    window: "Blood counts fall over the weeks after each dose and are checked before the next one.",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; myelosuppression is a labelled warning for lutetium-177 PSMA and lutetium-177 dotatate.", action: "call-now", source: label("Pluvicto") },
      { symptom: "Bleeding or bruising", threshold: "Unexplained bruising, tiny red spots, or bleeding that will not stop; thrombocytopenia can be severe.", action: "call-now", source: label("Pluvicto") },
      { symptom: "Kidney problems", threshold: "Passing much less urine, swollen ankles, or dehydration from vomiting; renal toxicity is a labelled warning and the label advises hydration and frequent urination after treatment.", action: "call-today", source: label("Pluvicto") },
      { symptom: "Severe dry mouth", threshold: "Dryness that stops you eating, or a painful swollen gland; dry mouth and salivary gland toxicity are labelled for PSMA-targeted therapy.", action: "call-today", source: label("Pluvicto") },
      { symptom: "Bone pain flare or fracture (radium-223)", threshold: "Sudden severe bone pain, or back pain with weakness or numbness in the legs (possible spinal cord compression).", action: "emergency", source: label("Xofigo") },
      { symptom: "Hormonal crisis (lutetium dotatate)", threshold: "Flushing, diarrhoea, wheezing or low blood pressure soon after a dose in people with functioning neuroendocrine tumours; neuroendocrine hormonal crisis is a labelled warning.", action: "emergency", source: label("Lutathera") },
    ],
  },
  {
    id: "cdk46-inhibitors",
    label: "CDK4/6 inhibitors",
    modalityRe: "cdk4",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; neutropenia is the most common serious adverse reaction and febrile neutropenia has been fatal.", action: "call-now", source: label("Ibrance") },
      { symptom: "Lung inflammation", threshold: "New or worsening cough or breathlessness; severe and fatal interstitial lung disease and pneumonitis are labelled warnings for all three drugs.", action: "call-now", source: label("Ibrance") },
      { symptom: "Severe diarrhoea (abemaciclib)", threshold: "Diarrhoea not controlled by loperamide, or with dehydration; the label says to start loperamide at the first loose stool and to call if it does not settle within 24 hours.", action: "call-today", source: label("Verzenio") },
      { symptom: "Fainting or palpitations (ribociclib)", threshold: "Fainting, dizziness or an irregular heartbeat; QT prolongation is a labelled warning and ECGs are checked in the first cycles.", action: "emergency", source: label("Kisqali") },
      { symptom: "Blood clot (abemaciclib)", threshold: "A swollen painful calf or sudden breathlessness with chest pain; venous thromboembolism is a labelled warning.", action: "emergency", source: label("Verzenio") },
      { symptom: "Liver injury", threshold: "Yellow skin or eyes, dark urine or pain under the right ribs; hepatobiliary toxicity is a labelled warning and liver tests are checked before each cycle.", action: "call-today", source: label("Verzenio") },
    ],
  },
  {
    id: "endocrine",
    label: "Hormone therapies",
    modalityRe: "serd|serm|aromatase|gnrh|antiandrogen|ar antagonist|cyp17a1|progestin|hormonal therapy|ar n-terminal",
    flags: [
      { symptom: "Blood clot (tamoxifen and others)", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; the tamoxifen boxed warning covers pulmonary embolism and stroke.", action: "emergency", source: label("tamoxifen") },
      { symptom: "Vaginal bleeding (tamoxifen)", threshold: "Any unexpected vaginal bleeding, spotting or discharge after the menopause; uterine cancers are a boxed warning.", action: "call-today", source: label("tamoxifen") },
      { symptom: "Seizure or severe headache (enzalutamide, apalutamide, darolutamide)", threshold: "A seizure, sudden severe headache, confusion or visual loss; seizure and posterior reversible encephalopathy syndrome are labelled warnings.", action: "emergency", source: label("Xtandi") },
      { symptom: "Swelling, weakness or palpitations (abiraterone)", threshold: "Swollen ankles, muscle weakness or an irregular heartbeat; low potassium, fluid retention and hypertension from mineralocorticoid excess are labelled warnings, as is adrenal insufficiency during illness or if prednisone is interrupted.", action: "call-today", source: label("Zytiga") },
      { symptom: "Fall or fracture (androgen deprivation, aromatase inhibitors)", threshold: "A fall with new persistent bone pain, or sudden back pain with numbness or weakness in the legs.", action: "call-today", source: label("Xtandi") },
    ],
  },
  {
    id: "differentiation-agents",
    label: "IDH, menin and differentiation agents",
    modalityRe: "idh1|idh2|idh1/2|menin|arsenical|retinoid",
    window: "Differentiation syndrome usually starts within the first weeks to months of treatment and carries a boxed warning.",
    flags: [
      { symptom: "Differentiation syndrome", threshold: "Fever, cough or breathlessness, rapid weight gain or swelling, bone pain, low blood pressure or reduced urine; the labels say to start steroids and monitor at the first suspicion, and the syndrome has been fatal.", action: "emergency", source: label("Idhifa") },
      { symptom: "Fainting or palpitations (ivosidenib, menin inhibitors)", threshold: "Fainting, dizziness or an irregular heartbeat; QT prolongation is a labelled warning.", action: "emergency", source: label("Tibsovo") },
      { symptom: "Neurological symptoms (ivosidenib)", threshold: "Weakness, numbness or difficulty walking; Guillain-Barre syndrome is a labelled warning.", action: "call-now", source: label("Tibsovo") },
    ],
  },
  {
    id: "venetoclax",
    label: "Venetoclax (BCL-2 inhibitor)",
    drugIds: ["venetoclax"],
    modalityRe: "bcl-2 inhibitor",
    window: "Tumour lysis syndrome risk is highest during the five-week dose ramp-up in CLL and at the start of treatment in AML.",
    flags: [
      { symptom: "Tumour lysis syndrome", threshold: "Nausea, vomiting, muscle cramps, palpitations, seizures, confusion or passing much less urine in the first days of a new dose; the label requires hydration, anti-hyperuricaemic drugs and blood tests around each ramp-up step.", action: "emergency", source: label("Venclexta") },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; grade 3 to 4 neutropenia is common.", action: "call-now", source: label("Venclexta") },
    ],
  },
  {
    id: "immunomodulators",
    label: "Immunomodulatory drugs and proteasome inhibitors",
    modalityRe: "cereblon|imid|immunomodulatory|proteasome",
    flags: [
      { symptom: "Blood clot (lenalidomide, pomalidomide, thalidomide)", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; venous and arterial thromboembolism is a boxed warning and blood-thinning prophylaxis is recommended.", action: "emergency", source: label("Revlimid") },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; haematologic toxicity is a boxed warning for lenalidomide.", action: "call-now", source: label("Revlimid") },
      { symptom: "Numbness or pain in hands and feet (bortezomib)", threshold: "Tingling, burning or numbness that affects walking or using the hands; peripheral neuropathy is a labelled warning and doses are adjusted at grade 2.", action: "call-today", source: label("Velcade") },
      { symptom: "Breathlessness or swelling (carfilzomib)", threshold: "New breathlessness, swollen ankles, chest pain or palpitations; cardiac toxicities including heart failure are labelled warnings.", action: "call-now", source: label("Kyprolis") },
      { symptom: "Rash that blisters", threshold: "Blistering or peeling skin; severe cutaneous reactions including Stevens-Johnson syndrome are labelled warnings for lenalidomide and pomalidomide.", action: "emergency", source: label("Revlimid") },
    ],
  },
];

/** Every red-flag set that applies to a product: matched by id, then by modality. `general` is not included. */
export function redFlagsFor(drugId: string, modality?: string): RedFlagSet[] {
  const m = (modality ?? "").toLowerCase();
  return redFlagSets.filter((s) => s.drugIds?.includes(drugId) || (s.modalityRe && m && new RegExp(s.modalityRe, "i").test(m)));
}
