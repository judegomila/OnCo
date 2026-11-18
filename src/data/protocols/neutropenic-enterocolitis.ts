import { protocol } from "./helpers";

/*
 * Neutropenic enterocolitis (typhlitis): recognition, imaging, cultures, conservative treatment, antibiotics and when
 * to involve surgeons.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - AGIHO/DGHO 2017 updated guideline on gastrointestinal complications in adult cancer patients (Annals of
 *   Hematology, published November 2017, 2018 volume): open access, full text from Europe PMC (PMC5748412). No later
 *   AGIHO update was found in Europe PMC.
 * - Clinical Infectious Diseases 2025 cohort of 178 episodes by chemotherapy regimen: abstract from Europe PMC.
 * - Pediatric Infectious Disease Journal 2022 review on typhlitis in children: found, not read.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 *
 * Second accuracy pass, 16 November 2026 (an independent re-read, every claim against the re-fetched raw text):
 * - AGIHO/DGHO 2017: full-text XML fetched again from Europe PMC (PMC5748412), tags stripped, every quote matched by
 *   script. Europe PMC title searches found no later AGIHO edition (only the 2013 original and this update).
 * - Clinical Infectious Diseases cohort: now open access in Europe PMC (PMC13017227), so read in full rather than as
 *   an abstract. First published online 20 March 2025; the journal issue is volume 82, 2026 (Crossref).
 * - Pediatric Infectious Disease Journal 2022 review (PMID 35421049): Europe PMC holds no abstract and no open full
 *   text, so it is still not read.
 * Corrected: the antibiotic step carried grade BIII beside a sentence on duration that the guideline does not grade
 * (the step is now two); "resting the bowel" and antibiotics "through a drip" were not AGIHO's words (it says a bland
 * diet and does not state a route); several reasons said more than the guideline does.
 */
