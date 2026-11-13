import { protocol } from "./helpers";

/*
 * Inserting a long-term central venous access device for anticancer treatment: a PICC, a tunnelled cuffed catheter
 * (Hickman type) or an implanted chest port, in adults.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015, DOI
 *   10.1093/annonc/mdv296): full text, read from the Internet Archive's capture of academic.oup.com by the port exemplar
 *   agent (copy in /tmp/protocol-src-port). Grades quoted as printed.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, PDF (port exemplar agent's copy).
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al., DOI 10.1017/ice.2022.87, PMC9096710): full
 *   text, Europe PMC XML.
 * - ITAC 2022 international clinical practice guidelines for VTE in cancer (Farge et al., Lancet Oncol 2022, DOI
 *   10.1016/S1470-2045(22)00160-7, PMC9236567): full text, Europe PMC XML (first protocol agent's copy).
 * - GAVeCeLT SIC-Port bundle for chest-port insertion (Brescia et al., J Vasc Access 2026;27(3), DOI
 *   10.1177/11297298251375833, PMC13135638): full text, Europe PMC XML.
 * - NICE HTG368 (formerly MTG24), the Sherlock 3CG Tip Confirmation System for PICC placement (published March 2015,
 *   last updated May 2019): recommendations page, full text, HTML.
 * - International evidence-based recommendations on ultrasound-guided vascular access (Lamperti et al., Intensive Care
 *   Med 2012, DOI 10.1007/s00134-012-2597-x): abstract only.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable. The GAVeCeLT PICC insertion bundle
 *   (SIP) was not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const centralVenousCatheterInsertionForAnticancerTherapy = protocol({
  id: "central-venous-catheter-insertion-for-anticancer-therapy",
  name: "Central venous catheter insertion for anticancer treatment: PICC, tunnelled line and implanted port",
  aka: ["PICC insertion", "port insertion", "portacath insertion", "Hickman line insertion", "tunnelled CVC insertion", "central line insertion bundle", "CVAD insertion", "chest port implantation", "SIC-Port"],
  domain: "vascular-access",
  tldr: "A PICC, a tunnelled line or a port is put in by a trained doctor, nurse or radiologist under local anaesthetic, using an ultrasound scan to find the vein, full sterile precautions and a check that the tip sits just above the heart before it is used. Afterwards your breathing and blood pressure are checked, and you should say if you feel short of breath or have chest pain.",
  simple: "The line or port is put in under local anaesthetic, using an ultrasound scan and very clean, sterile conditions. Its tip is checked before treatment goes through it.",
  summary: "The insertion bundle is the same for all three devices and comes from infection-prevention and oncology guidelines. A checklist (SHEA 2022, moderate), hand hygiene, alcoholic chlorhexidine skin preparation (ESMO [I, A]; SHEA high quality) and maximal sterile barrier precautions with cap, mask, sterile gown and gloves and a full body drape (CDC Category IB; SHEA moderate); ultrasound-guided venepuncture (SHEA high; CDC IB, by trained operators); the fewest lumens needed (CDC IB); no systemic antibiotic prophylaxis (ESMO [I, A]; CDC IB). Avoid the femoral vein (ESMO [I, A]); ITAC 2022 asks for right-sided jugular insertion with the tip at the junction of the superior vena cava and right atrium to reduce catheter-related thrombosis (grade 1B).\n\nESMO asks for implanted ports to be placed under strict sterile conditions in an operating room [II, B], and for the tip position to be confirmed by intraoperative fluoroscopy or post-operative chest X-ray [II, B], with intracavitary ECG as an alternative [V, D]. Newer practice moves tip location into the procedure: NICE HTG368 supports an ECG-based tip confirmation system for PICCs in adults, avoiding a chest X-ray unless there is no P wave, and the Italian GAVeCeLT SIC-Port bundle (2026) adds ultrasound vein assessment, a preference for the axillary vein, ultrasound exclusion of pneumothorax, ultrasound tip navigation, intracavitary ECG or echo tip location, and pocket closure with intradermal sutures and glue. After insertion ESMO asks for four-hourly observations and a chest X-ray for breathlessness or chest wall pain [II, C].",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "radiographer", "surgical-team"],
    where: ["theatre", "outpatient-clinic", "ward"],
  },
  population: "Adults with cancer needing a long-term central venous access device for anticancer treatment: a PICC, a tunnelled cuffed catheter or an implanted chest or arm port. Device choice is covered in the device-selection protocol. Children, dialysis catheters and short-term non-tunnelled lines in intensive care follow their own protocols; SHEA's recommendations are written for acute-care hospitals and much of their evidence is from intensive care.",
  trigger: "A long-term central venous device has been chosen and is to be inserted.",
  steps: [
    {
      action: "Assess the person before the procedure: history (previous lines, clots, difficult access), examination, blood tests and an ultrasound survey of the veins",
      why: "Knowing the veins and the clotting risk beforehand lets the operator choose a safe vein of the right size and avoid complications.",
      source: "esmo-2015",
      quote: "Careful preoperative assessment is advised. This should include the patient's medical history, a physical examination and the appropriate laboratory and radiological tests (discussed below).",
    },
    {
      action: "Use a checklist at insertion, completed by someone other than the operator, to confirm each infection-prevention step",
      why: "Checklists make it much more likely every step is done every time.",
      source: "shea-clabsi-2022",
      quote: "In ICU and non-ICU settings, a facility should have a process in place, such as a checklist, to ensure adherence to infection prevention practices at the time of CVC insertion (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Choose a catheter with the fewest lumens the treatment needs",
      why: "Each extra lumen is another route for infection and clots.",
      source: "cdc-hicpac-2011",
      quote: "Use a CVC with the minimum number of ports or lumens essential for the management of the patient [65–68]. Category IB",
      grade: "Category IB",
    },
    {
      action: "Avoid the femoral vein; where possible insert on the right, in the jugular vein, aiming the tip at the junction of the superior vena cava and right atrium",
      why: "Groin lines carry more infection and clot risk, and a right-sided line with its tip in the right place is less likely to cause a clot.",
      source: "itac-2022",
      quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B).",
      grade: "1B",
    },
    {
      action: "Clean hands, prepare the skin with chlorhexidine in alcohol, and use maximal sterile barrier precautions: cap, mask, sterile gown, sterile gloves and a full body drape",
      why: "Most early line infections come from skin germs carried in at insertion, and full barriers cut that risk.",
      source: "cdc-hicpac-2011",
      quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange",
      grade: "Category IB",
    },
    {
      action: "Find and puncture the vein under real-time ultrasound guidance, by an operator trained in it",
      why: "Ultrasound means fewer attempts and fewer punctures of arteries or lung.",
      source: "shea-clabsi-2022",
      quote: "Use ultrasound guidance for catheter insertion (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not give antibiotics routinely before insertion",
      why: "Trials have not shown that preventive antibiotics stop line infections, and they encourage resistance.",
      source: "esmo-2015",
      quote: "Antimicrobial prophylaxis to prevent catheter colonisation, before insertion or during maintenance of CVCs, is not recommended [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Place an implanted port under strict sterile conditions, in an operating room, under local anaesthetic with or without sedation",
      why: "A port sits in a surgical pocket under the skin, so it is inserted with surgical sterility.",
      source: "esmo-2015",
      quote: "Insertion of an implantable venous access device should be carried out under strict sterile conditions, in the operating room [II, B]",
      grade: "[II, B]",
    },
    {
      action: "Confirm the tip position before use: by fluoroscopy during the procedure or a chest X-ray afterwards, or by an intracavitary ECG method",
      why: "A tip in the wrong place can cause clots, irregular heartbeats or a line that does not work.",
      source: "esmo-2015",
      quote: "Catheter tip position should be verified radiologically with an intraoperative fluoroscopy, or a post-operative chest X-ray [II, B]",
      grade: "[II, B]",
    },
    {
      action: "After the procedure, check temperature, pulse, blood pressure and breathing four-hourly, and get a chest X-ray if the person is breathless or has chest wall pain",
      why: "These are the early signs of a collapsed lung, bleeding or a misplaced line.",
      source: "esmo-2015",
      quote: "After the procedure, patients require 4 hourly observations including: temperature, pulse, blood pressure and respiratory rate. A chest X-ray is required if the patient has dyspnoea or chest wall pain [II, C]",
      grade: "[II, C]",
    },
    {
      action: "If air embolism is suspected, lay the person on their left side, head down, and give 100% oxygen",
      why: "This position helps keep air from blocking the outflow of the heart while help arrives.",
      source: "esmo-2015",
      quote: "Air embolism: immediately place the patient in the lateral decubitus head down position and deliver 100% oxygen [ 29 ].",
    },
  ],
  bestInClass: {
    statement: "Insertion checklist (SHEA moderate), hand hygiene, alcoholic chlorhexidine (ESMO [I, A]; SHEA high), maximal sterile barrier precautions (CDC IB), real-time ultrasound guidance (SHEA high; CDC IB), fewest lumens (CDC IB), no antibiotic prophylaxis (ESMO [I, A]), no femoral site (ESMO [I, A]), right jugular with the tip at the cavoatrial junction (ITAC 1B), ports in a sterile operating environment (ESMO [II, B]) and confirmed tip position before use. On tip confirmation the sources differ by date: ESMO 2015 prefers fluoroscopy or chest X-ray [II, B] and rates intracavitary ECG [V, D], while NICE (2015, updated 2019) supports ECG-based tip confirmation for PICCs in adults and the 2026 GAVeCeLT bundle uses intracavitary ECG or echocardiography during the procedure instead of X-ray. ESMO also notes the open cephalic cut-down avoids immediate complications [IV, D], where newer bundles use ultrasound-guided puncture.",
    sources: ["esmo-2015", "cdc-hicpac-2011", "shea-clabsi-2022", "itac-2022", "nice-htg368", "sic-port-2026"],
  },
  variants: [
    {
      name: "SIC-Port bundle for chest ports (GAVeCeLT, 2026)",
      differs: "Eight steps: a systematic ultrasound survey of the neck and chest veins (RaCeVA), chlorhexidine 2% in 70% alcohol with maximal barriers, ultrasound-guided puncture preferring the axillary vein to avoid tunnelling over the collarbone, ultrasound to exclude pneumothorax, ultrasound tip navigation, tip location by intracavitary ECG or echocardiography with a bubble test, a pocket made by hydro-dissection over the pectoral muscle, and closure with absorbable intradermal sutures and cyanoacrylate glue. It also advises micro-introducer kits and a vein at least three times the catheter's diameter.",
      evidence: "A society consensus bundle drawn from the recent literature, adopted in GAVeCeLT training courses; not tested as a bundle in a trial.",
      sources: ["sic-port-2026"],
    },
    {
      name: "ECG-based tip confirmation for PICCs instead of chest X-ray (NICE HTG368)",
      differs: "Uses an ECG-based tip confirmation system during PICC insertion so the line can be used without a confirmatory chest X-ray; an X-ray is still needed if there is no P wave, as in atrial fibrillation.",
      evidence: "NICE found the case for adoption supported by the evidence, with cost similar to blind insertion plus X-ray outside intensive care and an estimated saving of 109 pounds per patient against fluoroscopy. ESMO 2015 graded the intracavitary ECG method [V, D].",
      sources: ["nice-htg368", "esmo-2015"],
    },
    {
      name: "Open surgical cut-down of the cephalic vein for ports",
      differs: "Exposes the cephalic vein in the shoulder groove surgically instead of puncturing a vein with a needle.",
      evidence: "ESMO calls it the best approach to avoid immediate complications, graded [IV, D]. Newer guidance makes ultrasound-guided puncture the standard (SHEA high quality; SIC-Port).",
      sources: ["esmo-2015", "shea-clabsi-2022", "sic-port-2026"],
    },
  ],
  grades: [
    { claim: "Avoid the femoral vein unless other sites are contraindicated", grade: "[I, A]", source: "esmo-2015", quote: "There is insufficient evidence to recommend a specific insertion site, but the femoral vein should be avoided unless there is a contraindication to the other sites (e.g. SVC syndrome), due to the increased risk of infection and concerns about thrombosis [I, A]" },
    { claim: "Chlorhexidine solutions with alcohol at insertion", grade: "[I, A]", source: "esmo-2015", quote: "Chlorhexidine solutions with alcohol should be used [I, A]" },
    { claim: "Alcoholic chlorhexidine for skin preparation", grade: "Quality of Evidence: HIGH", source: "shea-clabsi-2022", quote: "Use an alcoholic chlorhexidine antiseptic for skin preparation (Quality of Evidence: HIGH)" },
    { claim: "Maximum sterile barrier precautions during CVC insertion", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Use maximum sterile barrier precautions during CVC insertion (Quality of Evidence: MODERATE)" },
    { claim: "Ultrasound guidance, if available, by fully trained operators", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Use ultrasound guidance to place central venous catheters (if this technology is available) to reduce the number of cannulation attempts and mechanical complications." },
    { claim: "No routine systemic antimicrobial prophylaxis before insertion", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Do not administer systemic antimicrobial prophylaxis routinely before insertion or during use of an intravascular catheter to prevent catheter colonization or CRBSI [114]." },
    { claim: "Intracavitary ECG as an alternative to radiological tip confirmation", grade: "[V, D]", source: "esmo-2015", quote: "An alternative to radiologic confirmation is the intracavitary electrocardiogram (ECG) method, where arrhythmia is documented during insertion of the wire [V, D]" },
    { claim: "Open cephalic cut-down to avoid immediate complications", grade: "[IV, D]", source: "esmo-2015", quote: "The open technique (cephalic vein cut-down) is the best approach to avoid the risk of immediate complications [IV, D]" },
  ],
  sources: [
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "shea-clabsi-2022",
      label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update",
      publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)",
      year: 2022,
      url: "https://doi.org/10.1017/ice.2022.87",
      doi: "10.1017/ice.2022.87",
      gradingScheme: "Quality of evidence HIGH, MODERATE or LOW, with each recommendation classed as an essential practice, an additional approach or an unresolved issue.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (ITAC), The Lancet Oncology",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: evidence A (high) to D (very low); recommendation grade 1 (strong) or 2 (weak); 'guidance' (best clinical practice) where there is no clear evidence, based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "sic-port-2026",
      label: "A GAVeCeLT bundle for chest-port insertion: The SIC-Port protocol",
      publisher: "Journal of Vascular Access (Brescia et al., GAVeCeLT)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298251375833",
      doi: "10.1177/11297298251375833",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-htg368",
      label: "The Sherlock 3CG Tip Confirmation System for placement of peripherally inserted central catheters (HTG368, formerly MTG24)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg368/chapter/1-Recommendations",
      gradingScheme: "NICE does not grade recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "lamperti-2012",
      label: "International evidence-based recommendations on ultrasound-guided vascular access",
      publisher: "Intensive Care Medicine (Lamperti et al.)",
      year: 2012,
      url: "https://doi.org/10.1007/s00134-012-2597-x",
      doi: "10.1007/s00134-012-2597-x",
      gradingScheme: "GRADE and GRADE-RAND.",
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
  technologies: ["picc-lines", "implanted-ports", "picc-tip-location-systems", "infusion-devices-vascular-access"],
  terms: ["central-venous-access"],
  related: ["venous-access-device-selection-for-anticancer-therapy", "picc-and-tunnelled-line-care", "implanted-port-access-and-care", "catheter-related-thrombosis-in-cancer", "central-line-insertion-bundle"],
  upgrades: [],
  gaps: [
    "No guideline read is specific to inserting tunnelled cuffed (Hickman type) catheters; the steps here are the general central line bundle, and tunnelling technique and cuff position are not covered. OnCo has no technology record for tunnelled catheters.",
    "The INS Standards (2024) and the GAVeCeLT PICC insertion bundle could not be read.",
    "ESMO's 2015 guideline predates ultrasound tip navigation and routine ECG tip location; whether intra-procedural ECG or echo should replace chest X-ray for ports and tunnelled lines rests on the 2026 GAVeCeLT consensus, not a guideline graded since.",
    "SHEA's recommendations are written for acute-care hospitals and lean on intensive-care evidence; outpatient insertion of ports and PICCs in cancer services is less studied.",
    "Whether a mask on the patient is needed during insertion is not stated by the guidelines read, which list the mask among the operator's barriers.",
  ],
});
