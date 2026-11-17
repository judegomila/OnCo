import type { TermInput } from "@/lib/schema";

/** Evidence-scoped teaching from the public therapy curriculum. */
export const educationTherapyConjugates2026: TermInput[] = [
{
  "id": "antibody-tumor-penetration",
  "kind": "term",
  "name": "Antibody penetration into tumours",
  "aka": [
    "tumour antibody penetration",
    "ADC penetration into tumours"
  ],
  "category": "ADC chemistry",
  "asOf": "2026-11-11",
  "tldr": "An antibody’s presence in the blood does not show how evenly it reaches a tumour. Supply from vessels, movement through tissue, binding and removal all affect where it goes.",
  "summary": "Antibody penetration describes movement and distribution from the circulation into tumour tissue. Crossing the vessel wall, moving between cells, binding a target, and uptake or clearance are separate processes. Their balance can create uneven distribution. A high concentration near a vessel does not establish exposure throughout the tumour, and a target-positive biopsy does not measure drug delivery.\n\nThere is no single reach distance supplied by the word antibody or by a tissue section. Antibody distribution and the spread of a released conjugate payload are also different measurements. Specific studies can support a delivery hypothesis; a response predictor needs validation in the intended product and clinical setting.",
  "notes": [
    "Binding can capture an antibody close to vessels before it reaches deeper cells, a mechanism called the binding-site barrier. Affinity, accessible target abundance, dose, supply, internalisation and systemic clearance all enter the balance. It is not a binary rule that a molecule always stops permanently at its first target or can move deeper only when every nearby site is occupied. An antibody, its conjugate and the released small-molecule cargo are different entities; a single mass ratio to chemotherapy is not defined. For example, the sacituzumab govitecan label gives approximately 160 kilodaltons for the finished conjugate, while the fluorouracil injection label gives 130.08 g/mole for that small molecule. Those are specified entities, not one typical chemotherapy mass or a measure of tumour reach. Crossing the vessel wall is one barrier; it is not established as the main bottleneck for every tumour or construct.",
    "In Baker’s HER2-overexpressing mouse xenografts, the 2008 abstract describes trastuzumab bound up to about 150 micrometres from vessels in some regions, with poor access near other vessels; measured HER2, vessel density and perfusion did not explain the heterogeneity. This is a model observation, not a universal range or an independence rule for every tumour. The paper has a listed correction whose text was unavailable in this check, so the numerical statement is limited to its abstract.",
    "Cilliers and colleagues co-administered unconjugated trastuzumab with T-DM1 in a trastuzumab-insensitive mouse xenograft model. The tested 3:1 and 8:1 antibody-to-conjugate ratios improved distribution and efficacy under those conditions without increasing the conjugate payload amount. This is evidence for a particular experimental strategy, not an instruction to add antibody to a patient’s treatment.",
    "In Lu’s 24-person head-and-neck-cancer study, labelled antibody given before surgery showed heterogeneous delivery, and tumour size had strong predictive value within that study. That is not a claim that size is the strongest predictor in all cancers. Mortimer’s ten-woman metastatic-breast pilot associated radiolabelled trastuzumab PET uptake with T-DM1 response and outcome. A small exploratory association does not establish a general selection threshold.",
    "The carrier and released drug can travel differently. Ogitani’s DS-8201a experiments used a membrane-permeable DXd cargo, a low-permeability comparator, mixed HER2-positive/negative tumours and a distant opposite-flank tumour. Neighbouring target-negative killing in that model, with no comparable effect at the distant tumour, supports local bystander action for that construct. It does not give every payload the same permeability or prove that healthy tissues are protected.",
    "A vessel-lining stain such as CD31 identifies structures, not ongoing perfusion or antibody leakage. CD31 also occurs on platelets and leukocytes, so signal needs cellular and tissue context. Labelled-antibody imaging in removed tissue and appropriately designed molecular imaging measure distribution more directly than vessel counts; each still has timing, sampling and resolution limits. For a delivery claim, document the antibody or conjugate, dose, time after dosing, perfused vessels, accessible target and direct drug measurement. A cell with unmeasured exposure has not been shown to resist the drug.",
    "Thomlinson and Gray’s 1955 study concerned selected human lung-carcinoma cords and oxygen-related histology, not antibodies. They reported no apparently intact cell more than about 180 micrometres from stroma and calculated a 145-micrometre critical radius using assumed constants. They explicitly did not treat the numerical agreement as proof that oxygen lack caused central necrosis. Oxygen consumption and diffusion in that geometry cannot supply an antibody penetration distance.",
    "In a fictional section with a median cell-to-vessel distance of 300 micrometres, distance alone cannot establish failure of an antibody-drug conjugate to reach its target. Check which vessels were perfused, the three-dimensional sampling geometry, dose and timing, binding and uptake, direct carrier distribution, and released-payload spread. Delivery failure, loss of the delivery antigen and resistance to the released drug require different evidence. The studies described here do not validate one section-distance cutoff for treatment selection."
  ],
  "links": [
    {
      "label": "Sacituzumab govitecan label: specified conjugate molecular mass",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
    },
    {
      "label": "Fluorouracil label: specified small-molecule molecular mass",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b268684b-487f-4716-a2e8-6e6d3e117b14"
    },
    {
      "label": "Thurber et al., antibody transport opposed by clearance (2008 review)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18541331/"
    },
    {
      "label": "Baker et al., heterogeneous trastuzumab distribution in xenografts (2008)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18381959/"
    },
    {
      "label": "Cilliers et al., antibody co-administration and conjugate distribution in mice (2018)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29217763/"
    },
    {
      "label": "Lu et al., antibody delivery in 24 head-and-neck patients (2020)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/31980465/"
    },
    {
      "label": "Mortimer et al., trastuzumab PET and T-DM1 pilot (2022)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/34857660/"
    },
    {
      "label": "Ogitani et al., local DXd bystander controls (2016)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/27166974/"
    },
    {
      "label": "Thomlinson and Gray, lung-carcinoma histology and oxygen modelling (1955)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/13304213/"
    },
    {
      "label": "UniProt PECAM1/CD31: endothelial borders, platelets and leukocytes",
      "url": "https://www.uniprot.org/uniprotkb/P16284/entry"
    }
  ],
  "technologies": [
    "adc"
  ],
  "related": [
    "bystander-effect",
    "antibody"
  ],
  "tags": []
}
];
