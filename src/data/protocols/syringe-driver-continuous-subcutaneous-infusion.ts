import { protocol } from "./helpers";

/*
 * Setting up and checking a syringe driver (syringe pump) for a continuous subcutaneous infusion (CSCI) in palliative
 * and end of life care.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG31, Care of dying adults in the last days of life (2015): recommendations page, full text (the raw text the
 *   last-days protocol was written from).
 * - Scottish Palliative Care Guidelines, Syringe pump / driver guidelines (Healthcare Improvement Scotland Right Decision
 *   Service; current version 2023): the overview, the six guideline sections (before setting up, setting up, loading,
 *   monitoring and maintaining, safety and risk management, alarms) and the practice points page, all as raw HTML. The
 *   guideline is written around the BD BodyGuard T pump and is not graded.
 * - Brown, Yardley et al., continuous subcutaneous infusion safety incidents in England and Wales (Palliat Med 2024):
 *   full text, Europe PMC (PMC11673304).
 * - The NPSA Rapid Response Report on ambulatory syringe drivers (2010) could not be read: the UK Government Web Archive
 *   refused the script (HTTP 405) and the original NRLS address no longer answers.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes were checked by script.
 */
export const syringeDriverContinuousSubcutaneousInfusion = protocol({
  id: "syringe-driver-continuous-subcutaneous-infusion",
  name: "Syringe driver (syringe pump): setting up and checking a continuous subcutaneous infusion in palliative care",
  aka: ["syringe driver", "syringe pump", "CSCI", "continuous subcutaneous infusion", "McKinley T34", "BD BodyGuard T", "palliative infusion pump", "24-hour subcutaneous infusion"],
  domain: "palliative",
  tldr: "A syringe driver is a small battery pump that pushes medicines for pain, sickness, agitation or chest secretions slowly under the skin over 24 hours, when swallowing is hard or tablets are not working. A nurse sets it up, refills it every day and checks it regularly; you or your family should not adjust it, and should call the nurses if it alarms, the skin is sore, or symptoms are not controlled.",
  simple: "A small pump in a pouch gives your medicines through a fine tube under the skin, all day and night. A nurse changes it every day and checks it. Do not touch the buttons. Call the nurses if it beeps, the skin around the tube is red or sore, or you still have symptoms.",
  summary: "NICE NG31 (2015) says to consider a syringe pump for continuous symptom control in the last days of life if more than 2 or 3 as-needed doses have been given in 24 hours, to avoid intramuscular injections, to start at the lowest effective dose and to reassess at least daily. The Scottish Palliative Care Guidelines (2023 version, BD BodyGuard T) give the procedure: discuss the reasons and offer the leaflet; choose a site with loose subcutaneous tissue (outer arm, upper thigh, abdomen, chest wall, scapula for a confused person) and avoid oedema, ascites, bony prominences and irradiated or broken skin; use a dedicated cannula for the pump and a second one for breakthrough doses; mix only medicines known to be compatible, no more than three without specialist or pharmacy advice, dilute to the maximum volume and add dexamethasone or cyclizine last; change the battery in the community if it is below 50%; prime the line by hand and never connect the line to the patient while loading; keep the pump level with or below the site; select Start Infusion, not Resume, for a new syringe; lock the keypad; check 15 to 30 minutes after set-up, then 4-hourly in hospital and at least daily at home; renew the syringe every 24 hours; and report any infusion finishing more than an hour early or late. About a quarter of palliative medication incidents reported in England and Wales involve these infusions, most from failures of monitoring and supply, administration and prescribing.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "ward", "community"],
  },
  population: "Adults receiving palliative or end of life care who need a continuous subcutaneous infusion of symptom control medicines. Children and young people are excluded by the Scottish guideline, which points to the PELiCaN guideline for them (not read).",
  trigger: "The oral route is failing or not working (difficulty swallowing, persistent vomiting, bowel obstruction or malabsorption), or more than 2 or 3 as-needed doses of a medicine have been given in 24 hours.",
  steps: [
    {
      action: "Consider a syringe pump when more than 2 or 3 as-needed doses of a medicine have been needed in 24 hours, or the oral route is failing",
      why: "A steady infusion keeps symptoms controlled without repeated injections.",
      source: "nice-ng31",
      quote: "Consider using a syringe pump to deliver medicines for continuous symptom control if more than 2 or 3 doses of any 'as required' medicines have been given within 24 hours.",
      grade: "Not graded (NICE NG31 1.5.6, 'consider')",
    },
    {
      action: "Explain why the pump is being used, how it works and what to do if something goes wrong, and offer the written leaflet",
      why: "Many people link a syringe driver with dying; talking it through first avoids fear and lets the family know who to call.",
      source: "scot-spcg",
      quote: "Before setting up the syringe pump, it is important to discuss the reasons for use with the patient, family and carer.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "With the patient, choose a site with loose subcutaneous tissue, avoiding swollen or lymphoedematous areas, ascites, bony prominences, skin folds, irradiated and broken skin",
      why: "Medicine is absorbed poorly from swollen or damaged skin, and a cannula over bone or a waistband is uncomfortable and falls out.",
      source: "scot-spcg",
      quote: "Where possible, involve the patient in the choice of suitable site(s). Ensure the area chosen has loose, subcutaneous tissue.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Use a single-port cannula for the pump only, and insert a separate cannula for breakthrough injections",
      why: "Giving extra doses through the pump line interrupts the infusion and can flush a bolus of the pump medicines in.",
      source: "scot-spcg",
      quote: "A single port, subcutaneous infusion device should be used for the administration of medicines via a syringe pump. An additional device should be inserted for the administration of bolus subcutaneous medications.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Mix only medicines known to be compatible, and no more than three without specialist palliative care or pharmacy advice; dilute to the maximum volume and add dexamethasone or cyclizine last",
      why: "Some combinations crystallise in the syringe, which blocks the line and means the person does not get their medicine.",
      source: "scot-spcg",
      quote: "Do not mix more than three medicines without seeking advice from specialist palliative care and / or pharmacy unless this has already been agreed by your health board.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Check the battery before starting; at home, fit a new battery if less than 50% remains",
      why: "A pump that stops overnight at home leaves the person without symptom control until a nurse can come.",
      source: "scot-spcg",
      quote: "In the community setting, if the battery power has less than 50% life remaining at the start of an infusion, then a new battery should be installed",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Prime the line by hand, load the syringe with the line disconnected from the patient, then connect it",
      why: "Loading a syringe while connected can push a sudden dose into the person.",
      source: "scot-spcg",
      quote: "To prevent an accidental bolus of medicines being given, please ensure the line is not attached to the patient's cannula when placing the syringe in the pump.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Keep the pump at the same level as the infusion site or lower",
      why: "A pump held above the site can siphon medicine in faster than intended.",
      source: "scot-spcg",
      quote: "To reduce the risk of siphonage the syringe pump should be placed at the same level or lower than the infusion site.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "For every new or changed syringe, select Start Infusion rather than Resume, and renew the syringe every 24 hours",
      why: "Resume continues the old programme, so a new syringe would not run over a full 24 hours.",
      source: "scot-spcg",
      quote: "When renewing or changing the syringe it is important to select ' START INFUSION ' instead of ' RESUME ' as this will ensure that the syringe pump delivers the infusion over a new 24 hour period.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Lock the keypad, use a lockbox or cover as local policy says, and ask the patient and family to call the nurses rather than touch the pump",
      why: "Accidental button presses change the rate or stop the infusion.",
      source: "scot-spcg",
      quote: "The patient/family/carer should be discouraged from interacting with the pump and advised to contact the nursing team caring for them if any issues occur.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Check 15 to 30 minutes after set-up, then every 4 hours in hospital and at every visit (at least daily) at home: volume infused, syringe contents, the site and the battery",
      why: "Checking volume against time shows whether the pump is running to schedule; cloudy contents or a sore site need action.",
      source: "scot-spcg",
      quote: "When set up, reloaded or resited an initial check should be carried out within the first 15-30 minutes to ensure the infusion is running correctly. Then every 4 hours in an inpatient setting and at every visit (at least daily) in the community setting.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Prescribe a breakthrough dose of each medicine in the pump and give it when symptoms break through",
      why: "The pump takes hours to reach a steady level, and symptoms can flare in between.",
      source: "scot-spcg-practice",
      quote: "If the patient has uncontrolled symptoms before the infusion is started or during the infusion period, give breakthrough doses of medication as required.",
      grade: "Not graded (practice point)",
    },
    {
      action: "Reassess symptoms at least daily, and seek specialist palliative care advice if they do not improve promptly or there are unwanted effects such as sedation",
      why: "Doses usually need adjusting, and a specialist can help when they do not work.",
      source: "nice-ng31",
      quote: "Regularly reassess, at least daily, the dying person's symptoms during treatment to inform appropriate titration of medicine.",
      grade: "Not graded (NICE NG31 1.5.8)",
    },
    {
      action: "Report every incident, including an infusion finishing more than an hour early or late, and take the pump out of use",
      why: "Pump faults and errors are common enough that every one needs to be found and fixed.",
      source: "scot-spcg",
      quote: "infusions completing ahead of intended time (finishing > 1 hour early)",
      grade: "Not graded (national guideline)",
    },
  ],
  bestInClass: {
    statement: "NICE NG31 (2015) decides when a syringe pump is used in the last days of life; the Scottish Palliative Care Guidelines (2023) give the most detailed public national procedure for setting it up and checking it. Neither grades its recommendations, and the procedure rests on device instructions, compatibility data and safety reporting rather than trials. National incident data (Palliat Med 2024) show where it fails: supply and monitoring, administration and prescribing, worsened by gaps in continuity and unfamiliar staff.",
    sources: ["nice-ng31", "scot-spcg", "cssi-incidents-2024"],
  },
  variants: [
    {
      name: "Other pump models (McKinley T34 version 2, CME version 3)",
      differs: "Different menus and alarms from the BD BodyGuard T on which the Scottish guideline is written.",
      evidence: "The Scottish guideline names them as in use and points to local standard operating procedures for the differences; no comparative outcome data.",
      sources: ["scot-spcg"],
    },
    {
      name: "Extension line change every 72 hours",
      differs: "Changes the extension line on a fixed 72-hour schedule rather than only when needed.",
      evidence: "A manufacturer recommendation cited by the Scottish guideline, which notes the evidence on line duration in palliative CSCI is limited.",
      sources: ["scot-spcg"],
    },
    {
      name: "More than three medicines in one syringe",
      differs: "Some health boards mix four or more medicines in a single pump.",
      evidence: "Allowed by the Scottish guideline only on specialist or pharmacy advice or local agreement; mixing in a syringe is unlicensed but supported by practice.",
      sources: ["scot-spcg"],
    },
    {
      name: "Regular as-needed subcutaneous injections instead of a pump",
      differs: "Gives each dose by separate injection, usually through an indwelling cannula.",
      evidence: "NICE NG31 reserves the pump for when more than 2 or 3 as-needed doses are needed in 24 hours; below that, separate doses are the default.",
      sources: ["nice-ng31"],
    },
  ],
  grades: [
    { claim: "Avoid intramuscular injections in the last days of life", grade: "Not graded (NICE NG31 1.5.5)", source: "nice-ng31", quote: "Avoid giving intramuscular injections and give either subcutaneous or intravenous injections." },
    { claim: "Seek specialist advice when symptoms do not settle", grade: "Not graded (NICE NG31 1.5.9)", source: "nice-ng31", quote: "Seek specialist palliative care advice if the dying person's symptoms do not improve promptly with treatment or if there are undesirable side effects, such as unwanted sedation." },
    { claim: "Cannula dwell time", grade: "Not graded (national guideline)", source: "scot-spcg", quote: "The cannula can remain in place for up to 7 days." },
    { claim: "Share of palliative medication incidents involving CSCI", grade: "National incident data, England and Wales 2016-2021", source: "cssi-incidents-2024", quote: "About 25% of palliative medication incidents involve continuous subcutaneous infusions." },
  ],
  sources: [
    {
      key: "nice-ng31",
      label: "Care of dying adults in the last days of life (NG31), recommendations",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng31/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'avoid') signals strength.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "scot-spcg",
      label: "Scottish Palliative Care Guidelines: Syringe pump / driver guidelines (guideline sections: before setting up, setting up, loading, monitoring and maintaining, safety and risk management)",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2023,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/syringe-pump-driver-guidelines/",
      gradingScheme: "Not graded; national consensus guidance first produced by NHS Education for Scotland in 2011, updated 2018 and 2023.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "scot-spcg-practice",
      label: "Scottish Palliative Care Guidelines: Syringe pump / driver practice points",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2023,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/syringe-pump-driver-guidelines/syringe-pump-driver-practice-points/",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cssi-incidents-2024",
      label: "Multiple points of system failure underpin continuous subcutaneous infusion safety incidents in palliative care: a mixed methods analysis (Brown et al., Palliat Med 2024)",
      publisher: "Palliative Medicine",
      year: 2024,
      url: "https://doi.org/10.1177/02692163241287639",
      doi: "10.1177/02692163241287639",
      gradingScheme: "Analysis of national incident reports; no grade.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "npsa-2010",
      label: "Safer ambulatory syringe drivers, Rapid Response Report NPSA/2010/RRR019",
      publisher: "National Patient Safety Agency (England and Wales)",
      year: 2010,
      url: "https://webarchive.nationalarchives.gov.uk/ukgwa/20171030131208/http://www.nrls.npsa.nhs.uk/resources/?entryid45=92908",
      gradingScheme: "Patient safety alert; not graded.",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["cyclizine"],
  technologies: ["syringe-drivers", "hospice-end-of-life"],
  terms: ["last-days-of-life-care"],
  related: ["care-in-the-last-days-of-life", "strong-opioids-for-cancer-pain", "opioid-switching-and-conversion"],
  gaps: [
    "The NPSA 2010 Rapid Response Report that moved UK services to syringe drivers with alarms, lockboxes and rates set in millilitres could not be read (the archive refused the script); nothing here rests on it.",
    "No source read grades any step; the procedure is national consensus built on device instructions and incident learning, not on trials.",
    "Drug choices, doses and compatibility tables are in the Scottish guideline's compatibility pages and local formularies and are not reproduced here.",
    "The evidence on how often to change the extension line in palliative CSCI is limited, as the Scottish guideline says.",
    "Children are outside these sources; the PELiCaN guideline for syringe pumps in children and young people was not read.",
  ],
});
