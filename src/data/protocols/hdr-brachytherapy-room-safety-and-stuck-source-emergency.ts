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
 *
 * Second accuracy pass, 17 November 2026. Re-fetched raw and re-read: the SSG-46 PDF and the SRS-17 PDF (both with
 * pdftotext -layout), and 10 CFR 35.2, 35.610, 35.615 and 35.643 from the eCFR versioner API (issue of 12 November
 * 2026, tags stripped by script). Every quote was matched by script against those texts after normalising white
 * space only. The TG-59 DOI was resolved again through Crossref and Europe PMC (abstract only; the AAPM's own PDF
 * address answered 403). The ACR address still served an application shell. The IAEA publication page and the NRC's
 * own section pages answered 403, so no check for a successor to SSG-46 and no amendment history for 35.615 or
 * 35.643 could be read. Changed: each rule now names its jurisdiction; the posted procedure is no longer described
 * as the manufacturer's under the US rule; drills are "regular" for IAEA and annual only in the US rule; the stuck
 * source sequence now carries every step the guide lists; reasons no source states were removed; the step on
 * conflicting signals now quotes the SRS-17 lesson (section 4.6.1.1) and the monitor check on entry is its own
 * step under the US rule; SSG-46 para 5.35 supports seeing and speaking to the patient.
 */
