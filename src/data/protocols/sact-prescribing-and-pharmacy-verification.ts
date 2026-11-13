import { protocol } from "./helpers";

/*
 * Prescribing anticancer treatment and checking the prescription before it is prepared: the order, the regimen, the
 * dose calculation, the blood results and the pharmacy's clinical verification, for every cycle.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology (Siegel et al.,
 *   JCO Oncology Practice 2024; also Oncology Nursing Forum 51(4)): full text. ascopubs.org returned 403 to a script and
 *   the ONS site served a one-page preview PDF; the article HTML was read from the Internet Archive's capture of
 *   ascopubs.org/doi/10.1200/OP.24.00216 (11 July 2025), stripped to text and searched. It replaces the 2016 ASCO/ONS
 *   standards. The standards carry no grades.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025): full
 *   text of the PDF from bopa.org.uk, with pdftotext.
 * - ASHP guidelines on preventing medication errors with chemotherapy and biotherapy (2015): not read. The journal page
 *   refused a script and Europe PMC holds no abstract; not cited.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const sactPrescribingAndPharmacyVerification = protocol({
  id: "sact-prescribing-and-pharmacy-verification",
  name: "Anticancer treatment prescribing and pharmacy verification before each cycle",
  aka: ["chemotherapy order verification", "SACT prescription verification", "clinical screening of chemotherapy prescriptions", "pharmacist chemotherapy check", "chemotherapy order set", "first verification", "SACT clinical check"],
  domain: "pharmacy",
  tldr: "Before any cancer drug is made up for you, the prescription is written from an agreed treatment plan and then checked by a specially trained pharmacist or pharmacy technician: that it is the right treatment for your cancer, that the dose is worked out correctly from your height, weight and kidney function, and that your blood results are good enough for treatment that day.",
  simple: "Your cancer drugs are checked by a trained pharmacy person before they are made, every cycle. It is normal to be asked your weight, your other medicines and any allergies again.",
  summary: "The US standard is the ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024), which replaced the 2016 ASCO/ONS standards; the UK standard for the pharmacy step is BOPA's Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025). Neither grades its standards: ASCO-ONS combined a systematic review (2015 to 2023) with panel opinion and public comment.\n\nBoth require prescribing from approved, standard regimens on electronic or preprinted order sets, by authorised prescribers. ASCO-ONS bans verbal orders except to hold or stop treatment, requires a supporting reference or a second practitioner for orders that depart from the standard regimen, and asks that height and weight be measured in metric units and verified by two people before a new plan. Its order must state the calculation method and variables, and how often they are rechecked.\n\nThe two differ on who verifies. BOPA says no anticancer treatment may be given or taken until a trained registered pharmacy professional has verified the prescription, and sets out checks for cycle 1 (consent, the regimen against the treatment plan, eligibility, allergies, interactions, critical tests such as cardiac function or genomic results) and for every cycle (dose calculation and units, blood results, renal and hepatic function, cumulative doses, supportive medicines, then a signature). ASCO-ONS requires a licensed pharmacist to verify all parenteral orders only where children under 18 are treated; for adults its first verification, before preparation, may be done by any personnel the organisation approves to prepare or give the treatment. BOPA asks for adult doses to be banded where national bands exist.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "pharmacy-technician"],
    where: ["outpatient-clinic", "aseptic-unit", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults and children prescribed systemic anticancer therapy by any route, in hospital, clinic or at home. BOPA excludes hormonal treatments and radiopharmaceuticals, and intrathecal treatment, which has its own national guidance. Children need extra checks (BOPA tables 2, 3 and 5; ASCO-ONS pharmacist verification).",
  trigger: "A cycle of anticancer treatment is prescribed, whether the first cycle of a new regimen or a later one.",
  steps: [
    {
      action: "Prescribe only from a standard regimen that the organisation has defined for the diagnosis, with its references",
      why: "Building each prescription from an agreed, referenced plan removes most of the room for a wrong drug, dose or schedule.",
      source: "asco-ons-2024",
      quote: "The health care organization defines standard antineoplastic therapy regimens by diagnosis with references",
    },
    {
      action: "Prescribe on an electronic prescribing system, within an approved protocol",
      why: "Electronic order sets calculate doses and carry the protocol's supportive medicines, so less is written by hand.",
      source: "bopa-2025",
      quote: "All SACT must be prescribed in the context of an approved protocol and prescribed via an electronic prescribing system.",
    },
    {
      action: "Do not accept verbal orders, except to hold or stop treatment",
      why: "A spoken dose or drug name is easily misheard and leaves no record to check.",
      source: "asco-ons-2024",
      quote: "Verbal orders are not allowed except to hold or stop antineoplastic therapy administration",
    },
    {
      action: "For any order that departs from the standard regimen, record the reason and get a supporting reference or a second prescriber's authorisation",
      why: "Changes from the usual plan are where unusual doses and wrong combinations slip through.",
      source: "asco-ons-2024",
      quote: "The policy requires a supporting reference and/or authorization by a second licensed practitioner prior to ordering, signing, or administration of an exception order",
    },
    {
      action: "Measure height and weight in kilograms and centimetres and have two people, one a licensed clinician, verify them before a new treatment plan is prepared",
      why: "Most doses are calculated from height and weight, so a mistake in either is carried into every drug.",
      source: "asco-ons-2024",
      quote: "Weight and height are measured and documented in the medical record in metric units (eg, kg and cm). Both the measurement and documentation are verified by two individuals, one of whom is a licensed clinician, prior to preparation and administration of a newly prescribed antineoplastic treatment plan.",
    },
    {
      action: "Write doses without unapproved abbreviations, without trailing zeros and with leading zeros",
      why: "\"1.0 mg\" can be read as 10 mg and \".5 mg\" as 5 mg; these are known causes of tenfold errors.",
      source: "asco-ons-2024",
      quote: "Doses are written following health care organization policy for preventing the use of unapproved abbreviations, omitting trailing zeros, and including leading zeros",
    },
    {
      action: "Do not give or hand over any anticancer treatment until a trained pharmacist or pharmacy technician has verified the prescription",
      why: "A separate trained check before preparation catches errors the prescriber did not see.",
      source: "bopa-2025",
      quote: "SACT must not be administered by a HCP, or taken by a patient until an appropriately trained RPP has verified the prescription.",
    },
    {
      action: "At cycle 1, check consent, and check that the regimen matches the documented treatment plan or clinic letter",
      why: "The first cycle is where a wrong regimen or a regimen for a different stage of disease is most likely to be caught.",
      source: "bopa-2025",
      quote: "Check that the regimen prescribed matches the intended documented treatment plan and/or clinic letter.",
    },
    {
      action: "At cycle 1, check for interactions and duplication between the anticancer drugs, the supportive medicines and everything else the patient takes",
      why: "Some cancer drugs interact dangerously with common medicines, herbal products or other cancer drugs.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "At cycle 1, make sure the critical pre-treatment tests are done and reported, such as heart function, cumulative doses or genomic results",
      why: "Some results decide whether a drug can be given at all or at what dose, such as a heart scan before an anthracycline or a DPD test before fluorouracil.",
      source: "bopa-2025",
      quote: "Ensure that relevant pre-treatment critical tests have been completed and reported prior to treatment (e.g. Cardiac function, cumulative dosing, genomic testing) as these may impact eligibility for, or dosing of SACT.",
    },
    {
      action: "Every cycle, check the dose calculation (flat, body surface area, weight or AUC) and its units",
      why: "Doses change as weight and kidney function change, and a unit error can mean a dose a thousand times too large.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
    {
      action: "Every cycle, check the blood results set by the protocol, and adjust for kidney and liver function",
      why: "Low blood counts or poor kidney or liver function can make a normal dose dangerous.",
      source: "bopa-2025",
      quote: "Check laboratory values (e.g.: FBC, U&Es LFTs) as defined within SACT protocol",
    },
    {
      action: "Every cycle, check that lifetime maximum doses, such as for anthracyclines, will not be exceeded",
      why: "Some drugs damage the heart or lungs once a total amount has been given over all cycles.",
      source: "bopa-2025",
      quote: "Ensure maximum lifetime cumulative doses for e.g. anthracyclines will not be exceeded.",
    },
    {
      action: "Every cycle, check premedication and supportive medicines, adjusted for side effects recorded at earlier cycles",
      why: "Anti-sickness medicines, steroids and fluids are part of giving the treatment safely, and may need changing after a reaction.",
      source: "bopa-2025",
      quote: "Check pre-medications has been prescribed if appropriate, and adjusted if necessary in response to recorded toxicities",
    },
    {
      action: "Sign and date the prescription as the record of verification",
      why: "The signature shows the check was done, by whom and when.",
      source: "bopa-2025",
      quote: "When satisfied that the prescription is correct sign and date prescription as a record of verification.",
    },
  ],
  bestInClass: {
    statement: "Prescribe from standard, referenced regimens on electronic order sets; no verbal orders except to hold or stop; a reference or second prescriber for exception orders; height and weight in metric units verified by two people; and a trained pharmacy professional's verification of every prescription before anything is prepared or given, with a fuller check at cycle 1 (BOPA 2025; ASCO-ONS 2024). On who verifies, the two standards differ: BOPA requires a trained registered pharmacy professional for every prescription, adult or child, while ASCO-ONS requires a licensed pharmacist only where children are treated and otherwise allows the first verification by any staff the organisation approves to prepare or give the treatment. Neither standard is graded.",
    sources: ["asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Dose banding",
      differs: "Rounds a calculated dose to the nearest standard band of pre-made doses, rather than making each dose to the milligram.",
      evidence: "BOPA asks for adult doses to be banded where bands are available, by the national dose banding tables in England, Wales and Northern Ireland or the SOPPG tables in Scotland, and says banding is not usually used in children. No outcome data were read.",
      sources: ["bopa-2025"],
    },
    {
      name: "Capping body surface area",
      differs: "Some clinicians cap the body surface area used to calculate doses, usually in people with obesity.",
      evidence: "BOPA describes capping as individual or local practice and asks only that the decision be documented in the treatment plan. ASCO's guideline on dosing in obesity, not read here, is linked from the technology record on chemotherapy dosing in obesity.",
      sources: ["bopa-2025"],
    },
    {
      name: "Pharmacy technician verification",
      differs: "A trained pharmacy technician verifies simple prescriptions for later cycles, such as flat-dosed or well-tolerated drugs, instead of a pharmacist.",
      evidence: "BOPA version 5.0 sets the training and experience required and places technician verification within its level 2a; it is a governance standard, not a trial.",
      sources: ["bopa-2025"],
    },
  ],
  grades: [
    { claim: "Standard regimens defined by diagnosis, with references", grade: "Standard (not graded)", source: "asco-ons-2024" },
    { claim: "A licensed pharmacist verifies all parenteral orders where children under 18 are treated", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "A licensed pharmacist verifies all orders before dispensing parenteral antineoplastics in the health care organization that treats pediatric patients under age 18 years" },
    { claim: "Cumulative doses tracked for drugs with cumulative toxicity", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "Cumulative doses of antineoplastic therapy are tracked for agents associated with cumulative toxicity" },
    { claim: "No anticancer treatment given or taken before verification by a trained pharmacy professional", grade: "Standard (not graded)", source: "bopa-2025" },
    { claim: "Adult doses banded where bands exist", grade: "Standard (not graded)", source: "bopa-2025", quote: "Note: SACT for adult patients should be dose banded where bands are available." },
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
      gradingScheme: "Standards are not graded; BOPA calls them the gold standard for verification and asks for a local risk assessment where a service departs from them.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["body-surface-area-dosing", "carboplatin-calvert-dosing", "chemotherapy-dosing-in-obesity", "pharmacy-automation", "cytotoxic-chemotherapy"],
  terms: ["dose-modification"],
  related: ["dpyd-testing-before-fluoropyrimidines", "sact-administration-checks-at-the-chair"],
  upgrades: [],
  gaps: [
    "Neither standard is graded, and ASCO-ONS says several of its sections rest mainly on expert experience; no trial compares one verification process with another.",
    "ASCO-ONS and BOPA differ on whether a pharmacist (or trained pharmacy professional) must verify every adult prescription; ASCO-ONS requires a licensed pharmacist only where children are treated.",
    "The ASHP guidelines on preventing medication errors with chemotherapy (2015) could not be read and are not cited.",
    "How often weight should be rechecked, and the percentage change that triggers a recalculated dose, are left to local policy by both standards.",
    "The ASCO-ONS text was read from an archived copy of the publisher's page because the publisher refuses a script; the ONS version of the same standards served only a preview.",
  ],
});
