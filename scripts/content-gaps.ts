/**
 * Content gaps: how many pages are still to write and how many cross-connections the corpus can still make.
 * Pure function of the corpus plus the snapshots already in public/ (FDA notifications, EMA register, GLOBOCAN);
 * no network. Every number in docs/CONTENT-ROADMAP.md comes from this script.
 *
 *   npm run content:gaps              markdown tables on stdout
 *   npm run content:gaps -- --json    machine-readable
 *   npm run content:gaps -- --lists   also print the candidate lists (missing cancers, targets, trial acronyms...)
 *
 * Effort estimates use this week's measured rates: about 350 records or links per agent-hour for mechanical linking
 * (a fetcher or a corpus join with a review pass) and about 32 per agent-hour for written pages.
 */
import { readFileSync } from "node:fs";
import { graph } from "../src/lib/graph";
import { GLOBOCAN_MAP } from "../src/data/globocan-map";
import { regionalApprovals } from "../src/data/regional-approvals";
import type { Cancer, Drug, Entity, Trial } from "../src/lib/schema";

const LINK_RATE = 350; // links or mechanical records per agent-hour
const PAGE_RATE = 32; // written pages per agent-hour

const g = graph();
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
/** UK and US spellings and singular forms fold together so "Ewing's sarcoma" meets "Ewing sarcoma" and "tumor" meets "tumour". */
const fold = (s: string) => norm(s.replace(/\([^)]*\)/g, " ").replace(/'s\b/g, "").replace(/tumor/gi, "tumour").replace(/leukemia/gi, "leukaemia").replace(/myelogenous/gi, "myeloid").replace(/cancers\b/gi, "cancer").replace(/carcinomas\b/gi, "carcinoma").replace(/\bthe\b/gi, " "));

// ---------------------------------------------------------------------------------------------------------------------
// A public list of cancer types, read from https://en.wikipedia.org/wiki/List_of_cancer_types on 22 September 2026.
// It is a stated public list, not the WHO Blue Books (which are not machine-readable without a licence); the WHO
// classification names many more entities, so the count below is a floor.
// ---------------------------------------------------------------------------------------------------------------------
const PUBLIC_CANCER_LIST = `Adamantinoma|Chondrosarcoma|Chordoma|Ewing's sarcoma|Fibrocartilaginous mesenchymoma of bone|Leiomyosarcoma|Malignant fibrous histiocytoma|Myxosarcoma|Osteosarcoma|Rhabdomyosarcoma|Astrocytoma|Anaplastic astrocytoma|Brainstem glioma|Choroid plexus carcinoma|Craniopharyngioma|Ependymoma|Ganglioneuroma|Glioblastoma|Glioma|Hemangioblastoma|Medulloblastoma|Meningioma|Neuroblastoma|Neurofibroma|Oligodendroglioma|Paraganglioma|Pineal astrocytoma|Pineocytoma|Pineoblastoma|Pituitary adenoma|Pilocytic astrocytoma|Primary central nervous system lymphoma|Primitive neuroectodermal tumor|Schwannoma|Breast cancer|Ductal carcinoma in situ|Inflammatory breast cancer|Invasive ductal carcinoma|Invasive lobular carcinoma|Tubular carcinoma|Invasive cribriform carcinoma of the breast|Medullary carcinoma|Male breast cancer|Phyllodes tumor|Mammary secretory carcinoma|Mucinous carcinoma of the breast|Papillary carcinomas of the breast|Adrenocortical adenoma|Adrenocortical carcinoma|Carcinoid|Gastrinoma|Glucagonoma|Insulinoma|Islet cell carcinoma|Merkel cell carcinoma|Multiple endocrine neoplasia syndrome|Pancreatic cancer|Parathyroid cancer|Pheochromocytoma|Somatostatinoma|Thyroid cancer|VIPoma|Conjunctival melanoma|Optic nerve glioma|Orbital lymphoma|Retinoblastoma|Uveal melanoma|Anal cancer|Appendix cancer|Cholangiocarcinoma|Gastrointestinal carcinoid tumor|Colon cancer|Duodenal cancer|Gallbladder cancer|Gastric cancer|Gastrointestinal stromal tumor|Liver cancer|Rectal cancer|Small intestine cancer|Bladder cancer|Cervical cancer|Choriocarcinoma|Embryonal carcinoma|Endometrial cancer|Endodermal sinus tumor|Extragonadal germ cell tumor|Fallopian tube cancer|Gestational trophoblastic tumor|Kidney cancer|Leydig cell tumour|Ovarian cancer|Ovarian epithelial cancer|Ovarian germ cell tumor|Penile cancer|Prostate cancer|Renal cell carcinoma|Seminoma|Serous tumour|Sertoli cell tumour|Teratoma|Testicular cancer|Transitional cell cancer|Urethral cancer|Uterine sarcoma|Vaginal cancer|Vulvar cancer|Wilms tumor|Malignant oncocytoma|Esophageal cancer|Head and neck cancer|Nasopharyngeal carcinoma|Oral cancer|Oropharyngeal cancer|Paranasal sinus and nasal cavity cancer|Pharyngeal cancer|Salivary gland cancer|Hypopharyngeal cancer|Acute biphenotypic leukemia|Acute eosinophilic leukemia|Acute lymphoblastic leukemia|Acute myeloid leukemia|Acute myeloid dendritic cell leukemia|AIDS-related lymphoma|Anaplastic large cell lymphoma|Angioimmunoblastic T-cell lymphoma|B-cell prolymphocytic leukemia|Burkitt's lymphoma|Chronic lymphocytic leukemia|Chronic myelogenous leukemia|Cutaneous T-cell lymphoma|Diffuse large B-cell lymphoma|Follicular lymphoma|Hairy cell leukemia|Hepatosplenic T-cell lymphoma|Hodgkin's lymphoma|Intravascular large B-cell lymphoma|Large granular lymphocytic leukemia|Lymphoplasmacytic lymphoma|Lymphomatoid granulomatosis|Mantle cell lymphoma|Marginal zone B-cell lymphoma|Mast cell leukemia|Mediastinal large B cell lymphoma|Multiple myeloma|Myelodysplastic syndromes|Mucosa-associated lymphoid tissue lymphoma|Mycosis fungoides|Nodal marginal zone B cell lymphoma|Non-Hodgkin lymphoma|Precursor B lymphoblastic leukemia|Primary cutaneous follicular lymphoma|Primary cutaneous immunocytoma|Primary effusion lymphoma|Plasmablastic lymphoma|Sézary syndrome|Splenic marginal zone lymphoma|T-cell prolymphocytic leukemia|Basal cell carcinoma|Squamous cell skin cancer|Melanoma|Keratoacanthoma|Angiosarcoma|Fibrosarcoma|Liposarcoma|Malignant peripheral nerve sheath tumor|Synovial sarcoma|Adenocarcinoma of the lung|Basaloid squamous cell lung carcinoma|Giant-cell carcinoma of the lung|Large-cell lung carcinoma|Large cell lung carcinoma with rhabdoid phenotype|Laryngeal cancer|Mesothelioma|Non-small cell lung cancer|Pleuropulmonary blastoma|Sarcomatoid carcinoma of the lung|Small cell lung cancer|Squamous-cell carcinoma of the lung|Thymoma|Thymic carcinoma|Kaposi sarcoma|Epithelioid hemangioendothelioma|Desmoplastic small round cell tumor`.split("|");

// Words that make a subtype string a disease entity rather than a treatment setting or a molecular subgroup.
const HISTOLOGY = /\b(carcinoma|sarcoma|lymphoma|leukaemia|leukemia|tumour|tumor|blastoma|melanoma|glioma|myeloma|neoplasm|adenoma|mesothelioma|thymoma|seminoma|teratoma|germ cell|carcinoid|astrocytoma|ependymoma|meningioma|schwannoma|paraganglioma|chordoma|histiocytosis|mycosis fungoides|syndrome)\b/i;
const SETTING = /\b(after|unfit|fit|synchronous|recurrent|relapsed|refractory|metastatic|advanced|risk|mutant|mutated|positive|negative|fusion|amplified|pattern|variant|wild-type|deficient|treated|untreated|newly|eligible|ineligible|older|younger|first-line|second-line|line|resectable|unresectable|localised|localized|stage|grade|expressing|rearranged|deletion|codeleted|methylated|unmethylated|vs|versus|\d+%|adults?|children|paediatric|pediatric|infant|elderly|pregnan)\b/i;

type Pages = { kind: string; measure: string; count: number; source: string; note: string };
type Links = { link: string; count: number; source: string; note: string };

const cancers = g.kind("cancer");
const trials = g.kind("trial");
const drugs = g.kind("drug");
const targets = g.kind("target");
const companies = g.kind("company");
const ideas = g.kind("idea");
const people = g.kind("person");
const papers = g.kind("paper");
const technologies = g.kind("technology");
const institutions = g.kind("institution");

// ---------------------------------------------------------------------------------------------------------------------
// Pages still to write
// ---------------------------------------------------------------------------------------------------------------------
const cancerNames = new Set<string>();
for (const c of cancers) { cancerNames.add(fold(c.name)); c.aka.forEach((a) => cancerNames.add(fold(a))); c.subtypes.forEach((s) => cancerNames.add(fold(s))); }
const cancerRecordNames = new Set<string>();
for (const c of cancers) { cancerRecordNames.add(fold(c.name)); c.aka.forEach((a) => cancerRecordNames.add(fold(a))); }
/**
 * Names in the public list that no cancer record carries as a name or aka. A record whose name contains the public
 * name with a short qualifier ("Glioblastoma, IDH-wildtype" for "Glioblastoma") counts as covering it. Names only
 * mentioned in a subtypes array count as missing pages.
 */
const recordKeys = [...cancerRecordNames];
const covered = (k: string) => cancerRecordNames.has(k) || recordKeys.some((r) => r.includes(k) && r.length <= k.length + 14);
const publicMissing = PUBLIC_CANCER_LIST.filter((n) => !covered(fold(n)));
const publicMissingNamedAsSubtype = publicMissing.filter((n) => cancerNames.has(fold(n)));

const children = new Map<string, Cancer[]>();
for (const c of cancers) if (c.parent) children.set(c.parent, [...(children.get(c.parent) ?? []), c]);
const parentsWithoutSubtypes = cancers.filter((c) => !c.parent && !children.has(c.id) && c.subtypes.length > 0);

/** Histological entities named in a cancer's `subtypes` strings that have no record of their own. */
const subtypeEntities = new Map<string, { name: string; parents: string[] }>();
for (const c of cancers) for (const s of c.subtypes) {
  const bare = s.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  if (!HISTOLOGY.test(bare) || SETTING.test(bare) || bare.length > 60 || /,|;| and | or |\//.test(bare)) continue;
  const k = fold(bare);
  if (cancerRecordNames.has(k)) continue;
  const cur = subtypeEntities.get(k) ?? { name: bare, parents: [] };
  cur.parents.push(c.id);
  subtypeEntities.set(k, cur);
}

// Drugs: EMA oncology products the register lists and the corpus lacks; FDA notifications with no drug id.
const ema = JSON.parse(readFileSync("public/regional/candidates.json", "utf8")) as { candidates: Array<{ region: string; drugId?: string; product: string; inn: string; reason: string; indication: string; url: string }> };
const fda = JSON.parse(readFileSync("public/fda/recent.json", "utf8")) as { oce: Array<{ title: string; drugIds: string[] }> };
const ONCOLOGY = /\b(cancer|carcinoma|sarcoma|lymphoma|leukaemia|leukemia|myeloma|tumou?rs?(?! necrosis)|melanoma|neoplasm|mycosis fungoides|s[ée]zary|glioma|blastoma|myelodysplastic|myelofibrosis|mastocytosis|oncolog|metasta|antineoplastic|malignan)\b/i;
const emaSeen = new Set<string>();
/** Names the live corpus knows (drug name, aliases, brand parts), so a register product written or aliased since the snapshot was fetched no longer counts. */
const emaDrugNames = new Set<string>();
for (const d of drugs) for (const n of [d.name, ...d.aka, ...(d.brand ?? "").split(/\s*\/\s*/)]) { if (n) { emaDrugNames.add(norm(n)); emaDrugNames.add(norm(n.replace(/\(.*?\)/g, ""))); } }
const emaMissingDrugs = ema.candidates.filter((c) => { if (c.reason !== "not-in-corpus" || !ONCOLOGY.test(c.indication)) return false; const k = norm(c.inn); if (emaSeen.has(k)) return false; emaSeen.add(k); return !(emaDrugNames.has(k) || emaDrugNames.has(norm(c.inn.replace(/\(.*?\)/g, ""))) || emaDrugNames.has(norm(c.product.replace(/\(.*?\)/g, "")))); });
/** Register products whose drug still has no EU entry in regional-approvals.ts: the snapshot's "missing-row" list is checked against the live table, since rows are added between fetches. */
const emaMissingRows = ema.candidates.filter((c) => c.reason === "missing-row" && !(c.drugId && regionalApprovals[c.drugId]?.EU));
const fdaUnmatched = fda.oce.filter((x) => !x.drugIds?.length);

// Targets named by drug records that have no target page.
const targetNames = new Set<string>();
for (const t of targets) {
  for (const s of [t.name, ...t.aka, t.symbol ?? ""]) {
    if (!s) continue;
    targetNames.add(norm(s));
    // "VEGF / VEGFR", "CDK4, CDK6", "BRCA1 / BRCA2 (HRD)": every part and every parenthetical is a known name.
    for (const part of s.replace(/\([^)]*\)/g, " ").split(/[\s,/]+/)) if (part.length >= 3) targetNames.add(norm(part));
    for (const m of s.matchAll(/\(([^)]+)\)/g)) for (const part of m[1].split(/[\s,/]+/)) if (part.length >= 3) targetNames.add(norm(part));
  }
}
const targetKeys = [...targetNames].filter((k) => k.length >= 3);
const knownTarget = (key: string) => targetNames.has(key) || targetKeys.some((k) => (k.startsWith(key) && k.length <= key.length + 2) || (key.startsWith(k) && key.length <= k.length + 2));
/** Names of everything that is not a target (regimens, drugs, journals, companies, terms) so FOLFOX or NEJM is never counted as a target. */
const nonTargetNames = new Set<string>();
for (const e of g.entities) if (e.kind !== "target") {
  nonTargetNames.add(norm(e.name)); e.aka.forEach((a) => nonTargetNames.add(norm(a)));
  if (e.kind === "drug") { if (e.brand) nonTargetNames.add(norm(e.brand)); if (e.code) nonTargetNames.add(norm(e.code)); }
  // Hand-written trial names and their acronyms (DESTINY-Breast04, KEYNOTE-189, PAOLA-1): the head word and every aka.
  if (e.kind === "trial" && !e.tags.includes("ctgov-ingest")) { const head = e.name.replace(/\([^)]*\)/g, " ").trim().split(/[\s/]+/)[0]; if (head) { nonTargetNames.add(norm(head)); nonTargetNames.add(norm(head.split("-")[0])); } for (const m of e.name.matchAll(/\(([^)]+)\)/g)) nonTargetNames.add(norm(m[1].split(/[\s,/]+/)[0])); }
}
const TARGET_STOP = new Set(["ADC", "ADCS", "CAR", "CART", "CARS", "TCR", "TCE", "TKI", "TKIS", "MAB", "MABS", "IGG", "IGG1", "IGG4", "FC", "FAB", "SCFV", "VHH", "MMAE", "MMAF", "DXD", "SN38", "DM1", "DM4", "PBD", "DNA", "RNA", "MRNA", "SIRNA", "ASO", "PROTAC", "PROTACS", "PET", "CT", "MRI", "SPECT", "ORR", "PFS", "OS", "DFS", "EFS", "CR", "MRD", "CRS", "ICANS", "ILD", "AE", "AES", "FDA", "EMA", "NMPA", "PMDA", "MHRA", "NICE", "US", "USA", "EU", "UK", "IV", "SC", "PO", "BID", "QD", "QW", "Q2W", "Q3W", "Q4W", "MG", "KG", "ML", "AUC", "IC50", "HR", "CI", "NSCLC", "SCLC", "HCC", "RCC", "CRC", "AML", "ALL", "CLL", "CML", "DLBCL", "MCL", "MM", "MDS", "MPN", "GBM", "TNBC", "HNSCC", "GIST", "NET", "NETS", "PDAC", "MSI", "MSIH", "MSS", "DMMR", "TMB", "HRD", "IHC", "FISH", "NGS", "PCR", "WHO", "NCCN", "ESMO", "ASCO", "ASH", "AACR", "ESMO", "NCI", "NIH", "PHASE", "I", "II", "III", "IV", "G12C", "G12D", "V600E", "T790M", "L858R", "C797S", "ITD", "TKD", "F508DEL", "G20210A", "GMP", "CMC", "IND", "NDA", "BLA", "MAA", "CDX", "LDT", "IVD", "ICI", "ICIS", "IO", "SOC", "TIL", "TILS", "NK", "TREG", "TREGS", "APC", "MHC", "HLA", "HLAA2", "TAA", "TSA", "TME", "ECM", "CAF", "CAFS", "TAM", "TAMS", "MDSC", "MDSCS", "TCELL", "BCELL", "ADCC", "ADCP", "CDC", "DAR", "PK", "PD", "T1", "T2", "GD", "HER", "PSMA617", "LU177", "AC225", "F18", "GA68", "TC99M", "I131", "Y90", "RA223", "PB212", "CU64", "ZR89", "TH227", "AT211", "SR89", "SM153", "BRAFV600E", "KRASG12C", "KRASG12D", "EGFRTKI", "EGFRT790M", "EGFREX20INS", "EX20INS", "EXON", "EXON20", "EXON19", "EXON14", "MET14", "ROS", "NTRK123", "HER2LOW", "HER2NEG", "HER2POS", "ERPOS", "ERNEG", "HRPOS", "HRNEG", "PDL1POS", "PDL1NEG", "CPS", "TPS", "CPS1", "TPS1", "TPS50", "ECOG", "KPS", "AJCC", "TNM", "RECIST", "IRECIST", "IMWG", "IPSS", "ELN", "IPI", "FLIPI", "MIPI", "PSA", "CEA", "CA125", "CA199", "AFP", "LDH", "CRP", "ALT", "AST", "EGFRMUT", "ALKPOS", "IDH", "BCRABL", "BCRABL1", "PHPOS", "PH", "HPV", "HPV16", "EBV", "HBV", "HCV", "HIV", "SARSCOV2", "COVID19", "GPRC5D", "DNAPK", "ATM", "ATR", "WEE1", "CHK1", "PARP1", "PARP12", "PARP7", "BRCA12"]);
/** Bodies, journals, regimens, endpoints, assays, company code prefixes and generic biology words that pass the symbol regex. */
const TARGET_STOP2 = new Set(`LAR ATP GTP GDP NADPH NADH CNS GI GU PNS BM CSF PMA BMS JNJ BGB AZD MK ABBV GSK PF RG RO LY AMG BAY BI NVP SAR TAK DS BNT MRTX JAB JMT ASP DZD SHR HLX IBI ZW REGN NEJM JAMA LANCET BMJ JCO ASCO ESMO ASH AACR EORTC RTOG NRG NSABP SWOG ECOG ALLIANCE COG GOG JCOG UNICANCER IFCT GBG ABCSG NCIC NCRI ANZUP TROG NHS NRDL PMDA CDE MHRA FDA EMA CHMP CDER OCE REMS RMP PIL SMPC EPAR PBAC HAS AIFA IQWIG GBA NICE CADTH NMPA TGA FOLFOX FOLFIRI FOLFIRINOX FOLFOXIRI CAPOX XELOX CAPTEM CHOP RCHOP EPOCH ABVD AVD BEACOPP BEP ICE DHAP GDP VRD KRD DRD RVD VMP VTD VCD CYBORD BR ADT ARPI ARSI ASCT HSCT SCT BCG TACE TARE SIRT SBRT SABR IMRT VMAT EBRT WBRT PCI HDR LDR HIPEC PIPAC CRS NMIBC MIBC PTCL CTCL SLL MZL MCL FL WM HCL APL CMML JMML TKI ITK SERD SERM PROTAC PARPI HDAC HDACI HMA IMID CELMOD BITE TCE TCR TIL NK CIK LAK DC APC MHC HLA TAA TSA TME ECM CAF TAM MDSC TREG TH1 TH2 TH17 CD4 CD8 CD3 CD45 CD34 CD56 CD16 CD14 CD11B GD2 IFN IFNG TNF TNFA IL IL2 IL6 IL10 IL12 IL15 IL18 IL21 IL1B IL8 CXCL CCL MMP ROS RNS NO H2O2 O2 DNA RNA MRNA SIRNA ASO CRISPR CAS9 PCR RTPCR QPCR NGS WGS WES RNASEQ IHC FISH ELISA MS LCMS HPLC UGT1A1 CYP3A4 CYP2D6 CYP2C9 CYP2C19 CYP1A2 PGP BCRP OATP DPD TPMT NUDT15 MGMT MTAP AIDS HIV HBV HCV HPV EBV CMV SARSCOV2 COVID DOR TTR PFS2 TTP TTF DCR CBR RR PRO QOL HRQOL EQ5D FIT FOBT VAC VDC IE VAI EMACO PABC AYA NEC NET MEN1 MEN2 CUP MSI DMMR PMMR HRD HRP TMB CPS TPS IC TC RAS RAF MAPK ERK MEK MEK1 MEK2 PI3K AKT MTOR JAK STAT SRC ABL BCR TRK NTRK HER1 HER4 VEGF VEGFA VEGFR VEGFR1 VEGFR2 VEGFR3 PDGFR FGFR IGF IGF1R KIT PDGF TGF TGFB TGFBETA BRCA IDH1 IDH2 CDK4 CDK6 CDK46 BCL2 BCLXL MCL1 PDL2 HER2LOW NK1 HT3 5HT3 GNRH LHRH MOPP MVAC FLOT FCR CVAD PCV CHP TAX MAP MTA ACE MTIC PEG NAD ADP ACTH FSH LH THC LLC IDEA TEC KEN SHE AIM ECHO FOCUS BRIGHT RAISE INSPIRE EDITH TEXT SOFT OFF ISA CTP CLIA CEIVD PFU HSV1 SPDB GGFG FUTP DD4A ECD4 TNCLL LBCL BPDCN HLH RMS TLS GEPNETS MMR MIBG IIIA IIIB IIIC IIIII PT1 SFDA IARC CALGB EBCTCG SABCS MSK ABCSG VENTANA AVEO OBI BTG JMTBIO SERB MOSAIC DPYD CYP2B6 BCGNA PUVA ATAC MONARCH JAVELIN TROPION HORIZON MIRASOL ASCEMBL COMBIV DESTINY KEYNOTE CHECKMATE IMPOWER PACIFIC IMBRAVE ASCENT PAOLA ELEVATERR NYESO NYESO1 HERIZONGEA HERIZON GEA IL15R EF2 PMLRARA E2F CB1 TRKA GCRICH DFGOUT ABCSG8 CD3ZETA MDM2P53 FLT3ITD`.split(/\s+/));
const drugTargetTokens = new Map<string, { token: string; drugs: Set<string> }>();
const TARGET_RE = /(?<![A-Za-z0-9])((?:anti-)?(?:[A-Z][A-Za-z]?[A-Z0-9]{1,7}(?:[-.][A-Za-z0-9]{1,4})?|Nectin-4|Trop-?2|Claudin ?18\.2|c-?Met|c-?Kit|B7-H[34]|CD\d{1,3}[a-z]?|IL-?\d{1,2}R?[A-Z]?|TGF-?β|TGF-?beta|PD-?L?1|CTLA-?4|LAG-?3|TIM-?3|TIGIT|VEGF[A-Z]?R?\d?|FGFR\d?[a-z]?|IGF-?1R|HER[234]|HLA-[A-Z]\*?\d*))(?![A-Za-z0-9])/g;
for (const d of drugs) {
  const text = [d.name, d.mechanism, d.tldr, d.summary, ...d.mechanismSteps].join(" \n ");
  for (const m of text.matchAll(TARGET_RE)) {
    let tok = m[1].replace(/^anti-/i, "");
    tok = tok.replace(/[.,;:]$/, "");
    if (tok.length < 3 && !/^(IL|CD)\d/.test(tok)) continue;
    const key = norm(tok);
    if (!key || TARGET_STOP.has(key.toUpperCase()) || TARGET_STOP.has(tok.toUpperCase()) || TARGET_STOP2.has(key.toUpperCase())) continue;
    if (/^\d+$/.test(key) || /^[a-z]+$/.test(tok)) continue;
    // A gene symbol or a named receptor family: letters then digits (CD19, PIK3CA, DLL3, IL-2, TGF-beta), not a regimen, body or journal.
    if (!/^(?:[A-Z][A-Z0-9]{1,6}(?:[-.][A-Za-z0-9]{1,5})?|Nectin-4|Trop-?2|Claudin ?18\.2|c-?Met|c-?Kit|GnRH|TGF-?(?:β|beta)|GM-CSF|IL-?\d{1,2}R?[A-Z]?)$/.test(tok)) continue;
    if (knownTarget(key) || knownTarget(key.replace(/^claudin/, "cldn")) || knownTarget(key.replace(/^c/, "")) || nonTargetNames.has(key)) continue;
    // Two letter-only words joined by a hyphen are pathways or phrases (RAS-MAPK, JAK-STAT, DFG-out), not a target.
    if (/^[A-Za-z]{2,}-[A-Za-z]{2,}$/.test(tok) && !/^(B7-H\d|c-Met|c-Kit|TGF-beta|GM-CSF)$/i.test(tok)) continue;
    // Skip tokens that are drug codes (ABBV-400, MK-2870) rather than targets.
    if (/^[A-Z]{1,5}-?\d{2,}[A-Z]?$/.test(tok) && !/^(CD|IL|HLA|TLR|CCR|CXCR|FGFR|VEGFR|PDGFR|ERBB|HER|MMP|SSTR|CLDN|GPR|GPRC|KLK|MUC|NKG|B7|TNFRSF)/.test(tok)) continue;
    const cur = drugTargetTokens.get(key) ?? { token: tok, drugs: new Set<string>() };
    cur.drugs.add(d.id);
    drugTargetTokens.set(key, cur);
  }
}
const missingTargets = [...drugTargetTokens.values()].filter((t) => t.drugs.size >= 2).sort((a, b) => b.drugs.size - a.drugs.size);

