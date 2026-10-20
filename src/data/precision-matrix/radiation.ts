import type { PrecisionRow, Source } from "./types";

/**
 * Precision matrix rows for radiotherapy delivery. See ./types.ts for the rules every row is held to.
 *
 * Every quote below is a verbatim fragment of the abstract indexed on Europe PMC (or, where named, the full text in
 * PubMed Central or the NICE page), checked by exact string match against the raw text on 20 October 2026. Every DOI
 * was resolved through Europe PMC before use. Physical precision (a margin in millimetres, a dose in gray, a range
 * in per cent) and clinical benefit (fewer side effects, better control) are separate claims, and each row says
 * which one its source shows.
 *
 * The records behind these rows are in src/data/spikes/precision-radiation.ts (new) and in the technology files
 * named there (tagged `precision` in place).
 */

const doi = (d: string, label: string, quote?: string): Source => ({ label, url: `https://doi.org/${d}`, ...(quote ? { quote } : {}) });

const VAN_HERK = "10.1016/S0360-3016(00)00518-6";
const VINOD = "10.1016/j.radonc.2016.09.009";
const NICE_AI = "https://www.nice.org.uk/guidance/htg695/chapter/1-Recommendations";
const DE_CREVOISIER = "10.1016/j.ijrobp.2018.07.2006";
const TG302 = "10.1002/mp.15532";
const OPEN = "10.1016/j.radonc.2026.111779";
const HEARTSPARE = "10.1016/j.clon.2016.11.005";
const DARBY = "10.1056/NEJMoa1209825";
const SMYTH = "10.1002/jmrs.89";
const TG76 = "10.1118/1.2349696";
const KIM = "10.1016/j.ijrobp.2026.01.010";
const MIRAGE = "10.1001/jamaoncol.2022.6558";
const ART_REVIEW = "10.3390/cancers18142281";
const KIRKPATRICK = "10.1016/j.ijrobp.2014.09.004";
const PAGANETTI_RANGE = "10.1088/0031-9155/57/11/R99";
const PAGANETTI_RBE = "10.1088/0031-9155/59/22/R419";
const LIAO = "10.1200/JCO.2017.74.0720";
const FAVAUDON = "10.1126/scitranslmed.3008973";
const FAST01 = "10.1001/jamaoncol.2022.5843";
const FLAME = "10.1200/JCO.20.02873";

