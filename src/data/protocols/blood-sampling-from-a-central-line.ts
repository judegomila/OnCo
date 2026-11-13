import { protocol } from "./helpers";

/*
 * Taking blood from a central venous access device (PICC, tunnelled line or port) in adults with cancer, for routine
 * tests and for blood cultures.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, PDF (port exemplar agent's copy, from the Internet Archive's capture of cdc.gov).
 * - IDSA Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection, 2009
 *   update (Mermel et al., DOI 10.1086/599376): full text, Europe PMC XML (first protocol agent's copy).
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (2015, DOI 10.1093/annonc/mdv296): full text
 *   (port exemplar agent's copy).
 * - Davis et al., scoping review of limiting central line access for blood sampling (Am J Infect Control 2026, DOI
 *   10.1016/j.ajic.2025.11.001): abstract only.
 * - Pushparaj et al., 2 ml discard volume before central line sampling (Acute Crit Care 2026, DOI
 *   10.4266/acc.000792): abstract only.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024), which sets discard volumes and sampling technique:
 *   not reachable. No national guideline on discard volume could be read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const bloodSamplingFromACentralLine = protocol({
  id: "blood-sampling-from-a-central-line",
  name: "Blood sampling from a central line or port",
  aka: ["taking blood from a PICC", "bloods from a port", "CVAD blood sampling", "discard volume", "line bloods", "blood cultures from a central line", "paired blood cultures"],
  domain: "vascular-access",
  tldr: "Blood can often be taken from your line or port so you do not need a needle in your arm. The nurse cleans their hands and the end of the line, usually draws off a little blood first and throws it away, takes the samples and then flushes the line with salt water. If an infection is suspected, a sample is also taken from a vein in your arm.",
  simple: "Blood can be taken from your line instead of your arm. The nurse cleans the line end first and flushes it after.",
  summary: "Every access is a chance for infection, so the line is opened no more often than needed: a 2026 scoping review of six studies found that more frequent access for blood draws is associated with more line infections and that standard sampling times, phlebotomy teams and peripheral cultures reduce it. Hand hygiene (CDC IB), scrubbing the hub or needleless connector with an antiseptic and using only sterile devices (CDC IA) apply as for any access. For blood cultures, IDSA (2009) asks for the hub to be cleaned with alcohol, tincture of iodine or alcoholic chlorhexidine above 0.5%, allowed to dry (A-I), and, when line infection is suspected, paired cultures from the catheter and a peripheral vein before antibiotics, labelled by site (A-II); ESMO 2015 agrees ([II, A]). After any sample the line is flushed with saline (ESMO [II, B]).\n\nHow much blood to discard first, to avoid diluted or drug-contaminated results, is not set by any guideline that could be read; the INS Standards address it but were not reachable. Local policies commonly discard a few millilitres; an intensive-care study in 105 patients found 2 ml gave results agreeing with venepuncture for electrolytes and blood counts.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer who have a PICC, tunnelled central catheter or accessed implanted port. The discard-volume studies were done in intensive care. Children need their own local rules.",
  trigger: "Blood tests or blood cultures are due in a person with a central line.",
  steps: [
    {
      action: "Take blood from the line only when it is needed, grouping tests to limit how often the line is opened",
      why: "Each time a line is opened, germs have a chance to get in.",
      source: "davis-2026",
      quote: "Increased frequency of CVC access is associated with a higher risk of CLABSI.",
    },
    {
      action: "Clean your hands before and after touching the line",
      why: "Hands are the commonest route by which germs reach a line.",
      source: "cdc-hicpac-2011",
      quote: "Hand hygiene should be performed before and after palpating catheter insertion sites as well as before and after inserting, replacing, accessing, repairing, or dressing an intravascular catheter.",
      grade: "Category IB",
    },
    {
      action: "Scrub the hub or needleless connector with an antiseptic and access it only with sterile devices",
      why: "The connector is touched many times and is a main route for germs into the line.",
      source: "cdc-hicpac-2011",
      quote: "Minimize contamination risk by scrubbing the access port with an appropriate antiseptic (chlorhexidine, povidone iodine, an iodophor, or 70% alcohol) and accessing the port only with sterile devices",
      grade: "Category IA",
    },
    {
      action: "For routine tests, withdraw and discard a small volume first, as local policy sets, then take the samples",
      why: "The first blood drawn is mixed with the flush or drugs in the catheter and can give wrong results.",
      practice: "No guideline that could be read sets a discard volume; the INS Standards do but were not reachable. A 2026 intensive-care study found 2 ml enough for electrolytes and blood counts (see variants).",
    },
    {
      action: "For blood cultures, clean the hub with alcohol, tincture of iodine or alcoholic chlorhexidine above 0.5% and let it dry before drawing",
      why: "Skin and hub bacteria can contaminate the bottle and give a false result.",
      source: "idsa-2009",
      quote: "If a blood sample is obtained through a catheter, clean the catheter hub with either alcohol or tincture of iodine or alcoholic chlorhexidine (>0.5%), allowing adequate drying time to mitigate blood culture contamination (A-I).",
      grade: "A-I",
    },
    {
      action: "When line infection is suspected, take paired cultures from the line and from a vein before antibiotics, and label each bottle with where it came from",
      why: "Comparing the two shows whether the line is the source of the infection.",
      source: "idsa-2009",
      quote: "For suspected CRBSI, paired blood samples, drawn from the catheter and a peripheral vein, should be cultured before initiation of antimicrobial therapy, and the bottles should be appropriately marked to reflect the site from which the samples were obtained (A-II).",
      grade: "A-II",
    },
    {
      action: "Flush the line with 0.9% saline after every sample",
      why: "Blood left in the catheter can clot and block it or feed germs.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "Open the line only when needed, with hand hygiene (CDC IB), a scrubbed hub and sterile devices (CDC IA), hub antisepsis allowed to dry before cultures (IDSA A-I), paired line and peripheral cultures before antibiotics when infection is suspected (IDSA A-II; ESMO [II, A]) and a saline flush after every sample (ESMO [II, B]). The discard volume for routine bloods is set by local policy: no guideline that could be read specifies it.",
    sources: ["cdc-hicpac-2011", "idsa-2009", "esmo-2015", "davis-2026"],
  },
  variants: [
    {
      name: "A 2 ml discard",
      differs: "Discards 2 ml before routine sampling from a central catheter, rather than 3 ml or more, to reduce blood loss.",
      evidence: "In 105 intensive-care patients, results from the proximal lumen after a 2 ml discard agreed well with venepuncture for sodium, potassium, calcium and blood counts except white cells; acidosis explained some differences (Pushparaj 2026). Not studied in cancer outpatients or ports.",
      sources: ["pushparaj-2026"],
    },
    {
      name: "Peripheral venepuncture or phlebotomy teams instead of line sampling",
      differs: "Takes routine bloods and cultures by venepuncture, or by a phlebotomy team, to keep the central line closed.",
      evidence: "A 2026 scoping review of six hospital studies found standard sampling times, phlebotomists for peripheral cultures and avoiding the line for both cultures and routine bloods lowered line infection rates. In cancer care this trades against repeated needle sticks in people with poor veins.",
      sources: ["davis-2026"],
    },
  ],
  grades: [
    { claim: "If no peripheral sample can be drawn, take at least two samples through different lumens", grade: "B-III", source: "idsa-2009", quote: "If a blood sample cannot be drawn from a peripheral vein, it is recommended that ≥2 blood samples should be drawn through different catheter lumens (B-III)." },
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
      key: "idsa-2009",
      label: "Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America",
      publisher: "IDSA (Clinical Infectious Diseases, Mermel et al.)",
      year: 2009,
      url: "https://doi.org/10.1086/599376",
      doi: "10.1086/599376",
      gradingScheme: "Strength A (good evidence) to C (poor evidence); quality I (at least one randomised trial), II (non-randomised trials, cohort or case-control studies) or III (expert opinion), from the Canadian Task Force scheme.",
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
      key: "davis-2026",
      label: "Limiting central venous catheter access for blood sampling and its impact on central line-associated bloodstream infection: A scoping review",
      publisher: "American Journal of Infection Control (Davis et al.)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ajic.2025.11.001",
      doi: "10.1016/j.ajic.2025.11.001",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "pushparaj-2026",
      label: "Minimizing discard volume to 2 ml before blood sampling from a central venous catheter: a prospective observational study in India",
      publisher: "Acute and Critical Care (Pushparaj et al.)",
      year: 2026,
      url: "https://doi.org/10.4266/acc.000792",
      doi: "10.4266/acc.000792",
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
  technologies: ["picc-lines", "implanted-ports", "needleless-connector-disinfecting-caps"],
  terms: ["central-venous-access"],
  related: ["suspected-central-line-infection", "picc-and-tunnelled-line-care", "implanted-port-access-and-care"],
  upgrades: ["idea-upgrade-central-line-discard-volume-in-cancer-outpatients"],
  gaps: [
    "No guideline that could be read sets a discard volume, a discard method (discard, push-pull mixing or reinfusion) or the order of tubes when sampling from a central line; the INS Standards (2024), which do, were not reachable.",
    "Whether blood for cultures should be drawn with or without a discard is not stated in any source read.",
    "Whether drug levels may be taken from the lumen used to give the same drug is not addressed by any source read, so no rule is given.",
    "The discard-volume and access-frequency studies were done in intensive care and read as abstracts only.",
  ],
});
