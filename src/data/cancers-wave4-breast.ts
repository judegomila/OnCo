/**
 * Wave 4, family 3 (24 Sept 2026): the histological entities of breast carcinoma that the WHO Classification of
 * Tumours of the Breast (5th edition, 2019) names and the corpus had only as strings (docs/CANCER-PAGES.md). The
 * corpus's breast pages were built by receptor status (HR-positive, HER2-positive, triple-negative) and setting; this
 * file adds the special histological types under `breast-cancer`: invasive lobular carcinoma, invasive carcinoma of no
 * special type (invasive ductal carcinoma), tubular, mucinous, papillary, secretory, cribriform, metaplastic, apocrine,
 * micropapillary, adenoid cystic and neuroendocrine carcinomas, and lobular carcinoma in situ (the precursor the WHO
 * names beside ductal carcinoma in situ, which already had a page).
 *
 * Rule cases: "medullary carcinoma" from the public list was folded by the 2019 WHO classification into invasive
 * carcinoma of no special type with medullary pattern; this file wrote it, src/data/spikes/tnbc-core.ts wrote it too,
 * and the September 2026 family round folded the two into the tnbc-core record (see the comment where it stood);
 * "invasive ductal carcinoma" is the same tumour as no special type and is one page. Luminal A and B, HER2-low,
 * ESR1- and PIK3CA-mutant disease are molecular or treatment subgroups of the HR-positive page and stay strings.
 *
 * Shares: invasive lobular carcinoma about 15 percent and the most and second most common types from Cancer Research
 * UK; the rest quoted from the paper named beside each figure. Registered in src/data/index.ts as cancersWave4Breast.
 */
import type { CancerInput } from "@/lib/schema";
import { linkSiblings } from "./cancers-wave4-shared";

const asOf = "2026-09-24";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
const tags = ["subtype-page", "wave4", "breast"];

