import type { PaperInput } from "@/lib/schema";

const asOf = "2026-09-21";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

/**
 * Key papers for the pancreatic subtype pages in src/data/pancreatic-subtypes.ts: the pivotal trials behind each
 * page's standard of care (PRODIGE 24 and ESPAC-4 for resected disease, PREOPANC, ESPAC-5 and Alliance A021501 for
 * borderline resectable disease, LAP07 for locally advanced disease, POLO for germline BRCA, CodeBreaK 100 and KRYSTAL-1
 * for KRAS G12C, KEYNOTE-158 for mismatch repair deficiency), the NRG1 fusion discovery and treatment papers for KRAS
 * wild-type disease, the Fukuoka, Kyoto and European cyst guidelines, and the reference series for acinar cell carcinoma
 * and pancreatoblastoma. Every DOI was searched on Europe PMC (title, authors, journal, year and PMID read back from
 * the record) and resolved at doi.org before being recorded; figures come from the primary publications and are given
 * qualitatively where an exact number was uncertain. Trials that already exist in the corpus (FOLFIRINOX PRODIGE 4,
 * MPACT, NAPOLI 3, Le 2017) are reused through `keyPapers`, not duplicated here.
 */
export const papersPancreaticWave: PaperInput[] = [
  // ---------------------------------------------------------------------------------------------------------------------
  // Resectable disease: adjuvant chemotherapy
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-prodige-24-adjuvant-mfolfirinox-pancreatic-nejm-2018", name: "PRODIGE 24/CCTG PA6: adjuvant modified FOLFIRINOX versus gemcitabine after resection of pancreatic cancer",
    tldr: "Six months of the four-drug combination modified FOLFIRINOX after surgery for pancreatic cancer kept the disease away for almost twice as long as gemcitabine alone and added about a year and a half to median survival. It is the reason fit patients are now offered FOLFIRINOX after a pancreatic operation.",
    summary: "Randomised phase 3 trial in 493 patients in France and Canada who had undergone a complete (R0 or R1) resection of pancreatic ductal adenocarcinoma, had a CA19-9 below 180 U/mL and were fit enough for combination chemotherapy. Patients received six months of modified FOLFIRINOX (oxaliplatin, irinotecan, leucovorin and infusional fluorouracil without the bolus) or gemcitabine.\n\nAt a median follow-up of 33.6 months, median disease-free survival was 21.6 months with modified FOLFIRINOX against 12.8 months with gemcitabine (hazard ratio 0.58), and median overall survival 54.4 against 35.0 months (hazard ratio 0.64). Grade 3 or 4 adverse events were more frequent with modified FOLFIRINOX (about 76 against 53 percent). Five-year results published in 2022 confirmed the survival benefit.",
    journal: "New England Journal of Medicine", year: 2018, doi: "10.1056/NEJMoa1809775", pmid: "30575490",
    authors: "Conroy T, Hammel P, Hebbar M, et al.", paperType: "rct", participants: 493, changedPractice: true,
    findings: ["Median disease-free survival 21.6 versus 12.8 months, hazard ratio 0.58.", "Median overall survival 54.4 versus 35.0 months, hazard ratio 0.64.", "Grade 3 or 4 adverse events in about 76 percent with modified FOLFIRINOX and 53 percent with gemcitabine."],
    whatItMeans: "Modified FOLFIRINOX is the adjuvant standard for patients who recover well from a pancreatic resection and can tolerate combination chemotherapy; gemcitabine-based regimens remain for those who cannot.",
    caveats: ["Patients were selected for fitness and a low postoperative CA19-9, so the result does not transfer directly to frailer patients.", "Adjuvant chemotherapy must start within 12 weeks of surgery, and many patients never recover enough to receive it, which is one argument for neoadjuvant treatment."],
    links: [{ label: "N Engl J Med 2018", url: "https://doi.org/10.1056/NEJMoa1809775" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/30575490/" }],
    cancers: ["resectable-pdac", "pancreatic"], drugs: ["folfirinox", "gemcitabine"], trials: ["prodige-24"], journals: ["nejm"], people: ["thierry-conroy"] }),

  p({ id: "paper-espac-4-gemcitabine-capecitabine-adjuvant-pancreatic-lancet-2017", name: "ESPAC-4: adjuvant gemcitabine plus capecitabine versus gemcitabine alone after resection of pancreatic cancer",
    tldr: "Adding the tablet capecitabine to gemcitabine after surgery for pancreatic cancer lengthened median survival by about two and a half months with little extra toxicity, giving patients who cannot manage FOLFIRINOX a better option than gemcitabine alone.",
    summary: "Open-label randomised phase 3 trial by the European Study Group for Pancreatic Cancer in 730 patients from 92 hospitals who had undergone complete macroscopic resection of pancreatic ductal adenocarcinoma. Patients received six cycles of gemcitabine alone or gemcitabine plus oral capecitabine.\n\nMedian overall survival was 28.0 months with the combination against 25.5 months with gemcitabine alone (hazard ratio 0.82). Five-year survival was higher with the combination, and grade 3 or 4 adverse events were similar between the arms apart from more hand-foot syndrome and diarrhoea with capecitabine.",
    journal: "The Lancet", year: 2017, doi: "10.1016/S0140-6736(16)32409-6", pmid: "28129987",
    authors: "Neoptolemos JP, Palmer DH, Ghaneh P, et al.", paperType: "rct", participants: 730, changedPractice: true,
    findings: ["Median overall survival 28.0 versus 25.5 months, hazard ratio 0.82.", "Toxicity was similar overall, with more hand-foot syndrome and diarrhoea in the combination arm."],
    whatItMeans: "Gemcitabine plus capecitabine became the adjuvant regimen for patients unfit for modified FOLFIRINOX, and remains the comparator in European trials of adjuvant treatment.",
    caveats: ["The absolute gain was modest and PRODIGE 24 soon showed a much larger benefit from modified FOLFIRINOX in fitter patients.", "Many patients had R1 resections, so the trial population differs from strictly R0 series."],
    links: [{ label: "Lancet 2017", url: "https://doi.org/10.1016/S0140-6736(16)32409-6" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/28129987/" }],
    cancers: ["resectable-pdac", "pancreatic"], drugs: ["gemcitabine", "capecitabine"], journals: ["lancet"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Borderline resectable disease: neoadjuvant treatment
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-preopanc-neoadjuvant-chemoradiotherapy-long-term-jco-2022", name: "PREOPANC long-term results: neoadjuvant gemcitabine-based chemoradiotherapy versus upfront surgery for resectable and borderline resectable pancreatic cancer",
    tldr: "Giving chemotherapy and radiotherapy before the operation, rather than operating first, tripled the share of patients alive at five years in this Dutch trial, with the gain clearest in borderline resectable tumours. It is the strongest randomised case for treating borderline resectable pancreatic cancer before surgery.",
    summary: "Long-term analysis of the Dutch Pancreatic Cancer Group's randomised phase 3 PREOPANC trial, in which 246 patients with resectable or borderline resectable pancreatic cancer were assigned to neoadjuvant gemcitabine-based chemoradiotherapy followed by surgery and adjuvant gemcitabine, or to immediate surgery followed by adjuvant gemcitabine.\n\nWith a median follow-up of 59 months, overall survival favoured the neoadjuvant arm (hazard ratio 0.73), with five-year survival of 20.5 percent against 6.5 percent even though median survival differed by little (15.7 against 14.3 months). The benefit was significant in the borderline resectable subgroup and consistent across the others. The 2020 primary report had shown better R0 resection rates and disease-free survival without a significant overall survival difference.",
    journal: "Journal of Clinical Oncology", year: 2022, doi: "10.1200/JCO.21.02233", pmid: "35084987",
    authors: "Versteijne E, van Dam JL, Suker M, et al.", paperType: "rct", participants: 246, changedPractice: true,
    findings: ["Overall survival hazard ratio 0.73 favouring neoadjuvant chemoradiotherapy; five-year survival 20.5 versus 6.5 percent.", "Median overall survival 15.7 versus 14.3 months, so the benefit sits in the tail of the curve.", "Significant benefit in the borderline resectable subgroup."],
    whatItMeans: "Neoadjuvant treatment is now the standard for borderline resectable pancreatic cancer, and PREOPANC is the trial guidelines cite; the follow-on PREOPANC-2 tested FOLFIRINOX in the same setting.",
    caveats: ["Gemcitabine-based chemoradiotherapy is no longer the preferred neoadjuvant regimen; most centres use FOLFIRINOX-based chemotherapy.", "Median survival in both arms was short by today's standards, and the trial was small."],
    links: [{ label: "J Clin Oncol 2022", url: "https://doi.org/10.1200/JCO.21.02233" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/35084987/" }],
    cancers: ["borderline-resectable-pdac", "resectable-pdac", "pancreatic"], drugs: ["gemcitabine"], trials: ["preopanc"], journals: ["jco"] }),

  p({ id: "paper-espac-5-neoadjuvant-borderline-resectable-pancreatic-lancet-gastro-hep-2023", name: "ESPAC5: immediate surgery versus short-course neoadjuvant chemotherapy or chemoradiotherapy for borderline resectable pancreatic cancer",
    tldr: "In this four-arm British trial, two months of chemotherapy before surgery for borderline resectable pancreatic cancer doubled the share of patients alive at one year compared with operating straight away, even though the same proportion got to an operation.",
    summary: "Multicentre randomised phase 2 trial of the European Study Group for Pancreatic Cancer in 90 patients with borderline resectable pancreatic ductal adenocarcinoma, randomised to immediate surgery or to one of three short-course neoadjuvant treatments (gemcitabine plus capecitabine, FOLFIRINOX, or capecitabine-based chemoradiotherapy) followed by surgery, with adjuvant chemotherapy in all arms.\n\nResection rates were similar between immediate surgery and the pooled neoadjuvant arms, but one-year overall survival was 39 percent after immediate surgery and 77 percent after neoadjuvant treatment (hazard ratio 0.27). The chemotherapy arms did better than chemoradiotherapy, and FOLFIRINOX did best.",
    journal: "The Lancet Gastroenterology and Hepatology", year: 2023, doi: "10.1016/S2468-1253(22)00348-X", pmid: "36521500",
    authors: "Ghaneh P, Palmer D, Cicconi S, et al.", paperType: "rct", participants: 90, changedPractice: true,
    findings: ["One-year overall survival 39 percent with immediate surgery versus 77 percent with neoadjuvant treatment, hazard ratio 0.27.", "Resection rates were similar (about 62 versus 55 percent), so the survival gain did not come from more operations.", "Neoadjuvant chemotherapy, especially FOLFIRINOX, outperformed chemoradiotherapy."],
    whatItMeans: "ESPAC5 supports neoadjuvant chemotherapy over immediate surgery in borderline resectable disease and points to FOLFIRINOX as the regimen to build on.",
    caveats: ["A phase 2 feasibility trial with 90 patients across four arms; the survival comparison was a secondary endpoint.", "Only two months of neoadjuvant treatment were given, shorter than most current protocols."],
    links: [{ label: "Lancet Gastroenterol Hepatol 2023", url: "https://doi.org/10.1016/S2468-1253(22)00348-X" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/36521500/" }],
    cancers: ["borderline-resectable-pdac", "pancreatic"], drugs: ["folfirinox", "gemcitabine", "capecitabine"] }),

  p({ id: "paper-alliance-a021501-mfolfirinox-radiotherapy-borderline-resectable-jama-oncol-2022", name: "Alliance A021501: preoperative modified FOLFIRINOX with or without hypofractionated radiotherapy for borderline resectable pancreatic cancer",
    tldr: "In the first randomised US trial of neoadjuvant treatment for borderline resectable pancreatic cancer, eight cycles of modified FOLFIRINOX alone gave two-thirds of patients an 18-month survival, while replacing the last cycle with short-course radiotherapy did worse and that arm was stopped early.",
    summary: "Multicentre randomised phase 2 trial in 126 patients with borderline resectable pancreatic ductal adenocarcinoma, assigned to eight cycles of modified FOLFIRINOX or to seven cycles followed by stereotactic body radiotherapy or hypofractionated image-guided radiotherapy, then surgery and adjuvant FOLFOX. The radiotherapy arm was closed at a planned interim analysis for futility.\n\nEighteen-month overall survival was 66.7 percent with chemotherapy alone and 47.3 percent with chemotherapy and radiotherapy; median overall survival was 29.8 against 17.1 months. The chemotherapy-alone arm met its prespecified benchmark against historical controls.",
    journal: "JAMA Oncology", year: 2022, doi: "10.1001/jamaoncol.2022.2319", pmid: "35834226",
    authors: "Katz MHG, Shi Q, Meyers J, et al.", paperType: "rct", participants: 126, changedPractice: true,
    findings: ["Eighteen-month overall survival 66.7 percent with modified FOLFIRINOX alone versus 47.3 percent with added radiotherapy.", "Median overall survival 29.8 versus 17.1 months; the radiotherapy arm was closed early for futility."],
    whatItMeans: "Neoadjuvant modified FOLFIRINOX without routine radiotherapy became the reference approach for borderline resectable disease in North America; radiotherapy is reserved for selected patients or trials.",
    caveats: ["The two arms were not formally compared with each other; each was judged against a historical benchmark.", "Only about half of patients in each arm went on to resection, and the radiotherapy arm was small after early closure."],
    links: [{ label: "JAMA Oncol 2022", url: "https://doi.org/10.1001/jamaoncol.2022.2319" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/35834226/" }],
    cancers: ["borderline-resectable-pdac", "pancreatic"], drugs: ["folfirinox"], journals: ["jama-oncology"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Locally advanced disease
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-lap07-chemoradiotherapy-locally-advanced-pancreatic-jama-2016", name: "LAP07: chemoradiotherapy versus continued chemotherapy for locally advanced pancreatic cancer controlled after four months of gemcitabine",
    tldr: "Adding radiotherapy after four months of chemotherapy did not help patients with inoperable pancreatic cancer confined to the pancreas live longer, though it delayed regrowth at the original site. Nor did adding the pill erlotinib to gemcitabine. The result pushed radiotherapy out of the routine pathway for locally advanced disease.",
    summary: "International open-label randomised phase 3 trial with two randomisations: 449 patients with locally advanced pancreatic cancer received gemcitabine with or without erlotinib, and the 269 whose disease had not progressed after four months were randomised again to capecitabine-based chemoradiotherapy (54 Gy) or two further months of the same chemotherapy.\n\nMedian overall survival was 15.2 months with chemoradiotherapy and 16.5 months with chemotherapy alone (hazard ratio 1.03), and 11.9 against 13.6 months with and without erlotinib. Chemoradiotherapy reduced local progression (about 32 against 46 percent) and lengthened the interval off treatment, without more grade 3 or 4 toxicity apart from nausea.",
    journal: "JAMA", year: 2016, doi: "10.1001/jama.2016.4324", pmid: "27139057",
    authors: "Hammel P, Huguet F, van Laethem JL, et al.", paperType: "rct", participants: 449, changedPractice: true,
    findings: ["Median overall survival 15.2 months with chemoradiotherapy versus 16.5 months with continued chemotherapy, hazard ratio 1.03.", "Erlotinib added to gemcitabine did not improve survival (11.9 versus 13.6 months).", "Local progression fell from about 46 to 32 percent with chemoradiotherapy."],
    whatItMeans: "Systemic chemotherapy is the backbone for locally advanced pancreatic cancer; consolidation chemoradiotherapy is an option to control local symptoms or as a bridge to surgery rather than a survival treatment.",
    caveats: ["Gemcitabine was the chemotherapy; whether radiotherapy adds to FOLFIRINOX or gemcitabine plus nab-paclitaxel remains an open question.", "Conventional fractionation was used; stereotactic and dose-escalated radiotherapy are being tested separately."],
    links: [{ label: "JAMA 2016", url: "https://doi.org/10.1001/jama.2016.4324" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/27139057/" }],
    cancers: ["locally-advanced-pdac", "pancreatic"], drugs: ["gemcitabine", "erlotinib", "capecitabine"], journals: ["jama"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // KRAS G12C
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-codebreak-100-sotorasib-kras-g12c-pancreatic-nejm-2023", name: "CodeBreaK 100: sotorasib in KRAS p.G12C-mutated advanced pancreatic cancer",
    tldr: "The first KRAS-blocking pill shrank tumours in about one in five patients with heavily pretreated pancreatic cancer carrying the G12C mutation and controlled the disease in most for a few months. Modest as that is, it was the first direct hit on the gene that drives nearly every pancreatic cancer.",
    summary: "Phase 1 and 2 single-arm cohorts of the CodeBreaK 100 trial in 38 patients with KRAS p.G12C-mutated metastatic pancreatic ductal adenocarcinoma who had received at least one prior systemic therapy (most had received two or more), treated with sotorasib 960 mg once daily.\n\nThe confirmed objective response rate was 21 percent and disease control about 84 percent; median progression-free survival was 4.0 months and median overall survival 6.9 months. Treatment-related grade 3 adverse events occurred in about one in six patients, mainly diarrhoea and fatigue, with no fatal events.",
    journal: "New England Journal of Medicine", year: 2023, doi: "10.1056/NEJMoa2208470", pmid: "36546651",
    authors: "Strickler JH, Satake H, George TJ, et al.", paperType: "observational", participants: 38, changedPractice: true,
    findings: ["Objective response 21 percent; disease control about 84 percent.", "Median progression-free survival 4.0 months and median overall survival 6.9 months."],
    whatItMeans: "Sotorasib is a guideline-listed later-line option for the 1 to 2 percent of pancreatic cancers with KRAS G12C, and the proof that KRAS in pancreatic cancer is druggable; the larger opportunity lies with inhibitors of G12D and pan-RAS drugs.",
    caveats: ["A small single-arm cohort with no comparator; the response rate is far below that seen in lung cancer.", "Responses were short, and resistance mechanisms in pancreatic cancer are only partly described."],
    links: [{ label: "N Engl J Med 2023", url: "https://doi.org/10.1056/NEJMoa2208470" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/36546651/" }],
    cancers: ["kras-g12c-pdac", "pancreatic"], drugs: ["sotorasib"], journals: ["nejm"] }),

  p({ id: "paper-krystal-1-adagrasib-kras-g12c-solid-tumours-jco-2023", name: "KRYSTAL-1: adagrasib in advanced solid tumours harbouring a KRAS G12C mutation, including pancreatic cancer",
    tldr: "Adagrasib, the second KRAS G12C pill, shrank tumours in about a third of patients with pancreatic cancer and in two in five with bile duct cancer in this basket study, with disease control for several months.",
    summary: "Phase 2 cohort of the KRYSTAL-1 trial in 64 patients with previously treated KRAS G12C-mutated solid tumours other than lung or colorectal cancer, treated with adagrasib 600 mg twice daily. The pancreatic cohort had 21 patients and the biliary tract cohort 12; other tumours included appendiceal, ovarian, endometrial and small bowel cancers.\n\nIn pancreatic cancer the objective response rate was about 33 percent, with median progression-free survival of 5.4 months and median overall survival of 8.0 months; in biliary tract cancer the response rate was about 42 percent. Treatment-related adverse events were mostly gastrointestinal and manageable with dose reduction.",
    journal: "Journal of Clinical Oncology", year: 2023, doi: "10.1200/JCO.23.00434", pmid: "37099736",
    authors: "Bekaii-Saab TS, Yaeger R, Spira AI, et al.", paperType: "observational", participants: 64, changedPractice: true,
    findings: ["Pancreatic cohort (21 patients): objective response about 33 percent, median progression-free survival 5.4 months, median overall survival 8.0 months.", "Biliary tract cohort (12 patients): objective response about 42 percent."],
    whatItMeans: "Adagrasib joins sotorasib as a later-line option for KRAS G12C pancreatic cancer in guidelines; both drugs are the template for the G12D and pan-RAS inhibitors now in pancreatic trials.",
    caveats: ["Small single-arm cohorts with a short follow-up; the pancreatic response rate has a wide confidence interval.", "KRAS G12C is found in only 1 to 2 percent of pancreatic cancers."],
    links: [{ label: "J Clin Oncol 2023", url: "https://doi.org/10.1200/JCO.23.00434" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/37099736/" }],
    cancers: ["kras-g12c-pdac", "pancreatic"], drugs: ["adagrasib"], trials: ["nct03785249"], journals: ["jco"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // KRAS wild-type: NRG1 fusions
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-heining-nrg1-fusions-kras-wild-type-pancreatic-cancer-discov-2018", name: "Heining 2018: NRG1 fusions in KRAS wild-type pancreatic cancer",
    tldr: "Whole-genome and RNA sequencing of pancreatic cancers in younger patients found that most of the tumours without a KRAS mutation instead carried a fusion of the NRG1 gene, and two patients given a HER-family blocker responded. It established NRG1 fusions as the driver to look for in KRAS wild-type pancreatic cancer.",
    summary: "Report from the German NCT/DKTK MASTER precision oncology programme on whole-genome and transcriptome sequencing of pancreatic ductal adenocarcinomas from young patients (50 or under). Among the tumours without a KRAS mutation, most harboured an NRG1 gene fusion, whereas no KRAS-mutant tumour did.\n\nTwo patients with NRG1 fusion-positive tumours treated with the ERBB inhibitor afatinib had clinical and radiological responses, providing the first evidence that these fusions are actionable in pancreatic cancer and that RNA-level analysis is needed to find them.",
    journal: "Cancer Discovery", year: 2018, doi: "10.1158/2159-8290.CD-18-0036", pmid: "29802158",
    authors: "Heining C, Horak P, Uhrig S, et al.", paperType: "translational", changedPractice: true,
    findings: ["NRG1 fusions were found in most KRAS wild-type pancreatic cancers in a young-onset cohort and in none of the KRAS-mutant tumours.", "Two patients with NRG1 fusion-positive tumours responded to afatinib."],
    whatItMeans: "KRAS wild-type status should trigger fusion testing, ideally by RNA sequencing, because NRG1 fusions can be targeted by HER-family inhibitors and now by zenocutuzumab.",
    caveats: ["A small, young-onset cohort; the frequency of NRG1 fusions in unselected KRAS wild-type disease is lower.", "Afatinib responses were anecdotal and often short."],
    links: [{ label: "Cancer Discov 2018", url: "https://doi.org/10.1158/2159-8290.CD-18-0036" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/29802158/" }],
    cancers: ["kras-wild-type-pdac", "pancreatic"], drugs: ["afatinib"], journals: ["cancer-discovery"] }),

  p({ id: "paper-jones-nrg1-fusions-recurrent-actionable-kras-wild-type-pdac-ccr-2019", name: "Jones 2019: NRG1 gene fusions are recurrent, clinically actionable rearrangements in KRAS wild-type pancreatic ductal adenocarcinoma",
    tldr: "In a Canadian programme sequencing the genomes of advanced pancreatic cancers in real time, tumours without a KRAS mutation repeatedly carried NRG1 fusions, and patients treated with HER-family blockers on the strength of that finding responded. It showed that fusion testing in KRAS wild-type disease changes treatment.",
    summary: "Analysis of whole-genome and transcriptome sequencing from patients with advanced pancreatic ductal adenocarcinoma in the COMPASS trial and related cohorts at BC Cancer and the Ontario Institute for Cancer Research. NRG1 fusions with several different partner genes were identified in a subset of the KRAS wild-type tumours and in none of the KRAS-mutant cases, and were confirmed at the RNA level.\n\nPatients with NRG1 fusion-positive tumours treated with ERBB-targeting drugs such as afatinib had radiological responses and falls in tumour markers. The authors argue for RNA-based fusion testing in every KRAS wild-type pancreatic cancer.",
    journal: "Clinical Cancer Research", year: 2019, doi: "10.1158/1078-0432.CCR-19-0191", pmid: "31068372",
    authors: "Jones MR, Williamson LM, Topham JT, et al.", paperType: "translational", changedPractice: true,
    findings: ["NRG1 fusions with multiple partners were recurrent among KRAS wild-type tumours and absent from KRAS-mutant tumours.", "Patients treated with ERBB inhibitors on the basis of an NRG1 fusion responded, with tumour marker declines."],
    whatItMeans: "Together with the German MASTER report, this paper is why guidelines recommend comprehensive profiling with fusion detection in KRAS wild-type pancreatic cancer.",
    caveats: ["Small numbers of fusion-positive patients; responses were described in a handful of cases.", "DNA panels with limited intron coverage miss many NRG1 fusions, so the frequency depends on the assay."],
    links: [{ label: "Clin Cancer Res 2019", url: "https://doi.org/10.1158/1078-0432.CCR-19-0191" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31068372/" }],
    cancers: ["kras-wild-type-pdac", "pancreatic"], drugs: ["afatinib"], journals: ["clinical-cancer-research"] }),

  p({ id: "paper-enrgy-zenocutuzumab-nrg1-fusion-positive-cancer-nejm-2025", name: "eNRGy: efficacy of zenocutuzumab in NRG1 fusion-positive cancer",
    tldr: "Zenocutuzumab, an antibody that grips HER2 and HER3 at once so the NRG1 growth signal cannot get through, shrank tumours in about three in ten patients whose cancers carried an NRG1 fusion, with responses lasting close to a year, and did best in pancreatic cancer. It became the first drug approved for a pancreatic cancer driver alteration.",
    summary: "Phase 2 registrational analysis of the eNRGy basket trial of zenocutuzumab 750 mg every two weeks in patients with advanced NRG1 fusion-positive solid tumours, mostly non-small-cell lung cancer and pancreatic cancer, who had progressed on standard therapy. Among efficacy-evaluable patients the objective response rate was about 30 percent with a median duration of response of about 11 months; the response rate in pancreatic cancer was higher, around 40 percent.\n\nThe drug was well tolerated, with diarrhoea, fatigue and infusion-related reactions the commonest adverse events and few discontinuations. The US FDA granted accelerated approval in December 2024 for NRG1 fusion-positive non-small-cell lung cancer and pancreatic adenocarcinoma after prior systemic therapy.",
    journal: "New England Journal of Medicine", year: 2025, doi: "10.1056/NEJMoa2405008", pmid: "39908431",
    authors: "Schram AM, Goto K, Kim DW, et al.", paperType: "observational", changedPractice: true,
    findings: ["Objective response about 30 percent across NRG1 fusion-positive cancers, median duration of response about 11 months.", "Higher response rate in pancreatic cancer, around 40 percent.", "Accelerated FDA approval for NRG1 fusion-positive lung and pancreatic cancer followed in December 2024."],
    whatItMeans: "Every KRAS wild-type pancreatic cancer should be tested for NRG1 fusions because a specific, approved antibody now exists; zenocutuzumab is the first targeted drug approved for a pancreatic cancer driver.",
    caveats: ["Single-arm basket trial; approval is accelerated and conditional on confirmatory data.", "NRG1 fusions are present in well under 1 percent of pancreatic cancers overall, so the eligible population is small."],
    links: [{ label: "N Engl J Med 2025", url: "https://doi.org/10.1056/NEJMoa2405008" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/39908431/" }],
    cancers: ["kras-wild-type-pdac", "pancreatic"], drugs: ["zenocutuzumab"], trials: ["nct02912949"], journals: ["nejm"], people: ["eileen-oreilly", "alexander-drilon"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Germline BRCA and PALB2
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-polo-olaparib-maintenance-gbrca-pancreatic-nejm-2019", name: "POLO: maintenance olaparib for germline BRCA-mutated metastatic pancreatic cancer",
    tldr: "In patients with inherited BRCA mutations whose pancreatic cancer had been held in check by platinum chemotherapy, switching to the tablet olaparib roughly doubled the time before the disease grew again compared with placebo. It was the first biomarker-driven approval in pancreatic cancer.",
    summary: "International double-blind randomised phase 3 trial in 154 patients with a germline BRCA1 or BRCA2 mutation and metastatic pancreatic adenocarcinoma that had not progressed during at least 16 weeks of first-line platinum-based chemotherapy, randomised 3:2 to maintenance olaparib 300 mg twice daily or placebo.\n\nMedian progression-free survival was 7.4 months with olaparib and 3.8 months with placebo (hazard ratio 0.53); at the interim analysis there was no difference in overall survival. Health-related quality of life was maintained. The FDA approved olaparib for this indication in December 2019.",
    journal: "New England Journal of Medicine", year: 2019, doi: "10.1056/NEJMoa1903387", pmid: "31157963",
    authors: "Golan T, Hammel P, Reni M, et al.", paperType: "rct", participants: 154, changedPractice: true,
    findings: ["Median progression-free survival 7.4 versus 3.8 months, hazard ratio 0.53.", "No overall survival difference at the interim analysis (hazard ratio about 0.9).", "About 4 to 7 percent of pancreatic cancers carry a germline BRCA mutation, so germline testing is needed to find candidates."],
    whatItMeans: "Germline testing for every pancreatic cancer patient, platinum first line for BRCA carriers, and olaparib maintenance for those who respond are all downstream of POLO.",
    caveats: ["The final analysis found no significant overall survival benefit.", "Only 154 of over 3,300 screened patients were randomised; the trial required platinum sensitivity and excluded those who had progressed."],
    links: [{ label: "N Engl J Med 2019", url: "https://doi.org/10.1056/NEJMoa1903387" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31157963/" }],
    cancers: ["brca-palb2-pdac", "pancreatic"], drugs: ["olaparib"], trials: ["polo"], journals: ["nejm"], people: ["talia-golan"] }),

  p({ id: "paper-polo-overall-survival-olaparib-gbrca-pancreatic-jco-2022", name: "POLO final overall survival: maintenance olaparib versus placebo in germline BRCA-mutated metastatic pancreatic cancer",
    tldr: "The final results of POLO showed that olaparib did not lengthen overall survival on average, although about twice as many patients on olaparib were alive at three years, and the drug delayed the time until a second treatment was needed.",
    summary: "Prespecified final overall survival analysis of the POLO trial (154 patients with a germline BRCA mutation and platinum-sensitive metastatic pancreatic cancer). Median overall survival was 19.0 months with olaparib and 19.2 months with placebo (hazard ratio 0.83, not significant).\n\nSurvival curves separated late: about 34 percent of olaparib patients were alive at three years against about 18 percent on placebo. Time to second disease progression and time to second subsequent therapy favoured olaparib, and no new safety signals appeared with longer follow-up.",
    journal: "Journal of Clinical Oncology", year: 2022, doi: "10.1200/JCO.21.01604", pmid: "35834777",
    authors: "Kindler HL, Hammel P, Reni M, et al.", paperType: "rct", participants: 154, changedPractice: true,
    findings: ["Median overall survival 19.0 versus 19.2 months, hazard ratio 0.83, not statistically significant.", "Three-year survival about 34 percent with olaparib versus 18 percent with placebo.", "Time to second progression and to second subsequent therapy favoured olaparib."],
    whatItMeans: "Olaparib maintenance remains a standard option because of its progression-free benefit, tolerability and long-term survivors, but patients should know that it has not been shown to extend average survival.",
    caveats: ["Crossover to PARP inhibitors after progression on placebo was allowed, which may have diluted any survival effect.", "The trial was not powered for overall survival."],
    links: [{ label: "J Clin Oncol 2022", url: "https://doi.org/10.1200/JCO.21.01604" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/35834777/" }],
    cancers: ["brca-palb2-pdac", "pancreatic"], drugs: ["olaparib"], trials: ["polo"], journals: ["jco"], people: ["hedy-kindler", "talia-golan"] }),

  p({ id: "paper-oreilly-gemcitabine-cisplatin-veliparib-gbrca-palb2-pancreatic-jco-2020", name: "O'Reilly 2020: gemcitabine and cisplatin with or without veliparib in pancreatic cancer with a germline BRCA or PALB2 mutation",
    tldr: "In the first randomised trial restricted to pancreatic cancer patients with inherited BRCA or PALB2 mutations, platinum chemotherapy shrank tumours in about two-thirds and gave unusually long survival, while adding the PARP inhibitor veliparib to the chemotherapy did not help and added toxicity.",
    summary: "Randomised multicentre phase 2 trial in 50 patients with untreated locally advanced or metastatic pancreatic adenocarcinoma and a germline BRCA1, BRCA2 or PALB2 mutation, assigned to gemcitabine plus cisplatin with or without veliparib.\n\nObjective response rates were about 74 percent with veliparib and 65 percent without, not significantly different, and median overall survival was 15.5 against 16.4 months. Haematological toxicity was greater with veliparib. Across both arms, two-year survival was about 31 percent and three-year survival about 18 percent, far above unselected pancreatic cancer.",
    journal: "Journal of Clinical Oncology", year: 2020, doi: "10.1200/JCO.19.02931", pmid: "31976786",
    authors: "O'Reilly EM, Lee JW, Zalupski M, et al.", paperType: "rct", participants: 50, changedPractice: true,
    findings: ["Objective response about 74 percent with veliparib versus 65 percent with gemcitabine and cisplatin alone; median overall survival 15.5 versus 16.4 months.", "Two-year survival about 31 percent and three-year about 18 percent across both arms.", "More haematological toxicity with veliparib."],
    whatItMeans: "Gemcitabine plus cisplatin is a validated platinum doublet for BRCA or PALB2 carriers, and the trial explains why PARP inhibitors are used as maintenance after platinum rather than concurrently with it.",
    caveats: ["A 50-patient phase 2 without a non-platinum comparator, so the platinum benefit is inferred from historical controls.", "PALB2 carriers were few."],
    links: [{ label: "J Clin Oncol 2020", url: "https://doi.org/10.1200/JCO.19.02931" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31976786/" }],
    cancers: ["brca-palb2-pdac", "pancreatic"], drugs: ["gemcitabine", "cisplatin"], journals: ["jco"], people: ["eileen-oreilly"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Mismatch repair deficiency
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-keynote-158-pembrolizumab-msi-high-noncolorectal-jco-2020", name: "KEYNOTE-158: pembrolizumab in non-colorectal high microsatellite instability or mismatch repair-deficient cancer",
    tldr: "Pembrolizumab shrank tumours in about a third of patients with mismatch repair-deficient cancers of many different organs, with responses that often lasted years; the pancreatic cancer group responded less often than most. It is the trial behind the tissue-agnostic approval for MSI-high cancer.",
    summary: "Phase 2 basket study of pembrolizumab 200 mg every three weeks in 233 patients with previously treated advanced non-colorectal MSI-high or mismatch repair-deficient cancer across 27 tumour types, endometrial, gastric, cholangiocarcinoma and pancreatic cancer among the largest cohorts.\n\nThe objective response rate was about 34 percent with a median duration of response not reached, median progression-free survival 4.1 months and median overall survival 23.5 months. In the 22 patients with pancreatic cancer the response rate was about 18 percent and median overall survival about 4 months, the lowest of the major cohorts. The data supported the FDA's tissue-agnostic approval of pembrolizumab for MSI-high cancer.",
    journal: "Journal of Clinical Oncology", year: 2020, doi: "10.1200/JCO.19.02105", pmid: "31682550",
    authors: "Marabelle A, Le DT, Ascierto PA, et al.", paperType: "observational", participants: 233, changedPractice: true,
    findings: ["Objective response about 34 percent across 27 non-colorectal tumour types; median overall survival 23.5 months.", "Pancreatic cohort of 22 patients: response about 18 percent, median overall survival about 4 months."],
    whatItMeans: "Every pancreatic cancer should be tested for mismatch repair deficiency because the 1 percent who have it can receive pembrolizumab, but responses in pancreatic cancer are less frequent and less durable than in other MSI-high cancers.",
    caveats: ["Single-arm basket study; the pancreatic cohort was small and heavily pretreated.", "Some patients had MSI-high status assigned by PCR or immunohistochemistry alone, and misclassification is a known problem in pancreatic cancer."],
    links: [{ label: "J Clin Oncol 2020", url: "https://doi.org/10.1200/JCO.19.02105" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31682550/" }],
    cancers: ["msi-high-pdac", "pancreatic"], drugs: ["pembrolizumab"], trials: ["nct02628067"], journals: ["jco"], people: ["aurelien-marabelle", "dung-le"] }),

  p({ id: "paper-hu-mismatch-repair-deficiency-pancreatic-adenocarcinoma-ccr-2018", name: "Hu 2018: evaluating mismatch repair deficiency in pancreatic adenocarcinoma, challenges and recommendations",
    tldr: "Of more than 800 pancreatic cancers sequenced at one centre, under one in a hundred were mismatch repair deficient, most in people with Lynch syndrome, and several responded to immunotherapy. The paper set out how to test for the abnormality reliably in a cancer where standard tests often mislead.",
    summary: "Analysis of 833 pancreatic ductal adenocarcinomas sequenced with the MSK-IMPACT panel at Memorial Sloan Kettering, using MSIsensor scoring with immunohistochemistry and germline testing to identify mismatch repair deficiency. Deficiency was found in about 0.8 percent of tumours, most of them in patients with Lynch syndrome, and several treated with anti-PD-1 therapy had durable responses.\n\nThe authors show that low tumour cellularity and the desmoplastic stroma of pancreatic cancer make PCR-based microsatellite instability testing unreliable and recommend immunohistochemistry or sequencing-based assays with germline follow-up.",
    journal: "Clinical Cancer Research", year: 2018, doi: "10.1158/1078-0432.CCR-17-3099", pmid: "29367431",
    authors: "Hu ZI, Shia J, Stadler ZK, et al.", paperType: "observational", participants: 833, changedPractice: true,
    findings: ["Mismatch repair deficiency in about 0.8 percent of 833 pancreatic adenocarcinomas, most in Lynch syndrome carriers.", "Durable responses to PD-1 blockade in treated deficient cases.", "PCR-based MSI testing under-performs in pancreatic cancer; immunohistochemistry or sequencing is recommended."],
    whatItMeans: "Guidelines recommending universal mismatch repair testing in pancreatic cancer, by immunohistochemistry or sequencing rather than PCR alone, rest on this and similar series.",
    caveats: ["Single-centre series with a small number of deficient cases.", "Frequency estimates vary between 0.5 and 2 percent across cohorts depending on the assay."],
    links: [{ label: "Clin Cancer Res 2018", url: "https://doi.org/10.1158/1078-0432.CCR-17-3099" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/29367431/" }],
    cancers: ["msi-high-pdac", "pancreatic"], drugs: ["pembrolizumab"], journals: ["clinical-cancer-research"], people: ["eileen-oreilly"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Acinar cell carcinoma
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-klimstra-acinar-cell-carcinoma-pancreas-28-cases-ajsp-1992", name: "Klimstra 1992: acinar cell carcinoma of the pancreas, a clinicopathologic study of 28 cases",
    tldr: "The reference description of acinar cell carcinoma, the rare pancreatic cancer that grows from enzyme-producing cells: how it looks under the microscope, how to prove it with enzyme stains, and how it behaves, which is aggressive but somewhat less so than ordinary pancreatic cancer.",
    summary: "Clinicopathological study of 28 acinar cell carcinomas from the Armed Forces Institute of Pathology and Memorial Sloan Kettering. The tumours were large, mostly in older men, and about half had metastasised at diagnosis; a minority presented with the lipase hypersecretion syndrome of subcutaneous fat necrosis and polyarthralgia.\n\nHistologically the tumours showed acinar and solid growth with minimal stroma, and immunohistochemistry for trypsin, chymotrypsin and lipase confirmed acinar differentiation. Median survival was about 18 months, better than ductal adenocarcinoma but still poor, with occasional long-term survivors after resection.",
    journal: "American Journal of Surgical Pathology", year: 1992, doi: "10.1097/00000478-199209000-00001", pmid: "1384374",
    authors: "Klimstra DS, Heffess CS, Oertel JE, Rosai J.", paperType: "observational", participants: 28,
    findings: ["Acinar cell carcinoma makes up about 1 to 2 percent of pancreatic exocrine tumours; large tumours, older men, about half metastatic at diagnosis.", "Trypsin, chymotrypsin and lipase immunostains confirm acinar differentiation.", "Median survival about 18 months, better than ductal adenocarcinoma."],
    whatItMeans: "This series defined the diagnostic criteria still used for acinar cell carcinoma and established that it should be classified and treated as a distinct disease from ductal adenocarcinoma.",
    caveats: ["Retrospective consultation series from before modern chemotherapy; survival figures are historical.", "Mixed acinar-neuroendocrine tumours were only partly separated."],
    links: [{ label: "Am J Surg Pathol 1992", url: "https://doi.org/10.1097/00000478-199209000-00001" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/1384374/" }],
    cancers: ["pancreatic-acinar-cell-carcinoma", "pancreatic"] }),

  p({ id: "paper-la-rosa-acinar-cell-carcinoma-62-cases-ajsp-2012", name: "La Rosa 2012: clinicopathologic study of 62 acinar cell carcinomas of the pancreas",
    tldr: "The largest single pathology series of acinar cell carcinoma, from a European network, confirmed which stains identify the tumour, described its variants and showed that stage at diagnosis is what determines survival.",
    summary: "Multicentre European series of 62 acinar cell carcinomas of the pancreas with detailed morphology, immunohistochemistry and follow-up. The study compared the sensitivity of trypsin, chymotrypsin, lipase and BCL10 as markers of acinar differentiation, characterised mixed acinar-neuroendocrine and acinar-ductal tumours, and examined the acinar cell cystadenocarcinoma variant.\n\nSurvival was better than in ductal adenocarcinoma but depended strongly on stage: patients with localised, resected tumours could survive for years while metastatic disease behaved aggressively. Trypsin and BCL10 were the most useful diagnostic markers.",
    journal: "American Journal of Surgical Pathology", year: 2012, doi: "10.1097/PAS.0b013e318263209d", pmid: "23026929",
    authors: "La Rosa S, Adsay V, Albarello L, et al.", paperType: "observational", participants: 62,
    findings: ["Trypsin and BCL10 immunostains were the most sensitive markers of acinar differentiation.", "Stage (tumour size, nodal and distant spread) was the dominant prognostic factor; resected localised tumours had a favourable course."],
    whatItMeans: "The paper underpins the WHO diagnostic criteria for acinar cell carcinoma and its variants and supports aggressive surgery for localised disease.",
    caveats: ["Retrospective pathology series with heterogeneous treatment.", "Molecular characterisation was not part of this study; the genomic profile came later."],
    links: [{ label: "Am J Surg Pathol 2012", url: "https://doi.org/10.1097/PAS.0b013e318263209d" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/23026929/" }],
    cancers: ["pancreatic-acinar-cell-carcinoma", "pancreatic"] }),

  p({ id: "paper-chmielecki-acinar-cell-carcinoma-raf-fusions-dna-repair-cancer-discov-2014", name: "Chmielecki 2014: comprehensive genomic profiling of pancreatic acinar cell carcinomas identifies recurrent RAF fusions and frequent inactivation of DNA repair genes",
    tldr: "Sequencing of acinar cell carcinomas found that they do not carry the KRAS mutation that drives ordinary pancreatic cancer; instead about a quarter have fusions activating BRAF or RAF1, which MEK-blocking drugs can shut down in the laboratory, and almost half have broken DNA repair genes that may make them sensitive to platinum and PARP inhibitors.",
    summary: "Targeted sequencing of 44 pancreatic acinar cell carcinomas. Recurrent gene fusions involving BRAF or RAF1 (including SND1-BRAF and HERPUD1-BRAF) were found in about 23 percent of tumours, with mutual exclusivity from other MAPK alterations, and cell lines expressing the fusions were sensitive to MEK inhibition.\n\nAbout 45 percent of tumours carried inactivating alterations in DNA repair genes such as BRCA2, PALB2, ATM and MSH2, and KRAS mutations were rare. The genomic landscape was distinct from ductal adenocarcinoma, with high mutational heterogeneity and few recurrent point mutations.",
    journal: "Cancer Discovery", year: 2014, doi: "10.1158/2159-8290.CD-14-0617", pmid: "25266736",
    authors: "Chmielecki J, Hutchinson KE, Frampton GM, et al.", paperType: "translational", participants: 44,
    findings: ["RAF fusions (BRAF or RAF1) in about 23 percent of acinar cell carcinomas, sensitive to MEK inhibitors in models.", "DNA repair gene inactivation in about 45 percent; KRAS mutations rare."],
    whatItMeans: "Acinar cell carcinoma should be sequenced: RAF fusions and DNA repair defects offer targeted and platinum or PARP inhibitor options that ductal adenocarcinoma rarely has.",
    caveats: ["Therapeutic sensitivity was shown in cell models and case reports, not trials.", "Fusion detection depends on assay design; RNA-based testing finds more."],
    links: [{ label: "Cancer Discov 2014", url: "https://doi.org/10.1158/2159-8290.CD-14-0617" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/25266736/" }],
    cancers: ["pancreatic-acinar-cell-carcinoma", "pancreatic"], journals: ["cancer-discovery"] }),

  p({ id: "paper-wisnoski-acinar-cell-carcinoma-672-patients-seer-surgery-2008", name: "Wisnoski 2008: 672 patients with acinar cell carcinoma of the pancreas, a population-based comparison to pancreatic adenocarcinoma",
    tldr: "Using the US cancer registry, this study showed that people with acinar cell carcinoma live far longer than those with ordinary pancreatic cancer at every stage, and that surgery gives a large fraction of them a chance of long-term survival.",
    summary: "Analysis of the SEER registry from 1988 to 2003 comparing 672 patients with pancreatic acinar cell carcinoma to more than 40,000 with pancreatic ductal adenocarcinoma. Acinar cell carcinoma patients were more often men and presented with larger tumours but were more likely to undergo resection.\n\nSurvival was markedly better for acinar cell carcinoma: median survival of several years against a few months for adenocarcinoma, five-year survival many times higher, and resected patients doing best. The survival advantage held after adjustment for stage and resection.",
    journal: "Surgery", year: 2008, doi: "10.1016/j.surg.2008.03.006", pmid: "18656619",
    authors: "Wisnoski NC, Townsend CM, Nealon WH, Freeman JL, Riall TS.", paperType: "observational", participants: 672,
    findings: ["Acinar cell carcinoma survival was several times longer than ductal adenocarcinoma at every stage in SEER data.", "Resection was associated with the best outcomes and was performed more often than in adenocarcinoma."],
    whatItMeans: "Acinar cell carcinoma justifies an aggressive surgical approach, including for larger tumours and selected metastatic disease, because the natural history is far better than ductal adenocarcinoma.",
    caveats: ["Registry data with no information on chemotherapy or molecular features.", "Histological misclassification is possible in registry coding."],
    links: [{ label: "Surgery 2008", url: "https://doi.org/10.1016/j.surg.2008.03.006" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/18656619/" }],
    cancers: ["pancreatic-acinar-cell-carcinoma", "pancreatic"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // IPMN and cystic precursors
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-fukuoka-2017-consensus-guidelines-ipmn-pancreatology-2017", name: "Revised international consensus Fukuoka guidelines for the management of IPMN of the pancreas (2017)",
    tldr: "The international rulebook for pancreatic cysts: which features mean a cyst should be removed straight away (high-risk stigmata), which mean it needs a closer look with endoscopic ultrasound (worrisome features), and how often smaller cysts should be scanned.",
    summary: "Revision of the 2012 Fukuoka consensus from the International Association of Pancreatology for intraductal papillary mucinous neoplasms and mucinous cystic neoplasms. High-risk stigmata that indicate resection are obstructive jaundice from a cyst in the head, an enhancing mural nodule of 5 mm or more and a main pancreatic duct of 10 mm or more. Worrisome features that indicate endoscopic ultrasound include cyst size of 3 cm or more, enhancing mural nodule under 5 mm, thickened enhancing cyst walls, main duct 5 to 9 mm, abrupt change in duct calibre with distal atrophy, lymphadenopathy, raised CA19-9 and cyst growth of 5 mm or more in two years.\n\nSurveillance intervals for cysts without these features are set by cyst size, and the revision addresses surgery for main-duct IPMN, extent of resection and follow-up after resection.",
    journal: "Pancreatology", year: 2017, doi: "10.1016/j.pan.2017.07.007", pmid: "28735806",
    authors: "Tanaka M, Fernández-Del Castillo C, Kamisawa T, et al.", paperType: "guideline", changedPractice: true,
    findings: ["High-risk stigmata for resection: obstructive jaundice, enhancing mural nodule 5 mm or more, main duct 10 mm or more.", "Worrisome features for endoscopic ultrasound: cyst 3 cm or more, small nodule, thickened wall, main duct 5 to 9 mm, raised CA19-9, growth 5 mm in two years, among others.", "Size-based surveillance intervals for cysts without worrisome features."],
    whatItMeans: "Most radiology reports and surgical decisions on pancreatic cysts still follow the Fukuoka criteria or their 2024 Kyoto revision.",
    caveats: ["Expert consensus resting on retrospective series; no randomised trial of surveillance strategies exists.", "The criteria are sensitive but not specific, so many resected cysts turn out to be low grade."],
    links: [{ label: "Pancreatology 2017", url: "https://doi.org/10.1016/j.pan.2017.07.007" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/28735806/" }],
    cancers: ["ipmn-cystic-precursors", "pancreatic"] }),

  p({ id: "paper-kyoto-2024-evidence-based-guidelines-ipmn-pancreatology-2024", name: "International evidence-based Kyoto guidelines for the management of intraductal papillary mucinous neoplasm of the pancreas (2024)",
    tldr: "The 2024 update to the international pancreatic cyst guidelines, which adds faster cyst growth, new diabetes and pancreatitis to the warning signs, allows surveillance to stop in some older patients with small stable cysts, and grades each recommendation by the strength of the evidence.",
    summary: "Evidence-graded revision of the Fukuoka guidelines by the International Association of Pancreatology, meeting in Kyoto. High-risk stigmata are retained, with an enhancing mural nodule of 5 mm or more, main duct of 10 mm or more, obstructive jaundice and positive cytology as indications for surgery in fit patients. Worrisome features now include cyst growth of 2.5 mm or more per year, new-onset or worsening diabetes and acute pancreatitis, alongside the earlier criteria.\n\nThe guideline addresses when surveillance can be stopped (after five years of stability in cysts under 2 cm in patients who would not be surgical candidates), the role of cyst fluid molecular analysis, management after resection, and the need for randomised trials of surveillance strategies.",
    journal: "Pancreatology", year: 2024, doi: "10.1016/j.pan.2023.12.009", pmid: "38182527",
    authors: "Ohtsuka T, Fernandez-Del Castillo C, Furukawa T, et al.", paperType: "guideline", changedPractice: true,
    findings: ["New worrisome features: cyst growth 2.5 mm or more per year, new-onset or worsening diabetes, acute pancreatitis.", "Surveillance may stop after five years of stability in small cysts in patients unfit for surgery.", "Recommendations graded by evidence quality for the first time."],
    whatItMeans: "The current international standard for deciding which pancreatic cysts to operate on, which to watch and for how long.",
    caveats: ["Most recommendations still rest on low-quality retrospective evidence.", "Differences from the European and American guidelines persist, particularly on stopping surveillance."],
    links: [{ label: "Pancreatology 2024", url: "https://doi.org/10.1016/j.pan.2023.12.009" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/38182527/" }],
    cancers: ["ipmn-cystic-precursors", "pancreatic"] }),

  p({ id: "paper-european-evidence-based-guidelines-pancreatic-cystic-neoplasms-gut-2018", name: "European evidence-based guidelines on pancreatic cystic neoplasms (2018)",
    tldr: "Europe's guideline for pancreatic cysts, covering every cyst type and not only IPMN. It splits reasons to operate into absolute and relative indications and recommends lifelong surveillance for IPMN in anyone fit for surgery.",
    summary: "Guideline from the European Study Group on Cystic Tumours of the Pancreas, produced with a formal evidence review and covering IPMN, mucinous cystic neoplasm, serous cystic neoplasm, solid pseudopapillary neoplasm and cystic neuroendocrine tumours. Absolute indications for surgery in IPMN are positive cytology for malignancy or high-grade dysplasia, a solid mass, jaundice, an enhancing mural nodule of 5 mm or more and a main duct of 10 mm or more. Relative indications include growth of 5 mm or more per year, raised CA19-9, a main duct of 5 to 9.9 mm, cyst diameter of 40 mm or more, new-onset diabetes, acute pancreatitis and a mural nodule under 5 mm.\n\nIPMN surveillance is lifelong while the patient remains fit for surgery; serous cystadenomas need no follow-up once diagnosed; mucinous cystic neoplasms of 40 mm or more or with symptoms or risk features are resected.",
    journal: "Gut", year: 2018, doi: "10.1136/gutjnl-2018-316027", pmid: "29574408",
    authors: "European Study Group on Cystic Tumours of the Pancreas.", paperType: "guideline", changedPractice: true,
    findings: ["Absolute surgical indications: positive cytology, solid mass, jaundice, enhancing nodule 5 mm or more, main duct 10 mm or more.", "Relative indications: growth 5 mm per year, raised CA19-9, main duct 5 to 9.9 mm, cyst 40 mm or more, new diabetes, pancreatitis, nodule under 5 mm.", "Lifelong IPMN surveillance while fit for surgery; no follow-up for serous cystadenoma."],
    whatItMeans: "European centres manage pancreatic cysts by this guideline; its lifelong surveillance stance is the main point of difference from the American and Kyoto guidelines.",
    caveats: ["Evidence for most recommendations is low quality and consensus-based.", "Lifelong surveillance has a cost and burden that has not been tested against stopping rules in trials."],
    links: [{ label: "Gut 2018", url: "https://doi.org/10.1136/gutjnl-2018-316027" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/29574408/" }],
    cancers: ["ipmn-cystic-precursors", "pancreatic"] }),

  // ---------------------------------------------------------------------------------------------------------------------
  // Pancreatoblastoma
  // ---------------------------------------------------------------------------------------------------------------------
  p({ id: "paper-klimstra-pancreatoblastoma-clinicopathologic-study-ajsp-1995", name: "Klimstra 1995: pancreatoblastoma, a clinicopathologic study and review of the literature",
    tldr: "The defining description of pancreatoblastoma, the rare pancreatic cancer of young children: its distinctive mix of enzyme-producing cells and whorled squamoid nests under the microscope, its generally good outlook after complete removal in children, and its more aggressive behaviour in adults.",
    summary: "Clinicopathological study of pancreatoblastomas from the Armed Forces Institute of Pathology with a review of the published literature. The tumours were large and mostly arose in the first decade of life, though adult cases occurred; some were associated with Beckwith-Wiedemann syndrome and many produced alpha-fetoprotein.\n\nHistologically the tumours combined acinar differentiation (confirmed by trypsin, chymotrypsin and lipase immunostains) with squamoid nests, and variable neuroendocrine and ductal elements, distinguishing them from acinar cell carcinoma. Complete resection was associated with cure in most children, while adults and patients with metastases fared poorly.",
    journal: "American Journal of Surgical Pathology", year: 1995, doi: "10.1097/00000478-199512000-00005", pmid: "7503360",
    authors: "Klimstra DS, Wenig BM, Adair CF, Heffess CS.", paperType: "observational",
    findings: ["Acinar differentiation with squamoid nests defines the tumour and separates it from acinar cell carcinoma.", "Most cases in young children, some with Beckwith-Wiedemann syndrome; alpha-fetoprotein often raised.", "Complete resection cures most children; adults and metastatic cases do poorly."],
    whatItMeans: "Pathologists diagnose pancreatoblastoma by the criteria set out here, and the paper established that the paediatric and adult forms behave differently.",
    caveats: ["Small consultation series with limited treatment data.", "Molecular features (Wnt pathway and 11p alterations) were described later."],
    links: [{ label: "Am J Surg Pathol 1995", url: "https://doi.org/10.1097/00000478-199512000-00005" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/7503360/" }],
    cancers: ["pancreatoblastoma", "pancreatic"] }),

  p({ id: "paper-bien-pancreatoblastoma-expert-european-cooperative-ejc-2011", name: "Bien 2011: pancreatoblastoma, a report from the European cooperative study group for paediatric rare tumours (EXPeRT)",
    tldr: "Pooling children treated across Europe over a decade, this study showed that complete surgical removal is what cures pancreatoblastoma, that cisplatin and doxorubicin chemotherapy can shrink tumours that cannot be removed at first, and that about four in five children survive.",
    summary: "Retrospective multinational series from the EXPeRT group of children with pancreatoblastoma treated in France, Germany, Italy, Poland and the United Kingdom between 2000 and 2009. Most tumours arose in young children and were large at diagnosis; alpha-fetoprotein was raised in the majority and served as a tumour marker.\n\nComplete resection, either upfront or after neoadjuvant chemotherapy, was the strongest determinant of outcome. Cisplatin and doxorubicin (PLADO) was the most active regimen, achieving responses that allowed delayed resection. Event-free survival was about 60 percent and overall survival close to 80 percent at five years, with relapses salvageable in some children.",
    journal: "European Journal of Cancer", year: 2011, doi: "10.1016/j.ejca.2011.05.022", pmid: "21696948",
    authors: "Bien E, Godzinski J, Dall'igna P, et al.", paperType: "observational", changedPractice: true,
    findings: ["Complete resection was the strongest determinant of cure; neoadjuvant chemotherapy made delayed resection possible.", "Cisplatin plus doxorubicin was the most active regimen.", "Five-year event-free survival about 60 percent and overall survival close to 80 percent."],
    whatItMeans: "The EXPeRT recommendations, surgery when feasible and PLADO chemotherapy for unresectable or metastatic disease, remain the treatment framework for childhood pancreatoblastoma.",
    caveats: ["Retrospective series of a few dozen children with heterogeneous treatment.", "Adult pancreatoblastoma was not included and behaves worse."],
    links: [{ label: "Eur J Cancer 2011", url: "https://doi.org/10.1016/j.ejca.2011.05.022" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/21696948/" }],
    cancers: ["pancreatoblastoma", "pancreatic"], drugs: ["cisplatin"], journals: ["european-journal-of-cancer"] }),

  p({ id: "paper-dhebri-pancreatoblastoma-diagnosis-treatment-outcome-pancreatology-2004", name: "Dhebri 2004: diagnosis, treatment and outcome of pancreatoblastoma",
    tldr: "A review pooling every published case of pancreatoblastoma to that date, showing that it is mainly a disease of young children, that alpha-fetoprotein is a useful marker, that surgery is the treatment that cures, and that adults do worse than children.",
    summary: "Systematic review of pancreatoblastoma cases reported in the literature, summarising age and sex distribution, presenting features, imaging, the role of alpha-fetoprotein, histology, treatment and outcome. Most cases were in children under ten, with a smaller adult group; tumours were usually large, and metastases at diagnosis were common.\n\nComplete resection was associated with long-term survival in children, chemotherapy produced responses in unresectable disease, and radiotherapy had a limited role. Adult patients had a markedly worse prognosis, with most dying of disease.",
    journal: "Pancreatology", year: 2004, doi: "10.1159/000079823", pmid: "15256806",
    authors: "Dhebri AR, Connor S, Campbell F, Ghaneh P, Sutton R, Neoptolemos JP.", paperType: "review",
    findings: ["Pancreatoblastoma is predominantly a childhood tumour; adults form a minority with a poorer outcome.", "Alpha-fetoprotein is raised in most children and tracks response.", "Complete resection is the treatment associated with cure; chemotherapy helps unresectable disease."],
    whatItMeans: "The review is the usual citation for the natural history of pancreatoblastoma and for the recommendation of resection with chemotherapy for advanced disease.",
    caveats: ["Literature-based review with publication bias and heterogeneous reporting.", "Predates the EXPeRT series and modern chemotherapy protocols."],
    links: [{ label: "Pancreatology 2004", url: "https://doi.org/10.1159/000079823" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/15256806/" }],
    cancers: ["pancreatoblastoma", "pancreatic"] }),
];
