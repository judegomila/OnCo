import { protocol } from "./helpers";

/*
 * Consent for radiotherapy: who takes it, when, what it covers, and when it has to be taken again. The pregnancy
 * check before radiotherapy is its own protocol (radiotherapy-pregnancy-and-breastfeeding-enquiry).
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - The Royal College of Radiologists, National standard site-specific radiotherapy consent forms: Implementation
 *   (April 2021) and Development (April 2021): full text, PDFs from the RCR consent forms page, read with pdftotext.
 * - The RCR consent forms page (FAQs and the list of current forms): full text, HTML.
 * - RCR Radiotherapy consent form for breast cancer, January 2025 version 4: full text, as a worked example of the
 *   form (frequency bands, sections, patient statements).
 * - RCR position statement on radiotherapy consent forms and e-consent (page dated October 2026): full text, HTML.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: full text,
 *   legislation.gov.uk.
 * - GMC, Decision making and consent (2020): not reachable; the GMC site returned 403 to a script for both the web page
 *   and the PDF. Its content appears here only where the RCR documents quote it.
 * - Montgomery v Lanarkshire Health Board [2015] UKSC 11: the Supreme Court judgment address served a search page to a
 *   script; the court's words are quoted here as the RCR Development document quotes them.
 * - ACR-ASTRO Practice Parameter for Radiation Oncology: not reachable (the PDF address served an HTML shell).
 *
 * Quotes are copied from the raw text with line breaks joined.
 */
