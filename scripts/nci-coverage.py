"""Build src/data/universe-lists/nci-cancer-types.json: the NCI A to Z list diffed against corpus cancer ids.

Run: python3 scripts/nci-coverage.py
The entry table is hand-normalised from https://www.cancer.gov/types (duplicates pointing at the same
PDQ page merged under one name). Update the table and re-run when the list or the corpus changes.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "universe-lists", "nci-cancer-types-coverage.json")

E = []
X, A, M = "existing", "added", "meta"


def e(name, path, status, ids, note=None):
    row = dict(name=name, nciUrl="https://www.cancer.gov" + path, status=status, matchedIds=ids)
    if note:
        row["note"] = note
    E.append(row)


e("Acute Lymphoblastic Leukemia (ALL)", "/types/leukemia", X, ["all-leukemia"])
e("Acute Myeloid Leukemia (AML)", "/types/leukemia", X, ["aml"])
e("Adolescents and Young Adults, Cancer in", "/types/aya", M, ["aya-oncology"], "Population page, not a cancer type; covered by the term aya-oncology.")
e("Adrenocortical Carcinoma", "/types/adrenocortical", X, ["adrenocortical"])
e("AIDS-Related Lymphoma", "/types/lymphoma", A, ["hiv-associated-lymphoma"])
e("Anal Cancer", "/types/anal", X, ["anal"])
e("Appendix Cancer", "/types/gi-neuroendocrine-tumors", X, ["appendiceal", "neuroendocrine"])
e("Astrocytomas, Childhood", "/types/brain", A, ["paediatric-low-grade-glioma", "dipg-dmg"])
e("Atypical Teratoid/Rhabdoid Tumor, Childhood", "/types/brain", A, ["atrt"])
e("Basal Cell Carcinoma of the Skin", "/types/skin", X, ["basal-cell-carcinoma"])
e("Bile Duct Cancer", "/types/liver", X, ["cholangiocarcinoma"])
e("Bladder Cancer", "/types/bladder", X, ["urothelial"])
e("Bone Cancer (Ewing Sarcoma, Osteosarcoma, Malignant Fibrous Histiocytoma)", "/types/bone", X, ["osteosarcoma", "ewing-sarcoma", "sarcoma"])
e("Brain Tumors", "/types/brain", X, ["glioblastoma", "medulloblastoma", "primary-cns-lymphoma"], "Umbrella; childhood entries listed separately.")
e("Breast Cancer", "/types/breast", X, ["breast-hr-positive", "breast-her2-positive", "tnbc"])
e("Bronchial Tumors, Childhood", "/types/lung", A, ["pleuropulmonary-blastoma"], "Covered by the childhood lung and airway tumours record.")
e("Burkitt Lymphoma", "/types/lymphoma", A, ["burkitt-lymphoma"])
e("Carcinoma of Unknown Primary", "/types/unknown-primary", X, ["cancer-of-unknown-primary"])
e("Central Nervous System Germ Cell Tumor, Childhood", "/types/brain", A, ["paediatric-germ-cell-tumours"])
e("Cervical Cancer", "/types/cervical", X, ["cervical"])
e("Childhood Cancers", "/types/childhood-cancers", M, ["childrens-oncology-group", "siop-europe", "race-for-children-act"], "Population page; the paediatric group and the paediatric fronts cover it.")
e("Childhood Cardiac (Heart) Tumors", "/types/cardiac/patient-child-cardiac-treatment-pdq", A, ["rare-childhood-cancers"])
e("Cholangiocarcinoma", "/types/liver", X, ["cholangiocarcinoma"])
e("Chordoma, Childhood", "/types/bone", A, ["chordoma"])
e("Chronic Lymphocytic Leukemia (CLL)", "/types/leukemia", X, ["cll"])
e("Chronic Myelogenous Leukemia (CML)", "/types/leukemia", X, ["cml"])
e("Colorectal Cancer", "/types/colorectal", X, ["colorectal"])
e("Craniopharyngioma, Childhood", "/types/brain", A, ["craniopharyngioma"])
e("Cutaneous T-Cell Lymphoma (Mycosis Fungoides and Sezary Syndrome)", "/types/lymphoma", X, ["peripheral-t-cell-lymphoma"], "Existing record carries the aliases CTCL and mycosis fungoides.")
e("Diffuse Intrinsic Pontine Glioma (DIPG)", "/types/brain", A, ["dipg-dmg"])
e("Ductal Carcinoma In Situ (DCIS)", "/types/breast/breast-cancer-types/dcis", A, ["ductal-carcinoma-in-situ"])
e("Endometrial Cancer", "/types/uterine", X, ["endometrial"])
e("Ependymoma, Childhood", "/types/brain", A, ["ependymoma"])
e("Esophageal Cancer", "/types/esophageal", X, ["esophageal"])
e("Esthesioneuroblastoma", "/types/head-and-neck", A, ["sinonasal"])
e("Ewing Sarcoma", "/types/bone", X, ["ewing-sarcoma"])
e("Extracranial Germ Cell Tumor, Childhood", "/types/extracranial-germ-cell", A, ["paediatric-germ-cell-tumours"])
e("Extragonadal Germ Cell Tumor", "/types/extragonadal-germ-cell", X, ["testicular", "paediatric-germ-cell-tumours"], "Adult extragonadal disease is staged and treated with testicular germ cell tumour protocols (IGCCCG).")
e("Fallopian Tube Cancer", "/types/ovarian", X, ["ovarian"])
e("Gallbladder Cancer", "/types/gallbladder", A, ["gallbladder"])
e("Gastric (Stomach) Cancer", "/types/stomach", X, ["gastric"])
e("Gastrointestinal Neuroendocrine Tumors", "/types/gi-neuroendocrine-tumors", X, ["neuroendocrine"])
e("Gastrointestinal Stromal Tumors (GIST)", "/types/soft-tissue-sarcoma", X, ["gist"])
e("Gestational Trophoblastic Disease", "/types/gestational-trophoblastic", X, ["gestational-trophoblastic"])
e("Glioma, Childhood", "/types/brain", A, ["paediatric-low-grade-glioma", "dipg-dmg"])
e("Hairy Cell Leukemia", "/types/leukemia", X, ["hairy-cell-leukemia"])
e("Head and Neck Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Hepatocellular (Liver) Cancer", "/types/liver", X, ["hcc", "hepatoblastoma"])
e("Hodgkin Lymphoma", "/types/lymphoma", X, ["hodgkin-lymphoma"])
e("Hypopharyngeal Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Intraocular (Uveal) Melanoma", "/types/eye", X, ["uveal-melanoma"])
e("Kaposi Sarcoma", "/types/soft-tissue-sarcoma", X, ["kaposi-sarcoma"])
e("Kidney (Renal Cell) Cancer", "/types/kidney", X, ["rcc"])
e("Langerhans Cell Histiocytosis", "/types/langerhans", A, ["langerhans-cell-histiocytosis"])
e("Laryngeal Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Leukemia", "/types/leukemia", X, ["all-leukemia", "aml", "cll", "cml", "hairy-cell-leukemia"], "Umbrella.")
e("Lip and Oral Cavity Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Lung Cancer", "/types/lung", X, ["nsclc", "sclc"])
e("Lymphoma", "/types/lymphoma", X, ["dlbcl", "hodgkin-lymphoma", "follicular-lymphoma", "mantle-cell-lymphoma", "peripheral-t-cell-lymphoma"], "Umbrella.")
e("Male Breast Cancer", "/types/breast/male-breast-cancer", A, ["male-breast-cancer"])
e("Medulloblastoma and Other CNS Embryonal Tumors, Childhood", "/types/brain", X, ["medulloblastoma", "atrt"])
e("Melanoma", "/types/skin", X, ["melanoma"])
e("Merkel Cell Carcinoma", "/types/skin", X, ["merkel-cell-carcinoma"])
e("Mesothelioma", "/types/mesothelioma", X, ["mesothelioma"])
e("Metastatic Cancer", "/types/metastatic-cancer", M, ["metastasis"], "Situation page, not a cancer type; covered by the term metastasis.")
e("Metastatic Squamous Neck Cancer with Occult Primary", "/types/head-and-neck", X, ["head-and-neck", "cancer-of-unknown-primary"])
e("Midline Tract Carcinoma With NUT Gene Changes", "/types/midline/patient-child-midline-tract-carcinoma-treatment-pdq", A, ["nut-carcinoma"])
e("Mouth Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Multiple Endocrine Neoplasia Syndromes", "/types/multiple-endocrine-neoplasia", A, ["multiple-endocrine-neoplasia"])
e("Multiple Myeloma / Plasma Cell Neoplasms", "/types/myeloma", X, ["multiple-myeloma"])
e("Mycosis Fungoides", "/types/lymphoma", X, ["peripheral-t-cell-lymphoma"])
e("Myelodysplastic Syndromes", "/types/myeloproliferative", X, ["mds"])
e("Myelodysplastic/Myeloproliferative Neoplasms", "/types/myeloproliferative", A, ["cmml"])
e("Myeloproliferative Neoplasms", "/types/myeloproliferative", X, ["myeloproliferative-neoplasms"])
e("Nasal Cavity and Paranasal Sinus Cancer", "/types/head-and-neck", A, ["sinonasal"])
e("Nasopharyngeal Cancer", "/types/head-and-neck", X, ["nasopharyngeal"])
e("Neuroblastoma", "/types/neuroblastoma", X, ["neuroblastoma"])
e("Non-Hodgkin Lymphoma", "/types/lymphoma", X, ["dlbcl", "follicular-lymphoma", "mantle-cell-lymphoma", "peripheral-t-cell-lymphoma", "burkitt-lymphoma"], "Umbrella.")
e("Non-Small Cell Lung Cancer", "/types/lung", X, ["nsclc"])
e("Oropharyngeal Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Osteosarcoma and Undifferentiated Pleomorphic Sarcoma of Bone", "/types/bone", X, ["osteosarcoma"])
e("Ovarian Cancer", "/types/ovarian", X, ["ovarian"])
e("Ovarian Germ Cell Tumors", "/types/ovarian", A, ["paediatric-germ-cell-tumours"], "Ovarian germ cell tumours are mostly adolescent and young-adult disease; carried as an alias on the childhood and adolescent germ cell record.")
e("Pancreatic Cancer", "/types/pancreatic", X, ["pancreatic"])
e("Pancreatic Neuroendocrine Tumors (Islet Cell Tumors)", "/types/pancreatic", X, ["neuroendocrine"])
e("Papillomatosis, Childhood Laryngeal", "/types/head-and-neck", A, ["rare-childhood-cancers"])
e("Paraganglioma", "/types/pheochromocytoma", A, ["pheochromocytoma-paraganglioma"])
e("Parathyroid Cancer", "/types/parathyroid", A, ["parathyroid-carcinoma"])
e("Penile Cancer", "/types/penile", A, ["penile"])
e("Pharyngeal Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Pheochromocytoma", "/types/pheochromocytoma", A, ["pheochromocytoma-paraganglioma"])
e("Pituitary Tumor", "/types/pituitary", A, ["pituitary-tumours"])
e("Pleuropulmonary Blastoma", "/types/lung", A, ["pleuropulmonary-blastoma"])
e("Pregnancy and Breast Cancer", "/types/breast/breast-cancer-during-pregnancy", M, ["cancer-in-pregnancy"], "Situation page; covered by the term cancer-in-pregnancy.")
e("Pregnancy and Hodgkin Lymphoma", "/types/lymphoma/hp/hodgkin-lymphoma-treatment-during-pregnancy-pdq", M, ["cancer-in-pregnancy", "hodgkin-lymphoma"])
e("Pregnancy and Non-Hodgkin Lymphoma", "/types/lymphoma/hp/non-hodgkin-lymphoma-treatment-during-pregnancy-pdq", M, ["cancer-in-pregnancy", "dlbcl"])
e("Primary Central Nervous System (CNS) Lymphoma", "/types/lymphoma", X, ["primary-cns-lymphoma"])
e("Primary Peritoneal Cancer", "/types/ovarian", X, ["ovarian"])
e("Prostate Cancer", "/types/prostate", X, ["prostate"])
e("Pulmonary Inflammatory Myofibroblastic Tumor", "/types/lung", A, ["inflammatory-myofibroblastic-tumour"])
e("Rare Cancers of Childhood", "/types/childhood-cancers/patient/rare-childhood-cancers-pdq", A, ["rare-childhood-cancers"])
e("Rectal Cancer", "/types/colorectal", X, ["colorectal"])
e("Recurrent Cancer", "/types/recurrent-cancer", M, ["late-recurrence"], "Situation page, not a cancer type.")
e("Retinoblastoma", "/types/retinoblastoma", X, ["retinoblastoma"])
e("Rhabdomyosarcoma, Childhood", "/types/soft-tissue-sarcoma", X, ["rhabdomyosarcoma"])
e("Salivary Gland Cancer", "/types/head-and-neck", X, ["salivary-gland"])
e("Sezary Syndrome", "/types/lymphoma", X, ["peripheral-t-cell-lymphoma"])
e("Skin Cancer", "/types/skin", X, ["melanoma", "basal-cell-carcinoma", "cutaneous-scc", "merkel-cell-carcinoma"], "Umbrella.")
e("Small Cell Lung Cancer", "/types/lung", X, ["sclc"])
e("Small Intestine Cancer", "/types/small-intestine", A, ["small-bowel"])
e("Soft Tissue Sarcoma", "/types/soft-tissue-sarcoma", X, ["sarcoma"])
e("Squamous Cell Carcinoma of the Skin", "/types/skin", X, ["cutaneous-scc"])
e("Testicular Cancer", "/types/testicular", X, ["testicular"])
e("Throat Cancer", "/types/head-and-neck", X, ["head-and-neck"])
e("Thymoma and Thymic Carcinoma (Thymus Cancer)", "/types/thymus-cancer", X, ["thymic-epithelial"])
e("Thyroid Cancer", "/types/thyroid", X, ["thyroid"])
e("Tracheobronchial Tumors, Childhood", "/types/lung", A, ["pleuropulmonary-blastoma"], "Covered by the childhood lung and airway tumours record.")
e("Transitional Cell Cancer of the Renal Pelvis and Ureter", "/types/kidney", X, ["urothelial"], "Upper tract urothelial carcinoma sits in the urothelial record.")
e("Urethral Cancer", "/types/urethral", A, ["urethral"])
e("Uterine Sarcoma", "/types/uterine", A, ["uterine-sarcoma"])
e("Vaginal Cancer", "/types/vaginal", A, ["vaginal"])
e("Vascular Tumors, Childhood", "/types/soft-tissue-sarcoma", A, ["vascular-tumours"])
e("Vulvar Cancer", "/types/vulvar", X, ["vulvar"])
e("Wilms Tumor and Other Childhood Kidney Tumors", "/types/kidney", X, ["wilms-tumor"])

EXTRA = [
    dict(id="ampullary", reason="Requested rare adult GI cancer; NCI folds it into the pancreatic and bile duct pages."),
    dict(id="desmoid-tumour", reason="Requested rare tumour with a recent approval (nirogacestat); NCI lists it under soft tissue sarcoma."),
    dict(id="tenosynovial-giant-cell-tumour", reason="Requested rare tumour with CSF1R inhibitors; NCI lists it under soft tissue sarcoma."),
    dict(id="epithelioid-sarcoma", reason="Requested rare sarcoma with tazemetostat; NCI lists it under soft tissue sarcoma."),
    dict(id="systemic-mastocytosis", reason="Requested rare haematologic neoplasm with avapritinib; not an NCI A to Z entry."),
    dict(id="histiocytoses", reason="Erdheim-Chester and Rosai-Dorfman disease; NCI lists only Langerhans cell histiocytosis."),
    dict(id="post-transplant-lymphoproliferative-disorder", reason="Requested rare lymphoma; NCI lists it under non-Hodgkin lymphoma."),
]

types = [x for x in E if x["status"] != M]
nx = sum(1 for x in types if x["status"] == X)
na = sum(1 for x in types if x["status"] == A)
added_ids = sorted({i for x in types if x["status"] == A for i in x["matchedIds"]})
out = dict(
    source="https://www.cancer.gov/types",
    title="NCI A to Z List of Cancer Types",
    checked="2026-09-10",
    method=(
        "Fetched the page, took every A to Z link text, merged duplicates that point at the same PDQ page under one "
        "normalised name, and matched each name against cancer ids, names and aliases in src/data/cancers.ts and "
        "src/data/spikes/*.ts. Population and situation pages (AYA, childhood cancers, metastatic, recurrent, pregnancy) "
        "are listed as meta and excluded from the coverage denominator. status: existing = record predates this pass; "
        "added = record created in the September 2026 NCI coverage pass (src/data/nci-coverage.ts)."
    ),
    coverage=dict(
        cancerTypeEntries=len(types),
        metaEntries=len(E) - len(types),
        coveredBefore=nx,
        coveredAfter=nx + na,
        percentBefore=round(100 * nx / len(types), 1),
        percentAfter=round(100 * (nx + na) / len(types), 1),
        newCancerRecordsForNciEntries=len(added_ids),
        newCancerRecordsBeyondNci=len(EXTRA),
    ),
    entries=E,
    addedBeyondNci=EXTRA,
)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(json.dumps(out["coverage"]))
print(len(added_ids), " ".join(added_ids))
