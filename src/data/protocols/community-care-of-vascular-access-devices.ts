import { protocol } from "./helpers";

/*
 * Care of PICCs, tunnelled lines and ports by community and district nurses, and by patients and carers at home, as
 * NICE sets it out for primary and community care.
 *
 * What was read, and how:
 * - First written on 11 November 2026 from raw copies of the two NICE pages.
 * - Second accuracy pass on 17 November 2026. NICE CG139 (published 28 March 2012, last updated 15 February 2017, one
 *   minor change in July 2023 to a sharps recommendation), recommendations page: raw HTML fetched that day by the
 *   checker of the central line maintenance bundle and re-used here, read as text with tags stripped; the overview and
 *   update information pages were fetched with curl for this record. NICE QS61 (published 17 April 2014, source
 *   guidance for statement 5 updated March 2022), statement 5, overview and update information: raw HTML by curl.
 *   Every quote was checked by script against those texts (whitespace normalised only). NICE does not grade; each
 *   CG139 recommendation carries the year it was written or amended.
 * - What changed in the second pass: the reasons given for each step now say only what NICE says; the heparin flush
 *   recommendation, the dressing rule for tunnelled and implanted devices and the skin clean at dressing changes were
 *   added; "from epic3" was removed from the 15-second hub clean, which QS61 does not attribute to one source; the
 *   comparison with CDC, epic3 and ESMO, which no source cited here makes, was removed; the scope was corrected (not
 *   cancer-specific, children included); one quote had a stray space and one stopped mid-sentence.
 * - The RCN Standards for Infusion Therapy page returned "Page Not Found" on 17 November 2026 and the Queen's Nursing
 *   Institute's community standards were not found; neither is cited.
 *
 * The device-specific steps (needle, flush volumes, lock) are in the port and PICC care protocols; this record covers
 * what changes when care moves out of hospital. Quotes are copied with line breaks joined only.
 */
