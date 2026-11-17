import { protocol } from "./helpers";

/*
 * Hyperleukocytosis and leukostasis in acute leukaemia: recognition, supportive care, cytoreduction and the place of
 * leukapheresis.
 *
 * First written 11 November 2026 from one full text and four abstracts. Second accuracy pass, 16 November 2026: every
 * source fetched again raw and every claim read against it.
 * - Pais, Spring and Hayes, "Management of Leukostasis in Acute Myeloid Leukemia" (ATS Scholar, December 2025): full
 *   text as XML from the Europe PMC REST service (PMC12712836). Its Figure 1 is an image and was refused (403), so
 *   nothing rests on it.
 * - ASFA tenth edition (Journal of Clinical Apheresis 2026, PMC13580465), the 2024 Blood report on red cell exchange
 *   (PMC13122304) and the ELN 2019 recommendations on acute promyelocytic leukaemia (PMC6509567): Europe PMC's
 *   full-text service returned a server error for each, and each was then read in full as plain HTML from PubMed
 *   Central (pmc.ncbi.nlm.nih.gov/articles/<PMCID>/, fetched with curl and stripped to text by script).
 * - Journal of Hospital Medicine 2026 review and the 2026 meta-analysis of leukapheresis (Expert Review of
 *   Hematology): abstracts from the Europe PMC search service. The ELN 2022 AML recommendations were not read.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Every quote was checked by script
 * against the fetched text (whitespace only normalised).
 *
 * What the pass changed: steps and summary were brought back to the strength of the ATS Scholar wording ("can be
 * used", "if suspected", "depending on uric acid level and institution guidelines"), and symptoms and reasons its text
 * does not state were removed. ASFA's fact sheet, now read, prints leukocytapheresis for hyperleukocytosis as Category
 * III, Grade 2B, one indication with no split by symptoms. Two steps were added: ASFA's that arranging apheresis should
 * not delay chemotherapy, and the ELN's recommendation 1.11 that leukapheresis be avoided in promyelocytic leukaemia
 * (printed III, en dash, B). The red cell exchange variant was rewritten from the full letter with its numbers.
 */
