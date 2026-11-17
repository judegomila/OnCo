import { protocol } from "./helpers";

/*
 * Hypercalcaemia of malignancy in adults: recognition, assessment, rehydration and antiresorptive treatment.
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim on 16 November 2026 in a second accuracy
 * pass, fetched raw with curl and read as text):
 * - Endocrine Society 2023 clinical practice guideline on treatment of hypercalcaemia of malignancy (JCEM 108(3):
 *   507-528, online 21 December 2022): abstract only, from the Europe PMC REST API (PMID 36545746). The full text at
 *   academic.oup.com returned 403 with a bot check again on 16 November 2026, Europe PMC holds no open copy, and the
 *   society's own page for the guideline was not found. So nothing here rests on its full text: the abstract gives
 *   no doses, no fluid advice, and no certainty rating recommendation by recommendation.
 * - Society for Endocrinology 2016 emergency guidance on acute hypercalcaemia in adults (Endocrine Connections 5(5):
 *   G9-G11, open access): full text XML from Europe PMC (PMC5314807). It is a one-page algorithm for hypercalcaemia
 *   of any cause, so its quotes are fragments of a flowchart, copied as they appear in the text.
 * DOIs resolved through Crossref (no update or replacement is registered for either). Quotes checked by script
 * against the raw text on 16 November 2026. The second pass took out reasons and instructions that neither source
 * states (stopping medicines, how calcitonin compares for speed, why saline works) and tied the low-certainty
 * rating to the recommendations the abstract attaches it to.
 */
