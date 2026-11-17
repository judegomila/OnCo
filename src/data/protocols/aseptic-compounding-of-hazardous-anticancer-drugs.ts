import { protocol } from "./helpers";

/*
 * Preparing (compounding) hazardous anticancer drugs in the pharmacy: containment, protective equipment, closed
 * systems, priming, cleaning and deactivation. Protecting staff where the drugs are given is a separate protocol
 * (hazardous-drug-handling-in-clinical-areas).
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext) and every quote checked by script (whitespace and line-end hyphenation only). Several texts
 * are the copies the checker of hazardous-drug-handling-in-clinical-areas saved the same day; they are marked
 * "re-used". What was read, and how:
 * - NIOSH Alert (DHHS (NIOSH) Publication 2004-165): full text of the PDF, re-used. cdc.gov refused a script (403) and
 *   the Internet Archive answered 429, so the copy is the University of North Texas government web archive's capture
 *   of the cdc.gov file. The PDF is in two columns and the extracted text interleaves them in places; only sentences
 *   that run unbroken in the text are quoted.
 * - NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (Publication 2025-103): NOT readable on 17 November
 *   (cdc.gov 403, Internet Archive 429). The step that quoted it now quotes the 2004 Alert. Its title and DOI resolve
 *   in Crossref.
 * - NIOSH "Managing Hazardous Drug Exposures: Information for Healthcare Settings" (2023): cdc.gov returned 403.
 * - OSHA, Controlling Occupational Exposure to Hazardous Drugs: full text of the osha.gov page, re-used. It is the
 *   source here for what USP chapter 800 says, in the 2016 text OSHA cites.
 * - HSE and MHRA, Handling cytotoxic drugs in isolators in NHS pharmacies (MS37, 2015): full text of the PDF on
 *   hse.gov.uk. New on this pass.
 * - Quality Assurance of Aseptic Preparation Services: Standards, Part A, fifth edition (2016): full text of the PDF
 *   on rcpharm.org. New on this pass. The Royal College of Pharmacy page says a sixth edition is due in late autumn
 *   2026; it was not out on 17 November. Part B (the handbook) is a priced book and was not read.
 * - EU GMP Annex 1, Manufacture of Sterile Medicinal Products (22 August 2022): full text of the PDF on
 *   health.ec.europa.eu. New on this pass.
 * - MHRA Guidance for Specials Manufacturers (Revision 2, January 2021): full text of the PDF on gov.uk. New on this
 *   pass.
 * - European Commission, Guidance for the safe management of hazardous medicinal products at work (second edition,
 *   2023): full text of the PDF from osha.europa.eu, re-used. Its columns interleave in the extracted text, so it is
 *   not quoted.
 * - ONS Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology (2018): full text of the PDF on ons.org,
 *   re-used; cited only for how it reports USP chapter 800 on closed-system devices.
 * - HSE (UK), Safe handling of cytotoxic drugs in the workplace: full text of the web page, re-used.
 * - Cochrane review CD012860.pub2 (2018): abstract, through NCBI E-utilities (PMC6360647), re-used.
 * - ASCO Safe Handling of Hazardous Drugs: ASCO Standards (Celano et al., J Clin Oncol 2019): on 17 November only the
 *   abstract could be re-read (Europe PMC); ascopubs.org returned a bot check and the Internet Archive 429. Claims
 *   that rested on the full text as read on 11 November have been taken off the page and are named in gaps.
 * - USP General Chapters <797> and <800> (behind a login; usp.org also refused a script) and the ISOPP Standards
 *   (2022; the publisher returned a bot check): not read. Nothing here was checked against them.
 *
 * Quotes are copied from the raw text with line breaks joined only.
 */
