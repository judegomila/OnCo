/**
 * Which 3D structure(s) to show on each product page.
 *
 *  - pubchem: resolved by compound name (or "cid:12345") to a PubChem 3D conformer SDF
 *             (falls back to the 2D record if no conformer exists).
 *  - pdb:     an RCSB entry; only the C-alpha backbone is kept (antibodies, proteins).
 *
 * `scripts/fetch-structures.ts` resolves these and writes public/structures/*.
 * The viewer never calls external services at runtime.
 *
 * Every PDB id below was checked against RCSB on 2026-09-06 (title confirms the drug).
 * Where no structure of the specific antibody exists, a representative intact IgG (1IGT)
 * is shown and labelled as such. Products with no molecule at all (cell therapies, mRNA
 * vaccines, devices, tests, tumour-lysate vaccines) are deliberately absent.
 */
export type StructureDef = { label: string; source: "pubchem" | "pdb"; query: string; note?: string };

const IGG: StructureDef = { label: "IgG antibody backbone (PDB 1IGT)", source: "pdb", query: "1IGT", note: "Representative intact IgG, C-alpha trace. Not the specific antibody." };
const pdb = (label: string, id: string, note?: string): StructureDef => ({ label: `${label} (PDB ${id}), backbone trace`, source: "pdb", query: id, note });
const pc = (label: string, query: string, note?: string): StructureDef => ({ label, source: "pubchem", query, note });
/** Drug bound to its target: RCSB entry with the ligand and the binding pocket kept (titles verified on RCSB, 2026-09-07). */
const cx = (drug: string, target: string, id: string): StructureDef => ({ label: `${drug} bound to ${target} (PDB ${id})`, source: "pdb", query: id, note: "Backbone trace with the bound drug (red) and pocket residues within 5 Å (thin cage)." });

// Verified antibody structures.
const TRASTUZUMAB = pdb("Trastuzumab Fab bound to HER2 extracellular domain", "1N8Z");
const SACITUZUMAB = pdb("Sacituzumab Fab bound to TROP2 dimer", "9PI9");
const PEMBRO = pdb("Pembrolizumab, full-length IgG4", "5DK3");
const NIVO = pdb("Nivolumab Fab bound to PD-1", "5WT9");
const IPI = pdb("Ipilimumab bound to CTLA-4", "5TRU");
const ATEZO = pdb("Atezolizumab bound to PD-L1", "5X8L");
const DURVA = pdb("Durvalumab bound to PD-L1", "5X8M");
const TREME = pdb("Tremelimumab Fab bound to CTLA-4", "5GGV");
const BEVA = pdb("Bevacizumab Fab bound to VEGF", "1BJ1");
const DOSTAR = pdb("Dostarlimab bound to PD-1", "7WSL");
const CEMI = pdb("Cemiplimab Fab bound to PD-1", "8GY5");
const RELAT = pdb("Relatlimab Fab with LAG-3 D1-loop peptide", "7UM3");
const TECLI = pdb("Teclistamab BCMA-arm Fab bound to BCMA (cryo-EM)", "12ER");
const AMIV = pdb("Amivantamab anti-MET Fab arm bound to MET", "6WVZ");
const ZANI = pdb("Zanidatamab bound to HER2", "8FFJ");
const TIRA = pdb("Tiragolumab bound to TIGIT", "8JEO");
const XALU = pdb("Xaluritamig (AMG 509) Fab bound to STEAP1 (cryo-EM)", "8UCD");
const IL2 = pdb("Interleukin-2 (the cytokine bempegaldesleukin is built on)", "1M47");

// Payloads.
const SN38 = pc("Payload: SN-38", "7-ethyl-10-hydroxycamptothecin");
const DXD = pc("Payload: deruxtecan (linker + DXd)", "deruxtecan");
const MMAE = pc("Payload: MMAE", "monomethyl auristatin E");
const EXA = (drug: string) => pc("Payload class: exatecan", "exatecan", `${drug} carries a camptothecin-derived TOP1 inhibitor; exatecan shown as the class representative.`);

