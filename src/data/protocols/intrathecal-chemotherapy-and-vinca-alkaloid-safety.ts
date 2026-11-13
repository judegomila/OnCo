import { protocol } from "./helpers";

/*
 * Preventing the most lethal chemotherapy error: a vinca alkaloid meant for a vein injected into the spinal fluid.
 * Covers the safeguards around intrathecal chemotherapy and the rule that intravenous vinca alkaloids are given from a
 * minibag, not a syringe.
 *
 * What was read, and how (all on 11 November 2026, raw text in a scratch directory):
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024), standard 3.13: full text, from the Internet
 *   Archive's capture of ascopubs.org (the publisher refuses a script).
 * - HSC 2008/001, Updated national guidance on the safe administration of intrathecal chemotherapy (Department of
 *   Health, England, 11 August 2008): full text of the PDF from the Internet Archive's capture of dh.gov.uk. BOPA's 2025
 *   verification standards still list it as the UK intrathecal guidance.
 * - NPSA/2008/RRR004, Using vinca alkaloid minibags (adult/adolescent units) (11 August 2008): the NRLS summary page,
 *   from the Internet Archive's capture; the alert PDF itself was not read.
 * - ISMP Targeted Medication Safety Best Practices for Hospitals, Frequently Asked Questions (2026): full text of the
 *   PDF; it quotes Best Practice 1 on vinca alkaloid minibags.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const intrathecalChemotherapyAndVincaAlkaloidSafety = protocol({
  id: "intrathecal-chemotherapy-and-vinca-alkaloid-safety",
  name: "Intrathecal chemotherapy safety and vinca alkaloids given only by minibag",
  aka: ["intrathecal chemotherapy safety", "ITC register", "vincristine minibag", "wrong-route vincristine", "never event vincristine", "spinal chemotherapy checks", "HSC 2008/001", "NPSA RRR004", "ISMP best practice 1"],
  domain: "chemotherapy-administration",
  tldr: "Some treatments are injected into the fluid around the spine (intrathecal chemotherapy). Vincristine and related drugs, given into a vein, are fatal if injected there by mistake. Hospitals prevent this by keeping spinal chemotherapy separate in time and place, using only trained and registered staff, double checking with you, and giving vincristine from a small drip bag rather than a syringe.",
  simple: "Spinal chemotherapy is given in a separate room, at a separate time, by specially trained staff, with extra checks you can join in. Vincristine is put up as a small drip bag so it cannot be mistaken for a spinal injection.",
  summary: "Vinca alkaloids (vincristine, vinblastine, vindesine, vinorelbine) cause paralysis and almost always death if injected intrathecally; HSC 2008/001 cites 55 such incidents worldwide. The safeguards are of two kinds. First, intrathecal chemotherapy is separated: ASCO-ONS (2024, standard 3.13) requires it to be prepared separately, uniquely labelled, stored and delivered apart from other chemotherapy, and given immediately after a time out with a two-practitioner double check. England's HSC 2008/001 goes further: a register of trained and authorised staff for every task (prescribing, dispensing, issuing, checking, administering), issue only after written confirmation that the day's intravenous chemotherapy has been given (paediatric exceptions), a separate room with walls and a door used for nothing else in that session, a check by a second registered person and the patient if they wish, and normal working hours.\n\nSecond, intravenous vinca alkaloids are given only by infusion from a minibag, never a syringe. ISMP Best Practice 1 applies this in every setting, and ISMP does not accept large-volume syringes as an alternative; ASCO-ONS requires it where intrathecal chemotherapy is given; the NPSA alert of 2008 applied it to adult and adolescent units and not to paediatric units. Extravasation was similarly rare with syringes and minibags (0.03% and 0.04% in an Australian study cited by ISMP).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "pharmacy-technician"],
    where: ["ward", "chemotherapy-day-unit", "aseptic-unit", "theatre"],
  },
  population: "Adults and children receiving intrathecal or intraventricular chemotherapy (methotrexate, cytarabine, hydrocortisone, for example in acute lymphoblastic leukaemia and CNS lymphoma), and everyone receiving an intravenous vinca alkaloid. Paediatric practice on minibags differs between sources (see variants).",
  trigger: "Intrathecal or intraventricular chemotherapy is planned, or an intravenous vinca alkaloid is prescribed.",
  steps: [
    {
      action: "Keep a register of staff trained and authorised to prescribe, dispense, issue, check or give intrathecal chemotherapy, and let only them do it",
      why: "Most fatal errors happened when someone unfamiliar with the process gave the injection.",
      source: "hsc-2008",
      quote: "A register should be established and maintained which lists designated personnel who have been trained and authorised to prescribe, dispense, issue, check or administer intrathecal chemotherapy",
    },
    {
      action: "Prepare intrathecal drugs separately, label them uniquely, and store and deliver them apart from all other chemotherapy",
      why: "Physical separation stops an intravenous syringe being picked up by mistake.",
      source: "asco-ons-2024",
      quote: "Labeled immediately after preparation with a uniquely identifiable label for intrathecal or intraventricular medication",
    },
    {
      action: "Issue intrathecal drugs only after written confirmation that the patient's intravenous chemotherapy for that day has already been given",
      why: "If the intravenous drugs are already in the patient, there is nothing left to mix up.",
      source: "hsc-2008",
      quote: "Intrathecal chemotherapy drugs should be issued at a different time from drugs for intravenous chemotherapy. Intravenous chemotherapy drugs should be issued first.",
    },
    {
      action: "Give intrathecal chemotherapy in a separate room, with walls and a door, where no other chemotherapy is given or stored during that session",
      why: "A curtained bay next to an intravenous chemotherapy chair is where mix-ups happen.",
      source: "hsc-2008",
      quote: "This area should be a separate room (ie. with walls and a door). A curtained off area with a sign is not a suitable alternative.",
    },
    {
      action: "Immediately before the injection, hold a time out and a double check by a second registered person, involving the patient if they wish",
      why: "A second trained person, and the patient, checking drug, dose and route catch the wrong syringe.",
      source: "hsc-2008",
      quote: "These checks should include a member of staff (not the member of staff who will be administering the ITC on that occasion) appropriately trained, deemed competent and on the register to carry out this check, the patient and, if appropriate, a relative or guardian.",
    },
    {
      action: "Record the checks",
      why: "The record shows each check happened and by whom.",
      source: "hsc-2008",
      quote: "The checks made should be recorded.",
    },
    {
      action: "Give intravenous vincristine and other vinca alkaloids only from a minibag of compatible fluid, never from a syringe",
      why: "A minibag cannot be connected to a spinal needle, so the fatal wrong-route error becomes impossible.",
      source: "ismp-2026",
      quote: "BEST PRACTICE 1: Dispense vinCRIStine and other vinca alkaloids in a minibag of a compatible solution and not in a syringe.",
    },
    {
      action: "Do not use a large-volume syringe as a substitute for a minibag",
      why: "Wrong-route errors have still happened with diluted doses in syringes.",
      source: "ismp-2026",
      quote: "ISMP does not recommend the use of large volume syringes as an acceptable alternative to the minibag.",
    },
    {
      action: "Where intrathecal chemotherapy is given, make the minibag rule a written policy",
      why: "The two procedures meet in the same units, so the rule must be part of the intrathecal policy.",
      source: "asco-ons-2024",
      quote: "The health care organization that administers antineoplastic therapy directly into the cerebral spinal fluid has policy that specifies that intravenous vinca alkaloids are administered only by infusion, for example, mini bags",
    },
  ],
  bestInClass: {
    statement: "Separate intrathecal chemotherapy in time, place and people: a register of authorised staff, separate preparation and labelling, issue only after the day's intravenous chemotherapy, a dedicated room, and a recorded double check with the patient (HSC 2008/001; ASCO-ONS 2024 standard 3.13), and give every intravenous vinca alkaloid from a minibag, never a syringe (ISMP Best Practice 1, all settings). The sources differ on scope: ISMP applies minibags wherever vincristine is given, ASCO-ONS requires the policy where intrathecal chemotherapy is given, and the NPSA alert of 2008 applied it to adult and adolescent units but not paediatric units. None of these standards is graded.",
    sources: ["hsc-2008", "asco-ons-2024", "ismp-2026", "npsa-rrr004"],
  },
  variants: [
    {
      name: "Syringes for vincristine in paediatric units",
      differs: "Paediatric units give vincristine by syringe, relying on intrathecal separation and checks rather than minibags.",
      evidence: "The NPSA alert (2008) states it does not apply to children and teenagers treated in a paediatric unit, where minibags were not being recommended. ISMP (2026) applies Best Practice 1 in every setting, and its FAQ describes back-flushing a minibag line for adults and children to limit drug left in tubing.",
      sources: ["npsa-rrr004", "ismp-2026"],
    },
  ],
  grades: [
    { claim: "Intrathecal drugs administered immediately after a time out and two-practitioner double check", grade: "Standard (not graded)", source: "asco-ons-2024", quote: "Administered immediately after a time out, double check procedure that involves two licensed practitioners or other licensed clinicians approved by the health care organization to prepare or administer antineoplastic therapy" },
    { claim: "Vinca alkaloids by minibag, not syringe, in every patient care setting", grade: "ISMP Targeted Medication Safety Best Practice (not graded)", source: "ismp-2026", quote: "For example, the Best Practice 1 related to vinCRIStine should be implemented in whatever patient care setting this treatment is provided." },
    { claim: "Minibag alert applies to adult and adolescent units only", grade: "NPSA rapid response report (not graded)", source: "npsa-rrr004", quote: "It does not apply to children and teenagers being treated in a paediatric unit where minibags are not being recommended to administer vinca alkaloids." },
  ],
  sources: [
    {
      key: "hsc-2008",
      label: "HSC 2008/001: Updated national guidance on the safe administration of intrathecal chemotherapy",
      publisher: "Department of Health (England)",
      year: 2008,
      url: "http://www.dh.gov.uk/en/Publicationsandstatistics/Lettersandcirculars/Healthservicecirculars/DH_086870",
      gradingScheme: "Health service circular; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "npsa-rrr004",
      label: "NPSA/2008/RRR004: Using vinca alkaloid minibags (adult/adolescent units)",
      publisher: "National Patient Safety Agency (England)",
      year: 2008,
      url: "http://www.nrls.npsa.nhs.uk/resources/?entryid45=59890",
      gradingScheme: "Rapid response report; not graded.",
      read: "public-summary",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ismp-2026",
      label: "ISMP Targeted Medication Safety Best Practices for Hospitals: Frequently Asked Questions",
      publisher: "Institute for Safe Medication Practices (ECRI)",
      year: 2026,
      url: "https://online.ecri.org/hubfs/ISMP/Resources/ISMP_TargetedMedicationSafetyBestPractices_Hospitals_FAQ.pdf",
      gradingScheme: "Consensus best practices; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["vincristine", "vinblastine", "vinorelbine", "vindesine", "methotrexate", "cytarabine"],
  terms: ["intrathecal-therapy"],
  related: ["sact-administration-checks-at-the-chair", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "HSC 2008/001 is from 2008 and its review date (August 2011) has long passed; no replacement was found, and BOPA's 2025 standards still cite it.",
    "The NPSA alert itself (PDF) was not read; only its summary page. Later NHS alerts on non-Luer (spinal-specific) connectors, which HSC 2008/001 anticipates, were not read.",
    "The current ISMP Best Practices document itself was not read, only its FAQ, which quotes Best Practice 1 verbatim.",
    "No source read gives outcome data for the register or room separation; the safeguards rest on analysis of past fatal errors.",
  ],
});
