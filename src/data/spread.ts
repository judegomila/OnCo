/**
 * Metastatic spread patterns: where each cancer usually goes when it spreads, ranked by frequency tier,
 * with the sources behind the ranking. Tiers are used rather than precise percentages because the numbers
 * depend on the series (autopsy, registry at diagnosis, or over the disease course); a `pct` string is
 * given only where a source states it. Ids in `cancer` are cancer entities; `region` keys are body-map
 * regions (src/data/body-regions.ts) or the extra anchors in SPREAD_ANCHORS. Checked by spread.test.ts.
 *
 * Sources used across entries:
 *  - Disibio G, French SW. Metastatic patterns of cancers: results from a large autopsy study. Arch Pathol Lab Med 2008.
 *  - Budczies J et al. The landscape of metastatic progression patterns across major human cancers. Oncotarget 2015.
 *  - Riihimäki M et al. Metastatic sites and survival in lung cancer. Lung Cancer 2014; Patterns of metastasis in colon and rectal cancer. Sci Rep 2016; Clinical landscape of cancer metastases. Cancer Med 2018.
 *  - Coleman RE. Clinical features of metastatic bone disease and risk of skeletal morbidity. Clin Cancer Res 2006.
 *  - Aupérin A et al. Prophylactic cranial irradiation for patients with small-cell lung cancer in complete remission. NEJM 1999.
 */
export type SpreadTier = "most common" | "common" | "less common" | "rare";
export type SpreadSite = { site: string; region: string; tier: SpreadTier; pct?: string; note?: string };
export type Spread = { cancer: string; primary: string; sites: SpreadSite[]; sources: string[]; note?: string };

const DISIBIO = "https://doi.org/10.5858/2008-132-931-MPOCRF";
const BUDCZIES = "https://doi.org/10.18632/oncotarget.2677";
const RIIHIMAKI_LUNG = "https://doi.org/10.1016/j.lungcan.2014.07.020";
const RIIHIMAKI_CRC = "https://doi.org/10.1038/srep29765";
const RIIHIMAKI_LANDSCAPE = "https://doi.org/10.1002/cam4.1697";
const COLEMAN = "https://doi.org/10.1158/1078-0432.CCR-06-0931";
const AUPERIN = "https://doi.org/10.1056/NEJM199908123410703";

/** Anchors (400 × 980 body-map space) for sites that are not body-map regions. */
export const SPREAD_ANCHORS: Record<string, { label: string; at: [number, number] }> = {
  peritoneum: { label: "Peritoneum", at: [200, 428] },
  adrenal: { label: "Adrenal glands", at: [172, 366] },
  pleura: { label: "Pleura", at: [268, 262] },
  "distant-nodes": { label: "Distant lymph nodes", at: [116, 268] },
  marrow: { label: "Bone marrow", at: [150, 452] },
  orbit: { label: "Orbit", at: [186, 78] },
  "soft-tissue": { label: "Skin and soft tissue", at: [96, 560] },
  spine: { label: "Spine (leptomeninges)", at: [200, 330] },
  "contralateral-lung": { label: "Other lung", at: [264, 280] },
  ovary: { label: "Ovaries", at: [232, 456] },
  "regional-nodes": { label: "Regional lymph nodes", at: [116, 268] },
  "local-brain": { label: "Elsewhere in the brain", at: [242, 70] },
  vagina: { label: "Vagina", at: [200, 500] },
};

