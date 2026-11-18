import { protocol } from "./helpers";

/*
 * Starting, living with and disconnecting an ambulatory chemotherapy pump at home, typically an elastomeric or
 * electronic pump giving fluorouracil over about 46 hours through a central line.
 *
 * First pass, 11 November 2026: the sources below were fetched raw and read as text.
 *
 * Second accuracy pass, 17 November 2026. What was re-read, and how (all fetched raw and read as text):
 * - ISMP Canada, Fluorouracil Incident Root Cause Analysis (full report, May 2007): NOT readable today. The PDF at
 *   ismp-canada.org answered 502 twice and the Internet Archive answered 429 to the single request made. Nothing on
 *   the page now rests on it.
 * - ISMP Canada Safety Bulletin, volume 7, number 4 (20 August 2007), "Fluorouracil Incident Root Cause Analysis:
 *   Follow-Up": full text, PDF from ismpcanada.ca, pdftotext. It is ISMP Canada's own four-page overview of the report's
 *   causes and recommendations. Every ISMP statement on the page was re-checked against it and reworded to it, and
 *   both ISMP quotes are its sentences (its first recommendation runs across a page break, so the sentence after it
 *   is quoted instead).
 * - ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024, DOI 10.1200/OP.24.00216): full text, re-read
 *   in the Oncology Nursing Society's co-publication (Oncology Nursing Forum 51(4), advance-print PDF from ons.org),
 *   re-using the copy a sibling checker fetched on 17 November 2026. ascopubs.org refuses a script.
 * - Cardoso et al., 5-FU residues on elastomeric pumps (Toxics 2025, DOI 10.3390/toxics13050416): now full text, open
 *   access, PubMed Central PMC12116019 through the Europe PMC REST service.
 * - Chefchaouni et al. (J Oncol Pharm Pract 2023, DOI 10.1177/10781552211060290), Raphaelle et al. (J Vasc Access
 *   2023, DOI 10.1177/11297298211044017) and Al Fartousi et al. (Ann Pharm Fr 2026, DOI 10.1016/j.pharma.2026.03.007):
 *   abstracts only, from Europe PMC; none has an open copy.
 * - Cancer Research UK, "Chemotherapy pumps" (last reviewed 16 May 2024): the page, fetched with curl and stripped of
 *   tags. Added as the source for what a patient is told to do about a problem with the pump.
 * - INS Standards (2024) and ISOPP Standards (2022), which address ambulatory pumps and home handling: not readable
 *   (both refuse a script). No manufacturer's instructions for a specific pump were read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes were checked by script and are copied with
 * line breaks joined only.
 */
