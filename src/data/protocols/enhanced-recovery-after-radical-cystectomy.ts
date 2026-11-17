import { protocol } from "./helpers";

/*
 * Enhanced recovery after radical cystectomy for bladder cancer.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw with
 * curl and read as text, and every quote was checked by script against the saved text.
 * - EAU Guidelines on Muscle-invasive and Metastatic Bladder Cancer, 2026 edition ("Edn. presented at the EAU Annual
 *   Congress London 2026"): full text of the online guideline (uroweb.org, disease management chapter), sections
 *   6.7.4, 6.7.5.c, 6.7.5.d, 6.7.8 and 6.7.9, with the EAU strength rating as printed.
 * - Surgeons' update of the ERAS cystectomy recommendations by systematic review and e-Delphi (Albisinni et al., Eur
 *   J Surg Oncol 2025): on 11 November only the abstract was read. On 17 November the publisher's version of record
 *   was read in full as a PDF from the Amsterdam UMC research repository (found through the DOI's open-access
 *   locations), with Table 1 and each item's level of evidence and expert opinion. It is the work of the EAU Young
 *   Academic Urologists urothelial carcinoma working group and the ERUS society, not of the ERAS Society.
 * - ERAS Society recommendations for radical cystectomy (Cerantola et al., Clin Nutr 2013): abstract only (Europe
 *   PMC). The publisher's free PDF answered 403 to a script on 17 November and the authors' university repository
 *   holds no open file. It is still the ERAS Society's only cystectomy guideline: the Society's 2025 paper on the
 *   overarching themes of its guidelines lists "Radical Cystectomy 2013", and a Europe PMC title search found no
 *   later one.
 * - Hong Kong Urological Association and Hong Kong Society of Uro-Oncology consensus statements (Front Oncol 2025):
 *   full text, PMC12095001, through the Europe PMC REST service.
 * - NICE NG180, Perioperative care in adults (2020, minor changes July 2025): recommendations page and update
 *   information, from a copy another checker of this pass saved from nice.org.uk on 17 November.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterRadicalCystectomy = protocol({
  id: "enhanced-recovery-after-radical-cystectomy",
  name: "Enhanced recovery after radical cystectomy (ERAS pathway for bladder removal)",
  aka: ["ERAS cystectomy", "enhanced recovery bladder cancer surgery", "fast-track cystectomy", "perioperative care for radical cystectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery after bladder removal means preparing beforehand, no bowel clear-out and only a short fast, pain relief that spares opioids, the stomach tube out at the end of the operation where possible, eating and moving early, and at least four weeks of treatment to prevent blood clots. European guidance asks hospitals to do at least 20 of these operations a year.",
  simple: "Before bladder removal you should not need a bowel clear-out or a long fast. Afterwards the stomach tube is usually taken out at the end of the operation, you are helped to eat and move early, and you are offered at least four weeks of treatment to prevent clots, such as heparin injections.",
  summary: "The EAU 2026 bladder cancer guideline gives four strong recommendations around cystectomy: do not offer preoperative bowel preparation; employ 'fast track' measures to reduce the time to bowel recovery; offer pharmacological VTE prophylaxis such as LMWH from the first day after surgery for at least four weeks; and perform at least 20 cystectomies per hospital per year. Its text adds that there is no universal ERAS protocol for cystectomy, that prehabilitation may help but lacks randomised trials, and that in one study ileus fell from 22% to 7.3% on ERAS while pain scores were higher (VAS 3.1 against 1.1). The ERAS Society guideline (2013, abstract only) found cystectomy studies for only 7 of its 22 items. A 2025 update by urological surgeons (EAU Young Academic Urologists and ERUS; systematic review and e-Delphi, read in full) gives each item a level of evidence and a consensus: strong consensus for medical optimisation, no bowel preparation, four weeks of thromboprophylaxis starting the day after surgery (heparin or an oral factor Xa inhibitor), multimodal pain control and early mobilisation; consensus for fasting of 6 hours for solids and 2 hours for liquids, carbohydrate loading, removing the nasogastric tube at the end of surgery, fluid restriction, opioid-sparing anaesthesia and early oral diet; no consensus on epidurals; and, unlike the 2013 guideline, a recommendation to drain the pelvis.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having radical cystectomy with urinary diversion (ileal conduit or neobladder) for bladder cancer, open or robotic.",
  trigger: "A decision to remove the bladder.",
  steps: [
    {
      action: "Have cystectomy done in a hospital that performs at least 20 a year",
      why: "The guideline reports lower death rates after surgery in hospitals that do more of these operations, and that concentrating them in fewer centres in Sweden reduced deaths within 90 days and repeat operations.",
      source: "eau-mibc-2026",
      quote: "Perform at least 20 radical cystectomies (RCs) per hospital/per year.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Consider a prehabilitation programme before surgery (physiotherapy, nutrition, stopping smoking)",
      why: "It may improve health before the operation and reduce complications afterwards, though the guideline says the evidence is limited and randomised trials are missing.",
      source: "eau-mibc-2026",
      quote: "Similar to other tumour types, such as colorectal cancer, a multimodal prehabilitation programme (i.e. physiotherapy, nutritional intervention, cessation of smoking) may improve patient health status before surgery and reduce subsequent postoperative complications [367]. However, evidence is limited and RCTs are missing.",
      grade: "Not a graded recommendation (EAU text)",
    },
    {
      action: "Optimise medical conditions before surgery",
      why: "The surgeons' update lists blood pressure, diabetes, anaemia, smoking, alcohol, exercise and nutrition. It notes that the one cystectomy trial of intensive smoking and alcohol cessation did not show fewer complications.",
      source: "eras-cystectomy-update-2025",
      quote: "As such, current evidence strongly recommends preoperative medical optimization.",
      grade: "LOE in RC surgery: High. Expert opinion: Strong consensus.",
    },
    {
      action: "Do not offer bowel preparation before cystectomy",
      why: "The ERAS Society review found that bowel preparation did not improve outcomes, and the 2025 update cites two randomised trials in which complications were no different without it.",
      source: "eau-mibc-2026",
      quote: "Do not offer preoperative bowel preparation.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Use fast-track (ERAS) measures to shorten the time to bowel recovery",
      why: "The guideline says there is no universal ERAS protocol; it names no bowel preparation or fasting beforehand and pain relief with fewer opioids afterwards, and says carbohydrate loading may be included. In the study it cites, ileus fell from 22% to 7.3% on ERAS, while pain scores were higher (3.1 against 1.1).",
      source: "eau-mibc-2026",
      quote: "Employ ‘fast track’ measurements to reduce the time to bowel recovery.",
      grade: "Strength rating: Strong",
    },
    {
      action: "Limit fasting before surgery to 6 hours for solids and 2 hours for liquids",
      why: "The update takes these times from the European Society of Anaesthesiology's general guidance (clear fluids up to 2 hours before elective surgery) and says no study has tested fasting times in cystectomy itself.",
      source: "eras-cystectomy-update-2025",
      quote: "Albeit with low evidence, there in consensus in limiting preoperative fasting before RC.",
      grade: "LOE in RC: Low. Expert opinion: Consensus in favor of a preoperative fasting period of 2 h for liquids and 6 h for solids.",
    },
    {
      action: "Remove the nasogastric tube at the end of surgery unless there was a complication during the operation",
      why: "The ERAS Society review found that early removal reduced complications, the time for the bowel to recover and the length of the hospital stay.",
      source: "eras-cystectomy-update-2025",
      quote: "Consequently, unless specific intraoperative complications occur, NGT should be removed at the end of surgery.",
      grade: "LOE: High. Expert opinion: Consensus.",
    },
    {
      action: "Restrict fluids around surgery",
      why: "The update reports studies linking the amount of crystalloid fluid given to acute kidney injury, and two studies linking restriction to a shorter stay and fewer complications in hospital.",
      source: "eras-cystectomy-update-2025",
      quote: "Therefore, fluid restriction is advised and supported in RC.",
      grade: "LOE: Moderate. Expert opinion: Consensus.",
    },
    {
      action: "Use an anaesthetic protocol that spares opioids",
      why: "Using fewer opioids is associated with faster recovery of bowel function.",
      source: "eras-cystectomy-update-2025",
      quote: "The literature supports a standard anesthetic protocol with an opioid sparing approach.",
      grade: "LOE: Moderate. Expert opinion: Consensus.",
    },
    {
      action: "Encourage an early oral diet after surgery if tolerated, and early mobilisation",
      why: "In a trial the update cites, complications were more frequent with feeding into a vein than with an early oral diet (69% against 49%). Its table advises both eating and getting out of bed on the first day after surgery; early mobilisation has moderate evidence and strong consensus.",
      source: "eras-cystectomy-update-2025",
      quote: "If tolerated, early oral diet should be stimulated in patients undergoing RC.",
      grade: "LOE: High. Expert opinion: Consensus.",
    },
    {
      action: "Offer drug prophylaxis against blood clots, such as LMWH, from the first day after surgery for at least four weeks",
      why: "The guideline reports a lower 30-day clot rate with 28 days of enoxaparin than with none in a non-randomised study, and more clots after chemotherapy before surgery than after cystectomy alone (12% against 8%).",
      source: "eau-mibc-2026",
      quote: "Offer pharmacological venous thromboembolism prophylaxis, such as low-molecular-weight heparin, to RC patients, starting the first day post-surgery for a period of at least four weeks.",
      grade: "Strength rating: Strong",
    },
  ],
  bestInClass: {
    statement: "The EAU 2026 guideline is the most recent graded source and was read in full: no bowel preparation, fast-track measures, at least four weeks of pharmacological thromboprophylaxis and a minimum hospital volume are all strong recommendations. The ERAS Society's own cystectomy guideline is from 2013 and found cystectomy studies for few items. The 2025 update by urological surgeons agrees with EAU on bowel preparation and four weeks of thromboprophylaxis and adds, each with its level of evidence and consensus, short fasting, carbohydrate loading, nasogastric tube removal at the end of surgery, fluid restriction, opioid-sparing anaesthesia, early oral diet and early mobilisation; its authors say it lacks the wider range of specialists who contributed in 2013. NICE NG180 says to offer an enhanced recovery programme for elective major or complex surgery.",
    sources: ["eau-mibc-2026", "eras-cystectomy-update-2025", "eras-cystectomy-2013", "nice-ng180"],
  },
  variants: [
    {
      name: "Robot-assisted cystectomy with intracorporeal urinary diversion",
      differs: "Does the whole operation, including the urinary diversion, robotically inside the abdomen.",
      evidence: "The 2025 update supports a minimally invasive approach (level of evidence moderate to high, consensus), says it may make ERAS items such as early mobilisation easier to apply, and adds that a true effect on complications is questionable. The EAU text reports a 2023 meta-analysis of eight RCTs comparing open and robotic cystectomy.",
      sources: ["eras-cystectomy-update-2025", "eau-mibc-2026"],
    },
    {
      name: "Epidural analgesia",
      differs: "Adds an epidural to the general anaesthetic for pain relief.",
      evidence: "The 2025 update says current evidence does not recommend routinely adding an epidural (level of evidence moderate to high, against); its expert panel reached no consensus.",
      sources: ["eras-cystectomy-update-2025"],
    },
    {
      name: "Pelvic drain or no drain",
      differs: "Leaves a drain at the operation site, or leaves none.",
      evidence: "The 2025 update says earlier guidelines suggested leaving out the drain, finds the evidence for that low (one randomised trial of 58 people), and its panel recommends draining the pelvis after cystectomy. Its abstract words this as 'resection site drainage (consensus against)', meaning against the no-drain item.",
      sources: ["eras-cystectomy-update-2025"],
    },
    {
      name: "An oral anticoagulant instead of heparin injections",
      differs: "Gives the four weeks of clot prevention as an oral factor Xa inhibitor.",
      evidence: "The 2025 update says all patients should be offered four weeks of thromboprophylaxis with heparin or an oral factor Xa inhibitor unless there is active bleeding, and that some authors describe direct oral anticoagulants as being as safe and effective as heparin. The EAU recommendation names LMWH as its example.",
      sources: ["eras-cystectomy-update-2025", "eau-mibc-2026"],
    },
    {
      name: "Alvimopan to prevent ileus",
      differs: "Adds an opioid antagonist to the measures against ileus.",
      evidence: "The 2025 update says alvimopan has shown benefit in time to passing wind and in reducing ileus, and that it is not marketed in Europe. It gives no dose.",
      sources: ["eras-cystectomy-update-2025"],
    },
    {
      name: "ERAS before cystectomy (Hong Kong)",
      differs: "Recommends that ERAS be considered before cystectomy, to reduce ileus and VTE; its description of ERAS includes reduced, rather than no, bowel preparation.",
      evidence: "Consensus statement 6 of the Hong Kong urological societies (2025), citing a retrospective study and a before-and-after analysis.",
      sources: ["hk-mibc-2025"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "No universal ERAS protocol for cystectomy", grade: "Not a graded recommendation (EAU text)", source: "eau-mibc-2026", quote: "While there is no universal ERAS protocol for RC, preoperative recommendations include no bowel preparation or fasting, and may also include same-day admission, carbohydrate loading and a preoperative exercise programme." },
    { claim: "Evidence base of the 2013 ERAS cystectomy guideline", grade: "GRADE; 7 of 22 items studied in cystectomy", source: "eras-cystectomy-2013", quote: "Fifteen articles were included in the present systematic review and 7 of 22 ERAS items were studied." },
    { claim: "Avoiding bowel preparation", grade: "LOE in RC surgery: Moderate. Expert opinion: Strong consensus. (The paper's Table 1 prints 'High' for the same item.)", source: "eras-cystectomy-update-2025", quote: "Current evidence supports avoiding bowel preparation before RC." },
    { claim: "Preoperative carbohydrate loading", grade: "LOE in RC: Moderate. Expert opinion: Consensus.", source: "eras-cystectomy-update-2025", quote: "The present consensus, with moderate evidence in the literature, supports preoperative carbohydrate loading in patients undergoing RC." },
    { claim: "Four weeks of thromboprophylaxis from the first day after surgery", grade: "LOE: High. Expert opinion: Strong consensus.", source: "eras-cystectomy-update-2025", quote: "Current evidence strongly supports 4 weeks of post-operative thromboprophylaxis after RC, starting on POD1." },
    { claim: "Early mobilisation", grade: "LOE: Moderate. Expert opinion: Strong consensus.", source: "eras-cystectomy-update-2025", quote: "Albeit with moderate evidence, the panel voted a strong consensus in favor of early mobilization." },
    { claim: "Multimodal pain control", grade: "LOE: High. Expert opinion: Strong consensus.", source: "eras-cystectomy-update-2025", quote: "Evidence strongly supports multimodal pain management." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "eras-cystectomy-update-2025",
      label: "Enhanced Recovery After Surgery for patients undergoing radical cystectomy: Surgeons' perspectives and recommendations ten years after its implementation",
      publisher: "EAU Young Academic Urologists urothelial carcinoma working group and ERUS (European Journal of Surgical Oncology)",
      year: 2025,
      url: "https://doi.org/10.1016/j.ejso.2024.109543",
      doi: "10.1016/j.ejso.2024.109543",
      gradingScheme: "A GRADE level of evidence (high, moderate or low) for each item from a systematic review, then the opinion of 23 urological surgeons by three-round e-Delphi, printed as consensus, strong consensus (at least 70% scoring 'strongly agree'), no consensus or consensus against.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hk-mibc-2025",
      label: "Consensus statements from the Hong Kong Urological Association and the Hong Kong Society of Uro-Oncology on the management of muscle-invasive and advanced urothelial carcinoma",
      publisher: "Hong Kong Urological Association and Hong Kong Society of Uro-Oncology (Frontiers in Oncology)",
      year: 2025,
      url: "https://doi.org/10.3389/fonc.2025.1564487",
      doi: "10.3389/fonc.2025.1564487",
      gradingScheme: "Consensus statements, not graded by evidence level.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180), recommendations; published August 2020, minor changes July 2025",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["urothelial", "muscle-invasive-bladder-cancer"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["cystectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "routine-preoperative-tests", "enhanced-recovery-after-colorectal-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The ERAS Society cystectomy guideline (2013) could be read only as an abstract: on 17 November 2026 the publisher's PDF refused a script and no open copy was found, so its item-by-item grades are not on this page.",
    "The ERAS Society guideline is more than ten years old and found cystectomy-specific studies for only 7 of its 22 items. The 2025 update is the opinion of urological surgeons only, a limit its authors state, and is not an ERAS Society guideline.",
    "On 17 November 2026 the 2025 update was read in full for the first time. Its abstract says 'resection site drainage (consensus against)'; the full text shows this means the panel was against leaving out the drain and recommends draining the pelvis. This page had read the abstract the other way and has been corrected.",
    "The 2025 update prints two different levels of evidence for avoiding bowel preparation: moderate in its text and high in its Table 1.",
    "No source read gives a volume or recipe for the carbohydrate drink; the 2025 update's table says only '24 h prior to surgery'. No source read gives a dose of alvimopan.",
    "The EAU text says prehabilitation for cystectomy lacks randomised trials, and that people on ERAS reported more pain (VAS 3.1 against 1.1) while ileus fell.",
    "Stoma care for an ileal conduit, and catheter and neobladder care at home, are not covered here.",
  ],
});
