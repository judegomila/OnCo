import { protocol } from "./helpers";

/*
 * Accessing and caring for an implanted port (totally implantable venous access device) in adults having cancer
 * treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): full text. The
 *   publisher pages (annalsofoncology.org, academic.oup.com) returned 403 or a bot challenge to a script and Europe PMC
 *   holds no full text, so the article HTML was read from the Internet Archive's capture of academic.oup.com
 *   (web.archive.org/web/20180603132730/https://academic.oup.com/annonc/article/26/suppl_5/v152/344548), stripped to
 *   text and searched. Grades are quoted as printed in that text.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text. cdc.gov returned "Access Denied" to a script; the PDF was read from the Internet Archive's
 *   capture of cdc.gov/infection-control/media/pdfs/guideline-bsi-h.pdf (4 October 2026) with pdftotext.
 * - SHEA/IDSA/APIC compendium, CLABSI prevention 2022 update (Buetti et al.): full text, Europe PMC full-text XML
 *   (PMC9096710).
 * - epic3 national evidence-based guidelines (Loveday et al., J Hosp Infect 2014): full text, Europe PMC full-text XML
 *   (PMC7114876).
 * - NICE CG139, recommendations page (HTML, full text; published March 2012, last updated February 2017).
 * - Cochrane review CD008462.pub4 (2022), heparin versus 0.9% sodium chloride locking in adults: abstract and plain
 *   language summary only (PMC record holds the abstract; the full review was not read).
 * - Goossens et al., Ann Oncol 2013, saline versus heparin lock in ports (802 patients): abstract only, Europe PMC.
 * - Liu et al., Int J Clin Oncol 2025 (online November 2024), meta-analysis of port flushing intervals: abstract only.
 * - Wang et al., Front Oncol 2022, extended flushing intervals in breast cancer: abstract only.
 * - INS Infusion Therapy Standards of Practice, 9th edition (J Infus Nurs 2024): not reachable. The journal page loads
 *   but serves no standards text to a script and no open copy was found. Named in sources; no step rests on it.
 * - RCN Standards for Infusion Therapy: the RCN page at the expected address returned 404 and no current edition could
 *   be found to read; not cited. ONS Access Device Standards of Practice: a priced book, not read, not cited.
 * - Local policies, as variants only, full text: NHS Borders TIVAD protocol (issue 2, August 2020) and Shared Health
 *   Manitoba clinical procedure P02.2 (version 20 May 2025, a procedure for paramedic practitioners, all ages).
 *
 * Masks and turning the head away (the owner's question): none of ESMO 2015, CDC/HICPAC 2011, SHEA 2022, epic3 or
 * NICE CG139 asks for a mask on the clinician or the patient, or for the patient to turn their head away, when a port
 * is accessed, flushed or dressed. The masks they mention are for inserting a central line (CDC, SHEA, ESMO "maximal
 * sterile barrier precautions") or for splash risk (epic3 SP29). The Manitoba procedure states both. A web search
 * summary claimed the INS standards call a mask at access an unresolved issue; that could not be read and is not used.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; where a source sentence ends in a reference list, the quote stops before
 * it.
 */
