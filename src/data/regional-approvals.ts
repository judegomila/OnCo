/**
 * Regulatory status of approved and late-stage products across six regions.
 *
 *   US = FDA · EU = European Commission on EMA opinion · UK = MHRA · JP = PMDA/MHLW · CN = NMPA · AU = TGA
 *
 * Rules: a region is recorded only when the status can be traced to a regulator page, an EPAR, a company
 * release, or the corpus' own sourced approvals. Absent = unknown/not researched, NOT "not approved".
 * `year` is the year of the first approval in that region for any oncology indication. EU EPAR pages
 * checked directly are marked `verified` and carry `verifiedOn` = EPAR_CHECKED, the date of the last check;
 * scripts/fetch-ema.ts re-checks every EU row against the EMA register weekly and moves the stamp forward when
 * all rows agree (per-row results in public/regional/verified.json). Other rows carry regulator search links.
 * "not-filed" is used only where a sponsor has publicly said so or where a product is regionally
 * exclusive by design (e.g. China-only PD-1 antibodies without ex-China filings).
 */
export type Region = "US" | "EU" | "UK" | "JP" | "CN" | "AU";
export const REGIONS: Region[] = ["US", "EU", "UK", "JP", "CN", "AU"];
export const REGION_META: Record<Region, { label: string; regulator: string; url: string; flag: string }> = {
  US: { label: "United States", regulator: "FDA", url: "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancer-hematologic-malignancies-approval-notifications", flag: "🇺🇸" },
  EU: { label: "European Union", regulator: "EMA / European Commission", url: "https://www.ema.europa.eu/en/medicines", flag: "🇪🇺" },
  UK: { label: "United Kingdom", regulator: "MHRA (NICE for reimbursement)", url: "https://products.mhra.gov.uk/", flag: "🇬🇧" },
  JP: { label: "Japan", regulator: "PMDA / MHLW", url: "https://www.pmda.go.jp/english/review-services/reviews/approved-information/drugs/0002.html", flag: "🇯🇵" },
  CN: { label: "China", regulator: "NMPA", url: "https://english.nmpa.gov.cn/", flag: "🇨🇳" },
  AU: { label: "Australia", regulator: "TGA (PBS for reimbursement)", url: "https://www.tga.gov.au/resources/artg", flag: "🇦🇺" },
};

export type RegionalStatus = "approved" | "conditional" | "under-review" | "not-filed" | "withdrawn" | "rejected";
export type RegionalEntry = { status: RegionalStatus; year?: number; indication?: string; source?: string; note?: string; verified?: boolean; /** ISO date of the last check against the regulator (EU rows: the EMA register). */ verifiedOn?: string };

/** Date the EU rows marked V() were last checked against the EMA register. Updated by scripts/fetch-ema.ts. */
export const EPAR_CHECKED = "2026-09-08";
export type RegionalRow = Partial<Record<Region, RegionalEntry>>;

const epar = (slug: string) => `https://www.ema.europa.eu/en/medicines/human/EPAR/${slug}`;
const mhra = (brand: string) => `https://products.mhra.gov.uk/?search=${encodeURIComponent(brand)}`;
const tga = (brand: string) => `https://www.tga.gov.au/resources/artg?search_api_views_fulltext=${encodeURIComponent(brand)}`;
const PMDA = REGION_META.JP.url;
const NMPA = REGION_META.CN.url;

const A = (year?: number, source?: string, indication?: string, note?: string): RegionalEntry => ({ status: "approved", year, source, indication, note });
const C = (year?: number, source?: string, indication?: string, note?: string): RegionalEntry => ({ status: "conditional", year, source, indication, note });
const V = (e: RegionalEntry): RegionalEntry => ({ ...e, verified: true, verifiedOn: EPAR_CHECKED });
const NF = (note?: string): RegionalEntry => ({ status: "not-filed", note });
const W = (year?: number, source?: string, note?: string): RegionalEntry => ({ status: "withdrawn", year, source, note });
const UR = (note?: string, source?: string): RegionalEntry => ({ status: "under-review", note, source });

/** Six-region row for a long-established global product (approved everywhere, first years by region). */
function global(brand: string, slug: string, us: number, eu: number, uk: number, jp: number, cn: number, au: number, note?: string): RegionalRow {
  return { US: A(us, undefined, undefined, note), EU: A(eu, epar(slug)), UK: A(uk, mhra(brand)), JP: A(jp, PMDA), CN: A(cn, NMPA), AU: A(au, tga(brand)) };
}

