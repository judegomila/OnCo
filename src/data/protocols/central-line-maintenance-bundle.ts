import { protocol } from "./helpers";

/*
 * Keeping a central venous catheter free of infection once it is in: the maintenance bundle, for adults and children
 * having cancer treatment.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every claim on the page was checked against it, with the quotes checked verbatim by script.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710), re-using the copy a sibling checker fetched on 17 November. A Europe PMC title search (2022 to
 *   2026) found no later compendium update.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017, including the July 2017 chlorhexidine dressing update): full text, the PDF at cdc.gov read with pdftotext,
 *   re-using the copy a sibling checker fetched from cdc.gov on 17 November. The CDC page still lists it as the
 *   current guideline.
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML
 *   (PMC7114876), sibling copy of 17 November. A Europe PMC search found no epic4.
 * - NICE CG139, recommendations page (HTML, fetched with curl on 17 November; published 28 March 2012, last updated
 *   15 February 2017).
 * - Zerr et al., Cancer 2021 (chlorhexidine bathing in children with cancer or allogeneic transplant), Wolf et al.,
 *   Lancet Infect Dis 2018 (ethanol lock therapy in paediatric cancer) and the 2023 paediatric ethanol lock
 *   meta-analysis (J Pediatr Pharmacol Ther): abstracts, Europe PMC REST.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not readable (the publisher's page gives no text
 *   to a script and no open copy was found). No step rests on it.
 * What the second pass changed: the weekly dressing rule is SHEA's rule for non-tunnelled lines, so the tunnelled and
 * port rule (epic3, NICE, CDC) is now stated beside it; CDC's chlorhexidine dressing recommendation is scoped to
 * short-term non-tunnelled lines wherever it appears; NICE's own intervals for community care (gauze every 24 hours,
 * continuous sets every 72 hours) are now on the page; the patient groups SHEA names for preventive lock therapy
 * replace a looser summary; reasons in the `why` lines that no source states were reworded to what the sources say;
 * and a step on reporting changes at the site was added from CDC.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed; where a sentence ends in a reference list, the quote stops
 * before it.
 */
