import type { TargetInput } from "@/lib/schema";

/**
 * The immune cell-surface markers a whole-blood immunophenotyping panel is built from.
 *
 * OnCo had pages for the markers drugs are aimed at (PD-1, CTLA-4, CD19, CD38) and for almost none of the markers
 * used to say which cell is which. CD4 and CD8 had no page at all, which is the denominator of nearly every
 * immuno-oncology result on the site. This file adds the nineteen that were missing, so a reader who meets
 * "CD8-positive tumour-infiltrating lymphocytes" or "CD163-positive macrophages" has somewhere to go.
 *
 * Gene symbols are resolved from HGNC (rest.genenames.org), not recalled, and each record links its HGNC report
 * so the Ensembl, UniProt and Entrez ids are one click away. The ids are not set as record fields: that would
 * require an entry in the generated src/data/target-xrefs.ts, which can only be rebuilt by refetching all 1,694
 * targets (see the note in scripts/fetch-xrefs.ts). They go in on the next full run of that script.
 *
 * Where a marker is an isoform rather than a gene it is said so rather than given a gene of its own: CD45RA and
 * CD45RO are splice forms of PTPRC and belong on the CD45 record, which exists as `ptprc`.
 *
 * What each marker identifies is standard immunology and is stated plainly. Claims that go beyond identification,
 * such as a marker's density predicting outcome, carry a resolved citation and no others are made.
 */
const asOf = "2026-10-16";
type M = Omit<TargetInput, "kind" | "asOf">;
const m = (x: M): TargetInput => ({ kind: "target", asOf, targetClass: "surface-antigen", tags: ["immune-marker"], ...x });
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;

