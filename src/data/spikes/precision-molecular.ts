import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Precision and protocol-upgrades run (20 October 2026), facet 2: molecular detection and matching.
 *
 * The matrix rows for this facet live in src/data/precision-matrix/molecular.ts. This file holds the records those
 * rows needed and the corpus did not have: ten papers that carry the argument about how precise blood tests,
 * genomic profiling and the tumour-agnostic thresholds are, and what acting on them has been shown to buy. The
 * randomised SHIVA trial of off-label matching, the estimate of how many people genome-driven drugs help, the two
 * analyses that put the single tumour mutational burden cut-off in question, the study that found most local
 * misreadings of mismatch-repair status in colorectal cancer, the measurement of blood-cell mutations in plasma, the
 * shedding survey across cancer types, the TRACERx residual disease cohort, the whole-genome plasma method and the
 * ESMO working group's recommendations.
 *
 * Every identifier was resolved by DOI on Europe PMC on 20 October 2026 and every figure below was read from the
 * abstract returned there; nothing was taken from memory. Where an abstract did not give a number, the record does
 * not give one. Records the corpus already held (DYNAMIC, DYNAMIC-III, IMvigor011, NILE, NCI-MATCH, the c-TRAK TN
 * papers, the clonal haematopoiesis prostate study, the NHS-Galleri and PATHFINDER papers) are linked, not restated.
 *
 * UK spelling in OnCo's own words; titles keep their journals' spelling.
 */

const asOf = "2026-10-20";
const doiUrl = (d: string) => `https://doi.org/${d}`;
const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x, tags: ["precision", ...(x.tags ?? [])] });

