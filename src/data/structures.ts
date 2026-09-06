/**
 * Which 3D structure(s) to show on each product page.
 *
 *  - pubchem: resolved by compound name (or "cid:12345") to a PubChem 3D conformer SDF
 *             (falls back to the 2D record if no conformer exists).
 *  - pdb:     an RCSB entry; only the C-alpha backbone is kept (for antibodies).
 *
 * `scripts/fetch-structures.ts` resolves these and writes public/structures/*.
 * The viewer never calls external services at runtime.
 */
export type StructureDef = { label: string; source: "pubchem" | "pdb"; query: string; note?: string };

const IGG: StructureDef = { label: "IgG antibody backbone (PDB 1IGT)", source: "pdb", query: "1IGT", note: "Representative intact IgG, C-alpha trace. Not the specific antibody." };
const adc = (payloadLabel: string, payloadQuery: string, note?: string): StructureDef[] => [
  { label: `Payload: ${payloadLabel}`, source: "pubchem", query: payloadQuery, note },
  IGG,
];

export const structures: Record<string, StructureDef[]> = {
  // ---- ADCs: payload first, then antibody backbone ----
  "sacituzumab-govitecan": adc("SN-38", "7-ethyl-10-hydroxycamptothecin"),
  "trastuzumab-deruxtecan": adc("Deruxtecan (linker + DXd)", "deruxtecan"),
  "datopotamab-deruxtecan": adc("Deruxtecan (linker + DXd)", "deruxtecan"),
  "sacituzumab-tirumotecan": adc("Belotecan (payload parent)", "belotecan", "Sac-TMT carries a belotecan-derived TOP1 inhibitor (T030); belotecan shown."),
  "trastuzumab-emtansine": adc("DM1 (mertansine)", "mertansine"),
  "enfortumab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  "brentuximab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  "tisotumab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  "telisotuzumab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  "disitamab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  "zilovertamab-vedotin": adc("MMAE", "monomethyl auristatin E"),
  cmg901: adc("MMAE", "monomethyl auristatin E"),
  "mirvetuximab-soravtansine": adc("DM4 (ravtansine)", "ravtansine"),
  "gemtuzumab-ozogamicin": adc("Calicheamicin", "calicheamicin gamma1"),
  "belantamab-mafodotin": adc("MMAF", "monomethyl auristatin F"),
  "patritumab-deruxtecan": adc("Deruxtecan (linker + DXd)", "deruxtecan"),
  "ifinatamab-deruxtecan": adc("Deruxtecan (linker + DXd)", "deruxtecan"),
  "raludotatug-deruxtecan": adc("Deruxtecan (linker + DXd)", "deruxtecan"),
  "izalontamab-brengitecan": adc("Exatecan (payload parent)", "exatecan", "Iza-bren carries Ed-04, a camptothecin derivative; exatecan shown."),
  "tilatamig-samrotecan": adc("Exatecan (payload class)", "exatecan", "TOP1 inhibitor payload; exatecan shown as class representative."),
  ak146d1: adc("Exatecan (payload class)", "exatecan", "TOP1 inhibitor payload; exatecan shown as class representative."),
  "puxitatug-samrotecan": adc("Exatecan (payload class)", "exatecan", "TOP1 inhibitor payload; exatecan shown as class representative."),
  zynlonta: adc("PBD dimer (tesirine payload SG3199 parent)", "SG3199"),

  // ---- Antibodies / bispecifics / engagers ----
  pembrolizumab: [IGG], nivolumab: [IGG], ipilimumab: [IGG], atezolizumab: [IGG], durvalumab: [IGG], "relatlimab-nivolumab": [IGG], dostarlimab: [IGG], cemiplimab: [IGG],
  trastuzumab: [IGG], amivantamab: [IGG], zanidatamab: [IGG], zenocutuzumab: [IGG], ivonescimab: [IGG], teclistamab: [IGG], glofitamab: [IGG],
  tarlatamab: [{ label: "BiTE-like format (IgG backbone shown for scale)", source: "pdb", query: "1IGT", note: "Tarlatamab is a half-life-extended BiTE; intact IgG shown as reference." }],
  blinatumomab: [{ label: "BiTE (IgG backbone shown for reference)", source: "pdb", query: "1IGT", note: "Blinatumomab is a tandem scFv (~55 kDa); intact IgG shown as reference." }],
  tebentafusp: [{ label: "TCR–scFv fusion (IgG backbone for reference)", source: "pdb", query: "1IGT" }],

  // ---- Small molecules ----
  osimertinib: [{ label: "Osimertinib", source: "pubchem", query: "osimertinib" }],
  lorlatinib: [{ label: "Lorlatinib", source: "pubchem", query: "lorlatinib" }],
  sotorasib: [{ label: "Sotorasib", source: "pubchem", query: "sotorasib" }],
  adagrasib: [{ label: "Adagrasib", source: "pubchem", query: "adagrasib" }],
  daraxonrasib: [{ label: "Daraxonrasib (RMC-6236)", source: "pubchem", query: "daraxonrasib" }],
  encorafenib: [{ label: "Encorafenib", source: "pubchem", query: "encorafenib" }],
  selpercatinib: [{ label: "Selpercatinib", source: "pubchem", query: "selpercatinib" }],
  zongertinib: [{ label: "Zongertinib", source: "pubchem", query: "zongertinib" }],
  zidesamtinib: [{ label: "Zidesamtinib", source: "pubchem", query: "zidesamtinib" }],
  olaparib: [{ label: "Olaparib", source: "pubchem", query: "olaparib" }],
  niraparib: [{ label: "Niraparib", source: "pubchem", query: "niraparib" }],
  talazoparib: [{ label: "Talazoparib", source: "pubchem", query: "talazoparib" }],
  palbociclib: [{ label: "Palbociclib", source: "pubchem", query: "palbociclib" }],
  ribociclib: [{ label: "Ribociclib", source: "pubchem", query: "ribociclib" }],
  abemaciclib: [{ label: "Abemaciclib", source: "pubchem", query: "abemaciclib" }],
  capivasertib: [{ label: "Capivasertib", source: "pubchem", query: "capivasertib" }],
  inavolisib: [{ label: "Inavolisib", source: "pubchem", query: "inavolisib" }],
  gedatolisib: [{ label: "Gedatolisib", source: "pubchem", query: "gedatolisib" }],
  vepdegestrant: [{ label: "Vepdegestrant (PROTAC)", source: "pubchem", query: "vepdegestrant" }],
  elacestrant: [{ label: "Elacestrant", source: "pubchem", query: "elacestrant" }],
  belzutifan: [{ label: "Belzutifan", source: "pubchem", query: "belzutifan" }],
  relacorilant: [{ label: "Relacorilant", source: "pubchem", query: "relacorilant" }],
  revumenib: [{ label: "Revumenib", source: "pubchem", query: "revumenib" }],
  vorasidenib: [{ label: "Vorasidenib", source: "pubchem", query: "vorasidenib" }],
  venetoclax: [{ label: "Venetoclax", source: "pubchem", query: "venetoclax" }],
  imatinib: [{ label: "Imatinib", source: "pubchem", query: "imatinib" }],
  tucatinib: [{ label: "Tucatinib", source: "pubchem", query: "tucatinib" }],
  carboplatin: [{ label: "Carboplatin", source: "pubchem", query: "carboplatin" }],
  paclitaxel: [{ label: "Paclitaxel", source: "pubchem", query: "paclitaxel" }],

  // ---- Radiopharmaceuticals / tracers (ligand shown) ----
  pluvicto: [{ label: "PSMA-617 (vipivotide tetraxetan)", source: "pubchem", query: "vipivotide tetraxetan" }],
  lutathera: [{ label: "DOTATATE (oxodotreotide)", source: "pubchem", query: "oxodotreotide" }],
  pylarify: [{ label: "DCFPyL (piflufolastat)", source: "pubchem", query: "piflufolastat" }],
  ryz101: [{ label: "DOTATATE (oxodotreotide)", source: "pubchem", query: "oxodotreotide" }],
  "ac225-psma": [{ label: "PSMA-617 (vipivotide tetraxetan)", source: "pubchem", query: "vipivotide tetraxetan" }],
};
