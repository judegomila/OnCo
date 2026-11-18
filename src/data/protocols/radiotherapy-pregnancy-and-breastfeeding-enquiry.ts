import { protocol } from "./helpers";

/*
 * Pregnancy and breastfeeding enquiries before radiotherapy planning and treatment, including molecular radiotherapy,
 * and what happens when a patient is or may be pregnant.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text (curl, pdftotext for the PDF,
 * tags stripped by script for HTML) and every quote was checked verbatim by script:
 * - The Royal College of Radiologists, IR(ME)R: Implications for clinical practice in radiotherapy, second edition
 *   (October 2026), guidance from the Radiotherapy Board produced in association with the UK Health Security Agency:
 *   full text, PDF from rcr.ac.uk; chapter 13 (pregnancy and breastfeeding enquiries) and the pregnancy passages of
 *   chapters 7 and 8 read in full. The RCR page still lists it as the current (second) edition.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322) on legislation.gov.uk: Schedule 2 as
 *   made and as currently in force (paragraph 1(c) is unchanged), and regulation 11 as in force. The site marks both
 *   as extending to England, Wales and Scotland. The Northern Ireland regulations of 2018 and the ARSAC notes for
 *   guidance cited by the RCR were not read.
 * - AAPM Radiation Therapy Committee Task Group 36, Fetal dose from radiotherapy with photon beams (Stovall et al.,
 *   Med Phys 1995): DOI resolved through Crossref, abstract only from Europe PMC. A Europe PMC title search on
 *   17 November 2026 found no newer AAPM task group report on fetal dose.
 * - NHS, What happens during radiotherapy (page last reviewed 5 June 2023): read for the advice to patients to
 *   contact their care team if they think they may be pregnant.
 * - No US or European guideline on pregnancy enquiries in radiotherapy was found to read; the ACR-SPR practice
 *   parameter on imaging pregnant patients covers imaging, not radiotherapy, and was not read.
 *
 * Changed in this pass: the law was described as UK-wide and is now given by nation; orders the guidance words as
 * "may" or "should" were softened to match; reasons no source states were taken out of the why lines; "28-day rule"
 * was removed from the aliases because no source read mentions it.
 *
 * The census row also names radiotherapy consent; no consent guidance was read for this record, and it is listed as
 * a gap. Quotes are copied from the raw text with line breaks joined.
 */
