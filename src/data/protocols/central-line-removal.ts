import { protocol } from "./helpers";

/*
 * Removing a central venous access device (PICC, tunnelled line or port) at the end of treatment or because of a
 * complication, in adults with cancer.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text (port exemplar agent's copy, from the Internet Archive's capture of cdc.gov).
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015, DOI 10.1093/annonc/mdv296): full text
 *   (port exemplar agent's copy).
 * - IDSA Clinical Practice Guidelines for intravascular catheter-related infection, 2009 update (DOI 10.1086/599376):
 *   full text, Europe PMC XML (first protocol agent's copy).
 * - Pacini et al., delayed air embolism after central venous catheter removal, systematic review (J Crit Care 2026, DOI
 *   10.1016/j.jcrc.2026.155606): abstract only.
 * - INS Standards (2024), which set the removal technique (position, breath-holding, occlusive dressing, observation):
 *   not reachable. No national guideline that could be read describes the removal technique step by step.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const centralLineRemoval = protocol({
  id: "central-line-removal",
  name: "Central line and port removal: when, how and what to watch for afterwards",
  aka: ["PICC removal", "port removal", "Hickman line removal", "CVAD removal", "taking out a central line", "line removal air embolism", "port explant"],
  domain: "vascular-access",
  tldr: "A central line or port is taken out when treatment is finished or if it causes a problem such as an infection or clot. The usual precautions, lying flat as it comes out, a sealed dressing afterwards and being watched for a while, aim to prevent a rare but serious problem: air getting into the vein.",
  simple: "When you no longer need your line, it is taken out. Afterwards, keep the dressing on and tell someone at once if you feel breathless, dizzy or unwell.",
  summary: "Lines come out when no longer essential (CDC Category IA) or for complications. ESMO (2015) lists the infective indications: severe sepsis, septic thrombophlebitis, endocarditis, tunnel infection, port abscess, bloodstream infection persisting beyond 48 to 72 hours of adequate treatment, or infection with Staphylococcus aureus, fungi or mycobacteria [II, A]. For catheter-related thrombosis, where the line is no longer needed or anticoagulation cannot continue long term, ESMO recommends 3 to 5 days of anticoagulation before removal to avoid clot embolisation [I, A]; the separate catheter-related thrombosis protocol sets out where ITAC and ASCO differ. Catheter tips are cultured only when the line is removed for suspected infection, not routinely (IDSA A-II); for a port, the reservoir contents are cultured too.\n\nThe removal technique itself (lying flat or head down, breath-holding or Valsalva as the catheter leaves, firm pressure and an occlusive dressing over the tract, and a period of observation) comes from nursing standards that could not be read. The reason is air embolism: a 2026 systematic review of 28 case reports of delayed air embolism after removal found symptoms began 10 minutes to over 2 hours afterwards, a persisting skin-to-vein channel in over 90% of those imaged, permanent neurological harm in 18% and death in 32%. ESMO's management of air embolism is to lay the patient head down on their side and give 100% oxygen.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "surgical-team"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "theatre"],
  },
  population: "Adults with cancer who have a PICC, tunnelled cuffed central catheter or implanted port that is no longer needed or must come out because of a complication. Non-tunnelled lines in intensive care and dialysis catheters are covered by their own protocols.",
  trigger: "Treatment through the line has ended, or infection, thrombosis, malfunction or malposition makes removal necessary.",
  steps: [
    {
      action: "Review at every contact whether the line is still needed, and arrange removal as soon as it is not",
      why: "A line that stays in after it is needed adds risk of infection and clots with no benefit.",
      source: "cdc-hicpac-2011",
      quote: "Promptly remove any intravascular catheter that is no longer essential [69–72].",
      grade: "Category IA",
    },
    {
      action: "Remove the line for severe infection: sepsis, septic thrombophlebitis, endocarditis, tunnel infection, port abscess, persistent bacteraemia, or Staphylococcus aureus, fungal or mycobacterial infection",
      why: "These infections rarely clear while the line remains, because germs live on it.",
      source: "esmo-2015",
      quote: "Indications to remove the CVC are: severe sepsis, suppurative (septic) thrombophlebitis, endocarditis, tunnel infection, port abscess, BSI which continues despite 48–72 h of adequate coverage or infections with S. aureus , fungi or mycobacteria [II, A]",
      grade: "[II, A]",
    },
    {
      action: "If the line has a clot around it and is coming out, give a few days of anticoagulation first, as the treating team directs",
      why: "Pulling the line through a fresh clot can break pieces off into the lungs.",
      source: "esmo-2015",
      quote: "When the CVC is no longer necessary, or if long-term anticoagulation is contraindicated, a short course (3–5 days) of anticoagulation therapy is recommended before removing the catheter, in order to avoid clot embolisation [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Send the catheter tip for culture only if the line is removed for suspected infection",
      why: "Routine tip cultures are often contaminated and lead to unnecessary treatment.",
      source: "idsa-2009",
      quote: "Catheter cultures should be performed when a catheter is removed for suspected catheter-related bloodstream infection (CRBSI); catheter cultures should not be obtained routinely (A-II).",
      grade: "A-II",
    },
    {
      action: "When a port is removed for suspected infection, send the reservoir contents as well as the catheter tip",
      why: "The reservoir culture is more sensitive than the tip.",
      source: "esmo-2015",
      quote: "For subcutaneous ports, a culture of the material inside the port reservoir should be included, as it is more sensitive than the catheter tip culture.",
    },
    {
      action: "Remove the catheter with the person lying flat, ask them to hold their breath or bear down as it comes out, press firmly on the site and seal it with an occlusive dressing",
      why: "As the catheter leaves, air can be sucked into the vein through the track; lying flat, breath-holding and a seal stop this.",
      practice: "No guideline that could be read describes the removal technique; the INS Standards do but were not reachable. The 2026 systematic review found a persisting skin-to-vein channel in over 90% of imaged cases of delayed air embolism, which is what the seal and pressure aim to close.",
    },
    {
      action: "Watch the person after removal and tell them to report breathlessness, chest pain, dizziness, confusion or weakness at once, even hours later",
      why: "Air embolism after removal can appear late, and most people had brain symptoms.",
      source: "pacini-2026",
      quote: "Symptoms developed between ten minutes and one hour after removal of CVC in 54% of cases, between one and two hours in 14%, and after more than two hours in 32%.",
    },
    {
      action: "If air embolism is suspected, lay the person on their left side, head down, give 100% oxygen and call for emergency help",
      why: "This position and oxygen help while the air is absorbed and emergency treatment is arranged.",
      source: "esmo-2015",
      quote: "Air embolism: immediately place the patient in the lateral decubitus head down position and deliver 100% oxygen [ 29 ].",
    },
  ],
  bestInClass: {
    statement: "Remove lines promptly when no longer essential (CDC IA) and for the infective indications ESMO lists [II, A]; anticoagulate for 3 to 5 days before removing a thrombosed line where removal is planned (ESMO [I, A], with ITAC and ASCO differing on whether removal is needed at all, see the catheter-related thrombosis protocol); culture tips only for suspected infection (IDSA A-II) and port reservoirs when ports are explanted for infection. The removal technique and the observation period rest on nursing standards that could not be read; the 2026 systematic review of delayed air embolism supports vigilance for at least two hours and sealing the tract.",
    sources: ["cdc-hicpac-2011", "esmo-2015", "idsa-2009", "pacini-2026"],
  },
  variants: [],
  grades: [
    { claim: "Culture the catheter tip, not the subcutaneous segment, for CVCs", grade: "B-III", source: "idsa-2009", quote: "For CVCs, culture the catheter tip, not the subcutaneous segment (B-III)." },
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
      accessed: "2026-11-11",
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
      key: "idsa-2009",
      label: "Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America",
      publisher: "IDSA (Clinical Infectious Diseases, Mermel et al.)",
      year: 2009,
      url: "https://doi.org/10.1086/599376",
      doi: "10.1086/599376",
      gradingScheme: "Strength A (good evidence) to C (poor evidence); quality I (at least one randomised trial), II (non-randomised trials, cohort or case-control studies) or III (expert opinion).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "pacini-2026",
      label: "Delayed presentation of air embolism after removal of central venous catheters: A systematic review",
      publisher: "Journal of Critical Care (Pacini et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.jcrc.2026.155606",
      doi: "10.1016/j.jcrc.2026.155606",
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
  technologies: ["picc-lines", "implanted-ports"],
  terms: ["central-venous-access"],
  related: ["suspected-central-line-infection", "catheter-related-thrombosis-in-cancer", "central-venous-catheter-insertion-for-anticancer-therapy"],
  upgrades: [],
  gaps: [
    "No guideline that could be read describes how to remove a PICC, tunnelled line or port (position, breath-holding, dressing, observation time); the INS Standards (2024), which do, were not reachable. The removal step here is common practice, marked as such.",
    "How long to observe someone after removal is not set by any source read; the 2026 review of 28 case reports found a third of delayed air emboli began more than two hours after removal.",
    "Surgical removal of ports and cuffed tunnelled catheters (dissection, cuff release) is not covered.",
    "Whether a thrombosed line needs to come out at all is disputed between ESMO 2015 and later guidance; see the catheter-related thrombosis protocol.",
  ],
});
