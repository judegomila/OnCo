import type { TermInput } from "@/lib/schema";
import { linkers, payloads } from "./payloads";
import { adcPayloadFrontier } from "./adc-payload-frontier";

const asOf = "2026-09-09";
type T = Omit<TermInput, "kind" | "asOf" | "category"> & Partial<Pick<TermInput, "asOf">>;
const t = (x: T): TermInput => ({ kind: "term", asOf, category: "ADC chemistry", ...x });

/** Hand-written explanations; product links come from the payload and linker registry so the two never drift apart. */
const PAYLOAD_TEXT: Record<string, { tldr: string; summary: string; asOf?: string; aka?: string[]; wikipedia?: string; wikipediaChecked?: string; related?: string[]; notes?: string[]; links?: { label: string; url: string }[] }> = {
  "sn-38": {wikipedia:"https://en.wikipedia.org/wiki/SN-38",
    "tldr": "SN-38 is an irinotecan metabolite used as a DNA-damaging payload in sacituzumab govitecan. Its release, loading and safety need the context of the whole product.",
    "summary": "SN-38 stabilises the normally temporary TOP1-DNA cleavage complex, interfering with DNA resealing. It is chemically distinct from irinotecan and from the other camptothecin-derived ADC cargo.\n\nThe sacituzumab govitecan label describes a hydrolysable CL2A linkage and mean loading of seven to eight SN-38 molecules per antibody. That is a product example, rather than a loading requirement dictated by free-drug potency. The label warns about neutropenia and diarrhoea; reduced UGT1A1 activity increases specified blood-count risks. A transporter experiment does not establish a clinical sequencing rule.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "TRODELVY prescribing information: SN-38, loading and safety",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      },
      {
        "label": "Cardillo et al.: prototype CL2A-SN-38 conjugate (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21372224/"
      }
    ],
    "related": ["bystander-effect","efflux-pump","topoisomerase-inhibitors","irinotecan"],
    "aka": [
      "7-ethyl-10-hydroxycamptothecin"
    ]
  },
  "dxd": {wikipedia:"https://en.wikipedia.org/wiki/Deruxtecan",
    "tldr": "DXd is an exatecan-derived topoisomerase poison. Its released chemical, attached linker-drug and complete antibody conjugates are different objects.",
    "summary": "DXd, also called MAAA-1181a, is the released TOP1 poison. Deruxtecan denotes a linker-DXd component. Neither is simply an alias for every exatecan derivative.\n\nThe T-DXd and Dato-DXd labels describe mean loading of eight and four respectively. A common free chemical does not impose the same loading, exposure or safety on each conjugate. Permeability and local bystander activity were measured for defined species and models; these findings alone do not explain all clinical benefit in HER2-low disease or guarantee limited systemic harm.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "ENHERTU prescribing information: DXd, loading and transporters",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
      },
      {
        "label": "DATROWAY prescribing information: DXd and mean loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
      },
      {
        "label": "Ogitani et al.: released species, membrane assays and local bystander models (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27166974/"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": ["bystander-effect","efflux-pump","topoisomerase-inhibitors","ild"],
    "aka": [
      "MAAA-1181a"
    ]
  },
  "t030": {wikipedia:"https://en.wikipedia.org/wiki/Belotecan",
    "tldr": "T030, also called KL610023, is the belotecan-derived payload in SKB264. It is distinct from the TL033 drug-linker intermediate.",
    "summary": "The SKB264 preclinical paper identifies KL610023, also named T030, as a belotecan-derived TOP1 inhibitor. TL033 denotes the drug-linker intermediate, and SKB264 denotes the complete TROP2-directed ADC.\n\nThe study reports approximately 7.4 payload molecules per antibody by reversed-phase chromatography and a TOP1-mediated DNA relaxation assay. Its cell and animal work does not establish a specified ABCB1 or ABCG2 comparison against SN-38. Lower efflux susceptibility and better clinical sequencing should remain unestablished here until supported by the relevant direct experiment.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "SKB264 structure, TOP1 assay and animal pharmacokinetics (2023)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36620535/"
      }
    ],
    "related": ["bystander-effect","efflux-pump","topoisomerase-inhibitors"],
    "aka": [
      "T030",
      "KL610023"
    ]
  },
  "mmae": {wikipedia:"https://en.wikipedia.org/wiki/Monomethyl_auristatin_E",
    "tldr": "MMAE is a tubulin-disrupting auristatin cargo. Its released-drug behaviour helps explain a particular conjugate, but does not make all vedotin products equivalent.",
    "summary": "Monomethyl auristatin E disrupts tubulin-dependent cell division. Vedotin denotes the linked component used in named ADCs, rather than free MMAE alone.\n\nThe brentuximab vedotin label describes proteolytic release and mean loading of about four. Cellular transporter and bystander experiments need their exact construct and model. Antigen distribution, exposure, processing and sensitivity of neighbouring cells also influence the effect. Peripheral neuropathy and blood-count effects in a named product are clinical findings, distinct from a free-MMAE membrane assay.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "ADCETRIS prescribing information: MMAE, loading and safety",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3904f8dd-1aef-3490-e48f-bd55f32ed67f"
      },
      {
        "label": "Li et al.: intracellular MMAE release and bystander models (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26921341/"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": ["bystander-effect","efflux-pump"],
    "aka": [
      "monomethyl auristatin E"
    ]
  },
  "mmaf": {wikipedia:"https://en.wikipedia.org/wiki/Monomethyl_auristatin_F",
    "tldr": "Free MMAF and the cysteine-containing metabolite released by a mafodotin ADC are different chemicals. Their membrane access and transporter findings must be kept separate.",
    "summary": "Monomethyl auristatin F is a tubulin-disrupting auristatin. Early experiments inferred reduced access of the free compound to cells; reduced access does not mean zero passage across every membrane or absence of injury to neighbouring healthy tissues.\n\nThe belantamab mafodotin label identifies cys-mcMMAF as a released catabolite. Its transporter statements differ from experiments on free MMAF because the materials are different. The product has ocular and blood-count risks despite limited bystander activity in specified models.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "Doronina et al.: MMAF conjugates and released catabolites (2006)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16417259/"
      },
      {
        "label": "BLENREP prescribing information: mcMMAF and cys-mcMMAF",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": ["bystander-effect","efflux-pump"],
    "aka": [
      "monomethyl auristatin F"
    ]
  },
  "dm1": {wikipedia:"https://en.wikipedia.org/wiki/Mertansine",
    "tldr": "DM1 is a tubulin-disrupting maytansinoid. Free DM1, the MCC-DM1 component and a lysine-containing released catabolite have different chemical identities.",
    "summary": "DM1, also called mertansine, is the maytansinoid cargo in trastuzumab emtansine. Emtansine denotes its MCC-DM1 linked component. The product label distinguishes DM1, MCC-DM1 and Lys-MCC-DM1 analytes.\n\nLow permeability measured for a lysine-containing catabolite is not a measurement of free DM1. It also does not establish a clinical requirement for uniformly high HER2 or explain a comparison of whole ADCs by itself. Labelled product risks include thrombocytopenia, liver injury and peripheral neuropathy.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "KADCYLA prescribing information: description, mechanism and pharmacology",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"
      },
      {
        "label": "Ogitani et al.: released species, membrane assays and local bystander models (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27166974/"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": ["bystander-effect","efflux-pump"],
    "aka": [
      "mertansine"
    ]
  },
  "dm4": {wikipedia:"https://en.wikipedia.org/wiki/Ravtansine",
    "tldr": "DM4 is a tubulin-disrupting maytansinoid. Its linked component, unconjugated form and S-methyl metabolite should be named separately.",
    "summary": "DM4, also called ravtansine, is attached through sulfo-SPDB in mirvetuximab soravtansine. The product label distinguishes unconjugated DM4 and S-methyl-DM4 and reports P-gp substrate behaviour for both.\n\nRelated SPDB-DM4 experiments describe catabolites and bystander activity in cells and xenografts. Those experiments are not an exact sulfo-SPDB chemical or clinical comparison with DM1. The mirvetuximab label gives mean loading of 3.4 and important ocular and other product risks.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"
      },
      {
        "label": "Kellogg et al.: SPDB-DM4 catabolites in cell and xenograft models (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21425776/"
      }
    ],
    "related": ["bystander-effect","efflux-pump"],
    "aka": [
      "ravtansine"
    ]
  },
  "pbd-sg3199": {wikipedia:"https://en.wikipedia.org/wiki/Pyrrolobenzodiazepine",
    "tldr": "SG3199 is a DNA-crosslinking PBD dimer. Tesirine, also called SG3249, is its drug-linker component and is not a free-SG3199 synonym.",
    "summary": "SG3199 forms DNA crosslinks in the minor groove. Limited helix distortion does not make its damage undetectable or independent of DNA repair: the primary study tested repair-defective and multidrug-resistant cells.\n\nThe loncastuximab tesirine label describes mean loading of 2.3 SG3249 components per antibody and release of SG3199. Potency in a cell panel does not imply a wide clinical safety margin, no transporter susceptibility or activity in every slow-growing tumour. The label and a later cell study give different ABCG2/BCRP findings; both contexts are retained below.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"
      },
      {
        "label": "SG3199 DNA-crosslinking and resistance models (2018)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29992976/"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": [
      "bystander-effect",
      "efflux-pump"
    ],
    "aka": [
      "SG3199",
      "pyrrolobenzodiazepine dimer"
    ]
  },
  "calicheamicin": {wikipedia:"https://en.wikipedia.org/wiki/Calicheamicin",
    "tldr": "Calicheamicins are DNA-damaging enediyne cargo. The modified components used in ozogamicin ADCs should be distinguished from unmodified family members.",
    "summary": "Calicheamicin-family enediynes can produce DNA strand injury after activation. The ozogamicin labels describe chemically modified calicheamicin components and their processing, rather than an interchangeable free chemical for every family member.\n\nGemtuzumab ozogamicin has mean loading of two to three components, while inotuzumab ozogamicin has mean loading of six in the respective labels. Their distributions differ too. A free calicheamicin gamma1 transporter assay is not an assay of every released ozogamicin species. Liver injury and blood-count effects are important product risks.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "MYLOTARG prescribing information: modified calicheamicin and loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05"
      },
      {
        "label": "BESPONSA prescribing information: modified calicheamicin and loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7014b1-c775-411d-b374-8113248b4077"
      },
      {
        "label": "Paired-cell transporter studies of specified ADC payloads (2026)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41668804/"
      }
    ],
    "related": [
      "bystander-effect",
      "efflux-pump"
    ]
  },
  "duocarmycin": {wikipedia:"https://en.wikipedia.org/wiki/Duocarmycin",
    "tldr": "Duocarmycin payload designs damage DNA by alkylation. Their prodrugs, activated chemicals and linker-drugs are distinct, and preclinical activity does not establish benefit in every slow-growing cancer.",
    "summary": "Duocarmycin designs combine DNA binding and alkylating features. The SYD985 chemistry study distinguishes an inactive seco prodrug from the activated drug and its attached linker-drug. It reports a mean loading of about 2.8 after fractionation of the particular preparation.\n\nThese properties are not interchangeable across all duocarmycin analogues. TULIP tested the complete trastuzumab duocarmazine product in previously treated HER2-positive advanced breast cancer; ocular toxicity affected tolerability. That study does not establish that a payload family treats all indolent or TOP1-resistant cancers.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "Elgersma et al.: duocarmycin linker-drug design and SYD985 composition (2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25635711/"
      },
      {
        "label": "TULIP randomised phase 3 report (2024)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39442070/"
      },
      {
        "label": "Trastuzumab duocarmazine phase 1 study (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31257177/"
      }
    ],
    "related": [
      "bystander-effect",
      "efflux-pump"
    ]
  },
  "af-hpa": {
    "tldr": "AF-HPA is an auristatin cargo used in the Dolaflexin platform. It can convert to active auristatin F, which has less access across membranes.",
    "summary": "The Dolaflexin preclinical studies distinguish membrane-accessible auristatin F-hydroxypropylamide, or AF-HPA, from its less membrane-accessible but still active auristatin F metabolite. Auristatin F is not the same chemical as monomethyl auristatin F.\n\nThe XMT-1536 preclinical report describes roughly 10 to 15 AF-HPA molecules per antibody. This is a preparation-specific report, rather than a fixed mean or a common loading of eight. The earlier polyacetal Fleximer study used a vinca derivative; its platform name must not be treated as evidence for Dolaflexin composition. Cell and animal activity does not establish patient benefit or complete payload confinement.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "Dolaflexin: AF-HPA and auristatin F in preclinical models (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33722857/"
      },
      {
        "label": "XMT-1536 preclinical composition and NaPi2b-directed models (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33722858/"
      },
      {
        "label": "Polyacetal Fleximer with a vinca derivative, a distinct platform (2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26113086/"
      }
    ],
    "related": [
      "bystander-effect",
      "efflux-pump"
    ],
    "aka": [
      "AF-HPA",
      "auristatin F-hydroxypropylamide"
    ]
  },
  "dm21-c-maytansinoid-system": {
    "tldr": "DM21-C is a peptide-linked maytansinoid system used in the investigational ADAM9-directed IMGC936 construct. Its attached component and released metabolites should be identified separately.",
    "summary": "The IMGC936 preclinical report describes a DM21-C maytansinoid system with a cleavable tripeptide, site-specific conjugation and loading of approximately two. Earlier peer-reviewed chemical work studied peptide-cleavable self-immolative maytansinoids with different side chains and stereochemistry. That design family should not be collapsed into DM1 or DM4.\n\nA 2019 conference abstract reports DM51 as a major released catabolite of its DM21-C conjugates by LC-MS. That conference observation does not make DM51 an alias for the attached DM21-C system or identify every compound number in related papers. The IMGC936 phase 1/2 registry is completed and has posted results; no patient-benefit estimate is inferred here from the preclinical report or registry state.",
    "asOf": "2026-11-09",
    "links": [
      {
        "label": "IMGC936 with DM21-C: preclinical studies (2022)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35511740/"
      },
      {
        "label": "Peptide-cleavable self-immolative maytansinoid conjugates (2019)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31620224/"
      },
      {
        "label": "AACR 2019 abstract 538: DM21-C and DM51, conference evidence",
        "url": "https://doi.org/10.1158/1538-7445.AM2019-538"
      },
      {
        "label": "IMGC936 registry NCT04622774, last update 15 January 2025",
        "url": "https://clinicaltrials.gov/study/NCT04622774"
      }
    ],
    "related": [
      "bystander-effect",
      "efflux-pump"
    ],
    "aka": [
      "DM21-C"
    ]
  }
};

