/** Payload and linker examples. Observations identify the exact species and experimental context. */
type ChemicalObservationBase = {
  species: { name: string; entityId?: string };
  conjugate?: { name: string; entityId?: string };
  context: string;
  method: string;
  statement: string;
  evidenceType: "experimental" | "label-stated" | "conference-abstract";
  limitation?: string;
  sources: { label: string; url: string }[];
  checkedOn: string;
  sourceDate?: string;
  sourceVersion?: string;
};
export type ChemicalPropertyObservation = ChemicalObservationBase & (
  | { property: "chemical-identity" | "release" | "membrane-access" | "bystander-killing"; transporters?: never }
  | { property: "transporter-substrate" | "transporter-inhibition"; transporters: string[] }
  | { property: "conjugate-loading"; conjugate: { name: string; entityId?: string }; transporters?: never }
);

export type Payload = {
  id: string; name: string; aka?: string;
  class: "Topoisomerase-I inhibitor" | "Tubulin inhibitor" | "DNA crosslinker (PBD dimer)" | "DNA cleaver" | "DNA alkylator";
  mechanism: string;
  /** Deprecated unscoped fields: omitted rather than treating unmeasured properties as false. */
  permeable?: boolean;
  effluxSubstrate?: "yes" | "partial" | "low" | "unknown";
  /** Named product/preparation examples, not an intrinsic constant of a payload. */
  typicalDar: string;
  toxicities: string;
  adcs: string[];
  note?: string;
  chemicalObservations?: ChemicalPropertyObservation[];
  checkedOn?: string;
};

export type Linker = {
  id: string; name: string;
  type: "cleavable" | "non-cleavable" | "varies";
  trigger: string;
  releases: string;
  adcs: string[];
  note?: string;
};

