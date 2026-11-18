import { protocol } from "./helpers";

/*
 * Preparing an adult for an FDG PET-CT scan for cancer: fasting, blood glucose, diabetes medicines, rest and warmth.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * and each claim, figure and quote re-read against it; quotes were checked by script (whitespace and tags only).
 * - Boellaard et al., FDG PET/CT: EANM procedure guidelines for tumour imaging, version 2.0 (Eur J Nucl Med Mol Imaging
 *   2015;42:328, published online December 2014): full text, Europe PMC XML (PMC4315529). A Europe PMC title search on
 *   17 November 2026 found no version 3.0 and no newer general adult oncology FDG procedure guideline from EANM or
 *   SNMMI. Newer joint documents are disease or setting specific: brain (2025), infection and inflammation (2025),
 *   radiotherapy planning in cervical cancer (2021), children (2021), immunotherapy (2022) and breast cancer (2024).
 * - Joint EANM/SNMMI/ANZSNM guideline on FDG PET/CT during immunomodulatory treatment, version 1.0 (2022): full text,
 *   Europe PMC XML (PMC9165250). Added in the second pass because it prints a different fasting time.
 * - Joint EANM-SNMMI guideline on FDG PET/CT in no special type breast cancer (2024): full text, Europe PMC XML
 *   (PMC11224102). Added in the second pass for its preparation paragraph and its intervals after treatment.
 * - Delbeke et al., SNM procedure guideline for tumor imaging with 18F-FDG PET/CT 1.0 (J Nucl Med 2006;47:885): full
 *   text, the journal's open PDF read with pdftotext. Added in the second pass as the United States figures. It has no
 *   DOI in Europe PMC (PMID 16644760).
 * - Joint Australian Diabetes Society and Australian and New Zealand Society of Nuclear Medicine procedure guideline
 *   for FDG PET/CT in people with diabetes, as summarised in Internal Medicine Journal 2026: abstract only, Europe PMC
 *   (the full text is subscription only). No step rests on it.
 *
 * The EANM guideline does not grade its recommendations. DOIs were resolved through Crossref and Europe PMC and the
 * titles checked. Quotes are copied from the raw text with line breaks joined; no quote is taken from a sentence
 * where the superscript in 18F mangles.
 */
