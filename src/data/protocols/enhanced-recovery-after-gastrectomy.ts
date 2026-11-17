import { protocol } from "./helpers";

/*
 * Enhanced recovery after gastrectomy (removal of all or part of the stomach), most often for stomach cancer.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text with curl (the NICE NG180 page was re-used from a copy a sibling checker fetched from nice.org.uk the same
 * day), every quote was checked against the text by script, and every step, grade and figure was re-read.
 * - ERAS Society consensus guidelines for enhanced recovery after gastrectomy (Mortensen et al., Br J Surg 2014):
 *   abstract only, through Europe PMC. Still the only ERAS Society edition: Europe PMC title searches for 2015 to
 *   2026 found no newer one. The full text is not open in PubMed Central and the publisher (OUP) again returned a bot
 *   challenge (HTTP 403), which was not got round.
 * - Yamagata et al., "Current status of the enhanced recovery after surgery program in gastric cancer surgery" (Ann
 *   Gastroenterol Surg 2019): full text, Europe PMC XML (PMC6524106). Its Table 1 reproduces, "partially modified",
 *   the eight gastrectomy-specific ERAS items with their evidence level and recommendation grade. Steps quoting the
 *   ERAS items quote this table.
 * - Japanese Gastric Cancer Treatment Guidelines 2025 (7th edition; Gastric Cancer 2026): full text, Europe PMC XML
 *   (PMC12956939). New in this pass: the first version described the 2018 edition's pathway from Yamagata et al.; the
 *   current edition is now read directly. The 2018 (5th) edition (PMC7790804) was also read to compare the tables.
 * - Liu et al., "Enhanced recovery after gastrectomy: updated meta-analysis of 27 randomized trials (2018-2025)" (BMC
 *   Surg 2025): full text, Europe PMC XML (PMC12797613).
 * - NICE NG83 (2018, last updated 4 July 2023) and NG180 (2020, minor changes to July 2025): recommendations pages.
 * Every DOI was resolved through Crossref and its title checked.
 * Corrected in the second pass: reasons in `why` lines that no source gave, early eating written for every
 * gastrectomy where the ERAS item is for total gastrectomy, two NICE quotations with a stray space, and the Japanese
 * pathway moved to the current edition.
 */
