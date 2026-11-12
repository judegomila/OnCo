import type { TermInput } from "@/lib/schema";

// Source-backed breast anatomy and pathology teaching at canonical concept owners.
export const breastPathologyEducationTerms: TermInput[] = [
  {
    "id": "internal-mammary-nodes",
    "kind": "term",
    "asOf": "2026-11-10",
    "name": "Internal mammary nodes",
    "tldr": "Internal mammary nodes lie beside the breastbone and form a regional lymph-node chain for the breast on the same side.",
    "summary": "Locate the nodal chain before interpreting its result. Internal mammary nodes beside the sternum differ from intramammary nodes within the breast and axillary nodes in the armpit. The location, side, assessment method and treatment moment must accompany any nodal classification.",
    "category": "Breast pathology",
    "cancers": [
      "breast-cancer"
    ],
    "notes": [
      "Internal mammary, or parasternal, nodes lie beside the sternum along the internal thoracic vessels. Intramammary nodes lie within breast tissue and are grouped with axillary nodes for AJCC breast N classification. Similar spelling does not make these the same anatomical chain.",
      "Ipsilateral internal mammary involvement is regional nodal disease, not automatically M1 or stage IV. The exact N category depends on clinical versus pathological detection and accompanying axillary findings. Do not silently apply same-side rules to an opposite-side observation.",
      "An axillary sentinel sample does not automatically test the internal mammary chain. Record side, basin, imaging interpretation, tissue confirmation and treatment timing separately. Not sampled and sampled without cancer are different findings; an indeterminate image is not a proven metastasis.",
      "Suami and colleagues traced 24 breasts in 14 human cadavers and identified routes towards axillary and internal mammary lymphatics. This supports the anatomical routes, not a universal drainage map or probability of cancer spread in a living person. Anatomy alone does not select sampling or radiation.",
      "Axillary nodes lie in the armpit and are regional nodes; intramammary nodes lie within breast tissue and are classified with axillary nodes; internal mammary nodes lie beside the sternum and have their own regional N context. NCI notes that cancers near the breastbone may drain first to internal mammary nodes. This possible route is not a personal prediction.",
      "Dashed routes in an anatomical sketch indicate possible connections, not demonstrated involvement or obligatory spread. Axillary levels describe locations relative to pectoralis minor. Neither levels nor arrows establish a personal first node, and an axillary sample does not examine every chain."
    ],
    "links": [
      {
        "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
        "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
      },
      {
        "label": "NCI professional PDQ: AJCC eighth-edition breast staging tables",
        "url": "https://www.cancer.gov/types/breast/hp/breast-treatment-pdq"
      },
      {
        "label": "The lymphatic anatomy of the breast and its implications for sentinel lymph node biopsy: a human cadaver study.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18043970/"
      },
      {
        "label": "NCI sentinel-node biopsy",
        "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/staging/sentinel-node-biopsy-fact-sheet"
      }
    ],
    "aka": [
      "parasternal lymph nodes",
      "internal mammary lymph nodes"
    ],
    "related": [
      "lymphatic-drainage-and-axilla",
      "lymph-node-status",
      "sentinel-lymph-node-biopsy",
      "tnm-staging"
    ],
    "sections": [
      "diagnostics"
    ]
  },
  {
    "id": "lymphatic-drainage-and-axilla",
    "kind": "term",
    "asOf": "2026-11-10",
    "name": "Breast lymphatic drainage and the axilla",
    "tldr": "Breast lymphatics carry fluid to regional nodes through variable routes, including the axilla and internal mammary chain.",
    "summary": "A drainage territory and a sampled node are different things. Anatomical location helps interpret the evidence, but imaging and tissue examination have different roles and limitations. A nodal result applies to the assessed region and method.",
    "category": "Breast pathology",
    "cancers": [
      "breast-cancer"
    ],
    "notes": [
      "Lymphatic vessels carry tissue fluid, material and cells to draining nodes. Nodes also participate in immune responses, and enlargement alone does not establish cancer. Drainage pathways vary; they are not a compulsory sequence of cancer spread, and lymphatic spread is not the only route of dissemination.",
      "Axillary levels are locations relative to pectoralis minor: level I is lateral to its lateral border, level II between its borders, and level III medial to its medial border and below the clavicle. Levels are neither overall stages nor proof of involvement.",
      "Keep axillary, intramammary and internal mammary locations distinct. Intramammary nodes are grouped with axillary nodes for breast N staging; ipsilateral internal mammary nodes belong to a separate regional chain. Regional N involvement, including extranodal extension, does not alone establish distant M disease.",
      "Tracer mapping identifies particular draining nodes under the procedure's conditions; an anatomical sketch cannot substitute for mapping. Preserve the sampled region, side, procedure, treatment timing and pathological result. Negative examined axillary nodes do not resolve an indeterminate internal mammary image or survey all regional nodes.",
      "The axilla is the armpit. Superficial and deeper lymphatic routes vary; a map omits many vessels and node groups. It assigns neither a personal first draining node nor a stage. Disease, prior surgery and treatment can affect procedural mapping, so drawn routes cannot replace the actual mapping and pathological record."
    ],
    "links": [
      {
        "label": "The lymphatic anatomy of the breast and its implications for sentinel lymph node biopsy: a human cadaver study.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18043970/"
      },
      {
        "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
        "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
      },
      {
        "label": "NCI sentinel-node biopsy",
        "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/staging/sentinel-node-biopsy-fact-sheet"
      }
    ],
    "aka": [
      "axillary lymphatic drainage",
      "breast lymphatic drainage"
    ],
    "related": [
      "internal-mammary-nodes",
      "lymph-node-status",
      "sentinel-lymph-node-biopsy"
    ],
    "sections": [
      "diagnostics"
    ]
  },
  {
    "id": "myoepithelial-cells-and-basement-membrane",
    "kind": "term",
    "asOf": "2026-11-10",
    "name": "Myoepithelial cells and the breast basement membrane",
    "tldr": "Myoepithelial cells are living cells around normal breast ducts and acini; basement membrane is separate extracellular material outside them.",
    "summary": "These layers help organise normal breast structures and support pathological assessment of invasion. Their location, morphology, staining controls and diagnostic context matter more than a single positive or negative marker.",
    "category": "Breast pathology",
    "cancers": [
      "breast-cancer"
    ],
    "notes": [
      "Typical normal breast ducts and acini have luminal epithelial cells facing the lumen, an outer living myoepithelial layer, extracellular basement membrane and then stroma. Myoepithelial cells have contractile features that help move milk; they are not the chest muscle. Basement membrane contains matrix proteins such as laminins and type IV collagen, not living cells.",
      "Basement membrane beneath an epithelial structure differs from plasma membrane around one cell. Cell polarity describes different inward and outward organisation. Gudjonsson and colleagues' human-cell culture experiments showed that normal myoepithelial cells or laminin-1 could restore luminal orientation in collagen gels; this is model evidence about organisation, not a demonstrated cancer treatment.",
      "Myoepithelial immunohistochemistry is supporting evidence interpreted with morphology. p63 is nuclear; calponin and smooth muscle myosin heavy chain are cytoplasmic markers. Ask which cells stain, where they stain and whether technical controls work. A failed positive control undermines an apparently absent rim.",
      "Werling and colleagues found gaps around some noninvasive structures, stromal staining with muscle-associated markers and p63 staining in some carcinoma cells. Gusterson and colleagues found basement-membrane proteins in some invasive carcinomas. Neither marker absence nor protein presence alone proves the tissue boundary. Basal-like RNA features also do not establish myoepithelial ancestry.",
      "In Gusterson and colleagues' 1982 tissue study, laminin and type IV collagen were detected in normal breast, benign lesions and grade I invasive carcinomas but were absent from grade II and III infiltrating carcinomas in that study. That historical cohort does not make protein presence proof of an intact noninvasive boundary, or protein absence a universal grade rule.",
      "Werling and colleagues examined 85 breast lesions. In that series, at least focal p63 staining in tumour cells occurred in 11% of cases, while stromal myofibroblasts stained with smooth muscle myosin heavy chain in 8% and calponin in 76%. Some noninvasive structures had gaps. These assay- and cohort-specific observations explain why localisation and controls matter; they are not universal diagnostic accuracy estimates.",
      "CAP's morphology-based histological classification and supporting-marker assessment answer a tissue question. A schematic rim is neither an immunostain result nor a diagnosis; illustrated gaps or colours cannot establish invasion. Interpret the actual tissue architecture and appropriately controlled stains together."
    ],
    "links": [
      {
        "label": "Normal and tumor-derived myoepithelial cells differ in their ability to interact with luminal breast epithelial cells for polarity and basement membrane deposition.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11801722/"
      },
      {
        "label": "Immunohistochemical distinction of invasive from noninvasive breast lesions: a comparative study of p63 versus calponin and smooth muscle myosin heavy chain.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12502930/"
      },
      {
        "label": "Distribution of myoepithelial cells and basement membrane proteins in the normal breast and in benign and malignant breast diseases.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6290045/"
      },
      {
        "label": "A spatially resolved single-cell genomic atlas of the adult human breast.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37380767/"
      },
      {
        "label": "CAP invasive breast protocol: histological type and supporting assessment",
        "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
      }
    ],
    "aka": [
      "myoepithelium",
      "myoepithelial layer"
    ],
    "related": [
      "terminal-duct-lobular-unit",
      "dcis",
      "invasive-breast-carcinoma-no-special-type"
    ],
    "sections": [
      "diagnostics"
    ]
  },
  {
    "id": "treatment-effect-in-pathology",
    "kind": "term",
    "asOf": "2026-11-10",
    "name": "Treatment effect in breast pathology",
    "tldr": "Treatment effect describes tissue changes after therapy, assessed separately from whether viable cancer remains in the examined breast and nodes.",
    "summary": "Response-related changes and residual carcinoma answer different questions. Interpretation needs treatment history, mapped sampling and separate breast and nodal findings. Fibrosis is not automatically residual tumour size or proof of complete response.",
    "category": "Breast pathology",
    "cancers": [
      "breast-cancer"
    ],
    "notes": [
      "After preoperative therapy, fibrosis, necrosis, inflammation and histiocytic aggregates can be response-related tissue changes. Residual viable carcinoma is a separate morphological assessment, not a culture test of every cell. Response changes and residual cancer can coexist; scarring alone does not establish that no cancer remains. Fibrosis means collagen-rich scarring, necrosis means dead tissue and histiocytes are tissue macrophages.",
      "CAP 4.11 describes the RCB breast span as the two-dimensional extent of residual invasive carcinoma, excluding DCIS from the span. The MD Anderson microscopy protocol instead starts with the gross tumour bed, revises its boundaries microscopically and estimates invasive plus in situ cancer area in that bed, using the largest bed for multicentric disease. State the protocol and denominator rather than merging these wordings. The largest contiguous residual invasive focus without adjacent treatment fibrosis supplies ypT; the gross scar, that focus and an RCB bed are different measurements. For ypN, adjacent treatment fibrosis is likewise excluded from the contiguous staging dimension; RCB nodal measurement has its own rule.",
      "Assessment connects pretreatment location, imaging or marker information, gross mapping, a sampling plan and microscopy. Sparse, scattered residual foci make arbitrary-section interpretation unreliable. A broad scar can contain residual invasive cancer without the whole scar being solid cancer.",
      "Breast and node response are reported separately. Nodal scarring or histiocytic aggregates without residual cancer can be consistent with prior treated involvement, but do not independently establish biopsy-proven baseline metastasis. Prior biopsy or other injury can also produce repair changes; a scar alone cannot establish a drug-specific effect.",
      "RCB is not validated for neoadjuvant endocrine treatment; CAP advises against reporting a score/class in that setting even when individual residual measurements are recorded. Combined pCR requires its stated breast-and-node definition and appropriate specimens, may permit DCIS and does not establish whole-body eradication. Preserve the pretreatment record alongside residual findings."
    ],
    "links": [
      {
        "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
        "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
      },
      {
        "label": "Standardization of pathologic evaluation and reporting of postneoadjuvant specimens in clinical trials of breast cancer: recommendations from an international working group.",
        "url": "https://doi.org/10.1038/modpathol.2015.74"
      }
    ],
    "aka": [
      "histological treatment effect",
      "post-treatment tissue changes"
    ],
    "related": [
      "pcr",
      "rcb",
      "tumor-bed-cellularity",
      "tnm-staging"
    ],
    "sections": [
      "diagnostics"
    ]
  },
  {
    "id": "tumor-bed-cellularity",
    "kind": "term",
    "asOf": "2026-11-11",
    "name": "Tumour-bed cellularity",
    "tldr": "Tumour-bed cellularity estimates cancer-occupied area within a defined treated breast bed. The in situ share uses a different denominator.",
    "summary": "Label the region, numerator and denominator before interpreting cellularity. Overall cancer area and the in situ share of that cancer are separate RCB inputs, neither interchangeable with sequencing purity or a score by itself.",
    "category": "Breast pathology",
    "cancers": [
      "breast-cancer"
    ],
    "notes": ["For RCB, overall cancer cellularity estimates the area occupied by invasive plus in situ cancer within a defined residual breast bed. The in situ percentage instead uses the cancer component as denominator. Microscopic review can revise bed boundaries and should represent sparse as well as dense regions; selecting only a dense focus changes the measurement.","Invasive bed fraction equals overall cancer fraction multiplied by one minus the in situ fraction of cancer. In a fictional 100-unit bed with 20 units of cancer, 25% in situ means 5 bed units in situ and 15 invasive. The invasive share is 75% of cancer but only 15% of the whole bed. These idealised area units teach denominators, not counting instructions or the precision of a clinical estimate.","Area occupied by cancer, the proportion of counted cells that are malignant and the fraction of sequenced DNA contributed by cancer have different denominators. A selected assay block may also differ from the whole residual bed. Do not enter an area-cellularity estimate as sequencing purity or describe 25% of cancer as 25% of the bed.","Retain the named bed, specimen, treatment setting, mapping and representative sections, overall area percentage and in situ share separately. Incomplete sampling, a misdefined bed and heterogeneous distribution can bias the estimate; staining or sampling consumes finite tissue. There is no universal low/high cellularity cutoff that alone selects treatment.","Cellularity alone supplies neither nodal burden, final margins, distant status, pCR nor an RCB score. CAP's residual-invasive RCB span excludes DCIS, while the MD Anderson protocol estimates invasive plus in situ area in a microscopically revised cancer bed. Neither is interchangeable with the largest contiguous ypT focus. CAP advises against RCB score/class after neoadjuvant endocrine therapy, although individual residual measurements may still be useful.","The MD Anderson protocol estimates overall cellularity and in situ percentage to the nearest 10%, with additional 1% and 5% choices for low values. The 25% in situ example above is fictional denominator arithmetic outside those listed estimation increments. Its arithmetic remains 20 × 0.25 = 5 in situ and 20 - 5 = 15 invasive bed units. A separate protocol-aligned 20% in situ illustration would give 4 in situ and 16 invasive units. Neither should be confused with the RCB example using 50% in situ.","Two fictional treated breast beds can have the same dimensions while one contains sparse residual carcinoma and the other dense residual carcinoma. The footprint alone cannot distinguish their viable cancer area. Read overall cancer area and the in situ share of that cancer with their different denominators, then keep regional nodes and final margins separate. A DCIS-permitting breast-and-node pCR definition can be met when DCIS remains at an involved final edge but no residual invasive breast or nodal cancer is found. Add an involved regional node and that combined endpoint is no longer met, even with a negative blood assay; this does not by itself establish distant spread."],
    "links": [
      {
        "label": "MD Anderson detailed RCB pathology methods",
        "url": "https://www.mdanderson.org/content/dam/mdanderson/documents/for-physicians/clinical-calculators/PLM_protocol_RCB_calculators_BRO.pdf"
      },
      {
        "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
        "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
      },
      {
        "label": "Measurement of residual breast cancer burden to predict survival after neoadjuvant chemotherapy.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17785706/"
      }
    ],
    "aka": [
      "tumour bed cellularity",
      "residual tumour bed cellularity"
    ],
    "related": [
      "rcb",
      "treatment-effect-in-pathology",
      "pcr"
    ],
    "sections": [
      "diagnostics"
    ]
  }
];