export const implantedPortAccessAndCare = protocol({
  id: "implanted-port-access-and-care",
  name: "Implanted port access, flushing and care in adults having cancer treatment",
  aka: ["port access", "accessing a portacath", "port-a-cath care", "Huber needle access", "port flush", "port de-access", "TIVAD care", "totally implantable venous access device care", "chemo port care"],
  domain: "vascular-access",
  tldr: "A port is a small disc under the skin of the chest or arm that lets nurses give treatment and take blood through a special needle. Each time it is used the nurse should clean their hands and your skin, check that blood comes back before giving treatment and flush it with salt water, and between courses it is usually flushed about every four weeks.",
  simple: "A port is a little device under your skin for treatment and blood tests. The nurse cleans their hands and your skin, puts a special needle in, checks it works and rinses it with salt water. Tell your team if the skin over it goes red, sore or swollen, or if you get a fever.",
  summary: "Port care rests on general central line infection prevention rather than port-specific trials. Hand hygiene before and after accessing (CDC/HICPAC Category IB) and aseptic technique (CDC IB; NICE CG139 names ANTT as one framework) come first. Skin and hub antisepsis is chlorhexidine in alcohol: CDC IA (>0.5% with alcohol, during dressing changes), epic3 IVAD23 Class A (2% chlorhexidine in 70% isopropyl alcohol, allowed to air dry), ESMO [I, A]. Hubs and connectors are scrubbed before each access (CDC IA, SHEA moderate quality, epic3 IVAD30 Class D/GPP for at least 15 seconds). Drying times beyond 'allow to dry' come from manufacturers and local policy.\n\nAccess is with a non-coring needle under aseptic technique, and blood return is confirmed before treatment; no guideline read grades either step, and the INS standards, which do address port access, could not be read. The site of an accessed port is covered with a sterile transparent dressing changed every 7 days or sooner if lifted or damp (NICE 1.4.3.4; CDC Category II for implanted sites). Needle change intervals are not stated in the national guidelines read; UK local policy changes the needle weekly.\n\nFlush with 0.9% saline after every infusion or sample (ESMO [II, B]; epic3 IVAD34 Class A for frequently accessed lumens). On the lock, the evidence favours saline: the Cochrane review (2022, 12 RCTs, 2422 adults) found low-certainty evidence of fewer occlusions with heparin (RR 0.70, 95% CI 0.51 to 0.95) and was uncertain of any benefit; in ports specifically, a randomised trial of 802 patients found saline non-inferior to heparin 300 U/3 ml. NICE keeps heparin where the port maker recommends it (1.4.4.7, 2003). For ports not in use ESMO recommends a four-weekly flush [III, C]; a 2025 meta-analysis of 11 mostly observational studies tended to support three months, with caution.\n\nNo national or international guideline read recommends a mask for the clinician or the patient, or the patient turning their head away, at port access or dressing change; masks in these guidelines are for line insertion or splash risk. Some local policies require both (variants).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "home", "community"],
  },
  population: "Adults with an implanted port (totally implantable venous access device) having cancer treatment, in any cancer. The general guidelines cited cover all central venous catheters in adults (SHEA states its recommendations are not stratified by catheter type); children, power injection through the port, and ports placed for dialysis or parenteral nutrition alone follow their own protocols and are not covered here.",
  trigger: "A port is to be used for treatment or blood sampling, or is due its routine flush while not in use.",
  steps: [
    {
      action: "Look at and feel the skin over the port before you start, and do not use the port if there are signs of infection",
      why: "Redness, swelling, pain or discharge over the port can mean the pocket is infected, and pushing a needle through it can carry germs into the blood.",
      source: "cdc-hicpac-2011",
      quote: "Monitor the catheter sites visually when changing the dressing or by palpation through an intact dressing on a regular basis, depending on the clinical situation of the individual patient.",
      grade: "Category IB",
    },
    {
      action: "Clean your hands before and after touching the port, the needle or the dressing",
      why: "Hands are the commonest route by which germs reach a line.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Use aseptic technique throughout, such as Aseptic Non Touch Technique, with sterile gloves for the needle insertion",
      why: "The port's catheter ends in a large vein near the heart, so anything that touches the needle or hub must stay sterile.",
      source: "nice-cg139",
      quote: "An aseptic technique must be used for vascular access device catheter site care and when accessing the system",
      grade: "[new 2012]",
    },
    {
      action: "Clean the skin over the port with 2% chlorhexidine in 70% alcohol and let it dry completely before the needle goes in",
      why: "Chlorhexidine with alcohol kills skin bacteria best, and it only works fully once it has dried; drying also stops it being carried into the skin by the needle.",
      source: "epic3",
      quote: "Use a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) to clean the central catheter insertion site during dressing changes, and allow to air dry.",
      grade: "Class A",
    },
    {
      action: "Put a non-coring (Huber type) needle through the centre of the septum, at right angles, until it meets the back of the port",
      why: "An ordinary needle cuts a core out of the port's silicone membrane and can make it leak; a non-coring needle parts it so it reseals.",
      practice: "No national guideline that could be read grades or states the needle type, because each assumes it: ESMO names 'huber needle dislodge' among causes of occlusion, and the port manufacturers' instructions and every local policy read (NHS Borders, Shared Health Manitoba) specify a non-coring needle. The INS standards, which address it, could not be read.",
    },
    {
      action: "Draw back to check for blood return before giving any treatment, and do not give vesicant treatment if there is none",
      why: "Blood coming back shows the needle is in the port and the catheter is open; without it a drug may be going into the tissue instead of the vein.",
      practice: "No guideline read grades this step, though all assume it: ESMO lists catheter dysfunction and failure of aspiration among signs of occlusion and infection, and the port trial of Goossens 2013 counted 'easy injection, impossible aspiration' as its primary outcome. NHS Borders states it as a rule (see variants).",
    },
    {
      action: "Scrub the needleless connector or hub with an antiseptic each time before it is used, and access it only with sterile devices",
      why: "The connector is touched many times during a course of treatment and is a main route for germs into an accessed port.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "Flush with 0.9% saline after every infusion and every blood sample",
      why: "Flushing clears blood and drug from the catheter so it does not clot or let incompatible drugs mix.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended",
      grade: "[II, B]",
    },
    {
      action: "While the needle stays in, cover it with a sterile transparent dressing and change it every 7 days, or sooner if it lifts, gets wet or soiled",
      why: "A sealed clear dressing keeps germs out and lets the site be checked without removing it.",
      source: "nice-cg139",
      quote: "Change the transparent semipermeable membrane dressing covering a central venous access device insertion site every 7 days, or sooner if the dressing is no longer intact or moisture collects under it.",
      grade: "[2012]",
    },
    {
      action: "Keep an accessed port out of baths and swimming pools; showering is allowed with the dressing protected",
      why: "Soaking the needle site lets water and germs under the dressing.",
      source: "cdc-hicpac-2011",
      quote: "Do not submerge the catheter or catheter site in water.",
      grade: "Category IB",
    },
    {
      action: "Lock the port with 0.9% saline before removing the needle, using heparin only where the port maker's instructions or local policy require it",
      why: "Trials in adults have not shown clearly that heparin keeps ports open better than saline, and heparin can rarely cause bleeding or a drop in platelets.",
      source: "nice-cg139",
      quote: "Preferably, a sterile 0.9 percent sodium chloride injection should be used to flush and lock catheter lumens.",
      grade: "[2003]",
    },
    {
      action: "To remove the needle, clean the hub, flush and lock, steady the port with one hand and withdraw the needle, then press on the site with sterile gauze",
      why: "Steadying the port stops the needle springing back and causing a needlestick injury; pressure stops bleeding.",
      source: "nice-cg139",
      quote: "Decontaminate the injection port or vascular access device catheter hub before and after accessing the system using chlorhexidine gluconate in 70% alcohol.",
      grade: "[new 2012]",
    },
    {
      action: "When the port is not in use between courses, flush it every four weeks",
      why: "A regular flush keeps the catheter from blocking; some centres now leave longer gaps (see variants).",
      source: "esmo-2015",
      quote: "To maintain patency of subcutaneous ports that are not in active use, a four weekly flush is recommended",
      grade: "[III, C]",
    },
    {
      action: "Teach the patient and carer what to watch for and ask them to report any change at the port or any new discomfort",
      why: "Most problems start between visits, and the person living with the port is the first to see them.",
      source: "cdc-hicpac-2011",
      quote: "Encourage patients to report any changes in their catheter site or any new discomfort to their provider.",
      grade: "Category II",
    },
    {
      action: "Treat fever, chills, low blood pressure, or redness, pain, swelling or discharge over the port as a possible line infection: take paired blood cultures from the port and a vein and start treatment",
      why: "Infection of the port or bloodstream needs blood cultures before antibiotics and can need the port removed; in someone with low white cells it is an emergency.",
      source: "esmo-2015",
      quote: "If CRBSI is suspected, collect paired blood (acquiring the same volume of blood) from the catheter and from a peripheral vein",
      grade: "[II, A]",
    },
    {
      action: "If the port will not flush or will not give blood back, or the arm, neck or face swells, stop and get it assessed, with an ultrasound scan if a clot is suspected",
      why: "A blocked port or a clot around the catheter needs to be found and treated rather than forced.",
      source: "esmo-2015",
      quote: "Doppler ultrasound should be carried out if thrombosis is suspected",
      grade: "[III, A]",
    },
  ],
  bestInClass: {
    statement: "Hand hygiene, aseptic technique, chlorhexidine in alcohol on the skin and hub allowed to dry, a non-coring needle, a check for blood return, a 0.9% saline flush after every use, a transparent dressing changed every 7 days while accessed, and a four-weekly flush when the port is not in use (ESMO 2015 [III, C]). On the lock, the guidelines differ. ESMO 2015 and epic3 (Class A for frequently accessed lumens) favour saline, supported by a port-specific randomised trial (Goossens 2013, saline non-inferior to heparin in 802 patients) and a Cochrane review (2022) that could not show heparin is better; NICE CG139 (2003 wording) keeps heparin where the port manufacturer recommends it, and ESMO says that if heparin is used it should be more than 500 units. Masks for the clinician or patient, and the patient turning their head away, are not part of any national or international guideline read; they are local practice.",
    sources: ["esmo-2015", "cdc-hicpac-2011", "epic3", "nice-cg139", "cochrane-heparin-saline-2022", "goossens-2013"],
  },
  variants: [
    {
      name: "Heparin lock",
      differs: "Locks the port with heparinised saline (often 100 units/ml) after the saline flush, instead of saline alone. NHS Borders locks with 4 ml of 100 units/ml when the port is not in use; the Manitoba procedure locks with 3 or 6 ml of 100 units/ml depending on port size.",
      evidence: "Cochrane 2022 (12 RCTs, 2422 adults, two oncology studies): low-certainty evidence that heparin may give fewer occlusions (RR 0.70, 95% CI 0.51 to 0.95), no clear difference in patency duration, bloodstream infection or bleeding, and too few patients to detect heparin-induced thrombocytopenia. Goossens 2013 (802 port patients): saline lock non-inferior to heparin 300 U/3 ml. NICE keeps heparin where the manufacturer recommends it.",
      sources: ["cochrane-heparin-saline-2022", "goossens-2013", "nice-cg139", "nhs-borders-tivad-2020", "manitoba-p02-2"],
    },
    {
      name: "Longer flushing interval between courses",
      differs: "Flushes a port that is not in use every two to three months, or longer, rather than every four weeks.",
      evidence: "ESMO notes reports of every 8 weeks or every 3 to 4 months and calls for prospective study. A 2025 meta-analysis of 11 studies (4924 participants, mostly observational) tended to support three-monthly flushing with no expected rise in occlusion or overall complications, to be read with caution; one analysis showed more occlusion at two to three months (RR 1.50) that did not survive sensitivity analysis. A single-centre retrospective study in 617 people with breast cancer found no difference in complications with intervals of 91 to 120 days.",
      sources: ["esmo-2015", "liu-flush-interval-2025", "wang-breast-flush-2022"],
    },
    {
      name: "Masks for clinician and patient, and the patient's head turned away",
      differs: "The clinician wears a procedure mask, a mask is placed on the patient and anyone staying nearby, and the patient lies flat with their head turned away from the port during access. Shared Health Manitoba P02.2 states: \"Put a procedure mask on. Place a mask on the patient, as well as any other individuals who will remain in the vicinity.\" and \"Have the patient lay supine, and turn their head away from the port.\" The procedure applies to all ages, has a sterile field and drape, and is written for paramedic practitioners.",
      evidence: "No national or international guideline read recommends it (ESMO 2015, CDC/HICPAC 2011, SHEA 2022, epic3, NICE CG139). Those guidelines specify masks only as part of maximal sterile barrier precautions for inserting a central line, or where blood or body fluid may splash (epic3 SP29, Class D/GPP H&S). The rationale is to keep droplets from the mouth and nose off the sterile field; no trial of it at port access was found.",
      sources: ["manitoba-p02-2", "cdc-hicpac-2011", "shea-clabsi-2022", "epic3"],
    },
    {
      name: "Weekly needle change with a new puncture site, and a minimum skin drying time",
      differs: "NHS Borders changes the needle weekly if the port is in constant use, using a different puncture site, and lets chlorhexidine dry for at least a minute; it also makes blood return a rule before any intravenous therapy.",
      evidence: "Local policy (issue 2, August 2020; its review date of July 2023 has passed). The national guidelines read give no needle change interval and no drying time beyond 'allow to dry'.",
      sources: ["nhs-borders-tivad-2020"],
    },
  ],
  grades: [
    { claim: "Hand hygiene before and after accessing or dressing an intravascular catheter", grade: "Category IB", source: "cdc-hicpac-2011" },
    { claim: "Chlorhexidine above 0.5% with alcohol for skin preparation during dressing changes", grade: "Category IA", source: "cdc-hicpac-2011", quote: "Prepare clean skin with a >0.5% chlorhexidine preparation with alcohol before central venous catheter and peripheral arterial catheter insertion and during dressing changes." },
    { claim: "2% chlorhexidine in 70% isopropyl alcohol at the central catheter site during dressing changes, allowed to air dry", grade: "Class A", source: "epic3" },
    { claim: "Chlorhexidine above 0.5% with alcohol for antisepsis, as a main strategy against catheter infection", grade: "[I, A]", source: "esmo-2015", quote: "Use of >0.5% chlorhexidine skin preparation with alcohol for antisepsis [I, A]" },
    { claim: "Scrub the access port with an antiseptic and access it only with sterile devices", grade: "Category IA", source: "cdc-hicpac-2011" },
    { claim: "Disinfect hubs, needleless connectors and injection ports before access", grade: "Quality of Evidence: MODERATE", source: "shea-clabsi-2022", quote: "Disinfect catheter hubs, needleless connectors, and injection ports before accessing the catheter (Quality of Evidence: MODERATE)" },
    { claim: "Decontaminate the access port or hub with 2% chlorhexidine in 70% alcohol for at least 15 seconds and let it dry", grade: "Class D/GPP", source: "epic3", quote: "The hub should be cleaned for a minimum of 15 s and allowed to dry before accessing the system." },
    { claim: "Saline flush after every infusion or blood sample", grade: "[II, B]", source: "esmo-2015" },
    { claim: "Sterile normal saline to flush and lock lumens accessed frequently", grade: "Class A", source: "epic3", quote: "Use sterile normal saline for injection to flush and lock catheter lumens that are accessed frequently." },
    { claim: "Heparin versus saline flushing made no difference to thrombosis rates", grade: "[I, C]", source: "esmo-2015", quote: "However, when compared with 0.9% normal saline flushing, no differences in thrombosis rates were found [I, C]" },
    { claim: "Heparin lock may reduce occlusion compared with saline (RR 0.70, 95% CI 0.51 to 0.95)", grade: "low-certainty evidence", source: "cochrane-heparin-saline-2022" },
    { claim: "Four-weekly flush for ports not in active use", grade: "[III, C]", source: "esmo-2015" },
    { claim: "Replace transparent dressings on implanted CVC sites no more than once a week, unless soiled or loose, until the site has healed", grade: "Category II", source: "cdc-hicpac-2011", quote: "Replace transparent dressings used on tunneled or implanted CVC sites no more than once per week (unless the dressing is soiled or loose), until the insertion site has healed." },
    { claim: "Paired blood cultures from the catheter and a peripheral vein when line infection is suspected", grade: "[II, A]", source: "esmo-2015" },
    { claim: "Remove the line for, among others, port abscess, tunnel infection or severe sepsis", grade: "[II, A]", source: "esmo-2015", quote: "Indications to remove the CVC are: severe sepsis, suppurative (septic) thrombophlebitis, endocarditis, tunnel infection, port abscess" },
    { claim: "Masks and eye protection where blood or body fluid may splash into the face and eyes (the only epic3 mask recommendation relevant to line care)", grade: "Class D/GPP H&S", source: "epic3", quote: "Fluid-repellent surgical face masks and eye protection must be worn where there is a risk of blood or body fluids splashing into the face and eyes." },
    { claim: "Maximal sterile barrier precautions, including a mask, for inserting central lines, PICCs or a guidewire exchange (not for accessing a port)", grade: "Category IB", source: "cdc-hicpac-2011", quote: "Use maximal sterile barrier precautions, including the use of a cap, mask, sterile gown, sterile gloves, and a sterile full body drape, for the insertion of CVCs, PICCs, or guidewire exchange" },
  ],
  sources: [
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system; ungraded statements are standard practice in the experts' view.",
      read: "full-text",
      accessed: "2026-11-11",
    },
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
      publisher: "SHEA, IDSA, APIC (Infection Control and Hospital Epidemiology)",
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
      key: "goossens-2013",
      label: "Comparing normal saline versus diluted heparin to lock non-valved totally implantable venous access devices in cancer patients: a randomised, non-inferiority, open trial",
      publisher: "Annals of Oncology (Goossens et al.)",
      year: 2013,
      url: "https://doi.org/10.1093/annonc/mdt114",
      doi: "10.1093/annonc/mdt114",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "liu-flush-interval-2025",
      label: "Is it feasible to prolong the flushing interval for totally implantable venous access devices (TIVADs)? A systematic review and meta-analysis",
      publisher: "International Journal of Clinical Oncology (Liu et al.)",
      year: 2025,
      url: "https://doi.org/10.1007/s10147-024-02665-2",
      doi: "10.1007/s10147-024-02665-2",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "wang-breast-flush-2022",
      label: "Safety and feasibility assessment of extending the flushing interval in totally implantable venous access port flushing during the non-treatment stage for patients with breast cancer",
      publisher: "Frontiers in Oncology (Wang et al.)",
      year: 2022,
      url: "https://doi.org/10.3389/fonc.2022.1021488",
      doi: "10.3389/fonc.2022.1021488",
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
    {
      key: "nhs-borders-tivad-2020",
      label: "Totally Implanted Venous Access Devices (TIVAD) or PortaCath Protocol, issue 2",
      publisher: "NHS Borders",
      year: 2020,
      url: "https://rightdecisions.scot.nhs.uk/media/1806/protocol-for-tivad-port-2020_1.pdf",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "manitoba-p02-2",
      label: "P02.2: Medication and fluid administration by subcutaneous port (clinical procedure, version 2025-05-20)",
      publisher: "Shared Health Manitoba",
      year: 2025,
      url: "https://healthproviders.sharedhealthmb.ca/download/924/p-standard-clinical-procedures/42744/p02-2-medication-fluid-administration-by-subcutaneous-port.pdf",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["implanted-ports", "infusion-devices-vascular-access", "huber-needles-port-access"],
  terms: ["central-venous-access", "febrile-neutropenia", "vte", "extravasation-infusion-reaction"],
  related: [],
  upgrades: ["idea-upgrade-masks-and-head-turn-at-port-access-infection-study"],
  gaps: [
    "No national or international guideline read (ESMO 2015, CDC/HICPAC 2011, SHEA 2022, epic3 2014, NICE CG139) recommends a mask on the clinician or the patient, or the patient turning their head away, when a port is accessed, flushed or dressed. Their mask recommendations cover central line insertion (maximal sterile barrier precautions) and splash risk only. A public provincial procedure (Shared Health Manitoba P02.2) requires both; whether the INS standards address it could not be checked.",
    "The INS Infusion Therapy Standards of Practice, 9th edition (2024), the most detailed standard on port access, needle change and flushing, could not be read: the journal served no standards text to a script and no open copy was found. Nothing here rests on it.",
    "No current edition of the RCN Standards for Infusion Therapy could be found to read, and the ONS Access Device Standards of Practice is a priced book; neither is cited.",
    "The needle change interval for a port left accessed is not stated in any national guideline read. Weekly change is common local practice (NHS Borders).",
    "Skin drying time: the guidelines say only to let the antiseptic dry, or to follow the manufacturer. The one-minute and 30-second figures in local policies are local.",
    "The heparin versus saline evidence is low to very low certainty across all central venous catheters, with only two oncology studies in the Cochrane review; the Cochrane full text, the Goossens trial and the flushing-interval studies were read as abstracts only.",
    "The ESMO guideline dates from 2015 and the CDC guideline from 2011 (updated 2017); no newer ESMO guideline on venous access was found.",
  ],
});
