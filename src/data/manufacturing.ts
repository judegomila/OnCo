/**
 * Manufacturing capacity map: where ADCs are conjugated, viral vectors and cell therapies are made, and
 * medical radioisotopes are produced. Contract manufacturers (CDMOs) and in-house sites.
 *
 * Rules: every site has a source (the operator's own facility page or announcement). `capacity` is a plain
 * statement of what the operator says the site does; quantities appear only when the operator has published
 * them. `customers` are corpus company ids for publicly announced relationships only. Coordinates are the
 * city, not the plant gate. Isotope supply status lives in `isotopes.ts`; this file is about sites.
 */
export type Capability = "adc-conjugation" | "payload-linker" | "antibody-drug-substance" | "viral-vector" | "cell-therapy" | "plasmid-mrna" | "radioisotope" | "radiopharmaceutical" | "fill-finish";
export type SiteOwnership = "cdmo" | "in-house" | "public";
export type ManufacturingSite = {
  id: string;
  name: string;
  operatorId?: string;
  operator: string;
  ownership: SiteOwnership;
  city: string;
  country: string;
  lat: number;
  lng: number;
  capabilities: Capability[];
  capacity: string;
  customers: string[];
  /** Products made at the site, when public. */
  drugs?: string[];
  /** Bottleneck this capacity relieves, when one exists in the corpus. */
  bottleneckId?: string;
  source: { label: string; url: string };
  asOf: string;
};

export const CAPABILITY_LABEL: Record<Capability, string> = {
  "adc-conjugation": "ADC conjugation",
  "payload-linker": "Payload and linker chemistry",
  "antibody-drug-substance": "Antibody drug substance",
  "viral-vector": "Viral vector",
  "cell-therapy": "Cell therapy",
  "plasmid-mrna": "Plasmid DNA and mRNA",
  radioisotope: "Radioisotope production",
  radiopharmaceutical: "Radiopharmaceutical manufacturing",
  "fill-finish": "Fill and finish",
};

export const CAPABILITY_COLOR: Record<Capability, string> = {
  "adc-conjugation": "#10b981",
  "payload-linker": "#059669",
  "antibody-drug-substance": "#0ea5e9",
  "viral-vector": "#8b5cf6",
  "cell-therapy": "#ec4899",
  "plasmid-mrna": "#a855f7",
  radioisotope: "#f59e0b",
  radiopharmaceutical: "#f97316",
  "fill-finish": "#64748b",
};

const asOf = "2026-09-09";
const CELL = "b-manufacturing-cell-therapy";

