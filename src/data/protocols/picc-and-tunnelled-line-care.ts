import { protocol } from "./helpers";

/*
 * Looking after a PICC or a tunnelled central line (Hickman type) between uses: the dressing and site care, cleaning
 * the hub or needleless connector, flushing and locking, securement, and living with the line. Implanted ports have
 * their own protocol (implanted-port-access-and-care), which shares most of these sources.
 *
 * What was read, and how (all on 11 November 2026, raw text in scratch directories):
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, from the Internet Archive's capture of the cdc.gov PDF (cdc.gov refuses a script). The July 2017
 *   update on chlorhexidine-impregnated dressings is on a separate cdc.gov page that could not be read.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC (PMC9096710).
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC (PMC7114876).
 * - NICE CG139 recommendations (2012, last updated 2017): full text.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015): full text, Internet Archive capture.
 * - NICE HealthTech guidance 379 (formerly MTG25, Tegaderm CHG, 2015, updated 2019) and 510 (formerly MTG44, Curos,
 *   2019): recommendation pages, full text.
 * - Cochrane review CD008462.pub4 (2022), heparin versus saline locks in adults: abstract only.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable; named, nothing rests on it.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence ends in a reference list, the quote stops
 * before it.
 */
export const piccAndTunnelledLineCare = protocol({
  id: "picc-and-tunnelled-line-care",
  name: "PICC and tunnelled central line care: dressing, hub cleaning, flushing and living with the line",
  aka: ["PICC care", "PICC dressing change", "Hickman line care", "tunnelled line care", "central line dressing", "scrub the hub", "needleless connector care", "bionector change", "line flush", "CVC maintenance", "CHG dressing"],
  domain: "vascular-access",
  tldr: "A PICC (a thin tube in the arm) or a tunnelled line (in the chest) needs regular care: a clear sealed dressing changed about once a week, the end cap cleaned before every use, and a salt-water flush to keep it open. Keep it dry and out of baths and swimming pools, and call your team if it gets red, sore, leaks, will not flush or you get a fever.",
  simple: "Keep your line's dressing clean and dry, and let trained staff change it weekly. Do not swim or soak it. Call your team at once for a fever, redness, swelling or a leak.",
  summary: "Line care rests on general central line infection-prevention guidance rather than oncology trials. Hand hygiene (CDC IB) and aseptic technique (NICE CG139). Skin antisepsis at dressing changes with 2% chlorhexidine in 70% alcohol, allowed to dry (epic3 Class A; CDC IA for above 0.5% chlorhexidine with alcohol). A sterile transparent or gauze dressing covers the site (CDC IA); gauze while the site oozes or the patient sweats (CDC II). Transparent dressings are changed at least every 7 days and gauze every 2 days, or sooner if damp, loose or soiled (SHEA, moderate quality, non-tunnelled lines; NICE; epic3); for tunnelled or implanted lines CDC says no more than weekly until the site heals (II), and neither CDC nor epic3 settles whether a healed tunnelled exit site needs a dressing at all.\n\nChlorhexidine-containing dressings are an essential practice in SHEA 2022 (high quality, acute care), epic3 says consider them (Class B) and NICE supports Tegaderm CHG in critically ill adults; SHEA says their value for long-term catheters with healed sites is unclear. Hubs, needleless connectors and injection ports are disinfected before every access (CDC IA; SHEA moderate), with at least 5 seconds of friction (SHEA) or 15 seconds (epic3). Antiseptic caps are an additional practice in SHEA; NICE found insufficient evidence for routine use of Curos. Flush with saline after every use (ESMO [II, B]) and lock frequently accessed lumens with saline (epic3 Class A); the Cochrane review (2022) found heparin locks may reduce occlusion on low-certainty evidence. Sutureless securement (CDC II). No submersion; showers with the line covered (CDC IB). No antibiotic ointment on the site (CDC IB). Remove the line when it is no longer needed (SHEA moderate).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults with cancer who have a PICC or a tunnelled, cuffed central venous catheter. Most recommendations come from infection-prevention guidance for all central lines, much of it from intensive care; SHEA's dressing interval is for non-tunnelled lines. Children, neonates and dialysis catheters follow their own guidance.",
  trigger: "Routine care of a PICC or tunnelled line: each access, each dressing change and each maintenance flush.",
  steps: [
    {
      action: "Clean your hands before and after touching the line, the site or the dressing",
      why: "Hands are the commonest route by which germs reach a line.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Use aseptic technique for site care and whenever the line is accessed",
      why: "The tip of the line sits in a large vein near the heart, so anything touching the connector must stay sterile.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system",
      grade: "[new 2012]",
    },
    {
      action: "At each dressing change, look at the site for redness, swelling, discharge or a line that has moved",
      why: "Infection and a line slipping out are easiest to catch at the dressing change.",
      source: "cdc-hicpac-2011",
      quote: "Monitor the catheter sites visually when changing the dressing or by palpation through an intact dressing on a regular basis, depending on the clinical situation of the individual patient.",
      grade: "Category IB",
    },
    {
      action: "Clean the site with 2% chlorhexidine in 70% alcohol and let it dry completely",
      why: "Chlorhexidine with alcohol kills skin bacteria best, and works fully only once dry.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "Cover the site with a sterile transparent dressing, or sterile gauze while it oozes or the person sweats heavily",
      why: "A clear dressing lets the site be checked without removing it; gauze absorbs blood or sweat that would lift a clear one.",
      source: "cdc-hicpac-2011",
      quote: "Use either sterile gauze or sterile, transparent, semipermeable dressing to cover the catheter site",
      grade: "Category IA",
    },
    {
      action: "Change transparent dressings every 7 days and gauze every 2 days, and sooner if damp, loose or soiled",
      why: "A lifted or wet dressing lets germs in; changing a sound one too often irritates the skin and disturbs the line.",
      source: "shea-clabsi-2022",
      quote: "For non-tunneled CVCs in adults and children, change transparent dressings and perform site care with a chlorhexidine-based antiseptic at least every 7 days or immediately if the dressing is soiled, loose, or damp. Change gauze dressings every 2 days or earlier if the dressing is soiled, loose, or damp (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Consider a chlorhexidine-containing dressing",
      why: "In trials, mostly in intensive care, these dressings reduced line bloodstream infections.",
      source: "shea-clabsi-2022",
      quote: "Use chlorhexidine-containing dressings for CVCs in patients over 2 months of age (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Secure a PICC with a sutureless securement device",
      why: "A line that moves in and out carries germs in and can slip out of position.",
      source: "cdc-hicpac-2011",
      quote: "Use a sutureless securement device to reduce the risk of infection for intravascular catheters",
      grade: "Category II",
    },
    {
      action: "Scrub the hub or needleless connector with an antiseptic before every use, and access it only with sterile devices",
      why: "The connector is touched many times a day; it is a main route for germs into a long-term line.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "Scrub with friction for at least 5 seconds (epic3 says 15) and let it dry before connecting",
      why: "Rubbing removes the film of germs on the connector; a few seconds are not enough.",
      source: "shea-clabsi-2022",
      quote: "Apply mechanical friction for a minimum of 5 seconds to reduce contamination.",
    },
    {
      action: "Change needleless connectors no more often than every 72 hours, or as the maker recommends",
      why: "Changing connectors more often adds handling without reducing infection.",
      source: "cdc-hicpac-2011",
      quote: "Change needleless connectors no more frequently than every 72 hours or according to manufacturers’ Recommendations for the purpose of reducing infection rates",
      grade: "Category II",
    },
    {
      action: "Flush with 0.9% saline after every infusion or blood sample, and lock frequently used lumens with saline",
      why: "Flushing clears blood and drugs that would otherwise block the line or mix in it.",
      source: "epic3",
      quote: "Use sterile normal saline for injection to flush and lock catheter lumens that are accessed frequently.",
      grade: "Class A",
    },
    {
      action: "Do not put antibiotic ointment or cream on the site",
      why: "It encourages fungal infection and resistant bacteria.",
      source: "cdc-hicpac-2011",
      quote: "Do not use topical antibiotic ointment or creams on insertion sites, except for dialysis catheters, because of their potential to promote fungal infections and antimicrobial resistance",
      grade: "Category IB",
    },
    {
      action: "Keep the line out of baths and swimming pools; shower only with the line and connector under a waterproof cover",
      why: "Soaking the site lets water and germs under the dressing.",
      source: "cdc-hicpac-2011",
      quote: "Do not submerge the catheter or catheter site in water. Showering should be permitted if precautions can be taken to reduce the likelihood of introducing organisms into the catheter (e.g., if the catheter and connecting device are protected with an impermeable cover during the shower)",
      grade: "Category IB",
    },
    {
      action: "Ask the patient to report any change at the site or new discomfort, and to call at once with a fever",
      why: "Problems usually start between visits, and the person with the line sees them first.",
      source: "cdc-hicpac-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "Take the line out when it is no longer needed",
      why: "Every day a line stays in carries a risk of infection and clots.",
      source: "shea-clabsi-2022",
      quote: "Remove nonessential catheters (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
  ],
  bestInClass: {
    statement: "Hand hygiene and aseptic technique; 2% chlorhexidine in alcohol on the skin, dried (epic3 Class A); a sterile transparent dressing (gauze while oozing) changed at least every 7 days, gauze every 2 days, sooner if compromised (SHEA moderate; NICE; CDC IB for damp or loose dressings); a chlorhexidine-containing dressing where available (SHEA high quality, acute care; epic3 Class B, consider); sutureless securement (CDC II); hub scrubbed before every access (CDC IA), for at least 5 seconds (SHEA) or 15 seconds (epic3); saline flush after every use (ESMO [II, B]; epic3 Class A); no submersion. The guidance differs on chlorhexidine dressings for long-term lines in healed sites (SHEA: benefit unclear) and on antiseptic caps (SHEA additional practice; NICE: insufficient evidence for routine use).",
    sources: ["cdc-hicpac-2011", "shea-clabsi-2022", "epic3", "nice-cg139", "esmo-2015", "nice-htg379", "nice-htg510"],
  },
  variants: [
    {
      name: "Antiseptic (disinfecting) caps on needleless connectors",
      differs: "A cap holding alcohol is left on each needleless connector between uses, replacing or adding to the manual scrub.",
      evidence: "SHEA 2022 lists antiseptic-containing caps as an additional practice despite high-level evidence, because they are not considered superior to manual disinfection, and lists as unresolved whether a scrub is still needed under a cap. NICE (HealthTech guidance 510, 2019) found Curos promising but the evidence insufficient for routine NHS adoption, and recommended research including people managed in the community.",
      sources: ["shea-clabsi-2022", "nice-htg510"],
    },
    {
      name: "Chlorhexidine gel or sponge dressings",
      differs: "Uses a dressing that releases chlorhexidine at the insertion site instead of a standard transparent dressing.",
      evidence: "SHEA 2022: essential practice, high quality, but unclear for long-term catheters in well-healed sites. epic3 IVAD20: consider (Class B). NICE HealthTech guidance 379 supports Tegaderm CHG for central and arterial lines in critically ill adults, estimating a saving of £93 per patient at a baseline infection rate of 1.48 per 1,000 catheter days.",
      sources: ["shea-clabsi-2022", "epic3", "nice-htg379"],
    },
    {
      name: "Heparin lock",
      differs: "Locks the line with heparinised saline after the saline flush, instead of saline alone; common for tunnelled lines.",
      evidence: "Cochrane 2022 (12 RCTs, 2422 adults, two oncology studies): heparin may give fewer occlusions (RR 0.70, 95% CI 0.51 to 0.95, low certainty), with no clear difference in patency duration, line infection, bleeding or heparin-induced thrombocytopenia (very low certainty). epic3 recommends saline for frequently accessed lumens (Class A).",
      sources: ["cochrane-heparin-saline-2022", "epic3"],
    },
    {
      name: "No dressing on a healed tunnelled exit site",
      differs: "Leaves the well-healed exit site of a cuffed tunnelled line uncovered.",
      evidence: "epic3 says a dressing may no longer be required once the site has healed (Class D/GPP); CDC makes no recommendation (unresolved issue).",
      sources: ["epic3", "cdc-hicpac-2011"],
    },
  ],
  grades: [
    { claim: "Replace a dressing that becomes damp, loosened or visibly soiled", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Replace catheter site dressing if the dressing becomes damp, loosened, or visibly soiled" },
    { claim: "Tunnelled or implanted sites: transparent dressings no more than weekly until healed", grade: "Category II", source: "cdc-hicpac-2011", quote: "Replace transparent dressings used on tunneled or implanted CVC sites no more than once per week (unless the dressing is soiled or loose), until the insertion site has healed." },
    { claim: "No recommendation on dressing well-healed exit sites of long-term tunnelled lines", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation can be made regarding the necessity for any dressing on well- healed exit sites of long-term cuffed and tunneled CVCs." },
    { claim: "Tunnelled or implanted sites: dressing every 7 days until healed; may not be needed once healed", grade: "Class D/GPP", source: "epic3", quote: "Dressings used on tunnelled or implanted catheter insertion sites should be replaced every 7 days until the insertion site has healed unless there is an indication to change them sooner. A dressing may no longer be required once the insertion site has healed." },
    { claim: "Consider a chlorhexidine-impregnated sponge dressing in adults with a central line", grade: "Class B", source: "epic3", quote: "Consider the use of a chlorhexidine-impregnated sponge dressing in adult patients with a central venous catheter as a strategy to reduce catheter-related bloodstream infection." },
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Saline flush after any infusion or blood sample", grade: "[II, B]", source: "esmo-2015", quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended" },
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "nice-cg139",
      label: "Healthcare-associated infections: prevention and control in primary and community care (CG139), recommendations",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/cg139/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2003], [2012], [new 2012]).",
      read: "full-text",
      accessed: "2026-11-11",
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
      label: "3M Tegaderm CHG IV securement dressing for central venous and arterial catheter insertion sites (HealthTech guidance 379, formerly MTG25; published 2015, updated 2019)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg379/chapter/1-Recommendations",
      gradingScheme: "NICE technology recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-htg510",
      label: "Curos for preventing infections when using needleless connectors (HealthTech guidance 510, formerly MTG44, 2019)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg510/chapter/1-Recommendations",
      gradingScheme: "NICE technology recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
    "Almost all the evidence comes from intensive care and acute hospital wards; trials of dressing type, interval and hub care in people with cancer living at home with a PICC or tunnelled line are few. SHEA's 7-day dressing interval is stated for non-tunnelled lines.",
    "The INS Infusion Therapy Standards of Practice, 9th edition (2024), the most detailed nursing standard on PICC and tunnelled line care, could not be read. Nothing here rests on it.",
    "CDC's July 2017 update on chlorhexidine-impregnated dressings sits on a separate page that could not be read; the 2011 guideline text marks its earlier recommendation as superseded.",
    "Scrub time differs between sources (at least 5 seconds in SHEA, at least 15 seconds in epic3); no trial in oncology settles it.",
    "Whether a healed tunnelled exit site needs a dressing is unresolved in CDC and left to judgement in epic3.",
    "No source read addresses masks on the patient or the nurse during PICC or tunnelled line dressing changes; the implanted port protocol records the same finding for ports.",
  ],
});
