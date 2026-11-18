import { protocol } from "./helpers";

/*
 * Adjusting anticancer drug doses for reduced liver function in adults: how liver function is classified and where the
 * dose recommendation comes from.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext, Europe PMC XML, DailyMed SPL XML), each claim was read against it, and every quote was
 * checked by script with whitespace joined only.
 * - US FDA draft guidance for industry, Pharmacokinetics in Patients with Impaired Hepatic Function: Study Design, Data
 *   Analysis, and Impact on Dosage (September 2026; notice of availability in the Federal Register of 2 September
 *   2026; it withdraws the May 2003 guidance): full text, PDF from fda.gov. A draft, 'not for implementation', written
 *   for drug developers. Only the line numbers printed in its margin were stripped before quotes were checked. The
 *   first pass quoted a sentence that a footnote and page break split in the PDF; the second pass quotes the sentence
 *   before it instead, which is unbroken. Child-Pugh points and the NCI bilirubin and AST groups are from its Tables
 *   1 and 2.
 * - EMA guideline CPMP/EWP/2339/02 on pharmacokinetics in impaired hepatic function (adopted February 2005, still
 *   listed by the EMA as the current effective version): full text, PDF from ema.europa.eu. Added in the second pass.
 * - Elmeliegy et al. (J Clin Pharmacol 2021, DOI 10.1002/jcph.1702, PMC7754409): full text, Europe PMC XML. The
 *   three percentages were recomputed from its Table 2 (24/37, 28/38, 8/13).
 * - Yang et al. (Clin Pharmacol Ther 2022, DOI 10.1002/cpt.2505, PMC9540487): full text, Europe PMC XML.
 * - BOPA Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0 (3 June 2025):
 *   full text, the PDF a sibling checker fetched from bopa.org.uk on 17 November 2026, re-used.
 * - US prescribing information for Imbruvica (ibrutinib; DailyMed set id 0dfd0279-ff17-4ea9-89be-9803c71bab44,
 *   version 65, text revised 10/2025): full text, used as a worked example of a Child-Pugh-based label.
 * - Giraud et al., Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update
 *   (Lancet Oncol 2023, DOI 10.1016/S1470-2045(23)00216-4): still not readable. The publisher refuses a script,
 *   Europe PMC holds no abstract, and the open copy in the Radboud University repository answered 403. The first
 *   pass called this paper "Krens et al."; Crossref and Europe PMC give Giraud as first author (Krens is third, and
 *   first author of the 2019 original, DOI 10.1016/S1470-2045(19)30145-7).
 *
 * What the second pass changed: the 2023 paper's authorship; steps whose action or reason said more than the cited
 * passage (the FDA text is advice to developers about studies, not to clinicians; BOPA says nothing about how fast
 * liver function changes); the last step, which no source states, is now marked as practice; the NCI thresholds, the
 * FDA's conditions for a dedicated study and the EMA position were added from the source text. The page prints no
 * drug-by-drug bilirubin or transaminase thresholds other than the ibrutinib example, so there were none to check.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked.
 */