export const payloads: Payload[] = [
  {
    "id": "sn-38",
    "name": "SN-38",
    "aka": "7-ethyl-10-hydroxycamptothecin",
    "class": "Topoisomerase-I inhibitor",
    "mechanism": "An irinotecan metabolite that stabilises TOP1-DNA cleavage complexes and interferes with DNA resealing.",
    "typicalDar": "Sacituzumab govitecan: mean 7 to 8 in its label.",
    "toxicities": "Sacituzumab govitecan: neutropenia and diarrhoea; reduced UGT1A1 activity increases specified blood-count risks.",
    "adcs": [
      "sacituzumab-govitecan"
    ],
    "note": "Loading and clinical safety describe the named conjugate, rather than an intrinsic dose or safety property of free SN-38.",
    "chemicalObservations": [{"property":"release","species":{"name":"SN-38"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Hydrolysis of the CL2A linkage releases SN-38 from sacituzumab govitecan.","evidenceType":"label-stated","sources":[{"label":"TRODELVY prescribing information: SN-38, loading and safety","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"SN-38"},"context":"Paired ABCG2-expressing and control cell models.","method":"Cell survival with transporter perturbation and Ko143 inhibition.","statement":"ABCG2-associated resistance to SN-38 was reversed by inhibition in the reported cell assays.","evidenceType":"experimental","sources":[{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}],"checkedOn":"2026-11-09","transporters":["ABCG2"],"limitation":"A cellular resistance experiment does not validate a patient biomarker or a transporter-inhibitor combination."},{"property":"conjugate-loading","species":{"name":"SN-38"},"conjugate":{"name":"Sacituzumab govitecan"},"context":"The named Sacituzumab govitecan product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes a mean of seven to eight SN-38 molecules per antibody.","evidenceType":"label-stated","sources":[{"label":"TRODELVY prescribing information: SN-38, loading and safety","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "dxd",
    "name": "DXd",
    "aka": "MAAA-1181a; an exatecan derivative",
    "class": "Topoisomerase-I inhibitor",
    "mechanism": "A distinct exatecan-derived TOP1 poison; deruxtecan denotes its attached linker-drug component.",
    "typicalDar": "T-DXd: mean 8; Dato-DXd: mean 4 in the respective labels.",
    "toxicities": "T-DXd: interstitial lung disease/pneumonitis and blood-count effects; Dato-DXd has its own ocular and stomatitis risks.",
    "adcs": [
      "trastuzumab-deruxtecan",
      "datopotamab-deruxtecan",
      "patritumab-deruxtecan",
      "ifinatamab-deruxtecan",
      "raludotatug-deruxtecan"
    ],
    "note": "The same released chemical can be used in conjugates with different loading, delivery and exposure. Permeability alone does not explain clinical benefit or tolerability.",
    "chemicalObservations": [{"property":"release","species":{"name":"DXd"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Deruxtecan denotes the linker-DXd component; lysosomal processing releases DXd.","evidenceType":"label-stated","sources":[{"label":"ENHERTU prescribing information: DXd, loading and transporters","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"membrane-access","species":{"name":"DXd (DXd 1 in the cited experiment)"},"context":"Artificial-membrane assay at pH 5.0 and 7.4.","method":"Parallel artificial membrane permeability assay, four-hour incubation.","statement":"DXd 1 had higher measured permeability than the tested DXd 2 and Lys-SMCC-DM1 species.","evidenceType":"experimental","sources":[{"label":"Ogitani et al.: released species, membrane assays and local bystander models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"}],"checkedOn":"2026-11-09","limitation":"The comparison concerns these exact chemicals and assay conditions, rather than every exatecan derivative."},{"property":"bystander-killing","species":{"name":"DXd released from DS-8201a"},"context":"Mixed HER2-positive/negative cell cultures and local versus distant mouse tumour controls.","method":"Co-culture survival and xenograft experiments.","statement":"Neighbouring target-negative cells were affected in the tested mixed models; a separate distant target-negative tumour was not.","evidenceType":"experimental","sources":[{"label":"Ogitani et al.: released species, membrane assays and local bystander models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"}],"checkedOn":"2026-11-09","limitation":"Local bystander activity does not establish a clinical explanation for all HER2-low benefit or absence of systemic toxicity."},{"property":"transporter-substrate","species":{"name":"DXd"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The label lists DXd as a substrate of P-gp, BCRP, MRP1, OATP1B1, OATP1B3 and MATE2-K.","evidenceType":"label-stated","sources":[{"label":"ENHERTU prescribing information: DXd, loading and transporters","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"}],"checkedOn":"2026-11-09","transporters":["ABCB1","ABCG2","ABCC1","OATP1B1","OATP1B3","MATE2-K"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"conjugate-loading","species":{"name":"Deruxtecan linker-DXd component"},"conjugate":{"name":"Trastuzumab deruxtecan"},"context":"The named Trastuzumab deruxtecan product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately eight attached components per antibody.","evidenceType":"label-stated","sources":[{"label":"ENHERTU prescribing information: DXd, loading and transporters","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."},{"property":"conjugate-loading","species":{"name":"Deruxtecan linker-DXd component"},"conjugate":{"name":"Datopotamab deruxtecan"},"context":"The named Datopotamab deruxtecan product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately four attached components per antibody.","evidenceType":"label-stated","sources":[{"label":"DATROWAY prescribing information: DXd and mean loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "t030",
    "name": "T030 (KL610023)",
    "aka": "Belotecan-derived KL610023",
    "class": "Topoisomerase-I inhibitor",
    "mechanism": "Belotecan-derived TOP1 inhibitor; TL033 is the drug-linker intermediate in SKB264.",
    "typicalDar": "SKB264: approximately 7.4 by reversed-phase chromatography in the cited preclinical preparation.",
    "toxicities": "Safety depends on the complete sacituzumab tirumotecan product and clinical setting.",
    "adcs": [
      "sacituzumab-tirumotecan"
    ],
    "note": "No specified transporter comparison with SN-38 is established by the cited structure and pharmacokinetic study.",
    "chemicalObservations": [{"property":"chemical-identity","species":{"name":"KL610023 (T030)"},"context":"SKB264 composition and animal pharmacokinetic study.","method":"Structure characterisation, reversed-phase chromatography and LC-MS/MS.","statement":"The paper distinguishes the KL610023 payload from the TL033 drug-linker intermediate and the complete SKB264 ADC.","evidenceType":"experimental","sources":[{"label":"SKB264 structure, TOP1 assay and animal pharmacokinetics (2023)","url":"https://pubmed.ncbi.nlm.nih.gov/36620535/"}],"checkedOn":"2026-11-09","limitation":"The cited study does not establish lower ABCB1 or ABCG2 susceptibility than SN-38 in a specified transporter assay."},{"property":"conjugate-loading","species":{"name":"KL610023"},"conjugate":{"name":"SKB264"},"context":"The named SKB264 product or preparation described by the source.","method":"Reversed-phase chromatography of the preclinical preparation.","statement":"Approximately 7.4 payload molecules per antibody were reported for the tested preparation.","evidenceType":"experimental","sources":[{"label":"SKB264 structure, TOP1 assay and animal pharmacokinetics (2023)","url":"https://pubmed.ncbi.nlm.nih.gov/36620535/"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "mmae",
    "name": "MMAE",
    "aka": "Monomethyl auristatin E",
    "class": "Tubulin inhibitor",
    "mechanism": "A tubulin-disrupting auristatin; vedotin denotes a linker-MMAE component, rather than free MMAE alone.",
    "typicalDar": "Brentuximab vedotin: mean approximately 4 in its label.",
    "toxicities": "Brentuximab vedotin: peripheral neuropathy and blood-count effects; other vedotin products have additional product-specific risks.",
    "adcs": [
      "enfortumab-vedotin",
      "brentuximab-vedotin",
      "tisotumab-vedotin",
      "telisotuzumab-vedotin",
      "disitamab-vedotin",
      "zilovertamab-vedotin",
      "cmg901"
    ],
    "note": "A shared warhead does not make antigen distribution, exposure, efficacy or toxicity identical across products.",
    "chemicalObservations": [{"property":"release","species":{"name":"MMAE"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Proteolytic processing of brentuximab vedotin releases MMAE.","evidenceType":"label-stated","sources":[{"label":"ADCETRIS prescribing information: MMAE, loading and safety","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3904f8dd-1aef-3490-e48f-bd55f32ed67f"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"MMAE"},"context":"ABCB1-expressing and control cell lines.","method":"Paired-cell cytotoxicity and transporter-inhibitor experiments.","statement":"ABCB1 expression conferred resistance in the tested cell systems.","evidenceType":"experimental","sources":[{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}],"checkedOn":"2026-11-09","transporters":["ABCB1"],"limitation":"Substrate behaviour in cells is separate from a validated clinical cross-resistance rule."},{"property":"bystander-killing","species":{"name":"MMAE released from the tested ADC"},"context":"Target-positive/negative mixed cell and tumour models.","method":"Intracellular release and bystander cytotoxicity experiments.","statement":"The study links intracellular MMAE release to bystander killing in its specified models.","evidenceType":"experimental","sources":[{"label":"Li et al.: intracellular MMAE release and bystander models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/26921341/"}],"checkedOn":"2026-11-09","limitation":"Antibody delivery, processing, exposure and recipient-cell sensitivity also matter."},{"property":"conjugate-loading","species":{"name":"MMAE-linked component"},"conjugate":{"name":"Brentuximab vedotin"},"context":"The named Brentuximab vedotin product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately four MMAE molecules per antibody.","evidenceType":"label-stated","sources":[{"label":"ADCETRIS prescribing information: MMAE, loading and safety","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3904f8dd-1aef-3490-e48f-bd55f32ed67f"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "mmaf",
    "name": "MMAF",
    "aka": "Monomethyl auristatin F",
    "class": "Tubulin inhibitor",
    "mechanism": "A tubulin-disrupting auristatin; free MMAF and the released cys-mcMMAF catabolite are distinct test materials.",
    "typicalDar": "Belantamab mafodotin: mean approximately 4 mafodotin components in its label.",
    "toxicities": "Belantamab mafodotin: ocular toxicity and thrombocytopenia in its specified clinical regimens.",
    "adcs": [
      "belantamab-mafodotin"
    ],
    "note": "Reduced cell access is not zero permeability. Free-MMAF transporter findings cannot stand in for the cys-mcMMAF catabolite.",
    "chemicalObservations": [{"property":"membrane-access","species":{"name":"Free MMAF"},"context":"Comparison with related auristatins in cell assays.","method":"Free-compound cytotoxicity and conjugate catabolism experiments.","statement":"The authors inferred reduced free-compound cell access; this is not proof of zero permeability across every membrane.","evidenceType":"experimental","sources":[{"label":"Doronina et al.: MMAF conjugates and released catabolites (2006)","url":"https://pubmed.ncbi.nlm.nih.gov/16417259/"}],"checkedOn":"2026-11-09"},{"property":"release","species":{"name":"cys-mcMMAF"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Antibody processing releases the cysteine-containing mcMMAF species, rather than simply free MMAF.","evidenceType":"label-stated","sources":[{"label":"BLENREP prescribing information: mcMMAF and cys-mcMMAF","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"Free MMAF"},"context":"HEK293 cells expressing ABCB1, ABCG2 or ABCC1.","method":"Three-day cytotoxicity comparison with vector-control cells.","statement":"These three transporters did not confer resistance to free MMAF in the confirmatory assays.","evidenceType":"experimental","sources":[{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}],"checkedOn":"2026-11-09","transporters":["ABCB1","ABCG2","ABCC1"],"limitation":"This is not a transporter result for cys-mcMMAF."},{"property":"transporter-substrate","species":{"name":"cys-mcMMAF"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The label lists OATP1B1, OATP1B3, MRP1, MRP2, MRP3 and BSEP substrate behaviour and possible P-gp substrate behaviour.","evidenceType":"label-stated","sources":[{"label":"BLENREP prescribing information: mcMMAF and cys-mcMMAF","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"}],"checkedOn":"2026-11-09","transporters":["OATP1B1","OATP1B3","ABCC1","ABCC2","ABCC3","BSEP","ABCB1"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"conjugate-loading","species":{"name":"Mafodotin (mcMMAF) component"},"conjugate":{"name":"Belantamab mafodotin"},"context":"The named Belantamab mafodotin product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately four mafodotin components per antibody.","evidenceType":"label-stated","sources":[{"label":"BLENREP prescribing information: mcMMAF and cys-mcMMAF","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aef7c34c-fef8-407c-99c0-a68aded53c60"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "dm1",
    "name": "DM1",
    "aka": "Mertansine",
    "class": "Tubulin inhibitor",
    "mechanism": "A tubulin-disrupting maytansinoid; the MCC-DM1 component and released lysine-containing catabolite have different chemical identities.",
    "typicalDar": "Trastuzumab emtansine: mean 3.5 in its label.",
    "toxicities": "Trastuzumab emtansine: thrombocytopenia, liver injury and peripheral neuropathy, among other product risks.",
    "adcs": [
      "trastuzumab-emtansine"
    ],
    "note": "Low permeability measured for Lys-SMCC-DM1 is not a free-DM1 measurement or a clinical requirement for uniformly high HER2.",
    "chemicalObservations": [{"property":"chemical-identity","species":{"name":"DM1"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The label distinguishes these plasma analytes; emtansine denotes the MCC-DM1 component.","evidenceType":"label-stated","sources":[{"label":"KADCYLA prescribing information: description, mechanism and pharmacology","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"membrane-access","species":{"name":"Lys-SMCC-DM1"},"context":"Artificial-membrane comparison with two specified DXd derivatives.","method":"Parallel artificial membrane permeability assay at pH 5.0 and 7.4.","statement":"The charged catabolite had low measured permeability under these conditions.","evidenceType":"experimental","sources":[{"label":"Ogitani et al.: released species, membrane assays and local bystander models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"}],"checkedOn":"2026-11-09","limitation":"This is not a measurement of free DM1 and does not establish a required uniform HER2 level in patients."},{"property":"transporter-substrate","species":{"name":"Free DM1"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"DM1 is reported as a P-gp substrate.","evidenceType":"label-stated","sources":[{"label":"KADCYLA prescribing information: description, mechanism and pharmacology","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"}],"checkedOn":"2026-11-09","transporters":["ABCB1"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"conjugate-loading","species":{"name":"DM1"},"conjugate":{"name":"Trastuzumab emtansine"},"context":"The named Trastuzumab emtansine product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes a mean of 3.5 DM1 molecules per antibody.","evidenceType":"label-stated","sources":[{"label":"KADCYLA prescribing information: description, mechanism and pharmacology","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "dm4",
    "name": "DM4",
    "aka": "Ravtansine",
    "class": "Tubulin inhibitor",
    "mechanism": "A tubulin-disrupting maytansinoid; the product label distinguishes unconjugated DM4 and S-methyl-DM4.",
    "typicalDar": "Mirvetuximab soravtansine: mean 3.4 in its label.",
    "toxicities": "Mirvetuximab soravtansine: ocular toxicity, peripheral neuropathy and other product-specific risks.",
    "adcs": [
      "mirvetuximab-soravtansine"
    ],
    "note": "Soravtansine includes the linked component. Related SPDB-DM4 experiments should be distinguished from the clinical sulfo-SPDB construct.",
    "chemicalObservations": [{"property":"chemical-identity","species":{"name":"DM4"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The mirvetuximab soravtansine label distinguishes DM4 from its S-methyl metabolite.","evidenceType":"label-stated","sources":[{"label":"ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"Unconjugated DM4"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Unconjugated DM4 is reported as a P-gp substrate.","evidenceType":"label-stated","sources":[{"label":"ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"}],"checkedOn":"2026-11-09","transporters":["ABCB1"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"S-methyl-DM4"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"S-methyl-DM4 is reported as a P-gp substrate.","evidenceType":"label-stated","sources":[{"label":"ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"}],"checkedOn":"2026-11-09","transporters":["ABCB1"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"bystander-killing","species":{"name":"Catabolites of the tested SPDB-DM4 conjugate"},"context":"huC242 conjugate cell and mouse xenograft experiments.","method":"Catabolite characterisation and preclinical activity comparison.","statement":"The disulfide-linked construct generated membrane-accessible metabolites and bystander effects in the tested models.","evidenceType":"experimental","sources":[{"label":"Kellogg et al.: SPDB-DM4 catabolites in cell and xenograft models (2011)","url":"https://pubmed.ncbi.nlm.nih.gov/21425776/"}],"checkedOn":"2026-11-09","limitation":"SPDB is not identical to the sulfo-SPDB linker in mirvetuximab; do not treat this as a matched clinical comparison with DM1."},{"property":"conjugate-loading","species":{"name":"DM4"},"conjugate":{"name":"Mirvetuximab soravtansine"},"context":"The named Mirvetuximab soravtansine product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately 3.4 DM4 molecules per antibody.","evidenceType":"label-stated","sources":[{"label":"ELAHERE prescribing information: DM4, sulfo-SPDB and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=00c424b5-6ccd-48ab-9e88-1986451120e2"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "pbd-sg3199",
    "name": "SG3199 (PBD dimer)",
    "aka": "Pyrrolobenzodiazepine dimer SG3199",
    "class": "DNA crosslinker (PBD dimer)",
    "mechanism": "A DNA-crosslinking PBD dimer; SG3249 (tesirine) is the attached drug-linker, not a free-SG3199 synonym.",
    "typicalDar": "Loncastuximab tesirine: mean 2.3 SG3249 components in its label.",
    "toxicities": "Loncastuximab tesirine: effusions/oedema, myelosuppression, liver injury and cutaneous/photosensitivity reactions.",
    "adcs": [
      "zynlonta"
    ],
    "note": "Retain the different ABCG2/BCRP findings from the label and cell assays. Low loading does not establish a wide clinical safety margin.",
    "chemicalObservations": [{"property":"release","species":{"name":"SG3199"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Tesirine (SG3249) is the drug-linker component; processing releases the SG3199 PBD dimer.","evidenceType":"label-stated","sources":[{"label":"ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"SG3199"},"context":"Paired multidrug-resistant and sensitive human cell lines.","method":"Cell-survival comparison and verapamil reversal.","statement":"The 2018 study found transporter-associated resistance despite retained cytotoxicity in these models.","evidenceType":"experimental","sources":[{"label":"SG3199 DNA-crosslinking and resistance models (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/29992976/"}],"checkedOn":"2026-11-09","transporters":["ABCB1"]},{"property":"transporter-substrate","species":{"name":"SG3199"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The label reports P-gp substrate behaviour and no BCRP substrate behaviour.","evidenceType":"label-stated","sources":[{"label":"ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"}],"checkedOn":"2026-11-09","transporters":["ABCB1","ABCG2"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"SG3199"},"context":"HEK293 cells expressing ABCB1, ABCG2 or ABCC1.","method":"Confirmatory three-day cell-survival assays.","statement":"The 2026 study reports resistance with each of these transporters.","evidenceType":"experimental","sources":[{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}],"checkedOn":"2026-11-09","transporters":["ABCB1","ABCG2","ABCC1"],"limitation":"The ABCG2 finding differs from the BCRP statement in the product label. Preserve both contexts; neither establishes a clinical selection rule."},{"property":"transporter-inhibition","species":{"name":"Unconjugated SG3199"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"The label reports no inhibition of the listed transporters at clinically relevant unconjugated concentrations; inhibition is a different endpoint from being a substrate.","evidenceType":"label-stated","sources":[{"label":"ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"}],"checkedOn":"2026-11-09","transporters":["ABCB1","ABCG2"],"limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"conjugate-loading","species":{"name":"SG3249 (tesirine)"},"conjugate":{"name":"Loncastuximab tesirine"},"context":"The named Loncastuximab tesirine product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes approximately 2.3 SG3249 components per antibody.","evidenceType":"label-stated","sources":[{"label":"ZYNLONTA prescribing information: SG3199, SG3249 and transporter statements","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "calicheamicin",
    "name": "Calicheamicin-family payloads",
    "aka": "Enediyne cargo, including modified calicheamicins",
    "class": "DNA cleaver",
    "mechanism": "DNA-damaging enediyne cargo; the ozogamicin ADCs carry chemically modified calicheamicin components.",
    "typicalDar": "Gemtuzumab ozogamicin: mean 2 to 3; inotuzumab ozogamicin: mean 6 in their labels.",
    "toxicities": "Ozogamicin products: liver injury including sinusoidal obstruction/veno-occlusive disease, and blood-count effects.",
    "adcs": [
      "gemtuzumab-ozogamicin",
      "inotuzumab-ozogamicin"
    ],
    "note": "The labels describe different loading distributions. Do not equate every family member, attached component and released species.",
    "chemicalObservations": [{"property":"release","species":{"name":"N-acetyl-gamma-calicheamicin dimethylhydrazide"},"context":"Statement in the named product prescribing information.","method":"Label statement; a detailed experimental protocol is not provided here.","statement":"Gemtuzumab ozogamicin hydrolytic processing releases a modified calicheamicin species.","evidenceType":"label-stated","sources":[{"label":"MYLOTARG prescribing information: modified calicheamicin and loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05"}],"checkedOn":"2026-11-09","limitation":"This statement does not establish a patient selection threshold or all-species property."},{"property":"transporter-substrate","species":{"name":"Calicheamicin gamma1"},"context":"ABCB1-expressing and vector-control human cell lines.","method":"Paired-cell survival assays with transporter inhibition.","statement":"ABCB1 conferred resistance to the tested free compound.","evidenceType":"experimental","sources":[{"label":"Paired-cell transporter studies of specified ADC payloads (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41668804/"}],"checkedOn":"2026-11-09","transporters":["ABCB1"],"limitation":"Calicheamicin gamma1 is not chemically identical to the modified species released from an ozogamicin ADC."},{"property":"conjugate-loading","species":{"name":"N-acetyl-gamma-calicheamicin component"},"conjugate":{"name":"Gemtuzumab ozogamicin"},"context":"The named Gemtuzumab ozogamicin product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes an average of two to three components per antibody, with a predominantly zero-to-six distribution.","evidenceType":"label-stated","sources":[{"label":"MYLOTARG prescribing information: modified calicheamicin and loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."},{"property":"conjugate-loading","species":{"name":"N-acetyl-gamma-calicheamicin component"},"conjugate":{"name":"Inotuzumab ozogamicin"},"context":"The named Inotuzumab ozogamicin product or preparation described by the source.","method":"Description in the named product prescribing information.","statement":"The label describes an average of six components per antibody, with a two-to-eight distribution.","evidenceType":"label-stated","sources":[{"label":"BESPONSA prescribing information: modified calicheamicin and loading","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7014b1-c775-411d-b374-8113248b4077"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "duocarmycin",
    "name": "Duocarmycin-family payloads",
    "aka": "DNA-alkylating cargo, including the seco-DUBA design",
    "class": "DNA alkylator",
    "mechanism": "Minor-groove DNA alkylating designs; an inactive seco prodrug and its activated species are distinct chemicals.",
    "typicalDar": "SYD985: mean approximately 2.8 after fractionation in the cited preclinical preparation.",
    "toxicities": "Trastuzumab duocarmazine: ocular toxicity affected tolerability in TULIP.",
    "adcs": [
      "trastuzumab-duocarmazine"
    ],
    "note": "Preclinical chemical activity does not establish benefit in all slow-growing or previously resistant cancers.",
    "chemicalObservations": [{"property":"chemical-identity","species":{"name":"SYD985 duocarmycin linker-drug"},"context":"Preclinical chemical design and trastuzumab-conjugate characterisation.","method":"Synthesis, cell studies, chromatographic fractionation and animal studies.","statement":"The design distinguishes the inactive seco prodrug, active duocarmycin and attached linker-drug.","evidenceType":"experimental","sources":[{"label":"Elgersma et al.: duocarmycin linker-drug design and SYD985 composition (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25635711/"}],"checkedOn":"2026-11-09","limitation":"A property measured for one duocarmycin analogue is not a family-wide result."},{"property":"conjugate-loading","species":{"name":"Duocarmycin linker-drug"},"conjugate":{"name":"SYD985"},"context":"The named SYD985 product or preparation described by the source.","method":"Chemical characterisation and hydrophobic-interaction chromatographic fractionation.","statement":"The fractionated preparation had a mean loading of about 2.8 and predominantly DAR2 and DAR4 species.","evidenceType":"experimental","sources":[{"label":"Elgersma et al.: duocarmycin linker-drug design and SYD985 composition (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25635711/"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "af-hpa",
    "name": "AF-HPA and auristatin F",
    "aka": "Auristatin F-hydroxypropylamide",
    "class": "Tubulin inhibitor",
    "mechanism": "The Dolaflexin auristatin cargo can change from AF-HPA to the active auristatin F metabolite.",
    "typicalDar": "XMT-1536: approximately 10 to 15 AF-HPA molecules per antibody in the cited preclinical report.",
    "toxicities": "The cited platform studies are preclinical and do not define a human adverse-event rate.",
    "adcs": [
      "upifitamab-rilsodotin"
    ],
    "note": "Dolaflexin is not the earlier polyacetal-vinca Fleximer conjugate and does not establish a common loading of eight for hydrophilic designs.",
    "chemicalObservations": [{"property":"release","species":{"name":"AF-HPA"},"context":"Dolaflexin preclinical conjugate and metabolite studies.","method":"Cell and animal characterisation.","statement":"Membrane-accessible AF-HPA can convert to the less membrane-accessible but active auristatin F species.","evidenceType":"experimental","sources":[{"label":"Dolaflexin: AF-HPA and auristatin F in preclinical models (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33722857/"}],"checkedOn":"2026-11-09","limitation":"Auristatin F is distinct from MMAF; the conversion does not establish complete confinement or human safety."},{"property":"conjugate-loading","species":{"name":"AF-HPA"},"conjugate":{"name":"XMT-1536"},"context":"The named XMT-1536 product or preparation described by the source.","method":"Composition reported for the preclinical conjugate preparation.","statement":"The preclinical report describes approximately 10 to 15 AF-HPA molecules per antibody; no fixed mean is inferred from that range.","evidenceType":"experimental","sources":[{"label":"XMT-1536 preclinical composition and NaPi2b-directed models (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/33722858/"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  },
  {
    "id": "dm21-c-maytansinoid-system",
    "name": "DM21-C peptide-linked maytansinoid system",
    "aka": "DM21-C",
    "class": "Tubulin inhibitor",
    "mechanism": "Peptide-linked maytansinoid design exemplified by the DM21-C system in the ADAM9-directed IMGC936 construct.",
    "typicalDar": "IMGC936: approximately 2 in the cited preclinical report.",
    "toxicities": "Preclinical activity and tolerability are separate from patient safety and benefit.",
    "adcs": [],
    "note": "A released metabolite is not an alias for the attached linker-payload. The IMGC936 registry is completed; that state alone says nothing about benefit.",
    "chemicalObservations": [{"property":"chemical-identity","species":{"name":"DM21-C linker-payload system"},"context":"IMGC936 preclinical design.","method":"Chemical design, cell assays, xenografts and nonhuman primate studies.","statement":"DM21-C is used with a cleavable tripeptide and site-specific conjugation in IMGC936.","evidenceType":"experimental","sources":[{"label":"IMGC936 with DM21-C: preclinical studies (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/35511740/"}],"checkedOn":"2026-11-09","limitation":"The preclinical report does not establish patient benefit or a universal property of all maytansinoids."},{"property":"release","species":{"name":"DM51"},"context":"Conjugates described in AACR 2019 abstract 538. This is conference evidence, not a patient outcome report.","method":"LC-MS identification of a major catabolite in the reported conjugate experiments.","statement":"The abstract identifies DM51 as a major released catabolite of its DM21-C conjugates.","evidenceType":"conference-abstract","sources":[{"label":"AACR 2019 abstract 538: DM21-C and DM51","url":"https://doi.org/10.1158/1538-7445.AM2019-538"}],"checkedOn":"2026-11-09","limitation":"DM51 is not an alias for the attached DM21-C system. The Elicit DOI spelling resolved to a different canonical DOI in Crossref; that discrepancy is retained in the source receipt."},{"property":"conjugate-loading","species":{"name":"DM21-C maytansinoid system"},"conjugate":{"name":"IMGC936"},"context":"The named IMGC936 product or preparation described by the source.","method":"Design and characterisation of the preclinical site-specific construct.","statement":"The preclinical report describes loading of approximately two.","evidenceType":"experimental","sources":[{"label":"IMGC936 with DM21-C: preclinical studies (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/35511740/"}],"checkedOn":"2026-11-09","limitation":"This report does not assign a loading constant to every construct carrying this cargo or infer a patient dose."}],
    "checkedOn": "2026-11-09"
  }
];

export const linkers: Linker[] = [
  {
    "id": "cl2a",
    "name": "CL2A",
    "type": "cleavable",
    "trigger": "Hydrolysis of the SN-38 linkage.",
    "releases": "SN-38.",
    "adcs": [
      "sacituzumab-govitecan"
    ],
    "note": "The prototype studied in 2011 is distinct from every later commercial preparation. Plasma release can contribute to exposure outside targeted cells; it is not confined to acidic tumour tissue."
  },
  {
    "id": "ggfg",
    "name": "Tetrapeptide GGFG (maleimide-GGFG-aminomethyl)",
    "type": "cleavable",
    "trigger": "Proteolytic processing of the tetrapeptide-containing linker.",
    "releases": "DXd after processing of the linker-drug.",
    "adcs": [
      "trastuzumab-deruxtecan",
      "datopotamab-deruxtecan",
      "patritumab-deruxtecan",
      "ifinatamab-deruxtecan",
      "raludotatug-deruxtecan"
    ],
    "note": "Named products have different mean loading: T-DXd 8 and Dato-DXd 4. Neither a sequence nor high loading alone establishes safety."
  },
  {
    "id": "mc-vc-pabc",
    "name": "mc-Val-Cit-PABC",
    "type": "cleavable",
    "trigger": "Proteolytic cleavage of the valine-citrulline linker and spacer processing.",
    "releases": "MMAE in the cited vedotin design.",
    "adcs": [
      "enfortumab-vedotin",
      "brentuximab-vedotin",
      "tisotumab-vedotin",
      "telisotuzumab-vedotin",
      "disitamab-vedotin"
    ],
    "note": "The whole construct and processing conditions matter. Do not infer universal tumour-only cleavage or a common clinical safety profile."
  },
  {
    "id": "smcc",
    "name": "SMCC (thioether, non-cleavable)",
    "type": "non-cleavable",
    "trigger": "Antibody proteolysis; the linker is not designed as a cleavable payload-release site.",
    "releases": "Lys-MCC-DM1 and other measured DM1-containing analytes, depending on processing and sample.",
    "adcs": [
      "trastuzumab-emtansine"
    ],
    "note": "Low permeability of the lysine-containing catabolite is not a free-DM1 property. This chemistry alone does not explain a head-to-head clinical outcome."
  },
  {
    "id": "sulfo-spdb",
    "name": "Sulfo-SPDB (disulfide)",
    "type": "cleavable",
    "trigger": "Processing of a disulfide-linked DM4 component.",
    "releases": "The mirvetuximab label distinguishes unconjugated DM4 and S-methyl-DM4.",
    "adcs": [
      "mirvetuximab-soravtansine"
    ],
    "note": "Do not equate sulfo-SPDB with the related SPDB linker used in the cited huC242 preclinical experiments."
  },
  {
    "id": "hydrazone",
    "name": "Acid-labile hydrazone (AcBut)",
    "type": "cleavable",
    "trigger": "Hydrolysis of the acid-sensitive linkage.",
    "releases": "A modified calicheamicin species, followed by activation; not necessarily unmodified calicheamicin gamma1.",
    "adcs": [
      "gemtuzumab-ozogamicin",
      "inotuzumab-ozogamicin"
    ],
    "note": "AcBut and the attached modified calicheamicin component must be named. The two product labels specify different mean loading and distributions."
  },
  {
    "id": "val-ala",
    "name": "Val-Ala dipeptide",
    "type": "cleavable",
    "trigger": "Proteolytic processing of the valine-alanine-containing tesirine component.",
    "releases": "SG3199 from the SG3249 (tesirine) drug-linker system.",
    "adcs": [
      "zynlonta"
    ],
    "note": "The cited ADCT-402 study does not establish that every Val-Ala design is easier to manufacture or clinically safer than every Val-Cit design."
  },
  {
    "id": "mc-non-cleavable",
    "name": "Maleimidocaproyl (mc), non-cleavable",
    "type": "non-cleavable",
    "trigger": "Antibody proteolysis; the maleimidocaproyl linkage is protease resistant.",
    "releases": "cys-mcMMAF in the belantamab mafodotin label.",
    "adcs": [
      "belantamab-mafodotin"
    ],
    "note": "The released species retains cysteine and linker material. Catabolism need not mean complete digestion of every antibody molecule."
  },
  {
    "id": "hydrophilic-next-gen",
    "name": "Hydrophilic linker and carrier designs",
    "type": "varies",
    "trigger": "No common cleavage trigger; specify the actual linker and carrier.",
    "releases": "Depends on the construct: TOP1 cargo, auristatins, vinca derivatives or other cargo.",
    "adcs": ["upifitamab-rilsodotin"],
    "note": "Hydrophilicity, coupling chemistry and release trigger are separate design features. Dolaflexin uses AF-HPA, whereas the earlier polyacetal Fleximer study used a vinca derivative; neither establishes universal efflux escape or loading of eight."
  }
];
