import { protocol } from "./helpers";

/*
 * Identifying the patient, the plan and the side before each radiotherapy treatment, and the pre-treatment time-out.
 *
 * Second accuracy pass, 17 November 2026. Every source was read again as raw text and every quote was checked
 * verbatim by script (whitespace and line breaks joined, nothing else):
 * - The Royal College of Radiologists, IR(ME)R: Implications for clinical practice in radiotherapy, second edition
 *   (October 2026), guidance from the Radiotherapy Board produced in association with the UK Health Security Agency:
 *   full text. New to this record in this pass. The PDF text was re-used from the copy a sibling checker fetched from
 *   rcr.ac.uk on 17 November 2026; chapter 12 (identification of the individual to be exposed) was read in full.
 * - Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA and BIR, 2008): full text. The RCR's own PDF address and its
 *   publication page both returned 404 to a script; the PDF was read from the Internet Archive's capture of it
 *   (16 September 2025) with pdftotext. The 2026 RCR guidance still cites it.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2, as made and as currently
 *   in force, from legislation.gov.uk (copy fetched by a sibling checker on 17 November 2026). Paragraph 1(a) is
 *   unchanged. The site marks the schedule as extending to England, Wales and Scotland.
 * - WHO Radiotherapy Risk Profile, technical manual (WHO/IER/PSP/2008.12): full text, now read from WHO's own PDF
 *   (cdn.who.int) with pdftotext. Its risk tables break across lines as text; only a contiguous cell is quoted.
 * - AAPM Task Group 100 report (Huq et al., Med Phys 2016): full text from the PubMed Central article page
 *   (PMC4985013), tags stripped by script; the Europe PMC full-text endpoint returned 500 and E-utilities does not
 *   serve this article's body. DOI resolved through Crossref and the title checked. TG-100 is a method with worked
 *   examples, not a standard; its example checklists are quoted as examples.
 * - ASTRO, Safety is No Accident (2019): not reachable; astro.org returned 403 to one request and was not retried.
 *
 * Changed in this pass: the law was described as UK-wide and is now scoped to England, Wales and Scotland; the WHO
 * manual was said to rate identification as a risk "at every stage" and to list a unique identifier throughout, and
 * neither is so; "site" was added to a sentence that speaks only of the side; body text was graded as a boxed
 * recommendation; one statement was graded as an observation from incident data the source does not cite; reasons no
 * source states were taken out of the why lines; and the current RCR guidance was added, which states the three
 * questions, the six-point check before the first exposure and the alternatives for people who cannot answer.
 */
