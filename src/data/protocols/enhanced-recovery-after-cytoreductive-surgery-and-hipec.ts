import { protocol } from "./helpers";

/*
 * Enhanced recovery after cytoreductive surgery (CRS) with or without hyperthermic intraperitoneal chemotherapy (HIPEC),
 * for cancer that has spread over the lining of the abdomen: from the bowel, appendix (including pseudomyxoma
 * peritonei), ovary, stomach, or peritoneal mesothelioma.
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim on 17 November 2026 in a second accuracy
 * pass, every source fetched raw with curl and read as text, every quote checked verbatim by script):
 * - ERAS Society guidelines for perioperative care in CRS with or without HIPEC, Part I (preoperative and intraoperative)
 *   and Part II (postoperative and special considerations) (Hübner et al., Eur J Surg Oncol 2020): abstracts only,
 *   through Europe PMC. This is the current edition: Europe PMC title searches for 2020 to 2026 on 17 November 2026
 *   found no newer ERAS Society edition. Neither part is open in PubMed Central. Europe PMC lists a free PDF of Part II
 *   on the journal's site, but the journal answered 403 to a script for both parts on 17 November 2026, the
 *   publisher's text service needs a key, and the ERAS Society site was not available. None was got round.
 * - INDEPSO-ISPSM consensus on peritoneal malignancies: enhanced recovery after surgery in CRS with or without HIPEC
 *   (Gynecol Oncol Rep 2025): full text, Europe PMC XML (PMC11732209). An Indian modified-Delphi consensus (50 surgeons
 *   invited, 48 voted), which reports many ERAS 2020 recommendations in its results text, cited to Hübner et al. 2020.
 *   Steps that rest on those passages are the consensus authors' account of the ERAS guideline, not the guideline's
 *   own words.
 * - NICE NG180, Perioperative care in adults (2020; minor changes October 2021 and July 2025): recommendations page
 *   and update information, full text, from a copy a sibling checker fetched from nice.org.uk on 17 November 2026.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 * The second pass corrected two NICE quotes that carried a stray space before the full stop, reworded reasons that
 * the sources do not give, printed the panel's vote beside each Indian statement, and scoped the fasting, clot
 * prevention, feeding and mobilisation figures to the body that states each.
 */