export const radiotherapyPregnancyAndBreastfeedingEnquiry = protocol({
  id: "radiotherapy-pregnancy-and-breastfeeding-enquiry",
  name: "Pregnancy and breastfeeding checks before radiotherapy",
  aka: ["pregnancy check before radiotherapy", "pregnancy status enquiry", "IR(ME)R pregnancy enquiry", "ten-day rule", "breastfeeding and molecular radiotherapy", "radiotherapy in pregnancy", "fetal dose radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiation can harm an unborn baby, so before your planning scan and your first treatment, anyone who could be pregnant is asked whether they might be, and before a radioactive medicine is given, whether they are breastfeeding. The answer is recorded; if pregnancy cannot be ruled out a test may be done, and if you are pregnant the team reconsiders the plan with you.",
  simple: "Before radiotherapy you may be asked if you could be pregnant, and before a radioactive medicine if you are breastfeeding. The NHS advises contacting your care team immediately if you think you may be pregnant during treatment.",
  summary: "In Great Britain (England, Scotland and Wales), IR(ME)R 2017 regulation 11(1)(f) requires the operator to enquire about pregnancy where relevant, and Schedule 2 requires a written employer's procedure for these enquiries; Northern Ireland has its own 2018 regulations, which the RCR guidance also names and which were not read. The RCR guidance (second edition, October 2026, with UKHSA) sets out how. The employer's written procedure defines who is asked (in many departments people of childbearing potential aged 12 to 55; some have set another range, for example 10 to 55), when (asking before the first planning exposure and before the first treatment may be considered sufficient), exceptions (for example after total abdominal hysterectomy), sedated or anaesthetised patients, under-16s (local safeguarding procedure), trans and gender-diverse people, and irregular cycles, where the ten-day rule and menstrual history may not predict pregnancy and routine testing may be specified after a risk assessment. The answer is documented; a refusal to answer is documented and the unknown-status procedure followed. If pregnancy is possible or confirmed, the operator alerts the practitioner, who reconsiders justification; deferral is considered, and a test is done where pregnancy cannot be excluded. For molecular radiotherapy menstrual history alone is not considered adequate to exclude pregnancy, and breastfeeding is completely contraindicated where the radionuclide is excreted in milk. Deliberately treating a pregnant patient with external beam radiotherapy is rare, case by case, with the medical physics expert involved in a prior risk assessment, and AAPM TG-36 (1995) gives the physics for estimating and shielding fetal dose; an unintended fetal exposure may be notifiable. The sources read give no fetal dose threshold and no breastfeeding interruption period: the RCR refers to ARSAC for those.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "People of childbearing potential having radiotherapy planning or treatment, including external beam, brachytherapy, intraoperative radiotherapy and molecular radiotherapy, and people who are breastfeeding before molecular radiotherapy. The procedure and wording are UK guidance: IR(ME)R 2017 is the law in England, Scotland and Wales, and Northern Ireland has its own 2018 regulations. Other countries have their own rules; none were read. Under-16s are included with safeguarding procedures.",
  trigger: "A radiotherapy planning scan, the first treatment, or a molecular radiotherapy administration is due for a person who could be pregnant or is breastfeeding; and any time during a course that pregnancy becomes possible.",
  steps: [
    {
      action: "Before an exposure, the operator asks a person of childbearing potential whether they could be pregnant, wherever the employer's procedure defines the question as relevant (for example for everyone of childbearing potential in the locally agreed age range)",
      why: "The risk of harm from radiation is higher for an embryo or fetus than for an adult, and the regulations in Great Britain require the operator to ask where it is relevant.",
      source: "rcr-irmer-2026",
      quote: "Regulation 11(1)(f) requires operators to enquire about pregnancy status where relevant.",
      grade: "Legal requirement (IR(ME)R 2017)",
    },
    {
      action: "Use the age range and timing set in the local procedure (many departments use 12 to 55 years); asking before the first planning exposure and before the first treatment exposure may be considered sufficient",
      why: "The guidance leaves the age range, the timing and the frequency of the check to the employer's written procedure, with the age range based on local patients.",
      source: "rcr-irmer-2026",
      quote: "It may be considered sufficient to ask prior to initial planning exposure and prior to initial treatment exposure.",
    },
    {
      action: "Explain why the question is asked, in appointment letters, leaflets and in person, and ask privately and with sensitivity",
      why: "Information beforehand gives people the chance to ask questions and to declare a possible pregnancy; some are afraid to raise it or to answer truthfully, for example with a parent present.",
      source: "rcr-irmer-2026",
      quote: "It is therefore essential to provide every individual with adequate information relating to the benefits and risks associated with the radiation dose prior to the procedure, as this gives them the opportunity to ask questions and to declare any possibility of pregnancy.",
    },
    {
      action: "For anyone under 16, follow the local safeguarding procedure when asking",
      why: "The guidance notes that children under 13 cannot legally consent to sexual activity and that a young person may be unwilling or afraid to answer with a parent present.",
      source: "rcr-irmer-2026",
      quote: "When checking the possibility of pregnancy with individuals under 16 years of age, operators must follow the local safeguarding procedure.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Where cycles are irregular (because of illness, chemotherapy or other treatment), bear in mind that the ten-day rule and questions about periods may not predict pregnancy; test if the local procedure says so",
      why: "Illness, chemotherapy and other medical treatment can disturb periods. The employer's procedure may specify routine pregnancy testing for these patients after a risk assessment.",
      source: "rcr-irmer-2026",
      quote: "In these cases, the traditional ten-day rule and enquiries about menstruation may be ineffective in predicting pregnancy.",
    },
    {
      action: "Set out who confirms pregnancy status before a patient is sedated or anaesthetised (for example for intraoperative radiotherapy)",
      why: "The check has to be made before the patient is anaesthetised or sedated, so the procedure names who makes it.",
      source: "rcr-irmer-2026",
      quote: "The employer’s procedure must specify whose responsibility it is to confirm pregnancy status prior to the patient being anaesthetised or sedated.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Record the answer every time; if the person chooses not to answer, record that, follow the local procedure for unknown pregnancy status and inform the practitioner",
      why: "The record is the evidence that the appropriate questions were asked.",
      source: "rcr-irmer-2026",
      quote: "The response to pregnancy enquiries must be documented as evidence that the appropriate questions have been asked.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "If pregnancy cannot be excluded, do the pregnancy test set out in the local procedure and record it, and consider deferring if uncertainty remains or the procedure is not urgent; before molecular radiotherapy, do not rely on menstrual history alone",
      why: "For molecular radiotherapy the guidance does not consider menstrual history alone adequate to exclude pregnancy, so the procedure names the test to use. It allows reasonable exceptions for some localised treatments, such as injections into a joint for arthritis.",
      source: "rcr-irmer-2026",
      quote: "The confirmation of menstrual history alone is not considered adequate to exclude pregnancy.",
    },
    {
      action: "If the person is or may be pregnant, before or during the course, alert the practitioner, who reconsiders whether the exposure is justified; the medical physics expert should be involved when this happens during a course or when treatment is to go ahead",
      why: "The practitioner weighs the risk of delaying treatment against the risk of the exposure, with the patient involved. Treatment may be deferred if it is not urgent, or adapted to lower the dose to the fetus.",
      source: "rcr-irmer-2026",
      quote: "If the possibility of pregnancy is discovered before the exposure takes place, the operator should alert the practitioner, who should reconsider justification of the exposure.",
    },
    {
      action: "If a pregnant patient is to be treated deliberately with external beam radiotherapy, decide case by case, involve the medical physics expert in a prior risk assessment and consider a multidisciplinary approach with an obstetrician and a neonatologist",
      why: "The standard planning approach and technique may be adapted to reduce the dose to the fetus. The AAPM TG-36 report gives the physics for estimating that dose and for shielding.",
      source: "rcr-irmer-2026",
      quote: "The MPE must be involved in a prior risk assessment of exposures to such individuals.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Before molecular radiotherapy, where the local procedure makes it relevant, ask anyone who has recently given birth whether they are breastfeeding; do not give a radionuclide excreted in milk while breastfeeding continues, and consider delaying treatment until breastfeeding and lactation have stopped",
      why: "These radionuclides are excreted in breast milk, and the guidance asks the team to weigh the risk to the baby and the dose to the breast tissue from continued lactation.",
      source: "rcr-irmer-2026",
      quote: "Breastfeeding is completely contraindicated for MRT using radionuclides that are excreted in breast milk.",
    },
  ],
  bestInClass: {
    statement: "The RCR IR(ME)R guidance for radiotherapy (second edition, October 2026, with UKHSA) is the most current and detailed source read: a written employer's procedure; an operator enquiry, documented, for all people of childbearing potential in a set age range before the first planning and first treatment exposures; sensitive, private questioning with information in advance; safeguarding for under-16s; testing where pregnancy cannot be excluded, and routine testing for irregular cycles where the local procedure specifies it; reconsideration of justification by the practitioner if pregnancy is possible, with the medical physics expert involved; and, for molecular radiotherapy, exclusion of pregnancy by more than menstrual history and no breastfeeding with radionuclides excreted in milk. Fetal dose estimation and shielding, where a pregnant patient is treated, rest on AAPM TG-36 (1995), read here as an abstract only. The guidance and the law read are for the UK: IR(ME)R 2017 applies in England, Scotland and Wales, and Northern Ireland has its own 2018 regulations.",
    sources: ["rcr-irmer-2026", "irmer-2017-schedule-2", "aapm-tg36-1995"],
  },
  variants: [
    {
      name: "Age range for asking",
      differs: "Many departments ask people of childbearing potential aged 12 to 55; some have worked with their obstetric team to set a range that fits local patients, for example 10 to 55.",
      evidence: "Both are described by the RCR guidance as in use (12 to 55 in many departments); it cites no study for either.",
      sources: ["rcr-irmer-2026"],
    },
    {
      name: "Routine pregnancy testing",
      differs: "Tests routinely, for example everyone with irregular cycles or everyone before molecular radiotherapy, rather than asking and testing only where pregnancy cannot be excluded.",
      evidence: "The RCR guidance says the employer's procedure may specify routine testing for people with irregular cycles after a risk assessment, and that for molecular radiotherapy the procedure should describe the appropriate pregnancy test, because menstrual history alone is not considered adequate. No comparison of approaches was found.",
      sources: ["rcr-irmer-2026"],
    },
  ],
  grades: [
    { claim: "Operators must enquire about pregnancy where relevant", grade: "Legal requirement, IR(ME)R 2017 regulation 11(1)(f)", source: "rcr-irmer-2026" },
    { claim: "The employer's written procedures must cover enquiries about pregnancy and breastfeeding", grade: "Legal requirement, IR(ME)R 2017 Schedule 2, paragraph 1(c)", source: "irmer-2017-schedule-2", quote: "for making enquiries of individuals of childbearing potential to establish whether the individual is or may be pregnant or breastfeeding;" },
    { claim: "Making pregnancy or breastfeeding enquiries is an operator task", grade: "RCR guidance statement", source: "rcr-irmer-2026", quote: "Making pregnancy or breastfeeding enquiries in advance of an exposure is an operator task." },
    { claim: "A newly discovered pregnancy during a course leads the practitioner to reconsider justification", grade: "RCR guidance (should)", source: "rcr-irmer-2026", quote: "If the possibility of pregnancy is discovered after the exposure has been justified or during the course of treatment, the operator should alert the practitioner, who should reconsider justification of the exposure." },
    { claim: "Deliberate treatment of a pregnant patient with external beam radiotherapy is rare and case by case", grade: "RCR guidance (must)", source: "rcr-irmer-2026", quote: "These occasions are rare and must always be considered on a case-by-case basis." },
    { claim: "An unintended fetal exposure may need notifying", grade: "RCR guidance", source: "rcr-irmer-2026", quote: "If an unintended fetal exposure occurs, this may require notification to the relevant enforcing authority in accordance with published guidance." },
    { claim: "Patients are told to contact their care team immediately if they think they may be pregnant during radiotherapy", grade: "NHS patient information, not graded", source: "nhs-radiotherapy-what-happens", quote: "Use an effective method of contraception, such as a condom, and contact your care team immediately if you think you may be pregnant." },
    { claim: "After molecular radiotherapy, patients are advised to avoid conception for set periods", grade: "RCR guidance (should), periods set by ARSAC", source: "rcr-irmer-2026", quote: "Male and female patients who wish to conceive following treatment should be advised to avoid getting pregnant for set periods of time as recommended by ARSAC." },
  ],
  sources: [
    {
      key: "rcr-irmer-2026",
      label: "IR(ME)R: Implications for clinical practice in radiotherapy, second edition. Guidance from the Radiotherapy Board (chapter 13, Pregnancy and breastfeeding enquiries)",
      publisher: "The Royal College of Radiologists, in association with the UK Health Security Agency",
      year: 2026,
      url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/ionising-radiation-medical-exposure-regulations-implications-for-clinical-practice-in-radiotherapy/",
      gradingScheme: "Not graded: guidance interpreting the Ionising Radiation (Medical Exposure) Regulations 2017 and the Northern Ireland regulations of 2018. The grades on this page give the guidance's own verb (must, should or may); the document does not define these words.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irmer-2017-schedule-2",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: Employer's Procedures",
      publisher: "UK Government (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2/made",
      gradingScheme: "Statutory instrument: binding in England, Wales and Scotland, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg36-1995",
      label: "Fetal dose from radiotherapy with photon beams: report of AAPM Radiation Therapy Committee Task Group No. 36",
      publisher: "AAPM (Medical Physics; Stovall et al.)",
      year: 1995,
      url: "https://doi.org/10.1118/1.597525",
      doi: "10.1118/1.597525",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-radiotherapy-what-happens",
      label: "What happens during radiotherapy (Pregnancy and contraception), page last reviewed 5 June 2023",
      publisher: "NHS (nhs.uk)",
      year: 2023,
      url: "https://www.nhs.uk/tests-and-treatments/radiotherapy/what-happens/",
      gradingScheme: "Patient information for England: not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  terms: ["cancer-in-pregnancy"],
  related: ["radiotherapy-patient-identification-and-time-out", "radiotherapy-consent"],
  upgrades: ["idea-pu-pregnancy-test-or-ask-before-radiotherapy"],
  gaps: [
    "Only UK guidance, IR(ME)R 2017 Schedule 2 and regulation 11 were read. IR(ME)R 2017 applies in England, Scotland and Wales; the Ionising Radiation (Medical Exposure) Regulations (Northern Ireland) 2018, the rest of the 2017 regulations, and US, EU and other national rules on pregnancy enquiries before radiotherapy were not read.",
    "No source read gives a fetal dose threshold, a breastfeeding interruption period or a period to avoid conception after molecular radiotherapy. The RCR guidance refers to the ARSAC notes for guidance (2025) for these, and they were not read for this record.",
    "The RCR guidance mentions the traditional ten-day rule without defining it, and no source read mentions a 28-day rule; neither rule is set out on this page.",
    "AAPM TG-36, the standard reference for fetal dose estimation and shielding, dates from 1995 and was read as an abstract only on 17 November 2026; a Europe PMC title search that day found no update.",
    "The advice to patients to contact the care team immediately if they may be pregnant comes from an NHS page last reviewed on 5 June 2023, whose own next review date (5 June 2026) had passed when it was read on 17 November 2026.",
    "Consent for radiotherapy, which the census row pairs with this check, is a separate protocol (radiotherapy-consent); no consent guidance was read for this record.",
    "No study compares asking alone with routine testing for missed pregnancies in radiotherapy; the age range and testing rules are local decisions.",
  ],
});
