import { protocol } from "./helpers";

/*
 * Preventing the most lethal chemotherapy error: a vinca alkaloid meant for a vein injected into the spinal fluid.
 * Covers the safeguards around intrathecal chemotherapy and the rule that intravenous vinca alkaloids are given from a
 * minibag, not a syringe.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext, tags stripped by script) and every quote checked by script. What was read on 17 November:
 * - NHS Specialist Pharmacy Service (SPS), three articles of 13 June 2025 (sps.nhs.uk, full text): Managing an
 *   intrathecal chemotherapy service; Preventing harm from incorrect vinca alkaloid administration; Understanding risks
 *   with intrathecal administration. They are the NHS's current restatement of HSC 2008/001 and of the NPSA alert, and
 *   the steps for England now rest on them.
 * - HSC 2008/001 (Department of Health, 11 August 2008): only the publication page, from the Internet Archive's capture
 *   of dh.gov.uk. The PDF could NOT be re-read: the Internet Archive answered 429 and the UK Government Web Archive
 *   answered with a human-verification page. Its quotes from the first pass were therefore taken out. The source URL
 *   is the UK Government Web Archive address that SPS links.
 * - NPSA/2008/RRR004 (11 August 2008): the NRLS summary page, from the Internet Archive's capture; the alert PDF was
 *   not read.
 * - Scotland's CEL 21 (2009) and CEL 22 (2009), full text of both PDFs (publications.scot.nhs.uk), and DL(2025)14 of
 *   26 June 2025, which calls CEL 21 (2009) extant.
 * - WHO Information Exchange System Alert No. 115 (18 July 2007): full text of the PDF (cdn.who.int).
 * - ISMP Targeted Medication Safety Best Practices for Hospitals 2026-2027: full text of the PDF, and its Frequently
 *   Asked Questions (2026): full text of the PDF (online.ecri.org).
 * - Vincristine Sulfate Injection, USP (Hospira), US prescribing information revised December 2025: DailyMed SPL XML.
 * - ASCO-ONS standards (2024): at first the abstract only, so its quotes were taken out and no step rests on it. Later
 *   on 17 November the full text was read in the Oncology Nursing Society's open co-publication (the advance-print
 *   PDF offered on the ONS article page,
 *   Oncology Nursing Forum, July 2024, 51(4)), converted with pdftotext; a copy another checker fetched from ons.org
 *   the same day was re-used.
 *   Standard 3.13 (3.13.1 to 3.13.6) was read there and is now described in bestInClass and `gaps`; nothing is quoted
 *   from it. ascopubs.org was not requested.
 * - BOPA's verification standards, version 5.0 (3 June 2025), from a copy a sibling checker saved the same day: they
 *   still cite HSC 2008/001.
 * - NHS England (the NRFit National Patient Safety Alert and the Never Events list) returned an empty response to a
 *   script and was not read.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const intrathecalChemotherapyAndVincaAlkaloidSafety = protocol({
  id: "intrathecal-chemotherapy-and-vinca-alkaloid-safety",
  name: "Intrathecal chemotherapy safety and vinca alkaloids given only by minibag",
  aka: ["intrathecal chemotherapy safety", "ITC register", "vincristine minibag", "wrong-route vincristine", "never event vincristine", "spinal chemotherapy checks", "HSC 2008/001", "NPSA RRR004", "ISMP best practice 1", "NRFit"],
  domain: "chemotherapy-administration",
  tldr: "Some treatments are injected into the fluid around the spine (intrathecal chemotherapy). Vincristine and related drugs belong in a vein and usually cause paralysis and death if injected there by mistake. Hospitals prevent this by keeping spinal chemotherapy separate in time and place, using only trained, registered staff, making checks you can join, and giving vincristine from a small drip bag.",
  simple: "Spinal chemotherapy is given in its own room, after any chemotherapy into a vein, by specially trained staff, with checks you can join in. Vincristine is usually put up as a small drip bag rather than a syringe, so it is not mistaken for a spinal injection.",
  summary: "Vinca alkaloids (vincristine, vinblastine, vindesine, vinorelbine) are for intravenous use only; given intrathecally they cause paralysis and usually death. WHO counted 55 reports worldwide from 1968 to its alert of July 2007; ISMP's 2026-2027 best practices say more than 130 cases have been reported with vincristine; Scotland's guidance of 2009 counts at least 13 patients in the UK who died or were paralysed since 1985, and names the death of a teenager in Nottingham on 2 February 2001.\n\nThe safeguards are of two kinds. First, intrathecal chemotherapy is kept apart in people, time and place. England's guidance is HSC 2008/001, which the NHS Specialist Pharmacy Service (SPS) restated in June 2025, noting that it is being updated. It requires a register of staff trained and authorised for each task (prescribing, dispensing, issuing, checking, administering); prescribing and administration only by doctors at ST3 level or above (waivers for ST1 and ST2 to administer are permitted, though not in trusts that give a low volume); a dedicated locked container or refrigerator never used for intravenous medicines; intravenous chemotherapy issued and given first; a designated room where no other chemotherapy is given or stored; recorded checks by the administering doctor and a second registered member of staff, with the patient if they wish; and NRFit devices, which do not connect to intravenous Luer connectors, for every intrathecal medicine. Out-of-hours administration should be exceptional. Scotland's CEL 21 (2009), called extant in June 2025, sets the same sequence and allows two exceptions, both for children: intrathecal chemotherapy given under general anaesthesia, and a paediatric protocol that requires the intrathecal drugs first.\n\nSecond, intravenous vinca alkaloids are given from a minibag, not a syringe. ISMP Best Practice 1 applies this wherever the treatment is given, suggests a volume too large for intrathecal use (for example 25 mL for children and 50 mL for adults), does not accept large-volume syringes as an alternative, and reports no case of intrathecal administration from a minibag. In the UK, SPS (summarising the NPSA alert of 2008, now archived and kept as a best practice reference) and Scotland's CEL 22 (2009) specify a 50 mL minibag infused over 5 to 10 minutes in adult and adolescent units. The NPSA alert and CEL 22 do not recommend minibags in paediatric units, and SPS gives a syringe of 10 mL or more for children. WHO (2007) and the current US vincristine label ask for a prominent warning that the drug is for intravenous use only and fatal if given by other routes. Extravasation rates were similar and low with syringes and minibags (0.03% and 0.04% in an Australian study of more than 44,000 doses cited by ISMP).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "pharmacy-technician"],
    where: ["ward", "chemotherapy-day-unit", "aseptic-unit", "theatre"],
  },
  population: "Adults and children receiving intrathecal chemotherapy (for example in leukaemias and lymphomas), and everyone receiving an intravenous vinca alkaloid. The intrathecal steps are those of the NHS in England, with Scotland's exceptions for children named in the summary. Practice on minibags for children differs between sources (see variants).",
  trigger: "Intrathecal chemotherapy is planned, or an intravenous vinca alkaloid is prescribed.",
  steps: [
    {
      action: "Keep a register of staff trained and authorised to prescribe, dispense, issue, check or give intrathecal chemotherapy, and let only them do each task",
      why: "Everyone who handles the drug has been taught what happens if the wrong medicine reaches the spinal fluid.",
      source: "sps-itc-2025",
      quote: "An ITC register must be established and maintained of staff who have been trained and authorised in one or more of the designated tasks",
    },
    {
      action: "Allow only doctors at ST3 level or above, who are on the register, to prescribe and to give intrathecal chemotherapy",
      why: "The injection is given by an experienced doctor who has been trained and assessed for this task.",
      source: "sps-itc-2025",
      quote: "Administration of ITC must only be undertaken by ST3 level doctors and above, who have been appropriately trained, deemed competent and on the ITC register for administration.",
    },
    {
      action: "Write the medicine and the route in full on a purpose-designed intrathecal prescription or a dedicated area of the chemotherapy chart, and label the dose with the route in the largest practical print",
      why: "A clear label saying what the dose is for makes it harder to pick up the wrong one.",
      source: "sps-itc-2025",
      quote: "The medicine and route of administration must be written in full on the prescription.",
    },
    {
      action: "Store intrathecal doses in a dedicated locked container or refrigerator that is never used for intravenous medicines",
      why: "Keeping the two kinds of medicine in different places stops an intravenous dose being picked up by mistake.",
      source: "sps-itc-2025",
      quote: "This dedicated container or refrigerator must never be used to store intravenous medicines.",
    },
    {
      action: "Issue and give the patient's intravenous chemotherapy first; issue the intrathecal dose at a different time, after written confirmation that the day's intravenous chemotherapy has been given",
      why: "If the intravenous drugs are already in the patient, there is nothing left to mix up.",
      source: "sps-itc-2025",
      quote: "The IV chemotherapy must be issued and administered first.",
    },
    {
      action: "Give intrathecal chemotherapy in a designated room where no other chemotherapy is being given or stored",
      why: "With no other chemotherapy in the room, only the right medicine is within reach.",
      source: "sps-itc-2025",
      quote: "ITC must be administered in a designated room where no other chemotherapy medicines are being given or stored.",
    },
    {
      action: "Before the injection, have the administering doctor and a second member of staff on the register check the medicine, dose, route and patient, record the checks, and involve the patient if they wish",
      why: "A second trained person, and the patient, checking the medicine, dose and route can catch a mistake before it is made.",
      source: "sps-itc-2025",
      quote: "Recorded checks are required to ensure that the right medicine and the right dose is given by the right route to the right patient.",
    },
    {
      action: "Prepare and give every intrathecal medicine with NRFit syringes, needles and connectors",
      why: "These connectors do not fit intravenous equipment, which lowers the risk of a wrong-route error.",
      source: "sps-risks-2025",
      quote: "These are specific syringes, needles and devices with safe connectors that will not connect to intravenous Luer connectors.",
    },
    {
      action: "Dispense intravenous vincristine and other vinca alkaloids in a minibag of compatible fluid, not in a syringe",
      why: "The bag holds a volume too large to be injected into the spine, and ISMP reports no intrathecal error with a vinca alkaloid dispensed in a minibag.",
      source: "ismp-bp-2026",
      quote: "Dispense vinCRIStine and other vinca alkaloids in a minibag of a compatible solution and not in a syringe.",
    },
    {
      action: "In adult and adolescent units in the UK, supply the dose from pharmacy ready to give in a 50 mL minibag, and infuse it over 5 to 10 minutes while watching for leakage from the vein",
      why: "Nothing needs to be drawn up or diluted on the ward, and a short infusion is watched closely.",
      source: "sps-vinca-2025",
      quote: "Vinca alkaloids for adults and adolescents are prescribed, prepared, dispensed and administered in a 50mL minibag of sodium chloride 0.9% or glucose 5% according to stability.",
    },
    {
      action: "Label every vinca alkaloid with its route in the largest practical print, for example that it is for intravenous use only and fatal by other routes",
      why: "The warning is the last thing a person reads before giving the drug.",
      source: "sps-vinca-2025",
      quote: "All vinca alkaloid labels should use positive messaging in the largest practical font size for the route of administration.",
    },
    {
      action: "Do not use a large-volume syringe as a substitute for a minibag",
      why: "Wrong-route errors have still been reported with diluted doses in syringes.",
      source: "ismp-2026",
      quote: "ISMP does not recommend the use of large volume syringes as an acceptable alternative to the minibag.",
    },
    {
      action: "Write the vinca alkaloid rules into the local chemotherapy protocol, from preparation to administration, and audit against it",
      why: "A written local rule, checked by audit, keeps the practice in place when staff change.",
      source: "sps-vinca-2025",
      quote: "The Trust must have a current and approved local chemotherapy protocol(s) which covers the requirements for vinca alkaloids, from preparation through to administration.",
    },
  ],
  bestInClass: {
    statement: "Separate intrathecal chemotherapy in people, time and place: a register of authorised staff, administration only by registered doctors at ST3 level or above, separate locked storage, issue after the day's intravenous chemotherapy has been given, a designated room, recorded checks by two registered staff with the patient if they wish, and NRFit connectors (HSC 2008/001 as restated by SPS in 2025, which words most of these as 'must'; Scotland's CEL 21 of 2009). Give every intravenous vinca alkaloid from a minibag, not a syringe (ISMP Best Practice 1, wherever the treatment is given; WHO 2007). The sources differ on children: ISMP recommends minibags for them too, while the UK guidance (NPSA 2008, SPS 2025, Scotland's CEL 22) applies minibags to adult and adolescent units and does not recommend them in paediatric units. ISMP says its best practice is supported by ASCO and ONS, citing their 2024 standards. Standard 3.13.6 of those asks an organisation that gives anticancer drugs into the cerebrospinal fluid to have a policy that intravenous vinca alkaloids are given only by infusion, for example minibags, and prints no exception for children. None of these standards is graded.",
    sources: ["sps-itc-2025", "sps-risks-2025", "sps-vinca-2025", "hsc-2008", "cel-21-2009", "cel-22-2009", "ismp-bp-2026", "ismp-2026", "who-alert-115", "npsa-rrr004"],
  },
  variants: [
    {
      name: "Syringes for vinca alkaloids in paediatric units",
      differs: "UK guidance does not recommend minibags in paediatric units and supplies vinca alkaloids for children in a syringe of 10 mL or more; ISMP recommends a minibag for children as well.",
      evidence: "The NPSA alert (2008) states it does not apply to children and teenagers treated in a paediatric unit. Scotland's CEL 22 (2009) gives the reason: its advisers judged that the practical difficulties of preparing and giving infusions of vinca alkaloids to children outweigh the benefits. SPS (2025) gives a syringe of 10 mL or greater for children. ISMP (2026-2027) gives 25 mL as an example minibag volume for children and says many organisations, including paediatric hospitals, have switched to minibags; its FAQ describes back-flushing the line with a 25 mL bag of sodium chloride 0.9% for adults and children to limit drug left in tubing. WHO (2007) describes a death in Spain in 2005 after about 2 mL was injected from a 20 mL syringe of vincristine, and recommends that syringes should not be used.",
      sources: ["npsa-rrr004", "cel-22-2009", "sps-vinca-2025", "ismp-bp-2026", "ismp-2026", "who-alert-115"],
    },
    {
      name: "Minibag volume",
      differs: "The UK specifies 50 mL for adults and adolescents; ISMP gives 25 mL for children and 50 mL for adults as examples; the US label asks for a flexible plastic container and names no volume.",
      evidence: "SPS (2025) and Scotland's CEL 22 (2009) specify a 50 mL minibag of sodium chloride 0.9% or glucose 5% according to stability. ISMP (2026-2027) asks for a volume too large for intrathecal administration. WHO (2007) gives 50 mL of normal saline as its example. The Hospira label (revised December 2025) says the injection should be diluted in a flexible plastic container and prominently labelled.",
      sources: ["sps-vinca-2025", "cel-22-2009", "ismp-bp-2026", "who-alert-115", "vincristine-label-2025"],
    },
  ],
  grades: [
    { claim: "A register of staff trained and authorised for each intrathecal task", grade: "Minimum requirement, worded 'must' (not graded)", source: "sps-itc-2025", quote: "Only staff appropriately trained, deemed competent and on the ITC register for prescribing can prescribe ITC." },
    { claim: "NRFit devices for all intrathecal medicines", grade: "Requirement, worded 'must' (not graded)", source: "sps-risks-2025", quote: "All medicines intended for intrathecal administration must be prepared and administered using dedicated neuraxial devices and connectors (NRFit™)." },
    { claim: "Vinca alkaloids by minibag, not syringe, in every patient care setting", grade: "ISMP Targeted Medication Safety Best Practice (not graded)", source: "ismp-2026", quote: "For example, the Best Practice 1 related to vinCRIStine should be implemented in whatever patient care setting this treatment is provided." },
    { claim: "No intrathecal error reported with a minibag", grade: "ISMP rationale statement (not graded)", source: "ismp-bp-2026", quote: "There have been no reported cases of accidental administration of a vinca alkaloid by the intrathecal route when dispensed in a minibag." },
    { claim: "Syringes should not be used for vincristine", grade: "WHO recommendation (not graded)", source: "who-alert-115", quote: "Syringes should not be used for vincristine administration." },
    { claim: "Minibag alert applies to adult and adolescent units only", grade: "NPSA rapid response report (not graded)", source: "npsa-rrr004", quote: "It does not apply to children and teenagers being treated in a paediatric unit where minibags are not being recommended to administer vinca alkaloids." },
    { claim: "Out-of-hours intrathecal chemotherapy only in exceptional circumstances", grade: "Worded 'should' (not graded)", source: "sps-itc-2025", quote: "Out-of-hours ITC administration should be in exceptional circumstances only." },
  ],
  sources: [
    {
      key: "sps-itc-2025",
      label: "Managing an intrathecal chemotherapy service (published 13 June 2025)",
      publisher: "NHS Specialist Pharmacy Service",
      year: 2025,
      url: "https://www.sps.nhs.uk/articles/managing-an-intrathecal-chemotherapy-service/",
      gradingScheme: "Summary of the minimum requirements of HSC 2008/001; not graded. Requirements are worded 'must' or 'should'.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "sps-risks-2025",
      label: "Understanding risks with intrathecal administration (published 13 June 2025, last updated 17 June 2025)",
      publisher: "NHS Specialist Pharmacy Service",
      year: 2025,
      url: "https://www.sps.nhs.uk/articles/understanding-risks-with-intrathecal-administration/",
      gradingScheme: "Professional guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "sps-vinca-2025",
      label: "Preventing harm from incorrect vinca alkaloid administration (published 13 June 2025)",
      publisher: "NHS Specialist Pharmacy Service",
      year: 2025,
      url: "https://www.sps.nhs.uk/articles/preventing-harm-from-incorrect-vinca-alkaloid-administration/",
      gradingScheme: "Summary of the minimum requirements of the NPSA guidance of 2008; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hsc-2008",
      label: "HSC 2008/001: Updated national guidance on the safe administration of intrathecal chemotherapy (11 August 2008; replaces HSC 2003/010)",
      publisher: "Department of Health (England)",
      year: 2008,
      url: "https://webarchive.nationalarchives.gov.uk/ukgwa/20130104175622/http:/www.dh.gov.uk/en/Publicationsandstatistics/Lettersandcirculars/Healthservicecirculars/DH_086870",
      gradingScheme: "Health service circular; not graded.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
    {
      key: "npsa-rrr004",
      label: "NPSA/2008/RRR004: Using vinca alkaloid minibags (adult/adolescent units) (11 August 2008; archived)",
      publisher: "National Patient Safety Agency (England)",
      year: 2008,
      url: "https://webarchive.nationalarchives.gov.uk/ukgwa/20180501174827/http:/www.nrls.npsa.nhs.uk/alerts/?entryid45=59890&cord=ASC&p=2",
      gradingScheme: "Rapid response report; not graded.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
    {
      key: "cel-21-2009",
      label: "CEL 21 (2009): Safe administration of intrathecal cytotoxic chemotherapy (19 June 2009)",
      publisher: "Scottish Government Health Directorates",
      year: 2009,
      url: "https://www.publications.scot.nhs.uk/files/cel2009-21.pdf",
      gradingScheme: "Chief Executive Letter; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cel-22-2009",
      label: "CEL 22 (2009): Safe administration of vinca alkaloids (19 June 2009)",
      publisher: "Scottish Government Health Directorates",
      year: 2009,
      url: "https://www.publications.scot.nhs.uk/files/cel2009-22.pdf",
      gradingScheme: "Chief Executive Letter; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "who-alert-115",
      label: "Information Exchange System Alert No. 115: Vincristine (and other vinca alkaloids) should only be given intravenously via a minibag (18 July 2007)",
      publisher: "World Health Organization",
      year: 2007,
      url: "https://cdn.who.int/media/docs/default-source/pvg/drug-alerts/da115---alert_115_vincristine.pdf",
      gradingScheme: "Alert with recommendations; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ismp-bp-2026",
      label: "ISMP Targeted Medication Safety Best Practices for Hospitals, 2026-2027",
      publisher: "Institute for Safe Medication Practices (ECRI)",
      year: 2026,
      url: "https://online.ecri.org/hubfs/ISMP/Resources/ISMP_TargetedMedicationSafetyBestPractices_Hospitals.pdf",
      gradingScheme: "Consensus best practices; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ismp-2026",
      label: "ISMP Targeted Medication Safety Best Practices for Hospitals: Frequently Asked Questions",
      publisher: "Institute for Safe Medication Practices (ECRI)",
      year: 2026,
      url: "https://online.ecri.org/hubfs/ISMP/Resources/ISMP_TargetedMedicationSafetyBestPractices_Hospitals_FAQ.pdf",
      gradingScheme: "Consensus best practices; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "vincristine-label-2025",
      label: "Vincristine Sulfate Injection, USP: US prescribing information (revised December 2025)",
      publisher: "Hospira (DailyMed, US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b22e4c8e-dbe1-4d4b-a026-e1812974071c",
      gradingScheme: "Product label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
  ],
  drugs: ["vincristine", "vinblastine", "vinorelbine", "vindesine", "methotrexate", "cytarabine"],
  terms: ["intrathecal-therapy"],
  related: ["sact-administration-checks-at-the-chair", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the full text of HSC 2008/001 could not be re-read: the Internet Archive answered 429 for the PDF and the UK Government Web Archive answered with a human-verification page. Only its publication page was read. The steps for England now rest on the NHS Specialist Pharmacy Service's restatement of June 2025. Details recorded from the circular at the first reading on 11 November 2026 and not confirmed since (that the room must have walls and a door and a curtained area will not do, and that a relative or guardian may join the checks) have been left out of the steps.",
    "HSC 2008/001 dates from 2008. The NHS Specialist Pharmacy Service wrote in June 2025 that the national guidance is being updated; no replacement was found on 17 November 2026, and BOPA's verification standards (version 5.0, June 2025) still cite the 2008 circular.",
    "The ASCO-ONS standards (2024) were read in full on 17 November 2026 from the Oncology Nursing Society's open copy of the co-published text (Oncology Nursing Forum, July 2024), because the JCO Oncology Practice site refuses a script. Standard 3.13 asks an organisation that gives drugs intrathecally or intraventricularly for a policy that they are prepared separately from other anticancer drugs, labelled at once with a uniquely identifiable label, stored apart from other anticancer medicines, delivered to the patient only with other medicines meant for the central nervous system, and given immediately after a time out and double check by two licensed practitioners or other approved licensed clinicians; and for a policy that intravenous vinca alkaloids are given only by infusion, for example minibags. It is not graded, it sets no minibag volume or infusion time, and no step on this page rests on it. No newer edition was found in Europe PMC or Crossref.",
    "The NPSA alert itself (PDF) and its supporting information were not read, only the summary page. The 50 mL volume and the 5 to 10 minute infusion come from the NHS Specialist Pharmacy Service's summary and from Scotland's CEL 22 (2009). Scotland's DL(2025)14 of 26 June 2025 calls CEL 21 (2009) extant and lists CEL 22 (2009) among its references without saying whether it has been revised.",
    "NHS England's National Patient Safety Alert on the transition to NRFit connectors and its Never Events list could not be read on 17 November 2026 (the site returned an empty response to a script). The page therefore gives the NRFit requirement as the NHS Specialist Pharmacy Service states it, does not name the ISO standard for the connector, and does not say how the current Never Events list words this error.",
    "This page does not set out what to do after a vinca alkaloid has been given intrathecally. No UK or ISMP source read here covers it. The US label describes the treatments that have been tried, including immediate removal of spinal fluid and flushing, and says they have not prevented ascending paralysis and death, with one reported case in which paralysis was arrested.",
    "The three worldwide counts (55 reports from WHO in 2007, more than 130 cases from ISMP in 2026, at least 13 UK patients from Scotland in 2009) come from different dates and definitions and cannot be combined. No source read gives a current UK count.",
    "No source read gives outcome data for the register or room separation; the safeguards rest on analysis of past fatal errors. Guidance for Wales and Northern Ireland was not read.",
  ],
});
