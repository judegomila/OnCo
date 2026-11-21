import { protocol } from "./helpers";

/*
 * Protecting staff who handle hazardous anticancer drugs where they are given: knowing which drugs are hazardous,
 * protective equipment, closed-system transfer devices, spills, waste, patients' body fluids, and staff who are
 * pregnant or trying to conceive.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text and every quote checked by script (whitespace and line-end hyphenation only). What was read, and how:
 * - NIOSH Alert (DHHS (NIOSH) Publication 2004-165): full text of the PDF. cdc.gov and stacks.cdc.gov refused a script
 *   (403) and the Internet Archive answered 429, so the PDF was read from the University of North Texas government web
 *   archive's capture of the cdc.gov file (January 2009), with pdftotext.
 * - NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (Publication 2025-103): NOT readable on 17 November
 *   (cdc.gov 403, Internet Archive 429, UNT archive 503). Its title, number and contents are stated here from the
 *   Federal Register notice that announced it (89 FR 104163, 20 December 2024), read in full from govinfo.gov.
 * - NIOSH "Managing Hazardous Drug Exposures" (2023): still not retrievable (cdc.gov). The Federal Register notice
 *   announcing it (88 FR 25642, 27 April 2023) was read in full from govinfo.gov and is cited for what NIOSH says it
 *   changed in that document.
 * - OSHA, Controlling Occupational Exposure to Hazardous Drugs: full text of the osha.gov page.
 * - ONS Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology (2018): full text of the PDF on ons.org
 *   (the copy a sibling checker saved today is byte-identical to the one fetched here). Funded by a maker of
 *   closed-system devices; it reproduces the PPE table of the 2016 NIOSH list.
 * - European Commission, Guidance for the safe management of hazardous medicinal products at work (2023): full text of
 *   the PDF from osha.europa.eu.
 * - HSE (UK), Safe handling of cytotoxic drugs in the workplace: full text of the web page.
 * - Cochrane review CD012860.pub2 (2018): abstract, through NCBI E-utilities (PMC6360647; the publisher does not allow
 *   the full text there).
 * - ASCO-ONS administration safety standards (2024): full text, re-used from the copy a sibling checker saved today
 *   from the Oncology Nursing Forum PDF on ons.org.
 * - American Cancer Society, Chemotherapy Safety (revised 15 May 2025): full text, re-used from a sibling's copy saved
 *   today.
 * - ASCO Safe Handling of Hazardous Drugs: ASCO Standards (Celano et al., J Clin Oncol 2019): on 17 November only the
 *   abstract could be re-read (Europe PMC); ascopubs.org returned 403 and the Internet Archive 429. The full text was
 *   read on 11 November from an Internet Archive capture. Steps that rested on it now rest on sources read today; what
 *   still rests on the 11 November reading is listed in gaps.
 * - USP General Chapter <800> (usp.org 403) and the ISOPP Standards (2022, Sage 403): not reachable. What USP chapter
 *   800 requires is stated only as ONS, OSHA and ASCO report it.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence carries an inline reference, the quote
 * stops before it.
 */
