import { protocol } from "./helpers";
import { ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Tests and checks before and during immune checkpoint inhibitor treatment.
 *
 * What was read, and how: see ./irae-sources.ts. SITC 2021 (full text, general panel recommendations and organ
 * recommendations that set a baseline or a monitoring interval) and ESE 2022 (full text, baseline and monitoring table
 * and recommendations R 1.1 and R 3.2). ESMO 2022 was not reachable.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text and every quote checked by script
 * (whitespace and line-break hyphenation normalised, XML tags and citation cross-references stripped, nothing else):
 * - SITC 2021 and ESE 2022: the Europe PMC full-text XML saved by sibling checkers on 16 and 17 November 2026 was
 *   re-used.
 * - 2022 ESC cardio-oncology guideline: the first pass could not read it. It now reads: the published PDF held by an
 *   open university repository (iris.unisr.it, hdl.handle.net/20.500.11768/201582), saved by a sibling checker on
 *   16 November 2026, was read with pdftotext. Section 5.5.9, Figure 20 and Recommendation Table 15 were read; the
 *   classes and levels were checked in both the body table and the summary table of Class I messages. The cardiac
 *   steps and the disagreement with SITC come from it. One row of the table prints a "greater than" sign as a full
 *   stop in the PDF text, so that row is stated in prose and not quoted.
 * - Keytruda (pembrolizumab) product information: fetched on 17 November 2026 as the PDF from ema.europa.eu and read
 *   with pdftotext (Annex I, sections 4.2 and 4.4). The document prints no revision date; the year is the PDF's own
 *   creation date, July 2026. It is the source for the patient card and the transplant advice, which no guideline read
 *   here states, and it speaks for pembrolizumab only.
 * Corrected in this pass: the autoimmune step merged two SITC recommendations and stated the specialist as an order;
 * the best-in-class statement credited ESE with tests it does not list; several reasons said more than the sources.
 */
export const checkpointInhibitorBaselineAndMonitoring = protocol({
  id: "checkpoint-inhibitor-baseline-and-monitoring",
  name: "Baseline tests and monitoring before and during checkpoint inhibitor treatment",
  aka: ["baseline tests before immunotherapy", "ICI pre-treatment screening", "checkpoint inhibitor monitoring bloods", "thyroid and cortisol monitoring on immunotherapy", "pre-immunotherapy checklist"],
  domain: "immunotherapy-toxicity",
  tldr: "Before immunotherapy such as pembrolizumab or nivolumab starts, your team checks your blood count, a panel of blood chemistry and your thyroid. European guidance adds cortisol, blood sugar, a heart tracing and heart blood tests. They ask about autoimmune conditions and transplants. Liver and thyroid tests are repeated during treatment, because these side effects often cause no symptoms.",
  simple: "Before immunotherapy, you will have blood tests, including thyroid and hormone tests, and perhaps a heart tracing. Some are repeated during treatment to find side effects early.",
  summary: "SITC 2021: before starting, full blood count with differential, a comprehensive metabolic panel, TSH and free T4; consider urinalysis for baseline kidney disease; consider an ECG for people at higher risk of myocarditis (cardiac disease, diabetes, combined anti-PD-(L)1 and anti-CTLA-4), and baseline troponin may be considered. Liver tests before every infusion; blood count, metabolic panel, TSH and free T4 intermittently throughout, with thyroid tests every 4 to 6 weeks on treatment and every 6 to 12 months after it ends, with no end point given. Dedicated education on irAEs, to which booklets or reference cards may be added; contraception and fertility. For life-threatening autoimmune disease, a careful risk-benefit discussion that considers alternatives; for non-life-threatening autoimmune disease, counselling about flares, close monitoring and consideration of specialist co-management (both LE: 1). Specialist referral where possible for autoimmune interstitial lung disease, to consider lung function tests (LE: 3).\n\nESE 2022 sets a baseline minimum for everyone of morning (08:00 to 09:00) TSH, free T4, cortisol, glucose and electrolytes (sodium, potassium, calcium), repeated every 4 to 6 weeks, preferably before each cycle, and adds ACTH, LH, FSH, oestradiol or testosterone, prolactin and HbA1c where hypophysitis risk is higher, such as ipilimumab alone or with a PD-1 inhibitor. Its thyroid section describes the usual advice as TSH and free T4 before every cycle for the first 6 months, then every 2 to 3 months for 6 months and every 6 months after that.\n\nThe 2022 ESC cardio-oncology guideline goes further than SITC on the heart: ECG, natriuretic peptide and troponin in all patients before starting (Class I, Level B); baseline echocardiography in high-risk patients (Class I, Level B: dual checkpoint inhibitors, a checkpoint inhibitor with another cardiotoxic treatment, an earlier non-cardiac immune side effect, or earlier heart disease or treatment-related heart damage) and optionally in everyone (Class IIb, Level C); ECG and troponin to be considered before doses 2, 3 and 4 and, if normal, every three doses until treatment ends (Class IIa, Level B); and a cardiovascular assessment every 6 to 12 months for high-risk patients treated for more than 12 months (Class I, Level C). SITC notes that baseline and scheduled troponin can be obtained but that in people without symptoms there is no evidence it improves outcome.\n\nThe European product information for pembrolizumab requires a patient card, asks for liver and thyroid function to be monitored at the start, periodically and as clinically indicated, and asks that benefit be weighed against the risk of rejection in solid organ transplant recipients and of graft-versus-host disease after a donor stem cell transplant. ESMO 2022 could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "People about to start, or receiving, an immune checkpoint inhibitor (anti-PD-1, anti-PD-L1 or anti-CTLA-4, alone or combined, with or without chemotherapy). Monitoring for chemotherapy or targeted drugs given alongside follows those drugs' own requirements. ESE's evidence review covered adults only, and its searches left out combinations with chemotherapy or targeted drugs; SITC and the ESC recommendations read here do not address children.",
  trigger: "A decision to start checkpoint inhibitor treatment, and each treatment cycle after it.",
  steps: [
    {
      action: "Give dedicated education on immune-related side effects; a booklet or reference card may be added",
      why: "These side effects can appear at any point during treatment or after it has stopped, so people need to know what to report.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "Give the patient card with pembrolizumab, as its European label requires, and explain the risks",
      why: "The label says the card must be given and the risks discussed. SITC, by contrast, says only that a reference card may be given.",
      source: "keytruda-smpc",
      quote: "Patients treated with KEYTRUDA must be given the patient card and be informed about the risks of KEYTRUDA (see also package leaflet).",
    },
    {
      action: "Discuss fertility before treatment and encourage contraception during it",
      why: "It is not known whether immunotherapy affects fertility in women of childbearing age, and SITC strongly encourages preventing pregnancy during treatment.",
      source: "sitc-2021",
      quote: "Patients should be encouraged to use contraception while receiving immunotherapy. Fertility should be discussed prior to treatment.",
    },
    {
      action: "Take a full blood count with differential, a comprehensive metabolic panel, TSH and free T4 before the first dose, and consider urinalysis",
      why: "These are the tests SITC asks for before starting. The urine test is to look for kidney disease that is already there.",
      source: "sitc-2021",
      quote: "The following tests should be performed prior to beginning ICI therapy: complete blood count (CBC) with differential, comprehensive metabolic panel (CMP), thyroid-stimulating hormone (TSH), free thyroxine (fT4). Urinalysis should be considered to evaluate for baseline kidney disease.",
    },
    {
      action: "Add a morning cortisol, glucose and electrolytes to the baseline, and ACTH, sex hormones, prolactin and HbA1c where hypophysitis risk is higher, such as with ipilimumab",
      why: "Symptoms of a hormone problem, such as tiredness and weakness, are also caused by cancer and its treatment, so ESE calls measuring hormone levels essential for a correct diagnosis.",
      source: "ese-2022",
      quote: "Baseline minimum tests: Morning (8:00–9:00 h) thyroid-stimulating hormone (TSH), free thyroxine (fT4), cortisol (with attention to any recent or current glucocorticoid treatment), glucose, and electrolytes (Na, K, Ca).",
    },
    {
      action: "Where the ESC guideline is followed, take an ECG, a troponin and a natriuretic peptide in everyone before the first dose",
      why: "ESC notes that heart side effects of these drugs can be life-threatening and asks for a baseline in all patients. SITC does not go this far: see the next step.",
      source: "esc-2022",
      quote: "ECG, NP, and cTn measurements are recommended in all patients before starting ICI therapy.",
      grade: "Class I, Level B",
    },
    {
      action: "Where SITC is followed, consider a baseline ECG for people at higher risk of myocarditis, and consider a baseline troponin",
      why: "SITC describes heart side effects as uncommon but with a high death rate, and says troponin testing in people without symptoms has not been shown to improve outcome.",
      source: "sitc-2021",
      quote: "Consider performing a baseline electrocardiogram (EKG) on patients deemed at a higher risk for myocarditis (eg, cardiac comorbidities, diabetes mellitus, anti-PD-(L)1 with anti-CTLA-4 ICI combination therapy, etc). Baseline troponin testing may also be considered to provide information for evaluating potential future cardiac toxicity.",
    },
    {
      action: "For people with a life-threatening autoimmune disease, decide only after a careful risk-benefit discussion that also considers other treatments",
      why: "SITC reports that existing autoimmune disease flared in about half of patients given these drugs, and asks that this be weighed against the survival benefit.",
      source: "sitc-2021",
      quote: "For patients with life-threatening autoimmune disorders, the decision to initiate ICI therapy should only be considered after a careful risk-benefit discussion between patient and provider, and consideration of alternative therapies. Consideration should include risks of autoimmune flares against the survival benefits of ICI therapies, especially in cancers with high expected rates of durable responses",
      grade: "LE: 1",
    },
    {
      action: "For people with a history of non-life-threatening autoimmune disease, counsel about flares before starting, monitor closely, and consider shared care with the relevant specialist",
      why: "Flares of the existing condition are common on treatment. The pembrolizumab label adds that most reported flares were mild and manageable.",
      source: "sitc-2021",
      quote: "Patients with a history of non-life-threatening autoimmune disease should only receive ICIs after counseling on the possibility of exacerbation or flare-ups. These patients should be monitored closely for exacerbations of their existing autoimmunity while being treated with ICIs, and concurrent monitoring and treatment by an appropriate specialist should be considered",
      grade: "LE: 1",
    },
    {
      action: "For people with a solid organ transplant, weigh the benefit of pembrolizumab against the risk of rejection before starting",
      why: "Rejection of a transplanted organ has been reported with PD-1 inhibitors. The same label asks for the same weighing after a donor stem cell transplant, because of graft-versus-host disease.",
      source: "keytruda-smpc",
      quote: "The benefit of treatment with pembrolizumab versus the risk of possible organ rejection should be considered in these patients.",
    },
    {
      action: "Refer people with existing autoimmune interstitial lung disease to a specialist where possible before starting, to consider lung function tests and assess risk",
      why: "Interstitial lung abnormalities that are already present are a risk factor for lung disease caused by these drugs.",
      source: "sitc-2021",
      quote: "Patients with pre-existing autoimmune ILD should be referred to a specialist where possible before initiation of ICI therapy for the consideration of pulmonary function tests (PFTs) and risk assessment",
      grade: "LE: 3",
    },
    {
      action: "Check liver tests before every infusion",
      why: "Immune hepatitis often causes no symptoms and typically shows as a rise in liver enzymes on the blood test.",
      source: "sitc-2021",
      quote: "Liver biochemical tests (aka liver function tests (LFTs)) should be checked prior to each ICI infusion.",
    },
    {
      action: "Repeat the hormone baseline (TSH, free T4, cortisol, glucose, electrolytes) every 4 to 6 weeks, preferably before each cycle",
      why: "Hormone side effects may appear soon after starting, at any time during treatment, and after it has ended.",
      source: "ese-2022",
      quote: "These tests should be repeated every 4–6 weeks, preferably before each treatment cycle starts.",
    },
    {
      action: "Where the ESC guideline is followed, consider an ECG and troponin before doses 2, 3 and 4 and, if normal, every three doses until treatment ends",
      why: "The aim is to find heart side effects before they cause symptoms. ESC itself says monitoring is challenging because evidence is lacking, and SITC sets no troponin schedule.",
      source: "esc-2022",
      quote: "Serial ECG and cTn measurements should be considered before ICI doses 2, 3, and 4, and if normal, reduce to every three doses until completion of therapy to detect subclinical ICI-related CV toxicity.",
      grade: "Class IIa, Level B",
    },
    {
      action: "After treatment ends, keep checking thyroid function every 6 to 12 months",
      why: "Immune side effects can appear after treatment has stopped. SITC gives no date at which this testing ends.",
      source: "sitc-2021",
      quote: "Thyroid function (TSH, fT4) should be tested every 4–6 weeks during ICI treatment, and should continue to be tested every 6–12 months following the conclusion of ICI treatment.",
    },
  ],
  bestInClass: {
    statement: "No single guideline covers every baseline test, and they disagree in two places. All three ask for thyroid function (TSH and free T4) before starting and during treatment. SITC 2021 adds a blood count and metabolic panel at baseline and intermittently, liver tests before each dose, and thyroid tests every 4 to 6 weeks on treatment and every 6 to 12 months after; none of these is graded. On hormones, ESE 2022 asks for a morning cortisol, glucose and electrolytes in everyone, repeated every 4 to 6 weeks, and a full pituitary panel where hypophysitis risk is higher (a suggested regimen without a GRADE rating), while SITC names cortisol only in the work-up of fatigue or of abnormal thyroid results. On the heart, the 2022 ESC cardio-oncology guideline recommends ECG, natriuretic peptide and troponin in all patients before starting (Class I, Level B) and says serial ECG and troponin should be considered (Class IIa, Level B), while SITC says to consider an ECG only for people at higher risk, that troponin may be considered, and that troponin testing in people without symptoms has not been shown to improve outcome. For pre-existing autoimmune disease SITC grades its advice LE: 1. The ESMO 2022 baseline list could not be read and is not compared.",
    sources: ["sitc-2021", "ese-2022", "esc-2022", "esmo-2022"],
  },
  variants: [
    {
      name: "Morning cortisol in everyone, with a full pituitary panel for ipilimumab (ESE 2022)",
      differs: "Adds cortisol, glucose and electrolytes to every baseline and repeat, drawn at 08:00 to 09:00, and a comprehensive panel (ACTH, LH, FSH, oestradiol or testosterone, prolactin, HbA1c) when hypophysitis risk is higher, such as ipilimumab alone or with a PD-1 inhibitor.",
      evidence: "ESE introduces the regimen with the words \"we suggest\", after comparing six earlier guidelines that disagree on how often to test. It is not one of the numbered recommendations and carries no GRADE rating.",
      sources: ["ese-2022"],
    },
    {
      name: "ECG, troponin and natriuretic peptide in everyone, with serial ECG and troponin (ESC 2022)",
      differs: "Takes the cardiac baseline in all patients, not only those at higher risk, adds a natriuretic peptide, adds echocardiography for high-risk patients, and repeats ECG and troponin before doses 2, 3 and 4 and then every three doses. SITC makes the ECG risk-based and troponin optional, and sets no schedule.",
      evidence: "ESC: Class I, Level B for the baseline in all patients; Class IIa, Level B for serial testing. SITC: ungraded panel consensus, with the remark that there is no evidence scheduled troponin improves outcome in people without symptoms.",
      sources: ["esc-2022", "sitc-2021"],
    },
  ],
  grades: [
    { claim: "Risk-benefit discussion, considering alternatives, before checkpoint inhibitors in life-threatening autoimmune disease", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Counselling about flares, close monitoring and consideration of specialist co-management in non-life-threatening autoimmune disease", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Specialist referral where possible, to consider lung function tests, for autoimmune interstitial lung disease", grade: "LE: 3", source: "sitc-2021" },
    { claim: "ECG, natriuretic peptide and troponin in all patients before starting", grade: "Class I, Level B", source: "esc-2022" },
    { claim: "Baseline echocardiography in high-risk patients", grade: "Class I, Level B", source: "esc-2022", quote: "Baseline echocardiography is recommended in high-risk patients before starting ICI therapy." },
    { claim: "Baseline echocardiography may be considered in all patients", grade: "Class IIb, Level C", source: "esc-2022" },
    { claim: "Serial ECG and troponin to be considered before doses 2, 3 and 4, then every three doses if normal", grade: "Class IIa, Level B", source: "esc-2022" },
    { claim: "Cardiovascular assessment every 6 to 12 months in high-risk patients treated for more than 12 months", grade: "Class I, Level C", source: "esc-2022" },
    { claim: "A controlled hormone condition is not a reason to withhold or stop a checkpoint inhibitor", grade: "++00", source: "ese-2022", quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy (++00)." },
    { claim: "Mild thyroid dysfunction may be monitored without treatment; the rationale gives TSH and free T4 every 3 to 6 weeks in the early phase", grade: "good clinical practice", source: "ese-2022", quote: "We suggest that cases of clinically and biochemically mild thyrotoxicosis or hypothyroidism can be monitored without treatment (good clinical practice)." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { ...ESE_2022, accessed: "2026-11-17" },
    ESMO_ICI_2022,
    { key: "esc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)", publisher: "European Society of Cardiology, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", gradingScheme: "ESC classes of recommendation: I (is recommended), IIa (should be considered), IIb (may be considered), III (is not recommended). Levels of evidence: A (multiple randomised trials or meta-analyses), B (a single randomised trial or large non-randomised studies), C (expert consensus, small or retrospective studies, registries).", read: "full-text", accessed: "2026-11-17" },
    { key: "keytruda-smpc", label: "Keytruda (pembrolizumab): EPAR product information, Annex I, summary of product characteristics", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/keytruda-epar-product-information_en.pdf", gradingScheme: "A medicine's licence, not a guideline: its statements are regulatory requirements and warnings and are not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "On 17 November 2026 the 2022 ESC cardio-oncology guideline, which the first version of this page could not read, was read from the published PDF in an open university repository. The publisher's own page refused a script on 16 November 2026. One row of its table (cardiovascular assessment every 6 to 12 months) prints a symbol wrongly in the PDF text and is given here in prose, not quoted.",
    "SITC and ESC disagree on routine heart tests and no trial read here settles it. ESC writes that monitoring is challenging because evidence-based recommendations are lacking; SITC writes that in people without symptoms there is no evidence that baseline and scheduled troponin improves outcome or gives early warning.",
    "How long after the last dose to keep testing is not settled. SITC asks for thyroid tests every 6 to 12 months after treatment and names no end. ESE and the pembrolizumab label say side effects can occur after treatment stops and set no schedule. The ESC schedule read here covers the time on treatment only.",
    "The patient card and the transplant advice come from the European product information for pembrolizumab alone. The labels of the other checkpoint inhibitors were not read, and no guideline read here gives transplant advice or requires a card.",
    "The sources differ on risk in pre-existing autoimmune disease. SITC cites a systematic review in which new immune side effects were not more frequent but flares of the existing disease occurred in 50% of patients. The pembrolizumab label says observational data suggest the risk of immune side effects may be increased, and that flares were frequent but mostly mild and manageable.",
    "The ASCO 2021 guideline was read only as its abstract, which gives no list of baseline tests; its full text refused a script on 16 November 2026.",
    "Whether to test for hepatitis B, hepatitis C, HIV or tuberculosis at baseline is not settled by the sources read; SITC asks for hepatitis B, HIV and tuberculosis tests before infliximab or vedolizumab, not before the checkpoint inhibitor.",
    "No trial read here shows that routine cortisol screening improves outcomes.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab"],
  technologies: ["checkpoint-inhibitor", "cardiac-biomarker-monitoring"],
  institutions: ["sitc", "esmo"],
  terms: ["irae", "immune-endocrinopathy", "myocarditis"],
  related: ["irae-hypophysitis-adrenal", "irae-hepatitis", "irae-pneumonitis", "irae-colitis"],
  tags: ["protocol", "irae"],
});