export const fdgPetCtPreparation = protocol({
  id: "fdg-pet-ct-preparation",
  name: "FDG PET-CT scan preparation: fasting, blood glucose and diabetes",
  aka: ["PET scan preparation", "PET-CT prep", "fasting before PET scan", "blood sugar before PET", "diabetes and PET scan", "FDG PET fasting", "insulin before PET scan"],
  domain: "screening-diagnostics",
  tldr: "A PET-CT scan uses a sugar-like tracer, so food, sugar, exercise and cold can all affect the pictures. European guidance: nothing but plain water for at least 4 hours before the injection (water helps), usual medicines, no hard exercise for at least 6 hours and ideally 24, and keep warm. If you have diabetes, the scan team plans your tablets or insulin with you and checks your blood sugar first.",
  simple: "Before a PET scan: no food for at least 4 hours, only plain water, no coffee or sweets, no hard exercise, keep warm. Take your normal medicines. Your own scan unit's letter may give a longer fast; follow it. If you have diabetes, ask the scan team for a plan for your insulin or tablets.",
  summary: "EANM 2015 (version 2.0, ungraded): people without diabetes take nothing but plain water for at least 4 hours before the FDG injection; medication as prescribed; for example 1 litre of water in the 2 hours before; coffee, caffeinated and 'sugar-free' drinks not recommended; glucose-containing intravenous fluids and parenteral nutrition stopped at least 4 hours before; no strenuous exercise for at least 6 hours and preferably 24; warmth from 30 to 60 minutes before injection to limit brown fat uptake; seated or lying and silent during the uptake phase, particularly in head and neck cancer; void before imaging. Blood glucose must be measured before FDG, and checking on arrival that it is neither below 4 mmol/L (about 70 mg/dL) nor too high is good practice. For clinical studies the scan can be performed below 11 mmol/L (about 200 mg/dL) and should be rescheduled at or above it, though hyperglycaemia in unstable or poorly controlled diabetes should not be an absolute contraindication; research studies use upper limits between 7 and 8.3 mmol/L (126 and 150 mg/dL). Insulin to lower glucose can be considered but is not given unless more than 4 hours will pass before FDG (rapid-acting, preferably subcutaneous). Type 2 diabetes on tablets: preferably late morning, fasting rules as above, tablets continued, and metformin stopped at the procedure and withheld for 48 hours afterwards if intravenous contrast is given. Insulin-treated diabetes: late morning or midday after a normal breakfast and insulin, with FDG no sooner than 4 hours after rapid-acting or 6 hours after short-acting subcutaneous insulin and not on the same day after intermediate or long-acting insulin; or early morning; insulin pumps off for at least 4 hours. Uptake time 60 minutes (acceptable range 55 to 75), kept within 10 minutes on repeat scans for response assessment. After treatment EANM gives at least 10 days after the last chemotherapy as generally adequate, notes that growth factor effects on marrow uptake generally last more than 2 weeks, calls waiting 2 or 3 months after radiotherapy clinically appropriate, and recommends at least 6 weeks after surgery when the surgical field is the question. Pregnancy needs a clinical decision; breastfeeding need not stop, with contact limited for 12 hours. Other bodies print other figures: the SNM guideline for the United States (2006) says to fast for at least 4 to 6 hours and that most institutions reschedule above 150 to 200 mg/dL; a joint EANM/SNMMI/ANZSNM immunotherapy guideline (2022) says at least 6 hours; the joint EANM-SNMMI breast cancer guideline (2024) says at least 4 hours, glucose below 200 mg/dL and a 60-minute uptake time, give or take 5 minutes. An Australian joint diabetes and nuclear medicine guideline (2026) gives diabetes-specific protocols; it was read as a summary abstract only.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "radiographer", "nurse", "doctor"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults having FDG PET-CT for cancer diagnosis, staging or response assessment, including people with diabetes. Children have a separate SNMMI/EANM paediatric oncology guideline (2021), which was not read here. Brain imaging, infection and inflammation, and other tracers (PSMA, DOTATATE, FES) have their own preparation and are not covered.",
  trigger: "An FDG PET-CT scan is booked.",
  steps: [
    {
      action: "When the scan is requested and booked, ask about diabetes and diabetes medicines, claustrophobia, and possible pregnancy or breastfeeding",
      why: "EANM lists diabetes and current medicines among the details a scan request should carry, and says that asking about claustrophobia at booking may reduce cancelled and non-diagnostic scans.",
      source: "eanm-2015",
      quote: "A specific inquiry about claustrophobia at the time the patient is scheduled for the study may decrease the number of nondiagnostic studies and cancellations, and allow premedication planning.",
      grade: "ungraded",
    },
    {
      action: "Eat or drink nothing but plain water for at least 4 hours before the tracer injection; take medicines as prescribed (people on insulin follow their own plan, below)",
      why: "Fasting keeps blood sugar and insulin low; insulin drives sugar, and the tracer with it, into tissue that is not tumour, such as muscle.",
      source: "eanm-2015",
      quote: "Nondiabetic patients should not consume any food, simple carbohydrates or liquids other than plain (unflavoured) water for at least 4 h prior to the start of the FDG PET/CT study (i.e. with respect to the time of injection of FDG).",
      grade: "ungraded",
    },
    {
      action: "Drink plenty of plain water beforehand, for example a litre in the 2 hours before the injection, and avoid coffee, caffeinated and sugar-free drinks",
      why: "Water dilutes the tracer in the urine, which gives fewer artefacts on the pictures and is better for radiation safety. Coffee and sugar-free drinks may still contain traces of simple carbohydrates.",
      source: "eanm-2015",
      quote: "Adequate prehydration is important to ensure a sufficiently low concentration of FDG in the urine (fewer artefacts) and for radiation safety reasons.",
      grade: "ungraded",
    },
    {
      action: "Stop glucose-containing drips and parenteral nutrition at least 4 hours before the injection",
      why: "The fast applies to glucose given into a vein as well as to food; a drip used for hydration must not contain glucose either.",
      source: "eanm-2015",
      quote: "Parenteral nutrition and intravenous fluids containing glucose should be discontinued at least 4 h before the time of FDG injection.",
      grade: "ungraded",
    },
    {
      action: "Avoid strenuous exercise for at least 6 hours before the scan, and preferably for 24 hours",
      why: "Tracer uptake in muscle can be increased after exercise.",
      source: "eanm-2015",
      quote: "Patients must avoid strenuous exercise for at least 6 h before the FDG PET/CT study, and preferably for 24 h.",
      grade: "ungraded",
    },
    {
      action: "Measure blood glucose before the tracer is given, ideally on arrival",
      why: "EANM requires a measurement before the injection and calls a check on arrival good practice, to make sure the level is neither too low (below 4 mmol/L, about 70 mg/dL) nor too high, which may avoid an unnecessary wait.",
      source: "eanm-2015",
      quote: "Blood glucose level must be measured prior to administering FDG.",
      grade: "ungraded",
    },
    {
      action: "Scan if plasma glucose is below 11 mmol/L (about 200 mg/dL); at or above it, reschedule, unless the scan is indicated despite unstable or poorly controlled diabetes, and record the value",
      why: "This is the EANM limit for clinical scans. EANM adds that high sugar should not be an absolute bar when the scan is indicated in someone with unstable or poorly controlled diabetes, and that the value should be recorded for whoever reads the scan. Research studies use lower limits.",
      source: "eanm-2015",
      quote: "If the plasma glucose level is higher than or equal to 11 mmol/L (about 200 mg/dL), the FDG PET/CT study should be rescheduled or the patient excluded depending on the patient’s circumstances and the trial being conducted.",
      grade: "ungraded",
    },
    {
      action: "Do not give insulin to bring glucose down unless more than 4 hours will pass before the tracer injection; if it is given, use rapid-acting insulin, preferably under the skin",
      why: "Insulin leads to greater uptake of the tracer in muscle. EANM says lowering glucose with insulin can be considered, with the scan postponed accordingly; for people just above the limit, drinking water and walking about with repeat checks is another option.",
      source: "eanm-2015",
      quote: "Insulin should not be given to reduce glucose levels (this leads to greater muscle uptake of FDG) unless the interval between administration of insulin and administration of FDG is more than 4 h.",
      grade: "ungraded",
    },
    {
      action: "For people on insulin, plan the slot with them: late morning or midday after a normal breakfast and insulin, with the tracer at least 4 hours after rapid-acting or 6 hours after short-acting insulin, or early morning before breakfast and insulin; switch insulin pumps off for at least 4 hours before the injection",
      why: "EANM aims for near-normal blood sugar at the scan while leaving a gap after insulin. It does not recommend the injection on the same day after intermediate or long-acting insulin, and for pumps it prefers an early morning slot where possible.",
      source: "eanm-2015",
      quote: "FDG should be injected no sooner than 4 h after subcutaneous injection of rapid-acting insulin or 6 h after subcutaneous injection of short-acting insulin.",
      grade: "ungraded",
    },
    {
      action: "For people on tablets for type 2 diabetes, book late morning where possible, keep the fasting rules and continue the tablets; EANM stops metformin at the scan and for 48 hours afterwards only if intravenous contrast is given (see the contrast protocol for current rules)",
      why: "EANM keeps diabetes tablets going while the fasting rules still apply. It notes that tracer uptake in the bowel may be increased in people taking metformin.",
      source: "eanm-2015",
      quote: "Patients continue to take oral medication to control their blood sugar.",
      grade: "ungraded",
    },
    {
      action: "Keep the person warm from 30 to 60 minutes before the injection until the scan ends, and have them sit or lie without talking during the injection and the uptake time",
      why: "Warmth limits tracer uptake in brown fat, and resting in silence limits uptake in muscles, which matters most in head and neck cancer.",
      source: "eanm-2015",
      quote: "The patient should be kept warm starting 30 – 60 min before the injection of FDG and continuing throughout the subsequent uptake period and examination to minimise FDG accumulation in brown fat (especially relevant in winter or if the room is air-conditioned).",
      grade: "ungraded",
    },
    {
      action: "Scan 60 minutes after the injection (55 to 75 is acceptable), and keep the same uptake time, within 10 minutes, on repeat scans that compare response",
      why: "Uptake measurements are only consistent from scan to scan if the wait after the injection is kept the same.",
      source: "eanm-2015",
      quote: "When repeating an FDG PET/CT study in the same patient, especially in the context of therapy response assessment, it is essential to apply the same uptake interval to within 10 min",
      grade: "ungraded",
    },
    {
      action: "For a scan that measures response, leave at least 10 days after the last chemotherapy or, if that is not possible, scan as close as possible to the next cycle; where the surgical field is the question, wait at least 6 weeks after surgery",
      why: "Recent treatment changes the picture: EANM notes that growth factor injections raise bone marrow uptake for generally more than 2 weeks, that inflammation after radiotherapy can show for 2 to 3 months, and that healing after surgery takes up tracer.",
      source: "eanm-2015",
      quote: "Although there are no conclusive data on the optimum interval between chemotherapy and FDG PET/CT, an interval of at least 10 days between the last treatment and the FDG PET/CT examination is generally considered adequate for measurement of response",
      grade: "ungraded",
    },
    {
      action: "If breastfeeding, feed just before the injection and limit close contact for 12 hours afterwards; expressed milk can be given by bottle during that time",
      why: "Little tracer passes into milk, so breastfeeding need not stop, but the breast takes up tracer and limiting contact lowers the radiation the baby receives from the mother's body.",
      source: "eanm-2015",
      quote: "The ICRP does not recommend interruption of breastfeeding after FDG administration since little FDG is excreted in the milk",
      grade: "ungraded",
    },
  ],
  bestInClass: {
    statement: "EANM procedure guideline version 2.0 (2015) is the most recent general procedure guideline for FDG PET-CT in cancer, and the joint EANM-SNMMI breast cancer guideline (2024) still refers preparation to it: at least 4 hours' fast with plain water encouraged, no strenuous exercise for at least 6 hours, warmth and silent rest during uptake, blood glucose measured before injection with clinical scanning below 11 mmol/L (about 200 mg/dL), no insulin within 4 hours of FDG, diabetes-specific timing of tablets, insulin and pumps, and a 60-minute uptake kept consistent across response scans. Its recommendations are not graded. No version 3.0 and no newer general adult oncology FDG procedure guideline from EANM or SNMMI was found on 17 November 2026; the United States guideline (SNM 2006) and two newer joint guidelines print slightly different figures, set out under variants.",
    sources: ["eanm-2015"],
  },
  variants: [
    {
      name: "United States: SNM procedure guideline 1.0 (2006)",
      differs: "Fast, with no drinks except water, for at least 4 to 6 hours before FDG, and withhold intravenous dextrose and parenteral feeding for 4 to 6 hours. It sets no single glucose limit: it reports that most institutions reschedule if blood glucose is greater than 150 to 200 mg/dL. Insulin can be considered, with FDG delayed by a time that depends on the type and route of insulin; no number of hours is given. Images are obtained at least 45 minutes after injection, and it reports that many facilities start at 60 or 90 minutes. A warm room for 30 to 60 minutes before injection matches EANM.",
      evidence: "A society procedure guideline describing 'a commonly used protocol'; not graded. It dates from 2006 and EANM 2015 says it builds on it.",
      sources: ["snm-2006"],
    },
    {
      name: "Scans during immunotherapy: joint EANM/SNMMI/ANZSNM guideline (2022)",
      differs: "Refers the procedure to the EANM guideline and the SNMMI standard, but in its own short summary says fasting is recommended for at least 6 hours, not 4. Uptake time is the same: 60 minutes, acceptable range 55 to 75.",
      evidence: "A joint practice guideline for people with solid tumours on immunomodulatory treatment. It does not explain the longer fast.",
      sources: ["eanm-snmmi-anzsnm-2022"],
    },
    {
      name: "Breast cancer: joint EANM-SNMMI guideline (2024)",
      differs: "Refers preparation to EANM 2015 and SNM 2006, and restates it as a fast of at least 4 hours, proper hydration, serum glucose below 200 mg/dL, and rest in a quiet, warm room for an uptake time of 60 minutes, give or take 5 minutes (EANM accepts 55 to 75). On timing after treatment its panel suggests at least 10 days, and 15 if possible, after the last dose of chemotherapy or endocrine therapy, and at least 3 months after radiotherapy when looking for recurrence in the treated field (EANM 2015 says 2 or 3 months).",
      evidence: "The guideline describes the interval after systemic therapy as an expert opinion-based recommendation, not yet based on scientific evidence.",
      sources: ["eanm-snmmi-breast-2024"],
    },
    {
      name: "Diabetes-specific preparation protocols (Australia and New Zealand)",
      differs: "A joint guideline of the Australian Diabetes Society and the Australian and New Zealand Society of Nuclear Medicine sets preparation by diabetes type, covering fasting, oral glucose-lowering medicines, insulin regimens and insulin pumps.",
      evidence: "Described as developed from a literature review and refined by a multidisciplinary expert panel. Only the summary abstract was read, so its specific instructions are not stated here.",
      sources: ["ads-anzsnm-2026"],
    },
  ],
  grades: [
    { claim: "Scan can proceed when plasma glucose is below 11 mmol/L (clinical studies)", grade: "ungraded", source: "eanm-2015", quote: "If the plasma glucose level is lower than 11 mmol/L (about 200 mg/dL), the FDG PET/CT study can be performed." },
    { claim: "Hyperglycaemia in unstable or poorly controlled diabetes should not be an absolute contraindication when the scan is indicated", grade: "ungraded", source: "eanm-2015", quote: "hyperglycaemia should not represent an absolute contraindication to the study, as fasting hyperglycaemia does not hamper the clinical value of FDG PET" },
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
      accessed: "2026-11-17",
    },
    {
      key: "snm-2006",
      label: "Procedure guideline for tumor imaging with 18F-FDG PET/CT 1.0",
      publisher: "Society of Nuclear Medicine (Delbeke et al., Journal of Nuclear Medicine 2006;47:885-895)",
      year: 2006,
      url: "https://jnm.snmjournals.org/content/47/5/885",
      gradingScheme: "Procedure guideline; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eanm-snmmi-anzsnm-2022",
      label: "Joint EANM/SNMMI/ANZSNM practice guidelines/procedure standards on recommended use of [18F]FDG PET/CT imaging during immunomodulatory treatments in patients with solid tumors version 1.0",
      publisher: "European Association of Nuclear Medicine, Society of Nuclear Medicine and Molecular Imaging, Australian and New Zealand Society of Nuclear Medicine (European Journal of Nuclear Medicine and Molecular Imaging)",
      year: 2022,
      url: "https://doi.org/10.1007/s00259-022-05780-2",
      doi: "10.1007/s00259-022-05780-2",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eanm-snmmi-breast-2024",
      label: "Joint EANM-SNMMI guideline on the role of 2-[18F]FDG PET/CT in no special type breast cancer",
      publisher: "European Association of Nuclear Medicine and Society of Nuclear Medicine and Molecular Imaging (European Journal of Nuclear Medicine and Molecular Imaging)",
      year: 2024,
      url: "https://doi.org/10.1007/s00259-024-06696-9",
      doi: "10.1007/s00259-024-06696-9",
      gradingScheme: "Levels of evidence and grades of recommendation by NICE criteria for its summary boxes; the preparation paragraph is not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ads-anzsnm-2026",
      label: "Joint Australian Diabetes Society/Australian and New Zealand Society of Nuclear Medicine procedure guideline for FDG PET/CT imaging in patients with type 1 and type 2 diabetes (summary and commentary)",
      publisher: "Internal Medicine Journal",
      year: 2026,
      url: "https://doi.org/10.1111/imj.70344",
      doi: "10.1111/imj.70344",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["fdg-pet", "pet-ct"],
  related: [],
  upgrades: ["idea-pu-sglt2-glp1-plan-before-pet"],
  gaps: [
    "The EANM guideline dates from 2015 and does not say how to handle SGLT2 inhibitors or GLP-1 receptor agonists before FDG PET. The Australian and New Zealand diabetes guideline may, but on 17 November 2026 only its summary abstract could be read; the full text is subscription only.",
    "The bodies do not agree on every figure: the fast is at least 4 hours (EANM 2015, breast guideline 2024), at least 4 to 6 hours (SNM 2006) or at least 6 hours (immunotherapy guideline 2022), and SNM 2006 reports rescheduling above 150 to 200 mg/dL where EANM sets 11 mmol/L (about 200 mg/dL). A scan unit's own letter may differ from all of them.",
    "None of the preparation recommendations read is graded; they are expert consensus. The EANM intervals after chemotherapy, growth factors, radiotherapy and surgery are described by the guideline itself as resting on no conclusive data.",
    "EANM's rule on metformin and intravenous contrast (stop at the procedure, withhold for 48 hours) is its 2015 text; contrast guidance has changed since and is covered in the contrast protocol.",
    "No United Kingdom guidance on FDG PET-CT preparation (for example from the Royal College of Radiologists) was read in this pass, and no newer SNMMI general oncology FDG procedure standard than the 2006 guideline was found in Europe PMC on 17 November 2026.",
    "The SNMMI/EANM paediatric oncology FDG guideline (2021) was not read, so preparation for children is not covered.",
    "EANM sees no reason for routine sedatives in adults, though they may be considered for claustrophobia or head and neck tumours; drugs tried to reduce brown fat uptake (diazepam, propranolol) have given conflicting results.",
  ],
});