const SRC = {
  pdq: { label: "NCI PDQ: breast cancer treatment", url: "https://www.cancer.gov/types/breast/treatment" },
  crukTypes: { label: "Cancer Research UK: types of breast cancer", url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/types" },
  crukIlc: { label: "Cancer Research UK: invasive lobular breast cancer", url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/types/invasive-lobular-breast-cancer" },
  who2019: doi("Tan 2020, Histopathology: the 2019 WHO classification of tumours of the breast", "10.1111/his.14091"),
  ciriello: doi("Ciriello 2015, Cell: comprehensive molecular portraits of invasive lobular breast cancer (TCGA)", "10.1016/j.cell.2015.09.033"),
  ilcImaging: doi("Healthcare 2023: invasive lobular carcinoma, a review of imaging modalities and pathology concordance", "10.3390/healthcare11050746"),
  ilcMargins: doi("American Journal of Surgery 2022: positive margins after mastectomy in 357 patients with invasive lobular carcinoma", "10.1016/j.amjsurg.2021.05.021"),
  ilcSeer: doi("PLoS One 2014: sentinel node dissection alone versus axillary dissection in early invasive lobular carcinoma, SEER", "10.1371/journal.pone.0089778"),
  ilcMale: doi("Breast Cancer (Dove) 2017: invasive lobular carcinoma of the male breast, systematic review", "10.2147/bctt.s126341"),
  rakhaTubular: doi("Rakha 2010, JCO: tubular carcinoma of the breast, further evidence for its excellent prognosis", "10.1200/jco.2009.23.5051"),
  tubular2003: doi("Breast Journal 2003: tubular carcinoma of the breast, institutional experience and review", "10.1046/j.1524-4741.2003.09409.x"),
  mucinousTaiwan: doi("World J Surg Oncol 2013: pure mucinous carcinoma of the breast, 93 cases against 2,674 ductal carcinomas", "10.1186/1477-7819-11-139"),
  rakhaPapillary: doi("Rakha 2011, Am J Surg Pathol: encapsulated papillary carcinoma of the breast, 302 papillary carcinomas", "10.1097/pas.0b013e31821b3f65"),
  reversePolarity: doi("Modern Pathology 2018: solid papillary carcinoma with reverse polarity, nine cases", "10.1038/s41379-018-0047-1"),
  secretorySeer: doi("Breast 2012: secretory carcinoma of the breast, 83 patients in SEER", "10.1016/j.breast.2012.02.013"),
  secretoryEtv6: doi("Am J Surg Pathol 2017: secretory carcinoma of the skin with ETV6 fusions, analogue of the breast and salivary tumours", "10.1097/pas.0000000000000734"),
  pageCribriform: doi("Page 1983, Histopathology: invasive cribriform carcinoma of the breast, 51 of 1,003 carcinomas", "10.1111/j.1365-2559.1983.tb02265.x"),
  venableCribriform: doi("Venable 1990, Human Pathology: infiltrating cribriform carcinoma of the breast, a distinctive entity", "10.1016/0046-8177(90)90235-w"),
  medullaryBasal: doi("Modern Pathology 2010: medullary features and prognosis in 165 triple-negative basal-like carcinomas", "10.1038/modpathol.2010.123"),
  medullaryShiraz: doi("Iranian J Med Sci 2018: medullary breast carcinoma and invasive ductal carcinoma, 22-year series", "10.30476/ijms.2017.40545"),
  metaplasticTnbc: doi("Clinical Breast Cancer 2017: metaplastic carcinoma is more aggressive than matched triple-negative breast cancer", "10.1016/j.clbc.2017.04.009"),
  metaplasticSeer: doi("The Oncologist 2018: metaplastic breast cancer by receptor status in SEER 2010 to 2014, 1,516 women", "10.1634/theoncologist.2017-0398"),
  apocrineHer2: doi("Modern Pathology 2010: EGFR and HER2 expression in 55 invasive apocrine carcinomas of the breast", "10.1038/modpathol.2010.50"),
  apocrineReview: doi("Vranic 2013, Histology and Histopathology: apocrine carcinoma of the breast, comprehensive review", "10.14670/hh-28.1393"),
  impcUpdate: doi("Archives of Pathology 2016: invasive micropapillary carcinoma of the breast, an update", "10.5858/arpa.2016-0040-ra"),
  impcHif: doi("BMC Cancer 2012: a spheroid model of the chemoresistance of invasive micropapillary carcinoma", "10.1186/1471-2407-12-4"),
  adccSeer: doi("Breast Cancer Research 2010: adenoid cystic carcinoma of the breast in the United States 1977 to 2006, SEER", "10.1186/bcr2613"),
  adccGenome: doi("Journal of Pathology 2015: genomic landscape of adenoid cystic carcinoma of the breast", "10.1002/path.4573"),
  necbSeries: doi("Cancers 2020: primary neuroendocrine neoplasms of the breast, case series and literature review", "10.3390/cancers12030733"),
  scncb: doi("Int J Surg Case Rep 2017: primary small cell neuroendocrine carcinoma of the breast, case and review", "10.1016/j.ijscr.2017.07.002"),
  kingLcis: doi("King 2015, JCO: lobular carcinoma in situ, a 29-year longitudinal experience of 1,060 patients", "10.1200/jco.2015.61.4743"),
  plcis: doi("Annals of Surgical Oncology 2015: pleomorphic lobular carcinoma in situ, features and management", "10.1245/s10434-015-4552-x"),
};

type Sub = Omit<CancerInput, "kind" | "asOf" | "group" | "parent">;
const sub = (x: Sub): CancerInput => ({ kind: "cancer", asOf, group: "breast", parent: "breast-cancer", tags, ...x });

export const cancersWave4Breast: CancerInput[] = linkSiblings([
  sub({ id: "invasive-lobular-carcinoma", name: "Invasive lobular carcinoma of the breast", wikipedia: W("Invasive_lobular_carcinoma"),
    aka: ["Invasive lobular carcinoma", "ILC", "Lobular breast cancer", "Invasive lobular breast cancer", "Infiltrating lobular carcinoma", "Pleomorphic lobular carcinoma"],
    burden: "Around 15 in every 100 breast cancers, the second most common type (Cancer Research UK). GLOBOCAN counts it within the 2,296,840 breast cancers of 2022.",
    tldr: "Invasive lobular carcinoma is the second most common type of breast cancer, about one in seven cases. Its cells have lost the glue protein E-cadherin, so they spread in single files rather than forming a lump, which makes it hard to see on mammograms and to measure. Almost all cases are hormone-receptor positive and are treated like other hormone-driven breast cancer.",
    summary: "Invasive lobular carcinoma is defined in the WHO classification by its discohesive growth, single cells and single-file cords infiltrating the stroma, and by loss of E-cadherin from inactivation of CDH1 (Tan 2020). The Cancer Genome Atlas profiled 817 breast tumours including 127 lobular, 490 ductal and 88 mixed: beyond E-cadherin loss, mutations of PTEN, TBX3 and FOXA1 were enriched in lobular disease, PTEN loss went with the highest AKT phosphorylation of any breast cancer subtype, proliferation and immune signatures defined three lobular transcriptional subtypes with different survival, and mixed ductal-lobular tumours were molecularly either lobular-like or ductal-like rather than true hybrids (Ciriello 2015).\n\nHow it differs from its parent: detection and surgery. Its diffuse growth makes it multicentric, multifocal and bilateral more often, with a high likelihood of incomplete excision after breast-conserving surgery; MRI and contrast-enhanced mammography surpass conventional imaging for its extent and improve surgical outcomes when added to the work-up (Healthcare 2023). Even mastectomy left positive margins in 10.6 percent of 357 patients, and in 18.7 percent of T3 tumours (American Journal of Surgery 2022). Metastases favour the peritoneum, ovaries, gut and meninges, and are often small foci needing immunohistochemistry to find in nodes; in 1,269 SEER patients meeting the Z0011 criteria, sentinel node dissection alone and full axillary dissection gave the same survival (PLoS One 2014). It is extremely uncommon in men (Breast Cancer 2017).\n\nHow common: about 15 percent of breast cancers (Cancer Research UK).\n\nTreatment follows the HR-positive breast cancer page, because almost all lobular cancers are hormone-receptor positive and HER2-negative: endocrine therapy with CDK4/6 inhibitors in advanced disease, and surgery with the imaging above. Whether lobular disease responds differently to chemotherapy or specific endocrine agents is under study; the fluoroestradiol PET trial linked here images its oestrogen receptors.",
    subtypes: ["Classic invasive lobular carcinoma (single-file, E-cadherin negative, luminal A)", "Pleomorphic lobular carcinoma (higher grade, sometimes HER2-positive)", "Solid, alveolar and tubulolobular variants", "Mixed ductal and lobular carcinoma (molecularly one or the other)", "Lobular carcinoma in situ (own page)"],
    biomarkers: ["E-cadherin loss on immunohistochemistry and CDH1 inactivation", "Oestrogen and progesterone receptor (almost always positive), HER2 (usually negative)", "PTEN, TBX3 and FOXA1 mutations (enriched)", "Extent on MRI or contrast-enhanced mammography before surgery"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated as HR-positive breast cancer: surgery planned with MRI, endocrine therapy, CDK4/6 inhibitors in advanced disease; sentinel node biopsy as in ductal disease.", refs: ["breast-hr-positive", "endocrine-therapy", "cdk46-inhibitor", "tamoxifen", "letrozole", "mastectomy"] },
    ],
    drugs: ["tamoxifen", "letrozole", "fulvestrant", "abemaciclib", "palbociclib", "ribociclib"], trials: ["nct04252859"], targets: ["cdh1"], technologies: ["endocrine-therapy", "cdk46-inhibitor"], terms: ["mastectomy"],
    related: ["breast-cancer", "breast-hr-positive", "invasive-breast-carcinoma-no-special-type", "lobular-carcinoma-in-situ", "tubular-carcinoma-breast"],
    links: [SRC.crukIlc, SRC.who2019, SRC.ciriello, SRC.ilcImaging, SRC.ilcMargins, SRC.ilcSeer, SRC.ilcMale] }),

  sub({ id: "invasive-breast-carcinoma-no-special-type", name: "Invasive breast carcinoma of no special type (invasive ductal carcinoma)", wikipedia: W("Invasive_carcinoma_of_no_special_type"),
    aka: ["Invasive ductal carcinoma", "IDC", "Invasive carcinoma of no special type", "NST", "Infiltrating ductal carcinoma", "Invasive ductal carcinoma not otherwise specified", "Invasive breast cancer"],
    burden: "The most common type of breast cancer (Cancer Research UK); in the Cancer Genome Atlas breast series, 490 of 817 tumours were ductal (Ciriello 2015).",
    tldr: "Invasive carcinoma of no special type, still widely called invasive ductal carcinoma, is the ordinary form of breast cancer and by far the most common. The name means the tumour has no special pattern that would put it in one of the rarer types; everything on the main breast cancer page and its receptor subpages is written about this type unless it says otherwise.",
    summary: "The WHO classification uses invasive breast carcinoma of no special type for the large group of adenocarcinomas that cannot be classified as a special histological type; the 2019 edition keeps the term, treats the former medullary, oncocytic, lipid-rich, glycogen-rich, sebaceous and pleomorphic carcinomas as patterns within it, and grades it by the Nottingham system (Tan 2020). It is then divided clinically by oestrogen receptor, progesterone receptor and HER2 status and, in early disease, by genomic assays such as Oncotype DX, which is how the corpus's HR-positive, HER2-positive and triple-negative pages and their subpages are organised.\n\nHow it differs from its parent: it is not a subtype so much as the default; the special types on the sibling pages (lobular, tubular, mucinous, cribriform, papillary, secretory, adenoid cystic, apocrine, micropapillary, metaplastic, neuroendocrine) are defined against it and several carry a better or worse prognosis than grade-matched no special type disease.\n\nHow common: the most common type of breast cancer (Cancer Research UK); Cancer Research UK gives no percentage and this page does not estimate one.\n\nTreatment: entirely as the parent and its receptor pages describe (surgery, radiotherapy, endocrine therapy, chemotherapy, HER2-directed therapy and immunotherapy by receptor status and stage).",
    subtypes: ["Invasive carcinoma of no special type, HR-positive and HER2-negative (luminal)", "Invasive carcinoma of no special type, HER2-positive", "Invasive carcinoma of no special type, triple-negative (basal-like)", "Invasive carcinoma of no special type with medullary pattern (own page)", "Oncocytic, lipid-rich, glycogen-rich and sebaceous patterns (rare, within no special type)"],
    biomarkers: ["Oestrogen receptor, progesterone receptor and HER2", "Nottingham grade", "Ki-67 and genomic assays (Oncotype DX and others) in early HR-positive disease"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated as the parent's receptor pages describe.", refs: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "oncotype-dx"] },
    ],
    drugs: ["oncotype-dx"],
    related: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-lobular-carcinoma", "medullary-pattern-breast-carcinoma", "ductal-carcinoma-in-situ"],
    links: [SRC.crukTypes, SRC.pdq, SRC.who2019, SRC.ciriello] }),

  sub({ id: "tubular-carcinoma-breast", name: "Tubular carcinoma of the breast", wikipedia: W("Tubular_carcinoma"),
    aka: ["Tubular carcinoma", "Tubular breast cancer", "Pure tubular carcinoma"],
    burden: "102 of 2,608 carcinomas (3.9 percent) in the Nottingham series that defined its prognosis (Rakha 2010); more often found by screening than other types.",
    tldr: "Tubular carcinoma is a rare, slow-growing type of breast cancer made of small, well-formed tubes, usually found small on a screening mammogram. Its outlook is excellent, better even than other grade 1 breast cancers, and it is treated with surgery, radiotherapy where the breast is kept, and hormone therapy.",
    summary: "The WHO classification defines tubular carcinoma by well-formed open tubules with a single layer of low-grade cells making up over 90 percent of the tumour (Tan 2020). In the Nottingham series of 2,608 carcinomas, the 102 tubular carcinomas, compared with 212 grade 1 ductal carcinomas, were more often detected by screening, smaller, and less often showed lymphovascular invasion; they had longer disease-free and breast cancer-specific survival, and no patient developed distant metastasis or died of the disease without an intervening recurrence of a different histological type (Rakha 2010). In an earlier series of 44 patients, nodes were involved in 4 of 32 examined (13 percent), tumours under 15 mm had no nodal involvement, ductal carcinoma in situ accompanied 52 percent, second breast cancers developed in 16 percent and overall mortality was 2 percent (Breast Journal 2003).\n\nHow it differs from its parent: it is the special type with the best prognosis, hormone-receptor positive and HER2-negative (luminal A), and its main risk is a second, different breast cancer rather than relapse of the tubular tumour (Rakha 2010).\n\nHow common: 3.9 percent of the Nottingham series (Rakha 2010); no population figure was found in the sources read.\n\nTreatment: as HR-positive breast cancer, generally the minimum the parent page allows: breast-conserving surgery with radiotherapy (local recurrence 1 of 20 without radiotherapy against 0 of 13 with it in the 2003 series), sentinel node biopsy, and endocrine therapy; chemotherapy is rarely indicated.",
    subtypes: ["Pure tubular carcinoma (over 90 percent tubules; luminal A)", "Mixed tubular carcinoma (tubular with another low-grade component)", "Tubular carcinoma with associated ductal carcinoma in situ (about half of cases)"],
    biomarkers: ["Percentage of tubule formation (over 90 percent)", "Oestrogen and progesterone receptor positive, HER2 negative", "Node status (usually negative)"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated as HR-positive breast cancer with the least treatment the parent page allows: surgery, radiotherapy after breast conservation, endocrine therapy; chemotherapy rarely.", refs: ["breast-hr-positive", "tamoxifen", "letrozole", "endocrine-therapy"] },
    ],
    drugs: ["tamoxifen", "letrozole"], technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "breast-hr-positive", "invasive-cribriform-carcinoma-breast", "invasive-lobular-carcinoma", "mucinous-carcinoma-breast"],
    links: [SRC.who2019, SRC.rakhaTubular, SRC.tubular2003, SRC.crukTypes] }),

  sub({ id: "mucinous-carcinoma-breast", name: "Mucinous carcinoma of the breast", wikipedia: W("Mucinous_carcinoma"),
    aka: ["Mucinous carcinoma of the breast", "Colloid carcinoma of the breast", "Mucinous breast cancer", "Pure mucinous carcinoma"],
    burden: "About 3.5 percent of newly diagnosed breast cancers in Taiwan (World J Surg Oncol 2013); typically a cancer of older women. No UK figure was found in the sources read.",
    tldr: "Mucinous carcinoma is a rare type of breast cancer in which the cancer cells float in pools of mucus they have made. It is usually hormone-receptor positive, slow-growing and less likely to reach the lymph nodes than ordinary breast cancer, so its outlook is good and it is treated like other hormone-driven breast cancer.",
    summary: "The WHO classification defines pure mucinous carcinoma by clusters of low-grade cells in lakes of extracellular mucin making up over 90 percent of the tumour, and separates it from mixed mucinous carcinoma and from mucinous cystadenocarcinoma (Tan 2020). In a Taiwanese series of 93 pure mucinous carcinomas compared with 2,674 infiltrating ductal carcinomas, hormone receptor expression was higher and grade, hormone receptor status and node involvement were all more favourable, confirming its less aggressive behaviour (World J Surg Oncol 2013).\n\nHow it differs from its parent: mucin makes the tumour soft and well-circumscribed, so it can look benign on imaging; nodal spread is uncommon in the pure form; and the mixed form (mucinous with ordinary no special type carcinoma) behaves like the ordinary component and is treated as such.\n\nHow common: about 3.5 percent of breast cancers in the Taiwanese series (World J Surg Oncol 2013).\n\nTreatment: as HR-positive breast cancer, following the parent page, with endocrine therapy and usually no chemotherapy for the pure form; the sources read report treatment patterns, not trials in this type.",
    subtypes: ["Pure mucinous carcinoma (over 90 percent mucinous; luminal A)", "Mixed mucinous carcinoma (treated as its no special type component)", "Mucinous carcinoma with neuroendocrine differentiation (hypercellular type B)", "Mucinous cystadenocarcinoma (very rare)"],
    biomarkers: ["Proportion of mucinous component (over 90 percent for pure)", "Oestrogen and progesterone receptor (usually positive), HER2 (usually negative)", "Node status"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated as HR-positive breast cancer: surgery, radiotherapy after breast conservation, endocrine therapy; chemotherapy for the mixed form as for no special type disease.", refs: ["breast-hr-positive", "endocrine-therapy", "tamoxifen", "letrozole"] },
    ],
    drugs: ["tamoxifen", "letrozole"], technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "breast-hr-positive", "tubular-carcinoma-breast", "papillary-carcinoma-breast", "invasive-micropapillary-carcinoma-breast"],
    links: [SRC.who2019, SRC.mucinousTaiwan, SRC.crukTypes] }),

  sub({ id: "papillary-carcinoma-breast", name: "Papillary carcinomas of the breast (encapsulated, solid and invasive papillary)", wikipedia: W("Breast_cancer_classification"),
    aka: ["Papillary carcinomas of the breast", "Papillary carcinoma of the breast", "Encapsulated papillary carcinoma", "Intracystic papillary carcinoma", "Solid papillary carcinoma", "Invasive papillary carcinoma", "Tall cell carcinoma with reversed polarity"],
    burden: "Papillary carcinoma accounts for 0.5 to 1 percent of breast cancer; in a review of 302 papillary carcinomas from three institutions, 208 (84 percent) were intracystic (encapsulated), 30 (12 percent) solid papillary and 9 papillary ductal carcinoma in situ (Rakha 2011).",
    tldr: "Papillary carcinomas are rare breast cancers, about one in a hundred, that grow as finger-like fronds on stalks, often inside a cyst, mostly in older women. The encapsulated and solid forms behave almost like non-invasive disease and have an excellent outlook; the truly invasive papillary form is treated like ordinary hormone-driven breast cancer.",
    summary: "The 2019 WHO classification groups four entities under papillary neoplasms: encapsulated papillary carcinoma (a papillary carcinoma within a cystic space surrounded by a fibrous capsule, with no myoepithelial layer), solid papillary carcinoma (in situ and invasive forms, often with neuroendocrine differentiation), invasive papillary carcinoma, and the new tall cell carcinoma with reversed polarity (Tan 2020). Papillary carcinoma makes up 0.5 to 1 percent of breast cancer; in 302 cases, solid papillary carcinoma was more often accompanied by conventional invasive carcinoma than the intracystic form, and lesions lacking a myoepithelial layer are regarded as a special low-grade form of invasion whose behaviour is nonetheless indolent (Rakha 2011). Tall cell carcinoma with reversed polarity (solid papillary carcinoma with reverse polarity) has cuboid or tall cells with eosinophilic cytoplasm at the basal pole, grooved nuclei, Ki-67 under 5 percent in seven of nine cases, CK5/6 and calretinin expression, and a favourable prognosis (Modern Pathology 2018).\n\nHow it differs from its parent: papillary carcinomas are cancers of older women, hormone-receptor positive and HER2-negative in the encapsulated and solid forms, with an outlook close to that of ductal carcinoma in situ; the pathology question (in situ or invasive) decides the treatment more than the stage.\n\nHow common: 0.5 to 1 percent of breast cancer (Rakha 2011).\n\nTreatment: encapsulated and solid papillary carcinoma without conventional invasion are managed like ductal carcinoma in situ with excision and consideration of radiotherapy and endocrine therapy; a conventional invasive component is staged and treated as HR-positive breast cancer on the parent page (Rakha 2011).",
    subtypes: ["Encapsulated (intracystic) papillary carcinoma, 84 percent of papillary carcinomas", "Solid papillary carcinoma, in situ or invasive, often neuroendocrine", "Invasive papillary carcinoma (luminal, HR-positive)", "Tall cell carcinoma with reversed polarity (IDH2-mutated, favourable)"],
    biomarkers: ["Absence of a myoepithelial layer (encapsulated and solid forms)", "Oestrogen and progesterone receptor positive, HER2 negative", "Ki-67 (low)", "Neuroendocrine markers in solid papillary carcinoma"],
    standardOfCare: [
      { setting: "Encapsulated or solid, no conventional invasion", approach: "Managed as ductal carcinoma in situ: excision, with radiotherapy and endocrine therapy considered.", refs: ["ductal-carcinoma-in-situ", "tamoxifen"] },
      { setting: "With conventional invasive carcinoma", approach: "Treated as HR-positive breast cancer.", refs: ["breast-hr-positive", "endocrine-therapy"] },
    ],
    drugs: ["tamoxifen"], technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "ductal-carcinoma-in-situ", "breast-hr-positive", "mucinous-carcinoma-breast", "invasive-micropapillary-carcinoma-breast"],
    links: [SRC.who2019, SRC.rakhaPapillary, SRC.reversePolarity] }),

  // secretory-carcinoma-breast is defined in src/data/spikes/tnbc-core.ts (parent tnbc: these entities are almost always triple-negative).

  sub({ id: "invasive-cribriform-carcinoma-breast", name: "Invasive cribriform carcinoma of the breast", wikipedia: W("Breast_cancer_classification"),
    aka: ["Invasive cribriform carcinoma", "Infiltrating cribriform carcinoma", "Cribriform breast cancer"],
    burden: "51 of 1,003 invasive breast carcinomas (5 percent) in the Edinburgh series showed a predominantly cribriform pattern, 35 of them classical (Page 1983); the pure form is rarer than that share suggests.",
    tldr: "Invasive cribriform carcinoma is a rare, low-grade type of breast cancer whose cells grow in sieve-like nests, closely related to tubular carcinoma. In its pure form it has an excellent outlook, with no deaths from the cancer in the defining series, and it is treated like other hormone-driven breast cancer with the least treatment possible.",
    summary: "The WHO classification defines invasive cribriform carcinoma by invasive nests with sieve-like spaces making up over 90 percent of the tumour (classical form) or over 50 percent with a tubular component (Tan 2020). In the Edinburgh review of 1,003 carcinomas, 51 were predominantly cribriform; of the 35 classical cases none had died of the carcinoma 10 to 21 years later and 30 remained alive, while the 16 mixed cases with less differentiated areas did worse but still better than invasive carcinoma in general (Page 1983). In the George Washington series pure and predominant cribriform carcinomas metastasised to axillary nodes frequently but almost never to more than three nodes, were oestrogen-receptor positive in 100 percent and progesterone-receptor positive in 69 percent, and had five-year survival of 100 percent for pure or at least 50 percent cribriform tumours (Venable 1990).\n\nHow it differs from its parent: with tubular carcinoma it forms the low-grade luminal special types with near-normal survival; it must be distinguished from cribriform ductal carcinoma in situ, which often accompanies it, and from adenoid cystic carcinoma.\n\nHow common: about 5 percent showed a predominant pattern in the 1983 series, and pure cases are fewer (Page 1983); no modern population figure was found in the sources read.\n\nTreatment: as HR-positive breast cancer following the parent page, with surgery, radiotherapy after breast conservation and endocrine therapy, and rarely chemotherapy; there is no trial in the type.",
    subtypes: ["Classical invasive cribriform carcinoma (over 90 percent cribriform; luminal A)", "Mixed invasive cribriform carcinoma (with tubular or no special type areas)", "Cribriform carcinoma with cribriform ductal carcinoma in situ"],
    biomarkers: ["Percentage of cribriform pattern", "Oestrogen receptor (100 percent positive) and progesterone receptor", "Node number (rarely more than three)"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated as HR-positive breast cancer with the least treatment the parent page allows.", refs: ["breast-hr-positive", "endocrine-therapy", "tamoxifen"] },
    ],
    drugs: ["tamoxifen"], technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "breast-hr-positive", "tubular-carcinoma-breast", "adenoid-cystic-carcinoma-breast", "ductal-carcinoma-in-situ"],
    links: [SRC.who2019, SRC.pageCribriform, SRC.venableCribriform] }),

  // medullary-pattern-breast-carcinoma is defined in src/data/spikes/tnbc-core.ts (parent tnbc). This file held a
  // second full page for the same concept, breast-carcinoma-medullary-pattern, written on the same day by a
  // different layer; both validated on their own branches and only collided in the corpus. The September 2026
  // family round (src/data/spikes/breast-core.ts) folded them into the tnbc-core record, whose cohort is much
  // larger (12,409 patients in 13 IBCSG trials, Huober 2012) and which the inbound links already pointed at,
  // and moved the two series this file carried and that record did not (Iranian J Med Sci 2018 and Modern
  // Pathology 2010), and this record's aliases, onto it as a supplement.

  // metaplastic-breast-carcinoma is defined in src/data/spikes/tnbc-core.ts (parent tnbc: these entities are almost always triple-negative).

  // apocrine-carcinoma-breast is defined in src/data/spikes/tnbc-core.ts (parent tnbc: these entities are almost always triple-negative).

  sub({ id: "invasive-micropapillary-carcinoma-breast", name: "Invasive micropapillary carcinoma of the breast", wikipedia: W("Breast_cancer_classification"),
    aka: ["Invasive micropapillary carcinoma", "IMPC", "Micropapillary breast cancer"],
    burden: "Rare in its pure form; the criteria separating pure from mixed micropapillary carcinoma remain imprecise, so published shares vary (Archives of Pathology 2016). No population figure is given in the sources read.",
    tldr: "Invasive micropapillary carcinoma is a rare type of breast cancer in which small clusters of cells float inside-out in empty spaces. It spreads to the lymph nodes far more often than ordinary breast cancer of the same size, but once that is allowed for its survival is similar, and it is treated by receptor status like other breast cancer, usually hormone-driven.",
    summary: "The WHO classification defines invasive micropapillary carcinoma by morule-like clusters of cells without fibrovascular cores lying in clear stromal spaces, with reversed polarity shown by the inside-out staining of epithelial membrane antigen and sialyl Lewis X (Tan 2020; Archives of Pathology 2016). It is a variant of luminal B breast cancer, hormone-receptor positive with HER2 positivity in a proportion, with frequent lymphovascular invasion and nodal metastasis; molecular studies show distinct profiles supporting its status as an entity but no single genomic aberration explaining its morphology (Archives of Pathology 2016). Laboratory work using MCF7 spheroids modelled the chemoresistance described in the tumour through HIF-1-driven P-glycoprotein expression (BMC Cancer 2012).\n\nHow it differs from its parent: its nodal spread is out of proportion to its size, so imaging of the axilla and node surgery matter more; mixed tumours (micropapillary with no special type) are common and the threshold for calling a tumour micropapillary is not agreed.\n\nHow common: no reliable share was found in the sources read.\n\nTreatment: by receptor status on the parent's pages, most often as HR-positive breast cancer with endocrine therapy, and with HER2-directed therapy when HER2-positive; there is no trial in the type.",
    subtypes: ["Pure invasive micropapillary carcinoma (luminal B, HR-positive)", "Mixed micropapillary and no special type carcinoma", "HER2-positive micropapillary carcinoma", "Mucinous carcinoma with micropapillary pattern (classification debated)"],
    biomarkers: ["Inside-out EMA or MUC1 staining", "Oestrogen and progesterone receptor (usually positive), HER2 (positive in a proportion)", "Lymphovascular invasion and node status"],
    standardOfCare: [
      { setting: "All stages", approach: "Treated by receptor status on the parent's pages, with careful axillary staging.", refs: ["breast-hr-positive", "breast-her2-positive", "endocrine-therapy"] },
    ],
    technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "breast-hr-positive", "papillary-carcinoma-breast", "mucinous-carcinoma-breast", "invasive-breast-carcinoma-no-special-type"],
    links: [SRC.who2019, SRC.impcUpdate, SRC.impcHif] }),

  // adenoid-cystic-carcinoma-breast is defined in src/data/spikes/tnbc-core.ts (parent tnbc: these entities are almost always triple-negative).

  sub({ id: "neuroendocrine-neoplasms-breast", name: "Neuroendocrine neoplasms of the breast", wikipedia: W("Breast_cancer_classification"),
    aka: ["Neuroendocrine carcinoma of the breast", "Neuroendocrine tumour of the breast", "Primary small cell neuroendocrine carcinoma of the breast", "Breast carcinoma with neuroendocrine differentiation"],
    burden: "Rare and probably under-diagnosed: five patients among 612 seen over 2008 to 2019 in one specialised neuroendocrine unit (Cancers 2020). No population figure is given in the sources read.",
    tldr: "Neuroendocrine neoplasms of the breast are rare breast cancers whose cells make hormone-like granules, ranging from slow-growing tumours to small cell carcinoma like that of the lung. They are easily mistaken for ordinary breast cancer or for spread from elsewhere; slow-growing forms are treated like hormone-driven breast cancer and small cell forms with the lung small cell regimens.",
    summary: "The 2019 WHO classification divides neuroendocrine neoplasms of the breast into well-differentiated neuroendocrine tumour, neuroendocrine carcinoma (small cell and large cell) and, separately, invasive carcinomas of other types with neuroendocrine differentiation such as solid papillary and hypercellular mucinous carcinoma (Tan 2020). The entity as first defined by the WHO in 2012 spans well-differentiated tumours to highly aggressive small cell carcinomas; correct diagnosis needs an interdisciplinary approach because the tumours are misclassified as carcinoma with neuroendocrine differentiation, no special type carcinoma or a metastasis to the breast, and in one specialised unit only five of 612 neuroendocrine patients had a breast primary (Cancers 2020). Primary small cell neuroendocrine carcinoma of the breast is histologically indistinguishable from the lung tumour, so a primary elsewhere must be excluded, and there is no standard approach to treatment because only a limited number of cases have been reported (Int J Surg Case Rep 2017).\n\nHow it differs from its parent: the well-differentiated tumours are usually hormone-receptor positive and behave like luminal breast cancer, whereas the small cell carcinomas are treated with the platinum-etoposide regimens of small cell lung cancer rather than the breast pathways; neither has a trial of its own.\n\nHow common: no incidence figure is given in the sources read.\n\nTreatment: well-differentiated tumours as HR-positive breast cancer on the parent page; small cell and large cell neuroendocrine carcinoma with surgery and the extrapulmonary neuroendocrine carcinoma pathway (platinum and etoposide, radiotherapy), as the case literature describes (Int J Surg Case Rep 2017).",
    subtypes: ["Well-differentiated neuroendocrine tumour of the breast (luminal, HR-positive)", "Small cell neuroendocrine carcinoma of the breast", "Large cell neuroendocrine carcinoma of the breast", "Invasive carcinoma with neuroendocrine differentiation (solid papillary, hypercellular mucinous)"],
    biomarkers: ["Synaptophysin, chromogranin A and INSM1", "Ki-67 and grade", "Oestrogen and progesterone receptor (positive in well-differentiated tumours)", "Exclusion of a lung or gut primary by imaging"],
    standardOfCare: [
      { setting: "Well-differentiated tumour", approach: "Treated as HR-positive breast cancer.", refs: ["breast-hr-positive", "endocrine-therapy"] },
      { setting: "Small cell or large cell neuroendocrine carcinoma", approach: "Surgery and the extrapulmonary neuroendocrine carcinoma pathway (platinum and etoposide, radiotherapy); no standard exists.", refs: ["extrapulmonary-nec", "cisplatin", "etoposide"] },
    ],
    drugs: ["cisplatin", "etoposide"], technologies: ["endocrine-therapy"],
    related: ["breast-cancer", "breast-hr-positive", "extrapulmonary-nec", "papillary-carcinoma-breast", "mucinous-carcinoma-breast"],
    links: [SRC.who2019, SRC.necbSeries, SRC.scncb] }),

  sub({ id: "lobular-carcinoma-in-situ", name: "Lobular carcinoma in situ (LCIS)", wikipedia: W("Lobular_carcinoma_in_situ"),
    aka: ["LCIS", "Lobular neoplasia", "Classic lobular carcinoma in situ", "Pleomorphic lobular carcinoma in situ", "Florid lobular carcinoma in situ", "Atypical lobular hyperplasia (lesser form)"],
    burden: "Found in a minority of breast biopsies, usually by chance; Memorial Sloan Kettering followed 1,060 women with LCIS and no concurrent cancer over 29 years, median age at diagnosis 50 (King 2015). No population incidence is given in the sources read.",
    tldr: "Lobular carcinoma in situ is not an invasive breast cancer but a marker that a woman is at higher risk of one: abnormal cells fill the milk-producing lobules without spreading. About one in five women develop breast cancer within ten years, in either breast and of any type; preventive tamoxifen cuts that to about one in fourteen, and the pleomorphic form is excised like ductal carcinoma in situ.",
    summary: "The WHO classification lists lobular carcinoma in situ among the lobular neoplasias, with atypical lobular hyperplasia as its lesser form and the pleomorphic and florid variants as higher-risk forms; like invasive lobular carcinoma it has lost E-cadherin (Tan 2020). In the Memorial Sloan Kettering cohort of 1,060 women with LCIS alone, 5 percent chose bilateral prophylactic mastectomy and 1,004 chose surveillance, 173 of them with chemoprevention; at a median follow-up of 81 months, 150 women developed 168 breast cancers (63 percent in the same breast, 25 percent in the other, 12 percent both), with no dominant histology (ductal carcinoma in situ 35 percent, invasive ductal 29 percent, invasive lobular 27 percent), and the ten-year cumulative risk was 7 percent with chemoprevention against 21 percent without (King 2015). Pleomorphic LCIS behaves differently: of 21 patients with pure pleomorphic LCIS on biopsy who had excision, 33.3 percent were found to have invasive carcinoma and 19 percent ductal carcinoma in situ, and the lesion was extensive or multifocal in 47.6 percent (Annals of Surgical Oncology 2015).\n\nHow it differs from its parent: it is a risk lesion and precursor rather than a cancer, is not staged, and its management is surveillance and prevention rather than treatment of a tumour, which is why it sits beside ductal carcinoma in situ under the breast cancer page.\n\nHow common: no incidence figure is given in the sources read.\n\nTreatment: for classic LCIS found on core biopsy, surveillance with annual imaging and consideration of chemoprevention with tamoxifen or an aromatase inhibitor (the low-dose tamoxifen trial TAM-01 included lobular carcinoma in situ among its intraepithelial neoplasias); excision to clear margins for pleomorphic or florid LCIS, given the upgrade rate; bilateral mastectomy only by informed choice (King 2015).",
    subtypes: ["Classic lobular carcinoma in situ (surveillance and chemoprevention)", "Pleomorphic lobular carcinoma in situ (excised like ductal carcinoma in situ)", "Florid lobular carcinoma in situ", "Atypical lobular hyperplasia (lesser lobular neoplasia)"],
    biomarkers: ["E-cadherin loss", "Oestrogen receptor (positive in classic LCIS)", "Pleomorphic or florid morphology (upgrade risk)", "Extent on MRI when considering excision"],
    standardOfCare: [
      { setting: "Classic LCIS on biopsy", approach: "Surveillance and chemoprevention (tamoxifen or an aromatase inhibitor); TAM-01 tested low-dose tamoxifen in intraepithelial neoplasia.", refs: ["tamoxifen", "tam-01", "aromatase-inhibitor"] },
      { setting: "Pleomorphic or florid LCIS", approach: "Excision to clear margins because of the upgrade rate to invasive cancer or ductal carcinoma in situ.", refs: ["ductal-carcinoma-in-situ", "mastectomy"] },
    ],
    drugs: ["tamoxifen"], trials: ["tam-01"], terms: ["aromatase-inhibitor", "carcinoma-in-situ", "mastectomy"], targets: ["cdh1"],
    related: ["breast-cancer", "ductal-carcinoma-in-situ", "invasive-lobular-carcinoma", "breast-hr-positive"],
    links: [SRC.who2019, SRC.kingLcis, SRC.plcis, SRC.crukTypes] }),
]);
