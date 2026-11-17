import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Myocarditis caused by an immune checkpoint inhibitor, and the overlap with myositis and myasthenia gravis.
 *
 * Second accuracy pass, 16 November 2026. What was re-read, and how:
 * - SITC 2021: full text again from Europe PMC (PMC8237720, full-text XML, tags stripped by script): the general
 *   recommendations, the myositis/myocarditis/myasthenia overlap, the cardiovascular section and its recommendations.
 * - 2022 ESC cardio-oncology guideline: now read in full. The publisher (academic.oup.com) still returns 403 to a
 *   script, but the published PDF is held openly by the San Raffaele University repository
 *   (hdl.handle.net/20.500.11768/201582) and was read with pdftotext: section 6.1.3, Table 3, Figure 28,
 *   Recommendation Tables 15 and 26. In that text a ligature breaks "confirmed", "first" and "infliximab" and the
 *   greater-than sign prints as a full stop (".50%"), so ESC sentences containing either are stated in prose and
 *   not quoted. The 2023 erratum (10.1093/eurheartj/ehad196) could not be read.
 * - ASCO 2021: abstract again, from the Europe PMC REST API; ascopubs.org returned 403.
 * - Still not reachable: the 2025 ESC guideline on myocarditis and pericarditis (academic.oup.com 403; Europe PMC
 *   holds no abstract or full text; the two repositories tried held no open file) and ESMO 2022
 *   (annalsofoncology.org 403).
 * Every DOI was resolved through Crossref and its title checked. No newer edition of any of the five was found in
 * Europe PMC. Quotes checked by script against the raw text on 16 November 2026.
 */
