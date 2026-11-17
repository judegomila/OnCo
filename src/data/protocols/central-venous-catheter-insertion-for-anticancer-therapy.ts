import { protocol } from "./helpers";

/*
 * Inserting a long-term central venous access device for anticancer treatment: a PICC, a tunnelled cuffed catheter
 * (Hickman type) or an implanted chest port, in adults.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text, or a copy another checker had fetched that day was re-used, and every quote was checked against it by script
 * (whitespace and tags only).
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, PDF read with pdftotext (copy fetched on 17 November by a sibling checker, re-used).
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al., DOI 10.1017/ice.2022.87, PMC9096710): full
 *   text, Europe PMC XML (sibling copy of 17 November, re-used).
 * - ITAC 2022 international clinical practice guidelines for VTE in cancer (Farge et al., Lancet Oncol 2022, DOI
 *   10.1016/S1470-2045(22)00160-7, PMC9236567): full text, Europe PMC XML (sibling copy of 17 November, re-used).
 * - GAVeCeLT SIC-Port bundle for chest-port insertion (Brescia et al., J Vasc Access 2026;27(3), online November 2025,
 *   DOI 10.1177/11297298251375833, PMC13135638): full text, Europe PMC XML, fetched again.
 * - GAVeCeLT SIP protocol update for PICC insertion (Brescia et al., J Vasc Access 2024;25(1), online May 2022, DOI
 *   10.1177/11297298221099838, PMC10845830): full text, Europe PMC XML. Not readable on 11 November; read now.
 * - Association of Anaesthetists guidelines: safe vascular access 2025 (Johnston et al., Anaesthesia 2025;80(11), DOI
 *   10.1111/anae.16727, PMC12519924): full text of the concise guideline, Europe PMC XML. Added on 17 November. Its
 *   full version is an online appendix that was not read.
 * - AAGBI Safe vascular access 2016 (Bodenham et al., DOI 10.1111/anae.13360, PMC5067617): full text, Europe PMC XML
 *   (sibling copy of 17 November, re-used). Superseded by the 2025 edition; used only for air embolism and the
 *   warning about late pneumothorax, which the concise 2025 text does not cover.
 * - NICE HTG368 (formerly MTG24), the Sherlock 3CG Tip Confirmation System for PICC placement (published March 2015,
 *   last updated May 2019): recommendations page and overview, HTML, fetched again.
 * - Macmillan Cancer Support, PICC lines (reviewed 1 March 2022): HTML (sibling copy of 17 November, re-used).
 * - International evidence-based recommendations on ultrasound-guided vascular access (Lamperti et al., Intensive Care
 *   Med 2012, DOI 10.1007/s00134-012-2597-x): abstract only (Europe PMC); the publisher's PDF link returned a bot check.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015, DOI
 *   10.1093/annonc/mdv296): NOT re-read. It was read on 11 November from an Internet Archive capture. On 17 November
 *   the publisher returned 403 with a bot check, Europe PMC holds no open copy, and the Internet Archive had answered another
 *   checker's request that day with 429, so it was not asked again. Its quotes and grades stand as recorded on 11 November; the two figures that rested on it alone were
 *   taken off the page (see gaps).
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): refuses a script; not read.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied with line breaks
 * joined only.
 */
