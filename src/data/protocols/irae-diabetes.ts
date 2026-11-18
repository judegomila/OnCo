import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Insulin-deficient (type 1-like) diabetes caused by an immune checkpoint inhibitor, often presenting as diabetic
 * ketoacidosis.
 *
 * What was read, and how: SITC 2021 (full text, endocrine section) and ESE 2022 (full text, pancreatic islets section,
 * R 4.1 to R 4.5), both as described in ./irae-sources.ts; the 2025 consensus disease definitions for endocrine
 * irAEs (full text, Europe PMC PMC12530408). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through
 * Europe PMC. Quotes checked by script against the raw text on 11 November 2026.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text: the 2025 definitions were fetched
 * again as full-text XML from the Europe PMC REST API (PMC12530408) and their DOI resolved through Crossref; SITC 2021
 * (PMC8237720) and ESE 2022 (PMC9641795) were read from the Europe PMC full-text XML that sibling checkers saved on
 * 16 and 17 November 2026, and the ASCO 2021 abstract from the Europe PMC record saved on 16 November. Every quote
 * was checked by script (tags stripped, entities decoded, whitespace normalised). Corrected: the 2025 definitions are
 * not a SITC document (they come from the irAE Program with Project Data Sphere and are published in SITC's
 * journal); insulin is "should be considered" in the quoted sentence, not an order; the antibody figures were two
 * different measures merged into one range; a gap wrongly said no source speaks to restarting treatment; and several
 * reasons said more than the sources do. The ESE position on continuing treatment is now the variant, with its grade.
 */
