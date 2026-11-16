import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Myocarditis caused by an immune checkpoint inhibitor, and the overlap with myositis and myasthenia gravis.
 *
 * What was read, and how: SITC 2021 (full text: general recommendations, the myositis/myocarditis/myasthenia overlap,
 * and the cardiovascular section and recommendations), as described in ./irae-sources.ts. ASCO 2021: abstract. Not
 * reachable to a script: the 2022 ESC cardio-oncology guideline and the 2025 ESC guideline on myocarditis and
 * pericarditis (both at academic.oup.com, which returned 403; Europe PMC holds no abstract or full text for either),
 * and ESMO 2022. The IC-OS 2022 consensus definitions were read as an abstract only, which gives no definition text.
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text on 11 November 2026.
 */
export const iraeMyocarditis = protocol({
  id: "irae-myocarditis",
  name: "Immune-related myocarditis from checkpoint inhibitors",
  aka: ["checkpoint inhibitor myocarditis", "ICI myocarditis", "immune checkpoint inhibitor-associated myocarditis", "immunotherapy heart inflammation", "myocarditis-myositis-myasthenia overlap"],
  domain: "immunotherapy-toxicity",
  tldr: "Rarely, immunotherapy inflames the heart muscle. It usually starts in the first three months and can be fatal, so new chest pain, breathlessness, palpitations, fainting, or new muscle weakness, drooping eyelids or double vision need urgent assessment. It is treated in hospital with very high-dose steroids straight away.",
  simple: "Very rarely, immunotherapy can inflame the heart. Chest pain, breathlessness, a racing or irregular heartbeat, fainting, or new weakness or double vision need urgent help.",
  summary: "Uncommon (about 1% in an eight-centre registry) but with high mortality: 50% of patients with myocarditis died in one retrospective series, and it clusters with myositis and myasthenia gravis, so suspicion of one should prompt a search for all three (SITC 2021). Median onset 34 days after starting. Troponin is raised in 94% and the ECG abnormal in 89%, while ejection fraction is normal in about half.\n\nSITC 2021: consider myocarditis in anyone with new cardiac symptoms, arrhythmia, heart block or a raised troponin who has had a checkpoint inhibitor in the past 12 weeks; admit, involve cardiology, and obtain ECG, troponin and cardiac MRI (with or without endomyocardial biopsy), plus the shared myositis and myasthenia panel. Give methylprednisolone 1000 mg IV daily for 3 to 5 days as soon as the diagnosis is likely, until troponin normalises, then a 4 to 6 week prednisone taper; seriously consider permanent discontinuation. If there is no response within 24 hours add antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab (LE: 4); avoid infliximab (LE: 4). Manage in a coronary care unit with temporary pacing available. A retrospective study found steroids within 24 hours of admission were followed by fewer major cardiac events than later steroids.\n\nASCO 2021 makes cardiac toxicity one of the exceptions to continuing treatment for grade 1 toxicity. The ESC 2022 and ESC 2025 guidelines could not be read here.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "intensive-care"],
  },
  population: "Adults who have received an immune checkpoint inhibitor, alone or in combination, usually within the previous 12 weeks; the risk is higher with combined PD-1 and CTLA-4 blockade. Children are not addressed by these sources.",
  trigger: "New chest pain, breathlessness, palpitations, syncope, arrhythmia, heart block or an unexplained raised troponin; or new myositis or myasthenia-like symptoms, which call for a cardiac work-up as well.",
  steps: [
    {
      action: "Suspect myocarditis in anyone with new cardiac symptoms, arrhythmia, heart block or a raised troponin after a checkpoint inhibitor in the past 12 weeks; admit and involve cardiology",
      why: "Myocarditis can deteriorate within hours and is often fatal if missed.",
      source: "sitc-2021",
      quote: "A diagnosis of ICI-induced myocarditis should be considered in any patient developing new cardiac symptoms, new cardiac arrhythmias, new heart blocks, or cardiac lab findings (eg, asymptomatic troponin elevation) who has received an ICI therapy in the past 12 weeks. Suspicion of ICI-induced myocarditis should trigger hospital admittance and consultation with a cardiologist.",
    },
    {
      action: "Obtain an ECG, serum troponin and cardiac MRI, with right heart catheterisation and myocardial biopsy where needed",
      why: "Troponin and ECG are abnormal in most cases; MRI or biopsy confirms the diagnosis.",
      source: "sitc-2021",
      quote: "Patients with suspected ICI-induced myocarditis should undergo cardiac MRI if available (with or without right heart catheterization and myocardial biopsy), EKG, and testing for serum troponin levels.",
    },
    {
      action: "Look for myositis and myasthenia gravis at the same time, with CK, ESR, CRP, myasthenia antibodies, aldolase, nerve conduction studies and EMG",
      why: "The three conditions often occur together, and each raises the danger of the others.",
      source: "sitc-2021",
      quote: "Should have testing including erythrocyte sedimentation rate (ESR), C reactive protein (CRP), creatine kinase (CK), antibody tests (acetylcholine, muscle-specific kinase (MusK), striational), aldolase, troponin, EKG, nerve conduction, and electromyography (EMG).",
    },
    {
      action: "Give methylprednisolone 1000 mg IV daily for 3 to 5 days as soon as the diagnosis is likely, until troponin normalises, then taper prednisone over 4 to 6 weeks",
      why: "Early high-dose steroids were followed by fewer serious heart events than delayed treatment.",
      source: "sitc-2021",
      quote: "Patients with suspected ICI-induced myocarditis should receive high-dose corticosteroids (1000 mg methylprednisolone IV or equivalent daily for 3–5 days, until troponin normalizes) as soon as possible once the diagnosis is considered likely, followed by 4–6 weeks 1–2 mg/kg prednisone taper.",
    },
    {
      action: "Seriously consider stopping the checkpoint inhibitor permanently",
      why: "Restarting risks a recurrence of a condition with high mortality.",
      source: "sitc-2021",
      quote: "Permanent discontinuation of ICI therapy should be seriously considered.",
    },
    {
      action: "If there is no response to steroids within 24 hours, add antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab",
      why: "Steroid-resistant myocarditis needs a second immunosuppressant quickly.",
      source: "sitc-2021",
      quote: "If signs or symptoms do not respond to corticosteroid therapy within 24 hours, additional therapies such as ATG, mycophenolate mofetil, abatacept, or alemtuzumab should be considered as additional treatment",
      grade: "LE: 4",
    },
    {
      action: "Avoid infliximab for steroid-refractory myocarditis",
      why: "In one study infliximab was linked to a higher risk of cardiovascular death.",
      source: "sitc-2021",
      quote: "Caution is advised against the use infliximab for steroid-refractory myocarditis",
      grade: "LE: 4",
    },
    {
      action: "Manage in a coronary care unit with temporary pacing quickly available",
      why: "Heart block and dangerous rhythms can appear suddenly.",
      source: "sitc-2021",
      quote: "Management of cardiac irAEs should take place in a coronary care unit, with temporary pacemaker support available for rapid access if indicated.",
    },
    {
      action: "Assess breathing function frequently",
      why: "Overlapping myositis or myasthenia can weaken the breathing muscles.",
      source: "sitc-2021",
      quote: "Should receive frequent pulmonary assessment in addition to typical irAE treatment (ie, corticosteroids).",
    },
  ],
  bestInClass: {
    statement: "Of the guidelines that could be read, SITC 2021 is the only one with a myocarditis protocol: admission, cardiology, ECG, troponin and cardiac MRI; methylprednisolone 1000 mg daily for 3 to 5 days as early as possible; serious consideration of permanent discontinuation; second-line antithymocyte globulin, mycophenolate, abatacept or alemtuzumab within 24 hours if there is no response (LE: 4), and caution against infliximab (LE: 4). Every recommendation rests on retrospective series and case reports; there are no randomised trials. ASCO 2021 (abstract) agrees that cardiac toxicity is not one where treatment continues at grade 1. The 2022 ESC cardio-oncology guideline, the 2025 ESC myocarditis guideline and ESMO 2022 could not be read, so whether they differ on dose, timing or the second-line agent is not stated here.",
    sources: ["sitc-2021", "asco-2021", "esc-2022-cardio-oncology", "esc-2025-myocarditis", "esmo-2022"],
  },
  variants: [
    {
      name: "Baseline ECG and troponin for patients at higher risk (SITC 2021)",
      differs: "Considers a baseline ECG for patients at higher risk of myocarditis (cardiac disease, diabetes, combined PD-(L)1 and CTLA-4 blockade) and a baseline troponin, so that later results can be compared; SITC notes there is no evidence that troponin screening in patients without symptoms improves outcome.",
      evidence: "Expert consensus; no level of evidence printed.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Second-line antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab if no response in 24 hours", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Caution against infliximab in steroid-refractory myocarditis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Methylprednisolone 1000 mg daily for 3 to 5 days, and admission with cardiology", grade: "not graded (expert consensus)", source: "sitc-2021" },
    { claim: "Cardiac toxicity is an exception to continuing treatment at grade 1", grade: "expert consensus", source: "asco-2021", quote: "in general, ICPi therapy should be continued with close monitoring for grade 1 toxicities, except for some neurologic, hematologic, and cardiac toxicities." },
  ],
  sources: [
    SITC_ICI_2021,
    ASCO_ICI_2021,
    {
      key: "esc-2022-cardio-oncology",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology, European Heart Journal",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    {
      key: "esc-2025-myocarditis",
      label: "2025 ESC Guidelines for the management of myocarditis and pericarditis",
      publisher: "European Society of Cardiology, European Heart Journal",
      year: 2025,
      url: "https://doi.org/10.1093/eurheartj/ehaf192",
      doi: "10.1093/eurheartj/ehaf192",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The 2022 ESC cardio-oncology guideline (the European cardiology standard for checkpoint inhibitor myocarditis) and the 2025 ESC guideline on myocarditis and pericarditis could not be read: the publisher returned 403 to a script and Europe PMC holds neither abstract nor full text. Their diagnostic criteria, steroid regimen and second-line choices are not compared here.",
    "The ASCO 2021 guideline was read only as its abstract and its cardiac table is not compared here.",
    "No randomised trial of any treatment for checkpoint inhibitor myocarditis was found among the sources read; the evidence for early steroids is one retrospective study of 126 patients, and the second-line agents rest on case series (LE: 4).",
    "Whether routine troponin screening during treatment changes outcomes is unknown; SITC says there is no evidence that it does in patients without symptoms.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone", "alemtuzumab", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor", "cardiac-biomarker-monitoring"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["myocarditis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021", "paper-lyon-eur-heart-j"],
  related: ["irae-neurological", "checkpoint-inhibitor-baseline-and-monitoring", "irae-rheumatological"],
  tags: ["protocol", "irae", "acute-oncology", "cardio-oncology"],
});
