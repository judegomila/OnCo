import { protocol } from "./helpers";

/*
 * Cardio-oncology: baseline cardiovascular risk assessment before heart-toxic cancer treatment, echocardiographic
 * surveillance during anthracyclines and HER2-targeted therapy, the definition of cancer therapy-related cardiac
 * dysfunction, and cardiac monitoring of survivors. One record for two census rows (baseline and surveillance during
 * treatment; monitoring in survivors), because the sources treat them as one pathway.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was re-read as raw text
 * and every quote re-checked by script (whitespace and line-break hyphenation normalised, XML tags stripped, nothing
 * else).
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022): NOW READ. The first pass could not reach
 *   it. A sibling checker saved the published PDF from an open university repository (hdl.handle.net/20.500.11768/201582)
 *   on 16 November 2026; that copy was re-used here as pdftotext output. Read: Table 3 (definitions), Table 12 (risk
 *   categories for adult survivors), Recommendation Tables 1, 4, 7, 8, 15, 20, 24, 25, 39 and 41, the legend of
 *   Figure 11, and section 15 (the summary of Class I recommendations). In that text ligatures break words containing
 *   "fi" and "fl", footnote letters run into words, and the signs for "more than" and "less than" print as a full stop
 *   and a comma, so only sentences free of all three are quoted; the others are given in prose with their class and
 *   level. The 2023 erratum notices (10.1093/eurheartj/ehad196, 10.1093/ehjci/jead080) were not read.
 * - HFA-ICOS position statement on baseline cardiovascular risk assessment (Lyon et al., Eur J Heart Fail 2020): full
 *   text, Europe PMC fullTextXML for PMC8019326. Its Figure 2 checklist is an image and was not read.
 * - IC-OS consensus statement defining cardiovascular toxicities of cancer therapies (Herrmann et al., Eur Heart J
 *   2022): full text from the PubMed Central page for PMC8803367, as saved by a sibling checker on 17 November 2026
 *   (Europe PMC returned an error for the XML and NCBI's API withholds this publisher's XML).
 * - British Society of Echocardiography and British Cardio-Oncology Society guideline (Echo Res Pract 2021): full
 *   text from NCBI E-utilities for PMC8052569, including Table 4 comparing monitoring schedules across guidelines. The
 *   Europe PMC XML now carries no body. Quotes keep the citation numbers in brackets as the stripped XML prints them.
 * - ASCO guideline on cardiac dysfunction in survivors of adult cancers (Armenian et al., J Clin Oncol 2017):
 *   abstract only, from Europe PMC. The full text was not requested: ascopubs.org refused sibling checkers on
 *   16 November 2026.
 * Every DOI was resolved through Crossref and its title checked. Europe PMC was searched for newer editions: none of
 * the five has one. A 2026 IC-OS and MASCC clinical practice statement on cardiovascular disease in adults with
 * cancer (10.1186/s40959-026-00481-3) exists and is not built into this page.
 *
 * What the second pass changed: the ESC guideline's graded recommendations and surveillance intervals were added; the
 * baseline echocardiogram before checkpoint inhibitors or CAR-T is now shown as a disagreement between HFA-ICOS and
 * ESC; reasons in `why` that no source states were replaced with what the sources say; ASCO's hedged wording on
 * survivor imaging was restored; and the "regardless of baseline risk" description of ESMO 2020 was corrected.
 */
