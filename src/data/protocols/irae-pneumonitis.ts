import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Pneumonitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts for SITC 2021 (full text: general and pulmonary recommendations and the
 * pulmonary literature review), ASCO 2021 (abstract) and ESMO 2022 (not reachable). In addition, the 2022 Chinese
 * expert consensus on checkpoint inhibitor pneumonitis (Thoracic Cancer, open access, full text from Europe PMC,
 * PMC9715776), used as a variant. DOIs resolved through Crossref. Quotes checked by script against the raw text.
 */
export const iraePneumonitis = protocol({
  id: "irae-pneumonitis",
  name: "Immune-related pneumonitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor pneumonitis", "CIP", "immune checkpoint inhibitor lung inflammation", "ICI pneumonitis management", "immunotherapy pneumonitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the lungs. A new cough, breathlessness or chest pain during or after immunotherapy should be reported to your cancer team the same day. A CT scan of the chest confirms it, and steroids are the main treatment; severe cases need hospital and steroids through a drip.",
  simple: "Immunotherapy can sometimes inflame the lungs. If you become breathless or start coughing, ring your cancer helpline. Steroids usually help.",
  summary: "Pneumonitis occurs in about 4% of people on PD-(L)1 inhibitors (1% grade 3 or more), 1% on anti-CTLA-4 and 7% on combinations in trials, with higher rates in single-centre practice (19% in one series) and in lung and kidney cancer, smokers, people with asthma or prior chest radiotherapy (SITC 2021). Median onset is about 3 months.\n\nSITC 2021: high-resolution CT of the chest for suspected pneumonitis, with pulmonary function tests (spirometry and DLCO) if the CT is negative. Grade 2: prednisone 1 to 2 mg/kg/day, tapered over 4 to 6 weeks. Grade 3 or more: intravenous methylprednisolone 1 to 2 mg/kg/day, tapered over 4 to 6 weeks. If high-dose steroids do not help within 72 hours, or the illness is life-threatening, the options, in no order, are mycophenolate mofetil, high-dose IVIG, infliximab, cyclophosphamide or tocilizumab, each on low-level evidence. After grade 2, re-challenge may follow complete resolution, with closer follow-up; recurrence was 25% in a small series.\n\nASCO 2021 gives the general frame: hold for grade 2, high-dose steroids for grade 3, taper over at least 4 to 6 weeks, permanently stop for grade 4. The Chinese 2022 consensus grades by symptoms and the share of lung involved on CT, monitors grade 1, treats grades 2 to 3 with prednisolone-equivalent 1 to 2 mg/kg/day, assesses response at 48 to 72 hours and keeps steroid courses to 6 to 8 weeks, not over 12. ESMO 2022 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "emergency-department", "ward", "intensive-care"],
  },
  population: "Adults treated with an immune checkpoint inhibitor, alone or combined, who develop new or worsening breathlessness, cough, chest pain, fever or low oxygen, or new changes on a chest scan. Radiation pneumonitis and infection are differential diagnoses, not covered here. Children are not addressed.",
  trigger: "New or worsening cough, breathlessness, chest pain or falling oxygen saturation during or after checkpoint inhibitor treatment, or new lung changes on a routine scan.",
  steps: [
    {
      action: "Before starting, refer people with existing autoimmune interstitial lung disease to a lung specialist for lung function tests and risk assessment",
      why: "Existing lung scarring raises the risk of pneumonitis, so a baseline helps both the decision to treat and later comparison.",
      source: "sitc-2021",
      quote: "Patients with pre-existing autoimmune ILD should be referred to a specialist where possible before initiation of ICI therapy for the consideration of pulmonary function tests (PFTs) and risk assessment",
      grade: "LE: 3",
    },
    {
      action: "Teach the patient that a new cough, breathlessness or chest pain must be reported promptly",
      why: "Pneumonitis can worsen quickly, so it needs prompt assessment.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "Arrange a high-resolution CT of the chest for suspected pneumonitis; if it is normal, consider lung function tests including spirometry and DLCO",
      why: "CT shows the inflammation; lung function tests can find a deficit that the scan misses.",
      source: "sitc-2021",
      quote: "Patients with suspected pneumonitis should be examined via high-resolution CT of the chest. If the CT scan is negative, PFTs should be considered to identify a potential functional deficit",
      grade: "LE: 4",
    },
    {
      action: "Look for infection and other causes alongside, without delaying treatment",
      why: "Infection, clots, heart failure, radiation pneumonitis and the cancer itself can all look like pneumonitis.",
      source: "sitc-2021",
      quote: "Diagnostic evaluation for all irAEs should attempt to rule out other possible etiologies (eg, diarrhea/colitis associated with Clostridium difficile infection), but treatment for irAEs should be initiated as is deemed clinically appropriate.",
    },
    {
      action: "For grade 1, keep monitoring; for grade 2, hold the checkpoint inhibitor",
      why: "Under the general rules, grade 1 can continue with close follow-up and grade 2 needs a pause and treatment.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients experiencing grade 2 irAEs should have ICI therapy temporarily withheld and be treated with corticosteroids depending on the toxicity in question.",
    },
    {
      action: "For grade 2, give prednisone 1 to 2 mg/kg/day (or equivalent) and taper over 4 to 6 weeks; for grade 3 or more, give intravenous methylprednisolone 1 to 2 mg/kg/day and taper over 4 to 6 weeks",
      why: "Steroids settle the inflammation in most people; the slower taper reduces relapse.",
      source: "sitc-2021",
      quote: "Patients experiencing grade 2 pneumonitis should receive 1–2 mg/kg/day prednisone (or equivalent), tapering over 4–6 weeks. For pneumonitis of grade ≥3, patients should receive 1–2 mg/kg/day methylprednisolone IV or equivalent, tapering over 4–6 weeks",
      grade: "LE: 3",
    },
    {
      action: "Counsel about steroid side effects, including Pneumocystis pneumonia",
      why: "Long courses of high-dose steroids raise the risk of infection, high blood sugar and mood change.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "For grade 3, suspend the checkpoint inhibitor; after grade 4, stop it permanently",
      why: "Life-threatening pneumonitis generally rules out further checkpoint inhibitor treatment under ASCO's general rules.",
      source: "asco-2021",
      quote: "In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement.",
      grade: "expert consensus",
    },
    {
      action: "If there is no improvement within 72 hours of high-dose steroids, or the illness is life-threatening, add a second immunosuppressant with a lung specialist",
      why: "Steroid-refractory pneumonitis has a high death rate; SITC lists mycophenolate mofetil, high-dose IVIG, infliximab, cyclophosphamide or tocilizumab in no particular order.",
      source: "sitc-2021",
      quote: "If high-dose corticosteroid therapy does not improve pneumonitis symptoms within 72 hours (or if symptoms are life-threatening), options include (in no particular order) mycophenolate mofetil (1–1.5 g two times per day, tapering in consultation with a pulmonary specialist",
      grade: "LE: 3 (mycophenolate), LE: 4 (IVIG, infliximab, tocilizumab)",
    },
    {
      action: "After grade 2 pneumonitis, consider re-challenge only once symptoms have fully resolved, with more frequent review afterwards",
      why: "Pneumonitis can come back, with or without re-challenge.",
      source: "sitc-2021",
      quote: "If patients have experienced grade 2 pneumonitis, they may be re-challenged with ICIs upon complete resolution of symptoms. These patients should be monitored through more frequent consultations with their physician",
      grade: "LE: 4",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the most detailed guideline that could be read: high-resolution chest CT, prednisone 1 to 2 mg/kg/day for grade 2 and intravenous methylprednisolone 1 to 2 mg/kg/day for grade 3 or more, each tapered over 4 to 6 weeks (LE: 3), a second immunosuppressant after 72 hours without response, and re-challenge after grade 2 only when symptoms have fully resolved. ASCO 2021 agrees on the frame and on a taper of at least 4 to 6 weeks, and permanently stops checkpoint inhibitors after grade 4. The Chinese 2022 consensus adds CT extent to the grade, a 48 to 72 hour response check and a 6 to 8 week, at most 12 week, steroid course. ESMO 2022 was not read. All the second-line drugs rest on case series or small cohorts; none has been compared in a randomised trial that could be read.",
    sources: ["sitc-2021", "asco-2021", "cn-cip-2022", "esmo-2022"],
  },
  variants: [
    {
      name: "Grading by CT extent and a fixed steroid course (Chinese expert consensus, 2022)",
      differs: "Grades pneumonitis by symptoms together with the share of lung involved on CT (under 25%, 25 to 50%, over 50%), recommends prednisolone-equivalent 1 to 2 mg/kg/day for grades 2 to 3 and intravenous steroids for more severe or acute cases, checks response at 48 to 72 hours and limits the course to 6 to 8 weeks, not more than 12. It judges Pneumocystis prophylaxis generally unnecessary except for 20 mg a day for more than 6 weeks.",
      evidence: "Expert consensus, not graded.",
      sources: ["cn-cip-2022"],
    },
    {
      name: "Permanent stop after grade 4 (ASCO 2021)",
      differs: "States permanent discontinuation for grade 4 toxicities in general; SITC allows re-challenge only after grade 2 pneumonitis.",
      evidence: "Expert consensus.",
      sources: ["asco-2021"],
    },
  ],
  grades: [
    { claim: "Grade 2: prednisone 1 to 2 mg/kg/day; grade 3 or more: intravenous methylprednisolone 1 to 2 mg/kg/day; taper over 4 to 6 weeks", grade: "LE: 3", source: "sitc-2021" },
    { claim: "High-resolution chest CT for suspected pneumonitis; lung function tests if CT is negative", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Mycophenolate mofetil for steroid-refractory pneumonitis", grade: "LE: 3", source: "sitc-2021" },
    { claim: "High-dose IVIG, infliximab or tocilizumab for steroid-refractory pneumonitis", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Re-challenge after grade 2 once symptoms have completely resolved", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Steroid taper over at least 4 to 6 weeks; permanent discontinuation after grade 4", grade: "expert consensus", source: "asco-2021", quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks." },
    { claim: "Response to steroids assessed within 48 to 72 hours", grade: "expert consensus (not graded)", source: "cn-cip-2022", quote: "For CIP, clinical improvements should be assessed within 48 to 72 hours of GCS treatment." },
  ],
  sources: [
    SITC_ICI_2021,
    ASCO_ICI_2021,
    ESMO_ICI_2022,
    {
      key: "cn-cip-2022",
      label: "Chinese expert consensus on the multidisciplinary management of pneumonitis associated with immune checkpoint inhibitor",
      publisher: "Thoracic Cancer (Chinese expert panel)",
      year: 2022,
      url: "https://europepmc.org/article/PMC/PMC9715776",
      doi: "10.1111/1759-7714.14693",
      gradingScheme: "Nine consensus statements; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "A 2025 Chinese expert consensus on the diagnosis and management of checkpoint inhibitor pneumonitis (doi 10.3760/cma.j.cn112147-20241121-00694) is listed in Europe PMC without open full text; it was not read.",
    "SITC names an ECOG-ACRIN trial comparing IVIG with infliximab for steroid-refractory pneumonitis; its result was not looked for here, and no randomised evidence on second-line treatment was read.",
    "Guidelines differ on whether steroid courses for pneumonitis need Pneumocystis prophylaxis; SITC asks for counselling, the Chinese consensus limits prophylaxis to 20 mg a day for more than 6 weeks, and the ASCO and ESMO positions were not read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab", "prednisone", "cyclophosphamide", "tocilizumab", "methylprednisolone", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["pneumonitis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "acute-oncology"],
});
