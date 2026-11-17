import type { TermInput } from "@/lib/schema";

/**
 * Blood and immune measurement lessons, round 12 (10 November 2026).
 * Registered in the coordinator's audit draft; registration does not establish main or live coverage.
 *
 * Three owners, one per reserved id. Each states a measurement and keeps the denominators apart:
 *  - ctdna-units: a ctDNA number is a quantity with a unit (concentration, fraction, parts per million).
 *  - ctdna-imaging-discordance: a blood molecular call and an imaging result sample different material, regions and times.
 *  - ctdna-monitoring-lead-time: a measured gap between a first positive blood sample and a later event, with its denominator.
 *
 * The audit ledger retains source identities, actual reading depth and source-access limits.
 * Empirical numbers keep their study scope; invented measurement examples are labelled fictional.
 */

const asOf = "2026-11-10";
const t = (x: Omit<TermInput, "kind" | "asOf" | "category"> & { asOf?: string }): TermInput => ({ kind: "term", asOf, category: "Biomarkers", ...x });

export const EDUCATION_BLOOD_IMMUNE_MEASUREMENT_TERMS: TermInput[] = [
  t({
    id: "ctdna-units",
    name: "ctDNA units, fractions and concentrations",
    aka: ["MTM/mL", "mean tumour molecules per millilitre", "ctDNA reporting units", "ctDNA PPM"],
    tldr: "A ctDNA result is a number with a unit. Molecules per millilitre, parts per million and allele fraction answer different questions, so a printed number means nothing until its unit and denominator are known.",
    summary:
      "Circulating tumour DNA (ctDNA) can be reported as a concentration, as a fraction, or as a yes or no call, and the three are not interchangeable. A concentration counts tumour-attributed molecules in a stated volume of plasma. One example is mean tumour molecules per millilitre (MTM/mL), which the I-SPY 2 breast-cancer study of Magbanua and colleagues used for ctDNA across tracked variants. A fraction divides tumour-attributed molecules by a stated total, such as all evaluated alleles at one position (variant allele fraction, VAF) or all evaluated DNA (an estimated tumour fraction). Parts per million (PPM) is a fraction multiplied by one million, so the number is only as meaningful as the fraction it scales: 0.01% is 100 PPM, and 0.00024% is 2.4 PPM, the lowest allele fraction Santonja and colleagues reported for ctDNA detection in breast cancer.\n\n" +
      "Concentration and fraction can move apart. If two equal one-millilitre aliquots each hold the same number of tumour molecules but one holds more background cell-free DNA, the concentration is unchanged and the fraction falls. A detection call and a reliable amount are also different claims, because the detection limit and the quantitation range are validated separately. Nothing here gives a conversion between assays: MTM/mL cannot be turned into PPM from the printed result, and a VAF of 100 PPM at one variant is not a tumour fraction of 100 PPM.",
    wikipedia: "https://en.wikipedia.org/wiki/Circulating_tumor_DNA",
    links: [
      { label: "Magbanua et al., npj Breast Cancer 2021: ctDNA in mean tumour molecules per mL plasma against MRI functional tumour volume", url: "https://doi.org/10.1038/s41523-021-00239-3" },
      { label: "Santonja et al., EMBO Mol Med 2023: tumour-informed and tumour-naive ctDNA assays compared, allele fractions to 2.4 parts per million", url: "https://doi.org/10.15252/emmm.202216505" },
      { label: "FDA, Use of Circulating Tumor DNA for Curative-Intent Solid Tumor Drug Development, November 2024", url: "https://www.fda.gov/media/183874/download" },

    {"label":"Armbruster and Pry, 2008: limit of blank, detection and quantitation","url":"https://pubmed.ncbi.nlm.nih.gov/18852857/"}
  ],
    tags: ["biomarker", "measurement"],
    related: ["ctdna", "cfdna", "ctdna-tumour-fraction", "vaf", "mrd"],
    technologies: ["liquid-biopsy", "mrd-testing"],
    terms: ["ctdna", "cfdna", "vaf"],
    keyPapers: ["paper-santonja-tumour-informed-vs-naive-breast-embo-mol-med-2023"],
    notes: [
  "Method card, what it measures: the quantity an assay states, either a count of tumour-attributed molecules per volume of plasma (a concentration), a share of a named total (a fraction), or a call. How: sequencing or PCR on one finite plasma aliquot, then a calculation the laboratory defines. Keep the unit, the denominator and the assay version attached to every value.",
  "Table, MTM/mL: mean tumour molecules per millilitre of plasma under the assay's own calculation across its tracked features. Boundary: a concentration estimated from tracked features, not the number of cancer cells per millilitre and not a share of anything.",
  "Table, PPM: parts per million, a fraction multiplied by one million, so 1 PPM is 0.0001% and 100 PPM is 0.01%. Boundary: name the fraction being scaled, because 100 PPM of variant alleles, of evaluated DNA and of tumour-attributed molecules are three different claims.",
  "Table, variant allele fraction: the share of evaluated alleles at one position that carry a stated variant. Boundary: it depends on copy number, on which clones carry the variant and on the measurement, and a variant present in a blood-cell clone counts the same way as one from a tumour.",
  "Table, tumour fraction: an estimated share of evaluated DNA attributable to tumour. Boundary: it is a model output that rests on the method and its calibration, and it is not automatically any single variant's VAF.",
  "Fictional arithmetic, concentration against fraction: two equal 1 mL aliquots each hold 4 tumour-attributed molecules. Aliquot A also holds 16 background molecules, so 4 of 20 is 20% and the concentration is 4 molecules per mL. Aliquot B holds 36 background molecules, so 4 of 40 is 10% and the concentration is still 4 per mL. More background lowered the fraction and left the concentration alone. These toy shares are not a VAF, an estimated tumour fraction or MTM/mL.",
  "Fictional arithmetic, rescaling: a VAF of 0.01% at Variant R equals 100 PPM of variant-supporting alleles. That does not make a tumour fraction of 100 PPM, and a second report of 0.2 MTM/mL is a concentration, so 100 and 0.2 cannot be compared or converted without the methods and calibration of both assays.",
  "Method limit, detection against quantitation: a qualifying detection call and a reliable numerical amount have separate validation criteria. A detected value below the validated quantitative range does not support an exact fold change, and extra decimal places do not create precision.",
  "Method limit, finite input: the plasma volume drawn is not the volume or the number of molecules recovered and evaluated. Low molecular counts, changes in background DNA, poor recovery or incompatible calibration all limit comparison across assays, and a printed zero is not a count of zero cancer cells anywhere in the body.",
  "Evidence read: in Magbanua's 84-patient pilot of neoadjuvant treatment, ctDNA in MTM/mL was correlated with MRI functional tumour volume at every time point (Spearman rho 0.42 to 0.49). Santonja's comparison reported allele fractions down to 2.4 PPM for hybrid-capture sequencing of 1,347 to 7,491 tumour-identified mutations and 4.7 PPM for multiplex PCR of 21 to 47 structural variants. Each figure belongs to its assay and cohort.",
  "A trend also needs the collection time, treatment context, assay version and quantitative range. In its November 2024 drug-development guidance, FDA asks for precision, accuracy and detection-limit evaluation across relevant inputs and cut-offs, using representative clinical specimens and appropriately comparable reference material. A printed number below another assay's nominal detection limit does not establish that the other assay would miss that sample: the measured quantity, specimen, input, recovery and calling rules may differ. A reference-material result is not automatically a clinical sensitivity estimate."
,
    "Consider a fictional assay estimating tumour fraction at 6 parts per million (PPM) and then 2 PPM. Both samples are called detected, but the second is below the assay's reliable quantitation range. The printed estimates fall by two-thirds; they do not establish that the cancer volume fell by two-thirds. Retain the qualifying calls and uncertainty, because shedding and background DNA can change the signal. A second method reporting molecules per millilitre cannot simply be placed on this fraction scale. Even a matching unit label does not establish matching calibration. Keeping serial methods and input comparable helps interpretation without removing biological variation.",
    "The blank, detection and quantitation limits answer different questions. The blank limit is the highest apparent analyte concentration expected from replicate samples with no analyte; the detection limit is the lowest concentration reliably distinguished from that background; the quantitation limit is the lowest concentration meeting predefined bias and imprecision goals (Armbruster and Pry, 2008). Quantitation and detection limits may coincide or differ. A qualifying detection below a validated quantitative range supports presence more strongly than an exact fold change. For a read-based variant allele fraction, the denominator is informative reads covering that locus, not cancer cells or plasma volume; keep a molecule-based method's own definition instead."
  ],

"asOf": "2026-11-12"
}),

  t({
    id: "ctdna-imaging-discordance",
    name: "ctDNA and imaging discordance",
    aka: ["blood and imaging discordance", "ctDNA and MRI discordance"],
    tldr: "A blood DNA result and an imaging result can seem to disagree because they sample different material, regions, times and signals. A mismatch is a question to resolve, not a verdict on either test.",
    summary:
      "A circulating tumour DNA (ctDNA) assay looks for tumour-associated features in a finite sample of cell-free DNA. How much tumour DNA reaches the sampled blood varies between lesions, and recovery, background DNA, the features tracked and the assay's detection limit all shape the call. Imaging measures a defined region through a physical signal. Magnetic resonance imaging (MRI) of the breast can report contrast enhancement or the volume of enhancing tissue, which is not a direct count of viable cancer cells. The two tests can therefore differ without either being wrong, and neither automatically replaces the other.\n\n" +
      "They can also share information. In Magbanua and colleagues' pilot of 84 women having neoadjuvant chemotherapy for early breast cancer, ctDNA concentration was correlated with MRI functional tumour volume at all four time points, with Spearman correlations of 0.42 to 0.49, and patients with detectable ctDNA had a higher median volume. Agreement was partial, and adding ctDNA early in treatment to volume-based prediction of pathological complete response gave only a numerical gain that was not statistically significant. ctDNA positivity after treatment added significantly to volume for predicting distant recurrence and death. A mismatch calls for checking dates, assay limits, the imaged region and the exact finding. It does not by itself show a false test or hidden metastatic disease.",
    wikipedia: "https://en.wikipedia.org/wiki/Circulating_tumor_DNA",
    links: [
  {
    "label": "Magbanua et al., npj Breast Cancer 2021: ctDNA and MRI to predict neoadjuvant chemotherapy response and recurrence risk",
    "url": "https://doi.org/10.1038/s41523-021-00239-3"
  },
  {
    "label": "Razavi et al., Nat Med 2019: matched plasma, white-blood-cell and tumour sequencing shows how often plasma variants come from blood cells",
    "url": "https://doi.org/10.1038/s41591-019-0652-7"
  },
  {
    "label": "Diehl et al.: circulating mutant DNA to assess tumour dynamics (2008)",
    "url": "https://doi.org/10.1038/nm.1789"
  }
,
{
  "label": "Schmid et al., 2020: KEYNOTE-522 pathological response assessed at surgery",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32101663/"
}
,
    {"label":"Magbanua et al., 2025: ctDNA and residual cancer burden in 723 high-risk I-SPY2 patients","url":"https://doi.org/10.1038/s41467-025-65432-5"},
    {"label":"NCI: mammography definition","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/mammography"},
    {"label":"NCI: ultrasound definition","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/ultrasound"},
    {"label":"NCI: PET-CT scan definition","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/pet-ct-scan"}
  ,
      {"label":"Vascular contributors to breast MRI enhancement: primary angiogenesis study, 2021","url":"https://doi.org/10.1038/s41523-021-00247-3"},
      {"label":"Formenti et al.: separate clinical, receptor and selected functional observations in lung cancer (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30397353/"},
      {"label":"Han et al.: linking paired receptor identity and single-cell functional phenotype (2014)","url":"https://pubmed.ncbi.nlm.nih.gov/24952902/"}
    ],
    tags: ["biomarker", "measurement"],
    related: ["ctdna", "mrd", "clonal-haematopoiesis", "ctdna-tumour-fraction"],
    technologies: ["liquid-biopsy", "mrd-testing", "mri"],
    terms: ["ctdna", "cfdna", "mrd"],
    cancers: ["breast-hr-positive", "tnbc"],
    keyPapers: ["paper-razavi-cfdna-variant-sources-clonal-haematopoiesis-nat-med-2019"],
    notes: [
  "Method card, what is compared: a sampled molecular signal in plasma and a regional physical signal from a named imaging protocol. Their units, dates and thresholds stay separate, and the comparison is only as good as the date alignment of the two acquisitions.",
  "Table, blood side: input is a blood draw and the plasma and recovered DNA analysed, and testing consumes an aliquot. Output is a qualifying call plus a defined concentration or fraction, read with the assay's detection and quantitation rules. Failure modes are low shedding, finite input, poor recovery and background or blood-cell variants.",
  "Table, imaging side: input is the imaged region and a protocol, and contrast or tracer use depends on the modality. Output is size, volume, uptake or a qualitative finding read against protocol-specific response criteria. Failure modes are artefacts, non-tumour contributions to the signal and technique that differs between visits.",
  "Table, what each cannot tell: blood alone cannot locate a lesion or give a cell count. Imaging alone cannot count viable tumour cells, and enhancement can have more than one tissue cause. Neither agreement nor disagreement shows that a treatment change would help, which is a clinical-utility question.",
  "Evidence read: Magbanua's pilot (84 patients, MTM/mL against MRI functional tumour volume) found correlation at T0 to T3 with rho 0.49, 0.42, 0.42 and 0.43, and its authors call the findings preliminary in a limited cohort needing larger validation. It supports partial agreement and does not set a rule for redirecting treatment.",
  "Interpretation rule, from finite sampling: a plasma aliquot can hold no tumour molecule when the true share is small, so no qualifying ctDNA signal alongside an abnormal MRI region does not show the region is only scar. The converse holds too: a clear image does not exclude tumour DNA in blood. Each result answers only its own question.",
  "Source attribution comes first: a positive plasma variant may come from a blood-cell clone rather than a tumour. In Razavi's paired sequencing, 53.2% of cell-free DNA mutations in 124 people with metastatic cancer and 81.6% in 47 people without cancer had features of clonal haematopoiesis, so a discordant positive needs origin checks before it is read as occult disease.",
  "Half-life, scoped: Diehl and colleagues estimated a ctDNA half-life after surgery of 114 minutes by evaluating one subject whose plasma was sampled at several early times after complete resection in a study of 162 plasma samples from 18 subjects with colorectal cancer (Diehl 2008). That is a single-subject estimate of post-resection clearance in colorectal cancer, not a universal cfDNA half-life, a breast-cancer figure or a blood-draw schedule. DNA release and clearance can change sooner than visible tissue structure, which is a reason to align the dates of the blood and imaging acquisitions.",
  "Use the blood collection date and imaging acquisition date to compare biology, then keep the reporting dates as a separate measure of when the information became available. Imaging does not remove a tissue aliquot for molecular analysis; contrast or tracer use belongs to the specific protocol. Agreement can reflect shared dependence on disease burden and is not two independent proofs of the same mechanism. Combining measurements into a decision rule needs validation of the combination and its intended outcome."
,
"In a fictional early-breast-cancer example, a negative plasma result is not an examination of the breast tumour bed or regional nodes. It cannot by itself establish pathological complete response or validate skipping surgery. Using a result to remove a treatment needs evidence for that decision strategy and its clinical outcomes, beyond showing that an assay can detect a signal. This is an interpretation limit, not a claim that no omission study exists."
,
    "The two-window comparison is about scope. A finite plasma aliquot contains extracellular DNA, of which tumour-derived fragments may be one part; breast MRI observes regional, sequence-dependent features rather than individual cancer cells. Contrast enhancement reflects vascular and contrast-delivery behaviour as well as the acquisition protocol; it is not a one-to-one viable-cell count. In the 84-person I-SPY2 MRI pilot, functional tumour volume summed voxels meeting 70% enhancement about two and a half minutes after contrast, inside a manually drawn box around the lesion. A camera-and-stream analogy illustrates those two sampled views without promising that every tumour sheds DNA. Keep the imaging method visible: mammography uses X-rays, ultrasound uses sound, and PET/CT combines tracer-distribution images with anatomical CT images. A formal response category needs its framework, comparison timepoint and findings outside a selected lesion measurement. None of these measurements is an interchangeable all-body tumour-cell number.",
    "Four patterns illustrate the reading boundary. A smaller lesion and lower detected blood signal mean that both recorded measures fell in their own units, not that pCR or eradication of distant disease is proved. A residual scan finding with undetected blood leaves viability, treatment effects and other causes unresolved. Detected blood with no suspicious finding in the scanned region does not establish the signal's location, full extent or best intervention. If neither shows qualifying evidence, neither has proved zero microscopic disease or justified omitting indicated treatment. These are interpretation examples, not an action algorithm; disagreement alone does not establish pseudoprogression.",
    "In a fictional course, a breast lesion becomes less enhancing, blood changes from detected to not detected, and surgery later finds residual invasive cancer. There is no contradiction: imaging features, a finite molecular sample and removed tissue answer different questions. Only the specified tissue assessment establishes the residual disease in this example. A smaller scan finding and undetected blood can therefore be favourable observations without confirming pCR. Conversely, a later positive blood result with clear regional breast imaging calls for review of sample qualification, origin, dates and clinical context; it is not itself a diagnosis of distant metastasis.",
    "Magbanua and colleagues' 2025 analysis evaluated 723 high-risk I-SPY2 patients across hormone receptor-positive/HER2-negative, triple-negative and HER2-positive subtypes. Combining ctDNA with residual cancer burden refined prognostic groups, but analyses within those groups used smaller subsets, some too small for multivariable adjustment. The authors also found retained patient-specific assay variants in sampled resistant tumours from patients whose post-treatment plasma was negative. These results support studying risk information and shedding; they do not turn negative presurgical blood into tissue pCR or demonstrate that a blood-guided omission strategy improves outcomes.",
      "Adding receptor measurements introduces another question to a blood and imaging comparison. A sequenced clonotype's sampled abundance does not directly measure its antigen, effector activity or total cell count. Even a controlled secretion or killing result belongs to its tested stimulus and targets. Collecting the measurements together does not link a particular receptor to the tumour DNA signal. Retain time, compartment, chain definition, abundance unit, controls and independent target-recognition evidence; combining the results does not make a validated treatment rule.",
      "In a fictional comparison using compatible measurements, tumour DNA is stable or rising in two patterns and falls in two others, while a receptor measure changes little or increases. Stable or rising DNA with little repertoire change raises questions about the tumour, immunity and assay adequacy without diagnosing resistance or mandating a tissue or spatial test. With greater repertoire change it still does not prove a physical barrier or an antigen-specific response that failed. Falling DNA with little repertoire change does not assign the effect to chemotherapy or show that useful immunity is absent. Falling DNA with greater repertoire change does not prove that immune learning caused control. These are sampled observations, not validated best-response categories, proof of clinical benefit or instructions to change treatment."
  ],

"asOf": "2026-11-14"
}),

  t({
    id: "ctdna-monitoring-lead-time",
    name: "Lead time in ctDNA monitoring studies",
    aka: ["ctDNA lead time", "molecular lead time"],
    tldr: "Lead time is the measured gap between a first qualifying positive blood sample and a later clinical event. It depends on who is counted and when tests were done, and it is not extra life.",
    summary:
      "In a ctDNA monitoring study, lead time is the date of a defined later event, such as confirmed clinical recurrence, minus the date of the first qualifying positive blood sample. The definition needs rules: whether recurrence means imaging, pathology or symptoms, whether the blood date is collection or reporting, whether a positive result triggered an extra scan, and whether treatment began on the signal. Blood draws and scans are both intermittent, so the observed gap reflects both schedules. A negative draw at month 3 and a first positive at month 6 do not locate when the signal began.\n\n" +
      "The denominator matters as much as the number. A median taken only over people with both an earlier positive and a later recurrence describes that selected group. It leaves out recurrences with no earlier positive, and people who are positive but have not recurred at the data cutoff have unfinished intervals, which are censored rather than zero or infinite. In García-Murillas and colleagues' prospective breast-cancer study, with blood taken every 3 months in the first year and every 6 months after, ctDNA detection preceded clinical relapse by a median of 10.7 months (95% CI 8.1 to 19.1) in the combined cohort of 144, and ctDNA found distant extracranial relapse in 22 of 23 patients but brain-only relapse in 1 of 6. In the c-TRAK TN trial, ctDNA was detected in 27.3% by 12 months and 7 patients relapsed without prior detection. A longer lead time shows earlier detection. It does not show that acting on the signal helps people live longer, which is the separate lead-time bias problem.",
    wikipedia: "https://en.wikipedia.org/wiki/Lead_time_bias",
    links: [
      { label: "García-Murillas et al., JAMA Oncol 2019: molecular relapse detection in early-stage breast cancer", url: "https://doi.org/10.1001/jamaoncol.2019.1838" },
      { label: "Turner et al., Ann Oncol 2023: c-TRAK TN, ctDNA surveillance in triple-negative breast cancer", url: "https://doi.org/10.1016/j.annonc.2022.11.005" },
      { label: "FDA, Use of Circulating Tumor DNA for Curative-Intent Solid Tumor Drug Development, November 2024", url: "https://www.fda.gov/media/183874/download" },
    ],
    tags: ["biomarker", "measurement", "evidence"],
    related: ["lead-time-bias", "ctdna", "mrd", "continuous-ctdna-monitoring", "mrd-testing"],
    technologies: ["liquid-biopsy", "mrd-testing"],
    terms: ["ctdna", "mrd", "lead-time-bias"],
    cancers: ["breast-hr-positive", "tnbc"],
    keyPapers: ["paper-garcia-murillas-molecular-relapse-detection-jama-oncol-2019", "paper-turner-c-trak-tn-ctdna-pembrolizumab-ann-oncol-2023"],
    notes: [
  "Method card, what it measures: the difference between two prespecified event dates after the assay's qualifying rule, in days or months, with the number of evaluable people, the distribution and its uncertainty. It needs serial blood tests and clinical follow-up, and a draw schedule is part of the result.",
  "Table, thresholds and rules: the positive and confirmation criteria for the blood test, the definition of the clinical event, and which date counts for each. Failure modes are missing visits, scans triggered by a positive result, selection into the group, short follow-up and a course changed by intervention.",
  "Table, what it cannot tell: added survival, a personal recurrence date, the biological onset of disease, or a ranking of assays. Medians from different cohorts, sites of recurrence, draw schedules and confirmation rules are not comparable with one another.",
  "Fictional arithmetic: six people recur at month 12 and are drawn every 2 months. A to D have first positives giving gaps of 2, 4, 6 and 8 months. E and F have no earlier positive. The median of 2, 4, 6 and 8 is (4 + 6) / 2 = 5 months among four people. It leaves out E and F, so it is not a statement that every recurrence was found 5 months early, and the two detection failures are reported alongside it.",
  "For the fictional completed-interval example above, the median is conditional on having both an earlier positive and a later event. People with no prior positive are detection failures for that surveillance question, rather than zero-month observations added to that selected median. People positive without a later event have unfinished follow-up; a time-to-event estimator can handle censoring under its stated assumptions. The estimator and the people included must be named.",
  "Interpretation rule, from intermittent sampling: because the first positive can only fall on a draw date, the gap begins at an observed sample and cannot locate when the signal first became detectable. The same holds for the end of the gap when scans are also periodic.",
  "Evidence read, García-Murillas 2019: 170 women recruited and 101 in the main cohort with mutations identified, tracked by tumour-specific digital PCR in plasma every 3 months in the first year and every 6 months after. In the main cohort, detection during follow-up was associated with relapse (hazard ratio 25.2, 95% CI 6.7 to 95.6). In the combined cohort of 144, median lead time over clinical relapse was 10.7 months. This is an association in one assay and population.",
  "Evidence read, c-TRAK TN: 161 patients entered three-monthly ctDNA surveillance by digital PCR; detection by 12 months was 27.3% (44 of 161). Seven patients relapsed without prior detection. Among those allocated to the intervention, 72% (23 of 32) already had metastases on staging at the time of ctDNA positivity, and of 5 who started pembrolizumab none had sustained clearance, so in this small group the earlier signal was not followed by a measured benefit.",
  "State how lead time was estimated. A simple median of completed positive-to-recurrence intervals is conditional on that selected group; a time-to-event analysis can also incorporate censored follow-up. People without a prior positive and people positive without a later recurrence therefore need explicit dispositions under the study definition. They are not automatically zero-month, infinite or missing intervals interchangeable across studies.",
  "For the García-Murillas estimate, 144 is the combined cohort size, not a count of completed lead-time intervals. The Results report 29 patients with molecular residual disease. The report's cohort size does not establish how many intervals entered the lead-time estimate; that analysis denominator remains unverified here. The observed detection rate, sites of missed recurrence and handling of censored follow-up must accompany interpretation of the median.",
  "The interval available for action can be shorter than the collection-to-recurrence gap because laboratory reporting takes time. Missing draws, assay failures, exclusions, deaths or other competing events, and intervention after a positive result need explicit dispositions. Prespecifying the schedule and event rules, reporting the evaluable denominator and uncertainty, and describing whether results were blinded to the clinical team and whether a positive result triggered extra imaging help make the result interpretable. Earlier detection and improved survival remain different outcomes."
],

"asOf": "2026-11-10"
}),
];