// Trials named in cancer standard-of-care text by acronym without a trial record.
const knownTrial = new Set<string>();
for (const t of trials) {
  if (t.nct) knownTrial.add(norm(t.nct));
  for (const s of [t.name, ...t.aka]) {
    knownTrial.add(norm(s));
    const bare = s.replace(/\([^)]*\)/g, " ").trim();
    knownTrial.add(norm(bare));
    for (const part of bare.split(/[\s,/;:]+/)) if (part.length >= 4) knownTrial.add(norm(part));
    // "HERIZON-BTC-302", "PREOPANC-1 / PREOPANC-2", "De-ESCALaTE HPV": the programme stem before a hyphen is the name the text uses.
    for (const part of bare.split(/[\s,/;:-]+/)) if (part.length >= 4 && /[A-Za-z]/.test(part)) knownTrial.add(norm(part));
    for (const m of s.matchAll(/\(([^)]+)\)/g)) { knownTrial.add(norm(m[1])); for (const part of m[1].split(/[\s,/]+/)) if (part.length >= 4) knownTrial.add(norm(part)); }
    const stem = bare.match(/^([A-Za-z][A-Za-z]+)[ -](?:\d+[A-Za-z]?|[A-Z]|[A-Z][a-z]+\d*)$/);
    if (stem) knownTrial.add(norm(stem[1]));
  }
}
const drugNames = new Set<string>();
for (const d of drugs) { drugNames.add(norm(d.name)); d.aka.forEach((a) => drugNames.add(norm(a))); if (d.brand) drugNames.add(norm(d.brand)); if (d.code) drugNames.add(norm(d.code)); }
const otherNames = new Set<string>();
for (const e of g.entities) if (e.kind !== "trial") { otherNames.add(norm(e.name)); e.aka.forEach((a) => otherNames.add(norm(a))); }
const TRIAL_STOP = new Set(`TNM NCCN ESMO ASCO AJCC WHO FDA EMA NICE NHS NIH NCI DNA RNA MRI PET PCR PFS DFS EFS ORR MRD OS HR CI NNT ECOG RECIST IMWG IPSS ELN FLIPI IPI MIPI IHC FISH NGS TMB MSI MSS HRD HPV EBV HIV HBV HCV CAR TCR ADC TKI TKIs mAb IgG PD-L1 PDL1 PD-1 CTLA-4 CD19 CD20 CD22 CD30 CD33 CD38 BCMA HER2 HER3 EGFR ALK ROS1 KRAS NRAS BRAF MET RET NTRK FGFR FGFR2 FGFR3 IDH1 IDH2 TP53 BRCA1 BRCA2 PALB2 ATM PIK3CA AKT PTEN ESR1 CDK4 CDK6 CDK4/6 PARP VEGF VEGFR mTOR JAK JAK2 BTK BCL2 BCL-2 FLT3 NPM1 KIT PDGFRA PDGFRB MYC MYCN ERBB2 TROP2 TROP-2 GD2 DLL3 CLDN18.2 PSMA SSTR2 CEA CA-125 CA125 PSA AFP LDH G12C V600E T790M L858R EX20 IIIA IIIB IIIC IVA IVB IVC T1 T2 T3 T4 N0 N1 N2 N3 M0 M1 R0 R1 R2 G1 G2 G3 CR PR SD PD MRD ORR VGPR sCR CRi 5-FU FOLFOX FOLFIRI FOLFIRINOX FOLFOXIRI XELOX CAPOX CHOP R-CHOP EPOCH R-EPOCH ABVD BEACOPP BEP EP VIP TIP TPF PF GC GCb MVAC ddMVAC AC TC TCH TCHP EC FEC CMF ICE DHAP ESHAP GDP BR VRd KRd DRd VMP RVd MPT Rd Pd Kd Dara VTD VCD CyBorD 7+3 CPX-351 HMA BSC ASCT allo-HSCT HSCT SCT TBI IMRT SBRT SABR VMAT IGRT IORT PBT HDR LDR EBRT WBRT PCI TURBT TURP RARP RPLND SLNB ALND BCS mastectomy Gy Gy/fr mg mg/m2 mg/kg kg AUC IV SC PO QD BID Q2W Q3W Q4W QW HRQoL QoL EORTC QLQ-C30 FACT-G EQ-5D ICD-10 ICD-O ISUP GRADE BI-RADS PI-RADS LI-RADS TI-RADS Bethesda Gleason ISS R-ISS R2-ISS FIGO Ann Arbor Lugano Deauville Binet Rai Durie-Salmon Masaoka Enneking MSKCC IMDC BCLC Child-Pugh ALBI MELD CTCAE NYHA KPS GCS CAPTEM GemOx R-GemOx CLDN18 CLDN18.2 CyberKnife GammaKnife ArteraAI IGCCCG USPSTF ESO-1 NY-ESO-1 EuroNet ABL1 BCR::ABL1 MAGE-A4 SIOPE COG SIOP GOG NRG RTOG EORTC JCOG KLASS`.split(/\s+/).map(norm));
const socAcronyms = new Map<string, { token: string; cancers: Set<string>; context: string }>();
const ACRO_RE = /(?<![A-Za-z0-9])([A-Za-z][A-Za-z0-9]*(?:[ -](?:[A-Za-z]*\d[A-Za-z0-9]*|[A-Z][A-Za-z]*\d+))?(?:[ -]\d+[A-Za-z]?)?)(?![A-Za-z0-9])/g;
let socRowsWithoutRefs = 0;
let socRows = 0;
for (const c of cancers) for (const row of c.standardOfCare) {
  socRows += 1;
  if (row.refs.length === 0) socRowsWithoutRefs += 1;
  for (const m of row.approach.matchAll(ACRO_RE)) {
    const tok = m[1].trim();
    if (tok.length < 4) continue;
    const upper = (tok.match(/[A-Z]/g) ?? []).length;
    const mixed = /[a-z][A-Z]|[A-Z]{2}[a-z]/.test(tok);
    if (!(upper >= 4 || (upper >= 3 && /\d/.test(tok)) || mixed)) continue;
    if (/^[A-Z][a-z]+$/.test(tok) || /^\d/.test(tok) || /^(NCT\d{8}|ISRCTN\d+)$/.test(tok)) continue;
    const headWord = tok.split(/[ -]/)[0];
    // "for HER2", "a FLT3": the acronym must start in the first word, not be a plain word followed by a gene.
    if (!/[A-Z].*[A-Z0-9]/.test(headWord) || /^[a-z]/.test(headWord)) continue;
    const key = norm(tok);
    const head = norm(headWord);
    if (TRIAL_STOP.has(key) || TRIAL_STOP.has(head) || knownTrial.has(key) || knownTrial.has(head) || drugNames.has(key) || otherNames.has(key)) continue;
    if (/^[A-Z]{2,6}$/.test(tok) && !/\d/.test(tok) && upper === tok.length && tok.length <= 5) continue; // short all-caps words are regimens, genes or bodies far more often than trials
    const cur = socAcronyms.get(key) ?? { token: tok, cancers: new Set<string>(), context: row.approach.slice(Math.max(0, row.approach.indexOf(tok) - 50), row.approach.indexOf(tok) + tok.length + 50).replace(/\s+/g, " ") };
    cur.cancers.add(c.id);
    socAcronyms.set(key, cur);
  }
}
const missingSocTrials = [...socAcronyms.values()].sort((a, b) => b.cancers.size - a.cancers.size);

