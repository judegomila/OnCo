import { protocol } from "./helpers";

/*
 * Hypercalcaemia of malignancy in adults: recognition, assessment, rehydration and antiresorptive treatment.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - Endocrine Society 2023 clinical practice guideline on treatment of hypercalcaemia of malignancy (JCEM): abstract
 *   only, from the Europe PMC REST API. The full text at academic.oup.com returned 403 to a script.
 * - Society for Endocrinology 2016 emergency guidance on acute hypercalcaemia in adults (Endocrine Connections, open
 *   access): full text from Europe PMC (PMC5314807). It is a one-page algorithm, so its quotes are fragments of a
 *   flowchart, copied as they appear in the text.
 * DOIs resolved through Crossref. Quotes checked by script against the raw text.
 */
export const hypercalcaemiaOfMalignancy = protocol({
  id: "hypercalcaemia-of-malignancy-management",
  name: "Hypercalcaemia of malignancy: assessment, intravenous fluids, bisphosphonate or denosumab",
  aka: ["malignant hypercalcaemia", "hypercalcemia of malignancy treatment", "HCM", "high calcium in cancer", "cancer-related hypercalcaemia"],
  domain: "emergencies",
  tldr: "Some cancers raise the calcium level in the blood. It causes thirst, passing a lot of urine, constipation, sickness, tiredness and confusion, and can be dangerous. A blood test confirms it. Treatment is a drip of fluid, then a medicine that stops calcium leaving the bones (a bisphosphonate such as zoledronic acid, or denosumab), alongside treatment of the cancer itself.",
  simple: "Cancer can make your blood calcium too high. You may feel very thirsty, sick, constipated or muddled. Tell your cancer team. A drip and a bone medicine bring it down.",
  summary: "Society for Endocrinology 2016: measure calcium adjusted for albumin. Under 3.0 mmol/L is often asymptomatic; 3.0 to 3.5 usually needs prompt treatment; over 3.5 needs urgent correction for the risk of dysrhythmia and coma. Check phosphate, PTH, urea and electrolytes and an ECG for a short QT; high calcium with a low PTH points to malignancy. Review drugs and supplements. Rehydrate with intravenous 0.9% saline, 4 to 6 L over 24 hours, watching for fluid overload in the elderly or with renal impairment; loop diuretics do not lower calcium and are only for overload. Then an intravenous bisphosphonate: zoledronic acid 4 mg over 15 minutes, pamidronate 30 to 90 mg or ibandronic acid 2 to 4 mg, more slowly and at reduced dose in renal impairment; the calcium nadir comes at 2 to 4 days. Prednisolone 40 mg daily for lymphoma and other calcitriol-driven causes. Denosumab, calcitonin and calcimimetics under specialist supervision.\n\nEndocrine Society 2023 (GRADE): treat with denosumab or an intravenous bisphosphonate (strong recommendation); suggests denosumab rather than an intravenous bisphosphonate, calcitonin with a bisphosphonate or denosumab for severe hypercalcaemia, denosumab for refractory or recurrent cases despite bisphosphonate, an antiresorptive added to glucocorticoids for calcitriol-driven tumours, and a calcimimetic or antiresorptive for parathyroid carcinoma (all conditional, low certainty). Treating the cancer is what controls hypercalcaemia and prevents recurrence.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["acute-oncology-service", "emergency-department", "ward", "telephone-triage"],
  },
  population: "Adults with cancer and a raised adjusted calcium. Lymphoma and other tumours that raise calcitriol, and parathyroid carcinoma, have steps of their own. Children, and hypercalcaemia from primary hyperparathyroidism alone, are not covered.",
  trigger: "Thirst, polyuria, nausea, constipation, confusion or drowsiness in a person with cancer, or a raised adjusted calcium on a routine blood test.",
  steps: [
    {
      action: "Think of hypercalcaemia in anyone with cancer who has thirst, passes a lot of urine, is constipated, nauseated, low in mood or confused",
      why: "The symptoms are vague and easily put down to the cancer or its treatment.",
      source: "sfe-2016",
      quote: "Polyuria and thirst Anorexia, nausea and constipation Mood disturbance, cognitive dysfunction, confusion and coma",
    },
    {
      action: "Measure calcium adjusted for albumin, with phosphate, PTH, urea and electrolytes",
      why: "Low albumin, common in cancer, hides a high free calcium; a low PTH with high calcium points to the cancer as the cause.",
      source: "sfe-2016",
      quote: "Serum calcium is bound to albumin, and measurements should be adjusted for serum albumin.",
    },
    {
      action: "Treat an adjusted calcium above 3.5 mmol/L as urgent",
      why: "At that level the risk of heart rhythm problems and coma is high.",
      source: "sfe-2016",
      quote: ">3.5 mmol/L: requires urgent correction due to the risk of dysrhythmia and coma",
    },
    {
      action: "Record an ECG and look for a short QT interval or conduction problems",
      why: "High calcium affects the heart's electrical activity.",
      source: "sfe-2016",
      quote: "Look for shortened QT interval or other conduction abnormalities",
    },
    {
      action: "Review all medicines, including supplements and over-the-counter products, and stop those that raise calcium",
      why: "Thiazides, lithium, calcium and vitamin D supplements can add to the problem.",
      source: "sfe-2016",
      quote: "Drugs including supplements and over-the-counter preparations",
    },
    {
      action: "Rehydrate with intravenous 0.9% saline, 4 to 6 litres over 24 hours, watching for fluid overload in older people or with kidney impairment",
      why: "High calcium makes the kidneys lose water, and dehydration in turn stops them clearing calcium.",
      source: "sfe-2016",
      quote: "Intravenous 0.9% saline 4–6 L in 24 h Monitor for fluid overload if renal impairment or elderly",
    },
    {
      action: "Do not use loop diuretics to lower calcium; use them only for fluid overload",
      why: "They do not reduce calcium and can worsen dehydration.",
      source: "sfe-2016",
      quote: "Loop diuretics rarely used and only if fluid overload develops; not effective for reducing serum calcium",
    },
    {
      action: "Give an antiresorptive drug: denosumab or an intravenous bisphosphonate",
      why: "These stop bone releasing calcium; the Endocrine Society makes this its one strong recommendation.",
      source: "es-2023",
      quote: "The panel recommends (strong recommendation) in adults with HCM treatment with denosumab (Dmab) or an intravenous (IV) bisphosphonate (BP).",
      grade: "strong recommendation",
    },
    {
      action: "If using a bisphosphonate, give zoledronic acid 4 mg over 15 minutes (or pamidronate or ibandronic acid), more slowly and at a lower dose if the kidneys are impaired",
      why: "Bisphosphonates are cleared by the kidneys and can damage them if given too fast.",
      source: "sfe-2016",
      quote: "Give more slowly and consider dose reduction in renal impairment",
    },
    {
      action: "For severe hypercalcaemia, consider calcitonin with the bisphosphonate or denosumab as initial treatment",
      why: "Calcitonin works within hours, while bisphosphonates and denosumab take days.",
      source: "es-2023",
      quote: "The panel suggests (conditional recommendation) (1) in adults with HCM, the use of Dmab rather than an IV BP; (2) in adults with severe HCM, a combination of calcitonin and an IV BP or Dmab therapy as initial treatment; and (3) in adults with refractory/recurrent HCM despite treatment with BP, the use of Dmab.",
      grade: "conditional recommendation, low certainty of evidence",
    },
    {
      action: "In lymphoma and other causes driven by calcitriol, use a glucocorticoid such as prednisolone 40 mg daily, adding a bisphosphonate or denosumab if calcium stays high",
      why: "Steroids switch off the excess vitamin D production these tumours cause.",
      source: "sfe-2016",
      quote: "Glucocorticoids (inhibit 1,25OHD production) In lymphoma, other granulomatous diseases or 25OHD poisoning Prednisolone 40 mg daily",
    },
    {
      action: "Recheck calcium over the following days, expecting the lowest level at 2 to 4 days, and watch for low calcium",
      why: "Overshoot is possible, especially with vitamin D deficiency or a suppressed PTH.",
      source: "sfe-2016",
      quote: "Monitor serum calcium response: will reach nadir at 2–4 days Can cause hypocalcaemia if vitamin D deficiency or suppressed PTH",
    },
    {
      action: "Plan treatment of the underlying cancer",
      why: "Lowering calcium buys time; treating the cancer is what keeps it down.",
      source: "es-2023",
      quote: "Treatment of the primary malignancy is instrumental for controlling hypercalcemia and preventing its recurrence.",
    },
  ],
  bestInClass: {
    statement: "Both sources start with assessment and intravenous saline and then an antiresorptive. They differ on which one: the Endocrine Society 2023 recommends denosumab or an intravenous bisphosphonate (strong) and suggests denosumab rather than a bisphosphonate (conditional, low certainty), while the Society for Endocrinology 2016 emergency guidance gives an intravenous bisphosphonate first and keeps denosumab, calcitonin and calcimimetics for specialists when the response is poor. The Endocrine Society also suggests calcitonin with the antiresorptive for severe hypercalcaemia. Saline volumes, the bisphosphonate doses and the warning against loop diuretics come from the Society for Endocrinology; the Endocrine Society's full text, which may give its own, could not be read.",
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
      differs: "Uses zoledronic acid, pamidronate or ibandronic acid after saline, and lists denosumab, calcitonin and calcimimetics as second-line treatments under specialist supervision.",
      evidence: "Expert emergency guidance, not graded.",
      sources: ["sfe-2016"],
    },
    {
      name: "Parathyroid carcinoma",
      differs: "Treats hypercalcaemia from parathyroid carcinoma with either a calcimimetic or an antiresorptive.",
      evidence: "Conditional recommendation, low certainty (Endocrine Society 2023).",
      sources: ["es-2023"],
    },
  ],
  grades: [
    { claim: "Treat with denosumab or an intravenous bisphosphonate", grade: "strong recommendation", source: "es-2023" },
    { claim: "Denosumab rather than an intravenous bisphosphonate", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Calcitonin with a bisphosphonate or denosumab for severe hypercalcaemia", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Denosumab for hypercalcaemia refractory or recurrent despite a bisphosphonate", grade: "conditional, low certainty", source: "es-2023" },
    { claim: "Add an antiresorptive to glucocorticoids for calcitriol-driven tumours with persistent severe hypercalcaemia", grade: "conditional, low certainty", source: "es-2023", quote: "The panel suggests (conditional recommendation) the addition of an IV BP or Dmab in adult patients with hypercalcemia due to tumors associated with high calcitriol levels who are already receiving glucocorticoid therapy but continue to have severe or symptomatic HCM." },
  ],
  sources: [
    { key: "es-2023", label: "Treatment of Hypercalcemia of Malignancy in Adults: An Endocrine Society Clinical Practice Guideline", publisher: "Endocrine Society, Journal of Clinical Endocrinology and Metabolism", year: 2023, url: "https://europepmc.org/abstract/MED/36545746", doi: "10.1210/clinem/dgac621", gradingScheme: "GRADE: 'recommends' is a strong and 'suggests' a conditional recommendation, with certainty of evidence rated high, moderate, low or very low.", read: "abstract", accessed: "2026-11-11" },
    { key: "sfe-2016", label: "Society for Endocrinology Endocrine Emergency Guidance: emergency management of acute hypercalcaemia in adult patients", publisher: "Society for Endocrinology, Endocrine Connections", year: 2016, url: "https://europepmc.org/article/PMC/PMC5314807", doi: "10.1530/EC-16-0055", gradingScheme: "Expert emergency guidance; not graded.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The Endocrine Society 2023 guideline was read only as its abstract; its full text, with doses, fluid advice and the evidence tables, returned 403 to a script.",
    "No UK national (NICE) guideline on hypercalcaemia of malignancy was found; UK acute oncology services use local and regional policies that were not read.",
    "The Endocrine Society rates the evidence comparing denosumab with bisphosphonates as low certainty; no head-to-head randomised trial in hypercalcaemia of malignancy was read here.",
    "Calcitonin is not in the corpus as a drug record and is named here without a link.",
  ],
  drugs: ["zoledronic-acid", "pamidronate", "ibandronic-acid", "denosumab", "cinacalcet"],
  terms: ["bone-metastases"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "metabolic"],
});
