import { protocol } from "./helpers";

/*
 * Nutrition risk screening from diagnosis, assessment, and stepped nutrition support during cancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ESPEN practical guideline: Clinical Nutrition in cancer (Muscaritoli et al., Clin Nutr 2021): full text, the PDF
 *   published on the ESPEN website (pdftotext, 19 pages), including every numbered recommendation with its strength,
 *   level of evidence and consensus. The PDF prints the dash between these as the letter "e" and uses typographic
 *   ligatures, so quotes were chosen from sentences without them, and the grades are written out in the prose.
 * - NICE CG32, Nutrition support for adults (published February 2006, last updated August 2017), recommendations
 *   page (HTML, full text), sections 1.2 and 1.3.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * and end-of-line hyphenation joined and nothing else changed.
 */
export const nutritionScreeningAndSupportDuringCancerTreatment = protocol({
  id: "nutrition-screening-and-support-during-cancer-treatment",
  name: "Nutrition screening and support during cancer treatment",
  aka: ["malnutrition screening in cancer", "MUST screening", "dietitian referral in cancer", "oral nutritional supplements in cancer", "ESPEN cancer nutrition"],
  domain: "nutrition",
  tldr: "Weight loss and poor eating are common in cancer and make treatment harder. Your weight and eating should be checked from diagnosis onwards. If you are losing weight or eating less, you should get dietary advice, help with symptoms that stop you eating, and drinks or other supplements if needed. Staying active helps keep your muscles.",
  simple: "Cancer can make you lose weight. Your team should check your weight and eating. If you are losing weight, ask for help from a dietitian.",
  summary: "ESPEN (2021) recommends regular evaluation of nutritional intake, weight change and body mass index from cancer diagnosis onwards, repeated according to how stable the situation is (strong, very low evidence, strong consensus); NICE CG32 screens all hospital inpatients on admission and all outpatients at the first clinic appointment, weekly for inpatients and on clinical concern for outpatients, with a tool such as MUST. An abnormal screen leads to assessment of intake, nutrition impact symptoms, muscle mass, physical performance and systemic inflammation (ESPEN).\n\nTargets are energy of about 25 to 30 kcal/kg/day and protein above 1 g/kg/day, up to 1.5 g/kg/day if possible; vitamins and minerals at about the recommended daily allowance, without high-dose micronutrients; and no energy-restricting diets in people with or at risk of malnutrition. Support is stepped: dietary advice, treatment of symptoms that impair eating and oral nutritional supplements first (strong, moderate); enteral nutrition if oral intake remains inadequate, parenteral if enteral is not sufficient or feasible (strong, moderate); slow increase with precautions against refeeding syndrome after prolonged poor intake. Physical activity is maintained or increased (strong, high evidence). During radiotherapy to the head and neck, thorax and gut, intake is protected by individual counselling and supplements to avoid treatment interruptions. In advanced cancer, nutrition is offered after weighing prognosis, benefit and burden with the patient; in the dying, care is for comfort.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "radiotherapy-department", "community"],
  },
  population: "Adults with cancer from diagnosis through treatment, survivorship and advanced disease. Perioperative immunonutrition and ERAS, nutrition during stem cell transplant and paediatric nutrition are covered in the ESPEN guideline but only touched on here.",
  trigger: "A cancer diagnosis; then at each stage of treatment and whenever weight, appetite or intake changes.",
  steps: [
    {
      action: "From diagnosis, check intake, weight change and body mass index regularly, more often when the situation is changing",
      why: "Malnutrition is easier to prevent than to reverse, and it is often missed when someone still looks well.",
      source: "espen-2021",
      quote: "To detect nutritional disturbances at an early stage, we recommend to regularly evaluate nutritional intake, weight change, and body mass index (BMI), beginning with cancer diagnosis and repeated depending on the stability of the clinical situation.",
      grade: "strong; level of evidence very low; strong consensus",
    },
    {
      action: "Screen outpatients at the first clinic appointment and again when there is concern, with a validated tool such as MUST",
      why: "A short screen at a fixed point makes sure nobody is missed.",
      source: "nice-cg32",
      quote: "All hospital inpatients on admission and all outpatients at their first clinic appointment should be screened. Screening should be repeated weekly for inpatients and when there is clinical concern for outpatients.",
    },
    {
      action: "If the screen is abnormal, assess intake, symptoms that stop eating, muscle mass, physical performance and inflammation",
      why: "These show why the person is losing weight and what can be treated.",
      source: "espen-2021",
      quote: "In patients with abnormal screening, we recommend objective and quantitative assessment of nutritional intake, nutrition impact symptoms, muscle mass, physical performance and the degree of systemic inﬂammation.",
      grade: "strong; level of evidence very low; consensus",
    },
    {
      action: "Aim for about 25 to 30 kcal/kg/day and protein above 1 g/kg/day, up to 1.5 g/kg/day where possible",
      why: "People with cancer need at least as much energy as healthy people and more protein to keep muscle.",
      source: "espen-2021",
      quote: "We recommend that protein intake should be above 1 g/kg/day and, if possible up to 1.5 g/kg/day.",
      grade: "strong; level of evidence moderate; strong consensus",
    },
    {
      action: "Give dietary advice, treat symptoms that get in the way of eating, and offer oral nutritional supplements to people who can eat but are malnourished or at risk",
      why: "Nausea, a sore mouth, constipation or low mood can all stop someone eating, and many can be treated.",
      source: "espen-2021",
      quote: "We recommend nutritional intervention to increase oral intake in cancer patients who are able to eat but are malnourished or at risk of malnutrition.",
      grade: "strong; level of evidence moderate; consensus",
    },
    {
      action: "Do not use diets that restrict energy in people who are malnourished or at risk",
      why: "In someone already losing weight, cutting energy makes malnutrition worse.",
      source: "espen-2021",
      quote: "We recommend not to use dietary provisions that restrict energy intake in patients with or at risk of malnutrition.",
      grade: "strong; level of evidence low; strong consensus",
    },
    {
      action: "If eating and supplements are still not enough, use tube feeding, and intravenous nutrition only if tube feeding is not enough or not possible",
      why: "Feeding through the gut is safer than through a vein when the gut works.",
      source: "espen-2021",
      quote: "If a decision has been made to feed a patient, we recommend EN if oral nutrition remains inadequate despite nutritional interventions (counseling, ONS), and PN if EN is not sufﬁcient or feasible.",
      grade: "strong; level of evidence moderate; strong consensus",
    },
    {
      action: "After a long period of very poor intake, build feeding up slowly and take precautions against refeeding syndrome",
      why: "Feeding too fast after starvation can cause dangerous shifts in salts in the blood.",
      source: "espen-2021",
      quote: "If oral food intake has been decreased severely for a prolonged period, we recommend to increase (oral, enteral or parenteral) nutrition only slowly over several days and to take additional precautions to prevent a refeeding syndrome.",
      grade: "strong; level of evidence low; consensus",
    },
    {
      action: "Encourage the person to stay active or become more active, with resistance as well as aerobic exercise where possible",
      why: "Activity helps keep muscle and strength, which food alone cannot do.",
      source: "espen-2021",
      quote: "We recommend maintenance or an increased level of physical activity in cancer patients to support muscle mass, physical function, and metabolic pattern.",
      grade: "strong; level of evidence high; consensus",
    },
    {
      action: "In advanced cancer, decide on nutrition support with the person, weighing prognosis, expected benefit and burden; in the last days, care for comfort",
      why: "Artificial nutrition rarely helps in the last days of life, and the decision belongs with the person.",
      source: "espen-2021",
      quote: "In dying patients, we recommend that treatment be based on comfort.",
      grade: "strong; level of evidence low; strong consensus",
    },
  ],
  bestInClass: {
    statement: "ESPEN's 2021 practical guideline, read in full, is the most detailed and recent: screening from diagnosis with intake, weight change and BMI; assessment of the cause when the screen is abnormal; energy of 25 to 30 kcal/kg/day and protein above 1 g/kg/day; a stepped approach from counselling and supplements to enteral and then parenteral nutrition; and maintained physical activity. Most of its screening recommendations are strong but rest on very low evidence, by its own grading. NICE CG32 (2006, updated 2017) applies to all adults rather than to cancer, and sets the fixed screening points (first outpatient appointment, admission, weekly for inpatients) and the BMI and weight-loss criteria for starting support.",
    sources: ["espen-2021", "nice-cg32"],
  },
  variants: [
    {
      name: "NICE criteria for starting nutrition support (CG32)",
      differs: "Considers nutrition support for anyone with a BMI below 18.5 kg/m², unintentional weight loss above 10 per cent in 3 to 6 months, or a BMI below 20 with weight loss above 5 per cent; and for those at risk, such as having eaten little or nothing for more than 5 days.",
      evidence: "NICE recommendations are not graded; CG32 applies to all adults, not only people with cancer.",
      sources: ["nice-cg32"],
    },
    {
      name: "Medicines to stimulate appetite in advanced cancer (ESPEN)",
      differs: "Suggests considering corticosteroids for 1 to 3 weeks or progestins to improve appetite in advanced cancer, aware of their side effects, and long-chain omega-3 fatty acids or fish oil for people on chemotherapy at risk of weight loss.",
      evidence: "ESPEN grades these weak recommendations (high evidence for corticosteroids and progestins; low for omega-3).",
      sources: ["espen-2021"],
    },
  ],
  grades: [
    { claim: "Nutritional counselling and supplements during radiotherapy to head and neck, thorax and gut", grade: "strong; level of evidence moderate; strong consensus", source: "espen-2021" },
    { claim: "Maintain or increase physical activity", grade: "strong; level of evidence high; consensus", source: "espen-2021" },
    { claim: "Regular screening from diagnosis", grade: "strong; level of evidence very low; strong consensus", source: "espen-2021" },
  ],
  sources: [
    { key: "espen-2021", label: "ESPEN practical guideline: Clinical Nutrition in cancer", publisher: "ESPEN, Clinical Nutrition", year: 2021, url: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf", doi: "10.1016/j.clnu.2021.02.005", gradingScheme: "Each recommendation printed with its strength (strong or weak), level of evidence (high, moderate, low, very low) and consensus (strong consensus or consensus).", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-cg32", label: "Nutrition support for adults: oral nutrition support, enteral tube feeding and parenteral nutrition (CG32), recommendations", publisher: "NICE", year: 2006, url: "https://www.nice.org.uk/guidance/cg32/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations. Published February 2006, last updated August 2017.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-nutrition-risk-screening-at-treatment-start"],
  gaps: [
    "ESPEN does not name a single screening tool in the recommendations read; NICE gives MUST as an example for all adults.",
    "ASCO's 2020 guideline on cancer cachexia and ESMO's 2021 cachexia guideline were not read for this protocol.",
    "The evidence for screening itself is very low by ESPEN's own grading; the recommendations rest on consensus.",
    "Perioperative nutrition and immunonutrition, nutrition in stem cell transplant, and children are covered only in passing.",
    "Who delivers the assessment (dietitian, nurse or doctor) and how quickly after a positive screen are not fixed in the sources read.",
  ],
  institutions: ["espen", "nice"],
  technologies: ["cachexia-therapy", "exercise-oncology"],
  terms: ["cachexia"],
  sections: ["supportive-care"],
  tags: ["protocol", "nutrition", "supportive-care"],
});
