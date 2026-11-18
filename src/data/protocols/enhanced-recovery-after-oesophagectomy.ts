import { protocol } from "./helpers";

/*
 * Enhanced recovery after oesophagectomy, the operation to remove the oesophagus (most often for oesophageal or
 * gastro-oesophageal junction cancer).
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every quote was checked against it by script (whitespace normalised, XML tags stripped, nothing else).
 * - ERAS Society guidelines for perioperative care in esophagectomy (Low et al., World J Surg 2019, online 2018):
 *   abstract only, through the Europe PMC REST API. Still the current edition: a Europe PMC title search for 2019 to
 *   2026 found no newer ERAS Society oesophagectomy guideline. The full text was tried again: Europe PMC lists no
 *   open copy, the publisher answered 403 with a browser check, and the one repository record OpenAlex lists
 *   (University of Lausanne, a submitted version with no open file recorded) answered with a CAPTCHA. None was got
 *   round.
 * - Halliday and Moorthy, "Guide to Enhanced Recovery for Cancer Patients Undergoing Surgery: ERAS and Oesophagectomy"
 *   (Ann Surg Oncol 2022, online 2021): full text, Europe PMC XML (PMC8677631), CC BY 4.0. Its Table 1 summarises the
 *   oesophagectomy-specific recommendations of the 2019 ERAS guideline; it does not print their grades. Every step
 *   below that rests on the ERAS guideline is quoted from this table, and is a summary, not the guideline's own words.
 * - NICE NG83 (2018, last updated 4 July 2023) and NICE NG180 (2020, minor changes to July 2025): recommendations
 *   pages and update information, full text, re-used from copies a sibling checker fetched from nice.org.uk the same
 *   day.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. The second pass removed reasons the
 * sources do not give (most "why" lines), a comparison with other ERAS pathways that no source read makes, and the
 * word "meta-analysis" for a study the review does not describe that way.
 */
