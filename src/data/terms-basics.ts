/**
 * Glossary basics (September 2026): the foundational vocabulary a newcomer meets on cancer pages.
 *
 * Every term here gets a hover tooltip wherever its name or an `aka` alias appears in page text
 * (src/lib/term-hover.tsx matches longest-first, case-insensitive, at word boundaries that treat
 * hyphens as part of the word). Aliases therefore list the plural, hyphenated and verb forms that
 * actually occur in prose. Definitions avoid jargon in the tldr; the summary goes one level deeper.
 *
 * Categories: "Biology basics" (cells, genes, signalling, immunity) and "Clinic basics"
 * (diagnosis, treatment, trials, statistics, epidemiology). Terms that already exist elsewhere
 * (gene fusion, germline vs somatic, lines of therapy, TNM staging, hazard ratio, PFS, OS, IHC,
 * standard of care, accelerated approval, neoadjuvant/adjuvant, drug resistance) are referenced,
 * not redefined.
 *
 * Wire up with `import { termsBasics } from "./terms-basics";` and `...termsBasics,` in ALL_INPUTS.
 */
import type { TermInput } from "@/lib/schema";

const asOf = "2026-09-09";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
type T = Omit<TermInput, "kind" | "asOf"> & { asOf?: string };
const t = (x: T): TermInput => ({ kind: "term", asOf, links: x.wikipedia ? [{ label: "Wikipedia", url: x.wikipedia }] : undefined, ...x });

const BIO = "Biology basics";
const CLINIC = "Clinic basics";