export const hyperleukocytosisLeukostasis = protocol({
  id: "hyperleukocytosis-leukostasis",
  name: "Hyperleukocytosis and leukostasis in acute leukaemia: supportive care, cytoreduction and leukapheresis",
  aka: ["leukostasis", "hyperleukocytosis", "white cell count over 100", "leukapheresis for AML", "leukoreduction"],
  domain: "emergencies",
  tldr: "In some leukaemias the white cell count is so high that the blood thickens and blocks small vessels in the lungs, brain and kidneys. This leukostasis is an emergency. The count is brought down, often with hydroxyurea and then chemotherapy; sometimes a machine filters them out. Blood transfusions are avoided unless anaemia is causing symptoms, because they thicken the blood further.",
  simple: "A very high white cell count in leukaemia can block small blood vessels in the lungs, kidneys and brain. It is an emergency and is treated in hospital.",
  summary: "Hyperleukocytosis is a white cell count above 100,000/µL from leukaemic proliferation; leukostasis is end-organ injury from it, which can occur at lower counts and is commoner in AML than ALL, in part because of the size of myeloid blasts (ATS Scholar 2025). The small vessels of the lungs, kidneys and brain are commonly affected; intracranial haemorrhage is the most feared complication. Tumour lysis syndrome and DIC are seen in as many as 10% and 30 to 40% of cases of hyperleukocytosis. Diagnosis is usually presumptive. There should be a low threshold for intensive care.\n\nSupportive care: fluids with close fluid-balance monitoring, electrolytes and uric acid at least every 6 hours, allopurinol or rasburicase for high uric acid (the choice depending on the uric acid level and local guidelines), blood transfusion only for symptomatic anaemia because it raises viscosity, and prompt platelets, fresh frozen plasma and fibrinogen if DIC is suspected. Cytoreduction: hydroxyurea can be used before induction chemotherapy in eligible patients; all-trans retinoic acid immediately if acute promyelocytic leukaemia is suspected. Leukapheresis can be considered but is often institution-specific; a 2026 meta-analysis of 13 retrospective studies (10 of them, with 1,406 patients, in the main analysis) found no clear reduction in 30-day mortality (OR 0.94, 95% CI 0.65 to 1.34; very low certainty). ASFA's tenth edition (2026) lists leukocytapheresis for hyperleukocytosis as Category III (optimum role not established, decisions individualised), Grade 2B, notes that no randomised trial has been done, and says arranging it should not delay definitive chemotherapy; a single procedure can lower the count by 30 to 60%. For acute promyelocytic leukaemia the ELN (2019) says leukapheresis should be avoided because of the risk of fatal haemorrhage (III-B). A 2024 single-centre report in Blood found that red cell exchange gave comparable leukoreduction to leukocytapheresis as first-line treatment while raising the haematocrit.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["emergency-department", "ward", "intensive-care"],
  },
  population: "Adults with acute leukaemia, above all acute myeloid leukaemia, and a very high white cell count, with or without signs of organ injury. Chronic leukaemias and children are discussed by ASFA and are not covered here.",
  trigger: "A white cell count above 100,000/µL from leukaemia, or signs of injury to the lungs, kidneys or brain in a person with leukaemia and a high white cell count, which can be below that figure.",
  steps: [
    {
      action: "Treat leukostasis as an emergency, with a low threshold for intensive care",
      why: "People with leukostasis can get worse quickly, so close watching matters.",
      source: "ats-2025",
      quote: "These patients may experience rapid decompensation, and there should be a low threshold to admit them to an intensive care unit (Figure 1).",
    },
    {
      action: "Suspect leukostasis from the leukaemia and the clinical findings, even when the count is below 100,000/µL",
      why: "Organ injury can happen at lower counts, and the diagnosis is most often a presumptive one made from the underlying leukaemia and the clinical picture.",
      source: "ats-2025",
      quote: "Leukostasis is a clinical emergency characterized by end-organ injury from malignant hyperleukocytosis but can also occur at WBC counts <100,000/μl (2).",
    },
    {
      action: "Give intravenous fluids while watching fluid balance closely",
      why: "Fluids can thin the blood and lessen the effects of tumour lysis, but too much can overload the body and worsen breathing.",
      source: "ats-2025",
      quote: "Although vigorous fluid administration can reduce WBC concentration and blood viscosity and mitigate consequences of TLS, it has a potential to cause volume overload and exacerbate respiratory impairment, so close monitoring of fluid balance is important.",
    },
    {
      action: "Check electrolytes and uric acid at least every 6 hours, and treat a high uric acid with allopurinol or rasburicase",
      why: "The risk of tumour lysis syndrome, in which leukaemia cells break down, is high. Which uric acid medicine is used depends on the uric acid level and the hospital's own guidelines.",
      source: "ats-2025",
      quote: "Given the high risk of TLS, frequent electrolyte and uric acid monitoring (at least every 6 h) is needed.",
    },
    {
      action: "Avoid blood transfusion unless anaemia is causing symptoms",
      why: "Transfusion makes thick blood thicker, which can worsen leukostasis.",
      source: "ats-2025",
      quote: "Blood transfusions should be avoided unless the patient has symptomatic anemia because increased blood viscosity can worsen leukostasis.",
    },
    {
      action: "If DIC is suspected, give platelets, fresh frozen plasma and fibrinogen promptly",
      why: "This clotting problem is common in hyperleukocytosis, and the source asks for treatment to start promptly once it is suspected.",
      source: "ats-2025",
      quote: "DIC is common, and treatment with platelets, fresh frozen plasma, and fibrinogen should be promptly initiated if this is suspected.",
    },
    {
      action: "Lower the count before induction chemotherapy, for which hydroxyurea can be used, and start all-trans retinoic acid immediately if acute promyelocytic leukaemia is suspected",
      why: "Treatment aims to reduce the number of leukaemia cells in the blood. In promyelocytic leukaemia, all-trans retinoic acid makes the leukaemia cells mature.",
      source: "ats-2025",
      quote: "If acute promyelocytic leukemia is suspected, all-trans retinoic acid should be initiated immediately to induce differentiation (1).",
    },
    {
      action: "Consider leukapheresis, weighing the risks of the procedure and its effects on the circulation, particularly in promyelocytic leukaemia",
      why: "Removing the white cells by machine is rapid, but a benefit for early outcomes has not been definitively shown and its use often depends on the hospital.",
      source: "ats-2025",
      quote: "Additionally, the beneficial effect on early clinical outcomes with leukapheresis has not been definitively demonstrated (2).",
    },
    {
      action: "If leukapheresis is arranged, do not let it delay the start of chemotherapy",
      why: "Chemotherapy is the definitive way of bringing the count down, and waiting for the machine should not hold it up.",
      source: "asfa-2026",
      quote: "Arranging leukocytapheresis should not delay the start of definitive cytoreductive chemotherapy.",
    },
    {
      action: "Avoid leukapheresis in acute promyelocytic leukaemia",
      why: "In this type of leukaemia, where the guideline counts a white cell count above 10 × 10⁹/L as high, the procedure risks setting off fatal bleeding.",
      source: "eln-apl-2019",
      quote: "Leukapheresis should be avoided due to risk of precipitating fatal hemorrhage",
      grade: "III–B",
    },
  ],
  bestInClass: {
    statement: "The only graded statements read are ASFA's (2026), which puts leukocytapheresis for hyperleukocytosis in Category III (optimum role not established; decision making individualised) at Grade 2B and says it should not delay chemotherapy, and the ELN's for acute promyelocytic leukaemia (2019): ATRA immediately when the diagnosis is suspected (Ib-A) and no leukapheresis (III-B). For the rest of care there is no graded guideline among the sources read. The ATS Scholar article (2025) sets out supportive care (fluids with close fluid-balance monitoring, electrolyte and uric acid checks at least every 6 hours, allopurinol or rasburicase for high uric acid, no blood transfusion unless anaemia is symptomatic, prompt treatment of suspected DIC) and cytoreduction, for which hydroxyurea can be used before induction chemotherapy, with ATRA immediately for suspected promyelocytic leukaemia. The abstract of the Journal of Hospital Medicine review agrees on intravenous hydration, uric acid-lowering agents, cautious transfusion and hydroxyurea, and adds cytarabine. Leukapheresis is uncertain: the ATS Scholar article says it can be considered and is often institution-specific, the Journal of Hospital Medicine abstract calls its role controversial, and the 2026 meta-analysis of 13 retrospective studies found no clear association with lower 30-day mortality, at very low certainty. ASFA itself reports that the ELN does not recommend leukocytapheresis in AML, citing the ELN's earlier AML recommendations, which were not read here.",
    sources: ["asfa-2026", "eln-apl-2019", "ats-2025", "jhm-2026", "leukapheresis-ma-2026"],
  },
  variants: [
    {
      name: "Routine leukapheresis for hyperleukocytosis",
      differs: "Uses leukapheresis for rapid cytoreduction in adults with AML and hyperleukocytosis.",
      evidence: "2026 meta-analysis: 13 retrospective comparative studies, 10 of which (1,406 patients) gave the main analysis; 30-day mortality OR 0.94 (95% CI 0.65 to 1.34), only one study with an adjusted estimate, most studies at serious risk of bias, certainty very low, with confounding by indication named as a major limitation (read as an abstract only). ASFA 2026: Category III, Grade 2B; no randomised trials; a single procedure can reduce the white cell count by 30 to 60%; in AML it is stopped when leukostasis symptoms resolve or the count falls below 50 × 10⁹/L.",
      sources: ["leukapheresis-ma-2026", "asfa-2026"],
    },
    {
      name: "Red cell exchange instead of leukapheresis",
      differs: "Uses automated red cell exchange, rather than leukocytapheresis, to lower the white cell count; it raises the haematocrit at the same time, so it suits people too anaemic for standard apheresis.",
      evidence: "Blood 2024, a retrospective review at one hospital from 2017 to 2023: 61 patients had leukocytapheresis alone, 11 had it followed by red cell exchange and 5 had red cell exchange alone. The authors conclude that red cell exchange gives comparable leukoreduction as first-line treatment and superior leukoreduction when leukocytapheresis fails; the haematocrit was deliberately raised in 14 of 16 patients, by a median of 12%. They call the study small and heterogeneous and say a randomised trial is needed. ASFA 2026 notes red cell exchange as a reported alternative.",
      sources: ["rce-2024", "asfa-2026"],
    },
    {
      name: "Cytarabine as an early cytoreductive agent",
      differs: "Uses cytarabine as well as hydroxyurea as a cytoreductive agent until a definitive diagnosis and management are started.",
      evidence: "Named in the Journal of Hospital Medicine 2026 review abstract; no comparative data read.",
      sources: ["jhm-2026"],
    },
  ],
  grades: [
    { claim: "Leukocytapheresis for hyperleukocytosis (one indication, not divided by symptoms)", grade: "Category III, Grade 2B", source: "asfa-2026", quote: "No randomized trials have been performed to formally assess safety and efficacy." },
    { claim: "Leukapheresis in acute promyelocytic leukaemia with a high white cell count at presentation", grade: "III–B", source: "eln-apl-2019", quote: "Leukapheresis should be avoided due to risk of precipitating fatal hemorrhage" },
    { claim: "ATRA when acute promyelocytic leukaemia is suspected", grade: "Ib–A", source: "eln-apl-2019", quote: "Treatment with ATRA should be started immediately when a diagnosis of APL is suspected" },
    { claim: "Leukapheresis and 30-day mortality in AML with hyperleukocytosis", grade: "GRADE: very low certainty", source: "leukapheresis-ma-2026", quote: "Most studies were at serious risk of bias, and certainty of evidence was very low." },
  ],
  sources: [
    { key: "ats-2025", label: "Management of Leukostasis in Acute Myeloid Leukemia", publisher: "ATS Scholar (American Thoracic Society)", year: 2025, url: "https://europepmc.org/article/PMC/PMC12712836", doi: "10.34197/ats-scholar.2025-0039OT", gradingScheme: "A short teaching article; not a graded guideline.", read: "full-text", accessed: "2026-11-16" },
    { key: "jhm-2026", label: "Approach to hyperleukocytosis and leukostasis-inpatient management strategies", publisher: "Journal of Hospital Medicine", year: 2026, url: "https://europepmc.org/abstract/MED/41058090", doi: "10.1002/jhm.70199", read: "abstract", accessed: "2026-11-16" },
    { key: "leukapheresis-ma-2026", label: "Leukapheresis versus no leukapheresis for hyperleukocytosis in acute myeloid leukemia: an updated systematic review and meta-analysis of early mortality", publisher: "Expert Review of Hematology", year: 2026, url: "https://europepmc.org/abstract/MED/42185077", doi: "10.1080/17474086.2026.2680138", gradingScheme: "GRADE certainty of evidence; ROBINS-I risk of bias.", read: "abstract", accessed: "2026-11-16" },
    { key: "rce-2024", label: "Red cell exchange for rapid leukoreduction in adults with hyperleukocytosis and leukostasis", publisher: "Blood", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13122304/", doi: "10.1182/blood.2023021895", gradingScheme: "A research letter reporting a retrospective chart review; not a guideline.", read: "full-text", accessed: "2026-11-16" },
    { key: "asfa-2026", label: "Guidelines on the Use of Therapeutic Apheresis in Clinical Practice-Evidence-Based Approach From the Writing Committee of the American Society for Apheresis: The Tenth Special Issue", publisher: "American Society for Apheresis, Journal of Clinical Apheresis", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13580465/", doi: "10.1002/jca.70141", gradingScheme: "Each indication carries a category (I first-line, II second-line, III optimum role not established and decisions individualised, IV ineffective or harmful) and a GRADE-style grade from 1A to 2C; 2B is a weak recommendation on moderate-quality evidence.", read: "full-text", accessed: "2026-11-16" },
    { key: "eln-apl-2019", label: "Management of acute promyelocytic leukemia: updated recommendations from an expert panel of the European LeukemiaNet", publisher: "European LeukemiaNet, Blood", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6509567/", doi: "10.1182/blood-2019-01-894980", gradingScheme: "Level of evidence (Ia to IV) then grade of recommendation (A to C), printed together, for example III–B: level III is well-designed non-experimental descriptive studies, grade B is well-conducted clinical studies without a randomised trial.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The only graded statements here are ASFA's on leukocytapheresis and the ELN's on acute promyelocytic leukaemia; supportive care and cytoreduction rest on ungraded sources. The ELN 2022 AML recommendations were not read: no open full text was found. ASFA says the ELN does not recommend leukocytapheresis, citing an earlier ELN paper (Döhner, 2016), and that statement was not checked against the ELN itself.",
    "On 16 November 2026 the ASFA tenth edition, the Blood 2024 report on red cell exchange and the ELN 2019 APL recommendations were read in full as HTML from PubMed Central, after Europe PMC's full-text service returned a server error for each. The Journal of Hospital Medicine review and the 2026 meta-analysis were read as abstracts only.",
    "The ELN APL recommendations define a high white cell count as above 10 × 10⁹/L, far below the 100 × 10⁹/L used elsewhere on this page, so their advice applies to promyelocytic leukaemia only.",
    "Figure 1 of the ATS Scholar article, which sets out its management scheme, is an image and could not be fetched, so any dose or detail given only there is not on this page.",
    "The steps rest mainly on a short teaching article (ATS Scholar 2025) that cites reviews; they describe common practice rather than graded recommendations.",
    "The white cell count at which to start cytoreduction or apheresis is not set by any source read here; ASFA gives only the counts at which to stop apheresis. No source read gives a hydroxyurea dose for this use outside promyelocytic leukaemia.",
    "Leukapheresis has not been tested in a randomised trial (ASFA 2026); the 2026 meta-analysis is of 13 retrospective studies, and its authors name confounding by indication as a major limitation.",
    "Leukostasis in chronic leukaemias and in children is not covered.",
    "The Journal of Hospital Medicine review was published online on 7 October 2025 and printed in the May 2026 issue; it is dated 2026 here.",
  ],
  drugs: ["hydroxyurea", "tretinoin-atra", "allopurinol", "rasburicase", "cytarabine"],
  cancers: ["aml", "all-leukemia", "leukaemia"],
  terms: ["apheresis", "tumor-lysis-syndrome"],
  related: ["tumour-lysis-syndrome-prevention-and-treatment"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "haematology"],
});
