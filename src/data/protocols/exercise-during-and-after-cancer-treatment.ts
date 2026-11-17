import { protocol } from "./helpers";

/*
 * Exercise during and after cancer treatment: who needs a check before starting, the dose, who should supervise, and
 * the structured programme after colon cancer that ESMO now recommends on survival grounds.
 *
 * What was read, and how (first on 11 November 2026; every source re-read as raw text on 17 November 2026 in a
 * second accuracy pass, and every quote re-checked against the raw text by script):
 * - ASCO guideline on exercise, diet and weight management during cancer treatment (Ligibel et al., J Clin Oncol
 *   2022): abstract only, from the Europe PMC REST record; ascopubs.org refuses a script and PubMed Central holds no
 *   copy.
 * - ACSM international multidisciplinary roundtable, exercise guidelines for cancer survivors (Campbell et al., Med
 *   Sci Sports Exerc 2019): full text of the author manuscript (PMC8576825) through NCBI efetch, including the triage
 *   table (Table 4) and the programming considerations (Table 5). Europe PMC's full-text endpoint answered 500.
 * - Clinical Oncology Society of Australia position statement on exercise in cancer care (Cormie et al., Med J Aust
 *   2018): abstract only, from Europe PMC. COSA's own site did not yield the statement to a script.
 * - ESMO Clinical Practice Guideline Express Update on physical exercise in localised colon cancer (ESMO Open 2026):
 *   full text from Europe PMC (PMC12947638). Its Supplementary Table S1 (the grading scheme) was not read.
 * - CHALLENGE randomised trial (Courneya et al., N Engl J Med 2025): abstract, from Europe PMC.
 * - ASCO-SIO fatigue guideline update (J Clin Oncol 2024): full text, PMC12082589, re-using the copy the checker of
 *   the fatigue protocol fetched from Europe PMC on 17 November 2026.
 * - Consensus statement on exercise for older adults living with and beyond cancer (Cancer 2026): full text from
 *   Europe PMC (PMC12778376); used for a variant only.
 * Every DOI was resolved through Europe PMC (four also through Crossref) and its title checked. Quotes are copied
 * from the raw text unchanged. The second pass removed wording no source prints ("recent" surgery, "brisk walking",
 * reasons in several why lines), moved "avoid inactivity" from the ASCO step to a step that cites ACSM, and restored
 * "at least" to the ACSM dose.
 */
