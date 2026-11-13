import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Insulin-deficient (type 1-like) diabetes caused by an immune checkpoint inhibitor, often presenting as diabetic
 * ketoacidosis.
 *
 * What was read, and how: SITC 2021 (full text, endocrine section) and ESE 2022 (full text, pancreatic islets section,
 * R 4.1 to R 4.5), both as described in ./irae-sources.ts; the SITC 2025 consensus disease definitions for endocrine
 * irAEs (full text, Europe PMC PMC12530408). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through
 * Europe PMC. Quotes checked by script against the raw text on 11 November 2026.
 */
export const iraeDiabetes = protocol({
  id: "irae-diabetes",
  name: "Immune-related type 1 diabetes and diabetic ketoacidosis from checkpoint inhibitors",
  aka: ["checkpoint inhibitor diabetes", "ICI-induced diabetes", "ir-T1DM", "CPI-DM", "CIADM", "immunotherapy diabetes", "checkpoint inhibitor DKA"],
  domain: "immunotherapy-toxicity",
  tldr: "Rarely, immunotherapy destroys the cells that make insulin. Blood sugar can rise within days and become dangerous (diabetic ketoacidosis). Thirst, passing a lot of urine, being sick or feeling drowsy need urgent help. It is treated with insulin, which is almost always lifelong, and not with steroids.",
  simple: "Very rarely, immunotherapy causes diabetes that needs insulin. If you are very thirsty, passing a lot of urine or being sick, contact your cancer helpline straight away.",
  summary: "Rare (about 1%; 0.2 to 1.4% in the SITC 2025 definitions) but frequently serious: diabetic ketoacidosis is present at diagnosis in up to 70% (ESE 2022). Most cases follow PD-1 or PD-L1 inhibitors (76% and 8% in the series ESE cites, against 4% for CTLA-4 inhibitors); onset ranges from soon after the first dose to a year later (median 2 to 4.8 months). Autoantibodies (mostly GAD65) are found in 40 to 53%. SGLT2 inhibitors add to the risk of ketoacidosis (ESE).\n\nGlucose is checked before every infusion and HbA1c at the start (SITC 2025 definitions). New or worsening hyperglycaemia above 11.1 mmol/L (200 mg/dL), especially without diabetes or new steroids, raises suspicion; urine ketones and blood pH screen for ketoacidosis. Ketoacidosis is treated in hospital with intravenous insulin and fluids under the usual protocols, and the checkpoint inhibitor is held until it resolves. Insulin is started urgently once the diagnosis is suspected; high-dose steroids do not help (ESE, +000). C-peptide and islet autoantibodies support the diagnosis but a normal C-peptide early on does not exclude it. Treatment is a multiple-injection insulin regimen with endocrinology referral and education; recovery is rare.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "pharmacist"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "emergency-department", "acute-oncology-service", "telephone-triage", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor, most often a PD-1 or PD-L1 inhibitor. People with pre-existing type 2 diabetes can also develop it. Children are not addressed by these sources.",
  trigger: "Raised blood glucose on a pre-infusion test, or thirst, passing large amounts of urine, weight loss, vomiting, abdominal pain or drowsiness during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Check glucose before every infusion and HbA1c when the checkpoint inhibitor is started",
      why: "This diabetes comes on quickly, so a routine glucose test is the earliest warning.",
      source: "sitc-2025-endocrine",
      quote: "To enable prompt identification of ir-T1DM, ICI-treated patients should undergo routine metabolic panels including glucose measurement prior to each infusion, as well as glycated hemoglobin at ICI initiation.",
    },
    {
      action: "Suspect immune diabetes in anyone with new or worsening glucose above 11.1 mmol/L (200 mg/dL), especially without diabetes or new steroids",
      why: "Steroids and type 2 diabetes are common causes of high sugar; a sudden rise without them points to the immunotherapy.",
      source: "sitc-2025-endocrine",
      quote: "ir-T1DM should be suspected in any patient with emergent or worsening hyperglycemia (>200 mg/dL or 11.1 mmol/L) following ICI treatment, especially in those with no history of diabetes and no new prescription of glucocorticoids, and in those with previously well-controlled T2DM.",
    },
    {
      action: "Test urine ketones and blood pH in anyone with high glucose",
      why: "Ketoacidosis is common at diagnosis and can be found before it becomes life-threatening.",
      source: "ese-2022",
      quote: "When hyperglycemia is present, urine ketone testing and blood pH measurement are recommended for early diagnosis of diabetic ketoacidosis (DKA).",
    },
    {
      action: "Admit for severe hyperglycaemia or ketoacidosis, and hold the checkpoint inhibitor until ketoacidosis has resolved",
      why: "Ketoacidosis needs hospital treatment, and the next dose can wait until it is under control.",
      source: "sitc-2021",
      quote: "If patients experience severe hyperglycemia or DKA on ICIs, they should be hospitalized.",
    },
    {
      action: "Treat ketoacidosis with intravenous insulin and fluid resuscitation under the hospital's standard guideline",
      why: "Immune diabetes causes a profound lack of insulin, so it is treated like any severe ketoacidosis.",
      source: "ese-2022",
      quote: "We recommend that patients presenting with DKA should be managed with i.v. insulin and fluid resuscitation according to current guidelines",
      grade: "good clinical practice",
    },
    {
      action: "Start insulin urgently once immune diabetes is suspected, even if the cause of the high sugar is not yet certain",
      why: "Waiting for proof risks a hyperglycaemic crisis; the diagnosis can be revisited once the patient is stable.",
      source: "sitc-2025-endocrine",
      quote: "Once ir-T1DM is suspected, or if the etiology of hyperglycemia is unclear, the patient should be considered for urgent insulin initiation, to minimize the risk of hyperglycemic crisis.",
    },
    {
      action: "Do not give high-dose steroids to treat the diabetes",
      why: "Steroids do not rescue the insulin-making cells and push blood sugar higher.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for treatment of ICI-induced DM",
      grade: "+000",
    },
    {
      action: "Send HbA1c, C-peptide and islet autoantibodies, and counsel on diet, glucose monitoring and insulin",
      why: "These tests support the diagnosis, and the patient needs the skills to manage insulin from the start.",
      source: "sitc-2021",
      quote: "Patients with new-onset diabetes (type I) should be tested for hemoglobin A1c, C-peptide, autoantibodies and counseled on diabetes management, including diet and lifestyle changes, glucose monitoring, and insulin treatment.",
    },
    {
      action: "Do not let a detectable C-peptide early on rule the diagnosis out; repeat glucose and C-peptide within a month",
      why: "Insulin production can fall quickly over the first weeks.",
      source: "sitc-2025-endocrine",
      quote: "A detectable C-peptide should not be regarded as a reassuring result to exclude the diagnosis of ir-T1DM, as C-peptide level can decline rapidly in ir-T1DM.",
    },
    {
      action: "Continue with subcutaneous insulin, usually a multiple-injection regimen, with targets set for the person's age and prognosis",
      why: "The insulin-making cells rarely recover, so insulin is almost always lifelong.",
      source: "ese-2022",
      quote: "We recommend treating ICI-induced persistent DM due to islet destruction with s.c. insulin",
      grade: "++00",
    },
    {
      action: "Refer promptly to an endocrinologist experienced in type 1 diabetes",
      why: "Insulin-deficient diabetes needs close glucose monitoring and dose adjustment.",
      source: "sitc-2025-endocrine",
      quote: "Patients with suspected or confirmed ir-T1DM should therefore be referred promptly to an endocrinologist with expertise in T1DM management.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021, ESE 2022 and the SITC 2025 endocrine definitions agree: screen glucose routinely, look for ketoacidosis when glucose is high, treat ketoacidosis in hospital with intravenous insulin and fluids, start insulin early, and do not use high-dose steroids. ESE is the only one to grade its recommendations (GRADE): subcutaneous insulin for persistent diabetes ++00, no high-dose glucocorticoids +000. SITC 2021 holds the checkpoint inhibitor until ketoacidosis resolves; ESE treats a controlled endocrinopathy as no reason to stop. None of the sources read sets a glucose threshold for holding treatment other than ketoacidosis.",
    sources: ["ese-2022", "sitc-2021", "sitc-2025-endocrine"],
  },
  variants: [
    {
      name: "Hold only until ketoacidosis resolves (SITC 2021)",
      differs: "Evaluates every patient with hyperglycaemia for ketoacidosis and holds the checkpoint inhibitor until it is resolved, rather than holding for diabetes as such.",
      evidence: "Expert consensus; no level of evidence printed.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Intravenous insulin and fluids for ketoacidosis", grade: "good clinical practice", source: "ese-2022" },
    { claim: "No high-dose glucocorticoids for checkpoint inhibitor diabetes", grade: "+000", source: "ese-2022" },
    { claim: "Subcutaneous insulin for persistent diabetes", grade: "++00", source: "ese-2022" },
    { claim: "Regular training on managing the condition, including diet and physical activity", grade: "Good clinical practice", source: "ese-2022", quote: "We recommend that patients with DM are provided with appropriate and regular training on managing their condition and treatment, including diet and physical activity" },
  ],
  sources: [
    SITC_ICI_2021,
    ESE_2022,
    {
      key: "sitc-2025-endocrine",
      label: "Consensus-based disease definitions for endocrine immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12530408",
      doi: "10.1136/jitc-2025-011865",
      gradingScheme: "RAND/UCLA Appropriateness Method (modified Delphi) consensus of a multidisciplinary panel; statements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract, which does not give its diabetes recommendations.",
    "No source read says whether, or when, to restart the checkpoint inhibitor after ketoacidosis has been treated; ESE's general position is that a controlled endocrinopathy does not stop treatment.",
    "The evidence is small: ESE's systematic review found two studies with 29 patients in total, with insulin withdrawal reported in one.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "atezolizumab", "durvalumab", "cemiplimab", "avelumab", "dostarlimab", "ipilimumab", "tremelimumab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-thyroid", "irae-hypophysitis-adrenal", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "endocrine", "acute-oncology"],
});
