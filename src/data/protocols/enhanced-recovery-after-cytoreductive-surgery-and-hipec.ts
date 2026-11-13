import { protocol } from "./helpers";

/*
 * Enhanced recovery after cytoreductive surgery (CRS) with or without hyperthermic intraperitoneal chemotherapy (HIPEC),
 * for cancer that has spread over the lining of the abdomen: from the bowel, appendix (including pseudomyxoma
 * peritonei), ovary, stomach, or peritoneal mesothelioma.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society guidelines for perioperative care in CRS with or without HIPEC, Part I (preoperative and intraoperative)
 *   and Part II (postoperative and special considerations) (Hübner et al., Eur J Surg Oncol 2020): abstracts only,
 *   through Europe PMC. This is the current edition: Europe PMC searches for 2019 to 2026 found no newer ERAS Society
 *   edition. Neither part is open in PubMed Central; Crossref lists a CC BY-NC-ND licence, but the publisher's text
 *   service needs a key, and the ERAS Society site refused a script. Neither was got round.
 * - INDEPSO-ISPSM consensus on peritoneal malignancies: enhanced recovery after surgery in CRS with or without HIPEC
 *   (Gynecol Oncol Rep 2025): full text, Europe PMC XML (PMC11732209). An Indian modified-Delphi consensus of 48
 *   surgeons, which reports many ERAS 2020 recommendations in its discussion, cited to Hübner et al. 2020. Steps that
 *   rest on those passages are the consensus authors' account of the ERAS guideline, not the guideline's own words.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterCytoreductiveSurgeryAndHipec = protocol({
  id: "enhanced-recovery-after-cytoreductive-surgery-and-hipec",
  name: "Enhanced recovery after cytoreductive surgery with or without HIPEC",
  aka: ["ERAS CRS HIPEC", "ERAS cytoreductive surgery", "enhanced recovery HIPEC", "perioperative care for cytoreductive surgery", "ERAS peritonectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care for major surgery to remove cancer from the lining of the abdomen, sometimes with heated chemotherapy: stopping smoking and drinking, a nutrition check, treating anaemia, a short fast, four weeks of clot prevention, careful temperature and fluids in theatre, good pain relief, no routine nose tube, drinking from the day of surgery and getting up early.",
  simple: "Before the operation you will be asked to stop smoking and drinking, have your nutrition and blood count checked, and can drink clear fluids until two hours before. Afterwards you will be helped to drink and eat early and to get out of bed from the first day, and given injections against clots for four weeks.",
  summary: "The ERAS Society guideline for CRS with or without HIPEC (2020, two parts; 72 items graded by GRADE, consensus on 71 after a two-round Delphi of 24 experts, 37 strong recommendations, no consensus on preemptive fresh frozen plasma) is the only specialty guideline; only its abstracts could be read. Its item content is taken from the INDEPSO-ISPSM consensus (India, 2025), which reports it: preoperative counselling with smoking and heavy alcohol cessation; monitoring of intraperitoneal and core temperature, with active warming against hypothermia during CRS and against hyperthermia during HIPEC; at least two antiemetics; no prophylactic nasogastric drainage without risk factors for delayed gastric emptying; clear liquids on the day of surgery and solid food from day 1; preemptive enteral or parenteral nutrition for 7 days in selected patients; out of bed on the day of surgery with more than 2 hours of activity on day 2 and more than 6 hours after; urinary catheter out on the morning of day 3 when the bladder peritoneum was not stripped. The Indian consensus itself agreed on nutritional assessment, anaemia correction, fasting 6 to 8 hours for solids and 2 hours for liquids, carbohydrate loading, LMWH from 12 hours before surgery with pneumatic compression for 4 weeks, chlorhexidine-alcohol skin preparation, goal-directed fluids, and audit; it departed from ERAS by recommending drains for all patients and bowel preparation for left colonic or rectal resection. NICE NG180 (2020) offers enhanced recovery to everyone having elective major surgery.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "Adults having elective cytoreductive surgery with or without HIPEC for peritoneal surface malignancy (colorectal, appendiceal including pseudomyxoma peritonei, ovarian, gastric, peritoneal mesothelioma). The ERAS panel included general and gynaecological surgeons and anaesthetists.",
  trigger: "A decision to perform cytoreductive surgery, with or without HIPEC.",
  steps: [
    {
      action: "Counsel before surgery and advise stopping smoking and heavy alcohol use",
      why: "Smoking and heavy drinking both raise the risk of complications after major surgery; stopping beforehand helps.",
      source: "indepso-2025",
      quote: "As per ERAS Society Recommendations, ( Hübner et al., 2020 ) patients should be offered preoperative counseling and advised for smoking cessation and abstinence from heavy alcohol consumption.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Assess nutrition as part of the preoperative assessment",
      why: "Malnutrition is common before this operation and raises the risk of complications.",
      source: "indepso-2025",
      quote: "Nutrition assessment should be a part of preoperative assessment",
      grade: "INDEPSO-ISPSM consensus (above 70% agreement)",
    },
    {
      action: "Screen for anaemia at least four weeks before surgery so it can be treated",
      why: "Anaemia is common after chemotherapy and needs time to correct before a long operation with blood loss.",
      source: "indepso-2025",
      quote: "It should be screened for at least four weeks before surgery to provide adequate time for correction by medical therapy (vitamin supplementation or intravenous iron supplementation),",
      grade: "Consensus discussion; not a graded recommendation",
    },
    {
      action: "Allow clear fluids until 2 hours before the operation, and consider a carbohydrate drink",
      why: "Long fasting leaves people thirsty and weaker; a sugary drink before abdominal surgery is safe.",
      source: "nice-ng180",
      quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery .",
      grade: "Not graded (NICE NG180 1.4.2, 'consider')",
    },
    {
      action: "Start low molecular weight heparin before surgery, use pneumatic compression, and continue prophylaxis for four weeks",
      why: "Without prevention the risk of blood clots after this operation is very high, and it lasts after discharge.",
      source: "indepso-2025",
      quote: "Thromboprophylaxis should be given 12 h preoperatively, with low-molecular-weight/equivalent heparin, and continued perioperatively with a pneumatic compression device till four weeks post-surgery.",
      grade: "INDEPSO-ISPSM consensus (above 70% agreement)",
    },
    {
      action: "Prepare the skin with chlorhexidine in alcohol unless contraindicated",
      why: "The right skin antiseptic reduces wound infection.",
      source: "indepso-2025",
      quote: "Chlorhexidine-alcohol solution should be used for skin preparation unless contraindicated.",
      grade: "INDEPSO-ISPSM consensus (above 70% agreement)",
    },
    {
      action: "Monitor intraperitoneal and core temperature continuously, warm actively during cytoreduction and prevent overheating during HIPEC",
      why: "People get cold during the long open phase and can overheat when heated chemotherapy is circulated; both cause complications.",
      source: "indepso-2025",
      quote: "Prevention of intraoperative hypothermia during the CRS phase and hyperthermia during the HIPEC phase by use of active warming devices should be indicated routinely.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Guide fluids by goal-directed monitoring (arterial line, cardiac output)",
      why: "Large fluid shifts happen during this surgery; measured fluid replacement avoids both too little and too much.",
      source: "indepso-2025",
      quote: "Goal-directed fluid management should be attempted using a combination of crystalloids and colloids. An arterial line/cardiac output monitoring may assist in achieving this goal.",
      grade: "INDEPSO-ISPSM strong consensus (above 90% agreement)",
    },
    {
      action: "Give at least two anti-sickness drugs as prophylaxis",
      why: "Nausea is common after major abdominal surgery and the chemotherapy can add to it.",
      source: "indepso-2025",
      quote: "In CRS ± HIPEC candidates, a combination of atleast two antiemetic drugs (Ondansetron, Dexamethasone, Droperidol) should be indicated routinely to prevent PONV.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Use multimodal analgesia, including a thoracic epidural for 48 to 72 hours where suitable, and minimise opioids",
      why: "Good pain relief lets people breathe and move; an epidural also helps the bowel start working.",
      source: "indepso-2025",
      quote: "Thus, thoracic epidural analgesia (TEA: T5-11) containing local anesthetics and short-acting opiates for 48–72 h after CRS ± HIPEC is safe and recommended to prevent postoperative ileus.",
      grade: "Consensus discussion citing published studies; not a graded recommendation",
    },
    {
      action: "Do not place a prophylactic nasogastric tube unless there are risk factors for delayed stomach emptying (resection of the lesser omentum)",
      why: "A nose tube slows the return of bowel function and is not needed for most people.",
      source: "indepso-2025",
      quote: "Prophylactic nasogastric drainage for CRS ± HIPEC, in the absence of risk factors for delayed gastric emptying (resection of lesser omentum), should not be done, as nasogastric decompression has been associated with undesired effects of delayed resumption of gastrointestinal motility.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Restart clear liquids on the day of surgery and solid food from day 1 where there are no risk factors for delayed emptying; consider planned tube or intravenous feeding for 7 days if intake is expected to be poor",
      why: "Early eating supports healing; some people, after very extensive surgery, will not manage enough by mouth.",
      source: "indepso-2025",
      quote: "Early oral intake resumption after CRS ± HIPEC, aiming for clear liquids on the day of surgery and solid food from postoperative day 1, without risk factors for delayed gastric emptying (resection of lesser omentum), is recommended.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Get the patient out of bed on the day of surgery, aiming for more than 2 hours of activity on day 2 and more than 6 hours a day after that",
      why: "Moving early reduces chest infections, clots and muscle loss, and helps the bowel recover.",
      source: "indepso-2025",
      quote: "Mobilization as early as the day of surgery (out of bed) with goals for more than two hours of physical exercises for postoperative day two and more than six hours after that should be performed routinely after CRS ± HIPEC to improve capacity to perform out-of-bed activities, facilitate resumption of gastrointestinal function and decrease postoperative complications.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Remove the urinary catheter on the morning of day 3 if the peritoneum over the bladder was not removed",
      why: "Catheters left in longer raise the risk of urine infection and slow getting up.",
      source: "indepso-2025",
      quote: "Removal of the urinary catheter as early as the morning of postoperative day three is recommended when peritonectomy over the bladder is not done.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Audit compliance with the pathway regularly",
      why: "Units that measure how often each element is delivered can improve it.",
      source: "indepso-2025",
      quote: "Regular audits for compliance with ERAS should be conducted as it is critical to ensure adherence to protocol.",
      grade: "INDEPSO-ISPSM consensus (above 70% agreement)",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society guideline for CRS with or without HIPEC (2020, Parts I and II) is the only specialty standard: 72 items graded by GRADE, 37 strong recommendations, consensus on all but preemptive fresh frozen plasma. Only its abstracts could be read, so its content is taken from the INDEPSO-ISPSM consensus (2025), which reports it and largely agrees. The two differ on drains (the Indian panel recommends them for all patients, which it says contradicts the ERAS guideline) and on mechanical bowel preparation (the Indian panel recommends it for left colonic and rectal resection). NICE NG180 (2020) supports an enhanced recovery programme and the 2-hour clear-fluid fast for all elective major surgery.",
    sources: ["eras-crs-2020-part1", "eras-crs-2020-part2", "indepso-2025", "nice-ng180"],
  },
  variants: [
    {
      name: "Routine intraperitoneal drains (INDEPSO-ISPSM, India)",
      differs: "Places intraperitoneal drains in every patient after CRS or HIPEC.",
      evidence: "Recommended by 79% of the Indian panel in round two; the consensus states this contradicts the ERAS guidelines, and it cites evidence that drains after elective surgery prolong stay and raise wound infection risk without earlier detection of collections.",
      sources: ["indepso-2025"],
    },
    {
      name: "Mechanical bowel preparation for left colonic or rectal resection (INDEPSO-ISPSM)",
      differs: "Gives bowel preparation when a left colonic or rectal resection is planned.",
      evidence: "Indian consensus (79.6% in round two); named by the consensus as a departure from the ERAS guideline. The underlying trials of oral antibiotic and mechanical preparation are mixed (MOBILE and MOBILE2, as reported by the consensus).",
      sources: ["indepso-2025"],
    },
    {
      name: "Incentive spirometry for all",
      differs: "Teaches every patient incentive spirometry before surgery.",
      evidence: "Indian consensus (87.5%); the consensus itself notes that the European Society of Anaesthesiology does not suggest preoperative incentive spirometry prevents pulmonary complications and that reviews disagree.",
      sources: ["indepso-2025"],
    },
    {
      name: "Empirical postoperative antibiotics for 72 hours",
      differs: "Continues antibiotics after surgery rather than giving prophylaxis only.",
      evidence: "Some groups do this, according to the Indian consensus; it states that additional postoperative doses are not required in clean contaminated surgery. The Indian panel left the antibiotic choice to each institution's policy.",
      sources: ["indepso-2025"],
    },
  ],
  grades: [
    { claim: "ERAS CRS/HIPEC guideline: consensus, strong recommendations and the one item without consensus", grade: "GRADE; two-round Delphi of 24 experts", source: "eras-crs-2020-part1", quote: "Consensus was reached for 71/72(98.6%) items. Strong recommendations were defined for 37 items, No consensus could be reached regarding the preemptive use of fresh frozen plasma." },
    { claim: "Quality of evidence across the 72 items", grade: "GRADE quality of evidence", source: "eras-crs-2020-part2", quote: "Quality of evidence was evaluated high, moderate low and very low, for 15 (21%), 26 (36%), 29 (40%) and 2 items, respectively." },
    { claim: "Where the Indian consensus departs from ERAS", grade: "INDEPSO-ISPSM modified Delphi (consensus above 70%)", source: "indepso-2025", quote: "Some of the panelists’ recommendations contradicted the standard ERAS guidelines, such as using intraperitoneal drains in all patients and mechanical bowel preparation for left-sided colonic or rectal resections." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
  ],
  sources: [
    {
      key: "eras-crs-2020-part1",
      label: "Guidelines for Perioperative Care in Cytoreductive Surgery (CRS) with or without HIPEC: ERAS Society Recommendations, Part I: Preoperative and intraoperative management (Hübner et al.)",
      publisher: "ERAS Society (European Journal of Surgical Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.ejso.2020.07.041",
      doi: "10.1016/j.ejso.2020.07.041",
      gradingScheme: "GRADE quality of evidence (high, moderate, low, very low) and strength of recommendation, by two-round Delphi.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "eras-crs-2020-part2",
      label: "Guidelines for Perioperative Care in Cytoreductive Surgery (CRS) with or without HIPEC: ERAS Society Recommendations, Part II: Postoperative management and special considerations (Hübner et al.)",
      publisher: "ERAS Society (European Journal of Surgical Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.ejso.2020.08.006",
      doi: "10.1016/j.ejso.2020.08.006",
      gradingScheme: "GRADE quality of evidence (high, moderate, low, very low) and strength of recommendation, by two-round Delphi.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "indepso-2025",
      label: "INDEPSO-ISPSM consensus on peritoneal malignancies: enhanced recovery after surgery in cytoreductive surgery (CRS) with/without HIPEC",
      publisher: "INDEPSO and ISPSM (Gynecologic Oncology Reports)",
      year: 2025,
      url: "https://doi.org/10.1016/j.gore.2024.101662",
      doi: "10.1016/j.gore.2024.101662",
      gradingScheme: "Modified Delphi, two rounds, 48 voting surgeons: consensus above 70% of votes, strong consensus above 90%; no evidence grades.",
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
  cancers: ["appendiceal", "peritoneal-mesothelioma", "ovarian", "gastric"],
  technologies: ["hipec", "hipec-pipac-devices", "eras-perioperative-nutrition", "prehabilitation"],
  terms: ["cytoreductive-surgery", "hipec-procedure", "colorectal-peritoneal-metastases", "peritoneal-metastasis", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full texts of both parts of the ERAS Society CRS/HIPEC guideline (2020) could not be read: neither is open in PubMed Central, the publisher's text service needs a key, and the ERAS Society site refused a script. The grade of each item is not given here, and the item content is the Indian consensus authors' account of it.",
    "Evidence specific to CRS and HIPEC is thin: 40% of the ERAS items rest on low-quality evidence, and the guideline calls for high-quality studies.",
    "Whether fresh frozen plasma should be given preemptively did not reach consensus (ERAS 2020).",
    "Drains and bowel preparation are handled differently by the ERAS and Indian panels; no trial settles either for CRS.",
    "Anaesthetic doses, HIPEC drug regimens and temperature targets are in the guideline and local protocols and are not reproduced here.",
  ],
});
