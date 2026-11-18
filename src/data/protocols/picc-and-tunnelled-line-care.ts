import { protocol } from "./helpers";

/*
 * Looking after a PICC or a tunnelled central line (Hickman type) between uses: the dressing and site care, cleaning
 * the hub or needleless connector, flushing and locking, securement, and living with the line. Implanted ports have
 * their own protocol (implanted-port-access-and-care), which shares most of these sources.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text, and every quote checked by script
 * (whitespace and line-break hyphenation normalised, nothing else). What was read, and how:
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the cdc.gov PDF read with pdftotext, re-using the copy a sibling checker fetched from cdc.gov on
 *   17 November. The PDF carries the July 2017 chlorhexidine dressing update in its text, so the earlier note that
 *   the update could not be read was wrong.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC XML (PMC9096710),
 *   sibling copy fetched 17 November.
 * - epic3 (Loveday et al., J Hosp Infect 2014): full text, Europe PMC XML (PMC7114876), sibling copy fetched
 *   17 November. No epic4 is indexed in Europe PMC.
 * - NICE CG139 recommendations and update information (2012, last updated February 2017): full text, sibling copy
 *   fetched 17 November.
 * - NICE HealthTech guidance 379 (Tegaderm CHG; published 2015, last updated September 2019) and 510 (Curos, May
 *   2019): recommendation and overview pages, fetched 17 November with curl.
 * - Macmillan Cancer Support, "PICC lines" and "Central lines" (reviewed March 2022): patient pages, fetched
 *   17 November with curl. Added for the warning signs, the weekly flush and the advice on water.
 * - Cochrane review CD008462.pub4 (2022), heparin versus saline locks in adults: abstract only (Europe PMC); Crossref
 *   shows no later version.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015): read on 11 November 2026 from an
 *   Internet Archive capture; on 17 November the publisher refused a script and no open copy was found, so what rests
 *   on it (one sentence and its grade) is marked as not re-read.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable; named, nothing rests on it.
 *
 * Main changes in this pass: the gauze interval was attributed to NICE and epic3, but NICE says 24 hours and epic3
 * gives no interval; SHEA lists sutureless securement as unresolved, which the page did not say; the Cochrane
 * certainty for patency duration is low, not very low; the patient advice on fever, baths and swimming went beyond
 * the sources and now follows CDC and Macmillan; several reasons in `why` that no source states were reworded.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence ends in a reference list, the quote stops
 * before it.
 */
