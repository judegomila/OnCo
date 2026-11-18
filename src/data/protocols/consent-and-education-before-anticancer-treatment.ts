import { protocol } from "./helpers";

/*
 * Informed consent and pre-treatment education before a course of systemic anticancer treatment.
 *
 * First pass, 11 November 2026 (fetched raw and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216), Domain 2 (patient
 *   consent and education) and standard 1.9: full text, read then from the Internet Archive's capture of ascopubs.org.
 *   The standards are not graded.
 * - GMC, Decision making and consent (in effect 9 November 2020, last updated 3 August 2026): full text, PDF from
 *   gmc-uk.org. Professional standards for UK doctors, physician associates and anaesthesia associates; not graded.
 * - NICE NG197, Shared decision making (published 17 June 2021): recommendations page, full text, HTML.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - Healthcare Improvement Scotland's guidance on consent for SACT in adults, which BOPA cites, and UK regimen-specific
 *   consent forms were not read.
 *
 * Second accuracy pass, 17 November 2026:
 * - ASCO-ONS 2024 was re-read in full as raw text in the Oncology Nursing Society's co-publication (Oncology Nursing
 *   Forum, July 2024, 51(4), the open advance-print PDF from ons.org, converted with pdftotext), using the copy another
 *   checker fetched that day: Table 4 (Domain 2), Table 2 (standards 1.5, 1.11 and 1.12), the commentary on standards
 *   2.3.5 and 2.3.6, and the glossary entries for assent and consent. The two quotes that print an apostrophe now
 *   carry the source's typographic apostrophe.
 * - NICE NG197 was fetched again from nice.org.uk with curl (overview and recommendations pages) and read as text with
 *   tags stripped. Published 17 June 2021, last reviewed 17 June 2021; no update listed.
 * - BOPA version 5.0 was re-read from the PDF text another checker fetched from bopa.org.uk that day (sections 3.6 and
 *   4.1, Table 1 and the appendix checklist).
 * - GMC, Decision making and consent could NOT be re-read: gmc-uk.org returned 403 (a browser check) to a script, and
 *   one request to the Internet Archive returned 429. Its three quotes and the statements attributed to it stand as
 *   first read and are named in `gaps`.
 * - Every `why` line was rewritten to say only what a source read on 17 November states; several had given reasons
 *   (recall, regret, harm to carers and pets, treatment within hours) that no cited source states.
 *
 * Quotes are copied with line breaks joined only. A script checked each ASCO-ONS and NICE quote verbatim against the
 * saved text.
 */
