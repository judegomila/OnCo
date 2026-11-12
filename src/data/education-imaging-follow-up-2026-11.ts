import type { TechnologyInput } from "@/lib/schema";

export const educationImagingFollowUp202611: TechnologyInput[] = [
  {
    "id": "granzyme-b-pet",
    "kind": "technology",
    "name": "Granzyme B PET",
    "aka": [
      "Granzyme-B PET",
      "Granzyme B molecular imaging"
    ],
    "sections": [
      "imaging"
    ],
    "status": "emerging",
    "asOf": "2026-11-12",
    "tldr": "Granzyme B imaging uses a radioactive tracer to study an enzyme released by cytotoxic immune cells. Early studies show feasibility and response associations; they do not validate choosing or stopping treatment from a scan.",
    "summary": "Granzyme B is an enzyme released by cytotoxic T cells and natural killer cells. Experimental PET tracers use labelled peptides or peptidomimetics to target granzyme-associated activity. This is distinct from CD8 antibody-derived binder imaging and does not by itself establish recognition of a particular tumour antigen, identify which cell released the enzyme or prove a durable response.\n\nLarimer's 2017 proof of concept used mouse models and examined human biopsy specimens; it was not a human PET trial. A 2026 review describes 68Ga and 18F tracer approaches and early human feasibility while noting standardisation and validation needs. In Shen's 2024 phase 1/2 study, 68Ga-grazytracer imaging in 24 patients with mixed solid tumours or lymphomas explored distribution, safety and response associations after immune treatment. It did not randomise a scan-guided treatment strategy.",
    "principle": "A positron-emitting label on a peptide or peptidomimetic enables imaging of its granzyme-associated distribution; tracer chemistry, timing, access and background affect interpretation.",
    "related": [
      "immuno-pet",
      "pet"
    ],
    "links": [
      {
        "label": "Larimer et al., 2017: granzyme B PET proof of concept",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28461564/"
      },
      {
        "label": "Shen et al., 2024: phase 1/2 68Ga-grazytracer trial",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39389969/"
      },
      {
        "label": "Filippi et al., 2026: granzyme B imaging review",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42223848/"
      }
    ],
    "notes": [
      "In Larimer's mouse experiments, granzyme-associated imaging separated treatment-response groups before tumour-size change. The human component examined tissue from nine biopsies; it did not establish human scan performance. CD8 presence alone does not establish tumour-antigen-specific recognition or killing. Granzyme release is a different observation and also cannot identify the contributing cell population or guarantee lasting benefit.",
      "Shen's 24-person study combined several cancers and immune-treatment approaches, including checkpoint therapy alone, checkpoint therapy with chemotherapy and CAR-T therapy. No baseline granzyme PET was obtained, so a post-treatment value is not a measured within-person rise from baseline. Some patients with low uptake nevertheless had good outcomes, subgroup numbers were small, and optimal imaging time remained unsettled. Associations, feasible imaging and preliminary safety do not supply a validated treatment-selection threshold or prove that acting on the image helps."
    ]
  }
];