export const hepaticDoseAdjustmentOfAnticancerDrugs = protocol({
  id: "hepatic-dose-adjustment-of-anticancer-drugs",
  name: "Hepatic dose adjustment of anticancer drugs in reduced liver function",
  aka: ["liver impairment chemotherapy dosing", "hepatic impairment dose reduction", "Child-Pugh dosing", "NCI Organ Dysfunction Working Group criteria", "NCI ODWG", "chemotherapy and raised bilirubin", "liver metastases dose adjustment"],
  domain: "pharmacy",
  tldr: "The liver clears many cancer drugs, so if your liver is not working well the dose may need lowering or a different drug may be safer. Your liver blood tests are checked before each cycle, and the team follows the drug's own instructions, which grade liver function in one of two ways that do not always agree.",
  simple: "Your liver blood tests are checked before each treatment. If your liver is struggling, some drugs are given at a lower dose or swapped.",
  summary: "No international consensus on anticancer dosing in liver impairment was found; the dose comes from each drug's label. Labels use one of two scales. Child-Pugh scores encephalopathy, ascites, bilirubin, albumin and prothrombin time or INR into mild (A, 5 to 6 points), moderate (B, 7 to 9) and severe (C, 10 to 15). The NCI Organ Dysfunction Working Group criteria use only total bilirubin and AST: group A (normal), both at or below the upper limit of normal (ULN); B (mild), bilirubin at or below ULN with AST above it, or bilirubin above 1 to 1.5 times ULN with any AST; C (moderate), bilirubin above 1.5 to 3 times ULN; D (severe), bilirubin above 3 times ULN. The FDA's September 2026 draft guidance for drug developers, which replaces its 2003 guidance, recommends a dedicated study when, among other conditions, the liver accounts for more than 30 percent of a drug's elimination. It recommends Child-Pugh for cirrhosis, allows NCI criteria in people with cancer except hepatobiliary cancers, says scoring Child-Pugh during or shortly after an acute event may give a higher score than baseline, and notes non-liver causes of a raised bilirubin or INR (Gilbert's syndrome, vitamin K deficiency, anticoagulants). The EMA's 2005 guideline, still in force, also uses Child-Pugh, while noting that it was not developed to predict drug elimination.\n\nThe two scales disagree: in liver impairment studies of five drugs, 64.9%, 73.7% and 61.5% of participants with mild, moderate and severe impairment by Child-Pugh were at least one category less impaired by NCI criteria, and the authors advise prescribers to try to use the scale the label used (Elmeliegy 2021). People with cancer and moderate or severe impairment are often excluded from trials, so dose recommendations are often derived from studies in people without cancer and from modelling (Yang 2022). BOPA (2025) asks the verifying pharmacist, at every cycle, to check liver function and see that doses are modified as the drug or regimen literature directs. A worked example: for adults with B-cell cancers, the US label for ibrutinib recommends 140 mg daily in Child-Pugh A and 70 mg daily in Child-Pugh B, and says to avoid it in Child-Pugh C.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist"],
    where: ["outpatient-clinic", "ward", "aseptic-unit"],
  },
  population: "Adults with cancer prescribed systemic anticancer drugs who have abnormal liver tests, liver metastases, cirrhosis or a primary liver or biliary cancer. Children are not covered.",
  trigger: "A new regimen is planned, or bilirubin, transaminases, albumin or INR are abnormal before a cycle.",
  steps: [
    {
      action: "Check liver function before every cycle and see that doses are modified as the drug's or regimen's literature directs",
      why: "Liver disease can change how the body handles a drug enough to need a different dose (FDA draft, 2026). BOPA places this check in its verification standards for all cycles, including the first.",
      source: "bopa-2025",
      quote: "Check hepatic function and ensure drug doses are modified accordingly where appropriate as per drug/regimen literature.",
    },
    {
      action: "Find out which scale the drug's label uses for liver impairment, Child-Pugh or NCI criteria, and try to grade the person on that scale",
      why: "The two scales often put the same person in different categories. In the authors' example, someone who is moderate by Child-Pugh but mild by NCI criteria could be given a full dose where the label intends a reduced one.",
      source: "elmeliegy-2021",
      quote: "Prescribers should attempt to use the same classification system in the product label for dosing decisions.",
    },
    {
      action: "Read the label's scale in context: the FDA advises developers to use Child-Pugh for cirrhosis and generally for liver and biliary cancers, and allows NCI criteria in other cancers",
      why: "This is advice about the studies behind a label, not a rule for the clinic. The FDA calls Child-Pugh a useful marker that is generally accepted to predict changes in how a drug is handled, and does not recommend NCI criteria for people without cancer.",
      source: "fda-hepatic-2026",
      quote: "FDA recommends using the Child-Pugh (CP) classification to categorize the degree of HI in subjects with cirrhosis due to chronic liver disease. In subjects with cancer, sponsors can use the National Cancer Institute (NCI) Organ Dysfunction Working Group criteria (NCI Criteria) to categorize the degree of HI, except for subjects with hepatobiliary cancers.",
    },
    {
      action: "Avoid scoring Child-Pugh during or shortly after an acute event such as a gastrointestinal bleed, infection, surgery or transfusion",
      why: "The FDA's draft does not recommend it, because the score may come out higher than the person's baseline ability to metabolise drugs.",
      source: "fda-hepatic-2026",
      quote: "Further, determining a CP score during or shortly after an acute event (e.g., alcohol recidivism, gastrointestinal bleed, surgery, transfusions, infections, flare of underlying liver disease) is not recommended because it may produce a higher score that may not reflect baseline drug metabolic capacity.",
    },
    {
      action: "Check that an abnormal bilirubin, INR or albumin comes from the liver and not from another cause, such as Gilbert's syndrome, vitamin K deficiency, anticoagulants or intravenous fluids",
      why: "The FDA's draft asks study investigators to make sure changes in the score's components are due to liver disease, and gives these four causes as examples in the sentence after the one quoted.",
      source: "fda-hepatic-2026",
      quote: "Elevations in total bilirubin, international normalized ratio (INR), as well as reductions in albumin could occur because of co-morbid conditions unrelated to worsening hepatic function.",
    },
    {
      action: "Apply the label's recommendation for the person's category: a different dose, closer monitoring, or avoiding the drug",
      why: "The label's advice rests on how the drug behaved when the liver was impaired. For ibrutinib the label reports a 2.7-fold, 8.2-fold and 9.8-fold rise in exposure (AUC) in Child-Pugh A, B and C; the doses quoted are for adults with B-cell cancers.",
      source: "ibrutinib-label",
      quote: "The recommended dosage is 140 mg daily for patients with mild hepatic impairment (Child-Pugh class A). The recommended dosage is 70 mg daily for patients with moderate hepatic impairment (Child-Pugh class B). Avoid the use of IMBRUVICA in patients with severe hepatic impairment (Child-Pugh class C)",
    },
    {
      action: "Where the label gives no dose for moderate or severe impairment, treat the decision as an individual one for the prescriber, pharmacist and patient",
      why: "People with cancer and significant liver impairment are often left out of trials, so a label may have little or nothing to go on for them.",
      practice: "No source read says how to dose when the label is silent. Yang 2022 explains why labels are often thin here (people with moderate or severe impairment are often excluded from cancer trials) but gives advice to drug developers, not to clinicians.",
    },
  ],
  bestInClass: {
    statement: "No graded or consensus guideline for anticancer dosing in liver impairment was found. The best-supported practice is to check liver function every cycle (BOPA 2025), to try to grade it on the scale the drug's label used (Elmeliegy 2021), to make sure abnormal results are not from an acute event or a non-liver cause (FDA 2026 draft, written for study investigators), and to follow the label's dose, monitoring or avoidance advice. The FDA's 2026 draft recommends Child-Pugh in cirrhosis and allows NCI criteria in cancers other than hepatobiliary ones; the EMA's 2005 guideline names Child-Pugh and does not mention NCI criteria. Because the scales disagree in most study participants with impairment (Elmeliegy 2021) and people with moderate or severe impairment are often excluded from trials (Yang 2022), decisions for them are individual. The Lancet Oncology dosing recommendations (Giraud 2023), which BOPA appears to mean by 'Lancet guidelines', could not be read.",
    sources: ["bopa-2025", "fda-hepatic-2026", "ema-hepatic-2005", "elmeliegy-2021", "yang-2022", "ibrutinib-label"],
  },
  variants: [
    {
      name: "Reference tables of hepatic dose recommendations (Lancet Oncology, 2019 and 2023 update)",
      differs: "Uses a published set of dose recommendations for anticancer drugs in renal or hepatic impairment rather than each label alone.",
      evidence: "BOPA 2025 lists renal and hepatic dose adjustment guidelines, 'e.g. Lancet guidelines', among its example sources of information for verification, without naming the paper. The 2023 update (Giraud et al.) could not be read, so its recommendations and method are not described.",
      sources: ["giraud-2023", "bopa-2025"],
    },
    {
      name: "EMA guideline on pharmacokinetics in impaired hepatic function (2005)",
      differs: "Recommends a study when the drug is likely to be used in people with hepatic impairment, impairment is likely to alter its pharmacokinetics significantly and a dose adjustment may be needed; it sets no percentage threshold and does not mention NCI criteria.",
      evidence: "Says Child-Pugh is the most widely used classification, was not developed to predict drug elimination capacity, and can be used until better markers are found; a person with normal liver function scores 5 points and so would be classed as mild. Not graded.",
      sources: ["ema-hepatic-2005"],
    },
  ],
  grades: [],
  sources: [
    {
      key: "fda-hepatic-2026",
      label: "Pharmacokinetics in Patients with Impaired Hepatic Function: Study Design, Data Analysis, and Impact on Dosage (draft guidance for industry, September 2026)",
      publisher: "US Food and Drug Administration (CDER)",
      year: 2026,
      url: "https://www.fda.gov/media/71311/download",
      gradingScheme: "Draft guidance, nonbinding and not for implementation; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ema-hepatic-2005",
      label: "Guideline on the evaluation of the pharmacokinetics of medicinal products in patients with impaired hepatic function (CPMP/EWP/2339/02)",
      publisher: "European Medicines Agency (CHMP)",
      year: 2005,
      url: "https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-evaluation-pharmacokinetics-medicinal-products-patients-impaired-hepatic-function_en.pdf",
      gradingScheme: "Regulatory guideline; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "elmeliegy-2021",
      label: "Discordance Between Child-Pugh and National Cancer Institute Classifications for Hepatic Dysfunction: Implications on Dosing Recommendations for Oncology Compounds",
      publisher: "Journal of Clinical Pharmacology (Elmeliegy et al.)",
      year: 2021,
      url: "https://doi.org/10.1002/jcph.1702",
      doi: "10.1002/jcph.1702",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "yang-2022",
      label: "Analysis of US Food and Drug Administration Oncology Approvals on the Characterization of Hepatic Impairment Effect and Dosing Recommendations",
      publisher: "Clinical Pharmacology and Therapeutics (Yang et al.)",
      year: 2022,
      url: "https://doi.org/10.1002/cpt.2505",
      doi: "10.1002/cpt.2505",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bopa-2025",
      label: "Standards for the Pharmacy Verification of Prescriptions for Cancer Medicines, version 5.0",
      publisher: "British Oncology Pharmacy Association",
      year: 2025,
      url: "https://www.bopa.org.uk/wp-content/uploads/2019/07/BOPA-Standards-for-the-Pharmacy-Verification-of-Prescriptions-for-Cancer-Medicines-Version-5.0-3-june-2025.pdf",
      gradingScheme: "Standards are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ibrutinib-label",
      label: "Imbruvica (ibrutinib), US prescribing information (text revised October 2025; DailyMed version 65, published January 2026)",
      publisher: "US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "giraud-2023",
      label: "Dose recommendations for anticancer drugs in patients with renal or hepatic impairment: an update",
      publisher: "The Lancet Oncology (Giraud et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/S1470-2045(23)00216-4",
      doi: "10.1016/S1470-2045(23)00216-4",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["ibrutinib"],
  related: ["child-pugh", "renal-dose-adjustment-of-anticancer-drugs", "sact-prescribing-and-pharmacy-verification"],
  terms: ["pharmacokinetics"],
  upgrades: [],
  gaps: [
    "No international consensus or graded guideline on anticancer dosing in liver impairment was found. The most-used reference tables are the Lancet Oncology dose recommendations (Krens and colleagues 2019; update by Giraud and colleagues 2023). On 17 November 2026 the 2023 update still could not be read: the publisher refuses a script, Europe PMC holds no abstract, and the open copy in the Radboud University repository answered 403.",
    "This page therefore prints no drug-by-drug bilirubin or transaminase thresholds or percentage reductions (for docetaxel, paclitaxel, irinotecan, anthracyclines, vinca alkaloids and others). Those belong to each drug's label or summary of product characteristics; only ibrutinib's US label was read, as a worked example.",
    "The FDA guidance is a September 2026 draft for drug developers, not a clinical guideline; how labels and practice will follow it is not yet known. The FDA and EMA texts on scoring are written for study investigators, and no source read applies them to routine prescribing.",
    "The NCI criteria are given here as the FDA draft prints them (its Table 2, citing the NCI protocol template for organ dysfunction studies dated 15 August 2023); the NCI template itself was not read. The percentages of disagreement between the scales come from dedicated liver impairment studies, in people without cancer, of five drugs from one company (Pfizer), in a paper with Pfizer employees among its authors.",
    "How to dose when liver tests are abnormal because of liver metastases rather than cirrhosis, and how quickly to re-escalate when they improve, is not settled by the sources read.",
  ],
});
