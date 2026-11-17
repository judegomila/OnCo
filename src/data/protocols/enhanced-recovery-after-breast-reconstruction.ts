import { protocol } from "./helpers";

/*
 * Enhanced recovery after breast reconstruction (implant or own-tissue flap, at mastectomy or later).
 *
 * What was read, and how (first on 11 November 2026; re-read in a second accuracy pass on 17 November 2026, each
 * source fetched raw with curl and read as text, every quote checked verbatim by script):
 * - ERAS Society consensus review for breast reconstruction (Temple-Oberle et al., Plast Reconstr Surg 2017): full
 *   text, the author manuscript in PubMed Central (PMC9074892) fetched as XML through NCBI E-utilities (the Europe
 *   PMC full-text endpoint returned HTTP 500 on 17 November). 18 items, each with a summary and recommendation, an
 *   evidence level and a recommendation grade, quoted as printed. Two Europe PMC searches for a newer ERAS breast
 *   reconstruction guideline (2018 to 2026) found none; the ERAS Society's own site still refused a script (403).
 * - NICE NG180, Perioperative care in adults (2020): recommendations page and update information page, full text.
 * The DOI was resolved through Crossref and Europe PMC and its title checked.
 * Changed on 17 November 2026: a quote with a mangled superscript shortened to its first sentence; reasons in `why`
 * cut back to what the review says; the literature search date corrected to January 2015; obesity added to the
 * high-evidence items in the best-in-class statement; NICE's narrower advice on carbohydrate drinks added as a
 * variant; the grading scheme described as the review describes it.
 */
