import { protocol } from "./helpers";

/*
 * Prescribing anticancer treatment and checking the prescription before it is prepared: the order, the regimen, the
 * dose calculation, the blood results and the pharmacy's clinical verification, for every cycle.
 *
 * What was read, and how.
 * First reading, 11 November 2026 (fetched raw into a scratch directory and read as text):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology (Siegel et al.,
 *   JCO Oncology Practice 2024; also Oncology Nursing Forum 51(4)): full text, from the Internet Archive's capture of
 *   ascopubs.org/doi/10.1200/OP.24.00216 (11 July 2025), because ascopubs.org returned 403 to a script and the ONS site
 *   served a one-page preview PDF. It updates the 2016 ASCO/ONS standards. The standards carry no grades.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025): full
 *   text of the PDF from bopa.org.uk, with pdftotext.
 *
 * Second accuracy pass, 17 November 2026:
 * - BOPA version 5.0: re-read in full as raw text (pdftotext -layout of the PDF another checker fetched from
 *   bopa.org.uk the same day; copy re-used). Every BOPA quote was checked by script against that text, with only
 *   whitespace and line breaks normalised. BOPA's own listing page refused a script, so a later version could not be
 *   ruled out there; the version 5.0 PDF is still served at the cited address.
 * - ASCO-ONS 2024: re-read in full as raw text later on 17 November, in the Oncology Nursing Society's open
 *   co-publication (the advance-print PDF offered on the ONS article page,
 *   Oncology Nursing Forum, July 2024, 51(4)), converted with pdftotext; a copy another checker fetched from ons.org
 *   the same day was re-used.
 *   ascopubs.org was not requested. Every ASCO-ONS quote was matched by script against that text (whitespace and
 *   line-break hyphenation only) and every step, grade and summary sentence citing it was checked against the numbered
 *   standard. Corrected then: the dose calculation is to be in the medical record, which the page had put on the order;
 *   "only" was taken off the standard-regimen step, since the standards provide for exception orders; a "second
 *   prescriber" is now the source's second licensed practitioner; and four reasons the text does not give were reworded
 *   to what it prints. A Europe PMC title search found no newer edition.
 * - ASHP guidelines on preventing medication errors with chemotherapy and biotherapy (2015): retried, still not read.
 *   ashp.org returned 403 to a script and Europe PMC holds no abstract; not cited.
 * - Corrected on this pass: the page said the pharmacy check comes before a drug is prepared, where BOPA allows
 *   preparation in advance and forbids only giving or issuing the treatment before verification; reasons that named
 *   things BOPA does not print (a thousandfold unit error, heart and lung damage, herbal products, a DPD test) were
 *   reworded to what the text says.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const sactPrescribingAndPharmacyVerification = protocol({
  id: "sact-prescribing-and-pharmacy-verification",
  name: "Anticancer treatment prescribing and pharmacy verification before each cycle",
  aka: ["chemotherapy order verification", "SACT prescription verification", "clinical screening of chemotherapy prescriptions", "pharmacist chemotherapy check", "chemotherapy order set", "first verification", "SACT clinical check"],
  domain: "pharmacy",
  tldr: "Under the UK standard, no cancer drug is given to you until a specially trained pharmacist or pharmacy technician has checked the prescription: that it matches your agreed treatment plan, that the dose is worked out correctly from your height, weight and kidney function where those matter, and that your blood results meet the limits your treatment protocol sets.",
  simple: "Your cancer drug prescription is checked by a trained pharmacy person before you are given the drugs, every cycle. It is normal to be asked your weight, your other medicines and any allergies again.",
  summary: "The US standard is the ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024), which updated the 2016 ASCO/ONS standards; the UK standard for the pharmacy step is BOPA's Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025). Neither grades its standards: ASCO-ONS combined literature reviews with panel opinion and public comment. Both were re-read in full on 17 November 2026, ASCO-ONS in the Oncology Nursing Society's open copy.\n\nBoth build prescribing on agreed regimens and authorised prescribers. BOPA says all treatment must be prescribed within an approved protocol on an electronic prescribing system, with paper only in exceptional circumstances set by local policy, such as system downtime, and then on computer-generated, document-controlled forms. Who may prescribe is set by local policy: BOPA asks the verifier to check that the prescriber is authorised to prescribe a first cycle at cycle 1, and authorised to prescribe at every cycle. ASCO-ONS asks each organisation to define standard regimens by diagnosis, with references, and has orders signed by licensed practitioners the organisation judges qualified. It asks for a policy that bans verbal orders except to hold or stop treatment and that requires a supporting reference, authorisation by a second licensed practitioner, or both, before an order that departs from the standard regimen. Height and weight are measured in metric units and verified by two people, one a licensed clinician, before a new plan. Among the elements that must be in the medical record for each order are the dose calculation method, the variables used, how often they are re-evaluated and what change prompts confirmation or recalculation.\n\nThe two differ on who verifies. BOPA says no anticancer treatment may be given or taken until a trained registered pharmacy professional (a pharmacist or pharmacy technician) has verified the prescription; preparation may start earlier. A pharmacist who prescribes still needs a different pharmacy professional to verify. BOPA sets out checks for cycle 1 (the prescriber, consent, the regimen against the treatment plan, eligibility, funding approvals, allergies, interactions, critical tests such as cardiac function or genomic results, virology screening) and for every cycle (dose calculation and units, maximum single and lifetime doses, blood results, renal and hepatic function, supportive medicines, then a signature). It prints no figures for these: how recent blood results must be, what weight change triggers a recalculated dose and the dose limits themselves are left to local policy and the treatment protocol. ASCO-ONS requires a licensed pharmacist to verify all parenteral orders only where children under 18 are treated; for adults its first verification, before preparation, may be done by any personnel the organisation approves to prepare or give the treatment. BOPA says adult doses should be banded where bands are available.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "pharmacy-technician"],
    where: ["outpatient-clinic", "aseptic-unit", "chemotherapy-day-unit", "ward"],
  },
  population: "Adults and children prescribed systemic anticancer therapy. BOPA covers all routes except intrathecal treatment, which has its own national guidance, and leaves out hormonal treatments and radiopharmaceuticals; the ASCO-ONS standards extend to treatment given at home. Children need extra checks (BOPA tables 2 to 6; ASCO-ONS pharmacist verification).",
  trigger: "A cycle of anticancer treatment is prescribed, whether the first cycle of a new regimen or a later one.",
  steps: [
    {
      action: "Prescribe from the standard regimens the organisation has defined for each diagnosis, with their references",
      why: "The standards ask each organisation to define its regimens by diagnosis, with references, and to use standardised regimen-level orders, preprinted or electronic. An order that departs from them is handled as an exception order.",
      source: "asco-ons-2024",
      quote: "The health care organization defines standard antineoplastic therapy regimens by diagnosis with references",
    },
    {
      action: "Prescribe on an electronic prescribing system, within an approved protocol; use paper only in the exceptional circumstances local policy defines, such as system downtime",
      why: "The protocol is built into the electronic system and checked before it is released for use, and where possible one prescription carries the supportive medicines and fluids as well.",
      source: "bopa-2025",
      quote: "All SACT must be prescribed in the context of an approved protocol and prescribed via an electronic prescribing system.",
    },
    {
      action: "Do not accept verbal orders, except to hold or stop treatment",
      why: "The standards' glossary says orders spoken aloud, in person or by telephone, offer more room for error than orders that are written or sent electronically.",
      source: "asco-ons-2024",
      quote: "Verbal orders are not allowed except to hold or stop antineoplastic therapy administration",
    },
    {
      action: "For any order that departs from the standard regimen, record the reason and get a supporting reference, a second licensed practitioner's authorisation, or both, before it is ordered, signed or given",
      why: "The standards' examples of such orders are an order set used for a disease it was not assigned to, a medicine added to the standard regimen, and a dose or schedule raised beyond it.",
      source: "asco-ons-2024",
      quote: "The policy requires a supporting reference and/or authorization by a second licensed practitioner prior to ordering, signing, or administration of an exception order",
    },
    {
      action: "Measure height and weight in kilograms and centimetres and have two people, one a licensed clinician, verify them before a new treatment plan is prepared",
      why: "The panel added the two-person check to lower the risk of documentation error. It cites a study of 10,000 randomly selected medical records that found errors in 20%, among them mistyped numbers, misplaced decimal points and pounds recorded as kilograms.",
      source: "asco-ons-2024",
      quote: "Weight and height are measured and documented in the medical record in metric units (eg, kg and cm). Both the measurement and documentation are verified by two individuals, one of whom is a licensed clinician, prior to preparation and administration of a newly prescribed antineoplastic treatment plan.",
    },
    {
      action: "Write doses without unapproved abbreviations, without trailing zeros and with leading zeros",
      why: "The standards list this among the elements required for every order and leave the detail to the organisation's own policy. They do not print a reason.",
      source: "asco-ons-2024",
      quote: "Doses are written following health care organization policy for preventing the use of unapproved abbreviations, omitting trailing zeros, and including leading zeros",
    },
    {
      action: "Do not give or issue any anticancer treatment until a trained pharmacist or pharmacy technician has verified the prescription; preparation may start before verification is complete",
      why: "BOPA calls verification an essential step: it gives assurance that the treatment suits the person's disease and condition and that the doses are accurate, and it reduces the risk of medication errors.",
      source: "bopa-2025",
      quote: "SACT must not be administered by a HCP, or taken by a patient until an appropriately trained RPP has verified the prescription.",
    },
    {
      action: "At cycle 1, check that the prescriber is authorised to prescribe a first cycle; at every cycle, that the prescriber is authorised to prescribe anticancer treatment",
      why: "Only practitioners whom local policy has assessed as competent are allowed to prescribe these drugs, and the person verifying must be able to confirm it.",
      source: "bopa-2025",
      quote: "Check the prescriber is authorised to prescribe Cycle 1 SACT in your organisation.",
    },
    {
      action: "At cycle 1, check consent, and check that the regimen matches the documented treatment plan or clinic letter",
      why: "The prescription has to be the treatment that was decided on and consented to, and an approved regimen for the diagnosis and line of therapy.",
      source: "bopa-2025",
      quote: "Check that the regimen prescribed matches the intended documented treatment plan and/or clinic letter.",
    },
    {
      action: "At cycle 1, check for interactions, contraindications and duplication between the anticancer drugs, the supportive medicines and the patient's other medicines; at later cycles, check any medicine started since the last cycle",
      why: "A person's other medicines can interact with the treatment, rule it out or double up with it.",
      source: "bopa-2025",
      quote: "Check for potential interactions, contra-indications and duplication between all planned SACT & supportive medication and patient’s concurrent medication.",
    },
    {
      action: "At cycle 1, make sure the critical pre-treatment tests are done and reported, such as heart function, cumulative doses or genomic results",
      why: "These results may decide whether a person is eligible for a treatment, or its dose.",
      source: "bopa-2025",
      quote: "Ensure that relevant pre-treatment critical tests have been completed and reported prior to treatment (e.g. Cardiac function, cumulative dosing, genomic testing) as these may impact eligibility for, or dosing of SACT.",
    },
    {
      action: "Every cycle, check the dose calculation (flat, body surface area, weight or AUC), its units, the final dose and the route",
      why: "A dose may need recalculating when weight or kidney function changes, by the rule local policy sets, and earlier dose changes have to be carried forward.",
      source: "bopa-2025",
      quote: "Check drug dose calculations (Flat, BSA, weight, AUC) and units are appropriate.",
    },
    {
      action: "Every cycle, check the blood results the protocol defines, taken within the time range local policy sets, and check that doses are modified for kidney and liver function where the drug or regimen literature requires",
      why: "Some doses have to be changed when the kidneys or liver are working less well. BOPA prints no number of days for how recent the results must be; that is left to local policy.",
      source: "bopa-2025",
      quote: "Check laboratory values (e.g.: FBC, U&Es LFTs) as defined within SACT protocol",
    },
    {
      action: "Every cycle, check that the maximum dose of an individual drug (BOPA's example is vincristine) and lifetime cumulative maximums, such as for anthracyclines, will not be exceeded",
      why: "A lifetime maximum counts everything given at earlier cycles and earlier treatments. BOPA prints no limits itself and refers to the treatment protocol for them.",
      source: "bopa-2025",
      quote: "Ensure maximum lifetime cumulative doses for e.g. anthracyclines will not be exceeded.",
    },
    {
      action: "Every cycle, check premedication, hydration and supportive medicines, adjusted for side effects recorded at earlier cycles",
      why: "Supportive medicines and fluids are part of the protocol, and may need changing after side effects at an earlier cycle.",
      source: "bopa-2025",
      quote: "Check pre-medications has been prescribed if appropriate, and adjusted if necessary in response to recorded toxicities",
    },
    {
      action: "Sign and date the prescription as the record of verification; the signature may be electronic",
      why: "The signature shows the check was done, by whom and when.",
      source: "bopa-2025",
      quote: "When satisfied that the prescription is correct sign and date prescription as a record of verification.",
    },
  ],
  bestInClass: {
    statement: "Prescribe from standard, referenced regimens (ASCO-ONS 2024) within an approved protocol on an electronic prescribing system (BOPA 2025); no verbal orders except to hold or stop; a reference or a second licensed practitioner's authorisation for exception orders; height and weight in metric units verified by two people (all ASCO-ONS 2024); and a trained pharmacy professional's verification of every prescription before anything is given or issued to the patient, with a fuller check at cycle 1 (BOPA 2025). BOPA allows preparation to start before verification is complete. On who verifies, the two standards differ: BOPA requires a trained registered pharmacy professional for every prescription, adult or child, while ASCO-ONS requires a licensed pharmacist only where children are treated and otherwise allows the first verification by any staff the organisation approves to prepare or give the treatment. Neither standard is graded.",
    sources: ["asco-ons-2024", "bopa-2025"],
  },
  variants: [
    {
      name: "Dose banding",
      differs: "Rounds a calculated dose to the nearest standard band of pre-made doses, rather than making each dose to the milligram.",
      evidence: "BOPA says adult doses should be banded where bands are available, by the national dose banding tables in England, Wales and Northern Ireland or the SOPPG tables in Scotland, and says banding is not usually used in children. No outcome data were read.",
      sources: ["bopa-2025"],
    },
    {
      name: "Capping body surface area",
      differs: "Some clinicians cap the body surface area used to calculate doses.",
      evidence: "BOPA describes capping as individual or local practice and asks only that the decision be documented in the treatment plan. ASCO's guideline on dosing in obesity, not read here, is linked from the technology record on chemotherapy dosing in obesity.",
      sources: ["bopa-2025"],
    },
    {
      name: "Pharmacy technician verification",
      differs: "A trained pharmacy technician, instead of a pharmacist, verifies simple prescriptions agreed by local governance, from cycle 2 onwards. BOPA's examples are oral drugs such as hydroxycarbamide, imatinib and enzalutamide, and flat-dosed treatment that is usually well tolerated.",
      evidence: "BOPA version 5.0 expects technician verification within its level 2a for cycle 2 onwards. As guidance to organisations it gives minimum requirements: band 5 or 6 or equivalent, at least two years of cancer-specific experience, an accuracy checking technician qualification and further post-qualification training. It recommends approving a technician for named items, with more added as competence grows. It is a governance standard, not a trial.",
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
      gradingScheme: "Standards are not graded. A systematic review was run, but the panel found few studies relevant enough and based the standards on informal consensus, expert opinion and publications its members suggested, followed by public comment.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded. The title page calls them minimum standards; the text says they should be considered the gold standard for verification and asks for a local risk assessment where a service departs from them.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["body-surface-area-dosing", "carboplatin-calvert-dosing", "chemotherapy-dosing-in-obesity", "pharmacy-automation", "cytotoxic-chemotherapy"],
  terms: ["dose-modification"],
  related: ["dpyd-testing-before-fluoropyrimidines", "sact-administration-checks-at-the-chair"],
  upgrades: [],
  gaps: [
    "Neither standard is graded, and no trial compares one verification process with another.",
    "ASCO-ONS and BOPA differ on whether a pharmacist (or trained pharmacy professional) must verify every adult prescription; ASCO-ONS requires a licensed pharmacist to verify orders only where children are treated.",
    "The ASCO-ONS standards (2024) were read in full on 17 November 2026 from the Oncology Nursing Society's open copy of the co-published text (Oncology Nursing Forum, July 2024), because the JCO Oncology Practice site refuses a script. The steps, quotes and graded standards that cite them were checked against that text. The standards give no reason for the rule on abbreviations and zeros, and they place the dose calculation in the patient's medical record without saying it must be written on the order itself. A Europe PMC title search on 17 November 2026 found no newer edition.",
    "BOPA version 5.0 prints no figures for the checks it lists. It gives no number of days for how recent blood results must be (time ranges are set by local policy), no percentage change in weight or dose that needs a recalculation or confirmation (local policy again), and no cumulative dose limits (it refers to the treatment protocol). For adults it leaves how often weight is rechecked to local policy; for children it asks for a weight before every cycle.",
    "BOPA's own listing page refused a script on 17 November 2026, so it could not be confirmed there that version 5.0 (3 June 2025) is the latest; the version 5.0 PDF is still served at the cited address.",
    "The ASHP guidelines on preventing medication errors with chemotherapy and biotherapy (2015) could not be read on 11 or 17 November 2026 (the society's site refuses a script and Europe PMC holds no abstract) and are not cited. The NHS England service specification for chemotherapy and the ISOPP standards were not read for this page.",
  ],
});
