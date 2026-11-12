import type { TermInput } from "@/lib/schema";

// Source scopes and coverage proofs are retained in the education audit.
export const educationParallelInnateImmuneTerms: TermInput[] = [
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "adenosine-and-ido",
    "name": "Adenosine and IDO: two separate routes that can restrain immune responses",
    "tldr": "Adenosine can signal immune cells to reduce activity; the IDO1 enzyme starts a separate route that breaks down tryptophan, an amino acid. Finding their components in a tumour does not prove immune suppression or drug benefit. An IDO1 blocker added to pembrolizumab did not improve melanoma outcomes in a phase 3 trial.",
    "summary": "The adenosine route works outside cells. CD39 (ENTPD1) and CD73 (NT5E) are enzymes that help generate adenosine from extracellular ATP and ADP, and adenosine then acts on cell-surface receptors, including the A2A receptor on T cells. The enzymes can sit on immune cells, cancer cells or other tissue cells, so the source has to be measured and not assumed. The IDO route works inside a producing cell: IDO1 starts the breakdown of tryptophan along the kynurenine pathway. IDO is not an adenosine receptor and does not degrade ATP, so the two routes should not be merged into one 'suppressive axis'.",
    "links": [
      {
        "label": "Adenosine generation catalyzed by CD39 and CD73 expressed on regulatory T cells mediates immune suppression.",
        "url": "https://doi.org/10.1084/jem.20062512"
      },
      {
        "label": "A2A adenosine receptor protects tumors from antitumor T cells.",
        "url": "https://doi.org/10.1073/pnas.0605251103"
      },
      {
        "label": "Expression of indoleamine 2,3-dioxygenase by plasmacytoid dendritic cells in tumor-draining lymph nodes.",
        "url": "https://doi.org/10.1172/jci21583"
      },
      {
        "label": "A new method of sampling blood for measurement of plasma adenosine.",
        "url": "https://doi.org/10.1152/ajpheart.1990.258.4.h1232"
      },
      {
        "label": "Epacadostat plus pembrolizumab versus placebo plus pembrolizumab in patients with unresectable or metastatic melanoma (ECHO-301/KEYNOTE-252): a phase 3, randomised, double-blind study.",
        "url": "https://doi.org/10.1016/s1470-2045(19)30274-8"
      }
    ],
    "targets": [
      "ido1",
      "entpd1",
      "cd73-adenosine",
      "adora2a"
    ],
    "drugs": [
      "epacadostat"
    ],
    "terms": [
      "immune-checkpoint",
      "inflammation"
    ],
    "pathways": [
      "tumor-microenvironment"
    ],
    "notes": [
      "The mechanism evidence is mostly from mice and cell experiments. CD39 and CD73 distinguished regulatory T cells from other T cells, and regulatory T cells from Cd39-null mice had impaired suppression in vitro and failed to block allograft rejection in vivo (Deaglio et al., 2007). Deleting the A2A receptor in the host led to rejection of established immunogenic tumours in about 60 per cent of A2A-deficient mice, with none rejected in normal mice (Ohta et al., 2006). The same mouse study reported autoimmunity during melanoma rejection in the A2A-deficient mice and proposed that the receptor in T cells also helps prevent autoimmune tissue damage, so a pathway that restrains antitumour T cells may also protect normal tissue, and any assessment of an inhibitor has to weigh that trade-off. A subset of plasmacytoid dendritic cells in mouse tumour-draining lymph nodes expressed immunosuppressive levels of IDO and suppressed T-cell responses, and anergy was prevented by disrupting the IDO gene or by an IDO inhibitor (Munn et al., 2004). The same paper reported, as a separate observation in the human samples studied, that IDO-expressing cells in tumour-draining lymph nodes correlated with a worse clinical outcome; that is an association, and the authors noted the human cells' relationship to the mouse subset was still to be determined.",
      "The layers of evidence are different and should be kept apart: a protein or RNA signal shows a component is present, a biochemical assay shows enzyme activity or metabolite, a functional experiment shows an immune effect, and a trial shows whether blocking it helps patients. A blood adenosine result is sensitive to handling: adenosine has a half-life of 1 to 2 seconds in human blood at 37 degrees Celsius, and in a sampling experiment recovery of labelled adenosine was 89 per cent with an inhibitor mix delivered at the catheter tip but 7 per cent when the mix was added only after the catheter (Shryock et al., 1990), and even a well-handled blood level does not locate the producing cells. No single expression cutoff for CD39, CD73 or IDO1 is validated in the sources cited here to choose an inhibitor, so a report should state the sample site, timing and units and not rely on one threshold. The clinical test of the IDO1 route was negative for that regimen: in ECHO-301/KEYNOTE-252, 706 people with unresectable or metastatic melanoma not previously treated with a PD-1 or PD-L1 blocker received pembrolizumab with epacadostat or with placebo, and median progression-free survival was 4.7 against 4.9 months (hazard ratio 1.00, 95 per cent confidence interval 0.83 to 1.21), with overall survival hazard ratio 1.13 (0.86 to 1.49) (Long et al., 2019). The authors wrote that the usefulness of IDO1 inhibition to enhance anti-PD-1 therapy remains uncertain. That bounds one drug, one dose and one disease; it neither proves all IDO research futile nor validates another inhibitor or cancer. By the same logic, a tumour section that stains for both CD73 and IDO1 shows two measured proteins in the sampled cells: it does not show one dominant suppressive mechanism or the best inhibitor, because each route still needs its own activity and functional question."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "dendritic-cells",
    "name": "Dendritic cells",
    "aka": [
      "dendritic cell"
    ],
    "tldr": "Dendritic cells are immune cells that collect pieces of material from their surroundings and show them to T cells, and the signals they give at that moment help decide whether a T cell is switched on or held back. Counting them in a tumour sample does not show that they have taught T cells to recognise the cancer.",
    "summary": "Dendritic cells acquire material from their surroundings or make antigen themselves, process proteins and display fragments on HLA molecules, where a matching T-cell receptor can recognise a peptide and HLA pair. Cross-presentation is the route that places acquired material on class I, and class II presentation, usually of acquired proteins to CD4 T cells, is a separate route. They are a family of subsets with overlapping jobs. Conventional type 1 cells (cDC1) are particularly important for cross-presentation: mice lacking the transcription factor Batf3 lost CD8-alpha-positive dendritic cells, their dendritic cells were defective in cross-presentation, and they rejected highly immunogenic tumours less well (Hildner et al., 2008). Human CD141-positive dendritic cells, activated with poly I:C, cross-presented soluble antigen and antigen from necrotic virus-infected cells better than CD1c-positive cells (Jongbloed et al., 2010). Conventional type 2 cells are usually studied for class II presentation to CD4 T cells, and plasmacytoid cells for type I interferon responses. In a review, plasmacytoid cells are described as producing large amounts of interferon alpha, while the contribution of CD11b-positive conventional cells to CD4 T-cell priming in vivo was still described as to be determined (Merad et al., 2013). The same review describes conventional cells as inducing immunity to foreign antigens and enforcing tolerance to self-antigens, and migration-linked maturation as raising MHC class II and costimulatory molecules, with cytokine production added when migration follows inflammation. In mice, antigen delivered to dendritic cells in the steady state led to brief T-cell activation followed by loss and unresponsiveness of the T cells, and adding an anti-CD40 antibody changed the outcome to prolonged activation (Hawiger et al., 2001). For conventional type 2 cells, a review of dendritic cells in T-cell programming reported that they were most often found to be required for CD4 T-cell priming in mice, with T helper 1 differentiation as an exception in which type 1 cells were often required, and noted that type 2 cells can be difficult to distinguish from monocyte-derived cells because markers overlap (Eisenbarth, 2019); another review said that specific depletion of type 2 cells was still needed to confirm their unique role in priming CD4 T cells (Durai and Murphy, 2016). Single-cell sequencing of human blood found six dendritic-cell and four monocyte subtypes, including a population that resembles plasmacytoid cells but potently activates T cells, so one positive marker is weaker evidence than a supported subset assignment (Villani et al., 2017).",
    "links": [
      {
        "label": "Batf3 deficiency reveals a critical role for CD8alpha+ dendritic cells in cytotoxic T cell immunity.",
        "url": "https://doi.org/10.1126/science.1164206"
      },
      {
        "label": "The conduit system transports soluble antigens from the afferent lymph to resident dendritic cells in the T cell area of the lymph node.",
        "url": "https://doi.org/10.1016/j.immuni.2004.11.013"
      },
      {
        "label": "NK Cells Stimulate Recruitment of cDC1 into the Tumor Microenvironment Promoting Cancer Immune Control.",
        "url": "https://doi.org/10.1016/j.cell.2018.01.004"
      },
      {
        "label": "Human CD141+ (BDCA-3)+ dendritic cells (DCs) represent a unique myeloid DC subset that cross-presents necrotic cell antigens.",
        "url": "https://doi.org/10.1084/jem.20092140"
      },
      {
        "label": "Single-cell RNA-seq reveals new types of human blood dendritic cells, monocytes, and progenitors.",
        "url": "https://doi.org/10.1126/science.aah4573"
      },
      {
        "label": "The dendritic cell lineage: ontogeny and function of dendritic cells and their subsets in the steady state and the inflamed setting.",
        "url": "https://doi.org/10.1146/annurev-immunol-020711-074950"
      },
      {
        "label": "Dendritic cells induce peripheral T cell unresponsiveness under steady state conditions in vivo.",
        "url": "https://doi.org/10.1084/jem.194.6.769"
      },
      {
        "label": "Dendritic cell subsets in T cell programming: location dictates function.",
        "url": "https://doi.org/10.1038/s41577-018-0088-1"
      },
      {
        "label": "Functions of Murine Dendritic Cells.",
        "url": "https://doi.org/10.1016/j.immuni.2016.10.010"
      }
    ],
    "terms": [
      "dendritic-cell-cross-presentation",
      "t-cell",
      "nk-cell"
    ],
    "technologies": [
      "dendritic-cell-vaccines"
    ],
    "pathways": [
      "antigen-presentation-immunoediting"
    ],
    "notes": [
      "Identity and state are different questions. Immature and mature describe response-related states, and maturation can change antigen handling, costimulation, cytokines and movement without turning one subset into another. Presentation can support tolerance as well as activation, so antigen uptake, mature-looking markers and functional priming are separate observations. Where cells meet also matters. Some dendritic cells carry antigen from tissue to a draining lymph node, while resident cells in the node take up soluble antigen that arrives in lymph through conduits before migrating cells arrive (Sixt et al., 2005, mouse). In mouse tumours, cDC1 accumulation often depended on natural killer cells that produced the chemokines CCL5 and XCL1, tumour prostaglandin E2 disrupted that axis, and in human cancers the same transcripts tracked natural killer and cDC1 signatures and were associated with longer overall survival, an association (Böttcher et al., 2018).",
      "Three limits matter for tumours. A vaccine that reaches a dendritic cell may make the encoded protein inside it, and that class I display need not be cross-presentation. A dendritic cell can supply a priming opportunity, but the cancer cell must itself display a recognisable target for an antigen-specific CD8 T cell to attack it, so successful presentation does not repair a cancer cell's loss of an HLA allele. And a low count in one biopsy does not show that no priming happened in another compartment. Subsets are identified by flow cytometry, tissue staining, spatial and RNA methods, but whether a cell presents a defined target and stimulates a suitable responder needs a functional test with controls."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "gamma-delta-t-cells",
    "name": "Gamma-delta T cells",
    "aka": [
      "γδ T cells",
      "gamma delta T cells"
    ],
    "tldr": "Gamma-delta T cells are a family of T cells whose receptor is built from different protein chains than most T cells, and different subsets recognise different signals, often without the usual peptide display. The family name does not say which signal a particular cell, or an engineered product, uses to find a tumour.",
    "summary": "The T-cell receptor of most T cells has alpha and beta chains; gamma-delta T cells have gamma and delta chains and also carry other activating and inhibitory receptors. They remain T cells and are distinct from natural killer cells. A review distinguishes gamma-delta from alpha-beta T cells partly by the antigens their receptors recognise, and notes that NKG2D is expressed by many gamma-delta subsets as well as by natural killer cells and CD8 T cells (Vantourout and Hayday, 2013). Names such as Vδ1 and Vγ9Vδ2 describe receptor variable regions and mark subsets that sit in different places. Healthy human breast tissue harboured a distinct gamma-delta compartment made mainly of Vδ1 cells, whereas Vδ2 cells predominate in blood; the breast Vδ1 cells could be activated innately through the NKG2D receptor, and in paired samples from 11 people with triple-negative breast cancer, progression-free and overall survival correlated with Vδ1 representation but not with total gamma-delta or Vδ2 cells (Wu et al., 2019). That is a small observational association in tissue biology and did not test an infused product.",
    "links": [
      {
        "label": "Butyrophilin 2A1 is essential for phosphoantigen reactivity by γδ T cells.",
        "url": "https://doi.org/10.1126/science.aay5516"
      },
      {
        "label": "Identification of a tumor-specific allo-HLA-restricted γδTCR.",
        "url": "https://doi.org/10.1182/bloodadvances.2019032409"
      },
      {
        "label": "An innate-like Vδ1+ γδ T cell compartment in the human breast is associated with remission in triple-negative breast cancer.",
        "url": "https://doi.org/10.1126/scitranslmed.aax9364"
      },
      {
        "label": "Chimeric Antigen Receptor-Engineered Human Gamma Delta T Cells: Enhanced Cytotoxicity with Retention of Cross Presentation.",
        "url": "https://doi.org/10.1016/j.ymthe.2017.12.001"
      },
      {
        "label": "ClinicalTrials.gov NCT06150885",
        "url": "https://clinicaltrials.gov/study/NCT06150885"
      },
      {
        "label": "Six-of-the-best: unique contributions of γδ T cells to immunology.",
        "url": "https://doi.org/10.1038/nri3384"
      },
      {
        "label": "Sanz et al., 2023: Deep characterization of human gamma-delta T cell subsets",
        "url": "https://doi.org/10.3389/fimmu.2023.1148988"
      }
    ],
    "terms": [
      "t-cell",
      "nk-cell"
    ],
    "technologies": [
      "gamma-delta-t-cell-therapy"
    ],
    "trials": [
      "nct06150885"
    ],
    "notes": [
      "Recognition differs by subset, and it is not always free of HLA. For the Vγ9Vδ2 subset, which responds to phosphoantigens (small phosphorylated metabolites produced by microbes and overexpressed by some cancers), butyrophilin 2A1 (BTN2A1) binds the Vγ9 chain of the receptor, associates with a second butyrophilin, BTN3A1, and the two act together to start the response; a second ligand, possibly BTN3A1, binds a separate region that includes the Vδ2 chain (Rigau et al., 2020). This is not a peptide sitting in an HLA groove. HLA independence is also not universal: one characterised Vγ5Vδ1 receptor was restricted by HLA-A*24:02 and depended on the CD8-alpha co-receptor, acting on blood-cancer and solid-tumour cells in vitro and in vivo while sparing healthy tissue in those models (Kierkels et al., 2019). That receptor's mechanism is not an eligibility rule for the family.",
      "An engineered receptor is a separate recognition route. Adding a GD2-directed chimeric antigen receptor to expanded human Vδ1 and Vδ2 cells increased GD2-specific killing of GD2-expressing cancer cell lines, did not impair movement towards tumour cells in vitro, and expanded Vδ2 cells kept the ability to take up tumour antigen and cross-present it to alpha-beta T cells (Capsomidis et al., 2018). That is a preclinical result for that preparation, and it does not show that any gamma-delta product enters tumours, cross-presents usefully or prevents antigen escape in patients. An allogeneic gamma-delta product that the registry names HLA-G-CAR.BiTE allogeneic γδ T cells (NCT06150885, phase 1 and 2) was listed as recruiting when the registry record was read for this entry; the record describes the product and the study design and reports no efficacy. A receptor added to a cell needs its own target on the tumour, HLA-low does not mean target-positive, and avoiding peptide presentation is not the same as avoiding antigen escape. Cells are identified by flow cytometry and receptor sequencing, but a response against one target line does not establish tumour entry, persistence or benefit, and matched cells without the added receptor are needed to separate native from engineered recognition. Two cautions are OnCo's reasoning and not findings of the cited papers: a product made of many receptor clones is not automatically broader or more effective than one defined clone, and the name gamma-delta describes the receptor chains and not the cell source, so whether cells came from the patient or from a donor has to be stated separately.",
      "Measurement separates identity, repertoire and function. Sanz et al. (2023) used flow cytometry to isolate human gamma-delta subsets and assessed receptor repertoires separately from cytotoxicity. Their Daudi-cell cocultures included target-only and effector-only controls; degranulation, granzyme or perforin measurements and target-cell death were distinct readouts. These are results for defined human subsets and laboratory targets, not a universal assay or a test of tumour entry in patients.",
      "For interpretation, report the parent population, percentage and any valid absolute count with the specimen and sampling method. Receptor-sequence abundance does not identify the receptor ligand. Rigau et al. (2020) established a defined BTN2A1-dependent recognition mechanism for the Vgamma9Vdelta2 phosphoantigen response; that specificity is an example of why innate-like does not mean nonspecific. To test native versus added-receptor recognition, compare matched cells without the added receptor, target-positive and target-negative cells, and a suitable receptor-blocking or target-perturbation condition. Keep relevant healthy-cell controls, viability and exposure conditions explicit. This is experimental-design reasoning from the separate recognition mechanisms, not a claim that one cited assay validates every product. HLA loss does not establish that the native ligand or the added receptor target is present, and two recognition routes do not prove escape prevention."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "interferons",
    "name": "Interferon types I, II and III",
    "tldr": "Interferons are signalling proteins that change how cells respond to infection, stress and immune activity. There are three families with different receptors, and a short exposure, a long exposure and a missing response can each mean something different for a tumour.",
    "summary": "Type I interferons (alpha and beta) share a receptor system found on many cell types. Type II (gamma) uses a different receptor system and is made mainly by activated immune cells. The type I receptor, IFNAR, is expressed on virtually all nucleated cells and the type III receptor mainly on epithelial cells (Lazear et al., 2019), and interferon gamma production is largely restricted to immune cells although its receptor is widely expressed (Schneider et al., 2014). Interferon gamma effects include upregulated antigen processing and presentation and an antiviral state (Schroder et al., 2004). Type III (lambda) signals through a distinct receptor complex, made of IFN-lambda receptor 1 and IL-10 receptor 2, that signals through the Jak-STAT pathway (Kotenko et al., 2003); in mice the response to lambda was prominent in stomach, intestine and lung, very low in the brain and spleen, and restricted to epithelial cells in kidney and brain (Sommereyns et al., 2008). Types I, II and III group interferons by receptor usage; the alpha, beta, gamma and lambda names do not measure dose or potency. Many responses run through JAK and STAT proteins and can increase antigen-processing and HLA machinery, antiviral defences, or regulatory signals; producing an interferon, receiving it and carrying out a function are separate steps.",
    "links": [
      {
        "label": "IFN-lambdas mediate antiviral protection through a distinct class II cytokine receptor complex.",
        "url": "https://doi.org/10.1038/ni875"
      },
      {
        "label": "IFN-lambda (IFN-lambda) is expressed in a tissue-dependent fashion and primarily acts on epithelial cells in vivo.",
        "url": "https://doi.org/10.1371/journal.ppat.1000017"
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
        "label": "Mutations Associated with Acquired Resistance to PD-1 Blockade in Melanoma.",
        "url": "https://doi.org/10.1056/nejmoa1604958"
      },
      {
        "label": "Shared and Distinct Functions of Type I and Type III Interferons.",
        "url": "https://doi.org/10.1016/j.immuni.2019.03.025"
      },
      {
        "label": "Interferon-stimulated genes: a complex web of host defenses.",
        "url": "https://doi.org/10.1146/annurev-immunol-032713-120231"
      },
      {
        "label": "Interferon-gamma: an overview of signals, mechanisms and functions.",
        "url": "https://doi.org/10.1189/jlb.0603252"
      },
      {
        "label": "Rodero et al., 2017: Interferon-alpha protein and cellular sources",
        "url": "https://doi.org/10.1084/jem.20161451"
      },
      {
        "label": "Ayers et al., 2017: Interferon-gamma-related mRNA profile",
        "url": "https://doi.org/10.1172/JCI91190"
      }
    ],
    "targets": [
      "ifnar1",
      "ifngr1",
      "jak1",
      "jak2",
      "b2m"
    ],
    "terms": [
      "cytokine",
      "interferon-gamma-signature"
    ],
    "notes": [
      "In cancer, timing and the receiving cell decide the meaning. In mice, endogenous type I interferon was required to prevent the growth of carcinogen-induced and transplanted tumours, and the critical targets were host blood-lineage cells, not the tumour cells, which differs from interferon gamma, where tumour cells are important targets (Dunn et al., 2005). Prolonged interferon signalling in experimental tumours, driven by type II and maintained by types I and II, produced a resistance programme to checkpoint blockade that was PD-L1-dependent and independent, and biomarkers of that programme associated with progression after anti-PD-1 therapy in the patient data analysed (Benci et al., 2016). In four people with metastatic melanoma whose tumours first responded to pembrolizumab and later relapsed, paired biopsies showed loss-of-function mutations in JAK1 or JAK2 in two (with no response to interferon gamma in the mutant cells) and a truncating mutation in B2M, which removes class I display, in a third (Zaretsky et al., 2016). Four patients do not give a frequency for any cancer.",
      "Reading an interferon result needs the family, the receiver, the timing and the readout. An interferon signature in RNA is not an interferon concentration and cannot identify the producing cell. Capacity to respond under a controlled exposure is not evidence of natural exposure, and an inducible display gene score is not a count of displayed peptide complexes or a measure of tumour killing. A working display pathway can also not repair a structural loss of an HLA allele or a processing component, and stronger or longer signalling is not safer or more beneficial by default. A report on an interferon experiment should name the family, the preparation, the concentration or units, the exposure time, the cell identity and viability, and the controls, and should keep three quantities apart: a concentration in picograms per millilitre, RNA expression, and a change from a matched unstimulated condition (OnCo reporting advice). A fourfold rise in a display-gene score is not fourfold killing.",
      "Three measurement questions need separate answers. Protein concentration in a named fluid, for example picograms per millilitre, measures amount per volume. An RNA expression or signalling-protein readout measures a sampled cellular response. Change after controlled exposure relative to a matched unstimulated condition tests response capacity in that experiment. The last result does not establish that the same exposure occurred naturally, and a fluid concentration does not identify every producer or tissue exposure. Rodero et al. (2017) measured interferon-alpha protein, interferon-stimulated gene expression and antiviral activity separately; their activity assay measured protection from viral cytopathic effects, not tumour killing.",
      "Ayers et al. (2017) studied an interferon-gamma-related tumour RNA profile associated with response to pembrolizumab. That expression score is not an interferon protein concentration or a count of killed cells, and an association among treated patients alone does not establish treatment benefit relative to no treatment. For a controlled-exposure result, report interferon family, preparation, concentration, exposure time, cell identity, viability and controls. A low baseline score can coexist with an inducible response; intact gene sequence alone does not establish working signalling. As a measurement inference, changing an expression score from 1 to 4 relative units is a fourfold change in that readout, not evidence of fourfold killing, peptide display or matching receptor recognition."
    ],
    "aka": [
      "interferon",
      "interferons"
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "macrophage-states",
    "name": "Macrophage states beyond M1 and M2",
    "tldr": "What a macrophage is doing depends on where it came from, where it sits, and the signals and history it has had, so the two-box labels M1 and M2 describe a laboratory comparison and not every macrophage in a tissue. In a tumour, a macrophage's label does not on its own show what it is doing to the cancer or to T cells.",
    "summary": "A macrophage's lineage is its developmental origin; its state is a set of activity programmes at one time. A state label describes selected features and is not a complete biography. The M1 and M2 scheme grew from simplified experiments, with interferon gamma and microbial stimulation giving M1-like cells and interleukin-4 giving M2-like cells, and it is ambiguous unless the source, the stimulus and the markers are stated. A consensus framework asks authors to report the source of the macrophages, the activators used and a defined set of markers (Murray et al., 2014). When human macrophages were stimulated with diverse signals, 299 transcriptomes revealed a spectrum of activation states that extends the M1 and M2 model (Xue et al., 2014). In mice, tissue-resident macrophages had distinct enhancer landscapes beyond what developmental origin explained, and the local environment could reshape transplanted precursors and even reprogramme differentiated macrophages moved to a new environment (Lavin et al., 2014). Together these support diversity and plasticity without showing that any macrophage can be converted to any desired state.",
    "links": [
      {
        "label": "Macrophage activation and polarization: nomenclature and experimental guidelines.",
        "url": "https://doi.org/10.1016/j.immuni.2014.06.008"
      },
      {
        "label": "Transcriptome-based network analysis reveals a spectrum model of human macrophage activation.",
        "url": "https://doi.org/10.1016/j.immuni.2014.01.006"
      },
      {
        "label": "Tissue-resident macrophage enhancer landscapes are shaped by the local microenvironment.",
        "url": "https://doi.org/10.1016/j.cell.2014.11.018"
      }
    ],
    "terms": [
      "macrophage",
      "tumor-associated-macrophages",
      "inflammation",
      "myeloid-derived-suppressor-cells"
    ],
    "targets": [
      "cd163"
    ],
    "notes": [
      "In a tumour, a tumour-associated macrophage is named for its location, and its state and tested functions are separate questions. A tumour can hold several programmes in different neighbourhoods or at different times. An expression cluster can suggest a repair, interferon or lipid-handling programme, which is a hypothesis; it does not establish that the cells suppress T cells, kill cancer cells or would respond to a macrophage-directed drug. One marker such as CD163 does not establish a universal suppressive state, a change in proportions between two biopsies does not show that the same cells changed state, and the plain statement that M1 is good and M2 is bad loses the tissue and experiment that give a response its meaning.",
      "Macrophages are described with protein panels, flow cytometry and single-cell RNA, and the report needs the identification rules, tissue or culture source, stimulation, collection time and denominator, because a fraction of recovered macrophages is not cells per area of tissue. A function such as engulfment or the effect on stimulated T-cell proliferation needs its own test with viability and comparator controls."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "nkt-cells",
    "name": "Natural killer T (NKT) cells",
    "aka": [
      "NKT cells",
      "iNKT cells",
      "invariant NKT cells"
    ],
    "tldr": "Natural killer T cells are T cells, not a cross between two cell types, and their receptors recognise fat-based molecules shown on a protein called CD1d rather than the protein fragments shown on HLA. Despite the similar name they are a different family from natural killer cells.",
    "summary": "NKT cells carry a rearranged T-cell receptor, and some also carry receptors usually associated with natural killer cells, but an NK-associated surface marker does not define the family. A review describes their semi-invariant alpha-beta T-cell receptors as recognising CD1d-presented glycolipids, including a mammalian glycosphingolipid and microbial glycuronylceramides (Bendelac et al., 2007). CD1d displays lipid and glycolipid antigens, and the crystal structure of human CD1d with the synthetic glycolipid alpha-galactosylceramide showed the lipid tails fitting inside the groove (Koch et al., 2005). In mouse experiments, Valpha14 NKT cells were activated by a defined glycosylceramide in a CD1d-dependent, receptor-mediated way (Kawano et al., 1997). Type I, or invariant, NKT cells use a strongly shared alpha-chain arrangement with variable beta-chain junctions, found in mouse (Valpha14-Jalpha281) and in a homologous human form (Valpha24-JQ) (Lantz and Bendelac, 1994). Type II NKT cells are more diverse: in mice lacking class II presentation, CD4 T cells with a diverse receptor repertoire included a subset that recognised CD1 (Cardell et al., 1995). 'Invariant' does not mean every chain or every function is identical.",
    "links": [
      {
        "label": "An invariant T cell receptor alpha chain is used by a unique subset of major histocompatibility complex class I-specific CD4+ and CD4-8- T cells in mice and humans.",
        "url": "https://doi.org/10.1084/jem.180.3.1097"
      },
      {
        "label": "CD1-restricted CD4+ T cells in major histocompatibility complex class II-deficient mice.",
        "url": "https://doi.org/10.1084/jem.182.4.993"
      },
      {
        "label": "CD1d-restricted and TCR-mediated activation of valpha14 NKT cells by glycosylceramides.",
        "url": "https://doi.org/10.1126/science.278.5343.1626"
      },
      {
        "label": "Functionally distinct subsets of CD1d-restricted natural killer T cells revealed by CD1d tetramer staining.",
        "url": "https://doi.org/10.1084/jem.20011786"
      },
      {
        "label": "Differential antitumor immunity mediated by NKT cell subsets in vivo.",
        "url": "https://doi.org/10.1084/jem.20050953"
      },
      {
        "label": "The crystal structure of human CD1d with and without alpha-galactosylceramide.",
        "url": "https://doi.org/10.1038/ni1225"
      },
      {
        "label": "The biology of NKT cells.",
        "url": "https://doi.org/10.1146/annurev.immunol.25.022106.141711"
      },
      {
        "label": "Anti-GD2 CAR-NKT cells in patients with relapsed or refractory neuroblastoma: an interim analysis.",
        "url": "https://doi.org/10.1038/s41591-020-1074-2"
      },
      {
        "label": "Use of CAR-Transduced Natural Killer Cells in CD19-Positive Lymphoid Tumors.",
        "url": "https://doi.org/10.1056/nejmoa1910607"
      },
      {
        "label": "Tisagenlecleucel in Children and Young Adults with B-Cell Lymphoblastic Leukemia.",
        "url": "https://doi.org/10.1056/nejmoa1709866"
      },
      {
        "label": "Benlagha et al., 2000: Identification of glycolipid antigen-specific T cells",
        "url": "https://doi.org/10.1084/jem.191.11.1895"
      }
    ],
    "terms": [
      "t-cell",
      "nk-cell"
    ],
    "technologies": [
      "car-nk-macrophage"
    ],
    "notes": [
      "Function depends on the subset and the stimulus. In fresh human blood, lipid-loaded CD1d tetramers separated two subsets of CD1d-restricted T cells that differed in cytokine production and cytotoxic activation, and antigenic stimulation induced cytokines but not perforin whereas inflammatory factors enhanced perforin (Gumperz et al., 2002). In mouse sarcoma and melanoma-metastasis models, tumour rejection was a specialised function of liver-derived NKT cells and mainly of the CD4-negative fraction, while thymus-derived NKT cells were impaired, in part through interleukin-4 production (Crowe et al., 2005). So 'NKT' alone cannot mean protection against cancer, even within one species. An engineered receptor is a separate recognition route: CAR-NKT, CAR-NK and CAR-T are different cell families, and native and engineered recognition have to be measured separately. A phase 1 trial reported interim results for autologous NKT cells engineered to express a GD2-specific CAR with interleukin-15 in three children with neuroblastoma (NCT03294954): no dose-limiting toxicities were observed and one patient had an objective response (Heczey et al., 2020). Separate trials illustrate the other two families: an anti-CD19 CAR-NK product made from cord blood was given to 11 patients with relapsed or refractory CD19-positive cancers in a phase 1 and 2 trial (Liu et al., 2020), and tisagenlecleucel, an anti-CD19 CAR-T therapy, was given to 75 evaluable children and young adults in a phase 2 study in which the overall remission rate within 3 months was 81 per cent (Maude et al., 2018). Those trials concern other cells, diseases and products and say nothing about NKT cells.",
      "A tetramer loaded with a defined CD1d antigen identifies the cells that bind that complex, so a negative result does not count cells with other specificities, and a gate of NK-marker-positive T cells (sometimes called NKT-like) needs its operational definition stated. Counting such cells does not establish tumour killing, and a change in classical HLA display does not show that CD1d, its antigen or an effective NKT response is present.",
      "An NK-associated marker is insufficient to define an NKT cell. Benlagha et al. (2000) identified glycolipid-reactive T cells with CD1d1-alpha-galactosylceramide tetramers, including an NK1.1-negative population in mice, while natural killer cells did not bind those tetramers. This is a studied glycolipid-reactive subset, not a universal detection test for all type II NKT cells. NKT cells can carry NK-associated receptors, but a marker-positive T-cell gate and a defined CD1d-reactive T-cell population are different operational definitions."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "pattern-recognition-damps-and-pamps",
    "name": "Pattern recognition: DAMPs and PAMPs",
    "tldr": "Cells have built-in sensors for molecular features that suggest infection or tissue damage, and they can start an immune response without knowing what a particular cancer cell looks like. A sensor firing does not show that there was an infection, or that the immune system has learned to recognise the tumour.",
    "summary": "Pattern-recognition receptors are sensing proteins encoded in the genome. Unlike a T-cell receptor they do not each assemble a unique recognition sequence during development, and they detect particular molecular features at the cell surface, in internal vesicles or in the cytosol. Pathogen-associated molecular patterns (PAMPs) are microbial features such as lipopolysaccharide or microbial nucleic acid, and a feature need not identify one species. Damage-associated molecular patterns (DAMPs) are host-derived signals whose release, altered form or unusual location can indicate injury or stress; host material outside its usual compartment can matter even when its sequence is unchanged. Mouse genetics showed a specific dependency: mutations in the Tlr4 gene impeded lipopolysaccharide signalling, leaving the mice resistant to endotoxin but highly susceptible to Gram-negative infection (Poltorak et al., 1998). That makes TLR4 a lipopolysaccharide sensor, not a universal detector of microbes or damage. DNA in the cytosol is sensed by cGAS, which makes the messenger cGAMP that activates STING (Sun et al., 2013); the DNA can be microbial or mislocated host DNA, as when ruptured micronuclei spill genomic DNA into the cytosol of chromosomally unstable tumour cells (Bakhoum et al., 2018), so the response alone does not show infection.",
    "links": [
      {
        "label": "Defective LPS signaling in C3H/HeJ and C57BL/10ScCr mice: mutations in Tlr4 gene.",
        "url": "https://doi.org/10.1126/science.282.5396.2085"
      },
      {
        "label": "Cyclic GMP-AMP synthase is a cytosolic DNA sensor that activates the type I interferon pathway.",
        "url": "https://doi.org/10.1126/science.1232458"
      },
      {
        "label": "Chromosomal instability drives metastasis through a cytosolic DNA response.",
        "url": "https://doi.org/10.1038/nature25432"
      },
      {
        "label": "Toll-like receptor 4-dependent contribution of the immune system to anticancer chemotherapy and radiotherapy.",
        "url": "https://doi.org/10.1038/nm1622"
      },
      {
        "label": "Pathogen recognition and inflammatory signaling in innate immune defenses.",
        "url": "https://doi.org/10.1128/cmr.00046-08"
      },
      {
        "label": "Damage-Associated Molecular Patterns in Inflammatory Diseases.",
        "url": "https://doi.org/10.4110/in.2018.18.e27"
      },
      {
        "label": "Mechanisms of central tolerance for B cells.",
        "url": "https://doi.org/10.1038/nri.2017.19"
      },
      {
        "label": "Evaluating Human Natural Killer Cells Antibody-dependent Cellular Cytotoxicity (ADCC) Using Plate-bound Anti-CD16 Antibodies.",
        "url": "https://doi.org/10.21769/bioprotoc.4285"
      },
      {
        "label": "Recognition of microorganisms and activation of the immune response.",
        "url": "https://doi.org/10.1038/nature06246"
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
        "label": "Venereau et al., 2012: Different redox forms of HMGB1",
        "url": "https://doi.org/10.1084/jem.20120189"
      }
    ],
    "terms": [
      "inflammation",
      "dendritic-cells",
      "immunogenic-cell-death"
    ],
    "pathways": [
      "cgas-sting"
    ],
    "technologies": [
      "sting-agonist"
    ],
    "notes": [
      "In cancer treatment, injury signals can shape dendritic-cell state, antigen processing and inflammatory signals. In mice and in people, the protein HMGB1 released by dying tumour cells acted on TLR4 on dendritic cells, and during chemotherapy or radiotherapy dendritic cells needed TLR4 and its adaptor MyD88 to process and cross-present antigen from dying tumour cells; patients with breast cancer who carried a TLR4 loss-of-function allele relapsed sooner after radiotherapy and chemotherapy in the cohort studied, which is an association (Apetoh et al., 2007). Immunogenic cell death is a stronger, conditional claim that dying-cell material supports an adaptive response under the tested conditions. Detecting a DAMP, or killing cells, does not show the whole chain, and more innate activation is not automatically safer or more useful. Reviews describe PRRs as detecting evolutionarily conserved structures on pathogens (Mogensen, 2009) and DAMPs as endogenous danger molecules released from damaged or dying cells, such as HMGB1, S100 proteins and heat shock proteins (Roh and Sohn, 2018). B-cell antigen receptor genes are by contrast assembled by V(D)J recombination, a random process that generates diversity (Nemazee, 2017), whereas natural killer cells rely on germline-coded receptors (Liu, 2022), and a review describes pattern-recognition receptors as triggering antimicrobial defences and stimulating the adaptive response (Medzhitov, 2007).",
      "Measurements of a signal, of sensor engagement and of a downstream response are different, and RNA expression, protein concentration and cytokine output mean different things. An experiment needs matched vehicle, viability and time-point controls and a perturbation of the proposed sensor or pathway. A purified-material study also needs contamination controls, because a trace of microbial material can make a response look attributable to the host molecule under test. A response that falls after one perturbation shows a dependency in that experiment and not every step of tumour recognition or a clinical effect.",
      "The inherited-versus-assembled distinction concerns receptor generation, not whether a receptor has a specific ligand. Hayday and Vantourout (2020) contrast germline-encoded Toll-like and natural killer receptors with clonotypic T-cell and B-cell antigen receptors generated by somatic recombination, while also describing innate-like responses through antigen receptors. Oettinger et al. (1990) describe V(D)J rearrangement in developing lymphocytes as a source of immunoglobulin and T-cell receptor diversity. A pattern-recognition receptor does not assemble a unique recognition sequence in each developing cell in that way.",
      "Altered host-molecule form can matter as well as release or location. Venereau et al. (2012) tested different redox forms of HMGB1: the all-thiol form promoted cell recruitment, the disulfide form promoted cytokine release, and terminal oxidation abolished both activities under the tested conditions. These are different activities of a named host protein, not a rule that every chemical alteration or every oxidation is an activating danger signal."
    ]
  },
  {
    "kind": "term",
    "asOf": "2026-11-10",
    "category": "Immunology",
    "provenance": {
      "editedBy": "OnCo education audit",
      "editedOn": "2026-11-10"
    },
    "id": "peripheral-tolerance",
    "name": "Peripheral tolerance",
    "tldr": "Peripheral tolerance is the set of controls that restrain mature immune cells after they have developed, which helps stop them reacting against the body's own tissues. Tumours can use the same controls to avoid attack, and a treatment that releases them can also harm healthy organs.",
    "summary": "Central tolerance acts during lymphocyte development, in T-cell selection in the thymus and B-cell development in bone marrow. Peripheral tolerance acts on mature cells in tissues and lymphoid organs. The two names say when and where restraint operates, not that they are two complete filters that remove every self-reactive receptor. For T cells, tolerance mechanisms that operate in the thymus before the cells mature and circulate are called central tolerance, but not every self-antigen is made in the thymus, so central tolerance alone is insufficient and additional mechanisms restrain mature circulating T cells (Xing and Hogquist, 2012). For B cells, tolerance regulated at the immature B-cell stage in the bone marrow is called central tolerance and works through clonal deletion and receptor editing, while mechanisms that act after B cells leave the bone marrow were described as not fail-safe and mostly reversible (Nemazee, 2017). Several mechanisms contribute: anergy (reduced responsiveness), deletion (removal by cell death), suppression by regulatory T cells, inhibitory pathways and limited supporting signals. Deletion and restraint differ, because a deleted clone is gone and a restrained clone may remain and respond differently under defined conditions. In transgenic mice, cross-presentation of a self-antigen led to deletion of autoreactive CD8 T cells, and adding CD4 helper cells impaired that deletion and caused diabetes in 68 per cent of mice, whereas the CD8 cells alone did not (Kurts et al., 1997). In mice, transferring CD4 cells depleted of CD25-positive cells into athymic recipients caused multiple autoimmune diseases, and giving back CD4-positive CD25-positive cells within a limited period prevented them in a dose-dependent way (Sakaguchi et al., 1995). A separate mechanism acts on ligand supply: CTLA-4 captured CD80 and CD86 from opposing cells by trans-endocytosis, impairing costimulation through CD28 (Qureshi et al., 2011).",
    "links": [
      {
        "label": "CD4+ T cell help impairs CD8+ T cell deletion induced by cross-presentation of self-antigens and favors autoimmunity.",
        "url": "https://doi.org/10.1084/jem.186.12.2057"
      },
      {
        "label": "Immunologic self-tolerance maintained by activated T cells expressing IL-2 receptor alpha-chains (CD25). Breakdown of a single mechanism of self-tolerance causes various autoimmune diseases.",
        "url": "https://doi.org/10.4049/jimmunol.155.3.1151"
      },
      {
        "label": "Trans-endocytosis of CD80 and CD86: a molecular basis for the cell-extrinsic function of CTLA-4.",
        "url": "https://doi.org/10.1126/science.1202947"
      },
      {
        "label": "T-cell tolerance: central and peripheral.",
        "url": "https://doi.org/10.1101/cshperspect.a006957"
      },
      {
        "label": "Mechanisms of central tolerance for B cells.",
        "url": "https://doi.org/10.1038/nri.2017.19"
      },
      {
        "label": "CD8 T cell ignorance or tolerance to islet antigens depends on antigen dose.",
        "url": "https://doi.org/10.1073/pnas.96.22.12703"
      },
      {
        "label": "Human Tumor Antigens and Cancer Immunotherapy.",
        "url": "https://doi.org/10.1155/2015/948501"
      }
    ],
    "terms": [
      "immune-checkpoint",
      "t-cell",
      "irae"
    ],
    "targets": [
      "ctla4",
      "cd28",
      "cd80",
      "cd86",
      "foxp3"
    ],
    "notes": [
      "A quiet response has other explanations. Immune ignorance is a setting where the relevant cells have not effectively met the antigen, which is different from tolerance after an encounter, and an antibody concentration alone cannot show that self-reactive B cells were deleted or restrained. In a mouse model with a self antigen in the pancreatic islets, a low antigen concentration left CD8 T cells ignorant of it, while a higher concentration allowed cross-presentation and peripheral deletion (Kurts et al., 1999). Tolerance is inferred from mechanism-specific experiments and not from a blood score: a controlled response to a defined antigen, lineage and count evidence for deletion, and coculture or pathway tests for suppression, with cell type, prior exposure and comparator stated. A non-response can also reflect absent receptors, poor viability or an unsuitable assay.",
      "For cancer, many tumour-associated targets are also found in healthy tissue, and normal tolerance helps explain why recognition and activation are not interchangeable. Tumours can exploit regulatory pathways, but a treatment that releases a restraint can also harm normal organs. A neoantigen may differ from the normal molecule, yet a sequence difference alone does not show that it is recognised, that useful activation follows or that it is safe; candidate specificity, natural display and cross-reactivity with healthy tissue are separate tests. A self-similarity calculation screens candidates and does not measure central or peripheral tolerance in a person. Reviews of human tumour antigens note that differentiation antigens are expressed by some tumours and the matching healthy tissue, that responses to melanoma differentiation antigens occur in patients and healthy donors (suggesting central tolerance to them is incomplete), and that the autoimmune side effects of checkpoint blockade likely reflect breakage of peripheral tolerance to antigens of normal tissues (Vigneron, 2015)."
    ]
  }
];