export const piccAndTunnelledLineCare = protocol({
  id: "picc-and-tunnelled-line-care",
  name: "PICC and tunnelled central line care: dressing, hub cleaning, flushing and living with the line",
  aka: ["PICC care", "PICC dressing change", "Hickman line care", "tunnelled line care", "central line dressing", "scrub the hub", "needleless connector care", "bionector change", "line flush", "CVC maintenance", "CHG dressing"],
  domain: "vascular-access",
  tldr: "A PICC (a thin tube in the arm) or a tunnelled line (in the chest) needs regular care: a dressing changed about once a week, the end cap cleaned before every use, and a salt-water flush to keep it open. Do not let the line or the skin around it go under water; a waterproof cover is used for showers. Tell your team about redness, swelling, pain, fluid at the site or a high temperature.",
  simple: "Keep your line's dressing clean and dry, and let trained people change it about once a week. Use a waterproof cover in the shower and do not let the line go under water. Contact your team about a high temperature, or redness, swelling, pain or fluid where the line goes in.",
  summary: "Line care rests on general central line infection-prevention guidance rather than oncology trials. Hand hygiene (CDC IB) and aseptic technique (NICE CG139, CDC IB). Skin antisepsis at dressing changes with 2% chlorhexidine in 70% isopropyl alcohol, allowed to air dry (epic3 Class A; CDC IA for above 0.5% chlorhexidine with alcohol; NICE names chlorhexidine in 70% alcohol without a strength). A sterile transparent or gauze dressing covers the site (CDC IA); gauze while the site bleeds or oozes or the patient sweats (CDC II; NICE: consider). For non-tunnelled lines, which include most PICCs, transparent dressings are changed at least every 7 days and sooner if soiled, loose or damp (SHEA moderate; CDC IB for short-term lines; NICE and epic3 every 7 days). Gauze is changed every 2 days in SHEA and CDC (CDC II) and every 24 hours in NICE. For tunnelled or implanted lines CDC says no more than once a week until the site heals (II), and epic3 (Class D/GPP) and NICE say every 7 days until healed; neither CDC nor epic3 settles whether a healed tunnelled exit site needs a dressing at all.\n\nChlorhexidine-containing dressings are an essential practice in SHEA 2022 (high quality, acute care, over 2 months of age); CDC's July 2017 update recommends them for short-term, non-tunnelled lines in adults (IA); epic3 says consider a chlorhexidine sponge dressing in adults (Class B); NICE says Tegaderm CHG should be considered for critically ill adults in intensive care or high dependency units. SHEA says their value for long-term catheters in well-healed sites is unclear. Hubs, needleless connectors and injection ports are disinfected before every access (CDC IA; SHEA moderate; NICE says before and after), with at least 5 seconds of friction (SHEA) or at least 15 seconds and drying (epic3 Class D/GPP). Antiseptic caps are an additional practice in SHEA (moderate); NICE found insufficient evidence for routine use of Curos. Lumens are flushed and locked with sterile 0.9% saline (epic3 Class A for frequently accessed lumens; NICE: preferably); NICE adds heparin flushes for implanted ports or open-ended lumens when the manufacturer recommends them. The Cochrane review (2022) found heparin locks may give fewer occlusions on low-certainty evidence and called the result uncertain. ESMO (2015, read on 11 November 2026 and not re-read on 17 November 2026) recommends a saline flush after any infusion or blood sample [II, B]. Macmillan describes a weekly flush, cap change and dressing change when the line is not in use. Sutureless securement is suggested by CDC (II), while SHEA lists it as unresolved. No submersion; showers with the line covered (CDC IB). No antibiotic ointment on the site (CDC IB). Remove the line when it is no longer needed (SHEA moderate).",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults with cancer who have a PICC or a tunnelled, cuffed central venous catheter. The recommendations come from infection-prevention guidance written for all central lines, not for cancer: CDC and epic3 for hospitals, SHEA for acute-care hospitals, and NICE CG139 for primary and community care. SHEA's dressing intervals are for non-tunnelled lines, and CDC's chlorhexidine dressing recommendation is for short-term, non-tunnelled lines in adults. Children, neonates and dialysis catheters follow their own guidance.",
  trigger: "Routine care of a PICC or tunnelled line: each access, each dressing change and each maintenance flush.",
  steps: [
    {
      action: "Clean your hands before and after touching the line, the site or the dressing",
      why: "epic3 says germs from the hands of healthcare workers can contaminate the hub during care, and that this is one of the two usual causes of a line bloodstream infection.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Use aseptic technique for site care and whenever the line is accessed",
      why: "The end of the line lies in a large vein near the heart, so only clean, uncontaminated equipment should touch the site or the connector.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system",
      grade: "[new 2012]",
    },
    {
      action: "Look at the site at each dressing change, or feel it through an intact dressing, and take the dressing off to examine it if there is tenderness or a fever with no obvious source",
      why: "CDC says tenderness at the site, a fever without an obvious source or other signs of infection call for a thorough look at the site.",
      source: "cdc-hicpac-2011",
      quote: "Monitor the catheter sites visually when changing the dressing or by palpation through an intact dressing on a regular basis, depending on the clinical situation of the individual patient.",
      grade: "Category IB",
    },
    {
      action: "Clean the site at dressing changes with 2% chlorhexidine in 70% isopropyl alcohol and let it air dry",
      why: "epic3 says chlorhexidine is better than other antiseptics at reducing the number of germs on the skin around a line. For people sensitive to chlorhexidine it names povidone iodine in alcohol.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "Cover the site with a sterile transparent dressing or sterile gauze; use gauze while the site bleeds or oozes or the person is sweating heavily",
      why: "CDC says a transparent dressing lets the site be seen all the time and needs changing less often than gauze. The Category IA grade is for covering the site with either dressing; using gauze until bleeding, oozing or sweating settles is Category II.",
      source: "cdc-hicpac-2011",
      quote: "Use either sterile gauze or sterile, transparent, semipermeable dressing to cover the catheter site",
      grade: "Category IA",
    },
    {
      action: "On a PICC or other non-tunnelled line, change a transparent dressing at least every 7 days and a gauze dressing every 2 days, and at once if soiled, loose or damp; on a tunnelled line, change the dressing weekly until the site has healed",
      why: "SHEA's intervals are for non-tunnelled lines. NICE says to change gauze every 24 hours. For tunnelled lines CDC says no more than once a week until the insertion site has healed (Category II), and epic3 and NICE say every 7 days until healed.",
      source: "shea-clabsi-2022",
      quote: "For non-tunneled CVCs in adults and children, change transparent dressings and perform site care with a chlorhexidine-based antiseptic at least every 7 days or immediately if the dressing is soiled, loose, or damp. Change gauze dressings every 2 days or earlier if the dressing is soiled, loose, or damp (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Use a chlorhexidine-containing dressing where local policy includes one (SHEA: use; epic3: consider)",
      why: "SHEA made these dressings an essential practice for acute-care hospitals in 2022, but says it is unclear whether they reduce infection in long-term catheters with well-healed sites. CDC recommends them for short-term, non-tunnelled lines in adults.",
      source: "shea-clabsi-2022",
      quote: "Use chlorhexidine-containing dressings for CVCs in patients over 2 months of age (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Secure the line with a sutureless securement device (CDC suggests this; SHEA calls it unresolved)",
      why: "CDC says these devices avoid disturbing the skin around the entry site. SHEA 2022 lists sutureless securement as an unresolved issue and says its effect on line bloodstream infection is unknown. Macmillan says a tunnelled line has a stitch for about 3 weeks while tissue grows around its cuff.",
      source: "cdc-hicpac-2011",
      quote: "Use a sutureless securement device to reduce the risk of infection for intravascular catheters",
      grade: "Category II",
    },
    {
      action: "Scrub the hub or needleless connector with an antiseptic before every use, and access it only with sterile devices",
      why: "SHEA says about half of hubs, connectors and ports are colonised with germs under standard practice.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "Scrub with friction for at least 5 seconds (SHEA) or at least 15 seconds (epic3), and let it dry before connecting (epic3)",
      why: "SHEA says friction reduces contamination, and that it is unclear whether 5 seconds applies to connectors that were not tested. SHEA prefers alcoholic chlorhexidine to 70% alcohol; epic3 names 2% chlorhexidine in 70% isopropyl alcohol.",
      source: "shea-clabsi-2022",
      quote: "Apply mechanical friction for a minimum of 5 seconds to reduce contamination.",
    },
    {
      action: "Change needleless connectors no more often than every 72 hours, or as the maker recommends",
      why: "CDC found no benefit in changing them more often than every 72 hours. NICE says to follow the manufacturer's recommendations, and Macmillan tells patients the caps are changed each week.",
      source: "cdc-hicpac-2011",
      quote: "Change needleless connectors no more frequently than every 72 hours or according to manufacturers’ Recommendations for the purpose of reducing infection rates",
      grade: "Category II",
    },
    {
      action: "Flush and lock the lumens with sterile 0.9% saline",
      why: "Macmillan tells patients that a line not in use can block, and that a small amount of fluid is flushed in to stop this, usually once a week. epic3's recommendation is for lumens that are accessed frequently; NICE says saline preferably, with heparin where the manufacturer of a port or open-ended line recommends it.",
      source: "epic3",
      quote: "Use sterile normal saline for injection to flush and lock catheter lumens that are accessed frequently.",
      grade: "Class A",
    },
    {
      action: "Do not put antibiotic ointment or cream on the site",
      why: "CDC says it may promote fungal infection and antimicrobial resistance.",
      source: "cdc-hicpac-2011",
      quote: "Do not use topical antibiotic ointment or creams on insertion sites, except for dialysis catheters, because of their potential to promote fungal infections and antimicrobial resistance",
      grade: "Category IB",
    },
    {
      action: "Do not let the line or its site go under water; allow showers with the line and connector under a waterproof cover",
      why: "The cover is there to keep germs out of the line. Macmillan says a shower or bath is safe with a waterproof cover, that the exit site of a tunnelled line should stay out of the bath water, and that swimming should usually be avoided.",
      source: "cdc-hicpac-2011",
      quote: "Do not submerge the catheter or catheter site in water. Showering should be permitted if precautions can be taken to reduce the likelihood of introducing organisms into the catheter (e.g., if the catheter and connecting device are protected with an impermeable cover during the shower)",
      grade: "Category IB",
    },
    {
      action: "Ask the patient to report any change at the site or new discomfort: redness, swelling or pain, discoloured fluid, or a high temperature",
      why: "Macmillan gives patients this list as the signs of an infection in the line or where it goes into the vein, and says to contact the hospital doctor or nurse.",
      source: "cdc-hicpac-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "Take the line out when it is no longer needed",
      why: "SHEA says using central lines less reduces line bloodstream infection, and lists a long time with a catheter in place as a risk factor.",
      source: "shea-clabsi-2022",
      quote: "Remove nonessential catheters (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
  ],
  bestInClass: {
    statement: "Hand hygiene and aseptic technique; 2% chlorhexidine in 70% isopropyl alcohol on the skin, air dried (epic3 Class A); a sterile transparent dressing (gauze while bleeding or oozing) changed at least every 7 days and sooner if compromised (SHEA moderate for non-tunnelled lines; NICE; epic3; CDC IB for damp or loose dressings), with gauze changed every 2 days (SHEA, CDC) or every 24 hours (NICE); a chlorhexidine-containing dressing (SHEA high quality, acute care, over 2 months of age; CDC IA for short-term non-tunnelled lines in adults; epic3 Class B, consider); hub scrubbed before every access (CDC IA), for at least 5 seconds (SHEA) or 15 seconds (epic3 Class D/GPP); lumens flushed and locked with saline (epic3 Class A for frequently accessed lumens; NICE: preferably); no submersion (CDC IB). The guidance differs on chlorhexidine dressings for long-term lines in healed sites (SHEA: benefit unclear), on sutureless securement (CDC II; SHEA: unresolved) and on antiseptic caps (SHEA additional practice; NICE: insufficient evidence for routine use). ESMO's flush after every use [II, B] was read on 11 November 2026 and could not be re-read on 17 November 2026.",
    sources: ["cdc-hicpac-2011", "shea-clabsi-2022", "epic3", "nice-cg139", "esmo-2015", "nice-htg379", "nice-htg510"],
  },
  variants: [
    {
      name: "Antiseptic (disinfecting) caps on needleless connectors",
      differs: "A cap containing antiseptic is left on each needleless connector between uses, replacing or adding to the manual scrub.",
      evidence: "SHEA 2022 lists an antiseptic-containing cap as an additional approach (quality of evidence moderate in its list; its text calls the evidence high-level) because caps are not considered superior to manual disinfection, and lists as unresolved whether a scrub is still needed under a cap. NICE (HealthTech guidance 510, 2019) found Curos promising but the evidence insufficient for routine NHS adoption, and recommended research including people managed in the community; it notes that Curos can stay in place for up to 7 days but must be replaced each time the line is used.",
      sources: ["shea-clabsi-2022", "nice-htg510"],
    },
    {
      name: "Chlorhexidine gel or sponge dressings",
      differs: "Uses a dressing that releases chlorhexidine at the insertion site instead of a standard transparent dressing.",
      evidence: "SHEA 2022: essential practice, high quality, over 2 months of age, but unclear for long-term catheters in well-healed sites. CDC (July 2017 update): recommended for short-term, non-tunnelled lines in adults (Category IA); not recommended for premature neonates (IC); unresolved for other patients under 18. epic3 IVAD20: consider a chlorhexidine sponge dressing in adults (Class B). NICE HealthTech guidance 379 says Tegaderm CHG should be considered for critically ill adults who need a central venous or arterial catheter in intensive care or high dependency units, estimating a saving of £93 per patient at a baseline infection rate of 1.48 per 1,000 catheter days.",
      sources: ["shea-clabsi-2022", "cdc-hicpac-2011", "epic3", "nice-htg379"],
    },
    {
      name: "Heparin lock",
      differs: "Locks the line with heparinised saline instead of saline alone.",
      evidence: "Cochrane 2022 (12 RCTs, 2422 adults, two studies in oncology patients): heparin may give fewer occlusions but this is uncertain (RR 0.70, 95% CI 0.51 to 0.95, low certainty), with no clear difference in patency duration (low certainty) or in line bloodstream infection, mortality, bleeding or heparin-induced thrombocytopenia (very low certainty). epic3 recommends saline for frequently accessed lumens (Class A). NICE CG139 says saline preferably, and heparin flushes for implanted ports or open-ended catheter lumens when the manufacturer recommends them.",
      sources: ["cochrane-heparin-saline-2022", "epic3", "nice-cg139"],
    },
    {
      name: "No dressing on a healed tunnelled exit site",
      differs: "Leaves the well-healed exit site of a cuffed tunnelled line uncovered.",
      evidence: "epic3 says a dressing may no longer be required once the site has healed (Class D/GPP); CDC makes no recommendation (unresolved issue). Macmillan's page for patients says the exit site is cleaned once a week, and a dressing, if there is one, changed once a week.",
      sources: ["epic3", "cdc-hicpac-2011", "macmillan-central-lines"],
    },
  ],
  grades: [
    { claim: "Replace a dressing that becomes damp, loosened or visibly soiled", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Replace catheter site dressing if the dressing becomes damp, loosened, or visibly soiled" },
    { claim: "Tunnelled or implanted sites: transparent dressings no more than weekly until healed", grade: "Category II", source: "cdc-hicpac-2011", quote: "Replace transparent dressings used on tunneled or implanted CVC sites no more than once per week (unless the dressing is soiled or loose), until the insertion site has healed." },
    { claim: "No recommendation on dressing well-healed exit sites of long-term tunnelled lines", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made regarding the necessity for any dressing on well-healed exit sites of long-term cuffed and tunneled CVCs." },
    { claim: "Tunnelled or implanted sites: dressing every 7 days until healed; may not be needed once healed", grade: "Class D/GPP", source: "epic3", quote: "Dressings used on tunnelled or implanted catheter insertion sites should be replaced every 7 days until the insertion site has healed unless there is an indication to change them sooner. A dressing may no longer be required once the insertion site has healed." },
    { claim: "Tunnelled or implanted sites: dressing every 7 days until healed (NICE)", grade: "[2003]", source: "nice-cg139", quote: "Dressings used on tunnelled or implanted central venous catheter sites should be replaced every 7 days until the insertion site has healed, unless there is an indication to change them sooner." },
    { claim: "Central line transparent dressing every 7 days, or sooner if not intact or moist (NICE)", grade: "[2012]", source: "nice-cg139", quote: "Change the transparent semipermeable membrane dressing covering a central venous access device insertion site every 7 days, or sooner if the dressing is no longer intact or moisture collects under it." },
    { claim: "Gauze dressing changed every 24 hours (NICE)", grade: "[new 2012]", source: "nice-cg139", quote: "change it every 24 hours, or sooner if it is soiled and replace it with a sterile transparent semipermeable membrane dressing as soon as possible." },
    { claim: "Consider a chlorhexidine-impregnated sponge dressing in adults with a central line", grade: "Class B", source: "epic3", quote: "Consider the use of a chlorhexidine-impregnated sponge dressing in adult patients with a central venous catheter as a strategy to reduce catheter-related bloodstream infection." },
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Clean the hub for at least 15 seconds and let it dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Sutureless securement: effect on line bloodstream infection unknown", grade: "Unresolved issue", source: "shea-clabsi-2022", quote: "The impact of sutureless securement devices in reducing CLABSI is unknown." },
    { claim: "Saline preferred to flush and lock lumens (NICE)", grade: "[2003]", source: "nice-cg139", quote: "Preferably, a sterile 0.9 percent sodium chloride injection should be used to flush and lock catheter lumens." },
    { claim: "Heparin flush for implanted ports or open-ended lumens when the manufacturer recommends it (NICE)", grade: "[2003]", source: "nice-cg139", quote: "When recommended by the manufacturer, implanted ports or opened-ended catheter lumens should be flushed and locked with heparin sodium flush solutions." },
    { claim: "Saline flush after any infusion or blood sample (read on 11 November 2026; not re-read on 17 November 2026)", grade: "[II, B]", source: "esmo-2015", quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended" },
    { claim: "Daily 2% chlorhexidine skin wash", grade: "Category II", source: "cdc-hicpac-2011", quote: "Use a 2% chlorhexidine wash for daily skin cleansing to reduce CRBSI" },
    { claim: "Curos disinfecting cap: insufficient evidence for routine adoption", grade: "NICE HealthTech recommendation (not graded)", source: "nice-htg510", quote: "Curos disinfecting cap shows promise for preventing infections when using needleless connectors, but there is currently insufficient evidence to support the case for routine adoption in the NHS." },
  ],
  sources: [
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue (insufficient evidence or no consensus).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "shea-clabsi-2022",
      label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update",
      publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology, Buetti et al.)",
      year: 2022,
      url: "https://doi.org/10.1017/ice.2022.87",
      doi: "10.1017/ice.2022.87",
      gradingScheme: "Quality of evidence HIGH, MODERATE or LOW, with each recommendation classed as an essential practice, an additional approach or an unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "epic3",
      label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England",
      publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)",
      year: 2014,
      url: "https://doi.org/10.1016/S0195-6701(13)60012-2",
      doi: "10.1016/S0195-6701(13)60012-2",
      gradingScheme: "SIGN-style classes A (1++ or consistent 1+ evidence) to D (level 3 or 4 evidence), GPP (good practice point from the guideline group's experience), H&S (health and safety legislation).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-cg139",
      label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations (published March 2012, last updated February 2017)",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2003], [2003, amended 2012], [2012], [new 2012]).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Sousa et al.)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-htg379",
      label: "Tegaderm CHG securement dressing for vascular access sites in critically ill adults (HealthTech guidance 379, formerly MTG25; published July 2015, last updated September 2019)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg379/chapter/1-Recommendations",
      gradingScheme: "NICE technology recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-htg510",
      label: "Curos for preventing infections when using needleless connectors (HealthTech guidance 510, formerly MTG44, May 2019)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg510/chapter/1-Recommendations",
      gradingScheme: "NICE technology recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cochrane-heparin-saline-2022",
      label: "Heparin versus 0.9% sodium chloride locking for prevention of occlusion in central venous catheters in adults",
      publisher: "Cochrane Database of Systematic Reviews",
      year: 2022,
      url: "https://doi.org/10.1002/14651858.CD008462.pub4",
      doi: "10.1002/14651858.CD008462.pub4",
      gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-picc",
      label: "PICC lines (patient information, reviewed March 2022)",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/picc-lines",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-central-lines",
      label: "Central lines (patient information, reviewed March 2022)",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/central-lines",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ins-2024",
      label: "Infusion Therapy Standards of Practice, 9th Edition",
      publisher: "Infusion Nurses Society (Journal of Infusion Nursing)",
      year: 2024,
      url: "https://doi.org/10.1097/NAN.0000000000000532",
      doi: "10.1097/NAN.0000000000000532",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["picc-lines", "catheter-securement-devices", "needleless-connector-disinfecting-caps", "catheter-lock-solutions", "infusion-devices-vascular-access"],
  terms: ["central-venous-access"],
  related: ["implanted-port-access-and-care", "suspected-central-line-infection", "catheter-related-thrombosis-in-cancer", "central-line-maintenance-bundle", "community-care-of-vascular-access-devices"],
  upgrades: ["idea-upgrade-antiseptic-caps-for-long-term-lines-at-home"],
  gaps: [
    "The guidance was written for hospitals (CDC, SHEA, epic3) or for community care in general (NICE CG139); trials of dressing type, interval and hub care in people with cancer living at home with a PICC or tunnelled line are few. SHEA's dressing intervals are stated for non-tunnelled lines.",
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher refused a script and no open copy was found. Its sentence recommending a saline flush after any infusion or blood sample, and the grade [II, B], were read on 11 November 2026 and are not re-verified. No step on this page rests on ESMO.",
    "No source read gives a flush volume, a syringe size, a heparin strength or a flush interval. The only interval read is Macmillan's description for patients of a flush that is usually done once a week when the line is not in use.",
    "The INS Infusion Therapy Standards of Practice, 9th edition (2024), the most detailed nursing standard on PICC and tunnelled line care, could not be read. Nothing here rests on it.",
    "Gauze dressing intervals differ: every 2 days in SHEA and CDC, every 24 hours in NICE CG139. epic3 gives no interval for gauze.",
    "Sutureless securement is a Category II suggestion in CDC (2011) and an unresolved issue in SHEA (2022), which says its effect on line bloodstream infection is unknown.",
    "CDC's July 2017 update recommends chlorhexidine-impregnated dressings only for short-term, non-tunnelled lines in adults; it does not address PICCs kept for months or tunnelled lines, and SHEA says the benefit for long-term catheters in well-healed sites is unclear. The separate CDC pages with the evidence summary for that update were not read.",
    "Scrub time differs between sources (at least 5 seconds in SHEA, at least 15 seconds in epic3); no trial in oncology settles it.",
    "Whether a healed tunnelled exit site needs a dressing is unresolved in CDC and left to judgement in epic3.",
    "Advice on water differs. CDC says do not submerge the catheter or its site. Macmillan says a shower or bath is safe with a waterproof cover, that the exit site of a tunnelled line should be kept out of bath water and that swimming should usually be avoided; Cancer Research UK's PICC page, read on 17 November 2026 and not cited here, says waterproof covers are good enough for swimming but to check with the doctor first.",
    "No source read sets a time limit for reporting signs of infection at the line. Macmillan says to contact the hospital doctor or nurse; a fever during chemotherapy has its own protocol.",
    "The Cochrane review of heparin against saline locks was read as an abstract only.",
    "No source read addresses masks on the patient or the nurse during PICC or tunnelled line dressing changes; the implanted port protocol records the same finding for ports.",
  ],
});
