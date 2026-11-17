import { protocol } from "./helpers";

/*
 * Enhanced recovery after major head and neck cancer surgery with free flap reconstruction.
 *
 * What was read, and how (first on 11 November 2026; re-read in a second accuracy pass on 17 November 2026, each
 * source fetched raw with curl and read as text, every quote checked verbatim by script):
 * - ERAS Society consensus review and recommendations for major head and neck cancer surgery with free flap
 *   reconstruction (Dort et al., JAMA Otolaryngol Head Neck Surg 2017): abstract only (Europe PMC). 17 topic areas
 *   graded by GRADE; the abstract lists the best-practice elements without grades, doses, times or schedules. On
 *   17 November 2026 the publisher's page returned 403 and the three repository copies (Zurich and two in Lausanne)
 *   answered with a bot check, which was not got round. The ERAS Society's own guideline list (read raw on
 *   17 November 2026) shows this as its one head and neck guideline, and two Europe PMC searches found no newer
 *   edition.
 * - ASPEN guidelines for nutrition in adults with head and neck cancer (JPEN 2026): full text, Europe PMC XML
 *   (PMC13047306). GRADE certainty and strength printed under each recommendation, quoted as printed.
 * - NICE NG180, Perioperative care in adults (2020, England): recommendations page and update information page,
 *   full text, from the copy another checker of this pass saved from nice.org.uk on 17 November 2026.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 * Changed on 17 November 2026: the ERAS elements worded as the abstract words them (no "drink", no "only", antibiotics
 * scoped to clean-contaminated procedures); reasons in `why` cut back to what the sources say; the feeding-tube and
 * early-feeding steps given the guideline's hedges; the flap monitoring step cited to the abstract; NICE's advice on
 * clear fluids and carbohydrate drinks added; the count of expert-opinion recommendations corrected.
 */
