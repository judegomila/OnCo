import type { TermInput } from "@/lib/schema";

// Effect measures and interpretation from the education audit.
export const educationEffectReasoningTerms: TermInput[] = [
  {
    "id": "odds-ratio",
    "kind": "term",
    "name": "Odds ratio",
    "aka": [
      "odds ratio",
      "OR"
    ],
    "tldr": "An odds ratio compares events with non-events in two groups. Odds use a different denominator from probability, so doubling the odds does not generally double the chance.",
    "summary": "An odds ratio divides the odds of an event in one group by the odds in a reference group. Probability uses all assessed outcomes in the denominator; odds compare events with non-events. The two scales can differ substantially when an event is common. An odds ratio does not supply an absolute risk or a causal treatment effect by itself. Its interpretation depends on outcome coding, the comparison, follow-up and model adjustment; a case-control sample does not reveal population prevalence from its case fraction.",
    "asOf": "2026-11-10",
    "links": [
  {
    "label": "CDC: risk ratios and odds ratios",
    "url": "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/section5.html"
  },
  {
    "label": "Statistics notes. The odds ratio.",
    "url": "https://doi.org/10.1136/bmj.320.7247.1468"
  },
  {
    "label": "Confounding and Collapsibility in Causal Inference",
    "url": "https://doi.org/10.1214/ss/1009211805"
  },
  {
    "label": "Hernan and Robins: Causal Inference: What If",
    "url": "https://miguelhernan.org/whatifbook"
  },
  {
    "label": "OncoGuide: odds-ratio (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/effect-measures/odds-ratio.md"
  }
],
    "related": [
      "confidence-interval",
      "hazard-ratio",
      "kaplan-meier-curve"
    ],
    "sections": [
      "drug-discovery"
    ],
    "notes": [
  "Probability counts events among everyone; odds count events relative to non-events. In a fictional bag with 20 red and 80 blue counters, the probability of red is 20/100 = 20%, but the odds are 20/80 = 0.25. For probability p, odds are p/(1 - p). An odds ratio divides one group's odds by the reference group's odds for a defined event. A value above one means higher odds in the numerator group; whether that is favourable depends on whether the event is response or harm. Specify the event, comparator and horizon. When events are rare in both groups the odds ratio can approximate the risk ratio; when they are common it can differ substantially and cannot be applied directly as a multiplier to a percentage.",
  "Logistic regression commonly reports odds ratios. An estimate per one unit of a predictor differs from one per ten units, so its increment and outcome coding matter. Report the adjustment set and confidence interval alongside the estimate. An adjusted odds ratio can differ from the unadjusted value even without confounding, a property called noncollapsibility. A change after adjustment alone therefore does not prove confounding, and adjustment alone does not establish causation.",
  "In a fictional comparison with complete response assessment, 40 of 100 people respond in group A and 20 of 100 in group B. A's response probability uses all 100 people, whereas its response odds use the 60 nonresponders. The response risk ratio is 0.40/0.20 = 2; the odds ratio is (40/60)/(20/80), about 2.67; and the absolute response difference is 20 percentage points. The same counts support three different measures. “2.67 times the odds” does not mean “2.67 times the chance”, and the study design determines whether a causal claim is justified.",
  "Case-control studies deliberately sample cases and controls, so the case fraction in that sample is not population prevalence and cannot simply supply absolute risk. Zero counts can make a raw odds ratio zero, infinite or undefined; estimation method and uncertainty matter. Reversing the comparison takes the reciprocal. For another fictional example, 20 adverse events among 100 people versus 10 among 100 gives a risk ratio of 2 but an odds ratio of (20/80)/(10/90) = 2.25. A response odds ratio is also different from a survival hazard ratio. An assay-based association with response does not quantify the benefit of acting on a biomarker; its model, endpoint and treatment comparison need their own evidence. All counts here are invented."
],
    "category": "Methods and models",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "cross-trial-comparison",
    "kind": "term",
    "name": "Cross-trial comparison",
    "aka": [
      "cross-trial comparison",
      "indirect treatment comparison"
    ],
    "tldr": "Results from separate studies can differ because the people, care or measurements differ. Comparing their headline percentages does not by itself show which treatment works better.",
    "summary": "A comparison between separate studies must account for differences in participants, treatment, background care, endpoints, clocks and follow-up. Randomisation protects the comparison within a trial; it does not randomise participants between unrelated trials. Formal indirect comparisons can retain within-trial contrasts through a common comparator, but depend on compatible effect modifiers and methods. A higher headline percentage in one study is insufficient to rank treatments.",
    "asOf": "2026-11-10",
    "links": [
  {
    "label": "The results of direct and indirect treatment comparisons in meta-analysis of randomized controlled trials.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9250266/"
  },
  {
    "label": "Cochrane: network comparisons and transitivity",
    "url": "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-11"
  },
  {
    "label": "FDA: oncology clinical-trial endpoints (2018)",
    "url": "https://www.fda.gov/media/71195/download"
  },
  {
    "label": "OncoGuide: cross-trial-comparison (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/reasoning-tools/cross-trial-comparison.md"
  }
],
    "related": [
      "confidence-interval",
      "hazard-ratio",
      "kaplan-meier-curve"
    ],
    "sections": [
      "drug-discovery"
    ],
    "notes": [
  "A higher percentage in one paper is a reason to examine its study, rather than proof that its treatment is better. Randomisation protects comparisons within a trial, not between separately conducted trials. Comparing their experimental arms discards that protection. Disease burden, biomarker assay and threshold, prior treatment, background care, dose, endpoint rules, analysis population and follow-up can differ. Formal indirect comparison through a common comparator preserves each trial's treatment-versus-control contrast but still requires compatible questions and methods. Pooling active arms across trials is prone to bias, and even an adjusted indirect estimate remains less secure than a suitable direct comparison (Bucher and colleagues, 1997). Network meta-analysis adds a transitivity assumption: important effect modifiers must be sufficiently comparable across the network. A shared drug name or statistical agreement cannot establish that unmeasured compatibility. Similar endpoint labels can hide different definitions: a clinical benefit rate may include different durations of stable disease. Adjustment for measured differences does not remove every bias, and lower hazard ratios against different comparators cannot automatically rank treatments.",
  "Two fictional single-arm studies each enrol 100 people with the same response definition, assessment period and complete denominator. In the favourable baseline group, A has 40 responses among 80 people (50%) and B has 12 among 20 (60%). In the other group, A has 4/20 (20%) and B 24/80 (30%). Overall, A has 44% response and B 36%, despite B's higher rate in both groups. A enrolled an 80/20 mixture of the two groups, while B enrolled 20/80. Composition reverses the headline ranking. This arithmetic does not establish that B is superior: people were not randomised between studies, and one measured feature cannot resolve every difference.",
  "A fictional vaccine report of 90% recurrence-free at two years in selected postoperative patients cannot be ranked against 30% objective response in a different advanced-disease drug study. Immune response, pathological response, imaging response and survival are different outcomes in different settings. A comparative effect estimate needs a shared clinical question and defensible design. For time-to-event results, align the event definition, origin, assessment schedule, cutoff and follow-up as well as population and care. FDA's December 2018 endpoint guidance warns that external survival comparisons can reflect selection, imaging and supportive-care differences. Neither fictional example certifies an actual indirect comparison."
],
    "category": "Methods and models",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "denominators-and-conditional-probability",
    "kind": "term",
    "name": "Denominators and conditional probability",
    "aka": [
      "conditional probability",
      "denominator"
    ],
    "tldr": "A percentage answers a question about a particular group. Name that group before interpreting the number, and keep unknown outcomes separate from measured non-response.",
    "summary": "A proportion identifies an outcome within a defined group. The denominator might be everyone enrolled, everyone treated, people with an evaluable scan, or only people with a recurrence; those answer different questions. Conditional probability makes the specified group explicit and is not a statement of causation. Repeated measurements do not create new independent people. Unknown outcomes and incomplete follow-up require explicit handling rather than being silently treated as measured non-response.",
    "asOf": "2026-11-10",
    "links": [
  {
    "label": "Hernan and Robins: Causal Inference: What If",
    "url": "https://miguelhernan.org/whatifbook"
  },
  {
    "label": "CONSORT 2025: explanation and elaboration",
    "url": "https://www.bmj.com/content/389/bmj-2024-081124"
  },
  {
    "label": "FDA: oncology clinical-trial endpoints (2018)",
    "url": "https://www.fda.gov/media/71195/download"
  },
  {
    "label": "OncoGuide: denominators-and-conditional-probability (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/reasoning-tools/denominators-and-conditional-probability.md"
  }
],
    "related": [
      "confidence-interval",
      "hazard-ratio",
      "kaplan-meier-curve"
    ],
    "sections": [
      "drug-discovery"
    ],
    "notes": [
  "“Half had a response” is incomplete until the counted group is named. The numerator counts observations meeting the event rule; the denominator identifies the relevant group or observation amount. Conditional probability P(A | B) means the probability of A among those satisfying B, with P(A | B) = P(A and B)/P(B) when P(B) is positive. It is undefined if that conditioning probability is zero. “Given” does not mean “caused by”, and the probability of a positive test among people with disease differs from the probability of disease among people with a positive test. People, lesions, blood draws and wells supply different denominators. Events per person-time are a rate, not a simple probability; repeated samples do not become independent patients. A group defined by treatment response may also be selected by underlying biology, so a conditional frequency does not show that the treatment caused the difference. A changed proportion needs its reference proportion attached, because percentages and percentage points answer different questions.",
  "A fictional study enrols twenty people, six never receive the product, fourteen are treated, ten have evaluable scans and five meet the response rule. The observed response proportions are 5/20 = 25% among enrolled people, 5/14, about 35.7%, among treated people, and 5/10 = 50% among those with evaluable scans. The scan-evaluable group is nested within the treated group, which is nested within enrolment. Five other evaluable scans did not meet the response rule; four treated people lack evaluable scans and six were untreated, with no response outcomes supplied for those groups. Calling them confirmed nonresponders would add an assumption. A protocol may classify missing assessments as nonresponse, but that rule and its sensitivity analyses should be reported explicitly.",
  "In a separate complete fictional cohort of 100 people, twenty recur and five of those have brain involvement. Brain involvement is 5/20 = 25% among those with recurrence and 5/100 = 5% in the original cohort. Neither is a personal forecast. In another example with forty enrolled, thirty treated, twenty evaluable and eight responses, 8/20 = 40% describes the evaluable group, whereas 8/40 = 20% describes observed responders among everyone enrolled without establishing the other outcomes. Incomplete follow-up also means recorded events divided by enrolment may not estimate risk at a chosen time; survival or competing-risk methods address defined questions under their assumptions. Safety and efficacy tables can use different analysis sets, and biomarker subgroups or later landmarks change who contributes. Multiple reports from the same participants add no independent people. Exclusion because progression prevented assessment can itself affect interpretation."
],
    "category": "Methods and models",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "population-versus-individual-risk",
    "kind": "term",
    "name": "Population versus individual risk",
    "aka": [
      "population risk",
      "individual risk",
      "personal risk"
    ],
    "tldr": "A group event frequency does not determine one person's future. A personal probability estimate needs a suitable model, relevant inputs and evaluation in the setting where it will be used.",
    "summary": "An observed group frequency describes a specified outcome, population, treatment context and time horizon. A probability estimate for an individual adds a prediction model and relevant inputs, with uncertainty. Ranking people well does not establish accurate probabilities, and performance in one hospital, subgroup or treatment era does not establish performance elsewhere. A model predicting outcomes under existing care also does not automatically estimate the benefit of changing that care.",
    "asOf": "2026-11-12",
    "links": [{"label":"NCI: understanding cancer prognosis","url":"https://www.cancer.gov/about-cancer/diagnosis-staging/prognosis"},{"label":"TRIPOD-Cluster: model evaluation across settings","url":"https://www.bmj.com/content/380/bmj-2022-071058"},{"label":"Hernan and Robins: Causal Inference: What If","url":"https://miguelhernan.org/whatifbook"},{"label":"OncoGuide: population-vs-individual-risk (pinned teaching source)","url":"https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/reasoning-tools/population-vs-individual-risk.md"},{"label":"Collins et al.: TRIPOD+AI prediction-model reporting guidance (2024)","url":"https://doi.org/10.1136/bmj-2023-078378"},{"label":"ICH E9(R1): estimands, intercurrent events and sensitivity analysis (May 2021)","url":"https://www.fda.gov/media/148473/download"}],
    "related": [
      "confidence-interval",
      "hazard-ratio",
      "kaplan-meier-curve"
    ],
    "sections": [
      "drug-discovery"
    ],
    "notes": ["Population risk describes a defined group's outcomes, such as first recurrence by five years after surgery among people receiving specified care. An individual prediction applies a model and assumptions to one person's characteristics. Neither precise printing nor more biomarkers establishes that the estimate fits the situation. The model may omit relevant biology, use imperfect measurements or reflect another treatment era. Calibration asks whether groups assigned similar probabilities experience approximately the corresponding outcome frequencies; discrimination asks whether the model ranks outcomes well. Good ranking does not ensure accurate probabilities. Evaluation outside the development data is important, but performance can still vary by hospital, treatment context or subgroup. Model name and version, required inputs, missing-value rules, population, treatment, endpoint and horizon determine what the probability means, with uncertainty around performance measures.","In a fictional fully followed cohort of 100 people, twenty events by five years give a group proportion of 20%. That does not mean each person experiences one fifth of an event or identify who will have it. Suppose a model assigns 10% risk to a particular profile. About ten events among 100 comparable people in an informative independent evaluation would support calibration near that prediction, without certifying every subgroup or a different treatment sequence. Multiplying the cohort's 20% by a published marker hazard ratio and a treatment hazard ratio does not produce a validated personal probability. The ratios may come from different populations, adjusted models, endpoints and clocks, and a hazard ratio is not a fixed-time risk ratio. These examples are invented and supply no personal prognosis.","A model that ranks outcomes well at Hospital A may need evaluation at Hospital B before its printed probabilities can be trusted there, particularly if treatment and follow-up differ. Relevant calibration, outcome definitions, horizon, inputs and uncertainty matter. A post-treatment test cannot simply replace a model's required pretreatment input, or vice versa. Risk under current care is also different from benefit from changing care: outcome prediction alone does not estimate a treatment effect. An uncertain but appropriately evaluated estimate can help a discussion without promising an outcome. A confidence interval for a group parameter is not a range of individual futures, and a narrow subgroup may contain too little information for precise personalisation.","Before using a calculator, record its exact name, version and recalibration; required input definitions, units, specimen dates and missing-value rules; development population, care era and received treatments; and predicted endpoint, origin and horizon. Ask how independent evaluation checked discrimination, calibration, selected cutpoints and uncertainty in the intended setting. TRIPOD+AI covers reporting of regression and machine-learning prediction studies; it is not a quality appraisal tool or proof that acting on a score helps. If a fictional calculator requires a residual postoperative marker but only a pretreatment result exists, do not substitute it or invent a correction with unrelated hazard ratios. An unknown input is not negative, and a printed 85% remains a model estimate rather than a guarantee.","In a fictional study, a negative blood test is associated with favourable five-year outcomes while everyone receives standard treatment. Those data do not establish that stopping treatment after a negative result is safe. The missing question compares the proposed result-guided strategy with the relevant alternative, with matched sampling time, population, event, uncertainty and follow-up. Pretreatment, on-treatment and surgical samples describe different states. A later landmark includes only people eligible at that time and excludes earlier events; the last sample available during year one is not automatically an early postoperative sample. Analytical reliability, prognosis, treatment-effect prediction and benefit from a test-guided action require distinct evidence."],
    "category": "Methods and models",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  },
  {
    "id": "graph-reading",
    "kind": "term",
    "name": "Reading scientific graphs",
    "aka": [
      "graph reading",
      "figure reading",
      "five-pass graph reading"
    ],
    "tldr": "Read a graph with its caption and methods: identify who was measured, what changed, the outcome, the comparison and the uncertainty. A visible pattern does not supply those missing details.",
    "summary": "A scientific graph needs its caption and methods to identify the population, independent measurement unit, intervention, outcome, comparison and uncertainty. Axis scale, baseline and time origin can change what a visible difference means. Biological units and repeated technical measurements must remain distinct, and different error bars describe different quantities. A plotted association, growth reduction or late survival plateau requires its own interpretation before any claim about causality or patient benefit.",
    "asOf": "2026-11-10",
    "links": [
  {
    "label": "SuperPlots: Communicating reproducibility and variability in cell biology.",
    "url": "https://doi.org/10.1083/jcb.202001064"
  },
  {
    "label": "NIST: graphical techniques",
    "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda33.htm"
  },
  {
    "label": "CONSORT 2025: reporting randomized trials",
    "url": "https://www.bmj.com/content/389/bmj-2024-081123"
  },
  {
    "label": "OncoGuide: reading-a-graph-in-five-passes (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/reasoning-tools/reading-a-graph-in-five-passes.md"
  }
],
    "related": [
      "confidence-interval",
      "hazard-ratio",
      "kaplan-meier-curve"
    ],
    "sections": [
      "drug-discovery"
    ],
    "notes": [
  "Read a graph as an answer to a question before interpreting its shape. Establish who or what contributes independent observations, what intervention was given and when, which outcome and units the axes show, what baseline or control supplies the comparison, and what uncertainty or missing information remains. Entry criteria, dose, measurement site, time origin and follow-up can change the answer. A whole product and one component are different interventions; cell activity, tumour size, recurrence and survival are different outcomes. A mouse-volume graph cannot become a patient-survival result because the plotted separation is large. This five-pass reading habit is a teaching synthesis, not a score certifying a study; an explicitly unreported independent sample count remains useful information.",
  "Biological replicates are independent units relevant to the question, such as donors or animals. Technical repeats measure the same material again: three tubes or ten wells from one donor still represent one donor. Twelve measurements from three donors therefore require an analysis that accounts for repeated measurements, rather than treating all twelve as independent people. Error bars must be defined. Standard deviation describes observation variability, standard error concerns precision of an estimated mean, and a confidence interval follows a specified procedure and assumptions. On logarithmic axes equal distances represent equal ratios; on linear axes they represent equal differences. A truncated axis may emphasise a small difference, so read the numbers as well as the shape. Missing observations are not measured zeros, and a complete caption does not substitute for sound methods.",
  "In a fictional animal experiment, four independent animals contribute to each group. Both groups start with average tumour volume 100 cubic millimetres; at day 28, control averages 1,000 and treated 300. The treated average is 70% below control but three times its starting size: reduced growth relative to control, rather than shrinkage below baseline. Twenty wells from one animal would still represent one independent animal. For a Kaplan-Meier curve, the same reading habit requires event definition, starting clock, censoring and numbers still at risk. A flat late tail based on few observations cannot support a precise late estimate simply because it looks stable."
],
    "category": "Methods and models",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    }
  }
];
