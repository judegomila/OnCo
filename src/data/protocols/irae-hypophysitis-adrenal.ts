import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SFE_2018, SITC_ICI_2021 } from "./irae-sources";

/*
 * Hypophysitis and adrenal insufficiency caused by an immune checkpoint inhibitor: the emergency, replacement and the
 * steroid emergency card.
 *
 * What was read, and how: see ./irae-sources.ts. Society for Endocrinology 2018 emergency guidance (full text), ESE
 * 2022 guideline (full text, recommendations R 1.1 to R 7.1 read), SITC 2021 (full text, endocrine recommendations),
 * ASCO 2021 (abstract), ESMO 2022 (not reachable). Quotes checked by script against the raw text.
 *
 * Second accuracy pass, 17 November 2026. Re-fetched as raw full-text XML from the Europe PMC REST API and read
 * claim by claim: ESE 2022 (PMC9641795) and Society for Endocrinology 2018 (PMC6013692); both DOIs resolved through
 * Crossref and the titles checked. Newly read the same way: the Society for Endocrinology 2016 adrenal crisis
 * guidance (PMC5314805, DOI 10.1530/EC-16-0054), which the 2018 guidance cites for the emergency card and the sick
 * day rules; it is now a source here. SITC 2021 full text and the ASCO 2021 abstract were re-used from the copies the
 * irae-myocarditis checker fetched from Europe PMC on 16 November 2026. ESMO 2022 and the ASCO full text still refuse
 * a script (a sibling's check, not repeated). The three algorithm figures of the 2018 guidance are images and were
 * not read. Every quote was re-checked by script against the raw text (tags and citation numbers stripped,
 * whitespace normalised). Europe PMC title searches found no newer edition of the ESE or Society for Endocrinology
 * guidance.
 */
const SFE_ADRENAL_CRISIS_2016 = {
  key: "sfe-adrenal-crisis-2016",
  label: "Society for Endocrinology Endocrine Emergency Guidance: emergency management of acute adrenal insufficiency (adrenal crisis) in adult patients",
  publisher: "Society for Endocrinology, Endocrine Connections",
  year: 2016,
  url: "https://europepmc.org/article/PMC/PMC5314805",
  doi: "10.1530/EC-16-0054",
  gradingScheme: "Emergency guidance written with the Society for Endocrinology Clinical Committee; recommendations are not graded.",
  read: "full-text" as const,
  accessed: "2026-11-17",
};