export const consentAndEducationBeforeAnticancerTreatment = protocol({
  id: "consent-and-education-before-anticancer-treatment",
  name: "Consent and education before anticancer treatment",
  aka: ["chemotherapy consent", "SACT consent", "informed consent for chemotherapy", "chemotherapy education session", "pre-chemotherapy teaching", "chemo school", "new patient chemotherapy talk"],
  domain: "consent-and-communication",
  tldr: "Before cancer drug treatment starts, you should be told what the treatment is for, what it involves, its likely benefits and side effects, and the other options (including no treatment), and be given the time you need to decide. You should also get written information, be told which symptoms mean you need to contact the team or get help straight away, and be given contact details.",
  simple: "Before treatment, the team should explain why you are having it, what it is like, the risks and the other choices, and give you time and written information. You can ask questions, and you can change your mind at any time.",
  summary: "Consent is a process, not a form. Three of the sources are British (the GMC for doctors across the UK, NICE and BOPA) and one is American (ASCO-ONS); consent law differs by country and no statute or court judgment was read for this page. The GMC's standard (2020, updated 2026), which was read on 11 November 2026 and could not be re-read on 17 November, sets seven principles: patients are involved in decisions, given the information they need and the time and support to understand it; professionals find out what matters to the patient and share the benefits and harms of the options and reasonable alternatives, including taking no action; adults are presumed to have capacity. Information usually includes diagnosis and prognosis and their uncertainties, the options, what each involves and the likely benefits, risks of harm and chance of success, with recognised risks anyone in the patient's position would want to know, tailored to the individual. A consent form is a useful prompt and record but no substitute for dialogue, and the decision should be reviewed immediately before treatment and regularly during it. NICE NG197 (2021), written for adults, asks for an open discussion of the risks, benefits and consequences of each option, including no treatment; information in manageable chunks with understanding checked, for example by teach-back; the time people need to decide; an agreed time to review the decision, which the person can change at any time; and resources afterwards in the person's preferred format, such as a printout summarising the options and decisions.\n\nThe cancer-specific standard is ASCO-ONS (2024): an organisational policy for consent for anticancer treatment by any route, consent documented before the regimen starts, and education, verbal and written or electronic and in the patient's preferred language, before the first dose of each treatment plan. Its minimum content: diagnosis; goals of treatment (cure, longer life or symptom control); duration, schedule, missed doses, drug names, supportive medicines and interactions; current medicines including herbal products; short- and long-term side effects, including infertility risks for appropriate patients; pregnancy prevention; symptoms needing a call or immediate attention; when to stop oral or other self-administered treatment at once; safe handling at home; follow-up; contact details and when and whom to call; and the missed-appointment policy. Family and carers are included according to the patient's ability to manage the treatment. A separate standard (1.12) asks each organisation for a policy giving 24/7 triage to a licensed practitioner, for example on-call practitioners or an emergency department. In the UK, BOPA (2025) says consent must be obtained by a trained and appropriately experienced healthcare professional, and asks the pharmacist verifying cycle 1 of a new regimen to check that the patient has been consented.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults and children starting a new plan of systemic anticancer treatment by any route. ASCO-ONS, written in the United States, covers adult and paediatric oncology: it defines assent as the agreement of someone too young to give informed consent, and says informed consent must then still be obtained from the parents or guardian under the applicable state and federal laws. Who may consent for a child or young person differs by country, and UK law on that was not read for this page. NICE NG197 is written for adults aged 18 and over and does not cover an adult who lacks the mental capacity to make the decision at the time; NICE has a separate guideline on decision-making and mental capacity.",
  trigger: "A new anticancer treatment plan is proposed, including a change to a new regimen.",
  steps: [
    {
      action: "Share the information the person wants or needs: diagnosis and outlook and their uncertainties, the options including no treatment, what each involves, and its likely benefits, harms and chance of success",
      why: "The GMC writes this as a duty for UK doctors. NICE NG197 likewise asks for an open discussion of the risks, benefits and consequences of each option, making sure the person knows this includes choosing no treatment.",
      source: "gmc-2020",
      quote: "You must give patients the information they want or need to make a decision.",
    },
    {
      action: "Tailor the discussion of risks to what matters to the person, always including recognised risks that anyone in their position would want to know",
      why: "NICE NG197 also asks for information on risks, benefits and consequences to be personalised as much as possible, making clear how it applies to the person and how much uncertainty goes with it.",
      source: "gmc-2020",
      quote: "Recognised risks of harm that you believe anyone in the patient’s position would want to know.",
    },
    {
      action: "State the goal of treatment plainly: cure, longer life or relief of symptoms",
      why: "The goal is on the standard's minimum list for education. NICE NG197 also asks professionals to clarify what the person hopes to gain from a treatment and to discuss any misconceptions.",
      source: "asco-ons-2024",
      quote: "Goals of treatment, that is, cure disease, prolong life, or reduce symptoms",
    },
    {
      action: "Give the person the time and support they need to decide, and check understanding, for example by asking them to explain it back",
      why: "NICE asks for information in manageable chunks with understanding checked along the way, for example by teach-back, where the person explains back what has been discussed, and for enough time to be set aside for questions.",
      source: "nice-ng197",
      quote: "1.2.12 Give people (and their family members, friends or carers, as appropriate) the time they need to make decisions about tests, treatments and interventions.",
    },
    {
      action: "Document informed consent before the regimen starts, following the organisation's standard process",
      why: "ASCO-ONS asks each organisation for a standard process for obtaining and recording consent, whatever the route of treatment. In the UK, BOPA says consent must be obtained by a trained and appropriately experienced healthcare professional, and the pharmacist verifying cycle 1 checks that the patient has been consented.",
      source: "asco-ons-2024",
      quote: "Informed consent and assent (if applicable) for antineoplastic therapy, as appropriate to the treatment population, is documented before initiation of the regimen",
    },
    {
      action: "Before the first dose, give verbal and written or electronic education in the person's preferred language, and record what was covered",
      why: "NICE NG197 likewise asks that people are offered resources in their preferred format to help them understand what was discussed and agreed, ideally to take away or very soon afterwards.",
      source: "asco-ons-2024",
      quote: "Patients are provided with verbal and written or electronic information as part of an education process before the first administration of antineoplastic agents in each treatment plan. The content of this educational material will be documented and should be administered in the patient’s preferred language.",
    },
    {
      action: "Cover short- and long-term side effects, including the risk of infertility where it applies, and pregnancy prevention including contraception",
      why: "The panel says fertility should be discussed as part of informed consent, with possible referral to reproductive specialists for fertility preservation, and that advice on preventing pregnancy follows because anticancer treatment is known to be able to harm a developing baby.",
      source: "asco-ons-2024",
      quote: "Potential long-term and short-term adverse effects of therapy, including infertility risks for appropriate patients",
    },
    {
      action: "Tell the person which symptoms or side effects mean they need to contact the team or seek immediate attention, and give contact details, with when and whom to call",
      why: "Both are on the standard's minimum list. The standards also ask each organisation for a policy giving 24/7 triage to a licensed practitioner for treatment-related toxicities and emergencies.",
      source: "asco-ons-2024",
      quote: "Symptoms or adverse effects that require the patient to contact the health care organization or to seek immediate attention",
    },
    {
      action: "Explain safe handling of medicines and body fluids at home, including storage, disposal of waste, unused medicines and spills",
      why: "Home safe handling is on the standard's minimum list for education before the first dose; the standard does not give a reason.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Include family or carers in the education according to the person's ability to manage treatment, and match teaching to the person's learning needs, abilities, preferences and readiness",
      why: "NICE NG197 asks professionals to ask the person whether they want family, friends, carers or advocates involved, as a way to help them take part, explain what matters to them and remember what they were told.",
      source: "asco-ons-2024",
      quote: "Education includes family, caregivers, or others on the basis of the patient’s ability to assume responsibility for managing therapy.",
    },
    {
      action: "Review the decision immediately before treatment and regularly during a course, giving the chance to ask questions",
      why: "NICE NG197 asks for an agreed time to review a decision, and says people can review it earlier if they want to and can change their mind at any time.",
      source: "gmc-2020",
      quote: "You should review a patient’s decision immediately before providing treatment or care and, if treatment is ongoing, make sure there are clear arrangements in place to review decisions regularly, allowing patients opportunity to ask questions and discuss any concerns.",
    },
  ],
  bestInClass: {
    statement: "Consent as a dialogue built on what matters to the person, covering the options including no treatment and the recognised risks anyone would want to know, with time to decide and a review before and during treatment (GMC 2020, updated 2026, for UK doctors, not re-read on 17 November 2026; NICE NG197 for adults). For anticancer treatment, ASCO-ONS (2024, United States) adds documented consent before the regimen starts and a defined minimum of verbal and written or electronic education in the person's preferred language before the first dose, including goals of treatment, infertility risks, pregnancy prevention, when to call, safe handling at home and contact details. None of these standards is graded; ASCO-ONS rests on a systematic review, informal consensus and expert opinion.",
    sources: ["gmc-2020", "nice-ng197", "asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Consent form as the record (UK practice)",
      differs: "Records consent on a written form, which the pharmacist verifying the first cycle of a new regimen can use to check that the patient has been consented.",
      evidence: "The GMC, as first read, says forms are a helpful prompt and record that make review easier but are no substitute for a meaningful dialogue. BOPA's verification standards for cycle 1 of a new regimen include checking that the patient has been consented for treatment, and list the consent form among the example sources of information. The regimen-specific consent forms used in the UK were not read. Not graded.",
      sources: ["gmc-2020", "bopa-2025"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), informal expert panel consensus, expert opinion and public comment.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gmc-2020",
      label: "Decision making and consent (professional standards, in effect 9 November 2020, last updated 3 August 2026)",
      publisher: "General Medical Council",
      year: 2020,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/decision-making-and-consent",
      gradingScheme: "Professional standards; 'must' marks a duty and 'should' an explanation of how to meet it. Not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng197",
      label: "Shared decision making (NG197), recommendations",
      publisher: "NICE",
      year: 2021,
      url: "https://www.nice.org.uk/guidance/ng197/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  terms: ["informed-consent"],
  related: ["oral-anticancer-medicines-at-home", "sact-prescribing-and-pharmacy-verification", "anticancer-drug-interaction-review"],
  upgrades: [],
  gaps: [
    "None of the standards read is graded, and no trial shows which form of pre-treatment education prevents most harm.",
    "The GMC's Decision making and consent was read in full on 11 November 2026 but could not be re-read for the second accuracy pass: on 17 November 2026 gmc-uk.org returned 403 to a script and the Internet Archive returned 429. The three steps quoting it, their quotes, its seven principles, its wording on consent forms and its edition dates therefore stand as first read and were not checked a second time. NICE NG197, which was re-read, separately supports discussing every option including no treatment, personalising information on risks, and reviewing a decision.",
    "The GMC standard binds UK doctors and associates; nurses and pharmacists who take consent follow their own regulators' codes, which were not read.",
    "Consent law differs by country. No statute or court judgment was read, and the law on consent for children and young people and for adults who lack capacity is not set out here. ASCO-ONS is written for the United States and refers to state and federal law; NICE NG197 covers adults only.",
    "ASCO-ONS says patients must be told which symptoms need a call or immediate attention but does not list them, and no source read for this page gives such a list or a time limit; the treating team's own written information is where that list should be.",
    "Whether version 5.0 is still BOPA's latest edition could not be confirmed on 17 November 2026, because the BOPA web page refused a script; the PDF itself was read.",
    "Healthcare Improvement Scotland's guidance on consent for SACT and UK regimen-specific consent forms were not read.",
    "Fertility preservation is named here only as a topic to raise; the referral pathway belongs to a fertility protocol.",
  ],
});
