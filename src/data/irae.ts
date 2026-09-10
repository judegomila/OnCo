/**
 * Immune-related adverse event (irAE) management by organ system and CTCAE grade: hold or continue the checkpoint
 * inhibitor, steroid dose, escalation if refractory, and whether to rechallenge. Distilled from the three guidelines
 * cited below; where they differ the entry says so. Side data; `drugs` and `terms` ids are validated by /irae/.
 *
 *  ASCO: Schneider BJ et al. Management of Immune-Related Adverse Events in Patients Treated With Immune Checkpoint
 *        Inhibitor Therapy: ASCO Guideline Update. J Clin Oncol 2021;39:4073-4126. doi:10.1200/JCO.21.01440
 *  NCCN: Management of Immunotherapy-Related Toxicities (Clinical Practice Guidelines in Oncology).
 *  ESMO: Haanen J et al. Management of toxicities from immunotherapy: ESMO Clinical Practice Guideline for diagnosis,
 *        treatment and follow-up. Ann Oncol 2022;33:1217-1238. doi:10.1016/j.annonc.2022.10.001
 */
export type Grade = 1 | 2 | 3 | 4;
export type Hold = "continue" | "hold" | "hold-consider-permanent" | "discontinue";

export type GradeGuidance = {
  grade: Grade;
  /** CTCAE definition in a phrase. */
  defines: string;
  hold: Hold;
  /** Steroid dose, or "none". */
  steroid: string;
  /** What to do if no improvement in 48-72 hours, or additional measures. */
  escalation?: string;
  /** Can the checkpoint inhibitor be resumed once the event has settled? */
  rechallenge: string;
  note?: string;
};

export type IraeEntry = {
  id: string;
  organ: string;
  event: string;
  /** Approximate incidence with anti-PD-1 monotherapy and with anti-PD-1 plus anti-CTLA-4, in words. */
  incidence: string;
  /** Baseline and monitoring investigations. */
  workup: string;
  grades: GradeGuidance[];
  /** Glossary term ids. */
  terms?: string[];
  /** Products this guidance applies to (all checkpoint inhibitors; listed for cross-linking). */
  drugs?: string[];
  /** Where ASCO, NCCN and ESMO differ. */
  differences?: string;
  sources: Array<{ label: string; url: string }>;
};

export const IRAE_SOURCES = {
  asco: { label: "ASCO 2021 guideline update (Schneider et al., JCO)", url: "https://doi.org/10.1200/JCO.21.01440" },
  nccn: { label: "NCCN Management of Immunotherapy-Related Toxicities", url: "https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1486" },
  esmo: { label: "ESMO 2022 Clinical Practice Guideline (Haanen et al., Ann Oncol)", url: "https://doi.org/10.1016/j.annonc.2022.10.001" },
};
const ALL = [IRAE_SOURCES.asco, IRAE_SOURCES.nccn, IRAE_SOURCES.esmo];
export const ICI_DRUGS = ["pembrolizumab", "nivolumab", "atezolizumab", "durvalumab", "cemiplimab", "avelumab", "dostarlimab", "ipilimumab", "tremelimumab", "relatlimab-nivolumab", "tislelizumab", "toripalimab"];

const RECHALLENGE_G2 = "Resume once grade 1 or better and prednisone at 10 mg/day or less.";
const RECHALLENGE_G4 = "Permanently discontinue.";

