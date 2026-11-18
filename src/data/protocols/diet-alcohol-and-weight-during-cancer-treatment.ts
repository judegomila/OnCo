import { protocol } from "./helpers";

/*
 * Diet, alcohol, supplements, food safety and weight during cancer treatment.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * and each claim checked against it; quotes were checked verbatim by script.
 * - ESPEN practical guideline: Clinical Nutrition in cancer (Clin Nutr 2021): full text, the PDF on the ESPEN website,
 *   fetched with curl and read with pdftotext. Grades are printed as "strength of recommendation ... Level of
 *   evidence ... consensus"; the separators in the PDF extract as a stray letter, so grades are restated in plain
 *   words.
 * - ASCO, Exercise, Diet, and Weight Management During Cancer Treatment (J Clin Oncol 2022): abstract, from Europe
 *   PMC (a copy saved the same day by the checker of the food safety protocol was re-used). The full text is not open.
 * - American Cancer Society nutrition and physical activity guideline for cancer survivors (CA Cancer J Clin 2022):
 *   abstract from Europe PMC (no recommendation text in the abstract); the publisher's full text answered 403.
 * - NCI, Eating Hints (PDF printed December 2022): full text, fetched with curl, pdftotext.
 * - NCI, Chemotherapy and You (printed January 2024), NCI, Bleeding and Bruising (reviewed December 2022) and
 *   Macmillan, Side effects of chemotherapy (reviewed 2018, under review): full text, copies saved the same day by
 *   the checker of the bleeding precautions protocol were re-used.
 * - American Cancer Society, Getting Oral Chemotherapy (revised 15 May 2025): full text, a copy saved the same day by
 *   the checker of the oral anticancer medicines protocol was re-used.
 * Every DOI was resolved through Crossref and Europe PMC; a Europe PMC title search found no newer edition of the
 * ESPEN, ASCO or ACS guideline.
 */
