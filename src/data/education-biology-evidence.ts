import type { TermInput } from "@/lib/schema";

/** General biology and measurement boundaries; sources are scoped per record. */
export const educationBiologyEvidence: TermInput[] = [
  {
    "id": "cell-lineage-and-state",
    "name": "Cell lineage, identity and state",
    "aka": [
      "cell lineage",
      "cell state",
      "lineage tracing",
      "cell ancestry"
    ],
    "tldr": "A cell’s ancestry, its type and its current activity answer different questions. Similar activity does not prove that two cells share a recent ancestor.",
    "summary": "Lineage describes descent from earlier cells. A cell type or identity describes a differentiated family, while a state describes context-dependent features such as activation, stress or cycling. A genetic clone has shared ancestry and can be tracked through specified genomic features; an RNA cluster alone does not establish that ancestry. Stem cells can renew and generate descendants; progenitor potential is restricted by the biological context. Differentiation develops specialized properties without requiring every change of state to become a new lineage.",
    "notes": [
      "Reference atlases classify measured features. Barcodes or other validated tracing information add ancestry evidence, with their own labeling and sampling limits. Weinreb and colleagues combined expressed barcodes and transcriptomes over time in hematopoiesis; sister-cell analyses exposed fate biases that a single RNA snapshot missed. This does not identify an individual tumor’s origin from its expression profile.",
      "Lim and colleagues studied normal and preneoplastic breast tissue from BRCA1 mutation carriers and found an expanded luminal-progenitor population. The expression profiles of BRCA1-associated tissue and basal breast tumours resembled normal luminal progenitors more than the other tested subsets. This supported a candidate population for transformation; it was not direct lineage tracing of an individual tumour. A luminal-progenitor-like RNA program does not by itself make a cancer hormone-receptor-positive.",
      "Support a malignant-cell assignment with tissue context, a coherent marker panel, suitable normal references and quality checks, rather than one marker or cluster name. In five primary glioblastomas, Patel and colleagues profiled 430 cells and inferred broad chromosome alterations by averaging RNA expression along chromosomes against normal reference profiles. This was RNA-based inference, not a direct DNA copy count or a breast diagnostic rule. A flat inferred profile can miss a malignant cell lacking a detectable broad change; focal alterations and point mutations can also be missed. Matched DNA, pathology and spatial evidence can corroborate an assignment, but bulk DNA does not identify every RNA barcode. Mixed markers may reflect ambient RNA or doublets. In another fictional mixed sample, vimentin RNA could come from fibroblasts or a changed cancer-cell programme. Even cell-attributed expression of that marker alone does not establish invasion, resistance or ancestry. Keep uncertain assignments uncertain.",
      "In a fictional set with separately established shared genetic ancestry, one cell is cycling and another is noncycling. Different activity labels do not require different ancestry. Conversely, two cells in the same RNA cluster need not belong to the same genetic clone. The origin of the ancestry label matters: expression resemblance alone does not establish it."
    ],
    "links": [
      {
        "label": "Lineage tracing on transcriptional landscapes links state to fate during differentiation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31974159/"
      },
      {
        "label": "NIGMS: stem cells and differentiation",
        "url": "https://www.nigms.nih.gov/biobeat/2024/11/what-are-stem-cells"
      },{"label":"Aberrant luminal progenitors as the candidate target population for basal tumor development in BRCA1 mutation carriers (Nature medicine 2009)","url":"https://doi.org/10.1038/nm.2000"},{"label":"Molecular characterization of basal-like and non-basal-like triple-negative breast cancer (The oncologist 2013)","url":"https://doi.org/10.1634/theoncologist.2012-0397"},{"label":"Single-cell RNA-seq highlights intratumoral heterogeneity in primary glioblastoma (Science (New York, N.Y.) 2014)","url":"https://doi.org/10.1126/science.1254257"},{"label":"SoupX removes ambient RNA contamination from droplet-based single-cell RNA sequencing data (GigaScience 2020)","url":"https://doi.org/10.1093/gigascience/giaa151"},{"label":"Guidelines and definitions for research on epithelial-mesenchymal transition (Nature reviews. Molecular cell biology 2020)","url":"https://doi.org/10.1038/s41580-020-0237-9"}],
    "related": [
      "differentiation",
      "clonal-evolution",
      "cell-cycle"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "epithelium-and-stroma",
    "name": "Epithelium, stroma and tissue compartments",
    "aka": [
      "epithelial tissue",
      "tissue compartments",
      "stromal compartment",
      "basement membrane"
    ],
    "tldr": "Tissue contains different cell groups and supporting material. Knowing which compartment produced a signal helps explain what the result can mean.",
    "summary": "Epithelium forms linings, coverings and glands; an epithelial cell is not necessarily malignant. A basement membrane is extracellular supporting material beneath an epithelium, distinct from each cell’s lipid membrane. Stroma includes supporting cells, extracellular matrix and vascular structures, rather than only collagen or fibroblasts. Immune cells and other nonmalignant cells can contribute to a tumor specimen. The relevant compartments depend on the tissue and disease.",
    "notes": ["Bulk RNA or protein measurements combine contributions from sampled cells. A stronger signal can reflect more cells of one type, changed expression within cells, or both. Spatial review and suitable cell markers help test attribution; a mixed-tissue result should not automatically be assigned to cancer cells. Normal and cancer breast atlases provide defined examples of this cellular diversity.","An epithelial marker helps identify a cell compartment; a positive lineage stain alone does not establish malignancy or invasion. Tissue architecture matters. For an epithelial carcinoma, assessing in-situ versus invasive disease includes microscopic review of the basement membrane and surrounding tissue. The SEER summary-stage manual retains site-specific exceptions; this boundary is not a universal staging rule for every cancer.","In a fictional comparison, gene R is high in cancer cells, low in fibroblasts and similarly high in normal luminal epithelial cells. The first contrast supports higher expression than fibroblasts, even if it passes a statistical threshold; it does not establish cancer selectivity. The normal epithelial comparison addresses that claim more closely, while leaving other organs, cell states and target accessibility untested. If that reference group is tiny, contaminated or prepared differently, preserve the unresolved comparison rather than declaring selectivity or exact equality. Normal epithelial cells can also contribute familiar lineage markers to a tumour specimen. An image-based tumour mask is an assignment that needs validation for its actual method and specimens, rather than automatic proof that every included cell is malignant."],
    "links": [{"label":"NCI SEER: epithelial organization and basement membrane","url":"https://training.seer.cancer.gov/anatomy/cells_tissues_membranes/tissues/epithelial.html"},{"label":"A spatially resolved single-cell genomic atlas of the adult human breast.","url":"https://pubmed.ncbi.nlm.nih.gov/37380767/"},{"label":"A single-cell and spatially resolved atlas of human breast cancers.","url":"https://pubmed.ncbi.nlm.nih.gov/34493872/"},{"label":"NCI SEER: Summary Stage 2018 manual v3.4, October 2026, in-situ and localized boundaries","url":"https://seer.cancer.gov/tools/ssm/Summary-Stage_v3.4.pdf"},{"label":"A spatially resolved single-cell genomic atlas of the adult human breast (Nature 2023)","url":"https://doi.org/10.1038/s41586-023-06252-9"},{"label":"NCI Dictionary: stroma","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/stroma"}],
    "related": [
      "cell-membrane",
      "carcinoma",
      "cell-composition-confound",
      "tumor-microenvironment"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "cellular-compartments",
    "name": "Organelles and cellular compartments",
    "aka": [
      "organelle",
      "organelles",
      "cellular compartment",
      "intracellular compartments"
    ],
    "tldr": "A cell has compartments with different jobs. A molecule inside one compartment may still be separated from the place where it needs to act.",
    "summary": "The nucleus houses most cellular DNA; mitochondria have their own genome and participate in energy metabolism and other processes. Ribosomes make polypeptide chains. The endoplasmic reticulum and Golgi process and sort selected membrane or secreted cargo, while lysosomes degrade delivered material in an acidic compartment. That itinerary is not the route of every protein. Cytosol is the fluid outside membrane-bound organelle interiors; cytoplasm includes cytosol and structures outside the nucleus. A vesicle lumen is not cytosol.",
    "notes": [
      "Endoplasmic reticulum and estrogen receptor are different meanings of ER; use the full name when context is unclear.",
      "Localization, colocalization, amount, interaction and function need different evidence. More or brighter organelle staining does not by itself measure the rate of material passing through a pathway.",
      "Mitochondria have roles beyond ATP production. Liu and colleagues used cell-free extracts and cytochrome-c depletion/add-back experiments to examine an apoptotic mechanism; this is a defined experimental result, not a universal measurement of cell death.",
      "Among cytosolic ribosomes, some are free and others sit on the cytosolic face of rough ER, outside its lumen. Consider one secreted protein: it enters the ER lumen during synthesis, travels through the lumens of transport vesicles and Golgi compartments, and can leave when a secretory vesicle fuses with the cell membrane. Movement within these membrane-enclosed spaces is not cytosolic escape. This selected route does not describe every protein; a compartment diagram alone does not measure transport, activity or treatment effect.",
      "A nucleus has an inner and an outer membrane, pores and DNA associated with proteins as chromatin. Rough endoplasmic reticulum forms a membrane network with a lumen; its membrane connects with the outer nuclear membrane. The Golgi consists of flattened membrane sacs, while a lysosome encloses material for breakdown. A mitochondrion has outer and inner membranes; folds of the inner membrane are cristae, and the matrix lies inside it. Its genome is distinct from nuclear chromatin. This general description is not an inventory of every human cell subtype, nor proof that DNA can never occur elsewhere."
    ],
    "links": [
      {
        "label": "OpenStax Biology 2e: 4-3-eukaryotic-cells",
        "url": "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells"
      },
      {
        "label": "OpenStax Biology 2e: 4-4-the-endomembrane-system-and-proteins",
        "url": "https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins"
      },
      {
        "label": "NHGRI: DNA in nuclei and mitochondria",
        "url": "https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet"
      },
      {
        "label": "Induction of apoptotic program in cell-free extracts: requirement for dATP and cytochrome c.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8689682/"
      },
      {"label":"Deolal and colleagues: nuclear envelope continuity with the endoplasmic reticulum (review, 2024)","url":"https://pubmed.ncbi.nlm.nih.gov/38238284/"}
    ],
    "related": [
      "cell-membrane",
      "nucleus",
      "protein",
      "apoptosis-bcl2"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "alleles-and-zygosity",
    "name": "Alleles, zygosity and copy state",
    "aka": [
      "allele",
      "zygosity",
      "heterozygous",
      "homozygous",
      "hemizygous",
      "allelic phase"
    ],
    "tldr": "An allele is a sequence version at a genomic location. Which versions are present and how many DNA copies exist are separate questions.",
    "summary": "At a diploid location, heterozygous means that the two copies differ in the feature being considered; homozygous means they match. Hemizygous describes a single copy in the specified context. Tumor gains, losses and genome doubling can make a two-copy model inadequate. Loss of heterozygosity means loss of previously different allelic information; it can accompany a deletion or occur while total copy count remains unchanged. Total copy number alone cannot identify which allele was retained.",
    "notes": [
      "Variant allele frequency counts supporting reads or molecules under the assay’s definition. Purity, local copy state, subclonal mixtures and method affect it; it is not directly a cancer-cell percentage or a zygosity call. Phase asks whether specified variants share a DNA copy, a further question that a gene-name match does not answer.",
      "Biallelic inactivation concerns whether either parental contribution still supplies useful function in the relevant cancer-cell population, rather than simply counting two physical DNA copies or two events somewhere in a tissue. A damaging change plus loss of the other contribution can support it, but phasing, allele-specific copy state, consequence and cell mixture matter. High VAF alone cannot establish this state. Nguyen and colleagues' pan-cancer analysis associated particular biallelic repair-gene alterations with genomic damage patterns; that association does not make every variant in every repair gene functionally equivalent or establish present drug sensitivity.",
      "A haplotype groups linked sequence variants on a chromosome that tend to be inherited together. Phasing assigns variants to chromosome copies; that is different from counting carrier cancer cells. Labels A and B distinguish sequence versions without grading either as harmful or harmless. In a fictional set of 100 cancer cells, two variants each present in forty cells could occupy the same forty or separate groups of forty. The two individual fractions do not reveal their overlap. Joint sequence or cell-resolved evidence addresses co-occurrence, with its own sampling limits. Neither shared prevalence nor physical phase alone establishes a variant's functional importance."
    ],
    "links": [
      {
        "label": "NHGRI: Allele",
        "url": "https://www.genome.gov/genetics-glossary/Allele"
      },
      {
        "label": "NHGRI: Heterozygous",
        "url": "https://www.genome.gov/genetics-glossary/Heterozygous"
      },
      {
        "label": "NHGRI: Homozygous",
        "url": "https://www.genome.gov/genetics-glossary/Homozygous"
      },
      {
        "label": "Allele-specific genomic data elucidate the role of somatic gain and copy-number neutral loss of heterozygosity in cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34731645/"
      },
      {
        "label": "Absolute quantification of somatic DNA alterations in human cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22544022/"
      },

  {"label":"Pan-cancer landscape of homologous recombination deficiency (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/33149131/"},{"label":"NHGRI: haplotype","url":"https://www.genome.gov/genetics-glossary/Haplotype"},{"label":"Absolute quantification of somatic DNA alterations in human cancer (Nature biotechnology 2012)","url":"https://doi.org/10.1038/nbt.2203"},{"label":"PyClone: statistical inference of clonal population structure in cancer (Nature methods 2014)","url":"https://doi.org/10.1038/nmeth.2883"}],
    "related": [
      "vaf",
      "gene-amplification",
      "copy-number-variation-term",
      "genome-wide-loss-of-heterozygosity",
      "germline-vs-somatic"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "epigenetic-marks",
    "name": "Epigenetic marks and DNA methylation",
    "aka": [
      "epigenetics",
      "DNA methylation",
      "5-methylcytosine",
      "5-hydroxymethylcytosine",
      "5mC",
      "5hmC",
      "histone modification"
    ],
    "tldr": "Chemical features of DNA and its packaging can influence how genes are used. Their location and cellular context matter; a mark does not have one universal effect.",
    "summary": "DNA methylation changes a base’s chemical state without substituting the underlying sequence letter. Much human methylation analysis concerns 5-methylcytosine at CpG sites. Histone modifications affect DNA-associated proteins and are distinct from marks on DNA itself. Some regulatory states persist through division; epigenetic does not mean every mark is permanent or transmitted between generations. Promoter methylation can participate in reduced transcription, while patterns elsewhere need their own interpretation.",
    "notes": [
      "Standard bisulfite analysis changes unmodified cytosine but reads both 5-methylcytosine and 5-hydroxymethylcytosine as C. Oxidative bisulfite methods separate those features through additional chemistry. Ordinary amplified DNA sequence does not preserve this direct chemical measurement.",
      "A methylation signal in mixed tissue is not a percentage of cancer cells with a silenced gene. Cell mixture, genomic location, conversion controls and method resolution matter. Association with low RNA does not establish causation or treatment sensitivity.",
      "In an invented sequence example, AACGT can carry a methyl group on its C while the underlying base order remains AACGT. Replacing that C with T instead gives AATGT, a different underlying DNA sequence. Changing a chemical mark on a histone protein is different again. Keep that biological comparison separate from an assay that chemically converts bases: standard bisulfite treatment can change the readout without establishing that the original DNA carried a C-to-T variant. Read the conversion chemistry, locus and cell context before interpreting a methylation call."
    ],
    "links": [
      {
        "label": "NHGRI: epigenomics",
        "url": "https://www.genome.gov/about-genomics/fact-sheets/Epigenomics-Fact-Sheet"
      },
      {
        "label": "Human DNA methylomes at base resolution show widespread epigenomic differences.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19829295/"
      },
      {
        "label": "A genomic sequencing protocol that yields a positive display of 5-methylcytosine residues in individual DNA strands.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1542678/"
      },
      {
        "label": "Oxidative bisulfite sequencing of 5-methylcytosine and 5-hydroxymethylcytosine.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24008380/"
      }
    ],
    "related": [
      "epigenetic-reprogramming",
      "methylation-profiling",
      "methylation-arrays",
      "gene-expression",
      "histone-lactylation"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "nonsense-mediated-decay",
    "name": "Nonsense-mediated RNA decay",
    "aka": [
      "nonsense-mediated decay",
      "NMD"
    ],
    "tldr": "A cell can reduce some RNA messages when translation stops in an unexpected context. A predicted early stop does not guarantee that every message or protein disappears.",
    "summary": "Nonsense-mediated decay is RNA surveillance coupled to translation termination. Splicing can leave exon junction protein complexes near later joins in the message. Translation can remove junction-associated proteins; early termination while an appropriate complex remains downstream can help recruit decay machinery in one human route. Stop position, exon architecture, proximity to the start and other transcript features affect susceptibility. A common junction-distance shortcut is a hypothesis, not a universal clinical cutoff.",
    "notes": ["Human-cancer analyses found that a model containing several rules described RNA effects better than the junction rule alone; compensation could mask loss at gene level. Test the relevant transcript or allele with controls for RNA quality and cell mixture. Protein identity, persistence and function need separate measurements: RNA decay is distinct from protein degradation.","Candidate selection should reconstruct the affected transcript and translated sequence. A stop-gain terminates translation rather than adding a new amino acid; an unchanged upstream sequence alone does not specify a new mutant peptide. A frameshift can instead create an altered tail before stopping. Litchfield and colleagues found expressed frameshift changes enriched in positions predicted to escape decay and reported associations with checkpoint outcomes in melanoma cohorts, with additional immune-reactivity evidence from vaccine studies. These are context-specific findings, not a rule that every frameshift is expressed, displayed or useful. Mutant RNA and downstream presentation and recognition remain separate questions.",
      "Consider a hypothetical message after splicing: its retained exons are joined in one continuous RNA, without an intron at each join. A translating ribosome has passed an earlier join but stops before a later one. An exon junction complex retained upstream of that later join is downstream of the stop and can support the junction-dependent surveillance route. Removing junction-associated proteins during translation is different from removing introns during splicing. In a second hypothetical message the stop lies in the final exon, with no downstream complex specified. That description alone does not measure RNA stability, exclude other decay mechanisms or demonstrate a normal protein. The positions are context for a hypothesis, not a universal distance threshold."],
    "links": [{"label":"The exon-exon junction complex provides a binding platform for factors involved in mRNA export and nonsense-mediated mRNA decay.","url":"https://pubmed.ncbi.nlm.nih.gov/11532962/"},{"label":"Translation is required to remove Y14 from mRNAs in the cytoplasm.","url":"https://pubmed.ncbi.nlm.nih.gov/12121612/"},{"label":"Intron function in the nonsense-mediated decay of beta-globin mRNA: indications that pre-mRNA splicing in the nucleus can influence mRNA translation in the cytoplasm.","url":"https://pubmed.ncbi.nlm.nih.gov/9671053/"},{"label":"The rules and impact of nonsense-mediated mRNA decay in human cancers.","url":"https://pubmed.ncbi.nlm.nih.gov/27618451/"},{"label":"Litchfield et al.: frameshift expression, decay escape and immune evidence (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/32733040/"}],
    "related": [
      "rna",
      "rna-splicing",
      "mutation",
      "gene-expression",
      "protein"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "vdj-recombination",
    "name": "V(D)J recombination and receptor assembly",
    "aka": [
      "V(D)J recombination",
      "VDJ recombination",
      "VJ recombination",
      "RAG-mediated recombination"
    ],
    "tldr": "Developing lymphocytes assemble receptor genes from selected DNA segments. Making a receptor is separate from showing what it recognizes or whether it produces a useful response.",
    "summary": "Variable, diversity and joining segments provide the V, D and J names. Antibody heavy and conventional T-cell-receptor beta chains use VDJ arrangements; antibody light and T-cell-receptor alpha chains use VJ. RAG1/RAG2 recognize recombination signals and initiate DNA cutting; classical non-homologous end-joining repair machinery processes and joins coding ends, adding sequence diversity. Purified-protein cutting experiments and RAG1-deficient mouse experiments established distinct mechanistic requirements. RAG proteins are not the general repair machinery for every DNA break.",
    "notes": ["Rearrangement occurs in developing lymphocyte lineages, rather than changing receptor genes in every body cell. Some joins are unproductive; expression and developmental selection are further steps. Later antibody mutation and class switching are different processes.","Receptor sequence or clonality does not establish antigen specificity, tumor recognition or malignant diagnosis. RAG RNA/protein presence alone does not establish active recombination.","Off-target RAG rearrangement must be interpreted in its cellular and sequence context. In the 2014 ETV6-RUNX1 acute lymphoblastic leukemia study, the authors found breakpoint recombination-signal motifs, junctional additions and enrichment at active B-development promoters and enhancers; single-cell analysis supported continuing rearrangement in the examined leukemias. This is evidence from that disease context, not a demonstration that RAG expression in any sampled cell proves active cutting or the same mechanism.","Different rearrangement paths can produce the same receptor amino-acid sequence. Influenza-specific mouse TCR-beta analysis and a separate human naive/memory CD8 T-cell study support convergent recombination and receptor sharing. The human study sampled four individuals; neither study establishes an individual cancer response. A shared receptor sequence or an expanded sequence count alone does not establish unique recent ancestry, antigen specificity or tumor killing.",
      "Receptor-gene joining, expression, developmental selection and response by mature lymphocytes are separate questions. In T-cell development, selection involves recognition of self peptides bound to MHC in the thymus; describing gene assembly as preceding a later antigen-driven response must not imply that development is free of antigen interactions. Choosing V2, D1 and J3 in an invented example states a selected rearrangement, not an observed segment count or a receptor deliberately built for an encountered antigen. A RAG variant in mixed tissue does not establish active receptor rearrangement in epithelial cells."],
    "links": [{"label":"Cleavage at a V(D)J recombination signal requires only RAG1 and RAG2 proteins and occurs in two steps.","url":"https://pubmed.ncbi.nlm.nih.gov/8521468/"},{"label":"RAG-1-deficient mice have no mature B and T lymphocytes.","url":"https://pubmed.ncbi.nlm.nih.gov/1547488/"},{"label":"Immunoglobulin and T Cell Receptor Genes: IMGT(®) and the Birth and Rise of Immunoinformatics.","url":"https://pubmed.ncbi.nlm.nih.gov/24600447/"},{"label":"EuroClonality/BIOMED-2 guidelines for interpretation and reporting of Ig/TCR clonality testing in suspected lymphoproliferations.","url":"https://pubmed.ncbi.nlm.nih.gov/22918122/"},{"label":"Arnal and colleagues: RAG post-cleavage complexes and repair-pathway access","url":"https://pubmed.ncbi.nlm.nih.gov/20139091/"},{"label":"Papaemmanuil and colleagues: RAG-associated rearrangement in ETV6-RUNX1 ALL","url":"https://pubmed.ncbi.nlm.nih.gov/24413735/"},{"label":"Venturi and colleagues: convergent recombination in influenza-specific mouse TCR-beta responses","url":"https://pubmed.ncbi.nlm.nih.gov/17130450/"},{"label":"Venturi and colleagues: human naive/memory CD8 TCR sharing, four individuals","url":"https://pubmed.ncbi.nlm.nih.gov/21383244/"},{"label":"Klein and colleagues: selection of developing T cells by self peptide and MHC complexes (review, 2014)","url":"https://pubmed.ncbi.nlm.nih.gov/24830344/"}],
    "related": [
      "clonality-testing",
      "ig-tcr-clonality",
      "receptor",
      "gene",
      "germinal-centre-reaction"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "protein-structure-and-domains",
    "name": "Protein structure, domains and model confidence",
    "aka": [
      "protein structure",
      "protein domain",
      "protein motif",
      "protein interface",
      "intrinsically disordered region",
      "pLDDT",
      "predicted aligned error",
      "PAE"
    ],
    "tldr": "A protein’s sequence, folded regions and contacts describe different features. A confident prediction of one region does not establish the whole molecule’s arrangement or function.",
    "summary": "Primary structure describes sequence; secondary structure describes local arrangements; tertiary structure describes a chain’s organization; quaternary structure describes assembly between chains. These are levels of description, rather than four obligatory stages. A domain is a recognizable structural unit; a motif is a recurring sequence or structural pattern. An interface is a contact surface and can combine residues far apart in sequence. Intrinsically disordered regions can have normal functions without one stable isolated fold.",
    "notes": ["Experimental structures reflect particular preparations and conditions, and may omit flexible regions. In AlphaFold2, pLDDT concerns local structural confidence, while predicted aligned error helps assess uncertainty in relative region placement. A confident domain cannot certify a proposed inter-domain pocket or contact. Neither score measures binding affinity, protein abundance, a variant’s functional effect or clinical benefit.","X-ray crystallography interprets diffraction from crystals; crystallization and flexible regions constrain what can be resolved. NMR uses signals and spatial restraints, often in solution, and can report an ensemble of compatible structures. Single-particle cryo-electron microscopy combines many projections of particles preserved in ice into a three-dimensional map. Each route requires preparation, experimental data and model interpretation. Check the method, local support, missing regions and validation of the actual structure; an atomic-looking model is not a direct photograph of every molecular state or proof of binding or function.",
      "Consider one invented chain with two domains joined by one linker. Two candidate arrangements can preserve both local folds yet create different gaps between the domains. A proposed interdomain pocket belongs to that joint geometry; a confident domain alone does not establish it. Alternative pictures do not demonstrate molecular motion or disorder. The cartoon supplies neither measured coordinates nor ligand binding, affinity or activity."],
    "links": [{"label":"EMBL-EBI: domains, motifs and disorder","url":"https://www.ebi.ac.uk/training/online/courses/proteins-domains/domains-motifs-and-regions/"},{"label":"EMBL-EBI: AlphaFold2 confidence measures","url":"https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/"},{"label":"OpenStax Biology 2e: 3-4-proteins","url":"https://openstax.org/books/biology-2e/pages/3-4-proteins"},{"label":"EMBL-EBI: pLDDT local confidence","url":"https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/plddt-understanding-local-confidence/"},{"label":"EMBL-EBI: PAE and relative-region uncertainty","url":"https://www.ebi.ac.uk/training/online/courses/alphafold/inputs-and-outputs/evaluating-alphafolds-predicted-structures-using-confidence-scores/pae-a-measure-of-global-confidence-in-alphafold-predictions/"},{"label":"RCSB PDB-101: experimental structure methods and their preparation, data and model limits","url":"https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/methods-for-determining-structure"}],
    "related": [
      "protein",
      "structural-biology-infrastructure",
      "binding-affinity-and-kinetics"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "binding-affinity-and-kinetics",
    "name": "Binding affinity, occupancy and enzyme kinetics",
    "aka": [
      "binding affinity",
      "dissociation constant",
      "Kd",
      "receptor occupancy",
      "Michaelis constant",
      "Km",
      "enzyme turnover"
    ],
    "tldr": "Binding strength, the fraction of sites occupied and the speed of a reaction describe different things. Each measurement needs its experimental conditions.",
    "summary": "For a simple reversible binding equilibrium, Kd is the product of free partner concentrations divided by complex concentration; lower Kd means tighter binding under those conditions. For identical independent sites with one ligand and no competition, fractional occupancy is L / (Kd + L), where L is free ligand concentration. Half occupancy occurs at L = Kd in that model. Total added ligand need not equal free ligand. Affinity for one partner does not establish specificity against other partners.",
    "notes": [
      "For a suitable Michaelis-Menten enzyme model, Km is the substrate concentration at half the maximum initial reaction rate. It depends on the catalytic mechanism and conditions and is not generally Kd. Turnover concerns reaction cycling, not binding strength.",
      "IC50 is half inhibition of a specified assay response; EC50 describes half of a defined functional response change. Substrate/ATP concentrations, enzyme or receptor amount, timing and assay design affect these measures. A biochemical inhibition value, a cell-growth value and a clinical outcome are separate evidence.",
      "In a fictional one-site equilibrium example, free ligand and Kd are both 10 nM. With identical independent sites and no competing ligand, occupancy is 10 divided by (10 plus 10), or one half. Five occupied symbols among ten illustrate that model fraction; they are not a guaranteed realised count, a dose recommendation or five dead cells. Binding and release can leave a ligand unchanged. A separate catalytic example changes a substrate bond, retains its atoms in the products and reuses the enzyme. Binding, chemical transformation and a later cellular response therefore need separate measurements."
    ],
    "links": [
      {
        "label": "A guide to simple, direct, and quantitative in vitro binding assays.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31453222/"
      },
      {
        "label": "Operational models of pharmacological agonism.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6141562/"
      },
      {
        "label": "IUPAC: affinity and pharmacological efficacy",
        "url": "https://iupac.qmul.ac.uk/medchem/ah.html"
      },
      {
        "label": "OpenStax Biology 2e: 6-5-enzymes",
        "url": "https://openstax.org/books/biology-2e/pages/6-5-enzymes"
      },
      {
        "label": "Classroom model and derivation of Michaelis-Menten parameters; not an enzyme experiment",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17146042/"
      },{"label":"GraphPad Prism: one-site specific-binding model and equilibrium half-maximum","url":"https://www.graphpad.com/guides/prism/latest/curve-fitting/reg_one_site_specific.htm"}
    ],
    "related": [
      "enzyme",
      "ligand",
      "receptor",
      "agonist-antagonist",
      "drug-response-sensitivity",
      "receptor-reserve"
    ],
    "kind": "term",
    "asOf": "2026-11-13",
    "category": "Biology & measurement"
  },
  {
    "id": "feedback-and-feedforward",
    "name": "Feedback, feedforward and signaling dynamics",
    "aka": [
      "negative feedback",
      "positive feedback",
      "feedforward loop",
      "signal adaptation",
      "signaling dynamics"
    ],
    "tldr": "A signal can change the circuit that produced it. Returning inhibition, returning reinforcement and a separate forward route can create different responses over time.",
    "summary": "Negative feedback returns a restraining effect to an upstream process; positive feedback reinforces it. These names describe direction, not clinical desirability. Feedforward sends an input through direct and indirect routes to an output without a returning connection. Connections, delays and cell state can produce transient, sustained or oscillating behavior. A positive loop does not always make an irreversible switch, and rebound need not require a new mutation.",
    "notes": [
      "Santos and colleagues altered feedback arrangements in a PC12 differentiation model, demonstrating that input context can change network dynamics and cell response. O’Reilly and colleagues examined released feedback after mTOR inhibition in cancer models with patient-tumor pharmacodynamic observations. Neither study establishes universal tumor wiring or combination-treatment benefit.",
      "Use time-resolved measurements and controlled perturbation of the proposed connection, with exposure and viability controls. Similar curves can arise from different circuits; a diagram or one late signal cannot identify the mechanism."
    ],
    "links": [
      {
        "label": "Growth factor-induced MAPK network topology shapes Erk response determining PC-12 cell fate.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17310240/"
      },
      {
        "label": "mTOR inhibition induces upstream receptor tyrosine kinase signaling and activates Akt.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16452206/"
      },
      {
        "label": "Structure and function of the feed-forward loop network motif.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/14530388/"
      }
    ],
    "related": [
      "signalling-pathway",
      "phosphorylation",
      "kinase",
      "gene-expression",
      "resistance"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "receptor-reserve",
    "name": "Receptor reserve and system-dependent response",
    "aka": [
      "spare receptors",
      "receptor reserve",
      "signal amplification and occupancy"
    ],
    "tldr": "A cell can sometimes reach its largest measured response without occupying every receptor. Receptor amount and downstream amplification help determine that response.",
    "summary": "Receptor reserve describes a system in which maximal functional response can be obtained before all available receptors are occupied. Occupancy and response can therefore have different concentration-response curves. Operational receptor models separate binding, receptor abundance or activation, and downstream transduction. An EC50 lower than a binding Kd is not on its own evidence of tighter binding. Changing receptor expression or amplification can alter apparent potency and the observed maximum of a partial agonist.",
    "notes": [
      "Black and Leff developed an operational model; the later two-state model explicitly separates binding, activation and amplification and examines receptor-reserve data. These are quantitative pharmacology frameworks, not clinical dose-selection rules. Testing reserve requires functional and binding evidence or controlled changes in receptor availability with appropriate model checks."
    ],
    "links": [
      {
        "label": "Operational models of pharmacological agonism.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6141562/"
      },
      {
        "label": "A Receptor Model With Binding Affinity, Activation Efficacy, and Signal Amplification Parameters for Complex Fractional Response Versus Occupancy Data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31244653/"
      }
    ],
    "related": [
      "binding-affinity-and-kinetics",
      "agonist-antagonist",
      "receptor",
      "biased-agonism"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "biased-agonism",
    "name": "Biased agonism and pathway-dependent receptor response",
    "aka": [
      "ligand bias",
      "agonist bias",
      "biased agonism",
      "functional selectivity at receptors"
    ],
    "tldr": "Two ligands at the same receptor can favor measured response pathways differently. That comparison depends on the reference ligand, assays and cellular system.",
    "summary": "Biased agonism compares the relative signaling behavior of ligands across specified outputs at the same receptor. Binding, intrinsic receptor activation, pathway amplification and baseline activity can contribute differently to observed curves. A potency difference between two assays does not by itself isolate ligand-specific bias. Preserve the reference ligand, endpoints, receptor expression, timing and model assumptions used to estimate it.",
    "notes": [
      "Ehlert and colleagues’ methods analyzed receptor-state affinities and pathway sensitivity using analytical proofs, simulations and previously published data. The constitutively active-mutant approach assumes that the mutation changes receptor-state equilibrium without changing ligand affinities and requires checking that assumption. These method studies do not establish clinical superiority of a biased ligand or validate every cellular assay."
    ],
    "links": [
      {
        "label": "Estimation of ligand affinity constants for receptor states in functional studies involving the allosteric modulation of G protein-coupled receptors: implications for ligand bias.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24434717/"
      },
      {
        "label": "Estimation of the receptor-state affinity constants of ligands in functional studies using wild type and constitutively active mutant receptors: Implications for estimation of agonist bias.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27725245/"
      },
      {
        "label": "A Receptor Model With Binding Affinity, Activation Efficacy, and Signal Amplification Parameters for Complex Fractional Response Versus Occupancy Data.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31244653/"
      }
    ],
    "related": [
      "receptor-reserve",
      "binding-affinity-and-kinetics",
      "agonist-antagonist",
      "signalling-pathway"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "gene-regulatory-elements",
    "name": "Promoters, enhancers and transcription factors",
    "aka": [
      "gene regulatory elements",
      "promoter",
      "enhancer",
      "transcription factor"
    ],
    "tldr": "Genes are regulated through DNA regions, binding proteins and cellular context. A bound regulator or accessible DNA region does not prove that a gene’s output changed.",
    "summary": "A promoter is a DNA region where transcription machinery assembles. Enhancers influence transcription through regulatory interactions, sometimes across a long linear distance brought together in three-dimensional space. Transcription factors recognize sequence features and participate in regulatory networks. Chromatin state and cellular partners affect access and function. Regulation also occurs through RNA processing and removal, translation, and protein modification or turnover.",
    "notes": [
      "RNA measurements, chromatin accessibility, protein occupancy and reporter activity answer different questions. Binding or an open region alone does not establish regulation of a particular gene. Controlled perturbation can test a proposed causal connection, with controls for indirect effects and assay context."
    ],
    "links": [
      {
        "label": "NHGRI: promoter",
        "url": "https://www.genome.gov/genetics-glossary/Promoter"
      },
      {
        "label": "OpenStax: eukaryotic transcription regulation",
        "url": "https://openstax.org/books/biology-2e/pages/16-4-eukaryotic-transcription-gene-regulation"
      },
      {
        "label": "Lambert and colleagues: The Human Transcription Factors (review and catalog)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29425488/"
      }
    ],
    "related": [
      "gene",
      "gene-expression",
      "epigenetic-marks",
      "rna-splicing"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "central-dogma-information-flow",
    "name": "Central dogma and molecular information flow",
    "aka": [
      "central dogma",
      "DNA to RNA to protein"
    ],
    "tldr": "DNA copying, making RNA and making a protein are different processes. Following the route helps identify what each molecular test actually measured.",
    "summary": "Replication makes DNA from DNA. Transcription uses a DNA template to make RNA. Translation reads the coding sequence of a message in three-base codons to build a polypeptide; the transcript and reading frame matter. Functional noncoding RNAs do not need to become protein. Reverse transcription copies RNA into DNA in relevant viral and retrotransposon contexts. This information-flow map is not a guarantee that every DNA change produces a measured RNA or protein change.",
    "notes": [
      "RNA processing, translation, folding, modification, localization and turnover can alter the path from a coding sequence to a functional product. DNA presence, RNA abundance, intact protein, location and activity require their own evidence. Neither a gene-level RNA count nor a sequence prediction establishes a fixed protein amount or clinical effect.",
      "For a nuclear protein-coding gene in a eukaryotic cell, transcription occurs in the nucleus and the message reaches cytoplasmic ribosomes for translation. A delivered messenger RNA can begin at cytoplasmic translation without requiring genomic integration. This does not imply an empty nucleus or removal of existing nuclear DNA. Neither DNA nor an untranslated message is itself the finished receptor protein. Translation alone does not establish correct folding, processing, transport or function at the cell surface.",
      "In the recipe analogy, the DNA template is retained while an RNA copy is assembled. Translation uses a message as instructions for joining amino acids; the RNA molecule is not the material converted into the protein. The arrows name these processes rather than showing that a reported DNA change produced a measured message or working product. Noncoding RNA lies outside this simplified protein-coding route. Questions about production, location and activity remain open until suitable evidence addresses them."
    ],
    "links": [
      {
        "label": "NHGRI: RNA, coding/noncoding functions and reverse transcription",
        "url": "https://www.genome.gov/about-genomics/educational-resources/fact-sheets/ribonucleic-acid-fact-sheet"
      },
      {
        "label": "NHGRI: codon",
        "url": "https://www.genome.gov/genetics-glossary/Codon"
      },
      {
        "label": "NHGRI: transcription",
        "url": "https://www.genome.gov/genetics-glossary/Transcription"
      },
      {
        "label": "OpenStax: regulation across molecular steps",
        "url": "https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression"
      }
    ],
    "related": [
      "dna-term",
      "gene",
      "rna",
      "protein",
      "gene-expression",
      "nonsense-mediated-decay"
    ],
    "kind": "term",
    "asOf": "2026-11-14",
    "category": "Biology & measurement"
  }
,
{
  "id": "tnbc-molecular-subtyping",
  "kind": "term",
  "name": "TNBC molecular subtyping",
  "aka": [
    "TNBCtype",
    "TNBCtype-4",
    "Lehmann subtypes",
    "TNBC expression subtypes"
  ],
  "category": "Cancer biology",
  "asOf": "2026-11-09",
  "tldr": "TNBC RNA subtyping compares gene-expression patterns under a named research classifier. Tissue mixture, method and version matter, and the result is separate from receptor tests or a treatment choice.",
  "summary": "Lehmann's original TNBCtype system described six expression groups: BL1, BL2, IM, M, MSL and LAR. The 2016 TNBCtype-4 refinement retained BL1, BL2, M and LAR as tumour-focused profiles after evaluating immune and stromal contributions to the IM and MSL signals. Removed-profile samples were reassigned to their second-highest correlated tumour-profile centroid, not automatically to M.\n\nBL1 is associated with cell-cycle/DNA-damage-response programmes; BL2 with growth-factor and myoepithelial-associated expression; M with motility and differentiation; and LAR with luminal and androgen-related transcription. These are classifier associations, not proof of one cause, functional repair deficiency or dependence on an inhibitor.",
  "notes": [
    "Record tissue identity, timing relative to treatment, tumour content, RNA qualification, platform, gene coverage, preprocessing, normalisation, reference data, classifier/version and competing correlations. A reported correlation or permutation p-value is not automatically a probability. No universal RNA-quality cutoff qualifies every platform.",
    "A mixed-tissue IM signal and a BL1 call from an enriched preparation can coexist without proving tumour evolution. Compare preparation, method and scores. Tumour-focused labels do not make every bulk input free of immune or stromal RNA.",
    "PAM50 basal-like, AR protein positivity, an RNA LAR label, histology and receptor-defined TNBC are separate measurements. A lineage-associated programme does not establish an exact cell of origin.",
    "The defining cell-model and retrospective chemotherapy studies generated treatment hypotheses. Prospective strategy research also exists: FUTURE-SUPER used a distinct Fudan classifier plus genomic biomarkers and compared matched regimens with nab-paclitaxel alone. Its pooled phase 2 result does not validate every same-named profile or isolate the value of a classifier from its treatment bundle."
  ],
  "links": [
    {
      "label": "Lehmann 2011: original expression profiles and cell-model experiments",
      "url": "https://pubmed.ncbi.nlm.nih.gov/21633166/"
    },
    {
      "label": "Lehmann 2016: tissue attribution and TNBCtype-4 refinement",
      "url": "https://pubmed.ncbi.nlm.nih.gov/27310713/"
    },
    {
      "label": "Chen 2012: TNBCtype input and reported correlation/permutation statistics",
      "url": "https://pubmed.ncbi.nlm.nih.gov/22872785/"
    },
    {
      "label": "Zhao 2020: specified Fudan research IHC classifier",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32406563/"
    },
    {
      "label": "FUTURE-SUPER primary randomised phase 2 report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/38211606/"
    }
  ],
  "cancers": [
    "tnbc"
  ],
  "keyPapers": [
    "paper-lehmann-tnbc-subtypes-jci-2011",
    "paper-lehmann-tnbctype-4-refinement-plos-one-2016",
    "paper-future-super-lancet-oncology-2024"
  ],
  "related": [
    "pam50",
    "basal-like",
    "luminal-androgen-receptor",
    "future-super"
  ],
  "tags": [
    "education-audit",
    "classification"
  ]
},
];