export const manufacturingSites: ManufacturingSite[] = [
  // ---------------- ADC conjugation and chemistry (CDMO) ----------------
  { id: "lonza-visp", name: "Lonza Visp", operatorId: "lonza", operator: "Lonza", ownership: "cdmo", city: "Visp", country: "CH", lat: 46.29, lng: 7.88,
    capabilities: ["adc-conjugation", "payload-linker", "antibody-drug-substance"], customers: [],
    capacity: "Lonza's bioconjugation centre: clinical and commercial ADC conjugation suites alongside highly potent payload chemistry and mammalian drug substance, expanded in 2023 and 2024.",
    source: { label: "Lonza bioconjugates", url: "https://www.lonza.com/bioconjugates" }, asOf },
  { id: "wuxi-xdc-wuxi", name: "WuXi XDC Wuxi", operatorId: "wuxi-xdc", operator: "WuXi XDC", ownership: "cdmo", city: "Wuxi", country: "CN", lat: 31.49, lng: 120.31,
    capabilities: ["adc-conjugation", "payload-linker", "antibody-drug-substance", "fill-finish"], customers: [],
    capacity: "The largest ADC CDMO by project count; integrated antibody, linker-payload, conjugation and fill-finish under one roof. Most China-origin ADCs licensed to Western pharma were made here during development.",
    source: { label: "WuXi XDC", url: "https://www.wuxixdc.com/" }, asOf },
  { id: "wuxi-xdc-singapore", name: "WuXi XDC Singapore", operatorId: "wuxi-xdc", operator: "WuXi XDC", ownership: "cdmo", city: "Singapore", country: "SG", lat: 1.35, lng: 103.82,
    capabilities: ["adc-conjugation", "fill-finish"], customers: [],
    capacity: "First ex-China site, built to give Western customers a supply chain outside mainland China; announced 2023, in operation from 2025 to 2026.",
    source: { label: "WuXi XDC", url: "https://www.wuxixdc.com/" }, asOf },
  { id: "samsung-biologics-songdo-adc", name: "Samsung Biologics ADC facility", operatorId: "samsung-biologics", operator: "Samsung Biologics", ownership: "cdmo", city: "Incheon (Songdo)", country: "KR", lat: 37.39, lng: 126.64,
    capabilities: ["adc-conjugation", "antibody-drug-substance"], customers: [],
    capacity: "Dedicated ADC conjugation facility opened at the end of 2024 next to the world's largest antibody drug-substance campus.",
    source: { label: "Samsung Biologics", url: "https://samsungbiologics.com/" }, asOf },
  { id: "abzena-sanford", name: "Abzena Sanford", operatorId: "abzena", operator: "Abzena", ownership: "cdmo", city: "Sanford, North Carolina", country: "US", lat: 35.48, lng: -79.18,
    capabilities: ["adc-conjugation", "antibody-drug-substance"], customers: [],
    capacity: "US bioconjugation and biologics campus; Abzena also runs ADC chemistry in Bristol, Pennsylvania.",
    source: { label: "Abzena", url: "https://www.abzena.com/" }, asOf },
  { id: "piramal-grangemouth", name: "Piramal Pharma Solutions Grangemouth", operatorId: "piramal-pharma-solutions", operator: "Piramal Pharma Solutions", ownership: "cdmo", city: "Grangemouth", country: "GB", lat: 56.01, lng: -3.72,
    capabilities: ["adc-conjugation"], customers: [],
    capacity: "One of the longest-running commercial ADC conjugation sites in Europe; payload and linker chemistry sits at Piramal's Riverview, Michigan plant.",
    source: { label: "Piramal Pharma Solutions ADC", url: "https://www.piramalpharmasolutions.com/" }, asOf },
  { id: "catalent-bloomington", name: "Catalent Bloomington", operatorId: "catalent", operator: "Catalent (Novo Holdings)", ownership: "cdmo", city: "Bloomington, Indiana", country: "US", lat: 39.17, lng: -86.53,
    capabilities: ["antibody-drug-substance", "fill-finish"], customers: [],
    capacity: "Large biologics drug-substance and sterile fill-finish campus; one of three Catalent sites transferred to Novo Nordisk in the 2024 Novo Holdings acquisition.",
    source: { label: "Catalent Biologics", url: "https://biologics.catalent.com/" }, asOf },
  { id: "fujifilm-holly-springs", name: "FUJIFILM Diosynth Holly Springs", operatorId: "fujifilm-diosynth", operator: "FUJIFILM Diosynth Biotechnologies", ownership: "cdmo", city: "Holly Springs, North Carolina", country: "US", lat: 35.65, lng: -78.83,
    capabilities: ["antibody-drug-substance", "fill-finish"], customers: [],
    capacity: "Large-scale mammalian cell culture campus opened in 2025; sister sites in Hillerød (Denmark) and Billingham (UK).",
    source: { label: "FUJIFILM Diosynth Biotechnologies", url: "https://fujifilmdiosynth.com/" }, asOf },

  // ---------------- In-house ADC ----------------
  { id: "daiichi-hiratsuka", name: "Daiichi Sankyo Hiratsuka", operatorId: "daiichi-sankyo", operator: "Daiichi Sankyo", ownership: "in-house", city: "Hiratsuka", country: "JP", lat: 35.33, lng: 139.35,
    capabilities: ["adc-conjugation", "payload-linker"], customers: [], drugs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan"],
    capacity: "Daiichi Sankyo's DXd ADC conjugation and payload site, expanded repeatedly since 2020 to meet Enhertu demand.",
    source: { label: "Daiichi Sankyo manufacturing", url: "https://www.daiichisankyo.com/" }, asOf },

  // ---------------- Cell therapy (in-house) ----------------
  { id: "kite-el-segundo", name: "Kite El Segundo", operatorId: "gilead", operator: "Kite (Gilead)", ownership: "in-house", city: "El Segundo, California", country: "US", lat: 33.92, lng: -118.42,
    capabilities: ["cell-therapy"], customers: [], drugs: ["axicabtagene-ciloleucel"], bottleneckId: CELL,
    capacity: "Kite's first commercial CAR-T plant; with Frederick (Maryland) and Hoofddorp (Netherlands) it gives Kite the largest in-house cell therapy network.",
    source: { label: "Kite manufacturing", url: "https://www.kitepharma.com/" }, asOf },
  { id: "kite-frederick", name: "Kite Frederick", operatorId: "gilead", operator: "Kite (Gilead)", ownership: "in-house", city: "Frederick, Maryland", country: "US", lat: 39.41, lng: -77.41,
    capabilities: ["cell-therapy", "viral-vector"], customers: [], drugs: ["axicabtagene-ciloleucel"], bottleneckId: CELL,
    capacity: "Commercial CAR-T manufacturing with in-house lentiviral vector production.",
    source: { label: "Kite manufacturing", url: "https://www.kitepharma.com/" }, asOf },
  { id: "kite-hoofddorp", name: "Kite Hoofddorp", operatorId: "gilead", operator: "Kite (Gilead)", ownership: "in-house", city: "Hoofddorp", country: "NL", lat: 52.30, lng: 4.69,
    capabilities: ["cell-therapy"], customers: [], drugs: ["axicabtagene-ciloleucel"], bottleneckId: CELL,
    capacity: "European CAR-T manufacturing for Yescarta and Tecartus.",
    source: { label: "Kite manufacturing", url: "https://www.kitepharma.com/" }, asOf },
  { id: "novartis-morris-plains", name: "Novartis Morris Plains", operatorId: "novartis", operator: "Novartis", ownership: "in-house", city: "Morris Plains, New Jersey", country: "US", lat: 40.82, lng: -74.48,
    capabilities: ["cell-therapy"], customers: [], drugs: ["tisagenlecleucel"], bottleneckId: CELL,
    capacity: "The first commercial CAR-T plant (Kymriah, 2017); Novartis also makes Kymriah in Stein (Switzerland) and through partners in Japan and Australia.",
    source: { label: "Novartis cell therapy", url: "https://www.novartis.com/" }, asOf },
  { id: "bms-devens", name: "Bristol Myers Squibb Devens", operatorId: "bms", operator: "Bristol Myers Squibb", ownership: "in-house", city: "Devens, Massachusetts", country: "US", lat: 42.54, lng: -71.61,
    capabilities: ["cell-therapy", "antibody-drug-substance"], customers: [], drugs: ["idecabtagene-vicleucel", "lisocabtagene-maraleucel"], bottleneckId: CELL,
    capacity: "Cell therapy manufacturing added to a large biologics campus; BMS also makes CAR-T in Summit (New Jersey) and Leiden (Netherlands) and buys vector from partners.",
    source: { label: "BMS manufacturing", url: "https://www.bms.com/" }, asOf },
  { id: "legend-raritan", name: "Legend Biotech and Janssen Raritan", operatorId: "legend-biotech", operator: "Legend Biotech with Johnson & Johnson", ownership: "in-house", city: "Raritan, New Jersey", country: "US", lat: 40.57, lng: -74.63,
    capabilities: ["cell-therapy"], customers: ["johnson-johnson"], drugs: ["ciltacabtagene-autoleucel"], bottleneckId: CELL,
    capacity: "Carvykti's main US plant; capacity expansion here and at the Ghent (Belgium) site was the constraint on Carvykti supply in 2023 and 2024.",
    source: { label: "Legend Biotech", url: "https://www.legendbiotech.com/" }, asOf },
  { id: "legend-ghent", name: "Legend Biotech Ghent (Tech Lane)", operatorId: "legend-biotech", operator: "Legend Biotech with Johnson & Johnson", ownership: "in-house", city: "Ghent", country: "BE", lat: 51.05, lng: 3.72,
    capabilities: ["cell-therapy"], customers: ["johnson-johnson"], drugs: ["ciltacabtagene-autoleucel"], bottleneckId: CELL,
    capacity: "European Carvykti manufacturing, licensed for commercial supply from 2024.",
    source: { label: "Legend Biotech", url: "https://www.legendbiotech.com/" }, asOf },

  // ---------------- Cell therapy and vector (CDMO and platforms) ----------------
  { id: "cellares-south-sf", name: "Cellares Smart Factory", operatorId: "cellares", operator: "Cellares", ownership: "cdmo", city: "South San Francisco, California", country: "US", lat: 37.65, lng: -122.41,
    capabilities: ["cell-therapy"], customers: ["bms", "gilead"], bottleneckId: CELL,
    capacity: "Automated Cell Shuttle platform sold as manufacturing-as-a-service; announced agreements with Bristol Myers Squibb (2024) and Kite (2025). A second Smart Factory is planned in New Jersey.",
    source: { label: "Cellares", url: "https://cellares.com/" }, asOf },
  { id: "oxford-biomedica-oxford", name: "Oxford Biomedica Oxbox", operatorId: "oxford-biomedica", operator: "Oxford Biomedica", ownership: "cdmo", city: "Oxford", country: "GB", lat: 51.75, lng: -1.26,
    capabilities: ["viral-vector"], customers: ["novartis"], bottleneckId: CELL,
    capacity: "Lentiviral vector CDMO; long-standing supplier of the vector for Kymriah. Additional sites in Bedford (Massachusetts) and Lyon (France).",
    source: { label: "Oxford Biomedica", url: "https://www.oxb.com/" }, asOf },
  { id: "aldevron-fargo", name: "Aldevron Fargo", operatorId: "aldevron", operator: "Aldevron (Danaher)", ownership: "cdmo", city: "Fargo, North Dakota", country: "US", lat: 46.88, lng: -96.79,
    capabilities: ["plasmid-mrna"], customers: [], bottleneckId: CELL,
    capacity: "GMP plasmid DNA and mRNA raw materials for vector and cell therapy makers; the plasmid supplier behind many CAR-T programmes.",
    source: { label: "Aldevron", url: "https://www.aldevron.com/" }, asOf },
  { id: "miltenyi-bergisch-gladbach", name: "Miltenyi Biotec", operatorId: "miltenyi-biotec", operator: "Miltenyi Biotec", ownership: "cdmo", city: "Bergisch Gladbach", country: "DE", lat: 50.99, lng: 7.13,
    capabilities: ["cell-therapy", "viral-vector"], customers: [], bottleneckId: CELL,
    capacity: "Maker of the CliniMACS Prodigy closed-system platform used for point-of-care and academic CAR-T manufacturing, plus vector and GMP reagents.",
    source: { label: "Miltenyi Biotec", url: "https://www.miltenyibiotec.com/" }, asOf },

  // ---------------- Radioisotopes and radiopharmaceuticals ----------------
  { id: "itm-garching", name: "ITM Garching", operatorId: "itm", operator: "ITM Isotope Technologies Munich", ownership: "cdmo", city: "Garching", country: "DE", lat: 48.25, lng: 11.65,
    capabilities: ["radioisotope", "radiopharmaceutical"], customers: [], drugs: ["itm-11"],
    capacity: "The largest producer of non-carrier-added lutetium-177 (EndolucinBeta), supplied to most Lu-177 developers, plus ITM's own radiopharmaceuticals.",
    source: { label: "ITM", url: "https://itm-radiopharma.com/" }, asOf },
  { id: "novartis-millburn", name: "Novartis Millburn", operatorId: "novartis", operator: "Novartis", ownership: "in-house", city: "Millburn, New Jersey", country: "US", lat: 40.73, lng: -74.30,
    capabilities: ["radiopharmaceutical"], customers: [], drugs: ["pluvicto", "lutathera"],
    capacity: "US radioligand therapy plant; with Indianapolis (Indiana), Zaragoza (Spain) and Ivrea (Italy) it forms the network that ended the 2022 to 2023 Pluvicto shortages.",
    source: { label: "Novartis radioligand manufacturing", url: "https://www.novartis.com/" }, asOf },
  { id: "novartis-indianapolis", name: "Novartis Indianapolis", operatorId: "novartis", operator: "Novartis", ownership: "in-house", city: "Indianapolis, Indiana", country: "US", lat: 39.77, lng: -86.16,
    capabilities: ["radiopharmaceutical"], customers: [], drugs: ["pluvicto"],
    capacity: "Second US Pluvicto site, opened 2024, roughly doubling US radioligand capacity.",
    source: { label: "Novartis radioligand manufacturing", url: "https://www.novartis.com/" }, asOf },
  { id: "novartis-zaragoza", name: "Novartis Zaragoza", operatorId: "novartis", operator: "Novartis", ownership: "in-house", city: "Zaragoza", country: "ES", lat: 41.65, lng: -0.89,
    capabilities: ["radiopharmaceutical"], customers: [], drugs: ["pluvicto", "lutathera"],
    capacity: "European radioligand site; also supplied the US during the 2023 shortage.",
    source: { label: "Novartis radioligand manufacturing", url: "https://www.novartis.com/" }, asOf },
  { id: "orano-med-plano", name: "Orano Med Plano", operatorId: "orano-med", operator: "Orano Med", ownership: "cdmo", city: "Plano, Texas", country: "US", lat: 33.02, lng: -96.70,
    capabilities: ["radioisotope", "radiopharmaceutical"], customers: ["radiomedix", "sanofi"], drugs: ["alphamedix"],
    capacity: "Lead-212 production from thorium-228 generators; the Brownsburg (Indiana) ATLab, opened 2024 to 2025, is the industrial-scale Pb-212 plant.",
    source: { label: "Orano Med", url: "https://www.oranomed.com/" }, asOf },
  { id: "terrapower-isotopes-philadelphia", name: "TerraPower Isotopes Philadelphia", operatorId: "terrapower-isotopes", operator: "TerraPower Isotopes", ownership: "cdmo", city: "Philadelphia, Pennsylvania", country: "US", lat: 39.95, lng: -75.17,
    capabilities: ["radioisotope"], customers: [],
    capacity: "Actinium-225 from thorium-229 stock; a new plant under construction is described by the company as a roughly twenty-fold increase in capacity.",
    source: { label: "TerraPower Isotopes", url: "https://www.terrapower.com/isotopes" }, asOf },
  { id: "eckert-ziegler-berlin", name: "Eckert & Ziegler Berlin", operatorId: "eckert-ziegler", operator: "Eckert & Ziegler", ownership: "cdmo", city: "Berlin", country: "DE", lat: 52.52, lng: 13.40,
    capabilities: ["radioisotope", "radiopharmaceutical"], customers: [],
    capacity: "Lutetium-177, gallium-68 generators and cyclotron-produced actinium-225 for contract customers.",
    source: { label: "Eckert & Ziegler", url: "https://www.ezag.com/" }, asOf },
  { id: "curium-petten", name: "Curium Petten", operatorId: "curium", operator: "Curium", ownership: "cdmo", city: "Petten", country: "NL", lat: 52.77, lng: 4.67,
    capabilities: ["radioisotope", "radiopharmaceutical"], customers: [],
    capacity: "Reactor-adjacent isotope processing (molybdenum-99, lutetium-177) next to the High Flux Reactor; Curium also runs a large radiopharmaceutical site in St Louis, Missouri.",
    source: { label: "Curium", url: "https://www.curiumpharma.com/" }, asOf },
  { id: "northstar-beloit", name: "NorthStar Medical Radioisotopes Beloit", operatorId: "northstar-medical-radioisotopes", operator: "NorthStar Medical Radioisotopes", ownership: "cdmo", city: "Beloit, Wisconsin", country: "US", lat: 42.51, lng: -89.03,
    capabilities: ["radioisotope", "radiopharmaceutical"], customers: [],
    capacity: "Accelerator-based (non-reactor) isotope production including photonuclear actinium-225 and copper-67, plus contract radiopharmaceutical manufacturing.",
    source: { label: "NorthStar Medical Radioisotopes", url: "https://www.northstarnm.com/" }, asOf },
  { id: "shine-janesville", name: "SHINE Technologies Janesville", operatorId: "shine-technologies", operator: "SHINE Technologies", ownership: "cdmo", city: "Janesville, Wisconsin", country: "US", lat: 42.68, lng: -89.02,
    capabilities: ["radioisotope"], customers: [],
    capacity: "Non-carrier-added lutetium-177 production and an accelerator-driven molybdenum-99 plant under commissioning.",
    source: { label: "SHINE Technologies", url: "https://www.shinefusion.com/" }, asOf },
];

export const sitesFor = (companyId: string) => manufacturingSites.filter((s) => s.operatorId === companyId || s.customers.includes(companyId));