export const targetsImmuneMarkers: TargetInput[] = [
  m({ id: "cd4", name: "CD4", aka: ["CD4 molecule", "T4"], symbol: "CD4",
    wikipedia: W("CD4"), terms: ["t-cell"], related: ["cd8", "hla-dr"],
    biology: "Co-receptor on helper T cells; binds MHC class II and marks the helper lineage.",
    whereFound: ["Helper T cells", "Monocytes and macrophages", "Dendritic cells"],
    tldr: "CD4 is the marker of helper T cells, the cells that direct an immune response rather than kill infected or cancerous cells themselves. A CD4 count is how the strength of that arm of the immune system is measured.",
    summary: "CD4 is a surface co-receptor that binds MHC class II and defines the helper T cell lineage. Helper T cells do not kill target cells directly; they license other cells to, which is why a CD4 count is the standard measure of that arm of the immune system in transplant, infection and after chemotherapy. CD4 is also present at lower levels on monocytes, macrophages and dendritic cells. In an immunophenotyping panel CD4 and CD8 are the pair that split the T cell compartment, and nearly every statement on this site about T cell infiltration or recovery rests on them. CD4 is separately known as the receptor HIV uses to enter cells.",
    links: [{ label: "HGNC:1678", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1678" }] }),

  m({ id: "cd8", name: "CD8", aka: ["CD8a", "CD8 alpha", "T8"], symbol: "CD8A",
    wikipedia: W("CD8"), terms: ["t-cell", "cold-vs-hot", "t-cell-exhaustion-term"], related: ["cd4", "pd1"],
    biology: "Co-receptor on cytotoxic T cells; binds MHC class I and marks the killing lineage. The beta chain is CD8B (HGNC:1707).",
    whereFound: ["Cytotoxic T cells", "Some natural killer cells"],
    tldr: "CD8 marks the T cells that kill: the ones that recognise a cancer cell and destroy it. How many CD8 cells sit inside a tumour, and where, is one of the few immune measurements that predicts how a cancer will behave.",
    summary: "CD8 is the co-receptor that binds MHC class I and defines cytotoxic T cells, the cells that kill a target directly. It is the marker behind the phrase 'tumour-infiltrating lymphocytes' and behind the distinction between a hot and a cold tumour. Its density is prognostic rather than merely descriptive: the international consensus Immunoscore study quantified CD3 and CD8 densities in the tumour centre and the invasive margin in 1,885 stage I/II colon cancers across Canada, the United States, Europe and Asia, and a high Immunoscore carried the lowest risk of recurrence in both cohorts. CD8 is a two-chain receptor; CD8A is the alpha chain given here and CD8B (HGNC:1707) the beta.",
    links: [{ label: "HGNC:1706", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1706" },
      { label: "Consensus Immunoscore in stage I/II colon cancer (Cancers 2023)", url: "https://doi.org/10.3390/cancers15020418" }] }),

  m({ id: "cd14", name: "CD14", symbol: "CD14",
    wikipedia: W("CD14"), terms: ["tumor-associated-macrophages", "myeloid-derived-suppressor-cells"], related: ["fcgr3a", "cd163"],
    biology: "Co-receptor for bacterial lipopolysaccharide with TLR4; the defining surface marker of monocytes.",
    whereFound: ["Monocytes", "Macrophages", "Neutrophils at low level"],
    tldr: "CD14 is how a monocyte is recognised: the circulating cell that becomes a macrophage once it enters tissue. Splitting monocytes by CD14 and CD16 is the first step in describing the myeloid side of a tumour.",
    summary: "CD14 is a co-receptor that presents bacterial lipopolysaccharide to TLR4, and it is the surface marker that defines monocytes. Monocytes are split into classical, intermediate and non-classical subsets by CD14 together with CD16, and that split is the starting point for describing the myeloid compartment of blood or a tumour. Monocytes recruited into a tumour become tumour-associated macrophages, so CD14 is the upstream marker for the cells CD163 later identifies.",
    links: [{ label: "HGNC:1628", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1628" }] }),

  m({ id: "cd163", name: "CD163", symbol: "CD163",
    wikipedia: W("CD163"), terms: ["tumor-associated-macrophages", "tumor-microenvironment"], related: ["cd14", "csf1r"],
    biology: "Scavenger receptor for haemoglobin-haptoglobin complexes, restricted to the monocyte and macrophage line.",
    whereFound: ["Macrophages, particularly the alternatively activated kind", "Monocytes at lower level"],
    tldr: "CD163 marks the macrophages that help a tumour rather than attack it. It is the usual way of counting those cells in a tumour sample, which is why it appears whenever tumour-associated macrophages are discussed.",
    summary: "CD163 is a scavenger receptor for haemoglobin-haptoglobin complexes and is confined to monocytes and macrophages. It is the marker most often used to identify alternatively activated macrophages, the phenotype associated with tissue repair and immune suppression rather than with killing, and so it is the standard stain for counting tumour-associated macrophages in a tissue section. A soluble form shed into blood is measured in inflammatory disease. CD163 is the practical link between the macrophage record on this site and the agents aimed at that compartment, such as the CSF1R antibodies.",
    links: [{ label: "HGNC:1631", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1631" }] }),

  m({ id: "cd56", name: "CD56", aka: ["NCAM1", "neural cell adhesion molecule 1"], symbol: "NCAM1",
    wikipedia: W("Neural_cell_adhesion_molecule"), terms: ["nk-cell"], related: ["fcgr3a"],
    biology: "Adhesion molecule of the immunoglobulin superfamily; the defining marker of natural killer cells and expressed on neuroendocrine tissue.",
    whereFound: ["Natural killer cells", "Some T cells", "Neuroendocrine tumours", "Small cell lung cancer"],
    tldr: "CD56 identifies natural killer cells, the part of the immune system that kills without needing to be taught what to look for. The same marker appears on neuroendocrine cancers, which is why it is used in diagnosis as well.",
    summary: "CD56 is the neural cell adhesion molecule and the marker that defines natural killer cells, which are split into CD56-bright regulatory and CD56-dim cytotoxic subsets. It is used twice over in oncology: to identify NK cells in an immune panel, and as a diagnostic stain for neuroendocrine differentiation, including small cell lung cancer, where it is also the antigen behind several antibody-drug conjugates.",
    links: [{ label: "HGNC:7656", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:7656" }] }),

  m({ id: "cd11b", name: "CD11b", aka: ["ITGAM", "integrin alpha M", "Mac-1"], symbol: "ITGAM",
    wikipedia: W("Integrin_alpha_M"), terms: ["myeloid-derived-suppressor-cells", "tumor-microenvironment"], related: ["cd33", "cd66b"],
    biology: "Integrin alpha M, partner of CD18 in complement receptor 3; broadly expressed across the myeloid line.",
    whereFound: ["Neutrophils", "Monocytes and macrophages", "Natural killer cells", "Myeloid-derived suppressor cells"],
    tldr: "CD11b is carried by most of the myeloid immune cells, and together with CD33 it is part of how myeloid-derived suppressor cells are defined: the cells that hold back a response against a tumour.",
    summary: "CD11b is integrin alpha M, which pairs with CD18 to form complement receptor 3 and is expressed across neutrophils, monocytes, macrophages and natural killer cells. In oncology its importance is definitional: myeloid-derived suppressor cells have no single marker of their own and are identified by a combination that includes CD11b and CD33, which is why a page on those cells needs this one.",
    links: [{ label: "HGNC:6149", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:6149" }] }),

  m({ id: "cd66b", name: "CD66b", aka: ["CEACAM8", "CGM6"], symbol: "CEACAM8",
    wikipedia: W("CEACAM8"), terms: ["myeloid-derived-suppressor-cells"], related: ["cd11b", "ceacam5"],
    biology: "Granulocyte activation antigen of the CEA family, stored in secondary granules and brought to the surface on activation.",
    whereFound: ["Neutrophils", "Granulocytic myeloid-derived suppressor cells"],
    tldr: "CD66b marks neutrophils, and specifically neutrophils that have been activated. It is the marker used to pick out the granulocyte-like suppressor cells that accumulate in people with advanced cancer.",
    summary: "CD66b is a granulocyte activation antigen of the carcinoembryonic antigen family, held in secondary granules and brought to the cell surface when a neutrophil is activated. In cancer it is the marker used to identify the granulocytic or polymorphonuclear form of myeloid-derived suppressor cells, the population that expands in advanced disease and suppresses T cell responses. It belongs to the same family as CEACAM5, which this site records as a drug target.",
    links: [{ label: "HGNC:1820", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1820" }] }),

  m({ id: "cd11c", name: "CD11c", aka: ["ITGAX", "integrin alpha X"], symbol: "ITGAX",
    wikipedia: W("Integrin_alpha_X"), terms: ["antigen-presentation-immunoediting"], related: ["cd1c", "cd141", "hla-dr"],
    biology: "Integrin alpha X, partner of CD18; the conventional marker of dendritic cells.",
    whereFound: ["Dendritic cells", "Monocytes and macrophages", "Some B cells"],
    tldr: "CD11c identifies dendritic cells, the cells that carry pieces of a tumour to the lymph node and show them to T cells. Without that step, a T cell never learns the cancer is there.",
    summary: "CD11c is integrin alpha X and the conventional marker of dendritic cells, the professional antigen-presenting cells that take material from a tumour to a draining lymph node and present it to T cells. It is not exclusive to them, appearing on macrophages and some B cells, which is why dendritic subsets are defined by CD11c together with CD1c and CD141. Antigen presentation is the step every immunotherapy depends on, so this is a marker for the beginning of the response rather than its end.",
    links: [{ label: "HGNC:6152", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:6152" }] }),

  m({ id: "cd1c", name: "CD1c", aka: ["BDCA-1"], symbol: "CD1C",
    wikipedia: W("CD1C"), terms: ["antigen-presentation-immunoediting"], related: ["cd11c", "cd141"],
    biology: "MHC-like molecule presenting lipid antigens; marks the cDC2 dendritic subset.",
    whereFound: ["Conventional type 2 dendritic cells", "Some B cells"],
    tldr: "CD1c marks one of the two main dendritic cell types. Unlike most antigen presentation, CD1 molecules show fats rather than protein fragments to T cells.",
    summary: "CD1c is an MHC-like molecule that presents lipid rather than peptide antigens, and it marks conventional type 2 dendritic cells, the commoner of the two conventional subsets in blood. Separating dendritic cells into CD1c and CD141 subsets matters because they do different jobs, and only some of them cross-present tumour antigen to cytotoxic T cells.",
    links: [{ label: "HGNC:1636", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1636" }] }),

  m({ id: "cd141", name: "CD141", aka: ["THBD", "thrombomodulin", "BDCA-3"], symbol: "THBD",
    wikipedia: W("Thrombomodulin"), terms: ["antigen-presentation-immunoediting"], related: ["cd11c", "cd1c"],
    biology: "Thrombomodulin, an endothelial anticoagulant cofactor, which also marks the cross-presenting cDC1 dendritic subset.",
    whereFound: ["Conventional type 1 dendritic cells", "Vascular endothelium", "Monocytes at low level"],
    tldr: "CD141 marks the rare dendritic cells that are best at showing tumour material to killer T cells. The same protein, under its other name thrombomodulin, is part of how blood clotting is kept in check.",
    summary: "CD141 is thrombomodulin, a cofactor that lets thrombin activate protein C and so restrains clotting on the vessel wall. In immunology it is the marker of conventional type 1 dendritic cells, the scarce subset specialised in cross-presentation, which is the route by which material taken from a dying tumour cell is shown to cytotoxic T cells. The dual identity is worth keeping in mind when reading a result: the same antibody stains endothelium.",
    links: [{ label: "HGNC:11784", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:11784" }] }),

  m({ id: "hla-dr", name: "HLA-DR", aka: ["HLA-DRA", "MHC class II DR"], symbol: "HLA-DRA",
    wikipedia: W("HLA-DR"), terms: ["antigen-presentation-immunoediting"], related: ["cd4", "hla-a", "cd11c"],
    biology: "MHC class II molecule presenting peptide to CD4 T cells; the alpha chain HLA-DRA is given here.",
    whereFound: ["Dendritic cells", "B cells", "Monocytes and macrophages", "Activated T cells"],
    tldr: "HLA-DR is the display case that antigen-presenting cells use to show fragments to helper T cells. When monocytes lose it, the immune system is suppressed, which happens in advanced cancer and severe illness.",
    summary: "HLA-DR is an MHC class II molecule, the structure on which antigen-presenting cells display peptide to CD4 helper T cells, and the alpha chain HLA-DRA is the gene given here. Two uses matter in oncology. It is part of how dendritic cells, B cells and monocytes are identified in a panel; and low HLA-DR on monocytes is a recognised sign of immune suppression, used as a marker of the suppressed myeloid state seen in advanced cancer and critical illness. Myeloid-derived suppressor cells are defined partly by that absence.",
    links: [{ label: "HGNC:4947", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:4947" }] }),

  m({ id: "cd57", name: "CD57", aka: ["B3GAT1", "HNK-1"], symbol: "B3GAT1",
    wikipedia: W("CD57"), terms: ["t-cell-exhaustion-term", "nk-cell"], related: ["cd28", "cd8"],
    biology: "Glucuronyltransferase making the HNK-1 carbohydrate epitope; accumulates on repeatedly divided lymphocytes.",
    whereFound: ["Terminally differentiated T cells", "Mature natural killer cells"],
    tldr: "CD57 appears on immune cells that have divided many times and are near the end of their working life. It is the usual way of telling a worn-out T cell from a fresh one.",
    summary: "CD57 is the carbohydrate epitope made by the glucuronyltransferase B3GAT1, and it accumulates on lymphocytes that have gone through many rounds of division. It marks terminal differentiation and replicative senescence rather than exhaustion proper, and the distinction matters: a senescent cell has run out of divisions, whereas an exhausted cell is being actively restrained by checkpoints and may be released by blocking them. CD57 is usually read alongside the loss of CD28, and on natural killer cells it marks the most mature, most cytotoxic population.",
    links: [{ label: "HGNC:921", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:921" }] }),

  m({ id: "cd62l", name: "CD62L", aka: ["SELL", "L-selectin"], symbol: "SELL",
    wikipedia: W("L-selectin"), terms: ["t-cell"], related: ["ccr7", "ptprc"],
    biology: "L-selectin, the homing receptor that lets lymphocytes enter a lymph node across its high endothelial venules.",
    whereFound: ["Naive and central memory T cells", "B cells", "Neutrophils and monocytes"],
    tldr: "CD62L is the ticket a lymphocyte needs to get into a lymph node. Whether a T cell carries it separates the cells held in reserve from the ones already out working in tissue.",
    summary: "CD62L is L-selectin, the adhesion receptor that lets a lymphocyte roll along and enter the high endothelial venules of a lymph node. Its presence or absence, read with CCR7, is how naive and central memory cells are told apart from effector memory cells that have left the lymph node circuit for tissue. That distinction is central to cell therapy, where the less differentiated, CD62L-carrying populations are the ones that persist and expand after infusion.",
    links: [{ label: "HGNC:10720", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:10720" }] }),

  m({ id: "cd69", name: "CD69", symbol: "CD69",
    wikipedia: W("CD69"), terms: ["t-cell"], related: ["cd25", "cd62l"],
    biology: "Earliest inducible surface antigen after lymphocyte activation; also retains cells in tissue by opposing S1P receptor 1.",
    whereFound: ["Recently activated lymphocytes", "Tissue-resident memory T cells"],
    tldr: "CD69 appears within hours of a lymphocyte being activated, so it is the quickest way to tell that something has just woken the immune system up. It also keeps T cells inside a tissue rather than letting them drift back to the blood.",
    summary: "CD69 is the earliest surface antigen induced after lymphocyte activation, appearing within hours, which makes it the standard readout for a response that has just happened rather than one that happened weeks ago. It has a second job: by opposing sphingosine-1-phosphate receptor 1 it keeps cells from leaving a tissue, and so it is one of the markers that define tissue-resident memory T cells, the population that stays inside an organ, including inside a tumour.",
    links: [{ label: "HGNC:1694", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1694" }] }),

  m({ id: "cxcr3", name: "CXCR3", symbol: "CXCR3",
    wikipedia: W("CXCR3"), terms: ["immune-exclusion", "cold-vs-hot"], related: ["cd8", "interferon-gamma-signature"],
    biology: "Chemokine receptor for CXCL9, CXCL10 and CXCL11; guides effector T cells towards interferon-driven inflammation.",
    whereFound: ["Effector and effector memory T cells", "Natural killer cells"],
    tldr: "CXCR3 is the receptor a killer T cell uses to find its way into a tumour. If the tumour is not making the signals it listens for, the T cells never arrive, which is one way a tumour stays cold.",
    summary: "CXCR3 binds the interferon-induced chemokines CXCL9, CXCL10 and CXCL11, and it is the receptor that steers effector T cells towards inflamed tissue. It is the mechanical link between the interferon-gamma signature and T cell infiltration: a tumour that does not produce those chemokines is not entered by the cells that could kill it, which is one of the described routes to immune exclusion and a cold tumour.",
    links: [{ label: "HGNC:4540", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:4540" }] }),

  m({ id: "cxcr5", name: "CXCR5", symbol: "CXCR5",
    wikipedia: W("CXCR5"), terms: ["tertiary-lymphoid-structures"], related: ["cd4", "ccr6"],
    biology: "Receptor for CXCL13; directs cells into B cell follicles and germinal centres.",
    whereFound: ["B cells", "Follicular helper T cells"],
    tldr: "CXCR5 is what draws immune cells into the follicles where B cells are trained. The same signal builds the lymph-node-like structures that sometimes form inside tumours and are linked to better outcomes.",
    summary: "CXCR5 binds CXCL13 and is the receptor that organises cells into B cell follicles, carried by B cells and by the follicular helper T cells that support them. Its relevance to cancer is through tertiary lymphoid structures, the organised immune aggregates that form within some tumours and are associated with response to checkpoint blockade; CXCL13 and CXCR5 are part of how those structures assemble.",
    links: [{ label: "HGNC:1060", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1060" }] }),

  m({ id: "ccr6", name: "CCR6", symbol: "CCR6",
    wikipedia: W("CCR6"), terms: ["t-cell"], related: ["ccr4", "cxcr5"],
    biology: "Receptor for CCL20; marks Th17-polarised T cells and directs cells to mucosal tissue.",
    whereFound: ["Th17 cells", "Memory T cells", "B cells", "Dendritic cells"],
    tldr: "CCR6 marks the T cells that patrol mucosal surfaces such as the gut and airway, and it is the usual way of picking out the Th17 type of helper cell.",
    summary: "CCR6 binds CCL20 and directs cells to mucosal tissue, and it is the surface marker conventionally used to identify Th17-polarised helper T cells. In an immune panel it is read together with CXCR3 and CCR4 to assign helper T cells to their functional types, a division that matters when describing what sort of response a tumour or a treatment has provoked.",
    links: [{ label: "HGNC:1607", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1607" }] }),

  m({ id: "cd34", name: "CD34", symbol: "CD34",
    wikipedia: W("CD34"), terms: ["angiogenesis"], related: ["ptprc"],
    biology: "Sialomucin adhesion molecule on haematopoietic stem and progenitor cells and on vascular endothelium.",
    whereFound: ["Haematopoietic stem and progenitor cells", "Vascular endothelium"],
    tldr: "CD34 marks the blood-forming stem cells that a transplant is counted in, and it also stains blood vessels, which is how new vessel growth in a tumour is measured.",
    summary: "CD34 is a sialomucin carried by haematopoietic stem and progenitor cells and by vascular endothelium. It is one of the few markers with a direct clinical count attached: a stem cell graft is dosed in CD34-positive cells per kilogram, which decides whether an autologous or allogeneic transplant can go ahead. Its second use is as an endothelial stain for measuring microvessel density, the standard histological read-out for angiogenesis in a tumour.",
    links: [{ label: "HGNC:1662", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:1662" }] }),

  m({ id: "cd235a", name: "CD235a", aka: ["GYPA", "glycophorin A"], symbol: "GYPA",
    wikipedia: W("Glycophorin_A"), related: ["ptprc"],
    biology: "The major sialoglycoprotein of the red cell membrane and carrier of the MN blood group antigens.",
    whereFound: ["Red blood cells and their precursors"],
    tldr: "CD235a marks red blood cells. In an immune test its job is the opposite of the others: it is used to find red cells so they can be excluded, because there are far too many of them to leave in.",
    summary: "CD235a is glycophorin A, the main sialoglycoprotein of the red cell membrane and the carrier of the MN blood group antigens. It appears in whole-blood immune panels as a dump marker: red cells outnumber white cells by roughly a thousand to one, so they are identified by CD235a and excluded before anything else is counted. It is also used to identify erythroid precursors in marrow, which matters in myelodysplastic syndromes and erythroleukaemia.",
    links: [{ label: "HGNC:4702", url: "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:4702" }] }),
];
