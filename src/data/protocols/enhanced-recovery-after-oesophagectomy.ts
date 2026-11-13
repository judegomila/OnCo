import { protocol } from "./helpers";

/*
 * Enhanced recovery after oesophagectomy, the operation to remove the oesophagus (most often for oesophageal or
 * gastro-oesophageal junction cancer).
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society guidelines for perioperative care in esophagectomy (Low et al., World J Surg 2019, online 2018):
 *   abstract only, through Europe PMC. This is still the current edition: a Europe PMC title search for 2018 to 2026
 *   found no newer ERAS Society oesophagectomy guideline. The full text is not open in PubMed Central; the publisher's
 *   PDF and the ERAS Society's site both refused a script (a JavaScript challenge and a hosting block), and were not
 *   got round.
 * - Halliday and Moorthy, "Guide to Enhanced Recovery for Cancer Patients Undergoing Surgery: ERAS and Oesophagectomy"
 *   (Ann Surg Oncol 2022, online 2021): full text, Europe PMC XML (PMC8677631), CC BY 4.0. Its Table 1 summarises the
 *   oesophagectomy-specific recommendations of the 2019 ERAS guideline; it does not print their grades. Every step
 *   below that rests on the ERAS guideline is quoted from this table, and is a summary, not the guideline's own words.
 * - NICE NG83, Oesophago-gastric cancer: assessment and management in adults (2018): recommendations page, full text.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text (already read in this round for the
 *   liver protocol).
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterOesophagectomy = protocol({
  id: "enhanced-recovery-after-oesophagectomy",
  name: "Enhanced recovery after oesophagectomy (ERAS pathway for oesophageal cancer surgery)",
  aka: ["ERAS oesophagectomy", "ERAS esophagectomy", "enhanced recovery esophagectomy", "fast-track oesophagectomy", "perioperative care for oesophagectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover from removal of the oesophagus: dietitian support, getting fitter beforehand, treating low iron, a short fast, keyhole surgery where the team is trained in it, an epidural for pain, early tube or mouth feeding, getting out of bed early, removing tubes once no longer needed, and four weeks of clot prevention.",
  simple: "Before the operation you will see a dietitian, be helped to get fitter and stop smoking, and can eat until six hours and drink clear fluids until two hours before. Afterwards you will be fed early, often through a small feeding tube, helped out of bed early, and given injections against clots for four weeks.",
  summary: "The ERAS Society guideline for esophagectomy (2019; 39 items, each graded by GRADE) is the current specialty standard; its full text could not be read here, so its oesophagectomy-specific items are taken from the summary table in Halliday and Moorthy (Ann Surg Oncol 2022), which does not print grades. Items: nutrition assessment and treatment by individual risk with no routine immunonutrition; oral iron for iron-deficiency anaemia; multimodal prehabilitation; surgery 3 to 6 weeks after neoadjuvant chemotherapy or 6 to 10 weeks after neoadjuvant radiotherapy; no routine bowel preparation; solids until 6 hours (with caution in dysphagia) and clear fluids until 2 hours before; minimally invasive surgery where there is training and expertise; gastric conduit first line; nasogastric decompression of the conduit (unlike most ERAS pathways, which avoid routine nasogastric tubes); a single chest drain; balanced crystalloid; lung-protective ventilation; core temperature above 36 °C; level of postoperative care set by individual risk; thoracic epidural first line with paravertebral block as an alternative; early enteral feeding reaching full calories by day 3 to 6 by jejunostomy or nasojejunal tube; mobilisation from the day of surgery if feasible; chest drain removal below 200 ml a day without air or chyle leak; avoiding positive fluid balance; glucose below 10 mmol/l; and VTE prophylaxis for 4 weeks. Elements associated with a shorter stay in a meta-analysis cited there include immediate extubation, mobilisation by day 1, urinary catheter out by day 2 and oral fluids by day 1. NICE NG83 (2018) offers specialist dietetic support before, during and after radical treatment, and immediate enteral or parenteral nutrition after surgery.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "Adults having elective oesophagectomy, open, hybrid or minimally invasive, most often for oesophageal or gastro-oesophageal junction cancer after neoadjuvant chemotherapy or chemoradiotherapy. The ERAS guideline is written for oesophageal resection; stomach-only operations have their own ERAS gastrectomy guideline.",
  trigger: "A decision to remove the oesophagus.",
  steps: [
    {
      action: "Assess nutrition before surgery and give tailored specialist dietetic support before, during and after treatment",
      why: "Many people with oesophageal cancer have lost weight because swallowing is hard, and poor nutrition raises the risk of complications.",
      source: "nice-ng83",
      quote: "Offer nutritional assessment and tailored specialist dietetic support to people with oesophago‑gastric cancer before, during and after radical treatments.",
      grade: "Not graded (NICE NG83 1.6.1, 'offer')",
    },
    {
      action: "Base nutritional treatment on individual risk, and do not give immunonutrition routinely",
      why: "Feeding support helps those at risk; special immune-boosting drinks have not been shown to help everyone.",
      source: "guide-oes-2022",
      quote: "Assessment and treatment based on individual risk; routine use of immunonutrition is not recommended",
    },
    {
      action: "Treat iron-deficiency anaemia with oral iron before surgery",
      why: "Anaemia raises the chance of needing a blood transfusion and of complications.",
      source: "guide-oes-2022",
      quote: "Oral iron supplementation for iron-deficiency anaemia",
    },
    {
      action: "Offer multimodal prehabilitation: an exercise programme, personalised nutritional support and psychological support",
      why: "Chemotherapy before surgery reduces fitness; getting fitter before the operation may help recovery.",
      source: "guide-oes-2022",
      quote: "Multimodal prehabilitation: exercise programme, personalised nutritional support, psychological support",
    },
    {
      action: "Plan surgery 3 to 6 weeks after neoadjuvant chemotherapy, or 6 to 10 weeks after neoadjuvant radiotherapy",
      why: "This gives the body time to recover from treatment without letting the cancer grow back.",
      source: "guide-oes-2022",
      quote: "3–6 weeks after neoadjuvant chemotherapy or 6–10 weeks after neoadjuvant radiotherapy",
    },
    {
      action: "Do not use routine bowel preparation; allow solid food until 6 hours and clear fluids until 2 hours before surgery, with caution if swallowing is difficult",
      why: "Long fasting leaves people thirsty and weaker; food can stay in a narrowed oesophagus, which is why dysphagia needs care.",
      source: "guide-oes-2022",
      quote: "Solid food allowed until 6 h prior to surgery (caution if any dysphagia); clear fluids until 2 h prior to surgery",
    },
    {
      action: "Use minimally invasive surgery where the team has the training and expertise",
      why: "Keyhole and hybrid approaches can reduce lung complications in experienced hands; open, hybrid and minimally invasive approaches all have acceptable outcomes.",
      source: "guide-oes-2022",
      quote: "Recommended where there is appropriate training and expertise",
    },
    {
      action: "Decompress the new stomach tube (conduit) with a nasogastric tube, and place a single chest drain rather than two",
      why: "After oesophagectomy the stomach is pulled up into the chest, and a nasogastric tube keeps it from swelling; one drain works as well as two and hurts less.",
      source: "guide-oes-2022",
      quote: "Single drain as effective as two and produces less discomfort",
    },
    {
      action: "Keep core temperature above 36 °C during the operation",
      why: "Getting cold during surgery raises the risk of infection, bleeding and heart problems.",
      source: "guide-oes-2022",
      quote: "Maintain core temperature > 36 °C",
    },
    {
      action: "Use a thoracic epidural as first-line pain relief, with a paravertebral block as the alternative",
      why: "Good pain relief lets people breathe deeply, cough and get up, which protects the lungs.",
      source: "guide-oes-2022",
      quote: "Thoracic epidural as first line; paravertebral blocks are an alternative",
    },
    {
      action: "Start enteral or parenteral nutrition immediately after surgery",
      why: "After oesophagectomy eating by mouth takes time to build up, and early feeding supports healing.",
      source: "nice-ng83",
      quote: "Offer immediate enteral or parenteral nutrition after surgery to people who are having radical surgery for oesophageal and gastro-oesophageal junction cancers.",
      grade: "Not graded (NICE NG83 1.6.2, 'offer')",
    },
    {
      action: "Feed into the gut early, by jejunostomy or nasojejunal tube, aiming for full calorie needs by day 3 to 6",
      why: "Feeding through the gut is safer than through a vein and helps the bowel recover.",
      source: "guide-oes-2022",
      quote: "Early enteral feeding; aim to achieve full calorie requirements by day 3–6; either jejunostomy or nasojejunal tube may be used",
    },
    {
      action: "Mobilise from the day of surgery if feasible, with set daily increases in activity",
      why: "Moving early reduces chest infections, clots and muscle loss.",
      source: "guide-oes-2022",
      quote: "Early mobilisation with defined daily incremental increases in activity; start on day of surgery if feasible",
    },
    {
      action: "Remove chest drains once they drain less than 200 ml a day with no air or chyle leak; avoid a positive fluid balance and keep blood glucose below 10 mmol/l",
      why: "Drains left in longer slow recovery; too much fluid strains the lungs and the join; high blood sugar raises infection risk.",
      source: "guide-oes-2022",
      quote: "Remove once draining < 200 ml/day and no evidence of air or chyle leak",
    },
    {
      action: "Continue blood clot prevention for 4 weeks after surgery",
      why: "The risk of clots after major cancer surgery lasts for weeks after leaving hospital.",
      source: "guide-oes-2022",
      quote: "Continue for 4 weeks after surgery",
    },
    {
      action: "Monitor compliance with each element in real time and audit outcomes continuously",
      why: "Compliance with oesophagectomy pathways varies widely, and units that measure it can improve it.",
      source: "guide-oes-2022",
      quote: "Real-time monitoring of compliance should be used to provide a continuous audit of implementation",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society esophagectomy guideline (2019) is the current specialty standard, graded item by item; it is read here through its abstract and an open summary of its oesophagectomy-specific items (Halliday and Moorthy 2022), so the grades are not reproduced. Two items differ from most ERAS pathways and are deliberate: nasogastric decompression of the gastric conduit is recommended, and thoracic epidural stays first line for analgesia. NICE NG83 (2018) agrees on nutrition: specialist dietetic support throughout and immediate enteral or parenteral feeding after surgery. NICE NG180 (2020) offers an enhanced recovery programme to everyone having elective major surgery and allows clear fluids until 2 hours before.",
    sources: ["eras-oes-2019", "guide-oes-2022", "nice-ng83", "nice-ng180"],
  },
  variants: [
    {
      name: "Route of early feeding: jejunostomy or nasojejunal tube",
      differs: "Some centres place a feeding jejunostomy at operation; others use a nasojejunal tube; some start oral intake early.",
      evidence: "The ERAS summary allows either tube, and there is insufficient evidence to recommend one route for postoperative enteral feeding (Halliday and Moorthy 2022).",
      sources: ["guide-oes-2022"],
    },
    {
      name: "Level of postoperative care",
      differs: "Some centres send every patient to intensive care or high dependency after oesophagectomy; others go straight to a surgical unit.",
      evidence: "The ERAS summary says the level of care should be personalised according to individual risk; the guide notes the two pathways involve different teams and practices.",
      sources: ["guide-oes-2022"],
    },
    {
      name: "Elements without enough evidence to recommend",
      differs: "Routine preoperative cardiopulmonary exercise testing, inspiratory muscle training and intraoperative pyloroplasty are used in some centres.",
      evidence: "There is insufficient evidence to recommend any of them (Halliday and Moorthy 2022, citing the ERAS guideline).",
      sources: ["guide-oes-2022"],
    },
  ],
  grades: [
    { claim: "The ERAS guideline graded 39 sections by GRADE", grade: "GRADE (individual grades not read)", source: "eras-oes-2019", quote: "Thirty-nine sections were ultimately produced and assessed for quality of evidence and recommendations." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
    { claim: "Elements associated with a shorter hospital stay", grade: "Meta-analysis finding cited by the guide, not a graded recommendation", source: "guide-oes-2022", quote: "The presence of the following elements within the ERAS protocol is significantly associated with a reduction in length of stay after oesophagectomy: immediate extubation, mobilisation ≤ 1 day after surgery, removal of urinary catheter ≤ 2 days, commencing oral intake of fluid ≤ 1 day, enteral supplemental feeding ≤ 1 day, removal of epidural ≤ 4 days, and performing a contrast swallow ≤ 5 days." },
    { claim: "Nasogastric decompression of the conduit", grade: "Not printed in the summary read", source: "guide-oes-2022", quote: "Nasogastric tube decompression is recommended" },
    { claim: "Compliance with oesophagectomy ERAS pathways", grade: "Observational range cited by the guide", source: "guide-oes-2022", quote: "Compliance with ERAS protocols for oesophagectomy patients ranges from 56% to 78%, with up to 20% of patients having a major protocol deviation." },
  ],
  sources: [
    {
      key: "eras-oes-2019",
      label: "Guidelines for Perioperative Care in Esophagectomy: Enhanced Recovery After Surgery (ERAS) Society Recommendations",
      publisher: "ERAS Society (World Journal of Surgery)",
      year: 2019,
      url: "https://doi.org/10.1007/s00268-018-4786-4",
      doi: "10.1007/s00268-018-4786-4",
      gradingScheme: "GRADE: quality of evidence and an overall recommendation for each of 39 sections (individual grades not read here).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "guide-oes-2022",
      label: "Guide to Enhanced Recovery for Cancer Patients Undergoing Surgery: ERAS and Oesophagectomy (Halliday and Moorthy)",
      publisher: "Annals of Surgical Oncology",
      year: 2022,
      url: "https://doi.org/10.1245/s10434-021-10384-5",
      doi: "10.1245/s10434-021-10384-5",
      gradingScheme: "Narrative review; its Table 1 summarises the ERAS 2019 oesophagectomy-specific recommendations without their grades.",
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
  cancers: ["esophageal", "oesophageal-adenocarcinoma", "oesophageal-squamous-cell-carcinoma"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition"],
  terms: ["oesophagectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full text of the ERAS Society esophagectomy guideline (2019) could not be read: it is not open in PubMed Central, and the publisher and the ERAS Society site refused a script. The grade of each item is therefore not given here; the items come from an open summary table, not the guideline's own words.",
    "The ERAS guideline rests on evidence to about 2017. No newer ERAS Society oesophagectomy guideline was found in a Europe PMC search to November 2026, though prehabilitation and minimally invasive surgery evidence has grown since.",
    "The best route for postoperative enteral feeding, and the value of routine cardiopulmonary exercise testing, inspiratory muscle training and pyloroplasty, are not settled (Halliday and Moorthy 2022).",
    "Analgesic and anaesthetic doses and ventilator settings are in the guideline and local protocols and are not reproduced here.",
  ],
});
