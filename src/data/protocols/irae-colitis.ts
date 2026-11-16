import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Diarrhoea and colitis caused by an immune checkpoint inhibitor, managed by grade.
 *
 * What was read, and how: see ./irae-sources.ts. SITC 2021 full text (the general panel recommendations and the
 * diarrhoea and colitis recommendations, read in full); ASCO 2021 abstract; ESMO 2022 not reachable. Quotes were
 * checked by script against the downloaded text; SITC's evidence levels are printed after each sentence as "(LE: n",
 * followed by reference numbers, and the quotes stop before them.
 */
export const iraeColitis = protocol({
  id: "irae-colitis",
  name: "Immune-related diarrhoea and colitis from checkpoint inhibitors, by grade",
  aka: ["checkpoint inhibitor colitis", "immune checkpoint inhibitor diarrhoea", "immune-mediated colitis", "ICI colitis management", "immunotherapy colitis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy drugs such as pembrolizumab, nivolumab and ipilimumab can make the immune system attack the bowel, causing diarrhoea, tummy pain or blood in the stool. Ring your cancer team's 24-hour line as soon as diarrhoea starts. Mild cases are watched; anything more is treated with steroids, and if steroids do not work within a few days, with a drip such as infliximab.",
  simple: "Immunotherapy can cause the bowel to become inflamed. If you get diarrhoea, ring your cancer helpline straight away. Steroid tablets or a drip usually settle it, and many people can restart immunotherapy afterwards.",
  summary: "Diarrhoea is reported in about 44% of patients on combined CTLA-4 and PD-(L)1 blockade (10% grade 3 or more), 36% on CTLA-4 inhibitors and 11% on PD-(L)1 inhibitors; colitis in 16%, 8% and 1% respectively (SITC 2021). Median onset is 5 to 10 weeks.\n\nSITC 2021: work up grade 1 with full blood count, metabolic panel and faecal lactoferrin, and continue the checkpoint inhibitor with monitoring. From grade 2, add faecal calprotectin and stool infection tests (C. difficile, CMV), hold the drug and start prednisone 1 mg/kg/day; grades 3 and 4 take 1 to 2 mg/kg/day, grade 4 intravenously. Sigmoidoscopy or colonoscopy with biopsy for grade 3 or more, or grade 2 lasting 5 days or more; CT for suspected perforation or toxic megacolon. Steroids are tapered within 4 weeks once symptoms reach grade 1 or less. No response in 3 to 5 days, recurrence on taper or severe ulceration at endoscopy: infliximab 5 mg/kg at 0, 2 and 6 weeks, switching to vedolizumab 300 mg on the same schedule if symptoms persist after the second infliximab dose. Screen for hepatitis B, HIV and tuberculosis first without delaying the dose. Re-challenge once symptoms are grade 1 or less on under 10 mg prednisone a day, after repeat endoscopy.\n\nASCO 2021 sets the general frame (continue for grade 1, hold for grade 2, high-dose steroids for grade 3, permanently stop for most grade 4) and tapers over at least 4 to 6 weeks, longer than SITC's 4 weeks for colitis. ESMO 2022 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "emergency-department", "ward"],
  },
  population: "Adults treated with an immune checkpoint inhibitor (anti-PD-1, anti-PD-L1 or anti-CTLA-4, alone or combined) who develop diarrhoea or symptoms of colitis. Combination CTLA-4 and PD-(L)1 treatment carries the highest risk. People with pre-existing inflammatory bowel disease, and children, are not addressed separately here.",
  trigger: "A person on or after checkpoint inhibitor treatment reports looser or more frequent stools, abdominal pain, or blood or mucus in the stool.",
  steps: [
    {
      action: "Before the first dose, teach the patient and carer which symptoms to report and whom to call",
      why: "Colitis usually starts at home weeks into treatment; early reporting is what keeps a mild case from becoming a severe one.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "For grade 1 diarrhoea, check full blood count, a metabolic panel and faecal lactoferrin, and continue the checkpoint inhibitor with close monitoring",
      why: "Mild diarrhoea often settles, and stopping an effective cancer drug has its own cost; the tests give a baseline if it worsens.",
      source: "sitc-2021",
      quote: "Diagnostic workup for grade 1 diarrhea or colitis symptoms should include CBC, CMP, and fecal lactoferrin.",
    },
    {
      action: "From grade 2, add faecal calprotectin and stool tests for infection, including C. difficile and CMV",
      why: "Infection causes the same symptoms and needs different treatment; ruling it out matters before and alongside immune suppression.",
      source: "sitc-2021",
      quote: "Additional workup should be performed for patients with diarrhea or colitis symptoms of grade ≥2, and these additional tests should include fecal calprotectin, and stool infectious analysis (stool ova and parasite, C. difficile and cytomegalovirus (CMV) testing via polymerase chain reaction (PCR) if available or if high index of suspicion is present, among other infectious studies (eg, COVID-19)).",
    },
    {
      action: "Do not wait for every test before starting treatment",
      why: "The search for another cause runs alongside treatment, not ahead of it.",
      source: "sitc-2021",
      quote: "Diagnostic evaluation for all irAEs should attempt to rule out other possible etiologies (eg, diarrhea/colitis associated with Clostridium difficile infection), but treatment for irAEs should be initiated as is deemed clinically appropriate.",
    },
    {
      action: "Arrange an abdominal CT if there are signs of perforation or toxic megacolon",
      why: "These complications need a surgeon as well as steroids, and endoscopy may be unsafe.",
      source: "sitc-2021",
      quote: "Abdominal CT scan should be obtained in patients with signs and symptoms of colitis complications, such as bowel perforation or toxic megacolon.",
    },
    {
      action: "Arrange flexible sigmoidoscopy or colonoscopy with biopsy for grade 3 or more, or for grade 2 lasting 5 days or longer",
      why: "Seeing and sampling the bowel confirms the diagnosis and shows ulceration, which changes treatment.",
      source: "sitc-2021",
      quote: "Flexible sigmoidoscopy and/or colonoscopy with biopsy should be performed for patients with diarrhea or colitis symptoms of grade ≥3 or with persistent (≥5 days) diarrhea or colitis symptoms of grade 2",
      grade: "LE: 4",
    },
    {
      action: "For grade 2, hold the checkpoint inhibitor and start steroids",
      why: "Holding the drug and calming the immune reaction early prevents progression.",
      source: "sitc-2021",
      quote: "Corticosteroids should be started in patients experiencing diarrhea or colitis symptoms of grade ≥2.",
    },
    {
      action: "Give prednisone 1 mg/kg/day (or equivalent) for grade 2 and 1 to 2 mg/kg/day for grades 3 and 4, intravenously for grade 4",
      why: "The dose matches the severity; the sickest patients may not absorb tablets.",
      source: "sitc-2021",
      quote: "The initial dose of prednisone should be 1 mg/kg/day (or equivalent) for grade 2 diarrhea or colitis and 1–2 mg/kg/day for grades 3 and 4. Grade 4 diarrhea or colitis should initially be treated with IV corticosteroids.",
    },
    {
      action: "When starting steroids, warn about high blood sugar, mood change, poor sleep, gastritis, weight gain and infections such as Pneumocystis pneumonia",
      why: "High-dose steroids have their own side effects, and some need prevention or monitoring.",
      source: "sitc-2021",
      quote: "When beginning corticosteroid therapy, patients should be specifically counseled about potential toxicities, including hyperglycemia, mood disturbances, insomnia, gastritis, weight gain, and opportunistic infections (eg, Pneumocystis pneumonia)",
      grade: "LE: 1",
    },
    {
      action: "Taper the steroids once symptoms are grade 1 or less",
      why: "Stopping too fast risks a flare; SITC tapers colitis within 4 weeks of improvement, ASCO over at least 4 to 6 weeks (see variants).",
      source: "sitc-2021",
      quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1",
      grade: "LE: 1",
    },
    {
      action: "Test for hepatitis B, HIV and tuberculosis before infliximab or vedolizumab, but do not hold the dose for the results",
      why: "These drugs can reactivate hidden infections, yet the colitis cannot wait for the laboratory.",
      source: "sitc-2021",
      quote: "Prior to administration of infliximab or vedolizumab, patients should be tested for HBV, HIV, and TB. Administration of infliximab or vedolizumab should not be delayed if test results are pending.",
    },
    {
      action: "If there is no response to steroids within 3 to 5 days, a relapse on taper, or severe ulceration at endoscopy, give infliximab 5 mg/kg at 0, 2 and 6 weeks",
      why: "Colitis that does not settle on steroids is steroid-refractory, and a biologic works faster than more steroid.",
      source: "sitc-2021",
      quote: "If diarrhea or colitis symptoms do not respond to corticosteroid therapy within 3–5 days, if diarrhea or colitis symptoms recur after tapering corticosteroids, or if there is severe ulcerative presentation on colonoscopy, 3 doses of infliximab (5 mg/kg) should be administered at 0, 2, and 6 weeks",
      grade: "LE: 1",
    },
    {
      action: "If symptoms persist after the second infliximab dose, give vedolizumab 300 mg at 0, 2 and 6 weeks instead of the third",
      why: "Vedolizumab acts only on the gut, and SITC uses it as the next step when infliximab is not working.",
      source: "sitc-2021",
      quote: "If diarrhea or colitis symptoms persist after the second dose of infliximab treatment, the third dose should be held and 3 doses of vedolizumab (300 mg) should be administered at 0, 2, and 6 weeks",
      grade: "LE: 1",
    },
    {
      action: "If grade 3 or more does not improve on immune suppression, repeat the endoscopy with C. difficile and CMV testing",
      why: "A new infection on steroids is a common reason for failure.",
      source: "sitc-2021",
      quote: "If no clinical improvement is observed following immunosuppressive therapy in patients with grade ≥3 diarrhea or colitis, a repeat endoscopy with infectious workup ( C. difficile and CMV) should be performed.",
    },
    {
      action: "Consider restarting the checkpoint inhibitor once symptoms are grade 1 or less on under 10 mg prednisone a day, after a repeat endoscopy, and watch for recurrence",
      why: "Many patients can safely restart; in one retrospective study about a third had colitis again.",
      source: "sitc-2021",
      quote: "These patients may be re-challenged with ICIs if their symptoms are stable (grade ≤1 or baseline) with <10 mg/day of prednisone (or equivalent)",
      grade: "LE: 4",
    },
  ],
  bestInClass: {
    statement: "The most detailed current recommendations that could be read are SITC 2021, graded by Oxford level: steroids from grade 2 (prednisone 1 mg/kg/day for grade 2, 1 to 2 mg/kg/day for grades 3 and 4, intravenous for grade 4), endoscopy with biopsy for grade 3 or persistent grade 2, infliximab after 3 to 5 days without response, then vedolizumab, and a steroid taper within 4 weeks of improvement. ASCO 2021 agrees on the frame (continue at grade 1, hold at grade 2, high-dose steroids at grade 3) but tapers over at least 4 to 6 weeks and generally stops checkpoint inhibitors permanently after grade 4, where SITC allows a hold rather than discontinuation for grade 3 or more. ESMO 2022, the European guideline, could not be read and is not compared here.",
    sources: ["sitc-2021", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Longer steroid taper and permanent stop after grade 4 (ASCO 2021)",
      differs: "Tapers corticosteroids over at least 4 to 6 weeks for irAEs in general, and recommends permanent discontinuation of checkpoint inhibitors after most grade 4 toxicities.",
      evidence: "Expert consensus (informal consensus process); the abstract was read, not the colitis table.",
      sources: ["asco-2021"],
    },
    {
      name: "Hold rather than stop after grade 3 or 4 colitis (SITC 2021)",
      differs: "Allows checkpoint inhibitors to be withheld rather than discontinued for grade 3 or more diarrhoea or colitis, with re-challenge when stable at grade 1 or less on under 10 mg prednisone a day.",
      evidence: "LE: 4 (case series level).",
      sources: ["sitc-2021"],
    },
    {
      name: "Early biologic, within 10 days of onset",
      differs: "Gives infliximab or vedolizumab early rather than after steroids fail. SITC reports emerging evidence that early use (under 10 days from symptom onset) may be associated with fewer hospitalisations, fewer taper failures, shorter steroid courses and shorter symptoms, but does not recommend it as first line.",
      evidence: "Observational evidence cited by SITC; no head-to-head trial of infliximab against vedolizumab.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Endoscopy with biopsy for grade 3 or more, or grade 2 for 5 days or more", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Steroid taper within 4 weeks after improvement to grade 1 or less", grade: "LE: 1", source: "sitc-2021", quote: "Corticosteroids should be tapered within 4 weeks after improvement of diarrhea or colitis symptoms to grade ≤1" },
    { claim: "Infliximab 5 mg/kg at 0, 2 and 6 weeks for steroid-refractory or recurrent colitis", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Vedolizumab 300 mg at 0, 2 and 6 weeks if symptoms persist after two infliximab doses", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Re-challenge when grade 1 or less on under 10 mg prednisone a day", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Grade 1: continue with close monitoring; grade 3: suspend and start high-dose corticosteroids", grade: "expert consensus", source: "asco-2021", quote: "Grade 3 toxicities generally warrant suspension of ICPis and the initiation of high-dose corticosteroids." },
    { claim: "Corticosteroid taper over at least 4 to 6 weeks", grade: "expert consensus", source: "asco-2021", quote: "Corticosteroids should be tapered over the course of at least 4-6 weeks." },
  ],
  sources: [SITC_ICI_2021, ASCO_ICI_2021, ESMO_ICI_2022],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The NCCN guideline on management of immunotherapy-related toxicities was not read; NCCN's full guidelines need an account.",
    "No randomised trial read here compares infliximab with vedolizumab, or early biologic with steroids first, for checkpoint inhibitor colitis.",
    "How to manage people who start a checkpoint inhibitor with existing inflammatory bowel disease is mentioned by SITC (flares in a substantial minority) but not set out as steps here.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab", "prednisone", "infliximab", "vedolizumab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-colitis", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "acute-oncology"],
});
