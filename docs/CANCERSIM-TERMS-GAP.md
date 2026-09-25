# Cancersim terms not yet in OnCo (24 Sept 2026, worked through the same day)

Source: /Users/judegomila/Documents/GitHub/Cancersim/docs/onco/terms.json (CanSim terms map 1.0.0, CC BY 4.0). 504 terms; 126 match an OnCo record by name or alias; 378 do not.

Done column (24 Sept 2026): "term:<id>", "target:<id>" and "data source <id>" are new records; "Alias on kind:id" means the CanSim name was added as an alias of an existing record; "Existing" means OnCo already had it under another name; "Folded into" means the idea is explained inside a broader new term; "Skipped" gives the reason. New records live in src/data/terms-cansim-oncology.ts, src/data/terms-cansim-methods.ts (the "Methods and models" glossary category) and src/data/targets-cansim.ts, with data-source rows in src/data/data-sources.ts. Every new record carries the CC BY 4.0 attribution the terms file requests.

How to use this list: the oncology terms (clinical and biological concepts, cancer types and cohort codes, genes and pathways, drugs, assays and data modalities, public datasets, standards) belong in the OnCo glossary, the open-source map or the target layer and should be added with sources. The machine-learning and methods terms (foundation models, pretraining, metrics, licences, the CanSim project's own results) need an owner decision: a compact "Methods" glossary category with one-line definitions and links out, or a cross-link to the Cancersim site. The JSON beside this file (docs/cancersim-terms-gap.json) holds the same list for a script.

## Field terms not yet in the repo (candidate pages for a complete knowledge site)

| Term | Gloss | Done |
| --- | --- | --- |
| tumour board |  | term:tumour-board |
| grade vs stage |  | term:grade-vs-stage |
| HR+/HER2− |  | Alias on term:hormone-receptor-status |
| adjuvant vs neoadjuvant therapy |  | Alias on term:neoadjuvant-adjuvant |
| tumour purity |  | term:tumour-purity |
| TPM / FPKM / counts |  | term:tpm-fpkm-counts |
| STAR / Salmon |  | term:star-salmon |
| GISTIC |  | term:gistic |
| MutSig |  | term:mutsig |
| variant calling |  | term:variant-calling |
| batch effects |  | term:batch-effects |
| GSEA / ssGSEA |  | term:gsea |
| gene set enrichment |  | term:gsea |
| single-cell RNA-seq (10x Chromium) |  | term:single-cell-rna-seq |
| Visium HD |  | term:spatial-transcriptomics-platforms |
| Xenium |  | term:spatial-transcriptomics-platforms |
| MERFISH |  | term:spatial-transcriptomics-platforms |
| CosMx |  | term:spatial-transcriptomics-platforms |
| CODEX |  | term:spatial-transcriptomics-platforms |
| H&E staining |  | term:h-and-e-staining |
| digital pathology |  | term:digital-pathology-wsi |
| tile / patch encoding |  | term:tile-patch-encoding |
| magnification (20×, 40×) |  | term:magnification |
| OpenSlide |  | Existing opensource:openslide; cited in term:digital-pathology-wsi |
| UNI2 |  | term:pathology-foundation-models |
| Virchow2 |  | term:pathology-foundation-models |
| CTransPath |  | term:pathology-foundation-models |
| methylation beta values (450k / EPIC) |  | term:methylation-arrays |
| foundation model |  | term:foundation-model |
| self-supervised pretraining |  | term:self-supervised-pretraining |
| masked autoencoder |  | term:masked-modelling |
| contrastive learning |  | term:contrastive-learning |
| transformer |  | term:transformer-architecture |
| attention |  | term:transformer-architecture |
| tokenisation |  | term:tokenisation |
| embedding |  | term:embedding |
| LoRA / parameter-efficient fine-tuning |  | term:fine-tuning-vs-frozen |
| linear probe |  | term:linear-probe |
| calibration (reliability diagram, Brier score) |  | term:calibration |
| ROC-AUC / PR-AUC |  | term:roc-auc |
| Harrell's vs Uno's C-index |  | term:concordance-index |
| integrated Brier score |  | Folded into term:calibration |
| cross-validation leakage |  | term:data-leakage |
| train/validation/test discipline |  | term:train-test-discipline |
| external validation |  | term:external-validation |
| OOD detection |  | term:ood-detection |
| conformal prediction |  | term:conformal-prediction |
| uncertainty quantification |  | term:uncertainty-quantification |
| model card |  | term:model-card |
| datasheet for datasets |  | Folded into term:model-card |
| leaderboard |  | term:leaderboard-benchmark |
| benchmark contamination |  | Folded into term:data-leakage and term:leaderboard-benchmark |
| reproducibility |  | term:reproducibility |
| negative results |  | Folded into term:reproducibility |
| open weights |  | term:open-weights |
| Apache-2.0 vs MIT |  | term:open-licences |
| CC-BY-4.0 |  | term:open-licences |
| Hugging Face Hub |  | term:hugging-face-hub |
| Zenodo DOI |  | term:zenodo-doi |
| CITATION.cff |  | term:citation-cff |
| controlled-access data (dbGaP, EGA) |  | term:controlled-access-data |
| data use agreements |  | term:data-use-agreements |
| TCGA open vs controlled tiers |  | term:tcga-tiers |
| consent for research use |  | Folded into term:data-use-agreements (term:informed-consent exists) |
| FDA software as a medical device (SaMD) |  | term:samd |
| research use only |  | term:research-use-only |
| clinical validation vs analytical validation |  | term:analytical-vs-clinical-validation |
| Arc Institute Virtual Cell Challenge |  | Folded into term:virtual-cell-models |
| CZI Virtual Cells |  | Folded into term:virtual-cell-models |
| Broad DepMap portal |  | Alias on collection:depmap |
| GDC Data Portal |  | Alias on collection:tcga-gdc |
| Mahmood Lab (CLAM, UNI, CONCH, TITAN) |  | Covered by term:pathology-foundation-models (opensource:clam, uni, conch and technology:titan exist) |
| Guardant |  | Alias on company:guardant-health |

## ML methods & concepts

| Term | Gloss | Done |
| --- | --- | --- |
| 5-fold stratified cross-validation (seed 42) | Class-balanced k-fold held-out evaluation | term:cross-validation |
| Ablation study | Removing modalities/components to measure their contribution | term:ablation-study |
| Accuracy / macro-F1 | Classification metrics; macro-F1 weights classes equally | term:accuracy-f1 |
| Attention masking over present modalities | Fusion ignores missing modalities via masks | Folded into term:multimodal-fusion |
| Autoregressive modelling | Next-token generative training (Evo 2) | term:autoregressive-modelling |
| Bootstrap resampling / bootstrap-calibrated reliability | Refit on resamples; P10–P90 spread vs in-domain cutoff | term:bootstrap |
| Breslow approximation (ties) | Cox partial-likelihood handling of tied event times | Folded into term:time-dependent-auc |
| C-index (concordance index) | Survival ranking accuracy; 0.5 = random | term:concordance-index |
| Closed-form linear attribution | Exact gene effect = coef @ components / std | Skipped: CanSim result name with no general meaning |
| Cluster purity (zero-shot embedding quality) | Checks embeddings group by tissue/subtype | Folded into term:zero-shot |
| ComBat / quantile / rank harmonisation | Batch/platform correction methods noted as alternatives | Folded into term:batch-effects and term:quantile-normalisation |
| Contrastive alignment (InfoNCE) | Pull a patient's modality tokens together, push others apart | term:contrastive-learning |
| Cross-entropy / MSE losses | Classification and reconstruction objectives | term:cross-entropy-mse |
| Cross-modal masked reconstruction | Predict a held-out modality's token from the others | Folded into term:masked-modelling |
| Cross-platform harmonisation (per-gene z-score) | Aligning RNA-seq and microarray distributions | Folded into term:quantile-normalisation |
| Data leakage prevention (fit on train fold only) | Scalers/PCA fitted without test data | term:data-leakage |
| Domain / distribution shift | Train-test mismatch (platform, tissue, cell line vs tumour) | term:domain-adaptation |
| Fine-tuning vs frozen embeddings | Updating FM weights vs using fixed features | term:fine-tuning-vs-frozen |
| Fusion transformer (patient CLS token, modality-type embeddings) | Transformer combining modality tokens into a patient vector | Folded into term:transformer-architecture |
| Gene tokenisation (rank-based, top-N, value binning) | Converting expression profiles into transformer tokens | Folded into term:tokenisation |
| Held-out test split (80/20) | Evaluating on unseen samples | term:train-test-discipline |
| KMeans clustering (k=10) | Partitioning Visium spots into expression domains | Folded into term:spagcn |
| KNN neighbourhood smoothing (KNN=6) | Averaging neighbouring spots to reduce sparsity | Folded into term:spagcn |
| Logistic regression | Linear classifier used for subtype head-to-heads | term:logistic-regression-term |
| Low-label regime / transfer learning | Fine-tuning on few labels (50–500) after pretraining | term:transfer-learning |
| Mahalanobis distance OOD guard | Distance in PCA space flags off-manifold inputs | term:ood-detection |
| Mann–Whitney U test | Non-parametric two-group rank test | Folded into term:permutation-test |
| Masked gene modelling (SSL) | Mask genes and reconstruct them to learn co-expression | Folded into term:masked-modelling |
| Mean pooling of gene embeddings | Averaging token embeddings into a sample embedding | Folded into term:embedding |
| Mean per-drug Spearman | Average rank correlation of predicted vs true response per drug | Folded into term:spearman-correlation |
| Mixed precision / GPU training (A100, L4, CUDA, MPS) | Hardware and numerics for scale-up pretraining | term:mixed-precision-gpu |
| MLP (multilayer perceptron) | Simple feedforward network baseline/encoder | Folded into term:ridge-regression |
| Modality dropout | Randomly dropping modalities in training for robustness | Folded into term:multimodal-fusion |
| Moran's I (with permutation test) | Spatial autocorrelation statistic; +0.880, p=0.001 | term:spatial-autocorrelation |
| Multimodal fusion | Combining several data types into one model | term:multimodal-fusion |
| Nearest-centroid classifier (rank-based PAM50) | Spearman correlation to subtype centroids; platform-robust | term:logistic-regression-term |
| One-hot baselines (tissue-only / cancer-type-only floor) | Organ-of-origin-only predictor as the floor | term:organ-of-origin-signal |
| Out-of-distribution (OOD) detection / ManifoldGuard | Refusing predictions for inputs off the training manifold | term:ood-detection |
| Permutation test | Null distribution by shuffling labels/locations | term:permutation-test |
| Pooled vs stratified (within-type) C-index | Survival metric with or without the tissue-of-origin confound | Folded into term:concordance-index |
| Quantile normalisation (QN) | Rank-based single-sample distribution alignment | term:quantile-normalisation |
| Ridge regression | L2-regularised linear regression for per-drug heads | term:ridge-regression |
| Self-supervised learning (SSL) | Label-free pretraining on unpaired data | term:self-supervised-pretraining |
| Semantic token grounding / universal tokenisation | Embedding entities by sequence/protein, not arbitrary IDs | Folded into term:tokenisation |
| Separate-block PCA concatenation | Reduce each modality separately so small blocks aren't swamped | Folded into term:pca |
| Spearman correlation | Rank correlation used for concordance and drug response | term:spearman-correlation |
| Spatially aware domains (neighbour-smoothed PCA) | Clustering constrained to contiguous tissue regions | Folded into term:spagcn |
| Specialised task heads | Per-task output modules on a shared backbone | Folded into term:ablation-study |
| Stage-1 / stage-2 (two-stage) training recipe | Unpaired per-modality SSL, then cross-modal alignment | Skipped: CanSim result name with no general meaning |
| Time-dependent AUC | Survival discrimination at specific time horizons | term:roc-auc |
| Univariate Cox score z | Per-gene marginal prognostic strength statistic | term:time-dependent-auc |
| Zero-shot prediction | Applying a model without task-specific training | term:zero-shot |

## Genes & pathways

| Term | Gloss | Done |
| --- | --- | --- |
| 17q12 HER2 amplicon | Chromosome region co-amplifying ERBB2, GRB7, STARD3, PGAP3, MIEN1, PNMT | term:co-amplification |
| ABAT | GABA transaminase; top mRNA-protein concordant (ρ 0.92) | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| AGR3 | Anterior gradient protein 3; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| APOC4 | Apolipoprotein C4; decoupled mRNA/protein | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| C1orf116 | Androgen-regulated gene; highly concordant (ρ 0.93) | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| C5orf47 | Uncharacterised gene; top MEK-inhibitor sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| CCDC150 | Coiled-coil protein; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| CENPP | Centromere protein P; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| CLCA1 | Chloride channel regulator; top MEK sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| COL6A5 | Collagen VI α5; most decoupled (ρ −0.62) | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| CYGB | Cytoglobin; Selumetinib sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| DCLK1 | Doublecortin-like kinase 1; highly concordant | target:dclk1 |
| DDN | Dendrin; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| DNAJC12 | HSP40 co-chaperone, luminal marker; highly concordant | target:dnajc12 |
| E2F7 | Atypical E2F transcriptional repressor; decoupled | target:e2f7 |
| ERAP2 | ER aminopeptidase 2; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| GPD1L | Glycerol-3-phosphate dehydrogenase 1-like; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| GRB7 | Adaptor protein co-amplified with ERBB2 | target:grb7 |
| GTF2H2C | TFIIH subunit paralog; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| HSD3B2 | Steroidogenic enzyme; PD0325901 sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| LCN10 | Lipocalin 10; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| MAOA | Monoamine oxidase A; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| MAPK / RAS-MAPK pathway | Growth signalling cascade; MEK-inhibitor dependency | Existing pathway:ras-mapk |
| MFF | Mitochondrial fission factor; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| MIEN1 | 17q12 amplicon gene co-amplified with ERBB2 | target:mien1 |
| NANOGP8 | NANOG pseudogene; MEK sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| NOSTRIN | Nitric-oxide synthase trafficker; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| NPHP3 | Nephrocystin-3 ciliary gene; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| PADI2 | Peptidyl arginine deiminase 2; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| PAM50 gene set | 50 genes defining breast intrinsic subtypes | Alias on term:pam50 |
| PGAP3 | 17q12 amplicon gene co-amplified with ERBB2 | target:pgap3 |
| PHLDA (family) | MAPK-responsive pleckstrin-homology genes | target:phlda1 |
| PHLPP2 | AKT phosphatase; decoupled | target:phlpp2 |
| PI3K/AKT pathway | Growth/survival signalling hit by PIK3CA/PTEN alterations | Existing pathway:pi3k-akt-mtor |
| PNMT | 17q12 amplicon gene (adrenaline synthesis) | target:pnmt |
| PRR9 | Proline-rich protein 9; MEK sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| RABEP1 | Rab GTPase effector; highly concordant | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| RPP21 | RNase P subunit; decoupled | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| SPRY2 / SPRY4 | Sprouty MAPK feedback inhibitors; MAPK-output genes | target:spry4 (target:spry2 exists) |
| ST6GALNAC3 | Sialyltransferase; PD0325901 sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| STARD3 | 17q12 amplicon cholesterol-transport gene | target:stard3 |
| SUN5 | Nuclear envelope protein; MEK sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| TAAR5 | Trace amine receptor 5; Selumetinib sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| VIP | Vasoactive intestinal peptide; MEK sensitiser hit | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |
| VWA5A | von Willebrand A-domain gene; most concordant (ρ 0.94) | Skipped: gene named only for a CanSim concordance or MEK-sensitiser result, no general oncology meaning |

## Project-specific concepts & results

| Term | Gloss | Done |
| --- | --- | --- |
| 150-gene panel (mutation-frequency-derived) | Early SP1/SP4 feature set chosen by mutation frequency | Skipped: CanSim result name with no general meaning |
| 260-gene panel bottleneck | PAM50-heavy panel ties the tissue-only floor on drug response | Skipped: CanSim result name with no general meaning |
| 800-gene panel negative | Bigger panel washed out the low-label SSL win | Skipped: CanSim result name with no general meaning |
| ARCHS4 1M-sample SSL scale negative | 100× more SSL data still did not beat from-scratch | Skipped: CanSim result name with no general meaning (the corpus itself is the ARCHS4 data-source row) |
| BulkFormer fine-tune harness (GPU-laid-up) | Written and smoke-tested, awaiting a GPU | Skipped: CanSim result name with no general meaning |
| Clinical + molecular additivity | Molecular risk adds to clinical variables (0.674; 0.770 in-domain) | Covered by term:clinical-covariates |
| Cohort briefing / cohort-level LLM reasoning layer | Egress-guarded LLM summary of public cohort findings | Folded into term:local-llm-reasoning-layer |
| Confidence gates (high / low / refused) | `Prediction` shape: in-distribution, reliable, signal-strength gates | Folded into term:uncertainty-quantification |
| Console & single-source roadmap | Password-gated Vercel site; roadmap rendered from JSON | Skipped: CanSim result name with no general meaning |
| Correctness backbone | QN + OOD guard + reliability tested on new platforms | Folded into term:quantile-normalisation and term:ood-detection |
| CPTAC×TCGA bridge | Prognostic strength independent of mRNA-protein concordance (ρ +0.022) | Covered by term:mrna-protein-concordance |
| Cross-platform single-patient reliability | Bootstrap spread on a single cross-platform sample can exceed the in-domain cutoff; flagged unreliable (concept only, no case detail on the public site) | Folded into term:bootstrap |
| Data layer hierarchy (Patient → Specimen → Assay) | Core entity model with provenance fixed at ingest | Folded into term:duckdb-catalog |
| Drug-response capability (persisted) | Full-transcriptome → PCA → Ridge over 256 GDSC drugs, ρ 0.339 | Skipped: CanSim result name with no general meaning |
| Egress guards (`assert_public`, `assert_local_llm`, `assert_gitignored_out`) | Code-level firewalls between private data and any network or repo | Folded into term:local-llm-reasoning-layer |
| Four north-star capabilities | Mechanism, drug response, diagnosis/prognosis, generative | Skipped: CanSim result name with no general meaning |
| Frozen FM negative result | Frozen BulkFormer never beats or adds to a genome-wide baseline | Covered by term:fine-tuning-vs-frozen and term:reproducibility |
| Full-transcriptome default | Replacing the panel with full-transcriptome PCA as standard | Folded into term:bulk-rna-seq |
| Generative virtual-cell seed (SP4) | Predict expression from genotype + clinical data (ρ 0.450) | Skipped: CanSim result name with no general meaning |
| Honest-negatives reporting principle | Report misses, not only flattering task selections | Folded into term:reproducibility |
| In-silico perturbation screen | Exact gene→drug driver ranking recovering MAPK/HER2/BCL2 | Folded into term:virtual-cell-models |
| "Correctly silent" negatives | Mutation-driven drugs yield no expression drivers, by design | Folded into term:virtual-cell-models |
| Local-only patient reasoning layer (MLX, on-device) | Open LLM runs on-device over derived outputs with no network | term:local-llm-reasoning-layer |
| Methylation sixth modality | Adding methylation improved cancer-type accuracy | Covered by term:methylation-arrays |
| OOD guard on Visium | Mahalanobis guard accepts 7–10 of 10 domains per section | Covered by term:ood-detection |
| Privacy rule / local-only case runner | Real patient data never leaves the machine | Folded into term:local-llm-reasoning-layer |
| Provenance & ontology discipline | Identifiers standardised at ingest; data outlives models | term:provenance-fields |
| RPPA walk-back | Early proteomics "win" was only over the weak panel | Skipped: CanSim result name with no general meaning |
| SP1 ceiling artifact | Cancer-type task saturated by expression, leaving fusion no headroom | Folded into term:accuracy-f1 |
| SP roadmap (SP1, SP2, SP2.1, SP3, SP3a, SP3b, SP4, SP5, SP-BRCA) | Sub-project decomposition of the programme | Skipped: CanSim result name with no general meaning |
| SP3b WSI interface-complete, ingestion deferred | ABMIL pathology encoder built; real slides await GPU | Skipped: CanSim result name with no general meaning |
| Signal problem vs encoding problem | Weak modalities lack complementary signal, not better encoders | Folded into term:multimodal-fusion |
| Spatial luminal heterogeneity (7 LumB / 3 LumA domains) | Reproducible, spatially organised mixed subtypes in one tumour | Covered by term:intra-tumour-heterogeneity |
| Spatial 99-point risk spread | Regional risk percentiles 0–99 inside one section | Covered by term:prognosis-risk-percentile |
| Survival capability (persisted, guarded) | TCGA-BRCA C-index 0.711 in-domain, 0.518 on METABRIC | Skipped: CanSim result name with no general meaning |
| "Transcriptome is a near-complete summary for survival" | Mutation/CNA/RPPA/FM add nothing over full expression | Covered by term:multimodal-fusion and term:ablation-study |
| Type-only / tissue-only floor | Baseline any molecular encoder must beat | term:organ-of-origin-signal |
| Two-phase stage-2 > joint (but < plain fusion) | Recipe ordering result at ~2k-patient scale | Skipped: CanSim result name with no general meaning |
| "Passing the guard is necessary, not sufficient" | Guard-passing predictions can still be numerically unstable | Folded into term:ood-detection |

## From the research notes (drug-response frontier, FM scan, Noetik)

| Term | Gloss | Done |
| --- | --- | --- |
| Leave-cell-line-out (LCO) split | Held-out cell lines; the personalised-medicine protocol | term:drug-response-splits |
| Leave-drug-out (LDO) split | Held-out drugs; the drug-design protocol | term:drug-response-splits |
| Leave-tissue-out (LTO) split | Held-out tissues; the repurposing protocol | term:drug-response-splits |
| Leave-pair-out (random) split | Valid only for imputation, not generalisation claims | term:drug-response-splits |
| Cross-study validation | Train on one screen, test on another; the real bar | term:drug-response-splits |
| Naive mean-drug / mean-cell-line baseline | The floor deep DRP models barely beat | term:drug-response-baselines |
| DrEval | Nature Communications 2026 drug-response evaluation framework | term:drug-response-baselines |
| IMPROVE (UNO, GraphDRP) | ANL/NCI cross-model DRP benchmark and its models | term:drug-response-baselines |
| LightGBM (tuned tree ensembles) | Ties or beats deep models under honest splits | term:drug-response-baselines |
| DeepCCDS / DeepTTA | Deep DRP models whose headline gains shrink under hard splits | term:drug-response-baselines (DeepCCDS not separately sourced) |
| Assay/endpoint mismatch (CellTiter-Glo vs Syto60; IC50 vs GI50/AAC) | Confounder in cross-dataset drops | Folded into term:drug-response-sensitivity |
| Domain adaptation for cell-line → patient transfer | Aligning cell-line and tumour distributions | term:domain-adaptation |
| TUGDA | Multi-task uncertainty-weighted unsupervised domain adaptation | term:domain-adaptation |
| velodrome / PRECISE / TRANSACT | Other public cell-line → patient transfer methods | term:domain-adaptation |
| Mechanism-of-action (MoA) recovery | Orthogonal proof a model learned biology | term:mechanism-of-action-recovery |
| Pre-registered experiment | Success criterion committed before the run | term:pre-registered-experiment |
| BulkRNABert | Bulk-native RNA FM, research-only licence (CC-BY-NC-SA) | term:single-cell-foundation-models |
| Bulk-native vs single-cell FMs | Single-cell FMs are out-of-distribution for bulk TCGA | Folded into term:foundation-model |
| Frozen embedding → PCA-256 → linear head | The validated FM extraction recipe | Folded into term:linear-probe and term:pca |
| ESM-2 / ESM-3 | Protein language models (unverified category) | term:genomic-and-protein-language-models |
| Noetik OCTO-VirtualCell (OCTO-vc) | Masked-token spatial single-cell transformer, 40M proprietary cells | Folded into term:virtual-cell-models (company:noetik exists) |
| Celleporter | Noetik's interactive model previewer; the "playground" pattern | Skipped: product feature of one company, no general meaning |
| Virtual cell / in-silico knockout screen | Counterfactual perturbation for target discovery | term:virtual-cell-models |
| H&E → expression prediction | Cross-modal task validated by Noetik and MUSK-adjacent work | Covered by term:digital-pathology-wsi and technology:musk |
| Tertiary lymphoid structures (TLS) | Organised immune aggregates in tumours; a known-biology probe | term:tertiary-lymphoid-structures |
| Responder vs non-responder biomarker discovery | The killer application framing for drug response | Folded into term:mechanism-of-action-recovery and term:immunotherapy-response |
| Recovers-known-biology probes | Evaluation by recovery of known markers/pathways | term:mechanism-of-action-recovery |
| Data moat | Proprietary data volume as competitive edge; not ours | Skipped: business jargon, no oncology or methods meaning |
| Tinker (Thinking Machines) | LLM fine-tuning service reserved for the reasoning layer | Skipped: commercial LLM service with no oncology meaning |

## Ontologies, standards & formats

| Term | Gloss | Done |
| --- | --- | --- |
| AJCC stage | TNM-based cancer staging system used as clinical covariate | term:ajcc-stage |
| AnnData / h5ad | Python annotated-matrix format for expression data | Existing opensource:anndata; term:anndata-h5ad |
| CC BY 4.0 / MIT licence | Open data/model licences (Visium data, BulkFormer weights/code) | term:open-licences |
| Cell Ontology (CL) | Standard vocabulary for cell types | Folded into term:uberon |
| Content-addressed storage (sha256 manifest) | Raw files keyed by checksum for reproducibility | Folded into term:provenance-fields |
| DuckDB / Postgres catalog | Queryable metadata spine joining patients, specimens, assays | term:duckdb-catalog |
| Ensembl gene ID | Stable gene identifier alongside the HGNC symbol | term:ensembl-gene-id |
| GRCh38 vs hg19 | Human genome builds; mixing them is the classic TCGA legacy trap | term:genome-builds |
| HDF5 | Hierarchical binary format (ARCHS4 distribution) | term:hdf5-zarr-parquet |
| HGNC symbol | Official human gene nomenclature | term:hgnc-symbol |
| HGVS | Standard notation for describing sequence variants | term:hgvs |
| HPO (Human Phenotype Ontology) | Standard vocabulary for phenotypes | term:hpo |
| ICD-O-3 | Oncology morphology/topography coding system | term:icd-o-3 |
| MONDO | Unified disease ontology | term:mondo |
| NCIt (NCI Thesaurus) | NCI terminology for diseases and drugs | term:ncit |
| OME-Zarr | Chunked bio-imaging format for WSI tiles | term:hdf5-zarr-parquet |
| OncoTree | Cancer-type classification tree (MSK) | Existing opensource:oncotree; term:oncotree-term |
| Parquet | Columnar tabular storage format | term:hdf5-zarr-parquet |
| Provenance fields | source_dataset, accession, pipeline_version, genome_build, timestamp, checksum | term:provenance-fields |
| RxNorm | NLM standard drug nomenclature | term:rxnorm |
| TCGA barcode | Patient-sample-vial-portion-analyte identifier, used as the join key | term:tcga-barcode |
| Uberon | Cross-species anatomy ontology | term:uberon |
| UO (Units Ontology) | Standard units of measurement | term:units-ontology |
| Zarr | Chunked array storage format | term:hdf5-zarr-parquet |

## Clinical & biological concepts

| Term | Gloss | Done |
| --- | --- | --- |
| Actionable genomic biomarkers | Alterations that map directly to targeted therapy | term:cancer-drivers-vs-actionable |
| Cancer drivers | Genes whose alteration promotes tumour growth | Existing term:driver-mutation |
| Cell composition confound (tumour vs stroma/immune) | Region risk differences partly reflect cell mix | term:cell-composition-confound |
| Cell lines as a patient proxy | In-vitro response imperfectly reflects patient response | term:cell-lines-as-proxy |
| Censoring / events | Patients without observed outcome; event count drives power | term:censoring-and-events |
| Co-amplification | Neighbouring genes amplified together with a driver | term:co-amplification |
| Drug response / drug sensitivity | How strongly a tumour or cell line responds to a compound | term:drug-response-sensitivity |
| Endocrine (hormone) therapy & resistance | Anti-estrogen treatment; ESR1 mutation confers resistance | term:endocrine-therapy-resistance |
| Gene co-expression structure | Correlated expression patterns learned by SSL | term:gene-co-expression |
| Immunotherapy response | Benefit from immune checkpoint treatment (MUSK task) | term:immunotherapy-response |
| Intra-tumour heterogeneity | Different subtypes/risk within one tumour | term:intra-tumour-heterogeneity |
| Lymph-node status / nodal burden | Number of positive nodes as prognostic factor | Alias on term:lymph-node-status |
| mRNA-protein concordance | How well transcript levels track protein levels | term:mrna-protein-concordance |
| Oncogene amplicon (17q12 HER2 amplicon) | Amplified region carrying ERBB2 and neighbours | term:co-amplification |
| Organ-of-origin / tissue-of-origin signal | Expression strongly encodes tumour tissue, confounding tasks | term:organ-of-origin-signal |
| Pathway activation state | Signalling activity (often phosphorylation) beyond mRNA | term:pathway-activation-state |
| Pharmacogenomics | Genetic/molecular determinants of drug response | term:pharmacogenomics-term |
| Post-transcriptional / post-translational regulation | Control decoupling protein from mRNA levels | term:post-transcriptional-regulation-term |
| Prognosis / risk percentile | Predicted outcome ranked against a reference cohort | term:prognosis-risk-percentile |
| Radiotherapy / chemotherapy flags | Treatment covariates in clinical models | term:clinical-covariates |
| Spatial autocorrelation | Nearby tissue locations having similar values | term:spatial-autocorrelation |
| Tumour evolution | Clonal change of tumours over time (north-star mechanism) | term:tumour-evolution |
| Variant effect prediction | Predicting the clinical impact of DNA variants | term:variant-effect-prediction |

## Public datasets & sources

| Term | Gloss | Done |
| --- | --- | --- |
| 10x Genomics Visium Human Breast Cancer (Block A, Sections 1 & 2) | Public CC BY 4.0 breast Visium sections, ~3,798 spots | data source tenx-public-datasets |
| ARCHS4 (`human_gene_v2` HDF5) | ~1.2M uniformly processed public human RNA-seq samples | data source archs4 |
| BulkFormer `TCGA_survival.h5ad` | BulkFormer's published TCGA matrix in a 20,010-gene space | Skipped: one project file; BulkFormer itself in term:single-cell-foundation-models |
| CCLE (Cancer Cell Line Encyclopedia) | Molecular profiles of ~1,000 cancer cell lines | data source ccle |
| CELLxGENE | CZI single-cell data census | Existing opensource:cellxgene; alias on collection:cellxgene-hca |
| ChEMBL | Bioactive-molecule database used as a drug identifier | Existing data source chembl and collection:drugbank-chembl |
| CPTAC pipelines (umich / washu / broad / bcm) | Centre-specific processing sources for proteome/mRNA | Alias on collection:cptac; term:mass-spec-proteome |
| CTRP | Cancer Therapeutics Response Portal cell-line drug screen | data source ctrp |
| dbSNP | NCBI database of short genetic variants | data source dbsnp |
| GDC (Genomic Data Commons) | NCI repository serving TCGA data and slides via API | Existing data source gdc; alias on collection:tcga-gdc |
| GDSC (Genomics of Drug Sensitivity in Cancer) | Cell-line drug screen; 256 drugs used here | data source gdsc |
| GEO (Gene Expression Omnibus) | NCBI public expression repository (no accessions named) | data source geo |
| GTEx | Normal-tissue expression reference atlas | Existing data source gtex |
| HCA (Human Cell Atlas) | Single-cell reference atlas of human tissues | Alias on collection:cellxgene-hca |
| HTAN (Human Tumor Atlas Network) | NCI multi-modal tumour atlas incl. spatial/single-cell | data source htan |
| METABRIC | ~2,000-patient breast cohort, microarray, long follow-up | data source metabric |
| MSigDB | Molecular Signatures Database of gene sets | data source msigdb |
| Reactome | Curated pathway knowledge base | Existing data source reactome |
| recount3 | Uniformly reprocessed public RNA-seq resource | data source recount3 |
| TCGA (The Cancer Genome Atlas) | ~11k patients, 33 cancer types, multi-omic, the paired backbone | Alias on collection:tcga-gdc |
| TCGA PanCanAtlas 2018 (`*_tcga_pan_can_atlas_2018`) | Harmonised pan-cancer TCGA studies on cBioPortal (32 used) | data source pancanatlas; alias on collection:tcga-gdc |

## Cancer types & subtypes

| Term | Gloss | Done |
| --- | --- | --- |
| Basal-like (PAM50 Basal) | Triple-negative-like, aggressive breast subtype with basal gene program | Alias on term:pam50 |
| BLCA (bladder urothelial carcinoma) | TCGA bladder cancer cohort used in within-type survival | Alias on cancer:urothelial |
| CESC (cervical squamous/adenocarcinoma) | TCGA cervical cancer cohort; full transcriptome gained +0.054 | Alias on cancer:cervical |
| COAD / colorectal adenocarcinoma | Colon cancer; TCGA, CPTAC and Visium colorectal section | Alias on cancer:colorectal |
| COADREAD | Combined TCGA colon + rectal adenocarcinoma cohort | Alias on cancer:colorectal |
| ESCA (esophageal carcinoma) | TCGA esophageal cohort; full transcriptome did not help | Alias on cancer:esophageal |
| HER2-enriched (PAM50 Her2) | Breast subtype driven by ERBB2 amplification/overexpression | Alias on term:pam50 |
| HNSC / HNSCC (head & neck squamous cell carcinoma) | Head-and-neck cancer; TCGA survival and CPTAC concordance | Alias on cancer:head-and-neck |
| KIRC (kidney renal clear cell carcinoma) | TCGA clear-cell kidney cancer cohort | Alias on cancer:clear-cell-rcc |
| KIRP (kidney renal papillary carcinoma) | TCGA papillary kidney cancer; high within-type C-index | Alias on cancer:papillary-rcc |
| LIHC (liver hepatocellular carcinoma) | TCGA primary liver cancer cohort | Alias on cancer:hcc |
| LSCC / LUSC (lung squamous cell carcinoma) | Squamous lung cancer; TCGA (LUSC) and CPTAC (LSCC) | Alias on cancer:nsclc |
| LUAD (lung adenocarcinoma) | Most common lung cancer; TCGA and CPTAC cohorts | Alias on cancer:nsclc |
| Normal-like (PAM50 Normal) | Breast subtype resembling normal breast tissue expression | Alias on term:pam50 |
| OV (ovarian serous cystadenocarcinoma) | Ovarian cancer; TCGA, CPTAC, Visium ovarian section | Alias on cancer:ovarian |
| PAM50 molecular subtypes | 50-gene breast cancer classification into five intrinsic subtypes | Alias on term:pam50 |
| READ (rectum adenocarcinoma) | TCGA rectal cancer cohort | Alias on cancer:rectal-cancer |
| STAD (stomach adenocarcinoma) | TCGA gastric cancer cohort | Alias on cancer:gastric |
| Stroma-rich / desmoplastic tumours | Tumours with dense non-tumour stroma that depresses assay concordance | term:desmoplastic-stroma-rich |
| UCEC (uterine corpus endometrial carcinoma) | CPTAC endometrial cohort with high concordance | Alias on cancer:endometrial |

## Data modalities & assays

| Term | Gloss | Done |
| --- | --- | --- |
| Bulk RNA-seq | Sequencing-based average gene expression across a whole tumour sample | term:bulk-rna-seq |
| Cell-line omics | Molecular profiles of cancer cell lines paired with drug screens | term:cell-lines-as-proxy; data source ccle |
| Clinical variables | Age, nodal status, stage, treatment flags used as features | term:clinical-covariates |
| Deep mass-spectrometry proteome | Genome-scale protein quantification by MS (CPTAC) | term:mass-spec-proteome |
| Drug-response readouts (AUC, IC50) | Dose-response summary metrics of cell-line drug sensitivity | term:drug-response-sensitivity |
| EHR text / pathology reports | Free-text clinical records; TITAN aligns WSIs to reports | term:ehr-text-pathology-reports |
| Full transcriptome (~20k genes) | Genome-wide expression rather than a curated gene subset | term:bulk-rna-seq |
| Genomic DNA sequence | Raw nucleotide sequence modelled by Evo 2 / Nucleotide Transformer | term:genomic-and-protein-language-models; technology:wes-wgs exists |
| log2 TPM | Log-transformed transcripts-per-million expression unit | term:tpm-fpkm-counts |
| Methylation (DNA methylation arrays) | CpG methylation profiles; added as sixth modality | term:methylation-arrays |
| Microarray expression | Hybridisation-based expression platform used by METABRIC | term:microarray-expression |
| OS / PFS outcomes (time + event) | Overall/progression-free survival times with censoring indicators | term:os-pfs-time-event |
| Pseudobulk | Aggregated expression over spots/cells mimicking a bulk sample | Folded into term:single-cell-rna-seq |
| Radiology imaging | CT/MRI imaging (TCIA); a future SP5 modality | term:radiology-imaging-modality |
| RPPA (reverse-phase protein array) | Antibody assay of ~149–200 proteins and phospho-proteins | term:rppa |
| Phospho-proteomics | Measurement of phosphorylated proteins indicating pathway activation | term:pathway-activation-state |
| Single-cell expression | Per-cell transcriptomes (CELLxGENE/HCA) for foundation models | term:single-cell-rna-seq |
| Somatic mutations (WXS/WGS) | Tumour-acquired DNA variants from exome/genome sequencing | term:somatic-mutations-wxs-wgs |
| Targeted-panel sequencing | Clinical gene panels (GENIE) covering hundreds of genes | term:targeted-panel-sequencing |
| WSI histopathology (.svs gigapixel slides) | Digitised H&E whole-slide images tiled for deep learning | term:digital-pathology-wsi |

## Models & foundation models referenced

| Term | Gloss | Done |
| --- | --- | --- |
| ABMIL (attention-based multiple-instance learning) | Attention pooling of tile embeddings into a slide representation | term:abmil |
| BulkFormer | 147M-param bulk-RNA-seq FM, ~500k profiles; frozen, tested, rejected | term:single-cell-foundation-models |
| CLAM | Mahmood-lab weakly supervised WSI MIL framework | Existing opensource:clam; term:abmil |
| Claude Sonnet 5 | LLM narrating cohort-level findings in the briefing | Skipped: general-purpose LLM, no oncology meaning |
| CONCH | Mahmood-lab pathology vision-language tile encoder | Existing opensource:conch; term:pathology-foundation-models |
| Enformer | DeepMind sequence-to-expression regulatory model | term:genomic-and-protein-language-models |
| ESM2 | Meta protein language model; UCE uses it for gene tokens | term:genomic-and-protein-language-models |
| Evo 2 (StripedHyena 2) | 40B-param genomic FM, 1M-bp context; zero-shot claim refuted | Existing technology:evo2 and opensource:evo2; term:genomic-and-protein-language-models |
| GeneCompass | 126M-cell single-cell foundation model | term:single-cell-foundation-models |
| MCAT / MOTCat | Mahmood-lab multimodal pathology-genomics survival models | Skipped: two conference models without a verifiable page fetched; PORPOISE from the same lab is cited in term:multimodal-fusion |
| Perceiver | Latent-bottleneck transformer architecture used for fusion | Folded into term:transformer-architecture |
| PORPOISE | Mahmood-lab pan-cancer pathology-omics prognosis model | Cited in term:multimodal-fusion |
| SpaGCN | Graph-convolutional spatially aware clustering method | term:spagcn |
| UCE (Universal Cell Embeddings) | 650M-param cell FM tokenising genes by ESM2 | Existing opensource:uce; term:single-cell-foundation-models |
| UNI | Mahmood-lab general pathology tile encoder | Existing opensource:uni; term:pathology-foundation-models |
| CanSim: `MaskedExpressionAutoencoder` | MLP autoencoder SSL-pretrained by masking 50% of genes | Skipped: CanSim result name with no general meaning |
| CanSim: `GeneTokenTransformer` | Gene-token transformer SSL encoder; data-hungry at small scale | Skipped: CanSim result name with no general meaning |
| CanSim: `WSIEncoder` / `CNAEncoder` | Per-modality encoders producing fusion tokens | Skipped: CanSim result name with no general meaning |
| CanSim: `SurvivalPredictor` / `DrugResponsePredictor` / `InSilicoPerturbation` / `FullTranscriptomePCA` | Persisted capability classes in the `cansim` package | Skipped: CanSim result name with no general meaning |

## Drugs & compounds

| Term | Gloss | Done |
| --- | --- | --- |
| Daporinad (FK866) | NAMPT inhibitor; highly predictable (ρ 0.657) | Skipped: tool compound named only as a CanSim predictability result; no OnCo drug record warranted |
| GW-2580 | CSF1R kinase inhibitor; unpredictable | Skipped: tool compound, CanSim result only |
| HER2-targeted therapy (class) | Anti-ERBB2 drugs for HER2-amplified tumours | Existing technology and target:her2 |
| PD0325901 | Experimental MEK inhibitor (ρ 0.692) | Alias on drug:mirdametinib |
| Refametinib | MEK inhibitor; most predictable drug (ρ 0.760) | Skipped: discontinued MEK inhibitor named only as a CanSim result |
| Sabutoclax | Pan-BCL2-family inhibitor (ρ 0.579) | Skipped: tool compound, CanSim result only |
| SL0101 | RSK kinase inhibitor; unpredictable | Skipped: tool compound, CanSim result only |
| Tanespimycin (17-AAG) | HSP90 inhibitor (ρ 0.591) | Skipped: discontinued HSP90 inhibitor named only as a CanSim result |
| Telomerase Inhibitor IX | Telomerase-targeting tool compound (ρ 0.584) | Skipped: tool compound, CanSim result only |
| VNLG/124 | Retinamide HDAC-related tool compound; unpredictable | Skipped: tool compound, CanSim result only |
| XMD8-92 | ERK5/BRD4 inhibitor; hardest to predict (ρ −0.240) | Skipped: tool compound, CanSim result only |
| PI3K/mTOR inhibitors (PI-103, ZSTK474) | Class surfaced for Basal-like tumours in the panel-restricted model | Skipped: tool compounds; pathway:pi3k-akt-mtor exists |
| HDAC inhibitors (Belinostat, AR-42, CUDC-101) | Class surfaced for Basal-like tumours in the panel-restricted model | Existing drug:belinostat; AR-42 and CUDC-101 skipped as tool compounds |