const papers: PaperInput[] = [
  p({
    id: "paper-shiva-off-label-targeted-therapy-lancet-oncol-2015",
    name: "SHIVA: molecularly targeted therapy based on tumour molecular profiling versus conventional therapy for advanced cancer",
    tldr: "The one randomised test of giving people a targeted drug matched to their tumour's mutation but outside its licence found they did no better than with their doctor's choice of treatment.",
    summary: "SHIVA was an open-label randomised phase 2 trial at eight French academic centres. Adults with any metastatic solid tumour that had progressed on standard treatment had a mandatory biopsy of a metastasis and large-scale genomic testing. Those with an alteration in one of three pathways (hormone receptor, PI3K/AKT/mTOR, RAF/MEK) that could be matched to one of ten regimens of 11 marketed targeted drugs were randomised 1:1 to the matched drug, used outside its indication, or to treatment at the physician's choice.\n\nOf 741 patients screened between October 2012 and July 2014, 293 (40 per cent) had a matchable alteration and 195 (26 per cent) were randomised, 99 to matched treatment and 96 to control. Median progression-free survival was 2.3 months with matched treatment and 2.0 months with physician's choice (hazard ratio 0.88, 95 per cent confidence interval 0.65 to 1.19, p 0.41). Grade 3 to 4 adverse events occurred in 43 per cent of patients on targeted drugs and 35 per cent on chemotherapy. The authors concluded that off-label use of targeted drugs should be discouraged and enrolment in trials encouraged.",
    journal: "The Lancet Oncology", year: 2015, doi: "10.1016/S1470-2045(15)00188-6", pmid: "26342236", authors: "Le Tourneau C, Delord JP, Gonçalves A, et al.",
    paperType: "rct", participants: 195, changedPractice: false,
    findings: [
      "293 of 741 screened patients (40 per cent) had an alteration matching one of the ten regimens; 195 (26 per cent) were randomised.",
      "Median progression-free survival 2.3 months with matched off-label treatment against 2.0 months with physician's choice (hazard ratio 0.88, 95 per cent confidence interval 0.65 to 1.19, p 0.41).",
      "Grade 3 to 4 adverse events in 43 of 100 patients on targeted drugs and 32 of 91 on cytotoxic chemotherapy (p 0.30).",
    ],
    whatItMeans: "A mutation found on a profiling report is a reason to look for a trial, not proof that a drug licensed for another cancer will work. Matching to drugs approved for that alteration in that cancer is a separate question that SHIVA did not test.",
    caveats: [
      "Patients were heavily pretreated, and the drugs were the targeted agents marketed in France in 2012.",
      "Progression-free survival was not assessed by independent central review, and clinicians and patients knew the allocation.",
      "Three pathways and ten regimens cover a fraction of the alterations matched today.",
    ],
    links: [{ label: "Le Tourneau et al., Lancet Oncol 2015", url: doiUrl("10.1016/S1470-2045(15)00188-6") }, { label: "PubMed", url: pubmed("26342236") }, { label: "ClinicalTrials.gov NCT01771458", url: "https://clinicaltrials.gov/study/NCT01771458" }],
    technologies: ["cgp"], people: ["christophe-le-tourneau"], journals: ["lancet-oncology"], sections: ["diagnostics"],
    tags: ["failure"],
  }),
  p({
    id: "paper-marquart-genome-driven-oncology-benefit-jama-oncol-2018",
    name: "Estimation of the percentage of US patients with cancer who benefit from genome-driven oncology",
    tldr: "Counting every drug approved for a gene change up to January 2018, about 8 in 100 Americans with advanced cancer were eligible for one and about 5 in 100 were estimated to benefit.",
    summary: "A retrospective cross-sectional estimate built from public data: the number of people in the United States with advanced or metastatic cancer, the drugs the FDA approved from January 2006 to January 2018, response rates and durations from their labels, and published frequencies of the genomic alterations each drug required. Thirty-one drugs with 38 indications met the definition of genome-targeted or genome-informed therapy.\n\nThe share of patients eligible for genome-targeted therapy rose from 5.09 per cent (28,729 of 564,830) in 2006 to 8.33 per cent (50,811 of 609,640) in 2018. The share estimated to benefit rose from 0.70 per cent to 4.90 per cent. For the broader genome-informed category, eligibility reached 15.44 per cent and estimated benefit 6.62 per cent in 2018. The median response rate for genome-informed drugs was 54 per cent and the median duration of response 29.5 months. The authors concluded that these drugs had helped a minority of patients with advanced cancer.",
    journal: "JAMA Oncology", year: 2018, doi: "10.1001/jamaoncol.2018.1660", pmid: "29710180", authors: "Marquart J, Chen EY, Prasad V",
    paperType: "observational",
    findings: [
      "Eligibility for genome-targeted therapy: 5.09 per cent of US patients with metastatic cancer in 2006, 8.33 per cent in 2018.",
      "Estimated benefit from genome-targeted therapy: 0.70 per cent in 2006, 4.90 per cent in 2018.",
      "Genome-informed therapy in 2018: 15.44 per cent eligible, 6.62 per cent estimated to benefit; median response rate 54 per cent, median duration of response 29.5 months.",
    ],
    whatItMeans: "Precision drugs can work very well for the people they fit, and by 2018 they fitted a small share of people with advanced cancer. The figure has risen since with every new approval; it is a baseline, not a current count.",
    caveats: [
      "Benefit is estimated from response rates on labels, not measured in patients, and response is not the same as longer life.",
      "The estimate stops at January 2018 and approvals since then, including tumour-agnostic ones, are not counted.",
      "United States only; access elsewhere differs.",
    ],
    links: [{ label: "Marquart, Chen and Prasad, JAMA Oncol 2018", url: doiUrl("10.1001/jamaoncol.2018.1660") }, { label: "PubMed", url: pubmed("29710180") }],
    technologies: ["cgp"], terms: ["cancer-drivers-vs-actionable"], journals: ["jama-oncology"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-mcgrail-tmb-pan-cancer-response-ann-oncol-2021",
    name: "High tumor mutation burden fails to predict immune checkpoint blockade response across all cancer types",
    tldr: "Pooling more than 10,000 tumours, a high mutation count predicted response to immunotherapy in melanoma, lung and bladder cancers but not in breast, prostate or brain tumours.",
    summary: "The authors used data from more than 10,000 tumours in The Cancer Genome Atlas to compare ways of measuring tumour mutational burden and to test whether predicted neoantigen load correlated with CD8 T cells in each cancer type, then analysed checkpoint inhibitor outcomes by objective response (1,551 patients) and overall survival (1,936 patients).\n\nIn cancer types where CD8 T-cell levels rose with neoantigen load, such as melanoma, lung and bladder cancers, high-TMB tumours responded 39.8 per cent of the time (95 per cent confidence interval 34.9 to 44.8), significantly more than low-TMB tumours (odds ratio 4.1). In cancer types with no such relationship, such as breast cancer, prostate cancer and glioma, high-TMB tumours responded 15.3 per cent of the time (9.2 to 23.4) and significantly less often than low-TMB tumours (odds ratio 0.46). Overall survival and continuous TMB gave equivalent results. The authors concluded that their analysis did not support high TMB as a biomarker for checkpoint inhibitors in all solid cancer types.",
    journal: "Annals of Oncology", year: 2021, doi: "10.1016/j.annonc.2021.02.006", pmid: "33736924", authors: "McGrail DJ, Pilié PG, Rashid NU, et al.",
    paperType: "translational", participants: 1936,
    findings: [
      "Melanoma, lung, bladder and similar cancers: response rate 39.8 per cent in high-TMB tumours, odds ratio 4.1 against low-TMB.",
      "Breast, prostate, glioma and similar cancers: response rate 15.3 per cent in high-TMB tumours, odds ratio 0.46 against low-TMB.",
      "The same pattern held for overall survival and for TMB treated as a continuous measure.",
    ],
    whatItMeans: "A single tumour-agnostic cut-off assumes a high mutation count means the same thing everywhere. This analysis found it does not, which is why a high count in a breast or prostate cancer is weaker evidence than the same count in a lung cancer.",
    caveats: [
      "Retrospective pooling of cohorts treated with different checkpoint inhibitors at different times.",
      "Cancer types were grouped by a correlation the authors derived, not by a prespecified rule.",
    ],
    links: [{ label: "McGrail et al., Ann Oncol 2021", url: doiUrl("10.1016/j.annonc.2021.02.006") }, { label: "PubMed", url: pubmed("33736924") }],
    technologies: ["tmb-testing"], terms: ["tmb", "tumour-agnostic"], journals: ["annals-of-oncology"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-marabelle-keynote-158-tmb-lancet-oncol-2020",
    name: "Association of tumour mutational burden with outcomes in patients with advanced solid tumours treated with pembrolizumab: prospective biomarker analysis of KEYNOTE-158",
    tldr: "In ten hard-to-treat cancer types, 29 in 100 people whose tumours carried at least 10 mutations per million DNA letters responded to pembrolizumab, against 6 in 100 below that line.",
    summary: "KEYNOTE-158 was a multi-cohort, open-label, non-randomised phase 2 study of pembrolizumab 200 mg every three weeks in previously treated advanced anal, biliary, cervical, endometrial, mesothelioma, neuroendocrine, salivary, small-cell lung, thyroid and vulvar cancers, at 81 sites in 21 countries. Tissue tumour mutational burden was measured with FoundationOne CDx and the prespecified high cut-off was at least 10 mutations per megabase.\n\nOf 1,050 patients enrolled at least 26 weeks before the June 2019 cut-off, 790 (75 per cent) were evaluable for TMB. 102 (13 per cent) were TMB-high and 688 were not. Objective responses occurred in 30 of 102 (29 per cent, 95 per cent confidence interval 21 to 39) of the high group and 43 of 688 (6 per cent, 5 to 8) of the rest. Grade 3 to 5 treatment-related adverse events occurred in 15 per cent of the high group. This analysis underpins the tumour-agnostic approval of pembrolizumab for TMB-high solid tumours.",
    journal: "The Lancet Oncology", year: 2020, doi: "10.1016/S1470-2045(20)30445-9", pmid: "32919526", authors: "Marabelle A, Fakih M, Lopez J, et al.",
    paperType: "observational", participants: 790, changedPractice: true,
    findings: [
      "13 per cent of 790 evaluable patients had tissue TMB of at least 10 mutations per megabase on FoundationOne CDx.",
      "Objective response 29 per cent in the TMB-high group against 6 per cent in the rest.",
      "A quarter of treated patients had no evaluable TMB result.",
    ],
    whatItMeans: "It is the evidence for one cut-off across many cancers. It was gathered in ten selected cancer types, and later analyses question whether the line sits in the same place for every tumour.",
    caveats: [
      "Non-randomised, so response in the TMB-high group is not compared with another treatment.",
      "Ten selected cancer types; breast, prostate, colorectal and brain tumours were not among them.",
      "One assay; panels measure TMB differently.",
    ],
    links: [{ label: "Marabelle et al., Lancet Oncol 2020", url: doiUrl("10.1016/S1470-2045(20)30445-9") }, { label: "PubMed", url: pubmed("32919526") }],
    technologies: ["tmb-testing"], terms: ["tmb", "tumour-agnostic"], trials: ["keynote-158"], drugs: ["pembrolizumab", "foundationone-cdx"], journals: ["lancet-oncology"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-cohen-msi-dmmr-misdiagnosis-colorectal-jama-oncol-2019",
    name: "Association of primary resistance to immune checkpoint inhibitors in metastatic colorectal cancer with misdiagnosis of microsatellite instability or mismatch repair deficiency status",
    tldr: "When colorectal cancers labelled mismatch-repair deficient did not respond to immunotherapy, three of five turned out on retesting not to be deficient at all; local results were wrong about one time in ten.",
    summary: "A post hoc analysis of a single-centre prospective cohort of 38 patients with metastatic colorectal cancer diagnosed as MSI or dMMR by local laboratories and treated in checkpoint inhibitor trials in 2015 and 2016, with a retrospective cohort of 93 such cases from six French hospitals. Every tumour was retested by immunohistochemistry for the four mismatch-repair proteins and by PCR with pentaplex markers and the HSP110 T17 repeat.\n\nPrimary resistance occurred in 5 of the 38 patients (13 per cent), and 3 of those 5 tumours were microsatellite stable or mismatch-repair proficient on reassessment. The positive predictive value of the local result was 92.1 per cent (95 per cent confidence interval 78.5 to 98.0) in the treated cohort and 90.3 per cent (82.4 to 95.0) in the retrospective cohort, where 9 of 93 had been misdiagnosed. The authors recommended testing by both immunohistochemistry and PCR before checkpoint inhibitors.",
    journal: "JAMA Oncology", year: 2019, doi: "10.1001/jamaoncol.2018.4942", pmid: "30452494", authors: "Cohen R, Hain E, Buhard O, et al.",
    paperType: "observational", participants: 131,
    findings: [
      "Positive predictive value of local MSI or dMMR results: 92.1 per cent in 38 treated patients and 90.3 per cent in 93 retrospective cases.",
      "3 of 5 tumours with primary resistance to checkpoint inhibitors were not MSI or dMMR on central retesting.",
      "A third assay (HT17) settled 2 of 4 cases where immunohistochemistry and PCR disagreed.",
    ],
    whatItMeans: "Before starting immunotherapy on a mismatch-repair result, especially when the cancer does not respond, it is worth asking whether the result was confirmed by a second method.",
    caveats: [
      "Small numbers, as the authors say; larger studies were called for.",
      "French laboratories in 1998 to 2016; testing practice has changed since.",
    ],
    links: [{ label: "Cohen et al., JAMA Oncol 2019", url: doiUrl("10.1001/jamaoncol.2018.4942") }, { label: "PubMed", url: pubmed("30452494") }],
    technologies: ["msi-mmr-testing"], terms: ["msi"], cancers: ["msi-high-colorectal"], journals: ["jama-oncology"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-razavi-cfdna-variant-sources-clonal-haematopoiesis-nat-med-2019",
    name: "High-intensity sequencing reveals the sources of plasma circulating cell-free DNA variants",
    tldr: "Sequencing blood plasma and white blood cells side by side showed that most mutations found in plasma came from ageing blood-forming cells, not from the cancer.",
    summary: "A prospective study of 124 patients with metastatic cancer and contemporaneous tumour biopsies, and 47 controls without cancer, sequenced plasma cell-free DNA and matched white blood cell DNA across 508 genes and 2 megabases at more than 60,000-fold raw depth. The assay allowed de novo detection of tumour mutations and inference of tumour mutational burden, microsatellite instability and mutational signatures from plasma.\n\nThe vast majority of cell-free DNA mutations, 81.6 per cent in controls and 53.2 per cent in patients with cancer, had features consistent with clonal haematopoiesis. The authors concluded that clonal haematopoiesis is pervasive and that matched plasma and white blood cell sequencing is important for accurate interpretation.",
    journal: "Nature Medicine", year: 2019, doi: "10.1038/s41591-019-0652-7", pmid: "31768066", authors: "Razavi P, Li BT, Brown DN, et al.",
    paperType: "translational", participants: 171,
    findings: [
      "53.2 per cent of cell-free DNA mutations in patients with cancer and 81.6 per cent in controls had features of clonal haematopoiesis.",
      "Matched white blood cell sequencing separated blood-cell mutations from tumour mutations.",
    ],
    whatItMeans: "A plasma test that does not also sequence the person's white blood cells can report a blood-cell mutation as a cancer mutation, and the commonest such genes include some that decide treatment.",
    caveats: ["Research assay at more than 60,000-fold raw depth across 2 megabases.", "The share was 81.6 per cent in people without cancer and 53.2 per cent in people with metastatic cancer, so it depends on how much tumour DNA is present."],
    links: [{ label: "Razavi et al., Nat Med 2019", url: doiUrl("10.1038/s41591-019-0652-7") }, { label: "PubMed", url: pubmed("31768066") }],
    technologies: ["liquid-biopsy"], pathways: ["clonal-haematopoiesis"], terms: ["cfdna", "ctdna"], journals: ["nature-medicine"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-bettegowda-ctdna-early-late-stage-stm-2014",
    name: "Detection of circulating tumor DNA in early- and late-stage human malignancies",
    tldr: "Tumour DNA could be found in the blood of more than three quarters of people with many advanced cancers, but in fewer than half with brain, kidney, prostate or thyroid cancers, and less often when the cancer was localised.",
    summary: "Digital PCR-based methods were used to look for circulating tumour DNA in 640 patients with a range of cancers. It was detectable in more than 75 per cent of patients with advanced pancreatic, ovarian, colorectal, bladder, gastro-oesophageal, breast, melanoma, hepatocellular and head and neck cancers, but in less than 50 per cent with primary brain, renal, prostate or thyroid cancers. In localised disease it was detected in 73, 57, 48 and 50 per cent of patients with colorectal, gastro-oesophageal, pancreatic and breast cancer respectively. It was often present without detectable circulating tumour cells.\n\nIn 206 patients with metastatic colorectal cancer, plasma detected clinically relevant KRAS mutations with 87.2 per cent sensitivity and 99.2 per cent specificity. In 24 patients who responded to EGFR blockade and then relapsed, 23 (96 per cent) developed one or more mutations in MAPK pathway genes.",
    journal: "Science Translational Medicine", year: 2014, doi: "10.1126/scitranslmed.3007094", pmid: "24553385", authors: "Bettegowda C, Sausen M, Leary RJ, et al.",
    paperType: "translational", participants: 640,
    findings: [
      "Circulating tumour DNA detectable in more than 75 per cent of nine advanced cancer types and in fewer than 50 per cent of primary brain, renal, prostate and thyroid cancers.",
      "Localised disease: 73 per cent colorectal, 57 per cent gastro-oesophageal, 48 per cent pancreatic, 50 per cent breast.",
      "Plasma KRAS testing in 206 metastatic colorectal cancers: sensitivity 87.2 per cent, specificity 99.2 per cent.",
    ],
    whatItMeans: "Which cancer a person has decides how much a blood test can see, and a negative plasma result means least in the cancers that shed least.",
    caveats: ["Digital PCR of known mutations. A later sequencing study detected tumour DNA before surgery in 108 of 122 people with stage I to III colorectal cancer, 88.5 per cent (Reinert 2019), so these percentages depend on the assay.", "Patients were not a random sample of each cancer."],
    links: [{ label: "Bettegowda et al., Sci Transl Med 2014", url: doiUrl("10.1126/scitranslmed.3007094") }, { label: "PubMed", url: pubmed("24553385") }],
    technologies: ["liquid-biopsy"], terms: ["ctdna"], journals: ["science-translational-medicine"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-abbosh-tracerx-ctdna-relapse-nature-2023",
    name: "Tracking early lung cancer metastatic dissemination in TRACERx using ctDNA",
    tldr: "Tracking about 200 of each patient's own tumour mutations in blood after lung cancer surgery found tumour DNA in half of those who later relapsed from one sample, and in more with repeated testing.",
    summary: "The TRACERx team tracked a median of 200 mutations identified in resected non-small-cell lung cancer across 1,069 plasma samples from 197 patients. Lung adenocarcinomas with no circulating tumour DNA before surgery were biologically indolent with good outcomes. In plasma taken within 120 days after surgery, tumour DNA was detected in 25 per cent of patients, including 49 per cent of all who went on to relapse; surveillance every three to six months identified impending relapse in a further 20 per cent of patients who were negative at that landmark.\n\nA bioinformatic tool, ECLIPSE, tracked subclonal architecture at low tumour DNA levels and identified patients with polyclonal metastatic dissemination, which was associated with a worse clinical outcome. Subclones that seeded future metastases were more expanded in preoperative plasma than non-metastatic ones.",
    journal: "Nature", year: 2023, doi: "10.1038/s41586-023-05776-4", pmid: "37055640", authors: "Abbosh C, Frankell AM, Harrison T, et al.",
    paperType: "translational", participants: 197,
    findings: [
      "Postoperative landmark plasma (within 120 days) positive in 25 per cent of patients, including 49 per cent of those who relapsed.",
      "Three- to six-monthly surveillance detected impending relapse in a further 20 per cent of landmark-negative patients.",
      "No preoperative tumour DNA marked biologically indolent lung adenocarcinoma with good outcomes.",
    ],
    whatItMeans: "One negative blood test after surgery misses about half of the people who will relapse, even with a very broad tumour-informed panel; repeated testing catches more. The test's sensitivity is limited by how much DNA the tumour sheds, not only by the assay.",
    caveats: ["Research assay tracking a median of 200 mutations, broader than most commercial tests.", "Observational: results did not change treatment."],
    links: [{ label: "Abbosh et al., Nature 2023", url: doiUrl("10.1038/s41586-023-05776-4") }, { label: "PubMed", url: pubmed("37055640") }],
    technologies: ["mrd-testing"], terms: ["ctdna", "mrd"], trials: ["tracerx"], cancers: ["nsclc"], journals: ["nature"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-zviran-whole-genome-cfdna-residual-disease-nat-med-2020",
    name: "Genome-wide cell-free DNA mutational integration enables ultra-sensitive cancer monitoring",
    tldr: "Reading the whole genome of DNA in the blood, rather than a few genes very deeply, let researchers detect tumour DNA at one part in 100,000 by adding up thousands of mutations.",
    summary: "The authors found that low tumour fraction combined with the limited number of DNA fragments in a blood sample restricts low-burden monitoring by deep targeted sequencing, and reasoned that breadth could replace depth. Whole-genome sequencing of cell-free DNA, integrating the signal of thousands of somatic mutations found in solid tumours, reached tumour fraction detection sensitivity as low as 10⁻⁵. The approach tracked tumour burden over time and detected postoperative residual disease, which was associated with adverse outcome.",
    journal: "Nature Medicine", year: 2020, doi: "10.1038/s41591-020-0915-3", pmid: "32483360", authors: "Zviran A, Schulman RC, Shah M, et al.",
    paperType: "methods",
    findings: [
      "Deep targeted sequencing is limited by the number of DNA fragments in the sample, not only by sequencing depth.",
      "Whole-genome integration of thousands of mutations reached a tumour fraction detection sensitivity as low as 10⁻⁵.",
    ],
    whatItMeans: "It explains why adding sequencing depth to a small panel stops helping, and points to whole-genome and multi-mutation tests as the way to see less tumour DNA.",
    caveats: ["Proof of principle; clinical performance in prospective trials is a separate question."],
    links: [{ label: "Zviran et al., Nat Med 2020", url: doiUrl("10.1038/s41591-020-0915-3") }, { label: "PubMed", url: pubmed("32483360") }],
    technologies: ["mrd-testing", "wes-wgs"], terms: ["cfdna", "ctdna"], journals: ["nature-medicine"], sections: ["diagnostics"],
  }),
  p({
    id: "paper-esmo-ctdna-assay-recommendations-ann-oncol-2022",
    name: "ESMO recommendations on the use of circulating tumour DNA assays for patients with cancer: a report from the ESMO Precision Medicine Working Group",
    tldr: "Europe's oncology society advised that blood tests for tumour DNA can guide targeted treatment in advanced cancer, that tissue is still preferred for many patients, and that residual disease tests after surgery were not yet ready for routine use.",
    summary: "An ESMO expert working group reviewed the analytical and clinical validity and utility of plasma circulating tumour DNA assays. For advanced cancer, validated and adequately sensitive assays have utility in identifying actionable mutations to direct targeted therapy and may be used routinely, provided their limitations are taken into account. Tissue remains the preferred test for many patients because plasma assays are limited in detecting fusions and copy number changes, but plasma may be used routinely when faster results matter or tissue biopsy is not possible. Reflex tumour testing should be considered after a non-informative plasma result because of false negatives.\n\nFor early-stage cancer, detection of molecular residual disease or molecular relapse has high evidence of clinical validity in anticipating relapse in many cancers, but cannot be recommended in routine practice because there was no evidence of clinical utility in directing treatment. Response monitoring by early changes in tumour DNA, monitoring for resistance mutations before progression and screening of people without symptoms were under research and not recommended for routine practice.",
    journal: "Annals of Oncology", year: 2022, doi: "10.1016/j.annonc.2022.05.520", pmid: "35809752", authors: "Pascual J, Attard G, Bidard FC, et al.",
    paperType: "guideline", changedPractice: true,
    findings: [
      "Advanced cancer: validated plasma assays may be used routinely to find actionable mutations, with tissue still preferred for many patients.",
      "Reflex tissue testing advised after a non-informative plasma result.",
      "Residual disease testing after curative treatment: high clinical validity, not recommended routinely because clinical utility was unproven.",
      "Screening people without symptoms: research only.",
    ],
    whatItMeans: "It draws the line this whole area turns on: a test can predict relapse well and still not be shown to help, until a trial shows that acting on it changes outcomes. Since then IMvigor011 (2025) showed longer survival with atezolizumab given on a positive result in muscle-invasive bladder cancer; DYNAMIC (2022) had already shown that a negative result could safely spare chemotherapy in stage II colon cancer.",
    caveats: ["Written before the 2025 IMvigor011 and DYNAMIC-III results.", "European perspective; national reimbursement varies."],
    links: [{ label: "Pascual et al., Ann Oncol 2022", url: doiUrl("10.1016/j.annonc.2022.05.520") }, { label: "PubMed", url: pubmed("35809752") }],
    technologies: ["liquid-biopsy", "mrd-testing", "mced"], terms: ["ctdna", "mrd"], journals: ["annals-of-oncology"], sections: ["diagnostics"],
    tags: ["guideline"],
  }),
];

export const precisionMolecular: EntityInput[] = [...papers];
