/**
 * FDA companion diagnostic rows that the readouts in biomarker-readouts*.ts did not yet carry, one per device, indication and
 * drug as the FDA list prints them (FDA_CDX_URL, read 2026-11-03). Each row is attached to the readout it selects for
 * and merged onto that record in src/data/index.ts after the readout's own rows; a row the readout already holds (same
 * device, PMA number and drugs) is not added twice.
 *
 * Found by the cdx-fda denominator on /completeness/ (scripts/fetch-universe-regulatory.ts, src/lib/completeness.ts).
 * Three oncology rows have no readout in OnCo to attach to and stay listed there as gaps: the Dako EGFR pharmDx Kit
 * (EGFR protein expression, cetuximab and panitumumab in colorectal cancer), the ARUP PDGFRB FISH Assay (imatinib in
 * myelodysplastic or myeloproliferative disease) and the Cytocell KMT2A Breakapart FISH Probe Kit (revumenib in acute
 * leukaemia).
 */
import type { CompanionDiagnostic } from "@/lib/schema";
import { cdx } from "./biomarker-readouts";

export const CDX_FDA_ROWS: Record<string, CompanionDiagnostic[]> = {
  "alk-fusion": [
    cdx("Ventana ALK (D5F3) CDx Assay", "Ventana Medical Systems, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["crizotinib"], "P140025 (06/12/2015)", "roche-genentech"),
    cdx("Ventana ALK (D5F3) CDx Assay", "Ventana Medical Systems, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["ceritinib"], "P140025/S005 (05/26/2017)", "roche-genentech"),
    cdx("Vysis ALK Break Apart FISH Probe Kit", "Abbott Molecular Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["brigatinib"], "P110012/S020 (05/22/2020)", "abbott"),
    cdx("FoundationOne CDx", "Foundation Medicine Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["brigatinib"], "P170019/S023 (06/30/2021)", "foundation-medicine"),
  ],
  "braf-v600e": [
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Colorectal cancer - Plasma", ["encorafenib"], "P250027 (05/19/2026)", "guardant-health"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["dabrafenib","trametinib"], "P170019 (11/30/2017)", "foundation-medicine"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Melanoma - Tissue", ["trametinib"], "P170019 (11/30/2017)", "foundation-medicine"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Melanoma - Tissue", ["atezolizumab","cobimetinib","vemurafenib"], "P170019/S030 (01/19/2022)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Plasma", ["encorafenib","binimetinib"], "P190032/S011 (10/11/2023)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Metastatic Colorectal Cancer (mCRC) - Plasma", ["encorafenib"], "P190032/S010 (06/08/2023)", "foundation-medicine"),
    cdx("MI Cancer Seek (MCS)", "Caris Life Sciences", "Colorectal Cancer - Tissue", ["encorafenib","cetuximab"], "P240010 (11/05/2024)", "caris"),
    cdx("MI Cancer Seek (MCS)", "Caris Life Sciences", "Melanoma - Tissue", ["trametinib"], "P240010 (11/05/2024)", "caris"),
    cdx("PGDx elio tissue complete CDx", "Personal Genome Diagnostics, Inc.", "Melanoma - Tissue", ["dabrafenib","vemurafenib","cobimetinib","encorafenib","binimetinib","trametinib"], "P250036 (7/30/2026)"),
    cdx("MI Cancer Seek", "Caris Life Sciences", "Melanoma - Tissue", ["dabrafenib","vemurafenib"], "P240010 (11/05/2024)", "caris"),
    cdx("MI Cancer Seek", "Caris Life Sciences", "Melanoma - Tissue", ["cobimetinib","vemurafenib","encorafenib","binimetinib","dabrafenib","trametinib"], "P240010 (11/05/2024)", "caris"),
  ],
  "brca-germline": [
    cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories, Inc.", "Ovarian Cancer - Whole Blood", ["rucaparib"], "P140020/S016 (10/16/2018)", "myriad-genetics"),
  ],
  "brca-somatic": [
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Prostate Cancer - Tissue", ["niraparib","abiraterone"], "P170019/S042 (08/11/2023)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - plasma", ["niraparib","abiraterone"], "P190032/S014 (06/28/ 2024)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Plasma", ["olaparib"], "P190032/S016 (08/30/2024)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Plasma", ["olaparib"], "P200016 (11/06/2020)", "foundation-medicine"),
  ],
  "egfr-exon-19-deletion": [
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Non-small cell lung cancer (NSCLC) - Plasma", ["osimertinib"], "P250027 (05/19/2026)", "guardant-health"),
    cdx("therascreen EGFR RGQ PCR Kit", "Qiagen Manchester, Ltd.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["gefitinib"], "P120022/S001 (07/10/2015)", "qiagen"),
    cdx("ONCO/Reveal Dx Lung & Colon Cancer Assay (O/RDx-LCCA)", "Pillar Biosciences, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["erlotinib","osimertinib","gefitinib","afatinib","dacomitinib","lazertinib"], "P200011 (07/30/2021)", "pillar-biosciences"),
    cdx("MI Cancer Seek", "Caris Life Sciences", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["erlotinib","osimertinib","gefitinib","afatinib","dacomitinib","lazertinib"], "P240010 (11/05/2024)", "caris"),
  ],
  "egfr-exon-20-insertion": [
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Non-small cell lung cancer (NSCLC) - Plasma", ["amivantamab"], "P250027 (05/19/2026)", "guardant-health"),
  ],
  "esr1-mutation-ctdna": [
    cdx("Guardant360 CDx", "Guardant Health, Inc.", "Breast Cancer - Plasma", ["camizestrant"], "P200010/S024 (09/04/2026)", "guardant-health"),
    cdx("Guardant360 CDx", "Guardant Health, Inc.", "Breast Cancer - Plasma", ["vepdegestrant"], "P200010/S025 (05/01/2026)", "guardant-health"),
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Breast cancer - Plasma", ["elacestrant"], "P250027 (05/19/2026)", "guardant-health"),
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Breast Cancer - Plasma", ["imlunestrant"], "P250027 (05/19/2026)", "guardant-health"),
  ],
  "ezh2-y646-mutation": [
    cdx("cobas EZH2 Mutation Test", "Roche Molecular Systems, Inc.", "Follicular Lymphoma Tumor - Tissue", ["tazemetostat"], "P200014 (06/18/2020)", "roche-genentech"),
  ],
  "her2-ihc-3-plus": [
    cdx("HercepTest", "Dako Denmark A/S", "Breast Cancer - Tissue", ["pertuzumab"], "P980018/S015 (06/08/2012)", "agilent"),
    cdx("HercepTest", "Dako Denmark A/S", "Breast Cancer - Tissue", ["trastuzumab-emtansine"], "P980018/S016 (02/22/2013)", "agilent"),
    cdx("InSite Her-2/neu (CB11) Monoclonal Antibody", "Biogenex Laboratories, Inc.", "Breast Cancer - Tissue", ["trastuzumab"], "P040030 (12/22/2004)"),
    cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems, Inc.", "Breast Cancer - Tissue", ["trastuzumab-emtansine"], "P990081/S039 (05/03/2019)", "roche-genentech"),
  ],
  "her2-ish-amplified": [
    cdx("VENTANA HER2 Dual ISH DNA Probe Cocktail", "Ventana Medical Systems, Inc.", "Gastroesophageal adenocarcinoma (GEA: gastric, gastroesophageal junction, and esophageal adenocarcinoma)", ["zanidatamab"], "P190031/S016 (08/25/2026)", "roche-genentech"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Breast Cancer - Tissue", ["trastuzumab"], "P170019 (11/30/2017)", "foundation-medicine"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Breast Cancer - Tissue", ["pertuzumab"], "P170019 (11/30/2017)", "foundation-medicine"),
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Breast Cancer - Tissue", ["trastuzumab-emtansine"], "P170019 (11/30/2017)", "foundation-medicine"),
    cdx("HER2 CISH pharmDx Kit", "Dako Denmark A/S", "Breast Cancer - Tissue", ["trastuzumab"], "P100024 (11/30/2011)", "agilent"),
    cdx("HER2 FISH pharmDx Kit", "Dako Denmark A/S", "Breast Cancer - Tissue", ["pertuzumab"], "P040005/S006 (06/08/2012)", "agilent"),
    cdx("HER2 FISH pharmDx Kit", "Dako Denmark A/S", "Breast Cancer - Tissue", ["trastuzumab-emtansine"], "P040005/S009 (02/22/2013)", "agilent"),
    cdx("INFORM HER-2/neu", "Ventana Medical Systems, Inc.", "Breast Cancer - Tissue", ["trastuzumab"], "P940004 (12/30/1997)", "roche-genentech"),
    cdx("SPOT-LIGHT HER2 CISH Kit", "Life Technologies Corporation", "Breast Cancer - Tissue", ["trastuzumab"], "P050040 (07/01/2008)", "thermo-fisher"),
  ],
  "her2-mutation": [
    cdx("Oncomine Dx Express Test", "Life Technologies Corporation", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["sevabertinib"], "P240040/S005 (09/09/2026)", "life-technologies"),
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Non-small cell lung cancer (NSCLC) - Plasma", ["trastuzumab-deruxtecan"], "P250027 (05/19/2026)", "guardant-health"),
    cdx("Oncomine Dx Target Test", "Life Technologies Corporation", "Non-Small Cell Lung cancer (NSCLC) - Tissue", ["sevabertinib"], "P160045/S050 (11/19/2025)", "thermo-fisher"),
  ],
  "hrr-gene-mutation": [
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Metastatic Castrate Resistant Prostate cancer (mCRPC)-Plasma", ["talazoparib","enzalutamide"], "P190032/S029 (05/27/2026)", "foundation-medicine"),
    // Added 17 November 2026 from the FDA list (same row is on brca-germline): the whole-blood test for olaparib's mCRPC indication.
    // The row's biomarker column reads "BRCA1 and BRCA2", not the wider gene list this readout covers, so the indication says so.
    cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories, Inc.", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Whole Blood (BRCA1 and BRCA2 only)", ["olaparib"], "P140020/S020 (05/19/2020)", "myriad-genetics"),
  ],
  "kras-g12c": [
    cdx("Guardant360® Liquid CDx", "Guardant Health, Inc.", "Non-small cell lung cancer (NSCLC) - Plasma", ["sotorasib"], "P250027 (05/19/2026)", "guardant-health"),
  ],
  "kras-g12d": [
    // Added 17 November 2026 from the FDA list: "KRAS wild-type biomarkers (the absence of mutations in exons 2, 3, or 4) and NRAS wild-type biomarkers (the absence of mutations in exons 2, 3, or 4)".
    cdx("CRCDx RAS Mutation Detection Assay Kit", "EntroGen, Inc.", "Colorectal Cancer (CRC) - Tissue", ["panitumumab"], "P220005 (09/29/2023)", "entrogen"),
    // Added 17 November 2026 from the FDA list: "KRAS wild-type (absence of mutations in codons 12 and 13)", one row each for Erbitux and Vectibix.
    cdx("ONCO/Reveal Dx Lung & Colon Cancer Assay (O/RDx-LCCA)", "Pillar Biosciences, Inc.", "Colorectal Cancer - Tissue", ["cetuximab", "panitumumab"], "P200011 (07/30/2021)", "pillar-biosciences"),
  ],
  "met-ex14": [
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Non-Small Cell Lung Cancer (NSCLC) - Plasma", ["tepotinib"], "P190032/S015 (11/14/2024)", "foundation-medicine"),
  ],
  "pik3ca-hotspot-mutation": [
    cdx("FoundationOne CDx", "Foundation Medicine, Inc.", "Breast Cancer - Plasma", ["inavolisib"], "P170019/S062 (05/27/2026)", "foundation-medicine"),
    cdx("FoundationOne Liquid CDx", "Foundation Medicine, Inc.", "Breast Cancer - Plasma", ["alpelisib"], "P200006 (10/26/2020)", "foundation-medicine"),
    cdx("MI Cancer Seek (MCS)", "Caris Life Sciences", "Breast Cancer - Tissue", ["alpelisib"], "P240010 (11/05/2024)", "caris"),
  ],
  "ras-wild-type": [
    cdx("cobas KRAS Mutation Test", "Roche Molecular Systems, Inc.", "Colorectal Cancer - Tissue", ["cetuximab"], "P140023 (05/07/2015)", "roche-genentech"),
    cdx("cobas KRAS Mutation Test", "Roche Molecular Systems, Inc.", "Colorectal Cancer - Tissue", ["panitumumab"], "P140023 (05/07/2015)", "roche-genentech"),
    cdx("xT CDx", "Tempus Labs, Inc.", "Colorectal Cancer (CRC) - Tissue (Matching Blood/Saliva)", ["cetuximab"], "P210011 (04/28/2023)", "tempus"),
    cdx("xT CDx", "Tempus Labs, Inc.", "Colorectal Cancer (CRC) - Tissue (Matching Blood/Saliva)", ["panitumumab"], "P210011 (04/28/2023)", "tempus"),
  ],
};
