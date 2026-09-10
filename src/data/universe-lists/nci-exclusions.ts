/**
 * NCI A to Z entries with no corpus record of their own, each with the reason. Keyed by NCI page slug.
 * Combination acronyms written in capitals (ABVD, FOLFOX ...) are excluded automatically by
 * scripts/fetch-nci-drugs.ts; mixed-case regimen names are listed here. Every other exclusion is either a
 * formulation or fixed-dose combination of molecules that have their own records, or a product the NCI lists
 * for a cancer-related condition that is not itself an oncology therapeutic.
 */
export const NCI_EXCLUSIONS: Record<string, string> = {
  // Regimen acronyms the automatic rule misses (mixed case)
  bumel: "regimen: busulfan plus melphalan conditioning; see the busulfan and melphalan records",
  "hyper-cvad": "regimen: hyperfractionated cyclophosphamide, vincristine, doxorubicin and dexamethasone; see the component records",
  stanfordv: "regimen: Stanford V for Hodgkin lymphoma; see the component records",
  veip: "regimen: vinblastine, ifosfamide and cisplatin; see the component records",
  // Formulations and fixed-dose combinations of molecules with their own records
  "amivantamab-and-hyaluronidase": "subcutaneous formulation of amivantamab (Rybrevant Faspro); see the amivantamab record",
  "pertuzumabtrastuzumabandhyaluronidase-zzxf": "fixed-dose subcutaneous combination of pertuzumab and trastuzumab (Phesgo); see those records",
  rituximabandhyaluronidasehuman: "subcutaneous formulation of rituximab (Rituxan Hycela); see the rituximab record",
  "trastuzumabandhyaluronidase-oysk": "subcutaneous formulation of trastuzumab (Herceptin Hylecta); see the trastuzumab record",
  "niraparib-tosylate-monohydrate-and-abiraterone-acetate": "fixed-dose combination of niraparib and abiraterone (Akeega); see those records",
  "ribociclib-succinate-and-letrozole": "co-pack of ribociclib and letrozole (Kisqali Femara Co-Pack); see those records",
  // Listed by the NCI for conditions related to cancer; not oncology therapeutics
  "caplacizumab-yhdp": "acquired thrombotic thrombocytopenic purpura; not an oncology therapeutic",
  fostamatinibdisodium: "chronic immune thrombocytopenia; not an oncology therapeutic",
  "ravulizumab-cwvz": "paroxysmal nocturnal haemoglobinuria, atypical haemolytic uraemic syndrome and neuromuscular indications; not an oncology therapeutic",
  eltrombopagolamine: "immune thrombocytopenia, aplastic anaemia and hepatitis C thrombocytopenia; not an oncology therapeutic",
  romiplostim: "immune thrombocytopenia and haematopoietic syndrome of acute radiation; not an oncology therapeutic",
  "emapalumab-lzsg": "primary haemophagocytic lymphohistiocytosis; not an oncology therapeutic",
  "propranolol-hydrochloride": "proliferating infantile haemangioma, a benign vascular tumour; not an oncology therapeutic",
};
