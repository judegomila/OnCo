import { protocol } from "./helpers";

/*
 * Midline catheters (peripheral catheters inserted in an upper-arm vein, with the tip in the arm or the axillary vein)
 * for people having cancer treatment: when to use one, insertion and care, and their limits.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, PDF (port exemplar agent's copy, from the Internet Archive's capture of cdc.gov).
 * - GAVeCeLT-IVAS SIMiC bundle for midline insertion (J Vasc Access 2026, DOI 10.1177/11297298261445794): abstract only,
 *   Europe PMC.
 * - MAGIC-ONC (Ann Intern Med 2025, DOI 10.7326/ANNALS-25-02523): abstract only; the abstract does not state its
 *   midline ratings.
 * - Sakakida et al., midline catheters for continuous 5-FU (Oncologist 2025, DOI 10.1093/oncolo/oyaf108): abstract.
 * - Aljameie et al., midline versus PICC meta-analysis (Front Cardiovasc Med 2026, DOI 10.3389/fcvm.2026.1890087):
 *   abstract only.
 * - Santagata et al., VTE with midlines versus PICCs, meta-analysis (Thromb Haemost 2026, DOI 10.1055/a-2810-4737):
 *   abstract only.
 * - Gravdahl et al., PICCs and midlines in palliative care, systematic review (Support Care Cancer 2024, DOI
 *   10.1007/s00520-024-08664-3): abstract only.
 * - INS Standards (2024), which set what may and may not be infused through a midline: not reachable.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const midlineCathetersForAnticancerTherapy = protocol({
  id: "midline-catheters-for-anticancer-therapy",
  name: "Midline catheters in cancer care: when to use one, insertion, care and limits",
  aka: ["midline", "midline catheter", "MC", "extended dwell peripheral catheter", "midline for chemotherapy", "midline vs PICC"],
  domain: "vascular-access",
  tldr: "A midline is a longer drip tube put into a vein in the upper arm, with its tip still in the arm rather than near the heart. It avoids repeated needles, and it carries fewer bloodstream infections than a PICC. Whether it is safe for chemotherapy that can damage tissue if it leaks has not been settled.",
  simple: "A midline is a longer tube in an upper-arm vein for drips over days or weeks. Ask your team whether your treatment can go through one.",
  summary: "A midline is a peripheral device: its tip lies in the upper arm or axillary vein, not in a central vein. CDC/HICPAC (2011) advises a midline or PICC instead of a short cannula when intravenous therapy will likely exceed six days (Category II), daily site checks, replacement only for a specific indication (II), and prompt removal when it is no longer essential (IA). The Italian SIMiC bundle (2026) sets seven insertion steps: ultrasound assessment of the arm and chest veins, choice of an upper-arm vein, hand hygiene, antisepsis and maximal barrier precautions, ultrasound-guided puncture, intra-procedural ultrasound tip location, sutureless securement and glue with a transparent dressing.\n\nAgainst PICCs, a 2026 meta-analysis of 15 studies (over 27,000 patients) found PICCs had about four times the risk of catheter-related bloodstream infection (RR 4.18), with no difference in thrombosis, failure, occlusion or phlebitis; a second 2026 meta-analysis (29,680 catheters) found similar venous thromboembolism rates (3.5% against 3.8%). In cancer, a Japanese prospective study of 59 patients having continuous fluorouracil for at least four days found no phlebitis with a midline; and a systematic review found midlines and PICCs safe for symptom control in palliative care. The open question is vesicants: no guideline read says whether continuous or repeated vesicant chemotherapy may run through a midline, and the Japanese extravasation guideline cites a case report of oxaliplatin extravasation from one.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer needing intravenous access for more than about six days without a central device, for supportive treatment, antibiotics, symptom control or selected anticancer infusions. Children and long courses of chemotherapy, where a port or PICC is usually chosen (see the device-selection protocol), are not covered.",
  trigger: "Intravenous therapy is expected to last more than about six days and a central device is not needed or not wanted.",
  steps: [
    {
      action: "Choose a midline or PICC rather than a short cannula when intravenous treatment will likely last more than six days",
      why: "A short cannula usually fails within days; a longer device avoids repeated needles.",
      source: "cdc-hicpac-2011",
      quote: "Use a midline catheter or peripherally inserted central catheter (PICC), instead of a short peripheral catheter, when the duration of IV therapy will likely exceed six days.",
      grade: "Category II",
    },
    {
      action: "Insert it as a bundle: ultrasound assessment of the veins, an upper-arm vein, hand hygiene, skin antisepsis and maximal barriers, ultrasound-guided puncture, ultrasound tip location, sutureless securement and a sealed transparent dressing",
      why: "Each step lowers the chance of a failed attempt, an infection, a clot or the line falling out.",
      source: "simic-2026",
      quote: "The SIMiC bundle includes seven steps: (1) systematic ultrasound evaluation of the veins of the arms and the supra/infra-clavicular area; (2) choice of the most appropriate vein of the upper arm; (3) appropriate hand hygiene, proper skin antisepsis, and maximal barrier precautions; (4) ultrasound-guided venipuncture; (5) intra-procedural tip location, using infra/supraclavicular ultrasound scan; (6) sutureless securement, preferably using subcutaneous anchorage; (7) protection of the exit site with cyanoacrylate glue and semipermeable transparent membrane.",
    },
    {
      action: "Check the site every day, through the dressing, for tenderness, redness or swelling",
      why: "Early signs of infection, phlebitis or a leak are found by looking and feeling.",
      source: "cdc-hicpac-2011",
      quote: "Evaluate the catheter insertion site daily by palpation through the dressing to discern tenderness and by inspection if a transparent dressing is in use.",
      grade: "Category II",
    },
    {
      action: "Do not replace a working midline on a schedule; replace it only for a specific reason",
      why: "Routine replacement adds procedures without benefit.",
      source: "cdc-hicpac-2011",
      quote: "Replace midline catheters only when there is a specific indication.",
      grade: "Category II",
    },
    {
      action: "Take the midline out as soon as it is no longer needed",
      why: "Every day a line stays in adds to the risk of infection and clots.",
      source: "cdc-hicpac-2011",
      quote: "Promptly remove any intravascular catheter that is no longer essential [69–72].",
      grade: "Category IA",
    },
  ],
  bestInClass: {
    statement: "Use a midline (or PICC) when intravenous therapy will likely exceed six days (CDC Category II), insert it with an ultrasound-guided bundle (SIMiC 2026), check it daily, replace it only for a reason (CDC II) and remove it promptly (CDC IA). Compared with PICCs, midlines carry fewer bloodstream infections and similar thrombosis risk (2026 meta-analyses). For anticancer drugs, the only cancer-specific evidence read is for continuous fluorouracil (Sakakida 2025); whether vesicants may be given through a midline is unresolved in the sources read, and the INS Standards that address it could not be read.",
    sources: ["cdc-hicpac-2011", "simic-2026", "aljameie-2026", "santagata-2026", "sakakida-2025"],
  },
  variants: [
    {
      name: "Midline for continuous fluorouracil",
      differs: "Gives continuous fluorouracil over four days or more through an upper-arm midline with its tip in the axillary vein, instead of a short cannula or a central line.",
      evidence: "In a prospective Japanese study of 59 patients (mostly oesophageal and head and neck cancer), no phlebitis occurred (0%, 95% CI 0 to 6.2%), insertion succeeded in 98.3% and complications occurred in 6.8%; median dwell 5.5 days.",
      sources: ["sakakida-2025"],
    },
    {
      name: "Midline for symptom control in palliative care",
      differs: "Uses a midline or PICC for weeks of intravenous symptom treatment or parenteral nutrition in people with advanced cancer.",
      evidence: "A systematic review of 17 studies (moderate or weak quality) found complications of 0 to 2.46 per 1,000 catheter days and high patient satisfaction.",
      sources: ["gravdahl-2024"],
    },
  ],
  grades: [],
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
      key: "simic-2026",
      label: "A GAVeCeLT-IVAS bundle for the Safe Insertion of Midline Catheters: The SIMiC protocol",
      publisher: "Journal of Vascular Access (GAVeCeLT and IVAS)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298261445794",
      doi: "10.1177/11297298261445794",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "magic-onc-2025",
      label: "The Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (MAGIC-ONC)",
      publisher: "Annals of Internal Medicine",
      year: 2025,
      url: "https://doi.org/10.7326/ANNALS-25-02523",
      doi: "10.7326/ANNALS-25-02523",
      gradingScheme: "RAND/UCLA Appropriateness Method: scenarios rated appropriate, neutral/uncertain or inappropriate.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "sakakida-2025",
      label: "Midline catheter use for cancer patients receiving 5-FU chemotherapy: prospective study of safety and outcomes",
      publisher: "The Oncologist (Sakakida et al.)",
      year: 2025,
      url: "https://doi.org/10.1093/oncolo/oyaf108",
      doi: "10.1093/oncolo/oyaf108",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "aljameie-2026",
      label: "Comparative safety and effectiveness of midline catheters vs. peripherally inserted central catheters: a systematic review and meta-analysis",
      publisher: "Frontiers in Cardiovascular Medicine (Aljameie et al.)",
      year: 2026,
      url: "https://doi.org/10.3389/fcvm.2026.1890087",
      doi: "10.3389/fcvm.2026.1890087",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "santagata-2026",
      label: "Venous Thromboembolism Risk Associated with MIDLINE Catheters and Peripherally Inserted Central Catheters, a Systematic Review and Meta-Analysis",
      publisher: "Thrombosis and Haemostasis (Santagata et al.)",
      year: 2026,
      url: "https://doi.org/10.1055/a-2810-4737",
      doi: "10.1055/a-2810-4737",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "gravdahl-2024",
      label: "Use of peripherally inserted central venous catheters and midline catheters for palliative care in patients with cancer: a systematic review",
      publisher: "Supportive Care in Cancer (Gravdahl et al.)",
      year: 2024,
      url: "https://doi.org/10.1007/s00520-024-08664-3",
      doi: "10.1007/s00520-024-08664-3",
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
  drugs: ["fluorouracil"],
  technologies: ["infusion-devices-vascular-access", "catheter-securement-devices"],
  related: ["peripheral-cannula-for-anticancer-therapy", "venous-access-device-selection-for-anticancer-therapy", "central-venous-catheter-insertion-for-anticancer-therapy"],
  upgrades: ["idea-upgrade-midline-vesicant-safety-study"],
  gaps: [
    "Whether vesicant or irritant chemotherapy may be given through a midline is not answered by any source read; the INS Standards (2024), which address infusate limits for midlines, and MAGIC-ONC's full ratings could not be read. The Japanese extravasation guideline (2024) cites a case report of oxaliplatin extravasation from a midline.",
    "OnCo has no technology record for midline catheters; this protocol links the general vascular access record.",
    "All the midline evidence here was read as abstracts; the meta-analyses mix inpatients and intensive care with few people having cancer treatment.",
  ],
});
