import type { TermInput } from "@/lib/schema";

/** Candidate selection keeps evidence stages and shared failure dependencies explicit. */
export const educationVaccinePresentation202611: TermInput[] = [
  {
    "id": "neoantigen-candidate-selection",
    "kind": "term",
    "name": "Neoantigen candidate selection",
    "aka": [
      "neoantigen design board",
      "neoantigen target selection"
    ],
    "category": "Immunology",
    "tldr": "Choosing vaccine targets means tracking what supports each candidate and which failures they share. More candidates or a better computer score do not by themselves show broader, safer tumour recognition.",
    "summary": "A neoantigen design board links source alterations, encoded sequence windows, peptide and human leukocyte antigen (HLA) pairs, experimental evidence and unresolved dependencies. It compares a set of candidates for a stated purpose rather than turning one score into proof of a therapeutic target. A source event can generate several peptide windows, so candidate count and independent tumour coverage differ.\n\nThe evidence ladder has separate steps. Tumour-normal sequence comparison can support an alteration, and mutant RNA can support a sampled transcript without proving protein production or processing. A processing or binding prediction is a model result. Recovered HLA-associated peptide supports the sampled preparation without settling cell origin, receptor recognition or safety. A controlled T-cell response supports the tested stimulus; controlled recognition or killing of naturally presenting tumour cells tests a more direct function. Tissue distribution, persistence, safety and clinical benefit still need their own evidence. A suitable clinical comparison estimates benefit for that population, product and setting, without automatic transfer elsewhere.",
    "notes": [
      "Keep the source event, encoded window and processed epitope separate. The conventional T-cell receptor recognises a peptide together with its HLA molecule. One mutation can supply several windows or pairs, and several class-I alleles can share beta-2 microglobulin (B2M) and processing requirements. A fictional row M simply ends an otherwise unchanged protein early, whereas row N shifts the reading frame and creates an altered tail. N supplies a possible altered sequence; M's stop label alone does not. Neither establishes display or recognition. Reconstruct the actual transcript and sequence, and assess transcript-context-dependent decay rather than treating every truncating event alike.",
      "A fictional board has ten rows, A to J, from nine events. A and B share Event 1 and allele X: A has supported alteration and mutant RNA, while B is another predicted window. C comes from Event 2, also through X, with an HLA-associated peptide identified but cell origin and recognition unresolved. J comes from Event 9 through X and has controlled tumour-cell recognition, leaving healthy-tissue specificity and durability open. These four rows share X despite their different evidence. Extra windows do not independently protect that shared display route.",
      "The other fictional rows expose different gaps. D comes from Event 3 through allele Y and has a peptide-stimulated response without natural tumour-recognition evidence. E, Event 4 through Y, has a broad estimated cancer-cell fraction but weak RNA support. F, Event 5 through Z, has RNA and display-prediction agreement but may cover a small subclone. G, Event 6, uses class II and has a peptide-responsive helper population; which cells present it and in what context remain questions. H, Event 7 through Y, has a credible tumour-specific sequence but a similar healthy sequence needing specificity tests. I, Event 8 through Z, has a strong rank with limited model support for that allele. No universal clinical A-to-J order follows.",
      "Re-read that board under two separate fictional reports, assuming X, Y and Z are classical class-I alleles. Loss of X directly challenges A, B, C and J, without establishing failure of Y or Z. A shared B2M-supported class-I display defect instead challenges A to F and H to J. G's class-II route requires separate presenting-cell and helper-response evidence; it is not an established rescue. Each row's original uncertainty remains. Ten windows from one alteration restricted to a lost allele increase the count without restoring that route.",
      "If only one experiment can run, state which uncertainty it addresses and what either result would mean. Testing D against naturally presenting tumour cells, with appropriate controls, is one defensible choice. A positive connects the response to those tested cells under those conditions. A negative prompts checks of processing, display, cell state and assay adequacy. Neither result estimates patient benefit, and another experiment may be preferable for another stated goal.",
      "Keep prediction tasks and units visible. Fictional K has a 0.4% eluted-ligand rank and L a predicted competitive-binding half-maximal inhibitory concentration (IC50) of 40 nanomolar (nM). The numerical values cannot rank K against L: one is a reference-relative score and the other an assay-concentration estimate. IC50 is not automatically an equilibrium binding constant. Compare matched outputs for the exact allele and model/version; a percentile is not a probability of benefit. Differential agretopicity compares mutant and normal predictions and inherits their uncertainty, rather than measuring escape from tolerance or natural recognition.",
      "An estimated cancer-cell fraction is not a photograph of every cell or evidence that a mutation is truncal across all lesions. Purity, local copy number and altered-copy count affect interpretation of the raw variant read fraction. Similarly, a peptide list is a recovered subset with cell, HLA class, time, capture, database and confidence rules attached. Non-detection requires sensitivity context, and artificial peptide loading can bypass a tumour's own processing. State what was actually tested rather than moving a candidate to a later rung by inference.",
      "A set can double-count correlated windows and correlated model assumptions. Model agreement is not independent validation; a weighted ensemble needs appropriate held-out evaluation for its task, alleles and population. Class-I and class-II choices can support different response components without guaranteeing recognition or overcoming a shared defect. Immunodominance can concentrate a measured response on a few offered targets. Epitope spreading means additional detected recognition beyond the encoded targets; it is not a substitute for a clinical comparison.",
      "Maintain selection and exclusion reasons, the two sequences in a mutant-normal comparison, exact HLA protein names, specimen and assay context, model versions, manual overrides and the authorised construct version. Record the strongest observed support and the unresolved question beside each candidate. These are evidence-reading and traceability rules, not a validated scoring formula, a compulsory assay sequence or a personal treatment recommendation.",
      "In a fictional evidence notebook, peptide A is identified in a mixed-tissue HLA preparation, an A-HLA multimer labels blood cells, post-dose cells produce more spots after A stimulation, and a receptor sequence becomes relatively more frequent. Record identification confidence and cell origin for the first result, allele and staining denominator for the second, and background, viability and culture-expansion history for the third. The sequence result neither identifies which cells made the spots nor proves an absolute increase in that receptor-bearing population. Natural recognition of tumour cells has not been tested and remains a visible gap. A controlled positive tumour-cell assay would strengthen that target under the tested conditions while leaving healthy-tissue safety and patient benefit separate.",
      "Three physical workflows illustrate that separation. Immunopeptidomics can capture HLA-peptide complexes on an antibody-coated support, release connected peptide molecules and identify their sequences by mass spectrometry. A tetramer puts four specified peptide-HLA units on a shared laboratory scaffold to bind sampled T cells; this is not a native four-HLA receptor. In ELISpot, cells incubate over an antibody-coated capture membrane, then cells are removed and the membrane is washed before developed spots are read. Recovered peptides, reagent binding and secretion-associated spots do not by themselves measure tumour killing. Molecular shapes and illustrative spot counts are schematic rather than quantitative biological observations."
    ],
    "links": [
      {
        "label": "Wells et al.: task-specific neoantigen prediction and patient-matched immune assays (2020)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33038342/"
      },
      {
        "label": "Sarkizova et al.: mono-allelic presentation data and allele-specific prediction (2020)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31844290/"
      },
      {
        "label": "NetMHCpan-4.1: output tasks and percentile-rank definitions",
        "url": "https://services.healthtech.dtu.dk/services/NetMHCpan-4.1/"
      },
      {
        "label": "Ghorani et al.: retrospective differential-agretopicity evidence (2018)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29361136/"
      },
      {
        "label": "Lindeboom et al.: transcript-context rules for nonsense-mediated decay (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27618451/"
      },
      {
        "label": "Litchfield et al.: frameshift decay escape and bounded immune findings (2020)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32733040/"
      },
      {
        "label": "Cer et al.: assumptions for IC50 and binding-constant conversion (2009)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19395593/"
      },
      {
        "label": "Purcell et al.: HLA-complex capture, peptide release and mass spectrometry (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31092913/"
      },
      {
        "label": "Altman et al.: specified peptide-MHC tetramers identify binding cells (1996)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8810254/"
      },
      {
        "label": "Wykes and Renia: peptide-specific secretion and ELISpot protocol (2017)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34541071/"
      }
    ],
    "related": [
      "neoantigen",
      "neoantigen-mrna-vaccine",
      "hla",
      "hla-typing-and-nomenclature",
      "hla-loh",
      "antigen-processing-machinery",
      "agretopicity",
      "nonsense-mediated-decay",
      "vaf",
      "genetic-code"
    ],
    "asOf": "2026-11-11"
  }
];
