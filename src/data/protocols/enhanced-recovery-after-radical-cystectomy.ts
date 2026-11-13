import { protocol } from "./helpers";

/*
 * Enhanced recovery after radical cystectomy for bladder cancer.
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - EAU Guidelines on Muscle-invasive and Metastatic Bladder Cancer, 2026 edition: full text of the online guideline
 *   (uroweb.org; the text is carried in the page's data and was decoded and read as text), section 6.7.5.c
 *   perioperative care and the recommendation tables, with the EAU strength rating as printed.
 * - ERAS Society recommendations for radical cystectomy (Cerantola et al., Clin Nutr 2013): abstract only (Europe PMC).
 *   This is still the ERAS Society's only cystectomy guideline (a 2025 appraisal of all ERAS guidelines lists it).
 * - Surgeons' update of the ERAS cystectomy recommendations by systematic review and e-Delphi (Eur J Surg Oncol 2025):
 *   abstract only (Europe PMC).
 * - Hong Kong Urological Association and Hong Kong Society of Uro-Oncology consensus statements on muscle-invasive
 *   bladder cancer (Front Oncol 2025): full text, PMC12095001.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterRadicalCystectomy = protocol({
  id: "enhanced-recovery-after-radical-cystectomy",
  name: "Enhanced recovery after radical cystectomy (ERAS pathway for bladder removal)",
  aka: ["ERAS cystectomy", "enhanced recovery bladder cancer surgery", "fast-track cystectomy", "perioperative care for radical cystectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery after bladder removal means getting fitter beforehand, no bowel preparation and no long fast, pain relief that spares opioids, the stomach tube out at the end of the operation, and four weeks of blood clot injections, in a hospital that does at least 20 of these operations a year.",
  simple: "Before bladder removal you will not need a bowel clear-out or a long fast. Afterwards the stomach tube is taken out early, you will be helped to eat and move, and you will have injections for four weeks to prevent clots.",
  summary: "The EAU 2026 bladder cancer guideline gives four strong recommendations around cystectomy: do not offer preoperative bowel preparation; use 'fast track' measures to shorten bowel recovery; offer pharmacological VTE prophylaxis such as LMWH from the first day after surgery for at least four weeks; and do at least 20 cystectomies per hospital per year. Its text adds that there is no universal ERAS protocol for cystectomy, that prehabilitation may help but lacks randomised trials, and that ERAS reduced ileus from 22% to 7.3% at the cost of somewhat more pain. The ERAS Society guideline (2013) found evidence for only 7 of 22 items (no bowel preparation, early nasogastric tube removal, Doppler-guided fluids and multimodal ileus prevention); its 2025 surgeons' update by e-Delphi highly recommends medical optimisation and no bowel preparation, moderately recommends robotic cystectomy with intracorporeal diversion, and supports medical thromboprophylaxis, removing the nasogastric tube at the end of surgery, fluid restriction and opioid-sparing anaesthesia, with no consensus on epidurals and consensus against resection-site drains.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having radical cystectomy with urinary diversion (ileal conduit or neobladder) for bladder cancer, open or robotic.",
  trigger: "A decision to remove the bladder.",
  steps: [
    {
      action: "Have cystectomy done in a hospital that performs at least 20 a year",
      why: "Concentrating these operations in fewer, busier centres has lowered deaths and repeat operations.",
      source: "eau-mibc-2026",
      quote: "Perform at least 20 radical cystectomies (RCs) per hospital/per year.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Offer prehabilitation (exercise, nutrition, stopping smoking) and optimise medical conditions before surgery",
      why: "Better fitness and health before the operation may reduce complications, though trials are missing.",
      source: "eau-mibc-2026",
      quote: "Similar to other tumour types, such as colorectal cancer, a multimodal prehabilitation programme (i.e. physiotherapy, nutritional intervention, cessation of smoking) may improve patient health status before surgery and reduce subsequent postoperative complications [367]. However, evidence is limited and RCTs are missing.",
      grade: "Not a graded recommendation (EAU text)",
    },
    {
      action: "Do not give bowel preparation before cystectomy",
      why: "Bowel preparation did not improve outcomes and causes dehydration and discomfort.",
      source: "eau-mibc-2026",
      quote: "Do not offer preoperative bowel preparation.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Use fast-track (ERAS) measures to speed bowel recovery: no long fast, carbohydrate loading where used, opioid-sparing pain relief and early mobilisation",
      why: "In the study the guideline cites, ERAS cut bowel paralysis after surgery from 22% to 7.3%, though people reported a little more pain.",
      source: "eau-mibc-2026",
      quote: "Employ ‘fast track’ measurements to reduce the time to bowel recovery.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Remove the nasogastric tube at the end of surgery",
      why: "Early removal reduced complications, time to bowel recovery and hospital stay.",
      source: "eras-cystectomy-update-2025",
      quote: "Medical thromboprophylaxis should be administered and nasogastric tube should be removed at the end of surgery.",
      grade: "Recommended by e-Delphi consensus (abstract; item grades not read)",
    },
    {
      action: "Restrict fluids around surgery and use opioid-sparing anaesthesia",
      why: "Too much fluid slows the bowel; fewer opioids mean less sickness and ileus.",
      source: "eras-cystectomy-update-2025",
      quote: "Perioperative fluid restriction as well as opioid-sparing anesthesia protocols should be implemented.",
      grade: "Recommended by e-Delphi consensus (abstract; item grades not read)",
    },
    {
      action: "Give LMWH from the first day after surgery for at least four weeks",
      why: "Clots are common after cystectomy, especially after chemotherapy beforehand, and four weeks of injections lowered them.",
      source: "eau-mibc-2026",
      quote: "Offer pharmacological venous thromboembolism prophylaxis, such as low-molecular-weight heparin, to RC patients, starting the first day post-surgery for a period of at least four weeks.",
      grade: "Strength rating: Strong",
    },
  ],
  bestInClass: {
    statement: "The EAU 2026 guideline is the most recent graded source and was read in full: no bowel preparation, fast-track measures, four weeks of LMWH and a minimum hospital volume are all strong recommendations. The ERAS Society's own cystectomy guideline is from 2013 and found evidence for few items; the 2025 surgeons' e-Delphi update agrees with EAU on bowel preparation and thromboprophylaxis and adds early nasogastric tube removal, fluid restriction and opioid-sparing anaesthesia. NICE NG180 supports an enhanced recovery programme for elective major surgery.",
    sources: ["eau-mibc-2026", "eras-cystectomy-update-2025", "eras-cystectomy-2013", "nice-ng180"],
  },
  variants: [
    {
      name: "Robot-assisted cystectomy with intracorporeal urinary diversion",
      differs: "Does the whole operation, including the urinary diversion, robotically inside the abdomen.",
      evidence: "Moderately recommended by the 2025 surgeons' e-Delphi, which says it can help apply other ERAS items such as early mobilisation; the EAU text reports a 2023 meta-analysis of eight RCTs comparing open and robotic cystectomy.",
      sources: ["eras-cystectomy-update-2025", "eau-mibc-2026"],
    },
    {
      name: "Epidural analgesia and resection-site drains",
      differs: "Uses an epidural for pain relief and leaves a drain at the operation site.",
      evidence: "The 2025 e-Delphi reached no consensus on epidurals and a consensus against resection-site drainage.",
      sources: ["eras-cystectomy-update-2025"],
    },
    {
      name: "ERAS before cystectomy (Hong Kong)",
      differs: "Recommends that ERAS be considered before cystectomy, to reduce ileus and VTE.",
      evidence: "Consensus statement 6 of the Hong Kong urological societies (2025), citing retrospective studies.",
      sources: ["hk-mibc-2025"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
    { claim: "No universal ERAS protocol for cystectomy", grade: "Not a graded recommendation (EAU text)", source: "eau-mibc-2026", quote: "While there is no universal ERAS protocol for RC, preoperative recommendations include no bowel preparation or fasting, and may also include same-day admission, carbohydrate loading and a preoperative exercise programme." },
    { claim: "Evidence base of the 2013 ERAS cystectomy guideline", grade: "GRADE; 7 of 22 items studied in cystectomy", source: "eras-cystectomy-2013", quote: "Fifteen articles were included in the present systematic review and 7 of 22 ERAS items were studied." },
    { claim: "Medical optimisation and no bowel preparation", grade: "'Highly recommended' (e-Delphi, abstract)", source: "eras-cystectomy-update-2025", quote: "Preoperative medical optimization and avoiding bowel preparation are highly recommended." },
    { claim: "ERAS considered before cystectomy", grade: "Consensus statement (Hong Kong)", source: "hk-mibc-2025", quote: "Statement 6: Before undergoing RC, the Enhanced Recovery After Surgery (ERAS) approach should be considered to reduce the risks of post-operative ileus and venous thromboembolism." },
  ],
  sources: [
    {
      key: "eau-mibc-2026",
      label: "EAU Guidelines on Muscle-invasive and Metastatic Bladder Cancer, 2026 edition",
      publisher: "European Association of Urology",
      year: 2026,
      url: "https://uroweb.org/guidelines/muscle-invasive-and-metastatic-bladder-cancer",
      gradingScheme: "Level of evidence (1a to 4) for summaries of evidence, and a strength rating (strong or weak) for each recommendation, printed beside it.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "eras-cystectomy-2013",
      label: "Guidelines for perioperative care after radical cystectomy for bladder cancer: Enhanced Recovery After Surgery (ERAS) society recommendations",
      publisher: "ERAS Society (Clinical Nutrition)",
      year: 2013,
      url: "https://doi.org/10.1016/j.clnu.2013.09.014",
      doi: "10.1016/j.clnu.2013.09.014",
      gradingScheme: "GRADE, with consensus where cystectomy evidence was lacking; item grades not in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "eras-cystectomy-update-2025",
      label: "Enhanced Recovery After Surgery for patients undergoing radical cystectomy: Surgeons' perspectives and recommendations ten years after its implementation",
      publisher: "European Journal of Surgical Oncology",
      year: 2025,
      url: "https://doi.org/10.1016/j.ejso.2024.109543",
      doi: "10.1016/j.ejso.2024.109543",
      gradingScheme: "Level of evidence per item from a systematic review, then e-Delphi expert consensus; the abstract gives only the direction and strength in words.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "hk-mibc-2025",
      label: "Consensus statements from the Hong Kong Urological Association and the Hong Kong Society of Uro-Oncology on the management of muscle-invasive bladder cancer",
      publisher: "Hong Kong Urological Association and Hong Kong Society of Uro-Oncology (Frontiers in Oncology)",
      year: 2025,
      url: "https://doi.org/10.3389/fonc.2025.1564487",
      doi: "10.3389/fonc.2025.1564487",
      gradingScheme: "Consensus statements, not graded by evidence level.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180), recommendations",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["urothelial", "muscle-invasive-bladder-cancer"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["cystectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "routine-preoperative-tests", "enhanced-recovery-after-colorectal-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The ERAS Society cystectomy guideline (2013) and its 2025 surgeons' update could be read only as abstracts; the item-by-item levels of evidence are not on this page.",
    "The ERAS Society guideline is more than ten years old and found cystectomy-specific evidence for only 7 of its 22 items; much of the pathway is extrapolated from colorectal surgery.",
    "The EAU text says prehabilitation for cystectomy lacks randomised trials, and that people on ERAS reported more pain (VAS 3.1 against 1.1) while ileus fell.",
    "Stoma care for an ileal conduit, and catheter and neobladder care at home, are not covered here.",
  ],
});
