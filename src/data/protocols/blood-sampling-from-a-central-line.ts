import { protocol } from "./helpers";

/*
 * Taking blood from a central venous access device (PICC, tunnelled line or port) in adults with cancer, for routine
 * tests and for blood cultures.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched or re-used as
 * raw text and each claim, quote and grade was checked against it by script and by reading.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the cdc.gov PDF read with pdftotext (a copy another checker fetched the same day was re-used).
 *   Both quotes and both categories confirmed. The CDC page still lists the 2011 guideline.
 * - IDSA Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection, 2009
 *   update (Mermel et al., DOI 10.1086/599376): full text, the author manuscript in PubMed Central (another checker's
 *   copy, fetched 16 November 2026, re-used). Quotes and grades confirmed. IDSA's own page marks the guideline ARCHIVED.
 * - AGIHO/DGHO 2020 updated guideline on central venous catheter-related infections in haematology and oncology (Böll
 *   et al., Ann Hematol 2021, DOI 10.1007/s00277-020-04286-x): added in this pass; full text, Europe PMC XML.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015, DOI 10.1093/annonc/mdv296): NOT readable
 *   on 17 November 2026 (the publisher returned 403; no open copy). Its quote and grades stand as read on 11 November.
 * - ASCO 2013 guideline on central venous catheter care (DOI 10.1200/JCO.2012.45.5733): added; abstract only, Europe PMC
 *   (another checker's copy re-used).
 * - Davis et al., scoping review (Am J Infect Control 2026, DOI 10.1016/j.ajic.2025.11.001): abstract only, Europe PMC.
 * - Pushparaj et al., 2 ml discard volume (Acute Crit Care 2026, DOI 10.4266/acc.000792): now read in full, Europe PMC
 *   XML (the first pass read the abstract only).
 * - Cancer Research UK, PICC lines (reviewed 16 May 2024): added for the patient-facing wording; page fetched raw.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): refuses a script; not read.
 *
 * Corrected in the second pass: three reasons the sources do not give (hands as the commonest route, the connector as a
 * main route, blood left in the line feeding germs), the saline strength, an unsourced line on local discard volumes,
 * an unsourced trade-off in cancer care, what the unread INS Standards were said to contain, and IDSA's archived status.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied with line breaks joined
 * only.
 */
