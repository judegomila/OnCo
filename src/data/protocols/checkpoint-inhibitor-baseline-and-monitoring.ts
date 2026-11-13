import { protocol } from "./helpers";
import { ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Tests and checks before and during immune checkpoint inhibitor treatment.
 *
 * What was read, and how: see ./irae-sources.ts. SITC 2021 (full text, general panel recommendations and organ
 * recommendations that set a baseline or a monitoring interval) and ESE 2022 (full text, baseline and monitoring table
 * and recommendations R 3.2 and R 3.6). ESMO 2022 was not reachable. The 2022 ESC cardio-oncology guideline is listed
 * in Europe PMC without open full text and the publisher (Oxford Academic) refused a script elsewhere in this round, so
 * it is named as not read. Quotes checked by script.
 */
export const checkpointInhibitorBaselineAndMonitoring = protocol({
  id: "checkpoint-inhibitor-baseline-and-monitoring",
  name: "Baseline tests and monitoring before and during checkpoint inhibitor treatment",
  aka: ["baseline tests before immunotherapy", "ICI pre-treatment screening", "checkpoint inhibitor monitoring bloods", "thyroid and cortisol monitoring on immunotherapy", "pre-immunotherapy checklist"],
  domain: "immunotherapy-toxicity",
  tldr: "Before immunotherapy such as pembrolizumab or nivolumab starts, your team checks your blood count, kidney and liver tests, thyroid and often cortisol and sugar levels, and asks about autoimmune and lung conditions. Some tests are repeated before each dose, because immunotherapy side effects are often found on a blood test before you feel them.",
  simple: "Before immunotherapy, you will have blood tests to check your liver, kidneys, thyroid and hormones. They are repeated during treatment to catch side effects early.",
  summary: "SITC 2021: before starting, full blood count with differential, a comprehensive metabolic panel, TSH and free T4; consider urinalysis for baseline kidney disease; consider an ECG for people at higher risk of myocarditis (cardiac disease, diabetes, combined anti-PD-(L)1 and anti-CTLA-4), and baseline troponin may be considered. Liver tests before every infusion; blood count, metabolic panel, TSH and free T4 intermittently throughout, with thyroid tests every 4 to 6 weeks on treatment and every 6 to 12 months after it ends. Education on irAEs, contraception and fertility; a careful risk-benefit discussion for people with autoimmune disease (LE: 1) and specialist referral with lung function tests for autoimmune interstitial lung disease (LE: 3).\n\nESE 2022 sets a baseline minimum for everyone of morning (08:00 to 09:00) TSH, free T4, cortisol, glucose and electrolytes (sodium, potassium, calcium), repeated every 4 to 6 weeks, preferably before each cycle, and adds ACTH, LH, FSH, oestradiol or testosterone, prolactin and HbA1c where hypophysitis risk is higher, such as with ipilimumab. ESMO 2022 and the ESC 2022 cardio-oncology guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults about to start, or receiving, an immune checkpoint inhibitor (anti-PD-1, anti-PD-L1 or anti-CTLA-4, alone or combined, with or without chemotherapy). Monitoring for chemotherapy or targeted drugs given alongside follows those drugs' own requirements. Children are not addressed.",
  trigger: "A decision to start checkpoint inhibitor treatment, and each treatment cycle after it.",
  steps: [
    {
      action: "Give dedicated education on immune-related side effects, with a booklet or alert card",
      why: "Most side effects start between visits; knowing what to report and carrying a card speeds up treatment elsewhere.",
      source: "sitc-2021",
      quote: "Patients should receive dedicated education on irAEs by a medical professional and may receive additional materials such as informational booklets or reference cards.",
    },
    {
      action: "Discuss fertility before treatment and advise contraception during it",
      why: "The effects of these drugs on pregnancy and fertility are not fully known.",
      source: "sitc-2021",
      quote: "Patients should be encouraged to use contraception while receiving immunotherapy. Fertility should be discussed prior to treatment.",
    },
    {
      action: "Take a full blood count with differential, a comprehensive metabolic panel, TSH and free T4 before the first dose, and consider urinalysis",
      why: "A baseline makes it possible to tell later whether a change is a side effect.",
      source: "sitc-2021",
      quote: "The following tests should be performed prior to beginning ICI therapy: complete blood count (CBC) with differential, comprehensive metabolic panel (CMP), thyroid-stimulating hormone (TSH), free thyroxine (fT4). Urinalysis should be considered to evaluate for baseline kidney disease.",
    },
    {
      action: "Add a morning cortisol, glucose and electrolytes to the baseline, and ACTH, sex hormones, prolactin and HbA1c where hypophysitis risk is higher, such as with ipilimumab",
      why: "Hormone problems are common with these drugs and can be dangerous if missed; a morning baseline makes later results interpretable.",
      source: "ese-2022",
      quote: "Baseline minimum tests : Morning (8:00–9:00 h) thyroid-stimulating hormone (TSH), free thyroxine (fT4), cortisol (with attention to any recent or current glucocorticoid treatment), glucose, and electrolytes (Na, K, Ca).",
    },
    {
      action: "Consider a baseline ECG for people at higher risk of myocarditis, and consider a baseline troponin",
      why: "Myocarditis is rare but often fatal; a baseline helps interpret a later rise.",
      source: "sitc-2021",
      quote: "Consider performing a baseline electrocardiogram (EKG) on patients deemed at a higher risk for myocarditis (eg, cardiac comorbidities, diabetes mellitus, anti-PD-(L)1 with anti-CTLA-4 ICI combination therapy, etc). Baseline troponin testing may also be considered to provide information for evaluating potential future cardiac toxicity.",
    },
    {
      action: "For people with autoimmune disease, discuss the risk of a flare against the expected benefit before deciding, and arrange specialist monitoring",
      why: "Checkpoint inhibitors can flare existing autoimmune disease, but for many cancers the survival benefit outweighs that risk.",
      source: "sitc-2021",
      quote: "For patients with life-threatening autoimmune disorders, the decision to initiate ICI therapy should only be considered after a careful risk-benefit discussion between patient and provider, and consideration of alternative therapies.",
      grade: "LE: 1",
    },
    {
      action: "Refer people with existing autoimmune interstitial lung disease to a lung specialist for lung function tests before starting",
      why: "Existing lung disease raises the risk of pneumonitis.",
      source: "sitc-2021",
      quote: "Patients with pre-existing autoimmune ILD should be referred to a specialist where possible before initiation of ICI therapy for the consideration of pulmonary function tests (PFTs) and risk assessment",
      grade: "LE: 3",
    },
    {
      action: "Check liver tests before every infusion",
      why: "Immune hepatitis is usually silent and found on the blood test.",
      source: "sitc-2021",
      quote: "Liver biochemical tests (aka liver function tests (LFTs)) should be checked prior to each ICI infusion.",
    },
    {
      action: "Repeat the hormone baseline (TSH, free T4, cortisol, glucose, electrolytes) every 4 to 6 weeks, preferably before each cycle",
      why: "Thyroid, pituitary and adrenal problems and diabetes can start at any time on treatment.",
      source: "ese-2022",
      quote: "These tests should be repeated every 4–6 weeks, preferably before each treatment cycle starts.",
    },
    {
      action: "After treatment ends, keep checking thyroid function every 6 to 12 months",
      why: "Thyroid problems can appear months after the last dose.",
      source: "sitc-2021",
      quote: "Thyroid function (TSH, fT4) should be tested every 4–6 weeks during ICI treatment, and should continue to be tested every 6–12 months following the conclusion of ICI treatment.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and ESE 2022 agree on a baseline blood count, metabolic panel and thyroid function, liver tests before each dose and thyroid tests every 4 to 6 weeks on treatment and every 6 to 12 months after. ESE goes further, asking for a morning cortisol, glucose and electrolytes in everyone and a full pituitary panel where hypophysitis risk is higher, while SITC asks for cortisol only when symptoms or other results point to it. SITC adds risk-based ECG and optional troponin, urinalysis, and specialist review for autoimmune disease and interstitial lung disease. The cardiac baseline in the 2022 ESC cardio-oncology guideline and the ESMO 2022 baseline list could not be read and are not compared.",
    sources: ["sitc-2021", "ese-2022", "esmo-2022", "esc-2022"],
  },
  variants: [
    {
      name: "Morning cortisol in everyone, with a full pituitary panel for ipilimumab (ESE 2022)",
      differs: "Adds cortisol, glucose and electrolytes to every baseline and repeat, drawn at 08:00 to 09:00, and a comprehensive panel (ACTH, LH, FSH, oestradiol or testosterone, prolactin, HbA1c) when hypophysitis risk is higher, such as ipilimumab alone or with a PD-1 inhibitor.",
      evidence: "Guideline consensus; the testing schedule is not a graded recommendation.",
      sources: ["ese-2022"],
    },
  ],
  grades: [
    { claim: "Risk-benefit discussion before checkpoint inhibitors in life-threatening autoimmune disease", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Specialist referral and lung function tests for autoimmune interstitial lung disease", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Mild thyroid dysfunction may be monitored without treatment, with TSH and free T4 every 3 to 6 weeks early on", grade: "good clinical practice", source: "ese-2022", quote: "We suggest that cases of clinically and biochemically mild thyrotoxicosis or hypothyroidism can be monitored without treatment (good clinical practice)." },
  ],
  sources: [
    SITC_ICI_2021,
    ESE_2022,
    ESMO_ICI_2022,
    { key: "esc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)", publisher: "European Society of Cardiology, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The 2022 ESC cardio-oncology guideline, which gives the European position on a baseline ECG and troponin before checkpoint inhibitors, has no open full text in Europe PMC and was not read.",
    "The ASCO 2021 guideline's baseline list is in its full text, which could not be read; its abstract gives none.",
    "Whether to test for hepatitis B, hepatitis C, HIV or tuberculosis at baseline is not settled by the sources read; SITC asks for these tests before infliximab or vedolizumab, not before the checkpoint inhibitor.",
    "No trial read here shows that routine cortisol or troponin screening improves outcomes.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "avelumab"],
  technologies: ["checkpoint-inhibitor", "cardiac-biomarker-monitoring"],
  institutions: ["sitc", "esmo"],
  terms: ["irae", "immune-endocrinopathy", "myocarditis"],
  related: ["irae-hypophysitis-adrenal", "irae-hepatitis", "irae-pneumonitis", "irae-colitis"],
  tags: ["protocol", "irae"],
});
