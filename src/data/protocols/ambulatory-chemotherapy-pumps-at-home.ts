import { protocol } from "./helpers";

/*
 * Starting, living with and disconnecting an ambulatory chemotherapy pump at home, typically an elastomeric or
 * electronic pump giving fluorouracil over about 46 hours through a port or PICC.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ISMP Canada, Fluorouracil Incident Root Cause Analysis (May 2007): full text, PDF from ismp-canada.org. Its tables
 *   are in columns that interleave in the extracted text, so only sentences that run unbroken are quoted.
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, read by
 *   the first protocol agent from the Internet Archive's capture of ascopubs.org (copy in /tmp/pf-chemo).
 * - Chefchaouni et al., failures of 5-FU elastomeric pumps (J Oncol Pharm Pract 2023, DOI 10.1177/10781552211060290):
 *   abstract only.
 * - Raphaelle et al., disconnection of 5-FU elastomeric pumps with a closed-system transfer device (J Vasc Access 2023,
 *   DOI 10.1177/11297298211044017): abstract only.
 * - Cardoso et al., 5-FU residues on elastomeric pumps (Toxics 2025, DOI 10.3390/toxics13050416): abstract only.
 * - Al Fartousi et al., patient self-disconnection of 5-FU pumps (Ann Pharm Fr 2026, DOI
 *   10.1016/j.pharma.2026.03.007): abstract only.
 * - INS Standards (2024) and ISOPP Standards (2022), which address ambulatory pumps and home handling: not reachable.
 *   No manufacturer's instructions for a specific pump were read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const ambulatoryChemotherapyPumpsAtHome = protocol({
  id: "ambulatory-chemotherapy-pumps-at-home",
  name: "Ambulatory chemotherapy pumps at home: set-up, checks, spills and disconnection",
  aka: ["chemo pump at home", "5-FU pump", "fluorouracil infusor", "elastomeric pump", "balloon pump", "46-hour infusion", "baby bottle pump", "CADD pump", "pump disconnection", "infusor"],
  domain: "chemotherapy-administration",
  tldr: "Some chemotherapy, such as fluorouracil for bowel cancer, runs for about two days from a small pump you carry home, connected to your port or PICC. The rate is set in the pharmacy or checked by two nurses before you leave. You will be told how to carry it, what to do if it leaks or the line comes apart, and who to call day or night.",
  simple: "You go home with a small pump giving your treatment slowly over a day or two. Know who to call, keep the spill kit handy, and phone if it leaks, comes apart or seems to be running too fast or too slow.",
  summary: "Home infusion pumps carry a particular hazard: a programming or calculation error delivers days of chemotherapy in hours. ISMP Canada's root cause analysis of a 2006 death, in which fluorouracil intended to run over 4 days ran over 4 hours, found that the order lacked the volume and rate to programme, the rate had to be calculated through several steps, the label carried a confusing 'mL/24 h' figure, the pump gave little feedback, and checks were not truly independent. Its recommendations: put the critical administration details (total volume, rate) in standard order sets; standardise volumes or concentrations so the calculation is built into the order; express rates only in mL per hour; use pumps with safeguards such as pharmacy-controlled rates (elastomeric pumps) or preset maximum rates; and embed independent double checks with documented calculations.\n\nASCO-ONS (2024) requires a second verification at preparation and a final check before administration that includes pump settings and rate, confirmation with the patient of the drug, infusion time and symptoms to report, and education on home handling: storage, waste, body fluids and spill clean-up. Elastomeric pumps fail too: in 205 incident reports from one pharmacy, 44% were leaks, 30% flow anomalies and 20% injection difficulties, and fluorouracil residue has been found around the catheter connection. A closed-system device reduced contamination at disconnection in a laboratory study, and a small pilot found patients could be trained to disconnect their own pump.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "home", "community", "aseptic-unit"],
  },
  population: "Adults receiving continuous infusional chemotherapy at home through an elastomeric or electronic ambulatory pump connected to a central line, most often fluorouracil-based regimens for gastrointestinal, head and neck and other cancers. Paediatric home infusion and subcutaneous syringe drivers for symptom control are not covered.",
  trigger: "A continuous infusion is to start in clinic and continue at home, or a home pump is due to be disconnected.",
  steps: [
    {
      action: "Write the total volume, duration and rate in mL per hour into the standard order, so no one has to work them out at the chair",
      why: "A fatal overdose happened when nurses had to calculate the rate from the dose themselves and made an error.",
      source: "ismp-canada-2007",
      quote: "Include critical information required for medication administration as part of standardized order sets in manual and electronic medication orders.",
    },
    {
      action: "Use a pump with a built-in safeguard where possible: an elastomeric pump with a fixed rate set in the pharmacy, or an electronic pump with preset limits",
      why: "If the rate cannot be programmed wrongly at the bedside, the error that killed a patient in 2006 cannot happen.",
      practice: "ISMP Canada recommends pumps with safeguards such as pharmacy-controlled rate delivery (elastomeric pumps) or preset maximum rates, but its recommendation tables are set in columns that the extracted text interleaves, so the sentence cannot be quoted verbatim.",
    },
    {
      action: "Have a second clinician independently check the pump, its programming or flow rate and the rate against the order before it is connected",
      why: "A truly independent check, done without being told the answer, catches calculation and programming slips.",
      source: "asco-ons-2024",
      quote: "Infusion pump (if applicable) settings, including rate",
    },
    {
      action: "Before starting, confirm with the person the drug, how long it should run, the route and the symptoms to report",
      why: "A person who knows the pump should run for about two days will notice if it empties in hours.",
      source: "asco-ons-2024",
      quote: "Before initiation of antineoplastic therapy, personnel approved by the health care organization who is administering the antineoplastic(s) confirms the therapy with the patient, including, at a minimum, the name of the drug, the infusion time, route of infusion, symptoms to report, for example: hypersensitivity symptoms or pain at infusion",
    },
    {
      action: "Teach safe handling at home: storage, waste, body fluids, and how to clean up a spill, with a spill kit and a 24-hour contact number",
      why: "Pumps can leak, and fluorouracil residue has been found around the connection.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Ask the person to call at once if the pump leaks, the line disconnects, or it seems to be emptying too fast or not at all",
      why: "Leaks and flow problems are the commonest pump failures.",
      source: "chefchaouni-2023",
      quote: "The main technical failures were: chemotherapy product leakage (44%), flow rate anomalies (30%) and injection difficulties (20%).",
    },
    {
      action: "At disconnection, wear protective gloves and treat the pump and tubing as hazardous waste; then flush and lock the line as for any access",
      why: "Drug residue on the pump and connection can expose nurses, patients and family.",
      source: "cardoso-2025",
      quote: "The detection of 5-FU residues highlights the critical need for safe handling practices and the consistent use of personal protective equipment (PPE) to protect healthcare workers, especially nursing staff involved in the removal of the infusion pumps, after treatment.",
    },
  ],
  bestInClass: {
    statement: "No graded guideline on home chemotherapy pumps could be read. The strongest open source is ISMP Canada's root cause analysis (2007): critical administration details in the standard order, standardised volumes or concentrations, rates in mL per hour only, pumps with rate safeguards, and truly independent double checks. ASCO-ONS (2024) adds verification of pump settings and rate before administration, confirmation with the patient of the infusion time, and home safe-handling education. Disconnection with a closed-system device and patient self-disconnection are promising but rest on small studies.",
    sources: ["ismp-canada-2007", "asco-ons-2024"],
  },
  variants: [
    {
      name: "Closed-system transfer device at the pump connection",
      differs: "Connects the pump line to the port needle through a closed-system device instead of a standard Luer lock or needle-free connector.",
      evidence: "In a laboratory study of 30 elastomeric pumps, overall 5-FU contamination at disconnection was significantly lower with the closed device (Qimono) than with Luer lock or a needle-free connector; wipes showed 43 to 61% less contamination.",
      sources: ["raphaelle-2023"],
    },
    {
      name: "Patient self-disconnection at home",
      differs: "Trains selected patients to disconnect their own pump and do basic line care instead of a nurse visit.",
      evidence: "A six-month pilot of nine patients reported time savings of 102 minutes per cycle for patients and 64 for home care nurses, with stable satisfaction. Too small to judge safety.",
      sources: ["al-fartousi-2026"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "ismp-canada-2007",
      label: "Fluorouracil Incident Root Cause Analysis",
      publisher: "Institute for Safe Medication Practices Canada",
      year: 2007,
      url: "https://www.ismp-canada.org/download/reports/FluorouracilIncidentMay2007.pdf",
      gradingScheme: "Root cause analysis; recommendations classed by strategy (eliminate, control, accept), not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and ONS (JCO Oncology Practice)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "chefchaouni-2023",
      label: "Retrospective analysis of failures of ambulatory elastomeric pumps containing 5-FU in a hospital pharmacy unit",
      publisher: "Journal of Oncology Pharmacy Practice (Chefchaouni et al.)",
      year: 2023,
      url: "https://doi.org/10.1177/10781552211060290",
      doi: "10.1177/10781552211060290",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "cardoso-2025",
      label: "Safeguarding Patients, Relatives, and Nurses: A Screening Approach for Detecting 5-FU Residues on Elastomeric Infusion Pumps Using HPLC-DAD",
      publisher: "Toxics (Cardoso et al.)",
      year: 2025,
      url: "https://doi.org/10.3390/toxics13050416",
      doi: "10.3390/toxics13050416",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "raphaelle-2023",
      label: "Safe disconnection of 5-fluorouracil elastomeric pumps: The benefit of a closed-system-transfer device designed for cytotoxic drug administration/perfusion",
      publisher: "Journal of Vascular Access",
      year: 2023,
      url: "https://doi.org/10.1177/11297298211044017",
      doi: "10.1177/11297298211044017",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "al-fartousi-2026",
      label: "Reducing staff workload through patient involvement in oncology: A pilot study on self-disconnection of 5-fluorouracil elastomeric pumps at home",
      publisher: "Annales Pharmaceutiques Françaises (Al Fartousi et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.pharma.2026.03.007",
      doi: "10.1016/j.pharma.2026.03.007",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["fluorouracil"],
  terms: ["chemotherapy-side-effects-pancreatic"],
  technologies: ["ambulatory-chemotherapy-pumps", "closed-system-transfer-devices", "implanted-ports", "picc-lines"],
  related: ["oral-anticancer-medicines-at-home", "hazardous-drug-handling-in-clinical-areas", "sact-administration-checks-at-the-chair"],
  upgrades: [],
  gaps: [
    "No graded guideline on ambulatory chemotherapy pumps could be read; the INS and ISOPP standards, which cover them, were not reachable.",
    "How temperature, height and position change the flow of elastomeric pumps, and what to tell patients about carrying them, comes from manufacturers' instructions, none of which were read.",
    "The ISMP Canada analysis dates from 2007; whether its recommendations (rates in mL per hour, rate-limited pumps) are now universal is not known.",
    "The disconnection and self-disconnection studies are a laboratory study and a nine-patient pilot, read as abstracts.",
  ],
});