export const hazardousDrugHandlingInClinicalAreas = protocol({
  id: "hazardous-drug-handling-in-clinical-areas",
  name: "Safe handling of hazardous anticancer drugs where they are given: protective equipment, closed systems, spills, waste and body fluids",
  aka: ["cytotoxic safe handling", "chemotherapy PPE", "chemo gloves", "chemotherapy gown", "USP 800", "closed-system transfer device", "CSTD", "chemotherapy spill", "cytotoxic spill kit", "cytotoxic waste", "hazardous drugs in healthcare", "NIOSH hazardous drug list"],
  domain: "hazardous-drug-safety",
  tldr: "Many cancer drugs can harm the staff who handle them day after day. So nurses wear tested gloves and gowns to give them, use sealed connectors, and handle spills and waste in a set way. For at least two days after a dose (longer for some drugs) some drug is in body fluids, so staff wear gloves for those too. This is about repeated exposure at work; you can usually be around family and friends.",
  simple: "Nurses wear gloves and gowns with chemotherapy because they handle it every day. It is about their repeated exposure at work. You can usually be around family and friends as normal.",
  summary: "The US framework is NIOSH (the 2004 Alert, the 2024 hazardous drug list and a 2023 guide to managing exposures), OSHA and USP chapter 800; ASCO's standards (2019) endorse the OSHA, USP and ONS practices with clarifications. The 2024 NIOSH list added 25 drugs and removed 7 since 2016, but its review covered drugs approved or given new safety warnings between January 2014 and December 2015, and NIOSH says its Table 1 and Table 2 are not a ranking of hazard, so NIOSH asks employers to review newer drugs themselves. The UK framework is COSHH, applied by HSE: enclosed systems, control at source, then PPE. The European Commission's guidance (2023) is non-binding.\n\nFor administration NIOSH (2004) asks for double gloves, a protective gown and goggles, from opening the outer bag to disposal. Gloves should be tested to ASTM D6978 and changed after 30 minutes or when damaged or contaminated (ONS 2018; NIOSH 2004 gives the same 30 minutes); gowns are disposable, closed at the front and cuffs, and changed after a spill, on leaving the area or after two to three hours (ONS). The 2016 NIOSH table that ONS reproduces asks for eye and face protection where liquid could splash and a respirator where the drug could be inhaled; the European guidance says single gloves are normally enough for administration. Preparation belongs in a ventilated cabinet. ONS (2018) reports that USP chapter 800 requires closed-system transfer devices (CSTDs) for administration when the dosage form allows and recommends them for compounding; a Cochrane review (2018, 24 observational studies, mainly of pharmacy staff) could draw no firm conclusions on their effect.\n\nExcreta and linen are handled with two pairs of gloves and a gown for 48 hours after a dose, in some cases 7 days (NIOSH 2004, OSHA, ONS); the European guidance says generally up to 7 to 14 days. Spills follow written procedures with spill kits to hand; surgical masks do not protect. ONS asks employers to offer alternative duties, if available, to staff who are trying to conceive, pregnant or breastfeeding. NIOSH, OSHA, ONS and the European guidance recommend medical surveillance of exposed staff; ASCO (2019) calls its role unclear for lack of published data.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "pharmacist", "pharmacy-technician"],
    where: ["chemotherapy-day-unit", "ward", "aseptic-unit", "home"],
  },
  population: "Healthcare workers who receive, prepare, give or dispose of hazardous drugs, including most cytotoxic anticancer drugs and some hormonal and targeted drugs, and those who handle patients' body fluids and linen after treatment. Aseptic compounding in pharmacy has further requirements (USP chapter 800, ISOPP) not covered here. Guidance for patients and carers at home is a separate subject.",
  trigger: "A hazardous drug is received, prepared, given, spilled or disposed of, or a patient's body fluids are handled after treatment.",
  steps: [
    {
      action: "Keep a list of the hazardous drugs used in your own unit, starting from the NIOSH list, and review the hazard information for each new drug as it arrives",
      why: "NIOSH says a delay between a drug's approval and its review for the list is unavoidable; the 2024 list reviewed drugs approved or given new warnings from January 2014 to December 2015.",
      source: "ons-toolkit-2018",
      quote: "ONS recommends that every institution develop and maintain a comprehensive, practice-specific list of HDs used in that setting, as well as an ongoing process for drug evaluation through current literature, product information, and safety data sheets.",
    },
    {
      action: "Assess the risk of each handling task and control exposure in order: enclosed systems first, control at source next, protective equipment last",
      why: "HSE says protective equipment is for where other measures alone cannot give adequate control.",
      source: "hse-cytotoxics",
      quote: "Under COSHH, employers must assess the risks from handling cytotoxic drugs for employees and anyone else affected by this type of work, and take suitable precautions to protect them.",
    },
    {
      action: "Label hazardous drugs as hazardous when they are prepared",
      why: "The label tells whoever handles the drug next that these precautions apply.",
      source: "asco-ons-2024",
      quote: "A label denoting HAZARDOUS DRUG, if applicable",
    },
    {
      action: "Prepare, crush or pour hazardous drugs only inside a ventilated cabinet; a closed-system device is an addition, not a substitute",
      why: "NIOSH says the cabinet is designed to stop the drug being released into the work area, and that other devices do not replace it.",
      source: "niosh-2004",
      quote: "closed-system transfer device is not an acceptable substitute for a ventilated cabinet and should be used only within a ventilated cabinet.",
    },
    {
      action: "Wear double chemotherapy gloves, a protective gown and goggles for every step of giving the drug, from opening the outer bag to disposal",
      why: "NIOSH says breathing the drug in and contact with the skin are the most likely routes of exposure.",
      source: "niosh-2004",
      quote: "Wear PPE (including double gloves, goggles, and protective gowns) for all activities associated with drug administration—opening the outer bag, assembling the delivery system, delivering the drug to the patient, and disposing of all equipment used to administer drugs.",
    },
    {
      action: "Use gloves tested for chemotherapy drugs to ASTM standard D6978",
      why: "The standard tests how well a glove resists chemotherapy drugs passing through it; ONS does not recommend polyvinyl chloride gloves.",
      source: "ons-toolkit-2018",
      quote: "Chemotherapy gloves (as tested to American Society for Testing and Materials International (ASTM) standard D6978, or its successor) should be used for all HDs",
    },
    {
      action: "Wear a disposable gown with a closed front, long sleeves and elastic or knit closed cuffs, and dispose of it after each use",
      why: "NIOSH says coated gowns protect better than plain polypropylene ones against many anticancer drugs; ONS says not to use cloth coats, scrubs or isolation gowns.",
      source: "niosh-2004",
      quote: "Make sure gowns have closed fronts, long sleeves, and elastic or knit closed cuffs.",
    },
    {
      action: "Change gloves after 30 minutes of wear, or at once if damaged or contaminated; change the gown on leaving the handling area, after a spill or splash, or after two to three hours of continuous use",
      why: "NIOSH (2004) gives the same 30 minutes for gloves; ONS also says never to reuse disposable gloves or gowns.",
      source: "ons-toolkit-2018",
      quote: "Change gloves after 30 minutes of wear, if damaged, or contaminated",
    },
    {
      action: "Where liquid could splash, wear goggles with side shields or a face shield, not eyeglasses alone; where the drug could be breathed in, wear a fit-tested respirator",
      why: "The NIOSH table that ONS reproduces ties eye, face and breathing protection to the risk of splashing or inhalation; N95 respirators do not protect against gases and vapours.",
      source: "ons-toolkit-2018",
      quote: "Do not use eyeglasses as your sole means of eye protection; use goggles with side shields or a face shield when splashing is a possibility",
    },
    {
      action: "Have tubing primed by pharmacy staff inside the ventilated cabinet, or prime it in-line with a non-drug fluid; never prime it in the patient's room",
      why: "NIOSH lists priming the set with a drug-containing solution at the bedside among the activities that can expose staff.",
      source: "niosh-2004",
      quote: "Have pharmacy personnel prime the IV tubing and syringes inside the ventilated cabinet, or prime them in-line with nondrug solutions—never in the patient’s room.",
    },
    {
      action: "Use closed-system transfer devices for administration when the dosage form allows and your standards require them, and keep wearing protective equipment",
      why: "They are designed to stop drug escaping at connections; ONS says they do not take the place of protective equipment, and whether they improve staff health is unproven.",
      source: "ons-toolkit-2018",
      quote: "USP <800> recommends that CSTDs are used when compounding. CSTDs are required for use in administration when the dosage form allows.",
    },
    {
      action: "Wear two pairs of gloves and a gown to handle linen, urine or faeces from patients treated in the last 48 hours (for some drugs, 7 days)",
      why: "ONS says most drugs are excreted in body fluids within 48 hours, and some are present in urine and stool for up to 7 days.",
      source: "niosh-2004",
      quote: "Wear two pairs of protective gloves and a disposable gown if you must handle linens, feces, or urine from patients who have received hazardous drugs within the last 48 hours—or in some cases, within the last 7 days",
    },
    {
      action: "Dispose of drug waste and contaminated equipment by your workplace's procedure for cytotoxic waste",
      why: "HSE says all relevant staff should be familiar with the waste procedures.",
      source: "hse-cytotoxics",
      quote: "Procedures must be in place for the safe disposal of waste.",
    },
    {
      action: "Keep spill kits where drugs are handled and clean spills by the written procedure; leave large spills to staff trained in handling hazardous materials",
      why: "NIOSH says the size of a spill may decide who is authorised to clean it up and how.",
      source: "niosh-2004",
      quote: "Manage hazardous drug spills according to the established, written policies and procedures for each workplace.",
    },
    {
      action: "For spill cleanup, put on double gloves, a gown, and respiratory and face protection before starting",
      why: "ONS says even a small spill is a source of exposure, and that only staff trained in spill management and respirator use should clean one up.",
      source: "ons-toolkit-2018",
      quote: "All individuals involved with the spill cleanup must don HD-tested PPE, including double gloves, gown, and respiratory and face protection.",
    },
    {
      action: "Contain the spill with plastic-backed absorbent sheets or pads, clean from the least to the most contaminated area, rinse with water, and seal everything used in a hazardous drug waste bag",
      why: "Working inwards stops the spilled drug spreading to clean areas.",
      source: "ons-toolkit-2018",
      quote: "Contain the spill using plastic-backed absorbent sheets or spill pads.",
    },
    {
      action: "Use a NIOSH-certified respirator with fit-testing where a respirator is needed; do not rely on a surgical mask",
      why: "NIOSH says a surgical mask does not offer respiratory protection.",
      source: "niosh-2004",
      quote: "Surgical masks do not provide adequate protection.",
    },
    {
      action: "Identify alternative duties, tell staff about them, and offer them to staff who say they are trying to conceive, pregnant or breastfeeding",
      why: "Studies have linked handling these drugs at work with miscarriage and other reproductive harm, and ONS says protective equipment lowers the risk without removing it.",
      source: "ons-toolkit-2018",
      quote: "Upon notification that a staff member has a medical reason to avoid exposure to HDs, employers should give those staff the option of alternative duties, if available.",
    },
    {
      action: "Have anyone exposed during a spill, or with drug on the skin or in the eyes, assessed straight away, and record what happened",
      why: "An acute exposure needs assessment and a record; ONS asks for documentation of how each spill happened and was managed.",
      source: "ons-toolkit-2018",
      quote: "Personnel who are potentially exposed during the spill or spill clean up or who have direct skin or eye contact with HDs require immediate evaluation.",
    },
  ],
  bestInClass: {
    statement: "In the US, USP chapter 800 with NIOSH and OSHA, which ASCO (2019) endorses with clarifications: a facility hazardous drug list, ventilated-cabinet preparation, double gloves tested to ASTM D6978, a disposable closed gown and eye protection for administration, CSTDs for administration when the dosage form allows (a USP chapter 800 requirement as ONS reports it), written spill and waste procedures with spill kits, precautions with body fluids for at least 48 hours, and alternative duties for staff who are trying to conceive, pregnant or breastfeeding. In the UK, COSHH as applied by HSE: risk assessment and a hierarchy of enclosure, control at source, then PPE. The sources differ on four points. Gloves for administration: double (NIOSH, ONS) or normally single (European Commission 2023). Eye protection: for all administration (NIOSH 2004) or where liquid could splash (the 2016 NIOSH table in ONS 2018; by risk assessment in the European guidance). Body fluids: 48 hours, sometimes 7 days (NIOSH, OSHA, ONS) or generally 7 to 14 days (European Commission). Medical surveillance: recommended by NIOSH, OSHA, ONS and the European guidance; role unclear according to ASCO. On CSTDs, Cochrane (2018) found the evidence very low in certainty. USP chapter 800 and the ISOPP standards could not be read directly.",
    sources: ["niosh-2004", "niosh-fr-2024", "osha-hazardous-drugs", "ons-toolkit-2018", "asco-2018", "hse-cytotoxics", "eu-hmp-guidance-2023", "cochrane-cstd-2018"],
  },
  variants: [
    {
      name: "Closed-system transfer devices for every hazardous drug connection",
      differs: "Uses a CSTD for all preparation and every connection and disconnection at the bedside, rather than standard needles and open connections with PPE.",
      evidence: "Cochrane (2018): 24 observational cluster studies, no randomised trials, all at serious risk of bias and mainly of pharmacists and pharmacy technicians; very low certainty evidence was insufficient to show differences in staff urine tests or surface contamination, none reported health outcomes, and no firm conclusions could be drawn. ONS (2018, a toolkit funded by a CSTD maker) reports that USP chapter 800 requires CSTDs for administration when the dosage form allows and recommends them for compounding; OSHA words the same point as 'should be used'. The European Commission guidance (2023) notes differing information on their effectiveness in preparation and leaves the decision to management under the risk assessment. NIOSH (2004) says a CSTD never replaces a ventilated cabinet.",
      sources: ["cochrane-cstd-2018", "ons-toolkit-2018", "osha-hazardous-drugs", "eu-hmp-guidance-2023", "niosh-2004"],
    },
    {
      name: "Routine medical surveillance of exposed staff",
      differs: "A baseline health assessment, then regular health checks, symptom review and tests such as blood counts for staff who handle hazardous drugs, with an exit examination.",
      evidence: "NIOSH (2004) says to make medical surveillance an important part of any safe handling programme; OSHA says exposed workers should be monitored in a medical surveillance programme; ONS (2018) and the European Commission guidance (2023) describe baseline, regular and end-of-employment surveillance. ASCO (2019) says the role of routine surveillance is unclear because no published data reliably inform a standard. HSE says that under COSHH monitoring of exposure is normally necessary where there is potential exposure to carcinogens, and lists health surveillance among the services an occupational health service can provide where appropriate.",
      sources: ["niosh-2004", "osha-hazardous-drugs", "ons-toolkit-2018", "eu-hmp-guidance-2023", "asco-2018", "hse-cytotoxics"],
    },
    {
      name: "European Commission guidance: protective equipment set by risk assessment",
      differs: "For giving the drug, single gloves tested to EN ISO 374-1 (at least type B) are normally sufficient; a gown is added where the infusion bag has no physical barrier or dripping cannot be avoided, and a face shield or goggles if the risk assessment indicates. Excreta and blood are treated as contaminated generally for 7 to 14 days after a dose, rather than 48 hours.",
      evidence: "Non-binding guidance of the European Commission (2023), not graded. It says double gloving can be used to stop contamination spreading between areas, for example in clean rooms.",
      sources: ["eu-hmp-guidance-2023"],
    },
    {
      name: "Eye protection only where splashing is possible",
      differs: "Goggles or a face shield are worn when liquid could splash or the patient may vomit, rather than for every administration; for intact tablets and capsules one pair of chemotherapy gloves is used with no other PPE unless there is a risk of vomiting.",
      evidence: "The PPE table of the 2016 NIOSH list, as reproduced by ONS (2018). NIOSH has since moved this table into its 2023 guide to managing exposures, which could not be read. The NIOSH Alert (2004) lists goggles among the PPE for all administration activities.",
      sources: ["ons-toolkit-2018", "niosh-2004"],
    },
  ],
  grades: [
    { claim: "ASCO endorses the OSHA, USP chapter 800 and ONS best practices, with clarifications in four areas", grade: "Not graded (ASCO standard)", source: "asco-2018", quote: "The ASCO Expert Panel endorses the best practices for safe handling of hazardous drugs as issued by the Occupational Safety and Health Administration, US Pharmacopeia Chapter 800, and Oncology Nursing Society with clarifications in four key areas: medical surveillance, closed system transfer devices, external ventilation of containment secondary engineering controls or containment segregated compounding areas, and alternative duties." },
    { claim: "Routine ongoing medical surveillance: role unclear (ASCO; quote from the full text as read on 11 November 2026, not re-readable on 17 November)", grade: "Not graded (ASCO standard)", source: "asco-2018", quote: "The role of routine ongoing medical surveillance programs that include medical screening, laboratory testing, or other biologic monitoring is unclear, because there are no published data to reliably inform a standard or best practice." },
    { claim: "Medical surveillance as part of a safe handling programme (NIOSH)", grade: "Not graded (NIOSH recommendation)", source: "niosh-2004", quote: "In addition to preventing exposure to hazardous drugs and carefully monitoring the environment, make medical surveillance an important part of any safe handling program for hazardous drugs." },
    { claim: "CSTD plus safe handling versus safe handling alone", grade: "very low certainty (GRADE)", source: "cochrane-cstd-2018", quote: "Currently, no firm conclusions can be drawn on the effect of CSTD combined with safe handling versus safe handling alone due to very low certainty evidence available for the main outcomes." },
    { claim: "Order of control measures under COSHH", grade: "UK regulation (COSHH)", source: "hse-cytotoxics", quote: "Measures to control exposure should be applied in the following order: use totally enclosed systems where reasonably practicable control exposure at source, for example, by using adequate extraction systems and appropriate organisational measures issue personal protective equipment where adequate control cannot be achieved by other measures alone" },
    { claim: "How long excreta and blood are treated as contaminated (European Commission)", grade: "Not graded (non-binding guidance)", source: "eu-hmp-guidance-2023", quote: "Excreta (urine, faeces, vomit and sweat) and blood should be treated as contaminated with HMPs during the time HMPs are being taken by the patient and generally up to 7-14 days after administration." },
    { claim: "Gloves for giving the drug (European Commission)", grade: "Not graded (non-binding guidance)", source: "eu-hmp-guidance-2023", quote: "For protection in administration procedures (oral, IV or injections) normally single protective gloves B are sufficient." },
    { claim: "PPE for excreta in the 48 hours after a dose (OSHA)", grade: "Not graded (OSHA guidance)", source: "osha-hazardous-drugs", quote: "All personnel responsible for handling excreta, including urine, emesis, or feces, from patients who have received HDs in the last 48 hours must wear personal protective equipment as described in the PPE section." },
    { claim: "New drugs not yet reviewed for the NIOSH list", grade: "Not graded (NIOSH notice)", source: "niosh-fr-2024", quote: "In this update, 25 drugs have been added to the List since the publication of the NIOSH List of Antineoplastics and Other Hazardous Drugs, 2016." },
    { claim: "Being around other people during chemotherapy (patient information)", grade: "Not graded (patient information)", source: "acs-chemo-safety", quote: "Unless your care team tells you differently, you can usually be around family and friends while you're getting chemo." },
  ],
  sources: [
    {
      key: "asco-2018",
      label: "Safe Handling of Hazardous Drugs: ASCO Standards",
      publisher: "ASCO (Journal of Clinical Oncology, Celano et al.)",
      year: 2019,
      url: "https://doi.org/10.1200/JCO.18.01616",
      doi: "10.1200/JCO.18.01616",
      gradingScheme: "ASCO standards; not graded. Only the abstract could be re-read on 17 November 2026; the full text was read on 11 November 2026.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "niosh-2004",
      label: "NIOSH Alert: Preventing Occupational Exposures to Antineoplastic and Other Hazardous Drugs in Health Care Settings (DHHS (NIOSH) Publication No. 2004-165)",
      publisher: "National Institute for Occupational Safety and Health (CDC)",
      year: 2004,
      url: "https://web.archive.org/web/20260213035938/https://www.cdc.gov/niosh/docs/2004-165/pdfs/2004-165.pdf",
      gradingScheme: "Not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "niosh-2024",
      label: "NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (DHHS (NIOSH) Publication No. 2025-103)",
      publisher: "National Institute for Occupational Safety and Health (CDC)",
      year: 2024,
      url: "https://doi.org/10.26616/NIOSHPUB2025103",
      doi: "10.26616/NIOSHPUB2025103",
      gradingScheme: "Not graded; advisory.",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "niosh-fr-2024",
      label: "Hazardous Drugs: NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 and Final Reevaluation Determinations for Liraglutide and Pertuzumab (Federal Register notice, 89 FR 104163, 20 December 2024)",
      publisher: "Centers for Disease Control and Prevention (NIOSH), Federal Register",
      year: 2024,
      url: "https://www.federalregister.gov/documents/2024/12/20/2024-30456/hazardous-drugs-niosh-list-of-hazardous-drugs-in-healthcare-settings-2024-and-final-reevaluation",
      gradingScheme: "Federal notice announcing the list and answering public comments; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "niosh-fr-2023",
      label: "Hazardous Drugs: Procedures for Developing the NIOSH List of Hazardous Drugs in Healthcare Settings and Managing Hazardous Drug Exposures: Information for Healthcare Settings (Federal Register notice, 88 FR 25642, 27 April 2023)",
      publisher: "Centers for Disease Control and Prevention (NIOSH), Federal Register",
      year: 2023,
      url: "https://www.federalregister.gov/documents/2023/04/27/2023-08900/hazardous-drugs-procedures-for-developing-the-niosh-list-of-hazardous-drugs-in-healthcare-settings",
      gradingScheme: "Federal notice announcing the two documents and answering public comments; not graded. The documents themselves could not be read.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "osha-hazardous-drugs",
      label: "Controlling Occupational Exposure to Hazardous Drugs",
      publisher: "Occupational Safety and Health Administration (US Department of Labor)",
      year: 2016,
      url: "https://www.osha.gov/hazardous-drugs/controlling-occex",
      gradingScheme: "Federal guidance; not graded. The page prints no revision date; ONS (2018) lists it as 2016.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ons-toolkit-2018",
      label: "Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology",
      publisher: "Oncology Nursing Society",
      year: 2018,
      url: "https://www.ons.org/sites/default/files/2018-06/ONS_Safe_Handling_Toolkit_0.pdf",
      gradingScheme: "Nursing toolkit; not graded. Funded by Equashield, a maker of closed-system transfer devices; ONS states it is solely responsible for the content. Its PPE table is taken from the 2016 NIOSH list.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eu-hmp-guidance-2023",
      label: "Guidance for the safe management of hazardous medicinal products at work (second edition)",
      publisher: "European Commission, Directorate-General for Employment, Social Affairs and Inclusion",
      year: 2023,
      url: "https://osha.europa.eu/en/publications/guidance-safe-management-hazardous-medicinal-products-work",
      doi: "10.2767/361444",
      gradingScheme: "Non-binding guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hse-cytotoxics",
      label: "Safe handling of cytotoxic drugs in the workplace",
      publisher: "Health and Safety Executive (UK)",
      year: 2026,
      url: "https://www.hse.gov.uk/healthservices/safe-use-cytotoxic-drugs.htm",
      gradingScheme: "Regulatory guidance under COSHH; not graded. The page prints no publication date; the year is the year it was read.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice; Oncology Nursing Forum)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acs-chemo-safety",
      label: "Chemotherapy Safety",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/chemotherapy-safety.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "usp-800",
      label: "USP General Chapter <800> Hazardous Drugs: Handling in Healthcare Settings",
      publisher: "United States Pharmacopeia",
      year: 2020,
      url: "https://www.usp.org/compounding/general-chapter-hazardous-drugs-handling-healthcare",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "isopp-2022",
      label: "ISOPP Standards for the Safe Handling of Cytotoxics",
      publisher: "International Society of Oncology Pharmacy Practitioners (Journal of Oncology Pharmacy Practice)",
      year: 2022,
      url: "https://doi.org/10.1177/10781552211070933",
      doi: "10.1177/10781552211070933",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["closed-system-transfer-devices", "pharmacy-automation", "cytotoxic-chemotherapy"],
  drugs: ["cyclophosphamide", "ifosfamide"],
  related: ["sact-administration-checks-at-the-chair"],
  upgrades: ["idea-upgrade-closed-system-transfer-device-outcome-trial"],
  gaps: [
    "USP chapter 800 sits behind a login and usp.org refused a script again on 17 November 2026, so nothing here was checked against the chapter itself. Resting only on what others report of it: that CSTDs are required for administration when the dosage form allows and recommended for compounding (ONS 2018 and, as read on 11 November, ASCO 2019; OSHA words it as 'should be used'), and its dates (OSHA: published 1 February 2016; ONS: enforcement date 1 December 2019; NIOSH: revised in June 2020 so that its rules for antineoplastic drugs apply only to those in Table 1 of the NIOSH list). Whether there is a later revision, and the chapter's own figures for changing gloves and gowns, could not be checked.",
    "On 17 November 2026 the full text of the ASCO standards (2019) could not be re-read (ascopubs.org returned 403, the Internet Archive 429); only the abstract was. Resting on the 11 November reading alone: the quoted ASCO sentence on medical surveillance. The steps on CSTDs, alternative duties and reporting exposure, which had quoted ASCO, now quote ONS (2018). Europe PMC and Crossref show no later ASCO edition.",
    "On 17 November 2026 the 2024 NIOSH list itself could not be re-read (cdc.gov 403, Internet Archive 429); what is said about it here comes from the Federal Register notice that announced it, and its drug tables are not reproduced. Which newer agents (antibody-drug conjugates, some targeted tablets) count as hazardous depends on that list and on local assessment.",
    "NIOSH moved its PPE-by-activity table from the hazardous drug list into 'Managing Hazardous Drug Exposures: Information for Healthcare Settings' (2023), which could not be retrieved. The PPE steps here come from the 2004 NIOSH Alert and from the ONS toolkit (2018), which reproduces the 2016 table; both are older than the current NIOSH guide. The 2023 Federal Register notice says NIOSH revised the table so that gloves are ASTM rated and gowns impervious and single use, and added 'when dosage form allows' wherever a CSTD is recommended.",
    "The ISOPP Standards for the Safe Handling of Cytotoxics (2022) are the current ISOPP edition according to Crossref and Europe PMC, and could not be read (the publisher returned 403 on 17 November 2026). The ONS handbook Safe Handling of Hazardous Drugs is a priced book and was not read; the free ONS toolkit (2018) cites its third edition (2017).",
    "No NHS-specific standard for chair-side PPE could be read; UK waste colour coding for cytotoxic waste is not stated by any source read. HSE's page gives the legal duties but no glove standard, change interval or time limit for body fluids.",
    "Whether CSTDs improve staff health is unknown: the Cochrane review found only observational studies at serious risk of bias, none reporting health outcomes.",
    "The 48-hour period for precautions with body fluids comes from a 1992 source cited by NIOSH (2004) and is repeated by OSHA and ONS; the European Commission guidance says generally 7 to 14 days. Drug-specific excretion times are not given by any source read.",
  ],
});
