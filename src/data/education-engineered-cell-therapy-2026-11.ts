import type { TargetInput } from "@/lib/schema";

// Gene identity, cleavage-product recognition and clinical evidence are separate claims.
export const educationEngineeredCellTherapy202611Targets: TargetInput[] = [
  {
    "kind": "target",
    "id": "muc1",
    "name": "MUC1 (mucin-1)",
    "symbol": "MUC1",
    "aka": [
      "Mucin-1",
      "Mucin 1",
      "CD227"
    ],
    "hgnc": "HGNC:7508",
    "ensembl": "ENSG00000185499",
    "uniprot": "P15941",
    "entrez": "4582",
    "targetClass": "surface-antigen",
    "role": [
      "antigen"
    ],
    "asOf": "2026-11-12",
    "tldr": "MUC1 is a protein found on cells that line organs. Different fragments expose different binding sites, so a positive test does not tell us what a treatment will recognise.",
    "summary": "MUC1 encodes a cell-surface-associated mucin with an extracellular repeat region and a membrane-associated portion containing a signalling tail. Whole-protein expression, a particular cleavage product and the epitope recognised by a binder are different measurements.\n\nMahanta and colleagues used MUC1* for membrane-anchored cleavage products while noting uncertainty about the precise cleavage sites. Their antibody recognised a membrane-proximal extracellular region rather than the long tandem repeats. The study also found MUC1* staining on the luminal surface of noncancerous fallopian-tube epithelium. Neither generic MUC1 RNA nor a different antibody stain proves that the proposed receptor recognises the intended fragment or spares healthy tissue.",
    "notes": [
      "Specify the actual extracellular epitope, cleavage or glycosylation context, binder and tissue. In the 2008 study, antibodies against the tandem repeats and the membrane-associated cleavage product gave different staining patterns. That mechanistic and tissue work was not a CAR-T clinical trial or evidence that every MUC1-directed design is tumour-exclusive."
    ],
    "related": [
      "on-target-off-tumour-toxicity",
      "car-t",
      "tumor-associated-antigen"
    ],
    "links": [
      {
        "label": "HGNC:7508, MUC1",
        "url": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:7508"
      },
      {
        "label": "UniProt P15941, reviewed human mucin-1",
        "url": "https://www.uniprot.org/uniprotkb/P15941/entry"
      },
      {
        "label": "Mahanta et al., 2008: MUC1 cleavage-product study",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18446242/"
      }
    ],
    "biology": "The extracellular alpha subunit can support adhesion or oppose it, while the beta-subunit cytoplasmic region participates in signalling. Tissue location, cleavage and epitope exposure affect what an antibody or engineered receptor can recognise."
  }
];
