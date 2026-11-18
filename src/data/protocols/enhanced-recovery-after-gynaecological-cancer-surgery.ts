import { protocol } from "./helpers";

/*
 * Enhanced recovery after surgery for gynaecological cancer (ovary, womb, cervix, vulva and vagina).
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * with curl and each claim, quote and grade was checked against it (quotes by script).
 * - ERAS Society guidelines for postoperative care in gynecologic/oncology surgery, Part II (Gynecol Oncol 2016): full
 *   text, NIH author manuscript, read as XML from the Europe PMC REST service (PMC6038804). This is the latest edition
 *   whose recommendations could be read, and it covers only the postoperative items.
 * - ERAS Society gynecologic oncology guidelines, 2026 update (the third update), the 2023 update on implementation
 *   challenges, the 2019 update and the vulvar and vaginal surgery guideline (2020): abstracts only (Europe PMC). No
 *   abstract states a recommendation. The publishers' sites for the 2026 and 2019 papers answered a script with a bot
 *   check, which was not got round, and Europe PMC holds no open copy of any of them.
 * - Part I (pre- and intra-operative care, Gynecol Oncol 2016, 10.1016/j.ygyno.2015.11.015): not read. The publisher
 *   refused a script and the one university repository copy found answered with a captcha.
 * - NICE NG180, Perioperative care in adults (2020; minor changes July 2025 and October 2021): recommendations page,
 *   full text, from a copy a sibling checker fetched from nice.org.uk on the same day.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 * Corrected in the second pass: reasons in `why` that the guideline does not give; "injections" for extended
 * prophylaxis, which the guideline does not specify; IV fluids described as resting on high evidence (it is moderate);
 * a mmol/l glucose conversion no source prints; a NICE quote with a stray space.
 */