export const cardioOncologyRiskAssessmentAndCardiacSurveillance = protocol({
  id: "cardio-oncology-risk-assessment-and-cardiac-surveillance",
  name: "Heart risk assessment and monitoring before, during and after heart-toxic cancer treatment",
  aka: ["cardio-oncology baseline assessment", "echocardiogram during trastuzumab", "anthracycline cardiotoxicity monitoring", "HFA-ICOS risk score", "cancer therapy-related cardiac dysfunction", "cardiac monitoring in cancer survivors"],
  domain: "survivorship",
  tldr: "Some cancer treatments, such as anthracyclines (doxorubicin, epirubicin) and trastuzumab, can weaken the heart. Before they start, your team should check your heart risk, often with blood pressure, blood tests, an ECG and a heart scan, repeated during treatment; a fall in heart function does not always mean stopping. Afterwards, report new breathlessness or ankle swelling promptly.",
  simple: "Some cancer medicines can affect the heart. Your team checks your heart before and during treatment. Tell them if you get breathless or your ankles swell.",
  summary: "Before treatment with anthracyclines, HER2-targeted therapy, VEGF inhibitors, some kinase inhibitors for CML, proteasome inhibitors and immunomodulatory drugs, RAF and MEK inhibitors or androgen deprivation therapy, the HFA-ICOS proformas (2020) stratify cardiovascular risk as low, medium, high or very high from history, blood pressure, glycated haemoglobin, kidney function, ECG, cardiac biomarkers (troponin and natriuretic peptides, where available) and echocardiography. Risk stratification should be prompt and should not delay treatment unless risk is high or very high or there is pre-existing cardiovascular disease; withholding effective treatment in those groups is a multidisciplinary decision with a cardiologist. The 2022 ESC guideline recommends risk stratification for everyone before potentially cardiotoxic therapy (Class I, Level B), says the HFA-ICOS tool should be considered (Class IIa, Level C), and recommends cardiology referral at high and very high risk (Class I, Level C). Before immune checkpoint inhibitors or CAR-T therapy both recommend a baseline ECG, troponin and natriuretic peptide; HFA-ICOS recommend a baseline echocardiogram for all, ESC only for high-risk patients before checkpoint inhibitors and for people with existing cardiovascular disease before CAR-T.\n\nBSE and BCOS (2021) set a comprehensive baseline echocardiogram including LVEF, global longitudinal strain (GLS) and right ventricular function, and define cancer therapy-related cardiac dysfunction (CTRCD) as an LVEF fall of more than 10 percentage points to below 50 per cent; IC-OS (2022) grades asymptomatic CTRCD as mild (LVEF 50 per cent or more with a new relative GLS fall over 15 per cent and/or a rise in biomarkers), moderate or severe (LVEF below 40 per cent), and ESC uses the same three grades. How often to repeat the echocardiogram differs between guidelines, with no strong evidence that any schedule improves outcomes. ESC (2022): on anthracyclines, every two cycles and within 3 months of finishing at high or very high risk (Class I, Level C), and within 12 months of finishing for all adults (Class I, Level B); on neoadjuvant or adjuvant HER2-targeted therapy, every 3 months and within 12 months of finishing (Class I, Level B). An asymptomatic fall to 40 to 49 per cent may allow HER2 therapy to continue with more frequent monitoring (ESC Class IIa, Level B).\n\nIn survivors, ASCO (2017) asks for a low threshold for cardiac evaluation after any potentially cardiotoxic therapy and says routine imaging surveillance may be warranted for certain higher-risk survivors. ESC recommends a yearly cardiovascular risk assessment with ECG and natriuretic peptide (Class I, Level B), and says an echocardiogram at years 1, 3 and 5 and every 5 years after that should be considered at very high or early high risk (Class IIa, Level C). This page explains care; the treating team's own protocol comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "community"],
  },
  population: "Adults with cancer about to receive, receiving or having completed potentially cardiotoxic treatment, above all anthracyclines and HER2-targeted therapy; the risk proformas also cover VEGF inhibitors, BCR-ABL kinase inhibitors, myeloma therapies, RAF and MEK inhibitors and androgen deprivation therapy. Children and survivors of childhood cancer have separate surveillance guidelines and are not covered here. Myocarditis from immune checkpoint inhibitors is covered only as a baseline step.",
  trigger: "A potentially cardiotoxic cancer treatment is planned; during it; and after it has ended.",
  steps: [
    {
      action: "Before a heart-toxic treatment, talk with the person about the risk to the heart if that risk is significant",
      why: "ESC (2022) recommends telling the patient and the other professionals looking after them the result of the heart risk assessment (Class I, Level C). HFA-ICOS say the patient should be told their baseline risk level and take part in the decision.",
      source: "asco-2017",
      quote: "It is important for health care providers to initiate the discussion regarding the potential for cardiac dysfunction in individuals in whom the risk is sufficiently high before beginning therapy.",
    },
    {
      action: "Stratify baseline cardiovascular risk with the HFA-ICOS proforma for the treatment class, using history, blood pressure, ECG, HbA1c, kidney function, cardiac biomarkers where available and an echocardiogram",
      why: "The proformas sort people into low, medium, high and very high risk before treatment starts. ESC (2022) recommends risk stratification for everyone starting a potentially heart-toxic treatment (Class I, Level B) and says the HFA-ICOS tool should be considered for it (Class IIa, Level C).",
      source: "hfa-icos-2020",
      quote: "Applying these risk stratification proformas will allow clinicians to stratify cancer patients into low, medium, high and very high risk of cardiovascular complications prior to starting treatment, with the aim of improving personalised approaches to minimise the risk of cardiovascular toxicity from cancer therapies.",
    },
    {
      action: "Do not delay cancer treatment for the assessment unless risk is high or very high or there is heart disease already",
      why: "HFA-ICOS want the assessment done promptly so that treatment is not delayed and can start safely. ESC (2022) recommends that people at low risk go on to treatment without delay (Class I, Level C).",
      source: "hfa-icos-2020",
      quote: "Baseline CV risk stratification should be completed promptly and should not delay starting cancer treatment (unless high or very high risk or pre-existing CVD is present).",
    },
    {
      action: "Refer people at high or very high risk to a cardiologist before treatment starts",
      why: "ESC also recommends referral for people with existing cardiovascular disease or an abnormal baseline assessment (Class I, Level C), and says referral may be considered at moderate risk (Class IIb, Level C).",
      source: "esc-2022",
      grade: "Class I, Level C",
      quote: "Cardiology referral is recommended in high-risk and very high-risk patients before anticancer therapy.",
    },
    {
      action: "In people at high or very high risk, withhold an effective but heart-toxic treatment only after a joint decision between the oncologist or haematologist and a cardiologist",
      why: "The decision weighs how well the treatment works against its safety and the person's heart risk. ESC (2022) recommends the same multidisciplinary discussion of risk and benefit before treatment in high and very high risk (Class I, Level C).",
      source: "hfa-icos-2020",
      quote: "Decisions to withhold effective but potentially cardiotoxic cancer treatments in cancer patients at high or very high risk of CVD should only be made after multidisciplinary team discussion between the treating oncologist/haematologist and cardiologist",
    },
    {
      action: "Before immune checkpoint inhibitors or CAR-T therapy, record a baseline ECG, troponin and natriuretic peptide; whether everyone also needs an echocardiogram differs between HFA-ICOS and ESC",
      why: "HFA-ICOS (2020) recommend all four tests for everyone, because these complications are severe and nothing yet identifies who is at higher risk. ESC (2022) recommends the ECG and blood tests for all (Class I, Level B before checkpoint inhibitors; Class I, Level C before CAR-T), and the echocardiogram for high-risk patients before checkpoint inhibitors (Class I, Level B) and for people with existing cardiovascular disease before CAR-T (Class I, Level C); for everyone else on checkpoint inhibitors it may be considered (Class IIb, Level C).",
      source: "hfa-icos-2020",
      quote: "we recommend all patients scheduled to receive ICI or CAR-T therapy have a baseline echocardiogram, electrocardiogram (ECG) and measurement of cardiac troponin and a natriuretic peptide, which serve as a baseline reference if new cardiac complications develop.",
    },
    {
      action: "Before anthracyclines or HER2 therapy, do a comprehensive baseline echocardiogram including LVEF, global longitudinal strain and right ventricular function",
      why: "Each person acts as their own control, so later scans are read against this one. ESC (2022) recommends a baseline echocardiogram for everyone before anthracyclines and before HER2-targeted therapy (both Class I, Level B), and strain (GLS) in everyone with cancer who has an echocardiogram, if available (Class I, Level C).",
      source: "bse-bcos-2021",
      quote: "All patients should undergo a comprehensive baseline echocardiogram to include the BSE minimum transthoracic dataset ( 3 ) with additional cardio-oncology measurements ( Table 1 ).",
    },
    {
      action: "Repeat the echocardiogram during treatment on a schedule set by the person's risk and the treatment",
      why: "BSE/BCOS recommend a personalised approach, because guidelines differ on how often and no schedule has strong evidence behind it.",
      source: "bse-bcos-2021",
      quote: "Furthermore, there is no strong evidence to support a specific schedule of screening or any evidence that it improves outcomes for screened patients ( 22 ).",
    },
    {
      action: "On anthracyclines, repeat the echocardiogram every two cycles and within 3 months of finishing in people at high or very high risk",
      why: "This is the ESC schedule. At moderate risk ESC says an extra scan should be considered once the cumulative dose reaches 250 mg/m² of doxorubicin or equivalent (Class IIa, Level C); at low risk it may be considered at the same dose (Class IIb, Level C).",
      source: "esc-2022",
      grade: "Class I, Level C",
      quote: "In high- and very high-risk patients, echocardiography is recommended every two cycles and within 3 months after completing treatment.",
    },
    {
      action: "On HER2-targeted therapy given before or after surgery, repeat the echocardiogram every 3 months and within 12 months of finishing",
      why: "This is the ESC schedule. In low-risk early breast cancer with no symptoms and a normal scan at 3 months, every 4 months may be considered (Class IIb, Level C); at high or very high risk more frequent scans should be considered (Class IIa, Level C). In metastatic disease ESC recommends every 3 months in the first year, then every 6 months if there are no symptoms and no heart toxicity (Class I, Level C).",
      source: "esc-2022",
      grade: "Class I, Level B",
      quote: "In patients receiving neoadjuvant or adjuvant HER2-targeted therapies, echocardiography is recommended every 3 months and within 12 months after completing treatment.",
    },
    {
      action: "Call it cancer therapy-related cardiac dysfunction when LVEF falls by more than 10 percentage points to below 50 per cent, and refer to cardio-oncology",
      why: "BSE/BCOS say everyone with confirmed cardiotoxicity needs referral to a cardio-oncology service. ESC (2022) recommends a specialist cardiovascular assessment for anyone with new cardiovascular toxicity during or after treatment (Class I, Level C).",
      source: "bse-bcos-2021",
      quote: "We define CTRCD as a decrease in LVEF by > 10% (10 absolute percentage points) to a value < 50%.",
    },
    {
      action: "Grade asymptomatic dysfunction by severity, treating a fall in LVEF below 40 per cent as severe",
      why: "ESC (2022) ties its advice on anthracyclines to the grade: a temporary interruption and heart failure treatment for moderate or severe dysfunction without symptoms, and continuing treatment where LVEF stays at 50 per cent or more with only a significant fall in strain or a rise in troponin or natriuretic peptide (both Class I, Level C).",
      source: "ic-os-2022",
      quote: "A reduction in LVEF to <40% indicates severe asymptomatic CTRCD, with recent data suggesting an association with poor prognosis in multiple cancers and treatment regimens.",
    },
    {
      action: "With an asymptomatic fall in LVEF to 40 to 49 per cent on HER2 therapy, consider continuing treatment with cardio-oncology support rather than stopping",
      why: "BSE/BCOS report increasing data that people in this range can complete treatment without a significant rise in cardiac events. ESC (2022) says continuing with more frequent cardiac monitoring should be considered (Class IIa, Level B) and recommends an ACE inhibitor or ARB and a beta-blocker (Class I, Level C); for severe dysfunction without symptoms it recommends a temporary interruption and heart failure treatment (Class I, Level C).",
      source: "bse-bcos-2021",
      quote: "However, there are increasing data to suggest that patients with asymptomatic reductions in LVEF to 40 to 49%, with guidance from a cardio-oncology team and personalized monitoring and treatment, can safely complete their cancer treatment without a significant increase in cardiac events ( 24 , 25 ).",
    },
    {
      action: "After anthracyclines, repeat the echocardiogram within 12 months of the end of treatment",
      why: "BSE/BCOS recommend an echocardiogram 3 to 12 months after cardiotoxic treatment in all patients, timed by the person's risk.",
      source: "esc-2022",
      grade: "Class I, Level B",
      quote: "In all adults receiving anthracycline chemotherapy, an echocardiogram is recommended within 12 months after completing treatment.",
    },
    {
      action: "After treatment, keep a low threshold for heart tests in any survivor who had potentially cardiotoxic therapy, and consider routine heart imaging for certain higher-risk survivors",
      why: "ASCO says imaging may be warranted in certain higher-risk survivors so that treatment can be started to halt or even reverse the progression of cardiac dysfunction.",
      source: "asco-2017",
      quote: "Clinical suspicion for cardiac disease should be high and threshold for cardiac evaluation should be low in any survivor who has received potentially cardiotoxic therapy.",
    },
    {
      action: "Review cardiovascular risk every year in survivors of heart-toxic drugs or radiotherapy, with an ECG and natriuretic peptide",
      why: "ESC adds that an echocardiogram at years 1, 3 and 5 and then every 5 years should be considered in survivors at very high or early high risk (Class IIa, Level C), may be considered every 5 years at moderate risk (Class IIb, Level C), and that risk should be reassessed 5 years after treatment to plan long-term follow-up (Class I, Level C).",
      source: "esc-2022",
      grade: "Class I, Level B",
      quote: "Annual CV risk assessment, including ECG and NP, and CVRF management is recommended in CS who were treated with a potentially cardiotoxic cancer drug or RT.",
    },
    {
      action: "Teach the person to recognise early signs of heart disease and to report them promptly",
      why: "ESC says survivors should be advised to report early signs and symptoms promptly and to tell medical teams which cardiotoxic treatment they had. It names breathlessness, ankle swelling and fatigue as the cardinal symptoms of heart failure.",
      source: "esc-2022",
      grade: "Class I, Level C",
      quote: "Education is recommended for patients with cancer regarding recognition for early signs and symptoms of CVD.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline, developed with EHA, ESTRO and IC-OS, is the most recent comprehensive graded guideline and was read in full. Most of its recommendations on this page are Level C, that is expert consensus or small studies; the baseline echocardiogram before anthracyclines and before HER2-targeted therapy, the echocardiogram within 12 months after anthracyclines, the 3-monthly echocardiogram on neoadjuvant or adjuvant HER2-targeted therapy and the yearly review of survivors are Class I, Level B. The sources agree on the shape of care: structured baseline risk assessment (HFA-ICOS 2020; ESC says the tool should be considered, Class IIa, Level C), a comprehensive baseline echocardiogram with LVEF and GLS (BSE/BCOS 2021, ESC 2022), dysfunction graded mild, moderate or severe (IC-OS 2022, ESC 2022; BSE/BCOS use an LVEF fall of more than 10 points to below 50 per cent), and a low threshold for evaluating survivors (ASCO 2017). They disagree in two places. Before checkpoint inhibitors or CAR-T, HFA-ICOS recommend a baseline echocardiogram for everyone, while ESC recommends it for high-risk patients before checkpoint inhibitors (Class I, Level B) and for people with existing cardiovascular disease before CAR-T (Class I, Level C), and says it may be considered for all before checkpoint inhibitors (Class IIb, Level C). On how often to scan during treatment, the answers run from every 3 months on HER2-targeted therapy (FDA, ESMO 2020, ESC 2022) to risk-based schedules (HFA-EACVI 2020) to a frequency left to the clinician (ASCO 2017); BSE/BCOS find no strong evidence for any schedule.",
    sources: ["esc-2022", "hfa-icos-2020", "ic-os-2022", "bse-bcos-2021", "asco-2017"],
  },
  variants: [
    {
      name: "Risk-based echocardiography schedules (HFA-EACVI 2020, as tabulated by BSE/BCOS)",
      differs: "For anthracyclines: at low risk after the cycle reaching a cumulative 240 mg/m² of doxorubicin or equivalent, then after every additional 100 mg/m² or every two cycles; at medium risk after half of planned treatment as well; at high risk every two cycles. For neoadjuvant and adjuvant HER2 therapy: every four cycles (12 weeks) at low risk, every three cycles (9 weeks) at medium risk and every two cycles (6 weeks) at high risk, with the medium and high risk intervals lengthening if stable at 4 months.",
      evidence: "Expert consensus; BSE/BCOS note wide variation between guidelines and no strong evidence for any schedule. The HFA-EACVI paper itself was not read.",
      sources: ["bse-bcos-2021"],
    },
    {
      name: "Every 3 months on HER2 therapy (FDA labelling and ESMO 2020, as tabulated by BSE/BCOS; ESC 2022)",
      differs: "An echocardiogram every 3 months on HER2-targeted therapy. ESMO 2020 adds that higher-risk patients may need more frequent monitoring, and for anthracyclines scans after 250 mg/m² of doxorubicin or equivalent and then after each further 100 mg/m². ESC 2022 recommends every 3 months for neoadjuvant or adjuvant treatment (Class I, Level B), allowing every 4 months to be considered at low risk after a normal 3-month scan (Class IIb, Level C).",
      evidence: "BSE/BCOS say screening every 3 months is still recommended by the FDA, call the frequency controversial and say compliance is limited. ESC notes its single algorithm has not been tested in low-risk or high-risk patients. The ESMO paper and the FDA label were not read.",
      sources: ["bse-bcos-2021", "esc-2022"],
    },
    {
      name: "Frequency left to the clinician (ASCO 2017)",
      differs: "Leaves the frequency of surveillance to the treating team; routine surveillance imaging may be offered to people considered at increased risk of cardiac dysfunction.",
      evidence: "ASCO survivors guideline; read as an abstract and as tabulated by BSE/BCOS.",
      sources: ["asco-2017", "bse-bcos-2021"],
    },
    {
      name: "Echocardiogram 3 to 12 months after treatment for everyone (BSE/BCOS 2021)",
      differs: "Recommends an echocardiogram 3 to 12 months after cardiotoxic treatment in all patients, timed by individual risk. After that it says the right frequency remains to be defined, with international recommendations varying from 1-year to 5-year intervals.",
      evidence: "Society guideline, not graded. ESC 2022 recommends an echocardiogram within 12 months after anthracyclines for all adults (Class I, Level B) and within 3 months at high or very high risk (Class I, Level C).",
      sources: ["bse-bcos-2021", "esc-2022"],
    },
  ],
  grades: [
    { claim: "Moderate asymptomatic CTRCD", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Moderate asymptomatic CTRCD requires (i) a fall in LVEF into a clearly abnormal range (40–49%) with a change in LVEF beyond the described variability of the most commonly used Echo-based 2D LVEF measurements (i.e. by >10 percentage points), or (ii) a smaller change in LVEF but with a concomitant significant fall in GLS and/or new rise in cardiac biomarkers." },
    { claim: "Mild asymptomatic CTRCD", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Mild asymptomatic CTRCD is defined as preserved LVEF (i.e. LVEF ≥ 50%) with >15% reduction in GLS relative to baseline and/or new rise in troponin or NPs." },
    { claim: "Telling the patient and other professionals the result of the risk assessment", grade: "Class I, Level C", source: "esc-2022", quote: "Communicating the results of the CV toxicity risk assessment to the patient and other appropriate healthcare professionals is recommended." },
    { claim: "Baseline echocardiogram before anthracyclines", grade: "Class I, Level B", source: "esc-2022", quote: "Baseline echocardiography is recommended in all patients with cancer before anthracycline chemotherapy." },
    { claim: "Strain (GLS) at every echocardiogram", grade: "Class I, Level C", source: "esc-2022", quote: "GLS is recommended in all patients with cancer having echocardiography, if available." },
    { claim: "Baseline tests before immune checkpoint inhibitors", grade: "Class I, Level B", source: "esc-2022", quote: "ECG, NP, and cTn measurements are recommended in all patients before starting ICI therapy." },
  ],
  sources: [
    { key: "hfa-icos-2020", label: "Baseline cardiovascular risk assessment in cancer patients scheduled to receive cardiotoxic cancer therapies: a position statement and new risk assessment tools from the Cardio-Oncology Study Group of the Heart Failure Association of the European Society of Cardiology in collaboration with the International Cardio-Oncology Society", publisher: "HFA of the ESC and IC-OS, European Journal of Heart Failure", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8019326/", doi: "10.1002/ejhf.1920", gradingScheme: "Position statement; its recommendations are not graded. Each risk factor in the proformas carries a level of evidence on the standard definitions used in cardiology and oncology guidelines.", read: "full-text", accessed: "2026-11-17" },
    { key: "ic-os-2022", label: "Defining cardiovascular toxicities of cancer therapies: an International Cardio-Oncology Society (IC-OS) consensus statement", publisher: "IC-OS, European Heart Journal", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8803367/", doi: "10.1093/eurheartj/ehab674", gradingScheme: "Consensus definitions; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "bse-bcos-2021", label: "British Society for Echocardiography and British Cardio-Oncology Society guideline for transthoracic echocardiographic assessment of adult cancer patients receiving anthracyclines and/or trastuzumab", publisher: "BSE and BCOS, Echo Research and Practice", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8052569/", doi: "10.1530/ERP-21-0001", gradingScheme: "Society guideline; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2017", label: "Prevention and Monitoring of Cardiac Dysfunction in Survivors of Adult Cancers: American Society of Clinical Oncology Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2017, url: "https://europepmc.org/abstract/MED/27918725", doi: "10.1200/JCO.2016.70.5400", read: "abstract", accessed: "2026-11-17" },
    { key: "esc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)", publisher: "ESC, European Heart Journal; read from the publisher's PDF in an open university repository", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", gradingScheme: "Class of recommendation I (recommended), IIa (should be considered), IIb (may be considered), III (not recommended); level of evidence A (multiple randomised trials or meta-analyses), B (one randomised trial or large non-randomised studies), C (expert consensus, small studies, retrospective studies or registries).", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The 2022 ESC cardio-oncology guideline was read on 17 November 2026 from the published PDF in an open university repository, as text; the publisher's own page still refuses a script. Its figures were read only through their legends, and its 2023 erratum notices were not read. Its advice on protecting the heart (for example dexrazoxane, liposomal anthracyclines, ACE inhibitors or beta-blockers), on blood-test monitoring during treatment, and on treatments other than anthracyclines and HER2-targeted therapy is not summarised here.",
    "ESC sorts adult survivors into risk groups partly by cumulative anthracycline dose and by radiation dose to the heart (its Table 12: for example very high risk from 400 mg/m² of doxorubicin or equivalent, early high risk at 250 to 399 mg/m², moderate risk at 100 to 249 mg/m²). The full table, with its radiotherapy doses, is not reproduced here.",
    "ASCO 2017 was read only as an abstract; which survivors it counts as higher risk, and its imaging intervals, are not given here. BSE/BCOS tabulate it as leaving frequency to the clinician.",
    "BSE/BCOS find no strong evidence that any schedule of echocardiograms during treatment improves outcomes, and ESC says its 3-monthly HER2 algorithm has not been tested in low-risk or high-risk patients.",
    "The definitions differ at the edges: BSE/BCOS and IC-OS count a fall of more than 10 percentage points, while ESC Table 3 counts a fall of 10 points or more to an LVEF of 40 to 49 per cent as moderate dysfunction.",
    "Monitoring for immune checkpoint inhibitor myocarditis, VEGF inhibitor hypertension and arrhythmias with BTK inhibitors is beyond the baseline step given here.",
    "The ESMO 2020 cardio-oncology consensus, the HFA-EACVI 2020 imaging statement and the FDA trastuzumab label are described only as BSE/BCOS tabulate them.",
    "A 2026 clinical practice statement from IC-OS and MASCC on preventing and managing cardiovascular disease in adults with cancer (10.1186/s40959-026-00481-3) has been published. It is not a new edition of any source used here and has not been built into this page.",
    "The HFA-ICOS baseline checklist (its Figure 2) is an image and was not read; the list of baseline tests given here comes from the risk factors in its proforma tables and the figure's caption.",
  ],
  institutions: ["asco"],
  technologies: ["cardio-oncology", "strain-echocardiography-gls"],
  drugs: ["doxorubicin", "epirubicin", "trastuzumab", "pertuzumab"],
  terms: ["cardiotoxicity", "trastuzumab-cardiotoxicity", "anthracycline"],
  related: ["paper-lyon-eur-heart-j", "idea-acc-risk-stratified-cardio-oncology-pathway"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "survivorship"],
});
