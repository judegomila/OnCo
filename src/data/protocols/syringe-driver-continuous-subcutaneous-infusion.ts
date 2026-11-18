import { protocol } from "./helpers";

/*
 * Setting up and checking a syringe driver (syringe pump) for a continuous subcutaneous infusion (CSCI) in palliative
 * and end of life care.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl and read as text (HTML tags stripped by script, the leaflet with pdftotext, the paper as Europe PMC XML),
 * every claim was compared with the source passage and every quote was checked verbatim by script.
 * - NICE NG31, Care of dying adults in the last days of life (published 16 December 2015; the page prints no later
 *   update): recommendations page, full text.
 * - Scottish Palliative Care Guidelines, Syringe pump / driver guidelines (Healthcare Improvement Scotland, Right
 *   Decision Service; "current version was produced in 2023"): the overview, all eight guideline sections, the practice
 *   points, the compatibility and stability tables (single drugs 1a to 1f and combinations 2a to 7), the unlicensed
 *   routes table, the references page and the patient information leaflet (PDF, issue date 22 February 2024). The
 *   guideline is written around the BD BodyGuard T pump and is not graded. The tables on the pump version differences
 *   page are images and were not read.
 * - Brown, Yardley et al., continuous subcutaneous infusion safety incidents in England and Wales (Palliat Med, online
 *   23 October 2024, volume 39 issue 1, January 2025): full text, Europe PMC (PMC11673304).
 * - MHRA, Infusion pumps: T34 syringe drivers (19 October 2021) and Medical Device Alert MDA/2020/007 (25 February
 *   2020): gov.uk pages, full text. MDA/2019/030, MDA/2016/002 and DSI/2025/006 were read as well; the last concerns
 *   servicing software and says no update to the pumps themselves is required.
 * - NPSA Rapid Response Report NPSA/2010/RRR019: the UK Government Web Archive again refused the script (HTTP 405, a
 *   human verification page). The NPSA's own web page for the alert was read from an Internet Archive capture of
 *   6 September 2012, which prints the alert's recommendations; the PDF of the report itself was not read.
 * The DOI was resolved through Crossref and Europe PMC and its title checked.
 * Corrected in the second pass: two quotes that were not character for character; the pump version variant, which
 * said the versions differ in menus and alarms where the guideline says they differ in labelling only; the 25%
 * figure, which is the paper's background statement and not its own count; and nine "why" lines and one variant that
 * said more than the source does.
 */