export const irae: IraeEntry[] = [
  { id: "colitis", organ: "Gastrointestinal", event: "Colitis and diarrhoea", incidence: "Diarrhoea in about 10-15% on anti-PD-1 alone and 30-40% with ipilimumab combinations; grade 3-4 colitis about 1-2% versus 10%.", workup: "Stool culture, C. difficile, faecal calprotectin; CT if severe; early flexible sigmoidoscopy or colonoscopy for grade 2 or above (ulceration predicts steroid refractoriness). Rule out CMV before infliximab.", terms: ["irae", "toxicity-grade"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Fewer than 4 stools a day over baseline", hold: "continue", steroid: "None", escalation: "Loperamide, hydration, dietary advice; monitor for progression.", rechallenge: "Not applicable: treatment continues." },
      { grade: 2, defines: "4-6 stools a day over baseline, or abdominal pain, mucus or blood", hold: "hold", steroid: "Prednisone 1 mg/kg/day (or equivalent) if symptoms persist 2-3 days; taper over 4-6 weeks", escalation: "If no response in 2-3 days, treat as grade 3 (infliximab or vedolizumab).", rechallenge: RECHALLENGE_G2, note: "ASCO: consider permanently discontinuing CTLA-4 antibodies; PD-1 may be resumed." },
      { grade: 3, defines: "7 or more stools a day, incontinence, hospitalisation indicated", hold: "hold-consider-permanent", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "Infliximab 5 mg/kg (or vedolizumab) if no improvement within 48-72 hours; repeat dose at 2 weeks if needed. Steroid taper over 4-6 weeks.", rechallenge: "ASCO and ESMO: consider resuming anti-PD-1 after recovery; permanently discontinue CTLA-4 antibodies. NCCN: consider resuming anti-PD-(L)1 after resolution.", note: "Early infliximab or vedolizumab (within 10 days) shortens steroid exposure without loss of tumour control in retrospective series." },
      { grade: 4, defines: "Life-threatening: perforation, ischaemia, toxic megacolon", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "Infliximab or vedolizumab within 48-72 hours if not improving; surgical review for perforation.", rechallenge: RECHALLENGE_G4 },
    ], differences: "ESMO and NCCN allow biologics (infliximab, vedolizumab) earlier, at grade 2 not responding within 3 days; ASCO places them after 48-72 hours of high-dose steroids at grade 3.", sources: ALL },
  { id: "hepatitis", organ: "Hepatic", event: "Hepatitis (transaminitis)", incidence: "Grade 3-4 in about 1-2% on anti-PD-1 alone and up to 15-20% with ipilimumab combinations.", workup: "ALT, AST, bilirubin before every cycle; exclude viral hepatitis, alcohol, other drugs and liver metastasis progression; liver ultrasound; biopsy if uncertain or steroid-refractory.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "ALT/AST up to 3 x ULN", hold: "continue", steroid: "None", escalation: "Repeat liver tests in 1-2 weeks.", rechallenge: "Not applicable." },
      { grade: 2, defines: "ALT/AST 3-5 x ULN", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day if no improvement after 1 week (or immediately if bilirubin rises); taper over at least 4 weeks", escalation: "Twice-weekly liver tests; escalate to grade 3 management if worsening.", rechallenge: RECHALLENGE_G2 },
      { grade: 3, defines: "ALT/AST 5-20 x ULN", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day; taper over 4-6 weeks once improving", escalation: "Mycophenolate mofetil 500-1,000 mg twice daily if no improvement in 3 days. Do not use infliximab (hepatotoxic). Azathioprine or tacrolimus as further options; hepatology review.", rechallenge: "ASCO: permanently discontinue. NCCN and ESMO: may consider resuming anti-PD-(L)1 after recovery to grade 1 in selected patients without bilirubin rise.", note: "Bilirubin above 3 x ULN with any transaminase rise is treated as grade 4." },
      { grade: 4, defines: "ALT/AST over 20 x ULN, or transaminases over 3 x ULN with bilirubin over 2 x ULN", hold: "discontinue", steroid: "IV methylprednisolone 2 mg/kg/day", escalation: "Mycophenolate mofetil; hepatology and transplant-centre involvement for liver failure.", rechallenge: RECHALLENGE_G4 },
    ], differences: "ASCO discontinues permanently at grade 3; NCCN and ESMO leave the door open for rechallenge after grade 3 recovery. All three agree infliximab is avoided.", sources: ALL },
  { id: "pneumonitis", organ: "Pulmonary", event: "Pneumonitis", incidence: "About 3-5% on anti-PD-1 alone (higher in lung cancer and after thoracic radiotherapy), 5-10% with combinations; fatal in a small minority.", workup: "High-resolution CT chest; oxygen saturation at rest and exertion; exclude infection (including PJP and COVID-19) and progression; bronchoscopy with lavage for grade 2 or above where safe. Radiation recall is a differential.", terms: ["irae", "ild"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Asymptomatic, radiographic changes only", hold: "hold", steroid: "None", escalation: "Repeat CT in 3-4 weeks; if resolved, resume.", rechallenge: "Resume when radiographic resolution or stability is confirmed.", note: "ESMO allows continuing with close monitoring; ASCO and NCCN hold." },
      { grade: 2, defines: "Symptomatic, limiting instrumental daily activities", hold: "hold", steroid: "Prednisone 1-2 mg/kg/day; taper over 4-6 weeks once improving", escalation: "Empirical antibiotics until infection excluded; if no improvement in 48-72 hours treat as grade 3.", rechallenge: RECHALLENGE_G2, note: "Repeat CT before resuming." },
      { grade: 3, defines: "Severe symptoms, oxygen indicated, limiting self-care", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day; taper over at least 6 weeks", escalation: "If no improvement in 48 hours: infliximab, mycophenolate mofetil, IVIG or cyclophosphamide; pulmonology and ICU review.", rechallenge: RECHALLENGE_G4 },
      { grade: 4, defines: "Life-threatening respiratory compromise", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "As grade 3, with intensive care.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
  { id: "dermatitis", organ: "Skin", event: "Rash, pruritus and bullous dermatitis", incidence: "Rash or pruritus in 30-40%; grade 3-4 in about 1-3%. Vitiligo in melanoma is associated with response.", workup: "Examine the whole skin and mucosae; exclude drug rash from other agents, infection and, for blistering, SJS/TEN (dermatology, biopsy). Check for fever and mucosal involvement.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Under 10% body surface area, with or without symptoms", hold: "continue", steroid: "Topical moderate-potency corticosteroid; oral antihistamines for pruritus", rechallenge: "Not applicable." },
      { grade: 2, defines: "10-30% body surface area or limiting instrumental daily activities", hold: "continue", steroid: "Topical high-potency corticosteroid; consider prednisone 0.5-1 mg/kg/day if persistent", escalation: "Dermatology referral if not improving.", rechallenge: "Continue or hold briefly; resume once grade 1.", note: "ASCO and NCCN: consider holding if not controlled within 1-2 weeks." },
      { grade: 3, defines: "Over 30% body surface area, limiting self-care", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day (IV methylprednisolone if severe); taper over 4 weeks", escalation: "Dermatology and biopsy; if no improvement in 1-2 weeks, consider other immunosuppression.", rechallenge: RECHALLENGE_G2 },
      { grade: 4, defines: "Life-threatening: SJS/TEN, DRESS, bullous disease over 30%", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "Burns unit or ICU; dermatology; IVIG or cyclosporine for SJS/TEN.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
  { id: "hypothyroidism", organ: "Endocrine", event: "Hypothyroidism (including after thyroiditis)", incidence: "About 5-10% on anti-PD-1, 15-20% with combinations; usually permanent.", workup: "TSH and free T4 at baseline and every 4-6 weeks during treatment; a transient thyrotoxic phase often precedes hypothyroidism. Exclude central hypothyroidism (low TSH with low T4 suggests hypophysitis: check cortisol).", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Asymptomatic, TSH raised under 10 mIU/L", hold: "continue", steroid: "None", escalation: "Repeat TSH every 4-6 weeks.", rechallenge: "Not applicable." },
      { grade: 2, defines: "Symptomatic, or TSH 10 mIU/L or above", hold: "continue", steroid: "None: levothyroxine 1.6 µg/kg/day (lower start, 25-50 µg, if elderly or cardiac disease)", escalation: "Titrate to TSH every 6-8 weeks; endocrinology if complex.", rechallenge: "Not applicable: treatment continues.", note: "Steroids are not indicated for hypothyroidism." },
      { grade: 3, defines: "Severe symptoms, hospitalisation", hold: "hold", steroid: "None: levothyroxine; IV if myxoedema", escalation: "Endocrinology; resume ICI once stabilised on replacement.", rechallenge: "Resume once symptoms controlled on replacement." },
      { grade: 4, defines: "Myxoedema coma", hold: "hold", steroid: "Hydrocortisone until adrenal insufficiency excluded, then levothyroxine", escalation: "ICU; endocrinology.", rechallenge: "May resume after recovery on replacement; the endocrinopathy itself does not require permanent discontinuation." },
    ], differences: "All three guidelines agree endocrinopathies controlled by hormone replacement do not require stopping immunotherapy.", sources: ALL },
  { id: "hypophysitis", organ: "Endocrine", event: "Hypophysitis and adrenal insufficiency", incidence: "Hypophysitis in up to 10% with ipilimumab, under 1% with anti-PD-1 alone; primary adrenal insufficiency under 1%.", workup: "Morning cortisol and ACTH, TSH and free T4, LH/FSH and testosterone or oestradiol, sodium, glucose; pituitary MRI with contrast for headache or visual symptoms. Never wait for results before hydrocortisone in a shocked patient.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Asymptomatic or mild, biochemical only", hold: "hold", steroid: "Physiological replacement: hydrocortisone 15-20 mg/day in divided doses (before levothyroxine)", rechallenge: "Resume once replaced and stable." },
      { grade: 2, defines: "Moderate symptoms (fatigue, headache)", hold: "hold", steroid: "Hydrocortisone replacement; high-dose steroids (prednisone 1 mg/kg) only for severe headache or visual disturbance from pituitary swelling, tapering to replacement", escalation: "Endocrinology; sick-day rules and steroid card.", rechallenge: "Resume once stable on replacement; hormone deficits are usually permanent." },
      { grade: 3, defines: "Severe symptoms, hospitalisation", hold: "hold", steroid: "IV hydrocortisone 100 mg then 50 mg every 6 hours for adrenal crisis; taper to replacement", escalation: "IV fluids; treat precipitants; endocrinology.", rechallenge: "May resume after recovery on replacement." },
      { grade: 4, defines: "Adrenal crisis: hypotension, shock", hold: "hold", steroid: "IV hydrocortisone 100 mg immediately, then 50 mg every 6 hours", escalation: "ICU; do not delay steroids for investigations.", rechallenge: "May resume after recovery on replacement (all three guidelines); the pituitary damage is usually permanent." },
    ], sources: ALL },
  { id: "diabetes", organ: "Endocrine", event: "Immune-related diabetes (type 1-like)", incidence: "Under 1%; often presents as diabetic ketoacidosis within weeks to months.", workup: "Glucose before each cycle; if raised check ketones, pH, HbA1c, C-peptide and islet antibodies (often negative). Distinguish from steroid-induced hyperglycaemia.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Fasting glucose above ULN, no ketosis", hold: "continue", steroid: "None: lifestyle and oral agents if type 2 pattern", rechallenge: "Not applicable." },
      { grade: 2, defines: "Fasting glucose 8.9-13.9 mmol/L (160-250 mg/dL), no ketosis", hold: "continue", steroid: "None: start insulin if new type 1 pattern (low C-peptide); endocrinology", rechallenge: "Not applicable.", note: "Steroids worsen hyperglycaemia and have no role." },
      { grade: 3, defines: "Fasting glucose 13.9-27.8 mmol/L, or ketosis", hold: "hold", steroid: "None: insulin; treat DKA per protocol", escalation: "Admit; endocrinology; resume ICI once glucose controlled.", rechallenge: "Resume once controlled on insulin." },
      { grade: 4, defines: "DKA or life-threatening hyperglycaemia", hold: "hold", steroid: "None: IV insulin and fluids", escalation: "ICU or high-dependency care.", rechallenge: "May resume after recovery; insulin dependence is usually permanent." },
    ], sources: ALL },
  { id: "nephritis", organ: "Renal", event: "Nephritis (acute interstitial nephritis)", incidence: "About 1-2% on monotherapy, up to 5% with combinations or with concurrent PPIs and NSAIDs.", workup: "Creatinine before each cycle; urinalysis and protein-creatinine ratio; stop nephrotoxins (NSAIDs, PPIs, contrast); renal ultrasound; nephrology and biopsy for grade 2 or above where the diagnosis is unclear.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Creatinine 1.5-2 x baseline or up to 1.5 x ULN", hold: "continue", steroid: "None", escalation: "Repeat creatinine weekly; review nephrotoxins.", rechallenge: "Not applicable.", note: "ASCO: consider holding." },
      { grade: 2, defines: "Creatinine 2-3 x baseline", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day if no other cause after 1 week (ESMO: start promptly); taper over 4-6 weeks", escalation: "Nephrology; biopsy if not improving.", rechallenge: RECHALLENGE_G2 },
      { grade: 3, defines: "Creatinine over 3 x baseline or over 4 mg/dL (354 µmol/L)", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "If no improvement in 1 week: mycophenolate mofetil, azathioprine or infliximab; nephrology.", rechallenge: "ASCO: permanently discontinue. NCCN and ESMO: consider rechallenge after full recovery in selected patients." },
      { grade: 4, defines: "Life-threatening; dialysis indicated", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day", escalation: "Renal replacement; nephrology.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
  { id: "myocarditis", organ: "Cardiac", event: "Myocarditis (and pericarditis, arrhythmia)", incidence: "About 1% (higher with combinations), typically within the first 6 weeks; fatal in 25-50% of reported cases, often with concurrent myositis and myasthenia (the overlap syndrome).", workup: "Troponin, BNP, ECG at baseline and with any symptom; echocardiogram; cardiac MRI; endomyocardial biopsy if uncertain. Check CK for myositis and screen for myasthenia. Continuous cardiac monitoring for any confirmed case.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Abnormal troponin or ECG without symptoms", hold: "hold", steroid: "Discuss with cardiology; if confirmed myocarditis, treat as grade 2 or above", escalation: "Serial troponin and ECG; exclude acute coronary syndrome.", rechallenge: "Only if myocarditis is excluded." },
      { grade: 2, defines: "Symptoms with mild activity", hold: "discontinue", steroid: "IV methylprednisolone 1,000 mg/day for 3-5 days, then oral prednisone 1 mg/kg tapering over 4-6 weeks", escalation: "If no improvement in 24-48 hours: abatacept, anti-thymocyte globulin, mycophenolate, tocilizumab or alemtuzumab per local protocol; plasmapheresis. Cardiology and ICU.", rechallenge: "Permanently discontinue (all three guidelines)." },
      { grade: 3, defines: "Severe symptoms at rest, heart failure", hold: "discontinue", steroid: "IV methylprednisolone 1,000 mg/day for 3-5 days", escalation: "As grade 2, escalate early; treat arrhythmia and heart failure; pacing for conduction block.", rechallenge: RECHALLENGE_G4 },
      { grade: 4, defines: "Life-threatening: cardiogenic shock, ventricular arrhythmia, complete heart block", hold: "discontinue", steroid: "IV methylprednisolone 1,000 mg/day for 3-5 days", escalation: "Mechanical support; ATG or abatacept; ICU.", rechallenge: RECHALLENGE_G4 },
    ], differences: "All three agree on permanent discontinuation for any confirmed myocarditis and on pulse-dose methylprednisolone; second-line agents differ (ASCO lists ATG, infliximab with caution in heart failure, MMF, abatacept; ESMO favours abatacept or ATG).", sources: ALL },
  { id: "arthritis", organ: "Rheumatological", event: "Inflammatory arthritis and polymyalgia-like syndrome", incidence: "Arthralgia in 5-15%; inflammatory arthritis in 1-5%; often persists after immunotherapy stops.", workup: "Examination for synovitis; ESR, CRP, rheumatoid factor and anti-CCP (usually negative), ANA; joint ultrasound or MRI; rheumatology referral for grade 2 or above.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Mild pain with inflammation or stiffness", hold: "continue", steroid: "NSAIDs or paracetamol; intra-articular steroid for single joints", rechallenge: "Not applicable." },
      { grade: 2, defines: "Moderate pain limiting instrumental daily activities", hold: "continue", steroid: "Prednisone 10-20 mg/day for 4-6 weeks; if no improvement, treat as grade 3", escalation: "Rheumatology; hold ICI if not controlled within 4 weeks.", rechallenge: "Continue or resume once controlled on 10 mg/day or less." },
      { grade: 3, defines: "Severe pain, irreversible joint damage, limiting self-care", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day", escalation: "If no improvement in 2 weeks: methotrexate, sulfasalazine, leflunomide, or a TNF or IL-6 inhibitor (tocilizumab) with rheumatology.", rechallenge: "Consider resuming once grade 1 on a steroid-sparing agent." },
      { grade: 4, defines: "Not defined by CTCAE for arthritis", hold: "hold", steroid: "As grade 3", escalation: "As grade 3.", rechallenge: "As grade 3." },
    ], sources: ALL },
  { id: "myositis", organ: "Neuromuscular", event: "Myositis (and the myocarditis-myasthenia overlap)", incidence: "Under 1%; about a third have concurrent myocarditis or myasthenia gravis.", workup: "CK, aldolase, troponin, ECG; myositis antibodies; MRI of affected muscles; EMG and biopsy if unclear. Screen for dysphagia, diplopia and ptosis (myasthenia) and check respiratory function (FVC).", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Mild weakness or pain, CK raised", hold: "hold", steroid: "Consider prednisone 0.5-1 mg/kg if CK over 3 x ULN or symptomatic", escalation: "Repeat CK and troponin; exclude myocarditis.", rechallenge: "Resume once CK normalising and symptoms resolved." },
      { grade: 2, defines: "Moderate weakness limiting instrumental activities", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day", escalation: "Neurology; IVIG or plasmapheresis if worsening or with dysphagia or respiratory involvement.", rechallenge: RECHALLENGE_G2 },
      { grade: 3, defines: "Severe weakness limiting self-care", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day (1,000 mg/day if myocarditis or bulbar or respiratory involvement)", escalation: "IVIG or plasmapheresis; consider methotrexate, azathioprine or mycophenolate for steroid sparing.", rechallenge: "Permanently discontinue if any myocarditis, bulbar or respiratory involvement; otherwise consider after full recovery." },
      { grade: 4, defines: "Life-threatening: respiratory muscle or bulbar involvement", hold: "discontinue", steroid: "IV methylprednisolone 1,000 mg/day for 3-5 days", escalation: "IVIG or plasmapheresis; ICU.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
  { id: "neurologic", organ: "Neurological", event: "Myasthenia gravis, Guillain-Barré syndrome and encephalitis", incidence: "Serious neurological events in about 1%; myasthenia gravis and GBS each well under 1%.", workup: "Neurology urgently. Myasthenia: acetylcholine receptor antibodies (often negative), FVC, CK and troponin for overlap. GBS: lumbar puncture (protein raised, cells low), nerve conduction, MRI spine. Encephalitis: MRI brain, lumbar puncture with viral PCR and autoimmune antibodies, EEG.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Mild symptoms", hold: "hold", steroid: "Myasthenia: pyridostigmine; consider prednisone 0.5 mg/kg", escalation: "Neurology; monitor FVC and swallowing closely.", rechallenge: "Case by case with neurology after full recovery." },
      { grade: 2, defines: "Moderate symptoms limiting instrumental activities", hold: "hold", steroid: "Prednisone 1 mg/kg/day (myasthenia: start low and increase, as steroids can worsen weakness initially); GBS: IVIG or plasmapheresis rather than steroids alone", escalation: "IVIG 0.4 g/kg/day for 5 days or plasmapheresis for myasthenia or GBS not improving; admit.", rechallenge: "Permanently discontinue for grade 2 or above myasthenia or GBS in most guidance; consider only for mild, fully recovered events with neurology." },
      { grade: 3, defines: "Severe symptoms limiting self-care", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day (1,000 mg/day for encephalitis or myasthenia with respiratory compromise)", escalation: "IVIG or plasmapheresis; rituximab for refractory encephalitis or myasthenia; ICU for respiratory decline.", rechallenge: RECHALLENGE_G4 },
      { grade: 4, defines: "Life-threatening", hold: "discontinue", steroid: "IV methylprednisolone 1,000 mg/day for 3-5 days", escalation: "As grade 3 with intensive care.", rechallenge: RECHALLENGE_G4 },
    ], differences: "ASCO and ESMO treat GBS with IVIG or plasmapheresis and add steroids (unlike idiopathic GBS, where steroids are not used); NCCN concurs. Myasthenia at grade 2 or above is a permanent-discontinuation event in ASCO and ESMO.", sources: ALL },
  { id: "haematologic", organ: "Haematological", event: "Immune thrombocytopenia, haemolytic anaemia and aplastic anaemia", incidence: "Under 1% each; haemophagocytic lymphohistiocytosis is rare and dangerous.", workup: "Full blood count and film; reticulocytes, haptoglobin, LDH, bilirubin, direct antiglobulin test; B12, folate, iron; exclude marrow infiltration, drug causes and TTP; marrow biopsy for aplasia or unexplained cytopenias; ferritin and triglycerides if HLH suspected.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Haemoglobin 100 g/L or above, platelets 75 x 10⁹/L or above", hold: "continue", steroid: "None", escalation: "Monitor counts closely.", rechallenge: "Not applicable." },
      { grade: 2, defines: "Haemoglobin 80-100 g/L or platelets 50-75 x 10⁹/L", hold: "hold", steroid: "Prednisone 0.5-1 mg/kg/day for haemolysis or ITP", escalation: "Haematology; IVIG for ITP not responding.", rechallenge: RECHALLENGE_G2 },
      { grade: 3, defines: "Haemoglobin under 80 g/L, platelets 25-50 x 10⁹/L, transfusion indicated", hold: "hold-consider-permanent", steroid: "Prednisone or IV methylprednisolone 1-2 mg/kg/day", escalation: "IVIG, rituximab, or (for haemolysis) other immunosuppression with haematology; aplastic anaemia: ATG, cyclosporine, eltrombopag.", rechallenge: "Consider only after full recovery with haematology; permanently discontinue for aplastic anaemia or HLH." },
      { grade: 4, defines: "Life-threatening cytopenia or HLH", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day (HLH: dexamethasone per HLH-94 with etoposide as needed)", escalation: "Haematology and ICU.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
  { id: "ocular", organ: "Ocular", event: "Uveitis and episcleritis", incidence: "About 1%.", workup: "Same-week ophthalmology review for any visual symptom; slit-lamp examination; exclude infection.", terms: ["irae"], drugs: ICI_DRUGS,
    grades: [
      { grade: 1, defines: "Asymptomatic, findings on examination", hold: "continue", steroid: "Artificial tears; ophthalmology", rechallenge: "Not applicable." },
      { grade: 2, defines: "Anterior uveitis, symptomatic", hold: "hold", steroid: "Topical corticosteroid and cycloplegic drops; consider systemic prednisone if not controlled", escalation: "Ophthalmology follow-up within days.", rechallenge: RECHALLENGE_G2 },
      { grade: 3, defines: "Posterior or pan-uveitis", hold: "hold", steroid: "Prednisone 1 mg/kg/day plus intravitreal or periocular steroid per ophthalmology", escalation: "Ophthalmology; steroid-sparing agents for persistent disease.", rechallenge: "Consider resuming after recovery with ophthalmology." },
      { grade: 4, defines: "Vision 20/200 or worse in the affected eye", hold: "discontinue", steroid: "IV methylprednisolone 1-2 mg/kg/day plus local therapy", escalation: "Urgent ophthalmology.", rechallenge: RECHALLENGE_G4 },
    ], sources: ALL },
];

export const HOLD_LABEL: Record<Hold, string> = { continue: "Continue", hold: "Hold", "hold-consider-permanent": "Hold; consider permanent stop", discontinue: "Permanently discontinue" };
export const HOLD_CLASS: Record<Hold, string> = {
  continue: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
  hold: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
  "hold-consider-permanent": "bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100",
  discontinue: "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100",
};