const CLASS_TEXT: Array<{ id: string; name: string; aka: string[]; tldr: string; summary: string; related: string[]; matchClass: string; wikipedia?: string; asOf?: string; notes?: string[]; drugs?: string[]; links?: { label: string; url: string }[] }> = [
  {
    drugs:["izalontamab-brengitecan","tilatamig-samrotecan","ak146d1","puxitatug-samrotecan","clio-8221"],
    notes:[
  "Jo compared exatecan with other TOP1 inhibitors in biochemical/cellular models and studied SLFN11/repair context and an ATR combination. Modeled binding contacts and experimental trapping do not establish a clinical superiority or an approved biomarker cutoff.",
  "Weng tested traceless self-immolative antibody-exatecan conjugates in cells, organoids, xenografts and nonhuman primates. Their activity against specified resistant models is separate from a patient trial showing benefit after a TOP1 ADC.",
  "Murase selected resistant gastric and lung models with preserved HER2 and internalization, identified increased ABCG2 or ABCB1 and restored sensitivity with knockdown or inhibition. This defines a model-specific efflux route, not the mechanism in every resistant patient.",
  "Abelman linked particular acquired TOP1 mutations in a selected metastatic-breast cohort with functional resistance experiments. A different mutation, a copy-number change, low expression and efflux are different findings. Do not infer that any TOP1 alteration predicts the same response to every TOP1 drug.",
  "A 2026 conference analysis pooled baseline TOP1 mutations and copy-number changes in a retrospective cohort and used time to next treatment or discontinuation. The TOP1-altered ADC subgroup was small. These exploratory associations do not validate a clinical selection rule or substitute those endpoints for progression-free or overall survival.",
  "The PBX-7016 medicinal-chemistry publication reports cell/animal work and authors’ statements about phase 1 development. It does not supply a verified clinical efficacy result or activity against every acquired TOP1 mutant.",
  "Zoppoli found SLFN11 associations and knockdown effects across several DNA-damaging drug categories. This supports a cell-response dependency in tested systems, not a rule that a non-TOP1 drug automatically bypasses low SLFN11.",
  "Compare the actual released species at matched exposures, transporter perturbations and appropriate controls. Distinguish binding/trapping, damage markers and completed target death. Use target-positive/negative co-cultures and local versus distant tumor controls for spread, and defined enzymes or cell models for a particular mutant-coverage claim.",
  "Five design questions need separate tests: potency or TOP1-complex trapping; whether a named transporter removes the released species; membrane passage and local neighbouring-cell exposure; activity against a specified altered enzyme; and linker stability and release. The cell’s TOP1 level, checkpoint and repair response are a further biological context, not another chemical lever. Biochemical potency, cellular killing and affinity are not interchangeable measurements. A potency or transporter advantage must be tested against healthy-tissue exposure and tolerability too; a lower effective concentration does not dictate one dose or payload loading. If target access, uptake or release failed, changing the released chemical alone has not shown that the delivery problem was corrected.",
  "Jo’s exatecan study modelled two additional contacts beyond three known contacts and measured stronger experimental trapping in its comparison. Takegawa’s gastric-cancer T-DM1-resistant models supported two possible explanations for DS-8201a activity: reduced handling of DXd by the pumps and compensation by the higher drug-to-antibody ratio. Rampa’s engineered breast models also implicated payload factors, notably efflux. These are defined model and construct comparisons, not proof that one chemistry bypasses every clinical resistance mechanism.",
  "Ogitani’s bystander experiments compared membrane-permeable DXd with the poorly permeable T-DM1 breakdown product Lys-SMCC-DM1, mixed HER2-positive/negative tumours and an opposite-flank tumour. Local killing of target-negative neighbours was not equivalent to a distant systemic effect. Weng’s traceless self-immolative exatecan constructs targeting HER2, HER3 or TROP2 were tested against matched DXd/SN-38 constructs in low-target-expression, large and multidrug-resistant models, with organoid and animal experiments and nonhuman-primate tolerability. Those experiments do not by themselves establish patient benefit after a prior TOP1 conjugate.",
  "A new payload can be a redesigned member of the same mechanism family or a cargo with a different target. Neither label guarantees escape from a cell-response dependency. Abelman’s selected mutations and experiments do not test every proposed cargo or variant. The PBX-7016 chemistry report supplies preclinical results and the authors’ account of phase 1 development, rather than a verified clinical response result. Compare exact released species at matched exposures, and distinguish model evidence, trial status and patient outcomes."
], links:[
  {
    "label": "Jo et al.: exatecan TOP1-DNA trapping and ATR-combination models (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35439320/"
  },
  {
    "label": "Weng et al.: traceless antibody-exatecan resistant-model studies (2023)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36693125/"
  },
  {
    "label": "Murase et al.: efflux-mediated T-DXd resistance in gastric/lung models (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41548044/"
  },
  {
    "label": "Abelman et al.: selected patient TOP1 mutations and functional studies (2025)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/39745368/"
  },
  {
    "label": "Exploratory retrospective TOP1-alteration conference abstract (2026)",
    "url": "https://doi.org/10.1200/JCO.2026.44.16_suppl.e15044"
  },
  {
    "label": "Chun et al.: PBX-7016 preclinical medicinal-chemistry study (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41414896/"
  },
  {
    "label": "Zoppoli et al.: SLFN11 and DNA-damaging drug response (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22927417/"
  },
  {
    "label": "Ogitani et al.: local bystander and distant-tumor controls (2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27166974/"
  },
  {
    "label": "Takegawa et al., DS-8201a in T-DM1-resistant gastric models (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28677116/"
  },
  {
    "label": "Rampa et al., payload factors and sequential conjugates in breast models (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41591991/"
  }
], asOf:"2026-11-11", id: "topoisomerase-i-payloads", name: "Topoisomerase-I inhibitor payloads", aka: ["camptothecin payloads", "TOP1 payloads"], matchClass: "Topoisomerase-I inhibitor", wikipedia: "https://en.wikipedia.org/wiki/Camptothecin",
    tldr: "TOP1 payloads can stabilize a normally temporary enzyme-DNA cutting complex. The resulting injury depends on exposure, the exact chemical and how the cell handles damage.", summary: "Camptothecin-class TOP1 poisons stabilize the enzyme-DNA cleavage complex and impede DNA resealing. Damage can follow encounters with replication machinery. This is different from merely reducing an enzyme’s activity. SN-38, DXd and exatecan are distinct chemical species, even when they share this mechanism.\n\nRedesign can change potency, transporter handling, permeability, stability and release. These are separate measured properties; no family-wide bystander effect, high tolerated loading or clinical resistance-bypass guarantee follows. Delivery, TOP1 availability, repair/checkpoint behavior and the exposure tolerated by healthy tissues still matter.", related: ["topoisomerase-inhibitors", "adc-sequencing", "efflux-pump", "bystander-effect"] },
  {
    asOf:"2026-11-09", links:[{"label":"Ogitani et al.: released species, membrane assays and local bystander models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"},{"label":"BLENREP prescribing information: mcMMAF and cys-mcMMAF","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"},{"label":"KADCYLA prescribing information: description, mechanism and pharmacology","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"},{"label":"Dolaflexin: AF-HPA and auristatin F in preclinical models (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33722857/"},{"label":"IMGC936 with DM21-C: preclinical studies (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/35511740/"}], id: "tubulin-inhibitor-payloads", name: "Tubulin inhibitor payloads", aka: ["auristatins", "auristatin", "maytansinoids", "maytansinoid", "microtubule payloads"], matchClass: "Tubulin inhibitor", wikipedia: "https://en.wikipedia.org/wiki/Mitotic_inhibitor",
    tldr: "Tubulin payloads include auristatins and maytansinoids. The exact released chemical and linker affect cell access and handling.", summary: "MMAE, MMAF, AF-HPA, DM1, DM4 and peptide-linked maytansinoid systems share a broad tubulin mechanism but are distinct designs. The attached component, released catabolite and further metabolite can differ.\n\nFree DM1 must not inherit a Lys-MCC-DM1 membrane measurement. Free MMAF must not inherit the cys-mcMMAF transporter result, and auristatin F is not MMAF. Membrane passage, lysosome-to-cytoplasm transport and export from the cell are different barriers. Product-specific loading, safety and clinical results remain separate from these assays.", related: ["efflux-pump","bystander-effect","af-hpa","dm21-c-maytansinoid-system"] },
  {
    asOf:"2026-11-09", links:[{"label":"SG3199 DNA-crosslinking and resistance models (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/29992976/"},{"label":"ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"},{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}], id: "pbd-dimer-payloads", name: "DNA crosslinker payloads (PBD dimers)", aka: ["pyrrolobenzodiazepine dimers","PBD dimer payloads"], matchClass: "DNA crosslinker (PBD dimer)", wikipedia: "https://en.wikipedia.org/wiki/Pyrrolobenzodiazepine",
    tldr: "PBD dimers crosslink DNA. Their free warheads and linker-drugs need separate names, and cell potency does not define a clinical safety margin.", summary: "Pyrrolobenzodiazepine dimers are DNA-crosslinking cargo designs. SG3199 is a free warhead; SG3249, also called tesirine, is its drug-linker component.\n\nThe SG3199 primary study tested DNA-repair-defective and resistant cells, so limited distortion of DNA does not mean the injury escapes all detection or repair. The loncastuximab label gives a particular mean loading and product safety profile. Neither a common loading near two nor universal low efflux follows from membership in this family.", related: ["pbd-sg3199"] },
  {
    asOf:"2026-11-09", links:[{"label":"MYLOTARG prescribing information: modified calicheamicin and loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05"},{"label":"BESPONSA prescribing information: modified calicheamicin and loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7014b1-c775-411d-b374-8113248b4077"},{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}], id: "dna-cleaver-payloads", name: "DNA cleaver payloads (enediynes)", aka: ["calicheamicin class","enediyne cargo"], matchClass: "DNA cleaver", wikipedia: "https://en.wikipedia.org/wiki/Enediyne",
    tldr: "Enediyne cargo can injure DNA strands after activation. Calicheamicin-family chemicals, attached components and released modified species are distinct.", summary: "The ozogamicin ADCs use modified calicheamicin components. A free calicheamicin gamma1 assay is not automatically a measurement of the species released from either complete product.\n\nGemtuzumab ozogamicin and inotuzumab ozogamicin differ in mean loading and distribution in their labels. Product-related liver and blood-count risks cannot be assigned to an interchangeable family-wide dose. Compare the exact chemical, conjugate and clinical setting.", related: ["calicheamicin"] },
  {
    asOf:"2026-11-09", links:[{"label":"Elgersma et al.: duocarmycin linker-drug design and SYD985 composition (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25635711/"},{"label":"TULIP randomised phase 3 report (2024)","url":"https://pubmed.ncbi.nlm.nih.gov/39442070/"}], id: "dna-alkylator-payloads", name: "DNA alkylator payloads", aka: ["duocarmycins", "seco-DUBA"], matchClass: "DNA alkylator", wikipedia: "https://en.wikipedia.org/wiki/Duocarmycin",
    tldr: "Duocarmycin designs alkylate DNA. Their prodrug activation and preclinical cell effects should be distinguished from a clinical benefit in a defined cancer setting.", summary: "Duocarmycin designs include an inactive seco prodrug, its activated species and an attached linker-drug. Results for one chemical or construct do not establish permeability, transporter behaviour or resistance avoidance for the whole family.\n\nTrastuzumab duocarmazine has been tested in a randomised trial in previously treated HER2-positive advanced breast cancer. That clinical setting is different from a general claim that DNA alkylation treats every slow-growing or TOP1-resistant tumour.", related: ["duocarmycin"] },
];

