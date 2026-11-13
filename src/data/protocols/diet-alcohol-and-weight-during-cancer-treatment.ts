import { protocol } from "./helpers";

/*
 * Diet, alcohol, supplements, food safety and weight during cancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ESPEN practical guideline: Clinical Nutrition in cancer (Clin Nutr 2021): full text, the PDF on the ESPEN website,
 *   pdftotext. Grades are printed as "strength of recommendation ... Level of evidence ... consensus"; the separators
 *   in the PDF extract as a stray letter, so grades are restated in plain words.
 * - ASCO, Exercise, Diet, and Weight Management During Cancer Treatment (J Clin Oncol 2022): abstract.
 * - American Cancer Society nutrition and physical activity guideline for cancer survivors (CA Cancer J Clin 2022):
 *   abstract (no recommendation text in the abstract).
 * - NCI, Eating Hints (PDF dated December 2022) and Chemotherapy and You (December 2023): full text.
 * - NCI, Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment (reviewed 2022): full text.
 * - Macmillan, Side effects of chemotherapy (reviewed 2018, under review): full text.
 * - American Cancer Society, Getting Oral Chemotherapy (revised 2025): full text.
 * Every DOI was resolved through Crossref and Europe PMC.
 */
export const dietAlcoholAndWeightDuringCancerTreatment = protocol({
  id: "diet-alcohol-and-weight-during-cancer-treatment",
  name: "Diet, alcohol and weight during cancer treatment",
  aka: ["eating during chemotherapy", "nutrition during cancer treatment", "alcohol during chemotherapy", "neutropenic diet", "food safety during cancer treatment", "supplements during cancer treatment"],
  domain: "nutrition",
  tldr: "During treatment the aim is to eat enough, especially protein, and keep weight steady; this is not the time to cut calories unless the team advises it. Handle food safely, but a strict 'neutropenic diet' is not recommended. Ask about alcohol, which may need limiting when platelets are low, and about foods that interact with your tablets. Regular exercise is recommended.",
  simple: "Try to eat enough, with plenty of protein, and keep your weight steady. Ask a dietitian if eating is hard. Tell your team about any vitamins or supplements. Wash hands and food and cook meat and eggs well, but you do not need a special restricted diet. Ask before drinking alcohol. Keep active if you can.",
  summary: "ESPEN's practical guideline (2021) recommends checking intake, weight change and BMI regularly from diagnosis (strong, very low evidence), no diets that restrict energy in people who are malnourished or at risk (strong, low), vitamins and minerals at about the recommended daily allowance and no high-dose micronutrients without a deficiency (strong, low), and for survivors a healthy weight, physical activity and a diet low in saturated fat, red meat and alcohol (strong, low). It finds insufficient data for a low-bacterial diet more than 30 days after allogeneic transplant. ASCO (2022) recommends regular aerobic and resistance exercise during curative treatment, recommends against neutropenic diets to prevent infection, and finds evidence for other diets and for weight loss during treatment very limited. NCI's Eating Hints (2022) gives practical food safety (clean hands, separate boards, thorough cooking, pasteurised products) and a longer list of foods to avoid when treatment raises infection risk, which goes further than the trials support. Alcohol advice is about specific risks: NCI says to limit or avoid it if platelets are low, and Macmillan to avoid it with diarrhoea. ACS (2025) says some oral drugs interact with food.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults during active cancer treatment, and survivors after it. People who are malnourished, losing weight, or having treatment to the head, neck or digestive tract need individual advice from a dietitian; people after an allogeneic stem cell transplant follow their transplant team's food rules.",
  trigger: "Starting cancer treatment, or weight loss, poor appetite or questions about diet during treatment.",
  steps: [
    {
      action: "Have intake, weight change and BMI checked from diagnosis and regularly during treatment, and ask for a dietitian if eating is difficult or weight is falling",
      why: "Weight and muscle loss are common and harder to reverse once advanced; early checks find them in time.",
      source: "espen-2021",
      quote: "To detect nutritional disturbances at an early stage, we recommend to regularly evaluate nutritional intake, weight change, and body mass index (BMI), beginning with cancer diagnosis and repeated depending on the stability of the clinical situation.",
      grade: "Recommendation B1-1: strength of recommendation strong, level of evidence very low, strong consensus",
    },
    {
      action: "Eat enough, with extra protein and calories if needed, and do not start a diet that cuts calories while malnourished or at risk of it",
      why: "Treatment is easier to get through and complete when strength and weight are kept up.",
      source: "espen-2021",
      quote: "We recommend not to use dietary provisions that restrict energy intake in patients with or at risk of malnutrition.",
      grade: "Recommendation B3-2: strength of recommendation strong, level of evidence low, strong consensus",
    },
    {
      action: "Tell the team about every vitamin, mineral, herb or supplement, and do not take high doses unless a deficiency has been found",
      why: "Some supplements change how cancer treatment works, and high doses have not been shown to help.",
      source: "nci-eating-hints",
      quote: "Tell your doctor, nurse, or dietitian about any vitamin, mineral, dietary supplements, or herbs you are already taking or plan to take.",
      grade: "Not graded (patient booklet); ESPEN B2-4 on high-dose micronutrients: strong, low evidence",
    },
    {
      action: "Handle food safely: wash hands, knives and surfaces, keep raw meat separate, cook meat and eggs thoroughly, and use pasteurised juice and milk",
      why: "Some treatments make food poisoning more likely and more serious.",
      source: "nci-eating-hints",
      quote: "Wash your hands, knives, and countertops before and after you prepare food.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not follow a strict neutropenic diet to prevent infection unless your transplant or haematology team has a specific reason",
      why: "Trials found that restricted neutropenic diets do not reduce infections, and they make eating harder.",
      source: "asco-diet-2022",
      quote: "Neutropenic diets are not recommended to prevent infection in patients with cancer during active treatment.",
      grade: "ASCO guideline recommendation (strength not shown in the abstract)",
    },
    {
      action: "Ask the team before drinking alcohol; limit or avoid it if platelets are low or there is diarrhoea",
      why: "Alcohol adds to bleeding risk when platelets are low and can make diarrhoea and dehydration worse.",
      source: "nci-bleeding-page",
      quote: "You may also be advised to limit or avoid alcohol if your platelet count is low.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If taking anticancer tablets, ask which foods and drinks to avoid and whether to take them with or without food",
      why: "Some foods change how much of an oral drug is absorbed, making it weaker or more toxic.",
      source: "acs-oral-chemo",
      quote: "Sometimes there are food and drug interactions that can change how well the chemo works, making it less effective or causing additional side effects.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Keep active: regular aerobic and resistance exercise is recommended during treatment given with the aim of cure",
      why: "Exercise during treatment improves fitness, strength and fatigue.",
      source: "asco-diet-2022",
      quote: "Oncology providers should recommend regular aerobic and resistance exercise during active treatment with curative intent and may recommend preoperative exercise for patients undergoing surgery for lung cancer.",
      grade: "ASCO guideline recommendation (strength not shown in the abstract)",
    },
  ],
  bestInClass: {
    statement: "ESPEN's practical guideline (2021) and ASCO's exercise, diet and weight guideline (2022) are the current graded standards. They agree on screening intake and weight from diagnosis, avoiding calorie restriction in people who are malnourished or at risk, not using high-dose supplements without a deficiency, and exercise during treatment. ASCO recommends against neutropenic diets to prevent infection; ESPEN finds insufficient data for a low-bacterial diet after allogeneic transplant. Both say evidence for specific diets and for intentional weight loss during treatment is limited. After treatment, ESPEN recommends a healthy weight and a diet low in saturated fat, red meat and alcohol (strong, low evidence). Alcohol during treatment has no graded recommendation; patient guidance ties it to specific risks (low platelets, diarrhoea).",
    sources: ["espen-2021", "asco-diet-2022"],
  },
  variants: [
    {
      name: "Restricted food list when infection risk is high (NCI Eating Hints)",
      differs: "Beyond safe handling, advises avoiding produce that is hard to scrub such as berries and grapes, raw nuts, bulk bins, buffets and salad bars, mouldy cheeses, and leftover rice.",
      evidence: "Patient booklet, not graded. It goes further than ASCO 2022, which found that neutropenic diets did not decrease the risk of infection and recommends against them.",
      sources: ["nci-eating-hints", "asco-diet-2022"],
    },
    {
      name: "Low-bacterial diet after allogeneic stem cell transplant",
      differs: "Some transplant units keep food restrictions for weeks after an allogeneic transplant.",
      evidence: "ESPEN 2021 recommendation C4-3: insufficient consistent clinical data to recommend a low-bacterial diet more than 30 days after allogeneic transplant (strength of recommendation none, low evidence); it cites a Cochrane review finding no evidence that low-bacterial diets prevent infection during neutropenia.",
      sources: ["espen-2021"],
    },
    {
      name: "Survivorship diet and weight (ESPEN, ACS)",
      differs: "After treatment, aims for a healthy weight (BMI 18.5 to 25), physical activity, and a diet based on vegetables, fruits and whole grains, low in saturated fat, red meat and alcohol.",
      evidence: "ESPEN 2021 recommendation C5-2, strong, low evidence; the ACS 2022 survivor guideline covers the same ground (abstract read; its recommendations were not).",
      sources: ["espen-2021", "acs-survivors-2022"],
    },
  ],
  grades: [
    { claim: "Regular screening of intake, weight change and BMI from diagnosis", grade: "B1-1: strong, very low evidence, strong consensus", source: "espen-2021" },
    { claim: "No energy-restricting diets in people malnourished or at risk", grade: "B3-2: strong, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Vitamins and minerals at about the recommended daily allowance; no high-dose micronutrients without a deficiency", grade: "B2-4: strong, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Low-bacterial diet more than 30 days after allogeneic transplant", grade: "C4-3: strength of recommendation none, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Survivors keep a healthy weight, stay active and eat a diet low in saturated fat, red meat and alcohol", grade: "C5-2: strong, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Neutropenic diets did not decrease infection risk", grade: "Finding of the ASCO 2022 systematic review", source: "asco-diet-2022", quote: "Neutropenic diets did not decrease risk of infection during cancer treatment." },
    { claim: "Evidence for other diets and weight loss during treatment", grade: "Very limited (ASCO 2022)", source: "asco-diet-2022", quote: "Evidence for other dietary and weight loss interventions during cancer treatment was very limited." },
  ],
  sources: [
    {
      key: "espen-2021",
      label: "ESPEN practical guideline: Clinical Nutrition in cancer",
      publisher: "ESPEN (Clinical Nutrition)",
      year: 2021,
      url: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf",
      doi: "10.1016/j.clnu.2021.02.005",
      gradingScheme: "Each recommendation carries a strength (strong, weak or none), a level of evidence (high to very low) and the degree of consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-diet-2022",
      label: "Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2022,
      url: "https://doi.org/10.1200/JCO.22.00687",
      doi: "10.1200/JCO.22.00687",
      gradingScheme: "ASCO evidence quality and recommendation strength; not shown in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "acs-survivors-2022",
      label: "American Cancer Society nutrition and physical activity guideline for cancer survivors",
      publisher: "American Cancer Society (CA: A Cancer Journal for Clinicians)",
      year: 2022,
      url: "https://doi.org/10.3322/caac.21719",
      doi: "10.3322/caac.21719",
      gradingScheme: "Not shown in the abstract.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "nci-eating-hints",
      label: "Eating Hints: Before, During, and After Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/publications/patient-education/eatinghints.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nci-bleeding-page",
      label: "Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/bleeding-bruising",
      gradingScheme: "Patient information page; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acs-oral-chemo",
      label: "Getting Oral Chemotherapy",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/oral-chemotherapy.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  sections: ["nutrition-lifestyle"],
  related: ["bleeding-precautions-when-platelets-are-low", "food-safety-and-neutropenic-diet"],
  gaps: [
    "The ASCO 2022 guideline and the ACS 2022 survivor guideline were read as abstracts; their recommendation strengths and the ACS recommendations themselves were not read.",
    "No graded recommendation on alcohol during active treatment was found; the advice read is tied to specific risks (low platelets, diarrhoea), and ESPEN's alcohol recommendation is for survivors.",
    "Which foods interact with which oral anticancer drugs is in each drug's label and was not compiled here.",
    "Evidence for any specific diet, and for intentional weight loss during treatment, is very limited (ASCO 2022).",
    "The ESPEN guideline text extracts its grade separators as a stray letter, so grades are restated in plain words rather than quoted.",
    "Macmillan's chemotherapy side effects page, the source for avoiding alcohol with diarrhoea, was last reviewed in 2018 and is marked as under review.",
  ],
});