export const SPREAD: Spread[] = [
  { cancer: "tnbc", primary: "breast", sources: [BUDCZIES, DISIBIO, COLEMAN],
    sites: [{ site: "Lungs", region: "lung", tier: "most common", note: "Visceral spread earlier and more often than in HR-positive disease" }, { site: "Brain", region: "brain", tier: "common", note: "Higher brain-metastasis rate than other breast subtypes" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }] },
  { cancer: "breast-hr-positive", primary: "breast", sources: [COLEMAN, BUDCZIES, DISIBIO],
    sites: [{ site: "Bone", region: "bone", tier: "most common", pct: "65-75% of patients with advanced disease develop bone metastases", note: "Often the first and only site for years" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Lungs and pleura", region: "lung", tier: "common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Brain", region: "brain", tier: "less common" }, { site: "Ovaries and peritoneum (lobular)", region: "peritoneum", tier: "rare", note: "Invasive lobular carcinoma favours serosal and gynaecological sites" }] },
  { cancer: "breast-her2-positive", primary: "breast", sources: [BUDCZIES, DISIBIO],
    sites: [{ site: "Bone", region: "bone", tier: "most common" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Brain", region: "brain", tier: "common", note: "Brain metastases occur in a large share of patients over the disease course; CNS activity of newer anti-HER2 drugs matters" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }] },
  { cancer: "nsclc", primary: "lung", sources: [RIIHIMAKI_LUNG, DISIBIO, BUDCZIES],
    sites: [{ site: "Other lung and pleura", region: "contralateral-lung", tier: "most common" }, { site: "Bone", region: "bone", tier: "most common" }, { site: "Brain", region: "brain", tier: "common", note: "Adenocarcinoma and EGFR- or ALK-driven tumours spread to the brain often; brain MRI is part of staging" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Adrenal glands", region: "adrenal", tier: "common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }] },
  { cancer: "sclc", primary: "lung", sources: [AUPERIN, RIIHIMAKI_LUNG, DISIBIO],
    sites: [{ site: "Brain", region: "brain", tier: "most common", pct: "About half of patients without prophylactic cranial irradiation develop brain metastases within 3 years", note: "The reason cranial irradiation or MRI surveillance follows a response" }, { site: "Liver", region: "liver", tier: "most common" }, { site: "Bone and marrow", region: "bone", tier: "common" }, { site: "Adrenal glands", region: "adrenal", tier: "common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }] },
  { cancer: "mesothelioma", primary: "lung", sources: [DISIBIO],
    sites: [{ site: "Pleura and chest wall (local spread)", region: "pleura", tier: "most common", note: "Grows along the pleura and into the chest wall and diaphragm; distant spread is late" }, { site: "Other lung", region: "contralateral-lung", tier: "common" }, { site: "Peritoneum", region: "peritoneum", tier: "common" }, { site: "Liver", region: "liver", tier: "less common" }, { site: "Bone", region: "bone", tier: "rare" }] },
  { cancer: "colorectal", primary: "colon", sources: [RIIHIMAKI_CRC, DISIBIO, BUDCZIES],
    sites: [{ site: "Liver", region: "liver", tier: "most common", note: "Portal venous drainage sends colon cancer to the liver first; resectable liver metastases can be cured" }, { site: "Lungs", region: "lung", tier: "common", note: "Rectal cancers reach the lung more often than colon cancers (systemic venous drainage)" }, { site: "Peritoneum", region: "peritoneum", tier: "common", note: "Commoner in right-sided and mucinous tumours" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Bone", region: "bone", tier: "less common" }, { site: "Brain", region: "brain", tier: "rare" }] },
  { cancer: "gastric", primary: "stomach", sources: [RIIHIMAKI_LANDSCAPE, DISIBIO],
    sites: [{ site: "Peritoneum", region: "peritoneum", tier: "most common", note: "Diffuse-type tumours seed the peritoneum; staging laparoscopy looks for it" }, { site: "Liver", region: "liver", tier: "most common", note: "Intestinal-type tumours favour the liver" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Lungs", region: "lung", tier: "less common" }, { site: "Ovaries (Krukenberg tumour)", region: "ovary", tier: "less common" }, { site: "Bone", region: "bone", tier: "less common" }] },
  { cancer: "esophageal", primary: "oesophagus", sources: [RIIHIMAKI_LANDSCAPE, DISIBIO],
    sites: [{ site: "Liver", region: "liver", tier: "most common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Adrenal glands", region: "adrenal", tier: "less common" }, { site: "Brain", region: "brain", tier: "rare" }] },
  { cancer: "pancreatic", primary: "pancreas", sources: [DISIBIO, BUDCZIES, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Liver", region: "liver", tier: "most common", note: "Most patients with metastatic disease have liver involvement" }, { site: "Peritoneum", region: "peritoneum", tier: "common" }, { site: "Lungs", region: "lung", tier: "common", note: "Lung-only spread carries a better prognosis" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Bone", region: "bone", tier: "less common" }] },
  { cancer: "cholangiocarcinoma", primary: "liver", sources: [DISIBIO, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Liver (intrahepatic spread)", region: "liver", tier: "most common" }, { site: "Regional and distant lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Peritoneum", region: "peritoneum", tier: "common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Bone", region: "bone", tier: "less common" }] },
  { cancer: "hcc", primary: "liver", sources: [DISIBIO, BUDCZIES],
    sites: [{ site: "Elsewhere in the liver and portal vein", region: "liver", tier: "most common", note: "Intrahepatic spread and portal vein invasion dominate and drive staging" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Regional lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Adrenal glands", region: "adrenal", tier: "less common" }, { site: "Peritoneum", region: "peritoneum", tier: "less common" }] },
  { cancer: "prostate", primary: "prostate", sources: [COLEMAN, DISIBIO, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Bone (spine, pelvis, ribs)", region: "bone", tier: "most common", pct: "65-75% of patients with advanced disease develop bone metastases", note: "Typically bone-forming (sclerotic) lesions; PSMA PET finds them early" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Liver", region: "liver", tier: "less common", note: "Liver spread marks aggressive, often neuroendocrine-like disease" }, { site: "Lungs", region: "lung", tier: "less common" }, { site: "Brain", region: "brain", tier: "rare" }] },
  { cancer: "urothelial", primary: "bladder", sources: [DISIBIO, BUDCZIES, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Distant lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Peritoneum", region: "peritoneum", tier: "less common" }, { site: "Brain", region: "brain", tier: "rare" }] },
  { cancer: "rcc", primary: "kidney", sources: [DISIBIO, BUDCZIES],
    sites: [{ site: "Lungs", region: "lung", tier: "most common" }, { site: "Bone", region: "bone", tier: "common", note: "Bone-destroying (lytic) lesions" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Liver", region: "liver", tier: "common" }, { site: "Adrenal glands", region: "adrenal", tier: "less common" }, { site: "Brain", region: "brain", tier: "less common" }, { site: "Pancreas and thyroid (late, unusual sites)", region: "pancreas", tier: "rare", note: "Renal cell carcinoma is known for late spread to odd sites years after nephrectomy" }] },
  { cancer: "ovarian", primary: "pelvis-female", sources: [DISIBIO],
    sites: [{ site: "Peritoneum and omentum", region: "peritoneum", tier: "most common", note: "Spreads by shedding cells into the abdominal cavity rather than through the blood; ascites is common" }, { site: "Pleura (malignant effusion)", region: "pleura", tier: "common" }, { site: "Liver surface, then parenchyma", region: "liver", tier: "common" }, { site: "Retroperitoneal lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Lungs", region: "lung", tier: "less common" }, { site: "Brain", region: "brain", tier: "rare" }] },
  { cancer: "endometrial", primary: "pelvis-female", sources: [DISIBIO, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Pelvic and para-aortic lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Vagina (local recurrence)", region: "vagina", tier: "common" }, { site: "Peritoneum", region: "peritoneum", tier: "common", note: "Serous and carcinosarcoma histologies behave like ovarian cancer" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Liver", region: "liver", tier: "less common" }, { site: "Bone", region: "bone", tier: "less common" }] },
  { cancer: "cervical", primary: "pelvis-female", sources: [DISIBIO, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Pelvic and para-aortic lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Liver", region: "liver", tier: "less common" }, { site: "Peritoneum", region: "peritoneum", tier: "less common" }] },
  { cancer: "melanoma", primary: "skin", sources: [DISIBIO, BUDCZIES],
    sites: [{ site: "Skin and soft tissue (in-transit, satellite)", region: "soft-tissue", tier: "most common" }, { site: "Regional then distant lymph nodes", region: "distant-nodes", tier: "most common" }, { site: "Lungs", region: "lung", tier: "common" }, { site: "Liver", region: "liver", tier: "common", note: "Uveal melanoma spreads almost exclusively to the liver" }, { site: "Brain", region: "brain", tier: "common", note: "One of the cancers most likely to reach the brain; brain MRI is part of stage IV staging" }, { site: "Bone", region: "bone", tier: "less common" }, { site: "Small bowel", region: "colon", tier: "less common" }] },
  { cancer: "glioblastoma", primary: "brain", sources: [DISIBIO],
    sites: [{ site: "Elsewhere in the brain (white matter tracts, corpus callosum)", region: "local-brain", tier: "most common", note: "Infiltrates along white matter; recurrence is usually within 2 cm of the original site" }, { site: "Spinal cord and leptomeninges", region: "spine", tier: "less common" }, { site: "Outside the nervous system", region: "lung", tier: "rare", note: "Extracranial metastasis is exceptional; lymph node spread does not occur because the brain has no conventional lymphatics" }] },
  { cancer: "head-and-neck", primary: "head-neck", sources: [DISIBIO, RIIHIMAKI_LANDSCAPE],
    sites: [{ site: "Cervical lymph nodes (levels I-V)", region: "regional-nodes", tier: "most common", note: "Neck node status is the main prognostic factor and decides neck dissection or radiotherapy" }, { site: "Lungs", region: "lung", tier: "common", note: "The commonest distant site; also where second primary cancers from smoking appear" }, { site: "Bone", region: "bone", tier: "less common" }, { site: "Liver", region: "liver", tier: "less common" }, { site: "Distant lymph nodes", region: "distant-nodes", tier: "less common" }] },
  { cancer: "thyroid", primary: "thyroid", sources: [DISIBIO],
    sites: [{ site: "Cervical lymph nodes", region: "regional-nodes", tier: "most common", note: "Papillary cancer spreads to neck nodes early and often, with little effect on survival" }, { site: "Lungs", region: "lung", tier: "common", note: "Follicular cancer favours blood-borne spread to lung and bone" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Brain", region: "brain", tier: "rare" }, { site: "Liver", region: "liver", tier: "rare" }] },
  { cancer: "sarcoma", primary: "bone", sources: [DISIBIO],
    sites: [{ site: "Lungs", region: "lung", tier: "most common", note: "Sarcomas spread through the blood almost exclusively to the lungs; lung metastasectomy is standard" }, { site: "Bone", region: "spine", tier: "less common" }, { site: "Liver (GIST, leiomyosarcoma of the gut)", region: "liver", tier: "less common" }, { site: "Lymph nodes", region: "distant-nodes", tier: "rare", note: "Except epithelioid, synovial, rhabdomyosarcoma and clear cell subtypes" }] },
  { cancer: "neuroblastoma", primary: "kidney", sources: [DISIBIO],
    sites: [{ site: "Bone marrow", region: "marrow", tier: "most common", note: "Marrow involvement defines stage M; MIBG scans and marrow biopsies are part of staging" }, { site: "Bone (skull, orbit, long bones)", region: "bone", tier: "most common" }, { site: "Lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Liver", region: "liver", tier: "common", note: "Massive liver involvement in infants (stage MS) can regress on its own" }, { site: "Orbit and skin", region: "orbit", tier: "less common", note: "Periorbital bruising (raccoon eyes) and blue skin nodules in infants" }] },
  { cancer: "neuroendocrine", primary: "neuroendocrine", sources: [DISIBIO],
    sites: [{ site: "Liver", region: "liver", tier: "most common", note: "Liver metastases drive carcinoid syndrome; SSTR PET maps them and Lu-177 dotatate treats them" }, { site: "Mesenteric and distant lymph nodes", region: "distant-nodes", tier: "common" }, { site: "Bone", region: "bone", tier: "common" }, { site: "Peritoneum", region: "peritoneum", tier: "less common" }, { site: "Lungs", region: "lung", tier: "less common" }] },
  { cancer: "multiple-myeloma", primary: "blood", sources: [COLEMAN],
    sites: [{ site: "Bone (lytic lesions: spine, skull, ribs, pelvis)", region: "bone", tier: "most common", note: "Myeloma is a marrow cancer; bone lesions are part of the disease definition (CRAB criteria), not metastases in the usual sense" }, { site: "Soft tissue plasmacytomas", region: "soft-tissue", tier: "less common" }, { site: "Blood (plasma cell leukaemia)", region: "blood", tier: "rare" }] },
];

export function spreadFor(cancerId: string): Spread | undefined { return SPREAD.find((s) => s.cancer === cancerId); }
export const SPREAD_CANCER_IDS = SPREAD.map((s) => s.cancer);