// Companies: trial sponsors with no company record.
const companyNames = new Set<string>();
const sponsorStrip = (s: string) => s.replace(/,?\s*(Inc\.?|Ltd\.?|LLC|plc|PLC|AG|SA|S\.A\.|NV|N\.V\.|GmbH|Co\.?|Corp\.?|Corporation|Company|Limited|Pharmaceuticals?|Pharma|Oncology|Biosciences|Therapeutics|Biotech|Biotechnology|Holdings?|Group|International|USA|US|UK|Europe|Japan|China|Korea|incl\.?)\b\.?/g, "").replace(/\(.*?\)/g, "").trim();
// "Merck & Co. (MSD)", "Roche / Genentech", "AbbVie (incl. ImmunoGen, Capstan)": the whole name, each part and each parenthetical are known.
const addOrgName = (s: string) => {
  companyNames.add(norm(s));
  companyNames.add(norm(sponsorStrip(s)));
  for (const part of s.replace(/\([^)]*\)/g, " ").split(/\s*(?:\/|&|,|\band\b)\s*/)) if (norm(part).length >= 4) { companyNames.add(norm(part)); companyNames.add(norm(sponsorStrip(part))); }
  for (const m of s.matchAll(/\(([^)]+)\)/g)) for (const part of m[1].replace(/^incl\.?\s*/i, "").split(/\s*,\s*/)) if (norm(part).length >= 3) companyNames.add(norm(part));
};
for (const c of companies) [c.name, ...c.aka].forEach(addOrgName);
for (const i of institutions) [i.name, ...i.aka].forEach(addOrgName);
const companyKeys = [...companyNames].filter((k) => k.length >= 5);
const knownOrg = (k: string) => companyNames.has(k) || (k.length >= 5 && companyKeys.some((c) => c.startsWith(k) || k.startsWith(c)));
const sponsorsMissing = new Map<string, { sponsor: string; trials: number }>();
for (const t of trials) {
  if (!t.sponsor) continue;
  if (t.companies.length || t.institutions.length) continue;
  for (const part of t.sponsor.replace(/\([^)]*\)/g, " ").split(/\s*(?:;|\band\b|\bwith\b|\/)\s*/)) {
    const s = part.replace(/\s+/g, " ").trim();
    if (s.length < 5 || /^(NCI|National Cancer Institute|investigator|academic|cooperative|group)$/i.test(s)) continue;
    // A person listed as sponsor ("Han Xu, M.D., Ph.D., FAPCR, IRB Chair") is not a company to write.
    if (/\b(M\.?D\.?|Ph\.?D\.?|Dr\.?|Prof\.?|Professor|Chair|Director|Investigator|FAPCR|MBBS|FRCP)\b/.test(s)) continue;
    const k = norm(sponsorStrip(s));
    if (!k || knownOrg(k) || knownOrg(norm(s))) continue;
    const cur = sponsorsMissing.get(k) ?? { sponsor: s, trials: 0 };
    cur.trials += 1;
    sponsorsMissing.set(k, cur);
  }
}
const missingSponsors = [...sponsorsMissing.values()].filter((s) => s.trials >= 2).sort((a, b) => b.trials - a.trials);

