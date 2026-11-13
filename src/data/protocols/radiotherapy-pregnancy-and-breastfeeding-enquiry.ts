import { protocol } from "./helpers";

/*
 * Pregnancy and breastfeeding enquiries before radiotherapy planning and treatment, including molecular radiotherapy,
 * and what happens when a patient is or may be pregnant.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - The Royal College of Radiologists, IR(ME)R: Implications for clinical practice in radiotherapy, second edition
 *   (October 2026), guidance from the Radiotherapy Board produced in association with the UK Health Security Agency:
 *   full text, PDF from rcr.ac.uk read with pdftotext; chapter 13 (pregnancy and breastfeeding enquiries) read in
 *   full. It interprets the Ionising Radiation (Medical Exposure) Regulations 2017 for radiotherapy in the UK.
 * - AAPM Radiation Therapy Committee Task Group 36, Fetal dose from radiotherapy with photon beams (Stovall et al.,
 *   Med Phys 1995): abstract only, Europe PMC. No newer AAPM report on fetal dose was found in a Europe PMC search on
 *   11 November 2026.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2 (employer's procedures), as
 *   made: full text from legislation.gov.uk (fetched by a sibling agent in this round and checked here). The rest of
 *   the regulations and the ARSAC notes for guidance cited by the RCR were not read.
 * - No US or European guideline on pregnancy enquiries in radiotherapy was found to read; the ACR-SPR practice
 *   parameter on imaging pregnant patients covers imaging, not radiotherapy, and was not read.
 *
 * The census row also names radiotherapy consent; no consent guidance was read for this record, and it is listed as
 * a gap. Quotes are copied from the raw text with line breaks joined.
 */
