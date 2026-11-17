import { protocol } from "./helpers";

/*
 * Enhanced recovery after pancreatoduodenectomy (the Whipple operation).
 *
 * First written on 11 November 2026 from the ERAS Society abstract, a narrative review and NICE.
 *
 * Second accuracy pass, 17 November 2026. What was re-read, and how (fetched raw with curl and read as text):
 * - ERAS Society guidelines for perioperative care for pancreatoduodenectomy, 2019 recommendations (Melloul et al.,
 *   World J Surg 2020;44:2056-2084): FULL TEXT, read for the first time. The publisher's page is behind a
 *   subscription, but the Amsterdam UMC research repository (pure.amsterdamumc.nl) serves the publisher's PDF openly;
 *   it was found through the DOI's open-access locations and converted with pdftotext. Every step that had rested
 *   on the abstract or on a narrative review's report of the guideline now rests on the guideline's own words, with
 *   the evidence level and grade it prints. In the PDF text the signs for "greater than", "less than", degrees and
 *   micro do not survive, so no sentence containing one is used as a quotation; those figures are stated in prose.
 *   The abstract was also re-read through Europe PMC. Europe PMC searches for 2020 to 2026 found no newer ERAS
 *   Society edition for this operation.
 * - Longo et al., "Enhanced Recovery After Surgery (ERAS) in Pancreatic Surgery: The Surgeon's Point of View" (J Clin
 *   Med 2024): full text, Europe PMC XML (PMC11508928). A narrative review; now used only for what it reports of
 *   NCCN and of the limits of the evidence. Two of its reports of the ERAS guideline differ from the guideline
 *   ("within 72 h" for drain removal where the guideline says "at 72 h"; "recurrent cholangitis" where the guideline
 *   says cholangitis).
 * - Costs and clinical benefits of ERAS in pancreaticoduodenectomy, systematic review and meta-analysis (J Cancer Res
 *   Clin Oncol 2023): abstract, through Europe PMC.
 * - NICE NG85, Pancreatic cancer in adults (published 7 February 2018, last reviewed 17 September 2025):
 *   recommendations and overview pages, full text.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text, from a copy a sibling checker
 *   saved from nice.org.uk on the same day.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Every quotation was checked by script
 * against the saved text (whitespace and line-break hyphenation normalised, nothing else).
 */