export const iraeDiabetes = protocol({
  id: "irae-diabetes",
  name: "Immune-related type 1 diabetes and diabetic ketoacidosis from checkpoint inhibitors",
  aka: ["checkpoint inhibitor diabetes", "ICI-induced diabetes", "ir-T1DM", "CPI-DM", "CIADM", "immunotherapy diabetes", "checkpoint inhibitor DKA"],
  domain: "immunotherapy-toxicity",
  tldr: "Rarely, immunotherapy destroys the cells that make insulin. Blood sugar can rise quickly and become dangerous (diabetic ketoacidosis). Thirst, passing a lot of urine, being sick or feeling drowsy need urgent help. It is treated with insulin, which is almost always lifelong, and not with steroids.",
  simple: "Rarely, immunotherapy causes diabetes that needs insulin. If you are very thirsty, passing a lot of urine or being sick, contact your cancer helpline straight away.",
  summary: "Rare but frequently serious (SITC 2021). The sources put the incidence at about 1% (SITC 2021), 0.9 to 2% (ESE 2022) and 0.2 to 1.4% (2025 consensus definitions). Diabetic ketoacidosis is present at diagnosis in up to 70% (ESE). Up to 76% of those affected had received a PD-1 inhibitor and 8% a PD-L1 inhibitor, against 4% a CTLA-4 inhibitor (ESE). It may develop shortly after treatment begins or as much as a year after the start (SITC 2021); the median is 2 to 4.8 months (2025 definitions). Autoantibodies are found in up to 53% of cases, most of them GAD65 (SITC 2021); the 2025 definitions report GAD65 antibodies in 40 to 43%. SGLT2 inhibitors add to the risk of ketoacidosis (ESE), and the 2025 definitions advise avoiding them and sulfonylureas.\n\nThe 2025 definitions say glucose should be checked before each infusion and HbA1c at the start. New or worsening hyperglycaemia above 11.1 mmol/L (200 mg/dL), especially with no history of diabetes and no new steroids, or in type 2 diabetes that was well controlled, raises suspicion; urine ketones and blood pH are recommended to find ketoacidosis early (ESE). Ketoacidosis is treated with intravenous insulin and fluids under current guidelines (ESE, good clinical practice), in hospital, and SITC 2021 holds the checkpoint inhibitor until it resolves. Once the diagnosis is suspected, or the cause of the hyperglycaemia is unclear, urgent insulin should be considered (2025 definitions). ESE recommends against high-dose steroids (+000): there is no evidence that they rescue the insulin-making cells, and they raise glucose. C-peptide and autoantibodies support the diagnosis, but a detectable C-peptide early on does not exclude it. For persistent diabetes ESE recommends subcutaneous insulin (++00), as standard a multiple-injection regimen, with education and endocrinology referral; spontaneous recovery is unlikely.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "pharmacist"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "emergency-department", "acute-oncology-service", "telephone-triage", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor, most often a PD-1 or PD-L1 inhibitor. People with pre-existing type 2 diabetes can also develop it. None of the sources read addresses children.",
  trigger: "Raised blood glucose on a pre-infusion test, or thirst, passing large amounts of urine, weight loss, vomiting, abdominal pain or drowsiness during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Check glucose before every infusion and HbA1c when the checkpoint inhibitor is started",
      why: "This diabetes can come on quickly, and routine glucose tests help it to be found promptly.",
      source: "endocrine-irae-definitions-2025",
      quote: "To enable prompt identification of ir-T1DM, ICI-treated patients should undergo routine metabolic panels including glucose measurement prior to each infusion, as well as glycated hemoglobin at ICI initiation.",
    },
    {
      action: "Suspect immune diabetes in anyone with new or worsening glucose above 11.1 mmol/L (200 mg/dL), especially with no history of diabetes and no new steroids, or with type 2 diabetes that was well controlled",
      why: "High sugar is common in people with cancer because of type 2 diabetes, steroids and other treatments, so a rise that these do not explain points to the immunotherapy.",
      source: "endocrine-irae-definitions-2025",
      quote: "ir-T1DM should be suspected in any patient with emergent or worsening hyperglycemia (>200 mg/dL or 11.1 mmol/L) following ICI treatment, especially in those with no history of diabetes and no new prescription of glucocorticoids, and in those with previously well-controlled T2DM.",
    },
    {
      action: "Test urine ketones and blood pH in anyone with high glucose",
      why: "Ketoacidosis is present at diagnosis in up to 70% of cases, and these tests find it early.",
      source: "ese-2022",
      quote: "When hyperglycemia is present, urine ketone testing and blood pH measurement are recommended for early diagnosis of diabetic ketoacidosis (DKA).",
    },
    {
      action: "Admit for severe hyperglycaemia or ketoacidosis, and hold the checkpoint inhibitor until ketoacidosis has resolved",
      why: "Ketoacidosis needs hospital treatment. SITC 2021 says the checkpoint inhibitor should be held until it has resolved, and that immunotherapy should generally continue once a person with an endocrine side effect is stable.",
      source: "sitc-2021",
      quote: "If patients experience severe hyperglycemia or DKA on ICIs, they should be hospitalized.",
    },
    {
      action: "Treat ketoacidosis with intravenous insulin and fluid resuscitation under the hospital's standard guideline",
      why: "This diabetes develops quickly and leads to ketoacidosis if it is not treated firmly; the guideline says hospital treatment with intravenous insulin and fluids is most often necessary.",
      source: "ese-2022",
      quote: "We recommend that patients presenting with DKA should be managed with i.v. insulin and fluid resuscitation according to current guidelines",
      grade: "good clinical practice",
    },
    {
      action: "Consider starting insulin urgently once immune diabetes is suspected, or when the cause of the high sugar is unclear",
      why: "Early insulin lowers the risk of a hyperglycaemic crisis, and the diagnosis can be reviewed once the patient is stable. The same paper suggests a low threshold for insulin while the tests are under way.",
      source: "endocrine-irae-definitions-2025",
      quote: "Once ir-T1DM is suspected, or if the etiology of hyperglycemia is unclear, the patient should be considered for urgent insulin initiation, to minimize the risk of hyperglycemic crisis.",
    },
    {
      action: "Do not give high-dose steroids to treat the diabetes",
      why: "There is no evidence that high-dose steroids rescue the insulin-making cells, and they raise blood sugar substantially.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for treatment of ICI-induced DM",
      grade: "+000",
    },
    {
      action: "Send HbA1c, C-peptide and autoantibodies, and counsel on diet and lifestyle, glucose monitoring and insulin",
      why: "These tests support the diagnosis, and the patient needs the skills to manage insulin from the start.",
      source: "sitc-2021",
      quote: "Patients with new-onset diabetes (type I) should be tested for hemoglobin A1c, C-peptide, autoantibodies and counseled on diabetes management, including diet and lifestyle changes, glucose monitoring, and insulin treatment.",
    },
    {
      action: "Do not let a detectable C-peptide rule the diagnosis out; repeat glucose and C-peptide within a month",
      why: "C-peptide, the marker of how much insulin the body still makes, can fall rapidly, so an early result may not yet show the loss.",
      source: "endocrine-irae-definitions-2025",
      quote: "A detectable C-peptide should not be regarded as a reassuring result to exclude the diagnosis of ir-T1DM, as C-peptide level can decline rapidly in ir-T1DM.",
    },
    {
      action: "Continue with subcutaneous insulin, usually a multiple-injection regimen, with targets set for the person's age and prognosis",
      why: "The chance of spontaneous recovery is low, so insulin is almost always lifelong.",
      source: "ese-2022",
      quote: "We recommend treating ICI-induced persistent DM due to islet destruction with s.c. insulin",
      grade: "++00",
    },
    {
      action: "Refer promptly to an endocrinologist experienced in type 1 diabetes",
      why: "Insulin-deficient diabetes needs intensive glucose monitoring and insulin dose adjustment.",
      source: "endocrine-irae-definitions-2025",
      quote: "Patients with suspected or confirmed ir-T1DM should therefore be referred promptly to an endocrinologist with expertise in T1DM management.",
    },
    {
      action: "Avoid SGLT2 inhibitors and sulfonylureas",
      why: "ESE names SGLT2 inhibitors as an additional risk factor for ketoacidosis. The definitions paper gives no reason for sulfonylureas.",
      source: "endocrine-irae-definitions-2025",
      quote: "Avoid sodium-glucose cotransporter 2 inhibitors and sulfonylureas.",
    },
  ],
  bestInClass: {
    statement: "The three sources read point the same way. Screen glucose routinely (2025 consensus definitions: before each infusion). Look for ketoacidosis whenever glucose is high (SITC 2021, ESE 2022, 2025 definitions). Treat ketoacidosis in hospital with intravenous insulin and fluids under current guidelines (ESE, good clinical practice; SITC 2021 says such patients should be hospitalised). Consider insulin early, before the diagnosis is certain (2025 definitions). Do not use high-dose steroids to treat the diabetes: ESE recommends against them (+000), SITC 2021 says type 1 diabetes generally does not require corticosteroids, and the 2025 definitions say high-dose glucocorticoid is not routinely given for endocrine side effects. ESE is the only one to print a grade on its diabetes recommendations: subcutaneous insulin for persistent diabetes ++00, no high-dose glucocorticoids +000. On the checkpoint inhibitor, SITC 2021 says it should be held until ketoacidosis is resolved and that immunotherapy should generally be continued as soon as patients are stable, and ESE treats a controlled endocrinopathy as no reason to stop (++00). None of the sources read sets a glucose threshold for holding treatment.",
    sources: ["ese-2022", "sitc-2021", "endocrine-irae-definitions-2025"],
  },
  variants: [
    {
      name: "No interruption of the checkpoint inhibitor for diabetes (ESE 2022)",
      differs: "ESE recommends that a controlled endocrinopathy is not a contraindication to starting or continuing a checkpoint inhibitor (R 1.1), and says that, apart from severe thyroid eye disease and hypophysitis pressing on the optic chiasm or nerve, there is no need to interrupt or stop treatment for endocrine abnormalities (R 1.2). Its rationale allows that rare cases may need endocrine control first, naming adrenal crisis and severe thyrotoxicosis but not ketoacidosis, and says this should not stop or significantly delay treatment. SITC 2021 says the checkpoint inhibitor should be held until ketoacidosis is resolved. The 2025 consensus definitions say endocrine side effects can generally be managed without stopping the checkpoint inhibitor.",
      evidence: "ESE R 1.1 and R 1.2 are both printed with ++00 (low quality evidence). The SITC 2021 statement is expert consensus with no level of evidence printed. The 2025 definitions are an ungraded consensus.",
      sources: ["ese-2022", "sitc-2021", "endocrine-irae-definitions-2025"],
    },
  ],
  grades: [
    { claim: "Intravenous insulin and fluids for ketoacidosis", grade: "good clinical practice", source: "ese-2022" },
    { claim: "No high-dose glucocorticoids for checkpoint inhibitor diabetes", grade: "+000", source: "ese-2022" },
    { claim: "Subcutaneous insulin for persistent diabetes", grade: "++00", source: "ese-2022" },
    { claim: "Regular training on managing the condition, including diet and physical activity", grade: "Good clinical practice", source: "ese-2022", quote: "We recommend that patients with DM are provided with appropriate and regular training on managing their condition and treatment, including diet and physical activity" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { ...ESE_2022, accessed: "2026-11-17" },
    {
      key: "endocrine-irae-definitions-2025",
      label: "Consensus-based disease definitions for endocrine immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12530408",
      doi: "10.1136/jitc-2025-011865",
      gradingScheme: "Not a SITC guideline: a consensus from the irAE Program in partnership with Project Data Sphere, published in the journal of SITC. RAND/UCLA Appropriateness Method (a two-round modified Delphi): a core working group of eight endocrinologists drafted the statements and a multidisciplinary panel voted on them. Statements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract, which does not give its diabetes recommendations. Its general rule there is that, in general, permanent discontinuation is recommended at grade 4 except for endocrinopathies that have been controlled by hormone replacement. On 16 November 2026 the full text still refused a script.",
    "On restarting after ketoacidosis the sources give only general statements: SITC 2021 holds the checkpoint inhibitor until ketoacidosis is resolved and says immunotherapy should generally be continued as soon as patients are stable, and ESE says a controlled endocrinopathy is not a contraindication to continuing. None gives a glucose level, a time interval or a test that must be met first.",
    "The evidence is small: ESE's systematic review found two studies with 29 patients in total, and insulin could be withdrawn in a single patient, after the checkpoint inhibitor was stopped.",
    "The 2025 consensus definitions refer to a severity table for this diabetes that was not found in the full-text XML read on 17 November 2026 (the paper has online supplements, which were not read), so no severity grades are given here.",
    "A position statement on endocrine side effects of checkpoint inhibitors in children, from the European Society for Paediatric Endocrinology (Hormone Research in Paediatrics, DOI 10.1159/000546146), is listed in Europe PMC. It was not read and nothing here rests on it.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "atezolizumab", "durvalumab", "cemiplimab", "avelumab", "dostarlimab", "ipilimumab", "tremelimumab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-thyroid", "irae-hypophysitis-adrenal", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "endocrine", "acute-oncology"],
});
