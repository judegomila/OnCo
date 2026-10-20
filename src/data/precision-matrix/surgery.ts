import type { PrecisionRow, Source } from "./types";

/**
 * Precision matrix rows for surgery, imaging and pathology. See ./types.ts for the rules every row is held to.
 *
 * What precision means differs by row and each row says so in `metric`: how often a margin is found positive after
 * the operation, how often an intraoperative tool finds it during the operation, how often a sentinel node misses
 * a positive axilla, how often a scan finds disease at a given PSA, how often a screening scan raises a false
 * alarm, and how often two pathologists give the same score to the same slide. Every row then asks the separate
 * question the reader cares about: did the more precise version change anything for a patient? Several rows
 * answer no, or not yet shown, and say so in `buys`.
 *
 * Every figure and every quotation here was read from the Europe PMC record of the paper cited beside it on
 * 20 October 2026, after resolving the DOI, and every quotation was checked against that abstract by exact string
 * match. British spelling in OnCo's own words; quotations keep their authors' spelling.
 */

const doi = (label: string, d: string, quote?: string): Source => ({ label, url: `https://doi.org/${d}`, ...(quote ? { quote } : {}) });

const D = "surgery-imaging-pathology" as const;

export const rows: PrecisionRow[] = [
  {
    id: "surg-breast-conserving-margins-and-reoperation",
    domain: D,
    label: "Margins and second operations after breast-conserving surgery",
    technologyIds: ["breast-margins-and-re-excision", "lumpectomy", "resection-margins"],
    metric: "share of women who have a second operation after breast-conserving surgery, per cent",
    today: {
      value: "20.0 per cent had at least one reoperation within three months; adjusted rates across hospital trusts ran from 12.2 to 30.2 per cent (10th to 90th centile)",
      context: "55,297 women having breast-conserving surgery in 156 English NHS trusts, April 2005 to March 2008, from hospital episode statistics",
      source: doi("Reoperation rates after breast conserving surgery for breast cancer among women in England: retrospective study of hospital episode statistics (BMJ 2012)", "10.1136/bmj.e4505", "One in five women who had breast conserving surgery in England had a reoperation."),
    },
    limits: [
      { kind: "sampling", text: "The margin is read by the pathologist days after the operation, so a positive margin is discovered only when a second operation is the remedy.", source: doi("Intraoperative Fluorescence Guidance for Breast Cancer Lumpectomy Surgery (NEJM Evidence 2023)", "10.1056/EVIDoa2200333", "are identified days after surgery, necessitating a second surgery") },
      { kind: "biology", text: "Cancer with an in situ component is harder to clear: 29.5 per cent of English women whose tumour had carcinoma in situ coded had a reoperation, against 18.0 per cent with invasive disease alone.", source: doi("Reoperation rates after breast conserving surgery in England (BMJ 2012)", "10.1136/bmj.e4505", "2803 (29.5%) of the 9504 women with carcinoma in situ had at least one reoperation") },
      { kind: "workflow", text: "Much of the variation is in the decision rather than the margin: among women whose margins were already clear, re-excision rates ranged from 0 to 70 per cent between surgeons in four US health systems.", source: doi("Variability in reexcision following breast conservation surgery (JAMA 2012)", "10.1001/jama.2012.43", "For patients with negative margins, reexcision rates varied widely among surgeons (range, 0%-70%; P = .003)") },
      { kind: "biology", text: "A clear margin lowers the odds of the cancer returning in the breast, by about half against a positive or close one, but a wider clear margin adds nothing measurable, so precision beyond a clear edge does not buy local control.", source: doi("The association of surgical margins and local recurrence in women with early-stage invasive breast cancer treated with breast-conserving therapy: a meta-analysis (Ann Surg Oncol 2014)", "10.1245/s10434-014-3480-5", "increasing the distance for defining negative margins is not significantly associated with reduced odds of LR") },
    ],
    nextStep: {
      text: "Finding the positive margin during the operation, while the cavity is open, rather than days afterwards. Frozen section, cytology, specimen radiography, spectroscopy probes and fluorescent dyes all exist; none is in routine use everywhere, for the reasons the meta-analysis names.",
      status: "available-not-routine",
      source: doi("Diagnostic Accuracy of Intraoperative Techniques for Margin Assessment in Breast Cancer Surgery: A Meta-analysis (Ann Surg 2017)", "10.1097/sla.0000000000001897", "IMA techniques have failed to penetrate routine practice due to limitations, including slow reporting times, technical demands, and logistics."),
      relatedIds: ["intraoperative-margin-assessment-breast", "pegulicianine"],
    },
    buys: {
      text: "Fewer second operations. The clearest gain so far came from agreeing what counts as clear rather than from a device: after the 2014 consensus endorsing \"no ink on tumor\", surgery after a first lumpectomy fell by 16 per cent in two US cancer registries, with no change in the rate of positive margins.",
      outcome: "established",
      source: doi("Trends in Reoperation After Initial Lumpectomy for Breast Cancer: Addressing Overtreatment in Surgical Management (JAMA Oncol 2017)", "10.1001/jamaoncol.2017.0774", "Surgery after initial lumpectomy declined by 16%"),
    },
    relatedIds: ["breast-cancer", "dcis", "wide-local-excision", "breast-conserving-surgery-versus-mastectomy"],
  },
  {
    id: "surg-intraoperative-breast-margin-assessment",
    domain: D,
    label: "Checking breast margins during the operation: frozen section, specimen X-ray, spectroscopy and cavity shaving",
    technologyIds: ["intraoperative-margin-assessment-breast"],
    metric: "sensitivity and specificity for a positive margin during the operation, against final histology, per cent",
    today: {
      value: "Pooled sensitivity and specificity: frozen section 86 and 96 per cent, imprint cytology 91 and 95, intraoperative ultrasound 59 and 81, specimen radiography 53 and 84, optical spectroscopy 85 and 87",
      context: "Meta-analysis of 35 studies with raw accuracy data against final permanent-section histology, searched to January 2016",
      source: doi("Diagnostic Accuracy of Intraoperative Techniques for Margin Assessment in Breast Cancer Surgery: A Meta-analysis (Ann Surg 2017)", "10.1097/sla.0000000000001897", "frozen section = 86%, 96%, 0.96 (n = 9); cytology = 91%, 95%, 0.98 (n = 11); intraoperative ultrasound = 59%, 81%, 0.78 (n = 4); specimen radiography = 53%, 84%, 0.73 (n = 9); optical spectroscopy = 85%, 87%, 0.88 (n = 3)"),
    },
    limits: [
      { kind: "workflow", text: "The two most accurate methods, frozen section and cytology, are resource intensive and slow to report, which the meta-analysis gives as the reason they are not used everywhere.", source: doi("Diagnostic Accuracy of Intraoperative Techniques for Margin Assessment (Ann Surg 2017)", "10.1097/sla.0000000000001897", "these methods are resource intensive and turnaround times for results have prevented widespread international adoption") },
      { kind: "physics", text: "Specimen radiography, an X-ray of the removed tissue, found about half of positive margins in the pooled studies: sensitivity 53 per cent." },
      { kind: "physics", text: "A radiofrequency spectroscopy probe (MarginProbe) found more positive margins than the control arm and also flagged many clear ones: its false-negative rate was 24.8 per cent and its false-positive rate 53.6 per cent, so extra tissue is taken from margins that were clear.", source: doi("A randomized prospective study of lumpectomy margin assessment with use of MarginProbe in patients with nonpalpable breast malignancies (Ann Surg Oncol 2014)", "10.1245/s10434-014-3602-0", "False-negative rates were 24.8 and 66.1 % and false-positive rates were 53.6 and 16.6 % in the device and control arms, respectively.") },
    ],
    nextStep: {
      text: "Adding a spectroscopy probe to standard intraoperative imaging, tested in a 596-patient randomised trial in which no intraoperative pathology was allowed.",
      status: "available-not-routine",
      source: doi("A randomized prospective study of lumpectomy margin assessment with use of MarginProbe (Ann Surg Oncol 2014)", "10.1245/s10434-014-3602-0", "A total of 19.8 % (59 of 298) of patients in the device arm underwent a reexcision procedure compared with 25.8 % (77 of 298) in the control arm (6 % absolute, 23 % relative reduction)."),
      relatedIds: ["pegulicianine", "idea-fund-intraoperative-imaging-trials"],
    },
    buys: {
      text: "Fewer second operations, shown in randomised trials: the spectroscopy probe lowered re-excision from 25.8 to 19.8 per cent, and routinely shaving an extra layer from the cavity walls, which needs no device, halved it from 21 to 10 per cent in a 235-patient trial. None of these trials measured local recurrence or survival.",
      outcome: "established",
      source: doi("A Randomized, Controlled Trial of Cavity Shave Margins in Breast Cancer (NEJM 2015)", "10.1056/NEJMoa1504473", "as well as a lower rate of second surgery for margin clearance (10% vs. 21%, P=0.02)"),
    },
    grade: "moderate",
    relatedIds: ["breast-margins-and-re-excision", "breast-cancer", "idea-moon-image-guided-surgery-everywhere"],
  },
  {
    id: "surg-pegulicianine-cavity-imaging",
    domain: D,
    label: "Fluorescent dye imaging of the lumpectomy cavity (pegulicianine)",
    technologyIds: ["pegulicianine", "fluorescence-guided-surgery"],
    metric: "per-margin sensitivity and specificity for cancer left in the lumpectomy cavity, per cent",
    today: {
      value: "Sensitivity 49.3 per cent and specificity 85.2 per cent per margin; dye-guided shaves removed cancer left behind after standard lumpectomy in 27 of 357 patients",
      context: "INSITE, 406 patients with stage 0 to 3 breast cancer given pegulicianine before lumpectomy, randomised 10:1 to dye-guided surgery or control",
      source: doi("Intraoperative Fluorescence Guidance for Breast Cancer Lumpectomy Surgery (NEJM Evidence 2023)", "10.1056/EVIDoa2200333", "On per-margin analysis, pFGS specificity was 85.2%, and sensitivity was 49.3%."),
    },
    limits: [
      { kind: "biology", text: "The dye lights where tumour enzymes cleave it, and it missed about half the margins that held cancer; the trial did not reach its own sensitivity threshold.", source: doi("INSITE (NEJM Evidence 2023)", "10.1056/EVIDoa2200333", "did not meet the prespecified threshold for sensitivity") },
      { kind: "sampling", text: "The 10:1 randomisation was there to stop surgeons taking smaller lumpectomies in anticipation of the dye, not to compare it with usual care, so the trial cannot say how much it lowers the re-excision rate.", source: doi("INSITE (NEJM Evidence 2023)", "10.1056/EVIDoa2200333", "thus randomization was not designed to provide a control group for evaluating device performance") },
    ],
    buys: {
      text: "Some second operations avoided: among patients whose margins were positive, the dye-guided shaves spared a second operation in 9 of 62. Pegulicianine administration was stopped for adverse events in six patients. No comparison of re-excision, recurrence or survival against usual care has been reported.",
      outcome: "plausible",
      source: doi("INSITE (NEJM Evidence 2023)", "10.1056/EVIDoa2200333", "Second surgeries were avoided by pFGS in 9 of 62 patients with positive margins."),
    },
    grade: "insufficient",
    oversold: "Pegulicianine is described as reducing second operations, and the pivotal trial showed one avoided in 9 of 62 patients with positive margins in a design that was not built to compare it with usual care.",
    relatedIds: ["insite", "intraoperative-margin-assessment-breast", "breast-margins-and-re-excision", "intraoperative-fluorescence-imaging-systems"],
  },
  {
    id: "surg-5-ala-glioma-resection",
    domain: D,
    label: "5-aminolevulinic acid fluorescence for high-grade glioma surgery",
    technologyIds: ["aminolevulinic-acid-gleolan", "fluorescence-guided-surgery"],
    metric: "share of patients with no contrast-enhancing tumour left on MRI within 72 hours of surgery, per cent",
    today: {
      value: "65 per cent with 5-aminolevulinic acid against 36 per cent under white light",
      context: "Randomised phase 3 trial, 270 patients with suspected malignant glioma judged completely resectable, full-analysis population at interim (Stummer 2006)",
      source: doi("Fluorescence-guided surgery with 5-aminolevulinic acid for resection of malignant glioma: a randomised controlled multicentre phase III trial (Lancet Oncol 2006)", "10.1016/S1470-2045(06)70665-9", "Contrast-enhancing tumour was resected completely in 90 (65%) of 139 patients assigned 5-aminolevulinic acid compared with 47 (36%) of 131 assigned white light"),
    },
    limits: [
      { kind: "biology", text: "The trial enrolled only tumours a surgeon judged completely removable, so its result does not reach tumours that sit in or against parts of the brain that control speech, movement or vision.", source: doi("Stummer et al. (Lancet Oncol 2006)", "10.1016/S1470-2045(06)70665-9", "with suspected malignant glioma amenable to complete resection of contrast-enhancing tumour") },
      { kind: "physics", text: "The target is the contrast-enhancing tumour seen on MRI; glioma cells beyond the enhancing edge are not what the primary endpoint measured." },
    ],
    buys: {
      text: "Longer before the tumour grows back: six-month progression-free survival was 41.0 per cent against 21.1 per cent, with no difference in serious adverse events in the week after surgery. The abstract reports no overall survival result, so a survival gain from the dye is not shown by this trial.",
      outcome: "established",
      source: doi("Stummer et al. (Lancet Oncol 2006)", "10.1016/S1470-2045(06)70665-9", "Patients allocated 5-aminolevulinic acid had higher 6-month progression free survival than did those allocated white light"),
    },
    grade: "moderate",
    relatedIds: ["glioblastoma", "extent-of-resection", "paper-stummer-lancet-oncol", "intraoperative-mri-ct"],
  },
  {
    id: "surg-sentinel-node-false-negative",
    domain: D,
    label: "Sentinel node biopsy in clinically node-negative breast cancer",
    technologyIds: ["sentinel-lymph-node-biopsy", "sentinel-node"],
    metric: "false-negative rate: share of women with cancer in the armpit whose sentinel nodes were clear, per cent",
    today: {
      value: "9.8 per cent (75 of 766); overall accuracy 97.1 per cent",
      context: "NSABP B-32, women with clinically node-negative invasive breast cancer who had sentinel node biopsy followed by full axillary dissection",
      source: doi("Technical outcomes of sentinel-lymph-node resection and conventional axillary-lymph-node dissection in patients with clinically node-negative breast cancer: results from the NSABP B-32 randomised phase III trial (Lancet Oncol 2007)", "10.1016/S1470-2045(07)70278-4", "with a false-negative rate of 9.8% (75 of 766; 95% CI 7.8-12.2)"),
    },
    limits: [
      { kind: "sampling", text: "The false-negative rate rises when only one node is taken and after an excisional biopsy, and depends on where the tumour sits.", source: doi("NSABP B-32 technical outcomes (Lancet Oncol 2007)", "10.1016/S1470-2045(07)70278-4", "Removal of more than one SLN and avoidance of excisional biopsy are important variables in reducing the false-negative rate.") },
    ],
    nextStep: {
      text: "For small tumours the trials moved the other way, from staging the armpit more precisely to not operating on it at all: in INSEMA, 4,858 women with T1 or T2 tumours, omitting axillary surgery was non-inferior to sentinel node biopsy for invasive disease-free survival, with less lymphoedema and arm pain, and axillary recurrence of 1.0 against 0.3 per cent.",
      status: "available-not-routine",
      source: doi("Axillary Surgery in Breast Cancer: Primary Results of the INSEMA Trial (NEJM 2025)", "10.1056/NEJMoa2412063", "omission of surgical axillary staging was noninferior to sentinel-lymph-node biopsy after a median follow-up of 6 years"),
      relatedIds: ["insema", "axillary-surgery-de-escalation"],
    },
    buys: {
      text: "Missing about one positive armpit in ten did not show up in survival: with sentinel node biopsy alone, overall survival, disease-free survival and regional recurrence were statistically equivalent to full dissection at about eight years. A lower false-negative rate in this setting has not been shown to change outcomes.",
      outcome: "not-established",
      source: doi("Sentinel-lymph-node resection compared with conventional axillary-lymph-node dissection in clinically node-negative patients with breast cancer: overall survival findings from the NSABP B-32 randomised phase 3 trial (Lancet Oncol 2010)", "10.1016/S1470-2045(10)70207-2", "Overall survival, disease-free survival, and regional control were statistically equivalent between groups."),
    },
    relatedIds: ["nsabp-b32", "acosog-z0011", "amaros", "breast-cancer"],
  },
  {
    id: "surg-axillary-staging-after-neoadjuvant",
    domain: D,
    label: "Staging the armpit after chemotherapy given before surgery: sentinel node and targeted axillary dissection",
    technologyIds: ["targeted-axillary-dissection", "sentinel-lymph-node-biopsy"],
    metric: "false-negative rate of axillary staging after neoadjuvant chemotherapy in women who started node-positive, per cent",
    today: {
      value: "12.6 per cent with two or more sentinel nodes examined (ACOSOG Z1071); 14.2 per cent in women whose nodes became clinically negative (SENTINA)",
      context: "ACOSOG Z1071, 525 women with biopsy-proven node-positive breast cancer who had sentinel node surgery and full dissection after chemotherapy, 136 institutions",
      source: doi("Sentinel lymph node surgery after neoadjuvant chemotherapy in patients with node-positive breast cancer: the ACOSOG Z1071 (Alliance) clinical trial (JAMA 2013)", "10.1001/jama.2013.278932", "resulting in an FNR of 12.6% (90% Bayesian credible interval, 9.85%-16.05%)"),
    },
    limits: [
      { kind: "sampling", text: "After chemotherapy the sentinel node is found less often and misses more when few nodes are taken: in SENTINA the detection rate was 80.1 per cent and the false-negative rate 24.3 per cent when one node was removed.", source: doi("Sentinel-lymph-node biopsy in patients with breast cancer before and after neoadjuvant chemotherapy (SENTINA): a prospective, multicentre cohort study (Lancet Oncol 2013)", "10.1016/S1470-2045(13)70166-9", "The false-negative rate was 24.3% (17 of 70) for women who had one node removed") },
      { kind: "sampling", text: "The node known to hold cancer before treatment was not retrieved as a sentinel node in 23 per cent of patients, including six whose sentinel nodes were clear but whose clipped node still held cancer.", source: doi("Improved Axillary Evaluation Following Neoadjuvant Therapy for Patients With Node-Positive Breast Cancer Using Selective Evaluation of Clipped Nodes (JCO 2016)", "10.1200/JCO.2015.64.0094", "The clipped node was not retrieved as an SLN in 23% (31 of 134) of patients") },
    ],
    nextStep: {
      text: "Clipping the biopsied node before chemotherapy and removing that exact node afterwards with the sentinel nodes (targeted axillary dissection).",
      status: "available-not-routine",
      source: doi("Implementation of Targeted Axillary Dissection (JCO 2016)", "10.1200/JCO.2015.64.0094", "TAD followed by ALND was performed in 85 patients, with an FNR of 2.0% (1 of 50; 95% CI, 0.05 to 10.7)."),
      relatedIds: ["targeted-axillary-dissection-md-anderson", "acosog-z1071"],
    },
    buys: {
      text: "A more accurate answer to whether full axillary dissection, and the lymphoedema risk that comes with it, can be avoided after a good response to chemotherapy. The studies here measured false-negative rates, not axillary recurrence or survival, so the outcome gain is not yet shown.",
      outcome: "plausible",
    },
    relatedIds: ["axillary-surgery-de-escalation", "breast-cancer-related-lymphoedema", "breast-cancer"],
  },
  {
    id: "surg-robot-assisted-cancer-surgery",
    domain: D,
    label: "Robot-assisted cancer surgery",
    technologyIds: ["robotic-surgery", "surgical-robot-platforms"],
    metric: "difference from open or laparoscopic surgery in function, margins and cancer control, in randomised trials",
    today: {
      value: "Urinary and sexual function did not differ at 6 or 12 weeks; positive margins were 15 per cent robotic against 10 per cent open, not significantly different",
      context: "Randomised phase 3 trial, 326 men having radical prostatectomy for localised prostate cancer in Brisbane, early outcomes (Yaxley 2016)",
      source: doi("Robot-assisted laparoscopic prostatectomy versus open radical retropubic prostatectomy: early outcomes from a randomised controlled phase 3 study (Lancet 2016)", "10.1016/S0140-6736(16)30592-X", "These two techniques yield similar functional outcomes at 12 weeks."),
    },
    limits: [
      { kind: "workflow", text: "In rectal cancer the robot did not lower conversion to open surgery or the rate of cancer at the circumferential margin (5.1 against 6.3 per cent), with surgeons of varying robotic experience.", source: doi("Effect of Robotic-Assisted vs Conventional Laparoscopic Surgery on Risk of Conversion to Open Laparotomy Among Patients Undergoing Resection for Rectal Cancer: The ROLARR Randomized Clinical Trial (JAMA 2017)", "10.1001/jama.2017.7219", "robotic-assisted laparoscopic surgery, when performed by surgeons with varying experience with robotic surgery, does not confer an advantage in rectal cancer resection") },
      { kind: "workflow", text: "In early cervical cancer the minimally invasive approach, 84.4 per cent laparoscopic and 15.6 per cent robotic, gave lower disease-free and overall survival than open radical hysterectomy.", source: doi("Minimally Invasive versus Abdominal Radical Hysterectomy for Cervical Cancer (NEJM 2018)", "10.1056/NEJMoa1806395", "minimally invasive radical hysterectomy was associated with lower rates of disease-free survival and overall survival than open abdominal radical hysterectomy among women with early-stage cervical cancer") },
    ],
    buys: {
      text: "What randomised trials show the robot buying is recovery rather than cancer control: in iROC, 338 UK patients having bladder removal, robotic surgery gave a median of 82 against 80 days alive and out of hospital in 90 days, with fewer clots and wound complications and no difference in recurrence or mortality at a median of 18.4 months. The authors called the clinical importance uncertain.",
      outcome: "established",
      source: doi("Effect of Robot-Assisted Radical Cystectomy With Intracorporeal Urinary Diversion vs Open Radical Cystectomy on 90-Day Morbidity and Mortality Among Patients With Bladder Cancer: A Randomized Clinical Trial (JAMA 2022)", "10.1001/jama.2022.7393", "However, the clinical importance of these findings remains uncertain."),
    },
    grade: "no-benefit",
    oversold: "Robotic surgery is described in terms of precision, and in randomised trials of prostate and rectal cancer surgery that precision did not give better function, margins or cancer control than the comparator, while in early cervical cancer the minimally invasive approach did worse.",
    relatedIds: ["minimally-invasive-surgery", "lacc", "tors", "prostate", "rectal-cancer", "early-cervical-cancer", "muscle-invasive-bladder-cancer", "idea-fund-surgical-ai-robotics-evaluation"],
  },
  {
    id: "img-psma-pet-detection-by-psa",
    domain: D,
    label: "PSMA PET: detection at biochemical recurrence by PSA level, and lymph node sensitivity at staging",
    technologyIds: ["psma-pet"],
    metric: "share of scans that find the cancer at biochemical recurrence, by PSA level in ng/ml, per cent",
    today: {
      value: "33, 45, 59, 75 and 95 per cent of scans positive at PSA 0 to 0.19, 0.2 to 0.49, 0.5 to 0.99, 1 to 1.99, and 2 ng/ml or more",
      context: "Meta-analysis of 37 articles and 4,790 patients having gallium-68 PSMA PET, biochemical recurrence after prostatectomy or radiotherapy (Perera 2020)",
      source: doi("Gallium-68 Prostate-specific Membrane Antigen Positron Emission Tomography in Advanced Prostate Cancer: Updated Diagnostic Utility, Sensitivity, Specificity, and Distribution of Prostate-specific Membrane Antigen-avid Lesions: A Systematic Review and Meta-analysis (Eur Urol 2020)", "10.1016/j.eururo.2019.01.049", "For PSA categories 0-0.19, 0.2-0.49, 0.5-0.99, 1-1.99, and ≥2ng/ml, the percentages of positive scans were 33%, 45%, 59%, 75%, and 95%, respectively."),
    },
    limits: [
      { kind: "physics", text: "At first staging PSMA PET misses most small nodal deposits: before prostatectomy its per-patient sensitivity for pelvic nodes was 0.40, with specificity 0.95, in a 277-man phase 3 imaging trial.", source: doi("Diagnostic Accuracy of 68Ga-PSMA-11 PET for Pelvic Nodal Metastasis Detection Prior to Radical Prostatectomy and Pelvic Lymph Node Dissection: A Multicenter Prospective Phase 3 Imaging Trial (JAMA Oncol 2021)", "10.1001/jamaoncol.2021.3771", "the sensitivity and specificity of 68Ga-PSMA-11 PET were 0.40 and 0.95, respectively") },
      { kind: "physics", text: "Sensitivity depends on the size of the deposit: in 583 men it was 26.3 per cent overall and rose with deposit size, and adjusting for a 5.5 mm deposit size cut-off tripled it to 90.2 per cent.", source: doi("Staging Accuracy and Prognostic Value of Prostate-Specific Membrane Antigen PET/CT Strongly Depends on Lymph Node Tumor Burden (J Clin Med 2024)", "10.3390/jcm13216534", "PSMA PET/CT showed a better sensitivity as LNM tumor deposit size increased") },
    ],
    nextStep: {
      text: "Replacing CT and bone scan with PSMA PET for staging high-risk disease before curative treatment, as proPSMA tested: accuracy 92 against 65 per cent, with less radiation.",
      status: "available-not-routine",
      source: doi("Prostate-specific membrane antigen PET-CT in patients with high-risk prostate cancer before curative-intent surgery or radiotherapy (proPSMA): a prospective, randomised, multicentre study (Lancet 2020)", "10.1016/S0140-6736(20)30314-7", "PSMA PET-CT is a suitable replacement for conventional imaging, providing superior accuracy, to the combined findings of CT and bone scanning."),
      relatedIds: ["propsma", "psma-pet-to-rlt", "idea-psma-pet-guided-mdt"],
    },
    buys: {
      text: "A changed plan more often: management changed after 28 per cent of first-line PSMA scans against 15 per cent after conventional imaging. Whether finding disease earlier and treating it lengthens life has not been shown; the trials here measured accuracy and management change.",
      outcome: "not-established",
      source: doi("proPSMA (Lancet 2020)", "10.1016/S0140-6736(20)30314-7", "First-line conventional imaging conferred management change less frequently"),
    },
    relatedIds: ["prostate", "biochemical-recurrence", "psma-prerp", "molecular-imaging-roadmap"],
  },
  {
    id: "img-low-dose-ct-nodule-false-positives",
    domain: D,
    label: "Low-dose CT lung screening: nodules, size thresholds and false positives",
    technologyIds: ["low-dose-ct-screening", "lung-rads", "pulmonary-nodule"],
    metric: "share of positive screening scans that turn out not to be cancer, per cent",
    today: {
      value: "24.2 per cent of low-dose CT screens were positive over three rounds, and 96.4 per cent of those positives were false",
      context: "NLST, 53,454 people at high risk of lung cancer at 33 US centres, three annual screens",
      source: doi("Reduced lung-cancer mortality with low-dose computed tomographic screening (NEJM 2011)", "10.1056/NEJMoa1102873", "A total of 96.4% of the positive screening results in the low-dose CT group and 94.5% in the radiography group were false positive results."),
    },
    limits: [
      { kind: "biology", text: "A size threshold trades false alarms for missed cancers: applied retrospectively to NLST, Lung-RADS lowered the false-positive rate after baseline from 21.8 to 5.3 per cent and sensitivity from 93.8 to 78.6 per cent.", source: doi("Performance of Lung-RADS in the National Lung Screening Trial: a retrospective assessment (Ann Intern Med 2015)", "10.7326/m14-2086", "Lung-RADS may substantially reduce the false-positive result rate; however, sensitivity is also decreased.") },
    ],
    nextStep: {
      text: "Measuring nodule volume and growth between scans rather than diameter alone, as NELSON did: 9.2 per cent of screened men had an additional scan for an indeterminate result and 2.1 per cent were referred for a suspicious nodule.",
      status: "available-not-routine",
      source: doi("Reduced Lung-Cancer Mortality with Volume CT Screening in a Randomized Trial (NEJM 2020)", "10.1056/NEJMoa1911793", "The overall referral rate for suspicious nodules was 2.1%."),
      relatedIds: ["nlst-nelson", "optellum-virtual-nodule-clinic", "idea-prev-lung-nodule-ai-discharge"],
    },
    buys: {
      text: "Fewer people sent for further scans, biopsies and operations for nodules that are not cancer, while keeping the lung cancer deaths screening prevents: in NELSON the 10-year rate ratio for lung cancer death was 0.76 in screened men.",
      outcome: "plausible",
      source: doi("NELSON (NEJM 2020)", "10.1056/NEJMoa1911793", "There were low rates of follow-up procedures for results suggestive of lung cancer."),
    },
    relatedIds: ["lung-cancer", "overdiagnosis", "b-overdiagnosis", "idea-prev-ldct-ai-negative-triage"],
  },
  {
    id: "path-pd-l1-scoring-reproducibility",
    domain: D,
    label: "PD-L1 scoring: how often pathologists agree",
    technologyIds: ["pd-l1-testing", "pd-l1-tps", "pd-l1-ic-score", "pd-l1-cps"],
    metric: "agreement between pathologists scoring the same slides, intraclass correlation coefficient from 0 to 1",
    today: {
      value: "0.832 to 0.882 for scoring tumour cells; 0.172 to 0.229 for scoring immune cells",
      context: "13 pathologists scoring 90 non-small cell lung cancers stained with four PD-L1 assays (Rimm 2017)",
      source: doi("A Prospective, Multi-institutional, Pathologist-Based Assessment of 4 Immunohistochemistry Assays for PD-L1 Expression in Non-Small Cell Lung Cancer (JAMA Oncol 2017)", "10.1001/jamaoncol.2017.0013", "the concordance between pathologists' scoring for PD-L1 expression in tumor cells ranged from ICCs of 0.832 (95% CI, 0.820-0.844) to 0.882 (95% CI, 0.873-0.891) for each assay, while the ICCs from immune cells for each assay ranged from 0.172 (95% CI, 0.156-0.189) to 0.229 (95% CI, 0.211-0.248)"),
    },
    limits: [
      { kind: "workflow", text: "The assays are not interchangeable: the SP142 assay stained less PD-L1 in both tumour and immune cells than the others on the same tumours.", source: doi("Rimm et al. (JAMA Oncol 2017)", "10.1001/jamaoncol.2017.0013", "The assay using the SP142 antibody is an outlier that detected significantly less PD-L1 expression in tumor cells and immune cells.") },
      { kind: "biology", text: "PD-L1 varies across a tumour, so a biopsy is a sample of a patchy signal as well as a slide to be read.", source: doi("Clinical Validation of Artificial Intelligence-Powered PD-L1 Tumor Proportion Score Interpretation for Immune Checkpoint Inhibitor Response Prediction in Non-Small Cell Lung Cancer (JCO Precis Oncol 2024)", "10.1200/po.23.00556", "limited by factors such as intraobserver/interobserver bias and intratumor heterogeneity") },
    ],
    nextStep: {
      text: "AI-assisted scoring of whole slides. In a ring study of 21 pathologists at four institutions scoring the combined positive score in triple-negative breast cancer, agreement rose from 0.618 to 0.931 with AI assistance.",
      status: "research",
      source: doi("Artificial intelligence enhances whole-slide interpretation of PD-L1 CPS in triple-negative breast cancer: A multi-institutional ring study (Histopathology 2024)", "10.1111/his.15205", "the intraclass correlation coefficient (ICC) value was increased from 0.618"),
      relatedIds: ["ai-pathology-scoring", "idea-tr2-pdl1-digital-calibration", "idea-tnbc-pd-l1-assay-harmonisation"],
    },
    buys: {
      text: "The same answer about eligibility for checkpoint inhibitors whichever pathologist reads the slide. In an external lung cancer cohort of 430 slides an AI score predicted progression-free survival about as well as pathologists did, which shows agreement, not that patients do better.",
      outcome: "not-established",
      source: doi("AI-powered PD-L1 TPS interpretation in NSCLC (JCO Precis Oncol 2024)", "10.1200/po.23.00556", "PD-L1 TPS assessed by AI analyzer correlates with that of pathologists, with clinical performance also being comparable when referenced to PFS."),
    },
    relatedIds: ["pd-l1-assay-discordance", "pdl1", "paper-rimm-pd-l1-assay-comparison-jama-oncol-2017", "nsclc", "tnbc"],
  },
  {
    id: "path-her2-low-scoring-reproducibility",
    domain: D,
    label: "HER2-low scoring: telling 0 from 1+",
    technologyIds: ["her2-low", "her2-low-ihc"],
    metric: "agreement between pathologists on HER2 immunohistochemistry 0 versus 1+, per cent of cases scored the same",
    today: {
      value: "26 per cent concordance between 0 and 1+, against 58 per cent between 2+ and 3+",
      context: "18 pathologists reading scanned slides of 170 breast cancer biopsies on the four-point scale (Fernandez 2022)",
      source: doi("Examination of Low ERBB2 Protein Expression in Breast Cancer Tissue (JAMA Oncol 2022)", "10.1001/jamaoncol.2021.7239", "there was only 26% concordance between 0 and 1+ compared with 58% concordance between 2+ and 3+"),
    },
    limits: [
      { kind: "workflow", text: "Laboratories disagree too: in College of American Pathologists proficiency surveys of about 1,400 laboratories, 19 per cent of cases reached 70 per cent concordance or less on 0 against 1+.", source: doi("Fernandez et al. (JAMA Oncol 2022)", "10.1001/jamaoncol.2021.7239", "19% of cases read by the laboratories generate results with less than or equal to 70% concordance for IHC ERBB2 score 0 vs 1+") },
      { kind: "biology", text: "Disagreement clusters in small biopsies, slides with few tumour cells and tumours that stain unevenly.", source: doi("Artificial Intelligence (AI)-Assisted Human Epidermal Growth Factor Receptor 2 (HER2) Scoring in Breast Cancer: Diagnostic Agreement and Understanding Discordance (Lab Invest 2026)", "10.1016/j.labinv.2026.106150", "Discordance was also associated with lower tumor cell counts, biopsy samples, and heterogeneous staining patterns.") },
    ],
    nextStep: {
      text: "AI-assisted HER2 scoring. In a reader study of 201 cases, agreement among three pathologists on 1+ tumours rose from 26.5 to 70.7 per cent with AI assistance; a commercially available system raised overall multirater agreement from 79.8 to 88.6 per cent across 853 slides in a second study.",
      status: "available-not-routine",
      source: doi("Augmented interpretation of HER2, ER, and PR in breast cancer by artificial intelligence analyzer: enhancing interobserver agreement through a reader study of 201 cases (Breast Cancer Res 2024)", "10.1186/s13058-024-01784-y", "where the concordance significantly increased from 46.2 to 68.4% and from 26.5 to 70.7%, respectively."),
      relatedIds: ["ai-pathology-scoring", "idea-ai-her2-low-scoring", "idea-tr2-her2-low-reference-materials"],
    },
    buys: {
      text: "Fewer people wrongly scored 0 and so not offered trastuzumab deruxtecan, which lengthened both progression-free and overall survival against chemotherapy in HER2-low disease in DESTINY-Breast04. Whether AI scoring changes who is treated, or how they do, has not been tested.",
      outcome: "plausible",
      source: doi("Trastuzumab Deruxtecan in Previously Treated HER2-Low Advanced Breast Cancer (NEJM 2022)", "10.1056/NEJMoa2203690", "trastuzumab deruxtecan resulted in significantly longer progression-free and overall survival than the physician's choice of chemotherapy"),
    },
    relatedIds: ["her2-low-to-tdxd", "her2-low-metastatic-breast-cancer", "paper-fernandez-jama-oncol", "destiny-breast04", "her2-low-and-trop2-adc-eligibility-tnbc"],
  },
  {
    id: "path-ai-prostate-biopsy-detection",
    domain: D,
    label: "AI help to find prostate cancer on biopsy slides",
    technologyIds: ["paige-prostate", "digital-pathology-ai"],
    metric: "pathologists' sensitivity for cancer on prostate needle biopsy slides, per cent",
    today: {
      value: "Average sensitivity 74 per cent unaided and 90 per cent with the AI system, with no significant change in specificity (97 per cent unaided)",
      context: "Reader study: three general pathologists reading 304 biopsy whole-slide images, then the same slides about four weeks later with Paige Prostate Alpha, against a genitourinary pathology reference (Raciti 2020)",
      source: doi("Novel artificial intelligence system increases the detection of prostate cancer in whole slide images of core needle biopsies (Mod Pathol 2020)", "10.1038/s41379-020-0551-y", "With Paige Prostate Alpha, the average sensitivity for pathologists significantly increased to 90% with no statistically significant change in specificity."),
    },
    limits: [
      { kind: "workflow", text: "The study was a reader exercise, not practice: three pathologists read 304 slides in eight hours, and the authors say it is not known how such systems change diagnosis in routine work.", source: doi("Raciti et al. (Mod Pathol 2020)", "10.1038/s41379-020-0551-y", "However, the impact of these artificial intelligence systems on pathologic diagnosis is not known.") },
      { kind: "cost-access", text: "Any slide AI needs the glass slides scanned first, so it reaches only laboratories with a digital pathology service." },
    ],
    buys: {
      text: "Fewer missed cancers on biopsy. The extra detections were mostly smaller, lower-grade tumours, where finding more can mean more overdiagnosis as well as fewer misses, so a benefit to patients is not established.",
      outcome: "not-established",
      source: doi("Raciti et al. (Mod Pathol 2020)", "10.1038/s41379-020-0551-y", "With Paige Prostate Alpha, pathologists more often correctly classified smaller, lower grade tumors"),
    },
    relatedIds: ["prostate", "overdiagnosis", "digital-pathology-wsi", "ai-pathology-scoring", "gleason-grade-group"],
  },
  {
    id: "path-pancreatic-margin-reporting",
    domain: D,
    label: "Pancreatic cancer margins: how the specimen is examined decides the answer",
    technologyIds: ["r0-r1-margin-pancreatic", "resection-margins"],
    metric: "share of pancreatic cancer resections reported as R1 (cancer within 1 mm of a margin), per cent",
    today: {
      value: "76 per cent with a standardised examination protocol, against 14 per cent in the same centre before it",
      context: "111 consecutive pancreatic head resections for ductal adenocarcinoma, 2005 to 2006, against 188 from 2002 to 2004 examined without a standardised protocol, single centre (Esposito 2008)",
      source: doi("Most pancreatic cancer resections are R1 resections (Ann Surg Oncol 2008)", "10.1245/s10434-008-9839-8", "The R1 rate for resections carried out with the standardized protocol was 76%."),
    },
    limits: [
      { kind: "sampling", text: "The more of the circumferential margin is sampled, the more often cancer is found at it.", source: doi("Redefining the R1 resection in pancreatic cancer (Br J Surg 2006)", "10.1002/bjs.5397", "Sampling of the circumferential RM was more extensive in the SP series and correlated with RM status.") },
      { kind: "workflow", text: "There was no widely accepted standard for examining these specimens when the studies were done, so R1 rates from different centres were not comparable.", source: doi("Esposito et al. (Ann Surg Oncol 2008)", "10.1245/s10434-008-9839-8", "there is currently no widely accepted standardized protocol for pathological examination, especially with respect to resection margins") },
    ],
    nextStep: {
      text: "A standardised protocol for every specimen: multicolour inking of each margin, axial slicing and extensive sampling, with R1 defined as cancer within 1 mm.",
      status: "available-not-routine",
      source: doi("Verbeke et al. (Br J Surg 2006)", "10.1002/bjs.5397", "Standardized examination influences the reporting of RM status."),
    },
    buys: {
      text: "A margin result that means something for the patient: under the standardised protocol, survival tracked margin status, and under the old one it did not. Whether acting on the more accurate result changes outcomes has not been tested.",
      outcome: "plausible",
      source: doi("Verbeke et al. (Br J Surg 2006)", "10.1002/bjs.5397", "Survival correlated with RM status for the entire SP series (P < 0.001), but not for the NSP series."),
    },
    relatedIds: ["pancreatic", "circumferential-resection-margin"],
  },
];
