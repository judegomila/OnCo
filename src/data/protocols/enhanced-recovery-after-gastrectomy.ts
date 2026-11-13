import { protocol } from "./helpers";

/*
 * Enhanced recovery after gastrectomy (removal of all or part of the stomach), most often for stomach cancer.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society consensus guidelines for enhanced recovery after gastrectomy (Mortensen et al., Br J Surg 2014):
 *   abstract only, through Europe PMC. This is still the current edition: Europe PMC searches for 2015 to 2026 found no
 *   newer ERAS Society gastrectomy guideline, and the ERAS Society's upper GI list (Wayback copy of 18 October 2026)
 *   shows only this one. The full text is not open in PubMed Central; the publisher (OUP) returned a bot challenge,
 *   which was not got round.
 * - Yamagata et al., "Current status of the enhanced recovery after surgery program in gastric cancer surgery" (Ann
 *   Gastroenterol Surg 2019): full text, Europe PMC XML (PMC6524106). Its Table 1 reproduces, "partially modified",
 *   the eight gastrectomy-specific ERAS items with their evidence level and recommendation grade, and it describes the
 *   Japanese Gastric Cancer Treatment Guidelines 2018 model pathway. Steps quoting the ERAS items quote this table.
 * - Liu et al., "Enhanced recovery after gastrectomy: updated meta-analysis of 27 randomized trials (2018-2025)" (BMC
 *   Surg 2025): full text, Europe PMC XML (PMC12797613).
 * - NICE NG83 (2018) and NG180 (2020): recommendations pages, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterGastrectomy = protocol({
  id: "enhanced-recovery-after-gastrectomy",
  name: "Enhanced recovery after gastrectomy (ERAS pathway for stomach cancer surgery)",
  aka: ["ERAS gastrectomy", "enhanced recovery gastric cancer surgery", "fast-track gastrectomy", "perioperative care for gastrectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover from stomach surgery: a dietitian's assessment and feeding support for anyone undernourished, keyhole surgery for early cancers where suitable, no routine nose tube or drain, drinking and eating from the day after surgery and building up slowly, extra feeding support if eating stays low, and checking that every step happens.",
  simple: "Before stomach surgery you will have your nutrition checked and get extra feeding if you need it. Afterwards you will usually not have a tube in your nose, and you can start drinking and eating from the next day, a little at a time.",
  summary: "The ERAS Society gastrectomy guideline (2014; 25 items, 8 procedure-specific, graded by GRADE) is the only ERAS gastrectomy edition. Its full text could not be read; its procedure-specific items and grades are quoted from the reproduction in Yamagata et al. (2019). Strong: no routine preoperative artificial nutrition, but optimise significantly malnourished patients with oral supplements or enteral nutrition (very low evidence); laparoscopy-assisted distal gastrectomy for early gastric cancer (high); no routine nasogastric or nasojejunal tube (high); avoid abdominal drains (high); individualised nutritional support for those clearly malnourished or unable to meet 60% of needs by day 6 (moderate); systematic audit (low). Weak: preoperative oral pharmaconutrition (insufficient evidence for gastrectomy), laparoscopy-assisted total gastrectomy, wound catheters and TAP block (no gastrectomy evidence), and drink and food at will from day 1 after total gastrectomy, increasing by tolerance (moderate). A 2025 meta-analysis of 27 randomised trials (3,274 patients) found ERAS shortened stay and sped bowel recovery without more complications or readmissions, with low to moderate certainty. NICE NG83 offers specialist dietetic support throughout radical treatment for oesophago-gastric cancer; NICE NG180 offers enhanced recovery for elective major surgery, clear fluids until 2 hours before, and suggests carbohydrate drinks for abdominal surgery. Japanese guidelines (2018) describe a slower model pathway.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having elective total or distal gastrectomy, open or laparoscopic, most often for gastric cancer. The ERAS items marked as procedure-specific apply to gastrectomy; the general ERAS elements (counselling, fasting, warming, clot prevention) are taken from the general sources. Oesophagectomy, including for junctional cancers resected through the chest, has its own ERAS guideline.",
  trigger: "A decision to remove all or part of the stomach.",
  steps: [
    {
      action: "Assess nutrition and give tailored specialist dietetic support before, during and after treatment",
      why: "Stomach cancer often causes weight loss, and poor nutrition raises the risk of complications.",
      source: "nice-ng83",
      quote: "Offer nutritional assessment and tailored specialist dietetic support to people with oesophago‑gastric cancer before, during and after radical treatments.",
      grade: "Not graded (NICE NG83 1.6.1, 'offer')",
    },
    {
      action: "Give oral supplements or tube feeding before surgery to anyone significantly malnourished, but not routine artificial nutrition to everyone",
      why: "Extra feeding helps those who are undernourished; for well-nourished people it adds nothing.",
      source: "yamagata-2019",
      quote: "Routine use of preoperative artificial nutrition is not warranted, but significantly malnourished patients should be optimized with oral supplements or enteral nutrition before surgery",
      grade: "Evidence level: Very low. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Allow clear fluids until 2 hours before the operation, and consider a carbohydrate drink",
      why: "Long fasting leaves people thirsty and weaker; a sugary drink before abdominal surgery is safe.",
      source: "nice-ng180",
      quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery .",
      grade: "Not graded (NICE NG180 1.4.2, 'consider')",
    },
    {
      action: "Offer laparoscopy-assisted distal gastrectomy for early gastric cancer where suitable",
      why: "Keyhole surgery for early stomach cancer causes fewer complications and faster recovery, with the same cancer outcome as open surgery.",
      source: "yamagata-2019",
      quote: "Evidence supports LADG in early gastric cancer as it results in fewer complications, faster recovery and may be carried out to a standard that is oncologically equivalent to open surgery",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Do not use nasogastric or nasojejunal tubes routinely",
      why: "A tube through the nose is uncomfortable and does not prevent leaks or vomiting after stomach surgery.",
      source: "yamagata-2019",
      quote: "Nasogastric tubes should not be used routinely",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Avoid routine abdominal drains",
      why: "Drains bring their own complications and lengthen the hospital stay.",
      source: "yamagata-2019",
      quote: "Avoiding the use of abdominal drains may reduce drain‐related complications and shorten hospital stay after gastrectomy",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "After total gastrectomy, offer drink and food at will from the day after surgery, starting cautiously and increasing by tolerance",
      why: "Eating early is safe and helps recovery; without a stomach, small amounts often work best.",
      source: "yamagata-2019",
      quote: "Patients undergoing total gastrectomy should be offered drink and food at will from POD 1. They should be advised to begin cautiously and increase intake according to tolerance",
      grade: "Evidence level: Moderate. Recommendation grade: Weak (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Give individualised nutritional support to anyone clearly malnourished or not meeting 60% of daily needs by day 6",
      why: "People who cannot eat enough after stomach surgery need extra feeding to heal.",
      source: "yamagata-2019",
      quote: "Patients clearly malnourished or those unable to meet 60% of daily requirements by POD 6 should be given individualized nutritional support",
      grade: "Evidence level: Moderate. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Prioritise early oral feeding, early mobilisation and opioid-sparing multimodal pain relief, with anti-sickness prophylaxis",
      why: "These are the elements most strongly tied to faster recovery in the randomised trials.",
      source: "liu-2025",
      quote: "prioritizing early oral feeding, early mobilization, and opioid‑sparing multimodal analgesia as non‑negotiable drivers of recovery",
      grade: "Authors' recommendation from a meta-analysis (certainty of evidence generally low to moderate)",
    },
    {
      action: "Audit compliance with each element systematically",
      why: "Units that measure how often each step is delivered improve compliance and results.",
      source: "yamagata-2019",
      quote: "Systematic audit improves compliance and clinical outcomes",
      grade: "Evidence level: Low. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society gastrectomy guideline (2014) remains the only specialty guideline and the current standard; read here through its abstract and a reproduction of its procedure-specific items with their grades. Its strongest items, on high-quality evidence, are laparoscopy-assisted distal gastrectomy for early cancer, no routine nasogastric tube and no routine abdominal drain. A 2025 meta-analysis of 27 randomised trials supports the pathway as a whole (shorter stay, faster bowel recovery, no excess complications or readmissions; low to moderate certainty). NICE NG83 and NG180 agree on dietetic support, enhanced recovery for major surgery and the 2-hour clear-fluid fast. Where practice differs most is in Japan, where the national guideline's model pathway starts food later and drains are still often placed after D2 surgery.",
    sources: ["eras-gas-2014", "yamagata-2019", "liu-2025", "nice-ng83", "nice-ng180"],
  },
  variants: [
    {
      name: "Japanese model clinical pathway (Japanese Gastric Cancer Treatment Guidelines 2018)",
      differs: "Nasogastric tube out by day 1, drinks after day 1, solid food from day 2 to 4, and any drain out by day 5.",
      evidence: "As reported by Yamagata et al. (2019), who call it 'a bit slow from the viewpoint of ERAS'. A Japanese multicentre trial (2018) cited there found early oral feeding did not shorten stay and increased complications after distal gastrectomy, while it may shorten stay after total gastrectomy. The Japanese guideline itself was not read.",
      sources: ["yamagata-2019"],
    },
    {
      name: "Routine abdominal drain after D2 gastrectomy",
      differs: "Places a drain after gastrectomy, often to measure drain amylase for early detection of pancreatic fistula.",
      evidence: "Common in Japan, according to Yamagata et al.; ERAS 2014 recommends avoiding drains (high, strong), and there is no evidence that drain amylase monitoring improves short-term outcomes.",
      sources: ["yamagata-2019", "eras-gas-2014"],
    },
    {
      name: "Preoperative immunonutrition (oral pharmaconutrition)",
      differs: "Gives arginine and omega-3 enriched drinks before surgery.",
      evidence: "ERAS 2014: benefit shown in major gastrointestinal surgery in general has not been reproduced in gastrectomy trials (moderate evidence, weak). Later meta-analyses cited by Yamagata et al. show effects on inflammation but no clear improvement in clinical outcomes.",
      sources: ["yamagata-2019"],
    },
  ],
  grades: [
    { claim: "ERAS gastrectomy guideline: 25 items graded by GRADE", grade: "GRADE: evidence high, moderate, low or very low; recommendation strong or weak", source: "eras-gas-2014", quote: "Results The available evidence has been summarized and recommendations are given for 25 items, eight of which contain procedure-specific evidence." },
    { claim: "Laparoscopy-assisted total gastrectomy", grade: "Evidence level: Moderate. Recommendation grade: Weak", source: "yamagata-2019", quote: "There is some evidence supporting LATG owing to lower postoperative complications, shorter hospital stay and oncological safety. However, LATG is technically demanding" },
    { claim: "TAP block for gastrectomy", grade: "Evidence level: Low. Recommendation grade: Weak", source: "yamagata-2019", quote: "Evidence is strong in support of TAP block in abdominal surgery, although the effect is evident only during the first 48 h after surgery and none of the evidence is from gastrectomies" },
    { claim: "ERAS versus conventional care after gastrectomy", grade: "Meta-analysis of 27 randomised trials; certainty generally low to moderate", source: "liu-2025", quote: "ERAS significantly shortened length of stay and accelerated gastrointestinal recovery." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
  ],
  sources: [
    {
      key: "eras-gas-2014",
      label: "Consensus guidelines for enhanced recovery after gastrectomy: Enhanced Recovery After Surgery (ERAS) Society recommendations (Mortensen et al.)",
      publisher: "ERAS Society (British Journal of Surgery)",
      year: 2014,
      url: "https://doi.org/10.1002/bjs.9582",
      doi: "10.1002/bjs.9582",
      gradingScheme: "GRADE: quality of evidence high, moderate, low or very low; recommendations strong or weak.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "yamagata-2019",
      label: "Current status of the 'enhanced recovery after surgery' program in gastric cancer surgery (Yamagata et al.)",
      publisher: "Annals of Gastroenterological Surgery",
      year: 2019,
      url: "https://doi.org/10.1002/ags3.12232",
      doi: "10.1002/ags3.12232",
      gradingScheme: "Review; Table 1 reproduces the ERAS 2014 procedure-specific items with their evidence level and recommendation grade (partially modified).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "liu-2025",
      label: "Enhanced recovery after gastrectomy: updated meta-analysis of 27 randomized trials (2018-2025) (Liu et al.)",
      publisher: "BMC Surgery",
      year: 2025,
      url: "https://doi.org/10.1186/s12893-025-03399-2",
      doi: "10.1186/s12893-025-03399-2",
      gradingScheme: "Systematic review and meta-analysis; certainty of evidence by GRADE.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng83",
      label: "Oesophago-gastric cancer: assessment and management in adults (NG83), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng83/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
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
  cancers: ["gastric"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition"],
  terms: ["gastrectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full text of the ERAS Society gastrectomy guideline (2014) could not be read: it is not open in PubMed Central and the publisher returned a bot challenge. Its procedure-specific items and grades are quoted from a reproduction marked 'partially modified'; its 17 general items (counselling, fasting, warming, clot prevention and others) were not read and are covered here from NICE.",
    "The guideline is 12 years old and predates most randomised trials of laparoscopic surgery for advanced gastric cancer and of robotic gastrectomy; no newer ERAS Society edition was found to November 2026.",
    "When to start eating after distal as opposed to total gastrectomy is not settled; a Japanese multicentre trial found early feeding did not shorten stay after distal gastrectomy (as reported by Yamagata et al.).",
    "The Japanese Gastric Cancer Treatment Guidelines were not read directly; the Japanese pathway is described from a review.",
  ],
});
