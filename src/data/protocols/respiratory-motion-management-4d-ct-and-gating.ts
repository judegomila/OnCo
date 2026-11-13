import { protocol } from "./helpers";

/*
 * Managing breathing motion in radiotherapy to the lung and upper abdomen: measuring it (4D CT, fluoroscopy), and
 * accounting for it (an internal target volume, breath-hold, abdominal compression, gating, tracking).
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - AAPM Report 91, The Management of Respiratory Motion in Radiation Oncology, report of Task Group 76 (July 2006):
 *   full text, the PDF published free by the AAPM (aapm.org/pubs/reports/RPT_91.pdf), read with pdftotext. It is
 *   still the AAPM's report on the subject; no replacement report was found. It prints no grades.
 * - Results from the AAPM Task Group 324 respiratory motion management survey (J Appl Clin Med Phys 2022,
 *   PMC9680579): full text.
 * - AAPM-RSS Medical Physics Practice Guideline 9.b: SRS-SBRT (2025, PMC11969102): full text, for 4D CT and
 *   end-to-end testing with motion in stereotactic treatment.
 * - The breath-hold protocol for left breast radiotherapy (breath-hold-left-breast-radiotherapy) covers breast
 *   breath-hold and the ESTRO-ACROP 2023 guideline; it is linked, not repeated.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const respiratoryMotionManagement4dCtAndGating = protocol({
  id: "respiratory-motion-management-4d-ct-and-gating",
  name: "Breathing motion in lung and upper abdominal radiotherapy: 4D CT, gating, breath-hold and compression",
  aka: ["respiratory motion management", "4D CT", "4DCT", "four-dimensional CT", "respiratory gating", "abdominal compression", "internal target volume", "ITV", "tumour tracking", "TG-76", "breath-hold for lung"],
  domain: "radiotherapy",
  tldr: "Tumours in the lung, liver and upper abdomen move as you breathe. At the planning scan the team usually records the whole breathing cycle (4D CT) to see how far the tumour moves. They then plan to cover that movement, or reduce it by asking you to hold your breath, pressing gently on your tummy, or switching the beam on only at one point in each breath. They practise the breathing with you first.",
  simple: "Your breathing moves tumours in the chest and tummy. A special scan measures how much. The team may ask you to breathe in a set way or hold your breath, and will practise it with you.",
  summary: "AAPM Task Group 76 (Report 91, 2006) recommends measuring three-dimensional tumour motion for each patient where breathing motion may matter, over several breathing cycles; if motion cannot be measured, the prudent course is to assume it is significant and use motion management. Motion management is recommended for consideration when the range of motion exceeds 5 mm in any direction, or when it gives significant normal tissue sparing; the 5 mm threshold may be lower for SBRT. A measured motion should be built into the margin: the whole range if no device is used (an internal target volume), only the residual motion if one is. The patient is coached at simulation and on the first treatment day; a back-up CT without breathing requirements is taken in case the patient cannot comply. TG-76 recommends a qualified physicist at simulation sessions using motion devices and at least the first treatment, the most accurate dose calculation available in lung, written QA for every step, and frequent verification images of the diaphragm or tumour (daily for the first few treatments, then at least weekly). MPPG 9.b (2025) requires 4D CT for thoracic and abdominal SBRT and end-to-end testing with a moving phantom. In the TG-324 survey of AAPM members (2020), 95% used motion management for thoracic and abdominal sites, 60% the internal target volume method, 25% breath-hold or compression and 13% gating or tracking. TG-76 is 20 years old and predates routine cone-beam CT and surface guidance; no newer AAPM report replaces it.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Adults having external beam radiotherapy to the lung, oesophagus, liver, pancreas, kidney or other sites that move with breathing, including SBRT. Left-sided breast breath-hold is covered by its own protocol. Particle therapy has separate guidance (AAPM TG-290) not read here.",
  trigger: "Planning radiotherapy to a site where breathing may move the target.",
  steps: [
    {
      action: "Measure the tumour's movement for each patient where breathing motion may matter, over several breathing cycles, usually with a 4D CT at the planning scan",
      why: "How much a tumour moves differs from person to person, so it must be measured rather than guessed.",
      source: "aapm-tg76-2006",
      quote: "When measuring tumor motion, the motion should be observed over several breathing cycles if possible.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "If motion cannot be measured, assume it is significant and treat with a motion management technique",
      why: "Assuming no movement could mean part of the tumour is missed.",
      source: "aapm-tg76-2006",
      quote: "If no method exists for measuring motion, for example, with a standard respiratory-gated CT procedure, the prudent approach is to assume that motion is significant and treat with respiratory management (box 6).",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Consider breath-hold, compression, gating or tracking when the tumour moves more than 5 mm in any direction, or when it would spare significant normal tissue; use a lower threshold for SBRT",
      why: "Small movements are lost among other set-up errors; larger ones are worth controlling to spare healthy lung and organs.",
      source: "aapm-tg76-2006",
      quote: "The Task Group recommends that respiratory management techniques be considered if either of the following conditions occur:",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Build the measured motion into the margin: the whole range of motion if no device is used, only the motion during beam-on if one is",
      why: "The margin is what makes sure the tumour stays inside the beam wherever it is in the breath.",
      source: "aapm-tg76-2006",
      quote: "If a respiratory management device is not used, the entire range of motion should be considered when establishing the internal margin.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Coach the patient in the breathing technique at the planning scan and again on the first treatment day",
      why: "Practice makes breathing more regular and breath-holds more repeatable.",
      source: "aapm-tg76-2006",
      quote: "Coaching the patient at simulation and on the first day of treatment is fairly common and recommended.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "If the patient may not manage the breathing technique, take a back-up planning CT without it at the same appointment",
      why: "It avoids a second planning visit if breath-hold or gating turns out not to be possible.",
      source: "aapm-tg76-2006",
      quote: "If the potential exists that the patient will be unable to comply with breathing or breath-hold techniques for treatment, a backup CT scan without such a requirement is recommended during simulation.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Have a qualified medical physicist present at simulation sessions using motion management devices and at least the first treatment",
      why: "The equipment is complex, and problems are easiest to fix at the start.",
      source: "aapm-tg76-2006",
      quote: "The Task Group recommends that, due to the complexity of the management of the respiratory motion problem and the technology used, a qualified medical physicist be present at all treatment-simulation (virtual or otherwise) imaging sessions in which respiratory management devices are used and also for at least the first treatment for each patient.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Use the most accurate dose calculation available for treatment in the lung",
      why: "Radiation behaves differently in air-filled lung, and simpler calculations get the dose wrong there.",
      source: "aapm-tg76-2006",
      quote: "Due to the complex nature of radiation transport in low-density regions such as the lung, the Task Group recommends that the most accurate dose calculation available be used.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "Image the diaphragm or tumour at the breathing phase used for treatment, daily for the first few treatments and at least weekly after that",
      why: "The link between an outside breathing signal and the tumour inside can change from day to day.",
      source: "aapm-tg76-2006",
      quote: "Daily verification is recommended for the first few treatments, followed by (at least) weekly verification to ensure that the anatomy at the respiratory position used for treatment remains constant.",
      grade: "Task group recommendation (ungraded)",
    },
    {
      action: "For stereotactic treatment of moving targets, test the whole chain (4D CT, planning, delivery) end to end with a moving phantom",
      why: "It checks that the system actually hits a moving target before any patient is treated with it.",
      source: "aapm-mppg-9b-2025",
      quote: "If the planned scope of clinical services includes treatments affected by respiratory motion, the entire treatment chain (CT simulation, treatment planning, treatment delivery) should be assessed with E2E testing using a dynamic phantom setup with clinically relevant motion parameters (amplitude, cycle time).",
      grade: "Minimum practice guideline (ungraded)",
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
    statement: "Measure each patient's tumour motion (4D CT over several breathing cycles); consider active motion management when motion exceeds 5 mm or when it spares significant normal tissue, with a lower threshold for SBRT; otherwise cover the full measured range with an internal margin (AAPM TG-76). Coach the patient at simulation and the first treatment, keep a back-up CT, use the most accurate lung dose calculation, verify the breathing position by imaging, and run written QA (TG-76); for SBRT, test the chain end to end with a moving phantom (MPPG 9.b 2025). Which technique (internal target volume, breath-hold, compression, gating or tracking) is chosen depends on the patient's tolerance and the equipment; no guideline read ranks them and no randomised trial read compares them for outcomes.",
    sources: ["aapm-tg76-2006", "aapm-mppg-9b-2025", "aapm-tg324-survey-2022"],
  },
  variants: [
    {
      name: "Internal target volume (free breathing, margin covers all motion)",
      differs: "The patient breathes freely and the target volume is drawn over all phases of the 4D CT. The commonest approach in the TG-324 survey (60% of respondents).",
      evidence: "TG-76 accepts it when the full range of motion is in the margin; it irradiates more normal tissue than techniques that reduce motion.",
      sources: ["aapm-tg76-2006", "aapm-tg324-survey-2022"],
    },
    {
      name: "Breath-hold or abdominal compression",
      differs: "Motion is reduced by a voluntary or device-assisted breath-hold, or by a plate or belt pressing on the upper abdomen. Used by 25% of TG-324 respondents.",
      evidence: "TG-76 describes both and recommends verifying stability within and between breath-holds; tolerance varies and few factors predict who can manage it.",
      sources: ["aapm-tg76-2006", "aapm-tg324-survey-2022"],
    },
    {
      name: "Gating or real-time tracking",
      differs: "The beam is switched on only in a chosen phase of breathing, or follows the moving target (for example robotic or MLC tracking, often with implanted markers). Used by 13% of TG-324 respondents.",
      evidence: "TG-76: internal markers give the most accurate position but need an invasive procedure and can migrate; external surrogates need their relation to the tumour established.",
      sources: ["aapm-tg76-2006", "aapm-tg324-survey-2022"],
    },
  ],
  grades: [
    { claim: "Motion management is very widely used in thoracic and abdominal radiotherapy", grade: "Practice survey (AAPM members, 2020)", source: "aapm-tg324-survey-2022", quote: "Overall, 95% of respondents used respiratory motion management for thoracic and abdominal sites, with 36% of respondents using respiratory motion management for at least 90% of thoracic and abdominal patients." },
    { claim: "The internal target volume method is the commonest approach", grade: "Practice survey (AAPM members, 2020)", source: "aapm-tg324-survey-2022", quote: "The majority (60%) of respondents used the internal target volume method to treat thoracic and abdominal cancer patients, with 25% using breath hold or abdominal compression and 13% using gating or tracking." },
    { claim: "The 5 mm threshold may be lowered for SBRT", grade: "Task group recommendation (ungraded)", source: "aapm-tg76-2006", quote: "The recommended 5-mm motion-limit criterion value may be reduced for special procedures, such as stereotactic body radiotherapy." },
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
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg324-survey-2022",
      label: "Results from the AAPM Task Group 324 respiratory motion management in radiation oncology survey",
      publisher: "Journal of Applied Clinical Medical Physics",
      year: 2022,
      url: "https://doi.org/10.1002/acm2.13810",
      doi: "10.1002/acm2.13810",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
  ],
  technologies: ["respiratory-motion-management", "respiratory-gating-tumour-tracking-systems", "ct", "in-room-imaging-systems", "surface-guided-radiotherapy", "sbrt", "cyberknife"],
  cancers: ["nsclc", "lung-cancer", "hcc"],
  terms: ["radiotherapy", "planning-target-volume", "fiducial-markers"],
  related: ["breath-hold-left-breast-radiotherapy", "stereotactic-radiosurgery-and-sbrt-delivery-safeguards", "radiotherapy-planning-ct-simulation"],
  upgrades: [],
  gaps: [
    "AAPM TG-76 dates from 2006, before routine cone-beam CT, surface guidance and MR-guided treatment; its verification advice (radiographs daily for the first few treatments, then weekly) is older than current daily volumetric imaging practice. No newer AAPM report on photon motion management was found; TG-324 published a survey, not a replacement report.",
    "No European or UK guideline on motion management for lung or abdominal radiotherapy was read; ESTRO-ACROP lung SBRT guidance was read only as an abstract (see the stereotactic protocol).",
    "No randomised trial read compares the techniques (internal target volume, breath-hold, compression, gating, tracking) for cancer control or side effects; choice rests on dosimetry, tolerance and equipment.",
    "The 5 mm threshold was chosen because that much motion causes imaging artefacts and systematic errors, not because of outcome data.",
  ],
});