export const syringeDriverContinuousSubcutaneousInfusion = protocol({
  id: "syringe-driver-continuous-subcutaneous-infusion",
  name: "Syringe driver (syringe pump): setting up and checking a continuous subcutaneous infusion in palliative care",
  aka: ["syringe driver", "syringe pump", "CSCI", "continuous subcutaneous infusion", "McKinley T34", "BD BodyGuard T", "palliative infusion pump", "24-hour subcutaneous infusion"],
  domain: "palliative",
  tldr: "A syringe driver is a small battery pump giving medicines for pain, sickness, agitation or chest secretions under the skin over 24 hours, when swallowing is hard or tablets are not working. Your healthcare team changes the syringe every day and checks it. Do not adjust it. Tell the team if it alarms, its light stops flashing, the liquid is cloudy, or the skin by the tube is red, swollen or sore.",
  simple: "A small pump, which can be carried in a pouch, gives your medicines through a fine tube under the skin, all day and night. Your healthcare team changes the syringe every day and checks it. Do not change the settings. Tell the team if the alarm sounds, the light stops flashing, the tube comes out, or the skin around the tube is red, swollen or sore.",
  summary: "NICE NG31 (2015), for adults in the last days of life, says to consider a syringe pump for continuous symptom control if more than 2 or 3 as-needed doses have been given in 24 hours, to avoid intramuscular injections, to start people who have not had symptom medicines before at the lowest effective dose, and to reassess at least daily. The Scottish Palliative Care Guidelines (2023 version, written for the BD BodyGuard T) give the procedure: discuss the reasons and offer the leaflet; choose a site with loose subcutaneous tissue (outer arm, upper thigh, abdomen, chest wall, or the scapula for someone confused or delirious) and avoid oedema, ascites, bony prominences, places where the cannula may be displaced, and irradiated or broken skin; use a single-port cannula for the pump and a second one for breakthrough doses; mix only medicines known to be compatible, with a compatible diluent, and no more than three without specialist or pharmacy advice unless the health board has agreed it; dilute to the maximum volume and add dexamethasone or cyclizine last; fit a new battery in the community if less than 50% remains; prime the line by hand and keep the line off the patient's cannula while the syringe is placed in the pump; keep the pump level with or below the site; select Start Infusion, not Resume, for a new syringe; lock the keypad; check within the first 15 to 30 minutes, then 4-hourly in an inpatient setting and at every visit, at least daily, in the community; renew the syringe every 24 hours; and report every incident, such as an infusion finishing more than an hour early or late. Its single-drug tables give water for injection as the diluent unless stated, and say cyclizine is incompatible with 0.9% saline. In national incident reports from England and Wales (2016 to 2021), 1,317 of 7,506 palliative medication incidents involved these infusions, most from breakdowns in monitoring and supply, administration and prescribing. The MHRA's 2021 summary of problems with T34 pumps says to follow the instructions for use and carry out all regular checks and maintenance.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "ward", "community"],
  },
  population: "Adults receiving palliative or end of life care who need a continuous subcutaneous infusion of symptom control medicines. Children and young people are excluded by the Scottish guideline, which points to the PELiCaN guideline for them (not read).",
  trigger: "The oral route is compromised or less effective (difficulty swallowing, deteriorating general condition, intractable nausea and vomiting, bowel obstruction or malabsorption), or, in the last days of life, more than 2 or 3 as-needed doses of a medicine have been given in 24 hours.",
  steps: [
    {
      action: "In the last days of life, consider a syringe pump when more than 2 or 3 as-needed doses of a medicine have been given in 24 hours",
      why: "The Scottish guideline lists the advantages as therapeutic medicine levels over 24 hours and possibly fewer regular injections, and the commonest reasons as an oral route that is compromised or less effective.",
      source: "nice-ng31",
      quote: "Consider using a syringe pump to deliver medicines for continuous symptom control if more than 2 or 3 doses of any 'as required' medicines have been given within 24 hours.",
      grade: "Not graded (NICE NG31 1.5.6, 'consider')",
    },
    {
      action: "Explain why the pump is being used, how it works and what to do if something goes wrong, and offer the written leaflet",
      why: "A syringe pump is sometimes associated with the end of life, so the reasons for using it are discussed first, and the family is told how to respond if something goes wrong.",
      source: "scot-spcg",
      quote: "Before setting up the syringe pump, it is important to discuss the reasons for use with the patient, family and carer.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "With the patient where possible, choose a site with loose subcutaneous tissue, avoiding swollen or lymphoedematous areas, abdominal ascites, bony prominences, waistbands, joints, skin folds, irradiated and broken skin",
      why: "The guideline lists these as sites to avoid; a waistband, a joint or a skin fold puts the cannula at risk of being displaced.",
      source: "scot-spcg",
      quote: "Where possible, involve the patient in the choice of suitable site(s). Ensure the area chosen has loose, subcutaneous tissue.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Use a single-port cannula for the pump only, and insert a separate cannula for breakthrough injections",
      why: "Keeping extra doses out of the pump's cannula helps the pump deliver its medicines over 24 hours without interruption.",
      source: "scot-spcg",
      quote: "A single port, subcutaneous infusion device should be used for the administration of medicines via a syringe pump. An additional device should be inserted for the administration of bolus subcutaneous medications.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Mix only medicines known to be compatible, in a compatible diluent, and no more than three without specialist palliative care or pharmacy advice unless the health board has agreed it; dilute to the maximum volume and add dexamethasone or cyclizine last",
      why: "Some medicines are incompatible and can form crystals or a precipitate in the syringe; dexamethasone and cyclizine are the commonest causes. Diluting fully also reduces skin irritation.",
      source: "scot-spcg",
      quote: "Do not mix more than three medicines without seeking advice from specialist palliative care and / or pharmacy unless this has already been agreed by your health board.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Check the battery before starting; at home, fit a new battery if less than 50% remains",
      why: "How soon the nursing team can get to a battery change depends on the setting, so in the community the battery should be enough to finish the whole infusion.",
      source: "scot-spcg",
      quote: "In the community setting, if the battery power has less than 50% life remaining at the start of an infusion, then a new battery should be installed",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Prime a new line by hand, place the syringe in the pump with the line not attached to the patient's cannula, then connect it",
      why: "Placing a syringe in the pump while the line is attached can give an accidental bolus of the medicines.",
      source: "scot-spcg",
      quote: "To prevent an accidental bolus of medicines being given, please ensure the line is not attached to the patient’s cannula when placing the syringe in the pump.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Keep the pump at the same level as the infusion site or lower",
      why: "Keeping the pump level with or below the site reduces the risk of siphonage.",
      source: "scot-spcg",
      quote: "To reduce the risk of siphonage the syringe pump should be placed at the same level or lower than the infusion site.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "For every new or changed syringe, select Start Infusion rather than Resume, and renew the syringe every 24 hours",
      why: "Resume continues the previous programme; Start Infusion makes the pump deliver the new syringe over a new 24-hour period.",
      source: "scot-spcg",
      quote: "When renewing or changing the syringe it is important to select ‘START INFUSION’ instead of ‘RESUME’ as this will ensure that the syringe pump delivers the infusion over a new 24 hour period.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Lock the keypad, use a lockbox or cover as local policy says, and ask the patient and family to call the nurses rather than touch the pump",
      why: "The keypad lock limits which keys work while the infusion runs, and any problem is for the nursing team to deal with.",
      source: "scot-spcg",
      quote: "The patient/family/carer should be discouraged from interacting with the pump and advised to contact the nursing team caring for them if any issues occur.",
      grade: "Not graded (Key Point)",
    },
    {
      action: "Check within the first 15 to 30 minutes after the pump is set up, reloaded or resited, then every 4 hours in an inpatient setting and at every visit (at least daily) in the community: volume infused and still to infuse, the syringe and line contents, the site and the battery light",
      why: "The volume infused and the volume still to infuse, with a look at the syringe, show whether the infusion is running as expected; cloudy, discoloured or precipitated contents are discarded.",
      source: "scot-spcg",
      quote: "When set up, reloaded or resited an initial check should be carried out within the first 15-30 minutes to ensure the infusion is running correctly. Then every 4 hours in an inpatient setting and at every visit (at least daily) in the community setting.",
      grade: "Not graded (national guideline)",
    },
    {
      action: "Prescribe a breakthrough dose of each medicine in the infusion and give it through a separate site when symptoms are not controlled; a subcutaneous bolus can be up to 2 ml, and no more than 1 ml for a cachectic person with little tissue under the skin",
      why: "The infusion aims to maintain symptom control; extra doses cover symptoms that are not controlled before it starts or while it runs.",
      source: "scot-spcg-practice",
      quote: "If the patient has uncontrolled symptoms before the infusion is started or during the infusion period, give breakthrough doses of medication as required.",
      grade: "Not graded (practice point)",
    },
    {
      action: "Reassess symptoms at least daily, and seek specialist palliative care advice if they do not improve promptly or there are unwanted effects such as sedation",
      why: "Daily review is what guides changes to the dose, and specialist advice is the next step when symptoms do not improve promptly.",
      source: "nice-ng31",
      quote: "Regularly reassess, at least daily, the dying person's symptoms during treatment to inform appropriate titration of medicine.",
      grade: "Not graded (NICE NG31 1.5.8)",
    },
    {
      action: "Report every incident, including an infusion finishing more than an hour early or late, and take a pump involved in an incident out of use",
      why: "The guideline says all incidents must be reported and investigated, whether the cause was a faulty pump or an operator error.",
      source: "scot-spcg",
      quote: "infusions completing ahead of intended time (finishing > 1 hour early)",
      grade: "Not graded (national guideline)",
    },
  ],
  bestInClass: {
    statement: "NICE NG31 (2015) decides when a syringe pump is used in the last days of life; the Scottish Palliative Care Guidelines (2023) give the most detailed public national procedure for setting it up and checking it. Neither grades its recommendations, and the Scottish guideline's reference list names the manufacturer's materials, the nursing code and a paper on teaching skills, and no trial. National incident reports (Brown et al., Palliative Medicine) show where it fails: monitoring and supply, administration and prescribing, with discontinuity of care, inadequate time, inadequate staffing and unfamiliarity with protocols as recurring factors.",
    sources: ["nice-ng31", "scot-spcg", "cssi-incidents-2024"],
  },
  variants: [
    {
      name: "Other pump models (T34 version 2, CME version 3)",
      differs: "The Scottish guideline says the T34 versions differ from the BD BodyGuard T in labelling, with no differences in preparing and operating them.",
      evidence: "The guideline names them as in use in Scotland and points to the local standard operating procedure; its comparison tables are images and were not read. The MHRA's 2021 summary lists problems found with T34 pumps: batteries, an unintended bolus when a 2nd edition pump is in direct sunlight, fluid getting in during cleaning, and some pumps made before May 2020 that did not alarm when they failed to infuse. Its alert MDA/2020/007 asks staff to inspect the pump before each use and to check regularly that the infusion is running as expected. No comparative outcome data.",
      sources: ["scot-spcg", "mhra-t34-2021", "mhra-mda-2020-007"],
    },
    {
      name: "Extension line change every 72 hours",
      differs: "Changes the extension line on a fixed 72-hour schedule rather than only when needed.",
      evidence: "The Scottish guideline says some companies recommend 72 hours, that the line may need changing sooner if there are problems with the site or compatibility, and that the evidence on line duration in palliative CSCI is limited.",
      sources: ["scot-spcg"],
    },
    {
      name: "More than three medicines in one syringe",
      differs: "Some health boards accept more than three medicines in a single pump.",
      evidence: "The Scottish guideline says this is often under advice from specialist or pharmacy services, and that mixing medicines in a syringe is unlicensed but supported by practice.",
      sources: ["scot-spcg"],
    },
    {
      name: "As-needed subcutaneous injections without a pump",
      differs: "Gives each dose as a separate subcutaneous injection, through a cannula kept for bolus doses.",
      evidence: "NICE NG31 says to consider a pump once more than 2 or 3 as-needed doses have been given in 24 hours; it sets no rule for fewer doses. The Scottish guideline lists a possible reduction in regular bolus injections as an advantage of the pump.",
      sources: ["nice-ng31", "scot-spcg"],
    },
  ],
  grades: [
    { claim: "Avoid intramuscular injections in the last days of life", grade: "Not graded (NICE NG31 1.5.5)", source: "nice-ng31", quote: "Avoid giving intramuscular injections and give either subcutaneous or intravenous injections." },
    { claim: "Seek specialist advice when symptoms do not settle", grade: "Not graded (NICE NG31 1.5.9)", source: "nice-ng31", quote: "Seek specialist palliative care advice if the dying person's symptoms do not improve promptly with treatment or if there are undesirable side effects, such as unwanted sedation." },
    { claim: "Cannula dwell time (longer in some circumstances, such as few options for a new site, if the site stays sound)", grade: "Not graded (national guideline)", source: "scot-spcg", quote: "The cannula can remain in place for up to 7 days." },
    { claim: "Share of palliative medication incidents involving CSCI, as the paper's background puts it", grade: "Background statement citing earlier work; the study's own data are 1,317 of 7,506 incidents", source: "cssi-incidents-2024", quote: "About 25% of palliative medication incidents involve continuous subcutaneous infusions." },
    { claim: "Where infusion incidents arise", grade: "National incident reports, England and Wales 2016 to 2021 (1,317 reports)", source: "cssi-incidents-2024", quote: "Multiple points of system failure were identified in continuous subcutaneous infusion incident reports including monitoring and supply (405, 31%), administration (383, 29%) and prescribing (268, 20%); recurring contributory factors included discontinuity of care within and between care settings, inadequate time, inadequate staffing and unfamiliarity with protocols." },
    { claim: "Diluent for cyclizine", grade: "Not graded (compatibility table 1b)", source: "scot-spcg-compat", quote: "Incompatible with 0.9% saline, always use water for injection." },
    { claim: "Patients and families do not adjust the pump", grade: "Not graded (patient information leaflet)", source: "scot-spcg-leaflet", quote: "DO NOT adjust or alter the syringe pump settings or equipment. All changes will be made by the team caring for you." },
    { claim: "Regular checks on T34 pumps", grade: "Regulator's guidance; not graded", source: "mhra-t34-2021", quote: "It is important to follow the instructions for use and carry out all regular checks and maintenance." },
    { claim: "Why older syringe drivers were replaced", grade: "Patient safety alert NPSA/2010/RRR019; not graded", source: "npsa-2010", quote: "While the majority of syringe drivers and pumps used in healthcare have rate settings in millilitres (ml), some older types of ambulatory syringe drivers have rate settings in millimetres (mm) of syringe plunger travel." },
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
      accessed: "2026-11-17",
    },
    {
      key: "scot-spcg",
      label: "Scottish Palliative Care Guidelines: Syringe pump / driver guidelines (guideline sections: training, before setting up, setting up, loading, monitoring and maintaining, safety and risk management, alarms, version differences)",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2023,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/syringe-pump-driver-guidelines/",
      gradingScheme: "Not graded; national consensus guidance first produced by NHS Education for Scotland in 2011, updated 2018 and 2023.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "scot-spcg-practice",
      label: "Scottish Palliative Care Guidelines: Syringe pump / driver practice points",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2023,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/syringe-pump-driver-guidelines/syringe-pump-driver-practice-points/",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "scot-spcg-compat",
      label: "Scottish Palliative Care Guidelines: Compatibility and stability tables for subcutaneous infusion (single drug tables 1a to 1f)",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2023,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/medicines/syringe-pump-driver-guidelines/syringe-pump-driver-compatibles/compatibility-and-stability-tables-for-subcutaneous-infusion-single-drug-tables-1a-to-1f/",
      gradingScheme: "Not graded. The page prints no date of its own; the year is that of the syringe pump guidelines it belongs to.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "scot-spcg-leaflet",
      label: "Scottish Palliative Care Guidelines: Patient Information Leaflet, Syringe Pump (issue date 22 February 2024)",
      publisher: "Scottish Palliative Care Guidelines (Healthcare Improvement Scotland, Right Decision Service)",
      year: 2024,
      url: "https://www.palliativecareguidelines.scot.nhs.uk/media/zijfvbr5/syringe-pump-patient-information-leaflet.pdf",
      gradingScheme: "Patient leaflet; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cssi-incidents-2024",
      label: "Multiple points of system failure underpin continuous subcutaneous infusion safety incidents in palliative care: a mixed methods analysis (Brown et al., Palliat Med; online October 2024, volume 39 issue 1, January 2025)",
      publisher: "Palliative Medicine",
      year: 2024,
      url: "https://doi.org/10.1177/02692163241287639",
      doi: "10.1177/02692163241287639",
      gradingScheme: "Analysis of national incident reports; no grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mhra-t34-2021",
      label: "Infusion pumps: T34 syringe drivers (summary of actions, published 19 October 2021)",
      publisher: "Medicines and Healthcare products Regulatory Agency (MHRA)",
      year: 2021,
      url: "https://www.gov.uk/government/publications/infusion-pumps-t34-syringe-drivers/infusion-pumps-t34-syringe-drivers",
      gradingScheme: "Regulator's guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mhra-mda-2020-007",
      label: "All T34 and T34L (T60) ambulatory syringe pumps: check pumps before each use due to risk of under-infusion and no alarm (MDA/2020/007)",
      publisher: "Medicines and Healthcare products Regulatory Agency (MHRA)",
      year: 2020,
      url: "https://www.gov.uk/drug-device-alerts/all-t34-and-t34l-t60-ambulatory-syringe-pumps-check-pumps-before-each-use-due-to-risk-of-under-infusion-and-no-alarm-mdr-2020-007",
      gradingScheme: "Medical Device Alert; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "npsa-2010",
      label: "Safer ambulatory syringe drivers, Rapid Response Report NPSA/2010/RRR019 (issued 16 December 2010); the NPSA's web page for the alert, Internet Archive capture of 6 September 2012",
      publisher: "National Patient Safety Agency",
      year: 2010,
      url: "https://web.archive.org/web/20120906035305/http://www.nrls.npsa.nhs.uk/resources/?entryid45=92908",
      gradingScheme: "Patient safety alert; not graded.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["cyclizine"],
  technologies: ["syringe-drivers", "hospice-end-of-life"],
  terms: ["last-days-of-life-care"],
  related: ["care-in-the-last-days-of-life", "strong-opioids-for-cancer-pain", "opioid-switching-and-conversion"],
  gaps: [
    "The NPSA 2010 Rapid Response Report asked NHS organisations to buy ambulatory syringe drivers with rates set in millilitres per hour, alarms, lock-box covers and an event log, and to complete the change within five years. On 17 November 2026 the UK Government Web Archive still refused a script; the NPSA's web page for the alert was read from an Internet Archive capture, and the report's PDF and supporting information were not read. No step here rests on it.",
    "No source read grades any step; the procedure is national consensus guidance, and its reference list names no trial.",
    "Doses, 24-hour dose ranges, oral to subcutaneous conversion and the combination tables are not reproduced here. They are in the Scottish guideline's compatibility tables and its opioid guideline, and in local formularies; the combination tables say their figures are the largest amounts generally considered physically stable for 24 hours and are not doses to prescribe.",
    "The evidence on how often to change the extension line in palliative CSCI is limited, as the Scottish guideline says.",
    "The Scottish guideline's tables comparing pump versions are images and were not read; only the sentence above them was.",
    "The MHRA notices read are about the T34 family. No MHRA alert specific to the BD BodyGuard T was found in a gov.uk search on 17 November 2026, other than a 2025 notice about servicing software (DSI/2025/006) that asks nothing of bedside staff. Manufacturer field safety notices were not searched.",
    "The leaflet tells patients what to report and to whom, and gives no time limit beyond telling the team as soon as possible if the pump gets wet and at the earliest opportunity if the battery light changes colour.",
    "Children are outside these sources; the PELiCaN guideline for syringe pumps in children and young people was not read.",
  ],
});