export const enhancedRecoveryAfterOesophagectomy = protocol({
  id: "enhanced-recovery-after-oesophagectomy",
  name: "Enhanced recovery after oesophagectomy (ERAS pathway for oesophageal cancer surgery)",
  aka: ["ERAS oesophagectomy", "ERAS esophagectomy", "enhanced recovery esophagectomy", "fast-track oesophagectomy", "perioperative care for oesophagectomy"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery is a package of care that helps people recover from removal of the oesophagus: dietitian support, getting fitter beforehand, treating low iron, a short fast, keyhole surgery where the team is trained in it, an epidural for pain, early feeding through a feeding tube, getting out of bed early, removing chest drains once they drain little, and four weeks of clot prevention.",
  simple: "Before the operation you will see a dietitian, be helped to get fitter, and be given advice on stopping smoking and alcohol. The guideline allows solid food until six hours and clear fluids until two hours before, with caution if swallowing is difficult, so follow what your own team tells you. Afterwards you will be fed early through a feeding tube, helped out of bed early, and given treatment to prevent clots for four weeks.",
  summary: "The ERAS Society guideline for esophagectomy (2019; 39 items, each graded by GRADE) is the current specialty standard; its full text could not be read here, so its oesophagectomy-specific items are taken from the summary table in Halliday and Moorthy (Ann Surg Oncol 2022), which does not print grades. Items: nutrition assessment and treatment by individual risk with no routine immunonutrition; oral iron for iron-deficiency anaemia; multimodal prehabilitation; surgery 3 to 6 weeks after neoadjuvant chemotherapy or 6 to 10 weeks after neoadjuvant radiotherapy; no routine bowel preparation; solids until 6 hours (with caution in dysphagia) and clear fluids until 2 hours before; minimally invasive surgery where there is training and expertise; gastric conduit first line; nasogastric decompression of the conduit; a single chest drain; a balanced fluid replacement strategy using crystalloid; lung-protective ventilation; core temperature above 36 °C; level of postoperative care set by individual risk; thoracic epidural first line with paravertebral block as an alternative; early enteral feeding aiming for full calorie requirements by day 3 to 6, by jejunostomy or nasojejunal tube; mobilisation from the day of surgery if feasible; chest drain removal below 200 ml a day without air or chyle leak; avoiding positive fluid balance; glucose below 10 mmol/l; and VTE prophylaxis for 4 weeks. Elements associated with a shorter stay in a component analysis cited there (Markar 2017) include immediate extubation, mobilisation within 1 day, urinary catheter out within 2 days and oral fluids within 1 day. The summary names no drug or dose for VTE prophylaxis. In UK guidance, NICE NG83 (2018) offers specialist dietetic support before, during and after radical treatment, and immediate enteral or parenteral nutrition after surgery.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care", "home"],
  },
  population: "People having oesophagectomy for oesophageal cancer by an open, hybrid or minimally invasive approach; many have had neoadjuvant chemotherapy first. The ERAS guideline is written for oesophageal resection; stomach-only operations have their own ERAS gastrectomy guideline. The NICE recommendations cited are UK guidance for adults: NG83 covers oesophageal, gastro-oesophageal junction and gastric cancer and refers to NHS England commissioning policies, and NG180 covers surgery in adults in general.",
  trigger: "A decision to remove the oesophagus.",
  steps: [
    {
      action: "Assess nutrition before surgery and give tailored specialist dietetic support before, during and after treatment",
      why: "NICE recommends this for everyone having radical treatment for oesophago-gastric cancer, so that nutrition is assessed and supported at each stage. The recommendation does not state a reason.",
      source: "nice-ng83",
      quote: "Offer nutritional assessment and tailored specialist dietetic support to people with oesophago‑gastric cancer before, during and after radical treatments.",
      grade: "Not graded (NICE NG83 1.6.1, 'offer')",
    },
    {
      action: "Base nutritional treatment on individual risk, and do not give immunonutrition routinely",
      why: "The guideline summary ties nutritional treatment to each person's risk and does not recommend immunonutrition for everyone. The table read gives no reason.",
      source: "guide-oes-2022",
      quote: "Assessment and treatment based on individual risk; routine use of immunonutrition is not recommended",
    },
    {
      action: "Treat iron-deficiency anaemia with oral iron before surgery",
      why: "The guideline summary lists oral iron under optimising haemoglobin before the operation. In UK guidance, NICE NG180 points to its blood transfusion guideline for the choice between intravenous and oral iron.",
      source: "guide-oes-2022",
      quote: "Oral iron supplementation for iron-deficiency anaemia",
    },
    {
      action: "Offer multimodal prehabilitation: an exercise programme, personalised nutritional support and psychological support",
      why: "Chemotherapy before surgery impairs heart and lung fitness, and the review reports growing evidence that prehabilitation benefits people with oesophageal cancer.",
      source: "guide-oes-2022",
      quote: "Multimodal prehabilitation: exercise programme, personalised nutritional support, psychological support",
    },
    {
      action: "Plan surgery 3 to 6 weeks after neoadjuvant chemotherapy, or 6 to 10 weeks after neoadjuvant radiotherapy",
      why: "These are the intervals the guideline summary gives. The table read does not state the reasoning.",
      source: "guide-oes-2022",
      quote: "3–6 weeks after neoadjuvant chemotherapy or 6–10 weeks after neoadjuvant radiotherapy",
    },
    {
      action: "Do not use routine bowel preparation; allow solid food until 6 hours and clear fluids until 2 hours before surgery, with caution if swallowing is difficult",
      why: "ERAS pathways avoid prolonged fasting before surgery. NICE NG180 says drinking clear fluids before the operation can help reduce headaches, nausea and vomiting afterwards. The summary asks for caution with solid food where there is any difficulty swallowing, without giving the reason.",
      source: "guide-oes-2022",
      quote: "Solid food allowed until 6 h prior to surgery (caution if any dysphagia); clear fluids until 2 h prior to surgery",
    },
    {
      action: "Use minimally invasive surgery where the team has the training and expertise",
      why: "Systematic reviews cited by the review suggest minimally invasive surgery is associated with fewer lung complications, less blood loss and a shorter stay. The ERAS guideline says open, hybrid and minimally invasive approaches all have acceptable outcomes.",
      source: "guide-oes-2022",
      quote: "Recommended where there is appropriate training and expertise",
    },
    {
      action: "Decompress the gastric conduit (the stomach tube used to rebuild the oesophagus) with a nasogastric tube, and place a single chest drain rather than two",
      why: "The summary says a single drain is as effective as two and causes less discomfort. It recommends nasogastric decompression of the conduit; the table read does not give the reason.",
      source: "guide-oes-2022",
      quote: "Single drain as effective as two and produces less discomfort",
    },
    {
      action: "Keep core temperature above 36 °C during the operation",
      why: "Avoiding hypothermia during the operation is one of the ERAS principles shared across surgical specialties.",
      source: "guide-oes-2022",
      quote: "Maintain core temperature > 36 °C",
    },
    {
      action: "Use a thoracic epidural as first-line pain relief, with a paravertebral block as the alternative",
      why: "The guideline summary names thoracic epidural first and paravertebral block as the alternative. The table read does not state the reasoning.",
      source: "guide-oes-2022",
      quote: "Thoracic epidural as first line; paravertebral blocks are an alternative",
    },
    {
      action: "Offer enteral or parenteral nutrition immediately after surgery",
      why: "NICE recommends this for people having radical surgery for oesophageal and gastro-oesophageal junction cancer. Enteral means into the gut; parenteral means into a vein. The recommendation does not state a reason.",
      source: "nice-ng83",
      quote: "Offer immediate enteral or parenteral nutrition after surgery to people who are having radical surgery for oesophageal and gastro-oesophageal junction cancers.",
      grade: "Not graded (NICE NG83 1.6.2, 'offer')",
    },
    {
      action: "Feed into the gut early, by jejunostomy or nasojejunal tube, aiming for full calorie needs by day 3 to 6",
      why: "The summary aims for full calorie requirements by day 3 to 6 and allows either tube; the review says there is not enough evidence to prefer one route.",
      source: "guide-oes-2022",
      quote: "Early enteral feeding; aim to achieve full calorie requirements by day 3–6; either jejunostomy or nasojejunal tube may be used",
    },
    {
      action: "Mobilise from the day of surgery if feasible, with set daily increases in activity",
      why: "In a component analysis cited by the review, mobilising within a day of surgery was among the pathway elements associated with a shorter hospital stay.",
      source: "guide-oes-2022",
      quote: "Early mobilisation with defined daily incremental increases in activity; start on day of surgery if feasible",
    },
    {
      action: "Remove chest drains once they drain less than 200 ml a day with no air or chyle leak; avoid a positive fluid balance and keep blood glucose below 10 mmol/l",
      why: "These are the targets the guideline summary gives for drain removal, fluid balance and blood glucose. The table read does not state the reasoning.",
      source: "guide-oes-2022",
      quote: "Remove once draining < 200 ml/day and no evidence of air or chyle leak",
    },
    {
      action: "Continue blood clot prevention for 4 weeks after surgery",
      why: "The summary continues prevention of venous thromboembolism (blood clots) for 4 weeks after the operation. It does not name the drug or the dose.",
      source: "guide-oes-2022",
      quote: "Continue for 4 weeks after surgery",
    },
    {
      action: "Monitor compliance with the pathway in real time and audit its implementation continuously",
      why: "Compliance with oesophagectomy pathways ranged from 56% to 78% in the studies the review cites, and the review calls continuous monitoring and reporting of compliance a crucial first step to improving it.",
      source: "guide-oes-2022",
      quote: "Real-time monitoring of compliance should be used to provide a continuous audit of implementation",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society esophagectomy guideline (2019) is the current specialty standard, graded item by item; it is read here through its abstract and an open summary of its oesophagectomy-specific items (Halliday and Moorthy 2022), so the grades are not reproduced. Its abstract says some sections were new to ERAS programmes because this was the first guideline for an operation with a thoracic component. The summary recommends nasogastric decompression of the gastric conduit and thoracic epidural as first-line analgesia. In UK guidance, NICE NG83 (2018) covers the same ground on nutrition: specialist dietetic support before, during and after radical treatment, and immediate enteral or parenteral nutrition after surgery. NICE NG180 (2020) offers an enhanced recovery programme to people having elective major or complex surgery and says people may drink clear fluids until 2 hours before their operation.",
    sources: ["eras-oes-2019", "guide-oes-2022", "nice-ng83", "nice-ng180"],
  },
  variants: [
    {
      name: "Route of early feeding: jejunostomy or nasojejunal tube",
      differs: "Early enteral feeding can be given through a jejunostomy or through a nasojejunal tube.",
      evidence: "The ERAS summary allows either tube, and there is insufficient evidence to recommend one route for postoperative enteral feeding (Halliday and Moorthy 2022).",
      sources: ["guide-oes-2022"],
    },
    {
      name: "Level of postoperative care",
      differs: "In some centres patients may go to an intensive care or high-dependency unit straight after oesophagectomy; in others they may go directly to a surgical post-operative unit.",
      evidence: "The ERAS summary says the level of care should be personalised according to individual risk; the guide notes the two pathways involve different teams and practices.",
      sources: ["guide-oes-2022"],
    },
    {
      name: "Elements without enough evidence to recommend",
      differs: "Routine preoperative cardiopulmonary exercise testing, inspiratory muscle training and intraoperative pyloroplasty are not part of the recommended pathway.",
      evidence: "The review says there is currently insufficient evidence to provide recommendations on any of them (Halliday and Moorthy 2022, citing the ERAS guideline and a 2014 systematic review).",
      sources: ["guide-oes-2022"],
    },
  ],
  grades: [
    { claim: "The ERAS guideline graded 39 sections by GRADE", grade: "GRADE (individual grades not read)", source: "eras-oes-2019", quote: "Thirty-nine sections were ultimately produced and assessed for quality of evidence and recommendations." },
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Elements associated with a shorter hospital stay", grade: "Finding of a component analysis cited by the guide, not a graded recommendation", source: "guide-oes-2022", quote: "The presence of the following elements within the ERAS protocol is significantly associated with a reduction in length of stay after oesophagectomy: immediate extubation, mobilisation ≤ 1 day after surgery, removal of urinary catheter ≤ 2 days, commencing oral intake of fluid ≤ 1 day, enteral supplemental feeding ≤ 1 day, removal of epidural ≤ 4 days, and performing a contrast swallow ≤ 5 days." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng83",
      label: "Oesophago-gastric cancer: assessment and management in adults (NG83; published 2018, last updated July 2023), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng83/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180; published 2020, minor changes to July 2025), recommendations",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["esophageal", "oesophageal-adenocarcinoma", "oesophageal-squamous-cell-carcinoma"],
  technologies: ["eras-perioperative-nutrition", "prehabilitation", "enteral-parenteral-nutrition"],
  terms: ["oesophagectomy", "prehabilitation-term"],
  related: ["vte-prophylaxis-after-cancer-surgery", "surgical-site-infection-prevention", "enhanced-recovery-after-liver-surgery"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance", "idea-pu-shorter-fasting-before-surgery"],
  gaps: [
    "The full text of the ERAS Society esophagectomy guideline (2019) could not be read. On 17 November 2026 it was tried again: Europe PMC lists no open copy, the publisher answered with a browser check, and a university repository record answered with a CAPTCHA. The evidence level and recommendation grade of each item are therefore not given here, and the items come from an open summary table (Halliday and Moorthy 2022), not the guideline's own words.",
    "The summary table could not be checked against the guideline itself. The review's text attributes the wording on minimally invasive surgery ('recommended where there is appropriate training and expertise') to a 2014 systematic review rather than to the ERAS guideline, although its table lists it among the ERAS recommendations.",
    "The ERAS Society evaluated the evidence in 2018. No newer ERAS Society oesophagectomy guideline was found in a Europe PMC search on 17 November 2026; the 2022 review says evidence for prehabilitation in oesophageal cancer is growing and that protocols should be reviewed regularly.",
    "The best route for postoperative enteral feeding, and the value of routine cardiopulmonary exercise testing, inspiratory muscle training and pyloroplasty, are not settled (Halliday and Moorthy 2022).",
    "The summary read gives no drug or dose for clot prevention or pain relief, no carbohydrate drink volume, and no reasons for most items; none is given here. Ventilator settings are left to the guideline and local protocols. The NICE recommendations cited are UK guidance and other countries may differ.",
  ],
});
