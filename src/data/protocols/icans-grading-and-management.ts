import { protocol } from "./helpers";
import { ASCO_CART_2021, ASTCT_2019, ASTCT_2026, CELL_GAPS, EBMT_2019, EBMT_2022, FDA_REMS_2025, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Immune effector cell-associated neurotoxicity syndrome (ICANS) after CAR T-cell and other immune effector cell
 * therapy: the ICE score, ASTCT grading, steroids, seizures and cerebral oedema.
 *
 * What was read, and how: see ./cell-therapy-sources.ts. SITC 2020 (full text, neurotoxicity sections and panel
 * recommendations), ASTCT 2019 (full text of the author manuscript, ICANS definition, Tables 5 to 8), EBMT/JACIE 2019
 * (full text), ASTCT 2026, EBMT/JACIE/EHA 2022 and ASCO 2021 (abstracts). Quotes checked by script.
 */
export const icansGradingAndManagement = protocol({
  id: "icans-grading-and-management",
  name: "ICANS after CAR T-cell therapy: ICE score, ASTCT grading, steroids and seizure management",
  aka: ["ICANS management", "immune effector cell-associated neurotoxicity syndrome", "ICE score", "CAR-T neurotoxicity", "CAPD score for children"],
  domain: "cell-therapy-toxicity",
  tldr: "In the weeks after CAR T-cell therapy, some people become confused, struggle to find words or write, become very sleepy, or rarely have seizures. This is ICANS. Nurses check a short test of orientation, naming, writing and counting (the ICE score). Steroids such as dexamethasone treat it, and most people recover. A carer who notices confusion or odd speech should call the centre at once.",
  simple: "CAR T-cell therapy can sometimes cause confusion or trouble speaking. Nurses do a quick word and writing test every day to catch it early. Steroids usually help. Tell the team at once if the person seems muddled.",
  summary: "ICANS is graded by ASTCT 2019 with the 10-point ICE score (orientation 4, naming 3, following commands 1, writing 1, attention 1): 7 to 9 is grade 1, 3 to 6 grade 2, 0 to 2 grade 3, and 0 because the patient cannot be roused grade 4. The overall grade is the worst of the ICE score, level of consciousness, seizures, motor weakness and raised intracranial pressure or cerebral oedema. Children under 12 are assessed with the Cornell Assessment of Pediatric Delirium (CAPD), where 9 or more counts as grade 3. Headache alone is not a marker; expressive aphasia is the most specific early sign.\n\nSITC 2020: baseline ICE (or CAPD) before infusion; ICE twice daily in the first week after axicabtagene ciloleucel. Work-up with CRP, blood count, metabolic panel, fibrinogen and PT/INR, and consider head CT, EEG and MRI, without delaying treatment. Steroids for grade 3 or 4 (LE: 4) and for grade 2 after CD28-costimulated products such as axicabtagene ciloleucel and brexucabtagene autoleucel (LE: 3); consider them for grade 2 after 4-1BB products such as tisagenlecleucel. Give at least 2 doses and taper fast on improvement (LE: 3). With low-grade CRS and ICANS together, treat the ICANS first with steroids, since tocilizumab may worsen neurotoxicity (LE: 5). Levetiracetam for seizures (LE: 4); prophylaxis only for high-risk patients (LE: 4), and EBMT/JACIE 2019 does not recommend it routinely. Suspected cerebral oedema goes to intensive care at once. Dexamethasone 0.5 mg/kg, at most 10 mg a dose, and methylprednisolone 2 mg/kg/day are the commonly used steroids (SITC).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "intensive-care", "outpatient-clinic", "home"],
  },
  population: "Adults and children treated with CAR T-cell therapy or another immune effector cell therapy (ASTCT applies the definition to any therapy that engages T cells, including bispecific antibodies). Children under 12 are graded with the CAPD rather than the ICE score.",
  trigger: "Any change in speech, writing, attention, alertness or behaviour, a tremor, a seizure or a falling ICE score after immune effector cell infusion.",
  steps: [
    {
      action: "Record a baseline ICE score (CAPD in children under 12) before infusion",
      why: "The score is only meaningful against the person's own starting point.",
      source: "sitc-iec-2020",
      quote: "All patients should receive baseline neurological evaluations, including ICE scores (for adults) or CAPD scores (for children<12 years) prior to CAR T cell therapy",
      grade: "LE: 4",
    },
    {
      action: "Score ICE regularly after infusion, at least twice daily in the first week after axicabtagene ciloleucel",
      why: "Neurotoxicity can start subtly and worsen within hours; frequent checks catch it early.",
      source: "sitc-iec-2020",
      quote: "Patients treated with axicabtagene ciloleucel should be assessed for ICANS twice daily during the first week after infusion.",
      grade: "LE: 3",
    },
    {
      action: "Grade ICANS with the ASTCT scale, using the ICE score and the worst of consciousness, seizures, motor findings and signs of raised pressure",
      why: "The grade decides treatment, and the ICE score alone can miss seizures or brain swelling.",
      source: "astct-2019",
      quote: "Score 10: No impairment Score 7–9: Grade 1 ICANS Score 3–6: Grade 2 ICANS Score 0–2: Grade 3 ICANS Score 0 due to patient unarousable and unable to perform ICE assessment: Grade 4 ICANS",
    },
    {
      action: "In children under 12, use the Cornell Assessment of Pediatric Delirium; a score of 9 or more counts as grade 3",
      why: "Young children cannot do the ICE tasks.",
      source: "astct-2019",
      quote: "A CAPD score of ≥9 is suggestive of delirium and should be considered as grade 3 ICANS.",
    },
    {
      action: "Watch especially for word-finding difficulty; do not treat headache alone as ICANS",
      why: "Expressive aphasia is the most specific early sign, while headache is common for other reasons.",
      source: "astct-2019",
      quote: "Thus, headache alone is not a useful marker of ICANS. Expressive aphasia, on the other hand, appears to be a very specific symptom of ICANS.",
    },
    {
      action: "Work up with CRP, full blood count, metabolic panel, fibrinogen and PT/INR, consider a head CT, and consider EEG and brain MRI",
      why: "These look for bleeding, seizures, swelling and other causes of confusion.",
      source: "sitc-iec-2020",
      quote: "For patients who develop ICANS, the work-up should include CRP, CBC, CMP, fibrinogen, prothrombin time test, and international normalized ratio (PT/INR). A head CT should also be considered.",
      grade: "LE: 4",
    },
    {
      action: "Do not delay treatment while waiting for imaging",
      why: "Mental status changes define ICANS; scans may be normal early on.",
      source: "sitc-iec-2020",
      quote: "Brain CT or MRI may be used to evaluate cerebral edema in cases of grade 3 ICANS in adults, but the initiation of ICANS management should not be delayed for confirmation of neurological symptoms with imaging findings",
      grade: "LE: 4",
    },
    {
      action: "Give corticosteroids for grade 3 or 4 ICANS, and for grade 2 after CD28-costimulated products; consider them for grade 2 after 4-1BB products",
      why: "Steroids shorten and soften neurotoxicity; products with CD28 domains cause more of it.",
      source: "sitc-iec-2020",
      quote: "Steroids are recommended for grade 3 or grade 4 ICANS",
      grade: "LE: 4 (grade 3 to 4); LE: 3 (grade 2 after CD28 products)",
    },
    {
      action: "When ICANS occurs with low-grade CRS, treat the ICANS first with steroids rather than tocilizumab",
      why: "Tocilizumab does not cross into the brain well and may make neurotoxicity worse.",
      source: "sitc-iec-2020",
      quote: "Because of the possibility that tocilizumab may worsen neurotoxicity, the management of neurotoxicity may take precedence over the management of low-grade CRS",
      grade: "LE: 5",
    },
    {
      action: "Give at least two doses of steroid, then taper quickly once there is improvement",
      why: "A short course limits the effect of steroids on the CAR T cells.",
      source: "sitc-iec-2020",
      quote: "If steroids are used in the management of ICANS, at least 2 doses should be given and a fast taper should be used once there is improvement",
      grade: "LE: 3",
    },
    {
      action: "Treat seizures with levetiracetam; give it as prophylaxis only to patients at high risk of neurotoxicity",
      why: "There is not enough evidence to give anti-seizure medicine to everyone.",
      source: "sitc-iec-2020",
      quote: "To manage seizures in patients treated with CAR T cell therapies, levetiracetam is recommended",
      grade: "LE: 4",
    },
    {
      action: "If cerebral oedema is suspected, move the patient to intensive care immediately for imaging and treatment of raised intracranial pressure",
      why: "Brain swelling after CAR T cells is rare but can be fatal within hours.",
      source: "sitc-iec-2020",
      quote: "If cerebral edema is suspected based on clinical signs and symptoms, patients should be immediately referred to intensive care where rapid imaging and management of intracranial hypertension should be performed",
      grade: "LE: 4",
    },
    {
      action: "Advise patients not to drive until any neurological symptoms have resolved and for the period their product label or centre sets (8 weeks in EBMT/JACIE 2019, two weeks on US labels since 2025)",
      why: "Neurotoxicity can come and go after discharge.",
      source: "ebmt-2019",
      quote: "Patients are advised not to drive for 8 weeks after the infusion and only after resolution of any neurological symptoms.",
    },
  ],
  bestInClass: {
    statement: "Grade with the ASTCT 2019 ICE score and multi-domain scale in adults and the CAPD in children under 12; ASTCT updated its grading in 2026 and the changes could not be read. For treatment, SITC 2020 is the most detailed graded guideline read: steroids for grade 3 to 4 (LE: 4) and for grade 2 after CD28-costimulated products (LE: 3), steroids before tocilizumab when ICANS accompanies low-grade CRS (LE: 5), at least two doses with a fast taper (LE: 3), levetiracetam for seizures (LE: 4) and intensive care for suspected cerebral oedema (LE: 4). ASCO 2021 (abstract) agrees that moderate to severe ICANS is managed with corticosteroids and supportive care. On seizure prophylaxis the sources differ: SITC allows levetiracetam prophylaxis for high-risk patients, EBMT/JACIE 2019 does not recommend it routinely except with a history of seizures or CNS disease.",
    sources: ["astct-2019", "astct-2026", "sitc-iec-2020", "asco-cart-2021", "ebmt-2019"],
  },
  variants: [
    {
      name: "No routine seizure prophylaxis (EBMT/JACIE 2019)",
      differs: "Does not recommend anti-epileptic prophylaxis such as levetiracetam routinely, except for patients with a history of seizures or central nervous system disease.",
      evidence: "Expert best practice recommendation, not graded.",
      sources: ["ebmt-2019"],
    },
    {
      name: "Prophylactic levetiracetam for high-risk patients (SITC 2020)",
      differs: "Finds the evidence insufficient for everyone but allows prophylactic levetiracetam for patients judged high risk from their history, disease or product.",
      evidence: "LE: 4.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Two weeks near a healthcare facility and no driving for two weeks (US labels since June 2025)",
      differs: "For BCMA- and CD19-directed autologous CAR T-cell products, the FDA ended the risk-management programme in June 2025 and revised the US labels to monitor for at least two weeks (daily for at least one), to stay near a healthcare facility for at least two weeks and to avoid driving for two weeks, against 4 weeks near the centre and 8 weeks without driving in EBMT/JACIE 2019.",
      evidence: "Regulatory decision based on the stability of adverse event reports and clinical experience; not a trial comparison.",
      sources: ["fda-rems-2025", "ebmt-2019"],
    },
  ],
  grades: [
    { claim: "Baseline ICE or CAPD before CAR T-cell therapy", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "ICANS assessment twice daily in the first week after axicabtagene ciloleucel", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Steroids for grade 2 ICANS after CD28-costimulated products", grade: "LE: 3", source: "sitc-iec-2020", quote: "For patients with grade 2 ICANS after being treated with CD28 costimulated CAR T cell products such as axicabtagene ciloleucel and brexucabtagen autoleucel, steroids should be used to mitigate the duration and severity of ICANS" },
    { claim: "Steroids for grade 3 or 4 ICANS", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Neurotoxicity takes precedence over low-grade CRS", grade: "LE: 5", source: "sitc-iec-2020" },
    { claim: "Prophylactic levetiracetam may be considered in high-risk patients", grade: "LE: 4", source: "sitc-iec-2020", quote: "However, in patients deemed to be at high-risk of developing neurotoxicity based on history, disease characteristics, or the product being administered, prophylactic levetiracetam may be considered" },
    { claim: "Moderate to severe ICANS managed with corticosteroids and supportive care", grade: "expert consensus", source: "asco-cart-2021", quote: "On the basis of the potential for rapid decline, patients with moderate to severe immune effector cell-associated neurotoxicity syndrome should be managed with corticosteroids and supportive care." },
  ],
  sources: [SITC_IEC_2020, ASTCT_2019, ASTCT_2026, EBMT_2019, EBMT_2022, ASCO_CART_2021, FDA_REMS_2025],
  upgrades: [],
  gaps: [
    ...CELL_GAPS,
    "Anakinra for steroid-refractory ICANS is discussed in the literature but SITC names it as a third-line agent for CRS, not ICANS; no guideline read here grades it for ICANS.",
    "European product information (SmPC) driving and proximity advice was not read for this page; the US position is from the FDA communication, not from the labels themselves.",
    "No randomised trial read here tests steroid dose or timing for ICANS.",
  ],
  drugs: ["dexamethasone", "tocilizumab", "axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel", "levetiracetam"],
  technologies: ["car-t"],
  institutions: ["sitc"],
  terms: ["icans", "lymphoma-tx-crs-icans"],
  related: ["crs-grading-and-management"],
  tags: ["protocol", "cell-therapy", "car-t", "acute-oncology"],
});