const LINKER_TEXT: Record<string, { tldr: string; summary: string; asOf?: string; aka?: string[]; wikipedia?: string; wikipediaChecked?: string; related?: string[]; notes?: string[]; links?: { label: string; url: string }[] }> = {
  "cl2a": {wikipedia:"https://en.wikipedia.org/wiki/Sacituzumab_govitecan",
    "asOf": "2026-11-09",
    "tldr": "CL2A is a hydrolysable linker that can release SN-38 from sacituzumab govitecan. Release is not restricted to tumour tissue.",
    "summary": "Hydrolysis of the SN-38 linkage. SN-38.\n\nThe prototype studied in 2011 is distinct from every later commercial preparation. Plasma release can contribute to exposure outside targeted cells; it is not confined to acidic tumour tissue.",
    "links": [
      {
        "label": "TRODELVY prescribing information: SN-38, loading and safety",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
      },
      {
        "label": "Cardillo et al.: prototype CL2A-SN-38 conjugate (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21372224/"
      }
    ],
    "related": ["sn-38","bystander-effect"]
  },
  "ggfg": {wikipedia:"https://en.wikipedia.org/wiki/Trastuzumab_deruxtecan",
    "asOf": "2026-11-09",
    "tldr": "GGFG is a sequence of four amino acids in a protease-cleavable linker used to release DXd. Loading and safety belong to the named conjugate.",
    "summary": "Proteolytic processing of the tetrapeptide-containing linker. DXd after processing of the linker-drug.\n\nNamed products have different mean loading: T-DXd 8 and Dato-DXd 4. Neither a sequence nor high loading alone establishes safety.",
    "links": [
      {
        "label": "Ogitani et al.: DS-8201a preclinical design (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27026201/"
      },
      {
        "label": "ENHERTU prescribing information: DXd, loading and transporters",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
      },
      {
        "label": "DATROWAY prescribing information: DXd and mean loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
      }
    ],
    "related": ["dxd"]
  },
  "mc-vc-pabc": {wikipedia:"https://en.wikipedia.org/wiki/Brentuximab_vedotin",
    "asOf": "2026-11-09",
    "tldr": "mc-Val-Cit-PABC is a peptide-containing linker design that releases MMAE after enzymatic processing. Its behaviour depends on the construct and test conditions.",
    "summary": "Proteolytic cleavage of the valine-citrulline linker and spacer processing. MMAE in the cited vedotin design.\n\nThe whole construct and processing conditions matter. Do not infer universal tumour-only cleavage or a common clinical safety profile.",
    "links": [
      {
        "label": "Doronina et al.: auristatin conjugates (2003)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12778055/"
      },
      {
        "label": "ADCETRIS prescribing information: MMAE, loading and safety",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3904f8dd-1aef-3490-e48f-bd55f32ed67f"
      }
    ],
    "related": ["mmae","bystander-effect"]
  },
  "smcc": {wikipedia:"https://en.wikipedia.org/wiki/Succinimidyl_4-(N-maleimidomethyl)cyclohexane-1-carboxylate",
    "asOf": "2026-11-09",
    "tldr": "SMCC links DM1 to an antibody without a designed payload-cleavage site. Antibody processing can leave a lysine-containing linker-drug catabolite.",
    "summary": "Antibody proteolysis; the linker is not designed as a cleavable payload-release site. Lys-MCC-DM1 and other measured DM1-containing analytes, depending on processing and sample.\n\nLow permeability of the lysine-containing catabolite is not a free-DM1 property. This chemistry alone does not explain a head-to-head clinical outcome.",
    "links": [
      {
        "label": "KADCYLA prescribing information: description, mechanism and pharmacology",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"
      },
      {
        "label": "Ogitani et al.: released species, membrane assays and local bystander models (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27166974/"
      },
      {
        "label": "Human liver S9 catabolism method and retained linker species (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27206324/"
      }
    ],
    "related": ["dm1"]
  },
  "sulfo-spdb": {wikipedia:"https://en.wikipedia.org/wiki/Mirvetuximab_soravtansine",
    "asOf": "2026-11-09",
    "tldr": "Sulfo-SPDB is the disulfide linker used with DM4 in mirvetuximab soravtansine. It differs from the related SPDB used in some model experiments.",
    "summary": "Processing of a disulfide-linked DM4 component. The mirvetuximab label distinguishes unconjugated DM4 and S-methyl-DM4.\n\nDo not equate sulfo-SPDB with the related SPDB linker used in the cited huC242 preclinical experiments.",
    "links": [
      {
        "label": "ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"
      },
      {
        "label": "Kellogg et al.: SPDB-DM4 catabolites in cell and xenograft models (2011)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21425776/"
      }
    ],
    "related": ["dm4"]
  },
  "hydrazone": {wikipedia:"https://en.wikipedia.org/wiki/Hydrazone",
    "asOf": "2026-11-09",
    "tldr": "A hydrazone is an acid-sensitive linkage used in the modified calicheamicin components of ozogamicin conjugates. The particular product and released species matter.",
    "summary": "Hydrolysis of the acid-sensitive linkage. A modified calicheamicin species, followed by activation; not necessarily unmodified calicheamicin gamma1.\n\nAcBut and the attached modified calicheamicin component must be named. The two product labels specify different mean loading and distributions.",
    "links": [
      {
        "label": "MYLOTARG prescribing information: modified calicheamicin and loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05"
      },
      {
        "label": "BESPONSA prescribing information: modified calicheamicin and loading",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7014b1-c775-411d-b374-8113248b4077"
      }
    ],
    "related": ["calicheamicin"]
  },
  "val-ala": {wikipedia:"https://en.wikipedia.org/wiki/Loncastuximab_tesirine",
    "asOf": "2026-11-09",
    "tldr": "Val-Ala is a peptide segment in the tesirine linker-drug system, which releases SG3199 after processing.",
    "summary": "Proteolytic processing of the valine-alanine-containing tesirine component. SG3199 from the SG3249 (tesirine) drug-linker system.\n\nThe cited ADCT-402 study does not establish that every Val-Ala design is easier to manufacture or clinically safer than every Val-Cit design.",
    "links": [
      {
        "label": "Zammarchi et al.: ADCT-402 preclinical studies (2018)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29298756/"
      },
      {
        "label": "ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"
      }
    ],
    "related": ["pbd-sg3199"]
  },
  "mc-non-cleavable": {
    "asOf": "2026-11-09",
    "tldr": "In belantamab mafodotin, antibody processing releases cys-mcMMAF, which retains cysteine and the mc linker.",
    "summary": "Antibody proteolysis; the maleimidocaproyl linkage is protease resistant. cys-mcMMAF in the belantamab mafodotin label.\n\nThe released species retains cysteine and linker material. Catabolism need not mean complete digestion of every antibody molecule.",
    "links": [
      {
        "label": "Doronina et al.: MMAF conjugates and released catabolites (2006)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16417259/"
      },
      {
        "label": "BLENREP prescribing information: mcMMAF and cys-mcMMAF",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"
      },
      {
        "label": "Human liver S9 catabolism method and retained linker species (2016)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27206324/"
      }
    ],
    "related": ["mmaf"]
  },
  "hydrophilic-next-gen": {wikipediaChecked:"2026-09-22",
    "asOf": "2026-11-09",
    "tldr": "Hydrophilic linker and carrier designs are a varied group. Water affinity does not specify a common cargo, release trigger or loading.",
    "summary": "No common cleavage trigger; specify the actual linker and carrier. Depends on the construct: TOP1 cargo, auristatins, vinca derivatives or other cargo.\n\nHydrophilicity, coupling chemistry and release trigger are separate design features. Dolaflexin uses AF-HPA, whereas the earlier polyacetal Fleximer study used a vinca derivative; neither establishes universal efflux escape or loading of eight.\n\nIn SKB264, sulfonyl-pyrimidine is a coupling feature, while the carbonate linkage is discussed as a release site. A polymer carrier, an antibody attachment group, a solubilising segment and a cleavage trigger are different parts of a design. Assess them for the named construct; none alone proves efflux avoidance or clinical tolerability.",
    "links": [
      {
        "label": "Polyacetal Fleximer with a vinca derivative, a distinct platform (2015)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26113086/"
      },
      {
        "label": "Dolaflexin: AF-HPA and auristatin F in preclinical models (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33722857/"
      },
      {
        "label": "XMT-1536 preclinical composition and NaPi2b-directed models (2021)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33722858/"
      },
      {
        "label": "SKB264 structure, TOP1 assay and animal pharmacokinetics (2023)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36620535/"
      }
    ],
    "related": ["t030","efflux-pump","dar"]
  }
};