export const regionalApprovals: Record<string, RegionalRow> = {
  // ================= ADCs =================
  "trastuzumab-deruxtecan": global("Enhertu", "enhertu", 2019, 2021, 2021, 2020, 2023, 2022, "HER2+ then HER2-low; EU/UK HER2-low 2023; China HER2+ breast Feb 2023"),
  "sacituzumab-govitecan": { US: A(2020), EU: A(2021, epar("trodelvy"), "mTNBC ≥2 lines; HR+ 2023"), UK: A(2021, mhra("Trodelvy")), JP: A(2024, PMDA, "TNBC (Daiichi Sankyo licence)"), CN: A(2022, NMPA, "mTNBC (Everest Medicines)"), AU: A(2022, tga("Trodelvy")) },
  "datopotamab-deruxtecan": { US: A(2025), EU: V(A(2025, epar("datroway"), "HR+/HER2- mBC after endocrine + chemo; 4 Apr 2025")), UK: A(2025, mhra("Datroway")), JP: A(2025, PMDA, "HR+/HER2- breast (first global approval, Mar 2025)"), CN: UR("Filed for HR+/HER2- breast; not yet approved as of Sept 2026"), AU: UR("Under TGA evaluation") },
  "sacituzumab-tirumotecan": { US: UR("BLA planned after TroFuse phase 3; Commissioner's National Priority Voucher July 2026"), EU: NF("No MAA announced as of Sept 2026"), CN: A(2024, NMPA, "Pretreated TNBC (Nov 2024); EGFR-mutant NSCLC after TKI (Mar 2025)") },
  "trastuzumab-emtansine": global("Kadcyla", "kadcyla", 2013, 2013, 2013, 2013, 2020, 2013),
  "enfortumab-vedotin": { US: A(2019), EU: A(2022, epar("padcev"), "mUC after platinum + PD-1; 1L with pembrolizumab 2024"), UK: A(2022, mhra("Padcev")), JP: A(2021, PMDA), CN: UR("Filed by Astellas; bridging study ongoing"), AU: A(2023, tga("Padcev")) },
  "brentuximab-vedotin": global("Adcetris", "adcetris", 2011, 2012, 2012, 2014, 2020, 2013),
  "polatuzumab-vedotin": global("Polivy", "polivy", 2019, 2020, 2020, 2021, 2023, 2020),
  "mirvetuximab-soravtansine": { US: A(2022), EU: V(A(2024, epar("elahere"), "FRα+ platinum-resistant ovarian; 14 Nov 2024")), UK: A(2025, mhra("Elahere")), JP: UR("PMDA filing 2025"), CN: NF("Hansoh licence; NDA status not public"), AU: UR("Under TGA evaluation") },
  "tisotumab-vedotin": { US: A(2021), EU: V(A(2025, epar("tivdak"), "Recurrent/metastatic cervical after systemic therapy; 28 Mar 2025")), UK: A(2025, mhra("Tivdak")), JP: A(2024, PMDA, "Genmab Japan; cervical cancer") },
  "telisotuzumab-vedotin": { US: A(2025, undefined, "c-MET-high NSCLC (accelerated)"), EU: UR("MAA submitted 2025") },
  zynlonta: { US: A(2021), EU: A(2022, epar("zynlonta"), "R/R DLBCL ≥2 lines (conditional)"), UK: A(2023, mhra("Zynlonta")), CN: A(2025, NMPA, "Overland ADCT licence") },
  "gemtuzumab-ozogamicin": { US: A(2000, undefined, "Withdrawn 2010, re-approved 2017"), EU: A(2018, epar("mylotarg")), UK: A(2018, mhra("Mylotarg")), JP: A(2005, PMDA), AU: A(2020, tga("Mylotarg")) },
  "belantamab-mafodotin": { US: A(2020, undefined, "Withdrawn 2022; re-approved Oct 2025 in combination"), EU: V(A(2025, epar("blenrep"), "R/R myeloma with BorDex or PomDex; 23 Jul 2025")), UK: A(2025, mhra("Blenrep"), "First re-approval globally (MHRA Apr 2025)"), JP: A(2025, PMDA), CN: A(2025, NMPA), AU: UR("TGA evaluation") },
  "inotuzumab-ozogamicin": global("Besponsa", "besponsa", 2017, 2017, 2017, 2018, 2021, 2018),
  "disitamab-vedotin": { US: NF("Pfizer (ex-China) running global phase 3 trials; no US filing yet"), CN: A(2021, NMPA, "HER2+ gastric (Jun 2021); HER2-expressing urothelial (Dec 2021)") },
  "izalontamab-brengitecan": { US: UR("BMS global development; no BLA as of Sept 2026"), CN: UR("NDA for pretreated TNBC and ESCC under NMPA priority review 2026") },
  "trastuzumab-rezetecan": { CN: A(2025, NMPA, "HER2-mutant NSCLC; HER2+ breast (Hengrui)") },
  "patritumab-deruxtecan": { US: W(2025, undefined, "BLA withdrawn May 2025 after CRL (manufacturing) and HERTHENA-Lung02 OS miss") },
  "raludotatug-deruxtecan": { US: UR("Phase 3 REJOICE-Ovarian01 ongoing") },
  "ifinatamab-deruxtecan": { US: UR("Breakthrough designation; IDeate-Lung02 phase 3 ongoing") },
  "zilovertamab-vedotin": { US: UR("Phase 3 waveLINE-003 ongoing") },
  cmg901: { US: UR("Phase 3 CLARITY-Gastric01 ongoing"), CN: UR("Phase 3 in China") },
  arx788: { CN: UR("NDA accepted for HER2+ breast cancer (NovoCodex)") },
  "trastuzumab-brengitecan": { CN: UR("Phase 3 in HER2+ breast cancer") },
  "luveltamab-tazevibulin": { US: UR("Phase 2/3 REFRaME-O1") },
  "rinatabart-sesutecan": { US: UR("Phase 3 RAINFOL-01") },

  // ================= Checkpoint inhibitors =================
  pembrolizumab: global("Keytruda", "keytruda", 2014, 2015, 2015, 2016, 2018, 2015),
  nivolumab: global("Opdivo", "opdivo", 2014, 2015, 2015, 2014, 2018, 2016, "Japan first (melanoma, July 2014)"),
  ipilimumab: global("Yervoy", "yervoy", 2011, 2011, 2011, 2015, 2021, 2011),
  atezolizumab: global("Tecentriq", "tecentriq", 2016, 2017, 2017, 2018, 2020, 2017),
  durvalumab: global("Imfinzi", "imfinzi", 2017, 2018, 2018, 2018, 2019, 2018),
  avelumab: global("Bavencio", "bavencio", 2017, 2017, 2017, 2017, 2020, 2018),
  cemiplimab: { US: A(2018), EU: A(2019, epar("libtayo")), UK: A(2019, mhra("Libtayo")), JP: A(2024, PMDA), AU: A(2020, tga("Libtayo")) },
  dostarlimab: { US: A(2021), EU: A(2021, epar("jemperli")), UK: A(2021, mhra("Jemperli")), AU: A(2023, tga("Jemperli")) },
  tremelimumab: { US: A(2022), EU: A(2023, epar("imjudo")), UK: A(2023, mhra("Imjudo")), JP: A(2022, PMDA), AU: A(2023, tga("Imjudo")) },
  "relatlimab-nivolumab": { US: A(2022), EU: A(2022, epar("opdualag"), "Melanoma, PD-L1 <1% restriction"), UK: A(2023, mhra("Opdualag")), AU: A(2023, tga("Opdualag")) },
  tislelizumab: { US: A(2024, undefined, "ESCC 2L (Mar 2024); 1L ESCC and gastric 2024-25"), EU: A(2023, epar("tevimbra")), UK: A(2024, mhra("Tevimbra")), JP: A(2025, PMDA), CN: A(2019, NMPA, "First approval: cHL, Dec 2019"), AU: A(2024, tga("Tevimbra")) },
  toripalimab: { US: A(2023, undefined, "Nasopharyngeal carcinoma (first PD-1 for NPC)"), EU: A(2024, epar("loqtorzi")), UK: A(2025, mhra("Loqtorzi")), CN: A(2018, NMPA, "Melanoma (Dec 2018); 10+ indications"), AU: A(2025, tga("Loqtorzi")) },
  serplulimab: { US: UR("BLA for ES-SCLC; bridging trial ASTRIDE"), EU: A(2025, epar("hetronifly"), "ES-SCLC with chemotherapy"), UK: A(2025, mhra("Hetronifly")), CN: A(2022, NMPA, "MSI-H solid tumours (Mar 2022); ES-SCLC") },
  camrelizumab: { US: UR("CRLs May 2024, Mar 2025 (with rivoceranib, HCC); resubmission"), CN: A(2019, NMPA, "cHL (May 2019); multiple indications"), EU: NF() },
  "camrelizumab-rivoceranib": { US: UR("Third CRL 23 Jul 2026 for 1L HCC"), CN: A(2023, NMPA, "1L unresectable HCC (Jan 2023)") },
  cadonilimab: { US: NF("Akeso has not filed ex-China"), CN: A(2022, NMPA, "Recurrent/metastatic cervical (Jun 2022); 1L gastric (Sep 2024)") },
  ivonescimab: { US: UR("Summit BLA for EGFR-mutant NSCLC post-TKI; PDUFA Nov 2026 (HARMONi-3 interim PFS miss noted)"), EU: NF("No MAA announced"), CN: A(2024, NMPA, "EGFR-mutant NSCLC after TKI (May 2024); 1L PD-L1+ NSCLC (Apr 2025)") },
  fianlimab: { US: UR("Phase 3 in melanoma missed primary endpoint 2026") },

  // ================= Bispecifics / T-cell engagers =================
  blinatumomab: global("Blincyto", "blincyto", 2014, 2015, 2015, 2018, 2020, 2016),
  teclistamab: { US: A(2022), EU: C(2022, epar("tecvayli"), "R/R myeloma ≥3 lines (conditional, Aug 2022)"), UK: A(2022, mhra("Tecvayli")), JP: A(2024, PMDA), CN: A(2025, NMPA), AU: A(2024, tga("Tecvayli")) },
  elranatamab: { US: A(2023), EU: C(2023, epar("elrexfio")), UK: A(2024, mhra("Elrexfio")), JP: A(2024, PMDA), AU: A(2024, tga("Elrexfio")) },
  talquetamab: { US: A(2023), EU: C(2023, epar("talvey")), UK: A(2024, mhra("Talvey")), JP: A(2025, PMDA), AU: A(2024, tga("Talvey")) },
  linvoseltamab: { US: A(2025), EU: V(C(2025, epar("lynozyfic"), "R/R myeloma ≥3 lines; 23 Apr 2025 (conditional)")), UK: A(2025, mhra("Lynozyfic")) },
  glofitamab: { US: A(2023, undefined, "Accelerated; STARGLO CRL Jul 2025"), EU: C(2023, epar("columvi")), UK: A(2023, mhra("Columvi")), JP: A(2024, PMDA), CN: A(2024, NMPA), AU: A(2024, tga("Columvi")) },
  epcoritamab: { US: A(2023), EU: C(2023, epar("tepkinly"), "EU brand Tepkinly"), UK: A(2023, mhra("Tepkinly")), JP: A(2023, PMDA, "Epkinly; DLBCL"), AU: A(2024, tga("Tepkinly")) },
  mosunetuzumab: { US: A(2022), EU: C(2022, epar("lunsumio")), UK: A(2022, mhra("Lunsumio")), JP: A(2024, PMDA), AU: A(2023, tga("Lunsumio")) },
  odronextamab: { US: A(2025, undefined, "CRL Mar 2024; approved Jul 2025"), EU: C(2024, epar("ordspono"), "EU brand Ordspono; FL and DLBCL ≥2 lines"), UK: A(2025, mhra("Ordspono")) },
  tarlatamab: { US: A(2024, undefined, "Accelerated May 2024; full approval Dec 2025"), EU: UR("MAA under CHMP review; no EPAR as of Sept 2026"), JP: A(2025, PMDA, "ES-SCLC after platinum"), AU: UR("TGA evaluation") },
  tebentafusp: { US: A(2022), EU: A(2022, epar("kimmtrak")), UK: A(2022, mhra("Kimmtrak")), AU: A(2023, tga("Kimmtrak")), JP: UR("PMDA filing 2025") },
  amivantamab: { US: A(2021), EU: A(2021, epar("rybrevant"), "Exon 20; 1L with lazertinib Jan 2025"), UK: A(2022, mhra("Rybrevant")), JP: A(2024, PMDA), CN: A(2024, NMPA, "Exon 20 insertion NSCLC"), AU: A(2023, tga("Rybrevant")) },
  zanidatamab: { US: A(2024), EU: V(C(2025, epar("ziihera"), "HER2+ biliary tract after ≥1 line; 27 Jun 2025 (conditional)")), UK: A(2025, mhra("Ziihera")), CN: A(2025, NMPA, "BeOne; HER2+ BTC") },
  zenocutuzumab: { US: A(2024), EU: UR("MAA submitted 2025; no EPAR as of Sept 2026") },
  brenetafusp: { US: UR("Phase 3 PRISM-MEL-301") },
  xaluritamig: { US: UR("Phase 3 XALute") },
  pasritamig: { US: UR("Phase 3 in mCRPC") },
  petosemtamab: { US: UR("Phase 3 LiGeR-HN1/2") },
  "ficerafusp-alfa": { US: UR("Phase 3 FORTIFI-HN01") },
  bemarituzumab: { US: UR("FORTITUDE-101 positive on OS 2025; BLA expected"), CN: UR("Zai Lab NDA") },

  // ================= Cell therapies =================
  tisagenlecleucel: { US: A(2017), EU: A(2018, epar("kymriah")), UK: A(2018, mhra("Kymriah")), JP: A(2019, PMDA, "First CAR-T in Japan"), CN: NF("Novartis has not filed in China"), AU: A(2018, tga("Kymriah")) },
  "axicabtagene-ciloleucel": { US: A(2017), EU: A(2018, epar("yescarta")), UK: A(2018, mhra("Yescarta")), JP: A(2021, PMDA, "Daiichi Sankyo"), CN: A(2021, NMPA, "Fosun Kite; first CAR-T approved in China (Jun 2021)"), AU: A(2019, tga("Yescarta")) },
  "lisocabtagene-maraleucel": { US: A(2021), EU: A(2022, epar("breyanzi")), UK: A(2022, mhra("Breyanzi")), JP: A(2021, PMDA), AU: A(2022, tga("Breyanzi")) },
  "idecabtagene-vicleucel": { US: A(2021), EU: A(2021, epar("abecma")), UK: A(2021, mhra("Abecma")), JP: A(2022, PMDA), AU: A(2022, tga("Abecma")) },
  "ciltacabtagene-autoleucel": { US: A(2022), EU: A(2022, epar("carvykti")), UK: A(2022, mhra("Carvykti")), JP: A(2022, PMDA), CN: A(2024, NMPA, "Legend Biotech; R/R myeloma"), AU: A(2023, tga("Carvykti")) },
  "obecabtagene-autoleucel": { US: A(2024), EU: V(C(2025, epar("aucatzyl"), "R/R B-ALL adults ≥26; 17 Jul 2025 (conditional)")), UK: A(2025, mhra("Aucatzyl")) },
  lifileucel: { US: A(2024, undefined, "Accelerated Feb 2024"), EU: W(2025, epar("amtagvi"), "MAA withdrawn 22 Jul 2025 after CHMP signalled a negative opinion (response rate, deaths, manufacturing)"), UK: UR("MHRA application 2025"), CN: NF(), AU: UR("TGA evaluation") },
  "afamitresgene-autoleucel": { US: A(2024, undefined, "Accelerated Aug 2024; full approval Jun 2026"), EU: NF("No MAA; US WorldMeds acquired US rights 2025") },
  "satricabtagene-autoleucel": { US: UR("US phase 1b/2 (CARsgen)"), CN: A(2025, NMPA, "CLDN18.2+ advanced gastric/GEJ after ≥2 lines (Sep 2025); first CAR-T for a solid tumour") },
  "anitocabtagene-autoleucel": { US: UR("BLA accepted; PDUFA 27 Dec 2026") },
  "dcvax-l": { UK: UR("MHRA application under review since 2023; no decision published"), US: NF("No BLA") },

  // ================= Radiopharmaceuticals and imaging =================
  pluvicto: { US: A(2022), EU: A(2022, epar("pluvicto"), "mCRPC post-ARPI and taxane; pre-chemo 2025"), UK: A(2023, mhra("Pluvicto")), JP: A(2025, PMDA, "PSMA+ mCRPC (Mar 2025)"), CN: UR("NMPA review; Novartis China"), AU: A(2023, tga("Pluvicto")) },
  lutathera: { US: A(2018), EU: A(2017, epar("lutathera"), "First approval globally (Sep 2017)"), UK: A(2018, mhra("Lutathera")), JP: A(2021, PMDA), CN: A(2024, NMPA), AU: A(2018, tga("Lutathera")) },
  "radium-223": global("Xofigo", "xofigo", 2013, 2013, 2013, 2016, 2020, 2014),
  pylarify: { US: A(2021), EU: A(2023, epar("pylclari"), "EU brand Pylclari (Curium)"), UK: A(2023, mhra("Pylclari")) },
  "ga68-psma-11": { US: A(2020, undefined, "UCSF/UCLA Ga-68 PSMA-11 Dec 2020; Illuccix, Locametz 2021-22"), EU: A(2022, epar("locametz")), UK: A(2022, mhra("Locametz")), AU: A(2021, tga("Illuccix"), "Illuccix (Telix) first approval globally (Nov 2021)") },
  flotufolastat: { US: A(2023), EU: UR("MAA (Blue Earth Diagnostics)") },
  "radioactive-iodine": global("Sodium iodide I-131", "sodium-iodide-131", 1951, 1990, 1990, 1990, 1990, 1990, "Legacy product; national approvals predate modern registers"),
  "lu177-psma-it": { US: UR("SPLASH phase 3 met rPFS, missed OS; BLA decision pending"), EU: UR("ECLIPSE/SPLASH; no MAA decision") },
  "ac225-psma": { US: UR("Phase 3 AcTION / AlphaBreak / PAnTHA") },
  ryz101: { US: UR("Phase 3 ACTION-1") },
  "itm-11": { US: UR("PDUFA 28 Aug 2026 (COMPETE); decision not yet in corpus"), EU: UR("MAA 2026") },

  // ================= Kinase and small-molecule targeted =================
  osimertinib: global("Tagrisso", "tagrisso", 2015, 2016, 2016, 2016, 2017, 2016),
  lorlatinib: global("Lorbrena", "lorviqua", 2018, 2019, 2019, 2018, 2022, 2019, "EU brand Lorviqua"),
  alectinib: global("Alecensa", "alecensa", 2015, 2017, 2017, 2014, 2018, 2016, "Japan first (Jul 2014)"),
  neladalkib: { US: UR("PDUFA 27 Nov 2026 (ALKOVE-1)") },
  lazertinib: { US: A(2024), EU: V(A(2025, epar("lazcluze"), "1L EGFR-mutant NSCLC with amivantamab; 20 Jan 2025")), UK: A(2025, mhra("Lazcluze")), JP: A(2025, PMDA), CN: A(2025, NMPA) },
  sotorasib: { US: A(2021, undefined, "Accelerated; CRL Dec 2023 for full approval; CRC with panitumumab Jan 2025"), EU: C(2022, epar("lumykras"), "EU brand Lumykras"), UK: A(2021, mhra("Lumykras"), "MHRA Project Orbis first"), JP: A(2022, PMDA), CN: NF("Amgen has not filed in China"), AU: A(2022, tga("Lumykras")) },
  adagrasib: { US: A(2022), EU: V(C(2024, epar("krazati"), "KRAS G12C NSCLC after ≥1 line; 5 Jan 2024 (conditional)")), UK: A(2024, mhra("Krazati")), JP: UR("PMDA filing"), AU: A(2024, tga("Krazati")) },
  divarasib: { US: UR("Phase 3 Krascendo 1 topline Jul 2026") },
  olomorasib: { US: UR("Phase 3 SUNRAY-01") },
  daraxonrasib: { US: UR("RASolute 302 positive; NDA expected late 2026") },
  encorafenib: { US: A(2018), EU: A(2018, epar("braftovi")), UK: A(2018, mhra("Braftovi")), JP: A(2019, PMDA), CN: A(2023, NMPA), AU: A(2019, tga("Braftovi")) },
  binimetinib: { US: A(2018), EU: A(2018, epar("mektovi")), UK: A(2018, mhra("Mektovi")), JP: A(2019, PMDA), AU: A(2019, tga("Mektovi")) },
  "dabrafenib-trametinib": global("Tafinlar + Mekinist", "tafinlar", 2013, 2013, 2013, 2016, 2019, 2013, "Tumour-agnostic BRAF V600E label US 2022"),
  vemurafenib: global("Zelboraf", "zelboraf", 2011, 2012, 2012, 2014, 2017, 2012),
  cobimetinib: { US: A(2015), EU: A(2015, epar("cotellic")), UK: A(2015, mhra("Cotellic")), JP: A(2018, PMDA), AU: A(2016, tga("Cotellic")) },
  selpercatinib: { US: A(2020), EU: A(2021, epar("retsevmo"), "EU brand Retsevmo"), UK: A(2021, mhra("Retsevmo")), JP: A(2021, PMDA), CN: A(2022, NMPA), AU: A(2021, tga("Retsevmo")) },
  pralsetinib: { US: A(2020), EU: A(2021, epar("gavreto")), UK: A(2021, mhra("Gavreto")), CN: A(2021, NMPA, "CStone"), AU: A(2022, tga("Gavreto")) },
  "capmatinib-tepotinib": { US: A(2020), EU: A(2022, epar("tepmetko"), "Tepmetko 2022; Tabrecta 2022"), UK: A(2022, mhra("Tepmetko")), JP: A(2020, PMDA, "Tepotinib first approval globally (Mar 2020)"), CN: A(2023, NMPA), AU: A(2021, tga("Tabrecta")) },
  zongertinib: { US: A(2025), EU: UR("MAA under review; no EPAR as of Sept 2026"), CN: A(2025, NMPA, "HER2-mutant NSCLC") },
  sevabertinib: { US: A(2025), EU: UR("MAA 2026") },
  zidesamtinib: { US: A(2026), EU: UR("MAA planned") },
  repotrectinib: { US: A(2023), EU: V(C(2025, epar("augtyro"), "ROS1+ NSCLC; NTRK+ solid tumours; 13 Jan 2025 (conditional)")), UK: A(2025, mhra("Augtyro")), JP: A(2024, PMDA), CN: A(2025, NMPA) },
  tucatinib: { US: A(2020), EU: A(2021, epar("tukysa")), UK: A(2021, mhra("Tukysa")), CN: A(2023, NMPA), AU: A(2021, tga("Tukysa")) },
  neratinib: { US: A(2017), EU: A(2018, epar("nerlynx")), UK: A(2018, mhra("Nerlynx")), AU: A(2019, tga("Nerlynx")) },
  lapatinib: global("Tykerb", "tyverb", 2007, 2008, 2008, 2009, 2013, 2007, "EU brand Tyverb"),
  pyrotinib: { CN: A(2018, NMPA, "HER2+ metastatic breast (Aug 2018)"), US: NF("Hengrui; no US filing") },
  imatinib: global("Gleevec", "glivec", 2001, 2001, 2001, 2001, 2002, 2001, "EU brand Glivec"),
  dasatinib: global("Sprycel", "sprycel", 2006, 2006, 2006, 2009, 2011, 2007),
  ponatinib: { US: A(2012), EU: A(2013, epar("iclusig")), UK: A(2013, mhra("Iclusig")), JP: A(2016, PMDA), AU: A(2015, tga("Iclusig")) },
  asciminib: { US: A(2021), EU: A(2022, epar("scemblix")), UK: A(2022, mhra("Scemblix")), JP: A(2022, PMDA), CN: A(2023, NMPA), AU: A(2022, tga("Scemblix")) },
  ibrutinib: global("Imbruvica", "imbruvica", 2013, 2014, 2014, 2016, 2017, 2015),
  acalabrutinib: { US: A(2017), EU: A(2020, epar("calquence")), UK: A(2020, mhra("Calquence")), JP: A(2021, PMDA), CN: A(2023, NMPA), AU: A(2020, tga("Calquence")) },
  zanubrutinib: { US: A(2019), EU: A(2021, epar("brukinsa")), UK: A(2021, mhra("Brukinsa")), JP: A(2021, PMDA), CN: A(2020, NMPA), AU: A(2020, tga("Brukinsa")) },
  pirtobrutinib: { US: A(2023), EU: C(2023, epar("jaypirca")), UK: A(2024, mhra("Jaypirca")), JP: A(2025, PMDA) },
  nemtabrutinib: { US: UR("Phase 3 BELLWAVE-011") },
  "bgb-16673": { US: UR("Phase 3 CaDAnCe-304") },
  venetoclax: global("Venclexta", "venclyxto", 2016, 2016, 2016, 2019, 2020, 2017, "EU brand Venclyxto"),
  sonrotoclax: { US: A(2026, undefined, "Accelerated, MCL (May 2026)"), CN: A(2025, NMPA, "R/R MCL") },
  midostaurin: global("Rydapt", "rydapt", 2017, 2017, 2017, 2019, 2021, 2017),
  gilteritinib: { US: A(2018), EU: A(2019, epar("xospata")), UK: A(2019, mhra("Xospata")), JP: A(2018, PMDA, "First approval globally (Sep 2018)"), CN: A(2021, NMPA), AU: A(2019, tga("Xospata")) },
  quizartinib: { US: A(2023, undefined, "CRL 2019; approved Jul 2023"), EU: A(2023, epar("vanflyta")), UK: A(2024, mhra("Vanflyta")), JP: A(2019, PMDA, "First approval globally (Jun 2019)"), CN: A(2025, NMPA) },
  ivosidenib: { US: A(2018), EU: A(2023, epar("tibsovo")), UK: A(2023, mhra("Tibsovo")), CN: A(2022, NMPA, "CStone"), AU: A(2023, tga("Tibsovo")) },
  enasidenib: { US: A(2017), EU: W(2021, undefined, "MAA withdrawn 2021"), CN: NF() },
  olutasidenib: { US: A(2022), EU: UR("MAA (Rigel)") },
  vorasidenib: { US: A(2024), EU: V(A(2025, epar("voranigo"), "Grade 2 IDH-mutant glioma ≥12 yrs; 17 Sep 2025")), UK: A(2025, mhra("Voranigo")), JP: UR("PMDA filing 2025"), AU: A(2025, tga("Voranigo")) },
  revumenib: { US: A(2024), EU: UR("MAA submitted 2025; no EPAR as of Sept 2026") },
  ziftomenib: { US: A(2025), EU: UR("Kura/Kyowa Kirin MAA") },
  azacitidine: global("Vidaza", "vidaza", 2004, 2008, 2008, 2011, 2017, 2009),
  "decitabine-cedazuridine": { US: A(2020), EU: A(2023, epar("inaqovi"), "EU brand Inaqovi"), UK: A(2023, mhra("Inaqovi")), AU: A(2022, tga("Inqovi")) },
  "cpx-351": { US: A(2017), EU: A(2018, epar("vyxeos-liposomal")), UK: A(2018, mhra("Vyxeos")), JP: A(2024, PMDA), AU: A(2021, tga("Vyxeos")) },
  tagraxofusp: { US: A(2018), EU: A(2021, epar("elzonris")), UK: A(2021, mhra("Elzonris")) },
  palbociclib: global("Ibrance", "ibrance", 2015, 2016, 2016, 2017, 2018, 2017),
  ribociclib: global("Kisqali", "kisqali", 2017, 2017, 2017, 2019, 2023, 2017),
  abemaciclib: global("Verzenio", "verzenios", 2017, 2018, 2018, 2018, 2020, 2019, "EU brand Verzenios"),
  atirmociclib: { US: UR("Phase 3 FOURLIGHT-3") },
  alpelisib: { US: A(2019), EU: A(2020, epar("piqray")), UK: A(2020, mhra("Piqray")), JP: A(2022, PMDA), CN: A(2024, NMPA), AU: A(2020, tga("Piqray")) },
  capivasertib: { US: A(2023), EU: V(A(2024, epar("truqap"), "ER+/HER2- mBC with PIK3CA/AKT1/PTEN alteration; 17 Jun 2024")), UK: A(2024, mhra("Truqap")), JP: A(2024, PMDA), CN: A(2025, NMPA), AU: A(2024, tga("Truqap")) },
  inavolisib: { US: A(2024), EU: V(A(2025, epar("itovebi"), "PIK3CA-mutant ER+/HER2- mBC with palbociclib + fulvestrant; 18 Jul 2025")), UK: A(2025, mhra("Itovebi")), JP: A(2025, PMDA), CN: A(2025, NMPA), AU: UR("TGA evaluation") },
  gedatolisib: { US: A(2026), EU: UR("MAA planned") },
  everolimus: global("Afinitor", "afinitor", 2009, 2009, 2009, 2010, 2013, 2009),
  olaparib: global("Lynparza", "lynparza", 2014, 2014, 2014, 2018, 2018, 2016),
  niraparib: { US: A(2017), EU: A(2017, epar("zejula")), UK: A(2017, mhra("Zejula")), JP: A(2020, PMDA), CN: A(2019, NMPA, "Zai Lab"), AU: A(2018, tga("Zejula")) },
  rucaparib: { US: A(2016), EU: A(2018, epar("rubraca")), UK: A(2018, mhra("Rubraca")), AU: A(2020, tga("Rubraca")) },
  talazoparib: { US: A(2018), EU: A(2019, epar("talzenna")), UK: A(2019, mhra("Talzenna")), JP: A(2023, PMDA), CN: A(2021, NMPA), AU: A(2019, tga("Talzenna")) },
  belzutifan: { US: A(2021), EU: V(C(2025, epar("welireg"), "ccRCC after ≥2 lines; VHL-associated tumours; 12 Feb 2025 (conditional)")), UK: A(2025, mhra("Welireg")), JP: A(2025, PMDA), AU: A(2025, tga("Welireg")) },
  avapritinib: { US: A(2020), EU: A(2020, epar("ayvakyt"), "EU brand Ayvakyt"), UK: A(2020, mhra("Ayvakyt")), CN: A(2021, NMPA, "CStone"), AU: A(2022, tga("Ayvakyt")) },
  ripretinib: { US: A(2020), EU: A(2021, epar("qinlock")), UK: A(2021, mhra("Qinlock")), CN: A(2021, NMPA, "Zai Lab"), AU: A(2020, tga("Qinlock")) },
  nirogacestat: { US: A(2023), EU: A(2025, epar("ogsiveo")), UK: A(2025, mhra("Ogsiveo")) },
  vimseltinib: { US: A(2025), EU: UR("MAA 2025 (Deciphera/Ono)") },
  "avutometinib-defactinib": { US: A(2025, undefined, "Accelerated, KRAS-mutant recurrent LGSOC (May 2025)"), EU: UR("MAA 2026") },
  cabozantinib: global("Cabometyx", "cabometyx", 2012, 2016, 2016, 2020, 2023, 2017, "Cometriq 2012 (MTC); Cabometyx 2016"),
  lenvatinib: global("Lenvima", "lenvima", 2015, 2015, 2015, 2015, 2018, 2015),
  sorafenib: global("Nexavar", "nexavar", 2005, 2006, 2006, 2008, 2006, 2006),
  regorafenib: global("Stivarga", "stivarga", 2012, 2013, 2013, 2013, 2017, 2013),
  sunitinib: global("Sutent", "sutent", 2006, 2006, 2006, 2008, 2007, 2006),
  pazopanib: global("Votrient", "votrient", 2009, 2010, 2010, 2012, 2017, 2010),
  axitinib: global("Inlyta", "inlyta", 2012, 2012, 2012, 2012, 2015, 2012),
  tivozanib: { US: A(2021), EU: A(2017, epar("fotivda"), "EU first (Aug 2017)"), UK: A(2017, mhra("Fotivda")) },
  fruquintinib: { US: A(2023), EU: A(2024, epar("fruzaqla")), UK: A(2024, mhra("Fruzaqla")), JP: A(2024, PMDA), CN: A(2018, NMPA, "First approval globally (Sep 2018)"), AU: A(2025, tga("Fruzaqla")) },
  "trifluridine-tipiracil": global("Lonsurf", "lonsurf", 2015, 2016, 2016, 2014, 2019, 2018, "Japan first (Mar 2014)"),
  vandetanib: { US: A(2011), EU: C(2012, epar("caprelsa")), UK: A(2012, mhra("Caprelsa")), JP: A(2015, PMDA), AU: A(2013, tga("Caprelsa")) },
  erdafitinib: { US: A(2019), EU: A(2024, epar("balversa")), UK: A(2024, mhra("Balversa")), JP: A(2024, PMDA), AU: A(2025, tga("Balversa")) },
  pemigatinib: { US: A(2020), EU: C(2021, epar("pemazyre")), UK: A(2021, mhra("Pemazyre")), JP: A(2021, PMDA), CN: A(2022, NMPA, "Innovent"), AU: A(2022, tga("Pemazyre")) },
  futibatinib: { US: A(2022), EU: C(2023, epar("lytgobi")), UK: A(2023, mhra("Lytgobi")), JP: A(2023, PMDA) },
  tinengotinib: { US: UR("Phase 3 FIRST-308"), CN: UR("Phase 3") },
  tovorafenib: { US: A(2024), EU: A(2026, epar("ojemda"), "Paediatric low-grade glioma (Apr 2026)"), UK: A(2026, mhra("Ojemda")) },
  dordaviprone: { US: A(2025, undefined, "Accelerated; H3 K27M-mutant diffuse midline glioma (Aug 2025)"), EU: UR("MAA (Jazz)") },
  selinexor: { US: A(2019), EU: C(2021, epar("nexpovio"), "EU brand Nexpovio"), UK: A(2021, mhra("Nexpovio")), CN: A(2021, NMPA, "Antengene"), AU: A(2022, tga("Xpovio")) },
  mevrometostat: { US: UR("Phase 3 MEVPRO-1/2") },
  eflornithine: { US: A(2023, undefined, "Iwilfin, high-risk neuroblastoma maintenance"), EU: NF("USWM has not filed in EU") },
  relacorilant: { US: A(2026), EU: UR("MAA (Corcept) 2026") },

  // ================= Hormonal =================
  abiraterone: global("Zytiga", "zytiga", 2011, 2011, 2011, 2014, 2015, 2012),
  enzalutamide: global("Xtandi", "xtandi", 2012, 2013, 2013, 2014, 2019, 2014),
  apalutamide: global("Erleada", "erleada", 2018, 2019, 2019, 2019, 2019, 2018),
  darolutamide: global("Nubeqa", "nubeqa", 2019, 2020, 2020, 2020, 2021, 2020),
  relugolix: { US: A(2020), EU: A(2022, epar("orgovyx")), UK: A(2022, mhra("Orgovyx")), JP: A(2019, PMDA, "Relumina (uterine fibroids) 2019; prostate later"), AU: A(2023, tga("Orgovyx")) },
  goserelin: global("Zoladex", "zoladex", 1989, 1987, 1987, 1991, 1996, 1990, "Legacy product"),
  tamoxifen: global("Nolvadex", "nolvadex", 1977, 1973, 1973, 1981, 1990, 1976, "Legacy product; UK first (1973)"),
  letrozole: global("Femara", "femara", 1997, 1996, 1996, 2006, 2000, 1997),
  exemestane: global("Aromasin", "aromasin", 1999, 1999, 1999, 2002, 2001, 2000),
  fulvestrant: global("Faslodex", "faslodex", 2002, 2004, 2004, 2011, 2010, 2004),
  elacestrant: { US: A(2023), EU: A(2023, epar("orserdu")), UK: A(2024, mhra("Orserdu")), JP: UR("PMDA filing"), AU: A(2024, tga("Orserdu")) },
  imlunestrant: { US: A(2025), EU: V(A(2026, epar("inluriyo"), "ESR1-mutant ER+/HER2- mBC; 9 Jan 2026")), UK: A(2026, mhra("Inluriyo")), JP: A(2026, PMDA) },
  camizestrant: { US: A(2026, undefined, "Etcamah, 4 Sep 2026, after 6-3 negative ODAC"), EU: UR("MAA under review") },
  vepdegestrant: { US: A(2026), EU: UR("MAA (Arvinas/Pfizer)") },
  giredestrant: { US: UR("evERA positive; NDA 2026") },
  "megestrol-progestins": global("Megace", "megestrol", 1971, 1970, 1970, 1980, 1995, 1975, "Legacy product"),
  "octreotide-lanreotide": global("Sandostatin", "sandostatin", 1988, 1988, 1988, 1991, 1996, 1990),

  // ================= Chemotherapy and regimens =================
  paclitaxel: global("Taxol", "paclitaxel", 1992, 1993, 1993, 1997, 1995, 1994),
  docetaxel: global("Taxotere", "taxotere", 1996, 1995, 1995, 1996, 1996, 1996),
  carboplatin: global("Paraplatin", "carboplatin", 1989, 1986, 1986, 1990, 1990, 1988),
  cisplatin: global("Platinol", "cisplatin", 1978, 1979, 1979, 1983, 1985, 1980),
  doxorubicin: global("Adriamycin", "doxorubicin", 1974, 1971, 1971, 1975, 1980, 1975),
  "pegylated-liposomal-doxorubicin": global("Doxil", "caelyx-pegylated-liposomal", 1995, 1996, 1996, 2007, 2003, 1997, "EU brand Caelyx"),
  ifosfamide: global("Ifex", "ifosfamide", 1988, 1980, 1980, 1985, 1990, 1985),
  pemetrexed: global("Alimta", "alimta", 2004, 2004, 2004, 2007, 2005, 2004),
  topotecan: global("Hycamtin", "hycamtin", 1996, 1996, 1996, 2000, 2000, 1998),
  cabazitaxel: global("Jevtana", "jevtana", 2010, 2011, 2011, 2014, 2020, 2011),
  trabectedin: { US: A(2015), EU: A(2007, epar("yondelis"), "EU first (Sep 2007), soft-tissue sarcoma"), UK: A(2007, mhra("Yondelis")), JP: A(2015, PMDA), AU: A(2010, tga("Yondelis")) },
  lurbinectedin: { US: A(2020), EU: UR("MAA resubmitted after IMforte"), AU: A(2023, tga("Zepzelca")) },
  nalirifox: { US: A(2024, undefined, "Onivyde + oxaliplatin/5-FU/LV for 1L metastatic PDAC"), EU: A(2016, epar("onivyde-pegylated-liposomal"), "Onivyde 2L after gemcitabine (2016); NALIRIFOX label 2025"), UK: A(2016, mhra("Onivyde")), AU: A(2018, tga("Onivyde")) },
  bortezomib: global("Velcade", "velcade", 2003, 2004, 2004, 2006, 2005, 2005),
  carfilzomib: global("Kyprolis", "kyprolis", 2012, 2015, 2015, 2016, 2021, 2015),
  lenalidomide: global("Revlimid", "revlimid", 2005, 2007, 2007, 2010, 2013, 2007),
  iberdomide: { US: UR("EXCALIBER phase 3") },
  mezigdomide: { US: UR("SUCCESSOR phase 3") },
  golcadomide: { US: UR("Phase 3 GOLSEEK") },

  // ================= Antibodies (non-checkpoint) =================
  trastuzumab: global("Herceptin", "herceptin", 1998, 2000, 2000, 2001, 2002, 2000),
  "trastuzumab-biosimilars": global("Ogivri / Kanjinti / Herzuma", "ogivri", 2017, 2017, 2018, 2018, 2020, 2018),
  pertuzumab: global("Perjeta", "perjeta", 2012, 2013, 2013, 2013, 2018, 2013),
  margetuximab: { US: A(2020), CN: A(2024, NMPA, "Zai Lab"), EU: W(2022, undefined, "MAA withdrawn 2022") },
  bevacizumab: global("Avastin", "avastin", 2004, 2005, 2005, 2007, 2010, 2005),
  "bevacizumab-glioma": { US: A(2009, undefined, "Recurrent GBM (accelerated 2009; full 2017)"), EU: NF("CHMP negative opinion for GBM 2009-10; not approved in EU for glioma"), JP: A(2013, PMDA), AU: A(2010, tga("Avastin")) },
  cetuximab: global("Erbitux", "erbitux", 2004, 2004, 2004, 2008, 2006, 2005),
  panitumumab: global("Vectibix", "vectibix", 2006, 2007, 2007, 2010, 2021, 2008),
  ramucirumab: global("Cyramza", "cyramza", 2014, 2014, 2014, 2015, 2022, 2015),
  rituximab: global("Rituxan", "mabthera", 1997, 1998, 1998, 2001, 2000, 1998, "EU brand MabThera"),
  obinutuzumab: global("Gazyva", "gazyvaro", 2013, 2014, 2014, 2018, 2021, 2014, "EU brand Gazyvaro"),
  daratumumab: global("Darzalex", "darzalex", 2015, 2016, 2016, 2017, 2019, 2016),
  isatuximab: global("Sarclisa", "sarclisa", 2020, 2020, 2020, 2020, 2022, 2020),
  tafasitamab: { US: A(2020), EU: C(2021, epar("minjuvi"), "EU brand Minjuvi"), UK: A(2021, mhra("Minjuvi")), AU: A(2022, tga("Minjuvi")) },
  dinutuximab: { US: A(2015, undefined, "Unituxin"), EU: A(2017, epar("qarziba"), "Dinutuximab beta (Qarziba, EUSA/Recordati)"), UK: A(2017, mhra("Qarziba")), JP: A(2021, PMDA, "Dinutuximab beta"), AU: A(2020, tga("Qarziba")) },
  naxitamab: { US: A(2020, undefined, "Accelerated"), EU: NF("Y-mAbs withdrew EU MAA 2022"), CN: A(2024, NMPA, "SciClone") },
  zolbetuximab: { US: A(2024, undefined, "Oct 2024 after 2024 CRL for manufacturing"), EU: V(A(2024, epar("vyloy"), "1L CLDN18.2+ HER2- gastric/GEJ; 19 Sep 2024")), UK: A(2024, mhra("Vyloy")), JP: A(2024, PMDA, "First approval globally (Mar 2024)"), CN: A(2025, NMPA), AU: A(2025, tga("Vyloy")) },

  // ================= Oncolytic viruses, vaccines, intravesical =================
  "talimogene-laherparepvec": { US: A(2015), EU: A(2015, epar("imlygic")), UK: A(2016, mhra("Imlygic")), AU: A(2016, tga("Imlygic")) },
  "vusolimogene-oderparepvec": { US: A(2026, undefined, "Accelerated Aug 2026 after Jul 2025 CRL"), EU: NF("No MAA announced") },
  "nadofaragene-firadenovec": { US: A(2022), EU: V(C(2026, epar("adstiladrin"), "BCG-unresponsive NMIBC with CIS; 28 May 2026 (conditional)")), UK: UR("MHRA review") },
  "nogapendekin-alfa": { US: A(2024), EU: V(C(2026, epar("anktiva"), "BCG-unresponsive NMIBC with CIS, with BCG; 16 Feb 2026 (conditional)")), UK: A(2025, mhra("Anktiva")) },
  "tar-200": { US: A(2025, undefined, "Inlexzo, BCG-unresponsive NMIBC (Sep 2025)"), EU: UR("MAA 2026") },
  cretostimogene: { US: UR("Rolling BLA (CG Oncology)") },
  "gardasil-9": global("Gardasil 9", "gardasil-9", 2014, 2015, 2015, 2020, 2018, 2015, "Gardasil (4-valent) 2006 US"),
  "intismeran-autogene": { US: UR("INTerpath-001 positive Aug 2026; filings to follow") },

  // ================= Devices and tests =================
  optune: { US: A(2011, undefined, "GBM 2011/2015; NSCLC 2024; pancreatic 2026"), EU: A(2015, undefined, "CE mark (GBM); pancreatic and NSCLC CE marks 2024-26", "CE mark is not an EMA authorisation"), JP: A(2016, PMDA, "GBM"), CN: A(2020, NMPA, "GBM (Zai Lab)") },
  "foundationone-cdx": { US: A(2017, undefined, "FDA PMA companion diagnostic"), JP: A(2018, PMDA, "First CGP test approved in Japan"), EU: A(2019, undefined, "CE-IVD", "IVDR transition; CE marking is not an EMA approval") },
  shield: { US: A(2024, undefined, "FDA PMA; Medicare coverage"), EU: NF("CE-IVD not sought as of 2026") },
  galleri: { US: UR("PMA submitted Jan 2026; advisory committee 23 Sep 2026"), UK: UR("NHS-Galleri final results 2026; no NHS rollout decision"), EU: NF("No CE-IVD filing announced") },
  "artera-ai-prostate": { US: A(2025, undefined, "FDA de novo, Aug 2025") },
  "artera-ai-breast": { US: A(2026, undefined, "FDA 510(k)/de novo, May 2026") },
  "cetuximab-sarotalocan": { US: UR("Phase 3 in recurrent head and neck (Rakuten Medical)"), JP: A(2020, PMDA, "Akalux + BioBlade laser, recurrent HNSCC (Sep 2020); first photoimmunotherapy approval globally") },
};

/** Convenience: which regions have an approval (approved or conditional). */
export function approvedRegions(row: RegionalRow): Region[] {
  return REGIONS.filter((r) => { const s = row[r]?.status; return s === "approved" || s === "conditional"; });
}
