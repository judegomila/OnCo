import type { TermInput } from "@/lib/schema";

/** Tumour-immunology teaching. Model, cohort and assay limits stay with each claim. */
export const termsEducationTumorImmunology2026: TermInput[] = [
  {
    "id": "agretopicity",
    "kind": "term",
    "name": "Agretopicity",
    "aka": [
      "differential agretopic index",
      "differential agretopicity index",
      "DAI",
      "differential binding affinity"
    ],
    "tldr": "Agretopicity concerns how a protein fragment interacts with an immune display molecule. Comparing altered and normal fragments gives a separate predicted score; actual display and immune recognition need tests.",
    "summary": "Agretopicity concerns a peptide's ability to interact with a major histocompatibility complex (MHC) display molecule, called human leukocyte antigen (HLA) in people. It is distinct from the differential agretopic index (DAI), which compares predicted binding of the mutant peptide with its matching wild-type counterpart against the same molecule. Duan and colleagues named the numerical difference in NetMHC scores between mutated and unmutated sequences the differential agretopic index. They subtracted the wild-type NetMHC score from the mutant score. Ghorani and colleagues instead subtracted predicted mutant affinity from predicted wild-type affinity. Some groups use a ratio, so retain the units, formula and sign convention before comparing values across pipelines.\n\nTwo separate ideas sit behind the measure. First, a mutation at a position the HLA groove grips can create a new anchor residue and change binding, potentially changing presentation; Duan and colleagues found that neoepitopes mutated to create new anchor residues, together with greater predicted rigidity of the peptide and HLA complex, identified protective neoepitopes with relatively high accuracy in mouse tumours (the CMS5 and Meth A mouse tumours). Second, reasoning rather than a finding of the cited papers: a peptide that normal tissue never displayed well may not have had its reactive T cells removed by self-tolerance, so a high value is sometimes read as a proxy for an intact T-cell repertoire against that target.\n\nA high value does not require strong absolute binding. In that mouse work the protective neoepitopes produced CD8-dependent immunity although their affinity for the mouse class I molecule H-2Kd was orders of magnitude weaker than the conventional 500 nanomolar threshold, which is part of the argument for ranking on the mutant-versus-wild-type comparison rather than on absolute predicted affinity alone.\n\nGhorani’s retrospective human analysis included 66 lung adenocarcinomas and 72 melanomas from The Cancer Genome Atlas, plus three immunotherapy-treated cohorts containing 131 melanoma patients in total and 31 with non-small-cell lung cancer. Mean DAI correlated with overall survival in three of five cohorts, with the reported effect for clonal rather than subclonal peptides. The authors reported evidence of superiority over nonsynonymous mutational and neoantigen burden in these analyses, not a universally superior clinical predictor. Mean DAI also correlated with immune-infiltration measures in melanoma (P = 0.027) and lung adenocarcinoma (P = 0.024), whereas mutational and neoantigen burden did not. The association with survival was not uniform: P = 0.068 in the TCGA melanoma cohort and P = 0.003 in one treated melanoma cohort. These population associations and the animal protection findings are different evidence tiers. Neither prospectively demonstrates that selecting a vaccine by DAI improves clinical outcomes.\n\nThe 2020 Tumor Neoantigen Selection Alliance study tested which peptide features predict immunogenicity: 608 predicted epitopes were assessed for T-cell binding in patient-matched samples, and a model integrating peptide features linked to presentation and recognition filtered out 98% of non-immunogenic peptides at a precision above 0.70, then held in an independent cohort of 310 epitopes (Wells and colleagues). Its abstract does not say which features entered the model, so this record does not claim that the study supported or rejected agretopicity.",
    "asOf": "2026-11-11",
    "links": [{"label":"Duan et al., genomic and bioinformatic profiling of mutational neoepitopes reveals new rules to predict anticancer immunogenicity (J Exp Med 2014)","url":"https://pubmed.ncbi.nlm.nih.gov/25245761/"},{"label":"Ghorani et al., differential binding affinity of mutated peptides for MHC class I is a predictor of survival in advanced lung cancer and melanoma (Ann Oncol 2018)","url":"https://pubmed.ncbi.nlm.nih.gov/29361136/"},{"label":"Wells et al., key parameters of tumor epitope immunogenicity revealed through a consortium approach improve neoantigen prediction (Cell 2020)","url":"https://pubmed.ncbi.nlm.nih.gov/33038342/"},{"label":"Wieczorek et al.: peptide binding and recognition of peptide-MHC complexes (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28367149/"}],
    "related": [
      "neoantigen",
      "neoantigen-mrna-vaccine",
      "tmb",
      "interferon-gamma-signature",
      "cancer-immunity-cycle"
    ],
    "technologies": [
      "neoantigen-mrna-vaccine"
    ],
    "terms": [
      "neoantigen",
      "tmb"
    ],
    "notes": ["Peptide binding to HLA and T-cell receptor recognition of the peptide-HLA complex are different interactions. The peptide's HLA-binding determinants can be called an agretope; its recognition by a receptor depends on the combined surface. This functional distinction does not prescribe two flat, non-overlapping faces for every complex. A binding prediction or mutant-versus-normal score is not a measurement of natural display, T-cell response, killing or clinical benefit.","The differential agretopic index is not absolute binding strength: its reference is the peptide's own wild-type version. Sequence self-similarity asks a different question about resemblance to normal human sequences more broadly. The Duan and Ghorani studies concern class I and do not validate a class-II ranking rule. HLA is the human major histocompatibility complex, called MHC in the mouse experiments. Predicted binding differences also do not prove absence of self-tolerance.","The score is computed from sequence and binding predictions for the alleles supplied by HLA typing. Retain the peptide windows, allele, predictor and version, both scores, units and subtraction or ratio rule. Sign conventions differ, so a larger number in one pipeline need not match another's scale. Computation adds no tissue assay, but depends on the sequence and typing inputs. On a design board it sits beside expression, clonality and measured presentation. Absolute affinity alone does not reveal how much the mutant differs from its wild-type counterpart. Neither comparison proves escape from tolerance, natural presentation or a useful T-cell response. Different predictors can give different estimates for the same peptide pair."],
    "category": "Immunology"
  },
  {
    "id": "adaptive-immune-resistance",
    "kind": "term",
    "name": "Adaptive immune resistance",
    "aka": [
      "adaptive immune resistance",
      "interferon-induced PD-L1",
      "IFN-gamma-induced PD-L1",
      "induced PD-L1 expression"
    ],
    "tldr": "An immune attack can induce its own restraint: signals from responding T cells raise inhibitory proteins on nearby cells. This induced defence differs from resistance acquired after a treatment response.",
    "summary": "The sequence proposed by Taube and colleagues and mapped in more detail since is a loop. A T cell recognises a tumour peptide on HLA and releases interferon gamma; the interferon acts through the Janus kinases JAK1 and JAK2 in nearby tumour and immune cells; PD-L1 rises; PD-L1 binds PD-1 on the T cell and damps it. In melanoma cell lines, Garcia-Diaz and colleagues found that the interferon gamma, JAK1 and JAK2, STAT1, STAT2 and STAT3, IRF1 axis primarily regulates PD-L1, with IRF1 binding the PD-L1 promoter, and biopsies from patients with melanoma showed enrichment of that interferon signature and of STAT and IRF1 target genes in tumours that responded to anti-PD-1 treatment.\n\nPD-L1 is not the only brake that follows the attack. Spranger and colleagues found in human melanoma that the T-cell-inflamed tumours were the ones with high indoleamine 2,3-dioxygenase (IDO), PD-L1 and regulatory T cells, and in mice that all three depended on CD8 T cells being present: IDO and PD-L1 through interferon gamma, and regulatory T cells through CCR4-binding chemokines with some induced proliferation. Their reading was that these pathways are driven by the immune response rather than orchestrated by the cancer cells.\n\nEvidence from tissue. In human melanocytic lesions, 98% of PD-L1-positive (B7-H1-positive) tumours had tumour-infiltrating lymphocytes compared with 28% of PD-L1-negative tumours; positive melanocytes sat almost always immediately next to lymphocytes, and interferon gamma was detected at the interface but not in PD-L1-negative tumours (Taube and colleagues). The same colocalisation appeared in inflamed benign naevi, which fits PD-L1 as a response to tissue inflammation. In triple-negative breast cancer, Gruosso and colleagues described an immunoreactive group whose tumours had granzyme B-positive CD8 T cells inside cancer-cell regions, a type 1 interferon signature and elevated IDO and PD-L1, the pattern adaptive resistance predicts; that is an association in tissue and not a direct test of the loop. The alternative, called innate or constitutive resistance, is PD-L1 driven by the cancer cell's own signalling regardless of T cells.\n\nA functionally important loss of JAK1 or JAK2 can impair the tumour cell response to interferon gamma. In four people with metastatic melanoma that relapsed on anti-PD-1 treatment, two relapse samples carried loss-of-function JAK1 or JAK2 mutations with deletion of the remaining normal allele, and truncating JAK1 or JAK2 mutations left the cells unresponsive to interferon gamma (Zaretsky and colleagues). The JAK2-deficient relapse cells lost interferon-gamma-induced PD-L1 and class-I increases but retained responses to interferon alfa and beta. In engineered melanoma cells, JAK1 or JAK2 loss did not abolish recognition by the tested NY-ESO-1-specific T cells. Loss of inducibility is therefore different from absence of all baseline recognition. This selected series does not estimate a frequency for all cancers.",
    "asOf": "2026-11-11",
    "links": [
      {
        "label": "Taube et al., colocalization of inflammatory response with B7-H1 expression in human melanocytic lesions supports an adaptive resistance mechanism of immune escape (Sci Transl Med 2012)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22461641/"
      },
      {
        "label": "Garcia-Diaz et al., interferon receptor signaling pathways regulating PD-L1 and PD-L2 expression (Cell Rep 2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28494868/"
      },
      {
        "label": "Spranger et al., up-regulation of PD-L1, IDO and Tregs in the melanoma tumor microenvironment is driven by CD8+ T cells (Sci Transl Med 2013)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23986400/"
      },
      {
        "label": "Gruosso et al., spatially distinct tumor immune microenvironments stratify triple-negative breast cancers (J Clin Invest 2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30753167/"
      },
      {
        "label": "Zaretsky et al., mutations associated with acquired resistance to PD-1 blockade in melanoma (N Engl J Med 2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27433843/"
      }
    ],
    "related": [
      "pd1-checkpoint",
      "pdl1",
      "pd1",
      "ido1",
      "jak1",
      "jak2",
      "stat1",
      "irf1",
      "interferon-gamma-signature",
      "cold-vs-hot",
      "resistance",
      "cancer-immunity-cycle",
      "paper-tumeh-pd1-adaptive-immune-resistance-nature-2014",
      "immune-exclusion"
    ],
    "targets": [
      "pdl1",
      "pd1",
      "ido1",
      "jak1",
      "jak2",
      "stat1",
      "irf1"
    ],
    "pathways": [
      "pd1-checkpoint",
      "cancer-immunity-cycle"
    ],
    "terms": [
      "interferon-gamma-signature",
      "cold-vs-hot",
      "resistance"
    ],
    "keyPapers": [
      "paper-tumeh-pd1-adaptive-immune-resistance-nature-2014"
    ],
    "notes": [
      "Reading the label. PD-L1-positive does not mean the tumour is suppressing the immune system on its own, because in adaptive resistance the signal is a reaction to T cells. PD-L1-negative does not mean no immune attack: staining is patchy, assays differ and other brakes exist. Adaptive resistance also differs from acquired resistance, which means a tumour that responded to treatment and then stopped responding; here 'adaptive' names an induced defence, and the two can overlap without being the same thing.",
      "A PD-L1 stain measures protein on defined tumour and immune cells, not why it is present. Colocalization with lymphocytes and interferon-related expression can support induced expression, while a uniform lymphocyte-poor pattern raises other hypotheses; neither pattern proves a cause. Adding interferon gamma and measuring PD-L1 tests inducibility in a laboratory model. Appropriate pathway perturbations and controls investigate causation, and neither that assay nor a tissue score measures the entire in-vivo feedback loop or treatment benefit.",
      "In a fictional biopsy, PD-L1 is found at a lymphocyte-rich border but not at the centre. That distribution is consistent with induced expression; it does not prove the proposed loop. A negative region does not establish absence of immune attack elsewhere, and other inhibitory pathways may operate. A positive PD-L1 result alone also cannot distinguish induced from constitutive expression.",
      "What the loop means for treatment is a hypothesis to test. PD-1 and PD-L1 drugs interrupt the last step, the binding of PD-L1 to PD-1. Spranger and colleagues argued that checkpoint approaches might be preferentially beneficial for patients with a pre-existing T-cell-inflamed microenvironment, which is a reading of their data and not a trial result."
    ],
    "category": "Immunology"
  },
  {
    "id": "perioperative-immune-window",
    "kind": "term",
    "name": "Perioperative immune window",
    "aka": [
      "perioperative immunosuppression",
      "surgical stress response",
      "postoperative immunosuppression",
      "anaesthesia and cancer recurrence"
    ],
    "tldr": "Surgery and recovery can temporarily change immune activity. Studies of blood or laboratory markers differ from trials measuring recurrence, and a marker change alone does not show better cancer outcomes.",
    "summary": "Several things happen at once around an operation. Reviews describe a stress response in which injury and stress release catecholamines, prostaglandins and cortisol, and in which a short pro-inflammatory phase is followed by a prolonged anti-inflammatory phase; natural killer (NK) cells are severely affected in that period, and sympathetic stress factors, mediators including interleukin 6 and transforming growth factor beta, and myeloid-derived suppressor cells have been proposed as mediators (Horowitz and colleagues; Angka and colleagues). Wound healing adds repair signals, and anaesthesia and pain control add their own possible effects: the breast cancer anaesthesia trials were built on the premise that the surgical stress response, volatile anaesthetic and opioids impair host defence and that regional anaesthesia with propofol ameliorates all three. Most of this mechanistic evidence comes from blood measurements in patients and from mouse models, so whether the changes alter recurrence in people is a separate question that randomised trials answer best.\n\nA real, short-lived shift in NK-cell function and suppressive signals is described by human blood studies and mouse work, which do not measure recurrence. Anaesthetic choice in breast cancer surgery was tested in two randomised trials. Sessler and colleagues analysed 2,108 women (13 hospitals, 8 countries) given regional anaesthesia with paravertebral blocks and propofol or general anaesthesia with sevoflurane and opioid analgesia: recurrence occurred in 102 of 1,043 (10%) and 111 of 1,065 (10%), hazard ratio 0.97 (95% CI 0.74 to 1.28), median follow-up 36 months; the trial stopped after a preplanned futility boundary was crossed, and persistent incisional pain did not differ. Enlund and colleagues (the Cancer and Anaesthesia study, designed to detect an advantage of at least five percentage points for propofol) recruited 1,764 women, of whom 1,670 remained for analysis, and found five-year survival of 773 of 841 (91.9%) with propofol and 764 of 829 (92.2%) with sevoflurane, hazard ratio 1.03 (95% CI 0.73 to 1.44). Neither trial detected an advantage in its specified clinical endpoint. Their confidence intervals do not prove that all anaesthetic approaches are equivalent; keep the agents, breast-cancer population, endpoint and follow-up attached.\n\nBlocking the stress signals is a different question. In a randomised, placebo-controlled biomarker trial of 38 women with early breast cancer, 11 days of propranolol (a beta-blocker) with etodolac (a COX-2 inhibitor) from 5 days before surgery was well tolerated and changed tumour gene expression (less epithelial-to-mesenchymal transition, fewer tumour-infiltrating monocytes, more tumour-infiltrating B cells) and blood markers (smaller presurgical rises in interleukin 6 and C-reactive protein) (Shaashua and colleagues). Recurrence was not an endpoint, so this is a biomarker result and not fewer recurrences.\n\nTiming of immunotherapy is another open question. In two mouse models of spontaneously metastatic breast cancer, immunotherapy given before removal of the primary tumour eradicated distant metastases more effectively than the same treatment given after, with sustained peripheral tumour-specific immune responses underpinning the outcome (Liu and colleagues). That supports testing the idea in people; it is not a human result. The KEYNOTE-522 regimen gives pembrolizumab with chemotherapy before surgery and alone after it to the same patients, so by design it cannot separate the benefit of the two phases (inference from the trial design).",
    "asOf": "2026-11-12",
    "links": [
      {
        "label": "Horowitz et al., exploiting the critical perioperative period to improve long-term cancer outcomes (Nat Rev Clin Oncol 2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25601442/"
      },
      {
        "label": "Angka et al., dysfunctional natural killer cells in the aftermath of cancer surgery (Int J Mol Sci 2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28817109/"
      },
      {
        "label": "Sessler et al., recurrence of breast cancer after regional or general anaesthesia: a randomised controlled trial (Lancet 2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31645288/"
      },
      {
        "label": "Enlund et al., impact of general anaesthesia on breast cancer survival: a 5-year follow up of a pragmatic, randomised, controlled trial, the CAN-study (eClinicalMedicine 2023)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37333664/"
      },
      {
        "label": "Shaashua et al., perioperative COX-2 and beta-adrenergic blockade improves metastatic biomarkers in breast cancer patients in a phase II randomized trial (Clin Cancer Res 2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28490464/"
      },
      {
        "label": "Liu et al., improved efficacy of neoadjuvant compared to adjuvant immunotherapy to eradicate metastatic disease (Cancer Discov 2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27663893/"
      },
      {
        "label": "Schmid et al., pembrolizumab for early triple-negative breast cancer (N Engl J Med 2020)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32101663/"
      }
    ],
    "related": [
      "neoadjuvant-adjuvant",
      "keynote-522",
      "idea-reg-perioperative-propranolol-etodolac",
      "idea-bio2-perioperative-betablocker-nsaid",
      "nk-cell",
      "cancer-immunity-cycle"
    ],
    "trials": [
      "keynote-522"
    ],
    "notes": [
  "The window is a research question about transient changes around an operation, not evidence that avoiding or delaying surgery improves outcomes. Horowitz and colleagues proposed mechanisms by which perioperative stress could facilitate metastasis. The two breast-surgery anaesthesia trials did not detect the tested recurrence or survival advantage. The propranolol-etodolac study measured biomarkers and was not a test of reduced recurrence. Horowitz and colleagues frame the perioperative period in days to weeks; that review timeframe is not a universal measured duration of immune suppression or proof of one period of recurrence risk for every person.",
  "Keep the measurement level beside the claim. A blood measurement is not a tumour measurement: lower NK-cell function in blood after surgery does not show what immune cells do at a site of residual disease. A biomarker change is not fewer recurrences, as the propranolol and etodolac trial measured markers and not outcomes. An observational or laboratory suggestion is not a trial result, and the two breast cancer anaesthesia trials tested it directly.",
  "Worked example (inference). A reader sees that inhaled anaesthetics can suppress immune cells in laboratory studies and asks whether intravenous-only anaesthesia would lower breast cancer recurrence. The laboratory observation raised the idea; the two randomised trials in breast cancer surgery, each with more than 1,600 women analysed, found no difference in recurrence or survival between the anaesthetic strategies tested. Sessler and colleagues concluded that clinicians can use regional or general anaesthesia with respect to recurrence and persistent incisional pain.",
  "The reviewed perioperative mechanisms include repair-related growth signals, angiogenic changes and TGF-beta-associated regulation. Horowitz’s 2015 review discusses increased growth factors and altered proangiogenic and antiangiogenic signals after tissue injury; these are proposed routes to study, not a measured personal recurrence effect. Angka’s 2017 review describes postoperative myeloid suppressor cells, their recruitment of regulatory T cells and patient-blood-to-mouse experiments involving angiogenesis. Those model and blood observations do not directly measure immune control at every residual-disease site."
],
    "category": "Immunology"
  },
  {
    "id": "cd4-t-cell-subsets",
    "kind": "term",
    "name": "CD4 T-cell subsets",
    "aka": [
      "CD4 subsets",
      "T helper subsets",
      "Th1",
      "Th2",
      "Th17",
      "Tfh",
      "follicular helper T cells"
    ],
    "tldr": "CD4 T cells can develop different response programmes. Signals, gene activity and measured function help describe a programme; a single marker does not establish what the cell does.",
    "summary": "CD4 T-cell subsets are differentiation programmes shaped by antigen recognition, cytokines and gene regulation. Conventional naive CD4 cells recognize peptide-HLA class II during priming, often on dendritic cells. Th1, Th2, Th17, follicular helper and regulatory programmes have characteristic signals, transcription factors and outputs, but these are not permanent job titles or mutually exclusive functional tests. The original Th1/Th2 distinction came from mouse clones in 1986; human tissue can contain mixed programmes.\n\nCD4 help can improve the magnitude and quality of a CD8 response. Bennett’s experiments showed that CD40 signalling on antigen-presenting cells could replace CD4 help in a defined cross-priming system. Cella found that CD40 ligation increased dendritic-cell IL-12, ICAM-1, CD80 and CD86 and their T-cell-stimulating capacity. These support one licensing mechanism, not a requirement that every response follows an identical route.\n\nAlspach’s mouse-tumour work required tumour-antigen-specific CD4 and CD8 responses even when the cancer cells lacked class-II molecules; tumour expression of class-II-restricted antigens was needed at the successful rejection site. In Ott’s phase-I melanoma vaccine trial, six people received personal neoantigens. CD4 responses targeted 58 of 97 neoantigens (60%) and CD8 responses 15 (16%). Four of six had no recurrence at 25 months, but the small uncontrolled study did not isolate clinical efficacy.\n\nIn untreated human breast tumours, Gu-Trantien found CXCL13-producing Tfh cells mainly in tertiary-lymphoid-structure germinal centres and an eight-gene signature associated with survival or preoperative-chemotherapy response. That is a prognostic association. DeNardo’s mouse mammary-cancer experiments showed a different possibility: IL-4-producing CD4 cells shaped macrophages that promoted invasion and lung metastasis. Subset identity therefore needs tissue, timing and measured-function context.",
    "asOf": "2026-11-11",
    "links": [
      {
        "label": "Zhu, Yamane and Paul, differentiation of effector CD4 T cell populations (Annu Rev Immunol 2010)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20192806/"
      },
      {
        "label": "Mosmann et al., two types of murine helper T cell clone: definition according to profiles of lymphokine activities and secreted proteins (J Immunol 1986)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/2419430/"
      },
      {
        "label": "Borst et al., CD4+ T cell help in cancer immunology and immunotherapy (Nat Rev Immunol 2018)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30057419/"
      },
      {
        "label": "Alspach et al., MHC-II neoantigens shape tumour immunity and response to immunotherapy (Nature 2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31645760/"
      },
      {
        "label": "Ott et al., an immunogenic personal neoantigen vaccine for patients with melanoma (Nature 2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
      },
      {
        "label": "Gu-Trantien et al., CD4+ follicular helper T cell infiltration predicts breast cancer survival (J Clin Invest 2013)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23778140/"
      },
      {
        "label": "DeNardo et al., CD4+ T cells regulate pulmonary metastasis of mammary carcinomas by enhancing protumor properties of macrophages (Cancer Cell 2009)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19647220/"
      },
      {
        "label": "Ligation of CD40 on dendritic cells triggers production of high levels of interleukin-12 and enhances T cell stimulatory capacity: T-T help via APC activation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8760829/"
      },
      {
        "label": "Help for cytotoxic-T-cell responses is mediated by CD40 signalling.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9624004/"
      },
      {
        "label": "Intratumoral CD4<sup>+</sup> T Cells Mediate Anti-tumor Cytotoxicity in Human Bladder Cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32497499/"
      },
      {
        "label": "Induction of FOXP3 expression in naive human CD4+FOXP3 T cells by T-cell receptor stimulation is transforming growth factor-beta dependent but does not confer a regulatory phenotype.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17644734/"
      },
      {
        "label": "Two FOXP3(+)CD4(+) T cell subpopulations distinctly control the prognosis of colorectal cancers.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27111280/"
      },
      {
        "label": "OpenStax Microbiology, helper T-cell function and differentiation",
        "url": "https://openstax.org/books/microbiology/pages/18-3-t-lymphocytes-and-cellular-immunity"
      }
    ],
    "related": [
      "t-cell",
      "cd4",
      "cd8",
      "cd40",
      "neoantigen",
      "neoantigen-mrna-vaccine",
      "tertiary-lymphoid-structures",
      "tumor-associated-macrophages",
      "regulatory-t-cells",
      "adaptive-immune-resistance",
      "agretopicity",
      "cancer-immunity-cycle"
    ],
    "technologies": [
      "neoantigen-mrna-vaccine"
    ],
    "targets": [
      "cd4",
      "cd8",
      "cd40"
    ],
    "terms": [
      "t-cell",
      "neoantigen",
      "tertiary-lymphoid-structures",
      "tumor-associated-macrophages"
    ],
    "notes": [
      "A transcription-factor stain is a clue to a programme, not a function test. In defined human cultures, Tran and colleagues induced high FOXP3 expression without suppressive function. Human colorectal tumours also contained functionally distinct FOXP3-positive populations (Saito 2016). T-bet expression alone does not measure interferon-gamma release, and a bulk Th1-related RNA signature is not a count of one cell type. Neither Th1 nor Th2 identity alone establishes benefit or harm across tissue, timing and tumour contexts.",
      "How subsets are measured. Flow cytometry can stain transcription factors and, after stimulation, cytokines inside cells; single-cell RNA sequencing assigns programmes by gene expression; tissue staining for CXCL13 or FOXP3 adds location. Each method defines subsets by its own markers, so labels may not match across studies.",
      "Worked example (inference). A vaccine study reports strong interferon gamma release from CD4 T cells after stimulation with a vaccine peptide, but no CD8 response. That is not necessarily a failure: Th1-like CD4 cells can license dendritic cells and help CD8 responses, and mouse data show CD4 cells are needed for rejection. The result shows a CD4 response under assay conditions; recognition of the tumour and any benefit need separate evidence.",
      "CD4 does not mean helper-only. Oh and colleagues studied 30,604 T cells from seven bladder-cancer patients and found clonally expanded cytotoxic CD4 states; controlled assays demonstrated MHC-class-II-dependent killing of autologous tumour cells and inhibition by regulatory T cells. This human evidence has a defined cancer, assay and target context. It does not make every CD4 cell cytotoxic or replace the separate helper and regulatory measurements.",
      "Th1 programmes are associated with IL-12 and interferon-gamma signalling and the transcription factor T-bet. Cells can produce interferon gamma and IL-2 and support macrophage and CD8 responses against intracellular microbes, including the development of memory responses. A T-bet stain alone does not demonstrate any one of those outputs.",
      "Th2 differentiation in the systems reviewed by Zhu involved IL-4 and IL-2, with GATA3 and characteristic IL-4, IL-5 and IL-13 production. These programmes are studied in parasite and allergic responses. This functional context does not make Th2 identity uniformly harmful or beneficial in a tumour.",
      "Th17 programmes include ROR-gamma-t and IL-17A, IL-17F and IL-22 outputs. Zhu’s 2010 review described efficient TGF-beta/IL-6-driven differentiation in specified cultures and a later role for IL-23 in development or maintenance. Human STAT3-deficiency observations linked deficient Th17 development with susceptibility to bacterial and fungal infections. Culture steering conditions and barrier-defence associations are not a universal human differentiation recipe or an automatic tumour-effect prediction.",
      "Follicular helper programmes include BCL6 and the CXCR5 receptor that supports follicular location, and help germinal-centre B cells, including through IL-21. Human breast-tumour Tfh cells can produce CXCL13. Zhu’s 2010 discussion of IL-6/IL-21 culture conditions described uncertainty at that time; neither those conditions nor one marker define every Tfh cell or its function.",
      "Regulatory programmes help restrain responses and maintain tolerance. FOXP3 is a central regulator, and TGF-beta/IL-2 support induced differentiation in specified experimental systems. IL-10, TGF-beta and CTLA-4-associated interactions can contribute to regulation in context. These are not exclusive outputs of one programme, and the human FOXP3 studies above explain why marker presence needs a separate suppression assay."
    ],
    "category": "Immunology"
  }
];
