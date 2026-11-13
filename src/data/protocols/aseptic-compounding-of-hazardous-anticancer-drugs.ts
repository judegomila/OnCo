import { protocol } from "./helpers";

/*
 * Preparing (compounding) hazardous anticancer drugs in the pharmacy: containment, protective equipment, closed
 * systems, priming, cleaning and deactivation. Protecting staff where the drugs are given is a separate protocol
 * (hazardous-drug-handling-in-clinical-areas).
 *
 * What was read, and how (all on 11 November 2026; raw copies made by the first protocol agent in /tmp/pf-chemo):
 * - NIOSH Alert: Preventing Occupational Exposures to Antineoplastic and Other Hazardous Drugs in Health Care Settings
 *   (DHHS (NIOSH) Publication 2004-165): full text, PDF from the Internet Archive's capture of cdc.gov. The PDF is in two
 *   columns and the extracted text interleaves them in places; only sentences that run unbroken in the text are quoted.
 * - NIOSH List of Hazardous Drugs in Healthcare Settings, 2024 (Publication 2025-103): full text, same route.
 * - ASCO Safe Handling of Hazardous Drugs: ASCO Standards (Celano et al., J Clin Oncol 2019, DOI 10.1200/JCO.18.01616):
 *   full text, from the Internet Archive's capture of ascopubs.org. Consensus based; endorses USP 800, OSHA, NIOSH 2004
 *   and ONS.
 * - HSE (UK), Safe handling of cytotoxic drugs in the workplace: full text of the web page.
 * - Cochrane review CD012860.pub2 (2018), closed-system drug-transfer devices: abstract only.
 * - USP General Chapter <800> and the ISOPP Standards for the Safe Handling of Cytotoxics (2022): not reachable (usp.org
 *   refused a script; ISOPP is paywalled). UK aseptic unit standards (Quality Assurance of Aseptic Preparation
 *   Services) and the PIC/S guide to good preparation practice were not read.
 *
 * Quotes are copied from the raw text with line breaks joined only.
 */
