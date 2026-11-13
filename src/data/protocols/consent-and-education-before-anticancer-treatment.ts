import { protocol } from "./helpers";

/*
 * Informed consent and pre-treatment education before a course of systemic anticancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216), Domain 2 (patient
 *   consent and education) and standard 1.9: full text, read by the first protocol agent from the Internet Archive's
 *   capture of ascopubs.org (copy in /tmp/pf-chemo). The standards are not graded.
 * - GMC, Decision making and consent (in effect 9 November 2020, last updated 3 August 2026): full text, PDF from
 *   gmc-uk.org. Professional standards for UK doctors, physician associates and anaesthesia associates; not graded.
 * - NICE NG197, Shared decision making (published 17 June 2021): recommendations page, full text, HTML.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - Healthcare Improvement Scotland's guidance on consent for SACT in adults, which BOPA cites, and UK regimen-specific
 *   consent forms were not read.
 *
 * Quotes are copied with line breaks joined only.
 */
export const consentAndEducationBeforeAnticancerTreatment = protocol({
  id: "consent-and-education-before-anticancer-treatment",
  name: "Consent and education before anticancer treatment",
  aka: ["chemotherapy consent", "SACT consent", "informed consent for chemotherapy", "chemotherapy education session", "pre-chemotherapy teaching", "chemo school", "new patient chemotherapy talk"],
  domain: "consent-and-communication",
  tldr: "Before cancer drug treatment starts, you should be told what the treatment is for, what it involves, its likely benefits and side effects, what the other options are (including no treatment), and given time to decide. You should also get written information and a 24-hour number, and be told which symptoms mean you must call straight away.",
  simple: "Before treatment, the team should explain why you are having it, what it is like, the risks and the other choices, and give you time and written information. You can ask questions and change your mind.",
  summary: "Consent is a process, not a form. The GMC's standard (2020, updated 2026) sets seven principles: patients are involved in decisions, given the information they need and the time and support to understand it; professionals find out what matters to the patient and share the benefits and harms of the options and reasonable alternatives, including taking no action; adults are presumed to have capacity. Information usually includes diagnosis and prognosis and their uncertainties, the options, what each involves and the likely benefits, risks of harm and chance of success, with recognised risks anyone in the patient's position would want to know, tailored to the individual. A consent form is a useful prompt and record but no substitute for dialogue, and the decision should be reviewed immediately before treatment and regularly during it. NICE NG197 adds time to decide, teach-back and a written summary afterwards.\n\nThe cancer-specific standard is ASCO-ONS (2024): an organisational policy for consent for anticancer treatment by any route, consent documented before the regimen starts, and education, verbal and written or electronic and in the patient's preferred language, before the first dose of each treatment plan. Its minimum content: diagnosis; goals of treatment (cure, longer life or symptom control); duration, schedule, missed doses, drug names, supportive medicines and interactions; current medicines including herbal products; short- and long-term side effects including infertility; pregnancy prevention; symptoms needing a call or urgent care; when to stop oral treatment; safe handling at home; follow-up; contact details and when to call; and the missed-appointment policy, involving family and carers as needed. BOPA (2025) asks pharmacists to confirm consent at the first-cycle check and that consent is taken by a trained professional.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults starting a new course of systemic anticancer treatment by any route; children and young people need assent and the consent of those with parental responsibility (ASCO-ONS and GMC, which points to its separate guidance for under-18s). People who may lack capacity are assessed and decided for under the law that applies where they are.",
  trigger: "A new anticancer treatment plan is proposed, including a change to a new regimen.",
  steps: [
    {
      action: "Share the information the person wants or needs: diagnosis and outlook and their uncertainties, the options including no treatment, what each involves, and its likely benefits, harms and chance of success",
      why: "A decision is only informed if the person knows the alternatives and what matters about each.",
      source: "gmc-2020",
      quote: "You must give patients the information they want or need to make a decision.",
    },
    {
      action: "Tailor the discussion of risks to what matters to the person, always including recognised risks that anyone in their position would want to know",
      why: "Listing every possible side effect overwhelms; leaving out ones that matter to the person is not informed consent.",
      source: "gmc-2020",
      quote: "Recognised risks of harm that you believe anyone in the patient’s position would want to know.",
    },
    {
      action: "State the goal of treatment plainly: cure, longer life or relief of symptoms",
      why: "People often overestimate the chance of cure; the aim changes how much side effect is worth accepting.",
      source: "asco-ons-2024",
      quote: "Goals of treatment, that is, cure disease, prolong life, or reduce symptoms",
    },
    {
      action: "Give the person the time and support they need to decide, and check understanding, for example by asking them to explain it back",
      why: "Rushed decisions are more often regretted, and teach-back shows what has really been understood.",
      source: "nice-ng197",
      quote: "1.2.12 Give people (and their family members, friends or carers, as appropriate) the time they need to make decisions about tests, treatments and interventions.",
    },
    {
      action: "Document informed consent before the regimen starts, following the organisation's standard process, and have consent taken by a trained professional",
      why: "A clear record, made by someone who knows the treatment, protects the person and lets every later checker confirm it.",
      source: "asco-ons-2024",
      quote: "Informed consent and assent (if applicable) for antineoplastic therapy, as appropriate to the treatment population, is documented before initiation of the regimen",
    },
    {
      action: "Before the first dose, give verbal and written or electronic education in the person's preferred language, and record what was covered",
      why: "People remember little of a single conversation; written material in their own language lets them go back to it.",
      source: "asco-ons-2024",
      quote: "Patients are provided with verbal and written or electronic information as part of an education process before the first administration of antineoplastic agents in each treatment plan. The content of this educational material will be documented and should be administered in the patient's preferred language.",
    },
    {
      action: "Cover short- and long-term side effects, including effects on fertility, and pregnancy prevention",
      why: "Some effects, such as infertility, can only be prevented before treatment starts.",
      source: "asco-ons-2024",
      quote: "Potential long-term and short-term adverse effects of therapy, including infertility risks for appropriate patients",
    },
    {
      action: "Tell the person which symptoms mean they must call the team or seek urgent care, and give contact details, with when and whom to call",
      why: "Infection and other emergencies during treatment need treating within hours.",
      source: "asco-ons-2024",
      quote: "Symptoms or adverse effects that require the patient to contact the health care organization or to seek immediate attention",
    },
    {
      action: "Explain safe handling of medicines and body fluids at home, including storage, disposal and spills",
      why: "Anticancer drugs at home can harm carers, children and pets if handled or thrown away wrongly.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Include family or carers in the education according to the person's ability to manage treatment, and match teaching to their needs and readiness",
      why: "Carers often give oral medicines and spot problems first.",
      source: "asco-ons-2024",
      quote: "Education includes family, caregivers, or others on the basis of the patient's ability to assume responsibility for managing therapy.",
    },
    {
      action: "Review the decision immediately before treatment and regularly during a course, giving the chance to ask questions",
      why: "Consent can change as side effects, results and circumstances change.",
      source: "gmc-2020",
      quote: "You should review a patient’s decision immediately before providing treatment or care and, if treatment is ongoing, make sure there are clear arrangements in place to review decisions regularly, allowing patients opportunity to ask questions and discuss any concerns.",
    },
  ],
  bestInClass: {
    statement: "Consent as a dialogue built on what matters to the person, covering the options including no treatment and the recognised risks anyone would want to know, with time to decide and a review before and during treatment (GMC 2020, updated 2026; NICE NG197). For anticancer treatment, ASCO-ONS (2024) adds documented consent before the regimen starts and a defined minimum of verbal and written education in the person's language before the first dose, including goals of treatment, fertility, pregnancy prevention, when to call, safe handling at home and contact details. None of these standards is graded; ASCO-ONS rests on a systematic review and panel consensus.",
    sources: ["gmc-2020", "nice-ng197", "asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Consent form as the record (UK practice)",
      differs: "Uses a written consent form, often specific to the regimen, signed before the first cycle and checked by the pharmacist at verification.",
      evidence: "The GMC says forms are a helpful prompt and record that make review easier but are no substitute for a meaningful dialogue. BOPA requires the pharmacist to check consent before the first cycle. Regimen-specific UK forms were not read.",
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
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  terms: ["informed-consent"],
  related: ["oral-anticancer-medicines-at-home", "sact-prescribing-and-pharmacy-verification", "anticancer-drug-interaction-review"],
  upgrades: [],
  gaps: [
    "None of the standards read is graded, and no trial shows which form of pre-treatment education prevents most harm.",
    "The GMC standard binds UK doctors and associates; nurses and pharmacists who take consent follow their own regulators' codes, which were not read.",
    "Healthcare Improvement Scotland's guidance on consent for SACT and UK regimen-specific consent forms were not read.",
    "Fertility preservation is named here only as a topic to raise; the referral pathway belongs to a fertility protocol.",
  ],
});
