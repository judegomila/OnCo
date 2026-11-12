import type { TermInput } from "@/lib/schema";

/** Sequencing and RNA measurement concepts; source and field proofs live in the education audit ledger. */
export const educationMeasurementTerms: TermInput[] = [
  {
    "id": "hla-loh",
    "kind": "term",
    "name": "HLA loss of heterozygosity",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "Loss of an inherited HLA gene version can change which peptide-presenting molecules a tumour retains.",
    "summary": "Human leukocyte antigen molecules normally present peptides to immune cells. HLA loss of heterozygosity concerns which inherited DNA versions remain in the sampled tumour, separately from their expression or current peptide display.",
    "notes": [
      "HLA-A, HLA-B and HLA-C are on chromosome 6. HGNC places HLA-A at 6p22.1 and HLA-B and HLA-C at 6p21.33. One inherited version of each locus comes from each parent, giving up to six distinct classical class-I alleles. A segmental loss can affect several linked loci; total copy count alone does not identify which inherited versions remain.",
      "McGranahan et al. (2017): LOHHLA found HLA LOH in 36 of 90 (40%) TRACERx non-small-cell lung cancers; it used patient-specific HLA sequences with purity and ploidy; not a prevalence for every breast cancer.",
      "A loss may be present in one tumour population; normal and other tumour cells contribute reads; weak or indeterminate calls are not proof of retention; one region does not map every lesion.",
      "DNA loss, reduced allele-specific RNA, reduced surface protein and B2M functional loss are separate findings; B2M loss affects many alleles at once.",
      "A credible loss call asks which proposed targets depend on the lost allele and what supports presentation through retained alleles; it does not show all targets fail.",
      "Fictional teaching exercise: Loss of a maternal haplotype carrying A*X, B*Y, C*Z challenges peptides predicted for A*X and for B*Y; retention of paternal alleles does not itself prove display.",
      "Retain tumour/normal material, typing, named HLA alleles, usable reads, inferred allele copies, confidence, caller version and region sampled. DNA extraction uses material; computational reanalysis does not. Incorrect typing, difficult mapping and low tumour content can obscure loss. Coverage and statistical rules require workflow validation; neither a negative call nor retained DNA proves current display.",
      "The LOHHLA PCR validation selected 82 regions from 27 tumours predicted to have either all three loci affected by LOH or none. This selection does not establish how often a typical tumour region loses all three loci. The 36-of-90 result describes the separate NSCLC cohort analysis."
    ],
    "related": [
      "ngs",
      "hla"
    ],
    "links": [
      {
        "label": "Allele-Specific HLA Loss and Immune Escape in Lung Cancer Evolution.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29107330/"
      },
      {
        "label": "HGNC: HLA-A, HLA-B and HLA-C gene locations",
        "url": "https://www.genenames.org/tools/search/#!/?query=HLA-A%20OR%20HLA-B%20OR%20HLA-C"
      }
    ]
  },
  {
    "id": "sequencing-depth-and-coverage",
    "kind": "term",
    "name": "Sequencing depth and coverage",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "Depth counts sequence observations at a position; breadth describes how much of a target meets a stated depth.",
    "summary": "Depth is the number of aligned reads covering a base after stated filters; 40x means forty counted observations under those rules; depth without its counting rule is incomplete.",
    "notes": [
      "Depth is the number of aligned reads covering a base after stated filters; 40x means forty counted observations under those rules; depth without its counting rule is incomplete.",
      "Mean depth averages positions; coverage breadth is the fraction of a named target (denominator: target bases, not reads or cells) meeting a stated minimum depth; neither shows which important positions were missed.",
      "Fictional report: mean 100x, 900 of 1,000 target bases at or above an illustrative 20x criterion gives 90% breadth, while the position of interest has 4 usable observations; 20x is not a clinical cutoff.",
      "Read depth differs from molecular depth: overlapping pair ends and amplification copies inflate reads without adding independent fragments; HTSlib defaults are software definitions, not clinical validation criteria.",
      "More sequencing cannot recover a region absent from the library or create independent molecules from duplicates; library complexity, input, preservation, capture and alignment limit usable evidence.",
      "A negative report covers tested regions, detectable change classes and validated sensitivity; identical depths can support different detection limits; depth does not establish origin, function or actionability.",
      "A narrow panel can be deep and a genome broad but thinner per position; territory asks where, depth asks how many.",
      "Use an existing alignment file to calculate depth without consuming more tissue; recovering a more diverse library may require another aliquot. Retain reference regions, per-position counts, summary depth, breadth criterion and molecule-count rules. Capture bias, duplicate inflation and damaged input require controls and intended-use sensitivity/reproducibility validation; a summary criterion is separate from a detection limit."
    ],
    "related": [
      "ngs"
    ],
    "links": [
      {
        "label": "Guidelines for Validation of Next-Generation Sequencing-Based Oncology Panels: A Joint Consensus Recommendation of the Association for Molecular Pathology and College of American Pathologists.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28341590/"
      },
      {
        "label": "samtools depth counting rules",
        "url": "https://www.htslib.org/doc/samtools-depth.html"
      },
      {
        "label": "samtools coverage summary rules",
        "url": "https://www.htslib.org/doc/samtools-coverage.html"
      }
    ]
  },
  {
    "id": "sequencing-reads",
    "kind": "term",
    "name": "Sequencing reads",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "A sequencing read records base letters from prepared material, with estimates of their quality.",
    "summary": "A read is an instrument-derived base sequence from a prepared library molecule with per-base quality; library preparation can copy, shorten or select molecules before sequencing.",
    "notes": [
      "A read is an instrument-derived base sequence from a prepared library molecule with per-base quality; library preparation can copy, shorten or select molecules before sequencing.",
      "Phred quality: Q20 is an estimated 1% per-base error probability and Q30 0.1%; these are model-based base-call estimates, not the probability that a reported mutation is real; Q30 is a scale value, not a universal pass rule.",
      "Base quality (a letter) and mapping confidence (a location) are separate; repeats can make placement ambiguous; one read can have more than one proposed alignment record.",
      "Paired-end reads come from opposite ends of one fragment, so they are complementary placement evidence, not two independent molecules.",
      "Amplification copies one fragment many times; duplicate recognition or validated molecular tags assess independent support but do not repair errors introduced before tagging; in amplicon assays identical start and end coordinates cannot separate copies from independent molecules.",
      "Raw versus usable reads: filtering changes the denominator for downstream support; a read does not identify a cell, establish function or alone prove a somatic mutation.",
      "Record extraction and library preparation, specimen compatibility, read lengths, base qualities, pairs, alignment records and molecule-support rules. Preparation consumes material; reanalysis does not. Contamination, damaged molecules, adapters, amplification and mapping ambiguity affect support. Filter settings and Q30 are not universal clinical acceptance criteria; validate the complete specimen-to-report workflow."
    ],
    "related": [
      "ngs"
    ],
    "links": [
      {
        "label": "Guidelines for Validation of Next-Generation Sequencing-Based Oncology Panels: A Joint Consensus Recommendation of the Association for Molecular Pathology and College of American Pathologists.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28341590/"
      },
      {
        "label": "Base-calling of automated sequencer traces using phred. II. Error probabilities.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9521922/"
      },
      {
        "label": "SAM specification",
        "url": "https://samtools.github.io/hts-specs/SAMv1.pdf"
      }
    ]
  },
  {
    "id": "tumor-normal-vs-tumor-only-sequencing",
    "kind": "term",
    "name": "Tumor-normal versus tumor-only sequencing",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "Comparing tumour and suitable normal DNA helps distinguish acquired changes from inherited ones.",
    "summary": "A matched normal is a separately collected specimen from the same person chosen to represent constitutional DNA; normal is an analytical role, not a guarantee of uncomplicated cells; it differs from a healthy reference cohort.",
    "notes": [
      "A matched normal is a separately collected specimen from the same person chosen to represent constitutional DNA; normal is an analytical role, not a guarantee of uncomplicated cells; it differs from a healthy reference cohort.",
      "Evidence in the normal supports constitutional origin; adequate tumour and normal depth with no normal support supports somatic origin; inadequate normal depth leaves an attribution gap and absence there is uninformative.",
      "Tumour-only workflows infer origin from population databases, allele fractions and models; rare germline variants may be absent from databases; a hotspot or familiar gene does not prove tumour-only origin.",
      "In Jones et al. (2015), 815 tumour-normal pairs across 15 tumour types, germline changes in cancer-predisposing genes were found in 3% of patients with apparently sporadic cancers; tumour-only analysis could not definitively identify them and added false positives of 31% (targeted) and 65% (exome) of alterations.",
      "Origin does not establish function, hereditary-risk conclusions or drug benefit; paired research sequencing is not a validated hereditary test.",
      "Fictional teaching exercise: A tumour-only rare repair-gene variant at 48% allele fraction absent from databases cannot be labelled inherited or somatic from those facts; review copy state and attribution model.",
      "Retain specimen identity, suitable normal tissue, extraction consumption, reference coordinates, both support counts and fractions, attribution rules and uncertainty. Normal sampling need not require a second tumour biopsy. Mismatch, contamination, low normal coverage and rare constitutional variants can mislead; validate the intended somatic/germline workflow and confirmation policy separately."
    ],
    "related": [
      "ngs"
    ],
    "links": [
      {
        "label": "Personalized genomic analyses for cancer mutation discovery and interpretation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25877891/"
      },
      {
        "label": "Guidelines for Validation of Next-Generation Sequencing-Based Oncology Panels: A Joint Consensus Recommendation of the Association for Molecular Pathology and College of American Pathologists.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28341590/"
      }
    ]
  },
  {
    "id": "gene-expression-signatures",
    "kind": "term",
    "name": "Gene-expression signatures",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "An expression signature combines measured gene messages using a defined scoring method.",
    "summary": "A signature combines selected RNA measurements by a defined algorithm; preprocessing, weights, reference data and software version are part of the definition; a gene list alone is not a test.",
    "notes": [
      "A signature combines selected RNA measurements by a defined algorithm; preprocessing, weights, reference data and software version are part of the definition; a gene list alone is not a test.",
      "Pattern or module score, subtype classifier and outcome predictor answer different questions; performance belongs to a population, endpoint and horizon.",
      "The original PAM50 work used a defined 50-gene method for intrinsic subtypes and risk models and does not validate every later similar score.",
      "Seurat's AddModuleScore subtracts matched control-gene expression from the selected-gene mean; GSEA tests accumulation toward one end of a ranked list; outputs cannot share a cutoff.",
      "A clinical predictor needs a locked procedure; in the Venet et al. (2011) breast-cancer analysis, more than 90% of random signatures over 100 genes were significant outcome predictors, so association alone does not show the named biology matters.",
      "Analytical repeatability, clinical validity and clinical utility are separate questions.",
      "A bulk inflammatory signature can rise from more immune cells, changed state or both; a stress score does not establish protein activation, metabolic rate or dependence.",
      "Fictional teaching exercise: Replacing normalisation while retaining the old high cutoff is not validated; the old cutoff cannot supply missing validation.",
      "An expression score requires compatible RNA input, locked preprocessing, genes, weights, reference, endpoint/horizon and software version. Existing data can be rescored without new tissue; acquiring RNA consumes material. Report categories, ranks, probabilities or unitless scores on their exact scale. Missing genes, batch, mixture and population shift undermine cutoffs; analytical, clinical and utility evidence remain separate."
    ],
    "related": [
      "bulk-rna-seq"
    ],
    "links": [
      {
        "label": "Gene set enrichment analysis: a knowledge-based approach for interpreting genome-wide expression profiles.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16199517/"
      },
      {
        "label": "Supervised risk predictor of breast cancer based on intrinsic subtypes.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19204204/"
      },
      {
        "label": "Most random gene expression signatures are significantly associated with breast cancer outcome.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22028643/"
      },
      {
        "label": "Criteria for the use of omics-based predictors in clinical trials: explanation and elaboration.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24228635/"
      },
      {
        "label": "Seurat AddModuleScore definition",
        "url": "https://satijalab.org/seurat/reference/addmodulescore"
      }
    ]
  },
  {
    "id": "immune-deconvolution",
    "kind": "term",
    "name": "Immune deconvolution",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "Deconvolution estimates which cell populations contributed to a mixed molecular measurement.",
    "summary": "Deconvolution fits reference cell-type profiles to a mixed profile under a model; similar types, missing populations and state change allow several fits.",
    "notes": [
      "Deconvolution fits reference cell-type profiles to a mixed profile under a model; similar types, missing populations and state change allow several fits.",
      "The first quantity can be a share of RNA, not cells; EPIC uses RNA-content assumptions and an uncharacterised component.",
      "Relative estimates may sum to one across represented immune populations leaving total immune content unknown; CIBERSORT absolute mode is an expression-based score, not cells per area; other methods report whole-sample fractions.",
      "CIBERSORTx infers cell-type expression and states; these are computational reconstructions, not single-cell measurements, and do not prove suppressive function, clone or location.",
      "Compare with flow, pathology or spatial data, each with its own bias; validate for tissue, preparation, populations and units.",
      "Fictional teaching exercise: Sample A has 10 T cells among 20 immune cells and sample B 30 among 60 (100 cells each): both 50% of immune cells, but 10% and 30% of the whole sample.",
      "Existing mixture data and reference profiles support computation without further tissue; comparator assays may consume material. Record fit algorithm, reference, denominator, omitted populations and output as relative fraction, whole-sample estimate, abundance score or inferred expression. Runtime and fit filters vary; known mixtures, held-out data and matched measurements test assumptions. Similar signatures, RNA content, state and platform shifts prevent a global fit from certifying every population or clinical use."
    ],
    "related": [
      "bulk-rna-seq"
    ],
    "links": [
      {
        "label": "Robust enumeration of cell subsets from tissue expression profiles.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25822800/"
      },
      {
        "label": "Simultaneous enumeration of cancer and immune cell types from bulk tumor gene expression data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29130882/"
      },
      {
        "label": "Profiling Tumor Infiltrating Immune Cells with CIBERSORT.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29344893/"
      },
      {
        "label": "Determining cell type abundance and expression from bulk tissues with digital cytometry.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31061481/"
      }
    ]
  },
  {
    "id": "rna-pathway-scoring",
    "kind": "term",
    "name": "RNA pathway scoring",
    "category": "Genomics & genetics",
    "asOf": "2026-11-10",
    "tldr": "A pathway score summarises selected gene messages under a defined method and comparison scale.",
    "summary": "Inputs are expression data, a gene set and scoring rules; shared genes make pathway scores related; two numbers called pathway score are not necessarily comparable.",
    "notes": [
      "Inputs are expression data, a gene set and scoring rules; shared genes make pathway scores related; two numbers called pathway score are not necessarily comparable.",
      "ssGSEA compares rank distributions inside and outside a set within a sample, with optional scaling that can involve the supplied score collection; GSVA estimates each gene's distribution across supplied samples first, so changing the cohort changes the comparison; the GSVA package also implements ssGSEA.",
      "A score is commonly unitless and is not automatically a significance test or probability; a percentile ranks against a defined group, so the 90th percentile is not 90% activity.",
      "RNA scores do not directly measure protein, phosphorylation, flux or dependence; feedback can raise messages while output falls; a response classifier needs its own locked model.",
      "Fictional teaching exercise: Ranks A to E, set {A,C,E}: mean rank (1+3+5)/3=3; a teaching calculation, neither ssGSEA nor GSVA, and not an activity measure.",
      "The original GSEA framework evaluated ranked expression evidence in cohort comparisons; its output is not interchangeable with every per-sample score.",
      "Scoring existing RNA requires no additional tissue; functional tests may. Record gene IDs/set version, measured universe, input scale, parameters, algorithm and reference cohort. Report unitless scores, normalised scores or percentiles explicitly. Runtime and filters vary; replication and sensitivity to mixtures/missing genes test robustness. Overlapping sets, platform/composition shifts and changed cohorts constrain comparisons; activation and clinical cutoffs need separate validation."
    ],
    "related": [
      "bulk-rna-seq"
    ],
    "links": [
      {
        "label": "Gene set enrichment analysis: a knowledge-based approach for interpreting genome-wide expression profiles.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16199517/"
      },
      {
        "label": "GSVA: gene set variation analysis for microarray and RNA-seq data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23323831/"
      },
      {
        "label": "GSVA software vignette",
        "url": "https://bioconductor.org/packages/release/bioc/vignettes/GSVA/inst/doc/GSVA.html"
      }
    ]
  }
];