export const enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery = protocol({
  id: "enhanced-recovery-after-head-and-neck-free-flap-surgery",
  name: "Enhanced recovery after major head and neck cancer surgery with free flap reconstruction",
  aka: ["ERAS head and neck", "enhanced recovery free flap", "perioperative care for head and neck cancer surgery", "fast-track head and neck surgery"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery after major head and neck cancer surgery means no long fast before the operation, clot prevention, antibiotics, anti-sickness medicine, pain relief that spares opioids, careful fluids, frequent checks on the flap, getting up early, nutrition that aims to start within a day of the operation, and a dietitian and speech and swallowing therapist from before surgery.",
  simple: "Before and after head and neck cancer surgery, a dietitian and a speech and swallowing therapist will see you. You will not be kept hungry for long. After the operation the aim is to start feeding within a day where that is safe, the team checks the reconstructed tissue often, and you will be helped to get up early.",
  summary: "The ERAS Society consensus review (2017; 17 topic areas, GRADE) is the ERAS Society's only guideline for this surgery; only its abstract could be read, which names the best-practice elements without grades, doses, fasting times or schedules: preoperative carbohydrate treatment and the avoidance of preoperative fasting, pharmacological thromboprophylaxis, perioperative antibiotics for clean-contaminated procedures, corticosteroid and antiemetic medicines, short-acting anxiolytics, goal-directed fluids, opioid-sparing multimodal analgesia, frequent flap monitoring and early mobilisation. The nutrition part is graded in full by ASPEN (2026): screen everyone for malnutrition with a validated tool (very low or expert opinion, strong); comprehensive nutrition assessment by a dietitian or other qualified nutrition professional for those at risk (very low or expert opinion, strong); protein 1.2 to 1.5 g/kg a day (very low or expert opinion, strong) and energy at least 30 kcal/kg a day (high, strong); dietitian input before and after surgery for as long as nutrition is at risk (very low or expert opinion, strong); postoperative nutrition within 24 hours (very low, weak); a speech pathologist before treatment likely to affect swallowing (moderate, strong); an interdisciplinary nutrition team (moderate, strong); the choice of gastrostomy or nasogastric tube made by the team (moderate, weak). NICE NG180 (England) says to offer an enhanced recovery programme for elective major or complex surgery.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care"],
  },
  population: "Adults having major surgery for head and neck cancer with free flap reconstruction (for example of the mouth, throat or larynx). The ASPEN nutrition recommendations cover adults with head and neck cancer having any treatment.",
  trigger: "A decision to operate with free flap reconstruction.",
  steps: [
    {
      action: "Screen for malnutrition with a validated tool at first presentation, and repeat through treatment and recovery",
      why: "Malnutrition is common in people with head and neck cancer, and finding the risk early may get a person to a dietitian sooner.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer, we recommend that all patients be screened for malnutrition using a validated tool at their first presentation to the healthcare facility and regularly throughout treatment and recovery to facilitate timely referral for nutrition intervention.",
      grade: "Certainty of evidence: Very low/expert opinion. Strength: Strong.",
    },
    {
      action: "Involve a dietitian before and after surgery, for as long as nutrition is at risk; longer support may be needed after extensive surgery such as free flap reconstruction, or with swallowing difficulty",
      why: "In people having surgery for head and neck cancer, malnutrition and low muscle mass are linked with a longer hospital stay, more surgical complications and slower wound healing. ASPEN found no study testing how long the support should last.",
      source: "aspen-hn-2026",
      quote: "Patients undergoing certain surgical procedures, such as those with extensive surgical resections (eg, free flap reconstructions) or with dysphagia, may require dietetic support for a longer duration.",
      grade: "Quality of evidence: Very low/expert opinion. Strength: Strong.",
    },
    {
      action: "Arrange a speech and swallowing assessment before surgery likely to affect swallowing, or where swallowing is already difficult",
      why: "Swallowing difficulty is common in head and neck cancer and can stop a person eating enough. Help from a speech pathologist may improve it or stop it getting worse.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer receiving any treatment modality, we recommend consultation by a speech pathologist before treatment (surgery or radiotherapy with or without chemotherapy) for baseline assessment and education if the treatment is likely to affect swallowing function, or in the case of preexisting dysphagia.",
      grade: "Quality of evidence: Moderate. Strength: Strong.",
    },
    {
      action: "Apply the ERAS elements around the operation: carbohydrate treatment before surgery and avoidance of preoperative fasting, clot prevention with medicine, antibiotics for clean-contaminated procedures, steroid and anti-sickness medicine, short-acting anxiolytics, goal-directed fluids and opioid-sparing multimodal pain relief",
      why: "The ERAS Society's expert panel lists these as best practice. Its reasons, doses, timings and grade for each are in the full text, which could not be read; the abstract says the evidence is variable and often comes from other kinds of surgery.",
      source: "eras-hn-2017",
      quote: "Among these elements are the provision of preoperative carbohydrate treatment, pharmacologic thromboprophylaxis, perioperative antibiotics in clean-contaminated procedures, corticosteroid and antiemetic medications, short acting anxiolytics, goal-directed fluid management, opioid-sparing multimodal analgesia, frequent flap monitoring, early mobilization, and the avoidance of preoperative fasting.",
      grade: "Graded by GRADE in the full text; grades not in the abstract read",
    },
    {
      action: "Aim to start nutrition (tube, oral or other) within 24 hours of surgery; build up eating and drinking gradually, in consultation with the surgical team, dietitian and speech pathologist, and keep tube feeding going until enough is taken by mouth",
      why: "Starting nutrition early may help prevent a decline in nutrition and the problems after surgery that can follow. Eating by mouth early is not right in every situation, which is why the teams decide together.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer, we suggest early commencement (within 24 h) of postoperative nutrition intake (EN, oral, or otherwise) to meet estimated nutrition requirements.",
      grade: "Certainty of evidence: Very low. Strength: Weak.",
    },
    {
      action: "Aim for protein of 1.2 to 1.5 g/kg a day and energy of at least 30 kcal/kg a day",
      why: "This amount of protein would meet the needs of most people with head and neck cancer, and enough energy lets the body use that protein to keep muscle.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer receiving any modality of treatment, we recommend an energy intake of at least 30 kcal/kg/day.",
      grade: "Energy: Certainty of evidence High, Strength Strong. Protein: Quality of evidence Very low/expert opinion, Strength Strong.",
    },
    {
      action: "Decide between a gastrostomy and a nasogastric tube as a team, by the clinical situation, symptoms, treatment plan, personal circumstances and how long feeding is expected to last",
      why: "A gastrostomy may be more appropriate when tube feeding is expected to last longer (commonly more than 4 to 6 weeks); otherwise a nasogastric tube should be considered.",
      source: "aspen-hn-2026",
      quote: "If EN is indicated, feeding via PEG/RIG may be more appropriate when anticipated for longer durations (commonly >4–6 weeks); otherwise, an NGT should be considered.",
      grade: "Quality of evidence: Moderate. Strength: Weak.",
    },
    {
      action: "Monitor the flap frequently and get the patient up early",
      why: "The ERAS Society's expert panel lists both as best practice. How often the flap is checked, for how long, and the reasons and grade for each are in the full text, which could not be read; each unit has its own schedule.",
      source: "eras-hn-2017",
      quote: "Among these elements are the provision of preoperative carbohydrate treatment, pharmacologic thromboprophylaxis, perioperative antibiotics in clean-contaminated procedures, corticosteroid and antiemetic medications, short acting anxiolytics, goal-directed fluid management, opioid-sparing multimodal analgesia, frequent flap monitoring, early mobilization, and the avoidance of preoperative fasting.",
      grade: "Graded by GRADE in the full text; grades not in the abstract read",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society consensus review (2017) is the ERAS Society's only guideline for this surgery, and its elements are listed in the abstract without grades. For nutrition, the ASPEN guideline (2026) is the most recent graded source and was read in full: of the recommendations used here, the strong ones rest on high-certainty evidence for energy intake, moderate evidence for speech pathology before treatment and interdisciplinary care, and very low certainty or expert opinion for screening, assessment, protein intake and the length of dietitian support; early feeding, the choice of tube and arginine are weak recommendations. NICE NG180 (England) says to offer an enhanced recovery programme for elective major or complex surgery.",
    sources: ["eras-hn-2017", "aspen-hn-2026", "nice-ng180"],
  },
  variants: [
    {
      name: "Arginine-enriched (immune-enhancing) nutrition",
      differs: "Gives arginine-supplemented feeds around surgery.",
      evidence: "ASPEN 2026 says it 'may be acceptable at the discretion of the interdisciplinary team', citing some evidence of fewer fistulas and shorter stays but limited evidence on survival (low certainty, weak recommendation).",
      sources: ["aspen-hn-2026"],
    },
    {
      name: "Carbohydrate drinks considered only for abdominal surgery (NICE)",
      differs: "Does not give carbohydrate routinely before head and neck surgery.",
      evidence: "The ERAS abstract lists preoperative carbohydrate treatment and the avoidance of preoperative fasting as best practice for this surgery, without a grade, volume or time. NICE NG180 (England) recommendation 1.4.1 says people having surgery may drink clear fluids until 2 hours before their operation, and recommendation 1.4.2 says only to consider carbohydrate drinks before abdominal major or complex surgery; it makes no recommendation on them for other operations.",
      sources: ["eras-hn-2017", "nice-ng180"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery." },
    { claim: "Clear fluids until 2 hours before the operation", grade: "Not graded (NICE NG180 1.4.1)", source: "nice-ng180", quote: "they may drink clear fluids until 2 hours before their operation" },
    { claim: "Protein intake 1.2 to 1.5 g/kg a day", grade: "Quality of Evidence: Very low/expert opinion. Strength: Strong.", source: "aspen-hn-2026", quote: "In adults with head and neck cancer receiving any modality of treatment, we recommend a protein intake of 1.2–1.5 g/kg/day, which would meet the needs of most patients with head and neck cancer." },
    { claim: "Interdisciplinary nutrition management", grade: "Quality of evidence: Moderate. Strength: Strong.", source: "aspen-hn-2026", quote: "In adults with head and neck cancer, we recommend an interdisciplinary approach to nutrition management." },
    { claim: "Arginine-supplemented nutrition", grade: "Certainty of evidence: Low. Strength: Weak.", source: "aspen-hn-2026", quote: "Given the limited evidence on progression‐free and overall survival and some evidence of benefit for decreased fistula development and length of stay in adults with head and neck cancer, we suggest that using arginine‐supplemented nutrition may be acceptable at the discretion of the interdisciplinary team." },
    { claim: "Scope of the ERAS head and neck review", grade: "GRADE, 17 topic areas", source: "eras-hn-2017", quote: "A total of 17 topic areas were identified for inclusion in the protocol for the perioperative care of patients undergoing major head and neck cancer surgery with free flap reconstruction." },
  ],
  sources: [
    {
      key: "eras-hn-2017",
      label: "Optimal Perioperative Care in Major Head and Neck Cancer Surgery With Free Flap Reconstruction: A Consensus Review and Recommendations From the Enhanced Recovery After Surgery Society",
      publisher: "ERAS Society (JAMA Otolaryngology, Head and Neck Surgery)",
      year: 2017,
      url: "https://doi.org/10.1001/jamaoto.2016.2981",
      doi: "10.1001/jamaoto.2016.2981",
      gradingScheme: "GRADE, by consensus of the expert panel; item grades not in the abstract.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aspen-hn-2026",
      label: "Guidelines for nutrition in adults with head and neck cancer: The American Society for Parenteral and Enteral Nutrition",
      publisher: "ASPEN (Journal of Parenteral and Enteral Nutrition)",
      year: 2026,
      url: "https://doi.org/10.1002/jpen.70067",
      doi: "10.1002/jpen.70067",
      gradingScheme: "GRADE: certainty of evidence (printed as 'certainty' or 'quality'; high, moderate, low, very low, or very low/expert opinion) and strength (strong or weak), printed under each recommendation.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng180",
      label: "Perioperative care in adults (NG180), recommendations",
      publisher: "NICE (England)",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng180/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider') signals strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["head-and-neck", "oral-cavity-cancer"],
  technologies: ["eras-perioperative-nutrition", "enteral-parenteral-nutrition"],
  related: ["surgical-site-infection-prevention", "vte-prophylaxis-after-cancer-surgery", "oral-mucositis-prevention-and-oral-care", "routine-preoperative-tests"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance"],
  gaps: [
    "The ERAS head and neck review (2017) could be read only as an abstract. On 17 November 2026 the publisher's page refused a script and the repository copies answered with a bot check. So the grade of each element, every drug dose, the fasting times for food and clear fluids, the amount of carbohydrate, how long clot prevention and antibiotics continue, the flap-monitoring schedule, and tracheostomy and airway care are not on this page.",
    "The ERAS review searched literature to April 2015 and says the evidence is variable, with many recommendations drawn from other kinds of surgery. On 17 November 2026 the ERAS Society's guideline list showed it as the one head and neck guideline, and two Europe PMC searches found no update.",
    "Of the ten ASPEN recommendations used here, four are very low certainty or expert opinion graded strong (screening, assessment, protein intake and the length of dietitian support), and only energy intake rests on high-certainty evidence. ASPEN found no study at all for the screening and dietitian-duration questions.",
    "NICE NG180 applies to England and is about surgery in general, not head and neck surgery. Its 2-hour limit for clear fluids is given on this page; it gives no fasting time for solid food in the recommendations read.",
    "Clot prevention, antibiotic choice and doses are local protocol matters and are covered in general by the VTE and surgical site infection protocols.",
  ],
});
