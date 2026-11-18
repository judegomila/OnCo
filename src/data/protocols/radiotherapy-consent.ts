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
 *
 * Second reading, 17 November 2026 (every source fetched again raw with curl; PDFs read with pdftotext, HTML with tags
 * stripped by script; every quote checked verbatim by script):
 * - RCR Implementation and Development (April 2021), the RCR consent forms page, the breast form (January 2025
 *   version 4) and the e-consent position statement (dated 30 October 2026): all read again in full. The forms page
 *   still links the April 2021 documents; no newer edition was found.
 * - Montgomery v Lanarkshire Health Board [2015] UKSC 11: now read in full from the National Archives Find Case Law
 *   service; the materiality test is paragraph 87 and matches the RCR's quotation.
 * - IR(ME)R 2017, Schedule 2: read in the latest revised version, as amended from 1 October 2024 by SI 2024/896.
 *   Paragraph 1(i) is unchanged. The regulations extend to England, Wales and Scotland, not Northern Ireland.
 * - GMC, Decision making and consent: still 403 to a script. ACR-ASTRO practice parameter: still an HTML shell.
 * - Corrected: the forms page FAQ lists the question about sending forms in advance and prints no answer; the
 *   e-consent step now follows the RCR's own wording; IR(ME)R is scoped to Great Britain; reasons in `why` that no
 *   source states (a singer's voice, weeks between clinic and treatment, different legal rules) were removed.
 */
export const radiotherapyConsent = protocol({
  id: "radiotherapy-consent",
  name: "Consent for radiotherapy: who takes it, when, and what it must cover",
  aka: ["radiotherapy consent form", "consent for radiation therapy", "RCR consent forms", "site-specific radiotherapy consent", "informed consent radiotherapy", "Montgomery consent", "e-consent radiotherapy"],
  domain: "consent-and-communication",
  tldr: "Before radiotherapy starts you are asked to agree to it in writing, after someone trained in your kind of treatment has explained what it aims to do, its likely and rare side effects, the other options including no treatment, and anything that matters to you in particular. You should have time to think, you are asked to confirm before treatment begins, and you can change your mind at any point.",
  simple: "Before radiotherapy a doctor, or a specially trained radiographer or nurse, explains the treatment, its side effects and the other choices, including not having it. You sign a form and are offered a copy. You can ask for more time or a second talk, and you can stop at any time.",
  summary: "In the UK, consent for radiotherapy follows the GMC's Decision making and consent (2020) and the Montgomery judgment (2015): the doctor must take reasonable care that the patient is aware of any material risk, judged by what a reasonable person in their position, or this particular patient, would think significant, and of any reasonable alternative or variant treatments. The Royal College of Radiologists (RCR) publishes national site-specific consent forms (most common sites, plus stereotactic, brachytherapy and palliative forms and a generic form for other situations, with Welsh-language versions; the breast form read here is January 2025 version 4), written with lawyers, patients and risk communication specialists, which list expected (50% to 100%), common (10% to 50%), less common (less than 10%) and rare (less than 1%) early and late side effects, with frequencies described as approximate (bands as printed on the breast form). The RCR recommends but does not mandate them.\n\nThe RCR implementation guidance (2021): consent is taken by a consultant clinical oncologist, a clinical oncology doctor trained in consent for that plan, or an expert radiographer or specialist nurse trained in consent for that site; it is documented before the course begins, ideally leaving days to reconsider before the first fraction; where taken in advance it is confirmed before treatment starts (for example at planning); a patient in doubt is offered a second consultation; consent is renewed after a material change not discussed at first, such as a change in the site treated or in the diagnosis; and withdrawal is documented. The forms are for adults with capacity only, not for children or adults who lack capacity (the breast form says over 16 years old). Patient-specific risks (job, health, activities, previous radiotherapy, radiosensitising drugs) are written in, and alternatives including no treatment are recorded in the notes. Separately, in England, Wales and Scotland, IR(ME)R 2017 requires employers' procedures to give the person, wherever practicable and before exposure, adequate information on the benefits and risks of the radiation dose. The RCR endorses no commercial e-consent platform and says there is some evidence that with certain commercial forms critical details are not carried over when the signed form is transferred to the electronic record.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "radiographer", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department"],
  },
  population: "Adults with capacity having external beam radiotherapy or brachytherapy, as the RCR forms are scoped (the implementation guidance says adult patients with capacity; the breast form says over 16 years old). Children and young people, and adults who lack capacity, need the hospital's alternative consent process and are not covered by the RCR forms. The pregnancy check is a separate protocol.",
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
      action: "Explain every risk that a reasonable person in the patient's position, or this patient, would be likely to think significant, even if the risk is small",
      why: "Since a UK Supreme Court judgment in 2015, the test is what a reasonable person in your position, or you in particular, would think significant, not only what doctors usually mention.",
      source: "montgomery-2015",
      quote: "The test of materiality is whether, in the circumstances of the particular case, a reasonable person in the patient’s position would be likely to attach significance to the risk, or the doctor is or should reasonably be aware that the particular patient would be likely to attach significance to it.",
    },
    {
      action: "Where the RCR site-specific form is used, write in the risks particular to this person (their job, health conditions, activities, earlier radiotherapy, radiosensitising medicines) and check the listed side effects are the right ones",
      why: "A person's health, job or activities can make a particular side effect matter more to them than it would to someone else.",
      source: "rcr-implementation-2021",
      quote: "Discussions should be personalised and must include any specific risks that are likely to be significant to that patient.",
    },
    {
      action: "Give information on the benefits and risks of the radiation dose before the exposure, wherever practicable, as the department's IR(ME)R procedures require",
      why: "The radiation regulations for England, Wales and Scotland require hospitals to have a procedure for giving people adequate information on the benefits and risks of the dose.",
      source: "irmer-2017",
      quote: "providing that wherever practicable, and prior to an exposure taking place, the individual to be exposed or their representative is provided with adequate information relating to the benefits and risks associated with the radiation dose from the exposure;",
    },
    {
      action: "Take and document consent before the course begins, ideally leaving days, not hours, to reconsider before the first treatment (the RCR accepts this may not be feasible in situations such as spinal cord compression)",
      why: "Time between agreeing and starting lets you think again about the decision.",
      source: "rcr-implementation-2021",
      quote: "Ideally there should be time (measured in days rather than hours) for the patient to reconsider their decision to undergo treatment before the first fraction is administered.",
    },
    {
      action: "When consent was taken in advance, ask the person to confirm it before treatment starts, for example at the planning appointment, and record this on the form",
      why: "Consent is often taken at the first consultation; confirming it later gives you the chance to raise further questions before you go ahead.",
      source: "rcr-implementation-2021",
      quote: "When consent is taken in advance of treatment the patient should be asked to confirm consent before the start of treatment, for example, at their planning appointment.",
    },
    {
      action: "If the person has doubts, offer a second consultation with a suitably trained professional before treatment begins",
      why: "If you are unsure, you should be able to talk it through again before anything starts.",
      source: "rcr-implementation-2021",
      quote: "Where a patient expresses doubt about proceeding with the treatment, the opportunity to have a second consultation with a suitably trained and experienced healthcare professional prior to commencing treatment should be offered.",
    },
    {
      action: "Seek consent again if the treatment changes materially from what was discussed, such as a change in the site treated or in the diagnosis",
      why: "Agreement to one treatment is not agreement to a different one.",
      source: "rcr-implementation-2021",
      quote: "Renewed consent should be sought where there is material change in the radiotherapy which will be delivered, which was not discussed at the initial consent.",
    },
    {
      action: "Accept withdrawal of consent at any time, discuss it, and record it fully",
      why: "You can withdraw your agreement whenever you choose; the team should discuss it with you and write it down.",
      source: "rcr-implementation-2021",
      quote: "A patient can withdraw consent at any time. Where consent is withdrawn this should be discussed and documented in full in the patient notes.",
    },
    {
      action: "Do not use the RCR adult forms for children or for adults who lack capacity; where an adult lacks capacity, use the hospital's alternative form",
      why: "The RCR forms were written for adults who can decide for themselves; they are not meant for anyone else.",
      source: "rcr-implementation-2021",
      quote: "The RCR SSR consent forms should not be used in situations where a patient lacks capacity. In this situation the hospital should provide an appropriate alternative form. The RCR SSR consent forms should not be used for children/minors who are undergoing radiotherapy.",
    },
    {
      action: "Have a local procedure for giving the person a copy of the completed form and filing it in their record, and a local policy for people to opt out of their treatment information being used for research, audit and teaching",
      why: "You can keep a record of what you agreed to, and you have a say in how your information is used beyond your care.",
      source: "rcr-implementation-2021",
      quote: "It is important that departments also have a local policy for patients to opt out of the use of information collected during radiotherapy being used in research, audit and teaching.",
    },
    {
      action: "If a commercial electronic consent system is used, carry out a full local risk assessment and keep arrangements to review content accuracy, transfer to the electronic record, updates, version control and governance",
      why: "The RCR says there is some evidence that certain commercial e-consent forms lose critical details when the signed form is transferred to the patient record.",
      source: "rcr-econsent-2026",
      quote: "There is some evidence showing that with certain commercial e-consent forms, critical details of the e-consent are not transcribed when the signed e-consent is transferred to the patient’s electronic patient record.",
    },
  ],
  bestInClass: {
    statement: "In the UK: consent by a professional trained in that site, after a discussion of alternatives including no treatment and of every risk material to this patient (Montgomery 2015; GMC 2020, as the RCR cites it), recorded on the RCR national site-specific form, which the RCR advises but does not mandate, with patient-specific risks written in, taken ideally days before the first fraction, confirmed before treatment begins, renewed after any material change, and withdrawable at any time (RCR implementation guidance 2021; the breast form read is January 2025 version 4). In England, Wales and Scotland, IR(ME)R 2017 separately requires employers' procedures to provide information on the benefits and risks of the radiation dose before exposure wherever practicable. These are consensus and legal standards; no trial comparing consent processes for radiotherapy on outcomes was found. Practice outside the UK (the ACR-ASTRO practice parameter in the United States) could not be read here.",
    sources: ["rcr-implementation-2021", "rcr-development-2021", "montgomery-2015", "rcr-forms-page", "rcr-breast-form-2025", "irmer-2017"],
  },
  variants: [
    {
      name: "Locally written consent forms instead of the RCR national forms",
      differs: "Many UK centres had their own site-specific forms before the national set; the RCR reports no consensus among them on which side effects they listed. The RCR forms are recommended, not mandatory, and adoption goes through each hospital's consent or governance committee.",
      evidence: "RCR Development (2021), citing a 2021 paper in Clinical Oncology by Kenney-Herbert and colleagues that was not read here: 54% of centres had a site-specific consent form for prostate cancer, with no consensus between the forms on the side effects included.",
      sources: ["rcr-development-2021", "rcr-implementation-2021"],
    },
    {
      name: "Electronic consent platforms",
      differs: "The RCR endorses no commercial e-consent platform, says it is not currently aware of any that can faithfully reproduce and maintain the integrity of its forms, and says organisations using them should carry out a comprehensive local risk assessment and keep arrangements to review content accuracy, transfer to the record, updates, version control and governance. Its FAQs say the forms can be built into a department's own electronic system if the content and wording stay the same as the published version.",
      evidence: "RCR position statement (2026), citing some evidence that critical details are lost on transfer to the electronic record.",
      sources: ["rcr-econsent-2026", "rcr-forms-page"],
    },
    {
      name: "Sending the form to the patient before the appointment",
      differs: "The RCR FAQs raise the questions of sending forms before the appointment, and of the patient taking the form home and bringing it back signed, and print no answer to either; they suggest departments use the introduction of the forms to review their consent processes. The breast form has a box for the patient's initials on each side-effect page and statements by the professional and the patient that alternative treatment was discussed.",
      evidence: "No trial was found, and the RCR gives no recommendation for or against.",
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
      accessed: "2026-11-17",
    },
    {
      key: "rcr-development-2021",
      label: "National standard site-specific radiotherapy consent forms: Development (quotes Montgomery v Lanarkshire Health Board [2015] UKSC 11 and GMC Decision making and consent 2020)",
      publisher: "The Royal College of Radiologists",
      year: 2021,
      url: "https://www.rcr.ac.uk/media/45jjjpaj/development-of-the-national-site-specific-radiotherapy-consent-forms.pdf",
      gradingScheme: "College guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcr-forms-page",
      label: "National radiotherapy consent forms (current forms, FAQs and supporting documents)",
      publisher: "The Royal College of Radiologists",
      year: 2025,
      url: "https://www.rcr.ac.uk/our-services/management-service-delivery/national-radiotherapy-consent-forms/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcr-breast-form-2025",
      label: "Radiotherapy consent form for breast cancer, January 2025 version 4",
      publisher: "The Royal College of Radiologists",
      year: 2025,
      url: "https://www.rcr.ac.uk/media/ajnh3df2/250116_dc23013b-rcr-breast-cancer-consent-form-5.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcr-econsent-2026",
      label: "RCR Position Statement on radiotherapy consent forms and e-consent (30 October 2026)",
      publisher: "The Royal College of Radiologists",
      year: 2026,
      url: "https://www.rcr.ac.uk/news-policy/latest-updates/rcr-position-statement-on-radiotherapy-consent-forms-and-e-consent/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irmer-2017",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017 (SI 2017/1322), Schedule 2: Employer's procedures (latest revised version, as amended from 1 October 2024 by SI 2024/896; extends to England, Wales and Scotland)",
      publisher: "UK legislation (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/schedule/2",
      gradingScheme: "Statute; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "montgomery-2015",
      label: "Montgomery v Lanarkshire Health Board [2015] UKSC 11, paragraph 87",
      publisher: "UK Supreme Court (text from the National Archives Find Case Law service)",
      year: 2015,
      url: "https://caselaw.nationalarchives.gov.uk/uksc/2015/11",
      gradingScheme: "Court judgment; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gmc-consent-2020",
      label: "Decision making and consent",
      publisher: "General Medical Council",
      year: 2020,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/decision-making-and-consent",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "acr-astro-practice-parameter",
      label: "ACR-ASTRO Practice Parameter for Radiation Oncology",
      publisher: "American College of Radiology and American Society for Radiation Oncology",
      year: 2023,
      url: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Practice-Parameters-and-Technical-Standards",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  terms: ["informed-consent"],
  institutions: ["astro"],
  related: ["radiotherapy-pregnancy-and-breastfeeding-enquiry", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The GMC's Decision making and consent (2020) could not be read: on 17 November 2026 the GMC site again returned 403 to a script. Its content appears only as the RCR documents quote it, and whether the GMC has issued a newer edition could not be checked.",
    "The Montgomery judgment is a UK Supreme Court decision on an appeal from Scotland, read on 17 November 2026 from the National Archives. Consent law in other countries differs and is not covered here.",
    "IR(ME)R 2017 extends to England, Wales and Scotland. Northern Ireland has its own regulations, which were not read. Schedule 2 was amended from 1 October 2024 (SI 2024/896); the paragraph on information about benefits and risks was not changed.",
    "Consent practice outside the UK was not read: on 17 November 2026 the ACR-ASTRO practice parameter again served an HTML shell to a script, so its edition year could not be confirmed, and no European consensus on radiotherapy consent was found. Everything on this page is UK guidance and UK law.",
    "No trial evidence was found comparing consent processes for radiotherapy (forms, timing, e-consent, decision aids) on understanding, regret or outcomes; the standards here are legal and consensus.",
    "Consent for children and for adults who lack capacity is outside the RCR forms and is not detailed here.",
    "The RCR implementation and development documents date from April 2021; the breast form read here is January 2025 version 4, the other forms were not opened, and on 17 November 2026 the RCR page still linked the April 2021 documents.",
    "The RCR FAQs ask whether forms could be sent to patients before the appointment or taken home to sign, and print no answer. The figure that 54% of centres had their own prostate form comes from a paper the RCR cites, which was not read.",
  ],
});
