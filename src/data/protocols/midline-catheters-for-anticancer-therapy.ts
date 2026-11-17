import { protocol } from "./helpers";

/*
 * Midline catheters (peripheral catheters inserted in an upper-arm vein, with the tip outside the central veins)
 * for people having cancer treatment: when to use one, insertion and care, and their limits.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched or re-used as
 * raw text and every quote was checked by script (whitespace and line breaks normalised, nothing else).
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the PDF at cdc.gov read with pdftotext, re-using the copy a sibling checker fetched on 17 November.
 * - Association of Anaesthetists, Safe vascular access 2025 (Anaesthesia, DOI 10.1111/anae.16727, PMC12519924): full
 *   text of the journal article, Europe PMC XML, re-using a sibling checker's copy of 17 November. New on this page:
 *   it is the one guideline read that says what may be infused through a midline.
 * - epic3 (Loveday et al., J Hosp Infect 2014, PMC7114876): full text, Europe PMC XML, a sibling checker's copy of
 *   17 November. New on this page, for its description of a midline only.
 * - Faccini et al., midline versus PICC in people having chemotherapy (J Vasc Access 2025, DOI
 *   10.1177/11297298241289326, PMC12397530): full text, Europe PMC XML. New on this page.
 * - Sakakida et al., midline catheters for continuous 5-FU (Oncologist 2025, DOI 10.1093/oncolo/oyaf108, PMC12107535):
 *   full text, Europe PMC XML (abstract only on 11 November).
 * - Aljameie et al., midline versus PICC meta-analysis (Front Cardiovasc Med 2026, DOI 10.3389/fcvm.2026.1890087,
 *   PMC13477894): full text, Europe PMC XML (abstract only on 11 November).
 * - Gravdahl et al., PICCs and midlines in palliative care, systematic review (Support Care Cancer 2024, DOI
 *   10.1007/s00520-024-08664-3, PMC11208250): full text, Europe PMC XML (abstract only on 11 November).
 * - JSCN/JSMO/JASPO extravasation guideline (ESMO Open 2024, DOI 10.1016/j.esmoop.2024.103932, PMC11490930): full text,
 *   a sibling checker's Europe PMC copy of 17 November. It was named on this page without a source entry; it has one now.
 * - GAVeCeLT-IVAS SIMiC bundle (J Vasc Access 2026, DOI 10.1177/11297298261445794), MAGIC-ONC (Ann Intern Med 2025,
 *   DOI 10.7326/ANNALS-25-02523) and Santagata et al. (Thromb Haemost 2026, DOI 10.1055/a-2810-4737): abstracts only,
 *   Europe PMC; each publisher answered a script with 403 or a browser check on 17 November.
 * - INS Standards (2024), which set what may and may not be infused through a midline: not readable by a script.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. What the second pass changed: the page
 * said no source read answered whether vesicants or irritants may go through a midline, and showed only favourable
 * evidence. The Association of Anaesthetists 2025 does answer it (not other than short term or in an emergency), and a
 * comparative study in people having chemotherapy (Faccini) found midlines failed more often than PICCs; both are now
 * on the page. The bloodstream infection finding is now stated with its limits, the palliative care review is no longer
 * read as evidence about midlines alone, and reasons that no source states were replaced with what the sources say.
 */
