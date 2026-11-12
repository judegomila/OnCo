import type { TermInput } from "@/lib/schema";

// Source-scoped repair teaching; fictional comparisons state their assumptions.
export const educationRepairResistance202611Terms: TermInput[] = [
  {
    "kind": "term",
    "id": "dna-damage-response-inhibitors",
    "name": "DNA damage response inhibitors",
    "aka": [
      "DDR inhibitors",
      "DNA-damage-response inhibitors",
      "DNA damage response inhibitor",
      "DNA repair checkpoint inhibitors"
    ],
    "category": "Treatment jargon",
    "tldr": "These medicines interrupt particular damage signals, cell-cycle pauses or DNA repair routes. A useful effect depends on the tumour and the interrupted job.",
    "summary": "DNA damage response inhibitors interfere with selected signalling, checkpoint or repair functions. ATM, ATR, CHK1, WEE1, DNA-PK and polymerase theta have different, overlapping roles. The relevant question is which function a particular medicine interrupts and whether the sampled tumour currently depends on it. A repair-gene variant, an old genomic scar or prior PARP-inhibitor resistance alone does not establish benefit from another damage-response inhibitor.",
    "notes": [
      "DNA is the cell's genetic material. During copying, a replication fork can slow or stall; that stress is not itself a diagnosis of a double-strand break. A workshop analogy separates pausing the job, stabilising unfinished work and repairing damage, while the actual response is an overlapping network. UniProt describes ATM-associated signalling after double-strand breaks and ATR-associated checkpoint signalling during replication stalling; ATR can phosphorylate CHK1 and other substrates. These labels do not make two proteins the only sensors or reduce each to one job.",
      "A kinase transfers a phosphate group to a substrate; phosphorylation does not always turn that substrate on. WEE1 phosphorylates CDK1 at tyrosine 15 and inhibits entry into mitosis. CHK1 also acts through checkpoint and repair pathways, including inhibition of CDC25 regulators. A simplified p53/G1 and WEE1/G2 checkpoint drawing can motivate a hypothesis after defined functional checkpoint loss; a TP53 sequence variant alone does not prove that the first pause is absent or that a second pause is a validated treatment dependency. Hirai 2009 tested WEE1 inhibition with DNA-damaging drugs in specified p53-deficient models, not a universal clinical TP53-selection rule.",
      "Reaper 2011 reported an ATR-inhibitor interaction with ATM-p53 pathway deficiency in cells treated with DNA-damaging agents. That experimental context matters: an ATM alteration is not automatically functional loss, and this result is not an all-tumour monotherapy rule. Gatti-Mays 2020 studied prexasertib in nine people with previously treated recurrent or metastatic triple-negative breast cancer who were germline-BRCA wild-type. One had a partial response, four had stable disease, and eight had grade 3 or 4 afebrile neutropenia. This small single-group pilot illustrates both activity and marrow toxicity at its tested exposure; it does not validate a general repair-variant biomarker or a routine combination schedule.",
      "DNA-PK's catalytic component, PRKDC, participates in classical non-homologous end joining with other end-binding and repair proteins. Polymerase theta, encoded by POLQ, supports a different end-joining route that can use short sequence matches. Blocking checkpoint signalling and blocking an end-joining route are different interventions even if each reduces survival in a model. A rationale for combining a DNA-PK inhibitor with DNA damage or radiation does not by itself establish selective tumour benefit or spare normal dividing tissue. Synthetic lethality requires evidence about the paired functional defects, rather than two gene names on a report.",
      "Zatreanu 2021 studied ART558, an allosteric inhibitor of polymerase theta's polymerase domain. It impaired theta-mediated end joining rather than classical non-homologous end joining, and showed activity in selected BRCA-deficient models, including PARP-resistant models with 53BP1 or Shieldin loss. Zhou 2021 instead studied novobiocin against the ATPase domain in cell and mouse tumour models. These are different compounds and domains; their experimental specificity and activity cannot be transferred automatically to another polymerase-theta drug or to a patient.",
      "The novobiocin study also tested BRCA2-reverted PEO4 and CAPAN1-CR cells against their deficient parental lines. The reverted cells resisted both PARP inhibition and novobiocin. Other PARP-resistant models, including a BRCA1-mutant/53BP1-loss model, remained novobiocin-sensitive. Thus PARP resistance alone did not identify one common vulnerability, and the study does not establish resistance to every polymerase-theta inhibitor. In two fictional PARP-resistant cultures, one retaining a BRCA defect with 53BP1 loss and another carrying a BRCA2 reversion, test the actual compound and current repair state separately. Even a positive experiment leaves clinical benefit and safety unresolved.",
      "The measurement question determines the assay. Engagement and downstream action can be investigated with specified phosphorylation sites, such as WEE1-related CDK1 tyrosine 15, rather than an unspecified phosphate signal. DNA-damage markers, RAD51 or other repair foci, functional repair assays, and survival or regrowth after drug removal ask further questions. Foci are visible protein clusters, not proof by themselves that repair finished successfully. Use matched repair-proficient and deficient models, genetic controls, specified concentrations, exposure times and sampling times. Nanomolar means nanomoles per litre and micromolar means micromoles per litre; a culture concentration is not a clinical dose.",
      "A three-panel teaching cartoon can show an ATR-associated stress signal, WEE1 placing an inhibitory phosphate, and polymerase-theta joining with short matches. Its bars and DNA strokes supply schematic roles, not concentrations, a complete literal network or a treatment ranking. Follow a checkpoint diagram by asking what functional loss is demonstrated, what job is interrupted and what measured dependency remains. A historical genomic scar does not establish the current repair state; a PARP-resistant label does not establish polymerase-theta sensitivity; and loss of one checkpoint does not establish clinical benefit from inhibiting another. These distinctions also prevent treating ATR inhibition and an ATM-loss biomarker as the same fact."
    ],
    "related": [
      "ddr",
      "replication-stress",
      "synthetic-lethality",
      "parp-inhibitor",
      "brca-reversion-mutations",
      "hrd-genomic-scar-scores",
      "atr",
      "atm",
      "chek1",
      "wee1",
      "prkdc",
      "polq",
      "chemical-probe",
      "resistance"
    ],
    "links": [
      {
        "label": "Reaper et al.: ATR inhibition in defined damage-response models (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21490603/"
      },
      {
        "label": "Gatti-Mays et al.: prexasertib in nine BRCA-wild-type TNBC participants (2020)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32510664/"
      },
      {
        "label": "Hirai et al.: WEE1 inhibition and p53-deficient combination models (2009)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19887545/"
      },
      {
        "label": "Zatreanu et al.: polymerase-domain inhibition of polymerase theta (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34140467/"
      },
      {
        "label": "Zhou et al.: novobiocin, the ATPase domain and selected resistance models (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34179826/"
      },
      {
        "label": "UniProt: human ATM function",
        "url": "https://www.uniprot.org/uniprotkb/Q13315/entry"
      },
      {
        "label": "UniProt: human ATR function",
        "url": "https://www.uniprot.org/uniprotkb/Q13535/entry"
      },
      {
        "label": "UniProt: human CHEK1 function",
        "url": "https://www.uniprot.org/uniprotkb/O14757/entry"
      },
      {
        "label": "UniProt: human WEE1 function",
        "url": "https://www.uniprot.org/uniprotkb/P30291/entry"
      },
      {
        "label": "UniProt: human PRKDC function",
        "url": "https://www.uniprot.org/uniprotkb/P78527/entry"
      }
    ],
    "asOf": "2026-11-12"
  }
];