export const radiotherapyPatientIdentificationAndTimeOut = protocol({
  id: "radiotherapy-patient-identification-and-time-out",
  name: "Patient identification and pre-treatment time-out in radiotherapy",
  aka: ["radiotherapy ID check", "patient ID check at the linac", "radiotherapy time-out", "pause and check radiotherapy", "wrong patient radiotherapy", "wrong site radiotherapy", "correct side check radiotherapy", "positive patient identification"],
  domain: "radiotherapy",
  tldr: "Each time you come for radiotherapy, even when the staff know you well, UK guidance says they should ask you to say your full name, date of birth and address yourself, not just agree to them. Your answers are checked against your treatment record, and the side being treated should be confirmed at each visit. The guidance calls correct identification essential at every step.",
  simple: "Each day the radiographers will ask you to say your name, date of birth and address. They do this every time, on purpose, so that the treatment on the machine is matched to the right person.",
  summary: "In England, Wales and Scotland the check is a legal requirement: IR(ME)R 2017 Schedule 2 requires the employer's written procedures to include procedures to identify correctly the individual to be exposed. Northern Ireland has its own regulations, which were not read. The RCR's IR(ME)R guidance for radiotherapy (second edition, October 2026) says identification is an operator task that must be done before any exposure, by direct questioning requiring an active response: three questions, typically full name, date of birth and address, with all the answers matching the primary source data. It recommends a six-point check before the initial exposure, adding other clinical details such as site and laterality, after which checks could revert to three points; says a photograph may replace one question or be added; gives examples of alternatives for people who cannot answer (a hospital wristband, a relative or carer, an interpreter, a parent or guardian for a child); and says that if the patient cannot be correctly identified the exposure should not continue. Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA, BIR, 2008) lists closed yes/no questions as ineffective, says formal identification must be carried out for all procedures even when the patient is well known, states that mistakes are more likely later in treatment than at the beginning, and says the correct side should be confirmed at set-up for each fraction. The WHO Radiotherapy Risk Profile (2008) rates incorrect identification of the patient as a high-impact risk at most stages of the pathway, including treatment delivery, and names patient identification among the safety processes that apply to all stages.\n\nThe time-out is less settled, and the only source read on it is from the United States. AAPM TG-100 (2016) includes two forms of identification and a time-out in its example day-1 checklist, refers to the time-out process required by the Joint Commission, and says there is no specific guidance requiring a time-out at each treatment session, though it is a good idea; it describes the radiation oncologist taking part, especially on day 1, as a guard against deviations from physician intent. ASTRO's Safety is No Accident (2019) could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department"],
  },
  population: "Every patient before any radiotherapy planning or treatment exposure. The RCR guidance read covers radiotherapy services including molecular radiotherapy, and gives examples of other ways to establish identity for people who lack capacity to identify themselves, people with a sensory impairment, people who speak another language, children, and patients in theatre or under anaesthesia or sedation. The law cited applies in England, Wales and Scotland; the time-out passages come from a US task group report.",
  trigger: "Each time a patient attends for a planning or treatment exposure, before the exposure.",
  steps: [
    {
      action: "Have a written procedure for identifying correctly the person to be exposed",
      why: "In England, Wales and Scotland the regulations require the employer's written procedures to include this. The RCR guidance adds that the procedure must specify how and when a person is to be identified.",
      source: "irmer-2017",
      quote: "to identify correctly the individual to be exposed to ionising radiation;",
      grade: "Statutory requirement in England, Wales and Scotland (IR(ME)R 2017, Schedule 2, 1(a))",
    },
    {
      action: "Ask open questions the patient must answer for themselves, not questions that can be answered yes or no",
      why: "The guidance lists open questions eliciting an active response as effective and closed yes/no questions, such as asking a person whether they are a named patient, as ineffective.",
      source: "towards-safer-radiotherapy-2008",
      quote: "It is vital that identification verification is performed by asking open questions, which elicit a positive response from the patient (see Table 5.1).",
      grade: "Body text (\"It is vital\"); the boxed recommendation says procedures eliciting an active response must be used",
    },
    {
      action: "Ask three questions, typically full name, date of birth and address, and check that every answer matches the primary source data",
      why: "The RCR guidance says all the responses must match, and that the primary source data could be the referral for pretreatment exposures and the prescription for treatment exposures, or the system that holds these.",
      source: "rcr-irmer-2026",
      quote: "All the responses must match the information provided on the primary source data as specified in the local employer’s procedures.",
      grade: "Guidance: \"should\" for the three questions, \"must\" for the match",
    },
    {
      action: "Before the first exposure, use a six-point check that adds other clinical details such as the site and the side",
      why: "The RCR guidance recommends this at the start of a course and says later identity checks could then revert to the standard three points.",
      source: "rcr-irmer-2026",
      quote: "A six-point check is recommended before the initial exposure, including other clinical details (eg site, laterality) that would occur during the pretreatment consultation at the start of the course of treatment.",
      grade: "Guidance: \"is recommended\"",
    },
    {
      action: "Do the formal check for every procedure, even when the patient is well known to the staff",
      why: "The guidance states that mistakes are more likely later in treatment than at the beginning; it gives no data or reference for this.",
      source: "towards-safer-radiotherapy-2008",
      quote: "Formal identification must be carried out for all procedures even when the patient is well known.",
      grade: "Body text (\"must\")",
    },
    {
      action: "Consider a photograph of the patient as well as, or in place of one of, the three questions, and at least three points of identification",
      why: "The RCR guidance says a photograph, where available, may be an alternative to one question or an addition. The WHO manual lists open questions, a minimum of three points of identification and photo identification as potential solutions to incorrect identification, which it rates a high-impact risk; it lists a unique patient identifier at the assessment stage only.",
      source: "who-risk-profile-2008",
      quote: "ID check open questions, eliciting an active response",
      grade: "Listed potential solution to a risk rated high impact",
    },
    {
      action: "Write into the procedure other ways to establish identity when the three questions cannot be used, and do not continue with the exposure if the patient cannot be correctly identified",
      why: "The RCR guidance gives examples: a hospital wristband, a relative, carer or staff member, written cards or sign language, a translation service, and a parent, guardian or accompanying professional who knows the child.",
      source: "rcr-irmer-2026",
      quote: "If it is not possible to correctly identify the patient the exposure should not continue.",
      grade: "Guidance: \"should not continue\"",
    },
    {
      action: "Record who did the identity check, and where several operators are involved, communicate and cross-check the identity with the operator giving the exposure",
      why: "The RCR guidance says the same operator should confirm identity and perform the exposure where possible, and that operators should avoid handovers to colleagues during these checks.",
      source: "rcr-irmer-2026",
      quote: "The operator undertaking the individual ID check must be identifiable by their signature or electronic password.",
      grade: "Guidance: \"must\" for the record, \"should\" for the cross-check",
    },
    {
      action: "Confirm the side to be treated at set-up for every fraction; confirming it with the patient is described as good practice",
      why: "The guidance says it is essential that the correct side is identified from source data already verified against imaging, surgical and histology reports and clinical observations, and that some centres routinely confirm the side with patients.",
      source: "towards-safer-radiotherapy-2008",
      quote: "Treatment of the correct side should also be confirmed at the set-up for each fraction during a course of treatment.",
      grade: "Body text (\"should\")",
    },
    {
      action: "Before the first treatment, use a time-out to confirm the patient's identity, the treatment site and side, that the correct files are open in the delivery system, and that prescribed changes have been addressed",
      why: "The AAPM report, written for US practice, calls it essential to confirm that the correct patient and the correct treatment plan have been selected, and lists this in its example day-1 checklist.",
      source: "aapm-tg100-2016",
      quote: "Patient and treatment plan to be used are identified correctly using two forms of identification check and time-out procedure",
      grade: "Example checklist item (TG-100 is a method, not a standard)",
    },
    {
      action: "Consider a time-out at every treatment session, not only the first",
      why: "The AAPM report says no specific guidance requires this and calls it a good idea. No other source read addresses it.",
      source: "aapm-tg100-2016",
      quote: "Although there is no specific guidance that a time out should be required for each treatment session, it is a good idea.",
      grade: "Suggestion in a task group report",
    },
  ],
  bestInClass: {
    statement: "The most current and detailed source read is UK guidance: the RCR's IR(ME)R guidance for radiotherapy (second edition, October 2026). It sets out positive identification before any exposure by direct questioning requiring an active response (three questions, typically full name, date of birth and address), all answers matching the primary source data, a six-point check before the initial exposure, a record of who did the check, written alternatives for people who cannot answer, and no exposure if the patient cannot be correctly identified. A written procedure is a legal requirement in England, Wales and Scotland under IR(ME)R 2017. Towards Safer Radiotherapy (2008) adds that the check is done for all procedures even when the patient is well known and that the treated side should be confirmed at each fraction; WHO (2008) lists a minimum of three points of identification and photo identification as potential solutions. A time-out before the first fraction is in the AAPM TG-100 example checklist, a US report; whether one is needed at every fraction is not settled by any source read, TG-100 calling it a good idea without a requirement. The sources do not disagree; they differ in how much they specify.",
    sources: ["rcr-irmer-2026", "towards-safer-radiotherapy-2008", "irmer-2017", "who-risk-profile-2008", "aapm-tg100-2016"],
  },
  variants: [
    {
      name: "Biometric or bar-code identification linked to the treatment record",
      differs: "A fingerprint, bar-coded wristband or bar-coded card is used to identify the patient and to verify that the correct dataset has been called up.",
      evidence: "Towards Safer Radiotherapy (2008) describes one department using fingerprint identification at the department entrance and the room entrance, and bar-coded wristbands in use in two UK radiotherapy departments, and recommends that such technology be explored; it notes that these systems compel the identification step. The RCR guidance (2026) says additional technologies such as barcoding should be reviewed and incorporated where appropriate. No comparative study was read.",
      sources: ["towards-safer-radiotherapy-2008", "rcr-irmer-2026"],
    },
    {
      name: "Patient photograph in the record and verify system",
      differs: "A photograph of the patient is available at the identity check, in some systems within the treatment room set-up data.",
      evidence: "Towards Safer Radiotherapy says some record and verify systems can integrate a photograph into the set-up data; WHO 2008 lists photo identification as a potential solution; the RCR guidance (2026) says a photograph may be an alternative to one of the three questions or an addition, and should be an appropriate representation of the patient. No study of its effect was read.",
      sources: ["towards-safer-radiotherapy-2008", "who-risk-profile-2008", "rcr-irmer-2026"],
    },
    {
      name: "Day-one time-out with the radiation oncologist",
      differs: "The doctor takes part in the time-out for the first treatment.",
      evidence: "Described by AAPM TG-100, a US report, as a guard against deviations from physician intent; not required by any source read.",
      sources: ["aapm-tg100-2016"],
    },
  ],
  grades: [
    { claim: "Correct patient identification at every step, with procedures eliciting an active response; explore new technology", grade: "Boxed recommendation", source: "towards-safer-radiotherapy-2008", quote: "Correct patient identification is essential at every step. Procedures eliciting an active response from the patient must be used. The use of new technology to assist patient identification should be explored." },
    { claim: "Errors are more likely later in treatment than at the beginning", grade: "Statement in the body text; no data or reference is given for it", source: "towards-safer-radiotherapy-2008", quote: "Mistakes are more likely later in treatment than at the beginning." },
    { claim: "The employer must specify the steps for patients who cannot identify themselves", grade: "Body text (\"must\")", source: "towards-safer-radiotherapy-2008", quote: "Patients who cannot identify themselves pose particular problems and the employer must specify the steps to be taken in these circumstances." },
    { claim: "Identification is an operator task done before any exposure", grade: "Guidance: \"must\"", source: "rcr-irmer-2026", quote: "Correct identification (ID) of the patient is an operator task and must be undertaken prior to any exposure." },
    { claim: "Written procedures to identify correctly the individual to be exposed", grade: "Statutory requirement in England, Wales and Scotland", source: "irmer-2017" },
  ],
  sources: [
    {
      key: "rcr-irmer-2026",
      label: "IR(ME)R: Implications for clinical practice in radiotherapy, second edition. Guidance from the Radiotherapy Board (chapter 12, Identification of the individual to be exposed)",
      publisher: "The Royal College of Radiologists, in association with the UK Health Security Agency",
      year: 2026,
      url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/ionising-radiation-medical-exposure-regulations-implications-for-clinical-practice-in-radiotherapy/",
      gradingScheme: "Not graded: guidance interpreting the Ionising Radiation (Medical Exposure) Regulations 2017 and the Northern Ireland regulations of 2018. The grades on this page give the guidance's own verb (must, should or may); the document does not define these words.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "towards-safer-radiotherapy-2008",
      label: "Towards Safer Radiotherapy",
      publisher: "The Royal College of Radiologists, Society and College of Radiographers, Institute of Physics and Engineering in Medicine, National Patient Safety Agency and British Institute of Radiology",
      year: 2008,
      url: "https://web.archive.org/web/20250916233706/https://www.rcr.ac.uk/media/zbtjvtsr/rcr-publications_towards-safer-radiotherapy_april-2008.pdf",
      gradingScheme: "Not graded: boxed recommendations follow many sections, and the body text uses \"must\", \"should\" and \"vital\" without defining them. The grades on this page say whether a sentence is a boxed recommendation or body text.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irmer-2017",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: Employer's procedures (latest revised version; extends to England, Wales and Scotland)",
      publisher: "UK Government (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2",
      gradingScheme: "Statutory instrument: binding in England, Wales and Scotland, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "who-risk-profile-2008",
      label: "Radiotherapy Risk Profile: technical manual (WHO/IER/PSP/2008.12)",
      publisher: "World Health Organization",
      year: 2008,
      url: "https://cdn.who.int/media/docs/default-source/patient-safety/radiotherapy/090715-who-radiotherapy_risk_profile.pdf",
      gradingScheme: "Risks rated by potential impact (high, medium, low) with solutions listed; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "astro-safety-2019",
      label: "Safety is No Accident: a framework for quality radiation oncology care (2019 edition)",
      publisher: "American Society for Radiation Oncology",
      year: 2019,
      url: "https://www.astro.org/patient-care-and-research/patient-safety/safety-is-no-accident",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["imrt-igrt"],
  terms: ["radiotherapy"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 ASTRO's Safety is No Accident (2019), the main US framework, again could not be read (astro.org returned 403 to a script), so it is not known whether a newer edition exists, and the Joint Commission Universal Protocol is reported here only as TG-100 describes it.",
    "IR(ME)R 2017 extends to England, Wales and Scotland. Northern Ireland has its own regulations, which were not read, and no other country's law on patient identification before radiotherapy was read.",
    "The RCR guidance (2026) cites the Society and College of Radiographers' Preventing patient identification incidents in diagnostic imaging, nuclear medicine and radiotherapy (2022) and its radiotherapy pause and check material; neither was read. The UK Health Security Agency's radiotherapy error reports, which the RCR guidance cites for events where the wrong electronic data set was used, were not read either.",
    "Towards Safer Radiotherapy dates from 2008 and no later edition was found. On 17 November 2026 the RCR's own address for it returned 404 and it was read from an archived copy; the 2026 RCR guidance still cites it. Its statement that mistakes are more likely later in treatment carries no data or reference.",
    "The WHO Radiotherapy Risk Profile dates from 2008; no newer WHO document on radiotherapy patient identification was found.",
    "No source read gives evidence that a time-out at every fraction reduces errors beyond the daily identity check; TG-100, a US report, suggests it without requiring it, and no UK source read uses the term time-out.",
    "The RCR guidance gives examples of how to identify patients who cannot answer for themselves, but the choice is left to each employer's procedure.",
    "No comparative study of photographs, wristbands or biometrics in radiotherapy was read.",
  ],
});