export const asepticCompoundingOfHazardousAnticancerDrugs = protocol({
  id: "aseptic-compounding-of-hazardous-anticancer-drugs",
  name: "Aseptic compounding of hazardous anticancer drugs in the pharmacy",
  aka: ["chemotherapy compounding", "cytotoxic reconstitution", "aseptic preparation of chemotherapy", "chemotherapy isolator", "biological safety cabinet", "USP 800 compounding", "pharmacy chemotherapy preparation"],
  domain: "hazardous-drug-safety",
  tldr: "Cancer drugs given by drip or injection are usually made up in a hospital pharmacy, inside a ventilated cabinet or an isolator (an enclosed glove box). It keeps germs out of the drug and keeps the drug away from staff. Staff wear two pairs of chemotherapy gloves and a gown, and prepare the drip line in the cabinet so that it is not filled with drug at the bedside.",
  simple: "Your cancer drugs are made up in a special ventilated cabinet in the pharmacy, by staff in protective gloves and gowns, so the drug stays clean and the staff stay safe.",
  summary: "Sterile hazardous drugs are prepared inside a ventilated cabinet built for both containment and asepsis. The NIOSH Alert (2004) is the most detailed open standard read: a Class II biological safety cabinet (type B2 preferred, types A2 and B1 allowed under certain conditions), a Class III cabinet or an aseptic containment isolator, with HEPA-filtered exhaust and, where feasible, all of the filtered air exhausted outside. NIOSH asks for double gloves labelled as chemotherapy gloves, changed every 30 minutes or when torn, punctured or contaminated, and a disposable, non-absorbent gown with a closed front, long sleeves and closed cuffs, with the outer glove over the cuff. It says to consider closed-system transfer devices (CSTDs), which are not a substitute for a cabinet and are used only inside one; to prime tubing in the cabinet or in-line with drug-free fluid, never in the patient's room; and to clean work surfaces with a deactivating agent, if one is available, and a cleaning agent before and after each activity and at the end of the shift. OSHA reports that advice on changing gloves varies from 30 to 60 minutes.\n\nUSP chapter 800 sits behind a login and was not read. OSHA, reporting its 2016 text, describes an externally vented ISO Class 5 cabinet or isolator inside an externally vented ISO Class 7 buffer room with 30 air changes an hour and a negative pressure of 0.01 to 0.03 inches of water column, and surfaces that are deactivated, decontaminated and cleaned, then disinfected.\n\nUK guidance centres on isolators. HSE and MHRA (MS37, 2015) say either a positive or a negative pressure isolator can be used, chosen by documented risk assessment and leak tested, with clean inner gloves changed every 30 minutes. The NHS standards (QAAPS, fifth edition, 2016) prefer isolators to Class II cabinets and say isolators for cytotoxics should run at negative pressure or be designed to maximise operator protection, should be totally exhausted outside, and should have surfaces monitored for drug residue at least annually; unlicensed units give an expiry of no more than one week. Under COSHH the employer must assess the risks and take suitable precautions, and monitoring is normally necessary where staff could be exposed to carcinogens.\n\nThe evidence is weak. No source read grades its recommendations. ASCO (2019) found no studies of health outcomes for the measures it examined, and the Cochrane review of CSTDs (24 observational cluster studies, 359 hospitals, mostly PhaSeal) could draw no firm conclusions.",
  asOf: "2026-11-17",
  setting: {
    who: ["pharmacist", "pharmacy-technician"],
    where: ["aseptic-unit"],
  },
  population: "Pharmacy staff preparing sterile (injectable) hazardous drugs, chiefly antineoplastics, in hospital aseptic units or compounding pharmacies. The NIOSH and OSHA sources are written for the United States, the HSE, MHRA and QAAPS sources for the United Kingdom. Oral and clinical-area handling are covered by the hazardous-drug handling and oral anticancer medicine protocols.",
  trigger: "A prescription for an injectable hazardous anticancer drug has been verified and is to be prepared.",
  steps: [
    {
      action: "Identify which drugs are hazardous from the NIOSH list, and keep a list for your own organisation",
      why: "The precautions apply to the drugs on the list, and NIOSH asks that newly bought drugs are judged against the organisation's own criteria and added if they are hazardous. The current NIOSH list is the 2024 one; it could not be re-read for this page, so the quoted sentence is from the 2004 Alert.",
      source: "niosh-2004",
      quote: "In addition to using the list of hazardous drugs presented here, each organization should create its own list of drugs considered to be hazardous.",
    },
    {
      action: "Prepare hazardous drugs only inside a ventilated cabinet designed to contain them",
      why: "Staff can be exposed when aerosols or dust are created, for example when a powdered drug is dissolved or air is expelled from a syringe. The cabinet is designed to stop the drug reaching the room.",
      source: "niosh-2004",
      quote: "Use a ventilated cabinet designed to reduce worker exposures while preparing hazardous drugs (see following section entitled Ventilated Cabinets).",
    },
    {
      action: "When the drug must stay sterile, use a cabinet designed for both containment and aseptic work: a Class II biological safety cabinet (type B2 preferred; types A2 and B1 allowed under certain conditions), a Class III cabinet or an aseptic containment isolator, with all of its filtered air exhausted outside where feasible",
      why: "The cabinet must protect the drug from germs and the staff from the drug at the same time. NIOSH says not to use one that recirculates air or returns it to the room unless the drugs in use will not evaporate.",
      source: "niosh-2004",
      quote: "Therefore, when asepsis is required or recommended, use ventilated cabinets designed for both hazardous drug containment and aseptic processing.",
    },
    {
      action: "Where an isolator is used (the UK position), choose positive or negative pressure by documented risk assessment, and leak test it regularly",
      why: "HSE and MHRA say they cannot stipulate which type to choose: a leak from a positive pressure isolator can carry drug into the room, and a leak into a negative pressure isolator can carry bacteria onto the product. Their guidance asks for a pressure decay test daily at first, then weekly once the isolator has proved stable.",
      source: "hse-ms37",
      quote: "Factors affecting worker health and drug protection should be fully taken into account by means of documented risk assessment, failure modes and human error analysis, together with rigorous change control.",
    },
    {
      action: "Wear two pairs of gloves labelled as chemotherapy gloves and a disposable protective gown while reconstituting and mixing, with the outer glove over the gown cuff",
      why: "Skin contact is one of the most likely routes of exposure. NIOSH says gowns of polyethylene-coated polypropylene, which does not absorb, protect better than plain polypropylene against many of these drugs.",
      source: "niosh-2004",
      quote: "Wear PPE (including double gloves and protective gowns) while reconstituting and admixing drugs:",
    },
    {
      action: "Change gloves every 30 minutes, or at once if torn, punctured or contaminated",
      why: "A damaged or contaminated glove can bring the drug into contact with the skin. NIOSH sets the 30 minutes without giving its reasoning; HSE and MHRA give the same interval for the inner gloves worn inside isolator gloves, and OSHA reports that recommendations vary from 30 to 60 minutes.",
      source: "niosh-2004",
      quote: "Change gloves every 30 minutes or when torn, punctured, or contaminated.",
    },
    {
      action: "If closed-system transfer devices are used, use them inside the cabinet, never instead of it",
      why: "NIOSH says closed systems limit aerosols and may reduce exposure, but does not accept them as a replacement for the cabinet, and asks for the same protective equipment and work practices when one is used.",
      source: "niosh-2004",
      quote: "Remember that a closed-system transfer device is not an acceptable substitute for a ventilated cabinet and should be used only within a ventilated cabinet.",
    },
    {
      action: "Prime the infusion tubing in the cabinet, or in-line with drug-free fluid, so it is never primed with drug in the patient's room",
      why: "NIOSH lists priming a drip set with drug solution at the bedside among the activities that can expose staff, and says it should be done in the pharmacy.",
      source: "niosh-2004",
      quote: "Have pharmacy personnel prime the IV tubing and syringes inside the ventilated cabinet, or prime them in-line with nondrug solutions—never in the patient’s room.",
    },
    {
      action: "Clean work surfaces with a deactivating agent, where one is available, and a cleaning agent before and after each activity and at the end of the shift",
      why: "Studies using wipe samples have found drug residue on work surfaces to be common and widespread, which makes skin contact likely. OSHA adds that no single process deactivates every drug and that alcohol disinfects but does not deactivate.",
      source: "niosh-2004",
      quote: "Clean work surfaces with an appropriate deactivation agent (if available) and cleaning agent before and after each activity and at the end of the work shift.",
    },
    {
      action: "Test surfaces for drug residue routinely, at least once a year in NHS aseptic units, and follow the trend",
      why: "Wipe testing shows whether cleaning is removing the drug. The NHS standards say the sites tested should be those thought to carry the highest risk, and that if residues persist, extra cleaning or a different product should be considered promptly.",
      source: "qaaps-2016",
      quote: "Surface monitoring for residues (in particular, hazardous materials such as cytotoxic agents) should be routinely undertaken (minimum annually) and trending carried out.",
    },
    {
      action: "In an unlicensed UK aseptic unit, give the product the shortest practical expiry, and never more than one week",
      why: "A short time between preparation and use lowers the risk that any germs multiply or that the drug degrades. The one-week limit is one of the conditions for preparing these products without an MHRA licence.",
      source: "qaaps-2016",
      quote: "For unlicensed units, the expiry period allocated should not exceed one week (MCA 1992).",
    },
    {
      action: "Assess the risks under the applicable workplace law, control them, and monitor where needed",
      why: "In the UK, COSHH makes the employer responsible for seeing that exposure by every route is prevented or adequately controlled.",
      source: "hse-cytotoxics",
      quote: "Under COSHH, employers must assess the risks from handling cytotoxic drugs for employees and anyone else affected by this type of work, and take suitable precautions to protect them.",
    },
  ],
  bestInClass: {
    statement: "Prepare drugs on a current hazardous-drug list inside a ventilated cabinet suited to aseptic containment (a Class II biological safety cabinet, type B2 preferred, a Class III cabinet or an aseptic containment isolator, with filtered air exhausted outside where feasible), with double chemotherapy gloves changed every 30 minutes, a closed-front non-absorbent gown, CSTDs used only within the cabinet, priming in the cabinet or in-line with drug-free fluid, and deactivation and cleaning of surfaces before and after each task (NIOSH 2004). In the UK the choice between a positive and a negative pressure isolator is made by documented risk assessment (HSE and MHRA 2015), and the NHS standards add residue monitoring at least annually and an expiry of no more than one week in unlicensed units (QAAPS 2016). USP chapter 800 and the ISOPP standards, the specialist standards for hazardous drugs, could not be read; OSHA's report of the 2016 text of chapter 800 agrees with NIOSH on the type of cabinet and adds figures for the room. The sources agree in direction but none is graded, and the evidence for CSTDs is of very low certainty (Cochrane 2018).",
    sources: ["niosh-2004", "hse-ms37", "qaaps-2016", "osha-hazardous-drugs", "cochrane-cstd-2018", "hse-cytotoxics"],
  },
  variants: [
    {
      name: "United States: USP chapter 800, as OSHA reports its 2016 text",
      differs: "Sets figures for the room as well as the cabinet. The cabinet (containment primary engineering control) gives ISO Class 5 air or better and is externally vented: a Class II or III biological safety cabinet or a compounding aseptic containment isolator. It sits either in an ISO Class 7 buffer room with an ante-room (preferred), externally vented, with 30 air changes an hour and a negative pressure of 0.01 to 0.03 inches of water column to adjacent areas, or in an unclassified containment segregated compounding area, externally vented, with 12 air changes an hour at the same negative pressure and a limited beyond-use date as described in USP chapter 797. Surfaces and reusable equipment are deactivated, decontaminated and cleaned, and sterile compounding areas then disinfected.",
      evidence: "Every figure here is OSHA's account of the chapter as published on 1 February 2016, written with 'should'; the chapter itself is behind a login and was not read, so later revisions may differ. OSHA says Class II types A2, B1 and B2 are all acceptable under the chapter and that type B2 is typically reserved for volatile components, where NIOSH 2004 prefers B2. OSHA also reports that gloves should be tested to ASTM standard D6978 and, under USP chapter 797, be sterile for sterile compounding, and that cabinets should be certified every six months.",
      sources: ["osha-hazardous-drugs", "usp-800", "niosh-2004"],
    },
    {
      name: "United Kingdom: isolators at positive or negative pressure",
      differs: "Does not require negative pressure. HSE and MHRA accept either type of isolator if the choice is risk assessed, say a minimum of 40 air changes an hour is normally required in the isolator, that negative pressure isolators tend to run between -100 and -300 pascals in a room at the minimum for controlled areas (15 pascals), and that a Grade D room is usually expected. QAAPS says the critical zones of isolators for hazardous products should operate at negative pressure to the background or be designed to maximise operator protection while protecting the product, and should be totally exhausted to the outside; it prefers isolators to Class II cabinets.",
      evidence: "HSE and MHRA cite an HSE study of two pharmacy units, one with each type, that found no significant difference in operator exposure, and call it a limited study. EU GMP Annex 1 (2022) says negative pressure isolators should only be used when containment of the product is considered essential, with a background of at least Grade D for a closed isolator. MHRA's guidance for licensed specials manufacturers recommends dedicated equipment for cytotoxics and, where equipment is shared, a risk assessment of cross contamination. QAAPS was written against the 2015 EU GMP text, before the 2022 Annex 1.",
      sources: ["hse-ms37", "qaaps-2016", "eu-gmp-annex-1-2022", "mhra-specials-2021"],
    },
    {
      name: "Closed-system transfer devices for compounding",
      differs: "The sources differ on how firmly to ask for a CSTD at each transfer from vial to bag or syringe. NIOSH 2004 says to consider them. OSHA reports that USP chapter 800 says they should be used when compounding and when administering, when the dosage form allows; ONS (2018) reports the same chapter as recommending them for compounding and requiring them for administration. The European Commission guidance (2023) leaves the decision to management and staff, following the risk assessment.",
      evidence: "Cochrane 2018: very low certainty, no firm conclusions; all 24 studies at serious risk of bias and none reporting health outcomes. OSHA says some CSTDs have been shown to reduce surface contamination, that there is no performance standard by which all are evaluated, and that performance claims should be evaluated carefully. The European Commission guidance says the literature differs on their effectiveness in preparation. ASCO (2019) names CSTDs as one of four areas where it clarified the standards it endorsed.",
      sources: ["niosh-2004", "osha-hazardous-drugs", "ons-toolkit-2018", "eu-hmp-guidance-2023", "cochrane-cstd-2018", "asco-2018"],
    },
    {
      name: "External ventilation of the cleanroom or segregated compounding area",
      differs: "Vents the room around the cabinet to the outside. OSHA reports that USP chapter 800 says the room should be externally vented. The European Commission guidance (2023) lists external ventilation of preparation rooms among the technical measures to consider in the risk assessment.",
      evidence: "ASCO (2019) names external ventilation as one of four areas where it clarified the standards it endorsed, and reports that its search found no studies of health outcomes for the measures it examined. Its detailed position could not be re-read on 17 November 2026 (see gaps).",
      sources: ["osha-hazardous-drugs", "eu-hmp-guidance-2023", "asco-2018"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "niosh-2004",
      label: "NIOSH Alert: Preventing Occupational Exposures to Antineoplastic and Other Hazardous Drugs in Health Care Settings (DHHS (NIOSH) Publication No. 2004-165)",
      publisher: "National Institute for Occupational Safety and Health (CDC)",
      year: 2004,
      url: "https://www.cdc.gov/niosh/docs/2004-165/pdfs/2004-165.pdf",
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
      key: "osha-hazardous-drugs",
      label: "Controlling Occupational Exposure to Hazardous Drugs",
      publisher: "Occupational Safety and Health Administration (US Department of Labor)",
      year: 2016,
      url: "https://www.osha.gov/hazardous-drugs/controlling-occex",
      gradingScheme: "Federal guidance; not graded. The page prints no revision date; its latest citations of USP chapter 800 are to the 2016 text.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hse-ms37",
      label: "Handling cytotoxic drugs in isolators in NHS pharmacies (MS37)",
      publisher: "Health and Safety Executive and Medicines and Healthcare products Regulatory Agency (UK)",
      year: 2015,
      url: "https://www.hse.gov.uk/pubns/ms37.pdf",
      gradingScheme: "Joint regulatory guidance; not graded. Following it is not compulsory.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "qaaps-2016",
      label: "Quality Assurance of Aseptic Preparation Services: Standards, Part A (fifth edition)",
      publisher: "Royal Pharmaceutical Society (now the Royal College of Pharmacy) and the NHS Pharmaceutical Quality Assurance Committee (ed. Beaney)",
      year: 2016,
      url: "https://www.rcpharm.org/professional-standards/quality-assurance-of-aseptic-preparation-services/",
      gradingScheme: "Professional standards for unlicensed aseptic preparation in the UK; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eu-gmp-annex-1-2022",
      label: "EU Guidelines for Good Manufacturing Practice, Annex 1: Manufacture of Sterile Medicinal Products (C(2022) 5938 final, 22 August 2022)",
      publisher: "European Commission (EudraLex Volume 4)",
      year: 2022,
      url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en",
      gradingScheme: "Regulatory guideline; not graded. Came into operation on 25 August 2023.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mhra-specials-2021",
      label: "MHRA Guidance for Specials Manufacturers (Revision 2, January 2021)",
      publisher: "Medicines and Healthcare products Regulatory Agency (UK)",
      year: 2021,
      url: "https://www.gov.uk/government/publications/guidance-for-specials-manufacturers",
      gradingScheme: "Regulator's interpretation of good manufacturing practice for holders of a manufacturing specials licence; not graded.",
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
      key: "ons-toolkit-2018",
      label: "Toolkit for Safe Handling of Hazardous Drugs for Nurses in Oncology",
      publisher: "Oncology Nursing Society",
      year: 2018,
      url: "https://www.ons.org/sites/default/files/2018-06/ONS_Safe_Handling_Toolkit_0.pdf",
      gradingScheme: "Nursing toolkit; not graded. Funded by Equashield, a maker of closed-system transfer devices; ONS states it is solely responsible for the content.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-2018",
      label: "Safe Handling of Hazardous Drugs: ASCO Standards",
      publisher: "ASCO (Journal of Clinical Oncology, Celano et al.)",
      year: 2019,
      url: "https://doi.org/10.1200/JCO.18.01616",
      doi: "10.1200/JCO.18.01616",
      gradingScheme: "Standards reached by an expert panel after a systematic review that found no studies of health outcomes; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "hse-cytotoxics",
      label: "Safe handling of cytotoxic drugs in the workplace",
      publisher: "Health and Safety Executive (UK)",
      year: 2026,
      url: "https://www.hse.gov.uk/healthservices/safe-use-cytotoxic-drugs.htm",
      gradingScheme: "Regulatory guidance under COSHH; not graded.",
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
      key: "usp-800",
      label: "USP General Chapter <800> Hazardous Drugs: Handling in Healthcare Settings",
      publisher: "United States Pharmacopeia",
      year: 2016,
      url: "https://www.usp.org/compounding/general-chapter-hazardous-drugs-handling-healthcare",
      gradingScheme: "Compendial standard; not graded. The year is that of first publication as OSHA gives it; the edition now official was not confirmed.",
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
  technologies: ["closed-system-transfer-devices", "pharmacy-automation"],
  related: ["hazardous-drug-handling-in-clinical-areas", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "USP General Chapters 797 and 800 sit behind a login and usp.org refused a script on 17 November 2026, so nothing here was checked against either chapter. Resting only on what OSHA reports of the 2016 text of chapter 800: the ISO classes, the 30 and 12 air changes an hour, the 0.01 to 0.03 inches of water column, the limited beyond-use date in a segregated area, the four cleaning steps, the ASTM D6978 gloves and the wording on CSTDs. The dates on which the current chapters became official, whether they have been revised since the text OSHA cites, and the chapter's own intervals for wipe sampling and for changing gloves and gowns could not be confirmed from any source read.",
    "On 17 November 2026 the full text of the ASCO standards (2019) could not be re-read (the publisher returned a bot check, the Internet Archive 429); only the abstract was. Statements in the first version of this page that rested on the full text have been taken out: that ASCO endorses the 2004 NIOSH Alert (the abstract names OSHA, USP chapter 800 and ONS), that it found no long-term clinical evidence for external ventilation and leaves it to institutions, and that it rated the evidence for CSTDs as low quality and called for a testing protocol. Europe PMC and Crossref show no later ASCO edition.",
    "On 17 November 2026 the 2024 NIOSH list (Publication 2025-103) could not be re-read (cdc.gov 403, Internet Archive 429), so the step on identifying hazardous drugs quotes the 2004 Alert instead. The NIOSH Alert dates from 2004; NIOSH's 2023 document 'Managing Hazardous Drug Exposures: Information for Healthcare Settings', which carries its current protective-equipment table, could not be retrieved either.",
    "The ISOPP Standards for the Safe Handling of Cytotoxics (2022) are the latest ISOPP edition in Crossref and Europe PMC and could not be read (the publisher returned a bot check on 17 November 2026). The PIC/S guide to good preparation practice was not read.",
    "The UK standards (QAAPS) are the fifth edition of 2016. On 17 November 2026 the Royal College of Pharmacy's page said a sixth edition of Part A is to be published in late autumn 2026 and that its public consultation was due to start soon; the UK steps here will need re-reading against it. Part B, the handbook, is a priced book and was not read. The fifth edition cites the 2015 EU GMP text, not the 2022 Annex 1.",
    "No source read sets one deactivating agent or method. NIOSH says 'if available'; OSHA says no single process has been found to deactivate all hazardous drugs, reports some success with systems using sodium hypochlorite, detergent and a thiosulfate neutraliser, and says alcohol does not deactivate these drugs.",
    "How often to test surfaces is not agreed. QAAPS says at least annually and the European Commission guidance at least once a year; HSE and MHRA say only that surface wipe sampling should be considered. No source read sets a legally binding limit for residue on a surface.",
    "No source read sets a standard for checking the dose by weight (gravimetric) or by volume. QAAPS asks for pre-process and in-process checks to be defined and recorded for each product type, including the drug, concentration and volume measured where vials are shared, without naming a method.",
    "Staff biological monitoring is described by HSE and MHRA as optional, needing consultation and informed consent. ASCO lists medical surveillance among the four areas it clarified; its position could not be re-read.",
  ],
});