export const enhancedRecoveryAfterCytoreductiveSurgeryAndHipec = protocol({
  id: "enhanced-recovery-after-cytoreductive-surgery-and-hipec",
  name: "Enhanced recovery after cytoreductive surgery with or without HIPEC",
  aka: ["ERAS CRS HIPEC", "ERAS cytoreductive surgery", "enhanced recovery HIPEC", "perioperative care for cytoreductive surgery", "ERAS peritonectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care for major surgery to remove cancer from the lining of the abdomen, sometimes with heated chemotherapy: stopping smoking and drinking, a nutrition check, treating anaemia, a short fast, four weeks of clot prevention, careful temperature and fluids in theatre, good pain relief, no routine nose tube, drinking from the day of surgery and getting up early.",
  simple: "Before the operation you will be asked to stop smoking and drinking, have your nutrition and blood count checked, and can drink clear fluids until two hours before. Afterwards you will be helped to drink and eat early and to get out of bed on the day of the operation or soon after, and given treatment against clots that the Indian consensus continues for four weeks.",
  summary: "The ERAS Society guideline for CRS with or without HIPEC (2020, two parts; 72 items graded by GRADE, consensus on 71 after a two-round Delphi of 24 experts, 37 strong recommendations, no consensus on preemptive fresh frozen plasma) is the dedicated guideline for this operation; only its abstracts could be read. Its item content is taken from the INDEPSO-ISPSM consensus (India, 2025), which reports it: preoperative counselling with smoking and heavy alcohol cessation; monitoring of intraperitoneal and core temperature, with active warming against hypothermia during CRS and against hyperthermia during HIPEC; at least two antiemetics; no prophylactic nasogastric drainage without risk factors for delayed gastric emptying; clear liquids on the day of surgery and solid food from day 1; preemptive enteral or parenteral nutrition for 7 days in selected patients; out of bed on the day of surgery with more than 2 hours of physical exercise on day 2 and more than 6 hours after that; urinary catheter out on the morning of day 3 when the bladder peritoneum was not stripped. The Indian consensus itself agreed on nutritional assessment (83.33% of votes), anaemia correction (81.25%), fasting for up to 6 to 8 hours for solids and 2 hours for liquids (70.83%), carbohydrate loading (72.92%), thromboprophylaxis from 12 hours before surgery with low molecular weight or equivalent heparin, continued with a pneumatic compression device until four weeks after surgery (79.17%), chlorhexidine-alcohol skin preparation (70.83%), goal-directed fluids (100%), and audit (74.47%). It departed from ERAS by agreeing that drains should be considered for all patients and that mechanical bowel preparation, without oral antibiotics, should be given for left colonic or rectal resection. What the ERAS guideline itself says on fasting, carbohydrate drinks and the length of thromboprophylaxis could not be read. NICE NG180 (2020) offers an enhanced recovery programme to people having elective major or complex surgery.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "People having cytoreductive surgery with or without HIPEC for peritoneal surface malignancy. The ERAS panel was 24 experts in peritoneal surface malignancy surgery: 12 from general surgery, 6 from gynaecological surgery and 6 from anaesthesia. The sources read do not list the primary cancers or set an age range; NICE NG180 covers adults having surgery. The INDEPSO-ISPSM statements were written for India.",
  trigger: "A decision to perform cytoreductive surgery, with or without HIPEC.",
  steps: [
    {
      action: "Counsel before surgery and advise stopping smoking and heavy alcohol use",
      why: "The consensus says an intensive programme to stop smoking and alcohol, at least four weeks before surgery, is best for lowering complications after the operation. All of the Indian panel (100%) voted that both should stop, preferably at diagnosis.",
      source: "indepso-2025",
      quote: "As per ERAS Society Recommendations, ( Hübner et al., 2020 ) patients should be offered preoperative counseling and advised for smoking cessation and abstinence from heavy alcohol consumption.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Assess nutrition as part of the preoperative assessment",
      why: "The consensus says malnutrition is common in people planned for this operation, and that nutrition scores are used to judge the risk of complications afterwards.",
      source: "indepso-2025",
      quote: "Nutrition assessment should be a part of preoperative assessment",
      grade: "INDEPSO-ISPSM consensus (83.33% of votes)",
    },
    {
      action: "Screen for anaemia at least four weeks before surgery so it can be treated",
      why: "The consensus says about a third of people are anaemic before surgery, perhaps more after chemotherapy, and that treatment needs time to work. The Indian panel agreed (81.25%) that anaemia should be corrected before surgery, by transfusion or by iron and vitamins depending on the time available, the haemoglobin and the symptoms.",
      source: "indepso-2025",
      quote: "It should be screened for at least four weeks before surgery to provide adequate time for correction by medical therapy (vitamin supplementation or intravenous iron supplementation),",
      grade: "Consensus discussion; not a graded recommendation",
    },
    {
      action: "Allow clear fluids until 2 hours before the operation, and consider a carbohydrate drink",
      why: "NICE says drinking clear fluids before the operation can help reduce headaches, nausea and vomiting afterwards. The Indian consensus agreed fasting for up to 6 to 8 hours for solids and 2 hours for liquids for all patients (70.83%) and that carbohydrate loading should be offered (72.92%); neither source read gives a volume for the drink.",
      source: "nice-ng180",
      quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery.",
      grade: "Not graded (NICE NG180 1.4.2, 'consider')",
    },
    {
      action: "Start low molecular weight or equivalent heparin 12 hours before surgery unless anticoagulation is contraindicated, use a pneumatic compression device, and continue prophylaxis until four weeks after surgery",
      why: "The consensus reports a 30 to 50% risk of venous thromboembolism after CRS with HIPEC when no prophylaxis is given. It says established guidelines support four weeks of prophylaxis to lower the risk of deep vein thrombosis, but not of pulmonary embolism, and that compression is advised until the patient is fully mobile.",
      source: "indepso-2025",
      quote: "Thromboprophylaxis should be given 12 h preoperatively, with low-molecular-weight/equivalent heparin, and continued perioperatively with a pneumatic compression device till four weeks post-surgery.",
      grade: "INDEPSO-ISPSM consensus (79.17% of votes)",
    },
    {
      action: "Prepare the skin with chlorhexidine in alcohol unless contraindicated",
      why: "The consensus calls it the preferred skin preparation. It gives no figures for wound infection.",
      source: "indepso-2025",
      quote: "Chlorhexidine-alcohol solution should be used for skin preparation unless contraindicated.",
      grade: "INDEPSO-ISPSM consensus (70.83% of votes)",
    },
    {
      action: "Monitor intraperitoneal and core temperature continuously, warm actively during cytoreduction and prevent overheating during HIPEC",
      why: "Body temperature can fall during the cytoreduction and rise while heated chemotherapy is circulated. The consensus calls keeping a normal temperature an essential part of care during the operation, and the Indian panel agreed (93.62%).",
      source: "indepso-2025",
      quote: "Prevention of intraoperative hypothermia during the CRS phase and hyperthermia during the HIPEC phase by use of active warming devices should be indicated routinely.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Attempt goal-directed fluid management; an arterial line or cardiac output monitoring may help",
      why: "The consensus describes extensive fluid shifts during this surgery, and heat that widens blood vessels. No panellist voted for a liberal or a restrictive fluid policy.",
      source: "indepso-2025",
      quote: "Goal-directed fluid management should be attempted using a combination of crystalloids and colloids. An arterial line/cardiac output monitoring may assist in achieving this goal.",
      grade: "INDEPSO-ISPSM strong consensus (100% of votes)",
    },
    {
      action: "Give a combination of at least two anti-sickness drugs routinely as prophylaxis",
      why: "The consensus says the chemotherapy drugs used in HIPEC often cause nausea and vomiting, even though little is absorbed into the body. The Indian panel agreed that combination antiemetics should be used (75%).",
      source: "indepso-2025",
      quote: "In CRS ± HIPEC candidates, a combination of atleast two antiemetic drugs (Ondansetron, Dexamethasone, Droperidol) should be indicated routinely to prevent PONV.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Use multimodal analgesia from the evening before surgery, encourage a thoracic epidural, a TAP block or patient-controlled analgesia, and try to avoid or minimise opioids afterwards",
      why: "The Indian panel agreed this approach (89.58%). The consensus cites a 2016 Cochrane review in which epidurals lowered rates of ileus (a bowel slow to restart) and, from published studies, calls a thoracic epidural for 48 to 72 hours safe and recommended to prevent it.",
      source: "indepso-2025",
      quote: "Thus, thoracic epidural analgesia (TEA: T5-11) containing local anesthetics and short-acting opiates for 48–72 h after CRS ± HIPEC is safe and recommended to prevent postoperative ileus.",
      grade: "Consensus discussion citing published studies; not a graded recommendation",
    },
    {
      action: "Do not place a prophylactic nasogastric tube unless there are risk factors for delayed stomach emptying (resection of the lesser omentum)",
      why: "The consensus says nasogastric drainage has been associated with a slower return of bowel movement. The Indian panel agreed that nasogastric tubes should be discouraged or kept to a minimum (80.85%).",
      source: "indepso-2025",
      quote: "Prophylactic nasogastric drainage for CRS ± HIPEC, in the absence of risk factors for delayed gastric emptying (resection of lesser omentum), should not be done, as nasogastric decompression has been associated with undesired effects of delayed resumption of gastrointestinal motility.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Restart clear liquids on the day of surgery and solid food from day 1 where there are no risk factors for delayed emptying; consider planned tube or intravenous feeding for 7 days in selected patients whose intake by mouth is expected to be insufficient",
      why: "The consensus says planned feeding in selected patients is meant to reduce complications and deaths. The Indian panel itself agreed a later start than ERAS: at least clear liquids as early as day 1 after surgery (91.49%, strong consensus).",
      source: "indepso-2025",
      quote: "Early oral intake resumption after CRS ± HIPEC, aiming for clear liquids on the day of surgery and solid food from postoperative day 1, without risk factors for delayed gastric emptying (resection of lesser omentum), is recommended.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Get the patient out of bed as early as the day of surgery, aiming for more than 2 hours of physical exercise on day 2 and more than 6 hours after that",
      why: "The consensus says prolonged bed rest is associated with chest complications, weaker muscles, clots and insulin resistance, and that moving early helps the bowel recover. The Indian panel agreed early mobilisation, preferably within 24 to 48 hours (85.42%).",
      source: "indepso-2025",
      quote: "Mobilization as early as the day of surgery (out of bed) with goals for more than two hours of physical exercises for postoperative day two and more than six hours after that should be performed routinely after CRS ± HIPEC to improve capacity to perform out-of-bed activities, facilitate resumption of gastrointestinal function and decrease postoperative complications.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Remove the urinary catheter as early as the morning of day 3 if the peritoneum over the bladder was not removed",
      why: "The consensus gives the timing but not a reason, and says enhanced recovery generally favours early removal of tubes. The Indian panel agreed removal at the earliest possible time, preferably by day 3 (75%).",
      source: "indepso-2025",
      quote: "Removal of the urinary catheter as early as the morning of postoperative day three is recommended when peritonectomy over the bladder is not done.",
      grade: "ERAS 2020 as reported by the consensus; grade not read",
    },
    {
      action: "Audit compliance with the pathway regularly",
      why: "The consensus says the more fully the pathway is followed, the better the outcomes.",
      source: "indepso-2025",
      quote: "Regular audits for compliance with ERAS should be conducted as it is critical to ensure adherence to protocol.",
      grade: "INDEPSO-ISPSM consensus (74.47% of votes)",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society guideline for CRS with or without HIPEC (2020, Parts I and II) is the dedicated guideline for this operation: 72 items graded by GRADE, 37 strong recommendations, consensus on all but preemptive fresh frozen plasma. Only its abstracts could be read, so its content is taken from the INDEPSO-ISPSM consensus (2025), which reports it and says most ERAS Society recommendations are adhered to in India. The two differ on drains (the Indian panel agreed they should be considered for all patients, which it says contradicts the ERAS guideline) and on mechanical bowel preparation (the Indian panel agreed it, without oral antibiotics, for left colonic and rectal resection, contrary to ERAS). NICE NG180 (2020) offers an enhanced recovery programme for elective major or complex surgery and tells people having surgery that they may drink clear fluids until 2 hours before.",
    sources: ["eras-crs-2020-part1", "eras-crs-2020-part2", "indepso-2025", "nice-ng180"],
  },
  variants: [
    {
      name: "Routine intraperitoneal drains (INDEPSO-ISPSM, India)",
      differs: "Considers intraperitoneal drains for every patient having CRS or HIPEC.",
      evidence: "Chosen by 79.17% of the Indian panel in round two (58.33% in round one); the consensus states this contradicts the ERAS guidelines, and it cites evidence that drains after elective surgery prolong stay and raise wound infection risk without earlier detection of collections.",
      sources: ["indepso-2025"],
    },
    {
      name: "Mechanical bowel preparation for left colonic or rectal resection (INDEPSO-ISPSM)",
      differs: "Gives bowel preparation when a left colonic or rectal resection is planned.",
      evidence: "Indian consensus (79.59% in round two); named by the consensus as contrary to the ERAS Society recommendations, the panel favouring mechanical preparation without oral antibiotics. The authors acknowledge a lack of evidence for mechanical preparation alone. The underlying trials of oral antibiotic and mechanical preparation are mixed (MOBILE and MOBILE2, as reported by the consensus).",
      sources: ["indepso-2025"],
    },
    {
      name: "Incentive spirometry for all",
      differs: "Advises incentive spirometry for every patient planned for CRS or HIPEC.",
      evidence: "Indian consensus (87.5%); the consensus itself notes that the European Society of Anaesthesiology does not suggest preoperative incentive spirometry prevents pulmonary complications and that reviews disagree.",
      sources: ["indepso-2025"],
    },
    {
      name: "Empirical postoperative antibiotics for 72 hours",
      differs: "Continues antibiotics after surgery rather than giving prophylaxis only.",
      evidence: "Some groups do this, according to the Indian consensus; it states that additional postoperative doses are not required in clean contaminated surgery. The Indian panel left the choice of prophylactic antibiotic to each institution's policy (72.92%).",
      sources: ["indepso-2025"],
    },
  ],
  grades: [
    { claim: "ERAS CRS/HIPEC guideline: consensus, strong recommendations and the one item without consensus", grade: "GRADE; two-round Delphi of 24 experts", source: "eras-crs-2020-part1", quote: "Consensus was reached for 71/72(98.6%) items. Strong recommendations were defined for 37 items, No consensus could be reached regarding the preemptive use of fresh frozen plasma." },
    { claim: "Quality of evidence across the 72 items", grade: "GRADE quality of evidence", source: "eras-crs-2020-part2", quote: "Quality of evidence was evaluated high, moderate low and very low, for 15 (21%), 26 (36%), 29 (40%) and 2 items, respectively." },
    { claim: "Where the Indian consensus departs from ERAS", grade: "INDEPSO-ISPSM modified Delphi (consensus above 70%)", source: "indepso-2025", quote: "Some of the panelists’ recommendations contradicted the standard ERAS guidelines, such as using intraperitoneal drains in all patients and mechanical bowel preparation for left-sided colonic or rectal resections." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
  ],
  sources: [
    {
      key: "eras-crs-2020-part1",
      label: "Guidelines for Perioperative Care in Cytoreductive Surgery (CRS) with or without HIPEC: ERAS Society Recommendations, Part I: Preoperative and intraoperative management (Hübner et al.)",
      publisher: "ERAS Society (European Journal of Surgical Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.ejso.2020.07.041",
      doi: "10.1016/j.ejso.2020.07.041",
      gradingScheme: "GRADE quality of evidence (high, moderate, low, very low) and strength of recommendation (weak or strong), agreed by a two-round Delphi of 24 experts; consensus defined as 50% or more, or 70% or more of weak and strong recommendations combined.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "eras-crs-2020-part2",
      label: "Guidelines for Perioperative Care in Cytoreductive Surgery (CRS) with or without HIPEC: ERAS Society Recommendations, Part II: Postoperative management and special considerations (Hübner et al.)",
      publisher: "ERAS Society (European Journal of Surgical Oncology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.ejso.2020.08.006",
      doi: "10.1016/j.ejso.2020.08.006",
      gradingScheme: "GRADE quality of evidence (high, moderate, low, very low) and strength of recommendation (weak or strong), agreed by a two-round Delphi of 24 experts; consensus defined as 50% or more, or 70% or more of weak and strong recommendations combined.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "indepso-2025",
      label: "INDEPSO-ISPSM consensus on peritoneal malignancies: enhanced recovery after surgery in cytoreductive surgery (CRS) with/without HIPEC",
      publisher: "INDEPSO and ISPSM (Gynecologic Oncology Reports)",
      year: 2025,
      url: "https://doi.org/10.1016/j.gore.2024.101662",
      doi: "10.1016/j.gore.2024.101662",
      gradingScheme: "Modified Delphi, two rounds, 30 questions, 50 surgeons invited and 48 voting: consensus when one option received more than 70% of votes, strong consensus more than 90%; no evidence grades. The authors say the statements are not formal recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180), recommendations (published August 2020; minor changes October 2021 and July 2025)",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["appendiceal", "peritoneal-mesothelioma", "ovarian", "gastric"],
  technologies: ["hipec", "hipec-pipac-devices", "eras-perioperative-nutrition", "prehabilitation"],
  terms: ["cytoreductive-surgery", "hipec-procedure", "colorectal-peritoneal-metastases", "peritoneal-metastasis", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full texts of both parts of the ERAS Society CRS/HIPEC guideline (2020) could not be read. On 17 November 2026 neither was open in PubMed Central, the journal's site answered 403 to a script for both parts (Europe PMC lists a free PDF of Part II there), the publisher's text service needs a key, and the ERAS Society site was not available. The evidence level and recommendation grade of each item are not given here, and the item content is the Indian consensus authors' account of it.",
    "Because the guideline itself was not read, this page cannot say what the ERAS Society recommends for this operation on fasting times, the carbohydrate drink and its volume, or how long thromboprophylaxis should last. The fasting figures and the four weeks of prophylaxis here are the Indian consensus's; the 2-hour limit for clear fluids is also NICE's. The Indian consensus says established guidelines, among them the ERAS guideline, support four weeks of extended prophylaxis.",
    "Europe PMC title searches on 17 November 2026 found no edition of the ERAS Society CRS/HIPEC guideline newer than 2020.",
    "Evidence specific to CRS and HIPEC is thin: 40% of the ERAS items rest on low-quality evidence, and the guideline calls for high-quality studies.",
    "Whether fresh frozen plasma should be given preemptively did not reach consensus (ERAS 2020).",
    "Drains and bowel preparation are handled differently by the ERAS and Indian panels. The Indian authors acknowledge a lack of evidence for mechanical bowel preparation without oral antibiotics, and say their recommendations may change as trials report.",
    "The Indian consensus reached no consensus on whether ERAS should be implemented in every unit at once (70% of votes) or on agents to speed the return of bowel activity (66.67% for tea or coffee). Its authors note that the panel was mostly surgeons and that some statements may largely reflect expert opinion.",
    "Anaesthetic and antiemetic doses, HIPEC drug regimens and temperature targets for the HIPEC phase are not given in the sources read and are not stated here.",
  ],
});
