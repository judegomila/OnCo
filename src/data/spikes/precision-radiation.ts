import type { EntityInput, PaperInput, TermInput } from "@/lib/schema";

/**
 * Precision in radiotherapy delivery: the records the precision matrix (src/data/precision-matrix/radiation.ts)
 * needed and the corpus did not hold.
 *
 * Most of the technology side already existed and is tagged `precision` in its own file rather than restated here:
 * imrt-igrt, sbrt, proton-therapy, mr-linac and flash-rt (technologies.ts); radiosurgery-srs, adaptive-radiotherapy,
 * surface-guided-radiotherapy, respiratory-motion-management, dose-painting and intensity-modulated-proton-therapy,
 * with the terms planning-target-volume, deep-inspiration-breath-hold and fiducial-markers (radiation-wave1.ts);
 * auto-contouring-ai (supporting.ts); patient-positioning-surface-guidance-systems and
 * respiratory-gating-tumour-tracking-systems (machines-wave2.ts); and the terms sbrt-term, imrt-term and
 * stereotactic-radiosurgery (terms-jargon.ts). The trial and review papers that were already in the corpus
 * (MIRAGE as paper-kishan-jama-oncol, FAST-01 as paper-mascia-jama-oncol, AAPM Task Groups 76 and 302 as
 * paper-keall-med-phys and paper-al-hallaq-med-phys, the proton RBE review as paper-paganetti-proton-rbe-ijrobp-2014) are
 * linked, not repeated.
 *
 * What is new: two terms the matrix rests on and the corpus had no record of (proton range uncertainty, and
 * variation between clinicians in drawing the target), and the papers behind the rows that were missing. Every
 * identifier was resolved through Europe PMC on 20 October 2026 and every figure is read from the indexed abstract,
 * or, for the proton range paper, from the full text in PubMed Central. Where the abstract does not state something,
 * the record does not either.
 *
 * Physical precision and clinical benefit are kept apart throughout: a smaller margin, a steeper dose gradient or a
 * sharper image is a physical fact, and what it does for a patient is a separate claim that needs its own trial.
 * UK spelling. Registered in src/data/index.ts as precisionRadiation.
 */

const asOf = "2026-10-20";
const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
const pubmed = (pmid: string) => ({ label: `PubMed ${pmid}`, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const TAGS = ["precision", "radiation"];
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, sections: ["radiation"], ...x, tags: [...TAGS, ...(x.tags ?? [])] });
type T = Omit<TermInput, "kind" | "asOf">;
const term = (x: T): TermInput => ({ kind: "term", asOf, sections: ["radiation"], ...x, tags: [...TAGS, ...(x.tags ?? [])] });

