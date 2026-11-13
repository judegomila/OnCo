import { protocol } from "./helpers";

/*
 * Enhanced recovery after lung cancer surgery (lobectomy, segmentectomy, pneumonectomy; VATS or open).
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society and ESTS guidelines for enhanced recovery after lung surgery (Batchelor et al., Eur J Cardiothorac
 *   Surg 2019): abstract only (Europe PMC). 45 items; the abstract lists the key recommendations without their grades.
 *   The publisher PDF answered with a bot check, which was not got round. A Europe PMC search found no newer ERAS
 *   lung guideline (to November 2026).
 * - Italian intersociety consensus on Perioperative Anesthesia Care in Thoracic surgery (PACTS), part 1 (preadmission
 *   and preoperative care) and part 2 (intraoperative and postoperative care), Perioper Med 2020: full text, Europe PMC
 *   XML (PMC7704118, PMC7582032). 19 and 49 recommendations, each with a USPSTF level of evidence and strength,
 *   quoted as printed.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterLungSurgery = protocol({
  id: "enhanced-recovery-after-lung-surgery",
  name: "Enhanced recovery after lung cancer surgery (ERAS pathway for lung resection)",
  aka: ["ERAS thoracic", "ERAS lung resection", "enhanced recovery lobectomy", "fast-track thoracic surgery", "perioperative care for lung cancer surgery"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery for lung cancer surgery means stopping smoking and getting fitter beforehand, keyhole surgery where possible, a short fast with a sugary drink, nerve blocks for pain, no routine stomach tube and an early catheter removal, drinking a few hours after the operation, getting up within a day, and physiotherapy.",
  simple: "Before lung surgery you will be helped to stop smoking and to get fitter. Keyhole surgery is used where it can be. Afterwards you can drink within hours, you will be helped out of bed within a day, and a physiotherapist will help your breathing.",
  summary: "The ERAS Society and ESTS guideline (2019; 45 items) is the specialty standard; only its abstract could be read, which lists key recommendations without grades: counselling, nutritional screening, smoking cessation, prehabilitation for high-risk patients, avoiding fasting, carbohydrate loading, no sedative premedication, VTE prophylaxis, warming, short-acting anaesthetics, regional anaesthesia, nausea control, opioid-sparing analgesia, euvolaemia, minimally invasive surgery, early chest drain removal, avoiding urinary catheters and early mobilisation. The graded detail here is from the Italian PACTS consensus (2020, USPSTF grades), read in full: VATS whenever possible (good, A); smoking cessation ideally 4 weeks before (fair, A); prehabilitation (poor, A); fasting 2 hours for clear fluids and 6 for solids (good, A) and carbohydrate loading (poor, A); no routine benzodiazepines (fair, B); temperature of at least 36 °C (good, A); balanced crystalloid (good, A) and near-zero fluid balance (fair, A); protective one-lung ventilation (fair, A); risk-based nausea prophylaxis (good, A); no routine nasogastric tube and early catheter removal (fair, A); locoregional analgesia with paravertebral block for VATS (good, A) and epidural for thoracotomy or high risk (fair, A); IV NSAIDs (good, A); no suction on drains without complications (good, D); oral intake 4 to 6 hours after surgery (fair, A); mobilisation within 24 hours and physiotherapy (fair, A).",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care"],
  },
  population: "Adults having planned lung resection, mostly for lung cancer, by video-assisted thoracoscopic surgery (VATS) or thoracotomy. The PACTS consensus was written for Italian anaesthetic practice and covers thoracic surgery generally.",
  trigger: "A decision to operate on the lung.",
  steps: [
    {
      action: "Support current smokers to stop, at least 2 to 3 weeks and ideally 4 weeks before surgery",
      why: "Smoking is a strong predictor of lung complications after the operation.",
      source: "pacts-2020-part1",
      quote: "Nonetheless, given that smoking status is a strong predictor of postoperative lung complications, we suggest smoking cessation at least 2-3 weeks before surgery (ideally 4 weeks before).",
      grade: "Level of evidence: Fair. Strength of recommendation: A.",
    },
    {
      action: "Offer exercise prehabilitation, ideally multimodal, before curative lung cancer surgery",
      why: "Getting fitter beforehand may reduce chest complications and the time in hospital.",
      source: "pacts-2020-part1",
      quote: "We recommend preoperative exercise rehabilitation (prehabilitation) in candidates for curative surgical intervention for lung cancer as it may reduce postoperative pulmonary complications.",
      grade: "Level of evidence: Poor. Strength of recommendation: A.",
    },
    {
      action: "Limit fasting to 2 hours for clear fluids and 6 hours for food, and give a carbohydrate drink up to 2 hours before",
      why: "A long fast causes thirst and stress without making anaesthesia safer; a sugary drink reduces discomfort and insulin resistance.",
      source: "pacts-2020-part1",
      quote: "We recommend limiting clear fluid and solid fasting up to 2 and 6 h, respectively, in patients undergoing lung surgery who are not at risk of delayed gastric emptying.",
      grade: "Fasting: Level of evidence Good, Strength A. Carbohydrate loading: Level of evidence Poor, Strength A.",
    },
    {
      action: "Avoid routine benzodiazepines before surgery, especially in older people",
      why: "Sedatives before the operation slow waking and getting up, particularly in older people.",
      source: "pacts-2020-part1",
      quote: "We suggest avoiding the routine use of benzodiazepines before thoracic surgery, especially in elderly people.",
      grade: "Level of evidence: Fair. Strength of recommendation: B.",
    },
    {
      action: "Use video-assisted thoracoscopic (keyhole) surgery whenever possible",
      why: "Keyhole lung surgery causes fewer complications, less pain and a shorter stay than open surgery.",
      source: "pacts-2020-part1",
      quote: "We recommend the video-assisted thoracoscopic approach for lung surgery whenever possible, because of the lower incidence of postoperative complications, shorter length of hospital stay, and lower levels of postoperative pain associated with this technique.",
      grade: "Level of evidence: Good. Strength of recommendation: A.",
    },
    {
      action: "Monitor temperature in operations over 30 minutes and keep core temperature at least 36 °C",
      why: "Getting cold during surgery raises the risk of infection, bleeding and heart problems.",
      source: "pacts-2020-part2",
      quote: "We recommend that intraoperative temperature be monitored using an appropriate system in all patients undergoing thoracic surgery lasting more than 30 min. A core temperature of at least 36 °C should be maintained.",
      grade: "Level of evidence: Good. Strength of recommendation: A.",
    },
    {
      action: "Use balanced crystalloid and aim for a near-zero fluid balance, with goal-directed therapy in high-risk patients",
      why: "Too much fluid after lung surgery can cause lung injury; too little can harm the kidneys.",
      source: "pacts-2020-part2",
      quote: "We recommend a near-zero, rather than restricted or permissive, fluid balance to patients undergoing thoracic surgery. In high-risk patients, a goal-directed approach to fluid therapy should be applied.",
      grade: "Near-zero balance: Level of evidence Fair, Strength A. Balanced crystalloid: Level of evidence Good, Strength A.",
    },
    {
      action: "Ventilate the lung gently during one-lung ventilation (low tidal volumes, recruitment, titrated PEEP, lowest oxygen needed)",
      why: "Protective ventilation reduces injury to the lung that is left.",
      source: "pacts-2020-part2",
      quote: "We recommend a protective ventilation approach during one-lung ventilation, based on the combination of low tidal volumes (≤ 6 mL/kg ideal body weight) with alveolar recruitment maneuvers, adequately titrated positive end-expiratory pressure (PEEP) and the lowest fraction of inspired oxygen (FiO2) to maintain satisfactory arterial oxygen saturation.",
      grade: "Level of evidence: Fair. Strength of recommendation: A.",
    },
    {
      action: "Assess the risk of sickness and give prophylaxis matched to it",
      why: "Sickness delays drinking, eating and getting up.",
      source: "pacts-2020-part2",
      quote: "We recommend evaluation of the risk of postoperative nausea and vomiting, and the use of appropriate prophylaxis according to the level of risk, in all patients undergoing lung surgery.",
      grade: "Level of evidence: Good. Strength of recommendation: A.",
    },
    {
      action: "Use regional anaesthesia as part of multimodal pain relief: a paravertebral block for VATS, a thoracic epidural for thoracotomy or high-risk patients, with IV NSAIDs and paracetamol",
      why: "Nerve blocks control pain while sparing opioids, which helps breathing, coughing and walking.",
      source: "pacts-2020-part2",
      quote: "We recommend thoracic paravertebral block for VATS, as part of a multimodal approach.",
      grade: "Paravertebral for VATS: Good, A. Epidural for thoracotomy or high risk: Fair, A. IV NSAIDs: Good, A.",
    },
    {
      action: "Do not place a routine nasogastric tube, and remove urinary catheters early, even with an epidural",
      why: "Tubes and catheters add discomfort and keep people in bed.",
      source: "pacts-2020-part2",
      quote: "We recommend the early removal of urinary catheters to promote mobilization in patients undergoing lung surgery, including those receiving thoracic epidural catheters.",
      grade: "Urinary catheter: Fair, A. Nasogastric tube: Fair, A.",
    },
    {
      action: "Do not use suction on the chest drain routinely when the lung has fully re-expanded and there are no complications",
      why: "Routine suction does not help an uncomplicated recovery and keeps the patient tied to the wall.",
      source: "pacts-2020-part2",
      quote: "The routine use of drainage with suction is not recommended in the absence of complications, provided there is full re-expansion of the residual parenchyma after lung resection.",
      grade: "Level of evidence: Good. Strength of recommendation: D.",
    },
    {
      action: "Start drinking 4 to 6 hours after surgery if there is no sickness, get up within 24 hours, and start physiotherapy",
      why: "Early drinking, movement and breathing exercises speed recovery and reduce chest complications.",
      source: "pacts-2020-part2",
      quote: "We recommend early mobilization of patients within the first 24 h after both minor and major thoracic surgery.",
      grade: "Oral intake 4 to 6 h: Fair, A. Mobilisation within 24 h: Fair, A. Physiotherapy: Fair, A.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society and ESTS guideline (2019) is the specialty standard; its abstract says most of its 45 recommendations are strong and lists the key elements, but the graded text could not be read. The PACTS consensus (2020) agrees with every element the ERAS abstract names and grades them: the strongest (good evidence, grade A) are VATS whenever possible, 2-hour and 6-hour fasting, warming, balanced crystalloid, risk-based nausea prophylaxis, paravertebral block for VATS and IV NSAIDs. NICE NG180 supports an enhanced recovery programme for elective major surgery.",
    sources: ["eras-ests-lung-2019", "pacts-2020-part1", "pacts-2020-part2", "nice-ng180"],
  },
  variants: [
    {
      name: "Chest drain removal at higher daily volumes (ERAS 2019)",
      differs: "Removes the chest drain even when the daily serous output is high, up to 450 ml in 24 hours.",
      evidence: "Listed as a lung-specific ERAS recommendation by a 2025 appraisal of all ERAS Society guidelines; PACTS suggests a lower threshold of 5 ml/kg a day or less (poor evidence, B). The grade in the ERAS guideline itself could not be read.",
      sources: ["eras-overview-2025", "pacts-2020-part2"],
    },
    {
      name: "Thoracic epidural for all lung resections",
      differs: "Uses a thoracic epidural as standard analgesia, including for VATS.",
      evidence: "PACTS recommends epidural for thoracotomy, chest wall resection or high-risk patients (fair, A) and paravertebral block for VATS (good, A), with paravertebral in preference to epidural where coagulopathy is known or suspected (fair, A).",
      sources: ["pacts-2020-part2"],
    },
    {
      name: "Digital chest drainage systems",
      differs: "Uses a portable digital drainage system that measures air leak, rather than a conventional bottle.",
      evidence: "Suggested by PACTS to help early mobilisation (fair, B).",
      sources: ["pacts-2020-part2"],
    },
    {
      name: "Routine intensive care admission after lung resection",
      differs: "Admits every patient to intensive care after the operation.",
      evidence: "Not recommended by PACTS (poor evidence, D).",
      sources: ["pacts-2020-part2"],
    },
  ],
  grades: [
    { claim: "Key ERAS lung recommendations, and the grade of most of them", grade: "Not stated item by item in the abstract; 'the recommendation grade for most of the elements is strong'", source: "eras-ests-lung-2019", quote: "As the recommendation grade for most of the elements is strong, the use of a systematic perioperative care pathway has the potential to improve outcomes after surgery." },
    { claim: "Carbohydrate loading up to 2 hours before lung surgery", grade: "Level of evidence: Poor. Strength of recommendation: A.", source: "pacts-2020-part1", quote: "We recommend preoperative carbohydrate loading with clear fluids up to 2 h prior to surgery for patients undergoing lung surgery, especially malnourished patients, in order to reduce perioperative discomfort and insulin resistance." },
    { claim: "Balanced crystalloid rather than saline", grade: "Level of evidence: Good. Strength of recommendation: A.", source: "pacts-2020-part2", quote: "We recommend using balanced crystalloid solutions, rather than normal saline (NaCl 0.9%), as standard fluid of choice." },
    { claim: "No routine nasogastric tube", grade: "Level of evidence: Fair. Strength of recommendation: A.", source: "pacts-2020-part2", quote: "We recommend avoiding the routine placement of a nasogastric tube, and early removal in patients in whom a nasogastric tube is used." },
    { claim: "Thoracic epidural for thoracotomy or high-risk patients", grade: "Level of evidence: Fair. Strength of recommendation: A.", source: "pacts-2020-part2", quote: "We recommend the use of thoracic epidural analgesia in high-risk patients or in major surgical procedures where the parietal pleura (e.g., chest wall resection) is violated (i.e., thoracotomy, thoracosternotomy, chest wall resection)." },
    { claim: "IV NSAIDs, with paracetamol", grade: "Level of evidence: Good. Strength of recommendation: A.", source: "pacts-2020-part2", quote: "We recommend the use of intravenous nonsteroidal anti-inflammatory drugs (NSAIDs) to reduce peripheral sensitization to inflammation-induced pain in patients undergoing thoracic surgery." },
    { claim: "Chest tubes removed at up to 450 ml a day of serous fluid (ERAS lung, as listed by the 2025 appraisal)", grade: "Not stated in the appraisal", source: "eras-overview-2025", quote: "Chest tubes should be removed even if the daily serous effusion is of high volume (up to 450 ml/24 h)" },
    { claim: "Oral intake 4 to 6 hours after surgery", grade: "Level of evidence: Fair. Strength of recommendation: A.", source: "pacts-2020-part2", quote: "We recommend that, in adult patients undergoing thoracic surgery, oral intake, including clear liquids, can be initiated 4–6 h after surgery, in the absence of nausea and vomiting." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
  ],
  sources: [
    {
      key: "eras-overview-2025",
      label: "Enhanced recovery after surgery: overarching themes of the ERAS Society Guidelines and Consensus Statements for Adult Specialty Surgery",
      publisher: "Perioperative Medicine",
      year: 2025,
      url: "https://doi.org/10.1186/s13741-025-00590-0",
      doi: "10.1186/s13741-025-00590-0",
      gradingScheme: "An appraisal; repeats the guidelines' own recommendations without new grades.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "eras-ests-lung-2019",
      label: "Guidelines for enhanced recovery after lung surgery: recommendations of the Enhanced Recovery After Surgery (ERAS) Society and the European Society of Thoracic Surgeons (ESTS)",
      publisher: "ERAS Society and ESTS (European Journal of Cardio-Thoracic Surgery)",
      year: 2019,
      url: "https://doi.org/10.1093/ejcts/ezy301",
      doi: "10.1093/ejcts/ezy301",
      gradingScheme: "Quality of evidence and recommendation grade per item, by the authors; the abstract gives no item grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "pacts-2020-part1",
      label: "Recommendations from the Italian intersociety consensus on Perioperative Anesthesia Care in Thoracic surgery (PACTS) part 1: preadmission and preoperative care",
      publisher: "PACTS group, Italian intersociety consensus (Perioperative Medicine)",
      year: 2020,
      url: "https://doi.org/10.1186/s13741-020-00168-y",
      doi: "10.1186/s13741-020-00168-y",
      gradingScheme: "USPSTF: level of evidence (good, fair, poor) and strength of recommendation (A, B, C, D, I), printed under each recommendation.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "pacts-2020-part2",
      label: "Recommendations from the Italian intersociety consensus on Perioperative Anesthesia Care in Thoracic surgery (PACTS) part 2: intraoperative and postoperative care",
      publisher: "PACTS group, Italian intersociety consensus (Perioperative Medicine)",
      year: 2020,
      url: "https://doi.org/10.1186/s13741-020-00159-z",
      doi: "10.1186/s13741-020-00159-z",
      gradingScheme: "USPSTF: level of evidence (good, fair, poor) and strength of recommendation (A, B, C, D, I), printed under each recommendation.",
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
  cancers: ["lung-cancer", "nsclc"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["lobectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "routine-preoperative-tests"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The ERAS Society and ESTS guideline (2019), the specialty standard, could be read only as an abstract; its grades for each of the 45 items, and any place it differs from PACTS, are not on this page.",
    "PACTS is an Italian anaesthetic consensus graded on the USPSTF scheme; a grade A there is not the same as a 'strong' GRADE recommendation, and several grade A recommendations rest on poor evidence (prehabilitation, carbohydrate loading, locoregional anaesthesia in general).",
    "When to remove the chest drain (PACTS suggests at 5 ml/kg a day or less of serous fluid, poor evidence, B) and the role of digital drainage are not settled.",
    "Clot prevention after lung resection is in the VTE prophylaxis protocol; drug doses are local protocol matters.",
  ],
});