export const enhancedRecoveryAfterGynaecologicalCancerSurgery = protocol({
  id: "enhanced-recovery-after-gynaecological-cancer-surgery",
  name: "Enhanced recovery after gynaecological cancer surgery (ERAS pathway for gynaecologic oncology)",
  aka: ["ERAS gynaecologic oncology", "ERAS gynecologic oncology", "enhanced recovery hysterectomy", "enhanced recovery ovarian cancer surgery", "perioperative care for gynaecological cancer"],
  domain: "surgery-perioperative",
  tldr: "After an operation for ovarian, womb or cervical cancer, enhanced recovery means a normal diet and getting up within a day, the drip stopped within a day, the urinary catheter out preferably within a day, no routine drains, pain relief that relies less on opioids, and 28 days of blood clot prevention after open surgery for cancer. This is the 2016 guideline; the 2026 update could not be read.",
  simple: "After surgery for a gynaecological cancer you will be helped to eat, drink and get out of bed within a day. The drip and the catheter come out early. After open surgery for cancer, treatment to prevent blood clots usually carries on for 28 days.",
  summary: "The ERAS Society has updated its gynecologic oncology guideline three times (2019, 2023 implementation update, 2026), but none of the updates could be read as raw text and their abstracts state no recommendations. The latest edition whose recommendations could be read is the 2016 Part II on postoperative care (modified GRADE): compression stockings and intermittent pneumatic compression, and 28 days of extended prophylaxis after laparotomy for abdominal or pelvic cancer (high, strong); IV fluids stopped within 24 hours, with balanced crystalloid preferred to 0.9% saline (moderate, strong); a regular diet within 24 hours (high, strong); multimodal analgesia with regular paracetamol and an NSAID (high, strong); for open surgery, spinal anaesthesia with intrathecal morphine (moderate, strong) or a thoracic epidural (high, strong), and a truncal block such as a TAP block where there is no neuraxial block (moderate, strong); no routine peritoneal drain, including after lymphadenectomy or bowel surgery (moderate, strong); urinary catheter for a short period, preferably under 24 hours (low, strong); mobilisation within 24 hours (low, strong); insulin infusion for glucose above 180 to 200 mg/dL (high, strong); laxatives (low) and chewing gum (moderate) to be considered (weak). NICE NG180 says to offer an enhanced recovery programme for elective major or complex surgery and that people may drink clear fluids until 2 hours before the operation.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "Adults having planned surgery for gynaecological cancer (ovarian, endometrial, cervical), open or laparoscopic, including cytoreduction with bowel surgery and lymphadenectomy. The 2016 guideline covers gynaecological surgery generally as well as cancer surgery. Vulvar and vaginal surgery has its own ERAS guideline (2020), whose recommendations could not be read.",
  trigger: "A decision to operate for a gynaecological cancer.",
  steps: [
    {
      action: "Offer an enhanced recovery programme for planned major surgery",
      why: "NICE asks for a programme with parts before, during and after the operation.",
      source: "nice-ng180",
      quote: "Offer an enhanced recovery programme to people having elective major or complex surgery.",
      grade: "Not graded (NICE NG180 1.2.1)",
    },
    {
      action: "Fit compression stockings and use intermittent pneumatic compression, and give 28 days of clot prevention after laparotomy for cancer",
      why: "People with cancer had more clots in the 30 days after surgery, and a review of four trials found fewer clots with extended prevention (6.1% against 14.3%).",
      source: "eras-gyn-2016-postop",
      quote: "Patients should wear well-fitting compression stockings and have intermittent pneumatic compression. Extended prophylaxis (28 days) should be given to patients after laparotomy for abdominal or pelvic malignancies.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Stop intravenous fluids within 24 hours of surgery, preferring balanced crystalloid to 0.9% saline",
      why: "Once a person is eating and drinking, a drip is rarely needed beyond 12 to 24 hours; saline carries a cumulative risk of making the blood too acidic.",
      source: "eras-gyn-2016-postop",
      quote: "Intravenous fluids should be terminated within 24 h after surgery. Balanced crystalloid solutions are preferred to 0.9% normal saline.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Offer a regular diet within the first 24 hours after surgery",
      why: "In trials the bowel started working sooner and the hospital stay was shorter, with no evidence of more complications; nausea was more common.",
      source: "eras-gyn-2016-postop",
      quote: "A regular diet within the first 24 h after gynecologic/oncology surgery is recommended.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Use multimodal pain relief with regular paracetamol and an NSAID, oral opioids once eating, and IV patient-controlled analgesia only until the gut works",
      why: "Combining non-opioid painkillers aims to reduce the opioid needed; morphine is linked with nausea and drowsiness, and opioids slow the bowel.",
      source: "eras-gyn-2016-postop",
      quote: "Acetaminophen and NSAIDs in combination should be administered regularly to all patients unless contraindication exists.",
      grade: "Evidence level: Use of multimodal analgesia: High. Combination of acetaminophen and NSAIDs: High. Recommendation grade: Strong.",
    },
    {
      action: "For open surgery, use spinal anaesthesia with intrathecal morphine or a thoracic epidural; without either, use a truncal block such as a TAP block",
      why: "These reduce pain and opioid use after an abdominal incision; an epidural may delay getting up and catheter removal.",
      source: "eras-gyn-2016-postop",
      quote: "Where patients have undergone general anesthesia without neuraxial blockade, a truncal block, such as TAP blocks, may reduce pain and opioid consumption for up to 24 h and should be employed.",
      grade: "Intrathecal morphine: Moderate. Thoracic epidural analgesia: High. TAP blocks: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Do not place a peritoneal drain routinely, even after lymph node removal or bowel surgery",
      why: "The guideline found no evidence that drains give better outcomes after gynaecological surgery, and a review linked them with more fluid cysts after pelvic lymph node removal.",
      source: "eras-gyn-2016-postop",
      quote: "Peritoneal drainage is not recommended routinely in gynecologic/oncology surgery including for patients undergoing lymphadenectomy or bowel surgery.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Use a urinary catheter for a short period only, preferably under 24 hours after surgery",
      why: "In one trial after abdominal hysterectomy, catheters left for 24 hours led to more urine infections than removal at 6 hours, and patients name catheters as a barrier to walking.",
      source: "eras-gyn-2016-postop",
      quote: "Urinary catheters should be used for postoperative bladder drainage for a short period preferably <24 h postoperatively.",
      grade: "Evidence level: Low. Recommendation grade: Strong.",
    },
    {
      action: "Encourage getting up within 24 hours of surgery",
      why: "Early movement is thought to reduce chest complications, muscle loss and time in hospital, and is part of preventing clots.",
      source: "eras-gyn-2016-postop",
      quote: "Patients should be encouraged to mobilize within 24 h of surgery.",
      grade: "Evidence level: Low. Recommendation grade: Strong.",
    },
    {
      action: "Consider laxatives and chewing gum after surgery to help the bowel recover",
      why: "Evidence is limited: a laxative brought the first stool a day sooner in one trial, and chewing gum reduced ileus in a trial in gynaecological cancer.",
      source: "eras-gyn-2016-postop",
      quote: "The use of postoperative laxatives and chewing gum should be considered.",
      grade: "Evidence level: Laxatives: Low. Chewing gum: Moderate. Recommendation grade: Weak.",
    },
    {
      action: "Treat blood glucose above 180 to 200 mg/dL with an insulin infusion and regular glucose checks",
      why: "High blood sugar around surgery is linked with infection and longer hospital stays; regular checks guard against the sugar falling too low.",
      source: "eras-gyn-2016-postop",
      quote: "Perioperative maintenance of blood glucose levels (<180–200 mg/dL) results in improved perioperative outcomes. Glucose levels above this range should be treated with insulin infusions and regular blood glucose monitoring to avoid the risk of hypoglycemia.",
      grade: "Evidence level: Treating hyperglycemia above 180–200 mg/dL: High. Recommendation grade: Strong.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society 2026 update is the current specialty standard, but no recommendation in it could be read. The latest readable recommendations, the 2016 postoperative guideline, are graded and most are strong: extended 28-day clot prevention after laparotomy for cancer and early diet rest on high-quality evidence; stopping IV fluids within 24 hours and no routine drains on moderate; early catheter removal and early mobilisation on low. NICE NG180 covers the general enhanced recovery programme and clear fluids until 2 hours before the operation. The weak recommendations in ERAS 2016 are analgesia for vaginal hysterectomy, major oncological surgery and laparoscopic surgery (low evidence), and laxatives and chewing gum.",
    sources: ["eras-gyn-2026", "eras-gyn-2016-postop", "nice-ng180"],
  },
  variants: [
    {
      name: "Thoracic epidural for major gynaecological cancer surgery",
      differs: "Uses a thoracic epidural as the main analgesia after laparotomy for cancer.",
      evidence: "ERAS 2016 says it is effective in reducing pain after gynaecological laparotomy but may not improve other outcomes, patients may need IV opioids as well, and it may compound low blood pressure that needs vasopressor support; IV patient-controlled analgesia appears to be a suitable alternative (low evidence, weak).",
      sources: ["eras-gyn-2016-postop"],
    },
    {
      name: "Extended clot prevention after minimally invasive surgery",
      differs: "Gives 28 days of prophylaxis after laparoscopic surgery as well as open.",
      evidence: "ERAS 2016 says, in its discussion and not as a graded recommendation, that extended prophylaxis after minimally invasive surgery is likely not necessary without other high-risk features (raised BMI, previous VTE, coagulopathy, reduced mobility).",
      sources: ["eras-gyn-2016-postop"],
    },
  ],
  grades: [
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Spinal anaesthesia with intrathecal morphine for open surgery", grade: "Evidence level: Moderate. Recommendation grade: Strong.", source: "eras-gyn-2016-postop", quote: "Spinal anesthesia with intrathecal morphine is recommended" },
    { claim: "Thoracic epidural for major oncological surgery", grade: "Evidence level: Low. Recommendation grade: Weak.", source: "eras-gyn-2016-postop", quote: "TEA may be considered but patients frequently require additional IV opioids in addition to TEA to achieve adequate analgesia" },
    { claim: "Analgesia for laparoscopic surgery", grade: "Evidence level: Low. Recommendation grade: Weak.", source: "eras-gyn-2016-postop", quote: "Lack of evidence makes it difficult to recommend one analgesic intervention over another, however a multimodal approach should be employed" },
  ],
  sources: [
    {
      key: "eras-gyn-2026",
      label: "Enhanced recovery after surgery (ERAS) society guidelines for gynecologic oncology: 2026 update",
      publisher: "ERAS Society (Gynecologic Oncology)",
      year: 2026,
      url: "https://doi.org/10.1016/j.ygyno.2026.05.022",
      doi: "10.1016/j.ygyno.2026.05.022",
      gradingScheme: "GRADE, per its abstract; the recommendations were not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "eras-gyn-2023",
      label: "Enhanced recovery after surgery (ERAS) society guidelines for gynecologic oncology: Addressing implementation challenges, 2023 update",
      publisher: "ERAS Society (Gynecologic Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.ygyno.2023.04.009",
      doi: "10.1016/j.ygyno.2023.04.009",
      gradingScheme: "GRADE, per its abstract; the recommendations were not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "eras-gyn-2019",
      label: "Guidelines for perioperative care in gynecologic/oncology: Enhanced Recovery After Surgery (ERAS) Society recommendations, 2019 update",
      publisher: "ERAS Society (International Journal of Gynecological Cancer)",
      year: 2019,
      url: "https://doi.org/10.1136/ijgc-2019-000356",
      doi: "10.1136/ijgc-2019-000356",
      gradingScheme: "GRADE, per its abstract; the recommendations were not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "eras-gyn-2016-postop",
      label: "Guidelines for postoperative care in gynecologic/oncology surgery: Enhanced Recovery After Surgery (ERAS) Society recommendations, Part II",
      publisher: "ERAS Society (Gynecologic Oncology)",
      year: 2016,
      url: "https://doi.org/10.1016/j.ygyno.2015.12.019",
      doi: "10.1016/j.ygyno.2015.12.019",
      gradingScheme: "GRADE evidence level (high, moderate, low, very low) and recommendation grade (strong or weak), printed after each item and in its summary table. The authors call it a modified GRADE, because resource use was not considered.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eras-vulvar-vaginal-2020",
      label: "Guidelines for vulvar and vaginal surgery: Enhanced Recovery After Surgery Society recommendations",
      publisher: "ERAS Society (American Journal of Obstetrics and Gynecology)",
      year: 2020,
      url: "https://doi.org/10.1016/j.ajog.2020.07.039",
      doi: "10.1016/j.ajog.2020.07.039",
      gradingScheme: "GRADE, per its abstract; the recommendations were not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180), recommendations",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["ovarian", "endometrial", "cervical", "vulvar"],
  drugs: ["morphine"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["hysterectomy", "debulking", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "routine-preoperative-tests", "enhanced-recovery-after-colorectal-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The current ERAS gynecologic oncology guideline (2026) and the 2019 and 2023 updates could be read only as abstracts, which state no recommendations. On 17 November 2026 the publishers' sites for the 2026 and 2019 papers again answered a script with a bot check, and no open copy was found. Every graded step here is from the 2016 postoperative guideline and may have been revised since; this page should be updated when the 2026 text can be read.",
    "The pre- and intra-operative items (counselling, prehabilitation, bowel preparation, fasting times for food, carbohydrate loading, antibiotic and skin preparation, warming, nausea prophylaxis) are in the 2016 Part I and the later updates, none of which could be read; on 17 November 2026 the one repository copy of Part I found answered with a captcha. They are covered here only by NICE NG180 and by the surgical site infection and VTE protocols.",
    "The vulvar and vaginal surgery guideline (2020) could be read only as an abstract.",
    "The 2016 guideline does not name the drug or dose for the 28 days of extended prophylaxis in its recommendation; see the VTE protocol for that.",
    "The 2016 guideline gives its glucose threshold only in mg/dL. On 17 November 2026 a mmol/l conversion that no source read prints was taken out of the step; UK teams work in mmol/l and their own protocol gives the figure.",
  ],
});
