import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Diarrhoea and colitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts for the first reading on 11 November 2026.
 *
 * Second accuracy pass, 16 November 2026. Every claim was re-read against raw text:
 * - SITC 2021: the Europe PMC full-text XML (PMC8237720) saved that day by the irae-myocarditis checker was re-used;
 *   the general section, the general panel recommendations, the diarrhoea and colitis text and its recommendations
 *   were read in full. Quotes were checked by script after stripping XML tags and citation cross-references only.
 *   SITC prints an evidence level after a sentence as "(LE: n)"; a paragraph of several sentences can carry one LE at
 *   its end, so a grade is attached here only to the sentence it directly follows.
 * - ASCO 2021: the abstract from the Europe PMC REST record (same saved copy). The full text at ascopubs.org still
 *   refuses a script.
 * - ESMO 2022: still not reachable (publisher 403, no open copy).
 * - CTCAE v5.0: new source. SITC grades by it but does not print the definitions, so the stool counts were read from
 *   the National Cancer Institute's own spreadsheet, fetched with curl and unpacked by script. Version 6.0 (2025) was
 *   fetched too and compared for these two terms.
 * Corrected in this pass: reasons ("why") that said more than SITC does, "many people can restart" (SITC gives a 34%
 * recurrence figure and no restart rate), a 24-hour line no source describes, the re-challenge rule (it is scoped to
 * grade 3 or more and reads "grade 1 or less or baseline"), ASCO's hedges, and one quote with a stray space.
 */