export const hypercalcaemiaOfMalignancy = protocol({
  id: "hypercalcaemia-of-malignancy-management",
  name: "Hypercalcaemia of malignancy: assessment, intravenous fluids, bisphosphonate or denosumab",
  aka: ["malignant hypercalcaemia", "hypercalcemia of malignancy treatment", "HCM", "high calcium in cancer", "cancer-related hypercalcaemia"],
  domain: "emergencies",
  tldr: "Some cancers raise the calcium level in the blood. It can cause thirst, passing a lot of urine, constipation, sickness, loss of appetite and confusion, and can be dangerous. A blood test confirms it. Treatment is a drip of fluid, then often a medicine that stops calcium leaving the bones (a bisphosphonate such as zoledronic acid, or denosumab), alongside treatment of the cancer itself.",
  simple: "Cancer can make your blood calcium too high. You may feel very thirsty, sick, constipated or muddled. Tell your cancer team. A drip, and often a bone medicine, bring it down.",
  summary: "Society for Endocrinology 2016: measure calcium adjusted for albumin. Under 3.0 mmol/L is often asymptomatic; 3.0 to 3.5 usually needs prompt treatment; over 3.5 needs urgent correction for the risk of dysrhythmia and coma. Check phosphate, PTH, urea and electrolytes and an ECG for a short QT; high calcium with a low PTH means malignancy or another less common cause. Ask about drugs, supplements and over-the-counter products. Rehydrate with intravenous 0.9% saline, 4 to 6 L over 24 hours, watching for fluid overload in the elderly or with renal impairment; loop diuretics do not lower calcium and are only for overload; dialysis may need considering in severe renal failure. If more is needed after saline, consider an intravenous bisphosphonate: zoledronic acid 4 mg over 15 minutes, pamidronate 30 to 90 mg at 20 mg an hour, or ibandronic acid 2 to 4 mg, given more slowly and with dose reduction considered in renal impairment; the calcium nadir comes at 2 to 4 days, and hypocalcaemia can follow with vitamin D deficiency or a suppressed PTH. Second line: prednisolone 40 mg daily in lymphoma, other granulomatous diseases or vitamin D poisoning, usually effective in 2 to 4 days; and calcimimetics, denosumab or calcitonin under specialist supervision if the response is poor. This guidance covers acute hypercalcaemia of any cause, not only cancer.\n\nEndocrine Society 2023 (GRADE, read as its abstract): treat with denosumab or an intravenous bisphosphonate (strong recommendation); suggests denosumab rather than an intravenous bisphosphonate, calcitonin with an intravenous bisphosphonate or denosumab as initial treatment for severe hypercalcaemia, and denosumab for refractory or recurrent cases despite a bisphosphonate (conditional, low certainty of evidence); also suggests an intravenous bisphosphonate or denosumab added for tumours with high calcitriol where hypercalcaemia stays severe or symptomatic on a glucocorticoid, and a calcimimetic or an antiresorptive for parathyroid carcinoma (both conditional). Treating the cancer is what controls hypercalcaemia and prevents recurrence.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["acute-oncology-service", "emergency-department", "ward", "telephone-triage"],
  },
  population: "Adults with cancer and a raised adjusted calcium. Tumours that raise calcitriol, such as lymphoma, and parathyroid carcinoma are treated differently, as set out below. Children, and hypercalcaemia from primary hyperparathyroidism alone, are not covered. The Society for Endocrinology guidance is written for acute hypercalcaemia of any cause in adults, not only cancer.",
  trigger: "Thirst, polyuria, nausea, constipation, a change in mood or confusion in a person with cancer, or a raised adjusted calcium on a routine blood test.",
  steps: [
    {
      action: "Think of hypercalcaemia in anyone with cancer who has thirst, passes a lot of urine, is constipated, nauseated, off their food, changed in mood or confused",
      why: "These are the features the guidance lists first, and at very high levels it can lead to coma.",
      source: "sfe-2016",
      quote: "Polyuria and thirst Anorexia, nausea and constipation Mood disturbance, cognitive dysfunction, confusion and coma",
    },
    {
      action: "Measure calcium adjusted for albumin, with phosphate, PTH, urea and electrolytes",
      why: "Calcium in the blood is bound to albumin, so the result is adjusted for it; high calcium with a low PTH means malignancy or another less common cause.",
      source: "sfe-2016",
      quote: "Serum calcium is bound to albumin, and measurements should be adjusted for serum albumin.",
    },
    {
      action: "Treat an adjusted calcium above 3.5 mmol/L as urgent",
      why: "At that level there is a risk of heart rhythm problems and coma. Between 3.0 and 3.5 mmol/L prompt treatment is usually indicated.",
      source: "sfe-2016",
      quote: ">3.5 mmol/L: requires urgent correction due to the risk of dysrhythmia and coma",
    },
    {
      action: "Record an ECG and look for a short QT interval or conduction problems",
      why: "High calcium can shorten the QT interval and cause heart rhythm problems.",
      source: "sfe-2016",
      quote: "Look for shortened QT interval or other conduction abnormalities",
    },
    {
      action: "Ask about all medicines, including supplements and over-the-counter products",
      why: "The guidance lists thiazide diuretics, lithium, too much vitamin D or vitamin A, and theophylline toxicity among the less common causes of a high calcium.",
      source: "sfe-2016",
      quote: "Drugs including supplements and over-the-counter preparations",
    },
    {
      action: "Rehydrate with intravenous 0.9% saline, 4 to 6 litres over 24 hours, watching for fluid overload in older people or with kidney impairment",
      why: "High calcium causes thirst and passing a lot of urine, and rehydration is the first step of management in the guidance. Dialysis may need to be considered in severe kidney failure.",
      source: "sfe-2016",
      quote: "Intravenous 0.9% saline 4–6 L in 24 h Monitor for fluid overload if renal impairment or elderly",
    },
    {
      action: "Do not use loop diuretics to lower calcium; use them only for fluid overload",
      why: "The guidance says they are rarely used and are not effective for reducing calcium.",
      source: "sfe-2016",
      quote: "Loop diuretics rarely used and only if fluid overload develops; not effective for reducing serum calcium",
    },
    {
      action: "Give an antiresorptive drug: denosumab or an intravenous bisphosphonate",
      why: "These are antiresorptive drugs, which slow the release of calcium from bone; this is the one recommendation the Endocrine Society abstract calls strong.",
      source: "es-2023",
      quote: "The panel recommends (strong recommendation) in adults with HCM treatment with denosumab (Dmab) or an intravenous (IV) bisphosphonate (BP).",
      grade: "strong recommendation",
    },
    {
      action: "If using a bisphosphonate, give zoledronic acid 4 mg over 15 minutes, or pamidronate 30 to 90 mg at 20 mg an hour, or ibandronic acid 2 to 4 mg; give it more slowly and consider a lower dose if the kidneys are impaired",
      why: "These are the doses in the Society for Endocrinology guidance, which says to consider a bisphosphonate if more treatment is needed after saline. The pamidronate dose depends on how high the calcium is.",
      source: "sfe-2016",
      quote: "Zoledronic acid 4 mg over 15 min OR Pamidronate 30–90 mg (depending on severity of hypercalcaemia) at 20 mg/h OR Ibandronic acid 2–4 mg Give more slowly and consider dose reduction in renal impairment",
    },
    {
      action: "For severe hypercalcaemia, consider calcitonin together with the intravenous bisphosphonate or denosumab as initial treatment",
      why: "The Endocrine Society suggests the combination for severe cases, on low-certainty evidence. Its abstract does not give the reason or define severe.",
      source: "es-2023",
      quote: "The panel suggests (conditional recommendation) (1) in adults with HCM, the use of Dmab rather than an IV BP; (2) in adults with severe HCM, a combination of calcitonin and an IV BP or Dmab therapy as initial treatment; and (3) in adults with refractory/recurrent HCM despite treatment with BP, the use of Dmab.",
      grade: "conditional recommendation, low certainty of evidence",
    },
    {
      action: "In lymphoma, consider a glucocorticoid such as prednisolone 40 mg daily, adding an intravenous bisphosphonate or denosumab if hypercalcaemia stays severe or symptomatic",
      why: "Steroids reduce the production of active vitamin D (calcitriol) and usually work in 2 to 4 days. The Society for Endocrinology lists them as a second-line treatment; adding the bone medicine is the Endocrine Society's conditional suggestion for tumours with high calcitriol.",
      source: "sfe-2016",
      quote: "Glucocorticoids (inhibit 1,25OHD production) In lymphoma, other granulomatous diseases or 25OHD poisoning Prednisolone 40 mg daily",
    },
    {
      action: "After a bisphosphonate, monitor the calcium, expecting the lowest level at 2 to 4 days, and watch for low calcium",
      why: "A bisphosphonate can cause low calcium where there is vitamin D deficiency or a suppressed PTH.",
      source: "sfe-2016",
      quote: "Monitor serum calcium response: will reach nadir at 2–4 days Can cause hypocalcaemia if vitamin D deficiency or suppressed PTH",
    },
    {
      action: "Plan treatment of the underlying cancer",
      why: "Treating the cancer is what controls the calcium and stops it coming back.",
      source: "es-2023",
      quote: "Treatment of the primary malignancy is instrumental for controlling hypercalcemia and preventing its recurrence.",
    },
  ],
  bestInClass: {
    statement: "The Society for Endocrinology starts with assessment and intravenous saline and then, if more is needed, an antiresorptive; the Endocrine Society abstract covers drug treatment only and says nothing about fluids. They differ on which antiresorptive: the Endocrine Society 2023 recommends denosumab or an intravenous bisphosphonate (strong) and suggests denosumab rather than an intravenous bisphosphonate (conditional, low certainty), while the Society for Endocrinology 2016 emergency guidance gives an intravenous bisphosphonate first and keeps denosumab, calcitonin and calcimimetics for specialists when the response is poor. The Endocrine Society also suggests calcitonin with the antiresorptive as initial treatment for severe hypercalcaemia (conditional, low certainty). Saline volumes, the bisphosphonate doses and the warning against loop diuretics come from the Society for Endocrinology; the Endocrine Society's full text, which may give its own, could not be read.",
    sources: ["es-2023", "sfe-2016"],
  },
  variants: [
    {
      name: "Denosumab first (Endocrine Society 2023)",
      differs: "Suggests denosumab rather than an intravenous bisphosphonate for hypercalcaemia of malignancy, and denosumab for cases refractory or recurrent despite a bisphosphonate.",
      evidence: "Conditional recommendation, low certainty (GRADE).",
      sources: ["es-2023"],
    },
    {
      name: "Bisphosphonate first, denosumab under specialist care (Society for Endocrinology 2016)",
      differs: "Considers zoledronic acid, pamidronate or ibandronic acid if more treatment is needed after saline, and lists denosumab, calcitonin and calcimimetics as second-line treatments under specialist supervision, to be considered if the response to other measures is poor.",
      evidence: "Expert emergency guidance, not graded.",
      sources: ["sfe-2016"],
    },
    {
      name: "Parathyroid carcinoma",
      differs: "Treats hypercalcaemia from parathyroid carcinoma with either a calcimimetic or an antiresorptive (an intravenous bisphosphonate or denosumab).",
      evidence: "Conditional recommendation (Endocrine Society 2023). The abstract does not rate the certainty of this recommendation separately.",
      sources: ["es-2023"],
    },
  ],
  grades: [
    { claim: "Treat with denosumab or an intravenous bisphosphonate", grade: "strong recommendation", source: "es-2023" },
    { claim: "Denosumab rather than an intravenous bisphosphonate", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Calcitonin with an intravenous bisphosphonate or denosumab as initial treatment for severe hypercalcaemia", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Denosumab for hypercalcaemia refractory or recurrent despite a bisphosphonate", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Add an intravenous bisphosphonate or denosumab for tumours with high calcitriol where hypercalcaemia stays severe or symptomatic on a glucocorticoid", grade: "conditional recommendation", source: "es-2023", quote: "The panel suggests (conditional recommendation) the addition of an IV BP or Dmab in adult patients with hypercalcemia due to tumors associated with high calcitriol levels who are already receiving glucocorticoid therapy but continue to have severe or symptomatic HCM." },
    { claim: "A calcimimetic or an antiresorptive for hypercalcaemia due to parathyroid carcinoma", grade: "conditional recommendation", source: "es-2023", quote: "The panel suggests (conditional recommendation) in adult patients with hypercalcemia due to parathyroid carcinoma, treatment with either a calcimimetic or an antiresorptive (IV BP or Dmab)." },
  ],
  sources: [
    { key: "es-2023", label: "Treatment of Hypercalcemia of Malignancy in Adults: An Endocrine Society Clinical Practice Guideline", publisher: "Endocrine Society, Journal of Clinical Endocrinology and Metabolism", year: 2023, url: "https://europepmc.org/abstract/MED/36545746", doi: "10.1210/clinem/dgac621", gradingScheme: "GRADE: in the abstract 'recommends' marks a strong and 'suggests' a conditional recommendation, and the conditional ones are introduced as based on low certainty of the evidence. The abstract gives no certainty for the strong recommendation.", read: "abstract", accessed: "2026-11-16" },
    { key: "sfe-2016", label: "Society for Endocrinology Endocrine Emergency Guidance: emergency management of acute hypercalcaemia in adult patients", publisher: "Society for Endocrinology, Endocrine Connections", year: 2016, url: "https://europepmc.org/article/PMC/PMC5314807", doi: "10.1530/EC-16-0055", gradingScheme: "Expert emergency guidance; not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The Endocrine Society 2023 guideline was read only as its abstract. On 16 November 2026 its full text at academic.oup.com again returned 403 with a bot check, and Europe PMC holds no open copy. So its doses, any fluid advice, its definition of severe hypercalcaemia and its evidence tables could not be read, and no dose or threshold on this page rests on it.",
    "The abstract says the conditional recommendations were based on low certainty of the evidence, in a sentence placed directly before the three on denosumab and calcitonin. It does not rate each one, so the recommendations on tumours with high calcitriol and on parathyroid carcinoma are given here as conditional without a certainty rating, and the certainty behind the strong recommendation is not stated.",
    "Every dose, the saline volume and the calcium thresholds come from the Society for Endocrinology 2016 guidance, which is ten years old, ungraded, and written for acute hypercalcaemia of any cause rather than for cancer alone. Crossref and Europe PMC show no later edition; the society's own guidance page returned a bot check on 16 November 2026, so a revision published only there could not be ruled out.",
    "Neither source read says to stop medicines that raise calcium, says how fast calcitonin works, or explains why saline helps; those points are common teaching and are left out of the steps.",
    "No NICE guideline on hypercalcaemia of malignancy was found: a search of nice.org.uk on 16 November 2026 returned three guidance results, none on this subject. The NICE Clinical Knowledge Summary on hypercalcaemia is served only inside the UK and could not be read. UK acute oncology services use local and regional policies that were not read.",
    "The Endocrine Society rates the evidence comparing denosumab with bisphosphonates as low certainty; no trial comparing the two in hypercalcaemia of malignancy was read here.",
    "Calcitonin is not in the corpus as a drug record and is named here without a link. The sources name calcimimetics as a class and no single drug.",
  ],
  drugs: ["zoledronic-acid", "pamidronate", "ibandronic-acid", "denosumab", "cinacalcet"],
  terms: ["bone-metastases"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "metabolic"],
});