export const termsBasics: TermInput[] = [
  // =====================================================================================
  // The cell and its parts
  // =====================================================================================
  t({
    id: "cell-term", name: "Cell", category: BIO,
    aka: ["cells", "cellular"],
    tldr: "The smallest living unit of the body. You are made of roughly 30 trillion of them, and cancer begins when one of them starts dividing when it should not.",
    summary: "Each cell is a membrane-bound compartment with a nucleus holding the DNA, machinery for reading genes and building proteins, and receptors on its surface for sensing the outside world. Cells in a tissue normally divide only when instructed and die when damaged or no longer needed; cancer is the breakdown of that discipline in one cell lineage. Almost every treatment on this site is an attempt to kill cancer cells, stop them dividing, or help immune cells find them, while sparing normal cells that share most of the same machinery.",
    wikipedia: W("Cell_(biology)"),
    related: ["nucleus", "cell-membrane", "cell-division", "apoptosis", "hallmarks-of-cancer"],
  }),
  t({
    asOf:"2026-11-08", notes:["Surface-associated fluorescence does not establish internalization or cytosolic delivery. A membrane-exclusion dye tests the integrity property resolved by that assay; it does not certify every cell function."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cell_membrane"},{"label":"OpenStax Biology 2e: 5-1-components-and-structure","url":"https://openstax.org/books/biology-2e/pages/5-1-components-and-structure"},{"label":"OpenStax Biology 2e: 5-2-passive-transport","url":"https://openstax.org/books/biology-2e/pages/5-2-passive-transport"},{"label":"OpenStax Biology 2e: 5-3-active-transport","url":"https://openstax.org/books/biology-2e/pages/5-3-active-transport"},{"label":"OpenStax Biology 2e: 5-4-bulk-transport","url":"https://openstax.org/books/biology-2e/pages/5-4-bulk-transport"}],
    id: "cell-membrane", name: "Cell membrane", category: BIO,
    aka: ["cell membranes", "plasma membrane", "cell surface", "cell-surface", "surface of the cell", "membrane-bound"],
    tldr: "The cell membrane forms a selective boundary. Binding at the surface, entering a vesicle and reaching the cell’s internal working fluid are different steps.",
    summary: "A lipid bilayer and its proteins separate the cell from its surroundings. Permeability depends on size, charge and chemical properties, rather than a universal small-molecule versus antibody rule. Passive movement follows the relevant gradient; active transport uses energy directly or through a coupled gradient. Endocytosis encloses material in a membrane-bound compartment. Delivery to cytosol or another target compartment requires further steps. Cytosol is fluid outside organelle interiors; cytoplasm includes that fluid and structures outside the nucleus.",
    wikipedia: W("Cell_membrane"),
    related: ["receptor","antibody","cell-term","efflux-pump","cellular-compartments","ligand"], technologies: ["adc", "monoclonal-antibody"],
  }),
  t({
    id: "nucleus", name: "Nucleus", category: BIO,
    aka: ["cell nucleus"],
    tldr: "The nucleus is a compartment enclosed by a membrane that holds chromosomes containing DNA.",
    summary: "The nucleus is enclosed by its own membrane and contains the chromosomes, together with the enzymes that copy DNA before division and read genes into RNA. Many cancer drugs act here: chemotherapy damages DNA or jams its copying, PARP inhibitors block a DNA-repair enzyme, and hormone therapies stop receptors from switching genes on. Pathologists also read the nucleus under the microscope, because enlarged, irregular, dark nuclei are one of the classic signs of malignancy.",
    wikipedia: W("Cell_nucleus"),
    related: ["dna-term", "chromosome", "gene", "histology"],

"asOf": "2026-11-11",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cell_nucleus"
  },
  {
    "label": "NCI Dictionary: nucleus",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/nucleus"
  }
]
}),
  t({
    notes:["A DNA lesion can be a damaged base, a strand break or a crosslink. Damage can be repaired, and is different from a stable change in the DNA sequence. The damage response is another observation: an assay for gamma-H2AX measures a histone modification associated with a response, rather than reading a variant sequence. Experimental work also shows that this signal is not an unambiguous count of double-strand breaks. A sequencing variant call, a lesion assay and a damage-response stain answer different questions; one is not a count of the others."],
    asOf:"2026-11-09", links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/DNA"},{"label":"NHGRI: DNA fact sheet","url":"https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet"},{"label":"NHGRI: Chromatin","url":"https://www.genome.gov/genetics-glossary/Chromatin"},{"label":"NHGRI: Transcription","url":"https://www.genome.gov/genetics-glossary/Transcription"},{"label":"NLM MeSH: DNA damage, repair and possible sequence consequences","url":"https://id.nlm.nih.gov/mesh/D004249.html"},{"label":"Rogakou and colleagues: H2AX phosphorylation after DNA double-strand breaks in models","url":"https://pubmed.ncbi.nlm.nih.gov/9488723/"},{"label":"Revet and colleagues: gamma-H2AX signal and functional damage-response limits","url":"https://pubmed.ncbi.nlm.nih.gov/21555580/"}],
    id: "dna-term", name: "DNA", category: BIO,
    aka: ["deoxyribonucleic acid","double helix","genome"],
    tldr: "DNA stores sequence information. Its packaging, copying and use as a template for RNA are different processes.",
    summary: "DNA contains nucleotide chains with a sugar–phosphate backbone and the bases A, T, C and G. Complementary A–T and C–G pairing joins antiparallel strands. Nuclear chromosomes contain DNA associated with proteins as chromatin; nucleosomes organize DNA around histones. Mitochondria carry a separate genome. A gene is a functional region within DNA, rather than an entire chromosome. Replication copies DNA, while transcription produces RNA from a selected template. Packaging and gene presence do not establish active transcription or a functional protein.",
    wikipedia: W("DNA"),
    related: ["gene","mutation","rna","chromosome","ctdna","ngs","genomic-profiling","cellular-compartments","gene-expression","genetic-code"],
  }),
  t({
    asOf:"2026-11-08", notes:["RNA abundance reflects production, processing and degradation. Short sequencing reads do not prove that a full-length intact message was captured. A noncoding RNA can function without becoming a protein, and reverse transcription copies RNA into DNA in relevant biological contexts. RNA amount does not determine a fixed protein amount or activity.","After successful delivery, a supplied ordinary mRNA can be translated at cytoplasmic ribosomes; that translation step does not require the message to enter the nucleus. Supplying a message, measuring endogenous tumor RNA and demonstrating nuclear DNA modification are separate observations. The NHGRI vaccine example illustrates supplied RNA instructions, not a general cancer-efficacy claim."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/RNA"},{"label":"NHGRI: RNA roles, processing and reverse transcription","url":"https://www.genome.gov/about-genomics/educational-resources/fact-sheets/ribonucleic-acid-fact-sheet"},{"label":"NHGRI: Codon","url":"https://www.genome.gov/genetics-glossary/Codon"},{"label":"OpenStax Biology 2e: 16-1-regulation-of-gene-expression","url":"https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression"},{"label":"OpenStax Biology 2e: 16-5-eukaryotic-post-transcriptional-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-5-eukaryotic-post-transcriptional-gene-regulation"}],
    id: "rna", name: "RNA", category: BIO,
    aka: ["messenger RNA", "mRNA", "transcript", "transcripts", "transcription"],
    tldr: "RNA is a family of molecules with several jobs. Messenger RNA provides a protein-making template; other RNAs help build, regulate or carry out cellular processes.",
    summary: "RNA uses ribose and usually uracil in place of DNA’s thymine. It is often single-stranded but can fold through internal pairing. Messenger RNA carries a coding template; ribosomal RNA contributes to ribosome structure and catalysis; transfer RNA brings amino acids; regulatory RNAs influence other molecules. Many nuclear messages receive a 5-prime cap and poly(A) tail and have introns removed by splicing before translation, but these features are not universal to all RNAs. Ribosomes read a coding sequence in codons to produce a polypeptide; processing, folding and localization follow.",
    wikipedia: W("RNA"),
    related: ["dna-term","gene","protein","gene-expression","rna-splicing","nonsense-mediated-decay"], technologies: ["rna-seq", "neoantigen-mrna-vaccine", "antisense-sirna"],
  }),
  t({
    asOf:"2026-11-08", notes:["Preserve the reference sequence, accession and version when describing a variant consequence. DNA sequencing, gene-level RNA counts and protein assays measure different objects; a pooled count does not establish every isoform or an intact active protein. Gene and protein names are often shared, so identify which molecule an assay or drug claim concerns."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Gene"},{"label":"NHGRI: Gene","url":"https://www.genome.gov/genetics-glossary/Gene"},{"label":"NHGRI: Exon","url":"https://www.genome.gov/genetics-glossary/Exon"},{"label":"NHGRI: Intron","url":"https://www.genome.gov/genetics-glossary/Intron"},{"label":"HGVS: reference-sequence context","url":"https://hgvs-nomenclature.org/stable/background/refseq/"},{"label":"OpenStax Biology 2e: 16-5-eukaryotic-post-transcriptional-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-5-eukaryotic-post-transcriptional-gene-regulation"}],
    id: "gene", name: "Gene", category: BIO,
    aka: ["genes", "genetic"],
    tldr: "A gene is a DNA region that produces a functional RNA message. Some messages encode proteins; others work as RNA.",
    summary: "A protein-coding gene supplies RNA that can be translated into a polypeptide, while a noncoding RNA gene produces a functional RNA. Promoters and other regulatory regions influence transcription in a cell-dependent context. One gene can have several transcript versions. Exons are retained regions of a specified processed transcript and can include untranslated sequence; introns are removed by splicing. Coding sequence is the translated part of a coding message. A gene name alone does not specify a transcript, coding interval or protein product.",
    wikipedia: W("Gene"),
    related: ["dna-term","protein","mutation","oncogene","tumour-suppressor-gene","gene-expression","rna","rna-splicing"],
  }),
  t({
    id: "chromosome", name: "Chromosome", category: BIO,
    aka: ["chromosomes", "chromosomal"],
    tldr: "One of the 46 long bundles into which a cell's DNA is packed. Cancer cells often have broken, missing, or extra chromosomes.",
    summary: "Each human cell carries 23 pairs of chromosomes, one set from each parent, and each chromosome is a single continuous DNA molecule wrapped around proteins. Cancer cells frequently gain or lose whole chromosomes or pieces of them (aneuploidy), swap segments between chromosomes (creating gene fusions), or copy a segment many times over (amplification). Karyotypes and copy-number profiles read these large-scale changes; the Philadelphia chromosome in chronic myeloid leukaemia, which fuses BCR and ABL, was the first such change tied to a specific cancer and to a specific drug, imatinib.",
    wikipedia: W("Chromosome"),
    related: ["dna-term", "gene", "amplification", "deletion", "gene-fusion"], drugs: ["imatinib"],
  }),
  t({
    asOf:"2026-11-08", notes:["An antibody may recognize an epitope on more than one product form or a remaining fragment. Many mass-spectrometry workflows digest proteins into peptides: a shared detected peptide cannot distinguish every full-length form. A candidate peptide sequence also does not establish its display by HLA. Separate assays address amount, location, intact form, function and antigen presentation."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Protein"},{"label":"NHGRI: Protein","url":"https://www.genome.gov/genetics-glossary/Protein"},{"label":"OpenStax Biology 2e: 3-4-proteins","url":"https://openstax.org/books/biology-2e/pages/3-4-proteins"},{"label":"OpenStax Biology 2e: 16-6-eukaryotic-translational-and-post-translational-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-6-eukaryotic-translational-and-post-translational-gene-regulation"}],
    id: "protein", name: "Protein", category: BIO,
    aka: ["proteins"],
    tldr: "Proteins are amino-acid products that provide structure, catalysis, transport and signaling. A detected fragment and a complete working protein are different findings.",
    summary: "Amino acids join through peptide bonds into polypeptide chains; linked amino acids are residues. Peptide and protein usage overlaps without a universal length boundary. A protein may contain one or several chains, folded domains and flexible regions. Processing, chemical modifications, localization, production and degradation affect its form and behavior. Genes specify coding templates, but a DNA or RNA finding does not measure the resulting protein’s intact structure or activity.",
    wikipedia: W("Protein"),
    related: ["gene","enzyme","receptor","kinase","antibody","ihc","rna","protein-structure-and-domains","proteomics"], technologies: ["proteomics"],
  }),
  t({
    asOf:"2026-11-08", notes:["Affinity, specificity, Kd, Km and assay IC50 answer distinct questions. Report the model, free concentrations, substrates, cofactors and timing. Kinases, PARP and topoisomerases illustrate oncology enzyme targets, but binding alone does not establish useful cellular inhibition or patient benefit."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Enzyme"},{"label":"OpenStax Biology 2e: 6-5-enzymes","url":"https://openstax.org/books/biology-2e/pages/6-5-enzymes"},{"label":"A guide to simple, direct, and quantitative in vitro binding assays.","url":"https://pubmed.ncbi.nlm.nih.gov/31453222/"},{"label":"NHGRI: catalytic ribosomal RNA","url":"https://www.genome.gov/about-genomics/educational-resources/fact-sheets/ribonucleic-acid-fact-sheet"}],
    id: "enzyme", name: "Enzyme", category: BIO,
    aka: ["enzymes", "enzymatic"],
    tldr: "An enzyme speeds a chemical reaction and is reused through its reaction cycle. Binding to an enzyme does not by itself show that the reaction or a cell response changed.",
    summary: "Catalysis lowers a reaction’s activation barrier without supplying an unlimited energy source. Most familiar enzymes are proteins, while some RNAs also catalyze reactions. Active-site interactions help chemistry; other binding sites can regulate activity. Binding, catalytic rate, substrate preference and activity in a cell are different properties. An inhibitor can act through the active site or another mechanism, and turnover rates are not one universal number.",
    wikipedia: W("Enzyme"),
    related: ["protein","kinase","inhibitor","phosphorylation","binding-affinity-and-kinetics","drug-response-sensitivity"], targets: ["parp"], technologies: ["topoisomerase-inhibitors"],
  }),
  t({
    asOf:"2026-11-08", notes:["DNA presence, regulator binding, accessible chromatin and increased RNA are separate observations. RNA sequencing samples messages; chromatin-accessibility and protein-binding assays address different properties. Reporter or controlled perturbation experiments test particular regulatory hypotheses, with controls for indirect effects.","RNA abundance does not provide a fixed conversion to protein abundance or activity. Gene dosage can contribute to RNA variation, but a population association or statistical correction does not establish a particular protein amount, growth dependence or therapeutic response in one sample."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Gene_expression"},{"label":"NHGRI: Promoter","url":"https://www.genome.gov/genetics-glossary/Promoter"},{"label":"NHGRI: Transcription","url":"https://www.genome.gov/genetics-glossary/Transcription"},{"label":"NHGRI: Codon","url":"https://www.genome.gov/genetics-glossary/Codon"},{"label":"OpenStax Biology 2e: 16-1-regulation-of-gene-expression","url":"https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression"},{"label":"OpenStax Biology 2e: 16-4-eukaryotic-transcription-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-4-eukaryotic-transcription-gene-regulation"},{"label":"The Human Transcription Factors.","url":"https://pubmed.ncbi.nlm.nih.gov/29425488/"},{"label":"Gene expression analysis identifies global gene dosage sensitivity in cancer.","url":"https://pubmed.ncbi.nlm.nih.gov/25581432/"}],
    id: "gene-expression", name: "Gene expression", category: BIO,
    aka: ["expression", "expressed", "expresses", "expression level", "expression levels", "highly expressed", "low expression", "high expression"],
    tldr: "Gene expression produces RNA and, for coding messages, protein. Measurements at those steps are related but do not answer the same question.",
    summary: "Transcription makes RNA from DNA; translation reads a coding message in codons to make a polypeptide. This information-flow description does not require every RNA to become protein. A promoter recruits transcription machinery. Enhancers influence transcription through regulatory interactions that can span distant DNA positions. Transcription factors recognize sequence features and participate in regulation. Chromatin, RNA processing and turnover, translation, protein processing and degradation all influence the eventual product. A transcript’s frame and reference context matter when interpreting a sequence change.",
    wikipedia: W("Gene_expression"),
    related: ["gene","rna","protein","overexpression","ihc","biomarker","epigenetic-marks","gene-amplification","nonsense-mediated-decay","gene-regulatory-elements","central-dogma-information-flow"], technologies: ["rna-seq", "histopathology-ihc", "epigenetic-drugs"],
  }),

  // =====================================================================================
  // Genetic changes
  // =====================================================================================
  t({
    asOf:"2026-11-09", notes:["A DNA rearrangement, a joined RNA and a protein fusion are different observations. A predicted splice or protein consequence remains a prediction until supported at the relevant molecular level. Synonymous does not mean incapable of affecting RNA processing. Preserve genome build, accession/version, tested regions, detectable change classes and limits; pathogenicity or drug sensitivity does not follow from variant class alone.","In a specified coding transcript, an insertion or deletion of a complete number of three-base groups can preserve the downstream reading frame. It can still add or remove amino acids, change a codon at the join or introduce a stop; preserving the frame does not establish preserved protein function. The actual sequence and transcript consequences need checking. A protein-level change inferred from DNA remains a prediction until supported at the relevant molecular level."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Mutation"},{"label":"NHGRI: Mutation","url":"https://www.genome.gov/genetics-glossary/Mutation"},{"label":"NHGRI: Copy-Number-Variation-CNV","url":"https://www.genome.gov/genetics-glossary/Copy-Number-Variation-CNV"},{"label":"NHGRI: Structural-Variation","url":"https://www.genome.gov/genetics-glossary/Structural-Variation"},{"label":"HGVS: measured and predicted sequence consequences","url":"https://hgvs-nomenclature.org/stable/recommendations/general/"},{"label":"HGVS: frameshift descriptions","url":"https://hgvs-nomenclature.org/stable/recommendations/protein/frameshift/"},{"label":"NHGRI: three-base reading frames and frameshift variants","url":"https://www.genome.gov/genetics-glossary/Frameshift-Mutation"},{"label":"HGVS: protein deletions and predicted consequences","url":"https://hgvs-nomenclature.org/stable/recommendations/protein/deletion/"},{"label":"HGVS: deletion-insertion consequences, including inserted stop codons","url":"https://hgvs-nomenclature.org/stable/recommendations/protein/delins/"}],
    id: "mutation", name: "Mutation", category: BIO,
    aka: ["mutations", "mutated", "mutant", "mutants", "genetic mutation", "point mutation", "point mutations", "variant", "variants", "genetic alteration", "genetic alterations", "alteration", "alterations"],
    tldr: "A DNA variant describes a sequence change relative to a reference. Its origin, effect and clinical importance require separate evidence.",
    summary: "A single-nucleotide substitution changes one base. Insertions and deletions change sequence length; copy-number and structural alterations affect larger regions and can overlap in category. In a specified coding transcript, missense changes alter an amino acid, synonymous changes preserve it, and nonsense changes introduce a stop. A net coding indel not divisible by three can shift the reading frame; an indel outside coding sequence is not automatically a frameshift. Transcript and reference versions determine the description.",
    wikipedia: W("Mutation"),
    related: ["dna-term","gene","driver-mutation","germline-vs-somatic","tmb","mutational-signature","vus","rna-splicing","alleles-and-zygosity","gene-fusion","genetic-code"],
  }),
  t({
    id: "driver-mutation", name: "Driver mutation", category: BIO,
    aka: ["driver mutations", "driver", "drivers", "oncogenic driver", "oncogenic drivers", "driver alteration", "driver alterations", "driver gene", "driver genes", "passenger mutation", "passenger mutations", "driver mutation", "oncogene-driven", "driver-positive", "driver-negative", "actionable", "actionable mutation", "actionable alteration", "targetable", "targetable driver", "targetable mutation", "molecularly selected", "biomarker-driven", "actionable alterations", "targetable drivers", "targetable mutations", "driver-mutation-term"],
    tldr: "One of the few mutations in a tumour that actually causes it to grow. Everything else is a passenger along for the ride. Drivers are the mutations drugs are aimed at.",
    summary: "A tumour with thousands of mutations usually has two to eight drivers that confer a growth advantage; the rest are passengers that happened to be present in the cell that became cancerous. Drivers cluster in a few hundred genes: oncogenes activated by mutation or amplification (EGFR, KRAS, BRAF, HER2, ALK) and tumour suppressors lost by mutation or deletion (TP53, RB1, PTEN). Genomic profiling looks for known drivers because a tumour that depends on one can often be treated with a drug against it, the phenomenon called oncogene addiction.",
    wikipedia: W("Carcinogenesis#Driver_and_passenger_mutations"),
    related: ["mutation", "oncogene", "tumour-suppressor-gene", "oncogene-addiction", "genomic-profiling", "targeted-therapy-term", "egfr-mutation-subtypes", "kras-mutation-subtypes", "braf-v600-mutation", "gene-fusion", "tumour-agnostic", "driver-passenger-model", "somatic-mutation-theory"], targets: ["egfr", "kras", "braf", "alk", "tp53"],
    sections: ["targeted-therapy", "diagnostics"], technologies: ["cgp", "kinase-inhibitors", "companion-diagnostic"],
  }),
  t({
    id: "amplification", name: "Amplification", category: BIO,
    aka: ["amplifications", "amplified", "gene amplification", "copy number gain", "copy-number gain", "copy number", "copy-number", "extra copies"],
    tldr: "When a cell carries extra copies of a gene, sometimes 50 or more instead of the normal two, so it makes far too much of that protein. HER2 amplification in breast cancer is the classic example and is what trastuzumab exploits; MET amplification is a common escape route from EGFR inhibitors in lung cancer.",
    summary: "Amplification is a copy-number change: a segment of DNA containing the gene is duplicated, sometimes to 50 or more copies, either within the chromosome or on separate circles of DNA (ecDNA). More copies mean more RNA and more protein, so an amplified oncogene behaves as if permanently over-activated. It is detected by in situ hybridisation (FISH/ISH) or sequencing and is a drug target in its own right: HER2 amplification is what trastuzumab and T-DXd exploit, and MET amplification is a common way lung cancers escape EGFR inhibitors.",
    wikipedia: W("Gene_duplication"),
    related: ["overexpression", "chromosome", "her2-low", "resistance"], targets: ["her2", "met"], drugs: ["trastuzumab", "trastuzumab-deruxtecan"],
  }),
  t({
    id: "overexpression", name: "Overexpression", category: BIO,
    aka: ["overexpressed", "overexpresses", "over-expression", "over-expressed", "overexpressing", "over-expressing", "abundant on", "overexpress"],
    tldr: "When a cell makes much more of a particular protein than normal cells do. Drugs that home in on that protein can then hit the tumour harder than healthy tissue.",
    summary: "Overexpression can result from gene amplification, from a mutation in the gene's control region, or from signalling that keeps the gene switched on. It is what makes many antibody and ADC targets useful: TROP2, HER2, Nectin-4 and B7-H3 are all present at low levels on some normal cells but at far higher levels on particular tumours, so a targeted drug concentrates where the target is densest. Overexpression is scored by immunohistochemistry (0, 1+, 2+, 3+), and the threshold that counts as 'positive' can change as drugs improve, as happened with HER2-low.",
    wikipedia: W("Gene_expression"),
    related: ["gene-expression", "amplification", "ihc", "her2-low", "biomarker"], targets: ["her2", "trop2", "nectin4", "b7h3"], technologies: ["adc"],
  }),
  t({
    id: "deletion", name: "Deletion", category: BIO,
    aka: ["deletions", "deleted", "gene deletion", "homozygous deletion", "copy number loss", "copy-number loss", "exon 19 deletion", "exon 19 deletions"],
    tldr: "When a piece of DNA is missing, from a few letters to an entire gene. Deleting a tumour suppressor gene removes one of the cell's brakes.",
    summary: "Small deletions within a gene can either disable the protein (a frameshift that garbles the rest of the recipe) or, more rarely, activate it, as with the EGFR exon 19 deletions that make lung cancers sensitive to osimertinib. Large deletions remove whole genes, and losing both copies of a tumour suppressor such as PTEN, CDKN2A or RB1 is a frequent driver event. Some deletions create drug vulnerabilities: tumours that have lost MTAP become dependent on the enzyme PRMT5, an example of synthetic lethality.",
    wikipedia: W("Deletion_(genetics)"),
    related: ["mutation", "tumour-suppressor-gene", "amplification", "synthetic-lethality"], targets: ["egfr"], drugs: ["osimertinib"],
  }),
  t({
    id: "oncogene", name: "Oncogene", category: BIO,
    aka: ["oncogenes", "oncogenic", "proto-oncogene", "proto-oncogenes"],
    tldr: "An oncogene is an activated form of a growth-promoting gene. Its presence alone does not prove that the cancer depends on it or that a particular drug will help.",
    summary: "Normal proto-oncogenes participate in cell growth and survival. Particular sequence changes, extra copies or rearrangements can increase or redirect their activity. Whether an alteration drives disease, creates a dependency or supplies a useful treatment target depends on its functional and disease context.",
    wikipedia: W("Oncogene"),
    related: ["tumour-suppressor-gene", "driver-mutation", "oncogene-addiction", "kinase", "growth-signal", "sustaining-proliferative-signaling"], targets: ["egfr", "her2", "kras", "braf", "alk", "pik3ca"],

"notes": [
  "Sequence change, amplification or rearrangement can activate a proto-oncogene, but more copies or RNA alone do not prove constitutive signalling or survival dependence. Driver contribution to cancer biology, drug targetability and clinical actionability are separate claims. A delivery address on a cell need not drive its growth, and a driver can be bypassed or lack a safe effective intervention.",
  "In Slamon’s 1987 series, HER2 amplification occurred in about 30% of 189 primary breast cancers; this is a historical series, not a current population prevalence. The 2001 randomised trastuzumab trial showed benefit with chemotherapy in HER2-overexpressing metastatic disease. A prognostic association with amplification and benefit from an intervention are different evidence.",
  "In a fictional comparison, an overactive receptor supplies a stronger signalling readout while loss of a repair safeguard has a different functional consequence. Neither observation alone demonstrates survival dependence. Interpretation retains the specimen and exact variant or copy finding, RNA or protein consequences and controlled functional endpoints, including exposure and off-target controls. There is no generic oncogene score that substitutes for disease-specific actionability."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Oncogene"
  },
  {
    "label": "Slamon et al., Human breast cancer: correlation of relapse and survival with amplification of the HER-2/neu oncogene. (1987)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3798106/"
  },
  {
    "label": "Slamon et al., Use of chemotherapy plus a monoclonal antibody against HER2 for metastatic breast cancer that overexpresses HER2. (2001)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11248153/"
  }
],
"asOf": "2026-11-10"
}),
  t({
    id: "tumour-suppressor-gene", name: "Tumour suppressor gene", category: BIO,
    aka: ["tumour suppressor", "tumour suppressors", "tumor suppressor", "tumor suppressors", "tumor suppressor gene", "tumour suppressor genes", "tumor suppressor genes", "tumour-suppressor", "tumor-suppressor"],
    tldr: "Tumour-suppressor genes help restrain growth or preserve cells and their genomes. Loss can matter through several mechanisms, so losing both copies is not a universal rule.",
    summary: "Tumour-suppressor genes contribute to growth restraint, genome maintenance and responses to damage. Some cancers disable both useful copies; in other settings reduced dosage or interference by an altered protein matters. The exact variant, copy state and functional context determine what has been lost.",
    wikipedia: W("Tumor_suppressor_gene"),
    related: ["oncogene", "deletion", "synthetic-lethality", "evading-growth-suppressors", "hereditary-cancer-syndromes", "cell-cycle"], targets: ["tp53", "brca", "parp"], pathways: ["p53-cell-cycle", "pi3k-akt-mtor"],

"notes": [
  "Tumour suppressors can restrain growth, maintain the genome or help remove damaged cells. Knudson’s retinoblastoma model proposed two events, with an inherited first event or two acquired events. Different changes can disable the useful copies, but two-hit loss is not a universal law for all suppressors. Haploinsufficiency means one useful copy supplies insufficient protective dosage; Fero’s challenged p27-heterozygous mice retained an unmutated, unsilenced remaining copy.",
  "A dominant-negative altered protein interferes with useful protein rather than merely reducing dosage. Boettcher demonstrated this for particular TP53 variants in myeloid and leukaemia models, not every TP53 variant or breast tumour. TCGA reported TP53 mutations in 80% of its basal-like breast cancers. Basal-like is not identical to all TNBC, and a genomic frequency does not establish complete functional loss, drug restoration or a current approval claim.",
  "A deletion, variant name or inherited alteration alone does not establish complete loss, loss of both copies or a particular functional effect. Inherited-plus-second-loss BRCA1 is one route to a conditional repair vulnerability, not every BRCA/HRD case or automatic PARP sensitivity. Blocking excess activity, restoring missing protection and exploiting a resulting vulnerability are different intervention concepts. A dosage/interference cartoon distinguishes mechanisms; it does not classify every variant or establish clinical benefit."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Tumor_suppressor_gene"
  },
  {
    "label": "Knudson, Mutation and cancer: statistical study of retinoblastoma. (1971)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/5279523/"
  },
  {
    "label": "Fero et al., The murine gene p27Kip1 is haplo-insufficient for tumour suppression. (1998)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9823898/"
  },
  {
    "label": "Boettcher et al., A dominant-negative effect drives selection of <i>TP53</i> missense mutations in myeloid malignancies. (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31395785/"
  },
  {
    "label": "TCGA: molecular portraits of human breast tumours (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23000897/"
  }
],
"asOf": "2026-11-10"
}),

  // =====================================================================================
  // Signalling
  // =====================================================================================
  t({
    asOf:"2026-11-08", notes:["Defined engineered estrogen-receptor experiments detected nuclear and membrane pools; they do not establish a universal proportion in human tumors. Distinguish receptor identity, location, accessible binding and measured function. A positive stain or fluorescence intensity is not automatically a calibrated receptor count, pathway dependence or drug sensitivity."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Receptor_(biochemistry)"},{"label":"OpenStax Biology 2e: 9-1-signaling-molecules-and-cellular-receptors","url":"https://openstax.org/books/biology-2e/pages/9-1-signaling-molecules-and-cellular-receptors"},{"label":"Cell membrane and nuclear estrogen receptors (ERs) originate from a single transcript: studies of ERalpha and ERbeta expressed in Chinese hamster ovary cells.","url":"https://pubmed.ncbi.nlm.nih.gov/9973260/"},{"label":"Operational models of pharmacological agonism.","url":"https://pubmed.ncbi.nlm.nih.gov/6141562/"}],
    id: "receptor", name: "Receptor", category: BIO,
    aka: ["receptors", "surface receptor", "surface receptors", "cell-surface receptor", "cell-surface receptors", "receptor tyrosine kinase", "receptor tyrosine kinases", "RTK", "RTKs"],
    tldr: "Receptors connect molecular recognition to a cellular response through several mechanisms. Their presence and their activity are separate findings.",
    summary: "Receptors can be on the surface or inside a cell. Ligand-gated ion channels regulate ion passage; G-protein-coupled receptors act through G proteins; enzyme-linked receptors can contain an enzyme or recruit a separate one. Intracellular nuclear receptors can regulate transcription with cellular partners. A surface signal can ultimately alter genes, while nuclear-receptor family membership does not fix every molecule permanently in the nucleus or require every effect to use new transcription.",
    wikipedia: W("Receptor_(biochemistry)"),
    related: ["ligand","growth-factor","growth-signal","kinase","signalling-pathway","cell-membrane","agonist-antagonist","binding-affinity-and-kinetics","receptor-reserve"], targets: ["egfr", "her2", "estrogen-receptor", "androgen-receptor"], pathways: ["ras-mapk", "pi3k-akt-mtor"],
  }),
  t({
    asOf:"2026-11-08", notes:["An extracellular EGF ligand can change intracellular kinase signaling without entering the cell. Estrogen and progesterone bind their distinct intracellular receptors, which can regulate transcription with different forms and cellular partners. PD-1 engagement can restrain responding T-cell activity, so receptor activation is not always activation of tumor growth. FAP is a surface protease used as a targeting address, not a hormone/growth-factor receptor in this comparison.","Keep free versus added ligand, binding conditions, receptor accessibility, receiving cell, endpoint and time with the result. Surface staining, purified binding and living-cell response are separate assays. Growth dependence requires an appropriate functional perturbation; none of these observations alone establishes clinical eligibility."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Ligand_(biochemistry)"},{"label":"OpenStax Biology 2e: 9-1-signaling-molecules-and-cellular-receptors","url":"https://openstax.org/books/biology-2e/pages/9-1-signaling-molecules-and-cellular-receptors"},{"label":"An allosteric mechanism for activation of the kinase domain of epidermal growth factor receptor.","url":"https://pubmed.ncbi.nlm.nih.gov/16777603/"},{"label":"Engagement of the PD-1 immunoinhibitory receptor by a novel B7 family member leads to negative regulation of lymphocyte activation.","url":"https://pubmed.ncbi.nlm.nih.gov/11015443/"},{"label":"Fibroblast activation protein, a dual specificity serine protease expressed in reactive human tumor stromal fibroblasts.","url":"https://pubmed.ncbi.nlm.nih.gov/10593948/"},{"label":"Functional domains of the human estrogen receptor.","url":"https://pubmed.ncbi.nlm.nih.gov/3690665/"},{"label":"Mapping and characterization of the functional domains responsible for the differential activity of the A and B isoforms of the human progesterone receptor.","url":"https://pubmed.ncbi.nlm.nih.gov/9407067/"}],
    id: "ligand", name: "Ligand", category: BIO,
    aka: ["ligands", "binding partner"],
    tldr: "A ligand binds a molecular partner. Binding does not necessarily activate a receptor or prove that a treatment will help.",
    summary: "Hormones, growth factors and other molecules can bind receptors, but ligand describes the interaction rather than one functional effect. A bound ligand may activate a specified response, oppose another ligand, or show no effect in that assay. Some targeting ligands localize a payload. An accessible binding address need not be a cancer’s growth driver; delivery, intracellular action and clinical benefit require further evidence.",
    wikipedia: W("Ligand_(biochemistry)"),
    related: ["receptor","growth-factor","cytokine","agonist-antagonist","binding-affinity-and-kinetics","egfr","pd1","pgr","fap"], targets: ["vegf", "psma"], technologies: ["antiangiogenic", "radioligand-therapy"],
  }),
  t({
    id: "growth-factor", name: "Growth factor", category: BIO,
    aka: ["growth factors", "growth-factor", "growth-factors", "epidermal growth factor", "vascular endothelial growth factor"],
    tldr: "A protein released by one cell that tells nearby cells to grow, divide or survive. Cancers often make their own or become hypersensitive to it.",
    summary: "Growth factors are ligands for receptors on the cell surface; EGF, HER-family ligands, FGFs, IGF-1, HGF and VEGF each bind a specific receptor family and trigger the same core pathways (RAS-MAPK, PI3K-AKT). In normal tissue their supply is limited, which caps growth; a tumour that secretes its own growth factor or carries a receptor that fires without one has removed that cap. VEGF is the growth factor for blood vessels and the target of anti-angiogenic drugs, and TGF-beta is a growth factor that paradoxically restrains early tumours but helps late ones invade and hide from the immune system.",
    wikipedia: W("Growth_factor"),
    related: ["growth-signal", "ligand", "receptor", "angiogenesis", "signalling-pathway"], targets: ["egfr", "vegf", "met"], pathways: ["ras-mapk", "vegf-angiogenesis"],
  }),
  t({
    id: "growth-signal", name: "Growth signal", category: BIO,
    aka: ["growth signals", "growth-signal", "growth-signals", "growth signalling", "growth signaling", "growth-signalling", "growth-signaling", "proliferative signal", "proliferative signals", "proliferative signalling", "proliferative signaling", "pro-growth signal", "pro-growth signals", "signal to grow", "grow and divide"],
    tldr: "The instruction a cell receives to grow and divide. Normal cells wait for it; cancer cells fake it, so they keep dividing whether or not the body wants more of them.",
    summary: "A growth signal begins when a growth factor binds a receptor, passes through a chain of kinases inside the cell (the RAS-MAPK and PI3K-AKT pathways are the two main routes), and ends in the nucleus, where genes for cell division are switched on. Cancers generate the signal without permission by overexpressing receptors, mutating them so they fire on their own, or mutating a downstream relay such as KRAS or BRAF so the message is sent regardless of what happens upstream. 'Sustaining proliferative signalling' is the first of the hallmarks of cancer, and cutting the signal at some point along the chain is what most targeted therapies do.",
    wikipedia: W("Cell_signaling"),
    related: ["growth-factor", "receptor", "signalling-pathway", "downstream", "kinase", "sustaining-proliferative-signaling", "targeted-therapy-term"], pathways: ["ras-mapk", "pi3k-akt-mtor"], targets: ["kras", "braf", "egfr"],
  }),
  t({
    asOf:"2026-11-08", notes:["Time, input, cell type and feedback affect interpretation. An isolated-enzyme assay, one cellular phosphosite and a growth/death outcome measure different properties. Test dependence with suitable functional outcomes and an independent perturbation, controlling exposure, cell entry and unrelated effects."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Signal_transduction"},{"label":"OpenStax Biology 2e: 9-2-propagation-of-the-signal","url":"https://openstax.org/books/biology-2e/pages/9-2-propagation-of-the-signal"},{"label":"Growth factor-induced MAPK network topology shapes Erk response determining PC-12 cell fate.","url":"https://pubmed.ncbi.nlm.nih.gov/17310240/"},{"label":"An allosteric mechanism for activation of the kinase domain of epidermal growth factor receptor.","url":"https://pubmed.ncbi.nlm.nih.gov/16777603/"}],
    id: "signalling-pathway", name: "Signalling pathway", category: BIO,
    aka: ["signalling pathways", "signaling pathway", "signaling pathways", "pathway", "pathways", "signalling cascade", "signaling cascade", "signal transduction", "cell signalling", "cell signaling", "intracellular signalling", "intracellular signaling"],
    tldr: "A signaling pathway connects an input to cellular changes. Real pathways branch, interact and feed back, so one changed marker does not describe the whole network.",
    summary: "Signal transduction uses receptors, second messengers, switches, scaffolds, enzymes and gene regulation in intersecting networks. Not every component is a kinase: RAS is a switch regulated by GTP binding and hydrolysis, and scaffolds organize partners. Kinases can modify proteins or lipids. Responses may involve movement, metabolism, growth, survival or differentiation. The RAS–RAF–MEK–ERK and PI3K–AKT–mTOR systems are examples, rather than a single universal surface-to-nucleus chain.",
    wikipedia: W("Signal_transduction"),
    related: ["growth-signal","downstream","kinase","receptor","resistance","phosphorylation","feedback-and-feedforward","gene-expression"], pathways: ["ras-mapk", "pi3k-akt-mtor", "wnt", "er-signaling", "ar-signaling"],
  }),
  t({
    id: "downstream", name: "Downstream and upstream", category: BIO,
    aka: ["downstream", "upstream", "downstream of", "upstream of", "downstream signalling", "downstream signaling", "downstream effector", "downstream effectors", "downstream target", "downstream targets"],
    tldr: "Position in a signalling chain: upstream proteins send the message, downstream proteins receive it. A mutation downstream of a drug's target can make the drug useless.",
    summary: "In the RAS-MAPK pathway, the EGFR receptor is upstream of RAS, which is upstream of RAF, MEK and ERK; the nucleus is the far downstream end. The direction matters for treatment because blocking an upstream protein does nothing if a downstream one is already stuck on: EGFR antibodies fail in colorectal cancers with KRAS mutations because KRAS sits below EGFR and fires regardless. The same logic explains why resistance so often emerges downstream of a drug target and why combination therapy sometimes pairs an upstream and a downstream inhibitor.",
    wikipedia: W("Signal_transduction"),
    related: ["signalling-pathway", "growth-signal", "kinase", "resistance"], pathways: ["ras-mapk", "pi3k-akt-mtor"], targets: ["egfr", "kras", "braf"],
  }),
  t({
    asOf:"2026-11-08", notes:["Assay ATP/substrate concentrations, enzyme amount, timing and endpoint matter. A lower cellular phosphosite signal is not automatically direct inhibition, suppression of an entire pathway or reduced growth. Active-site, allosteric and other inhibitory mechanisms need their own evidence."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Kinase"},{"label":"OpenStax Biology 2e: 9-2-propagation-of-the-signal","url":"https://openstax.org/books/biology-2e/pages/9-2-propagation-of-the-signal"},{"label":"OpenStax Biology 2e: 6-5-enzymes","url":"https://openstax.org/books/biology-2e/pages/6-5-enzymes"},{"label":"An allosteric mechanism for activation of the kinase domain of epidermal growth factor receptor.","url":"https://pubmed.ncbi.nlm.nih.gov/16777603/"}],
    id: "kinase", name: "Kinase", category: BIO,
    aka: ["kinases", "tyrosine kinase", "tyrosine kinases", "protein kinase", "protein kinases", "kinase domain", "tyrosine kinase inhibitor", "tyrosine kinase inhibitors", "TKI", "TKIs"],
    tldr: "A kinase transfers a phosphate group to a substrate. The effect depends on which molecule and site are modified.",
    summary: "Many protein kinases transfer phosphate from ATP to selected substrate residues, commonly serine, threonine or tyrosine, leaving ADP. Phosphatases remove phosphate through a different reaction, rather than simply making ATP by reversing kinase activity. Kinases can also modify lipids, as PI3K does. Protein amount is distinct from catalytic activity, and not every relay protein is a kinase. In the defined EGFR asymmetric-dimer mechanism, activation-loop phosphorylation was not required for activation.",
    wikipedia: W("Kinase"),
    related: ["phosphorylation","enzyme","inhibitor","receptor","signalling-pathway","oncogene-addiction","resistance","binding-affinity-and-kinetics"], technologies: ["kinase-inhibitors", "cdk46-inhibitor"], targets: ["egfr", "alk", "braf", "cdk4-6"], drugs: ["imatinib", "osimertinib", "lorlatinib"],
  }),
  t({
    asOf:"2026-11-08", notes:["A phosphosite signal depends on modified molecules, parent-protein amount, recovery and measurement. It is not automatically site occupancy, the fraction modified at that site. A parent-normalized ratio may be informative without becoming an absolute occupancy percentage. Retain site identity/localization confidence, method, specimen handling and time.","This modifies existing molecules and is distinct from changing DNA sequence, RNA production or mitochondrial oxidative phosphorylation. One site alone need not identify the responsible enzyme or the state of a whole pathway."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Protein_phosphorylation"},{"label":"OpenStax Biology 2e: 9-2-propagation-of-the-signal","url":"https://openstax.org/books/biology-2e/pages/9-2-propagation-of-the-signal"},{"label":"OpenStax Biology 2e: 16-6-eukaryotic-translational-and-post-translational-gene-regulation","url":"https://openstax.org/books/biology-2e/pages/16-6-eukaryotic-translational-and-post-translational-gene-regulation"},{"label":"Dephosphorylation or antibody binding to the carboxy terminus stimulates pp60c-src.","url":"https://pubmed.ncbi.nlm.nih.gov/2432403/"},{"label":"Ischemia in tumors induces early and sustained phosphorylation changes in stress kinase pathways but does not affect global protein levels.","url":"https://pubmed.ncbi.nlm.nih.gov/24719451/"}],
    id: "phosphorylation", name: "Phosphorylation", category: BIO,
    aka: ["phosphorylated", "phosphorylates", "phosphate group", "phosphate groups", "dephosphorylation", "phospho-", "phosphorylate"],
    tldr: "Adding phosphate can change a protein’s behavior in several ways. The site and cellular context determine whether a measured change indicates activation, inhibition or something else.",
    summary: "Protein kinases commonly transfer phosphate from ATP to a substrate, producing ADP. Protein phosphatases remove phosphate by hydrolysis without regenerating ATP. A modification can affect catalysis, binding, localization or interactions; sites on one protein can have different functions. Src experiments demonstrated an inhibitory tail-phosphorylation mechanism in their defined preparation, so phosphorylation should not be treated as universal activation.",
    wikipedia: W("Protein_phosphorylation"),
    related: ["kinase","signalling-pathway","enzyme","growth-signal","protein","proteomics","pathway-activation-state"], pathways: ["ras-mapk", "pi3k-akt-mtor"],
  }),
  t({
    id: "inhibitor", name: "Inhibitor", category: BIO,
    aka: ["inhibitors", "inhibits", "inhibited", "inhibition", "inhibiting", "blocker", "blockers", "blockade", "small-molecule inhibitor", "small-molecule inhibitors", "small molecule inhibitor", "small molecule inhibitors"],
    tldr: "A drug that blocks a specific protein from doing its job, usually by lodging in the pocket the protein needs to work. Most targeted cancer drugs are named after what they inhibit.",
    summary: "Inhibitors can bind reversibly (competing with the natural substrate) or irreversibly (forming a permanent bond, as afatinib does with EGFR), and can bind the active site or a separate pocket that distorts the protein (allosteric inhibition, as sotorasib does with KRAS G12C). The name usually tells you the target: PARP inhibitor, CDK4/6 inhibitor, checkpoint inhibitor, aromatase inhibitor. Because inhibitors only block rather than remove a protein, the cell can escape by making more of it, mutating the pocket, or rerouting the signal; degraders, which destroy the protein, are one answer.",
    wikipedia: W("Enzyme_inhibitor"),
    related: ["kinase", "enzyme", "agonist-antagonist", "targeted-therapy-term", "resistance"], technologies: ["kinase-inhibitors", "parp-inhibitor", "cdk46-inhibitor", "kras-inhibitors", "protac-degrader"], drugs: ["sotorasib", "olaparib", "palbociclib"],
  }),
  t({
    asOf:"2026-11-08", notes:["Kd describes binding under specified conditions. Functional EC50 describes half of the compound’s defined response change in that assay. Measure concentration curves, baseline, a reference agonist, receptor/system context, timing and toxicity controls. Suppressing a signal through toxicity does not prove inverse agonism. Receptor efficacy is not clinical efficacy.","Chidiac and colleagues examined agonist-independent beta-adrenergic signaling in expressed-receptor systems. This establishes a mechanistic distinction in those systems, rather than classifying every ligand in every tissue."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Agonist"},{"label":"IUPAC: affinity, antagonism and efficacy","url":"https://iupac.qmul.ac.uk/medchem/ah.html"},{"label":"IUPAC: partial agonism","url":"https://iupac.qmul.ac.uk/medchem/ix.html"},{"label":"Inverse agonist activity of beta-adrenergic antagonists.","url":"https://pubmed.ncbi.nlm.nih.gov/7908406/"},{"label":"Operational models of pharmacological agonism.","url":"https://pubmed.ncbi.nlm.nih.gov/6141562/"},{"label":"International Union of Pharmacology Committee on Receptor Nomenclature and Drug Classification. XXXVIII. Update on terms and symbols in quantitative pharmacology.","url":"https://pubmed.ncbi.nlm.nih.gov/14657418/"}],
    id: "agonist-antagonist", name: "Agonist and antagonist", category: BIO,
    aka: ["agonist","agonists","antagonist","antagonists","receptor agonist","receptor antagonist","receptor agonists","full agonist","partial agonist","neutral antagonist","inverse agonist","EC50"],
    tldr: "Agonists promote a specified receptor response; antagonists oppose agonist action. The labels depend on the measured system, and strong binding does not necessarily mean strong activation.",
    summary: "A full agonist can reach a system’s maximal measured response. A partial agonist has lower activating capacity; its observed maximum depends on receptor amount and amplification and is not defined by giving a smaller dose of a full agonist. Competing partial agonists can reduce a full agonist’s response when they replace it. A neutral antagonist opposes agonist action without changing agonist-independent baseline activity; an inverse agonist reduces that activity when it is measurable. Antagonism need not use the agonist’s binding site.",
    wikipedia: W("Agonist"),
    related: ["receptor","ligand","inhibitor","hormone-therapy","binding-affinity-and-kinetics","receptor-reserve","biased-agonism"], targets: ["estrogen-receptor", "androgen-receptor"], technologies: ["sting-agonist", "endocrine-therapy", "androgen-deprivation"],
  }),

  // =====================================================================================
  // Antibodies and antigens
  // =====================================================================================
  t({
    id: "antibody", name: "Antibody", category: BIO,
    aka: ["antibodies", "immunoglobulin", "immunoglobulins", "IgG", "therapeutic antibody", "therapeutic antibodies", "antibody-based", "antibody drug", "antibody drugs"],
    tldr: "A typical IgG antibody has antigen-binding arms and a stem that can interact with other parts of the immune system. Binding alone does not specify its function.",
    summary: "A typical IgG has two antigen-binding arms; receptor binding and cross-reactivity depend on the particular molecule and test system, while its stem (the Fc region) can recruit immune cells and complement or extend the antibody's life in the blood. Therapeutic antibodies block growth receptors (trastuzumab on HER2, cetuximab on EGFR), release the brakes on T cells (pembrolizumab on PD-1), flag cancer cells for immune killing (rituximab on CD20), or serve as the targeting vehicle of ADCs and radioimmunotherapy. Bispecific formats have two binding specificities. Some are designed to bring a T cell and a target cell together; their structures and functions vary. Fab, the arm with the binding site, and Fc, the stem, are separate parts: binding does not guarantee killing, and Fc effector contacts need compatible effector cells or complement. Antibodies that bind the same target can act differently: a blocking antibody, an antibody-drug conjugate and a bispecific format can share a target and still differ in what follows.",
    wikipedia: W("Antibody"),
    related: [
  "antigen",
  "epitope",
  "monoclonal",
  "adcc",
  "fc-effector",
  "immune-system",
  "b-cell",
  "antibody-structure",
  "adcc-adcp-cdc",
  "isotypes-and-fc-silencing"
], technologies: ["monoclonal-antibody", "bispecific-antibody", "adc", "checkpoint-inhibitor", "t-cell-engager"], drugs: ["trastuzumab", "pembrolizumab"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Antibody"
  },
  {
    "label": "IgG subclasses and allotypes: from structure to effector functions.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25368619/"
  },
  {
    "label": "Effector-attenuating Substitutions That Maintain Antibody Stability and Reduce Toxicity in Mice.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28077575/"
  }
]
}),
  t({
    id: "antigen", name: "Antigen", category: BIO,
    aka: ["antigens", "tumour antigen", "tumour antigens", "tumor antigen", "tumor antigens", "target antigen", "target antigens", "antigenic", "tumour-associated antigen", "tumour-associated antigens", "tumor-associated antigen", "tumor-associated antigens", "antigen-negative", "antigen loss"],
    tldr: "An antigen is a molecular target an immune receptor can recognise. Recognition alone does not establish immune activation or safe tumour targeting.",
    summary: "Most cancer antigens are ordinary human proteins that a tumour makes in unusual amounts (HER2, TROP2, CD19, PSMA), so drugs targeting them also touch normal cells that carry a little; truly tumour-specific antigens arise from mutations (neoantigens) or from viral proteins. A good drug antigen is abundant on tumour cells, scarce on essential normal tissue, and stable over time. Tumours escape by losing the antigen, which is how CD19-negative relapse defeats CAR-T, and by hiding the pieces of antigen they would normally display to T cells. Recognition differs from immunogenicity, the ability to elicit an immune response in a particular setting. An antibody can recognise an accessible part of a molecule directly, whereas a conventional peptide-directed T-cell receptor recognises a processed peptide together with a particular HLA molecule, so a surface-expression result cannot by itself establish peptide-HLA display. A self molecule can be an antigen, and tumour-associated is not the same as tumour-specific.",
    wikipedia: W("Antigen"),
    related: [
  "antibody",
  "epitope",
  "neoantigen",
  "t-cell",
  "antigen-presentation-immunoediting",
  "resistance",
  "hla",
  "tumor-associated-antigen",
  "antigen-processing-machinery"
], targets: ["her2", "trop2", "cd19", "psma", "bcma"], technologies: ["adc", "car-t", "t-cell-engager"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Antigen"
  },
  {
    "label": "Structure of the complex between human T-cell receptor, viral peptide and HLA-A2.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/8906788/"
  },
  {
    "label": "IgG subclasses and allotypes: from structure to effector functions.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25368619/"
  }
]
}),
  t({
    id: "epitope", name: "Epitope", category: BIO,
    aka: ["epitopes", "binding site", "binding sites", "binding domain", "binding domains"],
    tldr: "An epitope is the molecular feature an immune receptor recognises. Antibodies and T-cell receptors can recognise different surfaces from the same source protein.",
    summary: "An epitope is a molecular feature recognised by an immune receptor; its definition depends on the receptor and the tested molecular preparation. Trastuzumab and pertuzumab both bind HER2 but at different epitopes, which is why they can be given together, and zanidatamab is a single antibody built to grab both spots at once. For T cells, the epitope is a short peptide fragment held in an HLA molecule on the cell surface; an alteration that changes recognition can permit escape, but its effects on processing, display and other cell functions need their own evidence. The epitope an antibody recognises can be a continuous stretch of sequence or a surface formed by folding, so distant parts of the chain can meet; accessibility matters, and binding to an isolated protein does not show the same site is reachable on an intact cell. For a conventional T-cell receptor the target is the peptide together with the restricting HLA molecule, and the same peptide on another HLA molecule is a different recognition surface.",
    wikipedia: W("Epitope"),
    related: [
  "antigen",
  "antibody",
  "neoantigen",
  "t-cell",
  "antibody-structure",
  "hla"
], targets: ["her2"], drugs: ["trastuzumab", "zanidatamab"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Epitope"
  },
  {
    "label": "Structure of the complex between human T-cell receptor, viral peptide and HLA-A2.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/8906788/"
  },
  {
    "label": "Structure of a covalently stabilized complex of a human alphabeta T-cell receptor, influenza HA peptide and MHC class II molecule, HLA-DR1.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11060013/"
  },
  {
    "label": "IgG subclasses and allotypes: from structure to effector functions.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25368619/"
  },
  {
    "label": "Review: Fundamentals and Methods for T- and B-Cell Epitope Prediction.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29445754/"
  }
]
,
"notes": [
  "The accessible epitope-prediction review distinguishes sequential residues from discontinuous exposed patches. This supplies review support for linear versus conformational epitopes, not a universal prediction-accuracy claim."
]
}),
  t({
    id: "monoclonal", name: "Monoclonal", category: BIO,
    aka: ["monoclonal antibody", "monoclonal antibodies", "mAb", "mAbs", "monoclonals"],
    tldr: "Made from a single clone of cells, so every antibody molecule in the vial is identical and binds exactly the same spot. All therapeutic antibodies are monoclonal.",
    summary: "The immune system normally produces a mixture of antibodies against a target (polyclonal); the 1975 hybridoma technique of Köhler and Milstein made it possible to immortalise a single antibody-producing cell and harvest one uniform antibody from it. Early monoclonals were mouse proteins that the human body rejected; successive generations were chimeric (-ximab), humanised (-zumab) and fully human (-umab), and are now produced in cultured mammalian cells at ton scale. The word also describes tumours themselves: cancers are clonal, descending from a single cell, though they diversify into subclones over time.",
    wikipedia: W("Monoclonal_antibody"),
    related: ["antibody", "antigen", "b-cell", "cell-line"], technologies: ["monoclonal-antibody"],
  }),

  // =====================================================================================
  // Cell life and death
  // =====================================================================================
  t({
    asOf:"2026-11-08", notes:["DNA-content measurements commonly group G0/G1 and G2/M because each pair shares a DNA-content range. Appropriate additional markers and doublet discrimination are needed: two cells can resemble one cell with more DNA.","A Ki-67-positive fraction or snapshot phase distribution is not a division rate or a population doubling time. Time-resolved proliferation and cell-loss measurements answer further questions. CDK4/6 inhibitors and spindle-directed drugs affect different parts of the cycle."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cell_cycle"},{"label":"OpenStax Biology 2e: 10-2-the-cell-cycle","url":"https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle"},{"label":"OpenStax Biology 2e: 10-3-control-of-the-cell-cycle","url":"https://openstax.org/books/biology-2e/pages/10-3-control-of-the-cell-cycle"},{"label":"Assaying Cell Cycle Status Using Flow Cytometry.","url":"https://pubmed.ncbi.nlm.nih.gov/26131851/"},{"label":"Doublet discrimination in DNA cell-cycle analysis.","url":"https://pubmed.ncbi.nlm.nih.gov/11746105/"}],
    id: "cell-cycle", name: "Cell cycle", category: BIO,
    aka: ["cell-cycle", "cell cycle arrest", "cell-cycle arrest", "G1 phase", "S phase", "G2 phase", "M phase", "mitosis", "mitotic"],
    tldr: "Cells preparing to divide pass through regulated stages for growth, DNA copying and chromosome separation. Some cells remain functional while outside that cycle.",
    summary: "G1 prepares the cell, S copies DNA, and G2 precedes the mitotic phase. Mitosis separates nuclear chromosomes; cytokinesis separates cytoplasm into daughter cells. G0 describes a noncycling state, which need not mean death or loss of function. Cyclins, CDKs and checkpoints regulate transitions, and their alteration can contribute to cancer without making every checkpoint absent or guaranteeing error-free division. Cell-cycle checkpoints and immune checkpoints describe different biological processes.",
    wikipedia: W("Cell_cycle"),
    related: ["cell-division","proliferation","tumour-suppressor-gene","kinase","chemotherapy-term","cell-lineage-and-state"], pathways: ["p53-cell-cycle"], targets: ["cdk4-6", "tp53", "wee1"], technologies: ["cdk46-inhibitor"], drugs: ["palbociclib", "ribociclib", "abemaciclib", "paclitaxel"],
  }),
  t({
    asOf:"2026-11-09", notes:["Growth arrest and cell death need separate measurements. A population count reflects both production and loss. In adult mouse sensory-neuron cultures, paclitaxel disrupted distal axon growth without requiring cell division; this defined experimental model does not predict every clinical toxicity or treatment effect.","Side effects are not a test of whether chemotherapy is controlling a tumor. NCI explicitly separates those observations; clinical assessment needs the appropriate examination, imaging or other response evaluation. A proliferation-marker fraction also does not by itself measure treatment benefit.","A lower cell count at one time can reflect slower division, cell loss or both; surviving cells may later resume growth. Colony-formation assays assess whether individual cells can produce descendants under the chosen culture conditions over a longer observation period. The result depends on the model and assay format. Neither a short growth assay nor colony formation alone establishes durable tumor control in a person."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cell_division"},{"label":"OpenStax Biology 2e: 10-2-the-cell-cycle","url":"https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle"},{"label":"NCI: chemotherapy mechanisms and healthy-cell effects","url":"https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"},{"label":"Neurotoxic mechanisms of paclitaxel are local to the distal axon and independent of transport defects.","url":"https://pubmed.ncbi.nlm.nih.gov/27894788/"},{"label":"Assaying Cell Cycle Status Using Flow Cytometry.","url":"https://pubmed.ncbi.nlm.nih.gov/26131851/"},{"label":"Franken and colleagues: clonogenic reproductive survival in vitro","url":"https://pubmed.ncbi.nlm.nih.gov/17406473/"},{"label":"Brix and colleagues: model and format limits of clonogenic assays","url":"https://pubmed.ncbi.nlm.nih.gov/34697469/"}],
    id: "cell-division", name: "Cell division", category: BIO,
    aka: ["cell divisions","divide","dividing","divides","dividing cells","rapidly dividing","fast-dividing","replicating","cell replication"],
    tldr: "Cell division produces daughter cells for growth and renewal. Chemotherapy can disrupt this process and can also affect cells through mechanisms beyond division.",
    summary: "DNA copying, chromosome segregation and cytokinesis are distinct steps; errors or unequal allocation can make daughters differ. Many cytotoxic drugs affect DNA or microtubules, with drug-specific dependence on cell-cycle state. Normal renewing tissues can also be affected. Division history cannot be read directly from a mutation count: damage, repair, selection and other processes contribute. Ki-67 staining and a mitotic count describe particular sampled properties, not a universal rate of cell production.",
    wikipedia: W("Cell_division"),
    related: ["cell-cycle","proliferation","mutation","tumour-grade","chemotherapy-term","cell-lineage-and-state"], technologies: ["cytotoxic-chemotherapy"],
  }),
  t({
    id: "proliferation", name: "Proliferation", category: BIO,
    aka: ["proliferate", "proliferating", "proliferative", "cell proliferation", "anti-proliferative", "antiproliferative", "Ki-67", "Ki67", "proliferates"],
    tldr: "Rapid multiplication of cells. A tumour's proliferation rate, often measured by the marker Ki-67, tells you how fast it is growing and how it may respond to treatment.",
    summary: "Proliferation is the net result of cell division outpacing cell death; in a healthy tissue the two are balanced, and a tumour is a tissue where the balance has tipped. Pathologists estimate it by counting cells in mitosis or staining for Ki-67, a protein present only in dividing cells; a high index means an aggressive tumour that may respond well to chemotherapy but relapse quickly, a low index a slower tumour that may suit hormone therapy or watchful waiting. 'Sustaining proliferative signalling' is the first hallmark of cancer, and 'anti-proliferative' describes any drug that slows division rather than killing cells outright.",
    wikipedia: W("Cell_proliferation"),
    related: ["cell-division", "cell-cycle", "growth-signal", "tumour-grade", "sustaining-proliferative-signaling"],
  }),
  t({
    asOf:"2026-11-08", links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cellular_differentiation"},{"label":"NIGMS: stem cells and differentiation","url":"https://www.nigms.nih.gov/biobeat/2024/11/what-are-stem-cells"},{"label":"Lineage tracing on transcriptional landscapes links state to fate during differentiation.","url":"https://pubmed.ncbi.nlm.nih.gov/31974159/"}],
    id: "differentiation", name: "Differentiation", category: BIO,
    aka: ["differentiated", "well-differentiated", "poorly differentiated", "poorly-differentiated", "undifferentiated", "dedifferentiation", "dedifferentiated", "de-differentiation", "lineage", "lineage plasticity", "cell of origin"],
    tldr: "Differentiation develops specialized cellular properties. In pathology, resemblance to a mature tissue can contribute to grading, whose meaning depends on the cancer.",
    summary: "Differentiation concerns development of specialized cell features and functions. Stem or progenitor ancestry, current state and genetic clone are distinct questions. In cancer pathology, well or poorly differentiated describes resemblance to a mature tissue within the applicable classification; it is not a universal rule that one category grows at a particular speed. Tumor plasticity can change marker expression or lineage programs. A present-day expression cluster alone does not reconstruct the cell’s ancestry or prove a reversal of its developmental history.",
    wikipedia: W("Cellular_differentiation"),
    related: ["tumour-grade","histology","stem-cell","resistance","cancer-stem-cells-plasticity","cell-lineage-and-state","lineage-plasticity-neuroendocrine","tumour-grade"], cancers: ["prostate", "nsclc", "sclc"],
  }),
  t({
    id: "stem-cell", name: "Stem cell", category: BIO,
    aka: ["stem cells", "stem-cell", "stem-cells", "cancer stem cell", "cancer stem cells", "haematopoietic stem cell", "hematopoietic stem cell", "stem cell transplant", "stem-cell transplant", "bone marrow transplant", "haematopoietic stem cells", "hematopoietic stem cells"],
    tldr: "A cell that can both copy itself indefinitely and produce the specialised cells of a tissue. Cancers may be sustained by a small population of stem-like cells that survive treatment and regrow the tumour.",
    summary: "Blood stem cells in the bone marrow make every red cell, white cell and platelet for life, which is why chemotherapy that damages them causes anaemia, infection risk and bleeding, and why a stem cell transplant can rescue a patient after marrow-destroying high-dose treatment. The cancer stem cell idea holds that tumours are hierarchies too, with a minority of self-renewing cells at the top that are more resistant to chemotherapy and radiation; it is well supported in leukaemia and debated in solid tumours. Drugs aimed at stem-like states (against Wnt, Notch and Hedgehog signalling) have been largely disappointing so far.",
    wikipedia: W("Stem_cell"),
    related: ["differentiation", "bone-marrow", "cancer-stem-cells-plasticity", "tumor-dormancy"], pathways: ["wnt"], technologies: ["allogeneic-cell-therapy"],
  }),
  t({
    id: "apoptosis", name: "Apoptosis", category: BIO,
    aka: [
  "apoptotic",
  "pro-apoptotic",
  "anti-apoptotic",
  "undergo apoptosis",
  "induce apoptosis",
  "induces apoptosis",
  "triggers apoptosis"
],
    tldr: "Apoptosis is a regulated process that dismantles a cell. Whether the dying cell stimulates protective immunity is a separate question.",
    summary: "The mitochondrial route uses BCL-2-family control of BAX and BAK and cytochrome c release. In cell experiments, combined BAX and BAK loss blocked mitochondrial responses to several apoptotic stimuli; this does not establish resistance to all forms of death. Death-receptor signals provide another route. Apoptosis is not inherently immune-silent: anthracycline-treated tumour cells showed calreticulin-dependent immunogenicity in mouse experiments. A death marker, a mitochondrial response and sustained killing answer different questions. Protein abundance alone cannot establish dependence or choose a treatment.",
    wikipedia: W("Apoptosis"),
    related: [
  "necrosis",
  "resisting-cell-death",
  "immunogenic-cell-death",
  "tumour-suppressor-gene",
  "ferroptosis-cell-death",
  "er-stress-and-unfolded-protein-response"
], pathways: ["apoptosis-bcl2", "p53-cell-cycle"], targets: ["bcl2", "tp53"], drugs: ["venetoclax"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Primary source, PMID 11326099",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11326099/"
  },
  {
    "label": "Primary source, PMID 17187072",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17187072/"
  },
  {
    "label": "Source identity and scope, PMID 8689682",
    "url": "https://pubmed.ncbi.nlm.nih.gov/8689682/"
  },
  {
    "label": "Source identity and scope, PMID 9727492",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9727492/"
  },
  {
    "label": "Source identity and scope, PMID 29362479",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29362479/"
  },
  {
    "label": "Source identity and scope, PMID 24355989",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24355989/"
  },
  {
    "label": "Source identity and scope, PMID 11782314",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11782314/"
  },
  {
    "label": "Source identity and scope, PMID 23291630",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23291630/"
  },
  {
    "label": "Source identity and scope, PMID 32209603",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  },
  {
    "label": "Source identity and scope, PMID 22632970",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22632970/"
  },
  {
    "label": "Source identity and scope, PMID 29258294",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29258294/"
  },
  {
    "label": "Source identity and scope, PMID 24439385",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24439385/"
  }
],
"notes": [
  "Intrinsic apoptosis involves mitochondrial outer-membrane permeabilisation, cytochrome c release into the cytosol, apoptosome assembly and caspase-9 activation upstream of executioner caspases such as caspase-3 and caspase-7. Death-receptor signalling can activate caspase-8; BID cleavage links this route to mitochondria. Initiator and executioner roles differ.",
  "The BCL-2 family contains survival proteins, including BCL-2, BCL-XL and MCL-1; BH3-only stress mediators, including BIM, BID and PUMA; and pore-forming effectors BAX and BAK. In experimental cells, loss of both BAX and BAK blocked several mitochondrial apoptotic responses, rather than every possible form of death.",
  "Cytochrome c moves from the mitochondrial intermembrane compartment, including crista stores, across the outer membrane to the cytosol. It does not begin in the matrix. The inner membrane separates these compartments; the spatial sketch is simplified, with no implied pore stoichiometry.",
  "A stain for BCL-XL measures abundance rather than survival dependence. BCL2 and BCL2L1 are different genes, and inhibitor selectivity matters. Souers and colleagues re-engineered dual BCL-2/BCL-XL inhibition into BCL-2-selective ABT-199, sparing human platelets; early tumour lysis in three refractory chronic lymphocytic leukaemia patients does not establish benefit in every tumour. A mitochondrial response, caspase marker, sustained killing and immune protection remain separate outcomes. Keep cell identity, timing, handling controls and later survival or regrowth with cleaved-caspase assays, membrane readouts and microscopy. Mitochondrial BH3 challenges test readiness under a defined protocol, rather than completed killing or clinical benefit.",
  "Compare mechanism, morphology, immune consequence and living arrest separately. Apoptosis uses regulated dismantling; necrotic morphology describes boundary failure; ferroptosis requires iron-dependent lipid damage causing death; immunogenicity requires a compatible adaptive response; senescence is a living arrest. These categories are not mutually exclusive outcomes or a universal appearance-based classifier.",
  "In the fictional killing experiment, rescue by both an iron chelator and a lipid-protecting compound with no caspase-inhibitor rescue supports a ferroptosis hypothesis. Check lipid damage, death timing, perturbation specificity and GPX4 or glutathione-related mechanisms before attribution; immunogenicity is a separate test. A single stain is not enough."
]
}),
  t({
    id: "necrosis", name: "Necrosis", category: BIO,
    aka: ["necrotic", "tumour necrosis", "tumor necrosis", "necrotic core"],
    tldr: "Necrosis describes cell and tissue breakdown with loss of membrane integrity. The appearance alone does not identify its cause.",
    summary: "Necrotic appearance can follow overwhelming injury or regulated death mechanisms. A late membrane-integrity measurement cannot reconstruct the preceding death sequence. Histology describes the sampled region; necrosis there does not establish the absence of viable tumour elsewhere, treatment success or a particular molecular pathway. Distinguish tissue appearance from a mechanism established by controlled perturbation and complementary readouts. Inflammation and antigen-specific adaptive immune protection are separate outcomes.",
    wikipedia: W("Necrosis"),
    related: ["apoptosis", "angiogenesis", "inflammation", "pcr", "immunogenic-cell-death"], cancers: ["glioblastoma"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Primary source, PMID 29362479",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29362479/"
  },
  {
    "label": "Primary source, PMID 32209603",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  },
  {
    "label": "Source identity and scope, PMID 22265413",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22265413/"
  },
  {
    "label": "Source identity and scope, PMID 12110890",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12110890/"
  }
],
"notes": [
  "Necrosis describes loss of membrane integrity and tissue breakdown, rather than one molecular route. Overwhelming injury, regulated mechanisms and late secondary necrosis after apoptosis with inadequate clearance can converge on membrane loss. Necrosis is broader than necroptosis.",
  "RIPK3-dependent MLKL activation is an example regulated necrotic mechanism. Sun and colleagues used biochemical and cellular perturbations to establish MLKL downstream of RIP3; a necrotic region or membrane-impermeant dye alone cannot establish that pathway.",
  "Histology describes the sampled region; viable tumour may remain elsewhere. A membrane-compromised fraction, qualitative tissue necrosis and method-defined necrotic area answer different questions. Handling, delayed fixation and late sampling affect interpretation, and no universal necrosis percentage identifies a death mechanism or proves treatment success. Preparing and staining a section consumes tissue, while live-cell dye assays use tested aliquots and report a defined membrane-compromised fraction. Clinical morphology and experimental pathway perturbation have different validation contexts.",
  "HMGB1-deficient necrotic cells produced less inflammation in defined experiments. That result concerns danger signalling, rather than automatic adaptive immune memory. Dye entry after an intervention cannot establish necroptosis, vaccine activity or clinical benefit without the separate causal and host tests."
]
}),
  t({
    id: "angiogenesis", name: "Angiogenesis", category: BIO,
    aka: ["angiogenic", "anti-angiogenic", "antiangiogenic", "anti-angiogenesis", "new blood vessels", "blood vessel growth", "neovascularisation", "neovascularization", "tumour vasculature", "tumor vasculature", "vascularised", "vascularized", "anti-angiogenics"],
    tldr: "Angiogenesis is the growth of new blood vessels from existing vessels. Vessel number, blood flow, transport and oxygen delivery are different measurements.",
    summary: "Endothelial cells form new vessels in response to signals such as VEGF and its receptors, during normal development and repair as well as disease. Cancer populations can obtain vascular access through new growth or use of existing vessels. Altering this system can affect delivery and local conditions, but a vessel or expression measurement alone does not establish treatment benefit.",
    wikipedia: W("Angiogenesis"),
    related: ["growth-factor", "inducing-angiogenesis", "tumor-microenvironment", "necrosis"], pathways: ["vegf-angiogenesis", "hif-vhl"], targets: ["vegf", "hif2a"], technologies: ["antiangiogenic"], drugs: ["belzutifan", "ivonescimab"],

"notes": [
  "Angiogenesis creates new vessels from existing vessels through endothelial-cell growth and signalling, including VEGF and its receptors. It also occurs in development and repair. A tumour can obtain blood by other routes: Holash and colleagues observed co-option of existing vessels in their tumour models. Vessel structure, perfusion, permeability, tracer transport and oxygenation are separate measurements. Density counts structures within an area; perfusion concerns blood flow through a region; permeability concerns material crossing vessel walls; a tracer readout follows a particular probe. Oxygen availability also depends on diffusion and cellular consumption.",
  "Blocking vascular signalling can change vessel integrity and transport as well as vessel number. Tong studied transport after VEGFR2 blockade; Winkler studied a temporary oxygenation and radiation-response window in mouse brain-tumour models. These are conditional experimental findings. They do not establish a universal dose, treatment schedule or clinical benefit, and excessive loss of useful vessels can limit delivery.",
  "In E2100, 722 participants with metastatic breast cancer were randomised to paclitaxel with or without bevacizumab. Median progression-free survival was 11.8 versus 5.9 months; median overall survival was 26.7 versus 25.2 months, with P=0.16 for overall survival. The progression-free result did not establish an overall-survival benefit. The FDA withdrawn-approvals table records withdrawal of the US first-line HER2-negative metastatic-breast indication on 18 November 2011. That decision concerns a named indication and jurisdiction.",
  "For a vascular measurement, retain the site, region, date, treatment exposure, measured area and counting or imaging method. Vessels per square millimetre describes density; contrast exchange describes a particular transport measurement; VEGF RNA describes expression. None is a direct substitute for oxygen measurement. A vessel-growth mechanism or VEGF signal alone does not establish dependence, selective tumour starvation, safety or individual treatment benefit.",
  "Fictional equal-area fields contain four versus two vessel structures, while separately measured tracer values are 100 versus 160 arbitrary units. The second field has fewer vessels and a higher tracer readout. This is logically possible without establishing its oxygen level or treatment benefit. Drawn arrows are not measured flow rates. A roads analogy or workflow from vessels to delivery organises the questions; each functional step still needs evidence."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Angiogenesis"
  },
  {
    "label": "Holash et al., Vessel cooption, regression, and growth in tumors mediated by angiopoietins and VEGF. (1999)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10373119/"
  },
  {
    "label": "Tong et al., Vascular normalization by vascular endothelial growth factor receptor 2 blockade induces a pressure gradient across the vasculature and improves drug penetration in tumors. (2004)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15172975/"
  },
  {
    "label": "Winkler et al., Kinetics of vascular normalization by VEGFR2 blockade governs brain tumor response to radiation: role of oxygenation, angiopoietin-1, and matrix metalloproteinases. (2004)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15607960/"
  },
  {
    "label": "Miller et al., Paclitaxel plus bevacizumab versus paclitaxel alone for metastatic breast cancer. (2007)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18160686/"
  },
  {
    "label": "NCI: angiogenesis and angiogenesis inhibitors",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/angiogenesis-inhibitors-fact-sheet"
  },
  {
    "label": "FDA: withdrawn cancer accelerated approvals, including the bevacizumab breast indication",
    "url": "https://www.fda.gov/drugs/cancer-approvals/withdrawn-cancer-accelerated-approvals"
  }
],
"asOf": "2026-11-10"
}),

  // =====================================================================================
  // Tumours: kinds and behaviour
  // =====================================================================================
  t({
    id: "benign-vs-malignant", name: "Benign versus malignant", category: BIO,
    aka: ["benign", "malignant", "malignancy", "malignancies", "benign tumour", "benign tumours", "benign tumor", "benign tumors", "malignant tumour", "malignant tumours", "malignant tumor", "malignant tumors", "non-cancerous", "noncancerous", "cancerous"],
    tldr: "Benign growths do not invade or metastasise, but can cause harm by their size or location. Cancer diagnosis depends on tissue and clinical context, not one mutation or growth rate.",
    summary: "Benign and malignant describe different biological behaviours. Invasion and distant spread are separate findings, and some cancers, including leukaemias, do not form solid masses. Pathologists integrate represented cells and tissue organisation with clinical information and appropriate additional tests; a molecular result alone is not a diagnosis.",
    wikipedia: W("Benign_tumor"),
    related: ["invasive-cancer", "in-situ", "metastasis", "tumour-grade", "biopsy", "histology"],

"notes": [
  "Cancer comprises diseases in which cell populations persist and behave abnormally within their tissue context. Normal renewal also involves division, so speed alone, one broken rule or one molecular result does not define cancer. Benign growths can cause harm through their size or location. Blood cancers such as leukaemia need not form a solid lump and can disrupt normal blood production.",
  "Local invasion, in-situ disease and established distant metastasis are distinct findings. An invasive cancer need not have detected distant spread. A breast-cancer metastasis in lung remains breast cancer; primary tissue identity and the location of a deposit are different questions. A tissue-family marker alone does not establish malignancy.",
  "Martincorena studied 234 biopsies from physiologically normal sun-exposed eyelid skin of four adults and found selected mutations in cancer-associated genes. This neither makes every such mutation harmless nor makes one mutation diagnostic of cancer. DNA changes and epigenetic regulation can contribute to behaviour, while the hallmarks framework organises capabilities rather than supplying a diagnostic checklist.",
  "Interpret the represented morphology and tissue relationships together with clinical context and suitable immunostains or molecular tests. Retain the specimen, site, microscopic type, receptor findings, method and final diagnosis. The NCI pathology description includes the specimen source, gross and microscopic assessment and final diagnosis. A negative mutation panel does not exclude cancer; a positive result does not reconstruct every cell’s behaviour, establish drug sensitivity or prove clinical benefit.",
  "In a fictional pair of gene-X scenes, both populations carry the same alteration, but one retains organised tissue relationships and the other shows local invasion. The shared change does not erase that difference or predict identical treatment sensitivity. An epithelial-boundary cartoon illustrates those relationships; it is not a checklist for diagnosing every cancer type."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Benign_tumor"
  },
  {
    "label": "Martincorena et al., selected mutations in normal eyelid skin (2015)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25999502/"
  },
  {
    "label": "NCI: what is cancer?",
    "url": "https://www.cancer.gov/about-cancer/understanding/what-is-cancer"
  },
  {
    "label": "NCI: pathology reports",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
  },
  {
    "label": "NCI: metastatic cancer",
    "url": "https://www.cancer.gov/types/metastatic-cancer"
  }
],
"asOf": "2026-11-10"
}),
  t({
    id: "primary-tumour", name: "Primary tumour", category: BIO,
    aka: ["primary tumours", "primary tumor", "primary tumors", "primary site", "primary cancer", "the primary", "site of origin", "unknown primary", "cancer of unknown primary", "secondary tumour", "secondary tumours", "secondaries", "primary cancers"],
    tldr: "The original tumour where a cancer started. Cancer is named after this site for life: a breast cancer that spreads to the liver is still breast cancer, not liver cancer.",
    summary: "The primary defines the cancer's biology, its likely drivers and its treatment, because the spread cells (metastases or secondaries) inherit its identity; a pathologist can usually recognise the origin from the cells' appearance and markers. Local treatments, surgery and radiotherapy, are aimed at the primary and can cure a cancer that has not spread; once distant metastases exist, removing the primary usually no longer cures, though it may still relieve symptoms. In about two percent of cases, the primary is never found (cancer of unknown primary), and genomic profiling is increasingly used to infer where it came from.",
    wikipedia: W("Primary_tumor"),
    related: ["metastasis", "lesion", "cancer-stage", "tnm-staging", "systemic-vs-local-therapy", "metastatic-cascade"],
  }),
  t({
    id: "metastasis", keyPapers: ["paper-quail-joyce-microenvironment-metastasis-natmed-2013"], name: "Metastasis", category: BIO,
    aka: ["metastases", "metastatic", "metastasise", "metastasize", "metastasised", "metastasized", "metastasising", "metastasizing", "distant spread", "spread to", "secondary cancer", "secondary cancers", "stage IV", "stage 4", "advanced cancer", "advanced disease", "metastatic disease", "advanced cancers"],
    tldr: "Metastasis is the establishment of cancer at a distant site. Finding cells in transit or in another tissue does not by itself demonstrate sustained distant growth.",
    summary: "Cancer cells may leave a primary site, travel through blood or lymph, reach another tissue and establish a growing lesion. Many steps can fail. Regional lymph-node involvement differs from distant metastasis, and the distant deposit retains the identity of the primary cancer. Clinical interpretation depends on the represented sites and disease context.",
    wikipedia: W("Metastasis"),
    related: ["primary-tumour", "metastatic-cascade", "activating-invasion-metastasis", "cancer-stage", "oligometastatic", "systemic-vs-local-therapy", "lymph-node", "disseminated-tumor-cells", "tumor-dormancy", "theories-of-cancer", "seed-and-soil-hypothesis"], journals: ["cancer-metastasis-reviews", "clinical-and-experimental-metastasis"],

"notes": [
  "Local invasion, entry into vessels, transport, exit at another site, survival and sustained outgrowth are different hurdles. Dissemination need not lead to successful distant growth. A circulating tumour cell is found in blood; a disseminated tumour cell has reached tissue away from the primary. Neither observation alone establishes an enlarging distant lesion, and regional lymph-node involvement differs from distant metastasis.",
  "A breast-cancer deposit in lung retains breast primary identity, while a separate lung primary is another possibility requiring tissue and clinical interpretation. Imaging and pathology identify represented sites; research tracking and environmental perturbations address different biological questions. Negative findings retain the sensitivity and sampling limits of the method. Arrival, survival, sustained growth and the mechanism maintaining or ending restraint need separate evidence."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Metastasis"
  },
  {
    "label": "Ghajar et al., The perivascular niche regulates breast tumour dormancy. (2013)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23728425/"
  },
  {
    "label": "Aguirre-Ghiso, Models, mechanisms and clinical evidence for cancer dormancy. (2007)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17957189/"
  },
  {
    "label": "NCI: metastatic cancer and primary-site identity",
    "url": "https://www.cancer.gov/types/metastatic-cancer"
  }
],
"asOf": "2026-11-10"
}),
  t({
    id: "lesion", name: "Lesion", category: CLINIC,
    aka: ["lesions", "target lesion", "target lesions", "nodule", "nodules", "spot on the scan"],
    tldr: "A doctor's neutral word for any abnormal patch of tissue seen on a scan or examination: a lump, a nodule, a shadow. It may or may not be cancer until a biopsy says so.",
    summary: "Radiologists describe lesions by size, shape, edges and behaviour on contrast; suspicious features prompt biopsy, and in trials the measurable 'target lesions' are what RECIST tracks to decide whether a drug is working. A lesion is 'measurable' if it is large enough to be measured reliably (10 mm for most tumours, 15 mm for lymph nodes on their short axis). Precancerous lesions (colon polyps, cervical dysplasia, Barrett's oesophagus) are abnormal tissue that has not yet become invasive cancer and are the target of screening programmes.",
    wikipedia: W("Lesion"),
    related: ["biopsy", "recist", "primary-tumour", "in-situ", "screening"], technologies: ["ct", "mri", "pet-ct"],
  }),
  t({
    id: "carcinoma", name: "Carcinoma", category: BIO,
    aka: ["carcinomas", "epithelial cancer", "epithelial cancers", "epithelial", "epithelium"],
    tldr: "Cancer of the epithelium, the lining tissue that covers surfaces and forms glands. Around 85% of cancers are carcinomas, including breast, lung, colon, prostate and skin cancers.",
    summary: "Epithelial cells line the skin, airways, gut, ducts and glands and are constantly renewed, so they divide often and are exposed to the outside world, which together explains why they generate most cancers. Carcinomas are subdivided by the kind of epithelium they came from, chiefly adenocarcinoma (glandular) and squamous cell carcinoma (flat surface lining), and the distinction affects both treatment and which drugs are licensed. The other broad classes are sarcomas (connective tissue), lymphomas and leukaemias (blood and immune cells), and tumours of the nervous system.",
    wikipedia: W("Carcinoma"),
    related: ["adenocarcinoma", "squamous-cell-carcinoma", "sarcoma-type", "lymphoma-type", "leukaemia-type", "histology"],
  }),
  t({
    id: "adenocarcinoma", name: "Adenocarcinoma", category: BIO,
    aka: ["adenocarcinomas", "glandular", "adenoma", "adenomas", "adeno", "ductal adenocarcinoma", "mucinous adenocarcinoma", "signet ring", "signet-ring", "invasive lobular carcinoma", "lobular", "ductal", "adenocarcinoma-term"],
    tldr: "A carcinoma arising from gland-forming cells, the kind that make mucus, milk, digestive juices or hormones. The most common type of breast, lung, colon, prostate, pancreas and stomach cancer.",
    summary: "Adenocarcinoma cells often still try to form gland-like structures or produce mucus, which is how pathologists recognise them; an adenoma is the benign glandular counterpart, and colon adenocarcinomas in particular begin as adenomas. In lung cancer, the adenocarcinoma versus squamous distinction matters directly for treatment, because the druggable drivers (EGFR, ALK, ROS1, KRAS G12C) are found mostly in adenocarcinomas and pemetrexed is used only in non-squamous disease. Molecular testing of lung adenocarcinoma is now routine at diagnosis.",
    wikipedia: W("Adenocarcinoma"),
    related: ["carcinoma", "squamous-cell-carcinoma", "histology", "genomic-profiling", "tumour-differentiation"], cancers: ["nsclc", "colorectal", "pancreatic", "prostate", "gastric", "esophageal"],
    sections: ["diagnostics"],
  }),
  t({
    id: "squamous-cell-carcinoma", name: "Squamous cell carcinoma", category: BIO,
    aka: ["squamous", "squamous cell", "squamous carcinoma", "squamous carcinomas", "squamous cell carcinomas", "SCC", "non-squamous", "nonsquamous", "squamous-cell", "squamous histology", "epidermoid", "squamous-cell-carcinoma-term"],
    tldr: "A carcinoma arising from the flat, layered cells that line surfaces exposed to wear: skin, mouth, throat, oesophagus, cervix, the larger airways. Often linked to tobacco, sun or HPV.",
    summary: "Squamous cells are stacked like tiles and make keratin, and their cancers keep enough of that character for pathologists to recognise them; the common causes are chronic irritation and carcinogens, which is why they dominate in smokers' airways and oesophagus, in sun-exposed skin, and in HPV-infected cervix, anus and throat. Squamous cancers share some biology across sites (frequent TP53 and CDKN2A loss, PIK3CA and FGFR1 changes) and have proven responsive to immunotherapy and, for skin, to cemiplimab. In lung cancer the label 'non-squamous' on a trial or drug label means adenocarcinoma and its relatives, and excludes squamous disease.",
    wikipedia: W("Squamous-cell_carcinoma"),
    related: ["carcinoma", "adenocarcinoma", "histology", "risk-factor", "hpv-status"], cancers: ["head-and-neck", "esophageal", "cervical", "nsclc"], technologies: ["hpv-vaccine"], drugs: ["cemiplimab"],
    sections: ["diagnostics"],
  }),
  t({
    id: "sarcoma-type", name: "Sarcoma (tissue type)", category: BIO,
    aka: ["sarcomas", "soft-tissue sarcoma", "soft tissue sarcoma", "bone sarcoma", "connective tissue cancer", "mesenchymal", "bone sarcomas", "soft-tissue sarcomas"],
    tldr: "Cancer of the body's connective and supporting tissues: bone, muscle, fat, cartilage, blood vessels, fibrous tissue. Rare (about 1% of adult cancers) but relatively common in children.",
    summary: "Sarcomas come from mesenchymal cells rather than the epithelial lining cells that give rise to carcinomas, and there are more than seventy subtypes, often defined by a specific gene fusion (EWSR1-FLI1 in Ewing sarcoma, SS18-SSX in synovial sarcoma) or by a single driver (KIT in GIST). They are treated in specialist centres by surgery and radiotherapy, with chemotherapy for the more aggressive types; GIST was one of the first solid tumours transformed by a targeted drug (imatinib), and fusion-defined sarcomas are natural candidates for precision approaches. Because they are rare and diverse, sarcomas depend heavily on referral networks, registries and international trials.",
    wikipedia: W("Sarcoma"),
    related: ["carcinoma", "gene-fusion", "rare-cancers", "lymphoma-type"], cancers: ["sarcoma"], targets: ["kit"], drugs: ["imatinib"],
  }),
  t({
    id: "lymphoma-type", name: "Lymphoma (tissue type)", category: BIO,
    aka: ["lymphomas", "lymphoid malignancy", "lymphoid malignancies", "Hodgkin", "non-Hodgkin", "B-cell lymphoma", "B-cell lymphomas", "T-cell lymphoma", "T-cell lymphomas"],
    tldr: "Cancer of lymphocytes, the white blood cells of the immune system, usually growing as masses in lymph nodes, spleen or other organs. It is divided into Hodgkin lymphoma and the non-Hodgkin lymphomas, most of which arise from B cells and keep surface markers such as CD20 that antibodies, ADCs and CAR-T can target.",
    summary: "Most lymphomas arise from B cells and keep surface markers such as CD19, CD20 and CD30, which has made them the proving ground for antibody therapy (rituximab, 1997), ADCs (brentuximab vedotin), CAR-T (axicabtagene, 2017) and bispecific T-cell engagers (glofitamab); diffuse large B-cell lymphoma is the commonest type and is often curable with chemo-immunotherapy. Hodgkin lymphoma, defined by its Reed-Sternberg cells, is highly curable and exceptionally responsive to PD-1 blockade. Lymphomas and leukaemias overlap: the same malignant lymphocyte can present as a mass (lymphoma) or circulate in the blood (leukaemia).",
    wikipedia: W("Lymphoma"),
    related: ["leukaemia-type", "b-cell", "t-cell", "lymph-node", "antibody", "carcinoma"], cancers: ["dlbcl", "hodgkin-lymphoma", "cll"], targets: ["cd19", "cd20"], technologies: ["car-t", "t-cell-engager"], drugs: ["glofitamab", "brentuximab-vedotin", "axicabtagene-ciloleucel"],
  }),
  t({
    id: "leukaemia-type", name: "Leukaemia (tissue type)", category: BIO,
    aka: ["leukaemias", "leukemia", "leukemias", "leukemic", "leukaemic", "blood cancer", "blood cancers", "haematological malignancy", "haematological malignancies", "hematologic malignancy", "hematologic malignancies", "haematological cancer", "haematological cancers", "liquid tumour", "liquid tumours", "acute leukaemia", "chronic leukaemia", "acute leukaemias", "haematologic malignancies", "haematologic malignancy"],
    tldr: "Cancer of the blood-forming cells in the bone marrow, which flood the blood with immature or abnormal white cells and crowd out normal blood production. It has no single lump to remove.",
    summary: "Leukaemias are classed as acute (fast, immature cells, needs urgent treatment) or chronic (slow, more mature cells), and as myeloid or lymphoid by the cell lineage: AML, ALL, CML and CLL. Because leukaemia cells are accessible in blood and marrow, they were the first cancers to be treated with combination chemotherapy (childhood ALL, 1960s), the first with a targeted drug (imatinib for CML, 2001), the first with CAR-T (ALL, 2017), and the first where measuring residual disease guided therapy. Along with lymphomas and myeloma they form the haematological malignancies, which make up roughly a tenth of all cancers.",
    wikipedia: W("Leukemia"),
    related: ["lymphoma-type", "bone-marrow", "stem-cell", "mrd", "carcinoma"], cancers: ["aml", "all-leukemia", "cll", "multiple-myeloma"], drugs: ["imatinib", "venetoclax", "blinatumomab"],
  }),
  t({
    id: "bone-marrow", name: "Bone marrow", category: BIO,
    aka: ["marrow", "bone-marrow", "marrow suppression", "myelosuppression", "myelosuppressive", "blood counts", "blood count", "low blood counts", "neutropenia", "neutropenic", "anaemia", "anemia", "thrombocytopenia"],
    tldr: "The soft tissue inside bones where all blood cells are made. Chemotherapy damages it, causing the low blood counts that limit how much treatment a patient can take.",
    summary: "Blood stem cells in the marrow produce billions of red cells, white cells and platelets each day; because they divide constantly, they are collateral damage for most chemotherapy and for some ADC payloads, radiotherapy to bone and radioligands. The consequences are anaemia (fatigue), neutropenia (infection risk, sometimes life-threatening) and thrombocytopenia (bleeding), which together are the commonest reason for dose delays and reductions. Growth factors such as G-CSF speed recovery of white cells, and a marrow biopsy is how leukaemias and myeloma are diagnosed and monitored.",
    wikipedia: W("Bone_marrow"),
    related: ["stem-cell", "leukaemia-type", "toxicity-grade", "dose", "chemotherapy-term", "transfusion-support"], technologies: ["cytotoxic-chemotherapy"],
  }),

  // =====================================================================================
  // Diagnosis and staging
  // =====================================================================================
  t({
    id: "tumour-grade", name: "Grade", category: CLINIC,
    aka: ["tumour grade", "tumor grade", "grading", "high-grade", "low-grade", "high grade", "low grade", "intermediate-grade", "Gleason", "Gleason score"],
    tldr: "Grade describes how abnormal a tumour looks under the microscope, using a system specific to that cancer. It differs from stage and does not measure an exact growth rate.",
    summary: "Pathologists assess microscopic features under a cancer-specific grading system. In breast cancer, Nottingham grading combines tubule formation, nuclear pleomorphism and mitotic count. The resulting grade can inform prognosis and treatment alongside other findings; it is not a direct clock for growth or a measurement of anatomical spread. Other cancers use different schemes, and adverse-event grade is a separate severity scale.",
    wikipedia: W("Grading_(tumors)"),
    related: ["cancer-stage", "differentiation", "proliferation", "histology", "toxicity-grade", "prognosis"], cancers: ["prostate", "breast-hr-positive", "glioblastoma"],

"asOf": "2026-11-11",
"notes": [
  "In a fictional breast report, grade 3 does not mean stage III and does not show distant metastasis. Grade describes microscopic features; breast stage III is a regional or locally advanced classification rather than an M1 assignment. The same numeral does not join the two systems."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Grading_(tumors)"
  },
  {
    "label": "NCI: breast stages, clinical and pathological assessment, and grading",
    "url": "https://www.cancer.gov/types/breast/stages"
  }
]
}),
  t({
    id: "cancer-stage", name: "Stage", category: CLINIC,
    aka: ["stages", "staging", "stage I", "stage II", "stage III", "stage 1", "stage 2", "stage 3", "early-stage", "early stage", "late-stage", "late stage", "locally advanced", "localised", "localized", "regional spread", "staged", "restaging", "upstaged", "downstaged", "stage IA", "stage IB", "stage IIB", "stage I-III", "stage II-III"],
    tldr: "Stage describes a cancer’s extent under the applicable staging system. Some breast stage groups also incorporate grade and biomarkers; stage alone does not determine an individual outcome.",
    summary: "Staging describes the primary tumour, regional nodes and distant disease under cancer-specific rules. In breast cancer, clinical prognostic assessment uses history, examination, imaging and biopsy findings; surgery-first pathological prognostic assessment adds the surgical findings. Breast prognostic groups incorporate grade and biomarkers alongside TNM, so an anatomical category and a prognostic group are different descriptions. Keep the system, edition, evidence and treatment moment attached rather than applying one universal stage-to-treatment rule.",
    wikipedia: W("Cancer_staging"),
    related: ["tnm-staging", "metastasis", "lymph-node", "tumour-grade", "in-situ", "stage-shift", "prognosis", "screening"],

"asOf": "2026-11-11",
"notes": [
  "Breast stage III concerns regional or locally advanced disease, whereas stage IV denotes distant spread. A high-grade invasive core does not establish either whole-body extent or a certain prognosis. Record the original diagnostic assessment and later residual or recurrent findings separately; a later report does not erase what the earlier specimen showed."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cancer_staging"
  },
  {
    "label": "NCI: breast stages, clinical and pathological assessment, and grading",
    "url": "https://www.cancer.gov/types/breast/stages"
  }
]
}),
  t({
    id: "in-situ", name: "In situ", category: CLINIC,
    aka: ["carcinoma in situ", "in-situ", "ductal carcinoma in situ", "DCIS", "stage 0", "pre-invasive", "preinvasive", "pre-cancer", "precancer", "precancerous", "pre-cancerous", "premalignant", "pre-malignant", "dysplasia", "high-grade dysplasia", "precancers"],
    tldr: "Latin for 'in place': abnormal cells that look like cancer but have not yet broken through the layer they started in. Stage 0. Not yet able to spread, and usually curable by removing it.",
    summary: "Ductal carcinoma in situ (DCIS) of the breast, cervical intraepithelial neoplasia found by smear tests, and high-grade dysplasia in Barrett's oesophagus or colon polyps are all in situ or precancerous lesions; the basement membrane beneath the epithelium is still intact, so the cells have no access to blood or lymph vessels. Screening programmes detect many such lesions, which is both their strength (removing them prevents cancer) and their difficulty (many would never have progressed, so some treatment is overtreatment). Trials such as LORIS and COMET test whether low-risk DCIS can safely be watched rather than removed.",
    wikipedia: W("Carcinoma_in_situ"),
    related: ["invasive-cancer", "cancer-stage", "screening", "benign-vs-malignant", "lesion", "field-cancerisation"],
  }),
  t({
    id: "invasive-cancer", name: "Invasive", category: CLINIC,
    aka: ["invasion", "invasive cancer", "invasive cancers", "invasive disease", "invasive carcinoma", "invasive tumour", "invasive tumor", "invades", "invading", "locally invasive", "infiltrating", "infiltrative", "non-invasive cancer"],
    tldr: "Cancer that has grown through the boundary of the tissue it started in and into the surrounding tissue. This is the step that separates true cancer from in situ disease and gives it access to blood and lymph vessels.",
    summary: "Invasion requires cells to loosen their attachments to neighbours, degrade the basement membrane and surrounding matrix with enzymes, and move; it is the local prelude to metastasis and one of the hallmarks of cancer. On a pathology report 'invasive ductal carcinoma' or 'invasive adenocarcinoma' confirms real cancer, and the depth of invasion (into muscle in bladder cancer, through the bowel wall in colon cancer, in millimetres for melanoma) is a core part of the T component of staging. In trials, 'invasive disease-free survival' counts invasive recurrences and new invasive cancers as events but ignores in situ ones.",
    wikipedia: W("Cancer#Invasion_and_metastasis"),
    related: ["in-situ", "metastasis", "benign-vs-malignant", "cancer-stage", "activating-invasion-metastasis", "efs"], pathways: ["emt"],
  }),
  t({
    id: "lymph-node", name: "Lymph node", category: BIO,
    aka: ["lymph nodes", "lymph-node", "lymph-nodes", "node-positive", "node-negative", "nodal", "nodal involvement", "nodal disease", "lymphatic", "lymphatics", "lymphatic system", "sentinel lymph node", "sentinel node", "axillary nodes", "regional nodes", "regional lymph nodes"],
    tldr: "Small bean-shaped filters along the lymph vessels where immune cells gather. They are often the first place a cancer spreads, so surgeons check them to see how far the disease has gone.",
    summary: "Lymph drains fluid from tissues back to the blood, passing through nodes where T and B cells inspect it for infection; cancer cells that enter lymph vessels lodge in the nearest nodes first, so node involvement (the N in TNM) is a central marker of a cancer's tendency to spread and raises the stage. Sentinel-node biopsy identifies and removes only the first node or two that drain a tumour, sparing patients the arm swelling (lymphoedema) that removing all nodes causes. Lymph nodes are also where immune responses against a tumour are launched, and where immunotherapy needs functioning T cells to be primed. Afferent vessels bring lymph into a node and efferent vessels carry it out, and a draining node names a route and not a finding of cancer. Immune material and cells reach a node by different routes: soluble antigen can reach resident dendritic cells through conduits in the node before migrating dendritic cells arrive (Sixt et al., 2005, mouse), while lymphocytes are recruited from the blood through high endothelial venules (Brulois et al., 2020, mouse). Lymph is interstitial fluid collected by lymph capillaries and returned to the venous blood (National Cancer Institute SEER training), so lymph and blood are different fluids and a sample of one does not stand in for the other. A tertiary lymphoid structure is an ectopic lymphoid aggregate that forms in tissue such as a tumour, and it is not a lymph node (Schumacher and Thommen, 2022). Size on imaging is a measurement in millimetres and not a finding of cancer or priming, and a report should say which node was measured, by what method and when (OnCo reporting advice). A node has a cortex, a paracortex and a medulla, and B cells and T cells home to separate areas within them (Willard-Mack, 2006); in the mouse, a venous population in the medulla was predicted to recruit myeloid cells rather than lymphocytes, which videomicroscopy confirmed (Brulois et al., 2020). In gene-targeted mice, loss of the chemokine receptor CCR7 altered the organisation of lymphoid organs and stopped skin dendritic cells reaching draining nodes (Förster et al., 1999). Arrival of material in a node does not show that priming succeeded. Pathological involvement means cancer was identified in examined tissue, which differs from a drainage route, enlargement or an imaging observation, and a negative sampled node does not certify the unsampled nodes (the National Cancer Institute notes that a false-negative biopsy gives a false sense of security about the extent of cancer).",
    wikipedia: W("Lymph_node"),
    related: ["metastasis", "cancer-stage", "tnm-staging", "lymphoma-type", "immune-system", "t-cell"], technologies: ["sentinel-node"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Lymph_node"
  },
  {
    "label": "The conduit system transports soluble antigens from the afferent lymph to resident dendritic cells in the T cell area of the lymph node.",
    "url": "https://doi.org/10.1016/j.immuni.2004.11.013"
  },
  {
    "label": "CCR7 coordinates the primary immune response by establishing functional microenvironments in secondary lymphoid organs.",
    "url": "https://doi.org/10.1016/s0092-8674(00)80059-8"
  },
  {
    "label": "A molecular map of murine lymph node blood vascular endothelium at single cell resolution.",
    "url": "https://doi.org/10.1038/s41467-020-17291-5"
  },
  {
    "label": "National Cancer Institute: Sentinel Lymph Node Biopsy",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/staging/sentinel-node-biopsy-fact-sheet"
  },
  {
    "label": "Normal structure, function, and histology of lymph nodes.",
    "url": "https://doi.org/10.1080/01926230600867727"
  },
  {
    "label": "National Cancer Institute SEER Training: Introduction to the Lymphatic System",
    "url": "https://training.seer.cancer.gov/anatomy/lymphatic/"
  },
  {
    "label": "Tertiary lymphoid structures in cancer.",
    "url": "https://doi.org/10.1126/science.abf9419"
  }
],
"terms": [
  "tertiary-lymphoid-structures"
]
}),
  t({
    id: "biopsy", name: "Biopsy", category: CLINIC,
    aka: ["biopsies", "biopsied", "tissue sample", "tissue samples", "core biopsy", "needle biopsy", "core needle biopsy", "tissue biopsy", "rebiopsy", "re-biopsy", "surgical biopsy", "excisional biopsy", "fine needle aspiration", "FNA"],
    tldr: "A biopsy removes cells or tissue for examination. The sampled site, method and collection date set the limits of what its findings can show.",
    summary: "Biopsies range from a fine needle drawing up cells, to a core needle removing a sliver of tissue, to surgical removal of the whole lesion; the sample is fixed, sliced, stained and read by a pathologist, and today also tested for protein markers and sequenced for mutations. Tissue is precious and finite, and a single biopsy samples one spot of a tumour that may vary from place to place and change over time, which is why repeat biopsies at progression and blood-based liquid biopsies have become important. Biopsies carry small risks (bleeding, infection, rarely tumour seeding) and some sites, such as the pancreas or brain, are hard to reach.",
    wikipedia: W("Biopsy"),
    related: ["histology", "ihc", "genomic-profiling", "ctdna", "lesion", "biomarker"], technologies: ["histopathology-ihc", "liquid-biopsy", "cgp"],

"asOf": "2026-11-11",
"notes": ["Read a pathology report as an interpretation of a particular specimen. Keep the sampled site, collection date, preparation and method with the finding, and distinguish collection from the date the report became available. An addendum testing old material still describes that old specimen. The final diagnosis integrates the findings; an isolated descriptive word should not replace that interpretation. Pending, qualified or uninterpretable results retain those limits rather than becoming negative findings.","In a fictional pretreatment breast core, high-grade invasive carcinoma and completed triple-negative receptor tests answer different questions. Neither establishes a particular RNA-expression subtype or distant spread. A suspicious regional node that was not sampled is not a signed positive-node pathology finding. If later surgery finds sparse residual invasive carcinoma after treatment, preserve both the original biopsy and the later specimen, with their separate dates and settings; do not turn the first into a post-treatment measurement.","A useful report card keeps microscopic appearance and grade, individual receptor tests, anatomical extent and specimen timing in separate fields. Blank boxes in a teaching illustration contain no patient findings and calculate no stage or forecast. Ask which specimen, date, method and question each label belongs to before combining it with another observation. A small region cannot survey every part of a heterogeneous tumour, and cancer cells, immune cells, supporting tissue and treatment-related changes can coexist in the sample.","A breast report can describe a pretreatment core, a post-treatment needle sample, or tissue removed at surgery. A core collects tissue cylinders, fine-needle aspiration collects cells or fluid, and vacuum-assisted biopsy collects tissue using a vacuum-powered device. Keep the named specimen and each separately submitted part. The gross description records visible features, microscopy records examined sections, and the final diagnosis integrates those findings. A pending test, an unassessable result, a request for more sections and a final negative finding are different states.","Collection, treatment and reporting have separate clocks. In a fictional example, biopsy A is collected on day 0 and surgery specimen B on day 100. An addendum issued on day 120 tests stored material from A: it remains a result from the pretreatment specimen, with no new sampling on day 120. Treatment was planned on days 10, 30, 50 and 80, but administrations were documented on days 10, 50 and 80; day 30 was held. Four planned events therefore mean three documented administrations and one hold. These invented days supply no clinical schedule, hold explanation or response estimate.","Before combining reports, record the site and specimen, collection date, treatment actually delivered before collection, method, final interpretation and pending qualifications. The latest issue date is not necessarily the latest sampled biology. A negative result in one sampled region does not cancel a positive finding elsewhere. A suspicious imaged node and a pathologically positive sampled node are different evidence; neither a core nor a negative sampled node examines every node or organ.","Turn a signed finding into a specific question. A final involved edge raises a local-completion question about the operation, disease at the edge, separately submitted margins and radiation context. Residual invasive disease raises risk and systemic-benefit questions requiring prior treatment, subtype and a matched comparison. For cellularity, name the region and denominator; for differing receptor results, retain both specimens, methods and controls. A treatment interruption needs its cause, severity, recovery and clinical assessment. These questions inform a conversation with the relevant teams rather than forming a mandatory treatment tree.","For a proposed extra assay, name what each possible result would establish and which decision has evidence behind it. A receptor or immune-marker conclusion retains its scoring rule and validated setting; a number alone is not a treatment recommendation. In a fictional residual-TNBC report after chemotherapy and pembrolizumab, residual disease is prognostic information, not a test choosing the next drug. Local completion, future risk, added systemic benefit and whether treatment can be delivered safely remain connected but separate questions.","Read a numerical risk estimate with its cohort, treatment era, endpoint, follow-up and uncertainty. An association is not a personal countdown or an estimate of added-treatment benefit. In a fictional subgroup, a hazard ratio of 0.70 with a confidence interval from 0.35 to 1.40 includes 1, the no-difference value, and remains compatible with substantial benefit or harm. An overall trial result or subgroup point estimate alone does not establish precise benefit for every person. RCB class is not a universal personal percentage, and pCR does not promise cure."],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Biopsy"
  },
  {
    "label": "NCI: pathology reports, specimen details and final interpretation",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
  },
  {
    "label": "NCI: what cancer is, altered cells and the tumour microenvironment",
    "url": "https://www.cancer.gov/about-cancer/understanding/what-is-cancer"
  },
  {
    "label": "NCI: breast stages, clinical and pathological assessment, and grading",
    "url": "https://www.cancer.gov/types/breast/stages"
  },{"label":"ACR and RSNA: ultrasound-guided breast biopsy methods","url":"https://www.radiologyinfo.org/en/info/breastbius"}]
}),
  t({
    id: "histology", name: "Histology", category: CLINIC,
    aka: ["histological", "histologic", "histopathology", "histopathological", "histotype", "histotypes", "histological subtype", "histological subtypes", "pathology report", "pathology", "pathologist", "pathologists", "under the microscope", "H&E", "microscopy", "histologies", "histologic subtype", "variant histology", "variant histologies", "histological-subtype"],
    tldr: "The study of tissue under the microscope. A cancer's histology is what kind of cells it is made of and how they are arranged, which is how a pathologist names it and grades it.",
    summary: "Thin slices of fixed tissue are stained, classically with haematoxylin and eosin (H&E), so that nuclei show purple and the surrounding tissue pink; the pathologist reads cell type, architecture, invasion, grade, and margins, then adds immunohistochemistry and molecular tests as needed. Histology defines the cancer's name (adenocarcinoma, squamous, small cell, sarcoma subtype) and, with stage, is the foundation of treatment; a change in histology at progression, such as an EGFR-mutant adenocarcinoma transforming into small-cell lung cancer, changes therapy entirely. Digital slide scanning and AI models now assist with grading, counting and predicting molecular features from the image alone.",
    wikipedia: W("Histopathology"),
    related: ["biopsy", "ihc", "tumour-grade", "carcinoma", "differentiation", "adenocarcinoma", "squamous-cell-carcinoma", "tumour-differentiation", "core-needle-biopsy"], technologies: ["histopathology-ihc", "digital-pathology-ai", "pathology-foundation-model"],
    sections: ["diagnostics"],
  }),
  t({
    id: "biomarker", name: "Biomarker", category: CLINIC,
    aka: ["biomarkers", "marker", "markers", "molecular marker", "molecular markers", "predictive biomarker", "predictive biomarkers", "prognostic biomarker", "prognostic biomarkers", "biomarker-positive", "biomarker-negative", "biomarker-selected", "biomarker-driven", "biomarker-defined"],
    tldr: "Anything measurable in the body or tumour that tells you something useful: what kind of cancer it is, how it is likely to behave, or which drug is likely to work.",
    summary: "Biomarkers come in three main flavours: diagnostic (what is this?), prognostic (how will it behave regardless of treatment?) and predictive (will this particular treatment work?); ER, PD-L1, HER2, EGFR mutations and MSI are predictive biomarkers with drugs attached to them, PSA and CA-125 are tumour markers used for monitoring, and Ki-67 is prognostic. Predictive biomarkers underpin precision oncology, letting trials enrol only patients likely to benefit and sparing others a useless drug, and a test validated for this purpose becomes a companion diagnostic. Many biomarkers remain imperfect, PD-L1 most famously, and validating and standardising them is one of the field's chronic bottlenecks.",
    wikipedia: W("Biomarker_(medicine)"),
    related: ["tumour-marker", "ihc", "genomic-profiling", "companion-diagnostic-term", "overexpression", "prognosis", "ctdna", "tmb", "msi"], technologies: ["companion-diagnostic", "cgp", "histopathology-ihc"], journals: ["cancer-biomarkers", "international-journal-of-biological-markers", "tumour-biology"],
  }),
  t({
    id: "tumour-marker", name: "Tumour marker", category: CLINIC,
    aka: ["tumour markers", "tumor marker", "tumor markers", "serum marker", "serum markers", "blood marker", "blood markers", "PSA", "CA-125", "CA125", "CEA", "CA 19-9", "CA19-9", "AFP", "LDH"],
    tldr: "A substance, usually a protein, that a tumour releases into the blood in measurable amounts. Rising or falling levels track whether the cancer is growing or responding, though they are rarely good enough for diagnosis on their own.",
    summary: "Classic tumour markers are PSA (prostate), CA-125 (ovarian), CEA (colorectal), CA 19-9 (pancreatic), AFP (liver, germ cell), beta-hCG (germ cell) and LDH (a general marker of tumour bulk); most are also made by normal tissue or raised by benign conditions, so they lack the specificity to diagnose cancer and mostly serve to monitor known disease. PSA screening is the well-known exception and the standing example of the trade-off between finding cancers early and overdiagnosing harmless ones. Circulating tumour DNA is in effect a new generation of tumour marker, more specific because it carries the tumour's own mutations.",
    wikipedia: W("Tumor_marker"),
    related: ["biomarker", "ctdna", "screening", "early-detection-term", "progression"], cancers: ["prostate", "ovarian", "colorectal", "pancreatic", "hcc"], technologies: ["liquid-biopsy"],
  }),
  t({
    id: "genomic-profiling", tags: ["precision"], name: "Genomic profiling", category: CLINIC,
    aka: ["genomic testing", "genomic test", "genomic tests", "molecular profiling", "molecular testing", "molecular test", "tumour sequencing", "tumor sequencing", "tumour profiling", "tumor profiling", "gene panel", "gene panels", "panel testing", "panel sequencing", "genotyping", "genotyped", "mutation testing", "sequenced", "sequencing", "molecular tests"],
    tldr: "Reading the DNA (and sometimes RNA) of a tumour, usually with a panel of a few hundred genes, to list its mutations, fusions and amplifications and match them to approved drugs or trials. Guidelines now require it before first-line treatment in lung, colorectal, breast and prostate cancer, though in several cancer types most tumours still show no actionable finding.",
    summary: "Most clinical profiling uses a targeted panel of a few hundred cancer-relevant genes sequenced from a biopsy or from blood (liquid biopsy); comprehensive genomic profiling (CGP) reports mutations, amplifications, fusions, tumour mutational burden and microsatellite status in one assay. The result is matched to approved drugs, trials and resistance mechanisms, ideally in a molecular tumour board, and guidelines now require testing before first-line treatment in several cancers. Limits include tumours with no actionable finding (still the majority in many types), variants of uncertain significance, sampling one spot of a heterogeneous tumour, and unequal access.",
    wikipedia: W("Cancer_genome_sequencing"),
    related: ["ngs", "mutation", "driver-mutation", "biomarker", "vus", "vaf", "targeted-therapy-term", "companion-diagnostic-term"], technologies: ["cgp", "liquid-biopsy", "wes-wgs", "rna-seq"], drugs: ["foundationone-cdx"],
  }),

  // =====================================================================================
  // Immune system
  // =====================================================================================
  t({
    id: "immune-system", name: "Immune system", category: BIO,
    aka: ["immunity", "immune response", "immune responses", "immune cells", "immune cell", "immune attack", "immune recognition", "immune surveillance", "immunosurveillance", "innate immunity", "adaptive immunity", "innate immune", "adaptive immune", "white blood cells", "white blood cell", "leukocytes", "lymphocytes", "lymphocyte"],
    tldr: "The body's defence network of cells and molecules that recognises and destroys infected, foreign and abnormal cells. It kills most would-be cancers before they are ever noticed; the ones that survive have learned to hide from it.",
    summary: "Innate immunity uses inherited sensing systems (barriers, soluble defences such as complement, phagocytes such as macrophages and neutrophils, natural killer cells, and sensors of microbial or damage-related features), while adaptive immunity expands T cells and B cells whose diverse antigen receptors are assembled during development and selected by an encounter, with some descendants persisting as memory cells. The two cooperate: dendritic cells, cytokines and lymph nodes connect innate sensing to adaptive responses, and antibodies and T cells in turn guide innate cells.",
    wikipedia: W("Immune_system"),
    related: [
  "t-cell",
  "b-cell",
  "nk-cell",
  "macrophage",
  "cytokine",
  "antigen",
  "immune-checkpoint",
  "immunotherapy-term",
  "avoiding-immune-destruction",
  "cold-vs-hot",
  "tumor-microenvironment",
  "dendritic-cells",
  "gamma-delta-t-cells",
  "nkt-cells",
  "peripheral-tolerance",
  "pattern-recognition-damps-and-pamps",
  "macrophage-states",
  "adenosine-and-ido",
  "interferons"
],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Immune_system"
  },
  {
    "label": "Candida albicans infection affords protection against reinfection via functional reprogramming of monocytes.",
    "url": "https://doi.org/10.1016/j.chom.2012.06.006"
  },
  {
    "label": "Adaptive immune features of natural killer cells.",
    "url": "https://doi.org/10.1038/nature07665"
  },
  {
    "label": "Single-cell RNA-seq reveals new types of human blood dendritic cells, monocytes, and progenitors.",
    "url": "https://doi.org/10.1126/science.aah4573"
  },
  {
    "label": "An introduction to immunology and immunopathology.",
    "url": "https://doi.org/10.1186/s13223-018-0278-1"
  },
  {
    "label": "Cytotoxic CD4 T cells in the mucosa and in cancer.",
    "url": "https://doi.org/10.3389/fimmu.2023.1233261"
  },
  {
    "label": "Recommendations for myeloid-derived suppressor cell nomenclature and characterization standards.",
    "url": "https://doi.org/10.1038/ncomms12150"
  },
  {
    "label": "MHC restriction is imposed on a diverse T cell receptor repertoire by CD4 and CD8 co-receptors during thymic selection.",
    "url": "https://doi.org/10.1016/j.it.2012.05.006"
  },
  {
    "label": "Evaluating Human Natural Killer Cells Antibody-dependent Cellular Cytotoxicity (ADCC) Using Plate-bound Anti-CD16 Antibodies.",
    "url": "https://doi.org/10.21769/bioprotoc.4285"
  },
  {
    "label": "Mechanisms of central tolerance for B cells.",
    "url": "https://doi.org/10.1038/nri.2017.19"
  },
  {
    "label": "Recognition of microorganisms and activation of the immune response.",
    "url": "https://doi.org/10.1038/nature06246"
  },
  {
    "label": "Vaccine adjuvants: putting innate immunity to work.",
    "url": "https://doi.org/10.1016/j.immuni.2010.10.002"
  },
  {
    "label": "Hayday and Vantourout, 2020: The Innate Biologies of Adaptive Antigen Receptors",
    "url": "https://doi.org/10.1146/annurev-immunol-102819-023144"
  },
  {
    "label": "Oettinger et al., 1990: RAG-1 and RAG-2 and V(D)J recombination",
    "url": "https://doi.org/10.1126/science.2360047"
  },
  {
    "label": "Sanz et al., 2023: Deep characterization of human gamma-delta T cell subsets",
    "url": "https://doi.org/10.3389/fimmu.2023.1148988"
  },
  {
    "label": "Rodero et al., 2017: Interferon-alpha protein and cellular sources",
    "url": "https://doi.org/10.1084/jem.20161451"
  },
  {
    "label": "Peiseler and Kubes, 2019: Neutrophils in tissue repair",
    "url": "https://doi.org/10.1172/JCI124616"
  },
  {
    "label": "de Gruijter et al., 2022: Cytokine production by human B cells",
    "url": "https://doi.org/10.1093/cei/uxac090"
  },
  {
    "label": "Wynn and Vannella, 2016: Macrophages in tissue repair, regeneration and fibrosis",
    "url": "https://doi.org/10.1016/j.immuni.2016.02.015"
  },
  {
    "label": "Afonso et al., 2012: Leukotriene B4 signal relay during neutrophil chemotaxis",
    "url": "https://doi.org/10.1016/j.devcel.2012.02.003"
  }
],
"notes": [
  "Fast and memoryless against slow and remembering is a starting tendency and not a rule: mice lacking functional T and B cells were protected against repeat Candida albicans infection in a monocyte-dependent way (Quintin et al., 2012), and natural killer cells carrying the Ly49H receptor expanded about 100-fold in the spleen after mouse cytomegalovirus infection, persisted for months and expanded again after transfer to a new host (Sun et al., 2009).",
  "A list of cell types is a roster and not a functional report: a cell-family name does not show what a cell is doing, a marker shared by several populations is not a complete identity test (single-cell sequencing of human blood found six dendritic-cell and four monocyte subtypes; Villani et al., 2017), and a fraction of immune cells depends on its denominator (percent of recovered immune cells, of T cells and of all tissue cells are different quantities). Blood composition does not substitute for tumour composition, and a count of immune cells in a tumour does not by itself show recognition or killing. CD4 and CD8 are co-receptors and not permanent helper and killer assignments, tumour-associated macrophage names a setting, myeloid-derived suppressor cells need an operational phenotype and a test of suppressive function, and natural killer T cells are a T-cell family distinct from natural killer cells despite the name. In the classical description innate immunity is rapid and without immunologic memory while adaptive immunity is antigen-specific with a capacity for memory, and the two are not mutually exclusive (Marshall et al., 2018). Cytotoxic CD4 T cells have been found in infections, tumours and inflammatory disease, so a CD4 or CD8 label does not fix a helper or killer role (Venkatesh et al., 2023), and a myeloid-derived suppressor cell label rests on myeloid origin plus shown suppressive function (Bronte et al., 2016). CD4 and CD8 are coreceptors for T-cell receptors that recognise MHC, and a review discusses how they help impose MHC specificity during thymic selection (Van Laethem et al., 2012), so a CD4 or CD8 label names a coreceptor and not a job.",
  "Among innate cells, phagocytes (neutrophils and macrophages) engulf and kill microbes, and natural killer cells play a major role in the rejection of tumours and the destruction of virus-infected cells through perforins and granzymes (Marshall et al., 2018). The receptor comparison concerns how recognition equipment is generated: inherited, germline-encoded receptors include Toll-like and natural killer receptors, whereas developing T and B cells assemble diverse antigen receptors by somatic V(D)J recombination (Hayday and Vantourout, 2020; Oettinger et al., 1990; Nemazee, 2017); one review describes the adaptive system as in turn activating innate effector mechanisms in an antigen-specific manner (Medzhitov, 2007).",
  "Most adjuvants are thought to enhance T-cell and B-cell responses by engaging the innate immune system and not the lymphocytes directly (Coffman et al., 2010), so a vaccine can create an inflammatory context, and a response to an unrelated control antigen has to be measured to show that a response to the vaccine antigen is selective; in OnCo's reasoning, a manufactured antibody is also not evidence that the recipient made antibodies. Counts of cells, concentrations in picograms per millilitre and antigen-matched functional assays answer different questions, and a report should say which specimen, which time, which stimulation and which background control was used (OnCo reporting advice).",
  "Tumours are recognised because they display mutated proteins and stress signals, but successful tumours evade destruction by displaying 'don't attack me' checkpoint signals, hiding their antigens, recruiting suppressive cells, and walling themselves off; 'avoiding immune destruction' is one of the hallmarks of cancer. Immunotherapy in its many forms (checkpoint inhibitors, engineered T cells, bispecifics, vaccines) aims to restore or engineer the immune system's ability to see and kill the tumour.",
  "Cell-family roster, T cells: diverse antigen receptors support antigen-specific responses; functions can include help through signals, regulation and target-cell killing. A CD4 or CD8 marker is a coreceptor label, not a permanent helper or killer assignment. Interpretation: the presence of T cells does not establish which antigen they recognise or that killing is occurring (Marshall et al., 2018; Venkatesh et al., 2023).",
  "Cell-family roster, B cells and plasma cells: B cells recognise antigen, can present it to T cells and can produce cytokine signals; plasma cells specialise in antibody secretion (Marshall et al., 2018; de Gruijter et al., 2022). Interpretation: counting either family does not identify what its antibodies bind or whether those antibodies help control a tumour.",
  "Cell-family roster, natural killer cells: activating and inhibitory inputs together influence target-cell damage and cytokine production; these cells can release perforin, granzymes and interferon gamma (Marshall et al., 2018). Interpretation: a count of natural killer cells does not show that every abnormal cell will be attacked. The required signals, cell state and tested target still matter.",
  "Cell-family roster, macrophages: engulfment, antigen presentation and signalling coexist with roles in tissue maintenance and repair. The repair, inflammatory and fibrotic programmes described by Wynn and Vannella (2016) depend on context. Interpretation: a macrophage count or location does not establish a universally beneficial or suppressive function.",
  "Cell-family roster, dendritic cells: they collect and display antigen and provide signals that can shape T-cell priming, connecting innate and adaptive immunity (Marshall et al., 2018). Interpretation: their presence does not establish that the relevant antigen was displayed with the supporting signals needed for a useful response.",
  "Cell-family roster, neutrophils: engulfment and antimicrobial activity are accompanied by inflammatory signalling and tissue effects. Afonso et al. (2012) showed cell-to-cell signal relay by leukotriene B4 in defined neutrophil chemotaxis experiments, including cells from mice with or without the formyl peptide receptor 1. Peiseler and Kubes (2019) review roles in tissue damage, resolution of inflammation and repair, including sterile injury. Interpretation: a neutrophil count alone does not diagnose infection or establish cancer promotion or cancer control.",
  "Recognition-system comparison: innate recognition equipment is inherited; T-cell and B-cell antigen receptors are diversified and assembled during development. Exposure can change innate activation, recruitment and later responsiveness, while an adaptive response can select clones that expand, differentiate and persist as memory. Speed is a separate axis: innate responses are often early but can persist, and adaptive recall can be rapid. Mouse fungal and viral experiments demonstrate particular forms of trained monocyte or memory-like natural killer responses, not a rule that every innate response has conventional T-cell or B-cell memory (Quintin et al., 2012; Sun et al., 2009; Hayday and Vantourout, 2020). Antigen specificity alone does not establish activation or benefit.",
  "Measurement comparison: cell counts describe a sampled population, protein concentration describes an amount per volume, and an antigen-matched functional assay describes an activity under its test conditions. Rodero et al. (2017) measured interferon-alpha protein, interferon-responsive RNA and antiviral activity as different readouts; Sanz et al. (2023) separately measured gamma-delta cell phenotype, receptor repertoire and target-cell killing. The reporting inference is to keep specimen, collection time, cell identity, stimulation, viability and background controls explicit. A concentration in picograms per millilitre is not a cell count or an antigen-specific response."
]
}),
  t({
    id: "t-cell", name: "T cell", category: BIO,
    aka: ["T cells", "T-cell", "T-cells", "T lymphocyte", "T lymphocytes"],
    related: ["immune-system","b-cell","nk-cell","antigen","epitope","immune-checkpoint","tils","neoantigen","cytokine","crs","anergy","costimulation","regulatory-t-cells","t-cell-priming-three-signals","t-cell-receptor","t-cell-states","thymic-output-and-aging"],
    tldr: "T cells are immune cells with different recognition systems and roles. Their presence does not by itself show that they recognise or kill cancer.",
    summary: "T cells develop through the thymus. Conventional alpha-beta T cells recognise peptide-HLA displays through a paired receptor; CD4 and CD8 identify major co-receptor populations, rather than fixed helper and killer jobs. Some human bladder-tumour CD4 cells showed class-II-dependent cytotoxicity in controlled experiments, while regulatory populations restrain responses. Identity, receptor specificity, state and measured function need separate evidence. A CD3 or CD8 stain establishes a sampled population under a defined panel, not tumour recognition or killing. Report compartment, viable-cell denominator, marker panel and timing. Controlled recognition and target-cell-death assays address different claims; cytokine production, division and treatment benefit are also separate outcomes.",
    wikipedia: W("T_cell"),
     targets: ["pd1", "pdl1", "ctla4", "cd3", "lag3"], technologies: ["checkpoint-inhibitor", "car-t", "tcr-t", "t-cell-engager", "til-therapy"], pathways: ["pd1-checkpoint"],
    asOf: "2026-11-09",
    links: [{"label":"Oh et al., human bladder-tumour CD4 cytotoxicity","url":"https://pubmed.ncbi.nlm.nih.gov/32497499/"},{"label":"Han et al., receptor identity and phenotype","url":"https://pubmed.ncbi.nlm.nih.gov/24952902/"},{"label":"PubMed 9872319","url":"https://pubmed.ncbi.nlm.nih.gov/9872319/"},{"label":"PubMed 31461748","url":"https://pubmed.ncbi.nlm.nih.gov/31461748/"}],

    notes: ["T cells are a lymphocyte family, not every white cell or every lymphocyte. Precursors develop through the thymus, with receptor generation and selection shaping the peripheral pool. Conventional alpha-beta cells recognise peptide-HLA; gamma-delta cells use another, context-dependent receptor system, so conventional peptide-HLA examples do not describe every T cell.","T-cell descriptions should separate identity, location, specificity, state and measured function. Flow cytometry uses defined viable-cell gates and panels, tissue staining adds location and sequencing adds receptor identity. Report compartment, denominator, panel and timing. CD3/CD8 positivity and a viral-peptide response establish their tested observations, not cancer recognition or killing by every nearby cell; greater presence or activation does not automatically mean clinical benefit."]
  }),
  t({
    id: "b-cell", name: "B cell", category: BIO,
    aka: [
  "B cells",
  "B-cell",
  "B-cells",
  "B lymphocyte",
  "B lymphocytes"
],
    tldr: "B cells can develop into antibody-secreting cells or memory cells. Their presence does not identify what an antibody recognises or whether it helps against cancer.",
    summary: "Each B cell makes one antibody; when it meets its antigen it multiplies and matures into plasma cells that pump out that antibody in bulk, which is the response the hybridoma technique captured to make monoclonal antibodies. B cells carry surface markers (CD19, CD20, CD22) throughout their lives and plasma cells carry BCMA, and these markers make B-cell cancers (most lymphomas, CLL, ALL, myeloma) the most successful targets of rituximab, CAR-T and bispecific antibodies; since normal B cells are also wiped out, patients need antibody replacement and are prone to infection. B cells inside solid tumours, organised into structures resembling lymph nodes, are associated with better responses to immunotherapy. Plasma cells are the antibody-secreting end of the lineage, plasmablasts an earlier dividing stage and memory B cells a separate lasting trace of a response; a high immunoglobulin RNA signal in a tumour sample can come from plasma cells and does not show that cancer cells made it.",
    wikipedia: W("B_cell"),
    related: [
  "antibody",
  "t-cell",
  "immune-system",
  "lymphoma-type",
  "leukaemia-type",
  "monoclonal",
  "b-cells-and-plasma-cells"
], targets: ["cd19", "cd20", "bcma", "cd38"], cancers: ["dlbcl", "cll", "multiple-myeloma", "all-leukemia"], technologies: ["car-t", "t-cell-engager"],

"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/B_cell"
  },
  {
    "label": "Blimp-1 is required for the formation of immunoglobulin secreting plasma cells and pre-plasma memory B cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/14563324/"
  },
  {
    "label": "Tertiary lymphoid structures improve immunotherapy and survival in melanoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31942071/"
  },
  {
    "label": "Review: The Maintenance of Memory Plasma Cells.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31024553/"
  }
]
,
"notes": [
  "Selected plasma-cell review passages support the distinction between proliferating plasmablasts and longer-lived plasma-cell populations; identifying a cell does not establish antibody specificity."
]
}),
  t({
    asOf:"2026-11-11", links:[
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Natural_killer_cell"
  },
  {
    "label": "Karre et al.: reduced self-MHC and rejection in mouse lymphoma models (1986)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/3951539/"
  },
  {
    "label": "Liu et al.: one cord-blood CAR-NK construct in lymphoid tumors (2020)",
    "url": "https://doi.org/10.1056/NEJMoa1910607"
  },
  {
    "label": "Recognition of Self and Viral Ligands by NK Cell Receptors.",
    "url": "https://doi.org/10.1111/imr.13435"
  },
  {
    "label": "MHC class I molecules and KIRs in human history, health and survival.",
    "url": "https://doi.org/10.1038/nri1570"
  },
  {
    "label": "HLA-E binds to natural killer cell receptors CD94/NKG2A, B and C.",
    "url": "https://doi.org/10.1038/35869"
  },
  {
    "label": "Activation of NK Cells and T Cells by NKG2D, a Receptor for Stress-Inducible MICA.",
    "url": "https://doi.org/10.1126/science.285.5428.727"
  },
  {
    "label": "Controlling Natural Killer Cell Responses: Integration of Signals for Activation and Inhibition.",
    "url": "https://doi.org/10.1146/annurev-immunol-020711-075005"
  },
  {
    "label": "Education of hyporesponsive NK cells by cytokines.",
    "url": "https://doi.org/10.1002/eji.200939307"
  },
  {
    "label": "Mutations Associated with Acquired Resistance to PD-1 Blockade in Melanoma.",
    "url": "https://doi.org/10.1056/nejmoa1604958"
  },
  {
    "label": "A versatile flow-based assay for immunocyte-mediated cytotoxicity.",
    "url": "https://doi.org/10.1016/j.jim.2019.112668"
  },
  {
    "label": "CD107a as a functional marker for the identification of natural killer cell activity.",
    "url": "https://doi.org/10.1016/j.jim.2004.08.008"
  },
  {
    "label": "Evaluating Human Natural Killer Cells Antibody-dependent Cellular Cytotoxicity (ADCC) Using Plate-bound Anti-CD16 Antibodies.",
    "url": "https://doi.org/10.21769/bioprotoc.4285"
  },
  {
    "label": "Controlling natural killer cell responses: integration of signals for activation and inhibition.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23516982/"
  },
  {
    "label": "Kinetics and peptide dependency of the binding of the inhibitory NK receptor CD94/NKG2-A and the activating receptor CD94/NKG2-C to HLA-E.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10428963/"
  }
], notes:[
  "The original missing-self experiment compared mouse lymphoma variants with reduced H-2 expression in defined hosts. It supports an immune-recognition principle, not a universal rule that every HLA-low human tumor is killed by every NK product.",
  "A CAR, native NK receptors and cytokine support provide different inputs. The cord-blood product in Liu combined all of these design layers; a favorable observation for that construct does not isolate the CAR contribution or establish the same behavior for NK-92, donor blood or pluripotent-cell-derived preparations. NK and NKT cells are different cell families.",
  "The receptor-level map separates inhibitory KIR/HLA and NKG2A/HLA-E interactions from activating stress-ligand and antibody-Fc inputs. Receptor proteins, genotype, ligand expression, degranulation and controlled target killing are different readouts. A loss of inhibitory display without adequate activating input does not guarantee killing, and a perioperative blood NK measurement does not describe every residual-disease site."
],
    id: "nk-cell", name: "NK cell", category: BIO, targets: ["cd56", "fcgr3a", "cd57"],
    aka: ["NK cells", "natural killer cell", "natural killer cells", "natural killer", "NK-cell", "CAR-NK"],
    tldr: "Natural killer cells integrate activating and inhibitory inputs to respond to abnormal cells. An added CAR supplies another recognition route; missing self is one input rather than a guarantee of killing.",
    summary: "Some inhibitory NK receptors recognize self HLA class I, while activating receptors respond to other features. Reduced self display can weaken an inhibitory input, but the NK cell, its prior education, activating signals and target context still determine the response. NK cells can also contribute antibody-dependent killing through Fc receptors. Donor-derived or engineered NK-cell products need their own compatibility, persistence and safety assessment rather than a blanket claim that matching or rejection never matters. The principle comes from mouse experiments: lymphoma cells selected for loss of H-2 were less malignant at low dose and were rejected by a non-adaptive mechanism, which suggested that natural killer cells are effectors in a defence system geared to detect reduced self MHC (Kärre et al., 1986); that does not guarantee the same outcome for any human tumour. MHC class I molecules are ligands for killer-cell immunoglobulin-like receptors (Parham, 2005): two-domain KIR2D receptors bind HLA-C alleles and three-domain KIR3D receptors bind HLA-A and HLA-B alleles, and the KIR family includes activating as well as inhibitory members (Mariuzza et al., 2025). CD94/NKG2A binds HLA-E, and HLA-E surface expression was enough to protect target cells from lysis by CD94/NKG2A-positive NK clones (Braud et al., 1998). NKG2D binds class I-related proteins including MICA, MICB and ULBP1 to 3 (Mariuzza et al., 2025), and engagement of NKG2D activated NK and gamma-delta T-cell cytolysis against epithelial tumour cells expressing MICA (Bauer et al., 1999). No single activating receptor dominates, since NK cells integrate synergistic signals from several (Long et al., 2013), and responsiveness depends on prior education: in human cell experiments, cytokine stimulation let hyporesponsive NK cells acquire KIR and function when the cognate MHC was present (Juelke et al., 2009). Loss of one HLA allele is not loss of all class I. Loss of beta-2 microglobulin removed surface class I in one of four relapsing melanoma patients (Zaretsky et al., 2016), and because HLA-E is assembled with beta-2 microglobulin, the KIR and NKG2A restraints would be expected to lift together; that last step is an inference not tested in the cited abstracts. A flow-based cytotoxicity assay that stains target and effector nuclei separately and distinguishes live from dead nuclei has been validated with NK-92 cells, CAR-T cells and tumour-infiltrating lymphocytes (Rabinovich et al., 2019). Target death is not a count of effector cells that released granule contents: surface CD107a marked NK cells that degranulated after stimulation with MHC-devoid targets and correlated with lysis, and also marked a large subset that did not secrete cytokine, so different readouts count different cells (Alter et al., 2004). CD16 is a low-affinity Fc receptor for IgG that mediates antibody-dependent cellular cytotoxicity by NK cells (Liu, 2022), a route separate from missing-self recognition. Neither assay readout shows tumour entry or clinical benefit.",
    wikipedia: W("Natural_killer_cell"),
    related: [
  "t-cell",
  "immune-system",
  "adcc",
  "antibody",
  "fc-effector",
  "nk-cell-recognition",
  "perioperative-immune-window"
], technologies: ["car-nk-macrophage", "allogeneic-cell-therapy", "monoclonal-antibody"],
  }),
  t({
    id: "macrophage", name: "Macrophage", category: BIO,
    aka: ["macrophages", "myeloid cells", "myeloid cell", "monocyte", "monocytes", "phagocyte", "phagocytes", "phagocytosis"],
    tldr: "Large immune cells that engulf debris, microbes and dead cells and coordinate inflammation. Tumours recruit and retrain them: tumour-associated macrophages can make up half the cells in some tumours, where they feed blood-vessel growth and suppress T cells, and cancer cells display CD47 as a 'don't eat me' signal to avoid being engulfed.",
    summary: "Macrophages engulf material and take part in defence, tissue maintenance and repair. Their current state (a set of activity programmes) is separate from their lineage (developmental origin) and is shaped by origin, tissue, signals and history, so they do not fall into two types: the M1 and M2 labels come from simplified laboratory contrasts, consensus guidance asks authors to state the source, the activators and the markers (Murray et al., 2014), and human macrophages stimulated with diverse signals showed a spectrum of states that extends the two-type model (Xue et al., 2014). A macrophage can combine inflammatory, tissue-repair and other programmes, and a marker or an M2-like label does not by itself show what a cell is doing to T cells or to cancer cells. Tumour-associated macrophages can make up half the cells in some tumours, where they promote blood-vessel growth, suppress T cells, help cancer cells invade, and take up ADC payloads that contribute to side effects. Cancer cells display CD47, a 'don't eat me' signal, to stop macrophages engulfing them, and CD47 blockers are in trials. Efforts to reprogramme macrophages (CSF1R inhibitors, CD40 agonists, CAR-macrophages) have been harder to translate than T-cell approaches.",
    wikipedia: W("Macrophage"),
    related: [
  "immune-system",
  "inflammation",
  "tumor-associated-macrophages",
  "myeloid-derived-suppressor-cells",
  "tumor-microenvironment",
  "cytokine",
  "macrophage-states"
], targets: ["cd47"], technologies: ["car-nk-macrophage"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Macrophage"
  },
  {
    "label": "Macrophage activation and polarization: nomenclature and experimental guidelines.",
    "url": "https://doi.org/10.1016/j.immuni.2014.06.008"
  },
  {
    "label": "Transcriptome-based network analysis reveals a spectrum model of human macrophage activation.",
    "url": "https://doi.org/10.1016/j.immuni.2014.01.006"
  }
]
}),
  t({
    id: "cytokine", name: "Cytokine", category: BIO,
    aka: [
  "cytokines",
  "interleukin",
  "interleukins",
  "IL-2",
  "IL-6",
  "chemokine",
  "chemokines",
  "pro-inflammatory cytokines",
  "inflammatory cytokines"
],
    tldr: "Small proteins immune cells use to talk to each other: alarms, recruitment calls, growth orders and stand-down signals. Some are cancer drugs, and a flood of them is the danger of certain immunotherapies.",
    summary: "Interleukins, interferons, tumour necrosis factor and chemokines each act on cells carrying the matching receptor; IL-2 drives T-cell growth and was one of the first immunotherapies (aldesleukin), interferon-alpha was used in melanoma and leukaemia, and engineered cytokines aim to keep the benefit while losing the toxicity. Tumours secrete cytokines that recruit suppressive cells and drive inflammation, and IL-6 is a major driver of cancer cachexia. When CAR-T cells or T-cell engagers activate en masse they release cytokines in a surge (cytokine release syndrome), treated by blocking IL-6 with tocilizumab. A cytokine name does not specify one outcome: one cytokine can act differently on different receiving cells (pleiotropy), different signals can give overlapping outputs (redundancy), and receptor availability, concentration, exposure time and cell state all shape the response. A review of receptor biology said that all cytokines, to a greater or lesser extent, show pleiotropy (multiple biological actions) and redundancy (shared biological actions), and proposed that redundancy might be explained by related cytokines using a common receptor subunit, while pleiotropy requires that receptors exert different activities on different cells (Nicola, 1994). Different IL-2 and anti-IL-2 antibody complexes selectively expanded CD8 T cells or CD4 regulatory T cells in mice, so the formulation and the receiving cells mattered (Boyman et al., 2006). Chemokines help direct cell movement through gradients: in mouse skin an immobilised CCL21 gradient guided dendritic cells towards lymphatic vessels, and displacing or swamping it abolished directed migration (Weber et al., 2013), but movement also needs a compatible receptor and a traversable route. Measurements answer different questions: a concentration in picograms per millilitre of a named fluid, the percentage of a defined cell gate making a protein after stimulation, and RNA expression are different layers, a blood concentration does not reconstruct a tumour gradient, and two preparations can share an average (0 and 20, or 10 and 10, picograms per millilitre both average 10) while differing in spatial pattern. Intracellular cytokine staining usually involves a stimulation of a few hours (4 to 6 hours was usually sufficient to detect interferon gamma and tumour necrosis factor), a block on secretion with brefeldin A or monensin so that the protein stays inside the cell, and negative and positive controls (Cossarizza et al., 2019). Calibration and a detection limit belong in the same report; that is OnCo's reporting advice and not a finding of the cited guideline. Chemokines are a family of cytokines and not a separate category, a growth-support signal such as IL-2 does not choose the antigen a T cell recognises, and more signal is not automatically more useful or safer immunity. For interferons, timing and the receiving cell mattered in mouse experiments: endogenous type I interferon was needed to prevent the growth of carcinogen-induced and transplanted tumours and acted through host blood-lineage cells (Dunn et al., 2005), whereas prolonged interferon signalling in experimental tumours maintained a resistance programme to checkpoint blockade (Benci et al., 2016). That a signal is tumour-associated does not by itself make it a safe target; this is OnCo's boundary statement and not a cited finding.",
    wikipedia: W("Cytokine"),
    related: [
  "immune-system",
  "t-cell",
  "inflammation",
  "crs",
  "ligand",
  "receptor",
  "cachexia",
  "interferons"
], technologies: ["cytokine-therapy", "car-t", "t-cell-engager"], drugs: ["aldesleukin"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cytokine"
  },
  {
    "label": "Interstitial dendritic cell guidance by haptotactic chemokine gradients.",
    "url": "https://doi.org/10.1126/science.1228456"
  },
  {
    "label": "Selective stimulation of T cell subsets with antibody-cytokine immune complexes.",
    "url": "https://doi.org/10.1126/science.1122927"
  },
  {
    "label": "Cytokine pleiotropy and redundancy: a view from the receptor.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7696967/"
  },
  {
    "label": "Guidelines for the use of flow cytometry and cell sorting in immunological studies (second edition).",
    "url": "https://doi.org/10.1002/eji.201970107"
  },
  {
    "label": "A critical function for type I interferons in cancer immunoediting.",
    "url": "https://doi.org/10.1038/ni1213"
  },
  {
    "label": "Tumor Interferon Signaling Regulates a Multigenic Resistance Program to Immune Checkpoint Blockade.",
    "url": "https://doi.org/10.1016/j.cell.2016.11.022"
  },
  {
    "label": "British Society for Immunology: Cytokines, Introduction",
    "url": "https://www.immunology.org/sites/default/files/2022-08/cytokines%20-%20introduction.pdf"
  },
  {
    "label": "NLM MeSH: Chemokines",
    "url": "https://id.nlm.nih.gov/mesh/D018925"
  }
],
"notes": [
  "Cytokines are signalling proteins whose binding to a suitable receptor changes signalling and gene expression in a receiving cell. Autocrine action is on the producing cell, paracrine action is on neighbours, and endocrine action is at a distance, for example after entry into the circulation. Distant action is possible rather than the default for every cytokine (British Society for Immunology, Cytokines: Introduction). Chemokines are a cytokine family involved in cell recruitment and can also affect leukocyte activation (NLM MeSH, Chemokines). The information-versus-fuel distinction is a reading rule: a measured amount of signalling protein does not measure the energy available to the cell, and a message without the relevant receptor and response machinery does not establish a response."
]
}),
  t({
    id: "inflammation", keyPapers: ["paper-balkwill-mantovani-inflammation-virchow-lancet-2001"], name: "Inflammation", category: BIO,
    aka: ["inflammatory", "inflamed", "chronic inflammation", "anti-inflammatory", "pro-inflammatory", "inflammatory response"],
    tldr: "The body's response to injury or infection: immune cells and fluid rush in, causing redness, heat and swelling. Short bursts heal; long-term smouldering inflammation promotes cancer.",
    summary: "Chronic inflammation from infection (hepatitis B and C, H. pylori, HPV), irritation (tobacco, asbestos, acid reflux) or disease (ulcerative colitis) supplies growth factors, free radicals that mutate DNA, and blood-vessel growth, and it is estimated to underlie around a fifth of cancers; 'tumour-promoting inflammation' is a recognised enabling characteristic in the hallmarks of cancer. Yet inflammation is also how the immune system attacks tumours, and an 'inflamed' or 'hot' tumour is one full of T cells that responds well to checkpoint inhibitors. Aspirin and other anti-inflammatory drugs reduce colorectal cancer risk, and the inflammatory markers CRP and IL-6 track cachexia and prognosis. Inflammation is not the same as infection: infection and injury are classic triggers, and tissue stress or malfunction can induce a graded response, called para-inflammation, that relies mainly on tissue-resident macrophages (Medzhitov, 2008). Recruited cells can support containment and repair, or persist and add to injury, and increased vessel permeability is not the growth of new vessels. Resolution is a coordinated and active process that restores tissue integrity and function, and is not simply everything switching off (Ortega-Gómez et al., 2013). In experimental cancer systems one DNA-sensing pathway has had opposite roles: host STING-dependent sensing was needed for spontaneous CD8 T-cell priming against mouse tumours (Woo et al., 2014), while a tumour-cell response to cytosolic DNA in chromosomally unstable tumours promoted metastasis (Bakhoum et al., 2018). These are contextual mechanisms and not a head-to-head clinical comparison. Inflammation after an intervention does not show tumour-specific immune learning: a local reaction, immunogenic cell death, recognition of untreated cancer cells and clinical benefit each need their own evidence, and one raised blood marker does not identify the source of inflammation. Acute against chronic and local against systemic are separate axes, and they need not share a trigger or a consequence.",
    wikipedia: W("Inflammation"),
    related: ["immune-system", "cytokine", "macrophage", "tumor-promoting-inflammation", "inflammation-nfkb", "cold-vs-hot", "risk-factor", "aspirin-cancer-prevention", "theories-of-cancer", "microenvironment-inflammation-theory"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Inflammation"
  },
  {
    "label": "Origin and physiological roles of inflammation.",
    "url": "https://doi.org/10.1038/nature07201"
  },
  {
    "label": "STING-dependent cytosolic DNA sensing mediates innate immune recognition of immunogenic tumors.",
    "url": "https://doi.org/10.1016/j.immuni.2014.10.017"
  },
  {
    "label": "Chromosomal instability drives metastasis through a cytosolic DNA response.",
    "url": "https://doi.org/10.1038/nature25432"
  },
  {
    "label": "Resolution of inflammation: an integrated view.",
    "url": "https://doi.org/10.1002/emmm.201202382"
  }
]
}),
  t({
    id: "immune-checkpoint", name: "Immune checkpoint", category: BIO,
    aka: ["immune checkpoints", "checkpoint protein", "checkpoint proteins", "checkpoint blockade", "immune checkpoint blockade", "checkpoint inhibition", "checkpoint inhibitor", "checkpoint inhibitors", "immune checkpoint inhibitor", "immune checkpoint inhibitors", "ICI", "ICIs", "PD-1 blockade", "PD-1/PD-L1", "anti-PD-1", "anti-PD-L1", "anti-CTLA-4", "PD-(L)1"],
    tldr: "Brakes on the immune system that stop T cells attacking healthy tissue. Tumours pull these brakes to protect themselves; checkpoint inhibitor drugs release them so T cells can attack the cancer.",
    summary: "PD-1 on a T cell, when it meets PD-L1 on another cell, tells the T cell to stand down; CTLA-4 is often emphasised earlier, during priming, and PD-1 during ongoing responses in tissues, but these are overlapping emphases and not separate addresses. Reviews describe CTLA-4 as acting early in lymph nodes and PD-1 later in peripheral tissues, while CTLA-4 is also expressed on activated effector CD8 T cells (Buchbinder and Desai, 2016; Pardoll, 2012), and LAG-3, TIM-3 and TIGIT as co-inhibitory receptors with their own specialised functions (Anderson et al., 2016), so the early or late shorthand for CTLA-4 and PD-1 should not be stretched to them. Tumours coat themselves in PD-L1 and exploit this, and antibodies that block PD-1 (pembrolizumab, nivolumab), PD-L1 (atezolizumab, durvalumab) or CTLA-4 (ipilimumab) restore the attack, producing durable remissions in melanoma, lung, kidney, bladder and many other cancers since 2011. The price is autoimmune side effects when the brakes come off everywhere, and only a minority of patients respond, which drives the search for newer checkpoints (LAG-3, TIGIT) and combinations. The 'checkpoint' in 'cell-cycle checkpoint' is an unrelated concept. The checkpoints work through different contacts and are not interchangeable versions of PD-1. In reconstitution and cell experiments, PD-1 engaged by PD-L1 recruited the phosphatase Shp2, which dephosphorylated the co-receptor CD28 in preference to the T-cell receptor (Hui et al., 2017). PD-1 has two ligands, PD-L1 and PD-L2, and PD-L1 is found on leukocytes and on non-haematopoietic cells in non-lymphoid tissues as well as on cancer cells, and can be induced by interferon gamma (Buchbinder and Desai, 2016). In the current US prescribing information for pembrolizumab, the indication for high-risk early-stage triple-negative breast cancer (chemotherapy before surgery, then pembrolizumab alone afterwards) carries no PD-L1 qualifier, whereas the indications for locally recurrent unresectable or metastatic disease (with chemotherapy) and for unresectable locally advanced or metastatic disease (with sacituzumab govitecan) name a PD-L1 combined positive score of 10 or more as determined by an FDA-authorized test. That describes how the approved uses are worded and is not a trial finding about who benefits. CTLA-4 shares the ligands CD80 and CD86 with CD28 and can capture them from opposing cells by trans-endocytosis, so the neighbouring cell has fewer costimulatory ligands to offer (Qureshi et al., 2011). These descriptions concern the receptors' own contacts and are not a model of what a blocking antibody does or a prediction of clinical benefit. LAG-3 selectively recognised stable complexes of peptide and MHC class II and suppressed T cells responding to them, without recognising every class II complex or blocking CD4 binding (Maruhashi et al., 2018). Bat3 bound to and repressed TIM-3 function and protected helper T cells from galectin-9-mediated death, and in cell-line co-expression experiments galectin-9 abolished Bat3 binding to TIM-3 (Rangachari et al., 2012). TIGIT disrupted dimerisation of the costimulatory receptor CD226 on the same cell, and in mouse tumour and chronic-infection models combined TIGIT and PD-L1 antibody blockade enhanced CD8 T-cell function in a CD226-dependent way (Johnston et al., 2014). Staining for a checkpoint measures a component in sampled cells and not ligand contact or causal inhibition: PD-1-positive cells need not all be exhausted or cancer-reactive, more staining does not prove more inhibition or greater drug benefit, and TIM-3-positive cells do not select TIM-3 over PD-1 blockade. A checkpoint inhibitor interrupts one pathway: it does not teach T cells a new target, build a route into the tumour or repair every dysfunctional cell, and changing normal regulation can also harm healthy organs.",
    wikipedia: W("Immune_checkpoint"),
    related: [
  "checkpoint",
  "t-cell",
  "immune-system",
  "immunotherapy-term",
  "irae",
  "cold-vs-hot",
  "cps",
  "avoiding-immune-destruction",
  "pd-l1-cps",
  "peripheral-tolerance",
  "adenosine-and-ido"
], targets: [
  "pd1",
  "pdl1",
  "ctla4",
  "lag3",
  "tigit",
  "pdcd1lg2"
], technologies: ["checkpoint-inhibitor"], drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab"], pathways: ["pd1-checkpoint"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Immune_checkpoint"
  },
  {
    "label": "Trans-endocytosis of CD80 and CD86: a molecular basis for the cell-extrinsic function of CTLA-4.",
    "url": "https://doi.org/10.1126/science.1202947"
  },
  {
    "label": "T cell costimulatory receptor CD28 is a primary target for PD-1-mediated inhibition.",
    "url": "https://doi.org/10.1126/science.aaf1292"
  },
  {
    "label": "LAG-3 inhibits the activation of CD4+ T cells that recognize stable pMHCII through its conformation-dependent recognition of pMHCII.",
    "url": "https://doi.org/10.1038/s41590-018-0217-9"
  },
  {
    "label": "Rangachari et al., 2012, Nature Medicine: Bat3 and TIM-3",
    "url": "https://doi.org/10.1038/nm.2871"
  },
  {
    "label": "The immunoreceptor TIGIT regulates antitumor and antiviral CD8(+) T cell effector function.",
    "url": "https://doi.org/10.1016/j.ccell.2014.10.018"
  },
  {
    "label": "CTLA-4 and PD-1 Pathways: Similarities, Differences, and Implications of Their Inhibition.",
    "url": "https://doi.org/10.1097/coc.0000000000000239"
  },
  {
    "label": "The blockade of immune checkpoints in cancer immunotherapy.",
    "url": "https://doi.org/10.1038/nrc3239"
  },
  {
    "label": "Lag-3, Tim-3, and TIGIT: Co-inhibitory Receptors with Specialized Functions in Immune Regulation.",
    "url": "https://doi.org/10.1016/j.immuni.2016.05.001"
  },
  {
    "label": "KEYTRUDA (pembrolizumab) prescribing information, US Food and Drug Administration label via DailyMed",
    "url": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"
  },
  {
    "label": "Event-free Survival with Pembrolizumab in Early Triple-Negative Breast Cancer.",
    "url": "https://doi.org/10.1056/nejmoa2112651"
  },
  {
    "label": "Overall Survival with Pembrolizumab in Early-Stage Triple-Negative Breast Cancer.",
    "url": "https://doi.org/10.1056/nejmoa2409932"
  },
  {
    "label": "Pembrolizumab plus chemotherapy versus placebo plus chemotherapy for previously untreated locally recurrent inoperable or metastatic triple-negative breast cancer (KEYNOTE-355): a randomised, placebo-controlled, double-blind, phase 3 clinical trial.",
    "url": "https://doi.org/10.1016/s0140-6736(20)32531-9"
  }
],
"trials": [
  "keynote-522",
  "keynote-355"
]
,
"notes": [
  "In KEYNOTE-522, patients with previously untreated stage II or III triple-negative breast cancer received pembrolizumab or placebo with chemotherapy before surgery, followed by pembrolizumab or placebo after surgery. The pembrolizumab regimen improved event-free survival (Schmid et al., 2022) and overall survival (Schmid et al., 2024). These are results for the tested early-stage regimen, not evidence that a checkpoint marker alone establishes benefit in another setting."
]
}),

  // =====================================================================================
  // Treatment types
  // =====================================================================================
  t({
    id: "immunotherapy-term", name: "Immunotherapy", category: CLINIC,
    aka: ["immunotherapies", "immuno-oncology", "immunooncology", "IO", "cancer immunotherapy", "immune therapy", "immune-based therapy", "immune-based therapies", "chemo-immunotherapy", "chemoimmunotherapy", "chemo-IO", "immune therapies"],
    tldr: "Any treatment that works by getting the patient's own immune system to attack the cancer, rather than attacking the cancer directly. It can produce responses that last for years, but only in some patients.",
    summary: "The main forms are checkpoint inhibitors (antibodies that release the brakes on T cells), cell therapies (CAR-T, TCR-T and TIL, in which a patient's T cells are removed, engineered or expanded, and returned), bispecific T-cell engagers, cancer vaccines including personalised mRNA vaccines, cytokines, and oncolytic viruses. Because the immune system has memory, responses can persist long after treatment stops, which is why the survival curves for melanoma and lung cancer now show a plateau of long-term survivors; the flip side is autoimmune side effects and the fact that many tumours remain 'cold' and unresponsive. Predicting who will respond, and turning cold tumours hot, are two of the field's central problems.",
    wikipedia: W("Cancer_immunotherapy"),
    related: ["immune-checkpoint", "t-cell", "immune-system", "irae", "cold-vs-hot", "neoantigen", "chemotherapy-term", "targeted-therapy-term"], sections: ["immunotherapy"], technologies: ["checkpoint-inhibitor", "car-t", "t-cell-engager", "neoantigen-mrna-vaccine", "til-therapy", "oncolytic-virus"],
  }),
  t({
    id: "chemotherapy-term", name: "Chemotherapy", category: CLINIC,
    aka: ["chemotherapies", "chemo", "cytotoxic", "cytotoxics", "cytotoxic chemotherapy", "cytotoxic drugs", "cytotoxic drug", "cytotoxic agent", "cytotoxic agents", "chemotherapy regimen", "chemotherapy regimens", "chemo regimen", "platinum-based chemotherapy", "platinum doublet", "taxane", "taxanes", "anthracycline", "anthracyclines"],
    tldr: "Chemotherapy uses medicines to kill cancer cells or stop their growth. Different medicines disturb different cell processes, and their benefits and harms depend on the treatment and setting.",
    summary: "Here chemotherapy means conventional cytotoxic medicines, although the word is sometimes used more broadly for cancer drug treatment. These medicines can affect DNA, RNA, the supply of building blocks or microtubules. Many of those processes also operate in healthy cells. Fast division alone does not predict response, and DNA damage alone does not describe the whole family.\n\nA medicine, the way it is formulated, the amount and timing, and the disease setting all matter. An antibody-drug conjugate changes how a cargo is delivered and released; it does not make the cargo harmless to every healthy tissue. Some cargoes or related medicines have also been used outside conjugates.",
    wikipedia: W("Chemotherapy"),
    related: ["cell-division", "targeted-therapy-term", "immunotherapy-term", "bone-marrow", "toxicity-grade", "dose", "payload", "efflux-pump"], sections: ["chemotherapy"], technologies: ["cytotoxic-chemotherapy", "platinum", "topoisomerase-inhibitors", "adc"], drugs: ["carboplatin", "paclitaxel"],

"asOf": "2026-11-11",
"notes": [
  "The families disturb different jobs. Taxanes such as paclitaxel suppress microtubule dynamics; vinca medicines, eribulin and some conjugate cargoes inhibit assembly or growth instead. Platinum medicines form DNA attachments and cross-links. Classic alkylating agents such as cyclophosphamide act through reactive metabolites that attach groups to DNA. Anthracyclines such as doxorubicin can stabilise topoisomerase II cutting complexes. Fluoropyrimidines such as fluorouracil interfere with nucleotide supply and RNA function. Camptothecin-class medicines such as irinotecan and topotecan trap topoisomerase I complexes. These are mechanism examples, not interchangeable doses or a ranking of benefit.",
  "Follow a defined exposure through a drug-specific disturbance, the damage and cell response, and then recovery or death. Record the exact medicine or active metabolite, concentration and units, exposure time, whether it was removed, and the recovery period. A clinical amount in milligrams or milligrams per square metre is not a concentration at every tumour cell. Cell counts, DNA synthesis, damage markers, survival and regrowth answer different questions. A lower metabolic signal alone can reflect changed cell number or state and does not distinguish arrest from death. Use matched untreated or vehicle controls, relevant normal cells and a time course before interpreting an effect as selective killing.",
  "In a fictional assay, Drug A reduces survival in two tumour populations after the same exposure, but one recovers more readily after drug removal; Drug B gives a separate pattern. This does not identify which population a person has, whether a tolerable exposure reaches it, or whether treatment improves an outcome. In another fictional assay there are half as many cells at the end, but no death measurement or observation after drug removal. Slower growth remains an explanation. Compare starting counts, timed death measurements and recovery to distinguish slower growth from killing; neither assay proves a cure.",
  "NCI describes several treatment purposes: cure, reducing the chance of recurrence, stopping or slowing growth, and easing symptoms. Chemotherapy can shrink disease before surgery or radiotherapy, treat cells remaining after local treatment, help another treatment, or treat returned or spread disease. Which purpose has clinical evidence depends on the named cancer, stage, regimen, comparator, endpoint and follow-up. A cell-mechanism diagram cannot establish that evidence.",
  "An oral medicine can still have systemic harms; an infusion is a route, not a mechanism. Side effects do not measure how well a tumour is responding, and shrinkage is different from duration of control or survival. Uptake, activation, removal, repair and cell state can differ between tumour populations. Failure of one cytotoxic medicine does not establish failure of every member, and a new product name does not establish that resistance has been bypassed. A scheduled rest interval allows recovery but does not show that every biological effect has ended."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Chemotherapy"
  },
  {
    "label": "NCI: chemotherapy, purposes, routes and cycles",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
  },
  {
    "label": "Tewey et al., doxorubicin and topoisomerase II complexes (1984)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/6093249/"
  },
  {
    "label": "Albumin-bound paclitaxel label: mechanism and formulation",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=15ca4829-8fee-45f9-b4bc-b31c15732cd6"
  },
  {
    "label": "Fluorouracil injection label: mechanism and DPD warning",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b268684b-487f-4716-a2e8-6e6d3e117b14"
  },
  {
    "label": "Eribulin label: inhibition of microtubule growth",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=311a12f4-e5b3-4959-ab84-3d0eb6558d13"
  }
]
}),
  t({
    id: "targeted-therapy-term", name: "Targeted therapy", category: CLINIC,
    aka: ["targeted therapies", "targeted drug", "targeted drugs", "targeted treatment", "targeted treatments", "targeted agent", "targeted agents", "molecularly targeted", "precision oncology", "precision medicine", "personalised medicine", "personalized medicine", "actionable mutation", "actionable mutations", "actionable", "matched therapy", "genotype-directed", "biomarker-directed"],
    tldr: "A targeted treatment acts on a specified molecule or process. Some block a cancer dependence; others use a molecule as an address for delivery or immune recruitment. The target name alone does not establish benefit or normal-tissue safety.",
    summary: "Targeted treatments include small molecules and therapeutic antibodies with different actions. A molecule whose function supports cancer growth and a surface molecule used to deliver an active drug or recruit an immune cell have different roles. Detecting either does not by itself establish that the finished treatment reaches its target, changes a relevant function or helps in a particular clinical setting.\n\nSome treatments require a specified biomarker test; others have no target-expression selection test in the relevant label. Keep the actual drug, disease, treatment setting and testing rule together. NCI describes resistance and potentially serious adverse effects of targeted therapy. Neither relative normal-tissue sparing, mild toxicity nor a permanent response follows from the word targeted.",
    wikipedia: W("Targeted_therapy"),
    related: [
  "inhibitor",
  "kinase",
  "driver-mutation",
  "oncogene-addiction",
  "genomic-profiling",
  "biomarker",
  "resistance",
  "companion-diagnostic-term",
  "chemotherapy-term",
  "drug-target-and-mechanism"
], sections: ["targeted-therapy"], technologies: ["kinase-inhibitors", "monoclonal-antibody", "parp-inhibitor", "cdk46-inhibitor", "kras-inhibitors", "cgp"],

"notes": ["Target, mechanism and evidence. A drug target is the molecule or structure a treatment acts on, and its mechanism of action is how that action produces an effect; a target name does not show that the target is reachable, required by the cancer, or that changing it does useful work. Binding to a purified protein, engagement in the relevant cell (the cellular thermal shift assay was introduced to evaluate drug binding in cells and tissues), a measured effect with controls, and benefit and harm in a stated clinical setting each need their own evidence, and a blood concentration is not the concentration at an intracellular target. In-cell thermal profiling can pick up indirect as well as direct targets (Ball et al. 2020). If an antibody is shown to bind a protein on cancer cells and growth is unchanged, binding is supported; dependence on the protein, inhibition of its function, delivery by a finished payload-bearing product, safety and benefit are not. A molecule used as an address for delivery and a molecule whose function the cell depends on are different roles.","What NCI says about the class. Targeted therapy was once expected to be less toxic than chemotherapy but can cause serious side effects, cancer cells can become resistant to it, and it may work best combined with other targeted therapy or with treatments such as chemotherapy and radiation (NCI page, HTML read).","A product proposal identifies the clinical problem, disease setting, treatment intent, alternatives and measurable goal; the exact target, specimen and method; accessible protein or peptide-HLA presentation and normal-tissue evidence with sampling limits; and the complete binder, linker, payload or cell design and mechanism. It records the relevant human comparison or explicitly limited preclinical evidence, product-specific safety monitoring, management capability and stopping rules. Keep manufacture, quality release, sponsor, site and access pathway separate from benefit. Reviewing existing data, consuming tissue for an experiment, manufacturing and administering treatment are different commitments with their own rationale and responsible owner. A target shortlist or recipe analogy establishes none of their benefit or safety.","Questions follow the product. For a cytotoxic antibody-drug conjugate, assess antibody, linker and payload together, delivery and exposure, tested resistance steps and the design-specific role of internalisation; FDA's March 2024 clinical-pharmacology guidance has this scope. For an engager or cell product, ask about cytokine release syndrome, immune effector cell-associated neurotoxicity and other neurologic effects, healthy-tissue recognition, tissue access and what can persist after dosing stops. FDA's January 2024 CAR T-cell guidance describes product-specific recognition, expansion, persistence and toxicity management; it does not supply incidence for every engager. For a radioligand, ask how the imaging relates to that therapeutic product's distribution, organ absorbed doses and organ limits. FDA's August 2019 document addresses nonclinical studies and labeling, not a universal clinical dose threshold. Tracer uptake supplies no CAR-T safety threshold. For a T-cell-receptor proposal, ask which peptide-HLA target is recognised and how specificity, natural presentation and function were tested; receptor sequences or expanded clones alone leave these questions open.","Product Q is a fictional investigational conjugate against surface protein M, with a specified antibody, cleavable linker and cell-damaging payload. Adults with progressing metastatic solid cancer after prior treatment are the setting, and the immediate proposal is to review existing data before designing a laboratory experiment. No manufacture, treatment or new sample collection is proposed. The dossier has M RNA measurements from one tumour biopsy and Q activity in target-bearing cultured cells, without direct surface measurement, relevant healthy-tissue tests or a human comparison. Supplier participation, access and site arrangements are unknown. These findings support a research hypothesis about Q, not demonstrated clinical benefit or evidence borrowed from another M-targeted format.","Complete the fictional Q card by retaining accessible tumour protein, healthy-tissue effects, full-product delivery and relevant human outcomes as missing evidence. A research lead first reviews methods, controls and Q-specific product data; this existing-data review consumes no tissue. Pause experiment planning if product identity or usable evidence remains unavailable, and ask which Q-specific result would change the experiment plan. RNA abundance is a different observation from accessible surface protein. Mertins and colleagues measured RNA, protein and phosphoprotein layers in primary breast cancers; that work is not a cell-surface-accessibility or treatment-selection assay. Confirming protein would answer another premise while leaving benefit unproven.","Now change only the fictional request: after complete tumour removal, someone proposes manufacturing Q and administering it to prevent recurrence because M RNA was abundant, an IND is said to be active and a supplier offers manufacture. The setting and commitments have changed, while the dossier is still one biopsy RNA signal plus cultured-cell activity. Neither that evidence nor the attributed investigational milestone or supply offer establishes postoperative benefit. Ask the clinical team for Q-specific human evidence or a relevant protocol, the sponsor which product and protocol are covered, and the readiness owner about delivery requirements. In the United States an effective Investigational New Drug application is not marketing approval, and submission of a Biologics License Application is not its approval. A manufacturing quote cannot confirm supply, consent, review, delivery and monitoring as a whole. With only this dossier, evidence and pathway review are justified; manufacture or administration is not justified by the supplied information. Speculative availability does not promise access or protection against recurrence."],
"asOf": "2026-11-12"
,
"links": [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Targeted_therapy"},{"label":"NCI: targeted therapy, different antibody actions, resistance and adverse effects","url":"https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies"},{"label":"TRODELVY U.S. label: indications, mechanism and named pharmacokinetic measurements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"},{"label":"KIMMTRAK U.S. label: gp100 peptide-HLA-A*02:01/CD3 recognition and indication","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"},{"label":"FDA: Clinical Pharmacology Considerations for Antibody-Drug Conjugates (March 2024)","url":"https://www.fda.gov/media/155997/download"},{"label":"FDA: Considerations for the Development of CAR T Cell Products (January 2024)","url":"https://www.fda.gov/media/156896/download"},{"label":"FDA: Oncology Therapeutic Radiopharmaceuticals, Nonclinical Studies and Labeling (August 2019)","url":"https://www.fda.gov/media/129547/download"},{"label":"Mertins et al.: separate RNA, protein and phosphoprotein layers (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27251275/"},{"label":"FDA: Investigational New Drug application overview","url":"https://www.fda.gov/drugs/types-applications/investigational-new-drug-application-ind"},{"label":"FDA: Biologics License Applications for CBER-regulated products","url":"https://www.fda.gov/vaccines-blood-biologics/development-approval-process-cber/biologics-license-applications-blas-cber-regulated-products"}]
}),
  t({
    id: "hormone-therapy", name: "Hormone therapy", category: CLINIC,
    aka: ["hormone therapies", "hormonal therapy", "hormonal therapies", "endocrine therapy", "endocrine therapies", "anti-hormone", "antihormonal", "hormone-sensitive", "hormone sensitive", "hormone-driven", "hormone receptor", "hormone receptors", "hormone-receptor positive", "hormone receptor positive", "hormone-receptor-positive", "HR-positive", "HR+", "castration", "castration-resistant", "castration-sensitive"],
    tldr: "Treatment that starves cancers which grow in response to a hormone, mainly oestrogen in breast cancer and testosterone in prostate cancer, by lowering the hormone or blocking its receptor.",
    summary: "About 70% of breast cancers carry the oestrogen receptor and most prostate cancers depend on the androgen receptor; drugs either stop the hormone being made (aromatase inhibitors, GnRH analogues, abiraterone) or block the receptor (tamoxifen, fulvestrant, enzalutamide), and newer agents degrade the receptor outright (elacestrant, vepdegestrant). Hormone therapy is given as tablets or injections for years, has fewer acute side effects than chemotherapy, and prevents many recurrences; its limits are resistance, when the tumour mutates the receptor or bypasses it (hence combining with CDK4/6, PI3K or AKT inhibitors), and long-term effects on bone, mood, and sexual function. 'Castration-resistant' prostate cancer is disease that keeps growing despite testosterone suppression.",
    wikipedia: W("Hormonal_therapy_(oncology)"),
    related: ["receptor", "agonist-antagonist", "targeted-therapy-term", "resistance", "maintenance-therapy"], targets: ["estrogen-receptor", "androgen-receptor", "cdk4-6"], technologies: ["endocrine-therapy", "androgen-deprivation", "cdk46-inhibitor"], cancers: ["breast-hr-positive", "prostate"], drugs: ["elacestrant", "vepdegestrant", "palbociclib"], pathways: ["er-signaling", "ar-signaling"],
  }),
  t({
    asOf:"2026-11-09", links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Radiation_therapy"},{"label":"NCI: radiation mechanisms, delivery and goals","url":"https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy"},{"label":"NCI: external-beam planning and schedules","url":"https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/external-beam"},{"label":"IAEA 2005 physics handbook: absorbed dose and radiobiology","url":"https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1196_web.pdf"}],
    id: "radiotherapy", name: "Radiotherapy", category: CLINIC,
    aka: ["radiation therapy", "radiation treatment", "radiation", "irradiation", "irradiated", "radiotherapy fractions", "fractionation", "hypofractionated", "chemoradiotherapy", "chemoradiation", "radiation oncology", "radiation oncologist", "radiosensitiser", "radiosensitizer", "radiosensitive", "radioresistant", "external beam", "radiation oncologists", "radiosensitisers"],
    tldr: "Radiotherapy deposits ionising radiation in tissue to damage cancer cells. The target, normal tissues, treatment schedule and clinical goal all matter.",
    summary: "Radiation transfers energy to tissue and can damage DNA directly or through reactive molecules. Cells can repair damage or lose their ability to keep dividing, and death can occur later. One treatment session is an exposure, rather than an immediate count of dead cells. Oxygen, cell state and repair affect the response.\n\nExternal beams, brachytherapy sources and systemically distributed radiopharmaceuticals have different exposure patterns. An external-beam target can include tissue at risk of microscopic disease after surgery, even when no mass is visible. Planning and verification consider geometry, motion, normal organs and previous overlapping exposure. Precision does not eliminate normal-tissue dose or injury.\n\nAbsorbed dose in gray is energy per mass: one gray is one joule per kilogram. Total dose, fraction size, timing and exposed volume influence biological effects. Physical-dose arithmetic alone does not establish equivalence of schedules. Local or regional control, symptom relief, distant disease and survival remain distinct clinical outcomes.",
    wikipedia: W("Radiation_therapy"),
    related: ["systemic-vs-local-therapy", "dna-term", "abscopal-effect", "apoptosis", "palliative-treatment", "toxicity-grade"], technologies: ["imrt-igrt", "sbrt", "proton-therapy", "brachytherapy", "radioligand-therapy", "mr-linac", "flash-rt"],
  }),
  t({
    asOf:"2026-11-09", notes:["BOOSTER studied ablation during ongoing immunotherapy after limited residual lung disease; CURB studied SBRT for oligoprogression in lung and breast cohorts; NRG-BR002 studied ablation during first-line systemic treatment for limited metastatic breast cancer. PACIFIC tested consolidation durvalumab after concurrent chemoradiotherapy in nonprogressing stage III lung cancer. These are distinct settings and intervention contrasts."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Systemic_therapy"},{"label":"NCI: radiation delivery and treatment goals","url":"https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy"},{"label":"BOOSTER primary report","url":"https://pubmed.ncbi.nlm.nih.gov/41213939/"},{"label":"CURB primary report","url":"https://pubmed.ncbi.nlm.nih.gov/38104577/"},{"label":"NRG-BR002 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/42842849/"},{"label":"PACIFIC five-year report","url":"https://pubmed.ncbi.nlm.nih.gov/35108059/"}],
    id: "systemic-vs-local-therapy", name: "Systemic versus local therapy", category: CLINIC,
    aka: ["systemic therapy", "systemic therapies", "systemic treatment", "systemic treatments", "systemic", "systemically", "local therapy", "local therapies", "local treatment", "local treatments", "locoregional", "locoregional therapy", "local control", "local-regional", "loco-regional", "multimodal", "multimodality", "combined modality"],
    tldr: "Local and regional treatments act in selected anatomical areas; systemic treatments circulate more broadly. The route does not guarantee adequate exposure or cancer control at every site.",
    summary: "Surgery, ablation and external radiation address defined tissues, while systemically administered medicines and radiopharmaceuticals distribute more broadly. Regional delivery has an intermediate anatomical scope. Distribution, effective exposure and benefit are separate questions; neither local nor systemic is a guarantee of complete cellular coverage.\n\nLocal control, distant progression, progression-free survival, overall survival and symptom relief should be measured separately. A null added-survival comparison does not make palliation irrelevant, and a controlled treated site does not establish control throughout the body. Compare the actual complete strategies rather than assuming that adding a local method always improves outcomes.",
    wikipedia: W("Systemic_therapy"),
    related: ["radiotherapy", "chemotherapy-term", "neoadjuvant-adjuvant", "metastasis", "oligometastatic", "primary-tumour"], technologies: ["robotic-surgery", "sbrt", "hipec", "radioligand-therapy"],
  }),
  t({
    id: "maintenance-therapy", name: "Maintenance therapy", category: CLINIC,
    aka: ["maintenance", "maintenance treatment", "maintenance setting", "continuation therapy", "consolidation", "consolidation therapy", "switch maintenance", "continuation maintenance", "PARP maintenance", "lenalidomide maintenance", "until progression", "treat to progression", "indefinite therapy", "maintenance-therapy-term"],
    tldr: "Ongoing, gentler treatment given after the main course has shrunk the cancer, to hold it in check for as long as possible rather than to shrink it further.",
    summary: "Maintenance is standard in several settings: PARP inhibitors after platinum chemotherapy in ovarian cancer, pemetrexed or immunotherapy after induction chemotherapy in lung cancer, lenalidomide after transplant in myeloma, and rituximab in follicular lymphoma. The rationale is that the disease remaining after induction is small and slow-growing, so a tolerable long-term drug can delay progression by months or years, while the cost is cumulative side effects and expense during a period when the patient feels well. Trials of maintenance measure progression-free survival above all, and whether they extend overall survival is often debated.",
    wikipedia: W("Maintenance_therapy"),
    related: ["first-line", "pfs", "remission", "progression", "neoadjuvant-adjuvant", "fixed-duration", "consolidation-therapy", "umrd"], technologies: ["parp-inhibitor"], drugs: ["olaparib", "niraparib", "lenalidomide"], cancers: ["ovarian", "nsclc", "multiple-myeloma", "urothelial"],
    sections: ["chemotherapy", "targeted-therapy"],
  }),
  t({
    id: "palliative-treatment", name: "Palliative", category: CLINIC,
    aka: ["palliation", "palliative intent", "palliative treatment", "palliative therapy", "palliative chemotherapy", "symptom control", "symptom relief", "best supportive care", "supportive care", "end-of-life care", "hospice", "curative intent", "curative-intent", "with curative intent", "non-curative", "incurable"],
    tldr: "Treatment aimed at relieving symptoms and improving quality of life rather than curing the disease. Not the same as end-of-life care: palliative treatments are given alongside anticancer drugs at every stage.",
    summary: "In oncology, 'palliative intent' describes treatment for a cancer that cannot be cured, where the aim is to shrink or slow it to relieve pain, breathlessness or obstruction and to extend life with good function; palliative radiotherapy to a painful bone metastasis is a textbook example. Palliative care as a specialty manages pain, nausea, fatigue and distress, and trials have shown that involving it early, from diagnosis of advanced cancer, improves quality of life and mood and may lengthen survival. Most systemic therapy for stage IV solid tumours is palliative in intent, which is why quality of life and toxicity matter so much in judging it.",
    wikipedia: W("Palliative_care"),
    related: ["quality-of-life", "palliative-care", "palliative-radiotherapy", "metastasis", "systemic-vs-local-therapy"], technologies: ["palliative-care"],
  }),

  // =====================================================================================
  // Response and outcomes
  // =====================================================================================
  t({
    id: "remission", name: "Remission", category: CLINIC,
    aka: ["remissions","in remission","complete remission","partial remission","durable remission","durable remissions","functional cure","no evidence of disease","NED","disease-free"],
    tldr: "When the signs of cancer have shrunk (partial remission) or disappeared entirely (complete remission). It is not the same as cure, because cells too few to detect may remain.",
    summary: "Remission means a decrease or disappearance of signs and symptoms of cancer. In partial remission, some but not all have disappeared; in complete remission, all have disappeared, although cancer may still remain in the body. The assessment and its criteria depend on the cancer and the test or clinical context. Remission describes what is observed, rather than establishing that every cancer cell has been eliminated or that cancer will never return. The term itself supplies no universal timetable for declaring cure.",
    wikipedia: W("Remission_(medicine)"),
    related: ["complete-response", "partial-response", "mrd", "relapse-recurrence", "progression", "os"],

"asOf": "2026-11-11",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Remission_(medicine)"
  },
  {
    "label": "NCI Dictionary: remission",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/remission"
  },
  {
    "label": "NCI: understanding cancer prognosis",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/prognosis"
  }
]
}),
  t({
    asOf:"2026-11-09", notes:["A zero in a fictional volume exercise is not a clinical response criterion. A single measurement cannot establish durability; the actual assessment method and subsequent follow-up remain necessary."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Response_evaluation_criteria_in_solid_tumors"},{"label":"FDA 2018: response, duration and clinical endpoint context","url":"https://www.fda.gov/media/71195/download?attachment="},{"label":"RECIST 1.1 primary guideline: definitions and confirmation, 2009","url":"https://pubmed.ncbi.nlm.nih.gov/19097774/"},{"label":"RECIST 1.1 full guideline: overall categories and duration sections","url":"https://project.eortc.org/recist/wp-content/uploads/sites/4/2015/03/RECISTGuidelines.pdf"}],
    id: "complete-response", name: "Complete response", category: CLINIC,
    aka: ["complete responses", "CR", "complete responder", "complete responders", "radiographic complete response", "clinical complete response", "cCR"],
    tldr: "Complete response means no detectable tumour under the stated assessment rules. It does not by itself establish cure, microscopic absence or lasting benefit.",
    summary: "Complete response means that the assessment meets its specified criteria for no detectable tumour. The method, disease, body sites and time matter. It does not establish that every unseen cancer cell is absent or that the response will last.\n\nRECIST 1.1 combines target, non-target and new-lesion findings. Target disappearance alone is not sufficient for overall complete response; pathological lymph nodes must meet the short-axis rule. Confirmation is required in non-randomised trials with response as the primary endpoint, rather than in every study. Report confirmed and unconfirmed results using the actual protocol.\n\nAn imaging category is different from a pathological response based on examined tissue. The exact pathological definition, including the tissue and any nodal requirements, must be stated. Response classification, symptom relief, duration and survival answer different questions.",
    wikipedia: W("Response_evaluation_criteria_in_solid_tumors"),
    related: ["partial-response", "stable-disease", "progression", "orr", "recist", "pcr", "remission", "duration-of-response"],
  }),
  t({
    id: "partial-response", name: "Partial response", category: CLINIC,
    aka: ["partial responses","responders","responder","non-responders","non-responder","response rate","response rates","tumour shrinkage","tumor shrinkage","shrank","shrinkage","responds to"],
    tldr: "The tumours have shrunk substantially (by at least 30% in total diameter) but not disappeared. Together with complete responses it makes up a trial's response rate.",
    summary: "RECIST 1.1 defines partial response as at least a 30% decrease in the sum of the longest diameters of the target lesions with no new lesions; the response must be confirmed on a later scan. Response rate (complete plus partial) is the quickest signal that a drug is active and the basis of many accelerated approvals, but shrinkage does not always translate into longer life, and some effective drugs, notably immunotherapies and some targeted agents, produce long stable disease rather than shrinkage. How long a response lasts (duration of response) is often more informative than how many patients achieve one.",
    wikipedia: W("Response_evaluation_criteria_in_solid_tumors"),
    related: ["complete-response", "stable-disease", "progression", "orr", "recist", "duration-of-response", "surrogate-endpoint"],
  }),
  t({
    id: "stable-disease", name: "Stable disease", category: CLINIC,
    aka: ["disease stabilisation", "disease stabilization", "stabilised", "stabilized", "disease control", "disease control rate", "clinical benefit rate", "DCR", "CBR"],
    tldr: "The tumours have neither shrunk enough to count as a response nor grown enough to count as progression. For a slow cancer or a well-tolerated drug, months of stability can be a real benefit.",
    summary: "Under RECIST, stable disease is anything between a 30% decrease and a 20% increase in the sum of target-lesion diameters, with no new lesions. It is ambiguous on its own, because an indolent tumour may be stable without any treatment, so trials report the disease control rate (responses plus stable disease) with caution and prefer to measure how long disease stays controlled. Drugs that mainly stabilise rather than shrink, such as anti-angiogenics and some hormonal agents, are judged on progression-free and overall survival rather than response.",
    wikipedia: W("Response_evaluation_criteria_in_solid_tumors"),
    related: ["partial-response", "complete-response", "progression", "recist", "pfs"],
  }),
  t({
    id: "progression", name: "Progression", category: CLINIC,
    aka: ["progressive disease", "disease progression", "progressed", "progresses", "progressing", "on progression", "at progression", "after progression", "post-progression", "radiographic progression", "progressed on", "growth of the tumour", "tumour growth", "tumor growth"],
    tldr: "The cancer is growing or spreading despite treatment, or after it. Progression usually means the current drug has stopped working and it is time to switch to the next line.",
    summary: "RECIST defines progression as at least a 20% increase in the sum of target-lesion diameters (and at least 5 mm absolute), or the appearance of any new lesion; clinical progression (worsening symptoms) can also count. Progression triggers the move from first-line to second-line therapy and, increasingly, a repeat biopsy or liquid biopsy to see what resistance mechanism has emerged. Time to progression is the basis of progression-free survival, the commonest primary endpoint in trials, and 'pseudoprogression', an apparent enlargement caused by immune cells flooding a tumour, can mislead early scans during immunotherapy.",
    wikipedia: W("Progressive_disease"),
    related: ["pfs", "recist", "first-line", "resistance", "relapse-recurrence", "stable-disease", "partial-response"],
  }),
  t({
    id: "relapse-recurrence", name: "Recurrence and relapse", category: CLINIC,
    aka: ["recurrence", "recurrences", "recurrent", "recurred", "recurs", "recur", "relapse", "relapsed", "relapses", "relapsing", "relapsed/refractory", "relapsed or refractory", "R/R", "local recurrence", "distant recurrence", "recurrent disease", "recurrent cancer", "came back"],
    tldr: "The cancer has come back after a period in which it could not be detected. 'Recurrence' is the usual word for solid tumours and 'relapse' for blood cancers; they mean the same thing.",
    summary: "Recurrence is cancer becoming detectable again after a period without detected disease. In breast cancer it can be local in the breast or chest wall, regional in nearby nodes, or distant in other organs; an unrelated second primary is a different event. Surviving cells can contribute to recurrence, but timing alone does not prove a specific resistance or dormancy mechanism.\n\nInterpret the interval with the starting event, stage, treatments, response and follow-up. A blood test may detect molecular evidence in a particular study before clinical recurrence, but there is no universal lead time or automatic proof that acting on it improves outcomes. Care depends on the confirmed disease and its setting.",
    wikipedia: W("Relapse"),
    related: ["remission", "progression", "refractory", "mrd", "ctdna", "tumor-dormancy", "neoadjuvant-adjuvant", "efs", "disseminated-tumor-cells"],

"asOf": "2026-11-11",
"notes": [
  "Dent and colleagues studied 1,601 women diagnosed with breast cancer in 1987 to 1997, including 180 with TNBC. Distant-recurrence risk in the TNBC group peaked around three years from diagnosis and then declined. This historical group pattern is not a modern percentage, a personal next-year probability or a deadline after which recurrence cannot occur. Stage, treatment and response affect whether a group is relevant.",
  "Reddy and colleagues selected 873 stage I to III patients who were already disease-free five years after diagnosis. Their reported ten-year and fifteen-year recurrence-free intervals were 97% and 95%, measured from diagnosis within that selected group. The historical TNBC definition included some low-hormone-receptor-positive cancers. A fictional newly diagnosed patient cannot directly use those estimates as if selection at five disease-free years had already occurred. The landmark selects who is included; it does not make the endpoints or original clock interchangeable.",
  "Kennecke and colleagues studied early breast cancers diagnosed in 1986 to 1992 and kept basal-like and triple-negative nonbasal groups separate. Their relative brain and lung patterns compared with luminal A do not supply current absolute risks or a universal ranking of where recurrence will occur. Bone, lung, liver and brain are possible distant sites, not a prediction for one person. A share of recorded sites differs from risk among all original patients, and one person can contribute more than one site.",
  "A recurrence table needs the population, confirmed event definition and date, starting clock, follow-up, deaths and losses, plus whether it records first recurrence, any later recurrence or several sites in one person. Diagnosis, surgery and randomisation are different starting points. Raw fractions, time-to-event estimates and estimates accounting for competing events are different outputs. A later risk can be lower without being zero; an observed peak is not an individual prediction.",
  "Knowing a common site does not establish that a screening schedule saves lives. NCI's breast PDQ summarises older randomised follow-up trials in asymptomatic survivors of stages I to III disease: periodic bone scans, liver ultrasound, chest radiographs and liver-function tests did not improve survival or quality of life over routine examinations. These trials do not test every newer imaging or blood-test strategy, and they do not address ignoring new symptoms or findings. Prognosis and evidence for a surveillance strategy are separate questions."
],
"links": [
  {
    "label": "Dent R et al. (2007): Triple-negative breast cancer: clinical features and patterns of recurrence",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17671126/"
  },
  {
    "label": "nci recurrence",
    "url": "https://www.cancer.gov/types/breast/breast-cancer-survivorship/recurrence"
  },
  {
    "label": "nci prognosis",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/prognosis"
  },
  {
    "label": "Reddy SM et al. (2018): Long-term survival outcomes of triple-receptor negative breast cancer survivors who are disease free at 5 years and relationship with low hormone receptor positivity",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29235566/"
  },
  {
    "label": "Kennecke H et al. (2010): Metastatic behavior of breast cancer subtypes",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20498394/"
  },
  {
    "label": "Dawood S et al. (2012): Incidence of brain metastases as a first site of recurrence among women with triple receptor-negative breast cancer",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22359359/"
  },
  {
    "label": "nci breast pdq",
    "url": "https://www.cancer.gov/types/breast/hp/breast-treatment-pdq"
  }
,
{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Relapse"}
]
}),
  t({
    id: "refractory", wikipedia: W("Resistant_cancer"), links: [{ label: "NCI Dictionary of Cancer Terms: refractory cancer", url: "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/refractory-cancer" }], name: "Refractory", category: CLINIC,
    aka: ["treatment-refractory", "chemo-refractory", "chemorefractory", "platinum-refractory", "primary refractory", "refractory disease", "refractory to", "did not respond", "failed to respond", "unresponsive", "treatment-resistant", "heavily pretreated", "heavily pre-treated", "pretreated", "pre-treated"],
    tldr: "Cancer that does not respond to a treatment at all, or grows straight through it. Distinct from relapse, where the cancer responded first and came back later.",
    summary: "Refractory disease implies primary resistance: the tumour never depended on the drug's target, could not be reached by it, or had a resistant population from the outset. 'Relapsed or refractory' (R/R) is the standard label for the population in later-line trials, particularly in blood cancers, and 'platinum-refractory' ovarian cancer (progressing during or within a month of platinum chemotherapy) marks the group with the shortest survival. Because refractory patients have exhausted standard options, they are where new mechanisms are first tested and where the bar for approval is lowest.",
    related: ["resistance", "relapse-recurrence", "progression", "first-line", "accelerated-approval"],
  }),
  t({
    asOf:"2026-11-09", links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Response_evaluation_criteria_in_solid_tumors"},{"label":"FDA 2018: response, duration and clinical endpoint context","url":"https://www.fda.gov/media/71195/download?attachment="},{"label":"RECIST 1.1 primary guideline: definitions and confirmation, 2009","url":"https://pubmed.ncbi.nlm.nih.gov/19097774/"},{"label":"RECIST 1.1 full guideline: overall categories and duration sections","url":"https://project.eortc.org/recist/wp-content/uploads/sites/4/2015/03/RECISTGuidelines.pdf"}],
    id: "duration-of-response", name: "Duration of response", category: CLINIC,
    aka: ["DoR", "durable response", "durable responses", "durability", "long-lasting responses", "median duration of response"],
    tldr: "Duration of response measures how long a qualifying response lasts under a study’s timing and event rules. It concerns responders, with follow-up and censoring limits.",
    summary: "Duration of response describes time after an initial qualifying response in the responding population. RECIST 1.1 starts overall response duration when CR or PR is first documented and follows it to documented recurrence or progression. Duration of complete response has its own CR starting point. Neither clock is automatically the all-patient progression-free-survival clock.\n\nRead the protocol’s handling of death, missed assessments, later treatment and censoring. Scan frequency and follow-up affect what can be observed. A median or an ongoing-response proportion describes the specified analysis; a median not yet reached does not mean responses will last forever.\n\nResponse rate and duration provide different information. Neither alone establishes an individual cure or a comparative survival advantage. FDA’s oncology endpoint guidance considers their meaning in the particular disease, treatment setting, available alternatives and benefit-risk context; duration does not automatically turn a survival curve into a plateau.",
    wikipedia: W("Response_evaluation_criteria_in_solid_tumors"),
    related: ["partial-response", "complete-response", "orr", "pfs", "accelerated-approval", "immunotherapy-term"],
  }),
  t({
    id: "prognosis", name: "Prognosis", category: CLINIC,
    aka: ["prognostic", "prognoses", "poor prognosis", "good prognosis", "favourable prognosis", "unfavourable prognosis", "poor-prognosis", "good-prognosis", "prognostic factor", "prognostic factors", "life expectancy", "survival rate", "survival rates", "5-year survival", "five-year survival", "5-year survival rate"],
    tldr: "The expected course of a disease: how likely it is to be cured, how long a person is likely to live, and how they are likely to feel. Always an estimate based on groups of similar patients, never a prediction for one person.",
    summary: "Prognosis in cancer depends chiefly on stage, then on grade, histology, molecular subtype, and the patient's fitness and age; it is expressed as survival rates (the proportion alive at five years) or median survival, drawn from registries and trials of past patients treated with past therapies, so it lags behind current treatment. Prognostic biomarkers (Ki-67, Oncotype DX recurrence score, ctDNA after surgery) refine the estimate and, importantly, help decide who needs more treatment and who can be spared it. Distinguishing prognostic from predictive is essential: a prognostic marker says how the disease will behave whatever you do, a predictive marker says whether a specific drug will help.",
    wikipedia: W("Prognosis"),
    related: ["cancer-stage", "tumour-grade", "median-survival", "os", "biomarker", "mortality"],
  }),

  // =====================================================================================
  // Trial design and statistics
  // =====================================================================================
  t({
    id: "clinical-trial", name: "Clinical trial", category: CLINIC,
    aka: ["clinical trials", "clinical study", "clinical studies", "enrolled", "enrolment", "enrollment", "enrolling", "recruiting", "trial participants", "trial arm", "experimental arm", "control arm", "comparator arm", "single-arm", "single arm", "investigational", "trial participant"],
    tldr: "A research study that tests a treatment in volunteers under strict rules, to find out whether it is safe and whether it works. Every approved cancer drug went through several.",
    summary: "Trials have a written protocol specifying who may join, what they receive, what is measured and how the results will be analysed, and are overseen by ethics committees and regulators; participants give informed consent and are usually monitored more closely than in routine care. Cancer trials progress through phases, from small safety studies to large randomised comparisons against the standard of care, and their results, reported at congresses such as ASCO and ESMO and in journals, are what change practice and win approvals. Fewer than one in ten adult cancer patients take part, participation is skewed towards younger, wealthier and white patients, and the cost and duration of trials is one of the field's main bottlenecks.",
    wikipedia: W("Clinical_trial"),
    related: ["trial-phases", "randomised-trial", "placebo", "blinding", "endpoint", "standard-of-care", "basket-umbrella-platform", "real-world-evidence", "trial-lifecycle", "informed-consent", "ethics-review", "trial-registration", "clinical-equipoise"], technologies: ["ai-trial-matching"],
  }),
  t({
    id: "trial-phases", name: "Phase 1, 2 and 3 trials", category: CLINIC,
    aka: ["phase 1", "phase 2", "phase 3", "phase I", "phase II", "phase III", "phase 1/2", "phase I/II", "phase 2/3", "phase II/III", "phase 4", "phase IV", "first-in-human", "first in human", "dose-escalation", "dose escalation", "dose-finding", "pivotal trial", "pivotal trials", "pivotal", "registrational", "confirmatory trial", "confirmatory trials", "early-phase", "early phase", "late-phase", "late phase", "late-stage trial", "late-stage trials"],
    tldr: "Phase 1 studies dosage and safety; phase 3 compares treatments, often in hundreds or thousands of participants. The protocol determines the design and size, and a phase 3 label is not approval or a promise of benefit.",
    summary: "Clinical-trial phases describe development purposes rather than a fixed sample size, assignment method or promise of benefit. Phase 1 studies administration, exposure, safety and dosage, sometimes with early activity measures. Phase 2 asks whether activity and safety support further study in a specified population. Phase 3 compares with a defined alternative and can provide evidence for an approval decision; a phase 3 label is not itself approval. FDA's patient overview illustrates phase 3 with hundreds to thousands of participants, while the actual size follows the protocol's question and information requirements. Phase 4 studies an approved treatment in broader use. Read the protocol because phases can overlap or be combined.",
    wikipedia: W("Phases_of_clinical_research"),
    related: ["clinical-trial", "randomised-trial", "dose", "endpoint", "accelerated-approval", "standard-of-care", "surrogate-endpoint", "trial-lifecycle", "pivotal-trial", "confirmatory-trial", "first-in-human", "dose-escalation-design", "seamless-adaptive", "single-arm", "non-inferiority", "basket-umbrella-platform", "trial-protocol", "trial-registration", "ethics-review", "informed-consent", "data-monitoring-committee", "clinical-equipoise", "estimand", "kaplan-meier-curve", "absolute-benefit", "surrogate-validation", "quality-adjusted-survival", "trial-failure-modes", "basket-trial", "umbrella-trial", "response-adaptive-randomisation", "bayesian-trial-design", "sample-size-re-estimation", "smart-design", "biomarker-stratified-design", "pragmatic-trial", "registry-based-trial", "decentralised-trial", "n-of-1-trial", "cluster-randomised-trial", "stepped-wedge-design", "non-inferiority-margin", "stratified-randomisation", "group-sequential-design"], trials: ["navigate", "rejoice-ovarian01", "keynote-522", "adaura"],

"notes": [
  "A phase 1 activity signal neither establishes benefit nor excludes serious toxicity. A phase 2 study may be single-arm or randomized, and phase 3 may ask superiority or a prespecified non-inferiority question. Sample size follows the question and power or information assumptions; phase number alone does not determine it. A higher phase does not guarantee that a new treatment wins or that one participant benefits. Studying an approved product in phase 4 does not approve every investigated use. A single-arm study has one intervention group; identify its actual external comparison, if any, and endpoint.",
  "I-SPY 2 illustrates an adaptively randomized phase 2 platform. Its 2016 neratinib report describes assignment within biomarker subtypes based on Bayesian probabilities of treatment superiority over control; its veliparib-carboplatin report also describes adaptive assignment within subtype. These are properties of that platform, not every phase 2 trial. Recruitment status is another distinct question: overall recruiting status does not establish an available local cohort slot or that a particular person meets the protocol."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Phases_of_clinical_research"
  },
  {
    "label": "FDA: clinical research phases",
    "url": "https://www.fda.gov/patients/drug-development-process/step-3-clinical-research"
  },
  {
    "label": "NCI: how clinical trials work",
    "url": "https://www.cancer.gov/research/participate/clinical-trials/how-trials-work"
  },
  {
    "label": "ICH E9: statistical principles for clinical trials, 1998",
    "url": "https://www.fda.gov/media/71336/download"
  },
  {
    "label": "Adaptive Randomization of Neratinib in Early Breast Cancer",
    "url": "https://doi.org/10.1056/NEJMoa1513750"
  },
  {
    "label": "Adaptive Randomization of Veliparib–Carboplatin Treatment in Breast Cancer",
    "url": "https://doi.org/10.1056/NEJMoa1513749"
  },
  {
    "label": "I-SPY 2: an adaptive breast cancer trial design in the setting of neoadjuvant chemotherapy.",
    "url": "https://doi.org/10.1038/clpt.2009.68"
  },
  {
    "label": "ClinicalTrials.gov: overall and site recruitment status fields",
    "url": "https://clinicaltrials.gov/api/v2/studies/metadata"
  }
],
"asOf": "2026-11-11"
}),
  t({
    id: "randomised-trial", name: "Randomised trial", category: CLINIC,
    aka: ["randomised", "randomized", "randomisation", "randomization", "randomly assigned", "randomised controlled trial", "randomized controlled trial", "RCT", "RCTs", "randomised trials", "randomized trials", "randomised phase 3", "randomized phase 3", "controlled trial", "head-to-head", "controlled trials", "randomized trial"],
    tldr: "A study that assigns eligible participants to interventions by chance. This reduces treatment-selection bias but does not guarantee identical groups, flawless follow-up or benefit.",
    summary: "A randomized trial assigns eligible consenting participants to interventions by chance. Concealing the next assignment protects enrolment against foreknowledge; blinding concerns awareness after assignment. These are different design features. Randomization reduces treatment-selection confounding but leaves possible chance imbalance, missing outcomes and limits on applicability. The comparator, endpoint, analysis and conduct determine what the comparison establishes.",
    wikipedia: W("Randomized_controlled_trial"),
    links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Randomized_controlled_trial"
  },
  {
    "label": "CONSORT statement: reporting randomised trials",
    "url": "https://www.consort-statement.org/"
  },
  {
    "label": "CONSORT 2025 statement: Updated guideline for reporting randomised trials.",
    "url": "https://doi.org/10.1371/journal.pmed.1004587"
  },
  {
    "label": "ICH E9: statistical principles for clinical trials, 1998",
    "url": "https://www.fda.gov/media/71336/download"
  },
  {
    "label": "ICH E10: choice of control group",
    "url": "https://database.ich.org/sites/default/files/E10_Guideline.pdf"
  }
],
    related: [
  "clinical-trial",
  "placebo",
  "blinding",
  "trial-phases",
  "hazard-ratio",
  "p-value",
  "confidence-interval",
  "standard-of-care",
  "real-world-evidence",
  "stratified-randomisation",
  "clinical-equipoise",
  "cluster-randomised-trial",
  "pragmatic-trial",
  "intention-to-treat",
  "kaplan-meier-curve",
  "non-inferiority",
  "trial-failure-modes",
  "estimand",
  "publication-and-peer-review-status",
  "meta-analysis"
], trials: ["checkmate-067", "adaura", "interlace", "challenge", "protect"],

"notes": [
  "Concealed chance assignment is different from predictable alternation between A and B. Allocation concealment hides the next assignment during enrolment; blinding concerns who knows the assigned treatment afterwards and may not be feasible for every intervention. Report sequence generation, allocation, who was blinded, assigned-group analyses, exclusions, dropout, missing assessments, treatment changes and unequal follow-up. Chance can balance measured and unmeasured factors on average without guaranteeing identical groups in one trial. Random assignment is not random sampling from a population: consenting eligible volunteers remain selected.",
  "Controls can be standard care, standard care plus placebo or another protocol-defined option, not automatically no treatment. A fictional single-group Drug A study showing shrinkage supports an activity question for further study; it does not isolate added survival benefit from selection, natural history and other care. A randomized A-plus-usual-care versus usual-care comparison can test the added effect under sound conduct and analysis, while a volunteer cannot choose their randomized assignment or be promised benefit. A chance-assigned two-group phase 2 trial is randomized even though it is not phase 3."
],
"asOf": "2026-11-11"
}),
  t({
    notes:[],
    links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Placebo"},{"label":"NCI: eligibility, assignment and placebo comparisons","url":"https://www.cancer.gov/research/participate/clinical-trials/how-trials-work"},{"label":"FDA: placebos and blinding in cancer trials, August 2019 guidance","url":"https://www.fda.gov/media/130326/download"}],
    asOf:"2026-11-11",

    id: "placebo", name: "Placebo", category: CLINIC,
    aka: ["placebos", "placebo-controlled", "placebo controlled", "placebo arm", "placebo group", "dummy pill", "sugar pill", "placebo effect", "sham"],
    tldr: "A placebo is an inactive comparison treatment. A cancer trial may compare standard care plus placebo with standard care plus a new drug, or use another justified design. The protocol and consent explain what each group receives.",
    summary: "A placebo is an inert substance without pharmacological activity. In a blinded randomised trial, keeping participants and investigators unaware of assignment can reduce biased observations, especially for subjective outcomes. It does not guarantee that treatment remains concealed: characteristic adverse effects can reveal or suggest the assignment.\n\nFDA's August 2019 cancer-trial guidance describes selected uses, including add-on designs and settings where surveillance is standard care or no treatment is available. Replacing an available effective therapy with placebo alone is a different ethical question from adding placebo to standard care. NCI explains that a study can compare standard treatment plus placebo with standard treatment plus the study drug. Read the actual groups, protocol and consent rather than inferring no care, a guaranteed active drug or a universal trial design.\n\nThe FDA guidance recommends planned unblinding in specified circumstances, including documented progression when appropriate treatment alternatives exist and suspected drug-related adverse events whose management would involve substantial toxicity or invasive procedures. These are guidance recommendations with stated qualifications, not a rule that every trial must remain blinded or that visible side effects make blinding categorically impossible.",
    wikipedia: W("Placebo"),
    related: ["randomised-trial", "blinding", "clinical-trial", "standard-of-care", "side-effect-vs-adverse-event", "double-blind", "clinical-equipoise", "informed-consent", "n-of-1-trial"], trials: ["add-aspirin", "olanzapine-appetite-tmh", "keynote-564", "act-iv"],
  }),
  t({
    id: "blinding", name: "Blinded trial", category: CLINIC,
    aka: ["blinded", "double-blind", "double-blinded", "double blind", "single-blind", "open-label", "open label", "unblinded", "unblinding", "blinded review", "blinded independent review"],
    tldr: "Keeping patients (single-blind) or patients and doctors (double-blind) from knowing who is on which treatment, so that hopes and expectations cannot colour the results.",
    summary: "Blinding protects outcomes that involve judgement: how a patient rates their symptoms, whether a doctor decides a scan shows progression, or when to stop treatment; hard outcomes such as death are less vulnerable. Many cancer trials are open-label because the treatments are too different to disguise (an infusion versus a tablet, distinctive side effects), and they compensate by having scans read by a blinded independent central review (BICR) and by using overall survival, which cannot be biased by knowing the assignment. Unblinding a trial early, for example at an interim analysis, is a formal step overseen by an independent data monitoring committee.",
    wikipedia: W("Blinded_experiment"),
    related: ["randomised-trial", "placebo", "bicr", "clinical-trial", "endpoint", "double-blind", "stratified-randomisation", "clinical-equipoise"],
  }),
  t({
    notes:["A study question card keeps the population and setting, prior treatment and exclusions, complete intervention and comparator, endpoint definition and assessment, starting clock and horizon together. The intervention may be a sequence of medicines, procedures and surgery. Read the protocol and analysis plan for treatment stopping, switching and missing outcomes. A percentage without these details may answer a different question from the proposed action.","Consider a fictional trial in operable cancer with one random assignment to study drug plus common chemotherapy, surgery and study drug afterwards, or placebo on the same sequence. Comparing the whole assigned strategies does not isolate starting the drug only after surgery, because there is no second postoperative assignment. From the common randomisation origin, a recurrence in someone still alive and a death without earlier recurrence both count in a recurrence-or-death composite; only the death counts in overall survival. An improvement in a composite need not mean that every component improved. This is a reasoning example, with no dosing schedule or effect size.","For another fictional comparison, 95% alive three years after surgery and 90% free of recurrence or death three years after randomisation cannot be ranked as if they measured one outcome. The events and starting clocks differ; someone alive with recurrence contributes differently. An event-free percentage is not a permanent cure rate. State the eligible population, both complete strategies, event definition and origin before interpreting a benefit."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Clinical_endpoint"},{"label":"ICH E9(R1): estimands, intercurrent events and sensitivity analysis (May 2021)","url":"https://www.fda.gov/media/148473/download"},{"label":"FDA: oncology clinical endpoints, nonbinding guidance (December 2018)","url":"https://www.fda.gov/media/71195/download"}], asOf:"2026-11-12",
    id: "endpoint", name: "Endpoint", category: CLINIC,
    aka: ["endpoints", "end point", "end points", "primary endpoint", "primary endpoints", "secondary endpoint", "secondary endpoints", "co-primary", "dual primary", "met its primary endpoint", "primary outcome", "outcome measure", "outcome measures", "exploratory endpoint", "exploratory endpoints", "statistically significant", "statistical significance"],
    tldr: "An endpoint specifies an outcome and how and when it is assessed. A study's statistical plan determines what counts as meeting its primary endpoint.",
    summary: "A trial defines primary, secondary and exploratory outcomes and how they are measured and analysed. The primary question informs design, sample size and testing; having a secondary endpoint does not by itself establish whether it was adequately powered or met a prespecified testing rule. Overall survival concerns death from any cause, while response, progression, symptoms and quality of life answer different questions. A composite endpoint combines specified events, so its definition and starting time matter. FDA's December 2018 nonbinding oncology-endpoint guidance distinguishes direct clinical benefit and context-dependent surrogate evidence; use in an approval does not make an endpoint interchangeable with survival in every setting.",
    wikipedia: W("Clinical_endpoint"),
    related: ["surrogate-endpoint", "os", "pfs", "orr", "efs", "pcr", "hazard-ratio", "p-value", "randomised-trial", "surrogate-validation", "primary-endpoint", "quality-adjusted-survival", "qol-pro"],
  }),
  t({
    id: "surrogate-endpoint", name: "Surrogate endpoint", category: CLINIC,
    aka: ["surrogate endpoints", "surrogate", "surrogates", "surrogate marker", "surrogate markers", "surrogate outcome", "intermediate endpoint", "intermediate endpoints", "surrogate for survival", "validated surrogate", "intermediate clinical endpoint", "early endpoint", "reasonably likely to predict clinical benefit", "trial-level surrogacy", "patient-level surrogacy", "surrogacy", "surrogate-endpoint-term"],
    tldr: "A quicker, easier measurement used as a stand-in for what really matters. Tumour shrinkage or delayed growth stands in for living longer, on the assumption, not always true, that one leads to the other.",
    summary: "Progression-free survival, response rate, pathologic complete response, minimal residual disease and ctDNA clearance are the main surrogates in oncology; they are available months or years before overall survival and need fewer patients, so they drive most accelerated approvals and a share of full ones. A surrogate is valid for a given drug class and disease only if trials show that improving it reliably improves survival, and this correlation is strong in some settings (PFS in ovarian cancer maintenance) and weak in others (response rate in many solid tumours). When a surrogate-based approval is not confirmed by later survival data, the approval can be withdrawn, as has happened repeatedly since 2021.",
    wikipedia: W("Surrogate_endpoint"),
    related: ["endpoint", "pfs", "orr", "pcr", "mrd", "os", "accelerated-approval", "stage-shift", "primary-endpoint", "confirmatory-trial", "surrogate-validation", "efs", "trial-failure-modes"],
    sections: ["drug-discovery"], trials: ["keynote-522", "tropion-breast01", "announce", "ukctocs"],
  }),
  t({
    id: "hazard-ratio-basics", name: "Reading a hazard ratio", category: CLINIC,
    aka: ["hazard ratios", "relative risk", "risk reduction", "relative risk reduction", "reduced the risk of", "lower risk of death", "risk of death or progression", "risk of progression or death", "relative risks"],
    tldr: "A hazard ratio of 0.70 means that at any given moment the event rate among people still at risk in the treatment group is 30% lower than in the comparison group under the model. It says nothing about how many months that is worth.",
    summary: "A hazard ratio compares instantaneous event rates among people who remain at risk. Its value alone does not specify absolute survival probabilities or a difference between median survival times. Read it with event counts, follow-up, survival curves and uncertainty. A proportional-hazards model treats the hazard ratio as constant over time; if it changes, one summary ratio can conceal that change. Comparing later at-risk groups also requires care because their membership can differ, even after initial randomisation.",
    wikipedia: W("Hazard_ratio"),
    related: ["hazard-ratio", "confidence-interval", "p-value", "median-survival", "os", "pfs", "endpoint", "absolute-benefit", "kaplan-meier-curve"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "Cox: proportional-hazards model",
    "url": "https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  },
  {
    "label": "Hernan: interpretation of hazard ratios",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20010207/"
  }
]
}),
  t({
    id: "median-survival", name: "Median survival", category: CLINIC,
    aka: ["median overall survival","median OS","median PFS","median progression-free survival","median follow-up","median time to","survival curve","survival curves","Kaplan-Meier","Kaplan–Meier","landmark analysis","long tail"],
    tldr: "The time by which half the patients in a group have died (or, for other endpoints, progressed). It is the midpoint of a spread, not a prediction for anyone: half live longer, some much longer.",
    summary: "Medians are used rather than averages because some patients live far longer than the rest and the average would be dragged up and undefined until the last patient dies; the median can be read off the survival curve at the point where it crosses 50%. Comparing medians between arms gives an absolute benefit in months, complementing the hazard ratio's relative measure, but it captures only one point on the curve: two treatments with the same median can differ hugely in the proportion alive at three years, which is where immunotherapy's long tail shows up. 'Median not reached' means fewer than half the patients had the event at the time of analysis, a good sign that is also frustratingly uninformative.",
    wikipedia: W("Kaplan%E2%80%93Meier_estimator"),
    related: ["os", "pfs", "hazard-ratio", "hazard-ratio-basics", "prognosis", "confidence-interval"],
  }),
  t({
    id: "confidence-interval", name: "Confidence interval", category: CLINIC,
    aka: ["confidence intervals", "95% CI", "95% confidence interval", "95%CI", "interval estimate", "margin of error"],
    tldr: "A confidence interval shows an estimate's precision under a stated method. A 95% method covers the fixed true value in about 95% of repeated valid applications; it does not assign a 95% probability to the value lying in this particular interval.",
    summary: "Because a trial studies a sample rather than every patient in the world, its estimate carries uncertainty, and the confidence interval expresses it: more information often narrows the interval, while the method, data structure and assumptions also matter. For a conventional matching two-sided 95% interval and test, a hazard-ratio interval that excludes 1.0 corresponds to a p-value below 0.05; for a difference in months or percentage points, the interval must exclude zero. Reading the interval rather than just the point estimate shows how large or small the true benefit could plausibly be, and limits close to no effect should be read with the whole interval, clinical question and assumptions. Their position alone does not quantify how the result would change under different data or analyses.",
    wikipedia: W("Confidence_interval"),
    related: [
  "p-value",
  "hazard-ratio",
  "hazard-ratio-basics",
  "randomised-trial",
  "endpoint",
  "statistical-significance",
  "non-inferiority-margin",
  "absolute-benefit",
  "bayesian-trial-design",
  "sample-size-re-estimation",
  "odds-ratio",
  "population-versus-individual-risk"
],

"asOf": "2026-11-10",
"links": [
  {
    "label": "NIST: confidence limits and repeated coverage",
    "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm"
  },
  {
    "label": "Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations.",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4877414/"
  },
  {
    "label": "Greenland et al., 2016: statistical tests and confidence-interval interpretation",
    "url": "https://doi.org/10.1007/s10654-016-0149-3"
  },
  {
    "label": "OncoGuide: confidence-interval (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/effect-measures/confidence-interval.md"
  }
],
"notes": [
  "A frequentist confidence interval describes estimation precision using a procedure with a stated coverage rate under its assumptions. Across repeated valid applications, a 95% procedure would include the fixed true parameter in 95% of its intervals. This does not assign a 95% probability to that parameter being inside one interval after it has been calculated, or describe a range containing 95% of patients. The result depends on the data structure, estimator, confidence level, model and calculation method, including adjustment, missing-data handling and multiplicity. More observations often improve precision but do not remove biased measurement, confounding or a wrong model.",
  "The no-difference value is zero for differences and one for ratios. Including it does not prove equality. A fictional hazard ratio of 0.70 with an interval of 0.35 to 1.40 leaves substantial benefit and harm compatible with the analysis; 0.70 with an interval of 0.65 to 0.76 is more precise. Neither establishes personal benefit or applicability to another population. Likewise, a risk-difference interval of -8 to +10 percentage points does not establish equivalence. That requires justified, preferably prespecified lower and upper bounds and a suitable equivalence analysis; non-inferiority asks a separate question about one permitted-loss margin. Compare groups by estimating their difference directly, rather than judging whether two separate intervals overlap. Many unadjusted intervals also raise a multiplicity problem.",
  "For a fictional binary outcome in 50 of 100 independent people, the normal-approximation standard error is sqrt(0.50 × 0.50/100) = 0.05. The approximate 95% interval is 0.50 ± 1.96 × 0.05, or 40.2% to 59.8%. With 5,000 of 10,000 people, the proportion stays 50% but the standard error becomes 0.005 and the interval 49.02% to 50.98%. Small counts, proportions near zero or one, clustering and incomplete outcomes may require other methods. A hand-picked set of ten such intervals, nine containing a fixed 50% truth and one missing it, illustrates coverage but does not measure a procedure's coverage rate. A 95% method need not cover in exactly 95% of a small set. Narrower bounds indicate greater sampling precision, not less bias.",
  "A prediction interval addresses a future observation and includes additional variability. A Bayesian credible interval gives a probability interpretation conditional on the chosen model and prior. These are different constructions, not alternative names for a frequentist confidence interval."
]
}),
  t({
    id: "p-value", name: "P-value", category: CLINIC,
    aka: ["p-values", "p value", "p values", "p<0.05", "p < 0.05", "p<0.001", "p < 0.001", "significance level", "two-sided", "one-sided", "nominal p", "nominally significant", "did not reach statistical significance", "not statistically significant", "non-significant", "nonsignificant"],
    tldr: "The probability of a test statistic at least as extreme as observed, assuming the specified null model and all analysis assumptions. A value below 0.05 is conventionally called statistically significant. It does not give the probability that this finding is false or measure the size of a benefit.",
    summary: "A small p-value means the result would be unlikely under the specified null model and analysis assumptions, but it does not measure how big or how clinically meaningful the effect is; a trivial benefit in a huge trial can have a tiny p-value while a large benefit in a small trial can miss significance. Trials with several endpoints or several interim looks must control their overall error allowance using the planned method (such as hierarchical testing or alpha spending), which is why an endpoint can be 'nominally significant' yet not count formally. The confidence interval conveys the same information about significance while also showing the size of the effect, and is generally more useful.",
    wikipedia: W("P-value"),
    related: ["confidence-interval", "hazard-ratio", "endpoint", "randomised-trial", "statistical-significance", "group-sequential-design", "bayesian-trial-design", "prespecified-vs-post-hoc"],

"asOf": "2026-11-10",
"links": [
  {
    "label": "The ASA Statement on p -Values: Context, Process, and Purpose",
    "url": "https://doi.org/10.1080/00031305.2016.1154108"
  },
  {
    "label": "ASA: official statement principles (2016)",
    "url": "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf"
  },
  {
    "label": "FDA: multiple endpoints in clinical trials (2022)",
    "url": "https://www.fda.gov/media/162416/download"
  },
  {
    "label": "OncoGuide: p-values-and-multiple-testing (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/effect-measures/p-values-and-multiple-testing.md"
  }
],
"notes": [
  "A p-value is calculated for a specified null hypothesis and analysis. Assuming that null model and the other analysis assumptions are true, it is the probability of a test statistic at least as extreme as the one observed. A small value indicates poor fit to that model; it is not the probability that the hypothesis is true, that the result occurred “by chance”, or that the selected finding is false. In particular, p = 0.03 does not mean a 97% probability of benefit. Omics analyses may test thousands of genes or pathways, and reporting only the most striking result hides the search. A selected small value can generate a hypothesis without establishing a drug dependency or clinical benefit. Error control cannot repair biased measurement or an irrelevant comparison, and prespecification reduces analytical flexibility without guaranteeing a sound design.",
  "With multiple hypotheses, the family-wise error rate is the probability of at least one false rejection in a defined family. The false discovery rate is the expected proportion of false rejections among the findings selected, conventionally zero when none are selected. They control different quantities. A confirmatory trial may allocate its error allowance across endpoints and interim analyses or use a prespecified testing sequence; exploratory analyses have a different role. Interpretation needs the complete family, hypotheses, test assumptions, one- or two-sided specification, order and chosen error-control method. Label raw and adjusted p-values and show effects and intervals beside them. Post hoc choices of outcomes, cutpoints or subgroups must remain visible.",
  "Suppose twenty independent valid tests all have true null hypotheses and each has a 5% false-rejection probability. The chance of at least one false rejection is 1 - 0.95^20, about 64.2%. For one, five and twenty tests, this chance is about 5%, 22.6% and 64.2%, respectively. This fictional calculation concerns the whole search, not the truth probability of an individual finding. Bonferroni divides a family allowance of 0.05 by twenty, giving 0.0025 per test: p = 0.03 passes an unadjusted 0.05 threshold but fails this correction. Correlation changes the independent-tests calculation; Bonferroni control itself does not require independence when the individual tests are valid. Family definition and method choice still matter.",
  "If fifty pathways were tested and one reported p = 0.04, a Bonferroni threshold for that family at 0.05 would be 0.05/50 = 0.001. The reported result fails that threshold; it does not prove the pathway has no biological role. The full results, planned method, effect estimate and uncertainty are needed. Missing a significance threshold can reflect low power and does not establish no effect. Conversely, a tiny p-value can accompany an effect too small to matter clinically. Equivalence and non-inferiority require their own justified margins and analyses. A diagnostic false-positive rate is a different quantity from a multiple-testing allowance. A Bayesian analysis can instead report posterior probabilities conditional on its specified model and prior. Those probabilities answer a different question from a p-value."
]
}),

  // =====================================================================================
  // Drugs, dosing, safety
  // =====================================================================================
  t({
    id: "dose", name: "Dose", category: CLINIC,
    aka: ["doses", "dosing", "dosage", "dosed", "dose level", "dose levels", "dose reduction", "dose reductions", "dose-reduced", "dose interruption", "dose modification", "dose modifications", "dose-limiting", "dose-limiting toxicity", "maximum tolerated dose", "MTD", "recommended phase 2 dose", "RP2D", "mg/kg", "mg/m²", "mg/m2", "flat dose", "weight-based", "every 3 weeks", "every three weeks", "Q3W", "Q2W", "cycles", "treatment cycle", "treatment cycles", "dosing schedule", "optimal dose", "dose optimisation", "dose optimization", "flat doses"],
    tldr: "How much of a drug is given, how often, and for how long. Cancer drugs have long been given at the highest dose a patient can stand, and regulators are now pushing for doses chosen for benefit rather than tolerability.",
    summary: "Chemotherapy doses are usually scaled to body surface area (mg/m²) or weight (mg/kg) and given in cycles, typically every one to three weeks, to let bone marrow recover; targeted drugs and antibodies are increasingly given at fixed doses. The traditional phase 1 approach escalates until side effects become dose-limiting and sets the maximum tolerated dose as the dose for later trials, a logic that suits chemotherapy but not targeted drugs, which may saturate their target well below the toxic dose; the FDA's Project Optimus now requires sponsors to compare doses. Dose reductions and interruptions for side effects are common in practice and do not necessarily reduce efficacy, as trials with lower-dose arms have shown for several drugs.",
    wikipedia: W("Dose_(biochemistry)"),
    related: ["toxicity-grade", "half-life", "trial-phases", "side-effect-vs-adverse-event", "bone-marrow"],

"notes": [
  "Dose, dosage, cumulative dose and dose intensity are different quantities. Dose is the quantity of drug (state the drug, the formulation and whether it is per administration or per day; milligrams, milligrams per kilogram and milligrams per square metre are different scales), and dosage is the dose with its schedule, meaning the interval between doses and the duration of treatment (FDA, 'Optimizing the Dosage of Human Prescription Drugs and Biological Products for the Treatment of Oncologic Diseases', August 2024, which says it does not specifically address several modalities). Cumulative dose adds the amounts given over a course. Dose intensity is the amount of a named drug delivered per unit time, commonly milligrams per square metre per week, and relative dose intensity divides delivered by a stated reference intensity, so it needs the reference regimen and method named; a delay lowers delivered intensity in the same proportion as an equal dose reduction, and the link between delivered intensity and response or survival has not been fully demonstrated (Alberto 1995). Equal milligrams of different medicines are not equivalent activity, and a body-size-normalised dose is not a laboratory concentration. Teaching arithmetic with invented units, not data: four 10-unit administrations over a 4-week window give 40 units and 10 units per week; the same four over 8 weeks give 5 units per week, 50 per cent of the first intensity, which says nothing about benefit, exposure or safety.",
  "A fictional reference intensity of 10 arbitrary units per week and delivered intensity of 8 gives relative dose intensity 8/10 = 0.8, or 80%. Neither that ratio nor a body-size-normalised administered dose measures the concentration at a target or the probability of benefit. For combinations, declare how the individual drugs' normalised ratios are summarised rather than adding milligrams of different substances."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Dose_(biochemistry)"
  },
  {
    "label": "FDA: optimizing the dosage of drugs for oncologic diseases (August 2024 guidance)",
    "url": "https://www.fda.gov/media/164555/download"
  },
  {
    "label": "Alberto, dose intensity in cancer chemotherapy (1995)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7626852/"
  }
],
"asOf": "2026-11-11"
}),
  t({
    id: "half-life", name: "Half-life", category: CLINIC,
    aka: ["half-lives", "half life", "plasma half-life", "elimination half-life", "pharmacokinetics", "pharmacokinetic", "PK", "cleared from the body", "drug exposure", "peak concentration", "Cmax", "AUC", "steady state", "steady-state"],
    tldr: "A half-life describes how long a specified drug concentration takes to fall by half under stated conditions; it does not by itself determine a treatment interval or when an effect ends.",
    summary: "A drug's half-life describes a halving of the concentration of a named substance in a specified phase or model. Early distribution, terminal elimination and the effective half-life relevant to accumulation can differ. With nonlinear elimination, a reported value can also depend on the dose. The December 2016 FDA clinical-pharmacology labelling guidance distinguishes effective from terminal half-life and asks for the conditions needed to interpret each.\n\nConcentration and effect need separate measurements. Active metabolites, persistent biological changes and tissue injury can matter after the measured parent drug has declined. Living cell products can expand rather than simply disappear, and a radiopharmaceutical combines physical decay with biological removal. A half-life alone supplies no universal treatment schedule or recovery clock.",
    wikipedia: W("Biological_half-life"),
    related: ["dose", "antibody", "fc-effector", "alpha-vs-beta", "dosimetry"], technologies: ["radioligand-therapy", "monoclonal-antibody"],

"notes": [
  "Which half-life? A half-life describes a halving of concentration of a named substance in a named phase or model, and early distribution and terminal decline can differ. FDA labelling guidance says the half-life reported should usually be the effective half-life, based on the time to reach steady state, with a long terminal half-life noted where it matters for safety or effectiveness; for radiopharmaceuticals the effective half-life takes both the physical and the biological half-life into account (FDA, 'Oncology Therapeutic Radiopharmaceuticals: Nonclinical Studies and Labeling Recommendations'). It is not a clock for how long benefit or harm lasts, since downstream effects can persist after exposure falls, and a freely circulating drug's half-life does not describe cell products."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Biological_half-life"
  },
  {
    "label": "FDA: clinical pharmacology section of labeling (2016 guidance)",
    "url": "https://www.fda.gov/media/74346/download"
  }
],
"asOf": "2026-11-11"
}),
  t({
    id: "toxicity-grade", name: "Toxicity grade", category: CLINIC,
    aka: ["toxicity","toxicities","grade 3","grade 4","grade 5","grade 3-4","grade 3/4","grade 3 or higher","grade ≥3","grade 3+","high-grade toxicity","severe toxicity","CTCAE","treatment-related","treatment-related adverse events","TRAEs","TRAE","serious adverse event","serious adverse events","SAE","discontinuation","discontinuation rate","treatment discontinuation","tolerability","tolerable","well tolerated","well-tolerated","safety profile","manageable"],
    tldr: "A 1 to 5 severity scale for side effects: grade 1 mild, grade 2 moderate, grade 3 severe and needing intervention, grade 4 life-threatening, grade 5 fatal. Trials report the percentage of patients with grade 3 or worse.",
    summary: "The Common Terminology Criteria for Adverse Events (CTCAE) define each grade for hundreds of specific effects, from nausea to neutropenia; 'grade 3 or higher' is the usual summary of how hard a treatment is to take, and the rates of dose reduction and discontinuation show how often it cannot be given as planned. Grading is done by clinicians and tends to underestimate symptoms that patients feel but doctors do not see (fatigue, nausea), so patient-reported versions (PRO-CTCAE) are increasingly collected. The same word 'grade' in 'tumour grade' means something entirely different.",
    wikipedia: W("Common_Terminology_Criteria_for_Adverse_Events"),
    related: ["side-effect-vs-adverse-event", "dose", "quality-of-life", "irae", "crs", "ild", "tumour-grade", "bone-marrow"],
  }),
  t({
    id: "side-effect-vs-adverse-event", name: "Side effect versus adverse event", category: CLINIC,
    aka: ["side effect", "side effects", "side-effect", "side-effects", "adverse event", "adverse events", "AE", "AEs", "adverse effect", "adverse effects", "adverse reaction", "adverse reactions", "any-grade", "all-grade", "grade 1-2", "low-grade toxicity", "late effects", "long-term effects", "late toxicity", "cumulative toxicity"],
    tldr: "An adverse event is an unwanted medical occurrence recorded during treatment or follow-up, whether or not treatment caused it; occurrence, severity and attribution are separate findings.",
    summary: "An adverse event can be an unfavourable sign, including an abnormal laboratory finding, symptom or disease temporally associated with a treatment or intervention. Recording it does not establish causation. Investigators separately assess severity and how likely it is to be related to treatment.\n\nA treatment-related adverse reaction is a more specific attribution. Safety comparisons should retain the event definition, population, observation window, denominator and attribution method. Seriousness is a separate reporting category and is not interchangeable with a severity grade. Some harms first arise or persist after treatment ends, so an administration calendar does not define the entire safety window.",
    wikipedia: W("Adverse_event"),
    related: ["toxicity-grade", "quality-of-life", "dose", "irae", "placebo", "survivorship-care-plan", "cardio-oncology"],

"notes": [
  "Occurrence, severity and attribution are recorded separately. The NCI Cancer Therapy Evaluation Program describes an adverse event as any unfavourable and unintended sign (including an abnormal laboratory finding), symptom or disease temporally associated with a drug or intervention, whether or not it is considered related; grading documents that it occurred and how severe it was; and the clinical team assigns attribution to the drug, the intervention or something else. Documenting an event therefore does not by itself show that the treatment caused it, and a report should keep suspected, attributed and resolved as different states."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Adverse_event"
  },
  {
    "label": "NCI CTEP: adverse events, grading and attribution",
    "url": "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events"
  }
],
"asOf": "2026-11-11"
}),
  t({
    id: "quality-of-life", keyPapers: ["paper-cella-fact-g-jco-1993"], name: "Quality of life", category: CLINIC,
    aka: ["QoL","HRQoL","health-related quality of life","patient-reported outcomes","patient-reported outcome","PRO","patient-reported","symptom burden","functional status","performance status","ECOG","ECOG 0-1","ECOG performance status","Karnofsky","time to deterioration","wellbeing"],
    tldr: "How a patient actually feels and functions day to day: symptoms, energy, mood, ability to work and live normally. Measured with questionnaires, it is the outcome that matters most alongside survival, and the one trials have historically neglected.",
    summary: "Standard instruments (EORTC QLQ-C30, FACT-G, EQ-5D) ask patients to rate pain, fatigue, nausea, physical and social function, and are collected repeatedly during a trial; results are reported as change from baseline or time until quality of life deteriorates. They matter because a drug that extends progression-free survival by two months while making patients feel worse may not be a good trade, and because regulators and health systems increasingly weigh them in approval and pricing. Performance status (ECOG 0 to 4) is the clinician's brief summary of how well a patient functions and gates who is fit enough for treatment and for trials.",
    wikipedia: W("Quality_of_life_(healthcare)"),
    related: ["side-effect-vs-adverse-event", "toxicity-grade", "palliative-treatment", "endpoint", "financial-toxicity"], technologies: ["geriatric-assessment"],
  }),
  t({
    id: "prodrug", name: "Prodrug", category: BIO,
    aka: ["prodrugs", "pro-drug", "activated in the body", "converted to its active form", "active metabolite", "active metabolites", "metabolised", "metabolized", "metabolism of the drug"],
    tldr: "A drug given in an inactive form that the body converts into the active medicine. It can make a drug easier to take, longer-lasting, or active only where it is needed.",
    summary: "Capecitabine is a tablet that liver and tumour enzymes convert to 5-fluorouracil, replacing an infusion; irinotecan is converted to the far more potent SN-38, and cyclophosphamide is activated by liver enzymes. The idea is extended in cancer therapy to drugs activated selectively in tumours, for instance masked antibodies whose binding site is uncovered by tumour enzymes, and ADCs, whose payload is inert until the linker is cut inside the target cell. Genetic differences in the activating and clearing enzymes (DPYD for fluoropyrimidines, UGT1A1 for irinotecan) explain why some patients suffer severe toxicity at standard doses and are now tested for in advance.",
    wikipedia: W("Prodrug"),
    related: ["dose", "half-life", "linker", "payload", "chemotherapy-term"], technologies: ["masked-adc", "adc", "topoisomerase-inhibitors"],
  }),

  // =====================================================================================
  // Regulatory and access
  // =====================================================================================
  t({
    notes:["Start with the exact medicine and proposed disease, dose and route. In a fictional three-proposal comparison, Drug A is approved for Cancer X but suggested for Cancer Y: ask for the off-label evidence and prescribing and payment arrangements. Product B has never been approved and is in a trial: ask about its protocol, site, cohort and eligibility. Product C is described as single-patient IND access: ask who supplies it, who takes clinical responsibility and what treatment plan and reviews apply. None of those descriptions establishes benefit or selects a treatment. A different dose and unapproved indication for an approved medicine also starts as an off-label question, although a trial can study it."],

    asOf: "2026-11-11", links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Off-label_use"},{"label":"FDA: unapproved use of an approved drug","url":"https://www.fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/understanding-unapproved-use-approved-drugs-label"},{"label":"FDA: expanded access","url":"https://www.fda.gov/news-events/public-health-focus/expanded-access"},{"label":"FDA: approved medicines used outside their labelling","url":"https://www.fda.gov/understanding-unapproved-use-approved-drugs-label"},{"label":"FDA: expanded-access request forms, individual-patient steps and emergency follow-up","url":"https://www.fda.gov/news-events/expanded-access/expanded-access-how-submit-request-forms"}],
    id: "off-label", name: "Off-label", category: CLINIC,
    aka: ["off label", "off-label use", "off-label prescribing", "on-label", "labelled indication", "labeled indication", "approved indication", "approved indications", "drug label", "prescribing information"],
    tldr: "Off-label use means using an approved medicine outside its approved labeling. The evidence for that particular use and whether it will be paid for need separate assessment.",
    summary: "A different disease, dose or route can make use of an approved medicine off label. FDA states that clinicians generally may prescribe an approved drug for an unapproved use when they consider it medically appropriate, but the original approval does not establish safety and effectiveness for that use. The supporting evidence can vary. A product never approved for any use is investigational rather than simply off label; clinical trials and expanded access have different arrangements. Approval, a guideline recommendation and insurance coverage are not interchangeable decisions.",
    wikipedia: W("Off-label_use"),
    related: ["standard-of-care","tumour-agnostic","basket-umbrella-platform","accelerated-approval","orphan-drug","rare-cancers","companion-diagnostic-term","label-indication","expanded-access","investigational-new-drug-application"],
  }),
  t({
    id: "orphan-drug", name: "Orphan drug", category: CLINIC,
    aka: ["orphan drugs", "orphan designation", "orphan drug designation", "orphan status", "orphan indication", "rare disease", "rare diseases"],
    tldr: "A drug for a rare disease (in the US, fewer than 200,000 patients) that gets extra incentives, tax credits, fee waivers and seven years of market exclusivity, to make development worthwhile. Most cancers qualify, so most cancer drugs are orphans.",
    summary: "The US Orphan Drug Act of 1983 and its EU equivalent in 2000 were designed for neglected diseases, but because cancer is subdivided into molecularly and anatomically defined groups, each individually rare, around 40% of new cancer drugs now carry orphan status, some of them blockbusters. The incentives have clearly accelerated drugs for rare cancers such as GIST, CML and mesothelioma, and critics argue they are also gamed by 'salami-slicing' indications and contribute to high prices. Orphan status is separate from the accelerated, breakthrough and priority pathways that speed review.",
    wikipedia: W("Orphan_drug"),
    related: ["rare-cancers", "accelerated-approval", "breakthrough-designation", "off-label", "tumour-agnostic"],
  }),

  // =====================================================================================
  // Epidemiology and prevention
  // =====================================================================================
  t({
    id: "incidence-vs-prevalence", name: "Incidence versus prevalence", category: CLINIC,
    aka: ["incidence", "prevalence", "incidence rate", "incidence rates", "new cases", "new cases per year", "cases per 100,000", "age-standardised", "age-standardized", "age-adjusted", "lifetime risk", "prevalent cases", "living with cancer"],
    tldr: "Incidence is how many new cases occur in a year; prevalence is how many people are living with the disease at a given moment. A curable or fast-killing cancer can have high incidence but low prevalence.",
    summary: "Incidence, usually given per 100,000 people per year and adjusted for age, is the measure for causes and prevention: it rises when a risk factor spreads (lung cancer after cigarettes) or when screening finds more cases (prostate cancer after PSA testing). Prevalence reflects both incidence and survival, so it grows as treatment improves, and is the measure for health-system planning and survivorship needs; there are now over 18 million cancer survivors in the United States. Lifetime risk (about one in two in high-income countries) is a cumulative incidence, and stage-specific incidence is what screening programmes aim to shift.",
    wikipedia: W("Incidence_(epidemiology)"),
    related: ["mortality", "risk-factor", "screening", "stage-shift", "cancer-registries-surveillance", "prognosis"],
  }),
  t({
    id: "mortality", name: "Mortality", category: CLINIC,
    aka: ["mortality rate", "mortality rates", "cancer mortality", "cancer deaths", "deaths per 100,000", "death rate", "death rates", "cancer-specific mortality", "disease-specific mortality", "all-cause mortality", "case fatality", "mortality benefit", "mortality reduction", "reduce mortality", "reduces mortality", "fatal", "cancer death"],
    tldr: "The number of deaths from a disease in a population per year. Cancer mortality has fallen about a third since 1991 in the US, mostly from less smoking, earlier detection and better treatment.",
    summary: "Mortality rates are the hardest measure of progress, because they are immune to the biases that inflate incidence and survival statistics: finding more harmless cancers raises incidence and apparent survival but does not reduce deaths. A screening test is only proven if it lowers disease-specific mortality in a randomised trial, as mammography, colonoscopy and low-dose CT for smokers have and PSA screening only marginally has; 'stage shift' is a surrogate for this. Cancer is now the leading cause of death in many high-income countries as heart disease declines, and global cancer deaths are rising with ageing populations even as age-adjusted rates fall.",
    wikipedia: W("Mortality_rate"),
    related: ["incidence-vs-prevalence", "screening", "stage-shift", "os", "prognosis", "cancer-registries-surveillance"],
  }),
  t({
    id: "risk-factor", name: "Risk factor", category: CLINIC,
    aka: ["risk factors", "risk-factor", "risk-factors", "modifiable risk factor", "modifiable risk factors", "carcinogen", "carcinogens", "carcinogenic", "cancer risk", "increased risk", "elevated risk", "higher risk", "relative risk of", "predisposition", "predisposing", "exposure to", "exposures", "attributable", "cancer risks"],
    tldr: "Anything that raises the chance of developing a cancer: smoking, alcohol, obesity, sunlight, certain infections, inherited genes, age. Around 40% of cancers in high-income countries are attributable to modifiable factors, so having a risk factor does not mean getting cancer, and the majority of cancers cannot be pinned on a modifiable one.",
    summary: "Around 40% of cancers in high-income countries are attributable to modifiable factors, tobacco alone causing about a fifth of cancer deaths, followed by excess weight, alcohol, infections (HPV, hepatitis B and C, H. pylori), ultraviolet light, and inactivity; the IARC classifies agents by the strength of evidence that they cause cancer in humans. Non-modifiable factors include age (the biggest), sex, inherited mutations, and family history. Risk factors drive prevention (vaccination, smoking cessation, alcohol policy), define who is offered screening (heavy smokers for lung CT, BRCA carriers for MRI), and, through the mutational signatures they leave, can sometimes be read directly from a tumour's DNA.",
    wikipedia: W("Risk_factor"),
    related: ["incidence-vs-prevalence", "screening", "hereditary-cancer-syndromes", "mutational-signature", "inflammation", "alcohol-attributable-cancer", "obesity-related-cancers"], technologies: ["hpv-vaccine", "chemoprevention"],
  }),
  t({
    id: "screening", name: "Screening", category: CLINIC,
    aka: ["cancer screening","screening programme","screening programmes","screening program","screening programs","screened","screening test","screening tests","population screening","overdiagnosis","overdiagnosed","over-diagnosis","overtreatment","false positive","false positives","false-positive","false negative","false negatives","false-negative","specificity","lead-time bias","length-time bias"],
    tldr: "Testing people who have no symptoms to catch cancer, or its precursors, early enough to cure. Proven for breast, cervical, colorectal and (in smokers) lung cancer; every test also finds some cancers that would never have caused harm.",
    summary: "A good screening test must find cancers at a stage where treatment changes the outcome, be acceptable and affordable for millions of healthy people, and cause more benefit than harm from false positives, unnecessary biopsies and overdiagnosis; it is judged ultimately by whether it lowers deaths in randomised trials. Mammography, cervical smears and HPV testing, colonoscopy and stool tests, and low-dose CT for heavy smokers meet this bar; PSA testing for prostate cancer is a marginal case where shared decision-making is advised. Multi-cancer early detection blood tests such as Galleri aim to screen for dozens of cancers at once and are being tested in large trials, with the risks of overdiagnosis and false reassurance under close scrutiny.",
    wikipedia: W("Cancer_screening"),
    related: ["early-detection-term", "stage-shift", "ppv", "in-situ", "mortality", "risk-factor", "lesion"], sections: ["early-detection"], technologies: ["mammography", "mced", "radiology-ai-screening"], drugs: ["galleri", "shield"],
  }),
  t({
    id: "early-detection-term", name: "Early detection", category: CLINIC,
    aka: ["early diagnosis", "detected early", "caught early", "diagnosed early", "found early", "earlier detection", "earlier diagnosis", "detecting cancer early", "detect cancer earlier", "early-stage diagnosis", "diagnostic delay", "late diagnosis", "late presentation"],
    tldr: "Finding a cancer while it is still small and confined, when it is most often curable. Five-year survival for most cancers is several times higher at stage I than at stage IV, which is why so much effort goes into detecting them sooner.",
    summary: "Early detection covers screening of healthy people, faster diagnosis of people with symptoms, and surveillance of those at high risk (BRCA carriers, Lynch syndrome, cirrhosis, Barrett's oesophagus); it works because a cancer often spends years growing locally before it spreads. Its limits are cancers that spread early or grow from tissue that is hard to image (pancreas, ovary, some lung cancers), and the overdiagnosis of slow cancers that would never have mattered. New approaches include blood tests for tumour DNA and proteins, AI reading of routine scans, and risk-based rather than age-based screening; whether they reduce deaths rather than just shift the stage at diagnosis is the key question.",
    wikipedia: W("Cancer_screening#Early_detection"),
    related: ["screening", "stage-shift", "cancer-stage", "ctdna", "prognosis", "hereditary-cancer-syndromes"], sections: ["early-detection"], technologies: ["mced", "liquid-biopsy", "radiology-ai-screening", "whole-body-mri"],
  }),

  // =====================================================================================
  // Research models
  // =====================================================================================
  t({
    id: "in-vitro-in-vivo", name: "In vitro and in vivo", category: BIO,
    aka: ["in vitro", "in vivo", "in-vitro", "in-vivo", "ex vivo", "ex-vivo", "in silico", "in the dish", "in a dish", "test tube", "in the laboratory", "laboratory studies", "lab studies", "in animals", "animal studies", "animal models", "animal study"],
    tldr: "Experimental settings describe where and how a test occurs: laboratory culture, removed living material, a living organism or a computational model.",
    summary: "In vitro and ex vivo describe work outside the original organism, with terminology varying by preparation and expansion. In vivo refers to work within a living organism, including animals and people; in silico refers to computation. Each setting includes different components and omits others. The label does not establish a universal ranking, human safety or treatment benefit.",
    wikipedia: W("In_vitro"),
    related: ["preclinical", "cell-line", "organoid", "model-organism", "clinical-trial"], technologies: ["organoids", "pdx-models", "functional-drug-testing"],

"asOf": "2026-11-11",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/In_vitro"
  },
  {
    "label": "Source for experimental setting and intended-use interpretation",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/ex-vivo"
  },
  {
    "label": "Source for experimental setting and intended-use interpretation",
    "url": "https://www.fda.gov/files/newsroom/published/roadmap_to_reducing_animal_testing_in_preclinical_safety_studies.pdf"
  },
  {
    "label": "What exactly is 'N' in cell culture and animal experiments?",
    "url": "https://doi.org/10.1371/journal.pbio.2005282"
  },
  {
    "label": "FDA: context-specific nonclinical studies and new approach methodologies",
    "url": "https://www.fda.gov/drugs/science-and-research-drugs/cder-streamlined-nonclinical-studies-and-acceptable-new-approach-methodologies-nams"
  }
],
"notes": [
  "Setting comparison. In vitro describes laboratory work outside the body, including grown cells and many expanded organoid assays. Ex vivo commonly describes removed living material studied outside its original organism, often briefly with retained local structure. Authors use overlapping terminology, so inspect preparation, expansion and timing. In vivo includes experiments in animals or people; identify species and host. In silico computes a prediction from data rather than directly measuring the predicted response. These terms describe where and how the experiment occurs, not a quality ranking.",
  "Read each omitted compartment. A tumour-only dish lacks required immune interactions unless those populations are added and shown functional. A fresh slice may retain resident neighbours while losing blood flow and recruitment from circulation. A conventional PDX adds mouse circulation, exposure and metabolism without reproducing an intact human immune system. A computational prediction depends on its data, assumptions and benchmark. Human-derived tissue can be used in both dish and animal models; do not claim that ex vivo is the only setting using human tissue. A living specimen can lose cells, adapt or undergo selection after removal; retaining a structure is not retaining complete physiology. In-vitro preparations can isolate direct effects, compare doses and drugs and support repeats, while omitting perfused blood supply, host metabolism and the original population mix unless specifically reconstructed. Latin labels such as in glass, out of the living and in the living are mnemonics for setting, not quality grades.",
  "Primary timing examples. Ladan's breast-slice assay used three-day exposures, a stated planned result window of seven to fourteen days, not a measured turnaround distribution and 23/30 usable tests from tumour-containing biopsies. Izumchenko reported 578/1,163 established PDXs and mean 16 weeks from engraftment to exposure, not biopsy to final decision. Ahlmann-Eltze compared gene-perturbation transcriptome predictions with simple baselines; the deep-learning methods did not outperform the simple linear baselines in the tested expression-prediction tasks. This was not a measured patient drug response. None of these examples shows benefit from choosing a treatment using the model. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC10542784/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5834154/ ; https://pubmed.ncbi.nlm.nih.gov/40759747/",
  "Terminology scope. NCI's ex vivo dictionary entry describes removal, treatment and return of cells or tissue to the body. That return step distinguishes cell-engineering procedures from laboratory drug testing where the tested sample is not returned. Dosing an animal and later treating removed graft cells in a dish are different experiments. Source: https://www.cancer.gov/publications/dictionaries/cancer-terms/def/ex-vivo",
  "Regulatory scope. FDA's roadmap to reduce animal testing concerns preclinical safety development, initially focusing on monoclonal antibodies and considering human-based laboratory and computational methods. It is not approval of every organ chip or a recommendation for personal treatment selection. Source: https://www.fda.gov/files/newsroom/published/roadmap_to_reducing_animal_testing_in_preclinical_safety_studies.pdf Decision time limits which preparation is usable: establishing a new conventional PDX generally will not fit a decision due in three weeks, while a characterised short-term assay might fit but can still fail. A treatment needing liver activation also needs the relevant metabolic setting represented; a fresh slice alone omits it. Computation can rank hypotheses without growing a model, but a universal fastest or cheapest claim is not established by the setting label.",
  "Fictional reading exercise. Compare a graft dosed in a mouse, a fresh human slice exposed outside the body and a computed sensitivity prediction. Identify actual measurement versus prediction, host, retained cells, omitted physiology and clock before drawing an inference. These settings can start from the same tumour; days, weeks or months are illustrative scales rather than guaranteed timelines. No setting is a later validation rung of another.",
  "An experimental setting and the origin of the material are separate descriptions. Human-derived cells can be studied in vitro, briefly ex vivo or as a graft in vivo. Living-organism work includes animals and people; it does not automatically mean a human clinical trial. Preclinical intervention experiments can continue alongside human studies, so the date relative to a first human dose alone does not validate their treatment claim."
]
}),
  t({
    id: "preclinical", name: "Preclinical", category: BIO,
    aka: ["pre-clinical", "preclinical studies", "preclinical study", "preclinical data", "preclinical evidence", "preclinical models", "preclinical model", "preclinical development", "preclinical stage", "discovery stage", "early research", "bench to bedside", "translational", "translational research", "IND-enabling", "proof of concept", "proof-of-concept", "mechanistic studies"],
    tldr: "Evidence from laboratory, animal and computational work used to study mechanisms, activity and safety. It can guide human studies without establishing patient benefit.",
    summary: "Preclinical and nonclinical work studies mechanisms, activity, exposure and safety using specified models. Such experiments can occur before or alongside human studies. Evidence that a model responds does not establish a useful treatment for patients. FDA nonclinical requirements depend on the product and context; its published approaches include justified reductions or replacements of animal studies, so a universal two-species requirement is inaccurate.",
    wikipedia: W("Pre-clinical_development"),
    related: [
  "in-vitro-in-vivo",
  "cell-line",
  "model-organism",
  "organoid",
  "trial-phases",
  "clinical-trial",
  "controlled-perturbation"
], technologies: ["pdx-models", "organoids", "crispr-screens"],

"notes": [
  "In-vitro, in-vivo and human-derived describe experimental setting or origin, not validation of treatment in patients. A cell line can test a direct cell effect, while an immune-intact mouse can test selected tissue and immune interactions; neither reproduces every human cancer, prior treatment or physiology. An immune mechanism needs its relevant components represented and functional. Human tissue grown in a dish or grafted into a mouse remains model evidence about that intervention.",
  "Name the intervention, control, outcome and units before counting replication. The biological unit is the entity about which conclusions are sought, such as a donor. The experimental unit receives an independently assigned intervention; the observational unit is measured. A cage assigned together or a preparation treated before being split can make the animals or wells subsamples. More measured cells do not become more assigned mice. Biological and technical replicate labels vary, so inspect sampling, preparation, allocation and measurement. Repeating runs tests consistency without adding donor identities. Analysing correlated subsamples as independent replicates is pseudoreplication.",
  "Fictional design: each of two donors supplies six wells, three control and three treated. The twelve distinct wells receive independent randomized assignments within donor, separate treatment and no mutual influence, while the analysis retains donor nesting. There are twelve assigned wells and two donor sources, not twelve donors. No cell counts or recommended sample size are supplied. If instead a donor preparation is treated before being split, its wells are subsamples of that assignment. Adding cells does not add wells or donors. This distinction follows from the stipulated allocation, not from a universal rule that wells always are independent.",
  "A controlled fictional mouse study in which local treatment changes a distant tumour can support a distant effect in that model. If a controlled immune-cell depletion reduces that effect, it supports a contribution under those tested conditions. Further steps include safely achievable human exposure, relevant target biology, safety and comparative patient outcomes. Mouse tumour volume is not patient survival, and a laboratory effect size or universal model threshold does not establish clinical benefit. A reproducible mechanism can coexist with an impractical or harmful clinical exposure. These are limits on the inference, not a guarantee that any particular model result will translate.",
  "Retain the model or specimen, treatment and comparator, assigned units and subsamples, exclusions, allocation, blinded assessment, timing, dose, readout units and uncertainty. A cell count, cubic-millimetre tumour volume and named assay signal are different measurements. ARRIVE supports appraisal of animal-study reporting rather than proving a conclusion. Exploratory academic experiments and regulatory safety studies have different purposes and requirements. FDA's context-specific nonclinical approaches, including new approach methodologies, do not validate every model for personal treatment selection."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Pre-clinical_development"
  },
  {
    "label": "Studying cancer immunotherapy using patient-derived xenografts (PDXs) in humanized mice",
    "url": "https://doi.org/10.1038/s12276-018-0115-0"
  },
  {
    "label": "What exactly is 'N' in cell culture and animal experiments?",
    "url": "https://doi.org/10.1371/journal.pbio.2005282"
  },
  {
    "label": "The ARRIVE guidelines 2.0: Updated guidelines for reporting animal research.",
    "url": "https://doi.org/10.1371/journal.pbio.3000410"
  },
  {
    "label": "FDA: purpose and safety context of preclinical research",
    "url": "https://www.fda.gov/patients/drug-development-process/step-2-preclinical-research"
  },
  {
    "label": "FDA: context-specific nonclinical studies and new approach methodologies",
    "url": "https://www.fda.gov/drugs/science-and-research-drugs/cder-streamlined-nonclinical-studies-and-acceptable-new-approach-methodologies-nams"
  },
  {
    "label": "Reporting animal research: Explanation and elaboration for the ARRIVE guidelines 2.0.",
    "url": "https://doi.org/10.1371/journal.pbio.3000411"
  }
],
"asOf": "2026-11-11"
}),
  t({
    id: "model-organism", name: "Model organism", category: BIO,
    aka: ["model organisms", "mouse model", "mouse models", "mice", "in mice", "murine", "animal model", "xenograft", "xenografts", "patient-derived xenograft", "patient-derived xenografts", "PDX", "genetically engineered mouse", "GEMM", "GEMMs", "humanised mice", "humanized mice", "zebrafish", "fruit fly", "Drosophila", "yeast", "C. elegans"],
    tldr: "A model organism lets researchers study selected biological questions in a living species. Its relevance depends on the question and measured features.",
    summary: "Cancer studies use multiple host designs, including immunodeficient hosts carrying human tumour material, engineered animals and models with selected human components. These retain different immune and stromal environments. Host strain, implantation site, species-reactivity and exposure therefore belong with the result. Animal experiments do not by themselves establish human safety or benefit.",
    wikipedia: W("Model_organism"),
    related: ["preclinical", "in-vitro-in-vivo", "cell-line", "organoid"], technologies: ["pdx-models"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Model_organism"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC3553601/"},{"label":"PDX host-design limits","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/"}], notes: ["Model card. Record source, host, site, human and animal compartments, relevant feature checks, intervention, exposure, endpoint units and clock, comparator animals, independent donor and animal counts, failures and intended inference. Added human components need compatibility and persistence evidence; no single label guarantees complete human immunity. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC4167608/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC3553601/ Dosing a living host and later exposing removed cells in a dish are separate experiments; specimen history does not determine the setting of the later assay."],
"asOf": "2026-11-10"
}),
  t({
    id: "cell-line", name: "Cell line", category: BIO,
    aka: ["cell lines", "cell-line", "cell-lines", "cultured cells", "cell culture", "cell cultures", "immortalised", "immortalized", "HeLa", "cancer cell lines", "cancer cell line"],
    tldr: "A cell line is a population maintained through successive transfers in laboratory culture. Its identity, history and growth conditions shape what it can model.",
    summary: "A cell line arises through subculture of an initial primary culture. Finite lines have limited proliferative capacity; continuous lines can proliferate for prolonged periods under suitable conditions. Continuous growth does not itself establish malignancy. Lines may attach to surfaces or grow in suspension. Their source, passage history, medium and density shape the selected population. Cancer-line strains can diverge genetically and in drug response, so a familiar name does not guarantee identical biology across laboratories.",
    wikipedia: W("Immortalised_cell_line"),
    related: ["in-vitro-in-vivo", "organoid", "preclinical", "model-organism", "monoclonal"], technologies: ["crispr-screens", "organoids", "functional-drug-testing"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Immortalised_cell_line"},{"label":"Functional model interpretation: primary evidence","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/"},{"label":"ATCC culture definitions","url":"https://www.atcc.org/resources/culture-guides/animal-cell-culture-guide"},{"label":"ATCC identity and quality checks","url":"https://www.atcc.org/-/media/resources/technical-documents/cell-line-authentication-test-recommendations.pdf?rev=7664fa886e5948018dfe198d484bb4eb"}], notes: ["Model card. Input: documented banked cells or viable material used to establish a culture. Record source and version, medium, density, passage and relevant phenotype. Output belongs to the chosen assay, such as counts, doubling time in hours or a death fraction with its denominator. Passage counts transfers, not a fixed number of divisions. Identity matching by human short tandem repeat profiling, mycoplasma testing and phenotype/growth checks address different questions. Establishment can fail or select subsets; no line-name cutoff predicts clinical sensitivity. Sources: https://www.atcc.org/resources/culture-guides/animal-cell-culture-guide ; https://www.atcc.org/-/media/resources/technical-documents/cell-line-authentication-test-recommendations.pdf?rev=7664fa886e5948018dfe198d484bb4eb Establishing a new line uses finite viable tissue and can select populations. A cell line need not be a monolayer. ATCC uses authentication broadly for verification of identity and freedom from contamination: short tandem repeat profiling compares repeated DNA stretches to test human-line identity, while mycoplasma and other contamination tests and relevant phenotype checks answer additional questions. Passing the identity test does not answer all of them.","Fictional reading exercise. Two laboratories use the same named line with different medium and passage histories and obtain different drug responses. Check identity, contamination and matched conditions before attributing the difference to one cause. Replicate wells assess a preparation, not independent donors. Growth inhibition relative to a dividing control is not automatically killing. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC6522222/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4887336/","A simple characterised line is useful for isolating a mechanism, comparing many perturbations and repeating an experiment. Its missing architecture, host drug handling and normal-tissue responses limit the inference, and a tumour-only line cannot test an immune interaction without the required added populations. A more elaborate culture changes selected ingredients; it does not create a universal hierarchy of reliability."],
"asOf": "2026-11-10"
}),
  t({
    id: "organoid", name: "Organoid", category: BIO,
    aka: ["organoids", "tumour organoid", "tumour organoids", "tumor organoid", "tumor organoids", "patient-derived organoid", "patient-derived organoids", "PDO", "PDOs", "mini-tumour", "mini-tumours", "3D culture", "three-dimensional culture", "tumoroid", "tumoroids"],
    tldr: "An organoid is a three-dimensional culture that self-organises selected tissue features. Its measured contents determine which questions it can answer.",
    summary: "Organoids self-organise selected structural or functional tissue features in three-dimensional culture. Patient-derived tumour organoids are one member of this broader family, rather than complete copies of a patient. Establishment and growth conditions select cells, and identity and relevant properties need checking against the source specimen. Conventional epithelial cultures often omit immune and supporting populations; specialised retention or added co-cultures require method-specific evidence. Their use for mechanism and drug-response experiments does not by itself establish clinical utility.",
    wikipedia: W("Organoid"),
    related: ["cell-line", "in-vitro-in-vivo", "preclinical", "model-organism", "hub-organoids"], technologies: ["organoids", "functional-drug-testing", "pdx-models"], links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Organoid"},{"label":"Functional model interpretation: primary evidence","url":"https://pubmed.ncbi.nlm.nih.gov/30550791/"},{"label":"Organoid establishment and identity","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC10598932/"},{"label":"Dijkstra tumour identity and overgrowth checks","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6558289/"},{"label":"Sachs et al. 2018: breast-cancer organoid biobank","url":"https://doi.org/10.1016/j.cell.2017.11.010"},{"label":"Geyer et al. 2023: oxygen and treatment response in PDAC organoids","url":"https://doi.org/10.1038/s41420-023-01334-z"},{"label":"DeStefanis et al. 2022: baseline size and organoid response assessment","url":"https://doi.org/10.1038/s41598-022-08937-z"}], notes: [
  "Model and assay card. Starting material may be normal tissue, tumour or stem-cell-derived material; retain its source and viable preservation method. Record malignant identity against the specimen, selected or lost populations, matrix/medium, passage and experimental window. Derivation, quality checks, expansion and testing use finite tissue and culture material. A destructive stain or lysate assay consumes its tested aliquot; recovery in another assay is method-specific. No universal specimen amount or organoid-response threshold follows from the name.",
  "Failure and inference checks. Establishment can fail, normal epithelial cells can overgrow malignant cells, and culture conditions can select branches. Verify tumour identity rather than infer it from growth. Output belongs to the chosen assay: attributed cell counts, death-marker fraction or molecular signal, with units, time and normalisation. Check viability, composition, exposure and controls. A three-dimensional spheroid need not show tissue-like self-organisation, and specialised immune retention does not apply to all cultures. Sources: https://pubmed.ncbi.nlm.nih.gov/30550791/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC10598932/ Dijkstra explicitly checked tumour identity to exclude healthy-lung organoid overgrowth: https://pmc.ncbi.nlm.nih.gov/articles/PMC6558289/",
  "Size, matrix, oxygen supply and exposure duration belong in the experiment record because they define conditions for delivery, cell state and the readout. As a bounded example, Geyer's pancreatic organoid study found treatment-response differences between normoxia and hypoxia in specified monocultures and co-cultures. Treat size as a geometry and exposure-control question rather than assume equal supply across differently sized structures. Source: https://doi.org/10.1038/s41420-023-01334-z",
  "DeStefanis and colleagues tracked nearly 3,500 individual mouse-derived colon-cancer organoids. In that model, organoids at or above a change point of about 308 micrometres at baseline grew more slowly, and individual-organoid tracking was reported to be more sensitive to treatment response than well-level assessment, which averages the whole population in a well. In their 1,740 patient-derived organoids (22 lines, 19 patients) they found no relation between baseline size and growth (R squared 0.023) and no change point in any line. These are findings of one study and model, not a universal size threshold. Source: https://doi.org/10.1038/s41598-022-08937-z",
  "Fictional reading exercise. An epithelial organoid loses T cells and has lower metabolic signal after treatment. The signal does not establish immune-mediated killing. Adding immune cells creates a new experiment needing identity, persistence and specificity controls. The model can support a direct tumour-cell question while leaving host exposure, organ toxicity and patient benefit untested.",
  "The word organoid establishes no regulatory status or clinical authorisation. Sachs's breast-cancer biobank generated characterised lines and reported retention of many source features during extended passaging; that supports a particular culture resource, not every preparation or personal treatment prediction. Source: https://doi.org/10.1016/j.cell.2017.11.010"
],
"asOf": "2026-11-10"
}),
];
