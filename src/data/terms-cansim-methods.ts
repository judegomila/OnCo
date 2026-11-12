/**
 * "Methods and models": the machine-learning, statistics, data-format and licensing vocabulary a reader meets in
 * cancer AI papers, from the CanSim terms map (docs/CANCERSIM-TERMS-GAP.md). Each record gives a one-line definition
 * paraphrased from the linked page (Wikipedia summary, the tool's documentation, the paper), one sentence on why it
 * turns up in cancer papers, and the CC BY 4.0 attribution the CanSim file asks for; project-specific terms name the
 * CanSim page path. The hub term `cancer-ai-vocabulary` lists every record of this file and of
 * terms-cansim-oncology.ts so none is an orphan.
 */
import type { TermInput } from "@/lib/schema";
import { cansimTerm as t, cansimOncologyTerms, CANSIM_HUB, DOI, W } from "./terms-cansim-oncology";

const M = "Methods and models";
const ARXIV = (id: string) => `https://arxiv.org/abs/${id}`;

export const cansimMethodsTerms: TermInput[] = [
  // ---- Models and pretraining ----
  t({ id: "foundation-model", name: "Foundation model", category: M, aka: ["foundation model", "foundation models", "FM", "bulk-native foundation model", "single-cell foundation model", "large x model"],
    wikipedia: W("Foundation_model"), cansim: "/terms/foundation-model",
    tldr: "A foundation model learns reusable representations from broad data and can be adapted to different tasks. Its performance needs evaluation for each task and setting.",
    summary: "A foundation model learns reusable representations during pretraining and can be adapted to different tasks. Geneformer was pretrained on about 30 million single-cell transcriptomes and scGPT on over 33 million cells, then adapted to downstream tasks (Theodoris and colleagues, 2023; Cui and colleagues, 2024). Pretraining and task-specific fitting are different stages, and zero-shot use (no further training), fine-tuning and a small predictor fitted on frozen features are different evaluation settings that should not be compared as if they used the same information. A zero-shot evaluation of Geneformer and scGPT found that in some cases they were outperformed by simpler methods; one evaluation dataset partly overlapped Geneformer's pretraining data and two were included in scGPT's, so overlap between pretraining and test data has to be checked, including whether the same participants or donors sit on both sides (the TRIPOD+AI reporting guidance asks that evaluation data share no participants with the data used to train, tune or select a model; Kedzierska and colleagues, 2025). A 2025 benchmark found that none of five single-cell foundation models and two other deep-learning models beat deliberately simple baselines at predicting transcriptome changes after single or double gene perturbations (Ahlmann-Eltze and colleagues, 2025). An embedding is a computed representation, not a measured function, and a published result belongs to its model version, task, data and adaptation method. Foundation model, generative model and virtual cell are overlapping but different ideas: an AI virtual cell is described as a multi-scale, multi-modal large neural network model (Bunne and colleagues, 2024, a perspective rather than a validation), and none of the labels shows that simulated interventions predict tumour killing or improve care. Failure modes worth recording are population or assay mismatch, leakage, technical shortcuts, unavailable input features and poor calibration.",
    terms: [
  "self-supervised-pretraining",
  "fine-tuning-vs-frozen",
  "pathology-foundation-models",
  "zero-shot",
  "transfer-learning",
  "embedding",
  "data-leakage",
  "external-validation"
], technologies: [
  "pathology-foundation-model",
  "ai-compute-platforms",
  "geneformer",
  "scgpt"
], related: ["idea-multimodal-foundation-model"] ,
"links": [
  {
    "label": "Theodoris et al., Transfer learning enables predictions in network biology (Nature 2023)",
    "url": "https://doi.org/10.1038/s41586-023-06139-9"
  },
  {
    "label": "Cui et al., scGPT: toward building a foundation model for single-cell multi-omics using generative AI (Nature Methods 2024)",
    "url": "https://doi.org/10.1038/s41592-024-02201-0"
  },
  {
    "label": "Kedzierska et al., Zero-shot evaluation reveals limitations of single-cell foundation models (Genome Biology 2025)",
    "url": "https://doi.org/10.1186/s13059-025-03574-x"
  },
  {
    "label": "Ahlmann-Eltze et al., Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines (Nature Methods 2025)",
    "url": "https://doi.org/10.1038/s41592-025-02772-6"
  },
  {
    "label": "Collins et al., TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods (BMJ 2024)",
    "url": "https://doi.org/10.1136/bmj-2023-078378"
  },
  {
    "label": "Bunne et al., How to build the virtual cell with artificial intelligence: Priorities and opportunities (Cell 2024)",
    "url": "https://doi.org/10.1016/j.cell.2024.11.015"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Foundation_model"
  }
],
"asOf": "2026-11-10",
"provenance": {
  "editedBy": "OnCo systematic education audit, round 3 (spatial and computational content): Crossref and Europe PMC identity checks, abstracts and selected full texts read",
  "editedOn": "2026-11-09",
  "note": "Added from Theodoris 2023 (PMID 37258680), Cui 2024 (PMID 38409223), Kedzierska 2025 (PMID 40251685, full text PMC12007350 read for the pretraining overlap) and Ahlmann-Eltze 2025 (PMID 40759747). The earlier CanSim terms-map text is unchanged: CanSim terms map 1.0.0 (docs/onco/terms.json, generated 2026-09-24), CC BY 4.0, attribution: CanSim project."
},
"notes": [
  "Model card for a biological foundation model (a reading guide, not a score). Input and cost: the data type, preparation and normalisation used; running a model uses computing resources and no new tissue, but the original assays that produced the data consumed specimens. Training and adaptation: the pretraining source and version, any overlap with later test data, and which parts were left fixed or fine-tuned. Output and units: embedding coordinates, labels or predicted molecular values, with the original units and transforms kept. Controls and thresholds: baselines that use the same information, independent evaluation, and a decision rule set before testing; there is no general passing size or score. Failure modes: population or assay mismatch, leakage, technical shortcuts, unavailable features and poor calibration. Validation tier: evidence for the stated task only, with no implied clinical authorisation or benefit."
]
}),
  t({ id: "self-supervised-pretraining", name: "Self-supervised pretraining (SSL)", category: M, aka: ["self-supervised pretraining", "self-supervised learning", "SSL pretraining", "label-free pretraining", "pretraining objective", "pretrained encoder"],
    wikipedia: W("Self-supervised_learning"), cansim: "/terms/self-supervised-pretraining",
    tldr: "Self-supervised pretraining teaches a model from unlabelled data by hiding part of each example and asking it to predict the hidden part, so no expert labels are needed.",
    summary: "Self-supervised learning trains a model on a task where the data itself provides the supervisory signal rather than external labels (Wikipedia); masking, contrastive objectives and next-token prediction are the common forms. It matters in cancer because unlabelled slides, cells and expression profiles exist by the million while outcome labels exist by the hundred. Whether pretraining beats training from scratch on the labelled task is an empirical question and, for bulk expression at TCGA scale, several groups have reported that it does not.",
    terms: ["masked-modelling", "contrastive-learning", "transfer-learning", "foundation-model"] }),
  t({ id: "masked-modelling", name: "Masked autoencoders and masked gene modelling", category: M, aka: ["masked autoencoder", "masked autoencoders", "masked gene modelling", "masked gene modeling", "masked reconstruction", "cross-modal masked reconstruction", "autoencoder"],
    wikipedia: W("Autoencoder"), cansim: "/terms/masked-autoencoder",
    tldr: "A masked autoencoder hides a random part of the input (image patches, or half the genes in a profile) and learns to reconstruct it from the rest.",
    summary: "An autoencoder learns an encoding that compresses the input and a decoding that recreates it (Wikipedia); the masked variant reconstructs only the hidden portion, which forces the encoder to learn the structure that relates parts of the input. For expression data the hidden parts are genes, so the model learns co-expression structure; for multimodal data one modality's token can be reconstructed from the others. It is the pretraining objective behind many pathology and transcriptome foundation models.",
    terms: ["self-supervised-pretraining", "gene-co-expression", "tokenisation"] }),
  t({ id: "contrastive-learning", name: "Contrastive learning (InfoNCE)", category: M, aka: ["contrastive learning", "contrastive objective", "contrastive alignment", "InfoNCE", "InfoNCE loss", "contrastive pretraining"],
    wikipedia: W("Self-supervised_learning"), cansim: "/terms/contrastive-learning",
    tldr: "Contrastive learning trains a model to pull matching pairs (two views of one slide, or one patient's RNA and protein) close together in embedding space and push non-matching pairs apart.",
    summary: "Contrastive methods are a branch of self-supervised learning in which the model learns by comparing positive pairs against negatives drawn from the batch (Wikipedia on self-supervised learning); the InfoNCE loss is the usual objective. It powers vision-language pathology models that align tile images with report text (CONCH) and multimodal patient models that align a patient's modalities. Its weakness is that it needs many negatives and can learn the batch rather than the biology.",
    terms: ["self-supervised-pretraining", "embedding", "multimodal-fusion"] }),
  t({ id: "transformer-architecture", name: "Transformer and attention", category: M, aka: ["transformer architecture", "transformer model", "transformer encoder", "attention mechanism", "self-attention", "multi-head attention", "attention weights", "fusion transformer", "Perceiver"],
    wikipedia: W("Transformer_(deep_learning)"), links: [{ label: "Wikipedia: attention (machine learning)", url: W("Attention_(machine_learning)") }, { label: "Wikipedia: Perceiver", url: W("Perceiver") }], cansim: "/terms/transformer",
    tldr: "A transformer is a neural network that turns its input into a sequence of tokens and lets every token weigh every other through attention, the architecture behind language models and most new biology models.",
    summary: "The transformer is a family of neural network architectures based on multi-head attention: input data is converted to tokens, each token to a vector, and attention determines the importance of each token relative to the others (Wikipedia). Genes, tiles, cells or whole modalities can be tokens, and a special summary token (CLS) can stand for the patient. The Perceiver variant routes inputs through a small latent array so that arbitrary and very long inputs stay affordable. Attention weights are often read as explanations, which they only loosely are.",
    terms: ["tokenisation", "embedding", "abmil", "foundation-model"] }),
  t({ id: "tokenisation", name: "Tokenisation (genes, tiles and sequence as tokens)", category: M, aka: ["tokenisation", "tokenization", "gene tokenisation", "gene tokens", "rank-based tokenisation", "value binning", "byte-pair encoding", "universal tokenisation", "semantic token grounding"],
    wikipedia: W("Lexical_analysis"), links: [{ label: "Wikipedia: byte-pair encoding", url: W("Byte-pair_encoding") }], cansim: "/terms/tokenisation",
    tldr: "Tokenisation is how raw input is chopped into the discrete pieces a transformer reads: words into subwords, a slide into tiles, an expression profile into genes ranked or binned by level.",
    summary: "Lexical tokenisation converts text into meaningful tokens of defined categories (Wikipedia); language models use subword schemes such as byte-pair encoding. Biology models must invent their tokens: expression can be tokenised by ranking the genes of a cell (Geneformer), keeping the top N, or binning values; DNA by nucleotides or k-mers. Grounding a gene token in its sequence or protein embedding (as UCE does with ESM2) rather than an arbitrary ID lets a model generalise to unseen genes and species.",
    terms: ["transformer-architecture", "embedding", "masked-modelling"] }),
  t({ id: "embedding", name: "Embedding (learned representation)", category: M, aka: ["embeddings", "learned embedding", "embedding vector", "patient embedding", "tile embedding", "gene embedding", "frozen embeddings", "mean pooling of embeddings"],
    wikipedia: W("Embedding_(machine_learning)"), links: [{ label: "Wikipedia: pooling layer", url: W("Pooling_layer") }], cansim: "/terms/embedding",
    tldr: "An embedding is a list of numbers a model produces to stand for an input (a tile, a gene, a patient), placed so that similar inputs land near each other.",
    summary: "In machine learning an embedding maps complex high-dimensional data into a lower-dimensional vector space (Wikipedia). Foundation models are mostly used as embedding machines: a frozen encoder turns each tile or cell into a vector, mean or attention pooling aggregates them into a slide or sample vector (Wikipedia on pooling layers), and a small model on top does the prediction. Whether the embedding groups samples by tissue or subtype without any labels (cluster purity) is the first check of its quality.",
    terms: ["transformer-architecture", "fine-tuning-vs-frozen", "linear-probe", "pca"] }),
  t({ id: "fine-tuning-vs-frozen", name: "Fine-tuning versus frozen features, and LoRA", category: M, aka: ["fine-tuning", "fine tuning", "full fine-tuning", "frozen encoder", "frozen features", "frozen embeddings", "LoRA", "low-rank adaptation", "parameter-efficient fine-tuning", "PEFT"],
    wikipedia: W("Fine-tuning_(deep_learning)"), links: [{ label: "Wikipedia: LoRA", url: W("LoRA_(machine_learning)") }, { label: "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models (arXiv 2021)", url: ARXIV("2106.09685") }], cansim: "/terms/fine-tuning-vs-frozen-embeddings",
    tldr: "Fine-tuning updates a pretrained model's weights on the new task; using it frozen keeps the weights fixed and trains only a small head on its features; LoRA is a cheap middle way that trains small low-rank updates.",
    summary: "Fine-tuning adapts a model trained for one task to a more specific task, a form of transfer learning (Wikipedia); LoRA, introduced by Microsoft researchers in 2021, adapts a pretrained model with far fewer trainable parameters by learning low-rank matrices added to the weights (Wikipedia). With hundreds of labelled patients, full fine-tuning overfits and frozen features plus a linear or ridge head is the standard recipe; the honest comparison is against a genome-wide baseline trained from scratch, which a frozen foundation model does not always beat.",
    terms: ["transfer-learning", "linear-probe", "embedding", "foundation-model"] }),
  t({ id: "linear-probe", name: "Linear probe", category: M, aka: ["linear probe", "linear probing", "linear evaluation", "linear head on frozen features", "frozen embedding to linear head"],
    wikipedia: W("Logistic_regression"), cansim: "/terms/linear-probe",
    tldr: "A linear probe is a simple linear model (logistic or ridge regression) trained on a frozen model's embeddings to test how much useful information those embeddings hold.",
    summary: "Logistic regression models the log-odds of an outcome as a linear combination of inputs (Wikipedia); trained on frozen embeddings it becomes a probe of the representation, since whatever it can predict must be linearly readable from the features. Pathology foundation-model papers report linear-probe accuracy across many tasks as their headline comparison, and frozen embedding, then PCA to a few hundred dimensions, then a linear head is the standard extraction recipe for transcriptome models too.",
    terms: ["fine-tuning-vs-frozen", "embedding", "logistic-regression-term", "ridge-regression"] }),
  t({ id: "transfer-learning", name: "Transfer learning and the low-label regime", category: M, aka: ["transfer learning", "low-label regime", "few labels", "label-efficient", "data-efficient learning", "few-shot fine-tuning"],
    wikipedia: W("Transfer_learning"), cansim: "/terms/transfer-learning",
    tldr: "Transfer learning reuses what a model learned on one task or dataset to do better on a related task with few labels, the situation for almost every cancer outcome.",
    summary: "Transfer learning re-uses knowledge learned from a task to boost performance on a related task (Wikipedia). Its promise in oncology is the low-label regime: outcome labels number in the hundreds, so a model pretrained on unlabelled data should need fewer of them. The gain is largest with fifty to a few hundred labels and tends to vanish as labels grow, and it can be washed out entirely by widening the feature set, so claims should state the label count.",
    terms: ["self-supervised-pretraining", "fine-tuning-vs-frozen", "zero-shot"] }),
  t({ id: "zero-shot", name: "Zero-shot prediction", category: M, aka: ["zero-shot", "zero-shot prediction", "zero-shot learning", "zero-shot classification", "zero-shot embedding quality", "cluster purity"],
    wikipedia: W("Zero-shot_learning"), links: [{ label: "Wikipedia: cluster analysis", url: W("Cluster_analysis") }], cansim: "/terms/zero-shot",
    tldr: "Zero-shot prediction applies a model to a task or class it was never trained on, with no task-specific labels at all.",
    summary: "Zero-shot learning is the setting in which a model must predict classes it did not see in training (Wikipedia). For biology foundation models the zero-shot checks are whether embeddings cluster by tissue or subtype without labels (cluster purity, from cluster analysis) and whether a sequence model scores pathogenic variants above benign ones without being told which is which. A refuted zero-shot claim is still informative: it says the pretraining did not capture that biology.",
    terms: ["transfer-learning", "embedding", "variant-effect-prediction"] }),
  t({ id: "autoregressive-modelling", name: "Autoregressive (next-token) modelling", category: M, aka: ["autoregressive modelling", "autoregressive model", "next-token prediction", "next token prediction", "causal language modelling", "generative pretraining"],
    wikipedia: W("Autoregressive_model"), links: [{ label: "Wikipedia: large language model", url: W("Large_language_model") }], cansim: "/terms/autoregressive-modelling",
    tldr: "An autoregressive model predicts the next element of a sequence from the ones before it; trained on DNA it learns to continue a genome, which is how Evo 2 was built.",
    summary: "An autoregressive model expresses each output as a function of its own previous values (Wikipedia); large language models are trained this way on text to generate the next token (Wikipedia on LLMs). Genomic models such as Evo 2 and the Nucleotide Transformer apply it to nucleotide sequence at up to a million bases of context, and the likelihood the model assigns to a variant sequence is used as a zero-shot pathogenicity score. Generation and scoring are different uses, and success at one does not imply the other.",
    terms: ["transformer-architecture", "zero-shot", "variant-effect-prediction"], technologies: ["nucleotide-transformer", "evo2"] }),
  t({ id: "multimodal-fusion", name: "Multimodal fusion (early, late, modality dropout)", category: M, aka: ["multimodal fusion", "multimodal model", "multimodal learning", "modality fusion", "early fusion", "late fusion", "modality dropout", "attention masking over modalities", "missing modalities"],
    wikipedia: W("Multimodal_learning"), links: [{ label: "Wikipedia: dropout", url: W("Dropout_(neural_networks)") }, { label: "Chen et al., PORPOISE: pan-cancer integrative histology-genomic analysis via multimodal deep learning (Cancer Cell 2022)", url: DOI("10.1016/j.ccell.2022.07.004") }], cansim: "/terms/multimodal-fusion",
    tldr: "Multimodal fusion combines several kinds of data about one patient (slides, expression, mutations, clinical variables) in one model; modality dropout randomly hides modalities during training so the model still works when some are missing.",
    summary: "Multimodal learning integrates and processes multiple data types, or modalities, in one deep model (Wikipedia). Patient data is rarely complete, so fusion models mask absent modalities in attention and use modality dropout, an application of dropout regularisation (Wikipedia), to stay robust. PORPOISE fused histology and genomics for pan-cancer prognosis; the recurring finding is that when one modality (expression) already carries the signal, fusion adds little, and the honest test is each modality alone against the combination.",
    terms: ["transformer-architecture", "contrastive-learning", "ablation-study", "pca"] }),
  t({ id: "abmil", name: "Attention-based multiple-instance learning (ABMIL, CLAM)", category: M, aka: ["ABMIL", "attention-based MIL", "attention-based multiple instance learning", "multiple-instance learning", "multiple instance learning", "MIL", "CLAM", "attention pooling", "slide-level aggregation", "weakly supervised slide classification"],
    wikipedia: W("Multiple_instance_learning"), links: [{ label: "Ilse, Tomczak and Welling, Attention-based deep multiple instance learning (arXiv 2018)", url: ARXIV("1802.04712") }, { label: "Lu et al., CLAM (Nature Biomedical Engineering 2021)", url: DOI("10.1038/s41551-020-00682-w") }], cansim: "/terms/abmil",
    tldr: "Attention-based multiple-instance learning gives each tile of a slide a learned weight and sums the weighted tile vectors into one slide vector, so a slide-level label can train the model and the weights show which regions mattered.",
    summary: "In multiple-instance learning the learner receives labelled bags of instances rather than labelled instances (Wikipedia). Ilse, Tomczak and Welling proposed pooling the instances with a small attention network, and Lu and colleagues' CLAM applied it to whole-slide images with clustering constraints for data-efficient, weakly supervised pathology. It is the default slide encoder head over frozen tile embeddings, the interface most pathology pipelines expose, and its attention maps are read as heat maps of evidence.",
    terms: ["tile-patch-encoding", "transformer-architecture", "pathology-foundation-models"] }),
  t({ id: "pathology-foundation-models", name: "Pathology foundation models: UNI, UNI2, Virchow2, CTransPath, CONCH, TITAN", category: M, aka: ["UNI2", "UNI2-h", "Virchow2", "CTransPath", "TransPath", "pathology encoder", "tile encoder", "histopathology foundation model"],
    links: [{ label: "Chen et al., UNI: towards a general-purpose foundation model for computational pathology (Nature Medicine 2024)", url: DOI("10.1038/s41591-024-02857-3") }, { label: "UNI2-h on Hugging Face (MahmoodLab)", url: "https://huggingface.co/MahmoodLab/UNI2-h" }, { label: "Vorontsov et al., Virchow: a foundation model for clinical-grade computational pathology (Nature Medicine 2024)", url: DOI("10.1038/s41591-024-03141-0") }, { label: "Virchow2 on Hugging Face (Paige)", url: "https://huggingface.co/paige-ai/Virchow2" }, { label: "Wang et al., CTransPath: transformer-based unsupervised contrastive learning for histopathological image classification (Medical Image Analysis 2022)", url: DOI("10.1016/j.media.2022.102559") }, { label: "Lu et al., CONCH: a visual-language foundation model for computational pathology (Nature Medicine 2024)", url: DOI("10.1038/s41591-024-02856-4") }], cansim: "/terms/mahmood-lab",
    tldr: "Pathology foundation models are image encoders pretrained without labels on millions of slide tiles; UNI and CONCH come from the Mahmood Lab at Harvard, Virchow from Paige, and CTransPath was an early transformer version.",
    summary: "UNI, from Chen and colleagues, is a general-purpose self-supervised pathology encoder trained on over a hundred million tiles and evaluated across dozens of tasks; UNI2-h is its larger successor released on Hugging Face under a gated non-commercial licence. Virchow, from Vorontsov and colleagues at Paige, was trained on about 1.5 million slides for clinical-grade and rare cancer detection, with Virchow2 released the same way. CTransPath (Wang and colleagues, 2022) showed contrastive pretraining of a transformer for histology, and CONCH aligns tiles with pathology text; TITAN extends the family to whole slides and reports. Gated weights are open for research but not for products, which is why OnCo records their openness as gated.",
    terms: ["tile-patch-encoding", "abmil", "foundation-model", "open-weights"], technologies: ["pathology-foundation-model", "titan"], related: ["paige"] }),
  t({ id: "single-cell-foundation-models", wikipediaChecked: "2026-09-25", name: "Single-cell and transcriptome foundation models: UCE, GeneCompass, BulkFormer, BulkRNABert", category: M, aka: ["BulkFormer", "BulkRNABert", "GeneCompass", "UCE model", "Universal Cell Embeddings", "scFoundation model", "transcriptome foundation model", "bulk transcriptome model"],
    links: [{ label: "Rosen et al., Universal Cell Embeddings: a foundation model for cell biology (bioRxiv 2023)", url: DOI("10.1101/2023.11.28.568918") }, { label: "Yang et al., GeneCompass (Cell Research 2024)", url: DOI("10.1038/s41422-024-01034-y") }, { label: "Kang et al., BulkFormer: a large-scale foundation model for bulk transcriptomes (Cell Systems 2026)", url: DOI("10.1016/j.cels.2026.101657") }, { label: "Gélard et al., BulkRNABert: cancer prognosis from bulk RNA-seq based language models (bioRxiv 2024)", url: DOI("10.1101/2024.06.18.599483") }, { label: "BulkRNABert code (InstaDeep)", url: "https://github.com/instadeepai/multiomics-open-research" }], cansim: "/terms/bulkformer",
    tldr: "These are transformer models pretrained on expression profiles: UCE and GeneCompass on tens of millions of single cells, BulkFormer and BulkRNABert on bulk tumour and tissue transcriptomes.",
    summary: "Universal Cell Embeddings (Rosen and colleagues) is a 650-million-parameter cell model that represents genes by their ESM2 protein embeddings so it works across species; GeneCompass (Yang and colleagues) is a knowledge-informed model trained on over a hundred million human and mouse cells. Bulk-native models are fewer: BulkFormer (Kang and colleagues, Cell Systems 2026) is a 147-million-parameter model trained on about half a million bulk profiles and released with code and weights; BulkRNABert (Gélard and colleagues, InstaDeep) is a language model for bulk RNA-seq cancer prognosis under a research-only licence. Frozen bulk embeddings have not consistently beaten a genome-wide linear baseline on TCGA survival, so their value is still being established.",
    terms: ["foundation-model", "tokenisation", "fine-tuning-vs-frozen", "single-cell-rna-seq"], technologies: ["scfoundation", "nicheformer"], related: ["cellxgene-hca"] }),
  t({ id: "genomic-and-protein-language-models", wikipediaChecked: "2026-09-25", name: "Genomic and protein language models: Evo 2, Enformer, ESM", category: M, aka: ["protein language model", "protein language models", "ESM2", "ESM-2", "ESM-3", "Enformer", "genomic language model", "DNA language model", "Evo 2 model", "StripedHyena"],
    links: [{ label: "Lin et al., Evolutionary-scale prediction of atomic-level protein structure with a language model (ESM-2, Science 2023)", url: DOI("10.1126/science.ade2574") }, { label: "ESM on GitHub (facebookresearch/esm)", url: "https://github.com/facebookresearch/esm" }, { label: "Avsec et al., Enformer: effective gene expression prediction from sequence by integrating long-range interactions (Nature Methods 2021)", url: DOI("10.1038/s41592-021-01252-x") }], cansim: "/terms/evo-2",
    tldr: "Sequence models read DNA or protein letters the way language models read text: ESM predicts protein structure and function, Enformer predicts gene expression from DNA sequence, and Evo 2 models whole genomes with a million-base context.",
    summary: "ESM-2, from Lin and colleagues at Meta, is a protein language model whose embeddings predict atomic-level structure and are reused as gene tokens by cell models such as UCE. Enformer, from Avsec and colleagues at DeepMind, predicts expression and chromatin signals from 200 kilobases of DNA by combining convolutions with transformer attention. Evo 2 is a 40-billion-parameter genomic model on the StripedHyena 2 architecture with a one-million-base context; its zero-shot variant-effect claims are the kind of result that must be checked on clinical variant sets, and at least one independent check found them wanting.",
    terms: ["autoregressive-modelling", "tokenisation", "variant-effect-prediction", "zero-shot"], technologies: ["nucleotide-transformer", "evo2"] }),
  t({ id: "spagcn", wikipediaChecked: "2026-09-25", name: "Spatially aware clustering (SpaGCN, KNN smoothing)", category: M, aka: ["SpaGCN", "spatially aware clustering", "spatial clustering", "neighbour-smoothed PCA", "KNN neighbourhood smoothing", "KNN smoothing", "graph convolutional clustering"],
    links: [{ label: "Hu et al., SpaGCN: integrating gene expression, spatial location and histology to identify spatial domains (Nature Methods 2021)", url: DOI("10.1038/s41592-021-01255-8") }, { label: "SpaGCN on GitHub", url: "https://github.com/jianhuupenn/SpaGCN" }, { label: "Wikipedia: k-nearest neighbours", url: W("K-nearest_neighbors_algorithm") }, { label: "Wikipedia: k-means clustering", url: W("K-means_clustering") }], cansim: "/terms/spagcn",
    tldr: "Spatially aware clustering groups the spots of a tissue section into domains using both what they express and where they sit, so the domains are contiguous regions rather than scattered spots.",
    summary: "SpaGCN, from Hu and colleagues, uses a graph convolutional network over spots linked by spatial proximity and histology to identify spatial domains and their marker genes. Simpler versions average each spot with its k nearest neighbours (Wikipedia on k-NN) before principal components and k-means clustering (Wikipedia), which reduces the sparsity of spatial counts and yields coherent regions at the cost of blurring boundaries. Moran's I then tests whether the resulting labels or risk scores are spatially structured.",
    terms: ["spatial-autocorrelation", "pca", "spatial-transcriptomics-platforms"], technologies: ["spatial-transcriptomics"] }),
  t({ id: "virtual-cell-models", name: "Virtual cell models and in-silico perturbation screens", category: M, aka: ["virtual cell", "virtual cell model", "virtual cells", "in-silico perturbation", "in silico perturbation", "in-silico knockout screen", "in silico knockout", "perturbation prediction", "Virtual Cell Challenge", "CZI Virtual Cells", "OCTO-vc", "Noetik OCTO-VirtualCell"],
    wikipedia: W("Cellular_model"), links: [
  {
    "label": "Arc Institute Virtual Cell Challenge",
    "url": "https://virtualcellchallenge.org/"
  },
  {
    "label": "CZ Biohub AI-supported Virtual Cells platform",
    "url": "https://virtualcellmodels.cziscience.com/"
  },
  {
    "label": "Wikipedia: in silico",
    "url": "https://en.wikipedia.org/wiki/In_silico"
  },
  {
    "label": "Noetik",
    "url": "https://www.noetik.ai/"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cellular_model"
  },
  {
    "label": "Lotfollahi et al., scGen predicts single-cell perturbation responses (Nature Methods 2019)",
    "url": "https://doi.org/10.1038/s41592-019-0494-8"
  },
  {
    "label": "Ahlmann-Eltze et al., Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines (Nature Methods 2025)",
    "url": "https://doi.org/10.1038/s41592-025-02772-6"
  },
  {
    "label": "Bunne et al., How to build the virtual cell with artificial intelligence: Priorities and opportunities (Cell 2024)",
    "url": "https://doi.org/10.1016/j.cell.2024.11.015"
  }
], cansim: "/terms/virtual-cell",
    tldr: "A virtual cell is a computer model of specified aspects of cells. A predicted response is a model output whose accuracy must be tested against independent measurements.",
    summary: "A virtual cell is a computational model of specified aspects of cells. Its outputs and evaluation depend on the task, training data and model version. scGen combined variational autoencoders with latent-space vector arithmetic and was reported to model perturbation and infection responses across cell types, studies and species, having noted that generalisation to phenomena absent from training data had not previously been shown (Lotfollahi and colleagues, 2019). A 2025 benchmark found that none of five single-cell foundation models and two other deep-learning models predicted transcriptome changes after single or double gene perturbations better than deliberately simple baselines; for most genes the predictions of scGPT, UCE and scBERT did not vary across perturbations, and those of GEARS and scFoundation varied considerably less than the observed values (Ahlmann-Eltze and colleagues, 2025). An AI virtual cell is described as a multi-scale, multi-modal large neural network model in a perspective that sets priorities for accelerating discoveries and guiding experiments, not a validation (Bunne and colleagues, 2024).",
    terms: ["foundation-model", "mechanism-of-action-recovery", "single-cell-rna-seq"], related: ["noetik", "idea-data-open-cell-foundation-model"], technologies: ["crispr-screens"] ,
"notes": [
  "Reading guide (OnCo inference). The task defines what an output means: filling a missing RNA value from an image, estimating a drug response and predicting a gene-disruption response are different tasks, and success at one does not validate another. A virtual perturbation changes a model input and calculates an output; it is not a performed experiment, and masking a gene value is not the same as removing the gene's function. Predicted RNA is not measured RNA, protein activity or patient benefit. Agreement summarised across all genes can conceal poor prediction of the few genes that changed, so compare against simple baselines on the genes that moved. An association learned from untreated tissue does not by itself identify a causal drug effect. Whether a model's output supports treatment selection needs separate intended-use clinical evidence, whereas prioritising experiments is a lesser claim.",
  "Fictional worked example. A model accurately fills missing RNA values from images of familiar samples. That is measurement completion; it says nothing about a drug that was never tested. To claim a drug response, define the intervention and outcome, reserve independent measured experiments, and compare with baselines and the measured response.",
  "Fictional worked example. A model learns RNA responses to interventions in one cell line and correctly predicts additional cells exposed to a familiar intervention. That did not test a never-tested intervention in breast tumour cells; a reserved set of measured interventions and compatible breast-cell data would support a closer evaluation.",
  "Model card in words (a reading guide). Input and tissue cost: the measured data, preprocessing and missing inputs; computation uses data, while new data collection may consume tissue. Output: the predicted object with units, intervention, dose and time. Version and scope: model version, training population and intended task. Evaluation: what was held out, the baselines, error measures and external data. Failure modes: leakage, incompatible inputs, context shift or the wrong endpoint. Cannot establish alone: a performed perturbation, complete cell biology or better clinical outcomes.",
  "Figure reading (fictional teaching scene, light and dark renders agree): panel 1 fills a missing observation, where images paired with RNA from a defined population train a model that outputs a computed RNA value for a held-out donor and is tested against the masked measured value; panel 2 trains on measured responses to familiar X and forecasts withheld Y, tested later against a reserved measured response; panel 3 says a new donor tests donor generalisation, a new intervention tests intervention transfer, and neither automatically tests a new cell type. Computed is not measured, and the population, task and version stay attached."
],
"asOf": "2026-11-10"
}),

  // ---- Drug-response modelling ----
  t({ id: "drug-response-splits", wikipediaChecked: "2026-09-25", name: "Drug-response data splits: leave-cell-line-out, leave-drug-out, leave-tissue-out", category: M, aka: ["leave-cell-line-out", "LCO split", "leave-drug-out", "LDO split", "leave-tissue-out", "LTO split", "leave-pair-out", "random pair split", "cross-study validation"],
    links: [{ label: "Bernett et al., Critical evaluation of drug response prediction models with DrEval (Nature Communications 2026)", url: DOI("10.1038/s41467-026-72903-w") }], cansim: "/terms/leave-cell-line-out",
    tldr: "How a drug-response dataset is split decides what a model's accuracy means: hold out cell lines to test personalised prediction, hold out drugs to test drug design, hold out tissues to test repurposing; holding out random pairs only tests imputation.",
    summary: "Bernett and colleagues' DrEval framework evaluates drug-response prediction models under explicit protocols, holding out cell lines, drugs or tissues so that a model is scored on the generalisation it claims, and finds that many published gains shrink under the harder splits. Training on one screen and testing on another (cross-study validation) is the sternest bar because assays, cell-line panels and summary statistics differ. Random pair splits leak both the cell line and the drug into training and should only support imputation claims.",
    terms: ["data-leakage", "drug-response-baselines", "drug-response-sensitivity", "external-validation"] }),
  t({ id: "drug-response-baselines", name: "Drug-response baselines and frameworks: mean-drug floor, LightGBM, DrEval, IMPROVE, DeepTTA", category: M, aka: ["naive mean-drug baseline", "mean-cell-line baseline", "DrEval", "IMPROVE benchmark", "GraphDRP", "UNO model", "DeepTTA", "DeepCCDS", "LightGBM", "gradient-boosted trees"],
    wikipedia: W("LightGBM"), links: [{ label: "Bernett et al., DrEval (Nature Communications 2026)", url: DOI("10.1038/s41467-026-72903-w") }, { label: "IMPROVE project (Argonne and NCI) on GitHub", url: "https://github.com/JDACS4C-IMPROVE" }, { label: "Jiang et al., DeepTTA: a transformer-based model for predicting cancer drug response (Briefings in Bioinformatics 2022)", url: DOI("10.1093/bib/bbac100") }], cansim: "/terms/drug-response-frontier",
    tldr: "The floor for any drug-response model is predicting each drug's average effect across cell lines; tuned gradient-boosted trees such as LightGBM often tie or beat deep models under honest splits, which is why evaluation frameworks now exist.",
    summary: "LightGBM is Microsoft's free gradient-boosting framework based on decision trees (Wikipedia) and a common strong baseline. DrEval (Bernett and colleagues) and the IMPROVE project from Argonne and the NCI (with models such as UNO and GraphDRP) benchmark deep drug-response models against naive baselines under fixed protocols; the naive mean-drug predictor is hard to beat because most variance in a screen is between drugs, not between cell lines. Transformer models such as DeepTTA (Jiang and colleagues) report headline correlations that fall under leave-cell-line-out and cross-study splits.",
    terms: ["drug-response-splits", "ridge-regression", "spearman-correlation"] }),
  t({ id: "domain-adaptation", name: "Domain shift and domain adaptation (cell line to patient)", category: M, aka: ["domain shift", "distribution shift", "domain adaptation", "cell-line to patient transfer", "TUGDA", "Velodrome", "PRECISE", "TRANSACT", "train-test mismatch"],
    wikipedia: W("Domain_adaptation"), links: [{ label: "Peres da Silva et al., TUGDA: task uncertainty guided domain adaptation for robust generalization of cancer drug response prediction (Bioinformatics 2021)", url: DOI("10.1093/bioinformatics/btab299") }, { label: "Mourragui et al., PRECISE (Bioinformatics 2019)", url: DOI("10.1093/bioinformatics/btz372") }, { label: "Mourragui et al., TRANSACT (PNAS 2021)", url: DOI("10.1073/pnas.2106682118") }], cansim: "/terms/domain-adaptation",
    tldr: "Domain shift is the mismatch between the data a model was trained on and the data it meets later (cell lines versus tumours, one sequencing platform versus another); domain adaptation is the family of methods that try to bridge it.",
    summary: "Domain adaptation addresses training a model on one data distribution and applying it to a related but different one (Wikipedia). Cell-line screens are the training data for drug response but patients are the goal, so methods such as PRECISE and TRANSACT (Mourragui and colleagues) align the two distributions in a shared subspace and TUGDA (Peres da Silva and colleagues) weights tasks by their uncertainty during adaptation. Platform shift between RNA-seq and microarray is the same problem one level down.",
    terms: ["batch-effects", "ood-detection", "cell-lines-as-proxy", "external-validation"] }),
  t({ id: "mechanism-of-action-recovery", name: "Mechanism-of-action recovery and known-biology probes", category: M, aka: ["mechanism-of-action recovery", "MoA recovery", "recovers known biology", "known-biology probe", "known-biology probes", "biological sanity check", "responder versus non-responder biomarker"],
    wikipedia: W("Mechanism_of_action"), cansim: "/terms/moa-recovery",
    tldr: "A model that claims to have learned biology should, without being told, point at the known mechanism of a known drug or the known marker of a known cell type; recovering such known biology is an orthogonal check that a correlation is not an artefact.",
    summary: "A drug's mechanism of action is the specific biochemical interaction through which it produces its effect, usually naming its molecular target (Wikipedia). For a drug-response or perturbation model, ranking the MEK pathway genes first for a MEK inhibitor, or HER2 and its amplicon for trastuzumab, is a probe that costs nothing and catches models that learned tissue or batch instead. The same logic underlies tertiary lymphoid structures as a probe for spatial models and responder-versus-non-responder framing as the application that matters.",
    terms: ["virtual-cell-models", "tertiary-lymphoid-structures", "ablation-study"], pathways: ["ras-mapk"] ,
"notes": [
  "In the model-validation sense used in this record, recovering a known mechanism checks that a model has learned biology rather than an artefact; it does not show that the mechanism is clinically useful, and it is a different subject from the pharmacological meaning of a drug's mechanism of action."
],
"asOf": "2026-11-11"
}),

  // ---- Statistics and evaluation ----
  t({ id: "cross-validation", name: "Cross-validation and stratified k-fold", category: M, aka: ["cross-validation", "cross validation", "k-fold cross-validation", "5-fold cross-validation", "stratified k-fold", "stratified cross-validation", "nested cross-validation", "random seed"],
    wikipedia: W("Cross-validation_(statistics)"), links: [
  {
    "label": "Wikipedia: stratified sampling",
    "url": "https://en.wikipedia.org/wiki/Stratified_sampling"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cross-validation_(statistics)"
  },
  {
    "label": "Collins et al., TRIPOD+AI statement (BMJ 2024)",
    "url": "https://doi.org/10.1136/bmj-2023-078378"
  }
], cansim: "/terms/cross-validation",
    tldr: "Cross-validation repeatedly fits a model on part of the data and evaluates it on reserved data. Choices made using those results still belong to model development.",
    summary: "Cross-validation is a family of model validation techniques for assessing how a statistical analysis will generalise to independent data, using resampling and sample splitting (Wikipedia); stratifying the folds aims to preserve class proportions, subject to the available examples in each class. It estimates performance but is not a substitute for an external cohort, and every preprocessing step (scaling, PCA, feature selection) must be fitted inside the training fold or the estimate leaks. Reporting the seed makes the folds reproducible. If cross-validation is also used to choose settings, those choices belong to model development, so the same folds cannot also serve as the independent test; TRIPOD+AI defines internal validation (for example a train-test split or cross-validation) as evaluation within the population the model was developed on and asks that evaluation data stay distinct from data used for tuning.",
    terms: ["train-test-discipline", "data-leakage", "external-validation", "bootstrap"] ,
"asOf": "2026-11-10"
}),
  t({ id: "train-test-discipline", name: "Train, validation and test split discipline", category: M, aka: ["train/validation/test split", "training set", "validation set", "test set", "held-out test set", "held-out test split", "80/20 split", "hold-out set"],
    wikipedia: W("Training,_validation,_and_test_data_sets"), cansim: "/terms/train-validation-test",
    tldr: "Training data fit a model, validation data guide choices, and reserved evaluation data test the locked version. The split must match the intended population and prediction task. Choices made using evaluation results make those data part of model development.",
    summary: "Training data fit a model, validation data guide choices, and final evaluation data test the locked version. The split needs to match the intended claim; no single split proportion establishes validity. The TRIPOD+AI guidance defines evaluation data as data used to estimate model performance that are distinct from the data used to train the model, tune hyperparameters or select a model, with no overlap in participants (Collins and colleagues, 2024). It asks authors to describe the target population and intended purpose, and to define the outcome and its time horizon. Many cells or repeated wells from one donor are not many independent donors, so a new-donor test has to reserve whole donors across every fitting and tuning choice. Different holdouts answer different questions. In a 2025 benchmark, models were fitted on single perturbations plus 62 of 124 double perturbations and scored on the other 62 double perturbations, repeated over five random partitions, and the same study separately tested prediction of unseen single perturbations in CRISPR interference datasets (Ahlmann-Eltze and colleagues, 2025). Simple baselines, a no-change model and an additive model, were part of the comparison.",
    terms: [
  "cross-validation",
  "data-leakage",
  "external-validation",
  "pre-registered-experiment",
  "overfitting"
] ,
"notes": [
  "Evaluation card in words (a reading guide). Input and cost: the data, their provenance and the independent units; computation adds no tissue, but generating reference assays or outcomes has its own cost. Output and units: a named error or discrimination metric, calibration where relevant, uncertainty, and subgroup and failure denominators. Rule and threshold: the version, preprocessing and decision cutoff fixed before final evaluation, with no universal passing cutoff. Failure modes: leakage, overlap, a mismatched outcome, selective missing data or a changed population. Validation tier: task-specific performance evidence, with regulatory status and helpful clinical use as separate questions.",
  "Fictional worked example. A dataset holds cells from 20 donors, and each donor's cells are split between training and testing. Every one of the 20 donors was seen during fitting, so the result addresses a within-donor question and cannot establish performance on new donors; for that question whole donors must be reserved across fitting and tuning (for illustration 16 donors for development and 4 reserved, 16 + 4 = 20, with no recommended proportion).",
  "Fictional worked example. Withholding more cells exposed to intervention X does not show that the response to intervention Y can be predicted. For an unseen-intervention claim, Y's measured response must be absent from fitting and tuning, and the donor, batch and intervention relationships must be kept visible.",
  "Figure reading (fictional identities, light and dark renders agree): panel 1 keeps donors D1 and D2 on both sides, with new cells only; panel 2 fits on D1 and D2 and reserves D3 and D4, a new-donor question; panel 3 fits on use of intervention X and reserves the response to Y, which is absent from fitting and tuning. Donor and intervention splits ask different generalisation questions, and no panel claims performance."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets"
  },
  {
    "label": "Collins et al., TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods (BMJ 2024)",
    "url": "https://doi.org/10.1136/bmj-2023-078378"
  },
  {
    "label": "Ahlmann-Eltze et al., Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines (Nature Methods 2025)",
    "url": "https://doi.org/10.1038/s41592-025-02772-6"
  }
],
"asOf": "2026-11-10"
}),
  t({ id: "data-leakage", name: "Data leakage in model evaluation", category: M, aka: ["data leakage", "leakage", "train-test leakage", "cross-validation leakage", "leaky preprocessing", "fit on train fold only", "benchmark contamination", "test set contamination"],
    wikipedia: W("Leakage_(machine_learning)"), cansim: "/terms/cross-validation-leakage",
    tldr: "Leakage is when information from the test data reaches the model during training, through a scaler fitted on all samples, a patient split across folds or a benchmark that appeared in the pretraining set, making the model look better than it is.",
    summary: "In statistics and machine learning, leakage is the use of information during training that would not be available at prediction time, which produces overly optimistic performance estimates (Wikipedia). Common cancer-data forms are normalising or selecting genes on the full cohort before splitting, duplicated patients across TCGA and cBioPortal studies, and benchmark contamination, where a foundation model's pretraining corpus contained the public test set (TCGA slides or profiles), so that its downstream score is partly recall.",
    terms: ["cross-validation", "train-test-discipline", "batch-effects", "leaderboard-benchmark"] }),
  t({
    notes:["Follow the people behind a performance plot: eligibility, selection, care, sample quality, failures and missing outcomes. Identify every variable-selection, preprocessing and threshold choice and whether outcomes were known when those choices were made. Good performance on ideal specimens or the development patients may not describe practice. External evaluation uses data outside development, which can differ in hospital, calendar period, handling or care. The data and evaluation need to be independent of the tuning decisions; a new company logo supplies no such guarantee.","Two fictional slides illustrate the boundary. Slide A uses Hospital A patients and their known outcomes to select variables and a threshold, then reports performance on those same A patients. That is apparent performance; repeating the computation can check reproducibility without providing a new independent population test. Slide B fixes preprocessing, variables and threshold using A before applying the locked method to separate Hospital B patients. It reports B performance and the failed-test denominator, with no B outcomes fed back into tuning. This supports evaluation outside development, while suitable population, uncertainty, calibration and usefulness of clinical decisions remain separate questions. The patient icons are schematic and neither slide supplies a measured performance value.","Michiels and colleagues reanalysed the seven largest published microarray cancer-prognosis studies in their 2005 report using multiple random training and evaluation sets. They found unstable gene signatures and overoptimistic published estimates; five of the seven did not classify patients better than chance. That historical result supports retaining the entire selection and evaluation process, not a conclusion that every molecular model fails or that this one analysis establishes a universal validation method.","A model evaluated at a second hospital may still address advanced treated disease rather than the proposed postoperative use. Discrimination asks whether outcomes are ranked usefully; calibration asks whether stated probabilities agree with observed frequencies in comparable groups. Good ranking can coexist with inflated risk estimates, and good prognostic probabilities do not establish benefit from a treatment printed beside them. There is no single performance cutoff that makes every decision appropriate. If unchanged Hospital A samples are rerun, request an evaluation set held out from every tuning choice, a locked method, target population and outcome, all failure denominators and uncertainty. Internal resampling and independent external evaluation answer different performance questions; neither name alone is a clinical-use verdict."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/External_validity"},{"label":"Debray et al.: TRIPOD-Cluster explanation, development and evaluation (2023)","url":"https://doi.org/10.1136/bmj-2022-071058"},{"label":"Michiels et al.: repeated-split reanalysis of seven microarray prognosis studies (2005)","url":"https://doi.org/10.1016/S0140-6736(05)17866-0"}], asOf:"2026-11-12", id: "external-validation", name: "External validation", category: M, aka: ["external validation", "externally validated", "external cohort", "independent cohort", "independent validation", "external test set", "generalisability", "generalizability"],
    wikipedia: W("External_validity"), cansim: "/terms/external-validation",
    tldr: "External evaluation estimates model performance on data not used to develop or tune it. The patients, setting and methods determine which transportability question it addresses; it does not by itself establish useful clinical decisions.",
    summary: "External evaluation applies an existing model to data outside its development and compares predictions with observed outcomes. The TRIPOD-Cluster explanation includes later-period data collected by the same investigators as well as data from another hospital, country or care setting. A different platform is not a universal requirement. Apparent performance uses the development data and can be optimistic. Internal validation with resampling can estimate optimism and performance for new people from the same source population; it is evidence about a different question, rather than no result. External evaluation quantifies performance and its uncertainty instead of conferring a universal pass or fail. Keep the locked method, population, outcome, follow-up and differences from development visible.",
    terms: ["train-test-discipline", "domain-adaptation", "calibration", "analytical-vs-clinical-validation"], related: ["idea-tr2-ai-external-validation-registry", "idea-data-multisite-validation-precondition"] }),
  t({ id: "concordance-index", name: "C-index (concordance index), Harrell's and Uno's", category: M, aka: ["C-index", "concordance index", "Harrell's C-index", "Harrell's C", "Uno's C-index", "Uno's C", "C-statistic", "pooled C-index", "stratified C-index", "within-type C-index"],
    links: [
  {
    "label": "Harrell et al., Evaluating the yield of medical tests (JAMA 1982)",
    "url": "https://doi.org/10.1001/jama.1982.03320430047030"
  },
  {
    "label": "Uno et al., On the C-statistics for evaluating overall adequacy of risk prediction procedures with censored survival data (Statistics in Medicine 2011)",
    "url": "https://doi.org/10.1002/sim.4154"
  }
], cansim: "/terms/c-index",
    tldr: "A concordance measure checks whether predicted ordering agrees with observed outcome ordering. Survival versions must specify how follow-up and censoring are handled.",
    summary: "A survival C-index assesses whether a person predicted at higher risk experiences the event earlier in informative pairs. The estimand, follow-up horizon, handling of ties, comparable pairs and censoring assumptions matter. Harrell-style observed-pair estimates can depend on the censoring distribution. Uno and colleagues proposed a censoring-adjusted concordance estimator under stated assumptions. Neither version establishes calibrated probabilities or removes every source of follow-up bias.",
    terms: ["censoring-and-events", "calibration", "time-dependent-auc", "hazard-ratio", "organ-of-origin-signal"] ,
"notes": [
  "Uno's 2011 method targets concordance within a prespecified follow-up period. Its basic derivation assumes censoring is independent of event time and predictors. It weights usable event pairs by the inverse square of the estimated probability of remaining uncensored at the earlier event time; that probability is estimated from the censoring distribution. This is not a claim that any amount or cause of missing follow-up is repaired, or that censoring always biases an unadjusted C-index upward. State the estimator, horizon and assumptions with its uncertainty.",
  "Fictional survival scores predict earlier events at higher values. A has score 0.8 and an event at month 2; C has score 0.5 and an event at month 4, so their order is concordant. B has score 0.2 and is censored at month 1, leaving B's later event order relative to A or C unknown. B cannot be called event-free at month 4. Censoring does not automatically make a person a control, and a censored observation can still contribute to other informative comparisons when its timing permits."
],
"asOf": "2026-11-11"
}),
  t({ id: "calibration", name: "Calibration: reliability diagrams and the Brier score", category: M, aka: ["model calibration", "calibrated probabilities", "reliability diagram", "reliability diagrams", "calibration curve", "Brier score", "integrated Brier score", "IBS", "miscalibration", "bootstrap-calibrated reliability"],
    wikipedia: W("Calibration_(statistics)"), links: [
  {
    "label": "Wikipedia: Brier score",
    "url": "https://en.wikipedia.org/wiki/Brier_score"
  },
  {
    "label": "Graf et al., Assessment and comparison of prognostic classification schemes for survival data (Statistics in Medicine 1999)",
    "url": "https://doi.org/10.1002/(SICI)1097-0258(19990915/30)18:17/18<2529::AID-SIM274>3.0.CO;2-5"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Calibration_(statistics)"
  },
  {
    "label": "Calibration: the Achilles heel of predictive analytics.",
    "url": "https://doi.org/10.1186/s12916-019-1466-7"
  },
  {
    "label": "Evaluation of clinical prediction models (part 2): how to undertake an external validation study.",
    "url": "https://doi.org/10.1136/bmj-2023-074820"
  }
], cansim: "/terms/calibration",
    tldr: "Calibration checks whether predicted probabilities match observed frequencies for the same population, outcome and time horizon. Correct ranking or a correct overall average is insufficient.",
    summary: "Calibration compares predicted probabilities with observed outcome frequencies in a defined population and time horizon. A model can rank people well while overstating their risks. Calibration curves and suitable summaries assess agreement with uncertainty. The Brier score averages squared differences between predicted probabilities and individual binary outcomes; it assesses overall prediction error rather than calibration alone. Incomplete follow-up and competing events need methods matched to the predicted outcome.",
    terms: ["concordance-index", "roc-auc", "external-validation", "uncertainty-quantification"] ,
"notes": [
  "Compare predicted and observed frequencies across risk groups or a flexible calibration curve, with finite-sample uncertainty. Calibration-in-the-large compares the average prediction with the overall outcome rate. Under the named calibration model, slope below 1 suggests predictions that are too extreme and above 1 insufficient spread; intercept near 0 and slope near 1 still do not guarantee agreement everywhere on a flexible curve. A constant prediction can match average risk without ranking anyone. Conversely, high discrimination does not establish probability accuracy.",
  "Two fictional 100-person groups have complete five-year outcomes. Predicting 20 and 40 per cent when 10 and 30 events occur preserves their group order but predicts 60 events instead of 40. In a second independent example, predictions of 10 and 50 per cent with 20 and 40 events give 60 predicted and 60 observed overall, or 30 per cent of 200, while both group predictions remain wrong. These invented comparisons illustrate distinct failures; they do not forecast a particular patient's outcome.",
  "Retain predictions stored before outcomes, model and assay versions, endpoint, target population, treatment era and horizon. Compare frequencies at the same time using a calibration curve or named summary and uncertainty. Treating people censored before the horizon as event-free can mislead; account for incomplete follow-up and relevant competing events. Changed eligibility, care or baseline outcome frequency can change calibration, and an updated model needs evaluation. Checking only an overall average or displaying a narrow numerical range establishes little about model or input uncertainty. Calibration neither identifies which individual will have an event nor establishes benefit from acting on the model."
],
"asOf": "2026-11-11"
}),
  t({ id: "roc-auc", name: "ROC-AUC, PR-AUC and time-dependent AUC", category: M, aka: ["ROC-AUC", "AUROC", "ROC curve", "area under the ROC curve", "PR-AUC", "AUPRC", "precision-recall curve", "average precision", "time-dependent AUC", "AUC(t)"],
    wikipedia: W("Receiver_operating_characteristic"), links: [
  {
    "label": "Wikipedia: precision and recall",
    "url": "https://en.wikipedia.org/wiki/Precision_and_recall"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Receiver_operating_characteristic"
  },
  {
    "label": "The meaning and use of the area under a receiver operating characteristic (ROC) curve.",
    "url": "https://doi.org/10.1148/radiology.143.1.7063747"
  },
  {
    "label": "Receiver Operating Characteristic Curve in Diagnostic Test Assessment",
    "url": "https://doi.org/10.1097/JTO.0b013e3181ec173d"
  },
  {
    "label": "On the C-statistics for evaluating overall adequacy of risk prediction procedures with censored survival data.",
    "url": "https://doi.org/10.1002/sim.4154"
  },
  {
    "label": "Evaluation of clinical prediction models (part 2): how to undertake an external validation study.",
    "url": "https://doi.org/10.1136/bmj-2023-074820"
  },
  {
    "label": "FDA: statistical guidance for reporting diagnostic-test studies",
    "url": "https://www.fda.gov/media/71147/download"
  }
], cansim: "/terms/roc-auc-pr-auc",
    tldr: "ROC-AUC measures how a score orders cases and non-cases across thresholds. Ranking, calibrated probabilities and useful treatment decisions are separate questions.",
    summary: "A receiver operating characteristic curve plots sensitivity against one minus specificity across thresholds for a defined binary condition. Its area measures case versus non-case ranking; with the stated convention, tied scores receive half credit. An area of 0.5 represents chance ordering and 1 perfect ordering in those data. AUC is not the proportion of individual predictions that are correct, and it does not establish calibrated probabilities or a useful decision threshold.",
    terms: ["concordance-index", "calibration", "accuracy-f1", "biomarker"] ,
"notes": [
  "Fictional case scores are 0.9 and 0.6; non-case scores are 0.7 and 0.2. Three of four case/non-case pairs have the higher case score, giving AUC 0.75, also the area under the stepped ROC curve. Squaring these positive scores preserves their ordering and AUC while changing their numerical probability values. The example therefore separates ranking from calibration. Half-credit for tied scores is an explicit convention; an observed AUC is an estimate with uncertainty, not a personal prediction guarantee.",
  "Time-dependent AUC requires a named horizon, event-by-time cases, event-free controls and appropriate handling of incomplete follow-up. It is not interchangeable with a differently defined survival C-index. Evaluate locked predictions against reference outcomes on independent data, retain the estimator, uncertainty, case mix and censoring method, and examine relevant subgroups. Training-only performance and changed outcome definitions can mislead. Discrimination can change with population heterogeneity; it establishes neither calibrated risks, false-call consequences nor benefit from model-guided care.",
  "ROC-AUC and precision-recall area summarize different features. In a thought experiment that changes prevalence while holding the case and non-case score distributions fixed, sensitivity and specificity at each threshold, and thus the ROC curve, stay fixed while precision changes. Actual population shifts can change those conditional distributions too, so ROC-AUC is not universally immune to case mix. A precision-recall curve can be informative for rare positive outcomes without being a universally superior summary for every task.",
  "Not the pharmacokinetic AUC: in pharmacology 'AUC' also names the area under a drug concentration-time curve, a measure of exposure, which is unrelated to the area under a ROC or precision-recall curve (FDA clinical pharmacology labelling guidance lists AUC among exposure measures)."
],
"asOf": "2026-11-11"
}),
  t({ id: "accuracy-f1", name: "Accuracy, macro-F1 and confusion matrices", category: M, aka: ["accuracy metric", "macro-F1", "macro F1", "F1 score", "F-score", "F-measure", "confusion matrix", "balanced accuracy", "classification accuracy"],
    wikipedia: W("F-score"), links: [{ label: "Wikipedia: accuracy and precision", url: W("Accuracy_and_precision") }], cansim: "/terms/accuracy-macro-f1",
    tldr: "Accuracy is the share of predictions that were right; macro-F1 averages the F1 score of each class equally, so a model cannot look good by getting only the common cancer types right.",
    summary: "The F-score is a measure of predictive performance for binary classification calculated from precision and recall (Wikipedia). For a multi-class task such as cancer-type prediction, macro-F1 averages per-class F1 with equal weight, which exposes failures on rare classes that overall accuracy hides; a confusion matrix shows which classes are mixed up, often tissues of shared origin. Accuracy on a task saturated by an easy signal (tissue identity) leaves no room to show a new modality helps, a ceiling effect.",
    terms: ["roc-auc", "ablation-study", "organ-of-origin-signal"] }),
  t({ id: "time-dependent-auc", name: "Univariate Cox scores and time-dependent metrics", category: M, aka: ["univariate Cox", "univariate Cox score", "Cox z-score", "per-gene Cox", "Breslow approximation", "Breslow method for ties", "Cox partial likelihood", "proportional hazards assumption"],
    wikipedia: W("Proportional_hazards_model"), cansim: "/terms/univariate-cox-score",
    tldr: "A univariate Cox model fits one gene at a time against survival and its z-score ranks genes by prognostic strength; the Breslow approximation is how the fit handles patients whose events fall on the same day.",
    summary: "Proportional hazards models relate the time before an event to covariates, with each covariate's effect multiplying the hazard (Wikipedia). Fitting one gene at a time across twenty thousand genes gives a marginal prognostic score per gene, a common feature-selection step that must be done inside the training fold; tied event times are handled by the Breslow or Efron approximations to the partial likelihood. The model assumes hazards stay proportional over time, which many cancer covariates violate.",
    terms: ["hazard-ratio", "concordance-index", "censoring-and-events", "kaplan-meier-curve"] }),
  t({ id: "bootstrap", name: "Bootstrap resampling", category: M, aka: ["bootstrap", "bootstrap resampling", "bootstrapped confidence interval", "bootstrap confidence intervals", "resampling with replacement", "P10 to P90 spread"],
    wikipedia: W("Bootstrapping_(statistics)"), cansim: "/terms/bootstrap-resampling",
    tldr: "Bootstrapping refits a model or recomputes a statistic on many resamples of the data drawn with replacement, and the spread of the results is a confidence interval that needs no formula.",
    summary: "Bootstrapping estimates the distribution of an estimator by resampling the data, assigning measures of accuracy to sample estimates (Wikipedia). It gives confidence intervals for a C-index or AUC on a small test set, and, applied to one patient, the spread of predictions across bootstrap-refitted models is a per-prediction reliability signal: a prediction whose tenth-to-ninetieth percentile range is wider than an in-domain cutoff should be flagged rather than reported.",
    terms: ["cross-validation", "uncertainty-quantification", "permutation-test"] }),
  t({ id: "permutation-test", name: "Permutation test and the Mann-Whitney U test", category: M, aka: ["permutation test", "permutation p-value", "label shuffling", "shuffled labels", "Mann-Whitney U test", "Mann-Whitney test", "Wilcoxon rank-sum test", "rank-sum test", "non-parametric test"],
    wikipedia: W("Permutation_test"), links: [{ label: "Wikipedia: Mann-Whitney U test", url: W("Mann%E2%80%93Whitney_U_test") }], cansim: "/terms/permutation-test",
    tldr: "A permutation test builds the null distribution by shuffling labels (or spot positions) many times and asks how often chance does as well as the real result; the Mann-Whitney U test compares two groups by ranks without assuming a normal distribution.",
    summary: "A permutation test is an exact hypothesis test in which the null distribution of the statistic is obtained by recomputing it over rearrangements of the labels (Wikipedia). It gives p-values for Moran's I, for enrichment scores and for any model metric where the parametric distribution is unknown. The Mann-Whitney U test is the non-parametric test that randomly chosen values from two populations have the same distribution (Wikipedia), the default for comparing, say, predicted risk between responders and non-responders.",
    terms: ["spatial-autocorrelation", "bootstrap", "spearman-correlation"] }),
  t({ id: "spearman-correlation", name: "Spearman rank correlation", category: M, aka: ["Spearman correlation", "Spearman's rho", "Spearman rho", "rank correlation", "mean per-drug Spearman", "Pearson correlation"],
    wikipedia: W("Spearman's_rank_correlation_coefficient"), cansim: "/terms/spearman-correlation",
    tldr: "Spearman's rho measures how well the ranking of one variable matches the ranking of another, from minus one to plus one, ignoring the actual values.",
    summary: "Spearman's rank correlation coefficient indicates how strongly two sets of ranks are correlated (Wikipedia). Drug-response models report it per drug across cell lines (then average over drugs), and mRNA-protein concordance is reported as a per-gene Spearman across tumours; it is robust to outliers and to differences of scale between platforms, which is why it also serves as a cross-platform concordance check. A high mean correlation can hide drugs with none.",
    terms: ["drug-response-baselines", "mrna-protein-concordance", "permutation-test"] }),

  // ---- Classical models and preprocessing ----
  t({ id: "logistic-regression-term", name: "Logistic regression and nearest-centroid classifiers", category: M, aka: ["logistic regression", "logistic classifier", "nearest-centroid classifier", "nearest centroid", "centroid classifier", "PAM50 centroid correlation", "rank-based PAM50"],
    wikipedia: W("Logistic_regression"), links: [{ label: "Wikipedia: nearest centroid classifier", url: W("Nearest_centroid_classifier") }, { label: "Parker et al., Supervised risk predictor of breast cancer based on intrinsic subtypes (JCO 2009)", url: DOI("10.1200/JCO.2008.18.1370") }], cansim: "/terms/logistic-regression",
    tldr: "Logistic regression is the plain linear classifier used as a baseline for subtype prediction; a nearest-centroid classifier instead assigns each sample to the subtype whose average profile it most resembles, which is how PAM50 works.",
    summary: "Logistic regression models the log-odds of a binary outcome as a linear combination of inputs (Wikipedia); a nearest-centroid classifier assigns the label of the class whose mean (centroid) is closest (Wikipedia). Parker and colleagues' PAM50 predictor correlates a sample's fifty-gene profile with five subtype centroids, and using Spearman correlation on ranks makes it robust to platform, so the same classifier runs on microarray, RNA-seq and spatial pseudobulk. Deep models are compared against these because they often do no better.",
    terms: ["pam50", "linear-probe", "ridge-regression", "spearman-correlation"] }),
  t({ id: "ridge-regression", name: "Ridge regression and the multilayer perceptron", category: M, aka: ["ridge regression", "L2 regularisation", "L2-regularised regression", "ridge head", "multilayer perceptron", "MLP", "feedforward network", "MLP head"],
    wikipedia: W("Ridge_regression"), links: [{ label: "Wikipedia: multilayer perceptron", url: W("Multilayer_perceptron") }], cansim: "/terms/ridge-regression",
    tldr: "Ridge regression is linear regression with a penalty that shrinks coefficients, which keeps it stable when there are more genes than samples; a multilayer perceptron is the simplest neural network, a few fully connected layers.",
    summary: "Ridge regression estimates multiple-regression coefficients when the variables are highly correlated, by adding an L2 penalty (Wikipedia); with twenty thousand correlated genes and a few hundred samples it is the natural per-drug or per-outcome head on top of principal components. A multilayer perceptron is a feedforward network of fully connected layers with non-linear activations (Wikipedia), the usual encoder in autoencoders and the usual non-linear baseline; when it does not beat ridge, the non-linearity is not buying anything.",
    terms: ["linear-probe", "pca", "logistic-regression-term", "cross-entropy-mse"] }),
  t({ id: "pca", name: "Principal component analysis (PCA) as a feature compressor", category: M, aka: ["principal component analysis", "PCA", "principal components", "PCA-256", "PCA reduction", "separate-block PCA", "block-wise PCA", "dimensionality reduction"],
    wikipedia: W("Principal_component_analysis"), cansim: "/terms/pca",
    tldr: "PCA rotates the data onto the directions of greatest variance and keeps the top few, compressing twenty thousand genes into a few hundred numbers before a model sees them.",
    summary: "Principal component analysis is a linear dimensionality reduction technique used in exploratory analysis and preprocessing (Wikipedia). Reducing a full transcriptome to about 256 components before ridge or Cox regression is a strong, cheap baseline and the extraction recipe for frozen foundation-model embeddings; reducing each modality separately before concatenation stops a small block (a few hundred proteins) being swamped by a large one (all genes). The components must be fitted on the training fold only.",
    terms: ["ridge-regression", "embedding", "data-leakage", "ood-detection"] }),
  t({ id: "quantile-normalisation", name: "Quantile normalisation, rank transforms and z-scores", category: M, aka: ["quantile normalisation", "quantile normalization", "QN", "rank normalisation", "rank transform", "per-gene z-score", "z-score normalisation", "z-scoring", "standard score"],
    wikipedia: W("Quantile_normalization"), links: [{ label: "Wikipedia: standard score", url: W("Standard_score") }], cansim: "/terms/quantile-normalisation",
    tldr: "Quantile normalisation forces every sample's expression values onto the same distribution by rank, and a z-score expresses each gene as standard deviations from its mean; both are ways to make data from different platforms comparable.",
    summary: "Quantile normalisation makes two distributions identical in statistical properties by sorting both and replacing each value with the reference value of the same rank (Wikipedia); it can be applied to a single new sample against a fixed reference, which makes it usable at prediction time. A standard score is the number of standard deviations a value lies from the mean (Wikipedia), applied per gene it aligns RNA-seq and microarray means but needs a cohort to estimate. Both are the correctness backbone that lets a TCGA model read a METABRIC sample.",
    terms: ["batch-effects", "tpm-fpkm-counts", "microarray-expression", "domain-adaptation"] }),
  t({ id: "cross-entropy-mse", name: "Loss functions: cross-entropy and mean squared error", category: M, aka: ["cross-entropy", "cross-entropy loss", "mean squared error", "MSE loss", "reconstruction loss", "loss function", "training objective"],
    wikipedia: W("Cross-entropy"), links: [{ label: "Wikipedia: mean squared error", url: W("Mean_squared_error") }], cansim: "/terms/losses",
    tldr: "A loss function is the number training tries to make small: cross-entropy for classification (how surprised the model was by the true class) and mean squared error for regression and reconstruction (how far off the predicted values were).",
    summary: "Cross-entropy between two distributions measures the average number of bits needed to encode events from one using a code optimised for the other (Wikipedia); as a loss it penalises confident wrong class probabilities. Mean squared error is the average squared difference between estimates and true values (Wikipedia), the objective for predicting expression, drug sensitivity or reconstructing masked genes. Survival models use the Cox partial likelihood instead, which is why they are not interchangeable with regressors.",
    terms: ["masked-modelling", "ridge-regression", "time-dependent-auc"] }),
  t({ id: "ablation-study", name: "Ablation study and multi-task heads", category: M, aka: ["ablation study", "ablation studies", "ablation", "leave-one-modality-out", "multi-task learning", "multi-task heads", "task heads", "specialised task heads", "shared backbone"],
    wikipedia: W("Ablation_(artificial_intelligence)"), links: [{ label: "Wikipedia: multi-task learning", url: W("Multi-task_learning") }], cansim: "/terms/ablation-study",
    tldr: "An ablation removes one component or modality at a time and re-measures performance, which is the only way to know what each part contributes; multi-task heads let one shared backbone serve several outputs.",
    summary: "In machine learning, ablation is the removal of a component to determine its contribution to the system (Wikipedia). For a multimodal cancer model the ablation is per modality: drop mutations, copy number, protein or the pretrained encoder and see whether survival or drug-response accuracy moves. Multi-task learning solves several tasks at once through a shared representation with task-specific heads (Wikipedia), which is efficient but can let one easy task (cancer type) dominate the backbone.",
    terms: ["multimodal-fusion", "accuracy-f1", "mechanism-of-action-recovery"] }),

  // ---- Uncertainty and safety ----
  t({ id: "ood-detection", name: "Out-of-distribution detection (Mahalanobis guard)", category: M, aka: ["out-of-distribution", "OOD", "OOD detection", "out-of-distribution detection", "OOD guard", "Mahalanobis distance", "Mahalanobis guard", "ManifoldGuard", "off-manifold input", "refused prediction"],
    wikipedia: W("Anomaly_detection"), links: [{ label: "Wikipedia: Mahalanobis distance", url: W("Mahalanobis_distance") }], cansim: "/terms/ood-detection",
    tldr: "Out-of-distribution detection flags an input that does not look like anything the model was trained on, so the model can refuse to predict instead of guessing; the Mahalanobis distance from the training cloud is the simplest such guard.",
    summary: "Anomaly detection identifies rare items that deviate significantly from the majority of the data (Wikipedia). The Mahalanobis distance measures how far a point lies from a distribution, accounting for its covariance (Wikipedia); computed in PCA space against the training cohort it gives a threshold beyond which a sample (a new platform, a different tissue, a corrupted file) is declared off-manifold and the prediction withheld. Passing the guard is necessary, not sufficient: an in-distribution sample can still yield an unstable prediction.",
    terms: ["domain-adaptation", "uncertainty-quantification", "pca", "bootstrap"] }),
  t({ id: "uncertainty-quantification", name: "Uncertainty quantification and confidence gates", category: M, aka: ["uncertainty quantification", "UQ", "predictive uncertainty", "prediction uncertainty", "confidence gate", "confidence gates", "high, low or refused", "abstention", "selective prediction"],
    wikipedia: W("Uncertainty_quantification"), cansim: "/terms/uncertainty-quantification",
    tldr: "Uncertainty quantification attaches to each prediction an estimate of how much to trust it, so a system can report high confidence, low confidence or refuse.",
    summary: "Uncertainty quantification is the quantitative characterisation and estimation of uncertainties in computational and real-world applications (Wikipedia). For a clinical prediction the sources are whether the input is in distribution, how stable the prediction is under bootstrap refits, and how strong the underlying signal is; a shape that reports the prediction together with these gates lets a downstream reader (a clinician, or another program) act only on the confident ones. Conformal prediction is the version with a statistical guarantee.",
    terms: ["ood-detection", "conformal-prediction", "bootstrap", "calibration"] }),
  t({ id: "conformal-prediction", name: "Conformal prediction", category: M, aka: ["conformal prediction", "conformal inference", "conformal prediction sets", "prediction sets", "prediction intervals with coverage", "nonconformity score"],
    wikipedia: W("Conformal_prediction"), links: [{ label: "Angelopoulos and Bates, A gentle introduction to conformal prediction (arXiv 2021)", url: ARXIV("2107.07511") }], cansim: "/terms/conformal-prediction",
    tldr: "Conformal prediction wraps any model so that, instead of one answer, it returns a set or interval guaranteed to contain the truth a chosen fraction of the time (say 90 percent), assuming new patients resemble the calibration patients.",
    summary: "Conformal prediction produces statistically valid prediction regions for any underlying point predictor, assuming only exchangeability of the data, by computing nonconformity scores on labelled calibration data (Wikipedia). It turns a subtype classifier into one that may say luminal A or luminal B when unsure, with a coverage guarantee, and it makes the exchangeability assumption explicit, which domain shift violates. Angelopoulos and Bates give the standard introduction.",
    terms: ["uncertainty-quantification", "calibration", "ood-detection"] }),

  // ---- Reporting, reproducibility and open science ----
  t({ id: "model-card", wikipediaChecked: "2026-09-25", name: "Model cards and datasheets for datasets", category: M, aka: ["model card", "model cards", "datasheet for datasets", "datasheets for datasets", "dataset card", "dataset documentation", "intended use statement"],
    links: [{ label: "Mitchell et al., Model Cards for Model Reporting (arXiv 2018)", url: ARXIV("1810.03993") }, { label: "Gebru et al., Datasheets for Datasets (arXiv 2018)", url: ARXIV("1803.09010") }, { label: "Hugging Face Hub documentation", url: "https://huggingface.co/docs/hub/index" }], cansim: "/terms/model-card",
    tldr: "A model card is a short standard document shipped with a model stating what it was trained on, how it was evaluated, its intended use and its known failures; a datasheet does the same for a dataset.",
    summary: "Mitchell and colleagues proposed model cards as documentation accompanying trained models, covering intended use, evaluation across conditions and demographic groups, and ethical considerations; Gebru and colleagues proposed datasheets recording a dataset's motivation, composition, collection process and recommended uses. The Hugging Face Hub makes both the expected README of any model or dataset repository. For a cancer model the card is where the research-only notice, the cohorts, the splits and the external validation results belong.",
    terms: ["research-use-only", "reproducibility", "open-weights", "hugging-face-hub"] }),
  t({ id: "leaderboard-benchmark", name: "Benchmarks, leaderboards and contamination", category: M, aka: ["benchmark", "benchmarks", "benchmark dataset", "leaderboard", "leaderboards", "benchmark contamination", "public benchmark", "head-to-head comparison"],
    wikipedia: W("Benchmark_(computing)"), cansim: "/terms/leaderboard",
    tldr: "A benchmark is a fixed dataset and task on which models are compared, and a leaderboard ranks them; both mislead once the test data has been seen in training or the metric no longer tracks the goal.",
    summary: "A benchmark runs a standard set of tests to assess relative performance (Wikipedia). Cancer AI has few: TCGA tasks, drug-response splits from DrEval and IMPROVE, the Virtual Cell Challenge. Because TCGA slides and profiles are in the pretraining data of most foundation models, downstream TCGA scores are at risk of contamination, and leaderboard rank on a saturated task says little about clinical use. Publishing the exact split and seed is what makes a head-to-head comparison mean anything.",
    terms: ["data-leakage", "drug-response-baselines", "virtual-cell-models", "reproducibility"] }),
  t({ id: "reproducibility", name: "Reproducibility and negative results", category: M, aka: ["reproducibility", "reproducible research", "replicability", "negative result", "negative results", "null result", "honest negatives", "reporting negative results"],
    wikipedia: W("Reproducibility"), links: [{ label: "Wikipedia: null result", url: W("Null_result") }], cansim: "/terms/reproducibility",
    tldr: "A result is reproducible when someone else can get it again from the same data and code; a negative result is an experiment that did not show the hoped-for effect, and reporting it is how a field stops repeating dead ends.",
    summary: "Reproducibility, closely related to replicability, is a major principle of the scientific method: results should be achieved again with high reliability (Wikipedia). A null result is one without the expected content, which does not support the hypothesis (Wikipedia). In cancer AI the published record is skewed towards wins, so frozen-foundation-model results that fail to beat a baseline, panels that wash out a gain or pretraining at scale that adds nothing are worth recording as findings, with the seeds, versions and checksums that let them be rerun.",
    terms: ["provenance-fields", "pre-registered-experiment", "model-card", "leaderboard-benchmark"] }),
  t({ id: "pre-registered-experiment", name: "Pre-registered experiment", category: M, aka: ["pre-registered experiment", "pre-registration", "preregistration", "preregistered", "pre-specified success criterion", "registered report"],
    wikipedia: W("Preregistration_(science)"), cansim: "/terms/pre-registered-experiment",
    tldr: "Pre-registration means writing down the hypothesis, the analysis and the success criterion before running the experiment, so the result cannot be quietly redefined afterwards.",
    summary: "Preregistration is the practice of registering the hypotheses, methods or analyses of a study before it is conducted; clinical trial registration is the medical form and registered reports add peer review before data collection (Wikipedia). For a modelling experiment it means committing the split, the metric and the threshold that counts as success in advance, the same discipline trials apply to primary endpoints.",
    terms: ["train-test-discipline", "reproducibility", "trial-protocol"] }),
  t({ id: "open-weights", name: "Open weights, open code and gated models", category: M, aka: ["open weights", "open-weight model", "open-weights model", "gated weights", "gated model", "closed weights", "weights released", "open-source AI"],
    wikipedia: W("Open-source_artificial_intelligence"), cansim: "/terms/open-weights",
    tldr: "Open weights means a model's trained parameters are published so anyone can run and adapt it; that is less than open source, which also needs the training code and data, and more than gated weights, which require a request and a licence click.",
    summary: "Open-source AI, as the Open Source Initiative defines it, is an AI system freely available to use, study, modify and share, including its training data, code and parameters (Wikipedia). Most biology foundation models fall short of this: BulkFormer released weights and code under permissive terms; UNI2 and Virchow2 are gated on Hugging Face for non-commercial research; BulkRNABert is research-only; PLUTO and Med-Gemini released nothing. OnCo's open-source map records each project's openness level rather than treating open as one thing.",
    terms: ["open-licences", "hugging-face-hub", "model-card", "pathology-foundation-models"] }),
  t({ id: "open-licences", name: "Open licences: Apache-2.0, MIT and CC BY 4.0", category: M, aka: ["Apache-2.0", "Apache 2.0 licence", "Apache License 2.0", "MIT licence", "MIT License", "CC BY 4.0", "CC-BY-4.0", "Creative Commons Attribution 4.0", "CC BY-NC", "permissive licence", "open licence"],
    wikipedia: W("Apache_License"), links: [{ label: "Wikipedia: MIT License", url: W("MIT_License") }, { label: "Wikipedia: Creative Commons license", url: W("Creative_Commons_license") }], cansim: "/terms/licences",
    tldr: "MIT and Apache-2.0 are permissive software licences that let anyone use, change and redistribute code (Apache adds an explicit patent grant); CC BY 4.0 is the equivalent for data and text, requiring only attribution.",
    summary: "The Apache License is a permissive free-software licence from the Apache Software Foundation allowing use, modification and distribution for any purpose, with patent provisions (Wikipedia); the MIT License is shorter and puts few restrictions on reuse (Wikipedia). Creative Commons licences let authors grant the public rights to share and build on a work, with CC BY requiring attribution and the NC variants forbidding commercial use (Wikipedia). MSigDB, Visium demo data and DepMap releases are CC BY 4.0; BulkFormer's code is MIT; BulkRNABert's CC BY-NC-SA terms exclude products. OnCo's own content is CC BY-NC 4.0 and this term set is redistributed from a CC BY 4.0 source.",
    terms: ["open-weights", "zenodo-doi", "citation-cff"] }),
  t({ id: "hugging-face-hub", name: "Hugging Face Hub", category: M, aka: ["Hugging Face", "Hugging Face Hub", "HF Hub", "Hugging Face model repository", "huggingface.co"],
    wikipedia: W("Hugging_Face"), links: [{ label: "Hugging Face Hub documentation", url: "https://huggingface.co/docs/hub/index" }], cansim: "/terms/hugging-face-hub",
    tldr: "The Hugging Face Hub is the website where most machine-learning models and many datasets are published, with a model card, version history and, for gated models, an access request form.",
    summary: "Hugging Face develops tools for machine learning and its platform lets users share models and datasets (Wikipedia); the Hub documentation describes repositories for models, datasets and demo Spaces with git versioning, model cards and gating. Pathology encoders such as UNI2 and Virchow2 and many biology models are distributed there, so the Hub page is usually the citable record of a model's licence and release date.",
    terms: ["open-weights", "model-card", "zenodo-doi"] }),
  t({ id: "zenodo-doi", name: "Zenodo DOIs for data and code", category: M, aka: ["Zenodo", "Zenodo DOI", "Zenodo record", "DOI for a dataset", "data DOI", "software DOI", "persistent identifier"],
    wikipedia: W("Zenodo"), links: [{ label: "Wikipedia: digital object identifier", url: W("Digital_object_identifier") }, { label: "About Zenodo", url: "https://about.zenodo.org/" }], cansim: "/terms/zenodo-doi",
    tldr: "Zenodo is CERN's free open repository where researchers deposit datasets, code and papers and receive a permanent DOI for each version, so a result can cite exactly the files it used.",
    summary: "Zenodo is a general-purpose open repository developed under the European OpenAIRE programme and operated by CERN, which mints a persistent digital object identifier for each submission (Wikipedia); a DOI is a persistent identifier standardised by ISO (Wikipedia). Archiving a GitHub release to Zenodo gives code a citable, versioned DOI, and OnCo's open-source records note the first non-Zenodo DOI a README names so the paper and the archive are distinguished.",
    terms: ["citation-cff", "provenance-fields", "reproducibility"] }),
  t({ id: "citation-cff", wikipediaChecked: "2026-09-25", name: "CITATION.cff (Citation File Format)", category: M, aka: ["CITATION.cff", "Citation File Format", "citation file", "software citation metadata"],
    links: [{ label: "Citation File Format", url: "https://citation-file-format.github.io/" }, { label: "Wikipedia: Zenodo", url: W("Zenodo") }], cansim: "/terms/citation-cff",
    tldr: "CITATION.cff is a small file in a code repository that says, in a machine-readable way, how to cite the software; GitHub and Zenodo read it to generate citations.",
    summary: "The Citation File Format is a plain-text YAML format for software citation metadata (authors, title, version, DOI, licence) described at citation-file-format.github.io; GitHub shows a cite-this-repository button from it and Zenodo uses it when archiving a release (Wikipedia on Zenodo). It is the smallest step towards software being credited like papers, and a missing citation file is a sign a research codebase was never meant to be reused.",
    terms: ["zenodo-doi", "open-licences", "reproducibility"] }),

  // ---- Data formats and infrastructure ----
  t({ id: "anndata-h5ad", wikipediaChecked: "2026-09-25", name: "AnnData and h5ad files", category: M, aka: ["AnnData", "anndata", "h5ad", ".h5ad file", "annotated data matrix", "AnnData object"],
    links: [{ label: "anndata documentation", url: "https://anndata.readthedocs.io/en/stable/" }, { label: "Wikipedia: Hierarchical Data Format", url: W("Hierarchical_Data_Format") }], cansim: "/terms/anndata",
    tldr: "AnnData is the Python object, saved as an .h5ad file, that holds an expression matrix together with its per-cell and per-gene annotations; it is the lingua franca of single-cell analysis.",
    summary: "The anndata documentation describes an annotated data matrix: observations (cells or samples) by variables (genes), with data frames of metadata for each axis, unstructured metadata and layers, stored on disk in HDF5 as .h5ad. Scanpy, CELLxGENE and most single-cell foundation models read and write it, and bulk transcriptome models such as BulkFormer publish their TCGA matrices in the same format. OnCo lists anndata on the open-source map.",
    terms: ["hdf5-zarr-parquet", "single-cell-rna-seq"], related: ["cellxgene-hca"] }),
  t({ id: "hdf5-zarr-parquet", name: "Array and table formats: HDF5, Zarr, OME-Zarr, Parquet", category: M, aka: ["HDF5", "HDF5 file", "Zarr", "Zarr array", "OME-Zarr", "OME-NGFF", "Parquet", "Apache Parquet", "Parquet file", "columnar storage", "chunked array"],
    wikipedia: W("Hierarchical_Data_Format"), links: [{ label: "Wikipedia: Zarr", url: W("Zarr_(data_format)") }, { label: "OME-NGFF (OME-Zarr) specification", url: "https://ngff.openmicroscopy.org/latest/" }, { label: "Wikipedia: Apache Parquet", url: W("Apache_Parquet") }], cansim: "/terms/hdf5",
    tldr: "HDF5 and Zarr store large numerical arrays in chunks (Zarr is the cloud-friendly one, and OME-Zarr its bio-imaging profile for slide tiles); Parquet stores tables column by column for fast analytical queries.",
    summary: "Hierarchical Data Format is a set of file formats for storing and organising large amounts of data, maintained by The HDF Group (Wikipedia); ARCHS4 distributes its million-sample expression matrix as HDF5. Zarr is an open standard for chunked multidimensional arrays designed for random access in cloud storage (Wikipedia), and OME-NGFF, or OME-Zarr, is the Open Microscopy Environment's next-generation file format for bio-imaging, including whole-slide pyramids. Apache Parquet is a column-oriented storage format for analytical queries (Wikipedia), used for clinical and metadata tables in DuckDB or Spark.",
    terms: ["anndata-h5ad", "digital-pathology-wsi", "duckdb-catalog"] }),
  t({ id: "duckdb-catalog", name: "Analytical databases as a data catalogue (DuckDB, PostgreSQL)", category: M, aka: ["DuckDB", "PostgreSQL", "Postgres", "metadata catalogue", "data catalogue", "queryable metadata spine", "Patient to Specimen to Assay hierarchy"],
    wikipedia: W("DuckDB"), links: [{ label: "Wikipedia: PostgreSQL", url: W("PostgreSQL") }], cansim: "/terms/duckdb",
    tldr: "DuckDB is an in-process analytical database that queries Parquet files with SQL; PostgreSQL is the standard client-server database; either can hold the metadata spine that joins patients, specimens and assays.",
    summary: "DuckDB is an open-source column-oriented relational database designed for high performance on analytical queries in embedded configurations (Wikipedia); PostgreSQL is a free relational database emphasising extensibility and SQL compliance (Wikipedia). A research data layer typically keeps the large arrays in HDF5, Zarr or Parquet and a small catalogue in one of these, modelling the hierarchy patient to specimen to assay with provenance on every row so that a query can say which files went into a result.",
    terms: ["hdf5-zarr-parquet", "provenance-fields", "tcga-barcode"] }),
  t({ id: "mixed-precision-gpu", name: "GPU training and mixed precision", category: M, aka: ["mixed precision", "mixed-precision training", "bfloat16", "fp16 training", "GPU training", "A100", "H100", "CUDA", "MPS backend", "Apple silicon MPS"],
    wikipedia: W("Mixed-precision_arithmetic"), links: [{ label: "Wikipedia: deep learning", url: W("Deep_learning") }], cansim: "/terms/mixed-precision-gpu",
    tldr: "Foundation models are trained on graphics processors, and mixed precision stores most numbers in 16-bit floats to halve memory and double speed; a laptop-class chip can fine-tune small models but pretraining at scale waits for a data-centre GPU.",
    summary: "Mixed-precision arithmetic uses floating-point numbers of different widths in a single computation (Wikipedia); deep learning stacks many layers of artificial neurons and trains them on large data, which drives its hardware demand (Wikipedia). NVIDIA A100 and H100 cards through CUDA are the standard training hardware, Apple's Metal backend (MPS) runs smaller jobs on laptops, and a fine-tuning harness written on one and awaiting the other is a normal state for an academic project.",
    terms: ["foundation-model", "fine-tuning-vs-frozen"], technologies: ["ai-compute-platforms"] }),
  t({ id: "local-llm-reasoning-layer", name: "Local-only language models over patient data (privacy by architecture)", category: M, aka: ["local-only LLM", "on-device LLM", "on-device language model", "local language model", "egress guard", "egress guards", "cohort briefing", "LLM reasoning layer", "no-network inference"],
    wikipedia: W("Large_language_model"), links: [{ label: "Wikipedia: clinical decision support system", url: W("Clinical_decision_support_system") }], cansim: "/terms/local-only-patient-reasoning-layer",
    tldr: "Running an open language model on the same machine as a patient's data, with code that blocks any network call, lets a system explain model outputs in words without the data ever leaving the room.",
    summary: "A large language model is an AI model trained on vast text for generation and analysis (Wikipedia), and a clinical decision support system provides clinicians with knowledge and person-specific information in the workflow (Wikipedia). Cloud models cannot see identifiable patient data without agreements, so one design runs an open-weight model locally over a model's derived outputs only, with assertion-style guards that fail loudly if anything would be sent out or committed, and uses a cloud model only for cohort-level summaries of public findings. It is a privacy rule expressed as architecture, complementary to HIPAA and GDPR compliance.",
    terms: ["hipaa", "controlled-access-data", "uncertainty-quantification", "open-weights"] }),

];

// The hub term (terms-cansim-oncology.ts) lists every record of this file too, so none is an orphan.
{
  const hub = cansimOncologyTerms.find((x) => x.id === CANSIM_HUB)!;
  hub.terms = [...(hub.terms ?? []), ...cansimMethodsTerms.map((x) => x.id)];
}
