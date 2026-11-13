import { protocol } from "./helpers";

/*
 * Preparing an adult for an FDG PET-CT scan for cancer: fasting, blood glucose, diabetes medicines, rest and warmth.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Boellaard et al., FDG PET/CT: EANM procedure guidelines for tumour imaging, version 2.0 (Eur J Nucl Med Mol Imaging
 *   2015): full text, Europe PMC XML (PMC4315529). A Europe PMC search for a newer EANM or SNMMI adult oncology FDG
 *   guideline found none; the newer joint guidelines are for brain imaging (2025), infection and inflammation (2025),
 *   radiotherapy planning in uterine cancers (2021) and children (2021), which are outside this protocol.
 * - Joint Australian Diabetes Society and Australian and New Zealand Society of Nuclear Medicine procedure guideline
 *   for FDG PET/CT in people with diabetes, as summarised in Internal Medicine Journal 2026: abstract only, Europe PMC.
 *   The guideline itself was not read; no step rests on it.
 *
 * The EANM guideline does not grade its recommendations. Every DOI was resolved through Europe PMC and its title
 * checked. Quotes are copied from the raw text with line breaks joined.
 */
export const fdgPetCtPreparation = protocol({
  id: "fdg-pet-ct-preparation",
  name: "FDG PET-CT scan preparation: fasting, blood glucose and diabetes",
  aka: ["PET scan preparation", "PET-CT prep", "fasting before PET scan", "blood sugar before PET", "diabetes and PET scan", "FDG PET fasting", "insulin before PET scan"],
  domain: "screening-diagnostics",
  tldr: "A PET-CT scan uses a sugar-like tracer, so food, sugar, exercise and cold can all blur the pictures. Do not eat for at least 4 hours before (plain water is fine and helps), take your usual medicines, avoid hard exercise the day before, and keep warm. If you have diabetes, the unit will give you a plan for your tablets or insulin and will check your blood sugar when you arrive.",
  simple: "Before a PET scan: no food for 4 hours, only plain water, no coffee or sweets, no hard exercise, keep warm. Take your normal medicines. If you have diabetes, ask the scan team for a plan for your insulin or tablets.",
  summary: "EANM 2015 (version 2.0, ungraded): nothing but plain water for at least 4 hours before the FDG injection; medication as prescribed; about 1 litre of water in the 2 hours before; no coffee, caffeinated or 'sugar-free' drinks; glucose-containing intravenous fluids and parenteral nutrition stopped at least 4 hours before; no strenuous exercise for at least 6 hours and preferably 24; warmth from 30 to 60 minutes before injection to limit brown fat uptake; seated or lying and silent during the uptake phase, especially in head and neck cancer; void before imaging. Blood glucose must be measured before FDG; in clinical studies scanning proceeds below 11 mmol/L (about 200 mg/dL) and is rescheduled at or above it, though hyperglycaemia in brittle diabetes is not an absolute contraindication. Insulin to lower glucose is given only if more than 4 hours will pass before FDG (rapid-acting, subcutaneous). Type 2 diabetes on tablets: late morning slot, tablets continued; insulin-treated diabetes: late morning after normal breakfast and insulin with FDG no sooner than 4 hours after rapid-acting insulin, or early morning; insulin pumps off for at least 4 hours. Uptake time 60 minutes (55 to 75), kept within 10 minutes on repeat scans for response assessment. Pregnancy needs a clinical decision; breastfeeding need not stop, with close contact limited for 12 hours. An Australian joint diabetes and nuclear medicine guideline (2026) gives diabetes-specific protocols; it was read as a summary abstract only.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "radiographer", "nurse", "doctor"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults having FDG PET-CT for cancer diagnosis, staging or response assessment, including people with diabetes. Children follow the SNMMI/EANM paediatric oncology guideline (2021), which was not read here. Brain imaging, infection and inflammation, and other tracers (PSMA, DOTATATE, FES) have their own preparation and are not covered.",
  trigger: "An FDG PET-CT scan is booked.",
  steps: [
    {
      action: "When booking, ask about diabetes, claustrophobia and possible pregnancy or breastfeeding",
      why: "Each changes how the scan is prepared or timed, and finding out early avoids a wasted visit.",
      source: "eanm-2015",
      quote: "A specific inquiry about claustrophobia at the time the patient is scheduled for the study may decrease the number of nondiagnostic studies and cancellations, and allow premedication planning.",
      grade: "ungraded",
    },
    {
      action: "Eat or drink nothing but plain water for at least 4 hours before the tracer injection; take usual medicines",
      why: "Food raises blood sugar and insulin, which pull the tracer into muscle and away from the cancer.",
      source: "eanm-2015",
      quote: "Nondiabetic patients should not consume any food, simple carbohydrates or liquids other than plain (unflavoured) water for at least 4 h prior to the start of the FDG PET/CT study (i.e. with respect to the time of injection of FDG).",
      grade: "ungraded",
    },
    {
      action: "Drink plenty of plain water beforehand, for example about a litre in the 2 hours before the injection, and avoid coffee and sugar-free drinks",
      why: "Water dilutes the tracer in the urine, giving clearer pictures and a lower radiation dose to the bladder.",
      source: "eanm-2015",
      quote: "Adequate prehydration is important to ensure a sufficiently low concentration of FDG in the urine (fewer artefacts) and for radiation safety reasons.",
      grade: "ungraded",
    },
    {
      action: "Stop glucose-containing drips and parenteral nutrition at least 4 hours before the injection",
      why: "Glucose in a drip raises blood sugar just as food does.",
      source: "eanm-2015",
      quote: "Parenteral nutrition and intravenous fluids containing glucose should be discontinued at least 4 h before the time of FDG injection.",
      grade: "ungraded",
    },
    {
      action: "Avoid strenuous exercise for at least 6 hours before the scan, and preferably for 24 hours",
      why: "Working muscles take up the tracer and can hide or mimic disease.",
      source: "eanm-2015",
      quote: "Patients must avoid strenuous exercise for at least 6 h before the FDG PET/CT study, and preferably for 24 h.",
      grade: "ungraded",
    },
    {
      action: "Check blood glucose on arrival, before the tracer is given",
      why: "High sugar competes with the tracer and lowers the quality of the scan; low sugar is unsafe.",
      source: "eanm-2015",
      quote: "Blood glucose level must be measured prior to administering FDG.",
      grade: "ungraded",
    },
    {
      action: "Scan if plasma glucose is below 11 mmol/L; at or above it, reschedule, unless the scan is needed despite poorly controlled diabetes, and record the value",
      why: "Very high sugar makes the scan less accurate, but an important scan should not be refused just for that.",
      source: "eanm-2015",
      quote: "If the plasma glucose level is higher than or equal to 11 mmol/L (about 200 mg/dL), the FDG PET/CT study should be rescheduled or the patient excluded depending on the patient’s circumstances and the trial being conducted.",
      grade: "ungraded",
    },
    {
      action: "Do not give insulin to bring glucose down unless more than 4 hours will pass before the tracer injection, and then use rapid-acting insulin under the skin",
      why: "Insulin pushes the tracer into muscle, which spoils the scan if given too close to it.",
      source: "eanm-2015",
      quote: "Insulin should not be given to reduce glucose levels (this leads to greater muscle uptake of FDG) unless the interval between administration of insulin and administration of FDG is more than 4 h.",
      grade: "ungraded",
    },
    {
      action: "For people on insulin, plan the slot with them: late morning after normal breakfast and insulin with the tracer at least 4 hours after rapid-acting insulin, or early morning; switch insulin pumps off for at least 4 hours",
      why: "Timing the scan around insulin keeps sugar steady without leaving insulin active at the injection.",
      source: "eanm-2015",
      quote: "FDG should be injected no sooner than 4 h after subcutaneous injection of rapid-acting insulin or 6 h after subcutaneous injection of short-acting insulin.",
      grade: "ungraded",
    },
    {
      action: "For people on tablets for type 2 diabetes, book late morning and continue the tablets; stop metformin only if intravenous contrast will be given (see the contrast protocol)",
      why: "Tablets do not interfere with the scan in the way insulin does.",
      source: "eanm-2015",
      quote: "Patients continue to take oral medication to control their blood sugar.",
      grade: "ungraded",
    },
    {
      action: "Keep the person warm from 30 to 60 minutes before the injection until the scan ends, and have them sit or lie quietly without talking during the uptake time",
      why: "Cold switches on brown fat and talking or chewing works muscles, both of which take up the tracer.",
      source: "eanm-2015",
      quote: "The patient should be kept warm starting 30 – 60 min before the injection of FDG and continuing throughout the subsequent uptake period and examination to minimise FDG accumulation in brown fat (especially relevant in winter or if the room is air-conditioned).",
      grade: "ungraded",
    },
    {
      action: "Scan about 60 minutes after the injection (55 to 75), and keep the same uptake time, within 10 minutes, on repeat scans that compare response",
      why: "Tracer uptake keeps rising with time, so comparing scans fairly needs the same wait each time.",
      source: "eanm-2015",
      quote: "When repeating an FDG PET/CT study in the same patient, especially in the context of therapy response assessment, it is essential to apply the same uptake interval to within 10 min",
      grade: "ungraded",
    },
    {
      action: "If breastfeeding, feed just before the injection and limit close contact for 12 hours; expressed milk can be given by bottle",
      why: "Little tracer passes into milk, but the mother's body gives off radiation for some hours.",
      source: "eanm-2015",
      quote: "The ICRP does not recommend interruption of breastfeeding after FDG administration since little FDG is excreted in the milk",
      grade: "ungraded",
    },
  ],
  bestInClass: {
    statement: "EANM procedure guideline version 2.0 (2015), the current European adult oncology FDG guideline: at least 4 hours' fast with plain water encouraged, no strenuous exercise for at least 6 hours, warmth and quiet rest during uptake, blood glucose measured before injection with scanning below 11 mmol/L, no insulin within 4 hours of FDG, diabetes-specific timing of tablets, insulin and pumps, and a standard 60-minute uptake kept consistent across response scans. The guideline is ungraded consensus; no newer adult oncology FDG guideline from EANM or SNMMI was found.",
    sources: ["eanm-2015"],
  },
  variants: [
    {
      name: "Diabetes-specific preparation protocols (Australia and New Zealand)",
      differs: "A joint guideline of the Australian Diabetes Society and the Australian and New Zealand Society of Nuclear Medicine sets preparation by diabetes type, covering fasting, oral glucose-lowering medicines, insulin regimens and insulin pumps.",
      evidence: "Described as developed from a literature review and refined by a multidisciplinary expert panel. Only the summary abstract was read, so its specific instructions (for example on SGLT2 inhibitors or GLP-1 receptor agonists) are not stated here.",
      sources: ["ads-anzsnm-2026"],
    },
  ],
  grades: [
    { claim: "Scan can proceed when plasma glucose is below 11 mmol/L (clinical studies)", grade: "ungraded", source: "eanm-2015", quote: "If the plasma glucose level is lower than 11 mmol/L (about 200 mg/dL), the FDG PET/CT study can be performed." },
    { claim: "Hyperglycaemia in brittle or poorly controlled diabetes is not an absolute contraindication", grade: "ungraded", source: "eanm-2015", quote: "Therefore we recommend the same advice and suggest recording the blood glucose level and any other information that could be relevant for interpretation of the examination." },
    { claim: "Standard uptake time of 60 minutes", grade: "ungraded", source: "eanm-2015", quote: "Note that consistency of SUV measurements (in-house and when compared to the literature) depends on strict observance of the uptake time, and therefore a 60 min interval is recommended with an acceptable range of 55 – 75 min" },
  ],
  sources: [
    {
      key: "eanm-2015",
      label: "FDG PET/CT: EANM procedure guidelines for tumour imaging: version 2.0",
      publisher: "European Association of Nuclear Medicine (Boellaard et al., European Journal of Nuclear Medicine and Molecular Imaging)",
      year: 2015,
      url: "https://doi.org/10.1007/s00259-014-2961-x",
      doi: "10.1007/s00259-014-2961-x",
      gradingScheme: "Procedure guideline; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ads-anzsnm-2026",
      label: "Joint Australian Diabetes Society/Australian and New Zealand Society of Nuclear Medicine procedure guideline for FDG PET/CT imaging in patients with type 1 and type 2 diabetes (summary and commentary)",
      publisher: "Internal Medicine Journal",
      year: 2026,
      url: "https://doi.org/10.1111/imj.70344",
      doi: "10.1111/imj.70344",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["fdg-pet", "pet-ct"],
  related: [],
  upgrades: ["idea-pu-sglt2-glp1-plan-before-pet"],
  gaps: [
    "The EANM guideline dates from 2015 and predates SGLT2 inhibitors and GLP-1 receptor agonists in wide use; it does not say how to handle them before FDG PET. The Australian and New Zealand diabetes guideline may, but only its summary abstract was read.",
    "None of the recommendations read is graded; they are expert consensus.",
    "The SNMMI/EANM paediatric oncology FDG guideline (2021) was not read, so preparation for children is not covered.",
    "Sedation for claustrophobia and drugs to reduce brown fat uptake (diazepam, propranolol) are mentioned by EANM with conflicting results and are not recommended routinely.",
  ],
});