export const enhancedRecoveryAfterGastrectomy = protocol({
  id: "enhanced-recovery-after-gastrectomy",
  name: "Enhanced recovery after gastrectomy (ERAS pathway for stomach cancer surgery)",
  aka: ["ERAS gastrectomy", "enhanced recovery gastric cancer surgery", "fast-track gastrectomy", "perioperative care for gastrectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care for stomach surgery: a dietitian's assessment and feeding support for anyone undernourished, keyhole surgery for some early cancers, no routine nose tube or drain, eating and drinking early and building up slowly (from the day after surgery if the whole stomach is removed), extra feeding if eating stays low, and checking each step happens.",
  simple: "Before stomach surgery you will have your nutrition checked and get extra feeding if you need it. Afterwards you will usually not have a tube in your nose, and you start drinking and then eating within the first few days, a little at a time. Hospitals differ on the exact day.",
  summary: "The ERAS Society gastrectomy guideline (2014; 25 items, 8 with procedure-specific evidence, graded by GRADE) is the only ERAS Society edition for this operation. Its full text could not be read; its procedure-specific items and grades are quoted from the reproduction in Yamagata et al. (2019). Strong: no routine preoperative artificial nutrition, but optimise significantly malnourished patients with oral supplements or enteral nutrition (very low evidence); laparoscopy-assisted distal gastrectomy for early gastric cancer (high); no routine nasogastric tube (high); avoid abdominal drains (high); individualised nutritional support for those clearly malnourished or unable to meet 60% of daily requirements by day 6 (moderate); systematic audit (low). Weak: preoperative oral pharmaconutrition (moderate; insufficient evidence for gastrectomy), laparoscopy-assisted distal gastrectomy for T2 to T4a cancer (moderate), laparoscopy-assisted total gastrectomy (moderate), wound catheters (low to moderate; conflicting evidence), TAP block (low; no gastrectomy evidence), and drink and food at will from day 1 after total gastrectomy, increasing by tolerance (moderate). A 2025 meta-analysis of 27 randomised trials (3,274 patients) found ERAS shortened stay and sped bowel recovery, with no clear difference in readmission, at generally low to moderate certainty. NICE NG83 offers specialist dietetic support before, during and after radical treatment for oesophago-gastric cancer; NICE NG180 offers enhanced recovery for elective major or complex surgery, allows clear fluids until 2 hours before, and says to consider carbohydrate drinks before abdominal major or complex surgery. The Japanese guideline (2025, 7th edition) prints a slower common pathway and asks each hospital to consider its own timing for eating.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "home"],
  },
  population: "Adults having elective gastrectomy, most often for gastric cancer. The ERAS items quoted here are the eight with gastrectomy-specific evidence; the eating item is written for total gastrectomy and the keyhole item for distal gastrectomy in early cancer. The guideline's general items (which Yamagata et al. say are shared with the ERAS guideline for pancreaticoduodenectomy) could not be read, so this page takes only fasting, carbohydrate drinks and the offer of an enhanced recovery programme from NICE NG180, which is guidance for England, and gives no step on warming, pain relief drugs or clot prevention. Oesophagectomy has its own ERAS guideline.",
  trigger: "A decision to remove all or part of the stomach.",
  steps: [
    {
      action: "Assess nutrition and give tailored specialist dietetic support before, during and after radical treatment",
      why: "NICE asks for a nutritional assessment and a specialist dietitian's support at every stage of treatment that aims to cure oesophago-gastric cancer.",
      source: "nice-ng83",
      quote: "Offer nutritional assessment and tailored specialist dietetic support to people with oesophago‑gastric cancer before, during and after radical treatments.",
      grade: "Not graded (NICE NG83 1.6.1, 'offer')",
    },
    {
      action: "Optimise anyone significantly malnourished with oral supplements or enteral nutrition before surgery, but do not give artificial nutrition to everyone routinely",
      why: "The guideline finds routine feeding before surgery is not warranted, and reserves it for people who are significantly undernourished. The evidence behind this is rated very low.",
      source: "yamagata-2019",
      quote: "Routine use of preoperative artificial nutrition is not warranted, but significantly malnourished patients should be optimized with oral supplements or enteral nutrition before surgery",
      grade: "Evidence level: Very low. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Tell the person they may drink clear fluids until 2 hours before the operation, and consider a carbohydrate drink",
      why: "NICE says that drinking clear fluids before the operation can help reduce headaches, nausea and vomiting afterwards.",
      source: "nice-ng180",
      quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery.",
      grade: "Not graded (NICE NG180 1.4.1 and 1.4.2; 'consider' for the carbohydrate drink)",
    },
    {
      action: "Offer laparoscopy-assisted distal gastrectomy for early gastric cancer where suitable",
      why: "For early stomach cancer, keyhole removal of the lower stomach results in fewer complications and faster recovery, and may be done to a standard equivalent to open surgery for the cancer.",
      source: "yamagata-2019",
      quote: "Evidence supports LADG in early gastric cancer as it results in fewer complications, faster recovery and may be carried out to a standard that is oncologically equivalent to open surgery",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Do not use nasogastric tubes routinely",
      why: "Trials and pooled analyses published since the guideline have strengthened the view that a tube through the nose to drain the stomach is unnecessary after stomach cancer surgery.",
      source: "yamagata-2019",
      quote: "Nasogastric tubes should not be used routinely",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Avoid abdominal drains",
      why: "Going without a drain may reduce drain-related complications and shorten the hospital stay.",
      source: "yamagata-2019",
      quote: "Avoiding the use of abdominal drains may reduce drain‐related complications and shorten hospital stay after gastrectomy",
      grade: "Evidence level: High. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "After total gastrectomy, offer drink and food at will from the day after surgery, starting cautiously and increasing by tolerance",
      why: "No trial available to the guideline reported harm from eating early. The advice is to start with small amounts and build up as the body allows.",
      source: "yamagata-2019",
      quote: "Patients undergoing total gastrectomy should be offered drink and food at will from POD 1. They should be advised to begin cautiously and increase intake according to tolerance",
      grade: "Evidence level: Moderate. Recommendation grade: Weak (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Give individualised nutritional support to anyone clearly malnourished or unable to meet 60% of daily requirements by day 6 after surgery",
      why: "People who are still not eating enough towards the end of the first week are given feeding support planned for them.",
      source: "yamagata-2019",
      quote: "Patients clearly malnourished or those unable to meet 60% of daily requirements by POD 6 should be given individualized nutritional support",
      grade: "Evidence level: Moderate. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
    {
      action: "Prioritise early oral feeding, early mobilisation and opioid-sparing multimodal pain relief, with structured anti-sickness prophylaxis",
      why: "The authors of the 2025 meta-analysis of randomised trials name these as the drivers of recovery in the pathway.",
      source: "liu-2025",
      quote: "prioritizing early oral feeding, early mobilization, and opioid‑sparing multimodal analgesia as non‑negotiable drivers of recovery",
      grade: "Authors' recommendation from a meta-analysis (certainty of evidence generally low to moderate)",
    },
    {
      action: "Audit compliance with each element systematically",
      why: "The guideline finds that systematic audit improves both compliance and clinical outcomes.",
      source: "yamagata-2019",
      quote: "Systematic audit improves compliance and clinical outcomes",
      grade: "Evidence level: Low. Recommendation grade: Strong (ERAS 2014, as reproduced by Yamagata et al.)",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society gastrectomy guideline (2014) is the only ERAS Society guideline for this operation; it is read here through its abstract and a reproduction of its procedure-specific items with their grades. Its items graded high and strong are laparoscopy-assisted distal gastrectomy for early cancer, no routine nasogastric tube and avoiding abdominal drains, although Yamagata et al. note that the drain recommendation rested on two meta-analyses of about 400 gastrectomies each. A 2025 meta-analysis of 27 randomised trials supports the pathway as a whole (shorter stay, faster bowel recovery, no clear difference in readmission; generally low to moderate certainty). NICE NG83 and NG180 add dietetic support, an enhanced recovery programme for major or complex surgery and clear fluids until 2 hours before the operation. The Japanese guideline (2025, 7th edition) differs most: its common pathway starts solid food on days 2 to 4 and includes removal of drains, and it notes a report of more complications with earlier eating.",
    sources: ["eras-gas-2014", "yamagata-2019", "liu-2025", "nice-ng83", "nice-ng180", "jgca-2025"],
  },
  variants: [
    {
      name: "Japanese common clinical pathway (Japanese Gastric Cancer Treatment Guidelines 2025, 7th edition)",
      differs: "Nasogastric tube out before or on day 1, oral fluids on or after day 1, solid food on days 2 to 4, intra-abdominal drains out before or on day 5, and discharge on days 8 to 14 in the table (the text says discharge on days 7 to 10 may be possible).",
      evidence: "The guideline says ERAS is widely used in gastric cancer and has been shown to enable early discharge, but that increased complications from starting oral intake earlier have been reported, so each facility should consider the best timing. The table is unchanged from the 2018 edition, which Yamagata et al. (2019) called 'a bit slow from the viewpoint of ERAS'. They report a Japanese multicentre trial (2018) in which early oral feeding did not shorten stay and increased complications after distal gastrectomy, while it may shorten stay after total gastrectomy.",
      sources: ["jgca-2025", "yamagata-2019"],
    },
    {
      name: "Routine abdominal drain after D2 gastrectomy",
      differs: "Places a drain after gastrectomy, in part to measure drain amylase for early detection of pancreatic fistula.",
      evidence: "Yamagata et al. presume from the published studies of drain amylase that a drain is placed in many Japanese institutes, and say going without one would not be accepted in Japan without more evidence after D2 surgery. ERAS 2014 recommends avoiding drains (high, strong). They add that there is no evidence that measuring drain amylase improves the patient's short-term prognosis.",
      sources: ["yamagata-2019", "eras-gas-2014"],
    },
    {
      name: "Preoperative immunonutrition (oral pharmaconutrition)",
      differs: "Gives nutrition supplemented with arginine and omega-3 fatty acids before surgery.",
      evidence: "ERAS 2014: benefit shown in major gastrointestinal cancer surgery in general has not been reproduced in dedicated gastrectomy trials (moderate evidence, weak). Later meta-analyses cited by Yamagata et al. show effects on immunity and the inflammatory response but no clear evidence of better clinical outcomes.",
      sources: ["yamagata-2019"],
    },
  ],
  grades: [
    { claim: "ERAS gastrectomy guideline: 25 items graded by GRADE", grade: "GRADE: evidence high, moderate, low or very low; recommendation strong or weak", source: "eras-gas-2014", quote: "The available evidence has been summarized and recommendations are given for 25 items, eight of which contain procedure-specific evidence." },
    { claim: "Preoperative oral pharmaconutrition", grade: "Evidence level: Moderate. Recommendation grade: Weak", source: "yamagata-2019", quote: "Although a benefit cannot be excluded, there is presently insufficient evidence for this patient group" },
    { claim: "Laparoscopy-assisted distal gastrectomy for T2 to T4a gastric cancer", grade: "Evidence level: Moderate. Recommendation grade: Weak", source: "yamagata-2019", quote: "T2‐T4a gastric cancer, more data on long‐term survival comparing LADG and ODG are needed" },
    { claim: "Laparoscopy-assisted total gastrectomy", grade: "Evidence level: Moderate. Recommendation grade: Weak", source: "yamagata-2019", quote: "There is some evidence supporting LATG owing to lower postoperative complications, shorter hospital stay and oncological safety. However, LATG is technically demanding" },
    { claim: "Wound catheters", grade: "Evidence level: Low to moderate. Recommendation grade: Weak", source: "yamagata-2019", quote: "Evidence is conflicting regarding wound catheters in abdominal surgery" },
    { claim: "TAP block for gastrectomy", grade: "Evidence level: Low. Recommendation grade: Weak", source: "yamagata-2019", quote: "Evidence is strong in support of TAP block in abdominal surgery, although the effect is evident only during the first 48 h after surgery and none of the evidence is from gastrectomies" },
    { claim: "ERAS versus conventional care after gastrectomy", grade: "Meta-analysis of 27 randomised trials; certainty generally low to moderate", source: "liu-2025", quote: "ERAS significantly shortened length of stay and accelerated gastrointestinal recovery." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Japanese common pathway: when to start drinking and eating", grade: "Not graded (text section of the guideline, not a graded clinical question)", source: "jgca-2025", quote: "However, increased complications by accelerating the timing of oral intake have been reported [105], and it is necessary to consider the optimal timing at each facility." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "jgca-2025",
      label: "Japanese gastric cancer treatment guidelines 2025 (7th edition), English version",
      publisher: "Japanese Gastric Cancer Association (Gastric Cancer)",
      year: 2026,
      url: "https://doi.org/10.1007/s10120-025-01698-4",
      doi: "10.1007/s10120-025-01698-4",
      gradingScheme: "Clinical questions carry a strength of recommendation and of evidence; the clinical pathway is in the text section and is not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng83",
      label: "Oesophago-gastric cancer: assessment and management in adults (NG83), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng83/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
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
  cancers: ["gastric"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition"],
  terms: ["gastrectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery", "enhanced-recovery-after-oesophagectomy", "enhanced-recovery-after-pancreatoduodenectomy"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "On 17 November 2026 the full text of the ERAS Society gastrectomy guideline (2014) still could not be read: it is not open in PubMed Central and the publisher returned a bot challenge. Its procedure-specific items and grades are quoted from a reproduction marked 'partially modified'. Its general items (counselling, fasting, pain relief, anti-sickness drugs, warming, clot prevention and others) were not read, so this page states no ERAS dose, fasting interval, carbohydrate drink volume or length of clot prevention for gastrectomy; the fasting and carbohydrate drink steps come from NICE NG180, which is written for England.",
    "The guideline is 12 years old and predates most randomised trials of laparoscopic surgery for advanced gastric cancer and of robotic gastrectomy. On 17 November 2026 Europe PMC title searches found no newer ERAS Society edition. They did find a 2026 Chinese expert consensus on enhanced recovery for gastric cancer patients having neoadjuvant therapy (Zhonghua Wei Chang Wai Ke Za Zhi), which was not read.",
    "When to start eating after distal as opposed to total gastrectomy is not settled; a Japanese multicentre trial found early feeding did not shorten stay and increased complications after distal gastrectomy (as reported by Yamagata et al.), and the Japanese guideline leaves the timing to each facility.",
    "The 2025 meta-analysis gives 3,274 patients in its abstract and 3,315 participants in its results; the abstract's figure is used here. Its recommendations are the authors' own and are not graded.",
    "No source read gives a list of symptoms for a patient to report after going home, so this page gives none; the surgical team's own discharge advice applies.",
  ],
});
