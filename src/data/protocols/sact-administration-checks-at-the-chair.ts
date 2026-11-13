import { protocol } from "./helpers";

/*
 * The checks made between preparing an anticancer drug and starting it: the assessment on the day, the independent
 * double checks after preparation and at the patient's side, tracing the lines and telling the patient what to report.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology (Siegel et al.,
 *   JCO Oncology Practice 2024; also Oncology Nursing Forum 51(4)): full text. ascopubs.org returned 403 to a script and
 *   the ONS site served a one-page preview; the article HTML was read from the Internet Archive's capture of
 *   ascopubs.org/doi/10.1200/OP.24.00216 (11 July 2025). It replaces the 2016 standards, which required three
 *   verifications; the 2024 standards add a fourth, at the patient's side. The standards carry no grades.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025): full
 *   text; cited only for the rule that nothing is given before pharmacy verification.
 * - No UK nursing standard for the bedside check could be read: the ONS Chemotherapy and Immunotherapy Guidelines are a
 *   priced book, and no current UKONS or RCN document on chair-side checks was found.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const sactAdministrationChecksAtTheChair = protocol({
  id: "sact-administration-checks-at-the-chair",
  name: "Anticancer treatment administration checks at the chair: assessment, independent double checks and line tracing",
  aka: ["chemotherapy bedside checks", "chemotherapy double check", "independent double check", "two-nurse check chemotherapy", "fourth verification", "tracing the lines", "pre-administration checks", "chemotherapy time out"],
  domain: "chemotherapy-administration",
  tldr: "On each treatment day a nurse checks how you are, your temperature, pulse, blood pressure, allergies and side effects. Before the drip starts, two trained staff check the bag against your prescription and against you, using two identifiers such as your name and date of birth, and follow the tubing from bag to line. You will be told the drug's name, how long it takes and what to report at once.",
  simple: "Before your drip starts, two staff check the drug, the dose and you. You will be asked your name and date of birth more than once. That is on purpose. Tell them at once if you feel itchy, breathless, flushed or have pain where the drip goes in.",
  summary: "The ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024) replaced the 2016 ASCO/ONS standards' three verifications with four: before preparation (order elements and dose calculation), at preparation (a second clinician checks vials, concentration, volume, diluent and tubing), after preparation and before administration (two licensed clinicians independently verify drug, dose, volume, rate, route, expiry and appearance), and a new fourth verification in the presence of the patient, in which two licensed clinicians, at least one on site and the other in person or by approved video, check two patient identifiers, the drug, dose, rate and duration, route, administration set and pump settings. The panel added the fourth check because drugs are now often prepared away from where they are given, and added visual inspection of the administration set ('tracing the lines').\n\nOn each treatment day staff assess and record performance status, vital signs, date of birth, allergies and previous reactions, toxicities and pain, and update the medication list; the nurse confirms the drug, infusion time, route and symptoms to report with the patient before starting. A practitioner certified in basic life support must be present and a licensed practitioner on site, with hypersensitivity, extravasation and, where relevant, cytokine release order sets and drugs to hand.\n\nThe standards are not graded. The panel notes that remote video verification looks feasible but that no well-designed research has evaluated its effect on safety.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "pharmacist", "pharmacy-technician"],
    where: ["chemotherapy-day-unit", "ward", "home"],
  },
  population: "Adults and children receiving parenteral anticancer therapy in a health care facility or at home. Intrathecal treatment has further rules of its own. Oral treatment is ordered and labelled under the same standards but has no chair-side verification.",
  trigger: "A prepared anticancer drug is ready to be given.",
  steps: [
    {
      action: "On each treatment day, assess and record performance status, vital signs, date of birth, allergies and previous reactions, side effects and pain, and act on what you find",
      why: "A patient who is unwell on the day may need treatment delayed or the dose changed, whatever the prescription says.",
      source: "asco-ons-2024",
      quote: "On each clinical encounter or day of treatment, staff performs and documents a patient assessment that includes at least the following six elements and takes appropriate action:",
    },
    {
      action: "Update the list of all medicines, including over-the-counter, herbal products and supplements, at every visit",
      why: "A new medicine or supplement started since the last cycle can interact with the treatment.",
      source: "asco-ons-2024",
      quote: "The patient's medication list inclusive of prescribed and over-the-counter medications, herbal products, and supplements is updated and documented in the medical record at every encounter and reviewed by a licensed practitioner when a change occurs",
    },
    {
      action: "Do not give anything that has not been verified by pharmacy",
      why: "The chair-side check confirms what was prepared matches the order; it does not replace the clinical check of the order itself.",
      source: "bopa-2025",
      quote: "SACT must not be administered by a HCP, or taken by a patient until an appropriately trained RPP has verified the prescription.",
    },
    {
      action: "At preparation, have a second clinician check the vials, concentration, volume or weight, diluent, and route, filters and tubing",
      why: "Most preparation errors are a wrong vial strength, a wrong volume drawn up or a wrong diluent.",
      source: "asco-ons-2024",
      quote: "Upon preparation of the antineoplastic medication, a second licensed clinician approved by the health care organization to prepare antineoplastic therapy verifies:",
    },
    {
      action: "After preparation and before giving it, have two licensed clinicians independently verify drug name, dose, volume, rate, route, expiry and the drug's appearance, and record it",
      why: "Two people checking separately are less likely to share the same mistake than one person checking twice.",
      source: "asco-ons-2024",
      quote: "After preparation and before each antineoplastic therapy administration, at least two licensed clinicians approved by the health care organization to administer or prepare antineoplastic therapy independently verify and document the accuracy of the following elements in the patient's medical record:",
    },
    {
      action: "At the patient's side, have two licensed clinicians confirm the patient's identity with two identifiers, then the drug, dose, rate and duration, route, administration set and pump settings",
      why: "This last check, with the patient present, catches a right drug going to the wrong person or a pump set to the wrong rate.",
      source: "asco-ons-2024",
      quote: "In the presence of the patient: At least two licensed clinicians approved by the health care organization to administer or prepare antineoplastic therapy in person or through appropriate institutionally approved video-enabled technology, with at least one person on site, verify the patient's identification using at least two identifiers and document accuracy in the patient's medical record.",
    },
    {
      action: "Trace each line by eye from the bag through the pump to the patient before starting",
      why: "Following the tubing finds clamps left closed, loose connections, the wrong drug on the wrong pump and the wrong filter.",
      source: "asco-ons-2024",
      quote: "“Tracing the lines” immediately prior to administration reduces errors related to unclamped tubing, loose or disconnected lines, ensures multiple lines are infusing at the prescribed rate, the right drug is connected to the right pump, and the proper tubing or filters are used.",
    },
    {
      action: "Before starting, tell the patient the drug's name, how long it will run, the route, and what to report straight away, such as signs of an allergic reaction or pain at the drip site",
      why: "The patient is the last check, and often the first to notice a reaction or a leak into the tissues.",
      source: "asco-ons-2024",
      quote: "Before initiation of antineoplastic therapy, personnel approved by the health care organization who is administering the antineoplastic(s) confirms the therapy with the patient, including, at a minimum, the name of the drug, the infusion time, route of infusion, symptoms to report, for example: hypersensitivity symptoms or pain at infusion site",
    },
    {
      action: "Make sure someone certified in basic life support is present, a licensed practitioner is on site, and allergy and extravasation drugs and order sets are within reach",
      why: "Severe allergic reactions and leaks of drug into the skin need treatment within minutes.",
      source: "asco-ons-2024",
      quote: "Hypersensitivity and anaphylactoid management policy is present and aligns with current literature and guidelines. Hypersensitivity order sets and medications are accessible within the appropriate timeframe for optimal treatment",
    },
    {
      action: "Record that all four verifications were done, and the patient's condition during and at the end of treatment",
      why: "The record shows each check happened and gives the next team a baseline if a reaction comes later.",
      source: "asco-ons-2024",
      quote: "Documentation in the patient's medical record confirms the four verifications prior to parenteral antineoplastic administration and the patient's clinical status during and upon completion of antineoplastic therapy",
    },
  ],
  bestInClass: {
    statement: "The ASCO-ONS standards (2024): four separate verifications, the last two by two licensed clinicians independently, and the fourth at the patient's side with two identifiers, pump settings and the administration set traced; a day-of-treatment assessment; the drug, time, route and warning symptoms confirmed with the patient; a basic life support provider present and reaction drugs to hand. No other current standard covering the chair-side check could be read, so there is no disagreement to report; BOPA (2025) adds that nothing may be given before a trained pharmacy professional has verified the prescription.",
    sources: ["asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Three verifications (ASCO/ONS 2016)",
      differs: "The earlier standards required three independent verifications, at order verification, drug preparation and administration, without a separate check at the patient's side of a drug prepared elsewhere.",
      evidence: "Replaced in 2024. The panel added the fourth verification because many drugs are now prepared away from where they are given, such as at home or in a stand-alone unit.",
      sources: ["asco-ons-2024"],
    },
    {
      name: "Second check by video",
      differs: "One clinician is with the patient and the second joins the fourth verification by an approved video link, as at home.",
      evidence: "Allowed by ASCO-ONS 2024. The panel cites a review finding remote verification feasible and possibly similar to a live two-person check, but says no well-designed research has evaluated its effect on safety, and cautions that technology can still lead to errors.",
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
      gradingScheme: "Standards are not graded. They were developed from a systematic review (PubMed January 2015 to January 2023, CINAHL to April 2023) combined with the expert panel's opinion and public comment.",
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
  technologies: ["smart-infusion-pumps", "infusion-devices-vascular-access", "cytotoxic-chemotherapy"],
  terms: ["extravasation-infusion-reaction", "crs"],
  related: ["sact-prescribing-and-pharmacy-verification", "chemotherapy-extravasation-management"],
  upgrades: ["idea-upgrade-video-second-check-safety-study"],
  gaps: [
    "The standards are not graded and no trial compares two-person checks with one-person checks, barcode scanning or smart-pump drug libraries for anticancer drugs; none of those technologies is required by the standards read.",
    "No UK or European standard for the chair-side check could be read: the ONS Chemotherapy and Immunotherapy Guidelines are a priced book and no current UKONS or RCN document was found.",
    "Remote (video) verification is allowed by ASCO-ONS, but its effect on safety has not been studied, in the panel's own words.",
    "The ASCO-ONS text was read from an archived copy of the publisher's page because the publisher refuses a script.",
  ],
});