export const centralVenousCatheterInsertionForAnticancerTherapy = protocol({
  id: "central-venous-catheter-insertion-for-anticancer-therapy",
  name: "Central venous catheter insertion for anticancer treatment: PICC, tunnelled line and implanted port",
  aka: ["PICC insertion", "port insertion", "portacath insertion", "Hickman line insertion", "tunnelled CVC insertion", "central line insertion bundle", "CVAD insertion", "chest port implantation", "SIC-Port"],
  domain: "vascular-access",
  tldr: "A PICC, a tunnelled line or a port is put in by a trained doctor or nurse, using an ultrasound scan to find the vein and full sterile precautions. The team checks that the tip lies in the large vein just above the heart. Afterwards, contact your hospital team if you become short of breath or your chest feels tight.",
  simple: "The line or port is put in using an ultrasound scan and very clean, sterile conditions. The team checks where its tip lies.",
  summary: "The insertion bundle is the same for all three devices and comes from infection-prevention guidelines: a checklist or similar process (SHEA 2022, moderate), hand hygiene (CDC IB; SHEA moderate), skin preparation with chlorhexidine in alcohol (CDC IA, stronger than 0.5%; SHEA high, at least 2%), maximal sterile barrier precautions with cap, mask, sterile gown and gloves and a full body drape (CDC IB; SHEA moderate), ultrasound guidance (SHEA high; CDC IB, by fully trained operators), the fewest lumens needed (CDC IB) and no routine systemic antibiotic prophylaxis (CDC IB; SHEA high). CDC says to avoid the femoral vein in adults (IA).\n\nOn the vein the sources differ. ITAC 2022, writing about preventing catheter-related thrombosis, asks for right-sided jugular insertion with the tip at the junction of the superior vena cava and right atrium (grade 1B). CDC prefers the subclavian site for non-tunnelled lines in adults on infection grounds (IB) and makes no site recommendation for tunnelled lines. The Italian GAVeCeLT chest-port bundle (2026) prefers the axillary vein. On the tip, the UK Association of Anaesthetists (2025, consensus) accepts the lower third of the superior vena cava, the cavo-atrial junction or the high right atrium, and asks for real-time imaging or ECG guidance for long-term catheters. NICE HTG368 says one ECG-based system (Sherlock 3CG) should be considered as an option for PICCs in adults; it usually avoids a confirmatory chest X-ray, which is still needed when the ECG shows no P wave. The GAVeCeLT bundles for chest ports (2026) and PICCs (2024) add an ultrasound survey of the veins, ultrasound tip navigation, tip location during the procedure by intracavitary ECG or echocardiography and, for ports, ultrasound exclusion of pneumothorax and pocket closure with intradermal sutures and glue.\n\nESMO's 2015 oncology guideline was read on 11 November 2026 and could not be re-read on 17 November 2026. As recorded then, it grades alcoholic chlorhexidine, avoiding the femoral vein and no antibiotic prophylaxis [I, A]; asks for ports to be placed under strict sterile conditions in an operating room [II, B]; asks for the tip position to be confirmed by intraoperative fluoroscopy or post-operative chest X-ray [II, B], with intracavitary ECG as an alternative [V, D]; and asks for observations after the procedure, with a chest X-ray for breathlessness or chest wall pain [II, C].",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "radiographer", "surgical-team"],
    where: ["theatre", "outpatient-clinic", "ward"],
  },
  population: "Adults with cancer needing a long-term central venous access device for anticancer treatment: a PICC, a tunnelled cuffed catheter or an implanted chest or arm port. Device choice is covered in the device-selection protocol. Children, dialysis catheters and short-term non-tunnelled lines in intensive care follow their own protocols. Several sources are scoped more widely or more narrowly than this: CDC and SHEA cover central lines in general and not cancer services in particular, SHEA's site preference is for intensive care, the Association of Anaesthetists and NICE are UK bodies, and each GAVeCeLT bundle covers one device.",
  trigger: "A long-term central venous device has been chosen and is to be inserted.",
  steps: [
    {
      action: "Before the procedure, ask about previous lines, difficult access and clots, consider clotting status and blood-thinning medicines, and survey the veins with ultrasound",
      why: "GAVeCeLT says this for chest ports, so that a vein of suitable size is chosen; its PICC bundle starts the same way. ESMO (2015), as recorded on 11 November 2026, also advises careful assessment before the procedure.",
      source: "sic-port-2026",
      quote: "It is important to assess whether the patients had a history of previous venous access devices, difficult venipuncture, or venous thrombosis.",
    },
    {
      action: "Check clotting tests and the platelet count where the illness or its treatment is likely to affect them, and follow the local protocol on whether to correct them",
      why: "The UK consensus says routine blood tests are not needed otherwise. For a tunnelled line or port its table recommends a platelet count of at least 30 × 10⁹/L and says to consider correcting clotting when the INR is 1.5 or more; for an uncomplicated PICC it sets no platelet count and says no treatment is normally required. It says these figures are to be read alongside patient factors, the operator and local guidelines.",
      source: "aoa-2025",
      quote: "Patients having a CVAD inserted or removed do not need routine laboratory blood tests unless the condition or treatments are likely to impair coagulation, liver function or bone marrow function.",
    },
    {
      action: "Use a checklist or similar process at insertion to confirm each infection-prevention step; if a checklist is used, someone other than the operator completes it",
      why: "SHEA says checklists have been suggested to ensure optimal insertion practices, and that staff should be empowered to stop the procedure if sterile technique is broken.",
      source: "shea-clabsi-2022",
      quote: "In ICU and non-ICU settings, a facility should have a process in place, such as a checklist, to ensure adherence to infection prevention practices at the time of CVC insertion (Quality of Evidence: MODERATE)",
      grade: "Quality of Evidence: MODERATE",
    },
    {
      action: "Choose a catheter with the fewest lumens the treatment needs",
      why: "The UK consensus gives the reason: fewer lumens reduce the risk of infection, catheter breakage and air embolism.",
      source: "cdc-hicpac-2011",
      quote: "Use a CVC with the minimum number of ports or lumens essential for the management of the patient [65–68]. Category IB",
      grade: "Category IB",
    },
    {
      action: "Avoid the femoral vein in adults",
      why: "CDC reports that femoral lines in adults are colonised by bacteria more often, and carry a higher risk of deep vein thrombosis, than jugular or subclavian lines.",
      source: "cdc-hicpac-2011",
      quote: "Avoid using the femoral vein for central venous access in adult patients [38, 50, 51, 54]. Category IA",
      grade: "Category IA",
    },
    {
      action: "Insert on the right side, in the jugular vein, and place the tip at the junction of the superior vena cava and right atrium (ITAC's advice for central catheters)",
      why: "ITAC makes this recommendation to prevent clots around the line. Other bodies prefer other veins for other reasons; see the best-in-class statement.",
      source: "itac-2022",
      quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B).",
      grade: "1B",
    },
    {
      action: "Clean hands, prepare the skin with chlorhexidine in alcohol and let it dry, and use maximal sterile barrier precautions: cap, mask, sterile gown, sterile gloves and a full body drape",
      why: "CDC names skin organisms at the insertion site as the commonest route of infection for short-term catheters, and reports a randomised trial in which full barriers meant fewer colonised catheters. CDC asks for chlorhexidine stronger than 0.5% in alcohol (IA); SHEA for at least 2%.",
      source: "cdc-hicpac-2011",
      quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange",
      grade: "Category IB",
    },
    {
      action: "Puncture the vein under ultrasound guidance, by an operator fully trained in it",
      why: "CDC says ultrasound reduces the number of attempts and mechanical complications, and that only those fully trained should use it (IB). SHEA adds that using ultrasound may lead to a breach in sterile technique.",
      source: "shea-clabsi-2022",
      quote: "Use ultrasound guidance for catheter insertion (Quality of Evidence: HIGH)",
      grade: "Quality of Evidence: HIGH",
    },
    {
      action: "Do not give antibiotics routinely before insertion",
      why: "CDC found the studies of preventive antibiotics too varied to draw a conclusion on whether they work. SHEA (high) says the same for short-term and tunnelled lines, and ESMO (2015), as recorded on 11 November 2026, graded it [I, A].",
      source: "cdc-hicpac-2011",
      quote: "Do not administer systemic antimicrobial prophylaxis routinely before insertion or during use of an intravascular catheter to prevent catheter colonization or CRBSI [114].",
      grade: "Category IB",
    },
    {
      action: "Place an implanted port under strict sterile conditions, in an operating room",
      why: "This is ESMO's recommendation as recorded on 11 November 2026; the text could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Insertion of an implantable venous access device should be carried out under strict sterile conditions, in the operating room [II, B]",
      grade: "[II, B]",
    },
    {
      action: "Check where the tip lies; for a long-term line, use real-time imaging or ECG guidance during the procedure",
      why: "The UK consensus says a poorly positioned tip may increase the risk of complications such as thrombosis, erosion and pericardial tamponade (fluid pressing on the heart). Guidelines differ on the method; see the best-in-class statement.",
      source: "aoa-2025",
      quote: "Real‐time imaging or ECG guidance should be used for long‐term catheters.",
    },
    {
      action: "After the procedure, observe temperature, pulse, blood pressure and breathing rate, and get a chest X-ray if the person is breathless or has chest wall pain",
      why: "This is ESMO's recommendation, graded [II, C], as recorded on 11 November 2026; the text could not be re-read on 17 November 2026, so the interval between observations is not given here. The 2016 UK anaesthetic guideline adds that a collapsed lung may not show on the first imaging and that staff and patients should be warned to report late signs and symptoms.",
      source: "esmo-2015",
    },
    {
      action: "If air embolism is suspected, consider tilting the person head down and onto the left side",
      why: "The 2016 UK anaesthetic guideline says this, and trying to draw air back through the line, may be useful. ESMO (2015), as recorded on 11 November 2026, says to do it immediately and to give oxygen.",
      source: "aagbi-2016",
      quote: "Head‐down, left lateral tilt and attempted aspiration of air via the line may be useful.",
    },
  ],
  bestInClass: {
    statement: "Agreed by the infection-prevention guidelines read: an insertion checklist or similar process (SHEA moderate), hand hygiene (CDC IB; SHEA moderate), chlorhexidine in alcohol (CDC IA; SHEA high), maximal sterile barrier precautions (CDC IB; SHEA moderate), ultrasound guidance (SHEA high; CDC IB), fewest lumens (CDC IB), no routine antibiotic prophylaxis (CDC IB; SHEA high) and no femoral site in adults (CDC IA). They differ on three points. Chlorhexidine strength: CDC asks for more than 0.5%, SHEA for at least 2%, and GAVeCeLT for 2% in 70% isopropyl alcohol. The vein: ITAC asks for the right jugular with the tip at the cavoatrial junction, to prevent thrombosis (1B); CDC prefers the subclavian site for non-tunnelled lines in adults, for infection (IB), and calls the best site for a tunnelled line an unresolved issue; SHEA prefers the subclavian site in intensive care (high) and says the risk between sites outside intensive care is unclear; GAVeCeLT prefers the axillary vein for chest ports. Tip confirmation: the UK Association of Anaesthetists (2025) asks for real-time imaging or ECG guidance for long-term catheters and calls fluoroscopy with contrast the gold standard for confirming placement with imaging; the GAVeCeLT port bundle (2026) says the tip must be located during the procedure, by intracavitary ECG first, and calls fluoroscopy inaccurate, expensive and unsafe because of radiation; NICE (2015, updated 2019) says the Sherlock 3CG ECG system should be considered as an option for PICCs in adults. ESMO 2015, as recorded on 11 November 2026 and not re-read, asks for fluoroscopy or chest X-ray [II, B] and rates intracavitary ECG [V, D], and asks for ports to be placed in an operating room [II, B].",
    sources: ["cdc-hicpac-2011", "shea-clabsi-2022", "itac-2022", "aoa-2025", "nice-htg368", "sic-port-2026", "esmo-2015"],
  },
  variants: [
    {
      name: "SIC-Port bundle for chest ports (GAVeCeLT, 2026)",
      differs: "Eight steps: a systematic ultrasound survey of the neck and chest veins (RaCeVA), chlorhexidine 2% in 70% isopropyl alcohol with maximal barriers, ultrasound-guided puncture preferring the axillary vein to avoid tunnelling over the collarbone, ultrasound to exclude pneumothorax, ultrasound tip navigation, tip location by intracavitary ECG or echocardiography with a bubble test, a pocket made by hydro-dissection over the pectoral muscle, and closure with absorbable intradermal sutures and cyanoacrylate glue. It also recommends micro-introducer kits and a vein at least three times the catheter's diameter.",
      evidence: "An editorial by GAVeCeLT authors describing a bundle drawn from the recent literature and adopted in GAVeCeLT training courses. The paper reports no trial of the bundle as a whole and says it may protect the patient from insertion-related complications.",
      sources: ["sic-port-2026"],
    },
    {
      name: "SIP bundle for PICCs (GAVeCeLT, 2024 update)",
      differs: "Eight steps: an ultrasound survey of the arm veins (RaPeVA); hand hygiene, chlorhexidine 2% in 70% isopropyl alcohol and maximal barriers; a catheter-to-vein ratio of 1:3 or less, with the exit site in the green zone of the zone insertion method and tunnelling considered if the best vein lies in the yellow zone; ultrasound identification of the median nerve and brachial artery before puncture; ultrasound-guided puncture of the basilic or a brachial vein with a micro-introducer kit; ultrasound tip navigation; tip location during the procedure by intracavitary ECG or ultrasound; and sutureless securement with cyanoacrylate glue and a transparent dressing.",
      evidence: "An editorial by members of GAVeCeLT and WoCoVA updating an earlier bundle from the literature; the paper reports no trial of the bundle as a whole.",
      sources: ["sip-picc-2024"],
    },
    {
      name: "ECG-based tip confirmation for PICCs instead of chest X-ray (NICE HTG368, England)",
      differs: "Uses the Sherlock 3CG Tip Confirmation System during PICC insertion in adults. NICE says it usually avoids the need for a confirmatory chest X-ray in patients who would otherwise have blind insertion; an X-ray is still needed if the ECG shows no P wave, as in atrial fibrillation.",
      evidence: "NICE found the case for adoption supported by the evidence and says the system should be considered as an option. It puts the cost as similar to blind insertion plus X-ray outside intensive care, and estimates a saving of 109 pounds per patient against fluoroscopy, with all savings subject to some uncertainty. ESMO 2015, as recorded on 11 November 2026, graded the intracavitary ECG method [V, D].",
      sources: ["nice-htg368", "esmo-2015"],
    },
    {
      name: "Open surgical cut-down of the cephalic vein for ports",
      differs: "Exposes the cephalic vein in the shoulder groove surgically instead of puncturing a vein with a needle.",
      evidence: "ESMO 2015, as recorded on 11 November 2026 and not re-read, calls it the best approach to avoid immediate complications, graded [IV, D]. The GAVeCeLT port bundle (2026) lists surgical isolation and cannulation of the vein among older strategies that are gradually being abandoned and calls ultrasound-guided puncture mandatory for any central venous catheterisation; SHEA recommends ultrasound guidance (high quality evidence).",
      sources: ["esmo-2015", "shea-clabsi-2022", "sic-port-2026"],
    },
  ],
  grades: [
    { claim: "Avoid the femoral vein in adults", grade: "Category IA", source: "cdc-hicpac-2011", quote: "Avoid using the femoral vein for central venous access in adult patients [38, 50, 51, 54]. Category IA" },
    { claim: "Chlorhexidine stronger than 0.5% with alcohol before insertion", grade: "Category IA", source: "cdc-hicpac-2011", quote: "Prepare clean skin with a >0.5% chlorhexidine preparation with alcohol before central venous catheter and peripheral arterial catheter insertion and during dressing changes." },
    { claim: "Alcoholic chlorhexidine for skin preparation", grade: "Quality of Evidence: HIGH", source: "shea-clabsi-2022", quote: "Use an alcoholic chlorhexidine antiseptic for skin preparation (Quality of Evidence: HIGH)" },
    { claim: "Maximum sterile barrier precautions during CVC insertion", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Use maximum sterile barrier precautions during CVC insertion (Quality of Evidence: MODERATE)" },
    { claim: "Ultrasound guidance, if available, by fully trained operators", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Use ultrasound guidance to place central venous catheters (if this technology is available) to reduce the number of cannulation attempts and mechanical complications." },
    { claim: "No antimicrobial prophylaxis for short-term or tunnelled catheter insertion", grade: "Quality of Evidence: HIGH", source: "shea-clabsi-2022", quote: "Do not use antimicrobial prophylaxis for short-term or tunneled catheter insertion or while catheters are in situ (Quality of Evidence: HIGH)" },
    { claim: "Avoid the femoral vein unless other sites are contraindicated (recorded on 11 November 2026, not re-read)", grade: "[I, A]", source: "esmo-2015", quote: "There is insufficient evidence to recommend a specific insertion site, but the femoral vein should be avoided unless there is a contraindication to the other sites (e.g. SVC syndrome), due to the increased risk of infection and concerns about thrombosis [I, A]" },
    { claim: "Chlorhexidine solutions with alcohol at insertion (recorded on 11 November 2026, not re-read)", grade: "[I, A]", source: "esmo-2015", quote: "Chlorhexidine solutions with alcohol should be used [I, A]" },
    { claim: "No antimicrobial prophylaxis before insertion (recorded on 11 November 2026, not re-read)", grade: "[I, A]", source: "esmo-2015", quote: "Antimicrobial prophylaxis to prevent catheter colonisation, before insertion or during maintenance of CVCs, is not recommended [I, A]" },
    { claim: "Radiological confirmation of tip position (recorded on 11 November 2026, not re-read)", grade: "[II, B]", source: "esmo-2015", quote: "Catheter tip position should be verified radiologically with an intraoperative fluoroscopy, or a post-operative chest X-ray [II, B]" },
    { claim: "Intracavitary ECG as an alternative to radiological tip confirmation (recorded on 11 November 2026, not re-read)", grade: "[V, D]", source: "esmo-2015", quote: "An alternative to radiologic confirmation is the intracavitary electrocardiogram (ECG) method, where arrhythmia is documented during insertion of the wire [V, D]" },
    { claim: "Open cephalic cut-down to avoid immediate complications (recorded on 11 November 2026, not re-read)", grade: "[IV, D]", source: "esmo-2015", quote: "The open technique (cephalic vein cut-down) is the best approach to avoid the risk of immediate complications [IV, D]" },
  ],
  sources: [
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system. Recorded on 11 November 2026; not re-read on 17 November 2026.",
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
      accessed: "2026-11-17",
    },
    {
      key: "shea-clabsi-2022",
      label: "Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update",
      publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)",
      year: 2022,
      url: "https://doi.org/10.1017/ice.2022.87",
      doi: "10.1017/ice.2022.87",
      gradingScheme: "Quality of evidence HIGH, MODERATE or LOW, with each recommendation classed as an essential practice, an additional approach, an approach that should not be considered a routine part of prevention, or an unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "aoa-2025",
      label: "Association of Anaesthetists guidelines: safe vascular access 2025",
      publisher: "Association of Anaesthetists (Anaesthesia, Johnston et al.)",
      year: 2025,
      url: "https://doi.org/10.1111/anae.16727",
      doi: "10.1111/anae.16727",
      gradingScheme: "UK consensus statement: 15 recommendations agreed by a multidisciplinary working party through a two-round Delphi process. The authors say the aim was not to grade evidence, so no grades are printed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aagbi-2016",
      label: "Association of Anaesthetists of Great Britain and Ireland: Safe vascular access 2016",
      publisher: "AAGBI (Anaesthesia, Bodenham et al.)",
      year: 2016,
      url: "https://doi.org/10.1111/anae.13360",
      doi: "10.1111/anae.13360",
      gradingScheme: "UK consensus document from a review of practice and literature and expert opinion; recommendations are not graded. Superseded by the 2025 edition, whose concise text does not cover the management of complications.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "sic-port-2026",
      label: "A GAVeCeLT bundle for chest-port insertion: The SIC-Port protocol",
      publisher: "Journal of Vascular Access (Brescia et al., GAVeCeLT)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298251375833",
      doi: "10.1177/11297298251375833",
      gradingScheme: "Editorial describing a society bundle; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "sip-picc-2024",
      label: "The SIP protocol update: Eight strategies, incorporating Rapid Peripheral Vein Assessment (RaPeVA), to minimize complications associated with peripherally inserted central catheter insertion",
      publisher: "Journal of Vascular Access (Brescia et al.; published online 2022, in print 2024)",
      year: 2024,
      url: "https://doi.org/10.1177/11297298221099838",
      doi: "10.1177/11297298221099838",
      gradingScheme: "Editorial describing a society bundle; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-htg368",
      label: "The Sherlock 3CG Tip Confirmation System for placement of peripherally inserted central catheters (HTG368, formerly MTG24)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/htg368/chapter/1-Recommendations",
      gradingScheme: "NICE does not grade recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-picc",
      label: "PICC lines",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/picc-lines",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022; its next review was due 1 March 2025.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
  ],
  technologies: ["picc-lines", "implanted-ports", "picc-tip-location-systems", "infusion-devices-vascular-access"],
  terms: ["central-venous-access"],
  related: ["venous-access-device-selection-for-anticancer-therapy", "picc-and-tunnelled-line-care", "implanted-port-access-and-care", "catheter-related-thrombosis-in-cancer", "central-line-insertion-bundle"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher returned 403 with a bot check, Europe PMC holds no open copy, and the Internet Archive had answered another checker's request that day with 429, so it was not asked again. What rests on ESMO alone was read on 11 November 2026 and is not re-verified: ports placed under strict sterile conditions in an operating room [II, B], observations after the procedure with a chest X-ray for breathlessness or chest wall pain [II, C], radiological tip confirmation [II, B], intracavitary ECG as an alternative [V, D], the cephalic cut-down [IV, D], its three [I, A] grades and its grading scheme. No newer ESMO guideline on central venous access was found in Europe PMC or Crossref.",
    "Two figures recorded from ESMO 2015 on 11 November 2026 were taken out of the steps on 17 November 2026 because they could not be re-read: the interval between observations after the procedure (recorded as four-hourly) and the oxygen concentration for suspected air embolism (recorded as 100%). The UK anaesthetic guideline of 2016, which was read, says only that a head-down, left lateral tilt and aspiration of air through the line may be useful. No source read on 17 November 2026 says how often to take observations after insertion or for how long.",
    "The patient advice to report breathlessness or chest tightness comes from Macmillan's page on PICC lines, which lists them under blood clots and says to contact the hospital doctor or nurse, without a time limit; the 2016 UK anaesthetic guideline says patients should be warned to report late signs of a collapsed lung without listing them. No source read gives a symptom list or a time limit for the hours after a port or tunnelled line is put in.",
    "The Association of Anaesthetists 2025 guideline was read in its concise published form; its full version is an online appendix that was not read, so what it says on managing complications such as air embolism is not given here. The 2016 edition it replaces is cited for that alone. The coagulation and platelet figures are a UK consensus table, not graded, and the guideline says local protocols should be developed.",
    "No guideline read is specific to inserting tunnelled cuffed (Hickman type) catheters; the steps here are the general central line bundle, and tunnelling technique and cuff position are not covered. CDC calls the preferred site for a tunnelled line, to minimise infection, an unresolved issue. OnCo has no technology record for tunnelled catheters.",
    "The INS Standards (2024) refuse a script and were not read on 17 November 2026, so no step rests on them. The ultrasound recommendations of Lamperti and colleagues (2012) were read as an abstract only.",
    "Whether intra-procedural ECG or echocardiography should replace fluoroscopy and chest X-ray for ports and tunnelled lines is not settled by a graded guideline: the GAVeCeLT bundles say it should, the UK consensus of 2025 accepts either real-time imaging or ECG guidance and still calls fluoroscopy with contrast the gold standard for imaging, and ESMO's 2015 guideline predates ultrasound tip navigation.",
    "CDC and SHEA cover central lines in general, not cancer services in particular. SHEA notes that attention has focused on intensive care for 20 years although most line infections occur outside it or in outpatients; outpatient insertion of ports and PICCs in cancer services is less studied.",
    "Whether a mask on the patient is needed during insertion is not stated by the guidelines read, which list the mask among the operator's barriers.",
    "None of the sources read says which anaesthetic to use for which device, so the page does not.",
  ],
});