const payloadTerms: TermInput[] = payloads.map((p) => {
  const x = PAYLOAD_TEXT[p.id];
  const cls = CLASS_TEXT.find((c) => c.matchClass === p.class);
  return t({ id: p.id, name: p.name, aka: [...(x?.aka ?? []), ...(p.aka ? [p.aka] : [])].filter((a, i, arr) => arr.indexOf(a) === i), tldr: x?.tldr ?? `${p.name}: an ADC payload of the ${p.class.toLowerCase()} class.`, summary: x?.summary ?? p.mechanism, asOf: x?.asOf ?? asOf, notes: x?.notes ?? [], ...(p.chemicalObservations ? { chemicalObservations: p.chemicalObservations } : {}), wikipedia: x?.wikipedia, drugs: p.adcs, technologies: ["adc"], terms: ["payload", ...(cls ? [cls.id] : [])], related: x?.related ?? [], ...(x?.links ? { links: x.links } : x?.wikipedia ? { links: [{ label: "Wikipedia", url: x.wikipedia }] } : {}) });
});

const classTerms: TermInput[] = CLASS_TEXT.map((c) => t({ id: c.id, name: c.name, aka: c.aka, asOf: c.asOf ?? asOf, notes: c.notes ?? [], wikipedia: c.wikipedia, tldr: c.tldr, summary: c.summary, technologies: ["adc"], terms: ["payload"], drugs: [...new Set([...(c.drugs ?? []), ...payloads.filter((p) => p.class === c.matchClass).flatMap((p) => p.adcs)])], related: c.related, ...(c.links ? { links: c.links } : c.wikipedia ? { links: [{ label: "Wikipedia", url: c.wikipedia }] } : {}) }));

const linkerTerms: TermInput[] = linkers.map((l) => {
  const x = LINKER_TEXT[l.id];
  return t({ id: l.id, name: l.name, aka: x?.aka ?? [], wikipedia: x?.wikipedia, wikipediaChecked: x?.wikipediaChecked, tldr: x?.tldr ?? `${l.name}: a ${l.type} ADC linker.`, summary: x?.summary ?? `${l.trigger} ${l.releases}`, asOf: x?.asOf ?? asOf, notes: x?.notes ?? [], drugs: l.adcs, technologies: ["adc"], terms: ["linker"], related: x?.related ?? [], ...(x?.links ? { links: x.links } : x?.wikipedia ? { links: [{ label: "Wikipedia", url: x.wikipedia }] } : {}) });
});

/** Payloads, payload classes and linkers as glossary objects, so every cell in the registry links somewhere. */
export const adcChemistry: TermInput[] = [...payloadTerms, ...classTerms, ...linkerTerms, ...adcPayloadFrontier];
