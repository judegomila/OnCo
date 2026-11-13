import { protocol } from "./helpers";

/*
 * Exercise during and after cancer treatment: who needs a check before starting, the dose, who should supervise, and
 * the structured programme after colon cancer that ESMO now recommends on survival grounds.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO guideline on exercise, diet and weight management during cancer treatment (Ligibel et al., J Clin Oncol
 *   2022): abstract only, from Europe PMC; ascopubs.org refused a script and PubMed Central holds no copy.
 * - ACSM international multidisciplinary roundtable, exercise guidelines for cancer survivors (Campbell et al., Med
 *   Sci Sports Exerc 2019): full text of the author manuscript from PubMed Central (PMC8576825) through NCBI efetch,
 *   including the triage table (Table 4) and the programming considerations (Table 5).
 * - Clinical Oncology Society of Australia position statement on exercise in cancer care (Cormie et al., Med J Aust
 *   2018): abstract only, from Europe PMC.
 * - ESMO Clinical Practice Guideline Express Update on physical exercise in localised colon cancer (ESMO Open 2026):
 *   full text from Europe PMC (PMC12947638).
 * - CHALLENGE randomised trial (Courneya et al., N Engl J Med 2025): abstract, from Europe PMC.
 * - ASCO-SIO fatigue guideline update (J Clin Oncol 2024): full text, PMC12082589 (for exercise and fatigue).
 * - Consensus statement on exercise for older adults living with and beyond cancer (Cancer 2026): full text from
 *   Europe PMC (PMC12778376); used for a variant only.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const exerciseDuringAndAfterCancerTreatment = protocol({
  id: "exercise-during-and-after-cancer-treatment",
  name: "Exercise during and after cancer treatment: assessment, dose and referral",
  aka: ["exercise prescription in cancer", "physical activity after cancer", "exercise oncology", "structured exercise after colon cancer", "CHALLENGE exercise programme", "avoid inactivity"],
  domain: "survivorship",
  tldr: "Exercise is safe for most people during and after cancer treatment and helps with tiredness, fitness, strength and mood. The usual aim is to build up to about 30 minutes of moderate activity such as brisk walking three times a week, plus strength exercise twice a week, starting low. Some people should be checked first, for example with cancer in the bones, heart or lung disease, or nerve damage.",
  simple: "Moving your body is good during and after cancer treatment. Start slowly. Ask your team if you need a check first.",
  summary: "ASCO (2022) recommends that oncology providers recommend regular aerobic and resistance exercise during active treatment with curative intent, and says preoperative exercise may be recommended before lung cancer surgery. The ACSM roundtable (2019) concluded that exercise testing and training are generally safe, that every survivor should avoid inactivity, and that moderate aerobic training at least three times a week for at least 30 minutes, for 8 to 12 weeks, with or without resistance training twice a week, improves anxiety, depression, fatigue, physical function and quality of life. It adapts the NCCN triage: no further evaluation for people without comorbidities; a pre-exercise medical evaluation for neuropathy, musculoskeletal problems, poor bone health or lymphoedema; and evaluation, clearance and referral to trained staff for bone metastases, recent lung or abdominal surgery, an ostomy, cardiopulmonary disease, ataxia, extreme fatigue or severe malnutrition. COSA (2018) calls for referral to an accredited exercise physiologist or physiotherapist as best practice.\n\nThe CHALLENGE trial (2025) is the first phase 3 evidence of a survival effect: a three-year structured programme started after adjuvant chemotherapy for colon cancer lengthened disease-free survival (5-year 80.3 against 73.9 per cent, hazard ratio 0.72), with findings consistent with longer overall survival. The ESMO Express Update (2026) now says patients with resected stage III or high-risk stage II colon cancer should be told of this evidence and of their eligibility [I, A], and that participation can be recommended after shared decision-making [II, B; ESMO-MCBS A].",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "Adults during curative-intent treatment and after treatment (ASCO 2022; ACSM 2019; COSA 2018). The colon cancer recommendation applies to people with resected stage III or high-risk stage II colon cancer who have finished adjuvant chemotherapy (ESMO 2026, CHALLENGE). Evidence in advanced cancer is thinner: ASCO-SIO 2024 found it insufficient to recommend exercise for fatigue in advanced cancer or at the end of life. Children have their own ACSM consensus (2026), not read here.",
  trigger: "A cancer diagnosis; the start of treatment; the end of treatment; and at follow-up.",
  steps: [
    {
      action: "Recommend regular aerobic and resistance exercise to everyone on curative-intent treatment, and tell every survivor to avoid inactivity",
      why: "Exercise during treatment improves fitness, strength and tiredness, and being inactive makes recovery slower.",
      source: "asco-2022",
      quote: "Oncology providers should recommend regular aerobic and resistance exercise during active treatment with curative intent and may recommend preoperative exercise for patients undergoing surgery for lung cancer.",
    },
    {
      action: "Triage before starting: no extra evaluation for people without comorbidities; a medical evaluation first for neuropathy, musculoskeletal problems, poor bone health or lymphoedema",
      why: "Most people can simply start; some side effects need the programme adjusting to avoid falls or injury.",
      source: "acsm-2019",
      quote: "No comorbidities No further pre-exercise medical evaluation * Follow general exercise recommendations Peripheral neuropathy, arthritis/musculoskeletal issues, poor bone health (e.g., osteopenia or osteoporosis), lymphedema Recommend pre-exercise medical evaluation * Modify general exercise recommendations based on assessments Consider referral to trained personnel",
    },
    {
      action: "Require medical clearance and refer to trained staff before exercise for bone metastases, recent lung or abdominal surgery, an ostomy, heart or lung disease, ataxia, extreme fatigue, severe malnutrition or a worsening condition",
      why: "These carry a higher risk of harm during exercise, such as fracture or a heart problem, and need a supervised programme.",
      source: "acsm-2019",
      quote: "Lung or abdominal surgery, ostomy, cardiopulmonary disease, ataxia, extreme fatigue, severe nutritional deficiencies, worsening/changing physical condition (i.e., lymphedema exacerbation), bone metastases Pre-exercise medical evaluation * and clearance by physician prior to exercise Referral to trained personnel",
    },
    {
      action: "Do not make a fitness test a condition of starting low-intensity walking, cycling, gradual resistance training or stretching",
      why: "Requiring tests first puts people off; most can start gentle exercise safely without them.",
      source: "acsm-2019",
      quote: "For this reason, no assessments are required to start low intensity aerobic training (i.e., walking or cycling), resistance training with gradual progression, or a flexibility program in most survivors.",
    },
    {
      action: "Prescribe moderate aerobic exercise at least three times a week for at least 30 minutes, for 8 to 12 weeks or more, with resistance training at least twice a week if possible",
      why: "This is the dose that most consistently improved tiredness, mood, physical function and quality of life in trials.",
      source: "acsm-2019",
      quote: "Based on the current literature, an effective exercise prescription that most consistently addresses health-related outcomes experienced due to a cancer diagnosis and cancer treatment includes moderate intensity aerobic training at least 3 times per week, for at least 30 minutes, for at least 8–12 weeks. The addition of resistance training to aerobic training, at least 2 times per week, using at least 2 sets of 8–15 repetitions at least 60% of one repetition maximum, appears to results in similar benefits",
    },
    {
      action: "With bone metastases or bone loss, avoid high-impact loads, loaded or extreme bending of the spine and twisting movements",
      why: "Weakened bone can break under heavy or sudden loads.",
      source: "acsm-2019",
      quote: "Avoid contraindicated movements that place an excessively high load on fragile skeletal sites. These include the following: high-impact loads, hyperflexion or hyperextension of the trunk, flexion or extension of the trunk with added resistance, and dynamic twisting motion",
    },
    {
      action: "Refer to an exercise professional with cancer experience (an accredited exercise physiologist or physiotherapist) where one is available",
      why: "A trained professional can tailor the programme to the person's treatment and side effects and keep it safe.",
      source: "cosa-2018",
      quote: "best practice cancer care to include referral to an accredited exercise physiologist or physiotherapist with experience in cancer care.",
    },
    {
      action: "After surgery and adjuvant chemotherapy for stage III or high-risk stage II colon cancer, tell the person about the survival evidence for a structured exercise programme and their eligibility, and agree whether to join one",
      why: "In a large randomised trial a coached three-year programme lowered the chance of the cancer coming back or of dying.",
      source: "esmo-colon-2026",
      quote: "Patients with resected stage III or high-risk stage II colon cancer should be informed of the available evidence suggesting survival benefits from a structured exercise programme [I, A].",
      grade: "[I, A]",
    },
  ],
  bestInClass: {
    statement: "For everyone during curative treatment, ASCO 2022 (recommend aerobic and resistance exercise) and the ACSM 2019 roundtable (dose, triage, avoid inactivity) agree; COSA 2018 goes further in calling referral to an accredited exercise professional best practice. After colon cancer, ESMO's 2026 Express Update is the strongest graded recommendation read, resting on the CHALLENGE trial: inform eligible patients [I, A] and recommend a structured programme after shared decision-making [II, B; MCBS A]. No guideline read yet extends the survival claim to other cancers.",
    sources: ["asco-2022", "acsm-2019", "cosa-2018", "esmo-colon-2026", "challenge-2025"],
  },
  variants: [
    {
      name: "CHALLENGE structured programme after colon cancer",
      differs: "Three years of behavioural support and supervised exercise, aiming for an increase of at least 10 MET-hours a week in recreational aerobic activity (about 150 minutes of moderate activity), starting soon after adjuvant chemotherapy.",
      evidence: "Phase 3 trial of 889 patients: disease-free survival hazard ratio 0.72 (95 per cent confidence interval 0.55 to 0.94); hazard ratio for death 0.63; musculoskeletal adverse events 18.5 against 11.5 per cent. ESMO 2026 notes adherence to supervised sessions fell from 79 per cent in months 1 to 6 to 44 per cent in months 13 to 36.",
      sources: ["challenge-2025", "esmo-colon-2026"],
    },
    {
      name: "Preoperative exercise before lung cancer surgery",
      differs: "Exercise before an operation rather than during or after treatment.",
      evidence: "ASCO 2022: may be recommended, because it reduced postoperative length of stay and complications in patients with lung cancer.",
      sources: ["asco-2022"],
    },
    {
      name: "Older adults (over 65)",
      differs: "A consensus panel set 11 good-practice recommendations for older survivors on medical clearance, pre-exercise assessment, prescription, tolerance and safety, delivery and behavioural support, aiming to keep barriers low.",
      evidence: "Consensus (GRADE evidence-to-decision framework for good practice statements, 85 per cent agreement threshold), not graded evidence.",
      sources: ["older-adults-2026"],
    },
  ],
  grades: [
    { claim: "Participation in a structured exercise programme after colon cancer", grade: "[II, B; ESMO-MCBS v2.0 score: A]", source: "esmo-colon-2026", quote: "After discussion and joint decision making on exercise intensity and implementability, participation of eligible patients in a structured exercise programme can be recommended [II, B; ESMO-Magnitude of Clinical Benefit Scale (MCBS) v2.0 score: A]." },
    { claim: "Exercise reduces fatigue during treatment", grade: "Moderate; Strong", source: "asco-sio-2024", quote: "1.1. Clinicians should recommend exercise (aerobic, resistance, or a combination) to reduce the severity of fatigue during cancer treatment." },
    { claim: "Disease-free survival with structured exercise after colon cancer", grade: "phase 3 randomised trial, P = 0.02", source: "challenge-2025", quote: "At a median follow-up of 7.9 years, disease-free survival was significantly longer in the exercise group than in the health-education group (hazard ratio for disease recurrence, new primary cancer, or death, 0.72; 95% confidence interval [CI], 0.55 to 0.94; P = 0.02)." },
  ],
  sources: [
    { key: "asco-2022", label: "Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35576506", doi: "10.1200/JCO.22.00687", read: "abstract", accessed: "2026-11-11" },
    { key: "acsm-2019", label: "Exercise Guidelines for Cancer Survivors: Consensus Statement from International Multidisciplinary Roundtable", publisher: "American College of Sports Medicine, Medicine and Science in Sports and Exercise", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8576825/", doi: "10.1249/MSS.0000000000002116", gradingScheme: "Evidence rated as strong, moderate or insufficient for each outcome; prescriptions are not graded individually.", read: "full-text", accessed: "2026-11-11" },
    { key: "cosa-2018", label: "Clinical Oncology Society of Australia position statement on exercise in cancer care", publisher: "COSA, Medical Journal of Australia", year: 2018, url: "https://europepmc.org/abstract/MED/29719196", doi: "10.5694/mja18.00199", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-colon-2026", label: "ESMO Clinical Practice Guideline Express Update on the adoption of physical exercise in patients with localised colon cancer", publisher: "ESMO, ESMO Open", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12947638/", doi: "10.1016/j.esmoop.2025.106019", gradingScheme: "ESMO levels of evidence I to V and grades of recommendation A to E, with ESMO-MCBS v2.0 scores.", read: "full-text", accessed: "2026-11-11" },
    { key: "challenge-2025", label: "Structured Exercise after Adjuvant Chemotherapy for Colon Cancer (CHALLENGE)", publisher: "New England Journal of Medicine", year: 2025, url: "https://europepmc.org/abstract/MED/40450658", doi: "10.1056/NEJMoa2502760", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-sio-2024", label: "Management of Fatigue in Adult Survivors of Cancer: ASCO-Society for Integrative Oncology Guideline Update", publisher: "ASCO and SIO, Journal of Clinical Oncology", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12082589/", doi: "10.1200/JCO.24.00541", gradingScheme: "Evidence quality high to insufficient; recommendation strong or conditional.", read: "full-text", accessed: "2026-11-11" },
    { key: "older-adults-2026", label: "Exercise recommendations for older adults living with and beyond cancer: a consensus statement", publisher: "Cancer", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12778376/", doi: "10.1002/cncr.70252", gradingScheme: "Good practice statements; consensus at 85 per cent agreement.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-crc-exercise-as-a-funded-treatment", "idea-bio2-prehabilitation-standard"],
  gaps: [
    "The ASCO 2022 guideline was read only as an abstract; its strength and evidence ratings, and its special considerations for advanced cancer, are not given here.",
    "COSA 2018 was read only as an abstract; whether COSA has updated its statement since was not established.",
    "The CHALLENGE result is for colon cancer after adjuvant chemotherapy; whether a structured programme improves survival after other cancers has not been shown in a phase 3 trial.",
    "No UK national guideline on exercise in cancer was read; NICE has no dedicated guideline on it.",
    "The ACSM 2026 consensus on exercise for children and adolescents with cancer was found but not read (title and abstract only in Europe PMC).",
  ],
  institutions: ["asco", "esmo"],
  technologies: ["exercise-oncology", "exercise-during-chemotherapy", "structured-exercise-survivorship", "exercise-prescription-after-cancer"],
  cancers: ["colon-cancer"],
  terms: ["cancer-related-fatigue", "bone-metastases"],
  keyPapers: ["paper-challenge-exercise-nejm-2025"],
  related: ["cancer-related-fatigue-screening-and-management", "lymphoedema-risk-reduction-surveillance-and-treatment"],
  sections: ["supportive-care", "nutrition-lifestyle"],
  tags: ["protocol", "exercise", "survivorship", "supportive-care"],
});