export const enhancedRecoveryAfterPancreatoduodenectomy = protocol({
  id: "enhanced-recovery-after-pancreatoduodenectomy",
  name: "Enhanced recovery after pancreatoduodenectomy (ERAS pathway for the Whipple operation)",
  aka: ["ERAS Whipple", "ERAS pancreatoduodenectomy", "ERAS pancreaticoduodenectomy", "enhanced recovery pancreatic surgery", "fast-track Whipple"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care around the Whipple operation: going straight to surgery rather than having a bile duct stent first where safe, feeding up after heavy weight loss, enzyme capsules, shorter fasting, keeping warm, good pain relief, antibiotics and clot prevention, the nose tube out at the end of the operation, the drain out early when safe, and eating and getting up early.",
  simple: "If you are well enough, you will usually go straight to the operation rather than having a stent put in first. You may be given enzyme capsules to help digest food. After the operation you will be helped to eat and get up early, and tubes will come out as soon as it is safe.",
  summary: "The ERAS Society pancreatoduodenectomy recommendations (2019, published 2020; 27 items, each with a GRADE evidence level and a strong or weak recommendation, validated by a three-round Delphi) are the current specialty standard. High evidence, strong recommendation: avoid preoperative biliary drainage unless decompression is needed (bilirubin above 250 micromol/l, cholangitis, neoadjuvant treatment); preoperative nutritional intervention for severe weight loss (more than 15%, or BMI below 18.5 kg/m²), not as a general measure; no immunonutrition; a single intravenous antibiotic dose less than 60 minutes before incision; heparin (LMWH or UFH) started 2 to 12 hours before surgery and continued until discharge, with 4 weeks advised after pancreatoduodenectomy for cancer; active warming to keep temperature above 36°C; a preperitoneal wound catheter as an alternative to epidural for open surgery; drain removal at 72 hours where drain amylase on day 1 is below 5000 U/L. Moderate evidence, strong recommendation: fasting limited to 6 hours for solids and 2 hours for liquids, carbohydrate loading, thoracic epidural, multimodal opioid-sparing analgesia, no routine nasogastric tube after surgery, a normal diet according to tolerance, audit. Moderate evidence, weak recommendation: systematic somatostatin analogues cannot be recommended. NICE NG85 (2018, last reviewed September 2025) offers resection rather than preoperative biliary drainage to people with resectable cancer and jaundice who are well enough, a metal stent if drainage is needed in someone not yet fit, considers pancreatic enzyme replacement before and after resection, and offers early enteral rather than parenteral nutrition after pancreatoduodenectomy. A 2023 meta-analysis (3 randomised trials, 28 cohorts) found ERAS reduced stay, complications, delayed gastric emptying and cost without changing readmissions, with better outcomes at higher compliance.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "Adults having elective pancreatoduodenectomy (the classical Whipple operation or the pylorus-preserving form), for cancer of the pancreas or a nearby (periampullary) tumour. The ERAS guideline is written for pancreatoduodenectomy, not for other pancreatic resections; its analgesia items are worded for open surgery. NICE NG85 covers pancreatic cancer in adults only. The ERAS fasting limits do not apply to people with gastric outlet obstruction or diabetes with neuropathy.",
  trigger: "A decision to perform pancreatoduodenectomy.",
  steps: [
    {
      action: "If the cancer is resectable and the person is well enough, offer surgery rather than placing a biliary stent first, even with jaundice",
      why: "NICE prefers going straight to the operation for people who are well enough for it and not in a trial that requires drainage.",
      source: "nice-ng85",
      quote: "Offer resectional surgery rather than preoperative biliary drainage to people who:",
      grade: "Not graded (NICE NG85 1.7.1, 'offer')",
    },
    {
      action: "Avoid draining the bile duct before surgery unless decompression is needed: bilirubin above 250 micromol/l, cholangitis, or neoadjuvant treatment",
      why: "The guideline found that drainage before the operation leads to more complications afterwards, such as wound infection, with no change in death rates. For people having chemotherapy first it calls drainage a necessity.",
      source: "eras-pd-2019",
      quote: "Preoperative biliary drainage increases postoperative complications without change in mortality rates.",
      grade: "Evidence level: High; recommendation grade for no preoperative drainage: Strong",
    },
    {
      action: "If drainage is needed in a person with resectable cancer and jaundice who is not yet fit enough for surgery, offer an endoscopically placed self-expanding metal stent (NICE)",
      why: "Some people need the jaundice relieved before surgery. NICE names the metal stent; the ERAS guideline found neither plastic nor metal stents better for complications after the operation.",
      source: "nice-ng85",
      quote: "If biliary drainage is needed in a person who has resectable pancreatic cancer and obstructive jaundice and is not yet fit enough for resectional surgery, offer endoscopically placed self‑expanding metal stents.",
      grade: "Not graded (NICE NG85 1.7.3, 'offer')",
    },
    {
      action: "Where time allows, start a prehabilitation programme 3 to 6 weeks before surgery",
      why: "Exercise, nutrition and help with anxiety before major surgery seem to reduce complications; the guideline says more data are needed in people having this operation.",
      source: "eras-pd-2019",
      quote: "To be effective, a prehabilitation program should be initiated at least 3–6 weeks before surgery.",
      grade: "Evidence level: Moderate; grade of recommendation: Strong",
    },
    {
      action: "Advise stopping smoking at least 4 weeks before surgery",
      why: "Trials found fewer complications when smoking stopped 4 to 8 weeks before an operation; the guideline says the best length of time is unclear.",
      source: "eras-pd-2019",
      quote: "At least 4 weeks of preoperative smoking cessation is suggested to decrease wound healing complications and respiratory complications.",
      grade: "Evidence level: Smoking cessation: moderate; grade of recommendation: Strong",
    },
    {
      action: "Give preoperative nutritional support to people with severe weight loss (more than 15%, or BMI below 18.5 kg/m²), by the gut where possible; do not give it as a general measure",
      why: "Most people with pancreatic cancer have lost weight before surgery. The guideline recommends feeding up for severe loss, while saying it remains unproven that this reduces complications.",
      source: "eras-pd-2019",
      quote: "In malnourished patients requiring nutritional support before surgery, the enteral feeding through a nasogastric or nasojejunal feeding tube should be the preferred route of administration rather than total parenteral nutrition.",
      grade: "Level of evidence: more than 15% weight loss: High; grade of recommendation: Strong",
    },
    {
      action: "Consider pancreatic enzyme replacement (enteric-coated pancreatin) before and after resection",
      why: "The capsules replace the digestive enzymes the pancreas normally makes. NICE lists this under nutritional management.",
      source: "nice-ng85",
      quote: "Consider enteric-coated pancreatin before and after pancreatic cancer resection.",
      grade: "Not graded (NICE NG85 1.6.2, 'consider')",
    },
    {
      action: "Limit fasting to 6 hours for solids and 2 hours for liquids before surgery, unless there is gastric outlet obstruction or diabetes with neuropathy",
      why: "People with a blocked stomach outlet or diabetic nerve damage are at risk of aspiration and are excluded. NICE likewise says people may drink clear fluids until 2 hours before an operation.",
      source: "eras-pd-2019",
      quote: "Preoperative fasting can be limited to 6 h for solids and 2 h for liquids in patients without specific risk factors (i.e., gastric outlet obstruction, diabetes with severe neuropathy)",
      grade: "Evidence level: Moderate; grade of recommendation: Strong",
    },
    {
      action: "Offer a carbohydrate drink the evening before and 2 hours before surgery",
      why: "The drinks are safe and lessen thirst and anxiety; the guideline says an effect on complications remains to be shown. NICE says to consider them before major abdominal surgery.",
      source: "eras-pd-2019",
      quote: "Carbohydrate loading is safe and may have some beneficial effects.",
      grade: "Evidence level: Moderate; grade of recommendation: Strong",
    },
    {
      action: "Give a single intravenous antibiotic dose less than 60 minutes before the skin incision, repeat it during long operations, and do not continue prophylaxis afterwards",
      why: "Wound infection follows 7 to 17 in 100 of these operations. Where a biliary stent is in place the guideline asks for a bile culture during surgery, so that antibiotics can be continued as treatment if it grows bacteria.",
      source: "eras-pd-2019",
      quote: "Single-dose intravenous antibiotics should be administered less than 60 min before skin incision.",
      grade: "Evidence level: High; grade of recommendation: Strong",
    },
    {
      action: "Start heparin (LMWH or UFH) 2 to 12 hours before surgery, continue until discharge, and extend to 4 weeks after pancreatoduodenectomy for cancer; add mechanical measures",
      why: "This operation carries a high risk of clots in the legs and lungs. The guideline grades mechanical measures (stockings, compression devices) lower: evidence Low, recommendation Weak.",
      source: "eras-pd-2019",
      quote: "LMWH or UFH reduces the risk of VTE complications and should be started 2–12 h before surgery and continued until hospital discharge.",
      grade: "Evidence level: High; grade of recommendation: Strong",
    },
    {
      action: "Keep the patient warm: start active warming before anaesthesia if temperature is below 36°C, and keep it above 36°C during the operation",
      why: "Getting cold can increase blood loss, heart rhythm problems and wound infection.",
      source: "eras-pd-2019",
      quote: "Hypothermia may increase patients’ susceptibility to wound infections by causing vasoconstriction and impaired immunity [159].",
      grade: "Evidence level: High; recommendation grade: Strong",
    },
    {
      action: "Use multimodal, opioid-sparing pain relief; for open surgery use a thoracic epidural or, as an alternative, continuous wound infiltration through a preperitoneal catheter",
      why: "An epidural relieves pain better than opioids into a vein but can cause low blood pressure. In one trial wound catheters showed no significant difference in a combined measure of pain, opioid side effects and satisfaction, with less need for blood pressure drugs.",
      source: "eras-pd-2019",
      quote: "Continuous wound infiltration through preperitoneal catheter is an alternative to epidural for open PD.",
      grade: "Wound catheter: Evidence level: High; recommendation grade: Strong. Thoracic epidural and multimodal strategy: Moderate; Strong",
    },
    {
      action: "Remove a nasogastric tube placed during surgery before the end of the anaesthetic; do not keep one in routinely",
      why: "A nose tube is uncomfortable, and keeping one in after surgery does not improve outcomes.",
      source: "eras-pd-2019",
      quote: "Keeping with the previous guidelines, nasogastric tubes placed during the surgery should be removed before the end of the anesthesia.",
      grade: "Level of evidence: Moderate; grade of recommendation: Strong",
    },
    {
      action: "Remove the abdominal drain early, at 72 hours, when the amylase in the drain fluid on day 1 is below 5000 U/L",
      why: "In a randomised trial, early removal in people at low risk of a leak from the pancreas join was followed by fewer leaks and fewer abdominal and chest complications. The guideline says routine drain placement 'might be recommended' while the evidence on leaving no drain conflicts.",
      source: "eras-pd-2019",
      quote: "Due to controversial data for non-drainage regimen in pancreatic surgery, a conservative approach with systematic postoperative drainage and early removal in patients at low risk of POPF might be recommended until data that are more distinct will be available.",
      grade: "Early removal: Evidence level: High; grade of recommendation: Strong",
    },
    {
      action: "Allow a normal diet after surgery, without restrictions, as tolerated",
      why: "Trials found an early normal diet safe, even with delayed stomach emptying or a pancreatic leak. Extra feeding is decided person by person, by the gut where possible.",
      source: "eras-pd-2019",
      quote: "Patients should be allowed a normal diet after surgery without restrictions according to tolerance.",
      grade: "Evidence level: Early diet according to tolerance: moderate; grade of recommendation: Strong",
    },
    {
      action: "If the gut is working, offer early enteral nutrition (by mouth or tube) rather than feeding into a vein",
      why: "NICE prefers feeding through the gut to intravenous feeding after this operation.",
      source: "nice-ng85",
      quote: "For people who have had pancreatoduodenectomy and who have a functioning gut, offer early enteral nutrition (including oral and tube feeding) rather than parenteral nutrition.",
      grade: "Not graded (NICE NG85 1.6.4, 'offer')",
    },
    {
      action: "Encourage early, active mobilisation from the day of surgery",
      why: "Bed rest is linked with muscle loss, clots and insulin resistance. The guideline found no evidence for a particular programme or daily target.",
      source: "eras-pd-2019",
      quote: "Early and active mobilization should be encouraged from day 0.",
      grade: "Evidence level: Low; grade of recommendation: Strong",
    },
    {
      action: "Audit compliance with the pathway and outcomes regularly, and feed the results back to the team",
      why: "Audit and feedback are linked with better compliance and outcomes; a 2023 meta-analysis found higher compliance went with shorter stays and fewer complications.",
      source: "eras-pd-2019",
      quote: "Regular audit and feedback based on an electronic database are essential components of ERAS and are associated with improved compliance and outcome.",
      grade: "Evidence level: Moderate; grade of recommendation: Strong",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society pancreatoduodenectomy recommendations (2019, published 2020) are the current specialty standard, and no newer edition was found. Their strong recommendations on high evidence are: no preoperative biliary drainage unless decompression is needed, nutritional intervention for severe weight loss, no immunonutrition, timed antibiotic prophylaxis, heparin thromboprophylaxis extended to 4 weeks after surgery for cancer, avoiding hypothermia, a wound catheter as an alternative to epidural, and early drain removal on a low day 1 drain amylase. NICE NG85 (2018, last reviewed 2025) agrees that fit people with resectable cancer and jaundice should go to surgery rather than have drainage first. The two differ on the exceptions (NICE: not yet fit enough for surgery; ERAS: bilirubin above 250 micromol/l, cholangitis, neoadjuvant treatment) and on the stent (NICE offers a self-expanding metal stent; ERAS found neither plastic nor metal superior for postoperative complications). NICE adds pancreatic enzyme replacement before and after resection, which is not an ERAS item, and both prefer feeding by the gut.",
    sources: ["eras-pd-2019", "nice-ng85"],
  },
  variants: [
    {
      name: "No drain after pancreatoduodenectomy",
      differs: "Omits the intraperitoneal drain, for everyone or for people at low risk of a pancreatic leak.",
      evidence: "The ERAS guideline calls the evidence conflicting: of three randomised trials, two (179 and 395 patients) found fewer leaks or collections without a drain, and one (137 patients) was stopped early for more leaks and a fourfold increase in mortality without one. It grades a selective no-drain regimen evidence Moderate, recommendation Weak. Longo et al. (2024) report that more recent literature gives no clear evidence for a no-drain approach.",
      sources: ["eras-pd-2019", "longo-2024"],
    },
    {
      name: "Prophylactic somatostatin analogues (octreotide, pasireotide)",
      differs: "Gives a somatostatin analogue around surgery to reduce pancreatic fistula.",
      evidence: "The ERAS guideline says systematic use cannot be recommended because trial results have not been validated (evidence Moderate, recommendation Weak). It cites a 2013 Cochrane review (21 trials, 2348 patients) in which fistulas were fewer but clinically significant fistulas and deaths were not, and one single-centre, industry-sponsored trial of pasireotide in 300 patients with fewer clinically significant fistulas, leaks or abscesses. Longo et al. report NCCN as saying octreotide does not appear to reduce fistula rates.",
      sources: ["eras-pd-2019", "longo-2024"],
    },
    {
      name: "Thoracic epidural, wound catheter or TAP block",
      differs: "Units differ in which regional technique they use for open pancreatoduodenectomy.",
      evidence: "The ERAS guideline recommends thoracic epidural (evidence Moderate, Strong) and continuous preperitoneal wound infiltration as an alternative (evidence High, Strong), and says no recommendation can be drawn for TAP block because no study in pancreatic surgery within enhanced recovery was available. Longo et al. also say TAP block is not currently recommended in pancreatic surgery.",
      sources: ["eras-pd-2019", "longo-2024"],
    },
    {
      name: "Laparoscopic or robot-assisted pancreatoduodenectomy",
      differs: "Performs the operation by a minimally invasive approach.",
      evidence: "The 2019 ERAS guideline says laparoscopic pancreatoduodenectomy should only be performed in highly experienced, high-volume centres and within strict protocols, with safety still a concern (evidence Moderate, Strong); one multicentre trial was stopped early for safety. It found insufficient evidence to assess the robot-assisted operation and did not recommend it (evidence Low, Weak). Its literature search ended in December 2018.",
      sources: ["eras-pd-2019"],
    },
  ],
  grades: [
    { claim: "27 ERAS items, GRADE, Delphi-validated", grade: "GRADE; consensus after three Delphi rounds", source: "eras-pd-2019", quote: "Consensus among experts was reached after three rounds." },
    { claim: "The five items the guideline names as having the highest level of evidence", grade: "Highest level of evidence (abstract)", source: "eras-pd-2019", quote: "The highest level of evidence was available for five items: avoiding hypothermia, use of wound catheters as an alternative to epidural analgesia, antimicrobial and thromboprophylaxis protocols and preoperative nutritional interventions for patients with severe weight loss (> 15%)." },
    { claim: "No drain against a drain", grade: "Selective no-drain regimen: Evidence level: Moderate; grade of recommendation: Weak", source: "eras-pd-2019", quote: "There is conflicting evidence on a no-drain approach in pancreatic surgery." },
    { claim: "Somatostatin analogues not for systematic use", grade: "Evidence level: Moderate; grade of recommendation: Weak", source: "eras-pd-2019", quote: "The systematic use of somatostatin analogues to reduce clinically significant POPF cannot be recommended because trial results have not been validated yet" },
    { claim: "Immunonutrition", grade: "Evidence level: High; grade of recommendation: Strong", source: "eras-pd-2019", quote: "Immunonutrition is not recommended." },
    { claim: "Multimodal opioid-sparing analgesia after surgery", grade: "Evidence Level: Moderate; recommendation grade: Strong", source: "eras-pd-2019", quote: "A postoperative multimodal opioid sparing strategy tailored to each institutional expertise is strongly recommended." },
    { claim: "ERAS versus traditional care in pancreatoduodenectomy", grade: "Systematic review and meta-analysis", source: "meta-pd-2023", quote: "This review demonstrated that ERAS is safe and feasible in pancreaticoduodenectomy, improves clinical outcome such as LOS, complications, DGE and mortality rates, without changing readmissions and reoperations, while delivering significant cost savings." },
    { claim: "Higher compliance and outcomes", grade: "Systematic review and meta-analysis (3 randomised trials, 28 cohort studies)", source: "meta-pd-2023", quote: "Higher compliance is associated with better clinical outcomes, especially LOS and complications." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Carbohydrate drinks before abdominal major or complex surgery", grade: "Not graded (NICE NG180 1.4.2, 'consider')", source: "nice-ng180", quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery." },
  ],
  sources: [
    {
      key: "eras-pd-2019",
      label: "Guidelines for Perioperative Care for Pancreatoduodenectomy: Enhanced Recovery After Surgery (ERAS) Recommendations 2019 (Melloul et al.)",
      publisher: "ERAS Society (World Journal of Surgery)",
      year: 2020,
      url: "https://doi.org/10.1007/s00268-020-05462-w",
      doi: "10.1007/s00268-020-05462-w",
      gradingScheme: "GRADE evidence level (high, moderate, low or very low) and a grade of recommendation (strong or weak) for each of 27 items; recommendations validated by a three-round Delphi process.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "longo-2024",
      label: "Enhanced Recovery After Surgery (ERAS) in Pancreatic Surgery: The Surgeon's Point of View (Longo et al.)",
      publisher: "Journal of Clinical Medicine",
      year: 2024,
      url: "https://doi.org/10.3390/jcm13206205",
      doi: "10.3390/jcm13206205",
      gradingScheme: "Narrative review; reports ERAS recommendations in its own words without their grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "meta-pd-2023",
      label: "Costs and clinical benefits of enhanced recovery after surgery (ERAS) in pancreaticoduodenectomy: an updated systematic review and meta-analysis",
      publisher: "Journal of Cancer Research and Clinical Oncology",
      year: 2023,
      url: "https://doi.org/10.1007/s00432-022-04508-x",
      doi: "10.1007/s00432-022-04508-x",
      gradingScheme: "Systematic review and meta-analysis of studies 2000 to 2021; no recommendation grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng85",
      label: "Pancreatic cancer in adults: diagnosis and management (NG85), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng85/chapter/Recommendations",
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
  cancers: ["pancreatic"],
  drugs: ["pancrelipase"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition", "self-expanding-metal-stents"],
  terms: ["whipple", "eating-after-whipple", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "On 17 November 2026 the full text of the ERAS Society pancreatoduodenectomy recommendations (2019) was read for the first time, from the publisher's PDF held openly in the Amsterdam UMC research repository; the publisher's own page is behind a subscription. The steps, grades and variants now use the guideline's words. Its literature search ended in December 2018, and Europe PMC searches on the same day found no newer ERAS Society edition for this operation.",
    "The guideline is not consistent with itself in three places. Its table says carbohydrate loading 'is recommended' while the text says it 'is safe and may have some beneficial effects'. Its text lists pruritus among the reasons for biliary drainage and its table does not. It recommends preoperative nutritional intervention on evidence it grades High while saying it remains unproven that such support reduces complications.",
    "The guideline's items on counselling, anxiolytic and pain premedication, nausea prophylaxis, blood glucose, fluid balance, urinary catheters, delayed gastric emptying and drugs to stimulate the bowel are not written as steps here.",
    "The guideline's carbohydrate drink advice gives timing (the evening before and 2 hours before surgery) but no volume, and it names no heparin dose. Doses (enzymes, analgesia, antibiotics, thromboprophylaxis) are in product information and local protocols and are not reproduced here.",
    "Longo et al. (2024) note that only a limited number of ERAS recommendations rest on multicentre randomised trials, with a substantial portion based on retrospective series; the 2023 meta-analysis found only 3 randomised trials of the pathway as a whole.",
    "Whether to drain at all, and whether somatostatin analogues help, remain unsettled; trials published after 2018 are not reflected in the guideline.",
    "NICE NG85 notes that supplies of pancreatic enzyme replacement were disrupted from September 2024, so availability varies. NICE last reviewed NG85 on 17 September 2025, adding links and removing general recommendations covered elsewhere; the recommendations quoted here kept their numbers.",
  ],
});
