import type { TermInput } from "@/lib/schema";

/** Tissue and pathology concepts. Study results retain their specimen and method scope. */
export const educationTissuePathology: TermInput[] = [
  {
    "kind": "term",
    "id": "biopsy-after-neoadjuvant-therapy",
    "name": "Tumour-bed biopsy after neoadjuvant therapy",
    "category": "Procedures",
    "tldr": "Sampling the former tumour site after treatment can miss scattered residual cancer, so a negative biopsy needs its study population and sampling method.",
    "summary": "Image-guided biopsy after preoperative systemic treatment tests selected parts of the former breast tumour bed. Diagnostic accuracy studies compare it with subsequent surgery; an omission study instead follows selected people without breast surgery. These designs answer different questions.",
    "asOf": "2026-11-10",
    "notes": [
      "In RESPONDER, 398 women with stage I to III breast cancer of all biological subtypes and an imaging response were analysed. Vacuum-assisted biopsy missed residual cancer in 37 of the 208 women whose surgery found it: a false-negative rate of 17.8% (95% confidence interval 12.8% to 23.7%). Of the 37 misses, 20 had minimal residual tumour smaller than 5 mm. Exploratory analyses reported no false negatives with the largest-volume 7-gauge needle and a 6.2% false-negative rate (95% confidence interval 3.4% to 10.5%) when imaging and biopsy were combined. These refinements do not establish general omission safety.",
      "The 2025 single-arm omission study enrolled 50 women aged at least 40 with HER2-positive or triple-negative cT1-2N0-1M0 disease and an imaging residual lesion smaller than 2 cm. After at least twelve 9-gauge vacuum cores, 31 had no residual breast cancer on biopsy and received radiotherapy without breast surgery. No ipsilateral breast recurrences occurred at median follow-up 55.4 months. Patients initially node-positive still underwent targeted axillary dissection. This small uncontrolled study calls for confirmation.",
      "Fictional accuracy exercise: surgery finds residual cancer in 40 of 100 people. Biopsy misses 8 of those 40, while all 60 without residual cancer test negative. False-negative rate is 8/40 = 20%; negative predictive value is 60/68, about 88%. The denominators differ. A breast sample does not establish axillary status or mapped surgical margins. False-negative rate uses all residual cancers as its denominator; negative predictive value uses negative biopsies and varies with prevalence and selection.",
      "A diagnostic clip and image guidance locate the former breast tumour bed, and cores sample selected positions. Pathology looks for residual invasive and in-situ disease; diagnostic accuracy studies then use surgery as the reference. Scattered residual cells can fall between samples. Imaging response alone does not prove pathological complete response.",
      "Tasoulis analysed 166 women from three centres using surgery as the reference; 143 underwent vacuum-assisted sampling and 23 core-cut biopsy. In 159 representative biopsies, false-negative rate was 18.7% (95% confidence interval 10.6% to 29.3%). Among 76 with complete or partial clinical response, imaging abnormality no larger than 2 cm and at least six vacuum samples, it was 3.2% (0.1% to 16.7%) and negative predictive value 97.4% (86.5% to 99.9%). The TNBC subgroup had pCR in 39 of 59. These selected estimates do not establish omission safety.",
      "NRG-BR005 was a prospective nonrandomised phase 2 study of marker-directed stereotactic multiple-core biopsy after chemotherapy. It included clinical complete responders with complete or near-complete trimodality imaging response. Of 101 evaluable patients, surgery found residual invasive or in-situ disease in 36. Sensitivity was 50% (95% confidence interval 32.9% to 67.1%) and negative predictive value 78.3% (67.9% to 86.6%). The authors did not support omitting surgery using these criteria. A retrospective central review found that only 62 of 101 met the imaging eligibility criteria; this exploratory post hoc analysis does not replace the main result.",
      "For these biopsy studies, breast pCR definitions can require no invasive or in-situ disease, while other breast pCR endpoints allow residual in-situ disease and include nodal status. Name the protocol definition. The 2022 omission report and its 2025 update follow the same selected cohort: no ipsilateral breast recurrences among 31 without breast surgery at median follow-up 26.4 and 55.4 months respectively. They are not independent replications.",
      "A small single-arm cohort with zero recurrences leaves uncertainty without a randomised comparison. Sampling does not provide the oriented margins or complete residual-burden assessment of resection, and breast biopsy does not assess every axillary node. Missing residual disease can also miss information used for further treatment decisions. These studies support continued investigation rather than a general rule to omit surgery."
    ],
    "links": [
      {
        "label": "Heil et al., RESPONDER, 2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32657944/"
      },
      {
        "label": "Kuerer et al., preplanned omission outcomes, 2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40152443/"
      },
      {
        "label": "Tasoulis et al., pooled diagnostic data, 2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33026457/"
      },
      {
        "label": "Basik et al., NRG-BR005, 2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40332918/"
      },
      {
        "label": "Kuerer et al., original omission outcomes, 2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36306810/"
      }
    ],
    "related": [
      "core-needle-biopsy",
      "vacuum-assisted-breast-biopsy",
      "pcr",
      "surgical-resection-specimen"
    ]
  },
  {
    "kind": "term",
    "id": "tumor-stroma-ratio",
    "name": "Tumour-stroma ratio",
    "category": "Pathology",
    "tldr": "The tumour-stroma ratio describes the amount of supporting tissue in a defined tumour region; its method and cutoff must stay with the result.",
    "summary": "Tumour-stroma assessment on routine histology describes tissue composition. It differs from stromal TIL assessment, which describes the inflammatory infiltrate within eligible stroma. Prognostic associations do not by themselves establish which treatment should be chosen.",
    "asOf": "2026-11-10",
    "notes": [
      "UNITED prospectively assessed the ratio in stage II or III colon cancer: 1,388 eligible patients from 27 centres. Stroma-high meant more than 50% stroma, while 50% or below was stroma-low. Three-year disease-free survival was 70% versus 83%; adjusted hazard ratio 1.49 (95% confidence interval 1.17 to 1.90). Overall survival did not differ significantly. These findings describe that colon-cancer cohort.",
      "The 124-person retrospective triple-negative breast cancer study used a different boundary: at least 50% was stroma-high and less than 50% was stroma-low. It reported observer agreement kappa 0.74. Kappa summarises agreement after allowing for chance; this value belongs to those investigators and cases. Do not transfer the boundary from one protocol to another without checking it. Neither study establishes an individual treatment benefit from choosing a drug according to this score.",
      "The cited colon visual TSR protocol selects a stroma-rich eligible invasive-tumour region at low power, then estimates stroma in a field at a 10-times objective with tumour visible at all four edges, in 10 percentage-point steps. UNITED used more than 50% as stroma-high. This selected-field measurement is not an average of the entire slide, a tumour-cell proportion or a residual tumour-bed cellularity score.",
      "Fictional untreated tumour fields contain 30%, 40% and 70% stroma. Under the stroma-rich-field rule, the score is 70%, stroma-high, provided the field is eligible. The average is about 47% and answers a different question. Supporting tissue can contain many or few lymphocytes; stroma-high does not establish immune exclusion.",
      "In the 124-person retrospective TNBC cohort, five-year relapse-free rates were 85% for stroma-low and 45% for stroma-high; adjusted relapse hazard ratio 2.39 (95% confidence interval 1.07 to 5.29). In the 574-person early breast cancer series, the TNBC subgroup had five-year relapse-free rates of 81% for stroma-poor and 56% for stroma-rich tumours. A separate node-negative premenopausal cohort validated the prognostic direction. These are cohort associations, not personal forecasts.",
      "The 2026 automated analysis used 853 stage II or III colon cancers from UNITED without neoadjuvant therapy. It segmented 11 tissue classes and calculated stroma/(stroma + epithelial tumour), using a 1-mm region and a derived 77% cutoff. This is a different method from a visually chosen 10-times field with a 50% cutoff; its threshold cannot be imported into the visual method.",
      "The breast review identified a need for prospective validation. UNITED provides prospective prognostic evidence in colon cancer, while the cited breast studies are retrospective. The cited analyses do not establish a randomised treatment-by-score interaction that chooses a drug. Untreated cohorts do not validate transfer to post-neoadjuvant fibrosis. The cited studies alone do not establish current guideline adoption.",
      "For the cited visual TSR protocol, record the H&E specimen and whether treatment preceded collection, select the eligible most stroma-rich field at a 10-times objective with tumour on all four sides, and estimate the stromal percentage in 10 percentage-point steps. State the observer method and protocol-specific high/low boundary. Software requires its own definition and cutoff. Field choice, necrosis, mucin and post-treatment fibrosis can change interpretation; this selected-field score is not interchangeable with a whole-slide average."
    ],
    "links": [
      {
        "label": "van Pelt et al., colon TSR scoring procedure, 2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30030621/"
      },
      {
        "label": "Polack et al., UNITED, 2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38613913/"
      },
      {
        "label": "Moorman et al., TNBC cohort, 2012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22264965/"
      },
      {
        "label": "de Kruijf et al., breast TSR cohort, 2011",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20361254/"
      },
      {
        "label": "Dekker et al., node-negative validation, 2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23709090/"
      },
      {
        "label": "Kramer et al., breast evidence review, 2019 print",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30302588/"
      },
      {
        "label": "Heilijgers et al., automated UNITED analysis, 2026",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41468683/"
      }
    ],
    "related": [
      "tils",
      "h-and-e-staining",
      "tumour-purity",
      "tumor-bed-cellularity"
    ]
  },
  {
    "kind": "term",
    "id": "surgical-resection-specimen",
    "name": "Surgical resection specimen",
    "category": "Pathology",
    "tldr": "Removed tissue becomes interpretable through documented orientation and sampling that link microscopic and molecular findings to their locations.",
    "summary": "A resection specimen is removed tissue submitted for examination. The laboratory documents gross features, marks relevant surfaces and maps selected regions into labelled blocks. Microscopy and additional assays describe the represented material, rather than every cell remaining in the body.",
    "asOf": "2026-11-10",
    "notes": [
      "Keep the specimen site, procedure, prior treatment, orientation key, surface inks, cassette map and tested block with the result. Ink colours have a local documented meaning. Gross specimen dimensions are not automatically invasive tumour dimensions. Fragmentation or ink entering cracks can complicate surface interpretation.",
      "Fictional example: block A is central lesion and block B is a superior surface. A sequencing result from block A cannot be assigned to block B merely because both came from one operation. An additional test needs its own block identity and preservation history.",
      "Resection supports assessment of represented tumour extent, surfaces, sampled nodes and treatment effect. A large specimen is not automatically examined cell by cell in its entirety. Collection time and preceding treatment define the biological time point, so a post-treatment resection cannot substitute for a pretreatment biopsy.",
      "Diagnostic orientation and mapped sampling must remain intact when additional material is allocated. A research aliquot needs its site, block, preservation, treatment context and permissions. Slide counts alone do not establish the completeness of representation; a clear examined margin does not settle every clinical question.",
      "Resection examination follows receipt and orientation, gross description, block mapping, microscopic examination and integration of findings. Record the named specimen and separately submitted parts; sectioning and extraction consume finite material. Depending on the cancer, specimen and treatment setting, outputs include diagnoses, dimensions and distances in millimetres, described margins and sampled-node counts. Lost orientation, fragmentation, ink penetration, incomplete mapping and unsuitable preservation can limit interpretation. Applicable diagnostic protocols and clinical correlation govern the report, while a research aliquot needs its own provenance. No specimen report examines every tissue left in the body or every unsampled node, or supplies an individual recurrence probability."
    ],
    "links": [
      {
        "label": "CAP practical breast grossing guide excerpt",
        "url": "https://documents-cloud.cap.org/pdf/Grossing_Sample.pdf"
      }
    ],
    "related": [
      "core-needle-biopsy",
      "h-and-e-staining",
      "tumour-purity",
      "biopsy"
    ]
  },
  {
    "kind": "term",
    "id": "blood-as-a-renewable-sample",
    "name": "Serial blood sampling",
    "category": "Diagnostics & imaging",
    "tldr": "Blood can often be collected again, but every draw is a new finite specimen whose fraction, handling and collection time determine its meaning.",
    "summary": "Serial blood sampling can follow circulating analytes or cell populations over time. Plasma, serum and blood-cell fractions are different inputs. Circulating material does not preserve the local tissue architecture and cell relationships available from a tissue sample.",
    "asOf": "2026-11-10",
    "notes": [
      "Cell-free DNA includes DNA from non-malignant sources. A plasma variant can originate in a blood-cell clone; matched white-cell DNA and tumour tissue can help assess origin, without eliminating sampling uncertainty. A negative plasma result can reflect low shedding or limited assay sensitivity rather than absence of cancer.",
      "Retain collection time, treatment context, tube, processing delay, fraction, storage, input quantity, assay and detection limit. Repeat collections have practical burdens and provide later biological time points. Comparisons require compatible methods and the same named question.",
      "Plasma is separated from anticoagulated blood, while serum is obtained after clotting. White-cell DNA can supply a comparator; mononuclear-cell fractions support selected immune measurements; plasma proteins can come from multiple tissues. Cell-free DNA includes a tumour-derived subset, circulating tumour DNA. These fractions are not automatically interchangeable. The intended method may require whole blood or a specified separated fraction; those inputs are not automatically interchangeable.",
      "Fictional example: a variant is found in plasma and matched white-cell DNA but not in available tumour tissue. A blood-cell clone is a possible source, alongside assay and sampling uncertainty. One tissue sample may miss a clone. Neither the plasma label nor the negative tissue result alone proves origin.",
      "Like serial weather readings, repeated draws can follow change only when the same question and compatible methods are used. Blood immune cells are not the same population as cells inside a tumour. Low shedding, finite molecules, handling or assay sensitivity can explain a negative plasma result without proving cancer absent; repeatability does not remove collection burdens or consent requirements.",
      "A blood assay starts with a named analyte or cell population, an appropriate collected fraction, processing and a defined measurement. Each draw and derived aliquot has finite volume; repeat draws have practical and health burdens. Outputs may be concentrations, molecule or variant estimates, or cell counts and frequencies. Input adequacy, detection limits and intended-use cutoffs belong to the assay. Wrong tubes, processing delays, cell breakdown, low input and mistaken source assignment can limit results. Monitoring, diagnostic and research uses need their own validation; a circulating result does not map tumour-wide cell composition or tissue localisation, and a negative result does not establish absence of all cancer."
    ],
    "links": [
      {
        "label": "Razavi et al., matched plasma, white-cell and tumour sequencing, 2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31768066/"
      },
      {
        "label": "NCI cell-free DNA collection and processing practices",
        "url": "https://www.protocols.io/view/nci-biospecimen-evidence-based-practices-bebp-cell-dc8k2zuw.pdf"
      }
    ],
    "related": [
      "cfdna",
      "ctdna",
      "clonal-haematopoiesis",
      "ctdna-imaging-discordance"
    ]
  }
];
