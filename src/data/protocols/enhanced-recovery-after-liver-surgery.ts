import { protocol } from "./helpers";

/*
 * Enhanced recovery after liver surgery (hepatectomy), done for liver cancer, bile duct cancer and bowel cancer that
 * has spread to the liver, among other reasons.
 *
 * What was read, and how (first on 11 November 2026, fetched raw with curl and read as text):
 * - ERAS Society recommendations for liver surgery (Joliat et al., World J Surg 2023, online 30 October 2022): full
 *   text, Europe PMC XML (PMC9726826). 25 items, each with a summary, a GRADE evidence level and a grade of
 *   recommendation, quoted as printed.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text, for the general enhanced recovery,
 *   fasting and carbohydrate drink recommendations.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 *
 * Second accuracy pass, 17 November 2026: the ERAS full text was fetched again from Europe PMC (XML, tags stripped by
 * script) and every step, reason, figure and grade re-read against it; every quote was checked verbatim by script. The
 * NICE NG180 recommendations and update information pages were re-read from a copy another checker fetched from
 * nice.org.uk the same day, as was the ERAS Society's own guideline list (erassociety.org), which still lists the 2022
 * liver recommendations; a Europe PMC title search for 2023 to 2026 found no newer edition. Changed: reasons the
 * guideline does not give were reworded to what it says (counselling, antibiotics, nutrition, tubes and drains,
 * mobilisation, audit); the analgesia step no longer says a TAP block equals an epidural; the fluid and warming
 * recommendations, which carry different evidence levels, are now two steps; two NICE quotes and four grade strings
 * carried a stray space; the quote with a mangled subscript was replaced.
 */
