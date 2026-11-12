/** Public T-cell teaching synthesis. New terms are distinct from existing repertoire owners. */
import type { TermInput, TargetInput } from "@/lib/schema";

export const educationParallelTcells: TermInput[] = [
  {
    "kind": "term",
    "id": "anergy",
    "name": "T-cell anergy",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "A living T cell can remain less responsive after an antigen encounter. A weak test result alone does not establish anergy.",
    "summary": "Anergy is antigen-related reduced responsiveness that persists into a later controlled response test. In Jenkins and Schwartz's mouse and T-cell-clone experiments, chemically altered presenting cells induced reduced responsiveness to subsequent antigen stimulation with normal presenting cells. Macian and colleagues identified an NFAT-associated anergy gene programme in mechanistic experiments. These findings are model evidence, not a universal tumour-cell classifier.\n\nExhaustion is a distinct differentiation programme associated with persistent stimulation. Anergy, exhaustion, external suppression, absent antigen-specific cells and assay failure are different possible explanations for a low response. Low interleukin-2 alone leaves the mechanism unresolved. Check specificity, viable-cell recovery, stimulus controls, responsive comparators and response history; measure division and cytokine responses under matched conditions. Laboratory rescue does not establish tumour recognition, safe killing or clinical benefit.",
    "links": [
      {
        "label": "Antigen presentation by chemically modified splenocytes induces antigen-specific T cell unresponsiveness in vitro and in vivo.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/3029267/"
      },
      {
        "label": "Transcriptional mechanisms underlying lymphocyte tolerance.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12086671/"
      },
      {
        "label": "Molecular signature of CD8+ T cell exhaustion during chronic viral infection.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17950003/"
      },
      {
        "label": "Review (PubMed 12471050)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12471050/"
      },
      {
        "label": "Immunologic self-tolerance maintained by activated T cells expressing IL-2 receptor alpha-chains (CD25). Breakdown of a single mechanism of self-tolerance causes various autoimmune diseases.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/7636184/"
      },
      {
        "label": "Subsets of exhausted CD8+ T cells differentially mediate tumor control and respond to checkpoint blockade.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30778252/"
      }
    ],
    "notes": [
      "Anergy is persistent reduced antigen-driven responsiveness after a defined antigen encounter, assessed with a suitable later challenge. It is not simply resting, a naive identity, missing support at one encounter or failure to divide now. Altered-presenting-cell induction followed by normal-presenting-cell retesting in mouse clones supports this distinction.",
      "In defined mechanistic experiments, unbalanced calcium signalling and NFAT without cooperative AP-1 promoted an anergy-associated gene programme. Reduced IL-2, a response-supporting cytokine, can accompany anergy. Signal strength, inhibitory context and experimental definition matter; inadequate costimulation is an example rather than a universal diagnosis.",
      "Low IL-2 or a negative ELISpot response alone does not establish anergy. Confirm antigen-specific cells, viable-cell recovery, matched stimulus and responsive comparators, response history and relevant pathway perturbations. Report dividing-cell fractions or cytokine concentration with assay units and conditions. Missing recognition, damaged preparations, suppression or exhaustion remain alternatives.",
      "Anergy can contribute to tolerance of mature immune cells. Protective restraint and tumour immune escape can overlap; changing a laboratory response does not establish restored specificity, tumour access, safe killing or clinical benefit.",
      "Anergy and exhaustion are distinct programmes, not compulsory successive stages or interchangeable labels for dysfunction. Dysfunction is a broader description that may also include senescence, external suppression and missing recognition. Classic clonal anergy often limits growth and IL-2 while retaining effector functions and can respond to added IL-2; adaptive tolerance has broader deficits and can reverse after antigen removal. These distinctions come from model and review evidence, not clinical cutoffs.",
      "Fictional independent populations A and B share verified specificity and suitable later stimulation. A has altered initial support followed by a controlled persistent defect; B has persistent stimulation with several functional deficits and compatible programme evidence. These support anergy-compatible and exhaustion-compatible explanations respectively. C with only low IL-2 remains unassigned. Viability, specificity and positive controls are necessary; no one control establishes state and no A-to-B transition or checkpoint-rescue prediction follows.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ]
  },
  {
    "kind": "term",
    "id": "costimulation",
    "name": "Costimulation",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "Additional receptor contacts help shape a T cell's response to a recognised target.",
    "summary": "Costimulation supplies supporting interactions alongside antigen recognition. CD28 engagement by B7 supported proliferation and interleukin-2 responses in Linsley and colleagues' controlled experiments. CTLA-4 shares CD80/CD86 ligands with CD28 and can remove these ligands from opposing cells by trans-endocytosis, reducing available costimulation. Supporting contacts do not determine a new antigen specificity.\n\nCompare the same recognition stimulus with and without supporting contacts, with viable-cell, stimulus and pathway controls. Measure division, cytokines and killing separately. Identical peptide-HLA displays can have different supporting contexts. CD28 dependence of PD-1 rescue was demonstrated in chronic-infection and tumour-bearing mouse systems; proliferating blood CD8 cells after treatment in lung-cancer patients were predominantly CD28-positive. This does not validate CD28 abundance as a universal treatment-selection test. Engineered supporting domains require product-specific safety and efficacy evidence.",
    "links": [
      {
        "label": "Binding of the B cell activation antigen B7 to CD28 costimulates T cell proliferation and interleukin 2 mRNA accumulation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1847722/"
      },
      {
        "label": "Trans-endocytosis of CD80 and CD86: a molecular basis for the cell-extrinsic function of CTLA-4.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21474713/"
      },
      {
        "label": "Rescue of exhausted CD8 T cells by PD-1-targeted therapies is CD28-dependent.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28280249/"
      }
    ],
    "notes": [
      "Costimulation consists of additional supporting receptor interactions alongside antigen recognition, affecting activation, survival, division or differentiation. CD28 is one example, not the whole category or a universal threshold. The same peptide-HLA stimulus can receive different support without changing antigen specificity. Blocking inhibition and adding support are distinct interventions.",
      "Compare the same recognition stimulus with and without a specified supporting interaction, using recognition-only, viable-cell and inhibitory-context controls. Measure division, cytokines and killing separately; marker abundance does not establish causal signalling. Engineered intracellular supporting domains change receptor architecture but require product-specific persistence, safety and efficacy tests.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ],
    "aka": [
      "co-stimulation",
      "T-cell costimulation"
    ]
  },
  {
    "kind": "term",
    "id": "regulatory-t-cells",
    "name": "Regulatory T cells",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "Some T cells restrain immune responses and help protect healthy tissues. Their presence alone does not measure suppression.",
    "summary": "Regulatory T cells help maintain self-tolerance and can restrain antitumour responses. Mouse experiments established a regulatory role for CD4/CD25 populations and linked Foxp3 to the regulatory programme. CTLA-4 can remove CD80/CD86 from antigen-presenting cells, reducing support available to other T cells. This is one mechanism, rather than a complete account of every regulatory population.\n\nIn defined human cultures, induced FOXP3 expression did not confer suppressive function. Human colorectal cancers also contained functionally distinct FOXP3-positive populations. FOXP3 staining alone therefore does not establish suppression or a universal prognosis; CD25 also needs identity and activation context. Use a defined marker panel, tissue location and controlled suppression assays. Mixed RNA signatures do not locate every contributing cell. Regulatory cells are not exhausted effectors, and removing restraint does not automatically provide safe clinical benefit.",
    "links": [
      {
        "label": "Immunologic self-tolerance maintained by activated T cells expressing IL-2 receptor alpha-chains (CD25). Breakdown of a single mechanism of self-tolerance causes various autoimmune diseases.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/7636184/"
      },
      {
        "label": "Control of regulatory T cell development by the transcription factor Foxp3.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12522256/"
      },
      {
        "label": "Trans-endocytosis of CD80 and CD86: a molecular basis for the cell-extrinsic function of CTLA-4.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21474713/"
      },
      {
        "label": "Induction of FOXP3 expression in naive human CD4+FOXP3 T cells by T-cell receptor stimulation is transforming growth factor-beta dependent but does not confer a regulatory phenotype.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17644734/"
      },
      {
        "label": "Two FOXP3(+)CD4(+) T cell subpopulations distinctly control the prognosis of colorectal cancers.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27111280/"
      }
    ],
    "notes": [
      "Regulatory T cells are living, context-dependent populations, commonly within CD4, that protect tolerance and may restrain useful antitumour responses. They can develop through thymic or peripheral routes. They are not exhausted effectors. Removing restraint can damage healthy tissue; cell abundance is not a universal prognostic or treatment rule.",
      "Regulatory mechanisms include CTLA-4-mediated loss of supporting ligands and context-dependent cytokine and growth-signal interactions, including IL-2. Counting cells does not measure suppression. Flow cytometry combines markers, multiplex tissue imaging adds location and a controlled suppression assay measures a specified responder endpoint. Preserve specimen, marker and comparator definitions; bulk RNA cannot assign every cell a location or function, and none of these methods supplies a universal clinical cutoff.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ],
    "aka": [
      "Treg",
      "Tregs",
      "regulatory T cell"
    ]
  },
  {
    "kind": "term",
    "id": "t-cell-priming-three-signals",
    "name": "T-cell priming and the three-signal model",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "A naive T cell's first activation depends on recognition and supporting signals. Division and killing are separate outcomes.",
    "summary": "The three-signal teaching model groups peptide-HLA recognition by the T-cell receptor as signal one, costimulation as signal two and cytokine context as signal three. The naive cell already has its receptor. The model organises interacting processes; it is not a universal three-step checklist, and experienced or engineered cells can have different requirements.\n\nCurtsinger and colleagues showed that type I interferons or IL-12 could support naive CD8 survival and effector differentiation in defined experiments. Proliferation without a third signal did not establish cytolytic function. Antigen presentation and initial priming are different processes. In a fictional matched comparison, two cultures each divide three times but only one kills appropriate targets above target-only background: equal division does not show equal function. Compare viable-cell input, peptide loading, HLA compatibility, cell ratios, exposure and positive and negative controls. Priming does not itself demonstrate natural tumour display, tumour access, safe killing or patient benefit.",
    "links": [
      {
        "label": "Type I IFNs provide a third signal to CD8 T cells to stimulate clonal expansion and differentiation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15814665/"
      },
      {
        "label": "Binding of the B cell activation antigen B7 to CD28 costimulates T cell proliferation and interleukin 2 mRNA accumulation.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1847722/"
      },
      {
        "label": "Help for cytotoxic-T-cell responses is mediated by CD40 signalling.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9624004/"
      }
    ],
    "notes": [
      "Priming is a naive cell's initial activation in a supporting context. Signal one is TCR recognition of peptide-HLA, signal two includes CD80/CD86-CD28 costimulation and inhibitory context, and signal three includes differentiation-supporting cytokines. The receptor pre-exists the encounter. These signals interact over time; the model is not a three-button checklist and antigen-experienced or engineered cells can have different requirements.",
      "IL-12 and type I interferons (alpha/beta) supported naive CD8 survival and cytolytic differentiation in defined experiments. Cytokines are signalling proteins, not nutritional fuel. Type I interferon can connect innate responses to priming, but this does not prescribe a universal cytokine intervention or establish every cGAS-STING step. Dendritic-cell priming support and tumour antigen display answer different questions.",
      "Division, viable-cell expansion, cytokine production and target-cell death are distinct priming outcomes. In a fictional matched experiment both cultures show three divisions, yet only B kills appropriate targets above target-only background. Measure these outcomes separately with defined starting cells, presenting system, signal perturbation, matched time, peptide loading, HLA, cell ratios and culture conditions. Priming does not establish tumour access, natural display, safe killing or clinical benefit, and stronger stimulation can support unwanted populations.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ],
    "aka": [
      "T-cell priming",
      "three-signal model"
    ]
  },
  {
    "kind": "term",
    "id": "t-cell-receptor",
    "name": "T-cell receptor",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "A conventional T-cell receptor recognises a peptide together with its HLA display. Recognition alone does not show killing.",
    "summary": "A conventional alpha-beta T-cell receptor uses paired chains to recognise a peptide-HLA surface. Its recognition chains assemble with CD3 signalling partners, as demonstrated in the human TCR-CD3 structural study. CDR3 is an informative variable region, but neither a beta-chain sequence nor CDR3 alone specifies the complete paired receptor or its function.\n\nParticular receptors can cross-react across peptide and HLA contexts; that does not establish a universal cross-reactivity rate. Paired receptor identity, binding, activation, target-cell death and clinical benefit require different evidence. A response by one reconstructed pair to peptide-loaded cells does not establish that another alpha-chain pairing recognises the same target, or that either kills naturally presenting tumour cells. Use irrelevant-target, HLA and target-only viability controls. Peptide loading can bypass natural processing, and contact diagrams are not healthy-tissue safety tests.",
    "links": [
      {
        "label": "Structural basis of assembly of the human T cell receptor-CD3 complex.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31461748/"
      },
      {
        "label": "Extraordinary cross-reactivity of an autoimmune T-cell receptor recognizing specific peptides both on autologous and on allogeneic HLA class II molecules.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17559580/"
      },
      {
        "label": "Linking T-cell receptor sequence to functional phenotype at the single-cell level.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24952902/"
      },
      {
        "label": "High-resolution analysis of the human T-cell receptor repertoire.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26324409/"
      },
      {
        "label": "An immunogenic personal neoantigen vaccine for patients with melanoma.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28678778/"
      }
    ],
    "notes": [
      "A conventional alpha-beta TCR uses paired variable and constant domains to contact peptide plus HLA. The peptide sits in the HLA groove, not a separate TCR peptide pocket. CD3 signalling partners are distinct from recognition chains. Contact loops including junction-spanning CDR3 contribute, but other loops, the partner chain and HLA matter; beta-only or CDR3-only sequence is incomplete.",
      "Cross-reactivity is recognition of multiple targets by a receptor. Defined receptor experiments demonstrated peptide/HLA cross-reactivity, not recognition of every allele by an arbitrary receptor or a universal rate. Greater affinity or a contact drawing does not establish healthy-tissue safety.",
      "Sequencing reports sampled receptor identities and abundances under an operational clonotype definition. Paired alpha-beta identities are more complete than beta alone. Peptide-HLA multimer binding, stimulus-induced cellular response, target-cell death and clinical benefit are different endpoints. Include irrelevant-target, HLA and target-only viability controls; peptide-loaded cells can bypass natural processing.",
      "Vaccination generally recruits or expands existing mature receptor specificities rather than rewriting each mature receptor. Engineered TCR therapy introduces selected receptor sequences. In either case, tested recognition must still connect to naturally presenting tumour targets, useful function and healthy-tissue safety. If one beta sequence pairs with different alpha chains, a positive reconstruction of one pair does not establish the other pair's function or tumour killing.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ],
    "aka": [
      "TCR",
      "alpha-beta T-cell receptor"
    ]
  },
  {
    "kind": "term",
    "id": "t-cell-states",
    "name": "T-cell states",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "Response history and measured function help describe a T cell's state. One marker cannot provide a complete label.",
    "summary": "Naive, effector, memory and exhausted populations describe response histories and differentiation programmes, not one mandatory sequence for every T cell. Anergy and exhaustion are distinct mechanisms. Regulatory function is a separate role. Identity, location, receptor specificity, state and measured function are complementary observations.\n\nIn chronic viral infection in mice, TCF1-associated progenitor populations sustained responses and supplied the proliferative burst after PD-1 blockade. In tumour models, progenitor exhausted cells differed from terminally exhausted cells; the related melanoma observations were associations rather than a universal treatment-selection rule. Progenitor-like exhaustion is not ordinary memory. A shared receptor does not require a shared functional phenotype, and PD-1 or TCF1 alone does not establish state or tumour specificity.\n\nPaired human skin-cancer biopsies after PD-1 blockade showed expanded clonotypes not previously observed in the same tumour, supporting clonal replacement as another response model. Absence from an earlier sample does not establish absence throughout the body. A fictional PD-1-positive population near cancer can include viral-reactive and tumour-peptide-reactive cells. Neither proximity nor peptide response proves natural tumour recognition or killing. Preserve response history, sampling site, time, multiple markers and controlled function; neither division nor a favourable pattern predicts individual benefit.",
    "links": [
      {
        "label": "Molecular signature of CD8+ T cell exhaustion during chronic viral infection.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17950003/"
      },
      {
        "label": "Defining CD8+ T cells that provide the proliferative burst after PD-1 therapy.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27501248/"
      },
      {
        "label": "T Cell Factor 1-Expressing Memory-like CD8(+) T Cells Sustain the Immune Response to Chronic Viral Infections.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27533016/"
      },
      {
        "label": "Subsets of exhausted CD8+ T cells differentially mediate tumor control and respond to checkpoint blockade.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30778252/"
      },
      {
        "label": "Clonal replacement of tumor-specific T cells following PD-1 blockade.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31359002/"
      },
      {
        "label": "Linking T-cell receptor sequence to functional phenotype at the single-cell level.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24952902/"
      },
      {
        "label": "Maintenance of peripheral naive T cells is sustained by thymus output in mice but not humans.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22365666/"
      },
      {
        "label": "Burger et al., model-antigen dominance and TCF1 subsets",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34534464/"
      }
    ],
    "notes": [
      "Naive describes absence of initial antigen-driven activation, not recent thymic birth. Effector denotes developed response functions, including help or killing; memory can support renewed responses but promises neither permanent protection nor cancer specificity. State categories are not one mandatory developmental trajectory. Anergy, exhaustion, external suppression and regulatory role remain distinct.",
      "The same paired receptor can occur with different functional phenotypes and response histories. Fictional R1 memory-associated and progenitor-like exhausted observations are separate observations, not a measured transition. Progenitor-like exhaustion is distinct from ordinary memory; shared TCF1 or division does not make their programmes equivalent.",
      "Fictional equal-looking PD-1-positive populations near cancer have different controlled peptide responses: one viral and one tumour-peptide directed. Marker and proximity do not establish specificity; peptide response does not establish natural tumour display, access or killing. Checkpoint blockade does not rewrite receptor specificity. Preserve tissue, sampling time, population definitions and controlled function alongside RNA/protein panels; favourable markers or division alone cannot predict benefit.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules.",
      "In Burger and colleagues' engineered mouse lung tumours, the subdominant response contained heterogeneous TCF1-positive populations, including a CCR6/Tc17-associated subset that did not preferentially benefit from checkpoint blockade. Long-peptide vaccination with the two model antigens and cyclic di-GMP improved the subdominant response; a subdominant-only arm also tested antigen-specific effects. The separate human analyses were associations, not a validated universal TCF1/CCR6 requirement, target-deletion rule or clone-pruning instruction."
    ],
    "related": [
      "t-cell"
    ]
  },
  {
    "kind": "term",
    "id": "thymic-output-and-aging",
    "name": "Thymic output and ageing",
    "category": "Immunology",
    "asOf": "2026-11-09",
    "tldr": "The thymus can produce new T cells in adulthood. A naive-cell count does not directly measure that output.",
    "summary": "Human studies support continued thymic output into adulthood, with age-related decline rather than a fixed birthday shutdown. Existing naive cells can also survive and divide outside the thymus. Human and mouse kinetic studies found different contributions of thymic output and peripheral division; mouse dependence on new output cannot be transferred directly to adult humans.\n\nT-cell receptor excision circles (TRECs) are rearrangement by-products that do not replicate with chromosomes. Peripheral division can dilute measured TREC content. In a fictional closed ledger, 2 cells carrying 4 total circles divide into 4 cells retaining 4 circles: average copies per cell fall from 2 to 1. Allocation can be uneven. This isolates division and does not count new arrivals or daily thymic export. Copies per cell and copies per blood volume have different denominators. Interpret output with survival, division, movement, compartment and timing; naive phenotype, thymic imaging or TREC content alone cannot provide a complete immune-age or cancer-benefit forecast.",
    "links": [
      {
        "label": "Changes in thymic function with age and during the treatment of HIV infection.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9872319/"
      },
      {
        "label": "Sparse production but preferential incorporation of recently produced naive T cells in the human peripheral pool.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18420820/"
      },
      {
        "label": "Maintenance of peripheral naive T cells is sustained by thymus output in mice but not humans.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22365666/"
      },
      {
        "label": "Increased cell division but not thymic dysfunction rapidly affects the T-cell receptor excision circle content of the naive T cell population in HIV-1 infection.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10973325/"
      }
    ],
    "notes": [
      "Thymic output is release of newly developed T cells; involution is a gradual, variable decline in active tissue rather than a fixed adult-age shutdown. Human age and HIV-treatment measurements support adult output, but no universal individual output rate. Naive-cell maintenance also reflects survival, peripheral division, movement and loss. Human/mouse kinetic comparisons found materially different dependencies; mouse output cannot dictate a human collection or banking rule.",
      "TRECs are circular receptor-rearrangement by-products that do not replicate with chromosomes. In a fictional closed ledger, 2 cells with 4 circles become 4 cells with the same 4 circles: average copies per cell decline from 2 to 1. Daughter pairs can carry 2/0 and 1/1 circles, each retaining the parent's 2. Division alone can dilute copies per cell without proving stopped output. Copies per cell and per blood volume answer different questions; the ledger does not count new arrivals, immune age or daily export.",
      "Naive phenotype is not a recent-emigrant birth certificate. Flow phenotype/counts, kinetic labelling and modelling, receptor sequencing and thymic imaging supply different information; imaging is not a direct daily output count. Interpret measurements with exposure, compartment, observation time, division, survival and movement. Neither more diversity, adult output nor age alone promises a new cancer-recognising receptor, vaccine benefit or a collection recommendation.",
      "Source scope: teaching synthesis checked against the cited abstracts and specified accessible primary text on 9 November 2026; fictional examples are not clinical observations or treatment-selection rules."
    ],
    "related": [
      "t-cell"
    ]
  }
];

/** Manual canonical override: index.ts gives this dated record precedence over the generated FOXP3 stub. */
export const educationParallelTcellTargets: TargetInput[] = [
  {
    "id": "foxp3",
    "kind": "target",
    "name": "FOXP3",
    "symbol": "FOXP3",
    "aka": [
      "forkhead box P3",
      "Forkhead box protein P3",
      "JM2",
      "DIETER",
      "SCURFIN"
    ],
    "hgnc": "HGNC:6106",
    "ensembl": "ENSG00000049768",
    "uniprot": "Q9BZS1",
    "entrez": "50943",
    "targetClass": "transcription",
    "role": [
      "drug-target",
      "biomarker"
    ],
    "evidenceTier": "clinical-evidence",
    "sources": [
      {
        "label": "HGNC HGNC:6106",
        "url": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:6106",
        "note": "approved symbol, name, aliases, locus and cross-references (hgnc_complete_set.txt)"
      },
      {
        "label": "UniProt Q9BZS1",
        "url": "https://www.uniprot.org/uniprotkb/Q9BZS1/entry",
        "note": "protein name, function text, keywords and locations (REST API)"
      },
      {
        "label": "CIViC gene FOXP3",
        "url": "https://civicdb.org/features/11587",
        "note": "1 evidence items, 0 assertions, 2 variants; diseases: Breast Cancer (GraphQL API, CC0)"
      }
    ],
    "asOf": "2026-11-09",
    "tldr": "FOXP3 (Forkhead box protein P3) is a protein that switches other genes on and off. The public catalogues list it as a drug target and a biomarker, and clinical evidence ties its variants to diagnosis, prognosis or drug response. Tied to Breast cancer.",
    "summary": "Transcriptional regulator which is crucial for the development and inhibitory function of regulatory T-cells (Treg). Plays an essential role in maintaining homeostasis of the immune system by allowing the acquisition of full suppressive function and stability of the Treg lineage, and by directly modulating the expansion and function of conventional T-cells. Can act either as a transcriptional repressor or a transcriptional activator depending on its interactions with other transcription factors, histone acetylases and deacetylases.\n\nCIViC holds 1 clinical evidence item and 0 assertions across 2 variants, naming Epirubicin.",
    "biology": "Transcriptional regulator which is crucial for the development and inhibitory function of regulatory T-cells (Treg). Plays an essential role in maintaining homeostasis of the immune system by allowing the acquisition of full suppressive function and stability of the Treg lineage, and by directly modulating the expansion and function of conventional T-cells. Can act either as a transcriptional repressor or a transcriptional activator depending on its interactions with other transcription factors, histone acetylases and deacetylases. The suppressive activity of Treg involves the coordinate activation of many genes, including CTLA4 and TNFRSF18 by FOXP3 along with repression of genes encoding cytokines such as interleukin-2 (IL2) and interferon-gamma (IFNG). Inhibits cytokine production and T-cell effector function by repressing the activity of two key transcription factors, RELA and NFATC2. Mediates transcriptional repression of IL2 via its association with histone acetylase KAT5 and histone deacetylase HDAC7. Location: Nucleus; Cytoplasm (UniProt). Locus Xp11.23 (HGNC).",
    "whereFound": [
      "Breast cancer: CIViC evidence names this disease"
    ],
    "cancers": [
      "breast-cancer"
    ],
    "drugs": [],
    "trials": [],
    "pathways": [],
    "related": [
      "civic",
      "t-cell",
      "regulatory-t-cells"
    ],
    "tags": [
      "cancer-genes-wave"
    ],
    "links": [
      {
        "label": "HGNC HGNC:6106",
        "url": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:6106"
      },
      {
        "label": "UniProt Q9BZS1",
        "url": "https://www.uniprot.org/uniprotkb/Q9BZS1/entry"
      },
      {
        "label": "NCBI Gene 50943",
        "url": "https://www.ncbi.nlm.nih.gov/gene/50943"
      },
      {
        "label": "Ensembl ENSG00000049768",
        "url": "https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000049768"
      },
      {
        "label": "Control of regulatory T cell development by the transcription factor Foxp3.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12522256/"
      },
      {
        "label": "Induction of FOXP3 expression in naive human CD4+FOXP3 T cells by T-cell receptor stimulation is transforming growth factor-beta dependent but does not confer a regulatory phenotype.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17644734/"
      },
      {
        "label": "Two FOXP3(+)CD4(+) T cell subpopulations distinctly control the prognosis of colorectal cancers.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27111280/"
      }
    ],
    "notes": [
      "Written by scripts/fetch-cancer-genes.ts from CIViC, Open Targets, IntOGen, HGNC and UniProt; the function text is UniProt's, condensed and in UK spelling. Roles: CIViC lists 1 therapies; CIViC holds 1 clinical evidence items on its variants. Evidence tier \"clinical-evidence\" is the strongest of those signals.",
      "Prevalence not recorded: none of the sources gives a positivity rate.",
      "FOXP3 is a gene-regulating transcription factor important for regulatory programmes in mouse experiments. In defined human cultures, induced FOXP3 expression did not confer suppression; colorectal cancers also contained functionally distinct FOXP3-positive populations. FOXP3 or CD25 positivity alone cannot assign suppressive function. Do not transfer a colorectal association to every cancer or intervention.",
      "The catalogue identifiers, association labels and evidence counts are retained from the generated 23 September 2026 record. This 9 November update checks the cited FOXP3/regulatory-function interpretation; it does not refresh those catalogue counts."
    ],
    "provenance": {
      "editedBy": "Public education audit (issue #374); catalogue metadata retained from scripts/fetch-cancer-genes.ts",
      "editedOn": "2026-11-09"
    },
    "firstDescribed": 1998,
    "firstDescribedBasis": "sequence",
    "firstDescribedNote": "Earliest sequence paper UniProt cites for the protein: Strom T.M. et al, 1998, \"Transcription map in Xp11.23\".",
    "firstDescribedSource": "https://www.uniprot.org/uniprotkb/Q9BZS1/entry",
    "distribution": "one-type",
    "specificityNote": "Specificity not established: no corpus medicine is aimed at it and the catalogues give it only the roles drug-target, biomarker; HPA finds the RNA tissue enhanced, which says where the protein sits but not whether the tumour differs from normal tissue. HPA FOXP3: RNA tissue enhanced (epididymis 5 nTPM, lymphoid tissue 7 nTPM); blood lineage lineage enriched (T-cells 52 nTPM); no normal tissue stained high. Distribution: 1 cancer family in the corpus carries a prevalence row, label threshold or catalogue link for it (Breast cancer (all types)); Open Targets associates it with 0 specific cancer types at or above 0.5. (No rule of scripts/fetch-target-specificity.ts fired.)",
    "specificitySources": [
      {
        "label": "Human Protein Atlas FOXP3 tissue",
        "url": "https://www.proteinatlas.org/ENSG00000049768-FOXP3/tissue",
        "note": "RNA tissue and blood lineage specificity, normal tissue antibody staining (version 25.1, CC BY-SA 3.0)"
      },
      {
        "label": "Open Targets ENSG00000049768 associations",
        "url": "https://platform.opentargets.org/target/ENSG00000049768/associations",
        "note": "cancer associations at or above 0.5 (CC0)"
      }
    ]
  }
];
