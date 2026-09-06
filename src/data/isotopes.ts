/**
 * Medical radionuclides used in oncology imaging and therapy, with supply status.
 * `suppliers` mixes entity ids (rendered as links) and free text. Supply statements are
 * editorial summaries with sources; they change quickly.
 */
export type Isotope = {
  id: string; symbol: string; name: string;
  halfLife: string;
  emission: string;
  use: "therapy" | "imaging" | "both";
  production: string;
  supplierIds: string[];
  supplierText: string;
  supply: "adequate" | "tight" | "constrained" | "emerging";
  supplyNote: string;
  sources: Array<{ label: string; url: string }>;
  refs: string[];
};

export const isotopes: Isotope[] = [
  { id: "lu-177", symbol: "¹⁷⁷Lu", name: "Lutetium-177", halfLife: "6.65 days", emission: "β⁻ (0.5 MeV, ~2 mm range) + γ (208 keV, imageable)", use: "therapy",
    production: "Reactor: indirect route via ¹⁷⁶Yb(n,γ)¹⁷⁷Yb→¹⁷⁷Lu (non-carrier-added, n.c.a.) or direct ¹⁷⁶Lu(n,γ) (carrier-added, contains long-lived ¹⁷⁷ᵐLu).",
    supplierIds: ["itm", "novartis", "lantheus"], supplierText: "ITM (n.c.a., largest), Novartis (in-house for Pluvicto, Millburn NJ and Indianapolis), SHINE (n.c.a.), Eckert & Ziegler, NorthStar, Curium, IRE/Isotope Technologies.",
    supply: "tight", supplyNote: "Demand grew sharply with Pluvicto. Reactor capacity (BR2, HFR, MARIA, SAFARI-1, Russian reactors) and enriched ¹⁷⁶Yb availability are the constraints; accelerator-based routes (SHINE) are scaling. Shortages in 2022–23 delayed Pluvicto doses; supply improved by 2025.",
    sources: [{ label: "SNMMI radiopharmaceutical supply overview", url: "https://www.snmmi.org/AboutSNMMI/Content.aspx?ItemNumber=41940" }],
    refs: ["radioligand-therapy", "pluvicto", "lutathera", "fap-2286"] },
  { id: "ac-225", symbol: "²²⁵Ac", name: "Actinium-225", halfLife: "9.9 days", emission: "4 α particles over its decay chain (via ²²¹Fr, ²¹⁷At, ²¹³Bi); ~28 MeV total", use: "therapy",
    production: "Legacy: decay of ²²⁹Th from US ²³³U stockpile (DOE/ORNL, TerraPower). Accelerator: ²²⁶Ra(p,2n)²²⁵Ac on cyclotrons (Eckert & Ziegler, Bayer/Nusano route), photonuclear ²²⁶Ra(γ,n)²²⁵Ra→²²⁵Ac (NorthStar), high-energy spallation of ²³²Th (DOE Tri-Lab, contains ²²⁷Ac impurity).",
    supplierIds: ["terrapower-isotopes", "rayzebio", "bms"], supplierText: "DOE Isotope Program, TerraPower Isotopes (Philadelphia plant under construction, ~20× capacity), Eckert & Ziegler, NorthStar Medical Radioisotopes, Nusano, Ionetix, Bayer (in-house), RayzeBio/BMS (in-house), Niowave.",
    supply: "constrained", supplyNote: "The binding constraint on targeted alpha therapy. Global supply in the mid-2020s was roughly enough for low thousands of patient doses per year; multiple phase 3 programmes (Novartis, Bayer, BMS, AstraZeneca) need far more. Commercial-scale expansion is described as a 3–5 year effort.",
    sources: [{ label: "PatSnap: Ac-225 targeted alpha therapy pipeline", url: "https://www.patsnap.com/resources/blog/articles/actinium-225-targeted-alpha-therapy-pipeline/" }, { label: "AuntMinnie: targeted radiopharmaceutical therapy pipeline", url: "https://www.auntminnie.com/clinical-news/molecular-imaging/nuclear-medicine/article/15819884/targeted-radiopharmaceutical-therapy-pipeline" }],
    refs: ["targeted-alpha-therapy", "ac225-psma", "ryz101"] },
  { id: "pb-212", symbol: "²¹²Pb", name: "Lead-212", halfLife: "10.6 hours", emission: "β⁻ to ²¹²Bi, then α (via ²¹²Bi/²¹²Po); effectively an in-vivo α generator", use: "therapy",
    production: "²²⁴Ra/²¹²Pb generators from ²²⁸Th (Orano Med's Plano, Texas and Brownsburg, Indiana plants); Perspective Therapeutics VMT platform.",
    supplierIds: ["orano-med"], supplierText: "Orano Med (dominant), Perspective Therapeutics (in-house), AdvanCell (²¹²Pb from ²²⁴Ra generator, Australia).",
    supply: "emerging", supplyNote: "Short half-life forces same-day logistics but avoids Ac-225's daughter-redistribution problem. Orano Med's industrial-scale ²¹²Pb production came online 2024–25; AlphaMedix (²¹²Pb-DOTAMTATE) is in registrational development.",
    sources: [{ label: "Morning Glory Sciences: Ac-225, Pb-212 pipeline map", url: "https://www.morningglorysciences.com/en/nuclear-medicine-actinium-225-lead-212-pipeline-en/" }],
    refs: ["targeted-alpha-therapy", "sstr2"] },
  { id: "ra-223", symbol: "²²³Ra", name: "Radium-223", halfLife: "11.4 days", emission: "4 α particles over decay chain", use: "therapy",
    production: "²²⁷Ac/²²⁷Th generator (from ²²⁶Ra neutron irradiation).",
    supplierIds: ["bayer"], supplierText: "Bayer (Xofigo), single-source.",
    supply: "adequate", supplyNote: "Established since 2013; demand has declined as PSMA radioligands took share.",
    sources: [{ label: "Xofigo (FDA label)", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/203971s016lbl.pdf" }],
    refs: ["targeted-alpha-therapy", "prostate"] },
  { id: "ga-68", symbol: "⁶⁸Ga", name: "Gallium-68", halfLife: "68 minutes", emission: "β⁺ (PET)", use: "imaging",
    production: "⁶⁸Ge/⁶⁸Ga generators (270-day parent) or cyclotron ⁶⁸Zn(p,n)⁶⁸Ga (liquid or solid target).",
    supplierIds: ["telix", "novartis"], supplierText: "Eckert & Ziegler and IRE (generators), Telix/Illuccix and Novartis/Locametz kits, cyclotron production at large centres.",
    supply: "adequate", supplyNote: "Generator shortages in 2020–21 during PSMA PET launch; cyclotron routes and ¹⁸F-labelled alternatives (Pylarify) relieved pressure.",
    sources: [{ label: "Illuccix (Telix)", url: "https://telixpharma.com" }],
    refs: ["psma-pet", "fapi-pet", "pet"] },
  { id: "f-18", symbol: "¹⁸F", name: "Fluorine-18", halfLife: "110 minutes", emission: "β⁺ (PET)", use: "imaging",
    production: "Medical cyclotrons: ¹⁸O(p,n)¹⁸F in enriched water; distributed daily from regional radiopharmacies.",
    supplierIds: ["lantheus", "ge-healthcare", "siemens-healthineers"], supplierText: "Cardinal Health, PETNET (Siemens), SOFIE, Jubilant, Curium, GE HealthCare; hundreds of cyclotron sites worldwide.",
    supply: "adequate", supplyNote: "The most robust radionuclide supply chain in medicine; FDG, PSMA (Pylarify, Posluma), FES, and FAPI-74 all ride on it.",
    sources: [{ label: "Pylarify (Lantheus)", url: "https://www.lantheus.com" }],
    refs: ["fdg-pet", "psma-pet", "pylarify", "pet-ct"] },
  { id: "zr-89", symbol: "⁸⁹Zr", name: "Zirconium-89", halfLife: "78.4 hours", emission: "β⁺ (PET), γ (909 keV)", use: "imaging",
    production: "Cyclotron ⁸⁹Y(p,n)⁸⁹Zr on yttrium foil; chelated via desferrioxamine (DFO) to antibodies.",
    supplierIds: ["telix"], supplierText: "3D Imaging, PerkinElmer/Revvity, IBA and academic cyclotrons; Telix (TLX250-CDx girentuximab).",
    supply: "adequate", supplyNote: "Half-life matched to antibody kinetics (imaging at 3–7 days); higher patient dose than ¹⁸F. Supply scales with immuno-PET demand.",
    sources: [{ label: "Telix TLX250-CDx", url: "https://telixpharma.com" }],
    refs: ["immuno-pet", "trop2-pet", "her2-pet"] },
  { id: "cu-64", symbol: "⁶⁴Cu", name: "Copper-64", halfLife: "12.7 hours", emission: "β⁺ (PET), β⁻, Auger electrons", use: "both",
    production: "Cyclotron ⁶⁴Ni(p,n)⁶⁴Cu; theranostic pair with ⁶⁷Cu (therapy).",
    supplierIds: [], supplierText: "Curium (Detectnet ⁶⁴Cu-DOTATATE), Clarity Pharmaceuticals (SAR-bisPSMA), Washington University and other academic cyclotrons.",
    supply: "adequate", supplyNote: "Longer half-life than ⁶⁸Ga allows central production and next-day imaging; Clarity's ⁶⁴Cu/⁶⁷Cu PSMA pair is in phase 3.",
    sources: [{ label: "Detectnet (Curium)", url: "https://www.curiumpharma.com" }],
    refs: ["psma-pet", "neuroendocrine"] },
  { id: "i-131", symbol: "¹³¹I", name: "Iodine-131", halfLife: "8.0 days", emission: "β⁻ + γ (364 keV)", use: "both",
    production: "Reactor fission product or ¹³⁰Te(n,γ)¹³¹Te→¹³¹I.",
    supplierIds: [], supplierText: "Curium, Jubilant, IRE, NTP; widely available.",
    supply: "adequate", supplyNote: "The original theranostic (thyroid cancer since 1946); also ¹³¹I-MIBG in neuroblastoma and ¹³¹I-apamistamab (Iomab-B) conditioning.",
    sources: [{ label: "IAEA radioisotope overview", url: "https://www.iaea.org/topics/radiopharmaceuticals" }],
    refs: ["thyroid", "neuroblastoma", "radioligand-therapy"] },
  { id: "y-90", symbol: "⁹⁰Y", name: "Yttrium-90", halfLife: "64 hours", emission: "β⁻ (2.3 MeV, ~11 mm range), no useful γ", use: "therapy",
    production: "⁹⁰Sr/⁹⁰Y generators (fission-product parent) or ⁸⁹Y(n,γ).",
    supplierIds: [], supplierText: "Boston Scientific (TheraSphere glass microspheres), Sirtex (SIR-Spheres resin), Eckert & Ziegler.",
    supply: "adequate", supplyNote: "Mainstay of hepatic radioembolisation (SIRT); Zevalin (⁹⁰Y-ibritumomab) proved radioimmunotherapy in lymphoma but was commercially abandoned.",
    sources: [{ label: "TheraSphere (Boston Scientific)", url: "https://www.bostonscientific.com" }],
    refs: ["hcc", "radioimmunotherapy"] },
];