export const communityCareOfVascularAccessDevices = protocol({
  id: "community-care-of-vascular-access-devices",
  name: "Central line and port care in the community and at home",
  aka: ["district nurse line care", "community PICC care", "PICC care at home", "port flush in the community", "line care after discharge", "home line care"],
  domain: "vascular-access",
  tldr: "If you go home with a PICC, tunnelled line or port, you and your carer should be taught before leaving hospital how to prevent infection and manage it safely, with follow-up training and support available. Whoever looks after the line should clean their hands, use an aseptic technique, change the clear dressing on a central line every 7 days or sooner, and clean the line end before and after use.",
  simple: "Before you go home with a line, you should be taught how to look after it safely. Whoever cares for it should clean their hands first and clean the end of the line before and after using it.",
  summary: "NICE CG139 (2012, last updated 2017) is the NICE guideline for infection prevention in primary and community care, and NICE QS61 (2014) statement 5 makes vascular access device care a quality standard: people with a device should have their infection risk minimised by completing specified procedures for insertion and maintenance, and by removal as soon as it is no longer needed, with evidence of a written protocol as the structure measure. In CG139, patients and carers should be taught before discharge any techniques they may need to prevent infection and manage the device safely, follow-up training and support should be available, and healthcare workers should be trained and assessed as competent. Hands must be decontaminated before accessing or dressing the device and an aseptic technique must be used (ANTT is named as an example). A sterile transparent semipermeable dressing covers the site; over a central line it is changed every 7 days, or sooner if no longer intact or if moisture collects under it, and on tunnelled or implanted devices dressings are replaced every 7 days until the insertion site has healed. The site at dressing changes, and the hub or injection port before and after access, are decontaminated with chlorhexidine gluconate in 70% alcohol; QS61 specifies the 2% strength, allows aqueous povidone iodine, and adds a 15-second hub clean that is allowed to dry. Sterile 0.9% sodium chloride is preferred to flush and lock, with heparin sodium flush for implanted ports or open-ended lumens when the manufacturer recommends it. QS61 has central line sites inspected daily. Neither document gives a flush volume or frequency. The teaching and flushing recommendations date from 2003, and none is graded.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["community", "home"],
  },
  population: "People living at home with a PICC, tunnelled central catheter or implanted port, cared for by community, district or practice nurses or by themselves and their carers. NICE CG139 covers children, young people and adults receiving NHS care in primary and community care settings and is not specific to cancer; NICE says its quality standards, QS61 among them, apply in England and Wales.",
  trigger: "A person is discharged, or starts treatment as an outpatient, with a central venous access device that will be cared for outside hospital.",
  steps: [
    {
      action: "Before discharge, teach the person and their carer any techniques they may need to prevent infection and manage the device safely",
      why: "NICE places the teaching before the person leaves hospital, so that they and their carer can prevent infection and manage the device safely afterwards.",
      source: "nice-cg139",
      quote: "Before discharge from hospital, patients and their carers should be taught any techniques they may need to use to prevent infection and safely manage a vascular access device.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Make sure follow-up training and support are available to the person and carer",
      why: "NICE asks that training and support do not end with the first teaching, for the person and for their carers.",
      source: "nice-cg139",
      quote: "Follow-up training and support should be available to patients with a vascular access device and their carers.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Have healthcare workers who care for lines trained and assessed as competent in the infection prevention practices",
      why: "NICE asks that everyone caring for a person with a line uses the same infection prevention practices and keeps to them consistently.",
      source: "nice-cg139",
      quote: "Healthcare workers caring for a patient with a vascular access device should be trained, and assessed as competent, in using and consistently adhering to the infection prevention practices described in this guideline.",
      grade: "[2003, amended 2012]",
    },
    {
      action: "Decontaminate your hands before accessing or dressing the line",
      why: "NICE words this as a must. QS61 describes it as using an alcohol handrub, or washing with liquid soap and water if hands are contaminated.",
      source: "nice-cg139",
      quote: "Hands must be decontaminated (see section 1.1.2 on hand decontamination) before accessing or dressing a vascular access device.",
      grade: "[new 2012]",
    },
    {
      action: "Use an aseptic technique, of which ANTT is one example, for site care and whenever the line is accessed",
      why: "NICE defines an aseptic technique as one that ensures only uncontaminated equipment and fluids come into contact with susceptible body sites. It names ANTT as an example widely used in acute and community settings.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system (the Aseptic Non Touch Technique (ANTT™) is an example of an aseptic technique for vascular access device maintenance which is widely used in acute and community settings and represents a possible framework for establishing standardised guidance on aseptic technique.",
      grade: "[new 2012]",
    },
    {
      action: "Change the sterile transparent dressing over a central line every 7 days, or sooner if it is no longer intact or moisture collects under it",
      why: "Seven days is the longest NICE allows a transparent dressing to stay on a central line site. A gauze dressing, which NICE says to consider only for profuse perspiration or a bleeding or oozing site, is changed every 24 hours or sooner if soiled.",
      source: "nice-cg139",
      quote: "Change the transparent semipermeable membrane dressing covering a central venous access device insertion site every 7 days, or sooner if the dressing is no longer intact or moisture collects under it.",
      grade: "[2012]",
    },
    {
      action: "On a tunnelled line or implanted port, replace the site dressing every 7 days until the insertion site has healed, unless there is a reason to change it sooner",
      why: "For these devices NICE ties the 7-day dressing change to the period until the insertion site has healed. It does not say what dressing, if any, is needed after that.",
      source: "nice-cg139",
      quote: "Dressings used on tunnelled or implanted central venous catheter sites should be replaced every 7 days until the insertion site has healed, unless there is an indication to change them sooner.",
      grade: "[2003]",
    },
    {
      action: "At each dressing change, decontaminate the insertion site and surrounding skin with chlorhexidine gluconate in 70% alcohol and allow it to air dry",
      why: "NICE says to consider an aqueous chlorhexidine solution if the manufacturer prohibits alcohol with the catheter, and notes a 2012 MHRA safety alert on chlorhexidine. QS61 specifies a single-use application of 2% chlorhexidine gluconate in 70% alcohol, or aqueous povidone iodine.",
      source: "nice-cg139",
      quote: "Decontaminate the central venous catheter insertion site and surrounding skin during dressing changes using chlorhexidine gluconate in 70% alcohol, and allow to air dry.",
      grade: "[new 2012]",
    },
    {
      action: "Decontaminate the hub or injection port with chlorhexidine gluconate in 70% alcohol before and after each access",
      why: "NICE says to consider an aqueous chlorhexidine solution if the manufacturer prohibits alcohol with the catheter. QS61 adds that the hub should be cleaned for 15 seconds and allowed to dry before the system is accessed.",
      source: "nice-cg139",
      quote: "Decontaminate the injection port or vascular access device catheter hub before and after accessing the system using chlorhexidine gluconate in 70% alcohol.",
      grade: "[new 2012]",
    },
    {
      action: "Flush and lock the lumens preferably with sterile 0.9% sodium chloride; use a heparin sodium flush for an implanted port or open-ended lumen when the manufacturer recommends it",
      why: "NICE states a preference for saline and keeps heparin for the devices whose manufacturer recommends it. Neither NICE document gives a flush volume or says how often to flush.",
      source: "nice-cg139",
      quote: "Preferably, a sterile 0.9 percent sodium chloride injection should be used to flush and lock catheter lumens.",
      grade: "[2003]",
    },
    {
      action: "Inspect a central line insertion site daily, and have the device removed as soon as it is no longer needed",
      why: "QS61 says the risk of infection is greatly reduced by complying with all parts of the process for safe insertion and maintenance and by removal as soon as the device is no longer needed. It does not say who inspects the site when the person is at home.",
      source: "nice-qs61",
      quote: "Central venous catheter insertion sites should be inspected daily.",
    },
    {
      action: "Work to a written protocol covering the specified procedures for insertion, maintenance and removal, and record whether all of them were completed for each person",
      why: "QS61 suggests measuring quality by evidence of a written protocol, by the proportion of people with a device for whom all the specified procedures were completed, and by the incidence of device-related bloodstream infection.",
      source: "nice-qs61",
      quote: "People who need a vascular access device have their risk of infection minimised by the completion of specified procedures necessary for the safe insertion and maintenance of the device and its removal as soon as it is no longer needed.",
    },
  ],
  bestInClass: {
    statement: "NICE CG139 and QS61 statement 5 are the NICE standard for line care outside hospital: patient and carer teaching before discharge with follow-up training and support, trained and assessed staff, hand decontamination, aseptic technique, a sterile transparent dressing changed every 7 days or sooner on central lines, decontamination of the site at dressing changes and of the hub before and after access with chlorhexidine gluconate in 70% alcohol, a preference for saline to flush and lock, daily inspection of central line sites and removal when no longer needed, all under a written protocol. QS61 says its list of procedures is adapted from CG139 and from epic3, the guidelines for NHS hospitals in England. The teaching, support and competence recommendations are marked [2003, amended 2012], meaning their evidence has not been reviewed since 2003, and nothing here is graded.",
    sources: ["nice-cg139", "nice-qs61"],
  },
  variants: [],
  grades: [],
  sources: [
    {
      key: "nice-cg139",
      label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged [2003] (evidence not reviewed since 2003), [2003, amended 2012] (the same, with a small amendment to the wording), [2012] (evidence reviewed, recommendation unchanged) or [new 2012] (evidence reviewed, recommendation updated or added).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-qs61",
      label: "Infection prevention and control (QS61), quality statement 5: vascular access devices",
      publisher: "NICE",
      year: 2014,
      url: "https://www.nice.org.uk/guidance/qs61/chapter/Quality-statement-5-Vascular-access-devices",
      gradingScheme: "Quality statements are not graded; each comes with structure, process and outcome measures.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["picc-lines", "implanted-ports", "catheter-securement-devices"],
  terms: ["central-venous-access"],
  related: ["picc-and-tunnelled-line-care", "implanted-port-access-and-care", "blood-sampling-from-a-central-line", "central-line-occlusion-management", "central-line-maintenance-bundle"],
  upgrades: [],
  gaps: [
    "NICE CG139 was last updated on 15 February 2017, when a chlorhexidine safety alert was added to the vascular access recommendations; NICE says it checked the guideline in January 2017, and the only change since is a July 2023 edit to a sharps recommendation. Several line-care recommendations are marked [2003]. QS61 was published on 17 April 2014 and its statement 5 source guidance was updated in March 2022. On 17 November 2026 the NICE pages showed no newer edition of either.",
    "Neither NICE document gives a flush volume, a flush frequency, a heparin strength or an interval for changing needle-free connectors (for those CG139 says to follow the manufacturer); the port and PICC care protocols carry what other sources say.",
    "No source read sets how often a community nurse should see a person with a line, who inspects the site daily at home, who keeps the care record across hospital and community, which symptoms a person at home should report and how quickly, or how out-of-hours problems are handled; these are local arrangements.",
    "Whether patients and carers can safely flush or dress their own lines, and with what training, is not addressed beyond NICE's teaching recommendation.",
    "QS61 says its 15-second hub clean and 2% chlorhexidine strength are adapted from CG139 and epic3 without saying which; epic3 was not re-read for this record.",
    "On 17 November 2026 the Royal College of Nursing page for its Standards for Infusion Therapy returned \"Page Not Found\", and the Queen's Nursing Institute's community standards were not found; neither is cited.",
  ],
});
