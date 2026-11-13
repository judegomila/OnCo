import { protocol } from "./helpers";

/*
 * Enhanced recovery after surgery for gynaecological cancer (ovary, womb, cervix, vulva and vagina).
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society gynecologic oncology guidelines, 2026 update (Gynecol Oncol 2026, the third update): abstract only
 *   (Europe PMC). The abstract states the method and gives no recommendations; the full text is not open.
 * - The 2023 update on implementation challenges (Gynecol Oncol 2023) and the 2019 update (Int J Gynecol Cancer 2019):
 *   abstracts only, Europe PMC; neither abstract states a recommendation. The publisher PDF of the 2019 update answered
 *   with a bot check, which was not got round.
 * - ERAS vulvar and vaginal surgery guideline (Am J Obstet Gynecol 2020): abstract only, no recommendations in it.
 * - ERAS Society guidelines for postoperative care in gynecologic/oncology surgery, Part II (Gynecol Oncol 2016): full
 *   text, NIH author manuscript in PubMed Central (PMC6038804). This is the latest edition whose recommendations could
 *   be read, and it covers only the postoperative items. Part I (pre- and intra-operative, 2016) is not open.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterGynaecologicalCancerSurgery = protocol({
  id: "enhanced-recovery-after-gynaecological-cancer-surgery",
  name: "Enhanced recovery after gynaecological cancer surgery (ERAS pathway for gynaecologic oncology)",
  aka: ["ERAS gynaecologic oncology", "ERAS gynecologic oncology", "enhanced recovery hysterectomy", "enhanced recovery ovarian cancer surgery", "perioperative care for gynaecological cancer"],
  domain: "surgery-perioperative",
  tldr: "After an operation for ovarian, womb or cervical cancer, enhanced recovery means eating a normal diet and getting up within a day, the drip and the urinary catheter out within a day, no routine drains, pain relief that relies less on opioids, and four weeks of blood clot injections after open surgery for cancer.",
  simple: "After surgery for a gynaecological cancer you will be helped to eat, drink and get out of bed within a day. The drip and the catheter come out early. After open surgery you will usually have four weeks of injections to prevent blood clots.",
  summary: "The ERAS Society has updated its gynecologic oncology guideline three times (2019, 2023 implementation update, 2026), but none of the updates is open and their abstracts state no recommendations. The latest edition whose recommendations could be read is the 2016 Part II on postoperative care (GRADE): compression stockings and intermittent pneumatic compression, and 28 days of extended prophylaxis after laparotomy for abdominal or pelvic cancer (high, strong); IV fluids stopped within 24 hours with balanced crystalloid (moderate, strong); a regular diet within 24 hours (high, strong); multimodal analgesia with regular paracetamol and an NSAID (high, strong); spinal anaesthesia with intrathecal morphine for open surgery (moderate, strong), with thoracic epidural an alternative (high, strong) and a TAP block where there is no neuraxial block (moderate, strong); no routine peritoneal drain, even after lymphadenectomy or bowel surgery (moderate, strong); urinary catheter out within 24 hours (low, strong); mobilisation within 24 hours (low, strong); laxatives and chewing gum to be considered (weak). NICE NG180 offers an enhanced recovery programme for all elective major surgery and allows clear fluids to 2 hours before.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "Adults having planned surgery for gynaecological cancer (ovarian, endometrial, cervical), open or laparoscopic, including cytoreduction with bowel surgery and lymphadenectomy. Vulvar and vaginal surgery has its own ERAS guideline (2020), whose recommendations could not be read.",
  trigger: "A decision to operate for a gynaecological cancer.",
  steps: [
    {
      action: "Offer an enhanced recovery programme for planned major surgery",
      why: "A coordinated package of care before, during and after the operation shortens recovery.",
      source: "nice-ng180",
      quote: "Offer an enhanced recovery programme to people having elective major or complex surgery .",
      grade: "Not graded (NICE NG180 1.2.1)",
    },
    {
      action: "Fit compression stockings and use intermittent pneumatic compression, and give 28 days of clot prevention after laparotomy for cancer",
      why: "The risk of a blood clot stays high for a month after open surgery for cancer, and extended injections more than halve it.",
      source: "eras-gyn-2016-postop",
      quote: "Patients should wear well-fitting compression stockings and have intermittent pneumatic compression. Extended prophylaxis (28 days) should be given to patients after laparotomy for abdominal or pelvic malignancies.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Stop intravenous fluids within 24 hours, using balanced crystalloid rather than saline",
      why: "Too much drip fluid causes swelling and slows the bowel; drinking replaces it.",
      source: "eras-gyn-2016-postop",
      quote: "Intravenous fluids should be terminated within 24 h after surgery. Balanced crystalloid solutions are preferred to 0.9% normal saline.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Offer a regular diet within the first 24 hours after surgery",
      why: "Eating early is safe after gynaecological cancer surgery, including bowel surgery, and helps recovery.",
      source: "eras-gyn-2016-postop",
      quote: "A regular diet within the first 24 h after gynecologic/oncology surgery is recommended.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Use multimodal pain relief with regular paracetamol and an NSAID, oral opioids once eating, and IV patient-controlled analgesia only until the gut works",
      why: "Combining non-opioid painkillers reduces the opioid needed, and with it sickness and a slow bowel.",
      source: "eras-gyn-2016-postop",
      quote: "Acetaminophen and NSAIDs in combination should be administered regularly to all patients unless contraindication exists.",
      grade: "Evidence level: Use of multimodal analgesia: High. Combination of acetaminophen and NSAIDs: High. Recommendation grade: Strong.",
    },
    {
      action: "For open surgery, use spinal anaesthesia with intrathecal morphine or a thoracic epidural; without either, use a truncal block such as a TAP block",
      why: "These reduce pain and opioid use after an abdominal incision; an epidural can slow getting up and catheter removal.",
      source: "eras-gyn-2016-postop",
      quote: "Where patients have undergone general anesthesia without neuraxial blockade, a truncal block, such as TAP blocks, may reduce pain and opioid consumption for up to 24 h and should be employed.",
      grade: "Intrathecal morphine: Moderate. Thoracic epidural analgesia: High. TAP blocks: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Do not place a peritoneal drain routinely, even after lymph node removal or bowel surgery",
      why: "Drains did not prevent complications in the trials and can delay recovery.",
      source: "eras-gyn-2016-postop",
      quote: "Peritoneal drainage is not recommended routinely in gynecologic/oncology surgery including for patients undergoing lymphadenectomy or bowel surgery.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Remove the urinary catheter early, preferably within 24 hours",
      why: "A catheter left in raises the risk of urine infection and keeps people in bed.",
      source: "eras-gyn-2016-postop",
      quote: "Urinary catheters should be used for postoperative bladder drainage for a short period preferably <24 h postoperatively.",
      grade: "Evidence level: Low. Recommendation grade: Strong.",
    },
    {
      action: "Encourage getting up within 24 hours of surgery",
      why: "Moving early reduces clots, chest infection and muscle loss.",
      source: "eras-gyn-2016-postop",
      quote: "Patients should be encouraged to mobilize within 24 h of surgery.",
      grade: "Evidence level: Low. Recommendation grade: Strong.",
    },
    {
      action: "Consider laxatives and chewing gum after surgery to help the bowel recover",
      why: "Both may shorten the time until the bowel starts working again.",
      source: "eras-gyn-2016-postop",
      quote: "The use of postoperative laxatives and chewing gum should be considered.",
      grade: "Evidence level: Laxatives: Low. Chewing gum: Moderate. Recommendation grade: Weak.",
    },
    {
      action: "Keep blood glucose below about 180 to 200 mg/dL (10 to 11 mmol/l), treating higher levels with insulin and regular checks",
      why: "High blood sugar after surgery raises the risk of infection and other complications.",
      source: "eras-gyn-2016-postop",
      quote: "Perioperative maintenance of blood glucose levels (<180–200 mg/dL) results in improved perioperative outcomes. Glucose levels above this range should be treated with insulin infusions and regular blood glucose monitoring to avoid the risk of hypoglycemia.",
      grade: "Evidence level: Treating hyperglycemia above 180–200 mg/dL: High. Recommendation grade: Strong.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society 2026 update is the current specialty standard, but no recommendation in it could be read. The latest readable recommendations, the 2016 postoperative guideline, are graded and most are strong: extended 28-day clot prevention after laparotomy for cancer, early diet and early stopping of IV fluids rest on high-quality evidence; no routine drains on moderate. NICE NG180 covers the general enhanced recovery programme and the 2-hour clear-fluid fast. Where ERAS 2016 is weakest is analgesia for major oncological and laparoscopic surgery (low evidence, weak).",
    sources: ["eras-gyn-2026", "eras-gyn-2016-postop", "nice-ng180"],
  },
  variants: [
    {
      name: "Thoracic epidural for major gynaecological cancer surgery",
      differs: "Uses a thoracic epidural as the main analgesia after laparotomy for cancer.",
      evidence: "ERAS 2016 says it reduces pain but may not improve other outcomes, often needs IV opioids as well, and can worsen low blood pressure; IV patient-controlled analgesia is a suitable alternative (low evidence, weak).",
      sources: ["eras-gyn-2016-postop"],
    },
    {
      name: "Extended clot prevention after minimally invasive surgery",
      differs: "Gives 28 days of prophylaxis after laparoscopic surgery as well as open.",
      evidence: "ERAS 2016 says extended prophylaxis after minimally invasive surgery is likely not necessary without other high-risk features (raised BMI, previous VTE, coagulopathy, reduced mobility).",
      sources: ["eras-gyn-2016-postop"],
    },
  ],
  grades: [
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Spinal anaesthesia with intrathecal morphine for open surgery", grade: "Moderate Strong", source: "eras-gyn-2016-postop", quote: "Spinal anesthesia with intrathecal morphine is recommended" },
    { claim: "Thoracic epidural for major oncological surgery", grade: "Evidence level: Low. Recommendation grade: Weak.", source: "eras-gyn-2016-postop", quote: "TEA may be considered but patients frequently require additional IV opioids in addition to TEA to achieve adequate analgesia" },
    { claim: "Analgesia for laparoscopic surgery", grade: "Low Weak", source: "eras-gyn-2016-postop", quote: "Lack of evidence makes it difficult to recommend one analgesic intervention over another, however a multimodal approach should be employed" },
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "eras-gyn-2016-postop",
      label: "Guidelines for postoperative care in gynecologic/oncology surgery: Enhanced Recovery After Surgery (ERAS) Society recommendations, Part II",
      publisher: "ERAS Society (Gynecologic Oncology)",
      year: 2016,
      url: "https://doi.org/10.1016/j.ygyno.2015.12.019",
      doi: "10.1016/j.ygyno.2015.12.019",
      gradingScheme: "GRADE evidence level (high, moderate, low, very low) and recommendation grade (strong or weak), printed after each item and in its summary table.",
      read: "full-text",
      accessed: "2026-11-11",
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
  cancers: ["ovarian", "endometrial", "cervical", "vulvar"],
  drugs: ["morphine"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["hysterectomy", "debulking", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "routine-preoperative-tests", "enhanced-recovery-after-colorectal-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The current ERAS gynecologic oncology guideline (2026) and the 2019 and 2023 updates could be read only as abstracts, which state no recommendations. Every graded step here is from the 2016 postoperative guideline and may have been revised since; this page should be updated when the 2026 text can be read.",
    "The pre- and intra-operative items (counselling, prehabilitation, bowel preparation, carbohydrate loading, antibiotic and skin preparation, warming, nausea prophylaxis) are in the 2016 Part I and the later updates, none of which could be read. They are covered here only by NICE NG180 and by the surgical site infection and VTE protocols.",
    "The vulvar and vaginal surgery guideline (2020) could be read only as an abstract.",
    "The 2016 guideline gives glucose targets in mg/dL; the mmol/l figures in the step are a conversion, not the guideline's own.",
  ],
});
