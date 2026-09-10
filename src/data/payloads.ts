/**
 * Payload & linker registry for antibody-drug conjugates.
 * `adcs` holds product entity ids in this corpus that use the payload or linker.
 */
export type Payload = {
  id: string; name: string; aka?: string;
  class: "Topoisomerase-I inhibitor" | "Tubulin inhibitor" | "DNA crosslinker (PBD dimer)" | "DNA cleaver" | "DNA alkylator";
  mechanism: string;
  permeable: boolean; // membrane-permeable free payload → bystander effect
  effluxSubstrate: "yes" | "partial" | "low" | "unknown";
  typicalDar: string;
  toxicities: string;
  adcs: string[];
  note?: string;
};

export type Linker = {
  id: string; name: string;
  type: "cleavable" | "non-cleavable";
  trigger: string;
  releases: string;
  adcs: string[];
  note?: string;
};

export const payloads: Payload[] = [
  { id: "sn-38", name: "SN-38", aka: "7-ethyl-10-hydroxycamptothecin", class: "Topoisomerase-I inhibitor",
    mechanism: "Active metabolite of irinotecan; stabilises TOP1–DNA cleavage complexes, causing replication-associated double-strand breaks.",
    permeable: true, effluxSubstrate: "yes", typicalDar: "~7.6",
    toxicities: "Neutropenia, diarrhoea (UGT1A1*28 homozygotes at higher risk), alopecia.",
    adcs: ["sacituzumab-govitecan"], note: "Moderate potency (nM) compensated by very high DAR and a linker that releases payload in the tumour microenvironment." },
  { id: "dxd", name: "DXd", aka: "MAAA-1181a, exatecan derivative", class: "Topoisomerase-I inhibitor",
    mechanism: "Exatecan-derived TOP1 inhibitor ~10× more potent than SN-38; short systemic half-life once released.",
    permeable: true, effluxSubstrate: "partial", typicalDar: "8 (T-DXd), 4 (Dato-DXd)",
    toxicities: "Interstitial lung disease/pneumonitis, nausea, neutropenia, fatigue; stomatitis and ocular surface events with Dato-DXd.",
    adcs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "patritumab-deruxtecan", "ifinatamab-deruxtecan", "raludotatug-deruxtecan"] },
  { id: "exatecan", name: "Exatecan (and derivatives)", aka: "DX-8951; Ed-04 in iza-bren; ZD06519", class: "Topoisomerase-I inhibitor",
    mechanism: "Highly potent camptothecin analogue; the parent scaffold for many next-generation payloads (iza-bren's Ed-04, Zymeworks' ZD06519, MediLink's C24).",
    permeable: true, effluxSubstrate: "partial", typicalDar: "8",
    toxicities: "Myelosuppression (notably with iza-bren), nausea, ILD class signal.",
    adcs: ["izalontamab-brengitecan", "tilatamig-samrotecan", "ak146d1", "puxitatug-samrotecan"], note: "Hydrophilic linkers are what make DAR 8 exatecan ADCs manufacturable." },
  { id: "t030", name: "T030 (belotecan derivative)", aka: "KL610023", class: "Topoisomerase-I inhibitor",
    mechanism: "Belotecan-derived TOP1 inhibitor used in sacituzumab tirumotecan; reported to be a weaker efflux-pump substrate than SN-38.",
    permeable: true, effluxSubstrate: "low", typicalDar: "~7.4",
    toxicities: "Stomatitis, neutropenia, anaemia, nausea.",
    adcs: ["sacituzumab-tirumotecan"] },
  { id: "mmae", name: "MMAE", aka: "monomethyl auristatin E, vedotin", class: "Tubulin inhibitor",
    mechanism: "Synthetic dolastatin-10 analogue; blocks tubulin polymerisation, arresting mitosis. Sub-nanomolar potency.",
    permeable: true, effluxSubstrate: "yes", typicalDar: "~4",
    toxicities: "Peripheral neuropathy, neutropenia, rash and skin reactions (Nectin-4), hyperglycaemia (enfortumab), ocular events (tisotumab).",
    adcs: ["enfortumab-vedotin", "brentuximab-vedotin", "tisotumab-vedotin", "telisotuzumab-vedotin", "disitamab-vedotin", "zilovertamab-vedotin", "cmg901"] },
  { id: "mmaf", name: "MMAF", aka: "monomethyl auristatin F, mafodotin", class: "Tubulin inhibitor",
    mechanism: "Charged C-terminal phenylalanine variant of MMAE; poorly membrane-permeable, so little bystander killing.",
    permeable: false, effluxSubstrate: "low", typicalDar: "~4",
    toxicities: "Corneal keratopathy (belantamab), thrombocytopenia.",
    adcs: ["belantamab-mafodotin"] },
  { id: "dm1", name: "DM1", aka: "mertansine, emtansine", class: "Tubulin inhibitor",
    mechanism: "Maytansinoid binding tubulin at the vinca site; released as Lys-MCC-DM1 from non-cleavable linker (impermeable).",
    permeable: false, effluxSubstrate: "yes", typicalDar: "~3.5",
    toxicities: "Thrombocytopenia, hepatotoxicity (transaminases), peripheral neuropathy.",
    adcs: ["trastuzumab-emtansine"] },
  { id: "dm4", name: "DM4", aka: "ravtansine, soravtansine", class: "Tubulin inhibitor",
    mechanism: "Maytansinoid released via disulfide cleavage; S-methylated metabolite is permeable, giving bystander effect.",
    permeable: true, effluxSubstrate: "yes", typicalDar: "~3.5",
    toxicities: "Ocular (blurred vision, keratopathy), peripheral neuropathy, nausea.",
    adcs: ["mirvetuximab-soravtansine"] },
  { id: "pbd-sg3199", name: "PBD dimer (SG3199 / tesirine)", aka: "pyrrolobenzodiazepine dimer", class: "DNA crosslinker (PBD dimer)",
    mechanism: "Sequence-selective interstrand DNA crosslinks in the minor groove; picomolar potency, cell-cycle independent.",
    permeable: true, effluxSubstrate: "low", typicalDar: "~2",
    toxicities: "Oedema/effusions, photosensitivity, skin reactions, thrombocytopenia; narrow window has limited solid-tumour use.",
    adcs: ["zynlonta"] },
  { id: "calicheamicin", name: "Calicheamicin", aka: "ozogamicin (N-acetyl-γ-calicheamicin)", class: "DNA cleaver",
    mechanism: "Enediyne antibiotic that binds the DNA minor groove and generates diradicals causing double-strand breaks.",
    permeable: true, effluxSubstrate: "yes", typicalDar: "2–3 (heterogeneous)",
    toxicities: "Hepatotoxicity including veno-occlusive disease, myelosuppression; first-generation linker instability.",
    adcs: ["gemtuzumab-ozogamicin"] },
  { id: "duocarmycin", name: "Duocarmycin (seco-DUBA)", aka: "duocarmazine", class: "DNA alkylator",
    mechanism: "Alkylates adenine N3 in the DNA minor groove; active in non-dividing cells.",
    permeable: true, effluxSubstrate: "unknown", typicalDar: "~2.8",
    toxicities: "Ocular toxicity and ILD (trastuzumab duocarmazine, whose BLA was withdrawn).",
    adcs: [], note: "Trastuzumab duocarmazine (SYD985) showed PFS benefit in TULIP but was not approved in the US; included as a class reference." },
];

