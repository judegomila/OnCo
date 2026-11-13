import { protocol } from "./helpers";

/*
 * Putting in a central venous catheter without introducing infection: the insertion bundle.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710).
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text. cdc.gov returned 403 to a script; the PDF was read from the Internet Archive's capture of
 *   cdc.gov/infection-control/media/pdfs/guideline-bsi-h.pdf with pdftotext, as in the implanted port protocol.
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML
 *   (PMC7114876).
 * - NICE CG139 recommendations page (HTML, full text), for skin antisepsis before PICC insertion.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; where a sentence ends in a reference list, the quote stops before it.
 */
export const centralLineInsertionBundle = protocol({
  id: "central-line-insertion-bundle",
  name: "Central line insertion bundle: preventing bloodstream infection at the time of placement",
  aka: ["CLABSI insertion bundle", "central line insertion checklist", "CVC insertion bundle", "maximal sterile barrier precautions", "line insertion asepsis"],
  domain: "infection-prevention",
  tldr: "When a central line is put in, the team follows a checklist: clean hands, a cap, mask, sterile gown and gloves for the person inserting it, a sterile drape over the whole body, and chlorhexidine in alcohol on the skin, left to dry. Someone watches and can stop the procedure if a step is missed. For long treatments such as chemotherapy, a tunnelled line or a port is usually the right kind of line.",
  simple: "Putting in a central line opens a path for germs into a big vein. The team cleans their hands, wears sterile clothes, covers you with a sterile sheet and cleans your skin well. A checklist makes sure nothing is missed.",
  summary: "The insertion bundle in SHEA/IDSA/APIC 2022 is a set of essential practices: an evidence-based list of indications (low quality), education and competency of inserters (moderate), a process such as a checklist with an empowered observer (moderate), hand hygiene (moderate), an all-inclusive cart or kit (moderate), ultrasound guidance (high), maximum sterile barrier precautions with cap, mask, sterile gown, sterile gloves and a full-body drape (moderate; CDC IB; epic3 Class C), and alcoholic chlorhexidine skin preparation of at least 2% allowed to dry (high; epic3 Class A; CDC IA at more than 0.5%). Site choice: subclavian preferred for non-tunnelled lines in the ICU (high) and avoid the femoral vein in adults (CDC IA); in children the femoral site may be considered when upper sites are contraindicated. Use the fewest lumens needed (CDC IB, epic3 Class A); for long-term access use a tunnelled line or implanted port (epic3 Class A); PICCs are not a strategy to lower infection risk (SHEA). No systemic antibiotic prophylaxis at insertion (SHEA high, CDC IB, epic3 Class A). Replace a line placed in an emergency without assured asepsis within 48 hours (CDC IB). Antiseptic- or antimicrobial-impregnated catheters are an additional approach where rates stay high.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "anaesthetist", "surgical-team"],
    where: ["ward", "theatre", "intensive-care", "outpatient-clinic"],
  },
  population: "Adults and children having a central venous catheter placed (non-tunnelled CVCs, tunnelled lines, PICCs and implanted ports), as SHEA, CDC and epic3 scope it. SHEA's site preference is for ICU placement; chlorhexidine skin preparation in infants under 2 months and in neonatal intensive care is weighed case by case.",
  trigger: "A decision has been made that the person needs a central venous catheter.",
  steps: [
    {
      action: "Check the line is needed against an agreed list of indications before placing it",
      why: "The surest way to prevent a line infection is not to place a line that is not needed.",
      source: "shea-2022",
      quote: "Provide easy access to an evidence-based list of indications for CVC use to minimize unnecessary CVC placement (Quality of Evidence: LOW)",
      grade: "Quality of Evidence: LOW",
    },
    {
      action: "Choose the device for the length of treatment: a tunnelled line or implanted port for long-term access, with the fewest lumens needed",
      why: "Cancer treatment often lasts months; devices built for long use, with fewer openings, carry less infection risk over that time.",
      source: "epic3",
      quote: "Use a tunnelled or implanted central venous access device with a subcutaneous port for patients in whom long-term vascular access is required.",
      grade: "Class A",
    },
    {
      action: "Only let trained staff assessed as competent put in central lines",
      why: "Infection and mechanical complications fall with experience and a consistent technique.",
      source: "cdc-2011",
      quote: "Designate only trained personnel who demonstrate competence for the insertion and maintenance of peripheral and central intravascular catheters.",
      grade: "Category IA",
    },
    {
      action: "Use a checklist, completed by an observer other than the inserter, who can stop the procedure if asepsis is broken",
      why: "A second person catches missed steps that the busy inserter will not.",
      source: "shea-2022",
      quote: "HCP should be empowered to stop the procedure if breaches in aseptic technique are observed.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Have an all-inclusive cart or kit with everything needed for aseptic insertion",
      why: "Leaving the sterile field to fetch an item is a common way asepsis is broken.",
      source: "shea-2022",
      quote: "A catheter cart or kit that contains all necessary components for aseptic catheter insertion should be available and easily accessible in all units where CVCs are inserted.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Clean hands with alcohol rub or soap and water before insertion; gloves do not replace this",
      why: "Hands carry the skin germs that cause most early line infections.",
      source: "shea-2022",
      quote: "Perform hand hygiene prior to catheter insertion or manipulation (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Choose the site weighing infection against mechanical risk: in adults avoid the femoral vein, and for non-tunnelled ICU lines prefer the subclavian",
      why: "Groin lines carry more infection in adults; the subclavian has the lowest infection risk but more risk of lung puncture and is avoided in people who may need dialysis.",
      source: "cdc-2011",
      quote: "Avoid using the femoral vein for central venous access in adult patients",
      grade: "Category IA",
    },
    {
      action: "Use ultrasound to guide the needle, if the operator is trained in it",
      why: "Ultrasound cuts the number of attempts and mechanical complications.",
      source: "shea-2022",
      quote: "Use ultrasound guidance for catheter insertion (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Use maximum sterile barrier precautions: everyone involved wears a cap, mask, sterile gown and sterile gloves, and the patient is covered with a full-body sterile drape",
      why: "A large sterile field stops the guidewire and catheter touching anything unclean.",
      source: "shea-2022",
      quote: "A mask, cap, sterile gown, and sterile gloves are to be worn by all HCP involved in the catheter insertion procedure.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Apply the same precautions for a PICC and for a guidewire exchange",
      why: "A PICC is a central line and carries a similar infection risk in hospital patients.",
      source: "cdc-2011",
      quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange",
      grade: "Category IB",
    },
    {
      action: "Prepare the skin with an alcoholic chlorhexidine solution of at least 2% and let it dry completely before the puncture",
      why: "Chlorhexidine in alcohol is the most effective skin antiseptic for line insertion, and it works only once it has dried.",
      source: "shea-2022",
      quote: "Before catheter insertion, apply an alcoholic chlorhexidine solution containing at least 2% chlorhexidine gluconate to the insertion site.",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not give antibiotics to prevent infection at insertion",
      why: "Preventive antibiotics at insertion do not lower line infections and they breed resistance.",
      source: "epic3",
      quote: "Do not routinely administer intranasal or systemic antimicrobials before insertion or during the use of an intravascular device to prevent catheter colonisation or bloodstream infection.",
      grade: "Class A",
    },
    {
      action: "Replace a line put in during an emergency, when asepsis could not be assured, within 48 hours",
      why: "A line placed in a rush is more likely to have been contaminated.",
      source: "cdc-2011",
      quote: "When adherence to aseptic technique cannot be ensured (i.e., catheters inserted during a medical emergency), replace the catheter as soon as possible, i.e., within 48 hours",
      grade: "Category IB",
    },
  ],
  bestInClass: {
    statement: "The SHEA/IDSA/APIC 2022 essential practices at insertion, which CDC/HICPAC 2011 and epic3 broadly share: indication check, competent inserters, a checklist with an empowered observer, hand hygiene, an all-inclusive kit, ultrasound guidance, maximum sterile barrier precautions with a full-body drape, alcoholic chlorhexidine skin preparation allowed to dry, and no antibiotic prophylaxis. The sources differ in the strength and detail: chlorhexidine concentration is at least 2% in SHEA (high) and epic3 (Class A, 2% in 70% isopropyl alcohol) but more than 0.5% with alcohol in CDC (IA); maximum sterile barriers are moderate quality in SHEA, Category IB in CDC and Class C in epic3, and SHEA notes one randomised trial in surgical patients found no added benefit; SHEA prefers the subclavian site only for ICU placement and calls the site risk outside the ICU unclear. For people having long cancer treatment, epic3 recommends a tunnelled line or an implanted port (Class A), and SHEA warns that a PICC is not a way to lower infection risk.",
    sources: ["shea-2022", "cdc-2011", "epic3"],
  },
  variants: [
    {
      name: "Antiseptic- or antimicrobial-impregnated catheters where rates stay high",
      differs: "Uses chlorhexidine with silver sulfadiazine or minocycline with rifampin catheters for lines expected to stay more than 5 days, in units whose CLABSI rate is above target despite the essential practices, or for patients with limited access and recurrent infection.",
      evidence: "SHEA additional approach, quality of evidence high in adults and moderate in children; CDC Category IA under the same conditions; epic3 Class A for adults. SHEA notes many of the trials predate routine bundles and the benefit on top of them is unknown.",
      sources: ["shea-2022", "cdc-2011", "epic3"],
    },
    {
      name: "Femoral or tunnelled femoral lines in children",
      differs: "In children and infants the femoral vein may be considered if upper body sites are contraindicated; a tunnelled femoral line with an exit site in the mid-thigh, outside the nappy area, may be safer.",
      evidence: "Stated by SHEA without a separate grade; CDC's femoral avoidance (Category IA) is for adults.",
      sources: ["shea-2022", "cdc-2011"],
    },
    {
      name: "Povidone-iodine in alcohol for chlorhexidine sensitivity",
      differs: "Uses povidone-iodine in alcohol instead of chlorhexidine where the patient is sensitive to chlorhexidine; CDC also allows tincture of iodine, an iodophor or 70% alcohol.",
      evidence: "epic3 Class A within the skin preparation recommendation; CDC Category IA within its recommendation; CDC lists the comparison of chlorhexidine and povidone-iodine, both in alcohol, as unresolved.",
      sources: ["epic3", "cdc-2011"],
    },
  ],
  grades: [
    { claim: "Alcoholic chlorhexidine skin preparation", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Use an alcoholic chlorhexidine antiseptic for skin preparation (Quality of Evidence: HIGH)" },
    { claim: "2% chlorhexidine in 70% isopropyl alcohol, single use, allowed to dry, before CVC insertion", grade: "Class A", source: "epic3", quote: "Decontaminate the skin at the insertion site with a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) and allow to dry prior to the insertion of a central venous access device." },
    { claim: "More than 0.5% chlorhexidine with alcohol before CVC insertion", grade: "Category IA", source: "cdc-2011" },
    { claim: "Maximum sterile barrier precautions", grade: "Quality of Evidence: MODERATE", source: "shea-2022", quote: "Use maximum sterile barrier precautions during CVC insertion (Quality of Evidence: MODERATE)" },
    { claim: "Maximal sterile barrier precautions", grade: "Category IB", source: "cdc-2011" },
    { claim: "Maximal sterile barrier precautions", grade: "Class C", source: "epic3", quote: "Use maximal sterile barrier precautions for the insertion of central venous access devices." },
    { claim: "A checklist or similar process at insertion", grade: "Quality of Evidence: MODERATE", source: "shea-2022", quote: "In ICU and non-ICU settings, a facility should have a process in place, such as a checklist, to ensure adherence to infection prevention practices at the time of CVC insertion (Quality of Evidence: MODERATE)" },
    { claim: "Subclavian site preferred for ICU placement", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "The subclavian site is preferred to reduce infectious complications when the catheter is placed in the ICU setting (Quality of Evidence: HIGH)" },
    { claim: "Minimum number of lumens", grade: "Class A", source: "epic3", quote: "Use a catheter with the minimum number of ports or lumens essential for management of the patient." },
  ],
  sources: [
    { key: "shea-2022", label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update", publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)", year: 2022, url: "https://europepmc.org/article/PMC/PMC9096710", doi: "10.1017/ice.2022.87", gradingScheme: "Quality of evidence HIGH, MODERATE or LOW; each recommendation classed as an essential practice, an additional approach, not routine, or unresolved.", read: "full-text", accessed: "2026-11-11" },
    { key: "cdc-2011", label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", publisher: "CDC/HICPAC", year: 2011, url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf", doi: "10.1093/cid/cir257", gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.", read: "full-text", accessed: "2026-11-11" },
    { key: "epic3", label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England", publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)", year: 2014, url: "https://europepmc.org/article/PMC/PMC7114876", doi: "10.1016/S0195-6701(13)60012-2", gradingScheme: "SIGN-style classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point), H&S (health and safety legislation).", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "None of the guidelines read asks for a mask on the patient; the full-body sterile drape covers the patient, and masks are named for the staff doing the insertion.",
    "The INS Infusion Therapy Standards of Practice (2024) could not be read and are not cited here.",
    "No guideline read is specific to children with cancer; the paediatric points (femoral site, chlorhexidine in infants) come from the general guidelines.",
    "Outside the ICU, SHEA says the infection risk of different insertion sites remains unclear, and it is unclear whether ultrasound-guided subclavian insertion reduces infection.",
    "The comparison of chlorhexidine and povidone-iodine, both in alcohol, is an unresolved issue in CDC 2011.",
  ],
  institutions: [],
  technologies: ["implanted-ports", "picc-lines"],
  terms: ["central-venous-access"],
  related: ["central-line-maintenance-bundle", "implanted-port-access-and-care", "central-venous-catheter-insertion-for-anticancer-therapy"],
  sections: ["supportive-care"],
  tags: ["protocol", "clabsi", "vascular-access"],
});
