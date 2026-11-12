/**
 * Biomarker readouts, part 1: PD-L1 scores, HER2 readouts, hormone receptors and Ki-67, mismatch repair and
 * microsatellite status, tumour mutational burden, BRCA and HRD, EGFR, KRAS and BRAF. Part 2 is
 * biomarker-readouts-2.ts. Every threshold is quoted from the US prescribing information on DailyMed (the openFDA
 * label API was read on 23 Sept 2026 and the set id recorded in each URL) or from the FDA list of cleared or
 * approved companion diagnostic devices (one fetch, same day). Scoring rules are quoted from the label, the assay's
 * package insert or the ASCO/CAP guideline named in `sourceLabel`. Where a readout has no approval the record says
 * so and `definedBy` names the guideline or trial that defines it. Nothing is inferred; US spelling inside quotes is
 * kept as printed. Wire up with `...biomarkerReadouts` in ALL_INPUTS (src/data/index.ts).
 */
import type { BiomarkerInput, BiomarkerThreshold, CompanionDiagnostic } from "@/lib/schema";

export const BIOMARKER_AS_OF = "2026-09-23";
const asOf = BIOMARKER_AS_OF;
export const DM = (setId: string) => `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setId}`;
export const FDA_CDX_URL = "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools";
export const FDA_CDX_LABEL = "FDA: List of FDA-Authorized Companion Diagnostic Devices";
export const b = (x: Omit<BiomarkerInput, "kind" | "asOf"> & { asOf?: BiomarkerInput["asOf"] }): BiomarkerInput => ({ kind: "biomarker", asOf, ...x });
type Th = Omit<BiomarkerThreshold, "status"> & { status?: BiomarkerThreshold["status"] };
export const th = (x: Th): BiomarkerThreshold => ({ status: "current", ...x });
/**
 * The record for each FDA list device name that has one, so the companion diagnostic table links to it. Matched on 10
 * November 2026 by exact device name or by the PMA, HDE or 510(k) number the record cites, and each pair read by hand.
 * Several names point at one record where the record covers them: FoundationOne CDx and Liquid CDx share a record,
 * as do HercepTest, PATHWAY 4B5 and the HER2 Dual ISH cocktail, and the therascreen kits whose gene the family record
 * names; Signatera CDx (P260004) is the companion diagnostic version of the Signatera record, whose IMvigor011
 * approval it is (src/data/tumour-tests.ts says so). Not mapped, because no record covers the device: Guardant360 Liquid
 * CDx (P250027, a different PMA from Guardant360 CDx), HER2 CISH pharmDx, INFORM HER-2/neu, InSite Her-2/neu (CB11),
 * PGDx elio tissue complete, SPOT-LIGHT HER2 CISH, cobas EZH2, cobas KRAS and therascreen PDGFRA (the therascreen
 * family record does not name it).
 */
export const CDX_DEVICE_IDS: Record<string, string> = {
  "Abbott RealTime IDH1": "abbott-realtime-idh1",
  "Abbott RealTime IDH2": "abbott-realtime-idh2",
  "Agilent Resolution ctDx FIRST assay": "resolution-ctdx-first",
  "BRACAnalysis CDx": "bracanalysis-cdx",
  "Bond Oracle HER2 IHC System": "bond-oracle-her2-ihc",
  "CRCDx RAS Mutation Detection Assay Kit": "crcdx-ras",
  "FoundationFocus CDxBRCA Assay": "foundationfocus-cdxbrca",
  "FoundationOne CDx": "foundationone-cdx",
  "FoundationOne Liquid CDx": "foundationone-cdx",
  "Guardant360 CDx": "guardant360-cdx",
  "HER2 FISH pharmDx Kit": "her2-fish-pharmdx",
  "HercepTest": "her2-testing-assays",
  "Idylla CDx MSI Test": "idylla-cdx-msi",
  "KIT D816V Assay": "arup-kit-d816v",
  "LeukoStrat CDx FLT3 Mutation Assay": "leukostrat-cdx-flt3",
  "MAGE-A4 IHC 1F9 pharmDx": "mage-a4-ihc-1f9-pharmdx",
  "MI Cancer Seek (MCS)": "caris-mi-cancer-seek",
  "MI Cancer Seek": "caris-mi-cancer-seek",
  "MMR IHC Panel pharmDx (Dako Omnis)": "mmr-ihc-panel-pharmdx",
  "MRDx BCR-ABL Test": "mrdx-bcr-abl",
  "Myriad myChoice CDx": "mychoice-cdx",
  "ONCO/Reveal Dx Lung & Colon Cancer Assay (O/RDx-LCCA)": "onco-reveal-dx-lung-colon",
  "ONCO/Reveal Dx Lung and Colon Cancer Assay": "onco-reveal-dx-lung-colon",
  "OncoMate MSI Dx Analysis System": "oncomate-msi-dx",
  "Oncomine Dx Express Test": "oncomine-dx-express",
  "Oncomine Dx Target Test": "oncomine-dx-target-test",
  "PATHWAY anti-HER-2/neu (4B5) Rabbit Monoclonal Primary Antibody": "her2-testing-assays",
  "PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody": "her2-testing-assays",
  "PD-L1 IHC 22C3 pharmDx": "dako-pd-l1-22c3-pharmdx",
  "PD-L1 IHC 28-8 pharmDx": "pd-l1-ihc-28-8-pharmdx",
  "PathVysion HER-2 DNA Probe Kit": "pathvysion-her2",
  "SeCore CDx HLA Sequencing System": "secore-cdx-hla",
  "Signatera CDx": "signatera",
  "THxID BRAF Kit": "thxid-braf",
  "TruSight Oncology Comprehensive": "trusight-oncology-comprehensive",
  "VENTANA CLDN18 (43-14A) RxDx Assay": "ventana-cldn18-43-14a",
  "VENTANA HER2 Dual ISH DNA Probe Cocktail": "her2-testing-assays",
  "VENTANA MET (SP44) RxDx Assay": "ventana-met-sp44",
  "VENTANA PTEN (SP218) RxDx Assay": "ventana-pten-sp218",
  "Ventana ALK (D5F3) CDx Assay": "ventana-alk-d5f3-cdx",
  "Ventana FOLR1 (FOLR-2.1) RxDx Assay": "ventana-folr1-rxdx",
  "Ventana HER2 Dual ISH DNA Probe Cocktail": "her2-testing-assays",
  "Ventana MMR RxDx Panel": "ventana-mmr-rxdx",
  "Ventana PD-L1 (SP142) Assay": "ventana-pd-l1-sp142",
  "Ventana PD-L1 (SP263) Assay": "ventana-pd-l1-sp263",
  "Vysis ALK Break Apart FISH Probe Kit": "vysis-alk-break-apart-fish",
  "Vysis CLL FISH Probe Kit": "vysis-cll-fish",
  "cobas 4800 BRAF V600 Mutation Test": "cobas-4800-braf-v600",
  "cobas EGFR Mutation Test v2": "cobas-egfr-mutation-test",
  "therascreen BRAF V600E RGQ PCR Kit": "therascreen-cdx",
  "therascreen EGFR RGQ PCR Kit": "therascreen-cdx",
  "therascreen FGFR RGQ RT-PCR Kit": "therascreen-cdx",
  "therascreen KRAS RGQ PCR Kit": "therascreen-cdx",
  "therascreen PIK3CA RGQ PCR Kit": "therascreen-cdx",
  "xT CDx": "tempus-xt-cdx",
};
/** One FDA companion diagnostic list row; the device's record id comes from CDX_DEVICE_IDS. */
export const cdx = (device: string, maker: string, indication: string, drugs: string[], pma: string, companyId?: string): CompanionDiagnostic => ({ device, maker, companyId, deviceId: CDX_DEVICE_IDS[device], drugs, indication, pma, source: FDA_CDX_URL });

// Label set ids (DailyMed), read 23 Sept 2026.
export const LABEL = {
  keytruda: DM("9333c79b-d487-4538-a9f0-71b91a02b287"), opdivo: DM("f570b9c4-6846-4de2-abfa-4d0a4ae4e394"), tecentriq: DM("6fa682c9-a312-4932-9831-f286908660ee"),
  imfinzi: DM("8baba4ea-2855-42fa-9bd9-5a7548d4cec3"), libtayo: DM("4347ae1f-d397-4f18-8b70-03897e1c054a"), jemperli: DM("095eab9f-545a-4f12-bfb7-19477fb901a5"),
  enhertu: DM("7e67e73e-ddf4-4e4d-8b50-09d7514910b6"), herceptin: DM("492dbdb2-077e-4064-bff3-372d6af0a7a2"), kadcyla: DM("23f3c1f4-0fc8-4804-a9e3-04cf25dd302e"),
  ziihera: DM("ae5d9425-fae5-4541-a158-150998343348"), hernexeos: DM("d3fabf12-354e-4e5c-b5de-20fdb579b783"), vyloy: DM("e7695a21-abb6-47ac-93f8-0ece5a9c4409"),
  elahere: DM("00c424b5-6ccd-48ab-9e88-1986451120e2"), emrelis: DM("bc04f980-3957-4e35-ab81-8ec2ffe87215"), lynparza: DM("741ff3e3-dc1a-45a6-84e5-2481b27131aa"),
  zejula: DM("b7f675e2-159c-490c-b6f4-3f16d9492b7d"), rubraca: DM("0295d202-1cfe-7659-e063-6294a90a476e"), talzenna: DM("13839d4f-6acf-4ffb-a128-79df59319273"),
  tagrisso: DM("5e81b4a7-b971-45e1-9c31-29cea8c87ce7"), rybrevant: DM("1466c070-9f97-4fa4-a955-6a6b59981fb8"), lazcluze: DM("c417f9ee-2027-4ed5-92ad-3c19266de16c"),
  gilotrif: DM("fd638e5e-8032-e7ca-0179-95e96ab5d387"), iressa: DM("827d60e8-7e07-41b7-c28b-49ef1c4a5a41"), vizimpro: DM("4ab27d2f-e385-4e9c-b324-fa69c10b855a"),
  lumakras: DM("c80a362c-7ac3-4894-a076-0691e68ef8c1"), krazati: DM("0b8bf078-34c2-4f45-9012-38a8ac082b01"), tafinlar: DM("fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea"),
  mekinist: DM("0002ad27-779d-42ab-83b5-bc65453412a1"), braftovi: DM("235dfc38-0f0b-4037-b501-7a9f4294740c"), zelboraf: DM("38eea320-7e0c-485a-bc30-98c3c45e2763"),
  ojemda: DM("ea3a9631-3a66-6a7c-e053-2995a90ae2ad"), alecensa: DM("42c49deb-713b-427a-9670-08af08adcffb"), lorbrena: DM("004f93d7-a1cd-4b67-9207-31cdcb5c5976"),
  xalkori: DM("2a51b0de-47d6-455e-a94c-d2c737b04ff7"), alunbrig: DM("0fe9ff20-d402-41f3-bc1e-7002ea7007db"), ensacove: DM("1e1b2f79-678a-472a-b924-66909c8a4b2e"),
  rozlytrek: DM("c7c71b0c-2549-4495-86b6-c2807fa54908"), augtyro: DM("fb526827-40ba-4462-94cf-179ae3b0cb8a"), ibtrozi: DM("51ac8e52-3269-4102-8dc8-dba22d82128c"),
  retevmo: DM("7fa848ba-a59c-4144-9f52-64d090f4d828"), gavreto: DM("16edd46e-28b8-f06d-e063-6394a90ae31b"), vitrakvi: DM("0c8ca614-58b2-4aa4-83d3-0387a8f782fd"),
  tabrecta: DM("455892c3-d144-4ba8-9ab4-79cabff9876d"), tepmetko: DM("80a0f1b9-071a-47f5-9e67-32d638a669dc"), pemazyre: DM("9e1f2222-1d89-4e63-989c-ccebe2ab1eb4"),
  lytgobi: DM("0b1332a1-0581-4707-9bf6-1eccfa39bef4"), balversa: DM("2a8aa5c0-6c92-4566-8c45-e8f4d1fc20ee"), tibsovo: DM("65d254c0-67ad-42c4-b972-ad463b755b2d"),
  idhifa: DM("a5b4cdf0-3fa8-4c6c-80f6-8d8a00e3a5b6"), rezlidhia: DM("4a0c7c8b-b95f-455d-9600-b7351e4397fe"), voranigo: DM("31405fee-55b7-4857-987e-2724ee76be84"),
  rydapt: DM("11fa3fc9-6776-49a6-b1c1-653f627c3e58"), xospata: DM("b5ff59aa-9c0d-49a8-9053-1f179b482383"), vanflyta: DM("29cdbcfe-497d-4e78-bb7b-2d4acafe8e86"),
  ayvakit: DM("645c887c-8cd4-4623-8da9-ac223d71a8b9"), gleevec: DM("211ef2da-2868-4a77-8055-1cb2cd78e24b"), iclusig: DM("16d804b6-4957-43ee-b18c-3b36ec37c5ac"),
  scemblix: DM("e33001e7-3650-42b1-ae56-cddb5c43aa2b"), piqray: DM("b20b4e18-7a4b-4500-a08f-06c6dab0ee5b"), itovebi: DM("5de59f5b-e5db-410f-b692-658686ef4107"),
  truqap: DM("d698c106-2322-401e-b738-cbd83c843ecf"), orserdu: DM("aa66ae5c-2bd2-4444-8178-b55651e054ef"), inluriyo: DM("5bc172e4-e8a2-441a-be52-279a7f890196"),
  pluvicto: DM("14908037-2892-4d98-a053-253ce35afb1a"), lutathera: DM("72d1a024-00b7-418a-b36e-b2cb48f2ab55"), kimmtrak: DM("24a49f57-d2fc-4ffe-9eb1-fe0460c6b067"),
  tecelra: DM("ab24631f-3364-46e1-8074-7244863bcbab"), modeyso: DM("ad45b43e-fdef-47ad-9c34-055b41bdc576"), komzifti: DM("b650f696-3391-4274-8b55-a5f5e9d04769"),
  verzenio: DM("be4bc0de-0fdc-4d46-8d25-be43c79e6a06"), blincyto: DM("38b482a8-960b-4591-9857-5031ecb830aa"), rituxan: DM("b172773b-3905-4a1c-ad95-bab4b6126563"),
  adcetris: DM("3904f8dd-1aef-3490-e48f-bd55f32ed67f"), mylotarg: DM("32fd2bb2-1cfa-4250-feb8-d7956c794e05"), venclexta: DM("b118a40d-6b56-cee3-10f6-ded821a97018"),
  besponsa: DM("cc7014b1-c775-411d-b374-8113248b4077"), temodar: DM("046a9011-3911-4d3f-a15f-fbb56d5aad56"), unituxin: DM("d66bdf0d-9d65-45de-ae5b-a58617c27492"),
  tazverik: DM("7db07b5f-4e22-467c-9c0a-f830b08dbb1d"), revuforj: DM("6eb3cdbc-0e74-477d-82d6-3bb172d3f63f"),
  darzalex: DM("a4d0efe9-5e54-467e-9eb4-56fa7d53b60b"), tecvayli: DM("54e0f974-ccee-44ea-9254-40e9883cee1e"), talvey: DM("9001355e-003d-4d4e-b4ce-337e0fd14952"), trodelvy: DM("57a597d2-03f0-472e-b148-016d7169169d"),
  padcev: DM("b5631d3e-4604-4363-8f20-11dfc5a4a8ed"), imdelltra: DM("1e7b6163-5d83-42ea-82c9-cf7620cdc782"), tivdak: DM("c9fe3f32-4219-466e-acb9-3f609b4f4df1"), ibrance: DM("89a142d5-7e61-48bf-9e77-e2cd124c4792"), perjeta: DM("17f85d17-ab71-4f5b-9fe3-0b8c822f69ff"),
};

/** ASCO/CAP ER and PR testing guideline (Allison et al., 2020). */
const ASCO_CAP_ER = { label: "ASCO/CAP estrogen and progesterone receptor testing guideline, 2020 update (Allison et al., J Clin Oncol)", url: "https://doi.org/10.1200/JCO.19.02309" };

