import { protocol } from "./helpers";

/*
 * Treatment-room safety for high-dose-rate (HDR) and pulsed-dose-rate brachytherapy given by a remote afterloader,
 * and the emergency procedure when the source does not return to its safe.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - IAEA Specific Safety Guide SSG-46, Radiation Protection and Safety in Medical Uses of Ionizing Radiation (2018,
 *   jointly sponsored by PAHO and WHO): full text, the PDF from www-pub.iaea.org read with pdftotext. Its radiation
 *   therapy chapter holds the HDR local rules (paras 5.107, 5.134 to 5.137, 5.151, 5.155) and the stuck-source
 *   emergency plan (paras 5.316 to 5.319).
 * - US Nuclear Regulatory Commission, 10 CFR 35.610 (safety procedures and instructions), 35.615 (safety
 *   precautions) and 35.643 (periodic spot-checks for remote afterloader units): full text from the eCFR versioner
 *   API, current to 1 November 2026.
 * - IAEA Safety Reports Series No. 17, Lessons Learned from Accidental Exposures in Radiotherapy (2000): full text,
 *   PDF read with pdftotext, for the HDR events it records (events 82 to 84).
 * - AAPM Task Group 59, High dose-rate brachytherapy treatment delivery (Kubo et al., Medical Physics 1998): abstract
 *   only, through Europe PMC; the report itself is behind the publisher's paywall and was not read.
 * - The ACR-ABS practice parameter for HDR brachytherapy could not be read: the ACR address served a JavaScript
 *   application shell to a script.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined. None of these sources grades its recommendations: two are regulation or a safety standard, one is a
 * case collection.
 */