export const centralLineMaintenanceBundle = protocol({
  id: "central-line-maintenance-bundle",
  name: "Central line maintenance bundle: preventing bloodstream infection after insertion",
  aka: ["CLABSI maintenance bundle", "central line care bundle", "Hickman line care", "PICC line care", "CVC maintenance", "line infection prevention", "CRBSI prevention"],
  domain: "infection-prevention",
  tldr: "A central line (a Hickman, PICC or port) can let germs into the blood, so every touch is planned. Hands are cleaned, the connector is scrubbed with antiseptic each time, the dressing is kept clean and dry and changed at least weekly while one is needed, and in hospital the team asks every day whether the line is still needed. Families are taught the techniques they need before going home.",
  simple: "A central line is a thin tube into a big vein. Germs on hands or on the end of the tube can cause a blood infection. Clean hands, scrub the end of the tube each time, keep the dressing dry and take the line out when it is no longer needed.",
  summary: "Maintenance rests on the SHEA/IDSA/APIC 2022 compendium (essential practices for all acute-care hospitals, graded by quality of evidence), CDC/HICPAC 2011 (updated 2017), epic3 (England, 2014) and NICE CG139 for care at home. Essential: education and competency assessment of staff (SHEA moderate); hand hygiene before and after any contact (epic3 Class A); aseptic technique (CDC IB); scrub hubs, needleless connectors and injection ports before each access (SHEA moderate; CDC IA), with alcoholic chlorhexidine preferred and friction for at least 5 seconds (SHEA) or cleaning for at least 15 seconds and drying (epic3 Class D/GPP); access only with sterile devices (CDC IA); 2% chlorhexidine in 70% isopropyl alcohol for site care at dressing changes (epic3 Class A); for non-tunnelled lines, transparent dressings changed at least every 7 days and gauze every 2 days, or immediately if soiled, loose or damp (SHEA moderate); for tunnelled lines and ports, dressings every 7 days until the site has healed (epic3 Class D/GPP; NICE); chlorhexidine-containing dressings over 2 months of age (SHEA high), which CDC 2017 recommends at IA only for short-term non-tunnelled lines from age 18 and leaves unresolved in children; daily review and removal of non-essential lines (SHEA moderate, CDC IA); continuous administration sets at intervals up to 7 days (SHEA high), or no more often than every 96 hours (epic3 Class A) or 72 hours (NICE); no systemic antimicrobial prophylaxis, routine antibiotic locks or routine line replacement; and unit surveillance of CLABSI per 1,000 catheter days.\n\nDaily chlorhexidine bathing is graded high for ICU patients over 2 months, but SHEA calls its role outside the ICU unclear and notes that the benefit suggested in adult haematology-oncology was not seen in children, and a Children's Oncology Group randomised trial (2021) found more CLABSI with chlorhexidine bathing in children with cancer, concluding that the data do not support routine use. Antiseptic-containing connector caps (moderate), antimicrobial lock therapy for the patient groups SHEA names (high) and vascular access teams (low) are additional approaches where rates stay high.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "intensive-care", "home", "community"],
  },
  population: "Adults and children with a central venous catheter (tunnelled lines such as Hickman and Broviac, PICCs, implanted ports and short-term non-tunnelled lines) during cancer treatment, in hospital and at home. SHEA scopes acute-care hospitals; NICE CG139 covers primary and community care. Several recommendations are scoped by the sources to one kind of line: SHEA's dressing intervals to non-tunnelled lines, and CDC's chlorhexidine dressing recommendation to short-term non-tunnelled lines. Infants under 2 months and premature neonates are named exceptions for chlorhexidine. Port needle access is covered in its own protocol.",
  trigger: "A central venous catheter is in place, from the first dressing after insertion until the line is removed.",
  steps: [
    {
      action: "Train and check the competence of every person who cares for the line, and teach the patient and family before discharge",
      why: "NICE asks for both in community care. SHEA requires education and competency assessment of staff who insert or look after lines (quality of evidence moderate), and epic3 says the same for hospitals in England (Class D/GPP).",
      source: "nice-cg139",
      quote: "Before discharge from hospital, patients and their carers should be taught any techniques they may need to use to prevent infection and safely manage a vascular access device.",
    },
    {
      action: "Clean hands with alcohol rub, or soap and water if soiled, before and after any contact with the line or its site",
      why: "epic3 names germs from the hands of staff, which contaminate the catheter hub during care, as one of the two usual routes of line infection. It also says gloves should not be worn as a substitute for hand hygiene.",
      source: "epic3",
      quote: "Hands must be decontaminated, with an alcohol-based hand rub or by washing with liquid soap and water if soiled or potentially contaminated with blood or body fluids, before and after any contact with the intravascular catheter or insertion site.",
      grade: "Class A",
    },
    {
      action: "Use an aseptic technique for site care and every time the line is accessed",
      why: "CDC grades this as strongly recommended, giving aseptic technique as its example of an accepted practice supported by limited evidence. NICE says an aseptic technique must be used for site care and when accessing the system in community care.",
      source: "cdc-2011",
      quote: "Maintain aseptic technique for the insertion and care of intravascular catheters",
      grade: "Category IB",
    },
    {
      action: "Before every access, scrub the hub, needleless connector or injection port with alcoholic chlorhexidine or 70% alcohol, with friction",
      why: "SHEA reports that about half of hubs, connectors and ports are colonised in ordinary practice. It prefers alcoholic chlorhexidine because it may go on working for longer than alcohol alone.",
      source: "shea-2022",
      quote: "Before accessing catheter hubs, needleless connectors, or injection ports, vigorously apply mechanical friction with an alcoholic chlorhexidine preparation, or 70% alcohol.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Scrub for at least 5 seconds (SHEA), or clean for at least 15 seconds and let it dry (epic3), whichever the local policy sets",
      why: "The two guidelines set different minimum times. SHEA says it is unclear whether its 5 seconds holds for connectors that were not tested; epic3 grades its 15 seconds as good practice (Class D/GPP).",
      source: "shea-2022",
      quote: "Apply mechanical friction for a minimum of 5 seconds to reduce contamination.",
    },
    {
      action: "Access the port or connector only with sterile devices",
      why: "CDC pairs the antiseptic scrub with sterile access devices as its way of minimising the risk of contamination.",
      source: "cdc-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "At each dressing change, clean the site with a single-use application of 2% chlorhexidine in 70% isopropyl alcohol and let it air dry",
      why: "epic3 says chlorhexidine is better at reducing the germs on the skin around the line, and gives povidone iodine in alcohol for people sensitive to chlorhexidine. The strength differs between guidelines: SHEA asks for a chlorhexidine-based antiseptic, CDC for more than 0.5% chlorhexidine with alcohol (Category IA), and NICE for chlorhexidine in 70% alcohol with no strength.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "On a non-tunnelled line, change transparent dressings at least every 7 days and gauze dressings every 2 days, and immediately if the dressing is soiled, loose or damp",
      why: "SHEA makes this recommendation for non-tunnelled lines in adults and children. For tunnelled lines and ports, epic3 and NICE say every 7 days until the insertion site has healed, after which epic3 says a dressing may no longer be required; CDC makes no recommendation on dressing a well-healed tunnelled site. For care at home, NICE says a gauze dressing is changed every 24 hours.",
      source: "shea-2022",
      quote: "For nontunneled CVCs in adults and children, change transparent dressings and perform site care with a chlorhexidine-based antiseptic at least every 7 days or immediately if the dressing is soiled, loose, or damp.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Use a chlorhexidine-containing dressing for patients over 2 months old, where the local policy and the kind of line allow",
      why: "SHEA grades this high, and adds that the benefit is unclear on well-healed sites of long-term lines and in babies under 2 months. CDC recommends these dressings only for short-term non-tunnelled lines in adults and makes no recommendation for children (see variants).",
      source: "shea-2022",
      quote: "Use chlorhexidine-containing dressings for CVCs in patients over 2 months of age (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not let the line or its site go under water; showering is allowed if the line and connector are protected, for example with an impermeable cover",
      why: "CDC permits showering when precautions are taken to reduce the chance of germs getting into the line.",
      source: "cdc-2011",
      quote: "Do not submerge the catheter or catheter site in water.",
      grade: "Category IB",
    },
    {
      action: "Encourage the patient to report any change at the line site or any new discomfort",
      why: "CDC also asks staff to look at the site at dressing changes, or feel it through the intact dressing, and to take the dressing off and examine the site if there is tenderness, fever with no obvious source or another sign of infection (Category IB).",
      source: "cdc-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "In hospital, ask every day whether the line is still needed, and take out any line that is not",
      why: "SHEA says that using central lines less reduces the risk of line infection. CDC says to promptly remove any catheter that is no longer essential (Category IA).",
      source: "shea-2022",
      quote: "Assess the need for continued intravascular access on a daily basis during multidisciplinary rounds.",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Replace continuous administration sets not used for blood, blood products or lipids at the interval the local policy sets, which guidelines put between 72 hours and 7 days; change blood sets when the transfusion episode ends or every 12 hours, whichever is sooner",
      why: "epic3 cites a Cochrane review that found no evidence that changing sets more often than every 96 hours reduces bloodstream infection. SHEA allows intervals up to 7 days (high); epic3 says not more often than every 96 hours (Class A) and NICE, for community care, 72 hours. The blood set rule is epic3's (Class D/GPP), as is changing sets for lipid-containing parenteral nutrition every 24 hours (Class D/GPP). SHEA leaves intermittently used sets unresolved.",
      source: "shea-2022",
      quote: "Routine replacement of administration sets not used for blood, blood products, or lipid formulations can be performed at intervals up to 7 days (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not give systemic antibiotics to prevent line infection while the line is in",
      why: "SHEA says systemic antimicrobial prophylaxis is not recommended, and epic3 agrees (Class A). epic3 reports that no studies showed that antibacterial or antifungal drugs, by mouth or by injection, reduced line infections in adults.",
      source: "shea-2022",
      quote: "Do not use antimicrobial prophylaxis for short-term or tunneled catheter insertion or while catheters are in situ (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not replace central lines on a schedule",
      why: "epic3 (Class A) and SHEA (quality of evidence high) both say routine replacement of central lines is not recommended as a way of preventing infection.",
      source: "epic3",
      quote: "Do not routinely replace central venous access devices to prevent catheter-related infection.",
      grade: "Class A",
    },
    {
      action: "Count line infections per 1,000 catheter days on each unit and report them back to the unit and its leaders",
      why: "SHEA asks hospitals to compare each unit's rate with its own earlier figures and with national rates, which shows whether the bundle is working.",
      source: "shea-2022",
      quote: "Measure unit-specific incidence of CLABSI (eg, CLABSI per 1,000 catheter days) and report the data on a regular basis to the units, physician and nursing leadership, and hospital administrators overseeing the units.",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "If the rate stays high despite these steps, consider antiseptic-containing caps on connectors, and antimicrobial lock therapy for the patient groups SHEA names",
      why: "SHEA recommends its additional approaches where rates are unacceptably high despite the essential practices, after weighing possible harms and costs. Because of concern about resistance it limits preventive locks (quality of evidence high) to long-term haemodialysis catheters with recurrent CLABSI, patients with limited venous access and recurrent CLABSI, and patients at heightened risk of severe consequences from a CLABSI. epic3 says locks should not be used routinely (Class D/GPP).",
      source: "shea-2022",
      quote: "Use an antiseptic-containing hub/connector cap/port protector to cover connectors (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
  ],
  bestInClass: {
    statement: "Run the essential practices of the SHEA/IDSA/APIC 2022 compendium as one bundle, with CDC and the UK guidelines filling in detail: staff training, hand hygiene and aseptic technique, hub and connector scrubbing before every access with alcoholic chlorhexidine preferred, chlorhexidine in alcohol for site care, dressings changed at least weekly or when compromised, a daily review of need, no preventive antibiotics or scheduled line changes, and unit surveillance. SHEA itself says more data are needed on which parts of a maintenance bundle are essential. Where the guidelines differ, both are stated: hub scrub time is at least 5 seconds in SHEA and at least 15 seconds with drying in epic3 (Class D/GPP); SHEA's dressing intervals are for non-tunnelled lines, while epic3 and NICE give 7 days for tunnelled lines and ports until the site has healed; gauze dressings are changed every 2 days in SHEA and CDC and every 24 hours in NICE; continuous administration sets may run up to 7 days in SHEA (high quality), 96 hours in epic3 (Class A) and 72 hours in NICE; chlorhexidine dressings are recommended from 2 months in SHEA (high quality), but in CDC 2017 only for short-term non-tunnelled lines from 18 years (Category IA), with no recommendation for children and a recommendation against them for premature neonates. Daily chlorhexidine bathing is an essential practice for ICU patients in SHEA, but it is not established for children with cancer: SHEA records that the benefit was not seen in them and the Children's Oncology Group trial found more infections with it.",
    sources: ["shea-2022", "cdc-2011", "epic3", "nice-cg139", "zerr-2021"],
  },
  variants: [
    {
      name: "Hub scrub of at least 15 seconds, then drying (epic3, England)",
      differs: "Decontaminates the hub with 2% chlorhexidine in 70% isopropyl alcohol for a minimum of 15 seconds and lets it dry before access, against SHEA's minimum of 5 seconds of friction. NICE CG139 asks for decontamination before and after access, with no time.",
      evidence: "epic3 grades it Class D/GPP (good practice). SHEA gives its 5 seconds under a recommendation graded moderate and notes that it is unclear whether the time can be generalised to connectors that were not tested.",
      sources: ["epic3", "shea-2022", "nice-cg139"],
    },
    {
      name: "Dressing and administration set intervals in community care (NICE CG139)",
      differs: "NICE changes the transparent dressing on a central line every 7 days, or sooner if it is no longer intact or moisture collects under it, and dressings on tunnelled or implanted sites every 7 days until the site has healed. Where gauze is used, NICE changes it every 24 hours, or sooner if soiled, against every 2 days in SHEA and CDC. NICE says continuous administration sets need not be replaced more often than at 72-hour intervals, against 96 hours in epic3 and up to 7 days in SHEA, and blood sets every 12 hours or according to the manufacturer.",
      evidence: "NICE does not grade its recommendations. The gauze recommendation is marked new in 2012; the administration set recommendations date from 2003.",
      sources: ["nice-cg139", "shea-2022", "cdc-2011", "epic3"],
    },
    {
      name: "Chlorhexidine dressings by age (CDC/HICPAC 2017 update)",
      differs: "Recommends chlorhexidine-impregnated dressings with an FDA-cleared label for short-term non-tunnelled CVCs in patients aged 18 and over, recommends against them in premature neonates because of the risk of serious skin reactions, and makes no recommendation for other children. SHEA recommends chlorhexidine-containing dressings from 2 months. epic3 says to consider a chlorhexidine-impregnated sponge dressing in adults with a central venous catheter.",
      evidence: "CDC Category IA for adults, IC against in premature neonates, unresolved issue for other children; SHEA quality of evidence high; epic3 Class B.",
      sources: ["cdc-2011", "shea-2022", "epic3"],
    },
    {
      name: "Daily chlorhexidine bathing, and why it is not routine for children with cancer",
      differs: "SHEA makes daily chlorhexidine bathing an essential practice for ICU patients over 2 months, CDC 2011 suggests a 2% chlorhexidine wash for daily skin cleansing (Category II), and epic3 says to consider daily chlorhexidine cleansing in adults with a central venous catheter (Class B). In a Children's Oncology Group double-blind trial with 174 evaluable children with cancer or undergoing transplant, CLABSI was 5.44 per 1,000 line days with chlorhexidine against 3.10 with control, and skin staphylococci with reduced chlorhexidine susceptibility were more often acquired.",
      evidence: "SHEA quality of evidence high for ICU patients; it calls the role outside the ICU unclear and notes that the benefit suggested in adult haematology-oncology was not seen in children with similar conditions. The paediatric trial stopped early because of poor accrual; its authors concluded that the data do not support routine chlorhexidine bathing in children with cancer or having an allogeneic transplant.",
      sources: ["shea-2022", "cdc-2011", "epic3", "zerr-2021"],
    },
    {
      name: "Ethanol locks in children with cancer",
      differs: "The line is filled with 70% ethanol for a set time to treat a line infection or to prevent the next one. In the randomised trial the lock stayed in each lumen for 2 to 4 hours, daily for 5 days and then on up to 3 days a week for 24 weeks.",
      evidence: "A randomised double-blind trial in 94 children and young people with cancer or haematological disorders and a new CLABSI met its futility criteria: treatment failure was 44% with ethanol and 43% with placebo, and line blockage needing a clot-dissolving drug was more common with ethanol (58% against 33%); its authors do not recommend routine ethanol locks for treatment or secondary prophylaxis in this group. A 2023 meta-analysis that pooled infection counts before and after ethanol locks reported fewer infections with them, and noted more thrombosis and more catheter breakage, repair and replacement in several studies. SHEA lists antimicrobial lock therapy as an additional approach for named patient groups and says the adverse effects of ethanol locks should be carefully considered before use.",
      sources: ["wolf-2018", "ethanol-meta-2023", "shea-2022"],
    },
  ],
  grades: [
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Decontaminate the hub for at least 15 seconds and allow to dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Chlorhexidine-containing dressings over 2 months of age", grade: "Quality of Evidence: HIGH", source: "shea-2022" },
    { claim: "Dressings on tunnelled or implanted sites every 7 days until the site has healed", grade: "Class D/GPP", source: "epic3", quote: "Dressings used on tunnelled or implanted catheter insertion sites should be replaced every 7 days until the insertion site has healed unless there is an indication to change them sooner." },
    { claim: "Bathe ICU patients over 2 months daily with chlorhexidine", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Bathe ICU patients >2 months of age with a chlorhexidine preparation on a daily basis (Quality of Evidence: HIGH)" },
    { claim: "Promptly remove any line that is no longer essential", grade: "Category IA", source: "cdc-2011", quote: "Promptly remove any intravascular catheter that is no longer essential" },
    { claim: "Administration sets in continuous use need not be replaced more often than every 96 hours", grade: "Class A", source: "epic3", quote: "Administration sets in continuous use do not need to be replaced more frequently than every 96 h, unless device-specific recommendations from the manufacturer indicate otherwise, they become disconnected or the intravascular access device is replaced." },
    { claim: "Blood administration sets changed when the transfusion episode is complete or every 12 hours", grade: "Class D/GPP", source: "epic3", quote: "Administration sets for blood and blood components should be changed when the transfusion episode is complete or every 12 h (whichever is sooner)." },
    { claim: "Use bundled performance improvement initiatives", grade: "Category IB", source: "cdc-2011" },
    { claim: "Do not routinely replace central lines", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Do not routinely replace CVCs or arterial catheters (Quality of Evidence: HIGH)" },
    { claim: "Antimicrobial lock therapy for long-term lines (additional approach, for named patient groups)", grade: "Quality of Evidence: HIGH", source: "shea-2022", quote: "Use antimicrobial lock therapy for long-term CVCs (Quality of Evidence: HIGH)" },
    { claim: "Antibiotic lock solutions should not be used routinely", grade: "Class D/GPP", source: "epic3", quote: "Antimicrobial lock solutions should not be used routinely to prevent catheter-related bloodstream infections." },
  ],
  sources: [
    { key: "shea-2022", label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update", publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)", year: 2022, url: "https://europepmc.org/article/PMC/PMC9096710", doi: "10.1017/ice.2022.87", gradingScheme: "Quality of evidence HIGH, MODERATE or LOW; each recommendation classed as an essential practice (all acute-care hospitals), an additional approach (where rates stay high), not routine, or unresolved.", read: "full-text", accessed: "2026-11-17" },
    { key: "cdc-2011", label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)", publisher: "CDC/HICPAC", year: 2011, url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf", doi: "10.1093/cid/cir257", gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.", read: "full-text", accessed: "2026-11-17" },
    { key: "epic3", label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England", publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)", year: 2014, url: "https://europepmc.org/article/PMC/PMC7114876", doi: "10.1016/S0195-6701(13)60012-2", gradingScheme: "SIGN-style classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point), H&S (health and safety legislation).", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg139", label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations (published 2012, last updated 15 February 2017)", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.", read: "full-text", accessed: "2026-11-17" },
    { key: "zerr-2021", label: "Chlorhexidine gluconate bathing in children with cancer or those undergoing hematopoietic stem cell transplantation: A double-blinded randomized controlled trial from the Children's Oncology Group", publisher: "Cancer", year: 2021, url: "https://europepmc.org/article/MED/33079403", doi: "10.1002/cncr.33271", read: "abstract", accessed: "2026-11-17" },
    { key: "wolf-2018", label: "Treatment and secondary prophylaxis with ethanol lock therapy for central line-associated bloodstream infection in paediatric cancer: a randomised, double-blind, controlled trial", publisher: "The Lancet Infectious Diseases", year: 2018, url: "https://europepmc.org/article/MED/29884572", doi: "10.1016/s1473-3099(18)30224-x", read: "abstract", accessed: "2026-11-17" },
    { key: "ethanol-meta-2023", label: "Ethanol Lock for Prevention of CVC-Related Bloodstream Infection in Pediatric Patients: A Systematic Review and Meta-Analysis", publisher: "Journal of Pediatric Pharmacology and Therapeutics", year: 2023, url: "https://europepmc.org/article/MED/38130502", doi: "10.5863/1551-6776-28.5.386", read: "abstract", accessed: "2026-11-17" },
    { key: "ins-2024", label: "Infusion Therapy Standards of Practice, 9th Edition", publisher: "Infusion Nurses Society (Journal of Infusion Nursing)", year: 2024, url: "https://doi.org/10.1097/NAN.0000000000000532", doi: "10.1097/NAN.0000000000000532", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The INS Infusion Therapy Standards of Practice (9th edition, 2024), the main nursing standard for line care, could not be read: on 17 November 2026 the publisher's page still gave no text to a script and no open copy was found. No step rests on it.",
    "No current graded guideline specific to central line care in children with cancer was found. The Children's Oncology Group archived its central venous catheter care guideline in August 2018. The UK Children's Cancer and Leukaemia Group publishes a community care page on central lines, which the paediatric central line protocol uses; it is not a graded guideline.",
    "The paediatric chlorhexidine bathing and ethanol lock trials, and the ethanol lock meta-analysis, were read as abstracts only.",
    "The guidelines set different minimum hub scrub times (5 or 15 seconds) and SHEA notes it is unclear whether the 5-second figure applies to connectors not tested; the guidelines do not reconcile the two figures.",
    "SHEA's weekly dressing recommendation is written for non-tunnelled lines. For a well-healed tunnelled line, epic3 says a dressing may no longer be required and CDC makes no recommendation, so whether a healed site is dressed is left to local policy.",
    "The guidelines give three different intervals for continuous administration sets (72 hours in NICE, a 2003 recommendation; 96 hours in epic3; up to 7 days in SHEA) and two for gauze dressings (24 hours in NICE; 2 days in SHEA and CDC). How often to change intermittently used administration sets is unresolved in SHEA.",
    "SHEA says more data are needed to determine which components of a maintenance bundle are essential in reducing risk.",
    "None of these guidelines gives patients a list of warning signs with a time limit for calling. CDC says only to encourage patients to report any changes at the site or new discomfort (Category II); the protocol on suspected central line infection covers what happens next.",
    "None of these guidelines asks for a mask on the patient or the patient turning their head away during dressing changes or hub access; masks appear only for line insertion and, in epic3 and NICE, as protective equipment for staff.",
    "A Europe PMC search on 17 November 2026 found a 2026 practice guideline on preventing and treating CLABSI in the Journal of Intensive Medicine (first published in Chinese in 2025). It was not read for this page.",
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