export const asepticCompoundingOfHazardousAnticancerDrugs = protocol({
  id: "aseptic-compounding-of-hazardous-anticancer-drugs",
  name: "Aseptic compounding of hazardous anticancer drugs in the pharmacy",
  aka: ["chemotherapy compounding", "cytotoxic reconstitution", "aseptic preparation of chemotherapy", "chemotherapy isolator", "biological safety cabinet", "USP 800 compounding", "pharmacy chemotherapy preparation"],
  domain: "hazardous-drug-safety",
  tldr: "Cancer drugs given by drip or injection are usually made up in a hospital pharmacy, inside a sealed cabinet that protects both the drug from germs and the staff from the drug. Staff wear chemotherapy gloves and gowns, use sealed transfer devices, and prepare the drip lines in the cabinet so that nurses do not have to open the drug on the ward.",
  simple: "Your cancer drugs are made up in a special sealed cabinet in the pharmacy, by staff in protective gloves and gowns, so the drug stays clean and the staff stay safe.",
  summary: "Compounding hazardous drugs carries the highest exposure risk of any handling task. The NIOSH Alert (2004), endorsed by ASCO (2019) alongside USP chapter 800, OSHA and ONS, is the most detailed open standard. Drugs on the NIOSH list (2024 update) are prepared in a ventilated cabinet: where asepsis is needed, a Class II biological safety cabinet (type B2 preferred), a Class III cabinet or an aseptic containment isolator, exhausting filtered air outside where feasible. Staff wear double chemotherapy-tested gloves, changed every 30 minutes or when damaged, and a disposable, non-absorbent, closed-front gown with cuffs; the outer glove goes over the cuff. Closed-system transfer devices may reduce contamination but are not a substitute for a cabinet and are used inside one. Intravenous tubing is primed in the cabinet or in-line with drug-free fluid, never at the bedside. Work surfaces are cleaned with a deactivating agent where available and a cleaning agent before and after each activity and at the end of the shift, with protective gloves.\n\nThe evidence is weak throughout. ASCO's standards are consensus based; on external ventilation of cleanrooms it found no long-term clinical evidence and leaves it to institutions; on CSTDs it found low-quality evidence and called for a testing protocol. The Cochrane review (24 observational cluster studies, 359 hospitals, mostly PhaSeal) could draw no firm conclusions. In the UK, COSHH makes the employer responsible for assessing and controlling exposure, with monitoring where carcinogens are handled.",
  asOf: "2026-11-11",
  setting: {
    who: ["pharmacist", "pharmacy-technician"],
    where: ["aseptic-unit"],
  },
  population: "Pharmacy staff preparing injectable hazardous drugs, chiefly antineoplastics on the NIOSH list, in hospital aseptic units or compounding pharmacies. Oral and clinical-area handling are covered by the hazardous-drug handling and oral anticancer medicine protocols.",
  trigger: "A prescription for an injectable hazardous anticancer drug has been verified and is to be prepared.",
  steps: [
    {
      action: "Identify which drugs are hazardous using the current NIOSH list, and keep a facility-specific list",
      why: "Handling precautions only work if everyone knows which drugs need them, including new drugs not yet on the national list.",
      source: "niosh-2024",
      quote: "Therefore, this list may not be all-inclusive, and employers should consider creating a facility-specific hazardous drug list.",
    },
    {
      action: "Prepare hazardous drugs only inside a ventilated cabinet designed to contain them",
      why: "Opening vials and drawing up drug releases droplets and vapour that a cabinet captures.",
      source: "niosh-2004",
      quote: "Use a ventilated cabinet designed to reduce worker exposures while preparing hazardous drugs (see following section entitled Ventilated Cabinets).",
    },
    {
      action: "When the drug must stay sterile, use a cabinet designed for both containment and aseptic work: a Class II (type B2 preferred) or Class III biological safety cabinet or an aseptic containment isolator, exhausted outside where feasible",
      why: "The cabinet must protect the drug from germs and the staff from the drug at the same time.",
      source: "niosh-2004",
      quote: "Therefore, when asepsis is required or recommended, use ventilated cabinets designed for both hazardous drug containment and aseptic processing.",
    },
    {
      action: "Wear double chemotherapy-tested gloves and a protective gown while reconstituting and mixing",
      why: "Some drugs pass through ordinary gloves and fabric; tested gloves and a non-absorbent gown block them.",
      source: "niosh-2004",
      quote: "Wear PPE (including double gloves and protective gowns) while reconstituting and admixing drugs:",
    },
    {
      action: "Change gloves every 30 minutes, or at once if torn, punctured or contaminated",
      why: "Gloves become more permeable with time and damage.",
      source: "niosh-2004",
      quote: "Change gloves every 30 minutes or when torn, punctured, or contaminated.",
    },
    {
      action: "If closed-system transfer devices are used, use them inside the cabinet, never instead of it",
      why: "A closed device can cut leaks but has not been shown to replace the cabinet's protection.",
      source: "niosh-2004",
      quote: "Remember that a closed-system transfer device is not an acceptable substitute for a ventilated cabinet and should be used only within a ventilated cabinet.",
    },
    {
      action: "Prime the infusion tubing in the cabinet, or in-line with drug-free fluid, so it is never primed with drug at the bedside",
      why: "Priming with drug outside a cabinet sprays droplets where nurses and patients are.",
      source: "niosh-2004",
      quote: "Have pharmacy personnel prime the IV tubing and syringes inside the ventilated cabinet, or prime them in-line with nondrug solutions—never in the patient’s room.",
    },
    {
      action: "Clean work surfaces with a deactivating agent, where one is available, and a cleaning agent before and after each activity and at the end of the shift",
      why: "Drug residue on surfaces is a main route of staff exposure, and some residues need deactivating, not just wiping.",
      source: "niosh-2004",
      quote: "Clean work surfaces with an appropriate deactivation agent (if available) and cleaning agent before and after each activity and at the end of the work shift.",
    },
    {
      action: "Assess the risks under the applicable workplace law, control them, and monitor where needed",
      why: "Employers are legally responsible for keeping exposure as low as possible.",
      source: "hse-cytotoxics",
      quote: "Under COSHH, employers must assess the risks from handling cytotoxic drugs for employees and anyone else affected by this type of work, and take suitable precautions to protect them.",
    },
  ],
  bestInClass: {
    statement: "Prepare drugs on a current hazardous-drug list inside a ventilated cabinet suited to aseptic containment (Class II BSC, type B2 preferred, Class III BSC or aseptic containment isolator, externally exhausted where feasible), with double chemotherapy gloves changed every 30 minutes, a closed-front non-absorbent gown, CSTDs used only within the cabinet, priming in the cabinet or in-line with drug-free fluid, and deactivation and cleaning of surfaces before and after each task (NIOSH 2004, endorsed by ASCO 2019). USP chapter 800, which ASCO reports requires CSTDs for administration and recommends them for compounding, could not be read. The sources agree in direction but none is graded, and the evidence for CSTDs (Cochrane 2018, very low certainty) and external ventilation (ASCO 2019, no long-term clinical evidence) is weak.",
    sources: ["niosh-2004", "niosh-2024", "asco-2018", "cochrane-cstd-2018", "hse-cytotoxics"],
  },
  variants: [
    {
      name: "Closed-system transfer devices for all compounding (USP 800, as reported by ASCO)",
      differs: "Uses a CSTD for every transfer from vial to bag or syringe in compounding, rather than only where local risk assessment favours it.",
      evidence: "ASCO 2019 reports that USP 800 recommends CSTDs for sterile compounding and requires them for administration, and that some studies found fewer contaminated wipe samples after CSTDs were introduced, but rated the evidence low quality and called for a testing protocol. Cochrane 2018: very low certainty, no firm conclusions.",
      sources: ["asco-2018", "cochrane-cstd-2018"],
    },
    {
      name: "External ventilation of the cleanroom or segregated compounding area",
      differs: "Vents the room around the cabinet to the outside rather than recirculating its air through HEPA filters.",
      evidence: "ASCO 2019 found no long-term clinical evidence and leaves it to each institution as part of a suite of protective measures.",
      sources: ["asco-2018"],
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
  ],
  technologies: ["closed-system-transfer-devices", "pharmacy-automation"],
  related: ["hazardous-drug-handling-in-clinical-areas", "sact-prescribing-and-pharmacy-verification"],
  upgrades: [],
  gaps: [
    "USP General Chapter <800> and the ISOPP Standards (2022), the main current compounding standards, could not be read; the UK aseptic standards (QAAPS) and PIC/S guidance were not read.",
    "The NIOSH Alert dates from 2004; NIOSH moved its protective-equipment tables to a 2023 document that could not be retrieved.",
    "No source read sets a deactivating agent or method; NIOSH says 'if available'.",
    "Environmental wipe sampling and staff biological monitoring are recommended in some settings, but ASCO found the value of routine medical surveillance unclear.",
  ],
});