export const exerciseDuringAndAfterCancerTreatment = protocol({
  id: "exercise-during-and-after-cancer-treatment",
  name: "Exercise during and after cancer treatment: assessment, dose and referral",
  aka: ["exercise prescription in cancer", "physical activity after cancer", "exercise oncology", "structured exercise after colon cancer", "CHALLENGE exercise programme", "avoid inactivity"],
  domain: "survivorship",
  tldr: "Exercise is generally safe during and after cancer treatment and helps with tiredness, fitness, strength and mood. The best-supported dose is moderate aerobic activity for at least 30 minutes, at least three times a week; strength exercise twice a week or more can be added. Build up to it. Some people need a check first, for example with cancer in the bones, heart or lung disease, or nerve damage.",
  simple: "Moving your body is good during and after cancer treatment. Build up bit by bit. Ask your team if you need a check first.",
  summary: "ASCO (2022) recommends that oncology providers recommend regular aerobic and resistance exercise during active treatment with curative intent, and says preoperative exercise may be recommended before lung cancer surgery. The ACSM roundtable (2019) concluded that exercise testing and training are generally safe for cancer survivors, that every survivor should avoid inactivity, and that specific doses of exercise could improve anxiety, depressive symptoms, fatigue, physical functioning and health-related quality of life. The prescription it found most consistently effective is moderate aerobic training at least three times a week for at least 30 minutes, for at least 8 to 12 weeks; adding resistance training at least twice a week appears to give similar benefits. It adapts the NCCN triage: no further evaluation for people without comorbidities; a pre-exercise medical evaluation for neuropathy, musculoskeletal problems, poor bone health or lymphoedema; and evaluation, clearance and referral to trained staff for bone metastases, lung or abdominal surgery, an ostomy, cardiopulmonary disease, ataxia, extreme fatigue, severe nutritional deficiencies or a worsening or changing physical condition. COSA (2018), the Australian society, calls for best practice cancer care to include referral to an accredited exercise physiologist or physiotherapist with experience in cancer care.\n\nESMO calls the phase 3 CHALLENGE trial (2025) the first high-level evidence of a disease-free survival benefit from a structured exercise programme after resected high-risk localised colon cancer: a three-year programme started soon after adjuvant chemotherapy lengthened disease-free survival (5-year 80.3 against 73.9 per cent, hazard ratio 0.72), with findings consistent with longer overall survival. The ESMO Express Update (2026) now says patients with resected stage III or high-risk stage II colon cancer should be told of this evidence and of their eligibility [I, A], and that participation can be recommended after shared decision-making [II, B; ESMO-MCBS A].",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "Adults during active treatment with curative intent (ASCO 2022) and cancer survivors during and after treatment (ACSM 2019; COSA 2018). The colon cancer recommendation applies to people with resected stage III or high-risk stage II colon cancer who have finished adjuvant chemotherapy (ESMO 2026, CHALLENGE); the trial enrolled fit people (performance status 0 or 1). In advanced cancer or at the end of life, ASCO-SIO 2024 found the evidence insufficient to recommend for or against exercise for fatigue. Children and adolescents have their own ACSM consensus statement (2026), not read here.",
  trigger: "Active treatment with curative intent (ASCO 2022); any point during or after treatment for a cancer survivor (ACSM 2019); and the end of adjuvant chemotherapy for resected stage III or high-risk stage II colon cancer (ESMO 2026).",
  steps: [
    {
      action: "Recommend regular aerobic and resistance exercise to adults on active treatment with curative intent",
      why: "In ASCO's review, exercise during treatment improved fitness, strength, tiredness and other outcomes that patients report.",
      source: "asco-2022",
      quote: "Oncology providers should recommend regular aerobic and resistance exercise during active treatment with curative intent and may recommend preoperative exercise for patients undergoing surgery for lung cancer.",
    },
    {
      action: "Tell every cancer survivor to avoid inactivity",
      why: "The roundtable found exercise training and testing generally safe for people who have or have had cancer.",
      source: "acsm-2019",
      quote: "Overall findings retained the conclusions that exercise training and testing was generally safe for cancer survivors and that every survivor should “avoid inactivity”.",
    },
    {
      action: "Triage before starting: no extra evaluation for people without comorbidities; a medical evaluation first for peripheral neuropathy, arthritis or musculoskeletal problems, poor bone health or lymphoedema, and consider referral to trained staff",
      why: "The roundtable sorts people by their risk of an adverse event caused by exercise. For this middle group the general programme is adjusted after the assessment.",
      source: "acsm-2019",
      quote: "No comorbidities No further pre-exercise medical evaluation * Follow general exercise recommendations Peripheral neuropathy, arthritis/musculoskeletal issues, poor bone health (e.g., osteopenia or osteoporosis), lymphedema Recommend pre-exercise medical evaluation * Modify general exercise recommendations based on assessments Consider referral to trained personnel",
    },
    {
      action: "Arrange a medical evaluation and a doctor's clearance, and refer to trained staff, before exercise for bone metastases, lung or abdominal surgery, an ostomy, heart or lung disease, ataxia, extreme fatigue, severe nutritional deficiencies or a worsening or changing physical condition",
      why: "The roundtable puts these in its highest group for risk of an adverse event caused by exercise. Trained staff means rehabilitation specialists or certified exercise physiologists.",
      source: "acsm-2019",
      quote: "Lung or abdominal surgery, ostomy, cardiopulmonary disease, ataxia, extreme fatigue, severe nutritional deficiencies, worsening/changing physical condition (i.e., lymphedema exacerbation), bone metastases Pre-exercise medical evaluation * and clearance by physician prior to exercise Referral to trained personnel",
    },
    {
      action: "For most survivors, do not make a fitness assessment a condition of starting low-intensity walking or cycling, resistance training with gradual progression, or a flexibility programme; medical clearance may still be indicated as in the triage above",
      why: "Requiring a full fitness assessment first may put an unnecessary barrier in the way of starting.",
      source: "acsm-2019",
      quote: "For this reason, no assessments are required to start low intensity aerobic training (i.e., walking or cycling), resistance training with gradual progression, or a flexibility program in most survivors.",
    },
    {
      action: "Prescribe moderate-intensity aerobic exercise at least three times a week for at least 30 minutes, for at least 8 to 12 weeks; resistance training at least twice a week can be added",
      why: "This is the prescription the roundtable found most consistently effective for the health problems that follow cancer and its treatment, such as tiredness, anxiety, low mood and loss of physical function. Adding resistance training appears to give similar benefits.",
      source: "acsm-2019",
      quote: "Based on the current literature, an effective exercise prescription that most consistently addresses health-related outcomes experienced due to a cancer diagnosis and cancer treatment includes moderate intensity aerobic training at least 3 times per week, for at least 30 minutes, for at least 8–12 weeks. The addition of resistance training to aerobic training, at least 2 times per week, using at least 2 sets of 8–15 repetitions at least 60% of one repetition maximum, appears to results in similar benefits",
    },
    {
      action: "With bone metastases or bone loss, avoid high-impact loads, loaded or extreme bending of the spine and twisting movements",
      why: "These movements put a very high load on fragile bone. The same table makes preventing falls a goal, because falls lead to fractures.",
      source: "acsm-2019",
      quote: "Avoid contraindicated movements that place an excessively high load on fragile skeletal sites. These include the following: high-impact loads, hyperflexion or hyperextension of the trunk, flexion or extension of the trunk with added resistance, and dynamic twisting motion",
    },
    {
      action: "Refer to an exercise professional with experience in cancer care (in COSA's Australian statement, an accredited exercise physiologist or physiotherapist)",
      why: "COSA calls this best practice cancer care, and wants exercise built into standard care to counteract the adverse effects of cancer and its treatment.",
      source: "cosa-2018",
      quote: "best practice cancer care to include referral to an accredited exercise physiologist or physiotherapist with experience in cancer care.",
    },
    {
      action: "After surgery and adjuvant chemotherapy for stage III or high-risk stage II colon cancer, tell the person about the survival evidence for a structured exercise programme and their eligibility, and agree whether to join one",
      why: "In a randomised trial of 889 people, a three-year structured programme lowered the combined chance of the cancer coming back, a new cancer or death.",
      source: "esmo-colon-2026",
      quote: "Patients with resected stage III or high-risk stage II colon cancer should be informed of the available evidence suggesting survival benefits from a structured exercise programme [I, A].",
      grade: "[I, A]",
    },
  ],
  bestInClass: {
    statement: "For everyone during curative treatment, ASCO 2022 (recommend aerobic and resistance exercise) and the ACSM 2019 roundtable (dose, triage, avoid inactivity) point the same way; COSA 2018, in Australia, goes further in calling referral to an accredited exercise professional best practice. After colon cancer, ESMO's 2026 Express Update is the strongest graded recommendation read, resting on the CHALLENGE trial: inform eligible patients [I, A], and participation in a structured programme can be recommended after discussion and joint decision-making [II, B; MCBS A]. No guideline read extends the survival claim to other cancers.",
    sources: ["asco-2022", "acsm-2019", "cosa-2018", "esmo-colon-2026", "challenge-2025"],
  },
  variants: [
    {
      name: "CHALLENGE structured programme after colon cancer",
      differs: "Three years of behavioural support and supervised exercise sessions, aiming to raise recreational aerobic exercise by at least 10 MET-hours a week in the first six months (which ESMO equates to at least 150 minutes of moderate-intensity aerobic activity a week) and then to keep or raise it, starting soon after adjuvant chemotherapy (in the trial, within 2 to 6 months of finishing it).",
      evidence: "Phase 3 trial, 889 patients randomised according to its abstract: disease-free survival hazard ratio 0.72 (95 per cent confidence interval 0.55 to 0.94); hazard ratio for death 0.63 (0.43 to 0.94); musculoskeletal adverse events 18.5 against 11.5 per cent. ESMO 2026 notes that attendance was 79 per cent at the mandatory supervised sessions of months 1 to 6 and 44 per cent at the recommended supervised sessions of months 13 to 36.",
      sources: ["challenge-2025", "esmo-colon-2026"],
    },
    {
      name: "Preoperative exercise before lung cancer surgery",
      differs: "Exercise before an operation rather than during or after treatment.",
      evidence: "ASCO 2022: providers may recommend it. In ASCO's evidence review, preoperative exercise in patients with lung cancer led to a shorter hospital stay after the operation and fewer complications.",
      sources: ["asco-2022"],
    },
    {
      name: "Older adults (65 and over)",
      differs: "A consensus panel reached 11 recommendations for older survivors on medical evaluation and clearance, pre-exercise assessment, prescription, tolerance and safety, delivery and behavioural support, aiming to keep barriers and risks as low as possible.",
      evidence: "Expert consensus (GRADE evidence-to-decision framework for good practice statements, consensus set at 85 per cent agreement); the paper says current guidelines lack specific guidance for older survivors because the evidence is insufficient.",
      sources: ["older-adults-2026"],
    },
  ],
  grades: [
    { claim: "Participation in a structured exercise programme after colon cancer", grade: "[II, B; ESMO-MCBS v2.0 score: A]", source: "esmo-colon-2026", quote: "After discussion and joint decision making on exercise intensity and implementability, participation of eligible patients in a structured exercise programme can be recommended [II, B; ESMO-Magnitude of Clinical Benefit Scale (MCBS) v2.0 score: A]." },
    { claim: "Exercise reduces fatigue during treatment", grade: "Evidence quality: Moderate; strength of recommendation: Strong", source: "asco-sio-2024", quote: "1.1. Clinicians should recommend exercise (aerobic, resistance, or a combination) to reduce the severity of fatigue during cancer treatment." },
    { claim: "Disease-free survival with structured exercise after colon cancer", grade: "phase 3 randomised trial, P = 0.02", source: "challenge-2025", quote: "At a median follow-up of 7.9 years, disease-free survival was significantly longer in the exercise group than in the health-education group (hazard ratio for disease recurrence, new primary cancer, or death, 0.72; 95% confidence interval [CI], 0.55 to 0.94; P = 0.02)." },
  ],
  sources: [
    { key: "asco-2022", label: "Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35576506", doi: "10.1200/JCO.22.00687", read: "abstract", accessed: "2026-11-17" },
    { key: "acsm-2019", label: "Exercise Guidelines for Cancer Survivors: Consensus Statement from International Multidisciplinary Roundtable", publisher: "American College of Sports Medicine, Medicine and Science in Sports and Exercise", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8576825/", doi: "10.1249/MSS.0000000000002116", gradingScheme: "Evidence rated as strong, moderate or insufficient for each outcome; prescriptions are not graded individually.", read: "full-text", accessed: "2026-11-17" },
    { key: "cosa-2018", label: "Clinical Oncology Society of Australia position statement on exercise in cancer care", publisher: "COSA, Medical Journal of Australia", year: 2018, url: "https://europepmc.org/abstract/MED/29719196", doi: "10.5694/mja18.00199", read: "abstract", accessed: "2026-11-17" },
    { key: "esmo-colon-2026", label: "ESMO Clinical Practice Guideline Express Update on the adoption of physical exercise in patients with localised colon cancer", publisher: "ESMO, ESMO Open", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12947638/", doi: "10.1016/j.esmoop.2025.106019", gradingScheme: "ESMO levels of evidence (roman numerals) and grades of recommendation (letters), defined in its Supplementary Table S1, with ESMO-MCBS v2.0 scores.", read: "full-text", accessed: "2026-11-17" },
    { key: "challenge-2025", label: "Structured Exercise after Adjuvant Chemotherapy for Colon Cancer (CHALLENGE)", publisher: "New England Journal of Medicine", year: 2025, url: "https://europepmc.org/abstract/MED/40450658", doi: "10.1056/NEJMoa2502760", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-sio-2024", label: "Management of Fatigue in Adult Survivors of Cancer: ASCO-Society for Integrative Oncology Guideline Update", publisher: "ASCO and SIO, Journal of Clinical Oncology", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12082589/", doi: "10.1200/JCO.24.00541", gradingScheme: "Each recommendation carries an evidence quality rating (those quoted here: moderate, low, insufficient) and a strength (strong or conditional).", read: "full-text", accessed: "2026-11-17" },
    { key: "older-adults-2026", label: "Exercise recommendations for older adults living with and beyond cancer: a consensus statement", publisher: "Cancer", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12778376/", doi: "10.1002/cncr.70252", gradingScheme: "Good practice statements; the panel voted each strong or conditional, with consensus set at 85 per cent agreement.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-crc-exercise-as-a-funded-treatment", "idea-bio2-prehabilitation-standard"],
  gaps: [
    "The ASCO 2022 guideline was read only as an abstract, again on 17 November 2026 (the publisher refuses a script and there is no open copy); its strength and evidence ratings, and its special considerations for advanced cancer, are not given here. No newer ASCO guideline on exercise during treatment was found in Europe PMC or Crossref.",
    "COSA 2018 was read only as an abstract. On 17 November 2026 COSA's own website did not yield the statement or a list of its position statements to a script, so whether COSA has updated it was not established. COSA is an Australian society and its referral standard names Australian professions.",
    "The ACSM 2019 dose and triage are a consensus of a roundtable, adapted from the NCCN survivorship guideline, which was not read. The roundtable's Table 4 lists lung or abdominal surgery without saying how recent.",
    "The CHALLENGE result is for colon cancer after adjuvant chemotherapy, in people fit enough to enrol; no source read reports a phase 3 trial showing that a structured programme improves survival after other cancers. Its abstract reports 889 patients randomised, while the ESMO Express Update's text says 962; the abstract's figure is used here. The full NEJM paper was not read.",
    "ESMO's grading definitions are in a supplementary table that was not read on 17 November 2026; the grades are quoted as printed in the recommendations.",
    "No UK national guideline on exercise in cancer was read, and no dedicated NICE guideline on it was found.",
    "The ACSM 2026 expert consensus statement on exercise for children and adolescents during and beyond cancer treatment (doi 10.1249/MSS.0000000000003958) was found in Europe PMC but not read.",
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
