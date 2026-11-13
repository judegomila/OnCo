import { protocol } from "./helpers";

/*
 * Enhanced recovery after major head and neck cancer surgery with free flap reconstruction.
 *
 * What was read, and how (11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ERAS Society consensus review and recommendations for major head and neck cancer surgery with free flap
 *   reconstruction (Dort et al., JAMA Otolaryngol Head Neck Surg 2017): abstract only (Europe PMC). 17 topic areas
 *   graded by GRADE; the abstract lists the best-practice elements without grades. The accepted manuscript in the
 *   Zurich repository answered with a bot check, which was not got round. It is still the ERAS Society's only head and
 *   neck guideline (Europe PMC search, and a 2025 appraisal of all ERAS guidelines that lists it as current).
 * - ASPEN guidelines for nutrition in adults with head and neck cancer (JPEN 2026): full text, Europe PMC XML
 *   (PMC13047306). GRADE certainty and strength printed under each recommendation, quoted as printed.
 * - NICE NG180, Perioperative care in adults (2020): recommendations page, full text.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const enhancedRecoveryAfterHeadAndNeckFreeFlapSurgery = protocol({
  id: "enhanced-recovery-after-head-and-neck-free-flap-surgery",
  name: "Enhanced recovery after major head and neck cancer surgery with free flap reconstruction",
  aka: ["ERAS head and neck", "enhanced recovery free flap", "perioperative care for head and neck cancer surgery", "fast-track head and neck surgery"],
  domain: "surgery-perioperative",
  tldr: "Enhanced recovery after major head and neck cancer surgery means a short fast with a sugary drink, clot prevention, antibiotics, anti-sickness medicine, pain relief that spares opioids, careful fluids, frequent checks on the flap, getting up early, nutrition starting within a day of the operation, and a dietitian and speech and swallowing therapist from before surgery.",
  simple: "Before and after head and neck cancer surgery, a dietitian and a speech and swallowing therapist will see you. You will not be kept hungry for long. After the operation feeding starts within a day, nurses check the reconstructed tissue often, and you will be helped to get up early.",
  summary: "The ERAS Society consensus review (2017; 17 topic areas, GRADE) is the only specialty guideline; only its abstract could be read, which names the best-practice elements without grades: preoperative carbohydrate treatment and no prolonged fasting, pharmacological thromboprophylaxis, perioperative antibiotics for clean-contaminated procedures, corticosteroid and antiemetic medicines, short-acting anxiolytics, goal-directed fluids, opioid-sparing multimodal analgesia, frequent flap monitoring and early mobilisation. The nutrition part is graded in full by ASPEN (2026): screen everyone for malnutrition with a validated tool (very low or expert opinion, strong); comprehensive dietitian assessment for those at risk (very low, strong); protein 1.2 to 1.5 g/kg a day (very low, strong) and energy at least 30 kcal/kg a day (high, strong); dietitian input before and after surgery for as long as nutrition is at risk (very low, strong); postoperative nutrition within 24 hours (very low, weak); a speech pathologist before treatment likely to affect swallowing (moderate, strong); an interdisciplinary nutrition team (moderate, strong); the choice of gastrostomy or nasogastric tube made by the team (moderate, weak).",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "theatre", "intensive-care"],
  },
  population: "Adults having major surgery for head and neck cancer with free flap reconstruction (for example of the mouth, throat or larynx). The ASPEN nutrition recommendations cover adults with head and neck cancer having any treatment.",
  trigger: "A decision to operate with free flap reconstruction.",
  steps: [
    {
      action: "Screen for malnutrition with a validated tool at first presentation, and repeat through treatment and recovery",
      why: "Many people with head and neck cancer cannot eat enough, and poor nutrition worsens healing and recovery.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer, we recommend that all patients be screened for malnutrition using a validated tool at their first presentation to the healthcare facility and regularly throughout treatment and recovery to facilitate timely referral for nutrition intervention.",
      grade: "Certainty of evidence: Very low/expert opinion. Strength: Strong.",
    },
    {
      action: "Involve a dietitian before and after surgery, for as long as nutrition is at risk, with longer support after free flap reconstruction",
      why: "Extensive surgery and swallowing problems can affect eating for weeks.",
      source: "aspen-hn-2026",
      quote: "Patients undergoing certain surgical procedures, such as those with extensive surgical resections (eg, free flap reconstructions) or with dysphagia, may require dietetic support for a longer duration.",
      grade: "Quality of evidence: Very low/expert opinion. Strength: Strong.",
    },
    {
      action: "Arrange a speech and swallowing assessment before surgery likely to affect swallowing",
      why: "A baseline assessment and early education help plan rehabilitation and reduce swallowing problems.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer receiving any treatment modality, we recommend consultation by a speech pathologist before treatment (surgery or radiotherapy with or without chemotherapy) for baseline assessment and education if the treatment is likely to affect swallowing function, or in the case of preexisting dysphagia.",
      grade: "Quality of evidence: Moderate. Strength: Strong.",
    },
    {
      action: "Apply the ERAS elements around the operation: a carbohydrate drink and no prolonged fasting, clot prevention, antibiotics, steroid and anti-sickness medicine, short-acting anxiolytics only, goal-directed fluids and opioid-sparing pain relief",
      why: "Together these reduce the body's stress response, sickness, pain and complications so that recovery is faster.",
      source: "eras-hn-2017",
      quote: "Among these elements are the provision of preoperative carbohydrate treatment, pharmacologic thromboprophylaxis, perioperative antibiotics in clean-contaminated procedures, corticosteroid and antiemetic medications, short acting anxiolytics, goal-directed fluid management, opioid-sparing multimodal analgesia, frequent flap monitoring, early mobilization, and the avoidance of preoperative fasting.",
      grade: "Graded by GRADE in the full text; grades not in the abstract read",
    },
    {
      action: "Start nutrition (tube, oral or other) within 24 hours of surgery, increasing oral intake gradually with the surgical team, dietitian and speech therapist",
      why: "Early feeding helps meet the body's needs for healing; oral intake is built up only when swallowing is safe.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer, we suggest early commencement (within 24 h) of postoperative nutrition intake (EN, oral, or otherwise) to meet estimated nutrition requirements.",
      grade: "Certainty of evidence: Very low. Strength: Weak.",
    },
    {
      action: "Aim for protein of 1.2 to 1.5 g/kg a day and energy of at least 30 kcal/kg a day",
      why: "These amounts meet the needs of most people with head and neck cancer and help keep muscle.",
      source: "aspen-hn-2026",
      quote: "In adults with head and neck cancer receiving any modality of treatment, we recommend an energy intake of at least 30 kcal/kg/day.",
      grade: "Energy: Certainty of evidence High, Strength Strong. Protein: Quality of evidence Very low/expert opinion, Strength Strong.",
    },
    {
      action: "Decide between a gastrostomy and a nasogastric tube as a team, by how long feeding is expected to last",
      why: "A gastrostomy suits feeding expected to last more than about 4 to 6 weeks; otherwise a nasal tube is usually enough.",
      source: "aspen-hn-2026",
      quote: "If EN is indicated, feeding via PEG/RIG may be more appropriate when anticipated for longer durations (commonly >4–6 weeks); otherwise, an NGT should be considered.",
      grade: "Quality of evidence: Moderate. Strength: Weak.",
    },
    {
      action: "Monitor the flap frequently and get the patient up early",
      why: "A clot in the flap's blood supply must be found quickly to save it, and moving early prevents chest infection and clots.",
      practice: "The ERAS abstract names frequent flap monitoring and early mobilisation among best practice (quoted in the step above); its schedule and grades are in the full text, which could not be read.",
    },
  ],
  bestInClass: {
    statement: "The ERAS Society consensus review (2017) is the only specialty guideline for this surgery, and its elements are listed in the abstract without grades. For nutrition, the ASPEN guideline (2026) is the most recent graded source and was read in full: its strongest recommendations rest on high-quality evidence for energy intake and moderate evidence for speech pathology before treatment and interdisciplinary care; most others are expert opinion graded strong. NICE NG180 supports an enhanced recovery programme for elective major surgery.",
    sources: ["eras-hn-2017", "aspen-hn-2026", "nice-ng180"],
  },
  variants: [
    {
      name: "Arginine-enriched (immune-enhancing) nutrition",
      differs: "Gives arginine-supplemented feeds around surgery.",
      evidence: "ASPEN 2026 says it 'may be acceptable at the discretion of the interdisciplinary team', citing some evidence of fewer fistulas and shorter stays but limited evidence on survival (low certainty).",
      sources: ["aspen-hn-2026"],
    },
  ],
  grades: [
    { claim: "Offer an enhanced recovery programme for elective major or complex surgery", grade: "Not graded (NICE NG180 1.2.1)", source: "nice-ng180", quote: "Offer an enhanced recovery programme to people having elective major or complex surgery ." },
    { claim: "Protein intake 1.2 to 1.5 g/kg a day", grade: "Quality of Evidence: Very low/expert opinion. Strength: Strong.", source: "aspen-hn-2026", quote: "In adults with head and neck cancer receiving any modality of treatment, we recommend a protein intake of 1.2–1.5 g/kg/day, which would meet the needs of most patients with head and neck cancer." },
    { claim: "Interdisciplinary nutrition management", grade: "Quality of evidence: Moderate. Strength: Strong.", source: "aspen-hn-2026", quote: "In adults with head and neck cancer, we recommend an interdisciplinary approach to nutrition management." },
    { claim: "Arginine-supplemented nutrition", grade: "Certainty of evidence: Low", source: "aspen-hn-2026", quote: "Given the limited evidence on progression‐free and overall survival and some evidence of benefit for decreased fistula development and length of stay in adults with head and neck cancer, we suggest that using arginine‐supplemented nutrition may be acceptable at the discretion of the interdisciplinary team." },
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
      accessed: "2026-11-11",
    },
    {
      key: "aspen-hn-2026",
      label: "Guidelines for nutrition in adults with head and neck cancer: The American Society for Parenteral and Enteral Nutrition",
      publisher: "ASPEN (Journal of Parenteral and Enteral Nutrition)",
      year: 2026,
      url: "https://doi.org/10.1002/jpen.70067",
      doi: "10.1002/jpen.70067",
      gradingScheme: "GRADE: certainty or quality of evidence (high, moderate, low, very low or expert opinion) and strength (strong or weak), printed under each recommendation.",
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
  cancers: ["head-and-neck", "oral-cavity-cancer"],
  technologies: ["eras-perioperative-nutrition", "enteral-parenteral-nutrition"],
  related: ["surgical-site-infection-prevention", "vte-prophylaxis-after-cancer-surgery", "oral-mucositis-prevention-and-oral-care", "routine-preoperative-tests"],
  upgrades: ["idea-pu-enhanced-recovery-with-measured-compliance"],
  gaps: [
    "The ERAS head and neck review (2017) could be read only as an abstract; the grade of each element, the flap-monitoring schedule, tracheostomy and airway care, and the antibiotic duration it recommends are not on this page.",
    "The ERAS review searched literature to April 2015 and says the evidence is variable, with many recommendations drawn from other kinds of surgery; no update has been published.",
    "Most of the ASPEN recommendations used here are expert opinion graded strong; only energy intake rests on high-certainty evidence.",
    "Clot prevention, antibiotic choice and doses are local protocol matters and are covered in general by the VTE and surgical site infection protocols.",
  ],
});
