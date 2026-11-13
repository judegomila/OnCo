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
 */
export const neutropenicEnterocolitis = protocol({
  id: "neutropenic-enterocolitis",
  name: "Neutropenic enterocolitis (typhlitis): imaging, cultures, antibiotics and conservative care",
  aka: ["typhlitis", "NEC", "neutropenic colitis", "ileocaecal syndrome", "chemotherapy-associated bowel syndrome"],
  domain: "emergencies",
  tldr: "During intensive chemotherapy, when white cells are very low, the bowel wall can become inflamed and infected. Fever with tummy pain, diarrhoea or bloating is an emergency: ring your treatment helpline at once. In hospital it is confirmed with an ultrasound or CT scan and treated with strong antibiotics through a drip, fluids, pain relief and resting the bowel, with surgeons asked to see you.",
  simple: "Fever with tummy pain or diarrhoea while your blood count is low after chemotherapy is an emergency. Ring your cancer helpline at once.",
  summary: "Neutropenic enterocolitis complicates intensive chemotherapy, above all for acute leukaemia; AGIHO cites a pooled incidence of 5.3% in hospitalised patients with haematological cancers, aplastic anaemia or high-dose chemotherapy, and mortality from under 20% to 82%. High-dose cytarabine with anthracyclines is the main risk factor. A 2025 cohort of 178 episodes found it in 13.8% of AML induction courses and 9.5% of autologous transplants (higher with 7+3 induction and BEAM conditioning) with lower 30-day mortality than earlier reports.\n\nAGIHO 2017: proposed diagnostic criteria are fever, abdominal pain and bowel wall thickening over 4 mm across more than 30 mm on ultrasound or CT; a clinical definition (temperature 37.8 °C or more with abdominal pain and/or no bowel movement for 72 hours or more) identifies neutropenic patients at risk earlier. Imaging confirms it and excludes perforation; blood and stool cultures and a C. difficile toxin test are recommended; endoscopy is discouraged because of perforation risk. Conservative therapy (bland diet, hydration, pain control; BIII); piperacillin-tazobactam, imipenem-cilastatin or meropenem (BIII), continued until clinical signs and neutropenia resolve; no evidence on adding metronidazole or vancomycin (CIII); empirical antifungal therapy may be discussed (BIII); growth factors might be considered (BIII). Surgical consultation early; surgery reserved for severe cases such as perforation (BIII).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "surgical-team", "patient-or-carer"],
    where: ["ward", "emergency-department", "acute-oncology-service", "intensive-care", "telephone-triage"],
  },
  population: "Adults with neutropenia after intensive chemotherapy, above all for acute leukaemia or high-dose chemotherapy before autologous stem cell transplant. AGIHO's guideline covers adults; children have a separate literature (noted in gaps).",
  trigger: "Fever with abdominal pain, diarrhoea, distension or absent bowel movements in a person who is neutropenic after chemotherapy.",
  steps: [
    {
      action: "Suspect it early: a temperature of 37.8 °C or more with abdominal pain and/or no bowel movement for 72 hours or more in a neutropenic patient",
      why: "The formal definition describes late disease; this earlier clinical picture already predicts complications and death.",
      source: "agiho-2017",
      quote: "Neutropenic patients with chemotherapy-associated bowel syndrome (T ≥ 37.8 °C and abdominal pain and/or lack of bowel movement for ≥ 72 h) were more likely to suffer complications and death [27].",
    },
    {
      action: "Confirm with ultrasound or CT, looking for bowel wall thickening over 4 mm and for perforation",
      why: "Imaging shows the thickened bowel and whether it has burst, which changes treatment.",
      source: "agiho-2017",
      quote: "Non-invasive imaging is generally recommended to confirm the diagnosis of NEC and to exclude bowel wall perforation.",
    },
    {
      action: "Send blood cultures, stool cultures and a C. difficile toxin test",
      why: "Bacteria often enter the blood from the damaged bowel, and C. difficile colitis looks similar but is treated differently.",
      source: "agiho-2017",
      quote: "Blood cultures, stool cultures, and a C. difficile toxin test for exclusion of NEC-associated bacteremia and colitis due to C. difficile, respectively, are recommended.",
    },
    {
      action: "Do not do endoscopy to take biopsies",
      why: "The inflamed bowel wall can tear.",
      source: "agiho-2017",
      quote: "Endoscopy to obtain biopsies is discouraged, due to the increased risk of bowel wall perforation.",
    },
    {
      action: "Treat conservatively in most cases: bland diet, hydration and effective pain relief",
      why: "Most episodes settle as the blood count recovers, if the person is supported until then.",
      source: "agiho-2017",
      quote: "Conservative therapy is preferred in most cases, consisting of a bland diet, hydration, and an effective pain treatment (BIII).",
      grade: "BIII",
    },
    {
      action: "Give piperacillin-tazobactam, imipenem-cilastatin or meropenem, and continue until clinical signs and neutropenia have resolved",
      why: "These broad antibiotics cover the gut bacteria, Gram-negative Enterobacteriaceae above all, most often found in the blood in this condition.",
      source: "agiho-2017",
      quote: "Antimicrobial therapy should be administered until resolution of clinical signs and neutropenia.",
      grade: "BIII",
    },
    {
      action: "Discuss empirical antifungal treatment if it has not already been started for persistent neutropenic fever",
      why: "Fungal infection is found in a minority of cases and is easily missed.",
      source: "agiho-2017",
      quote: "Empirical antifungal therapy may be discussed if it has not yet been administered for the indication of persistent febrile neutropenia [68, 83, 84] (BIII).",
      grade: "BIII",
    },
    {
      action: "Ask surgeons to see the person early, but keep operations for severe cases such as perforation",
      why: "Surgery while the blood count is low is risky, so it is reserved for when the bowel has burst or is failing.",
      source: "agiho-2017",
      quote: "While a surgical consultation should be obtained at an early stage of disease evolution, surgical interventions in the neutropenic and/or thrombocytopenic patient are reserved to severe cases, e.g., patients with bowel wall perforation (BIII).",
      grade: "BIII",
    },
  ],
  bestInClass: {
    statement: "The AGIHO/DGHO 2017 update is the only guideline read that addresses neutropenic enterocolitis directly; every recommendation it makes is grade B or C on level III evidence (expert opinion), because there are no trials. Its approach: early recognition, imaging to confirm and exclude perforation, cultures and a C. difficile test, no endoscopy, conservative care, piperacillin-tazobactam or a carbapenem until the neutropenia recovers, antifungal therapy considered, and early surgical review with surgery kept for perforation. Newer cohort data (Clinical Infectious Diseases 2025) refine who is at risk (7+3 AML induction, high-dose steroids, high blast counts, azacitidine, BEAM conditioning) but do not change management.",
    sources: ["agiho-2017", "cid-2025"],
  },
  variants: [
    {
      name: "Adding metronidazole or vancomycin to the beta-lactam",
      differs: "Adds metronidazole for extra anaerobic cover, or vancomycin, to piperacillin-tazobactam or a carbapenem.",
      evidence: "AGIHO found no studies of their effect on outcome and grades the question CIII.",
      sources: ["agiho-2017"],
    },
    {
      name: "Granulocyte colony-stimulating factor",
      differs: "Gives G-CSF to speed recovery of the neutrophil count.",
      evidence: "AGIHO: might be considered, though corresponding evidence is not available (BIII).",
      sources: ["agiho-2017"],
    },
  ],
  grades: [
    { claim: "Conservative therapy: bland diet, hydration, pain control", grade: "BIII", source: "agiho-2017" },
    { claim: "Piperacillin-tazobactam, imipenem-cilastatin or meropenem", grade: "BIII", source: "agiho-2017", quote: "In accordance with IDSA guidelines for patients with complicated abdominal infections in non-neutropenic patients [81] and the guideline for antimicrobial therapy of unexplained fever in neutropenic patients of the AGIHO [82], we recommend administration of piperacillin/tazobactam or imipenem/cilastatin or meropenem (BIII)." },
    { claim: "Additional metronidazole or vancomycin", grade: "CIII", source: "agiho-2017", quote: "There are no studies assessing the effect of additional metronidazole or vancomycin on patient outcome (CIII)." },
    { claim: "Haematopoietic growth factors", grade: "BIII", source: "agiho-2017", quote: "The use of hematopoietic growth factors might be considered, even though corresponding evidence is not available (BIII)." },
    { claim: "Surgery reserved for severe cases such as perforation", grade: "BIII", source: "agiho-2017" },
  ],
  sources: [
    { key: "agiho-2017", label: "Diagnosis and management of gastrointestinal complications in adult cancer patients: 2017 updated evidence-based guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society of Hematology and Medical Oncology (DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2017, url: "https://europepmc.org/article/PMC/PMC5748412", doi: "10.1007/s00277-017-3183-7", gradingScheme: "ESCMID criteria: strength of recommendation A (strongly supports) to D (supports a recommendation against), quality of evidence I (randomised trial) to III (expert opinion), printed together as 'BIII'.", read: "full-text", accessed: "2026-11-11" },
    { key: "cid-2025", label: "Epidemiology, Risk Factors, and Outcomes of Neutropenic Enterocolitis in Onco-Hematological Patients According to Chemotherapy Regimen", publisher: "Clinical Infectious Diseases", year: 2025, url: "https://europepmc.org/abstract/MED/40112243", doi: "10.1093/cid/ciaf134", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The AGIHO guideline dates from 2017 and no later edition was found; every recommendation in it rests on level III evidence.",
    "No randomised trial has tested any treatment for neutropenic enterocolitis, including the choice and duration of antibiotics or the timing of surgery.",
    "Children are not covered: a 2022 review of typhlitis in children with cancer (Pediatric Infectious Disease Journal) was found but not read, and paediatric oncology groups may differ.",
    "The ultrasound threshold for bowel wall thickening (over 4 mm across more than 30 mm) is a proposed definition that, as AGIHO notes, describes disease at a late stage.",
  ],
  drugs: ["cytarabine", "filgrastim", "piperacillin-tazobactam"],
  cancers: ["aml", "all-leukemia"],
  terms: ["febrile-neutropenia", "neutropenia"],
  related: ["febrile-neutropenia-first-hour"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "neutropenic-sepsis"],
});