export const midlineCathetersForAnticancerTherapy = protocol({
  id: "midline-catheters-for-anticancer-therapy",
  name: "Midline catheters in cancer care: when to use one, insertion, care and limits",
  aka: ["midline", "midline catheter", "MC", "extended dwell peripheral catheter", "midline for chemotherapy", "midline vs PICC"],
  domain: "vascular-access",
  tldr: "A midline is a longer drip tube put into a vein in the upper arm, with its tip still in the arm rather than near the heart. It can spare repeated needles when a drip is needed for over six days. UK guidance says it is not suited to drugs that irritate or damage veins, except briefly or in an emergency. In one study of people having chemotherapy, midlines failed more often than PICC lines.",
  simple: "A midline is a longer tube in an upper-arm vein for drips over days or weeks. It is not suited to every drug. Ask your team whether your treatment can go through one.",
  summary: "A midline is a peripheral device. CDC/HICPAC (2011) describes it as a 3 to 8 inch catheter that does not enter central veins. The Association of Anaesthetists (2025) calls catheters of 6 to 15 cm long peripheral catheters and midlines typically over 15 cm, both placed through large upper-arm veins with the tip outside the central veins, with a dwell time of usually up to 4 weeks; epic3 (2014) also describes a midline as designed for up to 4 weeks. CDC advises a midline or PICC instead of a short cannula when intravenous therapy will likely exceed six days (Category II), sterile gloves for insertion (IA), a daily site check (II), replacement only for a specific indication (II), and prompt removal of any catheter that is no longer essential (IA). The Italian SIMiC bundle (2026, abstract only) sets seven insertion steps: ultrasound assessment of the arm and chest veins, choice of an upper-arm vein, hand hygiene, antisepsis and maximal barrier precautions, ultrasound-guided puncture, intra-procedural ultrasound tip location, sutureless securement, and glue with a transparent dressing.\n\nWhat may go through one: the Association of Anaesthetists says blood flow at the tip is not sufficient for infusions of vesicants or irritants other than for short-term or emergency use (UK consensus, ungraded, not specific to cancer). The INS Standards (2024), which set infusate limits, could not be read, and no source read gives a pH or osmolarity limit for a midline. In an Italian prospective study of 555 people having chemotherapy, midlines were used only for regimens judged peripherally compatible and still failed more often than PICCs (5.89 against 1.40 failures per 100 patients per month; rate ratio for PICC 0.24, 95% confidence limits 0.11 to 0.51); its authors conclude that a PICC must be preferred. A Japanese single-arm study gave continuous fluorouracil, which its authors class as an irritant, for four or five days through an 8 cm upper-arm catheter: none of 58 patients had phlebitis. The Japanese extravasation guideline (2024) classes oxaliplatin as a vesicant and lists, among the references for its vesicant classifications, a case report titled \"A midline for oxaliplatin infusion: the myth of safety devices\".\n\nAgainst PICCs in mixed hospital populations, a 2026 meta-analysis of 15 studies (3 randomised, 12 cohort; over 27,000 patients) found PICCs had about four times the risk of catheter-related bloodstream infection (RR 4.18, 95% CI 2.87 to 6.08). The difference was not significant in the randomised trials alone, where PICCs had fewer device failures and occlusions; deep vein thrombosis did not differ (RR 1.00, 95% CI 0.69 to 1.44). A second 2026 meta-analysis (19 studies, 29,680 catheters; abstract only) found similar venous thromboembolism rates (3.5% with midlines, 3.8% with PICCs; OR 0.92, 95% CI 0.70 to 1.22). In palliative care, a systematic review of 17 studies, two of which included midlines, concluded that PICCs and midlines are safe tools with high user satisfaction.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer whose intravenous treatment will likely last more than six days and who do not have a central device: supportive treatment, antibiotics, symptom control, or an anticancer infusion their team judges suitable for a peripheral vein. Most of the sources are not specific to cancer: CDC and the Association of Anaesthetists write for all patients, and the two meta-analyses pool general hospital and intensive care patients. Children are not covered. Device choice for a course of chemotherapy is in the device-selection protocol.",
  trigger: "Intravenous therapy will likely last more than six days and a central device is not needed or not wanted.",
  steps: [
    {
      action: "Choose a midline or PICC rather than a short cannula when intravenous treatment will likely last more than six days",
      why: "CDC says midlines are associated with lower rates of phlebitis (inflammation of the vein) than short peripheral cannulas and lower rates of infection than central venous catheters.",
      source: "cdc-hicpac-2011",
      quote: "Use a midline catheter or peripherally inserted central catheter (PICC), instead of a short peripheral catheter, when the duration of IV therapy will likely exceed six days.",
      grade: "Category II",
    },
    {
      action: "Do not rely on a midline for vesicant or irritant infusions, other than for short-term or emergency use",
      why: "The Association of Anaesthetists says blood flow at the tip of a midline is higher than in a peripheral vein but not enough for these drugs. This is UK consensus without a grade, written for all patients, and it does not define short term. One Japanese study gave fluorouracil, an irritant, through midlines for four or five days without phlebitis (see the variants).",
      source: "anae-2025",
      quote: "Although the blood flow at the tip of these catheters is higher than that found in peripheral veins, it is not sufficient to allow infusions of vesicants/irritants other than for short‐term or emergency use.",
    },
    {
      action: "Insert it as a bundle; the Italian SIMiC bundle lists seven steps: ultrasound assessment of the veins, an upper-arm vein, hand hygiene with skin antisepsis and maximal barriers, ultrasound-guided puncture, ultrasound tip location, sutureless securement, and glue with a transparent semipermeable dressing",
      why: "The two Italian societies that wrote the bundle describe it as a few evidence-based strategies aimed at reducing the complications of insertion. Only the abstract was read, and it prints no grades.",
      source: "simic-2026",
      quote: "The SIMiC bundle includes seven steps: (1) systematic ultrasound evaluation of the veins of the arms and the supra/infra-clavicular area; (2) choice of the most appropriate vein of the upper arm; (3) appropriate hand hygiene, proper skin antisepsis, and maximal barrier precautions; (4) ultrasound-guided venipuncture; (5) intra-procedural tip location, using infra/supraclavicular ultrasound scan; (6) sutureless securement, preferably using subcutaneous anchorage; (7) protection of the exit site with cyanoacrylate glue and semipermeable transparent membrane.",
    },
    {
      action: "Wear sterile gloves to insert a midline",
      why: "CDC groups midlines with arterial and central catheters here, not with short cannulas, for which it accepts clean gloves if the site is not touched after the antiseptic is applied.",
      source: "cdc-hicpac-2011",
      quote: "Sterile gloves should be worn for the insertion of arterial, central, and midline catheters [37, 73, 74, 76].",
      grade: "Category IA",
    },
    {
      action: "Check the insertion site every day: feel through the dressing for tenderness, and look at the site if the dressing is transparent",
      why: "CDC adds that if there is local tenderness or another sign of possible infection, an opaque dressing should come off so that the site can be seen.",
      source: "cdc-hicpac-2011",
      quote: "Evaluate the catheter insertion site daily by palpation through the dressing to discern tenderness and by inspection if a transparent dressing is in use.",
      grade: "Category II",
    },
    {
      action: "Do not replace a working midline on a schedule; replace it only for a specific reason",
      why: "CDC cites one study of 140 midlines, in place for a median of 7 days and up to 49, in which the length of time the line was in was not linked to infection. It notes that no randomised study has tested routine replacement.",
      source: "cdc-hicpac-2011",
      quote: "Replace midline catheters only when there is a specific indication.",
      grade: "Category II",
    },
    {
      action: "Take the midline out promptly once it is no longer essential",
      why: "CDC applies this to any intravascular catheter, although it prints it among its central venous catheter recommendations. In the Japanese fluorouracil study, the one bloodstream infection and the one deep vein thrombosis were both recorded after the infusion had ended.",
      source: "cdc-hicpac-2011",
      quote: "Promptly remove any intravascular catheter that is no longer essential [69–72].",
      grade: "Category IA",
    },
  ],
  bestInClass: {
    statement: "Use a midline (or PICC) rather than a short cannula when intravenous therapy will likely exceed six days (CDC Category II); insert it with sterile gloves (CDC IA) and an ultrasound-guided bundle (SIMiC 2026, an Italian consensus read as an abstract); check the site daily and replace it only for a reason (CDC II); remove it promptly when no longer essential (CDC IA). For anticancer drugs, the one guideline read that addresses the question, the Association of Anaesthetists (2025, UK consensus, ungraded), says a midline is not sufficient for vesicants or irritants other than for short-term or emergency use, and the one comparative study in people having chemotherapy (Faccini 2025) favoured PICCs. The evidence the other way is a single-arm study of continuous fluorouracil (Sakakida 2025). Pooled studies, mostly observational, link midlines with fewer bloodstream infections than PICCs and a similar thrombosis risk. The INS Standards and MAGIC-ONC's midline ratings could not be read, so their positions are not stated here.",
    sources: ["cdc-hicpac-2011", "anae-2025", "simic-2026", "faccini-2025", "sakakida-2025", "aljameie-2026", "santagata-2026"],
  },
  variants: [
    {
      name: "Midline for continuous fluorouracil",
      differs: "Gives continuous fluorouracil over four days or more through an 8 cm catheter placed under ultrasound in the basilic or brachial vein of the upper arm by trained nurses, instead of a short cannula or a central line.",
      evidence: "A prospective single-arm study at one Japanese cancer centre analysed 59 patients (51% oesophageal, 46% head and neck cancer). None of the 58 who received fluorouracil through the midline had phlebitis (0%, 95% CI 0 to 6.2%); insertion succeeded in 98.3%; complications occurred in 6.8% (one each of occlusion, arterial puncture, deep vein thrombosis and bloodstream infection); median dwell was 5.5 days (range 2 to 28). There was no comparison group. The authors say a port is the more reasonable choice when fluorouracil is needed over a long period.",
      sources: ["sakakida-2025"],
    },
    {
      name: "PICC rather than midline for a course of chemotherapy",
      differs: "Keeps midlines for regimens judged compatible with a peripheral vein and uses a PICC for any type of chemotherapy; after a midline fails, replaces it with a PICC.",
      evidence: "A prospective observational study at one Italian hospital followed 555 people having chemotherapy (559 in its abstract), 86 starting with a midline and 469 with a PICC, for a median of 2.6 months. Failures needing removal ran at 5.89 per 100 patients per month with midlines and 1.40 with PICCs (rate ratio for PICC 0.24, 95% confidence limits 0.11 to 0.51). In its table of reasons, no midline failure was a bloodstream infection and thrombosis was the commonest reason. The authors conclude that a PICC must be preferred to a midline for chemotherapy given without an implanted port.",
      sources: ["faccini-2025"],
    },
    {
      name: "Midline for symptom control in palliative care",
      differs: "Uses a midline or PICC for weeks of intravenous symptom treatment or parenteral nutrition in people with advanced cancer.",
      evidence: "A systematic review of 17 studies, none rated strong, reported thrombosis, infection and occlusion rates of 0 to 2.46 per 1,000 catheter days and high user satisfaction. Only two of the 17 studies included midlines; the rest were of PICCs, including the study behind the 2.46 figure. One study reported a median midline dwell of 50.5 days (range 8 to 231) in 42 patients. The authors say it is still unclear when to favour a PICC over a midline.",
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
      accessed: "2026-11-17",
    },
    {
      key: "anae-2025",
      label: "Association of Anaesthetists guidelines: safe vascular access 2025",
      publisher: "Association of Anaesthetists (Anaesthesia, Johnston et al.)",
      year: 2025,
      url: "https://doi.org/10.1111/anae.16727",
      doi: "10.1111/anae.16727",
      gradingScheme: "None: a working party consensus agreed by a two-round Delphi process. The authors say they did not attempt to grade recommendations and that the aim was a UK-centric guideline.",
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
      gradingScheme: "SIGN-style classes A to D, GPP (good practice point), H&S (health and safety legislation).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "simic-2026",
      label: "A GAVeCeLT-IVAS bundle for the Safe Insertion of Midline Catheters: The SIMiC protocol",
      publisher: "Journal of Vascular Access (GAVeCeLT and IVAS)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298261445794",
      doi: "10.1177/11297298261445794",
      read: "abstract",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "faccini-2025",
      label: "Comparing results of midline catheter and peripherally inserted central catheter in cancer patients under chemotherapy",
      publisher: "Journal of Vascular Access (Faccini et al.)",
      year: 2025,
      url: "https://doi.org/10.1177/11297298241289326",
      doi: "10.1177/11297298241289326",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "sakakida-2025",
      label: "Midline catheter use for cancer patients receiving 5-FU chemotherapy: prospective study of safety and outcomes",
      publisher: "The Oncologist (Sakakida et al.)",
      year: 2025,
      url: "https://doi.org/10.1093/oncolo/oyaf108",
      doi: "10.1093/oncolo/oyaf108",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aljameie-2026",
      label: "Comparative safety and effectiveness of midline catheters vs. peripherally inserted central catheters: a systematic review and meta-analysis",
      publisher: "Frontiers in Cardiovascular Medicine (Aljameie et al.)",
      year: 2026,
      url: "https://doi.org/10.3389/fcvm.2026.1890087",
      doi: "10.3389/fcvm.2026.1890087",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "santagata-2026",
      label: "Venous Thromboembolism Risk Associated with MIDLINE Catheters and Peripherally Inserted Central Catheters, a Systematic Review and Meta-Analysis",
      publisher: "Thrombosis and Haemostasis (Santagata et al.)",
      year: 2026,
      url: "https://doi.org/10.1055/a-2810-4737",
      doi: "10.1055/a-2810-4737",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "gravdahl-2024",
      label: "Use of peripherally inserted central venous catheters and midline catheters for palliative care in patients with cancer: a systematic review",
      publisher: "Supportive Care in Cancer (Gravdahl et al.)",
      year: 2024,
      url: "https://doi.org/10.1007/s00520-024-08664-3",
      doi: "10.1007/s00520-024-08664-3",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "jscn-2024",
      label: "Extravasation associated with cancer drug therapy: multidisciplinary guideline of the Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, and Japanese Society of Pharmaceutical Oncology",
      publisher: "ESMO Open (Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, Japanese Society of Pharmaceutical Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.esmoop.2024.103932",
      doi: "10.1016/j.esmoop.2024.103932",
      gradingScheme: "GRADE and Minds 2020: recommend or not recommend, strong or weak; certainty of evidence A (high), B (moderate), C (low), D (very low).",
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
      accessed: "2026-11-17",
    },
  ],
  drugs: ["fluorouracil"],
  technologies: ["infusion-devices-vascular-access", "catheter-securement-devices"],
  related: ["peripheral-cannula-for-anticancer-therapy", "venous-access-device-selection-for-anticancer-therapy", "central-venous-catheter-insertion-for-anticancer-therapy"],
  upgrades: ["idea-upgrade-midline-vesicant-safety-study"],
  gaps: [
    "No source read lists the drugs, or gives a pH or osmolarity limit, for what may be infused through a midline. The Association of Anaesthetists (2025) says only that vesicants and irritants are not suitable other than for short-term or emergency use, without defining short term; it is a UK consensus with no grades and is not specific to cancer. On 17 November 2026 the INS Standards (2024), which address infusate limits for midlines, again gave no text to a script, and MAGIC-ONC's full ratings again returned 403; its abstract does not state its midline ratings.",
    "The fluorouracil study and the anaesthetists' statement on irritants point in different directions, and no source read reconciles them. The fluorouracil study had one centre, one 8 cm device and no comparison group. The Japanese extravasation guideline (2024) only lists the oxaliplatin case report among its references; the case report itself was not read.",
    "The sources do not all describe the same device. CDC gives a length of 3 to 8 inches; the Association of Anaesthetists calls 6 to 15 cm a long peripheral catheter and a midline typically over 15 cm; the Japanese study calls an 8 cm catheter a midline.",
    "No source read sets a maximum dwell time as a graded recommendation. CDC says to replace a midline only for a specific indication (Category II); the Association of Anaesthetists and epic3 describe up to 4 weeks as the usual or designed use. No newer edition of the CDC guideline or of epic3 was found by sibling checkers on 17 November 2026.",
    "On 17 November 2026 the SIMiC bundle and the Santagata meta-analysis could be read as abstracts only: the publishers answered a script with 403 or a browser check and Europe PMC holds no open copy. The SIMiC abstract does not say where the tip should lie or give grades, so the page states neither from it.",
    "The two meta-analyses pool general hospital and intensive care populations and are mostly observational. In Aljameie the lower bloodstream infection risk with midlines was not significant in the three randomised trials alone, and its results for exit-site infection, phlebitis and catheter migration changed when single studies were removed; the authors say those cannot support strong recommendations.",
    "In the palliative care review only two of 17 studies included midlines, so its complication rates are mostly PICC rates. The Italian chemotherapy study gives 559 patients in its abstract and 555 in its text and tables, and its two tables count midline failures differently (10 and 9).",
    "OnCo has no technology record for midline catheters; this protocol links the general vascular access record.",
  ],
});