export const dietAlcoholAndWeightDuringCancerTreatment = protocol({
  id: "diet-alcohol-and-weight-during-cancer-treatment",
  name: "Diet, alcohol and weight during cancer treatment",
  aka: ["eating during chemotherapy", "nutrition during cancer treatment", "alcohol during chemotherapy", "neutropenic diet", "food safety during cancer treatment", "supplements during cancer treatment"],
  domain: "nutrition",
  tldr: "During treatment the aim is to eat enough, with extra protein and calories if needed; talk to the team before any diet to lose weight. Handle food safely, but a 'neutropenic diet' is not recommended to prevent infection. Check before drinking alcohol, which may need limiting when platelets are low, and ask whether food affects your tablets. Regular exercise is recommended.",
  simple: "Try to eat enough, with extra protein if you need it, and have your weight checked. Talk to a doctor, nurse or dietitian if eating is hard. Tell your team about any vitamins or supplements. Wash hands and food and cook meat and eggs well. A 'neutropenic diet' is not recommended to stop infection. Ask before drinking alcohol. Keep active if you can.",
  summary: "ESPEN's practical guideline (2021) recommends checking intake, weight change and BMI regularly from diagnosis (strong, very low evidence), protein above 1 g/kg/day and if possible up to 1.5 g/kg/day (strong, moderate), no diets that restrict energy in people who are malnourished or at risk (strong, low), vitamins and minerals at about the recommended daily allowance, discouraging high-dose micronutrients without a specific deficiency (strong, low), and for survivors a healthy weight, physical activity and a diet low in saturated fat, red meat and alcohol (strong, low). It finds insufficient data to recommend a low-bacterial diet more than 30 days after allogeneic transplant. ASCO (2022) says oncology providers should recommend regular aerobic and resistance exercise during treatment with curative intent, does not recommend neutropenic diets to prevent infection, and finds evidence for other diets and for weight loss during treatment very limited. NCI's Eating Hints (2022) gives practical food safety for people whose treatment makes them prone to foodborne illness (clean hands, separate boards, thorough cooking, pasteurised products) with a longer list of foods to avoid, which goes further than ASCO's recommendation. Alcohol advice is about specific risks: NCI says people may be advised to limit or avoid it if platelets are low and lists it among drinks that can make diarrhoea and a dry mouth worse, and Macmillan says it can help to avoid it with diarrhoea. ACS (2025) says food and drug interactions can sometimes change how well oral chemotherapy works.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "doctor", "nurse"],
    where: ["home", "outpatient-clinic"],
  },
  population: "Adults with cancer (ESPEN and ASCO are written for adults), during active treatment and as survivors after it. ESPEN gives separate recommendations, not set out here, for people who are malnourished or losing weight, for radiotherapy to the head and neck, chest or digestive tract, and for stem cell transplant; food rules after a transplant are on the food safety protocol.",
  trigger: "Starting cancer treatment, or weight loss, poor appetite or questions about diet during treatment.",
  steps: [
    {
      action: "Have intake, weight change and BMI checked from diagnosis and repeated according to how stable the clinical situation is, and talk to the doctor, nurse or dietitian about any eating problems",
      why: "ESPEN says malnutrition is common in people with cancer and that nutritional therapy should preferably start before a person is severely malnourished; regular checks are how it is found early. NCI's booklet says to talk with the doctor, nurse or dietitian about eating problems.",
      source: "espen-2021",
      quote: "To detect nutritional disturbances at an early stage, we recommend to regularly evaluate nutritional intake, weight change, and body mass index (BMI), beginning with cancer diagnosis and repeated depending on the stability of the clinical situation.",
      grade: "Recommendation B1-1: strength of recommendation strong, level of evidence very low, strong consensus",
    },
    {
      action: "Eat enough, with extra protein and calories if needed, and do not start a diet that cuts calories while malnourished or at risk of it",
      why: "ESPEN says malnutrition worsens quality of life and treatment side effects. NCI's booklet says people with cancer need to eat to keep their strength up to deal with side effects, and may need extra protein and calories.",
      source: "espen-2021",
      quote: "We recommend not to use dietary provisions that restrict energy intake in patients with or at risk of malnutrition.",
      grade: "Recommendation B3-2: strength of recommendation strong, level of evidence low, strong consensus",
    },
    {
      action: "Tell the team about every vitamin, mineral, herb or supplement, and avoid high doses unless a specific deficiency has been found",
      why: "NCI's booklet says some of these products can change how cancer treatment works, and that no studies prove any of them can slow or cure cancer. ESPEN discourages high-dose micronutrients where there is no specific deficiency.",
      source: "nci-eating-hints",
      quote: "Tell your doctor, nurse, or dietitian about any vitamin, mineral, dietary supplements, or herbs you are already taking or plan to take.",
      grade: "Not graded (patient booklet); ESPEN B2-4 on high-dose micronutrients: strong, low evidence",
    },
    {
      action: "Handle food safely: wash hands, knives and surfaces, use a separate cutting board for meat, cook meat and eggs thoroughly, and use pasteurised juice, egg and milk products",
      why: "NCI's booklet says some cancer treatments can make a person prone to foodborne illness.",
      source: "nci-eating-hints",
      quote: "Wash your hands, knives, and countertops before and after you prepare food.",
      grade: "Not graded (patient booklet)",
    },
    {
      action: "Do not follow a neutropenic diet to prevent infection during active treatment",
      why: "ASCO's review found that neutropenic diets did not decrease the risk of infection during cancer treatment.",
      source: "asco-diet-2022",
      quote: "Neutropenic diets are not recommended to prevent infection in patients with cancer during active treatment.",
      grade: "ASCO guideline recommendation (strength not shown in the abstract)",
    },
    {
      action: "Check with the doctor or nurse before drinking alcohol; you may be advised to limit or avoid it if platelets are low, and it can help to avoid it during diarrhoea",
      why: "NCI's bleeding page suggests asking whether to limit or avoid things that could increase the risk of bleeding, such as alcohol, and its chemotherapy booklet says to check before drinking it. NCI's Eating Hints lists alcohol among drinks that can make diarrhoea worse, and Macmillan says it can help to avoid it.",
      source: "nci-bleeding-page",
      quote: "You may also be advised to limit or avoid alcohol if your platelet count is low.",
      grade: "Not graded (patient information)",
    },
    {
      action: "If taking anticancer tablets or capsules, ask whether any food, vitamins, herbs or supplements must be avoided, and whether they can be mixed with food or liquid",
      why: "ACS says food and drug interactions can sometimes make the treatment less effective or cause additional side effects.",
      source: "acs-oral-chemo",
      quote: "Sometimes there are food and drug interactions that can change how well the chemo works, making it less effective or causing additional side effects.",
      grade: "Not graded (patient information)",
    },
    {
      action: "Keep active: regular aerobic and resistance exercise is recommended during treatment given with the aim of cure",
      why: "ASCO's review found that exercise during cancer treatment led to improvements in cardiorespiratory fitness, strength and fatigue.",
      source: "asco-diet-2022",
      quote: "Oncology providers should recommend regular aerobic and resistance exercise during active treatment with curative intent and may recommend preoperative exercise for patients undergoing surgery for lung cancer.",
      grade: "ASCO guideline recommendation (strength not shown in the abstract)",
    },
  ],
  bestInClass: {
    statement: "ESPEN's practical guideline (2021) and ASCO's exercise, diet and weight guideline (2022) are the graded guidelines read here, and no newer edition of either was found. ESPEN recommends screening intake and weight from diagnosis, no energy-restricting diets in people who are malnourished or at risk, and discourages high-dose micronutrients without a specific deficiency; the ASCO abstract does not cover those points. Both support physical activity during treatment: ESPEN for cancer patients in general (strong, high evidence), ASCO for treatment with curative intent. ASCO does not recommend neutropenic diets to prevent infection; ESPEN finds insufficient data to recommend a low-bacterial diet more than 30 days after allogeneic transplant. ASCO says evidence for other diets and for weight loss during treatment is very limited; ESPEN's commentary says no diet is known to reproducibly cure cancer or prevent recurrence. After treatment, ESPEN recommends a healthy weight and a diet low in saturated fat, red meat and alcohol (strong, low evidence). No graded recommendation on alcohol during treatment was found; patient guidance ties it to specific risks (low platelets, diarrhoea, a sore or dry mouth).",
    sources: ["espen-2021", "asco-diet-2022"],
  },
  variants: [
    {
      name: "Restricted food list when treatment makes foodborne illness more likely (NCI Eating Hints)",
      differs: "Beyond safe handling, advises not eating produce that is not easily scrubbed such as berries and grapes, raw fish or shellfish, raw nuts, food from bulk bins, buffets and salad bars, mouldy cheeses, and leftover rice.",
      evidence: "Patient booklet, not graded. It goes further than ASCO 2022, which found that neutropenic diets did not decrease the risk of infection and does not recommend them.",
      sources: ["nci-eating-hints", "asco-diet-2022"],
    },
    {
      name: "Low-bacterial diet after allogeneic stem cell transplant",
      differs: "A diet low in bacteria kept up after a stem cell transplant; ESPEN's commentary says neutropenic diets after transplant were introduced in the 1980s as a way of preventing infection.",
      evidence: "ESPEN 2021 recommendation C4-3: insufficient consistent clinical data to recommend a low-bacterial diet more than 30 days after allogeneic transplant (strength of recommendation none, low evidence); it cites a Cochrane review that found no evidence to support a low-bacterial diet for preventing infection during chemotherapy-induced neutropenia.",
      sources: ["espen-2021"],
    },
    {
      name: "Survivorship diet and weight (ESPEN, ACS)",
      differs: "After treatment, aims for a healthy weight (BMI 18.5 to 25), physical activity, and a diet based on vegetables, fruits and whole grains, low in saturated fat, red meat and alcohol.",
      evidence: "ESPEN 2021 recommendation C5-2, strong, low evidence. The ACS 2022 survivor guideline's abstract says it gives recommendations on body measurements, physical activity, diet and alcohol; the recommendations themselves were not read.",
      sources: ["espen-2021", "acs-survivors-2022"],
    },
  ],
  grades: [
    { claim: "Regular screening of intake, weight change and BMI from diagnosis", grade: "B1-1: strong, very low evidence, strong consensus", source: "espen-2021" },
    { claim: "Protein intake above 1 g/kg/day and, if possible, up to 1.5 g/kg/day", grade: "B2-2: strong, moderate evidence, strong consensus", source: "espen-2021" },
    { claim: "No energy-restricting diets in people malnourished or at risk", grade: "B3-2: strong, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Vitamins and minerals at about the recommended daily allowance; high-dose micronutrients discouraged without a specific deficiency", grade: "B2-4: strong, low evidence, strong consensus", source: "espen-2021" },
    { claim: "Maintained or increased physical activity in cancer patients", grade: "B4-1: strong, high evidence, consensus", source: "espen-2021" },
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
      gradingScheme: "Each recommendation carries a strength (strong, weak or none), a level of evidence (high to very low) and the degree of consensus (consensus or strong consensus).",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "nci-eating-hints",
      label: "Eating Hints: Before, During, and After Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/publications/patient-education/eatinghints.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed as NIH Publication No. 22-7157, December 2022.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-chemo-and-you",
      label: "Chemotherapy and You: Support for People with Cancer",
      publisher: "National Cancer Institute (US)",
      year: 2024,
      url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf",
      gradingScheme: "Patient booklet; recommendations are not graded. Printed as NIH Publication No. 24-7157, January 2024.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-bleeding-page",
      label: "Bleeding and Bruising (Thrombocytopenia) and Cancer Treatment",
      publisher: "National Cancer Institute (US)",
      year: 2022,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/bleeding-bruising",
      gradingScheme: "Patient information page; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acs-oral-chemo",
      label: "Getting Oral Chemotherapy",
      publisher: "American Cancer Society (with ASCO medical review)",
      year: 2025,
      url: "https://www.cancer.org/cancer/treatment-types/chemotherapy/oral-chemotherapy.html",
      gradingScheme: "Patient information page; not graded. Last revised 15 May 2025.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-chemo-side-effects",
      label: "Side effects of chemotherapy",
      publisher: "Macmillan Cancer Support",
      year: 2018,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/chemotherapy/side-effects-of-chemotherapy",
      gradingScheme: "Patient information page; not graded. Reviewed September 2018, page marked as under review.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  sections: ["nutrition-lifestyle"],
  related: ["bleeding-precautions-when-platelets-are-low", "food-safety-and-neutropenic-diet"],
  gaps: [
    "The ASCO 2022 guideline and the ACS 2022 survivor guideline were read as abstracts; their recommendation strengths and the ACS recommendations themselves were not read. On 17 November 2026 the ACS full text at the publisher answered 403 and Europe PMC lists no open copy of either.",
    "No graded recommendation on alcohol during active treatment was found; the advice read is tied to specific risks (low platelets, diarrhoea, a sore or dry mouth), and ESPEN's alcohol recommendation is for survivors. NCI's advice to check with the doctor or nurse before drinking alcohol is printed in the bleeding section of its chemotherapy booklet.",
    "The patient sources are from the United States (NCI, ACS) and the United Kingdom (Macmillan); no UK dietetic guidance was read, and the NCI food list is one country's patient advice.",
    "The ASCO abstract does not say whether its recommendation against neutropenic diets extends to stem cell transplant recipients; food rules after transplant are on the food safety protocol.",
    "Which foods interact with which oral anticancer drugs, and which are taken with or without food, is in each drug's label and was not compiled here.",
    "Evidence for any specific diet, and for intentional weight loss during treatment, is very limited (ASCO 2022).",
    "The ESPEN guideline text extracts its grade separators as a stray letter, so grades are restated in plain words rather than quoted.",
    "Macmillan's chemotherapy side effects page, the source for avoiding alcohol with diarrhoea, was last reviewed in 2018 and is marked as under review.",
  ],
});
