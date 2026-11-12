import type { TermInput } from "@/lib/schema";

// Cell maps, analytical reproducibility and clinical utility need separate evidence.
export const educationSpatialMeasurement202611Terms: TermInput[] = [
  {
    "kind": "term",
    "id": "spatial-proximity-metrics",
    "name": "Spatial proximity metrics",
    "aka": [
      "Spatial proximity scores",
      "G-cross function",
      "Cellular neighbourhood metrics"
    ],
    "category": "Methods and models",
    "tldr": "These measurements describe where different cells sit in a tissue section. Distance, density and mixing answer different questions and do not by themselves show interaction or predict treatment benefit.",
    "summary": "Spatial proximity analysis describes relationships between typed cells at specified positions in sampled tissue. Radius counts, nearest-neighbour distances, G-cross curves, mixing scores and cellular neighbourhoods answer different questions. Their definitions depend on cell calls, region selection, reference populations and physical distance rules.\n\nA map can support a biological hypothesis or a cohort association while leaving functional interaction and clinical usefulness unresolved. Read the exact assay and sampling design, preserve the denominator and validate the same measurement before extending a result to another setting.",
    "asOf": "2026-11-12",
    "notes": [
      "A spatial proximity analysis begins with a sampled section, estimated cell types and positions. Staining, imaging, cell segmentation and typing create that list; errors in boundaries, marker assignment or signal spillover can therefore create false neighbours. Density asks how many cells occupy a stated area, while proximity asks how one cell type is positioned relative to another. Keeping the analysis box and its tissue compartments visible is as important as reporting the final number.",
      "A compartment density might be CD8 T cells per square millimetre of tumour epithelium or stroma. A radius count can ask how many cells of type A lie within a chosen distance of a type B cell; a population fraction also states which cells form its denominator. A nearest-neighbour analysis measures, for each cell of type A, the distance to the closest cell of type B and may summarise those distances by their median. Define whether distances use cell centres or boundaries; the same pair can have different values under these rules.",
      "The directed G-cross function gives the fraction of reference cells of one type whose nearest cell of the other type lies within each radius. It is a curve over distance. Its value at 20 micrometres and its area from zero to 20 micrometres are different summaries. The fixed-radius fraction is unitless; an unnormalised area over distance has distance units, so report any normalisation. A curve, a map of local values and a clustered neighbourhood assignment also need not reduce to one number per slide. Name the actual output and aggregation rule.",
      "Mixing scores have method-specific definitions. Keren's score divided immune-tumour neighbour interactions by immune-immune interactions in an image-derived neighbour matrix. Maley's Morisita-Horn approach instead assessed spatial overlap in the distribution of immune and cancer cells on histology images. These are not interchangeable measurements. Cellular-neighbourhood analysis groups recurring local cell-type compositions: Schürch's 2020 method used a ten-cell nearest-neighbour window including the centre cell, rather than ten additional cells, and clustered those compositions.",
      "One micrometre is one thousandth of a millimetre, so 20 micrometres is 0.020 millimetres. A distance threshold is not evidence of membrane contact. In a fictional geometry with equal circular cells seven to ten micrometres wide, centres 20 micrometres apart leave a gap of ten to 13 micrometres. This calculation does not establish a biological lymphocyte-size range. Cell dimensions, shape and the choice of centres or boundaries must be measured or specified for the actual image.",
      "For a contact-dependent mechanism, immune cells retained in stroma face a different spatial question from cells among cancer cells. Position alone leaves antigen recognition and functional capacity unmeasured: a T cell 15 micrometres from a cancer cell need not be recognising or killing it. A two-dimensional slice also samples only part of a three-dimensional structure. Lin and colleagues' colorectal-cancer study reconstructed interconnected lymphoid networks from apparently separate two-dimensional domains; only one cancer was reconstructed in three dimensions in that study.",
      "Elomaa and colleagues analysed 983 colorectal-cancer patients and an independent validation cohort of 246. Their score combined percentile-ranked CD3 and CD8 tumour-to-T-cell G-cross values at 20 micrometres in the tumour centre and invasive margin. It was not simply an area under a G-cross curve. High versus low score was associated with longer cancer-specific survival: adjusted hazard ratio 0.33, 95% confidence interval 0.20 to 0.52, and 0.15, 0.05 to 0.45, respectively. Its prognostic value was independent of their T-cell density score; these are cohort associations.",
      "Gide and colleagues examined pretreatment metastatic-melanoma specimens from 27 patients receiving anti-PD-1 alone and 34 receiving anti-PD-1 with ipilimumab. Responders had higher densities of CD8 T cells within 20 micrometres of melanoma cells in both groups. This was an association in treated cohorts, rather than a randomised comparison proving that the spatial measurement selects who benefits from adding treatment.",
      "Maley and colleagues assessed immune-cancer colocalisation on routine histology in discovery and validation sets of 486 and 516 breast-cancer samples from women; 475 and 514 had survival data. Colocalisation was associated with disease-specific survival and effects varied by subtype. Walker and colleagues' retrospective study of 1,467 participants defined proximity and consistency from the mean and variance of nearest-neighbour distances between cancer and CD8 T cells. These measures were associated with recurrence-free survival more strongly than lymphocyte counts in the reported analyses. Neither study demonstrates benefit from choosing immunotherapy using its measurement.",
      "In Keren's 41-patient triple-negative breast-cancer cohort, mixed and compartmentalised immune architecture was linked to survival. Their mixing threshold was chosen to reduce within-group and increase between-group variability; it is not a universally validated cutoff. A useful association in one dataset does not establish that a distance or mixing rule was locked and then prospectively validated for treatment selection.",
      "The six-institution MITRE study optimised a specified six-marker PD-1/PD-L1 fluorescence workflow and used a locked image-analysis algorithm. It counted neighbouring PD-1-positive and PD-L1-positive cells within 25 micrometres, rather than measuring receptor binding. Reported average intersite R-squared was 0.82 for the breast-cancer tissue microarray and 0.84 for the lung-cancer microarray. R-squared describes a linear-fit relationship in these measurement comparisons, not 82% accuracy in predicting patient benefit. Reproducibility of this defined workflow is separate from clinical prediction or utility.",
      "Stromal tumour-infiltrating lymphocyte scoring estimates the proportion of stromal area occupied by lymphocytes on a histology section. It is compartment-based assessment rather than a T-cell-to-cancer-cell distance. Page and colleagues' 2023 working-group report describes its standardisation and evaluation across datasets alongside the distinct colon-cancer Immunoscore. That evidence does not automatically validate a new proximity assay, and it does not rank every existing or future spatial method.",
      "In a fictional region containing 200 CD8 T cells, 60 within 20 micrometres of a cancer cell is 30% of the CD8 cells. Moving the box two millimetres into stroma can give 15 near cancer among 300 CD8 cells, or 5%, with the same tumour, stain and radius. The counts are invented to demonstrate region dependence. They do not establish a biological difference caused by treatment or a patient cutoff.",
      "Specify direction as well as radius. The share of CD8 T cells with a cancer-cell neighbour uses CD8 cells as its denominator; the share of cancer cells with a CD8 neighbour uses cancer cells instead. These can differ even on the same map. Similarly, thresholds of ten, 20 and 30 micrometres define different measurements; a result under one definition cannot be transferred to another without checking it.",
      "A measurement report identifies the section and whether it came from a biopsy or resection, the markers defining each cell type, and how segmentation and cell calls were checked. It states whether the analysis used an entire imaged area or selected regions, who selected them and the rule used. A single section, its chosen regions and multiple fields from one specimen are not interchangeable samples of the whole tumour.",
      "Report the cell-type pair, the reference population, the distance definition, the radius and any aggregation or normalisation. State whether a cutoff was fixed before looking at outcomes or chosen to fit this cohort, and whether the same definition was evaluated in an independent group. Analytical reproducibility, prognostic association, differential treatment benefit, prospective validation of a locked rule and regulatory approval are separate claims. The cited cohort studies do not establish an exhaustive statement about all approved spatial tests.",
      "If a fictional report says cells became 3.2 times closer after treatment, first establish which distance or score was compared. Check region-selection rules in both samples, comparable specimen types, the same fixed metric and radius, and variation between sections of the same block. The ratio alone does not establish a change in immune recognition, interaction or patient outcome."
    ],
    "related": [
      "single-cell-spatial",
      "spatial-transcriptomics",
      "multiplex-immunofluorescence",
      "imaging-mass-cytometry",
      "spatial-autocorrelation"
    ],
    "links": [
      {
        "label": "Spatial analyses of immune cell infiltration in cancer: current methods and future directions: A report of the International Immuno-Oncology Biomarker Working Group on Breast Cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37608771/"
      },
      {
        "label": "Prognostic significance of spatial and density analysis of T lymphocytes in colorectal cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35449453/"
      },
      {
        "label": "Close proximity of immune and tumor cells underlies response to anti-PD-1 based therapies in metastatic melanoma patients.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32002281/"
      },
      {
        "label": "An ecological measure of immune-cancer colocalization as a prognostic factor for breast cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26395345/"
      },
      {
        "label": "Prognostic significance of CD8+ T cell Spatial Biomarkers in ER+ and ER- breast cancer: A retrospective cohort study.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41091832/"
      },
      {
        "label": "A Structured Tumor-Immune Microenvironment in Triple Negative Breast Cancer Revealed by Multiplexed Ion Beam Imaging.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30193111/"
      },
      {
        "label": "Multi-institutional TSA-amplified Multiplexed Immunofluorescence Reproducibility Evaluation (MITRE) Study.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34266881/"
      },
      {
        "label": "Multiplexed 3D atlas of state transitions and immune interaction in colorectal cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36669472/"
      },
      {
        "label": "Coordinated Cellular Neighborhoods Orchestrate Antitumoral Immunity at the Colorectal Cancer Invasive Front.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32763154/"
      }
    ]
  }
];