export const iraeColitis = protocol({
  id: "irae-colitis",
  name: "Immune-related diarrhoea and colitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor colitis", "immune checkpoint inhibitor diarrhoea", "immune-mediated colitis", "ICI colitis management", "immunotherapy colitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy drugs such as pembrolizumab, nivolumab and ipilimumab can inflame the bowel, causing diarrhoea, tummy pain or blood in the stool. Tell your cancer team if you get diarrhoea. Mild cases are watched; anything more is treated with steroids, and if steroids have not worked within 3 to 5 days, with a drip such as infliximab.",
  simple: "Immunotherapy can cause the bowel to become inflamed. If you get diarrhoea, tell your cancer team. Steroids are the usual treatment, with a drip such as infliximab if they do not work. Some people can restart immunotherapy afterwards.",
  summary: "Diarrhoea is reported in about 44% of patients on combined CTLA-4 and PD-(L)1 blockade (10% grade 3 or more), 36% on CTLA-4 inhibitors and 11% on PD-(L)1 inhibitors; colitis in 16%, 8% and 1% respectively (SITC 2021). Median onset is 5 to 10 weeks. SITC grades by CTCAE version 5.0, which grades diarrhoea by stools a day over baseline: fewer than 4 more is grade 1, 4 to 6 more is grade 2, 7 or more (or hospital admission indicated) is grade 3, and life-threatening consequences are grade 4. Colitis is graded separately: abdominal pain, or mucus or blood in the stool, is grade 2; severe abdominal pain or peritoneal signs is grade 3.\n\nSITC 2021: work up grade 1 with full blood count, metabolic panel and faecal lactoferrin; under SITC's general rule the checkpoint inhibitor may continue, with monitoring for worsening. From grade 2, add faecal calprotectin and stool infection tests (C. difficile, CMV), withhold the drug (general rule) and start prednisone 1 mg/kg/day; grades 3 and 4 take 1 to 2 mg/kg/day, grade 4 intravenously at first. Sigmoidoscopy or colonoscopy with biopsy for grade 3 or more, or grade 2 lasting 5 days or more; CT for signs of perforation or toxic megacolon. Steroids are tapered within 4 weeks after symptoms improve to grade 1 or less; SITC expects improvement or resolution in 1 to 2 weeks. No response in 3 to 5 days, recurrence after the taper or severe ulceration at colonoscopy: infliximab 5 mg/kg at 0, 2 and 6 weeks. If symptoms persist after the second infliximab dose, the third is held and vedolizumab 300 mg is given at 0, 2 and 6 weeks. Test for hepatitis B, HIV and tuberculosis first, without delaying the dose for the results. For grade 3 or more the checkpoint inhibitor may be withheld rather than discontinued, and re-challenge is allowed once symptoms are stable (grade 1 or less, or baseline) on under 10 mg prednisone a day; SITC asks for a repeat endoscopy before resuming.\n\nASCO 2021 (abstract only) sets a general frame across all organs: continue with close monitoring for grade 1, treatment may be suspended for most grade 2, grade 3 generally warrants suspension and high-dose steroids, and in general permanent discontinuation for grade 4. It tapers over at least 4 to 6 weeks, where SITC tapers colitis within 4 weeks of improvement. ESMO 2022 could not be read.",
  asOf: "2026-11-16",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "emergency-department", "ward"],
  },
  population: "Adults treated with an immune checkpoint inhibitor (anti-PD-1, anti-PD-L1 or anti-CTLA-4, alone or combined) who develop diarrhoea or symptoms of colitis. SITC reports a higher incidence with combined CTLA-4 and PD-(L)1 treatment than with a single drug. People with pre-existing inflammatory bowel disease, and children, are not addressed separately here.",
  trigger: "A person on or after checkpoint inhibitor treatment reports looser or more frequent stools, abdominal pain, or blood or mucus in the stool.",
  steps: [
    {
      action: "Give the patient dedicated education about immune-related side effects",
      why: "Diarrhoea or colitis starts a median of 5 to 10 weeks into treatment, and diarrhoea may be a sign of colitis.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "Grade the diarrhoea or colitis by CTCAE version 5.0",
      why: "Every step below depends on the grade. For diarrhoea, CTCAE counts stools a day over the person's baseline: fewer than 4 more is grade 1, 4 to 6 more is grade 2, 7 or more is grade 3, and life-threatening is grade 4. Colitis with abdominal pain, mucus or blood in the stool is grade 2.",
      source: "sitc-2021",
      quote: "Grades of AEs are defined as in the CTCAE v5.0.",
    },
    {
      action: "For grade 1 diarrhoea or colitis symptoms, check full blood count, a metabolic panel and faecal lactoferrin; the checkpoint inhibitor may continue while the patient is monitored for worsening",
      why: "SITC's general rule lets treatment continue at grade 1 with monitoring. In one study a positive faecal lactoferrin predicted inflammation at endoscopy.",
      source: "sitc-2021",
      quote: "Diagnostic workup for grade 1 diarrhea or colitis symptoms should include CBC, CMP, and fecal lactoferrin.",
    },
    {
      action: "From grade 2, add faecal calprotectin and stool tests for infection, including C. difficile and CMV",
      why: "Other causes, such as C. difficile infection, should be looked for.",
      source: "sitc-2021",
      quote: "Additional workup should be performed for patients with diarrhea or colitis symptoms of grade ≥2, and these additional tests should include fecal calprotectin, and stool infectious analysis (stool ova and parasite, C. difficile and cytomegalovirus (CMV) testing via polymerase chain reaction (PCR) if available or if high index of suspicion is present, among other infectious studies (eg, COVID-19)).",
    },
    {
      action: "Look for other causes, but start treatment when it is clinically appropriate",
      why: "SITC asks for both: an attempt to rule out other causes, and treatment started as the clinician judges right.",
      source: "sitc-2021",
      quote: "Diagnostic evaluation for all irAEs should attempt to rule out other possible etiologies (eg, diarrhea/colitis associated with Clostridium difficile infection), but treatment for irAEs should be initiated as is deemed clinically appropriate.",
    },
    {
      action: "Arrange an abdominal CT if there are signs or symptoms of a complication such as perforation or toxic megacolon",
      why: "Where suspected perforation or toxic megacolon rules out colonoscopy, SITC calls CT an effective, non-invasive alternative.",
      source: "sitc-2021",
      quote: "Abdominal CT scan should be obtained in patients with signs and symptoms of colitis complications, such as bowel perforation or toxic megacolon.",
    },
    {
      action: "Arrange flexible sigmoidoscopy or colonoscopy with biopsy for grade 3 or more, or for grade 2 lasting 5 days or longer",
      why: "The diagnosis is typically based on histology, and severe ulceration seen at colonoscopy is one of the reasons to give infliximab.",
      source: "sitc-2021",
      quote: "Flexible sigmoidoscopy and/or colonoscopy with biopsy should be performed for patients with diarrhea or colitis symptoms of grade ≥3 or with persistent (≥5 days) diarrhea or colitis symptoms of grade 2",
      grade: "LE: 4",
    },
    {
      action: "For grade 2 or more, withhold the checkpoint inhibitor and start steroids",
      why: "Steroids are the first treatment from grade 2. Withholding at grade 2 is SITC's general rule for all immune-related side effects; its colitis section does not change it.",
      source: "sitc-2021",
      quote: "Corticosteroids should be started in patients experiencing diarrhea or colitis symptoms of grade ≥2.",
    },
    {
      action: "Start prednisone at 1 mg/kg/day (or equivalent) for grade 2 and 1 to 2 mg/kg/day for grades 3 and 4; treat grade 4 with intravenous steroids at first",
      why: "The starting dose rises with the grade. SITC expects symptoms to improve or resolve in 1 to 2 weeks on steroids.",
      source: "sitc-2021",
      quote: "The initial dose of prednisone should be 1 mg/kg/day (or equivalent) for grade 2 diarrhea or colitis and 1–2 mg/kg/day for grades 3 and 4. Grade 4 diarrhea or colitis should initially be treated with IV corticosteroids.",
    },
    {
      action: "When starting steroids, counsel the patient about high blood sugar, mood change, poor sleep, gastritis, weight gain and infections such as Pneumocystis pneumonia",
      why: "Steroids have their own side effects, and some need monitoring or preventive treatment.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "Taper the steroids within 4 weeks after symptoms improve to grade 1 or less",
      why: "SITC sets this limit for colitis; ASCO's general rule is a taper over at least 4 to 6 weeks (see variants). If symptoms come back after the taper, SITC evaluates and treats them as it did the first episode.",
      source: "sitc-2021",
      quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1",
      grade: "LE: 1",
    },
    {
      action: "Test for hepatitis B, HIV and tuberculosis before infliximab or vedolizumab, but do not delay the dose while results are pending",
      why: "SITC says these drugs may be problematic in people with latent infections; infliximab carries a boxed warning about reactivation of latent tuberculosis.",
      source: "sitc-2021",
      quote: "Prior to administration of infliximab or vedolizumab, patients should be tested for HBV, HIV, and TB. Administration of infliximab or vedolizumab should not be delayed if test results are pending.",
    },
    {
      action: "If there is no response to steroids within 3 to 5 days, a recurrence after the steroid taper, or severe ulceration at colonoscopy, give three doses of infliximab 5 mg/kg at 0, 2 and 6 weeks",
      why: "SITC treats no improvement in 3 to 5 days as steroid-refractory, and gives the three doses to reduce the risk of the colitis coming back.",
      source: "sitc-2021",
      quote: "If diarrhea or colitis symptoms do not respond to corticosteroid therapy within 3–5 days, if diarrhea or colitis symptoms recur after tapering corticosteroids, or if there is severe ulcerative presentation on colonoscopy, 3 doses of infliximab (5 mg/kg) should be administered at 0, 2, and 6 weeks",
      grade: "LE: 1",
    },
    {
      action: "If symptoms persist after the second infliximab dose, hold the third and give three doses of vedolizumab 300 mg at 0, 2 and 6 weeks",
      why: "SITC uses vedolizumab, whose anti-inflammatory action is gut-selective, when infliximab has not settled the symptoms.",
      source: "sitc-2021",
      quote: "If diarrhea or colitis symptoms persist after the second dose of infliximab treatment, the third dose should be held and 3 doses of vedolizumab (300 mg) should be administered at 0, 2, and 6 weeks",
      grade: "LE: 1",
    },
    {
      action: "If grade 3 or more does not improve on immune suppression, repeat the endoscopy with tests for C. difficile and CMV",
      why: "SITC asks for infection to be looked for again when treatment is not working.",
      source: "sitc-2021",
      quote: "If no clinical improvement is observed following immunosuppressive therapy in patients with grade ≥3 diarrhea or colitis, a repeat endoscopy with infectious workup (C. difficile and CMV) should be performed.",
    },
    {
      action: "For grade 3 or more, the checkpoint inhibitor may be withheld for a time rather than stopped for good",
      why: "SITC does not require permanent discontinuation after severe colitis. ASCO's general rule, read only in its abstract, is permanent discontinuation for grade 4 (see variants).",
      source: "sitc-2021",
      quote: "ICIs may be temporarily withheld (instead of discontinued) in patients experiencing grade ≥3 diarrhea or colitis symptoms.",
    },
    {
      action: "Consider re-challenge once symptoms are stable (grade 1 or less, or baseline) on under 10 mg prednisone a day; repeat the endoscopy before resuming, and monitor closely for recurrence",
      why: "Re-challenge is permitted, not required. In one retrospective study 34% of re-challenged patients had colitis again.",
      source: "sitc-2021",
      quote: "These patients may be re-challenged with ICIs if their symptoms are stable (grade ≤1 or baseline) with <10 mg/day of prednisone (or equivalent)",
      grade: "LE: 4",
    },
  ],
  bestInClass: {
    statement: "The most detailed current recommendations that could be read are SITC 2021, graded by Oxford level of evidence: steroids from grade 2 (prednisone 1 mg/kg/day for grade 2, 1 to 2 mg/kg/day for grades 3 and 4, intravenous at first for grade 4), endoscopy with biopsy for grade 3 or more or persistent grade 2 (LE: 4), a steroid taper within 4 weeks of improvement (LE: 1), infliximab after 3 to 5 days without response (LE: 1), then vedolizumab (LE: 1). ASCO 2021, read only as its abstract, gives a general frame for all organs that is consistent with this (continue with close monitoring at grade 1, treatment may be suspended for most grade 2, suspension and high-dose steroids generally at grade 3) but tapers over at least 4 to 6 weeks and in general recommends permanent discontinuation at grade 4, where SITC says the drug may be withheld rather than discontinued for grade 3 or more colitis. ASCO's own colitis table was not read, so whether it differs from its general frame is not known here. ESMO 2022, the European guideline, could not be read and is not compared here.",
    sources: ["sitc-2021", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Longer steroid taper and permanent stop after grade 4 (ASCO 2021)",
      differs: "For immune-related side effects in general, tapers corticosteroids over at least 4 to 6 weeks and, in general, recommends permanent discontinuation of checkpoint inhibitors at grade 4 (except endocrine problems controlled by hormone replacement).",
      evidence: "Expert consensus (informal consensus process); the abstract was read, not the colitis table.",
      sources: ["asco-2021"],
    },
    {
      name: "Hold rather than stop after grade 3 or 4 colitis (SITC 2021)",
      differs: "Says checkpoint inhibitors may be temporarily withheld rather than discontinued for grade 3 or more diarrhoea or colitis, with re-challenge allowed when symptoms are stable (grade 1 or less, or baseline) on under 10 mg prednisone a day.",
      evidence: "LE: 4 (case series, case-control or historically controlled study), printed after the re-challenge sentence.",
      sources: ["sitc-2021"],
    },
    {
      name: "Early biologic, within 10 days of onset",
      differs: "Gives infliximab or vedolizumab early rather than after steroids fail. SITC reports emerging evidence that early use (under 10 days from symptom onset) may be associated with fewer hospitalisations, fewer steroid taper failures, shorter steroid courses and a shorter duration of symptoms than later treatment. Its recommendations still place the biologic after 3 to 5 days without a steroid response, a recurrence after the taper, or severe ulceration at colonoscopy.",
      evidence: "SITC calls the evidence emerging and attaches no evidence level to it; it notes there are no head-to-head studies of infliximab against vedolizumab.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Endoscopy with biopsy for grade 3 or more, or grade 2 for 5 days or more", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Steroid taper within 4 weeks after improvement to grade 1 or less", grade: "LE: 1", source: "sitc-2021", quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1" },
    { claim: "Infliximab 5 mg/kg at 0, 2 and 6 weeks for steroid-refractory or recurrent colitis, or severe ulceration at colonoscopy", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Vedolizumab 300 mg at 0, 2 and 6 weeks if symptoms persist after two infliximab doses", grade: "LE: 1", source: "sitc-2021" },
    { claim: "After grade 3 or more, re-challenge when stable (grade 1 or less, or baseline) on under 10 mg prednisone a day", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Grade 1: continue with close monitoring; grade 3: suspend and start high-dose corticosteroids (general rules for all organs)", grade: "expert consensus", source: "asco-2021", quote: "Grade 3 toxicities generally warrant suspension of ICPis and the initiation of high-dose corticosteroids." },
    { claim: "Corticosteroid taper over at least 4 to 6 weeks (general rule for all organs)", grade: "expert consensus", source: "asco-2021", quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-16" },
    { ...ASCO_ICI_2021, accessed: "2026-11-16" },
    ESMO_ICI_2022,
    {
      key: "ctcae-v5",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0",
      publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program",
      year: 2017,
      url: "https://dctd.cancer.gov/research/ctep-trials/trial-development",
      gradingScheme: "Not an evidence grade: a severity scale for each adverse event term, from grade 1 to grade 5 (death).",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The NCCN guideline on management of immunotherapy-related toxicities was not read; NCCN's full guidelines need an account.",
    "No randomised trial read here compares infliximab with vedolizumab, or early biologic with steroids first, for checkpoint inhibitor colitis. SITC 2021 says no completed randomised trial of managing these side effects had been published.",
    "How to manage people who start a checkpoint inhibitor with existing inflammatory bowel disease is mentioned by SITC (flares in a substantial minority) but not set out as steps here.",
    "SITC 2021 grades by CTCAE version 5.0 (2017) and does not print the definitions; the stool counts here were read from the National Cancer Institute's spreadsheet on 16 November 2026. The Institute has since published version 6.0 (2025), for newly opened studies. Read the same day, it keeps the grade 2 and grade 3 stool counts (4 to 6, and 7 or more, a day over baseline) and the colitis grades, and rewords grade 1 diarrhoea as a change in consistency or frequency. No guideline read here grades by version 6.0.",
    "SITC prints that repeat endoscopy should be performed before resuming a checkpoint inhibitor inside its paragraph on grade 3 or more colitis that has not improved; whether it means every re-challenge is not stated.",
    "On 16 November 2026 this page was re-read against the SITC full text and the ASCO abstract. What ASCO recommends for colitis specifically (its doses, its timing for infliximab, and when it stops treatment for good) could not be re-read because the full text refuses a script, so those points are not stated here.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab", "prednisone", "infliximab", "vedolizumab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-colitis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "acute-oncology"],
});
