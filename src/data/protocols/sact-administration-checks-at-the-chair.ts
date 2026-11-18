import { protocol } from "./helpers";

/*
 * The checks made between preparing an anticancer drug and starting it: the assessment on the day, the independent
 * double checks after preparation and at the patient's side, tracing the lines and telling the patient what to report.
 *
 * What was read, and how (first pass, 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology (Siegel et al.,
 *   JCO Oncology Practice 2024; also Oncology Nursing Forum 51(4)): full text, read at that time from the Internet Archive's capture
 *   of ascopubs.org/doi/10.1200/OP.24.00216 (11 July 2025). It replaces the 2016 standards, which required three
 *   verifications; the 2024 standards add a fourth, at the patient's side. The standards carry no grades.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025): full
 *   text; cited only for the rule that nothing is given before pharmacy verification.
 *
 * Second accuracy pass, 17 November 2026:
 * - ASCO-ONS 2024 was re-read in full as raw text, this time in the Oncology Nursing Society's co-publication: the
 *   24-page advance-print PDF that the ONS article page offers for download (Oncology Nursing Forum, July 2024, 51(4),
 *   DOI 10.1188/24.ONF.1-24.AP), converted with pdftotext. ascopubs.org still returns 403 to a script, and the
 *   Internet Archive was not asked again because another checker's request for this paper had already failed today.
 *   Every step, the summary, the variants and the grades were checked against that text, and every quote was matched
 *   by script. Quotes now carry the typographic apostrophes the source prints. The "Tracing the lines" sentence runs
 *   across a page break in the PDF (it starts on page 9 and ends on page 11, with a table between).
 * - The DOI 10.1200/OP.24.00216 was resolved through Crossref (JCO Oncology Practice 20(10):1314-1330) and the Oncology
 *   Nursing Forum co-publication through Europe PMC and Crossref (10.1188/24.ONF.297-320); neither record lists a
 *   correction or a replacement, and a Europe PMC title search found no later edition.
 * - BOPA version 5.0 was fetched again from bopa.org.uk as a PDF and re-read with pdftotext.
 * - No UK nursing standard for the bedside check could be read: see `gaps`.
 *
 * Quotes are copied from the raw text with line breaks joined and end-of-line hyphenation undone, nothing else changed.
 */
