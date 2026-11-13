import { protocol } from "./helpers";

/*
 * Enhanced recovery after pancreatoduodenectomy (the Whipple operation), most often for cancer of the head of the
 * pancreas, the ampulla, the lower bile duct or the duodenum.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society guidelines for perioperative care for pancreatoduodenectomy, 2019 recommendations (Melloul et al.,
 *   World J Surg 2020): abstract only, through Europe PMC. This is the current edition (it updated the 2012 guideline);
 *   a Europe PMC search for 2019 to 2026 found no newer ERAS Society edition. The full text is not open in PubMed
 *   Central; the publisher's PDF returned a JavaScript challenge and the ERAS Society site refused a script. Neither was
 *   got round.
 * - Longo et al., "Enhanced Recovery After Surgery (ERAS) in Pancreatic Surgery: The Surgeon's Point of View" (J Clin
 *   Med 2024): full text, Europe PMC XML (PMC11508928). A narrative review that reports several of the 2019 ERAS
 *   recommendations in its own words; steps resting on it say so.
 * - Cost and clinical benefit of ERAS in pancreatoduodenectomy, systematic review and meta-analysis (J Cancer Res Clin
 *   Oncol 2023): abstract read (full text downloaded, PMC10356629).
 * - NICE NG85, Pancreatic cancer in adults (2018, with a 2024 supply note): recommendations page, full text.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterPancreatoduodenectomy = protocol({
  id: "enhanced-recovery-after-pancreatoduodenectomy",
  name: "Enhanced recovery after pancreatoduodenectomy (ERAS pathway for the Whipple operation)",
  aka: ["ERAS Whipple", "ERAS pancreatoduodenectomy", "ERAS pancreaticoduodenectomy", "enhanced recovery pancreatic surgery", "fast-track Whipple"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover from the Whipple operation: going straight to surgery rather than having a bile duct stent first where safe, extra nutrition after much weight loss, enzyme capsules, keeping warm, good pain relief, antibiotics and clot prevention, the nose tube out at the end of the operation, removing the drain early when safe, and eating early.",
  simple: "If you are well enough, you will usually go straight to the operation rather than having a stent put in first. You may be given enzyme capsules to help digest food. After the operation you will be helped to eat early and get up, and tubes will come out as soon as it is safe.",
  summary: "The ERAS Society pancreatoduodenectomy recommendations (2019, published 2020; 27 items, GRADE, validated by a three-round Delphi) are the current specialty standard; only their abstract could be read. The abstract names the five items with the highest level of evidence: avoiding hypothermia, wound catheters as an alternative to epidural analgesia, antimicrobial prophylaxis, thromboprophylaxis, and preoperative nutritional intervention for severe weight loss (more than 15%). A narrative review (Longo et al. 2024) reports further ERAS items: preoperative biliary drainage is not routinely necessary, but is recommended for high bilirubin (above 15 mg/dl), neoadjuvant chemotherapy or recurrent cholangitis; a drain with early removal within 72 hours where drain amylase on day 1 is below 5000 U/l; the nasogastric tube removed in theatre; somatostatin analogues not routine. NICE NG85 (2018) offers resection rather than preoperative biliary drainage to fit patients with resectable cancer and jaundice, metal stents if drainage is needed, considers pancreatic enzyme replacement before and after resection, and offers early enteral rather than parenteral nutrition after pancreatoduodenectomy. A 2023 meta-analysis (3 randomised trials, 28 cohorts) found ERAS reduced stay, complications, delayed gastric emptying and cost without more readmissions, with better outcomes at higher compliance.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "Adults having elective pancreatoduodenectomy (Whipple or pylorus-preserving), most often for pancreatic ductal adenocarcinoma, ampullary, distal bile duct or duodenal cancer, including after neoadjuvant chemotherapy. The ERAS guideline is written for pancreatoduodenectomy, not for other pancreatic resections.",
  trigger: "A decision to perform pancreatoduodenectomy.",
  steps: [
    {
      action: "If the cancer is resectable and the person is fit, go to surgery rather than placing a biliary stent first, even with jaundice",
      why: "Draining the bile duct before surgery adds complications without improving survival, for people who can have the operation promptly.",
      source: "nice-ng85",
      quote: "Offer resectional surgery rather than preoperative biliary drainage to people who:",
      grade: "Not graded (NICE NG85 1.7.1, 'offer')",
    },
    {
      action: "Where biliary drainage is needed before surgery (not yet fit, very high bilirubin, neoadjuvant chemotherapy, cholangitis), use an endoscopically placed self-expanding metal stent",
      why: "Some people need the jaundice relieved before surgery is safe.",
      source: "nice-ng85",
      quote: "If biliary drainage is needed in a person who has resectable pancreatic cancer and obstructive jaundice and is not yet fit enough for resectional surgery, offer endoscopically placed self‑expanding metal stents.",
      grade: "Not graded (NICE NG85 1.7.3, 'offer')",
    },
    {
      action: "Give preoperative nutritional support to people with severe weight loss (more than 15%)",
      why: "Heavy weight loss is common in pancreatic cancer and raises the risk of complications; feeding beforehand helps.",
      source: "eras-pd-2019",
      quote: "The highest level of evidence was available for five items: avoiding hypothermia, use of wound catheters as an alternative to epidural analgesia, antimicrobial and thromboprophylaxis protocols and preoperative nutritional interventions for patients with severe weight loss (> 15%).",
      grade: "Highest level of evidence in the guideline (grade as printed not read)",
    },
    {
      action: "Consider pancreatic enzyme replacement (enteric-coated pancreatin) before and after resection",
      why: "The pancreas makes the enzymes that digest food; after a Whipple, many people need capsules with meals to absorb fat and keep weight on.",
      source: "nice-ng85",
      quote: "Consider enteric-coated pancreatin before and after pancreatic cancer resection.",
      grade: "Not graded (NICE NG85 1.6.2, 'consider')",
    },
    {
      action: "Allow clear fluids until 2 hours before surgery, and consider a carbohydrate drink",
      why: "Long fasting leaves people thirsty and weaker; a sugary drink before abdominal surgery is safe.",
      source: "nice-ng180",
      quote: "Consider carbohydrate drinks before surgery for people having abdominal major or complex surgery .",
      grade: "Not graded (NICE NG180 1.4.2, 'consider')",
    },
    {
      action: "Keep the patient warm, and use antibiotic prophylaxis and thromboprophylaxis protocols",
      why: "Getting cold raises infection and bleeding risk; antibiotics and clot prevention are among the best-supported elements of the pathway.",
      source: "eras-pd-2019",
      quote: "The highest level of evidence was available for five items: avoiding hypothermia, use of wound catheters as an alternative to epidural analgesia, antimicrobial and thromboprophylaxis protocols and preoperative nutritional interventions for patients with severe weight loss (> 15%).",
      grade: "Highest level of evidence in the guideline (grade as printed not read)",
    },
    {
      action: "Use multimodal pain relief, with either a thoracic epidural or wound catheters as the alternative to an epidural",
      why: "Good pain relief lets people breathe, cough and walk; wound catheters avoid some of the low blood pressure an epidural can cause.",
      source: "eras-pd-2019",
      quote: "The highest level of evidence was available for five items: avoiding hypothermia, use of wound catheters as an alternative to epidural analgesia, antimicrobial and thromboprophylaxis protocols and preoperative nutritional interventions for patients with severe weight loss (> 15%).",
      grade: "Highest level of evidence in the guideline (grade as printed not read)",
    },
    {
      action: "Remove the nasogastric tube in theatre at the end of the operation rather than leaving it in routinely",
      why: "A nose tube is uncomfortable, and trials found no more complications without one.",
      source: "longo-2024",
      quote: "According to ERAS recommendations [ 2 ], the NGT should be removed in the operating room following surgery, and its routine use is not advised.",
      grade: "As reported by a narrative review; the guideline's grade was not read",
    },
    {
      action: "Place a drain at operation and remove it early (within 72 hours) in people at low risk of a pancreatic leak, judged by drain amylase below 5000 U/l on day 1",
      why: "A leak from the pancreas join is the main danger after a Whipple; a drain detects it, and taking it out early when the risk is low avoids drain problems.",
      source: "longo-2024",
      quote: "According to ERAS recommendations [ 2 ], intraoperative drain placement with early removal (within 72 h) is advised for patients at low risk of POPF, identified by drainage amylase levels < 5000 U/L on post-operative day 1.",
      grade: "As reported by a narrative review; the guideline's grade was not read",
    },
    {
      action: "Start eating or tube feeding early after surgery rather than feeding into a vein",
      why: "Feeding through the gut is safer than intravenous feeding and helps the bowel recover.",
      source: "nice-ng85",
      quote: "For people who have had pancreatoduodenectomy and who have a functioning gut, offer early enteral nutrition (including oral and tube feeding) rather than parenteral nutrition.",
      grade: "Not graded (NICE NG85 1.6.4, 'offer')",
    },
    {
      action: "Measure compliance with the pathway and outcomes, and act on them",
      why: "Units that deliver more of the pathway have shorter stays and fewer complications.",
      source: "meta-pd-2023",
      quote: "Higher compliance is associated with better clinical outcomes, especially LOS and complications.",
      grade: "Systematic review and meta-analysis (3 randomised trials, 28 cohort studies)",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society pancreatoduodenectomy recommendations (2019, published 2020) are the current specialty standard, with the highest evidence for avoiding hypothermia, wound catheters as an alternative to epidural, antimicrobial and clot prophylaxis, and nutrition for severe weight loss; only the abstract could be read, so item grades are not given. NICE NG85 (2018) and the ERAS recommendations as reported by Longo et al. agree that preoperative biliary drainage should not be routine for people fit for prompt surgery; they differ in how they define the exceptions (NICE: not yet fit for surgery; ERAS as reported: bilirubin above 15 mg/dl, neoadjuvant chemotherapy or recurrent cholangitis). NICE adds pancreatic enzyme replacement before and after resection and early enteral rather than parenteral feeding.",
    sources: ["eras-pd-2019", "nice-ng85", "longo-2024", "meta-pd-2023"],
  },
  variants: [
    {
      name: "No drain after pancreatoduodenectomy",
      differs: "Omits the intraperitoneal drain altogether.",
      evidence: "Longo et al. (2024) report that recent literature does not give clear evidence for a no-drain approach in pancreatic surgery; ERAS, as they report it, advises a drain with early removal in low-risk patients.",
      sources: ["longo-2024"],
    },
    {
      name: "Prophylactic somatostatin analogues (octreotide, pasireotide)",
      differs: "Gives a somatostatin analogue around surgery to reduce pancreatic fistula.",
      evidence: "As reported by Longo et al., ERAS finds moderate evidence that these may reduce fistula severity but does not recommend routine use; NCCN, as they report it, does not recommend routine octreotide.",
      sources: ["longo-2024"],
    },
    {
      name: "Thoracic epidural as the default analgesia",
      differs: "Uses a thoracic epidural for every open pancreatoduodenectomy.",
      evidence: "The ERAS abstract places wound catheters among the highest-evidence items as an alternative to epidural; Longo et al. describe the epidural's benefits as reported by ERAS, and note that TAP block is not currently recommended in pancreatic surgery for lack of studies.",
      sources: ["eras-pd-2019", "longo-2024"],
    },
  ],
  grades: [
    { claim: "27 ERAS items, GRADE, Delphi-validated", grade: "GRADE; consensus after three Delphi rounds", source: "eras-pd-2019", quote: "Consensus among experts was reached after three rounds." },
    { claim: "Preoperative biliary drainage not always necessary, with stated exceptions", grade: "Reported as strong evidence by a narrative review", source: "longo-2024", quote: "According to ERAS recommendations [ 2 ], there is strong evidence that preoperative biliary drainage is not always necessary, as it appears to increase postoperative complications without offering survival benefits." },
    { claim: "ERAS versus traditional care in pancreatoduodenectomy", grade: "Systematic review and meta-analysis", source: "meta-pd-2023", quote: "This review demonstrated that ERAS is safe and feasible in pancreaticoduodenectomy, improves clinical outcome such as LOS, complications, DGE and mortality rates, without changing readmissions and reoperations, while delivering significant cost savings." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
  ],
  sources: [
    {
      key: "eras-pd-2019",
      label: "Guidelines for Perioperative Care for Pancreatoduodenectomy: Enhanced Recovery After Surgery (ERAS) Recommendations 2019 (Melloul et al.)",
      publisher: "ERAS Society (World Journal of Surgery)",
      year: 2020,
      url: "https://doi.org/10.1007/s00268-020-05462-w",
      doi: "10.1007/s00268-020-05462-w",
      gradingScheme: "GRADE level of evidence for each of 27 items; recommendations validated by a Delphi process (individual grades not read here).",
      read: "abstract",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng85",
      label: "Pancreatic cancer in adults: diagnosis and management (NG85), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng85/chapter/Recommendations",
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
  cancers: ["pancreatic"],
  drugs: ["pancrelipase"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition", "self-expanding-metal-stents"],
  terms: ["whipple", "eating-after-whipple", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full text of the ERAS Society pancreatoduodenectomy recommendations (2019) could not be read: it is not open in PubMed Central, and the publisher and the ERAS Society site refused a script. Item grades are therefore not given, and the drain, nasogastric tube, biliary drainage and somatostatin items are taken from a narrative review's report of them, not the guideline's words.",
    "The evidence behind most items is from cohort studies; the meta-analysis found only 3 randomised trials of the pathway as a whole.",
    "Whether to drain at all, and whether somatostatin analogues help, remain unsettled.",
    "NICE NG85 notes that supplies of pancreatic enzyme replacement were disrupted from September 2024; availability varies.",
    "Doses (enzymes, analgesia, thromboprophylaxis) are in the guidelines, product information and local protocols and are not reproduced here.",
  ],
});