export const neutropenicEnterocolitis = protocol({
  id: "neutropenic-enterocolitis",
  name: "Neutropenic enterocolitis (typhlitis): imaging, cultures, antibiotics and conservative care",
  aka: ["typhlitis", "NEC", "neutropenic colitis", "ileocaecal syndrome", "chemotherapy-associated bowel syndrome"],
  domain: "emergencies",
  tldr: "During intensive chemotherapy, when white cells are very low, the bowel wall can become inflamed and infected. Fever with tummy pain, diarrhoea or bloating is an emergency: ring your treatment helpline at once. In hospital it is confirmed with an ultrasound or CT scan and treated with antibiotics, fluids, pain relief and a bland diet, with surgeons asked to see you early.",
  simple: "Fever with tummy pain or diarrhoea while your blood count is low after chemotherapy is an emergency. Ring your cancer helpline at once.",
  summary: "Neutropenic enterocolitis complicates intensive chemotherapy, above all for acute leukaemia; AGIHO cites a pooled incidence of 5.3% in hospitalised patients with haematological cancers, aplastic anaemia or high-dose chemotherapy for solid tumours, and mortality from under 20% to 82%. It names high-dose cytarabine with anthracyclines as a major risk factor. A 2025 cohort of 178 episodes found it in 13.8% of AML induction courses and 9.5% of autologous transplants (higher with standard 7+3 induction and BEAM conditioning), with lower 30-day mortality than earlier reports.\n\nAGIHO 2017: proposed diagnostic criteria are fever, abdominal pain and bowel wall thickening over 4 mm across more than 30 mm on ultrasound or CT; a clinical definition (temperature 37.8 °C or more with abdominal pain and/or no bowel movement for 72 hours or more) identifies neutropenic patients at risk earlier. Non-invasive imaging is recommended to confirm it and exclude perforation; blood and stool cultures and a C. difficile toxin test are recommended; endoscopy for biopsies is discouraged because of perforation risk. Conservative therapy is preferred in most cases (bland diet, hydration, pain control; BIII); piperacillin-tazobactam, imipenem-cilastatin or meropenem (BIII); antimicrobial therapy until clinical signs and neutropenia resolve (stated without a grade); no studies on adding metronidazole or vancomycin (CIII); empirical antifungal therapy may be discussed if not already given for persistent febrile neutropenia (BIII); growth factors might be considered (BIII). Surgical consultation early; surgery reserved for severe cases such as perforation (BIII).",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "surgical-team", "patient-or-carer"],
    where: ["ward", "emergency-department", "acute-oncology-service", "intensive-care", "telephone-triage"],
  },
  population: "Adults with neutropenia after intensive chemotherapy, above all for acute leukaemia or high-dose chemotherapy before autologous stem cell transplant. AGIHO's guideline covers adults and the 2025 cohort enrolled people aged 18 and over; children have a separate literature (noted in gaps).",
  trigger: "Fever with abdominal pain, diarrhoea, distension or absent bowel movements in a person who is neutropenic after chemotherapy.",
  steps: [
    {
      action: "Suspect it early: a temperature of 37.8 °C or more with abdominal pain and/or no bowel movement for 72 hours or more in a neutropenic patient",
      why: "The formal definition describes late disease; neutropenic patients with this earlier clinical picture were more likely to have complications and to die.",
      source: "agiho-2017",
      quote: "Neutropenic patients with chemotherapy-associated bowel syndrome (T ≥ 37.8 °C and abdominal pain and/or lack of bowel movement for ≥ 72 h) were more likely to suffer complications and death [27].",
    },
    {
      action: "Confirm with non-invasive imaging (ultrasound or CT), looking for bowel wall thickening over 4 mm across more than 30 mm and for perforation",
      why: "Imaging shows the thickened bowel and whether it has burst; surgery is kept for severe cases such as a burst bowel.",
      source: "agiho-2017",
      quote: "Non-invasive imaging is generally recommended to confirm the diagnosis of NEC and to exclude bowel wall perforation.",
    },
    {
      action: "Send blood cultures, stool cultures and a C. difficile toxin test",
      why: "The tests look for bacteria in the blood linked to the condition and rule out colitis caused by C. difficile.",
      source: "agiho-2017",
      quote: "Blood cultures, stool cultures, and a C. difficile toxin test for exclusion of NEC-associated bacteremia and colitis due to C. difficile, respectively, are recommended.",
    },
    {
      action: "Do not do endoscopy to take biopsies",
      why: "It raises the risk of the bowel wall tearing.",
      source: "agiho-2017",
      quote: "Endoscopy to obtain biopsies is discouraged, due to the increased risk of bowel wall perforation.",
    },
    {
      action: "Treat conservatively in most cases: bland diet, hydration and effective pain relief",
      why: "The guideline prefers supportive care in most cases and keeps operations for severe ones.",
      source: "agiho-2017",
      quote: "Conservative therapy is preferred in most cases, consisting of a bland diet, hydration, and an effective pain treatment (BIII).",
      grade: "BIII",
    },
    {
      action: "Give piperacillin-tazobactam, imipenem-cilastatin or meropenem",
      why: "The choice follows guidelines for complicated abdominal infection and for unexplained fever in neutropenia; Gram-negative Enterobacteriaceae are the bacteria most often found in the blood in this condition.",
      source: "agiho-2017",
      quote: "In accordance with IDSA guidelines for patients with complicated abdominal infections in non-neutropenic patients [81] and the guideline for antimicrobial therapy of unexplained fever in neutropenic patients of the AGIHO [82], we recommend administration of piperacillin/tazobactam or imipenem/cilastatin or meropenem (BIII).",
      grade: "BIII",
    },
    {
      action: "Continue antimicrobial treatment until the clinical signs and the neutropenia have resolved",
      why: "The guideline ties the length of treatment to recovery of both the symptoms and the blood count; it prints no grade beside this sentence.",
      source: "agiho-2017",
      quote: "Antimicrobial therapy should be administered until resolution of clinical signs and neutropenia.",
    },
    {
      action: "Discuss empirical antifungal treatment if it has not already been started for persistent neutropenic fever",
      why: "A systematic review cited by the guideline found fungal infection in a pooled 6.2% of cases.",
      source: "agiho-2017",
      quote: "Empirical antifungal therapy may be discussed if it has not yet been administered for the indication of persistent febrile neutropenia [68, 83, 84] (BIII).",
      grade: "BIII",
    },
    {
      action: "Ask surgeons to see the person early, but keep operations for severe cases such as perforation",
      why: "In people whose white cells or platelets are low, the guideline keeps operations for severe cases such as a burst bowel, but wants surgeons involved from an early stage.",
      source: "agiho-2017",
      quote: "While a surgical consultation should be obtained at an early stage of disease evolution, surgical interventions in the neutropenic and/or thrombocytopenic patient are reserved to severe cases, e.g., patients with bowel wall perforation (BIII).",
      grade: "BIII",
    },
  ],
  bestInClass: {
    statement: "The AGIHO/DGHO 2017 update is the only guideline read that addresses neutropenic enterocolitis directly; every graded recommendation it makes on this condition is strength B or C on level III evidence (opinion of respected authorities, clinical experience, descriptive case studies or expert committee reports). Its approach: early recognition, imaging to confirm and exclude perforation, cultures and a C. difficile test, no endoscopy for biopsies, conservative care in most cases, piperacillin-tazobactam, imipenem-cilastatin or meropenem, continued until the clinical signs and the neutropenia resolve, antifungal therapy discussed, and early surgical review with surgery kept for severe cases such as perforation. Newer cohort data (Clinical Infectious Diseases 2025) refine who is at risk (standard 7+3 AML induction, high-dose corticosteroids, high circulating blast counts, azacitidine, and BEAM conditioning and older age at autologous transplant); its authors write that their data confirm a conservative approach, with surgery kept for deterioration despite medical treatment.",
    sources: ["agiho-2017", "cid-2025"],
  },
  variants: [
    {
      name: "Adding metronidazole or vancomycin to the beta-lactam",
      differs: "Adds metronidazole for extra anaerobic cover, or vancomycin, to piperacillin-tazobactam or a carbapenem.",
      evidence: "AGIHO found no studies of their effect on patient outcome and prints CIII beside that statement. The centre behind the 2025 cohort started cefepime with or without metronidazole, or piperacillin-tazobactam, at each episode of febrile neutropenia.",
      sources: ["agiho-2017", "cid-2025"],
    },
    {
      name: "Haematopoietic growth factors (G-CSF)",
      differs: "Gives a haematopoietic growth factor such as G-CSF during the episode.",
      evidence: "AGIHO: might be considered, though corresponding evidence is not available (BIII). The authors of the 2025 cohort describe G-CSF as part of usual medical treatment.",
      sources: ["agiho-2017", "cid-2025"],
    },
    {
      name: "Bowel rest and parenteral nutrition",
      differs: "Rests the bowel and feeds through a vein, where AGIHO's conservative therapy is a bland diet with hydration.",
      evidence: "The authors of the 2025 cohort describe usual supportive therapy as bowel rest, intravenous fluids and parenteral nutrition, and say management relies mainly on expert opinion. AGIHO names a bland diet (BIII) and does not mention bowel rest or parenteral nutrition for this condition.",
      sources: ["cid-2025", "agiho-2017"],
    },
  ],
  grades: [
    { claim: "Conservative therapy: bland diet, hydration, pain control", grade: "BIII", source: "agiho-2017", quote: "Conservative therapy is preferred in most cases, consisting of a bland diet, hydration, and an effective pain treatment (BIII)." },
    { claim: "Piperacillin-tazobactam, imipenem-cilastatin or meropenem", grade: "BIII", source: "agiho-2017", quote: "In accordance with IDSA guidelines for patients with complicated abdominal infections in non-neutropenic patients [81] and the guideline for antimicrobial therapy of unexplained fever in neutropenic patients of the AGIHO [82], we recommend administration of piperacillin/tazobactam or imipenem/cilastatin or meropenem (BIII)." },
    { claim: "Additional metronidazole or vancomycin", grade: "CIII", source: "agiho-2017", quote: "There are no studies assessing the effect of additional metronidazole or vancomycin on patient outcome (CIII)." },
    { claim: "Haematopoietic growth factors", grade: "BIII", source: "agiho-2017", quote: "The use of hematopoietic growth factors might be considered, even though corresponding evidence is not available (BIII)." },
    { claim: "Empirical antifungal therapy may be discussed", grade: "BIII", source: "agiho-2017", quote: "Empirical antifungal therapy may be discussed if it has not yet been administered for the indication of persistent febrile neutropenia [68, 83, 84] (BIII)." },
    { claim: "Surgery reserved for severe cases such as perforation", grade: "BIII", source: "agiho-2017", quote: "While a surgical consultation should be obtained at an early stage of disease evolution, surgical interventions in the neutropenic and/or thrombocytopenic patient are reserved to severe cases, e.g., patients with bowel wall perforation (BIII)." },
  ],
  sources: [
    { key: "agiho-2017", label: "Diagnosis and management of gastrointestinal complications in adult cancer patients: 2017 updated evidence-based guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society of Hematology and Medical Oncology (DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2017, url: "https://europepmc.org/article/PMC/PMC5748412", doi: "10.1007/s00277-017-3183-7", gradingScheme: "ESCMID criteria: strength of recommendation A (strongly supports use), B (moderately supports), C (marginally supports), D (supports a recommendation against use); quality of evidence I (at least one properly designed randomised controlled trial), II (well-designed non-randomised or observational studies), III (opinions of respected authorities, clinical experience, descriptive case studies or expert committee reports); printed together as 'BIII'.", read: "full-text", accessed: "2026-11-16" },
    { key: "cid-2025", label: "Epidemiology, Risk Factors, and Outcomes of Neutropenic Enterocolitis in Onco-Hematological Patients According to Chemotherapy Regimen", publisher: "Clinical Infectious Diseases", year: 2025, url: "https://europepmc.org/article/PMC/PMC13017227", doi: "10.1093/cid/ciaf134", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The AGIHO guideline dates from 2017. On 16 November 2026 Europe PMC title searches found no later edition; every graded recommendation it makes on this condition rests on level III evidence.",
    "AGIHO found no studies of adding metronidazole or vancomycin and no evidence for growth factors, and it gives no grade for how long to continue antibiotics. The authors of the 2025 cohort say management relies mainly on expert opinion and that the use of surgery is controversial.",
    "AGIHO does not state a route, dose or schedule for the antibiotics it recommends; those come from each product's label and the local febrile neutropenia policy.",
    "The 2025 cohort (Clinical Infectious Diseases; first published online in March 2025, in the 2026 volume of the journal) comes from one hospital's prospectively collected registry and was analysed retrospectively; its figures may not carry over to other centres.",
    "Children are not covered: a 2022 review of typhlitis in children with cancer (Pediatric Infectious Disease Journal) was found but could not be read. On 16 November 2026 Europe PMC held neither an abstract nor open full text for it. Paediatric oncology groups may differ.",
    "The imaging threshold for bowel wall thickening (over 4 mm across more than 30 mm, on ultrasound or CT) is a proposed definition that, as AGIHO notes, describes disease at a late stage.",
  ],
  drugs: ["cytarabine", "filgrastim", "piperacillin-tazobactam"],
  cancers: ["aml", "all-leukemia"],
  terms: ["febrile-neutropenia", "neutropenia"],
  related: ["febrile-neutropenia-first-hour"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "neutropenic-sepsis"],
});
