import { protocol } from "./helpers";

/*
 * Enhanced recovery after liver surgery (hepatectomy), most often done for liver cancer, bile duct cancer and bowel cancer
 * that has spread to the liver.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society recommendations for liver surgery (Joliat et al., World J Surg 2023, online 2022): full text, Europe
 *   PMC XML (PMC9726826). 25 items, each with a summary, a GRADE evidence level and a grade of recommendation, quoted
 *   as printed. This is the current edition on the ERAS Society's guideline list (archived 17 October 2026).
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text, for the general enhanced recovery,
 *   fasting and carbohydrate drink recommendations.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterLiverSurgery = protocol({
  id: "enhanced-recovery-after-liver-surgery",
  name: "Enhanced recovery after liver surgery (ERAS pathway for hepatectomy)",
  aka: ["ERAS liver", "ERAS hepatectomy", "enhanced recovery liver resection", "fast-track liver surgery", "perioperative care for liver resection"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover faster from liver surgery: preparation and stopping smoking and heavy drinking beforehand, a short fast with a sugary drink, keyhole surgery where possible, good pain relief that keeps you mobile, no routine tubes or drains, eating and getting out of bed on the day of surgery, and blood clot prevention.",
  simple: "Before liver surgery you will be helped to get fit, eat well and stop smoking or drinking. You can drink clear fluids until two hours before. After the operation you will be helped to eat, drink and get out of bed early, which speeds recovery.",
  summary: "The ERAS Society liver surgery recommendations (2022; 25 items, all with more than 80% agreement after three Delphi rounds) grade each element by GRADE. Strong recommendations with high-quality evidence: smoking cessation at least 4 weeks and alcohol cessation 4 to 8 weeks before surgery for heavy drinkers; nutritional assessment for all, with 7 to 14 days of enteral supplementation for the malnourished; continuous wound infiltration or TAP block as part of analgesia; no routine nasogastric tube; no routine drain after hepatectomy without biliary reconstruction; early oral intake with a normal diet; insulin to keep glucose below 8.3 mmol/l; PONV prophylaxis with at least two drugs; and low central venous pressure during transection with balanced crystalloid. Strong with moderate evidence: fasting 2 hours for clear fluids and 6 hours for solids, postoperative LMWH or heparin plus intermittent pneumatic compression, chlorhexidine-alcohol skin preparation, laparoscopic resection in trained teams, normothermia, early mobilisation from the day of surgery, and audit of compliance. Weaker: prehabilitation for high-risk patients 4 to 6 weeks before (weak, moderate evidence; content not established), carbohydrate loading (weak, low), preoperative methylprednisolone 500 mg (weak, moderate), antibiotic within 60 minutes before incision (weak, moderate), and immunonutrition (not recommended). NICE NG180 (2020) offers an enhanced recovery programme to everyone having elective major or complex surgery and allows clear fluids until 2 hours before.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "Adults having elective liver resection, open or laparoscopic, for any reason (most often hepatocellular carcinoma, cholangiocarcinoma or colorectal liver metastases). Liver transplantation has its own ERAS guideline (2022). Hepatectomy with biliary reconstruction is noted where the recommendations differ.",
  trigger: "A decision to operate on the liver.",
  steps: [
    {
      action: "Give information and counselling about the operation before surgery, in writing or multimedia as well as spoken",
      why: "People who know what to expect take part in their own recovery, for example by eating and walking early.",
      source: "eras-liver-2022",
      quote: "Patients should receive preoperative information and counseling regarding the upcoming liver surgery. Brochures and multimedia supports might help to improve the verbal counseling.",
      grade: "Evidence level: Low. Grade of recommendation: Weak.",
    },
    {
      action: "Help people stop smoking at least 4 weeks before surgery, and heavy drinkers stop alcohol 4 to 8 weeks before",
      why: "Smoking and heavy drinking both raise the risk of complications, and stopping a few weeks ahead lowers it.",
      source: "eras-liver-2022",
      quote: "Preoperative smoking cessation should be counseled at least 4 weeks prior to hepatectomy. Alcohol cessation is recommended for heavy drinkers (>24 g/day for women or >36 g/day for men) 4–8 weeks before surgery.",
      grade: "Evidence level: Smoking: high, alcohol: high. Grade of recommendation: Smoking: strong, alcohol: strong.",
    },
    {
      action: "Assess nutrition before every liver operation and give 7 to 14 days of nutritional supplements to anyone malnourished",
      why: "Poorly nourished people have more complications, and a short period of feeding beforehand reduces them.",
      source: "eras-liver-2022",
      quote: "A nutritional assessment is necessary prior to all hepatic surgery. Malnourished patients (i.e., weight loss >10% or >5% over 3 months and reduced body mass index or a low fat-free mass index) should be optimized with enteral supplementation at least 7–14 days prior to surgery.",
      grade: "Evidence level : High. Grade of recommendation : Strong.",
    },
    {
      action: "Offer prehabilitation (exercise, diet, anxiety reduction) to high-risk patients, starting 4 to 6 weeks before surgery where the timing allows",
      why: "Getting fitter before surgery may help frail, older or malnourished people recover, though the best programme is not yet known.",
      source: "eras-liver-2022",
      quote: "Prehabilitation should be performed in high-risk patients (elderly, malnourished or overweight patients, smokers, or patients with psychological disorder) prior to liver surgery.",
      grade: "Evidence level: Moderate. Grade of recommendation: Weak.",
    },
    {
      action: "Allow clear fluids until 2 hours and food until 6 hours before anaesthesia, and consider a carbohydrate drink the evening before and 2 to 4 hours before",
      why: "Long fasting leaves people thirsty, dehydrated and more resistant to insulin; a sugary drink shortly before is safe.",
      source: "eras-liver-2022",
      quote: "Preoperative fasting of 2 h for liquids and 6 h for solids before anesthesia is safe and can be recommended.",
      grade: "Evidence level: Preoperative fasting: moderate, carbohydrate loading: low. Grade of recommendation: Preoperative fasting: strong, carbohydrate loading: weak.",
    },
    {
      action: "Avoid long-acting sedatives before surgery, especially in older people",
      why: "Long-acting sedatives slow waking and getting up after the operation.",
      source: "eras-liver-2022",
      quote: "Long-acting anxiolytic drugs should be avoided, particularly in the elderly.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Give antibiotic prophylaxis within 60 minutes before incision without continuing it afterwards, and prepare the skin with chlorhexidine in alcohol",
      why: "One well-timed dose and the right skin antiseptic reduce wound infection; longer courses add no benefit.",
      source: "eras-liver-2022",
      quote: "Antibiotic prophylaxis (such as cefazolin) within 60 min before surgical incision is recommended, with no benefit extending it into the postoperative period.",
      grade: "Evidence level: Antibiotics: moderate, skin preparation: moderate. Grade of recommendation: Antibiotics: weak, skin preparation: strong.",
    },
    {
      action: "Use a laparoscopic (keyhole) approach where the team is trained and it is clinically appropriate",
      why: "Keyhole liver surgery shortens the hospital stay and reduces complications.",
      source: "eras-liver-2022",
      quote: "In trained teams and when clinically appropriate, laparoscopic liver resection is recommended since it reduces postoperative length of stay and complication rates.",
      grade: "Evidence level : Moderate. Grade of recommendation : Strong.",
    },
    {
      action: "Keep central venous pressure low during liver transection, use balanced crystalloid for maintenance, and keep the patient warm",
      why: "Low venous pressure reduces bleeding from the cut liver; warmth reduces infection and bleeding.",
      source: "eras-liver-2022",
      quote: "Perioperative normothermia using multimodal temperature management (including circulating water garments or forced warm air) should be maintained during open and minimally invasive liver surgery.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Use multimodal analgesia, with wound catheter infiltration or a TAP block for open surgery, rather than relying on a thoracic epidural",
      why: "These give pain relief as good as an epidural with fewer problems with low blood pressure and getting up.",
      source: "eras-liver-2022",
      quote: "Continuous local anesthetic wound infiltration provides lower complication rates and overall equivalent analgesia to thoracic epidural analgesia.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Do not place a routine nasogastric tube, or a routine abdominal drain after hepatectomy without biliary reconstruction",
      why: "Tubes and drains add discomfort and delay recovery without preventing complications.",
      source: "eras-liver-2022",
      quote: "The routine use of abdominal drain placement is not indicated for hepatectomy without biliary reconstruction.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Give at least two anti-sickness drugs as prophylaxis",
      why: "Nausea after surgery is common and delays eating and walking.",
      source: "eras-liver-2022",
      quote: "Patients should receive postoperative nausea and vomiting prophylaxis with at least 2 antiemetic drugs such as dexamethasone and ondansetron.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Start LMWH or heparin after the operation unless unsafe, with intermittent pneumatic compression",
      why: "Liver surgery carries a real clot risk, and prevention is safe for most people.",
      source: "eras-liver-2022",
      quote: "Low molecular weight heparin or unfragmented heparin reduces the risk of thromboembolic events and should be routinely started postoperatively unless exceptional circumstances make this unsafe.",
      grade: "Evidence level: Use of low molecular weight heparin or unfragmented heparin: moderate, use of intermittent pneumatic compression devices: moderate. Grade of recommendation: Use of low molecular weight heparin or unfragmented heparin: strong, use of intermittent pneumatic compression devices: strong.",
    },
    {
      action: "Restart eating and drinking a normal diet early, and keep blood glucose below 8.3 mmol/l with insulin if needed",
      why: "Early eating supports healing and recovery; high blood sugar raises the risk of complications.",
      source: "eras-liver-2022",
      quote: "Early oral intake with normal diet should be implemented after hepatectomy.",
      grade: "Evidence level: High. Grade of recommendation: Strong.",
    },
    {
      action: "Get the patient out of bed on the day of surgery and every day until discharge",
      why: "Moving early reduces chest infections, clots and muscle loss.",
      source: "eras-liver-2022",
      quote: "Early mobilization (out of bed) after liver surgery should be established from the operative day until hospital discharge.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
    {
      action: "Audit outcomes and compliance with each element and feed the results back to the team",
      why: "Units that measure how often each element is delivered improve their results.",
      source: "eras-liver-2022",
      quote: "Regular audit and feedback should be implemented and performed in liver surgery to monitor and improve postoperative outcomes and compliance to the ERAS program.",
      grade: "Evidence level: Moderate. Grade of recommendation: Strong.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society liver surgery recommendations (2022) are the current specialty standard and are graded element by element (listed in the summary); NICE NG180 (2020) supports an enhanced recovery programme for all elective major surgery and the 2-hour clear-fluid fast. The two agree on fasting; ERAS recommends carbohydrate loading (weak, low evidence) where NICE says consider carbohydrate drinks for abdominal major surgery. Thoracic epidural is not preferred: wound infiltration and TAP block give equivalent analgesia with fewer complications (high, strong).",
    sources: ["eras-liver-2022", "nice-ng180"],
  },
  variants: [
    {
      name: "Thoracic epidural for open liver surgery",
      differs: "Uses a thoracic epidural as the main analgesia after open hepatectomy.",
      evidence: "ERAS 2022 says it 'can provide excellent analgesia but has significant disadvantages' (low blood pressure, delayed mobility) and recommends multimodal analgesia (strong, high evidence for open surgery), with wound infiltration giving lower complication rates and equivalent analgesia.",
      sources: ["eras-liver-2022"],
    },
    {
      name: "Preoperative methylprednisolone",
      differs: "Gives a single 500 mg dose of methylprednisolone before liver resection.",
      evidence: "Recommended by ERAS 2022 with moderate evidence but a weak grade; no recommendation for people with diabetes.",
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
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Carbohydrate drinks for abdominal major or complex surgery", grade: "Not graded (NICE NG180 1.4.2, 'consider')", source: "nice-ng180", quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery ." },
    { claim: "Immunonutrition not recommended in hepatic surgery", grade: "Evidence level : Low. Grade of recommendation : Weak.", source: "eras-liver-2022", quote: "Due to the lack of evidence, the use of immunonutrition in hepatic surgery is not recommended yet." },
    { claim: "Low central venous pressure during transection, balanced crystalloid maintenance", grade: "Evidence level: High. Grade of recommendation: Strong.", source: "eras-liver-2022", quote: "Low central venous pressure (below 5 cm H 2 O) with close monitoring is recommended during hepatic transection." },
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
      gradingScheme: "GRADE evidence level (low, moderate, high) and grade of recommendation (weak or strong), printed after each item.",
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
  cancers: ["hcc", "cholangiocarcinoma", "intrahepatic-cholangiocarcinoma"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation"],
  terms: ["hepatectomy", "liver-limited-metastatic-colorectal", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The recommendations rest on evidence published up to mid-2020; no newer ERAS liver guideline was found on the ERAS Society's list archived in October 2026.",
    "The content and length of prehabilitation before liver surgery are not established (ERAS 2022).",
    "Whether carbohydrate loading shortens hospital stay after liver surgery is not clear (ERAS 2022).",
    "Drug doses for analgesia and antiemetics, and the details of low central venous pressure anaesthesia, are in the full guideline's tables and local protocols and are not reproduced here.",
  ],
});
