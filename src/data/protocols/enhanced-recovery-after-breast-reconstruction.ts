import { protocol } from "./helpers";

/*
 * Enhanced recovery after breast reconstruction (implant or own-tissue flap, at mastectomy or later).
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society consensus review for breast reconstruction (Temple-Oberle et al., Plast Reconstr Surg 2017): full
 *   text, the author manuscript in PubMed Central (PMC9074892) fetched as XML through NCBI E-utilities. 18 items, each
 *   with a summary and recommendation, an evidence level and a recommendation grade, quoted as printed. A Europe PMC
 *   search for a newer ERAS breast reconstruction guideline (2018 to 2026) found none; the ERAS Society's own site
 *   refused a script.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * The DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterBreastReconstruction = protocol({
  id: "enhanced-recovery-after-breast-reconstruction",
  name: "Enhanced recovery after breast reconstruction (ERAS pathway for implant and flap reconstruction)",
  aka: ["ERAS breast reconstruction", "enhanced recovery DIEP flap", "fast-track breast reconstruction", "perioperative care for breast reconstruction"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery for breast reconstruction means good information beforehand, stopping smoking for a month, a short fast with a sugary drink two hours before, anti-sickness and pain medicines that spare opioids, keeping warm, eating within a day and getting up within a day, with close checks on a flap in the first three days.",
  simple: "Before breast reconstruction you will be helped to stop smoking and to understand the operation. You can drink clear fluids until two hours before. Afterwards you will be helped to eat and get out of bed within a day, and nurses will check a flap often for the first three days.",
  summary: "The ERAS Society consensus review (2017; 18 items, GRADE) is the only specialty guideline found for breast reconstruction. Every recommendation is graded strong; evidence is high for opioid-sparing multimodal postoperative analgesia and conventional sutures, and moderate or low (often extrapolated from other surgery) for the rest: detailed counselling; one month without smoking or heavy alcohol and weight reduction to a BMI of 30 or less (high evidence for obesity); CT angiography if perforators need mapping; clear fluids to 2 hours and a maltodextrin drink 2 hours before (low evidence); VTE risk assessment and LMWH or heparin with mechanical methods for those at higher risk; chlorhexidine and IV antibiotics within 1 hour of incision; multimodal antiemetics; total intravenous anaesthesia; active warming above 36°C; avoiding over- and under-filling with balanced crystalloid, goal-directed therapy and vasopressors where needed; food within 24 hours; mobilisation within 24 hours; frequent flap monitoring in the first 72 hours; and physiotherapy and support after discharge. NICE NG180 offers an enhanced recovery programme for elective major surgery.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having breast reconstruction, with implants or with their own tissue (most often a DIEP flap), immediate or delayed. Many of the recommendations are extrapolated from other kinds of surgery, as the guideline says item by item.",
  trigger: "A decision to have breast reconstruction.",
  steps: [
    {
      action: "Give detailed counselling about the reconstruction and the recovery before surgery",
      why: "Women who understand the choices and what to expect have less regret and recover better.",
      source: "eras-breast-recon-2017",
      quote: "Patients should receive detailed preoperative counseling.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong (low harm).",
    },
    {
      action: "Support one month without smoking or heavy drinking, and weight reduction to a BMI of 30 or less where that applies, before surgery",
      why: "Smoking, obesity and heavy drinking each raise the risk of flap loss, wound breakdown and infection.",
      source: "eras-breast-recon-2017",
      quote: "For daily smokers, 1 month of abstinence before surgery is beneficial. For patients who are obese, weight reduction to achieve a body mass index less than or equal to 30 kg/m 2 before surgery is beneficial. For alcohol abusers, 1 month of abstinence before surgery is beneficial.",
      grade: "Evidence level: Moderate for smoking; high for obesity; low for alcohol. Recommendation grade: Strong for all (high benefit, low harm).",
    },
    {
      action: "If the blood vessels of a flap need mapping, use CT angiography",
      why: "Mapping the main vessel before a DIEP flap shortens the operation and reduces flap and donor-site problems.",
      source: "eras-breast-recon-2017",
      quote: "If preoperative perforator mapping is required, computed tomographic angiography is recommended.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Keep the fast short: clear fluids until 2 hours before surgery, with a maltodextrin carbohydrate drink 2 hours before",
      why: "Clear drinks up to 2 hours before are safe, and a sugary drink reduces thirst, anxiety and the body's stress response.",
      source: "eras-breast-recon-2017",
      quote: "Preoperative fasting should be minimized and patients should be allowed to drink clear fluids up to 2 hours before surgery.",
      grade: "Fasting: Evidence level Moderate (based on extrapolated data), Recommendation grade Strong. Carbohydrate drink: Evidence level Low (based on extrapolated data), Recommendation grade Strong (low risk of harm) in the general patient population.",
    },
    {
      action: "Assess clot risk, and give LMWH or unfractionated heparin with mechanical methods to those at higher risk until they are walking or discharged",
      why: "Clots are more common after mastectomy with reconstruction than after mastectomy or lumpectomy alone.",
      source: "eras-breast-recon-2017",
      quote: "Patients should be assessed for venous thromboembolism risk. Unless contraindicated, and balanced by the risk of bleeding, patients at a higher risk should receive low-molecular-weight heparin or unfractionated heparin until they are ambulatory or discharged. Mechanical methods should be added.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Prepare the skin with chlorhexidine and give IV antibiotics covering skin organisms within 1 hour of incision",
      why: "Infection is more common after mastectomy with an implant or flap than after other clean surgery.",
      source: "eras-breast-recon-2017",
      quote: "Chlorhexidine skin preparation and intravenous antibiotics covering common skin organisms should be given within 1 hour of incision.",
      grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong.",
    },
    {
      action: "Give multimodal anti-sickness medicines before and during surgery, and use total intravenous anaesthesia",
      why: "Combinations prevent more sickness than one drug, and intravenous anaesthesia causes less sickness than anaesthetic gases.",
      source: "eras-breast-recon-2017",
      quote: "Women should receive preoperative and intraoperative multimodal medications to mitigate postoperative nausea and vomiting.",
      grade: "Antiemetics: Evidence level Moderate, Recommendation grade Strong (high benefit, low harm). Total intravenous anaesthesia: Evidence level Moderate, Recommendation grade Strong.",
    },
    {
      action: "Warm the patient before and during surgery (forced air) and monitor temperature to keep it above 36°C",
      why: "Getting cold slows wound healing and triples the risk of wound infection.",
      source: "eras-breast-recon-2017",
      quote: "Temperature monitoring is required to ensure the patient’s body temperature is maintained above 36°C.",
      grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong.",
    },
    {
      action: "Avoid giving too much or too little fluid; use balanced crystalloid, goal-directed therapy, and vasopressors where needed",
      why: "Too much fluid harms a flap and the wound; too little risks a clot in the flap's vessels. Vasopressors do not harm free flaps.",
      source: "eras-breast-recon-2017",
      quote: "Overresuscitation or underresuscitation of fluids should be avoided, and water and electrolyte balance should be maintained. Goal-directed therapy is a useful method to achieve these goals. Balanced crystalloid solutions rather than saline is recommended. Vasopressors are recommended to support fluid management and do not negatively affect free flaps.",
      grade: "Evidence level: Moderate for all (based on extrapolated data). Recommendation grade: Strong.",
    },
    {
      action: "Use opioid-sparing multimodal pain relief after surgery (paracetamol with an NSAID, local anaesthetic blocks or infusions)",
      why: "Fewer opioids means less sickness and constipation and earlier walking.",
      source: "eras-breast-recon-2017",
      quote: "Multimodal postoperative pain management regimens are opioid-sparing and should be used.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Encourage drinking and eating as soon as possible, preferably within 24 hours, and getting up within the first 24 hours",
      why: "Early food helps wounds heal and early movement prevents clots, chest infection and muscle loss.",
      source: "eras-breast-recon-2017",
      quote: "Patients should be encouraged to take fluids and food orally as soon as possible, preferably within 24 hours after surgery.",
      grade: "Early feeding: Evidence level Moderate (based on extrapolated data), Recommendation grade Strong. Mobilisation: Evidence level Moderate (based on extrapolated data), Recommendation grade Strong (low risk).",
    },
    {
      action: "Monitor a free flap frequently for the first 72 hours by clinical observation, with an implantable Doppler for a buried flap",
      why: "A clot in a flap's vessels happens in 2 to 5 in 100 flaps, mostly in the first three days, and early return to theatre saves the flap.",
      source: "eras-breast-recon-2017",
      quote: "Flap monitoring within the first 72 hours should occur frequently. Clinical evaluation is sufficient for monitoring, with implantable Doppler monitoring recommended in cases of buried flaps.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong (low harm).",
    },
    {
      action: "Arrange early physiotherapy, supervised exercise and support after discharge",
      why: "Early rehabilitation improves movement, pain and quality of life after breast surgery.",
      source: "eras-breast-recon-2017",
      quote: "Early physiotherapy, supervised exercise programs, and other supportive care initiatives should be instituted after discharge.",
      grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong (low harm).",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society consensus review (2017) is the only graded specialty guideline for breast reconstruction found, and all 18 of its recommendations are strong; only opioid-sparing analgesia and conventional sutures rest on high-quality evidence, and many items are extrapolated from other operations. NICE NG180 supports an enhanced recovery programme for elective major surgery and the same 2-hour clear-fluid fast.",
    sources: ["eras-breast-recon-2017", "nice-ng180"],
  },
  variants: [
    {
      name: "Antibiotics continued until drains come out",
      differs: "Continues antibiotics after surgery until the drains are removed.",
      evidence: "The ERAS review calls this common practice and cites a systematic review of observational studies in which more than 24 hours of antibiotics was associated with higher infection rates in reconstructions using acellular dermal matrix; it recommends antibiotics within 1 hour of incision and does not recommend continuing them.",
      sources: ["eras-breast-recon-2017"],
    },
    {
      name: "Regional anaesthesia instead of general anaesthesia",
      differs: "Uses regional anaesthesia as the main anaesthetic.",
      evidence: "The ERAS review reports that regional anaesthesia reduces opioid use but not pain, sickness, time to walking or hospital stay, and recommends general anaesthesia with total intravenous anaesthesia (moderate evidence, strong).",
      sources: ["eras-breast-recon-2017"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
    { claim: "Maltodextrin drink 2 hours before surgery", grade: "Evidence level: Low (based on extrapolated data). Recommendation grade: Strong (low risk of harm) in the general patient population.", source: "eras-breast-recon-2017", quote: "Preoperative maltodextrin-based drinks should be given to patients 2 hours before surgery." },
    { claim: "General anaesthesia with total intravenous anaesthesia", grade: "Evidence level : Moderate. Recommendation grade : Strong.", source: "eras-breast-recon-2017", quote: "General anesthesia with total intravenous anesthesia is recommended." },
    { claim: "Conventional sutures for closure; debridement and negative-pressure therapy for complex wounds", grade: "Evidence level : High for sutures; moderate for negative-pressure wound therapy. Recommendation grade : Strong.", source: "eras-breast-recon-2017", quote: "For incisional closure, conventional sutures are recommended. Complex wounds following skin necrosis are treatable with débridement and negative-pressure wound therapy." },
    { claim: "Mobilise within the first 24 hours", grade: "Evidence level : Moderate (based on extrapolated data). Recommendation grade : Strong (low risk).", source: "eras-breast-recon-2017", quote: "Patients should be mobilized within the first 24 hours after surgery." },
  ],
  sources: [
    {
      key: "eras-breast-recon-2017",
      label: "Consensus Review of Optimal Perioperative Care in Breast Reconstruction: Enhanced Recovery after Surgery (ERAS) Society Recommendations",
      publisher: "ERAS Society (Plastic and Reconstructive Surgery)",
      year: 2017,
      url: "https://doi.org/10.1097/PRS.0000000000003242",
      doi: "10.1097/PRS.0000000000003242",
      gradingScheme: "GRADE evidence level (high, moderate, low) and recommendation grade (strong or weak), printed after each item; 'based on extrapolated data' marks evidence from other operations.",
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
  cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"],
  technologies: ["eras-perioperative-nutrition"],
  terms: ["breast-reconstruction", "mastectomy"],
  related: ["surgical-site-infection-prevention", "vte-prophylaxis-after-cancer-surgery", "routine-preoperative-tests"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The guideline is from 2017 and rests on literature to about 2016; no update was found. Its authors note that most items rely on lower-level studies in reconstruction or on data extrapolated from other surgery.",
    "The review's discussion of whether regional anaesthesia affects breast cancer recurrence predates the large randomised trial it was waiting for; that question is not covered here.",
    "Drain management, antibiotic-coated or plain implants, mesh and acellular dermal matrix are not graded by the review and are not covered here.",
    "Doses of antiemetics and analgesics and the details of a flap-monitoring schedule are local protocol matters; the review gives one reasonable schedule (hourly for 24 hours, two-hourly for the next 24, then every 3 to 4 hours) as an example, not a recommendation.",
  ],
});