export const sactAdministrationChecksAtTheChair = protocol({
  id: "sact-administration-checks-at-the-chair",
  name: "Anticancer treatment administration checks at the chair: assessment, independent double checks and line tracing",
  aka: ["chemotherapy bedside checks", "chemotherapy double check", "independent double check", "two-nurse check chemotherapy", "fourth verification", "tracing the lines", "pre-administration checks", "chemotherapy time out"],
  domain: "chemotherapy-administration",
  tldr: "On each treatment day staff check how you are, your vital signs, allergies, side effects and pain. Before the drip starts, two trained staff check the drug, dose, route and pump settings, and check who you are with at least two identifiers, such as your full name and date of birth. You are told the drug's name, how long it takes and which symptoms to report.",
  simple: "Before your drip starts, two staff check the drug, the dose and you. You will be asked to say your full name and date of birth. That is on purpose. Staff will tell you which symptoms to report, such as signs of an allergic reaction or pain where the drip goes in.",
  summary: "The ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024) replaced the 2016 ASCO/ONS standards' three verifications with four: before preparation (two patient identifiers, drug name, dose, route, rate, the dose calculation, and treatment day and cycle), at preparation (a second licensed clinician checks vials, concentration, volume or weight, diluent, and route, filters and tubing), after preparation and before each administration (at least two licensed clinicians independently verify drug name, dose, volume, rate, route, expiry and appearance), and a new fourth verification in the presence of the patient, in which at least two licensed clinicians, at least one on site and the other in person or by approved video, verify the patient's identity with at least two identifiers, then the drug, dose, rate and duration, route, administration set and, where there is one, the pump's settings. The panel added the fourth check because many drugs are now prepared away from where they are given, and added visual inspection of the administration set ('tracing the lines').\n\nOn each treatment day staff assess and record functional or performance status, vital signs, date of birth, allergies and previous treatment-related reactions, treatment toxicities and pain, and update the medication list. Blood results are not among those six elements: the standards place them in the order, which must state the results that would mean holding or changing a dose, and BOPA makes checking laboratory values part of pharmacy verification. Parenteral treatment is given by a licensed clinician approved by the organisation, who confirms the drug, infusion time, route and symptoms to report with the patient before starting. A practitioner with current basic life support certification is present and a licensed practitioner (such as a doctor, nurse practitioner or physician assistant) is on site and immediately available, with hypersensitivity, extravasation and, where relevant, cytokine release order sets and drugs accessible in time.\n\nThe standards are not graded. The panel reports a review finding remote video verification feasible, and says no well-designed research has evaluated its effect on safety.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "pharmacist", "pharmacy-technician"],
    where: ["chemotherapy-day-unit", "ward", "home"],
  },
  population: "Adults and children receiving parenteral anticancer therapy in a health care facility or at home. Intrathecal treatment has further rules of its own. Oral treatment is ordered and labelled under the same standards, but the four verifications are written for parenteral treatment.",
  trigger: "A prepared anticancer drug is ready to be given.",
  steps: [
    {
      action: "On each treatment day, assess and record functional or performance status, vital signs, date of birth, allergies and previous treatment-related reactions, treatment toxicities and pain, and act on what you find",
      why: "The standards ask staff to act on what the assessment finds. The order itself lists the results or changes in the patient's condition that would mean holding or changing a dose.",
      source: "asco-ons-2024",
      quote: "On each clinical encounter or day of treatment, staff performs and documents a patient assessment that includes at least the following six elements and takes appropriate action:",
    },
    {
      action: "Update the list of all medicines, including over-the-counter, herbal products and supplements, at every visit",
      why: "The panel cites a study that saw possible interactions between herbal products and oral anticancer drugs in one in five patients.",
      source: "asco-ons-2024",
      quote: "The patient’s medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Do not give anything that has not been verified by pharmacy",
      why: "Pharmacy verification is the check that the treatment suits the patient's disease and condition and that the doses are accurate for that patient.",
      source: "bopa-2025",
      quote: "SACT must not be administered by a HCP, or taken by a patient until an appropriately trained RPP has verified the prescription.",
    },
    {
      action: "At preparation, have a second licensed clinician check the vials, concentration, volume or weight, diluent, and route, filters and tubing",
      why: "A second person checks the preparation for completeness and accuracy of content, with particular attention to any special preparation instructions.",
      source: "asco-ons-2024",
      quote: "Upon preparation of the antineoplastic medication, a second licensed clinician approved by the health care organization to prepare antineoplastic therapy verifies:",
    },
    {
      action: "After preparation and before each administration, have at least two licensed clinicians independently verify drug name, dose, volume, rate, route, expiry and the drug's appearance and integrity, and record it",
      why: "The standards say a check made independently is more likely to catch an error, because the second person is not influenced by the first.",
      source: "asco-ons-2024",
      quote: "After preparation and before each antineoplastic therapy administration, at least two licensed clinicians approved by the health care organization to administer or prepare antineoplastic therapy independently verify and document the accuracy of the following elements in the patient’s medical record:",
    },
    {
      action: "At the patient's side, have at least two licensed clinicians confirm the patient's identity with at least two identifiers, then the drug, dose, rate and duration, route, administration set and any pump's settings",
      why: "Many drugs are prepared away from where they are given. This last check, with the patient present, confirms the drug and everything with it are accurate and complete just before it is given, and that any pump is set to the right rate.",
      source: "asco-ons-2024",
      quote: "In the presence of the patient: At least two licensed clinicians approved by the health care organization to administer or prepare antineoplastic therapy in person or through appropriate institutionally approved video-enabled technology, with at least one person on site, verify the patient’s identification using at least two identifiers and document accuracy in the patient’s medical record.",
    },
    {
      action: "Inspect the administration set by eye and trace the lines immediately before giving the drug",
      why: "Tracing the lines finds tubing left unclamped, loose or disconnected lines, a drug connected to the wrong pump, the wrong tubing or filter, and a line not running at the prescribed rate.",
      source: "asco-ons-2024",
      quote: "“Tracing the lines” immediately prior to administration reduces errors related to unclamped tubing, loose or disconnected lines, ensures multiple lines are infusing at the prescribed rate, the right drug is connected to the right pump, and the proper tubing or filters are used.",
    },
    {
      action: "Before starting, confirm the treatment with the patient: the drug's name, how long it will run, the route, and which symptoms to report, such as signs of an allergic reaction or pain at the drip site",
      why: "The panel wants the patient, and any carer or family member with them, to know the plan before the drug is given.",
      source: "asco-ons-2024",
      quote: "Before initiation of antineoplastic therapy, personnel approved by the health care organization who is administering the antineoplastic(s) confirms the therapy with the patient, including, at a minimum, the name of the drug, the infusion time, route of infusion, symptoms to report, for example: hypersensitivity symptoms or pain at infusion site",
    },
    {
      action: "Have the drug given by a licensed clinician whom the organisation has approved to give anticancer therapy",
      why: "The organisation documents the education, credentials and competency of these staff, with continuing education at least once a year.",
      source: "asco-ons-2024",
      quote: "Parenteral antineoplastic therapy is administered by a licensed clinician approved by the health care organization as defined in Standard 1.1",
    },
    {
      action: "Have someone with current basic life support certification present, and a licensed practitioner on site and immediately available",
      why: "The standards also ask for a policy on emergency treatment that covers equipment, rescue drugs and a plan for escalating care.",
      source: "asco-ons-2024",
      quote: "At least one practitioner who maintains current certification in (age-appropriate) basic life support is present during antineoplastic therapy administration",
    },
    {
      action: "Keep the order sets and drugs for an allergic reaction, and the antidotes for a drug leak into the tissues, where they can be reached in time",
      why: "The standards ask for both to be accessible within the time needed for treatment, under policies that follow current guidelines.",
      source: "asco-ons-2024",
      quote: "Hypersensitivity and anaphylactoid management policy is present and aligns with current literature and guidelines. Hypersensitivity order sets and medications are accessible within the appropriate timeframe for optimal treatment",
    },
    {
      action: "Record that all four verifications were done, and the patient's condition during and at the end of treatment",
      why: "The record shows that each check happened and how the patient was during and after the treatment.",
      source: "asco-ons-2024",
      quote: "Documentation in the patient’s medical record confirms the four verifications prior to parenteral antineoplastic administration and the patient’s clinical status during and upon completion of antineoplastic therapy",
    },
  ],
  bestInClass: {
    statement: "The ASCO-ONS standards (2024): four separate verifications, the third by at least two licensed clinicians independently and the fourth by at least two licensed clinicians at the patient's side, with at least two identifiers, pump settings and the administration set inspected; a day-of-treatment assessment; the drug, time, route and symptoms to report confirmed with the patient; a basic life support provider present and reaction drugs accessible in time. No other current standard covering the chair-side check could be read, so there is no disagreement to report; BOPA (2025) adds that nothing may be given before a trained pharmacy professional has verified the prescription.",
    sources: ["asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Three verifications (ASCO/ONS 2016)",
      differs: "The 2024 text says earlier versions of the standards required three independent verifications, during order verification, drug preparation and drug administration. The 2016 standards themselves were not read for this page.",
      evidence: "Replaced in 2024. The panel added a verification because many drugs are now prepared away from where the patient is treated, such as at home or in a stand-alone unit, and one more check is needed immediately before the drug is given.",
      sources: ["asco-ons-2024"],
    },
    {
      name: "Second check by video",
      differs: "One clinician is on site with the patient and another takes part in the verification by an institutionally approved video link, for example for treatment at home.",
      evidence: "Allowed by ASCO-ONS 2024. The panel cites a review finding remote verification feasible and possibly similar to a live two-person check, but says no well-designed research has evaluated its effect on safety, and cautions that reliance on technology can still lead to errors.",
      sources: ["asco-ons-2024"],
    },
  ],
  grades: [
    { claim: "Four separate verifications, in person or by approved video", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "Personnel approved by the health care organization to prepare or administer antineoplastic therapy perform four separate verifications in person or by institutionally approved video-enabled technology:" },
    { claim: "A practitioner certified in basic life support present during administration", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "At least one practitioner who maintains current certification in (age-appropriate) basic life support is present during antineoplastic therapy administration" },
    { claim: "Remote verification: effect on safety not yet studied", grade: "Panel statement (not graded)", source: "asco-ons-2024", quote: "Authors of a review of literature and synthesis of practice interviews regarding remote verification of high-risk medications report remote verification at the point of administration is feasible and may be alike live two-person checks; however, no well-designed research has evaluated the impact on safety as of this writing." },
  ],
  sources: [
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice; Oncology Nursing Forum)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded. A systematic review was run (PubMed January 2015 to January 2023, CINAHL January 2015 to April 2023), but the panel found few studies relevant enough and based the standards on informal consensus, expert opinion and publications its members suggested, followed by public comment.",
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
  technologies: ["smart-infusion-pumps", "infusion-devices-vascular-access", "cytotoxic-chemotherapy"],
  terms: ["extravasation-infusion-reaction", "crs"],
  related: ["sact-prescribing-and-pharmacy-verification", "chemotherapy-extravasation-management", "infusion-reaction-management"],
  upgrades: ["idea-upgrade-video-second-check-safety-study"],
  gaps: [
    "The standards are not graded. The panel says there is a paucity of randomised trials and only limited controlled data on the technologies meant to help, and calls many of the standards a common sense response to known sources of error. The text says verification of a preparation may include bar code or gravimetric checks; it does not require bar code scanning or a smart pump at the chair.",
    "No UK or European standard for the chair-side check could be read. On 17 November 2026 the UKONS SACT Competency Passport was not readable as a document: UKONS describes it (news item of 3 December 2025) as a competency record kept in a digital application, and the address of its 2019 learning outcomes PDF returned 404. One request for the Royal College of Nursing's infusion therapy standards returned 404, and no NHS England document on the chair-side check was read. The ONS Chemotherapy and Immunotherapy Guidelines are a priced book. So this page cannot say what UK nursing standards require of the two checkers.",
    "Remote (video) verification is allowed by ASCO-ONS, but its effect on safety has not been studied, in the panel's own words.",
    "On 17 November 2026 the ASCO-ONS text was read in the Oncology Nursing Society's co-publication (the advance-print PDF offered on the ONS article page, Oncology Nursing Forum 51(4), DOI 10.1188/24.ONF.1-24.AP), and the quotes follow that copy. The JCO Oncology Practice version at the DOI above refuses a script (403) and was not compared word for word; the first pass had read it from an archived copy.",
    "The six elements of the day-of-treatment assessment do not include blood results. ASCO-ONS deals with them through the order (the results that would mean holding or changing a dose) and a policy on how often regimen-specific tests are done; BOPA makes checking laboratory values part of pharmacy verification. Neither source read says who looks at the day's blood results at the chair.",
    "The ASCO-ONS text has no rule specific to giving vesicant drugs: it asks only for an infiltration and extravasation policy with antidotes accessible in time. The extravasation page carries what its own sources say about vesicants.",
    "The standards name allergic reaction symptoms and pain at the infusion site only as examples of what a patient should be told to report. They give no fuller symptom list and no time limit, so this page gives none; the infusion reaction and extravasation pages carry what their own sources say.",
    "BOPA's own web page was blocked to a script on 17 November 2026, so whether a version later than 5.0 (3 June 2025) exists could not be checked there; version 5.0 itself was re-read.",
  ],
});