export const ambulatoryChemotherapyPumpsAtHome = protocol({
  id: "ambulatory-chemotherapy-pumps-at-home",
  name: "Ambulatory chemotherapy pumps at home: set-up, checks, spills and disconnection",
  aka: ["chemo pump at home", "5-FU pump", "fluorouracil infusor", "elastomeric pump", "balloon pump", "46-hour infusion", "baby bottle pump", "CADD pump", "pump disconnection", "infusor"],
  domain: "chemotherapy-administration",
  tldr: "Some chemotherapy, such as fluorouracil for bowel cancer, runs for about two days from a small pump you carry home, connected to your central line. Before it starts, two clinicians check the drug, the rate and the pump's settings with you. Your nurse shows you how to look after it. Contact your chemotherapy nurse with any problem; you may be given a kit to use if the pump leaks.",
  simple: "You go home with a small pump giving your treatment slowly, often over about two days. Your nurse shows you how to look after it. Contact your chemotherapy nurse if you have any problem with it, such as a leak.",
  summary: "Home infusion pumps carry a particular hazard: a programming or calculation error can deliver days of chemotherapy in hours. ISMP Canada was invited in 2006 to analyse a death in which fluorouracil intended to run over 4 days ran over 4 hours (the rate was entered as 28.8 mL/h instead of 1.2 mL/h). Among the causes it listed: the information needed to guide administration was not in the medication order, programming relied on a complex calculation at the bedside, the pharmacy label carried unnecessary information such as an 'mL/24 h' figure that allowed false confirmation, the pump had no programming safeguards and gave little feedback, and there was no process to ensure truly independent double checks. Its recommendations, offered for consideration: include the critical administration details (for example total volume and rate of infusion) in standardised order sets together with the critical calculations; refer to rates as mL per hour, not mL per 24 hours; use pumps with safeguards such as controlled-rate delivery (elastomeric pumps, or pumps with preset maximum rates) until smart pumps are available for ambulatory use; build a structured, documented process for independent double checks; and review the pump's data-input screens when teaching the patient.\n\nThe ASCO-ONS standards (2024, United States) require four verifications. The third, by at least two licensed clinicians independently, covers the rate of administration; the fourth, in the presence of the patient, covers the rate and duration of infusion, the administration set and the pump's settings. Staff confirm with the patient the drug, the infusion time, the route and the symptoms to report, and education covers safe handling at home: storage, waste, body secretions, unused medicine and cleaning up spills. Elastomeric pumps fail too: in 205 incident reports from one hospital pharmacy in Rabat, 44% were leaks, 30% flow rate anomalies and 20% injection difficulties. In ten used pumps sampled in one Portuguese hospital, fluorouracil residue was found at the catheter connection of all but two, and none on the casing or tubing. A closed-system device reduced contamination at disconnection in a laboratory study, and a nine-patient pilot found that self-disconnection by trained patients seems feasible.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "home", "community", "aseptic-unit"],
  },
  population: "Adults receiving continuous infusional chemotherapy at home through an elastomeric or electronic ambulatory pump connected to a central line, such as fluorouracil given over 46 hours for colorectal cancer. Paediatric home infusion and subcutaneous syringe drivers for symptom control are not covered. The sources are Canadian (ISMP Canada), from the United States (ASCO-ONS) and British (Cancer Research UK), with single-centre studies, among them one from Morocco and one from Portugal.",
  trigger: "A continuous infusion is to start in clinic and continue at home, or a home pump is due to be disconnected.",
  steps: [
    {
      action: "Put the details needed to give the infusion, such as total volume and rate of infusion, into the standardised order set, with rates written as mL per hour",
      why: "In the death ISMP Canada analysed, the rate had to be worked out at the bedside in several steps, and a miscalculation was one of the causes.",
      source: "ismp-canada-bulletin-2007",
      quote: "For example, if optimal programming of an infusion pump requires data input of “total volume” and “rate of infusion”, these data should be available in the medication order.",
    },
    {
      action: "Use a pump with a safeguard on the rate: an elastomeric pump, or a pump with a preset maximum rate",
      why: "The pump in the case ISMP Canada analysed had no programming safeguards against a wrongly entered rate.",
      source: "ismp-canada-bulletin-2007",
      quote: "Use pumps with safeguards such as controlled-rate delivery (e.g., elastomeric pumps or pumps with preset maximum rates for mL/h) until such time as “smart pump” technology is available for ambulatory infusion pumps.",
    },
    {
      action: "In the presence of the patient, have at least two licensed clinicians verify and document the rate and duration of infusion and the pump's settings",
      why: "In the case ISMP Canada analysed the double check failed, and there was no process to make sure checks were truly independent.",
      source: "asco-ons-2024",
      quote: "Infusion pump (if applicable) settings, including rate",
    },
    {
      action: "Before starting, confirm with the person the drug, the infusion time, the route and the symptoms to report",
      why: "ISMP Canada found that teaching the patient without reviewing what had been entered into the pump was a missed chance to catch the wrong rate.",
      source: "asco-ons-2024",
      quote: "Before initiation of antineoplastic therapy, personnel approved by the health care organization who is administering the antineoplastic(s) confirms the therapy with the patient, including, at a minimum, the name of the drug, the infusion time, route of infusion, symptoms to report, for example: hypersensitivity symptoms or pain at infusion site",
    },
    {
      action: "Teach safe handling at home: storage, waste, body secretions, unused medicine and how to clean up a spill, and give contact details with when and whom to call",
      why: "Pumps can leak, and fluorouracil residue has been found at the catheter connection of used pumps.",
      source: "asco-ons-2024",
      quote: "Procedures for safe handling medications in the home, including disposal of waste, handling body secretions, storage, safe handling, and management of unused medication, and clean-up of drug spills",
    },
    {
      action: "Show the person or a family member how to look after the pump, and ask them to contact their chemotherapy nurse with any problem or question once home",
      why: "Cancer Research UK says leaks are very rare and that people having treatment at home might be given a kit to use if one happens. In one pharmacy's 205 incident reports, leaks were the commonest failure (44%), then flow rate anomalies (30%).",
      source: "cruk-pumps-2024",
      quote: "Contact your chemotherapy nurse if you have any problems or questions when you get home.",
    },
    {
      action: "At disconnection, use personal protective equipment and dispose of the used pump in a dedicated hazardous waste container",
      why: "Drug residue at the connection can expose the nurse who removes the pump; in ten used pumps sampled, it was found at the catheter connection of all but two.",
      source: "cardoso-2025",
      quote: "The detection of 5-FU residues highlights the critical need for safe handling practices and the consistent use of personal protective equipment (PPE) to protect healthcare workers, especially nursing staff involved in the removal of the infusion pumps, after treatment.",
    },
  ],
  bestInClass: {
    statement: "No graded guideline on home chemotherapy pumps could be read. The strongest open source is ISMP Canada's root cause analysis of a fatal fluorouracil overdose, read here in ISMP Canada's own 2007 bulletin summarising it: critical administration details and calculations in standardised order sets, rates in mL per hour only, pumps with rate safeguards, and a structured process for independent double checks. ISMP Canada offers these as suggestions for consideration and does not grade them. ASCO-ONS (2024) adds verification of the rate, the duration and the pump's settings by at least two licensed clinicians in the presence of the patient, confirmation with the patient of the infusion time, and home safe-handling education. Disconnection with a closed-system device and patient self-disconnection are promising but rest on small studies.",
    sources: ["ismp-canada-bulletin-2007", "ismp-canada-2007", "asco-ons-2024"],
  },
  variants: [
    {
      name: "Closed-system transfer device at the pump connection",
      differs: "Connects the pump line to the non-coring needle through a closed-system device instead of a standard Luer lock or needle-free connector.",
      evidence: "In a laboratory study with 10 elastomeric pumps in each of three groups, overall 5-FU contamination at disconnection was significantly lower with the closed device (Qimono) than with Luer lock (p = 0.018) or a needle-free connector (p = 0.036). On the wipes, the mean reduction was 61% against Luer lock and 43% against the needle-free connector; gloves and the tissue under the connection showed no difference.",
      sources: ["raphaelle-2023"],
    },
    {
      name: "Patient self-disconnection at home",
      differs: "Trains patients judged capable by their oncologist or nurse to disconnect their own pump and do basic line care, with initial support from home care nurses.",
      evidence: "A six-month pilot of nine patients reported time savings of 102 minutes per treatment cycle for patients and 64 for home care nurses, with stable satisfaction; the authors conclude it seems feasible. The abstract reports no safety outcomes.",
      sources: ["al-fartousi-2026"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "ismp-canada-bulletin-2007",
      label: "Fluorouracil Incident Root Cause Analysis: Follow-Up. ISMP Canada Safety Bulletin, volume 7, number 4 (20 August 2007)",
      publisher: "Institute for Safe Medication Practices Canada",
      year: 2007,
      url: "https://ismpcanada.ca/wp-content/uploads/ISMPCSB2007-04Fluorouracil.pdf",
      gradingScheme: "A bulletin summarising the root cause analysis. Its recommendations are 'suggested for consideration' and are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ismp-canada-2007",
      label: "Fluorouracil Incident Root Cause Analysis (full report, May 2007)",
      publisher: "Institute for Safe Medication Practices Canada",
      year: 2007,
      url: "https://www.ismp-canada.org/download/reports/FluorouracilIncidentMay2007.pdf",
      gradingScheme: "Root cause analysis; recommendations not graded by evidence. Read in full on 11 November 2026; the file could not be fetched again on 17 November 2026, and no step or quote rests on it.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-ons-2024",
      label: "Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards",
      publisher: "ASCO and the Oncology Nursing Society (JCO Oncology Practice; Oncology Nursing Forum)",
      year: 2024,
      url: "https://doi.org/10.1200/OP.24.00216",
      doi: "10.1200/OP.24.00216",
      gradingScheme: "Standards are not graded; developed from a systematic review (2015 to 2023), expert panel consensus and public comment.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-pumps-2024",
      label: "Chemotherapy pumps (patient information, last reviewed 16 May 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/chemotherapy/how-you-have/into-your-vein/pumps",
      gradingScheme: "Patient information; not graded. Last reviewed 16 May 2024, next review due 17 May 2027.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "chefchaouni-2023",
      label: "Retrospective analysis of failures of ambulatory elastomeric pumps containing 5-FU in a hospital pharmacy unit",
      publisher: "Journal of Oncology Pharmacy Practice (Chefchaouni et al.)",
      year: 2023,
      url: "https://doi.org/10.1177/10781552211060290",
      doi: "10.1177/10781552211060290",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "cardoso-2025",
      label: "Safeguarding Patients, Relatives, and Nurses: A Screening Approach for Detecting 5-FU Residues on Elastomeric Infusion Pumps Using HPLC-DAD",
      publisher: "Toxics (Cardoso et al.)",
      year: 2025,
      url: "https://doi.org/10.3390/toxics13050416",
      doi: "10.3390/toxics13050416",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "raphaelle-2023",
      label: "Safe disconnection of 5-fluorouracil elastomeric pumps: The benefit of a closed-system-transfer device designed for cytotoxic drug administration/perfusion",
      publisher: "Journal of Vascular Access",
      year: 2023,
      url: "https://doi.org/10.1177/11297298211044017",
      doi: "10.1177/11297298211044017",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "al-fartousi-2026",
      label: "Reducing staff workload through patient involvement in oncology: A pilot study on self-disconnection of 5-fluorouracil elastomeric pumps at home",
      publisher: "Annales Pharmaceutiques Françaises (Al Fartousi et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.pharma.2026.03.007",
      doi: "10.1016/j.pharma.2026.03.007",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["fluorouracil"],
  terms: ["chemotherapy-side-effects-pancreatic"],
  technologies: ["ambulatory-chemotherapy-pumps", "closed-system-transfer-devices", "implanted-ports", "picc-lines"],
  related: ["oral-anticancer-medicines-at-home", "hazardous-drug-handling-in-clinical-areas", "sact-administration-checks-at-the-chair"],
  upgrades: [],
  gaps: [
    "No graded guideline on ambulatory chemotherapy pumps could be read; the INS and ISOPP standards, which cover them, refuse a script.",
    "On 17 November 2026 ISMP Canada's full root cause analysis report (May 2007) could not be fetched again: its address answered with a server error and the Internet Archive refused the request. The ISMP Canada statements on this page were therefore re-checked against, and quoted from, ISMP Canada's own bulletin of 20 August 2007 summarising the report. Details that only the full report holds, such as its classing of recommendations by strategy, were not re-read and have been taken off the page.",
    "On 17 November 2026 the ASCO-ONS text was read in the Oncology Nursing Society's co-publication (Oncology Nursing Forum 51(4)), and the quotes follow that copy. The JCO Oncology Practice version at the DOI above refuses a script and was not compared word for word.",
    "No source read says which problems with a pump need a call at once, or how fast: Cancer Research UK says to contact the chemotherapy nurse with any problem or question, and that a kit might be given for leaks. No source read says what to do if the line comes apart, or if the pump seems to empty too fast or not at all. No source read covers flushing and locking the line after disconnection.",
    "How temperature, height and position change the flow of elastomeric pumps, and what to tell patients about carrying them, comes from manufacturers' instructions, none of which were read.",
    "The ISMP Canada analysis dates from 2007 and concerned a 4-day infusion at a Canadian cancer treatment centre; whether its recommendations (rates in mL per hour, rate-limited pumps) are now universal is not known.",
    "The disconnection and self-disconnection studies are a laboratory study and a nine-patient pilot, read as abstracts. The residue study sampled ten pumps in one hospital, which its authors call a preliminary application.",
  ],
});