export const iraeHypophysitisAdrenal = protocol({
  id: "irae-hypophysitis-adrenal",
  name: "Checkpoint inhibitor hypophysitis and adrenal insufficiency: emergency treatment, replacement and steroid emergency card",
  aka: ["immune checkpoint inhibitor hypophysitis", "ICI adrenal insufficiency", "adrenal crisis on immunotherapy", "cortisol deficiency immunotherapy", "steroid sick day rules immunotherapy", "ipilimumab hypophysitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can damage the pituitary or adrenal glands so the body stops making cortisol, a hormone needed to survive illness. Anyone on immunotherapy who becomes very unwell should be treated for low cortisol at once while tests are done. Most then need hydrocortisone tablets long term, a steroid emergency card, and to know the sick day rules. Immunotherapy can usually carry on.",
  simple: "Immunotherapy can stop your body making cortisol, a hormone you need when you are ill. Signs include tiredness, headache, feeling faint or being sick. It is treated with hormone tablets. Carry your steroid card and learn the sick day rules.",
  summary: "ESE 2022 puts the overall incidence of hypophysitis at up to 17% of people on checkpoint inhibitors, mostly with CTLA-4 blockade (70% of 276 published cases) and at ipilimumab doses above 3 mg/kg, with ACTH deficiency in 95% of anti-CTLA-4 cases. SITC 2021 gives lower rates: 1% on PD-1 or PD-L1 inhibitors, 4% on CTLA-4 inhibitors and 9 to 11% on the combination. Primary adrenal insufficiency is rare. The loss of cortisol is usually permanent: ESE calls recovery of ACTH deficiency extremely rare.\n\nThe emergency: any severely unwell patient on a checkpoint inhibitor is assumed to have cortisol deficiency until proven otherwise (Society for Endocrinology 2018). Take blood for cortisol and preferably ACTH, then give hydrocortisone 100 mg intravenously or intramuscularly, followed by 50 mg every 6 hours, with fluids (ESE 2022; Society for Endocrinology 2016, which also allows 200 mg over 24 hours by infusion); check glucose. A pre-treatment cortisol above 450 nmol/L excludes deficiency, with exceptions the 2018 guidance lists in an algorithm figure not read here. That guidance says methylprednisolone is not an appropriate treatment for acute cortisol deficiency, though it may help pressure effects (optic chiasm compromise, visual field defects, cranial nerve palsies and, in some cases, intractable headache); ESE recommends against high-dose steroids for hypophysitis except for optic chiasm compression or other severe compressive symptoms. Levothyroxine is not started until cortisol deficiency is excluded or treated.\n\nMaintenance: hydrocortisone 15 to 25 mg a day in two or three doses (ESE) or 10, 5 and 5 mg (Society for Endocrinology), fludrocortisone for primary adrenal insufficiency only, a steroid emergency card, sick day rules (double the oral dose during a feverish illness; an injection during prolonged vomiting or diarrhoea) and an injection kit, and no abrupt stop without a formal test. A controlled endocrinopathy is not a contraindication to the checkpoint inhibitor (ESE; SITC and the ASCO abstract say much the same in general terms), though ESE suggests discussing interruption when hypophysitis compresses the optic chiasm or nerve. SITC 2021 advises interrupting immunotherapy and giving corticosteroids for symptoms of acute hypophysitis, without stating a dose.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "emergency-team", "pharmacist"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "outpatient-clinic", "home"],
  },
  population: "Adults treated with an immune checkpoint inhibitor who present unwell, or who have symptoms or screening results suggesting cortisol deficiency; ESE names ipilimumab, alone or with a PD-1 inhibitor, as carrying an increased risk of hypophysitis. Covers secondary (pituitary) and primary (adrenal) insufficiency. In people already taking steroids, cortisol and ACTH results may be inaccurate (SITC), and those on methylprednisolone or other high-dose steroids for another immune side effect do not need hydrocortisone added (Society for Endocrinology 2018). Children are not covered.",
  trigger: "A person on or after checkpoint inhibitor treatment presents severely unwell, or reports fatigue, headache, nausea, dizziness or visual change, or a routine test shows low cortisol or a low TSH with low or normal free T4.",
  steps: [
    {
      action: "Treat any severely unwell patient on a checkpoint inhibitor as having cortisol deficiency until proven otherwise",
      why: "The signs of low cortisol may be non-specific, and it can be fatal if it is not recognised early.",
      source: "sfe-2018",
      quote: "Any patient receiving a CPI who presents severely unwell should be assumed to have acute cortisol deficiency until proven otherwise and treated with glucocorticoids until serum cortisol result available",
    },
    {
      action: "For a suspected adrenal crisis, take blood for cortisol (and preferably ACTH), then give hydrocortisone 100 mg intravenously or intramuscularly, followed by 50 mg every 6 hours, with fluid resuscitation",
      why: "ESE says to secure the blood sample first but not to delay treatment while waiting for the results, as this can be fatal.",
      source: "ese-2022",
      quote: "We recommend the use of high-dose glucocorticoids in case of an acutely unwell patient ICI-treated with suspected adrenal crisis, more specifically 100 mg hydrocortisone intravenously or intramuscularly followed by 50 mg every 6 h and fluid resuscitation",
      grade: "good clinical practice",
    },
    {
      action: "Measure blood glucose in every unwell patient on a checkpoint inhibitor",
      why: "Checkpoint inhibitors can also cause insulin-deficient diabetes, and high-dose steroids given for immune side effects can cause or worsen high blood sugar.",
      source: "sfe-2018",
      quote: "Plasma glucose should be measured in all unwell patients treated with a CPI.",
    },
    {
      action: "Consider stopping the emergency steroids if the pre-treatment cortisol was above 450 nmol/L and cortisol deficiency was the only reason for them",
      why: "A cortisol above that level before treatment excludes deficiency, with exceptions the guidance lists in its first algorithm; if there is any doubt, steroids continue and an endocrinologist is asked.",
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
      action: "If there is headache, double vision or a cranial nerve palsy, arrange an urgent MRI of the pituitary",
      why: "The scan shows whether intravenous methylprednisolone may be needed for pressure on nearby nerves, and tells hypophysitis apart from metastases inside the skull. The guidance asks for a contrast-enhanced scan as soon as possible whenever hypophysitis is suspected.",
      source: "sfe-2018",
      quote: "Headache, diplopia and cranial nerve palsies (CTCAE grade 3–4) should trigger an urgent MRI scan of the pituitary; to assess the potential need for treatment with IV methylprednisolone and to distinguish intracranial metastases as a differential diagnosis.",
    },
    {
      action: "Do not give high-dose steroids for hypophysitis unless there is compression of the optic chiasm or other severe pressure symptoms",
      why: "ESE found no evidence that high doses work better than replacement doses at restoring pituitary function. One study reported shorter survival in patients given them, though it is unclear whether the steroids were the cause.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for treatment of hypophysitis, with exception of optic chiasm compression or other severe compressive symptoms.",
      grade: "++00 (low quality evidence), strong recommendation",
    },
    {
      action: "Do not start levothyroxine until cortisol deficiency has been excluded or treated",
      why: "Starting thyroid hormone while cortisol deficiency is untreated can trigger an adrenal crisis. If in doubt, cortisol deficiency is treated first.",
      source: "sfe-2018",
      quote: "Thyroxine should never be instigated unless cortisol deficiency is excluded as it can trigger an adrenal crisis.",
    },
    {
      action: "For hypophysitis with confirmed ACTH deficiency, give standard hydrocortisone replacement, usually 15 to 25 mg a day split into two or three doses",
      why: "There is little evidence that pituitary function recovers on its own after immunotherapy stops, so regular replacement tablets are used. ESE recommends the same dose for proven primary adrenal insufficiency.",
      source: "ese-2022",
      quote: "Most patients are managed well on a daily dose of 15–25 mg hydrocortisone split into two or three doses",
      grade: "good clinical practice",
    },
    {
      action: "For proven primary adrenal insufficiency, add standard mineralocorticoid replacement (fludrocortisone); do not give it for pituitary causes",
      why: "Destruction of the adrenal cortex also causes a lack of aldosterone, which fludrocortisone replaces. ESE says mineralocorticoids should not be given in secondary (pituitary) adrenal insufficiency.",
      source: "ese-2022",
      quote: "We recommend standard mineralocorticoid replacement for patients with proven primary adrenal insufficiency (good clinical practice).",
      grade: "good clinical practice",
    },
    {
      action: "Before discharge, give a steroid emergency card, teach the sick day rules and supply a hydrocortisone injection kit",
      why: "ESE says adrenal crises can be avoided or eased by early treatment started by the patient or a relative who has been taught what to do; the card tells other health professionals how to manage a crisis.",
      source: "sfe-2018",
      quote: "Prior to discharge, patients should be provided with a Steroid Emergency Card, education with regards to ‘sick day rules’, and an hydrocortisone emergency injection kit as per Society for Endocrinology guidance",
    },
    {
      action: "Teach the two sick day rules: double the daily oral glucocorticoid dose during an illness with fever that needs bed rest or antibiotics, and give the glucocorticoid by injection during prolonged vomiting or diarrhoea",
      why: "The Society for Endocrinology lists failure to follow these two rules, and stopping long-term steroids suddenly, among the most frequent causes of adrenal crisis. It asks that the person has spare tablets to double the dose for at least 7 days.",
      source: "sfe-adrenal-crisis-2016",
      quote: "Sick Day Rule 1: the need to double daily oral glucocorticoid dose during illness with fever that requires bed rest and/or antibiotics",
    },
    {
      action: "Do not stop glucocorticoids abruptly, whether high-dose treatment or replacement, without a formal test of pituitary and adrenal function, even if immunotherapy has stopped",
      why: "A dose equivalent to prednisolone 7.5 mg or more for over 3 weeks can itself cause secondary adrenal insufficiency, and ESE found no evidence that adrenal function recovers after immunotherapy stops. It makes the same recommendation for replacement in primary adrenal insufficiency.",
      source: "ese-2022",
      quote: "We recommend against stopping high-dose glucocorticoid replacement abruptly without formal assessment of pituitary–adrenal function, even if ICI treatment was stopped (good clinical practice).",
      grade: "good clinical practice",
    },
    {
      action: "Do not treat a controlled hormone deficiency as a bar to starting or continuing the checkpoint inhibitor; discuss interruption if hypophysitis compresses the optic chiasm or optic nerve",
      why: "ESE judges that the benefit of immunotherapy outweighs the risk from these hormone problems in almost all instances, and suggests a discussion between oncology and endocrinology about interruption for optic compression or severe thyroid eye disease (++00). The Society for Endocrinology says immunotherapy can be continued once the patient is clinically stable on replacement.",
      source: "ese-2022",
      quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy (++00).",
      grade: "++00 (low quality evidence), strong recommendation",
    },
  ],
  bestInClass: {
    statement: "The endocrine guidance agrees on the emergency: assume cortisol deficiency in any severely unwell patient on a checkpoint inhibitor and treat with glucocorticoids until the cortisol result is back (Society for Endocrinology 2018), taking blood first and giving hydrocortisone 100 mg then 50 mg 6-hourly with fluids (ESE 2022, good clinical practice; the same doses are in the Society for Endocrinology 2016 adrenal crisis guidance, ungraded, which also allows 200 mg over 24 hours by infusion). Both hold that high-dose steroids are not the treatment for the hormone loss: ESE recommends against them for hypophysitis except for optic chiasm compression or other severe compressive symptoms (++00), and the Society for Endocrinology says methylprednisolone may help pressure effects. ESE recommends that a controlled endocrinopathy is not a contraindication to immunotherapy (++00) and suggests discussing interruption for hypophysitis with optic compression (++00); the ASCO 2021 abstract says that, in general, endocrinopathies controlled by hormone replacement are the exception to permanent discontinuation after grade 4. SITC 2021, an oncology guideline, says immunotherapy should generally be continued as soon as patients with endocrine toxicities are stable, but for symptoms of acute hypophysitis it says immunotherapy should be interrupted and corticosteroids given (LE: 4, no dose stated), and it replaces with hydrocortisone 10 to 12 mg/m2 a day. Maintenance doses differ in form but not much in total: ESE 15 to 25 mg a day in two or three doses, Society for Endocrinology 10, 5 and 5 mg or prednisolone 3 to 5 mg once a day.",
    sources: ["sfe-2018", "ese-2022", "sfe-adrenal-crisis-2016", "sitc-2021", "asco-2021"],
  },
  variants: [
    {
      name: "Interrupt immunotherapy and give corticosteroids for acute hypophysitis (SITC 2021)",
      differs: "Says immunotherapy should be interrupted and corticosteroids given when symptoms of acute hypophysitis appear (no dose stated), with hydrocortisone replacement at 10 to 12 mg/m2/day, a medical alert device and stress-dose education; withholds immunotherapy temporarily and starts steroid replacement for adrenal insufficiency of any grade. Its general endocrine rule is that immunotherapy should generally be continued as soon as patients are stable, often without interruption.",
      evidence: "LE: 4 for interruption and corticosteroids; the rest without a level (expert consensus).",
      sources: ["sitc-2021"],
    },
    {
      name: "Fixed three-dose replacement (Society for Endocrinology 2018)",
      differs: "Says tapering of treatment-dose glucocorticoids can start after clinical recovery (usually 48 to 72 hours), aiming for hydrocortisone 10 mg in the morning, 5 mg at lunchtime and 5 mg in the early evening, or prednisolone 3 to 5 mg once a day; fludrocortisone may be needed in primary adrenal insufficiency once the daily dose is below 50 mg of hydrocortisone; warns that a short Synacthen test may be falsely reassuring within 6 to 12 weeks of hypophysitis.",
      evidence: "Expert consensus endorsed by the Society for Endocrinology Clinical Committee.",
      sources: ["sfe-2018"],
    },
  ],
  grades: [
    { claim: "Hydrocortisone 100 mg intravenously or intramuscularly then 50 mg every 6 hours with fluids for suspected adrenal crisis", grade: "good clinical practice", source: "ese-2022" },
    { claim: "No high-dose glucocorticoids for hypophysitis except compression", grade: "++00 (low), strong", source: "ese-2022" },
    { claim: "A controlled endocrinopathy is not a contraindication to checkpoint inhibitors", grade: "++00 (low), strong", source: "ese-2022" },
    { claim: "Discuss possible interruption of immunotherapy for hypophysitis with compression of the optic chiasm or optic nerve, or severe thyroid eye disease; no need to interrupt for other endocrine abnormalities", grade: "++00 (low), weak (suggest)", source: "ese-2022" },
    { claim: "Standard mineralocorticoid replacement for proven primary adrenal insufficiency", grade: "good clinical practice", source: "ese-2022" },
    { claim: "Sick day rules training for ACTH and vasopressin deficiency", grade: "good clinical practice", source: "ese-2022", quote: "We recommend that patients with pituitary hormone deficiencies, more particularly ACTH and vasopressin deficiencies, are provided with appropriate and regular training on managing their glucocorticoid and/or desmopressin treatment during period of illness (‘Sick Day Rules’) (good clinical practice)." },
    { claim: "Interrupt immunotherapy and give corticosteroids for symptoms of acute hypophysitis", grade: "LE: 4", source: "sitc-2021", quote: "If symptoms of acute hypophysitis are observed, immunotherapy should be interrupted and corticosteroids administered" },
    { claim: "In general, permanent discontinuation is recommended after grade 4 toxicity, except for endocrinopathies controlled by hormone replacement", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [{ ...SFE_2018, accessed: "2026-11-17" }, { ...ESE_2022, accessed: "2026-11-17" }, SFE_ADRENAL_CRISIS_2016, { ...SITC_ICI_2021, accessed: "2026-11-17" }, { ...ASCO_ICI_2021, accessed: "2026-11-17" }, ESMO_ICI_2022],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The NHS England National Patient Safety Alert on the steroid emergency card was not read for this page. The Society for Endocrinology's 2016 adrenal crisis guidance was read on 17 November 2026 and is now cited for the sick day rules; the card is cited through the 2016 and 2018 guidance.",
    "The three algorithms in the Society for Endocrinology 2018 guidance are published as images and could not be read as text on 17 November 2026. They hold the guidance's own emergency doses and the exceptions to the 450 nmol/L cut-off, so neither is stated here from that source; the emergency doses on this page come from ESE 2022 and the 2016 adrenal crisis guidance.",
    "No trial read here tests whether high-dose steroids change pituitary recovery; ESE cites one study in which patients given high doses had shorter survival, and says it is unclear whether the steroids or a worse prognosis explain it.",
    "Guidelines differ on how often to test for cortisol deficiency during treatment. ESE 2022 suggests a morning (08:00 to 09:00) cortisol with TSH, free T4, glucose and electrolytes at baseline, repeated every 4 to 6 weeks, preferably before each cycle; it notes that the other guidelines it tabulates vary. The SITC 2021 recommendations read here set an interval for thyroid tests but not for cortisol.",
    "The sources give different rates for hypophysitis (ESE up to 17% overall; SITC 1% to 11% by drug class); this page gives both and does not reconcile them.",
    "Europe PMC title searches on 17 November 2026 found no newer edition of the ESE 2022 guideline or of the Society for Endocrinology 2018 guidance; the societies' own websites were not searched.",
  ],
  drugs: ["ipilimumab", "nivolumab", "pembrolizumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "hydrocortisone", "levothyroxine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-pneumonitis", "hyponatraemia-siadh"],
  tags: ["protocol", "irae", "acute-oncology", "endocrine"],
});
