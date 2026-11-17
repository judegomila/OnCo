import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Pneumonitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts for SITC 2021 (full text: general and pulmonary recommendations and the
 * pulmonary literature review), ASCO 2021 (abstract) and ESMO 2022 (not reachable). In addition, the 2022 Chinese
 * expert consensus on checkpoint inhibitor pneumonitis (Thoracic Cancer, open access, full text from Europe PMC,
 * PMC9715776), used as a variant. DOIs resolved through Crossref. Quotes checked by script against the raw text.
 *
 * Second accuracy pass, 16 November 2026. Re-read as raw text: SITC 2021 (Europe PMC full-text XML saved that day by
 * the irae-myocarditis checker and re-used; tags and citation cross-references stripped), the ASCO 2021 abstract
 * (Europe PMC core record, same saved copy) and the Chinese 2022 consensus (Europe PMC full-text XML, fetched afresh;
 * DOI resolved through Crossref and the title checked). Every quote was matched by script after normalising
 * whitespace only. ESMO 2022 and the ASCO full text still refuse a script (checked that day by a sibling checker).
 * The 2025 Chinese consensus was tried again and still has no readable text. ClinicalTrials.gov was read (API, raw
 * JSON) for the ECOG-ACRIN trial SITC names. Corrected: orders softened to the sources' own strength, the missing
 * cyclophosphamide grade, SITC's position on re-challenge after grade 3 or 4, the origin of the CT-extent grading
 * (NCCN, as reproduced by the Chinese consensus), and reasons no source states.
 */
