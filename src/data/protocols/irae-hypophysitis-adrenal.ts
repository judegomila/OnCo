import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SFE_2018, SITC_ICI_2021 } from "./irae-sources";

/*
 * Hypophysitis and adrenal insufficiency caused by an immune checkpoint inhibitor: the emergency, replacement and the
 * steroid emergency card.
 *
 * What was read, and how: see ./irae-sources.ts. Society for Endocrinology 2018 emergency guidance (full text), ESE
 * 2022 guideline (full text, recommendations R 1.1 to R 7.1 read), SITC 2021 (full text, endocrine recommendations),
 * ASCO 2021 (abstract), ESMO 2022 (not reachable). Quotes checked by script against the raw text.
 */
export const iraeHypophysitisAdrenal = protocol({
  id: "irae-hypophysitis-adrenal",
  name: "Checkpoint inhibitor hypophysitis and adrenal insufficiency: emergency treatment, replacement and steroid emergency card",
  aka: ["immune checkpoint inhibitor hypophysitis", "ICI adrenal insufficiency", "adrenal crisis on immunotherapy", "cortisol deficiency immunotherapy", "steroid sick day rules immunotherapy", "ipilimumab hypophysitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can damage the pituitary or adrenal glands so the body stops making cortisol, a hormone needed to survive illness. Anyone on immunotherapy who becomes very unwell should be treated for low cortisol at once while tests are done. Most then need hydrocortisone tablets for life, a steroid emergency card, and to know how to double the dose when ill. Immunotherapy can usually carry on.",
  simple: "Immunotherapy can stop your body making cortisol, a hormone you need when you are ill. Signs include tiredness, headache, feeling faint or being sick. It is treated with hormone tablets. Carry your steroid card and learn the sick day rules.",
  summary: "Hypophysitis affects up to 17% of people on checkpoint inhibitors, mostly with CTLA-4 blockade (70% of published cases) and at ipilimumab doses above 3 mg/kg; ACTH deficiency is present in about 95% of anti-CTLA-4 cases (ESE 2022). Primary adrenal insufficiency is rare. Both usually cause permanent hormone loss.\n\nThe emergency (Society for Endocrinology 2018; ESE 2022): any severely unwell patient on a checkpoint inhibitor is assumed to have cortisol deficiency until proven otherwise. Take blood for cortisol (and ACTH) and give hydrocortisone 100 mg intravenously or intramuscularly, then 50 mg every 6 hours, with fluids; check glucose. A pre-treatment cortisol above 450 nmol/L excludes deficiency. Methylprednisolone does not replace cortisol and is kept for pituitary compression (visual loss, cranial nerve palsy, severe headache); ESE recommends against high-dose steroids for hypophysitis otherwise. Never start levothyroxine until cortisol deficiency is excluded or treated.\n\nMaintenance: hydrocortisone 15 to 25 mg a day in two or three doses (ESE) or 10, 5 and 5 mg (Society for Endocrinology), fludrocortisone for primary adrenal insufficiency only, a steroid emergency card, sick day rules and an injection kit, and no abrupt stop. A controlled endocrinopathy is not a reason to stop the checkpoint inhibitor (ESE, ASCO). SITC 2021 differs in advising interruption of immunotherapy and corticosteroids for acute hypophysitis.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "emergency-team", "pharmacist"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "outpatient-clinic", "home"],
  },
  population: "Adults treated with an immune checkpoint inhibitor (most often ipilimumab, alone or with nivolumab) who present unwell, or who have symptoms or screening results suggesting cortisol deficiency. Covers secondary (pituitary) and primary (adrenal) insufficiency. People already on high-dose steroids for another immune side effect need interpretation by an endocrinologist; children are not covered.",
  trigger: "A person on or after checkpoint inhibitor treatment presents severely unwell, or reports fatigue, headache, nausea, dizziness or visual change, or a routine test shows low cortisol or a low TSH with low or normal free T4.",
  steps: [
    {
      action: "Treat any severely unwell patient on a checkpoint inhibitor as having cortisol deficiency until proven otherwise",
      why: "Low cortisol can kill quickly and its signs are vague; giving steroids while waiting for the result is safe.",
      source: "sfe-2018",
      quote: "Any patient receiving a CPI who presents severely unwell should be assumed to have acute cortisol deficiency until proven otherwise and treated with glucocorticoids until serum cortisol result available",
    },
    {
      action: "Take blood for cortisol (and ACTH if possible), then give hydrocortisone 100 mg intravenously or intramuscularly, followed by 50 mg every 6 hours, with fluid resuscitation",
      why: "The blood sample before treatment is what later confirms or excludes the diagnosis; the hydrocortisone and fluids treat the crisis.",
      source: "ese-2022",
      quote: "We recommend the use of high-dose glucocorticoids in case of an acutely unwell patient ICI-treated with suspected adrenal crisis, more specifically 100 mg hydrocortisone intravenously or intramuscularly followed by 50 mg every 6 h and fluid resuscitation",
      grade: "good clinical practice",
    },
    {
      action: "Measure blood glucose in every unwell patient on a checkpoint inhibitor",
      why: "Checkpoint inhibitors can also cause sudden insulin-dependent diabetes, and steroid treatment raises glucose.",
      source: "sfe-2018",
      quote: "Plasma glucose should be measured in all unwell patients treated with a CPI.",
    },
    {
      action: "Stop the emergency steroids only if the pre-treatment cortisol was above 450 nmol/L and there is no other reason for them",
      why: "A cortisol above that level before treatment excludes deficiency; if in doubt, steroids continue and an endocrinologist is asked.",
      source: "sfe-2018",
      quote: "A baseline (pre-glucocorticoid treatment) serum cortisol of >450 nmol/L excludes cortisol deficiency",
    },
    {
      action: "In a mildly unwell or symptom-free patient, start oral hydrocortisone if the 09:00 cortisol is under 200 nmol/L or a random cortisol under 100 nmol/L, and refer to endocrinology",
      why: "These cut-offs deliberately err towards treating; the diagnosis is confirmed later by a specialist.",
      source: "sfe-2018",
      quote: "If low serum cortisol levels (09:00 h <200 nmol/L or random cortisol <100 nmol/L) are detected in a mildly symptomatic/asymptomatic patient start oral hydrocortisone.",
    },
    {
      action: "If there is headache, double vision or a cranial nerve palsy, arrange an urgent contrast MRI of the pituitary",
      why: "A swollen pituitary can press on the optic nerves, and brain metastases can look the same.",
      source: "sfe-2018",
      quote: "Headache, diplopia and cranial nerve palsies (CTCAE grade 3–4) should trigger an urgent MRI scan of the pituitary; to assess the potential need for treatment with IV methylprednisolone and to distinguish intracranial metastases as a differential diagnosis.",
    },
    {
      action: "Do not give high-dose steroids for hypophysitis unless there is compression of the optic chiasm or other severe pressure symptoms",
      why: "There is no evidence that high doses restore pituitary function, and one study linked them with shorter survival; replacement-dose hydrocortisone treats the hormone loss.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for treatment of hypophysitis, with exception of optic chiasm compression or other severe compressive symptoms.",
      grade: "++00 (low quality evidence), strong recommendation",
    },
    {
      action: "Do not start levothyroxine until cortisol deficiency has been excluded or treated",
      why: "Thyroid hormone speeds up cortisol use and can tip someone with untreated adrenal insufficiency into crisis.",
      source: "sfe-2018",
      quote: "Thyroxine should never be instigated unless cortisol deficiency is excluded as it can trigger an adrenal crisis.",
    },
    {
      action: "Once recovered, continue replacement with hydrocortisone, usually 15 to 25 mg a day split into two or three doses",
      why: "Pituitary and adrenal damage from checkpoint inhibitors rarely recovers, so replacement is usually lifelong.",
      source: "ese-2022",
      quote: "Most patients are managed well on a daily dose of 15–25 mg hydrocortisone split into two or three doses",
      grade: "good clinical practice",
    },
    {
      action: "For primary adrenal insufficiency, add fludrocortisone; it is not needed for pituitary causes",
      why: "Damage to the adrenal gland itself also removes aldosterone, which keeps salt and blood pressure up.",
      source: "ese-2022",
      quote: "We recommend standard mineralocorticoid replacement for patients with proven primary adrenal insufficiency (good clinical practice).",
      grade: "good clinical practice",
    },
    {
      action: "Before discharge, give a steroid emergency card, teach the sick day rules and supply a hydrocortisone injection kit",
      why: "Most adrenal crises can be prevented if the person doubles their dose when ill and anyone treating them knows they depend on steroids.",
      source: "sfe-2018",
      quote: "Prior to discharge, patients should be provided with a Steroid Emergency Card, education with regards to ‘sick day rules’, and an hydrocortisone emergency injection kit as per Society for Endocrinology guidance",
    },
    {
      action: "Never stop glucocorticoid replacement abruptly, even if immunotherapy has stopped, without a formal test of pituitary and adrenal function",
      why: "Stopping suddenly can cause an adrenal crisis.",
      source: "ese-2022",
      quote: "We recommend against stopping high-dose glucocorticoid replacement abruptly without formal assessment of pituitary–adrenal function, even if ICI treatment was stopped (good clinical practice).",
      grade: "good clinical practice",
    },
    {
      action: "Continue or restart the checkpoint inhibitor once the patient is stable on replacement",
      why: "A controlled hormone deficiency is not a reason to give up an effective cancer treatment.",
      source: "ese-2022",
      quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy (++00).",
      grade: "++00 (low quality evidence), strong recommendation",
    },
  ],
  bestInClass: {
    statement: "The endocrine guidelines agree on the emergency: assume cortisol deficiency in any severely unwell patient on a checkpoint inhibitor, take blood, and give hydrocortisone 100 mg then 50 mg 6-hourly with fluids (Society for Endocrinology 2018; ESE 2022, good clinical practice). They agree that replacement-dose hydrocortisone, not high-dose methylprednisolone, treats the hormone loss, keeping high doses for pituitary compression (ESE, ++00), and that a controlled endocrinopathy does not stop immunotherapy (ESE ++00; ASCO 2021 exempts controlled endocrinopathies from permanent discontinuation after grade 4). SITC 2021, an oncology guideline, differs: for symptoms of acute hypophysitis it advises interrupting immunotherapy and giving corticosteroids (LE: 4), and replaces with hydrocortisone 10 to 12 mg/m2 a day. Maintenance doses differ in form but not much in total: ESE 15 to 25 mg a day in two or three doses, Society for Endocrinology 10, 5 and 5 mg or prednisolone 3 to 5 mg once a day.",
    sources: ["sfe-2018", "ese-2022", "sitc-2021", "asco-2021"],
  },
  variants: [
    {
      name: "Interrupt immunotherapy and give corticosteroids for acute hypophysitis (SITC 2021)",
      differs: "Advises interrupting immunotherapy and giving corticosteroids when symptoms of acute hypophysitis appear, then hydrocortisone replacement at 10 to 12 mg/m2/day with a medical alert device and stress-dose education; withholds immunotherapy temporarily for adrenal insufficiency of any grade.",
      evidence: "LE: 4 for interruption and corticosteroids; the rest without a level (expert consensus).",
      sources: ["sitc-2021"],
    },
    {
      name: "Fixed three-dose replacement (Society for Endocrinology 2018)",
      differs: "Tapers treatment-dose glucocorticoids after 48 to 72 hours of recovery to hydrocortisone 10 mg on waking, 5 mg at lunchtime and 5 mg in the early evening, or prednisolone 3 to 5 mg once a day; warns that a short Synacthen test may be falsely reassuring within 6 to 12 weeks of hypophysitis.",
      evidence: "Expert consensus endorsed by the Society for Endocrinology Clinical Committee.",
      sources: ["sfe-2018"],
    },
  ],
  grades: [
    { claim: "Hydrocortisone 100 mg intravenously or intramuscularly then 50 mg every 6 hours with fluids for suspected adrenal crisis", grade: "good clinical practice", source: "ese-2022" },
    { claim: "No high-dose glucocorticoids for hypophysitis except compression", grade: "++00 (low), strong", source: "ese-2022" },
    { claim: "A controlled endocrinopathy is not a contraindication to checkpoint inhibitors", grade: "++00 (low), strong", source: "ese-2022" },
    { claim: "Sick day rules training for ACTH and vasopressin deficiency", grade: "good clinical practice", source: "ese-2022", quote: "We recommend that patients with pituitary hormone deficiencies, more particularly ACTH and vasopressin deficiencies, are provided with appropriate and regular training on managing their glucocorticoid and/or desmopressin treatment during period of illness (‘Sick Day Rules’) (good clinical practice)." },
    { claim: "Interrupt immunotherapy and give corticosteroids for symptoms of acute hypophysitis", grade: "LE: 4", source: "sitc-2021", quote: "If symptoms of acute hypophysitis are observed, immunotherapy should be interrupted and corticosteroids administered" },
    { claim: "Endocrinopathies controlled by hormone replacement are exempt from permanent discontinuation after grade 4", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [SFE_2018, ESE_2022, SITC_ICI_2021, ASCO_ICI_2021, ESMO_ICI_2022],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The NHS England National Patient Safety Alert on the steroid emergency card, and the Society for Endocrinology's 2016 adrenal crisis guidance it builds on, were not read for this page; the card is cited here through the 2018 guidance only.",
    "No trial read here tests whether high-dose steroids change pituitary recovery; ESE cites a retrospective study in which patients given high doses had shorter survival, and says it is unclear whether the steroids or a worse prognosis explain it.",
    "Routine screening for cortisol deficiency during treatment (how often to test morning cortisol) differs between centres; the guidelines read here set the thyroid testing interval but not a cortisol interval.",
  ],
  drugs: ["ipilimumab", "nivolumab", "pembrolizumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "hydrocortisone", "levothyroxine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-pneumonitis", "hyponatraemia-siadh"],
  tags: ["protocol", "irae", "acute-oncology", "endocrine"],
});
