import { protocol } from "./helpers";

/*
 * Removing a central venous access device (PICC, tunnelled line or port) at the end of treatment or because of a
 * complication, in adults with cancer.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched or re-used as
 * raw text and every quote checked by script (whitespace and line-break hyphenation normalised, XML tags and
 * citation-number cross-references stripped, nothing else).
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, re-used from the copy another checker saved from cdc.gov on 17 November.
 * - IDSA Clinical Practice Guidelines for intravascular catheter-related infection, 2009 update (DOI 10.1086/599376):
 *   full text, re-used from the copy another checker saved on 16 November. IDSA marks it archived.
 * - AGIHO/DGHO 2020 guideline on catheter-related infections in haematology and oncology (DOI
 *   10.1007/s00277-020-04286-x): full text, Europe PMC XML, re-used from another checker's copy of 17 November. New
 *   on this page.
 * - Association of Anaesthetists, Safe vascular access 2016 (DOI 10.1111/anae.13360) and its 2025 update (DOI
 *   10.1111/anae.16727): full text of both, Europe PMC XML, fetched on 17 November. New on this page. The 2016 text
 *   gives the removal technique; the 2025 text gives the clotting and platelet table for removal (read from the XML
 *   table cells) and the advice on anticoagulants.
 * - McCarthy et al., Air Embolism: Practical Tips for Prevention and Treatment (J Clin Med 2016, DOI
 *   10.3390/jcm5110093): full text, Europe PMC XML. A review, not a guideline. New on this page.
 * - Benetti et al., integrative review of preventing air embolism at catheter removal (J Vasc Bras 2025, DOI
 *   10.1590/1677-5449.202500192): full text, Europe PMC XML. New on this page.
 * - Pacini et al., delayed air embolism after central venous catheter removal, systematic review (J Crit Care 2026, DOI
 *   10.1016/j.jcrc.2026.155606): abstract only, from Europe PMC; the full text needs a subscription.
 * - Macmillan Cancer Support, PICC lines: public page, re-used from another checker's copy of 17 November.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015, DOI 10.1093/annonc/mdv296): read in
 *   full on 11 November; on 16 and 17 November the publisher answered 403 and the Internet Archive 429 to other
 *   checkers, and Europe PMC lists no open copy, so it was not re-read and no step rests on it now.
 * - INS Standards (2024): refuse a script; not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked.
 */