export const hdrBrachytherapyRoomSafetyAndStuckSourceEmergency = protocol({
  id: "hdr-brachytherapy-room-safety-and-stuck-source-emergency",
  name: "HDR brachytherapy: treatment-room safety and the stuck-source emergency",
  aka: ["HDR source emergency", "stuck source procedure", "source fails to retract", "afterloader emergency procedure", "remote afterloader safety", "HDR brachytherapy safety checks", "PDR brachytherapy safety", "emergency container brachytherapy", "afterloader daily checks"],
  domain: "radiotherapy",
  tldr: "In high-dose-rate brachytherapy a machine drives a very radioactive source along tubes into the treatment area, then draws it back into a shielded safe. No one else is in the room while it runs, but staff can see you and speak to you from outside. The machine is checked at the start of each treatment day, and staff practise what to do if the source does not go back.",
  simple: "During this treatment you are alone in the room, but the team can see you and you can speak to each other through an intercom. They can draw the source back from the control desk. The machine is checked at the start of each treatment day.",
  summary: "An HDR or pulsed-dose-rate afterloader should have routine quality assurance tests at the beginning of each treatment day (IAEA SSG-46 para 5.134); the US rule requires spot-checks before its first use on a given day (10 CFR 35.643(a)(1)), covering at a minimum the door interlocks, source-exposed lights, viewing and intercom systems, emergency response equipment, the radiation monitors that show the source position, timer accuracy, the clock and the decayed source activity in the unit's computer (35.643(d)). If any is malfunctioning the console is locked off and the unit is not used except to repair, replace or check it (35.643(e)). During delivery no one but the patient should be in the room (SSG-46 5.107). Staff should have a clear view of the patient and be able to speak to them by intercom (SSG-46 5.35); the US rule requires viewing and intercom systems that permit continuous observation (35.615(d)), a door interlock that shields the source when a door is opened (35.615(b)), and that anyone entering assures with a radiation monitor that levels have returned to ambient (35.615(c)). HDR rooms should have permanently installed area monitors (SSG-46 5.155).\n\nAn emergency container large enough for the whole applicator should be in the treatment room close to the patient, with a kit of surgical clamps and long-handled forceps (SSG-46 5.135, 5.316); the US rule requires emergency response equipment near each treatment room (35.615(g)). Under the US rule the licensee's written emergency procedure is kept at the console, and it carries the names and telephone numbers of the authorised users, the authorised medical physicist and the Radiation Safety Officer (35.610(a)(4), (b), (c)). IAEA notes that manufacturers supply a suggested emergency procedure, generally a single page suitable for posting, which assumes the applicator is intact. In general each step is taken only if the one before did not recover the source: an error message and alarms at the console; emergency retract at the console; entry with a portable survey meter (opening the door activates the interlock that retracts the source); a check of radiation levels in the room; retract at the unit; hand crank; survey of the patient and the afterloader; removal of the applicator into the emergency container; survey of the patient and the container; removal of the patient with a further survey; then informing the maintenance personnel, the radiation protection officer and, depending on national rules, the regulator (SSG-46 5.136). Because the response time is minutes, IAEA says a radiological medical practitioner (typically a radiation oncologist), a medical physicist and a medical radiation technologist need to be immediately available during all HDR applications (5.317, 5.7). The US rule requires an authorised user and an authorised medical physicist to be physically present when every HDR treatment starts, and the physicist with either an authorised user or a trained physician under an authorised user's supervision while it continues (35.615(f)(2)). IAEA asks that staff regularly take part in drills (5.316); the US rule sets drills initially and at least annually (35.610(e)). Afterwards the engineer should inspect the unit, the physicist assess the patient's dose and the radiation protection officer the staff doses, the assessments should be recorded, the regulator may need to be notified depending on the State's regulations, and information should go to a learning system such as SAFRON or ROSEIS (SSG-46 5.319).\n\nThe accident these rules guard against has happened: in a case recorded by the IAEA, staff disregarded an area monitor alarm because the console read 'safe'. The source had broken off inside a catheter, the patient was taken back to a nursing home with it in place for almost four days and died shortly after it came out, and 94 people were exposed (SRS-17, event 84).",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department", "theatre"],
  },
  population: "People having high-dose-rate or pulsed-dose-rate brachytherapy from a remote afterloader, and the staff who deliver it. The sources read do not limit these rules by age or by the part of the body treated. Staffing and legal requirements differ by country: the regulation quoted here is that of the United States. Low-dose-rate permanent seed implants are a separate protocol; manual brachytherapy and the planning of the dose are not covered.",
  trigger: "A treatment day with a remote afterloader begins, or an afterloader signals that the source has not returned to its safe.",
  steps: [
    {
      action: "At the beginning of each treatment day, run the afterloader's routine quality assurance tests",
      why: "The IAEA guide asks for these tests at the start of each treatment day; the US rule requires spot-checks before the first use on a given day.",
      source: "iaea-ssg46",
      quote: "The HDR/PDR afterloader should undergo routine quality assurance tests at the beginning of each treatment day",
    },
    {
      action: "Under the US rule, check at a minimum the door interlocks, source-exposed lights, viewing and intercom systems, emergency response equipment, the radiation monitors that show the source position, timer accuracy, the clock and the decayed source activity; if any is malfunctioning, lock the console off and do not use the unit except to repair, replace or check it",
      why: "The US regulation lists these as the least the daily spot-check must cover and bars treatment while any of them is malfunctioning.",
      source: "nrc-10cfr35-643",
      quote: "If the results of the checks required in paragraph (d) of this section indicate the malfunction of any system, a licensee shall lock the control console in the off position and not use the unit except as may be necessary to repair, replace, or check the malfunctioning system.",
    },
    {
      action: "Keep an emergency container in the treatment room, close to the patient and large enough to take the whole applicator with the source in it, and an emergency kit with surgical clamps and long-handled forceps",
      why: "If the source does not return to its safe, the clamps and forceps are for handling the guide tubes and applicators, and the applicator with the source inside goes into the container.",
      source: "iaea-ssg46",
      quote: "The emergency container should be placed close to the patient and should be sufficiently large that it can accept the entire applicator assembly containing the source removed from the patient.",
    },
    {
      action: "Under the US rule, keep the written emergency procedure at the console, with the names and telephone numbers of the authorised users, the authorised medical physicist and the Radiation Safety Officer",
      why: "The US regulation requires the operator to have the procedure, and the people to contact if the unit behaves abnormally, at the console.",
      source: "nrc-10cfr35-610",
      quote: "A copy of the procedures required by paragraph (a)(4) of this section must be physically located at the unit console.",
    },
    {
      action: "Have a second person independently check the information entered for the treatment, including that it is this patient's, before the source is driven out",
      why: "In a recorded case the physicist picked up another patient's chart lying next to the control panel and entered the wrong programme; the IAEA report names the missing independent check as a contributing factor.",
      source: "iaea-srs17",
      quote: "Insufficient safety provisions (defence in depth): There was no independent check of the information used for the treatment.",
    },
    {
      action: "Make sure the trained staff are there. IAEA: a radiological medical practitioner (typically a radiation oncologist), a medical physicist and a medical radiation technologist immediately available during all HDR applications. US rule: an authorised user and an authorised medical physicist physically present when each HDR treatment starts, and the physicist with an authorised user or a trained physician under an authorised user's supervision physically present while it continues",
      why: "IAEA's reason is that the response to a stuck source has to happen within minutes; it adds that each of these professionals should be educated and trained in the emergency procedures.",
      source: "iaea-ssg46",
      quote: "In HDR applications, the short response time (minutes) required for contingency actions imposes the need for the immediate availability of a radiological medical practitioner, a medical physicist and a medical radiation technologist during all applications.",
    },
    {
      action: "During delivery, let no one but the patient stay in the room, and keep the patient in view and in voice contact from the control desk",
      why: "The guide says all attending staff should be in shielded areas, and that staff should have a clear and full view of the patient and be able to speak to them by intercom or another system.",
      source: "iaea-ssg46",
      quote: "For external beam radiotherapy, HDR and PDR brachytherapy, no one should be in the treatment room during the delivery of treatment, except the patient being treated.",
    },
    {
      action: "Under the US rule, on entering the treatment room confirm with a radiation monitor that levels have returned to ambient",
      why: "In the fatal accident recorded by the IAEA, the report lists among the contributing factors that the patient and the work area were not monitored before and after treatment.",
      source: "nrc-10cfr35-615",
      quote: "A licensee shall require any individual entering the treatment room to assure, through the use of appropriate radiation monitors, that radiation levels have returned to ambient levels.",
    },
    {
      action: "When a radiation monitor alarms and the console reads safe, investigate, and assume the alarm is right until it is proved otherwise",
      why: "In a fatal accident the console read 'safe' while the source had broken off inside the patient; staff assumed the area monitor was malfunctioning.",
      source: "iaea-srs17",
      quote: "Inconsistent signals are investigated and the one indicating the more serious consequence is assumed to be correct until proven otherwise.",
    },
    {
      action: "If the source does not return, follow the unit's own posted procedure. The general sequence, each step taken only if the one before did not recover the source: emergency retract at the console; enter with a portable survey meter; check the radiation levels in the room; retract at the unit; crank the source back by hand; survey the patient and the afterloader; remove the applicator into the emergency container; survey the patient and the container; take the patient out and survey again; inform the maintenance personnel, the radiation protection officer and, where national rules say so, the regulator",
      why: "The manufacturer's procedure is specific to the unit and assumes the applicator is intact. The surveys confirm that the source is in the safe, or that it is in the emergency container and not in the patient.",
      source: "iaea-ssg46",
      quote: "Manufacturers provide suggested emergency procedures to be implemented if the source fails to return to the safe.",
    },
    {
      action: "After the event, have the engineer inspect the unit, the physicist assess the patient's dose and check the unit for reuse once the engineer has finished, and the radiation protection officer assess the doses to staff; record the assessments, notify the regulator if the State's regulations require it, and send information to a safety learning system",
      why: "The guide adds that medical attention, as necessary, should be provided to those involved, in keeping with the doses they received.",
      source: "iaea-ssg46",
      quote: "The medical physicist should make an assessment of the patient doses arising from the incident, and should check the machine for re-use after the engineer has completed the inspection and any associated maintenance.",
    },
    {
      action: "Drill the emergency procedure with operators, physicists and authorised users: initially and at least once a year under the US rule, regularly under the IAEA guide",
      why: "IAEA says staff should be trained on how to apply the procedure and should regularly take part in drills and exercises.",
      source: "nrc-10cfr35-610",
      quote: "A licensee shall ensure that operators, authorized medical physicists, and authorized users participate in drills of the emergency procedures, initially and at least annually.",
    },
  ],
  bestInClass: {
    statement: "A check of the afterloader and its room at the start of each treatment day (IAEA SSG-46 5.134; 10 CFR 35.643), an emergency container close to the patient with an emergency kit in the room (SSG-46 5.135, 5.316; the US rule asks for emergency response equipment near each treatment room, 35.615(g)), a written stuck-source procedure at the console (the licensee's own under 35.610; IAEA describes the manufacturer's single-page sequence, 5.136), no one but the patient in the room and the patient in view and in voice contact (SSG-46 5.107, 5.35; 35.615(d)), a monitor check on entry (35.615(c)), and drills, regular under IAEA (5.316) and at least annual under the US rule (35.610(e)). The two frameworks differ on staffing: IAEA says a radiological medical practitioner (typically a radiation oncologist), a medical physicist and a medical radiation technologist need to be immediately available during all HDR applications; the US rule requires an authorised user and an authorised medical physicist to be physically present when each HDR treatment starts, and the physicist with an authorised user or a supervised, trained physician to be physically present while it continues. Neither grades its requirements: one is a safety standard and the other a regulation that binds only in the United States.",
    sources: ["iaea-ssg46", "nrc-10cfr35-610", "nrc-10cfr35-615", "nrc-10cfr35-643", "iaea-srs17"],
  },
  variants: [
    {
      name: "US regulation: physician and physicist physically present",
      differs: "10 CFR 35.615(f)(2) requires an authorised user and an authorised medical physicist to be physically present during the initiation of every HDR treatment, and a physicist plus an authorised user or trained physician to be physically present during its continuation. For medium and pulsed-dose-rate units it requires the physicist and either an authorised user or a supervised, trained physician to be physically present at initiation; during continuation the physicist and either an authorised user or a supervised individual trained to remove the source applicators must be immediately available. An authorised user is, in the rule's definitions (35.2), a physician, dentist or podiatrist who meets its training requirements or is named on the licence or permit. The IAEA guide asks for immediate availability rather than physical presence.",
      evidence: "Regulation, not graded; the text of the rule gives no reason. SSG-46 gives its own: the response time is minutes.",
      sources: ["nrc-10cfr35-615", "nrc-10cfr35-2", "iaea-ssg46"],
    },
    {
      name: "Manufacturer's unit-specific emergency card",
      differs: "IAEA says manufacturers provide suggested emergency procedures, generally a short single-page synopsis suitable for posting in an appropriate place. IAEA gives the general order of steps; the procedures themselves are specific to the actual afterloading unit.",
      evidence: "SSG-46 paras 5.136 and 5.318, which also say these procedures assume that the physical integrity of the applicator is maintained.",
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
    { claim: "Staff trained on the stuck-source procedure and regularly taking part in drills", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "Staff should be trained on how to apply such a procedure and should regularly participate in drills and exercises." },
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
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-610",
      label: "10 CFR 35.610 Safety procedures and instructions for remote afterloader units, teletherapy units, and gamma stereotactic radiosurgery units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2018,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.610",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-615",
      label: "10 CFR 35.615 Safety precautions for remote afterloader units, teletherapy units, and gamma stereotactic radiosurgery units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2002,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.615",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-643",
      label: "10 CFR 35.643 Periodic spot-checks for remote afterloader units",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2002,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-H/section-35.643",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-2",
      label: "10 CFR 35.2 Definitions (authorized user, authorized medical physicist, Radiation Safety Officer, remote afterloader dose-rate classes)",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2018,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-A/section-35.2",
      gradingScheme: "Federal regulation; definitions are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "iaea-srs17",
      label: "Lessons Learned from Accidental Exposures in Radiotherapy, Safety Reports Series No. 17 (section 2.10, high dose rate brachytherapy; section 4.6.1, problems of human-machine interface)",
      publisher: "International Atomic Energy Agency",
      year: 2000,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1084_web.pdf",
      gradingScheme: "A collection of reported accidents with their causes and remedies; no recommendations are graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "acr-abs-hdr",
      label: "ACR-ABS Practice Parameter for the Performance of High-Dose-Rate Brachytherapy",
      publisher: "American College of Radiology and American Brachytherapy Society",
      year: 2020,
      url: "https://www.acr.org/-/media/ACR/Files/Practice-Parameters/HDR-Brachy.pdf",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["hdr-brachytherapy", "brachytherapy-afterloaders", "brachytherapy"],
  terms: ["brachytherapy-term"],
  cancers: ["cervical"],
  institutions: ["iaea"],
  related: ["radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "No source read grades these steps by evidence. They are a safety standard (IAEA), regulation (NRC) and lessons from accidents (IAEA SRS-17), and none of them cites a trial of an emergency procedure.",
    "The US rules quoted (10 CFR Part 35) bind licensees in the United States only. The IAEA guide is international and words its points as recommendations ('should'). No other country's regulation was read.",
    "The AAPM TG-59 report was read only as its abstract: on 17 November 2026 the publisher's copy was behind a paywall and the AAPM's own address for the report answered 403. The ACR-ABS HDR practice parameter could not be read on 11 or 17 November 2026 (the ACR address served a JavaScript shell to a script), so its year, its title and whether a newer revision exists are not confirmed. Their checklists are not reproduced here.",
    "UK requirements (the Ionising Radiations Regulations 2017 and their approved code of practice, and IPEM guidance on afterloader quality control) were not read, so the UK position on staffing during HDR delivery is not stated.",
    "The year given for 10 CFR 35.610 and 35.2 is that of the latest amendment printed in each section (83 FR 33110 and 83 FR 33102, July 2018). 35.615 and 35.643 print no amendment history in the text read, and the year given for them is that of the 2002 rule (67 FR 20370) which 35.610 cites as its origin; the eCFR version list shows no change to either since its earliest entry, 30 December 2016. On 17 November 2026 the NRC's own pages for these sections answered 403, so their amendment history was not read.",
    "On 17 November 2026 the IAEA page for SSG-46 answered a browser check, so whether a revision has replaced the 2018 edition could not be confirmed; the 2018 PDF was still served at its address.",
    "The sources read do not say how often a source fails to return, and none describes what the patient should do; the patient summary here is limited to what the rules require of the room and the staff.",
    "SRS-17 dates from 2000; newer accident reports (ROSEIS, SAFRON, RO-ILS) were not searched.",
  ],
});
