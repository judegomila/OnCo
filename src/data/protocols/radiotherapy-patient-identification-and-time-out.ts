import { protocol } from "./helpers";

/*
 * Identifying the patient, the plan and the side before each radiotherapy treatment, and the pre-treatment time-out.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA and BIR, 2008): full text. The RCR's own PDF address returned
 *   404 to a script; the PDF was read from the Internet Archive's capture of it (16 September 2025) with pdftotext. No
 *   later edition was found.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: full text from
 *   legislation.gov.uk.
 * - WHO Radiotherapy Risk Profile, technical manual (WHO/IER/PSP/2008.12): full text, read from the Internet Archive's
 *   capture of the WHO PDF (the current WHO IRIS page serves a JavaScript application to a script). Its risk tables
 *   break into fragments as text; only a contiguous cell is quoted.
 * - AAPM Task Group 100 report, application of risk analysis methods to radiation therapy quality management (Huq et
 *   al., Med Phys 2016): full text, from the PubMed Central article page (PMC4985013). TG-100 is a method with worked
 *   examples, not a standard; its example checklists are quoted as examples.
 * - ASTRO, Safety is No Accident (2019): not reachable. The census for this round recorded a bot challenge (403) from
 *   astro.org; it was not retried.
 *
 * The DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined, nothing else.
 */