// =============================================================================
// TERMS
// =============================================================================
const terms: TermInput[] = [
  term({ id: "proton-range-uncertainty", name: "Proton range uncertainty and the range margin", category: "Treatment jargon",
    aka: ["range uncertainty", "proton range uncertainty", "range margin"],
    tldr: "A proton beam stops at a depth that cannot be predicted exactly, so planners deliberately aim it a few millimetres past the tumour. At one leading centre the allowance is 3.5 per cent of the beam's range plus 1 millimetre, which for a beam reaching 20 centimetres into soft tissue means overshooting by about 8 millimetres.",
    summary: "The main physical attraction of protons is that they stop: the dose peaks at the end of the track and falls almost to nothing beyond it. Where exactly the track ends depends on the stopping power of every tissue the beam passes through, which is estimated from the planning CT scan, and on set-up, anatomy on the day, beam delivery and the dose calculation. Each of these carries an error, and together they are called range uncertainty.\n\nPlanners protect the target by extending the beam's range by a margin. Paganetti's 2012 review gives the recipes in use at the time: 3.5 per cent of the range plus 1 millimetre at the Massachusetts General Hospital, 3.5 per cent plus 3 millimetres at MD Anderson, Loma Linda and the University of Pennsylvania, and 2.5 per cent plus 1.5 millimetres at the University of Florida. The MGH recipe goes back to estimates made with early-1980s CT. The review calls the resulting 8 millimetre overshoot for a 20 centimetre field 'quite substantial', and estimates that Monte Carlo dose calculation could reduce range uncertainty by several millimetres in complex geometry.\n\nThe margin matters because it spends part of the advantage protons are chosen for. Tissue just beyond the target receives dose the plan was built to avoid, and the biological effect at the end of the track is itself higher than the standard conversion factor assumes (see relative-biological-effectiveness).",
    technologies: ["proton-therapy", "intensity-modulated-proton-therapy", "proton-arc-therapy", "in-vivo-dosimetry"],
    terms: ["bragg-peak", "relative-biological-effectiveness", "linear-energy-transfer", "planning-target-volume"],
    keyPapers: ["paper-paganetti-range-uncertainties-pmb-2012", "paper-liao-proton-vs-imrt-nsclc-jco-2018", "paper-paganetti-proton-rbe-ijrobp-2014"],
    related: ["idea-bio2-let-rbe-ab-selects-protons", "radiation-roadmap"],
    links: [doi("10.1088/0031-9155/57/11/R99", "Paganetti, Range uncertainties in proton therapy and the role of Monte Carlo simulations (Physics in Medicine and Biology 2012)"), { label: "Full text in PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3374500/" }] }),

  term({ id: "target-delineation-variability", name: "Variation between clinicians in drawing the radiotherapy target", category: "Treatment jargon",
    aka: ["delineation variability", "contouring variability", "inter-observer variability in contouring", "target volume delineation"],
    tldr: "Before a radiotherapy plan can be made, a doctor draws the tumour and the organs around it on the planning scan, and two doctors given the same scan do not draw the same outline. A 2016 review found 119 studies measuring this across every major cancer site, and only one in five checked what the differences did to the dose.",
    summary: "Every plan starts with outlines: the visible tumour, the region thought to hold microscopic spread, and the organs to protect. The outlines are drawn by hand or by software and approved by a clinician, and they are the one input every later step trusts. A margin added afterwards for set-up error and movement does not correct an outline that missed tumour or included healthy tissue: the same outline is used at every session, so its error is repeated each time.\n\nVinod and colleagues reviewed studies published from 2000 to 2014 that compared outlines drawn by more than two observers. They found 119, covering all major tumour sites, most often of the clinical and gross target volumes, with a median of seven participants. The studies used such varied measures that their results could not be pooled; 68 per cent reported a statistical analysis and 21 per cent reported what the variation did to the dose. The review proposed a common framework for future studies.\n\nApproaches to reducing it include contouring guidelines, peer review of outlines before treatment, imaging the target with MRI or PET alongside CT, and AI auto-contouring, which NICE allowed into NHS use in 2023 on condition that a professional reviews every outline and evidence continues to be collected.",
    technologies: ["auto-contouring-ai", "imrt-igrt", "adaptive-radiotherapy", "dose-painting"],
    terms: ["planning-target-volume", "organs-at-risk"],
    keyPapers: ["paper-vinod-delineation-uncertainty-review-radiother-oncol-2016", "paper-van-herk-ptv-margin-recipe-ijrobp-2000"],
    related: ["radiation-roadmap"],
    links: [doi("10.1016/j.radonc.2016.09.009", "Vinod et al., Uncertainties in volume delineation in radiation oncology: a systematic review (Radiotherapy and Oncology 2016)"), { label: "NICE HTG695: AI technologies to aid contouring for radiotherapy treatment planning (2023)", url: "https://www.nice.org.uk/guidance/htg695/chapter/1-Recommendations" }] }),
];

