import { protocol } from "./helpers";

/*
 * Protecting staff who handle hazardous anticancer drugs where they are given: knowing which drugs are hazardous,
 * protective equipment, closed-system transfer devices, spills, waste, patients' body fluids, and staff who are
 * pregnant or trying to conceive.
 *
 * What was read, and how (all on 11 November 2026, raw text in a scratch directory):
 * - ASCO Safe Handling of Hazardous Drugs: ASCO Standards (Celano et al., J Clin Oncol 2019): full
 *   text, read from the Internet Archive's capture of ascopubs.org/doi/10.1200/JCO.18.01616 (29 June 2025), the
 *   publisher refusing a script. Its standards are consensus based and endorse USP chapter 800, OSHA, NIOSH and ONS.
 * - NIOSH Alert: Preventing Occupational Exposures to Antineoplastic and Other Hazardous Drugs in Health Care Settings
 *   (DHHS (NIOSH) Publication 2004-165): full text of the PDF, from the Internet Archive's capture of cdc.gov (cdc.gov
 *   refuses a script), read with pdftotext in reading order; "fi" and "fl" ligatures restored.
 * - NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (DHHS (NIOSH) Publication 2025-103, December 2024):
 *   full text of the PDF, same route. It no longer carries PPE tables; those moved to NIOSH's "Managing Hazardous Drug
 *   Exposures: Information for Healthcare Settings" (2023), which could not be retrieved and is not cited.
 * - HSE (UK), Safe handling of cytotoxic drugs in the workplace: full text of the web page.
 * - Cochrane review CD012860.pub2 (2018), closed-system drug-transfer devices plus safe handling versus safe handling
 *   alone: abstract (PMC6360647).
 * - ASCO-ONS administration safety standards (2024): full text; cited for labelling and patient education.
 * - USP General Chapter <800> and the ISOPP Standards for the Safe Handling of Cytotoxics (2022): not reachable (usp.org
 *   returned 403; ISOPP is behind a paywall). Named; nothing rests on them except where ASCO 2019 states what USP chapter 800
 *   requires.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence carries an inline reference, the quote
 * stops before it.
 */