export const iraePneumonitis = protocol({
  id: "irae-pneumonitis",
  name: "Immune-related pneumonitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor pneumonitis", "CIP", "immune checkpoint inhibitor lung inflammation", "ICI pneumonitis management", "immunotherapy pneumonitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the lungs, during treatment or after it has ended. Tell your cancer team about a new cough, breathlessness, chest pain or fever. A detailed CT scan of the chest is the main test, and steroids are the main treatment, given through a drip in severe cases. Treatment is usually paused, and may be stopped for good after the most severe cases.",
  simple: "Immunotherapy can sometimes inflame the lungs. If you become breathless or start coughing, tell your cancer team. Steroids help most people.",
  summary: "Pneumonitis occurs in 4% of people on PD-(L)1 inhibitors (1% grade 3 or more), 1% on anti-CTLA-4 and 7% on combinations, and trials may understate it: one single-centre series recorded 19% (SITC 2021). SITC reports a higher risk in lung and kidney cancer than in melanoma, and names asthma, smoking, prior curative-intent radiotherapy and squamous histology as risk factors. Median onset is 3 months.\n\nSITC 2021: high-resolution CT of the chest for suspected pneumonitis; if the CT is negative, pulmonary function tests (spirometry and DLCO) should be considered. Grade 1 is monitored and treatment may continue; for grade 2 the checkpoint inhibitor is temporarily withheld (general rules). Grade 2: prednisone 1 to 2 mg/kg/day or equivalent, tapered over 4 to 6 weeks. Grade 3 or more: intravenous methylprednisolone 1 to 2 mg/kg/day or equivalent, tapered over 4 to 6 weeks. If high-dose steroids do not help within 72 hours, or symptoms are life-threatening, the options, in no order, are mycophenolate mofetil, high-dose IVIG, infliximab, cyclophosphamide or tocilizumab, graded LE: 3 or LE: 4. After grade 2, re-challenge may follow complete resolution, with more frequent review; 25% of the 12 people re-challenged in one small series had a recurrence. After grade 3 or 4, SITC's general rule is a risk-adjusted decision.\n\nThe ASCO 2021 abstract gives general rules for all immune side effects: treatment may be suspended for most grade 2 toxicities, grade 3 generally warrants suspension and high-dose steroids, steroids taper over at least 4 to 6 weeks, and permanent discontinuation is in general recommended for grade 4. The Chinese 2022 consensus reproduces the NCCN grading by symptoms and the share of lung involved on CT, monitors grade 1, recommends prednisolone-equivalent 1 to 2 mg/kg/day for grades 2 to 3, assesses response within 48 to 72 hours and says steroid treatment usually lasts 6 to 8 weeks and does not exceed 12. ESMO 2022 could not be read.",
  asOf: "2026-11-16",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "emergency-department", "ward", "intensive-care"],
  },
  population: "People treated with an immune checkpoint inhibitor, alone or combined, who develop new or worsening breathlessness, cough, chest pain, fever or low oxygen, or new changes on a chest scan with no symptoms. Radiation pneumonitis and infection are differential diagnoses, not covered here. The pneumonitis recommendations read do not address children.",
  trigger: "New or worsening cough, breathlessness, chest pain or falling oxygen saturation during or after checkpoint inhibitor treatment, or new lung changes on a routine scan.",
  steps: [
    {
      action: "Before starting, refer people with existing autoimmune interstitial lung disease to a specialist where possible, to consider lung function tests and assess risk",
      why: "SITC notes that existing interstitial lung abnormalities are a risk factor for lung inflammation from checkpoint inhibitors.",
      source: "sitc-2021",
      quote: "Patients with pre-existing autoimmune ILD should be referred to a specialist where possible before initiation of ICI therapy for the consideration of pulmonary function tests (PFTs) and risk assessment",
      grade: "LE: 3",
    },
    {
      action: "Give the patient dedicated education about immune side effects, including the lung symptoms: breathlessness, a persistent cough, chest pain and fever",
      why: "SITC lists these as symptoms of pneumonitis and notes that immune side effects can start at any point during treatment or after it has stopped.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "Arrange a high-resolution CT of the chest for suspected pneumonitis; if it is negative, consider lung function tests, which should include spirometry and DLCO",
      why: "SITC notes that pneumonitis can show on CT even without symptoms; lung function tests are there to find a deficit when the scan is negative.",
      source: "sitc-2021",
      quote: "Patients with suspected pneumonitis should be examined via high-resolution CT of the chest. If the CT scan is negative, PFTs should be considered to identify a potential functional deficit",
      grade: "LE: 4",
    },
    {
      action: "Try to rule out other causes, and start treatment for pneumonitis when it is judged clinically appropriate",
      why: "The Chinese 2022 consensus lists lung infection, pulmonary embolism, heart failure, radiation pneumonitis and progression of the cancer among the conditions that can look like pneumonitis.",
      source: "sitc-2021",
      quote: "Diagnostic evaluation for all irAEs should attempt to rule out other possible etiologies (eg, diarrhea/colitis associated with Clostridium difficile infection), but treatment for irAEs should be initiated as is deemed clinically appropriate.",
    },
    {
      action: "For grade 1, monitor for worsening symptoms, and the checkpoint inhibitor may continue; for grade 2, withhold the checkpoint inhibitor temporarily",
      why: "These are SITC's general rules for immune side effects, and its lung section states no exception to them. The Chinese 2022 consensus also recommends close monitoring for grade 1, with steroids considered if it progresses.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients experiencing grade 2 irAEs should have ICI therapy temporarily withheld and be treated with corticosteroids depending on the toxicity in question.",
    },
    {
      action: "For grade 2, give prednisone 1 to 2 mg/kg/day (or equivalent) and taper over 4 to 6 weeks; for grade 3 or more, give intravenous methylprednisolone 1 to 2 mg/kg/day (or equivalent) and taper over 4 to 6 weeks",
      why: "Steroids are the main treatment. The Chinese 2022 consensus reports that regular steroid treatment controls the illness in 70% to 80% of people.",
      source: "sitc-2021",
      quote: "Patients experiencing grade 2 pneumonitis should receive 1–2 mg/kg/day prednisone (or equivalent), tapering over 4–6 weeks. For pneumonitis of grade ≥3, patients should receive 1–2 mg/kg/day methylprednisolone IV or equivalent, tapering over 4–6 weeks",
      grade: "LE: 3",
    },
    {
      action: "When starting steroids, counsel about their side effects, including opportunistic infections such as Pneumocystis pneumonia",
      why: "SITC names raised blood sugar, mood disturbance, poor sleep, gastritis, weight gain and opportunistic infections as the steroid side effects to explain.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "As a general rule, suspend the checkpoint inhibitor for grade 3 and stop it permanently for grade 4",
      why: "These are the general rules in the ASCO abstract for all immune side effects, hedged there with 'generally' and 'in general'; its lung table could not be read. SITC gives no lung-specific rule on stopping for good, and says the decision to re-challenge after grade 3 or 4 should weigh the expected benefit against the risk of toxicity (LE: 3).",
      source: "asco-2021",
      quote: "Grade 3 toxicities generally warrant suspension of ICPis and the initiation of high-dose corticosteroids. Corticosteroids should be tapered over the course of at least 4-6 weeks. Some refractory cases may require other immunosuppressive therapy. In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement.",
      grade: "expert consensus",
    },
    {
      action: "If high-dose steroids bring no improvement within 72 hours, or symptoms are life-threatening, choose a further immunosuppressant from SITC's list, with a specialist involved",
      why: "SITC lists, in no particular order, mycophenolate mofetil 1 to 1.5 g twice a day, high-dose IVIG 2 g/kg in divided doses over 2 to 5 days, infliximab 5 mg/kg once with an optional repeat 14 days later, cyclophosphamide and tocilizumab; the recommendation gives no dose for the last two. Its general rules refer anyone with a grade 3 or higher side effect, or one that does not respond to steroids, to a specialist.",
      source: "sitc-2021",
      quote: "If high-dose corticosteroid therapy does not improve pneumonitis symptoms within 72 hours (or if symptoms are life-threatening), options include (in no particular order) mycophenolate mofetil (1–1.5 g two times per day, tapering in consultation with a pulmonary specialist (LE: 3)), hdIVIG (2 g/kg in divided doses over 2–5 days, per institutional guidelines (LE: 4)), infliximab (5 mg/kg, one dose with optional repeat 14 days later (LE: 4)), cyclophosphamide (LE: 3), or tocilizumab (LE: 4).",
      grade: "LE: 3 (mycophenolate mofetil, cyclophosphamide), LE: 4 (hdIVIG, infliximab, tocilizumab)",
    },
    {
      action: "After grade 2 pneumonitis, consider re-challenge only once symptoms have completely resolved, with more frequent review afterwards",
      why: "Pneumonitis has come back both in people who restarted and in people who did not; in one small series of 12 people who restarted, 25% had a recurrence.",
      source: "sitc-2021",
      quote: "If patients have experienced grade 2 pneumonitis, they may be re-challenged with ICIs upon complete resolution of symptoms. These patients should be monitored through more frequent consultations with their physician",
      grade: "LE: 4",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the most detailed guideline that could be read: high-resolution chest CT (LE: 4), prednisone 1 to 2 mg/kg/day for grade 2 and intravenous methylprednisolone 1 to 2 mg/kg/day for grade 3 or more, each tapered over 4 to 6 weeks (LE: 3), a list of further immunosuppressants as options if there is no improvement within 72 hours, and re-challenge after grade 2 once symptoms have completely resolved (LE: 4). The ASCO 2021 abstract agrees on the general frame, gives a taper of at least 4 to 6 weeks, and in general recommends permanent discontinuation after grade 4. The Chinese 2022 consensus reproduces a grading that includes CT extent, and adds a response assessment within 48 to 72 hours and a steroid course that usually lasts 6 to 8 weeks and does not exceed 12. ESMO 2022 was not read. SITC describes the evidence for the further immunosuppressants as case studies and case reports, one study of tocilizumab, and for cyclophosphamide a study in another lung disease; no randomised comparison was read.",
    sources: ["sitc-2021", "asco-2021", "cn-cip-2022", "esmo-2022"],
  },
  variants: [
    {
      name: "Grading by CT extent and a bounded steroid course (Chinese expert consensus, 2022)",
      differs: "Reproduces the grading it attributes to the National Comprehensive Cancer Network guidelines, which combines symptoms with the share of lung involved on CT: grade 1 no symptoms and one lobe or under 25%; grade 2 new or worse symptoms and 25% to 50%; grade 3 severe symptoms limiting daily activities and all lobes or over 50%; grade 4 life-threatening. It recommends close monitoring for grade 1, prednisolone-equivalent 1 to 2 mg/kg/day for grades 2 to 3 and intravenous steroids for more severe or acute cases, asks for response to be assessed within 48 to 72 hours (SITC sets 72 hours before further drugs), and says steroid treatment usually lasts 6 to 8 weeks and does not exceed 12. It says treatment of Pneumocystis, which in context reads as preventive treatment, is generally not required except for people taking 20 mg of steroid a day for more than 6 weeks. It does not say when to hold or stop the checkpoint inhibitor.",
      evidence: "Expert consensus, not graded.",
      sources: ["cn-cip-2022"],
    },
    {
      name: "Stopping for good after severe pneumonitis (ASCO 2021 abstract and SITC 2021)",
      differs: "The ASCO abstract in general recommends permanent discontinuation for grade 4 toxicities of any organ; its lung table could not be read. SITC's lung recommendation covers re-challenge after grade 2 only; for grade 3 or 4 its general rule is that the decision to re-challenge should be risk-adjusted, weighing expected benefit against the potential for toxicity.",
      evidence: "ASCO: expert consensus. SITC: LE: 3 for the general rule on grade 3 or 4, LE: 4 for re-challenge after grade 2 pneumonitis.",
      sources: ["asco-2021", "sitc-2021"],
    },
  ],
  grades: [
    { claim: "Grade 2: prednisone 1 to 2 mg/kg/day; grade 3 or more: intravenous methylprednisolone 1 to 2 mg/kg/day; taper over 4 to 6 weeks", grade: "LE: 3", source: "sitc-2021" },
    { claim: "High-resolution chest CT for suspected pneumonitis; lung function tests considered if CT is negative", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Referral of people with existing autoimmune interstitial lung disease to a specialist before treatment, where possible", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Mycophenolate mofetil or cyclophosphamide as options if steroids fail within 72 hours", grade: "LE: 3", source: "sitc-2021" },
    { claim: "High-dose IVIG, infliximab or tocilizumab as options if steroids fail within 72 hours", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Re-challenge after grade 2 once symptoms have completely resolved", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Re-challenge after any grade 3 or 4 immune side effect is a risk-adjusted decision (general rule)", grade: "LE: 3", source: "sitc-2021", quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity" },
    { claim: "Steroid taper over at least 4 to 6 weeks (general rule)", grade: "expert consensus", source: "asco-2021", quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks." },
    { claim: "Permanent discontinuation in general after grade 4 (general rule)", grade: "expert consensus", source: "asco-2021", quote: "In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement." },
    { claim: "Response to steroids assessed within 48 to 72 hours", grade: "expert consensus (not graded)", source: "cn-cip-2022", quote: "For CIP, clinical improvements should be assessed within 48 to 72 hours of GCS treatment." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-16" },
    { ...ASCO_ICI_2021, accessed: "2026-11-16" },
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
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "A 2025 Chinese expert consensus on the diagnosis and management of checkpoint inhibitor pneumonitis (doi 10.3760/cma.j.cn112147-20241121-00694), from a different expert group and in a Chinese-language journal, is listed in Europe PMC with an abstract that reports 18 recommendations and no open full text. On 16 November 2026 it was tried again: the publisher's page loads its text by script and gave no readable text, so it was not read.",
    "SITC names an ECOG-ACRIN trial comparing IVIG with infliximab for steroid-refractory pneumonitis (NCT04438382). On 16 November 2026 its ClinicalTrials.gov record showed it terminated for slow accrual after enrolling one participant, with no outcome data reported. No randomised evidence on treatment after steroids was read.",
    "No source that could be read prints the standard grade definitions: SITC says it grades by CTCAE version 5.0 without reproducing them, and the only definitions on this page are the ones the Chinese consensus attributes to the NCCN guidelines, which were not read.",
    "No source that could be read states when someone with pneumonitis should be admitted to hospital, or an oxygen level that should prompt it.",
    "Guidelines differ on preventing Pneumocystis pneumonia during steroid courses for pneumonitis: SITC asks only for counselling about the risk, the Chinese consensus says treatment is generally not required except for 20 mg of steroid a day for more than 6 weeks, and the ASCO and ESMO positions were not read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab", "prednisone", "cyclophosphamide", "tocilizumab", "methylprednisolone", "infliximab", "mycophenolate"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["pneumonitis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "acute-oncology"],
});
