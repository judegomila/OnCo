import { protocol } from "./helpers";

/*
 * Keeping a central venous catheter free of infection once it is in: the maintenance bundle, for adults and children
 * having cancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710). This is the most recent edition; no later CLABSI compendium update was found in Europe PMC.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017, including the July 2017 chlorhexidine dressing update): full text. cdc.gov returned 403 to a script; as in
 *   the implanted port protocol, the PDF was read from the Internet Archive's capture of
 *   cdc.gov/infection-control/media/pdfs/guideline-bsi-h.pdf with pdftotext.
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML
 *   (PMC7114876). A Europe PMC search found no epic4.
 * - NICE CG139, recommendations page (HTML, full text; last updated February 2017).
 * - Zerr et al., Cancer 2021, Children's Oncology Group randomised trial of chlorhexidine bathing in children with
 *   cancer or allogeneic transplant: abstract, Europe PMC.
 * - Wolf et al., Lancet Infect Dis 2018, ethanol lock therapy in paediatric cancer: abstract, Europe PMC. A 2023
 *   paediatric ethanol lock meta-analysis (J Pediatr Pharmacol Ther): abstract, Europe PMC.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable (paywalled, no open copy). No step
 *   rests on it.
 * - No current paediatric oncology central line care guideline was found: the Children's Oncology Group lists its
 *   central venous catheter care guideline as archived in August 2018, and a Europe PMC search (2018 to 2026) found
 *   quality-improvement reports but no guideline. Children are covered here through what the general guidelines say
 *   about them.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; where a sentence ends in a reference list, the quote stops before it.
 */