export const rows: PrecisionRow[] = [
  {
    id: "rt-ptv-margin",
    domain: "radiation",
    label: "The safety margin around the target",
    technologyIds: ["imrt-igrt", "planning-target-volume"],
    metric: "Margin added around the clinical target volume to make the planning target volume, in mm, computed from the spread of systematic (Σ) and random (σ) geometric errors",
    today: {
      value: "Margin = 2.5Σ + 0.7σ, to give at least 95 per cent of the dose to the whole target in 90 per cent of patients",
      context: "Analytical model of set-up and preparation errors across a population of patients; the recipe most departments build their margins from",
      source: doi(VAN_HERK, "van Herk et al., Int J Radiat Oncol Biol Phys 2000", "For a sigma(p) of 3.2 mm, this recipe can be simplified to 2.5 Sigma + 0.7 sigma'."),
    },
    limits: [
      { kind: "physics", text: "The recipe leaves out rotations and changes in the shape of the target, so the margin it gives is a floor, not a guarantee.", source: doi(VAN_HERK, "van Herk et al. 2000", "Because this margin excludes rotational errors and shape deviations, it must be considered as a lower limit for safe radiotherapy.") },
      { kind: "workflow", text: "Errors made once, in preparing the plan, are repeated at every session and cost far more margin than errors that vary from day to day.", source: doi(VAN_HERK, "van Herk et al. 2000", "Large execution (random) variations lead to CTV underdosage for a large number of patients, while the same level of preparation (systematic) errors leads to a much larger underdosage for some of the patients.") },
    ],
    nextStep: {
      text: "Daily imaging on the treatment couch, followed by re-planning to that day's anatomy (online adaptive radiotherapy), so that the margin covers only what is left after correction.",
      status: "in-trials",
      source: doi(ART_REVIEW, "Srinivasan and Njeh, Cancers 2026 (narrative review)", "Quantitative evidence is strongest for dosimetric recovery, organ-at-risk sparing, workflow feasibility, and selected toxicity reduction; evidence for survival improvement remains limited and heterogeneous."),
      relatedIds: ["adaptive-radiotherapy", "mr-linac"],
    },
    buys: {
      text: "A smaller margin means less healthy tissue in the high-dose region. Where a margin reduction has been tested on its own terms, in prostate stereotactic radiotherapy (MIRAGE) and brain radiosurgery, it reduced or did not increase side effects; neither trial measured survival.",
      outcome: "plausible",
      source: doi(MIRAGE, "Kishan et al., MIRAGE, JAMA Oncology 2023"),
    },
    relatedIds: ["paper-van-herk-ptv-margin-recipe-ijrobp-2000", "target-delineation-variability", "organs-at-risk"],
  },

  {
    id: "rt-delineation-variability",
    domain: "radiation",
    label: "Clinicians drawing the target differently",
    technologyIds: ["target-delineation-variability", "planning-target-volume"],
    metric: "Agreement between the outlines different clinicians draw for the same patient (overlap indices and surface distances, in mm), and what the difference does to dose",
    today: {
      value: "Measured in 119 studies across all major tumour sites with metrics too varied to pool; 21 per cent reported what the variation did to the dose",
      context: "Systematic review of studies published 2000 to 2014 with more than two observers; median 7 observers",
      source: doi(VINOD, "Vinod et al., Radiotherapy and Oncology 2016", "Statistical analysis of results was reported in 68% (n=81) and dosimetric consequences in 21% (n=25) of studies."),
    },
    limits: [
      { kind: "sampling", text: "Studies use different metrics and analyses, so there is no single figure for how much clinicians disagree.", source: doi(VINOD, "Vinod et al. 2016", "There was considerable heterogeneity in the use of metrics and methods of analysis.") },
      { kind: "workflow", text: "A margin added for set-up error does not correct a wrongly drawn outline: the same outline is used at every session." },
    ],
    nextStep: {
      text: "AI auto-contouring, reviewed and edited by a clinician, which NICE allowed into NHS use in 2023 while evidence is collected.",
      status: "available-not-routine",
      source: { label: "NICE HTG695 (2023), recommendation 1.1", url: NICE_AI, quote: "AI technologies must be used with healthcare professional review of contours." },
      relatedIds: ["auto-contouring-ai"],
    },
    buys: {
      text: "More consistent outlines would make the dose a patient receives depend less on which clinician drew it. Whether that changes control or side effects has rarely been measured, because most studies stop at the outline.",
      outcome: "not-established",
      source: doi(VINOD, "Vinod et al. 2016"),
    },
    relatedIds: ["paper-vinod-delineation-uncertainty-review-radiother-oncol-2016", "auto-contouring-ai", "organs-at-risk"],
  },

  {
    id: "rt-ai-auto-contouring",
    domain: "radiation",
    label: "AI auto-contouring for radiotherapy planning",
    technologyIds: ["auto-contouring-ai"],
    metric: "How closely AI-drawn outlines match expert ones, how many need editing, and the time to an approved outline",
    today: {
      value: "Contours of similar quality to manual contouring, with most structures needing only minor edits, and quicker even including review time",
      context: "NICE early value assessment of nine AI contouring technologies for NHS external beam radiotherapy, September 2023",
      source: { label: "NICE HTG695 (2023)", url: NICE_AI, quote: "Clinical evidence suggests that AI technologies generally produce similar quality contours as manual contouring, with most structures needing only minor edits." },
    },
    limits: [
      { kind: "workflow", text: "Every AI outline must be reviewed and edited by a trained professional before it is used.", source: { label: "NICE HTG695 (2023)", url: NICE_AI, quote: "AI technologies must be used with healthcare professional review of contours." } },
      { kind: "sampling", text: "NICE listed what is not yet known, including what AI contouring does to dose and the errors and adverse events it causes.", source: { label: "NICE HTG695 (2023), recommendation 1.4", url: NICE_AI, quote: "contouring errors and adverse events associated with AI autocontouring" } },
    ],
    nextStep: {
      text: "Three years of NHS evidence generation, after which NICE decides whether the technologies can be adopted routinely.",
      status: "available-not-routine",
      source: { label: "NICE HTG695 (2023), recommendation 1.3", url: NICE_AI },
    },
    buys: {
      text: "Faster planning and more consistent outlines, which NICE judged could free clinicians' time. A benefit to patients in control or side effects has not been shown.",
      outcome: "not-established",
      source: { label: "NICE HTG695 (2023)", url: NICE_AI, quote: "The evidence suggests that AI autocontouring is quicker than manual contouring even when including time for healthcare professional review and edits." },
    },
    grade: "moderate",
    oversold: "AI contouring is sold as making radiotherapy more accurate; the evidence NICE reviewed shows outlines of similar quality to manual ones, produced faster, with every outline still needing professional review.",
    relatedIds: ["target-delineation-variability", "adaptive-radiotherapy", "knowledge-based-planning"],
  },

  {
    id: "rt-image-guidance-prostate",
    domain: "radiation",
    label: "Imaging the prostate before every session",
    technologyIds: ["imrt-igrt", "fiducial-markers"],
    metric: "How often the target's position is checked by imaging and corrected before the beam is switched on",
    today: {
      value: "Daily against weekly image guidance: late rectal toxicity lower with daily imaging (hazard ratio 0.71); recurrence-free survival, the primary endpoint, not different (hazard ratio 0.81)",
      context: "Phase 3 trial, 470 men with localised prostate cancer at 21 French centres, 70 to 80 Gy, median follow-up 4.1 years",
      source: doi(DE_CREVOISIER, "de Crevoisier et al., Int J Radiat Oncol Biol Phys 2018", "Late rectal toxicity (grade ≥1) was significantly lower in the daily group"),
    },
    limits: [
      { kind: "biology", text: "The prostate moves between and during sessions with bladder and bowel filling; imaging before the beam does not see movement during it." },
      { kind: "sampling", text: "In the same trial overall survival was worse with daily imaging, unexplained in the abstract, alongside a worse interval free of other cancers.", source: doi(DE_CREVOISIER, "de Crevoisier et al. 2018", "Overall survival was worse in the daily group than in the weekly group") },
    ],
    nextStep: {
      text: "Tracking the prostate during the beam on a standard linear accelerator (kilovoltage intrafraction monitoring), with sub-millimetre accuracy reported, now in a 10-centre trial.",
      status: "in-trials",
      source: doi(KIM, "Keall et al., Int J Radiat Oncol Biol Phys 2026", "Submillimeter accuracy of KIM was observed in simulations, phantom experiments, and clinical trials."),
      relatedIds: ["respiratory-gating-tumour-tracking-systems", "sbrt"],
    },
    buys: {
      text: "Fewer rectal side effects with daily imaging in one randomised trial, and better control of PSA in a post hoc analysis; no gain in the primary endpoint.",
      outcome: "plausible",
      source: doi(DE_CREVOISIER, "de Crevoisier et al. 2018"),
    },
    relatedIds: ["paper-de-crevoisier-daily-weekly-igrt-ijrobp-2018"],
  },

  {
    id: "rt-surface-guidance",
    domain: "radiation",
    label: "Surface-guided radiotherapy",
    technologyIds: ["surface-guided-radiotherapy", "patient-positioning-surface-guidance-systems"],
    metric: "Agreement between the patient's tracked skin surface and the reference position, in mm, and how well the surface stands in for the target",
    today: {
      value: "Sub-millimetre accuracy reported for frameless brain radiosurgery",
      context: "Institutional evaluations of surface guidance in radiosurgery, summarised by the American Association of Physicists in Medicine Task Group 302 (full text)",
      source: doi(TG302, "Al-Hallaq et al., AAPM Task Group 302, Medical Physics 2022", "They have shown submillimeter accuracy of the system with various treatment parameters"),
    },
    limits: [
      { kind: "physics", text: "The cameras see skin, not the tumour, so accuracy falls for deep targets and when the surface does not move with them.", source: doi(TG302, "AAPM Task Group 302 (full text)", "the accuracy for inferring the location of the internal target is degraded when the surface is not a good surrogate for the target, or when the surface is not visible to the cameras.") },
      { kind: "physics", text: "The systems have a limited field of view and cannot image very dark skin, which makes the technique less usable for some patients.", source: doi(TG302, "AAPM Task Group 302 (full text)", "SGRT systems have certain technical limitations such as a finite FOV and an inability to image very dark skin tones.") },
    ],
    nextStep: {
      text: "Combining surface tracking with internal X-ray or thermal imaging, as some systems already do, so the surface is checked against anatomy beneath it.",
      status: "available-not-routine",
      source: doi(TG302, "AAPM Task Group 302 (full text)", "potentially combining thermal imaging with surface imaging as implemented in the Brainlab ExacTrac Dynamic system."),
    },
    buys: {
      text: "Open face masks instead of closed ones in head and neck radiotherapy, with equivalent set-up accuracy and significantly better tolerability, in a 230-patient randomised trial. The benefit shown is experience of treatment, not cancer control.",
      outcome: "established",
      source: doi(OPEN, "Nicholson et al., OPEN trial, Radiotherapy and Oncology 2026", "At treatment completion patient experience metrics, including tolerability, overall experience and distress, were significantly more favourable for both open-mask cohorts compared to closed masks"),
    },
    relatedIds: ["paper-al-hallaq-med-phys", "paper-open-trial-open-face-masks-sgrt-radiother-oncol-2026", "radiosurgery-srs", "deep-inspiration-breath-hold"],
  },

  {
    id: "rt-breath-hold-left-breast",
    domain: "radiation",
    label: "Breath-hold radiotherapy for left-sided breast cancer",
    technologyIds: ["deep-inspiration-breath-hold", "respiratory-motion-management"],
    metric: "Mean heart dose, in Gy",
    today: {
      value: "Mean heart dose 1.1 Gy in voluntary breath-hold against 1.8 Gy free breathing; 95 per cent of women had a lower heart dose",
      context: "UK HeartSpare Stage II: 101 women at 10 UK centres with part of the heart in the field on a free-breathing plan",
      source: doi(HEARTSPARE, "Bartlett et al., Clinical Oncology 2017", "Mean cardiac doses (Gy) for free-breathing and VBH techniques, respectively, were: heart 1.8 and 1.1, LAD 12.1 and 5.4, maximum LAD 35.4 and 24.1 (all P<0.001)."),
    },
    limits: [
      { kind: "biology", text: "No heart dose has been found below which there is no added risk: coronary events rose in proportion to mean heart dose, so the dose left after breath-hold still counts.", source: doi(DARBY, "Darby et al., New England Journal of Medicine 2013", "Rates of major coronary events increased linearly with the mean dose to the heart by 7.4% per gray (95% confidence interval, 2.9 to 14.5; P<0.001), with no apparent threshold.") },
      { kind: "physics", text: "Surface tracking confirms the chest is in position, not where the heart is.", source: doi(TG302, "AAPM Task Group 302 (full text)", "it cannot directly provide information regarding the position of the heart during DIBH.") },
      { kind: "biology", text: "Breath-hold depends on the patient being able to hold a deep breath repeatedly." },
    ],
    buys: {
      text: "A lower projected risk of heart disease decades later: a 3.4 Gy reduction in mean heart dose, the largest in a review of ten studies, corresponds to a 13.6 per cent smaller projected rise in risk. This is projected from dose, not counted in a trial of breath-hold.",
      outcome: "plausible",
      source: doi(SMYTH, "Smyth et al., Journal of Medical Radiation Sciences 2015", "reduction in mean heart dose is equivalent to a 13.6% reduction in the projected increase in risk of heart disease."),
    },
    relatedIds: ["paper-heartspare-stage-ii-clin-oncol-2017", "paper-smyth-dibh-cardiac-sparing-review-jmrs-2015", "surface-guided-radiotherapy", "breast-hr-positive", "tnbc"],
  },

  {
    id: "rt-respiratory-motion",
    domain: "radiation",
    label: "Tumours that move with breathing: gating, breath-hold and tracking",
    technologyIds: ["respiratory-motion-management", "respiratory-gating-tumour-tracking-systems", "fiducial-markers"],
    metric: "Movement of the target with breathing, in mm, and the residual movement after it is managed",
    today: {
      value: "Motion management is recommended when the target moves more than 5 mm and the patient can tolerate it",
      context: "American Association of Physicists in Medicine Task Group 76 report on respiratory motion in thoracic, abdominal and pelvic tumours",
      source: doi(TG76, "Keall et al., AAPM Task Group 76, Medical Physics 2006", "If target motion is greater than 5 mm, a method of respiratory motion management is available, and if the patient can tolerate the procedure, respiratory motion management technology is appropriate."),
    },
    limits: [
      { kind: "biology", text: "Breathing differs from session to session and between patients, so motion has to be measured for each patient.", source: doi(TG76, "AAPM Task Group 76", "Included in this guide is the recommendation that tumor motion should be measured (when possible) for each patient for whom respiratory motion is a concern.") },
      { kind: "cost-access", text: "Gating, breath-hold, forced shallow breathing and tracking all add equipment, time and quality assurance.", source: doi(TG76, "AAPM Task Group 76", "Respiratory motion management involves further resources, education and the development of and adherence to QA procedures.") },
    ],
    nextStep: {
      text: "Real-time tracking of the target during the beam on a standard linear accelerator, without extra hardware; tested in prostate stereotactic radiotherapy and now in a 300-patient, 10-centre trial.",
      status: "in-trials",
      source: doi(KIM, "Keall et al., Int J Radiat Oncol Biol Phys 2026", "KIM is being made available through commercialization with an industry partner, and through a 300-patient, 10-center clinical trial."),
      relatedIds: ["sbrt", "mr-linac"],
    },
    buys: {
      text: "Smaller margins on moving targets, and the safe delivery of stereotactic doses to them. Tracking improved dose coverage of the target in trials; a difference in control or side effects has not been reported.",
      outcome: "not-established",
      source: doi(KIM, "Keall et al. 2026", "a significant dosimetric impact of KIM deployment for target volume coverage"),
    },
    relatedIds: ["paper-keall-med-phys", "deep-inspiration-breath-hold", "nsclc", "pancreatic", "hcc"],
  },

  {
    id: "rt-mr-guided-adaptive-prostate",
    domain: "radiation",
    label: "MRI-guided adaptive stereotactic radiotherapy for prostate cancer",
    technologyIds: ["mr-linac", "adaptive-radiotherapy"],
    metric: "Planning margin around the prostate, in mm",
    today: {
      value: "2 mm with MRI guidance against 4 mm with CT guidance, 40 Gy in 5 fractions",
      context: "MIRAGE phase 3 randomised trial, 156 men, single centre, 2020 to 2021",
      source: doi(MIRAGE, "Kishan et al., MIRAGE, JAMA Oncology 2023", "Planning margins of 4 mm (CT arm) and 2 mm (MRI arm) were used to deliver 40 Gy in 5 fractions."),
    },
    limits: [
      { kind: "sampling", text: "One centre, stopped early after an interim analysis, with acute endpoints at 90 days; the arms differed in imaging and margin together, so the trial cannot say which mattered.", source: doi(MIRAGE, "MIRAGE 2023", "Thus, the trial was closed to accrual early.") },
      { kind: "cost-access", text: "MR-linacs are slower per session and cost more than standard machines." },
      { kind: "sampling", text: "Across adaptive radiotherapy the evidence is strongest for dose and side effects, and limited for survival.", source: doi(ART_REVIEW, "Srinivasan and Njeh, Cancers 2026 (narrative review)", "evidence for survival improvement remains limited and heterogeneous.") },
    ],
    nextStep: {
      text: "Longer follow-up of MIRAGE, and trials testing whether adapting the plan every day changes cancer control rather than only acute side effects.",
      status: "in-trials",
      source: doi(MIRAGE, "MIRAGE 2023", "Longer-term follow-up will confirm whether these notable benefits persist."),
    },
    buys: {
      text: "Fewer moderate acute urinary and bowel side effects in one randomised trial: grade 2 or worse urinary toxicity 24.4 per cent against 43.4 per cent, and bowel toxicity 0 against 10.5 per cent, within 90 days. Cancer control was not an endpoint.",
      outcome: "established",
      source: doi(MIRAGE, "MIRAGE 2023", "The incidence of acute grade 2 or greater GU toxic effects was significantly lower with MRI vs CT guidance (24.4% [95% CI, 15.4%-35.4%] vs 43.4% [95% CI, 32.1%-55.3%]"),
    },
    oversold: "MR-guided adaptive radiotherapy is sometimes presented as more likely to cure; the randomised evidence is for fewer acute side effects after prostate stereotactic radiotherapy, and survival benefit across adaptive radiotherapy is limited.",
    relatedIds: ["paper-kishan-jama-oncol", "prostate", "sbrt"],
  },

  {
    id: "rt-radiosurgery-margin",
    domain: "radiation",
    label: "Radiosurgery for brain metastases: how much margin",
    technologyIds: ["radiosurgery-srs", "stereotactic-radiosurgery"],
    metric: "Margin added around the visible metastasis on MRI, in mm",
    today: {
      value: "1 mm against 3 mm: local recurrence 6.7 per cent at 12 months, with no difference between margins; 5 of 6 biopsy-proven radionecrosis cases in the 3 mm group",
      context: "Randomised trial by lesion, 49 patients with 80 brain metastases, linear accelerator with image guidance",
      source: doi(KIRKPATRICK, "Kirkpatrick et al., Int J Radiat Oncol Biol Phys 2015", "However, given the higher potential risk of RN with a 3-mm margin, a 1-mm GTV expansion is more appropriate."),
    },
    limits: [
      { kind: "sampling", text: "A small single trial; the radionecrosis difference (P = .10) was not statistically significant.", source: doi(KIRKPATRICK, "Kirkpatrick et al. 2015", "Biopsy-proven RN alone was observed in 6 lesions (5 in the 3-mm group, P=.10).") },
      { kind: "workflow", text: "The margin cannot be smaller than the error in drawing the metastasis and placing the patient, so it depends on imaging and immobilisation." },
    ],
    buys: {
      text: "Less healthy brain in the high-dose region without losing control of the treated tumour. The reduction in radiation damage is suggested, not proven.",
      outcome: "plausible",
      source: doi(KIRKPATRICK, "Kirkpatrick et al. 2015", "The PTV/GTV ratio, volume receiving 12 Gy or more, and minimum dose to PTV were significantly higher in the 3-mm group (all P<.01)"),
    },
    relatedIds: ["paper-kirkpatrick-srs-margin-trial-ijrobp-2015", "radiation-necrosis", "secondary-brain-tumours", "surface-guided-radiotherapy"],
  },

  {
    id: "rt-proton-range",
    domain: "radiation",
    label: "Where a proton beam stops: range uncertainty",
    technologyIds: ["proton-therapy", "intensity-modulated-proton-therapy", "proton-range-uncertainty"],
    metric: "Uncertainty in the depth at which the beam stops, as a percentage of its range plus a fixed distance in mm",
    today: {
      value: "Margin recipes from 2.5 per cent + 1.5 mm to 3.5 per cent + 3 mm; at 3.5 per cent + 1 mm, an 8 mm overshoot for a 20 cm beam in soft tissue",
      context: "Recipes in use at five US proton centres, reviewed in 2012 (full text)",
      source: doi(PAGANETTI_RANGE, "Paganetti, Physics in Medicine and Biology 2012 (full text in PubMed Central)", "The 3.5% + 1mm range margin at MGH, for instance, results in a deliberate overshoot of 8mm for a 20 cm range field in soft tissue, which is quite substantial."),
    },
    limits: [
      { kind: "physics", text: "The range depends on imaging, set-up, beam delivery and dose calculation, each with its own error.", source: doi(PAGANETTI_RANGE, "Paganetti 2012", "The range in tissue is associated with considerable uncertainties caused by imaging, patient setup, beam delivery and dose calculation.") },
      { kind: "biology", text: "The biological effect is highest where the beam stops, higher than the standard conversion factor of 1.1 assumes.", source: doi(PAGANETTI_RBE, "Paganetti, Physics in Medicine and Biology 2014", "The proton RBE increases with increasing LETd and thus with depth in an SOBP from ~1.1 in the entrance region, to ~1.15 in the center, ~1.35 at the distal edge and ~1.7 in the distal fall-off (when averaged over all cell lines, which may not be clinically representative).") },
    ],
    nextStep: {
      text: "Monte Carlo dose calculation and measuring the range in the patient, to reduce the margin.",
      status: "available-not-routine",
      source: doi(PAGANETTI_RANGE, "Paganetti 2012", "In these cases Monte Carlo techniques might reduce the range uncertainty by several mm."),
      relatedIds: ["in-vivo-dosimetry", "idea-bio2-let-rbe-ab-selects-protons"],
    },
    buys: {
      text: "A smaller margin would give back part of the advantage protons are chosen for. In the one randomised comparison with modern photons in lung cancer, protons spared the heart but did not reduce severe lung inflammation or local failure.",
      outcome: "not-established",
      source: doi(LIAO, "Liao et al., Journal of Clinical Oncology 2018", "No benefit was noted in RP or LF after PSPT."),
    },
    oversold: "The proton's sharp stopping point is often presented as sparing everything beyond the tumour; in practice planners add several millimetres for range uncertainty, and the randomised lung trial found no reduction in lung inflammation.",
    relatedIds: ["paper-paganetti-range-uncertainties-pmb-2012", "paper-liao-proton-vs-imrt-nsclc-jco-2018", "paper-paganetti-phys-med-biol", "proton-vs-imrt", "bragg-peak", "relative-biological-effectiveness"],
  },

  {
    id: "rt-flash",
    domain: "radiation",
    label: "FLASH: radiotherapy in a fraction of a second",
    technologyIds: ["flash-rt", "flash-research-accelerators"],
    metric: "Dose rate, in Gy per second: FLASH is at least 40 Gy/s, against about 0.03 Gy/s conventionally",
    today: {
      value: "Feasible in 10 people with painful bone metastases, single 8 Gy dose of proton FLASH, side effects consistent with conventional radiotherapy",
      context: "FAST-01, the first human proton FLASH trial: nonrandomised, 12 treated sites, no comparison arm",
      source: doi(FAST01, "Mascia et al., FAST-01, JAMA Oncology 2023", "Adverse events were mild and consistent with conventional radiotherapy."),
    },
    limits: [
      { kind: "biology", text: "The normal-tissue sparing that motivates FLASH was shown in mice.", source: doi(FAVAUDON, "Favaudon et al., Science Translational Medicine 2014", "no complications developed after doses of FLASH below 20 Gy for more than 36 weeks after irradiation") },
      { kind: "physics", text: "The first proton FLASH treatments used a beam that passes through the patient rather than stopping in the tumour, giving up the proton's stopping point to reach the dose rate.", source: doi(FAST01, "FAST-01 2023", "Bone metastases were treated on a FLASH-enabled (≥40 Gy/sec) proton radiotherapy system using a single-transmission proton beam.") },
      { kind: "sampling", text: "Ten patients, palliative doses to limbs, no randomised comparison." },
    ],
    nextStep: {
      text: "Further trials in patients to test whether the sparing seen in animals occurs in people.",
      status: "in-trials",
      source: doi(FAST01, "FAST-01 2023", "These findings support the further exploration of FLASH radiotherapy in patients with cancer."),
    },
    buys: {
      text: "If the effect seen in mice holds in people, fewer side effects at the same tumour dose. That has not been shown in humans.",
      outcome: "not-established",
      source: doi(FAVAUDON, "Favaudon et al. 2014"),
    },
    grade: "insufficient",
    oversold: "FLASH is described as sparing healthy tissue; that has been shown in animals, and the published human proton trial tested feasibility in 10 patients without a comparison arm.",
    relatedIds: ["paper-mascia-jama-oncol", "paper-favaudon-flash-mice-sci-transl-med-2014", "idea-fund-flash-evidence-programme"],
  },

  {
    id: "rt-dose-painting-prostate",
    domain: "radiation",
    label: "Dose painting: a boost to the tumour visible on MRI",
    technologyIds: ["dose-painting"],
    metric: "Dose to the lesion visible on MRI within the prostate, in Gy, while organ-at-risk limits are kept",
    today: {
      value: "Boost up to 95 Gy to the visible lesion on top of 77 Gy to the whole prostate: five-year biochemical disease-free survival 92 against 85 per cent",
      context: "FLAME phase 3 randomised trial, 571 men with intermediate- and high-risk prostate cancer, median follow-up 72 months",
      source: doi(FLAME, "Kerkmeijer et al., FLAME, Journal of Clinical Oncology 2021", "At 5-year follow-up bDFS was 92% and 85%, respectively."),
    },
    limits: [
      { kind: "workflow", text: "The boost is limited by the bladder and rectum, and by how reliably the lesion is seen and drawn on MRI.", source: doi(FLAME, "FLAME 2021", "Organ at risk constraints were prioritized over the focal boost dose.") },
      { kind: "sampling", text: "No difference in prostate cancer-specific or overall survival at this follow-up.", source: doi(FLAME, "FLAME 2021", "We did not observe differences in prostate cancer-specific survival") },
    ],
    buys: {
      text: "Better PSA-defined control without a measurable rise in late side effects or loss of quality of life, in one large randomised trial. Survival benefit not shown.",
      outcome: "established",
      source: doi(FLAME, "FLAME 2021", "Both for late toxicity as health-related quality of life, differences were small and not statistically significant."),
    },
    relatedIds: ["paper-flame-focal-boost-prostate-jco-2021", "target-delineation-variability", "prostate"],
  },
];