export const radiotherapyPatientIdentificationAndTimeOut = protocol({
  id: "radiotherapy-patient-identification-and-time-out",
  name: "Patient identification and pre-treatment time-out in radiotherapy",
  aka: ["radiotherapy ID check", "patient ID check at the linac", "radiotherapy time-out", "pause and check radiotherapy", "wrong patient radiotherapy", "wrong site radiotherapy", "correct side check radiotherapy", "positive patient identification"],
  domain: "radiotherapy",
  tldr: "Every time you come for radiotherapy, even on the last day and even when the staff know you well, they will ask you to say your full name, date of birth and often your address, rather than asking you to confirm them. They also check that the plan on the machine is yours and that the right side is being treated. This is one of the most important safety checks in radiotherapy.",
  simple: "Each day the radiographers will ask you to say your name, date of birth and address. They do this every time, on purpose, so the right treatment goes to the right person.",
  summary: "In the UK the check is a legal requirement: IR(ME)R 2017 Schedule 2 requires the employer's written procedures to include procedures to identify correctly the individual to be exposed. Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA, BIR, 2008) sets the method: open questions that elicit an active response (full name, date of birth, address), never closed yes/no questions; formal identification for every procedure even when the patient is well known, because mistakes are more likely later in treatment than at the beginning; a specified procedure for patients who cannot identify themselves; and confirmation of the correct side at set-up for each fraction. It recommends exploring technology such as bar codes, photographs in the record and verify system and biometrics. The WHO Radiotherapy Risk Profile (2008) rates incorrect patient identification as a high-impact risk at every stage and lists open questions with an active response, a minimum of three points of identification, photo identification and a unique identifier as solutions.\n\nThe time-out is less settled. AAPM TG-100 (2016) includes two forms of identification and a time-out in its example day-1 checklist, notes that the Joint Commission requires a time-out for procedures, and says there is no specific guidance requiring one at every treatment session, though it is a good idea; at day 1, it suggests the radiation oncologist take part. ASTRO's Safety is No Accident (2019) could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Every patient at every radiotherapy planning and treatment attendance, external beam and brachytherapy, adults and children. Children and adults who cannot identify themselves need the department's own written alternative (for example a parent, carer or wristband), which the sources require but do not specify.",
  trigger: "Each time a patient is called for a planning scan or a treatment, before any exposure.",
  steps: [
    {
      action: "Have a written procedure for identifying patients before any exposure, including what to do when a patient cannot identify themselves",
      why: "In the UK this is the law, and a written procedure means every member of staff does the check the same way.",
      source: "irmer-2017",
      quote: "to identify correctly the individual to be exposed to ionising radiation;",
      grade: "Statutory requirement (IR(ME)R 2017, Schedule 2, 1(a))",
    },
    {
      action: "Ask open questions the patient must answer in their own words (full name, date of birth, address), never questions they can say yes to",
      why: "A person who is nervous, hard of hearing or expecting to be called can easily say yes to someone else's name; saying their own details out loud avoids that.",
      source: "towards-safer-radiotherapy-2008",
      quote: "It is vital that identification verification is performed by asking open questions, which elicit a positive response from the patient (see Table 5.1).",
      grade: "Recommendation (consensus of RCR, SCoR, IPEM, NPSA and BIR)",
    },
    {
      action: "Match the answers against the treatment record on the machine every time, using at least three identifiers, a unique patient number and the photograph in the record where available",
      why: "Checking several details against the record, not just the name, catches two patients with similar names and records opened in error.",
      source: "who-risk-profile-2008",
      quote: "ID check open questions, eliciting an active response",
      grade: "Listed solution to a high-impact risk",
    },
    {
      action: "Do the full check at every attendance, including the last, even when the patient is well known to the staff",
      why: "Familiarity makes people skip the check, and errors are more likely later in a course than at the start.",
      source: "towards-safer-radiotherapy-2008",
      quote: "Formal identification must be carried out for all procedures even when the patient is well known.",
      grade: "Recommendation (consensus)",
    },
    {
      action: "Confirm the side and site to be treated at set-up for every fraction, and confirming it with the patient is good practice",
      why: "Treating the wrong side is one of the errors a patient can help prevent.",
      source: "towards-safer-radiotherapy-2008",
      quote: "Treatment of the correct side should also be confirmed at the set-up for each fraction during a course of treatment.",
      grade: "Recommendation (consensus)",
    },
    {
      action: "Before the first treatment, pause as a team to confirm the patient, the plan loaded on the machine, the site and side, and any changes in the prescription",
      why: "A short shared check before the first fraction catches the wrong plan or an unsigned change before any dose is given.",
      source: "aapm-tg100-2016",
      quote: "Patient and treatment plan to be used are identified correctly using two forms of identification check and time-out procedure",
      grade: "Example checklist item (TG-100 is a method, not a standard)",
    },
    {
      action: "Consider a time-out at every treatment session, not only the first",
      why: "The same errors can happen on any day; no standard read requires it, but the AAPM report calls it a good idea.",
      source: "aapm-tg100-2016",
      quote: "Although there is no specific guidance that a time out should be required for each treatment session, it is a good idea.",
      grade: "Suggestion in a task group report",
    },
  ],
  bestInClass: {
    statement: "Positive identification by open questions eliciting an active response (name, date of birth, address) against the record on the machine, at every attendance including when the patient is well known, with a written alternative for patients who cannot identify themselves, and confirmation of the treated side at each fraction (Towards Safer Radiotherapy 2008; a legal requirement in the UK under IR(ME)R 2017; WHO 2008 adds a minimum of three identifiers, photo identification and a unique identifier). A time-out before the first fraction is in the AAPM TG-100 example checklist; whether one is needed at every fraction is not settled by any source read, TG-100 calling it a good idea without a requirement. The sources do not disagree; they differ in how much they specify.",
    sources: ["towards-safer-radiotherapy-2008", "irmer-2017", "who-risk-profile-2008", "aapm-tg100-2016"],
  },
  variants: [
    {
      name: "Biometric or bar-code identification linked to the treatment record",
      differs: "A fingerprint, bar-coded wristband or card calls up the patient's record and confirms the match at the room door.",
      evidence: "Towards Safer Radiotherapy describes one department using fingerprint identification at the department entrance and the room entrance, and bar-coded wristbands in two UK departments, and recommends that such technology be explored; it notes that these systems compel the identification step. No comparative study was read.",
      sources: ["towards-safer-radiotherapy-2008"],
    },
    {
      name: "Patient photograph in the record and verify system",
      differs: "The set-up screen shows a photograph of the patient taken at planning, checked against the person on the couch.",
      evidence: "Named by Towards Safer Radiotherapy as a feature of some record and verify systems and by WHO 2008 as a solution (photo ID); no study of its effect was read.",
      sources: ["towards-safer-radiotherapy-2008", "who-risk-profile-2008"],
    },
    {
      name: "Day-one time-out with the radiation oncologist",
      differs: "The doctor joins the radiographers at the machine for the first treatment to confirm the plan matches their intent.",
      evidence: "Suggested by AAPM TG-100 as a guard against deviations from physician intent; not required by any source read.",
      sources: ["aapm-tg100-2016"],
    },
  ],
  grades: [
    { claim: "Correct patient identification at every step, with procedures eliciting an active response; explore new technology", grade: "Recommendation (consensus)", source: "towards-safer-radiotherapy-2008", quote: "Correct patient identification is essential at every step. Procedures eliciting an active response from the patient must be used. The use of new technology to assist patient identification should be explored." },
    { claim: "Errors are more likely later in treatment than at the beginning", grade: "Observation from UK incident data", source: "towards-safer-radiotherapy-2008", quote: "Mistakes are more likely later in treatment than at the beginning." },
    { claim: "The employer must specify the steps for patients who cannot identify themselves", grade: "Recommendation (consensus)", source: "towards-safer-radiotherapy-2008", quote: "Patients who cannot identify themselves pose particular problems and the employer must specify the steps to be taken in these circumstances." },
    { claim: "Written procedures to identify correctly the individual to be exposed", grade: "Statutory requirement", source: "irmer-2017" },
  ],
  sources: [
    {
      key: "towards-safer-radiotherapy-2008",
      label: "Towards Safer Radiotherapy",
      publisher: "The Royal College of Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine, National Patient Safety Agency and British Institute of Radiology",
      year: 2008,
      url: "https://www.rcr.ac.uk/media/zbtjvtsr/rcr-publications_towards-safer-radiotherapy_april-2008.pdf",
      gradingScheme: "Not graded: each section ends with a boxed recommendation agreed by the five bodies.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "irmer-2017",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017, Schedule 2: Employer's procedures",
      publisher: "UK Government (SI 2017/1322)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2/made",
      gradingScheme: "Law: the employer's written procedures must include these.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "who-risk-profile-2008",
      label: "Radiotherapy Risk Profile: technical manual (WHO/IER/PSP/2008.12)",
      publisher: "World Health Organization",
      year: 2008,
      url: "https://web.archive.org/web/2015/http://www.who.int/patientsafety/activities/technical/radiotherapy_risk_profile.pdf",
      gradingScheme: "Risks rated by impact (high, medium, low) with potential solutions listed; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg100-2016",
      label: "The report of Task Group 100 of the AAPM: application of risk analysis methods to radiation therapy quality management",
      publisher: "American Association of Physicists in Medicine (Medical Physics; Huq et al.)",
      year: 2016,
      url: "https://doi.org/10.1118/1.4947547",
      doi: "10.1118/1.4947547",
      gradingScheme: "A method (failure modes and effects analysis) with example checklists; not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "astro-safety-2019",
      label: "Safety is No Accident: a framework for quality radiation oncology care (2019 edition)",
      publisher: "American Society for Radiation Oncology",
      year: 2019,
      url: "https://www.astro.org/patient-care-and-research/patient-safety/safety-is-no-accident",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["imrt-igrt"],
  terms: ["radiotherapy"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry"],
  upgrades: [],
  gaps: [
    "ASTRO's Safety is No Accident (2019), the main US framework, could not be read (bot challenge), and the Joint Commission Universal Protocol is reported here only as TG-100 describes it.",
    "Towards Safer Radiotherapy dates from 2008 and the WHO Radiotherapy Risk Profile from 2008; no newer UK or international document on radiotherapy patient identification was found. The UK Health Security Agency's annual IR(ME)R reports, which count identification errors, were not read.",
    "No source read gives evidence that a time-out at every fraction reduces errors beyond the daily identity check; TG-100 suggests it without requiring it.",
    "How departments should identify patients who cannot answer for themselves (children, people with dementia, people who do not share a language with staff) is left to local procedure by every source read.",
    "No comparative study of photographs, wristbands or biometrics in radiotherapy was read.",
  ],
});