// =============================================================================
// PAPERS
// =============================================================================
const papers: PaperInput[] = [
  p({ id: "paper-van-herk-ptv-margin-recipe-ijrobp-2000", name: "The probability of correct target dosage: dose-population histograms for deriving treatment margins in radiotherapy",
    tldr: "The paper behind the margin most radiotherapy departments add around a target. It showed that errors repeated every day matter far more than errors that vary day to day, and turned that into a formula: a margin of 2.5 times the systematic error plus 0.7 times the random error.",
    summary: "Van Herk and colleagues described mathematically what set-up and movement errors do to the dose a target receives across a population of patients. They separated errors made once, in preparing the treatment (systematic), from errors that vary at each session (random). Random errors blur the dose a little for many patients; the same size of systematic error shifts the whole dose distribution and leaves some patients badly underdosed.\n\nFrom this they derived a recipe. To give at least 95 per cent of the prescribed dose to the whole clinical target volume in 90 per cent of patients, the margin should be 2.5 times the standard deviation of systematic errors plus 1.64 times that of random errors combined with the beam penumbra, which for a typical penumbra simplifies to 2.5 Sigma plus 0.7 sigma. The authors call it a lower limit, because it leaves out rotations and changes of shape.",
    journal: "International Journal of Radiation Oncology, Biology, Physics", year: 2000, doi: "10.1016/S0360-3016(00)00518-6", pmid: "10863086",
    authors: "van Herk M, Remeijer P, Rasch C, Lebesque JV.", paperType: "methods", changedPractice: true,
    findings: ["To give at least 95 per cent of the dose to the clinical target volume in 90 per cent of patients, the margin is 2.5 times the standard deviation of systematic (preparation) errors plus 1.64 times that of random (execution) errors combined with the penumbra, minus 1.64 times the penumbra's standard deviation.", "For a penumbra standard deviation of 3.2 mm the recipe simplifies to 2.5 Sigma + 0.7 sigma.", "The same level of systematic error leads to a much larger underdosage for some patients than random error does."],
    whatItMeans: "In the recipe a systematic error, one repeated at every session, costs about three and a half times as much margin as a random error of the same size, so reducing systematic error is the larger lever for shrinking the margin.",
    caveats: ["The recipe excludes rotational errors and shape deviations, and the authors describe it as a lower limit for safe radiotherapy.", "It is a model of dose to a population, not a trial of patient outcomes."],
    terms: ["planning-target-volume", "target-delineation-variability"], technologies: ["imrt-igrt"], journals: ["ijrobp"],
    links: [doi("10.1016/S0360-3016(00)00518-6", "IJROBP 2000"), pubmed("10863086")] }),

  p({ id: "paper-vinod-delineation-uncertainty-review-radiother-oncol-2016", name: "Uncertainties in volume delineation in radiation oncology: a systematic review and recommendations for future studies",
    tldr: "A review of 119 studies in which several clinicians drew the same radiotherapy targets. The studies measured the disagreement in so many different ways that they could not be combined, and only 21 per cent checked what it did to the dose.",
    summary: "Vinod, Jameson, Min and Holloway searched Medline and PubMed for studies published in English from 2000 to 2014 that compared target or organ outlines drawn by more than two observers. They included 119 studies across all major tumour sites. The clinical target volume (47 studies) and gross tumour volume (38) were the commonest structures studied, with a median of seven participants and nine data sets. Metrics and methods of analysis varied considerably; statistical analysis was reported in 68 per cent of studies and dosimetric consequences in 21 per cent. The authors proposed a framework for conducting and reporting future studies.",
    journal: "Radiotherapy and Oncology", year: 2016, doi: "10.1016/j.radonc.2016.09.009", pmid: "27729166",
    authors: "Vinod SK, Jameson MG, Min M, Holloway LC.", paperType: "review", participants: 119,
    findings: ["119 studies covering all major tumour sites were included.", "The clinical target volume (47 studies) and gross tumour volume (38) were most commonly contoured; the median number of participants was 7 (range 3 to 50).", "Statistical analysis was reported in 68 per cent of studies and dosimetric consequences in 21 per cent."],
    whatItMeans: "Variation between clinicians in drawing the target is one of the largest errors in radiotherapy and one of the least measured in terms of what it does to patients. The field has studied whether outlines differ far more than whether the differences matter.",
    caveats: ["Covers studies to 2014, before AI auto-contouring was in clinical use.", "Because the studies used different metrics, the review gives no pooled size for the variation.", "The participants count here is the number of studies reviewed, not of patients."],
    terms: ["target-delineation-variability", "planning-target-volume", "organs-at-risk"], technologies: ["auto-contouring-ai"], journals: ["radiotherapy-and-oncology"],
    links: [doi("10.1016/j.radonc.2016.09.009", "Radiotherapy and Oncology 2016"), pubmed("27729166")] }),

  p({ id: "paper-kirkpatrick-srs-margin-trial-ijrobp-2015", name: "Defining the optimal planning target volume in image-guided stereotactic radiosurgery of brain metastases: results of a randomized trial",
    tldr: "Brain metastases treated with radiosurgery were randomly given a 1 millimetre or a 3 millimetre margin. Control of the treated tumours was similar, the larger margin irradiated more healthy brain, and five of the six biopsy-proven cases of radiation damage were in the 3 millimetre group.",
    summary: "Kirkpatrick and colleagues randomised individual brain metastases in adults with one to three lesions under 4 cm to a 1 mm or a 3 mm uniform expansion of the gross tumour volume drawn on contrast MRI, treated on a linear accelerator with image guidance. Between 2010 and 2012, 49 patients with 80 metastases were treated. The 3 mm group had a significantly higher ratio of treated to visible volume and a larger volume receiving 12 Gy or more. Local recurrence occurred in only 3 lesions (2 in the 1 mm group, P = .51), 6.7 per cent at 12 months. Biopsy-proven radionecrosis alone occurred in 6 lesions, 5 of them in the 3 mm group (P = .10). No significant change in neurocognition or quality of life was seen at three months. The authors concluded that a 1 mm expansion is more appropriate.",
    journal: "International Journal of Radiation Oncology, Biology, Physics", year: 2015, doi: "10.1016/j.ijrobp.2014.09.004", pmid: "25442342",
    authors: "Kirkpatrick JP, Wang Z, Sampson JH, et al.", paperType: "rct", participants: 49,
    findings: ["49 patients with 80 brain metastases were randomised lesion by lesion to a 1 mm or 3 mm margin.", "Local recurrence was seen in 3 lesions (2 in the 1 mm group, P = .51); 6.7 per cent at 12 months.", "Biopsy-proven radionecrosis occurred in 6 lesions, 5 in the 3 mm group (P = .10).", "The volume receiving 12 Gy or more was significantly higher with the 3 mm margin."],
    whatItMeans: "With image guidance, a larger safety margin around a brain metastasis did not buy better tumour control and added healthy brain to the high-dose region. It is one of the few randomised tests of a margin itself.",
    caveats: ["Small, single centre, and randomised by lesion rather than by patient.", "The radionecrosis difference was not statistically significant (P = .10).", "Median overall survival was 10.6 months, which limits how long late effects could be observed."],
    cancers: ["secondary-brain-tumours", "metastatic-cancer"], technologies: ["radiosurgery-srs", "imrt-igrt"], terms: ["stereotactic-radiosurgery", "radiation-necrosis", "planning-target-volume"], journals: ["ijrobp"],
    links: [doi("10.1016/j.ijrobp.2014.09.004", "IJROBP 2015"), pubmed("25442342")] }),

  p({ id: "paper-de-crevoisier-daily-weekly-igrt-ijrobp-2018", name: "Daily versus weekly prostate cancer image guided radiation therapy: phase 3 multicenter randomized trial",
    tldr: "A French trial of 470 men compared checking the prostate's position with imaging before every radiotherapy session against checking weekly. Daily imaging lowered rectal side effects and PSA-defined progression, but the main endpoint, recurrence-free survival, did not differ, and overall survival was worse in the daily group.",
    summary: "De Crevoisier and colleagues randomised 470 men with node-negative localised prostate cancer at 21 centres between 2007 and 2012 to daily image guidance or weekly image guidance (days 1, 2 and 3 and then weekly), with prostate doses of 70 to 80 Gy. At a median follow-up of 4.1 years, recurrence-free survival, the primary outcome, did not differ significantly (hazard ratio 0.81, P = .330). Overall survival was worse in the daily group (hazard ratio 2.12, 95 per cent confidence interval 1.03 to 4.37, P = .042), as was the post hoc other-cancer-free interval (hazard ratio 2.21). Acute rectal bleeding was lower with daily imaging (6 against 11 per cent), late rectal toxicity was lower (hazard ratio 0.71), and the post hoc biochemical progression-free interval was better (hazard ratio 0.45).",
    journal: "International Journal of Radiation Oncology, Biology, Physics", year: 2018, doi: "10.1016/j.ijrobp.2018.07.2006", pmid: "30071296",
    authors: "de Crevoisier R, Bayar MA, Pommier P, et al.", paperType: "rct", participants: 470,
    findings: ["Recurrence-free survival, the primary outcome, did not differ (hazard ratio 0.81, P = .330).", "Late rectal toxicity grade 1 or worse was lower with daily imaging (hazard ratio 0.71, 95 per cent confidence interval 0.53 to 0.96).", "Biochemical progression-free interval was better with daily imaging (hazard ratio 0.45), a post hoc analysis.", "Overall survival was worse in the daily group (hazard ratio 2.12, 95 per cent confidence interval 1.03 to 4.37), and the post hoc other-cancer-free interval was also worse (hazard ratio 2.21)."],
    whatItMeans: "Imaging the prostate before every session is now standard, and this trial supports it for rectal side effects and PSA control. It also shows how hard it is to turn a physical gain in accuracy into a survival result, and that a randomised trial can throw up an unexplained difference that should be reported rather than smoothed over.",
    caveats: ["The primary endpoint was not met; the biochemical and clinical progression results are post hoc.", "The abstract does not explain the overall survival difference; the worse other-cancer-free interval in the daily group points to causes other than prostate cancer, but that is not established.", "Doses of 70 to 80 Gy over several weeks; many men are now treated with fewer, larger fractions, which this trial did not test."],
    cancers: ["prostate"], technologies: ["imrt-igrt"], terms: ["fiducial-markers", "planning-target-volume"], journals: ["ijrobp"],
    links: [doi("10.1016/j.ijrobp.2018.07.2006", "IJROBP 2018"), pubmed("30071296")] }),

  p({ id: "paper-flame-focal-boost-prostate-jco-2021", name: "Focal boost to the intraprostatic tumor in external beam radiotherapy for patients with localized prostate cancer: results from the FLAME randomized phase III trial",
    tldr: "A trial of 571 men with intermediate or high-risk prostate cancer gave half of them an extra dose, up to 95 Gy, to the tumour visible on MRI inside the prostate. After five years 92 per cent of the boosted group were free of PSA relapse against 85 per cent, with no measurable increase in side effects and no difference in survival.",
    summary: "The Focal Lesion Ablative Microboost in Prostate Cancer (FLAME) trial enrolled 571 men with intermediate- and high-risk localised prostate cancer between 2009 and 2015. The standard arm received 77 Gy in 2.2 Gy fractions to the whole prostate. The focal boost arm received an additional simultaneous integrated boost of up to 95 Gy (fractions up to 2.7 Gy) to the lesion visible on multiparametric MRI, with organ-at-risk constraints taking priority over the boost dose. At a median follow-up of 72 months, biochemical disease-free survival was higher with the boost (hazard ratio 0.45, 95 per cent confidence interval 0.28 to 0.71), 92 against 85 per cent at five years. No difference was seen in prostate cancer-specific survival (P = .49) or overall survival (P = .50). Late genitourinary and gastrointestinal toxicity of grade 2 or worse was 23 and 12 per cent in the standard arm and 28 and 13 per cent with the boost, differences that were small and not statistically significant, as were those in quality of life.",
    journal: "Journal of Clinical Oncology", year: 2021, doi: "10.1200/JCO.20.02873", pmid: "33471548",
    authors: "Kerkmeijer LGW, Groen VH, Pos FJ, et al.", paperType: "rct", participants: 571,
    findings: ["Five-year biochemical disease-free survival was 92 per cent with the focal boost and 85 per cent without (hazard ratio 0.45, 95 per cent confidence interval 0.28 to 0.71).", "No difference in prostate cancer-specific survival (P = .49) or overall survival (P = .50).", "Late grade 2 or worse genitourinary toxicity 28 against 23 per cent and gastrointestinal 13 against 12 per cent, not statistically significant."],
    whatItMeans: "The clearest randomised evidence that putting more dose where imaging shows the tumour, rather than spreading it evenly, improves control. It depends on seeing and outlining the lesion on MRI, and on respecting the limits of the bladder and rectum first.",
    caveats: ["The benefit is in biochemical (PSA-defined) control; survival did not differ at this follow-up.", "Conventional fractionation over many weeks; whether the same holds with five-session stereotactic treatment is a separate question.", "Requires a visible lesion on multiparametric MRI and reliable delineation of it."],
    cancers: ["prostate"], technologies: ["dose-painting", "imrt-igrt"], terms: ["target-delineation-variability", "organs-at-risk"], journals: ["jco"],
    links: [doi("10.1200/JCO.20.02873", "Journal of Clinical Oncology 2021"), pubmed("33471548")] }),

  p({ id: "paper-liao-proton-vs-imrt-nsclc-jco-2018", name: "Bayesian adaptive randomization trial of passive scattering proton therapy and intensity-modulated photon radiotherapy for locally advanced non-small-cell lung cancer",
    tldr: "The first randomised comparison of protons with modern photon radiotherapy for lung cancer. Protons spared the heart but not the lung overall, and neither severe lung inflammation nor local failure was reduced: 10.5 per cent against 6.5 per cent for lung inflammation, 10.5 against 10.9 per cent for local failure.",
    summary: "Liao and colleagues randomised patients with stage IIB to IIIB non-small-cell lung cancer having chemoradiotherapy to passive scattering proton therapy or intensity-modulated photon radiotherapy. Each patient had both plans made, and was eligible for randomisation only if both met the same organ dose constraints at the same tumour dose. Compared with photons (92 patients), protons (57) exposed less lung to 5 to 10 Gy(RBE), more lung to 20 Gy(RBE) or more, and less heart at all dose levels. Grade 3 or worse radiation pneumonitis occurred in 6.5 per cent with photons and 10.5 per cent with protons; local failure in 10.9 and 10.5 per cent. The posterior probability of photons being better was 0.54. Both endpoints improved over the course of the trial in both arms.",
    journal: "Journal of Clinical Oncology", year: 2018, doi: "10.1200/JCO.2017.74.0720", pmid: "29293386",
    authors: "Liao Z, Lee JJ, Komaki R, et al.", paperType: "rct", participants: 149,
    findings: ["Grade 3 or worse radiation pneumonitis: 6.5 per cent with photons, 10.5 per cent with protons.", "Local failure: 10.9 per cent with photons, 10.5 per cent with protons.", "Protons exposed less heart at all dose levels from 5 to 80 Gy(RBE) and more lung to 20 Gy(RBE) or more."],
    whatItMeans: "The physical advantage of protons did not, in this trial, translate into less lung damage or better control. It used an older proton technique without pencil-beam scanning, so it does not settle the question for current proton treatment.",
    caveats: ["Passive scattering protons, since largely replaced by pencil-beam scanning.", "Bayesian adaptive design with unequal arms (57 and 92); not powered as a conventional superiority trial.", "Outcomes improved in both arms over time, suggesting a learning curve."],
    cancers: ["nsclc"], technologies: ["proton-therapy", "intensity-modulated-proton-therapy", "imrt-igrt"], terms: ["proton-range-uncertainty", "radiation-pneumonitis"], journals: ["jco"],
    related: ["proton-vs-imrt"],
    links: [doi("10.1200/JCO.2017.74.0720", "Journal of Clinical Oncology 2018"), pubmed("29293386")] }),

  p({ id: "paper-paganetti-range-uncertainties-pmb-2012", name: "Range uncertainties in proton therapy and the role of Monte Carlo simulations",
    tldr: "A review of why the depth at which a proton beam stops cannot be predicted exactly, and how much margin centres add for it. One common recipe, 3.5 per cent of the range plus 1 millimetre, overshoots by about 8 millimetres for a beam reaching 20 centimetres into soft tissue.",
    summary: "Paganetti reviewed the sources of range uncertainty in proton therapy (imaging, patient set-up, beam delivery and dose calculation) and the role of Monte Carlo simulation in reducing it. The full text sets out the margin recipes in use: 3.5 per cent of the range plus 1 mm at the Massachusetts General Hospital, 3.5 per cent plus 3 mm at MD Anderson, Loma Linda and the University of Pennsylvania, and 2.5 per cent plus 1.5 mm at the University of Florida. The MGH recipe originated at the Harvard Cyclotron Laboratory from estimates of CT uncertainty in the early 1980s. The abstract concludes that in complex geometries Monte Carlo techniques might reduce the range uncertainty by several millimetres.",
    journal: "Physics in Medicine and Biology", year: 2012, doi: "10.1088/0031-9155/57/11/R99", pmid: "22571913",
    authors: "Paganetti H.", paperType: "review",
    findings: ["Margin recipes in use: 3.5 per cent + 1 mm (MGH), 3.5 per cent + 3 mm (MD Anderson, Loma Linda, Pennsylvania), 2.5 per cent + 1.5 mm (Florida).", "The 3.5 per cent + 1 mm recipe gives a deliberate overshoot of 8 mm for a 20 cm range field in soft tissue.", "Monte Carlo dose calculation might reduce range uncertainty by several millimetres in complex geometries."],
    whatItMeans: "The millimetres added for range uncertainty are healthy tissue irradiated to protect the target, and they are a large part of why the theoretical advantage of protons over photons is smaller in practice.",
    caveats: ["A 2012 review; centres have since adopted robust optimisation and, in places, Monte Carlo dose calculation, and current recipes may differ.", "The recipes are institutional choices, not trial-derived values."],
    technologies: ["proton-therapy", "intensity-modulated-proton-therapy"], terms: ["proton-range-uncertainty", "bragg-peak"],
    links: [doi("10.1088/0031-9155/57/11/R99", "Physics in Medicine and Biology 2012"), pubmed("22571913"), { label: "Full text in PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3374500/" }] }),

  p({ id: "paper-heartspare-stage-ii-clin-oncol-2017", name: "The UK HeartSpare Study (Stage II): multicentre evaluation of a voluntary breath-hold technique in patients receiving breast radiotherapy",
    tldr: "In ten UK centres, women having radiotherapy for left breast cancer were taught to hold a deep breath during treatment without any machine to help. Ninety-five per cent had a lower heart dose as a result, and the average heart dose fell from 1.8 to 1.1 Gy.",
    summary: "Bartlett and colleagues recruited 101 women in 2014 at 10 UK centres after surgery for early left breast cancer, selected because part of the heart lay inside the 50 per cent dose line on a standard free-breathing plan. Each had a second planning scan in voluntary breath-hold and was treated with the breath-hold plan. Of 93 with primary endpoint data, 88 (95 per cent) achieved a lower mean heart dose. Mean doses for free breathing and breath-hold were 1.8 and 1.1 Gy to the heart and 12.1 and 5.4 Gy to the left anterior descending coronary artery. Daily portal imaging gave population systematic errors of 1.3 to 1.9 mm and random errors of 1.4 to 1.8 mm. Median CT and treatment session times were 21 and 22 minutes.",
    journal: "Clinical Oncology", year: 2017, doi: "10.1016/j.clon.2016.11.005", pmid: "27890346",
    authors: "Bartlett FR, Donovan EM, McNair HA, et al.", paperType: "observational", participants: 101,
    findings: ["88 of 93 women (95 per cent) achieved a reduction in mean heart dose with voluntary breath-hold.", "Mean heart dose 1.8 Gy free breathing against 1.1 Gy breath-hold; left anterior descending artery 12.1 against 5.4 Gy.", "Population systematic error 1.3 to 1.9 mm and random error 1.4 to 1.8 mm."],
    whatItMeans: "Breath-hold for left breast radiotherapy can be delivered without special breathing equipment across ordinary NHS departments, and lowers heart dose in almost everyone selected for it.",
    caveats: ["A single-arm comparison of two plans in the same women, not a randomised trial of heart outcomes.", "Only women with heart inside the 50 per cent isodose on the free-breathing plan were included."],
    cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"], technologies: ["respiratory-motion-management", "surface-guided-radiotherapy"], terms: ["deep-inspiration-breath-hold"], journals: ["clinical-oncology-rcr"],
    links: [doi("10.1016/j.clon.2016.11.005", "Clinical Oncology 2017"), pubmed("27890346")] }),

  p({ id: "paper-smyth-dibh-cardiac-sparing-review-jmrs-2015", name: "The cardiac dose-sparing benefits of deep inspiration breath-hold in left breast irradiation: a systematic review",
    tldr: "A review of ten studies comparing radiotherapy plans for left breast cancer made in deep breath-hold and in free breathing. Breath-hold cut the average heart dose by up to 3.4 Gy, which on published dose-risk estimates corresponds to a 13.6 per cent smaller projected rise in heart disease risk.",
    summary: "Smyth and colleagues searched PubMed to July 2014 for studies comparing mean heart dose between deep inspiration breath-hold and free-breathing plans for left breast cancer. Ten studies provided data; breath-hold reduced the mean heart dose by up to 3.4 Gy. Four studies reported the technique was stable and reproducible day to day. Using current estimates of excess cardiac toxicity from radiotherapy, the authors calculated that a 3.4 Gy reduction is equivalent to a 13.6 per cent reduction in the projected increase in risk of heart disease.",
    journal: "Journal of Medical Radiation Sciences", year: 2015, doi: "10.1002/jmrs.89", pmid: "26229669",
    authors: "Smyth LM, Knight KA, Aarons YK, Wasiak J.", paperType: "review",
    findings: ["Ten studies: breath-hold reduced mean heart dose by up to 3.4 Gy against free breathing.", "Four studies found the technique stable and reproducible daily.", "A 3.4 Gy reduction corresponds to a 13.6 per cent reduction in the projected increase in heart disease risk."],
    whatItMeans: "The heart benefit of breath-hold is a projection from dose: it rests on the dose-risk relationship measured by Darby and colleagues, not on a trial counting heart attacks in women treated with and without breath-hold.",
    caveats: ["Dosimetric studies only; no clinical cardiac outcomes.", "'Up to 3.4 Gy' is the largest reduction among the studies, not the average."],
    cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"], technologies: ["respiratory-motion-management"], terms: ["deep-inspiration-breath-hold"],
    links: [doi("10.1002/jmrs.89", "Journal of Medical Radiation Sciences 2015"), pubmed("26229669")] }),

  p({ id: "paper-favaudon-flash-mice-sci-transl-med-2014", name: "Ultrahigh dose-rate FLASH irradiation increases the differential response between normal and tumor tissue in mice",
    tldr: "The mouse study that started modern FLASH research. Radiation given in a fraction of a second spared the lungs of mice from scarring at doses that scarred them when given at the usual rate, while controlling tumours just as well. It was in mice, and the effect in people has not been shown.",
    summary: "Favaudon and colleagues irradiated mice either with short pulses at 40 Gy per second or more (FLASH) or at the conventional 0.03 Gy per second or less, in single doses. Conventional irradiation at 15 Gy caused lung fibrosis with activation of the TGF-beta cascade, whereas no complications developed after FLASH doses below 20 Gy for more than 36 weeks. FLASH also spared normal smooth muscle and epithelial cells from acute radiation-induced apoptosis. In human tumour xenografts and orthotopic mouse lung tumours, FLASH was as effective as conventional irradiation at repressing tumour growth.",
    journal: "Science Translational Medicine", year: 2014, doi: "10.1126/scitranslmed.3008973", pmid: "25031268",
    authors: "Favaudon V, Caplier L, Monceau V, et al.", paperType: "basic",
    findings: ["Conventional-rate 15 Gy caused lung fibrosis in mice; FLASH below 20 Gy caused no complications for more than 36 weeks.", "FLASH was as efficient as conventional irradiation at repressing tumour growth."],
    whatItMeans: "The reason FLASH is being developed. Whether the sparing seen in mice happens in people, at which doses and in which tissues, is the open question that the first human trials have not yet answered.",
    caveats: ["Mice and single large doses; human radiotherapy is usually given in many smaller fractions.", "The mechanism remains debated."],
    technologies: ["flash-rt", "flash-research-accelerators"], journals: ["science-translational-medicine"],
    links: [doi("10.1126/scitranslmed.3008973", "Science Translational Medicine 2014"), pubmed("25031268")] }),

  p({ id: "paper-open-trial-open-face-masks-sgrt-radiother-oncol-2026", name: "OPEN: optimising patient experience in head and neck radiotherapy, a phase 3 randomised control trial comparing open versus closed face masks",
    tldr: "People having radiotherapy for head and neck cancer were randomly given the standard closed face mask or one of two open masks, with cameras tracking the face during treatment. The open masks were set up as accurately and were significantly better tolerated.",
    summary: "The OPEN trial randomised 230 non-claustrophobic patients having radical head and neck radiotherapy between January 2024 and May 2025, one to one to one, to a standard closed five-point mask without surface guidance, or to an open three-point or open five-point mask with surface-guided radiotherapy. Set-up accuracy was measured with daily cone-beam CT and surface guidance. Inter-fraction shifts differed only in the longitudinal axis, where the closed-mask group had larger shifts than both open-mask groups (P < 0.001); no other axis differed. At the end of treatment, tolerability, overall experience and distress were significantly more favourable in both open-mask groups (p < 0.01). An earlier interim analysis of 56 patients found intrafraction motion within margins of 1.8, 1.7 and 1.3 mm for all mask types.",
    journal: "Radiotherapy and Oncology", year: 2026, doi: "10.1016/j.radonc.2026.111779", pmid: "42731759",
    authors: "Nicholson J, Ryan S, Malone C, et al.", paperType: "rct", participants: 230,
    findings: ["230 patients randomised to a closed mask without surface guidance or one of two open masks with it.", "Set-up accuracy equivalent; the only difference was larger longitudinal shifts with the closed mask (P < 0.001).", "Tolerability, overall experience and distress significantly better with both open masks (p < 0.01)."],
    whatItMeans: "Surface guidance allowed the face mask to be opened without losing set-up accuracy, and patients tolerated the open masks better. It is a gain in patient experience made possible by precision, rather than a gain in cancer control.",
    caveats: ["Claustrophobic patients were excluded, so the people who would gain most were not studied.", "Cancer control and late side effects are not reported in the abstract."],
    cancers: ["head-and-neck"], technologies: ["surface-guided-radiotherapy", "patient-positioning-surface-guidance-systems"], journals: ["radiotherapy-and-oncology"],
    links: [doi("10.1016/j.radonc.2026.111779", "Radiotherapy and Oncology 2026"), pubmed("42731759"), doi("10.1016/j.radonc.2025.110941", "OPEN interim analysis of intrafraction motion (Radiotherapy and Oncology 2025)")] }),
];

export const precisionRadiation: EntityInput[] = [...terms, ...papers];