export const enhancedRecoveryAfterLiverSurgery = protocol({
  id: "enhanced-recovery-after-liver-surgery",
  name: "Enhanced recovery after liver surgery (ERAS pathway for hepatectomy)",
  aka: ["ERAS liver", "ERAS hepatectomy", "enhanced recovery liver resection", "fast-track liver surgery", "perioperative care for liver resection"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover faster from liver surgery: information and stopping smoking and heavy drinking beforehand, a short fast with a sugary drink, keyhole surgery where suitable, pain relief that keeps you mobile, no routine tubes or drains, eating early, getting out of bed from the day of surgery, and blood clot prevention.",
  simple: "Before liver surgery you may be helped to eat well, to stop smoking and heavy drinking, and to get fitter if you are at higher risk. Guidelines say clear fluids are safe until two hours before the anaesthetic; follow the fasting times your own team gives you. After the operation you will be helped to eat, drink and get out of bed early.",
  summary: "The ERAS Society liver surgery recommendations (2022; 25 items, all with more than 80% agreement after three Delphi rounds) grade each element by GRADE. Strong recommendations with high-quality evidence: smoking cessation at least 4 weeks and alcohol cessation 4 to 8 weeks before surgery for heavy drinkers; nutritional assessment for all, with at least 7 to 14 days of enteral supplementation for the malnourished; multimodal analgesia for open surgery, with continuous wound infiltration (lower complication rates than thoracic epidural, equivalent analgesia) or a TAP block as a supplement; no routine nasogastric tube; no routine drain after hepatectomy without biliary reconstruction; early oral intake with a normal diet; insulin to keep glucose below 8.3 mmol/l; PONV prophylaxis with at least two drugs; and low central venous pressure (below 5 cmH2O) during transection with balanced crystalloid for maintenance. Strong with moderate evidence: fasting 2 hours for liquids and 6 hours for solids before anaesthesia, avoiding long-acting anxiolytics, postoperative LMWH or heparin plus intermittent pneumatic compression, chlorhexidine-alcohol skin preparation, laparoscopic resection in trained teams, normothermia, early mobilisation from the day of surgery, and audit of compliance. Weaker: prehabilitation for high-risk patients 4 to 6 weeks before (weak, moderate evidence; content not established), carbohydrate loading the evening before and 2 to 4 hours before induction (weak, low), preoperative methylprednisolone 500 mg (weak, moderate; no recommendation in diabetes), antibiotic within 60 minutes before incision (weak, moderate), and immunonutrition (not recommended yet; weak, low). NICE NG180 (2020) offers an enhanced recovery programme to everyone having elective major or complex surgery and allows clear fluids until 2 hours before.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "People having liver resection (hepatectomy), open or laparoscopic; the ERAS Society recommendations are not limited to cancer, and NICE NG180 covers adults having elective major or complex surgery. The ERAS authors say studies of hepatectomy in people with cirrhosis on an enhanced recovery programme are still needed. Liver transplantation has its own ERAS guideline (2022). Hepatectomy with biliary reconstruction is noted where the recommendations differ.",
  trigger: "A decision to operate on the liver.",
  steps: [
    {
      action: "Give information and counselling about the operation before surgery; brochures and multimedia may support the spoken advice",
      why: "No trial has tested this in liver surgery. In a trial in major abdominal surgery a seminar with a brochure did not change complications, but it helped to train patients and nurses, so the grade is weak.",
      source: "eras-liver-2022",
      quote: "Patients should receive preoperative information and counseling regarding the upcoming liver surgery. Brochures and multimedia supports might help to improve the verbal counseling.",
      grade: "Evidence level: Low. Grade of recommendation: Weak.",
    },
    {
      action: "Counsel people to stop smoking at least 4 weeks before surgery, and heavy drinkers (more than 24 g of alcohol a day for women, 36 g for men) to stop 4 to 8 weeks before",
      why: "Smoking and alcohol are both risk factors for complications after surgery. Stopping smoking at least 4 weeks ahead reduced chest and wound complications; stopping later did not.",
      source: "eras-liver-2022",
      quote: "Preoperative smoking cessation should be counseled at least 4 weeks prior to hepatectomy. Alcohol cessation is recommended for heavy drinkers (>24 g/day for women or >36 g/day for men) 4–8 weeks before surgery.",
      grade: "Evidence level: Smoking: high, alcohol: high. Grade of recommendation: Smoking: strong, alcohol: strong.",
    },
    {
      action: "Assess nutrition before every liver operation and give enteral supplements for at least 7 to 14 days before surgery to anyone malnourished",
      why: "Poor nutrition around surgery has been linked to worse outcomes, including serious infections, so the guideline asks for it to be found and treated first.",
      source: "eras-liver-2022",
      quote: "A nutritional assessment is necessary prior to all hepatic surgery. Malnourished patients (i.e., weight loss >10% or >5% over 3 months and reduced body mass index or a low fat-free mass index) should be optimized with enteral supplementation at least 7–14 days prior to surgery.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Offer prehabilitation (exercise, diet, anxiety reduction) to high-risk patients, starting 4 to 6 weeks before surgery where the timing allows",
      why: "Getting fitter before surgery may help frail, older or malnourished people recover, though the best programme is not yet known.",
      source: "eras-liver-2022",
      quote: "Prehabilitation should be performed in high-risk patients (elderly, malnourished or overweight patients, smokers, or patients with psychological disorder) prior to liver surgery.",
      grade: "Evidence level: Moderate. Grade of recommendation: Weak.",
    },
    {
      action: "Allow clear fluids until 2 hours and food until 6 hours before anaesthesia, and offer a carbohydrate drink the evening before and 2 to 4 hours before (a weak recommendation)",
      why: "The drinks are meant to keep people hydrated and reduce insulin resistance, and are safe; whether they shorten the hospital stay after liver surgery is not clear. The guideline names type 1 diabetes and active reflux as relative reasons not to give one in the 2 to 4 hours before surgery.",
      source: "eras-liver-2022",
      quote: "Preoperative fasting of 2 h for liquids and 6 h for solids before anesthesia is safe and can be recommended.",
      grade: "Evidence level: Preoperative fasting: moderate, carbohydrate loading: low. Grade of recommendation: Preoperative fasting: strong, carbohydrate loading: weak.",
    },
    {
      action: "Avoid long-acting sedatives before surgery, especially in older people",
      why: "Long-acting sedatives slow recovery after the anaesthetic, including getting up, eating and drinking.",
      source: "eras-liver-2022",
      quote: "Long-acting anxiolytic drugs should be avoided, particularly in the elderly.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Give antibiotic prophylaxis within 60 minutes before incision, without routinely extending it after the operation, and prepare the skin with chlorhexidine in alcohol",
      why: "Extending antibiotics after the operation showed no benefit, and chlorhexidine in alcohol was linked to fewer wound infections than povidone-iodine. The guideline says hard data on antibiotics in liver surgery are lacking, so that part is graded weak. Complex surgery with biliary reconstruction may need a regimen targeted by bile culture.",
      source: "eras-liver-2022",
      quote: "Antibiotic prophylaxis (such as cefazolin) within 60 min before surgical incision is recommended, with no benefit extending it into the postoperative period.",
      grade: "Evidence level: Antibiotics: moderate, skin preparation: moderate. Grade of recommendation: Antibiotics: weak, skin preparation: strong.",
    },
    {
      action: "Use a laparoscopic (keyhole) approach where the team is trained and it is clinically appropriate",
      why: "Keyhole liver surgery shortens the hospital stay and reduces complications.",
      source: "eras-liver-2022",
      quote: "In trained teams and when clinically appropriate, laparoscopic liver resection is recommended since it reduces postoperative length of stay and complication rates.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Keep central venous pressure low (below 5 cmH2O) with close monitoring during liver transection, and prefer balanced crystalloid for maintenance fluid",
      why: "A lower central venous pressure reduced blood loss in pooled trials, though not the need for transfusion.",
      source: "eras-liver-2022",
      quote: "As maintenance fluid balanced crystalloid should be preferred over 0.9% saline or colloids.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Keep the patient at normal body temperature throughout open and keyhole liver surgery",
      why: "Mild cooling during surgery has been linked to more wound infection and blood loss, though there are few studies in liver surgery itself.",
      source: "eras-liver-2022",
      quote: "Perioperative normothermia using multimodal temperature management (including circulating water garments or forced warm air) should be maintained during open and minimally invasive liver surgery.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Use multimodal analgesia; for open surgery, continuous wound infiltration of local anaesthetic is an alternative to a thoracic epidural, and a TAP block can be added to standard analgesia",
      why: "Wound infiltration gave pain relief equivalent overall to an epidural with fewer complications; a TAP block improved pain control and reduced opiate use. An epidural can cause low blood pressure and limit mobility.",
      source: "eras-liver-2022",
      quote: "Continuous local anesthetic wound infiltration provides lower complication rates and overall equivalent analgesia to thoracic epidural analgesia.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Do not place a routine nasogastric tube, or a routine abdominal drain after hepatectomy without biliary reconstruction",
      why: "A routine nasogastric tube offers no benefit and may lengthen the hospital stay, and routine drains did not reduce complications. The guideline makes no recommendation on drains after hepatectomy with biliary reconstruction.",
      source: "eras-liver-2022",
      quote: "The routine use of abdominal drain placement is not indicated for hepatectomy without biliary reconstruction.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Give at least two anti-sickness drugs as prophylaxis",
      why: "Nausea and vomiting are frequent after major surgery (25 to 30% in the guideline), and preventing them helps people eat early.",
      source: "eras-liver-2022",
      quote: "Patients should receive postoperative nausea and vomiting prophylaxis with at least 2 antiemetic drugs such as dexamethasone and ondansetron.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Start LMWH or heparin after the operation unless unsafe, with intermittent pneumatic compression",
      why: "Liver surgery is an independent risk factor for blood clots, and the larger the resection the higher the risk. In pooled studies the drugs reduced clots without an apparent rise in bleeding.",
      source: "eras-liver-2022",
      quote: "Low molecular weight heparin or unfragmented heparin reduces the risk of thromboembolic events and should be routinely started postoperatively unless exceptional circumstances make this unsafe.",
      grade: "Evidence level: Use of low molecular weight heparin or unfragmented heparin: moderate, use of intermittent pneumatic compression devices: moderate. Grade of recommendation: Use of low molecular weight heparin or unfragmented heparin: strong, use of intermittent pneumatic compression devices: strong.",
    },
    {
      action: "Restart eating and drinking a normal diet early, and keep blood glucose below 8.3 mmol/l with insulin if needed",
      why: "Early eating has been shown to be safe and to bring bowel function back sooner. High blood sugar in the first days after colorectal and pancreatic surgery has been related to complications.",
      source: "eras-liver-2022",
      quote: "Early oral intake with normal diet should be implemented after hepatectomy.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Get the patient out of bed from the day of surgery until discharge",
      why: "Bed rest is associated with muscle loss, blood clots and insulin resistance. The guideline makes no recommendation on how long to mobilise each day.",
      source: "eras-liver-2022",
      quote: "Early mobilization (out of bed) after liver surgery should be established from the operative day until hospital discharge.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Audit outcomes and compliance with each element and feed the results back to the team",
      why: "Audit and feedback generally improve outcomes in health care and surgery, although the guideline found only one national audit and no dedicated study in liver surgery.",
      source: "eras-liver-2022",
      quote: "Regular audit and feedback should be implemented and performed in liver surgery to monitor and improve postoperative outcomes and compliance to the ERAS program.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society liver surgery recommendations (2022) are the current specialty standard and are graded element by element (listed in the summary); NICE NG180 (2020) supports an enhanced recovery programme for all elective major surgery and the 2-hour clear-fluid fast. The two agree on fasting; ERAS recommends carbohydrate loading (weak, low evidence) where NICE says consider carbohydrate drinks for abdominal major surgery. On analgesia ERAS says thoracic epidural gives excellent analgesia but has significant disadvantages, and that continuous wound infiltration gives lower complication rates and overall equivalent analgesia (high, strong); a TAP block is recommended as a supplement to standard analgesia.",
    sources: ["eras-liver-2022", "nice-ng180"],
  },
  variants: [
    {
      name: "Thoracic epidural for open liver surgery",
      differs: "Uses a thoracic epidural as the main analgesia after open hepatectomy.",
      evidence: "ERAS 2022 says it 'can provide excellent analgesia but has significant disadvantages' (low blood pressure, delayed mobility) and recommends multimodal analgesia (strong, high evidence for open surgery), with continuous wound infiltration giving lower complication rates and overall equivalent analgesia.",
      sources: ["eras-liver-2022"],
    },
    {
      name: "Preoperative methylprednisolone",
      differs: "Gives methylprednisolone at a dose of 500 mg before liver resection.",
      evidence: "Recommended by ERAS 2022 with moderate evidence but a weak grade; the guideline says no recommendation can be formulated for people with diabetes.",
      sources: ["eras-liver-2022"],
    },
    {
      name: "Immunonutrition",
      differs: "Gives oral immune-enhancing formulas (arginine, omega-3 fatty acids, nucleotides) around surgery.",
      evidence: "Not recommended for liver surgery by ERAS 2022 because of a lack of evidence (low evidence, weak).",
      sources: ["eras-liver-2022"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Carbohydrate drinks for abdominal major or complex surgery", grade: "Not graded (NICE NG180 1.4.2, 'consider')", source: "nice-ng180", quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery." },
    { claim: "Immunonutrition not recommended in hepatic surgery", grade: "Evidence level: Low. Grade of recommendation: Weak.", source: "eras-liver-2022", quote: "Due to the lack of evidence, the use of immunonutrition in hepatic surgery is not recommended yet." },
    { claim: "Multimodal analgesia: open surgery and laparoscopy graded separately", grade: "Evidence level: Open (multimodal analgesia): high, laparoscopy (multimodal analgesia): low. Grade of recommendation: Open (multimodal analgesia): strong, laparoscopy (multimodal analgesia): weak.", source: "eras-liver-2022", quote: "For open liver surgery, thoracic epidural analgesia can provide excellent analgesia but has significant disadvantages." },
    { claim: "Methylprednisolone 500 mg before liver resection", grade: "Evidence level: Moderate. Grade of recommendation: Weak.", source: "eras-liver-2022", quote: "Steroid administration (methylprednisolone at a dose of 500 mg) is recommended. No recommendation can be formulated on diabetic patients undergoing liver surgery." },
    { claim: "No routine prophylactic nasogastric tube", grade: "Evidence level: High. Grade of recommendation: Strong.", source: "eras-liver-2022", quote: "Routine use of prophylactic nasogastric intubation is not recommended." },
    { claim: "Insulin to keep glucose below 8.3 mmol/l", grade: "Evidence level: High. Grade of recommendation: Strong.", source: "eras-liver-2022", quote: "Insulin therapy for maintenance of normoglycemia (<8.3 mmol/l) is recommended." },
    { claim: "Recommendations reached consensus", grade: "All 25 items above 80% agreement after 3 Delphi rounds", source: "eras-liver-2022", quote: "All of them obtained consensus (>80% agreement) after 3 Delphi rounds." },
  ],
  sources: [
    {
      key: "eras-liver-2022",
      label: "Guidelines for Perioperative Care for Liver Surgery: Enhanced Recovery After Surgery (ERAS) Society Recommendations 2022",
      publisher: "ERAS Society (World Journal of Surgery)",
      year: 2022,
      url: "https://doi.org/10.1007/s00268-022-06732-5",
      doi: "10.1007/s00268-022-06732-5",
      gradingScheme: "GRADE evidence level (low, moderate, high) and grade of recommendation (weak or strong), printed after each item; consensus was more than 80% agreement among 15 experts in a modified Delphi process.",
      read: "full-text",
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
  cancers: ["hcc", "cholangiocarcinoma", "intrahepatic-cholangiocarcinoma"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["hepatectomy", "liver-limited-metastatic-colorectal", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The recommendations rest on studies published up to 31 May 2020. On 17 November 2026 the ERAS Society's guideline list still showed the 2022 liver recommendations and a Europe PMC search found no newer edition. NICE NG180 has had only minor changes since 2020 (October 2021 and July 2025), neither to the recommendations used here.",
    "The content and length of prehabilitation before liver surgery are not established (ERAS 2022).",
    "Whether carbohydrate loading shortens hospital stay after liver surgery is not clear (ERAS 2022).",
    "The ERAS recommendation on blood clot prevention does not say how long to continue it after liver surgery; its text cites a review favouring at least 14 days of LMWH after abdominal and pelvic surgery in general.",
    "The ERAS recommendation does not give a volume or strength for the carbohydrate drink.",
    "The guideline also recommends biliary drainage before surgery for a cholestatic liver (moderate, strong); its bilirubin threshold is not reproduced here because the units the guideline prints for it are inconsistent.",
    "Antiemetic doses are in a table in the guideline and analgesic doses are left to local protocols; neither is reproduced here.",
  ],
});