// Papers: DOIs cited in record links without a paper record.
const paperDois = new Set<string>();
for (const p of papers) { if (p.doi) paperDois.add(p.doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "")); for (const l of p.links) { const m = l.url.match(/doi\.org\/(10\.[^\s?#]+)/i); if (m) paperDois.add(m[1].toLowerCase()); } }
const citedDois = new Map<string, Set<string>>();
for (const e of g.entities) {
  if (e.kind === "paper") continue;
  for (const l of e.links) {
    const m = l.url.match(/doi\.org\/(10\.[^\s?#]+)/i);
    if (!m) continue;
    const doi = m[1].toLowerCase().replace(/\/$/, "");
    if (paperDois.has(doi)) continue;
    citedDois.set(doi, (citedDois.get(doi) ?? new Set()).add(e.id));
  }
}
const doisCitedTwice = [...citedDois.entries()].filter(([, s]) => s.size >= 2);

const pages: Pages[] = [
  { kind: "cancer", measure: "Public cancer-type list names without a record (Wikipedia list of cancer types, 22 Sept 2026)", count: publicMissing.length, source: "WHO Blue Books for the definition, Wikipedia and Orphanet for the name list, Europe PMC for the evidence", note: `${publicMissingNamedAsSubtype.length} of them are already named in a subtypes array` },
  { kind: "cancer", measure: "Histological entities named in cancer subtypes arrays without a record", count: subtypeEntities.size, source: "corpus (subtypes arrays), WHO Blue Books for the definition", note: "settings and molecular subgroups excluded by rule" },
  { kind: "cancer", measure: "Parent-level cancers naming subtypes with no subtype record", count: parentsWithoutSubtypes.length, source: "corpus", note: parentsWithoutSubtypes.map((c) => c.id).join(", ") },
  { kind: "cancer", measure: "Cancers without a GLOBOCAN mapping", count: cancers.filter((c) => !c.parent && !GLOBOCAN_MAP[c.id]).length, source: "corpus (globocan-map.ts)", note: "top-level records only; subtypes inherit the parent site" },
  { kind: "drug", measure: "EMA-authorised products with a cancer or cancer-care indication not in the corpus (distinct INNs)", count: emaMissingDrugs.length, source: "public/regional/candidates.json (EMA register), then ClinicalTrials.gov and Europe PMC", note: emaMissingDrugs.map((c) => c.inn).join(", ") },
  { kind: "drug", measure: "FDA oncology approval notifications with no drug record", count: fdaUnmatched.length, source: "public/fda/recent.json", note: "16-week window" },
  { kind: "target", measure: "Target-like symbols named by two or more drug records without a target page", count: missingTargets.length, source: "HGNC for identifiers, UniProt for biology, corpus for the drugs", note: missingTargets.slice(0, 12).map((t) => `${t.token} (${t.drugs.size})`).join(", ") },
  { kind: "trial", measure: "Trial acronyms in standard-of-care text without a trial record", count: missingSocTrials.length, source: "ClinicalTrials.gov by acronym, Europe PMC for the paper", note: `standard of care rests on phase 3 trials; ${socRowsWithoutRefs} of ${socRows} standard-of-care rows carry no reference at all` },
  { kind: "company", measure: "Trial sponsors (two or more trials) without a company or institution record", count: missingSponsors.length, source: "ClinicalTrials.gov sponsor field, Wikidata for identifiers", note: missingSponsors.slice(0, 8).map((s) => `${s.sponsor} (${s.trials})`).join(", ") },
  { kind: "paper", measure: "DOIs cited by two or more records without a paper page", count: doisCitedTwice.length, source: "Europe PMC by DOI", note: `${citedDois.size} distinct cited DOIs have no paper page in all` },
];

// ---------------------------------------------------------------------------------------------------------------------
// Cross-connections still possible
// ---------------------------------------------------------------------------------------------------------------------
const weak = (list: Entity[]) => list.filter((e) => g.degree(e.id) < 3).length;
const inbound = (e: Entity) => { let n = 0; for (const l of g.incoming(e.id).values()) n += l.length; return n; };

const trialsNoKeyPapers = trials.filter((t) => t.keyPapers.length === 0);
const trialsNoKeyPapersWithNct = trialsNoKeyPapers.filter((t) => t.nct);
const drugsNoKeyPapers = drugs.filter((d) => d.keyPapers.length === 0);
const drugsNoKeyPapersViaTrials = drugsNoKeyPapers.filter((d) => trials.some((t) => t.drugs.includes(d.id) && t.keyPapers.length));
const trialsNoTech = trials.filter((t) => t.technologies.length === 0);
const trialsNoTechDerivable = trialsNoTech.filter((t) => t.drugs.some((id) => (g.get(id) as Drug | undefined)?.technologies.length));
const companiesNoDrugs = companies.filter((c) => c.drugs.length === 0 && !drugs.some((d) => d.companies.includes(c.id)));
const sponsorIndex = new Map<string, Set<string>>();
for (const t of trials) if (t.sponsor) for (const part of t.sponsor.split(/\s*(?:;|,\s(?=[A-Z])|\band\b|\/)\s*/)) sponsorIndex.set(norm(sponsorStrip(part)), (sponsorIndex.get(norm(sponsorStrip(part))) ?? new Set()).add(t.id));
const companiesNoDrugsWithSponsoredTrials = companiesNoDrugs.filter((c) => [c.name, ...c.aka].some((n) => { const s = sponsorIndex.get(norm(sponsorStrip(n))); return s && [...s].some((id) => (g.get(id) as Trial).drugs.length); }));
const ideasNoTrials = ideas.filter((i) => i.trials.length === 0);
const ideasNoTrialsDerivable = ideasNoTrials.filter((i) => [...i.drugs, ...i.targets, ...i.technologies].some((id) => { const n = g.get(id); return n && (n.trials.length || (g.incoming(id).get("trial")?.length ?? 0) > 0); }));
const ideasNoPapers = ideas.filter((i) => i.keyPapers.length === 0);
const ideasNoPapersDerivable = ideasNoPapers.filter((i) => [...i.drugs, ...i.targets, ...i.trials, ...i.cancers].some((id) => { const n = g.get(id); return n && n.keyPapers.length; }));
const peopleNoPapers = people.filter((p) => p.papers.length === 0 && p.keyPapers.length === 0);
const peopleNoPapersWithInstitution = peopleNoPapers.filter((p) => p.institutionId || p.institutions.length);
const targetsNoDrugs = targets.filter((t) => t.drugs.length === 0 && !drugs.some((d) => d.targets.includes(t.id)));
/** Targets whose own `drugs` array is empty although drugs point at them: the reverse array can be filled from the corpus alone. */
const targetsDrugsOneWay = targets.filter((t) => t.drugs.length === 0 && drugs.some((d) => d.targets.includes(t.id)));
/** Whole-word only: CD7 inside "CD70" or "CD73" is not a mention (substring matching produced only false positives here). */
const targetsNoDrugsNamed = targetsNoDrugs.filter((t) => { const keys = [t.name, ...t.aka, t.symbol ?? ""].filter((k) => k.length >= 3).map((k) => new RegExp(`(^|[^A-Za-z0-9])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|[^A-Za-z0-9])`, "i")); return drugs.some((d) => { const txt = d.mechanism + " " + d.name + " " + d.tldr; return keys.some((re) => re.test(txt)); }); });
const drugsNoTrials = drugs.filter((d) => d.trials.length === 0 && !trials.some((t) => t.drugs.includes(d.id)));
const drugsNoTrialsNamedInTrials = drugsNoTrials.filter((d) => { const keys = [d.name, ...d.aka, d.brand ?? "", d.code ?? ""].filter((k) => k.length >= 4).map(norm); return trials.some((t) => { const txt = norm(t.name + " " + t.aka.join(" ") + " " + t.summary); return keys.some((k) => txt.includes(k)); }); });
const techNoTrials = technologies.filter((t) => t.trials.length === 0 && !trials.some((tr) => tr.technologies.includes(t.id)));
const techNoTrialsDerivable = techNoTrials.filter((t) => drugs.some((d) => d.technologies.includes(t.id) && (d.trials.length || trials.some((tr) => tr.drugs.includes(d.id)))));
/** Curated trials are the hand-written ones; registry-ingested trials carry the `ctgov-ingest` tag. */
const curated = trials.filter((t) => !t.tags.includes("ctgov-ingest"));
const curatedNoOutcomes = curated.filter((t) => t.outcomes.length === 0);
const papersNoTrial = papers.filter((p) => p.trials.length === 0 && (g.incoming(p.id).get("trial")?.length ?? 0) === 0);
const papersNoTrialWithNct = papersNoTrial.filter((p) => /NCT\d{8}/.test(JSON.stringify(p)) || trials.some((t) => t.name.length >= 5 && (p.name.includes(t.name) || p.summary.includes(t.name))));
const trialsNoCancer = trials.filter((t) => t.cancers.length === 0);
const drugsWithApprovalNoEu = emaMissingRows.length;

const links: Links[] = [
  { link: "Trial to key paper", count: trialsNoKeyPapers.length, source: "Europe PMC (search by NCT id; the primary publication carries the registry id)", note: `${trialsNoKeyPapersWithNct.length} carry an NCT id and can be matched without a name search` },
  { link: "Drug to key paper", count: drugsNoKeyPapers.length, source: "corpus first (inherit the key papers of the drug's trials), then Europe PMC", note: `${drugsNoKeyPapersViaTrials.length} can be filled from their trials today` },
  { link: "Trial to technology", count: trialsNoTech.length, source: "corpus (the trial's drugs already name their technology)", note: `${trialsNoTechDerivable.length} derivable with no lookup` },
  { link: "Company to drug", count: companiesNoDrugs.length, source: "corpus (trial sponsor strings), then ClinicalTrials.gov lead sponsor and Wikidata", note: `${companiesNoDrugsWithSponsoredTrials.length} sponsor a trial in the corpus that names a drug` },
  { link: "Idea to trial", count: ideasNoTrials.length, source: "corpus (shared drug, target or technology with a trial), then ClinicalTrials.gov", note: `${ideasNoTrialsDerivable.length} share a drug, target or technology with a trial` },
  { link: "Idea to key paper", count: ideasNoPapers.length, source: "corpus (papers of the idea's drugs, targets, trials, cancers), then Europe PMC", note: `${ideasNoPapersDerivable.length} derivable today` },
  { link: "Person to paper", count: peopleNoPapers.length, source: "Europe PMC AUTH plus AFF query (budget-free); OpenAlex when credits allow", note: `${peopleNoPapersWithInstitution.length} have an institution to anchor the query` },
  { link: "Target to drug", count: targetsNoDrugs.length, source: "corpus (drug mechanism text names the target), then ChEMBL", note: `${targetsNoDrugsNamed.length} are named in a drug's mechanism already` },
  { link: "Target drugs array mirroring drug.targets", count: targetsDrugsOneWay.length, source: "corpus (reverse of the drug's targets array)", note: "the target page already lists these drugs by backlink; the array makes them first-class for the API and gauges" },
  { link: "Drug to trial", count: drugsNoTrials.length, source: "corpus (trial text names the drug), then ClinicalTrials.gov intervention search", note: `${drugsNoTrialsNamedInTrials.length} are named in a trial record already` },
  { link: "Technology to trial", count: techNoTrials.length, source: "corpus (drugs of the technology have trials), then ClinicalTrials.gov intervention type", note: `${techNoTrialsDerivable.length} derivable through their drugs` },
  { link: "Curated trial to structured outcome", count: curatedNoOutcomes.length, source: "Europe PMC abstract (the primary paper carries the numbers), ClinicalTrials.gov results section", note: `${curated.length} hand-written trials (not tagged ctgov-ingest)` },
  { link: "Paper to trial", count: papersNoTrial.length, source: "corpus (NCT id or trial acronym in the paper text), then Europe PMC", note: `${papersNoTrialWithNct.length} name a trial or NCT id in their text` },
  { link: "Trial to cancer", count: trialsNoCancer.length, source: "ClinicalTrials.gov conditions field", note: "a trial with no cancer is invisible on every cancer page" },
  { link: "Approved drug to EU approval row", count: drugsWithApprovalNoEu, source: "public/regional/candidates.json (EMA register, already fetched)", note: "moves the regional-approvals gauge" },
];

const weakByKind = [
  ["trial", trials], ["person", people], ["idea", ideas], ["company", companies], ["drug", drugs], ["paper", papers], ["technology", technologies], ["target", targets], ["institution", institutions], ["cancer", cancers],
].map(([k, list]) => ({ kind: k as string, total: (list as Entity[]).length, weak: weak(list as Entity[]), fewInbound: (list as Entity[]).filter((e) => inbound(e) < 3).length }));

// ---------------------------------------------------------------------------------------------------------------------
// Burden: GLOBOCAN 2022 new cases worldwide per mapped cancer, with the gaps that touch it.
// ---------------------------------------------------------------------------------------------------------------------
const globocan = JSON.parse(readFileSync("public/globocan/countries.json", "utf8")) as { countries: Record<string, { data: Record<string, number[]> }> };
// The snapshot carries a WORLD entry alongside the countries; use it rather than summing (summing would also count WORLD).
const worldCases = new Map<number, number>();
for (const [code, cell] of Object.entries(globocan.countries.WORLD.data)) worldCases.set(Number(code), cell[0] ?? 0);
const countryCount = Object.keys(globocan.countries).filter((k) => k !== "WORLD").length;
/** New cases for a family: the parent's own mapping, or the union of its subtypes' site codes when only they are mapped (lung "all types" through NSCLC and SCLC). */
const casesFor = (ids: string[]): { cases: number | undefined; shared: boolean } => {
  const own = GLOBOCAN_MAP[ids[0]];
  const maps = own?.codes.length ? [own] : ids.map((id) => GLOBOCAN_MAP[id]).filter((m) => m?.codes.length);
  if (!maps.length) return { cases: undefined, shared: false };
  const codes = new Set<number>(maps.flatMap((m) => m.codes));
  return { cases: [...codes].reduce((s, code) => s + (worldCases.get(code) ?? 0), 0), shared: maps.some((m) => !!m.shared) && !(own?.codes.length && !own.shared) };
};
const rootOf = (c: Cancer): Cancer => { let cur = c; const seen = new Set<string>(); while (cur.parent && !seen.has(cur.id)) { seen.add(cur.id); const p = g.get(cur.parent) as Cancer | undefined; if (!p) break; cur = p; } return cur; };
type Burden = { id: string; name: string; cases: number | undefined; shared: boolean; subtypes: number; trialsNoPaper: number; drugsNoTrial: number; socNoRef: number; weakTrials: number; missingSocTrials: number; ideasNoTrial: number };
const burdenRows: Burden[] = cancers.filter((c) => !c.parent).map((c) => {
  const family = new Set<string>([c.id, ...cancers.filter((x) => rootOf(x).id === c.id).map((x) => x.id)]);
  const famTrials = trials.filter((t) => t.cancers.some((id) => family.has(id)));
  const famDrugs = drugs.filter((d) => d.cancers.some((id) => family.has(id)));
  const famIdeas = ideas.filter((i) => i.cancers.some((id) => family.has(id)));
  const famCancers = cancers.filter((x) => family.has(x.id));
  const { cases, shared } = casesFor([c.id, ...[...family].filter((id) => id !== c.id)]);
  return {
    id: c.id, name: c.name, cases, shared, subtypes: family.size - 1,
    trialsNoPaper: famTrials.filter((t) => t.keyPapers.length === 0).length,
    drugsNoTrial: famDrugs.filter((d) => drugsNoTrials.includes(d)).length,
    socNoRef: famCancers.reduce((s, x) => s + x.standardOfCare.filter((r) => r.refs.length === 0).length, 0),
    weakTrials: famTrials.filter((t) => g.degree(t.id) < 3).length,
    missingSocTrials: missingSocTrials.filter((m) => [...m.cancers].some((id) => family.has(id))).length,
    ideasNoTrial: famIdeas.filter((i) => i.trials.length === 0).length,
  };
}).sort((a, b) => (b.cases ?? -1) - (a.cases ?? -1));

// ---------------------------------------------------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------------------------------------------------
const hours = (n: number, rate: number) => Math.round((n / rate) * 10) / 10;
const fmt = (n: number) => n.toLocaleString("en-GB");
const byKind: Record<string, number> = {};
for (const e of g.entities) byKind[e.kind] = (byKind[e.kind] ?? 0) + 1;

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ total: g.entities.length, byKind, pages, links, weakByKind, burden: burdenRows, lists: { publicMissing, subtypeEntities: [...subtypeEntities.values()], missingTargets: missingTargets.map((t) => ({ token: t.token, drugs: [...t.drugs] })), missingSocTrials: missingSocTrials.map((m) => ({ token: m.token, cancers: [...m.cancers], context: m.context })), missingSponsors, emaMissingDrugs: emaMissingDrugs.map((c) => c.inn), doisCitedTwice: doisCitedTwice.map(([d, s]) => ({ doi: d, records: [...s] })) } }, null, 2));
} else {
  console.log(`# Content gaps (measured ${new Date().toISOString().slice(0, 10)})\n`);
  console.log(`Records: ${fmt(g.entities.length)}. By kind: ${Object.entries(byKind).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${fmt(n)}`).join(", ")}.\n`);
  console.log(`## Pages still to write\n`);
  console.log(`| Kind | Measure | Count | Budget-free source | Agent-hours | Note |\n|---|---|---:|---|---:|---|`);
  for (const p of pages) console.log(`| ${p.kind} | ${p.measure} | ${fmt(p.count)} | ${p.source} | ${hours(p.count, PAGE_RATE)} | ${p.note} |`);
  console.log(`\nPages to write in all: ${fmt(pages.reduce((s, p) => s + p.count, 0))} (about ${hours(pages.reduce((s, p) => s + p.count, 0), PAGE_RATE)} agent-hours at ${PAGE_RATE} pages an hour).\n`);
  console.log(`## Cross-connections still possible\n`);
  console.log(`| Link | Records lacking it | Budget-free source | Agent-hours | Note |\n|---|---:|---|---:|---|`);
  for (const l of links) console.log(`| ${l.link} | ${fmt(l.count)} | ${l.source} | ${hours(l.count, LINK_RATE)} | ${l.note} |`);
  console.log(`\nLinks to make in all: ${fmt(links.reduce((s, l) => s + l.count, 0))} (about ${hours(links.reduce((s, l) => s + l.count, 0), LINK_RATE)} agent-hours at ${LINK_RATE} links an hour).\n`);
  console.log(`## Weakly linked records by kind\n`);
  console.log(`| Kind | Records | Fewer than three relations | Fewer than three inbound links |\n|---|---:|---:|---:|`);
  for (const w of weakByKind) console.log(`| ${w.kind} | ${fmt(w.total)} | ${fmt(w.weak)} | ${fmt(w.fewInbound)} |`);
  console.log(`\n## Burden and gaps by cancer family (GLOBOCAN 2022 new cases worldwide, WORLD estimate over ${countryCount} countries)\n`);
  console.log(`| Cancer | New cases 2022 | Subtype pages | Trials without a key paper | Drugs without a trial | Standard-of-care rows without a reference | Trial acronyms without a record | Ideas without a trial |\n|---|---:|---:|---:|---:|---:|---:|---:|`);
  for (const b of burdenRows) console.log(`| ${b.name} | ${b.cases === undefined ? "no estimate" : fmt(b.cases) + (b.shared ? " (site total, shared)" : "")} | ${b.subtypes} | ${b.trialsNoPaper} | ${b.drugsNoTrial} | ${b.socNoRef} | ${b.missingSocTrials} | ${b.ideasNoTrial} |`);
  if (process.argv.includes("--lists")) {
    console.log(`\n## Lists\n`);
    console.log(`### Public-list cancers without a record (${publicMissing.length})\n${publicMissing.join("; ")}\n`);
    console.log(`### Histological entities named in subtypes arrays without a record (${subtypeEntities.size})\n${[...subtypeEntities.values()].map((s) => `${s.name} [${s.parents.join(", ")}]`).join("; ")}\n`);
    console.log(`### Target-like symbols named by two or more drugs (${missingTargets.length})\n${missingTargets.map((t) => `${t.token} (${t.drugs.size})`).join("; ")}\n`);
    console.log(`### Trial acronyms in standard-of-care text without a record (${missingSocTrials.length})\n${missingSocTrials.map((m) => `${m.token} [${[...m.cancers].join(", ")}] "${m.context}"`).join("\n")}\n`);
    console.log(`### Sponsors without a record (${missingSponsors.length})\n${missingSponsors.map((s) => `${s.sponsor} (${s.trials})`).join("; ")}\n`);
    console.log(`### EMA oncology products not in the corpus (${emaMissingDrugs.length})\n${emaMissingDrugs.map((c) => `${c.inn} (${c.product}): ${c.indication.slice(0, 90)}`).join("\n")}\n`);
    console.log(`### DOIs cited twice without a paper page (${doisCitedTwice.length})\n${doisCitedTwice.slice(0, 40).map(([d, s]) => `${d} [${[...s].join(", ")}]`).join("\n")}\n`);
  }
}
