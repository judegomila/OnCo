import { protocol } from "./helpers";

/*
 * Adjusting anticancer drug doses for reduced liver function in adults: how liver function is classified and where the
 * dose recommendation comes from.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - US FDA draft guidance for industry, Pharmacokinetics in Patients with Impaired Hepatic Function: Study Design, Data
 *   Analysis, and Impact on Dosage (September 2026; it withdraws the May 2003 guidance): full text, PDF from fda.gov. A
 *   draft, 'not for implementation', written for drug developers; it sets which classification labels use. Line numbers
 *   printed in its margin, and a page footer that splits one quoted sentence, were stripped before quotes were checked.
 * - Elmeliegy et al., Discordance between Child-Pugh and NCI classifications for hepatic dysfunction (J Clin Pharmacol
 *   2021, DOI 10.1002/jcph.1702, PMC7754409): full text, Europe PMC XML.
 * - Yang et al., FDA oncology approvals and hepatic impairment dosing (Clin Pharmacol Ther 2022, DOI 10.1002/cpt.2505,
 *   PMC9540487): full text, Europe PMC XML.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (June 2025): full
 *   text, PDF.
 * - US prescribing information for Imbruvica (ibrutinib; DailyMed set id 0dfd0279-ff17-4ea9-89be-9803c71bab44): full
 *   text, used as a worked example of a Child-Pugh-based label.
 * - Krens et al., Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update
 *   (Lancet Oncol 2023, DOI 10.1016/S1470-2045(23)00216-4): not reachable (paywalled, no abstract in Europe PMC). No
 *   international consensus on hepatic dosing of anticancer drugs, comparable to ADDIKD for the kidney, was found.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const hepaticDoseAdjustmentOfAnticancerDrugs = protocol({
  id: "hepatic-dose-adjustment-of-anticancer-drugs",
  name: "Hepatic dose adjustment of anticancer drugs in reduced liver function",
  aka: ["liver impairment chemotherapy dosing", "hepatic impairment dose reduction", "Child-Pugh dosing", "NCI Organ Dysfunction Working Group criteria", "NCI ODWG", "chemotherapy and raised bilirubin", "liver metastases dose adjustment"],
  domain: "pharmacy",
  tldr: "Many cancer drugs are broken down by the liver, so if your liver is not working well the dose may need lowering or a different drug may be safer. Your liver blood tests are checked before each cycle, and the team follows the drug's own instructions, which grade liver function in one of two ways that do not always agree.",
  simple: "Your liver blood tests are checked before each treatment. If your liver is struggling, some drugs are given at a lower dose or swapped.",
  summary: "No international consensus covers anticancer dosing in liver impairment; the dose comes from each drug's label, set from dedicated pharmacokinetic studies. Labels use one of two scales. Child-Pugh scores encephalopathy, ascites, bilirubin, albumin and prothrombin time or INR into mild (A, 5 to 6), moderate (B, 7 to 9) and severe (C, 10 to 15); the NCI Organ Dysfunction Working Group criteria use only total bilirubin and AST, in groups A (normal) to D (severe). The FDA's September 2026 draft guidance, which replaces the 2003 guidance, recommends Child-Pugh for cirrhosis, allows NCI criteria in cancer studies except hepatobiliary cancers, warns that a Child-Pugh score taken during or just after an acute event can overstate impairment, and notes non-liver causes of a raised bilirubin or INR (Gilbert's syndrome, vitamin K deficiency, anticoagulants).\n\nThe two scales disagree: across five drugs, 64.9%, 73.7% and 61.5% of people with mild, moderate and severe impairment by Child-Pugh were at least one category less impaired by NCI criteria (Elmeliegy 2021), so the clinician should apply the scale the label used. People with moderate or severe impairment are usually excluded from cancer trials, so labels often rest on studies in people without cancer and on modelling (Yang 2022). In practice, BOPA (2025) asks the pharmacist to check liver function and modify doses as the drug or regimen literature directs at each cycle. A worked example: ibrutinib for B-cell cancers is 140 mg daily in Child-Pugh A, 70 mg in Child-Pugh B, and avoided in Child-Pugh C.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "ward", "aseptic-unit"],
  },
  population: "Adults with cancer prescribed systemic anticancer drugs who have abnormal liver tests, liver metastases, cirrhosis or a primary liver or biliary cancer. Children are not covered.",
  trigger: "A new regimen is planned, or bilirubin, transaminases, albumin or INR are abnormal before a cycle.",
  steps: [
    {
      action: "Check liver function before every cycle and modify doses as the drug's or regimen's literature directs",
      why: "Liver function can change quickly with liver metastases or drug toxicity, and some drugs build up dangerously when it falls.",
      source: "bopa-2025",
      quote: "Check hepatic function and ensure drug doses are modified accordingly where appropriate as per drug/regimen literature.",
    },
    {
      action: "Find out which scale the drug's label uses for liver impairment, Child-Pugh or NCI criteria, and grade the person on that scale",
      why: "The two scales often put the same person in different categories, so using the wrong one can give the wrong dose.",
      source: "elmeliegy-2021",
      quote: "NCIc tended to classify subjects as less impaired versus Child‐Pugh (64.9%, 73.7%, and 61.5% of subjects with mild, moderate, and severe HI, respectively, via Child‐Pugh were classified as at least 1 category less impaired via NCIc).",
    },
    {
      action: "Use Child-Pugh for people with cirrhosis and for liver and biliary cancers; NCI criteria are an option in other cancers",
      why: "In cirrhosis and liver cancers, Child-Pugh captures how well the liver works better than two blood tests can.",
      source: "fda-hepatic-2026",
      quote: "FDA recommends using the Child-Pugh (CP) classification to categorize the degree of HI in subjects with cirrhosis due to chronic liver disease. In subjects with cancer, sponsors can use the National Cancer Institute (NCI) Organ Dysfunction Working Group criteria (NCI Criteria) to categorize the degree of HI, except for subjects with hepatobiliary cancers.",
    },
    {
      action: "Do not score Child-Pugh during or just after an acute event such as bleeding, infection, surgery or transfusion",
      why: "The score can be temporarily worse than the liver's usual ability to clear drugs.",
      source: "fda-hepatic-2026",
      quote: "Further, determining a CP score during or shortly after an acute event (e.g., alcohol recidivism, gastrointestinal bleed, surgery, transfusions, infections, flare of underlying liver disease) is not recommended because it may produce a higher score that may not reflect baseline drug metabolic capacity.",
    },
    {
      action: "Rule out non-liver causes of an abnormal result, such as Gilbert's syndrome for bilirubin or anticoagulants for INR",
      why: "A raised number that does not come from the liver should not cut a dose.",
      source: "fda-hepatic-2026",
      quote: "For example, Vitamin K deficiency or anti-coagulant drugs may increase INR, Gilbert’s syndrome may increase total bilirubin via unconjugated bilirubin, and intravenous fluid administration may dilute serum albumin.",
    },
    {
      action: "Apply the label's recommendation for the person's category: a reduced dose, closer monitoring, or avoiding the drug",
      why: "The label holds the only measured data on how the drug behaves when the liver is impaired.",
      source: "ibrutinib-label",
      quote: "The recommended dosage is 140 mg daily for patients with mild hepatic impairment (Child-Pugh class A). The recommended dosage is 70 mg daily for patients with moderate hepatic impairment (Child-Pugh class B). Avoid the use of IMBRUVICA in patients with severe hepatic impairment (Child-Pugh class C)",
    },
    {
      action: "Where the label has no data for moderate or severe impairment, weigh the treatment goal and alternatives with the team and monitor closely",
      why: "People with significant liver impairment are usually left out of cancer trials, so dosing is often uncertain.",
      source: "yang-2022",
      quote: "Patients with cancer and advanced hepatic impairment (HI) (i.e., moderate and severe impairment) are often excluded from first‐in‐patient, phase II, and phase III studies.",
    },
  ],
  bestInClass: {
    statement: "There is no graded or consensus guideline for anticancer dosing in liver impairment; the best-supported practice is to check liver function every cycle (BOPA 2025), grade it on the scale the drug's label used (Child-Pugh in cirrhosis and hepatobiliary cancers, NCI criteria allowed in other cancers, per the FDA's 2026 draft guidance), exclude acute events and non-hepatic causes, and follow the label's dose, monitoring or avoidance advice. Because the scales disagree in most people with impairment (Elmeliegy 2021) and labels rest on limited data, decisions for moderate or severe impairment are individual. The Krens recommendations, which UK pharmacists use, could not be read.",
    sources: ["bopa-2025", "fda-hepatic-2026", "elmeliegy-2021", "yang-2022", "ibrutinib-label"],
  },
  variants: [
    {
      name: "Reference tables of hepatic dose recommendations (Krens et al.)",
      differs: "Uses a published table of dose recommendations for anticancer drugs by degree of liver impairment rather than each label alone.",
      evidence: "Named by BOPA 2025 as a reference; could not be read, so its recommendations and method are not described.",
      sources: ["krens-2023", "bopa-2025"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "fda-hepatic-2026",
      label: "Pharmacokinetics in Patients with Impaired Hepatic Function: Study Design, Data Analysis, and Impact on Dosage (draft guidance for industry)",
      publisher: "US Food and Drug Administration (CDER)",
      year: 2026,
      url: "https://www.fda.gov/media/71311/download",
      gradingScheme: "Draft guidance, nonbinding and not for implementation; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "elmeliegy-2021",
      label: "Discordance Between Child-Pugh and National Cancer Institute Classifications for Hepatic Dysfunction: Implications on Dosing Recommendations for Oncology Compounds",
      publisher: "Journal of Clinical Pharmacology (Elmeliegy et al.)",
      year: 2021,
      url: "https://doi.org/10.1002/jcph.1702",
      doi: "10.1002/jcph.1702",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "yang-2022",
      label: "Analysis of US Food and Drug Administration Oncology Approvals on the Characterization of Hepatic Impairment Effect and Dosing Recommendations",
      publisher: "Clinical Pharmacology and Therapeutics (Yang et al.)",
      year: 2022,
      url: "https://doi.org/10.1002/cpt.2505",
      doi: "10.1002/cpt.2505",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "ibrutinib-label",
      label: "Imbruvica (ibrutinib), US prescribing information",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "krens-2023",
      label: "Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update",
      publisher: "The Lancet Oncology (Krens et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/S1470-2045(23)00216-4",
      doi: "10.1016/S1470-2045(23)00216-4",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["ibrutinib"],
  related: ["child-pugh", "renal-dose-adjustment-of-anticancer-drugs", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "No international consensus or graded guideline on anticancer dosing in liver impairment was found, and the most-used reference tables (Krens et al., Lancet Oncology 2019 and 2023) could not be read.",
    "The FDA guidance is a September 2026 draft for drug developers, not a clinical guideline; how labels and practice will follow it is not yet known.",
    "How to dose when liver tests are abnormal because of liver metastases rather than cirrhosis, and how quickly to re-escalate when they improve, is not settled by the sources read.",
  ],
});
