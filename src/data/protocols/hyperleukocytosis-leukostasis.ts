import { protocol } from "./helpers";

/*
 * Hyperleukocytosis and leukostasis in acute leukaemia: recognition, supportive care, cytoreduction and the place of
 * leukapheresis.
 *
 * No graded guideline on this subject could be read. What was read, and how (11 November 2026, fetched raw and read
 * as text):
 * - Pais, Spring and Hayes, "Management of Leukostasis in Acute Myeloid Leukemia" (ATS Scholar, December 2025): a short
 *   open-access teaching article, full text from Europe PMC (PMC12712836).
 * - Journal of Hospital Medicine 2026 review, a 2026 systematic review and meta-analysis of leukapheresis (Expert
 *   Review of Hematology), and a 2024 Blood report on red cell exchange: abstracts from Europe PMC.
 * - ASFA tenth edition (Journal of Clinical Apheresis 2026), which categorises leukocytapheresis for hyperleukocytosis:
 *   abstract only. Europe PMC returned a server error for the full text and NCBI says the publisher does not allow
 *   download, so its category and grade are not stated here.
 * - ELN 2019 recommendations on acute promyelocytic leukaemia: abstract only (full text not released).
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const hyperleukocytosisLeukostasis = protocol({
  id: "hyperleukocytosis-leukostasis",
  name: "Hyperleukocytosis and leukostasis in acute leukaemia: supportive care, cytoreduction and leukapheresis",
  aka: ["leukostasis", "hyperleukocytosis", "white cell count over 100", "leukapheresis for AML", "leukoreduction"],
  domain: "emergencies",
  tldr: "In some leukaemias the white cell count is so high that the blood thickens and blocks small vessels in the lungs, brain and kidneys. This leukostasis is an emergency. The cells are brought down quickly with hydroxyurea and then chemotherapy; sometimes a machine filters them out. Blood transfusions are avoided unless really needed, because they thicken the blood further.",
  simple: "A very high white cell count in leukaemia can block small blood vessels. Breathlessness, confusion or a bad headache need urgent hospital care.",
  summary: "Hyperleukocytosis is a white cell count above 100,000/µL from leukaemic proliferation; leukostasis is end-organ injury from it, which can occur at lower counts and is commoner in AML than ALL because myeloid blasts are larger (ATS Scholar 2025). The lungs, kidneys and brain are most affected; intracranial haemorrhage is the most feared complication. Tumour lysis syndrome (up to 10%) and DIC (30 to 40%) accompany it. Diagnosis is usually presumptive. There should be a low threshold for intensive care.\n\nSupportive care: fluids with close fluid-balance monitoring, electrolytes and uric acid at least every 6 hours, allopurinol or rasburicase, red cell transfusion only for symptomatic anaemia because it raises viscosity, and prompt platelets, plasma and fibrinogen for DIC. Cytoreduction: hydroxyurea before induction chemotherapy; all-trans retinoic acid at once if acute promyelocytic leukaemia is suspected. Leukapheresis can be considered but is institution-specific; a 2026 meta-analysis of 13 retrospective studies (1406 patients in the main analysis) found no clear reduction in 30-day mortality (OR 0.94, 95% CI 0.65 to 1.34; very low certainty). Red cell exchange is reported as an alternative for rapid leukoreduction (Blood 2024). ASFA's tenth edition (2026) categorises leukocytapheresis, but its category could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["emergency-department", "ward", "intensive-care"],
  },
  population: "Adults with acute leukaemia, above all acute myeloid leukaemia, and a very high white cell count, with or without signs of organ injury. Chronic leukaemias and children are mentioned by the sources but not covered here.",
  trigger: "A white cell count above 100,000/µL in suspected or known acute leukaemia, or breathlessness, low oxygen, confusion, headache, visual change or kidney injury with a high blast count.",
  steps: [
    {
      action: "Treat leukostasis as an emergency, with a low threshold for intensive care",
      why: "People can deteriorate quickly, with breathing failure or bleeding in the brain.",
      source: "ats-2025",
      quote: "These patients may experience rapid decompensation, and there should be a low threshold to admit them to an intensive care unit (Figure 1).",
    },
    {
      action: "Do not wait for a count above 100,000/µL: suspect leukostasis from organ symptoms in a person with a high blast count",
      why: "Organ damage can happen at lower counts, and the diagnosis is usually made on clinical grounds.",
      source: "ats-2025",
      quote: "Leukostasis is a clinical emergency characterized by end-organ injury from malignant hyperleukocytosis but can also occur at WBC counts <100,000/μl (2).",
    },
    {
      action: "Give intravenous fluids while watching fluid balance closely",
      why: "Fluids dilute the blood and protect the kidneys, but too much can worsen breathing.",
      source: "ats-2025",
      quote: "Although vigorous fluid administration can reduce WBC concentration and blood viscosity and mitigate consequences of TLS, it has a potential to cause volume overload and exacerbate respiratory impairment, so close monitoring of fluid balance is important.",
    },
    {
      action: "Check electrolytes and uric acid at least every 6 hours, and give allopurinol or rasburicase",
      why: "Leukaemia cells breaking down release potassium, phosphate and uric acid that can damage the kidneys and heart.",
      source: "ats-2025",
      quote: "Given the high risk of TLS, frequent electrolyte and uric acid monitoring (at least every 6 h) is needed.",
    },
    {
      action: "Avoid red cell transfusion unless anaemia is causing symptoms",
      why: "Adding red cells makes thick blood thicker and can worsen the blockage.",
      source: "ats-2025",
      quote: "Blood transfusions should be avoided unless the patient has symptomatic anemia because increased blood viscosity can worsen leukostasis.",
    },
    {
      action: "If DIC is suspected, give platelets, fresh frozen plasma and fibrinogen promptly",
      why: "Clotting failure is common and, with leukostasis, raises the risk of bleeding in the brain.",
      source: "ats-2025",
      quote: "DIC is common, and treatment with platelets, fresh frozen plasma, and fibrinogen should be promptly initiated if this is suspected.",
    },
    {
      action: "Lower the count with hydroxyurea before induction chemotherapy, and start all-trans retinoic acid at once if acute promyelocytic leukaemia is suspected",
      why: "Bringing the count down quickly relieves the blockage; promyelocytic leukaemia needs its own urgent treatment.",
      source: "ats-2025",
      quote: "If acute promyelocytic leukemia is suspected, all-trans retinoic acid should be initiated immediately to induce differentiation (1).",
    },
    {
      action: "Consider leukapheresis case by case, weighing procedural risks, especially in promyelocytic leukaemia",
      why: "Filtering the white cells out works quickly, but it has not been shown to save lives and practice differs between hospitals.",
      source: "ats-2025",
      quote: "Additionally, the beneficial effect on early clinical outcomes with leukapheresis has not been definitively demonstrated (2).",
    },
  ],
  bestInClass: {
    statement: "No graded guideline on hyperleukocytosis could be read for this page. The sources read agree on supportive care (fluids with care, tumour lysis prophylaxis, avoiding unnecessary red cell transfusion, correcting DIC) and on rapid cytoreduction with hydroxyurea and then induction chemotherapy, with ATRA at once for suspected promyelocytic leukaemia. They disagree, or are uncertain, about leukapheresis: the ATS Scholar article and the Journal of Hospital Medicine review describe it as optional and institution-dependent, and the 2026 meta-analysis of 13 retrospective studies found no clear effect on 30-day mortality, at very low certainty. ASFA (2026) gives the formal apheresis category but could not be read.",
    sources: ["ats-2025", "jhm-2026", "leukapheresis-ma-2026", "asfa-2026"],
  },
  variants: [
    {
      name: "Routine leukapheresis for hyperleukocytosis",
      differs: "Removes leukaemic cells by apheresis as soon as the count is very high or leukostasis is suspected, alongside cytoreduction.",
      evidence: "2026 meta-analysis: 13 retrospective comparative studies; 30-day mortality OR 0.94 (95% CI 0.65 to 1.34), most studies at serious risk of bias, certainty very low, with confounding by indication.",
      sources: ["leukapheresis-ma-2026"],
    },
    {
      name: "Red cell exchange instead of leukapheresis",
      differs: "Uses red cell exchange to remove white cells, which can also correct severe anaemia without raising viscosity.",
      evidence: "Blood 2024: similar leukoreduction to standard therapeutic leukoreduction, possibly better in severe anaemia, monocytic leukaemias or when rapid treatment is needed. Read as an abstract only.",
      sources: ["rce-2024"],
    },
    {
      name: "Cytarabine as an early cytoreductive agent",
      differs: "Uses cytarabine as well as hydroxyurea to bring the count down until definitive treatment starts.",
      evidence: "Named in the Journal of Hospital Medicine 2026 review abstract; no comparative data read.",
      sources: ["jhm-2026"],
    },
  ],
  grades: [
    { claim: "Leukapheresis and 30-day mortality in AML with hyperleukocytosis", grade: "GRADE: very low certainty", source: "leukapheresis-ma-2026", quote: "Most studies were at serious risk of bias, and certainty of evidence was very low." },
  ],
  sources: [
    { key: "ats-2025", label: "Management of Leukostasis in Acute Myeloid Leukemia", publisher: "ATS Scholar (American Thoracic Society)", year: 2025, url: "https://europepmc.org/article/PMC/PMC12712836", doi: "10.34197/ats-scholar.2025-0039OT", gradingScheme: "A short teaching article; not a graded guideline.", read: "full-text", accessed: "2026-11-11" },
    { key: "jhm-2026", label: "Approach to hyperleukocytosis and leukostasis-inpatient management strategies", publisher: "Journal of Hospital Medicine", year: 2026, url: "https://europepmc.org/abstract/MED/41058090", doi: "10.1002/jhm.70199", read: "abstract", accessed: "2026-11-11" },
    { key: "leukapheresis-ma-2026", label: "Leukapheresis versus no leukapheresis for hyperleukocytosis in acute myeloid leukemia: an updated systematic review and meta-analysis of early mortality", publisher: "Expert Review of Hematology", year: 2026, url: "https://europepmc.org/abstract/MED/42185077", doi: "10.1080/17474086.2026.2680138", gradingScheme: "GRADE certainty of evidence; ROBINS-I risk of bias.", read: "abstract", accessed: "2026-11-11" },
    { key: "rce-2024", label: "Red cell exchange for rapid leukoreduction in adults with hyperleukocytosis and leukostasis", publisher: "Blood", year: 2024, url: "https://europepmc.org/abstract/MED/38052031", doi: "10.1182/blood.2023021895", read: "abstract", accessed: "2026-11-11" },
    { key: "asfa-2026", label: "Guidelines on the Use of Therapeutic Apheresis in Clinical Practice: Evidence-Based Approach From the Writing Committee of the American Society for Apheresis, The Tenth Special Issue", publisher: "American Society for Apheresis, Journal of Clinical Apheresis", year: 2026, url: "https://europepmc.org/abstract/MED/42747330", doi: "10.1002/jca.70141", gradingScheme: "Each indication carries an ASFA category and a grade; the abstract read describes 183 graded and categorised indications but gives none of them.", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "No graded guideline on hyperleukocytosis or leukostasis was read. The ASFA tenth edition (2026) categorises leukocytapheresis, but only its abstract could be read; the ELN 2022 AML and 2019 APL recommendations were not read in full.",
    "The steps rest mainly on a short teaching article (ATS Scholar 2025) that cites reviews; they describe common practice rather than graded recommendations.",
    "The white cell count at which to start cytoreduction or apheresis, and the hydroxyurea dose, are not set by any source read here.",
    "Leukapheresis has never been tested in a randomised trial; the meta-analysis is of retrospective studies with confounding by indication.",
    "Leukostasis in chronic leukaemias and in children is not covered.",
  ],
  drugs: ["hydroxyurea", "tretinoin-atra", "allopurinol", "rasburicase", "cytarabine"],
  cancers: ["aml", "all-leukemia", "leukaemia"],
  terms: ["apheresis", "tumor-lysis-syndrome"],
  related: ["tumour-lysis-syndrome-prevention-and-treatment"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "haematology"],
});