export const structures: Record<string, StructureDef[]> = {
  // ---- ADCs: payload first, then the antibody ----
  "sacituzumab-govitecan": [SN38, SACITUZUMAB],
  "sacituzumab-tirumotecan": [pc("Payload parent: belotecan", "belotecan", "Sac-TMT carries T030, a belotecan-derived TOP1 inhibitor; belotecan shown."), SACITUZUMAB],
  "trastuzumab-deruxtecan": [DXD, TRASTUZUMAB],
  "datopotamab-deruxtecan": [DXD, IGG],
  "trastuzumab-emtansine": [pc("Payload: DM1 (mertansine)", "mertansine"), TRASTUZUMAB],
  "trastuzumab-duocarmazine": [pc("Payload: seco-DUBA (duocarmycin prodrug)", "seco-DUBA"), TRASTUZUMAB],
  "enfortumab-vedotin": [MMAE, IGG],
  "brentuximab-vedotin": [MMAE, IGG],
  "tisotumab-vedotin": [MMAE, IGG],
  "telisotuzumab-vedotin": [MMAE, IGG],
  "disitamab-vedotin": [MMAE, IGG],
  "zilovertamab-vedotin": [MMAE, IGG],
  cmg901: [MMAE, IGG],
  "mirvetuximab-soravtansine": [pc("Payload: DM4 (ravtansine)", "ravtansine"), IGG],
  "tusamitamab-ravtansine": [pc("Payload: DM4 (ravtansine)", "ravtansine"), IGG],
  "gemtuzumab-ozogamicin": [pc("Payload: calicheamicin", "calicheamicin gamma1"), IGG],
  "belantamab-mafodotin": [pc("Payload: MMAF", "monomethyl auristatin F"), IGG],
  "patritumab-deruxtecan": [DXD, IGG],
  "ifinatamab-deruxtecan": [DXD, IGG],
  "raludotatug-deruxtecan": [DXD, IGG],
  "izalontamab-brengitecan": [EXA("Iza-bren (Ed-04)"), IGG],
  "tilatamig-samrotecan": [EXA("Tilatamig samrotecan"), IGG],
  ak146d1: [EXA("AK146D1"), IGG],
  "puxitatug-samrotecan": [EXA("Puxitatug samrotecan"), IGG],
  zynlonta: [pc("Payload: SG3199 (PBD dimer)", "SG3199"), IGG],
  "rovalpituzumab-tesirine": [pc("Linker-payload: tesirine (PBD dimer)", "tesirine"), IGG],
  melflufen: [pc("Melflufen (peptide-drug conjugate)", "melflufen")],

  // ---- Checkpoint and other antibodies ----
  pembrolizumab: [PEMBRO], nivolumab: [NIVO], ipilimumab: [IPI], atezolizumab: [ATEZO], durvalumab: [DURVA], tremelimumab: [TREME],
  dostarlimab: [DOSTAR], cemiplimab: [CEMI], "relatlimab-nivolumab": [RELAT, NIVO], tiragolumab: [TIRA],
  trastuzumab: [TRASTUZUMAB], "bevacizumab-glioma": [BEVA],
  magrolimab: [{ ...IGG, note: "No public structure of magrolimab; representative IgG shown." }],
  amivantamab: [AMIV], zanidatamab: [ZANI],
  zenocutuzumab: [{ ...IGG, note: "No public structure of zenocutuzumab; representative IgG shown." }],
  ivonescimab: [{ ...IGG, note: "No public structure of ivonescimab; representative IgG shown." }],
  teclistamab: [TECLI],
  glofitamab: [{ ...IGG, note: "No public structure of glofitamab; representative IgG shown." }],
  xaluritamig: [XALU],
  pasritamig: [{ ...IGG, note: "No public structure of pasritamig; representative IgG shown." }],
  tarlatamab: [{ label: "BiTE-like format (IgG backbone shown for scale)", source: "pdb", query: "1IGT", note: "Tarlatamab is a half-life-extended BiTE; intact IgG shown as reference." }],
  blinatumomab: [{ label: "BiTE (IgG backbone shown for reference)", source: "pdb", query: "1IGT", note: "Blinatumomab is a tandem scFv (~55 kDa); intact IgG shown as reference." }],
  tebentafusp: [{ label: "TCR–scFv fusion (IgG backbone for reference)", source: "pdb", query: "1IGT", note: "No public structure of tebentafusp; intact IgG shown as reference." }],
  bempegaldesleukin: [IL2],

  // ---- Small molecules ----
  osimertinib: [pc("Osimertinib", "osimertinib"), cx("Osimertinib (AZD9291)", "EGFR kinase domain", "4ZAU")],
  lorlatinib: [pc("Lorlatinib", "lorlatinib"), cx("Lorlatinib (PF-06463922)", "ALK kinase domain (C1156Y)", "5A9U")],
  alectinib: [pc("Alectinib", "alectinib"), cx("Alectinib (CH5424802)", "ALK kinase domain", "3AOX")],
  neladalkib: [pc("Neladalkib", "neladalkib")],
  lazertinib: [pc("Lazertinib", "lazertinib")],
  repotrectinib: [pc("Repotrectinib", "repotrectinib")],
  "capmatinib-tepotinib": [pc("Capmatinib", "capmatinib"), pc("Tepotinib", "cid:25171648")],
  pralsetinib: [pc("Pralsetinib", "pralsetinib")],
  sevabertinib: [pc("Sevabertinib", "sevabertinib")],
  "dabrafenib-trametinib": [pc("Dabrafenib", "dabrafenib"), pc("Trametinib", "trametinib")],
  tovorafenib: [pc("Tovorafenib", "tovorafenib")],
  sotorasib: [pc("Sotorasib", "sotorasib"), cx("Sotorasib (AMG 510)", "KRAS G12C, covalent, GDP-bound", "6OIM")],
  adagrasib: [pc("Adagrasib", "adagrasib"), cx("Adagrasib (MRTX849)", "KRAS G12C", "6UT0")],
  divarasib: [pc("Divarasib", "divarasib")],
  olomorasib: [pc("Olomorasib", "olomorasib")],
  daraxonrasib: [pc("Daraxonrasib (RMC-6236)", "daraxonrasib")],
  elironrasib: [pc("Elironrasib", "elironrasib")],
  zoldonrasib: [pc("Zoldonrasib", "zoldonrasib")],
  mrtx1133: [pc("MRTX1133", "MRTX1133")],
  encorafenib: [pc("Encorafenib", "encorafenib")],
  selpercatinib: [pc("Selpercatinib", "selpercatinib")],
  zongertinib: [pc("Zongertinib", "zongertinib")],
  zidesamtinib: [pc("Zidesamtinib", "zidesamtinib")],
  olaparib: [pc("Olaparib", "olaparib"), cx("Olaparib", "PARP1 catalytic domain", "7KK4")],
  niraparib: [pc("Niraparib", "cid:24958200")],
  talazoparib: [pc("Talazoparib", "talazoparib")],
  iniparib: [pc("Iniparib", "iniparib")],
  palbociclib: [pc("Palbociclib", "palbociclib"), cx("Palbociclib", "CDK6", "5L2I")],
  ribociclib: [pc("Ribociclib", "ribociclib")],
  abemaciclib: [pc("Abemaciclib", "abemaciclib")],
  capivasertib: [pc("Capivasertib", "capivasertib")],
  inavolisib: [pc("Inavolisib", "inavolisib")],
  gedatolisib: [pc("Gedatolisib", "cid:44516953")],
  vepdegestrant: [pc("Vepdegestrant (PROTAC)", "vepdegestrant")],
  elacestrant: [pc("Elacestrant", "elacestrant")],
  belzutifan: [pc("Belzutifan", "belzutifan")],
  relacorilant: [pc("Relacorilant", "relacorilant")],
  revumenib: [pc("Revumenib", "revumenib")],
  vorasidenib: [pc("Vorasidenib", "vorasidenib")],
  mevrometostat: [pc("Mevrometostat", "mevrometostat")],
  venetoclax: [pc("Venetoclax", "venetoclax"), cx("Venetoclax", "BCL-2", "6O0K")],
  imatinib: [pc("Imatinib", "imatinib"), cx("Imatinib", "ABL kinase domain", "2HYY")],
  tucatinib: [pc("Tucatinib", "tucatinib")],
  dordaviprone: [pc("Dordaviprone (ONC201)", "dordaviprone")],
  epacadostat: [pc("Epacadostat", "epacadostat")],
  eprenetapopt: [pc("Eprenetapopt (APR-246)", "eprenetapopt")],
  "adu-s100": [pc("ADU-S100 (cyclic dinucleotide)", "ADU-S100")],
  // hormonal
  abiraterone: [pc("Abiraterone", "abiraterone")],
  enzalutamide: [pc("Enzalutamide", "cid:15951529")],
  apalutamide: [pc("Apalutamide", "apalutamide")],
  darolutamide: [pc("Darolutamide", "darolutamide")],
  relugolix: [pc("Relugolix", "relugolix")],
  masofaniten: [pc("Masofaniten", "masofaniten")],
  // chemotherapy
  carboplatin: [pc("Carboplatin", "carboplatin")],
  paclitaxel: [pc("Paclitaxel", "paclitaxel")],
  docetaxel: [pc("Docetaxel", "docetaxel")],
  cabazitaxel: [pc("Cabazitaxel", "cabazitaxel")],
  temozolomide: [pc("Temozolomide", "temozolomide")],
  lomustine: [pc("Lomustine", "lomustine")],
  folfirinox: [pc("5-Fluorouracil", "fluorouracil"), pc("Irinotecan", "irinotecan"), pc("Oxaliplatin", "oxaliplatin"), pc("Leucovorin (folinic acid)", "leucovorin")],
  nalirifox: [pc("Irinotecan (liposomal in NALIRIFOX)", "irinotecan"), pc("Oxaliplatin", "oxaliplatin"), pc("5-Fluorouracil", "fluorouracil"), pc("Leucovorin (folinic acid)", "leucovorin")],
  "gemcitabine-nab-paclitaxel": [pc("Gemcitabine", "gemcitabine"), pc("Paclitaxel (albumin-bound in nab-paclitaxel)", "paclitaxel")],

  // ---- Radiopharmaceuticals / tracers (ligand shown) ----
  pluvicto: [pc("PSMA-617 (vipivotide tetraxetan)", "vipivotide tetraxetan")],
  "ac225-psma": [pc("PSMA-617 (vipivotide tetraxetan)", "vipivotide tetraxetan")],
  "lu177-psma-it": [pc("PSMA-I&T ligand", "PSMA-I&T")],
  "ga68-psma-11": [pc("PSMA-11 (Ga-68 chelated in the product)", "PSMA-11")],
  flotufolastat: [pc("rhPSMA-7.3 (flotufolastat)", "flotufolastat")],
  pylarify: [pc("DCFPyL (piflufolastat)", "piflufolastat")],
  lutathera: [pc("DOTATATE (oxodotreotide)", "oxodotreotide")],
  ryz101: [pc("DOTATATE (oxodotreotide)", "oxodotreotide")],
  "fap-2286": [pc("FAP-2286 cyclic peptide ligand", "FAP-2286")],
};
