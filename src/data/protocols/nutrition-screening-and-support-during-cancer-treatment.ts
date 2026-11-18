import { protocol } from "./helpers";

/*
 * Nutrition risk screening from diagnosis, assessment, and stepped nutrition support during cancer treatment.
 *
 * What was read, and how. First written on 11 November 2026. Second accuracy pass on 17 November 2026: every claim
 * was re-read against raw text and every quote checked verbatim by script.
 * - ESPEN practical guideline: Clinical Nutrition in cancer (Muscaritoli et al., Clin Nutr 2021;40:2898-2913): full
 *   text, the PDF published on the ESPEN website (pdftotext), re-using the copy a sibling checker fetched from
 *   espen.org on 17 November 2026; the URL was confirmed to serve the same PDF. Every numbered recommendation was read
 *   with its strength, level of evidence and consensus. The PDF prints the dash between these as the letter "e" and
 *   uses typographic ligatures, so the grades are written out in the prose. It is a guideline for adults.
 * - NICE CG32, Nutrition support for adults (published 22 February 2006, last updated 4 August 2017), recommendations
 *   page fetched with curl on 17 November 2026 (HTML, tags stripped by script), sections 1.2, 1.3, 1.4 and 1.6.
 * The ESPEN DOI was resolved through Crossref and its title checked; a Europe PMC title search found no newer ESPEN
 * cancer guideline. Quotes are copied from the raw text with line breaks and end-of-line hyphenation joined and
 * nothing else changed.
 * Corrected on 17 November 2026: the energy figure carried the protein recommendation's grade; resistance exercise
 * (a weak recommendation) sat under a strong grade; the advanced-cancer step carried only the grade of the
 * recommendation on dying patients; the omega-3 suggestion had lost "advanced cancer"; the page said ESPEN covers
 * children, and it does not; several reasons in `why` were not in either source.
 */