export const iraeMyocarditis = protocol({
  id: "irae-myocarditis",
  name: "Immune-related myocarditis from checkpoint inhibitors",
  aka: ["checkpoint inhibitor myocarditis", "ICI myocarditis", "immune checkpoint inhibitor-associated myocarditis", "immunotherapy heart inflammation", "myocarditis-myositis-myasthenia overlap"],
  domain: "immunotherapy-toxicity",
  tldr: "Rarely, immunotherapy inflames the heart muscle. It most often starts in the first three months and can be fatal, so new chest pain, breathlessness, palpitations, fainting, or new muscle weakness, drooping eyelids or double vision need urgent assessment. It is treated in hospital with high-dose steroids, started as early as possible.",
  simple: "Very rarely, immunotherapy can inflame the heart. Chest pain, breathlessness, a racing or irregular heartbeat, fainting, or new weakness or double vision need urgent help.",
  summary: "Uncommon (1% in an eight-centre registry of 964 patients) but with a high death rate: SITC 2021 cites a retrospective study in which 50% of patients who developed myocarditis died, and elsewhere gives a fatality rate of 17%. It clusters with myositis and myasthenia gravis, so suspicion of one should prompt evaluation for all three. In the registry the median onset was 34 days after starting, troponin was raised in 94% and the ECG abnormal in 89%, while ejection fraction was normal in 51%. ESC 2022 says it most often develops in the first 12 weeks, although late cases occur.\n\nSITC 2021: consider myocarditis in anyone with new cardiac symptoms, arrhythmia, heart block or a raised troponin who has had a checkpoint inhibitor in the past 12 weeks; suspicion should trigger admission and a cardiology consultation, with ECG, troponin and cardiac MRI if available (with or without right heart catheterisation and biopsy), plus the shared myositis and myasthenia panel. Give methylprednisolone 1000 mg IV or equivalent daily for 3 to 5 days, until troponin normalises, as soon as the diagnosis is likely, then a 4 to 6 week taper of prednisone 1 to 2 mg/kg. Permanent discontinuation should be seriously considered. If there is no response within 24 hours, antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab should be considered (LE: 4); caution is advised against infliximab (LE: 4). Manage in a coronary care unit with temporary pacing available.\n\nESC 2022 agrees on the outline and differs in detail. It gives methylprednisolone as 500 to 1000 mg once daily; recommends interrupting the checkpoint inhibitor in every suspected case and in confirmed myocarditis (Class I, Level C); calls myocarditis steroid-resistant only after 3 days of IV methylprednisolone, judged mainly by troponin failing to fall by more than half; says second-line immunosuppression should then be considered (Class IIa, Level C) but that there are too few data to recommend a particular agent; and recommends an ECG, natriuretic peptide and troponin in all patients before treatment starts (Class I, Level B), where SITC only suggests considering them.\n\nASCO 2021 (abstract only) makes cardiac toxicity one of the exceptions to continuing treatment for grade 1 toxicity. The ESC 2025 myocarditis guideline and ESMO 2022 could not be read here.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "intensive-care"],
  },
  population: "Adults who have received an immune checkpoint inhibitor, alone or in combination. Both guidelines define a suspected case by treatment in the past 12 weeks, and ESC 2022 notes that late cases (after week 20) may occur. SITC 2021 and ESC 2022 both name combined checkpoint blockade as a higher-risk setting. Children are not addressed by these sources.",
  trigger: "New chest pain, breathlessness, palpitations, syncope, arrhythmia, heart block or a raised troponin without symptoms; or new myositis or myasthenia-like symptoms, which call for a cardiac work-up as well.",
  steps: [
    {
      action: "Consider myocarditis in anyone with new cardiac symptoms, arrhythmia, heart block or a raised troponin after a checkpoint inhibitor in the past 12 weeks; if it is suspected, admit and consult a cardiologist",
      why: "It is uncommon but has a high death rate, and it can show as a raised troponin with no symptoms.",
      source: "sitc-2021",
      quote: "A diagnosis of ICI-induced myocarditis should be considered in any patient developing new cardiac symptoms, new cardiac arrhythmias, new heart blocks, or cardiac lab findings (eg, asymptomatic troponin elevation) who has received an ICI therapy in the past 12 weeks. Suspicion of ICI-induced myocarditis should trigger hospital admittance and consultation with a cardiologist.",
    },
    {
      action: "Interrupt the checkpoint inhibitor while the tests are done",
      why: "Treatment is held until myocarditis has been confirmed or ruled out, and the decision to resume is then made by the whole team.",
      source: "esc-2022-cardio-oncology",
      quote: "Interruption of ICI treatment is recommended in all cases of suspected ICI-associated myocarditis (any patient developing new cardiac symptoms, new cardiac arrhythmias, new heart blocks, or new troponin increase who has received an ICI therapy in the past 12 weeks) while investigations are performed.",
    },
    {
      action: "Obtain an ECG, a serum troponin and, if available, cardiac MRI, with or without right heart catheterisation and myocardial biopsy",
      why: "Troponin and ECG are abnormal in most cases; MRI or biopsy confirms the diagnosis.",
      source: "sitc-2021",
      quote: "Patients with suspected ICI-induced myocarditis should undergo cardiac MRI if available (with or without right heart catheterization and myocardial biopsy), EKG, and testing for serum troponin levels.",
    },
    {
      action: "Test for myositis and myasthenia gravis at the same time, with CK, ESR, CRP, myasthenia antibodies, aldolase, nerve conduction studies and EMG",
      why: "The three conditions are often seen in the same patient and carry a high death rate.",
      source: "sitc-2021",
      quote: "Should have testing including erythrocyte sedimentation rate (ESR), C reactive protein (CRP), creatine kinase (CK), antibody tests (acetylcholine, muscle-specific kinase (MusK), striational), aldolase, troponin, EKG, nerve conduction, and electromyography (EMG).",
    },
    {
      action: "Give methylprednisolone 1000 mg IV (or equivalent) daily for 3 to 5 days, until troponin normalises, as soon as the diagnosis is considered likely; then taper prednisone 1 to 2 mg/kg over 4 to 6 weeks",
      why: "In a retrospective study, steroids started within 24 hours of admission were followed by fewer serious heart events than steroids started later.",
      source: "sitc-2021",
      quote: "Patients with suspected ICI-induced myocarditis should receive high-dose corticosteroids (1000 mg methylprednisolone IV or equivalent daily for 3–5 days, until troponin normalizes) as soon as possible once the diagnosis is considered likely, followed by 4–6 weeks 1–2 mg/kg prednisone taper.",
    },
    {
      action: "Once myocarditis is diagnosed, stop the checkpoint inhibitor and keep the patient in a level 2 or 3 bed with continuous ECG monitoring",
      why: "Heart block and dangerous rhythms can appear during the acute phase, so the heart is watched continuously.",
      source: "esc-2022-cardio-oncology",
      quote: "Cessation of ICI treatment is recommended in patients with cancer with fulminant or non-fulminant ICI-associated myocarditis and the patient should be admitted to hospital and a level 2 or 3 bed with continuous ECG monitoring is required.",
    },
    {
      action: "Seriously consider stopping the checkpoint inhibitor permanently",
      why: "The condition has a high death rate, so the decision to give the same treatment again is a weighty one.",
      source: "sitc-2021",
      quote: "Permanent discontinuation of ICI therapy should be seriously considered.",
    },
    {
      action: "If signs or symptoms do not respond to steroids within 24 hours, consider adding antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab",
      why: "Myocarditis that does not settle on steroids may respond to a second immunosuppressant; the evidence is the weakest clinical kind, such as case series.",
      source: "sitc-2021",
      quote: "If signs or symptoms do not respond to corticosteroid therapy within 24 hours, additional therapies such as ATG, mycophenolate mofetil, abatacept, or alemtuzumab should be considered as additional treatment",
      grade: "LE: 4",
    },
    {
      action: "Be cautious about using infliximab for steroid-refractory myocarditis",
      why: "In one retrospective analysis infliximab was linked to a higher risk of cardiovascular death.",
      source: "sitc-2021",
      quote: "Caution is advised against the use infliximab for steroid-refractory myocarditis",
      grade: "LE: 4",
    },
    {
      action: "Manage in a coronary care unit with temporary pacing quickly available if indicated",
      why: "Complete heart block and ventricular arrhythmias are among the serious events reported.",
      source: "sitc-2021",
      quote: "Management of cardiac irAEs should take place in a coronary care unit, with temporary pacemaker support available for rapid access if indicated.",
    },
    {
      action: "Assess breathing frequently",
      why: "Overlapping myositis or myasthenia can weaken the breathing muscles.",
      source: "sitc-2021",
      quote: "Should receive frequent pulmonary assessment in addition to typical irAE treatment (ie, corticosteroids).",
    },
  ],
  bestInClass: {
    statement: "Two guidelines that could be read give a myocarditis protocol, and they agree on its outline: SITC 2021 (the immunotherapy society) and the 2022 ESC cardio-oncology guideline (the cardiology society, with EHA, ESTRO and IC-OS). Both define a suspected case the same way, admit, and use troponin, ECG and cardiac MRI (ESC adds echocardiography; Class I, Level B). Both start high-dose IV methylprednisolone for 3 to 5 days as soon as the diagnosis is likely: SITC says 1000 mg or equivalent, with no level of evidence printed; ESC says 500 to 1000 mg, and recommends early high-dose corticosteroids in confirmed myocarditis at Class I, Level C. Both advise caution against infliximab. They differ on when steroids have failed (SITC: no response within 24 hours; ESC: after 3 days of IV methylprednisolone), on the second-line agent (SITC lists four to consider, LE: 4; ESC says there are too few data to recommend one; Class IIa, Level C for second-line treatment as such), and on the checkpoint inhibitor (SITC: seriously consider permanent discontinuation; ESC: cessation, with a multidisciplinary discussion before any restart in selected uncomplicated cases, Class I, Level C). No treatment recommendation in either is graded above ESC Level C (expert consensus, small or retrospective studies, registries) or SITC LE: 4 (case series, case-control or historically controlled studies). ASCO 2021 (abstract) agrees that cardiac toxicity is not one where treatment continues at grade 1. The 2025 ESC myocarditis guideline and ESMO 2022 could not be read, so whether they differ is not stated here.",
    sources: ["sitc-2021", "esc-2022-cardio-oncology", "asco-2021", "esc-2025-myocarditis", "esmo-2022"],
  },
  variants: [
    {
      name: "Steroid dose, response and second line (ESC 2022)",
      differs: "Methylprednisolone 500 to 1000 mg IV once daily for the first 3 to 5 days, started as soon as possible once the diagnosis is considered likely. If troponin falls by more than half from its peak within 24 to 72 hours and any left ventricular dysfunction, AV block and arrhythmias resolve, the text recommends switching to oral prednisolone starting at 1 mg/kg (up to 80 mg a day), and a weekly reduction, most commonly by 10 mg a week, under clinical, ECG and troponin surveillance should be considered. Steroid resistance is confirmed if troponin has not fallen by more than half, or AV block, ventricular arrhythmias or left ventricular dysfunction persist, despite 3 days of IV methylprednisolone; second-line immunosuppression should then be considered. ESC names no preferred agent: it lists mycophenolate mofetil, antithymocyte globulin, IV immunoglobulin, plasma exchange, tocilizumab, abatacept, alemtuzumab and tofacitinib as under investigation in case series, and recommends a multidisciplinary discussion. SITC 2021 gives 1000 mg, tapers once troponin normalises, and moves to a second agent after 24 hours without response.",
      evidence: "ESC 2022: early (within 24 hours) high-dose corticosteroids in confirmed myocarditis Class I, Level C; switch to oral prednisolone Class IIa, Level C; second-line immunosuppression Class IIa, Level C.",
      sources: ["esc-2022-cardio-oncology", "sitc-2021"],
    },
    {
      name: "Level of care (ESC 2022)",
      differs: "Asks for a level 2 or 3 bed with continuous ECG monitoring for any confirmed case, and admission to intensive care (level 3) with IV methylprednisolone and cardiovascular support, including mechanical support when indicated, for fulminant myocarditis. SITC 2021 asks for a coronary care unit with temporary pacing available.",
      evidence: "ESC 2022: continuous ECG monitoring in symptomatic myocarditis Class I, Level C; intensive care for fulminant myocarditis Class I, Level C. SITC 2021 prints no level of evidence.",
      sources: ["esc-2022-cardio-oncology", "sitc-2021"],
    },
    {
      name: "Baseline and on-treatment ECG and troponin",
      differs: "SITC 2021 says to consider a baseline ECG for patients at higher risk of myocarditis (cardiac disease, diabetes, combined PD-(L)1 and CTLA-4 blockade) and that a baseline troponin may be considered, and notes there is no evidence that scheduled troponin testing in patients without symptoms improves outcome. ESC 2022 recommends ECG, natriuretic peptide and troponin in all patients before starting, and says serial ECG and troponin should be considered before doses 2, 3 and 4 and, if normal, every three doses after that.",
      evidence: "SITC 2021: expert consensus, no level of evidence printed. ESC 2022: baseline tests Class I, Level B; serial tests Class IIa, Level B.",
      sources: ["sitc-2021", "esc-2022-cardio-oncology"],
    },
  ],
  grades: [
    { claim: "Second-line antithymocyte globulin, mycophenolate mofetil, abatacept or alemtuzumab should be considered if there is no response in 24 hours", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Caution against infliximab in steroid-refractory myocarditis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Methylprednisolone 1000 mg daily for 3 to 5 days, and admission with cardiology", grade: "no LE printed (expert consensus)", source: "sitc-2021" },
    { claim: "Troponin, ECG, echocardiography and cardiac MRI to diagnose myocarditis", grade: "Class I, Level B", source: "esc-2022-cardio-oncology", quote: "cTn, ECG, and CV imaging (echocardiography and CMR) are recommended to diagnose ICI-associated myocarditis." },
    { claim: "Temporary interruption of the checkpoint inhibitor in suspected myocarditis until the diagnosis is settled", grade: "Class I, Level C", source: "esc-2022-cardio-oncology" },
    { claim: "Early high-dose corticosteroids (within 24 hours; methylprednisolone 500 to 1000 mg a day) in confirmed myocarditis", grade: "Class I, Level C", source: "esc-2022-cardio-oncology" },
    { claim: "Second-line immunosuppression should be considered in steroid-refractory myocarditis", grade: "Class IIa, Level C", source: "esc-2022-cardio-oncology" },
    { claim: "Multidisciplinary discussion before restarting a checkpoint inhibitor after uncomplicated myocarditis", grade: "Class I, Level C", source: "esc-2022-cardio-oncology", quote: "A multidisciplinary discussion is recommended before restarting ICI treatment in selected patients with previous uncomplicated ICI-associated myocarditis." },
    { claim: "ECG, natriuretic peptide and troponin in all patients before starting a checkpoint inhibitor", grade: "Class I, Level B", source: "esc-2022-cardio-oncology", quote: "ECG, NP, and cTn measurements are recommended in all patients before starting ICI therapy." },
    { claim: "Cardiac toxicity is an exception to continuing treatment at grade 1", grade: "expert consensus", source: "asco-2021", quote: "in general, ICPi therapy should be continued with close monitoring for grade 1 toxicities, except for some neurologic, hematologic, and cardiac toxicities." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-16" },
    { ...ASCO_ICI_2021, accessed: "2026-11-16" },
    {
      key: "esc-2022-cardio-oncology",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology, European Heart Journal",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "ESC classes of recommendation and levels of evidence, printed in two columns beside each recommendation. Class I: is recommended or is indicated; Class IIa: should be considered; Class IIb: may be considered; Class III: is not recommended. Level A: multiple randomised trials or meta-analyses; Level B: a single randomised trial or large non-randomised studies; Level C: consensus of expert opinion and/or small studies, retrospective studies, registries.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "esc-2025-myocarditis",
      label: "2025 ESC Guidelines for the management of myocarditis and pericarditis",
      publisher: "European Society of Cardiology, European Heart Journal",
      year: 2025,
      url: "https://doi.org/10.1093/eurheartj/ehaf192",
      doi: "10.1093/eurheartj/ehaf192",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    { ...ESMO_ICI_2022, accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "On 16 November 2026 the 2025 ESC guideline on myocarditis and pericarditis still could not be read: the publisher returned 403 to a script, Europe PMC holds neither abstract nor full text, and the two university repositories tried held no open file. It is three years newer than the ESC cardio-oncology guideline, and whether it changes the steroid regimen or the second-line advice for checkpoint inhibitor myocarditis is not stated here.",
    "The 2022 ESC cardio-oncology guideline was read on 16 November 2026 from the published PDF in a university repository, because the publisher's page refuses a script. Its 2023 erratum (Eur Heart J 2023;44:1621) could not be read, so whether it touches the myocarditis section is not known.",
    "On 16 November 2026 the ASCO 2021 guideline was again readable only as its abstract (the publisher returned 403), so its cardiac table is not compared here.",
    "SITC 2021 and ESC 2022 disagree on how long to wait before calling steroids a failure (24 hours against 3 days) and neither cites a trial for its figure.",
    "No randomised trial of any treatment for checkpoint inhibitor myocarditis was found in the passages read; the evidence SITC gives for early steroids is one retrospective analysis of 126 patients, and the second-line agents are graded SITC LE: 4 (case series, case-control or historically controlled studies) and ESC Level C.",
    "Whether routine troponin testing during treatment changes outcomes is unsettled: SITC says there is no evidence that it does in patients without symptoms, while ESC says serial ECG and troponin should be considered (Class IIa, Level B).",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone", "alemtuzumab", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor", "cardiac-biomarker-monitoring"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["myocarditis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021", "paper-lyon-eur-heart-j"],
  related: ["irae-neurological", "checkpoint-inhibitor-baseline-and-monitoring", "irae-rheumatological"],
  tags: ["protocol", "irae", "acute-oncology", "cardio-oncology"],
});