export const hazardousDrugHandlingInClinicalAreas = protocol({
  id: "hazardous-drug-handling-in-clinical-areas",
  name: "Safe handling of hazardous anticancer drugs where they are given: protective equipment, closed systems, spills, waste and body fluids",
  aka: ["cytotoxic safe handling", "chemotherapy PPE", "chemo gloves", "chemotherapy gown", "USP 800", "closed-system transfer device", "CSTD", "chemotherapy spill", "cytotoxic spill kit", "cytotoxic waste", "hazardous drugs in healthcare", "NIOSH hazardous drug list"],
  domain: "hazardous-drug-safety",
  tldr: "Many cancer drugs harm the staff who handle them every day, even in tiny amounts. So nurses wear special gloves and gowns when giving them, use sealed connectors, and handle spills and waste in a set way. For a day or two after treatment some drug is in the patient's body fluids, so staff wear gloves for those too. The protection is for repeated exposure at work; you are not dangerous to be near.",
  simple: "Nurses wear gloves and gowns with chemotherapy because they handle it every day. It is about their repeated exposure, not about you being unsafe to touch or hug.",
  summary: "The US framework is NIOSH (the 2004 Alert and the 2024 hazardous drug list), USP chapter 800 and OSHA, which ASCO's consensus standards (2019) endorse; the UK framework is COSHH, applied by HSE, with a hierarchy of control: enclosed systems, control at source, then PPE. Employers should keep a facility-specific hazardous drug list, because the NIOSH list (2024, 25 drugs added and 7 removed since 2016) may not include newer drugs.\n\nNIOSH (2004) asks for double chemotherapy-tested gloves, a disposable gown with a closed front and closed cuffs, and goggles for all administration activities, from opening the outer bag to disposal; preparation belongs in a ventilated cabinet, tubing is primed with a non-drug fluid, and closed-system transfer devices (CSTDs) supplement but do not replace the cabinet. ASCO (2019) reports that USP chapter 800 requires CSTDs for administration and recommends them for compounding, while a Cochrane review (2018, 24 observational studies) found the evidence of benefit very low in certainty and drew no firm conclusions. Linen and excreta from patients treated within 48 hours (sometimes 7 days) are handled with two pairs of gloves and a gown. Spills follow written procedures with spill kits nearby; large spills need trained staff and a respirator, as surgical masks do not protect. ASCO asks for an alternative-duty policy for staff who are trying to conceive, pregnant or breastfeeding, and finds routine medical surveillance unsupported by evidence; HSE says monitoring is normally needed under COSHH where carcinogens are handled.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "pharmacist", "pharmacy-technician"],
    where: ["chemotherapy-day-unit", "ward", "aseptic-unit", "home"],
  },
  population: "Healthcare workers who receive, prepare, give or dispose of hazardous drugs, including most cytotoxic anticancer drugs and some hormonal and targeted drugs, and those who handle patients' body fluids and linen after treatment. Aseptic compounding in pharmacy has further requirements (USP chapter 800, ISOPP) not covered here. Guidance for patients and carers at home is a separate subject.",
  trigger: "A hazardous drug is received, prepared, given, spilled or disposed of, or a patient's body fluids are handled after treatment.",
  steps: [
    {
      action: "Keep a list of the hazardous drugs used in your own unit, starting from the NIOSH list and adding new drugs as they arrive",
      why: "New cancer drugs reach wards before national lists are updated.",
      source: "niosh-2024",
      quote: "Therefore, this list may not be all-inclusive, and employers should consider creating a facility-specific hazardous drug list.",
    },
    {
      action: "Assess the risk of each handling task and control exposure in order: enclosed systems first, control at source next, protective equipment last",
      why: "Protective equipment is the last line of defence; engineering controls protect everyone at once.",
      source: "hse-cytotoxics",
      quote: "Under COSHH, employers must assess the risks from handling cytotoxic drugs for employees and anyone else affected by this type of work, and take suitable precautions to protect them.",
    },
    {
      action: "Label hazardous drugs as hazardous when they are prepared",
      why: "Everyone who touches the bag later, including porters and cleaners, needs to know.",
      source: "asco-ons-2024",
      quote: "A label denoting HAZARDOUS DRUG, if applicable",
    },
    {
      action: "Prepare, crush or pour hazardous drugs only inside a ventilated cabinet; a closed-system device is an addition, not a substitute",
      why: "Opening vials and powders releases droplets and particles that a cabinet captures.",
      source: "niosh-2004",
      quote: "closed-system transfer device is not an acceptable substitute for a ventilated cabinet and should be used only within a ventilated cabinet.",
    },
    {
      action: "Wear double chemotherapy gloves, a protective gown and goggles for every step of giving the drug, from opening the outer bag to disposal",
      why: "Skin contact with contaminated bags, tubing and surfaces is the main route of exposure for nurses.",
      source: "niosh-2004",
      quote: "Wear PPE (including double gloves, goggles, and protective gowns) for all activities associated with drug administration—opening the outer bag, assembling the delivery system, delivering the drug to the patient, and disposing of all equipment used to administer drugs.",
    },
    {
      action: "Use gloves tested and labelled for chemotherapy, and gowns with a closed front, long sleeves and closed cuffs, disposed of after each use",
      why: "Ordinary gloves and cloth gowns let some drugs through.",
      source: "niosh-2004",
      quote: "Make sure gowns have closed fronts, long sleeves, and elastic or knit closed cuffs.",
    },
    {
      action: "Have tubing primed in pharmacy or with a non-drug fluid, never with the drug at the bedside",
      why: "Priming with the drug can spray it into the air or onto hands.",
      source: "niosh-2004",
      quote: "Have pharmacy personnel prime the IV tubing and syringes inside the ventilated cabinet, or prime them in-line with nondrug solutions—never in the patient’s room.",
    },
    {
      action: "Use closed-system transfer devices for administration where your standards require them",
      why: "They are designed to stop drug escaping when lines are connected and disconnected; whether they improve health is unproven.",
      source: "asco-2018",
      quote: "USP 800 requires use of CSTDs for nursing administration of hazardous drugs and recommends use for sterile product compounding of hazardous drugs.",
    },
    {
      action: "Wear two pairs of gloves and a gown to handle linen, urine or faeces from patients treated in the last 48 hours (for some drugs, 7 days)",
      why: "Some drugs leave the body unchanged in urine, stool, vomit and sweat for a day or more.",
      source: "niosh-2004",
      quote: "Wear two pairs of protective gloves and a disposable gown if you must handle linens, feces, or urine from patients who have received hazardous drugs within the last 48 hours—or in some cases, within the last 7 days",
    },
    {
      action: "Dispose of drug waste and contaminated equipment by the written local procedure for cytotoxic waste",
      why: "Waste bins are handled by many people who never see the drug.",
      source: "hse-cytotoxics",
      quote: "Procedures must be in place for the safe disposal of waste.",
    },
    {
      action: "Keep spill kits where drugs are handled and clean spills by the written procedure; leave large spills to trained staff",
      why: "A prepared response limits spread and exposure.",
      source: "niosh-2004",
      quote: "Manage hazardous drug spills according to the established, written policies and procedures for each workplace.",
    },
    {
      action: "For spills that can make airborne particles, use a fitted respirator; a surgical mask does not protect",
      why: "Surgical masks stop splashes to the mouth, not fine droplets or powder.",
      source: "niosh-2004",
      quote: "Surgical masks do not provide adequate protection.",
    },
    {
      action: "Offer alternative duties to staff who are trying to conceive, pregnant or breastfeeding, and tell staff about this when they are hired",
      why: "Exposure to some drugs has been linked to miscarriage in staff who handled them without protection.",
      source: "asco-2018",
      quote: "The health care setting has a policy that identifies potential alternative work options, where possible, for workers who are actively trying to conceive, are pregnant, or are breastfeeding.",
    },
    {
      action: "Report any exposure or health concern to occupational health when it happens",
      why: "Acute exposures, such as a spill on skin, need assessment and a record.",
      source: "asco-2018",
      quote: "Workers should be encouraged to report occupational health issues to employee health services at the time that they are experienced.",
    },
  ],
  bestInClass: {
    statement: "In the US, USP chapter 800 with NIOSH and OSHA, as endorsed by ASCO (2019): a facility hazardous drug list, ventilated-cabinet preparation, double chemotherapy gloves, impermeable gown and eye protection for administration, CSTDs for administration (required by USP chapter 800, according to ASCO), written spill and waste procedures, precautions with body fluids for 48 hours, and an alternative-duty policy. In the UK, COSHH as applied by HSE: risk assessment and a hierarchy of enclosure, control at source, then PPE. The sources differ on CSTDs (required by USP chapter 800; Cochrane 2018 found the evidence of benefit very low in certainty) and on monitoring (ASCO: routine medical surveillance has no supporting data; HSE: monitoring is normally necessary under COSHH where carcinogens are handled). USP chapter 800 and the ISOPP standards could not be read directly.",
    sources: ["asco-2018", "niosh-2004", "niosh-2024", "hse-cytotoxics", "cochrane-cstd-2018"],
  },
  variants: [
    {
      name: "Closed-system transfer devices for every hazardous drug connection",
      differs: "Uses a CSTD for all preparation and every connection and disconnection at the bedside, rather than standard needles and open connections with PPE.",
      evidence: "Cochrane (2018): 24 observational cluster studies, no randomised trials, all at serious risk of bias; very low certainty evidence was insufficient to show differences in staff urine tests or surface contamination, and no firm conclusions could be drawn. ASCO (2019) calls the literature low quality and notes no standard test of CSTD performance exists. USP chapter 800 requires them for administration (as reported by ASCO).",
      sources: ["cochrane-cstd-2018", "asco-2018"],
    },
    {
      name: "Routine medical surveillance of exposed staff",
      differs: "Regular health checks, blood counts or urine tests for staff who handle hazardous drugs.",
      evidence: "ASCO (2019) finds no data that routine surveillance improves outcomes and prefers a registry approach; HSE says monitoring is normally necessary under COSHH where there is potential exposure to carcinogens.",
      sources: ["asco-2018", "hse-cytotoxics"],
    },
  ],
  grades: [
    { claim: "ASCO endorses OSHA, USP chapter 800, the NIOSH 2004 Alert and ONS standards", grade: "Consensus-based standard", source: "asco-2018", quote: "The Expert Panel endorses a majority of the standards for safe handling of hazardous drugs as issued by the US Occupational Safety and Health Administration," },
    { claim: "Routine ongoing medical surveillance: role unclear", grade: "Consensus-based standard", source: "asco-2018", quote: "The role of routine ongoing medical surveillance programs that include medical screening, laboratory testing, or other biologic monitoring is unclear, because there are no published data to reliably inform a standard or best practice." },
    { claim: "CSTD plus safe handling versus safe handling alone", grade: "very low certainty (GRADE)", source: "cochrane-cstd-2018", quote: "Currently, no firm conclusions can be drawn on the effect of CSTD combined with safe handling versus safe handling alone due to very low certainty evidence available for the main outcomes." },
    { claim: "Order of control measures under COSHH", grade: "UK regulation (COSHH)", source: "hse-cytotoxics", quote: "Measures to control exposure should be applied in the following order: use totally enclosed systems where reasonably practicable control exposure at source, for example, by using adequate extraction systems and appropriate organisational measures issue personal protective equipment where adequate control cannot be achieved by other measures alone" },
  ],
  sources: [
    {
      key: "asco-2018",
      label: "Safe Handling of Hazardous Drugs: ASCO Standards",
      publisher: "ASCO (Journal of Clinical Oncology, Celano et al.)",
      year: 2019,
      url: "https://doi.org/10.1200/JCO.18.01616",
      doi: "10.1200/JCO.18.01616",
      gradingScheme: "Consensus-based standards developed by weighing benefits and harms, because the evidence base was limited; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "niosh-2004",
      label: "NIOSH Alert: Preventing Occupational Exposures to Antineoplastic and Other Hazardous Drugs in Health Care Settings (DHHS (NIOSH) Publication No. 2004-165)",
      publisher: "National Institute for Occupational Safety and Health (CDC)",
      year: 2004,
      url: "https://www.cdc.gov/niosh/docs/2004-165/pdfs/2004-165.pdf",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "niosh-2024",
      label: "NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (DHHS (NIOSH) Publication No. 2025-103)",
      publisher: "National Institute for Occupational Safety and Health (CDC)",
      year: 2024,
      url: "https://doi.org/10.26616/NIOSHPUB2025103",
      doi: "10.26616/NIOSHPUB2025103",
      gradingScheme: "Not graded; advisory.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "hse-cytotoxics",
      label: "Safe handling of cytotoxic drugs in the workplace",
      publisher: "Health and Safety Executive (UK)",
      year: 2026,
      url: "https://www.hse.gov.uk/healthservices/safe-use-cytotoxic-drugs.htm",
      gradingScheme: "Regulatory guidance under COSHH; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cochrane-cstd-2018",
      label: "Closed-system drug-transfer devices plus safe handling of hazardous drugs versus safe handling alone for reducing exposure to infusional hazardous drugs in healthcare staff",
      publisher: "Cochrane Database of Systematic Reviews (Gurusamy et al.)",
      year: 2018,
      url: "https://doi.org/10.1002/14651858.CD012860.pub2",
      doi: "10.1002/14651858.CD012860.pub2",
      gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.",
      read: "abstract",
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
      key: "usp-800",
      label: "USP General Chapter <800> Hazardous Drugs: Handling in Healthcare Settings",
      publisher: "United States Pharmacopeia",
      year: 2020,
      url: "https://www.usp.org/compounding/general-chapter-hazardous-drugs-handling-healthcare",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "isopp-2022",
      label: "ISOPP Standards for the Safe Handling of Cytotoxics",
      publisher: "International Society of Oncology Pharmacy Practitioners (Journal of Oncology Pharmacy Practice)",
      year: 2022,
      url: "https://doi.org/10.1177/10781552211070933",
      doi: "10.1177/10781552211070933",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["closed-system-transfer-devices", "pharmacy-automation", "cytotoxic-chemotherapy"],
  drugs: ["cyclophosphamide", "ifosfamide"],
  related: ["sact-administration-checks-at-the-chair"],
  upgrades: ["idea-upgrade-closed-system-transfer-device-outcome-trial"],
  gaps: [
    "USP chapter 800 (usp.org refused a script) and the ISOPP Standards for the Safe Handling of Cytotoxics (2022, paywalled) could not be read; what USP chapter 800 requires is stated here only as ASCO (2019) reports it.",
    "NIOSH moved its PPE-by-activity guidance from the hazardous drug list into 'Managing Hazardous Drug Exposures: Information for Healthcare Settings' (2023), which could not be retrieved; the PPE steps here come from the 2004 NIOSH Alert, which is older.",
    "No European Union or NHS-specific standard for chair-side PPE could be read; UK waste colour coding for cytotoxic waste is not stated by any source read.",
    "Whether CSTDs improve staff health is unknown: the Cochrane review found only observational studies at serious risk of bias.",
    "The 48-hour period for precautions with body fluids comes from a 1992 source cited by NIOSH; drug-specific excretion times are not given by any source read.",
    "Which newer agents (antibody-drug conjugates, some targeted tablets) count as hazardous depends on the NIOSH table and local assessment; the 2024 list was read but its drug tables are not reproduced here.",
  ],
});