export const nutritionScreeningAndSupportDuringCancerTreatment = protocol({
  id: "nutrition-screening-and-support-during-cancer-treatment",
  name: "Nutrition screening and support during cancer treatment",
  aka: ["malnutrition screening in cancer", "MUST screening", "dietitian referral in cancer", "oral nutritional supplements in cancer", "ESPEN cancer nutrition"],
  domain: "nutrition",
  tldr: "Malnutrition is common in cancer and can make the side effects of treatment worse. Your weight and eating should be checked regularly from diagnosis onwards. If you are losing weight or eating less, you should be offered dietary advice, help with symptoms that stop you eating, and nutritional supplement drinks. Staying active helps keep your muscles.",
  simple: "Cancer can make you lose weight. Your team should check your weight and eating. If you are losing weight or eating less, tell your team and ask for advice on eating.",
  summary: "ESPEN (2021) recommends regular evaluation of nutritional intake, weight change and body mass index from cancer diagnosis onwards, repeated according to how stable the situation is (strong, very low evidence, strong consensus). NICE CG32, a UK guideline for all adults and not only people with cancer, says all hospital inpatients should be screened on admission and all outpatients at the first clinic appointment, repeated weekly for inpatients and on clinical concern for outpatients; it gives MUST as an example of a tool that may be used. An abnormal screen leads to assessment of intake, nutrition impact symptoms, muscle mass, physical performance and systemic inflammation (ESPEN; strong, very low evidence, consensus).\n\nESPEN recommends assuming total energy expenditure, if not measured, to be similar to healthy people and generally 25 to 30 kcal/kg/day (strong, low evidence), and protein above 1 g/kg/day, up to 1.5 g/kg/day if possible (strong, moderate evidence); vitamins and minerals at about the recommended daily allowance, discouraging high-dose micronutrients unless there is a specific deficiency; and no energy-restricting diets in people with or at risk of malnutrition. Support is stepped: dietary advice, treatment of symptoms that impair eating and oral nutritional supplements first (strong, moderate); enteral nutrition if oral intake remains inadequate, parenteral if enteral is not sufficient or feasible (strong, moderate); a slow increase over several days with precautions against refeeding syndrome after prolonged, severely reduced intake (strong, low). Maintained or increased physical activity is recommended (strong, high evidence). During radiotherapy, especially to the head and neck, thorax and gut, intake is protected mainly by individual counselling, oral nutritional supplements or both, to avoid treatment interruptions. In advanced cancer, nutrition is offered after considering prognosis, benefit and burden together with the patient; in the dying, treatment is based on comfort.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "radiotherapy-department", "community"],
  },
  population: "Adults with cancer from diagnosis through treatment, survivorship and advanced disease. Perioperative immunonutrition and ERAS and nutrition during stem cell transplant are covered in the ESPEN guideline but not set out here. Children are not covered: the ESPEN guideline is for adult cancer patients and NICE CG32 is for adults.",
  trigger: "A cancer diagnosis; then regularly, how often depending on how stable the clinical situation is.",
  steps: [
    {
      action: "From diagnosis, check intake, weight change and body mass index regularly, more often when the situation is changing",
      why: "The aim is to find problems early. ESPEN says malnutrition in cancer is still often unrecognised and undertreated.",
      source: "espen-2021",
      quote: "To detect nutritional disturbances at an early stage, we recommend to regularly evaluate nutritional intake, weight change, and body mass index (BMI), beginning with cancer diagnosis and repeated depending on the stability of the clinical situation.",
      grade: "strong; level of evidence very low; strong consensus",
    },
    {
      action: "In hospital, screen inpatients on admission and then weekly, and outpatients at the first clinic appointment and again when there is clinical concern; MUST is one tool that may be used (NICE, UK, all adults)",
      why: "NICE sets fixed points for screening every adult, with or without cancer. The screen looks at body mass index, unplanned weight loss and how long eating has been, or is likely to be, reduced.",
      source: "nice-cg32",
      quote: "All hospital inpatients on admission and all outpatients at their first clinic appointment should be screened. Screening should be repeated weekly for inpatients and when there is clinical concern for outpatients.",
    },
    {
      action: "If the screen is abnormal, assess intake, symptoms that stop eating, muscle mass, physical performance and inflammation",
      why: "Assessment looks for symptoms that affect eating and can be treated, and for changes in how the body uses food.",
      source: "espen-2021",
      quote: "In patients with abnormal screening, we recommend objective and quantitative assessment of nutritional intake, nutrition impact symptoms, muscle mass, physical performance and the degree of systemic inﬂammation.",
      grade: "strong; level of evidence very low; consensus",
    },
    {
      action: "If energy needs are not measured, assume they are similar to a healthy person's, generally 25 to 30 kcal/kg/day; aim for protein above 1 g/kg/day, up to 1.5 g/kg/day if possible",
      why: "ESPEN says it is sensible to start from the energy needs of a healthy person, and that muscle in people with cancer still responds to protein in the diet.",
      source: "espen-2021",
      quote: "We recommend that protein intake should be above 1 g/kg/day and, if possible up to 1.5 g/kg/day.",
      grade: "protein: strong; level of evidence moderate; strong consensus. Energy: strong; level of evidence low; consensus",
    },
    {
      action: "Give dietary advice, treat symptoms that get in the way of eating, and offer oral nutritional supplements to people who can eat but are malnourished or at risk",
      why: "ESPEN says the first form of support should be counselling to help manage symptoms and encourage foods and fluids rich in energy and protein, with supplements added when an enriched diet is not enough.",
      source: "espen-2021",
      quote: "We recommend nutritional intervention to increase oral intake in cancer patients who are able to eat but are malnourished or at risk of malnutrition.",
      grade: "strong; level of evidence moderate; consensus",
    },
    {
      action: "Do not use diets that restrict energy in people who are malnourished or at risk",
      why: "ESPEN says restrictive diets increase the risk of taking in too little energy, fat and protein.",
      source: "espen-2021",
      quote: "We recommend not to use dietary provisions that restrict energy intake in patients with or at risk of malnutrition.",
      grade: "strong; level of evidence low; strong consensus",
    },
    {
      action: "If eating and supplements are still not enough, use tube feeding, and intravenous nutrition only if tube feeding is not enough or not possible",
      why: "ESPEN advises moving to a more invasive way of feeding only after carefully assessing that the more natural route is not enough.",
      source: "espen-2021",
      quote: "If a decision has been made to feed a patient, we recommend EN if oral nutrition remains inadequate despite nutritional interventions (counseling, ONS), and PN if EN is not sufﬁcient or feasible.",
      grade: "strong; level of evidence moderate; strong consensus",
    },
    {
      action: "After a long period of very poor intake, build feeding up slowly and take precautions against refeeding syndrome",
      why: "Refeeding syndrome can lower phosphate, potassium and magnesium in the blood and upset fluid balance; ESPEN says these salts should be monitored and replaced if necessary.",
      source: "espen-2021",
      quote: "If oral food intake has been decreased severely for a prolonged period, we recommend to increase (oral, enteral or parenteral) nutrition only slowly over several days and to take additional precautions to prevent a refeeding syndrome.",
      grade: "strong; level of evidence low; consensus",
    },
    {
      action: "Encourage the person to stay active or become more active; ESPEN also suggests (a weak recommendation) individualised resistance exercise in addition to aerobic exercise",
      why: "Activity supports muscle mass and physical function; ESPEN notes that both inactivity and cancer treatment reduce muscle.",
      source: "espen-2021",
      quote: "We recommend maintenance or an increased level of physical activity in cancer patients to support muscle mass, physical function, and metabolic pattern.",
      grade: "physical activity: strong; level of evidence high; consensus. Resistance exercise: weak; level of evidence low; strong consensus",
    },
    {
      action: "In advanced cancer, offer nutrition support only after considering with the person the prognosis, the expected benefit and the burden; in a dying person, base treatment on comfort",
      why: "ESPEN says nutrition and fluids given into a vein are unlikely to help most dying patients, and that the decision in advanced cancer is considered together with the patient.",
      source: "espen-2021",
      quote: "In dying patients, we recommend that treatment be based on comfort.",
      grade: "dying patients: strong; level of evidence low; strong consensus. Advanced cancer: strong; level of evidence low; consensus",
    },
  ],
  bestInClass: {
    statement: "ESPEN's 2021 practical guideline, read in full, is the most detailed and recent: screening from diagnosis with intake, weight change and BMI; assessment of the cause when the screen is abnormal; energy needs assumed to be generally 25 to 30 kcal/kg/day and protein above 1 g/kg/day; a stepped approach from counselling and supplements to enteral and then parenteral nutrition; and maintained physical activity. Its two general recommendations on screening and assessment are strong but rest on very low evidence, by its own grading. NICE CG32 (UK; 2006, updated 2017) applies to all adults rather than to cancer, and sets the fixed screening points (first outpatient appointment, admission, weekly for inpatients) and the BMI and weight-loss criteria for considering support.",
    sources: ["espen-2021", "nice-cg32"],
  },
  variants: [
    {
      name: "NICE criteria for starting nutrition support (CG32)",
      differs: "Says nutrition support should be considered for anyone with a BMI below 18.5 kg/m², unintentional weight loss above 10 per cent within the last 3 to 6 months, or a BMI below 20 kg/m² with unintentional weight loss above 5 per cent within the last 3 to 6 months; and for those at risk, such as having eaten little or nothing for more than 5 days or being likely to eat little or nothing for the next 5 days or longer. Its suggested prescription for people who are not severely ill and not at risk of refeeding syndrome is 25 to 35 kcal/kg/day and 0.8 to 1.5 g protein/kg/day, against ESPEN's 25 to 30 kcal/kg/day and more than 1 g/kg/day for people with cancer.",
      evidence: "NICE recommendations are not graded; CG32 applies to all adults, not only people with cancer.",
      sources: ["nice-cg32"],
    },
    {
      name: "NICE rules on refeeding (CG32)",
      differs: "ESPEN says to increase nutrition only slowly over several days, without a rate in the recommendation. NICE gives figures: people who have eaten little or nothing for more than 5 days start at no more than 50 per cent of requirements for the first 2 days. People at high risk of refeeding problems (for example a BMI below 16 kg/m², unintentional weight loss above 15 per cent within the last 3 to 6 months, little or no intake for more than 10 days, or low potassium, phosphate or magnesium before feeding) are cared for by staff with expert knowledge, and the prescription should consider starting at a maximum of 10 kcal/kg/day, rising slowly to meet or exceed full needs by 4 to 7 days, with only 5 kcal/kg/day in extreme cases. Both sources give thiamine 200 to 300 mg daily and replacement of potassium, phosphate and magnesium.",
      evidence: "NICE recommendations are not graded and apply to all adults. ESPEN's recommendation is strong on low evidence; its thiamine and electrolyte figures are in its commentary, not in the graded recommendation.",
      sources: ["nice-cg32", "espen-2021"],
    },
    {
      name: "Medicines to stimulate appetite in advanced cancer (ESPEN)",
      differs: "Suggests considering corticosteroids for 1 to 3 weeks or progestins to improve appetite in advanced cancer, aware of their side effects, and suggests long-chain omega-3 fatty acids or fish oil for people with advanced cancer having chemotherapy who are malnourished or at risk of weight loss.",
      evidence: "ESPEN grades these weak recommendations (high evidence, consensus, for corticosteroids and for progestins; low evidence, strong consensus, for omega-3). It names muscle wasting, insulin resistance and infections as side effects of corticosteroids and thromboembolism as one of progestins.",
      sources: ["espen-2021"],
    },
  ],
  grades: [
    { claim: "Individualised nutritional counselling, oral nutritional supplements or both during radiotherapy, with special attention to head and neck, thorax and gut", grade: "strong; level of evidence moderate; strong consensus", source: "espen-2021" },
    { claim: "Maintain or increase physical activity", grade: "strong; level of evidence high; consensus", source: "espen-2021" },
    { claim: "Regular screening from diagnosis", grade: "strong; level of evidence very low; strong consensus", source: "espen-2021" },
    { claim: "Total energy expenditure assumed similar to healthy subjects, generally 25 to 30 kcal/kg/day", grade: "strong; level of evidence low; consensus", source: "espen-2021", quote: "We recommend that the total energy expenditure (TEE) of cancer patients, if not measured individually, be assumed to be similar to healthy subjects and generally ranging between 25 and 30 kcal/kg/day." },
    { claim: "Protein above 1 g/kg/day, up to 1.5 g/kg/day if possible", grade: "strong; level of evidence moderate; strong consensus", source: "espen-2021" },
    { claim: "Individualised resistance exercise in addition to aerobic exercise", grade: "weak; level of evidence low; strong consensus", source: "espen-2021", quote: "We suggest individualized resistance exercise in addition to aerobic exercise to maintain muscle strength and muscle mass." },
  ],
  sources: [
    { key: "espen-2021", label: "ESPEN practical guideline: Clinical Nutrition in cancer", publisher: "ESPEN, Clinical Nutrition", year: 2021, url: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf", doi: "10.1016/j.clnu.2021.02.005", gradingScheme: "Each recommendation printed with its strength (strong or weak), level of evidence (high, moderate, low, very low) and consensus (strong consensus or consensus). The evidence was graded with the GRADE method.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg32", label: "Nutrition support for adults: oral nutrition support, enteral tube feeding and parenteral nutrition (CG32), recommendations", publisher: "NICE", year: 2006, url: "https://www.nice.org.uk/guidance/cg32/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations. Published 22 February 2006, last updated 4 August 2017.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-nutrition-risk-screening-at-treatment-start"],
  gaps: [
    "ESPEN does not name a screening tool in the guideline read; NICE gives MUST as an example of a tool that may be used, for all adults. NICE CG32 is a UK guideline; other countries set their own screening points.",
    "ASCO's 2020 guideline on cancer cachexia, its 2023 rapid recommendation update and ESMO's 2021 cachexia guideline were not read for this protocol.",
    "On 17 November 2026 a Europe PMC title search found no ESPEN cancer nutrition guideline newer than 2021, and the NICE page still gave 4 August 2017 as the last update of CG32.",
    "The ESPEN practical guideline's commentary on refeeding prints the potassium requirement as approximately 24 mmol/kg/day, where NICE CG32 prints 2 to 4 mmol/kg/day; the ESPEN figure is not used on this page.",
    "Neither source read lists which symptoms a patient should report or how quickly; the patient advice here is limited to telling the team about weight loss or eating less.",
    "The evidence for screening itself is very low by ESPEN's own grading; the recommendations rest on consensus.",
    "Perioperative nutrition and immunonutrition and nutrition in stem cell transplant are not set out here, and children are not covered by either source.",
    "Who delivers the assessment (dietitian, nurse or doctor) and how quickly after a positive screen are not fixed in the sources read.",
  ],
  institutions: ["espen", "nice"],
  technologies: ["cachexia-therapy", "exercise-oncology"],
  terms: ["cachexia"],
  sections: ["supportive-care"],
  tags: ["protocol", "nutrition", "supportive-care"],
});