export const radiotherapyPregnancyAndBreastfeedingEnquiry = protocol({
  id: "radiotherapy-pregnancy-and-breastfeeding-enquiry",
  name: "Pregnancy and breastfeeding checks before radiotherapy",
  aka: ["pregnancy check before radiotherapy", "pregnancy status enquiry", "IR(ME)R pregnancy enquiry", "ten-day rule", "28-day rule", "breastfeeding and molecular radiotherapy", "radiotherapy in pregnancy", "fetal dose radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiation can harm an unborn baby, so before your planning scan and your first treatment, anyone who could be pregnant is asked whether they might be, and before a radioactive medicine is given, whether they are breastfeeding. The answer is recorded; if pregnancy cannot be ruled out a test may be done, and if you are pregnant the team reconsiders the plan with you.",
  simple: "Before radiotherapy you will be asked if you could be pregnant or are breastfeeding. Please answer honestly and tell the team straight away if this changes during treatment.",
  summary: "In the UK, IR(ME)R 2017 regulation 11(1)(f) requires the operator to enquire about pregnancy where relevant, and the RCR guidance (second edition, October 2026, with UKHSA) sets out how. The employer's written procedure defines who is asked (commonly people of childbearing potential aged 12 to 55, some departments 10 to 55), when (asking before the first planning exposure and before the first treatment may be sufficient), exceptions (for example after total abdominal hysterectomy), sedated or anaesthetised patients, under-16s (local safeguarding procedure), trans and gender-diverse people, and irregular cycles, where the ten-day rule and menstrual history may not predict pregnancy and routine testing may be specified. The answer is documented; a refusal to answer is documented and the unknown-status procedure followed. If pregnancy is possible or confirmed, the practitioner reconsiders justification, deferral is considered and a test is done where it cannot be excluded. For molecular radiotherapy menstrual history alone is not adequate to exclude pregnancy, and breastfeeding is completely contraindicated where the radionuclide enters milk. Deliberately treating a pregnant patient is rare, case by case, with a prior risk assessment by the medical physics expert, and AAPM TG-36 (1995) gives the physics for estimating and shielding fetal dose; an unintended fetal exposure may be notifiable.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "People of childbearing potential having radiotherapy planning or treatment, including external beam, brachytherapy, intraoperative radiotherapy and molecular radiotherapy, and people who are breastfeeding before molecular radiotherapy. The procedure and wording are UK (IR(ME)R 2017); other countries have their own regulations, which were not read. Under-16s are included with safeguarding procedures.",
  trigger: "A radiotherapy planning scan, the first treatment, or a molecular radiotherapy administration is due for a person who could be pregnant or is breastfeeding; and any time during a course that pregnancy becomes possible.",
  steps: [
    {
      action: "Before the planning scan and before the first treatment, the operator asks every person of childbearing potential in the locally agreed age range whether they could be pregnant",
      why: "Radiation to an unborn baby can cause harm, and the law requires the person giving the exposure to ask where it is relevant.",
      source: "rcr-irmer-2026",
      quote: "Regulation 11(1)(f) requires operators to enquire about pregnancy status where relevant.",
      grade: "Legal requirement (IR(ME)R 2017)",
    },
    {
      action: "Use the age range set in the local procedure (commonly 12 to 55) and ask at least before the first planning exposure and the first treatment exposure",
      why: "A clear rule means nobody who could be pregnant is missed and the check is not forgotten on the day treatment starts.",
      source: "rcr-irmer-2026",
      quote: "It may be considered sufficient to ask prior to initial planning exposure and prior to initial treatment exposure.",
    },
    {
      action: "Explain why the question is asked, in appointment letters, leaflets and in person, and ask privately and with sensitivity",
      why: "People can only declare a possible pregnancy if they understand why it matters; some fear asking or answering in front of others.",
      source: "rcr-irmer-2026",
      quote: "It is therefore essential to provide every individual with adequate information relating to the benefits and risks associated with the radiation dose prior to the procedure, as this gives them the opportunity to ask questions and to declare any possibility of pregnancy.",
    },
    {
      action: "For anyone under 16, follow the local safeguarding procedure when asking",
      why: "A disclosed pregnancy in a young person can raise safeguarding concerns that need a set response.",
      source: "rcr-irmer-2026",
      quote: "When checking the possibility of pregnancy with individuals under 16 years of age, operators must follow the local safeguarding procedure.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Where cycles are irregular (because of illness or chemotherapy), do not rely on the ten-day rule or the last period; test if the local procedure says so",
      why: "Cancer treatment and illness can stop or disturb periods, so the usual questions may not show a pregnancy.",
      source: "rcr-irmer-2026",
      quote: "In these cases, the traditional ten-day rule and enquiries about menstruation may be ineffective in predicting pregnancy.",
    },
    {
      action: "Set out who confirms pregnancy status before a patient is sedated or anaesthetised (for example for intraoperative radiotherapy)",
      why: "A patient who is asleep cannot be asked at the time of the exposure.",
      source: "rcr-irmer-2026",
      quote: "The employer’s procedure must specify whose responsibility it is to confirm pregnancy status prior to the patient being anaesthetised or sedated.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Record the answer every time; if the person declines to answer, record that and follow the procedure for unknown pregnancy status",
      why: "The record shows the question was asked and lets the team act on the answer.",
      source: "rcr-irmer-2026",
      quote: "The response to pregnancy enquiries must be documented as evidence that the appropriate questions have been asked.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "If pregnancy cannot be excluded, do the pregnancy test set out in the local procedure, and consider deferring if doubt remains or treatment is not urgent; before molecular radiotherapy, never rely on menstrual history alone",
      why: "A test settles the question; a radioactive medicine cannot be taken back once given.",
      source: "rcr-irmer-2026",
      quote: "The confirmation of menstrual history alone is not considered adequate to exclude pregnancy.",
    },
    {
      action: "If the person is or may be pregnant, before or during the course, stop and tell the practitioner, who reconsiders whether the exposure is justified, with the medical physics expert",
      why: "The balance of benefit and risk changes when a pregnancy is involved, and treatment may be deferred, changed or, rarely, given with fetal shielding.",
      source: "rcr-irmer-2026",
      quote: "If the possibility of pregnancy is discovered before the exposure takes place, the operator should alert the practitioner, who should reconsider justification of the exposure.",
    },
    {
      action: "If a pregnant patient is to be treated deliberately, decide case by case, with a prior fetal dose risk assessment by the medical physics expert and, where needed, an obstetrician",
      why: "Planning and shielding can lower the dose to the fetus; the physics for estimating it is published.",
      source: "rcr-irmer-2026",
      quote: "The MPE must be involved in a prior risk assessment of exposures to such individuals.",
      grade: "Must (RCR guidance)",
    },
    {
      action: "Before molecular radiotherapy, ask anyone who has recently given birth whether they are breastfeeding, and do not give a radionuclide excreted in milk while breastfeeding continues",
      why: "The radioactive medicine passes into breast milk and to the baby.",
      source: "rcr-irmer-2026",
      quote: "Breastfeeding is completely contraindicated for MRT using radionuclides that are excreted in breast milk.",
    },
  ],
  bestInClass: {
    statement: "The RCR IR(ME)R guidance for radiotherapy (second edition, October 2026, with UKHSA) is the most current and detailed source read: a written employer's procedure; an operator enquiry, documented, for all people of childbearing potential in a set age range before the first planning and first treatment exposures; sensitive, private questioning with information in advance; safeguarding for under-16s; testing where pregnancy cannot be excluded or cycles are irregular; reconsideration of justification by the practitioner with the medical physics expert if pregnancy is possible; and, for molecular radiotherapy, exclusion of pregnancy by more than menstrual history and no breastfeeding with radionuclides excreted in milk. Fetal dose estimation and shielding, where a pregnant patient is treated, rest on AAPM TG-36 (1995).",
    sources: ["rcr-irmer-2026", "irmer-2017-schedule-2", "aapm-tg36-1995"],
  },
  variants: [
    {
      name: "Age range for asking",
      differs: "Most departments ask people of childbearing potential aged 12 to 55; some have agreed 10 to 55 with their obstetric team to fit local patients.",
      evidence: "Both are described by the RCR guidance as in use (12 to 55 in many departments); neither rests on a trial.",
      sources: ["rcr-irmer-2026"],
    },
    {
      name: "Routine pregnancy testing",
      differs: "Tests everyone in the age range, or everyone with irregular cycles, rather than asking and testing only where pregnancy cannot be excluded.",
      evidence: "The RCR guidance leaves this to the employer's procedure after a risk assessment, and requires an appropriate test for molecular radiotherapy where pregnancy must be excluded. No comparison of approaches was found.",
      sources: ["rcr-irmer-2026"],
    },
  ],
  grades: [
    { claim: "Operators must enquire about pregnancy where relevant", grade: "Legal requirement, IR(ME)R 2017 regulation 11(1)(f)", source: "rcr-irmer-2026" },
    { claim: "The employer's written procedures must cover enquiries about pregnancy and breastfeeding", grade: "Legal requirement, IR(ME)R 2017 Schedule 2, paragraph 1(c)", source: "irmer-2017-schedule-2", quote: "for making enquiries of individuals of childbearing potential to establish whether the individual is or may be pregnant or breastfeeding;" },
    { claim: "Making pregnancy or breastfeeding enquiries is an operator task", grade: "RCR guidance statement", source: "rcr-irmer-2026", quote: "Making pregnancy or breastfeeding enquiries in advance of an exposure is an operator task." },
    { claim: "A newly discovered pregnancy during a course leads the practitioner to reconsider justification", grade: "RCR guidance (should)", source: "rcr-irmer-2026", quote: "If the possibility of pregnancy is discovered after the exposure has been justified or during the course of treatment, the operator should alert the practitioner, who should reconsider justification of the exposure." },
    { claim: "Deliberate treatment of a pregnant patient is rare and case by case", grade: "RCR guidance (must)", source: "rcr-irmer-2026", quote: "These occasions are rare and must always be considered on a case-by-case basis." },
    { claim: "An unintended fetal exposure may need notifying", grade: "RCR guidance", source: "rcr-irmer-2026", quote: "If an unintended fetal exposure occurs, this may require notification to the relevant enforcing authority in accordance with published guidance." },
    { claim: "After molecular radiotherapy, patients are advised to avoid conception for set periods", grade: "RCR guidance (should), periods set by ARSAC", source: "rcr-irmer-2026", quote: "Male and female patients who wish to conceive following treatment should be advised to avoid getting pregnant for set periods of time as recommended by ARSAC." },
  ],
  sources: [
    {
      key: "rcr-irmer-2026",
      label: "IR(ME)R: Implications for clinical practice in radiotherapy, second edition. Guidance from the Radiotherapy Board (chapter 13, Pregnancy and breastfeeding enquiries)",
      publisher: "The Royal College of Radiologists, in association with the UK Health Security Agency",
      year: 2026,
      url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/ionising-radiation-medical-exposure-regulations-implications-for-clinical-practice-in-radiotherapy/",
      gradingScheme: "Not graded: guidance interpreting the Ionising Radiation (Medical Exposure) Regulations 2017; 'must' marks a legal or procedural requirement, 'should' and 'may' mark recommended and permitted practice.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "irmer-2017-schedule-2",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: Employer's Procedures",
      publisher: "UK Government (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2/made",
      gradingScheme: "Statutory instrument: binding in Great Britain, not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg36-1995",
      label: "Fetal dose from radiotherapy with photon beams: report of AAPM Radiation Therapy Committee Task Group No. 36",
      publisher: "AAPM (Medical Physics; Stovall et al.)",
      year: 1995,
      url: "https://doi.org/10.1118/1.597525",
      doi: "10.1118/1.597525",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  terms: ["cancer-in-pregnancy"],
  related: ["radiotherapy-patient-identification-and-time-out", "radiotherapy-consent"],
  upgrades: ["idea-pu-pregnancy-test-or-ask-before-radiotherapy"],
  gaps: [
    "Only UK guidance and IR(ME)R Schedule 2 were read. US, EU and other national rules on pregnancy enquiries before radiotherapy, the body of the IR(ME)R regulations and the ARSAC notes for guidance (which set conception and breastfeeding intervals after molecular radiotherapy) were not read.",
    "AAPM TG-36, the standard reference for fetal dose estimation and shielding, dates from 1995 and was read as an abstract only; no update was found.",
    "Consent for radiotherapy, which the census row pairs with this check, is a separate protocol (radiotherapy-consent); no consent guidance was read for this record.",
    "No study compares asking alone with routine testing for missed pregnancies in radiotherapy; the age range and testing rules are local decisions.",
  ],
});
