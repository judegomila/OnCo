import { protocol } from "./helpers";

/*
 * Putting in a central venous catheter without introducing infection: the insertion bundle.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was re-read as raw text
 * and every quote re-checked by script (whitespace and line-break hyphenation normalised, XML tags and citation
 * cross-references stripped, nothing else).
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710), from a copy another checker in this pass saved the same day.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the PDF from cdc.gov read with pdftotext, from a copy another checker saved the same day. The
 *   CDC landing page (dated 12 April 2024) lists no newer edition.
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML
 *   (PMC7114876), from a copy another checker saved the same day. A Europe PMC title search found no epic4.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed; where a sentence ends in a reference list, the quote stops before
 * it. The second pass found all 20 quotes verbatim and every grade as printed. It reworded reasons the sources do not
 * give, separated what SHEA says from what CDC says about the subclavian site and ultrasound, restored "routinely" to
 * the antibiotic step, and added epic3's recommendation of a PICC for medium-term access beside its recommendation of
 * a tunnelled line or port for long-term access.
 */
export const centralLineInsertionBundle = protocol({
  id: "central-line-insertion-bundle",
  name: "Central line insertion bundle: preventing bloodstream infection at the time of placement",
  aka: ["CLABSI insertion bundle", "central line insertion checklist", "CVC insertion bundle", "maximal sterile barrier precautions", "line insertion asepsis"],
  domain: "infection-prevention",
  tldr: "When a central line is put in, the team follows a checklist or a similar process: clean hands, a cap, mask, sterile gown and gloves for the staff inserting it, a large sterile drape, and chlorhexidine in alcohol on the skin, left to dry. Someone watches and can stop the procedure if sterile technique is broken. For long-term use, one guideline recommends a tunnelled line or a port.",
  simple: "Putting in a central line opens a path for germs into a big vein. The team cleans their hands, wears sterile clothes, covers you with a sterile sheet and cleans your skin well. A checklist makes sure nothing is missed.",
  summary: "The insertion bundle in SHEA/IDSA/APIC 2022 is a set of essential practices for acute-care hospitals: an evidence-based list of indications (low quality), education and competency assessment of staff (moderate), a process such as a checklist, with observation of the insertion and staff empowered to stop it (moderate), hand hygiene (moderate), an all-inclusive cart or kit (moderate), ultrasound guidance (high), maximum sterile barrier precautions with mask, cap, sterile gown, sterile gloves and a full-body drape (moderate; CDC IB; epic3 Class C), and alcoholic chlorhexidine skin preparation of at least 2% allowed to dry (high; epic3 Class A; CDC IA at more than 0.5%). Site choice: SHEA prefers the subclavian site when the line is placed in the ICU (high); CDC prefers it for non-tunnelled lines in adults (IB), says to avoid the femoral vein in adults (IA) and to avoid the subclavian site in haemodialysis and advanced kidney disease (IA); in children the femoral site may be considered when upper body sites are contraindicated (SHEA). Use the fewest lumens needed (CDC IB, epic3 Class A); for long-term access use a tunnelled line or implanted port (epic3 Class A) and for medium-term intermittent access a PICC (epic3 Class D/GPP); PICCs are not a strategy to lower infection risk (SHEA). No routine systemic antibiotic prophylaxis at insertion (SHEA high, CDC IB, epic3 Class A). Replace a line placed in an emergency without assured asepsis as soon as possible, within 48 hours (CDC IB). Antiseptic- or antimicrobial-impregnated catheters are an additional approach where rates stay high.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "anaesthetist", "surgical-team"],
    where: ["ward", "theatre", "intensive-care", "outpatient-clinic"],
  },
  population: "Adults and children having a central venous catheter placed. SHEA writes for acute-care hospitals and does not stratify its recommendations by type of catheter; CDC names CVCs and PICCs; epic3 is written for NHS hospitals in England. SHEA's site preference is for ICU placement. On chlorhexidine skin preparation, CDC makes no recommendation for infants under 2 months (an unresolved issue) and SHEA says it should be used in neonatal intensive care when the benefits are judged to outweigh the potential risk.",
  trigger: "A decision has been made that the person needs a central venous catheter.",
  steps: [
    {
      action: "Check the line is needed against an agreed list of indications before placing it",
      why: "SHEA asks for the list so that fewer unnecessary lines are placed.",
      source: "shea-2022",
      quote: "Provide easy access to an evidence-based list of indications for CVC use to minimize unnecessary CVC placement (Quality of Evidence: LOW)",
      grade: "Quality of Evidence: LOW",
    },
    {
      action: "Choose the device for how long access is needed: a tunnelled line or implanted port for long-term access, with the fewest lumens needed",
      why: "epic3 reports that most studies found fewer infections with tunnelled lines, and the fewest with implanted ports, than with non-tunnelled lines. For medium-term intermittent access it recommends a PICC (Class D/GPP), and it describes PICCs as increasingly used for 6 weeks to 6 months, including for chemotherapy.",
      source: "epic3",
      quote: "Use a tunnelled or implanted central venous access device with a subcutaneous port for patients in whom long-term vascular access is required.",
      grade: "Class A",
    },
    {
      action: "Only let trained staff assessed as competent put in central lines",
      why: "CDC reports that infection risk falls when aseptic care is standardised, and that lines put in and looked after by inexperienced staff might carry more risk of infection.",
      source: "cdc-2011",
      quote: "Designate only trained personnel who demonstrate competence for the insertion and maintenance of peripheral and central intravascular catheters.",
      grade: "Category IA",
    },
    {
      action: "Have a process such as a checklist; if one is used, have someone other than the inserter complete it, and have a trained observer who can stop the procedure if asepsis is broken",
      why: "SHEA says a trained nurse, doctor or other member of staff should watch the insertion to make sure aseptic technique is kept.",
      source: "shea-2022",
      quote: "HCP should be empowered to stop the procedure if breaches in aseptic technique are observed.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Have an all-inclusive cart or kit with everything needed for aseptic insertion",
      why: "SHEA wants everything needed for an aseptic insertion to be to hand in every unit where lines are put in.",
      source: "shea-2022",
      quote: "A catheter cart or kit that contains all necessary components for aseptic catheter insertion should be available and easily accessible in all units where CVCs are inserted.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Clean hands with alcohol rub or soap and water before insertion; gloves do not replace this",
      why: "CDC says hand hygiene before insertion, combined with proper aseptic technique, protects against infection.",
      source: "shea-2022",
      quote: "Perform hand hygiene prior to catheter insertion or manipulation (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Choose the site weighing infection against mechanical risk: in adults avoid the femoral vein and prefer the subclavian site for a non-tunnelled line",
      why: "CDC reports more skin colonisation, and in some studies more infection, with groin lines in adults, and prefers the subclavian site for a non-tunnelled line in adults (Category IB). SHEA prefers the subclavian site when the line is placed in intensive care (high) and says the risk between sites outside intensive care is unclear. Both say to avoid the subclavian site in people on or likely to need haemodialysis because the vein can narrow, and CDC lists a punctured lung among the mechanical risks to weigh.",
      source: "cdc-2011",
      quote: "Avoid using the femoral vein for central venous access in adult patients",
      grade: "Category IA",
    },
    {
      action: "Use ultrasound guidance to put the line in",
      why: "SHEA says ultrasound guidance at the neck and groin veins lowers non-infectious complications, and warns that using it may lead to a breach in aseptic technique. CDC recommends it to reduce the number of attempts and mechanical complications, and only in the hands of those fully trained in it (Category IB).",
      source: "shea-2022",
      quote: "Use ultrasound guidance for catheter insertion (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Use maximum sterile barrier precautions: everyone involved wears a cap, mask, sterile gown and sterile gloves, and the patient is covered with a full-body sterile drape",
      why: "SHEA says most of the available evidence suggests these precautions lower infection risk, although one randomised study in surgical patients found no added benefit.",
      source: "shea-2022",
      quote: "A mask, cap, sterile gown, and sterile gloves are to be worn by all HCP involved in the catheter insertion procedure.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Apply the same precautions for a PICC and for a guidewire exchange",
      why: "CDC names PICCs and guidewire exchange in this recommendation. SHEA says the infection risk of a PICC in hospital patients approaches that of other central lines.",
      source: "cdc-2011",
      quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange",
      grade: "Category IB",
    },
    {
      action: "Prepare the skin with an alcoholic chlorhexidine solution of at least 2% and let it dry before the puncture",
      why: "SHEA rates the evidence for alcoholic chlorhexidine as high and says the antiseptic must be allowed to dry before the skin is punctured. CDC says to let it dry according to the manufacturer's recommendation (Category IB).",
      source: "shea-2022",
      quote: "Before catheter insertion, apply an alcoholic chlorhexidine solution containing at least 2% chlorhexidine gluconate to the insertion site.",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not routinely give antibiotics to prevent infection when the line is put in",
      why: "epic3 reports that no studies showed preventive antibiotics lowering line infections in adults. It notes one review found they may help some high-risk people with cancer who have long-term tunnelled lines, and says they should still not be used routinely, to limit antibiotic resistance.",
      source: "epic3",
      quote: "Do not routinely administer intranasal or systemic antimicrobials before insertion or during the use of an intravascular device to prevent catheter colonisation or bloodstream infection.",
      grade: "Class A",
    },
    {
      action: "Replace a line put in during an emergency, when asepsis could not be assured, as soon as possible and within 48 hours",
      why: "In an emergency the team cannot always be sure aseptic technique was kept.",
      source: "cdc-2011",
      quote: "When adherence to aseptic technique cannot be ensured (i.e., catheters inserted during a medical emergency), replace the catheter as soon as possible, i.e., within 48 hours",
      grade: "Category IB",
    },
  ],
  bestInClass: {
    statement: "The SHEA/IDSA/APIC 2022 essential practices at insertion: indication check, competent inserters, a process such as a checklist with an empowered observer, hand hygiene, an all-inclusive cart or kit, ultrasound guidance, maximum sterile barrier precautions with a full-body drape, alcoholic chlorhexidine skin preparation allowed to dry, and no routine antibiotic prophylaxis. CDC/HICPAC 2011 and epic3 share the recommendations on trained staff, hand hygiene, maximal sterile barriers, chlorhexidine in alcohol and antibiotic prophylaxis; CDC also recommends ultrasound guidance (IB) and bundled improvement strategies (IB), while the checklist, the observer and the kit are recommendations of SHEA alone. The sources differ in the strength and detail: chlorhexidine concentration is at least 2% in SHEA (high) and epic3 (Class A, 2% in 70% isopropyl alcohol) but more than 0.5% with alcohol in CDC (IA); maximum sterile barriers are moderate quality in SHEA, Category IB in CDC and Class C in epic3, and SHEA notes one randomised trial in surgical patients found no added benefit; SHEA prefers the subclavian site for ICU placement and calls the site risk outside the ICU unclear, while CDC prefers it for non-tunnelled lines in adults (IB). Where access is needed long-term, epic3 recommends a tunnelled line or an implanted port (Class A) and, for medium-term intermittent access, a PICC (Class D/GPP); SHEA says not to use a PICC as a way to lower infection risk.",
    sources: ["shea-2022", "cdc-2011", "epic3"],
  },
  variants: [
    {
      name: "Antiseptic- or antimicrobial-impregnated catheters where rates stay high",
      differs: "Uses catheters impregnated with chlorhexidine and silver sulfadiazine or with minocycline and rifampin. SHEA: where a unit or patient group has a CLABSI rate above the hospital's goals despite the essential practices, for patients with limited venous access and recurrent CLABSI, or for patients at heightened risk of severe harm from a CLABSI. CDC and epic3: for lines expected to stay in more than 5 days, where the rate stays high despite a comprehensive strategy (epic3 for adults).",
      evidence: "SHEA additional approach, quality of evidence high in adults and moderate in children; CDC Category IA; epic3 Class A for adults. SHEA notes many of the trials predate routine bundles and whether the catheters add benefit on top of them is unknown, and it asks for patients to be monitored for adverse effects such as anaphylaxis.",
      sources: ["shea-2022", "cdc-2011", "epic3"],
    },
    {
      name: "Femoral or tunnelled femoral lines in children",
      differs: "In children and infants the femoral vein may be considered if upper body sites are contraindicated; a tunnelled femoral line with an exit site in the mid-thigh, outside the nappy area, may be safer.",
      evidence: "Stated by SHEA in the text under its site recommendation, without a separate grade; CDC's femoral avoidance (Category IA) is for adults, and CDC reports that in children femoral lines have a low incidence of mechanical complications and might have an infection rate equivalent to other sites.",
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
    { key: "shea-2022", label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update", publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)", year: 2022, url: "https://europepmc.org/article/PMC/PMC9096710", doi: "10.1017/ice.2022.87", gradingScheme: "Quality of evidence HIGH, MODERATE or LOW; each recommendation classed as an essential practice, an additional approach, not routine, or unresolved.", read: "full-text", accessed: "2026-11-17" },
    { key: "cdc-2011", label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", publisher: "CDC/HICPAC", year: 2011, url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf", doi: "10.1093/cid/cir257", gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.", read: "full-text", accessed: "2026-11-17" },
    { key: "epic3", label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England", publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)", year: 2014, url: "https://europepmc.org/article/PMC/PMC7114876", doi: "10.1016/S0195-6701(13)60012-2", gradingScheme: "SIGN classification, classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point), H&S (underpinned by health and safety legislation).", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "None of the guidelines read asks for a mask on the patient; the full-body sterile drape covers the patient, and masks are named for the staff doing the insertion.",
    "The INS Infusion Therapy Standards of Practice (2024) refuse a script, could not be read on 17 November 2026 and are not cited here.",
    "On 17 November 2026 no newer edition was found of SHEA/IDSA/APIC 2022, of CDC/HICPAC 2011 (last update October 2017) or of epic3 (2014). CDC 2011 and epic3 are more than ten years old; SHEA 2022 notes that its earlier lead recommendation to avoid the femoral vein remains valid and has been replaced by a positive recommendation for the subclavian site in intensive care.",
    "None of the three guidelines defines long-term access in days or weeks, or names a preferred device for chemotherapy; epic3 describes PICCs as used for 6 weeks to 6 months and tunnelled lines as frequently used for people with cancer.",
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