export const enhancedRecoveryAfterBreastReconstruction = protocol({
  id: "enhanced-recovery-after-breast-reconstruction",
  name: "Enhanced recovery after breast reconstruction (ERAS pathway for implant and flap reconstruction)",
  aka: ["ERAS breast reconstruction", "enhanced recovery DIEP flap", "fast-track breast reconstruction", "perioperative care for breast reconstruction"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery for breast reconstruction means good information beforehand, stopping smoking for a month, a short fast with a sugary drink two hours before, anti-sickness and pain medicines that spare opioids, keeping warm, eating within a day and getting up within a day, with close checks on a flap in the first three days.",
  simple: "Before breast reconstruction you will be helped to stop smoking and to understand the operation. You can drink clear fluids until two hours before. Afterwards you will be helped to eat and get out of bed within a day, and nurses will check a flap often for the first three days.",
  summary: "The ERAS Society consensus review (2017; 18 items, each with an evidence level and a GRADE strong or weak recommendation) is the only specialty guideline found for breast reconstruction. Every recommendation is graded strong; evidence is high for opioid-sparing multimodal postoperative analgesia, conventional sutures and weight reduction in obesity, and moderate or low (often extrapolated from other surgery) for the rest: detailed counselling; one month without smoking or alcohol misuse and weight reduction to a BMI of 30 or less; CT angiography if perforators need mapping; clear fluids to 2 hours and a maltodextrin drink 2 hours before (low evidence; the review's text describes a 400 ml drink and notes that the fasting advice has not been applied to people at risk of delayed gastric emptying); VTE risk assessment and LMWH or heparin with mechanical methods for those at higher risk until they are walking or discharged; chlorhexidine and IV antibiotics within 1 hour of incision; multimodal antiemetics and multimodal analgesia before and during surgery; total intravenous anaesthesia; active warming above 36°C; avoiding over- and under-filling with balanced crystalloid, goal-directed therapy and vasopressors where needed; food within 24 hours; mobilisation within 24 hours; frequent flap monitoring in the first 72 hours; and physiotherapy and support after discharge. NICE NG180 (England) says to offer an enhanced recovery programme for elective major or complex surgery.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having breast reconstruction, with implants or with their own tissue (such as a DIEP flap). Many of the recommendations are extrapolated from other kinds of surgery, as the guideline says item by item.",
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
      why: "Smoking makes skin and flap tissue more likely to die after reconstruction, obesity raises the risk of flap loss and donor-site problems, and heavy drinking is linked with wound infection.",
      source: "eras-breast-recon-2017",
      quote: "For daily smokers, 1 month of abstinence before surgery is beneficial.",
      grade: "Evidence level: Moderate for smoking; high for obesity; low for alcohol. Recommendation grade: Strong for all (high benefit, low harm).",
    },
    {
      action: "If the blood vessels of a flap need mapping, use CT angiography",
      why: "Compared with Doppler ultrasound, mapping the main vessels of a DIEP flap by CT angiography shortens the operation and reduces flap and donor-site problems.",
      source: "eras-breast-recon-2017",
      quote: "If preoperative perforator mapping is required, computed tomographic angiography is recommended.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong.",
    },
    {
      action: "Keep the fast short: clear fluids until 2 hours before surgery, with a maltodextrin carbohydrate drink 2 hours before",
      why: "Clear drinks up to 2 hours before are safe, and a carbohydrate drink reduces thirst and anxiety and the loss of muscle and strength after surgery. The review notes this advice has not been applied to people whose stomach empties slowly.",
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
      why: "Getting cold during surgery is linked with slower wound healing, a longer stay and three times the rate of wound infection.",
      source: "eras-breast-recon-2017",
      quote: "Temperature monitoring is required to ensure the patient’s body temperature is maintained above 36°C.",
      grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong.",
    },
    {
      action: "Avoid giving too much or too little fluid; use balanced crystalloid, goal-directed therapy, and vasopressors where needed",
      why: "Too much fluid harms a flap and the wound; too little risks a clot in the flap's vessels. Vasopressors have been found safe for flaps when the patient has enough fluid on board.",
      source: "eras-breast-recon-2017",
      quote: "Overresuscitation or underresuscitation of fluids should be avoided, and water and electrolyte balance should be maintained. Goal-directed therapy is a useful method to achieve these goals. Balanced crystalloid solutions rather than saline is recommended. Vasopressors are recommended to support fluid management and do not negatively affect free flaps.",
      grade: "Evidence level: Moderate for all (based on extrapolated data). Recommendation grade: Strong.",
    },
    {
      action: "Use opioid-sparing multimodal pain relief after surgery (the review discusses paracetamol with an NSAID, and local anaesthetic blocks or infusions)",
      why: "Fewer opioids means less sickness and constipation and earlier walking.",
      source: "eras-breast-recon-2017",
      quote: "Multimodal postoperative pain management regimens are opioid-sparing and should be used.",
      grade: "Evidence level: High. Recommendation grade: Strong.",
    },
    {
      action: "Encourage drinking and eating as soon as possible, preferably within 24 hours, and getting up within the first 24 hours",
      why: "Early food is linked with better wound healing and fewer infections, and early movement reduces clots in the lung, chest infection and muscle loss.",
      source: "eras-breast-recon-2017",
      quote: "Patients should be encouraged to take fluids and food orally as soon as possible, preferably within 24 hours after surgery.",
      grade: "Early feeding: Evidence level Moderate (based on extrapolated data), Recommendation grade Strong. Mobilisation: Evidence level Moderate (based on extrapolated data), Recommendation grade Strong (low risk).",
    },
    {
      action: "Monitor a free flap frequently for the first 72 hours by clinical observation, with an implantable Doppler for a buried flap",
      why: "A clot in a flap's vessels happens in 2 to 5 in 100 flaps, usually in the first three days, and a flap in trouble is more likely to be saved the earlier it is re-explored.",
      source: "eras-breast-recon-2017",
      quote: "Flap monitoring within the first 72 hours should occur frequently. Clinical evaluation is sufficient for monitoring, with implantable Doppler monitoring recommended in cases of buried flaps.",
      grade: "Evidence level: Moderate. Recommendation grade: Strong (low harm).",
    },
    {
      action: "Arrange early physiotherapy, supervised exercise and support after discharge",
      why: "Rehabilitation programmes improve movement, pain and quality of life after breast cancer surgery.",
      source: "eras-breast-recon-2017",
      quote: "Early physiotherapy, supervised exercise programs, and other supportive care initiatives should be instituted after discharge.",
      grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong (low harm).",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society consensus review (2017) is the only graded specialty guideline for breast reconstruction found, and all 18 of its recommendations are strong; only opioid-sparing postoperative analgesia, conventional sutures and weight reduction in obesity carry a high evidence level, and many items are extrapolated from other operations. NICE NG180 (England) says to offer an enhanced recovery programme for elective major or complex surgery and gives the same 2-hour limit for clear fluids.",
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
    {
      name: "Carbohydrate drinks considered only for abdominal surgery (NICE)",
      differs: "Does not give a carbohydrate drink routinely before breast reconstruction.",
      evidence: "The ERAS review recommends a maltodextrin drink 2 hours before surgery for the general patient population (low evidence, extrapolated; strong). NICE NG180 recommendation 1.4.2 says only to consider carbohydrate drinks before surgery for people having abdominal major or complex surgery.",
      sources: ["eras-breast-recon-2017", "nice-ng180"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Weight reduction to a BMI of 30 or less, and a month without smoking or alcohol misuse, before surgery", grade: "Evidence level: Moderate for smoking; high for obesity; low for alcohol. Recommendation grade: Strong for all (high benefit, low harm).", source: "eras-breast-recon-2017", quote: "For alcohol abusers, 1 month of abstinence before surgery is beneficial." },
    { claim: "Multimodal analgesia before and during surgery", grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong (high benefit, low harm).", source: "eras-breast-recon-2017", quote: "Women should receive multimodal analgesia to mitigate pain." },
    { claim: "Maltodextrin drink 2 hours before surgery", grade: "Evidence level: Low (based on extrapolated data). Recommendation grade: Strong (low risk of harm) in the general patient population.", source: "eras-breast-recon-2017", quote: "Preoperative maltodextrin-based drinks should be given to patients 2 hours before surgery." },
    { claim: "General anaesthesia with total intravenous anaesthesia", grade: "Evidence level: Moderate. Recommendation grade: Strong.", source: "eras-breast-recon-2017", quote: "General anesthesia with total intravenous anesthesia is recommended." },
    { claim: "Conventional sutures for closure; debridement and negative-pressure therapy for complex wounds", grade: "Evidence level: High for sutures; moderate for negative-pressure wound therapy. Recommendation grade: Strong.", source: "eras-breast-recon-2017", quote: "For incisional closure, conventional sutures are recommended. Complex wounds following skin necrosis are treatable with débridement and negative-pressure wound therapy." },
    { claim: "Mobilise within the first 24 hours", grade: "Evidence level: Moderate (based on extrapolated data). Recommendation grade: Strong (low risk).", source: "eras-breast-recon-2017", quote: "Patients should be mobilized within the first 24 hours after surgery." },
  ],
  sources: [
    {
      key: "eras-breast-recon-2017",
      label: "Consensus Review of Optimal Perioperative Care in Breast Reconstruction: Enhanced Recovery after Surgery (ERAS) Society Recommendations",
      publisher: "ERAS Society (Plastic and Reconstructive Surgery)",
      year: 2017,
      url: "https://doi.org/10.1097/PRS.0000000000003242",
      doi: "10.1097/PRS.0000000000003242",
      gradingScheme: "An evidence level (high, moderate or low; study quality was assessed with the Oxford Centre for Evidence Based Medicine criteria) and a recommendation grade (strong or weak, by GRADE), printed after each item; 'based on extrapolated data' marks evidence from other operations.",
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
  cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"],
  technologies: ["eras-perioperative-nutrition"],
  terms: ["breast-reconstruction", "mastectomy"],
  related: ["surgical-site-infection-prevention", "vte-prophylaxis-after-cancer-surgery", "routine-preoperative-tests"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The guideline is from 2017 and its literature search ran to January 2015. On 17 November 2026 two Europe PMC searches found no newer ERAS Society guideline for breast reconstruction, and the ERAS Society's own guideline list refused a script, so it could not be checked there. Its authors note that most items rely on lower-level studies in reconstruction or on data extrapolated from other surgery.",
    "The review says a large randomised trial of whether regional anaesthesia affects breast cancer recurrence was under way when it was written, and that its findings might change the choice of anaesthetic; that question is not covered here.",
    "How long clot prevention should last is not settled within the review: its recommendation says until the patient is walking or discharged, while its text says prophylaxis should begin before surgery and continue for at least 7 to 10 days. NICE NG180 refers readers to the NICE guideline on venous thromboembolism in over 16s, which was not read for this page.",
    "The review's recommendation on fasting gives no time for solid food; its text says only that existing ERAS guidelines recommend a 6-hour fast for solids. NICE NG180 says to consider carbohydrate drinks only before abdominal major or complex surgery.",
    "Drain management, antibiotic irrigation of the implant pocket, mesh and acellular dermal matrix are not graded by the review and are not covered here.",
    "Doses of antiemetics and analgesics and the details of a flap-monitoring schedule are local protocol matters; the review gives one reasonable schedule (hourly for 24 hours, two-hourly for the next 24, then every 3 to 4 hours) as an example, not a recommendation.",
  ],
});
