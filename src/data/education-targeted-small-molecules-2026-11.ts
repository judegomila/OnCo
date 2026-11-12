import type { TermInput } from "@/lib/schema";

// A kinase family, a measured intervention and a clinical outcome are different claims.
export const educationTargetedSmallMolecules202611Terms: TermInput[] = [
  {
    "kind": "term",
    "id": "cdk-inhibitors",
    "name": "Cyclin-dependent kinase inhibitors",
    "aka": [
      "CDK inhibitors",
      "CDK inhibition",
      "Cyclin dependent kinase inhibitors"
    ],
    "category": "Treatment jargon",
    "tldr": "These drugs block selected enzymes that control cell division or gene reading. The enzyme, exposure and measured outcome matter; slower growth can mean a pause rather than cell death.",
    "summary": "Cyclin-dependent kinase inhibitors affect selected enzymes involved in cell-cycle progression, transcription or both. The kinase, regulatory partners, compound profile and exposure determine which functions are being tested.\n\nA change in substrate phosphorylation, an RNA signal, reversible growth arrest, cell death, marrow protection and a clinical cancer outcome require different measurements. Clinical evidence remains specific to the product, disease, regimen and endpoint.",
    "asOf": "2026-11-12",
    "notes": [
      "Cyclin-dependent kinases are enzymes that transfer phosphate groups to proteins. Cyclins are regulatory protein partners; different kinase-partner combinations help control cell division or transcription, the reading of DNA into RNA. The family resembles a workshop with several jobs rather than one engine. Naming a drug a CDK inhibitor does not identify the job it changes, and the same kinase can participate in connected processes.",
      "CDK4 and CDK6 help phosphorylate retinoblastoma protein, or RB, near the G1-to-S transition toward DNA copying. Their usual arrest mechanism depends on a functional RB restraint on cell-cycle transcription; detecting RB protein alone does not establish an intact circuit, and loss of RB1 can remove that route. CDK2 works with cyclins E and A in progression around DNA replication. These are selected overlapping roles, not exclusive assignments for every cell state. Cyclin E abundance by itself does not select a particular CDK2 inhibitor.",
      "CDK7 contributes to transcription initiation and also activates other CDKs. Larochelle and colleagues showed connected CDK7 and CDK9 functions in human cells: CDK7 helped establish and release promoter-proximal pausing, including activation of CDK9, while CDK9 supported productive RNA elongation. These jobs cannot be sealed into separate boxes. If a test reports a fall in a short-lived transcript after a transcription-directed intervention, that is an RNA-output observation to verify, not proof of the cell-cycle arrest associated with CDK4/6 inhibition. The exact transcript and its response need to be measured.",
      "Selectivity depends on the compound and achieved exposure; one drug can inhibit several CDKs. Horiuchi and colleagues tested purvalanol A and dinaciclib in breast-cancer models with elevated MYC, and used individual kinase knockdown to investigate attribution. Their paper describes dinaciclib activity against CDK1, CDK2, CDK5 and CDK9 and reports cell-death effects after CDK1 depletion in the tested triple-negative lines. This preclinical result is not a rule for choosing a modern CDK4/6 or CDK2 drug from MYC expression. Engagement, cell-cycle change and cell death remain different observations.",
      "NATALEE tested ribociclib with a nonsteroidal aromatase inhibitor against that endocrine treatment alone in hormone-receptor-positive, HER2-negative stage II or III early breast cancer. The 2024 report found improved invasive disease-free survival at its prespecified interim analysis. It studied a specified endocrine regimen and disease population, not triple-negative breast cancer or all drugs called CDK inhibitors.",
      "Trilaciclib uses a different purpose and schedule: short exposure before chemotherapy can transiently arrest susceptible blood-forming stem and progenitor cells to reduce myelosuppression. TRACES studied Chinese patients with extensive-stage small-cell lung cancer, including an open safety part and a randomised placebo-controlled part. Duration of severe neutropenia in cycle one was the primary myeloprotection endpoint in the randomised part. Blood counts and days of severe neutropenia measure marrow effects. They are not tumour shrinkage, and this endpoint does not establish a survival benefit in another cancer.",
      "For a CDK experiment, name the phosphorylated substrate, the cell-cycle or transcription measurement, compound, exposure, time and controls. DNA-synthesis labelling, the proportion of sampled cells in each phase, RNA output, cell counts and death measurements answer different questions. A percentage of cells in G1 is not a percentage of patients who benefit. RB staining records protein presence; functional arrest needs a working pathway, and clinical usefulness needs the outcome actually tested in the relevant population.",
      "In a fictional culture that stops dividing during drug exposure and regrows after washout, the observed pattern supports reversible arrest. It does not establish selective killing or durable tumour control. Test attribution to the intended kinase, measure death and longer-term regrowth, and compare relevant control cells. A pause used to protect marrow and an intervention intended to control a tumour can involve related machinery while pursuing different outcomes."
    ],
    "related": [
      "cdk46-inhibitor",
      "cdk4-6",
      "cdk2",
      "cdk9",
      "rb1",
      "chemical-probe",
      "drug-target-and-mechanism"
    ],
    "links": [
      {
        "label": "Cyclin-dependent kinase control of the initiation-to-elongation switch of RNA polymerase II.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23064645/"
      },
      {
        "label": "UniProt P24941: reviewed human CDK2 function",
        "url": "https://www.uniprot.org/uniprotkb/P24941/entry"
      },
      {
        "label": "NCI Drug Dictionary: Palbociclib",
        "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/palbociclib"
      },
      {
        "label": "NCI Drug Dictionary: samuraciclib",
        "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/samuraciclib"
      },
      {
        "label": "NCI Drug Dictionary: CDK9 inhibitor GFH009",
        "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/cdk9-inhibitor-gfh009"
      },
      {
        "label": "MYC pathway activation in triple-negative breast cancer is synthetic lethal with CDK inhibition.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22430491/"
      },
      {
        "label": "Ribociclib plus Endocrine Therapy in Early Breast Cancer.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38507751/"
      },
      {
        "label": "Myeloprotection with trilaciclib in Chinese patients with extensive-stage small cell lung cancer receiving chemotherapy: Results from a randomized, double-blind, placebo-controlled phase III study (TRACES).",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38224653/"
      },
      {
        "label": "NCI Drug Dictionary: trilaciclib",
        "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/trilaciclib"
      }
    ]
  }
];
