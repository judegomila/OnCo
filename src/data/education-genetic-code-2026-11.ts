import type { TermInput } from "@/lib/schema";

/** Translation rules and reference-bound sequence examples. */
export const educationGeneticCode202611: TermInput[] = [
  {
    "id": "genetic-code",
    "kind": "term",
    "name": "Genetic code and reading frame",
    "aka": [
      "genetic code",
      "codon",
      "codons",
      "reading frame",
      "open reading frame",
      "triplet code",
      "start codon",
      "stop codon"
    ],
    "category": "Genomics & genetics",
    "asOf": "2026-11-11",
    "wikipedia": "https://en.wikipedia.org/wiki/Genetic_code",
    "tldr": "A cell reads messenger RNA in groups of three letters called codons. The code says which amino acid to add or when to stop. Changing the grouping can change the protein.",
    "summary": "The genetic code maps three-letter codons to amino acids or termination signals. A reading frame specifies how a coding sequence is grouped into consecutive, non-overlapping triplets. A codon is one unit of a message, while a protein-coding gene also includes other sequence and regulatory context; some genes instead produce functional RNA.\n\nAn open reading frame is a stretch without an internal stop in the chosen frame. A candidate start-to-stop segment can help identify a possible coding region, but an open frame alone does not show that a protein is expressed or functional. The reference sequence, transcript and translation table matter.",
    "notes": [
      "In the standard code, four RNA letters, A, U, G and C, give 4 × 4 × 4 = 64 possible codons. Of these, 61 specify the 20 common amino acids and UAA, UAG and UGA signal termination. Several codons can specify the same amino acid; methionine has AUG and tryptophan has UGG. A third-position change often preserves the amino acid, but this is not true for every codon.",
      "For ordinary cap-dependent eukaryotic initiation, the translation machinery scans from the front of the message and the sequence around AUG helps determine initiation. It need not use the first AUG. Initiation commonly supplies methionine; subsequent processing can change the protein end. Bacterial initiation and mitochondrial translation have their own context, and NCBI lists alternative initiation codons. An AUG within an already translated frame normally adds methionine rather than starting a second protein.",
      "A fictional letter exercise separates frame from spelling: THE CAT SAW THE DOG groups a string into threes, while starting one letter later gives HEC ATS AWT. Biological codons have synonyms, unlike these ordinary words, so this analogy does not make every single-letter substitution damaging. The exercise identifies grouping, not a protein sequence or an estimate of mutation effects.",
      "Coding-DNA reports use T where the corresponding RNA sequence uses U. Matching them requires the coding strand and a specified processed transcript; an unprocessed genomic stretch can contain introns. In variant notation, c. numbers coding-DNA positions and p. describes a protein consequence relative to a named reference. The symbols fs, Ter and * denote frameshift and termination. HGVS places predicted protein consequences in parentheses when RNA or protein has not been analysed.",
      "For NM_000546.6, TP53 c.524G>A changes coding-DNA codon 175 from CGC to CAC, predicting arginine to histidine. HGVS writes an unmeasured protein consequence as p.(Arg175His); ClinVar's reference display uses p.Arg175His. The named RefSeq coding sequence reproduces the substitution. ClinVar VCV000012374 has an expert-panel pathogenic germline classification, but a classification, a protein prediction and a measured functional result are different evidence. This notation example does not establish a treatment response.",
      "For NM_007294.4, BRCA1 c.68_69del removes the two coding bases AG and is also known as 185delAG. ClinVar VCV000017662 records the consequence as p.Glu23fs. In the exercise, 2 is not divisible by 3, so deleting those bases changes the downstream frame. Deleting three coding bases preserves the downstream grouping, but can remove an amino acid, change the codon at the join or introduce a stop. It does not guarantee a working protein; the actual sequence and transcript need checking.",
      "The fictional standard-code substitution UGG to UGA creates a stop instead of tryptophan. A premature stop can shorten a protein or lead to nonsense-mediated RNA decay; that outcome is not established for every transcript by the variant class alone. GAA and GAG both encode glutamate, illustrating a synonymous substitution. Synonymous does not mean biologically silent: RNA processing can still change. A missense substitution changes an amino acid, while a frameshift changes the later codon grouping and may encounter a premature stop.",
      "MedlinePlus describes many inherited BRCA1 and BRCA2 risk variants as producing a shortened or absent functional product. Frameshift and nonsense examples illustrate ways to disrupt coding information; these examples and their ClinVar entries do not estimate what fraction of all inherited BRCA variants belong to either class. Secondary tumour changes can sometimes restore a BRCA reading frame or repair function. Restoring a frame, demonstrating repair and predicting a clinical drug response remain separate questions.",
      "The standard table is nearly universal, not universal. Human mitochondria encode 13 proteins and use a different translation table. NCBI table 2 assigns UGA to tryptophan and AUA to methionine, with AGA and AGG as termination signals. A nuclear variant should not be interpreted with that mitochondrial table. A table assignment also differs from demonstrating the release mechanism: Krüger 2023 tested release at AGA and AGG in a reconstituted mitochondrial system, and Wakigawa 2026 studied release-factor specificity in cellular translation experiments.",
      "Two historical experiments addressed different questions. Crick and colleagues studied bacteriophage genetics in 1961; combinations of three changes could partly restore function when the individual changes did not. The authors argued for a coding ratio of three or a multiple of three, with three more likely, rather than guaranteeing that every three-base deletion is harmless. Nirenberg's 1968 Nobel lecture recounts his work with Matthaei in which synthetic poly-U directed polyphenylalanine synthesis in cell-free E. coli extracts. That connected U-rich RNA with phenylalanine, while UUU is the corresponding codon in the standard table.",
      "Le and colleagues studied pembrolizumab in 86 people with advanced mismatch-repair-deficient cancers across 12 tumour types in 2017. They reported objective radiographic responses in 46 of 86, or 53%; this is a cohort outcome, not the response chance for any particular frameshift. Detailed mutant-peptide T-cell experiments used one responding person, and the peptides that scored positive came from frameshifts. A genomic frameshift alone does not establish natural peptide presentation, T-cell recognition or clinical benefit."
    ],
    "related": [
      "dna-term",
      "central-dogma-information-flow",
      "gene",
      "rna",
      "protein",
      "mutation",
      "nonsense-mediated-decay",
      "brca-reversion-mutations",
      "neoantigen"
    ],
    "links": [
      {
        "label": "Wikipedia: genetic code",
        "url": "https://en.wikipedia.org/wiki/Genetic_code"
      },
      {
        "label": "NHGRI: codons and the 64-triplet standard code",
        "url": "https://www.genome.gov/genetics-glossary/Codon"
      },
      {
        "label": "NHGRI: open reading frame",
        "url": "https://www.genome.gov/genetics-glossary/Open-Reading-Frame"
      },
      {
        "label": "NCBI: standard and vertebrate mitochondrial genetic codes",
        "url": "https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi"
      },
      {
        "label": "OpenStax Biology 2e: protein synthesis and initiation context",
        "url": "https://openstax.org/books/biology-2e/pages/15-5-ribosomes-and-protein-synthesis"
      },
      {
        "label": "HGVS: frameshift descriptions and predicted consequences",
        "url": "https://hgvs-nomenclature.org/stable/recommendations/protein/frameshift/"
      },
      {
        "label": "HGVS: protein deletions and transcript-dependent consequences",
        "url": "https://hgvs-nomenclature.org/stable/recommendations/protein/deletion/"
      },
      {
        "label": "ClinVar: TP53 c.524G>A, p.Arg175His",
        "url": "https://www.ncbi.nlm.nih.gov/clinvar/variation/12374/"
      },
      {
        "label": "ClinVar: BRCA1 c.68_69del, p.Glu23fs",
        "url": "https://www.ncbi.nlm.nih.gov/clinvar/variation/17662/"
      },
      {
        "label": "RefSeq: TP53 transcript NM_000546.6",
        "url": "https://www.ncbi.nlm.nih.gov/nuccore/NM_000546.6"
      },
      {
        "label": "RefSeq: BRCA1 transcript NM_007294.4",
        "url": "https://www.ncbi.nlm.nih.gov/nuccore/NM_007294.4"
      },
      {
        "label": "MedlinePlus Genetics: BRCA1",
        "url": "https://medlineplus.gov/genetics/gene/brca1/"
      },
      {
        "label": "MedlinePlus Genetics: BRCA2",
        "url": "https://medlineplus.gov/genetics/gene/brca2/"
      },
      {
        "label": "Crick et al.: bacteriophage experiments and coding ratio (1961)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/13882203/"
      },
      {
        "label": "NLM archive: Crick et al. 1961 article scan",
        "url": "https://digirepo.nlm.nih.gov/ext/document/101584582X412/PDF/101584582X412.pdf"
      },
      {
        "label": "Nirenberg: Nobel lecture, The genetic code (1968)",
        "url": "https://www.nobelprize.org/uploads/2018/06/nirenberg-lecture.pdf"
      },
      {
        "label": "Le et al.: mismatch-repair deficiency and PD-1 blockade (2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28596308/"
      },
      {
        "label": "Krüger et al.: mitochondrial termination at AGA and AGG (2023)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36596788/"
      },
      {
        "label": "Wakigawa et al.: mitochondrial termination and frame context (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42481489/"
      },
      {
        "label": "Sakai et al.: BRCA2 secondary mutations and cisplatin resistance (2008)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18264087/"
      },
      {
        "label": "Sakai et al.: functional BRCA2 restoration in ovarian carcinoma models (2009)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19654294/"
      }
    ]
  }
];
