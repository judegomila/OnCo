/**
 * Supportive care medicines (decision of 24 September 2026): drug records whose approved indications are symptom
 * control, toxicity rescue or prophylaxis, or infection prophylaxis. They stay in the corpus as drugs and gain
 * `supportive: true` here (applied in src/data/index.ts), which renders the "Supportive care" pill, fills the Purpose
 * facet on /drugs/ and keeps them out of treatment counts and rankings (home counts grid, /rankings/, the treatment
 * references on standard-of-care rows). The value is the indication class the flag rests on, read from the record's
 * approvals; the rule the fetchers apply to new label text is isSupportiveIndication in src/lib/supportive-care.ts.
 *
 * Borderline records, decided as follows (src/lib/supportive-care.test.ts lists the same ids as exceptions):
 *   flagged   denosumab and zoledronic acid (bone protection labels; the giant cell tumour and adjuvant uses are the
 *             minority), leucovorin (rescue agent; its role in FOLFOX is modulation, not antitumour activity),
 *             trilaciclib (a CDK4/6 inhibitor approved only to reduce myelosuppression), tocilizumab (its oncology
 *             role is cytokine release syndrome rescue), samarium-153 lexidronam (approved for bone pain, not disease
 *             control), telotristat and cinacalcet (control of a tumour-caused syndrome), burosumab (correction of
 *             tumour-induced hypophosphataemia), the ITP agents eltrombopag, romiplostim and fostamatinib (in the corpus
 *             for thrombocytopenia support), belumosudil and remestemcel-L (graft-versus-host disease is a toxicity of
 *             transplant), plerixafor and motixafortide (stem cell mobilisation).
 *   not       dexamethasone and prednisone (antimyeloma and lymphoma labels), megestrol (palliative treatment of breast
 *   flagged   and endometrial cancer as well as cachexia), octreotide and lanreotide (antiproliferative PFS label),
 *             luspatercept, imetelstat and elritercept (they treat the anaemia that is the disease in lower-risk MDS),
 *             ruxolitinib (myelofibrosis and polycythaemia labels), radium-223 and the palliative photosensitisers
 *             (antitumour activity), omidubicel and Tregzi (grafts), emapalumab, ravulizumab and propranolol (their
 *             diseases are not cancer toxicities).
 */
export const SUPPORTIVE_DRUGS: Record<string, string> = {
  // Pancreatic enzyme replacement for exocrine insufficiency in pancreatic cancer (NICE NG85 1.6.1).
  pancrelipase: "pancreatic enzyme replacement",
  // Antiemetics: chemotherapy- and radiotherapy-induced nausea and vomiting.
  aprepitant: "antiemetic", granisetron: "antiemetic", ondansetron: "antiemetic", palonosetron: "antiemetic", "netupitant-palonosetron": "antiemetic",
  rolapitant: "antiemetic", dolasetron: "antiemetic", dronabinol: "antiemetic", nabilone: "antiemetic",
  // Myeloid growth factors: febrile neutropenia, marrow recovery, thrombocytopenia.
  filgrastim: "growth factor", pegfilgrastim: "growth factor", lipegfilgrastim: "growth factor", "efbemalenograstim-alfa": "growth factor",
  eflapegrastim: "growth factor", mecapegfilgrastim: "growth factor", lenograstim: "growth factor", sargramostim: "growth factor", oprelvekin: "growth factor",
  // Erythropoiesis-stimulating agents: chemotherapy-induced anaemia.
  "epoetin-alfa": "erythropoiesis-stimulating agent", "darbepoetin-alfa": "erythropoiesis-stimulating agent", "epoetin-theta": "erythropoiesis-stimulating agent",
  // Bone-modifying agents: hypercalcaemia of malignancy and skeletal-related events.
  denosumab: "bone-modifying agent", "zoledronic-acid": "bone-modifying agent", pamidronate: "bone-modifying agent", "ibandronic-acid": "bone-modifying agent",
  // Toxicity rescue, antidotes and protectants.
  amifostine: "cytoprotectant", dexrazoxane: "cardioprotectant and extravasation antidote", mesna: "uroprotectant", glucarpidase: "methotrexate rescue",
  "uridine-triacetate": "fluoropyrimidine antidote", leucovorin: "methotrexate rescue", "sodium-thiosulfate": "otoprotectant", palifermin: "mucositis prevention",
  pilocarpine: "radiation-induced dry mouth", rasburicase: "tumour lysis prophylaxis", trilaciclib: "myeloprotection", "avasopasem-manganese": "radioprotectant",
  defibrotide: "hepatic veno-occlusive disease", belumosudil: "graft-versus-host disease", "remestemcel-l": "graft-versus-host disease", tocilizumab: "cytokine release syndrome",
  memantine: "neuroprotection during brain radiotherapy",
  // Pain and symptom control.
  fentanyl: "breakthrough cancer pain", methylnaltrexone: "opioid-induced constipation", "samarium-153-lexidronam": "bone pain palliation",
  "telotristat-ethyl": "carcinoid syndrome diarrhoea", cinacalcet: "hypercalcaemia control", "talc-sclerosant": "malignant pleural effusion", burosumab: "tumour-induced osteomalacia",
  // Infection prophylaxis.
  "human-normal-immunoglobulin": "infection prophylaxis",
  // Transplant support: stem cell mobilisation and thrombocytopenia.
  plerixafor: "stem cell mobilisation", motixafortide: "stem cell mobilisation", eltrombopag: "thrombocytopenia", romiplostim: "thrombocytopenia", fostamatinib: "thrombocytopenia",
};

/** Borderline records left as treatments, with the reason; the test asserts none of them is flagged. */
export const SUPPORTIVE_NOT_FLAGGED: Record<string, string> = {
  dexamethasone: "antimyeloma label (Hemady) beside the antiemetic use", prednisone: "part of lymphoma and leukaemia regimens", megestrol: "palliative treatment of breast and endometrial cancer beside cachexia",
  "octreotide-lanreotide": "lanreotide carries an antiproliferative PFS label", luspatercept: "treats the anaemia that is the disease in lower-risk MDS", imetelstat: "treats lower-risk MDS", elritercept: "MDS anaemia in phase 3",
  ruxolitinib: "myelofibrosis and polycythaemia vera labels beside GVHD", "radium-223": "overall survival benefit in bone-metastatic prostate cancer", omidubicel: "a graft, not a supportive medicine", tregzi: "a graft, not a supportive medicine",
  emapalumab: "treats haemophagocytic lymphohistiocytosis", ravulizumab: "treats paroxysmal nocturnal haemoglobinuria", "propranolol-hemangeol": "treats infantile haemangioma",
  mavorixafor: "treats WHIM syndrome, an inherited immunodeficiency, not a cancer toxicity", raloxifene: "chemoprevention of breast cancer; the osteoporosis label is the setting",
  sirolimus: "an immunosuppressant: its only approval is prophylaxis of kidney transplant rejection, which the rule reads as prophylaxis but which is not a cancer toxicity. It is in the corpus because switching to it lowers the risk of the next cutaneous squamous cell carcinoma (TUMORAPA), which is chemoprevention rather than supportive care",
};
