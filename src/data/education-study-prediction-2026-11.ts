import type { TermInput } from "@/lib/schema";

// Source-backed study-design teaching. Fictional examples state their assumptions.
export const educationStudyPrediction202611Terms: TermInput[] = [
  {
    "kind": "term",
    "id": "publication-and-peer-review-status",
    "name": "Publication format and peer-review status",
    "aka": [
      "conference abstract",
      "peer review",
      "preprint",
      "full publication",
      "abstract versus paper",
      "publication version",
      "version card"
    ],
    "tldr": "Whether a claim comes from a conference abstract, a preprint or a full journal article tells you how much of the study you can inspect and what review it has had, but not whether the study is valid.",
    "summary": "Publication format and review status describe what can be inspected and what scrutiny a report has received. A conference abstract, preprint, full article and correction can report different versions of one study. Identify the study and version, read the available methods and match every result to its population, endpoint and data cutoff. Peer review adds scrutiny; it does not establish that every conclusion is correct or independently replicated.",
    "category": "Trials",
    "related": [
      "randomised-trial",
      "trial-protocol",
      "trial-registration",
      "real-world-evidence",
      "n-of-1-trial"
    ],
    "links": [
      {
        "label": "ICMJE: corrections and version control",
        "url": "https://www.icmje.org/recommendations/browse/publishing-and-editorial-issues/corrections-and-version-control.html"
      },
      {
        "label": "CONSORT for reporting randomised trials in journal and conference abstracts: explanation and elaboration (PLOS Medicine 2008)",
        "url": "https://doi.org/10.1371/journal.pmed.0050020"
      },
      {
        "label": "CONSORT 2025: updated guideline for reporting randomised trials (PLOS Medicine)",
        "url": "https://doi.org/10.1371/journal.pmed.1004587"
      }
    ],
    "notes": [
      "A conference abstract or presentation can offer early findings with limited methods; inspect any poster or slides separately. A preprint is a versioned manuscript released before completed journal peer review. A full article usually permits more inspection, including its supplement, protocol and analysis plan, but can still have missing information or exploratory analyses. An abstract may also be the summary of a full article, so its existence does not make evidence conference-only. Editorial peer review, conference selection and independent replication are different forms of scrutiny, and newer does not automatically mean better designed. A study report, news release and commentary are different source types.",
      "Keep the study identifier, document type, date and version, recruited population, denominator, endpoint and starting clock, data cutoff and follow-up, analysis role and location of methods. Check corrections and retractions at the publisher and inspect the affected claim. ICMJE recommends a correction notice detailing changes, a dated updated version and an archive of prior versions. A full paper with an abstract and later correction should be identified as that sequence, not called conference-only. This checking sequence makes limitations visible; it does not certify validity.",
      "Fictional publication example: an early report describes 12 responses among 20 participants, while a later full report includes 30 participants and longer follow-up. Both can be accurate for their cutoffs. Do not combine the early response percentage with the later follow-up as one estimate, or treat overlapping participants as independent confirmation. New methods or comparator details can change interpretation, but publishing a single-group study in full does not create a randomized control group."
    ],
    "asOf": "2026-11-11"
  },
  {
    "kind": "term",
    "id": "case-report",
    "name": "Case report",
    "aka": [
      "case reports",
      "single-patient report",
      "individual patient report",
      "CARE reporting guideline"
    ],
    "tldr": "A case report describes what happened to one person or a few, which can reveal a signal or a harm but cannot show what would have happened under a different treatment.",
    "summary": "A case report documents a clinical course, interventions, outcomes and alternative explanations. It can reveal a signal of benefit or harm without establishing what would have happened under another approach. The CARE reporting guideline includes a timeline, diagnostic assessment, interventions, follow-up, the patient perspective and consent; complete reporting supports appraisal rather than proving treatment causation.",
    "category": "Trials",
    "related": [
      "n-of-1-trial",
      "randomised-trial",
      "real-world-evidence",
      "publication-and-peer-review-status"
    ],
    "links": [{"label":"CARE guidelines: consensus-based clinical case reporting guideline (Deutsches Arzteblatt 2013)","url":"https://doi.org/10.3238/arztebl.2013.0603"},{"label":"CENT 2015: CONSORT extension for reporting N-of-1 trials (BMJ)","url":"https://doi.org/10.1136/bmj.h1738"}],
    "notes": ["A careful case timeline can preserve an unusual experience and generate questions. Published memorable successes do not supply all treated people as a denominator, so they cannot establish a response probability or treatment ranking. Several scans in one person remain observations from one person. A report usually lacks the concurrent counterfactual outcome under another treatment, and even a rigorous individual comparison would not establish the average effect in everyone sharing a cancer label.","Fictional clinical history: treatment A starts, a procedure is added, treatment B starts and a later scan improves. This establishes improvement during that course, not the separate added contributions of the procedure or B. The earlier treatment, procedure and later treatment can have overlapping lasting influences. Drawing overlapping ribbons represents that possibility and ordering only; it supplies no measured effect size or known duration. Documenting experience and planning an interpretable comparison are different routes to evidence.","A testimonial remains an attributed report until its underlying observations can be checked. In an explicitly fictional blog, a person with metastatic cancer adds an off-label medicine to standard chemotherapy and later scans show shrinkage. Accepting those observations as the example's premise establishes improvement during that combination; it does not isolate the added medicine, its safety or how often the result occurs. Record every intervention and measurement on the timeline and ask for a series or trial with all treated participants, failures, follow-up and a suitable comparison. A company video showing three successes has a different meaning if three of five or three of 500 people were treated. Selected successes do not supply the missing denominator or a personal forecast."],
    "asOf": "2026-11-12"
  },
  {
    "kind": "term",
    "id": "meta-analysis",
    "name": "Meta-analysis",
    "aka": [
      "meta-analyses",
      "meta analysis",
      "pooled estimate",
      "random-effects meta-analysis",
      "I-squared",
      "tau-squared"
    ],
    "tldr": "A meta-analysis combines estimates from separate studies with a stated statistical method; it can improve precision, but it cannot repair studies that answer different questions or share the same biases.",
    "summary": "A meta-analysis statistically combines estimates from studies addressing a sufficiently compatible question. It can be part of a systematic review, which explicitly finds, selects and appraises studies; pooling is not compulsory. The result depends on the studies, their biases, effect definitions, model and weights. A precise pooled mean need not describe every setting or an individual person.",
    "category": "Trials",
    "related": [
      "publication-and-peer-review-status",
      "confidence-interval",
      "randomised-trial",
      "real-world-evidence"
    ],
    "links": [{"label":"Higgins, Thompson and Spiegelhalter: a re-evaluation of random-effects meta-analysis (JRSS A 2009)","url":"https://doi.org/10.1111/j.1467-985X.2008.00552.x"},{"label":"Cochrane Handbook chapter 10: analysing data and undertaking meta-analyses","url":"https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-10"},{"label":"PRISMA 2020 statement: reporting systematic reviews (BMJ 2021)","url":"https://doi.org/10.1136/bmj.n71"},{"label":"Specifying a target trial prevents immortal time bias and other self-inflicted injuries in observational analyses","url":"https://doi.org/10.1016/j.jclinepi.2016.04.014"},{"label":"Cochrane Handbook chapter 5: identifying and linking multiple reports of one study","url":"https://training.cochrane.org/handbook/current/chapter-05"}],
    "notes": ["A common-effect model targets one underlying effect, while a random-effects model describes a distribution of study effects and its mean. Weights follow the stated estimator, not simply the largest participant count. Clinical and methodological differences, bias and heterogeneity beyond sampling error need investigation; a random-effects calculation does not remove them or make incompatible studies comparable.","A confidence interval for the mean effect differs from a prediction interval for an underlying effect in another comparable study under the model. Neither is a personal prognosis interval. I-squared estimates the proportion of variability in study estimates associated with heterogeneity rather than sampling error; it is neither the percentage of people helped nor the percentage of studies that are wrong. Tau-squared is between-study effect variance on the chosen scale, such as squared score points or squared log risk ratios. These estimates can be uncertain, especially with few studies, and no I-squared cutoff alone makes pooling safe.","Fictional forest example: five studies compare treatment A minus control on the same 0 to 100 symptom scale at day 30. Their effects are -8, -6, -4, -2 and 0 points, each with standard error 2 and weight 20 per cent, so the square areas are equal. The mean is -4.0 points. With a classical moment variance estimate, Q = 10, I-squared = 60 per cent and tau-squared = 6 squared score points. A normal 95 per cent mean interval is about -6.8 to -1.2; the stated 2009 prediction method, using a t distribution with three degrees of freedom, gives about -13.0 to +5.0. The study intervals, mean diamond and wider prediction interval answer different questions. Five studies are few and these intervals are approximate; a negative mean does not imply a negative effect in every setting.","Retain search dates, eligibility, unique study identities, risk of bias, treatment sequence, event definition, starting clock, horizon, effect scale, model, weights, uncertainty and sensitivity analyses. Abstracts, full reports and follow-up of the same participants are linked reports rather than independently weighted trials. Availability related to findings can leave evidence missing. Pooling observational associations does not create randomization or establish one person's treatment benefit. PRISMA promotes transparent reporting; completing its checklist does not certify validity.","Fictional weighted example: two comparable three-year risk differences are -4 and -8 percentage points with supplied weights 0.75 and 0.25. Their weighted mean is -5 points; these stipulated weights are not claimed precision estimates. Correct arithmetic would still not justify pooling if one study starts at randomization and another selects responders at a later landmark. The eligibility, clock and target question must be compared first.","Before pooling, link abstracts, full reports and later follow-up of the same study using registry identifiers, recruiting centres, recruitment dates, treatments, participant counts and baseline characteristics. Different author lists or sample sizes need not mean different trials: a later cutoff or selected analysis cohort can change the reported number. Conversely, one report can describe more than one study. Cochrane Handbook chapter 5 makes the study, rather than the publication, the unit of interest. Retain useful details from secondary reports without counting the same participants again as independent replication."],
    "asOf": "2026-11-12"
  },
  {
    "kind": "term",
    "id": "controlled-perturbation",
    "name": "Controlled perturbation experiment",
    "aka": [
      "perturbation experiment",
      "vehicle control",
      "positive control",
      "negative control",
      "rescue experiment",
      "mechanism control"
    ],
    "tldr": "A controlled perturbation changes one defined factor in an experiment and compares the response with control conditions, so that the change can be told apart from background, carrier effects and assay failure.",
    "summary": "A controlled perturbation deliberately changes a defined factor and measures the response against appropriate comparison conditions. Vehicle, positive, negative and mechanism controls answer different questions. A reproducible response can support an experimental claim without establishing its proposed mechanism or patient benefit. Baseline growth, timing, dose and the actual unit assigned to treatment matter.",
    "category": "Methods and models",
    "related": [
      "preclinical",
      "in-vitro-in-vivo",
      "cell-line",
      "organoid",
      "placebo"
    ],
    "links": [
      {
        "label": "Hafner et al.: growth rate inhibition metrics correct for confounders in measuring drug sensitivity (Nature Methods 2016)",
        "url": "https://doi.org/10.1038/nmeth.3853"
      },
      {
        "label": "Measuring cancer drug sensitivity and resistance in cultured cells (Current Protocols in Chemical Biology 2017)",
        "url": "https://doi.org/10.1002/cpch.21"
      },
      {
        "label": "The promise and peril of chemical probes",
        "url": "https://doi.org/10.1038/nchembio.1867"
      },
      {
        "label": "What exactly is 'N' in cell culture and animal experiments?",
        "url": "https://doi.org/10.1371/journal.pbio.2005282"
      }
    ],
    "notes": [
      "A vehicle control contains the carrier without the active treatment; an untreated condition asks a different question if the carrier has effects. A positive control checks that the assay can detect a known relevant response, while a negative or non-targeting control estimates background under its design. Another independent way to disrupt the same function can support a mechanism, and a rescue restores a function to test whether that reverses the response here. Off-target effects, incomplete restoration and model context limit interpretation. These are questions for matched model, timing and readout; no one control proves specificity or patient benefit, and agreement between similar readouts is not automatically independent mechanistic confirmation.",
      "Keep what changed, the comparator, concentration or dose range, timing, assignment, readout and units, sample identities, replicate structure and variability. Repeated wells address variation under their preparation and allocation; independently obtained biological samples address another source of variation. Many wells from one tumour do not become independent patients, and repetition or a small p-value does not repair a missing comparison. A two-drug experiment needs vehicle, both single drugs and the combination. A larger combination effect than either single drug is not automatically synergy; that claim needs a stated reference model.",
      "Fictional direct counts: vehicle-treated cells increase from 100 to 200 while drug-treated cells remain at 100. The endpoint drug count is half the vehicle count without measured net decline from the starting count, so calling it 50 per cent killing overstates the observation. Slower growth, death and a molecular change require their own readouts; direct death or recovery measurements could address further questions. Hafner and colleagues showed that conventional IC50 and maximal-effect measures depend on cell divisions during an assay and developed growth-rate metrics to address that dependence. A real experimental response does not by itself establish the responsible target or clinical benefit."
    ],
    "asOf": "2026-11-11"
  },
  {
    "kind": "term",
    "id": "false-discovery-rate",
    "name": "False discovery rate",
    "aka": [
      "FDR",
      "Benjamini-Hochberg procedure",
      "BH procedure",
      "q-value",
      "FDR-adjusted p-value"
    ],
    "tldr": "The false discovery rate is the expected fraction of false findings among the findings a procedure selects, counted as zero when nothing is selected; it describes the shortlist as a set, not any one result.",
    "summary": "False discovery rate is the expected proportion of false rejections among all rejections made by a multiple-testing procedure, taking the proportion as zero when none are made. It describes repeated use of that procedure under its assumptions. It is not the probability that each selected finding is false, a guaranteed false fraction in one list or evidence of biological importance or patient benefit.",
    "category": "Methods and models",
    "related": [
      "p-value",
      "statistical-significance",
      "ppv",
      "preclinical",
      "prespecified-vs-post-hoc"
    ],
    "links": [
      {
        "label": "Benjamini and Hochberg: controlling the false discovery rate (Journal of the Royal Statistical Society B 1995)",
        "url": "https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
      },
      {
        "label": "Benjamini and Yekutieli: false discovery rate control under dependency (Annals of Statistics 2001)",
        "url": "https://doi.org/10.1214/aos/1013699998"
      }
    ],
    "notes": [
      "Write V for false rejections and R for all rejections: the false discovery proportion is V/R, defined as zero when R is zero, and FDR is its expectation. Family-wise error is the probability of at least one false rejection; the two coincide when every null hypothesis is true but generally differ otherwise. Benjamini-Hochberg sorts all m valid p-values, compares rank i with (i/m)q, finds the largest passing rank and selects everything through it. The original control result assumes independence; positive-dependence extensions and procedures for broader dependence have their own conditions. Correlation is not permission to ignore the procedure's assumptions.",
      "Fictional Benjamini-Hochberg examples use target q = 0.05. For five sorted p-values 0.001, 0.008, 0.026, 0.080 and 0.200, rank bounds are 0.01, 0.02, 0.03, 0.04 and 0.05; rank 3 is the largest passing rank, selecting the first three. For three values 0.018, 0.030 and 0.060, bounds are about 0.0167, 0.0333 and 0.05; rank 1 fails its individual comparison but rank 2 passes, so the first two are selected. Do not stop at the first failure. The two illustrative plots use different labelled vertical ranges and test counts. Selection assigns neither finding a five per cent false probability.",
      "Keep the complete hypothesis family and valid p-values, target, procedure and dependence assumptions, then report the selected set or adjusted values under that method. Correcting separate families and combining their hits does not automatically control the combined list. Q-values and adjusted p-values can name different calculations, so identify the actual method. Gene-, peptide- and protein-level identification claims also have different units; control at one level does not automatically transfer to another. The fraction of diagnostic positive calls that are false, one minus PPV, is a different quantity from the expected false-rejection fraction of a multiple-testing procedure. Omics selection prioritizes further investigation; it does not identify which hit is false or establish clinical utility."
    ],
    "asOf": "2026-11-11"
  }
];