export const hdrBrachytherapyRoomSafetyAndStuckSourceEmergency = protocol({
  id: "hdr-brachytherapy-room-safety-and-stuck-source-emergency",
  name: "HDR brachytherapy: treatment-room safety and the stuck-source emergency",
  aka: ["HDR source emergency", "stuck source procedure", "source fails to retract", "afterloader emergency procedure", "remote afterloader safety", "HDR brachytherapy safety checks", "PDR brachytherapy safety", "emergency container brachytherapy", "afterloader daily checks"],
  domain: "radiotherapy",
  tldr: "In high-dose-rate brachytherapy a machine pushes a tiny, very radioactive source along tubes into the treatment area for a few minutes, then pulls it back into a shielded safe. You are alone in the room while it runs, but staff watch and talk to you throughout. The machine is checked every treatment day, and the team practises for the rare case the source does not go back.",
  simple: "During this treatment you are alone in the room, but the team can see and hear you all the time. If you feel unwell, say so: they can stop the machine at once. The machine is checked every day before anyone is treated.",
  summary: "An HDR or pulsed-dose-rate afterloader is checked before the first treatment of each day (IAEA SSG-46 para 5.134; US 10 CFR 35.643(a)(1)): door interlocks, source-exposed lights, viewing and intercom, emergency equipment, radiation monitors, timer, clock and decayed source activity; any failure locks the console off until it is fixed (35.643(d), (e)). During delivery no one but the patient is in the room (SSG-46 5.107), the patient is watched continuously (35.615(d)), opening the door retracts the source (35.615(b)), and anyone entering confirms with a monitor that radiation has returned to background (35.615(c)). HDR rooms carry permanently installed area monitors (SSG-46 5.155).\n\nAn emergency container large enough for the whole applicator, and a kit of long-handled forceps and clamps, sits close to the patient (SSG-46 5.135, 5.316; 35.615(g)). The manufacturer's one-page emergency procedure is posted at the console with the names and numbers of the responsible physician, physicist and radiation protection officer (35.610(a)(4), (b), (c)). If the source fails to return, the sequence escalates step by step: console retract, entry with a survey meter, retract at the unit, hand crank, survey, removal of the applicator into the emergency container, survey of patient and container, removal of the patient, notification (SSG-46 5.136). Because the response must happen within minutes, IAEA asks for a radiation oncologist, a medical physicist and a radiation therapy technologist to be immediately available during every HDR application (5.317); the US rule requires the authorised user and the authorised medical physicist to be physically present at the start of every HDR treatment, and a physicist with a trained physician throughout (35.615(f)(2)). Staff drill the procedure initially and at least yearly (35.610(e)). Afterwards the engineer inspects the unit, the physicist estimates the patient's dose and the radiation protection officer the staff doses, and the event is reported to the regulator where required and to a learning system such as SAFRON or ROSEIS (SSG-46 5.319).\n\nThe accident these rules answer is real: in a case recorded by the IAEA, staff disregarded an area monitor alarm because the console read 'safe', the source had broken off inside a catheter, the patient went home with it for almost four days and died, and 94 other people were exposed (SRS-17, event 84).",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department", "theatre"],
  },
  population: "Adults and children having high-dose-rate or pulsed-dose-rate brachytherapy from a remote afterloader (cervical, endometrial, prostate, oesophageal, bronchial, breast, skin and other sites), and the staff who deliver it. Low-dose-rate permanent seed implants are a separate protocol; manual brachytherapy and the planning of the dose are not covered.",
  trigger: "A treatment day with a remote afterloader begins, or an afterloader signals that the source has not returned to its safe.",
  steps: [
    {
      action: "Before the first patient of the day, run the afterloader's routine checks",
      why: "The checks find a faulty door switch, light, monitor or timer before anyone is treated.",
      source: "iaea-ssg46",
      quote: "The HDR/PDR afterloader should undergo routine quality assurance tests at the beginning of each treatment day",
    },
    {
      action: "Check at least the door interlocks, source-exposed lights, viewing and intercom, emergency equipment, radiation monitors, timer, clock and decayed source activity; if any fails, lock the console off and do not treat",
      why: "Each of these is a safety barrier; treating with one broken removes a layer of protection.",
      source: "nrc-10cfr35-643",
      quote: "If the results of the checks required in paragraph (d) of this section indicate the malfunction of any system, a licensee shall lock the control console in the off position and not use the unit except as may be necessary to repair, replace, or check the malfunctioning system.",
    },
    {
      action: "Put the emergency container and the emergency kit (long-handled forceps, clamps) in the room, next to the patient, and make sure the container can take the whole applicator",
      why: "If the source sticks, the applicator with the source inside is pulled out and put straight into the shielded container.",
      source: "iaea-ssg46",
      quote: "The emergency container should be placed close to the patient and should be sufficiently large that it can accept the entire applicator assembly containing the source removed from the patient.",
    },
    {
      action: "Keep the written emergency procedure, with the names and telephone numbers of the responsible physician, physicist and radiation safety officer, at the console",
      why: "In an emergency there is no time to look for instructions or phone numbers.",
      source: "nrc-10cfr35-610",
      quote: "A copy of the procedures required by paragraph (a)(4) of this section must be physically located at the unit console.",
    },
    {
      action: "Check the patient, the prescription and the treatment plan against each other independently before the source is driven out",
      why: "In a recorded case the physicist picked up the wrong patient's chart at the console and the wrong programme was run.",
      source: "iaea-srs17",
      quote: "Insufficient safety provisions (defence in depth): There was no independent check of the information used for the treatment.",
    },
    {
      action: "Make sure the trained staff are there: for HDR, the radiation oncologist and the physicist present when treatment starts, and a physicist with a trained physician throughout (US rule); a radiation oncologist, physicist and radiation therapy technologist immediately available during every application (IAEA)",
      why: "If the source sticks, the response has to happen within minutes, by people trained to do it.",
      source: "iaea-ssg46",
      quote: "In HDR applications, the short response time (minutes) required for contingency actions imposes the need for the immediate availability of a radiological medical practitioner, a medical physicist and a medical radiation technologist during all applications.",
    },
    {
      action: "During delivery, let no one but the patient stay in the room, and watch and listen to the patient throughout on camera and intercom",
      why: "Staff are protected by the shielded walls, and the patient is never out of sight or earshot.",
      source: "iaea-ssg46",
      quote: "For external beam radiotherapy, HDR and PDR brachytherapy, no one should be in the treatment room during the delivery of treatment, except the patient being treated.",
    },
    {
      action: "On entering the room after treatment, confirm with a radiation monitor that levels are back to background, and treat any monitor alarm as real until proved otherwise, even if the console says the source is safe",
      why: "In a fatal accident the console read 'safe' while the source had broken off inside the patient; the alarm was right and was ignored.",
      source: "iaea-srs17",
      quote: "Staff ignored a monitor alarm and assumed that a 'safe' indication on the console was correct (previous false alarms of the external monitor contributed to this assumption).",
    },
    {
      action: "If the source does not return, follow the posted sequence and move to the next step only if the last one failed: emergency retract at the console; enter with a survey meter; retract at the unit; crank the source back by hand; survey; remove the applicator into the emergency container; survey the patient and the container; take the patient out of the room",
      why: "Each step is quicker and safer than the next, and each survey shows whether the source is back in its safe.",
      source: "iaea-ssg46",
      quote: "Manufacturers provide suggested emergency procedures to be implemented if the source fails to return to the safe.",
    },
    {
      action: "After the event, have the engineer inspect the unit, the physicist estimate the patient's dose and clear the unit for reuse, and the radiation protection officer estimate staff doses; record everything, notify the regulator where required and report to a learning system",
      why: "The patient needs to know what dose they received, and other departments learn from the event.",
      source: "iaea-ssg46",
      quote: "The medical physicist should make an assessment of the patient doses arising from the incident, and should check the machine for re-use after the engineer has completed the inspection and any associated maintenance.",
    },
    {
      action: "Drill the emergency procedure with every operator, physicist and physician when they start and at least once a year",
      why: "A procedure used once in years is only reliable if it has been practised.",
      source: "nrc-10cfr35-610",
      quote: "A licensee shall ensure that operators, authorized medical physicists, and authorized users participate in drills of the emergency procedures, initially and at least annually.",
    },
  ],
  bestInClass: {
    statement: "A daily pre-treatment check of the afterloader and its room (IAEA SSG-46 5.134; 10 CFR 35.643), an emergency container and kit beside the patient (SSG-46 5.135; 35.615(g)), the manufacturer's escalating stuck-source procedure posted at the console (SSG-46 5.136; 35.610), continuous observation with no one else in the room, a monitor check on every entry, and annual drills (35.610(e); SSG-46 5.316). The two frameworks differ on staffing: IAEA asks for a radiation oncologist, a physicist and a radiation therapy technologist immediately available during all HDR applications; the US rule requires the authorised user and physicist to be physically present when each HDR treatment starts and a physicist with a trained physician to be present throughout. Neither grades its requirements: one is a safety standard and the other regulation, and the evidence behind both is the record of accidents.",
    sources: ["iaea-ssg46", "nrc-10cfr35-610", "nrc-10cfr35-615", "nrc-10cfr35-643", "iaea-srs17"],
  },
  variants: [
    {
      name: "US regulation: physician and physicist physically present",
      differs: "10 CFR 35.615(f)(2) requires an authorised user and an authorised medical physicist to be physically present during the initiation of every HDR treatment, and a physicist plus an authorised user or trained physician to be physically present during its continuation. Medium and pulsed-dose-rate units need the physicist and a trained physician present at initiation and immediately available during continuation. The IAEA guide asks for immediate availability rather than physical presence.",
      evidence: "Regulation, not graded. Its rationale, the minutes available to act, is the one SSG-46 gives.",
      sources: ["nrc-10cfr35-615", "iaea-ssg46"],
    },
    {
      name: "Manufacturer's unit-specific emergency card",
      differs: "Each afterloader's maker supplies its own single-page emergency sequence, which is what is posted at the console. IAEA gives the general order of steps; the unit's own card governs the details, such as where the emergency retract button and hand crank are.",
      evidence: "SSG-46 says these procedures are specific to the unit and assume the applicator is intact.",
      sources: ["iaea-ssg46"],
    },
    {
      name: "AAPM Task Group 59 (US professional report, 1998)",
      differs: "Sets out HDR procedures for staffing and training, treatment-specific quality assurance and emergency procedures, with an extensive quality assurance checklist. Only its abstract was read here.",
      evidence: "A professional consensus report; its content was not read beyond the abstract and no step rests on it.",
      sources: ["aapm-tg59"],
    },
  ],
  grades: [
    { claim: "Daily quality assurance tests of the HDR or PDR afterloader", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46" },
    { claim: "Spot checks before the first HDR use each day, covering interlocks, lights, intercom, emergency equipment, monitors, timer, clock and source activity", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-643", quote: "Before the first use of a high dose-rate, medium dose-rate, or pulsed dose-rate remote afterloader unit on a given day;" },
    { claim: "Emergency response equipment near each treatment room for a source left unshielded or lodged in the patient", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-615", quote: "A licensee shall have applicable emergency response equipment available near each treatment room to respond to a source—" },
    { claim: "Anyone entering the room confirms with a monitor that radiation has returned to ambient levels", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-615", quote: "A licensee shall require any individual entering the treatment room to assure, through the use of appropriate radiation monitors, that radiation levels have returned to ambient levels." },
    { claim: "Staff trained on the stuck-source procedure and taking part in drills", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "Staff should be trained on how to apply such a procedure and should regularly participate in drills and exercises." },
  ],
  sources: [
    {
      key: "iaea-ssg46",
      label: "Radiation Protection and Safety in Medical Uses of Ionizing Radiation, Specific Safety Guide No. SSG-46",
      publisher: "International Atomic Energy Agency, jointly sponsored by PAHO and WHO",
      year: 2018,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf",
      gradingScheme: "An IAEA Safety Guide: recommendations ('should') on how to meet the Safety Requirements (GSR Part 3); not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-610",
      label: "10 CFR 35.610 Safety procedures and instructions for remote afterloader units, teletherapy units, and gamma stereotactic radiosurgery units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2018,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.610",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-615",
      label: "10 CFR 35.615 Safety precautions for remote afterloader units, teletherapy units, and gamma stereotactic radiosurgery units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2002,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.615",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-643",
      label: "10 CFR 35.643 Periodic spot-checks for remote afterloader units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2002,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.643",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "iaea-srs17",
      label: "Lessons Learned from Accidental Exposures in Radiotherapy, Safety Reports Series No. 17 (section 2.10, high dose rate brachytherapy)",
      publisher: "International Atomic Energy Agency",
      year: 2000,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1084_web.pdf",
      gradingScheme: "A collection of reported accidents with their causes and remedies; no recommendations are graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg59",
      label: "High dose-rate brachytherapy treatment delivery: report of the AAPM Radiation Therapy Committee Task Group No. 59",
      publisher: "American Association of Physicists in Medicine (Kubo et al., Medical Physics)",
      year: 1998,
      url: "https://doi.org/10.1118/1.598232",
      doi: "10.1118/1.598232",
      gradingScheme: "Professional task group report; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "acr-abs-hdr",
      label: "ACR-ABS Practice Parameter for the Performance of High-Dose-Rate Brachytherapy",
      publisher: "American College of Radiology and American Brachytherapy Society",
      year: 2020,
      url: "https://www.acr.org/-/media/ACR/Files/Practice-Parameters/HDR-Brachy.pdf",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["hdr-brachytherapy", "brachytherapy-afterloaders", "brachytherapy"],
  terms: ["brachytherapy-term"],
  cancers: ["cervical"],
  institutions: ["iaea"],
  related: ["radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "No source read grades these steps by evidence. They are a safety standard (IAEA), regulation (NRC) and lessons from accidents (IAEA SRS-17); there are no trials of emergency procedures, and stuck-source events are too rare to compare approaches.",
    "The AAPM TG-59 report was read only as its abstract, and the ACR-ABS HDR practice parameter could not be read (the ACR address served a JavaScript shell to a script). Their checklists are not reproduced here.",
    "UK requirements (the Ionising Radiations Regulations 2017 and their approved code of practice, and IPEM guidance on afterloader quality control) were not read, so the UK position on staffing during HDR delivery is not stated.",
    "The year given for 10 CFR 35.610 is that of its latest amendment printed in the section (83 FR 33110, July 2018); 35.615 and 35.643 print no amendment history in the text read, and the year given for them is that of the 2002 rule (67 FR 20370) which 35.610 cites as its origin.",
    "SRS-17 dates from 2000; newer accident reports (ROSEIS, SAFRON, RO-ILS) were not searched.",
  ],
});