export const biomarkerReadouts: BiomarkerInput[] = [
  // ---- PD-L1 (CD274): four scoring systems, three assays ----
  b({ id: "pd-l1-cps", name: "PD-L1 CPS (combined positive score)", aka: ["PD-L1 CPS", "CPS", "combined positive score", "PD-L1 combined positive score", "CPS >= 1", "CPS >= 10", "PD-L1 CPS 1", "PD-L1 CPS 10", "CPS≥1", "CPS≥10"],
    target: "pdl1", measurement: "combined-positive-score",
    tldr: "CPS counts eligible PD-L1-stained tumour cells, lymphocytes and macrophages per viable tumour cell. The reported score is capped at 100; assay and treatment setting determine its use.",
    summary: "The combined positive score (CPS) is 100 times the number of eligible PD-L1-staining tumour cells, lymphocytes and macrophages divided by all viable tumour cells. Under the cited 22C3 TNBC method it is reported as a whole number capped at 100, even if the raw arithmetic is larger. CPS is not the percentage of tumour cells staining and is not interchangeable with tumour proportion score (TPS) or the SP142 immune-cell area score. Clinical use depends on the named assay, cancer, disease setting and treatment regimen. In advanced TNBC, the specified pembrolizumab combinations use CPS at least 10; the high-risk early-TNBC perioperative regimen has a different selection context.",
    scoringRule: { text: "Count PD-L1-positive tumour cells, lymphocytes and macrophages; divide by the number of viable tumour cells; multiply by 100. A specimen must hold at least 100 viable tumour cells to be scored.", quote: "PD-L1 protein expression [Combined Positive Score (CPS) ≥ 1]", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "CPS >= 1", drugId: "pembrolizumab", cancerId: "head-and-neck", regulator: "FDA", source: LABEL.keytruda, quote: "as a single agent for the first-line treatment of patients with metastatic or with unresectable, recurrent HNSCC whose tumors express PD-L1 [Combined Positive Score (CPS) ≥1] as determined by an FDA-authorized test." }),
      th({ value: "CPS >= 1", drugId: "pembrolizumab", cancerId: "gastric", regulator: "FDA", source: LABEL.keytruda, quote: "for the first-line treatment of adults with locally advanced unresectable or metastatic HER2-negative gastric or gastroesophageal junction (GEJ) adenocarcinoma whose tumors express PD-L1 (CPS ≥1) as determined by an FDA-authorized test." }),
      th({ value: "CPS >= 1", drugId: "pembrolizumab", cancerId: "gastric-her2-positive", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with trastuzumab, fluoropyrimidine- and platinum-containing chemotherapy, for the first-line treatment of adults with locally advanced unresectable or metastatic HER2-positive gastric or gastroesophageal junction (GEJ) adenocarcinoma whose tumors express PD-L1 (CPS ≥1)" }),
      th({ value: "CPS >= 1 (with chemotherapy); CPS >= 10 (single agent, squamous, after prior therapy)", drugId: "pembrolizumab", cancerId: "esophageal", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with platinum- and fluoropyrimidine-based chemotherapy for patients whose tumors express PD-L1 (CPS ≥1) as determined by an FDA-authorized test, or as a single agent after one or more prior lines of systemic therapy for patients with tumors of squamous cell histology that express PD-L1 (CPS ≥10)" }),
      th({ value: "CPS >= 1", drugId: "pembrolizumab", cancerId: "cervical", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with chemotherapy, with or without bevacizumab, for the treatment of patients with persistent, recurrent, or metastatic cervical cancer whose tumors express PD-L1 (CPS ≥1) as determined by an FDA-authorized test." }),
      th({ value: "CPS >= 10", drugId: "pembrolizumab", cancerId: "tnbc-metastatic", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with chemotherapy, for the treatment of patients with locally recurrent unresectable or metastatic TNBC whose tumors express PD-L1 (CPS ≥10) as determined by an FDA-authorized test" }),
      th({ value: "CPS >= 10", drugId: "sacituzumab-govitecan", cancerId: "tnbc-metastatic", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with sacituzumab govitecan-hziy, for the first-line treatment of adult patients with unresectable locally advanced or metastatic TNBC whose tumors express PD-L1 (CPS ≥10) as determined by an FDA-authorized test." }),
      th({ value: "CPS >= 1", drugId: "pembrolizumab", cancerId: "platinum-resistant-ovarian-cancer", regulator: "FDA", source: LABEL.keytruda, quote: "in combination with paclitaxel, with or without bevacizumab, for the treatment of adult patients with platinum-resistant epithelial ovarian, fallopian tube, or primary peritoneal carcinoma whose tumors express PD-L1 (CPS ≥1) as determined by an FDA-authorized test" }),
      th({ value: "PD-L1 >= 1 (28-8 pharmDx)", drugId: "nivolumab", cancerId: "gastric", regulator: "FDA", source: LABEL.opdivo, quote: "OPDIVO, in combination with fluoropyrimidine- and platinum-containing chemotherapy, is indicated for the treatment of adult patients with advanced or metastatic gastric cancer, gastroesophageal junction cancer, and esophageal adenocarcinoma whose tumors express PD-L1 (≥1)" }),
      th({ value: "PD-L1 >= 1 (28-8 pharmDx)", drugId: "nivolumab", cancerId: "oesophageal-squamous-cell-carcinoma", regulator: "FDA", source: LABEL.opdivo, quote: "OPDIVO, in combination with ipilimumab, is indicated for the first-line treatment of adult patients with unresectable advanced or metastatic esophageal squamous cell carcinoma (ESCC) whose tumors express PD-L1 (≥1)" }),
    ],
    cancers: ["head-and-neck", "gastric", "gastric-her2-positive", "gastric-pdl1-high", "esophageal", "oesophageal-squamous-cell-carcinoma", "cervical", "tnbc", "tnbc-metastatic", "ovarian", "platinum-resistant-ovarian-cancer"],
    drugs: ["pembrolizumab", "nivolumab", "sacituzumab-govitecan", "dako-pd-l1-22c3-pharmdx"], tests: ["omniseq-insight", "caris-mi-profile"], assays: ["pdl1-22c3", "pdl1-28-8"],
    companionDiagnostics: [
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Head and Neck Squamous Cell Carcinoma (HNSCC) - Tissue", ["pembrolizumab"], "P150013/S014 (06/10/2019)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Gastric or Gastroesophageal Junction (GEJ) Adenocarcinoma - Tissue", ["pembrolizumab"], "P150013/S027 (11/07/2023)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Esophageal or Gastroesophageal Junction (GEJ) Carcinoma - Tissue", ["pembrolizumab"], "P150013/S032 (02/11/2026)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Cervical Cancer - Tissue", ["pembrolizumab"], "P150013/S009 (06/12/2018)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Triple-Negative Breast Cancer (TNBC) - Tissue", ["pembrolizumab"], "P150013/S020 (11/13/2020)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Epithelial Ovarian, Fallopian Tube Cancer, or Primary Peritoneal Carcinoma (EOC) - Tissue", ["pembrolizumab"], "P150013/S033 (02/10/2026)", "agilent"),
      cdx("PD-L1 IHC 28-8 pharmDx", "Agilent Technologies (Dako)", "Esophageal squamous cell carcinoma (ESCC), and gastric, gastroesophageal junction (GEJ), and esophageal adenocarcinoma - Tissue", ["nivolumab"], "P150025/S018 (07/01/2026)", "agilent"),
    ],
    forPatient: "Your report gives a CPS number. Whether it counts as positive depends on the cancer: the pembrolizumab label asks for 1 or more in head and neck, stomach, oesophageal, cervical and platinum-resistant ovarian cancer, and 10 or more in triple-negative breast cancer. The same number can open a treatment in one cancer and not in another, and a score below the cut-off does not mean immunotherapy can never be used, only that this particular indication does not apply.",
    terms: ["cps", "pd-l1-testing", "ihc"], related: ["pd-l1-tps", "pd-l1-ic-score", "pd-l1-tc-score"], links: [
  {
    "label": "KEYTRUDA prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"
  },
  {
    "label": "OPDIVO prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f570b9c4-6846-4de2-abfa-4d0a4ae4e394"
  },
  {
    "label": "FDA: List of FDA-Authorized Companion Diagnostic Devices",
    "url": "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools"
  },
  {
    "label": "Measurement method and interpretation source",
    "url": "https://www.agilent.com/cs/library/flyers/public/29390-d62312-pd-l1-22c3-tnbc-qsg-us.pdf"
  },
  {
    "label": "FDA pembrolizumab label, TNBC sections 1.20 and 14.20",
    "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125514s194lbl.pdf"
  },
  {
    "label": "Cortes et al., KEYNOTE-355 overall survival, 2022",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35857659/"
  },
  {
    "label": "Rugo et al., PD-L1 assay comparison, 2021",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34097070/"
  },
  {
    "label": "Reisenbichler et al., observer agreement, 2020",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32300181/"
  },
  {
    "label": "Roche US TNBC withdrawal announcement, 2021",
    "url": "https://www.roche.com/media/releases/med-cor-2021-08-27.html"
  },
  {
    "label": "Taube et al., adaptive resistance in melanocytic lesions, 2012",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22461641/"
  },
  {
    "label": "FDA: first-line sacituzumab govitecan alone and with pembrolizumab in advanced TNBC (24 June 2026)",
    "url": "https://www.fda.gov/drugs/cancer-approvals/fda-approves-sacituzumab-govitecan-hziy-monotherapy-and-combination-pembrolizumab-first-line"
  }
], tags: ["biomarker", "pd-l1"] ,
"notes": [
  "For the 22C3 TNBC method, count eligible stained viable invasive tumour cells and tumour-associated lymphocytes and macrophages. Divide by all viable invasive tumour cells, including unstained cells, then multiply by 100. Report a whole-number CPS capped at 100, even when raw arithmetic exceeds 100.",
  "Tumour cells require qualifying partial or complete membrane staining. Eligible lymphocytes and macrophages may have membrane or cytoplasmic staining in tumour nests or directly associated stroma. Exclude immune cells from the denominator; do not count every stained cell on the slide. Controls and at least 100 viable tumour cells are required.",
  "Fictional eligible counts: 200 viable tumour cells, 20 staining tumour cells, 40 staining lymphocytes and 20 staining macrophages give CPS 40. Tumour-cell-only arithmetic gives 10%, under its own assay rules. CPS, TPS and IC use different numerators or denominators and cannot share cutoffs automatically.",
  "TPS counts viable tumour cells with qualifying partial or complete membrane staining as a percentage of viable tumour cells. Immune cells do not enter its numerator. SP142 IC scoring measures the fraction of tumour area occupied by stained tumour-infiltrating immune cells, excluding tumour-cell staining. CPS, TPS and IC thresholds cannot be transferred between methods.",
  "For 22C3 TNBC CPS, exclude nonviable cells, neutrophils, eosinophils, plasma cells, benign epithelial cells and stromal cells. Immune cells associated only with benign structures or in-situ disease do not qualify. A CPS of 100 does not imply that all tumour cells stain.",
  "KEYNOTE-355 randomised 847 patients with previously untreated locally recurrent inoperable or metastatic TNBC regardless of PD-L1 status. In the CPS at least 10 subgroup, median overall survival was 23.0 months with pembrolizumab plus chemotherapy and 16.1 months with placebo plus chemotherapy; hazard ratio 0.73 (95% confidence interval 0.55 to 0.95). The CPS at least 1 comparison was not significant: hazard ratio 0.86 (0.72 to 1.04). These subgroup findings concern the tested combination and population, not pembrolizumab alone.",
  "The US pembrolizumab label uses CPS at least 10 for locally recurrent unresectable or metastatic TNBC with chemotherapy and for first-line unresectable locally advanced or metastatic TNBC with sacituzumab govitecan. High-risk early TNBC uses pembrolizumab with chemotherapy before surgery, continued alone afterward, without a PD-L1 selection requirement. The FDA approved the sacituzumab combination in June 2026. A score does not determine individual eligibility or guarantee benefit.",
  "IMpassion130 used SP142 IC at least 1% for the PD-L1-positive subgroup in advanced TNBC treated with atezolizumab plus nab-paclitaxel. Roche announced voluntary withdrawal of the US TNBC indication in August 2021. This historical regimen and cutoff are not a current US treatment indication.",
  "In the 614-sample IMpassion130 comparison, IC at least 1% positivity was 46.4% for SP142, 74.9% for SP263 and 73.1% for 22C3. Almost all SP142-positive samples were positive by the other assays, but the reverse was not true. This was an IC comparison across assays, not evidence that 22C3 CPS and IC are interchangeable.",
  "In a multi-institutional study, 19 pathologists assessed TNBC sections: average positivity at IC at least 1% was 58% with SP142 and 78% with SP263. Complete two-category agreement occurred in 38% and 50% of cases respectively. These study-specific results show observer variation; they do not supply a correction factor for an individual report.",
  "A primary study of human melanocytic lesions found colocalisation of PD-L1 expression with inflammatory infiltrates and implicated interferon gamma in adaptive immune resistance. This supports a mechanism, not a universal rule that every lymphocyte-rich breast tumour has high PD-L1. Staining alone does not establish a complete immune state.",
  "For a specified PD-L1 workflow, prepare the tissue section, stain it with acceptable controls, assess adequacy, identify the eligible cells and then apply the scoring algorithm. Further sections consume finite tissue. Record the antibody clone, platform, specimen, scoring method and intended clinical use. The cited TNBC 22C3 guide requires at least 100 viable tumour cells; that requirement belongs to the named assay, rather than to every PD-L1 method.",
  "Report CPS as a capped score, TPS as a tumour-cell percentage, or IC as the percentage of tumour area occupied by stained immune cells. Each algorithm has its own eligibility and threshold rules. Too few eligible cells, failed controls, incorrect cell attribution, necrosis and heterogeneous sampling can invalidate or limit a result. None of these scores alone describes the complete immune state, guarantees individual benefit or establishes eligibility in a different cancer or treatment setting.",
  "The detailed eligible-cell rules here follow Agilent's November 2020 TNBC quick guide. Its original PDF was unavailable at this check; a preserved primary-source extract supplies that historical method definition. Current treatment selection also requires the applicable current drug label and assay documentation."
],
"asOf": "2026-11-10"
}),

  b({ id: "pd-l1-tps", name: "PD-L1 TPS (tumour proportion score)", aka: ["PD-L1 TPS", "TPS", "tumor proportion score", "tumour proportion score", "TPS >= 1%", "TPS >= 50%", "PD-L1 TPS 50", "PD-L1 high", "PD-L1 ≥50%", "TPS≥50%", "TPS≥1%"],
    target: "pdl1", measurement: "tumour-proportion-score",
    tldr: "TPS is the share of tumour cells whose membrane stains for PD-L1, ignoring immune cells. In lung cancer it decides whether pembrolizumab or cemiplimab can be given alone: 1 percent opens the door, 50 percent is where single-agent treatment is strongest.",
    summary: "The tumour proportion score is the percentage of viable tumour cells showing partial or complete membrane staining at any intensity, read on the 22C3 pharmDx (and, for cemiplimab, also the SP263 assay). Pembrolizumab's US label uses TPS >= 1 percent for first-line single-agent treatment of stage III or metastatic NSCLC without EGFR or ALK alterations and for second-line treatment after platinum chemotherapy; cemiplimab's single-agent first-line indication requires TPS >= 50 percent. The KEYNOTE-024 trial that set the 50 percent bar and KEYNOTE-042 that lowered the gate to 1 percent are the sources of the two numbers. TPS is a lung-specific read; the same slide scored as CPS would include immune cells and give a different number.",
    scoringRule: { text: "Percentage of viable tumour cells with partial or complete membrane staining of any intensity; at least 100 viable tumour cells must be present.", quote: "PD-L1 protein expression [Tumor Proportion Score (TPS) ≥ 50%]", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "TPS >= 1%", drugId: "pembrolizumab", cancerId: "nsclc", regulator: "FDA", source: LABEL.keytruda, quote: "KEYTRUDA, as a single agent, is indicated for the first-line treatment of patients with NSCLC expressing PD-L1 [Tumor Proportion Score (TPS) ≥1%] as determined by an FDA-authorized test, with no EGFR or ALK genomic tumor aberrations, and is: Stage III where patients are not candidates for surgical resection or definitive chemoradiation, or metastatic." }),
      th({ value: "TPS >= 1% (after platinum chemotherapy)", drugId: "pembrolizumab", cancerId: "nsclc", regulator: "FDA", source: LABEL.keytruda, quote: "KEYTRUDA, as a single agent, is indicated for the treatment of patients with metastatic NSCLC whose tumors express PD-L1 (TPS ≥1%) as determined by an FDA-authorized test, with disease progression on or after platinum-containing chemotherapy." }),
      th({ value: "TPS >= 50%", drugId: "cemiplimab", cancerId: "nsclc", regulator: "FDA", source: LABEL.libtayo, quote: "LIBTAYO as a single agent is indicated for the first-line treatment of adult patients with NSCLC whose tumors have high PD-L1 expression [Tumor Proportion Score (TPS) ≥50%] as determined by an FDA-approved test, with no EGFR, ALK or ROS1 aberrations" }),
    ],
    cancers: ["nsclc", "lung-cancer"], drugs: ["pembrolizumab", "cemiplimab", "dako-pd-l1-22c3-pharmdx", "ventana-pd-l1-sp263"], tests: ["omniseq-insight"], assays: ["pdl1-22c3", "pdl1-sp263"],
    companionDiagnostics: [
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["pembrolizumab"], "P150013 (10/02/2015); updated P150013/S012 (04/16/2019)", "agilent"),
      cdx("PD-L1 IHC 22C3 pharmDx", "Agilent Technologies (Dako)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["cemiplimab"], "P150013/S021 (02/22/2021)", "agilent"),
      cdx("Ventana PD-L1 (SP263) Assay", "Ventana Medical Systems (Roche)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["cemiplimab"], "P160046/S013 (03/01/2023)", "roche-genentech"),
    ],
    forPatient: "In lung cancer the report gives a percentage of tumour cells. At 50 percent or more the labels allow pembrolizumab or cemiplimab on their own as first treatment; between 1 and 49 percent pembrolizumab alone is still on label but chemotherapy combinations are usually chosen; below 1 percent immunotherapy is given with chemotherapy rather than alone. The score does not apply if the tumour has an EGFR or ALK alteration, which take priority.",
    terms: ["tps", "pd-l1-testing", "ihc"], related: ["pd-l1-cps", "pd-l1-ic-score", "pd-l1-tc-score"], links: [{ label: "KEYTRUDA prescribing information (DailyMed)", url: LABEL.keytruda }, { label: "LIBTAYO prescribing information (DailyMed)", url: LABEL.libtayo }], tags: ["biomarker", "pd-l1"] }),

  b({ id: "pd-l1-ic-score", name: "PD-L1 IC score (immune-cell score, SP142)", aka: ["PD-L1 IC", "IC score", "immune cell score", "tumor-infiltrating immune cell score", "SP142 IC", "IC >= 1%", "IC >= 5%", "IC >= 10%", "IC≥1%", "IC2/3"],
    target: "pdl1", measurement: "immune-cell-score",
    tldr: "The IC score measures how much of the tumour area is covered by PD-L1-stained immune cells rather than tumour cells. It belongs to the SP142 assay used with atezolizumab and is read differently from every other PD-L1 score.",
    summary: "The VENTANA SP142 assay scores PD-L1 on tumour-infiltrating immune cells as the proportion of tumour area they occupy: IC0 (< 1 percent), IC1 (1 to < 5 percent), IC2 (5 to < 10 percent), IC3 (>= 10 percent). Atezolizumab's current US label uses IC >= 10 percent as one arm of the first-line NSCLC single-agent gate (the other being TC >= 50 percent). Earlier atezolizumab indications that used IC scores, IC >= 5 percent in cisplatin-ineligible urothelial cancer and IC >= 1 percent in triple-negative breast cancer (IMpassion130), were withdrawn in the United States in 2022 and 2021; the FDA companion diagnostic list still carries the urothelial SP142 approval of 2016. Blueprint comparison studies found SP142 stains fewer tumour cells than 22C3, 28-8 or SP263, so an SP142 result cannot be swapped for a TPS or CPS.",
    scoringRule: { text: "Proportion of the tumour area occupied by PD-L1-staining tumour-infiltrating immune cells of any intensity, in bands IC0 to IC3; read on the SP142 assay only.", quote: "PD-L1 protein expression (PD-L1 stained tumor-infiltrating immune cells [IC] covering ≥ 5% of the tumor area)", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "IC >= 10% (or TC >= 50%)", drugId: "atezolizumab", cancerId: "nsclc", regulator: "FDA", source: LABEL.tecentriq, quote: "TECENTRIQ, as a single agent, is indicated for the first-line treatment of adult patients with metastatic non-small cell lung cancer (NSCLC) whose tumors have high PD-L1 expression (PD-L1 stained ≥ 50% of tumor cells [TC ≥ 50%] or PD-L1 stained tumor-infiltrating immune cells [IC] covering ≥ 10% of the tumor area [IC ≥ 10%]), as determined by an FDA-authorized test, with no EGFR or ALK genomic tumor aberrations" }),
      th({ value: "IC >= 5% (cisplatin-ineligible)", drugId: "atezolizumab", cancerId: "urothelial", regulator: "FDA", source: FDA_CDX_URL, quote: "PD-L1 protein expression (PD-L1 stained tumor-infiltrating immune cells [IC] covering ≥ 5% of the tumor area)", status: "withdrawn", note: "The first-line urothelial indication was withdrawn in the United States in November 2022; the SP142 companion diagnostic approval (P160002, 18 May 2016) remains on the FDA list." }),
      th({ value: "IC >= 1%", drugId: "atezolizumab", cancerId: "tnbc-metastatic", regulator: "FDA", source: LABEL.tecentriq, status: "withdrawn", note: "Accelerated approval with nab-paclitaxel (IMpassion130, 2019) was withdrawn in the United States in August 2021; the indication remains authorised in the European Union." }),
    ],
    cancers: ["nsclc", "urothelial", "tnbc-metastatic"], drugs: ["atezolizumab", "ventana-pd-l1-sp142"], assays: ["pdl1-sp142"],
    companionDiagnostics: [
      cdx("Ventana PD-L1 (SP142) Assay", "Ventana Medical Systems (Roche)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["atezolizumab"], "P160002/S006 (07/02/2018)", "roche-genentech"),
      cdx("Ventana PD-L1 (SP142) Assay", "Ventana Medical Systems (Roche)", "Urothelial Carcinoma - Tissue", ["atezolizumab"], "P160002 (05/18/2016)", "roche-genentech"),
    ],
    forPatient: "If your report says SP142 and gives an IC percentage, it is measuring immune cells around the tumour, not the tumour itself. In lung cancer an IC of 10 percent or more (or tumour cells at 50 percent or more) allows atezolizumab alone as first treatment. The older uses of this score in bladder and triple-negative breast cancer were withdrawn in the United States, so ask which label your country follows.",
    terms: ["pd-l1-testing", "ihc", "tils"], related: ["pd-l1-cps", "pd-l1-tps", "pd-l1-tc-score"], links: [{ label: "TECENTRIQ prescribing information (DailyMed)", url: LABEL.tecentriq }], tags: ["biomarker", "pd-l1"] }),

  b({ id: "pd-l1-tc-score", name: "PD-L1 TC score (tumour-cell score, SP263 and 28-8)", aka: ["PD-L1 TC", "TC score", "tumor cell score", "tumour cell score", "TC >= 1%", "TC >= 50%", "PD-L1 >= 1% tumor cells", "SP263 TC", "28-8 TC", "TC≥1%", "TC≥50%"],
    target: "pdl1", measurement: "tumour-cell-score",
    tldr: "The TC score is the percentage of tumour cells staining for PD-L1 on the SP263 or 28-8 assays. Atezolizumab uses 1 percent after lung surgery and 50 percent for first-line treatment alone; nivolumab with ipilimumab uses 1 percent in first-line lung cancer.",
    summary: "Tumour-cell scoring on the VENTANA SP263 and Dako 28-8 assays is arithmetically the same as TPS (percentage of tumour cells with membrane staining) but is tied to different drugs and assays, so labels write it as TC or as 'PD-L1 expression on >= 1% of tumor cells'. Atezolizumab's adjuvant NSCLC indication after resection and platinum chemotherapy requires PD-L1 on >= 1 percent of tumour cells (IMpower010, SP263), and its first-line single-agent indication uses TC >= 50 percent (or IC >= 10 percent). Nivolumab with ipilimumab in first-line metastatic NSCLC is approved for tumours expressing PD-L1 >= 1 percent on the 28-8 pharmDx (CheckMate 227). Blueprint phase 2 found SP263, 22C3 and 28-8 closely concordant for tumour-cell scoring, which is why the FDA has accepted each as a companion for several antibodies.",
    scoringRule: { text: "Percentage of tumour cells with membrane staining of any intensity on the SP263 or 28-8 assay; immune cells are not counted.", quote: "PD-L1 protein expression (PD-L1 stained ≥ 1% of tumor cells [TC ≥ 1%])", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "PD-L1 on >= 1% of tumour cells (adjuvant)", drugId: "atezolizumab", cancerId: "nsclc", regulator: "FDA", source: LABEL.tecentriq, quote: "as adjuvant treatment following resection and platinum-based chemotherapy for adult patients with Stage II to IIIA NSCLC whose tumors have PD-L1 expression on ≥ 1% of tumor cells, as determined by an FDA-authorized test." }),
      th({ value: "TC >= 50% (or IC >= 10%)", drugId: "atezolizumab", cancerId: "nsclc", regulator: "FDA", source: LABEL.tecentriq, quote: "whose tumors have high PD-L1 expression (PD-L1 stained ≥ 50% of tumor cells [TC ≥ 50%] or PD-L1 stained tumor-infiltrating immune cells [IC] covering ≥ 10% of the tumor area [IC ≥ 10%])" }),
      th({ value: "PD-L1 >= 1% tumour cells (28-8 pharmDx)", drugId: "nivolumab", cancerId: "nsclc", regulator: "FDA", source: FDA_CDX_URL, quote: "PD-L1 protein expression (tumor cell staining ≥1%)", note: "FDA companion diagnostic row P150025/S013 (15 May 2020) for Opdivo in combination with Yervoy in NSCLC." }),
    ],
    cancers: ["nsclc"], drugs: ["atezolizumab", "nivolumab", "ipilimumab", "ventana-pd-l1-sp263"], assays: ["pdl1-sp263", "pdl1-28-8"],
    companionDiagnostics: [
      cdx("Ventana PD-L1 (SP263) Assay", "Ventana Medical Systems (Roche)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["atezolizumab"], "P160046/S010 (10/15/2021)", "roche-genentech"),
      cdx("PD-L1 IHC 28-8 pharmDx", "Agilent Technologies (Dako)", "Non-small cell lung cancer (NSCLC) - Tissue", ["nivolumab", "ipilimumab"], "P150025/S013 (05/15/2020)", "agilent"),
    ],
    forPatient: "A TC percentage is the share of tumour cells that stain. After lung cancer surgery, 1 percent or more is the label threshold for a year of atezolizumab; in metastatic lung cancer 50 percent or more allows atezolizumab on its own, and 1 percent or more allows nivolumab with ipilimumab. Ask which assay was used, because the drug the result applies to follows the assay.",
    terms: ["pd-l1-testing", "ihc"], related: ["pd-l1-cps", "pd-l1-tps", "pd-l1-ic-score"], links: [{ label: "TECENTRIQ prescribing information (DailyMed)", url: LABEL.tecentriq }, { label: "OPDIVO prescribing information (DailyMed)", url: LABEL.opdivo }], tags: ["biomarker", "pd-l1"] }),

  // ---- HER2 (ERBB2) ----
  b({
    notes:["Keep the specimen, lesion or block, assay and scoring method with the result. The September 2026 CAP template separates negative score 0 with no detected membrane staining from negative score 0+ with faint, incomplete membrane staining in 10 percent or fewer tumour cells. Earlier scoring systems included both patterns within IHC 0; the ENHERTU label calls the membrane-staining pattern HER2-ultralow. An older study’s notation must be interpreted using that study’s assay and definitions. No detected staining is an observation with a particular test, rather than proof that every HER2 molecule is absent."], asOf:"2026-11-09", id: "her2-ihc-3-plus", name: "HER2 IHC 3+ (HER2-positive by immunohistochemistry)", aka: ["HER2 IHC 3+", "HER2 3+", "IHC 3+", "HER2 overexpression", "HER2-positive IHC", "HER2 protein overexpression"],
    target: "her2", measurement: "ihc-score",
    tldr: "In invasive breast cancer, IHC 3+ means intense complete HER2 membrane staining in more than 10 percent of tumour cells. It meets a protein-overexpression criterion; treatment still depends on the exact drug and clinical setting.",
    summary: "The September 2026 CAP breast template defines IHC 3+ as complete, intense circumferential membrane staining in more than 10 percent of tumour cells, interpreted with specimen and assay quality. Other tissues can use different scoring rules. A score is not a universal prescription for every HER2-directed treatment.\n\nThe current U.S. ENHERTU label contains distinct early-breast, HER2-positive advanced-breast, gastric and IHC 3+ solid-tumour uses, each with its own setting, regimen and prior-treatment requirements. These are different from its HER2-low/ultralow breast uses. Read the relevant indication rather than inferring it from a shared target or a score alone.",
    scoringRule: {"text":"For invasive breast cancer, IHC 3+ is complete, intense circumferential membrane staining in more than 10 percent of tumour cells. This is a tissue-specific protein-overexpression interpretation, not a universal rule across organs.","quote":"Positive (Score 3+)","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [
      th({ value: "IHC 3+ or ISH+", drugId: "trastuzumab-deruxtecan", cancerId: "breast-her2-positive", regulator: "FDA", source: LABEL.enhertu, quote: "ENHERTU, in combination with pertuzumab, is indicated for the first-line treatment of adult patients with unresectable or metastatic HER2-positive (IHC 3+ or ISH+) breast cancer, as determined by an FDA-authorized test" }),
      th({ value: "IHC 3+", drugId: "trastuzumab-deruxtecan", cancerId: "metastatic-cancer", regulator: "FDA", source: LABEL.enhertu, quote: "Select patients for treatment of unresectable or metastatic solid tumors with ENHERTU based on HER2-positive (IHC 3+) specimens", note: "The label adds: An FDA-authorized test for the detection of HER2-positive (IHC 3+) solid tumors for treatment with ENHERTU is not currently available." }),
      th({ value: "IHC 3+ or IHC 2+/ISH+", drugId: "trastuzumab-deruxtecan", cancerId: "gastric-her2-positive", regulator: "FDA", source: LABEL.enhertu, quote: "Select patients with locally advanced or metastatic HER2-positive gastric cancer based on HER2 protein overexpression or HER2 gene amplification (IHC 3+ or IHC 2+/ISH+)." }),
      th({ value: "HER2 overexpression or amplification", drugId: "trastuzumab", cancerId: "breast-her2-positive", regulator: "FDA", source: LABEL.herceptin, quote: "Select patients based on HER2 protein overexpression or HER2 gene amplification in tumor specimens" }),
      th({ value: "HER2 overexpression (gastric scoring)", drugId: "trastuzumab", cancerId: "gastric-her2-positive", regulator: "FDA", source: LABEL.herceptin, quote: "Assessment of HER2 protein overexpression and HER2 gene amplification in metastatic gastric cancer should be performed using FDA-authorized tests specifically for gastric cancers due to differences in gastric vs. breast histopathology, including incomplete membrane staining and more frequent heterogeneous expression of HER2 seen in gastric cancers." }),
      th({ value: "IHC 3+", drugId: "zanidatamab", cancerId: "biliary-tract-cancer", regulator: "FDA", source: LABEL.ziihera, quote: "Select patients for treatment of unresectable or metastatic biliary tract cancer based on HER2-positive (IHC 3+) tumor specimens, as detected by an FDA-authorized test" }),
      th({ value: "IHC 3+ (with chemotherapy) or IHC 3+ or IHC 2+/ISH+ (with chemotherapy and tislelizumab)", drugId: "zanidatamab", cancerId: "gastric-her2-positive", regulator: "FDA", source: LABEL.ziihera, quote: "in combination with fluoropyrimidine- and platinum-containing chemotherapy, and tislelizumab-jsgr, as first-line treatment of adult patients with HER2-positive (IHC 3+ or IHC 2+/ISH+) unresectable locally advanced or metastatic gastric, gastroesophageal junction, or esophageal adenocarcinoma, as detected by an FDA-authorized test." }),
      th({ value: "HER2-positive", drugId: "trastuzumab-emtansine", cancerId: "breast-her2-positive", regulator: "FDA", source: LABEL.kadcyla, quote: "Assessment of HER2 protein overexpression and/or HER2 gene amplification should be performed using FDA-authorized tests specific for breast cancers by laboratories with demonstrated proficiency." }),
    ],
    cancers: ["breast-her2-positive", "her2-positive-early-breast-cancer", "gastric-her2-positive", "biliary-tract-cancer", "metastatic-cancer"],
    drugs: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine", "trastuzumab-deruxtecan", "tucatinib", "margetuximab", "neratinib", "zanidatamab", "her2-testing-assays"], tests: ["caris-mi-profile"], assays: ["her2-herceptest", "her2-pathway-4b5"],
    companionDiagnostics: [
      cdx("HercepTest", "Dako Denmark A/S (Agilent)", "Breast Cancer - Tissue", ["trastuzumab"], "P980018 (09/25/1998)", "agilent"),
      cdx("HercepTest", "Dako Denmark A/S (Agilent)", "Gastric and Gastroesophageal Cancer - Tissue", ["trastuzumab"], "P980018/S010 (10/20/2010)", "agilent"),
      cdx("PATHWAY anti-HER-2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab"], "P990081 (11/28/2000)", "roche-genentech"),
      cdx("PATHWAY anti-HER-2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Biliary Tract Cancer (gallbladder adenocarcinoma, intrahepatic cholangiocarcinoma, and extrahepatic cholangiocarcinoma) - Tissue", ["zanidatamab"], "P990081/S054 (11/20/2024)", "roche-genentech"),
      cdx("PATHWAY anti-HER-2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan", "pertuzumab"], "P990081/S059 (12/15/2025)", "roche-genentech"),
      cdx("Bond Oracle HER2 IHC System", "Leica Biosystems", "Breast Cancer - Tissue", ["trastuzumab"], "P090015 (04/18/2012)", "leica-biosystems"),
    ],
    forPatient: "A valid breast IHC 3+ result is HER2-positive for protein overexpression. The appropriate treatment also depends on the specific disease, stage, regimen and other label requirements. Scoring conventions and treatment rules can differ in other organs.",
    terms: ["her2-positive", "ihc", "dual-her2-blockade"], related: ["her2-ihc-2-plus", "her2-ihc-1-plus", "her2-ihc-0", "her2-low-ihc", "her2-ultralow", "her2-ish-amplified", "her2-mutation"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"Herceptin prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=492dbdb2-077e-4064-bff3-372d6af0a7a2"},{"label":"ASCO/CAP HER2 testing in breast cancer guideline, 2018 focused update (Wolff et al., J Clin Oncol)","url":"https://doi.org/10.1200/JCO.2018.77.8738"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["Keep the specimen, lesion or block, assay and scoring method with the result. The September 2026 CAP template separates negative score 0 with no detected membrane staining from negative score 0+ with faint, incomplete membrane staining in 10 percent or fewer tumour cells. Earlier scoring systems included both patterns within IHC 0; the ENHERTU label calls the membrane-staining pattern HER2-ultralow. An older study’s notation must be interpreted using that study’s assay and definitions. No detected staining is an observation with a particular test, rather than proof that every HER2 molecule is absent."], asOf:"2026-11-09", id: "her2-ihc-2-plus", name: "HER2 IHC 2+ (equivocal, reflex to ISH)", aka: ["HER2 IHC 2+", "HER2 2+", "IHC 2+", "HER2 equivocal", "2+/ISH", "IHC 2+/ISH-negative", "IHC 2+/ISH+"],
    target: "her2", measurement: "ihc-score",
    tldr: "In breast-cancer scoring, IHC 2+ is equivocal for HER2 protein overexpression. The applicable ISH and laboratory interpretation are needed before assigning final HER2 status or applying a treatment rule.",
    summary: "The September 2026 CAP breast template lists weak to moderate complete membrane staining in more than 10 percent of cells as a common IHC 2+ pattern, with additional equivocal patterns and artefact considerations. The breast testing algorithm uses ISH to resolve the result. Ratio, copy number, concurrent IHC and any required recounting matter in uncommon groups; a gene-count shortcut does not replace the algorithm.\n\nIHC 2+/ISH-negative is a HER2-low category for specified trastuzumab deruxtecan breast uses, while a completed HER2-positive interpretation belongs to different treatment rules. Tissue-specific scoring and the actual product label must be retained; a breast scoring rule is not automatically a gastric, colorectal or biliary rule. The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit.",
    scoringRule: {"text":"In invasive breast cancer, common 2+ staining is weak to moderate and complete in more than 10 percent of cells; other specified equivocal patterns also occur. Resolve the result through the applicable ISH/IHC algorithm, including recounting where required.","quote":"Equivocal (Score 2+)","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [{"value":"IHC 2+/ISH+ (HER2-positive)","drugId":"trastuzumab-deruxtecan","cancerId":"gastric-her2-positive","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"based on HER2 protein overexpression or HER2 gene amplification (IHC 3+ or IHC 2+/ISH+)","status":"current"},{"value":"IHC 2+/ISH- (HER2-low)","drugId":"trastuzumab-deruxtecan","cancerId":"her2-low-metastatic-breast-cancer","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"HER2-low (IHC 1+ or IHC 2+/ISH-) breast cancer, as determined by an FDA-authorized test, who have received a prior chemotherapy in the metastatic setting or developed disease recurrence during or within 6 months of completing adjuvant chemotherapy","status":"current","note":"The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit."}],
    cancers: ["breast-cancer", "her2-low-metastatic-breast-cancer", "gastric-her2-positive"], drugs: ["trastuzumab-deruxtecan", "trastuzumab", "her2-testing-assays"], assays: ["her2-herceptest", "her2-pathway-4b5", "her2-ish"],
    companionDiagnostics: [cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P990081/S047 (09/30/2022)", "roche-genentech")],
    forPatient: "A 2+ score is an equivocal test result, not a treatment decision. The completed laboratory interpretation and the exact product, cancer type, stage and prior treatment determine what options may apply.",
    terms: ["her2-positive", "her2-low", "fish", "ihc"], related: ["her2-ihc-3-plus", "her2-ish-amplified", "her2-low-ihc"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"ASCO/CAP HER2 testing in breast cancer guideline, 2018 focused update (Wolff et al., J Clin Oncol)","url":"https://doi.org/10.1200/JCO.2018.77.8738"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["In a historical study of 18 pathologists reading 170 selected biopsies, concordance in the 0 versus 1+ range was lower than for 2+ versus 3+ (Fernandez 2022). That is a result of that study, not the probability that an individual report is wrong. Tissue, sampling time, reader and assay matter; a second review or a different specimen needs clinical and laboratory context and does not guarantee a changed result or access to a medicine."], asOf:"2026-11-09", id: "her2-ihc-1-plus", name: "HER2 IHC 1+", aka: ["HER2 IHC 1+", "HER2 1+", "IHC 1+", "HER2 1+ breast cancer"],
    target: "her2", measurement: "ihc-score",
    tldr: "In invasive breast-cancer scoring, IHC 1+ means faint incomplete HER2 membrane staining in more than 10 percent of tumour cells. It is a negative protein-overexpression category and can meet one biomarker condition of a specified HER2-low treatment use.",
    summary: "The September 2026 CAP breast template retains IHC 1+ as a negative category for protein overexpression: incomplete membrane staining that is faint or barely perceptible in more than 10 percent of tumour cells. It is one HER2-low category in DESTINY-Breast04, DESTINY-Breast06 and the corresponding U.S. ENHERTU label. This does not make the category biologically uniform or establish eligibility by the score alone. The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit.",
    scoringRule: {"text":"For invasive breast cancer, IHC 1+ is incomplete membrane staining that is faint or barely perceptible in more than 10 percent of tumour cells. It is negative for protein overexpression.","quote":"Negative (Score 1+)","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [{"value":"IHC 1+ (HER2-low)","drugId":"trastuzumab-deruxtecan","cancerId":"her2-low-metastatic-breast-cancer","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"Select patients for treatment of unresectable or metastatic HER2-low (IHC 1+ or IHC 2+/ISH-) or HER2-ultralow (IHC 0 with membrane staining) breast cancer with ENHERTU based on HER2 expression","status":"current","note":"The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit."}],
    cancers: ["breast-cancer", "her2-low-metastatic-breast-cancer", "breast-hr-positive"], drugs: ["trastuzumab-deruxtecan", "her2-testing-assays"], assays: ["her2-herceptest", "her2-pathway-4b5"],
    companionDiagnostics: [cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P990081/S047 (09/30/2022)", "roche-genentech")],
    forPatient: "A valid 1+ result retains useful information within a HER2-negative report. Whether a particular treatment applies also depends on the disease stage, hormone receptor status, prior treatment, test and drug label.",
    terms: ["her2-low", "ihc"], related: ["her2-low-ihc", "her2-ihc-0", "her2-ihc-2-plus"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"ASCO/CAP HER2 testing in breast cancer guideline, 2018 focused update (Wolff et al., J Clin Oncol)","url":"https://doi.org/10.1200/JCO.2018.77.8738"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"DESTINY-Breast04 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/35665782/"},{"label":"DESTINY-Breast06 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/39282896/"},{"label":"HER2 scoring concordance in a defined historical study","url":"https://pubmed.ncbi.nlm.nih.gov/35113160/"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["In a historical study of 18 pathologists reading 170 selected biopsies, concordance in the 0 versus 1+ range was lower than for 2+ versus 3+ (Fernandez 2022). That is a result of that study, not the probability that an individual report is wrong. Tissue, sampling time, reader and assay matter; a second review or a different specimen needs clinical and laboratory context and does not guarantee a changed result or access to a medicine."], asOf:"2026-11-09", id: "her2-ihc-0", name: "HER2 IHC 0 and 0+ (negative reporting categories)", aka: ["HER2 IHC 0", "HER2 0", "IHC 0", "HER2-negative IHC", "HER2 null", "IHC 0 with membrane staining"],
    target: "her2", measurement: "ihc-score",
    tldr: "An IHC 0 label must be read with its scoring system and staining description. Older breast scoring includes no detected membrane staining and faint staining in a small fraction of cells; the September 2026 CAP template reports these separately.",
    summary: "Keep the specimen, lesion or block, assay and scoring method with the result. The September 2026 CAP template separates negative score 0 with no detected membrane staining from negative score 0+ with faint, incomplete membrane staining in 10 percent or fewer tumour cells. Earlier scoring systems included both patterns within IHC 0; the ENHERTU label calls the membrane-staining pattern HER2-ultralow. An older study’s notation must be interpreted using that study’s assay and definitions. No detected staining is an observation with a particular test, rather than proof that every HER2 molecule is absent.\n\nThe current U.S. ENHERTU ultralow use requires IHC 0 with membrane staining, HR-positive unresectable or metastatic breast cancer, progression on one or more endocrine therapies in the metastatic setting and an FDA-authorized test. It does not follow from every report labelled 0 or from an ultralow TNBC result. A research response in an IHC 0 cohort does not itself expand the drug label or validate a universal cutoff.",
    scoringRule: {"text":"The September 2026 CAP breast template uses negative score 0 for no detected membrane staining, and negative score 0+ for incomplete faint membrane staining in 10 percent or fewer tumour cells. Earlier ASCO/CAP scoring placed both patterns within IHC 0. Interpret the notation using the actual source and assay.","quote":"No membrane staining detected","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [{"value":"IHC 0 with membrane staining (ultralow), HR-positive","drugId":"trastuzumab-deruxtecan","cancerId":"her2-low-metastatic-breast-cancer","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"Select patients for treatment of unresectable or metastatic HER2-low (IHC 1+ or IHC 2+/ISH-) or HER2-ultralow (IHC 0 with membrane staining) breast cancer with ENHERTU based on HER2 expression","status":"current","note":"The U.S. ultralow breast indication is for adults with unresectable or metastatic HR-positive disease that progressed on one or more endocrine therapies in the metastatic setting, with an FDA-authorized HER2 test. It is not an ultralow TNBC indication. The quoted selection excerpt does not replace the full indication."}],
    cancers: ["breast-cancer", "her2-low-metastatic-breast-cancer", "breast-hr-positive", "tnbc"], drugs: ["trastuzumab-deruxtecan", "her2-testing-assays"], assays: ["her2-herceptest", "her2-pathway-4b5"],
    companionDiagnostics: [cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P990081/S055 (01/27/2025)", "roche-genentech")],
    forPatient: "Ask what staining pattern and scoring system the report describes. A 0 result does not prove the absence of every HER2 molecule. A membrane-staining result is only one condition for a particular advanced HR-positive breast-cancer use; it does not automatically establish eligibility.",
    terms: ["her2-low", "ihc"], related: ["her2-ultralow", "her2-ihc-1-plus", "her2-low-ihc"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"ASCO/CAP HER2 testing in breast cancer guideline, 2018 focused update (Wolff et al., J Clin Oncol)","url":"https://doi.org/10.1200/JCO.2018.77.8738"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"DESTINY-Breast04 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/35665782/"},{"label":"DESTINY-Breast06 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/39282896/"},{"label":"HER2 scoring concordance in a defined historical study","url":"https://pubmed.ncbi.nlm.nih.gov/35113160/"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["Keep the specimen, lesion or block, assay and scoring method with the result. The September 2026 CAP template separates negative score 0 with no detected membrane staining from negative score 0+ with faint, incomplete membrane staining in 10 percent or fewer tumour cells. Earlier scoring systems included both patterns within IHC 0; the ENHERTU label calls the membrane-staining pattern HER2-ultralow. An older study’s notation must be interpreted using that study’s assay and definitions. No detected staining is an observation with a particular test, rather than proof that every HER2 molecule is absent.","In a historical study of 18 pathologists reading 170 selected biopsies, concordance in the 0 versus 1+ range was lower than for 2+ versus 3+ (Fernandez 2022). That is a result of that study, not the probability that an individual report is wrong. Tissue, sampling time, reader and assay matter; a second review or a different specimen needs clinical and laboratory context and does not guarantee a changed result or access to a medicine."], asOf:"2026-11-09", id: "her2-low-ihc", name: "HER2-low (IHC 1+ or IHC 2+/ISH-negative)", aka: ["HER2-low breast cancer", "HER2-low readout", "IHC 1+ or 2+/ISH-", "HER2 low expression", "HER2-low (IHC 1+ or IHC 2+/ISH-)"],
    target: "her2", measurement: "ihc-score",
    tldr: "In the relevant breast-cancer setting, HER2-low means IHC 1+ or IHC 2+ with a negative ISH result. This score is one part of a product-specific treatment rule, not a promise of benefit or an indication in every disease stage.",
    summary: "HER2-low is a staining/ISH category used in specified studies and treatment labelling. It does not establish a universal biological boundary or mean that every HER2-negative cancer is eligible for an ADC. DESTINY-Breast04 studied previously chemotherapy-treated metastatic disease; DESTINY-Breast06 studied hormone receptor-positive disease after endocrine therapy without prior metastatic chemotherapy. The latter trial’s ultralow analysis was exploratory. The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit.",
    scoringRule: {"text":"For invasive breast-cancer reporting, IHC 1+ is a negative protein-overexpression category with faint incomplete membrane staining in more than 10 percent of cells. IHC 2+ is equivocal and requires the applicable ISH interpretation. IHC 1+ or IHC 2+/ISH-negative defines the HER2-low group used in the corresponding studies and label.","quote":"IHC Score 1+","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [{"value":"IHC 1+ or IHC 2+/ISH-","drugId":"trastuzumab-deruxtecan","cancerId":"her2-low-metastatic-breast-cancer","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"HER2-low (IHC 1+ or IHC 2+/ISH-) breast cancer, as determined by an FDA-authorized test, who have received a prior chemotherapy in the metastatic setting or developed disease recurrence during or within 6 months of completing adjuvant chemotherapy","status":"current","note":"The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit."}],
    cancers: ["her2-low-metastatic-breast-cancer", "breast-hr-positive", "tnbc-metastatic", "breast-cancer"], drugs: ["trastuzumab-deruxtecan", "her2-testing-assays"], assays: ["her2-herceptest", "her2-pathway-4b5", "her2-ish"],
    companionDiagnostics: [cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P990081/S047 (09/30/2022)", "roche-genentech"), cdx("VENTANA HER2 Dual ISH DNA Probe Cocktail", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P190031/S015 (05/15/2026)", "roche-genentech")],
    forPatient: "Keep the underlying IHC score and any ISH result, even when the report says HER2-negative. A low result can meet the biomarker condition of a specified advanced-breast-cancer treatment use; stage, hormone receptor status, prior treatment and the rest of the label still matter.",
    terms: ["her2-low", "ihc", "fish"], related: ["her2-ihc-1-plus", "her2-ihc-2-plus", "her2-ultralow"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"DESTINY-Breast04 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/35665782/"},{"label":"DESTINY-Breast06 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/39282896/"},{"label":"HER2 scoring concordance in a defined historical study","url":"https://pubmed.ncbi.nlm.nih.gov/35113160/"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["In a historical study of 18 pathologists reading 170 selected biopsies, concordance in the 0 versus 1+ range was lower than for 2+ versus 3+ (Fernandez 2022). That is a result of that study, not the probability that an individual report is wrong. Tissue, sampling time, reader and assay matter; a second review or a different specimen needs clinical and laboratory context and does not guarantee a changed result or access to a medicine."], asOf:"2026-11-09", id: "her2-ultralow", name: "HER2-ultralow (IHC 0 with membrane staining)", aka: ["HER2-ultralow", "HER2 ultralow", "ultralow", "IHC 0 with faint staining", "IHC >0 <1+"],
    target: "her2", measurement: "ihc-score",
    tldr: "HER2-ultralow describes faint incomplete membrane staining within the historical IHC 0 band. A specified U.S. trastuzumab deruxtecan use requires hormone receptor-positive unresectable or metastatic breast cancer after endocrine therapy.",
    summary: "In DESTINY-Breast06 and the U.S. ENHERTU label, HER2-ultralow means IHC 0 with membrane staining. The September 2026 CAP breast template separately reports negative score 0+ for faint incomplete membrane staining in 10 percent or fewer tumour cells and score 0 for no detected membrane staining. The source, assay and scoring version matter when comparing a report with an older study.\n\nDESTINY-Breast06 enrolled hormone receptor-positive disease only; the primary endpoint concerned HER2-low disease and the ultralow analysis was exploratory. Its results do not establish an ultralow treatment indication in TNBC. For the U.S. ultralow use, adults need unresectable or metastatic HR-positive disease that progressed on one or more endocrine therapies in the metastatic setting and an FDA-authorized HER2 test. A trace of staining alone does not establish all these conditions or individual benefit.",
    scoringRule: {"text":"The September 2026 CAP breast template records negative score 0+ when incomplete, faint or barely perceptible membrane staining is present in 10 percent or fewer tumour cells. The ENHERTU label describes the corresponding ultralow category as IHC 0 with membrane staining. The classification is separate from clinical indication.","quote":"Negative (Score 0+)","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [{"value":"IHC 0 with membrane staining, HR-positive, after endocrine therapy","drugId":"trastuzumab-deruxtecan","cancerId":"her2-low-metastatic-breast-cancer","regulator":"FDA","source":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6","quote":"Select patients for treatment of unresectable or metastatic HER2-low (IHC 1+ or IHC 2+/ISH-) or HER2-ultralow (IHC 0 with membrane staining) breast cancer with ENHERTU based on HER2 expression","status":"current","note":"The U.S. ultralow breast indication is for adults with unresectable or metastatic HR-positive disease that progressed on one or more endocrine therapies in the metastatic setting, with an FDA-authorized HER2 test. It is not an ultralow TNBC indication. The quoted selection excerpt does not replace the full indication."}],
    cancers: ["her2-low-metastatic-breast-cancer", "breast-hr-positive"], drugs: ["trastuzumab-deruxtecan", "her2-testing-assays"], assays: ["her2-herceptest", "her2-pathway-4b5"],
    companionDiagnostics: [cdx("PATHWAY anti-Her2/neu (4B5) Rabbit Monoclonal Primary Antibody", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan"], "P990081/S055 (01/27/2025)", "roche-genentech")],
    forPatient: "An older report saying HER2 0 can include different staining patterns. The report’s assay, validity and membrane-staining description matter. The U.S. ultralow use described here is restricted to HR-positive unresectable or metastatic disease after specified endocrine therapy; it is not established by a TNBC ultralow result.",
    terms: ["her2-low", "ihc"], related: ["her2-ihc-0", "her2-low-ihc"], links: [{"label":"ENHERTU prescribing information (DailyMed)","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"DESTINY-Breast04 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/35665782/"},{"label":"DESTINY-Breast06 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/39282896/"},{"label":"HER2 scoring concordance in a defined historical study","url":"https://pubmed.ncbi.nlm.nih.gov/35113160/"}], tags: ["biomarker", "her2"] }),

  b({
    notes:["The November 2024 RCPath G148 dataset describes UK ratio/copy-number conventions that differ in some uncommon cases from ASCO/CAP. In current CAP breast guidance, group 2 with IHC 3+ is positive; describing every U.S. group 2 case as negative loses that condition. Keep the jurisdiction, guideline version and concurrent IHC with the result."], asOf:"2026-11-09", id: "her2-ish-amplified", name: "HER2 ISH amplified (ERBB2 gene amplification)", aka: ["HER2 ISH+", "HER2 FISH positive", "ERBB2 amplification", "HER2 amplified", "HER2/CEP17 ratio >= 2.0", "HER2 gene amplification", "HER2 Dual ISH"],
    target: "her2", measurement: "fish-ratio",
    tldr: "HER2 ISH measures gene signals in sampled cells. In breast cancer, the ratio, average copy number and sometimes concurrent protein staining must be interpreted together; one number alone does not settle every case.",
    summary: "Dual-probe breast ISH reports the HER2/CEP17 ratio and average HER2 signals per cell. The CAP September 2026 template identifies group 1 by ratio at least 2.0 with average HER2 count at least 4.0, and group 5 by ratio below 2.0 with average count below 4.0. Uncommon groups 2 to 4 require the specified concurrent IHC interpretation and, when IHC is 2+, second-observer recounting under the algorithm. Group 3 is not automatically positive regardless of protein staining: concurrent IHC 0 or 1+ leads to a negative interpretation in that guidance.\n\nThese are breast-specific interpretation rules. A ratio of 2 or a copy number of 6 does not universally establish a final positive result for every specimen, organ or jurisdiction. A completed laboratory interpretation and the actual treatment label retain the relevant tissue and clinical context.",
    scoringRule: {"text":"For dual-probe invasive-breast ISH, interpret the ratio and average copy number using the complete algorithm. Groups 2 to 4 require concurrent IHC; a second reviewer recounts ISH when IHC is 2+. Retain raw counts, ratio, IHC, heterogeneity and the final laboratory interpretation.","quote":"concurrent review of IHC","source":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true","sourceLabel":"CAP breast biomarker reporting template, version 1.6.2.0, September 2026"},
    thresholds: [
      th({ value: "ISH+ (IHC 3+ or ISH+)", drugId: "trastuzumab-deruxtecan", cancerId: "breast-her2-positive", regulator: "FDA", source: LABEL.enhertu, quote: "based on confirmed HER2-positive status or HER2 gene amplification (IHC 3+ or ISH+)" }),
      th({ value: "HER2 gene amplification", drugId: "trastuzumab", cancerId: "breast-her2-positive", regulator: "FDA", source: LABEL.herceptin, quote: "Select patients based on HER2 protein overexpression or HER2 gene amplification in tumor specimens" }),
      th({ value: "HER2 gene amplification", drugId: "pertuzumab", cancerId: "breast-her2-positive", regulator: "FDA", source: DM("17f85d17-ab71-4f5b-9fe3-0b8c822f69ff"), quote: "Assessment of HER2 protein overexpression and HER2 gene amplification should be performed using FDA-approved tests specific for breast cancer by laboratories with demonstrated proficiency." }),
    ],
    cancers: ["breast-her2-positive", "gastric-her2-positive", "her2-positive-early-breast-cancer"], drugs: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine", "trastuzumab-deruxtecan", "her2-testing-assays"], assays: ["her2-ish"],
    companionDiagnostics: [
      cdx("HER2 FISH pharmDx Kit", "Dako Denmark A/S (Agilent)", "Breast Cancer - Tissue", ["trastuzumab"], "P040005 (05/03/2005)", "agilent"),
      cdx("HER2 FISH pharmDx Kit", "Dako Denmark A/S (Agilent)", "Gastric and Gastroesophageal Cancer - Tissue", ["trastuzumab"], "P040005/S005 (10/20/2010)", "agilent"),
      cdx("PathVysion HER-2 DNA Probe Kit", "Abbott Molecular", "Breast Cancer - Tissue", ["trastuzumab"], "P980024 (12/11/1998)", "abbott"),
      cdx("Ventana HER2 Dual ISH DNA Probe Cocktail", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab"], "P190031 (07/28/2020)", "roche-genentech"),
      cdx("Ventana HER2 Dual ISH DNA Probe Cocktail", "Ventana Medical Systems (Roche)", "Breast Cancer - Tissue", ["trastuzumab-deruxtecan", "pertuzumab"], "P190031/S014 (12/15/2025)", "roche-genentech"),
    ],
    forPatient: "The ratio and copy count need the laboratory’s final interpretation and applicable guideline. Some uncommon combinations require protein staining and additional review. A numeric shortcut should not be used to infer eligibility for every HER2 treatment.",
    terms: ["fish", "gene-amplification", "her2-positive"], related: ["her2-ihc-3-plus", "her2-ihc-2-plus"], links: [{"label":"ASCO/CAP HER2 testing in breast cancer guideline, 2018 focused update (Wolff et al., J Clin Oncol)","url":"https://doi.org/10.1200/JCO.2018.77.8738"},{"label":"FDA: List of FDA-Authorized Companion Diagnostic Devices","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"Current U.S. ENHERTU prescribing information: indications and patient selection","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"RCPath G148 breast dataset, version 3, November 2024","url":"https://www.rcpath.org/resourceLibrary/g148-dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.html"}], tags: ["biomarker", "her2"] }),

  // "HER2-mutant" is the ENHERTU label's section 1.4 heading (checked 5 October 2026, LABEL.enhertu).
  { ...b({ id: "her2-mutation", name: "HER2 (ERBB2) activating mutation", aka: ["HER2 mutation", "ERBB2 mutation", "HER2-mutant", "HER2-mutant NSCLC", "ERBB2 exon 20 insertion", "HER2 tyrosine kinase domain mutation", "HER2 YVMA insertion", "HER2 TKD mutation"],
    target: "her2", measurement: "sequencing-variant",
    tldr: "A HER2 mutation is a change in the gene's kinase domain, most often an exon 20 insertion, found in about 2 to 3 percent of lung adenocarcinomas. It is a different thing from HER2 amplification or overexpression, and it selects trastuzumab deruxtecan and, since 2025, zongertinib in lung cancer.",
    summary: "Activating ERBB2 mutations cluster in the tyrosine kinase domain (exons 18 to 21), the commonest being the exon 20 insertion A775_G776insYVMA; they are detected by sequencing of tumour tissue or plasma. Trastuzumab deruxtecan's label covers unresectable or metastatic NSCLC whose tumours have activating HER2 (ERBB2) mutations in tumour or plasma specimens after prior systemic therapy (DESTINY-Lung02). Zongertinib (Hernexeos), approved in 2025, is labelled for non-squamous NSCLC with HER2 (ERBB2) tyrosine kinase domain activating mutations detected by an FDA-authorised test, testing plasma first and tissue if plasma is negative. The FDA list carries the Oncomine Dx Target Test and Guardant360 CDx for both drugs.",
    scoringRule: { text: "Presence of an activating ERBB2 mutation (single nucleotide variants in exons 18 to 21 of the tyrosine kinase domain or exon 20 insertions) by sequencing of tumour tissue or plasma; a negative plasma result should be followed by tissue testing.", quote: "ERBB2/HER2 activating mutations (SNVs in exons 18-21 within the tyrosine kinase domain and exon 20 insertions)", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "Activating HER2 (ERBB2) mutation, tumour or plasma", drugId: "trastuzumab-deruxtecan", cancerId: "nsclc", regulator: "FDA", source: LABEL.enhertu, quote: "Select patients for the treatment of unresectable or metastatic HER2-mutant NSCLC with ENHERTU based on the presence of activating HER2 (ERBB2) mutations in tumor or plasma specimens" }),
      th({ value: "HER2 (ERBB2) tyrosine kinase domain activating mutation", drugId: "zongertinib", cancerId: "nsclc", regulator: "FDA", source: LABEL.hernexeos, quote: "HERNEXEOS is indicated for the treatment of adult patients with unresectable or metastatic non-squamous non-small cell lung cancer (NSCLC) whose tumors have HER2 (ERBB2) tyrosine kinase domain activating mutations, as detected by an FDA-authorized test" }),
    ],
    cancers: ["nsclc"], drugs: ["trastuzumab-deruxtecan", "zongertinib", "oncomine-dx-target-test", "guardant360-cdx", "foundationone-cdx", "tempus-xt-cdx", "trusight-oncology-comprehensive"], tests: ["foundationone-cdx", "tempus-xt", "trusight-oncology-comprehensive"], assays: ["oncomine-dx", "guardant360-cdx"],
    companionDiagnostics: [
      cdx("Oncomine Dx Target Test", "Life Technologies (Thermo Fisher Scientific)", "Non-Small Cell Lung Cancer (NSCLC) - Tissue", ["trastuzumab-deruxtecan"], "P160045/S035 (08/11/2022)", "thermo-fisher"),
      cdx("Guardant360 CDx", "Guardant Health", "Non-Small Cell Lung Cancer (NSCLC) - Plasma", ["trastuzumab-deruxtecan"], "P200010/S008 (08/11/2022)", "guardant-health"),
      cdx("Oncomine Dx Target Test", "Life Technologies (Thermo Fisher Scientific)", "Non-Small Cell Lung cancer (NSCLC) - Tissue", ["zongertinib"], "P160045/S049 (08/08/2025)", "thermo-fisher"),
      cdx("Guardant360 CDx", "Guardant Health", "Non-small cell lung cancer (NSCLC) - Plasma", ["zongertinib"], "P200010/S027 (06/10/2026)", "guardant-health"),
    ],
    forPatient: "A HER2 mutation in lung cancer is found by a gene sequencing test, not by the HER2 stain used in breast cancer. If your report shows one, zongertinib is an on-label first treatment and trastuzumab deruxtecan is on label after prior treatment. If only a blood test was done and it was negative, the label asks for the tumour tissue to be tested too.",
    terms: ["ngs", "egfr-exon20-insertion"], related: ["her2-ihc-3-plus", "her2-ish-amplified", "egfr-exon-20-insertion"], links: [{ label: "ENHERTU prescribing information (DailyMed)", url: LABEL.enhertu }, { label: "HERNEXEOS prescribing information (DailyMed)", url: LABEL.hernexeos }], tags: ["biomarker", "her2"] }), asOf: "2026-10-04" },

  // ---- Hormone receptors and Ki-67 ----
  b({ id: "er-status", name: "ER status (oestrogen receptor by IHC)", aka: ["ER status", "ER-positive", "ER positive", "ER+", "ER-negative", "estrogen receptor status", "oestrogen receptor status", "ER low positive", "ER >= 1%", "ER 1-10%"],
    target: "estrogen-receptor", measurement: "ihc-score",
    tldr: "ER status reports oestrogen-receptor staining in tumour-cell nuclei. In invasive breast cancer, at least 1% is positive; 1% to 10% is ER-low positive, with limited evidence about endocrine-treatment benefit.",
    summary: "The oestrogen receptor is an intracellular protein involved in responses to oestrogen and regulation of gene expression. A clinical ER result measures receptor staining in identified tumour-cell nuclei, not the amount of oestrogen in blood or every downstream signal.\n\nThe ASCO/CAP invasive-breast guideline uses validated immunohistochemistry: at least 1% stained tumour-cell nuclei is positive, below 1% is negative, and 1% to 10% is reported as ER-low positive. These cancers are heterogeneous and can have features resembling ER-negative disease, but they remain ER-positive. Limited evidence suggests possible endocrine benefit, so the category supports consideration of endocrine treatment rather than a guaranteed response or a treatment mandate.",
    scoringRule: { text: "ER-positive: at least 1 percent of tumour cell nuclei stain positive by IHC. ER low positive: 1 to 10 percent. ER-negative: less than 1 percent or no staining, with internal and external controls behaving as expected.", quote: "ER-positive... if ≥ 1% of tumor cell nuclei are immunoreactive", source: ASCO_CAP_ER.url, sourceLabel: ASCO_CAP_ER.label },
    thresholds: [
      th({ value: "ER-positive (guideline >= 1% nuclei)", drugId: "elacestrant", cancerId: "breast-hr-positive", regulator: "FDA", source: LABEL.orserdu, quote: "ORSERDU is indicated for the treatment of postmenopausal women or adult men with estrogen receptor (ER)-positive, human epidermal growth factor receptor 2 (HER2)‑negative, ESR1 -mutated advanced or metastatic breast cancer" }),
      th({ value: "Hormone receptor-positive (guideline >= 1% nuclei)", drugId: "alpelisib", cancerId: "breast-hr-positive", regulator: "FDA", source: LABEL.piqray, quote: "PIQRAY is indicated in combination with fulvestrant for the treatment of adults with hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative, PIK3CA-mutated, advanced or metastatic breast cancer" }),
      th({ value: "Hormone receptor-positive (guideline >= 1% nuclei)", drugId: "capivasertib", cancerId: "breast-hr-positive", regulator: "FDA", source: LABEL.truqap, quote: "in combination with fulvestrant for the treatment of adult patients with hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative, locally advanced or metastatic breast cancer with one or more PIK3CA/AKT1/PTEN -alterations" }),
    ],
    definedBy: ASCO_CAP_ER,
    cancers: ["breast-hr-positive", "breast-cancer", "hr-positive-early-high-risk", "hr-positive-metastatic-post-cdk46", "endometrial"], drugs: ["tamoxifen", "letrozole", "fulvestrant", "palbociclib", "ribociclib", "abemaciclib", "elacestrant", "alpelisib", "capivasertib"], tests: ["oncotype-dx-breast"], assays: ["er-pr-ventana-confirm", "er-pr-dako", "er-pr-leica"],
    forPatient: "ER-positive means at least 1% of the tumour-cell nuclei stained for the oestrogen receptor under a suitable test. A 1% to 10% result is ER-low positive. Endocrine treatment may help, but evidence is limited for this low group and the result alone does not choose a treatment. The percentage is the share of stained cells, not the chance that treatment will work.",
    terms: ["hormone-receptor-status", "ihc", "serd"], related: ["pr-status", "ki-67-index", "esr1-mutation-ctdna"], links: [ASCO_CAP_ER,
{
  "label": "UniProt: P03372",
  "url": "https://www.uniprot.org/uniprotkb/P03372/entry"
},
{
  "label": "nci hormone therapy",
  "url": "https://www.cancer.gov/types/breast/treatment/hormone-therapy"
},
{
  "label": "cap er pr summary",
  "url": "https://www.cap.org/wp-content/uploads/documents/erpgr_summaryrecommendations.pdf"
},
{
  "label": "cap er pr guideline",
  "url": "https://www.cap.org/cap-guidelines/estrogen-and-progesterone-receptor-testing-in-breast-cancer-guideline-update/"
},
{
  "label": "RCPath G148 breast dataset, version 3 (2024)",
  "url": "https://www.rcpath.org/asset/D255F34C-176A-490D-9B5A7D58AC85F3A6/"
}
], tags: ["biomarker", "hormone-receptor"] ,
"asOf": "2026-11-11",
"notes": [
  "Receptor presence is like having machinery able to receive a message; it does not show equal signalling in every cell or equal drug sensitivity. Oestrogen binding can influence gene programmes, while endocrine treatments interfere with hormone production or action. This differs from menopausal hormone replacement. ER is not the same observation as the cell-surface HER2 receptor, and clinical nuclear staining is not a statement that the protein can exist only in that location.",
  "The measurement route is tissue, identification of invasive tumour cells, a validated nuclear stain, review of controls, percentage and intensity, then interpretation. Keep the specimen/block and collection context; IHC uses tissue sections. Percentage counts positive nuclei among the intended tumour cells, while intensity describes stain strength. Poor preservation, artefact or failed controls can prevent interpretation: uninterpretable does not mean negative. A bulk RNA result does not replace validated clinical IHC. ASCO/CAP recommends ER testing in DCIS to assess potential endocrine risk reduction, with PR optional there; invasive and in-situ contexts should be stated.",
  "For a fictional invasive tumour with adequate controls, ER staining in 4% of tumour-cell nuclei is ER-low positive. It is not 4% predicted treatment benefit and is not rounded down to ER-negative because an RNA classifier says basal-like. Preserve the stain denominator, intensity and category alongside that separate expression result. If controls fail, resolve the testing problem before assigning a negative category. ER and PR results remain separate observations."
]
}),

  b({ id: "pr-status", name: "PR status (progesterone receptor by IHC)", aka: ["PR status", "PR-positive", "PR positive", "PR+", "PgR", "progesterone receptor status", "PR-negative", "PR >= 1%"],
    target: "pgr", measurement: "ihc-score",
    tldr: "PR status measures progesterone-receptor staining in tumour-cell nuclei. It is reported separately from ER and is primarily prognostic in ER-positive invasive breast cancer.",
    summary: "The progesterone receptor is an intracellular hormone-response protein. Its tissue stain does not measure circulating progesterone or every interaction with ER signalling. In invasive breast cancer, the ASCO/CAP guideline uses at least 1% positive tumour-cell nuclei for PR positivity and below 1% for negativity; ER-low positive is an ER-specific reporting category.\n\nHR-positive is commonly used for ER-positive, PR-positive or both. Preserve the individual results: ER-positive/PR-negative is not hormone-receptor-negative or triple-negative. PR is primarily prognostic within ER-positive invasive disease. An unusual ER-negative/PR-positive combination should prompt review of the ER stain and controls, not an automatic inference about eligibility for endocrine treatment or a CDK4/6 inhibitor.",
    scoringRule: { text: "PR-positive: at least 1 percent of tumour cell nuclei stain positive by IHC; PR-negative below 1 percent.", quote: "PgR-positive... if ≥ 1% of tumor cell nuclei are immunoreactive", source: ASCO_CAP_ER.url, sourceLabel: ASCO_CAP_ER.label },
    thresholds: [th({ value: "Hormone receptor-positive (ER or PR >= 1%)", drugId: "palbociclib", cancerId: "breast-hr-positive", regulator: "FDA", source: LABEL.ibrance, quote: "hormone receptor (HR)-positive, human epidermal growth factor receptor 2 (HER2)-negative advanced or metastatic breast cancer", note: "Palbociclib label wording; the 1 percent rule is the ASCO/CAP guideline's, not the label's." })],
    definedBy: ASCO_CAP_ER,
    cancers: ["breast-hr-positive", "breast-cancer", "endometrial"], drugs: ["tamoxifen", "letrozole", "fulvestrant", "palbociclib"], assays: ["er-pr-ventana-confirm", "er-pr-dako", "er-pr-leica"],
    forPatient: "PR is read alongside ER. A negative PR result does not cancel a positive ER result. The report should retain both measurements, and an unusual combination may need pathology review. PR staining is not a prescription for progesterone and does not by itself predict your recurrence risk or treatment benefit.",
    terms: ["hormone-receptor-status", "ihc"], related: ["er-status", "ki-67-index"], links: [ASCO_CAP_ER,
{
  "label": "UniProt: P06401",
  "url": "https://www.uniprot.org/uniprotkb/P06401/entry"
},
{
  "label": "cap er pr summary",
  "url": "https://www.cap.org/wp-content/uploads/documents/erpgr_summaryrecommendations.pdf"
},
{
  "label": "cap er pr guideline",
  "url": "https://www.cap.org/cap-guidelines/estrogen-and-progesterone-receptor-testing-in-breast-cancer-guideline-update/"
},
{
  "label": "nci hormone therapy",
  "url": "https://www.cancer.gov/types/breast/treatment/hormone-therapy"
},
{
  "label": "RCPath G148 breast dataset, version 3 (2024)",
  "url": "https://www.rcpath.org/asset/D255F34C-176A-490D-9B5A7D58AC85F3A6/"
}
], tags: ["biomarker", "hormone-receptor"] ,
"asOf": "2026-11-11",
"notes": [
  "PR can bind progesterone and regulate gene programmes, but finding protein in a stained nucleus is not a direct readout of all receptor activity. The ASCO/CAP guideline uses ER to predict potential endocrine benefit and describes PR chiefly as prognostic in ER-positive invasive cancer. A prognostic association and evidence of added benefit from a particular medicine are different questions.",
  "Start with the identified tissue/lesion and invasive tumour-cell nuclei, then the validated stain, percentage, intensity, controls and final PR interpretation read beside ER. Sections are consumed by the assay. Record the specimen/block and context; preservation problems, scant assessable tumour or failed controls can limit interpretation. Percentage, intensity and composite IHC scores have different units. In-situ testing is a separate context, and no tissue-staining percentage is an individual recurrence or benefit probability.",
  "In a fictional adequately controlled report, ER is 80% and PR is below 1%. The invasive cancer is ER-positive and PR-negative; PR does not cancel ER and the pair is not TNBC. These measurements do not alone choose a drug, quantify benefit or prescribe progesterone. Read each observation before asking the separate treatment question."
]
}),

  b({ id: "ki-67-index", name: "Ki-67 index (proliferation by IHC)", aka: ["Ki-67", "Ki67", "Ki-67 index", "Ki-67 labelling index", "Ki-67 score", "MIB-1 index", "Ki-67 >= 20%", "Ki-67 ≥20%", "proliferation index"],
    target: "mki67", measurement: "ihc-score",
    tldr: "The Ki-67 index is the percentage of evaluated tumour-cell nuclei that stain for a protein associated with the active cell cycle.",
    summary: "Ki-67 immunohistochemistry reports the percentage of evaluated tumour-cell nuclei positive under the defined staining and scoring method. In gastroenteropancreatic neuroendocrine tumours the WHO classification grades G1 (< 3 percent), G2 (3 to 20 percent) and G3 (> 20 percent). The FDA's March 3, 2023 breast-cancer expansion removed the Ki-67 testing requirement for the specified high-risk HR-positive, HER2-negative adjuvant abemaciclib indication. Trial cohort definitions are distinct from that regulatory testing rule. The International Ki67 in Breast Cancer Working Group limited its 2021 clinical-utility conclusion to selected anatomically favourable ER-positive, HER2-negative breast cancers under standardised scoring, with prognosis assessment at 5 percent or less or 30 percent or more. These extremes are not universal thresholds for other cancers, methods or treatment decisions.",
    scoringRule: { text: "Percentage of tumour cell nuclei staining for Ki-67 (MIB-1), counted in the invasive tumour; in monarchE cohort 2 a score of 20 percent or more was required, measured centrally with the Ki-67 IHC MIB-1 pharmDx.", quote: "Breast tumor samples were tested at central sites using the Ki-67 IHC MIB-1 pharmDx (Dako Omnis) assay to establish if the Ki-67 score was ≥20%.", source: LABEL.verzenio, sourceLabel: "Verzenio prescribing information (clinical studies section)" },
    thresholds: [th({ value: "Ki-67 >= 20% (2021 adjuvant approval, requirement removed March 2023)", drugId: "abemaciclib", cancerId: "hr-positive-early-high-risk", regulator: "FDA", source: LABEL.verzenio, quote: "To be enrolled in cohort 2, patients had to have 1-3 pALN and Ki-67 score ≥20%.", status: "historic", note: "The current label no longer restricts adjuvant abemaciclib by Ki-67; the threshold is kept as the historic 2021 approval condition." })],
    definedBy: { label: "WHO Classification of Tumours, Digestive System Tumours, 5th edition (neuroendocrine grading by Ki-67)", url: "https://tumourclassification.iarc.who.int/" },
    cancers: ["breast-hr-positive", "hr-positive-early-high-risk", "neuroendocrine", "pancreatic-net", "lung-net"], drugs: ["abemaciclib"], assays: ["ki67-mib1"],
    forPatient: "Ki-67 measures the share of evaluated tumour nuclei staining for an active-cell-cycle protein. It is not a direct growth speed or a stand-alone estimate of treatment benefit. Its meaning depends on the cancer, sample and scoring method.",
    terms: ["net-grade-ki67", "proliferation", "ihc"], related: ["er-status", "pr-status"], links: [
  {
    "label": "Verzenio prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=be4bc0de-0fdc-4d46-8d25-be43c79e6a06"
  },
  {
    "label": "Assessment of Ki67 in Breast Cancer: Updated Recommendations From the International Ki67 in Breast Cancer Working Group.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33369635/"
  },
  {
    "label": "CAP breast biomarker template 1.6.2.0, September 2026",
    "url": "https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"
  },
  {
    "label": "FDA March 3, 2023 abemaciclib expansion",
    "url": "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-expands-early-breast-cancer-indication-abemaciclib-endocrine-therapy"
  }
], tags: ["biomarker", "proliferation"] ,
"asOf": "2026-11-10",
"notes": [
  "Ki-67 is associated with active cell-cycle phases and is generally absent from resting G0 cells. Its immunohistochemical index is positive eligible tumour-cell nuclei divided by all eligible nuclei evaluated, expressed as a percentage. MIB-1 names an antibody. Staining intensity is not the denominator; 30 positive nuclei among 100 eligible nuclei gives 30% in that field.",
  "Ki-67 is not a visible-mitosis count, a doubling time, a percentage growth per day, a recurrence probability or a complete Nottingham grade. A treatment-related decrease does not independently establish cell killing or patient benefit. RNA proliferation scores and protein immunostaining measure different features.",
  "Sampling and aggregation change the estimate. With fictional fields containing 90 positive nuclei out of 900 and 50 out of 100, pooling gives 140/1000 = 14%; averaging the two field percentages gives 30%; selecting the second field gives 50%. These are different estimators. They do not reproduce the International Ki67 Working Group's calibrated, area-weighted global method.",
  "Retain specimen, treatment time point, fixation, antibody/platform, counterstaining, controls, eligible nuclei and regional scoring rule. Poor visibility of negative nuclei can distort the denominator. The working group's weighted-global approach estimates areas with different staining levels and samples nuclei from those field types after calibration; it is not simply an unweighted hotspot average.",
  "The 2021 working-group utility conclusion concerned anatomically favourable T1 to T2, N0 to N1, ER-positive, HER2-negative breast cancer under standardised methods, with limited prognosis use at the specified extremes. It did not establish a universal triple-negative treatment cutoff. CAP's September 2026 template treats breast Ki-67 testing as optional; do not transfer one assay's clinical rule to another cancer or setting.",
  "The reviewed monarchE label defines cohort 1 by at least four positive axillary nodes, or one to three plus grade 3 or tumour size at least 50 mm. Cohort 1 was not defined by a mandatory Ki-67 threshold. Cohort 2 enrolled those not eligible for cohort 1 with one to three positive axillary nodes and centrally assessed Ki-67 at least 20% using MIB-1/Dako Omnis. The former regulatory testing requirement must not be mistaken for cohort 1 eligibility. This history is not a TNBC treatment rule.",
  "An index is a snapshot of eligible nuclei in active cell-cycle phases. Net tumour growth also depends on cell loss and the duration of cell-cycle phases; the same index need not imply the same doubling time. Neither staining intensity nor percentage positive establishes a daily growth rate."
]
}),

  // ---- Mismatch repair, microsatellite instability, tumour mutational burden ----
  b({ id: "dmmr-ihc", name: "dMMR (mismatch repair deficiency by IHC)", aka: ["dMMR", "MMR-deficient", "mismatch repair deficient", "MMRd", "loss of MLH1", "loss of MSH2", "loss of MSH6", "loss of PMS2", "MMR IHC", "MMR protein loss"],
    target: "mmr", measurement: "ihc-score",
    tldr: "dMMR means one of the four mismatch repair proteins is missing from the tumour cell nuclei on a stain. It is the tissue-level twin of MSI-high and opens checkpoint immunotherapy in endometrial, bowel and many other cancers.",
    summary: "Immunohistochemistry for MLH1, PMS2, MSH2 and MSH6 is read as retained or lost nuclear staining in tumour cells against an internal positive control; loss of any protein is mismatch repair deficient. Paired losses (MLH1 with PMS2, MSH2 with MSH6) reflect the heterodimers. Labels for pembrolizumab (tumour-agnostic, colorectal, endometrial), dostarlimab (endometrial and tumour-agnostic), nivolumab and ipilimumab (colorectal) and durvalumab (endometrial with chemotherapy) use 'MSI-H or dMMR' and name FDA-authorised tests; the VENTANA MMR RxDx Panel and the Agilent MMR IHC Panel pharmDx are the listed companion diagnostics. The dostarlimab label advises testing the primary tumour before temozolomide in gliomas because chemotherapy can alter dMMR results.",
    scoringRule: { text: "Loss of nuclear staining for one or more of MLH1, PMS2, MSH2 and MSH6 in tumour cells, with retained staining in internal control cells, is mismatch repair deficient.", quote: "Deficient mismatch repair (dMMR) proteins: MLH1, PMS2, MSH2 and MSH6", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "MSI-H or dMMR, tumour-agnostic", drugId: "pembrolizumab", cancerId: "metastatic-cancer", regulator: "FDA", source: LABEL.keytruda, quote: "for the treatment of adult and pediatric patients with unresectable or metastatic microsatellite instability-high (MSI-H) or mismatch repair deficient (dMMR) solid tumors, as determined by an FDA-authorized test, that have progressed following prior treatment and who have no satisfactory alternative treatment options." }),
      th({ value: "MSI-H or dMMR", drugId: "pembrolizumab", cancerId: "endometrial-mmr-deficient", regulator: "FDA", source: LABEL.keytruda, quote: "KEYTRUDA, as a single agent, is indicated for the treatment of adult patients with advanced endometrial carcinoma that is MSI-H or dMMR, as determined by an FDA-authorized test, who have disease progression following prior systemic therapy in any setting and are not candidates for curative surgery or radiation" }),
      th({ value: "dMMR", drugId: "dostarlimab", cancerId: "endometrial-mmr-deficient", regulator: "FDA", source: LABEL.jemperli, quote: "Monotherapy Adults with dMMR recurrent or advanced EC and dMMR recurrent or advanced solid tumors 500 mg a JEMPERLI every 3 weeks for 4 cycles followed by 1,000 mg a JEMPERLI every 6 weeks for all cycles thereafter.", note: "Dosing table wording; the indications section names dMMR recurrent or advanced endometrial cancer and dMMR solid tumours as determined by an FDA-approved test." }),
      th({ value: "MSI-H or dMMR", drugId: "nivolumab", cancerId: "colorectal", regulator: "FDA", source: LABEL.opdivo, quote: "OPDIVO, in combination with ipilimumab, is indicated for the treatment of adult and pediatric patients 12 years and older with unresectable or metastatic microsatellite instability-high (MSI-H) or mismatch repair deficient (dMMR) colorectal cancer (CRC)" }),
    ],
    cancers: ["endometrial", "endometrial-mmr-deficient", "colorectal", "gastric-msi-high", "metastatic-cancer"], drugs: ["pembrolizumab", "dostarlimab", "nivolumab", "ipilimumab", "durvalumab", "ventana-mmr-rxdx"], assays: ["mmr-ventana"],
    companionDiagnostics: [
      cdx("Ventana MMR RxDx Panel", "Ventana Medical Systems (Roche)", "Endometrial Carcinoma (EC) - Tissue", ["dostarlimab"], "P200019 (04/22/2021)", "roche-genentech"),
      cdx("Ventana MMR RxDx Panel", "Ventana Medical Systems (Roche)", "Solid Tumors", ["dostarlimab"], "P210001 (08/17/2021)", "roche-genentech"),
      cdx("Ventana MMR RxDx Panel", "Ventana Medical Systems (Roche)", "Solid Tumors", ["pembrolizumab"], "P210001/S001 (03/21/2022)", "roche-genentech"),
      cdx("Ventana MMR RxDx Panel", "Ventana Medical Systems (Roche)", "Endometrial Carcinoma (EC) - Tissue", ["durvalumab"], "P210001/S013 (12/18/2024)", "roche-genentech"),
      cdx("MMR IHC Panel pharmDx (Dako Omnis)", "Agilent Technologies", "Colorectal Cancer (CRC) - Tissue", ["nivolumab", "ipilimumab"], "P250004 (08/15/2025)", "agilent"),
    ],
    forPatient: "If your report shows loss of MLH1, PMS2, MSH2 or MSH6, your cancer is mismatch repair deficient. That opens immunotherapy (pembrolizumab, dostarlimab, nivolumab with ipilimumab depending on the cancer) and, because dMMR can be inherited as Lynch syndrome, your team should offer a germline test and advice for relatives. Loss of MLH1 alone is often caused by methylation rather than inheritance; a follow-up test tells the two apart.",
    terms: ["msi", "mlh1-promoter-methylation", "ihc", "tumour-agnostic"], related: ["msi-high", "tmb-high"], links: [{ label: "KEYTRUDA prescribing information (DailyMed)", url: LABEL.keytruda }, { label: "Jemperli prescribing information (DailyMed)", url: LABEL.jemperli }], tags: ["biomarker", "mmr"] }),

  b({ id: "msi-high", name: "MSI-high (microsatellite instability by PCR or sequencing)", aka: ["MSI-H", "MSI-high", "MSI high", "microsatellite instability-high", "microsatellite unstable", "MSI status", "MSI-H/dMMR", "MSS", "microsatellite stable"],
    target: "mmr", measurement: "msi-status",
    tldr: "MSI-high means the tumour's DNA has unstable repeat sequences, the footprint of failed mismatch repair. It is measured by PCR or sequencing, gives the same answer as dMMR in most tumours, and unlocks the same immunotherapies.",
    summary: "Microsatellite instability is scored by PCR across a panel of mononucleotide repeats (MSI-H when a set fraction of markers is unstable, typically 2 of 5 Bethesda or Promega markers, or 30 percent or more of a larger panel) or by next-generation sequencing algorithms that count unstable loci across hundreds of sites; MSS is stable and MSI-L is intermediate and grouped with MSS. Labels write 'MSI-H or dMMR' and accept either route; FoundationOne CDx and Caris MI Cancer Seek carry MSI-H companion claims for pembrolizumab and dostarlimab, the Biocartis Idylla MSI test for nivolumab in colorectal cancer, and, in the other direction, the Promega OncoMate MSI and Caris assays report 'not MSI-H' to select pembrolizumab with lenvatinib in endometrial cancer.\n\nThe U.S. tumour-agnostic pembrolizumab indication covers adult and paediatric patients with unresectable or metastatic MSI-H or dMMR solid tumours, determined by an FDA-authorised test, that have progressed following prior treatment and who have no satisfactory alternative treatment options. The separate colorectal indication covers unresectable or metastatic MSI-H or dMMR colorectal cancer determined by an FDA-authorised test, without that prior-treatment restriction. For non-colorectal solid tumours, the KEYTRUDA label recommends confirmation of MSI-H or dMMR by an FDA-authorised test if feasible because local and FDA-authorised tests can disagree. If confirmatory MSI-H/dMMR testing cannot be performed, TMB of at least 13 mutations per megabase determined by an FDA-authorised test may be used to select treatment. This is a treatment-selection alternative, not laboratory evidence that the tumour is MSI-H or dMMR.",
    scoringRule: { text: "MSI-H: instability at the required fraction of tested microsatellite loci (for example 2 or more of 5 mononucleotide markers by PCR, or the sequencing panel's validated cut-off across many loci); otherwise microsatellite stable.", quote: "Microsatellite instability – High (MSI-H)", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "MSI-H or dMMR, tumour-agnostic", drugId: "pembrolizumab", cancerId: "metastatic-cancer", regulator: "FDA", source: LABEL.keytruda, quote: "unresectable or metastatic microsatellite instability-high (MSI-H) or mismatch repair deficient (dMMR) solid tumors, as determined by an FDA-authorized test, that have progressed following prior treatment and who have no satisfactory alternative treatment options." }),
      th({ value: "MSI-H or dMMR", drugId: "pembrolizumab", cancerId: "colorectal", regulator: "FDA", source: LABEL.keytruda, quote: "for the treatment of patients with unresectable or metastatic MSI-H or dMMR colorectal cancer (CRC) as determined by an FDA-authorized test." }),
      th({ value: "MSI-H or dMMR (single agent after chemotherapy)", drugId: "nivolumab", cancerId: "colorectal", regulator: "FDA", source: LABEL.opdivo, quote: "OPDIVO, as a single agent, is indicated for the treatment of adult and pediatric patients 12 years and older with microsatellite instability-high (MSI-H) or mismatch repair deficient (dMMR) metastatic colorectal cancer (CRC) that has progressed following treatment with a fluoropyrimidine, oxaliplatin, and irinotecan." }),
      th({ value: "Not MSI-H / pMMR (selects the lenvatinib combination)", drugId: "lenvatinib", cancerId: "endometrial", regulator: "FDA", source: LABEL.keytruda, quote: "KEYTRUDA, in combination with lenvatinib, is indicated for the treatment of adult patients with advanced endometrial carcinoma that is mismatch repair proficient (pMMR) or not MSI-H as determined by an FDA-authorized test" }),
    ],
    cancers: ["colorectal", "endometrial", "endometrial-mmr-deficient", "gastric-msi-high", "metastatic-cancer"], drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "dostarlimab", "lenvatinib", "foundationone-cdx", "caris-mi-cancer-seek"], tests: ["foundationone-liquid-cdx", "caris-mi-cancer-seek", "tempus-xt", "trusight-oncology-500", "stratangs", "omniseq-insight", "altera", "oncoextra", "bostongene-tumor-portrait"], assays: ["msi-pcr", "foundationone-cdx-panel"],
    companionDiagnostics: [
      cdx("FoundationOne CDx", "Foundation Medicine", "Solid Tumors - Tissue", ["pembrolizumab"], "P170019/S029 (02/18/2022)", "foundation-medicine"),
      cdx("MI Cancer Seek (MCS)", "Caris Life Sciences", "Solid Tumors - Tissue", ["pembrolizumab"], "P240010 (11/05/2024)", "caris"),
      cdx("MI Cancer Seek (MCS)", "Caris Life Sciences", "Solid Tumors - Tissue", ["dostarlimab"], "P240010 (11/05/2024)", "caris"),
      cdx("Idylla CDx MSI Test", "Biocartis", "Colorectal Cancer (CRC) - Tissue", ["nivolumab", "ipilimumab"], "P250005 (08/15/2025)", "biocartis"),
      cdx("OncoMate MSI Dx Analysis System", "Promega", "Endometrial Carcinoma (EC) - Tissue", ["pembrolizumab", "lenvatinib"], "P240026 (11/05/2025)", "promega"),
    ],
    forPatient: "An MSI-high or dMMR result can support pembrolizumab treatment when the cancer, test and treatment-setting conditions in the label are met. The U.S. tumour-agnostic pembrolizumab indication covers adult and paediatric patients with unresectable or metastatic MSI-H or dMMR solid tumours, determined by an FDA-authorised test, that have progressed following prior treatment and who have no satisfactory alternative treatment options. The separate colorectal indication covers unresectable or metastatic MSI-H or dMMR colorectal cancer determined by an FDA-authorised test, without that prior-treatment restriction. For non-colorectal solid tumours, the KEYTRUDA label recommends confirmation of MSI-H or dMMR by an FDA-authorised test if feasible because local and FDA-authorised tests can disagree. If confirmatory MSI-H/dMMR testing cannot be performed, TMB of at least 13 mutations per megabase determined by an FDA-authorised test may be used to select treatment. This is a treatment-selection alternative, not laboratory evidence that the tumour is MSI-H or dMMR. A stable (MSS) result in endometrial cancer may support pembrolizumab with lenvatinib for adults with advanced disease after progression following prior systemic therapy who are not candidates for curative surgery or radiation, with status determined by an FDA-authorised test. Discuss the result and any inherited-risk assessment with your care team.",
    terms: ["msi", "mss-pmmr", "ngs", "tumour-agnostic"], related: ["dmmr-ihc", "tmb-high"], links: [...([{ label: "KEYTRUDA prescribing information (DailyMed)", url: LABEL.keytruda }, { label: "OPDIVO prescribing information (DailyMed)", url: LABEL.opdivo }]), ...[{"label":"FDA, 16 October 2026: updated tumour-agnostic TMB-H indication","url":"https://www.fda.gov/drugs/cancer-approvals/fda-grants-traditional-approval-pembrolizumab-or-pembrolizumab-and-berahyaluronidase-alfa-pmph"},{"label":"KEYTRUDA current prescribing information, sections 1.8, 1.9, 1.18 and 2.1","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"}]], tags: ["biomarker", "mmr"] ,
"asOf": "2026-11-10"
}),

  b({ id: "tmb-high", name: "TMB-high (tumour mutational burden)", aka: [
  "TMB-H",
  "TMB-high",
  "TMB high",
  "tumor mutational burden",
  "tumour mutational burden",
  "TMB-H solid tumors",
  "bTMB",
  "blood TMB",
  "TMB >= 13 mut/Mb",
  "TMB ≥13"
],
    measurement: "tmb-threshold",
    tldr: "This result reports a high density of acquired DNA changes under a specified test’s rules.",
    summary: "Tumour mutational burden estimates the density of eligible acquired DNA changes under assay-specific counting, filtering and calibration rules. Identical units do not make different assays interchangeable. FDA’s 16 October 2026 conversion of the U.S. tumour-agnostic pembrolizumab indication to traditional approval changed its criterion from 10 to at least 13 mutations per megabase. The indication covers adults and children with unresectable or metastatic solid tumours, measured by an FDA-authorised test, that progressed after prior treatment and have no satisfactory alternative treatment options. A research value or a high category alone does not establish these conditions or guarantee benefit.",
    scoringRule: {
  "text": "For the U.S. tumour-agnostic pembrolizumab indication updated in October 2026, TMB-H means at least 13 mutations per megabase by an FDA-authorised test. Other studies and indications retain their own criteria.",
  "quote": "tumor mutational burden-high (TMB-H) [≥13 mutations/megabase (mut/Mb)] solid tumors, as determined by an FDA-authorized test",
  "source": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287",
  "sourceLabel": "KEYTRUDA current prescribing information, section 1.18"
},
    thresholds: [
  {
    "value": "TMB >= 13 mutations per megabase by an FDA-authorised test; unresectable or metastatic solid tumour after prior treatment, with no satisfactory alternatives",
    "drugId": "pembrolizumab",
    "cancerId": "metastatic-cancer",
    "regulator": "FDA",
    "status": "current",
    "source": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287",
    "quote": "KEYTRUDA is indicated for the treatment of adult and pediatric patients with unresectable or metastatic tumor mutational burden-high (TMB-H) [≥13 mutations/megabase (mut/Mb)] solid tumors, as determined by an FDA-authorized test [see Dosage and Administration (2.1)], that have progressed following prior treatment and who have no satisfactory alternative treatment options."
  }
],
    cancers: ["metastatic-cancer", "nsclc", "melanoma", "urothelial"], drugs: ["pembrolizumab", "foundationone-cdx"], tests: ["foundationone-liquid-cdx", "caris-mi-cancer-seek", "tempus-xt", "trusight-oncology-500", "stratangs", "omniseq-insight", "altera", "oncoextra", "bostongene-tumor-portrait", "tempus-xe"], assays: ["tmb-panel", "foundationone-cdx-panel"],
    companionDiagnostics: [cdx("FoundationOne CDx", "Foundation Medicine", "Solid Tumors - Tissue", ["pembrolizumab"], "P170019/S016 (06/16/2020)", "foundation-medicine")],
    forPatient: "Ask which test measured the result and which treatment setting it applies to. The current U.S. tumour-agnostic pembrolizumab indication requires at least 13 mutations per megabase by an FDA-authorised test, an unresectable or metastatic solid tumour that progressed after prior treatment, and no satisfactory alternative treatment options. The former threshold of 10 belongs to the earlier accelerated approval. Other cancer-specific indications have separate rules. A high number does not guarantee response.",
    terms: ["tmb", "ngs", "tumour-agnostic", "neoantigen"], related: ["msi-high", "dmmr-ihc"], links: [
  {
    "label": "KEYTRUDA current prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"
  },
  {
    "label": "FDA, 16 October 2026: traditional approval and updated TMB-H indication",
    "url": "https://www.fda.gov/drugs/cancer-approvals/fda-grants-traditional-approval-pembrolizumab-or-pembrolizumab-and-berahyaluronidase-alfa-pmph"
  },
  {
    "label": "Merino et al., 2020: in silico TMB harmonisation study",
    "url": "https://doi.org/10.1136/jitc-2019-000147"
  }
], tags: ["biomarker", "genome-wide", "precision"] ,
"asOf": "2026-11-10",
"notes": [
  "FDA’s October 2026 conversion changed the tumour-agnostic indication from accelerated to traditional approval. FDA states that efficacy supporting traditional approval was not confirmed for TMB from 10 to below 13 mutations per megabase. This does not establish universal lack of benefit or a contraindication below 13; other indications and individual evidence have separate scope.",
  "Published cohort frequencies and study thresholds below retain their original assay, cutoff and population. They must not be substituted for the current drug-label criterion. Blood and tissue estimates also require their own validation."
]
}),

  // ---- BRCA and HRD ----
  b({ id: "brca-germline", name: "Germline BRCA1/2 pathogenic variant (gBRCAm)", aka: ["gBRCA", "gBRCAm", "germline BRCA", "germline BRCA1", "germline BRCA2", "BRCA carrier", "inherited BRCA mutation", "deleterious germline BRCA mutation"],
    target: "brca", measurement: "sequencing-variant",
    tldr: "A constitutional BRCA1 or BRCA2 result can inform cancer susceptibility, relatives' testing and specified treatment decisions. It does not necessarily mean the variant was inherited or that a medicine will work.",
    summary: "Germline testing sequences BRCA1 and BRCA2 from blood or saliva and classifies variants as pathogenic, likely pathogenic, uncertain, likely benign or benign; labels use 'deleterious or suspected deleterious'. Olaparib is labelled for gBRCAm HER2-negative high-risk early breast cancer (adjuvant, OlympiA), gBRCAm HER2-negative metastatic breast cancer, first-line maintenance of gBRCAm metastatic pancreatic cancer, and germline or somatic BRCA-mutated ovarian cancer; talazoparib for gBRCAm HER2-negative advanced breast cancer; niraparib for recurrent gBRCAm ovarian cancer maintenance. BRACAnalysis CDx (Myriad) is the blood companion diagnostic on the FDA list for olaparib, talazoparib and rucaparib. A confirmed pathogenic constitutional result can inform cascade testing and risk-reduction discussions; these depend on the finding and the person's situation.",
    scoringRule: { text: "A pathogenic or likely pathogenic (deleterious or suspected deleterious) BRCA1 or BRCA2 variant detected in germline DNA from blood by sequencing and large rearrangement analysis.", quote: "deleterious or suspected deleterious gBRCAm human epidermal growth factor receptor 2 (HER2)-negative high risk early breast cancer", source: LABEL.lynparza, sourceLabel: "Lynparza prescribing information" },
    thresholds: [
      th({ value: "Deleterious or suspected deleterious gBRCAm", drugId: "olaparib", cancerId: "breast-cancer", regulator: "FDA", source: LABEL.lynparza, quote: "Lynparza is indicated for the adjuvant treatment of adult patients with deleterious or suspected deleterious gBRCA m human epidermal growth factor receptor 2 (HER2)-negative high risk early breast cancer who have been treated with neoadjuvant or adjuvant chemotherapy." }),
      th({ value: "Deleterious or suspected deleterious gBRCAm", drugId: "olaparib", cancerId: "pancreatic", regulator: "FDA", source: LABEL.lynparza, quote: "Lynparza is indicated for the maintenance treatment of adult patients with deleterious or suspected deleterious gBRCA m metastatic pancreatic adenocarcinoma whose disease has not progressed on at least 16 weeks of a first-line platinum-based chemotherapy regimen." }),
      th({ value: "Deleterious or suspected deleterious gBRCAm", drugId: "talazoparib", cancerId: "breast-cancer", regulator: "FDA", source: LABEL.talzenna, quote: "As a single agent, for the treatment of adult patients with deleterious or suspected deleterious germline BRCA -mutated (g BRCA m) HER2-negative locally advanced or metastatic breast cancer." }),
      th({ value: "Deleterious or suspected deleterious gBRCAmut", drugId: "niraparib", cancerId: "ovarian", regulator: "FDA", source: LABEL.zejula, quote: "ZEJULA is indicated for the maintenance treatment of adult patients with deleterious or suspected deleterious germline BRCA -mutated (g BRCA mut) recurrent epithelial ovarian, fallopian tube, or primary peritoneal cancer who are in a complete or partial response to platinum-based chemotherapy." }),
    ],
    cancers: ["breast-cancer", "tnbc", "breast-hr-positive", "ovarian", "high-grade-serous-ovarian-cancer", "pancreatic", "prostate-mcrpc"], drugs: ["olaparib", "talazoparib", "niraparib", "rucaparib", "bracanalysis-cdx"], tests: ["mychoice-cdx", "tempus-xt"], assays: ["bracanalysis-cdx"],
    companionDiagnostics: [
      cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories", "Breast Cancer - Whole Blood", ["olaparib"], "P140020/S012 (01/12/2018)", "myriad-genetics"),
      cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories", "Breast Cancer - Whole Blood", ["talazoparib"], "P140020/S015 (10/16/2018)", "myriad-genetics"),
      cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories", "Ovarian Cancer - Whole Blood", ["olaparib"], "P140020 (12/19/2014)", "myriad-genetics"),
      cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories", "Pancreatic Cancer - Whole Blood", ["olaparib"], "P140020/S019 (12/27/2019)", "myriad-genetics"),
      cdx("BRACAnalysis CDx", "Myriad Genetic Laboratories", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Whole Blood", ["olaparib"], "P140020/S020 (05/19/2020)", "myriad-genetics"),
    ],
    forPatient: "A harmful constitutional BRCA variant can raise cancer susceptibility and have implications for relatives. It may be inherited or arise newly. A tumour-only result needs separate assessment of its origin. Certain treatments use a BRCA result in specified cancer settings, but the result alone does not establish eligibility or a response. A variant of uncertain significance is not a positive pathogenic result.",
    terms: ["gbrca-mutation", "germline-vs-somatic", "hrd"], related: ["brca-somatic", "hrd-positive"], links: [{ label: "Lynparza prescribing information (DailyMed)", url: LABEL.lynparza }, { label: "Talzenna prescribing information (DailyMed)", url: LABEL.talzenna },
{
  "label": "Waks AG et al. (2020): Reversion and non-reversion mechanisms of resistance to PARP inhibitor or platinum chemotherapy in BRCA1/2-mutant metastatic breast cancer",
  "url": "https://pubmed.ncbi.nlm.nih.gov/32245699/"
},
{
  "label": "nci brca",
  "url": "https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet"
}
], tags: ["biomarker", "brca"] ,
"asOf": "2026-11-11",
"notes": [
  "A constitutional test and a tumour-function assay answer different questions. A BRCA result does not show whether repair remains impaired in a later tumour sample. In Waks and colleagues' selected series of eight patients with BRCA-altered metastatic breast cancer and acquired resistance, definite or putative reversion changes were found in four. This was a small resistance study, not an estimate of how often reversion occurs in everyone with a BRCA finding."
]
}),

  b({ id: "brca-somatic", name: "Tumour (somatic or germline) BRCA1/2 mutation and HRR gene alterations", aka: ["somatic BRCA", "sBRCA", "tumor BRCA", "tBRCA", "BRCAm", "BRCA-mutated", "HRR gene mutation", "HRRm", "homologous recombination repair gene alteration", "ATM mutation", "PALB2 mutation"],
    target: "brca", measurement: "sequencing-variant",
    tldr: "Tumour BRCA testing finds BRCA1/2 mutations in the cancer itself, whether inherited or acquired; wider panels add other repair genes such as ATM and PALB2. Ovarian and prostate cancer labels accept the tumour result for PARP inhibitors.",
    summary: "Sequencing tumour tissue or plasma DNA detects BRCA1/2 mutations regardless of origin (about a third of ovarian tumour BRCA mutations are somatic only) and, on larger panels, alterations in the homologous recombination repair genes. Olaparib is labelled for germline or somatic BRCA-mutated ovarian cancer (first-line and recurrent maintenance), for HRR gene-mutated metastatic castration-resistant prostate cancer after enzalutamide or abiraterone (PROfound; genes listed on the FoundationOne CDx claim), and with abiraterone for BRCA-mutated mCRPC; rucaparib for BRCA-mutated ovarian cancer and mCRPC from plasma; talazoparib with enzalutamide for HRR gene-mutated mCRPC, the label listing ATM, ATR, BRCA1, BRCA2, CDK12, CHEK2, FANCA, MLH1, MRE11A, NBN, PALB2 and RAD51C. FoundationOne CDx and Liquid CDx, FoundationFocus CDxBRCA and myChoice CDx carry the tumour claims.",
    scoringRule: { text: "A deleterious or suspected deleterious BRCA1 or BRCA2 mutation (germline and/or somatic) in tumour tissue or plasma; for the HRR indications, an alteration in one of the label's listed homologous recombination repair genes. A negative plasma result does not exclude a tumour mutation.", quote: "A negative result from a plasma specimen does not mean that the patient's tumor is negative for BRCA mutations.", source: LABEL.rubraca, sourceLabel: "Rubraca prescribing information" },
    thresholds: [
      th({ value: "Germline or somatic BRCA mutation", drugId: "olaparib", cancerId: "ovarian", regulator: "FDA", source: LABEL.lynparza, quote: "for the maintenance treatment of adult patients with deleterious or suspected deleterious germline or somatic BRCA -mutated advanced epithelial ovarian, fallopian tube or primary peritoneal cancer who are in complete or partial response to first-line platinum-based chemotherapy." }),
      th({ value: "Germline or somatic HRR gene mutation", drugId: "olaparib", cancerId: "prostate-mcrpc", regulator: "FDA", source: LABEL.lynparza, quote: "Lynparza is indicated for the treatment of adult patients with deleterious or suspected deleterious germline or somatic homologous recombination repair (HRR) gene-mutated metastatic castration-resistant prostate cancer (mCRPC) who have progressed following prior treatment with enzalutamide or abiraterone." }),
      th({ value: "BRCA mutation (germline and/or somatic)", drugId: "rucaparib", cancerId: "ovarian", regulator: "FDA", source: LABEL.rubraca, quote: "for the maintenance treatment of adult patients with a deleterious BRCA mutation (germline and/or somatic)-associated recurrent epithelial ovarian, fallopian tube, or primary peritoneal cancer who are in a complete or partial response to platinum-based chemotherapy." }),
      th({ value: "HRR gene alteration (ATM, ATR, BRCA1, BRCA2, CDK12, CHEK2, FANCA, MLH1, MRE11A, NBN, PALB2, RAD51C)", drugId: "talazoparib", cancerId: "prostate-mcrpc", regulator: "FDA", source: LABEL.talzenna, quote: "Select patients for the treatment of HRR gene-mutated mCRPC with TALZENNA based on the presence of alterations in genes directly or indirectly involved in HRR ( ATM , ATR , BRCA1 , BRCA2 , CDK12 , CHEK2 , FANCA , MLH1 , MRE11A , NBN , PALB2 , or RAD51C )" }),
    ],
    cancers: ["ovarian", "high-grade-serous-ovarian-cancer", "platinum-sensitive-ovarian-cancer", "prostate-mcrpc"], drugs: ["olaparib", "rucaparib", "talazoparib", "niraparib", "foundationone-cdx", "mychoice-cdx"], tests: ["tempus-xt", "caris-mi-cancer-seek", "trusight-oncology-comprehensive"], assays: ["foundationone-cdx-panel", "foundationone-liquid-cdx", "foundationfocus-brca", "mychoice-cdx"],
    companionDiagnostics: [
      cdx("FoundationOne CDx", "Foundation Medicine", "Ovarian Cancer - Tissue", ["olaparib"], "P170019/S004 (07/01/2019)", "foundation-medicine"),
      cdx("FoundationOne CDx", "Foundation Medicine", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Tissue (HRR genes)", ["olaparib"], "P170019/S015 (05/19/2020)", "foundation-medicine"),
      cdx("FoundationOne Liquid CDx", "Foundation Medicine", "Metastatic Castrate Resistant Prostate Cancer (mCRPC) - Plasma", ["rucaparib"], "P190032 (08/26/2020)", "foundation-medicine"),
      cdx("FoundationFocus CDxBRCA Assay", "Foundation Medicine", "Ovarian Cancer - Tissue", ["rucaparib"], "P160018 (12/19/2016)", "foundation-medicine"),
      cdx("FoundationOne CDx", "Foundation Medicine", "Metastatic Castrate Resistant Prostate cancer (mCRPC) - Tissue (HRR genes)", ["talazoparib", "enzalutamide"], "P170019/S060 (05/27/2026)", "foundation-medicine"),
    ],
    forPatient: "A BRCA mutation found in the tumour opens PARP inhibitor maintenance in ovarian cancer and PARP inhibitor treatment in advanced prostate cancer, whether or not the change is inherited; a follow-up blood test tells you whether it is, which matters for your family. In prostate cancer a wider list of repair genes also counts. If the tumour test was done on blood (ctDNA) and was negative, the labels say tissue should still be tested.",
    terms: ["hrd", "germline-vs-somatic", "brca-reversion-mutations", "ngs"], related: ["brca-germline", "hrd-positive"], links: [{ label: "Lynparza prescribing information (DailyMed)", url: LABEL.lynparza }, { label: "Rubraca prescribing information (DailyMed)", url: LABEL.rubraca }, { label: "Talzenna prescribing information (DailyMed)", url: LABEL.talzenna }], tags: ["biomarker", "brca"] }),

  b({ id: "hrd-positive", name: "HRD-positive (genomic instability score)", aka: ["HRD", "HRD-positive", "HRD positive", "homologous recombination deficiency", "genomic instability score", "GIS", "GIS >= 42", "myChoice HRD", "HRD score", "genomic scar"],
    target: "brca", measurement: "genomic-instability-score",
    tldr: "HRD-positive means the tumour's genome carries the scars of failed double-strand break repair (or a BRCA mutation), measured as a genomic instability score. In ovarian cancer it selects niraparib, and olaparib with bevacizumab, as first-line maintenance.",
    summary: "The Myriad myChoice CDx combines tumour BRCA1/2 status with a genomic instability score built from loss of heterozygosity, telomeric allelic imbalance and large-scale state transitions; the assay calls HRD-positive at a GIS of 42 or more (the PRIMA and PAOLA-1 trials' cut-off) or any deleterious BRCA mutation. Niraparib's US label defines HRD-positive status as 'a deleterious or suspected deleterious BRCA mutation, and/or genomic instability' and the olaparib plus bevacizumab first-line maintenance indication is for HRD-positive advanced ovarian cancer. Because the scar accumulates over time, HRD status is read on tumour tissue and does not capture reversion, which is why HRD-positive tumours can still be PARP-resistant.",
    scoringRule: { text: "HRD-positive: a deleterious or suspected deleterious tumour BRCA1/2 mutation, or a genomic instability score at or above the assay's cut-off (42 on the myChoice CDx), computed from loss of heterozygosity, telomeric allelic imbalance and large-scale state transitions.", quote: "Deleterious or suspected deleterious germline or somatic mutations in BRCA1 and BRCA2 genes and/or positive Genomic Instability Score", source: FDA_CDX_URL, sourceLabel: FDA_CDX_LABEL },
    thresholds: [
      th({ value: "HRD-positive (BRCA mutation and/or genomic instability)", drugId: "niraparib", cancerId: "ovarian", regulator: "FDA", source: LABEL.zejula, quote: "for the maintenance treatment of adult patients with advanced epithelial ovarian, fallopian tube, or primary peritoneal cancer who are in a complete or partial response to first-line platinum-based chemotherapy and whose cancer is associated with homologous recombination deficiency (HRD)-positive status defined by either: o a deleterious or suspected deleterious BRCA mutation, and/or o genomic instability" }),
      th({ value: "HRD-positive", drugId: "olaparib", cancerId: "ovarian", regulator: "FDA", source: LABEL.lynparza, quote: "First-line Maintenance Treatment of HRD-positive Advanced Ovarian Cancer in Combination with Bevacizumab Lynparza is indicated in combination with bevacizumab for the maintenance treatment of adult patients with advanced epithelial ovarian, fallopian tube or primary peritoneal cancer who are in complete or partial response to first-line platinum-based chemotherapy" }),
    ],
    cancers: ["ovarian", "high-grade-serous-ovarian-cancer"], drugs: ["niraparib", "olaparib", "bevacizumab", "mychoice-cdx"], tests: ["caris-mi-profile", "tempus-xt"], assays: ["mychoice-cdx"],
    companionDiagnostics: [
      cdx("Myriad myChoice CDx", "Myriad Genetic Laboratories", "Ovarian Cancer - Tissue", ["olaparib"], "P190014/S003 (05/08/2020)", "myriad-genetics"),
      cdx("Myriad myChoice CDx", "Myriad Genetic Laboratories", "Ovarian Cancer - Tissue", ["niraparib"], "P190014/S011 (03/10/2026)", "myriad-genetics"),
    ],
    forPatient: "HRD-positive on a myChoice report (a BRCA mutation or a genomic instability score of 42 or more) means your ovarian cancer is likely to respond to PARP inhibitors: niraparib alone, or olaparib with bevacizumab, are on label as maintenance after first chemotherapy. An HRD-negative result does not rule out niraparib, whose first-line label covers all comers, but the expected benefit is smaller.",
    terms: ["hrd", "platinum-sensitivity"], related: ["brca-somatic", "brca-germline"], links: [{ label: "ZEJULA prescribing information (DailyMed)", url: LABEL.zejula }, { label: "Lynparza prescribing information (DailyMed)", url: LABEL.lynparza }], tags: ["biomarker", "brca", "genome-wide"] }),
];
