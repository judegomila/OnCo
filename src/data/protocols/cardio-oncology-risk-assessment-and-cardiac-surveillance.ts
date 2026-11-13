import { protocol } from "./helpers";

/*
 * Cardio-oncology: baseline cardiovascular risk assessment before heart-toxic cancer treatment, echocardiographic
 * surveillance during anthracyclines and HER2-targeted therapy, the definition of cancer therapy-related cardiac
 * dysfunction, and cardiac monitoring of survivors. One record for two census rows (baseline and surveillance during
 * treatment; monitoring in survivors), because the sources treat them as one pathway.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - HFA-ICOS position statement on baseline cardiovascular risk assessment (Lyon et al., Eur J Heart Fail 2020): full
 *   text from PubMed Central (PMC8019326).
 * - IC-OS consensus statement defining cardiovascular toxicities of cancer therapies (Herrmann et al., Eur Heart J
 *   2022): full text from PubMed Central (PMC8803367).
 * - British Society of Echocardiography and British Cardio-Oncology Society guideline for echocardiography in adults
 *   receiving anthracyclines and/or trastuzumab (Echo Res Pract 2021): full text from PubMed Central (PMC8052569),
 *   including its Table 4 comparing monitoring schedules across guidelines.
 * - ASCO guideline on prevention and monitoring of cardiac dysfunction in survivors of adult cancers (Armenian et al.,
 *   J Clin Oncol 2017): abstract only, from Europe PMC.
 * - 2022 ESC Guidelines on cardio-oncology (Eur Heart J 2022): not in PubMed Central; academic.oup.com returned 403 and
 *   the ESC guideline page offered only a slide set made of images. Not read. It is the most recent and most
 *   comprehensive guideline, and its absence is the main gap of this page.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const cardioOncologyRiskAssessmentAndCardiacSurveillance = protocol({
  id: "cardio-oncology-risk-assessment-and-cardiac-surveillance",
  name: "Heart risk assessment and monitoring before, during and after heart-toxic cancer treatment",
  aka: ["cardio-oncology baseline assessment", "echocardiogram during trastuzumab", "anthracycline cardiotoxicity monitoring", "HFA-ICOS risk score", "cancer therapy-related cardiac dysfunction", "cardiac monitoring in cancer survivors"],
  domain: "survivorship",
  tldr: "Some cancer treatments, such as anthracyclines (doxorubicin, epirubicin) and trastuzumab, can weaken the heart. Before they start, your team should check your heart risk, usually with blood pressure, blood tests, an ECG and a heart scan, repeated during treatment; a fall in heart function does not always mean stopping. Afterwards, tell any doctor about new breathlessness, swelling or chest pain.",
  simple: "Some cancer medicines can affect the heart. Your team checks your heart before and during treatment. Tell them if you get breathless or your ankles swell.",
  summary: "Before treatment with anthracyclines, HER2-targeted therapy, VEGF inhibitors, some kinase inhibitors for CML, proteasome inhibitors and immunomodulatory drugs, RAF and MEK inhibitors or androgen deprivation therapy, the HFA-ICOS proformas (2020) stratify cardiovascular risk as low, medium, high or very high from history, blood pressure, glycated haemoglobin, kidney function, ECG, cardiac biomarkers (troponin and natriuretic peptides, where available) and echocardiography. Risk stratification should be prompt and should not delay treatment unless risk is high or very high or there is pre-existing cardiovascular disease; withholding effective treatment in those groups is a multidisciplinary decision with a cardiologist. HFA-ICOS also recommend a baseline echocardiogram, ECG, troponin and natriuretic peptide for everyone starting immune checkpoint inhibitors or CAR-T therapy.\n\nBSE and BCOS (2021) set a comprehensive baseline echocardiogram including LVEF, global longitudinal strain (GLS) and right ventricular function, and define cancer therapy-related cardiac dysfunction (CTRCD) as an LVEF fall of more than 10 percentage points to below 50 per cent; IC-OS (2022) grades asymptomatic CTRCD as mild (LVEF 50 per cent or more with a new relative GLS fall over 15 per cent and/or a rise in biomarkers), moderate or severe (LVEF below 40 per cent). How often to repeat the echocardiogram differs widely between guidelines (from every 3 months on trastuzumab to undefined), with no strong evidence that any schedule improves outcomes; risk-based schedules such as those of HFA-EACVI (2020) repeat it more often at higher risk. Asymptomatic falls to 40 to 49 per cent may allow HER2 therapy to continue with cardio-oncology support. In survivors, ASCO (2017) asks for a low threshold for cardiac evaluation after any potentially cardiotoxic therapy, and imaging surveillance for certain higher-risk survivors.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "community"],
  },
  population: "Adults with cancer about to receive, receiving or having completed potentially cardiotoxic treatment, above all anthracyclines and HER2-targeted therapy; the risk proformas also cover VEGF inhibitors, BCR-ABL kinase inhibitors, myeloma therapies, RAF and MEK inhibitors and androgen deprivation therapy. Children and survivors of childhood cancer have separate surveillance guidelines and are not covered here. Myocarditis from immune checkpoint inhibitors is covered only as a baseline step.",
  trigger: "A potentially cardiotoxic cancer treatment is planned; during it; and after it has ended.",
  steps: [
    {
      action: "Before a heart-toxic treatment, talk with the person about the risk to the heart if that risk is significant",
      why: "Knowing the risk lets people report symptoms early and take part in decisions about monitoring.",
      source: "asco-2017",
      quote: "It is important for health care providers to initiate the discussion regarding the potential for cardiac dysfunction in individuals in whom the risk is sufficiently high before beginning therapy.",
    },
    {
      action: "Stratify baseline cardiovascular risk with the HFA-ICOS proforma for the treatment class, using history, blood pressure, ECG, HbA1c, kidney function, cardiac biomarkers where available and an echocardiogram",
      why: "A structured score finds the people who need a cardiologist before treatment and closer monitoring during it.",
      source: "hfa-icos-2020",
      quote: "Applying these risk stratification proformas will allow clinicians to stratify cancer patients into low, medium, high and very high risk of cardiovascular complications prior to starting treatment, with the aim of improving personalised approaches to minimise the risk of cardiovascular toxicity from cancer therapies.",
    },
    {
      action: "Do not delay cancer treatment for the assessment unless risk is high or very high or there is heart disease already",
      why: "For most people the cancer is the greater threat; only those at highest heart risk need a cardiology decision first.",
      source: "hfa-icos-2020",
      quote: "Baseline CV risk stratification should be completed promptly and should not delay starting cancer treatment (unless high or very high risk or pre-existing CVD is present).",
    },
    {
      action: "Withhold an effective but heart-toxic treatment only after a joint decision between the oncologist or haematologist and a cardiologist",
      why: "Stopping a treatment that controls the cancer has its own cost, and the balance needs both specialists.",
      source: "hfa-icos-2020",
      quote: "Decisions to withhold effective but potentially cardiotoxic cancer treatments in cancer patients at high or very high risk of CVD should only be made after multidisciplinary team discussion between the treating oncologist/haematologist and cardiologist",
    },
    {
      action: "Before immune checkpoint inhibitors or CAR-T therapy, record a baseline echocardiogram, ECG, troponin and natriuretic peptide",
      why: "Heart inflammation from these treatments is rare but serious, and a baseline makes a later change easy to see.",
      source: "hfa-icos-2020",
      quote: "we recommend all patients scheduled to receive ICI or CAR-T therapy have a baseline echocardiogram, electrocardiogram (ECG) and measurement of cardiac troponin and a natriuretic peptide, which serve as a baseline reference if new cardiac complications develop.",
    },
    {
      action: "Before anthracyclines or HER2 therapy, do a comprehensive baseline echocardiogram including LVEF, global longitudinal strain and right ventricular function",
      why: "Later scans are compared with this one, so it must measure the same things the same way.",
      source: "bse-bcos-2021",
      quote: "All patients should undergo a comprehensive baseline echocardiogram to include the BSE minimum transthoracic dataset ( 3 ) with additional cardio-oncology measurements ( Table 1 ).",
    },
    {
      action: "Repeat the echocardiogram during treatment on a schedule set by the person's risk and the treatment",
      why: "Guidelines differ on how often, and no schedule has been shown to improve outcomes, so higher-risk people are scanned more often.",
      source: "bse-bcos-2021",
      quote: "Furthermore, there is no strong evidence to support a specific schedule of screening or any evidence that it improves outcomes for screened patients ( 22 ).",
    },
    {
      action: "Call it cancer therapy-related cardiac dysfunction when LVEF falls by more than 10 percentage points to below 50 per cent, and refer to cardio-oncology",
      why: "A shared definition lets oncology and cardiology act on the same finding.",
      source: "bse-bcos-2021",
      quote: "We define CTRCD as a decrease in LVEF by > 10% (10 absolute percentage points) to a value < 50%.",
    },
    {
      action: "Grade asymptomatic dysfunction by severity, treating a fall in LVEF below 40 per cent as severe",
      why: "Severity guides whether treatment can continue with heart medicines or needs to pause.",
      source: "ic-os-2022",
      quote: "A reduction in LVEF to <40% indicates severe asymptomatic CTRCD, with recent data suggesting an association with poor prognosis in multiple cancers and treatment regimens.",
    },
    {
      action: "With an asymptomatic fall in LVEF to 40 to 49 per cent on HER2 therapy, consider continuing treatment with cardio-oncology support rather than stopping",
      why: "Growing evidence shows many people in this range can finish their cancer treatment safely with heart medicines and closer monitoring.",
      source: "bse-bcos-2021",
      quote: "However, there are increasing data to suggest that patients with asymptomatic reductions in LVEF to 40 to 49%, with guidance from a cardio-oncology team and personalized monitoring and treatment, can safely complete their cancer treatment without a significant increase in cardiac events ( 24 , 25 ).",
    },
    {
      action: "After treatment, keep a low threshold for heart tests in any survivor who had potentially cardiotoxic therapy, and offer imaging surveillance to higher-risk survivors",
      why: "Heart damage can appear years later, and treating it early can stop or reverse it.",
      source: "asco-2017",
      quote: "Clinical suspicion for cardiac disease should be high and threshold for cardiac evaluation should be low in any survivor who has received potentially cardiotoxic therapy.",
    },
  ],
  bestInClass: {
    statement: "The 2022 ESC cardio-oncology guideline, developed with EHA, ESTRO and IC-OS, is the current comprehensive guideline, and it could not be read here. The sources read agree on the shape of care: structured baseline risk assessment (HFA-ICOS 2020), a comprehensive baseline echocardiogram with LVEF and GLS (BSE/BCOS 2021), a shared definition of cardiac dysfunction (IC-OS 2022 grades it mild, moderate or severe; BSE/BCOS use an LVEF fall of more than 10 points to below 50 per cent), and a low threshold for evaluating survivors (ASCO 2017). They disagree on how often to scan during treatment: from every 3 months on trastuzumab (FDA, ESMO 2020) to risk-based schedules (HFA-EACVI 2020) to a frequency left to the clinician (ASCO 2017), with no strong evidence for any schedule.",
    sources: ["hfa-icos-2020", "ic-os-2022", "bse-bcos-2021", "asco-2017", "esc-2022"],
  },
  variants: [
    {
      name: "Risk-based echocardiography schedules (HFA-EACVI 2020, as tabulated by BSE/BCOS)",
      differs: "For anthracyclines, scans after a cumulative 240 mg/m² of doxorubicin or equivalent at low risk, at half of planned treatment as well at medium risk, and every two cycles at high risk; for adjuvant HER2 therapy, every four cycles (12 weeks) at low risk, every three cycles at medium risk and every two cycles at high risk, reducing if stable at 4 months.",
      evidence: "Expert consensus; BSE/BCOS note wide variation between guidelines and no strong evidence for any schedule. The HFA-EACVI paper itself was not read.",
      sources: ["bse-bcos-2021"],
    },
    {
      name: "Every 3 months on HER2 therapy (FDA labelling and ESMO 2020, as tabulated by BSE/BCOS)",
      differs: "A fixed 3-monthly echocardiogram throughout HER2-targeted therapy, regardless of baseline risk; ESMO 2020 scans after 250 mg/m² of doxorubicin or equivalent and then after each further 100 mg/m².",
      evidence: "BSE/BCOS call the 3-monthly frequency controversial with limited compliance. The ESMO paper was not read.",
      sources: ["bse-bcos-2021"],
    },
    {
      name: "Frequency left to the clinician (ASCO 2017)",
      differs: "Leaves the frequency of surveillance to the treating team, with routine imaging offered to those at increased risk.",
      evidence: "ASCO survivors guideline; read as an abstract and as tabulated by BSE/BCOS.",
      sources: ["asco-2017", "bse-bcos-2021"],
    },
  ],
  grades: [
    { claim: "Moderate asymptomatic CTRCD", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Moderate asymptomatic CTRCD requires (i) a fall in LVEF into a clearly abnormal range (40–49%) with a change in LVEF beyond the described variability of the most commonly used Echo-based 2D LVEF measurements (i.e. by >10 percentage points), or (ii) a smaller change in LVEF but with a concomitant significant fall in GLS and/or new rise in cardiac biomarkers." },
    { claim: "Mild asymptomatic CTRCD", grade: "IC-OS consensus definition", source: "ic-os-2022", quote: "Mild asymptomatic CTRCD is defined as preserved LVEF (i.e. LVEF ≥ 50%) with >15% reduction in GLS relative to baseline and/or new rise in troponin or NPs." },
  ],
  sources: [
    { key: "hfa-icos-2020", label: "Baseline cardiovascular risk assessment in cancer patients scheduled to receive cardiotoxic cancer therapies: a position statement and new risk assessment tools from the Cardio-Oncology Study Group of the Heart Failure Association of the European Society of Cardiology in collaboration with the International Cardio-Oncology Society", publisher: "HFA of the ESC and IC-OS, European Journal of Heart Failure", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8019326/", doi: "10.1002/ejhf.1920", gradingScheme: "Position statement; each risk factor in the proformas carries a level of evidence on the standard definitions used in cardiology and oncology guidelines.", read: "full-text", accessed: "2026-11-11" },
    { key: "ic-os-2022", label: "Defining cardiovascular toxicities of cancer therapies: an International Cardio-Oncology Society (IC-OS) consensus statement", publisher: "IC-OS, European Heart Journal", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8803367/", doi: "10.1093/eurheartj/ehab674", gradingScheme: "Consensus definitions; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "bse-bcos-2021", label: "British Society for Echocardiography and British Cardio-Oncology Society guideline for transthoracic echocardiographic assessment of adult cancer patients receiving anthracyclines and/or trastuzumab", publisher: "BSE and BCOS, Echo Research and Practice", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8052569/", doi: "10.1530/ERP-21-0001", gradingScheme: "Society guideline; recommendations are not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2017", label: "Prevention and Monitoring of Cardiac Dysfunction in Survivors of Adult Cancers: ASCO Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2017, url: "https://europepmc.org/abstract/MED/27918725", doi: "10.1200/JCO.2016.70.5400", read: "abstract", accessed: "2026-11-11" },
    { key: "esc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)", publisher: "ESC, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The 2022 ESC cardio-oncology guideline could not be read: it is not in PubMed Central, the publisher returned 403 and the ESC page offered only a slide set made of images. Its class and level of each recommendation, its surveillance schedules and its advice on cardioprotection (for example dexrazoxane, liposomal anthracyclines, ACE inhibitors or beta-blockers) are not given here.",
    "ASCO 2017 was read only as an abstract; which survivors it counts as higher risk, and its imaging intervals, are not given here.",
    "No source read sets a surveillance schedule for survivors years after anthracyclines or chest radiotherapy; ASCO leaves frequency to the clinician.",
    "Monitoring for immune checkpoint inhibitor myocarditis, VEGF inhibitor hypertension and arrhythmias with BTK inhibitors is beyond the baseline step given here.",
    "The ESMO 2020 cardio-oncology consensus and the HFA-EACVI 2020 imaging statement are described only as BSE/BCOS tabulate them.",
  ],
  institutions: ["asco"],
  technologies: ["cardio-oncology", "strain-echocardiography-gls"],
  drugs: ["doxorubicin", "epirubicin", "trastuzumab", "pertuzumab"],
  terms: ["cardiotoxicity", "trastuzumab-cardiotoxicity", "anthracycline"],
  related: ["paper-lyon-eur-heart-j", "idea-acc-risk-stratified-cardio-oncology-pathway"],
  sections: ["supportive-care"],
  tags: ["protocol", "cardio-oncology", "survivorship"],
});