export const linkers: Linker[] = [
  { id: "cl2a", name: "CL2A", type: "cleavable", trigger: "pH-sensitive carbonate hydrolysis (and lysosomal)", releases: "Free SN-38 in tumour microenvironment and inside cells", adcs: ["sacituzumab-govitecan"], note: "Deliberately moderate stability: ~50% payload released over ~1 day in serum, giving extracellular bystander delivery." },
  { id: "ggfg", name: "Tetrapeptide GGFG (maleimide-GGFG-aminomethyl)", type: "cleavable", trigger: "Lysosomal cathepsins (B, L)", releases: "Free DXd (membrane-permeable)", adcs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "patritumab-deruxtecan", "ifinatamab-deruxtecan", "raludotatug-deruxtecan"], note: "Very stable in plasma; the design that enabled DAR 8 with low aggregation." },
  { id: "mc-vc-pabc", name: "mc-Val-Cit-PABC", type: "cleavable", trigger: "Cathepsin B cleavage of Val-Cit dipeptide; self-immolative PABC spacer", releases: "Free MMAE", adcs: ["enfortumab-vedotin", "brentuximab-vedotin", "tisotumab-vedotin", "telisotuzumab-vedotin", "disitamab-vedotin"], note: "The workhorse linker of second-generation ADCs; susceptible to neutrophil elastase and carboxylesterase Ces1c in mice, less so in humans." },
  { id: "smcc", name: "SMCC (thioether, non-cleavable)", type: "non-cleavable", trigger: "Complete antibody degradation in the lysosome", releases: "Lys-MCC-DM1, charged and impermeable (no bystander)", adcs: ["trastuzumab-emtansine"], note: "Explains T-DM1's inactivity in HER2-low disease and its inferiority to T-DXd." },
  { id: "sulfo-spdb", name: "Sulfo-SPDB (disulfide)", type: "cleavable", trigger: "Glutathione/disulfide reduction inside the cell", releases: "DM4 → S-methyl-DM4 (permeable)", adcs: ["mirvetuximab-soravtansine"] },
  { id: "hydrazone", name: "Acid-labile hydrazone (AcBut)", type: "cleavable", trigger: "Low pH in endosomes/lysosomes; also slowly in plasma", releases: "Calicheamicin", adcs: ["gemtuzumab-ozogamicin"], note: "Plasma instability contributed to Mylotarg's first-generation toxicity." },
  { id: "val-ala", name: "Val-Ala dipeptide", type: "cleavable", trigger: "Cathepsin cleavage", releases: "PBD dimer SG3199", adcs: ["zynlonta"], note: "Less hydrophobic than Val-Cit; used with PEG8 spacer in tesirine." },
  { id: "mc-non-cleavable", name: "Maleimidocaproyl (mc), non-cleavable", type: "non-cleavable", trigger: "Antibody degradation", releases: "Cys-mc-MMAF (impermeable)", adcs: ["belantamab-mafodotin"] },
  { id: "hydrophilic-next-gen", name: "Hydrophilic next-generation linkers (TMALIN, Dolaflexin, sulfonyl-pyrimidine, PEG-containing)", type: "cleavable", trigger: "Protease and/or pH; TMALIN is cleaved in the tumour microenvironment and lysosome", releases: "TOP1 payloads at DAR 8 without aggregation", adcs: ["sacituzumab-tirumotecan", "izalontamab-brengitecan"], note: "Hydrophilicity, not payload chemistry, is what allows DAR 8 exatecan-class ADCs. MediLink's TMALIN is licensed to Zai Lab, BioNTech, and Roche." },
];