export const radiotherapyConsent = protocol({
  id: "radiotherapy-consent",
  name: "Consent for radiotherapy: who takes it, when, and what it must cover",
  aka: ["radiotherapy consent form", "consent for radiation therapy", "RCR consent forms", "site-specific radiotherapy consent", "informed consent radiotherapy", "Montgomery consent", "e-consent radiotherapy"],
  domain: "consent-and-communication",
  tldr: "Before radiotherapy starts you are asked to agree to it in writing, after someone trained in your kind of treatment has explained what it aims to do, its likely and rare side effects, the other options including no treatment, and anything that matters to you in particular. You should have time to think, you are asked to confirm before treatment begins, and you can change your mind at any point.",
  simple: "Before radiotherapy a doctor, or a specially trained radiographer or nurse, explains the treatment, its side effects and the other choices, including not having it. You sign a form and get a copy. You can ask for more time or a second talk, and you can stop at any time.",
  summary: "In the UK, consent for radiotherapy follows the GMC's Decision making and consent (2020) and the Montgomery judgment (2015): the patient must be told of any material risk, judged by what a reasonable person in their position, or this particular patient, would think significant, and of reasonable alternatives including no treatment. The Royal College of Radiologists (RCR) publishes national site-specific consent forms (most sites, plus SRS, brachytherapy and a blank form; current versions from 2025, with Welsh-language versions), written with lawyers, patients and risk communication specialists, which list expected (50% to 100%), common (10% to 50%), less common (under 10%) and rare (under 1%) early and late side effects. The RCR recommends but does not mandate them.\n\nThe RCR implementation guidance (2021): consent is taken by a consultant clinical oncologist, a trained clinical oncology doctor, or an expert radiographer or specialist nurse trained in consent for that site; it is documented before the first fraction, ideally days before; it is confirmed before treatment starts (for example at planning); a patient in doubt is offered a second consultation; consent is renewed after a material change such as a new site or diagnosis; and withdrawal is documented. The forms are for adults with capacity only, not for children or adults who lack capacity. Patient-specific risks (job, health, activities, previous radiotherapy, radiosensitising drugs) are written in, and alternatives including no treatment are recorded in the notes. Separately, IR(ME)R 2017 requires employers' procedures to give the person, wherever practicable and before exposure, adequate information on the benefits and risks of the radiation dose. The RCR endorses no commercial e-consent platform and warns that some do not transfer the full signed form to the electronic record.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "radiographer", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department"],
  },
  population: "Adults with capacity having external beam radiotherapy or brachytherapy, as the RCR forms are scoped (the forms say over 16). Children and young people, and adults who lack capacity, need the hospital's alternative consent process and are not covered by the RCR forms. The pregnancy check is a separate protocol.",
  trigger: "A decision to offer a course of radiotherapy; again at the planning appointment or before the first fraction; and whenever the planned treatment changes materially.",
  steps: [
    {
      action: "Have consent taken by someone trained and experienced in this treatment site: a consultant clinical oncologist, a clinical oncology doctor trained in consent for that plan, or an expert radiographer or specialist nurse trained in consent for that site",
      why: "The person explaining has to know the treatment well enough to answer your questions about it.",
      source: "rcr-implementation-2021",
      quote: "Consent should be taken by a healthcare professional with sufficient training and experience who is also experienced in the management of the radiotherapy treatment site and protocol.",
    },
    {
      action: "Discuss the alternatives, including no treatment, before taking consent, and record that discussion in the notes",
      why: "Agreeing to a treatment only means something if you know what else you could choose.",
      source: "rcr-implementation-2021",
      quote: "In light of the Montgomery judgment it is essential that alternative treatments are discussed with the patient prior to the process of taking consent.",
    },
    {
      action: "Explain every risk that a reasonable person in the patient's position, or this patient, would think significant, even if it is rare",
      why: "The law in the UK since 2015 is that you are told what matters to you, not only what doctors usually mention.",
      source: "rcr-development-2021",
      quote: "The test of materiality is whether, in the circumstances of the particular case, a reasonable person in the patient’s position would be likely to attach significance to the risk, or the doctor is or should reasonably be aware that the particular patient would be likely to attach significance to it.",
    },
    {
      action: "Use the site-specific form for this treatment, and write in risks particular to this person (their job, health, activities, earlier radiotherapy, radiosensitising medicines)",
      why: "A side effect that is minor for most people can matter a great deal to one person, such as a voice change for a singer.",
      source: "rcr-implementation-2021",
      quote: "Discussions should be personalised and must include any specific risks that are likely to be significant to that patient.",
    },
    {
      action: "Give information on the benefits and risks of the radiation dose before the exposure, wherever practicable, as the department's IR(ME)R procedures require",
      why: "UK radiation law requires that people know why they are being exposed and what the dose may do.",
      source: "irmer-2017",
      quote: "providing that wherever practicable, and prior to an exposure taking place, the individual to be exposed or their representative is provided with adequate information relating to the benefits and risks associated with the radiation dose from the exposure;",
    },
    {
      action: "Take and document consent before the first treatment, leaving days, not hours, to reconsider where possible (emergencies such as spinal cord compression excepted)",
      why: "Time to think, talk to family and come back with questions makes the decision your own.",
      source: "rcr-implementation-2021",
      quote: "Ideally there should be time (measured in days rather than hours) for the patient to reconsider their decision to undergo treatment before the first fraction is administered.",
    },
    {
      action: "When consent was taken in advance, ask the person to confirm it before treatment starts, for example at the planning appointment, and record this on the form",
      why: "Weeks may pass between the clinic and the first treatment; a person may have new questions or a change of mind.",
      source: "rcr-implementation-2021",
      quote: "When consent is taken in advance of treatment the patient should be asked to confirm consent before the start of treatment, for example, at their planning appointment.",
    },
    {
      action: "If the person has doubts, offer a second consultation with a suitably trained professional before treatment begins",
      why: "Doubts deserve a proper conversation, not a signature under pressure.",
      source: "rcr-implementation-2021",
      quote: "Where a patient expresses doubt about proceeding with the treatment, the opportunity to have a second consultation with a suitably trained and experienced healthcare professional prior to commencing treatment should be offered.",
    },
    {
      action: "Seek consent again if the treatment changes materially from what was discussed, such as a different site or a new diagnosis",
      why: "Agreement to one treatment is not agreement to a different one.",
      source: "rcr-implementation-2021",
      quote: "Renewed consent should be sought where there is material change in the radiotherapy which will be delivered, which was not discussed at the initial consent.",
    },
    {
      action: "Accept withdrawal of consent at any time, discuss it, and record it fully",
      why: "You can stop treatment whenever you choose; the team should talk through what stopping means and write it down.",
      source: "rcr-implementation-2021",
      quote: "A patient can withdraw consent at any time. Where consent is withdrawn this should be discussed and documented in full in the patient notes.",
    },
    {
      action: "Do not use the RCR adult forms for children or for adults who lack capacity; use the hospital's alternative process",
      why: "Decisions for children and for adults who cannot decide for themselves follow different legal rules.",
      source: "rcr-implementation-2021",
      quote: "The RCR SSR consent forms should not be used in situations where a patient lacks capacity. In this situation the hospital should provide an appropriate alternative form. The RCR SSR consent forms should not be used for children/minors who are undergoing radiotherapy.",
    },
    {
      action: "Give the person a copy of the completed form and file it in their record; have a local way for people to opt out of their treatment data being used for research, audit and teaching",
      why: "You keep a record of what you agreed to, and you have a say in how your information is used beyond your care.",
      source: "rcr-implementation-2021",
      quote: "It is important that departments also have a local policy for patients to opt out of the use of information collected during radiotherapy being used in research, audit and teaching.",
    },
    {
      action: "If an electronic consent system is used, check locally that it reproduces the current RCR form exactly and transfers the whole signed form into the electronic record",
      why: "Some e-consent systems have been found to drop important details when the form is saved to the patient record.",
      source: "rcr-econsent-2026",
      quote: "There is some evidence showing that with certain commercial e-consent forms, critical details of the e-consent are not transcribed when the signed e-consent is transferred to the patient’s electronic patient record.",
    },
  ],
  bestInClass: {
    statement: "In the UK: consent by a professional trained in that site, after a discussion of alternatives including no treatment and of every risk material to this patient (Montgomery 2015; GMC 2020), recorded on the RCR national site-specific form with patient-specific risks written in, taken days before the first fraction where possible, confirmed before treatment begins, renewed after any material change, and withdrawable at any time (RCR implementation guidance 2021; forms reissued 2025). IR(ME)R 2017 separately requires information on the benefits and risks of the radiation dose before exposure wherever practicable. These are consensus and legal standards; no trial compares consent processes for radiotherapy on outcomes. Practice outside the UK (the ACR-ASTRO practice parameter in the United States) could not be read here.",
    sources: ["rcr-implementation-2021", "rcr-development-2021", "rcr-forms-page", "irmer-2017"],
  },
  variants: [
    {
      name: "Locally written consent forms instead of the RCR national forms",
      differs: "Many UK centres had their own site-specific forms before the national set; the RCR found no consensus on which side effects they listed. The RCR forms are recommended, not mandatory, and adoption goes through each hospital's consent or governance committee.",
      evidence: "RCR Development (2021): 54% of centres had a site-specific consent form for prostate cancer, with no consensus between them on the side effects included.",
      sources: ["rcr-development-2021", "rcr-implementation-2021"],
    },
    {
      name: "Electronic consent platforms",
      differs: "Commercial e-consent systems present the consent form on a screen and save it to the electronic record. The RCR endorses none of them, says it knows of none that faithfully reproduces its forms, and asks organisations using them to risk-assess content accuracy, transfer to the record, updates and version control.",
      evidence: "RCR position statement (2026), citing some evidence that critical details are lost on transfer to the electronic record.",
      sources: ["rcr-econsent-2026"],
    },
    {
      name: "Sending the form to the patient before the appointment",
      differs: "The RCR FAQs discuss sending forms in advance; the forms carry the patient's own initials on each page of side effects and a statement that alternatives were discussed.",
      evidence: "No trial; RCR practice advice.",
      sources: ["rcr-forms-page", "rcr-breast-form-2025"],
    },
  ],
  grades: [
    { claim: "The RCR recommends but does not mandate its site-specific forms", grade: "ungraded (college guidance)", source: "rcr-implementation-2021", quote: "The RCR supports and advises that hospitals use the SSR consent forms for radiotherapy. However, the RCR does not mandate the use of these forms." },
    { claim: "A form does not replace the conversation", grade: "ungraded (college guidance)", source: "rcr-implementation-2021", quote: "The consent form does not replace the need for a conversation and dialogue around the consent process." },
    { claim: "Information on benefits and risks of the dose before exposure", grade: "statutory requirement (IR(ME)R 2017, Schedule 2)", source: "irmer-2017" },
    { claim: "The RCR endorses no commercial e-consent platform", grade: "ungraded (position statement)", source: "rcr-econsent-2026", quote: "The RCR does not currently endorse ANY commercial e-consent platform for the delivery of radiotherapy consent forms." },
  ],
  sources: [
    {
      key: "rcr-implementation-2021",
      label: "National standard site-specific radiotherapy consent forms: Implementation",
      publisher: "The Royal College of Radiologists",
      year: 2021,
      url: "https://www.rcr.ac.uk/media/1econldf/implementation-of-the-national-site-specific-radiotherapy-consent-forms.pdf",
      gradingScheme: "College guidance; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rcr-development-2021",
      label: "National standard site-specific radiotherapy consent forms: Development (quotes Montgomery v Lanarkshire Health Board [2015] UKSC 11 and GMC Decision making and consent 2020)",
      publisher: "The Royal College of Radiologists",
      year: 2021,
      url: "https://www.rcr.ac.uk/media/45jjjpaj/development-of-the-national-site-specific-radiotherapy-consent-forms.pdf",
      gradingScheme: "College guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rcr-forms-page",
      label: "National radiotherapy consent forms (current forms, FAQs and supporting documents)",
      publisher: "The Royal College of Radiologists",
      year: 2025,
      url: "https://www.rcr.ac.uk/our-services/management-service-delivery/national-radiotherapy-consent-forms/",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rcr-breast-form-2025",
      label: "Radiotherapy consent form for breast cancer, January 2025 version 4",
      publisher: "The Royal College of Radiologists",
      year: 2025,
      url: "https://www.rcr.ac.uk/media/ajnh3df2/250116_dc23013b-rcr-breast-cancer-consent-form-5.pdf",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rcr-econsent-2026",
      label: "Position Statement on radiotherapy consent forms and e-consent",
      publisher: "The Royal College of Radiologists",
      year: 2026,
      url: "https://www.rcr.ac.uk/news-policy/latest-updates/rcr-position-statement-on-radiotherapy-consent-forms-and-e-consent/",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "irmer-2017",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: Employer's procedures",
      publisher: "UK legislation (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2/made",
      gradingScheme: "Statute; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "gmc-consent-2020",
      label: "Decision making and consent",
      publisher: "General Medical Council",
      year: 2020,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/decision-making-and-consent",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "acr-astro-practice-parameter",
      label: "ACR-ASTRO Practice Parameter for Radiation Oncology",
      publisher: "American College of Radiology and American Society for Radiation Oncology",
      year: 2023,
      url: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Practice-Parameters-and-Technical-Standards",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  terms: ["informed-consent"],
  institutions: ["astro"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The GMC's Decision making and consent (2020) could not be read: the GMC site returned 403 to a script. Its content appears only as the RCR documents quote it.",
    "The Montgomery judgment was not read from the court's own text; its words are quoted as the RCR Development document gives them.",
    "Consent practice outside the UK was not read: the ACR-ASTRO practice parameter served an HTML shell to a script, and no European consensus on radiotherapy consent was found.",
    "No trial evidence was found comparing consent processes for radiotherapy (forms, timing, e-consent, decision aids) on understanding, regret or outcomes; the standards here are legal and consensus.",
    "Consent for children and for adults who lack capacity is outside the RCR forms and is not detailed here.",
    "The RCR implementation and development documents date from April 2021; the forms themselves were reissued in 2025, and no newer version of the implementation guidance was found on the RCR page.",
  ],
});