export const bloodSamplingFromACentralLine = protocol({
  id: "blood-sampling-from-a-central-line",
  name: "Blood sampling from a central line or port",
  aka: ["taking blood from a PICC", "bloods from a port", "CVAD blood sampling", "discard volume", "line bloods", "blood cultures from a central line", "paired blood cultures"],
  domain: "vascular-access",
  tldr: "Blood can sometimes be taken from your line or port instead of a vein in your arm. The nurse cleans their hands and the end of the line, often draws off a little blood first and throws it away, takes the samples and then flushes the line with salt water. If a line infection is suspected, blood is taken from a vein as well as from the line, so the two can be compared.",
  simple: "Blood can be taken from your line instead of your arm. The nurse cleans the line end first and flushes it after.",
  summary: "Every access is a chance for infection. A 2026 scoping review of six studies in hospital settings (read as an abstract) concluded that more frequent central line access is associated with a higher risk of line infection, and that set sampling times, phlebotomists taking peripheral cultures and avoiding the line for cultures and routine bloods can lower infection rates. Hand hygiene before and after accessing the catheter (CDC IB), and scrubbing the access port with an antiseptic and accessing it only with sterile devices (CDC IA), apply as for any access. For blood cultures, IDSA (2009; IDSA now marks it archived and no replacement has been published) asks for the hub to be cleaned with alcohol, tincture of iodine or alcoholic chlorhexidine above 0.5% and allowed to dry (A-I) and, when line infection is suspected, for paired samples from the catheter and a peripheral vein before antibiotics, with the bottles marked by site (A-II). The German haematology and oncology guideline for people with cancer (AGIHO/DGHO 2020) likewise asks for one pair of cultures from a peripheral vein and one from the line (AIIt). IDSA adds that, where available, a phlebotomy team should draw the samples (A-II), and notes that samples drawn through a catheter in use give more false-positive results than samples from a vein. After a sample the line is flushed with saline: ESMO 2015 recommends routine flushing with saline after any infusion or blood sampling ([II, B], as read on 11 November 2026 and not readable again on 17 November 2026), and the ASCO 2013 abstract says routine flushing with saline is recommended.\n\nHow much blood to discard first is not set by any guideline that could be read; the INS Standards (2024) refuse a script and were not read. The authors of a 2026 intensive-care study call the discard method the most used technique and say there is no agreed standard volume. In 105 adults with triple-lumen catheters they found that samples taken after a 2 ml discard agreed closely with venepuncture for electrolytes and blood counts, except the white cell count.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer who have a PICC, tunnelled central catheter or accessed implanted port. The discard-volume study was done in adults in intensive care with triple-lumen catheters, and the access-frequency review covers hospital settings in general. Children are not covered on this page.",
  trigger: "Blood tests or blood cultures are due in a person with a central line.",
  steps: [
    {
      action: "Take blood from the line only when it is needed, at the unit's set sampling times where it has them",
      why: "The review found that the more often a line is accessed, the higher the risk of a line infection. It covers hospital studies in general, not cancer care in particular.",
      source: "davis-2026",
      quote: "Increased frequency of CVC access is associated with a higher risk of CLABSI.",
    },
    {
      action: "Clean your hands before and after accessing the line",
      why: "CDC lists contact with hands as one of the recognised ways a catheter or its hub becomes contaminated, and says hand hygiene with aseptic technique protects against infection.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Scrub the hub or needleless connector with an antiseptic and access it only with sterile devices",
      why: "CDC says appropriate disinfectants must be used to stop germs being carried through the connector into the line.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "For routine tests, withdraw and discard a small volume first, as local policy sets, then take the samples",
      why: "The first blood drawn can be diluted or mixed with leftover flush or infused fluid, which the discard is meant to clear.",
      practice: "No guideline that could be read sets a discard volume, and the INS Standards could not be read. The authors of a 2026 intensive-care study describe discarding as the most used technique, give this reason for it, and say there is no agreed standard volume (see variants).",
    },
    {
      action: "For blood cultures, clean the hub with alcohol, tincture of iodine or alcoholic chlorhexidine above 0.5% and let it dry before drawing",
      why: "Bacteria on the hub can contaminate the sample. IDSA notes that cultures drawn through a catheter in use give more false-positive results than cultures from a vein.",
      source: "idsa-2009",
      quote: "If a blood sample is obtained through a catheter, clean the catheter hub with either alcohol or tincture of iodine or alcoholic chlorhexidine (>0.5%), allowing adequate drying time to mitigate blood culture contamination (A-I).",
      grade: "A-I",
    },
    {
      action: "When line infection is suspected, take paired cultures from the line and from a vein before antibiotics, and label each bottle with where it came from",
      why: "Comparing the two helps show whether the line is the source of the infection. The German guideline for people with cancer asks for the same pairing (AIIt).",
      source: "idsa-2009",
      quote: "For suspected CRBSI, paired blood samples, drawn from the catheter and a peripheral vein, should be cultured before initiation of antimicrobial therapy, and the bottles should be appropriately marked to reflect the site from which the samples were obtained (A-II).",
      grade: "A-II",
    },
    {
      action: "Flush the line with saline after every sample",
      why: "Cancer Research UK tells patients the line is flushed with saline to clean it and prevent clotting. The ESMO sentence was read on 11 November 2026 and could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "Open the line only when needed, with hand hygiene (CDC IB), a scrubbed access port and sterile devices (CDC IA), hub antisepsis allowed to dry before cultures (IDSA A-I), paired line and peripheral cultures before antibiotics when infection is suspected (IDSA A-II; AGIHO/DGHO AIIt; ESMO [II, A] as read on 11 November 2026) and a saline flush after every sample (ESMO [II, B] as read on 11 November 2026; ASCO 2013 abstract, no grade printed). IDSA 2009 is quoted as the latest IDSA text, although IDSA now marks it archived. The discard volume for routine bloods is set by local policy: no guideline that could be read specifies it.",
    sources: ["cdc-hicpac-2011", "idsa-2009", "agiho-dgho-2020", "esmo-2015", "asco-2013", "davis-2026"],
  },
  variants: [
    {
      name: "A 2 ml discard",
      differs: "Discards 2 ml before routine sampling from a central catheter, rather than 3 ml or more, to reduce blood loss.",
      evidence: "In 105 adults in intensive care with triple-lumen catheters, results from the proximal lumen after a 2 ml discard showed high agreement with venepuncture for sodium, potassium, calcium and blood counts, except the white cell count; the authors name acidosis as the main reason for the differences they saw in potassium and several blood count indices (Pushparaj 2026, one centre, observational). Lumens carrying vasoactive drugs or blood products were excluded. The authors conclude 2 ml may be sufficient for routine tests and ask for larger multicentre studies. It was not a study of cancer outpatients, PICCs, tunnelled lines or ports.",
      sources: ["pushparaj-2026"],
    },
    {
      name: "Peripheral venepuncture or phlebotomy teams instead of line sampling",
      differs: "Takes routine bloods and cultures by venepuncture, or by a phlebotomy team, to keep the central line closed.",
      evidence: "A 2026 scoping review of six hospital studies identified three approaches (set sampling times, phlebotomists taking peripheral cultures, and avoiding the line for both cultures and routine bloods) and concluded that reducing line access for blood draws can lower line infection rates; it asks for prospective studies (abstract read). For cultures, IDSA says that a phlebotomy team should draw the samples where available (A-II), and that vein samples are more specific than samples drawn through a catheter. Neither source weighs this against the needle sticks it adds for a person with cancer.",
      sources: ["davis-2026", "idsa-2009"],
    },
    {
      name: "Cultures from every lumen of a multi-lumen line",
      differs: "Draws a separate blood culture from each lumen when line infection is suspected, rather than from one lumen.",
      evidence: "AGIHO/DGHO 2020 recommends it for people with cancer (BII), while noting that the higher detection rate has to be balanced against the harm of withdrawing large volumes of blood. IDSA 2009 asks for at least two samples through different lumens only when no peripheral sample can be drawn (B-III) and says it is unclear whether all lumens should then be sampled (C-III).",
      sources: ["agiho-dgho-2020", "idsa-2009"],
    },
  ],
  grades: [
    { claim: "Where available, a phlebotomy team draws the blood samples for culture", grade: "A-II", source: "idsa-2009", quote: "Where available, a phlebotomy team should draw the blood samples (A-II)." },
    { claim: "One pair of cultures from a peripheral vein and one from the line (people with cancer)", grade: "AIIt", source: "agiho-dgho-2020", quote: "Take one pair of blood cultures (aerobic and anaerobic) from a peripheral vein and one from the CVC for microbiological evaluation (AIIt)." },
    { claim: "With a multi-lumen line, separate cultures from each lumen (people with cancer)", grade: "BII", source: "agiho-dgho-2020", quote: "In case of multi-lumen CVC, draw separate blood cultures from each lumen (BII)." },
    { claim: "Whether all lumens should be sampled when no peripheral sample can be drawn is unclear", grade: "C-III", source: "idsa-2009", quote: "It is unclear whether blood cultures should be drawn through all catheter lumens in such circumstances (C-III)." },
    { claim: "If no peripheral sample can be drawn, take at least two samples through different lumens", grade: "B-III", source: "idsa-2009", quote: "If a blood sample cannot be drawn from a peripheral vein, it is recommended that ≥2 blood samples should be drawn through different catheter lumens (B-III)." },
  ],
  sources: [
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, supported by some studies and a strong theoretical rationale, or an accepted practice supported by limited evidence), IC (required by state or federal regulations, rules or standards), II (suggested), Unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "idsa-2009",
      label: "Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America",
      publisher: "IDSA (Clinical Infectious Diseases, Mermel et al.)",
      year: 2009,
      url: "https://doi.org/10.1086/599376",
      doi: "10.1086/599376",
      gradingScheme: "IDSA-US Public Health Service system: strength A (good evidence), B (moderate) or C (poor evidence); quality I (at least one properly randomised controlled trial), II (well-designed non-randomised trials, cohort or case-control studies, time series) or III (opinions of respected authorities, descriptive studies, expert committees). Printed as A-II.",
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
      gradingScheme: "Adapted from ESCMID: strength A (strongly supports use), B (moderately), C (marginally), D (supports a recommendation against use); quality I (at least one randomised controlled trial), II (non-randomised trials, cohort or case-control studies, time series) or III (expert opinion), with an added index such as t for evidence transferred from other patient groups. Printed as AIIt.",
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
      key: "davis-2026",
      label: "Limiting central venous catheter access for blood sampling and its impact on central line-associated bloodstream infection: A scoping review",
      publisher: "American Journal of Infection Control (Davis et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ajic.2025.11.001",
      doi: "10.1016/j.ajic.2025.11.001",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "pushparaj-2026",
      label: "Minimizing discard volume to 2 ml before blood sampling from a central venous catheter: a prospective observational study in India",
      publisher: "Acute and Critical Care (Pushparaj et al.)",
      year: 2026,
      url: "https://doi.org/10.4266/acc.000792",
      doi: "10.4266/acc.000792",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-2013",
      label: "Central venous catheter care for the patient with cancer: American Society of Clinical Oncology clinical practice guideline",
      publisher: "ASCO (Journal of Clinical Oncology, Schiffer et al.)",
      year: 2013,
      url: "https://doi.org/10.1200/JCO.2012.45.5733",
      doi: "10.1200/JCO.2012.45.5733",
      gradingScheme: "The abstract prints no grade for individual recommendations.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-picc-lines",
      label: "PICC lines (reviewed 16 May 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/chemotherapy/how-you-have/into-your-vein/picc-lines",
      read: "public-summary",
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
  technologies: ["picc-lines", "implanted-ports", "needleless-connector-disinfecting-caps"],
  terms: ["central-venous-access"],
  related: ["suspected-central-line-infection", "picc-and-tunnelled-line-care", "implanted-port-access-and-care"],
  upgrades: ["idea-upgrade-central-line-discard-volume-in-cancer-outpatients"],
  gaps: [
    "No guideline that could be read sets a discard volume, a discard method (discard, push-pull mixing or reinfusion) or the order of tubes when sampling from a central line. The INS Standards (2024) refuse a script and were not read on 17 November 2026, so what they say on sampling is not given here.",
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher returned 403 and no open copy exists. What rests on ESMO alone was read on 11 November 2026 and is not re-verified: the sentence on flushing with saline after blood sampling and its grade [II, B], the grade [II, A] for paired cultures, and ESMO's grading scheme. No newer ESMO guideline on central venous access was found in Europe PMC. No source read gives a flush volume or a saline strength for flushing after a sample, so none is stated.",
    "IDSA's own page marks the 2009 guideline as archived; no replacement has been published, so it is quoted as the latest IDSA text. The newer AGIHO/DGHO guideline (2020) is specific to people with cancer and differs from IDSA on sampling every lumen (see variants).",
    "Whether blood for cultures should be drawn with or without a discard is not stated in any source read.",
    "Whether drug levels may be taken from the lumen used to give the same drug is not addressed by any source read, so no rule is given.",
    "The discard-volume study was done in one intensive care unit in adults with triple-lumen catheters, not in people with cancer or with PICCs, tunnelled lines or ports. The access-frequency review was read as an abstract only and covers hospital settings in general.",
    "No source read weighs taking blood from the line against repeated venepuncture for a person with cancer whose veins are hard to use.",
  ],
});