export const centralLineRemoval = protocol({
  id: "central-line-removal",
  name: "Central line and port removal: when, how and what to watch for afterwards",
  aka: ["PICC removal", "port removal", "Hickman line removal", "CVAD removal", "taking out a central line", "line removal air embolism", "port explant"],
  domain: "vascular-access",
  tldr: "A central line or port is taken out when treatment is finished or if it causes a problem such as an infection. A nurse usually pulls a PICC out gently in a few minutes; a port or a cuffed line needs a small surgical procedure. You lie flat as it comes out, and the place is pressed and then sealed with a dressing. This is to stop air getting into the vein, an uncommon but serious problem.",
  simple: "When you no longer need your line, it is taken out. You lie flat while this is done and a dressing seals the place afterwards. Tell the staff straight away if you then find it hard to breathe, feel confused or weak, or suddenly feel unwell.",
  summary: "Lines come out when no longer essential (CDC Category IA) or for complications. For infection in people with cancer, AGIHO/DGHO (2020) says to remove the line whenever possible (AIIt). IDSA (2009, now marked archived by IDSA) lists when a long-term line should come out: bloodstream infection with severe sepsis, suppurative thrombophlebitis or endocarditis, bloodstream infection continuing beyond 72 hours of effective antimicrobials, or infection with Staphylococcus aureus, Pseudomonas aeruginosa, fungi or mycobacteria (A-II); and tunnel infection or port abscess (A-II). Catheter tips are cultured only when the line is removed for suspected infection, not routinely (IDSA A-II); for a port, the reservoir contents are cultured too (IDSA B-II). A clot around the line is not in itself a reason to remove it: the Association of Anaesthetists (2025) says a line that is still required, working, well placed and not infected can stay while the patient is anticoagulated.\n\nBefore removal, the Association of Anaesthetists (2025, a UK consensus document without grades) asks for no routine blood tests unless the illness or its treatment is likely to impair clotting, liver or bone marrow function. Its table for removal says no treatment is normally required before a PICC or a non-tunnelled line of 8.5 Fr or less comes out, even with an INR of 1.5 or more, given a platelet count of at least 10 × 10⁹/L. For a tunnelled line or port with an INR of 1.5 or more (or a PT of 18 seconds or more, an APTT of 42 seconds or more, or an APTT ratio of 1.5 or more) it says to consider correcting the coagulopathy and gives a platelet count of at least 30 × 10⁹/L. Treatment-dose anticoagulants should normally be stopped before a tunnelled line or port is removed and can usually continue for a PICC; antiplatelet drugs and prophylactic-dose anticoagulants do not normally need to be stopped.\n\nA PICC is pulled out, usually by a nurse in an outpatient department (Macmillan). Cuffed lines and ports need a surgical cut-down (Association of Anaesthetists 2016). For the removal itself the 2016 guideline says the patient should lie flat with the exit site below the heart, with firm digital pressure for at least 5 minutes and then an occlusive dressing. A 2016 review (McCarthy) adds a Valsalva manoeuvre as the catheter leaves, or removal during active expiration, an impermeable dressing with pressure for 5 to 10 minutes, and lying flat for 30 minutes afterwards. A 2025 integrative review found only two studies of prevention and calls the evidence limited. The reason for all of this is air embolism: a 2026 systematic review of 28 case reports of delayed air embolism after central venous catheter removal found symptoms began 10 minutes to over 2 hours afterwards, a persisting channel through the skin in 10 of the 11 patients investigated for a cause, permanent neurological harm in 18% and death in 32%. If air embolism is suspected, the sources read give 100% oxygen and, for air in the veins, the head-down left-side position; the 2016 review keeps a patient with air in the arteries flat instead.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "surgical-team"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "theatre"],
  },
  population: "Adults with cancer who have a PICC, tunnelled cuffed central catheter or implanted port that is no longer needed or must come out because of a complication. The infection sources are scoped to long-term catheters (IDSA) and to people with cancer (AGIHO/DGHO); the removal technique and the blood-test thresholds come from UK anaesthetic guidance written for all patients with a central line, and the air embolism reviews cover central venous catheters of every kind. Non-tunnelled lines in intensive care and dialysis catheters are not covered here.",
  trigger: "Treatment through the line has ended, or infection, thrombosis, malfunction or malposition makes removal necessary.",
  steps: [
    {
      action: "Remove the line promptly once it is no longer essential",
      why: "CDC's infection prevention guideline asks for this, so that a line nobody needs is not left in as a possible route for infection.",
      source: "cdc-hicpac-2011",
      quote: "Promptly remove any intravascular catheter that is no longer essential [69–72].",
      grade: "Category IA",
    },
    {
      action: "When a person with cancer has an infected line, remove it whenever possible",
      why: "Keeping the line in can mean the infection is not cured, or comes back, despite antibiotics. The same guideline allows a first attempt to keep the line in clinically stable patients when the germ is a coagulase-negative staphylococcus or Corynebacterium jeikeium (BIIt).",
      source: "agiho-dgho-2020",
      quote: "Remove the CVC in patients with CRI whenever possible (AIIt).",
      grade: "AIIt",
    },
    {
      action: "Remove a long-term line when a bloodstream infection from it comes with severe sepsis, suppurative thrombophlebitis or endocarditis, continues beyond 72 hours of effective antimicrobials, or is caused by Staphylococcus aureus, Pseudomonas aeruginosa, fungi or mycobacteria",
      why: "These are the situations in which IDSA says a long-term line should not be kept. IDSA now marks this 2009 guideline as archived.",
      source: "idsa-2009",
      quote: "Long-term catheters should be removed from patients with CRBSI associated with any of the following conditions: severe sepsis; suppurative thrombophlebitis; endocarditis; bloodstream infection that continues despite >72 h of antimicrobial therapy to which the infecting microbes are susceptible; or infections due to S. aureus, P. aeruginosa, fungi, or mycobacteria (A-II).",
      grade: "A-II",
    },
    {
      action: "Remove the line or port for a tunnel infection or a port abscess",
      why: "IDSA pairs removal with drainage where it is indicated and with 7 to 10 days of antibiotics when there is no bacteraemia or candidaemia. AGIHO/DGHO also says removal is necessary for tunnel and pocket infections (BIII).",
      source: "idsa-2009",
      quote: "Patients with tunnel infection or port abscess require removal of the catheter, incision and drainage if indicated, and 7–10 days of antibiotic therapy (A-II) in the absence of concomitant bacteremia or candidemia.",
      grade: "A-II",
    },
    {
      action: "Send the catheter tip for culture only if the line is removed for suspected infection",
      why: "IDSA recommends against culturing catheters routinely, and for central lines asks for the tip rather than the segment under the skin (B-III).",
      source: "idsa-2009",
      quote: "Catheter cultures should be performed when a catheter is removed for suspected catheter-related bloodstream infection (CRBSI); catheter cultures should not be obtained routinely (A-II).",
      grade: "A-II",
    },
    {
      action: "When a port is removed for suspected infection, send the port so that the reservoir contents are cultured as well as the catheter tip",
      why: "IDSA reports that, for ports, culture of the material inside the reservoir is more sensitive than culture of the catheter tip.",
      source: "idsa-2009",
      quote: "If a venous access subcutaneous port is removed because of suspected CRBSI, send the port to the microbiology laboratory for qualitative culture of the port reservoir contents, in addition to the catheter tip (B-II).",
      grade: "B-II",
    },
    {
      action: "Do not remove a line only because a clot has formed around it: if it is still required, working, in a good position and not infected, and the limb is not threatened, it can stay while the person is anticoagulated",
      why: "The line is still doing its job and the clot is treated with anticoagulation, which the guideline recommends for at least 3 months. No source read today says how removal and anticoagulation should be timed when such a line does have to come out.",
      source: "aoa-2025",
      quote: "In general, for catheter‐related central venous thrombosis, if the catheter is still required, in a good position, not infected, working and the limb is not threatened, then the line can be left in situ and the patient should be anticoagulated; local protocols should be developed.",
    },
    {
      action: "Check clotting and the platelet count before removal only when the illness or its treatment is likely to have affected them",
      why: "Routine tests are not needed. For a PICC, no treatment is normally required before removal with a platelet count of at least 10 × 10⁹/L. For a tunnelled line or port with an INR of 1.5 or more, the guideline says to consider correcting the clotting and gives a platelet count of at least 30 × 10⁹/L. It asks that these figures be read alongside the patient, the operator and local guidelines.",
      source: "aoa-2025",
      quote: "Patients having a CVAD inserted or removed do not need routine laboratory blood tests unless the condition or treatments are likely to impair coagulation, liver function or bone marrow function.",
    },
    {
      action: "Plan anticoagulants around the device: a PICC can usually come out on treatment-dose anticoagulation, which should normally be stopped before a tunnelled line or port is removed",
      why: "The guideline gives stopping low molecular weight heparin for 24 hours, apixaban, rivaroxaban or edoxaban for 24 to 48 hours and dabigatran for 24 to 72 hours, with the exact timing depending on kidney function, bleeding risk and local policy. Antiplatelet drugs and prophylactic-dose anticoagulants do not normally need to be stopped.",
      source: "aoa-2025",
      quote: "Treatment doses of anticoagulants can usually be continued during the insertion of PICCs and uncomplicated temporary central venous catheters, and during the removal of PICCs and temporary central venous catheters up to 8.5 Fr.",
    },
    {
      action: "Pull a PICC out gently; refer a cuffed tunnelled line or a port for removal by surgical cut-down",
      why: "Cuffed lines and ports develop adherent fibrin sleeves and scar tissue. Macmillan describes a PICC being gently pulled out, usually by a nurse in an outpatient department. The anaesthetists' guideline says to seek advice from vascular surgery or interventional radiology if there are difficulties.",
      source: "aoa-2016",
      quote: "Cuffed devices/ports need surgical cut‐downs as they develop complex adherent fibrin sleeves and scar tissue",
    },
    {
      action: "Remove the catheter with the person lying flat and the exit site below the heart, press firmly with the fingers for at least 5 minutes, then cover the site with an occlusive dressing",
      why: "Lying flat with the exit site below the heart is to reduce the risk of air being drawn into the vein.",
      source: "aoa-2016",
      quote: "Firm digital pressure should be applied for at least 5 min, followed by an occlusive dressing.",
    },
    {
      action: "Ask the person to bear down (a Valsalva manoeuvre) as the catheter comes out or, if they cannot, remove it as they breathe out; keep them lying flat for 30 minutes afterwards",
      why: "This comes from a 2016 review rather than a guideline. The review gives the reason for the position as keeping the pressure in the central veins up at the moment of removal, and also asks for an impermeable dressing over the exit site, with pressure for 5 to 10 minutes.",
      source: "mccarthy-2016",
      quote: "Patients should be instructed to perform a Valsalva maneuver during catheter removal, if possible.",
    },
    {
      action: "Stay alert after removal, and ask the person to tell staff straight away about trouble breathing, confusion, weakness or feeling suddenly unwell, including hours later",
      why: "In the reported cases of delayed air embolism, symptoms began up to more than two hours after removal; 92% of patients had neurological signs and 90% a fall in oxygen levels.",
      source: "pacini-2026",
      quote: "Symptoms developed between ten minutes and one hour after removal of CVC in 54% of cases, between one and two hours in 14%, and after more than two hours in 32%.",
    },
    {
      action: "If air embolism is suspected, call for help and give 100% oxygen; for air in the veins, lay the person on their left side with the head down",
      why: "The review puts airway, breathing and circulation first in an unresponsive patient. It says the left-side, head-down position moves the air away from the outflow of the right side of the heart, and that a patient with air in the arteries should be kept flat because the head-down position may worsen brain swelling. The Association of Anaesthetists (2016) says head-down, left lateral tilt and attempted aspiration of air through the line may be useful.",
      source: "mccarthy-2016",
      quote: "Once stabilized, the patient should be examined (including neurological examination) and 100% oxygen treatment administered by a non-rebreather mask to maximize end-organ oxygenation.",
    },
  ],
  bestInClass: {
    statement: "Remove lines promptly when no longer essential (CDC IA) and for infection whenever possible in people with cancer (AGIHO/DGHO AIIt), in particular in the situations IDSA lists (A-II; archived by IDSA, and no newer IDSA text was found). Culture tips only for suspected infection (IDSA A-II) and port reservoirs when ports are removed for infection (IDSA B-II). A clot alone is not a reason for removal if the line is needed and working (Association of Anaesthetists 2025). The most recent UK consensus for bleeding risk at removal is the Association of Anaesthetists 2025 table, which has no grades and sets lower platelet thresholds than the British Society for Haematology guidance it cites. For the removal technique the only guideline that could be read is the Association of Anaesthetists 2016 text (lying flat with the exit site below the heart, at least 5 minutes of firm pressure, an occlusive dressing), also ungraded; the Valsalva manoeuvre and 30 minutes lying flat rest on a 2016 review. The 2026 systematic review of delayed air embolism asks for increased vigilance during and after removal and sets no observation time.",
    sources: ["cdc-hicpac-2011", "agiho-dgho-2020", "idsa-2009", "aoa-2025", "aoa-2016", "mccarthy-2016", "pacini-2026"],
  },
  variants: [
    {
      name: "Trying to keep an infected line",
      differs: "AGIHO/DGHO says keeping the line may be attempted at first in clinically stable patients when the germ is a coagulase-negative staphylococcus or Corynebacterium jeikeium (BIIt), with prompt removal on any clinical deterioration or if blood cultures are still positive 72 hours after appropriate treatment began.",
      evidence: "The same guideline always recommends early removal for Staphylococcus aureus (AIIt) and Candida (AIIt), and removal within 48 to 72 hours for Gram-negative bacteria (BIIt). It notes that keeping the line has not been tested as a strategy in any randomised trial in patients with suspected catheter-related infection.",
      sources: ["agiho-dgho-2020"],
    },
    {
      name: "Higher platelet thresholds before removal",
      differs: "The Association of Anaesthetists working party notes the transfusion thresholds in British Society for Haematology guidance and says it reached a different consensus, that lower platelet counts are acceptable before transfusion should be necessary.",
      evidence: "Consensus on both sides, as the 2025 guideline reports it; the British Society for Haematology guidance was not read for this page, so its figures are not given here. The 2025 guideline says clinician discretion should always be applied in determining a threshold.",
      sources: ["aoa-2025"],
    },
  ],
  grades: [
    { claim: "Culture the catheter tip, not the subcutaneous segment, for CVCs", grade: "B-III", source: "idsa-2009", quote: "For CVCs, culture the catheter tip, not the subcutaneous segment (B-III)." },
    { claim: "Removal is necessary for tunnel and pocket infections in people with cancer", grade: "BIII", source: "agiho-dgho-2020", quote: "CVC removal is necessary in patients with tunnel and pocket infections (BIII)." },
    { claim: "Early removal for Staphylococcus aureus bloodstream infection in people with cancer", grade: "AIIt", source: "agiho-dgho-2020", quote: "Early CVC removal is always recommended in patients with CRBSI due to S. aureus (AIIt)." },
  ],
  sources: [
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
      key: "idsa-2009",
      label: "Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America",
      publisher: "IDSA (Clinical Infectious Diseases, Mermel et al.); marked archived by IDSA",
      year: 2009,
      url: "https://doi.org/10.1086/599376",
      doi: "10.1086/599376",
      gradingScheme: "Strength A (good evidence) to C (poor evidence); quality I (at least one randomised trial), II (non-randomised trials, cohort or case-control studies) or III (expert opinion).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "agiho-dgho-2020",
      label: "Central venous catheter-related infections in hematology and oncology: 2020 updated guidelines on diagnosis, management, and prevention by the Infectious Diseases Working Party (AGIHO) of the German Society of Hematology and Medical Oncology (DGHO)",
      publisher: "AGIHO/DGHO (Annals of Hematology, 2021)",
      year: 2021,
      url: "https://doi.org/10.1007/s00277-020-04286-x",
      doi: "10.1007/s00277-020-04286-x",
      gradingScheme: "Strength A (strongly supports use), B (moderately), C (marginally), D (supports a recommendation against use); quality I (at least one randomised controlled trial), II (non-randomised trials, cohort or case-control studies, time series) or III (expert opinion), with an added index such as t for evidence transferred from other patient groups. Printed as AIIt.",
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
      gradingScheme: "Consensus document of an expert working party, built on literature review and expert opinion; it states that its focus was not to grade evidence, and prints no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aoa-2016",
      label: "Association of Anaesthetists of Great Britain and Ireland: Safe vascular access 2016",
      publisher: "Association of Anaesthetists of Great Britain and Ireland (Anaesthesia, Bodenham et al.); updated by the 2025 guideline",
      year: 2016,
      url: "https://doi.org/10.1111/anae.13360",
      doi: "10.1111/anae.13360",
      gradingScheme: "Consensus document based on a review of current practice and literature and on expert opinion; prints no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mccarthy-2016",
      label: "Air Embolism: Practical Tips for Prevention and Treatment",
      publisher: "Journal of Clinical Medicine (McCarthy et al.); a review, not a guideline",
      year: 2016,
      url: "https://doi.org/10.3390/jcm5110093",
      doi: "10.3390/jcm5110093",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "benetti-2025",
      label: "Prevention of air embolism related to central venous catheter removal: an integrative review",
      publisher: "Jornal Vascular Brasileiro (Benetti et al.)",
      year: 2025,
      url: "https://doi.org/10.1590/1677-5449.202500192",
      doi: "10.1590/1677-5449.202500192",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pacini-2026",
      label: "Delayed presentation of air embolism after removal of central venous catheters: A systematic review",
      publisher: "Journal of Critical Care (Pacini et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.jcrc.2026.155606",
      doi: "10.1016/j.jcrc.2026.155606",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-picc",
      label: "PICC lines",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/picc-lines",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I to V; grades A to E, adapted from the IDSA/USPHS system.",
      read: "full-text",
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
  technologies: ["picc-lines", "implanted-ports"],
  terms: ["central-venous-access"],
  related: ["suspected-central-line-infection", "catheter-related-thrombosis-in-cancer", "central-venous-catheter-insertion-for-anticancer-therapy"],
  upgrades: [],
  gaps: [
    "The removal technique rests on thin ground. The only guideline read that describes it is the Association of Anaesthetists 2016 text, a consensus without grades; its 2025 update, in the journal article read, does not repeat the technique (a longer online version is mentioned there and was not read). The INS Standards (2024) refuse a script and were not read. A 2025 integrative review found only two studies of how to prevent air embolism at removal and says experimental research is needed, including on positioning and the Valsalva manoeuvre.",
    "How long the occlusive dressing should stay on is not stated by any source read, so no figure is given here.",
    "How long to observe someone after removal is not set by any guideline read. The 2016 review gives 30 minutes lying flat; in the 2026 review of 28 case reports, symptoms of delayed air embolism began between one and two hours after removal in 14% of cases and more than two hours after in 32%.",
    "No source read gives patients a list of symptoms to report after a line is removed, or a time limit for reporting them. The wording on this page is drawn from the signs the 2026 review and the Association of Anaesthetists 2016 describe (neurological, respiratory and cardiovascular), not from patient guidance.",
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher answers 403 to a script and no open copy was found. On 11 November it was read as giving its own list of infective indications for removal and as recommending a short course of anticoagulation before a line with a clot is removed. The durations and grades it printed could not be checked again, so they have been taken off this page, and the steps that rested on it now rest on IDSA, AGIHO/DGHO and the Association of Anaesthetists. The catheter-related thrombosis protocol covers the choice between keeping and removing a line with a clot.",
    "IDSA marks its 2009 guideline as archived, and no newer IDSA edition was found in this pass; it is quoted here as the latest IDSA text, beside the 2020 AGIHO/DGHO guideline for people with cancer.",
    "The platelet and clotting figures are one UK working party's consensus, lower than the British Society for Haematology guidance it cites, which was not read. Other countries' thresholds were not looked for.",
    "The 2026 systematic review of delayed air embolism was read as an abstract only; what kinds of catheter its 28 cases had is not in the abstract.",
    "Surgical removal of ports and cuffed tunnelled catheters (dissection, cuff release) is not covered.",
  ],
});
