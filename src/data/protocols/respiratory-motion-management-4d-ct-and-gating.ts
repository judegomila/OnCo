import { protocol } from "./helpers";

/*
 * Managing breathing motion in radiotherapy to the lung and upper abdomen: measuring it (4D CT, fluoroscopy), and
 * accounting for it (an internal target volume, breath-hold, abdominal compression, gating, tracking).
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * and every claim re-read against it; all 17 quotes in the file were checked verbatim by script.
 * - AAPM Report 91, The Management of Respiratory Motion in Radiation Oncology, report of Task Group 76 (July 2006):
 *   full text, the PDF published free by the AAPM (aapm.org/pubs/reports/RPT_91.pdf), read with pdftotext. It prints
 *   no grades. The AAPM formed Task Group 324 to update it; Europe PMC held only that group's survey on 17 November.
 * - Results from the AAPM Task Group 324 respiratory motion management survey (J Appl Clin Med Phys 2022,
 *   PMC9680579): full text, Europe PMC XML.
 * - AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT (2025, PMC11969102): full text, the Europe PMC XML a
 *   sibling checker saved the same day.
 * - Added in the second pass, both from copies sibling checkers fetched from the publishers on 17 November: the UK SABR
 *   Consortium resource, version 6.1 (January 2019), section 3 on tumour motion and the lung verification section,
 *   whose motion thresholds differ from TG-76's; and On target 2 (Radiotherapy Board 2021), section 4.3 only.
 * - The breath-hold protocol for left breast radiotherapy (breath-hold-left-breast-radiotherapy) covers breast
 *   breath-hold and the ESTRO-ACROP 2023 guideline; it is linked, not repeated.
 *
 * Corrected in the second pass: orders softened to the sources' own strength ("when possible", "may be reduced",
 * "should"), reasons in `why` that no source states replaced, the verification step scoped to gated and breath-hold
 * treatment, and MPPG 9.b no longer said to "require" what it lists or says "should" be done.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const respiratoryMotionManagement4dCtAndGating = protocol({
  id: "respiratory-motion-management-4d-ct-and-gating",
  name: "Breathing motion in lung and upper abdominal radiotherapy: 4D CT, gating, breath-hold and compression",
  aka: ["respiratory motion management", "4D CT", "4DCT", "four-dimensional CT", "respiratory gating", "abdominal compression", "internal target volume", "ITV", "tumour tracking", "TG-76", "breath-hold for lung"],
  domain: "radiotherapy",
  tldr: "Tumours in the lung, liver and upper abdomen move as you breathe. At the planning scan the team usually records the whole breathing cycle (4D CT) to see how far the tumour moves. They then plan to cover that movement, or reduce it by asking you to hold your breath, pressing on your tummy, or switching the beam on only at one point in each breath. They practise the breathing with you first.",
  simple: "Your breathing moves tumours in the chest and tummy. A special scan measures how much. The team may ask you to breathe in a set way or hold your breath, and will practise it with you.",
  summary: "AAPM Task Group 76 (Report 91, 2006) recommends measuring tumour motion, when possible, for each patient for whom breathing motion is a concern, over several breathing cycles if possible; if no method of measuring it exists, the prudent approach is to assume motion is significant and use motion management. TG-76 recommends that motion management be considered when the range of motion exceeds 5 mm in any direction, or when it gives significant normal tissue sparing as the clinic judges; the 5 mm figure may be reduced for SBRT. The UK SABR Consortium resource (version 6.1, 2019), written for stereotactic treatment, prints different figures: motion of mobile tumours must be assessed for each patient by fluoroscopy or 4D CT, and where motion is more than 10 mm in the lung or more than 5 mm in the liver or abdomen, attempts should be made to reduce, control or mitigate it. Under TG-76 a measured motion should be built into the margin: the whole range if no device is used (an internal target volume), only the motion expected during delivery if one is. Coaching at simulation and on the first treatment day is recommended, as is a back-up CT without breathing requirements if the patient may be unable to comply. TG-76 also recommends a qualified medical physicist at simulation sessions using motion devices and at least the first treatment, the most accurate dose calculation available, written QA procedures with recorded results and, for gated or breath-hold treatment, frequent radiographs of the diaphragm or tumour (daily for the first few treatments, then at least weekly). The US guideline MPPG 9.b (2025) lists 4D CT capability among the resources for thoracic and abdominal SBRT services, says respiratory motion management must be considered in those sites, and says the whole chain should be tested end to end with a dynamic phantom. In the TG-324 survey of AAPM members (August to September 2020), 95% used motion management for thoracic and abdominal sites, 93% used 4D CT at simulation, 60% used the internal target volume method, 25% breath-hold or compression and 13% gating or tracking. TG-76 dates from 2006; the AAPM formed Task Group 324 to update it, and only that group's survey was found.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "People having external beam radiotherapy to tumours in the chest, abdomen or pelvis that move with breathing (the scope TG-76 states), including SBRT. TG-76 does not give separate advice for children and lists them among the subjects needing research. The UK SABR Consortium figures apply to stereotactic treatment only. Left-sided breast breath-hold is covered by its own protocol. Particle therapy has separate guidance (AAPM TG-290) not read here.",
  trigger: "Planning radiotherapy to a site where breathing may move the target.",
  steps: [
    {
      action: "Measure the tumour's movement, when possible, for each patient for whom breathing motion is a concern, over several breathing cycles if possible",
      why: "TG-76 notes that breathing patterns change over time, so one breath does not show the whole movement. In the 2020 survey of AAPM members, 93% used 4D CT at the planning scan for chest and abdominal patients.",
      source: "aapm-tg76-2006",
      quote: "When measuring tumor motion, the motion should be observed over several breathing cycles if possible.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "If there is no way to measure the motion, assume it is significant and treat with a motion management technique",
      why: "Assuming no movement could mean part of the tumour is missed.",
      source: "aapm-tg76-2006",
      quote: "If no method exists for measuring motion, for example, with a standard respiratory-gated CT procedure, the prudent approach is to assume that motion is significant and treat with respiratory management (box 6).",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Consider breath-hold, compression, gating or tracking when the tumour moves more than 5 mm in any direction, or when it would spare significant normal tissue; the 5 mm figure may be reduced for SBRT",
      why: "TG-76 says movement under 5 mm is small beside the other errors in radiotherapy, so the extra effort is not warranted unless it spares significant normal tissue. The UK SABR Consortium prints different figures for stereotactic treatment (see the variant).",
      source: "aapm-tg76-2006",
      quote: "The Task Group recommends that respiratory management techniques be considered if either of the following conditions occur:",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Build the measured motion into the margin: the whole range of motion if no device is used, only the motion expected during delivery if one is",
      why: "The margin is what makes sure the tumour stays inside the beam wherever it is in the breath.",
      source: "aapm-tg76-2006",
      quote: "If a respiratory management device is not used, the entire range of motion should be considered when establishing the internal margin.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Coach the patient in the breathing technique at the planning scan and again on the first treatment day",
      why: "Training lets the patient get used to the breathing technique and shows whether they can breathe or hold their breath in a repeatable way.",
      source: "aapm-tg76-2006",
      quote: "Coaching the patient at simulation and on the first day of treatment is fairly common and recommended.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "If the patient may be unable to keep to the breathing or breath-hold technique, take a back-up planning CT without it during simulation",
      why: "A scan that does not depend on the technique is then there to plan from if the patient cannot keep to it.",
      source: "aapm-tg76-2006",
      quote: "If the potential exists that the patient will be unable to comply with breathing or breath-hold techniques for treatment, a backup CT scan without such a requirement is recommended during simulation.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Have a qualified medical physicist present at simulation sessions using motion management devices and at least the first treatment",
      why: "TG-76 gives the complexity of the problem and of the technology as its reason. It adds that in certain cases a well-trained radiation oncology professional may do these tasks if a qualified medical physicist is available for consultation.",
      source: "aapm-tg76-2006",
      quote: "The Task Group recommends that, due to the complexity of the management of the respiratory motion problem and the technology used, a qualified medical physicist be present at all treatment-simulation (virtual or otherwise) imaging sessions in which respiratory management devices are used and also for at least the first treatment for each patient.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Use the most accurate dose calculation available for treatment in the lung",
      why: "The way radiation travels through low-density tissue such as the lung is complex.",
      source: "aapm-tg76-2006",
      quote: "Due to the complex nature of radiation transport in low-density regions such as the lung, the Task Group recommends that the most accurate dose calculation available be used.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "For gated or breath-hold treatment, take radiographs of the diaphragm (or the tumour, if visible) at the breathing position used for treatment, daily for the first few treatments and at least weekly after that",
      why: "The link between an outside breathing monitor and the organs inside can change from one session to the next. TG-76 wrote this for radiographs in 2006; the UK SABR Consortium advice on 4D cone-beam CT is in the gating variant.",
      source: "aapm-tg76-2006",
      quote: "Daily verification is recommended for the first few treatments, followed by (at least) weekly verification to ensure that the anatomy at the respiratory position used for treatment remains constant.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "For a stereotactic service that treats targets moving with breathing, test the whole chain (CT simulation, planning, delivery) end to end with a moving phantom",
      why: "MPPG 9.b says the tests should include how accurately the target is hit and a measurement of the dose delivered to it.",
      source: "aapm-mppg-9b-2025",
      quote: "If the planned scope of clinical services includes treatments affected by respiratory motion, the entire treatment chain (CT simulation, treatment planning, treatment delivery) should be assessed with E2E testing using a dynamic phantom setup with clinically relevant motion parameters (amplitude, cycle time).",
      grade: "Minimum practice guideline, 'should' (ungraded)",
    },
    {
      action: "Keep written quality assurance procedures for imaging, planning and delivery with motion devices, and record the results",
      why: "Each device adds steps that can go wrong; checking them regularly keeps treatment accurate.",
      source: "aapm-tg76-2006",
      quote: "Strict QA procedures for the imaging, planning, and delivery of radiotherapy using respiratory management devices are required to ensure the safe and effective use of these devices.",
      grade: "Task group recommendation (ungraded)",
    },
  ],
  bestInClass: {
    statement: "Measure each patient's tumour motion when possible, over several breathing cycles (AAPM TG-76); the UK SABR Consortium makes assessment by fluoroscopy or 4D CT a minimum standard for stereotactic treatment. The two differ on when to act. TG-76 recommends considering motion management when motion exceeds 5 mm in any direction or when it spares significant normal tissue, and says the 5 mm figure may be reduced for SBRT. The UK SABR Consortium says attempts should be made to reduce, control or mitigate motion of more than 10 mm in the lung or more than 5 mm in the liver or abdomen. Otherwise the full measured range goes into the internal margin (TG-76). Coach the patient at simulation and the first treatment, take a back-up CT if the patient may not comply, use the most accurate dose calculation available, verify the breathing position by imaging, and keep written QA (TG-76); a stereotactic service should test the chain end to end with a moving phantom (MPPG 9.b 2025). TG-76 does not rank the techniques (internal target volume, breath-hold, compression, gating, tracking); its flowchart turns on what is available and what the patient can tolerate. No randomised trial read compares them for outcomes.",
    sources: ["aapm-tg76-2006", "uk-sabr-consortium-2019", "aapm-mppg-9b-2025", "aapm-tg324-survey-2022"],
  },
  variants: [
    {
      name: "Internal target volume (free breathing, margin covers all motion)",
      differs: "The patient breathes freely and the target volume allows for all the measured motion, usually informed by a 4D CT. The commonest approach in the TG-324 survey (60% of respondents).",
      evidence: "TG-76 says that with no device the entire range of motion should be considered in the internal margin, and that covering motion with margins increases the field size and the volume of healthy tissue exposed to high doses. The UK SABR Consortium says it may be appropriate if other means cannot be applied or the tumour moves less than 10 mm in the lung or less than 5 mm in the liver or abdomen.",
      sources: ["aapm-tg76-2006", "uk-sabr-consortium-2019", "aapm-tg324-survey-2022"],
    },
    {
      name: "Breath-hold or abdominal compression",
      differs: "Motion is reduced by a voluntary or device-assisted breath-hold, or by a plate pressing on the abdomen. Used by 25% of TG-324 respondents.",
      evidence: "TG-76 describes both, says tumour position should be verified as stable within each breath-hold and reproducible between breath-holds, and says few factors predict who will tolerate a technique. The UK SABR Consortium says active breathing control needs a breath-hold of 20 to 35 seconds and that some centres' experience suggests one third to one half of patients cannot manage it; it calls abdominal compression the commonest motion control in published liver series. The UK guidance On target 2 says breath-hold reproducibility must be verified, and that a 4D CT is not an appropriate reference image for a breath-hold treatment.",
      sources: ["aapm-tg76-2006", "uk-sabr-consortium-2019", "on-target-2-2021", "aapm-tg324-survey-2022"],
    },
    {
      name: "Gating or real-time tracking",
      differs: "The beam is switched on only in a chosen part of the breathing cycle, or follows the moving target (TG-76 names an MLC, a robotic arm or couch motion). Used by 13% of TG-324 respondents.",
      evidence: "TG-76: internal markers give the most accurate position, weighed against cost, an invasive procedure and possible marker migration; with external markers the relation to the tumour should be established. The UK SABR Consortium says that for gated lung SABR a 4D cone-beam CT should be used at each fraction.",
      sources: ["aapm-tg76-2006", "uk-sabr-consortium-2019", "aapm-tg324-survey-2022"],
    },
    {
      name: "UK SABR Consortium thresholds (stereotactic treatment)",
      differs: "For stereotactic treatment in the UK the action figures are 10 mm for lung and 5 mm for liver or abdominal sites, against TG-76's single 5 mm in any direction. TG-76 says its figure may be reduced for SBRT; the UK figure for lung is higher.",
      evidence: "Printed as minimum standards in a consensus resource endorsed by the Faculty of Clinical Oncology of the Royal College of Radiologists; not graded. The resource also says 4D CT is highly recommended for sites subject to respiratory motion.",
      sources: ["uk-sabr-consortium-2019", "aapm-tg76-2006"],
    },
  ],
  grades: [
    { claim: "Motion management is very widely used in thoracic and abdominal radiotherapy", grade: "Practice survey (AAPM members, 2020)", source: "aapm-tg324-survey-2022", quote: "Overall, 95% of respondents used respiratory motion management for thoracic and abdominal sites, with 36% of respondents using respiratory motion management for at least 90% of thoracic and abdominal patients." },
    { claim: "The internal target volume method is the commonest approach", grade: "Practice survey (AAPM members, 2020)", source: "aapm-tg324-survey-2022", quote: "The majority (60%) of respondents used the internal target volume method to treat thoracic and abdominal cancer patients, with 25% using breath hold or abdominal compression and 13% using gating or tracking." },
    { claim: "The 5 mm threshold may be lowered for SBRT", grade: "Task group recommendation (ungraded)", source: "aapm-tg76-2006", quote: "The recommended 5-mm motion-limit criterion value may be reduced for special procedures, such as stereotactic body radiotherapy." },
    { claim: "UK stereotactic treatment: motion must be assessed for each patient", grade: "Minimum standard (ungraded)", source: "uk-sabr-consortium-2019", quote: "Minimum standard: the motion of mobile tumours (or their surrogate) must be assessed for each patient, either through fluoroscopy or 4DCT." },
    { claim: "UK stereotactic treatment: act on motion above 10 mm in the lung or 5 mm in the liver or abdomen", grade: "Minimum standard (ungraded)", source: "uk-sabr-consortium-2019", quote: "For any observed respiratory motion of amplitude >10mm for lung or >5mm for liver or abdominal sites, attempts should be made to reduce, control or mitigate this." },
    { claim: "Breath-hold reproducibility must be verified", grade: "Consensus guidance (ungraded)", source: "on-target-2-2021", quote: "However, the reproducibility of breath-hold must be verified, interfraction and intrafraction and also interbreath-hold and intrabreath-hold." },
  ],
  sources: [
    {
      key: "aapm-tg76-2006",
      label: "The Management of Respiratory Motion in Radiation Oncology: report of AAPM Task Group 76 (AAPM Report 91)",
      publisher: "American Association of Physicists in Medicine (Keall et al.; also Medical Physics 2006)",
      year: 2006,
      url: "https://www.aapm.org/pubs/reports/RPT_91.pdf",
      doi: "10.1118/1.2349696",
      gradingScheme: "Task group recommendations; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg324-survey-2022",
      label: "Results from the AAPM Task Group 324 respiratory motion management in radiation oncology survey",
      publisher: "Journal of Applied Clinical Medical Physics",
      year: 2022,
      url: "https://doi.org/10.1002/acm2.13810",
      doi: "10.1002/acm2.13810",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-mppg-9b-2025",
      label: "AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT",
      publisher: "American Association of Physicists in Medicine and Radiosurgery Society (Journal of Applied Clinical Medical Physics)",
      year: 2025,
      url: "https://doi.org/10.1002/acm2.14624",
      doi: "10.1002/acm2.14624",
      gradingScheme: "Minimum practice guideline using 'must' and 'should'; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "uk-sabr-consortium-2019",
      label: "Stereotactic Ablative Body Radiation Therapy (SABR): A Resource, version 6.1",
      publisher: "UK SABR Consortium, endorsed by the Faculty of Clinical Oncology of the Royal College of Radiologists",
      year: 2019,
      url: "https://www.sabr.org.uk/wp-content/uploads/2019/04/SABRconsortium-guidelines-2019-v6.1.0.pdf",
      gradingScheme: "Consensus resource; minimum standards are marked in the text; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "on-target-2-2021",
      label: "On target 2: updated guidance for image-guided radiotherapy",
      publisher: "Radiotherapy Board (The Royal College of Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine)",
      year: 2021,
      url: "https://www.ipem.ac.uk/media/fxmkha4j/rt-board-image-guided-rt-guidance-2021.pdf",
      gradingScheme: "Consensus guidance with boxed recommendations at the end of each section; recommendations are not graded by level of evidence.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["respiratory-motion-management", "respiratory-gating-tumour-tracking-systems", "ct", "in-room-imaging-systems", "surface-guided-radiotherapy", "sbrt", "cyberknife"],
  cancers: ["nsclc", "lung-cancer", "hcc"],
  terms: ["radiotherapy", "planning-target-volume", "fiducial-markers"],
  related: ["breath-hold-left-breast-radiotherapy", "stereotactic-radiosurgery-and-sbrt-delivery-safeguards", "radiotherapy-planning-ct-simulation"],
  upgrades: [],
  gaps: [
    "AAPM TG-76 dates from 2006 and its verification advice is about radiographs (daily for the first few treatments, then at least weekly). In the 2020 TG-324 survey 86% of respondents used 3D cone-beam CT during treatment. The AAPM formed Task Group 324 to update TG-76; on 17 November 2026 a search of Europe PMC found only that group's survey, not an updated report.",
    "The reports disagree on the motion that calls for action and the difference is left as printed: TG-76 (United States, 2006) says more than 5 mm in any direction, a figure that may be reduced for SBRT; the UK SABR Consortium (2019) says more than 10 mm for lung and more than 5 mm for liver or abdominal sites in stereotactic treatment. Neither figure rests on outcome data in the text read: TG-76 says 5 mm was chosen because that much motion can cause significant imaging artefacts and systematic errors.",
    "No ESTRO guideline on motion management for lung or abdominal radiotherapy was read; ESTRO-ACROP lung SBRT guidance was read only as an abstract (see the stereotactic protocol). Of the UK documents, only section 3 and the lung verification section of the UK SABR Consortium resource and section 4.3 of On target 2 were read for this record; no UK threshold for conventionally fractionated treatment was found in those sections.",
    "No source read sets a margin in millimetres for motion. The TG-324 survey reports what its respondents did (the commonest internal target volume to planning target volume margin was 4 to 5 mm, chosen by 67%), which is a description of practice and not a recommendation.",
    "No randomised trial read compares the techniques (internal target volume, breath-hold, compression, gating, tracking) for cancer control or side effects.",
  ],
});
