import type { TermInput } from "@/lib/schema";

/** Therapeutic mechanisms and measurement distinctions, with evidence scoped per record. */
export const educationTherapeuticEvidence: TermInput[] = [
  {
    "id": "adc-analytes-and-exposure",
    "name": "ADC analytes and exposure",
    "aka": [
      "conjugated antibody and total antibody",
      "unconjugated payload exposure",
      "ADC bioanalysis"
    ],
    "tldr": "An antibody-drug conjugate and its released drug do not follow one shared concentration curve. The measured chemical form matters.",
    "summary": "A conjugate assay measures antibody carrying payload, or antibody-bound drug, according to the validated method. Total antibody includes conjugated and unconjugated antibody; unconjugated payload measures released drug separately. Active metabolites or catabolites can add further relevant species. Concentration, time course and exposure therefore belong to a named analyte. A conjugate dose in milligrams per kilogram is not the same quantity as the mass of free payload reaching a tumor or the blood.",
    "notes": [
      "FDA’s 2024 guidance for cytotoxic small-molecule ADCs recommends validated measurements of the conjugate and relevant constituent parts, with later omissions justified by pharmacology, assay sensitivity and exposure data. It does not require every conceivable analyte in every study or automatically apply to every immune agonist or other cargo.",
      "For a construct carrying different payloads, keep each chemical identity, loading distribution, release behavior and exposure distinct. A manufactured loading ratio does not establish the ratio reaching tissue over time. The same total DAR does not establish equal loading of each component or equal biological activity."
    ,
"The June 2026 U.S. TRODELVY label describes serum measurements in metastatic breast cancer and reports a median conjugate elimination half-life of 6.5 days and a median free-SN-38 value of 22 hours; it separately gives a 6.7-day terminal conjugate value and a 24-hour apparent free-SN-38 value. The ENHERTU label, in patients with cancer, reports median elimination half-lives of 5.4 to 5.7 days for the conjugate and 5.4 to 6.1 days for DXd. DATROWAY reports median elimination half-life 4.8 days for the conjugate and median apparent half-life about 5.5 days for released DXd. Keep the label version, named analyte, population, assay specimen and exact parameter definition; these label entries do not specify every assay matrix. The TRODELVY section presents parameters as means unless specified otherwise, so its separately labelled median, terminal and apparent values must not be merged. Similar half-life values also do not make entire concentration curves identical or measure intracellular exposure throughout a tumour.",
"An apparent released-drug curve can reflect continued formation as well as removal. PADCEV explicitly describes unconjugated MMAE elimination as limited by release from its conjugate. That product example is not an estimate of isolated DXd elimination. ENHERTU reports systemic clearances of 0.4 litres per day for the conjugate and 18 litres per hour for DXd; a clearance comparison alone does not determine intrinsic half-life without distribution and model information. Nakada and colleagues, working at Daiichi Sankyo, described short systemic DXd half-life as a preclinical design rationale in 2019. Their rationale and later human label parameters answer different questions and do not by themselves establish tumour selectivity or safety.",
"In a fictional report, antibody-associated signal remains measurable two weeks after administration. That supports detection of the measured antibody species at the sampled sites and times, not active payload in every cancer cell. Ask which chemical species the assay distinguishes, whether active material reached its action compartment, and whether a relevant functional effect and later survival were measured. Sparse blood samples and a bulk tumour sample cannot establish every cell's exposure."
],
    "links": [
      {
        "label": "FDA: clinical pharmacology considerations for cytotoxic ADCs (2024)",
        "url": "https://www.fda.gov/media/155997/download"
      },
      {
        "label": "Ravenstijn et al.: translational and bioanalytical questions for dual-payload conjugates (2026 perspective)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42089685/"
      },
      {
        "label": "Hamblett et al.: loading and exposure in one conjugate, cell and mouse experiments (2004)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15501986/"
      }
    ,
{
  "label": "TRODELVY U.S. label: indications, mechanism and named pharmacokinetic measurements",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
},
{
  "label": "ENHERTU U.S. label: indications, mechanism, pharmacokinetics and cardiac assessment",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
},
{
  "label": "DATROWAY U.S. label: indications, mechanism and apparent released-DXd half-life",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
},
{
  "label": "PADCEV U.S. label: skin warning, MMAE transport and release-limited pharmacokinetics",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed"
},
{
  "label": "Nakada et al.: developer-authored DS-8201a review and preclinical design rationale (2019)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/30827997/"
}
],
    "related": [
      "adc",
      "dar",
      "linker",
      "pharmacokinetics",
      "dual-payload-adc"
    ],
    "kind": "term",
    "asOf": "2026-11-11",
    "category": "ADC"
  },
  {
    targets:["chek1"],
    "id": "chk1-inhibitor-payloads",
    "name": "CHK1 inhibitor payloads",
    "aka": [
      "CHK1i ADC payloads",
      "checkpoint kinase 1 inhibitor cargo"
    ],
    "tldr": "A CHK1-inhibitor conjugate carries a drug that interferes with a replication-stress checkpoint. A published conference abstract reports a HER2-directed preclinical example.",
    "summary": "CHK1 inhibition is the cargo mechanism only when the inhibitor is physically attached to the conjugate. The AACR 2026 abstract describes engineered-cysteine trastuzumab, a cleavable linker and a CHK1-inhibitor payload. The investigators tested cells and a HER2-positive breast-cancer xenograft model. This establishes a publicly described payload design and model experiment, separate from giving an oral checkpoint inhibitor alongside another ADC. It does not establish human safety, benefit after a TOP1 ADC or a treatment-selection rule.",
    "notes": ["The antibody delivery antigen and the payload’s checkpoint target answer different questions. The proposed advantage depends on sufficient intracellular release and checkpoint dependence, not a HER2 or replication-stress label alone. The conference abstract reports limited model safety observations; lack of mouse weight loss cannot establish human marrow safety or a clinical therapeutic window.","An earlier 2020 study attached the checkpoint inhibitor AZD7762 to an antibody. The conjugate recognized the tested cell-surface target but lacked efficacy in that delivery experiment; the investigators pursued protease-activated cell-penetrating peptides instead. Physical attachment and target binding therefore did not establish a useful intracellular effect. This negative result does not establish that every CHK1-directed conjugate must fail.","The 2026 A067 conference abstract screened exatecan with prexasertib in cancer-cell and blood-progenitor assays. It proposes a candidate pair for dual-payload development; the abstract does not itself document both chemicals attached to a tested antibody. Pairwise synergy, a constructed dual-cargo product and a patient therapeutic window are separate claims.","NCT02124148 lists prexasertib and cetuximab as separately administered drugs with different schedules. It is not evidence of a cetuximab conjugate carrying a CHK1 inhibitor. Registry design, observed pharmacodynamic changes and patient outcomes also require separate interpretation."],
    "links": [{"label":"Halazonetis et al.: CHK1-inhibitor conjugate, AACR 2026 abstract 1714","url":"https://doi.org/10.1158/1538-7445.am2026-1714"},{"label":"2020 antibody versus peptide radiosensitizer delivery experiment","url":"https://pubmed.ncbi.nlm.nih.gov/32304937/"},{"label":"Meng et al.: exatecan/prexasertib pair screening, AACR D3 abstract A067 (2026)","url":"https://doi.org/10.1158/1557-3265.d32026-a067"},{"label":"ClinicalTrials.gov: separate prexasertib/cetuximab administration in NCT02124148","url":"https://clinicaltrials.gov/study/NCT02124148"}],
    "related": [
      "adc",
      "atr-chk1-inhibitors",
      "replication-stress",
      "synthetic-lethality",
      "adc-analytes-and-exposure"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "ADC"
  },
  {
    "id": "parp-inhibitor-payloads",
    "name": "PARP inhibitor payloads",
    "aka": [
      "PARP1 inhibitor cargo",
      "PARPi antibody-drug conjugates"
    ],
    "tldr": "A PARP-inhibitor payload attaches a repair-targeting drug to an antibody. A published preclinical abstract describes a TROP2 conjugate carrying a PARP1-selective inhibitor.",
    "summary": "The AACR 2025 abstract describes a TROP2 antibody joined through a cleavable linker to a PARP1-selective inhibitor. Cell comparisons included the conjugate, free payload and antibody alone; a breast-cancer xenograft experiment compared their activity and blood-cell effects. The reported activity varied between tested cell models, illustrating that more delivery antigen is not sufficient to establish payload sensitivity. This is a conference-abstract proof of concept, not clinical evidence that antibody delivery reverses PARP resistance or removes systemic toxicity.",
    "notes": [
      "An approved PARP-inhibitor pill, a free PARP drug combined with an ADC and a physically attached PARP payload are different products and evidence questions. Retain the actual conjugated chemical species, linker, release and exposure. A repair-gene variant alone does not prove the tumor’s current functional dependence or establish eligibility for an experimental conjugate."
    ],
    "links": [
      {
        "label": "Koo et al.: PARP1-selective payload in a TROP2 conjugate, AACR 2025 abstract 5467",
        "url": "https://doi.org/10.1158/1538-7445.am2025-5467"
      }
    ],
    "related": [
      "adc",
      "parp",
      "parp-inhibitor",
      "synthetic-lethality",
      "adc-analytes-and-exposure"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "ADC"
  },
  {
    "id": "histone-lactylation",
    "name": "Histone lactylation",
    "aka": [
      "histone lysine lactylation",
      "histone Kla"
    ],
    "tldr": "Lactate can contribute to a chemical modification of histone proteins. Experiments connect this mark to gene regulation in particular cell states and disease models.",
    "summary": "Lactylation adds a lactate-derived modification to histone lysine residues, rather than changing the DNA sequence. The original study identified this mark in human and mouse cells and investigated its timing and gene-regulatory effects in stimulated macrophages. A later mechanistic study in EGFR T790M-positive tumor models connected radiation, LDHA-dependent lactate production, histone lactylation and DNA-repair responses. Its cell, organoid and xenograft experiments provide a context-specific mechanism hypothesis, not a validated clinical radiation-selection test.",
    "notes": [
      "Bulk lactate concentration, a particular histone modification, its genomic location, RNA output and DNA-repair activity are different measurements. The radiation study combined biochemical and chromatin measurements with genetic or pharmacological perturbations. A high lactate value alone does not establish that this mechanism is present, dominant or targetable in another tumor."
    ],
    "links": [
      {
        "label": "Zhang et al.: original histone-lactylation and gene-regulation study (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31645732/"
      },
      {
        "label": "EGFR-mutant metabolic, chromatin and radiation-response models (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42399513/"
      }
    ],
    "related": [
      "epigenetic-marks",
      "gene-expression",
      "warburg-effect",
      "egfr"
    ],
    "kind": "term",
    "asOf": "2026-11-08",
    "category": "Biology & measurement"
  },
  {
    "id": "cellular-kinetics-and-persistence",
    "name": "Cellular kinetics and persistence",
    "aka": [
      "living-drug kinetics",
      "cell-therapy abundance and function",
      "cell dose and persistence"
    ],
    "tldr": "A living cell therapy can change its number, location and state after administration. The starting dose, a sampled cell count and useful function are different measurements.",
    "summary": "After a cell infusion, measured abundance depends on division, survival and redistribution. In vivo engineering may also continue to generate newly engineered cells. A blood sample describes one compartment and time; it cannot count all cells in the body or establish entry into a tumor. Detectable receptor-encoding sequences, viable receptor-positive cells, persistent markers and functional activity should be reported separately.",
    "notes": [
  "FDA CAR T-cell guidance treats exposure/kinetics, pharmacodynamic response, immunogenicity, identity, viability and potency as distinct assessments. Blood concentration-time measurements and optional disease-tissue sampling answer different distribution questions. A sequence assay is not automatically a count of viable cells expressing a functional surface receptor.",
  "Keep the measurement method, time, compartment, units and denominator attached. A receptor-positive percentage can fall while absolute receptor-positive cells per microliter remain unchanged if the sampled denominator increases. Neither measure alone establishes an unchanged total-body cell population, tumor entry or antitumor benefit.",
  "An administered cell dose is an input. The dose of a vector or particle used for in vivo engineering does not directly specify the later number of engineered cells. Autologous means the recipient’s own cells; allogeneic means cells from another person. Engineering outside versus inside the body is a separate axis; a prepared delivery product can engineer the recipient's own cells.",
  "Expansion and persistence can prolong useful activity or harmful recognition. Stopping further administration does not instantly remove living cells or reverse an injury already triggered. A safety switch addresses a specified control mechanism; cell elimination, receptor shutoff and treatment of downstream inflammation are different interventions.",
  "In the Liu cord-blood CAR-NK study, low-level detection at least 12 months after treatment belonged to a construct with IL-15 and an inducible caspase-9 switch. It does not establish the behavior of every NK-cell source or equate marker detection with continuing useful function.",
  "In a fictional pair of matched blood samples, 20 per cent of 100 viable T cells per microlitre and 10 per cent of 200 both give 20 receptor-positive viable T cells per microlitre. The percentage fell because its denominator doubled; the concentration did not. This conclusion requires comparable collection, volume and viable-cell gates. It says nothing about the total number of cells in the body, tumour entry or continued target-cell killing. Genetic copies, surface receptor, viable cells and useful function remain separate measurements.",
  "Cells respond biologically to signals, without intention; more cells do not by themselves establish better or safer treatment. Consider two fictional ready-made products: a carrier that gives receptor instructions to the recipient’s own T cells, and a prepared batch of donor-derived engineered cells. The first can generate autologous cells in vivo; the second supplies allogeneic cells engineered ex vivo. State four things separately: the starting cell family, whose cells they are, where engineering happens and whether cells or an instruction carrier are administered. Neither card establishes available supply, the final engineered-cell population or treatment benefit. NK and NKT name different cell families; an added receptor does not erase the recipient cell’s other inputs.",
  "A rise in engineered cells in blood with few found in two tumour biopsies leaves distribution and infiltration unresolved. Blood abundance is not entry into a mass of tissue, and a biopsy represents its sampled place and time. If a receptor works in a simple culture but killing falls in a more complex model with the target still present, investigate access, cell state and the model’s other features with controlled perturbations. The contrast alone does not identify a macrophage, vessel or signalling pathway as the cause, or show that more expansion will solve it. Expression of PD-1, LAG-3, TIM-3 or TIGIT, or a count of macrophages or suppressor cells, does not by itself establish which input caused the functional difference. Trafficking toward a site and infiltration into tissue are different steps, and vessel number does not measure perfusion. Chronic stimulation, low oxygen, limited nutrients and inhibitory signals are different hypotheses; exhaustion describes cell states rather than physical tiredness.",
  "Compare time courses rather than labels when interpreting reversibility. Antibodies also take time to clear after dosing stops. In an engineered-cell product, carrier exposure, instructions, receptor protein, living cells and inflammation can have different durations. Stopping the next administration, reducing one signal, removing the cells and reversing an established injury are separate claims."
],
    "related": [
      "car-t",
      "car-nk-macrophage",
      "nk-cell-therapy",
      "in-vivo-car-t",
      "t-cell-exhaustion-term"
    ],
    "sections": [
      "cell-therapy"
    ],
    "links": [
  {
        "label": "FDA: CAR T-cell product design, testing and clinical pharmacology guidance (2024)",
        "url": "https://www.fda.gov/media/156896/download"
      },
  {
        "label": "NCI: T-cell transfer therapy and harms",
        "url": "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/t-cell-transfer-therapy"
      },
  {
        "label": "Liu et al.: one cord-blood CAR-NK construct in lymphoid tumors (2020)",
        "url": "https://doi.org/10.1056/NEJMoa1910607"
      },
  {
  "label": "Phase I Study of ROR1-Specific CAR-T Cells in Advanced Hematopoietic and Epithelial Malignancies. (2025)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/39466024/"
},
  {
  "label": "NCI: Tumor Biology and Microenvironment Research",
  "url": "https://www.cancer.gov/about-nci/organization/dcb/research-portfolio/tbmr"
},
  {
  "label": "FDA long-term follow-up after human gene therapy (January 2020)",
  "url": "https://www.fda.gov/media/113768/download"
}
],
    "category": "Treatment jargon",
    "kind": "term",
    "asOf": "2026-11-12"
  },
  {
    "id": "endogenous-promoter-payload-control",
    "name": "Control of cell payloads by endogenous promoters",
    "aka": [
      "NR4A2 cytokine payload control",
      "RGS16 cytokine payload control",
      "activation-responsive cytokine expression"
    ],
    "tldr": "An engineered cell can place a payload under the control of a naturally regulated gene. The resulting expression pattern still needs measurement in the actual cells and tissues.",
    "summary": "A CRISPR knock-in can connect an engineered cytokine payload to regulatory control at an endogenous gene locus. In preclinical work, NR4A2 and RGS16 control supported cytokine expression in specified CAR T-cell settings, with tumor and safety measurements in mouse models. This is distinct from adding synthetic response elements to a separate promoter. Neither the locus name nor an activation-responsive design proves tumor-only secretion, clinical safety or patient benefit.",
    "notes": [
      "Chen and colleagues screened endogenous genes and investigated NR4A2/RGS16 regulation for payloads including IL-12 and IL-2 in cell and mouse models. Patient-derived cells were also studied experimentally; that is not a clinical treatment result in those patients. The edited locus, retained native gene function, off-state expression, inducibility and persistence need characterization.",
      "Guo and colleagues instead tested a synthetic NR4A-responsive promoter against a conventional NFAT-responsive promoter in human-cell experiments with weak stimulation. Reporter expression and improved proliferation in that system do not establish a clinical potency or safety ranking, and the synthetic promoter is distinct from an endogenous NR4A2-locus knock-in.",
      "Keep trigger recognition, payload transcription, secretion, tissue distribution and downstream activity separate. The IL-12 TIL clinical experience shows why inducible production alone cannot establish confinement or freedom from systemic toxicity. Viable producer-cell abundance, time and cell state matter alongside cytokine concentration."
    ],
    "related": [
      "armored-car",
      "gene-regulatory-elements",
      "cellular-kinetics-and-persistence"
    ],
    "sections": [
      "cell-therapy"
    ],
    "links": [
      {
        "label": "Chen et al.: endogenous-locus control of cytokine payloads in preclinical models (2025)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40604285/"
      },
      {
        "label": "Guo et al.: synthetic NR4A-responsive payload promoter in human-cell experiments (2022)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35316028/"
      },
      {
        "label": "Zhang et al.: inducible IL-12 TIL study and systemic toxicity (2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25695689/"
      }
    ],
    "category": "Treatment jargon",
    "kind": "term",
    "asOf": "2026-11-08"
  }
,
{
  "id": "completion-surgery",
  "kind": "term",
  "category": "Clinic basics",
  "name": "Completion surgery",
  "aka": [
    "completion mastectomy",
    "completion axillary dissection"
  ],
  "tldr": "Completion surgery is a further operation after an earlier procedure and its findings. The tissue, reason and clinical setting determine the question; a pathology finding does not select one operation automatically.",
  "summary": "In breast care, further surgery can mean re-excision of a cavity, completion mastectomy or completion axillary dissection. These remove different tissues and address different findings. The final margin or node assessment, earlier treatment and full clinical context matter. A further operation after initial pathology is not itself a recurrence or a treatment for disease throughout the body.\n\nZ0011 studied a specified surgery-first population receiving lumpectomy and planned whole-breast radiation. AMAROS compared axillary dissection with radiation, rather than with no axillary treatment. Those studies do not directly answer residual positive sentinel nodes after neoadjuvant chemotherapy; A011202 studies that different setting. Finding more involved nodes by removing them is different from preventing recurrence, and harms such as lymphoedema need separate assessment.",
  "cancers": [
    "breast-cancer",
    "tnbc"
  ],
  "trials": [
    "acosog-z0011",
    "amaros",
    "alliance-a011202"
  ],
  "related": [
    "resection-margins",
    "breast-margins-and-re-excision",
    "lumpectomy",
    "mastectomy",
    "sentinel-node",
    "regional-nodal-irradiation"
  ],
  "links": [
    {
      "label": "NCI: lumpectomy and surrounding treatment",
      "url": "https://www.cancer.gov/types/breast/treatment/surgery/lumpectomy"
    },
    {
      "label": "Z0011 ten-year report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28898379/"
    },
    {
      "label": "AMAROS original report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25439688/"
    },
    {
      "label": "A011202 registry: post-neoadjuvant residual positive nodes",
      "url": "https://clinicaltrials.gov/study/NCT01901094"
    }
  ],
  "asOf": "2026-11-09",
  "tags": [
    "education-audit",
    "local-treatment"
  ]
},
{
  "id": "regional-nodal-irradiation",
  "kind": "term",
  "category": "Clinic basics",
  "name": "Regional nodal irradiation in breast cancer",
  "aka": [
    "regional nodal irradiation",
    "RNI"
  ],
  "tldr": "Regional nodal irradiation treats selected lymph-node regions. The exact fields, pretreatment findings and response after earlier therapy determine the clinical question.",
  "summary": "Fields can include axillary, supraclavicular and internal mammary node regions, depending on the plan. This is distinct from breast or chest-wall irradiation, though they can be combined. After neoadjuvant treatment, ypN0 is a pathological nodal classification. Retain the sampled nodes and modifiers, including isolated-cell categories, rather than interpreting it as proof of absolute cellular absence or complete response in the breast.\n\nB-51 studied biopsy-proven cT1 to T3 N1 M0 disease that became ypN0. Its primary recurrence-interval comparison was not statistically significant at median follow-up 59.5 months; this is not proof of zero effect in all settings. After lumpectomy both groups received whole-breast radiation. After mastectomy the contrast included chest-wall plus nodal radiation versus none.\n\nA011202 instead studies residual positive sentinel nodes after neoadjuvant chemotherapy. Its registry describes dissection plus nodal radiation versus axillary and nodal radiation without dissection; both strategies include radiation. Do not transfer an omission conclusion between these different populations and contrasts. Organ exposure, lymphoedema and other harms remain part of the assessment.",
  "cancers": [
    "breast-cancer",
    "tnbc"
  ],
  "trials": [
    "nsabp-b51",
    "alliance-a011202"
  ],
  "related": [
    "lymph-node-status",
    "sentinel-node",
    "radiotherapy",
    "completion-surgery",
    "mastectomy",
    "lumpectomy"
  ],
  "links": [
    {
      "label": "B-51 primary report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/40466065/"
    },
    {
      "label": "B-51 surgery-specific registry arms",
      "url": "https://clinicaltrials.gov/study/NCT01872975"
    },
    {
      "label": "A011202 residual-node-positive registry arms",
      "url": "https://clinicaltrials.gov/study/NCT01901094"
    },
    {
      "label": "NCI: radiation for breast cancer",
      "url": "https://www.cancer.gov/types/breast/treatment/radiation"
    }
  ],
  "asOf": "2026-11-09",
  "tags": [
    "education-audit",
    "local-treatment"
  ]
},

{
  "id": "synthetic-cytokine-receptors",
  "name": "Synthetic cytokine receptors",
  "aka": [
    "engineered cytokine receptors",
    "chimeric cytokine receptors",
    "SyCyR"
  ],
  "tldr": "An engineered cytokine receptor connects a specified input to signalling inside a cell. The added signal and the behaviour of the complete cell product need separate measurements.",
  "summary": "A synthetic cytokine receptor is an engineered cell-surface protein that connects a specified input to intracellular signalling. It differs from engineering a soluble cytokine or simply administering a cytokine. Some designs require an externally supplied ligand; others generate ligand-independent signalling. The receptor domains, input, expression and cell type define the tested construct. A growth-supporting signal does not itself establish antigen recognition, entry into a tumour, completed killing or durable patient benefit.",
  "notes": [
  "Engelowski and colleagues joined fluorescent-protein-binding nanobodies to selected cytokine-receptor membrane and intracellular domains. Artificial GFP/mCherry-based ligands induced signalling in experimental systems. That 2018 study is a particular ligand-dependent design, not a test of every synthetic receptor or of a company platform with a different architecture.",
  "In a 2010 human T-cell study, a chimeric receptor joined the IL-4 receptor binding region to an IL-2/IL-15 receptor signalling component. IL-4 supported expansion of the engineered cells, while a separate CAR specified the tumour target. The reported culture experiments distinguished expansion, cytokine dependence and target-cell killing; they were not patient efficacy results.",
  "A 2026 macrophage preprint studied ligand-independent receptors with varied signalling motifs in primary human macrophages and preclinical models. Marker expression, phagocytosis and mouse tumour observations were different readouts. The report remains a preprint and does not establish human treatment benefit.",
  "Enoda uses MIMIC as the name of its synthetic cytokine-receptor assets. The platform name does not define all engineered cytokine receptors or establish clinical performance. Its website describes platform aims and sponsor claims; it is not a comparative clinical safety or efficacy report.",
  "For a drug-gated construct, withdrawing the input can reduce a selected signal without eliminating cells already engineered. Receptor signalling, viable-cell counts, tissue location, target-cell killing and later disease control need distinct measurements. A growth or activity switch is different from a cell-elimination mechanism.",
  "A mechanistic schematic shows an intended arrangement. It is not a measurement of receptor expression, signalling, cell killing or patient outcome; each of those requires its own evidence.",
  "In a fictional comparison with equal starting viable-cell input and the same CAR, a supplied trigger produces 250 viable cells at 48 hours versus 100 without it. That is 2.5 times the viable-cell count, not 2.5 times the treatment benefit. Tumour killing changes from 20 to 25 per cent, while a separate healthy-cell assay changes from two to 18 per cent injury. Count division, survival and loss separately, retain each assay’s target-cell denominator and uncertainty, and do not combine these results into a whole-body safety window.",
  "Read each supportive feature as a testable hypothesis. A drug-triggered signal needs a baseline and a withdrawal test; an antigen-triggered signal needs testing after cells leave the priming site. Constitutive signalling raises different growth and cell-state questions, while a secreted payload can affect neighbouring cells or circulate. Orthogonal means sufficiently separate from natural partners under tested conditions, not selectivity established by its name. The supportive receptor does not specify the CAR target, and changing an internal signal is different from secreting a cytokine. An added support signal does not by itself demonstrate adequate oxygen, tissue access, recognition of an absent antigen or patient benefit."
],
  "links": [
  {
      "label": "Engelowski 2018: artificial ligands and synthetic receptors in experimental systems",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29789554/"
    },
  {
      "label": "Wilkie 2010: IL-4-driven expansion and separate CAR targeting in human-cell experiments",
      "url": "https://pubmed.ncbi.nlm.nih.gov/20562098/"
    },
  {
      "label": "Lunger 2026 macrophage receptor preprint; not a clinical report",
      "url": "https://pubmed.ncbi.nlm.nih.gov/42182394/"
    },
  {
      "label": "Enoda: MIMIC platform description; sponsor naming and claims",
      "url": "https://www.enoda.bio/"
    },
  {
      "label": "Wu et al.: small-molecule ON-switch CAR experiments (2015)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26405231/"
    },
  {
  "label": "FDA: Considerations for the Development of CAR T Cell Products (January 2024)",
  "url": "https://www.fda.gov/media/156896/download"
},
  {
  "label": "Tumor-infiltrating lymphocytes genetically engineered with an inducible gene encoding interleukin-12 for the immunotherapy of metastatic melanoma. (2015)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/25695689/"
}
],
  "related": [
    "armored-car",
    "cytokine",
    "safety-switch-car-t",
    "cellular-kinetics-and-persistence",
    "in-vivo-car-t"
  ],
  "kind": "term",
  "asOf": "2026-11-12",
  "category": "Immunology"
},

{
  "id": "chain-of-identity-and-custody",
  "name": "Cell-product chain of identity and custody",
  "aka": [
    "cell-therapy traceability",
    "COI and COC",
    "chain of identity",
    "chain of custody"
  ],
  "tldr": "Identity records connect cells and products to their source and intended recipient. Custody records show who held them and what happened during handoffs.",
  "summary": "Traceability preserves relationships across source material, engineering construct, processing lots, containers, samples and intended recipients. Chain of identity and chain of custody answer different questions: what material and recipient are associated, and who had responsibility at each stage under which recorded conditions. A coded identifier makes a relationship recordable; it does not independently prove that the label, material and recipient agree.",
  "notes": [
    "A collection can branch into processing lots, doses or test samples. Retain parent links and construct versions so a sample result can be attributed to the material it represents. One bag need not mean one manufacturing run or one dose; an allogeneic workflow can relate donor material to later recipients according to its actual design.",
    "ICCBBA ST-028 version 1.1.0, June 2025, describes chain-of-identity relationships and responsibilities. IG-050 version 1.0.0, December 2023, gives bounded examples in which material is returned to the same patient; it explicitly does not cover one collection manufactured into therapies for multiple patients. That example scope must not be generalised into a complete donor-bank scheme.",
    "In a fictional single-recipient example, collection A produces lot A, which branches into doses A1 and A2 and test sample S. Each child retains the parent link. A separate custody trail records handlers, handoff times and conditions. Keeping those links does not establish acceptable quality or clinical suitability.",
    "Barcodes, biological identity assays, HLA typing, potency results and temperature traces are different evidence. None alone replaces the complete material/intended-recipient verification. A discrepancy or excursion requires investigation and the authorised quality disposition; an audit trail is evidence to assess, not a guarantee of safety.",
    "FDA's CAR T-cell guidance addresses documented tracking from collection to administration and independent recipient/label checks. The required process is not equivalent to purchasing a particular orchestration system. Research samples, fresh products, cryopreserved products and in vivo carriers retain their own applicable identities and handling context."
  ],
  "links": [
    {
      "label": "FDA: CAR T-cell development guidance, January 2024",
      "url": "https://www.fda.gov/media/156896/download"
    },
    {
      "label": "ICCBBA: Chain of Identity standard ST-028, version 1.1.0 (June 2025)",
      "url": "https://iccbba.org/wp-content/uploads/2025/08/1a7593_0aa7a5f7202c4b43be4cc11bcd2048ef.pdf"
    },
    {
      "label": "ICCBBA: single-patient collection examples IG-050, version 1.0.0 (December 2023)",
      "url": "https://iccbba.org/wp-content/uploads/2025/08/1a7593_badfaf3c48d443f78006340096a671e0.pdf"
    }
  ],
  "related": [
    "apheresis",
    "cell-therapy-orchestration-software",
    "cell-therapy-cold-chain",
    "car-t-manufacturing-process",
    "allogeneic-cell-therapy"
  ],
  "category": "Methods and models",
  "kind": "term",
  "asOf": "2026-11-09",
  "sections": [
    "cell-therapy"
  ]
},
{
  "id": "ex-vivo-cell-expansion",
  "name": "Ex vivo cell expansion",
  "aka": [
    "cell culture expansion",
    "fold expansion",
    "cell enrichment versus expansion"
  ],
  "tldr": "Cell expansion increases the number of a defined group of living cells outside the body. Selecting cells or activating them answers a different question.",
  "summary": "Expansion compares absolute counts of a specified living population at stated points in a culture process. Enrichment or selection changes mixture composition, while activation changes cellular state. Measurements need a consistent cell definition, viability basis, sampling method and interval. Cell concentration can change with dilution or volume, and a higher fraction can result from losing other cells rather than producing more intended cells.",
  "notes": [
    "In a fictional mixture, 20 million intended cells and 80 million other cells become 20 million intended and five million other cells after enrichment. The intended fraction rises from 20/100 to 20/25 without increasing the intended-cell count. In a separate culture example, 20 million viable intended cells becoming 100 million is five-fold expansion. These are invented arithmetic examples, not process-performance targets.",
    "Culture conditions, activation, gene transfer, duration, selection and preservation can change subsets, differentiation, viability and function. A greater count does not establish equal starting-cell quality, a favourable state or greater tumour killing. Activation markers and intended biological activity require suitable separate measurements.",
    "Ghassemi's 2018 study compared shorter and longer preparation in human CAR T-cell experiments, a mouse acute-lymphoblastic-leukaemia model and manufacturing-feasibility work. The reported culture comparison does not prove that every shorter process improves human outcomes or specify one optimal duration for all products.",
    "Dupouy's adult CALM analysis distinguishes factory fold expansion from later blood transgene and flow-cytometry kinetics. In-body detection depends on sampling, proliferation, distribution, loss and expression. A blood copy count is not an absolute whole-body count or a direct functional assay.",
    "Expansion can be one input to a product-specific control strategy. It does not replace identity, purity, viability, potency, contamination testing, lot disposition or clinical readiness. Manufacturing yield, culture time, collection-to-infusion time and patient benefit remain separate outcomes."
  ],
  "links": [
    {
      "label": "FDA: CAR T-cell development guidance, January 2024",
      "url": "https://www.fda.gov/media/156896/download"
    },
    {
      "label": "Ghassemi et al., 2018: defined culture-duration comparisons and mouse experiments",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30030295/"
    },
    {
      "label": "Dupouy et al., 2022: factory expansion and adult CALM cellular kinetics",
      "url": "https://pubmed.ncbi.nlm.nih.gov/36970059/"
    }
  ],
  "related": [
    "car-t-manufacturing-process",
    "cell-therapy-cold-chain",
    "cellular-kinetics-and-persistence",
    "cell-manufacturing-outcomes"
  ],
  "category": "Biology basics",
  "kind": "term",
  "asOf": "2026-11-09",
  "sections": [
    "cell-therapy"
  ]
},
{
  "id": "cell-manufacturing-outcomes",
  "name": "Cell-manufacturing outcomes and nonconforming products",
  "aka": [
    "cell manufacturing failure",
    "out-of-specification cell product",
    "OOS cell product",
    "manufacturing success rate",
    "shipment success rate"
  ],
  "tldr": "Making a cell product, meeting its quality requirements, shipping it and treating a person are different outcomes. A report's definition and denominator determine what its success rate means.",
  "summary": "A process can stop without a product, produce a nonconforming lot, make a conforming product that is never shipped, or supply material that is never infused. Out-of-specification means at least one stated requirement was missed; it does not determine which attribute, severity or disposition applies. Studies sometimes include such lots within manufacturing failure, while others report separate categories. Keep orders, collections, runs, batches, people, cancellations and follow-up with the reported measure.",
  "notes": [
    "In a fictional 100-collection pathway, 94 produce completed products, four of those 94 miss a stated specification, and 85 people are ultimately infused. Completion, conformity and infusion have different numerators and can require different denominators. These invented numbers do not define a standard manufacturing-success metric, describe a real cohort or imply that an out-of-specification product was used.",
    "Iwamoto's 2025 report covers Japanese tisagenlecleucel manufacturing from August 2019 to July 2023. Its manufacturing-success numerator is batches meeting health-authority release criteria; its shipment-success numerator also includes selected nonconforming products made available for shipment. Both use initiated batches excluding specified cancellations during manufacturing. Cancellation rate instead uses all initiated batches and can include cancellations after receipt. The methods report no formal statistical analysis; observed before/after changes do not isolate a causal process effect.",
    "The UK National CAR T Panel's 2025 retrospective report uses manufacturing failure to include no product and out-of-specification product. Approved, remanufactured, infused and never-infused people remain separate groups. Its report of no statistically significant outcome differences is not a demonstration of equivalence, and its associations do not establish individual risk or treatment selection.",
    "Kato's 2025 single-arm Japanese report enrolled 29 people and infused 28, with 23 DLBCL and five ALL recipients. Response was assessed in 15 of the 23 DLBCL recipients; it is not correct to give the evaluable response denominator as all 23. The abstract's batch denominators also differ by missed attribute: low viability 15/24, low dose 8/23 DLBCL and high dose 4/5 ALL. Do not combine those fractions or treat single-arm comparisons as proof of equal safety or efficacy.",
    "The Kato report's NCT04094311 identifies a specific clinical supply pathway for nonconforming tisagenlecleucel. The captured registry remains a larger recruiting study with no posted results, not just that dated published cohort. Registry design, national supply rules and a report of use do not authorise use of another nonconforming lot or establish a local treatment slot.",
    "Record the missed specification, test method, material, lot, jurisdiction and programme. Selected access can involve a separate authorised pathway and case-specific quality and clinical assessment; a low-viability miss is not interchangeable with a dose miss or contamination. A conforming product also does not establish patient readiness or clinical benefit."
  ],
  "links": [
    {
      "label": "FDA: CAR T-cell development guidance, January 2024",
      "url": "https://www.fda.gov/media/156896/download"
    },
    {
      "label": "Iwamoto et al., 2025: Japan manufacturing and shipment definitions",
      "url": "https://pubmed.ncbi.nlm.nih.gov/40066375/"
    },
    {
      "label": "UK National CAR T Panel, 2025: source-defined manufacturing failure and patient outcomes",
      "url": "https://pubmed.ncbi.nlm.nih.gov/40032870/"
    },
    {
      "label": "Kato et al., 2025: single-arm nonconforming tisagenlecleucel cohort",
      "url": "https://pubmed.ncbi.nlm.nih.gov/40377509/"
    },
    {
      "label": "ClinicalTrials.gov: NCT04094311, design and dated registry state",
      "url": "https://clinicaltrials.gov/study/NCT04094311"
    }
  ],
  "related": [
    "car-t-manufacturing-process",
    "cell-therapy-release-testing",
    "vein-to-vein-time",
    "apheresis",
    "chain-of-identity-and-custody"
  ],
  "category": "Methods and models",
  "kind": "term",
  "asOf": "2026-11-09",
  "sections": [
    "cell-therapy"
  ]
},
];