export const centralLineMaintenanceBundle = protocol({
  id: "central-line-maintenance-bundle",
  name: "Central line maintenance bundle: preventing bloodstream infection after insertion",
  aka: ["CLABSI maintenance bundle", "central line care bundle", "Hickman line care", "PICC line care", "CVC maintenance", "line infection prevention", "CRBSI prevention"],
  domain: "infection-prevention",
  tldr: "A central line (a Hickman, PICC or port) lets germs straight into the blood, so every touch is planned. Hands are cleaned, the connector is scrubbed with antiseptic each time, the dressing is kept clean and dry and changed weekly, and every day someone asks whether the line is still needed. Families caring for a line at home are taught the same steps before they leave hospital.",
  simple: "A central line is a thin tube into a big vein. Germs on hands or on the end of the tube can cause a serious blood infection. Clean hands, scrub the end of the tube each time, keep the dressing dry and take the line out when it is no longer needed.",
  summary: "Maintenance rests on the SHEA/IDSA/APIC 2022 compendium (essential practices for all acute hospitals, graded by quality of evidence), CDC/HICPAC 2011 (updated 2017), epic3 (England, 2014) and NICE CG139 for care at home. Essential: hand hygiene before any contact (epic3 Class A); aseptic technique; scrub hubs, needleless connectors and injection ports before each access (SHEA moderate; CDC IA), with alcoholic chlorhexidine preferred and friction for at least 5 seconds (SHEA) or 15 seconds (epic3 Class D/GPP); access only with sterile devices; chlorhexidine in alcohol for site care at dressing changes (epic3 Class A); transparent dressings changed at least every 7 days and gauze every 2 days, or sooner if soiled, loose or damp (SHEA moderate); chlorhexidine-containing dressings over 2 months of age (SHEA high), which CDC 2017 recommends at IA only from age 18 and leaves unresolved in children; daily review and removal of non-essential lines (SHEA moderate, CDC IA); administration sets up to 7 days (SHEA high) or 96 hours (epic3 Class A); no systemic antimicrobial prophylaxis, routine antibiotic locks or routine line replacement; and unit surveillance of CLABSI per 1,000 catheter days.\n\nDaily chlorhexidine bathing is graded high for ICU patients over 2 months, but SHEA notes benefit in adult haematology-oncology was not seen in children, and a Children's Oncology Group randomised trial (2021) found more CLABSI with chlorhexidine bathing in children with cancer, concluding it does not support routine use. Antiseptic caps, antimicrobial lock therapy for recurrent CLABSI and vascular access teams are additional approaches where rates stay high.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "intensive-care", "home", "community"],
  },
  population: "Adults and children with a central venous catheter (tunnelled lines such as Hickman and Broviac, PICCs, implanted ports and short-term non-tunnelled lines) during cancer treatment, in hospital and at home. SHEA scopes acute-care hospitals; NICE CG139 covers primary and community care. Infants under 2 months and premature neonates are named exceptions for chlorhexidine. Port needle access is covered in its own protocol.",
  trigger: "A central venous catheter is in place, from the first dressing after insertion until the line is removed.",
  steps: [
    {
      action: "Train and check the competence of every person who cares for the line, and teach the patient and family before discharge",
      why: "Most line infections come from how the line is handled, so every pair of hands that touches it needs the same technique.",
      source: "nice-cg139",
      quote: "Before discharge from hospital, patients and their carers should be taught any techniques they may need to use to prevent infection and safely manage a vascular access device.",
    },
    {
      action: "Clean hands with alcohol rub, or soap and water if soiled, before and after any contact with the line or its site",
      why: "Hands carry the skin germs that most often cause line infections; gloves do not replace hand cleaning.",
      source: "epic3",
      quote: "Hands must be decontaminated, with an alcohol-based hand rub or by washing with liquid soap and water if soiled or potentially contaminated with blood or body fluids, before and after any contact with the intravascular catheter or insertion site.",
      grade: "Class A",
    },
    {
      action: "Use an aseptic technique for site care and every time the line is accessed",
      why: "An aseptic technique keeps the parts that enter the blood untouched by anything unclean.",
      source: "cdc-2011",
      quote: "Maintain aseptic technique for the insertion and care of intravascular catheters",
      grade: "Category IB",
    },
    {
      action: "Before every access, scrub the hub, needleless connector or injection port with alcoholic chlorhexidine or 70% alcohol, with friction",
      why: "About half of hubs and connectors carry germs in ordinary practice; scrubbing removes them before they are pushed into the line.",
      source: "shea-2022",
      quote: "Before accessing catheter hubs, needleless connectors, or injection ports, vigorously apply mechanical friction with an alcoholic chlorhexidine preparation, or 70% alcohol.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Scrub for at least 5 seconds (SHEA), or 15 seconds and let it dry (epic3), and follow the local policy on which",
      why: "The two guidelines set different minimum times; neither has been tested on every connector type.",
      source: "shea-2022",
      quote: "Apply mechanical friction for a minimum of 5 seconds to reduce contamination.",
    },
    {
      action: "Access the port or connector only with sterile devices",
      why: "A non-sterile syringe tip undoes the scrub.",
      source: "cdc-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "At each dressing change, clean the site with 2% chlorhexidine in 70% alcohol from a single-use applicator and let it air dry",
      why: "Chlorhexidine in alcohol kills skin germs and keeps working after it dries.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "Change transparent dressings at least every 7 days and gauze every 2 days, and at once if the dressing is soiled, loose or damp",
      why: "A lifted or wet dressing lets germs track along the line into the vein.",
      source: "shea-2022",
      quote: "For nontunneled CVCs in adults and children, change transparent dressings and perform site care with a chlorhexidine-based antiseptic at least every 7 days or immediately if the dressing is soiled, loose, or damp.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Use a chlorhexidine-containing dressing for patients over 2 months old, where the local policy and the child's age allow",
      why: "These dressings reduce line infections in adults; in children the evidence is thinner and CDC makes no recommendation under 18 (see variants).",
      source: "shea-2022",
      quote: "Use chlorhexidine-containing dressings for CVCs in patients over 2 months of age (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not let the line go under water; shower only with the line and connector covered by an impermeable cover",
      why: "Bath water and swimming pools can carry germs into the line; a cover makes showering possible.",
      source: "cdc-2011",
      quote: "Do not submerge the catheter or catheter site in water.",
      grade: "Category IB",
    },
    {
      action: "Ask every day whether the line is still needed, and take out any line that is not",
      why: "Every day a line is in is a day it can become infected.",
      source: "shea-2022",
      quote: "Assess the need for continued intravascular access on a daily basis during multidisciplinary rounds.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Change administration sets not used for blood, blood products or lipids no more often than every 96 hours to 7 days; change blood sets after each transfusion episode or every 12 hours",
      why: "More frequent changes add handling without reducing infection. SHEA allows up to 7 days and epic3 96 hours (Class A); blood and lipids support germ growth, so epic3 changes blood sets when the transfusion ends or every 12 hours, and lipid sets every 24 hours.",
      source: "shea-2022",
      quote: "Routine replacement of administration sets not used for blood, blood products, or lipid formulations can be performed at intervals up to 7 days (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not give antibiotics to prevent line infection while the line is in",
      why: "Preventive antibiotics do not lower line infections and they breed resistance.",
      source: "shea-2022",
      quote: "Do not use antimicrobial prophylaxis for short-term or tunneled catheter insertion or while catheters are in situ (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not replace central lines on a schedule",
      why: "Routine replacement adds insertion risks without preventing infection.",
      source: "epic3",
      quote: "Do not routinely replace central venous access devices to prevent catheter-related infection.",
      grade: "Class A",
    },
    {
      action: "Count line infections per 1,000 catheter days on each unit and report them back to the unit and its leaders",
      why: "A unit that measures its rate can see whether the bundle is working and when to add more.",
      source: "shea-2022",
      quote: "Measure unit-specific incidence of CLABSI (eg, CLABSI per 1,000 catheter days) and report the data on a regular basis to the units, physician and nursing leadership, and hospital administrators overseeing the units.",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "If the rate stays high despite these steps, consider antiseptic caps on connectors, and antimicrobial lock solutions for patients with long-term lines and recurrent infection",
      why: "These are additional approaches with costs or risks, kept for where the essentials are not enough.",
      source: "shea-2022",
      quote: "Use an antiseptic-containing hub/connector cap/port protector to cover connectors (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
  ],
  bestInClass: {
    statement: "Run the essential practices of the SHEA/IDSA/APIC 2022 compendium as one bundle, with the UK guidelines filling in detail: hand hygiene and aseptic technique, hub and connector scrubbing before every access with alcoholic chlorhexidine, chlorhexidine in alcohol for site care, transparent dressings changed at least weekly or when compromised, chlorhexidine-containing dressings in adults, a daily review of need, no preventive antibiotics or scheduled line changes, and unit surveillance. Where the guidelines differ, both are stated: hub scrub time is at least 5 seconds in SHEA and at least 15 seconds with drying in epic3 (Class D/GPP); administration sets may run up to 7 days in SHEA (high quality) but up to 96 hours in epic3 (Class A); chlorhexidine dressings are recommended from 2 months in SHEA (high quality) but from 18 years in CDC 2017 (Category IA), with no recommendation for children and a recommendation against them for premature neonates. Daily chlorhexidine bathing is an essential practice for ICU patients in SHEA, but it is not established for children with cancer: SHEA records no benefit in them and the Children's Oncology Group trial found more infections with it.",
    sources: ["shea-2022", "cdc-2011", "epic3", "nice-cg139", "zerr-2021"],
  },
  variants: [
    {
      name: "Hub scrub of at least 15 seconds, then drying (epic3, England)",
      differs: "Decontaminates the hub with 2% chlorhexidine in 70% alcohol for a minimum of 15 seconds and lets it dry before access, against SHEA's minimum of 5 seconds of friction. NICE CG139 asks for decontamination before and after access, with no time.",
      evidence: "epic3 grades it Class D/GPP (good practice); SHEA's 5 seconds rests on laboratory studies and it notes the time may not apply to untested connectors.",
      sources: ["epic3", "shea-2022", "nice-cg139"],
    },
    {
      name: "Chlorhexidine dressings by age (CDC/HICPAC 2017 update)",
      differs: "Recommends chlorhexidine-impregnated dressings with an FDA-cleared label for short-term non-tunnelled CVCs in patients aged 18 and over, recommends against them in premature neonates because of skin reactions, and makes no recommendation for other children. SHEA recommends them from 2 months.",
      evidence: "CDC Category IA for adults, IC against in premature neonates, unresolved issue for other children; SHEA quality of evidence high.",
      sources: ["cdc-2011", "shea-2022"],
    },
    {
      name: "Daily chlorhexidine bathing, and why it is not routine for children with cancer",
      differs: "SHEA makes daily chlorhexidine bathing an essential practice for ICU patients over 2 months, and CDC 2011 suggests a 2% chlorhexidine wash for daily skin cleansing (Category II). In a Children's Oncology Group double-blind trial of 174 evaluable children with cancer or allogeneic transplant, CLABSI was 5.44 per 1,000 line days with chlorhexidine cloths against 3.10 with control cloths, and staphylococci with reduced chlorhexidine susceptibility were more often acquired.",
      evidence: "SHEA quality of evidence high for ICU patients; it calls the role outside the ICU unclear and notes benefit in adult haematology-oncology was not seen in children. The paediatric trial stopped early for poor accrual; its authors concluded that the data do not support routine chlorhexidine bathing in these children.",
      sources: ["shea-2022", "cdc-2011", "zerr-2021"],
    },
    {
      name: "Ethanol locks in children with cancer",
      differs: "Some paediatric centres fill the line with 70% ethanol between uses to prevent infection, especially after a line infection.",
      evidence: "A randomised double-blind trial in 94 children and young people with cancer or haematological disorders and a new CLABSI stopped for futility: treatment failure was 44% with ethanol and 43% with placebo, and line blockage needing a clot-dissolving drug was more common with ethanol (58% against 33%); its authors do not recommend routine ethanol locks for treatment or secondary prophylaxis. A 2023 meta-analysis, mostly of before-and-after studies, reported fewer infections with ethanol locks and more thrombosis and catheter breakage. SHEA lists antimicrobial lock therapy as an additional approach for recurrent CLABSI and asks that the adverse effects of ethanol locks be carefully considered.",
      sources: ["wolf-2018", "ethanol-meta-2023", "shea-2022"],
    },
  ],
  grades: [
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Decontaminate the hub for at least 15 seconds and allow to dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Chlorhexidine-containing dressings over 2 months of age", grade: "Quality of Evidence: HIGH", source: "shea-2022" },
    { claim: "Bathe ICU patients over 2 months daily with chlorhexidine", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Bathe ICU patients >2 months of age with a chlorhexidine preparation on a daily basis (Quality of Evidence: HIGH)" },
    { claim: "Promptly remove any line that is no longer essential", grade: "Category IA", source: "cdc-2011", quote: "Promptly remove any intravascular catheter that is no longer essential" },
    { claim: "Administration sets in continuous use need not be replaced more often than every 96 hours", grade: "Class A", source: "epic3", quote: "Administration sets in continuous use do not need to be replaced more frequently than every 96 h, unless device-specific recommendations from the manufacturer indicate otherwise, they become disconnected or the intravascular access device is replaced." },
    { claim: "Use bundled performance improvement initiatives", grade: "Category IB", source: "cdc-2011" },
    { claim: "Antimicrobial lock therapy for long-term lines (additional approach)", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Use antimicrobial lock therapy for long-term CVCs (Quality of Evidence: HIGH)" },
    { claim: "Antibiotic lock solutions should not be used routinely", grade: "Class D/GPP", source: "epic3", quote: "Antimicrobial lock solutions should not be used routinely to prevent catheter-related bloodstream infections." },
  ],
  sources: [
    { key: "shea-2022", label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update", publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)", year: 2022, url: "https://europepmc.org/article/PMC/PMC9096710", doi: "10.1017/ice.2022.87", gradingScheme: "Quality of evidence HIGH, MODERATE or LOW; each recommendation classed as an essential practice (all acute-care hospitals), an additional approach (where rates stay high), not routine, or unresolved.", read: "full-text", accessed: "2026-11-11" },
    { key: "cdc-2011", label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", publisher: "CDC/HICPAC", year: 2011, url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf", doi: "10.1093/cid/cir257", gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.", read: "full-text", accessed: "2026-11-11" },
    { key: "epic3", label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England", publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)", year: 2014, url: "https://europepmc.org/article/PMC/PMC7114876", doi: "10.1016/S0195-6701(13)60012-2", gradingScheme: "SIGN-style classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point), H&S (health and safety legislation).", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-cg139", label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.", read: "full-text", accessed: "2026-11-11" },
    { key: "zerr-2021", label: "Chlorhexidine gluconate bathing in children with cancer or those undergoing hematopoietic stem cell transplantation: A double-blinded randomized controlled trial from the Children's Oncology Group", publisher: "Cancer", year: 2021, url: "https://europepmc.org/article/MED/33079403", doi: "10.1002/cncr.33271", read: "abstract", accessed: "2026-11-11" },
    { key: "wolf-2018", label: "Treatment and secondary prophylaxis with ethanol lock therapy for central line-associated bloodstream infection in paediatric cancer: a randomised, double-blind, controlled trial", publisher: "The Lancet Infectious Diseases", year: 2018, url: "https://europepmc.org/article/MED/29884572", doi: "10.1016/s1473-3099(18)30224-x", read: "abstract", accessed: "2026-11-11" },
    { key: "ethanol-meta-2023", label: "Ethanol Lock for Prevention of CVC-Related Bloodstream Infection in Pediatric Patients: A Systematic Review and Meta-Analysis", publisher: "Journal of Pediatric Pharmacology and Therapeutics", year: 2023, url: "https://europepmc.org/article/MED/38130502", doi: "10.5863/1551-6776-28.5.386", read: "abstract", accessed: "2026-11-11" },
    { key: "ins-2024", label: "Infusion Therapy Standards of Practice, 9th Edition", publisher: "Infusion Nurses Society (Journal of Infusion Nursing)", year: 2024, url: "https://doi.org/10.1097/NAN.0000000000000532", doi: "10.1097/NAN.0000000000000532", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The INS Infusion Therapy Standards of Practice (9th edition, 2024), the main nursing standard for line care, could not be read: it is paywalled and no open copy was found.",
    "No current guideline specific to central line care in children with cancer was found. The Children's Oncology Group archived its central venous catheter care guideline in August 2018, and the UK Children's Cancer and Leukaemia Group guidance could not be found at a public address.",
    "The paediatric chlorhexidine bathing and ethanol lock trials were read as abstracts only.",
    "The guidelines set different minimum hub scrub times (5 or 15 seconds) and SHEA notes the 5-second figure may not apply to connectors not tested; no trial compares them in patients.",
    "How often to change intermittently used administration sets is unresolved in SHEA.",
    "None of these guidelines asks for a mask on the patient or the patient turning their head away during dressing changes or hub access; masks appear only for line insertion.",
  ],
  institutions: [],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers"],
  technologies: ["implanted-ports", "picc-lines", "allogeneic-hsct"],
  terms: ["central-venous-access", "febrile-neutropenia"],
  related: ["implanted-port-access-and-care", "central-line-insertion-bundle", "picc-and-tunnelled-line-care", "community-care-of-vascular-access-devices"],
  sections: ["supportive-care"],
  tags: ["protocol", "clabsi", "vascular-access", "paediatric"],
});
